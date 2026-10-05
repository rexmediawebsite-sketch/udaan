import React from 'react';
import { Link } from 'react-router-dom';
import StallMap from '../components/StallMap';
import { UdaanDiamond } from '../components/UdaanIcons';

export default function StallsPage({ onSelectStall }) {
  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-6">
          <Link to="/" className="hover:text-[#B96535]">HOME</Link>
          <span className="text-[#6B5860]/40">/</span>
          <Link to="/events" className="hover:text-[#B96535]">EVENTS</Link>
          <span className="text-[#6B5860]/40">/</span>
          <span className="text-[#B96535] font-semibold">TANGERINE GRAND STALL MAP</span>
        </div>

        {/* Header intro */}
        <div className="p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold mb-1">
              <UdaanDiamond size={10} />
              <span>LEMON TREE PREMIER PATNA</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
              Tangerine Grand • Stall Floor Plan
            </h1>
            <p className="text-xs text-[#5E4A55] font-sans mt-1">
              24 & 25 October 2026 • Ground Floor Pillarless Exhibition Hall
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
            <Link
              to="/apply"
              className="btn-sunset-gold px-6 py-3 rounded-full text-[#2A1C24] font-semibold text-xs tracking-widest uppercase shadow-md"
            >
              Apply for Stall &rarr;
            </Link>
            <Link
              to="/become-an-exhibitor"
              className="px-5 py-3 rounded-full border border-[#E9AD83]/60 bg-[#FAF4EB] hover:bg-[#FFF1D9] text-[#2A1C24] font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              Process Guide
            </Link>
          </div>
        </div>
      </div>

      {/* The Interactive Stall Map Component */}
      <StallMap onSelectStallForBooking={onSelectStall} />
    </div>
  );
}
