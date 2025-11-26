import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.innerWidth <= 640;

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout;

    // Small delay to ensure DOM is fully rendered after route change
    timeoutId = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-animate"));
      if (!elements.length) return;

      // If user prefers reduced motion or small screen, just add in-view immediately (lighter effect)
      if (prefersReduced || smallScreen) {
        elements.forEach((el) => el.classList.add("in-view"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              // Optional: unobserve after first reveal
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.12,
        }
      );

      elements.forEach((el) => {
        // Reset the element state first
        el.classList.remove("in-view");
        
        // Check if element is already in viewport and add class immediately
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        
        if (isInViewport) {
          el.classList.add("in-view");
        } else {
          observer?.observe(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);
}
