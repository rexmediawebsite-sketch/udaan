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
      return "bg-[#E5A93C] text-[#160B0A] border-[#FAF6F0] shadow-[0_0_20px_rgba(229,169,60,0.6)] scale-[1.03] z-20 font-semibold";
    }
    switch (status) {
      case "AVAILABLE":
        return "bg-[#251917] text-[#F3D2A2] border-[#E5A93C]/45 hover:border-[#E5A93C] hover:bg-[#2e1d1b]";
      case "BOOKED":
        return "bg-[#160B0A] text-[#C2B8B5]/30 border-white/5 cursor-not-allowed opacity-55";
      case "RESERVED":
        return "bg-[#1C110F] text-[#E5A93C]/80 border-[#E5A93C]/25 cursor-not-allowed";
      default:
        return "bg-[#251917] text-[#FAF6F0]/70 border-white/10";
    }
  };

  const statusLegend = [
    { label: "AVAILABLE", color: "bg-[#251917] border-[#E5A93C]/60 text-[#F3D2A2]", dot: "bg-[#E5A93C]" },
    { label: "SELECTED", color: "bg-[#E5A93C] text-[#160B0A]", dot: "bg-white" },
    { label: "RESERVED", color: "bg-[#1C110F] border-[#E5A93C]/25 text-[#E5A93C]/80", dot: "bg-[#E5A93C]/70" },
    { label: "BOOKED", color: "bg-[#160B0A] border-white/10 text-[#C2B8B5]/30", dot: "bg-white/30" },
  ];

  return (
    <section id="stall-map" className="relative py-24 md:py-32 bg-[#251917] overflow-hidden border-t border-[#E5A93C]/20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E5A93C]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#1C110F]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
            <Layers size={12} className="text-[#E5A93C]" />
            <span>INTERACTIVE SELECTION</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
            Exhibition <span className="italic font-light text-[#E5A93C]">Stall Map</span>
          </h2>
          
          <p className="mt-4 text-[#C2B8B5] text-sm sm:text-base font-sans font-light leading-relaxed">
            Explore the architectural layout of Tangerine Grand at Lemon Tree Premier. Select an available stall to inspect its dimensions, location, and apply for immediate allotment.
          </p>

          {/* Sample Data Disclaimer required by prompt */}
          <div className="mt-3 inline-flex items-center space-x-1.5 text-[11px] tracking-wider text-[#C2B8B5]/60 bg-white/5 px-3.5 py-1 rounded-full border border-white/10 font-sans">
            <Info size={11} className="text-[#E5A93C]" />
            <span>Stall layout schematic representation. Allotment subject to final curation review.</span>
          </div>
        </div>

        {/* Status Legend & Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/10 mb-8 backdrop-blur-md">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans tracking-wider">
            {statusLegend.map((leg) => (
              <div key={leg.label} className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-sm border ${leg.color} ${leg.dot}`} />
                <span className="text-[11px] font-medium text-[#F4ECE1]/80">{leg.label}</span>
              </div>
            ))}
          </div>

          {/* Quick Filter */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-white/50 tracking-wider text-[11px]">FILTER:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#1C120D] border border-white/20 text-[#FCE7B8] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#E5A93C]"
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
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-[#1C110F]/90 border border-[#E5A93C]/20 shadow-2xl backdrop-blur-md">
            
            {/* Grand Entrance Banner in Hall */}
            <div className="text-center py-2.5 mb-6 border-b border-white/10">
              <span className="text-[10px] tracking-[0.35em] text-[#E5A93C] uppercase font-semibold font-sans">
                ▲ MAIN ENTRANCE & VIP RECEPTION (GROUND FLOOR) ▲
              </span>
            </div>

            {/* Stalls Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredStalls.map((stall) => {
                const isSelected = selectedStallId === stall.id;
                const isBooked = stall.status === "BOOKED";
                const isReserved = stall.status === "RESERVED";

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
                        isSelected ? 'bg-black text-white' : 'bg-black/30'
                      }`}>
                        {stall.status}
                      </span>
                    </div>

                    <div className="mt-1">
                      <div className="text-[10px] sm:text-[11px] font-sans font-medium truncate">
                        {stall.type}
                      </div>
                      <div className="text-[9px] text-[#C2B8B5]/70 font-sans mt-0.5">
                        {stall.size}
                      </div>
                    </div>

                    {/* Exhibitor Name if Booked */}
                    {stall.exhibitor && (
                      <div className="text-[9px] text-[#E5A93C] truncate font-serif italic">
                        {stall.exhibitor}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hall Stages Legend at bottom */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] tracking-wider text-[#C2B8B5]/60 font-sans">
              <span>◄ NORTH LOUNGE (FASHION PREVIEWS)</span>
              <span>CENTRAL TANGERINE BOULEVARD</span>
              <span>SOUTH PAVILION (GOURMET & LIVING) ►</span>
            </div>
          </div>

          {/* Selected Stall Details Drawer (Right 4 Cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="p-6 md:p-8 rounded-3xl bg-[#1C110F] border border-[#E5A93C]/40 shadow-2xl relative overflow-hidden">
              {/* Subtle gold badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans">
                  STALL INSPECTOR
                </span>
                <span className={`text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full uppercase font-bold font-sans ${
                  selectedStall.status === "AVAILABLE"
                    ? "bg-[#E5A93C]/20 text-[#F3D2A2] border border-[#E5A93C]/40"
                    : selectedStall.status === "RESERVED"
                    ? "bg-amber-900/40 text-[#F3D2A2] border border-amber-500/30"
                    : "bg-white/10 text-[#C2B8B5]/60"
                }`}>
                  {selectedStall.status}
                </span>
              </div>

              {/* Stall ID & Type */}
              <h3 className="font-serif font-bold text-3xl text-[#FAF6F0]">
                Stall {selectedStall.id}
              </h3>
              <p className="font-serif italic text-lg text-[#E5A93C] mt-0.5">
                {selectedStall.type}
              </p>

              {/* Specs Table */}
              <div className="mt-6 space-y-3.5 text-xs border-t border-b border-white/10 py-5 font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-[#C2B8B5]/70">Dimensions / Size</span>
                  <span className="font-semibold text-[#FAF6F0]">{selectedStall.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#C2B8B5]/70">Hall Placement</span>
                  <span className="font-semibold text-[#FAF6F0]">{selectedStall.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#C2B8B5]/70">Recommended Category</span>
                  <span className="font-semibold text-[#FAF6F0]">{selectedStall.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#C2B8B5]/70">Included Amenities</span>
                  <span className="font-semibold text-[#F3D2A2]">Fascia, 2 Spots, Power</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#C2B8B5]/70">Commercial Tariff</span>
                  <span className="font-semibold text-[#E5A93C]">Price on Request</span>
                </div>
              </div>

              {/* Exhibitor info if already taken */}
              {selectedStall.exhibitor && (
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <span className="text-[#C2B8B5]/60 block text-[10px] tracking-wider uppercase font-sans">ALLOTTED BRAND</span>
                  <span className="font-serif text-sm text-[#F3D2A2] font-medium">{selectedStall.exhibitor}</span>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-6">
                {selectedStall.status === "AVAILABLE" ? (
                  <button
                    onClick={() => onSelectStallForBooking(selectedStall)}
                    className="w-full py-3.5 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#F3D2A2] transition-colors shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Book Stall {selectedStall.id}</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectStallForBooking({ ...selectedStall, requestWaitlist: true })}
                    className="btn-ghost-pill w-full py-3.5 rounded-full text-[#FAF6F0] hover:text-[#E5A93C] text-xs font-sans tracking-[0.22em] uppercase transition-colors"
                  >
                    Join Waitlist for {selectedStall.id}
                  </button>
                )}
              </div>

              <p className="mt-4 text-[10px] text-[#C2B8B5]/50 text-center leading-normal font-sans">
                Instant reservation hold for 48 hours following review by the curation team.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
