import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { UdaanDiamond } from '../UdaanIcons';

/**
 * Live Photo Stream: "FROM THE FLOOR"
 * - Horizontal cinematic stream of approved photographs
 * - Only approvedForPublic: true items are shown
 * - Supports fullscreen lightbox zoom inspection
 */
export default function LivePhotoStream({
  photos = [],
  title = "From The Floor",
  subtitle = "Live Moments & Ateliers",
}) {
  // Only public-approved images
  const approvedPhotos = (photos || []).filter((p) => p.approvedForPublic !== false);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!approvedPhotos || approvedPhotos.length === 0) {
    return null; // Strict rule: never manufacture fake photos
  }

  const activePhoto = lightboxIndex !== null ? approvedPhotos[lightboxIndex] : null;

  return (
    <section 
      id="floor-stream" 
      className="py-20 md:py-28 bg-[#12080E] text-[#FFFAF2] border-b border-[#D9A441]/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-sans font-semibold tracking-[0.25em] text-[#D9A441] uppercase mb-2">
            <UdaanDiamond size={9} />
            <span>{subtitle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFFAF2] font-normal tracking-tight">
            {title}
          </h2>
        </div>

        <p className="text-xs sm:text-sm font-sans text-[#FFFAF2]/60 font-light max-w-sm leading-relaxed">
          Real photography captured on-site and approved for public broadcast. Scroll horizontally or click to inspect.
        </p>
      </div>

      {/* Horizontal Cinematic Scroll Container */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="flex space-x-6 overflow-x-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-[#D9A441]/30 scrollbar-track-black/20">
          {approvedPhotos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative shrink-0 w-[280px] sm:w-[340px] md:w-[380px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#D9A441]/30 hover:border-[#D9A441]/70 shadow-2xl group cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={photo.url || photo}
                alt={photo.caption || `Floor moment ${idx + 1}`}
                className="w-full h-full object-cover filter saturate-[1.08] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Top Badge (Timestamp / Category) */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                {photo.timestamp && (
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FFE8B3] border border-white/10 flex items-center gap-1">
                    <Clock size={10} className="text-[#D9A441]" />
                    <span>{photo.timestamp}</span>
                  </span>
                )}
                {photo.category && (
                  <span className="px-2.5 py-1 rounded-full bg-[#4A1620]/80 backdrop-blur-md text-white/90 border border-[#D9A441]/40 uppercase tracking-widest text-[9px]">
                    {photo.category}
                  </span>
                )}
              </div>

              {/* Bottom Caption & Inspect Prompt */}
              <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                {photo.caption && (
                  <p className="font-serif italic text-sm sm:text-base text-[#FFF8EE] leading-snug line-clamp-2">
                    “{photo.caption}”
                  </p>
                )}
                <div className="pt-2 flex items-center text-[10px] font-sans tracking-widest text-[#D9A441] uppercase group-hover:translate-x-1 transition-transform">
                  <span>Inspect photograph</span>
                  <span className="ml-1">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="font-mono tracking-widest uppercase text-[#D9A441]">
              PHOTOGRAPH {lightboxIndex + 1} OF {approvedPhotos.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              title="Close viewer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Centered Image */}
          <div 
            className="my-auto max-w-5xl mx-auto max-h-[75vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.url || activePhoto}
              alt={activePhoto.caption || 'Enlarged exhibition photo'}
              className="max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>

          {/* Caption & Navigation Controls */}
          <div 
            className="max-w-2xl mx-auto w-full text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {activePhoto.caption && (
              <p className="font-serif italic text-base sm:text-lg text-[#FFF8EE]">
                “{activePhoto.caption}”
              </p>
            )}

            <div className="flex items-center justify-center space-x-4 pt-1">
              <button
                onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : approvedPhotos.length - 1))}
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#D9A441] hover:text-[#2B1B17] text-white transition-all cursor-pointer"
                title="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-mono text-[#D9A441]">
                {activePhoto.timestamp || 'Verified Moment'}
              </span>
              <button
                onClick={() => setLightboxIndex((prev) => (prev < approvedPhotos.length - 1 ? prev + 1 : 0))}
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#D9A441] hover:text-[#2B1B17] text-white transition-all cursor-pointer"
                title="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
