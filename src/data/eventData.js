export const BRAND = {
  name: "UDAAN",
  hindiName: "उड़ान",
  tagline: "महिलाओं की नई पहचान",
  positioning: "WHERE WOMEN BUILD BRANDS.",
  description: "A premier exhibition and growth ecosystem dedicated to empowering women entrepreneurs, creators, artisans, and visionary lifestyle brands.",
  pillars: [
    { title: "DISCOVER", subtitle: "Curated Talents", desc: "Handpicked brands showcasing authentic craft and modern luxury." },
    { title: "EXHIBIT", subtitle: "Grand Stage", desc: "Exhibition pavilions at 5-star destination venues with high footfall." },
    { title: "CONNECT", subtitle: "Elite Network", desc: "Direct access to high-net-worth buyers, influencers, and patrons." },
    { title: "GROW", subtitle: "Brand Elevation", desc: "Transform local artisan journeys into recognized regional powerhouses." }
  ]
};

export const FEATURED_EVENT = {
  name: "GLAMOUR GALA",
  edition: "DIWALI EDITION 5",
  dates: "24 & 25 OCTOBER 2026",
  datesFormatted: "Saturday 24 & Sunday 25 October 2026",
  time: "11:00 AM – 9:00 PM IST",
  city: "Patna",
  venue: {
    name: "Lemon Tree Premier",
    hall: "Tangerine Grand",
    floor: "Ground Floor",
    address: "Plot No. 876, Exhibition Road, Near Gandhi Maidan, Patna, Bihar 800001",
    landmarks: "Opposite RBI Regional Office / Near Biscomaun Bhawan"
  },
  status: "STALL BOOKINGS NOW OPEN",
  statusNote: "Early-bird stalls filling fast for Patna's biggest festive pre-Diwali celebration."
};

export const CATEGORIES = [
  {
    id: "fashion",
    title: "Fashion & Apparels",
    hindi: "परिधान एवं फैशन",
    description: "Festive couture, Banarasi handlooms, contemporary fusion wear, Indo-western drapes, and designer pret collections.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    tags: ["Bridal Pret", "Handloom Silks", "Festive Kurtas", "Fusion wear"]
  },
  {
    id: "jewellery",
    title: "Jewellery",
    hindi: "पारंपरिक व आधुनिक आभूषण",
    description: "Polki masterpieces, temple jewellery, fine 925 sterling silver, statement kundan pieces, and contemporary gems.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    tags: ["Polki & Kundan", "Temple Jewels", "Silver Filigree", "Everyday Fine"]
  },
  {
    id: "homedecor",
    title: "Home Decor & Lifestyle",
    hindi: "गृह सज्जा व जीवनशैली",
    description: "Artisanal brass urlis, hand-poured festive soy candles, block-printed table linens, festive diyas, and sculptural ceramics.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    tags: ["Brass Artefacts", "Luxury Candles", "Ceramics", "Festive Hampers"]
  },
  {
    id: "beauty",
    title: "Beauty & Wellness",
    hindi: "सौंदर्य एवं स्वास्थ्य",
    description: "Clean plant-based skincare, pure cold-pressed botanical oils, holistic Ayurvedic elixirs, and bespoke organic fragrances.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    tags: ["Ayurvedic Blends", "Organic Perfumes", "Clean Skincare", "Bath Essentials"]
  },
  {
    id: "handmade",
    title: "Handmade & Gift Items",
    hindi: "हस्तशिल्प व उपहार",
    description: "Original Madhubani fine art canvasses, hand-bound leather journals, macramé craft, and bespoke festive gift packages.",
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80",
    tags: ["Madhubani Art", "Handmade Stationery", "Festive Boxes", "Resin Crafts"]
  },
  {
    id: "food",
    title: "Gourmet & Sweets",
    hindi: "पारंपरिक व आधुनिक व्यंजन",
    description: "Artisanal dry fruit confections, hand-rolled royal baklavas, organic herbal teas, infused honeys, and gourmet bites.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    tags: ["Artisanal Mithai", "Gourmet Dry Fruits", "Festive Hampers", "Herbal Infusions"]
  }
];

