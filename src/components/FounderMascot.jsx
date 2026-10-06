import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Heart } from 'lucide-react';

const DIRECTIONS = [
  'up-left',
  'up',
  'up-right',
  'left',
  'center',
  'right',
  'down-left',
  'down',
  'down-right',
];

const REACTIONS = [
  'blink',
  'heart',
  'sparkle',
  'surprised',
  'wink',
  'bashful',
  'sleepy',
  'dizzy',
  'delighted',
];

const CLOCKWISE = [
  'right',
  'down-right',
  'down',
  'down-left',
  'left',
  'up-left',
  'up',
  'up-right',
];

const SECTOR = (Math.PI * 2) / CLOCKWISE.length;
const DEAD_ZONE = 50;
const PAYOFFS = ['heart', 'sparkle', 'delighted', 'wink'];
const BOOP_PAYOFF = 110;
const BOOP_END = 540;
const SQUASH_MS = 400;
const DIZZY_AFTER = 4;
const DIZZY_WINDOW = 1600;
const DIZZY_END = 1200;

const SQUASH_KEYFRAMES = [
  { transform: 'scale(1, 1)', easing: 'ease-in' },
  { transform: 'scale(1.14, 0.82)', offset: 0.18, easing: 'ease-out' },
  { transform: 'scale(0.92, 1.10)', offset: 0.45, easing: 'ease-in-out' },
  { transform: 'scale(1.04, 0.97)', offset: 0.72, easing: 'ease-in-out' },
  { transform: 'scale(1, 1)' },
];

function cell(index) {
  return {
    backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
  };
}

const layerStyle = {
  position: 'absolute',
  inset: 0,
  backgroundSize: '300% 300%',
  backgroundRepeat: 'no-repeat',
};

/**
 * Mobile- & Desktop-Optimized Founder Mascot Component
 * Tracks cursor on desktop and finger touch on mobile.
 * Features instant touch booping, haptics, squash animations, and playful interaction.
 */
