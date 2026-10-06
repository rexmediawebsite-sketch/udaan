import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import ScrollReveal from './ScrollReveal';
import { UdaanDiamond } from './UdaanIcons';
import { EVENTS_CATALOG, getEventBySlug } from '../data/eventsCatalog';
import { getEventLifecycleState, LIFECYCLE_STATES } from '../utils/eventLifecycle';

export default function HomeFeaturedTeaser({ onOpenBooking }) {
  // Pull flagship event from single source of truth
  const event = getEventBySlug('glamour-gala-diwali-edition-5') || EVENTS_CATALOG[0];
  const lifecycleState = getEventLifecycleState(event);

  // Dynamic state content per requirement 38
  let eyebrow = "WHAT'S NEXT AT UDAAN";
  let statusBadge = "COMING SOON";
  let badgeColor = "bg-[#4A1620] text-[#FFFAF2]";
  let pulseDot = false;
  let heroLinkText = "Full Exhibition Guide →";

  if (lifecycleState === LIFECYCLE_STATES.LIVE) {
    eyebrow = "UDAAN IS LIVE";
    statusBadge = "LIVE NOW";
    badgeColor = "bg-emerald-700 text-white";
    pulseDot = true;
    heroLinkText = "Join The Live Exhibition →";
  } else if (lifecycleState === LIFECYCLE_STATES.ARCHIVED) {
    eyebrow = "FROM THE UDAAN ARCHIVE";
    statusBadge = "EXPLORE THE MEMORIES";
    badgeColor = "bg-[#2B1B17] text-[#D9A441]";
    pulseDot = false;
    heroLinkText = "Explore Event Archive →";
  }

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden border-t border-[#D9A441]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Split Row Layout: Image 55% / Card 45%, Zero Overlap, Clean Editorial Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: 55% 3D Layered Glass Composition (Emerging from Screen) */}
          <ScrollReveal y={30} className="w-full lg:w-[55%] relative group">
            {/* 3D Perspective Stage */}
            <div 
              className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {/* Ambient Glow behind the emerging cards */}
              <div className="absolute w-[80%] h-[75%] bg-gradient-to-tr from-[#D9A441]/20 via-[#4A1620]/15 to-transparent rounded-full blur-3xl pointer-events-none transform -translate-y-4" />

              {/* LAYER 1: Deep Back Card (Angled & Soft Focus) */}
              <div 
                className="absolute left-[6%] sm:left-[10%] top-[8%] w-[62%] sm:w-[60%] h-[80%] rounded-[2rem] overflow-hidden border border-[#D9A441]/30 shadow-xl opacity-60 transition-all duration-700 ease-out group-hover:scale-98 group-hover:-translate-x-3 group-hover:-translate-y-2 pointer-events-none"
                style={{
                  transform: 'translateZ(-60px) rotate(-3deg)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"
                  alt="Fine Heirloom Polki Jewelry"
                  className="w-full h-full object-cover filter blur-[1px] brightness-95"
                />
                <div className="absolute inset-0 bg-[#FBF4EA]/25" />
              </div>

              {/* LAYER 2: Middle Translucent Glass Pane (Gold Frosted Sheen) */}
              <div 
                className="absolute left-[12%] sm:left-[16%] top-[12%] w-[64%] sm:w-[62%] h-[78%] rounded-[2rem] overflow-hidden border border-[#D9A441]/50 backdrop-blur-md shadow-[0_20px_45px_rgba(74,22,32,0.15)] transition-all duration-700 ease-out group-hover:scale-102 group-hover:-translate-x-1 group-hover:translate-y-1 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 250, 242, 0.45) 0%, rgba(217, 164, 65, 0.18) 50%, rgba(74, 22, 32, 0.12) 100%)',
                  transform: 'translateZ(-10px) rotate(-1deg)',
                }}
              >
                {/* Subtle glass refraction rim */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none opacity-60" />
              </div>

              {/* LAYER 3: Foreground Card (Sharp, Popping Forward with Royal Maroon Rim) */}
              <div 
                className="absolute right-[4%] sm:right-[8%] top-[2%] w-[68%] sm:w-[64%] h-[92%] rounded-[2.25rem] overflow-hidden border-2 border-[#4A1620]/70 shadow-[0_30px_70px_-15px_rgba(74,22,32,0.45)] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:translate-x-2 group-hover:-translate-y-2 z-20 cursor-pointer bg-[#FBF4EA]"
                style={{
                  transform: 'translateZ(40px) rotate(1.5deg)',
                }}
              >
                <img
                  src={event.poster || "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Surface Specular Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Verified Venue Tag in Maroon */}
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/50 text-[#FFFAF2] text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <UdaanDiamond size={9} className="text-[#D9A441]" />
                  <span>{event.city}'s Peak Festive Weekend</span>
                </div>

                {/* Bottom Quote Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/35 text-[#FFFAF2]">
                  <p className="font-serif italic text-xs sm:text-sm leading-snug text-[#FFFAF2]/95">
                    “Where Bihar's creative women transform bespoke passion into recognized powerhouses.”
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: 45% Editorial Information Card */}
          <ScrollReveal delay={0.15} y={30} className="w-full lg:w-[45%] space-y-6">
            <div className="space-y-3">
              {/* Lifecycle-Driven Badge per Requirement 38 */}
              <div className="relative inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D9A441]/60 bg-gradient-to-r from-[#FFFDF9] via-[#FFF5E4] to-[#FFFDF9] text-[11px] font-sans font-semibold tracking-[0.22em] text-[#B85C38] uppercase shadow-[0_4px_22px_-2px_rgba(217,164,65,0.32)] overflow-hidden">
                <div 
                  className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none animate-shine-sweep" 
                />

                {/* Pulsing Pill */}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${badgeColor} text-[9.5px] font-bold tracking-widest uppercase shadow-sm border border-[#D9A441]/40 shrink-0`}>
                  {pulseDot && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                  )}
                  <span>{statusBadge}</span>
                </span>

                {/* Title & Sparkling Diamond */}
                <span className="flex items-center gap-1.5 text-[#B85C38] font-bold">
                  <span>{eyebrow}</span>
                  <UdaanDiamond size={11} className="text-[#D9A441] animate-pulse" />
                </span>
              </div>

              <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] tracking-tight leading-[1.08]">
                {event.name} <span className="italic font-normal text-[#B85C38]">{event.edition}</span>
              </h2>

              <p className="font-hindi text-xl text-[#B8801F] leading-relaxed">
                {event.dateDisplay || event.date} • {event.venue}, {event.city}
              </p>
            </div>

            <p className="font-sans text-base text-[#2B1B17]/80 leading-relaxed font-light">
              {event.shortDescription || event.description}
            </p>

            {/* Quick Venue & Date Facts */}
            <div className="space-y-3 py-3 border-y border-[#D9A441]/25">
              <div className="flex items-center gap-3 text-sm font-sans text-[#2B1B17]">
                <Calendar size={18} className="text-[#B85C38] shrink-0" />
                <span className="font-medium">{event.dateDisplay || event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-sans text-[#2B1B17]">
                <Clock size={18} className="text-[#B85C38] shrink-0" />
                <span>{event.timings}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-sans text-[#2B1B17]">
                <MapPin size={18} className="text-[#B85C38] shrink-0" />
                <span>{event.hall}, {event.venue}, {event.city}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {lifecycleState === LIFECYCLE_STATES.UPCOMING && onOpenBooking && (
                <MagneticButton
                  onClick={() => onOpenBooking(event.title)}
                  cursorLabel="Book"
                  className="btn-gold-luxury px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md"
                >
                  Apply for Stall Allotment
                </MagneticButton>
              )}

              <Link
                to={`/events/${event.slug}`}
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-[#4A1620] hover:text-[#B8801F] transition-colors py-2 border-b border-transparent hover:border-[#B8801F]"
              >
                <span>{heroLinkText}</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
