import React from 'react';
import { CalendarCheck, ShieldCheck, TrendingUp, Megaphone, Coffee, Sparkles, ArrowRight } from 'lucide-react';

export default function WhyExhibit({ onOpenBooking }) {
  const benefits = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-[#E99A18]" />,
      title: "Peak Pre-Diwali Timing",
      desc: "Scheduled on October 24 & 25, 2026 — the ultimate annual weekend when Patna's high-net-worth families execute their festive wardrobe and festive gift shopping."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#397EAC]" />,
      title: "5-Star Luxury Credibility",
      desc: "Hosted at Tangerine Grand, Lemon Tree Premier. A prestigious address that elevates your brand identity and attracts affluent patrons who value luxury."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#B96535]" />,
      title: "High-Intent Shoppers",
      desc: "5,000+ affluent buyers, bridal shoppers, and corporate gift curators looking for genuine artisanal couture, gold and polki jewels, and luxury hampers."
    },
    {
      icon: <Megaphone className="w-6 h-6 text-[#E99A18]" />,
      title: "Multi-Channel Media Push",
      desc: "Comprehensive visibility across regional press, city billboards, targeted digital marketing, and dedicated influencer spotlights highlighting your label."
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#2A1C24]" />,
      title: "Turnkey Stall Infrastructure",
      desc: "Walk in ready to sell. Includes pre-assembled octanorm partition walls, custom printed brand fascia, high-lumen spotlights, power outlets, and continuous security."
    }
  ];

  return (
    <section id="why-exhibit" className="relative py-24 md:py-32 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
            <Sparkles size={12} className="text-[#B96535]" />
            <span>FOUNDER VALUE PROPOSITION</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-tight">
            Why Exhibit with <span className="italic font-light text-[#B96535]">Udaan</span>
          </h2>
          
          <p className="mt-4 text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed">
            We don't just sell stalls; we build a stage that accelerates your commerce, amplifies your prestige, and connects you with your most loyal lifelong clients.
          </p>
        </div>

        {/* 5 Benefits Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFBF5] border border-[#E9AD83]/30 hover:border-[#E99A18] p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(42,28,36,0.04)] hover:shadow-[0_12px_32px_rgba(233,154,24,0.1)]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF4EB] border border-[#E9AD83]/40 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif font-normal text-2xl text-[#2A1C24] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9AD83]/20 flex items-center text-[10px] tracking-[0.2em] uppercase text-[#B96535] font-semibold font-sans">
                <span>Guaranteed Standard</span>
              </div>
            </div>
          ))}

          {/* Quick Apply Card in the 6th Slot */}
          <div className="p-8 rounded-2xl bg-[#24141F] text-[#FFF1D9] border border-[#E9AD83]/35 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans">LIMITED INVENTORY</span>
              <h3 className="font-serif text-2xl text-[#FFF1D9] mt-2 leading-tight">
                Curated Allotments Closing Soon
              </h3>
              <p className="text-xs text-[#E9AD83] font-sans mt-3 leading-relaxed font-light">
                Stalls are allotted on a first-come, curated evaluation basis to ensure category exclusivity and maximum profitability for each exhibitor.
              </p>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="mt-6 btn-sunset-gold w-full py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg flex items-center justify-center space-x-2 text-[#1E121B]"
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
