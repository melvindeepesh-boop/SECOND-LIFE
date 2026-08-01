"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Import UI components normally
import OpeningExperience from "@/components/OpeningExperience";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AIScanner from "@/components/AIScanner";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import Stories from "@/components/Stories";
import Dashboard from "@/components/Dashboard";
import GlobalMap from "@/components/GlobalMap";
import CommunityHub from "@/components/CommunityHub";
import SocialHub from "@/components/SocialHub";
import Contact from "@/components/Contact";
import SideNav from "@/components/SideNav";

// Dynamic import for the WebGL Three.js Canvas to avoid SSR errors
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full bg-black -z-20" />,
});

export default function Home() {
  const [isIntroActive, setIsIntroActive] = useState(true);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-transparent">
      <AnimatePresence mode="wait">
        {isIntroActive ? (
          <OpeningExperience key="intro" onComplete={() => setIsIntroActive(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative w-full min-h-screen"
          >
            {/* Background 3D Particle Canvas */}
            <ThreeCanvas />

            {/* Floating Navigation Dots */}
            <SideNav />

            {/* Main Web Page Content */}
            <Navbar />
            <HeroSection />
            <StatsSection />
            <AIScanner />
            <HowItWorks />
            <Comparison />
            <Stories />
            <Dashboard />
            <GlobalMap />
            <CommunityHub />
            <SocialHub />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
