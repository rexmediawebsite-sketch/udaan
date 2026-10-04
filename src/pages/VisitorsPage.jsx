import React from 'react';
import { Link } from 'react-router-dom';
import VisitorExperience from '../components/VisitorExperience';

export default function VisitorsPage() {
  const tips = [
    { title: "Festive Exclusive Previews", desc: "Arrive during the morning hours (11:00 AM – 1:00 PM) to explore bridal couture and fine polki before crowds peak." },
    { title: "Complimentary Valet Parking", desc: "Available directly at the main entrance porch of Lemon Tree Premier on Exhibition Road." },
    { title: "Payment Flexibility", desc: "Exhibitors accept UPI, credit cards, debit cards, and cash. Continuous on-site high-speed Wi-Fi provided." },
    { title: "Lucky Draw Hampers", desc: "Every visitor with a pre-registered digital pass is entered into hourly festive gift hamper giveaways." }
  ];

  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-6">
          <Link to="/" className="hover:text-[#B96535]">HOME</Link>
          <span className="text-[#6B5860]/40">/</span>
          <span className="text-[#B96535] font-semibold">FOR VISITORS</span>
        </div>
      </div>

      {/* Main Visitor RSVP Component */}
      <VisitorExperience />

      {/* Visitor Tips Section */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.25em] text-[#B96535] uppercase font-semibold font-sans">
            SHOPPING ESSENTIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C24] mt-1">
            Visitor Guidelines & Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FFFBF5] border border-[#E9AD83]/30 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#FAF4EB] border border-[#E9AD83]/40 flex items-center justify-center text-[#B96535] font-syne font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-lg text-[#2A1C24] font-medium">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#5E4A55] font-sans mt-2 leading-relaxed">
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
