import React, { useState, useEffect } from 'react';
import { UdaanEmblem } from './UdaanIcons';

export default function CinematicIntro({ onComplete }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0); // 0: initial, 1: letters, 2: tagline

  useEffect(() => {
    // Only play once per session
    const seen = sessionStorage.getItem('udaan_intro_seen');
    if (seen === 'true') {
      if (onComplete) onComplete();
      return;
    }

    setVisible(true);

    // Progress animation (0 to 100% over 3.2s)
    const startTime = performance.now();
    const duration = 3200;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);

      if (p > 30 && stage < 1) setStage(1);
      if (p > 65 && stage < 2) setStage(2);

      if (p >= 100) {
        clearInterval(interval);
        handleDismiss();
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('udaan_intro_seen', 'true');
    setVisible(false);
    if (onComplete) onComplete();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#2B1B17] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-700">
      {/* Background Sunset Glow Pulse */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#B85C38]/20 via-[#4A1620]/30 to-[#2B1B17] pointer-events-none" />

      {/* Skip Button: Always visible from 0s */}
      <button
        onClick={handleDismiss}
        data-cursor="Skip"
        className="absolute top-8 right-8 z-30 px-5 py-2 rounded-full border border-[#D9A441]/40 bg-[#2B1B17]/80 text-[#FFFAF2] hover:text-[#D9A441] hover:border-[#D9A441] text-xs font-sans uppercase tracking-[0.2em] transition-all backdrop-blur-md"
      >
        Skip Intro &rarr;
      </button>

      {/* Center Cinematic Assembly */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6">
        {/* Soaring Golden Dove Silhouette */}
        <div className="w-16 h-16 rounded-full border border-[#D9A441]/50 bg-gradient-to-br from-[#D9A441]/20 to-transparent flex items-center justify-center text-[#D9A441] shadow-[0_0_30px_#D9A441] animate-pulse">
          <UdaanEmblem size={32} className="text-[#D9A441]" />
        </div>

        {/* U-D-A-A-N Letters Assembly */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 font-display text-6xl sm:text-7xl md:text-8xl font-semibold tracking-[0.2em] text-[#FFFAF2]">
          {['U', 'D', 'A', 'A', 'N'].map((char, i) => (
            <span
              key={i}
              style={{
                transitionDelay: `${i * 120}ms`,
                transform: stage >= 1 ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.8)',
                opacity: stage >= 1 ? 1 : 0,
              }}
              className="inline-block transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] drop-shadow-[0_4px_24px_rgba(217,164,65,0.6)]"
            >
              {char}
            </span>
          ))}
        </div>

        {/* Hindi Tagline Self-Writing Reveal */}
        <div
          style={{
            transform: stage >= 2 ? 'translateY(0)' : 'translateY(16px)',
            opacity: stage >= 2 ? 1 : 0,
          }}
          className="transition-all duration-700 font-hindi text-2xl sm:text-3xl md:text-4xl text-[#D9A441] tracking-wide drop-shadow-md"
        >
          महिलाओं की नई पहचान
        </div>
      </div>

      {/* Bottom Gold Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#B8801F] via-[#D9A441] to-[#FFE8B3] transition-all duration-75 shadow-[0_0_12px_#D9A441]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
