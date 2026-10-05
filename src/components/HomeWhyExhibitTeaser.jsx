import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import MagneticButton from './MagneticButton';

const pillars = [
  {
    number: '01',
    title: 'Peak Diwali Timing',
    subtitle: 'High-Intent Pre-Festive Buying',
    desc: 'Positioned on the final weekend before Dhanteras and Diwali when affluent Patna families execute their highest-ticket jewellery, couture, and gifting purchases.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80',
    icon: TrendingUp,
  },
  {
    number: '02',
    title: '5-Star Curated Setting',
    subtitle: 'Tangerine Grand, Lemon Tree Premier',
    desc: 'Uncompromised luxury for your label. Full valet parking, climate-controlled comfort, carpeted aisles, and dedicated security for high-value designer merchandise.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    icon: Award,
  },
  {
    number: '03',
    title: '5,000+ Verified Patrons',
    subtitle: 'Direct Commercial Acceleration',
    desc: 'Build lasting clientele and repeat patrons. Gain immediate brand credibility, press amplification, and direct retail sales with zero distributor margins.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80',
    icon: Users,
  },
];

export default function HomeWhyExhibitTeaser({ onOpenBooking }) {
  return (
    <section className="relative w-full py-24 bg-[#FFFAF2] text-[#2B1B17] border-y border-[#D9A441]/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.15em] text-[#B85C38] font-sans font-semibold block">
              Founder Value Proposition
            </span>
            <h2 className="font-heading font-semibold text-4xl sm:text-5xl text-[#4A1620] tracking-tight leading-tight">
              Why Exhibit at UDAAN
            </h2>
            <p className="font-sans text-base text-[#2B1B17]/75 max-w-xl">
              Three pillars designed to ensure measurable commercial returns, brand prestige, and loyal patron acquisition for every participating woman entrepreneur.
            </p>
          </div>

          <MagneticButton
            onClick={() => onOpenBooking()}
            cursorLabel="Apply"
            className="btn-gold-luxury px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md self-start md:self-auto"
          >
            Apply as Exhibitor
          </MagneticButton>
        </div>

        {/* 3 Value Proposition Cards with Photographic Overlap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-[#2B1B17] border border-[#D9A441]/30 hover:border-[#D9A441] transition-all duration-500 shadow-xl flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Real Photographic Background */}
                <div className="h-64 w-full relative overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17] via-[#2B1B17]/50 to-transparent pointer-events-none" />

                  {/* Top Number & Icon */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="font-display font-semibold text-3xl text-[#FFFAF2] tracking-wider drop-shadow-md">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#D9A441] flex items-center justify-center shadow-md">
                      <Icon size={18} />
                    </div>
                  </div>
                </div>

                {/* Overlapping Content Section */}
                <div className="p-7 space-y-3 relative z-10 bg-[#2B1B17] flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-[#D9A441] block">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-heading font-semibold text-2xl text-[#FFFAF2] group-hover:text-[#D9A441] transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#FFFAF2]/80 leading-relaxed pt-1">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D9A441]/20">
                    <Link
                      to="/become-an-exhibitor"
                      data-cursor="Guide"
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#D9A441] hover:text-[#FFFAF2] tracking-wider uppercase transition-colors"
                    >
                      <span>Onboarding Details</span>
                      <ArrowRight size={13} />
                    </Link>
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
