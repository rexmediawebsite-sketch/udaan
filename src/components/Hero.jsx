import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { FEATURED_EVENT } from '../data/eventData';

export default function Hero({ onOpenBooking }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen h-[100vh] min-h-[700px] overflow-hidden text-center flex flex-col justify-between items-center select-none"
    >
      {/* =========================================================================
          BACKGROUND: AUTHENTIC SUNSET & DOVES HERO VIDEO
          Vibrant golden sunset with subtle cinematic vignette — ZERO milky white wash!
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#2B1B17]">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="/assets/hero-poster.png"
          className="w-full h-full object-cover object-center transform scale-[1.01] filter saturate-[1.12] contrast-[1.05]"
        >
          <source src="/assets/hero-sky.mp4" type="video/mp4" />
          <img
            src="/assets/hero-poster.png"
            alt="Golden doves soaring through illuminated sunset clouds and blue sky"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Deep cinematic vignette — warm dusk tone, letting the golden sky shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 pointer-events-none" />
      </div>

      {/* Top Spacer for Nav pill */}
      <div className="pt-28 md:pt-36" />

      {/* =========================================================================
          HERO CENTER COMPOSITION — CLEAN, MINIMAL, REFINED LUXURY
          All junk removed: No eyebrow banner, no clutter, pristine typography
          ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center my-auto space-y-4">
        {/* Main Title: UDAAN */}
        <h1 className="font-serif font-bold text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-[#FFFAF2] tracking-[0.18em] leading-none uppercase select-text drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
          UDAAN
        </h1>

        {/* Hindi Tagline */}
        <h2 className="font-hindi font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFAF2] tracking-wide leading-tight select-text drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
          महिलाओं की नई पहचान
        </h2>

        {/* Liquid Glass Date & Venue Pill: Ultra-sleek frosted glass with champagne gold borders */}
        <div className="mt-3 px-6 py-2.5 rounded-full bg-[#2B1B17]/40 backdrop-blur-2xl border border-[#D9A441]/40 text-[#FFFAF2] shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold">
          <span className="text-[#D9A441]">{FEATURED_EVENT.edition}</span>
          <span className="text-white/40">•</span>
          <span className="text-[#FFFAF2]">{FEATURED_EVENT.dates}</span>
          <span className="text-white/40">•</span>
          <span className="text-[#FFFAF2]">{FEATURED_EVENT.city}</span>
        </div>

        {/* Poetic Subtitle */}
        <p className="mt-2 max-w-xl text-base sm:text-lg font-serif italic text-[#FFFAF2]/95 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          “A stage where Bihar's creative women transform bespoke passion into recognized luxury powerhouses.”
        </p>
      </div>

      {/* =========================================================================
          LOWERED ACTIONS & CLEAN VENUE BADGE
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center pb-12 space-y-4">
        {/* Dual Actions in Liquid Glass / Gold Luxury */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <MagneticButton
            onClick={() => onOpenBooking()}
            cursorLabel="Book"
            className="btn-gold-luxury w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase font-semibold shadow-2xl flex items-center justify-center gap-2"
          >
            <span>Apply for Stall Allotment</span>
            <ArrowRight size={14} />
          </MagneticButton>

          <MagneticButton
            as={Link}
            to="/stalls"
            cursorLabel="Map"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2B1B17]/40 backdrop-blur-2xl border border-white/30 text-[#FFFAF2] hover:bg-[#2B1B17]/60 hover:border-[#D9A441]/60 text-xs font-sans tracking-[0.22em] uppercase font-medium flex items-center justify-center gap-2 shadow-2xl transition-all"
          >
            <span>Explore Floor Map</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
