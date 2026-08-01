"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Info } from "lucide-react";

export default function Comparison() {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const metrics = [
    { name: "Waste Generated", traditional: "100% (Landfill Destination)", secondlife: "< 5% (Complete Recovery)", color: "border-red-500/20" },
    { name: "Carbon Footprint", traditional: "High (Manufacturing & Decays)", secondlife: "80% Offset via Re-use", color: "border-emerald-500/20" },
    { name: "Raw Material Costs", traditional: "Exponential Increase", secondlife: "Up to 60% Savings", color: "border-cyan-500/20" },
    { name: "Social Support", traditional: "None (Incinerators & Pollution)", secondlife: "NGO Grants & Jobs Provided", color: "border-indigo-500/20" },
  ];

  return (
    <section ref={sectionRef} id="why-choose-secondlife" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full overflow-hidden flex flex-col justify-center border-t border-glass-border bg-glass-bg/5">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
            Ecosystem Comparison
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-glow-cyan">
            Traditional Disposal vs. SecondLife
          </h2>
          <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
            Slide the handle below to see how our circular network transforms dark industrial landfill waste into an active, community-supporting emerald garden.
          </p>
        </div>

        {/* Visual Split-Slider Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden border border-glass-border cursor-ew-resize select-none bg-black"
        >
          {/* LEFT: Traditional (Base layer) */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 flex flex-col justify-center px-12 md:px-24">
            <div className="max-w-md flex flex-col gap-3">
              <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Traditional Disposal</span>
              <h3 className="text-3xl font-black text-white/90">Incineration & Landfill</h3>
              <p className="text-sm text-neutral-400 font-light">
                Valuable electronics, furniture and clothing are buried or burned, releasing toxic methane, heavy metals, and burning through raw planetary resources.
              </p>
              <div className="mt-4 flex gap-6 text-xs font-mono text-red-400">
                <div>[ CO2: +450kg ]</div>
                <div>[ Lifespan: Cut Short ]</div>
              </div>
            </div>
            {/* Smog effect overlay */}
            <div className="absolute inset-0 bg-red-950/10 pointer-events-none mix-blend-color" />
          </div>

          {/* RIGHT: SecondLife (Sliding overlay) */}
          <div 
            className="absolute inset-y-0 right-0 bg-gradient-to-r from-emerald-950/90 via-cyan-950/90 to-emerald-900/90 flex flex-col justify-center px-12 md:px-24 overflow-hidden border-l border-cyan-400/40"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Shift content leftward to align even as slider moves */}
            <div 
              className="absolute inset-y-0 left-0 w-[100vw] flex flex-col justify-center px-12 md:px-24"
              style={{ width: containerWidth || "100%" }}
            >
              <div className="max-w-md flex flex-col gap-3">
                <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">SecondLife Network</span>
                <h3 className="text-3xl font-black text-white">AI-Optimized Circularity</h3>
                <p className="text-sm text-neutral-300 font-light">
                  Artificial Intelligence matches items directly to local repairers, NGOs and certified recyclers. Extending lifecycle offsets 80% of carbon impact.
                </p>
                <div className="mt-4 flex gap-6 text-xs font-mono text-cyan-300">
                  <div>[ Carbon: Saved ]</div>
                  <div>[ Lifespan: Infinite ]</div>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Handle Line */}
          <div 
            className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-cyan-400 via-white to-emerald-400 pointer-events-none flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center shadow-lg bg-glow-cyan text-xs font-bold text-cyan-300 pointer-events-none">
              ↔
            </div>
          </div>
        </div>

        {/* Detailed Metrics Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {metrics.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-panel border ${m.color} rounded-2xl p-6 flex flex-col gap-4`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">{m.name}</h4>
                <Info className="w-4 h-4 text-neutral-500" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col text-xs">
                  <span className="text-neutral-500 font-semibold uppercase">Traditional</span>
                  <span className="text-red-400 font-medium mt-0.5">{m.traditional}</span>
                </div>
                <div className="flex flex-col text-xs border-t border-glass-border/40 pt-2">
                  <span className="text-cyan-400 font-semibold uppercase">SecondLife</span>
                  <span className="text-emerald-400 font-bold mt-0.5">{m.secondlife}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
