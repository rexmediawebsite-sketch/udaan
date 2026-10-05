import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UdaanEmblem, UdaanDiamond } from './UdaanIcons';

const SLATS = [0, 1, 2, 3, 4];

export default function PageTransition({ children }) {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Increment transition key on route change
    setTransitionKey((prev) => prev + 1);
  }, [location.pathname]);

  return (
    <>
      {/* 24K Gold Laser Sweep Progress Bar */}
      <motion.div
        key={`laser-${location.pathname}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D9A441] via-[#FFF5DE] to-[#D9A441] origin-left z-[10000] pointer-events-none shadow-[0_0_14px_#D9A441]"
      />

      {/* Royal Shutter Slat Transition (Only runs on route navigation, NEVER blocks clicks) */}
      <AnimatePresence mode="wait">
        {transitionKey > 0 && (
          <div
            key={`shutter-wrap-${transitionKey}`}
            className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
          >
            {/* 5 Vertical Architectural Slices sweeping up */}
            <div className="absolute inset-0 grid grid-cols-5 w-full h-full pointer-events-none">
              {SLATS.map((i) => (
                <motion.div
                  key={`slat-${transitionKey}-${i}`}
                  initial={{ y: 0 }}
                  animate={{ y: '-100%' }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.52,
                    delay: i * 0.045,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className={`h-full w-full relative ${
                    i % 2 === 0
                      ? 'bg-gradient-to-b from-[#1C060E] via-[#2F0B18] to-[#1C060E]'
                      : 'bg-gradient-to-b from-[#140309] via-[#240813] to-[#140309]'
                  } border-r border-[#D9A441]/20`}
                >
                  {/* Fine gold light edge */}
                  <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#E5B558]/35 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Center Royal Medallion Soaring Upward */}
            <motion.div
              key={`emblem-${transitionKey}`}
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 0, scale: 0.9, y: -45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10"
            >
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#3D0F1E] to-[#691932] border border-[#E5B558]/70 flex items-center justify-center text-[#F6C667] shadow-[0_0_35px_rgba(217,164,65,0.5)] mb-3">
                <UdaanEmblem size={28} className="drop-shadow-[0_2px_8px_rgba(246,198,103,0.7)]" />
                <div className="absolute -inset-1 rounded-full border border-[#D9A441]/30 animate-spin-slow" />
              </div>

              <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] text-[#E5B558] font-sans font-semibold uppercase mb-1">
                <UdaanDiamond size={8} />
                <span>DIWALI EDITION 5</span>
                <UdaanDiamond size={8} />
              </div>

              <h2 className="font-serif tracking-[0.3em] text-2xl font-bold text-[#FFFDF8] drop-shadow-md">
                UDAAN
              </h2>
              <p className="font-hindi text-xs text-[#F6C667] tracking-wider mt-0.5">
                महिलाओं की नई पहचान
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Page Content with Silky Glide-in */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0.92, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="min-h-screen flex flex-col justify-between"
      >
        {children}
      </motion.div>
    </>
  );
}
