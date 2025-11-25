// Image upload component with multiple input methods (URL, paste, file upload)
import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X, Upload, Loader2, Image as ImageIcon, Link2, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageUploadProps {
  existingImages?: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

// Convert image to base64 and compress
const compressImageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Resize if image is too large
        const maxDim = 1200;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.onerror = () => {
                reject(new Error("Failed to convert image"));
              };
            }
          },
          "image/jpeg",
          0.75 // 75% quality
        );
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
  });
};

// Validate if string is a valid image URL
const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok && response.headers.get("content-type")?.includes("image");
  } catch {
    return false;
  }
};

export default function ImageUpload({
  existingImages = [],
  onImagesChange,
  maxImages = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(existingImages);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  const addImages = useCallback(
    (newImageUrls: string[]) => {
      if (images.length + newImageUrls.length > maxImages) {
        toast({
          title: "Error",
          description: `Maximum ${maxImages} images allowed`,
          variant: "destructive",
        });
        return;
      }

      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);
      onImagesChange(updatedImages);
      
      if (newImageUrls.length > 0) {
        toast({
          title: "Success",
          description: `${newImageUrls.length} image(s) added successfully`,
        });
      }
    },
    [images, maxImages, onImagesChange, toast]
  );

  const handleFileSelect = useCallback(
    async (files: FileList) => {
      const acceptedFiles = Array.from(files);
      setUploading(true);

      try {
        const newImages: string[] = [];

        for (const file of acceptedFiles) {
          // Validate file type
          if (!file.type.startsWith("image/")) {
            toast({
              title: "Error",
              description: `${file.name} is not an image file`,
              variant: "destructive",
            });
            continue;
          }

          // Validate file size (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            toast({
              title: "Error",
              description: `${file.name} is too large. Maximum size is 10MB`,
              variant: "destructive",
            });
            continue;
          }

          try {
            const base64 = await compressImageToBase64(file);
            newImages.push(base64);
          } catch (error) {
            console.error("Error processing file:", file.name, error);
            toast({
              title: "Error",
              description: `Failed to process ${file.name}`,
              variant: "destructive",
            });
          }
        }

        addImages(newImages);
      } finally {
        setUploading(false);
      }
    },
    [addImages, toast]
  );

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const isValid = await isValidImageUrl(urlInput);
      if (!isValid) {
        toast({
          title: "Error",
          description: "Invalid image URL or image is not accessible",
          variant: "destructive",
        });
        return;
      }

      addImages([urlInput]);
      setUrlInput("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate image URL",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file" && items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          handleFileSelect(new (FileList as any)([file]));
        }
      }
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFileSelect(new (FileList as any)(acceptedFiles));
    },
    [handleFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: maxImages - images.length,
    disabled: uploading,
  });

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Project Images</label>
        <p className="text-sm text-muted-foreground mb-2">
          Add up to {maxImages} images ({images.length}/{maxImages} added)
        </p>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt={`Project image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="url">Image URL</TabsTrigger>
                <TabsTrigger value="paste">Paste</TabsTrigger>
              </TabsList>

              {/* Upload Tab */}
              <TabsContent value="upload" className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <input {...getInputProps()} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="space-y-2">
                      <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Processing images...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {isDragActive
                              ? "Drop images here"
                              : "Drag & drop images here"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, GIF, WebP up to 10MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select Files
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* URL Tab */}
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Paste image URL (e.g., https://example.com/image.jpg)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleUrlSubmit();
                    }}
                    disabled={uploading}
                  />
                  <Button
                    onClick={handleUrlSubmit}
                    disabled={uploading || !urlInput.trim()}
                    className="w-full"
                  >
                    <Link2 className="mr-2 h-4 w-4" />
                    {uploading ? "Adding..." : "Add Image"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Paste the direct URL to an image from any online source
                </p>
              </TabsContent>

              {/* Paste Tab */}
              <TabsContent value="paste" className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-muted-foreground/25 hover:border-primary/50"
                  onPaste={handlePaste}
                >
                  <div className="space-y-2">
                    <Clipboard className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Paste images here</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Copy images from any app and paste directly here
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Works with screenshots and images copied from clipboard
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

