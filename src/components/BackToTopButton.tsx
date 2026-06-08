import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopButtonProps {
  hasActiveComparison?: boolean;
}

export default function BackToTopButton({ hasActiveComparison = false }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      id="back-to-top-fab"
      className={`fixed ${
        hasActiveComparison ? "bottom-32 md:bottom-8" : "bottom-8"
      } right-28 md:right-32 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-black text-white border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 hover:bg-gold-foil hover:text-black hover:border-gold-foil ${
        isVisible
          ? "opacity-100 translate-y-0 cursor-pointer pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp size={22} className="stroke-[2.5]" />
    </button>
  );
}
