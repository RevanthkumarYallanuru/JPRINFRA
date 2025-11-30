import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement, Achievement } from "@/lib/firebase/achievements";
import { useToast } from "@/hooks/use-toast";

export default function AdminAchievements() {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAchievements();
      setItems(data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to load achievements", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    load();
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.title) return toast({ title: "Title required" });
      // If a file is provided, it takes precedence. Otherwise use imageUrl if given.
      const payload: any = { title: form.title, description: form.description, date: form.date };
      if (imageFile) payload.imageFile = imageFile;
      else if (imageUrl) payload.imageUrl = imageUrl;

      if (editingId) {
        await updateAchievement(editingId, payload, user?.uid);
        toast({ title: "Updated" });
      } else {
        await createAchievement(payload, user?.uid);
        toast({ title: "Created" });
      }
      setForm({ title: "", description: "", date: "" });
      setImageFile(null);
      setImageUrl("");
      setEditingId(null);
      await load();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to save", variant: "destructive" });
    }
  };

  const handleEdit = (item: Achievement) => {
    setEditingId(item.id || null);
    setForm({ title: item.title, description: item.description || "", date: item.date || "" });
    setImageUrl(item.imageUrl || "");
    setImageFile(null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this achievement?")) return;
    try {
      await deleteAchievement(id);
      toast({ title: "Deleted" });
      await load();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Achievements</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. 2024-05 or May 2024" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo (upload file)</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo (image URL)</label>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/photo.jpg" />
            </div>
            {imageFile && (
              <div>
                <p className="text-sm">Selected file: {imageFile.name}</p>
              </div>
            )}
            {imageUrl && !imageFile && (
              <div>
                <p className="text-sm">Preview from URL:</p>
                <img src={imageUrl} alt="preview" className="w-40 h-28 object-cover rounded-md" />
              </div>
            )}
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              <Button variant="ghost" onClick={() => { setForm({ title: "", description: "", date: "" }); setImageFile(null); setImageUrl(""); setEditingId(null); }}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-muted-foreground">No achievements yet</div>
        ) : (
          items.map((it) => (
            <Card key={it.id} className="overflow-hidden">
              <CardContent>
                {it.imageUrl && <img src={it.imageUrl} alt={it.title} className="w-full h-40 object-cover rounded-md mb-3" />}
                <h3 className="font-semibold text-lg">{it.title}</h3>
                <p className="text-sm text-muted-foreground">{it.date}</p>
                <p className="mt-2 text-sm">{it.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(it)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(it.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
