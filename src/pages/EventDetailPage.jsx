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
    <div className="bg-[#FAF4EB] min-h-screen text-[#2A1C24] pb-32 sm:pb-24">

      {/* =========================================================================
          1. CINEMATIC ROYAL HERO (Harmonized with UDAAN Brand Palette)
          Deep royal maroon & espresso lighting, golden glow, and horology countdown
          ========================================================================= */}
      <section className="relative w-full min-h-[90vh] sm:min-h-[94vh] overflow-hidden text-center flex flex-col justify-between items-center select-none bg-[#2B1B17] text-[#FFFAF2]">
        
        {/* Background Hall Image with Warm Ambient Tone */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center filter contrast-[1.05] brightness-[0.78] saturate-[1.12] transition-all duration-1000"
          style={{
            backgroundImage: `url('${event.heroImage || event.coverImage || event.poster}')`,
            opacity: 0.38,
          }}
        />

        {/* Brand Harmonization: Royal Maroon & Sunset Vignettes */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2B1B17]/95 via-[#4A1620]/65 to-[#2B1B17]/95 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(217,164,65,0.22)_0%,transparent_70%)] pointer-events-none" />

        {/* Top Eyebrow Status Pill */}
        <div className="pt-24 sm:pt-32 z-10 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-[#D9A441]/50 bg-[#2B1B17]/65 backdrop-blur-2xl text-[10.5px] sm:text-xs font-sans font-semibold tracking-[0.25em] text-[#FFE8B3] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
            <UdaanDiamond size={11} className="text-[#D9A441]" />
            <span>{isPast ? 'ARCHIVED CHAPTER' : event.bookingStatus || 'STALL BOOKINGS OPEN'}</span>
          </div>
        </div>

        {/* Hero Center Editorial Composition */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 my-auto space-y-4 sm:space-y-5 animate-fadeIn">
          
          {/* Main Headline */}
          <h1 className="font-serif tracking-tight leading-[0.96] uppercase">
            <span className="block text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.18em] text-[#FFFAF2]/90">
              THE NEXT CHAPTER
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold tracking-[0.06em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFBF5] via-[#FFE2A4] to-[#FFFBF5] drop-shadow-[0_12px_45px_rgba(0,0,0,0.95)] mt-1 sm:mt-2">
              IS ALMOST HERE.
            </span>
          </h1>

          {/* Golden Cursive / Italic Subtitle */}
          <div className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E3] via-[#F3CE86] to-[#D9A441] tracking-wide">
            {event.title} • {event.edition}
          </div>

          {/* Venue & Date Pill */}
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-[#D9A441]/35 bg-[#2B1B17]/55 backdrop-blur-md text-[10.5px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#D9A441] font-medium shadow-md">
            <MapPin size={12} className="text-[#D9A441]" />
            <span>{event.dates || event.date} • {event.hall || 'TANGERINE GRAND'} • {event.city || 'PATNA'}</span>
          </div>

          {/* Live Real-Time Countdown Timer (Horology Luxury Capsules) */}
          {!isPast && countdown && (
            <div className="pt-2 pb-2 flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5 text-center select-none animate-fadeIn">
              {[
                { val: countdown.days, unit: 'DAYS' },
                { val: countdown.hours, unit: 'HOURS' },
                { val: countdown.minutes, unit: 'MINS' },
                { val: countdown.seconds, unit: 'SECS' },
              ].map((cd, idx) => (
                <div 
                  key={idx}
                  className="countdown-capsule px-4 py-3 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl min-w-[68px] sm:min-w-[92px]"
                >
                  <span className="countdown-numeral block text-2xl sm:text-4xl md:text-5xl font-bold leading-none">
                    {String(cd.val).padStart(2, '0')}
                  </span>
                  <span className="block text-[8px] sm:text-[9.5px] font-sans font-semibold tracking-[0.25em] text-[#D9A441] uppercase pt-1.5">
                    {cd.unit}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action CTAs Matching Website Design Language */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {!isPast ? (
              <>
                <Link
                  to={`/book-a-stall?event=${encodeURIComponent(event.title)}`}
                  className="w-full sm:w-auto btn-gold-luxury btn-shimmer-hover px-8 py-3.5 sm:py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase shadow-[0_8px_30px_rgba(217,164,65,0.4)] flex items-center justify-center space-x-2 active:scale-98"
                >
                  <Store size={15} />
                  <span>BOOK YOUR STALL →</span>
                </Link>

                <Link
                  to="/stalls"
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full border border-white/30 bg-white/10 hover:bg-white/15 text-[#FFFAF2] text-xs font-sans tracking-[0.2em] uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <LayoutGrid size={15} className="text-[#D9A441]" />
                  <span>VIEW FLOOR MAP</span>
                </Link>

                <a
                  href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Udaan Team, I am interested in ${event.title} (${event.edition}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-white border border-[#25D366]/50 text-xs font-sans tracking-[0.2em] uppercase transition-all backdrop-blur-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <MessageCircle size={15} />
                  <span>WHATSAPP CONCIERGE</span>
                </a>
              </>
            ) : (
              <Link
                to="/archive"
                className="w-full sm:w-auto btn-gold-luxury px-8 py-4 rounded-full text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl"
              >
                EXPLORE ARCHIVE MOMENTS ↓
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Footer Info Strip inside Hero with Subtle Gradient Feathering */}
        <div className="pb-8 z-10 space-y-1 text-center px-4">
          <div className="text-[10.5px] sm:text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#FFFAF2]/75">
            {event.timings || '11:00 AM – 9:00 PM IST'} • {event.venueDetails?.address || event.venue || 'Patna'}
          </div>
          <div className="text-[9px] sm:text-[9.5px] font-mono tracking-widest text-[#D9A441] uppercase">
            {event.hall || 'TANGERINE GRAND'} • 5-STAR CLIMATE-CONTROLLED VENUE
          </div>
        </div>

        {/* Ambient Bottom Feathering to Seamlessly Blend into Warm Ivory Page */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FAF4EB] via-[#FAF4EB]/20 to-transparent pointer-events-none" />
      </section>


      {/* =========================================================================
          2. DETAILED EVENT DOSSIER & EXHIBITOR CATALOGUE
          ========================================================================= */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 pt-8 sm:pt-12">

        {/* Breadcrumb Navigation & Share Bar */}
        <div className="flex items-center justify-between gap-2 mb-8 sm:mb-12 border-b border-[#E9AD83]/20 pb-4">
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
            2. KEY HIGHLIGHTS GRID (Compact 2x2 on Mobile with Scroll Reveal)
            ========================================================================= */}
        <section className="mb-10 sm:mb-16 scroll-reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6 text-center">
            <div className="card-interactive scroll-reveal scroll-delay-1 p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">12,000</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Sq.Ft 5-Star Hall</span>
            </div>
            <div className="card-interactive scroll-reveal scroll-delay-2 p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">5,000+</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Festive Shoppers</span>
            </div>
            <div className="card-interactive scroll-reveal scroll-delay-3 p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">48</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Curated Ateliers</span>
            </div>
            <div className="card-interactive scroll-reveal scroll-delay-4 p-3.5 sm:p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-xs">
              <span className="font-serif text-xl sm:text-3xl font-bold text-[#4A1620]">100%</span>
              <span className="block text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#B96535] mt-0.5">Turnkey Setup</span>
            </div>
          </div>
        </section>


        {/* =========================================================================
            3. STALL PLANS & PRICING SUMMARY (Mobile Touch-Friendly Cards)
            ========================================================================= */}
        {!isPast && (
          <section className="mb-10 sm:mb-16 scroll-reveal">
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
                  className={`card-interactive scroll-reveal scroll-delay-${idx + 1} p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border flex flex-col justify-between shadow-sm transition-all ${
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
          <section className="mb-10 sm:mb-16 scroll-reveal">
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
                  className="card-interactive scroll-reveal scroll-delay-1 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 text-center shadow-xs flex flex-col items-center justify-center min-h-[90px]"
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
        <section className="mb-10 sm:mb-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-md scroll-reveal">
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
          <section className="mb-10 sm:mb-16 scroll-reveal">
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
