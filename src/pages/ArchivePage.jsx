import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Maximize2,
  Sliders,
  Layers,
  Award
} from 'lucide-react';
import { UdaanDiamond, UdaanEmblem } from '../components/UdaanIcons';
import { EVENTS_CATALOG } from '../data/eventsCatalog';
import { FEATURED_EVENT } from '../data/eventData';
import ArchiveRotatingHero from '../components/ArchiveRotatingHero';

export default function ArchivePage({ onOpenBooking }) {
  const navigate = useNavigate();

  // Past events sorted chronologically (2022 -> 2024)
  const pastEvents = EVENTS_CATALOG.filter((e) => e.status === 'past').sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  // Active timeline node state
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Fullscreen Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Then/Now slider position (0 to 100)
  const [sliderPos, setSliderPos] = useState(50);
  const isDraggingSlider = useRef(false);
  const sliderRef = useRef(null);

  // 12 Curated Archival Moments for The Archive Wall
  const archiveWallPhotos = [
    {
      id: "aw-1",
      title: "The Inaugural Lighting",
      subtitle: "Patna • October 2022",
      event: "Diwali Inaugural Edition 01",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      aspect: "portrait",
      rotate: "-rotate-1",
      caption: "The inaugural ceremonial flame at Hotel Maurya that ignited the UDAAN movement for women founders.",
    },
    {
      id: "aw-2",
      title: "Handloom Brocade Drapes",
      subtitle: "Heirloom Weaves • 2022",
      event: "Diwali Inaugural Edition 01",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
      aspect: "landscape",
      rotate: "rotate-1",
      caption: "Generational zari craftsmanship brought directly to Patna patrons by master craftswomen.",
    },
    {
      id: "aw-3",
      title: "Spring Pastel Pret",
      subtitle: "March 2023 Showcase",
      event: "Spring Soirée Edition 02",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      aspect: "square",
      rotate: "-rotate-1",
      caption: "Lightweight organza and pastel summer couture debut at the newly opened Lemon Tree Premier venue.",
    },
    {
      id: "aw-4",
      title: "Fine 925 Silver Filigree",
      subtitle: "Bespoke Jewelry Pavilion",
      event: "Spring Soirée Edition 02",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
      aspect: "portrait",
      rotate: "rotate-1",
      caption: "Intricate silver filigree and temple jewelry curated for discerning contemporary patrons.",
    },
    {
      id: "aw-5",
      title: "Patron Conversations",
      subtitle: "Founder Networking Lounge",
      event: "Festive Grandeur Edition 03",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
      aspect: "tall",
      rotate: "-rotate-1",
      caption: "Direct conversations between women entrepreneurs and high-intent festive wedding buyers.",
    },
    {
      id: "aw-6",
      title: "Festive Terracotta & Brass",
      subtitle: "Living Heritage Decor",
      event: "Festive Grandeur Edition 03",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
      aspect: "landscape",
      rotate: "rotate-0",
      caption: "Reviving ancient pottery and brass craft traditions into modern lifestyle table settings.",
    },
    {
      id: "aw-7",
      title: "Royal Polki Adornment",
      subtitle: "Bridal Suite • 2024",
      event: "Royal Heritage Edition 04",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85",
      aspect: "square",
      rotate: "rotate-1",
      caption: "Uncut diamond polki masterpieces unveiled in Tangerine Grand's 5-star climate-controlled hall.",
    },
    {
      id: "aw-8",
      title: "The Tangerine Grand Promenade",
      subtitle: "5,400+ Festive Patrons",
      event: "Royal Heritage Edition 04",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",
      aspect: "landscape",
      rotate: "-rotate-1",
      caption: "Pillarless elegance and peak shopping festive spirit across 48 handpicked women-led booths.",
    },
    {
      id: "aw-9",
      title: "Gourmet Confections & Hampers",
      subtitle: "Tasting Pavilion",
      event: "Festive Grandeur Edition 03",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
      aspect: "portrait",
      rotate: "rotate-1",
      caption: "Handmade artisanal sweets, dry fruit arrangements, and bespoke pre-Diwali gift boxes.",
    },
    {
      id: "aw-10",
      title: "Indigenous Madhubani Canvasses",
      subtitle: "Folk Art Revival",
      event: "Diwali Inaugural Edition 01",
      image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1200&q=85",
      aspect: "landscape",
      rotate: "-rotate-1",
      caption: "National award-winning master artisans showcasing natural-pigment ceremonial art.",
    },
    {
      id: "aw-11",
      title: "Artisanal Fragrance Alchemy",
      subtitle: "Pure Botanical Attars",
      event: "Spring Soirée Edition 02",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85",
      aspect: "square",
      rotate: "rotate-0",
      caption: "Steam-distilled Kannauj rose attars and hand-poured festive soy wax candlelight.",
    },
    {
      id: "aw-12",
      title: "Celebration of Independence",
      subtitle: "Where Women Build Brands",
      event: "Royal Heritage Edition 04",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
      aspect: "portrait",
      rotate: "-rotate-1",
      caption: "Entrepreneurs transforming intimate creative passion into respected regional enterprises.",
    }
  ];

  // Filmstrip Photos (Combined past moments for continuous movement)
  const filmstripPhotos = [
    { title: "Inaugural Ribbon", caption: "October 2022 • Maurya", src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
    { title: "Zari Weft & Warp", caption: "Varanasi Silk Masterpieces", src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" },
    { title: "Springtime Pret", caption: "Organza Silhouette Showcase", src: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" },
    { title: "Polki Sparkle", caption: "Uncut Diamond Jewels", src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" },
    { title: "Terracotta Glow", caption: "Festive Dining Living", src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" },
    { title: "Festive Promenade", caption: "Tangerine Grand Pavilion", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" },
    { title: "Founders In Spotlight", caption: "Women Building Brands", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
    { title: "Heirloom Kundan", caption: "Royal Heritage Edition 04", src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80" },
  ];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % archiveWallPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + archiveWallPhotos.length) % archiveWallPhotos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen, archiveWallPhotos.length]);

  // Then/Now slider drag logic
  const handleSliderMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseDown = () => {
    isDraggingSlider.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDraggingSlider.current = false;
    };
    const handleMouseMove = (e) => {
      if (isDraggingSlider.current) {
        handleSliderMove(e.clientX);
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const openLightboxAt = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FBF4EA] text-[#2B1B17] min-h-screen overflow-x-hidden selection:bg-[#4A1620]/20 selection:text-[#4A1620]">
      
      {/* =========================================================================
          1. 3D ROTATING ARCHIVE HERO (VELARA INSPIRED)
          Cylindrical orbital 3D card rotation with drag physics, editorial typography,
          frosted glass centerpiece, and interactive controls
          ========================================================================= */}
      <ArchiveRotatingHero
        onExploreTimeline={() => scrollToSection('timeline')}
        onExploreWall={() => scrollToSection('archive-wall')}
        onInspectCard={(cardIdx) => {
          const targetIndex = cardIdx % archiveWallPhotos.length;
          openLightboxAt(targetIndex);
        }}
      />


      {/* =========================================================================
          2. ARCHIVE INTRODUCTION
          Editorial museum entry: physical photo partially floating into view
          ========================================================================= */}
      <section id="archive-intro" className="relative py-28 md:py-36 bg-[#FBF4EA] border-b border-[#D9A441]/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Oversized Editorial Typography */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.3em] font-sans text-[#B85C38] uppercase font-semibold">
                <UdaanDiamond size={10} className="text-[#D9A441]" />
                <span>THE DOCUMENTARY MEMORY</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#2B1B17] font-normal tracking-tight leading-[1.05]">
                EVERY EVENT<br />
                <span className="italic text-[#4A1620] font-normal">BECAME A MEMORY.</span>
              </h2>

              <p className="font-serif text-xl sm:text-2xl text-[#B85C38] font-light italic leading-snug">
                And every memory became part of Udaan’s story.
              </p>

              <div className="pt-2 max-w-xl text-sm sm:text-base font-sans text-[#2B1B17]/75 font-light leading-relaxed space-y-4">
                <p>
                  UDAAN did not begin as an annual fair. It was founded in 2022 with a quiet, fierce conviction: that Bihar's extraordinary women creators deserved an uncompromising, 5-star stage where craft is recognized as capital, and bespoke passion becomes a recognized luxury brand.
                </p>
                <p>
                  Across four landmark chapters, what began as a 28-booth gathering at Hotel Maurya evolved into Eastern India's benchmark pre-festive luxury movement at Tangerine Grand, connecting over 120+ independent ateliers with more than 18,000 discerning patrons.
                </p>
              </div>

              <div className="pt-4 flex items-center space-x-8 text-xs font-sans text-[#4A1620]">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#4A1620] block">04</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#B85C38]">Completed Editions</span>
                </div>
                <div className="w-px h-10 bg-[#D9A441]/40" />
                <div>
                  <span className="font-serif text-3xl font-bold text-[#4A1620] block">18,000+</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#B85C38]">Patron Memories</span>
                </div>
                <div className="w-px h-10 bg-[#D9A441]/40" />
                <div>
                  <span className="font-serif text-3xl font-bold text-[#4A1620] block">120+</span>
                  <span className="text-[10px] tracking-widest uppercase text-[#B85C38]">Women Brands</span>
                </div>
              </div>
            </div>

            {/* Right: Floating Archival Photograph with Realistic Paper Border */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative p-3.5 sm:p-5 bg-[#FFFDF9] rounded-2xl border border-[#D9A441]/35 shadow-[0_25px_50px_-12px_rgba(74,22,32,0.25)] -rotate-2 hover:rotate-0 transition-transform duration-700 ease-out max-w-md w-full">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#2B1B17]">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85"
                    alt="The Inaugural UDAAN Exhibition 2022"
                    className="w-full h-full object-cover filter saturate-[1.08] hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/60 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#FFFAF2] text-[9px] font-sans font-semibold tracking-widest uppercase">
                    ARCHIVAL PRINT • OCT 2022
                  </div>
                </div>

                {/* Hand-written style archival footnote */}
                <div className="pt-4 text-center">
                  <p className="font-serif italic text-xs text-[#2B1B17]/80">
                    “Patna • Autumn 2022 • The first 28 founders step into the light.”
                  </p>
                  <span className="text-[9px] font-sans tracking-[0.25em] text-[#B85C38] uppercase font-semibold block mt-1">
                    HOTEL MAURYA • KAUTILYA HALL
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          3. SOPHISTICATED VERTICAL TIMELINE
          Title: THE JOURNEY — milestone nodes connecting all editions
          ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FAF4EB] border-b border-[#D9A441]/20">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-sans text-[#B85C38] uppercase font-semibold">
              CHRONICLE OF MILESTONES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight">
              <span className="text-shimmer-maroon">THE JOURNEY</span>
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#2B1B17]/75">
              A timeline of the moments that shaped Udaan.
            </p>
          </div>

          {/* Interactive Editorial Timeline Strip */}
          <div className="relative">
            {/* Center Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D9A441]/20 via-[#D9A441]/50 to-[#D9A441]/20 -translate-x-1/2 pointer-events-none" />

            <div className="space-y-12 md:space-y-16">
              
              {/* Timeline Node 1: 2022 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="w-full md:w-[45%] text-left md:text-right space-y-2 order-2 md:order-1">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B85C38] uppercase">
                    CHAPTER 01 • INAUGURAL
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-semibold">
                    Diwali Inaugural Edition
                  </h3>
                  <p className="text-xs text-[#2B1B17]/70 font-sans leading-relaxed">
                    15 & 16 October 2022 • Hotel Maurya, Patna. The founding room that started it all with 28 daring women labels.
                  </p>
                  <button
                    onClick={() => scrollToSection('chapter-01')}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#B85C38] hover:text-[#B8801F] font-semibold tracking-wider uppercase pt-1"
                  >
                    <span>Inspect Chapter</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                {/* Timeline Center Badge */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#FFFBF5] border-2 border-[#D9A441] shadow-md flex items-center justify-center font-serif font-bold text-xs text-[#4A1620] order-1 md:order-2 shrink-0 group-hover:scale-110 group-hover:bg-[#4A1620] group-hover:text-[#FFFAF2] transition-all">
                  '22
                </div>

                <div className="w-full md:w-[45%] order-3">
                  <div 
                    onClick={() => scrollToSection('chapter-01')}
                    className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#D9A441]/30 shadow-md cursor-pointer hover:shadow-xl transition-all"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" 
                      alt="Diwali Inaugural 2022" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Node 2: 2023 Spring */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="w-full md:w-[45%] order-3 md:order-1">
                  <div 
                    onClick={() => scrollToSection('chapter-02')}
                    className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#D9A441]/30 shadow-md cursor-pointer hover:shadow-xl transition-all"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" 
                      alt="Spring Soirée 2023" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Timeline Center Badge */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#FFFBF5] border-2 border-[#D9A441] shadow-md flex items-center justify-center font-serif font-bold text-xs text-[#4A1620] order-1 md:order-2 shrink-0 group-hover:scale-110 group-hover:bg-[#4A1620] group-hover:text-[#FFFAF2] transition-all">
                  '23
                </div>

                <div className="w-full md:w-[45%] text-left space-y-2 order-2 md:order-3">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B85C38] uppercase">
                    CHAPTER 02 • EXPANSION
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-semibold">
                    Spring Soirée Edition
                  </h3>
                  <p className="text-xs text-[#2B1B17]/70 font-sans leading-relaxed">
                    18 & 19 March 2023 • Lemon Tree Premier. Introducing summer festive pastels and pure silver jewelry across 5 cities.
                  </p>
                  <button
                    onClick={() => scrollToSection('chapter-02')}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#B85C38] hover:text-[#B8801F] font-semibold tracking-wider uppercase pt-1"
                  >
                    <span>Inspect Chapter</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Timeline Node 3: 2023 Autumn */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="w-full md:w-[45%] text-left md:text-right space-y-2 order-2 md:order-1">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B85C38] uppercase">
                    CHAPTER 03 • GRANDEUR
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-semibold">
                    Festive Grandeur Edition
                  </h3>
                  <p className="text-xs text-[#2B1B17]/70 font-sans leading-relaxed">
                    21 & 22 October 2023 • Lemon Tree Premier. Solidifying the benchmark pre-Diwali format with 42 exclusive brands.
                  </p>
                  <button
                    onClick={() => scrollToSection('chapter-03')}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#B85C38] hover:text-[#B8801F] font-semibold tracking-wider uppercase pt-1"
                  >
                    <span>Inspect Chapter</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                {/* Timeline Center Badge */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#FFFBF5] border-2 border-[#D9A441] shadow-md flex items-center justify-center font-serif font-bold text-xs text-[#4A1620] order-1 md:order-2 shrink-0 group-hover:scale-110 group-hover:bg-[#4A1620] group-hover:text-[#FFFAF2] transition-all">
                  '23
                </div>

                <div className="w-full md:w-[45%] order-3">
                  <div 
                    onClick={() => scrollToSection('chapter-03')}
                    className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#D9A441]/30 shadow-md cursor-pointer hover:shadow-xl transition-all"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80" 
                      alt="Festive Grandeur 2023" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Node 4: 2024 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="w-full md:w-[45%] order-3 md:order-1">
                  <div 
                    onClick={() => scrollToSection('chapter-04')}
                    className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#D9A441]/30 shadow-md cursor-pointer hover:shadow-xl transition-all"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" 
                      alt="Royal Heritage 2024" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Timeline Center Badge */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#FFFBF5] border-2 border-[#D9A441] shadow-md flex items-center justify-center font-serif font-bold text-xs text-[#4A1620] order-1 md:order-2 shrink-0 group-hover:scale-110 group-hover:bg-[#4A1620] group-hover:text-[#FFFAF2] transition-all">
                  '24
                </div>

                <div className="w-full md:w-[45%] text-left space-y-2 order-2 md:order-3">
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#B85C38] uppercase">
                    CHAPTER 04 • MOVEMENT
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-semibold">
                    Royal Heritage Edition
                  </h3>
                  <p className="text-xs text-[#2B1B17]/70 font-sans leading-relaxed">
                    02 & 03 November 2024 • Tangerine Grand. A record 5,400+ patrons and 48 brands across 4 Indian states.
                  </p>
                  <button
                    onClick={() => scrollToSection('chapter-04')}
                    className="inline-flex items-center space-x-1.5 text-xs text-[#B85C38] hover:text-[#B8801F] font-semibold tracking-wider uppercase pt-1"
                  >
                    <span>Inspect Chapter</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. EVENT CHAPTER SYSTEM (Art-Directed Museum Catalogue)
          Asymmetric layouts:
          Chapter 01: Image Right / Text Left
          Chapter 02: Full-Bleed Immersive Card
          Chapter 03: Image Left / Text Right
          Chapter 04: Centered Portrait Showcase with Split Wings
          ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#FBF4EA] space-y-28 md:space-y-36">
        
        {/* CHAPTER 01: DIWALI INAUGURAL (Image Right / Text Left) */}
        <div id="chapter-01" className="max-w-6xl mx-auto px-6 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-[#B85C38] uppercase">
                  CHAPTER 01 / 2022
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#2B1B17] font-bold tracking-tight">
                  Diwali Inaugural
                </h2>
                <div className="flex items-center gap-2 text-xs font-sans text-[#4A1620] font-semibold tracking-wider uppercase">
                  <span>EDITION 01</span>
                  <span>•</span>
                  <span>HOTEL MAURYA, PATNA</span>
                </div>
              </div>

              <p className="font-serif italic text-lg text-[#B85C38] leading-relaxed">
                “Where the UDAAN journey took flight. Conceived to give Bihar's women entrepreneurs an uncompromising luxury stage.”
              </p>

              <p className="text-xs sm:text-sm font-sans text-[#2B1B17]/80 font-light leading-relaxed">
                The founding edition launched with 28 daring women creators, master Banarasi weavers, and handcraft ateliers. Over two unforgettable days, 3,200+ patrons proved that Patna had an undeniable appetite for verified, women-led luxury.
              </p>

              {/* Verified Facts from Catalog */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#D9A441]/25 text-center">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#4A1620]">28</span>
                  <span className="block text-[9.5px] font-sans tracking-widest text-[#B85C38] uppercase mt-0.5">Pioneer Brands</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#4A1620]">3,200+</span>
                  <span className="block text-[9.5px] font-sans tracking-widest text-[#B85C38] uppercase mt-0.5">Inaugural Patrons</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#4A1620]">Oct '22</span>
                  <span className="block text-[9.5px] font-sans tracking-widest text-[#B85C38] uppercase mt-0.5">Founding Date</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/events/diwali-inaugural-edition-1"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A1620] hover:bg-[#380F17] text-[#FFFAF2] text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md group"
                >
                  <span>ENTER CHAPTER 01</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[#D9A441]/40 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
                  alt="Diwali Inaugural Edition 01"
                  className="w-full h-full object-cover filter saturate-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#FFFAF2]">
                  <div>
                    <span className="text-[10px] tracking-widest font-sans uppercase text-[#D9A441] block">HISTORICAL VENUE</span>
                    <span className="font-serif text-base sm:text-lg">Kautilya Hall, Hotel Maurya</span>
                  </div>
                  <span className="font-mono text-xs text-[#FFFAF2]/80">15-16 OCT 2022</span>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* Memory Transition Bridge 1 */}
        <div className="text-center py-6">
          <p className="font-serif italic text-base sm:text-lg text-[#B85C38]">
            “One event became many stories. A memory etched into Udaan’s foundation.”
          </p>
          <div className="w-16 h-px bg-[#D9A441]/50 mx-auto mt-3" />
        </div>


        {/* CHAPTER 02: SPRING SOIRÉE (Full-Bleed Immersive Card with Overlay) */}
        <div id="chapter-02" className="max-w-6xl mx-auto px-6 scroll-mt-28">
          <div className="relative rounded-3xl overflow-hidden border border-[#D9A441]/40 shadow-2xl bg-[#2B1B17]">
            {/* Background Full-Bleed Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 filter saturate-[1.1] scale-105 hover:scale-100 transition-transform duration-1000"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B1B17] via-[#2B1B17]/85 to-transparent pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl text-[#FFFAF2] space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#D9A441] uppercase">
                  CHAPTER 02 / 2023
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl text-[#FFFAF2] font-bold tracking-tight">
                  Spring Soirée
                </h2>
                <div className="text-xs font-sans text-[#D9A441] tracking-widest uppercase">
                  EDITION 02 • LEMON TREE PREMIER, PATNA
                </div>
              </div>

              <p className="font-serif italic text-base sm:text-xl text-[#FFFAF2]/95 leading-relaxed">
                “Introducing summer festive pastels, lightweight wedding wear, and pure silver jewellery in an intimate 5-star hotel setting.”
              </p>

              <p className="text-xs sm:text-sm font-sans text-[#FFFAF2]/80 font-light leading-relaxed">
                The spring edition introduced lightweight pastel festive wear and fine 925 silver jewellery collections, expanding UDAAN from a single annual festival to a multi-season growth platform for women entrepreneurs across 5 cities.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-sans text-[#FFFAF2]/90">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#D9A441]">35</span>
                  <span className="block text-[9px] tracking-widest text-[#FFFAF2]/70 uppercase">Curated Labels</span>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <span className="font-serif text-2xl font-bold text-[#D9A441]">4,100+</span>
                  <span className="block text-[9px] tracking-widest text-[#FFFAF2]/70 uppercase">Visitors</span>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <span className="font-serif text-2xl font-bold text-[#D9A441]">5 Cities</span>
                  <span className="block text-[9px] tracking-widest text-[#FFFAF2]/70 uppercase">Regional Reach</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/events/spring-soiree-edition-2"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9A441] hover:bg-[#B8801F] text-[#2B1B17] text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md group"
                >
                  <span>ENTER CHAPTER 02</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>


        {/* Memory Transition Bridge 2 */}
        <div className="text-center py-6">
          <p className="font-serif italic text-base sm:text-lg text-[#B85C38]">
            “One stall became a brand’s first opportunity. And confidence began to spread.”
          </p>
          <div className="w-16 h-px bg-[#D9A441]/50 mx-auto mt-3" />
        </div>


        {/* CHAPTER 03: FESTIVE GRANDEUR (Image Left / Text Right) */}
        <div id="chapter-03" className="max-w-6xl mx-auto px-6 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[#D9A441]/40 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85"
                  alt="Festive Grandeur Edition 03"
                  className="w-full h-full object-cover filter saturate-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#FFFAF2]">
                  <div>
                    <span className="text-[10px] tracking-widest font-sans uppercase text-[#D9A441] block">PATRON FAVORITE</span>
                    <span className="font-serif text-base sm:text-lg">Tangerine Grand, Lemon Tree Premier</span>
                  </div>
                  <span className="font-mono text-xs text-[#FFFAF2]/80">21-22 OCT 2023</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <div className="space-y-2">
                <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-[#B85C38] uppercase">
                  CHAPTER 03 / 2023
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#2B1B17] font-bold tracking-tight">
                  Festive Grandeur
                </h2>
                <div className="flex items-center gap-2 text-xs font-sans text-[#4A1620] font-semibold tracking-wider uppercase">
                  <span>EDITION 03</span>
                  <span>•</span>
                  <span>TANGERINE GRAND, PATNA</span>
                </div>
              </div>

              <p className="font-serif italic text-lg text-[#B85C38] leading-relaxed">
                “Solidifying UDAAN as Bihar's premier pre-Diwali destination with 42 exclusive brands and record footfall.”
              </p>

              <p className="text-xs sm:text-sm font-sans text-[#2B1B17]/80 font-light leading-relaxed">
                The 3rd chapter established UDAAN's hallmark 5-star festive pre-Diwali format. Over 4,800 affluent patrons visited Tangerine Grand, exploring handloom lehengas, temple jewels, artisanal scented candles, and luxury dry fruit gift boxes.
              </p>

              <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#D9A441]/25 text-center">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#4A1620]">42</span>
                  <span className="block text-[9.5px] font-sans tracking-widest text-[#B85C38] uppercase mt-0.5">Exclusive Brands</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#4A1620]">4,800+</span>
                  <span className="block text-[9.5px] font-sans tracking-widest text-[#B85C38] uppercase mt-0.5">Festive Patrons</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#4A1620]">4.9/5</span>
                  <span className="block text-[9.5px] font-sans tracking-widest text-[#B85C38] uppercase mt-0.5">Patron Rating</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/events/festive-grandeur-edition-3"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A1620] hover:bg-[#380F17] text-[#FFFAF2] text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md group"
                >
                  <span>ENTER CHAPTER 03</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>


        {/* Memory Transition Bridge 3 */}
        <div className="text-center py-6">
          <p className="font-serif italic text-base sm:text-lg text-[#B85C38]">
            “One connection became a collaboration. The ecosystem gained unstoppable momentum.”
          </p>
          <div className="w-16 h-px bg-[#D9A441]/50 mx-auto mt-3" />
        </div>


        {/* CHAPTER 04: ROYAL HERITAGE (Centered Portrait Showcase with Split Wings) */}
        <div id="chapter-04" className="max-w-6xl mx-auto px-6 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.3em] text-[#B85C38] uppercase">
              CHAPTER 04 / 2024
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] font-bold tracking-tight">
              Royal Heritage
            </h2>
            <p className="text-xs font-sans text-[#B85C38] tracking-widest uppercase font-semibold">
              EDITION 04 • 02 & 03 NOVEMBER 2024 • LEMON TREE PREMIER
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative Wing */}
            <div className="lg:col-span-4 space-y-4 text-left lg:text-right">
              <h3 className="font-serif text-2xl text-[#4A1620] font-bold">
                The Pillarless Landmark
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#2B1B17]/75 font-light leading-relaxed">
                Edition 4 marked UDAAN's transition to the newly opened Tangerine Grand pillarless hall at Lemon Tree Premier. 48 women entrepreneurs recorded extraordinary sales across bridal trousseau, fine 925 silver filigree, and festive home decor.
              </p>
              <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#D9A441]/30">
                <span className="font-serif text-2xl font-bold text-[#B85C38] block">5,400+</span>
                <span className="text-[10px] tracking-wider uppercase text-[#2B1B17]/70 font-sans">Verified High-Intent Patrons</span>
              </div>
            </div>

            {/* Center Portrait Masterpiece Showcase */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] w-full max-w-sm border-2 border-[#D9A441]/50 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85"
                  alt="Royal Heritage Tangerine Grand"
                  className="w-full h-full object-cover filter saturate-[1.1] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 inset-x-5 text-center text-[#FFFAF2]">
                  <span className="text-[10px] tracking-widest uppercase text-[#D9A441] block">PATNA'S 5-STAR RECORD</span>
                  <span className="font-serif text-sm">48 Brands • 4 States Participating</span>
                </div>
              </div>
            </div>

            {/* Right Curation Wing */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <h3 className="font-serif text-2xl text-[#4A1620] font-bold">
                A Statewide Movement
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#2B1B17]/75 font-light leading-relaxed">
                Inaugurated by prominent regional dignitaries celebrating women founders. Over 92% of exhibitors immediately re-registered, proving UDAAN's role as Bihar's most commercially valuable platform.
              </p>
              <div className="pt-2">
                <Link
                  to="/events/royal-heritage-edition-4"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A1620] hover:bg-[#380F17] text-[#FFFAF2] text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all shadow-md group"
                >
                  <span>ENTER CHAPTER 04</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* =========================================================================
          5. THE ARCHIVE WALL
          Curated editorial photo wall with varied sizes, organic paper borders,
          interactive hover, and click-to-open Fullscreen Lightbox
          ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#FFFBF5] border-y border-[#D9A441]/20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] tracking-[0.3em] font-sans text-[#B85C38] uppercase font-semibold">
              CURATED PHOTOGRAPHY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] font-normal tracking-tight">
              THE ARCHIVE WALL
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#2B1B17]/75">
              A collection of moments from Udaan’s journey. Click any photograph to inspect.
            </p>
          </div>

          {/* Asymmetric Gallery Grid with Subtle Rotations and Paper Borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {archiveWallPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => openLightboxAt(idx)}
                className={`relative p-3 bg-white rounded-2xl border border-[#D9A441]/30 shadow-md hover:shadow-2xl hover:border-[#D9A441] transition-all duration-400 ease-out cursor-pointer group ${photo.rotate} hover:rotate-0 hover:scale-[1.02] hover:z-20`}
              >
                <div className={`relative overflow-hidden rounded-xl bg-[#2B1B17] ${
                  photo.aspect === 'portrait' ? 'aspect-[3/4]' :
                  photo.aspect === 'tall' ? 'aspect-[2/3]' :
                  photo.aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'
                }`}>
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover filter saturate-[1.08] group-hover:scale-106 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B17]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Floating Overlay Tag */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#D9A441] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 size={12} />
                  </div>
                </div>

                {/* Archival Label Below Image */}
                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between text-[9px] font-sans tracking-widest text-[#B85C38] uppercase font-semibold">
                    <span>{photo.event}</span>
                    <span className="text-[#2B1B17]/40">#{idx + 1}</span>
                  </div>
                  <h4 className="font-serif text-base text-[#2B1B17] font-semibold leading-snug group-hover:text-[#B85C38] transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] font-sans text-[#2B1B17]/65 line-clamp-2 leading-relaxed font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          6. “THROUGH OUR LENS” FILMSTRIP
          Silky continuous horizontal movement, pauses on hover, opens Lightbox
          ========================================================================= */}
      <section className="py-24 bg-[#2B1B17] text-[#FFFAF2] overflow-hidden select-none border-b border-[#D9A441]/20">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] font-sans text-[#D9A441] uppercase font-semibold">
            CINEMATIC FILMSTRIP
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#FFFAF2] font-normal tracking-tight">
            THROUGH OUR LENS
          </h2>
          <p className="font-serif italic text-base text-[#FFFAF2]/75">
            The moments that photographs remember. Hover to pause.
          </p>
        </div>

        {/* Filmstrip Continuous Marquee Track */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Vignette Fades */}
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#2B1B17] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#2B1B17] to-transparent z-10 pointer-events-none" />

          <div className="animate-filmstrip flex gap-6 py-4 px-6">
            {/* Render filmstrip items twice for seamless loop */}
            {[...filmstripPhotos, ...filmstripPhotos].map((item, i) => (
              <div
                key={i}
                onClick={() => openLightboxAt(i % archiveWallPhotos.length)}
                className="w-72 sm:w-80 shrink-0 rounded-2xl overflow-hidden bg-[#380F17] border border-[#D9A441]/35 shadow-xl cursor-pointer group hover:border-[#D9A441] transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black/40 relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover filter saturate-[1.1] group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-3 left-4 right-4 text-[#FFFAF2]">
                    <span className="text-[9px] tracking-widest uppercase text-[#D9A441] font-sans block">
                      {item.caption}
                    </span>
                    <h5 className="font-serif text-sm font-semibold text-[#FFFAF2]">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          7. “LOOK HOW FAR WE’VE COME” (THEN → NOW INTERACTION)
          Draggable vertical comparison slider between Inaugural (2022) vs Modern (2024–2026)
          ========================================================================= */}
      <section className="py-24 md:py-36 bg-[#FBF4EA] border-b border-[#D9A441]/20">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-[10px] tracking-[0.3em] font-sans text-[#B85C38] uppercase font-semibold">
              THE TRANSFORMATION
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B1B17] font-normal tracking-tight">
              LOOK HOW FAR<br />
              <span className="italic text-[#4A1620]">WE’VE COME.</span>
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#2B1B17]/75">
              From a passionate founding room in 2022 to Bihar's benchmark luxury stage.
            </p>
          </div>

          {/* Interactive Then / Now Comparison Widget */}
          <div className="max-w-4xl mx-auto">
            <div
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-[#D9A441]/40 shadow-2xl cursor-ew-resize select-none"
            >
              {/* NOW (Right Image / Full Base) */}
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85"
                alt="NOW: Lemon Tree Premier Tangerine Grand"
                className="absolute inset-0 w-full h-full object-cover filter saturate-[1.1]"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 py-1.5 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#FFFAF2] text-xs font-sans font-bold tracking-widest uppercase shadow-md">
                NOW • TANGERINE GRAND (2024–2026)
              </div>

              {/* THEN (Left Image / Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                  alt="THEN: Hotel Maurya Inaugural 2022"
                  className="absolute inset-0 w-full h-full object-cover filter saturate-[1.1] max-w-none"
                  style={{ width: sliderRef.current ? `${sliderRef.current.clientWidth}px` : '100%' }}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-1.5 rounded-full bg-[#2B1B17]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#FFFAF2] text-xs font-sans font-bold tracking-widest uppercase shadow-md">
                  THEN • HOTEL MAURYA (OCT 2022)
                </div>
              </div>

              {/* Draggable Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#D9A441] shadow-[0_0_15px_rgba(217,164,65,0.8)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-[#4A1620] border-2 border-[#D9A441] text-[#FFFAF2] text-[10px] font-sans font-bold tracking-widest uppercase shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                  <span>THEN</span>
                  <span>|</span>
                  <span>NOW</span>
                </div>
              </div>
            </div>

            {/* Instruction footnote */}
            <div className="flex items-center justify-between text-xs font-sans text-[#2B1B17]/60 pt-4 px-2">
              <span>← Drag slider to reveal 2022 founding room</span>
              <span className="hidden sm:inline">Interactive Archive Comparison</span>
              <span>Reveal 2026 Tangerine Grand 5-Star Hall →</span>
            </div>

            {/* Growth Summary Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-5 rounded-2xl bg-[#FFFBF5] border border-[#D9A441]/30 text-center">
                <span className="text-[10px] tracking-widest uppercase text-[#B85C38] font-bold block">Scale</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-bold">28 → 50+</span>
                <span className="text-[11px] text-[#2B1B17]/60 block mt-0.5">Curated Booths</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FFFBF5] border border-[#D9A441]/30 text-center">
                <span className="text-[10px] tracking-widest uppercase text-[#B85C38] font-bold block">Patrons</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-bold">3.2k → 5.4k+</span>
                <span className="text-[11px] text-[#2B1B17]/60 block mt-0.5">Festive Shoppers</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FFFBF5] border border-[#D9A441]/30 text-center">
                <span className="text-[10px] tracking-widest uppercase text-[#B85C38] font-bold block">Venue</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-bold">5-Star</span>
                <span className="text-[11px] text-[#2B1B17]/60 block mt-0.5">Lemon Tree Premier</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FFFBF5] border border-[#D9A441]/30 text-center">
                <span className="text-[10px] tracking-widest uppercase text-[#B85C38] font-bold block">States</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#2B1B17] font-bold">1 → 5 States</span>
                <span className="text-[11px] text-[#2B1B17]/60 block mt-0.5">Regional Reach</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          8. FEATURED EVENT — THE ARCHIVE CONTINUES
          Bridging the past into the present verified edition
          ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FAF4EB] border-b border-[#D9A441]/20">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#FFFBF5] border border-[#D9A441]/40 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#FFF1D9] text-[10px] font-sans font-bold tracking-[0.25em] text-[#B85C38] uppercase shadow-xs">
                  <UdaanDiamond size={10} className="text-[#D9A441]" />
                  <span>THE ARCHIVE CONTINUES</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl sm:text-5xl text-[#2B1B17] font-bold tracking-tight">
                    {FEATURED_EVENT.name} • <span className="text-[#B85C38] font-normal italic">{FEATURED_EVENT.edition}</span>
                  </h2>
                  <p className="font-serif italic text-base sm:text-lg text-[#B8801F]">
                    The next chapter is already being written.
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#2B1B17]/80 font-light leading-relaxed">
                  Join 50+ handpicked women-led couture, fine polki, heirloom saree, and lifestyle labels at Tangerine Grand for Bihar's peak pre-Diwali festive shopping weekend.
                </p>

                <div className="space-y-2.5 text-xs font-sans text-[#2B1B17]/85 pt-1">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={15} className="text-[#B85C38] shrink-0" />
                    <span className="font-medium">{FEATURED_EVENT.datesFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-[#B85C38] shrink-0" />
                    <span>{FEATURED_EVENT.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={15} className="text-[#B85C38] shrink-0" />
                    <span>{FEATURED_EVENT.venue.hall}, {FEATURED_EVENT.venue.name}, {FEATURED_EVENT.city}</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    to="/apply"
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D9A441] via-[#E2B755] to-[#B8801F] text-[#2B1B17] text-xs font-sans font-bold tracking-[0.2em] uppercase shadow-md hover:shadow-lg transition-all"
                  >
                    BOOK YOUR STALL →
                  </Link>

                  <Link
                    to="/events/glamour-gala-5"
                    className="px-6 py-3.5 rounded-full border border-[#4A1620]/40 text-[#4A1620] hover:text-[#B8801F] text-xs font-sans font-semibold tracking-wider uppercase transition-colors"
                  >
                    EXPLORE EVENT GUIDE &rarr;
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#D9A441]/40 shadow-lg group">
                  <img
                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85"
                    alt="Glamour Gala Diwali Edition 5"
                    className="w-full h-full object-cover filter saturate-[1.1] group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#4A1620]/90 backdrop-blur-md border border-[#D9A441]/40 text-[#FFFAF2] text-[10px] font-sans font-bold tracking-widest uppercase">
                    {FEATURED_EVENT.status}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          9. FINAL MINIMAL CINEMATIC CTA
          Deep burgundy atmosphere, quiet and powerful
          ========================================================================= */}
      <section className="py-28 md:py-36 bg-[#380F17] text-[#FFFAF2] text-center select-none relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#D9A441]/35 bg-white/5 text-[10px] font-sans tracking-[0.3em] text-[#D9A441] uppercase">
            <UdaanDiamond size={9} />
            <span>THE NEXT CHAPTER</span>
          </div>

          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#FFFAF2] leading-none uppercase select-text">
            THE STORY<br />
            <span className="italic font-light text-[#D9A441]">IS STILL</span><br />
            BEING WRITTEN.
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-[#FFFAF2]/90 max-w-xl mx-auto">
            And your brand could be part of the next chapter.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/apply"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D9A441] hover:bg-[#F3D28E] text-[#2B1B17] text-xs font-sans font-bold tracking-[0.22em] uppercase shadow-2xl transition-all"
            >
              BECOME AN EXHIBITOR →
            </Link>

            <Link
              to="/events"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-[#FFFAF2] text-xs font-sans font-semibold tracking-[0.22em] uppercase transition-all"
            >
              EXPLORE UPCOMING EVENTS →
            </Link>
          </div>
        </div>
      </section>


      {/* =========================================================================
          10. FULLSCREEN IMAGE VIEWER MODAL (LIGHTBOX)
          Supports ArrowLeft, ArrowRight, Escape, mobile touch, counter & captions
          ========================================================================= */}
      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-[#180E15]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 text-[#FFFAF2] animate-fadeIn"
        >
          {/* Top Bar: Event Badge, Counter, Close Button */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center justify-between z-10"
          >
            <div className="flex items-center space-x-3">
              <span className="text-[10px] tracking-[0.3em] font-sans text-[#D9A441] uppercase font-bold">
                {archiveWallPhotos[lightboxIndex].event}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs font-mono text-white/60">
                {lightboxIndex + 1} / {archiveWallPhotos.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFAF2] flex items-center justify-center transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center Image Container with Prev/Next Navigation */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto flex items-center justify-center max-h-[75vh]"
          >
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + archiveWallPhotos.length) % archiveWallPhotos.length);
              }}
              className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-[#D9A441] hover:text-[#2B1B17] text-[#FFFAF2] flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Centered Image */}
            <div className="max-w-4xl max-h-[70vh] rounded-2xl overflow-hidden border border-[#D9A441]/40 shadow-2xl bg-black">
              <img
                src={archiveWallPhotos[lightboxIndex].image}
                alt={archiveWallPhotos[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % archiveWallPhotos.length);
              }}
              className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-[#D9A441] hover:text-[#2B1B17] text-[#FFFAF2] flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Bar: Title & Poetic Archival Caption */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="text-center max-w-xl mx-auto z-10 space-y-1"
          >
            <h3 className="font-serif text-xl sm:text-2xl text-[#FFFAF2]">
              {archiveWallPhotos[lightboxIndex].title}
            </h3>
            <p className="font-sans text-xs text-[#FFFAF2]/70 font-light leading-relaxed">
              {archiveWallPhotos[lightboxIndex].caption}
            </p>
            <span className="text-[10px] font-sans tracking-widest text-[#D9A441] uppercase block pt-1">
              {archiveWallPhotos[lightboxIndex].subtitle}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
