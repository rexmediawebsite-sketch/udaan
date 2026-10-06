import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Radio, 
  Sparkles, 
  Navigation as NavIcon,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { UdaanDiamond, UdaanEmblem } from '../UdaanIcons';
import { LIFECYCLE_STATES, getStatePresentation, getConfirmedCountdown } from '../../utils/eventLifecycle';

export default function EventHeroState({
  event,
  lifecycleState,
  onOpenBooking,
}) {
  const presentation = getStatePresentation(lifecycleState, event);

  // Live real-time countdown (ONLY when confirmed future date exists)
  const [countdown, setCountdown] = useState(
    lifecycleState === LIFECYCLE_STATES.UPCOMING ? getConfirmedCountdown(event.startDate) : null
  );

  useEffect(() => {
    if (lifecycleState !== LIFECYCLE_STATES.UPCOMING || !event.startDate) return;

    const timer = setInterval(() => {
      const cd = getConfirmedCountdown(event.startDate);
      setCountdown(cd);
    }, 1000);

    return () => clearInterval(timer);
  }, [lifecycleState, event.startDate]);

  // Select appropriate background image based on state
  const bgImage = 
    lifecycleState === LIFECYCLE_STATES.LIVE && event.liveHeroImage
      ? event.liveHeroImage
      : lifecycleState === LIFECYCLE_STATES.ARCHIVED && event.archiveHeroImage
      ? event.archiveHeroImage
      : event.heroImage || event.poster;

  return (
    <section 
      className="relative w-full min-h-[92vh] lg:min-h-[96vh] overflow-hidden text-center flex flex-col justify-between items-center select-none bg-[#12090F] text-[#FFFAF2] transition-colors duration-700"
    >
      {/* Background Image with Atmospheric Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center filter saturate-[1.1] contrast-[1.08] transition-all duration-1000"
        style={{
          backgroundImage: `url('${bgImage}')`,
          opacity: lifecycleState === LIFECYCLE_STATES.ARCHIVED ? 0.38 : 0.45,
        }}
      />

      {/* Cinematic Vignettes based on state */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${
        lifecycleState === LIFECYCLE_STATES.LIVE
          ? 'bg-gradient-to-b from-[#1C060D]/90 via-[#4A1620]/45 to-[#12090F]/95'
          : lifecycleState === LIFECYCLE_STATES.ARCHIVED
          ? 'bg-gradient-to-b from-[#1C1217]/90 via-[#2B1B17]/60 to-[#12090F]/95'
          : 'bg-gradient-to-b from-[#171416]/90 via-[#4A1620]/35 to-[#12090F]/95'
      }`} />
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,9,15,0.85)_100%)] pointer-events-none" />

      {/* Top Eyebrow Status Pill */}
      <div className="pt-28 md:pt-36 z-10 animate-fadeIn">
        {lifecycleState === LIFECYCLE_STATES.LIVE ? (
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-emerald-500/50 bg-[#1C0810]/80 backdrop-blur-md text-[11px] font-sans font-bold tracking-[0.25em] text-emerald-400 uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>● LIVE NOW</span>
            <span className="text-white/40">•</span>
            <span className="text-[#FFFAF2]/80">{event.city}</span>
          </div>
        ) : lifecycleState === LIFECYCLE_STATES.ARCHIVED ? (
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#1C1217]/80 backdrop-blur-md text-[11px] font-sans font-medium tracking-[0.28em] text-[#D9A441] uppercase shadow-sm">
            <UdaanDiamond size={10} className="text-[#D9A441]" />
            <span>FROM THE UDAAN ARCHIVE • {event.year || '2026'}</span>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#171416]/80 backdrop-blur-md text-[11px] font-sans font-medium tracking-[0.28em] text-[#D9A441] uppercase shadow-sm">
            <UdaanDiamond size={10} className="text-[#D9A441]" />
            <span>{presentation.statusLabel}</span>
          </div>
        )}
      </div>

      {/* Hero Center Editorial Composition */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 my-auto space-y-5 animate-fadeIn">
        
        {/* State-Driven Headline */}
        <h1 className="font-serif tracking-tight leading-[0.98]">
          <span className="block text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.14em] text-[#FFFAF2]/90 uppercase">
            {presentation.heroHeadlinePrefix}
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-bold tracking-[0.12em] text-[#FFFAF2] uppercase drop-shadow-[0_8px_35px_rgba(0,0,0,0.9)]">
            {presentation.heroHeadlineEmphasized}
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFFAF2] via-[#F3CE86] to-[#D9A441] tracking-wide pt-2">
            {event.name} • {event.edition}
          </span>
        </h1>

        {/* Venue & Date Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.18em] uppercase text-[#D9A441] max-w-2xl mx-auto font-light leading-relaxed">
          {event.dateDisplay || event.date} • {event.venueDetails?.hall || event.hall || event.venue} • {event.city}
        </p>

        {/* State-Driven Countdown (STRICT: Only for UPCOMING with confirmed future date) */}
        {lifecycleState === LIFECYCLE_STATES.UPCOMING && countdown && (
          <div className="pt-2 pb-1 flex items-center justify-center gap-3 sm:gap-6 text-center select-none animate-fadeIn">
            {[
              { val: countdown.days, unit: 'DAYS' },
              { val: countdown.hours, unit: 'HOURS' },
              { val: countdown.minutes, unit: 'MINUTES' },
              { val: countdown.seconds, unit: 'SECONDS' },
            ].map((cd, idx) => (
              <div 
                key={idx}
                className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-black/40 border border-[#D9A441]/30 backdrop-blur-md min-w-[64px] sm:min-w-[80px]"
              >
                <span className="block font-serif text-xl sm:text-3xl font-bold text-[#FFFAF2] leading-none">
                  {String(cd.val).padStart(2, '0')}
                </span>
                <span className="block text-[8px] sm:text-[9px] font-mono tracking-widest text-[#D9A441] uppercase pt-1">
                  {cd.unit}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action CTAs based on Lifecycle State */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {lifecycleState === LIFECYCLE_STATES.LIVE ? (
            <>
              <Link
                to="/visitors"
                className="w-full sm:w-auto btn-gold-luxury px-8 py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 size={14} />
                <span>REGISTER TO VISIT (VIP PASS)</span>
              </Link>

              <a
                href={event.venueDetails?.googleMapsUrl || '#venue-info'}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 text-[#FFFAF2] text-xs font-sans tracking-[0.2em] uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <NavIcon size={14} className="text-[#D9A441]" />
                <span>GET DIRECTIONS TO VENUE</span>
              </a>
            </>
          ) : lifecycleState === LIFECYCLE_STATES.ARCHIVED ? (
            <>
              <a
                href="#archive-gallery"
                className="w-full sm:w-auto btn-gold-luxury px-8 py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl cursor-pointer"
              >
                EXPLORE ARCHIVE GALLERY ↓
              </a>

              <Link
                to="/events"
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 text-[#FFFAF2] text-xs font-sans tracking-[0.2em] uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>EXPLORE UPCOMING EDITIONS</span>
                <ArrowRight size={14} className="text-[#D9A441]" />
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : null}
                className="w-full sm:w-auto btn-gold-luxury px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase shadow-[0_8px_30px_rgba(217,164,65,0.4)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                BOOK YOUR STALL →
              </button>

              <Link
                to="/visitors"
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 text-[#FFFAF2] text-xs font-sans tracking-[0.2em] uppercase transition-all backdrop-blur-md cursor-pointer"
              >
                PLAN YOUR VISIT
              </Link>
            </>
          )}
        </div>

        {/* Live Internal Section Navigation Pill (ONLY for LIVE state) */}
        {lifecycleState === LIFECYCLE_STATES.LIVE && (
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-sans tracking-widest uppercase">
            {[
              { id: 'live-feed', label: 'LIVE FEED' },
              { id: 'floor-stream', label: 'FROM THE FLOOR' },
              { id: 'meet-brands', label: 'MEET THE BRANDS' },
              { id: 'floor-map', label: 'EXPLORE FLOOR' },
              { id: 'visitor-info', label: 'VISITOR ESSENTIALS' },
            ].map((pill, idx) => (
              <a
                key={idx}
                href={`#${pill.id}`}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#D9A441]/20 border border-white/15 hover:border-[#D9A441]/50 text-[#FFFAF2]/80 hover:text-[#D9A441] transition-all"
              >
                {pill.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer Info Strip */}
      <div className="pb-8 z-10 space-y-1">
        <div className="text-[11px] font-sans font-medium tracking-[0.28em] uppercase text-[#FFFAF2]/70">
          {event.timings} • {event.venueDetails?.address || event.location}
        </div>
        <div className="text-[9px] font-mono tracking-widest text-[#D9A441]/80 uppercase">
          TANGERINE GRAND • 5-STAR CLIMATE-CONTROLLED VENUE
        </div>
      </div>
    </section>
  );
}
