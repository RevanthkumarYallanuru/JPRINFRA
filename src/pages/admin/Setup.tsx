import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createUser, signOutUser } from "@/lib/firebase/auth";

const AdminSetup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "jprinfraworks@gmail.com",
    password: "jpr@infra@works",
    displayName: "JPR Admin",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createUser(formData.email, formData.password, formData.displayName, formData.role as any);
      await signOutUser();
      setCreated(true);
      toast({
        title: "Admin created",
        description: "You can now log in using the new admin credentials.",
      });
    } catch (error: any) {
      toast({
        title: "Creation failed",
        description: error?.message || "Unable to create admin user.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (import.meta.env.VITE_ENABLE_ADMIN_SETUP !== "true") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Setup Disabled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Set <code>VITE_ENABLE_ADMIN_SETUP=true</code> in your environment to enable this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-lg border-primary/40">
        <CardHeader className="text-center space-y-2">
          <ShieldCheck className="w-10 h-10 mx-auto text-primary" />
          <CardTitle>Admin Bootstrap</CardTitle>
          <p className="text-sm text-muted-foreground">
            Use this tool once to create your first administrator. Disable the setup flag after creation.
          </p>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              This endpoint should only be exposed temporarily. After creating the admin, redeploy without the setup flag.
            </AlertDescription>
          </Alert>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="text"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                disabled
                className="disabled:opacity-80"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading || created}>
              {created ? "Admin Created" : loading ? "Creating..." : "Create Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;

