"use client";

import { useState } from "react";
import { 
  Trophy, Award, Flame, BookOpen, Calculator, 
  ArrowRight, ShieldCheck, Star 
} from "lucide-react";

// Mock Leaderboard Data
const LEADERBOARD_VOLUNTEERS = [
  { rank: 1, name: "Marcus Chen", points: 8450, impact: "420 kg CO2 saved", avatar: "👤" },
  { rank: 2, name: "Elena Rostova", points: 7920, impact: "390 kg CO2 saved", avatar: "👤" },
  { rank: 3, name: "Sarah Jenkins", points: 7100, impact: "350 kg CO2 saved", avatar: "👤" }
];

const LEADERBOARD_SCHOOLS = [
  { rank: 1, name: "Lincoln Tech Academy", points: 28400, impact: "1.4 tons CO2 saved", avatar: "🏫" },
  { rank: 2, name: "Oakridge Green High", points: 25100, impact: "1.2 tons CO2 saved", avatar: "🏫" },
  { rank: 3, name: "Metro Charter School", points: 22800, impact: "1.1 tons CO2 saved", avatar: "🏫" }
];

const LEADERBOARD_CITIES = [
  { rank: 1, name: "San Francisco", points: 145800, impact: "7.2 tons CO2 saved", avatar: "🏙" },
  { rank: 2, name: "London", points: 121400, impact: "6.0 tons CO2 saved", avatar: "🏙" },
  { rank: 3, name: "Tokyo", points: 110900, impact: "5.5 tons CO2 saved", avatar: "🏙" }
];

// Education Guides
const GUIDES = [
  { title: "Battery Replacement Guide", type: "Electronics", diff: "Medium", time: "15 mins", readTime: "4 min read" },
  { title: "Seam Mending & Patching", type: "Apparel", diff: "Easy", time: "10 mins", readTime: "3 min read" },
  { title: "Wooden Joint Repair", type: "Furniture", diff: "Hard", time: "45 mins", readTime: "8 min read" }
];

