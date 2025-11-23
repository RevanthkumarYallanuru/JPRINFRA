// Loading screen component displayed on initial page load
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";
import { siteData } from "@/lib/data";

export const Loader = () => {
  const { company } = siteData;
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoading) return null;
  
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
      <div className="text-center animate-fade-in">
        <div className="mb-6 animate-slide-up">
          <img src={logo} alt={company.name} className="w-48 h-48 mx-auto object-contain" loading="eager" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground tracking-wider animate-silde-up">
          {company.name}
        </h1>
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{
          animationDelay: "0ms"
        }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{
          animationDelay: "150ms"
        }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{
          animationDelay: "300ms"
        }}></div>
        </div>
      </div>
    </div>;
};