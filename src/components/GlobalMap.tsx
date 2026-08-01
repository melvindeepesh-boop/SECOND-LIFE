"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Navigation, Pin } from "lucide-react";

interface Hub {
  id: string;
  name: string;
  type: string;
  x: number; // percentage coordinate on SVG
  y: number;
  metric: string;
  details: string;
}

export default function GlobalMap() {
  const [activeHub, setActiveHub] = useState<Hub | null>(null);

  const hubs: Hub[] = [
    { id: "sf", name: "Silicon Valley Hub", type: "Tech Ingestion Node", x: 18, y: 35, metric: "12,850+ Items Processed", details: "Primary corporate laptop ingestion and electronics sorting center." },
    { id: "ny", name: "New York Station", type: "NGO Logistics Node", x: 28, y: 32, metric: "4,200+ Families Supported", details: "Coordinating apparel sorting and distribution to regional shelters." },
    { id: "ldn", name: "London Collective", type: "Textile Repair Lab", x: 48, y: 25, metric: "8,900+ Garments Restored", details: "Specialist sewing workshop repairing winter outdoor wear." },
    { id: "nrb", name: "Nairobi Academy", type: "Resource Distribution Center", x: 57, y: 62, metric: "5,400+ Students Benefited", details: "Receiving refurbished educational materials and laptops." },
    { id: "bom", name: "Mumbai Upcycling Collective", type: "Community Design School", x: 70, y: 48, metric: "1,450+ Designers Trained", details: "Transforming furniture debris and fabrics into designer crafts." },
    { id: "tyo", name: "Tokyo Micro-Fixer", type: "Precision Refurbish Center", x: 88, y: 34, metric: "7,800+ Devices Revived", details: "High-spec repair lab focusing on mobile smartphones and tablets." }
  ];

  // Connecting lines between hubs representing resource flows
  const connections = [
    { from: "sf", to: "ny", path: "M 18 35 Q 23 30 28 32" },
    { from: "ny", to: "ldn", path: "M 28 32 Q 38 22 48 25" },
    { from: "ldn", to: "nrb", path: "M 48 25 Q 52 45 57 62" },
    { from: "sf", to: "bom", path: "M 18 35 Q 45 25 70 48" },
    { from: "tyo", to: "sf", path: "M 88 34 Q 53 10 18 35" }
  ];

  return (
    <section id="global-map" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full bg-black/10 flex flex-col justify-center border-t border-glass-border">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
            Global Coordination
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-glow-cyan">
            Interactive Global Map
          </h2>
          <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
            SecondLife operates hubs across key global cities to coordinate local collections, repairs, and direct distribution to high-need communities. Hover over the nodes to inspect metrics.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full aspect-[2/1] rounded-3xl overflow-hidden border border-glass-border bg-glass-bg/10 backdrop-blur-md p-4">
          
          {/* SVG Map Layer */}
          <svg viewBox="0 0 100 50" className="w-full h-full text-neutral-800 pointer-events-none select-none">
            {/* World outline placeholder path grid for clean technical look */}
            <g opacity="0.15">
              <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
              <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
              <line x1="20" y1="0" x2="20" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
              <line x1="40" y1="0" x2="40" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
              <line x1="60" y1="0" x2="60" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
              <line x1="80" y1="0" x2="80" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.15" strokeDasharray="1" />
            </g>

            {/* Glowing connection lines */}
            {connections.map((conn, idx) => (
              <g key={idx}>
                {/* Background static line */}
                <path
                  d={conn.path}
                  fill="transparent"
                  stroke="rgba(0, 245, 255, 0.08)"
                  strokeWidth="0.4"
                />
                {/* Animated pulsing segment */}
                <motion.path
                  d={conn.path}
                  fill="transparent"
                  stroke="url(#mapLineGradient)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "1, 15", strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -30 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear"
                  }}
                />
              </g>
            ))}

            {/* Gradient definition for lines */}
            <defs>
              <linearGradient id="mapLineGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Hub Node Dots overlay */}
          {hubs.map((hub) => {
            const isActive = activeHub?.id === hub.id;
            return (
              <div
                key={hub.id}
                style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                onMouseEnter={() => setActiveHub(hub)}
                onMouseLeave={() => setActiveHub(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 p-4"
              >
                <div className="relative flex items-center justify-center">
                  {/* Pulsing ring */}
                  <span className={`absolute inline-flex rounded-full h-8 w-8 bg-cyan-400/20 transition-all duration-300 ${
                    isActive ? "scale-150 bg-emerald-400/30" : "animate-pulse"
                  }`} />
                  
                  {/* Center Dot */}
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-black shadow-md transition-colors duration-300 ${
                    isActive ? "bg-emerald-400" : "bg-cyan-400"
                  }`} />
                </div>
              </div>
            );
          })}

          {/* Dynamic Popup Tooltip */}
          <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-80">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={activeHub ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 0 }}
              className="glass-panel border border-cyan-400/20 rounded-2xl p-5"
            >
              {activeHub ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      {activeHub.type}
                    </span>
                    <Globe2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{activeHub.name}</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                    {activeHub.details}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-400 font-mono">
                    <Navigation className="w-3.5 h-3.5" /> {activeHub.metric}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-neutral-400 text-xs py-2">
                  <Pin className="w-5 h-5 text-cyan-400/50 animate-bounce" />
                  <span>Hover over any coordinate point on the map grid to inspect hub details.</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
