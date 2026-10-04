import React, { useState } from 'react';
import { Ticket, Clock, Car, Gift, Sparkles, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VisitorExperience() {
  const [passForm, setPassForm] = useState({ name: '', phone: '', guests: '2' });
  const [passSubmitted, setPassSubmitted] = useState(false);

  const handlePassSubmit = (e) => {
    e.preventDefault();
    if (!passForm.name || !passForm.phone) return;
    
    // Confetti effect
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E5A93C', '#FCE7B8', '#FAF5EB']
    });

    setPassSubmitted(true);
  };

  return (
    <section id="visitors" className="relative py-24 md:py-32 bg-[#1C110F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visitor Experience Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#251917]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase backdrop-blur-md">
              <Sparkles size={12} className="text-[#E5A93C]" />
              <span>THE VISITOR EXPERIENCE</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#FAF6F0] leading-tight tracking-[0.05em] headline-shadow">
              An Immersive <br />
              <span className="italic font-light text-[#E5A93C]">Festive Soirée</span>
            </h2>

            <p className="text-[#C2B8B5] text-sm font-sans font-light leading-relaxed">
              Step into Lemon Tree Premier this Diwali season for an extraordinary shopping experience. Explore one-of-a-kind heritage weaves, authentic polki jewellery, hand-poured festive candles, and gourmet delicacies curated under one grand roof.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} className="text-[#E5A93C]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#FAF6F0]">Complimentary Access & Timings</h4>
                  <p className="text-xs text-[#C2B8B5] font-light">11:00 AM to 9:00 PM on both Saturday 24th & Sunday 25th October 2026.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Car size={16} className="text-[#E5A93C]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#FAF6F0]">Valet Parking & 5-Star Comfort</h4>
                  <p className="text-xs text-[#C2B8B5] font-light">Dedicated valet service at Lemon Tree Premier entrance for effortless arrival.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Gift size={16} className="text-[#E5A93C]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#FAF6F0]">Diwali Lucky Draw Hampers</h4>
                  <p className="text-xs text-[#C2B8B5] font-light">Pre-registered guests are automatically entered into the hourly festive gift draw.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-register Visitor Pass Card */}
          <div className="lg:col-span-6">
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#251917] via-[#1C110F] to-[#160B0A] border border-[#E5A93C]/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5A93C]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans mb-2">
                <Ticket size={13} />
                <span>COMPLIMENTARY VISITOR PASS</span>
              </div>

              <h3 className="font-serif font-normal text-3xl text-[#FAF6F0]">
                Instant Entry RSVP
              </h3>
              <p className="text-xs text-[#C2B8B5] font-sans mt-1 font-light">
                Receive your digital VIP visitor pass via WhatsApp for quick-scan express entry.
              </p>

              {passSubmitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C]/40 text-center animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C] flex items-center justify-center mx-auto mb-3">
                    <Check size={24} className="text-[#E5A93C]" />
                  </div>
                  <h4 className="font-serif text-xl text-[#F3D2A2]">Pass Confirmed!</h4>
                  <p className="text-xs text-[#C2B8B5] mt-1 font-sans">
                    Welcome, {passForm.name}. Your complimentary pass for {passForm.guests} guests has been confirmed for 24-25 Oct at Lemon Tree Premier.
                  </p>
                  <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-[#160B0A]/60 border border-[#E5A93C]/30 text-[10px] tracking-widest text-[#E5A93C] uppercase font-mono">
                    ENTRY CODE: UDN-GALA-2026
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePassSubmit} className="mt-6 space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyadarshini Roy"
                      value={passForm.name}
                      onChange={(e) => setPassForm({ ...passForm, name: e.target.value })}
                      className="w-full bg-[#1C110F] border border-white/15 rounded-xl px-4 py-2.5 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">WhatsApp Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={passForm.phone}
                      onChange={(e) => setPassForm({ ...passForm, phone: e.target.value })}
                      className="w-full bg-[#1C110F] border border-white/15 rounded-xl px-4 py-2.5 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Number of Guests</label>
                    <select
                      value={passForm.guests}
                      onChange={(e) => setPassForm({ ...passForm, guests: e.target.value })}
                      className="w-full bg-[#1C110F] border border-white/15 rounded-xl px-4 py-2.5 text-[#FAF6F0] focus:outline-none focus:border-[#E5A93C]"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests (Couple / Family)</option>
                      <option value="3">3 Guests</option>
                      <option value="4+">4+ Guests (Festive Shopping Group)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#F3D2A2] transition-colors shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Claim Free Visitor Pass</span>
                    <Send size={12} />
                  </button>

                  <p className="text-[10px] text-[#C2B8B5]/60 text-center pt-1 font-sans">
                    Zero spam. Only your digital QR entry pass and event updates.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
