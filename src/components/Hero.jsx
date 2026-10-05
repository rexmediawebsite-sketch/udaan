import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Hero({ onOpenBooking }) {
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check saved audio preference
    const savedAudio = localStorage.getItem('udaan_ambience_audio') === 'true';
    if (savedAudio && audioRef.current) {
      audioRef.current.play().then(() => setHasAudio(true)).catch(() => {});
    }
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (hasAudio) {
      audioRef.current.pause();
      setHasAudio(false);
      localStorage.setItem('udaan_ambience_audio', 'false');
    } else {
      audioRef.current.play().then(() => {
        setHasAudio(true);
        localStorage.setItem('udaan_ambience_audio', 'true');
      }).catch((e) => {
        console.log('Audio playback prevented by browser:', e);
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[720px] max-h-[1080px] overflow-hidden flex flex-col justify-between items-center text-center select-none"
    >
      {/* Background Ambience Audio */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3"
      />

      {/* =========================================================================
          BACKGROUND: AUTHENTIC SUNSET & DOVES CINEMATIC SKY
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#2B1B17]">
        <video
          autoPlay
          loop
          muted
          playsInline
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

        {/* Subtle top vignette for contrast against pill nav, keeping sunset sky & clouds rich */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Low, subtle bottom edge feathering only at the very base */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#FBF4EA]/40 to-transparent pointer-events-none" />
      </div>

      {/* Top Spacer to preserve vertical balance below fixed pill nav */}
      <div className="pt-24" />

      {/* =========================================================================
          HERO CENTER COMPOSITION — MINIMAL, CINEMATIC & VERTICALLY BALANCED
          ========================================================================= */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        {/* 1. Large UDAAN Title with Soft Gold Shimmer */}
        <h1 className="font-display font-semibold text-7xl sm:text-8xl md:text-9xl tracking-[0.16em] uppercase select-text text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#FFFAF2] to-[#F3D28E] drop-shadow-[0_4px_30px_rgba(43,27,23,0.7)] leading-none">
          UDAAN
        </h1>

        {/* 2. Hindi Tagline: महिलाओं की नई पहचान */}
        <h2 className="font-hindi text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFAF2] tracking-wide mt-4 md:mt-6 drop-shadow-[0_4px_24px_rgba(43,27,23,0.8)] leading-tight select-text">
          महिलाओं की नई पहचान
        </h2>

        {/* 3. Date & City Line with Soft Espresso Radial Scrim */}
        <div className="relative mt-7 md:mt-8 px-8 py-3 flex items-center justify-center">
          {/* Soft Espresso Radial Scrim (40% opacity, feathered edges) for WCAG AA readability */}
          <div
            className="absolute inset-0 rounded-full bg-[#2B1B17]/45 blur-md pointer-events-none"
            aria-hidden="true"
          />
          <p className="relative z-10 font-sans font-semibold text-[18px] sm:text-[20px] tracking-[0.1em] uppercase text-[#FFFAF2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            24 & 25 OCTOBER 2026 · PATNA
          </p>
        </div>

        {/* 4 & 5. Action Controls: Primary Gold Button & Underline Text Link */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {/* Primary Gold Button */}
          <MagneticButton
            onClick={() => onOpenBooking()}
            cursorLabel="Book"
            className="btn-gold-luxury px-9 py-3.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase shadow-2xl hover:shadow-[0_12px_32px_rgba(217,164,65,0.6)]"
          >
            Book a Stall
          </MagneticButton>

          {/* Underline Text Link in solid ivory */}
          <Link
            to="/stalls"
            data-cursor="Map"
            className="group relative text-sm sm:text-base font-sans font-medium text-[#FFFAF2] tracking-wider py-1 drop-shadow-[0_2px_10px_rgba(43,27,23,0.7)] transition-colors hover:text-[#D9A441]"
          >
            <span>Explore floor map &rarr;</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D9A441] transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          HERO BOTTOM: MINIMAL SCROLL CUE & DISCREET AMBIENCE ICON
          ========================================================================= */}
      <div className="relative z-10 w-full px-8 pb-6 flex items-end justify-between pointer-events-none">
        {/* Left balance spacer */}
        <div className="w-10" />

        {/* 6. Small Scroll Cue: Thin vertical gold line animating downward (no text) */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-transparent via-[#D9A441] to-transparent relative overflow-hidden rounded-full">
            <div className="w-full h-1/2 bg-[#FFFAF2] animate-bounce opacity-80" />
          </div>
        </div>

        {/* 7. Small Circular Ambience Speaker Icon (Bottom-Right, no label, OFF by default) */}
        <button
          onClick={toggleSound}
          data-cursor="Sound"
          aria-label={hasAudio ? "Mute ambience" : "Unmute ambience"}
          className="pointer-events-auto w-9 h-9 rounded-full bg-[#2B1B17]/70 border border-[#D9A441]/40 text-[#FFFAF2] hover:text-[#D9A441] hover:border-[#D9A441] flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm"
          title={hasAudio ? "Sound: ON" : "Sound: OFF"}
        >
          {hasAudio ? <Volume2 size={15} className="text-[#D9A441]" /> : <VolumeX size={15} />}
        </button>
      </div>
    </section>
  );
}
