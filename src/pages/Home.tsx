import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Ruler, PaintBucket, CheckCircle } from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: Building2,
      title: "Residential Construction",
      description: "Build dreams with us! We ensure precision, quality, and a personalized touch from foundation to rooftop.",
    },
    {
      icon: Ruler,
      title: "Architectural Designs",
      description: "Artistry in every blueprint! Each detail transforms into a masterpiece, shaping spaces with unparalleled excellence.",
    },
    {
      icon: PaintBucket,
      title: "Interior Designs",
      description: "Home Interior Experts. Transforming Spaces with Expertise and Dedication for beautiful living environments.",
    },
  ];

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Ongoing Projects" },
    { number: "500+", label: "Happy Clients" },
    { number: "15+", label: "Years Experience" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="border-l-4 border-secondary pl-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                WE BUILD<br />
                <span className="text-secondary">BUILDINGS</span><br />
                PROFESSIONALLY
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
                Excellence in construction and infrastructure development. Building your dreams with precision, quality, and dedication.
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                  CONTACT NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              JPR INFRAWORKERS
            </h2>
            <p className="text-xl text-muted-foreground">Our Offerings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="mb-4 p-4 bg-primary/5 rounded-lg w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="px-8">
                VIEW ALL SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-5xl md:text-6xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-lg text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-primary text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Quality Craftsmanship",
                "Timely Project Delivery",
                "Experienced Team",
                "Customer Satisfaction",
                "Competitive Pricing",
                "After-Sales Support",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-lg text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Let's build something amazing together. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="px-8">
                GET IN TOUCH
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="outline" className="px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                VIEW PROJECTS
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
