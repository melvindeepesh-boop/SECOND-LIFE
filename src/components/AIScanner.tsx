"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Cpu, Navigation, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

// Predefined mock items for quick scanning testing
const DEMO_ITEMS = [
  {
    name: "MacBook Pro 2018",
    category: "Electronics",
    image: "💻",
    condition: "Fair (Battery worn, minor scratches)",
    repairScore: 82,
    donationScore: 90,
    recyclingScore: 65,
    resaleValue: 340,
    carbonSaved: 125, // kg
    waterSaved: 850, // L
    nearestNGO: "TechForSchools Foundation",
    nearestRepair: "ByteFix Labs (1.2 km)",
    nearestRecycling: "E-Waste Depot (3.4 km)",
    livesHelped: 4,
    confidence: 98.6,
    recommendation: "DONATE & REFURBISH",
    desc: "Electronics carry a high carbon cost. Donating this laptop provides essential learning tools for underprivileged students while offsetting significant manufacturing emissions.",
  },
  {
    name: "Classic Steel Bicycle",
    category: "Sports",
    image: "🚲",
    condition: "Good (Slight rust, tires deflated)",
    repairScore: 95,
    donationScore: 78,
    recyclingScore: 50,
    resaleValue: 120,
    carbonSaved: 85,
    waterSaved: 210,
    nearestNGO: "Pedals for Progress",
    nearestRepair: "Gears & Co. Community Shop (0.8 km)",
    nearestRecycling: "Metro Metal Salvage (5.2 km)",
    livesHelped: 2,
    confidence: 96.2,
    recommendation: "REPAIR & RESELL",
    desc: "Bicycles are highly repairable. Tuning this bike up will prevent high metal manufacturing waste and provide eco-friendly transport.",
  },
  {
    name: "Vintage Oak Chair",
    category: "Furniture",
    image: "🪑",
    condition: "Worn (Joints loose, fabric stained)",
    repairScore: 88,
    donationScore: 70,
    recyclingScore: 40,
    resaleValue: 60,
    carbonSaved: 35,
    waterSaved: 120,
    nearestNGO: "Habitat Restore",
    nearestRepair: "Upcyclers Hub Collective (2.1 km)",
    nearestRecycling: "Biomass Recycling Center (6.0 km)",
    livesHelped: 1,
    confidence: 94.8,
    recommendation: "UPCYCLE",
    desc: "Wood products are prime candidates for upcycling. Tightening joints and replacing fabric can double the lifespan of this chair, keeping it out of landfills.",
  },
  {
    name: "Heavy Winter Jacket",
    category: "Apparel",
    image: "🧥",
    condition: "Excellent (No stains or tears)",
    repairScore: 100,
    donationScore: 98,
    recyclingScore: 30,
    resaleValue: 45,
    carbonSaved: 22,
    waterSaved: 1500,
    nearestNGO: "Red Cross Community Closet",
    nearestRepair: "Eco-Tailor (1.5 km)",
    nearestRecycling: "TexCycle Fibers (4.5 km)",
    livesHelped: 5,
    confidence: 99.1,
    recommendation: "DONATE",
    desc: "Textile manufacturing consumes excessive water. Donating this jacket saves 1,500L of water and supports families during winter seasons.",
  },
];

