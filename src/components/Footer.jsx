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
    <footer className="relative bg-[#160B0A] text-[#FAF6F0] border-t border-[#E5A93C]/20 pt-16 pb-12 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Minimal Brand Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-[#E5A93C]/40 flex items-center justify-center bg-[#E5A93C]/10">
              <Sparkles className="w-4 h-4 text-[#E5A93C]" />
            </div>
            <div>
              <Link to="/" className="font-serif text-2xl tracking-[0.25em] text-[#FAF6F0] font-normal hover:text-[#F3D2A2] transition-colors">
                {BRAND.name}
              </Link>
              <span className="text-[10px] tracking-[0.22em] font-sans text-[#E5A93C] block uppercase font-medium">
                {BRAND.positioning}
              </span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs font-serif italic text-[#FAF6F0]/80 block">
              {BRAND.tagline}
            </span>
            <span className="text-[10px] tracking-[0.2em] font-sans text-[#C2B8B5]/60 uppercase mt-0.5 block">
              Glamour Gala Diwali Edition 5 • 24 & 25 Oct 2026 • Patna
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans">
          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#E5A93C] font-semibold mb-4">
              EXHIBITIONS
            </h4>
            <ul className="space-y-2.5 text-[#C2B8B5]">
              <li><Link to="/events" className="hover:text-[#E5A93C] transition-colors">All Exhibitions</Link></li>
              <li><Link to="/events/glamour-gala-5" className="hover:text-[#E5A93C] transition-colors">Glamour Gala Edition 5</Link></li>
              <li><Link to="/stalls" className="hover:text-[#E5A93C] transition-colors">Interactive Stall Map</Link></li>
              <li><Link to="/exhibitors" className="hover:text-[#E5A93C] transition-colors">Exhibitor Directory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#E5A93C] font-semibold mb-4">
              PARTICIPATION
            </h4>
            <ul className="space-y-2.5 text-[#C2B8B5]">
              <li><Link to="/become-an-exhibitor" className="hover:text-[#E5A93C] transition-colors">Become an Exhibitor</Link></li>
              <li><Link to="/visitors" className="hover:text-[#E5A93C] transition-colors">Complimentary Visitor Pass</Link></li>
              <li><Link to="/gallery" className="hover:text-[#E5A93C] transition-colors">Visual Archive</Link></li>
              <li><Link to="/faq" className="hover:text-[#E5A93C] transition-colors">FAQs & Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#E5A93C] font-semibold mb-4">
              DESTINATION VENUE
            </h4>
            <p className="text-[#C2B8B5] leading-relaxed text-[11px] font-light">
              Tangerine Grand, Ground Floor<br />
              Lemon Tree Premier<br />
              Exhibition Road, Patna, Bihar
            </p>
            <p className="text-[#E5A93C] text-[10px] mt-2 tracking-wider font-semibold">
              11:00 AM – 9:00 PM IST
            </p>
            <Link to="/contact" className="text-[#F3D2A2] text-[10px] underline underline-offset-2 hover:text-[#E5A93C] block mt-1">
              Venue Directions & Contact &rarr;
            </Link>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.22em] uppercase text-[#E5A93C] font-semibold mb-4">
              CONNECT WITH UDAAN
            </h4>
            <div className="flex items-center space-x-3 mb-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#FAF6F0] hover:text-[#E5A93C] hover:border-[#E5A93C] transition-colors"
                title="Instagram"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#FAF6F0] hover:text-[#E5A93C] hover:border-[#E5A93C] transition-colors"
                title="Facebook"
              >
                <FacebookIcon size={14} />
              </a>
            </div>
            <p className="text-[11px] text-[#C2B8B5]/70 leading-relaxed font-light">
              Official inquiry concierge available 10 AM to 8 PM via WhatsApp.
            </p>
            <Link to="/about" className="text-xs text-[#E5A93C] hover:text-[#F3D2A2] font-serif italic mt-2 block">
              About the Udaan Mission &rarr;
            </Link>
          </div>
        </div>

        {/* Minimal Bottom Bar mirroring Reference */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] text-[#C2B8B5]/50 uppercase font-sans">
          <div className="flex items-center space-x-4">
            <span>© 2026 UDAAN EXHIBITIONS</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/faq" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-white transition-colors">TERMS OF EXHIBITION</Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[#E5A93C] hover:text-[#F3D2A2] transition-colors"
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
