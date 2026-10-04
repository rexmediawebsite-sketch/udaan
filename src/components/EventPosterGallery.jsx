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
  Pause,
  ChevronUp
} from 'lucide-react';
import { EVENTS_CATALOG } from '../data/eventsCatalog';

export default function EventPosterGallery({ onOpenBooking, initialFilter = 'ALL' }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(initialFilter); // 'ALL' | 'UPCOMING' | 'PAST'
  
  // Displayed items based on filter
  const displayedEvents = EVENTS_CATALOG.filter((ev) => {
    if (filter === 'UPCOMING') return ev.status === 'current' || ev.status === 'upcoming';
    if (filter === 'PAST') return ev.status === 'past';
    return true;
  });

  const count = displayedEvents.length;
  const angleStep = 360 / Math.max(count, 1);

  // Continuous rotation angle in degrees
  const [rotation, setRotation] = useState(0);
  const [isAutoHovering, setIsAutoHovering] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartRotation, setDragStartRotation] = useState(0);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const autoResumeTimeoutRef = useRef(null);
  const isPointerDownRef = useRef(false);

  // Normalize rotation angle helper
  const normalizeAngle = (angle) => {
    let a = angle % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return a;
  };

  // Find index of the card that is currently closest to the front (angle ~ 0)
  const getActiveIndex = useCallback(() => {
    if (count === 0) return 0;
    let minDiff = 360;
    let closestIdx = 0;
    displayedEvents.forEach((_, idx) => {
      const cardAngle = normalizeAngle(idx * angleStep + rotation);
      if (Math.abs(cardAngle) < minDiff) {
        minDiff = Math.abs(cardAngle);
        closestIdx = idx;
      }
    });
    return closestIdx;
  }, [count, angleStep, rotation, displayedEvents]);

  const activeIndex = getActiveIndex();
  const activeEvent = displayedEvents[activeIndex] || displayedEvents[0];

  // 60FPS automatic hover / gliding from left to right
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      if (isAutoHovering && !isDragging) {
        // Smoothly rotate the cylinder so cards move from right to left (hover effect sweeps left to right)
        // ~12 degrees per second for a serene, luxurious pace
        setRotation((prev) => prev - (0.018 * dt));
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoHovering, isDragging]);

  // Pause auto-rotation when user interacts, then resume gracefully
  const pauseAutoTemporarily = useCallback((resumeDelay = 3500) => {
    setIsAutoHovering(false);
    if (autoResumeTimeoutRef.current) clearTimeout(autoResumeTimeoutRef.current);
    autoResumeTimeoutRef.current = setTimeout(() => {
      setIsAutoHovering(true);
    }, resumeDelay);
  }, []);

  // Mouse Drag & Touch Gesture Handlers
  const handlePointerDown = (clientX) => {
    setIsDragging(true);
    isPointerDownRef.current = true;
    setDragStartX(clientX);
    setDragStartRotation(rotation);
    setIsAutoHovering(false);
    if (autoResumeTimeoutRef.current) clearTimeout(autoResumeTimeoutRef.current);
  };

  const handlePointerMove = (clientX) => {
    if (!isPointerDownRef.current) return;
    const deltaX = clientX - dragStartX;
    // Map drag distance to rotation angle
    const angleDelta = deltaX * 0.28;
    setRotation(dragStartRotation + angleDelta);
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);
    pauseAutoTemporarily(3000);
  };

  // Hover over the track without clicking: subtly tilts/accelerates rotation left to right
  const handleMouseMoveOverTrack = (e) => {
    if (isDragging) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = (mouseX / rect.width) - 0.5; // -0.5 (left) to +0.5 (right)
    
    // Nudge the rotation towards mouse position
    pauseAutoTemporarily(2500);
    setRotation((prev) => prev - (ratio * 0.6));
  };

  // Click card to bring it front & center or open page
  const handleCardClick = (idx, e) => {
    e.stopPropagation();
    const cardAngle = normalizeAngle(idx * angleStep + rotation);
    
    if (Math.abs(cardAngle) < 16) {
      // Already front and center -> Navigate to event page
      navigate(`/events/${displayedEvents[idx].slug}`);
    } else {
      // Bring this card to center by snapping rotation
      pauseAutoTemporarily(4000);
      const targetRotation = rotation - cardAngle;
      setRotation(targetRotation);
    }
  };

  // Step Previous / Next
  const handleStep = (direction) => {
    pauseAutoTemporarily(4000);
    const step = direction === 'next' ? -angleStep : angleStep;
    setRotation((prev) => prev + step);
  };

  return (
    <section
      id="poster-gallery"
      className="relative py-20 md:py-28 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/25 select-none"
      aria-label="Interactive 3D Event Poster Cylinder Gallery"
    >
      {/* Subtle Golden-Hour Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#F6B51F]/15 via-[#E9AD83]/20 to-[#397EAC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#B96535]" />
              <span>INTERACTIVE EVENT POSTER SHOWCASE</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-[1.12]">
              An Archive of <span className="italic font-light text-[#B96535]">Celebrations</span>
            </h2>

            <p className="mt-3 text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed max-w-xl">
              Automatic 3D curved showcase. The gallery smoothly hovers left to right across editions. Drag or swipe horizontally to rotate manually.
            </p>
          </div>

          {/* Segmented Filter Switcher & Auto-Glide Status */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex p-1.5 rounded-full bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  filter === 'ALL'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                All ({EVENTS_CATALOG.length})
              </button>

              <button
                onClick={() => setFilter('UPCOMING')}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  filter === 'UPCOMING'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                Upcoming (3)
              </button>

              <button
                onClick={() => setFilter('PAST')}
                className={`px-4 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  filter === 'PAST'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                Past Archive (4)
              </button>
            </div>

            {/* Play/Pause Auto-Glide Toggle */}
            <button
              onClick={() => setIsAutoHovering((prev) => !prev)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] text-xs font-semibold text-[#6B5860] hover:text-[#2A1C24] shadow-sm transition-all"
              title={isAutoHovering ? "Pause Automatic Hover" : "Resume Automatic Hover"}
            >
              {isAutoHovering ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Pause size={12} className="text-[#B96535]" />
                  <span className="text-[10px] tracking-wider uppercase">Auto-Glide ON</span>
                </>
              ) : (
                <>
                  <Play size={12} className="text-[#B96535]" />
                  <span className="text-[10px] tracking-wider uppercase">Paused</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            3D CYLINDRICAL CURVED POSTER STAGE (Exact Match to User Screenshot)
            ========================================================================= */}
        <div
          ref={containerRef}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => {
            if (isDragging) {
              handlePointerMove(e.clientX);
            } else {
              handleMouseMoveOverTrack(e);
            }
          }}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
          style={{ perspective: '1400px', perspectiveOrigin: 'center 45%' }}
        >
          {/* Circular 3D Cylinder Arena */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {displayedEvents.map((item, idx) => {
              // Calculate angular position on cylinder
              const cardAngle = normalizeAngle(idx * angleStep + rotation);
              const absAngle = Math.abs(cardAngle);

              // Don't render cards that are on the back side of the cylinder
              if (absAngle > 96) return null;

              // Cylindrical trigonometry matching user screenshot
              const radius = window.innerWidth < 640 ? 380 : 540;
              const rad = (cardAngle * Math.PI) / 180;
              const x = radius * Math.sin(rad);
              const z = radius * Math.cos(rad) - radius; // Center card sits at z=0, side cards curve backward
              const rotateY = -cardAngle * 0.88; // Facing inward along the curve
              const scale = Math.max(0.72, 1 - (absAngle / 90) * 0.24);
              const opacity = Math.max(0.25, 1 - (absAngle / 90) * 0.72);
              const zIndex = Math.round(100 - absAngle);
              const isCenter = absAngle < 16;

              return (
                <div
                  key={item.id}
                  onClick={(e) => handleCardClick(idx, e)}
                  style={{
                    transform: `translate3d(${x}px, ${isCenter ? -14 : absAngle * 0.12}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                  }}
                  className={`absolute w-56 sm:w-64 md:w-72 aspect-[9/13.5] rounded-3xl overflow-hidden bg-[#24141F] shadow-2xl transition-all duration-150 group cursor-pointer ${
                    isCenter
                      ? 'ring-4 ring-[#E99A18] shadow-[0_30px_70px_-15px_rgba(185,101,53,0.5)] border-transparent'
                      : 'border border-[#E9AD83]/30 hover:border-[#E99A18]/60 shadow-xl'
                  }`}
                >
                  {/* Poster Image */}
                  <img
                    src={item.poster}
                    alt={`${item.title} Official Exhibition Poster`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
                    draggable={false}
                  />

                  {/* Top Status & Year Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span
                      className={`text-[9px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${item.badgeColor}`}
                    >
                      {item.statusLabel}
                    </span>

                    <span className="text-[10px] font-syne font-bold px-2.5 py-0.5 rounded-full bg-black/70 text-white/95 backdrop-blur-sm border border-white/20">
                      {item.year}
                    </span>
                  </div>

                  {/* FLOATING "DRAG TO ROTATE" BADGE ON ACTIVE CENTER CARD (From User Screenshot) */}
                  {isCenter && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 animate-fadeIn">
                      <div className="w-12 h-12 rounded-full bg-white text-[#2A1C24] flex items-center justify-center shadow-2xl mb-2.5 border border-[#E9AD83]/40">
                        {/* Finger tap / hand icon */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.5 5.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v7.25c-.48-.22-1.07-.35-1.75-.35-1.79 0-3.25 1.46-3.25 3.25 0 2.21 1.79 4 4 4h4.5c2.48 0 4.5-2.02 4.5-4.5V11c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1h-1V7.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v4.5h-1V5.5z"/>
                        </svg>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-white text-[#2A1C24] text-[10px] font-sans font-bold tracking-[0.2em] uppercase shadow-2xl border border-[#E9AD83]/30">
                        DRAG TO ROTATE
                      </div>
                    </div>
                  )}

                  {/* Gradient Fade & Bottom Poster Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E121B] via-[#1E121B]/60 to-transparent flex flex-col justify-end p-6 text-white z-10 pointer-events-none">
                    <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#F6B51F] font-semibold block">
                      {item.edition}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#E9AD83] font-sans line-clamp-1 mt-0.5">
                      {item.tagline}
                    </p>

                    <div className="flex items-center space-x-2 text-[11px] text-white/85 font-sans pt-3 mt-3 border-t border-white/15">
                      <Calendar size={13} className="text-[#F6B51F] shrink-0" />
                      <span className="truncate">{item.dates}</span>
                    </div>

                    {isCenter && (
                      <div className="mt-2 text-[10px] text-[#F6B51F] font-semibold uppercase tracking-wider flex items-center justify-between">
                        <span>Click to Open Page</span>
                        <ArrowRight size={12} className="animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={() => handleStep('prev')}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#FFFBF5]/90 border border-[#E9AD83]/40 text-[#2A1C24] flex items-center justify-center hover:bg-[#B96535] hover:text-white hover:border-[#B96535] shadow-lg transition-all"
            aria-label="Previous Poster"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleStep('next')}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#FFFBF5]/90 border border-[#E9AD83]/40 text-[#2A1C24] flex items-center justify-center hover:bg-[#B96535] hover:text-white hover:border-[#B96535] shadow-lg transition-all"
            aria-label="Next Poster"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* =========================================================================
            BOTTOM INSTRUCTION TEXT (Exact Match to User Screenshot)
            ========================================================================= */}
        <div className="text-center text-[10px] sm:text-xs font-sans font-semibold tracking-[0.25em] text-[#6B5860] uppercase mt-2 mb-8 select-none">
          ← DRAG OR SWIPE HORIZONTALLY TO CURVE &amp; ROTATE →
        </div>

        {/* =========================================================================
            ACTIVE POSTER CONTEXT STRIP & DEDICATED PAGE NAVIGATION
            ========================================================================= */}
        {activeEvent && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#B96535] uppercase">
                  {activeEvent.edition} • {activeEvent.status === 'past' ? 'Archival Edition' : 'Verified Exhibition'}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-[#FAF4EB] border border-[#E9AD83]/30 text-[10px] font-semibold text-[#5E4A55]">
                  {activeEvent.venue}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24]">
                {activeEvent.title}{' '}
                <span className="italic font-light text-[#B96535]">({activeEvent.edition})</span>
              </h3>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5E4A55] font-sans pt-1">
                <div className="flex items-center space-x-1.5">
                  <Calendar size={14} className="text-[#B96535]" />
                  <span className="font-medium text-[#2A1C24]">{activeEvent.dates}</span>
                  <span className="text-[#8C7E85]">({activeEvent.days})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock size={14} className="text-[#B96535]" />
                  <span>{activeEvent.timings}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin size={14} className="text-[#B96535]" />
                  <span>{activeEvent.hall}</span>
                </div>
              </div>
            </div>

            {/* Actions for currently focused poster */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to={`/events/${activeEvent.slug}`}
                className="btn-sunset-gold px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
              >
                <span>View Dedicated Exhibition Page</span>
                <ArrowRight size={13} />
              </Link>

              {activeEvent.bookingsOpen && (
                <button
                  onClick={() => onOpenBooking(activeEvent.title)}
                  className="btn-editorial-outline px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
                >
                  Book a Stall
                </button>
              )}

              {activeEvent.status === 'past' && (
                <Link
                  to="/gallery"
                  className="btn-editorial-outline px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5"
                >
                  <Eye size={13} />
                  <span>View Archival Gallery</span>
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
