"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-4 md:px-12 flex items-center justify-between"
    >
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center bg-glow-cyan transition-transform duration-300 group-hover:rotate-12">
          <Leaf className="w-5 h-5 text-black" strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-cyan-300 font-sans">
          SECONDLIFE
        </span>
      </a>

      {/* Nav Links - Desktop */}
      <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full border border-glass-border bg-glass-bg backdrop-blur-md">
        {["Scanner", "Services", "Dashboard", "Stories", "Community", "Education"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              const target = item.toLowerCase() === "education" ? "community" : item.toLowerCase();
              document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-800/40 cursor-pointer"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Call to action */}
      <div className="flex items-center gap-4">
        <a
          href="#scanner"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("scanner")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-300 shadow-md bg-glow-cyan glow-button hover:scale-105 active:scale-95"
        >
          ♻ Scan Item
        </a>
      </div>
    </motion.header>
  );
}
