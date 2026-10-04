import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BrandStory from '../components/BrandStory';
import FeaturedEvent from '../components/FeaturedEvent';
import CategoriesSection from '../components/CategoriesSection';
import StallMap from '../components/StallMap';
import WhyExhibit from '../components/WhyExhibit';
import VisitorExperience from '../components/VisitorExperience';
import GallerySection from '../components/GallerySection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BRAND, FEATURED_EVENT } from '../data/eventData';

export default function HomePage({ onOpenBooking, onSelectStall }) {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { id: 'hero', label: '01 Cover' },
    { id: 'story-quote', label: '02 Statement' },
    { id: 'event', label: '03 Exhibition' },
    { id: 'story', label: '04 Ecosystem' },
    { id: 'categories', label: '05 Pavilions' },
    { id: 'stall-map', label: '06 Stalls' },
  ];

  const scrollToChapter = (id, idx) => {
    setActiveChapter(idx);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // 1. Intersection Observer for accurate, instantaneous sync of right capsule dots
    const observers = [];
    chapters.forEach((ch, idx) => {
      const el = document.getElementById(ch.id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
                setActiveChapter(idx);
              }
            });
          },
          { threshold: [0.45, 0.7] }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    // 2. Debounced Wheel lock-in snapping between Slide 0 (Hero) and Slide 1 (Statement)
    let isThrottled = false;
    const handleWheel = (e) => {
      if (isThrottled) return;
      if (Math.abs(e.deltaY) < 28) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // When at Cover (Slide 0) and scrolling down -> snap cleanly to Statement (Slide 1)
      if (e.deltaY > 0 && scrollY < vh * 0.4) {
        isThrottled = true;
        scrollToChapter('story-quote', 1);
        setTimeout(() => { isThrottled = false; }, 850);
      }
      // When at Statement (Slide 1) and scrolling up -> snap cleanly back to Cover (Slide 0)
      else if (e.deltaY < 0 && scrollY >= vh * 0.4 && scrollY < vh * 1.3) {
        isThrottled = true;
        scrollToChapter('hero', 0);
        setTimeout(() => { isThrottled = false; }, 850);
      }
      // When at Statement (Slide 1) and scrolling down -> snap cleanly to Exhibition (Slide 2)
      else if (e.deltaY > 0 && scrollY >= vh * 0.6 && scrollY < vh * 1.3) {
        isThrottled = true;
        scrollToChapter('event', 2);
        setTimeout(() => { isThrottled = false; }, 850);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="relative bg-[#1C110F] text-[#FAF6F0]">
      {/* =========================================================================
          RIGHT-ANCHORED VERTICAL CHAPTER PILL PAGINATION (CELESTIAL ARCHIVE SPEC)
          ========================================================================= */}
      <aside
        aria-label="Chapter Deck Navigation"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3.5 py-4 px-2 rounded-full glass-pill shadow-2xl pointer-events-auto"
      >
        {chapters.map((ch, idx) => {
          const isActive = activeChapter === idx;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id, idx)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label={`Jump to ${ch.label}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#E5A93C] border border-[#F3D2A2]/80 scale-125'
                    : 'w-2 h-2 bg-white/30 border border-white/20 hover:border-[#E5A93C] hover:bg-[#E5A93C]/50'
                }`}
              />
              <span className="absolute right-8 px-2.5 py-1 rounded text-[9px] tracking-[0.2em] uppercase font-sans font-medium bg-[#160B0A]/90 text-[#FAF6F0] border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                {ch.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* 1. Cinematic Hero with Fullscreen Video & Floating Doves (Slide 0: 100vh) */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. Editorial Quote Spotlight (Slide 1: 100vh full-viewport chapter) */}
      <section
        id="story-quote"
        className="snap-chapter-slide relative w-full h-screen min-h-[700px] bg-[#251917] border-t border-b border-[#E5A93C]/20 overflow-hidden text-center px-6 flex flex-col justify-between items-center select-none"
      >
        {/* Top Spacer for Floating Navbar Balance */}
        <div className="pt-24 md:pt-28" />

        {/* Painterly Chiaroscuro Clouds Background (Clean fine art without any baked-in text) */}
        <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
          <img
            src="/assets/chiaroscuro-clouds.jpg"
            alt="Dramatic chiaroscuro Renaissance oil painting with golden amber highlights and crimson shadows"
            className="w-full h-full object-cover object-center filter contrast-115 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C110F]/85 via-[#251917]/55 to-[#1C110F]/90" />
        </div>

        {/* Center Content Composition */}
        <div className="max-w-3xl mx-auto relative z-10 my-auto">
          {/* Section Label: Clean Sans, Medium 500, Tracking 0.25em */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#1C110F]/70 text-[11px] tracking-[0.25em] font-sans font-medium text-[#F3D2A2] uppercase mb-6 backdrop-blur-md">
            <Sparkles size={12} className="text-[#E5A93C]" />
            <span>THE UDAAN ESSENCE</span>
          </div>

          {/* Hero Title Style: EB Garamond, Regular 400, Loose Tracking (0.08em) */}
          <h2 className="font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FAF6F0] leading-[1.15] headline-shadow text-glow tracking-[0.05em]">
            “Gave the world beauty born from the passion of visionary women founders.”
          </h2>

          {/* Dust Gray Secondary Ink (#C2B8B5) */}
          <p className="mt-6 text-sm sm:text-base text-[#C2B8B5] font-sans font-light tracking-wide max-w-xl mx-auto headline-shadow">
            Udaan transforms local creative journeys into recognized luxury powerhouses across India.
          </p>

          <div className="mt-9 flex items-center justify-center space-x-4">
            <Link
              to="/about"
              className="btn-ghost-pill px-9 py-3.5 rounded-full text-[11px] tracking-widest-2xl text-[#FAF6F0] uppercase font-sans font-semibold transition-all shadow-xl"
            >
              Explore Our Story
            </Link>
          </div>
        </div>

        {/* Bottom Minimal Bar mirroring Reference & Syncing with Deck */}
        <div className="relative z-10 w-full px-6 md:px-12 py-5 flex items-center justify-between text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#C2B8B5]">
          <div className="flex items-center space-x-3">
            <span className="text-[#E5A93C]">02 • STATEMENT</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline">THE UDAAN ESSENCE</span>
          </div>

          {/* Center Next Slide Indicator */}
          <a
            href="#event"
            onClick={(e) => {
              e.preventDefault();
              scrollToChapter('event', 2);
            }}
            className="hidden md:flex flex-col items-center space-y-1 hover:text-[#E5A93C] transition-colors group cursor-pointer"
          >
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#C2B8B5]/70 group-hover:text-[#E5A93C]">
              SCROLL TO EXHIBITION
            </span>
            <span className="inline-block text-[#E5A93C] animate-bounce">↓</span>
          </a>

          <div className="flex items-center space-x-3">
            <span className="text-[#C2B8B5]/70">WHERE WOMEN BUILD BRANDS</span>
          </div>
        </div>
      </section>

      {/* 3. Featured Event: Glamour Gala Diwali Edition 5 */}
      <FeaturedEvent onOpenBooking={onOpenBooking} />

      {/* 4. Brand Story & The 4 Pillars */}
      <BrandStory onOpenBooking={onOpenBooking} />

      {/* 5. The 6 Curated Categories */}
      <CategoriesSection
        onSelectCategoryFilter={(cat) => onOpenBooking(cat)}
        onOpenBooking={(cat) => onOpenBooking(cat)}
      />

      {/* 6. Interactive Stall Map Preview */}
      <StallMap onSelectStallForBooking={onSelectStall} />

      {/* 7. Why Exhibit Value Proposition */}
      <WhyExhibit onOpenBooking={onOpenBooking} />

      {/* 8. Visitor Experience & VIP Pass RSVP */}
      <VisitorExperience />

      {/* 9. Visual Archive Gallery */}
      <GallerySection />

      {/* 10. FAQ & Contact Preview */}
      <FAQSection />
      <ContactSection />
    </div>
  );
}
