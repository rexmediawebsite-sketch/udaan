import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      {/* High-End 24K Gold Laser Top Progress Bar */}
      <motion.div
        key={`laser-${location.pathname}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 0.8, 0] }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D9A441] via-[#FFF1D9] to-[#D9A441] origin-left z-[9999] pointer-events-none shadow-[0_0_12px_#D9A441]"
      />

      {/* Silky Smooth Luxury Page Cross-fade & Lift */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="min-h-screen flex flex-col justify-between"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
