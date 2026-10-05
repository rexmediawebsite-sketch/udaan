import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Eye,
  Play,
  Pause
} from 'lucide-react';

// High-definition luxury curation matching Bespoke Jewellery & Couture Studio reference
const CURATED_SHOWCASE_ITEMS = [
  {
    id: "edition-05",
    slug: "glamour-gala-diwali-edition-5",
    title: "Glamour Gala Edition 5",
    edition: "Diwali Edition 5",
    statusLabel: "STALLS 70% ALLOTTED",
    badgeBg: "bg-[#D9A441] text-[#2B1B17]",
    year: "2026",
    dates: "24 & 25 OCT 2026",
    venue: "Lemon Tree Premier, Patna",
    tagline: "Bihar's Peak Diwali 5-Star Luxury Showcase",
    // Solitaire diamond & rose gold ring on dark velvet (Exact match to center card in reference)
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "edition-04",
    slug: "glamour-gala-diwali-edition-5",
    title: "Royal Heritage Polki",
    edition: "Edition 04",
    statusLabel: "COMPLETED ARCHIVE",
    badgeBg: "bg-[#4A1620] text-[#FFFAF2]",
    year: "2024",
    dates: "02 & 03 NOV 2024",
    venue: "Tangerine Grand, Patna",
    tagline: "Eastern India's Artisanal Masterpieces & Polki",
    // Gold layered gemstone crescent pendant necklace (Exact match to left card 1)
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "edition-03",
    slug: "glamour-gala-diwali-edition-5",
    title: "Bespoke Emerald Cut",
    edition: "Edition 03",
    statusLabel: "COMPLETED ARCHIVE",
    badgeBg: "bg-[#4A1620] text-[#FFFAF2]",
    year: "2023",
    dates: "21 & 22 OCT 2023",
    venue: "Lemon Tree Premier, Patna",
    tagline: "Pre-Diwali Extravaganza with 42 Curated Labels",
    // Octagon emerald crystal gold pendant (Exact match to left card 2)
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "edition-02",
    slug: "glamour-gala-diwali-edition-5",
    title: "Sapphire Drop Atelier",
    edition: "Edition 02",
    statusLabel: "COMPLETED ARCHIVE",
    badgeBg: "bg-[#4A1620] text-[#FFFAF2]",
    year: "2023",
    dates: "18 & 19 MAR 2023",
    venue: "Tangerine Grand, Patna",
    tagline: "Summer Bridal Pret & Handcrafted Silver Filigree",
    // Blue crystal heart drop earrings on white silk (Exact match to right card 1)
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "edition-01",
    slug: "glamour-gala-diwali-edition-5",
    title: "Midnight Royal Couture",
    edition: "Edition 01",
    statusLabel: "INAUGURAL ARCHIVE",
    badgeBg: "bg-[#4A1620] text-[#FFFAF2]",
    year: "2022",
    dates: "15 & 16 OCT 2022",
    venue: "Lemon Tree Premier, Patna",
    tagline: "The Inaugural Stage: 28 Pioneering Women Brands",
    // Deep midnight blue royal bespoke attire (Exact match to right card 2)
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "edition-spring",
    slug: "glamour-gala-diwali-edition-5",
    title: "Udaan Spring Soirée",
    edition: "Spring Preview",
    statusLabel: "UPCOMING 2027",
    badgeBg: "bg-[#B85C38] text-[#FFFAF2]",
    year: "2027",
    dates: "20 & 21 MAR 2027",
    venue: "Tangerine Grand, Patna",
    tagline: "Handcrafted Heritage Zardozi & Bridal Silks",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "edition-festive",
    slug: "glamour-gala-diwali-edition-5",
    title: "Patna Luxury Conclave",
    edition: "Patna Edition",
    statusLabel: "CURATED SELECTION",
    badgeBg: "bg-[#D9A441] text-[#2B1B17]",
    year: "2025",
    dates: "12 & 13 DEC 2025",
    venue: "Lemon Tree Premier, Patna",
    tagline: "Fine Polki Chokers & Festive Heritage Lifestyle",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85",
  }
];

