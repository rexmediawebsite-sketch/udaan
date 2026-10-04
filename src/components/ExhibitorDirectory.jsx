import React, { useState } from 'react';
import { Search, MapPin, ExternalLink, Sparkles, Filter } from 'lucide-react';
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
    <section id="brands" className="relative py-24 md:py-32 bg-[#FFF8F0] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#B96535]" />
              <span>CURATED FOUNDERS</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-[0.02em] leading-tight">
              Exhibitor <span className="italic font-light text-[#B96535]">Directory</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
            Discover the visionary women leaders, master textile revivalists, and luxury jewel designers participating in Glamour Gala Diwali Edition 5.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7E85] w-4 h-4" />
            <input
              type="text"
              placeholder="Search brand, founder, craft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl pl-10 pr-4 py-2 text-xs text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex items-center space-x-1.5 text-xs text-[#5E4A55] font-sans">
              <Filter size={13} className="text-[#B96535]" />
              <span className="font-semibold">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#FAF4EB] border border-[#E9AD83]/40 text-[#2A1C24] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#B96535] font-medium"
              >
                {categoriesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="flex items-center space-x-1.5 text-xs text-[#5E4A55] font-sans">
              <MapPin size={13} className="text-[#397EAC]" />
              <span className="font-semibold">City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-[#FAF4EB] border border-[#E9AD83]/40 text-[#2A1C24] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#397EAC] font-medium"
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
              className="bg-[#FFFBF5] border border-[#E9AD83]/30 hover:border-[#B96535] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(42,28,36,0.04)] hover:shadow-[0_14px_32px_rgba(185,101,53,0.12)]"
            >
              <div>
                {/* Brand Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF4EB]">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Stall Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#F6B51F] text-[#1E121B] font-sans font-bold text-xs shadow-sm">
                    Stall {brand.stall}
                  </div>

                  {/* City Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-[#E9AD83]/40 text-[10px] text-[#2A1C24] font-medium shadow-sm">
                    <MapPin size={10} className="text-[#397EAC]" />
                    <span>{brand.city}</span>
                  </div>
                </div>

                {/* Brand Info */}
                <div className="p-6">
                  <div className="text-[10px] tracking-[0.22em] uppercase text-[#B96535] font-semibold font-sans mb-1">
                    {brand.category}
                  </div>

                  <h3 className="font-serif text-2xl text-[#2A1C24] font-normal">
                    {brand.name}
                  </h3>

                  <div className="text-xs text-[#B96535] font-serif italic mt-0.5">
                    Founder: {brand.founder}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                    {brand.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer with Social & Profile */}
              <div className="p-6 pt-0 border-t border-[#E9AD83]/20 flex items-center justify-between mt-4">
                <span className="text-[11px] font-sans text-[#5E4A55] flex items-center">
                  <InstagramIcon size={13} className="mr-1 text-[#B96535]" />
                  {brand.instagram}
                </span>

                <a
                  href="#stall-map"
                  className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B96535] hover:text-[#2A1C24] flex items-center space-x-1 font-sans transition-colors"
                >
                  <span>Locate on Map</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Directory CTA */}
        <div className="mt-14 text-center p-8 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/40 shadow-sm">
          <h3 className="font-serif text-2xl text-[#2A1C24] font-normal">
            Are you a brand founder?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#5E4A55] max-w-md mx-auto font-light font-sans">
            Feature your collection in the official UDAAN Glamour Gala Directory and connect directly with high-intent festive shoppers.
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="mt-5 btn-sunset-gold px-7 py-3 rounded-full text-[#1E121B] font-semibold text-xs tracking-[0.22em] uppercase transition-all shadow-md"
          >
            Apply to Join Directory
          </button>
        </div>

      </div>
    </section>
  );
}
