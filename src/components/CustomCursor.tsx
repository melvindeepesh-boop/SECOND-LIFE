"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Background glow tracker */}
      <div
        className="custom-cursor-glow hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? "450px" : "350px",
          height: isHovered ? "450px" : "350px",
        }}
      />
      {/* Ring cursor */}
      <div
        className="fixed w-8 h-8 rounded-full border border-cyan-400 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 mix-blend-screen hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          backgroundColor: isHovered ? "rgba(0, 245, 255, 0.1)" : "transparent",
          borderColor: isHovered ? "#10b981" : "#00f5ff",
          boxShadow: isHovered ? "0 0 15px rgba(16, 185, 129, 0.5)" : "0 0 10px rgba(0, 245, 255, 0.3)",
        }}
      />
      {/* Center dot cursor */}
      <div
        className="fixed w-1.5 h-1.5 bg-emerald-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
