import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const pavilions = [
  {
    title: 'Bridal Couture & Pret',
    count: '16 Ateliers',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    desc: 'Bespoke lehengas, Banarasi silks, and festive fusion wear by women designers.',
  },
  {
    title: 'Fine Polki & Temple Jewels',
    count: '12 Designers',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    desc: 'Uncut diamonds, heritage jadau, and 925 handcrafted silver filigree.',
  },
  {
    title: 'Heritage Weaves & Sarees',
    count: '8 Weaving Houses',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    desc: 'Tussar silk, Madhubani hand-painted drapes, and Chanderi sarees.',
  },
  {
    title: 'Festive Decor & Brass Artifacts',
    count: '9 Curators',
    image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80',
    desc: 'Hand-carved brass urlis, terracotta diyas, and festive table accents.',
  },
  {
    title: 'Artisanal Wellness & Fragrance',
    count: '6 Clean Labels',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    desc: 'Cold-pressed botanical skincare, attars, and aromatherapy soy candles.',
  },
  {
    title: 'Gourmet Festive Hampers',
    count: '5 Confectioners',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    desc: 'Artisanal mithai, organic saffron preserves, and curated dry fruit boxes.',
  },
];

export default function HomePavilionsTeaser() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FFFAF2] text-[#2B1B17] border-y border-[#D9A441]/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B85C38] font-sans font-semibold block">
              Curated Domains
            </span>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] tracking-tight leading-[1.08]">
              Six Curated Pavilions
            </h2>
            <p className="font-sans text-base text-[#2B1B17]/75 max-w-xl font-light leading-relaxed">
              Each pavilion at Tangerine Grand is themed with dedicated carpeted aisles, custom display architecture, and focused category curation.
            </p>
          </div>

          <Link
            to="/exhibitors"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-[#4A1620] hover:text-[#B8801F] transition-colors self-start md:self-auto border-b border-[#D9A441]/40 pb-1"
          >
            <span>Explore Exhibitor Directory</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6-Card Grid: Warm Luxury Ivory Cards with Subtle Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pavilions.map((pav, i) => (
            <Link
              key={i}
              to="/exhibitors"
              className="group relative rounded-3xl overflow-hidden bg-[#FFFFFF] shadow-[0_12px_36px_rgba(43,27,23,0.06)] border border-[#D9A441]/30 hover:border-[#D9A441] card-luxury-hover flex flex-col cursor-pointer"
            >
              {/* Media Container */}
              <div className="h-60 w-full overflow-hidden relative">
                <img
                  src={pav.image}
                  alt={pav.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Specular glare sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Count Badge */}
                <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/50 text-[#FFFAF2] text-[11px] font-sans font-semibold tracking-wide shadow-md">
                  {pav.count}
                </div>
              </div>

              {/* Text Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#2B1B17] group-hover:text-[#B8801F] transition-colors leading-snug">
                    {pav.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-light">
                    {pav.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D9A441]/20 flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider text-[#B85C38] group-hover:text-[#B8801F]">
                  <span>Explore Brands</span>
                  <ArrowRight size={14} className="stroke-[2.5] transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
