import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import EventsDeck3D from '../components/EventsDeck3D';

export default function EventsPage({ onOpenBooking }) {
  const events = [
    {
      id: "glamour-gala-5",
      title: "Glamour Gala",
      edition: "Diwali Edition 5",
      status: "STALL BOOKINGS OPEN",
      statusType: "active",
      dates: "24 & 25 OCTOBER 2026",
      timings: "11:00 AM – 9:00 PM IST",
      venue: "Lemon Tree Premier, Tangerine Grand, Patna",
      desc: "Patna's most anticipated luxury pre-Diwali exhibition bringing together 50+ curated women-led lifestyle, couture, fine jewellery, and home decor labels.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
      featured: true,
      path: "/events/glamour-gala-5"
    },
    {
      id: "bihar-heritage-luxe",
      title: "Bihar Heritage Luxe",
      edition: "Winter Edition",
      status: "DATES ANNOUNCED",
      statusType: "upcoming",
      dates: "19 & 20 DECEMBER 2026",
      timings: "11:00 AM – 8:30 PM IST",
      venue: "Patna Convention Center / Hotel Maurya",
      desc: "A celebration of artisanal weaves, Tussar silks, Madhubani fine art, and brass mastercraft from eastern India.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      featured: false,
      path: "/events/glamour-gala-5"
    },
    {
      id: "spring-soiree-2027",
      title: "Udaan Spring Soirée",
      edition: "Summer Bridal Preview 2027",
      status: "APPLICATIONS OPEN SOON",
      statusType: "upcoming",
      dates: "MARCH 2027",
      timings: "11:00 AM – 9:00 PM IST",
      venue: "Lemon Tree Premier, Patna",
      desc: "Summer festive couture, pastel polki jewellery, and lightweight fusion wedding collections.",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      featured: false,
      path: "/events/glamour-gala-5"
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
          <Sparkles size={12} className="text-[#B96535]" />
          <span>CALENDAR OF EXHIBITIONS</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#2A1C24] tracking-tight leading-tight">
          Curated <span className="italic font-light text-[#B96535]">Exhibitions</span>
        </h1>
        
        <p className="mt-4 text-[#5E4A55] text-sm sm:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
          Explore high-visibility luxury platforms designed specifically for women entrepreneurs to launch, showcase, and scale their brands.
        </p>
      </div>

      {/* 3D Perspective Event Chronicle Deck */}
      <EventsDeck3D onOpenBooking={onOpenBooking} />

      {/* Events Listing */}
      <div className="max-w-6xl mx-auto px-6 space-y-10 mt-12">
        {events.map((ev) => (
          <div
            key={ev.id}
            className={`rounded-3xl border overflow-hidden transition-all duration-300 shadow-md ${
              ev.featured
                ? 'border-[#B96535]/40 bg-[#FFFBF5]'
                : 'border-[#E9AD83]/30 bg-[#FFFBF5]'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              {/* Event Image */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/11]">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#2A1C24]/90 backdrop-blur-sm border border-[#E9AD83]/30 text-[10px] tracking-widest font-semibold uppercase text-[#FFF1D9] shadow-md">
                  {ev.status}
                </div>
              </div>

              {/* Event Content */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#B96535] font-semibold font-sans">
                  {ev.edition}
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24]">
                  {ev.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed">
                  {ev.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-[#5E4A55]">
                  <div className="flex items-center space-x-2">
                    <Calendar size={14} className="text-[#B96535]" />
                    <span className="text-[#2A1C24] font-medium">{ev.dates}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-[#B96535]" />
                    <span>{ev.timings}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:col-span-2">
                    <MapPin size={14} className="text-[#B96535]" />
                    <span>{ev.venue}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={ev.path}
                    className="btn-sunset-gold px-7 py-3 rounded-full font-semibold text-xs tracking-[0.22em] uppercase transition-colors flex items-center space-x-2 text-[#2A1C24]"
                  >
                    <span>View Event Details</span>
                    <ArrowRight size={13} />
                  </Link>

                  {ev.featured && (
                    <button
                      onClick={() => onOpenBooking()}
                      className="btn-editorial-outline px-6 py-3 rounded-full text-xs tracking-[0.22em] uppercase font-semibold transition-all"
                    >
                      Book a Stall
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
