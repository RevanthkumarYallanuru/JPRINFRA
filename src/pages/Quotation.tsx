import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Download } from "lucide-react";
import heroImage from "@/assets/hero-quotation.jpg";

export default function Quotation() {
  const [formData, setFormData] = useState({
    projectType: "",
    area: "",
    floors: "",
    location: "",
    quality: "",
  });

  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = () => {
    const area = parseFloat(formData.area);
    const floors = parseInt(formData.floors);
    
    if (!area || !floors || !formData.projectType || !formData.quality) {
      return;
    }

    // Base rates per sq ft based on project type and quality
    const baseRates: Record<string, Record<string, number>> = {
      residential: { standard: 1500, premium: 2500, luxury: 4000 },
      commercial: { standard: 2000, premium: 3000, luxury: 5000 },
      industrial: { standard: 1200, premium: 2000, luxury: 3500 },
      infrastructure: { standard: 1800, premium: 2800, luxury: 4500 },
    };

    const rate = baseRates[formData.projectType]?.[formData.quality] || 1500;
    const floorMultiplier = 1 + (floors - 1) * 0.15; // 15% increase per additional floor
    const total = area * rate * floorMultiplier;

    setEstimate(total);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="Construction Cost Calculator" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-secondary" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Quotation Generator</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Get an instant approximate cost estimate for your construction project
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="animate-slide-up">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">Project Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger>
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
                      <Input
                        id="area"
                        type="number"
                        placeholder="e.g., 2000"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="floors">Number of Floors *</Label>
                      <Input
                        id="floors"
                        type="number"
                        placeholder="e.g., 2"
                        value={formData.floors}
                        onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="quality">Construction Quality *</Label>
                      <Select
                        value={formData.quality}
                        onValueChange={(value) => setFormData({ ...formData, quality: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={calculateEstimate} className="w-full" size="lg">
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate Estimate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Result Display */}
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-primary mb-6">Estimated Cost</h2>
                    {estimate ? (
                      <div className="space-y-6">
                        <div className="p-8 bg-primary/5 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-2">Approximate Total Cost</p>
                          <p className="text-4xl font-bold text-primary">{formatCurrency(estimate)}</p>
                          <p className="text-sm text-muted-foreground mt-2">+ Taxes & Other Charges</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Project Type:</span>
                            <span className="font-semibold capitalize">{formData.projectType}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Total Area:</span>
                            <span className="font-semibold">{formData.area} sq ft</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Floors:</span>
                            <span className="font-semibold">{formData.floors}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Quality Level:</span>
                            <span className="font-semibold capitalize">{formData.quality}</span>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          <Download className="w-5 h-5 mr-2" />
                          Download Estimate PDF
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Calculator className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                          Fill in the project details and click "Calculate Estimate" to get your quotation.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <Card className="bg-muted/50">
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
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Contact us today for a detailed consultation and accurate project quotation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" variant="secondary" className="px-8">
                CONTACT US
              </Button>
            </a>
            <a href="/projects">
              <Button size="lg" variant="outline" className="px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                VIEW PROJECTS
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
