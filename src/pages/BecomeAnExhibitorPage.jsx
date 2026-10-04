import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES } from '../data/eventData';

export default function BecomeAnExhibitorPage() {
  const [formData, setFormData] = useState({
    founderName: '',
    brandName: '',
    category: 'Fashion & Apparels',
    city: '',
    phone: '',
    email: '',
    stallType: 'Standard Stalls (3m x 2.5m)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const workflowSteps = [
    { num: "01", title: "Application", desc: "Submit brand profile and product portfolio." },
    { num: "02", title: "Curation Approval", desc: "Category exclusivity and authenticity check within 24h." },
    { num: "03", title: "Stall Selection", desc: "Finalize stall number on Tangerine Grand floor plan." },
    { num: "04", title: "Payment", desc: "Secure online transfer or official bank receipt." },
    { num: "05", title: "Confirmation & Invoice", desc: "Official allotment letter, GST invoice, and fascia proof." },
    { num: "06", title: "Exhibitor Dashboard", desc: "Digital pass generator and pre-event marketing collateral." },
  ];

  const stallTiers = [
    {
      name: "Royal Pavilion",
      size: "4m x 3m (12 sq.m)",
      idealFor: "Couture, Bridal Pret & Fine Jewellery",
      placement: "Grand Centerpiece & Entrance Promenade",
      features: ["Premium prime visibility", "3 Dedicated spotlights", "Two 15A power sockets", "Fascia branding with logo", "2 Display tables & 4 chairs"]
    },
    {
      name: "Corner Prime",
      size: "3m x 3m (9 sq.m)",
      idealFor: "Silver jewellery, Footwear & Designer Sarees",
      placement: "Two-side open aisle intersections",
      features: ["Dual-side shopper footfall", "2 Focused spotlights", "One 5A/15A socket", "Branded name fascia", "1 Display table & 2 chairs"]
    },
    {
      name: "Standard Booth",
      size: "3m x 2.5m (7.5 sq.m)",
      idealFor: "Home decor, Skincare, Handmade art & Gourmet",
      placement: "Curated domain aisles",
      features: ["Full octanorm wall partitions", "2 Warm spotlights", "One 5A socket", "Standard fascia plate", "1 Display table & 2 chairs"]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.founderName || !formData.phone) return;

    const id = 'EXH-2026-' + Math.floor(1000 + Math.random() * 9000);
    setAppId(id);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F6B51F', '#E99A18', '#B96535', '#FFF1D9']
    });

    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase mb-4 shadow-sm">
            <Sparkles size={12} className="text-[#B96535]" />
            <span>FOUNDER APPLICATION JOURNEY</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl text-[#2A1C24] tracking-[0.02em] leading-tight">
            Become an <span className="italic font-light text-[#B96535]">Exhibitor</span>
          </h1>

          <p className="mt-4 text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed">
            Position your brand in front of Bihar's elite pre-Diwali shoppers at Lemon Tree Premier Patna. Follow our seamless onboarding workflow designed for women entrepreneurs.
          </p>
        </div>

        {/* The 6-Step Workflow Tracker */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              END-TO-END CURATION JOURNEY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2A1C24] mt-1">
              How Stall Allotment Works
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#FFFBF5] p-5 rounded-2xl border border-[#E9AD83]/30 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="font-syne font-bold text-xl text-[#B96535]">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-base text-[#2A1C24] font-medium mt-1">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#5E4A55] font-sans mt-3 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stall Specifications & Tiers */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              ARCHITECTURAL TIERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
              Stall Specifications & Amenities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stallTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
              >
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#B96535] font-semibold font-sans">
                    {tier.placement}
                  </span>
                  <h3 className="font-serif text-2xl text-[#2A1C24] mt-1">
                    {tier.name}
                  </h3>
                  <div className="font-syne font-bold text-lg text-[#B96535] mt-1">
                    {tier.size}
                  </div>
                  <p className="text-xs text-[#5E4A55] font-sans mt-2 italic">
                    Best for: {tier.idealFor}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#E9AD83]/20 space-y-2.5 text-xs font-sans text-[#2A1C24]">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle size={14} className="text-[#B96535] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E9AD83]/20">
                  <Link
                    to="/stalls"
                    className="btn-editorial-outline w-full py-2.5 rounded-full transition-all text-xs tracking-widest font-semibold uppercase flex items-center justify-center space-x-1"
                  >
                    <span>View on Floor Map</span>
                    <ArrowRight size={12} className="text-[#B96535]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Container */}
        <div id="apply-form" className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-lg">
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
              STEP 1: APPLICATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
              Apply for Stall Allotment
            </h2>
            <p className="text-xs text-[#5E4A55] font-sans mt-1">
              Zero upfront charges. Our team evaluates your brand within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#FFF1D9] border border-[#B96535]/30 text-center animate-fadeIn">
              <CheckCircle size={36} className="text-[#B96535] mx-auto mb-3" />
              <h3 className="font-serif text-2xl text-[#2A1C24]">Application Registered</h3>
              <p className="text-xs text-[#5E4A55] mt-2 font-sans">
                Reference ID: <strong className="text-[#B96535]">{appId}</strong>
              </p>
              <p className="text-xs text-[#5E4A55] mt-2 font-sans leading-relaxed">
                Thank you, {formData.founderName}. Our curation team has received your application for {formData.brandName}. We will reach out via WhatsApp at <strong className="text-[#2A1C24]">{formData.phone}</strong> with the allotment review.
              </p>
              <Link
                to="/stalls"
                className="btn-sunset-gold mt-6 inline-block px-7 py-2.5 rounded-full font-semibold text-xs tracking-widest uppercase shadow-md text-[#2A1C24]"
              >
                Inspect Tangerine Grand Map
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B5860] mb-1 text-[11px] tracking-wider uppercase font-semibold">Founder / Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shalini Agarwal"
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5860] mb-1 text-[11px] tracking-wider uppercase font-semibold">Brand / Studio Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shalini Pret"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B5860] mb-1 text-[11px] tracking-wider uppercase font-semibold">Product Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.title} className="bg-white text-[#2A1C24]">{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#6B5860] mb-1 text-[11px] tracking-wider uppercase font-semibold">Preferred Stall Tier</label>
                  <select
                    value={formData.stallType}
                    onChange={(e) => setFormData({ ...formData, stallType: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                  >
                    <option value="Royal Pavilion (4m x 3m)" className="bg-white text-[#2A1C24]">Royal Pavilion (4m x 3m)</option>
                    <option value="Corner Prime (3m x 3m)" className="bg-white text-[#2A1C24]">Corner Prime (3m x 3m)</option>
                    <option value="Standard Stalls (3m x 2.5m)" className="bg-white text-[#2A1C24]">Standard Stalls (3m x 2.5m)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6B5860] mb-1 text-[11px] tracking-wider uppercase font-semibold">WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                  />
                </div>

                <div>
                  <label className="block text-[#6B5860] mb-1 text-[11px] tracking-wider uppercase font-semibold">City / State</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patna, Varanasi, Ranchi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#6B5860] mb-1 text-[11px] tracking-wider uppercase font-semibold">Collection Overview & Display Needs</label>
                <textarea
                  rows={3}
                  placeholder="Share a short description of your collection, price range, or special display requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl p-3.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535] focus:ring-1 focus:ring-[#B96535]"
                />
              </div>

              <button
                type="submit"
                className="btn-sunset-gold w-full mt-2 py-3.5 rounded-full text-xs font-sans font-semibold tracking-[0.22em] uppercase shadow-md flex items-center justify-center space-x-2 text-[#2A1C24]"
              >
                <span>Submit Application for Curation Review</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
