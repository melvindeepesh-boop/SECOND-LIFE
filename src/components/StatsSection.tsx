"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Heart, Shield, GraduationCap, Droplet, Trees } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const end = value;
    const totalFrames = 60 * duration;
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const currentVal = Math.round(end * (1 - (1 - progress) * (1 - progress)));
      
      setCount(currentVal);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counterInterval);
      }
    }, 1000 / 60);

    return () => clearInterval(counterInterval);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-glow-cyan">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    {
      label: "Items Given A Second Life",
      value: 2458912,
      suffix: "+",
      icon: Globe,
      color: "text-cyan-400",
      glow: "rgba(6, 182, 212, 0.15)",
    },
    {
      label: "Families Supported",
      value: 145200,
      suffix: "+",
      icon: Heart,
      color: "text-rose-400",
      glow: "rgba(244, 63, 94, 0.15)",
    },
    {
      label: "Partner NGOs & School Groups",
      value: 850,
      suffix: "",
      icon: GraduationCap,
      color: "text-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)",
    },
    {
      label: "Carbon Prevented (Tons)",
      value: 12850,
      suffix: " T",
      icon: Shield,
      color: "text-indigo-400",
      glow: "rgba(99, 102, 241, 0.15)",
    },
    {
      label: "Water Conserved (M Litres)",
      value: 420,
      suffix: "M L",
      icon: Droplet,
      color: "text-sky-400",
      glow: "rgba(14, 165, 233, 0.15)",
    },
    {
      label: "Trees Protected Equivalent",
      value: 95000,
      suffix: "",
      icon: Trees,
      color: "text-teal-400",
      glow: "rgba(20, 184, 166, 0.15)",
    },
  ];

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-16 lg:px-24 flex flex-col justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header Title */}
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2"
          >
            Live Global Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight"
          >
            Quantifying Change, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              One Object At A Time
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i + 0.2 }}
                className="relative glass-panel rounded-2xl p-8 flex flex-col gap-6 group hover:translate-y-[-5px]"
                style={{
                  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 10px ${stat.glow}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-xl bg-neutral-900 border border-glass-border ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">
                    Verified Metric
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <span className="text-neutral-400 font-semibold tracking-wide text-sm mt-1">
                    {stat.label}
                  </span>
                </div>

                {/* Subtle bottom glowing line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent group-hover:via-cyan-400/80 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
