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
    <section id="brands" className="relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#22131D] to-[#180E15] overflow-hidden border-t border-[#E9AD83]/15 text-[#FFF1D9]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E99A18]/40 bg-[#251520] text-[11px] font-sans font-medium tracking-[0.25em] text-[#F6B51F] uppercase mb-4 shadow-sm">
              <Sparkles size={12} className="text-[#F6B51F]" />
              <span>CURATED FOUNDERS</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FFF1D9] tracking-[0.02em] leading-tight">
              Exhibitor <span className="italic font-light text-[#F6B51F]">Directory</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#E9AD83] font-sans font-light leading-relaxed">
            Discover the visionary women leaders, master textile revivalists, and luxury jewel designers participating in Glamour Gala Diwali Edition 5.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#24141F] border border-[#E9AD83]/25 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E9AD83]/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search brand, founder, craft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FFF1D9] placeholder-[#E9AD83]/40 focus:outline-none focus:border-[#F6B51F]"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex items-center space-x-1.5 text-xs text-[#E9AD83] font-sans">
              <Filter size={13} className="text-[#F6B51F]" />
              <span className="font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#180E15] border border-[#E9AD83]/30 text-[#F6B51F] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#F6B51F] font-medium"
              >
                {categoriesList.map(c => (
                  <option key={c} value={c} className="bg-[#180E15] text-[#FFF1D9]">{c}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="flex items-center space-x-1.5 text-xs text-[#E9AD83] font-sans">
              <MapPin size={13} className="text-[#74B6E2]" />
              <span className="font-medium">City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-[#180E15] border border-[#E9AD83]/30 text-[#74B6E2] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#397EAC] font-medium"
              >
                {citiesList.map(city => (
                  <option key={city} value={city} className="bg-[#180E15] text-[#FFF1D9]">{city}</option>
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
              className="bg-[#24141F] border border-[#E9AD83]/20 hover:border-[#F6B51F] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_14px_32px_rgba(246,181,31,0.14)]"
            >
              <div>
                {/* Brand Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180E15] via-transparent to-black/30" />
                  
                  {/* Stall Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#F6B51F] text-[#180E15] font-sans font-bold text-xs shadow-md">
                    Stall {brand.stall}
                  </div>

                  {/* City Badge (Solid - zero blur) */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#180E15] border border-[#E9AD83]/40 text-[10px] text-[#FFF1D9] font-medium">
                    <MapPin size={10} className="text-[#74B6E2]" />
                    <span>{brand.city}</span>
                  </div>
                </div>

                {/* Brand Info */}
                <div className="p-6">
                  <div className="text-[10px] tracking-[0.22em] uppercase text-[#F6B51F] font-semibold font-sans mb-1">
                    {brand.category}
                  </div>

                  <h3 className="font-serif text-2xl text-[#FFF1D9] font-normal">
                    {brand.name}
                  </h3>

                  <div className="text-xs text-[#E9AD83] font-serif italic mt-0.5">
                    Founder: {brand.founder}
                  </div>

                  <p className="mt-3 text-xs text-[#E9AD83]/80 font-sans font-light leading-relaxed">
                    {brand.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer with Social & Profile */}
              <div className="p-6 pt-0 border-t border-[#E9AD83]/15 flex items-center justify-between mt-4">
                <span className="text-[11px] font-sans text-[#E9AD83]/70 flex items-center">
                  <InstagramIcon size={13} className="mr-1 text-[#F6B51F]" />
                  {brand.instagram}
                </span>

                <a
                  href="#stall-map"
                  className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#F6B51F] hover:text-[#FFF1D9] flex items-center space-x-1 font-sans transition-colors"
                >
                  <span>Locate on Map</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Directory CTA */}
        <div className="mt-14 text-center p-8 rounded-2xl bg-[#2E1828] border border-[#E99A18]/40 shadow-xl">
          <h3 className="font-serif text-2xl text-[#FFF1D9] font-normal">
            Are you a brand founder?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#E9AD83] max-w-md mx-auto font-light font-sans">
            Feature your collection in the official UDAAN Glamour Gala Directory and connect directly with high-intent festive shoppers.
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="mt-5 btn-sunset-gold px-7 py-3 rounded-full text-[#180E15] font-semibold text-xs tracking-[0.22em] uppercase transition-all shadow-md"
          >
            Apply to Join Directory
          </button>
        </div>

      </div>
    </section>
  );
}
