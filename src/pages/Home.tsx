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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Mouse move handler for 3D parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () => heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return <div>
      {/* Hero Section with 3D Animations */}
      <section 
        ref={heroRef}
        className="relative py-32 overflow-hidden perspective-3d"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background Image with 3D Parallax */}
        <div 
          className="absolute inset-0 transform-3d"
          style={{
            transform: `perspective(1000px) translateZ(${mousePosition.x * 0.5}px) rotateY(${mousePosition.x * 0.1}deg) rotateX(${-mousePosition.y * 0.1}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img 
            src={heroImage} 
            alt={`${company.name} Construction`} 
            className="w-full h-full object-cover animate-parallax-3d" 
            loading="eager"
            style={{
              transform: "scale(1.1)",
            }}
          />
        </div>
        
        {/* Gradient Overlay with Depth */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black/60 via-primary/40 to-black/70 transform-3d"
          style={{
            transform: `translateZ(10px)`,
          }}
        />

        {/* Floating 3D Decorative Elements */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float-3d transform-3d"
          style={{
            transform: `translateZ(50px)`,
            animationDelay: "0s",
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-float-3d transform-3d"
          style={{
            transform: `translateZ(30px)`,
            animationDelay: "2s",
          }}
        />
        <div 
          className="absolute top-1/2 right-20 w-24 h-24 bg-secondary/30 rounded-full blur-lg animate-depth-pulse transform-3d"
          style={{
            transform: `translateZ(40px)`,
            animationDelay: "1s",
          }}
        />

        {/* Main Content with 3D Transform */}
        <div className="container mx-auto px-4 relative z-10 transform-3d">
          <div 
            className="max-w-4xl mx-auto text-center text-white"
            style={{
              transform: `perspective(1000px) translateZ(${mousePosition.y * 0.3}px) rotateX(${-mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Company Name with 3D Glow Effect */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in-3d animate-glow-3d"
              style={{
                textShadow: "0 0 30px rgba(43, 96%, 56%, 0.5), 0 0 60px rgba(43, 96%, 56%, 0.3)",
                transform: "perspective(1000px) translateZ(20px)",
              }}
            >
              {company.name}
            </h1>
            
            {/* Decorative Line with 3D Effect */}
            <div 
              className="h-1 w-32 bg-secondary mx-auto mb-6 animate-scale-in transform-3d"
              style={{
                transform: "perspective(1000px) translateZ(15px) rotateX(45deg)",
                boxShadow: "0 0 20px rgba(43, 96%, 56%, 0.6)",
              }}
            />
            
            {/* Tagline with Floating Animation */}
            <p 
              className="text-xl md:text-2xl mb-8 leading-relaxed animate-float-3d transform-3d"
              style={{
                animationDelay: "0.2s",
                transform: "perspective(1000px) translateZ(10px)",
              }}
            >
              Building Your Dreams into Reality
            </p>
            
            {/* Description with Depth */}
            <p 
              className="text-lg mb-8 text-white/90 animate-fade-in transform-3d"
              style={{
                animationDelay: "0.4s",
                transform: "perspective(1000px) translateZ(5px)",
              }}
            >
              {company.description}
            </p>
            
            {/* CTA Buttons with 3D Hover Effect */}
            <div 
              className="flex flex-wrap gap-4 justify-center animate-fade-in transform-3d"
              style={{
                animationDelay: "0.6s",
                transform: "perspective(1000px) translateZ(25px)",
              }}
            >
              <Link to="/projects">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg hover:scale-110 transition-all shadow-xl transform-3d group"
                  style={{
                    transform: "perspective(1000px) translateZ(0px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "perspective(1000px) translateZ(30px) rotateY(5deg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(1000px) translateZ(0px) rotateY(0deg)";
                  }}
                >
                  View Our Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg border-2 border-white hover:bg-white shadow-xl hover:scale-110 transition-all text-violet-950 transform-3d group"
                  style={{
                    transform: "perspective(1000px) translateZ(0px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "perspective(1000px) translateZ(30px) rotateY(-5deg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(1000px) translateZ(0px) rotateY(0deg)";
                  }}
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