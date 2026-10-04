import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import { FEATURED_EVENT, BRAND } from '../data/eventData';

export default function Hero({ onOpenBooking }) {
  const [hasAudio, setHasAudio] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const audioRef = useRef(null);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (hasAudio) {
      audioRef.current.pause();
      setHasAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setHasAudio(true);
      }).catch((e) => {
        console.log('Audio playback prevented by browser:', e);
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen h-[100vh] min-h-[720px] overflow-hidden text-center flex flex-col justify-between items-center select-none"
    >
      {/* Background Ambience Audio */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3"
      />

      {/* =========================================================================
          BACKGROUND: AUTHENTIC SUNSET & DOVES HERO VIDEO
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#1E121B]">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="/assets/hero-poster.png"
          className="w-full h-full object-cover object-center transform scale-[1.01] filter saturate-[1.05] contrast-[1.02]"
        >
          <source src="/assets/hero-sky.mp4" type="video/mp4" />
          <img
            src="/assets/hero-poster.png"
            alt="Golden doves soaring through illuminated sunset clouds and blue sky"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Controlled gradient overlay: maintains video vibrancy in center, transitions cleanly to warm cream at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-[#FAF4EB] pointer-events-none" />
      </div>

      {/* Top Spacer for Floating Navbar Balance */}
      <div className="pt-24 md:pt-28" />

      {/* =========================================================================
          HERO CENTER COMPOSITION — EDITORIAL TYPOGRAPHY & VERIFIED DETAILS
          ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        
        {/* Eyebrow Label: Refined Pill over video */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#F6B51F]/40 bg-[#1E121B]/75 mb-5 shadow-2xl backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#F6B51F] animate-pulse" />
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#F6B51F] uppercase">
            UDAAN PRESENTS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#397EAC]" />
          <span className="text-[10px] font-sans tracking-[0.2em] text-[#FFF1D9] font-medium">
            WHERE WOMEN BUILD BRANDS
          </span>
        </div>

        {/* Hero Title: Cormorant Garamond & Syne Typography */}
        <div className="flex flex-col items-center justify-center leading-none">
          <h1 className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFF1D9] tracking-[0.08em] leading-[0.88] headline-shadow-dark text-glow-sunset uppercase select-text">
            GLAMOUR
          </h1>
          <h2 className="font-syne font-extrabold uppercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFF1D9] tracking-[-0.02em] leading-[0.92] headline-shadow-dark select-text -mt-1 sm:-mt-2 md:-mt-3">
            GALA
          </h2>
        </div>

        {/* Event Edition & Verified Date Subtitle */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans tracking-[0.25em] text-[#F6B51F] uppercase font-bold headline-shadow-dark">
          <span>{FEATURED_EVENT.edition}</span>
          <span className="text-[#FFF1D9]/60">•</span>
          <span className="text-[#FFF1D9]">{FEATURED_EVENT.dates}</span>
          <span className="text-[#FFF1D9]/60">•</span>
          <span className="text-[#E9AD83]">{FEATURED_EVENT.city}</span>
        </div>

        {/* Poetic Narrative Statement */}
        <p className="mt-5 max-w-xl text-base sm:text-lg font-serif italic text-[#FFF1D9] leading-relaxed headline-shadow-dark opacity-95">
          “A stage where Bihar's creative women transform bespoke passion into recognized luxury powerhouses.”
        </p>

        {/* Dual Actions: Primary Allotment CTA & Secondary Floor Map CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onOpenBooking()}
            className="btn-sunset-gold w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-all shadow-xl flex items-center justify-center space-x-2"
          >
            <span>Apply for Stall Allotment</span>
            <ArrowRight size={13} />
          </button>

          <Link
            to="/stalls"
            className="btn-sunset-ghost-dark w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.25em] text-[#FFF1D9] hover:text-[#F6B51F] uppercase font-medium flex items-center justify-center space-x-2 group cursor-pointer shadow-xl backdrop-blur-sm"
          >
            <span>Explore Floor Map</span>
          </Link>
        </div>

        {/* Venue Micro Badge with Dusty Sky Blue Accent */}
        <div className="mt-5 flex items-center text-[10px] tracking-[0.2em] text-[#2A1C24] space-x-2 font-medium font-sans bg-white/80 px-3.5 py-1 rounded-full shadow-sm">
          <MapPin size={12} className="text-[#397EAC]" />
          <span>Lemon Tree Premier • Tangerine Grand • Ground Floor Patna</span>
        </div>
      </div>

      {/* =========================================================================
          HERO BOTTOM MINIMAL BAR & SCROLL ANCHOR
          ========================================================================= */}
      <div className="relative z-10 w-full px-6 md:px-12 py-5 flex items-center justify-between text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#5E4A55]">
        {/* Bottom Left */}
        <div className="flex items-center space-x-5">
          <span className="hover:text-[#B96535] transition-colors cursor-pointer font-semibold text-[#2A1C24]">
            PATNA, BIHAR
          </span>
          <span className="hidden sm:inline text-[#5E4A55]/40">•</span>
          <Link
            to="/visitors"
            className="hidden sm:inline hover:text-[#B96535] transition-colors"
          >
            VISITOR RSVP PASS
          </Link>
        </div>

        {/* Bottom Center: Smooth scroll indicator to Exhibition */}
        <a
          href="#event"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('event');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden md:flex flex-col items-center space-y-1 hover:text-[#B96535] transition-colors group cursor-pointer text-[#2A1C24]"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#5E4A55] group-hover:text-[#B96535]">
            SCROLL TO EXHIBITION
          </span>
          <ChevronDown size={14} className="animate-bounce text-[#B96535]" />
        </a>

        {/* Bottom Right: Audio / Ambience toggle */}
        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline text-[#5E4A55]">
            {BRAND.tagline}
          </span>
          <span className="hidden lg:inline text-[#5E4A55]/40">•</span>
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#E9AD83]/45 bg-[#FFFBF5] hover:border-[#B96535] hover:text-[#B96535] transition-all text-[#2A1C24] shadow-sm"
            title={hasAudio ? "Mute Ambience" : "Unmute Ambience"}
          >
            {hasAudio ? <Volume2 size={12} className="text-[#B96535]" /> : <VolumeX size={12} />}
            <span className="text-[9px] tracking-wider uppercase font-medium">
              {hasAudio ? 'AUDIO ON' : 'AMBIENCE'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
