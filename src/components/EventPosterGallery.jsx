import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Eye, CheckCircle, Clock } from 'lucide-react';
import { EVENTS_CATALOG } from '../data/eventsCatalog';

export default function EventPosterGallery({ onOpenBooking, initialFilter = 'ALL' }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(initialFilter); // 'ALL' | 'UPCOMING' | 'PAST'
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const deckContainerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Filter events based on active segment
  const displayedEvents = EVENTS_CATALOG.filter((ev) => {
    if (filter === 'UPCOMING') return ev.status === 'current' || ev.status === 'upcoming';
    if (filter === 'PAST') return ev.status === 'past';
    return true;
  });

  // Re-center active poster when filter changes
  useEffect(() => {
    const flagshipIdx = displayedEvents.findIndex((e) => e.isFlagship);
    if (flagshipIdx !== -1) {
      setActiveIndex(flagshipIdx);
    } else {
      setActiveIndex(Math.floor(displayedEvents.length / 2));
    }
  }, [filter]);

  // Handle smooth horizontal hover tracking from left to right across the deck
  const handleMouseMove = useCallback((e) => {
    if (!deckContainerRef.current || displayedEvents.length <= 1) return;
    const rect = deckContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
    const targetIdx = Math.min(
      displayedEvents.length - 1,
      Math.floor(ratio * displayedEvents.length)
    );
    if (targetIdx !== activeIndex) {
      setActiveIndex(targetIdx);
    }
  }, [displayedEvents.length, activeIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> Next poster
        setActiveIndex((prev) => Math.min(displayedEvents.length - 1, prev + 1));
      } else {
        // Swiped right -> Previous poster
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => Math.min(displayedEvents.length - 1, prev + 1));
    } else if (e.key === 'Enter') {
      const activeEvent = displayedEvents[activeIndex];
      if (activeEvent) {
        navigate(`/events/${activeEvent.slug}`);
      }
    }
  };

  const activeEvent = displayedEvents[activeIndex] || displayedEvents[0];

  const handlePosterClick = (item, idx) => {
    if (idx === activeIndex) {
      navigate(`/events/${item.slug}`);
    } else {
      setActiveIndex(idx);
    }
  };

  return (
    <section
      id="poster-gallery"
      className="relative py-24 md:py-32 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/25"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Interactive Event Posters Showcase"
    >
      {/* Ambient Sunset Lighting Wash */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#F6B51F]/15 via-[#E9AD83]/20 to-[#397EAC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#B96535]" />
              <span>INTERACTIVE EVENT POSTER GALLERY</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-[1.12]">
              An Archive of <span className="italic font-light text-[#B96535]">Celebrations</span>
            </h2>

            <p className="mt-4 text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed">
              Explore our landmark exhibitions. Hover or swipe across the digital poster gallery from left to right to inspect each edition, or click any poster to view its dedicated exhibition page.
            </p>
          </div>

          {/* Segmented Filter Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            <div className="inline-flex p-1.5 rounded-full bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  filter === 'ALL'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                All Editions ({EVENTS_CATALOG.length})
              </button>

              <button
                onClick={() => setFilter('UPCOMING')}
                className={`px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  filter === 'UPCOMING'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                Upcoming & Flagship (3)
              </button>

              <button
                onClick={() => setFilter('PAST')}
                className={`px-5 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  filter === 'PAST'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                Past Archive (4)
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3D PERSPECTIVE POSTER CAROUSEL (Accurate to reference screenshot)
            ========================================================================= */}
        <div
          ref={deckContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPointerInside(true)}
          onMouseLeave={() => setIsPointerInside(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative py-14 px-2 sm:px-6 select-none overflow-hidden cursor-ew-resize min-h-[480px] sm:min-h-[560px] md:min-h-[600px] flex items-center justify-center"
          style={{ perspective: '1300px' }}
        >
          {/* Card Arc Track */}
          <div className="relative w-full flex items-center justify-center h-full">
            {displayedEvents.map((item, idx) => {
              const diff = idx - activeIndex;
              const isSelected = diff === 0;

              // Compute 3D perspective rotation, scale, offset, and depth
              // Matching reference image:
              // Left cards: positive rotateY (turned towards right)
              // Right cards: negative rotateY (turned towards left)
              // Active card: rotateY 0, scaled up, highest z-index, forward translateZ
              let rotateY = 0;
              let translateX = diff * 52;
              let translateZ = 0;
              let translateY = 0;
              let scale = 1;
              let zIndex = 30;
              let opacity = 1;
              let brightness = 1;

              if (isSelected) {
                rotateY = 0;
                translateX = 0;
                translateZ = 90;
                translateY = -18;
                scale = 1.12;
                zIndex = 40;
                opacity = 1;
                brightness = 1.05;
              } else if (diff < 0) {
                const absDiff = Math.abs(diff);
                rotateY = Math.min(32, 16 + absDiff * 6);
                translateX = diff * 58;
                translateZ = -absDiff * 55;
                translateY = absDiff * 4;
                scale = Math.max(0.76, 1 - absDiff * 0.08);
                zIndex = 30 - absDiff;
                opacity = Math.max(0.4, 0.95 - absDiff * 0.16);
                brightness = Math.max(0.75, 0.95 - absDiff * 0.08);
              } else {
                const absDiff = Math.abs(diff);
                rotateY = -Math.min(32, 16 + absDiff * 6);
                translateX = diff * 58;
                translateZ = -absDiff * 55;
                translateY = absDiff * 4;
                scale = Math.max(0.76, 1 - absDiff * 0.08);
                zIndex = 30 - absDiff;
                opacity = Math.max(0.4, 0.95 - absDiff * 0.16);
                brightness = Math.max(0.75, 0.95 - absDiff * 0.08);
              }

              return (
                <div
                  key={item.id}
                  onClick={() => handlePosterClick(item, idx)}
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    filter: `brightness(${brightness})`,
                    transition: 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms ease, filter 350ms ease, z-index 0ms',
                    transformStyle: 'preserve-3d',
                  }}
                  className={`absolute w-56 sm:w-64 md:w-72 aspect-[9/13.5] rounded-3xl overflow-hidden cursor-pointer bg-[#24141F] shadow-2xl transition-shadow group ${
                    isSelected
                      ? 'ring-4 ring-[#E99A18] shadow-[0_30px_70px_-15px_rgba(185,101,53,0.45)]'
                      : 'border border-[#E9AD83]/30 hover:border-[#E99A18]/60 shadow-xl'
                  }`}
                  role="button"
                  aria-label={`${item.title} - ${item.edition}`}
                >
                  {/* Poster Image */}
                  <img
                    src={item.poster}
                    alt={`${item.title} Poster`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
                    loading="lazy"
                  />

                  {/* Top Status & Year Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span
                      className={`text-[9px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${item.badgeColor}`}
                    >
                      {item.statusLabel}
                    </span>

                    <span className="text-[10px] font-syne font-bold px-2.5 py-0.5 rounded-full bg-black/60 text-white/95 backdrop-blur-sm border border-white/20">
                      {item.year}
                    </span>
                  </div>

                  {/* Poster Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E121B] via-[#1E121B]/60 to-transparent flex flex-col justify-end p-6 text-white z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#F6B51F] font-semibold block">
                        {item.edition}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#E9AD83] font-sans line-clamp-1">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-white/85 font-sans pt-3 mt-3 border-t border-white/15">
                      <Calendar size={13} className="text-[#F6B51F] shrink-0" />
                      <span className="truncate">{item.dates}</span>
                    </div>

                    {/* View Details Prompt on Active Card */}
                    {isSelected && (
                      <div className="mt-3 flex items-center justify-between text-xs text-[#F6B51F] font-sans font-semibold pt-1">
                        <span>Click to Open Exhibition Page</span>
                        <ArrowRight size={13} className="animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Carousel Controls */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-40 pointer-events-auto">
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className={`w-11 h-11 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] text-[#2A1C24] flex items-center justify-center transition-all ${
                activeIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#B96535] hover:text-white hover:border-[#B96535] shadow-md hover:scale-105'
              }`}
              aria-label="Previous Event Poster"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center space-x-2">
              {displayedEvents.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-7 h-2.5 bg-[#B96535]'
                      : 'w-2.5 h-2.5 bg-[#E9AD83]/50 hover:bg-[#B96535]/60'
                  }`}
                  aria-label={`Go to poster ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => Math.min(displayedEvents.length - 1, prev + 1))}
              disabled={activeIndex === displayedEvents.length - 1}
              className={`w-11 h-11 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] text-[#2A1C24] flex items-center justify-center transition-all ${
                activeIndex === displayedEvents.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#B96535] hover:text-white hover:border-[#B96535] shadow-md hover:scale-105'
              }`}
              aria-label="Next Event Poster"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            ACTIVE POSTER CONTEXT STRIP & DEDICATED PAGE NAVIGATION
            ========================================================================= */}
        {activeEvent && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300">
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
