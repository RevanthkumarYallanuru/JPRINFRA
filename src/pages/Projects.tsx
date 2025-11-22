import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-projects.jpg";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Modern Villa Construction",
      location: "Bangalore, Karnataka",
      status: "completed",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
      description: "Luxury villa with modern architecture and premium finishes",
    },
    {
      id: 2,
      title: "Commercial Complex",
      location: "Mumbai, Maharashtra",
      status: "ongoing",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
      description: "Multi-story commercial building with retail and office spaces",
    },
    {
      id: 3,
      title: "Residential Apartment",
      location: "Chennai, Tamil Nadu",
      status: "completed",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
      description: "20-unit apartment complex with modern amenities",
    },
    {
      id: 4,
      title: "Highway Bridge Project",
      location: "Pune, Maharashtra",
      status: "ongoing",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800",
      description: "Infrastructure development for highway connectivity",
    },
    {
      id: 5,
      title: "Luxury Bungalow",
      location: "Hyderabad, Telangana",
      status: "upcoming",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
      description: "High-end residential bungalow with premium features",
    },
    {
      id: 6,
      title: "Office Tower",
      location: "Bangalore, Karnataka",
      status: "completed",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800",
      description: "15-floor office building with state-of-the-art facilities",
    },
  ];

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImage} alt="Our Projects" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Explore our portfolio of successfully delivered and ongoing construction projects
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border sticky top-0 z-30 backdrop-blur-sm bg-background/95">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getStatusColor(project.status)} text-white capitalize`}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">{project.category}</Badge>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{project.location}</p>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
