import React from 'react';
import { Compass, Sparkles, Network, TrendingUp, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/eventData';

export default function BrandStory({ onOpenBooking }) {
  const pillars = [
    {
      step: "01",
      title: "DISCOVER",
      hindi: "खोज",
      subtitle: "Curated Talents",
      desc: "We scrupulously scout and handpick visionary women designers, master textile revivalists, and lifestyle creators across Eastern India.",
      icon: <Compass className="w-5 h-5 text-[#397EAC]" />,
      borderTop: "border-[#397EAC]",
      accentBg: "bg-[#EBF3F8]",
    },
    {
      step: "02",
      title: "EXHIBIT",
      hindi: "प्रदर्शन",
      subtitle: "5-Star Canvas",
      desc: "We build turnkey, high-aesthetic exhibition spaces at 5-star addresses like Lemon Tree Premier, giving your label immediate luxury prestige.",
      icon: <Sparkles className="w-5 h-5 text-[#E99A18]" />,
      borderTop: "border-[#E99A18]",
      accentBg: "bg-[#FFF1D9]",
    },
    {
      step: "03",
      title: "CONNECT",
      hindi: "संपर्क",
      subtitle: "Elite Patrons",
      desc: "Direct, high-intent commerce with 5,000+ affluent buyers, bridal shoppers, and corporate gift curators ready to purchase bespoke goods.",
      icon: <Network className="w-5 h-5 text-[#B96535]" />,
      borderTop: "border-[#B96535]",
      accentBg: "bg-[#FDF0E8]",
    },
    {
      step: "04",
      title: "GROW",
      hindi: "प्रगति",
      subtitle: "Brand Elevation",
      desc: "Transform bespoke local creativity into recognized, enduring luxury enterprises through press visibility and dedicated social spotlights.",
      icon: <TrendingUp className="w-5 h-5 text-[#2A1C24]" />,
      borderTop: "border-[#2A1C24]",
      accentBg: "bg-[#FAF4EB]",
    }
  ];

  return (
    <section id="story" className="relative py-24 md:py-32 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Brand Narrative Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#B96535]" />
              <span>THE UDAAN ECOSYSTEM</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] leading-[1.08] tracking-[0.02em]">
              Where Women <br />
              <span className="italic font-light text-[#B96535]">Build Brands.</span>
            </h2>

            <div className="mt-4 flex items-center space-x-3 text-sm font-sans tracking-[0.2em] text-[#5E4A55]">
              <span className="font-serif text-lg text-[#2A1C24] font-medium">{BRAND.hindiName}</span>
              <span className="text-[#E9AD83]">•</span>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B96535] font-semibold">
                {BRAND.tagline}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed">
              Udaan is not merely an event organizer. We are an enduring cultural and commercial launchpad tailored exclusively for women entrepreneurs, master artisans, and creative founders.
            </p>
          </div>
        </div>

        {/* 4 Pillars: Progressive Editorial Flow (No repetitive dark boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 border-t-4 ${item.borderTop} flex flex-col justify-between shadow-[0_4px_20px_rgba(42,28,36,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(185,101,53,0.1)]`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-light text-3xl text-[#E9AD83]">
                    {item.step}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${item.accentBg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#B96535] font-semibold font-sans">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif font-normal text-2xl text-[#2A1C24] mt-1 flex items-center space-x-2">
                    <span>{item.title}</span>
                    <span className="text-xs font-serif font-normal text-[#5E4A55]">({item.hindi})</span>
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#5E4A55] leading-relaxed font-light mt-3 font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9AD83]/20 flex items-center text-[11px] tracking-[0.2em] uppercase text-[#B96535] font-semibold font-sans">
                <span>Phase Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mission Callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3 sm:px-6 rounded-2xl border border-[#E9AD83]/40 bg-[#FFFBF5] shadow-md">
            <span className="px-4 py-1.5 rounded-full bg-[#FAF4EB] border border-[#E99A18]/40 text-[#B96535] text-xs font-sans tracking-[0.2em] font-semibold uppercase">
              FOUNDER INVITATION
            </span>
            <span className="text-xs sm:text-sm text-[#2A1C24] font-sans px-2">
              Ready to take your boutique, couture or artisanal craft to Bihar’s grandest stage?
            </span>
            <button
              onClick={() => onOpenBooking()}
              className="btn-sunset-gold px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase font-semibold text-[#1E121B]"
            >
              Apply to Exhibit &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
