// Footer component with company information and links
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";
import { siteData } from "@/lib/data";

export const Footer = () => {
  const { company, contact, social, footerServices, navLinks } = siteData;
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt={company.name} 
                className="h-12 w-12 object-contain rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">{company.name}</h3>
                <p className="text-xs tracking-wider">{company.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {footerServices.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contact.address.full}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-secondary transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-secondary transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href={social.facebook} className="p-2 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground rounded transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={social.instagram} className="p-2 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground rounded transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={social.linkedin} className="p-2 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground rounded transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
            <Link to="/projects">
              <Button variant="secondary" size="lg" className="font-semibold shadow-lg hover:shadow-xl transition-all">
                View Our Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
