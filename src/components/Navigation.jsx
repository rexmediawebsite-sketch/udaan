import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { UdaanEmblem } from './UdaanIcons';

export default function Navigation({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinksLeft = [
    { name: 'Exhibitions', path: '/events' },
    { name: 'Pavilions', path: '/events/glamour-gala-5' },
    { name: 'Floor Map', path: '/stalls' },
  ];

  const navLinksRight = [
    { name: 'Directory', path: '/exhibitors' },
    { name: 'RSVP Pass', path: '/visitors' },
    { name: 'About', path: '/about' },
  ];

  const allNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Exhibitions Calendar', path: '/events' },
    { name: 'Glamour Gala Diwali 5', path: '/events/glamour-gala-5' },
    { name: 'Curated Directory', path: '/exhibitors' },
    { name: 'Tangerine Grand Stall Map', path: '/stalls' },
    { name: 'Book a Stall Application', path: '/become-an-exhibitor' },
    { name: 'Visitor Guide & VIP Pass', path: '/visitors' },
    { name: 'Visual Archive', path: '/gallery' },
    { name: 'About & Purpose', path: '/about' },
    { name: 'FAQs & Policies', path: '/faq' },
    { name: 'Contact Concierge', path: '/contact' },
  ];

  const isCurrentActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-center pt-5 px-4 pointer-events-none transition-all duration-500"
      >
        {/* Unified Solid Blurred Pill (Awards Standard) */}
        <nav
          className={`nav-unified-pill pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 rounded-full transition-all duration-400 ${
            isScrolled
              ? 'scrolled py-1.5'
              : 'py-2.5'
          }`}
          style={{ width: 'min(94vw, 1080px)' }}
        >
          {/* Left Nav Links */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center space-x-6 text-[13px] font-sans font-medium tracking-wide">
              {navLinksLeft.map((link) => {
                const active = isCurrentActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    data-cursor="View"
                    className={`nav-link-indicator py-1 transition-colors duration-300 ${
                      active
                        ? 'text-[#D9A441] font-semibold active'
                        : 'text-[#FFFAF2]/80 hover:text-[#D9A441]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Central Luxury Logo Emblem */}
          <Link
            to="/"
            className="flex items-center gap-2 group px-2 select-none"
            title="UDAAN — महिलाओं की नई पहचान"
            data-cursor="Udaan"
          >
            <div className="w-7 h-7 rounded-full border border-[#D9A441]/60 bg-gradient-to-br from-[#D9A441]/25 to-transparent flex items-center justify-center text-[#D9A441] group-hover:scale-110 group-hover:border-[#D9A441] transition-all duration-300 shadow-[0_0_10px_rgba(217,164,65,0.3)]">
              <UdaanEmblem size={14} className="text-[#D9A441] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif tracking-[0.22em] text-base sm:text-lg font-bold text-[#FFFAF2] group-hover:text-[#D9A441] transition-colors leading-none">
                UDAAN
              </span>
              <span className="font-hindi text-[9px] text-[#D9A441]/90 tracking-wider leading-tight">
                महिलाओं की नई पहचान
              </span>
            </div>
          </Link>

          {/* Right Nav Links & Integrated Call-To-Action */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center space-x-6 text-[13px] font-sans font-medium tracking-wide">
              {navLinksRight.map((link) => {
                const active = isCurrentActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    data-cursor="View"
                    className={`nav-link-indicator py-1 transition-colors duration-300 ${
                      active
                        ? 'text-[#D9A441] font-semibold active'
                        : 'text-[#FFFAF2]/80 hover:text-[#D9A441]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Embedded Book a Stall Button with Shimmer Sweep */}
            <MagneticButton
              onClick={() => onOpenBooking()}
              cursorLabel="Book"
              className="btn-gold-luxury px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wider shadow-md hover:shadow-lg"
            >
              <span>Book Stall</span>
            </MagneticButton>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#FFFAF2] hover:text-[#D9A441] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer (Responsive fallback) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#4A1620] lg:hidden flex flex-col justify-between px-8 py-10 transition-all animate-fadeIn overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#D9A441]/30 pb-4">
            <div className="flex items-center space-x-2.5">
              <UdaanEmblem size={20} className="text-[#D9A441]" />
              <span className="font-serif tracking-[0.25em] text-xl text-[#FFFAF2] font-semibold">
                UDAAN
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full text-[#FFFAF2] hover:text-[#D9A441]"
              aria-label="Close Menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="my-auto py-6 flex flex-col items-center space-y-4 text-sm font-sans tracking-[0.15em] text-[#FFFAF2]">
            {allNavLinks.map((link) => {
              const active = isCurrentActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 transition-colors ${
                    active ? 'text-[#D9A441] font-bold border-b border-[#D9A441]' : 'hover:text-[#D9A441]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#D9A441]/30 flex flex-col w-full space-y-3 shrink-0">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-gold-luxury w-full text-center py-3.5 rounded-full text-xs tracking-widest uppercase font-semibold"
            >
              Book a Stall
            </button>
            <Link
              to="/visitors"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-maroon-luxury w-full text-center py-3 rounded-full text-xs tracking-widest uppercase"
            >
              Visitor Guide & Pass
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
