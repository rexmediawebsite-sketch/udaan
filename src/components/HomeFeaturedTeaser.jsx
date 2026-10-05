import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function HomeFeaturedTeaser({ onOpenBooking }) {
  return (
    <section className="relative w-full py-24 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Split Row Layout: Image 55% / Card 45%, Zero Overlap, Zero Negative Margins */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: 55% Photographic Media Frame */}
          <div className="w-full lg:w-[55%] relative group">
            <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#D9A441]/30">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Indian Festive Couture & Fine Jewellery at UDAAN Gala"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/80 via-transparent to-black/20 pointer-events-none" />

              {/* Verified Venue Tag */}
              <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#FFFAF2] text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-2">
                <Sparkles size={12} className="text-[#D9A441]" />
                <span>Patna's Peak Festive Weekend</span>
              </div>

              {/* Bottom Quote Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#2B1B17]/85 backdrop-blur-md border border-[#D9A441]/30 text-[#FFFAF2]">
                <p className="font-serif italic text-base sm:text-lg leading-snug">
                  “The premier luxury platform where Bihar's creative women transform bespoke passion into recognized powerhouses.”
                </p>
              </div>
            </div>
          </div>

          {/* Right: 45% Editorial Information Card */}
          <div className="w-full lg:w-[45%] space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.15em] text-[#B85C38] font-sans font-semibold block">
                Flagship Festive Showcase
              </span>
              <h2 className="font-heading font-semibold text-4xl sm:text-5xl text-[#4A1620] tracking-tight leading-[1.1]">
                Glamour Gala <span className="text-[#B8801F] italic font-serif">Diwali 5</span>
              </h2>
              <p className="font-hindi text-xl text-[#B8801F] leading-relaxed">
                24 और 25 अक्टूबर 2026 • लेमन ट्री प्रीमियर, पटना
              </p>
            </div>

            <p className="font-sans text-base text-[#2B1B17]/80 leading-relaxed">
              Curated for Bihar’s high-intent wedding and pre-Diwali patrons. Explore 50+ women-led luxury pret ateliers, fine polki jewelers, and bespoke festive decor creators in an air-conditioned 5-star pavilion.
            </p>

            {/* Quick Venue & Date Facts */}
            <div className="space-y-3 py-2 border-y border-[#D9A441]/25">
              <div className="flex items-center gap-3 text-sm font-sans text-[#2B1B17]">
                <Calendar size={18} className="text-[#B85C38] shrink-0" />
                <span>Saturday 24 & Sunday 25 October 2026</span>
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
                className="btn-gold-luxury px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md"
              >
                Apply for Stall
              </MagneticButton>

              <Link
                to="/events/glamour-gala-5"
                data-cursor="Details"
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#4A1620] hover:text-[#B8801F] transition-colors py-2"
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
