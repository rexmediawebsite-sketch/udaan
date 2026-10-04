import React from 'react';
import { Link } from 'react-router-dom';
import BrandStory from '../components/BrandStory';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage({ onOpenBooking }) {
  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-6">
          <Link to="/" className="hover:text-[#B96535]">HOME</Link>
          <span className="text-[#6B5860]/40">/</span>
          <span className="text-[#B96535] font-semibold">ABOUT UDAAN</span>
        </div>
      </div>

      {/* Main Brand Story with 4 Pillars */}
      <BrandStory onOpenBooking={onOpenBooking} />

      {/* Editorial Q&A Journal Section */}
      <section className="relative py-28 bg-[#FFF8F0] overflow-hidden border-t border-b border-[#E9AD83]/30 text-[#2A1C24]">
        
        {/* Subtle Background Clouds Texture */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img
            src="/assets/chiaroscuro-clouds.jpg"
            alt="Sunset clouds oil painting texture"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-110"
          />
          <div className="absolute inset-0 bg-[#FFF8F0]/80 mix-blend-screen" />
        </div>

        {/* Giant Q&A Watermark Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
          <span className="font-serif italic text-[16rem] md:text-[22rem] font-light leading-none block text-[#E9AD83]/15">
            Q&amp;A
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#B96535]" />
              <span>EDITORIAL CONVERSATION</span>
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#2A1C24] tracking-[0.02em] leading-tight">
              The Genesis of Udaan
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#754633] font-serif italic max-w-lg mx-auto">
              “A conversation on purpose, craft, and building an enduring ecosystem for women founders.”
            </p>
          </div>

          {/* Two-Column Editorial Interview Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-xs sm:text-sm font-sans font-light leading-relaxed">
            
            {/* Left Column */}
            <div className="space-y-8">
              <div className="p-7 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#B96535] font-semibold block mb-1">
                  GENESIS • 01
                </span>
                <h3 className="font-serif font-medium text-base sm:text-lg text-[#2A1C24] tracking-wider mb-2">
                  HOW DID UDAAN BEGIN ITS JOURNEY?
                </h3>
                <p className="text-[#5E4A55] leading-relaxed font-light">
                  Udaan was born from a fundamental observation: women entrepreneurs across Bihar and Eastern India possess extraordinary creative and artisanal talent, yet lack a prestigious, 5-star physical stage to connect directly with high-intent luxury patrons.
                </p>
              </div>

              <div className="p-7 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#B96535] font-semibold block mb-1">
                  STRATEGY • 02
                </span>
                <h3 className="font-serif font-medium text-base sm:text-lg text-[#2A1C24] tracking-wider mb-2">
                  HOW DID YOU KNOW WHERE TO BEGIN?
                </h3>
                <p className="text-[#5E4A55] leading-relaxed font-light">
                  We began with an uncompromising conviction: <em>महिलाओं की नई पहचान</em> (A New Identity for Women). Rather than organizing another generic shopping fair, we committed to 5-star curated exhibition venues, turnkey infrastructure, and strict category curation.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="p-7 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#B96535] font-semibold block mb-1">
                  IMPACT • 03
                </span>
                <h3 className="font-serif font-medium text-base sm:text-lg text-[#2A1C24] tracking-wider mb-2">
                  WHAT WAS THE INITIAL REACTION?
                </h3>
                <p className="text-[#5E4A55] leading-relaxed font-light">
                  From our very first edition, the response was transformative. Discerning families discovered heirloom Banarasi weaves and bespoke polki jewellery that were previously inaccessible locally, while participating women founders reported record sales and enduring patron relationships.
                </p>
              </div>

              <div className="p-7 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#B96535] font-semibold block mb-1">
                  PURPOSE • 04
                </span>
                <h3 className="font-serif font-medium text-base sm:text-lg text-[#2A1C24] tracking-wider mb-2">
                  WHAT DOES “WHERE WOMEN BUILD BRANDS” MEAN?
                </h3>
                <p className="text-[#5E4A55] leading-relaxed font-light">
                  It means we do not see exhibition stalls as mere temporary retail counters. We see each stall as a brand incubator — giving founders the stage, media visibility, and buyer trust necessary to turn bespoke craft into scalable luxury enterprises.
                </p>
              </div>
            </div>

          </div>

          {/* CTA Box */}
          <div className="mt-16 pt-10 border-t border-[#E9AD83]/30 text-center">
            <Link
              to="/become-an-exhibitor"
              className="btn-sunset-gold inline-flex items-center space-x-2 px-9 py-3.5 rounded-full text-[#2A1C24] font-semibold text-xs tracking-[0.22em] uppercase transition-colors shadow-lg"
            >
              <span>Join the Udaan Movement</span>
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
