import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Radio } from 'lucide-react';
import { UdaanDiamond } from '../components/UdaanIcons';
import EventPosterGallery from '../components/EventPosterGallery';
import LuxuryEventShowcase from '../components/LuxuryEventShowcase';
import { EVENTS_CATALOG } from '../data/eventsCatalog';
import { getEventLifecycleState, LIFECYCLE_STATES } from '../utils/eventLifecycle';

export default function EventsPage({ onOpenBooking }) {
  // Dynamically organize single source of truth by computed state (Requirement 39)
  const liveEvents = EVENTS_CATALOG.filter(e => getEventLifecycleState(e) === LIFECYCLE_STATES.LIVE);
  const upcomingEvents = EVENTS_CATALOG.filter(e => getEventLifecycleState(e) === LIFECYCLE_STATES.UPCOMING);
  const archivedEvents = EVENTS_CATALOG.filter(e => getEventLifecycleState(e) === LIFECYCLE_STATES.ARCHIVED);

  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
          <UdaanDiamond size={11} className="text-[#B96535]" />
          <span>CALENDAR OF EXHIBITIONS</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#2A1C24] tracking-tight leading-tight">
          Curated <span className="italic font-light text-[#B96535]">Exhibitions</span>
        </h1>
        
        <p className="mt-4 text-[#5E4A55] text-sm sm:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
          Explore high-visibility luxury platforms designed specifically for women entrepreneurs to launch, showcase, and scale their brands.
        </p>
      </div>

      {/* 3D Perspective Event Poster Gallery */}
      <EventPosterGallery onOpenBooking={onOpenBooking} initialFilter="ALL" />

      {/* The UDAAN Calendar: Luxury Editorial Showcase with Magnetic Cursor Follow */}
      <LuxuryEventShowcase onOpenBooking={onOpenBooking} />

      {/* =====================================================================
          1. LIVE NOW (Rendered dynamically if an event is currently live)
          ===================================================================== */}
      {liveEvents.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 space-y-8 mt-20">
          <div className="flex items-center space-x-3 border-b border-emerald-600/30 pb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-xs font-sans font-bold tracking-[0.25em] text-emerald-800 uppercase">
              LIVE NOW • ACTIVE FLOOR
            </span>
          </div>

          {liveEvents.map((ev) => (
            <div
              key={ev.id}
              className="rounded-3xl border-2 border-emerald-600/50 bg-[#FFFBF5] overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/11]">
                  <img
                    src={ev.liveHeroImage || ev.coverImage || ev.poster}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] tracking-widest font-bold uppercase shadow-lg flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>HAPPENING TODAY</span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-emerald-800 font-bold font-sans">
                    {ev.edition}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
                    {ev.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5E4A55] font-sans leading-relaxed">
                    {ev.shortDescription || ev.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-[#5E4A55]">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-emerald-700" />
                      <span className="text-[#2A1C24] font-medium">{ev.dateDisplay || ev.dates}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-emerald-700" />
                      <span>{ev.timings}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:col-span-2">
                      <MapPin size={14} className="text-emerald-700" />
                      <span>{ev.venue} — {ev.hall}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/events/${ev.slug}`}
                      className="px-7 py-3 rounded-full font-semibold text-xs tracking-[0.22em] uppercase bg-emerald-700 text-white hover:bg-emerald-800 transition-colors flex items-center space-x-2 shadow-md"
                    >
                      <span>Join Live Experience</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          2. UPCOMING SHOWCASES
          ===================================================================== */}
      {upcomingEvents.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 space-y-12 mt-20">
          <div className="border-b border-[#E9AD83]/30 pb-4">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              ANTICIPATED DATES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
              Upcoming Showcases
            </h2>
          </div>

          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              className={`rounded-3xl border overflow-hidden transition-all duration-300 shadow-md ${
                ev.isFlagship
                  ? 'border-[#B96535]/40 bg-[#FFFBF5]'
                  : 'border-[#E9AD83]/30 bg-[#FFFBF5]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/11]">
                  <img
                    src={ev.coverImage || ev.poster}
                    alt={ev.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2A1C24]/90 backdrop-blur-sm border border-[#E9AD83]/30 text-[10px] tracking-widest font-semibold uppercase text-[#FFF1D9] shadow-md">
                    {ev.bookingStatus || ev.statusLabel}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#B96535] font-semibold font-sans">
                    {ev.edition}
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
                    {ev.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                    {ev.shortDescription || ev.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-[#5E4A55]">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-[#B96535]" />
                      <span className="text-[#2A1C24] font-medium">{ev.dateDisplay || ev.dates}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-[#B96535]" />
                      <span>{ev.timings}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:col-span-2">
                      <MapPin size={14} className="text-[#B96535]" />
                      <span>{ev.venue} — {ev.hall}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/events/${ev.slug}`}
                      className="btn-sunset-gold px-7 py-3 rounded-full font-semibold text-xs tracking-[0.22em] uppercase transition-colors flex items-center space-x-2 text-[#2A1C24]"
                    >
                      <span>View Event Details</span>
                      <ArrowRight size={13} />
                    </Link>

                    {onOpenBooking && (
                      <button
                        onClick={() => onOpenBooking(ev.title)}
                        className="btn-editorial-outline px-6 py-3 rounded-full text-xs tracking-[0.22em] uppercase font-semibold transition-all"
                      >
                        Book a Stall
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          3. FROM THE ARCHIVE
          ===================================================================== */}
      {archivedEvents.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-24">
          <div className="border-b border-[#E9AD83]/30 pb-4 mb-8">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              LEGACY ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
              From The Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {archivedEvents.map((pe) => (
              <Link
                key={pe.id}
                to={`/events/${pe.slug}`}
                className="group p-5 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 hover:border-[#B96535] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[9/12] rounded-2xl overflow-hidden mb-4 border border-[#E9AD83]/20 relative">
                    <img
                      src={pe.poster}
                      alt={pe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-syne font-bold backdrop-blur-sm">
                      {pe.year}
                    </div>
                  </div>

                  <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-[#B96535] block">
                    {pe.edition}
                  </span>
                  <h3 className="font-serif text-xl text-[#2A1C24] group-hover:text-[#B96535] transition-colors mt-0.5">
                    {pe.title}
                  </h3>
                  <p className="text-xs text-[#5E4A55] font-sans mt-1 line-clamp-2">
                    {pe.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E9AD83]/20 flex items-center justify-between text-xs text-[#B96535] font-semibold">
                  <span>View Archive</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
