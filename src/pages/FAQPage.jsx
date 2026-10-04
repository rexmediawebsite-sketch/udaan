import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import { Sparkles, HelpCircle, MessageSquare } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="pt-28 pb-24 bg-[#1b0607] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <div className="flex items-center space-x-2 text-xs font-sans text-white/50 mb-6">
          <Link to="/" className="hover:text-[#E5A93C]">HOME</Link>
          <span>/</span>
          <span className="text-[#E5A93C] font-semibold">FAQS & POLICIES</span>
        </div>
      </div>

      <FAQSection />

      {/* Direct Contact Help Box */}
      <div className="max-w-4xl mx-auto px-6 mt-16 text-center p-8 rounded-3xl bg-[#160E0A] border border-white/10">
        <h3 className="font-serif text-2xl text-[#FAF5EB]">
          Have a specific query not listed here?
        </h3>
        <p className="mt-2 text-xs text-[#F4ECE1]/70 font-sans max-w-md mx-auto">
          Our team is available 10 AM to 8 PM via WhatsApp or email for customized booth setups, power requirements, or corporate inquiries.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-[#E5A93C] text-[#0E0907] text-xs font-semibold tracking-widest uppercase hover:bg-[#FCE7B8] transition-colors"
          >
            Contact Desk
          </Link>
          <a
            href="https://wa.me/919123456789"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-full border border-white/20 text-xs tracking-widest uppercase text-white/80 hover:border-[#E5A93C] hover:text-[#E5A93C]"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
