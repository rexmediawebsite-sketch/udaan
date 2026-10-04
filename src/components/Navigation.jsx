import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, MapPin, Calendar, ArrowLeft } from 'lucide-react';

export default function Navigation({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinksLeft = [
    { name: 'GALLERY', path: '/gallery' },
    { name: 'TALENTS', path: '/exhibitors' },
    { name: 'STALL MAP', path: '/stalls' },
  ];

  const navLinksRight = [
    { name: 'JOURNAL', path: '/about' },
    { name: 'STORY', path: '/events/glamour-gala-5' },
    { name: 'VISITORS', path: '/visitors' },
  ];

  const allNavLinks = [
    { name: 'HOME', path: '/' },
    { name: 'EXHIBITIONS', path: '/events' },
    { name: 'GLAMOUR GALA 5', path: '/events/glamour-gala-5' },
    { name: 'BECOME AN EXHIBITOR', path: '/become-an-exhibitor' },
    { name: 'STALL FLOOR MAP', path: '/stalls' },
    { name: 'EXHIBITOR DIRECTORY', path: '/exhibitors' },
    { name: 'VISITOR GUIDE & PASS', path: '/visitors' },
    { name: 'VISUAL ARCHIVE', path: '/gallery' },
    { name: 'ABOUT & JOURNAL', path: '/about' },
    { name: 'FAQS', path: '/faq' },
    { name: 'CONTACT & VENUE', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-none"
      >
        {/* Left Floating Circular Control (40px Round Button from Celestial Archive spec) */}
        <div className="pointer-events-auto flex items-center">
          {location.pathname !== '/' ? (
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous Page"
              className="btn-circle-control text-[#FAF6F0] hover:text-[#E5A93C] shadow-lg"
              title="Go Back"
            >
              <ArrowLeft size={16} />
            </button>
          ) : (
            <Link
              to="/"
              className="btn-circle-control text-[#FAF6F0] hover:text-[#E5A93C] shadow-lg"
              title="Udaan"
            >
              <Sparkles size={16} className="text-[#E5A93C]" />
            </Link>
          )}
        </div>

        {/* Center Floating Capsule Navigation Pill mirroring Reference */}
        <nav
          className={`pointer-events-auto flex items-center justify-between px-6 md:px-8 py-2.5 rounded-full border transition-all duration-500 shadow-2xl backdrop-blur-md ${
            isScrolled
              ? 'bg-[#1C110F]/90 border-[#E5A93C]/35 shadow-black/80 scale-[0.98]'
              : 'bg-[#251917]/55 border-[#E5A93C]/20 hover:border-[#E5A93C]/40'
          }`}
          style={{ minWidth: 'min(90vw, 860px)' }}
        >
          {/* Left Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[11px] font-sans font-semibold tracking-[0.22em] text-[#FAF6F0]/90">
            {navLinksLeft.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 uppercase ${
                    active ? 'text-[#E5A93C]' : 'hover:text-[#E5A93C]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Central Butterfly / Infinity Loop Glyph Motif dividing categories */}
          <Link
            to="/"
            className="flex items-center space-x-2 mx-auto lg:mx-4 group px-2"
            title="Udaan — Where Women Build Brands"
          >
            <div className="w-7 h-7 rounded-full border border-[#E5A93C]/40 flex items-center justify-center bg-[#E5A93C]/10 group-hover:border-[#E5A93C] group-hover:scale-110 transition-all duration-300">
              {/* Organic Butterfly / Infinity glyph from Stitch specification */}
              <svg className="w-4 h-4 text-[#F3D2A2] fill-current" viewBox="0 0 24 24">
                <path d="M12 14c-.6 0-1.1-.3-1.5-.7C9.3 12 8 10 5.5 10c-2.5 0-4 1.8-4 4 0 3 2.5 5.5 6 5.5 1.5 0 3-.5 4.5-1.5 1.5 1 3 1.5 4.5 1.5 3.5 0 6-2.5 6-5.5 0-2.2-1.5-4-4-4-2.5 0-3.8 2-5 3.3-.4.4-.9.7-1.5.7zm0-4c.6 0 1.1-.3 1.5-.7C14.7 8 16 6 18.5 6c2.5 0 4 1.8 4 4 0 3-2.5 5.5-6 5.5-1.5 0-3-.5-4.5-1.5-1.5 1-3 1.5-4.5 1.5-3.5 0-6-2.5-6-5.5 0-2.2 1.5-4 4-4 2.5 0 3.8 2 5 3.3.4.4.9.7 1.5.7z" />
              </svg>
            </div>
            <span className="font-serif tracking-[0.25em] text-sm md:text-base font-semibold text-[#FAF6F0] group-hover:text-[#F3D2A2] transition-colors">
              UDAAN
            </span>
          </Link>

          {/* Right Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[11px] font-sans font-semibold tracking-[0.22em] text-[#FAF6F0]/90">
            {navLinksRight.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 uppercase ${
                    active ? 'text-[#E5A93C]' : 'hover:text-[#E5A93C]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-[#FAF6F0] hover:text-[#E5A93C] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Right Top Action Indicator with Pulsating Amber Dot (Stitch Spec) */}
        <div className="pointer-events-auto hidden md:flex items-center">
          <Link
            to="/become-an-exhibitor"
            className="btn-ghost-pill rounded-full px-5 py-2 text-[10px] tracking-[0.22em] uppercase text-[#F3D2A2] font-sans font-semibold flex items-center gap-2 hover:border-[#E5A93C] transition-all shadow-lg"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
            <span>Book a Stall</span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer with Celestial Archive Palette */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#160B0A]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-center items-center px-8 transition-all animate-fadeIn overflow-y-auto py-12">
          <div className="w-12 h-12 rounded-full border border-[#E5A93C]/40 flex items-center justify-center bg-[#E5A93C]/10 mb-3 shrink-0">
            <Sparkles className="w-6 h-6 text-[#E5A93C]" />
          </div>
          <span className="font-serif tracking-[0.35em] text-2xl text-[#FAF6F0] font-semibold">
            UDAAN
          </span>
          <span className="text-[9px] tracking-[0.25em] font-sans text-[#E5A93C] mb-6">
            WHERE WOMEN BUILD BRANDS
          </span>

          <div className="flex flex-col items-center space-y-3.5 text-xs font-sans tracking-[0.25em] text-[#FAF6F0]">
            {allNavLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 transition-colors ${
                    active ? 'text-[#E5A93C] font-semibold border-b border-[#E5A93C]' : 'hover:text-[#E5A93C]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col w-full max-w-xs space-y-3 shrink-0">
            <Link
              to="/become-an-exhibitor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full border border-[#E5A93C] bg-[#E5A93C] text-[#160B0A] font-semibold text-xs tracking-[0.25em] uppercase shadow-lg"
            >
              Book a Stall
            </Link>
            <Link
              to="/visitors"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full border border-white/20 text-[#FAF6F0] text-xs tracking-[0.25em] uppercase"
            >
              Visitor Pass
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
