import React from 'react';
import { Link } from 'react-router-dom';
import VisitorExperience from '../components/VisitorExperience';
import { Sparkles, Calendar, Clock, MapPin, Gift, Check, ShieldCheck } from 'lucide-react';
import { FEATURED_EVENT } from '../data/eventData';

export default function VisitorsPage() {
  const tips = [
    { title: "Festive Exclusive Previews", desc: "Arrive during the morning hours (11:00 AM – 1:00 PM) to explore bridal couture and fine polki before crowds peak." },
    { title: "Complimentary Valet Parking", desc: "Available directly at the main entrance porch of Lemon Tree Premier on Exhibition Road." },
    { title: "Payment Flexibility", desc: "Exhibitors accept UPI, credit cards, debit cards, and cash. Continuous on-site high-speed Wi-Fi provided." },
    { title: "Lucky Draw Hampers", desc: "Every visitor with a pre-registered digital pass is entered into hourly festive gift hamper giveaways." }
  ];

  return (
    <div className="pt-28 pb-24 bg-[#1b0607] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center space-x-2 text-xs font-sans text-white/50 mb-6">
          <Link to="/" className="hover:text-[#E5A93C]">HOME</Link>
          <span>/</span>
          <span className="text-[#E5A93C] font-semibold">FOR VISITORS</span>
        </div>
      </div>

      {/* Main Visitor RSVP Component */}
      <VisitorExperience />

      {/* Visitor Tips Section */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.25em] text-[#E5A93C] uppercase font-semibold font-sans">
            SHOPPING ESSENTIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF5EB] mt-1">
            Visitor Guidelines & Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#140D09] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] font-syne font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-lg text-[#FAF5EB] font-medium">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#F4ECE1]/70 font-sans mt-2 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
