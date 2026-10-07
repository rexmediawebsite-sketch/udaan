import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Share2,
  Users,
  Award,
  ExternalLink,
  ChevronDown,
  LayoutGrid,
  Store,
  Sparkles,
  MessageCircle,
  Phone
} from 'lucide-react';
import { UdaanDiamond, UdaanEmblem } from '../components/UdaanIcons';
import { getEventBySlug, EVENTS_CATALOG } from '../data/eventsCatalog';
import { SELLER_WHATSAPP_NUMBER } from './BookAStallPage';
import { getConfirmedCountdown } from '../utils/eventLifecycle';

export default function EventDetailPage({ onOpenBooking }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug) || EVENTS_CATALOG[0];

  const [openFaq, setOpenFaq] = useState(null);
  const [countdown, setCountdown] = useState(() => getConfirmedCountdown(event?.startDate));

  useEffect(() => {
    if (!event?.startDate) return;
    const updateCd = () => {
      setCountdown(getConfirmedCountdown(event.startDate));
    };
    updateCd();
    const interval = setInterval(updateCd, 1000);
    return () => clearInterval(interval);
  }, [event?.startDate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${event.title} - ${event.edition} | UDAAN`,
        text: event.tagline || event.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  if (!event) {
    return (
      <div className="pt-28 pb-32 bg-[#FAF4EB] min-h-screen text-center px-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1C24] mb-4">Event Not Found</h2>
        <Link to="/events" className="btn-sunset-gold px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase inline-block">
          Return to Events
        </Link>
      </div>
    );
  }

  const isPast = event.status === 'past';

  return (
    <div className="bg-[#FAF4EB] min-h-screen text-[#2A1C24] pt-20 sm:pt-28 pb-32 sm:pb-24">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6">

        {/* Breadcrumb Navigation & Share Bar (Mobile horizontal scroll friendly) */}
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-8">
          <div className="flex items-center space-x-1 sm:space-x-2 text-[11px] sm:text-xs font-sans text-[#6B5860] overflow-x-auto whitespace-nowrap scrollbar-none py-1 min-w-0 flex-1 pr-1.5">
            <Link to="/" className="hover:text-[#B96535] shrink-0">HOME</Link>
            <span className="text-[#6B5860]/40 shrink-0">/</span>
            <Link to="/events" className="hover:text-[#B96535] shrink-0">EXHIBITIONS</Link>
            <span className="text-[#6B5860]/40 shrink-0">/</span>
            <span className="text-[#B96535] font-semibold uppercase truncate shrink-0 max-w-[120px] sm:max-w-none">{event.edition}</span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-1 px-2.5 sm:px-4 py-1.5 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] text-[11px] sm:text-xs font-semibold text-[#6B5860] hover:text-[#2A1C24] hover:border-[#B96535] transition-colors shadow-xs active:scale-95"
            >
              <ArrowLeft size={12} />
              <span>Back</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1 px-2.5 sm:px-4 py-1.5 rounded-full border border-[#E9AD83]/40 bg-[#FFFBF5] text-[11px] sm:text-xs font-semibold text-[#6B5860] hover:text-[#2A1C24] transition-colors shadow-xs active:scale-95"
              title="Share event link"
            >
              <Share2 size={12} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>


        {/* =========================================================================
            1. HERO SHOWCASE (Mobile-Optimized Padding, Aspects, Typography)
            ========================================================================= */}
        <section className="mb-8 sm:mb-16 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/40 shadow-xl overflow-hidden p-4 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
            
            {/* Event Media: Mobile 16/10 so image doesn't take whole screen; 4/5 on desktop */}
            <div className="lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/10] max-h-[250px] sm:max-h-none sm:aspect-[4/5] shadow-md border border-[#E9AD83]/30">
              <img
                src={event.coverImage || event.poster}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-1 rounded-full bg-[#B96535] text-white text-[9px] sm:text-[10px] font-sans font-bold tracking-wider uppercase shadow-md flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{isPast ? 'Archived Edition' : event.bookingStatus || 'Stall Bookings Open'}</span>
              </div>
            </div>

            {/* Event Header Information */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[9.5px] sm:text-[10px] font-sans font-bold tracking-[0.2em] text-[#B96535] uppercase">
                <UdaanDiamond size={9} />
                <span>{event.edition}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl leading-tight break-words font-bold">
                <span className="text-shimmer-maroon">{event.title}</span>
              </h1>

              <p className="text-xs sm:text-base text-[#5E4A55] font-sans font-light leading-relaxed">
                {event.description || event.shortDescription}
              </p>

              {/* Event Metadata Dossier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5 pt-2 border-t border-[#E9AD83]/20 text-xs font-sans text-[#5E4A55]">
                <div className="flex items-center space-x-2 bg-[#FFF1D9]/40 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                  <Calendar size={14} className="text-[#B96535] shrink-0" />
                  <span className="text-[#2A1C24] font-medium leading-tight">{event.dates || event.date}</span>
                </div>
                <div className="flex items-center space-x-2 bg-[#FFF1D9]/40 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                  <Clock size={14} className="text-[#B96535] shrink-0" />
                  <span className="leading-tight">{event.timings || '11:00 AM – 9:00 PM IST'}</span>
                </div>
                <div className="flex items-center space-x-2 sm:col-span-2 bg-[#FFF1D9]/40 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                  <MapPin size={14} className="text-[#B96535] shrink-0" />
                  <span className="truncate leading-tight">{event.hall || 'Tangerine Grand'}, {event.venue}</span>
                </div>
              </div>

              {/* Upcoming Event Real-Time Countdown Timer */}
              {!isPast && countdown && (
                <div className="pt-2.5 pb-1 border-t border-[#E9AD83]/20 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.2em] text-[#B96535] uppercase">
                    <Clock size={12} className="text-[#B96535] animate-pulse" />
                    <span>COUNTDOWN TO DOORS OPEN</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5 text-center">
                    {[
                      { val: countdown.days, unit: 'DAYS' },
                      { val: countdown.hours, unit: 'HOURS' },
                      { val: countdown.minutes, unit: 'MINS' },
                      { val: countdown.seconds, unit: 'SECS' },
                    ].map((cd, idx) => (
                      <div
                        key={idx}
                        className="py-1.5 px-1 sm:py-2 rounded-xl bg-[#FFF1D9] border border-[#E9AD83]/50 shadow-xs"
                      >
                        <span className="block font-serif text-lg sm:text-2xl font-bold text-[#4A1620] leading-none">
                          {String(cd.val).padStart(2, '0')}
                        </span>
                        <span className="block text-[7.5px] sm:text-[8.5px] font-mono tracking-widest text-[#B96535] uppercase pt-1 font-semibold">
                          {cd.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action CTAs: Prominent primary with 2-col secondary actions on phones */}
              <div className="pt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                {!isPast && (
                  <Link
                    to={`/book-a-stall?event=${encodeURIComponent(event.title)}`}
                    className="btn-sunset-gold btn-shimmer-hover w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 text-[#2A1C24] shadow-md min-h-[46px] active:scale-98 transition-transform"
                  >
                    <Store size={15} />
                    <span>Book Your Stall (From ₹20,000)</span>
                    <ArrowRight size={14} />
                  </Link>
                )}

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
                  <Link
                    to="/stalls"
                    className="px-3 sm:px-5 py-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase border border-[#B96535]/50 bg-white hover:bg-[#FFF1D9] text-[#4A1620] transition-colors flex items-center justify-center space-x-1.5 min-h-[44px] active:scale-98"
                  >
                    <LayoutGrid size={14} className="text-[#B96535]" />
                    <span>Floor Map</span>
                  </Link>

                  <a
                    href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Udaan Team, I am interested in ${event.title} (${event.edition}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-5 py-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 transition-colors flex items-center justify-center space-x-1.5 min-h-[44px] active:scale-98"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>



        {/* =========================================================================
            2. KEY HIGHLIGHTS GRID (Compact 2x2 on Mobile)
            ========================================================================= */}
        <section className="mb-10 sm:mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6 text-center">
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">12,000</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Sq.Ft 5-Star Hall</span>
            </div>
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">5,000+</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Festive Shoppers</span>
            </div>
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">48</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Curated Ateliers</span>
            </div>
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">100%</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Turnkey Setup</span>
            </div>
          </div>
        </section>


        {/* =========================================================================
            3. STALL PLANS & PRICING SUMMARY (Mobile Touch-Friendly Cards)
            ========================================================================= */}
        {!isPast && (
          <section className="mb-10 sm:mb-16">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                STALL TIERS &amp; PRICING
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24]">
                Choose Your Exhibition Space
              </h3>
              <p className="text-xs text-[#5E4A55] font-sans font-light">
                Transparent 20k, 30k, and 50k packages with complete turnkey infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  name: 'Standard Booth',
                  planKey: '20k',
                  price: '₹20,000',
                  size: '3m x 2.5m (60 sq.ft)',
                  desc: 'Curated domain aisles. 2 spotlights, 5A socket, table, 2 chairs, 2 passes.'
                },
                {
                  name: 'Corner Prime',
                  planKey: '30k',
                  price: '₹30,000',
                  size: '3m x 3m (90 sq.ft)',
                  isPopular: true,
                  desc: 'Dual-side open corner footfall. 4 spotlights, dual sockets, counter, 2 chairs, social spotlight.'
                },
                {
                  name: 'Royal Pavilion',
                  planKey: '50k',
                  price: '₹50,000',
                  size: '4m x 3m (130 sq.ft)',
                  desc: 'Front entrance promenade. 6 LED spotlights, central AC, 4 chairs, VIP lounge, reel feature.'
                }
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className={`card-interactive p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border flex flex-col justify-between shadow-sm transition-all ${
                    tier.isPopular ? 'border-[#B96535] ring-2 ring-[#B96535]/30' : 'border-[#E9AD83]/30'
                  }`}
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-lg sm:text-xl text-[#2A1C24] font-semibold">{tier.name}</h4>
                      {tier.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-[#B96535] text-white text-[9px] font-sans font-bold uppercase shadow-xs">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="font-serif text-2xl font-bold text-[#4A1620]">{tier.price}</div>
                    <div className="text-xs font-semibold text-[#B96535] font-mono">{tier.size}</div>
                    <p className="text-xs text-[#5E4A55] font-sans font-light leading-relaxed">{tier.desc}</p>
                  </div>

                  <div className="pt-4 sm:pt-6 mt-3 border-t border-[#E9AD83]/20">
                    <Link
                      to={`/book-a-stall?event=${encodeURIComponent(event.title)}&plan=${tier.planKey}`}
                      className="btn-sunset-gold btn-shimmer-hover w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2A1C24] text-center block min-h-[44px] flex items-center justify-center active:scale-98"
                    >
                      Book {tier.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* =========================================================================
            4. CURATED CATEGORIES (Mobile 2-Column Responsive Grid)
            ========================================================================= */}
        {event.categories && event.categories.length > 0 && (
          <section className="mb-10 sm:mb-16">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                EXHIBITION DOMAINS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24]">
                Curated Pavilions &amp; Collections
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {event.categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 text-center shadow-xs flex flex-col items-center justify-center min-h-[90px]"
                >
                  <Sparkles size={14} className="text-[#B96535] mb-1.5" />
                  <span className="font-serif text-xs sm:text-sm font-medium text-[#2A1C24] leading-tight">
                    {cat}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* =========================================================================
            5. VENUE & VISITOR CONCIERGE (Stack neatly on phones)
            ========================================================================= */}
        <section className="mb-10 sm:mb-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                DESTINATION &amp; ACCESS
              </span>
              <h3 className="font-serif text-xl sm:text-3xl text-[#2A1C24]">
                {event.hall || 'Tangerine Grand Exhibition Hall'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E4A55] font-sans leading-relaxed font-light">
                {event.venueDetails?.address || 'Plot No. 876, Exhibition Road, Near Gandhi Maidan, Patna, Bihar 800001'}
              </p>

              <div className="space-y-2 text-xs font-sans text-[#2A1C24]">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={14} className="text-[#B96535] shrink-0" />
                  <span>Complimentary Valet Parking for Patrons &amp; Exhibitors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={14} className="text-[#B96535] shrink-0" />
                  <span>Dedicated VIP Elevator &amp; Ground Floor Direct Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={14} className="text-[#B96535] shrink-0" />
                  <span>100% Uninterrupted Genset Power Backup &amp; Chilled AC</span>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#FFF1D9] border border-[#E9AD83]/50 space-y-3 sm:space-y-4 text-center">
              <UdaanEmblem size={22} className="text-[#B96535] mx-auto" />
              <h4 className="font-serif text-lg sm:text-xl text-[#2A1C24]">Need Assistance?</h4>
              <p className="text-xs text-[#5E4A55] font-sans font-light">
                Our curation desk is available 10 AM – 8 PM IST for stall selection, lookbook review, and visitor concierge.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Udaan Concierge, I have a question about ${event.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            6. FAQS (Touch-friendly accordions)
            ========================================================================= */}
        {event.faqs && event.faqs.length > 0 && (
          <section className="mb-10 sm:mb-16">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
                GUIDELINES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1C24]">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-2.5 max-w-3xl mx-auto">
              {event.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl sm:rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm sm:text-base font-serif font-medium text-[#2A1C24] min-h-[44px]"
                    >
                      <span className="pr-3">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-[#B96535] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#5E4A55] font-sans font-light leading-relaxed border-t border-[#E9AD83]/20 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}


        {/* Back Link */}
        <div className="pt-6 border-t border-[#E9AD83]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <Link
            to="/events"
            className="text-xs font-sans font-semibold tracking-wider uppercase text-[#B96535] hover:text-[#2A1C24] flex items-center space-x-1.5"
          >
            <span>&larr; Return to All Exhibitions</span>
          </Link>

          {!isPast && (
            <Link
              to="/book-a-stall"
              className="btn-sunset-gold w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#2A1C24]"
            >
              Book Your Interest
            </Link>
          )}
        </div>

      </div>


      {/* =========================================================================
          MOBILE STICKY BOTTOM ACTION BAR (Phones only)
          Provides effortless 1-tap booking & WhatsApp connect as users scroll
          ========================================================================= */}
      {!isPast && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFBF5]/95 backdrop-blur-md border-t border-[#E9AD83]/40 px-3.5 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2.5 safe-area-pb">
          <div className="min-w-0 flex-1">
            <span className="block text-[8.5px] uppercase tracking-wider font-bold text-[#B96535] truncate">
              {event.edition}
            </span>
            <span className="font-serif font-bold text-xs sm:text-sm text-[#2A1C24] truncate block">
              Stalls from ₹20,000
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in booking a stall for ${event.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <MessageCircle size={18} />
            </a>

            <Link
              to={`/book-a-stall?event=${encodeURIComponent(event.title)}`}
              className="btn-sunset-gold px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2A1C24] shadow-md flex items-center space-x-1.5 active:scale-95 transition-transform"
            >
              <span>Book Stall</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
