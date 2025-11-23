import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Ruler, PaintBucket, CheckCircle, Users, Award, Clock } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

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

  const features = [
    { icon: Award, title: "Quality Work", description: "Premium quality in every project" },
    { icon: Clock, title: "Timely Delivery", description: "On-time project completion" },
    { icon: Users, title: "Expert Team", description: "Skilled professionals" },
    { icon: CheckCircle, title: "Satisfaction", description: "100% client satisfaction" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="JPR INFRAWORKS Construction" className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-primary/40 to-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">JPR INFRAWORKS</h1>
            <div className="h-1 w-32 bg-secondary mx-auto mb-6 animate-scale-in"></div>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Building Your Dreams into Reality
            </p>
            <p className="text-lg mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Excellence in construction and infrastructure development with precision, quality, and dedication
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Link to="/projects">
                <Button size="lg" variant="secondary" className="text-lg hover:scale-105 transition-transform shadow-xl">
                  View Our Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl hover:scale-105 transition-all">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive construction and infrastructure solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up border-2 hover:border-primary" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background scroll-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We deliver excellence through our commitment to quality and customer satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-2xl transition-all duration-500 group animate-scale-in cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-20 h-20 bg-primary/10 group-hover:bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <feature.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary text-white scroll-animate">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Ready to Start Your Project?</h2>
          <div className="h-1 w-32 bg-white mx-auto mb-6 animate-scale-in"></div>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Get in touch with us today for a free consultation and quotation
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <Link to="/quotation">
              <Button size="lg" variant="secondary" className="text-lg hover:scale-110 transition-transform shadow-xl">
                Get Free Quotation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl hover:scale-110 transition-all">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}