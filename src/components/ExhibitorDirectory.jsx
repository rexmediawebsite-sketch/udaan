import React, { useState } from 'react';
import { Search, MapPin, Tag, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { BRANDS_DIRECTORY, CATEGORIES } from '../data/eventData';

const InstagramIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function ExhibitorDirectory({ onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCity, setSelectedCity] = useState("ALL");

  const categoriesList = ["ALL", ...CATEGORIES.map(c => c.title)];
  const citiesList = ["ALL", "Patna", "Varanasi / Patna", "Jaipur / Patna", "Madhubani", "Ranchi / Patna"];

  const filteredBrands = BRANDS_DIRECTORY.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || brand.category === selectedCategory;
    const matchesCity = selectedCity === "ALL" || brand.city === selectedCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <section id="brands" className="relative py-24 md:py-32 bg-[#1C110F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#251917]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
              <Sparkles size={12} className="text-[#E5A93C]" />
              <span>CURATED FOUNDERS</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
              Exhibitor <span className="italic font-light text-[#E5A93C]">Directory</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#C2B8B5] font-sans font-light leading-relaxed">
            Discover the visionary women leaders, master textile revivalists, and luxury jewel designers participating in Glamour Gala Diwali Edition 5.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#251917] border border-white/10 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C2B8B5]/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search brand, founder, craft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1C110F] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex items-center space-x-1.5 text-xs text-[#C2B8B5]/70 font-sans">
              <Filter size={13} className="text-[#E5A93C]" />
              <span>Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#1C110F] border border-white/15 text-[#F3D2A2] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#E5A93C]"
              >
                {categoriesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="flex items-center space-x-1.5 text-xs text-[#C2B8B5]/70 font-sans">
              <MapPin size={13} className="text-[#E5A93C]" />
              <span>City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-[#1C110F] border border-white/15 text-[#F3D2A2] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#E5A93C]"
              >
                {citiesList.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Brands Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Brand Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#251917] via-transparent to-black/30" />
                  
                  {/* Stall Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#E5A93C] text-[#160B0A] font-sans font-bold text-xs shadow-md">
                    Stall {brand.stall}
                  </div>

                  {/* City Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#160B0A]/70 backdrop-blur-md text-[10px] text-[#FAF6F0]">
                    <MapPin size={10} className="text-[#2B6C9E]" />
                    <span>{brand.city}</span>
                  </div>
                </div>

                {/* Brand Info */}
                <div className="p-6">
                  <div className="text-[10px] tracking-[0.22em] uppercase text-[#E5A93C] font-semibold font-sans mb-1">
                    {brand.category}
                  </div>

                  <h3 className="font-serif text-2xl text-[#FAF6F0] font-normal">
                    {brand.name}
                  </h3>

                  <div className="text-xs text-[#F3D2A2]/80 font-serif italic mt-0.5">
                    Founder: {brand.founder}
                  </div>

                  <p className="mt-3 text-xs text-[#C2B8B5] font-sans font-light leading-relaxed">
                    {brand.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer with Social & Profile */}
              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                <span className="text-[11px] font-sans text-[#C2B8B5]/80 flex items-center">
                  <InstagramIcon size={13} className="mr-1 text-[#E5A93C]" />
                  {brand.instagram}
                </span>

                <a
                  href="#stall-map"
                  className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#E5A93C] hover:text-[#F3D2A2] flex items-center space-x-1 font-sans"
                >
                  <span>Locate on Map</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Directory CTA */}
        <div className="mt-14 text-center p-8 rounded-2xl bg-gradient-to-r from-[#251917] via-[#1C110F] to-[#251917] border border-[#E5A93C]/20 shadow-xl">
          <h3 className="font-serif text-2xl text-[#FAF6F0] font-normal">
            Are you a brand founder?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#C2B8B5] max-w-md mx-auto font-light font-sans">
            Feature your collection in the official UDAAN Glamour Gala Directory and connect directly with high-intent Diwali shoppers.
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="btn-ghost-pill mt-5 px-7 py-3 rounded-full text-[#FAF6F0] hover:text-[#E5A93C] font-semibold text-xs tracking-[0.22em] uppercase transition-colors shadow-lg"
          >
            Apply to Join Directory
          </button>
        </div>

      </div>
    </section>
  );
}
