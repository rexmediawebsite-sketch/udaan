import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function HomeFeaturedTeaser({ onOpenBooking }) {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden border-t border-[#D9A441]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Split Row Layout: Image 55% / Card 45%, Zero Overlap, Clean Editorial Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: 55% 3D Layered Glass Composition (Emerging from Screen) */}
          <div className="w-full lg:w-[55%] relative group">
            {/* 3D Perspective Stage */}
            <div 
              className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {/* Ambient Glow behind the emerging cards */}
              <div className="absolute w-[80%] h-[75%] bg-gradient-to-tr from-[#D9A441]/20 via-[#4A1620]/15 to-transparent rounded-full blur-3xl pointer-events-none transform -translate-y-4" />

              {/* LAYER 1: Deep Back Card (Angled & Soft Focus) */}
              <div 
                className="absolute left-[6%] sm:left-[10%] top-[8%] w-[62%] sm:w-[60%] h-[80%] rounded-[2rem] overflow-hidden border border-[#D9A441]/30 shadow-xl opacity-60 transition-all duration-700 ease-out group-hover:scale-98 group-hover:-translate-x-3 group-hover:-translate-y-2 pointer-events-none"
                style={{
                  transform: 'translateZ(-60px) rotate(-3deg)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85"
                  alt="Fine Heirloom Polki Jewelry"
                  className="w-full h-full object-cover filter blur-[1px] brightness-95"
                />
                <div className="absolute inset-0 bg-[#FBF4EA]/25" />
              </div>

              {/* LAYER 2: Middle Translucent Glass Pane (Gold Frosted Sheen) */}
              <div 
                className="absolute left-[12%] sm:left-[16%] top-[12%] w-[64%] sm:w-[62%] h-[78%] rounded-[2rem] overflow-hidden border border-[#D9A441]/50 backdrop-blur-md shadow-[0_20px_45px_rgba(74,22,32,0.15)] transition-all duration-700 ease-out group-hover:scale-102 group-hover:-translate-x-1 group-hover:translate-y-1 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 250, 242, 0.45) 0%, rgba(217, 164, 65, 0.18) 50%, rgba(74, 22, 32, 0.12) 100%)',
                  transform: 'translateZ(-10px) rotate(-1deg)',
                }}
              >
                {/* Subtle glass refraction rim */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none opacity-60" />
              </div>

              {/* LAYER 3: Foreground Card (Sharp, Popping Forward with Royal Maroon Rim) */}
              <div 
                className="absolute right-[4%] sm:right-[8%] top-[2%] w-[68%] sm:w-[64%] h-[92%] rounded-[2.25rem] overflow-hidden border-2 border-[#4A1620]/70 shadow-[0_30px_70px_-15px_rgba(74,22,32,0.45)] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:translate-x-2 group-hover:-translate-y-2 z-20 cursor-pointer bg-[#FBF4EA]"
                style={{
                  transform: 'translateZ(40px) rotate(1.5deg)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85"
                  alt="Luxury Handcrafted Pearl Necklace & Festive Jewels"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Surface Specular Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Verified Venue Tag in Maroon */}
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/50 text-[#FFFAF2] text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#D9A441]" />
                  <span>Patna's Peak Festive Weekend</span>
                </div>

                {/* Bottom Quote Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/35 text-[#FFFAF2]">
                  <p className="font-serif italic text-xs sm:text-sm leading-snug text-[#FFFAF2]/95">
                    “Where Bihar's creative women transform bespoke passion into recognized powerhouses.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 45% Editorial Information Card */}
          <div className="w-full lg:w-[45%] space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B85C38] uppercase shadow-sm">
                <Sparkles size={12} className="text-[#D9A441]" />
                <span>WHAT'S HAPPENING AT UDAAN</span>
              </div>

              <h2 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] tracking-tight leading-[1.08]">
                Glamour Gala <span className="italic font-normal text-[#B85C38]">Diwali Edition 5</span>
              </h2>

              <p className="font-hindi text-xl text-[#B8801F] leading-relaxed">
                24 और 25 अक्टूबर 2026 • लेमन ट्री प्रीमियर, पटना
              </p>
            </div>

            <p className="font-sans text-base text-[#2B1B17]/80 leading-relaxed font-light">
              Curated for Bihar’s high-intent wedding and pre-Diwali patrons. Explore 50+ women-led luxury pret ateliers, fine polki jewelers, and bespoke festive decor creators in an air-conditioned 5-star pavilion.
            </p>

            {/* Quick Venue & Date Facts */}
            <div className="space-y-3 py-3 border-y border-[#D9A441]/25">
              <div className="flex items-center gap-3 text-sm font-sans text-[#2B1B17]">
                <Calendar size={18} className="text-[#B85C38] shrink-0" />
                <span className="font-medium">Saturday 24 & Sunday 25 October 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-sans text-[#2B1B17]">
                <Clock size={18} className="text-[#B85C38] shrink-0" />
                <span>11:00 AM to 9:00 PM IST (Both Days)</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-sans text-[#2B1B17]">
                <MapPin size={18} className="text-[#B85C38] shrink-0" />
                <span>Tangerine Grand, Ground Floor, Lemon Tree Premier, Patna</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => onOpenBooking()}
                cursorLabel="Book"
                className="btn-gold-luxury px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md"
              >
                Apply for Stall Allotment
              </MagneticButton>

              <Link
                to="/events/glamour-gala-5"
                className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-[#4A1620] hover:text-[#B8801F] transition-colors py-2 border-b border-transparent hover:border-[#B8801F]"
              >
                <span>Full Exhibition Guide &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
