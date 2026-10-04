import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import EventPosterGallery from '../components/EventPosterGallery';
import LuxuryEventShowcase from '../components/LuxuryEventShowcase';
import { EVENTS_CATALOG } from '../data/eventsCatalog';

export default function EventsPage({ onOpenBooking }) {
  const upcomingEvents = EVENTS_CATALOG.filter((e) => e.status === 'current' || e.status === 'upcoming');
  const pastEvents = EVENTS_CATALOG.filter((e) => e.status === 'past');

  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
          <Sparkles size={12} className="text-[#B96535]" />
          <span>CALENDAR OF EXHIBITIONS</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#2A1C24] tracking-tight leading-tight">
          Curated <span className="italic font-light text-[#B96535]">Exhibitions</span>
        </h1>
        
        <p className="mt-4 text-[#5E4A55] text-sm sm:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
          Explore high-visibility luxury platforms designed specifically for women entrepreneurs to launch, showcase, and scale their brands.
        </p>
      </div>

      {/* 3D Perspective Event Poster Gallery (Coverflow with Hover & Mobile Swipe) */}
      <EventPosterGallery onOpenBooking={onOpenBooking} initialFilter="ALL" />

      {/* The UDAAN Calendar: Luxury Editorial Showcase with Magnetic Cursor Follow */}
      <LuxuryEventShowcase onOpenBooking={onOpenBooking} />

      {/* Verified Upcoming Showcases Listing */}
      <div className="max-w-6xl mx-auto px-6 space-y-12 mt-20">
        <div className="border-b border-[#E9AD83]/30 pb-4">
          <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
            EXHIBITION CALENDAR
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
            Upcoming & Flagship Showcases
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
              {/* Event Image */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/11]">
                <img
                  src={ev.coverImage || ev.poster}
                  alt={ev.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2A1C24]/90 backdrop-blur-sm border border-[#E9AD83]/30 text-[10px] tracking-widest font-semibold uppercase text-[#FFF1D9] shadow-md">
                  {ev.statusLabel}
                </div>
              </div>

              {/* Event Content */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#B96535] font-semibold font-sans">
                  {ev.edition}
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
                  {ev.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                  {ev.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-[#5E4A55]">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-[#B96535]" />
                    <span className="text-[#2A1C24] font-medium">{ev.dates}</span>
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

                  {ev.bookingsOpen && (
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

      {/* Past Archive Highlights */}
      <div className="max-w-6xl mx-auto px-6 mt-24">
        <div className="border-b border-[#E9AD83]/30 pb-4 mb-8">
          <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
            LEGACY ARCHIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
            Previous Event Editions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastEvents.map((pe) => (
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

    </div>
  );
}
