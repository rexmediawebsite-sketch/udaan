import React, { useState } from 'react';
import { Sliders, Check, Eye, Clock, Radio, Sparkles, X } from 'lucide-react';
import { LIFECYCLE_STATES } from '../../utils/eventLifecycle';

/**
 * Administrative & Reviewer Event Lifecycle State Simulator Bar
 * Allows immediate preview of UPCOMING → LIVE → ARCHIVE states on the same event entity.
 */
export default function EventStateSimulatorBar({
  currentState,
  activeMode,
  onSelectState,
  onResetAuto,
  eventName = 'Glamour Gala Diwali Edition 5',
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="fixed top-24 right-4 z-50 select-none animate-fadeIn">
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#2A0E15]/95 hover:bg-[#3D141F] border border-[#D9A441]/50 text-[#FFFAF2] shadow-2xl backdrop-blur-md transition-all text-[11px] font-sans font-medium"
          title="Open State Simulator"
        >
          <span className={`w-2 h-2 rounded-full ${currentState === LIFECYCLE_STATES.LIVE ? 'bg-emerald-400 animate-pulse' : currentState === LIFECYCLE_STATES.UPCOMING ? 'bg-[#D9A441]' : 'bg-stone-400'}`} />
          <span className="text-[#D9A441] font-semibold">{currentState}</span>
          <Sliders size={12} className="text-[#D9A441]" />
        </button>
      </div>
    );
  }

  return (
    <aside
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-xl select-none animate-fadeIn pointer-events-auto"
      aria-label="Event State Engine Controller"
    >
      <div className="relative p-2 sm:p-2.5 rounded-2xl bg-[#1D0B12]/95 backdrop-blur-2xl border border-[#D9A441]/40 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(217,164,65,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* State Label & Info */}
        <div className="flex items-center space-x-2.5 px-2">
          <div className="w-6 h-6 rounded-full bg-[#D9A441]/20 border border-[#D9A441]/50 flex items-center justify-center text-[#D9A441] shrink-0">
            <Radio size={12} className={currentState === LIFECYCLE_STATES.LIVE ? 'animate-pulse text-emerald-400' : ''} />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-1.5">
              <span className="text-[9px] font-mono tracking-widest text-[#D9A441] uppercase font-bold">
                LIFECYCLE ENGINE
              </span>
              <span className="text-[9px] text-[#FFFAF2]/40">•</span>
              <span className="text-[9px] font-sans text-[#FFFAF2]/60">
                {activeMode === 'AUTO' ? 'Time-Based (Asia/Kolkata)' : 'Admin Override'}
              </span>
            </div>
            <span className="text-xs font-serif italic text-[#FFFAF2] font-medium leading-none">
              State: <strong className="text-[#D9A441] font-sans font-bold tracking-wider">{currentState}</strong>
            </span>
          </div>
        </div>

        {/* State Selector Buttons */}
        <div className="flex items-center space-x-1.5 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
          {/* AUTO Mode */}
          <button
            onClick={onResetAuto}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all flex items-center space-x-1 ${
              activeMode === 'AUTO'
                ? 'bg-[#D9A441] text-[#2B1B17] shadow-sm'
                : 'text-[#FFFAF2]/70 hover:text-white hover:bg-white/5'
            }`}
            title="Evaluate based on current real time"
          >
            <span>AUTO</span>
          </button>

          {/* UPCOMING Override */}
          <button
            onClick={() => onSelectState(LIFECYCLE_STATES.UPCOMING)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all flex items-center space-x-1 ${
              activeMode === 'MANUAL' && currentState === LIFECYCLE_STATES.UPCOMING
                ? 'bg-[#D9A441] text-[#2B1B17] shadow-sm'
                : 'text-[#FFFAF2]/70 hover:text-white hover:bg-white/5'
            }`}
            title="Preview UPCOMING Anticipation Experience"
          >
            <span>UPCOMING</span>
          </button>

          {/* LIVE NOW Override */}
          <button
            onClick={() => onSelectState(LIFECYCLE_STATES.LIVE)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all flex items-center space-x-1 ${
              activeMode === 'MANUAL' && currentState === LIFECYCLE_STATES.LIVE
                ? 'bg-emerald-500 text-[#0E1510] shadow-sm font-bold'
                : 'text-[#FFFAF2]/70 hover:text-white hover:bg-white/5'
            }`}
            title="Preview LIVE Active Exhibition Experience"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>LIVE NOW</span>
          </button>

          {/* ARCHIVED Override */}
          <button
            onClick={() => onSelectState(LIFECYCLE_STATES.ARCHIVED)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold tracking-wider transition-all flex items-center space-x-1 ${
              activeMode === 'MANUAL' && currentState === LIFECYCLE_STATES.ARCHIVED
                ? 'bg-[#9E1B28] text-white shadow-sm'
                : 'text-[#FFFAF2]/70 hover:text-white hover:bg-white/5'
            }`}
            title="Preview ARCHIVED Memory & Documentary Experience"
          >
            <span>ARCHIVE</span>
          </button>
        </div>

        {/* Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="hidden sm:flex p-1.5 rounded-lg text-[#FFFAF2]/50 hover:text-white hover:bg-white/5 transition-colors"
          title="Minimize Simulator bar"
          aria-label="Minimize"
        >
          <X size={13} />
        </button>
      </div>
    </aside>
  );
}
