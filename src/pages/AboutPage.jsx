import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function AboutPage({ onOpenBooking }) {
  const personas = [
    {
      title: "Entrepreneurs",
      hindi: "उद्यमी",
      desc: "Visionaries building sustainable, revenue-generating luxury labels with uncompromising quality.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85",
    },
    {
      title: "Creators",
      hindi: "रचनाकार",
      desc: "Fashion and jewellery designers pushing contemporary boundaries while honoring heritage motifs.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
    },
    {
      title: "Artisans",
      hindi: "शिल्पकार",
      desc: "Master revivalists of Banarasi weaves, Madhubani handcrafts, and fine silver filigree.",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85",
    },
    {
      title: "Founders",
      hindi: "संस्थापक",
      desc: "Pioneering creative directors leading independent boutiques and handcrafted ateliers.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85",
    },
    {
      title: "Dreamers",
      hindi: "स्वप्नदृष्टा",
      desc: "Women stepping onto their very first professional stage to turn an intimate ambition into an empire.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=85",
    },
  ];

  const timelineSteps = [
    {
      phase: "PHASE 01",
      title: "THE IDEA",
      year: "2022",
      desc: "Three women recognize the absence of a prestigious luxury stage for female founders in Bihar.",
    },
    {
      phase: "PHASE 02",
      title: "THE FIRST EVENT",
      year: "OCT 2022",
      desc: "Inaugural edition launches with 28 daring women labels and overwhelming community patronage.",
    },
    {
      phase: "PHASE 03",
      title: "THE FIRST COMMUNITY",
      year: "2023 – 2025",
      desc: "Four consecutive landmark editions connect 120+ artisans with 18,000+ discerning buyers.",
    },
    {
      phase: "PHASE 04",
      title: "THE MOVEMENT",
      year: "2026 & BEYOND",
      desc: "UDAAN matures into Eastern India's benchmark platform: महिलाओं की नई पहचान.",
    },
  ];

  const pastMoments = [
    {
      quote: "One event became many stories.",
      sub: "Edition 01 • The Beginning",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85",
    },
    {
      quote: "One stall became a brand’s first opportunity.",
      sub: "Edition 02 • High Summer Pret",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    },
    {
      quote: "One connection became a collaboration.",
      sub: "Edition 03 • Festive Grandeur",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    },
    {
      quote: "And one idea became a community.",
      sub: "Edition 04 • The Movement",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85",
    },
  ];

  return (
    <div className="bg-[#FBF4EA] text-[#2B1B17] min-h-screen selection:bg-[#9E1B28]/20 selection:text-[#9E1B28]">
      {/* Editorial Top Chronicle Header */}
      <div className="pt-28 md:pt-36 pb-6 border-b border-[#2B1B17]/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-sans tracking-[0.25em] uppercase text-[#2B1B17]/60">
          <div className="flex items-center space-x-3">
            <span className="font-serif font-bold text-sm tracking-[0.2em] text-[#2B1B17]">UDAAN</span>
            <span>/</span>
            <span>Chronicle • Heritage • Movement</span>
          </div>
          <div className="flex items-center space-x-6">
            <span>PATNA, EST. 2022</span>
            <span className="hidden md:inline">•</span>
            <span className="text-[#9E1B28] font-semibold">OUR STORY</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO: BURBERRY HIGH-FASHION EDITORIAL STATEMENT
          ========================================================================= */}
      <section className="relative pt-20 pb-28 md:py-32 overflow-hidden border-b border-[#2B1B17]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Big Typography */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#9E1B28] block">
                The Origin Chronicle
              </span>
              <h1 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] text-[#9E1B28] leading-[0.98] tracking-tight uppercase">
                Three Women.<br />
                One Vision.<br />
                <span className="italic font-normal text-[#2B1B17]">A Movement In The Making.</span>
              </h1>
            </div>

            {/* Right Editorial Lead Paragraph */}
            <div className="lg:col-span-4 lg:pt-14 space-y-6">
              <div className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#2B1B17]/50 pb-3 border-b border-[#2B1B17]/15">
                THE GENESIS
              </div>
              <p className="font-serif text-xl sm:text-2xl text-[#2B1B17] leading-relaxed italic">
                “What started with a simple belief — that women deserve spaces where their ideas, products and ambitions can be seen — became the beginning of Udaan.”
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-light">
                Not designed as a fleeting event. Designed as an enduring cultural and commercial launchpad tailored exclusively for women entrepreneurs, master artisans, and creative founders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          01 — WHERE IT BEGAN
          ========================================================================= */}
      <section className="relative py-28 md:py-36 border-b border-[#2B1B17]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Staggered Photo Grid */}
            <div className="lg:col-span-6 relative">
              <div className="relative">
                {/* Large Red Number Watermark */}
                <span className="font-serif italic font-bold text-8xl sm:text-9xl md:text-[11rem] text-[#9E1B28] leading-none absolute -top-12 -left-6 z-20 select-none">
                  01
                </span>

                <div className="relative z-10 w-full h-[460px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-[#2B1B17]/10 bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
                    alt="Three Women Founders Together — The Genesis of Udaan"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-sans tracking-widest uppercase font-semibold">
                    THE THREE FOUNDERS TOGETHER • PATNA
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-6 space-y-6 lg:pl-10">
              <div className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#9E1B28]">
                01 — WHERE IT BEGAN
              </div>

              <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] leading-[1.08] tracking-tight">
                Three Women Who Saw Something Missing.
              </h2>

              <div className="space-y-4 font-sans text-base sm:text-lg text-[#2B1B17]/80 leading-relaxed font-light">
                <p>
                  It started with three women who saw something missing in the commercial landscape.
                </p>
                <p>
                  Talented women were creating beautiful things, building businesses and chasing their dreams — but too often, they didn’t have the right space to be seen.
                </p>
                <p className="font-serif text-2xl sm:text-3xl text-[#9E1B28] italic pt-2">
                  So they decided to create one.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2B1B17]/15 flex items-center gap-4 text-xs font-sans tracking-widest uppercase text-[#2B1B17]/60">
                <span>ESTABLISHED IN PATNA, BIHAR</span>
                <span>•</span>
                <span>OCTOBER 2022</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 — THE FIRST STEP (Archive Photo + Visual Timeline)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#FFFFFF] border-b border-[#2B1B17]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-serif italic font-bold text-7xl sm:text-8xl text-[#9E1B28] block leading-none">
                02
              </span>
              <div className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#9E1B28]">
                02 — THE FIRST STEP
              </div>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#2B1B17] leading-tight">
                No Big Platform in the Beginning.
              </h2>
              <div className="space-y-3 font-sans text-base sm:text-lg text-[#2B1B17]/80 leading-relaxed font-light">
                <p>There was no big platform in the beginning.</p>
                <p>No massive stage.</p>
                <p className="font-medium text-[#2B1B17]">
                  Just an idea, determination, and the courage to take the first step.
                </p>
              </div>
            </div>

            {/* Earliest Available Photograph / Poster */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 h-[380px] sm:h-[440px] bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85"
                  alt="Earliest Photograph from Inaugural Udaan Edition in 2022"
                  className="w-full h-full object-cover filter contrast-[1.08] sepia-[0.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-sans tracking-widest uppercase font-semibold">
                  EARLIEST ARCHIVE • INAUGURAL EDITION 01 (OCTOBER 2022)
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL TIMELINE: THE IDEA → THE FIRST EVENT → THE FIRST COMMUNITY → THE MOVEMENT */}
          <div className="pt-10 border-t border-[#2B1B17]/15">
            <div className="text-center mb-12">
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-semibold text-[#9E1B28] block mb-2">
                EVOLUTION MILESTONES
              </span>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#2B1B17]">
                The Arc of the Movement
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative p-7 rounded-2xl bg-[#FBF4EA] border border-[#2B1B17]/10 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-sans font-bold text-[#9E1B28] tracking-widest">
                      <span>{step.phase}</span>
                      <span className="text-[#2B1B17]/50">{step.year}</span>
                    </div>
                    <h4 className="font-serif font-bold text-2xl text-[#2B1B17] tracking-tight">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                  {idx < 3 && (
                    <div className="text-right text-[#9E1B28] font-bold text-lg hidden md:block">
                      &rarr;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03 — THREE WOMEN, ONE PURPOSE (Strict Placeholders)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 border-b border-[#2B1B17]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="font-serif italic font-bold text-7xl sm:text-8xl text-[#9E1B28] block leading-none">
              03
            </span>
            <div className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#9E1B28]">
              03 — THREE WOMEN, ONE PURPOSE
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] tracking-tight leading-[1.08]">
              The Three Founders
            </h2>
            <p className="font-sans text-base text-[#2B1B17]/75 font-light leading-relaxed">
              United by one single purpose: elevating women founders into acknowledged luxury powerhouses.
            </p>
          </div>

          {/* 3 Founders Sections with Marked Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="group p-8 rounded-3xl bg-[#FFFFFF] border border-[#2B1B17]/15 shadow-xl flex flex-col justify-between space-y-6 hover:-translate-y-2 transition-transform duration-500"
              >
                {/* Founder Photo Frame */}
                <div className="relative h-72 w-full rounded-2xl overflow-hidden bg-stone-100 border border-black/10">
                  <img
                    src={
                      num === 1
                        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85"
                        : num === 2
                        ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85"
                        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85"
                    }
                    alt={`Founder ${num}`}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white text-[10px] font-sans font-semibold tracking-widest uppercase backdrop-blur-md">
                    FOUNDER 0{num}
                  </div>
                </div>

                {/* Exact Placeholders (As strictly requested by user) */}
                <div className="space-y-3">
                  <div className="text-xs font-sans font-bold text-[#9E1B28] tracking-widest uppercase">
                    Founder / Co-founder
                  </div>
                  <h3 className="font-serif font-bold text-3xl text-[#2B1B17]">
                    [FOUNDER NAME]
                  </h3>
                  <p className="font-sans text-sm text-[#2B1B17]/70 leading-relaxed font-light italic">
                    Short personal story placeholder. Awaiting founder's personal narrative, individual vision, and background in crafting the platform.
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 text-[10px] font-sans font-semibold tracking-widest uppercase text-stone-400">
                  OFFICIAL DOSSIER AWAITING DETAILS
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 — AND THEN, IT GREW (Bigger Visual Experience + Past Events)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#2B1B17] text-[#FFFAF2] overflow-hidden border-b border-[#D9A441]/20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="font-serif italic font-bold text-7xl sm:text-8xl text-[#D9A441] block leading-none">
              04
            </span>
            <div className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#D9A441]">
              04 — AND THEN, IT GREW
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#FFFAF2] tracking-tight leading-[1.08]">
              The Expansion of Udaan
            </h2>
            <p className="font-sans text-base text-[#FFFAF2]/75 font-light leading-relaxed">
              From an inaugural hall into Eastern India's most anticipated pre-Diwali celebration.
            </p>
          </div>

          {/* 4 Grand Narrative Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {pastMoments.map((moment, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-black/40 border border-[#D9A441]/30 shadow-2xl h-[380px] sm:h-[440px] flex flex-col justify-end p-8"
              >
                <img
                  src={moment.image}
                  alt={moment.quote}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold text-[#D9A441] block">
                    {moment.sub}
                  </span>
                  <h3 className="font-serif font-normal text-2xl sm:text-3xl text-white leading-snug">
                    {moment.quote}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#4A1620] border border-[#D9A441]/40 text-center max-w-4xl mx-auto space-y-3">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FFFAF2] font-normal">
              One idea became a community.
            </h3>
            <p className="font-sans text-sm text-[#FFFAF2]/80 max-w-xl mx-auto font-light leading-relaxed">
              Every edition has expanded the stage: over 50+ curated stalls, 5,000+ patrons per edition, and millions in direct commercial commerce for women founders.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05 — THE WOMEN BEHIND THE BRANDS
          ========================================================================= */}
      <section className="relative py-28 md:py-36 border-b border-[#2B1B17]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="font-serif italic font-bold text-7xl sm:text-8xl text-[#9E1B28] block leading-none">
              05
            </span>
            <div className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#9E1B28]">
              05 — THE WOMEN BEHIND THE BRANDS
            </div>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] tracking-tight leading-[1.08]">
              Who Udaan Is Built For
            </h2>
            <p className="font-sans text-base text-[#2B1B17]/75 font-light leading-relaxed">
              Five creative forces reshaping Bihar's cultural economy.
            </p>
          </div>

          {/* 5 Personas Grid: Large Editorial Imagery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {personas.map((persona, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#2B1B17]/15 shadow-xl hover:-translate-y-2 transition-transform duration-500 flex flex-col justify-between h-[420px]"
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={persona.image}
                    alt={persona.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 p-5 flex justify-between items-start">
                  <span className="text-[10px] tracking-widest font-sans font-bold uppercase text-[#D9A441] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md">
                    0{idx + 1}
                  </span>
                  <span className="font-serif text-lg text-white font-medium">
                    {persona.hindi}
                  </span>
                </div>

                <div className="relative z-10 p-5 space-y-1.5 text-white">
                  <h3 className="font-serif font-bold text-2xl text-white group-hover:text-[#D9A441] transition-colors">
                    {persona.title}
                  </h3>
                  <p className="font-sans text-xs text-white/80 leading-relaxed font-light">
                    {persona.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          06 — FROM AN IDEA TO A MOVEMENT (Grand Manifesto & Tagline)
          ========================================================================= */}
      <section className="relative py-32 md:py-44 bg-[#4A1620] text-[#FFFAF2] text-center overflow-hidden border-b border-[#D9A441]/25">
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-8">
          <span className="font-serif italic font-bold text-7xl sm:text-8xl text-[#D9A441] block leading-none">
            06
          </span>
          <div className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#D9A441]">
            06 — FROM AN IDEA TO A MOVEMENT
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFAF2] tracking-tight leading-[1.05] uppercase">
            Udaan Is No Longer Just An Event.
          </h2>

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#D9A441] font-light italic max-w-3xl mx-auto leading-relaxed">
            “It is a space where women meet, create, connect, discover and grow.”
          </p>

          {/* Tagline */}
          <div className="pt-6">
            <h3 className="font-hindi text-4xl sm:text-6xl md:text-7xl text-[#FFFAF2] font-normal drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              महिलाओं की नई पहचान
            </h3>
          </div>
        </div>
      </section>

      {/* =========================================================================
          07 — WHAT COMES NEXT (The Story Is Still Being Written)
          ========================================================================= */}
      <section className="relative py-28 md:py-40 bg-[#FBF4EA] text-[#2B1B17] text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <span className="font-serif italic font-bold text-7xl sm:text-8xl text-[#9E1B28] block leading-none">
            07
          </span>
          <div className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-[#9E1B28]">
            07 — WHAT COMES NEXT
          </div>

          <h2 className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl text-[#2B1B17] tracking-tight leading-[1.08] uppercase">
            The Story Is Still Being Written.
          </h2>

          <div className="space-y-3 font-serif text-2xl sm:text-3xl text-[#2B1B17]/85 italic font-light">
            <p>Every event brings another woman.</p>
            <p>Another brand.</p>
            <p>Another dream.</p>
            <p className="font-normal text-[#9E1B28] not-italic font-sans text-xl sm:text-2xl pt-2">
              Another beginning.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={() => onOpenBooking()}
              cursorLabel="Apply"
              className="btn-gold-luxury px-9 py-4 rounded-full text-xs font-semibold tracking-widest uppercase shadow-xl"
            >
              Apply to Exhibit at Udaan
            </MagneticButton>

            <Link
              to="/visitors"
              className="px-8 py-4 rounded-full bg-[#FFFFFF] border border-[#2B1B17]/20 text-[#2B1B17] hover:border-[#9E1B28] text-xs font-sans font-semibold tracking-widest uppercase transition-all shadow-md"
            >
              Get Complimentary VIP Pass &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