export default function CommunityHub() {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<"users" | "schools" | "cities">("users");
  const [calcItem, setCalcItem] = useState("laptop");
  const [calcQuantity, setCalcQuantity] = useState(1);


  // Calculate dynamic environmental metrics for the calculator widget
  const getCalculatorResults = () => {
    let carbonMultiplier = 125; // kg
    let waterMultiplier = 850; // L
    let name = "MacBook Pro";

    if (calcItem === "smartphone") {
      carbonMultiplier = 45;
      waterMultiplier = 110;
      name = "iPhone / Android";
    } else if (calcItem === "clothes") {
      carbonMultiplier = 22;
      waterMultiplier = 1500;
      name = "Winter Jacket";
    } else if (calcItem === "bicycle") {
      carbonMultiplier = 85;
      waterMultiplier = 210;
      name = "Steel Bicycle";
    } else if (calcItem === "chair") {
      carbonMultiplier = 35;
      waterMultiplier = 120;
      name = "Oak Chair";
    }

    return {
      carbon: carbonMultiplier * calcQuantity,
      water: waterMultiplier * calcQuantity,
      name
    };
  };

  const calcResults = getCalculatorResults();

  const getLeaderboardData = () => {
    if (activeLeaderboardTab === "schools") return LEADERBOARD_SCHOOLS;
    if (activeLeaderboardTab === "cities") return LEADERBOARD_CITIES;
    return LEADERBOARD_VOLUNTEERS;
  };

  const leaderboardData = getLeaderboardData();

  return (
    <section id="community" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full border-t border-glass-border flex flex-col justify-center bg-glass-bg/5">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Community & Leaderboards (Col 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6 w-full">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
                Ecosystem & Gamification
              </p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan mb-1">
                Community Center
              </h2>
            </div>

            {/* Challenge Banner */}
            <div className="relative glass-panel rounded-2xl p-6 overflow-hidden bg-gradient-to-tr from-cyan-950/20 to-emerald-950/20 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2.5 py-0.5 border border-cyan-500/20 rounded-full flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 animate-pulse text-cyan-400" /> Active Challenge
                </span>
                <span className="text-[10px] text-neutral-400 font-bold uppercase">Ends in 6 days</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Zero-Waste Electronics Drive</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Donate 3 working or broken electronics this month to earn the exclusive <span className="text-cyan-400 font-bold">Digital Alchemist</span> achievement badge.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-semibold uppercase text-neutral-500">
                  <span>Community Progress</span>
                  <span>7,842 / 10,000 items</span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-glass-border">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 w-[78%]" />
                </div>
              </div>
            </div>

            {/* Leaderboards List */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-glass-border pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cyan-400" /> Top Circular Performers
                </h4>
                {/* Tabs */}
                <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-glass-border">
                  {(["users", "schools", "cities"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveLeaderboardTab(tab)}
                      className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-colors ${
                        activeLeaderboardTab === tab 
                          ? "bg-cyan-950/55 border border-cyan-500/30 text-cyan-400" 
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leaderboard entries */}
              <div className="flex flex-col gap-3.5">
                {leaderboardData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs border-b border-neutral-900/60 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-neutral-500 w-4">#{i + 1}</span>
                      <span className="text-xl p-1 bg-neutral-900 rounded">{item.avatar}</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{item.name}</span>
                        <span className="text-[10px] text-neutral-500">{item.impact}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-cyan-400 bg-cyan-950/20 px-2 py-0.5 border border-cyan-500/10 rounded">
                      {item.points.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges showcase */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Achievement Badges</h4>
              <div className="flex gap-4 items-center">
                {[
                  { name: "Digital Alchemist", desc: "Electronics recycling", icon: Award, color: "text-cyan-400 border-cyan-500/20 bg-cyan-950/10" },
                  { name: "Eco Guardian", desc: "100kg carbon offset", icon: ShieldCheck, color: "text-emerald-400 border-emerald-500/20 bg-emerald-950/10" },
                  { name: "Donor Elite", desc: "5+ high-need donations", icon: Star, color: "text-amber-400 border-amber-500/20 bg-amber-950/10" },
                ].map((badge) => {
                  const BIcon = badge.icon;
                  return (
                    <div key={badge.name} className={`flex-1 border rounded-xl p-3 flex flex-col items-center text-center gap-1.5 ${badge.color}`}>
                      <BIcon className="w-6 h-6" />
                      <span className="text-[10px] font-bold text-white mt-1">{badge.name}</span>
                      <span className="text-[9px] text-neutral-500">{badge.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Education & Carbon Calculator (Col 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6 w-full">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
                Knowledge & Offsets
              </p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan mb-1">
                Education Hub
              </h2>
            </div>

            {/* Interactive Carbon Calculator */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-5 border border-emerald-500/10">
              <div className="flex items-center justify-between border-b border-glass-border pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" /> Circular Impact Calculator
                </h4>
                <span className="text-[9px] text-neutral-500 font-bold uppercase">PREVIEW CALCULATIONS</span>
              </div>

              {/* Calculator Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-neutral-500">Select Item Category</label>
                  <select
                    value={calcItem}
                    onChange={(e) => setCalcItem(e.target.value)}
                    className="bg-neutral-950 text-xs font-semibold text-neutral-300 px-3 py-2 rounded-lg border border-glass-border focus:border-cyan-400 outline-none w-full"
                  >
                    <option value="laptop">MacBook / Laptop</option>
                    <option value="smartphone">Smart Mobile Phone</option>
                    <option value="clothes">Winter Jacket / Coat</option>
                    <option value="bicycle">Steel Bicycle</option>
                    <option value="chair">Vintage Oak Chair</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-neutral-500">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value))}
                    className="bg-neutral-950 text-xs font-semibold text-neutral-300 px-3 py-2 rounded-lg border border-glass-border focus:border-cyan-400 outline-none w-full"
                  />
                </div>
              </div>

              {/* Calculator Outputs */}
              <div className="grid grid-cols-2 gap-4 bg-neutral-950/40 p-4 rounded-xl border border-glass-border/40">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">CO2 Emissions Saved</span>
                  <span className="font-mono text-lg font-black text-cyan-400 mt-1">{calcResults.carbon} kg</span>
                  <span className="text-[8px] text-neutral-500 mt-0.5">Equivalent to planting {Math.round(calcResults.carbon / 20)} trees</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">Water Conserved</span>
                  <span className="font-mono text-lg font-black text-emerald-400 mt-1">{calcResults.water.toLocaleString()} Litres</span>
                  <span className="text-[8px] text-neutral-500 mt-0.5">Equivalent to {Math.round(calcResults.water / 2.5)} shower cycles</span>
                </div>
              </div>
            </div>

            {/* Guides and infographics */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" /> Interactive Repair Guides
              </h4>
              <div className="flex flex-col gap-3">
                {GUIDES.map((guide) => (
                  <a
                    key={guide.title}
                    href="#education"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-glass-border bg-neutral-950/20 hover:bg-neutral-900/60 hover:border-cyan-500/20 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {guide.title}
                      </span>
                      <span className="text-[10px] text-neutral-500 mt-1">
                        Category: {guide.type} • Read: {guide.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-cyan-400 bg-cyan-950/30 px-2.5 py-1 border border-cyan-500/20 rounded-md">
                      Difficulty: {guide.diff} <ArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