export default function AIScanner() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedItemData, setSelectedItemData] = useState<typeof DEMO_ITEMS[0] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScan = (item: typeof DEMO_ITEMS[0]) => {
    setIsScanning(true);
    setScanProgress(0);
    setSelectedItemData(null);

    const statuses = [
      "Uploading item to neural network...",
      "Analyzing image shape and texture...",
      "Matching item to circular economy database...",
      "Calculating carbon and water conservation offsets...",
      "Locating closest NGO partners and repair hubs...",
      "Finalizing optimal lifecycles...",
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setScanProgress((prev) => Math.min(prev + 16.7, 100));
      setScanStatusText(statuses[currentStep - 1] || "Finalizing optimal lifecycles...");

      if (currentStep >= 6) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setSelectedItemData(item);
        }, 800);
      }
    }, 600);
  };

  const handleDemoClick = (item: typeof DEMO_ITEMS[0]) => {
    setSelectedFile(item.image);
    startScan(item);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile("📦");
      
      // Generate a mock scanning item based on custom name
      const customMockItem = {
        name: file.name.substring(0, 20) || "Uploaded Item",
        category: "Mixed Goods",
        image: "📦",
        condition: "Used (Needs inspection)",
        repairScore: Math.floor(Math.random() * 30) + 70,
        donationScore: Math.floor(Math.random() * 40) + 60,
        recyclingScore: Math.floor(Math.random() * 50) + 50,
        resaleValue: Math.floor(Math.random() * 200) + 20,
        carbonSaved: Math.floor(Math.random() * 100) + 10,
        waterSaved: Math.floor(Math.random() * 2000) + 100,
        nearestNGO: "Hope Center Alliance",
        nearestRepair: "Downtown Repair Hub (1.8 km)",
        nearestRecycling: "GreenCycle Recycling (2.9 km)",
        livesHelped: Math.floor(Math.random() * 5) + 1,
        confidence: Number((Math.random() * 5 + 94).toFixed(1)),
        recommendation: "RECYCLE & DONATE",
        desc: "AI recommends separating reusable components and donating core structures to reduce regional metal and plastic pollution.",
      };

      startScan(customMockItem);
    }
  };

  return (
    <section id="scanner" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 border-y border-glass-border bg-glass-bg/20 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
            Signature Feature
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-glow-cyan">
            AI Second Life Scanner
          </h2>
          <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed">
            Upload an image of any item in your home. Our neural model will analyze its material, 
            condition, and coordinates to build the ultimate lifecycle optimization plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Upload Box & Demolist */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-square sm:aspect-video lg:aspect-square rounded-2xl border border-dashed border-cyan-500/20 hover:border-cyan-400/60 bg-black/40 flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 group shadow-lg hover:shadow-cyan-500/5 overflow-hidden"
            >
              {isScanning && <div className="scan-line" />}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCustomUpload}
                className="hidden"
                disabled={isScanning}
              />

              <AnimatePresence mode="wait">
                {isScanning ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 z-10"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center animate-spin">
                      <Cpu className="w-7 h-7 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                        Scanning Item...
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 max-w-[200px] h-8 truncate-2-lines">
                        {scanStatusText}
                      </p>
                    </div>
                    <div className="w-48 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-glass-border">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                        animate={{ width: `${scanProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ) : selectedFile ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 z-10"
                  >
                    <div className="text-7xl p-6 bg-neutral-900/80 rounded-2xl border border-glass-border">
                      {selectedFile}
                    </div>
                    <p className="text-xs text-neutral-400 tracking-wider">
                      Item selected. Ready to rescan.
                    </p>
                    <button className="text-xs text-cyan-400 font-bold uppercase tracking-widest hover:text-cyan-300">
                      Change Photo
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-neutral-900 border border-glass-border flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300">
                      <Upload className="w-6 h-6 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        Drag and drop an image
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1">
                        JPEG, PNG up to 10MB
                      </p>
                    </div>
                    <span className="px-4 py-2 rounded-full border border-glass-border bg-neutral-900 text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:bg-neutral-800 transition-colors">
                      Select File
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Demos */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Or Scan Instant Demo Item:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {DEMO_ITEMS.map((item) => (
                  <button
                    key={item.name}
                    disabled={isScanning}
                    onClick={() => handleDemoClick(item)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-glass-border bg-neutral-950/40 hover:bg-neutral-900 hover:border-cyan-500/20 text-left transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-2xl p-2 bg-neutral-900 rounded-lg group-hover:scale-110 transition-transform">
                      {item.image}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-neutral-500">{item.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Scan Results Cards */}
          <div className="lg:col-span-7 w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              {selectedItemData ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col gap-6"
                >
                  {/* Result Header */}
                  <div className="relative glass-panel rounded-2xl p-6 md:p-8 overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 rounded-bl-xl border-l border-b border-glass-border">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-mono text-xs font-bold">{selectedItemData.confidence}% Confidence</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
                        SecondLife AI Recommendation
                      </span>
                      <h3 className="text-2xl font-black text-white flex items-center gap-2 mt-1">
                        {selectedItemData.recommendation}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        {selectedItemData.desc}
                      </p>
                    </div>
                  </div>

                  {/* Ring Scores Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Repair Score", score: selectedItemData.repairScore, color: "text-amber-400", border: "border-amber-500/20" },
                      { label: "Donation Score", score: selectedItemData.donationScore, color: "text-cyan-400", border: "border-cyan-500/20" },
                      { label: "Recycling Score", score: selectedItemData.recyclingScore, color: "text-emerald-400", border: "border-emerald-500/20" }
                    ].map((item) => (
                      <div key={item.label} className={`glass-panel border ${item.border} rounded-xl p-4 flex flex-col items-center justify-center text-center`}>
                        <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                          {/* SVG Progress Circle */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                            <motion.circle
                              cx="32"
                              cy="32"
                              r="28"
                              fill="transparent"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeDasharray={2 * Math.PI * 28}
                              initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - item.score / 100) }}
                              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                              className={item.color}
                            />
                          </svg>
                          <span className={`absolute font-mono text-sm font-black ${item.color}`}>{item.score}%</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Statistics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Est. Resale Value", val: `$${selectedItemData.resaleValue}`, subtitle: "Cash Value" },
                      { label: "CO2 Offset", val: `${selectedItemData.carbonSaved} kg`, subtitle: "Carbon Saved" },
                      { label: "Water Conserved", val: `${selectedItemData.waterSaved} L`, subtitle: "H2O Preserved" },
                      { label: "People Impacted", val: `${selectedItemData.livesHelped} lives`, subtitle: "Social Impact" },
                    ].map((metric) => (
                      <div key={metric.label} className="glass-panel rounded-xl p-4 flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">{metric.label}</span>
                        <span className="font-mono text-lg font-black text-white mt-1 text-glow-cyan">{metric.val}</span>
                        <span className="text-[9px] text-neutral-500 font-semibold mt-1">{metric.subtitle}</span>
                      </div>
                    ))}
                  </div>

                  {/* Local Hub Coordination */}
                  <div className="glass-panel rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-glass-border pb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                        Local Partner Allocations
                      </h4>
                      <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/20 px-2 py-0.5 border border-cyan-500/20 rounded">
                        Active Coordinates
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex flex-col">
                          <span className="font-semibold text-neutral-300">Donation Receiver</span>
                          <span className="text-neutral-500 text-[11px] mt-0.5">{selectedItemData.nearestNGO}</span>
                        </div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          Map Match <Navigation className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs border-t border-glass-border/40 pt-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-neutral-300">Repair Center</span>
                          <span className="text-neutral-500 text-[11px] mt-0.5">{selectedItemData.nearestRepair}</span>
                        </div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          Navigate <Navigation className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pickup Scheduler CTA */}
                  <button className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg bg-glow-cyan flex items-center justify-center gap-2 cursor-pointer">
                    Schedule Zero-Emission Pickup <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full border border-glass-border bg-neutral-950/20 rounded-2xl flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border border-glass-border flex items-center justify-center mb-4 text-cyan-400/40">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Awaiting Object Scan</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mt-2 leading-relaxed">
                    Select a demo item on the left or drop an image file to trigger the AI scanner and view detailed circular lifecycle metrics.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
