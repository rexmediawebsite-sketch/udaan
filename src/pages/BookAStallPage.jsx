import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Check, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  Layers, 
  ExternalLink,
  Award,
  Phone,
  Store,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UdaanDiamond, UdaanEmblem } from '../components/UdaanIcons';
import { STALLS_DATA, CATEGORIES, FEATURED_EVENT } from '../data/eventData';

// Official Udaan Seller / Concierge WhatsApp Number
export const SELLER_WHATSAPP_NUMBER = '918578009900';

// 3 Curated Stall Packages (20k, 30k, 50k) - Exactly matching screenshot & specifications
export const STALL_TIERS = [
  {
    id: 'standard',
    name: 'Standard Booth',
    planKey: '20k',
    price: 20000,
    priceFormatted: '₹20,000',
    location: 'CURATED DOMAIN AISLES',
    size: '3m x 2.5m (7.5 sq.m)',
    sqft: 'Approx. 60 sq.ft',
    badge: 'STARTER BOOTH',
    isPopular: false,
    recommendedFor: 'Emerging indie ateliers, artisan jewelry, bespoke gifting & handcrafted pret',
    features: [
      'Full octanorm wall partitions',
      '2 Focused warm spotlights',
      'One 5A dedicated power socket',
      'Standard fascia plate with brand logo',
      '1 Display table & 2 chairs',
      '2 Official exhibitor passes',
      'Pre-event official directory listing',
      '100% uninterrupted power backup'
    ],
    sampleSeats: ['S-01', 'S-02', 'S-03', 'S-04', 'S-05', 'B-01', 'B-02', 'B-03']
  },
  {
    id: 'corner',
    name: 'Corner Prime',
    planKey: '30k',
    price: 30000,
    priceFormatted: '₹30,000',
    location: 'TWO-SIDE OPEN AISLE INTERSECTIONS',
    size: '3m x 3m (9 sq.m)',
    sqft: 'Approx. 90 sq.ft',
    badge: 'MOST POPULAR',
    isPopular: true,
    recommendedFor: 'High-visibility couture, festive apparel, footwear & high-traffic collections',
    features: [
      'Dual-side open shopper footfall',
      '4 Focused 3000K warm spotlights',
      'Dedicated 5A & 15A power sockets',
      'Branded name fascia plate in metallic gold',
      '1 Custom reception counter & 2 chairs',
      '3 Official exhibitor passes',
      'Social media brand spotlight mention',
      'Featured placement in event gazette'
    ],
    sampleSeats: ['C-01', 'C-02', 'C-03', 'C-04', 'A-01', 'A-02', 'A-03']
  },
  {
    id: 'royal',
    name: 'Royal Pavilion',
    planKey: '50k',
    price: 50000,
    priceFormatted: '₹50,000',
    location: 'GRAND CENTERPIECE & ENTRANCE PROMENADE',
    size: '4m x 3m (12 sq.m)',
    sqft: 'Approx. 130 sq.ft',
    badge: 'FLAGSHIP SPACE',
    isPopular: false,
    recommendedFor: 'Heirloom polki & diamond jewellery, luxury couture houses & statement brands',
    features: [
      'Premium front-row entrance promenade visibility',
      '6 Dedicated high-lumen LED spotlights',
      'Two 15A power sockets + central air conditioning',
      'Illuminated metallic 3D fascia branding',
      '2 Display tables & 4 luxury chairs',
      '4 VIP passes with concierge lounge access',
      'Instagram reel & founder interview feature',
      'Full-page brand profile in official guide'
    ],
    sampleSeats: ['P-01', 'P-02', 'P-03', 'P-04']
  }
];

export const EVENTS_OPTIONS = [
  {
    id: 'glamour-gala-5',
    title: 'Glamour Gala • Diwali Edition 5',
    date: '24 & 25 October 2026',
    venue: 'Tangerine Grand, Lemon Tree Premier Patna',
    status: 'Bookings Open'
  },
  {
    id: 'spring-soiree',
    title: 'Udaan Spring Soirée 2027',
    date: 'March 2027',
    venue: 'Lemon Tree Premier Patna',
    status: 'Pre-Registration'
  },
  {
    id: 'royal-heritage',
    title: 'Royal Heritage Festive Showcase',
    date: 'December 2026',
    venue: 'Hotel Maurya Patna',
    status: 'Waitlist Open'
  }
];

