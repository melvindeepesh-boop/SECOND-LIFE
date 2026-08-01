"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Upload, Cpu, ShieldAlert, Truck, Sparkles, 
  Camera, Heart, Hammer, Calendar, Flame, Award, Briefcase, Users 
} from "lucide-react";

export default function HowItWorks() {
  const timelineRef = useRef(null);
  const servicesRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const steps = [
    {
      num: "01",
      title: "Upload Item",
      desc: "Drop a photo or scan with your device camera to catalog the item.",
      icon: Upload,
      color: "from-cyan-500 to-blue-500"
    },
    {
      num: "02",
      title: "AI Analysis",
      desc: "Neural models evaluate wear, material composition, and resale demand.",
      icon: Cpu,
      color: "from-blue-500 to-indigo-500"
    },
    {
      num: "03",
      title: "Choose Action",
      desc: "Select Repair, Donate, Recycle, Upcycle, or Resell based on AI scores.",
      icon: ShieldAlert,
      color: "from-indigo-500 to-purple-500"
    },
    {
      num: "04",
      title: "Pickup Scheduled",
      desc: "We send a zero-emission courier to collect the item directly from your door.",
      icon: Truck,
      color: "from-purple-500 to-emerald-500"
    },
    {
      num: "05",
      title: "Impact Created",
      desc: "Watch your carbon credits increase and see who your item helped.",
      icon: Sparkles,
      color: "from-emerald-500 to-cyan-500"
    }
  ];

  const services = [
    {
      title: "AI Item Scanner",
      desc: "Computer vision and NLP mapping items to global circular destinations.",
      icon: Camera,
      glow: "group-hover:border-cyan-500/30"
    },
    {
      title: "Donation Matching",
      desc: "Direct integration with 850+ vetted NGOs for high-need item allocation.",
      icon: Heart,
      glow: "group-hover:border-rose-500/30"
    },
    {
      title: "Repair Marketplace",
      desc: "Connecting you with local engineers to replace components and restore functions.",
      icon: Hammer,
      glow: "group-hover:border-amber-500/30"
    },
    {
      title: "Pickup Scheduling",
      desc: "On-demand EV transport routing to collect items with zero added emissions.",
      icon: Calendar,
      glow: "group-hover:border-indigo-500/30"
    },
    {
      title: "Carbon Calculator",
      desc: "Tracking carbon equivalents and water liters saved per transaction.",
      icon: Flame,
      glow: "group-hover:border-sky-500/30"
    },
    {
      title: "Community Rewards",
      desc: "Exchange points for transit passes, local organic shops, or eco-products.",
      icon: Award,
      glow: "group-hover:border-teal-500/30"
    },
    {
      title: "Corporate ESG API",
      desc: "Helping businesses report waste redirection metrics directly in annual statements.",
      icon: Briefcase,
      glow: "group-hover:border-purple-500/30"
    },
    {
      title: "Volunteer Network",
      desc: "Join community refurbish workshops, cleaning projects, and delivery drives.",
      icon: Users,
      glow: "group-hover:border-emerald-500/30"
    }
  ];

  return (
    <div className="relative bg-transparent">
      
      {/* SECTION 1: HOW IT WORKS */}
      <section ref={timelineRef} id="how-it-works" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
              Step-by-Step Flow
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan">
              How SecondLife Works
            </h2>
          </div>

          {/* Timeline Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Background connection line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 -z-10" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  {/* Step Number Badge */}
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 group-hover:text-cyan-400 transition-colors mb-4">
                    STAGE {step.num}
                  </span>

                  {/* Icon Frame */}
                  <div className={`w-20 h-20 rounded-2xl bg-neutral-900 border border-glass-border flex items-center justify-center mb-6 relative transition-all duration-300 group-hover:scale-115 group-hover:border-cyan-400/40 bg-glow-cyan`}>
                    <Icon className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                    
                    {/* Glowing index indicator */}
                    <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-[10px] font-bold text-black border border-black`} />
                  </div>

                  {/* Title & Desc */}
                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed px-2">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES */}
      <section ref={servicesRef} id="services" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full flex flex-col justify-center border-t border-glass-border bg-glass-bg/5">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
              Platform Features
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan">
              Our Core Services
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv, i) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isServicesInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`glass-panel border rounded-2xl p-6 flex flex-col gap-6 group hover:translate-y-[-5px] cursor-pointer`}
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-glass-border flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/40 group-hover:text-emerald-400 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
