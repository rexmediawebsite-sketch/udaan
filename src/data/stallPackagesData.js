/**
 * Editable CMS / Backend Data for UDAAN Stall Packages & Exhibitor Experience
 * All prices, package dimensions, and inclusions are configurable.
 */

export const STALL_PACKAGES = [
  {
    id: "essential",
    name: "Essential",
    label: "THE STARTER SPACE",
    price: 20000,
    priceFormatted: "₹20,000",
    size: "Approx. 6 ft × 6 ft (36 sq.ft)",
    metricSize: "2m × 2m",
    bestFor: "First-time exhibitors & emerging indie ateliers",
    visualPersonality: "Minimal • Clean • Smart • Focused",
    badge: "STARTER",
    featured: false,
    availability: "Limited Spaces Available",
    position: "Artisan & Creative Promenade",
    tagline: "Your intimate, high-impact debut in 5-star festive luxury.",
    inclusions: [
      "Basic branded octanorm stall structure",
      "1 dressed display table & 2 chairs",
      "Basic directional lighting setup (2 warm spots)",
      "Standard fascia & brand name typography",
      "2 official exhibitor passes",
      "Official event directory listing",
      "Pre-event social announcement mention",
      "100% uninterrupted power backup"
    ],
    visualConcept: {
      title: "Essential Minimalist Atelier",
      desc: "Clean geometry, focused warm spotlighting, and an intimate boutique setting designed for emerging craftswomen to present their debut collections.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",
      accent: "from-[#F5EFE5] via-[#E8DEC8] to-[#D8C8B5]"
    }
  },
  {
    id: "signature",
    name: "Signature",
    label: "THE SIGNATURE SPACE",
    price: 30000,
    priceFormatted: "₹30,000",
    size: "Approx. 8 ft × 8 ft (64 sq.ft)",
    metricSize: "2.5m × 2.5m",
    bestFor: "Growing pret brands wanting elevated footfall & visibility",
    visualPersonality: "Balanced • High Visibility • Bespoke Presence",
    badge: "MOST POPULAR",
    featured: true,
    availability: "Filling Fast (High Demand)",
    position: "Central Aisle Intersections & Crossings",
    tagline: "Our most chosen space for contemporary festive couturiers.",
    inclusions: [
      "Enhanced premium octanorm stall structure",
      "1 custom branded reception counter & 2 chairs",
      "Enhanced 3000K warm atrium lighting (4 focused spots)",
      "Metallic gold fascia branding with studio logo",
      "Dedicated backdrop display area for banners & garments",
      "3 official exhibitor passes",
      "Prominent event directory listing & map highlight",
      "Social media brand spotlight opportunity",
      "Featured mention in UDAAN pre-event festive gazette",
      "100% dual genset power backup & daily housekeeping"
    ],
    visualConcept: {
      title: "Signature Curated Boutique",
      desc: "Expanded display width, branded reception counter, and generous client browsing room designed to maximize shopper dwell time and high-ticket orders.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
      accent: "from-[#A85F4B] via-[#641F2C] to-[#4A1823]"
    }
  },
  {
    id: "premium",
    name: "Premium",
    label: "THE STATEMENT SPACE",
    price: 50000,
    priceFormatted: "₹50,000",
    size: "Approx. 10 ft × 10 ft (100 sq.ft)",
    metricSize: "3m × 3m / 4m × 3m",
    bestFor: "Established couture houses, heirloom polki & statement luxury",
    visualPersonality: "Statement • Front-Row Prime • Editorial Grandeur",
    badge: "FLAGSHIP",
    featured: false,
    availability: "Exclusive (Only 4 Available)",
    position: "Grand Centerpiece & Entrance Promenade",
    tagline: "Unrivaled double-frontage placement for Bihar's premier luxury creators.",
    inclusions: [
      "Full custom luxury display pavilion structure",
      "Branded reception counter, 2 display tables & 4 luxury chairs",
      "High-lumen directional LED spotlight rig (6 spots)",
      "Double-width metallic acrylic fascia branding with logo",
      "Prime entrance promenade / grand centerpiece placement preference",
      "4 VIP exhibitor passes with lounge access",
      "Featured exhibitor listing & dedicated media spotlight",
      "Dedicated Instagram reel & interview feature on UDAAN channels",
      "Full page brand spotlight in the official print guide",
      "Priority load-in & dedicated concierge liaison"
    ],
    visualConcept: {
      title: "Statement Pavilion Presence",
      desc: "Double-wide open pavilion commanding immediate attention as patrons step into Tangerine Grand. Ideal for luxury pret, bridal polki jewels, and immersive pop-ups.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
      accent: "from-[#B69A67] via-[#D8C8B5] to-[#F5EFE5]"
    }
  }
];

