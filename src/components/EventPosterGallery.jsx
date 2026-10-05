import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SHOWCASE_ITEMS = [
  {
    id: "edition-05",
    slug: "glamour-gala-diwali-edition-5",
    title: "Solitaire Diamond Halo",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-04",
    slug: "glamour-gala-diwali-edition-5",
    title: "Crescent Gemstone Necklace",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-03",
    slug: "glamour-gala-diwali-edition-5",
    title: "Bespoke Emerald Cut",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-02",
    slug: "glamour-gala-diwali-edition-5",
    title: "Sapphire Heart Drops",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-01",
    slug: "glamour-gala-diwali-edition-5",
    title: "Midnight Royal Couture",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-spring",
    slug: "glamour-gala-diwali-edition-5",
    title: "Heritage Banarasi Saree",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-polki",
    slug: "glamour-gala-diwali-edition-5",
    title: "Handcrafted Polki Choker",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-pearl",
    slug: "glamour-gala-diwali-edition-5",
    title: "Baroque Pearl Choker",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-couture",
    slug: "glamour-gala-diwali-edition-5",
    title: "Festive Crimson Lehenga",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "edition-jadau",
    slug: "glamour-gala-diwali-edition-5",
    title: "Heirloom Jadau Pendant",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
  }
];

export default function EventPosterGallery() {
  const navigate = useNavigate();
  // Continuous global scroll position in fractional units (0 to SHOWCASE_ITEMS.length)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartProgress, setDragStartProgress] = useState(0);

  const animFrameRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const totalItems = SHOWCASE_ITEMS.length;

  // Silky 60FPS continuous sliding stream like a running broadcast
  useEffect(() => {
    let lastTime = performance.now();

    const renderLoop = (now) => {
      const dt = now - lastTime;
      lastTime = now;

      if (!isDragging) {
        // Continuous smooth sliding across the cylindrical panorama: ~1 card every 3.5s
        setScrollProgress((prev) => (prev + 0.00028 * dt) % totalItems);
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, totalItems]);

  // Pointer Drag Handlers for free-form spinning
  const handlePointerDown = (clientX) => {
    setIsDragging(true);
    isPointerDownRef.current = true;
    setDragStartX(clientX);
    setDragStartProgress(scrollProgress);
  };

  const handlePointerMove = (clientX) => {
    if (!isPointerDownRef.current) return;
    const deltaX = clientX - dragStartX;
    // Map drag pixels to fractional card movement
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
      className="relative w-full py-20 md:py-28 bg-[#FBF4EA] text-[#2B1B17] overflow-hidden select-none"
      aria-label="3D Curved Running Broadcast Carousel"
    >
      <div className="w-full relative z-10">
        {/* =========================================================================
            HEADER: EXACT MATCH TO USER'S REFERENCE IMAGE ("Bespoke Architecture Studio")
            Clean, bold, centered, zero clutter
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-12 px-6">
          <h2 className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl text-[#1A1A1A] tracking-tight leading-[1.05]">
            Bespoke Festive<br />Collections
          </h2>
          <p className="mt-3 text-stone-500 text-sm sm:text-base font-sans font-light">
            The premier luxury stage where Bihar's creative women transform bespoke passion into powerhouses.
          </p>
        </div>

        {/* =========================================================================
            FULL-WIDTH RUNNING BROADCAST STREAM (EMERGING ACROSS ENTIRE VIEWPORT)
            Spans edge-to-edge across the screen: cards emerge from beyond the left edge,
            arch through center, and merge seamlessly into the right edge!
            NO SIDE BUTTONS.
            ========================================================================= */}
        <div
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => isDragging && handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[490px] sm:h-[540px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
          style={{
            perspective: '1300px',
            perspectiveOrigin: 'center 38%',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          {/* 3D Cylindrical Stage */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {SHOWCASE_ITEMS.map((item, idx) => {
              // Continuous fractional offset relative to active center
              const rawOffset = ((idx + scrollProgress) % totalItems + totalItems) % totalItems;
              // Center offset around 0 (-totalItems/2 to +totalItems/2)
              const offset = rawOffset > totalItems / 2 ? rawOffset - totalItems : rawOffset;
              const absOffset = Math.abs(offset);

              // Render wide sweep across entire screen (up to 4.8 cards in both directions)
              if (absOffset > 4.6) return null;

              // WIDE BROADCAST CYLINDRICAL MATH:
              // Radius R = 1250px. Angle theta per card = 13.5 degrees
              const angleDeg = offset * 13.5;
              const angleRad = (angleDeg * Math.PI) / 180;
              const R = 1250;

              // Tangent positioning along circle:
              const x = R * Math.sin(angleRad);
              const z = -R * (1 - Math.cos(angleRad)) * 1.28; // Enhanced 3D depth curvature
              const rotateY = -angleDeg * 1.12; // Tangents the curve away on both sides

              // Arching Y trajectory (convex curve like reference):
              const y = isDragging ? 0 : Math.pow(absOffset, 1.35) * 6;
              
              // Scale: Center card is prominent 1.04, side cards scale gracefully into distance
              const scale = Math.max(0.68, 1.04 - absOffset * 0.065);

              // Opacity: smooth atmospheric fade as cards emerge from and merge into the screen margins
              const opacity = Math.max(0.12, 1 - Math.pow(absOffset / 4.4, 2.2));

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
                  className="pointer-events-auto absolute w-[240px] sm:w-[265px] md:w-[275px] h-[390px] sm:h-[440px] md:h-[490px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.22)] group cursor-pointer border border-black/5 bg-[#4A1620]"
                >
                  {/* PURE PHOTOGRAPHY — EXACT MATCH TO REFERENCE IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    draggable={false}
                  />

                  {/* Surface specular sheen */}
                  <div className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />

                  {/* EXACT WHITE HAND CURSOR ICON ON CENTER CARD (Identical to Reference Image) */}
                  {isCenter && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.35)] border border-black/10 transform transition-transform group-hover:scale-110">
                        {/* Crisp Hand Grab Cursor Icon */}
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

          {/* Curved Horizon Arch underneath the cards (Matches Cream Canvas) */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[130%] h-24 bg-[#FBF4EA] rounded-[50%_50%_0_0] shadow-[0_-12px_30px_rgba(43,27,23,0.05)] pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
}
