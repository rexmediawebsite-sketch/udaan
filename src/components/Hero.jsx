import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ChevronDown, Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';
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
      className="snap-chapter-slide relative w-full h-screen min-h-[700px] flex flex-col justify-between items-center overflow-hidden select-none bg-[#1C110F]"
    >
      {/* =========================================================================
          CHIAROSCURO CLOUDS & SOARING DOVES VIDEO BACKDROP
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
          className="w-full h-full object-cover object-center transform scale-[1.02] filter saturate-[1.08] contrast-[1.05]"
        >
          <source src="/assets/hero-sky.mp4" type="video/mp4" />
          <img
            src="/assets/hero-poster.png"
            alt="Baroque illuminated golden sky with soaring white doves"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Chiaroscuro atmospheric overlays: deep espresso velvet & twilight azure reflections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C110F]/55 via-transparent to-[#1C110F]/85 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1C110F]/20 to-[#160B0A]/80 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2B6C9E]/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

      {/* Top Spacer for Floating Navbar Balance */}
      <div className="pt-24 md:pt-28" />

      {/* =========================================================================
          HERO CENTER COMPOSITION — CELESTIAL ARCHIVE TYPOGRAPHY
          ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        
        {/* Section Label: Clean Sans, Medium 500, Very Wide Tracking (0.25em), Uppercase */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#251917]/50 backdrop-blur-md mb-5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#E5A93C] animate-pulse" />
          <span className="text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase">
            UDAAN PRESENTS
          </span>
          <span className="w-1 h-1 rounded-full bg-[#E5A93C]" />
          <span className="text-[10px] font-sans tracking-[0.2em] text-[#C2B8B5]">
            WHERE WOMEN BUILD BRANDS
          </span>
        </div>

        {/* Hero Title: EB Garamond / Cormorant, Regular 400, Loose Tracking (0.08em), Uppercase */}
        <div className="flex flex-col items-center justify-center leading-none">
          <h1 className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FAF6F0] tracking-[0.08em] leading-[0.88] headline-shadow text-glow uppercase select-text">
            GLAMOUR
          </h1>
          <h2 className="font-syne font-extrabold uppercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FAF6F0] tracking-[-0.02em] leading-[0.92] headline-shadow select-text -mt-1 sm:-mt-2 md:-mt-3">
            GALA
          </h2>
        </div>

        {/* Event Edition & Date Subtitle */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans tracking-[0.25em] text-[#E5A93C] uppercase font-semibold">
          <span>{FEATURED_EVENT.edition}</span>
          <span className="text-[#C2B8B5]/40">•</span>
          <span className="text-[#FAF6F0]">{FEATURED_EVENT.dates}</span>
          <span className="text-[#C2B8B5]/40">•</span>
          <span className="text-[#F3D2A2]">{FEATURED_EVENT.city}</span>
        </div>

        {/* Poetic Italic Statement: EB Garamond, Italic 400, Warm Parchment (#FAF6F0) */}
        <p className="mt-5 max-w-xl text-base sm:text-lg font-serif italic text-[#FAF6F0] leading-relaxed headline-shadow opacity-95">
          “A showcase honoring the makers, visionaries and creators who turned a season of inspiration into something rare.”
        </p>

        {/* Ghost CTAs (Pill-shaped triggers with dark bronze fill & hairline borders) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/events/glamour-gala-5"
            className="btn-ghost-pill w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.25em] text-[#FAF6F0] uppercase font-medium flex items-center justify-center space-x-2 group cursor-pointer shadow-xl"
          >
            <span>Explore Exhibition</span>
            <ArrowRight size={13} className="text-[#E5A93C] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/stalls"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs font-sans tracking-[0.25em] uppercase hover:bg-[#F3D2A2] transition-all shadow-xl hover:shadow-[#E5A93C]/30"
          >
            Interactive Stall Map
          </Link>
        </div>

        {/* Venue Micro Badge with Twilight Azure Accent */}
        <div className="mt-5 flex items-center text-[10px] tracking-[0.2em] text-[#C2B8B5] space-x-2">
          <MapPin size={12} className="text-[#2B6C9E]" />
          <span>Lemon Tree Premier • Tangerine Grand • Ground Floor Patna</span>
        </div>
      </div>

      {/* =========================================================================
          HERO BOTTOM MINIMAL FOOTER
          ========================================================================= */}
      <div className="relative z-10 w-full px-6 md:px-12 py-5 flex items-center justify-between text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#C2B8B5]">
        {/* Bottom Left */}
        <div className="flex items-center space-x-5">
          <span className="hover:text-[#E5A93C] transition-colors cursor-pointer">
            PATNA, BIHAR
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline hover:text-[#E5A93C] transition-colors"
          >
            INSTAGRAM
          </a>
          <span className="hidden sm:inline text-white/20">•</span>
          <Link
            to="/visitors"
            className="hover:text-[#E5A93C] transition-colors"
          >
            VISITOR RSVP
          </Link>
        </div>

        {/* Bottom Center: Scroll indicator */}
        <a
          href="#story-quote"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('story-quote');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden md:flex flex-col items-center space-y-1 hover:text-[#E5A93C] transition-colors group cursor-pointer"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#C2B8B5]/70 group-hover:text-[#E5A93C]">
            SCROLL TO DISCOVER
          </span>
          <ChevronDown size={14} className="animate-bounce text-[#E5A93C]" />
        </a>

        {/* Bottom Right: Audio / Ambience toggle */}
        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline text-[#C2B8B5]/70">
            {BRAND.tagline}
          </span>
          <span className="hidden lg:inline text-white/20">•</span>
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/15 bg-[#251917]/40 hover:border-[#E5A93C]/40 hover:text-white transition-all"
            title={hasAudio ? "Mute Ambience" : "Unmute Ambience"}
          >
            {hasAudio ? <Volume2 size={12} className="text-[#E5A93C]" /> : <VolumeX size={12} />}
            <span className="text-[9px] tracking-wider uppercase">
              {hasAudio ? 'AUDIO ON' : 'AMBIENCE'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
