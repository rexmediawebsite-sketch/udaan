import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Send, 
  Share2, 
  Copy, 
  Layers, 
  Compass, 
  Eye, 
  Building2,
  Users,
  Award,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UdaanDiamond, UdaanEmblem } from '../components/UdaanIcons';
import { 
  STALL_PACKAGES, 
  EXHIBITION_EVENTS, 
  COMPARISON_FEATURES, 
  BRAND_CATEGORIES, 
  STALL_FAQS 
} from '../data/stallPackagesData';
import { STALLS_DATA } from '../data/eventData';

export default function BookAStallPage() {
  const [searchParams] = useSearchParams();
  const urlStall = searchParams.get('stall');
  const urlCategory = searchParams.get('category');
  const urlPackage = searchParams.get('package');

  // Selected State Across the Journey
  const [selectedEvent, setSelectedEvent] = useState(EXHIBITION_EVENTS[0]);
  const [selectedPackage, setSelectedPackage] = useState(
    STALL_PACKAGES.find(p => p.id === urlPackage) || STALL_PACKAGES[1] // Default to Signature (Most Popular)
  );
  
  // Selected Stall on Architectural Map
  const defaultStall = STALLS_DATA.find(s => s.id === (urlStall || 'A-02')) || STALLS_DATA[1];
  const [selectedStall, setSelectedStall] = useState(defaultStall);
  const [hoveredStall, setHoveredStall] = useState(null);

  // Active Visual Concept for "What Your Stall Could Become"
  const [activeConceptIndex, setActiveConceptIndex] = useState(1);

  // Active Category Chip for Brand Fit
  const [activeCategory, setActiveCategory] = useState(
    BRAND_CATEGORIES.find(c => c.title === urlCategory) || BRAND_CATEGORIES[0]
  );

  // Active FAQ Accordion Index
  const [activeFaq, setActiveFaq] = useState(0);

  // Multi-step Application Form State
  const [currentStep, setCurrentStep] = useState(1); // 1: Event, 2: Space, 3: Brand, 4: Contact, 5: Review
  const [formData, setFormData] = useState({
    brandName: '',
    ownerName: '',
    category: urlCategory || 'Fashion & Apparels',
    creationType: '',
    socialHandle: '',
    description: '',
    phone: '',
    email: '',
    city: '',
    contactMethod: 'WhatsApp'
  });

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  // Active Stage in the Journey (for persistent right-side tracker)
  const [activeJourneyStage, setActiveJourneyStage] = useState('event');

  // Sync when URL query parameters are passed
  useEffect(() => {
    if (urlStall) {
      const found = STALLS_DATA.find(s => s.id.toLowerCase() === urlStall.toLowerCase());
      if (found) setSelectedStall(found);
    }
  }, [urlStall]);

  // Scroll to section helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.brandName || !formData.ownerName || !formData.phone) {
      alert("Please fill in your Brand Name, Founder Name, and WhatsApp Phone.");
      return;
    }

    const generatedId = `UDAAN-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplicationId(generatedId);

    // Launch celebratory sunset confetti
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D9A441', '#B8801F', '#B85C38', '#4A1823', '#F5EFE5']
    });

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyShareCard = () => {
    const text = `I'm exhibiting at UDAAN! ✨ Join ${formData.brandName || 'my brand'} at Glamour Gala Diwali Edition 5 (24 & 25 Oct 2026, Tangerine Grand, Lemon Tree Premier Patna). Stall: ${selectedStall.id}. https://udaanbihar.in`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="bg-[#F5EFE5] text-[#171416] min-h-screen overflow-x-hidden selection:bg-[#4A1823]/25 selection:text-[#4A1823]">
      
      {/* =========================================================================
          PERSISTENT DESKTOP JOURNEY TRACKER (Right Side Architectural Line)
          ========================================================================= */}
      <aside className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end space-y-4 select-none pointer-events-auto">
        <div className="text-[9px] font-sans font-bold tracking-[0.3em] uppercase text-[#B69A67] pr-3">
          STALL JOURNEY
        </div>
        <div className="relative flex flex-col items-end space-y-5 border-r border-[#B69A67]/30 pr-3">
          {[
            { id: 'hero-discover', label: '01 DISCOVER' },
            { id: 'choose-event', label: '02 EVENT' },
            { id: 'choose-space', label: '03 PACKAGES' },
            { id: 'interactive-map', label: '04 STALL MAP' },
            { id: 'what-you-get', label: '05 INCLUSIONS' },
            { id: 'application-flow', label: '06 APPLICATION' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToId(item.id)}
              className="group flex items-center space-x-2.5 text-[10px] font-sans font-medium tracking-widest uppercase transition-all text-[#171416]/50 hover:text-[#4A1823]"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
              <span className="w-2 h-2 rounded-full border border-[#B69A67] bg-[#F5EFE5] group-hover:bg-[#B69A67] transition-all" />
            </button>
          ))}
        </div>
      </aside>


      {/* =========================================================================
          CONFIRMATION VIEW (When Application is Submitted)
          ========================================================================= */}
      {isSubmitted ? (
        <section className="pt-32 pb-24 min-h-screen flex items-center justify-center px-4 sm:px-6 bg-[#4A1823] text-[#F5EFE5] animate-fadeIn">
          <div className="max-w-2xl w-full bg-[#171416]/95 border border-[#B69A67]/40 rounded-3xl p-6 sm:p-12 shadow-2xl text-center space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-[#641F2C] border-2 border-[#B69A67] flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(182,154,103,0.35)]">
              <CheckCircle2 size={42} className="text-[#B69A67]" />
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#B69A67]/40 bg-white/5 text-[10px] font-sans tracking-[0.3em] uppercase text-[#B69A67]">
              <UdaanDiamond size={9} />
              <span>APPLICATION DOCKET RECEIVED</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5EFE5] font-normal leading-tight">
              YOU'RE IN<br />
              <span className="italic font-light text-[#B69A67]">THE NEXT CHAPTER.</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#F5EFE5]/80 font-sans max-w-md mx-auto font-light leading-relaxed">
              Your application has been received by the UDAAN curation committee. We evaluate portfolio originality, category exclusivity, and craftsmanship within 24 hours.
            </p>

            {/* Official Application Receipt Card */}
            <div className="p-6 rounded-2xl bg-[#2A111C] border border-[#B69A67]/30 text-left text-xs font-sans space-y-2.5 max-w-md mx-auto shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-[#F5EFE5]/60">Application Reference ID:</span>
                <span className="font-mono text-[#B69A67] font-bold text-sm bg-black/40 px-2 py-0.5 rounded border border-[#B69A67]/40">
                  {applicationId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EFE5]/60">Selected Event:</span>
                <span className="font-medium text-[#F5EFE5]">{selectedEvent.name} • {selectedEvent.edition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EFE5]/60">Selected Stall Space:</span>
                <span className="font-bold text-[#B69A67]">Stall {selectedStall.id} ({selectedPackage.name})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EFE5]/60">Proposed Package:</span>
                <span className="text-[#F5EFE5] font-medium">{selectedPackage.priceFormatted} • {selectedPackage.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5EFE5]/60">Registered Brand:</span>
                <span className="text-[#F5EFE5] font-semibold">{formData.brandName}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-[#F5EFE5]/60">Founder Contact:</span>
                <span className="text-[#F5EFE5] font-medium">{formData.ownerName} ({formData.phone})</span>
              </div>
            </div>

            {/* Share Your Participation Card (Modular Moment) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#641F2C]/60 to-[#4A1823]/80 border border-[#B69A67]/35 text-center space-y-3 max-w-md mx-auto">
              <span className="text-[10px] tracking-widest text-[#B69A67] uppercase font-bold block">
                SHARE YOUR PARTICIPATION CARD
              </span>
              <div className="p-4 rounded-xl bg-black/40 border border-[#B69A67]/30 text-center space-y-1">
                <div className="font-serif italic text-lg text-[#F5EFE5]">
                  “I'm exhibiting at UDAAN.”
                </div>
                <div className="text-[11px] font-sans font-bold text-[#B69A67] tracking-wider uppercase">
                  {selectedEvent.name} • {selectedEvent.edition}
                </div>
                <div className="text-xs text-[#F5EFE5]/80 font-medium">
                  {formData.brandName} • Stall {selectedStall.id}
                </div>
              </div>

              <button
                onClick={copyShareCard}
                className="w-full py-2.5 rounded-full bg-[#B69A67] hover:bg-[#D8C8B5] text-[#171416] text-[11px] font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedShare ? <Check size={14} /> : <Share2 size={14} />}
                <span>{copiedShare ? "Card Copied to Clipboard!" : "Share My Participation"}</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/events"
                className="w-full sm:w-auto px-7 py-3 rounded-full border border-[#B69A67]/50 text-[#F5EFE5] hover:text-[#B69A67] text-xs font-sans tracking-widest uppercase transition-colors"
              >
                Explore Udaan Events &rarr;
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#F5EFE5] text-xs font-sans tracking-widest uppercase transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* =========================================================================
              1. HERO — “ENTER UDAAN” (Atmospheric Exhibition Pre-Crowd Awakening)
              ========================================================================= */}
          <section
            id="hero-discover"
            className="relative w-full min-h-screen h-[100vh] min-h-[720px] overflow-hidden text-center flex flex-col justify-between items-center select-none bg-[#171416] text-[#F5EFE5]"
          >
            {/* Background: Atmospheric pre-event lighting, subtle haze & shadows */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-45 filter saturate-[1.15] contrast-[1.08] scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=85')`,
              }}
            />
            {/* Deep Vignette & Atmospheric Gradients */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#171416]/85 via-[#4A1823]/35 to-[#171416]/90 pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(23,20,22,0.85)_100%)] pointer-events-none" />

            {/* Top Eyebrow */}
            <div className="pt-28 md:pt-36 z-10">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#B69A67]/40 bg-[#171416]/60 backdrop-blur-md text-[11px] font-sans font-medium tracking-[0.3em] text-[#B69A67] uppercase shadow-sm">
                <UdaanDiamond size={10} className="text-[#B69A67]" />
                <span>EXHIBIT WITH UDAAN</span>
              </div>
            </div>

            {/* Hero Center Composition */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 my-auto space-y-4">
              <h1 className="font-serif text-[#F5EFE5] tracking-tight leading-[0.98] select-text">
                <span className="block text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.12em] text-[#F5EFE5]/90 uppercase">
                  YOUR SPACE.
                </span>
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-[0.15em] text-[#F5EFE5] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                  YOUR BRAND.
                </span>
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5EFE5] via-[#B69A67] to-[#D8C8B5] tracking-wide leading-tight">
                  YOUR NEXT CHAPTER.
                </span>
              </h1>

              <p className="text-sm sm:text-base font-sans tracking-[0.18em] uppercase text-[#B69A67] max-w-xl mx-auto font-light leading-relaxed pt-2">
                Put your brand where people come to discover what’s next.
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => scrollToId('choose-event')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#B69A67] via-[#D8C8B5] to-[#B69A67] text-[#171416] text-xs font-sans font-bold tracking-[0.22em] uppercase shadow-[0_8px_25px_rgba(182,154,103,0.35)] hover:scale-[1.02] transition-all cursor-pointer"
                >
                  BEGIN YOUR APPLICATION
                </button>

                <button
                  onClick={() => scrollToId('choose-space')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 text-[#F5EFE5] text-xs font-sans tracking-[0.22em] uppercase transition-all backdrop-blur-md cursor-pointer"
                >
                  EXPLORE STALL OPTIONS
                </button>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="pb-8 z-10 space-y-2">
              <div className="text-[11px] font-sans font-medium tracking-[0.3em] uppercase text-[#F5EFE5]/70">
                24—25 OCTOBER 2026 • TANGERINE GRAND, PATNA
              </div>
              <button
                onClick={() => scrollToId('why-it-matters')}
                className="group inline-flex flex-col items-center space-y-1 text-[9px] tracking-[0.3em] font-sans uppercase text-[#B69A67] hover:text-[#F5EFE5] transition-colors cursor-pointer"
              >
                <span>ENTER THE EXPERIENCE</span>
                <span className="text-xs group-hover:translate-y-1 transition-transform">↓</span>
              </button>
            </div>
          </section>


          {/* =========================================================================
              2. HERO TRANSITION — “EVERY BRAND NEEDS A SPACE”
              ========================================================================= */}
          <section className="py-20 md:py-28 bg-[#4A1823] text-[#F5EFE5] text-center border-b border-[#B69A67]/25 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 space-y-3 relative z-10">
              <span className="text-[10px] tracking-[0.3em] font-sans text-[#B69A67] uppercase font-bold block">
                THE PHYSICAL MANIFESTO
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5EFE5] font-normal tracking-tight">
                EVERY BRAND NEEDS A SPACE.
              </h2>
              <p className="font-serif italic text-base sm:text-xl text-[#F5EFE5]/80 max-w-xl mx-auto leading-relaxed">
                “Beyond screens and digital ads, real customer devotion is built in physical rooms where your craft can be touched, worn, and remembered.”
              </p>
            </div>
          </section>


          {/* =========================================================================
              3. “WHY YOUR SPACE MATTERS” (DON'T JUST SHOW UP. BE SEEN.)
              ========================================================================= */}
          <section id="why-it-matters" className="py-24 md:py-36 bg-[#F5EFE5] border-b border-[#B69A67]/20">
            <div className="max-w-6xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  FOUNDER VALUE
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171416] font-normal tracking-tight leading-[1.05]">
                  DON’T JUST SHOW UP.<br />
                  <span className="italic text-[#4A1823]">BE SEEN.</span>
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#171416]/75">
                  A stall is more than a table inside an exhibition. It is your brand's first physical impression.
                </p>
              </div>

              {/* 4 Visual Moments with Oversized Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    num: "01",
                    title: "MEET & CONNECT",
                    desc: "Meet customers, luxury patrons, curators, and fellow women entrepreneurs face to face in a verified 5-star pavilion."
                  },
                  {
                    num: "02",
                    title: "BUILD VISIBILITY",
                    desc: "Put your collections directly in front of Bihar’s most affluent pre-Diwali shoppers with protected category exclusivity."
                  },
                  {
                    num: "03",
                    title: "CREATE EXPERIENCES",
                    desc: "Turn your stall into a physical, sensory expression of your boutique with custom spotlights, signage, and drapes."
                  },
                  {
                    num: "04",
                    title: "GROW YOUR BUSINESS",
                    desc: "Turn intimate conversations into repeat patrons, corporate Diwali gifting contracts, and wedding trousseau orders."
                  }
                ].map((moment, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-[#FFFBF5] border border-[#B69A67]/30 shadow-md hover:shadow-xl hover:border-[#B69A67] transition-all duration-300 space-y-4 group"
                  >
                    <span className="font-serif text-5xl sm:text-6xl font-black text-[#B69A67]/40 group-hover:text-[#4A1823] transition-colors block">
                      {moment.num}
                    </span>
                    <h3 className="font-serif text-xl text-[#171416] font-bold">
                      {moment.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#171416]/75 font-light leading-relaxed">
                      {moment.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>


          {/* =========================================================================
              4. “CHOOSE YOUR EVENT” (Where Will Your Brand Be Seen?)
              ========================================================================= */}
          <section id="choose-event" className="py-24 md:py-36 bg-[#FFFBF5] border-b border-[#B69A67]/20">
            <div className="max-w-6xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  STEP 01 • DESTINATION
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171416] font-normal tracking-tight">
                  WHERE WILL YOUR BRAND BE SEEN?
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#171416]/75">
                  Select your showcase platform across UDAAN’s luxury calendar.
                </p>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {EXHIBITION_EVENTS.map((ev, idx) => {
                  const isSelected = selectedEvent.id === ev.id;
                  return (
                    <div
                      key={ev.id}
                      onClick={() => {
                        setSelectedEvent(ev);
                        scrollToId('choose-space');
                      }}
                      className={`cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-500 shadow-xl relative ${
                        idx === 0 ? 'lg:col-span-8' : 'lg:col-span-4'
                      } ${
                        isSelected 
                          ? 'border-[#B69A67] ring-4 ring-[#B69A67]/20 shadow-2xl scale-[1.01]' 
                          : 'border-[#B69A67]/30 hover:border-[#B69A67]/70'
                      }`}
                    >
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#171416]">
                        <img
                          src={ev.heroImage}
                          alt={ev.name}
                          className="w-full h-full object-cover filter saturate-[1.1] hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171416] via-[#171416]/60 to-transparent pointer-events-none" />

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#4A1823]/90 backdrop-blur-md border border-[#B69A67]/40 text-[#F5EFE5] text-[10px] font-sans font-bold tracking-widest uppercase">
                          {ev.status}
                        </div>

                        {isSelected && (
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#B69A67] text-[#171416] text-[10px] font-sans font-bold tracking-widest uppercase flex items-center gap-1 shadow-md">
                            <Check size={12} />
                            <span>SELECTED EVENT</span>
                          </div>
                        )}

                        <div className="absolute bottom-6 left-6 right-6 text-[#F5EFE5] space-y-2">
                          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B69A67] uppercase block">
                            {ev.edition}
                          </span>
                          <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                            {ev.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#F5EFE5]/85 pt-1">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={13} className="text-[#B69A67]" />
                              {ev.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={13} className="text-[#B69A67]" />
                              {ev.hall}, {ev.venue}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-[#FFFDF9] flex items-center justify-between">
                        <p className="text-xs text-[#171416]/75 font-sans line-clamp-2 max-w-md">
                          {ev.description}
                        </p>
                        <button
                          type="button"
                          className="px-5 py-2.5 rounded-full bg-[#4A1823] hover:bg-[#171416] text-[#F5EFE5] text-[11px] font-sans font-semibold tracking-wider uppercase shrink-0 transition-colors ml-3"
                        >
                          {isSelected ? "Confirmed ✓" : "Choose Event →"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>


          {/* =========================================================================
              5. TRANSITION: “NOW, FIND YOUR SPACE.”
              ========================================================================= */}
          <div className="py-12 bg-[#4A1823] text-center border-y border-[#B69A67]/30">
            <span className="text-[10px] tracking-[0.3em] font-sans text-[#B69A67] uppercase font-bold block mb-1">
              STEP 02 • ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5EFE5] font-normal tracking-tight">
              NOW, <span className="italic text-[#B69A67]">FIND YOUR SPACE.</span>
            </h2>
          </div>


          {/* =========================================================================
              6. STALL SELECTION — THE HERO INTERACTION (3 Proposed Packages)
              Configurable CMS Data (Essential ₹20k, Signature ₹30k, Premium ₹50k)
              ========================================================================= */}
          <section id="choose-space" className="py-24 md:py-36 bg-[#F5EFE5] border-b border-[#B69A67]/20">
            <div className="max-w-6xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  ARCHITECTURAL TIERS
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171416] font-normal tracking-tight">
                  CHOOSE YOUR SPACE.
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#171416]/75">
                  Every brand deserves a space that feels like its own.
                </p>
                <div className="text-[11px] font-sans text-[#171416]/50 italic">
                  *Package specifications and inclusions are proposed exhibition tiers.
                </div>
              </div>

              {/* 3 Distinct Architectural Space Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {STALL_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPackage(pkg);
                        // Also set visual concept
                        const idx = pkg.id === 'essential' ? 0 : pkg.id === 'signature' ? 1 : 2;
                        setActiveConceptIndex(idx);
                      }}
                      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-400 cursor-pointer shadow-lg ${
                        isSelected
                          ? 'bg-[#FFFDF9] border-2 border-[#B69A67] shadow-2xl scale-[1.03] ring-4 ring-[#B69A67]/20 z-10'
                          : 'bg-[#FFFBF5] border border-[#B69A67]/30 hover:border-[#B69A67]/70 hover:shadow-xl'
                      }`}
                    >
                      {/* Top Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[#A85F4B]">
                          {pkg.label}
                        </span>
                        {pkg.featured && (
                          <span className="px-3 py-1 rounded-full bg-[#4A1823] text-[#F5EFE5] text-[9.5px] font-sans font-bold tracking-widest uppercase shadow-xs">
                            {pkg.badge}
                          </span>
                        )}
                        {!pkg.featured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#B69A67]/20 text-[#641F2C] text-[9px] font-sans font-bold tracking-wider uppercase">
                            {pkg.badge}
                          </span>
                        )}
                      </div>

                      {/* Package Name & Price */}
                      <div className="space-y-1 pb-4 border-b border-[#B69A67]/20">
                        <h3 className="font-serif text-3xl text-[#171416] font-bold">
                          {pkg.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-3xl font-extrabold text-[#4A1823]">
                            {pkg.priceFormatted}
                          </span>
                          <span className="text-xs text-[#171416]/50 font-sans">/ 2 Days Event</span>
                        </div>
                        <div className="text-xs font-sans font-semibold text-[#B69A67] tracking-wide pt-1">
                          STALL SIZE: {pkg.size}
                        </div>
                      </div>

                      {/* Best For & Personality */}
                      <div className="py-4 space-y-2 text-xs font-sans">
                        <p className="text-[#171416]/80 italic">
                          <strong>Best for:</strong> {pkg.bestFor}
                        </p>
                        <p className="text-[#A85F4B] text-[11px] font-medium">
                          {pkg.visualPersonality}
                        </p>
                      </div>

                      {/* Inclusions List */}
                      <div className="space-y-2.5 py-4 border-t border-[#B69A67]/20 text-xs font-sans flex-1">
                        <span className="text-[10px] tracking-widest uppercase font-bold text-[#171416]/60 block mb-2">
                          PROPOSED INCLUSIONS:
                        </span>
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-[#171416]/80">
                            <Check size={14} className="text-[#B69A67] shrink-0 mt-0.5" />
                            <span className="leading-snug">{inc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-6">
                        <button
                          type="button"
                          className={`w-full py-3.5 rounded-full text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#B69A67] via-[#D8C8B5] to-[#B69A67] text-[#171416]'
                              : 'border border-[#4A1823]/40 bg-white/60 text-[#4A1823] hover:bg-[#4A1823] hover:text-[#F5EFE5]'
                          }`}
                        >
                          {isSelected ? `SELECTED ${pkg.name.toUpperCase()} ✓` : `CHOOSE ${pkg.name.toUpperCase()}`}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </section>


          {/* =========================================================================
              7. PACKAGE COMPARISON — “FIND YOUR FIT.”
              ========================================================================= */}
          <section className="py-20 md:py-28 bg-[#FFFBF5] border-b border-[#B69A67]/20">
            <div className="max-w-5xl mx-auto px-6">
              
              <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  SIDE-BY-SIDE MATRIX
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171416] font-normal tracking-tight">
                  FIND YOUR FIT.
                </h2>
                <p className="text-xs font-sans text-[#171416]/70">
                  Compare specifications and discover the exact space tailored for your atelier.
                </p>
              </div>

              {/* Editorial Comparison Table */}
              <div className="rounded-3xl border border-[#B69A67]/35 overflow-hidden bg-white shadow-xl">
                <div className="grid grid-cols-4 p-4 sm:p-6 bg-[#4A1823] text-[#F5EFE5] text-xs font-sans uppercase tracking-wider font-bold">
                  <div>SPECIFICATIONS</div>
                  <div className={`text-center ${selectedPackage.id === 'essential' ? 'text-[#B69A67]' : ''}`}>ESSENTIAL</div>
                  <div className={`text-center ${selectedPackage.id === 'signature' ? 'text-[#B69A67]' : ''}`}>SIGNATURE ★</div>
                  <div className={`text-center ${selectedPackage.id === 'premium' ? 'text-[#B69A67]' : ''}`}>PREMIUM</div>
                </div>

                <div className="divide-y divide-[#B69A67]/20 text-xs font-sans">
                  {COMPARISON_FEATURES.map((row, i) => (
                    <div key={i} className="grid grid-cols-4 p-4 sm:p-5 items-center hover:bg-[#F5EFE5]/50 transition-colors">
                      <div className="font-semibold text-[#171416] pr-2">{row.feature}</div>
                      <div className={`text-center text-[#171416]/80 ${selectedPackage.id === 'essential' ? 'font-bold text-[#4A1823] bg-[#B69A67]/10 py-1 rounded-lg' : ''}`}>
                        {row.essential}
                      </div>
                      <div className={`text-center text-[#171416]/80 ${selectedPackage.id === 'signature' ? 'font-bold text-[#4A1823] bg-[#B69A67]/15 py-1 rounded-lg' : ''}`}>
                        {row.signature}
                      </div>
                      <div className={`text-center text-[#171416]/80 ${selectedPackage.id === 'premium' ? 'font-bold text-[#4A1823] bg-[#B69A67]/10 py-1 rounded-lg' : ''}`}>
                        {row.premium}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>


          {/* =========================================================================
              8. “WHAT YOUR STALL COULD BECOME” (Visual Concept Switcher)
              ========================================================================= */}
          <section className="py-24 md:py-36 bg-[#171416] text-[#F5EFE5] border-b border-[#B69A67]/20 select-none">
            <div className="max-w-6xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#B69A67]/40 bg-white/5 text-[9px] font-sans tracking-[0.25em] text-[#B69A67] uppercase">
                  <Sparkles size={10} />
                  <span>ATMOSPHERIC PREVIEW</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5EFE5] font-normal tracking-tight">
                  YOUR SPACE.<br />
                  <span className="italic text-[#B69A67]">YOUR EXPRESSION.</span>
                </h2>
                <p className="font-serif italic text-base text-[#F5EFE5]/75">
                  See how different architectural zones come alive.
                </p>
              </div>

              {/* Concept Switcher Tabs */}
              <div className="flex justify-center gap-3 mb-8">
                {STALL_PACKAGES.map((pkg, i) => (
                  <button
                    key={pkg.id}
                    onClick={() => setActiveConceptIndex(i)}
                    className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all cursor-pointer ${
                      activeConceptIndex === i
                        ? 'bg-[#B69A67] text-[#171416] font-bold shadow-lg scale-105'
                        : 'bg-white/10 text-[#F5EFE5]/70 hover:text-white border border-white/15'
                    }`}
                  >
                    {pkg.name} ({pkg.size.split(' ')[1]} {pkg.size.split(' ')[2]})
                  </button>
                ))}
              </div>

              {/* Large Cinematic Mock Exhibition Environment */}
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border-2 border-[#B69A67]/40 shadow-2xl">
                <img
                  src={STALL_PACKAGES[activeConceptIndex].visualConcept.image}
                  alt={STALL_PACKAGES[activeConceptIndex].visualConcept.title}
                  className="w-full h-full object-cover filter saturate-[1.1] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171416] via-[#171416]/50 to-transparent pointer-events-none" />

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[9px] font-sans font-bold tracking-widest uppercase text-[#B69A67]">
                  VISUAL CONCEPT ONLY
                </div>

                <div className="absolute bottom-6 left-6 right-6 max-w-xl text-[#F5EFE5] space-y-2">
                  <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#B69A67] font-bold block">
                    {STALL_PACKAGES[activeConceptIndex].label}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                    {STALL_PACKAGES[activeConceptIndex].visualConcept.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-stone-300 font-light leading-relaxed">
                    {STALL_PACKAGES[activeConceptIndex].visualConcept.desc}
                  </p>
                </div>
              </div>

            </div>
          </section>


          {/* =========================================================================
              9. STALL MAP — SEE WHERE YOU'LL STAND (Architectural Plan)
              ========================================================================= */}
          <section id="interactive-map" className="py-24 md:py-36 bg-[#F5EFE5] border-b border-[#B69A67]/20">
            <div className="max-w-6xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  STEP 03 • FLOOR PLAN
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171416] font-normal tracking-tight">
                  SEE WHERE YOU'LL STAND.
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#171416]/75">
                  Tangerine Grand, Lemon Tree Premier Patna • Select an available space.
                </p>
              </div>

              {/* Architectural Plan Board */}
              <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFBF5] border border-[#B69A67]/40 shadow-xl space-y-6">
                
                {/* Floor Legend Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#B69A67]/20 text-xs font-sans">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-white border border-[#B69A67]/60" />
                      <span>Available</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-[#B69A67] border border-[#B69A67]" />
                      <span className="font-bold text-[#4A1823]">Selected</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-[#FDF0E8] border border-[#A85F4B]/40" />
                      <span>Reserved</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-[#171416]/10 border border-transparent opacity-50" />
                      <span>Booked</span>
                    </span>
                  </div>

                  <div className="text-[11px] text-[#A85F4B] font-semibold uppercase tracking-wider">
                    Click any stall node to choose your position
                  </div>
                </div>

                {/* Simplified Architectural Grid */}
                <div className="space-y-6">
                  
                  {/* Entrance Promenade & Royal Pavilion Zone */}
                  <div className="p-4 rounded-2xl bg-[#F5EFE5] border border-[#B69A67]/30 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-sans font-bold tracking-wider text-[#4A1823] uppercase">
                      <span>MAIN ENTRANCE PROMENADE & CENTERPIECE (PREMIUM TIERS)</span>
                      <span className="text-[#B69A67]">4m × 3m</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {STALLS_DATA.slice(0, 4).map((stall) => {
                        const isSelected = selectedStall.id === stall.id;
                        const isAvailable = stall.status === 'AVAILABLE';
                        return (
                          <button
                            key={stall.id}
                            disabled={stall.status === 'BOOKED'}
                            onClick={() => {
                              setSelectedStall(stall);
                              if (stall.type === 'Royal Pavilion') {
                                setSelectedPackage(STALL_PACKAGES[2]);
                              }
                            }}
                            className={`p-3.5 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-[#B69A67] text-[#171416] border-[#B69A67] shadow-lg font-bold scale-[1.03]'
                                : isAvailable
                                ? 'bg-white hover:bg-[#FFFDF9] border-[#B69A67]/40 text-[#171416]'
                                : 'bg-[#171416]/5 border-transparent text-[#171416]/40 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-mono font-bold text-sm">{stall.id}</span>
                              <span className="text-[9px] uppercase tracking-wider">{stall.status}</span>
                            </div>
                            <div className="text-[10px] font-sans mt-1 truncate">{stall.type}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Boulevard Aisles (Signature & Essential Stalls) */}
                  <div className="p-4 rounded-2xl bg-[#F5EFE5] border border-[#B69A67]/30 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-sans font-bold tracking-wider text-[#4A1823] uppercase">
                      <span>CENTRAL SHOPPING AISLES A, B & C (SIGNATURE & ESSENTIAL)</span>
                      <span className="text-[#B69A67]">3m × 3m / 3m × 2.5m</span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                      {STALLS_DATA.slice(4, 16).map((stall) => {
                        const isSelected = selectedStall.id === stall.id;
                        const isAvailable = stall.status === 'AVAILABLE';
                        return (
                          <button
                            key={stall.id}
                            disabled={stall.status === 'BOOKED'}
                            onClick={() => {
                              setSelectedStall(stall);
                              if (stall.type === 'Corner Prime') {
                                setSelectedPackage(STALL_PACKAGES[1]);
                              } else {
                                setSelectedPackage(STALL_PACKAGES[0]);
                              }
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-[#B69A67] text-[#171416] border-[#B69A67] shadow-md font-bold scale-[1.03]'
                                : isAvailable
                                ? 'bg-white hover:bg-[#FFFDF9] border-[#B69A67]/40 text-[#171416]'
                                : 'bg-[#171416]/5 border-transparent text-[#171416]/40 cursor-not-allowed opacity-60'
                            }`}
                          >
                            <div className="font-mono font-bold text-xs">{stall.id}</div>
                            <div className="text-[9px] truncate text-[#171416]/70">{stall.size}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Floating "YOUR SPACE" Selected Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#4A1823] text-[#F5EFE5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B69A67] uppercase block">
                      YOUR SELECTED SPACE
                    </span>
                    <div className="font-serif text-xl sm:text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
                      <span>Stall {selectedStall.id}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-[#B69A67]">{selectedPackage.name} Space</span>
                      <span className="text-white/40">•</span>
                      <span>{selectedPackage.priceFormatted}</span>
                    </div>
                    <p className="text-xs text-[#F5EFE5]/75 font-sans">
                      {selectedStall.location || "Tangerine Grand Exhibition Hall"} • {selectedStall.size}
                    </p>
                  </div>

                  <button
                    onClick={() => scrollToId('application-flow')}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#B69A67] via-[#D8C8B5] to-[#B69A67] text-[#171416] text-xs font-sans font-bold tracking-[0.2em] uppercase shadow-lg hover:scale-[1.02] transition-all cursor-pointer whitespace-nowrap"
                  >
                    LOCK THIS SPACE & APPLY →
                  </button>
                </div>

              </div>

            </div>
          </section>


          {/* =========================================================================
              10. “MORE THAN FOUR WALLS” (What You Get)
              ========================================================================= */}
          <section id="what-you-get" className="py-24 md:py-36 bg-[#4A1823] text-[#F5EFE5] border-b border-[#B69A67]/25">
            <div className="max-w-6xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#B69A67] uppercase font-bold">
                  THE VALUE SYSTEM
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5EFE5] font-normal tracking-tight">
                  MORE THAN FOUR WALLS.
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#F5EFE5]/75">
                  Every square foot is engineered for commercial visibility.
                </p>
              </div>

              {/* 4 Full-Screen Typography Transition Statements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    keyword: "YOUR SPACE.",
                    result: "YOUR BRAND, PHYSICALLY PRESENT.",
                    desc: "An air-conditioned 5-star pavilion where patrons can inspect silk thread counts, try on polki sets, and fall in love with your story."
                  },
                  {
                    keyword: "YOUR VISIBILITY.",
                    result: "BE WHERE PEOPLE ARE LOOKING.",
                    desc: "Prime pre-Diwali timing when Bihar’s high-net-worth wedding families have dedicated festive gifting and trousseau budgets."
                  },
                  {
                    keyword: "YOUR AUDIENCE.",
                    result: "MEET PEOPLE BEYOND THE SCREEN.",
                    desc: "5,000+ verified patrons visiting with clear purchasing intent, removing online return friction and logistics fatigue."
                  },
                  {
                    keyword: "YOUR MOMENT.",
                    result: "TURN AN EVENT INTO AN EMPIRE.",
                    desc: "Over 40% of UDAAN past exhibitors grew their boutique from an Instagram page into recognized regional showrooms."
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-[#171416]/70 border border-[#B69A67]/30 space-y-3 shadow-xl hover:border-[#B69A67] transition-all"
                  >
                    <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#B69A67] uppercase block">
                      {item.keyword}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EFE5] font-bold">
                      {item.result}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#F5EFE5]/75 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>


          {/* =========================================================================
              11. BRAND FIT SECTION
              ========================================================================= */}
          <section className="py-24 md:py-32 bg-[#F5EFE5] border-b border-[#B69A67]/20">
            <div className="max-w-6xl mx-auto px-6">
              
              <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  CURATION DOMAINS
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171416] font-normal tracking-tight">
                  IS UDAAN FOR YOUR BRAND?
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#171416]/75">
                  Made for brands that want to be remembered.
                </p>
              </div>

              {/* Category Chips Grid */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {BRAND_CATEGORIES.map((cat) => {
                  const isSelected = activeCategory.id === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#4A1823] text-[#F5EFE5] font-bold shadow-md scale-105'
                          : 'bg-white border border-[#B69A67]/40 text-[#171416] hover:bg-[#FFFBF5]'
                      }`}
                    >
                      {cat.title}
                    </button>
                  );
                })}
              </div>

              {/* Selected Category Spotlight */}
              <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#B69A67]/40 shadow-xl flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/3 aspect-square rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#B69A67] uppercase">
                    FEATURED CURATION DOMAIN
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#171416] font-bold">
                    {activeCategory.title}
                  </h3>
                  <div className="font-hindi text-sm text-[#A85F4B]">
                    {activeCategory.hindi}
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-[#171416]/80 font-light leading-relaxed">
                    {activeCategory.desc}
                  </p>
                </div>
              </div>

            </div>
          </section>


          {/* =========================================================================
              12. PROGRESSIVE MULTI-STEP APPLICATION FORM
              01 Event → 02 Space → 03 Brand → 04 Contact → 05 Review & Confirm
              ========================================================================= */}
          <section id="application-flow" className="py-24 md:py-36 bg-[#FFFBF5] border-b border-[#B69A67]/20">
            <div className="max-w-4xl mx-auto px-6">
              
              <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  PROGRESSIVE REGISTRATION
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#171416] font-normal tracking-tight">
                  TELL US ABOUT YOUR BRAND.
                </h2>
                <p className="text-xs font-sans text-[#171416]/70">
                  Zero fee to apply. Commercial confirmation only upon curation review.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-10">
                <div className="flex items-center justify-between text-[10px] font-sans tracking-widest uppercase font-semibold text-[#171416]/60 pb-2">
                  <span className="text-[#4A1823] font-bold">01 EVENT</span>
                  <span className="text-[#4A1823] font-bold">02 SPACE</span>
                  <span className={currentStep >= 3 ? "text-[#4A1823] font-bold" : ""}>03 BRAND</span>
                  <span className={currentStep >= 4 ? "text-[#4A1823] font-bold" : ""}>04 CONTACT</span>
                  <span className={currentStep === 5 ? "text-[#4A1823] font-bold" : ""}>05 REVIEW</span>
                </div>
                <div className="w-full h-1 bg-[#B69A67]/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4A1823] transition-all duration-400"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Application Form Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B69A67]/40 shadow-2xl space-y-6">
                
                {/* STEP 01 & 02 SUMMARY CHIPS (Locked Choices) */}
                <div className="p-4 rounded-2xl bg-[#F5EFE5] border border-[#B69A67]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#A85F4B] block font-bold">EVENT CONFIRMED</span>
                    <span className="font-bold text-[#171416]">{selectedEvent.name} • {selectedEvent.edition}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#A85F4B] block font-bold">SPACE CONFIRMED</span>
                    <span className="font-bold text-[#171416]">Stall {selectedStall.id} ({selectedPackage.name}) • {selectedPackage.priceFormatted}</span>
                  </div>
                  <button
                    onClick={() => scrollToId('choose-space')}
                    className="text-[11px] text-[#4A1823] underline font-bold uppercase hover:text-[#B69A67] transition-colors"
                  >
                    Change Space
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6 font-sans text-xs">
                  
                  {/* STEP 3: BRAND DETAILS */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="border-b border-[#B69A67]/20 pb-2">
                        <h4 className="font-serif text-xl text-[#171416] font-bold">Let's Meet Your Brand</h4>
                        <p className="text-[11px] text-[#171416]/60">Share your atelier's craft and social footprint.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            Brand / Business Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sen Artisans"
                            value={formData.brandName}
                            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] placeholder-[#171416]/40 focus:outline-none focus:border-[#4A1823]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            Founder / Owner Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ananya Sen"
                            value={formData.ownerName}
                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] placeholder-[#171416]/40 focus:outline-none focus:border-[#4A1823]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            Product Category *
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] focus:outline-none focus:border-[#4A1823]"
                          >
                            {BRAND_CATEGORIES.map(c => (
                              <option key={c.id} value={c.title}>{c.title}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            Instagram or Website Link
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. @senartisans or www.senartisans.com"
                            value={formData.socialHandle}
                            onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] placeholder-[#171416]/40 focus:outline-none focus:border-[#4A1823]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                          What do you create? (Short Description)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Describe your handcrafted pret, polki jewellery, or festive creations..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl p-3.5 text-[#171416] placeholder-[#171416]/40 focus:outline-none focus:border-[#4A1823]"
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          disabled={!formData.brandName || !formData.ownerName}
                          onClick={() => setCurrentStep(4)}
                          className="px-8 py-3.5 rounded-full bg-[#4A1823] hover:bg-[#171416] text-[#F5EFE5] text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          Continue to Contact Details &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: CONTACT DETAILS */}
                  {currentStep === 4 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="border-b border-[#B69A67]/20 pb-2">
                        <h4 className="font-serif text-xl text-[#171416] font-bold">How Can We Reach You?</h4>
                        <p className="text-[11px] text-[#171416]/60">Our curation committee liaises directly with founders.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            WhatsApp Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] placeholder-[#171416]/40 focus:outline-none focus:border-[#4A1823]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="founder@yourbrand.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] placeholder-[#171416]/40 focus:outline-none focus:border-[#4A1823]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            City / Location
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Patna, Varanasi, Kolkata, Delhi"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] placeholder-[#171416]/40 focus:outline-none focus:border-[#4A1823]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#171416]/75 mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                            Preferred Contact Method
                          </label>
                          <select
                            value={formData.contactMethod}
                            onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                            className="w-full bg-[#FAF4EB] border border-[#B69A67]/40 rounded-xl px-4 py-3 text-[#171416] focus:outline-none focus:border-[#4A1823]"
                          >
                            <option value="WhatsApp">WhatsApp Message</option>
                            <option value="Phone Call">Direct Phone Call</option>
                            <option value="Email">Email Communication</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-xs text-[#171416]/60 hover:text-[#4A1823] font-semibold underline"
                        >
                          &larr; Back to Brand
                        </button>
                        <button
                          type="button"
                          disabled={!formData.phone || !formData.email}
                          onClick={() => setCurrentStep(5)}
                          className="px-8 py-3.5 rounded-full bg-[#4A1823] hover:bg-[#171416] text-[#F5EFE5] text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          Review Application &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: REVIEW & FINAL CONFIRMATION */}
                  {currentStep === 5 && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="border-b border-[#B69A67]/20 pb-2">
                        <h4 className="font-serif text-xl text-[#171416] font-bold">Review Your Application Docket</h4>
                        <p className="text-[11px] text-[#171416]/60">Confirm all details before transmitting to the curation committee.</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#FAF4EB] border border-[#B69A67]/30 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div>
                            <span className="text-[10px] uppercase text-[#A85F4B] font-bold block">Event</span>
                            <span className="font-semibold text-sm">{selectedEvent.name}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#A85F4B] font-bold block">Stall Space</span>
                            <span className="font-bold text-sm text-[#4A1823]">Stall {selectedStall.id}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#A85F4B] font-bold block">Proposed Fee</span>
                            <span className="font-bold text-sm text-[#B69A67]">{selectedPackage.priceFormatted}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#A85F4B] font-bold block">Brand Name</span>
                            <span className="font-semibold text-sm">{formData.brandName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#A85F4B] font-bold block">Founder</span>
                            <span className="font-semibold text-sm">{formData.ownerName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#A85F4B] font-bold block">Phone</span>
                            <span className="font-semibold text-sm">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(4)}
                          className="text-xs text-[#171416]/60 hover:text-[#4A1823] font-semibold underline"
                        >
                          &larr; Edit Contact Info
                        </button>

                        <button
                          type="submit"
                          className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#B69A67] via-[#D8C8B5] to-[#B69A67] text-[#171416] text-xs font-bold tracking-[0.22em] uppercase shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>SUBMIT APPLICATION FOR ALLOTMENT</span>
                          <Send size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-center space-x-2 text-[11px] text-[#171416]/60 pt-2 font-sans">
                        <ShieldCheck size={14} className="text-[#B69A67] shrink-0" />
                        <span>Zero fee to apply. Commercial confirmation only upon curation approval.</span>
                      </div>
                    </div>
                  )}

                  {/* Quick starter trigger for Step 1 or 2 */}
                  {currentStep < 3 && (
                    <div className="text-center py-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-8 py-3.5 rounded-full bg-[#4A1823] text-[#F5EFE5] text-xs font-bold tracking-widest uppercase hover:bg-[#171416] transition-colors shadow-md cursor-pointer"
                      >
                        Enter Brand Information &rarr;
                      </button>
                    </div>
                  )}

                </form>

              </div>

            </div>
          </section>


          {/* =========================================================================
              13. MINIMAL FAQ SECTION
              ========================================================================= */}
          <section className="py-20 md:py-28 bg-[#F5EFE5] border-b border-[#B69A67]/20">
            <div className="max-w-4xl mx-auto px-6">
              
              <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
                <span className="text-[10px] tracking-[0.3em] font-sans text-[#A85F4B] uppercase font-bold">
                  EXHIBITOR QUERIES
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171416] font-normal tracking-tight">
                  FREQUENTLY ASKED QUESTIONS
                </h2>
              </div>

              <div className="space-y-3">
                {STALL_FAQS.map((faq, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-[#B69A67]/35 bg-white overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#171416] hover:text-[#4A1823] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-[#B69A67] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm font-sans text-[#171416]/75 font-light leading-relaxed border-t border-[#B69A67]/15 pt-3 animate-fadeIn">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </section>


          {/* =========================================================================
              14. TRUST STATEMENT
              ========================================================================= */}
          <section className="py-16 bg-[#FFFBF5] text-center border-b border-[#B69A67]/20">
            <div className="max-w-4xl mx-auto px-6 space-y-3">
              <span className="text-[10px] tracking-[0.3em] font-sans text-[#B69A67] uppercase font-bold block">
                BUILT FOR BRANDS. DESIGNED FOR CONNECTION.
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#4A1823] block">04</span>
                  <span className="text-[10px] tracking-widest text-[#171416]/60 font-sans uppercase">Completed Landmark Editions</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#4A1823] block">120+</span>
                  <span className="text-[10px] tracking-widest text-[#171416]/60 font-sans uppercase">Women Entrepreneurs</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#4A1823] block">18,000+</span>
                  <span className="text-[10px] tracking-widest text-[#171416]/60 font-sans uppercase">Verified Luxury Patrons</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#4A1823] block">5-Star</span>
                  <span className="text-[10px] tracking-widest text-[#171416]/60 font-sans uppercase">Tangerine Grand Pavilion</span>
                </div>
              </div>
            </div>
          </section>


          {/* =========================================================================
              15. FINAL CLOSING CTA
              ========================================================================= */}
          <section className="py-28 md:py-36 bg-[#171416] text-[#F5EFE5] text-center select-none relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#B69A67]/40 bg-white/5 text-[10px] font-sans tracking-[0.3em] text-[#B69A67] uppercase">
                <UdaanDiamond size={9} />
                <span>WHERE WOMEN BUILD BRANDS</span>
              </div>

              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#F5EFE5] leading-none uppercase">
                YOUR NEXT<br />
                <span className="italic font-light text-[#B69A67]">CHAPTER</span><br />
                STARTS HERE.
              </h2>

              <p className="font-serif italic text-base sm:text-xl text-[#F5EFE5]/80 max-w-md mx-auto">
                Your brand. Your space. Your moment.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => scrollToId('choose-space')}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#B69A67] via-[#D8C8B5] to-[#B69A67] text-[#171416] text-xs font-sans font-bold tracking-[0.22em] uppercase shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
                >
                  BOOK YOUR STALL →
                </button>

                <Link
                  to="/events"
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-[#F5EFE5] text-xs font-sans tracking-[0.22em] uppercase transition-all"
                >
                  EXPLORE EVENTS →
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

    </div>
  );
}
