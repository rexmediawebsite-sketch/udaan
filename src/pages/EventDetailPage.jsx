import React, { useState, useEffect } from 'react';
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
import { getEventLifecycleState, LIFECYCLE_STATES } from '../utils/eventLifecycle';

// Lifecycle-Powered Components
import EventHeroState from '../components/event/EventHeroState';
import LiveUpdatesTimeline from '../components/event/LiveUpdatesTimeline';
import LivePhotoStream from '../components/event/LivePhotoStream';
import LiveExhibitorsDiscovery from '../components/event/LiveExhibitorsDiscovery';
import ArchiveStorySequence from '../components/event/ArchiveStorySequence';
import VisitorEssentials from '../components/event/VisitorEssentials';
import ConfirmedSchedule from '../components/event/ConfirmedSchedule';
import EventStateSimulatorBar from '../components/event/EventStateSimulatorBar';

export default function EventDetailPage({ onOpenBooking }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug);

  // Administrative simulation state (allows testing AUTO, UPCOMING, LIVE, and ARCHIVED)
  const [simulationState, setSimulationState] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Compute active lifecycle state (Asia/Kolkata standard)
  const lifecycleState = getEventLifecycleState(event, simulationState);
  const activeMode = simulationState ? 'MANUAL' : (event?.statusMode || 'AUTO');

  const otherEvents = EVENTS_CATALOG.filter((e) => e.id !== event?.id).slice(0, 3);

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

  if (!event) {
    return (
      <div className="pt-32 pb-32 bg-[#FAF4EB] min-h-screen text-center px-6">
        <h2 className="font-serif text-3xl text-[#2A1C24] mb-4">Event Not Found</h2>
        <Link to="/events" className="btn-sunset-gold px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase">
          Return to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF4EB] min-h-screen text-[#2A1C24] transition-colors duration-500">
      
      {/* 0. Live State Simulator & Timezone Control Bar */}
      <EventStateSimulatorBar
        event={event}
        activeState={lifecycleState}
        activeMode={activeMode}
        onSelectState={(state) => setSimulationState(state)}
        onResetAuto={() => setSimulationState(null)}
      />

      {/* Breadcrumb Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
      </div>

      {/* =========================================================================
          1. STATE-POWERED HERO
          UPCOMING  -> Anticipation, Countdown, "Book Your Stall"
          LIVE      -> "UDAAN IS LIVE", Pulsing Live Indicator, Direct Floor Links
          ARCHIVED  -> "The Moment Became A Memory", Nostalgic Gold, Archival Register
          ========================================================================= */}
      <EventHeroState
        event={event}
        lifecycleState={lifecycleState}
        onOpenBooking={onOpenBooking}
      />

      {/* =========================================================================
          2. LIVE STATE EXCLUSIVE: REAL-TIME UPDATES TIMELINE
          Only rendered during LIVE state. Strict published: true filter.
          ========================================================================= */}
      {lifecycleState === LIFECYCLE_STATES.LIVE && (
        <LiveUpdatesTimeline event={event} />
      )}

      {/* =========================================================================
          3. PHOTO STREAM ("FROM THE FLOOR")
          Shared across LIVE and ARCHIVED states using verified event.gallery items.
          Strict approvedForPublic: true filter. Fullscreen zoom viewer.
          ========================================================================= */}
      {(lifecycleState === LIFECYCLE_STATES.LIVE || lifecycleState === LIFECYCLE_STATES.ARCHIVED) && (
        <LivePhotoStream event={event} lifecycleState={lifecycleState} />
      )}

      {/* =========================================================================
          4. ARCHIVED RETROSPECTIVE: EDITORIAL MOMENTS & VERIFIED STATS
          Rendered specifically in ARCHIVED state.
          ========================================================================= */}
      {lifecycleState === LIFECYCLE_STATES.ARCHIVED && (
        <ArchiveStorySequence event={event} />
      )}

      {/* =========================================================================
          5. UNIFIED EXHIBITOR DISCOVERY
          Single source of truth (event.exhibitors):
          - UPCOMING: "WHO IS EXHIBITING"
          - LIVE: "MEET THE BRANDS" with confirmed Stall Numbers
          - ARCHIVED: "THE BRANDS THAT WERE HERE"
          ========================================================================= */}
      <LiveExhibitorsDiscovery event={event} lifecycleState={lifecycleState} />

      {/* =========================================================================
          6. UPCOMING EXCLUSIVE: ABOUT, WHO CAN EXHIBIT, AND WHY EXHIBIT
          ========================================================================= */}
      {lifecycleState === LIFECYCLE_STATES.UPCOMING && (
        <div className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[9/13.5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E9AD83]/40 group">
                <img
                  src={event.poster}
                  alt={`${event.title} Exhibition Poster`}
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
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                  CURATED FESTIVE SHOWCASE
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2A1C24] leading-tight">
                  {event.tagline || event.description}
                </h2>
              </div>
              <p className="text-sm sm:text-base font-sans text-[#5E4A55] leading-relaxed">
                {event.shortDescription || event.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenBooking ? onOpenBooking(event.title) : navigate('/book-a-stall')}
                  className="btn-sunset-gold px-8 py-3.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase text-[#2A1C24] shadow-md flex items-center space-x-2"
                >
                  <span>BOOK YOUR STALL</span>
                  <ArrowRight size={13} />
                </button>
                <Link
                  to="/visitors"
                  className="btn-editorial-outline px-7 py-3.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase"
                >
                  Plan Your Visit
                </Link>
              </div>
            </div>
          </div>

          {/* Who Can Exhibit & Value Proposition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {event.whoCanExhibit && (
              <div className="p-8 md:p-10 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
                <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                  CURATION CRITERIA
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24] mt-1 mb-6">
                  Who Can Exhibit
                </h3>
                <div className="space-y-4 text-xs font-sans text-[#2A1C24]">
                  {event.whoCanExhibit.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle size={16} className="text-[#B96535] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.whyExhibit && (
              <div className="p-8 md:p-10 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
                <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                  VALUE PROPOSITION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24] mt-1 mb-6">
                  Why Exhibit at UDAAN
                </h3>
                <div className="space-y-4 text-xs font-sans text-[#2A1C24]">
                  {event.whyExhibit.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Award size={16} className="text-[#B96535] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Curated Categories */}
          {event.categories && event.categories.length > 0 && (
            <div className="mb-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                    WHAT TO EXPECT
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                    Curated Categories &amp; Domains
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.categories.map((catName, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FFFBF5] p-6 rounded-3xl border border-[#E9AD83]/30 flex flex-col justify-between shadow-sm"
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
                      <button
                        onClick={() => onOpenBooking ? onOpenBooking(catName) : navigate('/book-a-stall')}
                        className="text-[10px] tracking-wider text-[#B96535] font-semibold uppercase hover:text-[#2A1C24]"
                      >
                        Enquire &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stall Options & Specifications */}
          {event.stallTypes && event.stallTypes.length > 0 && (
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
                        onClick={() => onOpenBooking ? onOpenBooking(tier.name) : navigate('/book-a-stall')}
                        className="btn-sunset-gold w-full py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24]"
                      >
                        Select Tier
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floor Plan Schematics CTA */}
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
        </div>
      )}

      {/* =========================================================================
          7. CONFIRMED SCHEDULE (Only rendered if verified data exists)
          ========================================================================= */}
      <ConfirmedSchedule event={event} />

      {/* =========================================================================
          8. VERIFIED VISITOR & VENUE ESSENTIALS
          Strict zero-hallucination data dossier for patrons.
          ========================================================================= */}
      <VisitorEssentials event={event} />

      {/* =========================================================================
          9. FAQS (If configured)
          ========================================================================= */}
      {event.faqs && event.faqs.length > 0 && (
        <section className="py-20 max-w-4xl mx-auto px-6">
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
        </section>
      )}

      {/* =========================================================================
          10. OTHER EDITIONS QUICK REGISTER
          ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-6 border-t border-[#E9AD83]/20">
        <div className="flex items-center justify-between mb-8">
          <h4 className="font-serif text-2xl text-[#2A1C24]">
            More UDAAN Landmark Exhibitions
          </h4>
          <Link to="/events" className="text-xs text-[#B96535] hover:text-[#2A1C24] font-semibold tracking-wider uppercase">
            View All &rarr;
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
                  {oe.dates || oe.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
