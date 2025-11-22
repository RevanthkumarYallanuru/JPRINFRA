import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
      <div className="text-center animate-fade-in">
        <div className="mb-6 animate-slide-up">
          <img 
            src={logo} 
            alt="JPR INFRAWORKERS" 
            className="w-48 h-48 mx-auto object-contain"
            loading="eager"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground tracking-wider animate-slide-up">
          JPR INFRAWORKERS
        </h1>
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};
