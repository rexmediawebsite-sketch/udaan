import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import { HelpCircle, MessageSquare } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-6">
          <Link to="/" className="hover:text-[#B96535]">HOME</Link>
          <span>/</span>
          <span className="text-[#B96535] font-semibold">FAQS & POLICIES</span>
        </div>
      </div>

      <FAQSection />

      {/* Direct Contact Help Box */}
      <div className="max-w-4xl mx-auto px-6 mt-16 text-center p-8 rounded-3xl bg-white/95 border border-[#E9AD83]/30 shadow-md">
        <h3 className="font-serif text-2xl text-[#2A1C24]">
          Have a specific query not listed here?
        </h3>
        <p className="mt-2 text-xs text-[#5E4A55] font-sans max-w-md mx-auto">
          Our team is available 10 AM to 8 PM via WhatsApp or email for customized booth setups, power requirements, or corporate inquiries.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="btn-sunset-gold px-6 py-2.5 rounded-full text-[#2A1C24] text-xs font-semibold tracking-widest uppercase shadow-md"
          >
            Contact Desk
          </Link>
          <a
            href="https://wa.me/919123456789"
            target="_blank"
            rel="noreferrer"
            className="btn-sunset-ghost-light px-6 py-2.5 rounded-full border border-[#E9AD83]/50 text-xs tracking-widest uppercase text-[#B96535] hover:text-[#2A1C24]"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
