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
      icon: <Compass className="w-5 h-5 text-[#E5A93C]" />
    },
    {
      step: "02",
      title: "EXHIBIT",
      hindi: "प्रदर्शन",
      tagline: "Grand Canvas",
      desc: "We build turnkey, 5-star exhibition spaces at prime luxury properties, providing your brand an aesthetically unparalleled physical presence.",
      icon: <Sparkles className="w-5 h-5 text-[#E5A93C]" />
    },
    {
      step: "03",
      title: "CONNECT",
      hindi: "संपर्क",
      tagline: "Elite Patrons",
      desc: "Direct, high-conversion engagements with Bihar's most discerning shoppers, tastemakers, stylists, and institutional festive buyers.",
      icon: <Network className="w-5 h-5 text-[#E5A93C]" />
    },
    {
      step: "04",
      title: "GROW",
      hindi: "प्रगति",
      tagline: "Brand Elevation",
      desc: "Turn individual creativity into recognizable, scalable commerce with press visibility, digital reach, and enduring brand prestige.",
      icon: <TrendingUp className="w-5 h-5 text-[#E5A93C]" />
    }
  ];

  return (
    <section id="story" className="relative py-24 md:py-32 bg-[#251917] overflow-hidden border-t border-b border-[#E5A93C]/20">
      {/* Decorative ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E5A93C]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2B6C9E]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Editorial Brand Narrative Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#1C110F]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
              <Sparkles size={12} className="text-[#E5A93C]" />
              <span>THE UDAAN ECOSYSTEM</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] leading-[1.08] tracking-[0.05em] headline-shadow">
              Where Women <br />
              <span className="italic font-light text-[#E5A93C]">Build Brands.</span>
            </h2>

            <div className="mt-4 flex items-center space-x-3 text-sm font-sans tracking-[0.2em] text-[#F3D2A2]">
              <span className="font-serif text-lg text-[#FAF6F0] font-medium">{BRAND.hindiName}</span>
              <span className="text-[#C2B8B5]/40">•</span>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#E5A93C]">
                {BRAND.tagline}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[#C2B8B5] text-sm sm:text-base font-sans font-light leading-relaxed">
              Udaan is not merely an event organizer. We are an enduring cultural and commercial launchpad tailored exclusively for women entrepreneurs, master artisans, and creative founders across India.
            </p>
          </div>
        </div>

        {/* 4 Pillars: Discover -> Exhibit -> Connect -> Grow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-7 rounded-2xl relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif font-light text-2xl text-[#FAF6F0]/20 group-hover:text-[#E5A93C]/70 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#E5A93C]/50 group-hover:bg-[#E5A93C]/10 transition-colors">
                    {item.icon}
                  </div>
                </div>

                <div className="mb-2">
                  <div className="text-[11px] tracking-[0.25em] uppercase text-[#E5A93C] font-semibold font-sans">
                    {item.tagline}
                  </div>
                  <h3 className="font-serif font-medium text-xl text-[#FAF6F0] mt-1 flex items-center space-x-2">
                    <span>{item.title}</span>
                    <span className="text-xs font-serif font-normal text-[#C2B8B5]">{item.hindi}</span>
                  </h3>
                </div>

                <p className="text-xs text-[#C2B8B5] leading-relaxed font-light mt-3 font-sans">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[10px] tracking-[0.2em] uppercase text-[#E5A93C] group-hover:translate-x-1 transition-transform">
                <span>Learn Journey</span>
                <ArrowRight size={12} className="ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mission Callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:pr-6 rounded-full border border-[#E5A93C]/20 bg-[#160B0A]/80 backdrop-blur-md">
            <span className="px-5 py-2 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#F3D2A2] text-xs font-sans tracking-[0.2em] font-semibold uppercase">
              FOUNDER INVITATION
            </span>
            <span className="text-xs text-[#FAF6F0] font-sans tracking-wide px-3 font-light">
              Ready to take your boutique, couture or artisanal craft to the grandest stage?
            </span>
            <button
              onClick={() => onOpenBooking()}
              className="text-xs text-[#E5A93C] hover:text-[#F3D2A2] font-sans font-semibold tracking-wider uppercase underline underline-offset-4"
            >
              Apply to Exhibit &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
