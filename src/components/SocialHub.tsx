"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Star, 
  BookOpen, HelpCircle, ChevronDown, Calendar 
} from "lucide-react";

// Mock Testimonials
const TESTIMONIALS = [
  {
    quote: "SecondLife completely changed how our company manages electronic turnover. We donated 140 laptops, tracked carbon offsets, and saw the exact school in Nairobi that received them.",
    author: "Sarah Jenkins",
    role: "VP of Sustainability, Enterprise Inc.",
    avatar: "👩‍💼",
    rating: 5
  },
  {
    quote: "I scanned my cracked bicycle and vintage dining table. Within 24 hours, an electric courier collected them. The repair hub finished tuning them and they are already listed for resale.",
    author: "Elena Rostova",
    role: "Local Volunteer, Seattle Hub",
    avatar: "👩‍🎨",
    rating: 5
  },
  {
    quote: "As a school administrator, partnering with SecondLife gave our students access to 80 high-spec laptops. The impact tracker connects our class directly with the corporate donors.",
    author: "David Vance",
    role: "Principal, Lincoln Academy",
    avatar: "👨‍🏫",
    rating: 5
  }
];

// Mock Blog Articles
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Electronics Crisis: Redesigning Lifecycle Paths for Microchips",
    desc: "How circular technology networks are keeping rare earth metals out of landfill systems and building regional repair hubs.",
    date: "August 01, 2026",
    readTime: "6 min read",
    tag: "TECH DESIGN",
    isFeatured: true
  },
  {
    id: 2,
    title: "Textiles Recycled: Conserving Millions of Liters of Water",
    desc: "A breakdown of how eco-washing and sanitization extends clothing usage.",
    date: "July 24, 2026",
    readTime: "3 min read",
    tag: "APPAREL",
    isFeatured: false
  },
  {
    id: 3,
    title: "Building Community Refurbishing Labs",
    desc: "Guidelines for setting up repair tools and training schools locally.",
    date: "July 18, 2026",
    readTime: "4 min read",
    tag: "COMMUNITY",
    isFeatured: false
  }
];

// Mock FAQ
const FAQ_ITEMS = [
  {
    q: "Is pickup free for normal individuals?",
    a: "Yes! Zero-emission pickup is completely subsidized for vetted circular economy donations, recyclable piles, and resale assets through corporate carbon credits."
  },
  {
    q: "How does the AI compute environmental metrics?",
    a: "Our neural model estimates item weight and material composition, cross-referencing global databases to measure carbon offsets and water saved compared to manufacturing new items."
  },
  {
    q: "Can I receive tax write-offs for donations?",
    a: "Absolutely. Once your item is received and logged by an NGO partner, a verified digital receipt is sent automatically to your dashboard for tax reporting."
  },
  {
    q: "What if my item is too broken to repair?",
    a: "If the Repair Score is below 40%, the AI schedules recycling routing. The item will be dismantled to extract copper, glass, and lithium safely."
  }
];

export default function SocialHub() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Autoplay Testimonial Carousel
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);

    return () => clearInterval(slideInterval);
  }, []);

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div ref={containerRef} className="relative bg-transparent">
      
      {/* SECTION 1: TESTIMONIAL CAROUSEL */}
      <section id="testimonials" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full flex flex-col justify-center border-t border-glass-border bg-glass-bg/5">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
              Verified Feedback
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan">
              Community Testimonials
            </h2>
          </div>

          {/* Carousel Frame */}
          <div className="relative glass-panel rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col items-center text-center gap-6 min-h-[300px] justify-center">
            
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Quote with AnimatePresence */}
            <div className="relative max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg md:text-xl font-light text-neutral-200 leading-relaxed italic"
                >
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl p-2 bg-neutral-900 rounded-full border border-glass-border">
                {TESTIMONIALS[activeTestimonial].avatar}
              </span>
              <div className="text-left flex flex-col">
                <span className="text-sm font-bold text-white">{TESTIMONIALS[activeTestimonial].author}</span>
                <span className="text-xs text-neutral-500">{TESTIMONIALS[activeTestimonial].role}</span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6">
              <button 
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-glass-border bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6">
              <button 
                onClick={handleNext}
                className="p-2.5 rounded-full border border-glass-border bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BLOG GRID */}
      <section id="blog" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full border-t border-glass-border flex flex-col justify-center bg-black/10">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
              Insights & Press
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan mb-2">
              From Our Publication
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Featured Post (Col 7) */}
            {BLOG_POSTS.filter(p => p.isFeatured).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 glass-panel rounded-3xl p-8 flex flex-col justify-between gap-10 bg-gradient-to-tr from-cyan-950/15 via-black/40 to-neutral-950 border border-cyan-500/10 hover:border-cyan-400/30 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2.5 py-1 border border-cyan-500/20 rounded-md">
                    {post.tag}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {post.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-glass-border/40 pt-4">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">FEATURED ARTICLE</span>
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    Read Post <BookOpen className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Non-Featured Posts list (Col 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {BLOG_POSTS.filter(p => !p.isFeatured).map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                  className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/20 rounded">
                      {post.tag}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-bold uppercase">{post.readTime}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-normal">
                      {post.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FAQ ACCORDION */}
      <section id="faq" className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 w-full border-t border-glass-border flex flex-col justify-center bg-glass-bg/5">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400 mb-2">
              Help Center
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-glow-cyan mb-2">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion list */}
          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl overflow-hidden"
                >
                  {/* Header Button */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-300 hover:text-white cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-cyan-400" /> {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`} />
                  </button>

                  {/* Body Text */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-glass-border/40 bg-black/10"
                      >
                        <p className="px-6 py-5 text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
