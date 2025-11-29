// Admin dashboard page with metrics
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardMetrics, DashboardMetrics } from "@/lib/firebase/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  Activity,
  BarChart3,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const loadMetrics = async () => {
      try {
        setLoading(true);
        const data = await getDashboardMetrics();
        setMetrics(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load dashboard metrics",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [isAuthenticated, toast]);

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <AlertCircle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
        <p className="text-muted-foreground">Start by creating your first project</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Projects",
      value: metrics.totalProjects,
      description: "Across all categories",
      icon: FolderKanban,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      trend: null,
    },
    {
      title: "Completed",
      value: metrics.projectsByStatus.completed,
      description: `${metrics.completionRate}% completion rate`,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      trend: metrics.completionRate > 50 ? "up" : "down",
    },
    {
      title: "Ongoing",
      value: metrics.projectsByStatus.ongoing,
      description: "Active projects",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      trend: null,
    },
    {
      title: "Total Tasks",
      value: metrics.totalTasks,
      description: `${metrics.tasksByStatus.completed} completed`,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      trend: null,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Overview of your projects and tasks
          </p>
        </div>
        <Link to="/admin/projects/new">
          <Button className="gap-2 shadow-lg hover:shadow-xl transition-all">
            <FolderKanban className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden relative animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  {stat.trend && (
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-xl transition-all duration-300 border-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Projects by Status
              </CardTitle>
              <CardDescription className="mt-1">Distribution of project statuses</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-5">
            {Object.entries(metrics.projectsByStatus).map(([status, count], index) => {
              const percentage = metrics.totalProjects > 0
                ? (count / metrics.totalProjects) * 100
                : 0;
              
              const statusColors: Record<string, { bg: string; text: string; border: string }> = {
                completed: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/20" },
                ongoing: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20" },
                upcoming: { bg: "bg-yellow-500/10", text: "text-yellow-600", border: "border-yellow-500/20" },
                "on-hold": { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500/20" },
              };
              
              const colors = statusColors[status] || { bg: "bg-gray-500/10", text: "text-gray-600", border: "border-gray-500/20" };
              
              return (
                <div key={status} className="space-y-3 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", colors.bg, colors.border, "border-2")} />
                      <span className="text-sm font-semibold capitalize">{status.replace("-", " ")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">{count}</span>
                      <span className="text-xs text-muted-foreground">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000", colors.bg)}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Projects by Category
              </CardTitle>
              <CardDescription className="mt-1">Distribution across categories</CardDescription>
            </div>
            <FolderKanban className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics.projectsByCategory).map(([category, count], index) => {
                const totalCategories = Object.keys(metrics.projectsByCategory).length;
                const percentage = metrics.totalProjects > 0
                  ? (count / metrics.totalProjects) * 100
                  : 0;
                
                return (
                  <div
                    key={category}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-300 group animate-slide-up border border-transparent hover:border-primary/20"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <FolderKanban className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold block">{category}</span>
                        <span className="text-xs text-muted-foreground">{percentage.toFixed(1)}% of total</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-base font-bold px-3 py-1">
                      {count}
                    </Badge>
                  </div>
                );
              })}
              {Object.keys(metrics.projectsByCategory).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FolderKanban className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No categories yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="hover:shadow-xl transition-all duration-300 border-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Projects
            </CardTitle>
            <CardDescription className="mt-1">Latest projects added to the system</CardDescription>
          </div>
          <Link to="/admin/projects">
            <Button variant="ghost" size="sm" className="gap-2">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {metrics.recentProjects.length > 0 ? (
            <div className="space-y-4">
              {metrics.recentProjects.map((project, index) => {
                const statusColors: Record<string, string> = {
                  completed: "bg-green-500/10 text-green-600 border-green-500/20",
                  ongoing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
                  upcoming: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
                  "on-hold": "bg-red-500/10 text-red-600 border-red-500/20",
                };
                
                const statusColor = statusColors[project.status] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
                const progress = project.progress || 0;
                
                return (
                  <Link
                    key={project.id}
                    to={`/admin/projects/${project.id}/tasks`}
                    className="block p-5 rounded-xl border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group bg-card animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>{project.location}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge 
                          variant="outline" 
                          className={cn("capitalize border-2", statusColor)}
                        >
                          {project.status.replace("-", " ")}
                        </Badge>
                        <Badge variant="secondary" className="font-semibold">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{progress}%</span>
                      </div>
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FolderKanban className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No projects yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get started by creating your first project
              </p>
              <Link to="/admin/projects/new">
                <Button className="gap-2">
                  <FolderKanban className="h-4 w-4" />
                  Create Project
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

