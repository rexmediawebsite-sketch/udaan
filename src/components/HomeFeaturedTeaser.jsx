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
          {/* Left: 55% Photographic Media Frame */}
          <div className="w-full lg:w-[55%] relative group">
            <div className="relative h-[440px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(43,27,23,0.35)] border border-[#D9A441]/35">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Indian Festive Couture & Fine Jewellery at UDAAN Gala"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/90 via-black/20 to-transparent pointer-events-none" />

              {/* Verified Venue Tag */}
              <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-[#2B1B17]/85 backdrop-blur-md border border-[#D9A441]/40 text-[#FFFAF2] text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-2">
                <Sparkles size={12} className="text-[#D9A441]" />
                <span>Patna's Peak Festive Weekend</span>
              </div>

              {/* Bottom Quote Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-[#2B1B17]/85 backdrop-blur-md border border-[#D9A441]/30 text-[#FFFAF2]">
                <p className="font-serif italic text-base sm:text-lg leading-snug text-[#FFFAF2]/95">
                  “The premier luxury platform where Bihar's creative women transform bespoke passion into recognized powerhouses.”
                </p>
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
