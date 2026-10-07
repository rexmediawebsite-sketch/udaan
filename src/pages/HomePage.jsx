import React from 'react';
import Hero from '../components/Hero';
import HomeStatsStrip from '../components/HomeStatsStrip';
import BrandStory from '../components/BrandStory';
import EventPosterGallery from '../components/EventPosterGallery';
import HomeFeaturedTeaser from '../components/HomeFeaturedTeaser';
import HomePavilionsTeaser from '../components/HomePavilionsTeaser';
import HomeStallMapTeaser from '../components/HomeStallMapTeaser';
import HomeWhyExhibitTeaser from '../components/HomeWhyExhibitTeaser';
import ReleaseYourUdaanFinale from '../components/ReleaseYourUdaanFinale';

export default function HomePage({ onOpenBooking, onSelectStall }) {
  return (
    <div className="relative bg-[#FBF4EA] text-[#2B1B17] overflow-x-clip selection:bg-[#D9A441]/30 selection:text-[#4A1620]">
      {/* 1. Cinematic Hero with Deep Sunset & Doves (Decluttered, Pristine) */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 2. The UDAAN Ecosystem: Where Women Build Brands */}
      <BrandStory onOpenBooking={onOpenBooking} />

      {/* 3. Dynamic Metric Strip with Animated Numbers (Shifted right above Collections) */}
      <HomeStatsStrip />

      {/* 4. 3D Curved Cylinder Panoramic Ribbon: Bespoke Festive Collections */}
      <EventPosterGallery onOpenBooking={onOpenBooking} />

      {/* 5. What's Happening at UDAAN: Flagship Showcase (55% Media / 45% Card) */}
      <HomeFeaturedTeaser onOpenBooking={onOpenBooking} />

      {/* 6. Six Curated Exhibition Pavilions */}
      <HomePavilionsTeaser />


      {/* 8. Interactive Tangerine Grand Stall Map Console */}
      <HomeStallMapTeaser onOpenBooking={onOpenBooking} onSelectStall={onSelectStall} />

      {/* 8. Why Exhibit with UDAAN: Founder Value Proposition */}
      <HomeWhyExhibitTeaser onOpenBooking={onOpenBooking} />

      {/* 9. The Grand Finale: Release Your Udaan (Dove Flight & Confetti) */}
      <ReleaseYourUdaanFinale onOpenBooking={onOpenBooking} />
    </div>
  );
}
