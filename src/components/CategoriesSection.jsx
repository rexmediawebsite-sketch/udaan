import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/eventData';

export default function CategoriesSection({ onSelectCategoryFilter, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <section id="categories" className="relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#1E111B] to-[#180E15] text-[#FFF1D9] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#397EAC]/40 bg-[#251520] text-[11px] font-sans font-medium tracking-[0.25em] text-[#397EAC] uppercase mb-4 shadow-xl">
              <Sparkles size={12} className="text-[#397EAC]" />
              <span>CURATED DOMAINS</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FFF1D9] tracking-[0.02em] leading-tight">
              Exhibition <span className="italic font-light text-[#F6B51F]">Categories</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#E9AD83] font-sans font-light leading-relaxed">
            Six distinct pavilions curated for high-aesthetic coherence, catering to Bihar's most affluent festive shoppers seeking bespoke quality.
          </p>
        </div>

        {/* 6 Grid Cards (Solid velvety dark plum surfaces, zero blur) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#F6B51F] bg-[#2A1624] ring-1 ring-[#F6B51F]/40 shadow-2xl'
                    : 'border-[#E9AD83]/25 bg-[#24141F] hover:border-[#F6B51F]/70 shadow-xl hover:shadow-[0_12px_36px_rgba(246,181,31,0.15)]'
                }`}
              >
                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24141F] via-[#24141F]/30 to-transparent" />
                  
                  {/* Category Hindi name badge (Solid, zero blur) */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#180E15] border border-[#E9AD83]/40 text-[11px] font-serif text-[#F6B51F] font-medium shadow-md">
                    {cat.hindi}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-medium text-2xl text-[#FFF1D9] group-hover:text-[#F6B51F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#E9AD83]/90 font-sans font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E9AD83]/20">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cat.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full bg-[#180E15] border border-[#E9AD83]/25 text-[10px] tracking-wider text-[#E9AD83] font-sans"
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
                      className="btn-sunset-ghost-dark w-full py-2.5 rounded-full text-[11px] font-sans tracking-[0.2em] font-semibold uppercase flex items-center justify-center space-x-1.5 transition-all shadow-md"
                    >
                      <span>Book Stall in this Category</span>
                      <ArrowRight size={12} className="text-[#F6B51F]" />
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
