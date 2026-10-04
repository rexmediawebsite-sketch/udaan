import React from 'react';
import { Link } from 'react-router-dom';
import ExhibitorDirectory from '../components/ExhibitorDirectory';

export default function ExhibitorsPage({ onOpenBooking }) {
  return (
    <div className="pt-28 pb-24 bg-[#180E15] min-h-screen text-[#FFF1D9]">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <div className="flex items-center space-x-2 text-xs font-sans text-[#E9AD83] mb-6">
          <Link to="/" className="hover:text-[#F6B51F]">HOME</Link>
          <span className="text-[#E9AD83]/50">/</span>
          <span className="text-[#F6B51F] font-semibold">EXHIBITOR DIRECTORY</span>
        </div>
      </div>

      <ExhibitorDirectory onOpenBooking={onOpenBooking} />
    </div>
  );
}
