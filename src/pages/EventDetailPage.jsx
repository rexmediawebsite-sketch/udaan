import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Share2,
  Users,
  Award,
  ExternalLink,
  Eye,
  HelpCircle,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { UdaanDiamond } from '../components/UdaanIcons';
import { getEventBySlug, EVENTS_CATALOG } from '../data/eventsCatalog';

export default function EventDetailPage({ onOpenBooking }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug);

  const [openFaq, setOpenFaq] = useState(null);
  const isUpcoming = event.status === 'upcoming';
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
    <div className="pt-28 pb-28 bg-[#FAF4EB] min-h-screen text-[#2A1C24] animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation Breadcrumb Bar */}
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
              <span>Back</span>
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
            1. HERO: EVENT POSTER, EVENT NAME, EDITION, DATE, VENUE, STATUS
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E9AD83]/30 bg-[#FFFBF5] p-6 sm:p-10 lg:p-14 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Visual Column: Vertical Event Poster with Elevated Shadow */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[9/13.5] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(42,28,36,0.35)] border-2 border-[#E9AD83]/40 group">
                <img
                  src={event.poster}
                  alt={`${event.title} Official Exhibition Poster`}
                  className="w-full h-full object-cover filter contrast-[1.03]"
                />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className={`text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${event.badgeColor}`}>
                    {event.bookingStatus || event.statusLabel}
                  </span>

                  <span className="text-xs font-syne font-bold px-3 py-0.5 rounded-full bg-black/70 text-white/95 backdrop-blur-sm border border-white/20">
                    {event.year}
                  </span>
                </div>

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

            {/* Content Column: Editorial Hierarchy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-3 shadow-sm">
                  <UdaanDiamond size={10} className="text-[#B96535]" />
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

              {/* Verified Fact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                  <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">DATES</span>
                  <span className="font-semibold text-[#B96535] text-sm block mt-0.5">{event.dates}</span>
                  <span className="text-[#5E4A55] block text-[11px]">{event.days}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                  <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">TIMINGS</span>
                  <span className="font-semibold text-[#B96535] text-sm block mt-0.5">{event.timings}</span>
                  <span className="text-[#5E4A55] block text-[11px]">Continuous Access</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                  <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">VENUE</span>
                  <span className="font-semibold text-[#B96535] text-sm block mt-0.5">{event.venue}</span>
                  <span className="text-[#5E4A55] block text-[11px] truncate">{event.hall}</span>
                </div>
              </div>

              {/* Statistics Strip */}
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

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {isUpcoming ? (
                  <>
                    {event.bookingsOpen && (
                      <button
                        onClick={() => onOpenBooking(event.title)}
                        className="btn-sunset-gold px-8 py-3.5 rounded-full text-xs font-sans font-semibold tracking-[0.22em] uppercase shadow-lg text-[#2A1C24] flex items-center space-x-2"
                      >
                        <span>BOOK YOUR STALL</span>
                        <ArrowRight size={13} />
                      </button>
                    )}

                    <Link
                      to="/stalls"
                      className="btn-editorial-outline px-7 py-3.5 rounded-full font-semibold text-xs tracking-[0.22em] uppercase transition-all"
                    >
                      Interactive Stall Map
                    </Link>

                    <Link
                      to="/visitors"
                      className="px-6 py-3.5 rounded-full border border-[#E9AD83]/50 text-[#6B5860] hover:text-[#2A1C24] text-xs tracking-[0.22em] uppercase font-semibold transition-colors"
                    >
                      Visitor Pass
                    </Link>
                  </>
                ) : (
                  <>
                    <a
                      href="#gallery-section"
                      className="btn-sunset-gold px-8 py-3.5 rounded-full text-xs font-sans font-semibold tracking-[0.22em] uppercase shadow-lg text-[#2A1C24] flex items-center space-x-2"
                    >
                      <Eye size={14} />
                      <span>VIEW EVENT ARCHIVE</span>
                    </a>

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
            2. ABOUT THE EVENT
            ========================================================================= */}
        <div className="mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              THE VISION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
              About the Exhibition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
            <div className="p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-sm">
              <h3 className="font-serif text-xl text-[#2A1C24] font-medium mb-3">
                Curated for Discerning Patrons
              </h3>
              <p>
                {event.description} Each stall is thoughtfully positioned to ensure maximum visibility, seamless footfall flow, and an elevated buying atmosphere that mirrors high-end luxury boutiques.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-sm">
              <h3 className="font-serif text-xl text-[#2A1C24] font-medium mb-3">
                Where Women Build Brands
              </h3>
              <p>
                UDAAN exists to bridge artisanal craft and luxury commerce. We provide complete turnkey infrastructure—from custom octanorm booths and warm architectural spotlights to regional marketing campaigns and high-intent buyer invitations.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. WHO CAN EXHIBIT & 4. WHY EXHIBIT (For Upcoming)
            ========================================================================= */}
        {isUpcoming && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {/* Who Can Exhibit */}
            <div className="p-8 md:p-10 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                CURATION CRITERIA
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24] mt-1 mb-6">
                Who Can Exhibit
              </h3>

              <div className="space-y-4 text-xs font-sans text-[#2A1C24]">
                {event.whoCanExhibit && event.whoCanExhibit.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-[#B96535] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Exhibit */}
            <div className="p-8 md:p-10 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                VALUE PROPOSITION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24] mt-1 mb-6">
                Why Exhibit at UDAAN
              </h3>

              <div className="space-y-4 text-xs font-sans text-[#2A1C24]">
                {event.whyExhibit && event.whyExhibit.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <Award size={16} className="text-[#B96535] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            5. CATEGORIES / PAVILIONS
            ========================================================================= */}
        {event.categories && event.categories.length > 0 && (
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                  EXHIBITION DOMAINS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                  Curated Categories &amp; Pavilions
                </h2>
              </div>

              {isUpcoming && (
                <button
                  onClick={() => onOpenBooking()}
                  className="text-xs text-[#B96535] hover:text-[#2A1C24] font-semibold tracking-wider uppercase"
                >
                  Apply for Domain Allotment &rarr;
                </button>
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
                    <h4 className="font-serif text-xl text-[#2A1C24] font-medium mt-1">
                      {catName}
                    </h4>
                    <p className="mt-2 text-xs text-[#5E4A55] font-sans font-light leading-relaxed">
                      Handpicked collections meeting UDAAN's strict standards of authenticity, artisanal excellence, and luxury appeal.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E9AD83]/20 flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B5860] font-semibold">
                      Curated Pavilion
                    </span>
                    {isUpcoming && (
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
            6. STALL OPTIONS & 7. INTERACTIVE STALL MAP (For Upcoming)
            ========================================================================= */}
        {isUpcoming && event.stallTypes && event.stallTypes.length > 0 && (
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                BOOTH ARCHITECTURE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                Stall Options &amp; Specifications
              </h2>
              <p className="text-xs text-[#5E4A55] font-sans mt-2">
                All stall bookings include turnkey electrical, lighting, and branding infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {event.stallTypes.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#B96535] font-semibold font-sans">
                      {tier.location}
                    </span>
                    <h4 className="font-serif text-2xl text-[#2A1C24] mt-1">
                      {tier.name}
                    </h4>
                    <div className="font-syne font-bold text-lg text-[#B96535] mt-1">
                      {tier.size}
                    </div>
                    <div className="text-xs font-semibold text-[#6B5860] mt-1">
                      {tier.pricing}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E9AD83]/20 space-y-2 text-xs font-sans text-[#2A1C24]">
                      {tier.features.map((f, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle size={14} className="text-[#B96535] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#E9AD83]/20">
                    <button
                      onClick={() => onOpenBooking(tier.name)}
                      className="btn-sunset-gold w-full py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24]"
                    >
                      Select Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Stall Map Teaser Card */}
            <div className="p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                  FLOOR PLAN SCHEMATIC
                </span>
                <h4 className="font-serif text-2xl text-[#2A1C24]">
                  Inspect Interactive Stall Map
                </h4>
                <p className="text-xs text-[#5E4A55] font-sans">
                  Explore available stalls on the Tangerine Grand floor plan before submitting your allotment application.
                </p>
              </div>

              <Link
                to="/stalls"
                className="btn-editorial-outline px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase shrink-0 flex items-center space-x-2"
              >
                <LayoutGrid size={14} />
                <span>Open Floor Plan</span>
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================================
            8. PHOTO GALLERY & MOMENTS
            ========================================================================= */}
        {event.gallery && event.gallery.length > 0 && (
          <div id="gallery-section" className="mb-20">
            <div className="text-center mb-10">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                CURATED VISUALS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                Gallery &amp; Exhibition Moments
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {event.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden aspect-[4/3] border border-[#E9AD83]/30 shadow-md group"
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
            9. FEATURED EXHIBITORS / BRANDS
            ========================================================================= */}
        {event.featuredExhibitors && event.featuredExhibitors.length > 0 && (
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                  PARTICIPATING LABELS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                  Featured Brands &amp; Founders
                </h2>
              </div>

              <Link to="/exhibitors" className="text-xs text-[#B96535] hover:text-[#2A1C24] font-semibold tracking-wider uppercase">
                Browse Full Exhibitor Directory &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.featuredExhibitors.map((exh, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-sm"
                >
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B96535]">
                    {exh.category}
                  </span>
                  <h4 className="font-serif text-xl text-[#2A1C24] mt-1">
                    {exh.name}
                  </h4>
                  <p className="text-xs text-[#5E4A55] font-sans mt-0.5">
                    Founder: <strong className="text-[#2A1C24]">{exh.founder}</strong>
                  </p>
                  <span className="inline-block mt-3 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF4EB] border border-[#E9AD83]/30 text-[#6B5860]">
                    {exh.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            10. VENUE INFORMATION & 5-STAR AMENITIES
            ========================================================================= */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-lg mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                DESTINATION VENUE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
                {event.hall} at {event.venue}
              </h2>
              <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                {event.location}. Tangerine Grand provides an expansive pillarless hall with continuous central air-conditioning, dedicated valet drop-off, professional spotlights, and service elevators for seamless loading.
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

            <div className="rounded-3xl overflow-hidden border border-[#E9AD83]/30 aspect-video shadow-md">
              <img
                src={event.coverImage || event.poster}
                alt={`${event.venue} Exhibition Hall`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* =========================================================================
            11. EVENT FAQS & POLICIES (If available)
            ========================================================================= */}
        {event.faqs && event.faqs.length > 0 && (
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                Event Guidelines &amp; FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {event.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-serif font-medium text-[#2A1C24]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-[#B96535] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed border-t border-[#E9AD83]/20 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            12. BOTTOM BOOKING CTA & EXPLORE MORE EDITIONS
            ========================================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 text-center shadow-lg mb-16">
          <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
            {isUpcoming ? 'RESERVE YOUR STAGE' : 'UDAAN EVENT ARCHIVE'}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-2 mb-3">
            {isUpcoming ? 'Ready to Exhibit at ' + event.title + '?' : 'Explore More Moments from ' + event.edition}
          </h3>
          <p className="text-xs sm:text-sm text-[#5E4A55] font-sans max-w-lg mx-auto mb-6">
            {isUpcoming
              ? 'Join 50+ handpicked women-founded labels at Lemon Tree Premier. Submit your collection for curation review within 24 hours.'
              : 'Discover other landmark editions of UDAAN or apply for our upcoming flagship festive showcases.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {isUpcoming ? (
              <button
                onClick={() => onOpenBooking(event.title)}
                className="btn-sunset-gold px-9 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
              >
                <span>BOOK YOUR STALL</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <Link
                to="/events"
                className="btn-sunset-gold px-9 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
              >
                <span>VIEW EVENT ARCHIVE</span>
                <ArrowRight size={13} />
              </Link>
            )}

            <Link
              to="/events"
              className="btn-editorial-outline px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              All Exhibitions
            </Link>
          </div>
        </div>

        {/* Other Editions Quick Row */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-serif text-2xl text-[#2A1C24]">
              More UDAAN Exhibitions
            </h4>
            <Link to="/events" className="text-xs text-[#B96535] hover:text-[#2A1C24] font-semibold tracking-wider uppercase">
              View Calendar &rarr;
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
                  <h5 className="font-serif text-lg text-[#2A1C24] truncate group-hover:text-[#B96535] transition-colors">
                    {oe.title}
                  </h5>
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
