import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ChevronDown, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { FEATURED_EVENT, BRAND } from '../data/eventData';

export default function Hero({ onOpenBooking }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAudio, setHasAudio] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setHasAudio(!videoRef.current.muted);
    }
  };

  return (
    <section
      id="hero"
      className="snap-chapter-slide relative w-full h-screen min-h-[700px] flex flex-col justify-between items-center overflow-hidden select-none bg-[#2D1D26]"
    >
      {/* =========================================================================
          SUNSET SKY & SOARING DOVES CINEMATIC VIDEO BACKDROP
          Preserves vivid blue, radiant golden amber, and warm clouds
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
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

        {/* Crisp sunset atmosphere overlay syncing directly into #180E15 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180E15]/30 via-transparent to-[#180E15] pointer-events-none" />
      </div>

      {/* Top Spacer for Floating Navbar Balance */}
      <div className="pt-24 md:pt-28" />

      {/* =========================================================================
          HERO CENTER COMPOSITION — SUNSET EDITORIAL TYPOGRAPHY
          ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        
        {/* Section Label: Solid Crisp Twilight Plum & Amber Pill (Zero blur) */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#F6B51F]/50 bg-[#251520] mb-5 shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 text-[#F6B51F] animate-pulse" />
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#F6B51F] uppercase">
            UDAAN PRESENTS
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#397EAC]" />
          <span className="text-[10px] font-sans tracking-[0.2em] text-[#FFF1D9] font-medium">
            WHERE WOMEN BUILD BRANDS
          </span>
        </div>

        {/* Hero Title: Cormorant Garamond, Regular 400, Warm Sunlit Ivory */}
        <div className="flex flex-col items-center justify-center leading-none">
          <h1 className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFF1D9] tracking-[0.08em] leading-[0.88] headline-shadow-dark text-glow-sunset uppercase select-text">
            GLAMOUR
          </h1>
          <h2 className="font-syne font-extrabold uppercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFF1D9] tracking-[-0.02em] leading-[0.92] headline-shadow-dark select-text -mt-1 sm:-mt-2 md:-mt-3">
            GALA
          </h2>
        </div>

        {/* Event Edition & Date Subtitle in Radiant Sun Gold */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans tracking-[0.25em] text-[#F6B51F] uppercase font-bold headline-shadow-dark">
          <span>{FEATURED_EVENT.edition}</span>
          <span className="text-[#FFF1D9]/60">•</span>
          <span className="text-[#FFF1D9]">{FEATURED_EVENT.dates}</span>
          <span className="text-[#FFF1D9]/60">•</span>
          <span className="text-[#E9AD83]">{FEATURED_EVENT.city}</span>
        </div>

        {/* Poetic Italic Statement: Warm Sunlit Ivory */}
        <p className="mt-5 max-w-xl text-base sm:text-lg font-serif italic text-[#FFF1D9] leading-relaxed headline-shadow-dark opacity-95">
          “A showcase honoring the makers, visionaries and creators who turned a season of inspiration into something rare.”
        </p>

        {/* Dual Actions: Sun Gold Primary & Ivory Ghost Secondary */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/stalls"
            className="btn-sunset-gold w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-all shadow-sunset flex items-center justify-center"
          >
            Interactive Stall Map
          </Link>

          <Link
            to="/events/glamour-gala-5"
            className="btn-sunset-ghost-dark w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.25em] text-[#FFF1D9] hover:text-[#F6B51F] uppercase font-medium flex items-center justify-center space-x-2 group cursor-pointer shadow-sunset"
          >
            <span>Explore Exhibition</span>
            <ArrowRight size={13} className="text-[#F6B51F] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Venue Micro Badge with Dusty Sky Blue Accent */}
        <div className="mt-5 flex items-center text-[10px] tracking-[0.2em] text-[#FFF1D9]/90 space-x-2 headline-shadow-dark font-medium font-sans">
          <MapPin size={12} className="text-[#5C96BE]" />
          <span>Lemon Tree Premier • Tangerine Grand • Ground Floor Patna</span>
        </div>
      </div>

      {/* =========================================================================
          HERO BOTTOM MINIMAL FOOTER
          ========================================================================= */}
      <div className="relative z-10 w-full px-6 md:px-12 py-5 flex items-center justify-between text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#FFF1D9]/85">
        {/* Bottom Left */}
        <div className="flex items-center space-x-5">
          <span className="hover:text-[#F6B51F] transition-colors cursor-pointer font-medium">
            PATNA, BIHAR
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline hover:text-[#F6B51F] transition-colors font-medium"
          >
            INSTAGRAM
          </a>
          <span className="hidden sm:inline text-white/30">•</span>
          <Link
            to="/visitors"
            className="hover:text-[#F6B51F] transition-colors font-medium"
          >
            VISITOR RSVP
          </Link>
        </div>

        {/* Bottom Center: Scroll indicator to Exhibition */}
        <a
          href="#event"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('event');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden md:flex flex-col items-center space-y-1 hover:text-[#F6B51F] transition-colors group cursor-pointer"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#FFF1D9]/75 group-hover:text-[#F6B51F]">
            SCROLL TO EXHIBITION
          </span>
          <ChevronDown size={14} className="animate-bounce text-[#F6B51F]" />
        </a>

        {/* Bottom Right: Audio / Ambience toggle */}
        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline text-[#FFF1D9]/70">
            {BRAND.tagline}
          </span>
          <span className="hidden lg:inline text-white/30">•</span>
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#E9AD83]/35 bg-[#251520] hover:border-[#F6B51F] hover:text-[#F6B51F] transition-all text-[#FFF1D9] shadow-md"
            title={hasAudio ? "Mute Ambience" : "Unmute Ambience"}
          >
            {hasAudio ? <Volume2 size={12} className="text-[#F6B51F]" /> : <VolumeX size={12} />}
            <span className="text-[9px] tracking-wider uppercase font-medium">
              {hasAudio ? 'AUDIO ON' : 'AMBIENCE'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