export const EXHIBITION_EVENTS = [
  {
    id: "glamour-gala-5",
    slug: "glamour-gala-diwali-edition-5",
    name: "Glamour Gala",
    edition: "Diwali Edition 5",
    date: "24 & 25 OCTOBER 2026",
    days: "Saturday & Sunday • 11:00 AM – 9:00 PM IST",
    venue: "Lemon Tree Premier",
    hall: "Tangerine Grand Exhibition Hall (Ground Floor)",
    city: "Patna, Bihar",
    address: "Plot No. 876, Exhibition Road, Near Gandhi Maidan, Patna",
    status: "STALL BOOKINGS NOW OPEN",
    statusNote: "Early-bird stalls filling fast for Bihar's peak festive pre-Diwali weekend.",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    description: "Bihar's most anticipated 5-star pre-Diwali luxury showcase bringing together 50+ handpicked women founders, luxury pret ateliers, fine polki jewelers, and artisanal lifestyle curators under one roof."
  },
  {
    id: "bihar-heritage-luxe-2026",
    slug: "bihar-heritage-luxe-winter-2026",
    name: "Bihar Heritage Luxe",
    edition: "Winter Edition 2026",
    date: "19 & 20 DECEMBER 2026",
    days: "Saturday & Sunday • 11:00 AM – 8:30 PM IST",
    venue: "Hotel Maurya",
    hall: "Ashoka Ballroom",
    city: "Patna, Bihar",
    address: "Fraser Road, South Gandhi Maidan, Patna",
    status: "APPLICATIONS OPEN",
    statusNote: "Winter artisanal celebration highlighting living textile traditions and GI crafts.",
    heroImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1800&q=80",
    poster: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80",
    description: "An exclusive winter celebration dedicated to Eastern India's living cultural craft traditions, Madhubani canvases, and handloom silks."
  }
];

export const COMPARISON_FEATURES = [
  { feature: "Stall Size", essential: "6 ft × 6 ft (36 sq.ft)", signature: "8 ft × 8 ft (64 sq.ft)", premium: "10 ft × 10 ft (100 sq.ft)" },
  { feature: "Display Structure", essential: "Basic octanorm frame", signature: "Enhanced boutique booth", premium: "Double-wide custom pavilion" },
  { feature: "Display Furniture", essential: "1 Table + 2 Chairs", signature: "1 Branded Counter + 2 Chairs", premium: "1 Counter + 2 Tables + 4 Chairs" },
  { feature: "Lighting Package", essential: "2 Warm Spotlights", signature: "4 Warm 3000K Atrium Spots", premium: "6 Multi-angle LED Spot Rig" },
  { feature: "Fascia & Name Branding", essential: "Standard nameplate", signature: "Metallic gold acrylic with logo", premium: "Double-wide illuminated acrylic" },
  { feature: "Exhibitor Passes", essential: "2 Passes", signature: "3 Passes", premium: "4 VIP Passes with Lounge Access" },
  { feature: "Directory & Catalog", essential: "Standard Listing", signature: "Featured Listing + Highlight", premium: "Full Page Dedicated Spotlight" },
  { feature: "Social Media Spotlight", essential: "Group mention", signature: "Individual feature story", premium: "Dedicated Reel & Founder Video" },
  { feature: "Placement Preference", essential: "Creative Aisle", signature: "Boulevard Intersections", premium: "Front Entrance & Centerpiece" },
  { feature: "100% Power & AC", essential: "Included", signature: "Included", premium: "Included with Priority Circuit" }
];

