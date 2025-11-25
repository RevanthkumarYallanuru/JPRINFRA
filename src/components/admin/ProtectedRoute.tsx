// Protected route component for admin pages
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "manager" | "viewer";
}

export default function ProtectedRoute({
  children,
  requiredRole = "viewer",
}: ProtectedRouteProps) {
  const { isAuthenticated, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md p-8">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !userProfile) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check role permissions
  const roleHierarchy: Record<string, number> = {
    viewer: 1,
    manager: 2,
    admin: 3,
  };

  const userRoleLevel = roleHierarchy[userProfile.role] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole] || 1;

  if (userRoleLevel < requiredRoleLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

