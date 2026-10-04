import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/eventData';

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#251917] overflow-hidden border-t border-b border-[#E5A93C]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#1C110F]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
              <Sparkles size={12} className="text-[#E5A93C]" />
              <span>VISUAL ARCHIVE</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
              Exhibition <span className="italic font-light text-[#E5A93C]">Moments</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#C2B8B5] font-sans font-light leading-relaxed">
            A glimpse into the elegance, crowds, handcrafted luxury, and vibrant commerce that define every edition of UDAAN.
          </p>
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 relative aspect-[4/3] bg-[#1C110F] shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#160B0A]/95 via-[#160B0A]/30 to-transparent opacity-85 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} className="text-[#F3D2A2]" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-[#FAF6F0] font-normal mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#C2B8B5] font-sans mt-0.5 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#18100C] rounded-3xl overflow-hidden border border-[#E5A93C]/40 shadow-2xl"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#E5A93C] hover:text-[#0E0907] transition-colors"
              >
                <X size={18} />
              </button>

              <div className="max-h-[70vh] overflow-hidden">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-cover max-h-[70vh]"
                />
              </div>

              <div className="p-6 bg-[#160E0A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans">
                    {activeImage.category}
                  </span>
                  <h3 className="font-serif text-2xl text-[#FAF5EB] mt-0.5">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs text-[#F4ECE1]/70 font-sans mt-0.5">
                    {activeImage.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setActiveImage(null)}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs tracking-widest uppercase text-white/80 hover:border-[#E5A93C] hover:text-[#E5A93C]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
