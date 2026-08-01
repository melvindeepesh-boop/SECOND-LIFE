"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Scan } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center px-6 md:px-16 lg:px-24 overflow-hidden pt-20">
      {/* Content wrapper */}
      <div className="relative z-10 max-w-4xl flex flex-col items-start gap-8">
        {/* Sub-header badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.05)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Future of Sustainability
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight font-sans"
        >
          Nothing Valuable <br />
          Should Become{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-emerald-400 text-glow-cyan">
            Waste.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed font-light"
        >
          SecondLife is an AI-powered Circular Economy Platform helping individuals, 
          organizations, and recycling networks repair, donate, upcycle and recycle items 
          collaboratively to build a sustainable future.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap items-center gap-4 mt-2"
        >
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-cyan-400/30 hover:border-cyan-400 bg-cyan-950/15 hover:bg-cyan-950/40 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Discover Your Impact
          </a>
          <a
            href="#scanner"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("scanner")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all duration-300 shadow-md bg-glow-cyan glow-button hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Scan className="w-4 h-4 text-black" />
            Scan an Item
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#stats"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-10 cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500 font-semibold group-hover:text-cyan-400 transition-colors">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
        </motion.div>
      </motion.a>
    </section>
  );
}
