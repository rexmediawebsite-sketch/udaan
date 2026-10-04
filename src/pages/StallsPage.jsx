import React from 'react';
import { Link } from 'react-router-dom';
import StallMap from '../components/StallMap';
import { Sparkles, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { FEATURED_EVENT } from '../data/eventData';

export default function StallsPage({ onSelectStall }) {
  return (
    <div className="pt-28 pb-24 bg-[#1b0607] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans text-white/50 mb-6">
          <Link to="/" className="hover:text-[#E5A93C]">HOME</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-[#E5A93C]">EVENTS</Link>
          <span>/</span>
          <span className="text-[#E5A93C] font-semibold">TANGERINE GRAND STALL MAP</span>
        </div>

        {/* Header intro */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1C120D] via-[#24150F] to-[#140D09] border border-[#E5A93C]/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold mb-1">
              <Sparkles size={11} />
              <span>LEMON TREE PREMIER PATNA</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF5EB]">
              Tangerine Grand • Stall Floor Plan
            </h1>
            <p className="text-xs text-[#F4ECE1]/75 font-sans mt-1">
              24 & 25 October 2026 • Ground Floor Pillarless Exhibition Hall
            </p>
          </div>

          <Link
            to="/become-an-exhibitor"
            className="px-6 py-3 rounded-full bg-[#E5A93C] text-[#0E0907] font-semibold text-xs tracking-widest uppercase hover:bg-[#FCE7B8] transition-colors self-start md:self-auto shrink-0 shadow-lg"
          >
            Allotment Process &rarr;
          </Link>
        </div>
      </div>

      {/* The Interactive Stall Map Component */}
      <StallMap onSelectStallForBooking={onSelectStall} />
    </div>
  );
}
