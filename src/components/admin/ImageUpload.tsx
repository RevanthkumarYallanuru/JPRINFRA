// Image upload component with preview and Firebase Storage
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadProjectImage, deleteProjectImage } from "@/lib/firebase/projects";
import { Button } from "@/components/ui/button";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface ImageUploadProps {
  projectId?: string;
  existingImages?: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({
  projectId,
  existingImages = [],
  onImagesChange,
  maxImages = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(existingImages);
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!projectId) {
        toast({
          title: "Error",
          description: "Project ID is required to upload images",
          variant: "destructive",
        });
        return;
      }

      if (images.length + acceptedFiles.length > maxImages) {
        toast({
          title: "Error",
          description: `Maximum ${maxImages} images allowed`,
          variant: "destructive",
        });
        return;
      }

      setUploading(true);
      const newImages: string[] = [];

      try {
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

          // Validate file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            toast({
              title: "Error",
              description: `${file.name} is too large. Maximum size is 5MB`,
              variant: "destructive",
            });
            continue;
          }

          const imageUrl = await uploadProjectImage(file, projectId);
          newImages.push(imageUrl);
        }

        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange(updatedImages);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to upload images",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    },
    [projectId, images, maxImages, onImagesChange, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: maxImages - images.length,
    disabled: uploading || !projectId,
  });

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Delete from storage if project exists
      if (projectId) {
        await deleteProjectImage(imageUrl);
      }

      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Project Images</label>
        <p className="text-sm text-muted-foreground mb-2">
          Upload up to {maxImages} images ({images.length}/{maxImages} uploaded)
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
                    onClick={() => handleRemoveImage(imageUrl, index)}
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
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              } ${uploading || !projectId ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <div className="space-y-2">
                  <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {isDragActive
                        ? "Drop images here"
                        : "Drag & drop images here, or click to select"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                  {!projectId && (
                    <p className="text-xs text-destructive mt-2">
                      Save project first to upload images
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

