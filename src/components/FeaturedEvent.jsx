import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ShieldCheck, Award, Users, ArrowRight } from 'lucide-react';
import { FEATURED_EVENT } from '../data/eventData';

export default function FeaturedEvent({ onOpenBooking }) {
  const eventFacts = [
    {
      label: "EXHIBITION DATES",
      value: "24 & 25 OCT 2026",
      detail: "Saturday & Sunday • Peak Diwali Shopping",
      accent: "text-[#B96535]",
      icon: <Calendar className="w-5 h-5 text-[#B96535]" />,
    },
    {
      label: "SHOW HOURS",
      value: "11:00 AM – 9:00 PM",
      detail: "Both days open for VIP & public entry",
      accent: "text-[#397EAC]",
      icon: <Clock className="w-5 h-5 text-[#397EAC]" />,
    },
    {
      label: "LUXURY VENUE",
      value: "Lemon Tree Premier",
      detail: "Tangerine Grand • Ground Floor Patna",
      accent: "text-[#E99A18]",
      icon: <MapPin className="w-5 h-5 text-[#E99A18]" />,
    },
  ];

  return (
    <section id="event" className="relative py-20 md:py-28 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E99A18]/40 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#E99A18]" />
              <span>FLAGSHIP FESTIVE EXHIBITION</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-[1.12]">
              Glamour Gala <span className="italic font-light text-[#B96535]">Diwali Edition 5</span>
            </h2>
          </div>

          <p className="max-w-md text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed">
            Patna’s premier festive luxury exhibition. Scheduled on the final pre-Diwali weekend to capture Eastern India's peak annual shopping season for high-end couture, heirloom jewellery, and celebratory gifting.
          </p>
        </div>

        {/* Editorial Information Spread (Asymmetric, non-repetitive layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          
          {/* Left Column: Verified Event Facts */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {eventFacts.map((fact, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 flex items-start space-x-4 shadow-[0_4px_20px_rgba(42,28,36,0.04)] transition-all duration-300 hover:border-[#E99A18]/60"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF4EB] border border-[#E9AD83]/30 flex items-center justify-center shrink-0 mt-0.5">
                  {fact.icon}
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.22em] font-sans font-semibold uppercase text-[#5E4A55]">
                    {fact.label}
                  </span>
                  <h3 className={`font-serif text-2xl font-normal mt-0.5 ${fact.accent}`}>
                    {fact.value}
                  </h3>
                  <p className="text-xs text-[#5E4A55] font-sans mt-0.5 font-light">
                    {fact.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Venue & Allotment Feature Block */}
          <div className="lg:col-span-7 rounded-3xl bg-[#24141F] text-[#FFF1D9] p-8 md:p-10 flex flex-col justify-between border border-[#E9AD83]/30 shadow-xl relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans">
                <ShieldCheck size={13} className="text-[#F6B51F]" />
                <span>5-STAR EXHIBITION DESTINATION</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FFF1D9] leading-tight">
                Tangerine Grand at Lemon Tree Premier
              </h3>

              <p className="text-xs sm:text-sm text-[#E9AD83]/90 font-sans font-light leading-relaxed max-w-xl">
                Set in Patna’s prestigious Exhibition Road district, Tangerine Grand provides an expansive pillarless hall with climate control, professional spotlights, full power backup, and continuous security for exhibitors and affluent guests.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-sans text-[#FFF1D9]/90">
                <div className="p-3 rounded-xl bg-[#180E15]/70 border border-[#E9AD83]/20 flex items-center space-x-2">
                  <Award size={14} className="text-[#F6B51F] shrink-0" />
                  <span>50+ Curated Stalls</span>
                </div>
                <div className="p-3 rounded-xl bg-[#180E15]/70 border border-[#E9AD83]/20 flex items-center space-x-2">
                  <Users size={14} className="text-[#74B6E2] shrink-0" />
                  <span>5,000+ Buyers</span>
                </div>
                <div className="p-3 rounded-xl bg-[#180E15]/70 border border-[#E9AD83]/20 flex items-center space-x-2">
                  <ShieldCheck size={14} className="text-[#E9AD83] shrink-0" />
                  <span>Turnkey Setup</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E9AD83]/20 flex flex-col sm:flex-row items-center gap-4 relative z-10">
              <button
                onClick={() => onOpenBooking()}
                className="btn-sunset-gold w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg flex items-center justify-center space-x-2 text-[#180E15]"
              >
                <span>Apply for Stall Allotment</span>
                <ArrowRight size={13} />
              </button>

              <a
                href="#stall-map"
                className="btn-sunset-ghost-dark w-full sm:w-auto text-center px-6 py-3.5 rounded-full text-xs tracking-[0.22em] uppercase font-sans font-semibold text-[#FFF1D9] hover:text-[#F6B51F] transition-all"
              >
                Inspect Stall Layout
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
