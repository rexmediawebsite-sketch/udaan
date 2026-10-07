import React, { useState } from 'react';
import { MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { UdaanDiamond } from './UdaanIcons';
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
    <section id="contact" className="relative py-24 md:py-32 bg-[#FAF4EB] text-[#2A1C24] overflow-hidden border-t border-[#E9AD83]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Venue & Official Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B96535] uppercase shadow-sm">
              <UdaanDiamond size={11} className="text-[#B96535]" />
              <span>OFFICIAL EVENT DESK</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#2A1C24] leading-tight tracking-[0.02em]">
              Connect with <br />
              <span className="italic font-light text-[#B96535]">Udaan Organizers</span>
            </h2>

            <p className="text-[#5E4A55] text-sm sm:text-base font-sans font-light leading-relaxed">
              Have questions regarding stall specifications, sponsorships, or brand curation? Reach out to our organizing committee directly.
            </p>

            <div className="p-6 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 space-y-4 text-xs font-sans shadow-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin size={18} className="text-[#B96535] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#2A1C24] text-sm">Exhibition Venue</h4>
                  <p className="text-[#5E4A55] mt-0.5 leading-relaxed font-light">
                    Tangerine Grand, Ground Floor<br />
                    Lemon Tree Premier, Plot No. 876, Exhibition Road,<br />
                    Near Gandhi Maidan, Patna, Bihar 800001
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E9AD83]/20 flex items-start space-x-3.5">
                <MessageSquare size={18} className="text-[#397EAC] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#2A1C24] text-sm">WhatsApp Assistance</h4>
                  <p className="text-[#5E4A55] mt-0.5 font-light">
                    Fast response for stall bookings & layout inquiries.
                  </p>
                  <a
                    href="https://wa.me/918578009900?text=Hello%20Udaan%20Team,%20I%20am%20interested%20in%20Glamour%20Gala%20Diwali%20Edition%205"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 mt-2.5 px-4 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#128C7E] font-semibold text-[11px] tracking-wider uppercase hover:bg-[#25D366] hover:text-white transition-colors"
                  >
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFBF5] border border-[#E9AD83]/30 text-[11px] text-[#5E4A55] font-sans">
              <span className="text-[#B96535] font-semibold block mb-0.5 uppercase tracking-wider">CURATION DESK TIMINGS</span>
              Monday to Sunday: 10:00 AM – 8:00 PM IST
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/40 shadow-md relative overflow-hidden">
              <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans block mb-2">
                DIRECT INQUIRY & ALLOTMENT
              </span>

              <h3 className="font-serif font-normal text-3xl text-[#2A1C24]">
                Submit an Exhibition Inquiry
              </h3>

              {submitted ? (
                <div className="mt-8 p-8 rounded-2xl bg-[#FFF1D9] border border-[#E99A18]/40 text-center animate-fadeIn">
                  <CheckCircle size={36} className="text-[#B96535] mx-auto mb-3" />
                  <h4 className="font-serif text-2xl text-[#2A1C24]">Inquiry Received</h4>
                  <p className="text-sm text-[#5E4A55] mt-2 font-sans max-w-md mx-auto">
                    Thank you, {formData.name}. Our curation team will review {formData.brand ? `for "${formData.brand}"` : ''} and connect with you on {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shalini Agarwal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Brand / Studio Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Shalini Jewels / Pret"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] focus:outline-none focus:border-[#B96535]"
                      >
                        <option value="Fashion & Apparels">Fashion & Apparels</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Home Decor & Lifestyle">Home Decor & Lifestyle</option>
                        <option value="Beauty & Wellness">Beauty & Wellness</option>
                        <option value="Handmade & Gift Items">Handmade & Gift Items</option>
                        <option value="Gourmet & Sweets">Gourmet & Sweets</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">WhatsApp Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-4 py-2.5 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Message / Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your collection, required stall size, or specific inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl p-4 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-sunset-gold w-full py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg flex items-center justify-center space-x-2 text-[#1E121B]"
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
