import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Send, CheckCircle2 } from 'lucide-react';
import { UdaanEmblem } from './UdaanIcons';
import MagneticButton from './MagneticButton';
import { BRAND } from '../data/eventData';

const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer({ onOpenBooking }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#4A1620] text-[#FFFAF2] border-t border-[#D9A441]/30 overflow-hidden font-sans">
      {/* Top Gold High-Visibility Band: "Book your stall for Diwali Edition 5" */}
      <div className="bg-gradient-to-r from-[#B8801F] via-[#D9A441] to-[#B8801F] text-[#2B1B17] py-6 px-6 relative z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-[#360F17] text-[#D9A441] flex items-center justify-center shadow-md shrink-0">
              <UdaanEmblem size={20} className="text-[#D9A441]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-[#2B1B17]">
                Book Your Stall for Diwali Edition 5
              </h3>
              <p className="text-xs font-sans font-medium text-[#2B1B17]/85 tracking-wide">
                24 & 25 October 2026 • Tangerine Grand, Lemon Tree Premier, Patna • 70% Allotted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/become-an-exhibitor"
              className="px-6 py-2.5 rounded-full bg-[#360F17] text-[#FFFAF2] hover:text-[#D9A441] text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              Reserve Stall Space
            </Link>
            <Link
              to="/stalls"
              className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-[#2B1B17] text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Floor Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Lit Diya Garland Sequence */}
      <div className="py-4 border-b border-[#D9A441]/20 bg-[#380F17] flex items-center justify-center gap-6 sm:gap-12 overflow-hidden px-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex flex-col items-center group select-none">
            {/* Flickering Flame */}
            <div className="w-2.5 h-3.5 rounded-full bg-gradient-to-t from-[#B85C38] via-[#D9A441] to-[#FFE8B3] diya-flame" />
            {/* Clay Diya Base */}
            <div className="w-6 h-2 rounded-b-full bg-[#B85C38] border-t border-[#D9A441]/40 shadow-[0_2px_6px_rgba(217,164,65,0.4)]" />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#D9A441]/20">
          {/* Brand Presentation */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full border border-[#D9A441] bg-[#360F17] flex items-center justify-center text-[#D9A441]">
                <UdaanEmblem size={16} />
              </div>
              <span className="font-serif text-3xl tracking-[0.2em] font-bold text-[#FFFAF2] group-hover:text-[#D9A441] transition-colors">
                UDAAN
              </span>
            </Link>

            <p className="font-hindi text-lg text-[#D9A441] font-normal leading-snug">
              महिलाओं की नई पहचान
            </p>

            <p className="font-sans text-xs text-[#FFFAF2]/80 leading-relaxed max-w-sm">
              Bihar’s benchmark luxury exhibition celebrating women entrepreneurs, couturiers, jewellers, and lifestyle visionaries. Curated with pride in Patna.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="Instagram"
                className="w-9 h-9 rounded-full border border-[#D9A441]/40 bg-[#360F17] flex items-center justify-center text-[#FFFAF2] hover:text-[#D9A441] hover:border-[#D9A441] transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="Facebook"
                className="w-9 h-9 rounded-full border border-[#D9A441]/40 bg-[#360F17] flex items-center justify-center text-[#FFFAF2] hover:text-[#D9A441] hover:border-[#D9A441] transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#D9A441] font-semibold font-sans">
              Exhibitions
            </h4>
            <ul className="space-y-2 text-xs text-[#FFFAF2]/80 font-sans">
              <li><Link to="/events" className="hover:text-[#D9A441] transition-colors">Curated Calendar</Link></li>
              <li><Link to="/events/glamour-gala-5" className="hover:text-[#D9A441] transition-colors">Diwali Edition 5</Link></li>
              <li><Link to="/stalls" className="hover:text-[#D9A441] transition-colors">Floor Plan Map</Link></li>
              <li><Link to="/exhibitors" className="hover:text-[#D9A441] transition-colors">Women Artisans Directory</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#D9A441] font-semibold font-sans">
              Participation
            </h4>
            <ul className="space-y-2 text-xs text-[#FFFAF2]/80 font-sans">
              <li><Link to="/apply" className="hover:text-[#D9A441] transition-colors">Book a Stall (3-Step)</Link></li>
              <li><Link to="/archive" className="hover:text-[#D9A441] transition-colors">Udaan Visual Archive</Link></li>
              <li><Link to="/stalls" className="hover:text-[#D9A441] transition-colors">Tangerine Grand Floor Map</Link></li>
              <li><Link to="/about" className="hover:text-[#D9A441] transition-colors">Our Story & Purpose</Link></li>
              <li><Link to="/faq" className="hover:text-[#D9A441] transition-colors">Exhibitor Guidelines</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#D9A441] font-semibold font-sans">
              The Udaan Gazette
            </h4>
            <p className="text-xs text-[#FFFAF2]/80 leading-relaxed font-sans">
              Receive curated festive catalogues, stall availability alerts, and early VIP invitations.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#360F17] border border-[#D9A441] text-[#D9A441] text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>You are subscribed to the UDAAN VIP Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full h-[48px] px-4 pr-12 rounded-full bg-[#360F17] border border-[#D9A441]/40 text-[#FFFAF2] placeholder-[#FFFAF2]/40 text-xs focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    data-cursor="Join"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#D9A441] text-[#2B1B17] hover:bg-[#FFE8B3] flex items-center justify-center transition-all duration-300"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <p className="text-[10px] text-[#FFFAF2]/50 tracking-wider">
                  Zero spam. Curated festive dispatches only.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-wider text-[#FFFAF2]/70 font-sans">
          <div className="flex items-center gap-3">
            <span>© 2026 UDAAN EXHIBITIONS</span>
            <span>•</span>
            <span>LEMON TREE PREMIER, PATNA</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-[#D9A441] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-[#D9A441] transition-colors">Terms of Exhibition</Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              data-cursor="Top"
              className="flex items-center gap-1.5 text-[#D9A441] hover:text-[#FFE8B3] font-medium transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
