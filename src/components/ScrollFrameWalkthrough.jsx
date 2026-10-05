import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  CheckCircle2,
  ChevronDown,
  Layers,
  MapPin
} from 'lucide-react';
import { UdaanDiamond } from './UdaanIcons';

gsap.registerPlugin(ScrollTrigger);

const FRAMES = [
  {
    id: 1,
    tag: 'FRAME 01 • FOYER & ENTRANCE',
    badge: 'VENUE ARCHITECTURE',
    title: 'Pillarless Grandeur at Lemon Tree Premier',
    subtitle: 'Ground Floor • Tangerine Grand Foyer',
    description: 'An expansive 12,000 sq.ft climate-controlled pillarless pavilion designed to host Bihar’s most affluent patrons in seamless five-star luxury.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85',
    specs: [
      { label: 'Total Area', val: '12,000 Sq.Ft' },
      { label: 'Ceiling Height', val: '18 Ft Pillarless' },
      { label: 'Air Conditioning', val: 'Central Chilled Water' },
      { label: 'Security & Access', val: 'Valet & VIP Elevator' },
    ],
    radarLabel: 'Tangerine Grand Entry Foyer',
    pinPos: { top: '35%', left: '25%' },
  },
  {
    id: 2,
    tag: 'FRAME 02 • SHOPPING PROMENADE',
    badge: 'HAUTE COUTURE BOULEVARD',
    title: 'Designer Ateliers & Fine Polki Promenades',
    subtitle: 'Wide Carpeted Aisles & Strategic Buyer Flow',
    description: 'Aisles curated with bespoke 3000K warm atrium lighting, plush carpeting, and acoustic damping to maximize dwell time and high-ticket festive purchases.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=85',
    specs: [
      { label: 'Aisle Width', val: '10 Ft Carpeted' },
      { label: 'Lighting Rig', val: '3000K Warm Atrium' },
      { label: 'Patron Velocity', val: '5,000+ Verified' },
      { label: 'Exclusivity', val: 'Category Protected' },
    ],
    radarLabel: 'Central Boulevard Aisles',
    pinPos: { top: '50%', left: '50%' },
  },
  {
    id: 3,
    tag: 'FRAME 03 • BOOTH ARCHITECTURE',
    badge: 'PLUG-AND-PLAY BOOTHS',
    title: '36 Bespoke Modular Designer Stalls',
    subtitle: 'Pre-Engineered Luxury Exhibition Infrastructure',
    description: 'Booths fitted with royal gold fascia branding, 6 directional LED spotlights, 100% uninterrupted power backup, and dedicated client seating zones.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85',
    specs: [
      { label: 'Standard Dimensions', val: '3m × 3m / 4m × 3m' },
      { label: 'Fascia Branding', val: 'Gold Metallic Acrylic' },
      { label: 'Power Backup', val: '100% Dual Genset' },
      { label: 'Spotlight Rig', val: '6 Directional LEDs' },
    ],
    radarLabel: 'Modular Stalls P-01 to P-36',
    pinPos: { top: '65%', left: '35%' },
  },
  {
    id: 4,
    tag: 'FRAME 04 • GALA & RUNWAY',
    badge: 'HIGH-FASHION CENTERSTAGE',
    title: 'The High Fashion Runway & VIP Lounge',
    subtitle: 'Where Founders Take The Festive Spotlight',
    description: 'The heartbeat of festive media excitement, featuring live pret showcases, celebrity guests, buyer interviews, and celebratory high tea receptions.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1800&q=85',
    specs: [
      { label: 'Runway Length', val: '40 Ft Elevated' },
      { label: 'VIP Lounge', val: 'Patron Champagne Bar' },
      { label: 'Press & Media', val: 'Regional & National' },
      { label: 'Edition', val: 'Diwali Glamour Gala 5' },
    ],
    radarLabel: 'North Runway Stage & Lounge',
    pinPos: { top: '40%', left: '75%' },
  },
];