export default function EventPosterGallery({ onOpenBooking }) {
  const navigate = useNavigate();
  const [slideOffset, setSlideOffset] = useState(0); // continuous float offset for silky smooth continuous sliding
  const [isAutoMoving, setIsAutoMoving] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartOffset, setDragStartOffset] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1 = normal, 1.5 = faster

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const isPointerDownRef = useRef(false);

  const totalItems = CURATED_SHOWCASE_ITEMS.length;

  // 60FPS ALWAYS-MOVING CONTINUOUS SLIDE ACROSS SCREEN
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      // Always continuously slide from left to right unless actively dragging
      if (isAutoMoving && !isDragging) {
        // ~1 card every 3.2 seconds at 1x speed
        const speed = 0.00065 * speedMultiplier;
        setSlideOffset((prev) => (prev + speed * dt) % totalItems);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoMoving, isDragging, speedMultiplier, totalItems]);

  // Pointer drag gesture handlers for touch & mouse
  const handlePointerDown = (clientX) => {
    setIsDragging(true);
    isPointerDownRef.current = true;
    setDragStartX(clientX);
    setDragStartOffset(slideOffset);
  };

  const handlePointerMove = (clientX) => {
    if (!isPointerDownRef.current) return;
    const deltaX = clientX - dragStartX;
    // Map drag pixels to fractional item shift
    const offsetDelta = deltaX / 200;
    setSlideOffset((dragStartOffset + offsetDelta + totalItems * 10) % totalItems);
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);
    // Continue moving immediately without stopping!
  };

  // Step Previous / Next (Slides one whole card)
  const handleStep = (direction) => {
    setSlideOffset((prev) => {
      const base = Math.round(prev);
      return direction === 'next' ? (base + 1) % totalItems : (base - 1 + totalItems) % totalItems;
    });
  };

  // Card click: navigate to event page
  const handleCardClick = (displayIndex, e) => {
    e.stopPropagation();
    navigate(`/events/${CURATED_SHOWCASE_ITEMS[displayIndex].slug}`);
  };

  // Calculate currently active center card item
  const rawCenterIndex = (Math.round(-slideOffset) % totalItems + totalItems) % totalItems;
  const activeEvent = CURATED_SHOWCASE_ITEMS[rawCenterIndex] || CURATED_SHOWCASE_ITEMS[0];

  return (
    <section
      id="poster-gallery"
      className="relative py-20 md:py-28 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden border-t border-[#D9A441]/25 select-none"
      aria-label="3D Curved Sliding Jewellery and Couture Showcase"
    >
      {/* Subtle Warm Amber / Gold Radial Lighting Behind the Stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[580px] bg-gradient-to-r from-[#D9A441]/15 via-[#B85C38]/12 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B8801F] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#D9A441]" />
              <span>CONTINUOUS 3D CURVED MOTION</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#4A1620] tracking-[0.02em] leading-[1.12]">
              An Archive of <span className="italic font-light text-[#B85C38]">Celebrations</span>
            </h2>

            <p className="mt-3 text-[#2B1B17]/80 text-sm sm:text-base font-sans font-light leading-relaxed max-w-xl">
              Flowing continuously across the screen from left to right. Drag or swipe horizontally to accelerate, or click any edition to inspect.
            </p>
          </div>

          {/* Sliding Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.6 : 1))}
              className="px-3.5 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] text-xs font-semibold text-[#4A1620] hover:text-[#B8801F] shadow-sm transition-all"
            >
              Speed: {speedMultiplier}x
            </button>

            <button
              onClick={() => setIsAutoMoving((prev) => !prev)}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] text-xs font-semibold text-[#4A1620] hover:text-[#B8801F] shadow-sm transition-all"
              title={isAutoMoving ? "Pause Motion" : "Resume Motion"}
            >
              {isAutoMoving ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Pause size={12} className="text-[#B8801F]" />
                  <span className="text-[10px] tracking-wider uppercase font-medium">Moving</span>
                </>
              ) : (
                <>
                  <Play size={12} className="text-[#B8801F]" />
                  <span className="text-[10px] tracking-wider uppercase font-medium">Paused</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            3D CURVED CAROUSEL (EXACT MATCH TO REFERENCE SCREENSHOT)
            Continuous 60fps movement across screen, tight horizontal overlapping arc
            ========================================================================= */}
        <div
          ref={containerRef}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => {
            if (isDragging) handlePointerMove(e.clientX);
          }}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[470px] sm:h-[530px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible select-none"
          style={{ perspective: '1200px', perspectiveOrigin: 'center 50%' }}
        >
          {/* Card Arc Track */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {CURATED_SHOWCASE_ITEMS.map((item, idx) => {
              // Calculate continuous offset position relative to current slide
              const rawOffset = ((idx + slideOffset) % totalItems + totalItems) % totalItems;
              // Center the offset around 0 (-3.5 to +3.5)
              const offset = rawOffset > totalItems / 2 ? rawOffset - totalItems : rawOffset;
              const absOffset = Math.abs(offset);

              // Render cards within visible arc (-3.3 to +3.3)
              if (absOffset > 3.4) return null;

              // Exact overlap arc geometry matching reference screenshot:
              const stepX = window.innerWidth < 640 ? 140 : 185;
              const x = offset * stepX;
              // Center card sits at z=0, side cards curve backward progressively
              const z = -absOffset * 55 - (absOffset > 1.2 ? 30 : 0);
              // Cards rotate inward facing the viewer
              const rotateY = -offset * 15;
              // Scaling: Center card is 1.04, side cards taper gracefully
              const scale = Math.max(0.72, 1.04 - absOffset * 0.08);
              // Opacity: high visibility across all front cards
              const opacity = Math.max(0.45, 1 - absOffset * 0.16);
              // Higher z-index for cards closer to center so overlap is perfect
              const zIndex = Math.round(50 - absOffset * 10);
              const isCenter = absOffset < 0.45;

              return (
                <div
                  key={item.id}
                  onClick={(e) => handleCardClick(idx, e)}
                  style={{
                    transform: `translate3d(${x}px, ${isCenter ? -8 : absOffset * 4}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                  }}
                  className={`absolute w-56 sm:w-64 md:w-[275px] h-[375px] sm:h-[430px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-100 group cursor-pointer ${
                    isCenter
                      ? 'shadow-[0_30px_70px_-10px_rgba(43,27,23,0.55),0_0_35px_rgba(217,164,65,0.4)] border-2 border-[#D9A441]'
                      : 'border border-white/20 hover:border-[#D9A441]/80 shadow-[0_20px_45px_-8px_rgba(43,27,23,0.35)]'
                  }`}
                >
                  {/* Ultra-High-Definition Full-Bleed Photograph */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    draggable={false}
                  />

                  {/* Surface Glass Glare Sheen Reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                  />

                  {/* EXACT REFERENCE BADGE: Circular hand tap icon + "DRAG TO ROTATE" capsule pill on center card */}
                  {isCenter && (
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 pointer-events-none z-30 animate-fadeIn">
                      {/* Circular White Icon Badge with Dark Tap/Drag Hand */}
                      <div className="w-12 h-12 rounded-full bg-white text-[#2B1B17] flex items-center justify-center shadow-2xl mb-2 border border-[#D9A441]/40">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.5 5.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v7.25c-.48-.22-1.07-.35-1.75-.35-1.79 0-3.25 1.46-3.25 3.25 0 2.21 1.79 4 4 4h4.5c2.48 0 4.5-2.02 4.5-4.5V11c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1h-1V7.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v4.5h-1V5.5z"/>
                        </svg>
                      </div>

                      {/* Capsule White Pill: "DRAG TO ROTATE" */}
                      <div className="px-4 py-1.5 rounded-full bg-white text-[#2B1B17] text-[10px] font-sans font-bold tracking-[0.22em] uppercase shadow-2xl border border-[#D9A441]/40">
                        DRAG TO ROTATE
                      </div>
                    </div>
                  )}

                  {/* Subtle Bottom Gradient Details (reveals cleanly on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] tracking-[0.22em] font-sans uppercase text-[#D9A441] font-semibold block">
                      {item.edition}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FFFAF2] leading-tight font-normal">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#FFFAF2]/80 font-sans line-clamp-1 mt-0.5">
                      {item.tagline}
                    </p>
                    <div className="mt-2 text-[10px] text-[#D9A441] font-semibold uppercase tracking-wider flex items-center justify-between">
                      <span>View Edition Details</span>
                      <ArrowRight size={12} className="animate-pulse" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={() => handleStep('prev')}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#FFFAF2]/95 border border-[#D9A441]/40 text-[#4A1620] flex items-center justify-center hover:bg-[#4A1620] hover:text-[#FFFAF2] hover:border-[#D9A441] shadow-xl transition-all"
            aria-label="Previous Showcase Item"
            data-cursor="Prev"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleStep('next')}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#FFFAF2]/95 border border-[#D9A441]/40 text-[#4A1620] flex items-center justify-center hover:bg-[#4A1620] hover:text-[#FFFAF2] hover:border-[#D9A441] shadow-xl transition-all"
            aria-label="Next Showcase Item"
            data-cursor="Next"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Bottom Directional Guide matching Bespoke Studio */}
        <div className="text-center text-[10px] sm:text-xs font-sans font-semibold tracking-[0.25em] text-[#66534E] uppercase mt-4 mb-8 select-none">
          ← CONTINUOUS MOTION • DRAG HORIZONTALLY OR CLICK TO ROTATE →
        </div>

        {/* Active Poster Context Strip */}
        {activeEvent && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFAF2] border border-[#D9A441]/35 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#B85C38] uppercase">
                  {activeEvent.edition} • Verified Exhibition
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#FBF4EA] border border-[#D9A441]/30 text-[10px] font-semibold text-[#4A1620]">
                  {activeEvent.venue}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#4A1620]">
                {activeEvent.title}{' '}
                <span className="italic font-light text-[#B85C38]">({activeEvent.edition})</span>
              </h3>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#2B1B17]/80 font-sans pt-1">
                <div className="flex items-center space-x-1.5">
                  <Calendar size={14} className="text-[#D9A441]" />
                  <span className="font-medium text-[#2B1B17]">{activeEvent.dates}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock size={14} className="text-[#D9A441]" />
                  <span>11:00 AM – 9:00 PM IST</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin size={14} className="text-[#D9A441]" />
                  <span>Tangerine Grand Exhibition Hall</span>
                </div>
              </div>
            </div>

            {/* Actions for currently focused poster */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to={`/events/${activeEvent.slug}`}
                className="btn-gold-luxury px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2B1B17] shadow-md flex items-center space-x-2"
              >
                <span>View Dedicated Exhibition Page</span>
                <ArrowRight size={13} />
              </Link>

              <button
                onClick={() => onOpenBooking(activeEvent.title)}
                className="btn-maroon-luxury px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
              >
                Book a Stall
              </button>

              <Link
                to="/gallery"
                className="px-6 py-3 rounded-full border border-[#D9A441]/40 text-[#4A1620] hover:bg-[#FBF4EA] text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5 transition-colors"
              >
                <Eye size={13} />
                <span>View Archival Gallery</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
