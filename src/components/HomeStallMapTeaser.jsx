import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import MagneticButton from './MagneticButton';
import ScrollReveal from './ScrollReveal';

const SAMPLE_STALLS = [
  { id: 'A-01', zone: 'Prime Entrance', category: 'Fine Jewellery', size: '3m × 3m', price: '₹55,000', status: 'Booked', company: 'Tanisha Polki Jewels' },
  { id: 'A-02', zone: 'Prime Entrance', category: 'Fine Jewellery', size: '3m × 3m', price: '₹50,000', status: 'Available' },
  { id: 'A-03', zone: 'Prime Entrance', category: 'Bridal Couture', size: '3m × 3m', price: '₹50,000', status: 'Available' },
  { id: 'A-04', zone: 'Prime Entrance', category: 'Bridal Couture', size: '4m × 3m', price: '₹65,000', status: 'Available', isPrime: true },
  { id: 'A-05', zone: 'Prime Entrance', category: 'Fine Jewellery', size: '3m × 3m', price: '₹50,000', status: 'Booked', company: 'Shree Zaveri Atelier' },
  { id: 'A-06', zone: 'Prime Entrance', category: 'Heritage Sarees', size: '3m × 3m', price: '₹48,000', status: 'Available' },
  { id: 'B-01', zone: 'Central Promenade', category: 'Heritage Sarees', size: '3m × 3m', price: '₹45,000', status: 'Available' },
  { id: 'B-02', zone: 'Central Promenade', category: 'Haute Pret', size: '3m × 3m', price: '₹45,000', status: 'Available' },
  { id: 'B-03', zone: 'Central Promenade', category: 'Festive Decor', size: '3m × 3m', price: '₹42,000', status: 'Booked', company: 'Maati & Brass Studio' },
  { id: 'B-04', zone: 'Central Promenade', category: 'Festive Decor', size: '3m × 3m', price: '₹42,000', status: 'Available' },
  { id: 'B-05', zone: 'Central Promenade', category: 'Artisanal Wellness', size: '2.5m × 3m', price: '₹38,000', status: 'Available' },
  { id: 'B-06', zone: 'Central Promenade', category: 'Gourmet Hampers', size: '2.5m × 3m', price: '₹38,000', status: 'Booked', company: 'Mithai & Co.' },
  { id: 'C-01', zone: 'VIP Pavilion', category: 'Bridal Couture', size: '4m × 3m', price: '₹60,000', status: 'Available', isPrime: true },
  { id: 'C-02', zone: 'VIP Pavilion', category: 'Fine Jewellery', size: '3m × 3m', price: '₹52,000', status: 'Available' },
  { id: 'C-03', zone: 'VIP Pavilion', category: 'Fine Jewellery', size: '3m × 3m', price: '₹52,000', status: 'Available' },
  { id: 'C-04', zone: 'VIP Pavilion', category: 'Heritage Sarees', size: '3m × 3m', price: '₹48,000', status: 'Available' },
  { id: 'C-05', zone: 'VIP Pavilion', category: 'Haute Pret', size: '3m × 3m', price: '₹45,000', status: 'Booked', company: 'Viraasat Pret' },
  { id: 'C-06', zone: 'VIP Pavilion', category: 'Festive Decor', size: '3m × 3m', price: '₹42,000', status: 'Available' },
];

