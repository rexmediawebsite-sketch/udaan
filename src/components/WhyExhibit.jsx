import React from 'react';
import { CalendarCheck, ShieldCheck, TrendingUp, Megaphone, Coffee, Sparkles, ArrowRight } from 'lucide-react';

export default function WhyExhibit({ onOpenBooking }) {
  const benefits = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-[#E5A93C]" />,
      title: "Peak Pre-Diwali Timing",
      desc: "Scheduled on October 24 & 25, 2026 — the ultimate annual weekend when Patna's high-net-worth families execute their festive wardrobe and festive gift shopping."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#E5A93C]" />,
      title: "5-Star Luxury Credibility",
      desc: "Hosted at Tangerine Grand, Lemon Tree Premier. A prestigious address that elevates your brand identity and attracts affluent patrons who value luxury."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#E5A93C]" />,
      title: "High-Intent Shoppers",
      desc: "5,000+ affluent buyers, bridal shoppers, and corporate gift curators looking for genuine artisanal couture, gold and polki jewels, and luxury hampers."
    },
    {
      icon: <Megaphone className="w-6 h-6 text-[#E5A93C]" />,
      title: "Multi-Channel Media Push",
      desc: "Comprehensive visibility across regional press, city billboards, targeted digital marketing, and dedicated influencer spotlights highlighting your label."
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#E5A93C]" />,
      title: "Turnkey Stall Infrastructure",
      desc: "Walk in ready to sell. Includes pre-assembled octanorm partition walls, custom printed brand fascia, high-lumen spotlights, power outlets, and continuous security."
    }
  ];

  return (
    <section id="why-exhibit" className="relative py-24 md:py-32 bg-[#251917] overflow-hidden border-t border-b border-[#E5A93C]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#1C110F]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
            <Sparkles size={12} className="text-[#E5A93C]" />
            <span>FOUNDER VALUE PROPOSITION</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
            Why Exhibit with <span className="italic font-light text-[#E5A93C]">Udaan</span>
          </h2>
          
          <p className="mt-4 text-[#C2B8B5] text-sm sm:text-base font-sans font-light leading-relaxed">
            We don't just sell stalls; we build a stage that accelerates your commerce, amplifies your prestige, and connects you with your most loyal lifelong clients.
          </p>
        </div>

        {/* 5 Benefits Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif font-medium text-2xl text-[#FAF6F0] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C2B8B5] font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[10px] tracking-[0.2em] uppercase text-[#E5A93C] font-semibold font-sans">
                <span>Guaranteed Standard</span>
              </div>
            </div>
          ))}

          {/* Quick Apply Card in the 6th Slot */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#251917] via-[#1C110F] to-[#160B0A] border border-[#E5A93C]/40 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans">LIMITED INVENTORY</span>
              <h3 className="font-serif text-2xl text-[#FAF6F0] mt-2 leading-tight">
                Curated Allotments Closing Soon
              </h3>
              <p className="text-xs text-[#C2B8B5] font-sans mt-3 leading-relaxed font-light">
                Stalls are allotted on a first-come, curated evaluation basis to ensure category exclusivity and maximum profitability for each exhibitor.
              </p>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="mt-6 w-full py-3.5 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#F3D2A2] transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Apply for Stall Allotment</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
