import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/eventData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-gradient-to-b from-[#180E15] via-[#20121C] to-[#180E15] overflow-hidden border-t border-[#E9AD83]/15 text-[#FFF1D9]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#E99A18]/40 bg-[#251520] text-[11px] font-sans font-medium tracking-[0.25em] text-[#F6B51F] uppercase mb-4 shadow-sm">
            <HelpCircle size={12} className="text-[#F6B51F]" />
            <span>CLARITY & DETAILS</span>
          </div>

          <h2 className="font-serif font-normal text-4xl sm:text-5xl text-[#FFF1D9] tracking-[0.02em] leading-tight">
            Frequently Asked <span className="italic font-light text-[#F6B51F]">Questions</span>
          </h2>
          
          <p className="mt-4 text-[#E9AD83] text-sm font-sans font-light leading-relaxed max-w-lg mx-auto">
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
                    ? 'border-[#F6B51F] bg-[#2A1424] shadow-xl'
                    : 'border-[#E9AD83]/20 bg-[#24141F] hover:border-[#F6B51F]/60 shadow-md'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#FFF1D9] font-normal">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'border-[#F6B51F] text-[#F6B51F] bg-[#180E15]' : 'border-[#E9AD83]/30 text-[#E9AD83]'
                  }`}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#E9AD83]/85 font-sans font-light leading-relaxed border-t border-[#E9AD83]/15 pt-4">
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
