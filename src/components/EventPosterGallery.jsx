import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Sparkles } from 'lucide-react';
import { EVENTS_CATALOG } from '../data/eventsCatalog';

export default function EventPosterGallery({ onOpenBooking, initialFilter = 'ALL' }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(initialFilter); // 'ALL' | 'UPCOMING' | 'PAST'
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Filtered dataset
  const filteredEvents = EVENTS_CATALOG.filter((ev) => {
    if (filter === 'UPCOMING') return ev.status === 'current' || ev.status === 'upcoming';
    if (filter === 'PAST') return ev.status === 'past';
    return true;
  });

  // Triple set for seamless infinite loop buffer
  const items = [...filteredEvents, ...filteredEvents, ...filteredEvents];
  const totalBaseCount = filteredEvents.length;

  const CARD_WIDTH = 340;
  const CARD_GAP = 32;
  const ITEM_STRIDE = CARD_WIDTH + CARD_GAP;
  const TOTAL_CYCLE_WIDTH = totalBaseCount * ITEM_STRIDE;

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Motion engine refs
  const offsetRef = useRef(0);
  const targetSpeedRef = useRef(40); // 40px/sec base speed
  const currentSpeedRef = useRef(40);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragXRef = useRef(0);
  const isVisibleRef = useRef(true);
  const resumeTimeoutRef = useRef(null);

  // Prefers-reduced-motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const prm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(prm);
    if (prm) {
      targetSpeedRef.current = 0;
      currentSpeedRef.current = 0;
      setIsPlaying(false);
    }
  }, []);

  // IntersectionObserver to pause loop when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const onVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  // Main 60-144Hz Delta-Time Ticker Loop
  useEffect(() => {
    let lastTime = performance.now();
    let rafId;

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // in seconds
      lastTime = now;

      if (isVisibleRef.current && !prefersReducedMotion) {
        // Ease current speed towards target speed (smooth 400ms hover deceleration / 600ms resume)
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * (dt * 4);

        if (!isDraggingRef.current) {
          // Continuous left to right movement (increasing offset)
          offsetRef.current += currentSpeedRef.current * dt;

          // Seamless loop wrap
          if (TOTAL_CYCLE_WIDTH > 0) {
            if (offsetRef.current >= TOTAL_CYCLE_WIDTH) {
              offsetRef.current -= TOTAL_CYCLE_WIDTH;
            } else if (offsetRef.current < 0) {
              offsetRef.current += TOTAL_CYCLE_WIDTH;
            }
          }
        }
      }

      // Apply transforms to all rendered card nodes
      if (trackRef.current && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth || 1440;
        const centerX = containerWidth / 2;
        const cards = trackRef.current.children;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          // Base position of this card along the infinite track
          const basePos = i * ITEM_STRIDE + offsetRef.current;
          // Calculate distance from center, wrapping within total span
          let dist = ((basePos % (items.length * ITEM_STRIDE)) - centerX);
          if (dist > (items.length * ITEM_STRIDE) / 2) {
            dist -= items.length * ITEM_STRIDE;
          } else if (dist < -(items.length * ITEM_STRIDE) / 2) {
            dist += items.length * ITEM_STRIDE;
          }

          // Exact mathematical transform prescribed by design director
          const absDist = Math.abs(dist);
          const rotateY = Math.max(-28, Math.min(28, dist / 12));
          const translateZ = -absDist * 0.35;
          const scale = 1 - Math.min(absDist / 1800, 0.22);
          const opacity = Math.max(0.75, 1 - Math.min(absDist / 2200, 0.25));

          const isCardHovered = card.getAttribute('data-card-id') === hoveredCardId;
          const hoverLift = isCardHovered ? -12 : 0;
          const hoverScale = isCardHovered ? 1.05 : 1;

          card.style.transform = `translate3d(${dist}px, ${hoverLift}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale * hoverScale})`;
          card.style.opacity = opacity.toString();
          card.style.zIndex = Math.round(1000 - absDist);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [items.length, ITEM_STRIDE, TOTAL_CYCLE_WIDTH, hoveredCardId, prefersReducedMotion]);

  // Hover Interaction: Smoothly ease speed down to 0 over 400ms, lift card
  const handleCardMouseEnter = (id) => {
    setHoveredCardId(id);
    if (!prefersReducedMotion && isPlaying) {
      targetSpeedRef.current = 0;
    }
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleCardMouseLeave = () => {
    setHoveredCardId(null);
    if (!prefersReducedMotion && isPlaying) {
      targetSpeedRef.current = 40;
    }
  };

  // Drag Interaction with Inertia
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
    targetSpeedRef.current = 0;
    currentSpeedRef.current = 0;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const currentTime = performance.now();
    const deltaX = currentX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + deltaX;

    const timeDelta = currentTime - lastDragTimeRef.current;
    if (timeDelta > 0) {
      dragVelocityRef.current = (currentX - lastDragXRef.current) / (timeDelta / 1000);
    }
    lastDragXRef.current = currentX;
    lastDragTimeRef.current = currentTime;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Apply inertia and resume auto-slide after 1.5s
    resumeTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !prefersReducedMotion) {
        targetSpeedRef.current = 40;
      }
    }, 1500);
  };

  // Arrow navigation: Nudge by one card with smooth ease
  const nudge = (direction) => {
    targetSpeedRef.current = 0;
    currentSpeedRef.current = 0;
    offsetRef.current += direction * ITEM_STRIDE;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !prefersReducedMotion) {
        targetSpeedRef.current = 40;
      }
    }, 1200);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') nudge(1);
    if (e.key === 'ArrowRight') nudge(-1);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      targetSpeedRef.current = 0;
      currentSpeedRef.current = 0;
      setIsPlaying(false);
    } else {
      targetSpeedRef.current = 40;
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="archive-carousel"
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-cursor="Drag"
      className="relative w-full py-24 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden focus:outline-none select-none"
    >
      {/* Editorial Section Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFAF2] border border-[#D9A441]/40 text-[#B8801F] text-xs font-semibold uppercase tracking-[0.08em] shadow-sm">
            <Sparkles size={13} className="text-[#D9A441]" />
            <span>Interactive 3D Edition Showcase</span>
          </div>
          <h2 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl text-[#4A1620] tracking-tight leading-tight">
            An Archive of Celebrations
          </h2>
          <p className="font-sans text-base text-[#2B1B17]/75 max-w-xl leading-relaxed">
            Continuous 3D perspective gallery. Discover past triumphs, milestone galas, and upcoming editions celebrating Bihar's premier women entrepreneurs.
          </p>
        </div>

        {/* Filter Tabs & Auto-Slide Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Pills */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#FFFAF2] border border-[#D9A441]/30 shadow-sm">
            {['ALL', 'UPCOMING', 'PAST'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-cursor="Filter"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? 'bg-[#4A1620] text-[#FFFAF2] shadow-sm'
                    : 'text-[#2B1B17]/70 hover:text-[#4A1620]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Play / Pause Toggle */}
          <button
            onClick={togglePlayPause}
            data-cursor="Toggle"
            aria-label={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
            className="w-9 h-9 rounded-full bg-[#FFFAF2] border border-[#D9A441]/40 text-[#4A1620] hover:border-[#D9A441] flex items-center justify-center transition-all shadow-sm"
            title={isPlaying ? 'Pause Carousel' : 'Auto-Slide Carousel'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          {/* Step Nudge Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => nudge(1)}
              data-cursor="Prev"
              aria-label="Previous edition"
              className="w-9 h-9 rounded-full bg-[#FFFAF2] border border-[#D9A441]/40 text-[#4A1620] hover:bg-[#4A1620] hover:text-[#FFFAF2] transition-all flex items-center justify-center shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => nudge(-1)}
              data-cursor="Next"
              aria-label="Next edition"
              className="w-9 h-9 rounded-full bg-[#FFFAF2] border border-[#D9A441]/40 text-[#4A1620] hover:bg-[#4A1620] hover:text-[#FFFAF2] transition-all flex items-center justify-center shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Curved Perspective Stage (1400px Perspective + Mask Fade Edges) */}
      <div
        className="relative w-full h-[520px] overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1400px',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Track holding cards */}
        <div
          ref={trackRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((ev, idx) => {
            const isHovered = hoveredCardId === `${ev.id}-${idx}`;

            return (
              <div
                key={`${ev.id}-${idx}`}
                data-card-id={`${ev.id}-${idx}`}
                onMouseEnter={() => handleCardMouseEnter(`${ev.id}-${idx}`)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => navigate(ev.slug ? `/events/${ev.slug}` : `/events/glamour-gala-5`)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[460px] rounded-2xl overflow-hidden pointer-events-auto transition-shadow duration-300 cursor-pointer shadow-xl"
                style={{
                  boxShadow: isHovered
                    ? '0 0 35px 2px rgba(217, 164, 65, 0.55), 0 20px 40px rgba(43, 27, 23, 0.35)'
                    : '0 16px 36px -8px rgba(43, 27, 23, 0.25)',
                  border: isHovered
                    ? '1.5px solid #D9A441'
                    : '1px solid rgba(217, 164, 65, 0.25)',
                }}
              >
                {/* Poster Photo with Fallback */}
                <img
                  src={ev.poster || ev.heroImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"}
                  alt={ev.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    isHovered ? 'scale-105' : 'scale-100'
                  }`}
                />

                {/* Moving Light Glare Effect on Hover */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
                    }}
                  />
                )}

                {/* Transparent Top, Dark Gradient Bottom 40% only */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17] via-[#2B1B17]/70 to-transparent pointer-events-none z-10" />

                {/* Top Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase bg-[#4A1620]/90 text-[#FFFAF2] border border-[#D9A441]/40 backdrop-blur-md shadow-md">
                    {ev.edition || ev.year}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 space-y-2 flex flex-col justify-end text-left">
                  <span className="text-xs font-sans font-medium tracking-[0.12em] uppercase text-[#D9A441] block">
                    {ev.dates || ev.date}
                  </span>

                  <h3 className="font-heading font-semibold text-2xl md:text-[26px] text-[#FFFAF2] leading-snug drop-shadow-md">
                    {ev.title}
                  </h3>

                  <p className="font-sans text-sm text-[#FFFAF2]/90 line-clamp-2 leading-relaxed">
                    {ev.tagline || ev.shortDescription}
                  </p>

                  {/* "View edition →" Button sliding up on hover */}
                  <div
                    className={`pt-2 transition-all duration-300 transform ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#D9A441] tracking-wider uppercase hover:text-[#FFFAF2] transition-colors">
                      <span>View edition</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
