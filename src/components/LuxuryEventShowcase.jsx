import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Eye,
  Award,
  Users,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { UdaanDiamond } from './UdaanIcons';
import { EVENTS_CATALOG } from '../data/eventsCatalog';

export default function LuxuryEventShowcase({ onOpenBooking }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [hoveredEvent, setHoveredEvent] = useState(null);

  // Smooth cursor follow coordinates using linear interpolation (lerp)
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [isCardVisible, setIsCardVisible] = useState(false);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  const upcomingEvents = EVENTS_CATALOG.filter((e) => e.status === 'upcoming');
  const pastEvents = EVENTS_CATALOG.filter((e) => e.status === 'past');
  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  // Linear interpolation loop for smooth magnetic cursor-following with delay
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      // 0.12 lag factor gives a weighted, silky floating feel
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.12);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.12);

      setCardPos({
        x: Math.round(currentPos.current.x),
        y: Math.round(currentPos.current.y),
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Relative to showcase container, with offset so cursor doesn't obscure the card
    const rawX = e.clientX - rect.left + 24;
    const rawY = e.clientY - rect.top - 40;

    // Viewport clamping
    const clampedX = Math.max(20, Math.min(rect.width - 340, rawX));
    const clampedY = Math.max(20, Math.min(rect.height - 240, rawY));

    targetPos.current = { x: clampedX, y: clampedY };
  }, []);

  const handleMouseEnterEvent = (event) => {
    setHoveredEvent(event);
    setIsCardVisible(true);
  };

  const handleMouseLeaveEvent = () => {
    setIsCardVisible(false);
    setHoveredEvent(null);
  };

  return (
    <section
      id="calendar"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-36 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20"
      aria-label="The UDAAN Calendar - Luxury Exhibition Showcase"
    >
      {/* Ambient Lighting Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#F6B51F]/10 via-[#E9AD83]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* =========================================================================
            EDITORIAL SHOWCASE HEADER (The UDAAN Calendar)
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <UdaanDiamond size={11} className="text-[#B96535]" />
              <span>THE UDAAN CALENDAR</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-[1.1]">
              What's Happening <br />
              <span className="italic font-light text-[#B96535]">at UDAAN</span>
            </h2>

            <p className="mt-4 text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed max-w-xl">
              A curated digital exhibition of our landmark showcases. Hover over any event visual to reveal its editorial brief, or select an event to enter its full experience.
            </p>
          </div>

          {/* Luxury Segmented Toggle (Upcoming vs Past) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            <div className="inline-flex p-1.5 rounded-full bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
              <button
                onClick={() => {
                  setActiveTab('upcoming');
                  setIsCardVisible(false);
                }}
                className={`px-6 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                Upcoming Exhibitions ({upcomingEvents.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('past');
                  setIsCardVisible(false);
                }}
                className={`px-6 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-[#B96535] text-white shadow-sm'
                    : 'text-[#6B5860] hover:text-[#2A1C24]'
                }`}
              >
                Past Event Archive ({pastEvents.length})
              </button>
            </div>

            <Link
              to="/events"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-sans font-semibold tracking-wider text-[#B96535] hover:text-[#2A1C24] uppercase transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* =========================================================================
            MAGETIC FLOATING CURSOR-FOLLOWING EVENT INFORMATION CARD
            ========================================================================= */}
        {hoveredEvent && (
          <div
            style={{
              transform: `translate3d(${cardPos.x}px, ${cardPos.y}px, 0)`,
              opacity: isCardVisible ? 1 : 0,
              pointerEvents: 'none',
              transition: 'opacity 250ms ease, transform 60ms linear',
            }}
            className="absolute top-0 left-0 z-50 hidden lg:block w-80 p-6 rounded-2xl bg-[#FFFBF5]/95 backdrop-blur-md border border-[#E9AD83]/40 shadow-[0_25px_50px_-12px_rgba(42,28,36,0.25)] text-[#2A1C24] select-none"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-[0.2em] font-sans uppercase font-bold text-[#B96535]">
                {hoveredEvent.edition}
              </span>
              <span className={`text-[9px] font-sans font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full ${hoveredEvent.badgeColor}`}>
                {hoveredEvent.bookingStatus || hoveredEvent.statusLabel}
              </span>
            </div>

            <h4 className="font-serif text-2xl text-[#2A1C24] leading-snug">
              {hoveredEvent.title}
            </h4>

            <p className="mt-1.5 text-xs text-[#5E4A55] font-sans leading-relaxed line-clamp-2">
              {hoveredEvent.shortDescription || hoveredEvent.tagline}
            </p>

            <div className="mt-3.5 pt-3 border-t border-[#E9AD83]/25 space-y-1.5 text-xs font-sans text-[#2A1C24]">
              <div className="flex items-center space-x-2">
                <Calendar size={13} className="text-[#B96535] shrink-0" />
                <span className="font-medium">{hoveredEvent.dates}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#5E4A55]">
                <MapPin size={13} className="text-[#B96535] shrink-0" />
                <span className="truncate">{hoveredEvent.venue}, {hoveredEvent.city}</span>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-xs font-semibold text-[#B96535] tracking-wider uppercase">
              <span>{activeTab === 'upcoming' ? 'Click to View Event' : 'Explore Event Archive'}</span>
              <ArrowRight size={13} className="animate-pulse" />
            </div>
          </div>
        )}

        {/* =========================================================================
            EDITORIAL FULL-BLEED EVENT SHOWCASE LAYOUT (Asymmetric Luxury Presentation)
            ========================================================================= */}
        <div className="space-y-16">
          {displayedEvents.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnterEvent(item)}
                onMouseLeave={handleMouseLeaveEvent}
                onClick={() => navigate(`/events/${item.slug}`)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden border border-[#E9AD83]/30 bg-[#FFFBF5] shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-[#B96535]/50"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Visual Column: Cinematic Poster / Hero Visual with Subtle Zoom */}
                  <div className={`lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[520px] overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img
                      src={item.heroImage || item.coverImage || item.poster}
                      alt={`${item.title} - ${item.edition}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out filter brightness-[0.92] contrast-[1.03]"
                      loading="lazy"
                    />

                    {/* Subtle Editorial Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-700" />

                    {/* Floating Vertical Poster Insert (Luxury Editorial Overlay) */}
                    <div className="absolute bottom-6 left-6 w-24 sm:w-28 md:w-32 aspect-[9/13.5] rounded-xl overflow-hidden shadow-2xl border-2 border-white/40 group-hover:scale-105 transition-transform duration-500 hidden sm:block">
                      <img
                        src={item.poster}
                        alt={`${item.title} Official Poster`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* In-Image Tag */}
                    <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                      <span className="text-[10px] tracking-[0.25em] font-sans font-bold uppercase px-3 py-1 rounded-full bg-black/60 text-[#FFF1D9] backdrop-blur-md border border-white/20">
                        {item.edition}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                      <span className={`text-[10px] tracking-widest font-sans font-bold uppercase px-3.5 py-1 rounded-full shadow-lg backdrop-blur-md ${item.badgeColor}`}>
                        {item.bookingStatus || item.statusLabel}
                      </span>
                    </div>

                    {/* Bottom Atmospheric Teaser on Image */}
                    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-right text-white">
                      <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[#F6B51F] block">
                        {item.city}
                      </span>
                      <p className="font-serif text-lg text-white font-light">
                        {item.venue}
                      </p>
                    </div>
                  </div>

                  {/* Information Column: Editorial Hierarchy, Oversized Typography */}
                  <div className={`lg:col-span-5 p-6 sm:p-10 lg:p-12 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    <div>
                      <span className="text-[10px] tracking-[0.25em] font-sans uppercase font-bold text-[#B96535] block mb-2">
                        {item.edition} • {item.year}
                      </span>

                      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2A1C24] leading-[1.12] group-hover:text-[#B96535] transition-colors">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm sm:text-base font-serif italic text-[#754633]">
                        “{item.tagline}”
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                      {item.shortDescription || item.description}
                    </p>

                    {/* Event Metadata Cards */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-sans text-[#2A1C24]">
                      <div className="p-3.5 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                        <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">DATES</span>
                        <span className="font-semibold text-[#B96535] block mt-0.5">{item.dates}</span>
                        <span className="text-[#5E4A55] text-[11px] block">{item.days}</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                        <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">LOCATION</span>
                        <span className="font-semibold text-[#B96535] block mt-0.5">{item.venue}</span>
                        <span className="text-[#5E4A55] text-[11px] block truncate">{item.city}</span>
                      </div>
                    </div>

                    {/* Stats Highlights */}
                    {item.stats && item.stats.length > 0 && (
                      <div className="flex items-center gap-6 py-2 border-t border-b border-[#E9AD83]/20 text-xs font-sans">
                        {item.stats.slice(0, 3).map((st, i) => (
                          <div key={i}>
                            <span className="font-syne font-bold text-lg text-[#B96535] block">{st.value}</span>
                            <span className="text-[9px] uppercase tracking-wider text-[#6B5860]">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/events/${item.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="btn-sunset-gold px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
                      >
                        <span>{item.status === 'upcoming' ? 'View Event' : 'Explore Event'}</span>
                        <ArrowRight size={13} />
                      </Link>

                      {item.bookingsOpen && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(item.title);
                          }}
                          className="btn-editorial-outline px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
                        >
                          Book Your Stall
                        </button>
                      )}

                      {item.status === 'past' && (
                        <Link
                          to="/gallery"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-editorial-outline px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5"
                        >
                          <Eye size={13} />
                          <span>View Memories</span>
                        </Link>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* View All Events Action Footer */}
        <div className="mt-16 pt-10 border-t border-[#E9AD83]/30 text-center">
          <Link
            to="/events"
            className="btn-sunset-gold inline-flex items-center space-x-2 px-9 py-3.5 rounded-full text-[#2A1C24] font-semibold text-xs tracking-[0.22em] uppercase transition-colors shadow-lg"
          >
            <span>Explore Complete Calendar &amp; Archive</span>
            <ChevronRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
