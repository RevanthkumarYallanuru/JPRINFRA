// Contact page component with contact form and information
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-contact.jpg";
import { siteData } from "@/lib/data";
import { saveContactLead } from "@/lib/firebase/leads";
import { SEO } from "@/components/SEO";

export default function Contact() {
  const { toast } = useToast();
  const { company, contact } = siteData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveContactLead(formData);
      toast({
        title: "Message submitted",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Unable to send message",
        description: error.message || "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [contact.phone, contact.phoneSecondary],
    },
    {
      icon: Mail,
      title: "Email",
      details: [contact.email, contact.emailSecondary],
    },
    {
      icon: MapPin,
      title: "Address",
      details: [contact.address.line1, contact.address.line2],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [contact.workingHours.weekdays, contact.workingHours.saturday],
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "JPR INFRAWORKS",
      "telephone": contact.phone,
      "email": contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": contact.address.line1,
        "addressLocality": "Building City",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div>
      <SEO
        title="Contact JPR INFRAWORKS - Construction Company | Get Free Quotation"
        description="Contact JPR INFRAWORKS construction company for construction project inquiries, free quotations, and consultations. Get in touch with our builder and architect team for residential construction, commercial projects, and infrastructure development."
        keywords="contact construction company, construction company contact, builder contact, architect contact, construction quotation, construction consultation, construction company phone, construction company email"
        url="https://jprinfraworks.com/contact"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Contact JPR INFRAWORKS Construction Company - Get Free Quotation and Construction Consultation" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/50 to-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">Contact {company.name} - Construction Company</h1>
            <div className="h-1 w-32 bg-secondary mx-auto mb-6 animate-scale-in"></div>
            <p className="text-xl md:text-2xl leading-relaxed">
              Get in touch with our construction company for any construction project inquiries, free quotations, or consultations. Contact our builder and architect team for residential construction, commercial projects, and infrastructure development.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background scroll-animate">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold text-primary mb-6">Send us a Message</h2>
              <Card className="hover:shadow-2xl transition-shadow duration-500">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="hover:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="hover:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={contact.phone}
                        className="hover:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        id="contact-subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Inquiry"
                        className="hover:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="contact-message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project requirements..."
                        rows={6}
                        className="hover:border-primary transition-colors"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full hover:scale-105 transition-transform">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <h2 className="text-3xl font-bold text-primary mb-6">Contact Information</h2>
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                        <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}