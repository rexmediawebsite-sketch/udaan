import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/eventData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#1C110F] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E5A93C]/25 bg-[#251917]/70 text-[11px] font-sans font-medium tracking-[0.25em] text-[#F3D2A2] uppercase mb-4 backdrop-blur-md">
            <HelpCircle size={12} className="text-[#E5A93C]" />
            <span>CLARITY & DETAILS</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#FAF6F0] tracking-[0.05em] leading-tight headline-shadow">
            Frequently Asked <span className="italic font-light text-[#E5A93C]">Questions</span>
          </h2>
          
          <p className="mt-4 text-[#C2B8B5] text-sm font-sans font-light leading-relaxed max-w-lg mx-auto">
            Everything you need to know about participating as an exhibitor or attending as a visitor at Glamour Gala Diwali Edition 5.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#E5A93C]/50 bg-[#251917]'
                    : 'border-white/10 bg-[#251917]/50 hover:border-[#E5A93C]/30'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#FAF6F0] font-normal">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'border-[#E5A93C] text-[#E5A93C] bg-[#E5A93C]/10' : 'border-white/10 text-[#C2B8B5]/60'
                  }`}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#C2B8B5] font-sans font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
