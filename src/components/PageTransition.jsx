import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        const exitTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
        return () => clearTimeout(exitTimer);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* Gold Curtain Wipe */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex items-center justify-center bg-gradient-to-br from-[#4A1620] via-[#2B1B17] to-[#4A1620] ${
          isTransitioning ? 'translate-y-0 shadow-2xl' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-[#D9A441] bg-[#4A1620] flex items-center justify-center text-[#D9A441] shadow-[0_0_20px_#D9A441]">
            <Sparkles size={22} className="animate-spin-slow" />
          </div>
          <span className="font-serif tracking-[0.25em] text-2xl font-bold text-[#FFFAF2]">
            UDAAN
          </span>
          <span className="font-hindi text-xs text-[#D9A441] tracking-wider">
            महिलाओं की नई पहचान
          </span>
          {/* Gold Shimmer Bar */}
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D9A441] to-transparent mt-2 animate-pulse" />
        </div>
      </div>

      <div key={displayLocation.pathname} className="min-h-screen flex flex-col justify-between">
        {children}
      </div>
    </>
  );
}
