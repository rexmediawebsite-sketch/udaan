export const EVENTS_CATALOG = [
  // ==========================================
  // 1. UPCOMING & CURRENT FLAGSHIP EDITIONS
  // ==========================================
  {
    id: "glamour-gala-5",
    slug: "glamour-gala-diwali-edition-5",
    legacySlug: "glamour-gala-5",
    name: "Glamour Gala",
    title: "Glamour Gala",
    edition: "Diwali Edition 5",
    
    // Core Lifecycle Controls (Single Source of Truth)
    statusMode: "AUTO", // "AUTO" | "MANUAL"
    statusOverride: null, // "UPCOMING" | "LIVE" | "ARCHIVED" | null
    status: "upcoming", // Auto-computed or manual fallback
    
    // Precise ISO timestamps in Asia/Kolkata (+05:30)
    startDate: "2026-10-24T11:00:00+05:30",
    endDate: "2026-10-25T21:00:00+05:30",
    date: "24 & 25 OCTOBER 2026",
    dates: "24 & 25 OCTOBER 2026",
    dateDisplay: "24 & 25 OCTOBER 2026",
    days: "Saturday & Sunday",
    timings: "11:00 AM – 9:00 PM IST",
    year: "2026",
    
    // Verified Venue Dossier
    venue: "Lemon Tree Premier",
    venueDetails: {
      name: "Lemon Tree Premier",
      hall: "Tangerine Grand Exhibition Hall",
      floor: "Ground Floor Pillarless Hall",
      city: "Patna",
      state: "Bihar",
      address: "Plot No. 876, Exhibition Road, Near Gandhi Maidan, Patna, Bihar 800001",
      googleMapsUrl: "https://maps.google.com/?q=Lemon+Tree+Premier+Patna+Exhibition+Road"
    },
    hall: "Tangerine Grand Exhibition Hall",
    city: "Patna",
    location: "Plot No. 876, Exhibition Road, Near Gandhi Maidan, Patna, Bihar 800001",
    
    // Editorial Branding & Narrative
    isFlagship: true,
    bookingStatus: "STALL BOOKINGS OPEN",
    statusLabel: "STALL BOOKINGS OPEN",
    badgeColor: "bg-[#E99A18] text-[#1E121B]",
    tagline: "Bihar's Most Anticipated Pre-Diwali Luxury Showcase",
    shortDescription: "A curated 5-star luxury exhibition bringing together 50+ women-led couture, fine polki, heirloom saree, and lifestyle labels for Bihar's peak festive shopping weekend.",
    description: "Glamour Gala Diwali Edition 5 is UDAAN's flagship festive exhibition, strategically positioned on the final high-intent shopping weekend before Diwali. Bringing together 50+ handpicked women founders, luxury pret ateliers, fine polki and temple jewelers, and artisanal lifestyle curators under one 5-star roof at Tangerine Grand, Lemon Tree Premier.",
    
    // Atmospheric Artwork (Transitions naturally with state)
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80",
    liveHeroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80",
    archiveHeroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=85",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    
    // Confirmed Categories
    categories: [
      "Bridal Couture & Handlooms",
      "Polki, Silver & Diamond Jewellery",
      "Festive Home Decor & Brass Artefacts",
      "Ayurvedic Beauty & Wellness",
      "Gourmet Confections & Hampers"
    ],
    
    // Single Unified Exhibitor Records (Used across Upcoming, Live & Archive)
    exhibitors: [
      { id: "ex-1", name: "Virasat Weaves", founder: "Pooja Singhania", city: "Varanasi / Patna", category: "Bridal Handlooms", stall: "A-02", featured: true },
      { id: "ex-2", name: "Aashna Fine Jewels", founder: "Aashna Verma", city: "Patna", category: "Polki & Diamonds", stall: "B-04", featured: true },
      { id: "ex-3", name: "Svara Silver Atelier", founder: "Kavita Roy", city: "Jaipur / Patna", category: "925 Sterling Silver", stall: "A-08", featured: true },
      { id: "ex-4", name: "Mithila Heritage Studio", founder: "Sunita Jha", city: "Madhubani", category: "Handmade Fine Art", stall: "C-01", featured: true }
    ],
    featuredExhibitors: [
      { name: "Virasat Weaves", founder: "Pooja Singhania", city: "Varanasi / Patna", category: "Bridal Handlooms" },
      { name: "Aashna Fine Jewels", founder: "Aashna Verma", city: "Patna", category: "Polki & Diamonds" },
      { name: "Svara Silver Atelier", founder: "Kavita Roy", city: "Jaipur / Patna", category: "925 Sterling Silver" },
      { name: "Mithila Heritage Studio", founder: "Sunita Jha", city: "Madhubani", category: "Handmade Fine Art" }
    ],
    
    // Approved Public Gallery Photos (Shared by Live Floor Stream & Archive Gallery)
    // Rule: Only approvedForPublic: true appear publicly
    gallery: [
      { id: "gal-1", url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85", caption: "Handcrafted Polki & Kundan masterpieces", category: "Fine Jewellery", timestamp: "11:45 AM", approvedForPublic: true, chapter: "DISCOVERY" },
      { id: "gal-2", url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85", caption: "Banarasi silk zari weave showcase", category: "Handlooms", timestamp: "12:30 PM", approvedForPublic: true, chapter: "BRANDS" },
      { id: "gal-3", url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85", caption: "Handloom textile curation on display", category: "Bridal Couture", timestamp: "02:15 PM", approvedForPublic: true, chapter: "CONVERSATIONS" },
      { id: "gal-4", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85", caption: "Temple jewelry suite inspection", category: "Fine Jewellery", timestamp: "04:00 PM", approvedForPublic: true, chapter: "MOMENTS" }
    ],
    
    // Real Live Updates (Only published: true appear publicly)
    liveUpdates: [
      {
        id: "up-1",
        timestamp: "11:00 AM",
        title: "Tangerine Grand Doors Open",
        description: "Exhibition hall doors are officially open for Diwali Edition 5 patrons. Valet parking active at the main porch.",
        published: true,
        badge: "OPENING"
      },
      {
        id: "up-2",
        timestamp: "01:30 PM",
        title: "Bridal Couture Walkthrough in Pavilion A",
        description: "Master handloom revivalists showcase rare Banarasi katans and bridal lehengas in Aisle 1.",
        published: true,
        badge: "CURATION"
      },
      {
        id: "up-3",
        timestamp: "04:45 PM",
        title: "Afternoon Footfall & Artisan Showcase",
        description: "Over 35 craft studios actively presenting festive polki and heirloom silverware collections.",
        published: true,
        badge: "DISCOVERY"
      }
    ],
    
    // Confirmed Daily Schedule (Optional: hidden if empty)
    schedule: [
      { time: "11:00 AM", title: "Doors Open for Registered Patrons", venue: "Tangerine Grand Main Entrance" },
      { time: "01:00 PM", title: "Curation Walkthrough: Heirloom Handlooms", venue: "Pavilion A" },
      { time: "04:30 PM", title: "Fine Jewellery & Polki Spotlight", venue: "Pavilion B" },
      { time: "09:00 PM", title: "Day Floor Closes", venue: "Main Hall" }
    ],
    
    // Verified Visitor Logistics
    visitorInfo: {
      entry: "Complimentary VIP Entry with Digital Registration",
      parking: "Complimentary Valet Parking at Lemon Tree Premier Main Porch",
      payment: "UPI, Cards, and Cash Accepted by All Exhibitors",
      climate: "Fully Climate-Controlled 5-Star Pillarless Hall",
      contactPhone: "+91 85780 09900",
      contactEmail: "contact@udaanbihar.in"
    },
    
    // Verified Archive Statistics (Strict: only real numbers)
    verifiedStats: [
      { label: "CURATED ATELIERS", value: "50+" },
      { label: "DISCERNING PATRONS", value: "5,000+" },
      { label: "5-STAR VENUE", value: "Lemon Tree" },
      { label: "EXHIBITION DAYS", value: "2 Days" }
    ],
    
    // Archive Story / Chapters (Built strictly from authentic event moments)
    archiveStory: [
      {
        chapter: "THE ARRIVAL",
        title: "The Doors Open at Tangerine Grand",
        quote: "Where craft is recognized as capital, and women build generational labels.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85"
      },
      {
        chapter: "THE DISCOVERY",
        title: "Fifty Handpicked Ateliers Under One Roof",
        quote: "Uncut polki, hand-spun tussar, and heritage brass living traditions.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85"
      },
      {
        chapter: "THE MEMORY",
        title: "Two Days That Redefined Patna's Festive Landscape",
        quote: "Connecting regional master creators with thousands of patrons.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    
    stats: [
      { label: "CURATED BOOTHS", value: "50+" },
      { label: "EXPECTED PATRONS", value: "5,000+" },
      { label: "VENUE RATING", value: "5-Star" },
      { label: "DAYS", value: "2 Days" },
    ],
    whoCanExhibit: [
      "Women founders & creative directors in fashion, pret, and bridal wear.",
      "Fine jewellery, 925 silver filigree, kundan, and polki designers.",
      "Home living, handcrafted brass, festive candles, and luxury decor studios.",
      "Clean Ayurvedic wellness, organic skincare, and bespoke fragrance houses.",
      "Artisanal confectionery, dry fruit luxury hampers, and gourmet bites."
    ],
    whyExhibit: [
      "Peak Diwali Timing: Scheduled exactly 10 days before Diwali when festive shopping reaches its annual zenith.",
      "High-Net-Worth Footfall: Direct access to 5,000+ affluent families, wedding shoppers, and corporate gift buyers.",
      "Turnkey 5-Star Setup: Zero hassle infrastructure with octanorm stalls, dedicated spotlights, and continuous power backup.",
      "Extensive Media Coverage: Comprehensive print, digital PR, and influencer amplification across Bihar & Eastern India."
    ],
    stallTypes: [
      {
        name: "Royal Pavilion",
        size: "4m x 3m (12 sq.m)",
        pricing: "PRICE ON REQUEST",
        location: "Grand Centerpiece & Entrance Promenade",
        features: ["Premium front-row visibility", "3 Dedicated high-lumen spotlights", "Two 15A power sockets", "Fascia branding with logo", "2 Display tables & 4 chairs"]
      },
      {
        name: "Corner Prime",
        size: "3m x 3m (9 sq.m)",
        pricing: "PRICE ON REQUEST",
        location: "Two-side open aisle intersections",
        features: ["Dual-side shopper footfall", "2 Focused spotlights", "One 5A/15A socket", "Branded name fascia plate", "1 Display table & 2 chairs"]
      },
      {
        name: "Standard Booth",
        size: "3m x 2.5m (7.5 sq.m)",
        pricing: "PRICE ON REQUEST",
        location: "Curated domain aisles",
        features: ["Full octanorm wall partitions", "2 Warm spotlights", "One 5A power socket", "Standard fascia plate", "1 Display table & 2 chairs"]
      }
    ],
    faqs: [
      { q: "What is the procedure for stall booking?", a: "Submit the online allotment form. Our curation committee reviews brand portfolios within 24 hours to confirm category exclusivity." },
      { q: "What is included with my booth allotment?", a: "Turnkey octanorm partitions, fascia branding with studio name, dedicated spotlights, power socket, display tables, chairs, and official exhibitor badges." },
      { q: "Are stalls customizable?", a: "Yes, exhibitors in the Royal Pavilion and Corner Prime categories are permitted to bring bespoke display props, hangers, and floral arrangements." },
      { q: "What are the visitor entry charges?", a: "Visitor entry is strictly complimentary with registration of a digital VIP pass to ensure high footfall of serious festive buyers." }
    ],
    highlights: [
      "Peak pre-Diwali festive dates when affluent families finalize wedding and gifting purchases.",
      "Pillarless climate-controlled Tangerine Grand hall with professional lighting and full power backup.",
      "Valet parking directly at Lemon Tree Premier main porch on Exhibition Road.",
      "Turnkey octanorm stalls equipped with spotlights, fascia branding, and power sockets."
    ],
    bookingsOpen: true
  },
  {
    id: "bihar-heritage-luxe-2026",
    slug: "bihar-heritage-luxe-winter-2026",
    name: "Bihar Heritage Luxe",
    title: "Bihar Heritage Luxe",
    edition: "Winter Edition 2026",
    status: "upcoming",
    isFlagship: false,
    bookingStatus: "APPLICATIONS OPEN",
    statusLabel: "APPLICATIONS OPEN",
    badgeColor: "bg-[#397EAC] text-white",
    date: "19 & 20 DECEMBER 2026",
    dates: "19 & 20 DECEMBER 2026",
    startDate: "2026-12-19",
    endDate: "2026-12-20",
    days: "Saturday & Sunday",
    timings: "11:00 AM – 8:30 PM IST",
    year: "2026",
    venue: "Hotel Maurya / Convention Center",
    hall: "Ashoka Ballroom",
    city: "Patna",
    location: "Fraser Road, South Gandhi Maidan, Patna, Bihar 800001",
    tagline: "Artisanal Weaves, Madhubani Masterpieces & Brass Heritage",
    shortDescription: "A winter artisanal celebration highlighting Bihar's living textile traditions, Tussar silk handlooms, GI-tagged Madhubani paintings, and regional fine crafts.",
    description: "An exclusive winter celebration dedicated to Eastern India's living cultural craft traditions. Showcasing hand-spun Bhagalpuri Tussar silks, GI-tagged Madhubani paintings, hand-beaten brass art, winter cashmere wraps, and regional bridal heirlooms.",
    poster: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1800&q=80",
    coverImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "ARTISANAL GUILDS", value: "35+" },
      { label: "CRAFT CATEGORIES", value: "8" },
      { label: "HERITAGE VENUE", value: "Maurya" },
      { label: "CURATION", value: "By Invite" },
    ],
    categories: [
      "Tussar & Matka Silk Handlooms",
      "Original Madhubani Canvasses",
      "Brass & Bell Metal Living",
      "Winter Kashmiri Pashmina Shawls",
      "Organic Herbal Teas & Infusions"
    ],
    whoCanExhibit: [
      "Master handloom weavers and textile preservation societies.",
      "Madhubani and Sujani folk art studios.",
      "Brass, bell-metal, and stone craftsmanship workshops.",
      "Winter hand-spun cashmere and pashmina revivalists."
    ],
    whyExhibit: [
      "Direct Heritage Patronage: Connect with cultural connoisseurs, collectors, and corporate buyers seeking authentic Eastern craft.",
      "Festive Gifting Window: Capture corporate and personal New Year gifting demand.",
      "Media Visibility: Dedicated press features in regional cultural journals."
    ],
    stallTypes: [
      {
        name: "Heritage Pavilion",
        size: "3.5m x 3m",
        pricing: "PRICE ON REQUEST",
        location: "Central Court",
        features: ["Spotlight illumination", "Handloom demonstration space", "2 Tables & 4 Chairs"]
      },
      {
        name: "Artisan Alcove",
        size: "3m x 2.5m",
        pricing: "PRICE ON REQUEST",
        location: "Artisanal Aisle",
        features: ["Standard wall partitions", "Power socket", "1 Table & 2 Chairs"]
      }
    ],
    featuredExhibitors: [
      { name: "Bhagalpur Tussar Guild", founder: "Manju Devi", city: "Bhagalpur", category: "Handspun Silks" },
      { name: "Mithila Roots", founder: "Shalini Thakur", city: "Madhubani", category: "Heritage Fine Art" }
    ],
    faqs: [
      { q: "Can non-textile artisans participate?", a: "Yes, categories include brass metalwork, stone carvings, handmade pottery, and organic winter wellness." }
    ],
    highlights: [
      "Direct showcase platform for master craftswomen and indigenous heritage revivalists.",
      "Live artisan demonstrations including natural dye extraction and loom weaving.",
      "Winter wedding season trousseau collections with personalized founder consultations.",
      "Dedicated corporate gifting pavilion for Year-End festive hampers."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    bookingsOpen: true
  },
  {
    id: "spring-soiree-2027",
    slug: "spring-soiree-bridal-preview-2027",
    name: "Udaan Spring Soirée",
    title: "Udaan Spring Soirée",
    edition: "Summer Bridal Preview 2027",
    status: "upcoming",
    isFlagship: false,
    bookingStatus: "EARLY REGISTRATIONS",
    statusLabel: "EARLY REGISTRATIONS",
    badgeColor: "bg-[#B96535] text-white",
    date: "20 & 21 MARCH 2027",
    dates: "20 & 21 MARCH 2027",
    startDate: "2027-03-20",
    endDate: "2027-03-21",
    days: "Saturday & Sunday",
    timings: "11:00 AM – 9:00 PM IST",
    year: "2027",
    venue: "Lemon Tree Premier",
    hall: "Tangerine Grand",
    city: "Patna",
    location: "Plot No. 876, Exhibition Road, Patna, Bihar 800001",
    tagline: "Summer Festive Couture, Pastel Polki & Destination Wedding Pret",
    shortDescription: "A breath of fresh pastel luxury. Curated for the summer wedding season and destination celebrations, featuring organza pret and lightweight diamond jewels.",
    description: "Step into the lightness of spring. Curated for the upcoming summer wedding season and Eid celebrations, featuring breathable organic linens, organza drapes, lightweight uncut diamond jewellery, and resort luxury collections.",
    poster: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1800&q=80",
    coverImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "DESIGNER LABELS", value: "45+" },
      { label: "SUMMER STYLES", value: "500+" },
      { label: "EARLY ACCESS", value: "VIP" },
      { label: "SEASONS", value: "Summer '27" },
    ],
    categories: [
      "Pastel Bridal Pret & Organza",
      "Uncut Polki & Emerald Jewellery",
      "Handmade Floral Fragrances",
      "Summer Footwear & Potlis"
    ],
    whoCanExhibit: [
      "Summer couture and destination bridal wear designers.",
      "Contemporary jewellery artisans working with uncut polki and pastel gems.",
      "Organic resort wear and sustainable linen studios."
    ],
    whyExhibit: [
      "Launch Spring/Summer Collections: Be first in market before summer destination weddings.",
      "Exclusive 5-Star Patronage: Tangerine Grand's upscale audience of bride-to-be families."
    ],
    stallTypes: [
      {
        name: "Spring Pavilion",
        size: "3m x 3m",
        pricing: "PRICE ON REQUEST",
        location: "Promenade Court",
        features: ["Focused lighting", "Power socket", "Display rack support"]
      }
    ],
    featuredExhibitors: [],
    faqs: [
      { q: "When do stall allotments open for Spring Soirée?", a: "Early-bird registrations are currently being accepted. Official stall mapping will be finalized in January 2027." }
    ],
    highlights: [
      "Exclusive preview of Summer 2027 bridal fashion lines.",
      "Special spotlight on debutante women designers from Bihar.",
      "Cooling artisanal mocktail lounge and VIP networking sessions."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    bookingsOpen: true
  },

  // ==========================================
  // 2. PAST EDITIONS ARCHIVE
  // ==========================================
  {
    id: "royal-heritage-4",
    slug: "royal-heritage-edition-4",
    name: "Royal Heritage",
    title: "Royal Heritage",
    edition: "Edition 04",
    status: "past",
    isFlagship: false,
    bookingStatus: "COMPLETED",
    statusLabel: "COMPLETED ARCHIVE",
    badgeColor: "bg-[#2A1C24]/80 text-[#E9AD83] border border-[#E9AD83]/30",
    date: "02 & 03 NOVEMBER 2024",
    dates: "02 & 03 NOVEMBER 2024",
    startDate: "2024-11-02",
    endDate: "2024-11-03",
    days: "Saturday & Sunday",
    timings: "11:00 AM – 9:00 PM IST",
    year: "2024",
    venue: "Lemon Tree Premier",
    hall: "Tangerine Grand",
    city: "Patna",
    location: "Exhibition Road, Patna",
    tagline: "Eastern India's Artisanal Masterpieces & Polki Jewels",
    shortDescription: "A record-breaking showcase uniting 48 women entrepreneurs with over 5,400 discerning patrons across four states in Tangerine Grand's 5-star venue.",
    description: "Edition 4 marked UDAAN's transition to the newly opened Tangerine Grand pillarless hall at Lemon Tree Premier. 48 women entrepreneurs recorded extraordinary sales across bridal trousseau, fine 925 silver filigree, and festive home decor.",
    poster: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "EXHIBITORS", value: "48" },
      { label: "VERIFIED PATRONS", value: "5,400+" },
      { label: "TURNOVER", value: "Record" },
      { label: "PARTICIPATION", value: "4 States" },
    ],
    categories: [
      "Heritage Banarasi & Paithani",
      "Polki & Jadau Jewellery",
      "Handmade Brass Urli Living",
      "Artisanal Mithai & Teas"
    ],
    whoCanExhibit: [],
    whyExhibit: [],
    stallTypes: [],
    featuredExhibitors: [
      { name: "Avani Banaras", founder: "Radhika Keshri", city: "Varanasi", category: "Handloom Brocades" },
      { name: "Nitya Silver", founder: "Nitya Sen", city: "Patna", category: "925 Silver Filigree" }
    ],
    faqs: [],
    highlights: [
      "Inaugurated by prominent regional dignitaries celebrating women founders.",
      "Over 92% of exhibitors re-registered for the subsequent edition.",
      "Covered extensively across regional publications and digital lifestyle portals."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    ],
    bookingsOpen: false
  },
  {
    id: "festive-grandeur-3",
    slug: "festive-grandeur-edition-3",
    name: "Festive Grandeur",
    title: "Festive Grandeur",
    edition: "Edition 03",
    status: "past",
    isFlagship: false,
    bookingStatus: "COMPLETED",
    statusLabel: "COMPLETED ARCHIVE",
    badgeColor: "bg-[#2A1C24]/80 text-[#E9AD83] border border-[#E9AD83]/30",
    date: "21 & 22 OCTOBER 2023",
    dates: "21 & 22 OCTOBER 2023",
    startDate: "2023-10-21",
    endDate: "2023-10-22",
    days: "Saturday & Sunday",
    timings: "11:00 AM – 9:00 PM IST",
    year: "2023",
    venue: "Lemon Tree Premier",
    hall: "Tangerine Grand",
    city: "Patna",
    location: "Exhibition Road, Patna",
    tagline: "Pre-Diwali Extravaganza with 42 Curated Labels",
    shortDescription: "The 3rd chapter established UDAAN's hallmark 5-star festive pre-Diwali format with 42 exclusive brands and record patron footfall.",
    description: "The 3rd edition solidified UDAAN as Bihar's premier pre-Diwali destination. Featuring 42 exclusive brands, curated festive gift hampers, live music, and hourly lucky draws for visitors.",
    poster: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1800&q=80",
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "EXHIBITORS", value: "42" },
      { label: "FOOTFALL", value: "4,800+" },
      { label: "AVERAGE RATING", value: "4.9/5" },
      { label: "SATISFACTION", value: "100%" },
    ],
    categories: [
      "Festive Sarees & Lehengas",
      "Temple Jewellery",
      "Scented Soy Wax Candles",
      "Gourmet Baklavas"
    ],
    whoCanExhibit: [],
    whyExhibit: [],
    stallTypes: [],
    featuredExhibitors: [],
    faqs: [],
    highlights: [
      "Over 4,800 affluent patrons visited over two consecutive days.",
      "Hosted dedicated influencer live-stream sessions showcasing participating brands.",
      "Zero admission fee policy with complimentary valet parking."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    bookingsOpen: false
  },
  {
    id: "spring-soiree-2",
    slug: "spring-soiree-edition-2",
    name: "Spring Soirée",
    title: "Spring Soirée",
    edition: "Edition 02",
    status: "past",
    isFlagship: false,
    bookingStatus: "COMPLETED",
    statusLabel: "COMPLETED ARCHIVE",
    badgeColor: "bg-[#2A1C24]/80 text-[#E9AD83] border border-[#E9AD83]/30",
    date: "18 & 19 MARCH 2023",
    dates: "18 & 19 MARCH 2023",
    startDate: "2023-03-18",
    endDate: "2023-03-19",
    days: "Saturday & Sunday",
    timings: "11:00 AM – 8:30 PM IST",
    year: "2023",
    venue: "Lemon Tree Premier",
    hall: "Tangerine Grand",
    city: "Patna",
    location: "Exhibition Road, Patna",
    tagline: "Summer Bridal Pret & Handcrafted Silver Jewellery",
    shortDescription: "Introduced summer festive pastels, lightweight wedding wear, and pure silver jewellery in an intimate 5-star hotel setting.",
    description: "The spring edition introduced lightweight pastel festive wear and fine 925 silver jewellery collections, expanding UDAAN from a single annual festival to a multi-season growth platform for women entrepreneurs.",
    poster: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=80",
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "EXHIBITORS", value: "35" },
      { label: "VISITORS", value: "4,100+" },
      { label: "CITIES", value: "5 Cities" },
      { label: "DURATION", value: "2 Days" },
    ],
    categories: [
      "Summer Cotton Pret",
      "Silver Filigree Ornaments",
      "Organic Beauty Care",
      "Handcrafted Potli Bags"
    ],
    whoCanExhibit: [],
    whyExhibit: [],
    stallTypes: [],
    featuredExhibitors: [],
    faqs: [],
    highlights: [
      "First edition organized at the newly inaugurated Lemon Tree Premier venue.",
      "Showcased artisans from Patna, Varanasi, Ranchi, and Kolkata.",
      "Special focus on women-founded home-grown skincare formulations."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
    ],
    bookingsOpen: false
  },
  {
    id: "diwali-inaugural-1",
    slug: "diwali-inaugural-edition-1",
    name: "Diwali Inaugural",
    title: "Diwali Inaugural",
    edition: "Edition 01",
    status: "past",
    isFlagship: false,
    bookingStatus: "COMPLETED",
    statusLabel: "COMPLETED ARCHIVE",
    badgeColor: "bg-[#2A1C24]/80 text-[#E9AD83] border border-[#E9AD83]/30",
    date: "15 & 16 OCTOBER 2022",
    dates: "15 & 16 OCTOBER 2022",
    startDate: "2022-10-15",
    endDate: "2022-10-16",
    days: "Saturday & Sunday",
    timings: "11:00 AM – 8:30 PM IST",
    year: "2022",
    venue: "Hotel Maurya",
    hall: "Kautilya Hall",
    city: "Patna",
    location: "Fraser Road, South Gandhi Maidan, Patna",
    tagline: "The Inaugural Stage: 28 Pioneering Women Brands",
    shortDescription: "The founding edition that ignited the UDAAN movement, giving 28 pioneering women creators a prestigious stage.",
    description: "Where the UDAAN journey took flight. Conceived to give Bihar's women entrepreneurs an uncompromising luxury stage, the inaugural edition welcomed 28 pioneering brands and more than 3,200 enthusiastic patrons.",
    poster: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "PIONEER BRANDS", value: "28" },
      { label: "INAUGURAL PATRONS", value: "3,200+" },
      { label: "FOUNDATION", value: "Oct 2022" },
      { label: "SUCCESS RATE", value: "98%" },
    ],
    categories: [
      "Traditional Handlooms",
      "Kundan & Meenakari Jewels",
      "Festive Gift Confections",
      "Madhubani Artefacts"
    ],
    whoCanExhibit: [],
    whyExhibit: [],
    stallTypes: [],
    featuredExhibitors: [],
    faqs: [],
    highlights: [
      "The founding edition that proved the immense appetite for curated luxury exhibitions in Patna.",
      "Featured exclusively women founders, providing turnkey exhibition support and lighting.",
      "Established the core mission: 'Where Women Build Brands'."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80"
    ],
    bookingsOpen: false
  }
];

export const getEventBySlug = (slug) => {
  if (!slug) return EVENTS_CATALOG[0];
  const normalized = slug.toLowerCase().trim();
  return (
    EVENTS_CATALOG.find(
      (e) =>
        e.slug.toLowerCase() === normalized ||
        e.id.toLowerCase() === normalized ||
        (e.legacySlug && e.legacySlug.toLowerCase() === normalized)
    ) || EVENTS_CATALOG[0]
  );
};
