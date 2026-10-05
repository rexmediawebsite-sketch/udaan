import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  Maximize2,
  Compass,
  RotateCw
} from 'lucide-react';
import { UdaanDiamond } from './UdaanIcons';

// 8 Curated Archival Moments for the 3D rotating carousel
export const ARCHIVE_HERO_CARDS = [
  {
    id: "arc-1",
    title: "Royal Polki & Kundan",
    subtitle: "Tangerine Grand • 2024",
    edition: "Edition 04 • Royal Heritage",
    category: "Fine Jewellery",
    badge: "ROYAL POLKI",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
    caption: "Uncut diamond polki masterpieces unveiled in Tangerine Grand's 5-star climate-controlled hall.",
    color: "#E2BA6C"
  },
  {
    id: "arc-2",
    title: "Banarasi & Zari Weaves",
    subtitle: "Hotel Maurya • 2022",
    edition: "Edition 01 • Inaugural",
    category: "Heirloom Handlooms",
    badge: "HEIRLOOM ZARI",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    caption: "Generational zari craftsmanship brought directly to Patna patrons by master craftswomen.",
    color: "#B85C38"
  },
  {
    id: "arc-3",
    title: "The Festive Promenade",
    subtitle: "5,400+ Festive Patrons",
    edition: "Edition 04 • Royal Heritage",
    category: "5-Star Exhibition",
    badge: "GRAND PROMENADE",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",
    caption: "Pillarless elegance and peak shopping festive spirit across 48 handpicked women-led booths.",
    color: "#D9A441"
  },
  {
    id: "arc-4",
    title: "Springtime Pastel Pret",
    subtitle: "Lemon Tree Premier • 2023",
    edition: "Edition 02 • Spring Soirée",
    category: "Contemporary Couture",
    badge: "PASTEL SILHOUETTES",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
    caption: "Lightweight organza and pastel summer couture debut for contemporary patrons.",
    color: "#E89B77"
  },
  {
    id: "arc-5",
    title: "Where Women Build Brands",
    subtitle: "Founder Networking • 2023",
    edition: "Edition 03 • Festive Grandeur",
    category: "Founder Spotlight",
    badge: "FOUNDER ATELIERS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
    caption: "Direct conversations between women entrepreneurs and high-intent festive wedding buyers.",
    color: "#B8801F"
  },
  {
    id: "arc-6",
    title: "925 Silver Filigree",
    subtitle: "Bespoke Jewelry Pavilion",
    edition: "Edition 02 • Spring Soirée",
    category: "Artisanal Silver",
    badge: "TEMPLE FILIGREE",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    caption: "Intricate silver filigree and temple jewelry curated for discerning contemporary collectors.",
    color: "#E5C384"
  },
  {
    id: "arc-7",
    title: "Festive Living & Terracotta",
    subtitle: "Living Heritage Decor • 2023",
    edition: "Edition 03 • Festive Grandeur",
    category: "Heritage Lifestyle",
    badge: "FESTIVE LIVING",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85",
    caption: "Ancient pottery and brass craft traditions reimagined into modern luxury lifestyle table settings.",
    color: "#B85C38"
  },
  {
    id: "arc-8",
    title: "The Inaugural Flame",
    subtitle: "Patna Genesis • October 2022",
    edition: "Edition 01 • Inaugural",
    category: "Movement Genesis",
    badge: "CEREMONIAL FLAME",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    caption: "The inaugural ceremonial flame at Hotel Maurya that ignited the UDAAN movement for women founders.",
    color: "#D9A441"
  }
];