export default function ScrollFrameWalkthrough({ onOpenBooking }) {
  const containerRef = useRef(null);
  const pinContentRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinContent = pinContentRef.current;
    if (!container || !pinContent) return;

    // Pinning with GSAP ScrollTrigger ensures 100% reliable sticky behavior across all browsers
    const trigger = ScrollTrigger.create({
      trigger: container,
      pin: pinContent,
      start: 'top top',
      end: '+=2400',
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setProgressVal(p);

        // Map progress (0 to 1) to active frame index (0 to 3)
        const frameIdx = Math.min(FRAMES.length - 1, Math.floor(p * FRAMES.length));
        setActiveFrameIndex(frameIdx);

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const jumpToFrame = (idx) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    // Total pin scroll distance is 2400px
    const targetY = containerTop + (idx / FRAMES.length) * 2400 + 40;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const currentFrame = FRAMES[activeFrameIndex];

  return (
    <section
      ref={containerRef}
      id="architectural-walkthrough"
      className="relative w-full bg-[#180B12] text-[#FFFAF2]"
    >
      {/* Pinned Content Wrapper (GSAP pins this element securely) */}
      <div
        ref={pinContentRef}
        className="w-full h-screen min-h-[580px] sm:min-h-0 overflow-hidden flex flex-col justify-between relative bg-[#180B12]"
        style={{ height: '100svh' }}
      >
        {/* =========================================================================
            1. MULTI-LAYERED BACKGROUND: VIDEO + CROSSFADING LUXURY IMAGERY
            ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Ambient Video Backdrop */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter saturate-150 contrast-125"
          >
            <source src="/assets/hero-sky.mp4" type="video/mp4" />
          </video>

          {/* Deep Vignette Gradients (Subtle, preserving rich image colors) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#180B12]/95 via-[#180B12]/75 to-[#180B12]/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180B12] via-transparent to-[#180B12]/80 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,164,65,0.15),transparent_70%)] z-10" />

          {/* High-Resolution Frame Photos */}
          {FRAMES.map((f, i) => {
            const isCurrent = i === activeFrameIndex;
            return (
              <div
                key={f.id}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  opacity: isCurrent ? 1 : 0,
                  transform: isCurrent ? 'scale(1)' : 'scale(1.04)',
                }}
              >
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover object-center filter saturate-[1.15] contrast-[1.08]"
                />
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            2. TOP HEADER HUD: LIVE TELEMETRY & FRAME COUNTER
            ========================================================================= */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-10 pt-4 sm:pt-8 flex items-center justify-between border-b border-[#D9A441]/20 pb-3 sm:pb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9A441] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#D9A441]" />
            </span>
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#D9A441] uppercase truncate max-w-[200px] sm:max-w-none">
              <UdaanDiamond size={10} className="shrink-0" />
              <span className="truncate">TANGERINE GRAND • WALKTHROUGH</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3 text-xs font-sans tracking-widest text-stone-300 uppercase">
            <span>Lemon Tree Premier</span>
            <span className="text-[#D9A441]">•</span>
            <span className="text-[#D9A441] font-medium">{currentFrame.radarLabel}</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#2B131D]/80 border border-[#D9A441]/30 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full backdrop-blur-md">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#D9A441]">
              0{activeFrameIndex + 1} / 0{FRAMES.length}
            </span>
          </div>
        </div>

        {/* =========================================================================
            3. MAIN STAGE CONTENT: EDITORIAL SPECS & RADAR CARD
            ========================================================================= */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-10 my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          {/* Left Column: Frame Story & Commercial Specs */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-5">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 text-[9px] sm:text-[10px] font-sans font-semibold tracking-[0.18em] uppercase text-[#D9A441]">
              <Sparkles size={10} />
              <span>{currentFrame.badge}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <span className="text-[11px] sm:text-sm font-sans tracking-[0.18em] sm:tracking-[0.2em] text-[#D9A441]/90 uppercase font-medium block">
                {currentFrame.subtitle}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFAF2] tracking-tight leading-[1.12] sm:leading-[1.08] transition-all duration-300">
                {currentFrame.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-base text-stone-200 font-sans font-light leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none">
              {currentFrame.description}
            </p>

            {/* 4-Box Technical Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 sm:pt-2">
              {currentFrame.specs.map((item, i) => (
                <div
                  key={i}
                  className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#2A111C]/80 border border-[#D9A441]/25 backdrop-blur-md shadow-lg"
                >
                  <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider text-stone-400 font-sans">
                    {item.label}
                  </span>
                  <span className="block text-[11px] sm:text-sm font-bold text-[#FFFAF2] font-serif mt-0.5 sm:mt-1 truncate">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                to="/stalls"
                className="btn-gold-luxury px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#180B12] shadow-xl flex items-center space-x-2 hover:scale-[1.02] transition-transform"
              >
                <span>Inspect Full 3D Map</span>
                <ArrowRight size={12} />
              </Link>

              <button
                onClick={() => onOpenBooking && onOpenBooking(`Walkthrough - ${currentFrame.badge}`)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#D9A441]/40 bg-[#2A111C]/60 hover:bg-[#D9A441]/20 text-[#FFFAF2] hover:text-[#D9A441] text-[11px] sm:text-xs font-sans uppercase tracking-wider transition-all backdrop-blur-md"
              >
                Reserve Space
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Live Radar & Hotspot Card */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center">
            <div className="w-full max-w-md rounded-3xl p-5 bg-gradient-to-br from-[#2B131D]/90 via-[#1E0C15]/90 to-[#12070D]/95 border border-[#D9A441]/40 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-[#D9A441]/20 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Compass size={16} className="text-[#D9A441] animate-spin-slow" />
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D9A441] font-semibold">
                    Live Venue Radar
                  </span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  LIVE TRACK
                </span>
              </div>

              {/* Viewport Preview */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border border-[#D9A441]/30">
                <img
                  src={currentFrame.image}
                  alt={currentFrame.title}
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180B12] via-transparent to-black/30" />

                {/* Radar Coordinate Grid */}
                <div className="absolute inset-0 border border-[#D9A441]/20 m-2 rounded-xl pointer-events-none grid grid-cols-3 grid-rows-3 opacity-30">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <div key={idx} className="border border-[#D9A441]/10" />
                  ))}
                </div>

                {/* Dynamic Pin Indicator */}
                <div
                  className="absolute transition-all duration-700 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  style={{ top: currentFrame.pinPos.top, left: currentFrame.pinPos.left }}
                >
                  <span className="w-9 h-9 rounded-full border border-[#D9A441] bg-[#D9A441]/25 animate-ping absolute" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D9A441] shadow-[0_0_15px_#D9A441] relative z-10" />
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                  <span className="text-[9px] tracking-widest text-[#FFFAF2] uppercase font-sans font-semibold bg-black/80 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                    {currentFrame.radarLabel}
                  </span>
                </div>
              </div>

              {/* Scroll Guidance */}
              <div className="mt-3 pt-2.5 border-t border-[#D9A441]/20 flex items-center justify-between text-[10px] font-sans text-stone-300">
                <span>Scroll to scrub venue frames</span>
                <span className="text-[#D9A441] font-semibold flex items-center gap-1">
                  <span>Progress {Math.round(progressVal * 100)}%</span>
                  <ChevronDown size={13} className="animate-bounce" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. BOTTOM FOOTER HUD: DYNAMIC SCRUB TRACK & JUMP BUTTONS
            ========================================================================= */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-10 pb-4 sm:pb-8 space-y-2 sm:space-y-3">
          {/* Continuous Progress Bar */}
          <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-gradient-to-r from-[#D9A441] via-[#FFF1D9] to-[#D9A441] origin-left transition-transform duration-100 ease-out shadow-[0_0_12px_#D9A441]"
              style={{ transform: `scaleX(${Math.max(0.04, progressVal)})` }}
            />
          </div>

          {/* Interactive Clickable Frame Tabs */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto py-1 scrollbar-none">
            {FRAMES.map((f, i) => {
              const isSelected = i === activeFrameIndex;
              return (
                <button
                  key={f.id}
                  onClick={() => jumpToFrame(i)}
                  className={`flex items-center space-x-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-left transition-all duration-300 border text-xs ${
                    isSelected
                      ? 'bg-[#D9A441]/20 border-[#D9A441] text-[#FFFAF2] shadow-[0_0_15px_rgba(217,164,65,0.3)] scale-[1.02]'
                      : 'bg-black/40 border-white/10 text-stone-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span className={`font-mono font-bold ${isSelected ? 'text-[#D9A441]' : 'text-stone-500'}`}>
                    0{f.id}
                  </span>
                  <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-semibold font-sans truncate max-w-[120px] md:max-w-none">
                    {f.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
