// Projects page component displaying company portfolio
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@/assets/hero-projects.jpg";
import { siteData } from "@/lib/data";
import { getProjects, Project } from "@/lib/firebase/projects";
import { SEO } from "@/components/SEO";

export default function Projects() {
  const { company } = siteData;
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error loading projects:", err);
      setError("Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "ongoing":
        return "bg-blue-500";
      case "upcoming":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Construction Projects Portfolio - JPR INFRAWORKS",
    "description": "View our portfolio of completed and ongoing construction projects including residential construction, commercial buildings, and infrastructure development projects."
  };

  return (
    <div>
      <SEO
        title="Construction Projects Portfolio - Residential & Commercial | JPR INFRAWORKS"
        description="Explore our construction projects portfolio featuring completed and ongoing residential construction, commercial building, and infrastructure development projects. View our builder and architect work showcase."
        keywords="construction projects, construction portfolio, residential construction projects, commercial construction projects, builder portfolio, architect portfolio, completed construction projects, construction company projects, infrastructure projects"
        url="https://jprinfraworks.com/projects"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="JPR INFRAWORKS Construction Projects Portfolio - Completed Residential Construction, Commercial Building and Infrastructure Development Projects" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/50 to-black/60"></div>
        <div className="hero-motion-overlay">
          <div className="float-blob left" />
          <div className="float-blob right" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">Our Construction Projects Portfolio</h1>
            <div className="h-1 w-32 bg-secondary mx-auto mb-6 animate-scale-in"></div>
            <p className="text-xl md:text-2xl leading-relaxed">
              Explore our construction portfolio featuring successfully delivered and ongoing residential construction, commercial building, and infrastructure development projects by our expert builder and architect team.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background/95 border-b border-border sticky top-0 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Projects
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filter === "ongoing" ? "default" : "outline"}
              onClick={() => setFilter("ongoing")}
            >
              Ongoing
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-64" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={loadProjects} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                  <Card className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden animate-slide-up border-2 hover:border-primary" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.images && project.images[0] ? project.images[0] : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"}
                        alt={`${project.title} - ${project.category} Construction Project by JPR INFRAWORKS Builder and Architect`}
                        className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getStatusColor(project.status)} text-white capitalize shadow-lg`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{project.category}</Badge>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                      <p className="text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
