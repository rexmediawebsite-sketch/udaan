import React, { useState } from 'react';
import { Sparkles, MapPin, CheckCircle, Clock, Lock, ArrowRight, Info, Layers } from 'lucide-react';
import { STALLS_DATA, FEATURED_EVENT } from '../data/eventData';

export default function StallMap({ onSelectStallForBooking }) {
  const [selectedStallId, setSelectedStallId] = useState("P-02");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");

  const selectedStall = STALLS_DATA.find((s) => s.id === selectedStallId) || STALLS_DATA[1];

  const filteredStalls = STALLS_DATA.filter((s) => {
    if (filterStatus !== "ALL" && s.status !== filterStatus) return false;
    if (filterType !== "ALL" && s.type !== filterType) return false;
    return true;
  });

  const getStatusColor = (status, isSelected) => {
    if (isSelected) {
      return "bg-[#F6B51F] text-[#2A1C24] border-2 border-white shadow-[0_0_24px_rgba(246,181,31,0.5)] scale-[1.03] z-20 font-bold";
    }
    switch (status) {
      case "AVAILABLE":
        return "bg-white/95 text-[#2A1C24] border border-[#E9AD83]/40 hover:border-[#F6B51F] hover:bg-white shadow-sm";
      case "BOOKED":
        return "bg-[#1B1117] text-[#754633]/50 border-white/5 cursor-not-allowed opacity-50";
      case "RESERVED":
        return "bg-[#49313E] text-[#E9AD83] border border-[#E9AD83]/25 cursor-not-allowed";
      default:
        return "bg-[#2D1D26] text-[#FFF1D9]/70 border-white/10";
    }
  };

  const statusLegend = [
    { label: "AVAILABLE", color: "bg-white border-[#E9AD83]/40 text-[#2A1C24]", dot: "bg-[#2A1C24]" },
    { label: "SELECTED", color: "bg-[#F6B51F] text-[#2A1C24]", dot: "bg-white" },
    { label: "RESERVED", color: "bg-[#49313E] border-[#E9AD83]/30 text-[#E9AD83]", dot: "bg-[#E9AD83]" },
    { label: "BOOKED", color: "bg-[#1B1117] border-white/10 text-[#754633]/60", dot: "bg-white/20" },
  ];

  return (
    <section id="stall-map" className="relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#22131D] to-[#180E15] overflow-hidden border-t border-[#E9AD83]/15">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E99A18]/40 bg-[#251520] text-[11px] font-sans font-medium tracking-[0.25em] text-[#F6B51F] uppercase mb-4 shadow-sm">
            <Layers size={12} className="text-[#F6B51F]" />
            <span>INTERACTIVE SELECTION</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FFF1D9] tracking-[0.02em] leading-tight">
            Exhibition <span className="italic font-light text-[#F6B51F]">Stall Map</span>
          </h2>
          
          <p className="mt-4 text-[#E9AD83] text-sm sm:text-base font-sans font-light leading-relaxed">
            Explore the architectural layout of Tangerine Grand at Lemon Tree Premier. Select an available stall to inspect its dimensions, location, and apply for immediate allotment.
          </p>

          <div className="mt-3 inline-flex items-center space-x-1.5 text-[11px] tracking-wider text-[#FFF1D9]/75 bg-[#251520] px-3.5 py-1 rounded-full border border-[#E9AD83]/25 font-sans">
            <Info size={11} className="text-[#F6B51F]" />
            <span>Stall layout schematic representation. Allotment subject to final curation review.</span>
          </div>
        </div>

        {/* Status Legend & Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#24141F] border border-[#E9AD83]/25 mb-8 shadow-xl">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans tracking-wider">
            {statusLegend.map((leg) => (
              <div key={leg.label} className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-sm border ${leg.color} ${leg.dot}`} />
                <span className="text-[11px] font-medium text-[#FFF1D9]/90">{leg.label}</span>
              </div>
            ))}
          </div>

          {/* Quick Filter */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#E9AD83] tracking-wider text-[11px]">FILTER:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#38232F] border border-[#E9AD83]/35 text-[#F6B51F] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#F6B51F]"
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">Available Only</option>
              <option value="RESERVED">Reserved</option>
              <option value="BOOKED">Booked</option>
            </select>
          </div>
        </div>

        {/* Layout Grid + Live Stall Inspector Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Floor Plan Grid (Left 8 Cols) */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-[#20141B] border border-[#E9AD83]/25 shadow-2xl">
            
            {/* Grand Entrance Banner in Hall */}
            <div className="text-center py-2.5 mb-6 border-b border-[#E9AD83]/20">
              <span className="text-[10px] tracking-[0.35em] text-[#F6B51F] uppercase font-semibold font-sans">
                ▲ MAIN ENTRANCE & VIP RECEPTION (GROUND FLOOR) ▲
              </span>
            </div>

            {/* Stalls Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredStalls.map((stall) => {
                const isSelected = selectedStallId === stall.id;

                return (
                  <button
                    key={stall.id}
                    onClick={() => setSelectedStallId(stall.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300 relative flex flex-col justify-between h-28 sm:h-32 ${getStatusColor(
                      stall.status,
                      isSelected
                    )}`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <span className="font-serif font-bold text-base sm:text-lg tracking-tight">
                        {stall.id}
                      </span>
                      <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded tracking-widest font-semibold uppercase ${
                        isSelected ? 'bg-[#2A1C24] text-[#F6B51F]' : 'bg-black/30'
                      }`}>
                        {stall.status}
                      </span>
                    </div>

                    <div className="mt-1">
                      <div className="text-[10px] sm:text-[11px] font-sans font-medium truncate">
                        {stall.type}
                      </div>
                      <div className="text-[9px] text-[#6B5860] font-sans mt-0.5">
                        {stall.size}
                      </div>
                    </div>

                    {/* Exhibitor Name if Booked */}
                    {stall.exhibitor && (
                      <div className="text-[9px] text-[#B96535] truncate font-serif italic">
                        {stall.exhibitor}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hall Stages Legend at bottom */}
            <div className="mt-8 pt-4 border-t border-[#E9AD83]/20 flex flex-wrap items-center justify-between text-[10px] tracking-wider text-[#E9AD83]/80 font-sans">
              <span>◄ NORTH LOUNGE (FASHION PREVIEWS)</span>
              <span>CENTRAL TANGERINE BOULEVARD</span>
              <span>SOUTH PAVILION (GOURMET & LIVING) ►</span>
            </div>
          </div>

          {/* Selected Stall Details Drawer (Right 4 Cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="p-6 md:p-8 rounded-3xl bg-[#2E1828] border border-[#E9AD83]/30 shadow-2xl relative overflow-hidden">
              {/* Subtle gold badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans">
                  STALL INSPECTOR
                </span>
                <span className={`text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full uppercase font-bold font-sans ${
                  selectedStall.status === "AVAILABLE"
                    ? "bg-[#F6B51F]/20 text-[#F6B51F] border border-[#E99A18]/40"
                    : selectedStall.status === "RESERVED"
                    ? "bg-[#251A22] text-[#E9AD83] border border-[#E9AD83]/30"
                    : "bg-[#251A22] text-[#9A8790]"
                }`}>
                  {selectedStall.status}
                </span>
              </div>

              {/* Stall ID & Type */}
              <h3 className="font-serif font-bold text-3xl text-[#FFF1D9]">
                Stall {selectedStall.id}
              </h3>
              <p className="font-serif italic text-lg text-[#F6B51F] mt-0.5">
                {selectedStall.type}
              </p>

              {/* Specs Table */}
              <div className="mt-6 space-y-3.5 text-xs border-t border-b border-[#E9AD83]/20 py-5 font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-[#E9AD83]">Dimensions / Size</span>
                  <span className="font-semibold text-[#FFF1D9]">{selectedStall.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#E9AD83]">Hall Placement</span>
                  <span className="font-semibold text-[#FFF1D9]">{selectedStall.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#E9AD83]">Recommended Category</span>
                  <span className="font-semibold text-[#FFF1D9]">{selectedStall.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#E9AD83]">Included Amenities</span>
                  <span className="font-semibold text-[#F6B51F]">Fascia, 2 Spots, Power</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#E9AD83]">Commercial Tariff</span>
                  <span className="font-semibold text-[#F6B51F]">Price on Request</span>
                </div>
              </div>

              {/* Exhibitor info if already taken */}
              {selectedStall.exhibitor && (
                <div className="mt-4 p-3 rounded-xl bg-[#251A22] border border-[#E9AD83]/25 text-xs">
                  <span className="text-[#E9AD83] block text-[10px] tracking-wider uppercase font-sans">ALLOTTED BRAND</span>
                  <span className="font-serif text-sm text-[#F6B51F] font-medium">{selectedStall.exhibitor}</span>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-6">
                {selectedStall.status === "AVAILABLE" ? (
                  <button
                    onClick={() => onSelectStallForBooking(selectedStall)}
                    className="btn-sunset-gold w-full py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Book Stall {selectedStall.id}</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectStallForBooking({ ...selectedStall, requestWaitlist: true })}
                    className="btn-sunset-ghost-dark w-full py-3.5 rounded-full text-[#FFF1D9] hover:text-[#F6B51F] text-xs font-sans tracking-[0.22em] uppercase transition-colors"
                  >
                    Join Waitlist for {selectedStall.id}
                  </button>
                )}
              </div>

              <p className="mt-4 text-[10px] text-[#E9AD83]/70 text-center leading-normal font-sans">
                Instant reservation hold for 48 hours following review by the curation team.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
