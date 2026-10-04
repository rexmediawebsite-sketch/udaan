import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export const EXHIBITION_EDITIONS = [
  {
    id: "edition-1",
    edition: "Edition 01",
    title: "Diwali Inaugural",
    status: "PAST",
    statusLabel: "Past Edition",
    dates: "15 & 16 OCT 2022",
    year: "2022",
    venue: "Hotel Maurya, Patna",
    tagline: "The Inaugural Stage: 28 Pioneering Women Brands",
    category: "Festive Couture & Crafts",
    poster: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    stats: "28 Founders • 3,200+ Patrons",
    highlights: ["First curated luxury expo for women founders", "Bespoke Banarasi & Zardozi showcases"]
  },
  {
    id: "edition-2",
    edition: "Edition 02",
    title: "Spring Soirée",
    status: "PAST",
    statusLabel: "Past Edition",
    dates: "18 & 19 MAR 2023",
    year: "2023",
    venue: "Lemon Tree Premier, Patna",
    tagline: "Summer Bridal Pret & Handcrafted Silver",
    category: "Bridal Pret & Silver",
    poster: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    stats: "35 Founders • 4,100+ Patrons",
    highlights: ["Introduction of 5-star hospitality partnership", "Fine 925 sterling silver pavilions"]
  },
  {
    id: "edition-3",
    edition: "Edition 03",
    title: "Festive Grandeur",
    status: "PAST",
    statusLabel: "Past Edition",
    dates: "21 & 22 OCT 2023",
    year: "2023",
    venue: "Lemon Tree Premier, Patna",
    tagline: "Pre-Diwali Celebration with 42 Curated Labels",
    category: "Fine Jewels & Heirlooms",
    poster: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    stats: "42 Founders • 4,800+ Patrons",
    highlights: ["Over 40 brands achieved record sales", "Expanded to gourmet confectionery & lifestyle"]
  },
  {
    id: "edition-4",
    edition: "Edition 04",
    title: "Royal Heritage",
    status: "PAST",
    statusLabel: "Past Edition",
    dates: "02 & 03 NOV 2024",
    year: "2024",
    venue: "Tangerine Grand, Patna",
    tagline: "Eastern India's Artisanal Masterpieces & Polki",
    category: "Heritage Weaves & Polki",
    poster: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    stats: "48 Founders • 5,400+ Patrons",
    highlights: ["Pillarless Tangerine Grand floor layout", "Direct buyer network spanning 4 states"]
  },
  {
    id: "edition-5",
    edition: "Edition 05",
    title: "Glamour Gala",
    subtitle: "Diwali Edition 5",
    status: "CURRENT",
    statusLabel: "Flagship Edition",
    dates: "24 & 25 OCT 2026",
    year: "2026",
    venue: "Tangerine Grand, Lemon Tree Premier",
    tagline: "Patna's Biggest Pre-Diwali 5-Star Showcase",
    category: "Couture, Jewellery & Living",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    stats: "50+ Stalls • Allotments Open",
    isFlagship: true,
    highlights: ["Peak pre-Diwali shopping dates", "Turnkey octanorm stalls & 5,000+ buyers expected"]
  },
  {
    id: "edition-6",
    edition: "Winter Edition",
    title: "Bihar Heritage Luxe",
    status: "UPCOMING",
    statusLabel: "Upcoming Edition",
    dates: "19 & 20 DEC 2026",
    year: "2026",
    venue: "Hotel Maurya / Convention Center",
    tagline: "Tussar Silks, Madhubani Art & Brass Mastercraft",
    category: "Artisanal Weaves & Living",
    poster: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80",
    stats: "Curated Applications Open",
    isUpcoming: true,
    highlights: ["State heritage crafts focus", "Winter bridal & festive home revamp"]
  },
  {
    id: "edition-7",
    edition: "Summer 2027",
    title: "Spring Soirée 2027",
    status: "UPCOMING",
    statusLabel: "Upcoming Edition",
    dates: "MARCH 2027",
    year: "2027",
    venue: "Lemon Tree Premier, Patna",
    tagline: "Summer Bridal Preview & Pastel Polki Jewellery",
    category: "Summer Couture & Pret",
    poster: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    stats: "Early Registrations",
    isUpcoming: true,
    highlights: ["Pastel bridal trousseau & resort collections", "Destination wedding fashion showcase"]
  }
];

