// Project detail page component showing individual project information
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, Ruler, ArrowLeft, CheckCircle } from "lucide-react";
import { getProject, Project } from "@/lib/firebase/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProject(projectId);
      if (data) {
        setProject(data);
      } else {
        setError("Project not found");
      }
    } catch (err) {
      console.error("Error loading project:", err);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <section className="py-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-32 mb-6" />
            <Skeleton className="h-12 w-2/3 mb-4" />
            <div className="flex gap-6 mt-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
        </section>
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Skeleton className="h-96 w-full mb-8" />
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-4">{error || "Project not found"}</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link to="/projects">
            <Button variant="ghost" className="mb-6 text-primary-foreground hover:bg-primary-foreground/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 text-primary-foreground/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{project.timeline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                <span>{project.area}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                {project.images && project.images.length > 0 ? (
                  <>
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                      loading="eager"
                    />
                    {project.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-4">
                        {project.images.slice(1).map((img, idx) => (
                          <img 
                            key={idx}
                            src={img} 
                            alt={`${project.title} ${idx + 2}`}
                            className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-[500px] bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">No images available</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Project Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Status */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Project Status</h3>
                  <Badge className={`mb-4 ${project.status === 'completed' ? 'bg-green-500' : project.status === 'ongoing' ? 'bg-blue-500' : 'bg-yellow-500'} text-white capitalize`}>
                    {project.status}
                  </Badge>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{project.progress || 0}%</span>
                    </div>
                    <Progress value={project.progress || 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="font-medium text-foreground">{project.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                      <p className="font-medium text-foreground">{project.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Area</p>
                      <p className="font-medium text-foreground">{project.area}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-medium text-foreground">{project.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Similar Project?</h2>
          <p className="text-lg mb-6 text-primary-foreground/90">
            Let's discuss your requirements and bring your vision to life
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