export default function ArchiveRotatingHero({ onInspectCard, onExploreTimeline, onExploreWall }) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const lastPointerX = useRef(0);
  const velocityRef = useRef(0.22);
  const animFrameRef = useRef(null);
  const currentAngleRef = useRef(0);

  const totalCards = ARCHIVE_HERO_CARDS.length;
  const anglePerCard = 360 / totalCards;

  // Responsive radius detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const carouselRadius = isMobile ? 200 : 320;

  // Keep ref synchronized with state to avoid re-binding loops
  useEffect(() => {
    currentAngleRef.current = rotationAngle;
  }, [rotationAngle]);

  // Compute active front card based on current angle
  const computeActiveIndex = useCallback((angle) => {
    // Front card corresponds to card closest to (360 - (normalizedAngle % 360))
    const normalized = ((-angle % 360) + 360) % 360;
    const closestIdx = Math.round(normalized / anglePerCard) % totalCards;
    return closestIdx;
  }, [anglePerCard, totalCards]);

  // 60FPS continuous rotation loop
  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (timestamp) => {
      const delta = Math.min(32, timestamp - lastTimestamp);
      lastTimestamp = timestamp;

      if (!isDragging) {
        if (isAutoSpinning && !isHovered) {
          // Normal auto-rotation speed
          currentAngleRef.current += 0.22 * (delta / 16.6);
        } else if (Math.abs(velocityRef.current) > 0.02) {
          // Coasting inertia after release
          currentAngleRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // friction
        }

        setRotationAngle(currentAngleRef.current);
        setActiveCardIndex(computeActiveIndex(currentAngleRef.current));
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoSpinning, isHovered, isDragging, computeActiveIndex]);

  // Pointer drag to spin handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    lastPointerX.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const deltaX = clientX - lastPointerX.current;
    lastPointerX.current = clientX;

    const dragSensitivity = isMobile ? 0.45 : 0.35;
    currentAngleRef.current += deltaX * dragSensitivity;
    velocityRef.current = deltaX * dragSensitivity;
    setRotationAngle(currentAngleRef.current);
    setActiveCardIndex(computeActiveIndex(currentAngleRef.current));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Step rotation controls
  const rotateNext = () => {
    const target = Math.round((currentAngleRef.current - anglePerCard) / anglePerCard) * anglePerCard;
    currentAngleRef.current = target;
    setRotationAngle(target);
    setActiveCardIndex(computeActiveIndex(target));
  };

  const rotatePrev = () => {
    const target = Math.round((currentAngleRef.current + anglePerCard) / anglePerCard) * anglePerCard;
    currentAngleRef.current = target;
    setRotationAngle(target);
    setActiveCardIndex(computeActiveIndex(target));
  };

  const rotateToCard = (index) => {
    const target = -index * anglePerCard;
    currentAngleRef.current = target;
    setRotationAngle(target);
    setActiveCardIndex(index);
    if (onInspectCard) {
      onInspectCard(index);
    }
  };

  const currentFrontCard = ARCHIVE_HERO_CARDS[activeCardIndex] || ARCHIVE_HERO_CARDS[0];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0E0B0A] text-[#FFFAF2] overflow-hidden flex flex-col justify-between pt-24 pb-8 select-none">
      
      {/* Background Ambient Glows & Subtle Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Warm Amber / Maroon Radial Spotlights */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4A1620]/25 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 w-[650px] h-[650px] bg-[#D9A441]/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#B85C38]/12 rounded-full blur-[150px]" />
        {/* Film grain subtle overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(14,11,10,0.85)_100%)]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Editorial Typography & Value Proposition
              Inspired by Velara Studio design with rich UDAAN heritage
              ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6">
            
            {/* Top Category Badge */}
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] text-[#D9A441] uppercase">
              <span className="text-[#D9A441]/70">(UDAAN CHRONICLES • 2022 — 2026)</span>
            </div>

            {/* Oversized Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.25rem] font-normal leading-[1.04] tracking-tight text-[#FFFAF2]">
              Every moment<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFAF2] via-[#F5D89D] to-[#D9A441] italic font-normal">
                became a memory
              </span><br />
              that built Udaan.
            </h1>

            {/* Editorial Body Copy */}
            <p className="text-sm sm:text-base font-sans text-[#FFFAF2]/70 font-light leading-relaxed max-w-lg">
              A living visual archive of women who built brands. Step inside four landmark exhibitions, 120+ ateliers, master craftsmanship, and the festive spirit that transformed Patna’s luxury landscape.
            </p>

            {/* Action Buttons & Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onExploreTimeline}
                className="group inline-flex items-center space-x-2 text-sm font-sans tracking-wide text-[#FFFAF2] border-b border-[#D9A441]/70 pb-1 hover:text-[#D9A441] hover:border-[#D9A441] transition-all cursor-pointer"
              >
                <span className="font-medium">Explore Chapters</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#D9A441]" />
              </button>

              <button
                onClick={onExploreWall}
                className="group inline-flex items-center space-x-1.5 text-xs font-sans tracking-widest uppercase text-[#FFFAF2]/60 hover:text-[#FFFAF2] transition-colors cursor-pointer"
              >
                <span>The Photo Wall</span>
                <ArrowUpRight size={13} className="text-[#D9A441]/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <Link
                to="/book-a-stall"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#4A1620]/80 hover:bg-[#4A1620] border border-[#D9A441]/40 text-xs font-sans text-[#FFE8B3] tracking-wider uppercase transition-all shadow-lg hover:shadow-[#D9A441]/10"
              >
                <UdaanDiamond size={11} className="text-[#D9A441]" />
                <span>Exhibit in 2026</span>
              </Link>
            </div>

            {/* Live Milestones Metrics Grid */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-[#FFFAF2]">04</span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-[#D9A441]/80">Editions</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-[#FFFAF2]">120+</span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-[#D9A441]/80">Founders</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-[#FFFAF2]">18K+</span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-[#D9A441]/80">Patrons</span>
              </div>
            </div>

          </div>


          {/* ========================================================
              RIGHT COLUMN: 3D ROTATING CYLINDRICAL CAROUSEL
              Matches Velara 3D perspective orbital cylinder
              ======================================================== */}
          <div 
            className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsDragging(false);
            }}
          >
            {/* 3D Viewport with Perspective */}
            <div 
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              style={{
                perspective: isMobile ? '800px' : '1200px',
                perspectiveOrigin: '50% 50%',
              }}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            >

              {/* 3D Rotating Ring Cylinder */}
              <div 
                className="relative w-0 h-0 flex items-center justify-center transition-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotationAngle}deg) rotateX(-5deg)`,
                }}
              >
                {ARCHIVE_HERO_CARDS.map((card, idx) => {
                  const cardAngle = idx * anglePerCard;
                  const isCurrentFront = idx === activeCardIndex;

                  return (
                    <div
                      key={card.id}
                      onClick={() => rotateToCard(idx)}
                      className={`absolute select-none cursor-pointer rounded-2xl md:rounded-[22px] overflow-hidden border transition-all duration-300 group ${
                        isCurrentFront 
                          ? 'border-[#D9A441] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(217,164,65,0.35)] scale-105' 
                          : 'border-white/15 hover:border-white/40 shadow-[0_16px_40px_rgba(0,0,0,0.7)] hover:scale-[1.02]'
                      }`}
                      style={{
                        width: isMobile ? '160px' : '220px',
                        height: isMobile ? '230px' : '310px',
                        left: isMobile ? '-80px' : '-110px',
                        top: isMobile ? '-115px' : '-155px',
                        transform: `rotateY(${cardAngle}deg) translateZ(${carouselRadius}px)`,
                        backfaceVisibility: 'visible',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Image background */}
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover pointer-events-none filter saturate-[1.1] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                      />

                      {/* Subtle Dark Vignette & Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B0A]/95 via-[#0E0B0A]/35 to-transparent pointer-events-none" />

                      {/* Top Pill Badge */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider bg-black/60 backdrop-blur-md text-[#FFFAF2]/90 border border-white/10 uppercase">
                          {card.badge}
                        </span>
                        {isCurrentFront && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9A441] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9A441]"></span>
                          </span>
                        )}
                      </div>

                      {/* Bottom Editorial Caption */}
                      <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                        <p className="text-[10px] font-mono tracking-widest text-[#D9A441] uppercase">
                          {card.edition}
                        </p>
                        <h3 className="font-serif text-sm md:text-base font-medium text-[#FFFAF2] leading-tight line-clamp-1">
                          {card.title}
                        </h3>
                        <p className="text-[10px] font-sans text-white/70 line-clamp-1 pt-0.5 font-light">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* Hover / Expand Overlay Hint */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-3 py-1.5 rounded-full bg-[#0E0B0A]/85 border border-[#D9A441]/60 text-[10px] font-sans uppercase tracking-widest text-[#FFE8B3] flex items-center space-x-1.5 shadow-xl">
                          <Maximize2 size={11} className="text-[#D9A441]" />
                          <span>Inspect Moment</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>


              {/* ========================================================
                  CENTER FLOATING FROSTED GLASS FOCUS CARD
                  Matches the center card in the VELARA reference image
                  ======================================================== */}
              <div 
                className="absolute z-20 pointer-events-auto max-w-[280px] sm:max-w-[320px] p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#140F0D]/80 backdrop-blur-xl border border-[#D9A441]/35 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(217,164,65,0.15)] text-center flex flex-col items-center space-y-3 transition-all duration-300 hover:border-[#D9A441]/60"
              >
                {/* Center Badge Icon */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A1620] to-[#2B1B17] border border-[#D9A441]/50 flex items-center justify-center text-[#D9A441] shadow-inner">
                  <Sparkles size={16} className="text-[#D9A441]" />
                </div>

                {/* Subtitle */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#D9A441] uppercase block">
                    UDAAN 3D ARCHIVE VAULT
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-normal text-[#FFFAF2] leading-snug line-clamp-1">
                    {currentFrontCard.title}
                  </h4>
                  <p className="text-[11px] font-sans text-[#FFFAF2]/70 font-light line-clamp-2 pt-1 leading-relaxed">
                    {currentFrontCard.caption}
                  </p>
                </div>

                {/* Interactive Controls Bar: Prev, Play/Pause, Next */}
                <div className="flex items-center justify-center space-x-2 pt-1 w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      rotatePrev();
                    }}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-[#D9A441] transition-all cursor-pointer"
                    title="Previous Card"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoSpinning(!isAutoSpinning);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#4A1620]/90 hover:bg-[#4A1620] border border-[#D9A441]/50 text-xs font-mono uppercase tracking-wider text-[#FFE8B3] flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                    title={isAutoSpinning ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
                  >
                    {isAutoSpinning ? (
                      <>
                        <Pause size={12} className="text-[#D9A441]" />
                        <span>Spinning</span>
                      </>
                    ) : (
                      <>
                        <Play size={12} className="text-[#D9A441]" />
                        <span>Paused</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      rotateNext();
                    }}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-[#D9A441] transition-all cursor-pointer"
                    title="Next Card"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Touch/Drag hint */}
                <span className="text-[9px] font-sans tracking-widest text-[#FFFAF2]/40 uppercase pt-1">
                  Drag or swipe to rotate 3D ring
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>


      {/* ========================================================
          BOTTOM FOOTER BAR: Editorial Metadata
          Matches the bottom copyright & location info in the screenshot
          ======================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono tracking-wider text-[#FFFAF2]/50 gap-4">
        <div>
          <span>© 2022–2026 UDAAN Living Archive</span>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-center text-[#FFFAF2]/60">
          <span>Hotel Maurya (2022)</span>
          <span className="text-[#D9A441]">•</span>
          <span>Lemon Tree Premier (2023)</span>
          <span className="text-[#D9A441]">•</span>
          <span>Tangerine Grand (2024)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Link to="/book-a-stall" className="hover:text-[#D9A441] transition-colors">
            Diwali Edition 5 • October 2026
          </Link>
        </div>
      </div>

    </section>
  );
}
