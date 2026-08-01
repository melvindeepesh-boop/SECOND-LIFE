"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Terminal, ShieldCheck, 
  TrendingUp, Leaf, Droplet, Users2 
} from "lucide-react";

// Mock log feed for the live mission status terminal
const MOCK_LOGS = [
  { time: "09:41:02", msg: "Device scan: iPhone 11 identified. Condition: 82%. Resale recommended." },
  { time: "09:40:45", msg: "Water conservation credits released: TechForSchools (850L offset)." },
  { time: "09:39:12", msg: "Courier pickup routed for Steel Bicycle [ID: 9852] -> Gears & Co." },
  { time: "09:37:33", msg: "Asset matched: 12 Vintage Oak Chairs allocated to Habitat Restore." },
  { time: "09:35:10", msg: "Recycling completed: 1.2 tons textile waste processed by TexCycle." },
  { time: "09:33:04", msg: "System: Core Neural Model version 4.12.8 loaded with 99.4% precision." }
];

export default function Dashboard() {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Custom SVG Chart Path coordinates
  const chartPoints = [
    { x: 0, y: 120 },
    { x: 50, y: 90 },
    { x: 100, y: 105 },
    { x: 150, y: 60 },
    { x: 200, y: 80 },
    { x: 250, y: 30 },
    { x: 300, y: 45 },
    { x: 350, y: 15 },
    { x: 400, y: 5 },
  ];

  // Convert chartPoints to SVG path string
  const linePath = chartPoints.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  // Area path (closes the shape at the bottom for background gradient)
  const areaPath = `${linePath} L 400 150 L 0 150 Z`;

  // Periodically insert new logs to simulate live operational data
  useEffect(() => {
    const logInterval = setInterval(() => {
      const items = ["Laptop", "Books Bundle", "Worn Apparel", "Lead Battery", "Cracked LCD TV", "Road Bicycle"];
      const destinations = ["TechForSchools NGO", "City Library Hub", "Red Cross Closet", "E-Waste Depot", "Recycling Hub", "Upcyclers Shop"];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const randomDest = destinations[Math.floor(Math.random() * destinations.length)];
      const time = new Date().toTimeString().split(" ")[0];

      const newLog = {
        time,
        msg: `Processed: ${randomItem} analyzed -> dispatched to ${randomDest}.`
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <section ref={containerRef} id="dashboard" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full flex flex-col justify-center border-t border-glass-border bg-glass-bg/5">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
            Mission Control
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-glow-cyan">
            AI Circular Economy Dashboard
          </h2>
          <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
            Real-time analytics driving regional item distribution, carbon offset indices, and NGO resource allocations worldwide.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Operating Status & Live Terminal (Grid Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* System Status Glass */}
            <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">SYSTEM: ACTIVE</span>
                  <span className="text-[10px] text-neutral-500 font-mono">Neural API V4.12.8</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold font-mono bg-cyan-950/20 px-2 py-0.5 border border-cyan-500/20 rounded">
                <ShieldCheck className="w-3.5 h-3.5" /> ADC VERIFIED
              </div>
            </div>

            {/* Terminal Live Stream */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col flex-1 gap-4 font-mono">
              <div className="flex items-center justify-between border-b border-glass-border pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" /> Operational Log stream
                </h4>
                <span className="text-[9px] text-neutral-500 font-bold uppercase">SECURE SHELL</span>
              </div>

              <div className="flex flex-col gap-3 text-[11px] leading-relaxed text-neutral-400 flex-1 justify-center">
                <AnimatePresence initial={false}>
                  {logs.map((log, i) => (
                    <motion.div
                      key={log.time + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2 border-b border-neutral-900/50 pb-2 last:border-b-0"
                    >
                      <span className="text-cyan-400 font-bold">[{log.time}]</span>
                      <span className="flex-1 truncate">{log.msg}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: SVG Charts & Circular Progress Rings (Grid Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* SVG Line Chart for Carbon Offsets over time */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Environmental Index</span>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    Carbon Reduction Growth <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 border border-emerald-500/20 rounded">
                  +12.8% MoM
                </span>
              </div>

              {/* Responsive SVG Container */}
              <div className="w-full h-44 relative bg-black/20 rounded-xl overflow-hidden p-2">
                <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <motion.path
                    d={areaPath}
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />

                  {/* SVG line path */}
                  <motion.path
                    d={linePath}
                    fill="transparent"
                    stroke="url(#lineGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />

                  {/* Gradient for the line path */}
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00f5ff" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </svg>
              </div>
            </div>

            {/* Circular Progress Rings (Grid side-by-side) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Carbon Target Met", val: "84K", target: "100K Tons", percent: 84, color: "text-cyan-400", icon: Leaf },
                { label: "Water Target Met", val: "62M", target: "100M Litres", percent: 62, color: "text-emerald-400", icon: Droplet },
                { label: "Refurbish Efficiency", val: "92%", target: "Target 95%", percent: 92, color: "text-indigo-400", icon: Users2 },
              ].map((ring) => {
                const Icon = ring.icon;
                return (
                  <div key={ring.label} className="glass-panel rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="34" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="5" />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeDasharray={2 * Math.PI * 34}
                          initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                          animate={isInView ? { strokeDashoffset: 2 * Math.PI * 34 * (1 - ring.percent / 100) } : {}}
                          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                          className={ring.color}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <Icon className={`w-4.5 h-4.5 ${ring.color}`} />
                      </div>
                    </div>
                    <span className="font-mono text-base font-black text-white">{ring.val}</span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold mt-1">{ring.label}</span>
                    <span className="text-[9px] text-neutral-500 mt-0.5">{ring.target}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
