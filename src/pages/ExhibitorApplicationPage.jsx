import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Send, 
  ShieldCheck, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Phone, 
  MessageCircle, 
  Layers, 
  ArrowLeft,
  Info,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UdaanDiamond, UdaanEmblem } from '../components/UdaanIcons';
import { STALLS_DATA, CATEGORIES, FEATURED_EVENT } from '../data/eventData';

export default function ExhibitorApplicationPage() {
  const [searchParams] = useSearchParams();
  const stallParam = searchParams.get('stall') || 'P-02';
  const typeParam = searchParams.get('type');
  const categoryParam = searchParams.get('category') || 'Shopping';

  // Find stall info or fallback to P-02
  const initialStall = STALLS_DATA.find(s => s.id.toLowerCase() === stallParam.toLowerCase()) || {
    id: stallParam.toUpperCase(),
    type: typeParam || 'Royal Pavilion',
    size: '4m x 3m',
    status: 'AVAILABLE'
  };

  const [selectedStall, setSelectedStall] = useState(initialStall);
  const [showStallPicker, setShowStallPicker] = useState(false);

  const [formData, setFormData] = useState({
    founderName: '',
    brandName: '',
    category: categoryParam,
    phone: '',
    city: '',
    stallId: initialStall.id,
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [appId, setAppId] = useState('');

  // Synchronize when search params change
  useEffect(() => {
    if (stallParam) {
      const found = STALLS_DATA.find(s => s.id.toLowerCase() === stallParam.toLowerCase());
      if (found) {
        setSelectedStall(found);
        setFormData(prev => ({ ...prev, stallId: found.id }));
      }
    }
  }, [stallParam]);

  const handleSelectStallFromPicker = (stall) => {
    setSelectedStall(stall);
    setFormData(prev => ({ ...prev, stallId: stall.id }));
    setShowStallPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.founderName.trim() || !formData.phone.trim()) return;

    const generatedId = `UDN-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppId(generatedId);

    // Launch celebratory luxury sunset confetti
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#D9A441', '#B8801F', '#B85C38', '#4A1620', '#FFFAF2']
    });

    setIsSuccess(true);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="pt-28 pb-24 bg-[#FBF4EA] min-h-screen text-[#2B1B17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] font-sans text-[#2B1B17]/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#B8801F] transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-[#B8801F] transition-colors">EVENTS</Link>
          <span>/</span>
          <Link to="/events/glamour-gala-5" className="hover:text-[#B8801F] transition-colors">GLAMOUR GALA 5</Link>
          <span>/</span>
          <span className="text-[#B85C38] font-bold uppercase tracking-wider">EXHIBITOR STALL APPLICATION</span>
        </nav>

        {/* Success View */}
        {isSuccess ? (
          <div className="max-w-2xl mx-auto bg-[#FFFBF5] rounded-3xl p-8 sm:p-12 border border-[#D9A441]/40 shadow-2xl text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-[#FFF1D9] border-2 border-[#D9A441] flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(217,164,65,0.35)]">
              <CheckCircle size={40} className="text-[#B85C38]" />
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D9A441]/40 bg-[#FFF1D9] text-[10px] tracking-[0.25em] font-sans text-[#B85C38] uppercase font-semibold mb-2">
              <UdaanDiamond size={9} className="text-[#D9A441]" />
              <span>STALL APPLICATION SUBMITTED</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#2B1B17] font-normal">
              Welcome to Udaan
            </h1>

            <p className="text-sm text-[#2B1B17]/75 font-sans mt-2 font-light max-w-md mx-auto">
              Your application for <strong className="text-[#2B1B17] font-medium">{FEATURED_EVENT.name} • {FEATURED_EVENT.edition}</strong> has been registered with priority curation status.
            </p>

            {/* Application Summary Receipt Card */}
            <div className="mt-8 p-6 rounded-2xl bg-[#FFF8EE] border border-[#D9A441]/30 text-xs font-sans space-y-3 max-w-md mx-auto text-left shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-[#D9A441]/20">
                <span className="text-[#2B1B17]/60">Application Reference ID:</span>
                <span className="font-mono text-[#B85C38] font-bold text-sm bg-[#FFF1D9] px-2.5 py-0.5 rounded border border-[#D9A441]/40">{appId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2B1B17]/60">Founder / Applicant:</span>
                <span className="text-[#2B1B17] font-semibold">{formData.founderName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2B1B17]/60">Brand / Studio:</span>
                <span className="text-[#2B1B17] font-semibold">{formData.brandName || 'Independent Creator'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2B1B17]/60">Product Domain:</span>
                <span className="text-[#2B1B17] font-medium">{formData.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#2B1B17]/60">Requested Stall:</span>
                <span className="text-[#B85C38] font-bold">{formData.stallId || 'Open Selection'} ({selectedStall.type})</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#D9A441]/20">
                <span className="text-[#2B1B17]/60">Venue & Date:</span>
                <span className="text-[#4A1620] font-medium">Lemon Tree Premier Patna • 24-25 Oct 2026</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-[#2B1B17]/70 font-sans leading-relaxed max-w-md mx-auto font-light">
              Our curation committee will contact you on <strong className="text-[#2B1B17]">{formData.phone}</strong> via WhatsApp within 24 hours to review your lookbook, confirm category exclusivity, and deliver your official reservation docket.
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href={`https://wa.me/918578009900?text=Hi%20Udaan%20Concierge,%20I%20have%20submitted%20my%20Exhibitor%20Application%20${appId}%20for%20${encodeURIComponent(formData.brandName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle size={15} />
                <span>Connect via WhatsApp</span>
              </a>

              <Link
                to="/stalls"
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D9A441]/60 bg-white hover:bg-[#FFF8EE] text-[#4A1620] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Layers size={14} className="text-[#B8801F]" />
                <span>Explore Floor Map</span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-[#D9A441]/20">
              <Link to="/" className="text-xs text-[#B85C38] hover:text-[#B8801F] font-semibold underline">
                &larr; Return to Udaan Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Main Application Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 4 Cols: Curated Curation & Venue Perks */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFBF5] border border-[#D9A441]/30 shadow-md space-y-5">
                <div className="flex items-center gap-2.5 text-[#B85C38]">
                  <UdaanEmblem size={22} className="text-[#D9A441]" />
                  <span className="font-serif font-bold text-lg text-[#2B1B17]">Tangerine Grand</span>
                </div>

                <div className="space-y-3 text-xs font-sans text-[#2B1B17]/80">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-[#B85C38] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#2B1B17]">24 & 25 October 2026</span>
                      <span className="text-[#2B1B17]/60">Peak pre-Diwali & wedding shopping weekend</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#B85C38] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#2B1B17]">11:00 AM – 9:00 PM IST</span>
                      <span className="text-[#2B1B17]/60">Two full days of peak festive footfall</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#B85C38] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#2B1B17]">Lemon Tree Premier, Patna</span>
                      <span className="text-[#2B1B17]/60">5-Star Exhibition Road landmark pavilion</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D9A441]/25">
                  <h4 className="text-[11px] font-sans font-bold tracking-widest text-[#4A1620] uppercase mb-2.5">
                    What Every Allotment Includes
                  </h4>
                  <ul className="space-y-2 text-xs font-sans text-[#2B1B17]/80">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#B8801F] shrink-0" />
                      <span>100% Air-Conditioned 5-Star Hall</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#B8801F] shrink-0" />
                      <span>Custom Octanorm Fascia with Brand Name</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#B8801F] shrink-0" />
                      <span>Dedicated Spotlights & Power Connections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#B8801F] shrink-0" />
                      <span>Digital Directory Listing & Social Shoutouts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-[#B8801F] shrink-0" />
                      <span>Direct Access to 5,000+ HNIs & Buyers</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    to="/stalls"
                    className="w-full py-3 rounded-full border border-[#D9A441]/50 bg-[#FFF8EE] hover:bg-[#FFF1D9] text-[#4A1620] text-xs font-sans font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xs"
                  >
                    <Layers size={14} className="text-[#B8801F]" />
                    <span>View Interactive Floor Plan &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Founder Concierge Contact Card */}
              <div className="p-5 rounded-2xl bg-[#4A1620] text-[#FFFAF2] shadow-md border border-[#D9A441]/30">
                <span className="text-[10px] tracking-[0.2em] font-sans text-[#D9A441] uppercase font-bold block mb-1">
                  EXHIBITOR CURATION DESK
                </span>
                <p className="text-xs text-[#FFFAF2]/85 font-sans leading-relaxed">
                  Have specific pavilion requirements or custom booth design queries?
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs font-sans font-medium text-[#D9A441]">
                  <Phone size={14} />
                  <span>+91 85780 09900 / concierge@udaanbihar.in</span>
                </div>
              </div>
            </div>

            {/* Right 8 Cols: The Exhibitor Stall Application Card (Exact Replica of Screenshot) */}
            <div className="lg:col-span-8">
              <div className="relative w-full bg-[#FFFBF5] rounded-3xl overflow-hidden border border-[#E9AD83]/40 shadow-2xl p-6 sm:p-10 text-[#2A1C24]">
                
                {/* Header Tag */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[10px] tracking-[0.3em] font-sans text-[#B96535] uppercase mb-3 shadow-xs">
                  <UdaanDiamond size={10} className="text-[#B96535]" />
                  <span>GLAMOUR GALA • DIWALI EDITION 5</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.65rem] text-[#2A1C24] font-normal tracking-tight">
                  Exhibitor Stall Application
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#5E4A55] font-sans mt-1.5 font-light leading-relaxed">
                  Apply for curated stall allotment at Tangerine Grand, Lemon Tree Premier Patna (24–25 Oct 2026).
                </p>

                {/* Selected Stall Banner (Matching User's Screenshot) */}
                <div className="mt-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF1D9] border border-[#E9AD83]/50 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-sans shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#2A1C24]">
                      Selected: <strong className="text-[#B96535] font-bold">Stall {selectedStall.id}</strong> ({selectedStall.type})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] sm:text-xs tracking-wider text-[#B96535] uppercase font-bold">
                      {selectedStall.size?.toUpperCase() || '4M X 3M'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowStallPicker(!showStallPicker)}
                      className="text-[10px] text-[#4A1620] hover:text-[#B8801F] underline font-bold uppercase transition-colors ml-1"
                    >
                      {showStallPicker ? 'Hide Stalls' : 'Change Stall'}
                    </button>
                  </div>
                </div>

                {/* Optional Interactive Stall Quick Selector Drawer */}
                {showStallPicker && (
                  <div className="mt-3 p-4 rounded-xl bg-[#FAF4EB] border border-[#E9AD83]/40 animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-sans font-bold text-[#4A1620] uppercase tracking-wider">
                        Pick an Available Stall from Tangerine Grand:
                      </span>
                      <Link to="/stalls" className="text-[10px] text-[#B85C38] hover:underline font-semibold">
                        Open Full Interactive Map &rarr;
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
                      {STALLS_DATA.map((stall) => (
                        <button
                          key={stall.id}
                          type="button"
                          disabled={stall.status === 'BOOKED'}
                          onClick={() => handleSelectStallFromPicker(stall)}
                          className={`p-2 rounded-lg text-left text-xs transition-all border ${
                            selectedStall.id === stall.id
                              ? 'bg-[#B96535] text-white border-[#B96535] font-bold shadow-xs'
                              : stall.status === 'AVAILABLE'
                              ? 'bg-white hover:bg-[#FFF1D9] text-[#2A1C24] border-[#E9AD83]/40'
                              : 'bg-black/5 text-black/30 border-transparent cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="font-mono font-bold">{stall.id}</div>
                          <div className="text-[9px] truncate">{stall.type.replace('Standard Stalls', 'Standard')}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form matching user's layout and fields */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-sans text-xs">
                  {/* Row 1: Founder Name & Brand Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5E4A55] mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                        FOUNDER / CONTACT NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ananya Sen"
                        value={formData.founderName}
                        onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5E4A55] mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                        BRAND / STUDIO NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sen Artisans"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Product Domain & WhatsApp Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5E4A55] mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                        PRODUCT DOMAIN
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                      >
                        <option value="Shopping">Shopping</option>
                        <option value="Fashion & Apparels">Fashion & Apparels</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Home & Living">Home & Living</option>
                        <option value="Artisan Handicrafts">Artisan Handicrafts</option>
                        <option value="Gourmet & Confectionery">Gourmet & Confectionery</option>
                        <option value="Beauty & Wellness">Beauty & Wellness</option>
                        <option value="Footwear & Accessories">Footwear & Accessories</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#5E4A55] mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                        WHATSAPP PHONE
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                      />
                    </div>
                  </div>

                  {/* Row 3: City / Location & Preferred Stall */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5E4A55] mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                        CITY / LOCATION
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Patna, Varanasi, Kolkata"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5E4A55] mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                        PREFERRED STALL (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. P-02, A-01, B-03"
                        value={formData.stallId}
                        onChange={(e) => setFormData({ ...formData, stallId: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Display Requirements */}
                  <div>
                    <label className="block text-[#5E4A55] mb-1.5 text-[11px] tracking-wider uppercase font-semibold">
                      DISPLAY REQUIREMENTS (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Need mannequin space, extra spotlights, 15A power socket, or specific wall setup..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl p-3.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                    />
                  </div>

                  {/* Submit Button (Matching User's Golden Button with Send Arrow) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full text-xs font-sans font-bold tracking-[0.22em] uppercase shadow-[0_8px_25px_rgba(184,128,31,0.35)] flex items-center justify-center space-x-2 bg-gradient-to-r from-[#D9A441] via-[#E2B755] to-[#B8801F] text-[#2B1B17] hover:scale-[1.01] hover:shadow-[0_12px_32px_rgba(184,128,31,0.5)] transition-all cursor-pointer"
                    >
                      <span>SUBMIT APPLICATION FOR ALLOTMENT</span>
                      <Send size={14} className="stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Trust Footer Note with Shield Check */}
                  <div className="flex items-center justify-center space-x-2 text-[11px] text-[#5E4A55] pt-2 font-sans">
                    <ShieldCheck size={14} className="text-[#B8801F] shrink-0" />
                    <span>Zero fee to apply. Commercial confirmation only upon curation approval.</span>
                  </div>
                </form>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
