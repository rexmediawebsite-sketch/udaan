import React, { useState } from 'react';
import { Ticket, Clock, Car, Gift, Sparkles, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VisitorExperience() {
  const [passForm, setPassForm] = useState({ name: '', phone: '', guests: '2' });
  const [passSubmitted, setPassSubmitted] = useState(false);

  const handlePassSubmit = (e) => {
    e.preventDefault();
    if (!passForm.name || !passForm.phone) return;
    
    // Confetti effect with sunset cloud tones
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F6B51F', '#E99A18', '#B96535', '#397EAC', '#FFF1D9']
    });

    setPassSubmitted(true);
  };

  return (
    <section id="visitors" className="relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#20121C] to-[#180E15] overflow-hidden border-t border-[#E9AD83]/15 text-[#FFF1D9]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visitor Experience Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#397EAC]/40 bg-[#1D2B36] text-[11px] font-sans font-medium tracking-[0.25em] text-[#74B6E2] uppercase shadow-sm">
              <Sparkles size={12} className="text-[#74B6E2]" />
              <span>THE VISITOR EXPERIENCE</span>
            </div>

            <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#FFF1D9] leading-tight tracking-[0.02em]">
              An Immersive <br />
              <span className="italic font-light text-[#F6B51F]">Festive Soirée</span>
            </h2>

            <p className="text-[#E9AD83] text-sm font-sans font-light leading-relaxed">
              Step into Lemon Tree Premier this Diwali season for an extraordinary shopping experience. Explore one-of-a-kind heritage weaves, authentic polki jewellery, hand-poured festive candles, and gourmet delicacies curated under one grand roof.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-[#24141F] border border-[#E9AD83]/20">
                <div className="w-8 h-8 rounded-lg bg-[#1C1019] border border-[#E99A18]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={16} className="text-[#F6B51F]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#FFF1D9]">Complimentary Access & Timings</h4>
                  <p className="text-xs text-[#E9AD83]/80 font-light">11:00 AM to 9:00 PM on both Saturday 24th & Sunday 25th October 2026.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-[#24141F] border border-[#E9AD83]/20">
                <div className="w-8 h-8 rounded-lg bg-[#1D2B36] border border-[#397EAC]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Car size={16} className="text-[#74B6E2]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#FFF1D9]">Valet Parking & 5-Star Comfort</h4>
                  <p className="text-xs text-[#E9AD83]/80 font-light">Dedicated valet service at Lemon Tree Premier entrance for effortless arrival.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-[#24141F] border border-[#E9AD83]/20">
                <div className="w-8 h-8 rounded-lg bg-[#1C1019] border border-[#E99A18]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Gift size={16} className="text-[#F6B51F]" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#FFF1D9]">Diwali Lucky Draw Hampers</h4>
                  <p className="text-xs text-[#E9AD83]/80 font-light">Pre-registered guests are automatically entered into the hourly festive gift draw.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-register Visitor Pass Card */}
          <div className="lg:col-span-6">
            <div className="p-8 md:p-10 rounded-3xl bg-[#24141F] border border-[#E9AD83]/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#F6B51F] uppercase font-semibold font-sans mb-2">
                <Ticket size={13} />
                <span>COMPLIMENTARY VISITOR PASS</span>
              </div>

              <h3 className="font-serif font-normal text-3xl text-[#FFF1D9]">
                Instant Entry RSVP
              </h3>
              <p className="text-xs text-[#E9AD83] font-sans mt-1 font-light">
                Receive your digital VIP visitor pass via WhatsApp for quick-scan express entry.
              </p>

              {passSubmitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-[#1C1019] border border-[#E99A18]/40 text-center animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-[#E99A18]/20 border border-[#F6B51F] flex items-center justify-center mx-auto mb-3">
                    <Check size={24} className="text-[#F6B51F]" />
                  </div>
                  <h4 className="font-serif text-xl text-[#FFF1D9]">Pass Confirmed!</h4>
                  <p className="text-xs text-[#E9AD83] mt-1 font-sans">
                    Welcome, {passForm.name}. Your complimentary pass for {passForm.guests} guests has been confirmed for 24-25 Oct at Lemon Tree Premier.
                  </p>
                  <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-[#2A1525] border border-[#E9AD83]/50 text-[10px] tracking-widest text-[#F6B51F] uppercase font-mono font-semibold">
                    ENTRY CODE: UDN-GALA-2026
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePassSubmit} className="mt-6 space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyadarshini Roy"
                      value={passForm.name}
                      onChange={(e) => setPassForm({ ...passForm, name: e.target.value })}
                      className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl px-4 py-2.5 text-[#FFF1D9] placeholder-[#E9AD83]/40 focus:outline-none focus:border-[#F6B51F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">WhatsApp Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={passForm.phone}
                      onChange={(e) => setPassForm({ ...passForm, phone: e.target.value })}
                      className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl px-4 py-2.5 text-[#FFF1D9] placeholder-[#E9AD83]/40 focus:outline-none focus:border-[#F6B51F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#E9AD83] mb-1 text-[11px] tracking-wider uppercase font-medium">Number of Guests</label>
                    <select
                      value={passForm.guests}
                      onChange={(e) => setPassForm({ ...passForm, guests: e.target.value })}
                      className="w-full bg-[#180E15] border border-[#E9AD83]/30 rounded-xl px-4 py-2.5 text-[#FFF1D9] focus:outline-none focus:border-[#F6B51F]"
                    >
                      <option value="1" className="bg-[#180E15] text-[#FFF1D9]">1 Guest</option>
                      <option value="2" className="bg-[#180E15] text-[#FFF1D9]">2 Guests (Couple / Family)</option>
                      <option value="3" className="bg-[#180E15] text-[#FFF1D9]">3 Guests</option>
                      <option value="4+" className="bg-[#180E15] text-[#FFF1D9]">4+ Guests (Festive Shopping Group)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-sunset-gold w-full mt-2 py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Claim Free Visitor Pass</span>
                    <Send size={12} />
                  </button>

                  <p className="text-[10px] text-[#E9AD83]/60 text-center pt-1 font-sans">
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
