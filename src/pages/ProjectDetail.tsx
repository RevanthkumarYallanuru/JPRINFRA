import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Ruler, ArrowLeft, CheckCircle } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();

  // Mock project data (in real app, fetch based on id)
  const project = {
    id: 1,
    title: "Modern Villa Construction",
    location: "Bangalore, Karnataka",
    status: "completed",
    category: "Residential",
    timeline: "12 Months (Jan 2023 - Dec 2023)",
    area: "3500 sq ft",
    description: "A luxurious modern villa featuring contemporary architecture, premium finishes, and state-of-the-art amenities. This project showcases our commitment to quality and attention to detail in residential construction.",
    workScope: [
      "Complete structural design and construction",
      "High-end interior finishing and decoration",
      "Landscaping and outdoor spaces",
      "Smart home automation integration",
      "Swimming pool and recreational areas",
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200",
    ],
    progress: 100,
    tasks: [
      { name: "Foundation & Structure", status: "completed" },
      { name: "Roofing & Exterior", status: "completed" },
      { name: "Plumbing & Electrical", status: "completed" },
      { name: "Interior Finishing", status: "completed" },
      { name: "Final Inspection", status: "completed" },
    ],
  };

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
                <img 
                  src={project.images[0]} 
                  alt={project.title}
                  className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                  loading="eager"
                />
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
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Project Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>

              {/* Work Scope */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Work Scope</h2>
                  <ul className="space-y-3">
                    {project.workScope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Status */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Project Status</h3>
                  <Badge className={`mb-4 ${project.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'} text-white capitalize`}>
                    {project.status}
                  </Badge>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
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

              {/* Tasks Progress */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Project Tasks</h3>
                  <div className="space-y-3">
                    {project.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${task.status === 'completed' ? 'text-green-500' : 'text-muted'} flex-shrink-0`} />
                        <span className={`text-sm ${task.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {task.name}
                        </span>
                      </div>
                    ))}
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
