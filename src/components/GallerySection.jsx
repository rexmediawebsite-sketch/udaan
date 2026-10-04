import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/eventData';

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#397EAC]/40 bg-[#EBF3F8] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#397EAC] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#397EAC]" />
              <span>VISUAL ARCHIVE</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-tight">
              Exhibition <span className="italic font-light text-[#B96535]">Moments</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
            A glimpse into the elegance, crowds, handcrafted luxury, and vibrant commerce that define every edition of UDAAN.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#E9AD83]/30 hover:border-[#B96535] relative aspect-[4/3] bg-[#FFFBF5] shadow-[0_4px_20px_rgba(42,28,36,0.04)] hover:shadow-[0_16px_36px_rgba(185,101,53,0.14)] transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} className="text-white" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-[#FFF1D9] font-normal mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#E9AD83] font-sans mt-0.5 font-light">
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
            className="fixed inset-0 z-50 bg-[#12080F]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#24141F] rounded-3xl overflow-hidden border border-[#E9AD83]/30 shadow-2xl text-[#FFF1D9]"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#180E15] border border-[#E9AD83]/40 text-[#FFF1D9] flex items-center justify-center hover:bg-[#F6B51F] hover:text-[#180E15] transition-colors"
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>

              <div className="max-h-[70vh] overflow-hidden bg-black/50">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-cover max-h-[70vh]"
                />
              </div>

              <div className="p-6 bg-[#1F111B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E9AD83]/20">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans">
                    {activeImage.category}
                  </span>
                  <h3 className="font-serif text-2xl text-[#FFF1D9] mt-0.5">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs text-[#E9AD83] font-sans mt-0.5">
                    {activeImage.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setActiveImage(null)}
                  className="btn-sunset-ghost-dark px-6 py-2.5 rounded-full text-xs tracking-widest uppercase text-[#FFF1D9] hover:text-[#F6B51F]"
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
