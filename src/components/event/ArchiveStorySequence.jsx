import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Sparkles, Film, Compass, BookmarkCheck } from 'lucide-react';
import { UdaanDiamond, UdaanEmblem } from '../UdaanIcons';

/**
 * ArchiveStorySequence
 * Editorial narrative module rendered specifically in ARCHIVED state.
 * 
 * Rules:
 * - Collect once, reuse everywhere.
 * - Only render chapters that actually exist in event.archiveStory.
 * - Only render stats if verified in event.verifiedStats. Never invent numbers.
 * - Closes the lifecycle loop: ARCHIVE -> UPCOMING -> LIVE.
 */
export default function ArchiveStorySequence({ event }) {
  const chapters = event?.archiveStory || [];
  const stats = event?.verifiedStats || [];
  const approvedPhotos = (event?.gallery || []).filter(g => g.approvedForPublic);

  return (
    <div id="archive-story" className="space-y-24 py-16 bg-[#160D12] text-[#FFFAF2] border-t border-[#D9A441]/20">
      
      {/* 1. Verified Statistics Dossier (Only if verified numbers exist) */}
      {stats.length > 0 && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#23141C] via-[#1A0E15] to-[#12090F] border border-[#D9A441]/30 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#D9A441] uppercase">
                VERIFIED ARCHIVE METRICS
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FFFAF2]">
                A Landmark Chapter in Numbers
              </h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#D9A441]/15">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center pt-4 sm:pt-0 sm:px-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#D9A441] tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-sans tracking-widest text-[#FFFAF2]/70 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Editorial Story Chapters ("The Event, In Moments") */}
      {chapters.length > 0 && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.22em] text-[#D9A441] uppercase">
              <UdaanDiamond size={12} className="text-[#D9A441]" />
              <span>THE ARCHIVAL RETROSPECTIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#FFFAF2]">
              The Event, In Moments
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#FFFAF2]/70 leading-relaxed">
              Curated recollections documented as this edition unfolded across two unforgettable days.
            </p>
          </div>

          <div className="space-y-20">
            {chapters.map((chap, idx) => (
              <div 
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Column */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-3xl overflow-hidden border border-[#D9A441]/30 aspect-[16/10] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                    <img
                      src={chap.image}
                      alt={chap.title}
                      className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-5 left-6 text-xs font-sans tracking-widest uppercase text-[#D9A441] font-semibold">
                      {chap.chapter}
                    </div>
                  </div>
                </div>

                {/* Editorial Narrative Column */}
                <div className={`lg:col-span-5 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#D9A441] uppercase">
                    CHAPTER {idx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FFFAF2] leading-snug">
                    {chap.title}
                  </h3>
                  <div className="relative pl-5 border-l-2 border-[#D9A441]/50 text-sm sm:text-base font-serif italic text-[#FFFAF2]/80 leading-relaxed">
                    <Quote size={18} className="absolute -top-1 -left-2.5 text-[#D9A441]/40" />
                    “{chap.quote}”
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. "Some Moments Deserve To Stay" - Photo Journal Feature */}
      {approvedPhotos.length > 0 && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#201018] to-[#12080E] border border-[#D9A441]/30">
            <div className="max-w-3xl space-y-5">
              <span className="text-xs font-sans tracking-[0.25em] text-[#D9A441] uppercase font-bold">
                THROUGH OUR LENS • PERMANENT REGISTER
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-[#FFFAF2]">
                Some moments deserve to stay.
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#FFFAF2]/80 leading-relaxed">
                Every exhibition is more than a commercial marketplace; it is an intimate gathering of craft lineages, generational entrepreneurs, and patrons who value authenticity.
              </p>
              
              <div className="pt-4 flex items-center space-x-3 text-xs font-sans text-[#D9A441]">
                <UdaanDiamond size={12} className="text-[#D9A441]" />
                <span>ARCHIVAL DOCUMENTATION • {event.name} {event.edition}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Complete Lifecycle Loop CTA: Archive -> Next Event */}
      <section className="max-w-5xl mx-auto px-6 text-center pt-8">
        <div className="p-10 sm:p-14 rounded-3xl border border-[#D9A441]/30 bg-[#1D1016]/80 backdrop-blur-md space-y-6">
          <span className="text-xs font-sans tracking-[0.28em] text-[#D9A441] uppercase font-bold">
            THE LIFECYCLE CONTINUES
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#FFFAF2]">
            The next chapter is already beginning.
          </h3>
          <p className="text-sm sm:text-base font-sans text-[#FFFAF2]/70 max-w-xl mx-auto">
            Discover upcoming flagship showcases, apply for stall curation, or follow the journey as Udaan crafts new landmarks across Bihar.
          </p>
          <div className="pt-2">
            <Link
              to="/events"
              className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-[#D9A441] text-[#160D12] text-xs font-sans font-bold tracking-[0.18em] uppercase hover:bg-[#F2BD5B] hover:shadow-[0_0_25px_rgba(217,164,65,0.4)] transition-all"
            >
              <span>EXPLORE UPCOMING EVENTS</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
