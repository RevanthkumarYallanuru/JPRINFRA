import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="JPR INFRAWORKERS" 
                className="h-12 w-12 object-contain brightness-0 invert"
              />
              <div>
                <h3 className="text-lg font-bold">JPR</h3>
                <p className="text-xs tracking-wider">INFRAWORKERS</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Building excellence with precision, quality, and dedication. Your trusted partner in construction and infrastructure development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-secondary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-secondary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-secondary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm hover:text-secondary transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-secondary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Residential Construction</li>
              <li>Commercial Projects</li>
              <li>Infrastructure Development</li>
              <li>Architectural Design</li>
              <li>Interior Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Construction Ave, Building City, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-secondary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@jprinfraworks.com" className="hover:text-secondary transition-colors">
                  contact@jprinfraworks.com
                </a>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground rounded transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground rounded transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground rounded transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} JPR INFRAWORKERS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
