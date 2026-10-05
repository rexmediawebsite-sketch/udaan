import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function HomeStallMapTeaser() {
  return (
    <section className="relative w-full py-24 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Interactive Graphic Teaser */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative rounded-2xl overflow-hidden bg-[#2B1B17] border border-[#D9A441]/40 p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#D9A441]/30 pb-4">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#D9A441] font-semibold block">
                    Pillarless Exhibition Hall
                  </span>
                  <h3 className="font-heading text-2xl text-[#FFFAF2] font-semibold">
                    Tangerine Grand Floor Plan
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2E7D5B]/30 border border-[#2E7D5B] text-[#86efac] text-xs font-semibold">
                  Live Allotment Active
                </span>
              </div>

              {/* Schematic Preview Grid */}
              <div className="grid grid-cols-6 gap-2.5 py-4">
                {/* 18 schematic micro booths */}
                {[...Array(18)].map((_, idx) => {
                  const isBooked = [2, 5, 8, 11, 14].includes(idx);
                  const isSelected = idx === 6;
                  return (
                    <div
                      key={idx}
                      className={`h-12 rounded-lg border flex flex-col items-center justify-center text-[10px] font-sans font-semibold transition-all ${
                        isBooked
                          ? 'bg-[#B5A89A]/30 border-[#B5A89A]/40 text-[#B5A89A]'
                          : isSelected
                          ? 'bg-[#D9A441] border-[#FFE8B3] text-[#2B1B17] shadow-[0_0_12px_#D9A441] scale-105'
                          : 'bg-[#2E7D5B]/20 border-[#2E7D5B]/50 text-[#86efac] hover:border-[#D9A441]'
                      }`}
                    >
                      <span>A-{idx + 1}</span>
                    </div>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="flex flex-wrap items-center justify-between text-xs font-sans text-[#FFFAF2]/80 pt-2 border-t border-[#D9A441]/20">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D5B]" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9A441]" /> Selected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B5A89A]" /> Booked
                </span>
              </div>
            </div>
          </div>

          {/* Right: Copy & CTA */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.15em] text-[#B85C38] font-sans font-semibold block">
                Booth Selection
              </span>
              <h2 className="font-heading font-semibold text-4xl sm:text-5xl text-[#4A1620] tracking-tight leading-tight">
                Architectural Floor Plan
              </h2>
              <p className="font-sans text-base text-[#2B1B17]/80 leading-relaxed">
                Tangerine Grand is Lemon Tree Premier's grand ground-floor pillarless hall. Review zone layouts, corner advantage booths, VIP entry promenade stalls, and live availability.
              </p>
            </div>

            <ul className="space-y-3 text-sm font-sans text-[#2B1B17]/85">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-[#B8801F] shrink-0 mt-0.5" />
                <span>Prime frontage stalls along the central red carpet aisle</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-[#B8801F] shrink-0 mt-0.5" />
                <span>Dedicated power lines, track lighting, and octanorm fascias included</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-[#B8801F] shrink-0 mt-0.5" />
                <span>Real-time price breakdown and instant multi-stall selection</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/stalls"
                data-cursor="Map"
                className="btn-maroon-luxury inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-md hover:shadow-xl"
              >
                <span>Launch Interactive Floor Plan &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
