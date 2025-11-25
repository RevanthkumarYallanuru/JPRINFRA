import { useEffect } from "react";

export default function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.innerWidth <= 640;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".scroll-animate"));
    if (!elements.length) return;

    // If user prefers reduced motion or small screen, just add in-view immediately (lighter effect)
    if (prefersReduced || smallScreen) {
      elements.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // Optional: unobserve after first reveal
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
