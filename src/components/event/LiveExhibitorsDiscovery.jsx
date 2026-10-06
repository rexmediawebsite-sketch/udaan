import React, { useState } from 'react';
import { ArrowRight, Sparkles, Store, MapPin, Tag } from 'lucide-react';
import { UdaanDiamond } from '../UdaanIcons';
import { LIFECYCLE_STATES } from '../../utils/eventLifecycle';

/**
 * Single Unified Exhibitor Discovery Component
 * Reuses the exact same event.exhibitors dataset across all 3 lifecycle states.
 * 
 * Rules:
 * - UPCOMING: "WHO IS EXHIBITING" / Curated preview
 * - LIVE: "MEET THE BRANDS" with confirmed Stall Numbers (e.g. Stall A-02)
 * - ARCHIVED: "THE BRANDS THAT WERE HERE" (Historical record)
 * - If stall number is not confirmed, it is not displayed.
 * - If event.exhibitors is empty, the entire section is omitted (Zero Hallucination rule).
 */
export default function LiveExhibitorsDiscovery({ event, lifecycleState }) {
  const exhibitors = event?.exhibitors || [];
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Strict visibility rule: hide if no exhibitors exist
  if (!exhibitors || exhibitors.length === 0) {
    return null;
  }

  // Extract unique categories from actual data
  const categories = ['ALL', ...Array.from(new Set(exhibitors.map(e => e.category).filter(Boolean)))];

  const filteredExhibitors = selectedCategory === 'ALL'
    ? exhibitors
    : exhibitors.filter(e => e.category === selectedCategory);

  // State-specific headline and narrative
  const sectionTitle = 
    lifecycleState === LIFECYCLE_STATES.LIVE
      ? 'MEET THE BRANDS'
      : lifecycleState === LIFECYCLE_STATES.ARCHIVED
      ? 'THE BRANDS THAT WERE HERE'
      : 'WHO IS EXHIBITING';

  const sectionSubtitle =
    lifecycleState === LIFECYCLE_STATES.LIVE
      ? 'Discover live ateliers, explore current booth numbers on the exhibition floor, and meet women founders in person.'
      : lifecycleState === LIFECYCLE_STATES.ARCHIVED
      ? 'The esteemed women-led ateliers, couture houses, and luxury curators that brought this edition to life.'
      : 'A handpicked curation of master handloom revivalists, fine polki jewelers, and artisanal lifestyle curators.';

  return (
    <section id="event-exhibitors" className="py-20 bg-[#FAF4EB] border-t border-[#E9AD83]/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.22em] text-[#B96535] uppercase font-semibold">
              <UdaanDiamond size={12} className="text-[#D9A441]" />
              <span>CURATED ATELIERS • {exhibitors.length} PARTICIPATING LABELS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2A1C24] tracking-tight">
              {sectionTitle}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#6B5860] max-w-2xl leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>

          {/* Category Filter Tabs */}
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#4A1620] text-[#FFFAF2] shadow-sm'
                      : 'bg-[#FFFBF5] text-[#6B5860] border border-[#E9AD83]/30 hover:border-[#4A1620]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Exhibitors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExhibitors.map((exhibitor, idx) => (
            <div
              key={exhibitor.id || idx}
              className="group relative rounded-2xl p-6 bg-[#FFFBF5] border border-[#E9AD83]/30 hover:border-[#D9A441] hover:shadow-[0_16px_32px_rgba(74,22,32,0.08)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stall Number Tag: Shown in LIVE or UPCOMING if confirmed */}
                <div className="flex items-center justify-between mb-4">
                  {exhibitor.stall ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-[#FAF4EB] text-[#4A1620] border border-[#E9AD83]/40">
                      <Store size={11} className="text-[#D9A441]" />
                      <span>STALL {exhibitor.stall}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-sans text-[#6B5860]/70 uppercase tracking-wider">
                      CONFIRMED LABEL
                    </span>
                  )}

                  {exhibitor.city && (
                    <span className="text-[11px] font-sans text-[#6B5860]/80">
                      {exhibitor.city}
                    </span>
                  )}
                </div>

                {/* Exhibitor Name */}
                <h3 className="text-xl font-serif text-[#2A1C24] group-hover:text-[#4A1620] transition-colors leading-snug mb-1">
                  {exhibitor.name}
                </h3>

                {/* Founder Info if confirmed */}
                {exhibitor.founder && (
                  <p className="text-xs font-sans text-[#6B5860] italic mb-3">
                    by {exhibitor.founder}
                  </p>
                )}

                {/* Category */}
                {exhibitor.category && (
                  <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-sans font-medium uppercase tracking-wider bg-[#4A1620]/5 text-[#4A1620]">
                    {exhibitor.category}
                  </div>
                )}
              </div>

              {/* Action footer */}
              <div className="pt-6 mt-6 border-t border-[#E9AD83]/20 flex items-center justify-between text-xs font-sans font-semibold text-[#4A1620] group-hover:text-[#D9A441] transition-colors">
                <span>
                  {lifecycleState === LIFECYCLE_STATES.LIVE ? 'VIEW BOOTH' : 'BRAND DOSSIER'}
                </span>
                <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
