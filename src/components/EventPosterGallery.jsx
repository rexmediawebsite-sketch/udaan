import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  { id: "all", label: "All Curations" },
  { id: "jewels", label: "Fine Polki & Diamonds" },
  { id: "couture", label: "Festive Pret & Sarees" },
  { id: "heritage", label: "Heirlooms & Crafts" }
];

const SHOWCASE_ITEMS = [
  {
    id: "edition-05",
    slug: "glamour-gala-diwali-edition-5",
    title: "Solitaire Diamond Halo",
    category: "jewels",
    categoryLabel: "High Jewellery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-04",
    slug: "glamour-gala-diwali-edition-5",
    title: "Crescent Gemstone Necklace",
    category: "jewels",
    categoryLabel: "Fine Jewels",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-03",
    slug: "glamour-gala-diwali-edition-5",
    title: "Bespoke Emerald Cut",
    category: "jewels",
    categoryLabel: "Gemstones",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-02",
    slug: "glamour-gala-diwali-edition-5",
    title: "Sapphire Heart Drops",
    category: "jewels",
    categoryLabel: "Precious Solitaires",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-pearl",
    slug: "glamour-gala-diwali-edition-5",
    title: "Baroque Pearl Choker",
    category: "jewels",
    categoryLabel: "Natural Pearls",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-01",
    slug: "glamour-gala-diwali-edition-5",
    title: "Midnight Royal Couture",
    category: "couture",
    categoryLabel: "Bridal Couture",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-spring",
    slug: "glamour-gala-diwali-edition-5",
    title: "Heritage Banarasi Saree",
    category: "couture",
    categoryLabel: "Virasat Weaves",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-couture",
    slug: "glamour-gala-diwali-edition-5",
    title: "Festive Crimson Lehenga",
    category: "couture",
    categoryLabel: "Diwali Pret",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-polki",
    slug: "glamour-gala-diwali-edition-5",
    title: "Handcrafted Polki Choker",
    category: "heritage",
    categoryLabel: "Kundan Polki",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-jadau",
    slug: "glamour-gala-diwali-edition-5",
    title: "Heirloom Jadau Pendant",
    category: "heritage",
    categoryLabel: "Artisanal Craft",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
  }
];

