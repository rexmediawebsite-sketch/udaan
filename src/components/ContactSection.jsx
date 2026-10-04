import React, { useState } from 'react';
import { MapPin, MessageSquare, Send, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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
      particleCount: 65,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F6B51F', '#E99A18', '#B96535', '#397EAC', '#FFF1D9']
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#20121C] to-[#180E15] overflow-hidden border-t border-[#E9AD83]/15 text-[#FFF1D9]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Venue & Official Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E99A18]/40 bg-[#251520] text-[11px] font-sans font-medium tracking-[0.25em] text-[#F6B51F] uppercase shadow-sm">
              <Sparkles size={12} className="text-[#F6B51F]" />
              <span>OFFICIAL EVENT DESK</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#FFF1D9] leading-tight tracking-[0.02em]">
              Connect with <br />
              <span className="italic font-light text-[#F6B51F]">Udaan Organizers</span>
            </h2>

            <p className="text-[#E9AD83] text-sm font-sans font-light leading-relaxed">
              Have questions regarding stall specifications, sponsorships, or brand curation? Reach out to our organizing committee directly.
            </p>

            <div className="p-6 rounded-2xl bg-[#24141F] border border-[#E9AD83]/20 space-y-4 text-xs font-sans shadow-lg">
              <div className="flex items-start space-x-3.5">
                <MapPin size={18} className="text-[#F6B51F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FFF1D9] text-sm">Exhibition Venue</h4>
                  <p className="text-[#E9AD83]/80 mt-0.5 leading-relaxed font-light">
                    Tangerine Grand, Ground Floor<br />
                    Lemon Tree Premier, Plot No. 876, Exhibition Road,<br />
                    Near Gandhi Maidan, Patna, Bihar 800001
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E9AD83]/15 flex items-start space-x-3.5">
                <MessageSquare size={18} className="text-[#74B6E2] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FFF1D9] text-sm">WhatsApp Assistance</h4>
                  <p className="text-[#E9AD83]/80 mt-0.5 font-light">
                    Fast response for stall bookings & layout inquiries.
                  </p>
                  <a
                    href="https://wa.me/919123456789?text=Hello%20Udaan%20Team,%20I%20am%20interested%20in%20Glamour%20Gala%20Diwali%20Edition%205"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 mt-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[#4EFA8F] font-semibold text-[11px] tracking-wider uppercase hover:bg-[#25D366] hover:text-black transition-colors"
                  >
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#24141F] border border-[#E9AD83]/15 text-[11px] text-[#E9AD83] font-sans">
              <span className="text-[#F6B51F] font-semibold block mb-0.5 uppercase tracking-wider">CURATION DESK TIMINGS</span>
              Monday to Sunday: 10:00 AM – 8:00 PM IST
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-[#24141F] border border-[#E9AD83]/30 shadow-2xl relative overflow-hidden">
              <span className="text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans block mb-2">
                DIRECT INQUIRY & ALLOTMENT
              </span>

              <h3 className="font-serif font-normal text-3xl text-[#FFF1D9]">
                Submit an Exhibition Inquiry
              </h3>

              {submitted ? (
                <div className="mt-8 p-8 rounded-2xl bg-[#1C1019] border border-[#E99A18]/40 text-center animate-fadeIn">
                  <CheckCircle size={36} className="text-[#F6B51F] mx-auto mb-3" />
                  <h4 className="font-serif text-2xl text-[#FFF1D9]">Inquiry Received</h4>
                  <p className="text-sm text-[#E9AD83] mt-2 font-sans max-w-md mx-auto">
                    Thank you, {formData.name}. Our curation team will review {formData.brand ? `for "${formData.brand}"` : ''} and connect with you on {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shalini Agarwal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl px-4 py-2.5 text-[#FFF1D9] placeholder-[#E9AD83]/40 focus:outline-none focus:border-[#F6B51F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">Brand / Studio Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Shalini Jewels / Pret"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl px-4 py-2.5 text-[#FFF1D9] placeholder-[#E9AD83]/40 focus:outline-none focus:border-[#F6B51F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl px-4 py-2.5 text-[#FFF1D9] focus:outline-none focus:border-[#F6B51F]"
                      >
                        <option value="Fashion & Apparels" className="bg-[#180E15] text-[#FFF1D9]">Fashion & Apparels</option>
                        <option value="Jewellery" className="bg-[#180E15] text-[#FFF1D9]">Jewellery</option>
                        <option value="Home Decor & Lifestyle" className="bg-[#180E15] text-[#FFF1D9]">Home Decor & Lifestyle</option>
                        <option value="Beauty & Wellness" className="bg-[#180E15] text-[#FFF1D9]">Beauty & Wellness</option>
                        <option value="Handmade & Gift Items" className="bg-[#180E15] text-[#FFF1D9]">Handmade & Gift Items</option>
                        <option value="Gourmet & Sweets" className="bg-[#180E15] text-[#FFF1D9]">Gourmet & Sweets</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">WhatsApp Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl px-4 py-2.5 text-[#FFF1D9] placeholder-[#E9AD83]/40 focus:outline-none focus:border-[#F6B51F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">Message / Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your collection, required stall size, or specific inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl p-4 text-[#FFF1D9] placeholder-[#E9AD83]/40 focus:outline-none focus:border-[#F6B51F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-sunset-gold w-full py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg flex items-center justify-center space-x-2"
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
