"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Upload, Leaf, Globe2, 
  ArrowRight, ShieldCheck 
} from "lucide-react";

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
  };

  const handleUploadSim = () => {
    setUploadSuccess(true);
  };

  return (
    <section id="contact" className="relative min-h-screen pt-32 pb-12 px-6 md:px-16 lg:px-24 w-full overflow-hidden border-t border-glass-border flex flex-col justify-between bg-glass-bg/5">
      
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-emerald-500/10 to-transparent blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-24 justify-center">
        
        {/* EMOTIONAL ENDING SECTION */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
          <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] font-sans">
            What Will Your Next <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-emerald-400 text-glow-cyan">
              Second Life Be?
            </span>
          </h2>

          {/* Centered Emotional Upload Card */}
          <div 
            onClick={handleUploadSim}
            className="w-full max-w-xl glass-panel rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4 text-center cursor-pointer border border-cyan-500/20 hover:border-cyan-400/50 bg-black/30 transition-all duration-300 relative overflow-hidden group shadow-lg"
          >
            {uploadSuccess && <div className="scan-line" />}

            <AnimatePresence mode="wait">
              {uploadSuccess ? (
                <motion.div
                  key="uploaded"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">Analysis Complete</h4>
                  <p className="text-xs text-neutral-300 max-w-xs leading-relaxed">
                    AI matched! Your item can save <span className="text-cyan-400 font-bold">45kg CO2</span> and supply a student with tools. Let&apos;s schedule a pickup.
                  </p>
                  <a href="#scanner" className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1 mt-2">
                    Review Details <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3 z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-glass-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    Upload a photo of something you&apos;re about to throw away
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                    Our AI will analyze the picture and show you how it can change someone else&apos;s life.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CONTACT FORM & STYLISH VECTOR MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Form Card (Col 7) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-xl font-extrabold text-white mb-2">Connect With Our Team</h3>
              <p className="text-xs text-neutral-500 font-light">
                Have questions about ESG integration, partnership proposals, or large corporate electronics turnovers? Let&apos;s talk.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6 text-center flex flex-col items-center gap-3"
                >
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Message Transmission Confirmed</h4>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Our sustainability representatives will review your coordinates and respond within 12 standard hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-4 text-xs font-semibold"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="uppercase text-neutral-500 text-[10px]">Your Name</label>
                      <input 
                        type="text" 
                        required
                        className="bg-neutral-950 border border-glass-border rounded-xl px-4 py-3 outline-none text-white focus:border-cyan-400"
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="uppercase text-neutral-500 text-[10px]">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="bg-neutral-950 border border-glass-border rounded-xl px-4 py-3 outline-none text-white focus:border-cyan-400"
                        placeholder="john@company.com" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-neutral-500 text-[10px]">Message Details</label>
                    <textarea 
                      required
                      rows={4}
                      className="bg-neutral-950 border border-glass-border rounded-xl px-4 py-3 outline-none text-white focus:border-cyan-400 resize-none"
                      placeholder="Specify your inquiry..." 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="py-3 px-6 rounded-xl text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 font-bold uppercase tracking-widest bg-glow-cyan flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    Transmit Message <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* HQ coordinates map & newsletter subscription (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Dark Styled Map Mockup */}
            <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4 flex-1 justify-center relative overflow-hidden bg-neutral-950/20">
              <div className="flex items-center justify-between border-b border-glass-border/40 pb-3">
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">HQ Coordinates</span>
                <Globe2 className="w-4 h-4 text-cyan-400" />
              </div>
              
              {/* Styled SVG grid representing map coordinates */}
              <div className="w-full aspect-video rounded-xl bg-black border border-glass-border flex items-center justify-center relative overflow-hidden">
                {/* SVG coordinate lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#fff" strokeWidth="0.5" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#fff" strokeWidth="0.5" />
                  <circle cx="50%" cy="50%" r="30" fill="none" stroke="#fff" strokeWidth="0.5" />
                </svg>
                
                {/* Glowing neon pin */}
                <div className="relative flex flex-col items-center gap-1">
                  <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border border-black shadow" />
                  <span className="text-[9px] font-bold text-white font-mono bg-neutral-900 px-2 py-0.5 border border-glass-border rounded mt-1">
                    SF - 37.7749° N, 122.4194° W
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-[11px] leading-relaxed text-neutral-500">
                <span className="font-bold text-white text-xs">SecondLife Headquarters</span>
                <span>452 Circular Parkway, Suite 100</span>
                <span>San Francisco, CA 94103</span>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Join the Newsletter</h4>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Receive weekly ESG briefings, upcycling guides, and priority invite codes to regional sorting workshops.
              </p>

              <AnimatePresence mode="wait">
                {newsletterSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold text-emerald-400 bg-emerald-950/20 px-3 py-2 border border-emerald-500/20 rounded-xl text-center"
                  >
                    Subscribed successfully.
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2 text-xs font-semibold">
                    <input 
                      type="email" 
                      required
                      placeholder="news@example.com"
                      className="bg-neutral-950 border border-glass-border rounded-xl px-4 py-2.5 outline-none text-white focus:border-cyan-400 flex-1 min-w-0"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2.5 bg-neutral-900 border border-glass-border hover:border-cyan-400 text-cyan-400 rounded-xl hover:bg-neutral-850 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MINIMALIST PREMIUM FOOTER */}
        <footer className="border-t border-glass-border/40 pt-12 mt-12 flex flex-col gap-12 text-xs">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand (Col 1) */}
            <div className="col-span-2 flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center bg-glow-cyan">
                  <Leaf className="w-4 h-4 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold tracking-[0.15em] text-white">
                  SECONDLIFE
                </span>
              </a>
              <p className="text-neutral-500 max-w-xs leading-relaxed font-light text-[11px]">
                Building the intelligence infrastructure for a zero-waste global society. Giving every item another story.
              </p>
            </div>

            {/* Links loops */}
            {[
              { title: "Company", items: ["About Us", "Partners", "Press KIT", "Careers"] },
              { title: "Services", items: ["AI Scanner", "Logistics EV", "ESG Dashboard", "Repair Hubs"] },
              { title: "Resources", items: ["Guides", "Calculator", "API Docs", "Contact Support"] },
            ].map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h5 className="font-bold text-white uppercase tracking-widest text-[10px]">{section.title}</h5>
                <ul className="flex flex-col gap-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-neutral-500 hover:text-cyan-400 transition-colors text-[11px] font-medium">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-neutral-900/60 pt-6 gap-4">
            <span className="text-neutral-600 text-[11px]">
              SecondLife © 2026. Constructed for circular economy advancement.
            </span>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: LinkedinIcon, url: "https://linkedin.com" },
                { icon: GithubIcon, url: "https://github.com" },
                { icon: InstagramIcon, url: "https://instagram.com" },
              ].map((soc, i) => {
                const SIcon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-glass-border bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <SIcon />
                  </a>
                );
              })}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
