import React, { useState } from 'react';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { CATEGORIES } from '../data/eventData';

export default function CategoriesSection({ onSelectCategoryFilter, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <section id="categories" className="relative py-24 md:py-32 bg-[#FFF8F0] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#397EAC]/40 bg-[#EBF3F8] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#397EAC] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#397EAC]" />
              <span>CURATED DOMAINS</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-tight">
              Exhibition <span className="italic font-light text-[#B96535]">Pavilions</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
            Six distinct domains curated for aesthetic harmony, giving affluent shoppers a structured, seamless festive discovery experience.
          </p>
        </div>

        {/* Editorial Categories Grid with Visual Prominence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isFeatured = idx === 0 || idx === 1; // Bridal & Jewellery have elevated prominence
            const isSelected = activeCategory.id === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#B96535] bg-[#FFFBF5] ring-1 ring-[#B96535]/30 shadow-xl'
                    : 'border-[#E9AD83]/30 bg-[#FFFBF5] hover:border-[#E99A18] shadow-[0_4px_20px_rgba(42,28,36,0.04)] hover:shadow-[0_12px_32px_rgba(233,154,24,0.1)]'
                }`}
              >
                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF4EB]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Hindi name badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 border border-[#E9AD83]/40 text-[11px] font-serif text-[#B96535] font-medium shadow-sm">
                    {cat.hindi}
                  </div>

                  {isFeatured && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#F6B51F] text-[#1E121B] text-[9px] font-sans font-bold tracking-wider uppercase">
                      PREMIER DOMAIN
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-normal text-2xl text-[#2A1C24] group-hover:text-[#B96535] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E9AD83]/20">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cat.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full bg-[#FAF4EB] border border-[#E9AD83]/30 text-[10px] tracking-wider text-[#5E4A55] font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(cat.title);
                      }}
                      className="w-full py-2.5 rounded-full text-[11px] font-sans tracking-[0.2em] font-semibold uppercase flex items-center justify-center space-x-1.5 transition-all border border-[#E9AD83]/40 hover:border-[#B96535] text-[#2A1C24] hover:text-[#B96535] bg-[#FAF4EB] hover:bg-white shadow-sm"
                    >
                      <span>Book in this Category</span>
                      <ArrowRight size={12} className="text-[#B96535]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
