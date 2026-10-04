import React from 'react';
import { Compass, Sparkles, Network, TrendingUp, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/eventData';

export default function BrandStory({ onOpenBooking }) {
  const steps = [
    {
      step: "01",
      title: "DISCOVER",
      hindi: "खोज",
      tagline: "Curated Talents",
      desc: "We scrupulously scout, handpick, and evaluate high-caliber women designers, heritage craftswomen, and modern lifestyle creators.",
      icon: <Compass className="w-5 h-5 text-[#397EAC]" />,
      accent: "blue"
    },
    {
      step: "02",
      title: "EXHIBIT",
      hindi: "प्रदर्शन",
      tagline: "Grand Canvas",
      desc: "We build turnkey, 5-star exhibition spaces at prime luxury properties, providing your brand an aesthetically unparalleled physical presence.",
      icon: <Sparkles className="w-5 h-5 text-[#E99A18]" />,
      accent: "gold"
    },
    {
      step: "03",
      title: "CONNECT",
      hindi: "संपर्क",
      tagline: "Elite Patrons",
      desc: "Direct, high-conversion engagements with Bihar's most discerning shoppers, tastemakers, stylists, and institutional festive buyers.",
      icon: <Network className="w-5 h-5 text-[#B96535]" />,
      accent: "orange"
    },
    {
      step: "04",
      title: "GROW",
      hindi: "प्रगति",
      tagline: "Brand Elevation",
      desc: "Turn individual creativity into recognizable, scalable commerce with press visibility, digital reach, and enduring brand prestige.",
      icon: <TrendingUp className="w-5 h-5 text-[#49313E]" />,
      accent: "plum"
    }
  ];

  return (
    <section id="story" className="relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#21121C] to-[#180E15] text-[#FFF1D9] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Brand Narrative Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#F6B51F]/45 bg-[#251520] text-[11px] font-sans font-medium tracking-[0.25em] text-[#F6B51F] uppercase mb-4 shadow-xl">
              <Sparkles size={12} className="text-[#F6B51F]" />
              <span>THE UDAAN ECOSYSTEM</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FFF1D9] leading-[1.08] tracking-[0.02em]">
              Where Women <br />
              <span className="italic font-light text-[#F6B51F]">Build Brands.</span>
            </h2>

            <div className="mt-4 flex items-center space-x-3 text-sm font-sans tracking-[0.2em] text-[#F6B51F]">
              <span className="font-serif text-lg text-[#FFF1D9] font-medium">{BRAND.hindiName}</span>
              <span className="text-[#E9AD83]/50">•</span>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#E9AD83]">
                {BRAND.tagline}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[#E9AD83]/90 text-sm sm:text-base font-sans font-light leading-relaxed">
              Udaan is not merely an event organizer. We are an enduring cultural and commercial launchpad tailored exclusively for women entrepreneurs, master artisans, and creative founders across India.
            </p>
          </div>
        </div>

        {/* 4 Pillars: Discover -> Exhibit -> Connect -> Grow (Solid velvety panels, zero blur) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#24141F] border border-[#E9AD83]/25 hover:border-[#F6B51F] p-7 rounded-2xl relative group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_12px_36px_rgba(246,181,31,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-light text-2xl text-[#E9AD83]/50 group-hover:text-[#F6B51F] transition-colors">
                    {item.step}
                  </span>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                    item.accent === 'blue' 
                      ? 'border-[#397EAC]/40 bg-[#397EAC]/15 group-hover:border-[#397EAC]' 
                      : item.accent === 'gold' 
                      ? 'border-[#F6B51F]/40 bg-[#F6B51F]/15 group-hover:border-[#F6B51F]' 
                      : item.accent === 'orange'
                      ? 'border-[#B96535]/40 bg-[#B96535]/15 group-hover:border-[#B96535]'
                      : 'border-[#E9AD83]/40 bg-[#49313E]/40 group-hover:border-[#E9AD83]'
                  }`}>
                    {item.icon}
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[11px] tracking-[0.25em] uppercase text-[#F6B51F] font-semibold font-sans">
                    {item.tagline}
                  </div>
                  <h3 className="font-serif font-medium text-xl text-[#FFF1D9] mt-1 flex items-center space-x-2">
                    <span>{item.title}</span>
                    <span className="text-xs font-serif font-normal text-[#E9AD83]">{item.hindi}</span>
                  </h3>
                </div>

                <p className="text-xs text-[#E9AD83]/90 leading-relaxed font-light mt-3 font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9AD83]/20 flex items-center text-[11px] tracking-[0.2em] uppercase text-[#F6B51F] group-hover:text-[#FFC94A] group-hover:translate-x-1 transition-all">
                <span>Explore Milestone</span>
                <ArrowRight size={12} className="ml-1.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mission Callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:pr-6 rounded-full border border-[#E9AD83]/35 bg-[#251520] shadow-xl">
            <span className="px-5 py-2 rounded-full bg-[#361E2E] border border-[#F6B51F]/35 text-[#F6B51F] text-xs font-sans tracking-[0.2em] font-semibold uppercase">
              FOUNDER INVITATION
            </span>
            <span className="text-xs text-[#FFF1D9] font-sans tracking-wide px-3 font-medium">
              Ready to take your boutique, couture or artisanal craft to the grandest stage?
            </span>
            <button
              onClick={() => onOpenBooking()}
              className="text-xs text-[#F6B51F] hover:text-[#FFC94A] font-sans font-semibold tracking-wider uppercase underline underline-offset-4 transition-colors"
            >
              Apply to Exhibit &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