export const STALLS_DATA = [
  // Royal Pavilion (Center / Premium Front)
  { id: "P-01", type: "Royal Pavilion", size: "4m x 3m", location: "Entrance Promenade", status: "BOOKED", category: "Fashion & Apparels", exhibitor: "Virasat Weaves" },
  { id: "P-02", type: "Royal Pavilion", size: "4m x 3m", location: "Entrance Promenade", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "P-03", type: "Royal Pavilion", size: "4m x 3m", location: "Grand Centerpiece", status: "RESERVED", category: "Jewellery", exhibitor: "Aashna Fine Jewels" },
  { id: "P-04", type: "Royal Pavilion", size: "4m x 3m", location: "Grand Centerpiece", status: "BOOKED", category: "Jewellery", exhibitor: "Roopkala Polki" },
  
  // Aisle A (Fashion & Apparels)
  { id: "A-01", type: "Corner Prime", size: "3m x 3m", location: "North Aisle Entrance", status: "BOOKED", category: "Fashion & Apparels", exhibitor: "Gulab Pret" },
  { id: "A-02", type: "Standard Stalls", size: "3m x 2.5m", location: "North Aisle", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "A-03", type: "Standard Stalls", size: "3m x 2.5m", location: "North Aisle", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "A-04", type: "Corner Prime", size: "3m x 3m", location: "North Center Crossing", status: "RESERVED", category: "Fashion & Apparels", exhibitor: "Noor Studio" },
  { id: "A-05", type: "Standard Stalls", size: "3m x 2.5m", location: "North Center Crossing", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "A-06", type: "Standard Stalls", size: "3m x 2.5m", location: "North East Wing", status: "AVAILABLE", category: "Open Category", exhibitor: null },

  // Aisle B (Jewellery & Accessories)
  { id: "B-01", type: "Corner Prime", size: "3m x 3m", location: "Central Boulevard", status: "BOOKED", category: "Jewellery", exhibitor: "Svara Silver" },
  { id: "B-02", type: "Standard Stalls", size: "3m x 2.5m", location: "Central Boulevard", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "B-03", type: "Standard Stalls", size: "3m x 2.5m", location: "Central Boulevard", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "B-04", type: "Corner Prime", size: "3m x 3m", location: "Central Crossing", status: "BOOKED", category: "Jewellery", exhibitor: "Mayura Jewels" },
  { id: "B-05", type: "Standard Stalls", size: "3m x 2.5m", location: "Central Crossing", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "B-06", type: "Standard Stalls", size: "3m x 2.5m", location: "East Courtyard", status: "AVAILABLE", category: "Open Category", exhibitor: null },

  // Aisle C (Home Decor & Lifestyle)
  { id: "C-01", type: "Corner Prime", size: "3m x 3m", location: "South Boulevard", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "C-02", type: "Standard Stalls", size: "3m x 2.5m", location: "South Boulevard", status: "BOOKED", category: "Home Decor", exhibitor: "Mitti & Clay" },
  { id: "C-03", type: "Standard Stalls", size: "3m x 2.5m", location: "South Boulevard", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "C-04", type: "Corner Prime", size: "3m x 3m", location: "South Center Crossing", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "C-05", type: "Standard Stalls", size: "3m x 2.5m", location: "South Center Crossing", status: "RESERVED", category: "Lifestyle", exhibitor: "Diya Aromatics" },
  { id: "C-06", type: "Standard Stalls", size: "3m x 2.5m", location: "South East Wing", status: "AVAILABLE", category: "Open Category", exhibitor: null },

  // Aisle D (Beauty, Wellness & Handcrafted)
  { id: "D-01", type: "Corner Prime", size: "3m x 3m", location: "Artisan Courtyard", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "D-02", type: "Standard Stalls", size: "3m x 2.5m", location: "Artisan Courtyard", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "D-03", type: "Standard Stalls", size: "3m x 2.5m", location: "Artisan Courtyard", status: "BOOKED", category: "Handmade", exhibitor: "Mithila Strokes" },
  { id: "D-04", type: "Corner Prime", size: "3m x 3m", location: "Food & Confectionery", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "D-05", type: "Standard Stalls", size: "3m x 2.5m", location: "Food & Confectionery", status: "AVAILABLE", category: "Open Category", exhibitor: null },
  { id: "D-06", type: "Standard Stalls", size: "3m x 2.5m", location: "Gourmet Lounge", status: "BOOKED", category: "Gourmet", exhibitor: "Pataliputra Bakes" }
];

