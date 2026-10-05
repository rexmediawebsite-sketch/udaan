import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const pillars = [
  {
    number: '01',
    title: 'Peak Festive Timing',
    subtitle: 'High-Intent Pre-Diwali Patrons',
    desc: 'Scheduled on the final pre-Diwali weekend when Patna’s most affluent families execute their major festive jewellery, wedding couture, and luxury gifting budgets.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80',
    // Elegant bespoke SVG icon
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '5-Star Curated Venue',
    subtitle: 'Tangerine Grand, Lemon Tree',
    desc: 'Uncompromised luxury for your label. An expansive pillarless hall with climate control, valet parking, carpeted aisles, and continuous security for high-value merchandise.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h6M9 14h6M9 18h6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: '5,000+ Elite Patrons',
    subtitle: 'Direct Commercial Acceleration',
    desc: 'Engage directly with motivated buyers, bridal curators, and corporate gift buyers with zero distributor cuts. Build long-term clients and elevate brand prestige.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function HomeWhyExhibitTeaser({ onOpenBooking }) {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FFFAF2] text-[#2B1B17] border-y border-[#D9A441]/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B85C38] font-sans font-semibold block">
              Founder Value Proposition
            </span>
            <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] tracking-tight leading-[1.08]">
              Why Exhibit with UDAAN
            </h2>
            <p className="font-sans text-base text-[#2B1B17]/75 max-w-xl font-light leading-relaxed">
              Three pillars designed to ensure measurable commercial returns, brand prestige, and loyal patron acquisition for every participating woman entrepreneur.
            </p>
          </div>

          <MagneticButton
            onClick={() => onOpenBooking()}
            cursorLabel="Apply"
            className="btn-gold-luxury px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md self-start md:self-auto"
          >
            Apply for Stall Allotment
          </MagneticButton>
        </div>

        {/* 3 Pillars Cards: Clean Ivory, Elegant Typography, Bespoke Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#D9A441]/30 hover:border-[#D9A441] transition-all duration-500 shadow-[0_12px_36px_rgba(43,27,23,0.06)] hover:shadow-2xl flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Real Photographic Background */}
              <div className="h-60 w-full relative overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                {/* Top Number & Crisp Vector Icon */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span className="font-serif font-bold text-3xl text-white tracking-wider drop-shadow-md">
                    {pillar.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#2B1B17]/80 backdrop-blur-md border border-[#D9A441]/50 text-[#D9A441] flex items-center justify-center shadow-lg">
                    {pillar.iconSvg}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-7 space-y-3 relative z-10 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-[#B85C38] block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#2B1B17] group-hover:text-[#B8801F] transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#2B1B17]/75 leading-relaxed font-light pt-1">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    to="/become-an-exhibitor"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#B8801F] hover:text-[#2B1B17] tracking-wider uppercase transition-colors"
                  >
                    <span>Founder Onboarding Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
