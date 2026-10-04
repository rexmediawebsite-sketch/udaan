import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Sparkles, Send, ShieldCheck, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES, FEATURED_EVENT } from '../data/eventData';

export default function BookingModal({ isOpen, onClose, preselectedStall, preselectedCategory }) {
  const [formData, setFormData] = useState({
    founderName: '',
    brandName: '',
    category: preselectedCategory || 'Fashion & Apparels',
    city: 'Patna',
    phone: '',
    email: '',
    stallId: preselectedStall ? preselectedStall.id : 'P-02',
    notes: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [appId, setAppId] = useState('');

  useEffect(() => {
    if (preselectedStall) {
      setFormData(prev => ({
        ...prev,
        stallId: preselectedStall.id,
        category: preselectedStall.category !== 'Open Category' ? preselectedStall.category : prev.category
      }));
    }
    if (preselectedCategory) {
      setFormData(prev => ({ ...prev, category: preselectedCategory }));
    }
  }, [preselectedStall, preselectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.founderName || !formData.phone) return;

    const randomId = 'UDN-GG5-' + Math.floor(1000 + Math.random() * 9000);
    setAppId(randomId);

    // Celebratory Confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E5A93C', '#FCE7B8', '#FAF5EB', '#D47A22']
    });

    setIsSuccess(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#1C110F] rounded-3xl overflow-hidden border border-[#E5A93C]/40 shadow-2xl my-8 p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#160B0A]/60 border border-white/20 text-[#FAF6F0] hover:text-[#E5A93C] hover:border-[#E5A93C] flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C] flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#E5A93C]" />
            </div>

            <span className="text-[10px] tracking-[0.3em] font-sans text-[#E5A93C] uppercase font-semibold">
              STALL APPLICATION SUBMITTED
            </span>

            <h3 className="font-serif text-3xl text-[#FAF6F0] mt-1 font-normal">
              Welcome to Udaan
            </h3>

            <div className="mt-4 p-4 rounded-2xl bg-[#160B0A]/70 border border-white/10 text-xs font-sans space-y-1.5 max-w-sm mx-auto text-left">
              <div className="flex justify-between">
                <span className="text-[#C2B8B5]/60">Application ID:</span>
                <span className="font-mono text-[#F3D2A2] font-bold">{appId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C2B8B5]/60">Applicant:</span>
                <span className="text-[#FAF6F0] font-medium">{formData.founderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C2B8B5]/60">Brand:</span>
                <span className="text-[#FAF6F0] font-medium">{formData.brandName || 'Independent Creator'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C2B8B5]/60">Requested Stall:</span>
                <span className="text-[#E5A93C] font-semibold">{formData.stallId}</span>
              </div>
            </div>

            <p className="mt-5 text-xs text-[#C2B8B5] font-sans leading-relaxed max-w-sm mx-auto font-light">
              Our curation committee will contact you on <strong>{formData.phone}</strong> within 24 hours to confirm category exclusivity, verify portfolio images, and send the official reservation invoice.
            </p>

            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#F3D2A2] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#E5A93C]/30 bg-[#251917] text-[10px] tracking-[0.3em] font-sans text-[#F3D2A2] uppercase mb-2">
              <Sparkles size={11} className="text-[#E5A93C]" />
              <span>GLAMOUR GALA • DIWALI EDITION 5</span>
            </div>

            <h3 className="font-serif text-3xl text-[#FAF6F0] font-normal">
              Exhibitor Stall Application
            </h3>

            <p className="text-xs text-[#C2B8B5] font-sans mt-1 font-light">
              Apply for curated stall allotment at Tangerine Grand, Lemon Tree Premier Patna (24–25 Oct 2026).
            </p>

            {preselectedStall && (
              <div className="mt-4 p-3 rounded-xl bg-[#251917] border border-[#E5A93C]/30 flex items-center justify-between text-xs font-sans">
                <span className="text-[#F3D2A2]">
                  Selected: <strong>Stall {preselectedStall.id}</strong> ({preselectedStall.type})
                </span>
                <span className="text-[10px] tracking-wider text-[#E5A93C] uppercase font-semibold">
                  {preselectedStall.size}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Founder / Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    className="w-full bg-[#251917] border border-white/15 rounded-xl px-3.5 py-2 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Brand / Studio Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sen Artisans"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full bg-[#251917] border border-white/15 rounded-xl px-3.5 py-2 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Product Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#251917] border border-white/15 rounded-xl px-3.5 py-2 text-[#FAF6F0] focus:outline-none focus:border-[#E5A93C]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#251917] border border-white/15 rounded-xl px-3.5 py-2 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Patna, Varanasi, Kolkata"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#251917] border border-white/15 rounded-xl px-3.5 py-2 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>

                <div>
                  <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Preferred Stall Number</label>
                  <input
                    type="text"
                    placeholder="e.g. P-02, A-01, B-03"
                    value={formData.stallId}
                    onChange={(e) => setFormData({ ...formData, stallId: e.target.value })}
                    className="w-full bg-[#251917] border border-white/15 rounded-xl px-3.5 py-2 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C2B8B5] mb-1 text-[11px] tracking-wider uppercase">Special Display Needs (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Need mannequin space, extra spotlights, 15A power plug, or specific wall setup..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#251917] border border-white/15 rounded-xl p-3 text-[#FAF6F0] placeholder-white/30 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3.5 rounded-full bg-[#E5A93C] text-[#160B0A] font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#F3D2A2] transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Submit Application for Allotment</span>
                <Send size={13} />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#C2B8B5]/60 pt-1 font-sans">
                <ShieldCheck size={12} className="text-[#E5A93C]" />
                <span>Zero fee to apply. Payment only upon approval & confirmation.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
