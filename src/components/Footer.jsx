import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Sparkles } from 'lucide-react';
import { BRAND, FEATURED_EVENT } from '../data/eventData';

const InstagramIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#2D1D26] to-[#1F141A] text-[#FFF1D9] border-t border-[#E9AD83]/20 pt-16 pb-12 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Minimal Brand Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-[#E9AD83]/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-[#E99A18]/40 flex items-center justify-center bg-[#F6B51F]/10">
              <Sparkles className="w-4 h-4 text-[#F6B51F]" />
            </div>
            <div>
              <Link to="/" className="font-serif text-2xl tracking-[0.2em] text-[#FFF1D9] font-normal hover:text-[#F6B51F] transition-colors">
                {BRAND.name}
              </Link>
              <span className="text-[10px] tracking-[0.22em] font-sans text-[#F6B51F] block uppercase font-medium">
                {BRAND.positioning}
              </span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-serif italic text-[#FFF1D9]/90 block">
              {BRAND.tagline}
            </span>
            <span className="text-[10px] tracking-[0.2em] font-sans text-[#E9AD83]/80 uppercase mt-0.5 block">
              Glamour Gala Diwali Edition 5 • 24 & 25 Oct 2026 • Patna
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans">
          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#F6B51F] font-semibold mb-4">
              EXHIBITIONS
            </h4>
            <ul className="space-y-2.5 text-[#E9AD83]/80">
              <li><Link to="/events" className="hover:text-[#F6B51F] transition-colors">All Exhibitions</Link></li>
              <li><Link to="/events/glamour-gala-5" className="hover:text-[#F6B51F] transition-colors">Glamour Gala Edition 5</Link></li>
              <li><Link to="/stalls" className="hover:text-[#F6B51F] transition-colors">Interactive Stall Map</Link></li>
              <li><Link to="/exhibitors" className="hover:text-[#F6B51F] transition-colors">Exhibitor Directory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#F6B51F] font-semibold mb-4">
              PARTICIPATION
            </h4>
            <ul className="space-y-2.5 text-[#E9AD83]/80">
              <li><Link to="/become-an-exhibitor" className="hover:text-[#F6B51F] transition-colors">Become an Exhibitor</Link></li>
              <li><Link to="/visitors" className="hover:text-[#F6B51F] transition-colors">Complimentary Visitor Pass</Link></li>
              <li><Link to="/gallery" className="hover:text-[#F6B51F] transition-colors">Visual Archive</Link></li>
              <li><Link to="/faq" className="hover:text-[#F6B51F] transition-colors">FAQs & Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#F6B51F] font-semibold mb-4">
              DESTINATION VENUE
            </h4>
            <p className="text-[#E9AD83]/80 leading-relaxed text-[11px] font-light">
              Tangerine Grand, Ground Floor<br />
              Lemon Tree Premier<br />
              Exhibition Road, Patna, Bihar
            </p>
            <p className="text-[#F6B51F] text-[10px] mt-2 tracking-wider font-semibold">
              11:00 AM – 9:00 PM IST
            </p>
            <Link to="/contact" className="text-[#F6B51F] text-[10px] underline underline-offset-2 hover:text-[#FFF1D9] block mt-1">
              Venue Directions & Contact &rarr;
            </Link>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#F6B51F] font-semibold mb-4">
              CONNECT WITH UDAAN
            </h4>
            <div className="flex items-center space-x-3 mb-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#E9AD83]/30 bg-[#38232F] flex items-center justify-center text-[#FFF1D9] hover:text-[#F6B51F] hover:border-[#F6B51F] transition-colors"
                title="Instagram"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#E9AD83]/30 bg-[#38232F] flex items-center justify-center text-[#FFF1D9] hover:text-[#F6B51F] hover:border-[#F6B51F] transition-colors"
                title="Facebook"
              >
                <FacebookIcon size={14} />
              </a>
            </div>
            <p className="text-[11px] text-[#E9AD83]/80 leading-relaxed font-light">
              Official inquiry concierge available 10 AM to 8 PM via WhatsApp.
            </p>
            <Link to="/about" className="text-xs text-[#F6B51F] hover:text-[#FFF1D9] font-serif italic mt-2 block">
              About the Udaan Mission &rarr;
            </Link>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 border-t border-[#E9AD83]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] text-[#9A8790] uppercase font-sans">
          <div className="flex items-center space-x-4">
            <span>© 2026 UDAAN EXHIBITIONS</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/faq" className="hover:text-[#FFF1D9] transition-colors">PRIVACY POLICY</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-[#FFF1D9] transition-colors">TERMS OF EXHIBITION</Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[#F6B51F] hover:text-[#FFF1D9] transition-colors"
            >
              <span>TOP</span>
              <ArrowUp size={11} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
