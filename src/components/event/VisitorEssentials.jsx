import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Car, CreditCard, Wind, Phone, Mail, CheckCircle } from 'lucide-react';
import { UdaanDiamond } from '../UdaanIcons';

/**
 * VisitorEssentials
 * Verified practical logistics module for patrons and visitors.
 * Strict zero-hallucination policy: only renders fields present in event.visitorInfo / event.venueDetails.
 */
export default function VisitorEssentials({ event }) {
  const info = event?.visitorInfo || {};
  const venue = event?.venueDetails || {
    name: event?.venue,
    hall: event?.hall,
    address: event?.location,
    googleMapsUrl: null
  };

  return (
    <section id="venue-info" className="py-20 bg-[#FFFBF5] border-t border-[#E9AD83]/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.22em] text-[#B96535] uppercase font-semibold">
            <UdaanDiamond size={12} className="text-[#D9A441]" />
            <span>PRACTICAL VISITOR INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2A1C24] tracking-tight">
            Visitor & Venue Essentials
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#6B5860] leading-relaxed">
            Everything you need for an effortless, premier visit to {event?.name || 'Udaan'}.
          </p>
        </div>

        {/* 2-Column Core: Venue Dossier & Visitor Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Column 1: Confirmed Venue & Dates Dossier */}
          <div className="lg:col-span-6 rounded-3xl p-8 sm:p-10 bg-[#FAF4EB] border border-[#E9AD83]/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9AD83]/20">
                <span className="text-xs font-sans font-bold tracking-widest text-[#B96535] uppercase">
                  OFFICIAL LOCATION
                </span>
                <span className="text-xs font-mono font-medium text-[#6B5860]">
                  5-STAR VENUE
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A1C24] mb-1">
                  {venue.name || event.venue}
                </h3>
                {venue.hall && (
                  <p className="text-sm font-sans font-semibold text-[#B96535] mb-2">
                    {venue.hall} {venue.floor && `• ${venue.floor}`}
                  </p>
                )}
                {venue.address && (
                  <p className="text-sm font-sans text-[#6B5860] leading-relaxed flex items-start space-x-2 mt-3">
                    <MapPin size={16} className="text-[#B96535] shrink-0 mt-0.5" />
                    <span>{venue.address}</span>
                  </p>
                )}
              </div>

              {/* Confirmed Dates & Hours */}
              <div className="pt-4 border-t border-[#E9AD83]/20 space-y-3">
                <div className="flex items-center space-x-3 text-sm font-sans text-[#2A1C24]">
                  <Calendar size={16} className="text-[#B96535]" />
                  <span className="font-semibold">{event.dateDisplay || event.date || event.dates}</span>
                  {event.days && <span className="text-[#6B5860]">({event.days})</span>}
                </div>
                {event.timings && (
                  <div className="flex items-center space-x-3 text-sm font-sans text-[#2A1C24]">
                    <Clock size={16} className="text-[#B96535]" />
                    <span>{event.timings}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps Directions Action */}
            {venue.googleMapsUrl && (
              <div className="pt-8">
                <a
                  href={venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#4A1620] text-[#FFFAF2] text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#601D2A] transition-all shadow-sm"
                >
                  <Navigation size={13} />
                  <span>GET DIRECTIONS IN GOOGLE MAPS</span>
                </a>
              </div>
            )}
          </div>

          {/* Column 2: Verified Practical Details (Only rendered if configured) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {info.entry && (
              <div className="p-6 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#4A1620]/10 flex items-center justify-center text-[#4A1620] mb-3">
                  <CheckCircle size={16} />
                </div>
                <h4 className="text-xs font-sans font-bold tracking-wider text-[#2A1C24] uppercase">
                  ENTRY PROTOCOL
                </h4>
                <p className="text-xs font-sans text-[#6B5860] leading-relaxed">
                  {info.entry}
                </p>
              </div>
            )}

            {info.parking && (
              <div className="p-6 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#4A1620]/10 flex items-center justify-center text-[#4A1620] mb-3">
                  <Car size={16} />
                </div>
                <h4 className="text-xs font-sans font-bold tracking-wider text-[#2A1C24] uppercase">
                  VALET & PARKING
                </h4>
                <p className="text-xs font-sans text-[#6B5860] leading-relaxed">
                  {info.parking}
                </p>
              </div>
            )}

            {info.payment && (
              <div className="p-6 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#4A1620]/10 flex items-center justify-center text-[#4A1620] mb-3">
                  <CreditCard size={16} />
                </div>
                <h4 className="text-xs font-sans font-bold tracking-wider text-[#2A1C24] uppercase">
                  PAYMENT METHODS
                </h4>
                <p className="text-xs font-sans text-[#6B5860] leading-relaxed">
                  {info.payment}
                </p>
              </div>
            )}

            {info.climate && (
              <div className="p-6 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#4A1620]/10 flex items-center justify-center text-[#4A1620] mb-3">
                  <Wind size={16} />
                </div>
                <h4 className="text-xs font-sans font-bold tracking-wider text-[#2A1C24] uppercase">
                  HALL AMENITIES
                </h4>
                <p className="text-xs font-sans text-[#6B5860] leading-relaxed">
                  {info.climate}
                </p>
              </div>
            )}

            {(info.contactPhone || info.contactEmail) && (
              <div className="sm:col-span-2 p-6 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-sans font-bold tracking-wider text-[#2A1C24] uppercase mb-1">
                    HELPDESK & CONCIERGE
                  </h4>
                  <p className="text-xs font-sans text-[#6B5860]">
                    Direct assistance for exhibitor unloading & visitor inquiries.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-sans font-medium text-[#4A1620]">
                  {info.contactPhone && (
                    <a href={`tel:${info.contactPhone}`} className="inline-flex items-center space-x-1.5 hover:underline">
                      <Phone size={13} className="text-[#B96535]" />
                      <span>{info.contactPhone}</span>
                    </a>
                  )}
                  {info.contactEmail && (
                    <a href={`mailto:${info.contactEmail}`} className="inline-flex items-center space-x-1.5 hover:underline">
                      <Mail size={13} className="text-[#B96535]" />
                      <span>{info.contactEmail}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
