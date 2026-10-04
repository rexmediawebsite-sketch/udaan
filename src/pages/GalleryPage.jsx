import React from 'react';
import { Link } from 'react-router-dom';
import GallerySection from '../components/GallerySection';

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-24 bg-[#FAF4EB] min-h-screen text-[#2A1C24]">
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <div className="flex items-center space-x-2 text-xs font-sans text-[#6B5860] mb-6">
          <Link to="/" className="hover:text-[#B96535]">HOME</Link>
          <span className="text-[#6B5860]/40">/</span>
          <span className="text-[#B96535] font-semibold">VISUAL ARCHIVE</span>
        </div>
      </div>

      <GallerySection />
    </div>
  );
}