export default function FounderMascot({
  directions,
  reactions,
  name,
  founderNumber = '01',
  role,
  hindiRole,
  desc,
  tagline,
  accentColor = '#9E1B28',
}) {
  const buttonRef = useRef(null);
  const squashRef = useRef(null);
  const timersRef = useRef([]);
  const boopsRef = useRef({ count: 0, at: 0 });
  const idleTimerRef = useRef(null);

  const [direction, setDirection] = useState('center');
  const [reaction, setReaction] = useState(null);
  const [totalBoops, setTotalBoops] = useState(0);
  const [justBooped, setJustBooped] = useState(false);

  // Aim towards (x, y) relative to this specific mascot's bounding box
  const aimTowards = useCallback((x, y) => {
    const button = buttonRef.current;
    if (!button) return;

    const box = button.getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;

    const dx = x - centerX;
    const dy = y - centerY;

    if (Math.hypot(dx, dy) < DEAD_ZONE) {
      setDirection('center');
      return;
    }

    const angle = Math.atan2(dy, dx);
    const sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
    setDirection(CLOCKWISE[sector]);
  }, []);

  // Window listeners for desktop mouse & phone touch
  useEffect(() => {
    const onPointerMove = (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        aimTowards(e.clientX, e.clientY);
      }
    };

    const onTouchStartWindow = (e) => {
      if (e.touches && e.touches.length > 0) {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        aimTowards(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMoveWindow = (e) => {
      if (e.touches && e.touches.length > 0) {
        aimTowards(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEndWindow = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setDirection('center');
      }, 1400);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onTouchStartWindow, { passive: true });
    window.addEventListener('touchmove', onTouchMoveWindow, { passive: true });
    window.addEventListener('touchend', onTouchEndWindow, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchstart', onTouchStartWindow);
      window.removeEventListener('touchmove', onTouchMoveWindow);
      window.removeEventListener('touchend', onTouchEndWindow);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [aimTowards]);

  // Clean up timers
  useEffect(() => {
    return () => {
      timersRef.current.forEach(window.clearTimeout);
    };
  }, []);

  // Boop interaction (works on click and touch)
  const boop = (e) => {
    if (e) {
      e.stopPropagation();
    }

    setTotalBoops((prev) => prev + 1);
    setJustBooped(true);
    setTimeout(() => setJustBooped(false), 800);

    // Mobile Haptic Feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch (err) {}
    }

    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];

    const later = (ms, next) => {
      timersRef.current.push(window.setTimeout(() => setReaction(next), ms));
    };

    const now = Date.now();
    const boops = boopsRef.current;
    boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1;
    boops.at = now;

    if (boops.count >= DIZZY_AFTER) {
      boops.count = 0;
      setReaction('dizzy');
      later(DIZZY_END, null);
    } else {
      setReaction('blink');
      later(BOOP_PAYOFF, PAYOFFS[(boops.count - 1) % PAYOFFS.length]);
      later(BOOP_END, null);
    }

    // Squash animation
    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      squashRef.current?.animate(SQUASH_KEYFRAMES, {
        duration: SQUASH_MS,
        easing: 'linear',
      });
    }
  };

  return (
    <div className="group relative p-7 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#2B1B17]/12 shadow-xl hover:shadow-2xl flex flex-col justify-between space-y-6 transition-all duration-500 hover:-translate-y-2">
      
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="px-3.5 py-1 rounded-full bg-[#FBF4EA] border border-[#2B1B17]/15 text-[10px] font-sans font-bold tracking-widest uppercase text-[#9E1B28]">
          FOUNDER {founderNumber}
        </div>
        <div className="text-[10px] font-sans font-semibold tracking-wider text-[#2B1B17]/40 flex items-center space-x-1">
          {totalBoops > 0 ? (
            <span className="text-[#9E1B28] flex items-center gap-1 font-bold animate-fadeIn">
              <Heart size={10} className="fill-[#9E1B28]" /> {totalBoops}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[#2B1B17]/40 group-hover:text-[#9E1B28] transition-colors">
              <Sparkles size={10} /> Tap to poke
            </span>
          )}
        </div>
      </div>

      {/* Mascot Interactive Showcase Pedestal */}
      <div className="relative w-full py-6 rounded-2xl bg-gradient-to-b from-[#FBF4EA] to-[#F5EFE5] border border-[#2B1B17]/8 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Soft Radial Ambient Aura */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
          style={{
            background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`
          }}
        />

        {/* Interactive Mascot Character */}
        <button
          ref={buttonRef}
          type="button"
          onClick={boop}
          onTouchStart={boop}
          aria-label={`Poke Founder ${founderNumber} mascot`}
          className="relative block cursor-pointer outline-none rounded-2xl focus:ring-2 focus:ring-[#9E1B28]/30 transition-transform active:scale-95"
          style={{
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
          }}
        >
          {/* Responsive Mascot Size: 104px on mobile, 124px on desktop */}
          <div className="w-[104px] h-[104px] sm:w-[124px] sm:h-[124px] relative flex items-center justify-center">
            <span
              ref={squashRef}
              style={{
                position: 'relative',
                display: 'block',
                width: '100%',
                height: '100%',
                transformOrigin: '50% 78%',
              }}
            >
              {/* Head Directions Sprite Layer */}
              <span
                style={{
                  ...layerStyle,
                  backgroundImage: `url(${directions})`,
                  ...cell(DIRECTIONS.indexOf(direction)),
                  opacity: reaction ? 0 : 1,
                  transition: 'opacity 0.08s ease',
                }}
              />

              {/* Head Reactions Sprite Layer */}
              <span
                style={{
                  ...layerStyle,
                  backgroundImage: `url(${reactions})`,
                  ...cell(REACTIONS.indexOf(reaction ?? 'blink')),
                  opacity: reaction ? 1 : 0,
                  transition: 'opacity 0.08s ease',
                }}
              />
            </span>
          </div>
        </button>

        {/* Mascot Ground Shadow */}
        <div className="w-16 h-2 rounded-full bg-black/10 filter blur-[2px] mt-1" />

        {/* Interactive Hint Pill below character */}
        <div className="mt-3 text-[10px] font-sans font-medium tracking-widest uppercase text-[#2B1B17]/60 group-hover:text-[#9E1B28] transition-colors flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B28] animate-pulse" />
          <span>{justBooped ? 'Hehe! ✨' : 'Follows your touch'}</span>
        </div>
      </div>

      {/* Founder Narrative & Vision */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-sans font-bold text-[#9E1B28] tracking-widest uppercase">
          <span>{role}</span>
          {hindiRole && <span className="font-normal text-[#2B1B17]/50">{hindiRole}</span>}
        </div>

        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#2B1B17]">
          {name}
        </h3>

        {tagline && (
          <p className="font-serif italic text-sm text-[#9E1B28]/90 font-medium">
            “{tagline}”
          </p>
        )}

        <p className="font-sans text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-light">
          {desc}
        </p>
      </div>

      {/* Bottom Dossier Tag */}
      <div className="pt-4 border-t border-[#2B1B17]/10 flex items-center justify-between text-[10px] font-sans font-semibold tracking-widest uppercase text-[#2B1B17]/50">
        <span>UDAAN LEADERSHIP COUNCIL</span>
        <span className="text-[#9E1B28] font-bold">ESTD. 2022</span>
      </div>
    </div>
  );
}