export default function EventsDeck3D({ onOpenBooking }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'UPCOMING' | 'PAST'
  const [activeIndex, setActiveIndex] = useState(4); // Default to Glamour Gala (Edition 5)
  const [isHovering, setIsHovering] = useState(false);
  const deckRef = useRef(null);

  const filteredEvents = EXHIBITION_EDITIONS.filter((ev) => {
    if (filter === 'UPCOMING') return ev.status === 'CURRENT' || ev.status === 'UPCOMING';
    if (filter === 'PAST') return ev.status === 'PAST';
    return true;
  });

  // Ensure activeIndex is valid when filter changes
  useEffect(() => {
    const currentFlagshipIndex = filteredEvents.findIndex((e) => e.isFlagship);
    if (currentFlagshipIndex !== -1) {
      setActiveIndex(currentFlagshipIndex);
    } else {
      setActiveIndex(Math.floor(filteredEvents.length / 2));
    }
  }, [filter]);

  // Handle smooth horizontal hover tracking across the deck from left to right
  const handleMouseMove = (e) => {
    if (!deckRef.current || filteredEvents.length <= 1) return;
    const rect = deckRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, mouseX / rect.width));
    const targetIndex = Math.min(
      filteredEvents.length - 1,
      Math.floor(progress * filteredEvents.length)
    );
    if (targetIndex !== activeIndex) {
      setActiveIndex(targetIndex);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(filteredEvents.length - 1, prev + 1));
  };

  const currentEvent = filteredEvents[activeIndex] || filteredEvents[0];

  return (
    <section id="editions" className="relative py-24 md:py-32 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#F6B51F]/10 via-[#E9AD83]/15 to-[#397EAC]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#B96535]" />
              <span>THE EXHIBITION CHRONICLE</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-tight">
              Past Editions & <span className="italic font-light text-[#B96535]">Upcoming Showcases</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="max-w-md text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
              Hover across the gallery from left to right to explore UDAAN's legacy — from inaugural milestones to our flagship festive editions.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center p-1 rounded-full bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-sm shrink-0">
              {['ALL', 'UPCOMING', 'PAST'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
                    filter === f
                      ? 'bg-[#B96535] text-white shadow-sm'
                      : 'text-[#6B5860] hover:text-[#2A1C24]'
                  }`}
                >
                  {f === 'ALL' ? 'All Editions' : f === 'UPCOMING' ? 'Upcoming & Flagship' : 'Past Archive'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            3D PERSPECTIVE HOVER DECK (Tilt & Fan Effect matching reference image)
            ========================================================================= */}
        <div
          ref={deckRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative py-12 px-4 cursor-ew-resize select-none overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {/* Card Carousel Row */}
          <div className="flex items-center justify-center min-h-[460px] sm:min-h-[520px] relative">
            {filteredEvents.map((item, idx) => {
              const diff = idx - activeIndex;
              const isSelected = diff === 0;

              // Compute 3D perspective rotation, scale, offset, and depth
              let rotateY = 0;
              let translateX = diff * 45; // slight overlap
              let translateZ = 0;
              let translateY = 0;
              let scale = 1;
              let zIndex = 30;
              let opacity = 1;

              if (isSelected) {
                rotateY = 0;
                translateX = 0;
                translateZ = 70;
                translateY = -18;
                scale = 1.08;
                zIndex = 40;
                opacity = 1;
              } else if (diff < 0) {
                // Cards to the left: rotated outward towards the right (positive rotateY)
                const absDiff = Math.abs(diff);
                rotateY = Math.min(32, 16 + absDiff * 6);
                translateX = diff * 50;
                translateZ = -absDiff * 45;
                translateY = absDiff * 4;
                scale = Math.max(0.78, 1 - absDiff * 0.07);
                zIndex = 30 - absDiff;
                opacity = Math.max(0.45, 0.95 - absDiff * 0.15);
              } else {
                // Cards to the right: rotated inward towards the left (negative rotateY)
                const absDiff = Math.abs(diff);
                rotateY = -Math.min(32, 16 + absDiff * 6);
                translateX = diff * 50;
                translateZ = -absDiff * 45;
                translateY = absDiff * 4;
                scale = Math.max(0.78, 1 - absDiff * 0.07);
                zIndex = 30 - absDiff;
                opacity = Math.max(0.45, 0.95 - absDiff * 0.15);
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transition: 'transform 420ms cubic-bezier(0.25, 1, 0.5, 1), opacity 350ms ease, z-index 0ms',
                    transformStyle: 'preserve-3d',
                  }}
                  className={`absolute w-56 sm:w-64 md:w-72 aspect-[9/13] rounded-3xl overflow-hidden cursor-pointer bg-[#2A1C24] shadow-2xl transition-shadow ${
                    isSelected
                      ? 'ring-4 ring-[#E99A18] shadow-[0_25px_60px_-15px_rgba(185,101,53,0.45)]'
                      : 'border border-[#E9AD83]/30 hover:border-[#E99A18]/60 shadow-lg'
                  }`}
                >
                  {/* Poster Image */}
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span
                      className={`text-[9px] font-sans font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md backdrop-blur-md ${
                        item.status === 'CURRENT'
                          ? 'bg-[#E99A18] text-[#1E121B]'
                          : item.status === 'UPCOMING'
                          ? 'bg-[#397EAC] text-white'
                          : 'bg-[#2A1C24]/80 text-[#E9AD83] border border-[#E9AD83]/30'
                      }`}
                    >
                      {item.statusLabel}
                    </span>

                    <span className="text-[10px] font-syne font-bold px-2 py-0.5 rounded-full bg-black/60 text-white/90 backdrop-blur-sm">
                      {item.year}
                    </span>
                  </div>

                  {/* Gradient Fade & Bottom Poster Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E121B] via-[#1E121B]/60 to-transparent flex flex-col justify-end p-5 text-[#FFF1D9] z-10 pointer-events-none">
                    <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#F6B51F] font-semibold block mb-0.5">
                      {item.edition}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#E9AD83] font-sans line-clamp-1 mb-2">
                      {item.tagline}
                    </p>

                    <div className="flex items-center space-x-2 text-[10px] text-white/80 font-sans pt-2 border-t border-white/15">
                      <Calendar size={11} className="text-[#F6B51F] shrink-0" />
                      <span className="truncate">{item.dates}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Nav Controls */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-10 h-10 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] flex items-center justify-center transition-all ${
                activeIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#B96535] hover:text-white hover:border-[#B96535] shadow-sm'
              }`}
              aria-label="Previous Edition"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center space-x-2">
              {filteredEvents.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-6 h-2 bg-[#B96535]'
                      : 'w-2 h-2 bg-[#E9AD83]/50 hover:bg-[#B96535]/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === filteredEvents.length - 1}
              className={`w-10 h-10 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] flex items-center justify-center transition-all ${
                activeIndex === filteredEvents.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-[#B96535] hover:text-white hover:border-[#B96535] shadow-sm'
              }`}
              aria-label="Next Edition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            ACTIVE EDITION SPOTLIGHT STRIP (Detailed Information of the focused card)
            ========================================================================= */}
        {currentEvent && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#B96535] uppercase">
                  {currentEvent.edition} • {currentEvent.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF4EB] border border-[#E9AD83]/30 text-[10px] font-semibold text-[#5E4A55]">
                  {currentEvent.stats}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24]">
                {currentEvent.title} {currentEvent.subtitle && <span className="italic font-light text-[#B96535]">({currentEvent.subtitle})</span>}
              </h3>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5E4A55] font-sans pt-1">
                <div className="flex items-center space-x-1.5">
                  <Calendar size={13} className="text-[#B96535]" />
                  <span className="font-medium text-[#2A1C24]">{currentEvent.dates}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin size={13} className="text-[#B96535]" />
                  <span>{currentEvent.venue}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {currentEvent.status === 'CURRENT' ? (
                <>
                  <button
                    onClick={() => onOpenBooking()}
                    className="btn-sunset-gold px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
                  >
                    <span>Book Stall Now</span>
                    <ArrowRight size={13} />
                  </button>
                  <Link
                    to="/stalls"
                    className="btn-editorial-outline px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
                  >
                    View Floor Plan
                  </Link>
                </>
              ) : currentEvent.status === 'UPCOMING' ? (
                <>
                  <button
                    onClick={() => onOpenBooking(currentEvent.title)}
                    className="btn-sunset-gold px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
                  >
                    <span>Register Early Interest</span>
                    <ArrowRight size={13} />
                  </button>
                  <Link
                    to="/events"
                    className="btn-editorial-outline px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
                  >
                    Event Details
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="#gallery"
                    className="btn-sunset-gold px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
                  >
                    <span>View Archival Moments</span>
                    <ArrowRight size={13} />
                  </a>
                  <Link
                    to="/about"
                    className="btn-editorial-outline px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase"
                  >
                    Read Story
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
