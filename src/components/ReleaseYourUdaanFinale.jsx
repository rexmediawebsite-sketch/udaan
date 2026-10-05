import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { UdaanEmblem } from './UdaanIcons';

export default function ReleaseYourUdaanFinale({ onOpenBooking }) {
  const [dream, setDream] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dream.trim()) return;

    setIsFlying(true);

    // Trigger golden petal confetti burst
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#D9A441', '#B8801F', '#FFE8B3', '#B85C38', '#FFFAF2'],
      shapes: ['circle'],
      ticks: 200,
      scalar: 1.2,
    });

    setTimeout(() => {
      setIsFlying(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section className="relative w-full py-28 bg-[#4A1620] text-[#FFFAF2] overflow-hidden select-none">
      {/* Background Radial Dusk Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,164,65,0.18)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
        {/* Emblem & Eyebrow */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2B1B17]/80 border border-[#D9A441]/40 text-[#D9A441] text-xs font-semibold uppercase tracking-[0.15em] shadow-md backdrop-blur-md">
            <UdaanEmblem size={14} className="text-[#D9A441]" />
            <span>The Grand Finale • Diwali Edition 5</span>
          </div>

          <h2 className="font-heading font-semibold text-5xl sm:text-6xl md:text-7xl text-[#FFFAF2] tracking-tight leading-none">
            Release Your <span className="text-[#D9A441] italic font-serif">Udaan</span>
          </h2>

          <p className="font-hindi text-2xl text-[#D9A441]">
            सपनों को दें नई उड़ान
          </p>

          <p className="font-sans text-base text-[#FFFAF2]/85 max-w-lg mx-auto leading-relaxed">
            Every empire begins with a whispered ambition. Write your aspiration, release your dove into the Patna sky, and take your stage at Tangerine Grand.
          </p>
        </div>

        {/* The Wish Submission Flow */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <div className="relative">
              {/* 52px Styled Floating-Label Input */}
              <input
                type="text"
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="Write your dream in one line (e.g. Taking my handloom atelier national)"
                required
                maxLength={120}
                className="w-full h-[56px] px-6 pr-14 rounded-full bg-[#2B1B17]/90 border border-[#D9A441]/50 text-[#FFFAF2] placeholder-[#FFFAF2]/40 text-sm focus:outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/40 transition-all shadow-2xl backdrop-blur-md"
              />

              <button
                type="submit"
                disabled={isFlying}
                data-cursor="Fly"
                aria-label="Release Dream"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#D9A441] text-[#2B1B17] hover:bg-[#FFE8B3] flex items-center justify-center transition-all duration-300 shadow-md"
              >
                <Send size={16} className={isFlying ? 'animate-bounce' : ''} />
              </button>
            </div>

            {/* Flying Paper Dove Animation Proxy */}
            {isFlying && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 animate-flyUp">
                <div className="w-12 h-12 text-[#FFFAF2] drop-shadow-[0_0_15px_#D9A441] animate-spin-slow">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c-.6 0-1.1-.3-1.5-.7C9.3 12 8 10 5.5 10c-2.5 0-4 1.8-4 4 0 3 2.5 5.5 6 5.5 1.5 0 3-.5 4.5-1.5 1.5 1 3 1.5 4.5 1.5 3.5 0 6-2.5 6-5.5 0-2.2-1.5-4-4-4-2.5 0-3.8 2-5 3.3-.4.4-.9.7-1.5.7z" />
                  </svg>
                </div>
              </div>
            )}

            <p className="text-[11px] text-[#FFFAF2]/50 tracking-wider font-sans">
              Privacy note: Your dream is celebrated privately. No sensitive personal data is stored.
            </p>
          </form>
        ) : (
          /* Celebratory Lit Diya + Action Options */
          <div className="p-8 sm:p-10 rounded-2xl bg-[#2B1B17]/90 border border-[#D9A441] shadow-2xl max-w-xl mx-auto space-y-6 animate-fadeIn">
            {/* Lit Diya Celebration */}
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-[#B85C38] via-[#D9A441] to-[#FFE8B3] diya-flame" />
              <div className="w-10 h-3 rounded-b-full bg-[#B85C38] border-t border-[#D9A441] shadow-[0_0_18px_#D9A441]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold">
                Your Dove Has Taken Flight
              </span>
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#FFFAF2]">
                May Your Brand Soar at UDAAN
              </h3>
              <p className="text-xs sm:text-sm text-[#FFFAF2]/80 max-w-md mx-auto">
                Join 50+ visionary founders at Tangerine Grand this Diwali, or claim your complimentary VIP entry pass.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <MagneticButton
                onClick={() => onOpenBooking()}
                cursorLabel="Book"
                className="btn-gold-luxury w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-xl"
              >
                Book a Stall
              </MagneticButton>

              <Link
                to="/visitors"
                data-cursor="RSVP"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FFFAF2] text-[#4A1620] hover:bg-[#FBF4EA] text-xs font-sans font-semibold tracking-widest uppercase transition-all shadow-md"
              >
                Get My RSVP Pass &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
