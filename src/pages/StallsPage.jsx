import React from 'react';
import { Link } from 'react-router-dom';
import StallMap from '../components/StallMap';
import { Sparkles } from 'lucide-react';

export default function StallsPage({ onSelectStall }) {
  return (
    <div className="pt-28 pb-24 bg-[#180E15] min-h-screen text-[#FFF1D9]">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans text-[#E9AD83]/70 mb-6">
          <Link to="/" className="hover:text-[#F6B51F]">HOME</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-[#F6B51F]">EVENTS</Link>
          <span>/</span>
          <span className="text-[#F6B51F] font-semibold">TANGERINE GRAND STALL MAP</span>
        </div>

        {/* Header intro */}
        <div className="p-8 rounded-3xl bg-[#24141F] border border-[#E9AD83]/25 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold mb-1">
              <Sparkles size={11} />
              <span>LEMON TREE PREMIER PATNA</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#FFF1D9]">
              Tangerine Grand • Stall Floor Plan
            </h1>
            <p className="text-xs text-[#E9AD83]/80 font-sans mt-1">
              24 & 25 October 2026 • Ground Floor Pillarless Exhibition Hall
            </p>
          </div>

          <Link
            to="/become-an-exhibitor"
            className="btn-sunset-gold px-6 py-3 rounded-full text-[#180E15] font-semibold text-xs tracking-widest uppercase self-start md:self-auto shrink-0 shadow-lg"
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
