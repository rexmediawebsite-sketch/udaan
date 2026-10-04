import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ShieldCheck, ArrowUpRight, Award, Users } from 'lucide-react';
import { FEATURED_EVENT } from '../data/eventData';

export default function FeaturedEvent({ onOpenBooking }) {
  const highlights = [
    { icon: <Calendar className="w-5 h-5 text-[#E5A93C]" />, label: "DATES", value: "24 & 25 OCT 2026", sub: "Saturday & Sunday" },
    { icon: <Clock className="w-5 h-5 text-[#E5A93C]" />, label: "TIMINGS", value: "11:00 AM – 9:00 PM", sub: "Both Days Open" },
    { icon: <MapPin className="w-5 h-5 text-[#E5A93C]" />, label: "VENUE", value: "Lemon Tree Premier", sub: "Tangerine Grand, Ground Floor" },
    { icon: <Sparkles className="w-5 h-5 text-[#E5A93C]" />, label: "OCCASION", value: "Diwali Edition 5", sub: "Festive Pre-Diwali Spree" },
  ];

  return (
    <section id="event" className="snap-chapter-slide relative py-24 md:py-32 bg-[#1C110F] overflow-hidden">
      {/* Subtle background atmospheric azure & divine amber glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E5A93C]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2B6C9E]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#251917]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
            <Sparkles size={12} className="text-[#E5A93C]" />
            <span>THE FEATURED EXHIBITION</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
            Glamour Gala <span className="italic font-light text-[#E5A93C]">Diwali Edition 5</span>
          </h2>
          
          <p className="mt-4 text-[#C2B8B5] text-sm sm:text-base font-sans font-light leading-relaxed">
            Patna's grandest celebration of festive luxury, heritage crafts, and modern fashion. Scheduled perfectly on the pre-Diwali weekend to capture Bihar's peak festive shopping season.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <div>
                <span className="text-[11px] tracking-[0.2em] text-[#E5A93C] uppercase font-sans font-semibold">
                  {item.label}
                </span>
                <h3 className="font-serif font-semibold text-lg text-[#FAF6F0] mt-1 tracking-wide">
                  {item.value}
                </h3>
                <p className="text-xs text-[#C2B8B5] font-sans mt-0.5 font-light">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Grand Venue & Experience Spotlight Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E5A93C]/25 bg-gradient-to-br from-[#251917] via-[#1C110F] to-[#160B0A] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] font-sans font-semibold tracking-[0.25em] text-[#E5A93C] uppercase">
                5-STAR LUXURY DESTINATION
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0] leading-tight tracking-[0.03em]">
                Lemon Tree Premier <span className="font-sans font-light text-2xl text-[#C2B8B5] block sm:inline">• Tangerine Grand</span>
              </h3>

              <p className="text-[#C2B8B5] text-sm leading-relaxed font-light font-sans">
                Located on Exhibition Road in the very heart of Patna, Tangerine Grand offers an expansive pillarless luxury banquet hall with central air-conditioning, high ceilings, dedicated valet parking, and seamless loading logistics for exhibitors.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs tracking-wider text-[#F3D2A2] font-sans">
                <span className="flex items-center"><ShieldCheck size={14} className="mr-1.5 text-[#E5A93C]" /> Curated 50+ Premium Stalls</span>
                <span className="flex items-center"><Users size={14} className="mr-1.5 text-[#E5A93C]" /> 5,000+ Expected Festive Buyers</span>
                <span className="flex items-center"><Award size={14} className="mr-1.5 text-[#E5A93C]" /> 100% Verified Women Founders</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs font-sans tracking-[0.22em] uppercase hover:bg-[#F3D2A2] transition-colors shadow-lg"
                >
                  Book a Stall Now
                </button>
                <a
                  href="#stall-map"
                  className="btn-ghost-pill w-full sm:w-auto text-center px-6 py-3.5 rounded-full text-[#FAF6F0] hover:text-[#E5A93C] font-sans font-medium text-xs tracking-[0.22em] uppercase transition-all"
                >
                  View Floor Map
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5A93C]/20 aspect-[4/3] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                  alt="Lemon Tree Premier Tangerine Grand Exhibition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160B0A]/95 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans">VENUE LOCATION</span>
                  <span className="text-sm font-serif text-[#FAF6F0] font-medium">Exhibition Road, Near Gandhi Maidan, Patna</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
