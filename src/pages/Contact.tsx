// Contact page component with contact form and information
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Loader2, Send, CheckCircle2 } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "bdc4e2d1-a62d-47a4-af0c-4df059e8252b");
      formDataToSend.append("subject", `New Contact Form: ${formData.subject}`);
      formDataToSend.append("from_name", formData.name);
      formDataToSend.append("from_email", formData.email);
      // Set recipient email address
      formDataToSend.append("to", "jprinfraworks123@gmail.com");
      // Enable auto-reply to sender
      formDataToSend.append("autoreply", "true");
      // Set reply-to for easy response
      formDataToSend.append("replyto", formData.email);
      
      // Add email template formatting with website theme colors
      const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.7; 
      color: #001a2e; 
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      padding: 20px;
    }
    .email-wrapper { max-width: 650px; margin: 0 auto; }
    .email-container { 
      background: #ffffff; 
      border-radius: 16px; 
      overflow: hidden; 
      box-shadow: 0 10px 40px rgba(0, 26, 46, 0.15);
      border: 1px solid rgba(0, 26, 46, 0.1);
    }
    .header { 
      background: linear-gradient(135deg, #001a2e 0%, #003366 50%, #001a2e 100%);
      background-size: 200% 200%;
      animation: gradientShift 8s ease infinite;
      color: white; 
      padding: 50px 40px; 
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(244, 162, 97, 0.15) 0%, transparent 70%);
      animation: rotate 20s linear infinite;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: -30px;
      left: 0;
      right: 0;
      height: 30px;
      background: linear-gradient(to bottom, transparent, rgba(244, 162, 97, 0.1));
    }
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .header-content { position: relative; z-index: 1; }
    .header h1 { 
      font-size: 32px; 
      font-weight: 800; 
      margin-bottom: 12px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      letter-spacing: -0.5px;
    }
    .header .subtitle { 
      font-size: 16px; 
      opacity: 0.95; 
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .header .accent-line {
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, transparent, #f4a261, transparent);
      margin: 20px auto;
      border-radius: 2px;
    }
    .content { 
      padding: 40px; 
      background: #ffffff;
    }
    .info-grid { 
      display: grid; 
      gap: 18px; 
      margin-bottom: 30px; 
    }
    .info-item { 
      background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
      padding: 22px 24px; 
      border-radius: 12px; 
      border-left: 5px solid #f4a261;
      box-shadow: 0 2px 8px rgba(0, 26, 46, 0.08);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .info-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #f4a261 0%, #001a2e 100%);
    }
    .info-label { 
      font-weight: 700; 
      color: #001a2e; 
      font-size: 10px; 
      text-transform: uppercase; 
      letter-spacing: 1.2px; 
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .info-label-icon {
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #f4a261 0%, #e67e22 100%);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: white;
      font-weight: bold;
    }
    .info-value { 
      color: #001a2e; 
      font-size: 17px; 
      font-weight: 600; 
      word-break: break-word;
      margin-top: 4px;
    }
    .info-value a {
      color: #001a2e;
      text-decoration: none;
      border-bottom: 2px solid #f4a261;
      transition: all 0.3s ease;
    }
    .info-value a:hover {
      color: #f4a261;
      border-bottom-color: #001a2e;
    }
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #f4a261, transparent);
      margin: 35px 0;
      border-radius: 1px;
    }
    .message-section { 
      background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
      padding: 28px; 
      border-radius: 12px; 
      border: 2px solid #f4a261;
      box-shadow: 0 4px 12px rgba(0, 26, 46, 0.1);
      position: relative;
    }
    .message-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #001a2e 0%, #f4a261 50%, #001a2e 100%);
    }
    .message-label { 
      font-weight: 700; 
      color: #001a2e; 
      font-size: 10px; 
      text-transform: uppercase; 
      letter-spacing: 1.2px; 
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .message-label-icon {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #001a2e 0%, #003366 100%);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #f4a261;
      font-weight: bold;
    }
    .message-content { 
      color: #001a2e; 
      font-size: 16px; 
      line-height: 1.9; 
      white-space: pre-wrap;
      font-weight: 500;
    }
    .footer { 
      background: linear-gradient(135deg, #001a2e 0%, #003366 100%);
      padding: 35px 40px; 
      text-align: center;
      color: white;
      position: relative;
    }
    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #f4a261, transparent);
    }
    .footer p { 
      color: rgba(255, 255, 255, 0.9); 
      font-size: 13px; 
      margin: 6px 0;
      line-height: 1.6;
    }
    .footer p strong {
      color: #f4a261;
      font-weight: 700;
    }
    .footer .timestamp {
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      margin-top: 12px;
    }
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #f4a261 0%, #e67e22 100%);
      color: white;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 8px;
    }
    @media only screen and (max-width: 600px) {
      .content { padding: 25px 20px; }
      .header { padding: 35px 25px; }
      .header h1 { font-size: 26px; }
      .info-item { padding: 18px 20px; }
      .message-section { padding: 22px; }
      .footer { padding: 28px 25px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">
      <div class="header">
        <div class="header-content">
          <h1>🏗️ New Contact Form Submission</h1>
          <div class="accent-line"></div>
          <p class="subtitle">JPR INFRAWORKS</p>
          <p class="subtitle" style="font-size: 14px; margin-top: 8px; opacity: 0.85;">Construction Company</p>
        </div>
      </div>
      <div class="content">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">
              <span class="info-label-icon">👤</span>
              Full Name
            </div>
            <div class="info-value">${formData.name}</div>
          </div>
          <div class="info-item">
            <div class="info-label">
              <span class="info-label-icon">📧</span>
              Email Address
            </div>
            <div class="info-value">
              <a href="mailto:${formData.email}">${formData.email}</a>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">
              <span class="info-label-icon">📱</span>
              Phone Number
            </div>
            <div class="info-value">
              <a href="tel:${formData.phone.replace(/\s/g, '')}">${formData.phone}</a>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">
              <span class="info-label-icon">📌</span>
              Subject
            </div>
            <div class="info-value">${formData.subject}</div>
            <span class="badge">New Inquiry</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="message-section">
          <div class="message-label">
            <span class="message-label-icon">💬</span>
            Message
          </div>
          <div class="message-content">${formData.message.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
      <div class="footer">
        <p><strong>📬 Contact Form Submission</strong></p>
        <p>This email was sent from the contact form on <strong>jprinfraworks.com</strong></p>
        <p class="timestamp">Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
        <p style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(244, 162, 97, 0.2); color: rgba(255, 255, 255, 0.8); font-size: 12px;">
          You can reply directly to this email to respond to <strong style="color: #f4a261;">${formData.name}</strong>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
      `;
      
      formDataToSend.append("html_content", emailTemplate);
      
      // Plain text version for email clients that don't support HTML
      const plainText = `
New Contact Form Submission - JPR INFRAWORKS

Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}

---
Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
This email was sent from the contact form on jprinfraworks.com
      `;
      formDataToSend.append("message", plainText);

      // Submit to Web3Forms
      console.log("Submitting form to Web3Forms...");
      console.log("Recipient email: jprinfraworks123@gmail.com");
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("Web3Forms response:", data);

      if (!data.success) {
        console.error("Web3Forms error:", data);
        const errorMessage = data.message || data.error || "Failed to send email";
        throw new Error(`${errorMessage}. Please verify your Web3Forms access key is correct and the recipient email is configured.`);
      }

      console.log("Email sent successfully! Message ID:", data.message_id);

      // Also save to Firebase as backup
      try {
        await saveContactLead(formData);
      } catch (firebaseError) {
        // Log but don't fail if Firebase save fails
        console.warn("Failed to save to Firebase:", firebaseError);
      }

      toast({
        title: "Message sent successfully! ✅",
        description: `Your message has been sent to jprinfraworks123@gmail.com. We'll get back to you soon!`,
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Unable to send message",
        description: error.message || "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full hover:scale-105 transition-transform" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
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