import React from 'react';
import { Link } from 'react-router-dom';
import BrandStory from '../components/BrandStory';
import { Sparkles, ArrowRight, Heart, Award, Users, Compass } from 'lucide-react';
import { BRAND } from '../data/eventData';

export default function AboutPage({ onOpenBooking }) {
  return (
    <div className="pt-28 pb-24 bg-[#1C110F] min-h-screen text-[#FAF6F0]">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center space-x-2 text-xs font-sans text-[#C2B8B5]/70 mb-6">
          <Link to="/" className="hover:text-[#E5A93C]">HOME</Link>
          <span>/</span>
          <span className="text-[#E5A93C] font-semibold">ABOUT UDAAN</span>
        </div>
      </div>

      {/* Main Brand Story with 4 Pillars */}
      <BrandStory onOpenBooking={onOpenBooking} />

      {/* Editorial Q&A Journal Section directly inspired by Reference Image 3 / Stitch Slide 3 */}
      <section className="relative py-28 bg-[#251917] overflow-hidden border-t border-b border-[#E5A93C]/20 text-[#FAF6F0]">
        
        {/* Background Chiaroscuro Clouds Texture */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/assets/chiaroscuro-clouds.jpg"
            alt="Rich chiaroscuro oil painting texture"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-75"
          />
          <div className="absolute inset-0 bg-[#251917]/85 mix-blend-multiply" />
        </div>

        {/* Giant Q&A Watermark Typography from Reference Screenshot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
          <span className="font-serif italic text-[16rem] md:text-[22rem] font-light watermark-text leading-none block opacity-20">
            Q&amp;A
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#1C110F]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
              <Sparkles size={12} className="text-[#E5A93C]" />
              <span>EDITORIAL CONVERSATION</span>
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
              The Genesis of Udaan
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#F3D2A2]/80 font-serif italic max-w-lg mx-auto">
              “A conversation on purpose, craft, and building an enduring ecosystem for women founders.”
            </p>
          </div>

          {/* Two-Column Editorial Interview Layout mirroring Reference Image 3 / Stitch Slide 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 text-xs sm:text-sm font-sans font-light leading-relaxed">
            
            {/* Left Column */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-[#1C110F]/60 border border-white/5 backdrop-blur-sm">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#E5A93C] font-semibold block mb-1">
                  GENESIS • 01
                </span>
                <h3 className="font-serif font-normal text-base sm:text-lg text-[#FAF6F0] uppercase tracking-wider mb-2">
                  HOW DID UDAAN BEGIN ITS JOURNEY?
                </h3>
                <p className="text-[#C2B8B5] leading-relaxed font-light">
                  Udaan was born from a fundamental observation: women entrepreneurs across Bihar and Eastern India possess extraordinary creative and artisanal talent, yet lack a prestigious, 5-star physical stage to connect directly with high-intent luxury patrons.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1C110F]/60 border border-white/5 backdrop-blur-sm">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#E5A93C] font-semibold block mb-1">
                  STRATEGY • 02
                </span>
                <h3 className="font-serif font-normal text-base sm:text-lg text-[#FAF6F0] uppercase tracking-wider mb-2">
                  HOW DID YOU KNOW WHERE TO BEGIN?
                </h3>
                <p className="text-[#C2B8B5] leading-relaxed font-light">
                  We began with an uncompromising conviction: <em>महिलाओं की नई पहचान</em> (A New Identity for Women). Rather than organizing another generic shopping fair, we committed to 5-star curated exhibition venues, turnkey infrastructure, and strict category curation.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-[#1C110F]/60 border border-white/5 backdrop-blur-sm">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#E5A93C] font-semibold block mb-1">
                  IMPACT • 03
                </span>
                <h3 className="font-serif font-normal text-base sm:text-lg text-[#FAF6F0] uppercase tracking-wider mb-2">
                  WHAT WAS THE INITIAL REACTION?
                </h3>
                <p className="text-[#C2B8B5] leading-relaxed font-light">
                  From our very first edition, the response was transformative. Discerning families discovered heirloom Banarasi weaves and bespoke polki jewellery that were previously inaccessible locally, while participating women founders reported record sales and enduring patron relationships.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1C110F]/60 border border-white/5 backdrop-blur-sm">
                <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-[#E5A93C] font-semibold block mb-1">
                  PURPOSE • 04
                </span>
                <h3 className="font-serif font-normal text-base sm:text-lg text-[#FAF6F0] uppercase tracking-wider mb-2">
                  WHAT DOES “WHERE WOMEN BUILD BRANDS” MEAN?
                </h3>
                <p className="text-[#C2B8B5] leading-relaxed font-light">
                  It means we do not see exhibition stalls as mere temporary retail counters. We see each stall as a brand incubator — giving founders the stage, media visibility, and buyer trust necessary to turn bespoke craft into scalable luxury enterprises.
                </p>
              </div>
            </div>

          </div>

          {/* CTA Box */}
          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <Link
              to="/become-an-exhibitor"
              className="btn-ghost-pill inline-flex items-center space-x-2 px-9 py-3.5 rounded-full text-[#FAF6F0] hover:text-[#E5A93C] font-semibold text-xs tracking-[0.22em] uppercase transition-colors shadow-lg"
            >
              <span>Join the Udaan Movement</span>
              <ArrowRight size={13} className="text-[#E5A93C]" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
