"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "hero", label: "Home" },
  { id: "stats", label: "Impact Stats" },
  { id: "scanner", label: "AI Scanner" },
  { id: "how-it-works", label: "Timeline" },
  { id: "services", label: "Services" },
  { id: "why-choose-secondlife", label: "Comparison" },
  { id: "stories", label: "Impact Stories" },
  { id: "dashboard", label: "ESG Dashboard" },
  { id: "global-map", label: "Global Map" },
  { id: "community", label: "Community Hub" },
  { id: "testimonials", label: "Reviews" },
  { id: "blog", label: "Insights" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact Form" },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Find the current active section based on scroll offset
      const scrollPos = window.scrollY + window.innerHeight / 3;

      // Special case: top of the page is always hero
      if (window.scrollY < 200) {
        setActiveSection("hero");
        return;
      }

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = SECTIONS[i];
        const el = document.getElementById(section.id);
        if (section.id === "hero") {
          // Hero is top of page
          continue;
        }

        if (el) {
          const offsetTop = el.offsetTop;
          if (scrollPos >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center hidden md:flex bg-glass-bg/25 border border-glass-border px-2 py-5 rounded-full backdrop-blur-md">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => handleDotClick(sec.id)}
            className="group relative flex items-center justify-center w-3.5 h-3.5 cursor-pointer outline-none"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Hover Tooltip label */}
            <span className="absolute right-7 px-2.5 py-1 rounded bg-neutral-900 border border-glass-border text-[9px] font-bold uppercase tracking-widest text-neutral-400 opacity-0 scale-90 origin-right transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap">
              {sec.label}
            </span>

            {/* Glowing Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.3 : 1,
                backgroundColor: isActive ? "#00f5ff" : "rgba(255, 255, 255, 0.15)",
                boxShadow: isActive ? "0 0 10px #00f5ff" : "none",
              }}
              className="w-2.5 h-2.5 rounded-full border border-transparent group-hover:border-cyan-400 group-hover:bg-cyan-950 transition-colors"
            />
          </button>
        );
      })}
    </div>
  );
}
