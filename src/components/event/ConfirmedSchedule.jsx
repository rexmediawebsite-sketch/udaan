import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { UdaanDiamond } from '../UdaanIcons';

/**
 * ConfirmedSchedule
 * Optional schedule module. Strictly renders ONLY if event.schedule exists and has items.
 * If event.schedule is empty, this component returns null (Zero Hallucination Rule).
 */
export default function ConfirmedSchedule({ event }) {
  const schedule = event?.schedule || [];

  if (!schedule || schedule.length === 0) {
    return null;
  }

  return (
    <section id="event-schedule" className="py-20 bg-[#FAF4EB] border-t border-[#E9AD83]/20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-[0.22em] text-[#B96535] uppercase font-semibold">
            <UdaanDiamond size={12} className="text-[#D9A441]" />
            <span>CONFIRMED TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2A1C24] tracking-tight">
            Today at Udaan
          </h2>
          <p className="text-sm font-sans text-[#6B5860]">
            Verified sessions and doors timeline for {event.name}.
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#FFFBF5] border border-[#E9AD83]/30 hover:border-[#D9A441] transition-colors gap-3"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#4A1620]/5 text-[#4A1620] text-xs font-mono font-bold tracking-wider">
                  <Clock size={12} className="text-[#B96535]" />
                  <span>{item.time}</span>
                </div>
                <h4 className="text-base font-serif font-medium text-[#2A1C24]">
                  {item.title}
                </h4>
              </div>

              {item.venue && (
                <div className="flex items-center space-x-1.5 text-xs font-sans text-[#6B5860] pl-1 sm:pl-0">
                  <MapPin size={12} className="text-[#B96535]" />
                  <span>{item.venue}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
