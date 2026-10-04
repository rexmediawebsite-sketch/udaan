import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle, Sparkles, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FEATURED_EVENT } from '../data/eventData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Fashion & Apparels',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    confetti({
      particleCount: 60,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#E5A93C', '#FCE7B8', '#FAF5EB']
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#251917] overflow-hidden border-t border-[#E5A93C]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Venue & Official Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#1C110F]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase backdrop-blur-md">
              <Sparkles size={12} className="text-[#E5A93C]" />
              <span>OFFICIAL EVENT DESK</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#FAF6F0] leading-tight tracking-[0.05em] headline-shadow">
              Connect with <br />
              <span className="italic font-light text-[#E5A93C]">Udaan Organizers</span>
            </h2>

            <p className="text-[#C2B8B5] text-sm font-sans font-light leading-relaxed">
              Have questions regarding stall specifications, sponsorships, or brand curation? Reach out to our organizing committee directly.
            </p>

            <div className="p-6 rounded-2xl bg-[#1C110F] border border-white/10 space-y-4 text-xs font-sans">
              <div className="flex items-start space-x-3.5">
                <MapPin size={18} className="text-[#E5A93C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF6F0] text-sm">Exhibition Venue</h4>
                  <p className="text-[#C2B8B5] mt-0.5 leading-relaxed font-light">
                    Tangerine Grand, Ground Floor<br />
                    Lemon Tree Premier, Plot No. 876, Exhibition Road,<br />
                    Near Gandhi Maidan, Patna, Bihar 800001
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-start space-x-3.5">
                <MessageSquare size={18} className="text-[#E5A93C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF6F0] text-sm">WhatsApp Assistance</h4>
                  <p className="text-[#C2B8B5] mt-0.5 font-light">
                    Fast response for stall bookings & layout inquiries.
                  </p>
                  <a
                    href="https://wa.me/919123456789?text=Hello%20Udaan%20Team,%20I%20am%20interested%20in%20Glamour%20Gala%20Diwali%20Edition%205"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 mt-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-semibold text-[11px] tracking-wider uppercase hover:bg-[#25D366] hover:text-black transition-colors"
                  >
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#C2B8B5] font-sans">
              <span className="text-[#E5A93C] font-semibold block mb-0.5 uppercase tracking-wider">CURATION DESK TIMINGS</span>
              Monday to Sunday: 10:00 AM – 8:00 PM IST
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-[#1C110F] border border-[#E5A93C]/30 shadow-2xl relative overflow-hidden">
              <span className="text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans block mb-2">
                DIRECT INQUIRY & ALLOTMENT
              </span>

              <h3 className="font-serif font-normal text-3xl text-[#FAF6F0]">
                Submit an Exhibition Inquiry
              </h3>

              {submitted ? (
                <div className="mt-8 p-8 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/40 text-center animate-fadeIn">
                  <CheckCircle size={36} className="text-[#E5A93C] mx-auto mb-3" />
                  <h4 className="font-serif text-2xl text-[#F3D2A2]">Inquiry Received</h4>
                  <p className="text-sm text-[#C2B8B5] mt-2 font-sans max-w-md mx-auto">
                    Thank you, {formData.name}. Our curation team will review {formData.brand ? `for "${formData.brand}"` : ''} and connect with you on {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shalini Agarwal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#251917] border border-white/15 rounded-xl px-4 py-2.5 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Brand / Studio Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Shalini Jewels / Pret"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-[#251917] border border-white/15 rounded-xl px-4 py-2.5 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#251917] border border-white/15 rounded-xl px-4 py-2.5 text-[#FAF6F0] focus:outline-none focus:border-[#E5A93C]"
                      >
                        <option value="Fashion & Apparels">Fashion & Apparels</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Home Decor & Lifestyle">Home Decor & Lifestyle</option>
                        <option value="Beauty & Wellness">Beauty & Wellness</option>
                        <option value="Handmade & Gift Items">Handmade & Gift Items</option>
                        <option value="Food Products">Food Products</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">WhatsApp Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#251917] border border-white/15 rounded-xl px-4 py-2.5 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Message / Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your collection, required stall size, or specific inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#251917] border border-white/15 rounded-xl p-4 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#F3D2A2] transition-colors shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Send Inquiry to Curation Desk</span>
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
