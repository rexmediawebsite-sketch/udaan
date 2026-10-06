import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Sparkles, MessageCircle } from 'lucide-react';

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
const HYSTERESIS = 0.12;
const DEAD_ZONE = 60;
const PAYOFFS = ['heart', 'sparkle', 'delighted', 'wink'];
const BOOP_PAYOFF = 110;
const BOOP_END = 540;
const SQUASH_MS = 400;
const DIZZY_AFTER = 4;
const DIZZY_WINDOW = 1600;
const DIZZY_END = 1200;

const SQUASH_KEYFRAMES = [
  { transform: 'scale(1, 1)', easing: 'ease-in' },
  { transform: 'scale(1.12, 0.84)', offset: 0.18, easing: 'ease-out' },
  { transform: 'scale(0.94, 1.09)', offset: 0.45, easing: 'ease-in-out' },
  { transform: 'scale(1.03, 0.98)', offset: 0.72, easing: 'ease-in-out' },
  { transform: 'scale(1, 1)' },
];

function cell(index) {
  return {
    backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
  };
}

function wrap(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

const layerStyle = {
  position: 'absolute',
  inset: 0,
  backgroundSize: '300% 300%',
  backgroundRepeat: 'no-repeat',
};

/**
 * Mobile-Optimized Floating Page Mascot
 * - Supports mouse pointer tracking on desktop
 * - Full touch event tracking on phones (tracks finger position during touch & scroll)
 * - Zero touch delay, haptic feedback on mobile tap
 * - Collapsible, sleek luxury exhibition palette styling
 */
export default function PageMascot({
  directions = '/mascots/glasses-directions.webp',
  reactions = '/mascots/glasses-reactions.webp',
  label = 'Udaan Mascot',
}) {
  const buttonRef = useRef(null);
  const squashRef = useRef(null);
  const timersRef = useRef([]);
  const boopsRef = useRef({ count: 0, at: 0 });
  const idleTimerRef = useRef(null);

  const [direction, setDirection] = useState('center');
  const [reaction, setReaction] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [touchActive, setTouchActive] = useState(false);

  // Auto-dismiss tooltip after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Aim towards (x, y) coordinates
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

  // Handle Desktop Mouse & Mobile Touch Global Tracking
  useEffect(() => {
    let lastSector = -1;

    // Desktop pointer movement
    const onPointerMove = (e) => {
      // If fine pointer (mouse/trackpad), follow cursor
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        aimTowards(e.clientX, e.clientY);
      }
    };

    // Mobile Phone Touch Tracking
    const onTouchStartWindow = (e) => {
      if (e.touches && e.touches.length > 0) {
        setTouchActive(true);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        const touch = e.touches[0];
        aimTowards(touch.clientX, touch.clientY);
      }
    };

    const onTouchMoveWindow = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        aimTowards(touch.clientX, touch.clientY);
      }
    };

    const onTouchEndWindow = () => {
      // When finger lifted on phone, look center after 1.5 seconds of idle
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setDirection('center');
        setTouchActive(false);
      }, 1500);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onTouchStartWindow, { passive: true });
    window.addEventListener('touchmove', onTouchMoveWindow, { passive: true });
    window.addEventListener('touchend', onTouchEndWindow, { passive: true });
    window.addEventListener('scroll', () => {
      if (!touchActive) {
        // Slight glance down during fast scroll
        setDirection('down');
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => setDirection('center'), 600);
      }
    }, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchstart', onTouchStartWindow);
      window.removeEventListener('touchmove', onTouchMoveWindow);
      window.removeEventListener('touchend', onTouchEndWindow);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [aimTowards, touchActive]);

  // Clean up animation timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(window.clearTimeout);
    };
  }, []);

  // Boop / Poke Interaction (optimized for phone taps)
  const boop = (e) => {
    if (e) {
      e.stopPropagation();
    }

    // Dismiss speech bubble on first boop
    setShowTooltip(false);

    // Mobile Haptic Feedback (Phone Vibration API)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch (err) {
        // Ignore vibration permission errors
      }
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

  // Minimized Floating Pill Mode
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none animate-fadeIn">
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center space-x-2 px-3 py-2 rounded-full bg-[#1F1218]/90 hover:bg-[#341824] border border-[#B69A67]/50 text-[#F5EFE5] shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-105"
          title="Open Mascot Companion"
          aria-label="Open Mascot"
        >
          <Sparkles size={14} className="text-[#D9A441] animate-pulse" />
          <span className="text-[11px] font-sans font-medium tracking-wider text-[#D9A441]">
            Mascot
          </span>
        </button>
      </div>
    );
  }

  return (
    <aside 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none pointer-events-auto"
      aria-label="Interactive Page Companion"
    >
      {/* Playful Speech Tooltip (auto-disappears, tap to dismiss) */}
      {showTooltip && (
        <div 
          onClick={() => setShowTooltip(false)}
          className="mb-2 relative px-3 py-1.5 rounded-xl bg-[#1F1218]/95 border border-[#B69A67]/40 shadow-xl backdrop-blur-md text-[#F5EFE5] text-[11px] font-sans flex items-center space-x-2 cursor-pointer animate-bounce duration-1000"
          style={{ animationIterationCount: 3 }}
        >
          <span className="text-[#D9A441] font-medium">✨ Poke me!</span>
          <span className="text-[9px] text-[#F5EFE5]/60 hover:text-white">✕</span>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#1F1218] border-b border-r border-[#B69A67]/40 rotate-45 transform" />
        </div>
      )}

      {/* Mascot Container Glass Card */}
      <div className="relative group bg-[#1F1218]/90 hover:bg-[#281420]/95 backdrop-blur-md border border-[#B69A67]/40 hover:border-[#D9A441]/70 rounded-2xl p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.55)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(182,154,103,0.3)]">
        
        {/* Subtle Minimize Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#171416] border border-[#B69A67]/40 text-[#B69A67] hover:text-white flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity z-10"
          title="Minimize mascot"
          aria-label="Minimize mascot"
        >
          <X size={11} />
        </button>

        {/* Mascot Interactive Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={boop}
          onTouchStart={(e) => {
            // Instant touch response without waiting for click event
            boop(e);
          }}
          aria-label={`Boop the ${label}`}
          className="relative block flex-shrink-0 cursor-pointer outline-none rounded-xl overflow-hidden"
          style={{
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
          }}
        >
          {/* Responsive sizing: 88px on phones, 116px on desktop */}
          <div className="w-[84px] h-[84px] sm:w-[112px] sm:h-[112px] relative flex items-center justify-center">
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
              {/* Directions Sprite Layer */}
              <span
                style={{
                  ...layerStyle,
                  backgroundImage: `url(${directions})`,
                  ...cell(DIRECTIONS.indexOf(direction)),
                  opacity: reaction ? 0 : 1,
                  transition: 'opacity 0.08s ease',
                }}
              />

              {/* Reactions Sprite Layer */}
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

        {/* Golden Base Indicator Accent */}
        <div className="w-full flex items-center justify-center pt-0.5 pb-0.5">
          <div className="w-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#D9A441]/60 to-transparent" />
        </div>
      </div>
    </aside>
  );
}
