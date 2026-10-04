import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowLeft } from 'lucide-react';

export default function Navigation({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinksLeft = [
    { name: 'EXHIBITIONS', path: '/events' },
    { name: 'TALENTS', path: '/exhibitors' },
    { name: 'FLOOR MAP', path: '/stalls' },
  ];

  const navLinksRight = [
    { name: 'PAVILIONS', path: '/#categories' },
    { name: 'JOURNAL', path: '/about' },
    { name: 'VISITORS', path: '/visitors' },
  ];

  const allNavLinks = [
    { name: 'HOME', path: '/' },
    { name: 'EXHIBITIONS CALENDAR', path: '/events' },
    { name: 'GLAMOUR GALA DIWALI 5', path: '/events/glamour-gala-5' },
    { name: 'BECOME AN EXHIBITOR', path: '/become-an-exhibitor' },
    { name: 'FLOOR MAP SCHEMATIC', path: '/stalls' },
    { name: 'CURATED DIRECTORY', path: '/exhibitors' },
    { name: 'VISITOR GUIDE & RSVP', path: '/visitors' },
    { name: 'VISUAL ARCHIVE', path: '/gallery' },
    { name: 'ABOUT & PURPOSE', path: '/about' },
    { name: 'FAQS & POLICIES', path: '/faq' },
    { name: 'CONTACT DESK', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path.startsWith('/#')) return false;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between pointer-events-none transition-all duration-300"
      >
        {/* Left Floating Circular Control */}
        <div className="pointer-events-auto flex items-center">
          {location.pathname !== '/' ? (
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous Page"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                isScrolled
                  ? 'bg-[#FFFBF5] border border-[#E9AD83]/40 text-[#2A1C24] hover:bg-[#FAF4EB]'
                  : 'bg-[#1E121B]/85 border border-[#F6B51F]/40 text-[#FFF1D9] hover:bg-[#2A1424]'
              }`}
              title="Go Back"
            >
              <ArrowLeft size={16} />
            </button>
          ) : (
            <Link
              to="/"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                isScrolled
                  ? 'bg-[#FFFBF5] border border-[#E9AD83]/40 text-[#B96535] hover:bg-[#FAF4EB]'
                  : 'bg-[#1E121B]/85 border border-[#F6B51F]/40 text-[#F6B51F] hover:bg-[#2A1424]'
              }`}
              title="Udaan"
            >
              <Sparkles size={16} />
            </Link>
          )}
        </div>

        {/* Center Floating Editorial Navigation Pill */}
        <nav
          className={`pointer-events-auto flex items-center justify-between px-6 md:px-8 py-2.5 rounded-full border transition-all duration-300 shadow-xl ${
            isScrolled
              ? 'bg-[#FFFBF5] border-[#E9AD83]/40 text-[#2A1C24] scale-[0.98]'
              : 'bg-[#1E121B]/85 border-[#F6B51F]/35 text-[#FFF1D9]'
          }`}
          style={{ minWidth: 'min(90vw, 840px)' }}
        >
          {/* Left Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[11px] font-sans font-semibold tracking-[0.2em]">
            {navLinksLeft.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 uppercase relative py-1 ${
                    active
                      ? isScrolled ? 'text-[#B96535] font-bold' : 'text-[#F6B51F] font-bold'
                      : isScrolled ? 'text-[#5E4A55] hover:text-[#B96535]' : 'text-[#FFF1D9]/80 hover:text-[#F6B51F]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${
                        isScrolled ? 'bg-[#B96535]' : 'bg-[#F6B51F]'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Central Brand Motif dividing categories */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 mx-auto lg:mx-4 group px-2"
            title="Udaan — Where Women Build Brands"
          >
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              isScrolled
                ? 'border-[#B96535]/40 bg-[#FFF1D9] text-[#B96535]'
                : 'border-[#E99A18]/50 bg-[#F6B51F]/20 text-[#F6B51F]'
            }`}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 14c-.6 0-1.1-.3-1.5-.7C9.3 12 8 10 5.5 10c-2.5 0-4 1.8-4 4 0 3 2.5 5.5 6 5.5 1.5 0 3-.5 4.5-1.5 1.5 1 3 1.5 4.5 1.5 3.5 0 6-2.5 6-5.5 0-2.2-1.5-4-4-4-2.5 0-3.8 2-5 3.3-.4.4-.9.7-1.5.7zm0-4c.6 0 1.1-.3 1.5-.7C14.7 8 16 6 18.5 6c2.5 0 4 1.8 4 4 0 3-2.5 5.5-6 5.5-1.5 0-3-.5-4.5-1.5-1.5 1-3 1.5-4.5 1.5-3.5 0-6-2.5-6-5.5 0-2.2 1.5-4 4-4 2.5 0 3.8 2 5 3.3.4.4.9.7 1.5.7z" />
              </svg>
            </div>
            <span className={`font-serif tracking-[0.25em] text-sm md:text-base font-semibold transition-colors ${
              isScrolled
                ? 'text-[#2A1C24] group-hover:text-[#B96535]'
                : 'text-[#FFF1D9] group-hover:text-[#F6B51F]'
            }`}>
              UDAAN
            </span>
          </Link>

          {/* Right Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[11px] font-sans font-semibold tracking-[0.2em]">
            {navLinksRight.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 uppercase relative py-1 ${
                    active
                      ? isScrolled ? 'text-[#B96535] font-bold' : 'text-[#F6B51F] font-bold'
                      : isScrolled ? 'text-[#5E4A55] hover:text-[#B96535]' : 'text-[#FFF1D9]/80 hover:text-[#F6B51F]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${
                        isScrolled ? 'bg-[#B96535]' : 'bg-[#F6B51F]'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-full transition-colors ${
                isScrolled ? 'text-[#2A1C24] hover:text-[#B96535]' : 'text-[#FFF1D9] hover:text-[#F6B51F]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Right Top Action Indicator */}
        <div className="pointer-events-auto hidden md:flex items-center">
          <button
            onClick={() => onOpenBooking()}
            className={`rounded-full px-5 py-2 text-[10px] tracking-[0.22em] uppercase font-sans font-semibold flex items-center gap-2 transition-all shadow-md ${
              isScrolled
                ? 'btn-sunset-gold'
                : 'btn-sunset-ghost-dark'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#F6B51F] animate-pulse shadow-[0_0_6px_#F6B51F]" />
            <span>Book a Stall</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer with Warm Editorial Theme */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF4EB] lg:hidden flex flex-col justify-between px-8 py-10 transition-all animate-fadeIn overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#E9AD83]/30 pb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#B96535]" />
              <span className="font-serif tracking-[0.25em] text-xl text-[#2A1C24] font-semibold">
                UDAAN
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full text-[#2A1C24] hover:text-[#B96535]"
              aria-label="Close Menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="my-auto py-6 flex flex-col items-center space-y-4 text-xs font-sans tracking-[0.22em] text-[#2A1C24]">
            {allNavLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 transition-colors ${
                    active ? 'text-[#B96535] font-bold border-b border-[#B96535]' : 'hover:text-[#B96535]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E9AD83]/30 flex flex-col w-full space-y-3 shrink-0">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-sunset-gold w-full text-center py-3 rounded-full text-xs tracking-[0.22em] uppercase shadow-lg"
            >
              Book a Stall
            </button>
            <Link
              to="/visitors"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-editorial-outline w-full text-center py-2.5 rounded-full text-xs tracking-[0.22em] uppercase"
            >
              Visitor Guide & Pass
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
