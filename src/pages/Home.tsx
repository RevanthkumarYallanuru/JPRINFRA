// Home page component with hero section, services, and features
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Ruler, PaintBucket, CheckCircle, Users, Award, Clock } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";
import { siteData } from "@/lib/data";

export default function Home() {
  const { company, services: servicesData, features: featuresData } = siteData;
  const heroRef = useRef<HTMLElement>(null);
  const [cursorState, setCursorState] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  const [cursorActive, setCursorActive] = useState(false);
  
  // Icon mapping for services (first 3 services)
  const serviceIcons = [Building2, Ruler, PaintBucket];
  const services = servicesData.slice(0, 3).map((service, index) => ({
    ...service,
    icon: serviceIcons[index],
  }));
  
  // Icon mapping for features
  const featureIcons = [Award, Clock, Users, CheckCircle];
  const features = featuresData.map((feature, index) => ({
    ...feature,
    icon: featureIcons[index],
  }));

  // Mouse move handler for hero cursor effect
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const tiltX = ((x / rect.width) - 0.5) * 8;
      const tiltY = ((y / rect.height) - 0.5) * -8;

      setCursorState({ x, y, tiltX, tiltY });
    };

    const handleMouseEnter = () => setCursorActive(true);
    const handleMouseLeave = () => {
      setCursorActive(false);
      setCursorState((current) => ({ ...current, tiltX: 0, tiltY: 0 }));
    };

    heroElement.addEventListener("mousemove", handleMouseMove);
    heroElement.addEventListener("mouseenter", handleMouseEnter);
    heroElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      heroElement.removeEventListener("mouseenter", handleMouseEnter);
      heroElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div>
      {/* Hero Section with custom 3D cursor */}
      <section
        ref={heroRef}
        className="relative py-32 overflow-hidden bg-black text-white md:cursor-none"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={`${company.name} Construction`}
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/30 to-black/80" />
          <div className="hero-motion-overlay">
            <div className="float-blob left" />
            <div className="float-blob right" />
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-16 left-8 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-float-3d" />
        <div
          className="absolute bottom-10 right-12 w-48 h-48 bg-primary/30 rounded-full blur-2xl animate-float-3d"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-secondary/40 rounded-full blur-xl animate-depth-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* 3D cursor overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="hidden md:block w-32 h-32 rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.45)] transition-all duration-75 ease-out"
            style={{
              opacity: cursorActive ? 0.85 : 0,
              transform: `translate3d(${cursorState.x - 64}px, ${cursorState.y - 64}px, 0) scale(${cursorActive ? 1 : 0.9})`,
              mixBlendMode: "screen",
            }}
          />
          <div
            className="hidden md:block w-12 h-12 rounded-full bg-white/70 blur-3xl transition-all duration-100 ease-out"
            style={{
              opacity: cursorActive ? 0.6 : 0,
              transform: `translate3d(${cursorState.x - 24}px, ${cursorState.y - 24}px, 0)`,
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div
            className="max-w-4xl mx-auto text-center transition-transform duration-100 ease-out"
            style={{
              transform: `rotateX(${cursorState.tiltY}deg) rotateY(${cursorState.tiltX}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              {company.name}
            </h1>

            <div className="h-1 w-32 bg-secondary mx-auto mb-6 shadow-[0_0_20px_rgba(226,232,240,0.6)]" />

            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90">
              Building Your Dreams into Reality
            </p>

            <p className="text-lg mb-8 text-white/80">
              {company.description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/projects">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg hover:scale-110 transition-all shadow-xl"
                >
                  View Our Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-2 border-white hover:bg-white shadow-xl hover:scale-110 transition-all text-violet-950"
                >
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
            {services.map((service, index) => <Card key={index} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up border-2 hover:border-primary" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>)}
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
            {features.map((feature, index) => <div key={index} className="text-center p-6 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-2xl transition-all duration-500 group animate-scale-in cursor-pointer" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="w-20 h-20 bg-primary/10 group-hover:bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <feature.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary scroll-animate bg-slate-950 text-slate-50">
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
              <Button size="lg" variant="outline" className="text-lg border-2 border-white hover:bg-white shadow-xl hover:scale-110 transition-all text-violet-900">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>;
}