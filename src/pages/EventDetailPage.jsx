import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/eventData';

export default function EventDetailPage({ onOpenBooking }) {
  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-8">
          <Link to="/" className="hover:text-[#B96535]">HOME</Link>
          <span className="text-[#6B5860]/40">/</span>
          <Link to="/events" className="hover:text-[#B96535]">EVENTS</Link>
          <span className="text-[#6B5860]/40">/</span>
          <span className="text-[#B96535] font-semibold">GLAMOUR GALA DIWALI EDITION 5</span>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E9AD83]/30 bg-[#FFFBF5] p-8 md:p-14 shadow-lg mb-16">
          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase shadow-sm">
              <Sparkles size={11} className="text-[#B96535]" />
              <span>OFFICIAL FLAGSHIP EVENT</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#2A1C24] leading-tight">
              Glamour Gala <br />
              <span className="italic font-light text-[#B96535]">Diwali Edition 5</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5E4A55] font-sans font-light leading-relaxed">
              Bihar's most prestigious pre-Diwali luxury exhibition. Over two action-packed days, 50+ handpicked women founders will unveil their exclusive festive collections to more than 5,000 discerning shoppers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E9AD83]/30 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">DATES</span>
                <span className="font-semibold text-[#B96535] text-sm block mt-0.5">24 & 25 OCT 2026</span>
                <span className="text-[#5E4A55] block text-[11px]">Saturday & Sunday</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">HOURS</span>
                <span className="font-semibold text-[#B96535] text-sm block mt-0.5">11:00 AM – 9:00 PM</span>
                <span className="text-[#5E4A55] block text-[11px]">Continuous Entry</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30">
                <span className="text-[10px] tracking-wider text-[#6B5860] uppercase block">VENUE</span>
                <span className="font-semibold text-[#B96535] text-sm block mt-0.5">Lemon Tree Premier</span>
                <span className="text-[#5E4A55] block text-[11px]">Tangerine Grand, Patna</span>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="btn-sunset-gold px-8 py-3.5 rounded-full text-xs font-sans font-semibold tracking-[0.22em] uppercase shadow-lg text-[#2A1C24]"
              >
                Apply for Stall Allotment
              </button>
              <Link
                to="/stalls"
                className="btn-editorial-outline px-7 py-3.5 rounded-full font-semibold text-xs tracking-[0.22em] uppercase transition-all"
              >
                Inspect Stall Map
              </Link>
              <Link
                to="/visitors"
                className="px-6 py-3.5 rounded-full border border-[#E9AD83]/40 text-[#6B5860] hover:text-[#2A1C24] text-xs tracking-[0.22em] uppercase font-semibold transition-colors"
              >
                Visitor Pass
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Spotlight */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                EXHIBITION PAVILIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
                Curated Product Domains
              </h2>
            </div>
            <Link to="/become-an-exhibitor" className="text-xs text-[#B96535] hover:text-[#2A1C24] font-semibold tracking-wider uppercase">
              View Stall Specifications &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#FFFBF5] p-6 rounded-3xl border border-[#E9AD83]/30 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-[#B96535] font-semibold mb-1">
                    {cat.hindi}
                  </div>
                  <h3 className="font-serif text-2xl text-[#2A1C24]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#5E4A55] font-sans font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E9AD83]/20 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF4EB] border border-[#E9AD83]/30 text-[#6B5860]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenBooking(cat.title)}
                    className="text-[10px] tracking-wider text-[#B96535] font-semibold uppercase hover:text-[#2A1C24]"
                  >
                    Book &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Architecture & Facilities */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                VENUE EXCELLENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
                Tangerine Grand at Lemon Tree Premier
              </h2>
              <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                Lemon Tree Premier is Patna’s foremost upscale business and lifestyle hotel, strategically situated on Exhibition Road just minutes from Gandhi Maidan and Fraser Road. Tangerine Grand features a grand reception lobby, state-of-the-art climate control, high ceilings for elaborate stalls, and uninterrupted power backup.
              </p>

              <div className="space-y-2.5 pt-2 text-xs font-sans text-[#2A1C24]">
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck size={16} className="text-[#B96535]" />
                  <span>Central Air-Conditioning & High-Lumen Architectural Lighting</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck size={16} className="text-[#B96535]" />
                  <span>Dedicated Valet Drop-off & Parking for Exhibitors & VIP Guests</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck size={16} className="text-[#B96535]" />
                  <span>Service Elevator & Seamless Stall Loading Access on October 23</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E9AD83]/30 aspect-video shadow-md">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                alt="Lemon Tree Premier Tangerine Grand"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
