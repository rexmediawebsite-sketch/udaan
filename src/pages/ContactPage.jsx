import React from 'react';
import { Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection';
import { MapPin, Navigation, Phone, Mail, Clock } from 'lucide-react';
import { FEATURED_EVENT } from '../data/eventData';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 bg-[#1b0607] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <div className="flex items-center space-x-2 text-xs font-sans text-white/50 mb-6">
          <Link to="/" className="hover:text-[#E5A93C]">HOME</Link>
          <span>/</span>
          <span className="text-[#E5A93C] font-semibold">CONTACT & VENUE</span>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