export const BRAND_CATEGORIES = [
  { id: "fashion", title: "Fashion & Apparels", hindi: "परिधान एवं फैशन", desc: "Couture, Banarasi silks, contemporary fusion pret, and festive lehengas.", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" },
  { id: "jewellery", title: "Jewellery", hindi: "पारंपरिक व आधुनिक आभूषण", desc: "Fine polki, uncut diamonds, 925 sterling silver filigree, and temple jewels.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" },
  { id: "home", title: "Home Decor & Lifestyle", hindi: "गृह सज्जा एवं लाइफस्टाइल", desc: "Brass artefacts, festive candles, hand-painted ceramics, and living textiles.", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" },
  { id: "beauty", title: "Beauty & Wellness", hindi: "सौंदर्य एवं वैलनेस", desc: "Clean botanical formulations, pure attars, organic skincare, and aromatherapy.", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80" },
  { id: "handmade", title: "Handmade & Gift Items", hindi: "हस्तशिल्प एवं उपहार", desc: "Madhubani canvases, ceremonial dupattas, and bespoke Diwali trousseau hampers.", image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80" },
  { id: "food", title: "Food & Confectionery", hindi: "स्वादिष्ट व्यंजन एवं मिष्ठान", desc: "Artisanal mithai, gourmet dry fruit assortments, bakery pop-ups, and luxury teas.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" }
];

export const STALL_FAQS = [
  {
    q: "WHAT DOES THE STALL PRICE INCLUDE?",
    a: "Every proposed package includes turnkey physical infrastructure: octanorm partition walls, customized fascia with your brand name, display tables and chairs, directional warm spotlights, power points, daily housekeeping, 5-star central air-conditioning, security, and official exhibitor credentials."
  },
  {
    q: "HOW DO I SELECT MY SPECIFIC STALL?",
    a: "You can explore the interactive Tangerine Grand floor plan on this page and click on any available stall (e.g. P-02, A-02, B-03). Your selection will automatically lock into your application."
  },
  {
    q: "CAN I REQUEST A SPECIFIC STALL LOCATION?",
    a: "Yes. While submitting your application, you can indicate your preferred stall number or aisle zone. The curation committee prioritizes early applications during final allotment."
  },
  {
    q: "CAN I CHANGE MY STALL AFTER APPLYING?",
    a: "Yes, subject to availability. You can contact your dedicated UDAAN concierge before the commercial reservation is finalized to modify your stall position or upgrade your package."
  },
  {
    q: "WHEN WILL I RECEIVE FINAL STALL DETAILS?",
    a: "Our curation committee reviews brand portfolios within 24 hours of application. Upon curation approval, you receive an official allotment letter, fascia proof, and payment docket."
  },
  {
    q: "CAN I PARTICIPATE AS A NEW OR INDEPENDENT BRAND?",
    a: "Absolutely. UDAAN is founded specifically to launch emerging women creators alongside established labels. Over 40% of our past exhibitors made their commercial exhibition debut with us."
  },
  {
    q: "HOW WILL UDAAN PROMOTE EXHIBITORS?",
    a: "Every participating brand is featured across UDAAN's digital social campaigns, print exhibition gazettes, VIP invitations sent to Bihar's affluent patrons, and post-event media press releases."
  },
  {
    q: "WHAT HAPPENS AFTER I SUBMIT MY APPLICATION?",
    a: "Applying has zero upfront fee. Your application is assigned a unique reference ID (e.g. UDAAN-7842). Our curation committee will contact you via WhatsApp to review lookbooks and confirm category exclusivity."
  }
];
