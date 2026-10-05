import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-24 bg-[#FBF4EA] text-[#2B1B17]">
      <div className="max-w-xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFFAF2] border border-[#D9A441]/40 shadow-lg text-[#B8801F]">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>
        
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B85C38] font-sans font-semibold">
            404 • Lost in Flight
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#4A1620] tracking-tight">
            The Horizon You Seek Is Elsewhere
          </h1>
          <p className="font-hindi text-lg text-[#B8801F]">
            रास्ता भटक गए हैं? चलिए मुख्य द्वार की ओर लौटते हैं।
          </p>
        </div>

        <p className="font-sans text-[#2B1B17]/80 text-base max-w-md mx-auto leading-relaxed">
          The requested page could not be located in the Tangerine Grand pavilion. Return to the grand foyer to explore our exhibitions, stalls, and gala archives.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#4A1620] text-[#FFFAF2] font-sans text-sm font-medium tracking-wide hover:bg-[#2B1B17] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4 text-[#D9A441]" />
            Return to Grand Foyer
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FFFAF2] text-[#4A1620] border border-[#D9A441]/50 font-sans text-sm font-medium tracking-wide hover:border-[#D9A441] hover:bg-[#FBF4EA] transition-all duration-300"
          >
            View Exhibitions
          </Link>
        </div>
      </div>
    </div>
  );
}
