import React from 'react';
import CinematicIntro from '../components/CinematicIntro';
import Hero from '../components/Hero';
import HomeStatsStrip from '../components/HomeStatsStrip';
import HomeFeaturedTeaser from '../components/HomeFeaturedTeaser';
import HomePavilionsTeaser from '../components/HomePavilionsTeaser';
import HomeStallMapTeaser from '../components/HomeStallMapTeaser';
import HomeWhyExhibitTeaser from '../components/HomeWhyExhibitTeaser';
import EventPosterGallery from '../components/EventPosterGallery';
import ReleaseYourUdaanFinale from '../components/ReleaseYourUdaanFinale';

export default function HomePage({ onOpenBooking, onSelectStall }) {
  return (
    <div className="relative bg-[#FBF4EA] text-[#2B1B17] overflow-hidden">
      {/* 1. First Visit Cinematic Intro (Skippable from 0s, max 3.5s) */}
      <CinematicIntro />

      {/* 2. Minimal Cinematic Hero (Vertically Balanced, Large UDAAN, Scrim Date, Gold CTAs) */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* 3. Big Number Stats Strip (Dark Espresso Band) */}
      <HomeStatsStrip />

      {/* 4. When & Where: Glamour Gala Diwali Edition 5 (55% Image / 45% Card Split Row) */}
      <HomeFeaturedTeaser onOpenBooking={onOpenBooking} />

      {/* 5. Who Exhibits: Six Curated Pavilions Grid */}
      <HomePavilionsTeaser />

      {/* 6. See the Floor: Architectural Tangerine Grand Floor Plan Preview */}
      <HomeStallMapTeaser />

      {/* 7. How to Book: Why Exhibit 3 Luxury Cards with Photographic Overlap */}
      <HomeWhyExhibitTeaser onOpenBooking={onOpenBooking} />

      {/* 8. Proof: An Archive of Celebrations (Continuous Left-to-Right 3D Curved Carousel) */}
      <EventPosterGallery onOpenBooking={onOpenBooking} />

      {/* 9. Final CTA: Release Your Udaan Origami Dove Finale */}
      <ReleaseYourUdaanFinale onOpenBooking={onOpenBooking} />
    </div>
  );
}
