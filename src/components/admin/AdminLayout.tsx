// Admin panel layout component
import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { signOutUser } from "@/lib/firebase/auth";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      navigate("/admin/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border/50 bg-card/50 backdrop-blur-sm px-6 pb-4 shadow-xl">
          <div className="flex h-20 shrink-0 items-center border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">JPR Admin</h1>
                <p className="text-xs text-muted-foreground">Control Panel</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              <li>
                <ul role="list" className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <item.icon className={cn(
                            "h-5 w-5 shrink-0 transition-transform",
                            isActive ? "scale-110" : "group-hover:scale-105"
                          )} />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center gap-x-3 px-3 py-3 rounded-lg bg-muted/30 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg">
                    {userProfile?.displayName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold truncate">{userProfile?.displayName || "User"}</span>
                    <span className="text-xs text-muted-foreground capitalize">{userProfile?.role || "viewer"}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-50 bg-card/80 backdrop-blur-sm shadow-lg border border-border/50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-card/95 backdrop-blur-sm">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
              <div className="flex h-20 shrink-0 items-center justify-between border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">JPR Admin</h1>
                    <p className="text-xs text-muted-foreground">Control Panel</p>
                  </div>
                </div>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-2">
                  <li>
                    <ul role="list" className="space-y-1">
                      {navigation.map((item) => {
                        const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                        return (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={cn(
                                "group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-all duration-200",
                                isActive
                                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                              onClick={() => {
                                // Close sheet on mobile after navigation
                                setTimeout(() => {
                                  const sheetClose = document.querySelector('[data-state="open"]');
                                  if (sheetClose) {
                                    (sheetClose as HTMLElement).click();
                                  }
                                }, 100);
                              }}
                            >
                              <item.icon className={cn(
                                "h-5 w-5 shrink-0 transition-transform",
                                isActive ? "scale-110" : "group-hover:scale-105"
                              )} />
                              <span>{item.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  <li className="mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-x-3 px-3 py-3 rounded-lg bg-muted/30 mb-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg">
                        {userProfile?.displayName?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-semibold truncate">{userProfile?.displayName || "User"}</span>
                        <span className="text-xs text-muted-foreground capitalize">{userProfile?.role || "viewer"}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

