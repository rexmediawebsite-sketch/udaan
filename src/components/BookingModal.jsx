import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES } from '../data/eventData';

export default function BookingModal({ isOpen, onClose, preselectedStall, preselectedCategory }) {
  const [formData, setFormData] = useState({
    founderName: '',
    brandName: '',
    category: preselectedCategory || 'Fashion & Apparels',
    phone: '',
    city: '',
    stallId: preselectedStall ? preselectedStall.id : '',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [appId, setAppId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.founderName || !formData.phone) return;

    const generatedId = `UDN-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppId(generatedId);

    // Festive confetti in sunset tones
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F6B51F', '#E99A18', '#B96535', '#397EAC', '#FFF1D9']
    });

    setIsSuccess(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#FFFBF5] rounded-3xl overflow-hidden border border-[#E9AD83]/40 shadow-2xl my-8 p-6 sm:p-8 text-[#2A1C24]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF4EB] border border-[#E9AD83]/40 text-[#2A1C24] hover:text-[#B96535] hover:border-[#B96535] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#FFF1D9] border border-[#B96535] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle size={32} className="text-[#B96535]" />
            </div>

            <span className="text-[10px] tracking-[0.3em] font-sans text-[#B96535] uppercase font-semibold">
              STALL APPLICATION SUBMITTED
            </span>

            <h3 className="font-serif text-3xl text-[#2A1C24] mt-1 font-normal">
              Welcome to Udaan
            </h3>

            <div className="mt-4 p-4 rounded-2xl bg-[#FAF4EB] border border-[#E9AD83]/30 text-xs font-sans space-y-1.5 max-w-sm mx-auto text-left">
              <div className="flex justify-between">
                <span className="text-[#5E4A55]">Application ID:</span>
                <span className="font-mono text-[#B96535] font-bold">{appId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5E4A55]">Applicant:</span>
                <span className="text-[#2A1C24] font-medium">{formData.founderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5E4A55]">Brand:</span>
                <span className="text-[#2A1C24] font-medium">{formData.brandName || 'Independent Creator'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5E4A55]">Requested Stall:</span>
                <span className="text-[#B96535] font-semibold">{formData.stallId || 'Open Selection'}</span>
              </div>
            </div>

            <p className="mt-5 text-xs text-[#5E4A55] font-sans leading-relaxed max-w-sm mx-auto font-light">
              Our curation committee will contact you on <strong className="text-[#2A1C24]">{formData.phone}</strong> within 24 hours to confirm category exclusivity, verify portfolio images, and send the official reservation invoice.
            </p>

            <button
              onClick={onClose}
              className="mt-6 btn-sunset-gold px-8 py-3 rounded-full text-xs font-sans tracking-[0.22em] uppercase transition-colors text-[#1E121B]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#B96535]/30 bg-[#FFF1D9] text-[10px] tracking-[0.3em] font-sans text-[#B96535] uppercase mb-2">
              <Sparkles size={11} className="text-[#B96535]" />
              <span>GLAMOUR GALA • DIWALI EDITION 5</span>
            </div>

            <h3 className="font-serif text-3xl text-[#2A1C24] font-normal">
              Exhibitor Stall Application
            </h3>

            <p className="text-xs text-[#5E4A55] font-sans mt-1 font-light">
              Apply for curated stall allotment at Tangerine Grand, Lemon Tree Premier Patna (24–25 Oct 2026).
            </p>

            {preselectedStall && (
              <div className="mt-4 p-3 rounded-xl bg-[#FFF1D9] border border-[#E9AD83]/40 flex items-center justify-between text-xs font-sans">
                <span className="text-[#2A1C24]">
                  Selected: <strong className="text-[#B96535]">Stall {preselectedStall.id}</strong> ({preselectedStall.type})
                </span>
                <span className="text-[10px] tracking-wider text-[#B96535] uppercase font-semibold">
                  {preselectedStall.size}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Founder / Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-3.5 py-2 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                  />
                </div>

                <div>
                  <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Brand / Studio Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sen Artisans"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-3.5 py-2 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Product Domain</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-3.5 py-2 text-[#2A1C24] focus:outline-none focus:border-[#B96535]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-3.5 py-2 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Patna, Varanasi, Kolkata"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-3.5 py-2 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                  />
                </div>

                <div>
                  <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Preferred Stall (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. P-02, A-01, B-03"
                    value={formData.stallId}
                    onChange={(e) => setFormData({ ...formData, stallId: e.target.value })}
                    className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl px-3.5 py-2 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5E4A55] mb-1 text-[11px] tracking-wider uppercase font-semibold">Display Requirements (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Need mannequin space, extra spotlights, 15A power socket, or specific wall setup..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF4EB] border border-[#E9AD83]/40 rounded-xl p-3 text-[#2A1C24] placeholder-[#8C7E85] focus:outline-none focus:border-[#B96535]"
                />
              </div>

              <button
                type="submit"
                className="btn-sunset-gold w-full mt-3 py-3.5 rounded-full text-xs font-sans tracking-[0.22em] uppercase shadow-lg flex items-center justify-center space-x-2 text-[#1E121B]"
              >
                <span>Submit Application for Allotment</span>
                <Send size={13} />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#5E4A55] pt-1 font-sans">
                <ShieldCheck size={12} className="text-[#B96535]" />
                <span>Zero fee to apply. Commercial confirmation only upon curation approval.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
