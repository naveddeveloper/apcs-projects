/**
 * Navedi Mall - Centralized Product Catalog Database
 * High quality demo products utilizing local assets and realistic eCommerce attributes.
 */

'use strict';

const PRODUCTS = [
  {
    id: 101,
    name: "Mens Winter Leather Jacket",
    category: "Mens",
    subCategory: "Jacket",
    brand: "Navedi Luxe",
    price: 48.00,
    originalPrice: 75.00,
    discount: 36,
    rating: 4.8,
    reviewsCount: 124,
    inStock: true,
    stockCount: 28,
    images: [
      "./assets/images/products/jacket-3.jpg",
      "./assets/images/products/jacket-4.jpg",
      "./assets/images/products/jacket-1.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Coffee Brown", hex: "#4A2E1B" },
      { name: "Onyx Black", hex: "#1E1E1E" },
      { name: "Tan", hex: "#A57147" }
    ],
    description: "Crafted from premium full-grain synthetic leather with a warm quilted lining, this classic jacket delivers timeless style and rugged durability for chilly evenings.",
    features: [
      "Water-resistant coated finish",
      "Thermal quilted interior insulation",
      "Two deep chest zipper pockets and two interior stash pockets",
      "Adjustable snap-cuffs and heavy-duty brass zipper"
    ],
    specs: {
      "Material": "Faux Leather / Polyester Lining",
      "Closure": "Full-length metal zipper",
      "Fit": "Regular fit",
      "Care": "Wipe clean with damp cloth"
    },
    tags: ["bestseller", "featured", "winter"]
  },
  {
    id: 102,
    name: "Pure Garment Dyed Cotton Shirt",
    category: "Mens",
    subCategory: "Shirt",
    brand: "UrbanEdge",
    price: 45.00,
    originalPrice: 56.00,
    discount: 20,
    rating: 4.6,
    reviewsCount: 89,
    inStock: true,
    stockCount: 45,
    images: [
      "./assets/images/products/shirt-1.jpg",
      "./assets/images/products/shirt-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Slate Blue", hex: "#4B6B94" },
      { name: "Sage Green", hex: "#6E8B76" },
      { name: "Crisp White", hex: "#FFFFFF" }
    ],
    description: "Breathable 100% combed cotton woven with garment-dye craftsmanship for a relaxed, broken-in feel right out of the box. Ideal for smart-casual weekends or work.",
    features: [
      "100% organic combed cotton",
      "Pre-washed for zero shrinkage and ultra-soft feel",
      "Button-down collar with reinforced buttons",
      "Single chest patch pocket"
    ],
    specs: {
      "Material": "100% Combed Cotton",
      "Collar": "Button-down",
      "Pattern": "Solid",
      "Care": "Machine wash cold"
    },
    tags: ["new", "bestseller"]
  },
  {
    id: 103,
    name: "MEN Yarn Fleece Full-Zip Jacket",
    category: "Mens",
    subCategory: "Jacket",
    brand: "AeroSport",
    price: 58.00,
    originalPrice: 65.00,
    discount: 11,
    rating: 4.7,
    reviewsCount: 63,
    inStock: true,
    stockCount: 30,
    images: [
      "./assets/images/products/jacket-5.jpg",
      "./assets/images/products/jacket-6.jpg",
      "./assets/images/products/jacket-2.jpg"
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Charcoal Heather", hex: "#374151" },
      { name: "Navy Blue", hex: "#1E3A8A" }
    ],
    description: "Ultra-cozy knitted yarn fleece sweater jacket featuring soft brushed interior fleece and ergonomic raglan sleeves for warmth without bulk.",
    features: [
      "Knitted fleece with high thermal retention",
      "Stand-up collar to block chilly winds",
      "Zippered handwarmer pockets",
      "Elastic binding on cuffs and hem"
    ],
    specs: {
      "Material": "100% Recycled Polyester Fleece",
      "Weight": "420g",
      "Fit": "Modern Athletic",
      "Care": "Tumble dry low"
    },
    tags: ["trending", "featured"]
  },
  {
    id: 104,
    name: "Classic Mens Casual Shirt",
    category: "Mens",
    subCategory: "Shirt",
    brand: "UrbanEdge",
    price: 38.00,
    originalPrice: 48.00,
    discount: 21,
    rating: 4.5,
    reviewsCount: 42,
    inStock: true,
    stockCount: 52,
    images: [
      "./assets/images/products/clothes-3.jpg",
      "./assets/images/products/clothes-4.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Mustard Gold", hex: "#D97706" },
      { name: "Olive", hex: "#4B5320" }
    ],
    description: "Everyday versatile casual shirt made with lightweight linen-cotton blend. Breathable, comfortable, and effortlessly stylish whether tucked in or untucked.",
    features: [
      "Lightweight linen-cotton blend",
      "Curved hemline for untucked styling",
      "Double-stitched seams for longevity",
      "Wrinkle-resistant weave"
    ],
    specs: {
      "Material": "70% Cotton, 30% Linen",
      "Weave": "Oxford",
      "Fit": "Tailored Fit",
      "Care": "Machine wash"
    },
    tags: ["trending"]
  },
  {
    id: 105,
    name: "Relaxed Fit Denim Shorts",
    category: "Mens",
    subCategory: "Shorts",
    brand: "UrbanEdge",
    price: 32.00,
    originalPrice: 42.00,
    discount: 24,
    rating: 4.4,
    reviewsCount: 38,
    inStock: true,
    stockCount: 40,
    images: [
      "./assets/images/products/shorts-1.jpg",
      "./assets/images/products/shorts-2.jpg"
    ],
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Indigo Blue", hex: "#2563EB" },
      { name: "Washed Black", hex: "#27272A" }
    ],
    description: "Classic five-pocket denim shorts built with flex stretch technology for all-day comfort during warm summer afternoons.",
    features: [
      "Stretch denim construction",
      "Reinforced belt loops and brass rivets",
      "Slightly rolled cuffs",
      "Comfort stretch waistband"
    ],
    specs: {
      "Material": "98% Cotton, 2% Elastane",
      "Inseam": "9 inches",
      "Rise": "Mid rise",
      "Care": "Machine wash inside out"
    },
    tags: ["deal", "summer"]
  },
  {
    id: 106,
    name: "Mens Leather Reversible Belt",
    category: "Accessories",
    subCategory: "Belt",
    brand: "Navedi Luxe",
    price: 24.00,
    originalPrice: 35.00,
    discount: 31,
    rating: 4.6,
    reviewsCount: 95,
    inStock: true,
    stockCount: 65,
    images: [
      "./assets/images/products/belt.jpg"
    ],
    sizes: ["32-34", "36-38", "40-42"],
    colors: [
      { name: "Black / Brown Reversible", hex: "#1A1A1A" }
    ],
    description: "Versatile 2-in-1 genuine leather belt featuring an easy twist buckle that switches between sleek black and rich chestnut brown.",
    features: [
      "100% Genuine full-grain leather",
      "360-degree rotating twist buckle",
      "Brushed alloy hardware with anti-tarnish coating",
      "Includes protective gift box"
    ],
    specs: {
      "Material": "Genuine Leather",
      "Width": "1.35 inches",
      "Buckle": "Zinc Alloy Twist Mechanism",
      "Care": "Leather cleaner wipe"
    },
    tags: ["bestseller", "accessories"]
  },
  {
    id: 107,
    name: "Rose Gold Peacock Earrings",
    category: "Jewelry",
    subCategory: "Earrings",
    brand: "Velvet & Co.",
    price: 20.00,
    originalPrice: 32.00,
    discount: 38,
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    stockCount: 22,
    images: [
      "./assets/images/products/jewellery-1.jpg"
    ],
    sizes: ["Standard"],
    colors: [
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Silver", hex: "#E5E7EB" }
    ],
    description: "Stunning handcrafted peacock motif drop earrings electroplated in 18K rose gold and adorned with sparkling micro-cubic zirconia stones.",
    features: [
      "18K Rose Gold electroplated brass",
      "Grade AAAAA cubic zirconia crystal embellishment",
      "Hypoallergenic sterling silver ear pins",
      "Lightweight ergonomic drop design"
    ],
    specs: {
      "Plating": "18K Rose Gold",
      "Closure": "Push Back",
      "Weight": "8g per pair",
      "Care": "Keep dry, store in airtight pouch"
    },
    tags: ["bestseller", "featured", "jewelry"]
  },
  {
    id: 108,
    name: "Platinum Zircon Classic Ring",
    category: "Jewelry",
    subCategory: "Rings",
    brand: "Velvet & Co.",
    price: 62.00,
    originalPrice: 85.00,
    discount: 27,
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    stockCount: 18,
    images: [
      "./assets/images/products/jewellery-2.jpg"
    ],
    sizes: ["6", "7", "8", "9"],
    colors: [
      { name: "Platinum Silver", hex: "#E5E7EB" }
    ],
    description: "An elegant solitaire style ring set with a brilliant round-cut zirconia center surrounded by micro-pavé halo accents on a platinum-plated band.",
    features: [
      "Rhodium & platinum multi-layer plating",
      "Hand-set round brilliant cut center stone (1.5 ct eq)",
      "Smooth inner comfort band",
      "Scratch-resistant tarnish-free coating"
    ],
    specs: {
      "Base Metal": "925 Sterling Silver",
      "Stone": "Simulated Diamond CZ",
      "Band Width": "2mm",
      "Care": "Gentle jewelry polishing cloth"
    },
    tags: ["featured", "jewelry"]
  },
  {
    id: 109,
    name: "Silver Deer Heart Necklace",
    category: "Jewelry",
    subCategory: "Necklace",
    brand: "Velvet & Co.",
    price: 44.00,
    originalPrice: 60.00,
    discount: 27,
    rating: 4.9,
    reviewsCount: 110,
    inStock: true,
    stockCount: 25,
    images: [
      "./assets/images/products/jewellery-3.jpg"
    ],
    sizes: ["18-inch + 2-inch extender"],
    colors: [
      { name: "Sterling Silver", hex: "#E5E7EB" },
      { name: "Rose Gold", hex: "#B76E79" }
    ],
    description: "Whimsical forest-inspired pendant featuring a delicate deer silhouette cradling a heart-cut crystal on a fine sterling silver box chain.",
    features: [
      "Solid 925 sterling silver construction",
      "Heart-shaped Austrian crystal pendant",
      "Lobster clasp with 2-inch extender chain",
      "Lead-free, nickel-free, hypoallergenic"
    ],
    specs: {
      "Chain Length": "18 inches + 2 inches",
      "Pendant Size": "20mm x 16mm",
      "Weight": "6.5g",
      "Care": "Avoid chemical perfumes and pool water"
    },
    tags: ["bestseller", "new"]
  },
  {
    id: 110,
    name: "Smart Watch Vital Plus AMOLED",
    category: "Watches",
    subCategory: "Smartwatch",
    brand: "ChronoMaster",
    price: 89.00,
    originalPrice: 130.00,
    discount: 32,
    rating: 4.8,
    reviewsCount: 240,
    inStock: true,
    stockCount: 35,
    images: [
      "./assets/images/products/watch-1.jpg",
      "./assets/images/products/watch-2.jpg"
    ],
    sizes: ["42mm", "46mm"],
    colors: [
      { name: "Space Gray", hex: "#4B5563" },
      { name: "Midnight Black", hex: "#111827" },
      { name: "Rose Gold", hex: "#B76E79" }
    ],
    description: "Feature-packed smart fitness companion equipped with a vibrant 1.43-inch AMOLED always-on display, heart-rate tracking, SpO2 sensor, and 10-day battery life.",
    features: [
      "1.43” HD AMOLED Always-on Display",
      "Continuous 24/7 heart rate, sleep & blood oxygen monitoring",
      "100+ sports tracking modes & IP68 waterproof rating",
      "Bluetooth calling and notification syncing with iOS & Android"
    ],
    specs: {
      "Battery Life": "Up to 10 days normal use",
      "Compatibility": "iOS 10+ / Android 6.0+",
      "Water Resistance": "IP68 (50m)",
      "Weight": "45g"
    },
    tags: ["featured", "deal", "trending", "bestseller"]
  },
  {
    id: 111,
    name: "Pocket Watch Vintage Leather Pouch",
    category: "Watches",
    subCategory: "Classic",
    brand: "ChronoMaster",
    price: 50.00,
    originalPrice: 68.00,
    discount: 26,
    rating: 4.7,
    reviewsCount: 51,
    inStock: true,
    stockCount: 15,
    images: [
      "./assets/images/products/watch-3.jpg",
      "./assets/images/products/watch-4.jpg"
    ],
    sizes: ["Standard"],
    colors: [
      { name: "Antique Bronze", hex: "#8C6239" },
      { name: "Polished Silver", hex: "#CBD5E1" }
    ],
    description: "Vintage-inspired mechanical pocket watch complete with engraved floral cover casing, skeleton dial display, and a handcrafted genuine leather protective pouch.",
    features: [
      "Precision hand-wind mechanical movement",
      "Steampunk skeleton dial showing gear mechanism",
      "Includes 14-inch pocket fob chain with clip",
      "Custom leather holster with belt loop"
    ],
    specs: {
      "Movement": "Mechanical Hand-wind",
      "Case Diameter": "47mm",
      "Case Material": "Vintage Bronze Alloy",
      "Warranty": "2 Years"
    },
    tags: ["bestseller", "vintage"]
  },
  {
    id: 112,
    name: "Luxury Chronograph Gold Watch",
    category: "Watches",
    subCategory: "Luxury",
    brand: "ChronoMaster",
    price: 125.00,
    originalPrice: 175.00,
    discount: 29,
    rating: 4.9,
    reviewsCount: 78,
    inStock: true,
    stockCount: 14,
    images: [
      "./assets/images/products/watch-2.jpg",
      "./assets/images/products/watch-1.jpg"
    ],
    sizes: ["44mm"],
    colors: [
      { name: "Gold / Navy Dial", hex: "#D97706" },
      { name: "All Gold", hex: "#F59E0B" }
    ],
    description: "An assertive luxury chronograph crafted in surgical-grade 316L stainless steel with rich 18K yellow gold ion-plating and scratch-proof sapphire crystal glass.",
    features: [
      "Japanese Miyota Quartz Chronograph Movement",
      "Scratch-resistant synthetic sapphire crystal",
      "Subdials for 60-second, 30-minute, and 24-hour readouts",
      "10 ATM / 100 meters water resistance"
    ],
    specs: {
      "Case Material": "316L Stainless Steel (Gold PVD)",
      "Glass": "Sapphire Crystal",
      "Band Width": "22mm",
      "Water Resistance": "100m"
    },
    tags: ["featured", "luxury"]
  },
  {
    id: 113,
    name: "Titan 100ml Eau De Parfum for Women",
    category: "Cosmetics",
    subCategory: "Perfume",
    brand: "PureBotanics",
    price: 42.00,
    originalPrice: 65.00,
    discount: 35,
    rating: 4.8,
    reviewsCount: 195,
    inStock: true,
    stockCount: 38,
    images: [
      "./assets/images/products/perfume.jpg"
    ],
    sizes: ["100ml / 3.4 fl.oz"],
    colors: [
      { name: "Rose Blush Glass", hex: "#FDA4AF" }
    ],
    description: "An intoxicating blend of wild jasmine, sparkling mandarin, velvety vanilla orchid, and warm white amber designed for evening sophistication.",
    features: [
      "Long-lasting 12-hour oil concentration formula",
      "Top Notes: Mandarin, Bergamot, Pink Pepper",
      "Heart Notes: Jasmine Sambac, Vanilla Orchid",
      "Base Notes: White Amber, Sandalwood, Musk"
    ],
    specs: {
      "Volume": "100 ml (3.4 fl. oz.)",
      "Concentration": "Eau de Parfum (EDP)",
      "Formulation": "Spray",
      "Country of Origin": "France"
    },
    tags: ["bestseller", "featured", "perfume"]
  },
  {
    id: 114,
    name: "Organic Argan Oil Shampoo & Conditioner",
    category: "Cosmetics",
    subCategory: "Haircare",
    brand: "PureBotanics",
    price: 25.00,
    originalPrice: 38.00,
    discount: 34,
    rating: 4.7,
    reviewsCount: 164,
    inStock: true,
    stockCount: 50,
    images: [
      "./assets/images/products/shampoo.jpg"
    ],
    sizes: ["Set of 2 x 400ml"],
    colors: [
      { name: "Amber Botanical", hex: "#78350F" }
    ],
    description: "Sulfate-free nourishing hair care duo enriched with cold-pressed Moroccan argan oil, keratin protein, and aloe vera to restore shine and repair damage.",
    features: [
      "Zero sulfates, parabens, phthalates, or artificial dyes",
      "Cold-pressed virgin Moroccan Argan oil",
      "Deep moisture infusion for color-treated & dry hair",
      "Cruelty-free & 100% vegan certified"
    ],
    specs: {
      "Set Includes": "1x Shampoo 400ml, 1x Conditioner 400ml",
      "Hair Type": "All hair types / Dry & Damaged",
      "Key Ingredient": "Moroccan Argan Oil",
      "Fragrance": "Natural Citrus Herbal"
    },
    tags: ["deal", "bestseller", "cosmetics"]
  },
  {
    id: 115,
    name: "Pro Performance Running Shoes",
    category: "Footwear",
    subCategory: "Sports",
    brand: "AeroSport",
    price: 74.00,
    originalPrice: 99.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 210,
    inStock: true,
    stockCount: 42,
    images: [
      "./assets/images/products/shoe-1.jpg",
      "./assets/images/products/shoe-1_1.jpg",
      "./assets/images/products/shoe-2.jpg"
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Carbon Red", hex: "#DC2626" },
      { name: "Stealth Black", hex: "#1F2937" },
      { name: "Electric Blue", hex: "#2563EB" }
    ],
    description: "Engineered for maximum responsiveness, these lightweight marathon running shoes feature high-rebound nitrogen-infused foam cushioning and breathable jacquard mesh.",
    features: [
      "Energy-return nitrogen foam midsole",
      "Breathable multi-zone engineered mesh upper",
      "Anti-slip high-abrasion rubber lug outsole",
      "Ortholite moisture-wicking comfort insole"
    ],
    specs: {
      "Weight": "240g (size 9)",
      "Drop": "8mm",
      "Arch Support": "Neutral",
      "Terrain": "Road, Track, Treadmill"
    },
    tags: ["bestseller", "featured", "sports"]
  },
  {
    id: 116,
    name: "Classic Leather Derby Formal Shoes",
    category: "Footwear",
    subCategory: "Formal",
    brand: "Navedi Luxe",
    price: 85.00,
    originalPrice: 120.00,
    discount: 29,
    rating: 4.7,
    reviewsCount: 92,
    inStock: true,
    stockCount: 20,
    images: [
      "./assets/images/products/shoe-2.jpg",
      "./assets/images/products/shoe-2_1.jpg",
      "./assets/images/products/shoe-3.jpg"
    ],
    sizes: ["8", "9", "10", "11"],
    colors: [
      { name: "Burnished Brown", hex: "#5C3826" },
      { name: "Classic Black", hex: "#171717" }
    ],
    description: "Handcrafted from vegetable-tanned Italian calfskin leather, these Derby shoes boast clean lines, Goodyear welt construction, and padded arch support for executive elegance.",
    features: [
      "100% Full-grain calfskin leather",
      "Goodyear-welted for resoleable longevity",
      "Memory foam cushioned leather footbed",
      "Slip-resistant rubber heel insert"
    ],
    specs: {
      "Upper": "Italian Calfskin Leather",
      "Sole": "Leather with Rubber Heel",
      "Closure": "Waxed Cotton Laces",
      "Fit": "True to size"
    },
    tags: ["featured", "footwear"]
  },
  {
    id: 117,
    name: "Retro Street Casual Sneakers",
    category: "Footwear",
    subCategory: "Casual",
    brand: "UrbanEdge",
    price: 52.00,
    originalPrice: 70.00,
    discount: 26,
    rating: 4.6,
    reviewsCount: 145,
    inStock: true,
    stockCount: 36,
    images: [
      "./assets/images/products/shoe-3.jpg",
      "./assets/images/products/shoe-4.jpg",
      "./assets/images/products/shoe-5.jpg"
    ],
    sizes: ["7", "8", "9", "10", "11"],
    colors: [
      { name: "White / Forest Green", hex: "#15803D" },
      { name: "Triple White", hex: "#F3F4F6" },
      { name: "Vintage Grey", hex: "#6B7280" }
    ],
    description: "Old-school court aesthetics meet contemporary everyday comfort. Supple leather overlays, perforated toe box, and padded collar for effortless street style.",
    features: [
      "Durable synthetic & suede leather combination",
      "Perforated toe cap for airflow",
      "Vulcanized flexible cupsole",
      "Padded tongue and ankle collar"
    ],
    specs: {
      "Upper": "Leather & Suede",
      "Sole": "Vulcanized Rubber",
      "Style": "Low-Top Sneaker",
      "Care": "Sneaker foam wipe"
    },
    tags: ["trending", "footwear"]
  },
  {
    id: 118,
    name: "Athletic Compression Training Shorts",
    category: "Sports",
    subCategory: "Apparel",
    brand: "AeroSport",
    price: 26.00,
    originalPrice: 38.00,
    discount: 32,
    rating: 4.7,
    reviewsCount: 76,
    inStock: true,
    stockCount: 48,
    images: [
      "./assets/images/products/sports-1.jpg",
      "./assets/images/products/sports-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Matte Black", hex: "#1F2937" },
      { name: "Gunmetal", hex: "#4B5563" }
    ],
    description: "2-in-1 performance training shorts with built-in compression liner, zippered phone pocket, and 4-way stretch fabric for distraction-free workouts.",
    features: [
      "Moisture-wicking 4-way stretch outer shell",
      "Anti-chafing compression inner tights",
      "Hidden bounce-free phone liner pocket",
      "Reflective accents for low-light night visibility"
    ],
    specs: {
      "Material": "88% Polyester, 12% Spandex",
      "Inseam": "7 inches",
      "Features": "Towel loop, hidden zipper pocket",
      "Care": "Machine wash cold"
    },
    tags: ["sports", "trending"]
  },
  {
    id: 119,
    name: "Pro Fitness Active Training Set",
    category: "Sports",
    subCategory: "Apparel",
    brand: "AeroSport",
    price: 49.00,
    originalPrice: 70.00,
    discount: 30,
    rating: 4.8,
    reviewsCount: 84,
    inStock: true,
    stockCount: 26,
    images: [
      "./assets/images/products/sports-3.jpg",
      "./assets/images/products/sports-4.jpg",
      "./assets/images/products/sports-5.jpg"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Navy Cobalt", hex: "#1E3A8A" },
      { name: "Crimson", hex: "#991B1B" }
    ],
    description: "Complete seamless gym training outfit including high-ventilation athletic t-shirt and moisture-regulating performance training joggers.",
    features: [
      "Sweat-wicking Dri-Tech yarn technology",
      "Ergonomic laser-cut ventilation zones",
      "Elastic waistband with drawcord adjustment",
      "Flatlock seams prevent skin friction"
    ],
    specs: {
      "Set": "T-Shirt + Training Pants",
      "Fabric": "Polyester-Elastane Tech Mesh",
      "Fit": "Athletic Slim",
      "Care": "Hang dry"
    },
    tags: ["deal", "sports"]
  },
  {
    id: 120,
    name: "Breathable Mesh Gym Sneakers",
    category: "Sports",
    subCategory: "Footwear",
    brand: "AeroSport",
    price: 64.00,
    originalPrice: 88.00,
    discount: 27,
    rating: 4.6,
    reviewsCount: 98,
    inStock: true,
    stockCount: 33,
    images: [
      "./assets/images/products/sports-6.jpg",
      "./assets/images/products/shoe-5.jpg"
    ],
    sizes: ["8", "9", "10", "11"],
    colors: [
      { name: "Neon Lime & Black", hex: "#84CC16" },
      { name: "Grey Orange", hex: "#F97316" }
    ],
    description: "Versatile gym cross-trainers providing lateral stability for weightlifting, agility drills, and high-intensity interval workouts.",
    features: [
      "Wide stable base with TPU heel clip",
      "Honeycomb open mesh upper for maximum cooling",
      "Shock-absorbing forefoot flex grooves",
      "Reinforced high-wear toe bumper"
    ],
    specs: {
      "Activity": "CrossFit, HIIT, Strength Training",
      "Sole": "High-density EVA + Gum Rubber",
      "Weight": "290g",
      "Closure": "Lace-up"
    },
    tags: ["sports", "new"]
  },
  {
    id: 121,
    name: "Silk Evening Cocktail Party Dress",
    category: "Womens",
    subCategory: "Dress",
    brand: "Velvet & Co.",
    price: 78.00,
    originalPrice: 110.00,
    discount: 29,
    rating: 4.9,
    reviewsCount: 132,
    inStock: true,
    stockCount: 16,
    images: [
      "./assets/images/products/party-wear-1.jpg",
      "./assets/images/products/party-wear-2.jpg",
      "./assets/images/products/clothes-1.jpg"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Emerald Green", hex: "#065F46" },
      { name: "Burgundy", hex: "#881337" },
      { name: "Midnight Black", hex: "#0F172A" }
    ],
    description: "Glamorous cowl-neck evening slip dress tailored from lustrous silk-satin with an alluring leg slit and delicate adjustable criss-cross back straps.",
    features: [
      "Ultra-soft fluid silk-satin drape",
      "Draped cowl neckline with hidden side zipper",
      "Adjustable spaghetti straps",
      "Flattering bias-cut silhouette"
    ],
    specs: {
      "Material": "95% Polyester Satin, 5% Spandex",
      "Length": "Midi length (below knee)",
      "Lining": "Self-lined bodice",
      "Care": "Dry clean or hand wash delicate"
    },
    tags: ["featured", "bestseller", "womens"]
  },
  {
    id: 122,
    name: "Embroidered Floral Summer Frock",
    category: "Womens",
    subCategory: "Dress",
    brand: "Velvet & Co.",
    price: 49.00,
    originalPrice: 68.00,
    discount: 28,
    rating: 4.7,
    reviewsCount: 67,
    inStock: true,
    stockCount: 24,
    images: [
      "./assets/images/products/party-wear-2.jpg",
      "./assets/images/products/clothes-2.jpg"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Blush Pink", hex: "#F472B6" },
      { name: "Sky Blue", hex: "#38BDF8" }
    ],
    description: "Lighthearted floral embroidered A-line sundress featuring sweet flutter sleeves, a cinched smocked bodice, and a tiered ruffle skirt.",
    features: [
      "100% breathable organic cotton",
      "Hand-embroidered daisy blossoms",
      "Stretchy smocked waist ensures flattering fit",
      "Dual hidden side-seam pockets"
    ],
    specs: {
      "Material": "100% Organic Cotton",
      "Neckline": "Sweetheart Neck",
      "Skirt Style": "Tiered Ruffle",
      "Care": "Machine wash gentle cold"
    },
    tags: ["trending", "summer", "womens"]
  },
  {
    id: 123,
    name: "Soft Knit Cozy Winter Cardigan",
    category: "Womens",
    subCategory: "Sweater",
    brand: "Velvet & Co.",
    price: 54.00,
    originalPrice: 72.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 89,
    inStock: true,
    stockCount: 30,
    images: [
      "./assets/images/products/clothes-1.jpg",
      "./assets/images/products/clothes-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Beige", hex: "#D6D3D1" },
      { name: "Dusty Mauve", hex: "#A855F7" }
    ],
    description: "Chunky cable-knit cardigan crafted with cloud-soft wool blend. Features tortoiseshell statement buttons and drop-shoulder styling for laid-back luxury.",
    features: [
      "Plush thermal cable-knit weave",
      "Natural tortoiseshell acetate buttons",
      "Relaxed drop shoulders and deep front pockets",
      "Ribbed cuffs and hem to preserve shape"
    ],
    specs: {
      "Material": "50% Recycled Acrylic, 30% Nylon, 20% Wool",
      "Fit": "Oversized / Slouchy",
      "Care": "Hand wash cold, dry flat",
      "Length": "Hip length"
    },
    tags: ["new", "winter", "womens"]
  },
  {
    id: 124,
    name: "Designer Tortoise Shell Sunglasses",
    category: "Accessories",
    subCategory: "Eyewear",
    brand: "Navedi Luxe",
    price: 36.00,
    originalPrice: 55.00,
    discount: 35,
    rating: 4.7,
    reviewsCount: 112,
    inStock: true,
    stockCount: 45,
    images: [
      "./assets/images/products/2.jpg"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Havana Tortoise", hex: "#78350F" },
      { name: "Jet Black", hex: "#18181B" }
    ],
    description: "Iconic square-frame sunglasses offering 100% UV400 polarized eye protection with handcrafted Italian acetate frames and reinforced five-barrel hinges.",
    features: [
      "100% UV400 and anti-glare polarized lenses",
      "Handmade cellulose acetate frame",
      "Stainless steel optical wire core",
      "Includes hard case and micro-fiber cleaning cloth"
    ],
    specs: {
      "Lens Width": "52mm",
      "Bridge Width": "20mm",
      "Temple Length": "145mm",
      "Protection": "UV400 Polarized"
    },
    tags: ["accessories", "bestseller"]
  }
];

