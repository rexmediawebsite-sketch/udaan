import React from 'react';
import { Link } from 'react-router-dom';
import ExhibitorDirectory from '../components/ExhibitorDirectory';

export default function ExhibitorsPage({ onOpenBooking }) {
  return (
    <div className="pt-28 pb-24 bg-[#1b0607] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <div className="flex items-center space-x-2 text-xs font-sans text-white/50 mb-6">
          <Link to="/" className="hover:text-[#E5A93C]">HOME</Link>
          <span>/</span>
          <span className="text-[#E5A93C] font-semibold">EXHIBITOR DIRECTORY</span>
        </div>
      </div>

      <ExhibitorDirectory onOpenBooking={onOpenBooking} />
    </div>
  );
}
