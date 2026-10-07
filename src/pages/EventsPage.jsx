import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Store,
  Users,
  Award,
  ExternalLink
} from 'lucide-react';
import { UdaanDiamond, UdaanEmblem } from '../components/UdaanIcons';
import { EVENTS_CATALOG } from '../data/eventsCatalog';

export default function EventsPage({ onOpenBooking }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'UPCOMING' | 'PAST'

  const upcomingEvents = EVENTS_CATALOG.filter(e => e.status !== 'past');
  const pastEvents = EVENTS_CATALOG.filter(e => e.status === 'past');
  const flagshipEvent = upcomingEvents.find(e => e.isFlagship) || upcomingEvents[0];

  const filteredEvents = filter === 'UPCOMING'
    ? upcomingEvents
    : filter === 'PAST'
    ? pastEvents
    : EVENTS_CATALOG;

  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-6 sm:mb-8">
          <Link to="/" className="hover:text-[#B96535] transition-colors">HOME</Link>
          <span className="text-[#6B5860]/40">/</span>
          <span className="text-[#B96535] font-semibold uppercase">EXHIBITIONS CALENDAR</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-[#B96535] uppercase shadow-xs">
            <UdaanDiamond size={11} className="text-[#B96535]" />
            <span>CALENDAR OF EXHIBITIONS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-tight leading-tight">
            Curated <span className="italic font-light text-shimmer-terracotta">Exhibitions</span>
          </h1>

          <p className="text-xs sm:text-base text-[#5E4A55] font-sans font-light leading-relaxed max-w-xl mx-auto">
            Explore 5-star luxury exhibition platforms curated for women entrepreneurs, luxury couturiers, and artisanal jewelry houses in Bihar.
          </p>

          {/* Clean Filter Tabs */}
          <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {[
              { id: 'ALL', label: 'All Exhibitions' },
              { id: 'UPCOMING', label: 'Upcoming Editions' },
              { id: 'PAST', label: 'Past Archives' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#4A1620] text-[#FFE8B3] shadow-md'
                    : 'bg-[#FFF1D9] text-[#5E4A55] hover:text-[#2A1C24] border border-[#E9AD83]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>


        {/* =========================================================================
            FEATURED FLAGSHIP SHOWCASE (Shown on ALL and UPCOMING)
            ========================================================================= */}
        {filter !== 'PAST' && flagshipEvent && (
          <div className="mb-10 sm:mb-14 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border-2 border-[#B96535]/50 overflow-hidden shadow-xl p-4 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
              
              {/* Event Image */}
              <div className="lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] max-h-[250px] sm:max-h-none sm:aspect-[16/11] shadow-md">
                <img
                  src={flagshipEvent.coverImage || flagshipEvent.poster}
                  alt={flagshipEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-1 rounded-full bg-[#B96535] text-white text-[9px] sm:text-[10px] font-sans font-bold tracking-wider uppercase shadow-md flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>{flagshipEvent.bookingStatus || 'STALLS OPEN'}</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                <div className="flex items-center space-x-2 text-[9.5px] sm:text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#B96535]">
                  <UdaanDiamond size={10} />
                  <span>NEXT UPCOMING EDITION • {flagshipEvent.edition}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl text-[#2A1C24] leading-tight">
                  {flagshipEvent.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                  {flagshipEvent.shortDescription || flagshipEvent.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-sans text-[#5E4A55] border-t border-[#E9AD83]/20">
                  <div className="flex items-center space-x-2.5 bg-[#FFF1D9]/40 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                    <Calendar size={14} className="text-[#B96535]" />
                    <span className="text-[#2A1C24] font-medium leading-tight">{flagshipEvent.dates}</span>
                  </div>
                  <div className="flex items-center space-x-2.5 bg-[#FFF1D9]/40 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                    <Clock size={14} className="text-[#B96535]" />
                    <span className="leading-tight">{flagshipEvent.timings}</span>
                  </div>
                  <div className="flex items-center space-x-2.5 sm:col-span-2 bg-[#FFF1D9]/40 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                    <MapPin size={14} className="text-[#B96535]" />
                    <span className="truncate leading-tight">{flagshipEvent.hall}, {flagshipEvent.venue}</span>
                  </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                  <Link
                    to={`/events/${flagshipEvent.slug}`}
                    className="btn-sunset-gold w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 text-[#2A1C24] shadow-md min-h-[44px]"
                  >
                    <span>Explore Exhibition</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to="/book-a-stall"
                    className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-[#4A1620] hover:bg-[#641F2C] text-[#FFE8B3] transition-all shadow-md flex items-center justify-center min-h-[44px]"
                  >
                    Book a Stall (₹20k, 30k, 50k)
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* =========================================================================
            CLEAN EXHIBITIONS GRID
            ========================================================================= */}
        <div className="space-y-6">
          <div className="border-b border-[#E9AD83]/30 pb-3 flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#2A1C24]">
              {filter === 'UPCOMING' ? 'Upcoming Exhibitions' : filter === 'PAST' ? 'Archived Exhibitions' : 'All Exhibitions Calendar'}
            </h3>
            <span className="text-xs font-sans text-[#5E4A55]">
              {filteredEvents.length} Editions Listed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((ev) => {
              const isPast = ev.status === 'past';

              return (
                <div
                  key={ev.id}
                  className="rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/35 p-4 sm:p-6 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Image & Status Tag */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                      <img
                        src={ev.coverImage || ev.poster}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2A1C24]/85 backdrop-blur-sm text-[#FFF1D9] text-[10px] font-sans font-bold tracking-wider uppercase border border-[#E9AD83]/30">
                        {isPast ? `Archived • ${ev.year}` : ev.bookingStatus || 'Upcoming'}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B96535]">
                        {ev.edition}
                      </span>
                      <h4 className="font-serif text-2xl text-[#2A1C24] mt-0.5">
                        {ev.title}
                      </h4>
                      <p className="text-xs text-[#5E4A55] font-sans font-light mt-1.5 line-clamp-2">
                        {ev.shortDescription || ev.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs font-sans text-[#5E4A55] pt-2 border-t border-[#E9AD83]/20">
                      <div className="flex items-center space-x-2">
                        <Calendar size={13} className="text-[#B96535]" />
                        <span>{ev.dates || ev.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={13} className="text-[#B96535]" />
                        <span>{ev.hall}, {ev.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-4 border-t border-[#E9AD83]/20 flex items-center justify-between gap-3">
                    <Link
                      to={`/events/${ev.slug}`}
                      className="text-xs font-sans font-bold text-[#4A1620] hover:text-[#B96535] flex items-center space-x-1.5 transition-colors"
                    >
                      <span>{isPast ? 'Explore Moments' : 'Event Details'}</span>
                      <ArrowRight size={13} />
                    </Link>

                    {!isPast ? (
                      <Link
                        to="/book-a-stall"
                        className="px-4 py-1.5 rounded-full bg-[#FFF1D9] hover:bg-[#B96535] hover:text-white text-[#B96535] border border-[#E9AD83]/50 text-xs font-sans font-semibold tracking-wider uppercase transition-colors"
                      >
                        Book Stall
                      </Link>
                    ) : (
                      <span className="text-[10px] text-[#6B5860] uppercase tracking-wider font-mono">
                        Concluded
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Bottom Quick Help Card */}
        <div className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              FOUNDER ASSISTANCE
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-[#2A1C24]">
              Want to exhibit at an upcoming edition?
            </h4>
            <p className="text-xs text-[#5E4A55] font-sans max-w-xl font-light">
              We offer 20k, 30k, and 50k turnkey booth packages with complete lighting, electrical sockets, display tables, and branding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/book-a-stall"
              className="btn-sunset-gold px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2A1C24]"
            >
              Book Your Interest
            </Link>
            <Link
              to="/stalls"
              className="px-5 py-3 rounded-full border border-[#E9AD83]/50 bg-white hover:bg-[#FAF4EB] text-[#4A1620] text-xs font-semibold uppercase tracking-wider"
            >
              Inspect Floor Map
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
