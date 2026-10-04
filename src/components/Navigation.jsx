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
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-none transition-all duration-300"
      >
        {/* Left Floating Circular Control */}
        <div className="pointer-events-auto flex items-center">
          {location.pathname !== '/' ? (
            <button
              onClick={() => navigate(-1)}
              aria-label="Previous Page"
              className="btn-circle-control shadow-sunset hover:shadow-lg"
              title="Go Back"
            >
              <ArrowLeft size={16} className="text-[#2A1C24]" />
            </button>
          ) : (
            <Link
              to="/"
              className="btn-circle-control shadow-sunset hover:shadow-lg"
              title="Udaan"
            >
              <Sparkles size={16} className="text-[#E99A18]" />
            </Link>
          )}
        </div>

        {/* Center Floating Editorial Navigation Pill (Solid, crisp, zero blur) */}
        <nav
          className={`pointer-events-auto flex items-center justify-between px-6 md:px-8 py-2.5 rounded-full border transition-all duration-300 shadow-2xl ${
            isScrolled
              ? 'bg-[#261521] border-[#F6B51F]/50 shadow-[0_12px_40px_rgba(10,5,8,0.7)] scale-[0.98]'
              : 'bg-[#22121D] border-[#E99A18]/40 hover:border-[#F6B51F]/60'
          }`}
          style={{ minWidth: 'min(90vw, 840px)' }}
        >
          {/* Left Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[11px] font-sans font-semibold tracking-[0.2em] text-[#FFF1D9]/85">
            {navLinksLeft.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 uppercase relative py-1 ${
                    active ? 'text-[#F6B51F] font-bold' : 'hover:text-[#F6B51F]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#F6B51F] rounded-full" />
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
            <div className="w-7 h-7 rounded-full border border-[#E99A18]/50 flex items-center justify-center bg-[#F6B51F]/20 group-hover:border-[#F6B51F] group-hover:scale-110 transition-all duration-300">
              {/* Organic Dove / Butterfly glyph */}
              <svg className="w-4 h-4 text-[#F6B51F] fill-current" viewBox="0 0 24 24">
                <path d="M12 14c-.6 0-1.1-.3-1.5-.7C9.3 12 8 10 5.5 10c-2.5 0-4 1.8-4 4 0 3 2.5 5.5 6 5.5 1.5 0 3-.5 4.5-1.5 1.5 1 3 1.5 4.5 1.5 3.5 0 6-2.5 6-5.5 0-2.2-1.5-4-4-4-2.5 0-3.8 2-5 3.3-.4.4-.9.7-1.5.7zm0-4c.6 0 1.1-.3 1.5-.7C14.7 8 16 6 18.5 6c2.5 0 4 1.8 4 4 0 3-2.5 5.5-6 5.5-1.5 0-3-.5-4.5-1.5-1.5 1-3 1.5-4.5 1.5-3.5 0-6-2.5-6-5.5 0-2.2 1.5-4 4-4 2.5 0 3.8 2 5 3.3.4.4.9.7 1.5.7z" />
              </svg>
            </div>
            <span className="font-serif tracking-[0.25em] text-sm md:text-base font-semibold text-[#FFF1D9] group-hover:text-[#F6B51F] transition-colors">
              UDAAN
            </span>
          </Link>

          {/* Right Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[11px] font-sans font-semibold tracking-[0.2em] text-[#FFF1D9]/85">
            {navLinksRight.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-200 uppercase relative py-1 ${
                    active ? 'text-[#F6B51F] font-bold' : 'hover:text-[#F6B51F]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#F6B51F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-[#FFF1D9] hover:text-[#F6B51F] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Right Top Action Indicator with Pulsating Sunlit Gold Dot */}
        <div className="pointer-events-auto hidden md:flex items-center">
          <Link
            to="/become-an-exhibitor"
            className="btn-sunset-ghost-dark rounded-full px-5 py-2 text-[10px] tracking-[0.22em] uppercase font-sans font-semibold flex items-center gap-2 hover:border-[#F6B51F] transition-all shadow-xl"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#F6B51F] animate-pulse shadow-[0_0_8px_#F6B51F]" />
            <span>Book a Stall</span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer with Sunset Palette */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A1017] lg:hidden flex flex-col justify-center items-center px-8 transition-all animate-fadeIn overflow-y-auto py-12">
          <div className="w-12 h-12 rounded-full border border-[#E99A18]/45 flex items-center justify-center bg-[#F6B51F]/15 mb-3 shrink-0">
            <Sparkles className="w-6 h-6 text-[#F6B51F]" />
          </div>
          <span className="font-serif tracking-[0.35em] text-2xl text-[#FFF1D9] font-semibold">
            UDAAN
          </span>
          <span className="text-[9px] tracking-[0.25em] font-sans text-[#F6B51F] mb-6 uppercase font-medium">
            WHERE WOMEN BUILD BRANDS
          </span>

          <div className="flex flex-col items-center space-y-3.5 text-xs font-sans tracking-[0.22em] text-[#FFF1D9]">
            {allNavLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 transition-colors ${
                    active ? 'text-[#F6B51F] font-bold border-b-2 border-[#F6B51F]' : 'hover:text-[#F6B51F]'
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
              className="btn-sunset-gold w-full text-center py-3 rounded-full text-xs tracking-[0.25em] uppercase shadow-xl"
            >
              Book a Stall
            </Link>
            <Link
              to="/visitors"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-sunset-ghost-dark w-full text-center py-2.5 rounded-full text-[#FFF1D9] text-xs tracking-[0.25em] uppercase"
            >
              Visitor Pass
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
