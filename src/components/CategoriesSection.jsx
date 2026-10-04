import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { CATEGORIES } from '../data/eventData';

export default function CategoriesSection({ onSelectCategoryFilter, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <section id="categories" className="relative py-24 md:py-32 bg-[#1C110F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#251917]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
              <Sparkles size={12} className="text-[#E5A93C]" />
              <span>CURATED DOMAINS</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
              Exhibition <span className="italic font-light text-[#E5A93C]">Categories</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#C2B8B5] font-sans font-light leading-relaxed">
            Six distinct pavilions curated for high-aesthetic coherence, catering to Bihar's most affluent festive shoppers seeking bespoke quality.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#E5A93C] bg-[#251917] shadow-[0_10px_35px_-10px_rgba(229,169,60,0.3)]'
                    : 'border-white/10 bg-[#251917]/60 hover:border-[#E5A93C]/40 hover:bg-[#251917]/90'
                }`}
              >
                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#251917] via-transparent to-black/30" />
                  
                  {/* Category Hindi name badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#160B0A]/70 backdrop-blur-md border border-[#E5A93C]/25 text-[11px] font-serif text-[#F3D2A2]">
                    {cat.hindi}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-medium text-2xl text-[#FAF6F0] group-hover:text-[#F3D2A2] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#C2B8B5] font-sans font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cat.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full bg-[#160B0A]/60 border border-white/10 text-[10px] tracking-wider text-[#C2B8B5] font-sans"
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
                      className="btn-ghost-pill w-full py-2.5 rounded-full text-[#F3D2A2] hover:text-[#FAF6F0] text-[11px] font-sans tracking-[0.2em] font-semibold uppercase flex items-center justify-center space-x-1"
                    >
                      <span>Book Stall in this Category</span>
                      <ArrowRight size={12} className="text-[#E5A93C]" />
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
