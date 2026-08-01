"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Laptop, BookOpen, Shirt, PhoneCall, ChevronRight } from "lucide-react";

export default function Stories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isHeaderInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  const stories = [
    {
      title: "The Laptop Journey",
      icon: Laptop,
      color: "from-cyan-500/20 to-blue-500/20 animate-pulse",
      accent: "text-cyan-400 border-cyan-500/30",
      steps: [
        { label: "Old Laptop", desc: "Donated from corporate office" },
        { label: "Refurbished", desc: "Motherboard repaired & SSD added" },
        { label: "Student Resource", desc: "Delivered to rural high school" },
        { label: "Employment", desc: "Graduates and lands coding job" },
        { label: "Family Support", desc: "Sends income home to community" },
      ],
    },
    {
      title: "The Knowledge Trail",
      icon: BookOpen,
      color: "from-indigo-500/20 to-purple-500/20",
      accent: "text-indigo-400 border-indigo-500/30",
      steps: [
        { label: "Old Textbooks", desc: "Stored in attic for 6 years" },
        { label: "AI Classification", desc: "Categorized by grade and language" },
        { label: "Village Library", desc: "Shipped to local library project" },
        { label: "Learning Center", desc: "Hundreds of children access guides" },
        { label: "Literacy Rise", desc: "Community reading scores increase" },
      ],
    },
    {
      title: "The Relief Fabric",
      icon: Shirt,
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-400 border-emerald-500/30",
      steps: [
        { label: "Winter Clothes", desc: "Cleared from wardrobe cleanout" },
        { label: "Sanitized", desc: "Eco-washed and quality verified" },
        { label: "Disaster Zone", desc: "Routed to flood response shelters" },
        { label: "Thermal Shield", desc: "Families protected from severe cold" },
        { label: "Immediate Relief", desc: "Comfort and health maintained" },
      ],
    },
    {
      title: "The Connect Line",
      icon: PhoneCall,
      color: "from-rose-500/20 to-pink-500/20",
      accent: "text-rose-400 border-rose-500/30",
      steps: [
        { label: "Cracked Smartphone", desc: "Traded in at local retailer" },
        { label: "Screen Replaced", desc: "Screen rebuilt at community lab" },
        { label: "Clinic Hotline", desc: "Allocated to emergency response health clinic" },
        { label: "Crisis Routing", desc: "Enables village emergency calls" },
        { label: "Lives Preserved", desc: "Rapid medical rescue coordinates" },
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="stories" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full flex flex-col justify-center border-t border-glass-border bg-black/10">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2"
          >
            Human Impact Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan"
          >
            Every Item Changes A Life <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
              Follow The Lifecycle Path
            </span>
          </motion.h2>
        </div>

        {/* Stories Vertical List */}
        <div ref={containerRef} className="relative pl-8 md:pl-16 flex flex-col gap-24">
          
          {/* Vertical central timeline path line */}
          <div className="absolute left-3.5 md:left-7 top-4 bottom-4 w-[2px] bg-neutral-900 -z-10">
            <motion.div 
              className="w-full bg-gradient-to-b from-cyan-400 to-emerald-400 origin-top rounded-full"
              style={{ height: pathHeight }}
            />
          </div>

          {stories.map((story) => {
            const Icon = story.icon;
            return (
              <StoryCard 
                key={story.title}
                story={story}
                Icon={Icon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface StoryCardProps {
  story: {
    title: string;
    color: string;
    accent: string;
    steps: Array<{ label: string; desc: string }>;
  };
  Icon: React.ComponentType<{ className?: string }>;
}

function StoryCard({ story, Icon }: StoryCardProps) {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isCardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative flex flex-col gap-6"
    >
      {/* Absolute connector node on vertical line */}
      <div 
        className={`absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-500 ${
          isCardInView ? "border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.4)]" : "border-neutral-800"
        }`}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${isCardInView ? "bg-cyan-400 animate-ping" : "bg-neutral-800"}`} />
      </div>

      {/* Title block */}
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg bg-neutral-900 border ${story.accent}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
          {story.title}
        </h3>
      </div>

      {/* Horizontal Steps Scroll panel */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 w-full">
        {story.steps.map((step, stepIdx) => (
          <div key={step.label} className="relative flex flex-col justify-between">
            {/* Step Glass Block */}
            <div 
              className={`glass-panel border rounded-2xl p-5 flex flex-col h-full gap-2 transition-all duration-300 ${
                isCardInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${stepIdx * 150}ms`,
                boxShadow: isCardInView && stepIdx === 4 ? `0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 10px ${story.color.includes("cyan") ? "rgba(6, 182, 212, 0.08)" : "rgba(16, 185, 129, 0.08)"}` : "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold text-neutral-500">STAGE 0{stepIdx + 1}</span>
                {stepIdx < 4 && (
                  <ChevronRight className="w-4 h-4 text-neutral-600 hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10" />
                )}
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 mt-1">
                {step.label}
              </h4>
              <p className="text-[10px] text-neutral-500 leading-normal">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
