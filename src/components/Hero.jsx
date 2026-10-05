import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';
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
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#2B1B17]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FBF4EA] pointer-events-none" />
      </div>

      {/* Top Spacer for Floating Navbar Balance */}
      <div className="pt-28 md:pt-32" />

      {/* =========================================================================
          HERO CENTER COMPOSITION — EDITORIAL TYPOGRAPHY & VERIFIED DETAILS
          ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center mt-2 mb-auto">
        
        {/* Eyebrow Label: Refined Pill over video */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#2B1B17]/80 mb-4 shadow-2xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A441] animate-pulse" />
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            GLAMOUR GALA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F6F78]" />
          <span className="text-[10px] font-sans tracking-[0.2em] text-[#FFFAF2] font-medium">
            WHERE WOMEN BUILD BRANDS
          </span>
        </div>

        {/* Hero Title: Cormorant Garamond for UDAAN & Tiro Devanagari Hindi */}
        <div className="flex flex-col items-center justify-center leading-none">
          <h1 className="font-serif font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFFAF2] tracking-[0.16em] leading-[0.9] headline-shadow-dark uppercase select-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
            UDAAN
          </h1>
          <h2 className="font-hindi font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFAF2] tracking-wide leading-normal headline-shadow-dark select-text mt-3 sm:mt-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
            महिलाओं की नई पहचान
          </h2>
        </div>

        {/* Soft Espresso Scrim for Guaranteed WCAG Contrast on Subtitle */}
        <div className="mt-4 px-5 py-1.5 rounded-full bg-[#2B1B17]/65 backdrop-blur-sm border border-[#D9A441]/25 inline-flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans tracking-[0.22em] uppercase font-semibold shadow-lg">
          <span className="text-[#D9A441]">{FEATURED_EVENT.edition}</span>
          <span className="text-[#FFFAF2]/50">•</span>
          <span className="text-[#FFFAF2]">{FEATURED_EVENT.dates}</span>
          <span className="text-[#FFFAF2]/50">•</span>
          <span className="text-[#D9A441]">{FEATURED_EVENT.city}</span>
        </div>

        {/* Poetic Narrative Statement */}
        <p className="mt-4 max-w-xl text-base sm:text-lg font-serif italic text-[#FFFAF2] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] opacity-95">
          “A stage where Bihar's creative women transform bespoke passion into recognized luxury powerhouses.”
        </p>
      </div>

      {/* =========================================================================
          LOWERED ACTIONS & VENUE BADGE (Placed lower with generous breathing room)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center pb-6">
        {/* Dual Actions: Primary Allotment CTA & Secondary Floor Map CTA */}
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
            className="btn-maroon-luxury w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase font-medium flex items-center justify-center gap-2 shadow-2xl backdrop-blur-md"
          >
            <span>Explore Floor Map</span>
          </MagneticButton>
        </div>

        {/* Venue Micro Badge lowered just beneath buttons */}
        <div className="mt-4 flex items-center text-[10px] sm:text-[11px] tracking-[0.2em] text-[#2B1B17] space-x-2 font-medium font-sans bg-[#FFFAF2]/95 border border-[#D9A441]/40 px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
          <MapPin size={12} className="text-[#1F6F78]" />
          <span>Lemon Tree Premier • Tangerine Grand • Ground Floor Patna</span>
        </div>
      </div>

      {/* =========================================================================
          HERO BOTTOM MINIMAL BAR & SCROLL ANCHOR
          ========================================================================= */}
      <div className="relative z-10 w-full px-6 md:px-12 py-4 flex items-center justify-between text-[10px] md:text-[11px] font-sans tracking-[0.22em] text-[#2B1B17]/80">
        {/* Bottom Left */}
        <div className="flex items-center space-x-5">
          <span className="hover:text-[#B85C38] transition-colors cursor-pointer font-semibold text-[#2B1B17]">
            PATNA, BIHAR
          </span>
          <span className="hidden sm:inline text-[#2B1B17]/40">•</span>
          <Link
            to="/visitors"
            data-cursor="RSVP"
            className="hidden sm:inline hover:text-[#B85C38] transition-colors"
          >
            VISITOR RSVP PASS
          </Link>
        </div>

        {/* Bottom Center: Smooth scroll indicator to Exhibition */}
        <a
          href="#event"
          data-cursor="Scroll"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('event');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden md:flex flex-col items-center space-y-1 hover:text-[#B85C38] transition-colors group cursor-pointer text-[#2B1B17]"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#66534E] group-hover:text-[#B85C38]">
            SCROLL TO EXHIBITION
          </span>
          <ChevronDown size={14} className="animate-bounce text-[#B85C38]" />
        </a>

        {/* Bottom Right: Audio / Ambience toggle */}
        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline text-[#66534E]">
            {BRAND.tagline}
          </span>
          <span className="hidden lg:inline text-[#2B1B17]/40">•</span>
          <button
            onClick={toggleSound}
            data-cursor="Sound"
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] hover:border-[#D9A441] hover:text-[#B85C38] transition-all text-[#2B1B17] shadow-sm"
            title={hasAudio ? "Mute Ambience" : "Unmute Ambience"}
          >
            {hasAudio ? <Volume2 size={12} className="text-[#B85C38]" /> : <VolumeX size={12} />}
            <span className="text-[9px] tracking-wider uppercase font-medium">
              {hasAudio ? 'AUDIO ON' : 'AMBIENCE'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
