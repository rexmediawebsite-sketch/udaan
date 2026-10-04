import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BrandStory from '../components/BrandStory';
import FeaturedEvent from '../components/FeaturedEvent';
import EventPosterGallery from '../components/EventPosterGallery';
import CategoriesSection from '../components/CategoriesSection';
import StallMap from '../components/StallMap';
import WhyExhibit from '../components/WhyExhibit';
import VisitorExperience from '../components/VisitorExperience';
import GallerySection from '../components/GallerySection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

export default function HomePage({ onOpenBooking, onSelectStall }) {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { id: 'hero', label: '01 Cover' },
    { id: 'event', label: '02 Exhibition' },
    { id: 'story', label: '03 Ecosystem' },
    { id: 'categories', label: '04 Pavilions' },
    { id: 'stall-map', label: '05 Stalls' },
  ];

  const scrollToChapter = (id, idx) => {
    setActiveChapter(idx);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observers = [];
    chapters.forEach((ch, idx) => {
      const el = document.getElementById(ch.id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
                setActiveChapter(idx);
              }
            });
          },
          { threshold: [0.35, 0.6] }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="relative bg-[#FAF4EB] text-[#2A1C24] overflow-hidden">
      {/* =========================================================================
          RIGHT-ANCHORED VERTICAL CHAPTER PILL PAGINATION (Solid ivory capsule - zero blur)
          ========================================================================= */}
      <aside
        aria-label="Chapter Deck Navigation"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3.5 py-4 px-2 rounded-full bg-[#FFFBF5] border border-[#E9AD83]/30 shadow-lg pointer-events-auto"
      >
        {chapters.map((ch, idx) => {
          const isActive = activeChapter === idx;
          return (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id, idx)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              aria-label={`Jump to ${ch.label}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#B96535] border border-[#FAF4EB] scale-125 shadow-[0_0_8px_#B96535]'
                    : 'w-2 h-2 bg-[#E9AD83]/50 border border-[#E9AD83]/40 hover:border-[#B96535] hover:bg-[#B96535]'
                }`}
              />
              <span className="absolute right-8 px-2.5 py-1 rounded text-[9px] tracking-[0.2em] uppercase font-sans font-medium bg-[#2A1C24] text-[#FFF1D9] border border-[#E9AD83]/30 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-xl">
                {ch.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* 1. Cinematic Hero with Fullscreen Video & Floating Doves (Slide 0: 100vh) */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. Featured Event: Glamour Gala Diwali Edition 5 */}
      <FeaturedEvent onOpenBooking={onOpenBooking} />

      {/* 2B. 3D Perspective Hover Poster Gallery: Past Editions & Upcoming Showcases */}
      <EventPosterGallery onOpenBooking={onOpenBooking} />

      {/* 3. Brand Story & The 4 Pillars */}
      <BrandStory onOpenBooking={onOpenBooking} />

      {/* 4. The 6 Curated Categories */}
      <CategoriesSection
        onSelectCategoryFilter={(cat) => onOpenBooking(cat)}
        onOpenBooking={(cat) => onOpenBooking(cat)}
      />

      {/* 5. Interactive Stall Map Preview */}
      <StallMap onSelectStallForBooking={onSelectStall} />

      {/* 6. Why Exhibit Value Proposition */}
      <WhyExhibit onOpenBooking={onOpenBooking} />

      {/* 7. Visitor Experience & VIP Pass RSVP */}
      <VisitorExperience />

      {/* 8. Visual Archive Gallery */}
      <GallerySection />

      {/* 9. FAQ & Contact Preview */}
      <FAQSection />
      <ContactSection />
    </div>
  );
}
