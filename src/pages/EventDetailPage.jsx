import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Share2,
  Users,
  Award,
  ExternalLink,
  Eye
} from 'lucide-react';
import { getEventBySlug, EVENTS_CATALOG } from '../data/eventsCatalog';

export default function EventDetailPage({ onOpenBooking }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug);

  const isCurrentOrUpcoming = event.status === 'current' || event.status === 'upcoming';

  // Find other events for bottom exploration strip
  const otherEvents = EVENTS_CATALOG.filter((e) => e.id !== event.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${event.title} - ${event.edition} | UDAAN`,
        text: event.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation Breadcrumbs & Back Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860]">
            <Link to="/" className="hover:text-[#B96535]">HOME</Link>
            <span className="text-[#6B5860]/40">/</span>
            <Link to="/events" className="hover:text-[#B96535]">EXHIBITIONS</Link>
            <span className="text-[#6B5860]/40">/</span>
            <span className="text-[#B96535] font-semibold uppercase">{event.edition}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] text-xs font-semibold text-[#6B5860] hover:text-[#2A1C24] hover:border-[#B96535] transition-colors shadow-sm"
            >
              <ArrowLeft size={13} />
              <span>Back to Posters</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] text-xs font-semibold text-[#6B5860] hover:text-[#2A1C24] transition-colors shadow-sm"
              title="Share event link"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC EDITORIAL HERO: VISUALLY PROMINENT POSTER + EVENT DETAILS
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E9AD83]/30 bg-[#FFFBF5] p-6 sm:p-10 lg:p-14 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authentic Vertical Event Poster */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[9/13.5] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(42,28,36,0.35)] border-2 border-[#E9AD83]/40 group">
                <img
                  src={event.poster}
                  alt={`${event.title} Official Exhibition Poster`}
                  className="w-full h-full object-cover filter contrast-[1.03]"
                />

                {/* Status Badge Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span
                    className={`text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${event.badgeColor}`}
                  >
                    {event.statusLabel}
                  </span>

                  <span className="text-xs font-syne font-bold px-3 py-0.5 rounded-full bg-black/70 text-white/95 backdrop-blur-sm border border-white/20">
                    {event.year}
                  </span>
                </div>

                {/* Bottom Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                  <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#F6B51F] font-semibold">
                    OFFICIAL POSTER
                  </span>
                  <p className="font-serif text-xl font-normal text-white/95">
                    {event.title} • {event.edition}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Event Identity & Information */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-3 shadow-sm">
                  <Sparkles size={11} className="text-[#B96535]" />
                  <span>{event.edition}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] leading-tight">
                  {event.title} <br />
                  <span className="italic font-light text-[#B96535]">{event.edition}</span>
                </h1>

                <p className="mt-2 text-sm sm:text-base font-serif italic text-[#754633]">
                  “{event.tagline}”
                </p>
              </div>

              <p className="text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                {event.description}
              </p>

              {/* Verified Fact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                  <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">DATES</span>
                  <span className="font-semibold text-[#B96535] text-sm block mt-0.5">{event.dates}</span>
                  <span className="text-[#5E4A55] block text-[11px]">{event.days}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                  <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">HOURS</span>
                  <span className="font-semibold text-[#B96535] text-sm block mt-0.5">{event.timings}</span>
                  <span className="text-[#5E4A55] block text-[11px]">Continuous Access</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                  <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">VENUE</span>
                  <span className="font-semibold text-[#B96535] text-sm block mt-0.5">{event.venue}</span>
                  <span className="text-[#5E4A55] block text-[11px] truncate">{event.hall}</span>
                </div>
              </div>

              {/* Event Stats Counter */}
              {event.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-t border-b border-[#E9AD83]/25 text-center font-sans">
                  {event.stats.map((st, i) => (
                    <div key={i} className="p-2">
                      <div className="font-syne font-bold text-xl text-[#B96535]">{st.value}</div>
                      <div className="text-[9px] tracking-widest uppercase text-[#6B5860] mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dynamic CTAs based on Event Status */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {isCurrentOrUpcoming ? (
                  <>
                    {event.bookingsOpen && (
                      <button
                        onClick={() => onOpenBooking(event.title)}
                        className="btn-sunset-gold px-8 py-3.5 rounded-full text-xs font-sans font-semibold tracking-[0.22em] uppercase shadow-lg text-[#2A1C24] flex items-center space-x-2"
                      >
                        <span>Apply for Stall Allotment</span>
                        <ArrowRight size={13} />
                      </button>
                    )}

                    <Link
                      to="/stalls"
                      className="btn-editorial-outline px-7 py-3.5 rounded-full font-semibold text-xs tracking-[0.22em] uppercase transition-all"
                    >
                      Inspect Stall Map
                    </Link>

                    <Link
                      to="/visitors"
                      className="px-6 py-3.5 rounded-full border border-[#E9AD83]/50 text-[#6B5860] hover:text-[#2A1C24] text-xs tracking-[0.22em] uppercase font-semibold transition-colors"
                    >
                      VIP Visitor Pass
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/gallery"
                      className="btn-sunset-gold px-8 py-3.5 rounded-full text-xs font-sans font-semibold tracking-[0.22em] uppercase shadow-lg text-[#2A1C24] flex items-center space-x-2"
                    >
                      <Eye size={14} />
                      <span>Explore Archival Moments</span>
                    </Link>

                    <Link
                      to="/events/glamour-gala-diwali-edition-5"
                      className="btn-editorial-outline px-7 py-3.5 rounded-full font-semibold text-xs tracking-[0.22em] uppercase transition-all flex items-center space-x-2"
                    >
                      <span>Upcoming Flagship (Diwali Edition 5)</span>
                      <ArrowRight size={13} />
                    </Link>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: CURATED PRODUCT DOMAINS & CATEGORIES
            ========================================================================= */}
        {event.categories && event.categories.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                  EXHIBITION DOMAINS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                  Curated Pavilions & Craft Showcases
                </h2>
              </div>

              {isCurrentOrUpcoming && (
                <Link to="/become-an-exhibitor" className="text-xs text-[#B96535] hover:text-[#2A1C24] font-semibold tracking-wider uppercase">
                  Exhibitor Specifications &rarr;
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.categories.map((catName, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFBF5] p-6 rounded-3xl border border-[#E9AD83]/30 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <span className="font-syne font-bold text-lg text-[#B96535]">0{idx + 1}</span>
                    <h3 className="font-serif text-xl text-[#2A1C24] font-medium mt-1">
                      {catName}
                    </h3>
                    <p className="mt-2 text-xs text-[#5E4A55] font-sans font-light leading-relaxed">
                      Handpicked collections meeting UDAAN's strict standards of authenticity, artisanal excellence, and luxury appeal.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E9AD83]/20 flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B5860] font-semibold">
                      Curated Pavilion
                    </span>
                    {isCurrentOrUpcoming && (
                      <button
                        onClick={() => onOpenBooking(catName)}
                        className="text-[10px] tracking-wider text-[#B96535] font-semibold uppercase hover:text-[#2A1C24]"
                      >
                        Enquire &rarr;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: VENUE EXCELLENCE & INFRASTRUCTURE
            ========================================================================= */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                VENUE & HOSPITALITY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
                {event.hall} at {event.venue}
              </h2>
              <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                Situated in Patna’s upscale business corridor, {event.venue} provides an unmatched 5-star atmosphere for luxury retail. Designed with climate control, high ceilings, architectural spotlights, and dedicated power backups to ensure a seamless experience.
              </p>

              <div className="space-y-2.5 pt-2 text-xs font-sans text-[#2A1C24]">
                {event.highlights ? (
                  event.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start space-x-2.5">
                      <ShieldCheck size={16} className="text-[#B96535] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck size={16} className="text-[#B96535]" />
                    <span>Central Air-Conditioning & High-Lumen Architectural Lighting</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E9AD83]/30 aspect-video shadow-md">
              <img
                src={event.coverImage || event.poster}
                alt={`${event.venue} Exhibition Hall`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: ARCHIVAL PHOTO GALLERY (If available)
            ========================================================================= */}
        {event.gallery && event.gallery.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                VISUAL ARCHIVE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                Moments from {event.edition}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {event.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E9AD83]/30 shadow-md group"
                >
                  <img
                    src={imgUrl}
                    alt={`${event.title} Moment ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 5: EXPLORE OTHER EDITIONS
            ========================================================================= */}
        <div className="pt-12 border-t border-[#E9AD83]/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                MORE EXHIBITIONS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24] mt-1">
                Explore Other Editions
              </h3>
            </div>

            <Link
              to="/events"
              className="text-xs text-[#B96535] hover:text-[#2A1C24] font-semibold tracking-wider uppercase flex items-center space-x-1"
            >
              <span>View All Posters</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherEvents.map((oe) => (
              <Link
                key={oe.id}
                to={`/events/${oe.slug}`}
                className="group p-4 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 hover:border-[#B96535] shadow-sm hover:shadow-md transition-all flex items-center space-x-4"
              >
                <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E9AD83]/30">
                  <img
                    src={oe.poster}
                    alt={oe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] tracking-widest uppercase font-semibold text-[#B96535] block truncate">
                    {oe.edition}
                  </span>
                  <h4 className="font-serif text-lg text-[#2A1C24] truncate group-hover:text-[#B96535] transition-colors">
                    {oe.title}
                  </h4>
                  <p className="text-[11px] text-[#6B5860] font-sans truncate mt-0.5">
                    {oe.dates}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