export default function EventPosterGallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartProgress, setDragStartProgress] = useState(0);

  const animFrameRef = useRef(null);
  const isPointerDownRef = useRef(false);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return SHOWCASE_ITEMS;
    return SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const totalItems = filteredItems.length;

  // Silky 60FPS continuous sliding stream like a running broadcast
  useEffect(() => {
    let lastTime = performance.now();

    const renderLoop = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      // Drift smoothly unless dragging or hovered
      if (!isDragging && !isHovered && totalItems > 0) {
        setScrollProgress((prev) => (prev + 0.00024 * dt) % totalItems);
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, isHovered, totalItems]);

  // Pointer Drag Handlers
  const handlePointerDown = (clientX) => {
    setIsDragging(true);
    isPointerDownRef.current = true;
    setDragStartX(clientX);
    setDragStartProgress(scrollProgress);
  };

  const handlePointerMove = (clientX) => {
    if (!isPointerDownRef.current || totalItems === 0) return;
    const deltaX = clientX - dragStartX;
    const cardDelta = deltaX / 280;
    setScrollProgress((dragStartProgress + cardDelta + totalItems * 10) % totalItems);
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);
  };

  return (
    <section
      id="poster-gallery"
      className="relative w-full pt-12 pb-24 md:pb-32 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden select-none"
      aria-label="3D Curved Running Broadcast Carousel"
    >
      <div className="w-full relative z-10">
        {/* =========================================================================
            HEADER: AWWWARDS EDITORIAL LUXURY
            ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 px-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#FFFAF2] text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.25em] text-[#B85C38] uppercase shadow-sm mb-4">
            <Sparkles size={12} className="text-[#D9A441]" />
            <span>CURATED FESTIVE ATELIERS</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A] tracking-tight leading-[1.05]">
            Bespoke Festive<br />Collections
          </h2>

          <p className="mt-3 text-stone-600 text-sm sm:text-base font-sans font-light max-w-xl mx-auto">
            The premier luxury stage where Bihar's creative women transform bespoke passion into powerhouses.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setScrollProgress(0);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#4A1620] text-[#FFFAF2] shadow-[0_4px_16px_rgba(74,22,32,0.35)] border border-[#D9A441]/60 scale-105 font-semibold'
                      : 'bg-[#FFFAF2]/80 text-[#2B1B17]/70 hover:text-[#4A1620] hover:bg-[#FFFAF2] border border-[#D9A441]/25 font-medium'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            FULL-WIDTH 3D RUNNING BROADCAST (EMERGING FROM DEPTH OF SCREEN)
            ========================================================================= */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handlePointerUp();
          }}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => isDragging && handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[540px] sm:h-[600px] md:h-[660px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
          style={{
            perspective: '1350px',
            perspectiveOrigin: 'center 40%',
            maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          }}
        >
          {/* Ambient Warm Golden Halo behind active focal zone */}
          <div className="absolute w-[600px] h-[450px] bg-gradient-to-r from-[#D9A441]/18 via-[#4A1620]/15 to-[#B85C38]/15 rounded-full blur-[90px] pointer-events-none transform -translate-y-4" />

          {/* 3D Cylindrical Stage */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {filteredItems.map((item, idx) => {
              const rawOffset = ((idx + scrollProgress) % totalItems + totalItems) % totalItems;
              const offset = rawOffset > totalItems / 2 ? rawOffset - totalItems : rawOffset;
              const absOffset = Math.abs(offset);

              // Render wide sweep across entire screen (emerging from beyond viewport edges)
              if (absOffset > 5.5) return null;

              // WIDE BROADCAST CYLINDRICAL MATH:
              // Radius R = 1250px. Angle theta per card = 13.5 degrees
              const angleDeg = offset * 13.5;
              const angleRad = (angleDeg * Math.PI) / 180;
              const R = 1250;

              // Tangent positioning along circle:
              const x = R * Math.sin(angleRad);
              const z = -R * (1 - Math.cos(angleRad)) * 1.25 + (absOffset < 0.5 ? 50 : 0);
              const rotateY = -angleDeg * 1.12;

              // Arching Y trajectory (slight elevation lift towards edges for dramatic emergence):
              const y = isDragging ? 0 : Math.pow(absOffset, 1.25) * 4.5;
              
              // Scale: Center card is prominent 1.05, side cards scale gracefully into distance
              const scale = Math.max(0.68, 1.05 - absOffset * 0.058);

              // Opacity: smooth atmospheric fade as cards emerge from and merge into the screen margins
              const opacity = Math.max(0.18, 1 - Math.pow(absOffset / 5.2, 2.2));

              const isCenter = absOffset < 0.45;

              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/events/${item.slug}`);
                  }}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    opacity,
                  }}
                  className={`pointer-events-auto absolute w-[240px] sm:w-[265px] md:w-[280px] h-[390px] sm:h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer transition-shadow duration-500 bg-[#4A1620] ${
                    isCenter
                      ? 'border-2 border-[#D9A441]/80 shadow-[0_30px_70px_rgba(74,22,32,0.45),0_0_35px_rgba(217,164,65,0.25)] z-20'
                      : 'border border-[#4A1620]/30 shadow-[0_20px_45px_rgba(0,0,0,0.2)]'
                  }`}
                >
                  {/* PURE PHOTOGRAPHY — HIGH DEFINITION */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    draggable={false}
                  />

                  {/* Surface specular glass glaze */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/35 to-transparent" />

                  {/* Frosted Vignette with Info on Card (Appears gracefully on center/hover) */}
                  <div className={`absolute bottom-0 inset-x-0 p-4 pt-10 bg-gradient-to-t from-[#2B1B17]/90 via-[#2B1B17]/40 to-transparent transition-opacity duration-300 ${
                    isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <span className="text-[9px] font-sans font-semibold tracking-[0.2em] text-[#D9A441] uppercase block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#FFFAF2] leading-tight mt-0.5 flex items-center justify-between">
                      <span>{item.title}</span>
                      <ArrowUpRight size={14} className="text-[#D9A441] opacity-75 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>

                  {/* Crisp White Hand Grab Indicator on Center Card (Only when dragging/idling) */}
                  {isCenter && !isHovered && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.35)] border border-black/10 transform transition-transform group-hover:scale-110">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.5 5.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v7.25c-.48-.22-1.07-.35-1.75-.35-1.79 0-3.25 1.46-3.25 3.25 0 2.21 1.79 4 4 4h4.5c2.48 0 4.5-2.02 4.5-4.5V11c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1h-1V7.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v4.5h-1V5.5z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Horizon Subtle Glow Bed (Behind cards at z-0, zero clipping) */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-16 bg-gradient-to-t from-[#D9A441]/10 to-transparent pointer-events-none z-0" />
        </div>
      </div>
    </section>
  );
}