export const BRANDS_DIRECTORY = [
  {
    name: "Virasat Weaves",
    founder: "Sunita & Ananya Verma",
    category: "Fashion & Apparels",
    city: "Varanasi / Patna",
    stall: "P-01",
    tagline: "Heirloom Katan Silks & Zari Banarasis",
    desc: "Reviving generational handlooms directly from master weavers of Uttar Pradesh and Bihar.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    instagram: "@virasatweaves"
  },
  {
    name: "Aashna Fine Jewels",
    founder: "Aashna Singhania",
    category: "Jewellery",
    city: "Jaipur / Patna",
    stall: "P-03",
    tagline: "Heritage Jadau & Uncut Diamonds",
    desc: "Bespoke polki jewellery hand-crafted in 22kt hallmarked gold for bridal and festive grandeur.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    instagram: "@aashnafinejewels"
  },
  {
    name: "Gulab Pret",
    founder: "Pooja Kashyap",
    category: "Fashion & Apparels",
    city: "Patna",
    stall: "A-01",
    tagline: "Contemporary Festive Ready-to-Wear",
    desc: "Soft organza, hand-embroidered gota patti, and modern breezy silhouettes for Diwali soirées.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    instagram: "@gulabpret"
  },
  {
    name: "Mitti & Clay Living",
    founder: "Dr. Rashmi Sinha",
    category: "Home Decor & Lifestyle",
    city: "Ranchi / Patna",
    stall: "C-02",
    tagline: "Artisanal Terracotta & Brass Tableware",
    desc: "Bridging ancient pottery crafts with minimal contemporary dining aesthetics.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    instagram: "@mittiandclay"
  },
  {
    name: "Mithila Strokes",
    founder: "Usha Devi & Neha Jha",
    category: "Handmade & Gift Items",
    city: "Madhubani",
    stall: "D-03",
    tagline: "National Award-winning Madhubani Art",
    desc: "Fine natural pigment paintings, ceremonial dupattas, and handcrafted festive packaging.",
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=600&q=80",
    instagram: "@mithilastrokes"
  },
  {
    name: "Diya Aromatics",
    founder: "Shreya Shambhavi",
    category: "Beauty & Wellness",
    city: "Patna",
    stall: "C-05",
    tagline: "Pure Floral Attars & Candle Alchemy",
    desc: "Steam-distilled kannauj gulab attars, temple mogra, and non-toxic soy wax candles.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    instagram: "@diyaaromatics"
  }
];

export const GALLERY_ITEMS = [
  {
    title: "Grand Exhibition Ambiance",
    subtitle: "Lemon Tree Premier Patna",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    category: "Exhibition"
  },
  {
    title: "Handloom Heritage",
    subtitle: "Artisanal Silk Drapes",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    category: "Couture"
  },
  {
    title: "Royal Kundan Adornment",
    subtitle: "Festive Jewellery Showcase",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
    category: "Jewellery"
  },
  {
    title: "Curated Living & Festive Decor",
    subtitle: "Handcrafted Brass & Candlelight",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80",
    category: "Decor"
  },
  {
    title: "Women Entrepreneurs in Conversation",
    subtitle: "Founder Networking & Growth",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    category: "Founders"
  },
  {
    title: "Bespoke Confectionery & Hampers",
    subtitle: "Gourmet Tasting Pavilion",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    category: "Gourmet"
  }
];

export const FAQS = [
  {
    question: "When and where is Glamour Gala Diwali Edition 5 taking place?",
    answer: "Glamour Gala Edition 5 will be held on Saturday 24th and Sunday 25th October 2026 at Tangerine Grand, Ground Floor, Lemon Tree Premier, Exhibition Road, Patna. Timings are 11:00 AM to 9:00 PM on both days."
  },
  {
    question: "How do women entrepreneurs apply for a stall?",
    answer: "You can click 'Book a Stall' on this website or select an available stall on the interactive floor map. Fill out your brand details, product category, and contact information. Our curation committee will review your application within 24 hours to confirm allotment."
  },
  {
    question: "What amenities are included with stall booking?",
    answer: "Each curated stall includes octanorm/custom partition walls, branded fascia with your name, 2 spotlights, 1 power socket (5A/15A), standard table & chairs, dustbin, hall security, daily housekeeping, and inclusion in the official UDAAN event directory and digital promotions."
  },
  {
    question: "Is entry ticketed for visitors?",
    answer: "Visitor entry is complimentary with pre-registration online. Visitors receive a digital entry pass on WhatsApp/Email for seamless entry at the Lemon Tree Premier reception desk."
  },
  {
    question: "What makes UDAAN different from generic shopping fairs?",
    answer: "UDAAN is specifically designed as a high-trust, luxury brand-building ecosystem for women founders. By holding the exhibition at a 5-star venue right before Diwali, we curate verified high-net-worth buyers looking for genuine heirloom products, artisanal couture, and bespoke festive gifts."
  }
];
