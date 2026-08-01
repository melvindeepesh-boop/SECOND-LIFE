"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playIntroSound } from "@/utils/audio";

interface OpeningExperienceProps {
  onComplete: () => void;
}

export default function OpeningExperience({ onComplete }: OpeningExperienceProps) {
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sequences the text and earth loading stages
  useEffect(() => {
    // Step 0: Black screen, particles appear
    const t0 = setTimeout(() => setStep(1), 1500); // 1.5s particles only
    // Step 1: Tiny light forms, Text 1 appears: "Every object has a story."
    const t1 = setTimeout(() => setStep(2), 5000); // Show text 1 for 3.5s
    // Step 2: Earth grows, Text 2: "Every story deserves another chapter."
    const t2 = setTimeout(() => setStep(3), 8500); // Show text 2 for 3.5s
    // Step 3: Text 3: "Welcome to SecondLife."
    const t3 = setTimeout(() => setStep(4), 11500); // Show welcome for 3s
    // Step 4: Complete and fade out
    const t4 = setTimeout(() => {
      onComplete();
    }, 13500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  // Trigger ambient intro rise sound at step 1
  useEffect(() => {
    if (step === 1) {
      playIntroSound();
    }
  }, [step]);

  // Particle background for the loading screen (lightweight canvas implementation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
    }> = [];

    // Create initial particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        opacitySpeed: Math.random() * 0.01 + 0.005,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 1)";

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse opacity
        p.opacity += p.opacitySpeed;
        if (p.opacity > 0.8 || p.opacity < 0.1) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.opacity)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background stars */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Earth formation simulation */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                step === 1
                  ? { scale: 0.1, opacity: 0.8, filter: "blur(2px)" }
                  : step === 2
                  ? { scale: 1.2, opacity: 1, filter: "blur(0px)" }
                  : step === 3
                  ? { scale: 1.5, opacity: 1 }
                  : { scale: 2.2, opacity: 0, filter: "blur(20px)" }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              className="absolute w-40 h-40 rounded-full flex items-center justify-center"
            >
              {/* Core glow */}
              <div className="absolute w-12 h-12 rounded-full bg-cyan-400 blur-md opacity-60 animate-pulse" />
              <div className="absolute w-6 h-6 rounded-full bg-emerald-300 blur-sm opacity-80" />

              {/* Glowing rings to simulate earth structure forming */}
              {step >= 2 && (
                <>
                  <motion.div
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 360, opacity: 0.5 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/40"
                  />
                  <motion.div
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: -180, opacity: 0.3 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-double border-emerald-400/30"
                  />
                  {/* Planetary glow overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-900/10 to-emerald-500/20 blur-md mix-blend-screen" />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Narrative Typography */}
      <div className="absolute bottom-1/4 left-0 w-full text-center px-6 pointer-events-none select-none z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="text1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-lg md:text-2xl font-light text-cyan-100 tracking-[0.2em] font-sans text-glow-cyan"
            >
              Every object has a story.
            </motion.p>
          )}

          {step === 2 && (
            <motion.p
              key="text2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-lg md:text-2xl font-light text-emerald-100 tracking-[0.2em] font-sans text-glow-emerald"
            >
              Every story deserves another chapter.
            </motion.p>
          )}

          {step === 3 && (
            <motion.div
              key="text3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-emerald-400 font-sans">
                SECONDLIFE
              </h1>
              <p className="text-xs md:text-sm font-semibold tracking-[0.5em] text-neutral-400 uppercase">
                AI Circular Economy
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle skip button for testers */}
      <button
        onClick={onComplete}
        className="absolute bottom-10 right-10 text-[10px] tracking-[0.3em] uppercase text-neutral-600 hover:text-neutral-300 transition-colors z-20 cursor-pointer"
      >
        [ Skip Intro ]
      </button>
    </div>
  );
}
