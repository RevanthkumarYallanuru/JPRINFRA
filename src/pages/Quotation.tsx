// Quotation page component with cost estimation calculator
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Download } from "lucide-react";
import heroImage from "@/assets/hero-quotation.jpg";
import { useToast } from "@/hooks/use-toast";
import { siteData } from "@/lib/data";
import { saveQuotationRequest } from "@/lib/firebase/leads";
import { SEO } from "@/components/SEO";

export default function Quotation() {
  const { toast } = useToast();
  const { company } = siteData;
  const [formData, setFormData] = useState({
    projectType: "",
    area: "",
    floors: "",
    location: "",
    quality: ""
  });
  const [estimate, setEstimate] = useState<number | null>(null);
  const calculateEstimate = async () => {
    const area = parseFloat(formData.area);
    const floors = parseInt(formData.floors);
    if (!area || !floors || !formData.projectType || !formData.quality) {
      toast({
        title: "Missing details",
        description: "Please fill every required field to generate an estimate.",
        variant: "destructive",
      });
      return;
    }

    // Base rates per sq ft based on project type and quality
    const baseRates: Record<string, Record<string, number>> = {
      residential: {
        standard: 1500,
        premium: 2500,
        luxury: 4000
      },
      commercial: {
        standard: 2000,
        premium: 3000,
        luxury: 5000
      },
      industrial: {
        standard: 1200,
        premium: 2000,
        luxury: 3500
      },
      infrastructure: {
        standard: 1800,
        premium: 2800,
        luxury: 4500
      }
    };
    const rate = baseRates[formData.projectType]?.[formData.quality] || 1500;
    const floorMultiplier = 1 + (floors - 1) * 0.15; // 15% increase per additional floor
    const total = area * rate * floorMultiplier;
    setEstimate(total);

    try {
      await saveQuotationRequest({
        ...formData,
        area,
        floors,
        estimate: total,
      });
      toast({
        title: "Estimate ready",
        description: "Your quotation request has been saved for follow-up.",
      });
    } catch (error: any) {
      toast({
        title: "Unable to save request",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Construction Quotation Service",
    "provider": {
      "@type": "Organization",
      "name": "JPR INFRAWORKS"
    },
    "description": "Get free construction project quotation and cost estimation for residential construction, commercial building, and infrastructure development projects."
  };

  return <div>
      <SEO
        title="Free Construction Quotation & Cost Estimation | JPR INFRAWORKS"
        description="Get a free construction quotation and cost estimation for your residential construction, commercial building, or infrastructure development project. Calculate approximate construction costs with our online quotation calculator."
        keywords="construction quotation, construction cost estimation, free construction quote, construction project cost, builder quotation, construction company quotation, residential construction cost, commercial construction cost, construction estimate calculator"
        url="https://jprinfraworks.com/quotation"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Construction Quotation Calculator - JPR INFRAWORKS Construction Company" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/50 to-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">Get Free Construction Quotation</h1>
            <div className="h-1 w-32 bg-secondary mx-auto mb-6 animate-scale-in"></div>
            <p className="text-xl md:text-2xl leading-relaxed">
              Calculate an approximate cost for your construction project. Get free quotation for residential construction, commercial building, and infrastructure development projects.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-background scroll-animate">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="animate-slide-up hover:shadow-2xl transition-shadow duration-500">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">Project Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectType" id="projectType-label">Project Type *</Label>
                      <Select value={formData.projectType} onValueChange={value => setFormData({
                      ...formData,
                      projectType: value
                    })}>
                        <SelectTrigger 
                          id="projectType" 
                          className="hover:border-primary transition-colors"
                          aria-labelledby="projectType-label"
                        >
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="area">Total Area (sq ft) *</Label>
                      <Input id="area" type="number" placeholder="e.g., 2000" value={formData.area} onChange={e => setFormData({
                      ...formData,
                      area: e.target.value
                    })} className="hover:border-primary transition-colors" />
                    </div>

                    <div>
                      <Label htmlFor="floors">Number of Floors *</Label>
                      <Input id="floors" type="number" placeholder="e.g., 2" value={formData.floors} onChange={e => setFormData({
                      ...formData,
                      floors: e.target.value
                    })} className="hover:border-primary transition-colors" />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, State" value={formData.location} onChange={e => setFormData({
                      ...formData,
                      location: e.target.value
                    })} className="hover:border-primary transition-colors" />
                    </div>

                    <div>
                      <Label htmlFor="quality" id="quality-label">Construction Quality *</Label>
                      <Select value={formData.quality} onValueChange={value => setFormData({
                      ...formData,
                      quality: value
                    })}>
                        <SelectTrigger 
                          id="quality" 
                          className="hover:border-primary transition-colors"
                          aria-labelledby="quality-label"
                        >
                          <SelectValue placeholder="Select quality level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={calculateEstimate} className="w-full hover:scale-105 transition-transform" size="lg">
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Estimate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Result Display */}
              <div className="space-y-6 animate-slide-up" style={{
              animationDelay: "100ms"
            }}>
                <Card className="hover:shadow-2xl transition-shadow duration-500">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-primary mb-6">Estimated Cost</h2>
                    {estimate ? <div className="space-y-6">
                        <div className="p-8 bg-primary/5 rounded-lg text-center hover:bg-primary/10 transition-colors duration-300">
                          <p className="text-sm text-muted-foreground mb-2">Approximate Total Cost</p>
                          <p className="text-4xl font-bold text-primary animate-scale-in">{formatCurrency(estimate)}</p>
                          <p className="text-sm text-muted-foreground mt-2">+ Taxes & Other Charges</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b hover:bg-muted transition-colors duration-300 px-2 rounded">
                            <span className="text-muted-foreground">Project Type:</span>
                            <span className="font-semibold capitalize">{formData.projectType}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b hover:bg-muted transition-colors duration-300 px-2 rounded">
                            <span className="text-muted-foreground">Total Area:</span>
                            <span className="font-semibold">{formData.area} sq ft</span>
                          </div>
                          <div className="flex justify-between py-2 border-b hover:bg-muted transition-colors duration-300 px-2 rounded">
                            <span className="text-muted-foreground">Floors:</span>
                            <span className="font-semibold">{formData.floors}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b hover:bg-muted transition-colors duration-300 px-2 rounded">
                            <span className="text-muted-foreground">Quality Level:</span>
                            <span className="font-semibold capitalize">{formData.quality}</span>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                          <Download className="w-5 h-5 mr-2" />
                          Download Estimate PDF
                        </Button>
                      </div> : <div className="text-center py-12">
                        <Calculator className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50 animate-float" />
                        <p className="text-muted-foreground">
                          Fill in the project details and click "Calculate Estimate" to get your quotation.
                        </p>
                      </div>}
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <Card className="bg-muted/50 hover:shadow-xl transition-shadow duration-500">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">Important Note</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      This is an approximate estimate based on general market rates. Actual costs may vary based on location, 
                      material availability, labor costs, design complexity, and specific project requirements. Please contact 
                      us for a detailed and accurate quotation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-950 text-white scroll-animate">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a detailed consultation and accurate project quotation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" variant="secondary" className="px-8 hover:scale-110 transition-transform shadow-xl">
                CONTACT US
              </Button>
            </a>
            <a href="/projects">
              <Button size="lg" variant="outline" className="px-8 border-2 border-white hover:scale-110 transition-all shadow-xl bg-gray-700 hover:bg-gray-600 text-yellow-50">
                VIEW PROJECTS
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>;
}