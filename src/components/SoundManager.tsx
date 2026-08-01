"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { playHoverSound, playClickSound } from "@/utils/audio";

export default function SoundManager() {
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Sync mute state with localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedMute = localStorage.getItem("secondlife-muted");
    if (savedMute !== null) {
      setMuted(savedMute === "true");
    } else {
      // Default to unmuted so the user immediately experiences the sound effects
      setMuted(false);
      localStorage.setItem("secondlife-muted", "false");
    }
  }, []);

  // Global mouse event listeners for interactions
  useEffect(() => {
    if (!mounted) return;

    // Helper to determine if an element is interactive
    const isInteractive = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      const tag = el.tagName;
      if (
        tag === "BUTTON" ||
        tag === "A" ||
        el.getAttribute("role") === "button" ||
        el.classList.contains("interactive") ||
        el.closest("button") ||
        el.closest("a") ||
        el.closest('[role="button"]') ||
        el.closest(".interactive")
      ) {
        return true;
      }
      return false;
    };

    // Track the last hovered element to avoid playing hover sounds multiple times
    let lastHoveredEl: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest("button, a, [role='button'], .interactive") as HTMLElement | null;

      if (interactiveEl && interactiveEl !== lastHoveredEl) {
        lastHoveredEl = interactiveEl;
        playHoverSound(muted);
      } else if (!interactiveEl) {
        lastHoveredEl = null;
      }
    };

    const handlePointerDown = () => {
      playClickSound(muted);
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mounted, muted]);

  const toggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    localStorage.setItem("secondlife-muted", String(nextMute));
    
    // Play a click sound feedback when unmuting
    if (!nextMute) {
      setTimeout(() => playClickSound(false), 50);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Floating Control Button */}
      <motion.button
        onClick={toggleMute}
        onMouseEnter={() => {
          setShowTooltip(true);
          playHoverSound(muted);
        }}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg cursor-pointer bg-glass-bg/40 backdrop-blur-md ${
          muted
            ? "border-neutral-700/60 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300"
            : "border-cyan-500/20 text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:text-cyan-300"
        }`}
        aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </motion.button>

      {/* Tooltip Label */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="px-3 py-1.5 rounded-lg bg-neutral-950/80 border border-glass-border/60 text-[10px] font-bold uppercase tracking-widest text-neutral-400 pointer-events-none select-none backdrop-blur-sm"
          >
            {muted ? "Sound Off" : "Sound On"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
