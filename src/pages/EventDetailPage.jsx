import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/eventData';

export default function EventDetailPage({ onOpenBooking }) {
  return (
    <div className="pt-28 pb-24 bg-[#180E15] min-h-screen text-[#FFF1D9]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-sans text-[#E9AD83] mb-8">
          <Link to="/" className="hover:text-[#F6B51F]">HOME</Link>
          <span className="text-[#E9AD83]/50">/</span>
          <Link to="/events" className="hover:text-[#F6B51F]">EVENTS</Link>
          <span className="text-[#E9AD83]/50">/</span>
          <span className="text-[#F6B51F] font-semibold">GLAMOUR GALA DIWALI EDITION 5</span>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E9AD83]/30 bg-[#24141F] p-8 md:p-14 shadow-2xl mb-16">
          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E99A18]/40 bg-[#251520] text-[11px] font-sans font-medium tracking-[0.25em] text-[#F6B51F] uppercase shadow-sm">
              <Sparkles size={11} className="text-[#F6B51F]" />
              <span>OFFICIAL FLAGSHIP EVENT</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#FFF1D9] leading-tight">
              Glamour Gala <br />
              <span className="italic font-light text-[#F6B51F]">Diwali Edition 5</span>
            </h1>

            <p className="text-sm sm:text-base text-[#E9AD83] font-sans font-light leading-relaxed">
              Bihar's most prestigious pre-Diwali luxury exhibition. Over two action-packed days, 50+ handpicked women founders will unveil their exclusive festive collections to more than 5,000 discerning shoppers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E9AD83]/20 text-xs font-sans">
              <div>
                <span className="text-[10px] tracking-wider text-[#E9AD83]/60 uppercase block">DATES</span>
                <span className="font-semibold text-[#F6B51F] text-sm">24 & 25 OCT 2026</span>
                <span className="text-[#E9AD83] block text-[11px]">Saturday & Sunday</span>
              </div>
              <div>
                <span className="text-[10px] tracking-wider text-[#E9AD83]/60 uppercase block">HOURS</span>
                <span className="font-semibold text-[#F6B51F] text-sm">11:00 AM – 9:00 PM</span>
                <span className="text-[#E9AD83] block text-[11px]">Continuous Entry</span>
              </div>
              <div>
                <span className="text-[10px] tracking-wider text-[#E9AD83]/60 uppercase block">VENUE</span>
                <span className="font-semibold text-[#F6B51F] text-sm">Lemon Tree Premier</span>
                <span className="text-[#E9AD83] block text-[11px]">Tangerine Grand Hall, Patna</span>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="btn-sunset-gold px-8 py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg text-[#180E15]"
              >
                Apply for Stall Allotment
              </button>
              <Link
                to="/stalls"
                className="btn-sunset-ghost-dark px-7 py-3.5 rounded-full text-[#FFF1D9] hover:text-[#F6B51F] font-medium text-xs tracking-[0.22em] uppercase transition-all"
              >
                Inspect Stall Map
              </Link>
              <Link
                to="/visitors"
                className="btn-sunset-ghost-dark px-6 py-3.5 rounded-full text-[#E9AD83] hover:text-[#FFF1D9] text-xs tracking-[0.22em] uppercase"
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
              <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans">
                EXHIBITION PAVILIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF1D9] mt-1">
                Curated Product Domains
              </h2>
            </div>
            <Link to="/become-an-exhibitor" className="text-xs text-[#F6B51F] hover:text-[#FFF1D9] font-semibold tracking-wider uppercase">
              View Stall Specifications &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#24141F] p-6 rounded-2xl border border-[#E9AD83]/20 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-[#F6B51F] font-semibold mb-1">
                    {cat.hindi}
                  </div>
                  <h3 className="font-serif text-2xl text-[#FFF1D9]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#E9AD83]/80 font-sans font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E9AD83]/15 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cat.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-[#180E15] text-[#E9AD83]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onOpenBooking(cat.title)}
                    className="text-[10px] tracking-wider text-[#F6B51F] font-semibold uppercase hover:underline"
                  >
                    Book &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Architecture & Facilities */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#24141F] border border-[#E9AD83]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans">
                VENUE EXCELLENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF1D9]">
                Tangerine Grand at Lemon Tree Premier
              </h2>
              <p className="text-xs sm:text-sm text-[#E9AD83]/85 font-sans font-light leading-relaxed">
                Lemon Tree Premier is Patna’s foremost upscale business and lifestyle hotel, strategically situated on Exhibition Road just minutes from Gandhi Maidan and Fraser Road. Tangerine Grand features a grand reception lobby, state-of-the-art climate control, high ceilings for elaborate stalls, and uninterrupted power backup.
              </p>

              <div className="space-y-2 pt-2 text-xs font-sans text-[#FFF1D9]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={14} className="text-[#F6B51F]" />
                  <span>Central Air-Conditioning & High-Lumen Architectural Lighting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={14} className="text-[#F6B51F]" />
                  <span>Dedicated Valet Drop-off & Parking for Exhibitors & VIP Guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={14} className="text-[#F6B51F]" />
                  <span>Service Elevator & Seamless Stall Loading Access on October 23</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E9AD83]/30 aspect-video shadow-2xl">
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
