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
    <section className="relative w-full py-24 bg-[#FFFAF2] text-[#2B1B17] border-y border-[#D9A441]/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.15em] text-[#B85C38] font-sans font-semibold block">
              Curated Domains
            </span>
            <h2 className="font-heading font-semibold text-4xl sm:text-5xl text-[#4A1620] tracking-tight leading-tight">
              Six Exhibition Pavilions
            </h2>
            <p className="font-sans text-base text-[#2B1B17]/75 max-w-xl">
              Each pavilion at Tangerine Grand is themed with dedicated aisles, custom display architecture, and focused category curation.
            </p>
          </div>

          <Link
            to="/exhibitors"
            data-cursor="Directory"
            className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#4A1620] hover:text-[#B8801F] transition-colors self-start md:self-auto"
          >
            <span>Explore Exhibitor Directory</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6-Card Grid with Real Photography & Overlapping Depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pavilions.map((pav, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-[#2B1B17] shadow-lg border border-[#D9A441]/25 hover:border-[#D9A441] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Media Container */}
              <div className="h-56 w-full overflow-hidden relative">
                <img
                  src={pav.image}
                  alt={pav.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17] via-[#2B1B17]/40 to-transparent pointer-events-none" />

                {/* Count Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#FFFAF2] text-[11px] font-sans font-semibold tracking-wide">
                  {pav.count}
                </div>
              </div>

              {/* Text Card Content */}
              <div className="p-6 relative z-10 space-y-2 bg-[#2B1B17]">
                <h3 className="font-heading font-semibold text-2xl text-[#FFFAF2] group-hover:text-[#D9A441] transition-colors">
                  {pav.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#FFFAF2]/80 leading-relaxed">
                  {pav.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
