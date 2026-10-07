import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Maximize2
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
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const lastPointerX = useRef(0);
  const velocityRef = useRef(0.22);
  const animFrameRef = useRef(null);
  const currentAngleRef = useRef(0);
  const lastActiveIndexRef = useRef(0);

  const totalCards = ARCHIVE_HERO_CARDS.length;
  const anglePerCard = 360 / totalCards;

  // Responsive radius detection
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallPhone = screenWidth < 400;
  const carouselRadius = isMobile ? (isSmallPhone ? 170 : 205) : 320;
  const cardWidth = isMobile ? (isSmallPhone ? 142 : 162) : 220;
  const cardHeight = isMobile ? (isSmallPhone ? 205 : 232) : 310;
  const cardHalfW = cardWidth / 2;
  const cardHalfH = cardHeight / 2;

  // Compute active front card based on current angle
  const computeActiveIndex = useCallback((angle) => {
    const normalized = ((-angle % 360) + 360) % 360;
    const closestIdx = Math.round(normalized / anglePerCard) % totalCards;
    return closestIdx;
  }, [anglePerCard, totalCards]);

  // Ultra-smooth 60FPS continuous rotation loop with direct DOM transform & zero state-flicker
  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (timestamp) => {
      const delta = Math.min(32, timestamp - lastTimestamp);
      lastTimestamp = timestamp;

      if (!isDragging) {
        if (isAutoSpinning && !isHovered) {
          // Normal auto-rotation speed (smoothened)
          currentAngleRef.current += 0.18 * (delta / 16.6);
        } else if (Math.abs(velocityRef.current) > 0.01) {
          // Coasting inertia after release
          currentAngleRef.current += velocityRef.current;
          velocityRef.current *= 0.95; // smooth friction
        }

        // Apply direct transform to avoid React re-rendering all cards 60 times a second
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(0,0,0) rotateX(-5deg) rotateY(${currentAngleRef.current}deg)`;
        }

        // Only trigger state update when active card actually changes
        const newActiveIdx = computeActiveIndex(currentAngleRef.current);
        if (newActiveIdx !== lastActiveIndexRef.current) {
          lastActiveIndexRef.current = newActiveIdx;
          setActiveCardIndex(newActiveIdx);
        }
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

    const dragSensitivity = isMobile ? 0.35 : 0.28;
    currentAngleRef.current += deltaX * dragSensitivity;
    velocityRef.current = deltaX * dragSensitivity;

    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(0,0,0) rotateX(-5deg) rotateY(${currentAngleRef.current}deg)`;
    }

    const newActiveIdx = computeActiveIndex(currentAngleRef.current);
    if (newActiveIdx !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = newActiveIdx;
      setActiveCardIndex(newActiveIdx);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Step rotation controls
  const rotateNext = () => {
    const target = Math.round((currentAngleRef.current - anglePerCard) / anglePerCard) * anglePerCard;
    currentAngleRef.current = target;
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(0,0,0) rotateX(-5deg) rotateY(${target}deg)`;
    }
    const newIdx = computeActiveIndex(target);
    lastActiveIndexRef.current = newIdx;
    setActiveCardIndex(newIdx);
  };

  const rotatePrev = () => {
    const target = Math.round((currentAngleRef.current + anglePerCard) / anglePerCard) * anglePerCard;
    currentAngleRef.current = target;
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(0,0,0) rotateX(-5deg) rotateY(${target}deg)`;
    }
    const newIdx = computeActiveIndex(target);
    lastActiveIndexRef.current = newIdx;
    setActiveCardIndex(newIdx);
  };

  const rotateToCard = (index) => {
    const target = -index * anglePerCard;
    currentAngleRef.current = target;
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(0,0,0) rotateX(-5deg) rotateY(${target}deg)`;
    }
    lastActiveIndexRef.current = index;
    setActiveCardIndex(index);
    if (onInspectCard) {
      onInspectCard(index);
    }
  };

  const currentFrontCard = ARCHIVE_HERO_CARDS[activeCardIndex] || ARCHIVE_HERO_CARDS[0];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#FAF4EB] text-[#2A1C24] overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-8 select-none">
      
      {/* Background Ambient Glows & Subtle Warm Gradients matching website theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B96535]/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 w-[650px] h-[650px] bg-[#D9A441]/12 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#4A1620]/6 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(250,244,235,0.8)_100%)]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 my-auto py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Editorial Typography & Value Proposition
              ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6">
            
            {/* Top Category Badge */}
            <div className="inline-flex items-center space-x-2 text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase">
              <UdaanDiamond size={10} className="text-[#B96535]" />
              <span>UDAAN CHRONICLES • 2022 — 2026</span>
            </div>

            {/* Oversized Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.25rem] font-normal leading-[1.04] tracking-tight text-[#2A1C24]">
              Every moment<br />
              <span className="italic font-normal text-shimmer-maroon">
                became a memory
              </span><br />
              that built Udaan.
            </h1>

            {/* Editorial Body Copy */}
            <p className="text-sm sm:text-base font-sans text-[#5E4A55] font-light leading-relaxed max-w-lg">
              A living visual archive of women who built brands. Step inside four landmark exhibitions, 120+ ateliers, master craftsmanship, and the festive spirit that transformed Patna’s luxury landscape.
            </p>

            {/* Action Buttons & Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onExploreTimeline}
                className="group inline-flex items-center space-x-2 text-sm font-sans tracking-wide text-[#2A1C24] border-b border-[#B96535]/70 pb-1 hover:text-[#B96535] hover:border-[#B96535] transition-all cursor-pointer font-medium"
              >
                <span>Explore Chapters</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#B96535]" />
              </button>

              <button
                onClick={onExploreWall}
                className="group inline-flex items-center space-x-1.5 text-xs font-sans tracking-widest uppercase text-[#5E4A55] hover:text-[#2A1C24] transition-colors cursor-pointer"
              >
                <span>The Photo Wall</span>
                <ArrowUpRight size={13} className="text-[#B96535] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <Link
                to="/book-a-stall"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#4A1620] hover:bg-[#641F2C] border border-[#D9A441]/40 text-xs font-sans text-[#FFE8B3] tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
              >
                <UdaanDiamond size={11} className="text-[#D9A441]" />
                <span>Exhibit in 2026</span>
              </Link>
            </div>

            {/* Live Milestones Metrics Grid */}
            <div className="pt-6 border-t border-[#E9AD83]/30 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-[#2A1C24]">04</span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-[#B96535]">Editions</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-[#2A1C24]">120+</span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-[#B96535]">Founders</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-medium text-[#2A1C24]">18K+</span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-[#B96535]">Patrons</span>
              </div>
            </div>

          </div>


          {/* ========================================================
              RIGHT COLUMN: 3D ROTATING CYLINDRICAL CAROUSEL
              ======================================================== */}
          <div 
            className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[500px] sm:min-h-[560px] lg:min-h-[620px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsDragging(false);
            }}
          >
            {/* 3D Viewport with Perspective */}
            <div 
              ref={containerRef}
              className="relative w-full h-[360px] sm:h-[410px] lg:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
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
                ref={ringRef}
                className="relative w-0 h-0 flex items-center justify-center pointer-events-auto"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translate3d(0,0,0) rotateX(-5deg) rotateY(0deg)`,
                  willChange: 'transform',
                }}
              >
                {ARCHIVE_HERO_CARDS.map((card, idx) => {
                  const cardAngle = idx * anglePerCard;
                  const isCurrentFront = idx === activeCardIndex;

                  return (
                    <div
                      key={card.id}
                      onClick={() => rotateToCard(idx)}
                      className={`absolute select-none cursor-pointer rounded-2xl md:rounded-[22px] overflow-hidden border group transition-[border-color,box-shadow,opacity] duration-300 ${
                        isCurrentFront 
                          ? 'border-[#B96535] shadow-[0_20px_50px_rgba(74,22,32,0.25),0_0_25px_rgba(217,164,65,0.3)] opacity-100 z-10 ring-2 ring-[#D9A441]/40' 
                          : 'border-[#E9AD83]/40 hover:border-[#B96535]/60 shadow-[0_12px_32px_rgba(0,0,0,0.12)] opacity-80 hover:opacity-100'
                      }`}
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                        left: `-${cardHalfW}px`,
                        top: `-${cardHalfH}px`,
                        transform: `rotateY(${cardAngle}deg) translateZ(${carouselRadius}px) translate3d(0,0,0)`,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1C24]/90 via-[#2A1C24]/30 to-transparent pointer-events-none" />

                      {/* Top Pill Badge */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold tracking-wider bg-black/60 backdrop-blur-md text-[#FFFBF5] border border-white/10 uppercase">
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
                        <p className="text-[10px] font-sans font-semibold tracking-widest text-[#D9A441] uppercase">
                          {card.edition}
                        </p>
                        <h3 className="font-serif text-sm md:text-base font-medium text-[#FFFBF5] leading-tight line-clamp-1">
                          {card.title}
                        </h3>
                        <p className="text-[10px] font-sans text-white/80 line-clamp-1 pt-0.5 font-light">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* Hover / Expand Overlay Hint */}
                      <div className="absolute inset-0 bg-[#2A1C24]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-3 py-1.5 rounded-full bg-[#FAF4EB] border border-[#B96535] text-[10px] font-sans uppercase tracking-widest text-[#2A1C24] font-semibold flex items-center space-x-1.5 shadow-xl">
                          <Maximize2 size={11} className="text-[#B96535]" />
                          <span>Inspect Moment</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Card Info Card (Clean, elegant, removed step/spin buttons as requested) */}
            <div 
              className="relative z-20 pointer-events-auto flex flex-col items-center space-y-2 select-none pt-4 sm:pt-6 pb-1"
            >
              <div 
                className="nav-unified-pill flex items-center gap-3 sm:gap-5 px-5 sm:px-6 py-2 rounded-full shadow-lg"
              >
                <div className="w-7 h-7 rounded-full border border-[#D9A441]/60 bg-gradient-to-br from-[#D9A441]/25 to-transparent flex items-center justify-center text-[#D9A441] shadow-[0_0_10px_rgba(217,164,65,0.3)] shrink-0">
                  <UdaanDiamond size={12} className="text-[#D9A441]" />
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#D9A441] uppercase">
                      {currentFrontCard.badge || 'UDAAN ARCHIVE'}
                    </span>
                    <span className="text-[10px] text-[#FFFAF2]/40 hidden md:inline">•</span>
                    <span className="text-[10px] font-sans text-[#FFFAF2]/70 hidden md:inline">
                      {currentFrontCard.edition}
                    </span>
                  </div>
                  <h4 className="font-serif tracking-wide text-sm sm:text-base font-bold text-[#FFFAF2] leading-tight line-clamp-1">
                    {currentFrontCard.title}
                  </h4>
                </div>
              </div>

              {/* Subdued Drag/Swipe Hint */}
              <div className="flex items-center space-x-2 text-[10px] font-sans tracking-[0.2em] text-[#5E4A55] uppercase pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B96535]" />
                <span>Drag or swipe to rotate 3D ring</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM FOOTER BAR */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-6 border-t border-[#E9AD83]/30 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans tracking-wider text-[#5E4A55] gap-4">
        <div>
          <span>© 2022–2026 UDAAN Living Archive</span>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-center text-[#5E4A55]">
          <span>Hotel Maurya (2022)</span>
          <span className="text-[#B96535]">•</span>
          <span>Lemon Tree Premier (2023)</span>
          <span className="text-[#B96535]">•</span>
          <span>Tangerine Grand (2024)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Link to="/book-a-stall" className="hover:text-[#B96535] transition-colors font-medium">
            Diwali Edition 5 • October 2026
          </Link>
        </div>
      </div>

    </section>
  );
}