/**
 * Global Product Database API
 */
window.ProductDB = {
  products: PRODUCTS,

  getAll() {
    return [...this.products];
  },

  getById(id) {
    const numId = Number(id);
    return this.products.find(p => p.id === numId) || null;
  },

  getByCategory(cat) {
    if (!cat || cat.toLowerCase() === 'all') return this.getAll();
    const cleanCat = cat.trim().toLowerCase();
    return this.products.filter(p => 
      p.category.toLowerCase() === cleanCat ||
      (p.subCategory && p.subCategory.toLowerCase() === cleanCat)
    );
  },

  getFeatured() {
    return this.products.filter(p => p.tags.includes('featured'));
  },

  getBestsellers() {
    return this.products.filter(p => p.tags.includes('bestseller'));
  },

  getNewArrivals() {
    return this.products.filter(p => p.tags.includes('new') || p.id > 115);
  },

  getTrending() {
    return this.products.filter(p => p.tags.includes('trending'));
  },

  getDeals() {
    return this.products.filter(p => p.tags.includes('deal') || p.discount >= 30);
  },

  getRelated(productId, limit = 4) {
    const current = this.getById(productId);
    if (!current) return this.products.slice(0, limit);
    return this.products
      .filter(p => p.id !== current.id && (p.category === current.category || p.brand === current.brand))
      .slice(0, limit);
  },

  search(query) {
    if (!query || !query.trim()) return [];
    const q = query.trim().toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  },

  filterAndSort({
    category = 'all',
    brand = 'all',
    minPrice = 0,
    maxPrice = 1000,
    minRating = 0,
    inStockOnly = false,
    sortBy = 'default',
    query = ''
  } = {}) {
    let result = [...this.products];

    // Search query filter
    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      result = result.filter(p => 
        p.category.toLowerCase() === catLower ||
        (p.subCategory && p.subCategory.toLowerCase() === catLower)
      );
    }

    // Brand filter
    if (brand && brand !== 'all') {
      result = result.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    // Price range filter
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    // Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // In-stock only
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
      case 'bestseller':
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return result;
  },

  getCategories() {
    const map = new Map();
    this.products.forEach(p => {
      map.set(p.category, (map.get(p.category) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  },

  getBrands() {
    const map = new Map();
    this.products.forEach(p => {
      map.set(p.brand, (map.get(p.brand) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }
};