export default function HomeStallMapTeaser({ onOpenBooking, onSelectStall }) {
  const [selectedStallId, setSelectedStallId] = useState('A-04');
  const [activeZone, setActiveZone] = useState('All');

  const selectedStall = SAMPLE_STALLS.find((s) => s.id === selectedStallId) || SAMPLE_STALLS[3];

  const handleBook = () => {
    if (onSelectStall) {
      onSelectStall(selectedStall);
    } else if (onOpenBooking) {
      onOpenBooking(`Stall ${selectedStall.id}`);
    }
  };

  return (
    <section id="stall-map" className="relative w-full py-24 md:py-32 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden border-t border-[#D9A441]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal y={25}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B85C38] font-sans font-semibold block">
                Floor Plan & Allotment
              </span>
              <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] tracking-tight leading-[1.08]">
                Interactive Tangerine Grand Layout
              </h2>
              <p className="font-sans text-base text-[#2B1B17]/75 max-w-xl font-light leading-relaxed">
                Click any booth to inspect frontage, dimensions, and commercial specifications. Designed for fast, effortless company booking.
              </p>
            </div>

            <Link
              to="/stalls"
              className="btn-gold-luxury px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2B1B17] shadow-md flex items-center space-x-2 self-start md:self-auto"
            >
              <span>Full 3D Floor Map</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Interactive Layout Console */}
        <ScrollReveal delay={0.15} y={30} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Interactive Grid with Floor Plan Zones */}
          <div className="lg:col-span-7 bg-[#4A1620] rounded-3xl p-6 sm:p-8 border border-[#D9A441]/35 shadow-2xl flex flex-col justify-between space-y-6 text-[#FFFAF2]">
            {/* Console Header & Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9A441]/25 pb-4">
              <div>
                <span className="text-[10px] tracking-[0.22em] text-[#D9A441] uppercase font-semibold block font-sans">
                  Ground Floor • Lemon Tree Premier
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#FFFAF2]">
                  Pillarless Hall Grid View
                </h3>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 text-xs font-sans">
                <span className="flex items-center gap-1.5 text-white/80">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
                </span>
                <span className="flex items-center gap-1.5 text-[#D9A441]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" /> Selected
                </span>
                <span className="flex items-center gap-1.5 text-white/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-600" /> Booked
                </span>
              </div>
            </div>

            {/* Micro Floor Plan Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] font-sans text-[#D9A441] font-semibold tracking-wider uppercase px-1">
                <span>← Main Entrance Promenade</span>
                <span>VIP Stage & Lounge →</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {SAMPLE_STALLS.map((stall) => {
                  const isSelected = selectedStallId === stall.id;
                  const isBooked = stall.status === 'Booked';

                  return (
                    <button
                      key={stall.id}
                      onClick={() => !isBooked && setSelectedStallId(stall.id)}
                      disabled={isBooked}
                      className={`h-20 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center p-2 text-center relative group ${
                        isSelected
                          ? 'bg-[#D9A441] border-[#FFE8B3] text-[#4A1620] shadow-[0_0_20px_rgba(217,164,65,0.7)] scale-105 z-10'
                          : isBooked
                          ? 'bg-stone-900/60 border-stone-800 text-stone-500 cursor-not-allowed opacity-50'
                          : 'bg-[#360F17]/90 border-[#D9A441]/40 text-[#FFFAF2] hover:border-[#D9A441] hover:bg-[#4A1620]'
                      }`}
                    >
                      <span className={`text-xs font-bold font-sans ${isSelected ? 'text-[#2B1B17]' : 'text-[#FFFAF2]'}`}>
                        {stall.id}
                      </span>
                      <span className={`text-[9px] mt-0.5 font-sans leading-tight line-clamp-1 ${isSelected ? 'text-[#2B1B17]/80' : 'text-stone-400'}`}>
                        {isBooked ? 'Allotted' : stall.size}
                      </span>
                      {stall.isPrime && !isBooked && (
                        <span className={`text-[8px] uppercase tracking-wider font-bold mt-1 px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-[#2B1B17] text-[#D9A441]' : 'bg-[#D9A441]/20 text-[#D9A441]'}`}>
                          Prime
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Hall Amenities */}
            <div className="flex flex-wrap items-center justify-between text-xs text-[#FFFAF2]/70 border-t border-[#D9A441]/20 pt-4 font-sans">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#D9A441]" /> Full Air Conditioning & 100% DG Backup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#D9A441]" /> 24/7 Security for High-Value Goods
              </span>
            </div>
          </div>

          {/* Right 5 Cols: Selected Stall Live Inspector & Booking Action */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-3xl p-7 border border-[#D9A441]/35 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.22em] text-[#B85C38] uppercase font-bold font-sans">
                  Selected Booth Dossier
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-semibold">
                  {selectedStall.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-[#2B1B17]">
                  Stall {selectedStall.id}
                </h3>
                <p className="text-xs text-[#B8801F] font-sans font-semibold mt-0.5 tracking-wide uppercase">
                  {selectedStall.zone} • {selectedStall.category}
                </p>
              </div>

              {/* Specifications List */}
              <div className="space-y-3 pt-3 border-t border-stone-200 text-sm font-sans">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Dimensions:</span>
                  <span className="font-semibold text-[#2B1B17]">{selectedStall.size} (Octanorm Shell)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Hall Location:</span>
                  <span className="font-semibold text-[#2B1B17]">{selectedStall.zone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Recommended For:</span>
                  <span className="font-semibold text-[#2B1B17]">{selectedStall.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Included Hardware:</span>
                  <span className="font-medium text-[#2B1B17] text-right text-xs">Fascia Name, 3 Spots, Power, 2 Chairs, 1 Table</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-sm font-bold text-stone-600">Allotment Rate:</span>
                  <span className="font-serif text-3xl font-bold text-[#4A1620]">{selectedStall.price} <span className="text-xs font-sans text-stone-500 font-normal">+ GST</span></span>
                </div>
              </div>
            </div>

            {/* Direct Booking Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleBook}
                className="w-full btn-gold-luxury py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 text-[#2B1B17]"
              >
                <span>Book Stall {selectedStall.id} Now</span>
                <ArrowRight size={14} />
              </button>

              <p className="text-center text-[11px] text-stone-500 font-sans">
                Instant confirmation. No booking fee required to submit initial application.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