export default function BookAStallPage() {
  const [searchParams] = useSearchParams();
  const urlStall = searchParams.get('stall');
  const urlCategory = searchParams.get('category');
  const urlPlan = searchParams.get('plan');

  // Form selections as requested by user:
  // 1. Select your event
  // 2. Select your type like 20k, 30k, 50k
  // 3. Select your seat/stall
  const [selectedEventId, setSelectedEventId] = useState(EVENTS_OPTIONS[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(
    urlPlan === '50k' || urlPlan?.toLowerCase().includes('royal') ? 'royal' :
    urlPlan === '20k' || urlPlan?.toLowerCase().includes('standard') ? 'standard' :
    'corner' // Default to Corner Prime (30k)
  );
  const [selectedSeat, setSelectedSeat] = useState(urlStall || 'P-02');

  // Applicant information
  const [formData, setFormData] = useState({
    founderName: '',
    brandName: '',
    phone: '',
    city: '',
    category: urlCategory || 'Fine Jewellery & Couture',
    requirements: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Sync if URL params change
  useEffect(() => {
    if (urlStall) {
      setSelectedSeat(urlStall.toUpperCase());
    }
    if (urlPlan) {
      if (urlPlan.toLowerCase().includes('20') || urlPlan.toLowerCase().includes('standard')) {
        setSelectedPlanId('standard');
      } else if (urlPlan.toLowerCase().includes('50') || urlPlan.toLowerCase().includes('royal')) {
        setSelectedPlanId('royal');
      } else if (urlPlan.toLowerCase().includes('30') || urlPlan.toLowerCase().includes('corner')) {
        setSelectedPlanId('corner');
      }
    }
  }, [urlStall, urlPlan]);

  const currentEvent = EVENTS_OPTIONS.find(e => e.id === selectedEventId) || EVENTS_OPTIONS[0];
  const currentPlan = STALL_TIERS.find(p => p.id === selectedPlanId) || STALL_TIERS[1];

  // Helper to select a plan from the specification cards and scroll to form
  const handleSelectPlanFromCard = (planId) => {
    setSelectedPlanId(planId);
    const targetPlan = STALL_TIERS.find(p => p.id === planId);
    if (targetPlan && targetPlan.sampleSeats.length > 0) {
      setSelectedSeat(targetPlan.sampleSeats[0]);
    }
    const formSection = document.getElementById('book-interest-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build the pre-filled WhatsApp message for the seller
  const generateWhatsAppMessage = () => {
    return `✨ *UDAAN EXHIBITION — STALL BOOKING INQUIRY* ✨
-----------------------------------------
📅 *Event:* ${currentEvent.title} (${currentEvent.date})
🏛️ *Venue:* ${currentEvent.venue}

💎 *Selected Plan:* ${currentPlan.name} (${currentPlan.priceFormatted})
📐 *Stall Specifications:* ${currentPlan.size} • ${currentPlan.location}
📍 *Preferred Seat / Stall:* ${selectedSeat || 'Any Available Prime Slot'}

👤 *Founder / Contact:* ${formData.founderName.trim() || 'Interested Exhibitor'}
🏷️ *Brand / Studio:* ${formData.brandName.trim() || 'Independent Brand'}
📱 *WhatsApp Phone:* ${formData.phone.trim()}
🏙️ *City / Location:* ${formData.city.trim() || 'Patna'}
🛍️ *Category:* ${formData.category}
${formData.requirements.trim() ? `📝 *Display Requirements:* ${formData.requirements.trim()}` : ''}
-----------------------------------------
_Hello Udaan Team, I would like to book my interest for this stall. Please share the floor plan availability and final allotment details._`;
  };

  // Handle "Book Your Interest" submission
  const handleSubmitInterest = (e) => {
    e.preventDefault();

    if (!formData.founderName || !formData.phone) {
      alert("Please provide your Name and WhatsApp Phone Number.");
      return;
    }

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    setWhatsappUrl(waLink);

    // Confetti celebration
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D9A441', '#B96535', '#4A1620', '#25D366', '#FAF4EB']
    });

    setIsSubmitted(true);

    // Redirect to WhatsApp immediately
    window.open(waLink, '_blank');
  };

  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-6 sm:mb-8">
          <Link to="/" className="hover:text-[#B96535] transition-colors">HOME</Link>
          <span className="text-[#6B5860]/40">/</span>
          <Link to="/events" className="hover:text-[#B96535] transition-colors">EVENTS</Link>
          <span className="text-[#6B5860]/40">/</span>
          <span className="text-[#B96535] font-semibold uppercase">BOOK A STALL</span>
        </div>

        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-[#B96535] uppercase shadow-xs">
            <UdaanDiamond size={11} className="text-[#B96535]" />
            <span>CURATED STALL ALLOTMENT • 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2A1C24] tracking-tight leading-tight">
            Reserve Your Space at <br />
            <span className="italic font-light text-shimmer-terracotta">Tangerine Grand</span>
          </h1>

          <p className="text-xs sm:text-base text-[#5E4A55] font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Choose from transparent 20k, 30k, or 50k turnkey booth packages. Submit your preferred seat and connect directly with our organizer team on WhatsApp to finalize your stall allotment.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-sans text-[#2A1C24]/80">
            <div className="flex items-center space-x-1.5 bg-[#FFF1D9]/50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg">
              <Calendar size={14} className="text-[#B96535]" />
              <span className="font-medium text-[11px] sm:text-xs">24 & 25 Oct 2026</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#FFF1D9]/50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg">
              <MapPin size={14} className="text-[#B96535]" />
              <span className="font-medium text-[11px] sm:text-xs">Lemon Tree Premier</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#FFF1D9]/50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg">
              <Store size={14} className="text-[#B96535]" />
              <span className="font-medium text-[11px] sm:text-xs">48 Curated Ateliers</span>
            </div>
          </div>
        </div>


        {/* =========================================================================
            SECTION 1: STALL OPTIONS & SPECIFICATIONS (Exact match for Screenshot 3)
            Cards for 20k (Standard), 30k (Corner Prime), 50k (Royal Pavilion)
            ========================================================================= */}
        <section className="mb-14 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              BOOTH ARCHITECTURE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2A1C24] mt-1">
              Stall Options &amp; Specifications
            </h2>
            <p className="text-xs text-[#5E4A55] font-sans mt-2">
              All stall bookings include turnkey electrical, lighting, and branding infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {STALL_TIERS.map((tier) => {
              const isSelected = selectedPlanId === tier.id;

              return (
                <div
                  key={tier.id}
                  className={`card-interactive p-5 sm:p-7 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FFFBF5] border transition-all duration-300 flex flex-col justify-between relative shadow-md ${
                    tier.isPopular 
                      ? 'border-[#B96535] ring-2 ring-[#B96535]/30 shadow-xl' 
                      : isSelected
                      ? 'border-[#B96535] shadow-lg'
                      : 'border-[#E9AD83]/35 hover:border-[#B96535]/60 hover:shadow-lg'
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#B96535] font-semibold font-sans">
                      {tier.location}
                    </span>
                    {tier.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#B96535] text-white text-[9px] font-sans font-bold tracking-wider uppercase shadow-xs">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-[#2A1C24] font-normal">
                      {tier.name}
                    </h3>

                    {/* Dimensions & Square Area */}
                    <div className="font-sans font-bold text-base text-[#B96535] mt-1">
                      {tier.size}
                    </div>

                    {/* Transparent Price */}
                    <div className="mt-3 py-2 px-3 rounded-xl bg-[#FFF1D9] border border-[#E9AD83]/40 inline-flex items-baseline space-x-1.5">
                      <span className="text-xs font-sans text-[#5E4A55] uppercase font-semibold">ALLOTMENT:</span>
                      <span className="text-xl font-serif font-bold text-[#4A1620]">
                        {tier.priceFormatted}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#5E4A55] font-sans mt-3 font-light leading-relaxed">
                      {tier.recommendedFor}
                    </p>

                    {/* Specifications List */}
                    <div className="mt-6 pt-5 border-t border-[#E9AD83]/25 space-y-2.5 text-xs font-sans text-[#2A1C24]">
                      {tier.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2.5">
                          <CheckCircle size={15} className="text-[#B96535] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Select Button */}
                  <div className="mt-8 pt-5 border-t border-[#E9AD83]/25">
                    <button
                      type="button"
                      onClick={() => handleSelectPlanFromCard(tier.id)}
                      className={`btn-shimmer-hover w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer active:scale-98 ${
                        isSelected 
                          ? 'bg-[#4A1620] text-[#FFE8B3] shadow-md'
                          : tier.isPopular
                          ? 'btn-sunset-gold text-[#2A1C24]'
                          : 'bg-[#FFF1D9] hover:bg-[#B96535] hover:text-white text-[#4A1620] border border-[#E9AD83]/50'
                      }`}
                    >
                      {isSelected ? '✓ Tier Selected' : `Select ${tier.name}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* =========================================================================
            SECTION 2: QUICK SEAT & FLOOR REFERENCE (Optional quick visual aid)
            ========================================================================= */}
        <section className="mb-20 p-6 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/35 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              TANGERINE GRAND FLOOR MAP
            </span>
            <h3 className="font-serif text-2xl text-[#2A1C24]">
              Inspect Available Seat Codes
            </h3>
            <p className="text-xs text-[#5E4A55] font-sans max-w-xl">
              Front row Royal Pavilions (P-01 to P-04), Corner Prime aisles (C-01 to C-04, A-01 to A-03), and Standard Booths (S-01 to S-10). Check the full interactive layout anytime.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/stalls"
              className="px-6 py-3 rounded-full border border-[#B96535]/50 bg-[#FAF4EB] hover:bg-[#FFF1D9] text-[#4A1620] text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-2 transition-all shadow-xs"
            >
              <Layers size={14} className="text-[#B96535]" />
              <span>Full 3D Floor Map &rarr;</span>
            </Link>
          </div>
        </section>


        {/* =========================================================================
            SECTION 3: "BOOK YOUR INTEREST" APPLICATION FORM
            As requested: Select Event -> Select Plan (20k/30k/50k) -> Select Seat
            -> "Book Your Interest" Button -> Redirects to WhatsApp with details!
            ========================================================================= */}
        <section id="book-interest-form" className="max-w-3xl mx-auto">
          <div className="bg-[#FFFBF5] rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-[#E9AD83]/40 shadow-xl space-y-6 sm:space-y-8">
            
            {/* Header */}
            <div className="text-center space-y-2 border-b border-[#E9AD83]/25 pb-5 sm:pb-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] font-sans text-[#B96535] uppercase font-semibold">
                <UdaanDiamond size={10} className="text-[#B96535]" />
                <span>DIRECT SELLER DESK • INSTANT ALLOTMENT</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#2A1C24] font-normal">
                Book Your Interest
              </h2>

              <p className="text-xs sm:text-sm text-[#5E4A55] font-sans font-light">
                Fill the 3 selections below to instantly connect with the Udaan seller on WhatsApp with your complete stall inquiry.
              </p>
            </div>

            {/* Submission Confirmation Card */}
            {isSubmitted ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF1D9] border border-[#B96535] text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                  <CheckCircle size={32} />
                </div>

                <h3 className="font-serif text-2xl text-[#2A1C24]">
                  Inquiry Ready to Connect!
                </h3>

                <p className="text-xs text-[#5E4A55] max-w-md mx-auto">
                  We've prepared your complete booking inquiry for <strong className="text-[#2A1C24]">{currentEvent.title}</strong> — <strong className="text-[#B96535]">{currentPlan.name} ({currentPlan.priceFormatted})</strong> at <strong className="text-[#2A1C24]">Stall {selectedSeat}</strong>.
                </p>

                <div className="p-4 rounded-xl bg-white border border-[#E9AD83]/40 text-left text-xs font-sans space-y-1.5 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#6B5860]">Applicant:</span>
                    <span className="font-semibold text-[#2A1C24]">{formData.founderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5860]">Brand / Studio:</span>
                    <span className="font-semibold text-[#2A1C24]">{formData.brandName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5860]">Plan &amp; Price:</span>
                    <span className="font-bold text-[#B96535]">{currentPlan.name} • {currentPlan.priceFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5860]">Seat Selected:</span>
                    <span className="font-bold text-[#2A1C24]">Stall {selectedSeat}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-102"
                  >
                    <MessageCircle size={16} />
                    <span>Open WhatsApp Chat with Seller</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E9AD83]/60 bg-white hover:bg-[#FAF4EB] text-[#4A1620] text-xs font-sans font-semibold tracking-wider uppercase transition-colors"
                  >
                    Edit Selections
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInterest} className="space-y-6 font-sans text-xs">

                {/* 1. SELECT YOUR EVENT */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#4A1620]">
                    1. Select Your Event *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {EVENTS_OPTIONS.map((ev) => {
                      const isEvSelected = selectedEventId === ev.id;
                      return (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => setSelectedEventId(ev.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isEvSelected
                              ? 'border-[#B96535] bg-[#FFF1D9] text-[#2A1C24] shadow-xs'
                              : 'border-[#E9AD83]/40 bg-[#FAF4EB] hover:bg-[#FFF1D9]/50 text-[#5E4A55]'
                          }`}
                        >
                          <div className="font-serif text-sm font-semibold text-[#2A1C24] line-clamp-1">
                            {ev.title}
                          </div>
                          <div className="text-[10px] text-[#B96535] font-medium mt-0.5">
                            {ev.date}
                          </div>
                          <div className="text-[9px] text-[#6B5860] truncate mt-0.5">
                            {ev.venue}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>


                {/* 2. SELECT YOUR TYPE / PLAN (20k, 30k, 50k) */}
                <div className="space-y-2 pt-2">
                  <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#4A1620]">
                    2. Select Your Plan / Tier (20k, 30k, 50k) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {STALL_TIERS.map((tier) => {
                      const isPlanSelected = selectedPlanId === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setSelectedPlanId(tier.id);
                            if (tier.sampleSeats.length > 0) {
                              setSelectedSeat(tier.sampleSeats[0]);
                            }
                          }}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isPlanSelected
                              ? 'border-[#B96535] bg-[#FFF1D9] text-[#2A1C24] ring-1 ring-[#B96535] shadow-xs'
                              : 'border-[#E9AD83]/40 bg-[#FAF4EB] hover:bg-[#FFF1D9]/50 text-[#5E4A55]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-sm font-semibold text-[#2A1C24]">
                              {tier.name}
                            </span>
                            <span className="font-mono text-xs font-bold text-[#B96535]">
                              {tier.priceFormatted}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#5E4A55] mt-1">
                            {tier.size}
                          </div>
                          <div className="text-[9px] text-[#B96535] uppercase font-semibold mt-0.5">
                            {tier.location}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>


                {/* 3. SELECT YOUR SEAT / STALL PREFERENCE */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#4A1620]">
                      3. Select or Enter Preferred Seat / Stall *
                    </label>
                    <span className="text-[10px] text-[#5E4A55]">
                      Selected: <strong className="text-[#B96535] font-bold">Stall {selectedSeat}</strong>
                    </span>
                  </div>

                  {/* Quick Seat Chips based on selected plan */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {currentPlan.sampleSeats.map((seatCode) => (
                      <button
                        key={seatCode}
                        type="button"
                        onClick={() => setSelectedSeat(seatCode)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedSeat === seatCode
                            ? 'bg-[#B96535] text-white shadow-xs'
                            : 'bg-[#FAF4EB] hover:bg-[#FFF1D9] text-[#2A1C24] border border-[#E9AD83]/40'
                        }`}
                      >
                        {seatCode}
                      </button>
                    ))}
                  </div>

                  {/* Custom Seat Input */}
                  <div className="pt-1">
                    <input
                      type="text"
                      placeholder="e.g. P-02, A-01, B-03, or 'Center Corner Preference'"
                      value={selectedSeat}
                      onChange={(e) => setSelectedSeat(e.target.value)}
                      className="w-full bg-[#FAF4EB] border border-[#E9AD83]/50 rounded-xl px-3.5 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                    />
                  </div>
                </div>


                {/* 4. APPLICANT DETAILS */}
                <div className="pt-4 border-t border-[#E9AD83]/25 space-y-4">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#4A1620]">
                    Your Brand &amp; Contact Details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">
                        Founder / Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sen"
                        value={formData.founderName}
                        onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/50 rounded-xl px-3.5 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">
                        Brand / Studio Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sen Artisans"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/50 rounded-xl px-3.5 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">
                        WhatsApp Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/50 rounded-xl px-3.5 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">
                        City / Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Patna, Kolkata, Varanasi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/50 rounded-xl px-3.5 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">
                      Product Domain / Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#FAF4EB] border border-[#E9AD83]/50 rounded-xl px-3.5 py-2.5 text-[#2A1C24] focus:outline-none focus:border-[#B96535]"
                    >
                      <option value="Fine Jewellery & Polki">Fine Jewellery & Polki</option>
                      <option value="Contemporary & Bridal Couture">Contemporary & Bridal Couture</option>
                      <option value="Heirloom Zari & Handlooms">Heirloom Zari & Handlooms</option>
                      <option value="Artisanal Silver & Filigree">Artisanal Silver & Filigree</option>
                      <option value="Festive Living & Home Decor">Festive Living & Home Decor</option>
                      <option value="Gourmet & Bespoke Gifting">Gourmet & Bespoke Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">
                      Display Requirements / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need 2 extra spotlight points, mannequin display area..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full bg-[#FAF4EB] border border-[#E9AD83]/50 rounded-xl p-3 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                    />
                  </div>
                </div>


                {/* SUBMIT BUTTON: "Book Your Interest" (Redirects to WhatsApp) */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-shimmer-hover w-full py-4 rounded-full bg-gradient-to-r from-[#B96535] via-[#C97545] to-[#B96535] hover:opacity-95 text-white font-sans text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-98"
                  >
                    <MessageCircle size={18} className="text-white shrink-0" />
                    <span>Book Your Interest</span>
                    <ArrowRight size={16} className="text-white shrink-0" />
                  </button>

                  <p className="text-center text-[11px] text-[#6B5860] mt-3">
                    Clicking <strong className="text-[#2A1C24]">"Book Your Interest"</strong> opens WhatsApp with your pre-filled details to connect directly with the organizer and finalize your stall allotment.
                  </p>
                </div>

              </form>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}
