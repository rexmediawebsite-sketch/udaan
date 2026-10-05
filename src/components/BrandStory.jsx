import React from 'react';
import { Compass, Award, Network, TrendingUp, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/eventData';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import { UdaanDiamond } from './UdaanIcons';

export default function BrandStory({ onOpenBooking }) {
  const pillars = [
    {
      step: "01",
      title: "DISCOVER",
      hindi: "खोज",
      subtitle: "Curated Talents",
      desc: "We scrupulously scout and handpick visionary women designers, master textile revivalists, and lifestyle creators across Eastern India.",
      icon: <Compass className="w-5 h-5 text-[#B85C38]" />,
      borderTop: "border-[#B85C38]",
      accentBg: "bg-[#FBF4EA]",
    },
    {
      step: "02",
      title: "EXHIBIT",
      hindi: "प्रदर्शन",
      subtitle: "5-Star Canvas",
      desc: "We build turnkey, high-aesthetic exhibition spaces at 5-star addresses like Lemon Tree Premier, giving your label immediate luxury prestige.",
      icon: <Award className="w-5 h-5 text-[#D9A441]" />,
      borderTop: "border-[#D9A441]",
      accentBg: "bg-[#FFFAF2]",
    },
    {
      step: "03",
      title: "CONNECT",
      hindi: "संपर्क",
      subtitle: "Elite Patrons",
      desc: "Direct, high-intent commerce with 5,000+ affluent buyers, bridal shoppers, and corporate gift curators ready to purchase bespoke goods.",
      icon: <Network className="w-5 h-5 text-[#B8801F]" />,
      borderTop: "border-[#B8801F]",
      accentBg: "bg-[#FBF4EA]",
    },
    {
      step: "04",
      title: "GROW",
      hindi: "प्रगति",
      subtitle: "Brand Elevation",
      desc: "Transform bespoke local creativity into recognized, enduring luxury enterprises through press visibility and dedicated spotlights.",
      icon: <TrendingUp className="w-5 h-5 text-[#4A1620]" />,
      borderTop: "border-[#4A1620]",
      accentBg: "bg-[#FFFAF2]",
    }
  ];

  return (
    <section id="story" className="relative py-24 md:py-32 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden border-t border-[#D9A441]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Brand Narrative Header */}
        <ScrollReveal y={25}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B85C38] uppercase shadow-sm">
                <UdaanDiamond size={10} className="text-[#D9A441]" />
                <span>THE UDAAN ECOSYSTEM</span>
              </div>

              <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] leading-[1.08] tracking-tight">
                Where Women <br />
                <span className="italic font-normal text-[#B85C38]">Build Brands.</span>
              </h2>

              <div className="mt-4 flex items-center space-x-3 text-sm font-sans tracking-[0.2em] text-[#2B1B17]/70">
                <span className="font-hindi text-xl text-[#2B1B17] font-semibold">{BRAND.hindiName}</span>
                <span className="text-[#D9A441]">•</span>
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B85C38] font-semibold">
                  {BRAND.tagline}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="text-[#2B1B17]/80 text-base font-sans font-light leading-relaxed">
                UDAAN is not merely an event organizer. We are an enduring cultural and commercial launchpad tailored exclusively for women entrepreneurs, master artisans, and creative founders.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Pillars: Progressive Editorial Flow with Stagger Reveal */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <StaggerItem key={idx}>
              <div
                className={`h-full p-7 rounded-3xl bg-[#FFFFFF] border border-[#D9A441]/30 border-t-4 ${item.borderTop} flex flex-col justify-between shadow-[0_10px_30px_rgba(43,27,23,0.06)] card-luxury-hover group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-cinzel font-bold text-3xl text-[#D9A441] tracking-wider group-hover:scale-105 transition-transform">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl icon-disc-gold shadow-md">
                      {item.icon}
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#B85C38] font-bold font-sans">
                      {item.subtitle}
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[#2B1B17] mt-1 flex items-center space-x-2">
                      <span>{item.title}</span>
                      <span className="text-sm font-hindi font-normal text-stone-500">({item.hindi})</span>
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-light mt-3 font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#B8801F] font-semibold font-sans">
                  <span>Phase Milestone</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] group-hover:scale-150 transition-transform" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Brand Mission Callout */}
        <ScrollReveal delay={0.2} y={20}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3 sm:px-6 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] shadow-lg animate-pulse-glow">
              <span className="px-4 py-1.5 rounded-full bg-[#4A1620] text-[#FFFAF2] border border-[#D9A441]/40 text-xs font-sans tracking-[0.2em] font-semibold uppercase shadow-sm">
                FOUNDER INVITATION
              </span>
              <span className="text-xs sm:text-sm text-[#2B1B17] font-sans px-2 font-medium">
                Ready to take your boutique, couture or artisanal craft to Bihar’s grandest stage?
              </span>
              <button
                onClick={() => onOpenBooking()}
                className="btn-gold-luxury px-7 py-3 rounded-full text-xs font-sans tracking-wider uppercase font-bold text-[#2B1B17] flex items-center gap-2 cursor-pointer shadow-md hover:shadow-xl"
              >
                <span>Apply to Exhibit</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
