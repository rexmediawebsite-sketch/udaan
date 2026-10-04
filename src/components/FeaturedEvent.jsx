import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ShieldCheck, Award, Users } from 'lucide-react';
import { FEATURED_EVENT } from '../data/eventData';

export default function FeaturedEvent({ onOpenBooking }) {
  const highlights = [
    { 
      icon: <Calendar className="w-5 h-5 text-[#E99A18]" />, 
      badgeBg: "bg-[#F6B51F]/15 border-[#E99A18]/30",
      label: "DATES", 
      value: "24 & 25 OCT 2026", 
      sub: "Saturday & Sunday" 
    },
    { 
      icon: <Clock className="w-5 h-5 text-[#397EAC]" />, 
      badgeBg: "bg-[#397EAC]/15 border-[#397EAC]/30",
      label: "TIMINGS", 
      value: "11:00 AM – 9:00 PM", 
      sub: "Both Days Open" 
    },
    { 
      icon: <MapPin className="w-5 h-5 text-[#B96535]" />, 
      badgeBg: "bg-[#B96535]/15 border-[#B96535]/30",
      label: "VENUE", 
      value: "Lemon Tree Premier", 
      sub: "Tangerine Grand, Ground Floor" 
    },
    { 
      icon: <Sparkles className="w-5 h-5 text-[#E99A18]" />, 
      badgeBg: "bg-[#F6B51F]/15 border-[#E99A18]/30",
      label: "OCCASION", 
      value: "Diwali Edition 5", 
      sub: "Festive Pre-Diwali Spree" 
    },
  ];

  return (
    <section id="event" className="snap-chapter-slide relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#22131D] to-[#180E15] text-[#FFF1D9] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#F6B51F]/45 bg-[#251520] text-[11px] font-sans font-bold tracking-[0.25em] text-[#F6B51F] uppercase mb-4 shadow-xl">
            <Sparkles size={12} className="text-[#F6B51F]" />
            <span>THE FEATURED EXHIBITION</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FFF1D9] tracking-[0.02em] leading-tight">
            Glamour Gala <span className="italic font-light text-[#F6B51F]">Diwali Edition 5</span>
          </h2>
          
          <p className="mt-4 text-[#E9AD83] text-sm sm:text-base font-sans font-light leading-relaxed">
            Patna's grandest celebration of festive luxury, heritage crafts, and modern fashion. Scheduled perfectly on the pre-Diwali weekend to capture Bihar's peak festive shopping season.
          </p>
        </div>

        {/* 4 Feature Information Cards (Solid, velvety plum panels with crisp amber outlines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#24141F] border border-[#E9AD83]/25 hover:border-[#F6B51F] p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_12px_36px_rgba(246,181,31,0.15)]"
            >
              <div className={`w-11 h-11 rounded-xl ${item.badgeBg} border flex items-center justify-center mb-5`}>
                {item.icon}
              </div>
              <div>
                <span className="text-[11px] tracking-[0.2em] text-[#F6B51F] uppercase font-sans font-bold">
                  {item.label}
                </span>
                <h3 className="font-serif font-semibold text-xl text-[#FFF1D9] mt-1 tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs text-[#E9AD83] font-sans mt-1 font-light">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Grand Venue & Experience Spotlight Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E9AD83]/30 bg-gradient-to-br from-[#2D1826] via-[#351B2C] to-[#20121C] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3.5 py-1 rounded-full border border-[#397EAC]/40 bg-[#397EAC]/15 text-[11px] font-sans font-bold tracking-[0.25em] text-[#397EAC] uppercase">
                5-STAR LUXURY DESTINATION
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FFF1D9] leading-tight tracking-[0.02em]">
                Lemon Tree Premier <span className="font-sans font-light text-2xl text-[#E9AD83] block sm:inline">• Tangerine Grand</span>
              </h3>

              <p className="text-[#E9AD83]/90 text-sm leading-relaxed font-light font-sans">
                Located on Exhibition Road in the very heart of Patna, Tangerine Grand offers an expansive pillarless luxury banquet hall with central air-conditioning, high ceilings, dedicated valet parking, and seamless loading logistics for exhibitors.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs tracking-wider text-[#FFF1D9] font-sans font-medium">
                <span className="flex items-center"><ShieldCheck size={15} className="mr-1.5 text-[#F6B51F]" /> Curated 50+ Premium Stalls</span>
                <span className="flex items-center"><Users size={15} className="mr-1.5 text-[#397EAC]" /> 5,000+ Expected Festive Buyers</span>
                <span className="flex items-center"><Award size={15} className="mr-1.5 text-[#B96535]" /> 100% Verified Women Founders</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="btn-sunset-gold w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.22em] shadow-xl"
                >
                  Book a Stall Now
                </button>
                <a
                  href="#stall-map"
                  className="btn-sunset-ghost-dark w-full sm:w-auto text-center px-6 py-3.5 rounded-full text-[#FFF1D9] hover:text-[#F6B51F] font-sans font-semibold text-xs tracking-[0.22em] uppercase transition-all"
                >
                  View Floor Map
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E9AD83]/40 aspect-[4/3] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                  alt="Lemon Tree Premier Tangerine Grand Exhibition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1017]/95 via-[#1A1017]/30 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-bold font-sans">VENUE LOCATION</span>
                  <span className="text-sm font-serif text-[#FFF1D9] font-medium">Exhibition Road, Near Gandhi Maidan, Patna</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
