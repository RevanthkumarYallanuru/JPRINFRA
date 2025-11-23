// About page component with company information and values
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-about.jpg";
import { siteData } from "@/lib/data";

export default function About() {
  const { company, mission, vision, values, expertise, standOut } = siteData;
  return <div>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="About JPR INFRAWORKS" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/50 to-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">About {company.name}</h1>
            <div className="h-1 w-32 bg-secondary mx-auto mb-6 animate-scale-in"></div>
            <p className="text-xl md:text-2xl leading-relaxed">
              Building excellence with precision, quality, and dedication since our inception
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-background scroll-animate">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6 text-center">Who We Are</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                {company.fullDescription}
              </p>
              <p className="mb-4 leading-relaxed">
                Our team of skilled professionals combines technical expertise with creative vision to transform your dreams into reality. We take pride in our commitment to excellence, timely delivery, and customer satisfaction.
              </p>
              <p className="leading-relaxed">
                From architectural design to project completion, we handle every aspect with meticulous attention to detail, ensuring that each project meets the highest standards of quality and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/50 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="animate-slide-up hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary group">
              <CardContent className="p-8 text-center">
                <div className="mb-4 p-4 bg-primary/10 rounded-full w-fit mx-auto group-hover:bg-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                  <Target className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-foreground transition-colors">{mission.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mission.description}
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary group" style={{
            animationDelay: "100ms"
          }}>
              <CardContent className="p-8 text-center">
                <div className="mb-4 p-4 bg-primary/10 rounded-full w-fit mx-auto group-hover:bg-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                  <Eye className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-foreground transition-colors">{vision.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {vision.description}
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 hover:border-primary group" style={{
            animationDelay: "200ms"
          }}>
              <CardContent className="p-8 text-center">
                <div className="mb-4 p-4 bg-primary/10 rounded-full w-fit mx-auto group-hover:bg-primary group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                  <Award className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-foreground transition-colors">{values.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {values.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-20 bg-background scroll-animate">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">Experience & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Our Expertise</h3>
                <ul className="space-y-3">
                  {expertise.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Why We Stand Out</h3>
                <ul className="space-y-3">
                  {standOut.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black-300 text-white scroll-animate bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="w-16 h-16 mx-auto mb-6 text-white animate-float" />
            <h2 className="text-4xl font-bold mb-6">Our Team</h2>
            <p className="text-xl leading-relaxed">
              Our success is driven by a dedicated team of professionals including experienced architects, skilled engineers, project managers, and craftsmen who are passionate about delivering excellence in every project.
            </p>
          </div>
        </div>
      </section>
    </div>;
}