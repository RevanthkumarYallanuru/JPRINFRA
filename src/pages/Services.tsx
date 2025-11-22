import { Card, CardContent } from "@/components/ui/card";
import { Building2, Home, Ruler, PaintBucket, Hammer, Building } from "lucide-react";
import heroImage from "@/assets/hero-services.jpg";

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: "Residential Construction",
      description: "We specialize in building high-quality residential properties from the ground up. Our team ensures precision, quality, and personalized attention to every detail, creating homes that perfectly match your vision and lifestyle needs.",
      features: ["Custom Home Building", "Villa Construction", "Apartment Complexes", "Renovation & Remodeling"],
    },
    {
      icon: Building,
      title: "Commercial Projects",
      description: "From office buildings to retail spaces, we deliver commercial construction solutions that meet your business needs. Our expertise ensures functional, aesthetic, and efficient commercial spaces.",
      features: ["Office Buildings", "Shopping Centers", "Industrial Facilities", "Warehouse Construction"],
    },
    {
      icon: Hammer,
      title: "Infrastructure Development",
      description: "We undertake large-scale infrastructure projects with expertise in civil engineering and construction. Our team delivers robust, sustainable infrastructure solutions.",
      features: ["Road Construction", "Bridges & Flyovers", "Water Supply Systems", "Drainage Systems"],
    },
    {
      icon: Ruler,
      title: "Architectural Design",
      description: "Our architectural design services combine creativity with functionality. We create blueprints that transform into masterpieces, ensuring every detail contributes to the overall excellence.",
      features: ["Residential Architecture", "Commercial Design", "3D Visualization", "Structural Planning"],
    },
    {
      icon: PaintBucket,
      title: "Interior Design",
      description: "Transform your spaces with our expert interior design services. We create beautiful, functional interiors that reflect your style and enhance your living or working environment.",
      features: ["Residential Interiors", "Commercial Interiors", "Space Planning", "Furniture Design"],
    },
    {
      icon: Home,
      title: "Project Management",
      description: "Comprehensive project management services ensuring timely delivery, quality control, and budget management. We handle every aspect of your construction project from start to finish.",
      features: ["Budget Planning", "Timeline Management", "Quality Control", "Resource Coordination"],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={heroImage} alt="Our Services" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Comprehensive Construction & Infrastructure Solutions Tailored to Your Needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6">
                  <div className="mb-6 p-4 bg-primary/5 rounded-lg w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <service.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-primary text-center mb-12">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Consultation", desc: "Understanding your requirements" },
                { step: "02", title: "Planning", desc: "Detailed project planning & design" },
                { step: "03", title: "Execution", desc: "Quality construction work" },
                { step: "04", title: "Delivery", desc: "On-time project handover" },
              ].map((item, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-5xl font-bold text-secondary mb-3">{item.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Our Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Let's discuss your project requirements and create something exceptional together.
          </p>
          <a href="/contact" className="inline-block bg-secondary text-secondary-foreground px-8 py-4 rounded-md text-lg font-semibold hover:scale-105 transition-transform">
            GET A QUOTE
          </a>
        </div>
      </section>
    </div>
  );
}
