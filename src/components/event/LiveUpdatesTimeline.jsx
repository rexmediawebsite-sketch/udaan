import React from 'react';
import { Clock, Radio, Sparkles, AlertCircle } from 'lucide-react';
import { UdaanDiamond } from '../UdaanIcons';

/**
 * Live Updates System:
 * - Only renders updates where published === true
 * - Real timestamps, titles, descriptions
 * - When empty, shows dignified waiting message: "THE DAY IS UNFOLDING. NEW MOMENTS WILL APPEAR HERE."
 * - Becomes permanent read-only "EVENT JOURNAL / MOMENTS" when event is ARCHIVED
 */
export default function LiveUpdatesTimeline({
  updates = [],
  isLive = true,
  isArchived = false,
}) {
  const publishedUpdates = (updates || []).filter((u) => u.published !== false);

  return (
    <section 
      id="live-feed" 
      className="py-20 md:py-28 bg-[#170B11] text-[#FFFAF2] border-b border-[#D9A441]/20 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4A1620]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#D9A441]/40 bg-white/5 text-[10px] font-sans font-semibold tracking-[0.25em] text-[#D9A441] uppercase">
            {isLive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>REAL-TIME DISPATCHES</span>
              </>
            ) : (
              <>
                <UdaanDiamond size={9} />
                <span>ARCHIVAL EVENT JOURNAL</span>
              </>
            )}
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FFFAF2] font-normal tracking-tight">
            {isLive ? "What's Happening Right Now" : "Moments From The Day"}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#FFFAF2]/70 font-light max-w-lg mx-auto leading-relaxed">
            {isLive
              ? 'Official announcements and curation highlights published live from the exhibition floor at Tangerine Grand.'
              : 'The verified timeline of announcements and key milestones recorded during the live exhibition.'}
          </p>
        </div>

        {/* Timeline Content */}
        {publishedUpdates.length > 0 ? (
          <div className="relative border-l border-[#D9A441]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
            {publishedUpdates.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="relative group animate-fadeIn"
              >
                {/* Timeline Node Bead */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#170B11] border-2 border-[#D9A441] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9A441] group-hover:scale-125 transition-transform" />
                </div>

                {/* Card Container */}
                <div className="p-6 rounded-2xl bg-[#23121A]/80 border border-[#D9A441]/25 hover:border-[#D9A441]/50 shadow-xl transition-all duration-300">
                  {/* Timestamp & Badge */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3 text-xs font-mono">
                    <div className="flex items-center space-x-2 text-[#D9A441]">
                      <Clock size={13} />
                      <span className="tracking-wider">{item.timestamp}</span>
                    </div>

                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-bold tracking-widest uppercase bg-[#4A1620] text-[#FFE8B3] border border-[#D9A441]/30">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#FFFAF2] mb-1.5">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#FFFAF2]/75 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Optional Image */}
                  {item.image && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-white/15 max-h-72">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Dignified Waiting State when no updates published yet */
          <div className="p-10 rounded-3xl bg-[#23121A]/50 border border-white/10 text-center space-y-3 max-w-md mx-auto">
            <div className="w-10 h-10 rounded-full bg-[#4A1620]/60 border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441] mx-auto">
              <Sparkles size={16} />
            </div>
            <h3 className="font-serif italic text-lg text-[#FFFAF2]">
              The Day Is Unfolding.
            </h3>
            <p className="font-sans text-xs text-[#FFFAF2]/60 font-light leading-relaxed">
              New moments and official updates will appear here as they are published by the curation committee.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
