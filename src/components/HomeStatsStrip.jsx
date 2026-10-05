import React, { useEffect, useState, useRef } from 'react';

const statsData = [
  { value: 50, suffix: '+', label: 'Curated Stalls', sub: 'Octanorm Luxury Booths' },
  { value: 100, suffix: '%', label: 'Women Entrepreneurs', sub: 'Founders & Creative Directors' },
  { value: 5000, suffix: '+', label: 'Festive Patrons', sub: 'High-Intent Patna Shoppers' },
  { value: 5, suffix: 'th', label: 'Landmark Edition', sub: 'Diwali Glamour Gala' },
];

export default function HomeStatsStrip() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const stripRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease-out expo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCounts(statsData.map((stat) => Math.floor(stat.value * ease)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={stripRef}
      className="relative w-full py-16 bg-[#4A1620] text-[#FFFAF2] border-y border-[#D9A441]/35 overflow-hidden select-none"
    >
      {/* Background ambient warm dusk glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#D9A441]/20">
          {statsData.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center text-center group cursor-default transition-all duration-300 hover:-translate-y-1 ${i > 0 ? 'pt-6 md:pt-0 md:pl-6' : ''}`}>
              <div className="font-cinzel font-bold text-5xl sm:text-6xl text-[#D9A441] tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(217,164,65,0.35)] group-hover:scale-105 transition-transform duration-300">
                {counts[i].toLocaleString()}
                <span className="text-[#FFFAF2]/90">{stat.suffix}</span>
              </div>
              <div className="mt-3 font-sans font-bold text-sm sm:text-base text-[#FFFAF2] tracking-wider uppercase">
                {stat.label}
              </div>
              <div className="mt-1 text-[11px] sm:text-xs font-sans text-[#FFFAF2]/65 font-light tracking-wide">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
