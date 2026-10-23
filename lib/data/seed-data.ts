import { Product, Category, Brand, HeroSlide, Advantage, Announcement, Courier, PaymentMethodConfig } from '@/types/database';

export const SEED_CATEGORIES: Category[] = [
  {
    "id": "cat-men",
    "name": "Men",
    "slug": "men",
    "description": "Discover CC Carvan’s exclusive men’s fashion collection in Pakistan, crafted for understated elegance and durability. From breathable unstitched fabrics to warm winter layers and versatile footwear, explore pieces tailored for refined everyday and formal occasions.",
    "image_url": null,
    "parent_id": null,
    "sort_order": 1,
    "is_active": true,
    "seo_title": "Men's Fashion & Apparel Online in Pakistan | CC Carvan",
    "seo_description": "Explore CC Carvan's premium menswear collection in Pakistan. Shop unstitched suits, warm winter wear, and stylish footwear with nationwide cash on delivery."
  },
  {
    "id": "cat-men-unstitched",
    "name": "Unstitched Suits",
    "slug": "men-unstitched-suits",
    "description": "Tailor your signature look with our premium men’s unstitched suits collection. Featuring soft cotton sotton and easy-care wash-and-wear fabrics, each 4-meter cut is chosen for superior comfort, crease resistance, and sharp structure across all Pakistani seasons.",
    "image_url": null,
    "parent_id": "cat-men",
    "sort_order": 1,
    "is_active": true,
    "seo_title": "Men's Unstitched Suits Pakistan | Premium Fabric Collection",
    "seo_description": "Buy premium men's unstitched suits in Pakistan. Featuring cotton sotton and wash & wear fabrics in classic colors with quick delivery."
  },
  {
    "id": "cat-men-winter",
    "name": "Winter Wear",
    "slug": "men-winter-wear",
    "description": "Conquer chilly Pakistani winters in modern style with our men's winter wear edit. From comfortable fleece tracksuits and zip-up collared jackets to cozy color-block hoodies, stay impeccably warm and effortlessly styled for workouts, casual commutes, or weekend travel.",
    "image_url": null,
    "parent_id": "cat-men",
    "sort_order": 2,
    "is_active": true,
    "seo_title": "Men's Winter Wear & Outerwear in Pakistan | CC Carvan",
    "seo_description": "Stay warm with CC Carvan's men's winter collection in Pakistan. Shop fleece tracksuits, insulated jackets, and stylish hoodies today."
  },
  {
    "id": "cat-men-footwear",
    "name": "Footwear",
    "slug": "men-footwear",
    "description": "Elevate your footwear rotation with our handcrafted men’s sandals and semi-formal shoes. Crafted from durable rexine with ergonomic cushioned soles, this collection blends effortless comfort with traditional Pakistani silhouette elegance for festivals and relaxed gatherings.",
    "image_url": null,
    "parent_id": "cat-men",
    "sort_order": 3,
    "is_active": true,
    "seo_title": "Men's Semi-Formal Sandals & Shoes Pakistan | CC Carvan",
    "seo_description": "Step out in comfort with men's semi-formal sandals and footwear in Pakistan. Durable rexine design in modern tones with cash on delivery."
  },
  {
    "id": "cat-women",
    "name": "Women",
    "slug": "women",
    "description": "Immerse yourself in CC Carvan’s women’s fashion sanctuary, featuring exquisite Pakistani unstitched silk suits, gentle jersey loungewear, flowing georgette abayas, and artisanal handbags crafted to accompany your most memorable moments.",
    "image_url": null,
    "parent_id": null,
    "sort_order": 2,
    "is_active": true,
    "seo_title": "Women's Fashion & Luxury Pret in Pakistan | CC Carvan",
    "seo_description": "Shop luxury women's clothing in Pakistan. Discover silk unstitched suits, cozy nightwear, designer abayas, and chic handbags online."
  },
  {
    "id": "cat-women-unstitched",
    "name": "Unstitched Suits",
    "slug": "women-unstitched-suits",
    "description": "Indulge in graceful ethnic charm with our women’s unstitched suits curation. Designed in lustrous Katan silk with delicate embroidered net dupattas, these ensembles offer bespoke tailoring potential for celebratory gatherings, weddings, and memorable evenings across Pakistan.",
    "image_url": null,
    "parent_id": "cat-women",
    "sort_order": 1,
    "is_active": true,
    "seo_title": "Women's Unstitched Silk Suits Pakistan | Festive Collection",
    "seo_description": "Discover luxury women's unstitched 3-piece silk suits in Pakistan. Elegant Katan silk with embroidered net dupattas for weddings and formals."
  },
  {
    "id": "cat-women-nightwear",
    "name": "Night Suits & Pajamas",
    "slug": "women-night-suits-pajamas",
    "description": "Unwind in pure comfort with our women’s nightwear and pajama sets. From breathable combed cotton jersey 2-piece sets with playful prints to plush coral fleece winter pajamas, find the perfect balance of relaxation, warmth, and bedtime elegance.",
    "image_url": null,
    "parent_id": "cat-women",
    "sort_order": 2,
    "is_active": true,
    "seo_title": "Women's Night Suits & Cozy Pajamas Pakistan | CC Carvan",
    "seo_description": "Shop ultra-soft women's night suits and winter fleece pajamas in Pakistan. Breathable jersey and warm loungewear sets at affordable prices."
  },
  {
    "id": "cat-women-abayas",
    "name": "Abayas",
    "slug": "women-abayas",
    "description": "Embrace modern modesty with our curated collection of women’s and girls’ georgette abayas. Designed with graceful box pleats, dori belts, and breathable fall, these non-see-through abayas are ideal for prayer, Umrah journeys, and refined everyday wear.",
    "image_url": null,
    "parent_id": "cat-women",
    "sort_order": 3,
    "is_active": true,
    "seo_title": "Designer Georgette Abayas in Pakistan | CC Carvan",
    "seo_description": "Explore elegant georgette maxi abayas in Pakistan. Modest flared cuts, box pleats, and matching hijabs/stolers with fast home delivery."
  },
  {
    "id": "cat-women-handbags",
    "name": "Handbags",
    "slug": "women-handbags",
    "description": "Complete every outfit with our women’s handbag collection, blending practical capacity with eye-catching aesthetics. From structured leather top-handle bags to chic playful totes with charm accents, carry your daily essentials with poise and panache.",
    "image_url": null,
    "parent_id": "cat-women",
    "sort_order": 4,
    "is_active": true,
    "seo_title": "Women's Fashion Handbags & Totes Pakistan | CC Carvan",
    "seo_description": "Upgrade your look with trendy women's handbags in Pakistan. Compact top-handle bags, pom-pom charms, and durable faux leather designs."
  },
  {
    "id": "cat-women-footwear",
    "name": "Footwear",
    "slug": "women-footwear",
    "description": "Step through busy days effortlessly with our women's footwear edit. Featuring lightweight slip-on sneakers and cushioned pumps crafted from resilient rexine, enjoy breathable comfort whether running errands or spending hours on your feet.",
    "image_url": null,
    "parent_id": "cat-women",
    "sort_order": 5,
    "is_active": true,
    "seo_title": "Women's Slip-On Sneakers & Pumps in Pakistan | CC Carvan",
    "seo_description": "Discover stylish women's slip-on sneakers and everyday pumps in Pakistan. Breathable rexine footwear designed for all-day comfort."
  },
  {
    "id": "cat-fragrances",
    "name": "Fragrances",
    "slug": "fragrances",
    "description": "Experience the captivating art of scent with CC Carvan's fragrance boutique. Handpicked for Pakistan’s climate, our musky and citrus compositions deliver remarkable sillage, enduring projection, and sophisticated aroma profiles for confident men.",
    "image_url": null,
    "parent_id": null,
    "sort_order": 3,
    "is_active": true,
    "seo_title": "Luxury Perfumes & Fragrances in Pakistan | CC Carvan",
    "seo_description": "Discover long-lasting luxury perfumes in Pakistan. Explore signature musky and citrus Eau de Toilette fragrances at best prices."
  },
  {
    "id": "cat-mens-perfumes",
    "name": "Men's Perfumes",
    "slug": "mens-perfumes",
    "description": "Make an unforgettable impression with our men’s perfume collection. Featuring renowned formulations like Janan Musk EDP and invigorating citrus woody Eau de Toilette, each bottle delivers long-lasting freshness engineered for daytime business and evening allure.",
    "image_url": null,
    "parent_id": "cat-fragrances",
    "sort_order": 1,
    "is_active": true,
    "seo_title": "Men's Perfumes & Eau de Parfum Pakistan | CC Carvan",
    "seo_description": "Shop long-lasting men's perfumes and EDPs in Pakistan. Janan musk notes and refreshing citrus woody fragrances with fast shipping."
  },
  {
    "id": "cat-beauty-makeup",
    "name": "Beauty & Makeup",
    "slug": "beauty-makeup",
    "description": "Reveal your natural radiance with CC Carvan's beauty and makeup collection. From gentle everyday skincare essentials like rose water and soothing aloe to comprehensive 9-in-1 vanity deals, discover quality personal care at accessible Pakistani pricing.",
    "image_url": null,
    "parent_id": null,
    "sort_order": 4,
    "is_active": true,
    "seo_title": "Skincare & Makeup Deals in Pakistan | CC Carvan",
    "seo_description": "Shop authentic skincare essentials and all-in-one makeup bundles in Pakistan. Discover nourishing daily care and cosmetic deals online."
  },
  {
    "id": "cat-skincare",
    "name": "Skincare",
    "slug": "skincare",
    "description": "Revitalize your complexion with our curated skincare solutions. Featuring gentle daily cleansing bars, pure steam-distilled rose water, and multi-benefit aloe vera gel, restore natural skin hydration and subtle radiance without harsh ingredients.",
    "image_url": null,
    "parent_id": "cat-beauty-makeup",
    "sort_order": 1,
    "is_active": true,
    "seo_title": "Natural Glow Skincare Bundles Pakistan | CC Carvan",
    "seo_description": "Nourish your skin with natural glow skincare sets in Pakistan. Gentle soap, pure rose water, and hydrating aloe vera gel for daily care."
  },
  {
    "id": "cat-makeup",
    "name": "Makeup",
    "slug": "makeup",
    "description": "Transform your beauty routine with our versatile makeup deals. Packed with daily cosmetic staples including TV paint sticks, concealers, primers, and velvety lip colours, this all-in-one vanity bundle delivers flawless, photogenic looks for any event.",
    "image_url": null,
    "parent_id": "cat-beauty-makeup",
    "sort_order": 2,
    "is_active": true,
    "seo_title": "9-in-1 Complete Makeup Deals in Pakistan | CC Carvan",
    "seo_description": "Get the ultimate 9-in-1 makeup deal in Pakistan. Includes TV paint stick, primers, loose powder, lipsticks, and liquid foundations."
  },
  {
    "id": "cat-watches-gadgets",
    "name": "Watches & Gadgets",
    "slug": "watches-gadgets",
    "description": "Stay connected and impeccably accessorized with our watches and tech gadgets. From elegant dual-tone bracelet watches to modern wireless Bluetooth earbuds, enjoy seamless modern functionality and timeless wrist style in Pakistan.",
    "image_url": null,
    "parent_id": null,
    "sort_order": 5,
    "is_active": true,
    "seo_title": "Fashion Watches & Wireless Earbuds Pakistan | CC Carvan",
    "seo_description": "Shop classy bracelet watches and wireless earbuds in Pakistan. Premium accessories and lifestyle electronics with cash on delivery."
  },
  {
    "id": "cat-watches",
    "name": "Watches",
    "slug": "watches",
    "description": "Adorn your wrist with our slim and classy dial watches. Featuring high-grade stainless steel bracelet straps in radiant golden and polished silver finishes, these timepieces lend graceful feminine poise to both western ensembles and traditional festive attire.",
    "image_url": null,
    "parent_id": "cat-watches-gadgets",
    "sort_order": 1,
    "is_active": true,
    "seo_title": "Women's Slim & Classy Dial Watches Pakistan | CC Carvan",
    "seo_description": "Discover feminine bracelet watches in Pakistan. Featuring textured stainless steel straps in gold and silver dials with date function."
  },
  {
    "id": "cat-earbuds-airpods",
    "name": "Earbuds & Airpods",
    "slug": "earbuds-airpods",
    "description": "Enjoy wireless audio freedom with our ergonomic Bluetooth airpods and earbuds. Designed with lightweight ear tips, intuitive touch controls, and compact charging cases, immerse yourself in hands-free calls and rich acoustic music on the go.",
    "image_url": null,
    "parent_id": "cat-watches-gadgets",
    "sort_order": 2,
    "is_active": true,
    "seo_title": "M04 Wireless Bluetooth Airpods Pakistan | CC Carvan",
    "seo_description": "Buy M04 wireless Bluetooth airpods in Pakistan. Available in black and white with ergonomic fit, charging case, and clear sound."
  }
];

export const SEED_BRANDS: Brand[] = [
  {
    id: 'brand-1',
    name: 'CC Carvan Atelier',
    slug: 'cc-carvan',
    logo_url: '/logo.png',
    description: 'Premier Pakistani luxury e-commerce and lifestyle apparel.',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'brand-2',
    name: 'J. Fragrances',
    slug: 'j-fragrances',
    logo_url: '/logo.png',
    description: 'Signature musky, floral and citrus fragrances.',
    sort_order: 2,
    is_active: true,
  },
];

export const SEED_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image_url: '/products/men-grey-cotton-sotton-suit-1.webp',
    mobile_image_url: '/products/men-grey-cotton-sotton-suit-1.webp',
    heading: "Men's Winter & Unstitched Suits",
    subtitle: 'Premium cotton sotton, wash-and-wear fabrics, and thermal outerwear.',
    button_text: 'Explore Men',
    button_url: '/category/men',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'slide-2',
    image_url: '/products/beige-katan-silk-3piece-suit-1.webp',
    mobile_image_url: '/products/beige-katan-silk-3piece-suit-1.webp',
    heading: 'Women Festive Silk & Modest Abayas',
    subtitle: 'Katan silk 3-piece suites, georgette abayas, and luxury accessories.',
    button_text: 'Shop Women',
    button_url: '/category/women',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'slide-3',
    image_url: '/products/j-janan-musk-edp-perfume-men-1.webp',
    mobile_image_url: '/products/j-janan-musk-edp-perfume-men-1.webp',
    heading: 'Signature Fragrances & Lifestyle Gadgets',
    subtitle: 'Long-lasting EDPs, wireless airpods, and elegant bracelet watches.',
    button_text: 'Discover All',
    button_url: '/products',
    sort_order: 3,
    is_active: true,
  },
];

export const SEED_ADVANTAGES: Advantage[] = [
  {
    id: 'adv-1',
    icon_name: 'ShieldCheck',
    title: '100% Original Products',
    description: 'Guaranteed authentic apparel, fragrances, and accessories in Pakistan.',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'adv-2',
    icon_name: 'Truck',
    title: 'Nationwide Delivery',
    description: 'Express shipping across Karachi, Lahore, Islamabad, and all of Pakistan.',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'adv-3',
    icon_name: 'RefreshCw',
    title: '7-Day Easy Returns',
    description: 'Hassle-free return and exchange policy on all eligible purchases.',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'adv-4',
    icon_name: 'Headphones',
    title: '24/7 Dedicated Support',
    description: 'Personal customer care assistance via WhatsApp, phone, and email.',
    sort_order: 4,
    is_active: true,
  },
];

export const SEED_ANNOUNCEMENT: Announcement = {
  id: 'ann-1',
  message: 'Flat Rs. 100 Express Nationwide Delivery on all orders across Pakistan',
  coupon_code: 'CC10',
  link_url: '/products',
  is_active: true,
  whatsapp_number: '+92 303 8212360',
  ticker_messages: [
    'Flat Rs. 100 Express Nationwide Delivery on all orders across Pakistan',
    'Winter Collection 2026: Fleece Tracksuits, Jackets, Hoodies & Warm Pajamas',
    '100% Genuine Quality Guaranteed & 7-Day Easy Return Policy',
    'First Order Privilege: Unlock 10% Off with Code CC10',
    'Customer Helpline & Inquiries via WhatsApp: +92 303 8212360',
  ],
};

export const SEED_COURIERS: Courier[] = [
  {
    id: 'cour-1',
    name: 'TCS Express',
    code: 'tcs',
    tracking_url_template: 'https://www.tcsexpress.com/tracking?track={tracking_id}',
    is_active: true,
  },
  {
    id: 'cour-2',
    name: 'Leopards Courier',
    code: 'leopards',
    tracking_url_template: 'https://leopardscourier.com/tracking/?track={tracking_id}',
    is_active: true,
  },
  {
    id: 'cour-3',
    name: 'M&P Express Logistics',
    code: 'mnp',
    tracking_url_template: 'https://mulphilog.com/tracking?consignment={tracking_id}',
    is_active: true,
  },
  {
    id: 'cour-4',
    name: 'Pakistan Post',
    code: 'pakpost',
    tracking_url_template: 'https://ep.gov.pk/track.asp?art_id={tracking_id}',
    is_active: true,
  },
];

export const SEED_PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'pm-1',
    code: 'cod',
    name: 'Cash on Delivery (COD)',
    instructions: 'Pay with exact cash directly to courier rider upon doorstep delivery.',
    account_details: 'Pay exact cash amount to courier rider upon delivery across Pakistan.',
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png',
    badge: 'Standard Option',
    requires_reference: false,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'pm-2',
    code: 'jazzcash',
    name: 'JazzCash Mobile Account & Till',
    instructions: 'Pay via JazzCash App or dial *786# to our official Till ID or Mobile Account. Enter your 12-digit TID below.',
    account_details: 'Title: CC CARVAN\nTill ID: 00294817\nAccount: 0300 9876543',
    account_title: 'CC CARVAN (PVT) LTD',
    account_number: '0300 9876543',
    till_id: '00294817',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/JazzCash_logo.png',
    badge: 'Instant Transfer',
    requires_reference: true,
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'pm-3',
    code: 'easypaisa',
    name: 'Easypaisa Merchant & Wallet',
    instructions: 'Send payment via Easypaisa App or *786# to our verified merchant account. Enter your Transaction ID (TID) below.',
    account_details: 'Title: CC CARVAN\nTill / Account: 0345 8765432\nMerchant Till: 00582914',
    account_title: 'CC CARVAN',
    account_number: '0345 8765432',
    till_id: '00582914',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Easypaisa_logo.png',
    badge: 'Zero Fee',
    requires_reference: true,
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'pm-4',
    code: 'bank_transfer',
    name: 'Direct Bank Transfer (IBFT)',
    instructions: 'Make payment directly via your mobile banking app (1-Link 24/7). Enter your Transfer Reference / TID below.',
    account_details: 'Bank: Meezan Bank Ltd\nTitle: CC CARVAN (PRIVATE) LIMITED\nAccount: 02010103456789\nIBAN: PK89MEZN0002010103456789',
    account_title: 'CC CARVAN (PRIVATE) LIMITED',
    bank_name: 'Meezan Bank Ltd (Islamic Banking)',
    account_number: '02010103456789',
    iban: 'PK89MEZN0002010103456789',
    logo_url: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
    badge: '1-Link IBFT',
    requires_reference: true,
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'pm-5',
    code: 'sadapay',
    name: 'SadaPay Business',
    instructions: 'Send instantly to our SadaPay IBAN with zero transaction fees from any banking app or SadaPay wallet.',
    account_details: 'IBAN: PK64SADA0000001234567890\nTitle: CC CARVAN',
    account_title: 'CC CARVAN',
    iban: 'PK64SADA0000001234567890',
    logo_url: 'https://images.seeklogo.com/logo-png/43/2/sadapay-logo-png_seeklogo-431872.png',
    badge: 'Fast & Free',
    requires_reference: true,
    is_active: true,
    sort_order: 5,
  },
  {
    id: 'pm-6',
    code: 'nayapay',
    name: 'NayaPay Wallet',
    instructions: 'Instant peer-to-peer transfer via NayaPay handle @cccarvan or registered mobile number.',
    account_details: 'NayaPay ID: @cccarvan\nTitle: CC CARVAN',
    account_title: 'CC CARVAN',
    account_number: '@cccarvan',
    logo_url: 'https://images.seeklogo.com/logo-png/43/2/nayapay-logo-png_seeklogo-431868.png',
    badge: 'Instant QR/Tag',
    requires_reference: true,
    is_active: true,
    sort_order: 6,
  },
];

export const SEED_PRODUCTS: Product[] = [
  {
    "id": "prod-01-men-grey-cotton-suit",
    "name": "Men Grey Cotton Sotton Unstitched Suit Winter Pakistan",
    "slug": "men-grey-cotton-sotton-unstitched-suit",
    "sku": "CCC-MEN-SOT-GRY",
    "short_description": "Step out in refined understated sophistication with this men's plain grey cotton sotton unstitched suit. Crafted for Pakistan's cooler seasons, this versatile 4-meter fabric cut delivers enduring comfort and neat tailoring for casual and workplace wear.",
    "full_description": "Tailor your everyday wardrobe with our Men's Grey Cotton Sotton Unstitched Suit, created specifically for Pakistan's winter months and transitional weather. Woven from high-density, breathable cotton sotton, this fabric provides a smooth texture that resists unsightly wrinkles while holding a clean, structured silhouette through repeated wash and wear.\n\nThe classic slate grey tone effortlessly coordinates with formal neckties or ethnic waistcoats, offering unparalleled versatility for office hours, Friday gatherings, and relaxed family dinners. Each 4-meter parcel includes 2 meters for the shirt and 2 meters for trousers, packaged with an authentic brand tag and presentation bag. Experience premium textile craftsmanship at an accessible price point, engineered for all-day comfort and long-lasting durability. Whether tailored as a traditional shalwar kameez or a contemporary kurta trouser set, this unstitched ensemble keeps you looking sharp without compromising on softness.\n\nKEY FEATURES & HIGHLIGHTS:\n• 100% premium quality winter-grade cotton sotton fabric\n• Generous 4-meter total cutting (2m shirt + 2m trouser)\n• Wrinkle-resistant finish for crisp, day-long tailoring\n• Versatile plain grey shade suitable for formal and casual wear\n• Packaged with official brand tag and presentation bag\n• Easy machine wash care with excellent colour fastness\n\nSPECIFICATIONS & DETAILS:\n• Fabric: Cotton Sotton\n• Pattern: Plain\n• Season: Winter / Mid-Season\n• Color: Grey\n• Shirt Cutting: 2 Meters\n• Trouser Cutting: 2 Meters\n• Suit Cutting: 4 Meters Total\n• Accessories: Brand Tag and Bag Included\n• Package Includes: 1 x Unstitched Suit Fabric (Shirt & Trouser)\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2000,
    "sale_price": null,
    "cost_price": 1300,
    "stock_quantity": 45,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-men-unstitched",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": "Unstitched – 4 m (Shirt 2 m + Trouser 2 m)",
    "is_featured": true,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 50,
    "seo_title": "Men Grey Cotton Sotton Unstitched Suit | Winter Pakistan",
    "seo_description": "Shop men's unstitched cotton sotton suit in plain grey. Breathable 4m winter fabric cut with brand tag & bag. Order with nationwide cash on delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-1-1",
        "image_url": "/products/men-grey-cotton-sotton-suit-1.webp",
        "alt_text": "Men grey cotton sotton unstitched suit fabric fold with brand tag",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-1-2",
        "image_url": "/products/men-grey-cotton-sotton-suit-2.webp",
        "alt_text": "Men plain grey cotton sotton suit closeup texture and weave",
        "sort_order": 2,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-1-1",
        "product_id": "prod-01-men-grey-cotton-suit",
        "sku": "CCC-MEN-SOT-GRY",
        "variant_name": "Grey / 4 Meter Cut",
        "price": 2000,
        "stock_quantity": 45,
        "attributes": {
          "color": "Grey",
          "cutting": "4 Meter Unstitched"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 12
  },
  {
    "id": "prod-02-zk-skincare-glow-bundle",
    "name": "ZK 3-in-1 Natural Glow Skincare Bundle Soap Rose Aloe",
    "slug": "zk-3-in-1-natural-glow-skincare-bundle",
    "sku": "CCC-ZK-GLW-BND",
    "short_description": "Elevate your morning skincare ritual with the ZK Cosmetics 3-in-1 Natural Glow Bundle. This daily trio combines a gentle brightening soap, refreshing steam-distilled rose water, and pure hydrating aloe vera gel to nourish and hydrate your complexion.",
    "full_description": "Revitalize and pamper your complexion every morning with the ZK Cosmetics 3-in-1 Natural Glow Bundle. Specially curated for diverse skin types facing Pakistan’s varied environmental conditions, this essential daily trio targets dullness and dehydration without harsh chemicals.\n\nThe ritual begins with the gentle cleansing soap, formulated to wash away impurities, excess sebum, and daytime pollution while maintaining your skin's natural moisture barrier. Follow up with the pure, steam-distilled rose water spray that balances delicate pH levels, tightens the look of pores, and infuses instant botanical refreshment. Finish your regimen by smoothing on the multi-purpose aloe vera gel, known for delivering non-greasy hydration, calming sun-exposed skin, and promoting a radiant, supple look. Whether used as a primer before foundation or as a nighttime hydration mask, this versatile bundle leaves skin feeling silky, refreshed, and healthy. Enjoy modest, effective skincare at an everyday value.\n\nKEY FEATURES & HIGHLIGHTS:\n• Complete 3-in-1 daily botanical beauty regimen\n• Clarifying soap cleanses away dirt and impurities gently\n• Pure steam-distilled rose water toner hydrates and refines pores\n• Multi-benefit aloe vera gel calms and locks in hydration\n• Lightweight, non-sticky formulas suitable for all skin types\n• Gentle everyday formulation with zero aggressive bleaches\n\nSPECIFICATIONS & DETAILS:\n• Bundle Type: 3-in-1 Skincare Ritual Deal\n• Components: Glow Soap, Pure Rose Water Mist, Aloe Vera Gel\n• Skin Type: Suitable for All Skin Types\n• Key Benefits: Cleansing, Hydrating, Pore-Toning, Soothing\n• Formulation: Gentle Botanical Ingredients\n• Package Includes: 1 x Soap Bar, 1 x Rose Water Spray Bottle, 1 x Aloe Vera Jar\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2350,
    "sale_price": null,
    "cost_price": 1500,
    "stock_quantity": 35,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-skincare",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 57,
    "seo_title": "ZK 3-in-1 Natural Glow Skincare Bundle | Soap Rose Aloe",
    "seo_description": "Nourish your skin with ZK 3-in-1 natural glow bundle: whitening soap, pure rose water & soothing aloe vera gel. Shop now with fast cash on delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-2-1",
        "image_url": "/products/zk-skincare-glow-bundle-1.webp",
        "alt_text": "ZK Cosmetics 3-in-1 natural glow bundle complete set",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-2-2",
        "image_url": "/products/zk-skincare-glow-bundle-2.webp",
        "alt_text": "ZK skincare bundle bottle and jar closeup view 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-2-3",
        "image_url": "/products/zk-skincare-glow-bundle-3.webp",
        "alt_text": "ZK skincare bundle bottle and jar closeup view 3",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-2-1",
        "product_id": "prod-02-zk-skincare-glow-bundle",
        "sku": "CCC-ZK-GLW-BND",
        "variant_name": "Standard 3-in-1 Bundle",
        "price": 2350,
        "stock_quantity": 35,
        "attributes": {
          "bundle": "3-in-1 Kit"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8999999999999995,
    "review_count": 15
  },
  {
    "id": "prod-03-beige-katan-silk-suit",
    "name": "Beige Katan Silk 3-Piece Unstitched Suit with Dupatta",
    "slug": "beige-katan-silk-3-piece-unstitched-suit",
    "sku": "CCC-WMN-KAT-BGE",
    "short_description": "Grace any festive gathering with this elegant 3-piece unstitched beige suit crafted from smooth Katan silk. Paired with a delicate golden embroidered net dupatta, this ensemble delivers timeless royal elegance at remarkable value.",
    "full_description": "Designed for celebratory family occasions, wedding festivities, and evening dinners, our Beige Katan Silk 3-Piece Suit brings together heirloom elegance and contemporary ease. The shirt and trouser fabrics are woven from premium-grade Katan silk, admired across Pakistan for its subtle sheen, smooth hand feel, and natural resistance to creasing.\n\nThe ensemble is complemented by an ethereal net dupatta adorned with golden floral embroidery motifs and a neat satin-finished border. This generous 3-piece unstitched set provides 2.5 yards of fabric for the shirt, 2.5 yards for the trousers, and 2.5 yards for the dupatta, offering tailor-made versatility for straight-cut trousers, wide culottes, or classic shalwars. Lightweight and breathable enough for year-round wear, this neutral beige masterpiece pairs beautifully with statement gold jewellery and festive heels. Enjoy unmatched elegance with nationwide delivery right to your doorstep.\n\nKEY FEATURES & HIGHLIGHTS:\n• Lustrous, wrinkle-resistant Katan silk shirt and trouser fabric\n• Sheer net dupatta enhanced with delicate golden floral embroidery\n• Complete 3-piece unstitched set (shirt, trouser, and dupatta)\n• Generous 2.5 yards cutting for each garment component\n• Graceful neutral beige tone suited for weddings and evening formals\n• Breathable weave ensuring comfort in warm festive gatherings\n\nSPECIFICATIONS & DETAILS:\n• Fabric (Shirt & Trouser): Katan Silk\n• Fabric (Dupatta): Embroidered Net\n• Pattern: Plain Silk with Floral Embroidered Dupatta\n• Number of Pieces: 3 Piece Set\n• Color: Beige / Cream\n• Shirt Cutting: 2.5 Yards\n• Trouser Cutting: 2.5 Yards\n• Dupatta Cutting: 2.5 Yards\n• Package Includes: 1 x Shirt Fabric, 1 x Trouser Fabric, 1 x Dupatta\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 1420,
    "sale_price": null,
    "cost_price": 950,
    "stock_quantity": 40,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-unstitched",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": "Unstitched – 2.5 yd each",
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 64,
    "seo_title": "Beige Katan Silk 3-Piece Unstitched Suit with Dupatta",
    "seo_description": "Discover our women's beige Katan silk 3-piece unstitched suit with golden floral net dupatta. Perfect for festive weddings. Order with COD nationwide.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-3-1",
        "image_url": "/products/beige-katan-silk-3piece-suit-1.webp",
        "alt_text": "Beige katan silk 3-piece unstitched suit with floral net dupatta",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-3-2",
        "image_url": "/products/beige-katan-silk-3piece-suit-2.webp",
        "alt_text": "Beige katan silk suit fabric and embroidery detail 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-3-3",
        "image_url": "/products/beige-katan-silk-3piece-suit-3.webp",
        "alt_text": "Beige katan silk suit fabric and embroidery detail 3",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-3-1",
        "product_id": "prod-03-beige-katan-silk-suit",
        "sku": "CCC-WMN-KAT-BGE",
        "variant_name": "Beige / 2.5 yd 3-Piece",
        "price": 1420,
        "stock_quantity": 40,
        "attributes": {
          "color": "Beige",
          "cutting": "2.5 Yards Each (3-Piece)"
        },
        "is_active": true
      }
    ],
    "average_rating": 5,
    "review_count": 18
  },
  {
    "id": "prod-04-airpods-m04",
    "name": "M04 Wireless Bluetooth Airpods with Charging Case",
    "slug": "m04-wireless-bluetooth-airpods",
    "sku": "CCC-AIR-M04",
    "short_description": "Enjoy true wireless freedom with the M04 Bluetooth Airpods featuring high-clarity stereo sound and an ergonomic lightweight fit. Available in sleek Black and clean White, each pair includes a fast-charging pocket case.",
    "full_description": "Upgrade your audio lifestyle with the M04 Wireless Bluetooth Airpods, engineered for seamless mobile connectivity and active everyday routines. Whether you are commuting, working at your desk, or taking hands-free voice calls, these earbuds deliver clear acoustic treble and balanced bass response.\n\nConstructed from impact-resistant lightweight polymer, the earbuds sit comfortably in the ear canal without causing ear fatigue. Bluetooth wireless pairing connects quickly with Android and iOS smartphones, tablets, and laptops. The included magnetic charging case protects your earbuds while replenishing battery life between uses. Available in classic Obsidian Black and Pearl White finishes, the M04 offers dependable wireless performance at an unbeatable price point across Pakistan. Order your preferred colour with full cash on delivery convenience.\n\nKEY FEATURES & HIGHLIGHTS:\n• Stable Bluetooth wireless audio connectivity with fast pairing\n• Ergonomic in-ear contour designed for extended wearing comfort\n• Built-in microphone for hands-free crystal-clear voice calls\n• Protective pocket-sized magnetic charging storage case included\n• Available in two minimalist finishes: Obsidian Black and Pearl White\n• Universal compatibility with iOS, Android, and Bluetooth laptops\n\nSPECIFICATIONS & DETAILS:\n• Model: M04 TWS Wireless\n• Material: Impact-Resistant ABS Plastic\n• Connectivity: Bluetooth Wireless\n• Available Colors: Black, White\n• Form Factor: In-Ear True Wireless Earbuds\n• Package Includes: 1 x Pair M04 Airpods, 1 x Charging Case, 1 x User Manual\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 1500,
    "sale_price": null,
    "cost_price": 900,
    "stock_quantity": 50,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-earbuds-airpods",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 71,
    "seo_title": "M04 Wireless Bluetooth Airpods with Charging Case",
    "seo_description": "Experience crisp wireless sound with M04 Bluetooth airpods. Available in black & white with compact charging case. Buy now with fast cash on delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-4-1",
        "image_url": "/products/airpods-m04-wireless-earbuds-1.webp",
        "alt_text": "M04 wireless bluetooth airpods in black charging case",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-4-2",
        "image_url": "/products/airpods-m04-wireless-earbuds-2.webp",
        "alt_text": "M04 wireless bluetooth airpods in white charging case",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-4-3",
        "image_url": "/products/airpods-m04-wireless-earbuds-3.webp",
        "alt_text": "M04 airpods earbuds and case packaging view",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-4-1",
        "product_id": "prod-04-airpods-m04",
        "sku": "CCC-AIR-M04-BLK",
        "variant_name": "Black",
        "price": 1500,
        "stock_quantity": 25,
        "attributes": {
          "color": "Black"
        },
        "is_active": true
      },
      {
        "id": "var-4-2",
        "product_id": "prod-04-airpods-m04",
        "sku": "CCC-AIR-M04-WHT",
        "variant_name": "White",
        "price": 1500,
        "stock_quantity": 25,
        "attributes": {
          "color": "White"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 21
  },
  {
    "id": "prod-05-men-fleece-tracksuit-grey",
    "name": "Men Fleece Printed Track Suit Grey Slim Fit Winter",
    "slug": "men-fleece-printed-track-suit-grey",
    "sku": "CCC-TRK-GRY",
    "short_description": "Conquer winter chill with this men's grey fleece printed tracksuit. Combining a sporty stand-collar zipper jacket with matching comfort-fit trousers, this 2-piece set delivers thermal warmth and athletic style.",
    "full_description": "Designed for morning jogs, gym warmups, or relaxed weekend lounging, our Men's Fleece Printed Track Suit in Heather Grey is an essential winter investment. Crafted from thick, brushed thermal fleece, this two-piece set traps body heat while allowing healthy airflow to keep you comfortable during active movement.\n\nThe upper features a full-length front zipper, tailored stand collar, ribbed cuffs, and subtle contrast print graphics that add a modern sportswear touch. The matching trousers are tailored with an elasticated waistband and tapered hem to ensure unrestricted mobility. Available in Small, Medium, Large, and X-Large sizes, this tracksuit combines durable stitching with easy machine-wash convenience. Step out into cold winter mornings with total warmth and confidence.\n\nKEY FEATURES & HIGHLIGHTS:\n• Thermal brushed fleece fabric for superior warmth and insulation\n• Full-zip jacket with athletic collar and ribbed cuffs\n• Matching fleece trousers with elasticated waistband and drawstrings\n• Modern printed graphic accents on chest and legs\n• Available in standard sizes: Small, Medium, Large, X-Large\n• Durable stitching crafted for regular sports and casual wear\n\nSPECIFICATIONS & DETAILS:\n• Gender: Men's\n• Fabric: Thermal Fleece\n• Pattern: Printed Sportswear Graphic\n• Neck Type: Stand Collar with Full Zipper\n• Pieces: 2 Pcs (Zipper Jacket + Trouser)\n• Color: Heather Grey\n• Shirt Measurements: Length: 25\", Chest: 19\", Arm: 23\"\n• Trouser Measurements: Length: 41\", Waist: 34\", Hip: 34\"\n• Package Includes: 1 x Zipper Jacket, 1 x Trouser\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2500,
    "sale_price": null,
    "cost_price": 1700,
    "stock_quantity": 40,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-men-winter",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": true,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 78,
    "seo_title": "Men Fleece Printed Track Suit Grey Slim Fit Winter",
    "seo_description": "Stay warm in style with our men's fleece printed tracksuit in heather grey. Features full zipper jacket & trousers. Shop online with nationwide COD.",
    "has_sizes": true,
    "available_sizes": [
      "Small",
      "Medium",
      "Large",
      "X-Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "S",
          "chest": "19",
          "length": "25",
          "arm": "23"
        },
        {
          "size": "M",
          "chest": "20",
          "length": "26",
          "arm": "23.5"
        },
        {
          "size": "L",
          "chest": "21",
          "length": "27",
          "arm": "24"
        },
        {
          "size": "XL",
          "chest": "22",
          "length": "28",
          "arm": "24.5"
        }
      ],
      "trouser": [
        {
          "size": "S",
          "waist": "30-34",
          "length": "40",
          "hip": "34"
        },
        {
          "size": "M",
          "waist": "32-36",
          "length": "41",
          "hip": "36"
        },
        {
          "size": "L",
          "waist": "34-38",
          "length": "42",
          "hip": "38"
        },
        {
          "size": "XL",
          "waist": "36-40",
          "length": "43",
          "hip": "40"
        }
      ]
    },
    "images": [
      {
        "id": "img-5-1",
        "image_url": "/products/men-fleece-printed-track-suit-grey-1.webp",
        "alt_text": "Men fleece printed track suit grey jacket and trouser front",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-5-2",
        "image_url": "/products/men-fleece-printed-track-suit-grey-2.webp",
        "alt_text": "Men fleece grey tracksuit detail view 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-5-3",
        "image_url": "/products/men-fleece-printed-track-suit-grey-3.webp",
        "alt_text": "Men fleece grey tracksuit detail view 3",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-5-4",
        "image_url": "/products/men-fleece-printed-track-suit-grey-4.webp",
        "alt_text": "Men fleece grey tracksuit detail view 4",
        "sort_order": 4,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-5-1",
        "product_id": "prod-05-men-fleece-tracksuit-grey",
        "sku": "CCC-TRK-GRY-S",
        "variant_name": "Small",
        "price": 2500,
        "stock_quantity": 10,
        "attributes": {
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-5-2",
        "product_id": "prod-05-men-fleece-tracksuit-grey",
        "sku": "CCC-TRK-GRY-M",
        "variant_name": "Medium",
        "price": 2500,
        "stock_quantity": 15,
        "attributes": {
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-5-3",
        "product_id": "prod-05-men-fleece-tracksuit-grey",
        "sku": "CCC-TRK-GRY-L",
        "variant_name": "Large",
        "price": 2500,
        "stock_quantity": 15,
        "attributes": {
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-5-4",
        "product_id": "prod-05-men-fleece-tracksuit-grey",
        "sku": "CCC-TRK-GRY-XL",
        "variant_name": "X-Large",
        "price": 2500,
        "stock_quantity": 10,
        "attributes": {
          "size": "X-Large"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8999999999999995,
    "review_count": 24
  },
  {
    "id": "prod-06-j-janan-musk-100ml",
    "name": "J. Janan Musk EDP 100ml Musky Perfume for Men",
    "slug": "j-janan-musk-edp-100ml-perfume-men",
    "sku": "CCC-JAN-MSK-100",
    "short_description": "Exude quiet strength and refined charisma with J. Janan Musk Eau de Parfum 100ml for men. This sophisticated blend merges zesty citrus top notes with gentle rose accords and a warm, velvety cashmere musk foundation.",
    "full_description": "Janan Musk by J. Fragrances is a masterful olfactory tribute to calm confidence and distinguished masculinity. Specially crafted for the refined gentleman, this Eau de Parfum opens with a crisp burst of bergamot, lemon, and aromatic artemisia, instantly waking the senses with lively freshness.\n\nAs the fragrance settles, a harmonious floral heart unfolds, interweaving delicate rose accord, soft violet, and earthy patchouli. The dry-down reveals the true essence of Janan: an opulent base of rich musk, amber, and smooth cashmere woods that lingers effortlessly on the skin and clothing throughout the day. Packaged in an iconic glass bottle with clean white accents, this 100ml EDP performs exceptionally in Pakistan's warm afternoons and cool festive evenings. A signature gift or personal daily fragrance of authentic distinction.\n\nKEY FEATURES & HIGHLIGHTS:\n• Authentic Eau de Parfum (EDP) concentration with superior longevity\n• Bright citrus opening featuring bergamot, lemon, and artemisia\n• Sophisticated floral heart of rose accord, violet, and patchouli\n• Warm, alluring base notes of musk, amber, and cashmere woods\n• Premium 100ml spray bottle with sleek executive design\n• Versatile sillage suitable for boardroom meetings or festive events\n\nSPECIFICATIONS & DETAILS:\n• Brand: J. Fragrances by Junaid Jamshed\n• Classification: Musky / Woody Floral\n• Concentration: Eau de Parfum (EDP)\n• Gender: Men's\n• Volume: 100 ml\n• Top Notes: Bergamot, Lemon, Artemisia\n• Heart Notes: Rose Accord, Violet Accord, Patchouli\n• Base Notes: Pure Musk, Amber, Cashmere Woods\n• Package Includes: 1 x 100ml Perfume Bottle with Retail Packaging\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 1470,
    "sale_price": null,
    "cost_price": 950,
    "stock_quantity": 35,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-mens-perfumes",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 85,
    "seo_title": "J. Janan Musk EDP 100ml Musky Perfume for Men",
    "seo_description": "Discover J. Janan Musk Eau de Parfum 100ml for men. An elegant blend of citrus, floral rose accord & warm musk. Order now with nationwide delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-6-1",
        "image_url": "/products/j-janan-musk-edp-perfume-men-1.webp",
        "alt_text": "J. Janan Musk EDP 100ml perfume bottle and retail packaging",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-6-2",
        "image_url": "/products/j-janan-musk-edp-perfume-men-2.webp",
        "alt_text": "J. Janan Musk perfume bottle closeup",
        "sort_order": 2,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-6-1",
        "product_id": "prod-06-j-janan-musk-100ml",
        "sku": "CCC-JAN-MSK-100",
        "variant_name": "100ml EDP",
        "price": 1470,
        "stock_quantity": 35,
        "attributes": {
          "volume": "100ml"
        },
        "is_active": true
      }
    ],
    "average_rating": 5,
    "review_count": 27
  },
  {
    "id": "prod-07-women-black-slipon-sneakers",
    "name": "Women Black Slip-On Sneakers Comfort Walking Pumps",
    "slug": "women-black-slip-on-sneakers",
    "sku": "CCC-SNK-BLK",
    "short_description": "Step into effortless all-day comfort with these versatile black slip-on sneakers for women. Crafted from premium breathable rexine with cushioned insoles, they are ideal for college, work, or casual daily errands.",
    "full_description": "Move through your active day in total comfort with our Women's Black Slip-On Sneakers and Everyday Pumps. Expertly constructed from flexible, easy-to-clean rexine leather, these lightweight shoes combine the casual styling of sneakers with the effortless convenience of slip-on pumps.\n\nThe interior is lined with a soft, breathable cushion footbed that supports your arches during long hours of walking, shopping, or university lectures. A flexible rubberized outsole provides reliable grip on various floor surfaces while absorbing pavement impact. Available in dual UK/EU sizing from 6/36 through 10/40, these minimalist black shoes effortlessly match jeans, eastern kurtis, and casual trousers alike. Durable, comfortable, and affordable, they are an essential addition to any Pakistani woman’s footwear collection.\n\nKEY FEATURES & HIGHLIGHTS:\n• Supple and durable rexine upper with clean minimalist stitching\n• Slip-on silhouette allows quick, lace-free on and off convenience\n• Cushioned interior footbed provides all-day walking comfort\n• Flexible anti-slip traction sole engineered for steady grip\n• Dual UK/EU sizing available from 6/36 up to 10/40\n• Versatile all-black aesthetic easily pairs with eastern and western attire\n\nSPECIFICATIONS & DETAILS:\n• Gender: Women's\n• Product Type: Slip-On Walking Pumps / Sneakers\n• Material: High-Grade Rexine Synthetic Leather\n• Color: Solid Black\n• Pattern: Plain Minimalist\n• Available Sizes: 6/36, 7/37, 8/38, 9/39, 10/40\n• Closure: Slip-On\n• Package Includes: 1 x Pair Women's Shoes\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 1500,
    "sale_price": null,
    "cost_price": 950,
    "stock_quantity": 48,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-footwear",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 92,
    "seo_title": "Women Black Slip-On Sneakers & Comfort Walking Pumps",
    "seo_description": "Shop women's black slip-on sneakers in Pakistan. Durable rexine with cushioned support in sizes 36 to 40. Buy with cash on delivery at CC Carvan.",
    "has_sizes": true,
    "available_sizes": [
      "6/36",
      "7/37",
      "8/38",
      "9/39",
      "10/40"
    ],
    "size_chart": null,
    "images": [
      {
        "id": "img-7-1",
        "image_url": "/products/women-black-slipon-sneakers-1.webp",
        "alt_text": "Women black slip-on sneakers and comfort pumps side view",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-7-2",
        "image_url": "/products/women-black-slipon-sneakers-2.webp",
        "alt_text": "Women black slip-on sneakers sole and detail view 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-7-3",
        "image_url": "/products/women-black-slipon-sneakers-3.webp",
        "alt_text": "Women black slip-on sneakers sole and detail view 3",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-7-1",
        "product_id": "prod-07-women-black-slipon-sneakers",
        "sku": "CCC-SNK-BLK-36",
        "variant_name": "6/36",
        "price": 1500,
        "stock_quantity": 8,
        "attributes": {
          "size": "6/36"
        },
        "is_active": true
      },
      {
        "id": "var-7-2",
        "product_id": "prod-07-women-black-slipon-sneakers",
        "sku": "CCC-SNK-BLK-37",
        "variant_name": "7/37",
        "price": 1500,
        "stock_quantity": 12,
        "attributes": {
          "size": "7/37"
        },
        "is_active": true
      },
      {
        "id": "var-7-3",
        "product_id": "prod-07-women-black-slipon-sneakers",
        "sku": "CCC-SNK-BLK-38",
        "variant_name": "8/38",
        "price": 1500,
        "stock_quantity": 15,
        "attributes": {
          "size": "8/38"
        },
        "is_active": true
      },
      {
        "id": "var-7-4",
        "product_id": "prod-07-women-black-slipon-sneakers",
        "sku": "CCC-SNK-BLK-39",
        "variant_name": "9/39",
        "price": 1500,
        "stock_quantity": 10,
        "attributes": {
          "size": "9/39"
        },
        "is_active": true
      },
      {
        "id": "var-7-5",
        "product_id": "prod-07-women-black-slipon-sneakers",
        "sku": "CCC-SNK-BLK-40",
        "variant_name": "10/40",
        "price": 1500,
        "stock_quantity": 8,
        "attributes": {
          "size": "10/40"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 30
  },
  {
    "id": "prod-08-men-wash-and-wear-brown-suit",
    "name": "Men Unstitched Wash and Wear Plain Brown Suit",
    "slug": "men-unstitched-wash-and-wear-brown-suit",
    "sku": "CCC-MEN-WNW-BRN",
    "short_description": "Experience hassle-free all-season styling with this men's unstitched plain brown wash-and-wear suit. Crafted with a wrinkle-resistant finish, this 4-meter fabric parcel delivers a sharp drape with minimal ironing required.",
    "full_description": "Tailor sharp, crease-resistant eastern attire with our Men’s Unstitched Wash and Wear Suit in rich tobacco brown. Formulated specifically for Pakistan’s climate, this high-performance fabric features specialized polyester-viscose threads that resist stubborn creases and retain their crisp form from morning meetings until late evening.\n\nWhether you prefer a traditional collared kurta or a formal shalwar kameez silhouette, this 4-meter cut provides ample fabric for comfortable bespoke tailoring. The earthy brown color lends a sophisticated, mature aesthetic that complements both leather sandals and formal footwear. Complete with an authentic brand tag and presentation packaging, this unstitched suit is ideal for everyday work, Friday prayers, and festive family gatherings across all four seasons.\n\nKEY FEATURES & HIGHLIGHTS:\n• Wrinkle-resistant wash-and-wear fabric formulated for all seasons\n• Generous 4-meter total cutting (2m shirt + 2m trouser)\n• Sophisticated plain tobacco brown shade with smooth surface texture\n• Retains crisp crease lines with minimal ironing required\n• Packaged in a signature brand bag with official tag\n• Durable textile weave resists pilling and fading over time\n\nSPECIFICATIONS & DETAILS:\n• Fabric: Wash and Wear\n• Pattern: Plain Solid\n• Season: All Season Wear\n• Color: Rich Tobacco Brown\n• Shirt Cutting: 2 Meters\n• Trouser Cutting: 2 Meters\n• Total Cutting: 4 Meters\n• Accessories: Brand Tag and Bag Included\n• Package Includes: 1 x Unstitched Suit Fabric\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2000,
    "sale_price": null,
    "cost_price": 1300,
    "stock_quantity": 40,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-men-unstitched",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": "Unstitched – 4 m (Shirt 2 m + Trouser 2 m)",
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 99,
    "seo_title": "Men Unstitched Wash and Wear Plain Brown Suit",
    "seo_description": "Buy men's unstitched wash & wear suit in earthy brown. Premium 4m all-season fabric cut with brand tag & bag. Enjoy nationwide cash on delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-8-1",
        "image_url": "/products/men-wash-and-wear-suit-brown-1.webp",
        "alt_text": "Men unstitched wash and wear plain brown suit folded with brand tag",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-8-2",
        "image_url": "/products/men-wash-and-wear-suit-brown-2.webp",
        "alt_text": "Men wash and wear brown suit fabric texture closeup",
        "sort_order": 2,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-8-1",
        "product_id": "prod-08-men-wash-and-wear-brown-suit",
        "sku": "CCC-MEN-WNW-BRN",
        "variant_name": "Brown / 4 Meter Cut",
        "price": 2000,
        "stock_quantity": 40,
        "attributes": {
          "color": "Brown",
          "cutting": "4 Meter Unstitched"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8999999999999995,
    "review_count": 33
  },
  {
    "id": "prod-09-grey-printed-women-night-suit",
    "name": "Women Grey Printed 2-Piece Jersey Night Suit Set",
    "slug": "women-grey-printed-jersey-night-suit",
    "sku": "CCC-NGT-GRY",
    "short_description": "Unwind in blissful relaxation with this women's grey printed 2-piece night suit. Tailored from soft breathable combed jersey with charming heart motifs, it delivers supreme comfort for sleep and home lounging.",
    "full_description": "Upgrade your evening downtime with our Women's Grey Printed 2-Piece Night Suit, designed for breathable comfort during warm Pakistani nights. Tailored from premium combed jersey cotton, the fabric feels smooth against delicate skin and resists fabric pilling through repeated washing.\n\nThe set includes a relaxed-fit short-sleeve sleep shirt with a modest round neckline, accented with trendy heart pattern motifs. The coordinated sleep trousers feature an elasticated comfort waistband that expands gently without pinching. Available in Medium, Large, and X-Large sizes with an accurate measurement chart, this sleepwear duo offers unrestricted freedom of movement whether you are reading, sleeping, or enjoying casual weekend mornings at home.\n\nKEY FEATURES & HIGHLIGHTS:\n• Ultra-soft combed jersey cotton fabric designed for breathability\n• Two-piece coordinated set: 1 sleep shirt plus 1 comfort trouser\n• Trendy printed heart motifs on a classic heather grey base\n• Relaxed round-neck silhouette with loose elbow-length sleeves\n• Comfort-stretch elasticated trouser waistband\n• Available in Medium, Large, and X-Large sizes with detailed size chart\n\nSPECIFICATIONS & DETAILS:\n• Fabric: Combed Cotton Jersey\n• Pattern: Printed Heart Motifs\n• Neck Type: Round Neck\n• Available Sizes: Medium, Large, X-Large\n• Number of Pieces: 2 Pcs (Sleep Shirt + Sleep Trouser)\n• Color: Heather Grey with Multi-Heart Print\n• Shirt Measurements: Length: 26-27\", Chest: 19-23\", Arm: 11\"\n• Trouser Measurements: Length: 37-39\", Waist: 32-44\"\n• Package Includes: 1 x Sleep Shirt, 1 x Sleep Trouser\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2000,
    "sale_price": null,
    "cost_price": 1300,
    "stock_quantity": 45,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-nightwear",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 106,
    "seo_title": "Women Grey Printed 2-Piece Jersey Night Suit Set",
    "seo_description": "Stay comfortable in our women's grey printed jersey night suit. Includes round neck shirt & elasticated trousers. Available in M, L, XL with COD.",
    "has_sizes": true,
    "available_sizes": [
      "Medium",
      "Large",
      "X-Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "Medium",
          "chest": "19",
          "length": "26",
          "sleeves": "11"
        },
        {
          "size": "Large",
          "chest": "21",
          "length": "27",
          "sleeves": "11"
        },
        {
          "size": "X-Large",
          "chest": "23",
          "length": "27",
          "sleeves": "11"
        }
      ],
      "trouser": [
        {
          "size": "Medium",
          "waist": "32 to 40",
          "length": "37 to 38"
        },
        {
          "size": "Large",
          "waist": "34 to 42",
          "length": "38 to 39"
        },
        {
          "size": "X-Large",
          "waist": "34 to 44",
          "length": "38 to 39"
        }
      ]
    },
    "images": [
      {
        "id": "img-9-1",
        "image_url": "/products/grey-printed-women-night-suit-1.webp",
        "alt_text": "Women grey printed 2-piece jersey night suit set front view",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-9-2",
        "image_url": "/products/grey-printed-women-night-suit-2.webp",
        "alt_text": "Women grey printed night suit sleep shirt and trouser detail 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-9-3",
        "image_url": "/products/grey-printed-women-night-suit-3.webp",
        "alt_text": "Women grey printed night suit sleep shirt and trouser detail 3",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-9-1",
        "product_id": "prod-09-grey-printed-women-night-suit",
        "sku": "CCC-NGT-GRY-M",
        "variant_name": "Medium",
        "price": 2000,
        "stock_quantity": 15,
        "attributes": {
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-9-2",
        "product_id": "prod-09-grey-printed-women-night-suit",
        "sku": "CCC-NGT-GRY-L",
        "variant_name": "Large",
        "price": 2000,
        "stock_quantity": 18,
        "attributes": {
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-9-3",
        "product_id": "prod-09-grey-printed-women-night-suit",
        "sku": "CCC-NGT-GRY-XL",
        "variant_name": "X-Large",
        "price": 2000,
        "stock_quantity": 12,
        "attributes": {
          "size": "X-Large"
        },
        "is_active": true
      }
    ],
    "average_rating": 5,
    "review_count": 36
  },
  {
    "id": "prod-10-men-citrus-floral-musk-edt",
    "name": "Men Citrus Floral Musk Eau de Toilette 100ml EDT",
    "slug": "men-citrus-floral-musk-eau-de-toilette-100ml",
    "sku": "CCC-CFM-EDT-100",
    "short_description": "Elevate your daily presence with this Men's Citrus Floral Musk Eau de Toilette 100ml. Blending crisp citrus sparkle with refined floral nuances and a warm woody musk foundation, it is formulated for all-day confidence in Pakistani weather.",
    "full_description": "Make a sharp, charismatic impression every day with our Men’s Citrus Floral Musk Eau de Toilette. Crafted specifically to endure Pakistan’s warm and humid conditions, this dynamic fragrance opens with a sparkling wave of sun-drenched citrus notes that invigorates your senses with clean, energetic vitality.\n\nAs the scent evolves, a poised floral heart emerges, balancing the citrus brightness with subtle, masculine poise. The composition rests upon a rich, earthy base of musk and cedarwoods that projects dependable sillage without overpowering the room. Encased in a sturdy clear glass bottle topped with a sleek minimalist white cap, this 100ml EDT offers superior value for the discerning Pakistani professional. Perfect for daily boardroom hours, gym routines, and weekend dinners.\n\nKEY FEATURES & HIGHLIGHTS:\n• Energizing opening notes of zesty Mediterranean citrus\n• Refined heart accord providing balanced floral sophistication\n• Enduring base notes of sensual musk and warm cedarwood\n• Formulated for extended projection in warm Pakistani weather\n• Sturdy heavy-base glass bottle with secure leak-proof cap\n• Generous 100ml volume ideal for daily executive wear\n\nSPECIFICATIONS & DETAILS:\n• Product Type: Men's Eau de Toilette (EDT)\n• Classification: Citrus / Woody Musk\n• Volume: 100 ml\n• Gender: Men's\n• Top Notes: Citrus, Zesty Bergamot\n• Middle Notes: Refined Floral Nuances\n• Base Notes: Warm Musk, Cedarwood\n• Bottle Material: Transparent High-Grade Glass\n• Package Includes: 1 x 100ml Perfume Bottle with Atomizer\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 1030,
    "sale_price": null,
    "cost_price": 650,
    "stock_quantity": 45,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-mens-perfumes",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 113,
    "seo_title": "Men Citrus Floral Musk Eau de Toilette 100ml EDT",
    "seo_description": "Shop men's citrus floral musk Eau de Toilette 100ml. Crisp zesty opening with warm woody musk base. Order online in Pakistan with cash on delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-10-1",
        "image_url": "/products/men-citrus-floral-musk-edt-100ml-1.webp",
        "alt_text": "Men citrus floral musk eau de toilette 100ml glass bottle with white cap",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-10-2",
        "image_url": "/products/men-citrus-floral-musk-edt-100ml-2.webp",
        "alt_text": "Men citrus floral musk perfume bottle angle and packaging 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-10-3",
        "image_url": "/products/men-citrus-floral-musk-edt-100ml-3.webp",
        "alt_text": "Men citrus floral musk perfume bottle angle and packaging 3",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-10-1",
        "product_id": "prod-10-men-citrus-floral-musk-edt",
        "sku": "CCC-CFM-EDT-100",
        "variant_name": "100ml EDT",
        "price": 1030,
        "stock_quantity": 45,
        "attributes": {
          "volume": "100ml"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 39
  },
  {
    "id": "prod-11-purple-printed-women-night-suit",
    "name": "Women Purple Printed 2-Piece Cotton Jersey Night Suit",
    "slug": "women-purple-printed-cotton-jersey-night-suit",
    "sku": "CCC-NGT-PRP",
    "short_description": "Wrap yourself in luxury comfort with this women's purple printed 2-piece night suit. Cut in a relaxed Free Size from premium cotton jersey, this set combines a playful graphic sleep tee with coordinated wide-leg trousers.",
    "full_description": "Indulge in relaxed luxury with our Women's Purple Printed 2-Piece Night Suit, designed for those who appreciate premium loungewear comfort. Expertly tailored from high-thread-count combed cotton jersey, both pieces feel exceptionally soft against the skin, offering optimal breathability for all seasons in Pakistan.\n\nThe top features a charming printed graphic motif on a vibrant purple backdrop with a neat round neckline and easy-fitting sleeves. The coordinated wide-leg trousers are detailed with subtle floral and heart accents, complete with a stretch waistband that ensures a pressure-free fit. Tailored in a universal Standard Free Size (Chest 20-21\", Shirt Length 28\", Trouser Length 38-39\"), this boutique nightwear set is perfect for evening relaxation, morning coffee, and restful sleep. Enjoy doorstep delivery across Pakistan with convenient cash on delivery.\n\nKEY FEATURES & HIGHLIGHTS:\n• Ultra-soft premium cotton jersey fabric for breathable year-round comfort\n• Charming printed graphic motifs on rich royal purple fabric\n• Two-piece loungewear set: graphic sleep shirt plus coordinated trousers\n• Universal Standard Free Size silhouette offering a relaxed silhouette\n• Gentle elasticated waistband designed for non-pinching comfort\n• Resistant to fading and pilling through regular home washing\n\nSPECIFICATIONS & DETAILS:\n• Shirt Fabric: Soft Combed Jersey\n• Trouser Fabric: Cotton Jersey\n• Pattern: Printed Graphic & Heart Motifs\n• Neck Type: Round Neck\n• Available Sizes: Standard Free Size\n• Color: Rich Purple\n• Shirt Measurements: Chest: 20-21\", Length: 28\", Shoulder: 14\"\n• Trouser Measurements: Length: 38-39\", Waist: 36\" Elasticated, Hip: 23\"\n• Package Includes: 1 x Sleep Shirt, 1 x Sleep Trouser\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 5000,
    "sale_price": null,
    "cost_price": 2500,
    "stock_quantity": 25,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-nightwear",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": false,
    "is_published": true,
    "view_count": 120,
    "seo_title": "Women Purple Printed 2-Piece Cotton Jersey Night Suit",
    "seo_description": "Relax in luxury with this women's purple printed cotton jersey night suit. Standard free size with soft tee & wide-leg trousers. Fast COD delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": {
      "trouser": [
        {
          "size": "Free Size",
          "waist": "28-38",
          "length": "38-39"
        }
      ],
      "shirt": [
        {
          "size": "Free Size",
          "chest": "20-21",
          "length": "28",
          "sleeves": "11"
        }
      ]
    },
    "images": [
      {
        "id": "img-11-1",
        "image_url": "/products/purple-printed-women-night-suit-1.webp",
        "alt_text": "Women purple printed 2-piece cotton jersey night suit set",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-11-2",
        "image_url": "/products/purple-printed-women-night-suit-2.webp",
        "alt_text": "Women purple printed night suit fabric and graphic print closeup",
        "sort_order": 2,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-11-1",
        "product_id": "prod-11-purple-printed-women-night-suit",
        "sku": "CCC-NGT-PRP-FREE",
        "variant_name": "Standard Free Size",
        "price": 5000,
        "stock_quantity": 25,
        "attributes": {
          "size": "Standard Free Size",
          "color": "Purple"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8999999999999995,
    "review_count": 42
  },
  {
    "id": "prod-12-pink-printed-women-night-suit",
    "name": "Women Pink Printed 2-Piece Stitched Jersey Night Suit",
    "slug": "women-pink-printed-stitched-jersey-night-suit",
    "sku": "CCC-NGT-PNK",
    "short_description": "Brighten your evening routine with this lovely pink printed 2-piece stitched jersey night suit. Crafted from breathable combed jersey, this set pairs a loose round-neck shirt with matching comfort trousers in Medium, Large, and X-Large.",
    "full_description": "Embrace cozy charm with our Women's Pink Printed 2-Piece Stitched Jersey Night Suit by DreamyDots. Beautifully cut from breathable, premium combed jersey, this stitched loungewear set provides an airy, lightweight feel that lets your skin breathe freely during relaxing evenings and night-long sleep.\n\nThe sleep shirt features a modest round neckline with an extended 30-inch length for modest comfort, complemented by playful printed accents on a delightful blush pink palette. The matching trousers are finished with an elasticated waistband and tailored 39-inch outseam for comfortable movement. Available in Medium, Large, and X-Large sizes, this easy-care night suit resists shrinkage and pilling, making it an indispensable favorite for bedtime comfort across Pakistan.\n\nKEY FEATURES & HIGHLIGHTS:\n• Lightweight combed jersey cotton tailored for airy nighttime comfort\n• Two-piece coordinated set: 1 extended sleep shirt plus 1 comfort trouser\n• Charming printed details on a feminine blush pink backdrop\n• Modest 30-inch shirt length providing comfortable extra coverage\n• Flexible elasticated waistband designed for all-night comfort\n• Available in standard sizes: Medium, Large, and X-Large\n\nSPECIFICATIONS & DETAILS:\n• Brand / Collection: DreamyDots New Arrival\n• Fabric: Stitched Combed Jersey\n• Pattern: Printed Casual\n• Neck Type: Round Neck\n• Number of Pieces: 2 Pcs (Shirt + Trouser)\n• Color: Blush Pink\n• Shirt Measurements: Length: 30\", Chest: 22\", Arm: 11\", Shoulder: 15\"\n• Trouser Measurements: Length: 39\", Waist: 36\" Stretch, Hip: 23\"\n• Package Includes: 1 x Sleep Shirt, 1 x Sleep Trouser\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2000,
    "sale_price": null,
    "cost_price": 1300,
    "stock_quantity": 45,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-nightwear",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 127,
    "seo_title": "Women Pink Printed 2-Piece Stitched Jersey Night Suit",
    "seo_description": "Discover our women's pink printed stitched jersey night suit. Includes round neck shirt & comfortable trousers in M, L, XL. Cash on delivery available.",
    "has_sizes": true,
    "available_sizes": [
      "Medium",
      "Large",
      "X-Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "Medium",
          "chest": "20",
          "length": "29",
          "sleeves": "11"
        },
        {
          "size": "Large",
          "chest": "22",
          "length": "30",
          "sleeves": "11"
        },
        {
          "size": "X-Large",
          "chest": "24",
          "length": "31",
          "sleeves": "11"
        }
      ],
      "trouser": [
        {
          "size": "Medium",
          "waist": "32 to 38",
          "length": "38 to 39"
        },
        {
          "size": "Large",
          "waist": "34 to 42",
          "length": "39 to 40"
        },
        {
          "size": "X-Large",
          "waist": "36 to 44",
          "length": "39 to 40"
        }
      ]
    },
    "images": [
      {
        "id": "img-12-1",
        "image_url": "/products/pink-printed-women-night-suit-1.webp",
        "alt_text": "Women pink printed 2-piece stitched jersey night suit front view",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-12-2",
        "image_url": "/products/pink-printed-women-night-suit-2.webp",
        "alt_text": "Women pink printed night suit detail 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-12-3",
        "image_url": "/products/pink-printed-women-night-suit-3.webp",
        "alt_text": "Women pink printed night suit detail 3",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-12-4",
        "image_url": "/products/pink-printed-women-night-suit-4.webp",
        "alt_text": "Women pink printed night suit detail 4",
        "sort_order": 4,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-12-1",
        "product_id": "prod-12-pink-printed-women-night-suit",
        "sku": "CCC-NGT-PNK-M",
        "variant_name": "Medium",
        "price": 2000,
        "stock_quantity": 15,
        "attributes": {
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-12-2",
        "product_id": "prod-12-pink-printed-women-night-suit",
        "sku": "CCC-NGT-PNK-L",
        "variant_name": "Large",
        "price": 2000,
        "stock_quantity": 18,
        "attributes": {
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-12-3",
        "product_id": "prod-12-pink-printed-women-night-suit",
        "sku": "CCC-NGT-PNK-XL",
        "variant_name": "X-Large",
        "price": 2000,
        "stock_quantity": 12,
        "attributes": {
          "size": "X-Large"
        },
        "is_active": true
      }
    ],
    "average_rating": 5,
    "review_count": 45
  },
  {
    "id": "prod-13-men-black-double-sided-jacket",
    "name": "Men Black Double-Sided Stand Collar Casual Jacket",
    "slug": "men-black-double-sided-stand-collar-jacket",
    "sku": "CCC-JCK-BLK",
    "short_description": "Shield yourself against chilly breezes with this sleek men's black double-sided stand-collar jacket. Featuring durable lightweight insulation and precision zipper styling, it is your go-to layer for work, travel, and evening outings.",
    "full_description": "Meet the versatile outerwear essential built for Pakistan's unpredictable winter temperatures: our Men's Black Double-Sided Stand Collar Jacket. Tailored from premium high-density synthetic fabric, this jacket provides reliable wind resistance and lightweight thermal warmth without bulky heaviness.\n\nThe design boasts a sharp stand-up collar, durable full front zipper, ergonomic welt pockets, and sleek contrast panel accents that lend a modern sporty silhouette. Its double-sided construction reinforces durability while keeping care and maintenance effortless. Whether layered over a warm hoodie for casual weekend travel or worn over a crisp dress shirt for business commutes, this jacket delivers all-season practicality. Available in standard sizes from Small to X-Large with nationwide cash on delivery.\n\nKEY FEATURES & HIGHLIGHTS:\n• High-density wind-resistant shell fabric designed for chilly weather\n• Sleek stand-up collar with smooth heavy-duty front zipper\n• Lightweight thermal structure provides warmth without bulky weight\n• Functional zippered side pockets for secure phone and key storage\n• Double-sided reinforced stitching ensuring long-term durability\n• Available in standard sizes: Small, Medium, Large, and X-Large\n\nSPECIFICATIONS & DETAILS:\n• Target Season: Winter / All Seasons Outerwear\n• Type: Casual Outerwear Jacket\n• Color: Classic Obsidian Black with White Accents\n• Collar: Stand-Up Vertical Collar\n• Closure: Heavy-Duty Front Zipper\n• Quality: Premium High-Density Synthetic Blend\n• Available Sizes: Small, Medium, Large, X-Large\n• Care Instructions: Easy Maintenance, Gentle Machine Wash\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2500,
    "sale_price": null,
    "cost_price": 1650,
    "stock_quantity": 40,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-men-winter",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 134,
    "seo_title": "Men Black Double-Sided Stand Collar Casual Jacket",
    "seo_description": "Stay stylish this winter in our men's black double-sided stand collar jacket. Lightweight, wind-resistant & durable. Shop sizes S to XL with COD.",
    "has_sizes": true,
    "available_sizes": [
      "Small",
      "Medium",
      "Large",
      "X-Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "S",
          "chest": "40",
          "length": "26",
          "sleeves": "24"
        },
        {
          "size": "M",
          "chest": "42",
          "length": "27",
          "sleeves": "24.5"
        },
        {
          "size": "L",
          "chest": "44",
          "length": "28",
          "sleeves": "25"
        },
        {
          "size": "XL",
          "chest": "46",
          "length": "29",
          "sleeves": "25.5"
        }
      ]
    },
    "images": [
      {
        "id": "img-13-1",
        "image_url": "/products/men-black-double-sided-jacket-1.webp",
        "alt_text": "Men black double-sided stand collar casual jacket front view",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-13-2",
        "image_url": "/products/men-black-double-sided-jacket-2.webp",
        "alt_text": "Men black jacket collar and zipper detail 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-13-3",
        "image_url": "/products/men-black-double-sided-jacket-3.webp",
        "alt_text": "Men black jacket collar and zipper detail 3",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-13-4",
        "image_url": "/products/men-black-double-sided-jacket-4.webp",
        "alt_text": "Men black jacket collar and zipper detail 4",
        "sort_order": 4,
        "is_primary": false
      },
      {
        "id": "img-13-5",
        "image_url": "/products/men-black-double-sided-jacket-5.webp",
        "alt_text": "Men black jacket collar and zipper detail 5",
        "sort_order": 5,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-13-1",
        "product_id": "prod-13-men-black-double-sided-jacket",
        "sku": "CCC-JCK-BLK-S",
        "variant_name": "Small",
        "price": 2500,
        "stock_quantity": 10,
        "attributes": {
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-13-2",
        "product_id": "prod-13-men-black-double-sided-jacket",
        "sku": "CCC-JCK-BLK-M",
        "variant_name": "Medium",
        "price": 2500,
        "stock_quantity": 15,
        "attributes": {
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-13-3",
        "product_id": "prod-13-men-black-double-sided-jacket",
        "sku": "CCC-JCK-BLK-L",
        "variant_name": "Large",
        "price": 2500,
        "stock_quantity": 10,
        "attributes": {
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-13-4",
        "product_id": "prod-13-men-black-double-sided-jacket",
        "sku": "CCC-JCK-BLK-XL",
        "variant_name": "X-Large",
        "price": 2500,
        "stock_quantity": 5,
        "attributes": {
          "size": "X-Large"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 48
  },
  {
    "id": "prod-14-men-fleece-hoodie-colorblock",
    "name": "Men Fleece Pullover Hoodie Olive Tan Black Colorblock",
    "slug": "men-fleece-pullover-hoodie-colorblock",
    "sku": "CCC-HD-CLR",
    "short_description": "Level up your winter streetwear with this men's stitched fleece pullover hoodie. Featuring modern colorblock paneling in Olive, Tan, and Black with an adjustable drawstring hood, it delivers warmth and style.",
    "full_description": "Make a sharp style statement in brisk winter weather with our Men’s Fleece Stitched Colorblock Hoodie. Tailored from plush, warm fleece fabric, this pullover keeps you cozy through cool morning commutes, gym sessions, and relaxed weekend evenings.\n\nThe design stands out with bold architectural color-blocking across the chest, shoulders, and sleeves, available in Olive Green, Warm Tan, and Midnight Black colourways. A double-layered hood with adjustable drawstrings offers customized wind protection, while a front kangaroo pocket provides a warm haven for your hands and essential pocket items. Complete with rib-knit cuffs and waist hem, this hoodie pairs effortlessly with jeans, joggers, and track pants. Available in sizes Small through X-Large.\n\nKEY FEATURES & HIGHLIGHTS:\n• Thermal brushed fleece fabric provides exceptional warmth and softness\n• Eye-catching modern colorblock paneling with contrast stitching\n• Double-layered hood with durable drawstrings for weather protection\n• Spacious front pocket for quick hand warmth and daily carry\n• Available in 3 popular colors: Olive, Tan, and Black\n• Standard sizes available: Small, Medium, Large, and X-Large\n\nSPECIFICATIONS & DETAILS:\n• Material: Plush Thermal Fleece\n• Season: Autumn / Winter\n• Type: Pullover Hoodie / Sweatshirt\n• Style: Urban Streetwear / Casual\n• Available Colors: Olive, Tan, Black\n• Hood: Adjustable Drawstring Hood\n• Available Sizes: Small, Medium, Large, X-Large\n• Pocket: Front Kangaroo Pocket\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2000,
    "sale_price": null,
    "cost_price": 1300,
    "stock_quantity": 48,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-men-winter",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 141,
    "seo_title": "Men Fleece Pullover Hoodie Olive Tan Black Colorblock",
    "seo_description": "Stay warm in our men's fleece stitched hoodie. Trendy colorblock design in Olive, Tan & Black with kangaroo pocket. Shop sizes S to XL with COD.",
    "has_sizes": true,
    "available_sizes": [
      "Small",
      "Medium",
      "Large",
      "X-Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "S",
          "chest": "38",
          "length": "26",
          "sleeves": "23"
        },
        {
          "size": "M",
          "chest": "40",
          "length": "27",
          "sleeves": "24"
        },
        {
          "size": "L",
          "chest": "42",
          "length": "28",
          "sleeves": "24.5"
        },
        {
          "size": "XL",
          "chest": "44",
          "length": "29",
          "sleeves": "25"
        }
      ]
    },
    "images": [
      {
        "id": "img-14-1",
        "image_url": "/products/men-fleece-stitched-hoodie-olive-tan-black-1.webp",
        "alt_text": "Men fleece stitched hoodie in olive colorblock",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-14-2",
        "image_url": "/products/men-fleece-stitched-hoodie-olive-tan-black-2.webp",
        "alt_text": "Men fleece stitched hoodie in tan colorblock",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-14-3",
        "image_url": "/products/men-fleece-stitched-hoodie-olive-tan-black-3.webp",
        "alt_text": "Men fleece hoodie in solid black",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-14-4",
        "image_url": "/products/men-fleece-stitched-hoodie-olive-tan-black-4.webp",
        "alt_text": "Men fleece hoodie detail view 4",
        "sort_order": 4,
        "is_primary": false
      },
      {
        "id": "img-14-5",
        "image_url": "/products/men-fleece-stitched-hoodie-olive-tan-black-5.webp",
        "alt_text": "Men fleece hoodie detail view 5",
        "sort_order": 5,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-14-1",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-OLV-S",
        "variant_name": "Olive / S",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Olive",
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-14-2",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-OLV-M",
        "variant_name": "Olive / M",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Olive",
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-14-3",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-OLV-L",
        "variant_name": "Olive / L",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Olive",
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-14-4",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-OLV-XL",
        "variant_name": "Olive / XL",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Olive",
          "size": "X-Large"
        },
        "is_active": true
      },
      {
        "id": "var-14-5",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-TAN-S",
        "variant_name": "Tan / S",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Tan",
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-14-6",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-TAN-M",
        "variant_name": "Tan / M",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Tan",
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-14-7",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-TAN-L",
        "variant_name": "Tan / L",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Tan",
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-14-8",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-TAN-XL",
        "variant_name": "Tan / XL",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Tan",
          "size": "X-Large"
        },
        "is_active": true
      },
      {
        "id": "var-14-9",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-BLK-S",
        "variant_name": "Black / S",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Black",
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-14-10",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-BLK-M",
        "variant_name": "Black / M",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Black",
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-14-11",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-BLK-L",
        "variant_name": "Black / L",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Black",
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-14-12",
        "product_id": "prod-14-men-fleece-hoodie-colorblock",
        "sku": "CCC-HD-BLK-XL",
        "variant_name": "Black / XL",
        "price": 2000,
        "stock_quantity": 4,
        "attributes": {
          "color": "Black",
          "size": "X-Large"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8999999999999995,
    "review_count": 51
  },
  {
    "id": "prod-15-women-brown-leather-handbag",
    "name": "Women Brown Leather Top Handle Handbag 8x10 Inches",
    "slug": "women-brown-leather-top-handle-handbag",
    "sku": "CCC-BAG-BRN-810",
    "short_description": "Elevate your accessory rotation with this classic women's brown leather top handle handbag. Sized at a practical 8 by 10 inches, it combines timeless structured charm with ample room for your everyday essentials.",
    "full_description": "Make a poised, elegant entrance at work or social functions with our Women’s Brown Leather Top Handle Handbag. Designed with clean minimalist lines and a structured box silhouette, this purse is crafted from premium textured synthetic leather that resists abrasions and maintains its refined shape.\n\nMeasuring 8 inches in length by 10 inches in width, the bag provides optimal interior capacity for your smartphone, compact wallet, keys, lipstick, and sunglasses without becoming bulky. A sturdy reinforced top handle allows comfortable hand carry, while gold-toned metal accents add an understated luxury touch. Finished in a warm saddle brown shade that seamlessly complements both western corporate suits and traditional festive lawn suits, this handbag is a timeless wardrobe staple.\n\nKEY FEATURES & HIGHLIGHTS:\n• Crafted from durable, scratch-resistant textured synthetic leather\n• Sturdy reinforced top handle built for comfortable hand carry\n• Compact yet spacious 8 x 10 inch dimensions ideal for daily essentials\n• Elegant warm saddle brown finish accented with gold-tone hardware\n• Structured silhouette stands upright without slouching\n• Versatile accessory suited for office, university, and festive outings\n\nSPECIFICATIONS & DETAILS:\n• Gender: Women's\n• Material: Textured Leather / High-Grade PU\n• Pattern: Plain Minimalist\n• Color: Saddle Brown\n• Length: 8 Inches\n• Width: 10 Inches\n• Handle Type: Reinforced Top Handle\n• Number of Pieces: 1 Pc Handbag\n• Package Includes: 1 x Brown Leather Handbag\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2500,
    "sale_price": null,
    "cost_price": 1600,
    "stock_quantity": 30,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-handbags",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": "Dimensions: 8 x 10\"",
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 148,
    "seo_title": "Women Brown Leather Top Handle Handbag 8x10 Inches",
    "seo_description": "Shop our women's brown leather top handle handbag (8x10 inches). Minimalist structured silhouette with sturdy handle. Order today with COD.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-15-1",
        "image_url": "/products/women-brown-leather-handbag-8x10-1.webp",
        "alt_text": "Women brown leather top handle handbag 8x10 inches front",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-15-2",
        "image_url": "/products/women-brown-leather-handbag-8x10-2.webp",
        "alt_text": "Women brown leather handbag side profile and stitching detail",
        "sort_order": 2,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-15-1",
        "product_id": "prod-15-women-brown-leather-handbag",
        "sku": "CCC-BAG-BRN-810",
        "variant_name": "Brown (8x10\")",
        "price": 2500,
        "stock_quantity": 30,
        "attributes": {
          "color": "Brown",
          "dimensions": "8x10 Inches"
        },
        "is_active": true
      }
    ],
    "average_rating": 5,
    "review_count": 54
  },
  {
    "id": "prod-16-women-kulomi-fleece-pajamas",
    "name": "Women Cute Kulomi Coral Fleece Pajama Set Winter Warm",
    "slug": "women-cute-kulomi-fleece-pajamas-set",
    "sku": "CCC-KLM-PJ",
    "short_description": "Stay delightfully warm all winter long in this Women's Cute Kulomi Coral Fleece Pajama Set. Made from plush thickened fleece with playful cartoon character prints, it offers cloud-like softness for chilly nights.",
    "full_description": "Beat the winter freeze with maximum coziness in our Women's Cute Kulomi Fleece Pajamas Winter Set. Expertly crafted from thickened, ultra-plush coral fleece, this two-piece loungewear set locks in body heat while feeling feather-soft against your skin.\n\nThe long-sleeve pullover top features adorable Kulomi cartoon illustrations, paired with coordinated straight-leg fleece trousers tailored with an elasticated waistband for a gentle, non-restrictive fit. Ideal for lounging by the heater, binge-watching your favorite dramas, or resting peacefully on cold Pakistani nights, this set balances delightful aesthetic charm with practical winter insulation. Available in Small, Medium, and Large sizes. A charming holiday treat for yourself or a thoughtful gift for a loved one.\n\nKEY FEATURES & HIGHLIGHTS:\n• Thickened double-sided coral fleece provides plush warmth and insulation\n• Playful and trendy Kulomi cartoon character graphic detailing\n• Two-piece winter set: long-sleeve fleece top plus coordinated trousers\n• Elasticated comfort-stretch waistband designed for relaxing nights\n• Breathable thermal weave resists static and pilling\n• Available in standard winter sizes: Small, Medium, and Large\n\nSPECIFICATIONS & DETAILS:\n• Target Audience: Women's / Teens\n• Material: Thickened Coral Fleece\n• Season: Winter\n• Type: Loungewear / Sleepwear Pajamas\n• Style: Cute & Adorable Cartoon Graphic\n• Available Sizes: Small, Medium, Large\n• Package Includes: 1 x Fleece Sleep Top, 1 x Fleece Sleep Trouser\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2500,
    "sale_price": null,
    "cost_price": 1600,
    "stock_quantity": 40,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-nightwear",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 155,
    "seo_title": "Women Cute Kulomi Coral Fleece Pajama Set Winter Warm",
    "seo_description": "Stay super cozy in women's Kulomi coral fleece winter pajama set. Thickened soft fleece with cute cartoon motifs. Available in S, M, L with COD.",
    "has_sizes": true,
    "available_sizes": [
      "Small",
      "Medium",
      "Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "S",
          "chest": "38",
          "length": "25",
          "sleeves": "21"
        },
        {
          "size": "M",
          "chest": "40",
          "length": "26",
          "sleeves": "22"
        },
        {
          "size": "L",
          "chest": "42",
          "length": "27",
          "sleeves": "23"
        }
      ],
      "trouser": [
        {
          "size": "S",
          "waist": "26-32",
          "length": "38"
        },
        {
          "size": "M",
          "waist": "28-36",
          "length": "39"
        },
        {
          "size": "L",
          "waist": "30-40",
          "length": "40"
        }
      ]
    },
    "images": [
      {
        "id": "img-16-1",
        "image_url": "/products/women-kulomi-fleece-pajamas-1.webp",
        "alt_text": "Women cute kulomi coral fleece pajama set front view",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-16-2",
        "image_url": "/products/women-kulomi-fleece-pajamas-2.webp",
        "alt_text": "Women kulomi fleece pajamas detail and texture 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-16-3",
        "image_url": "/products/women-kulomi-fleece-pajamas-3.webp",
        "alt_text": "Women kulomi fleece pajamas detail and texture 3",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-16-4",
        "image_url": "/products/women-kulomi-fleece-pajamas-4.webp",
        "alt_text": "Women kulomi fleece pajamas detail and texture 4",
        "sort_order": 4,
        "is_primary": false
      },
      {
        "id": "img-16-5",
        "image_url": "/products/women-kulomi-fleece-pajamas-5.webp",
        "alt_text": "Women kulomi fleece pajamas detail and texture 5",
        "sort_order": 5,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-16-1",
        "product_id": "prod-16-women-kulomi-fleece-pajamas",
        "sku": "CCC-KLM-PJ-S",
        "variant_name": "Small",
        "price": 2500,
        "stock_quantity": 12,
        "attributes": {
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-16-2",
        "product_id": "prod-16-women-kulomi-fleece-pajamas",
        "sku": "CCC-KLM-PJ-M",
        "variant_name": "Medium",
        "price": 2500,
        "stock_quantity": 16,
        "attributes": {
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-16-3",
        "product_id": "prod-16-women-kulomi-fleece-pajamas",
        "sku": "CCC-KLM-PJ-L",
        "variant_name": "Large",
        "price": 2500,
        "stock_quantity": 12,
        "attributes": {
          "size": "Large"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 57
  },
  {
    "id": "prod-17-georgette-plain-maxi-abaya-beige",
    "name": "Women Georgette Box Pleat Maxi Abaya with Buckle",
    "slug": "women-georgette-box-pleat-maxi-abaya",
    "sku": "CCC-ABY-BGE",
    "short_description": "Embrace serene modesty with this women's georgette box-pleat maxi abaya in elegant beige. Detailed with structured front box pleating and a decorative fancy buckle, this ready-to-wear abaya is ideal for Umrah, prayer, and daily grace.",
    "full_description": "Step out in sophisticated modesty with our Women's Georgette Box Pleat Maxi Abaya in graceful sandy beige. Tailored from premium, opaque heavy georgette fabric (popularly known as TikTok fabric), this abaya boasts a flowing drape that remains entirely non-see-through while maintaining breathable comfort across all Pakistani weather conditions.\n\nThe silhouette is distinguished by tailored box plates across the bodice and skirt, cinched gracefully with a metallic-accented fancy buckle detail at the waistline. Measuring a modest 55-inch length and 24-inch chest width in a comfortable ready-to-wear cut, it offers modesty without sacrificing ease of motion. Whether travelling for holy Umrah pilgrimages, attending family gatherings, or stepping out for daily errands, this professionally stitched maxi abaya is a refined staple of timeless modest couture.\n\nKEY FEATURES & HIGHLIGHTS:\n• Heavyweight non-see-through georgette fabric ensuring total modesty\n• Graceful front box pleats for an elegant structured drape\n• Chic decorative metallic buckle accent at the front waist\n• Ready-to-wear professional tailoring with clean, durable seams\n• Breathable fabric texture ideal for all-weather wear and Umrah journeys\n• Available in standard sizes: Small, Medium, Large, and X-Large\n\nSPECIFICATIONS & DETAILS:\n• Material: Heavyweight Georgette (Non See-Through)\n• Pattern: Box Pleated Solid\n• Gender: Women's\n• Color: Beige / Cream\n• Length: 55 Inches\n• Chest Width: 24 Inches (Relaxed Fit)\n• Neck Type: Round Neck\n• Stitching: Professional Ready to Wear\n• Package Includes: 1 x Box Pleated Maxi Abaya\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 3000,
    "sale_price": null,
    "cost_price": 2000,
    "stock_quantity": 40,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-abayas",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 162,
    "seo_title": "Women Georgette Box Pleat Maxi Abaya with Buckle",
    "seo_description": "Elegant beige georgette maxi abaya with box pleats and fancy buckle. Non-see-through fabric ideal for Umrah and daily wear. Order with COD.",
    "has_sizes": true,
    "available_sizes": [
      "Small",
      "Medium",
      "Large",
      "X-Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "S",
          "chest": "22",
          "length": "54"
        },
        {
          "size": "M",
          "chest": "24",
          "length": "55"
        },
        {
          "size": "L",
          "chest": "26",
          "length": "56"
        },
        {
          "size": "XL",
          "chest": "28",
          "length": "56"
        }
      ]
    },
    "images": [
      {
        "id": "img-17-1",
        "image_url": "/products/georgette-plain-maxi-abaya-beige-1.webp",
        "alt_text": "Women georgette box pleat maxi abaya in beige with fancy buckle front",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-17-2",
        "image_url": "/products/georgette-plain-maxi-abaya-beige-2.webp",
        "alt_text": "Women beige georgette maxi abaya plate and fabric closeup 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-17-3",
        "image_url": "/products/georgette-plain-maxi-abaya-beige-3.webp",
        "alt_text": "Women beige georgette maxi abaya plate and fabric closeup 3",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-17-1",
        "product_id": "prod-17-georgette-plain-maxi-abaya-beige",
        "sku": "CCC-ABY-BGE-S",
        "variant_name": "Small",
        "price": 3000,
        "stock_quantity": 10,
        "attributes": {
          "size": "Small",
          "color": "Beige"
        },
        "is_active": true
      },
      {
        "id": "var-17-2",
        "product_id": "prod-17-georgette-plain-maxi-abaya-beige",
        "sku": "CCC-ABY-BGE-M",
        "variant_name": "Medium",
        "price": 3000,
        "stock_quantity": 15,
        "attributes": {
          "size": "Medium",
          "color": "Beige"
        },
        "is_active": true
      },
      {
        "id": "var-17-3",
        "product_id": "prod-17-georgette-plain-maxi-abaya-beige",
        "sku": "CCC-ABY-BGE-L",
        "variant_name": "Large",
        "price": 3000,
        "stock_quantity": 10,
        "attributes": {
          "size": "Large",
          "color": "Beige"
        },
        "is_active": true
      },
      {
        "id": "var-17-4",
        "product_id": "prod-17-georgette-plain-maxi-abaya-beige",
        "sku": "CCC-ABY-BGE-XL",
        "variant_name": "X-Large",
        "price": 3000,
        "stock_quantity": 5,
        "attributes": {
          "size": "X-Large",
          "color": "Beige"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8999999999999995,
    "review_count": 60
  },
  {
    "id": "prod-18-men-rexine-sandals-mustard",
    "name": "Men Rexine Semi-Formal Cushioned Sandals Mustard",
    "slug": "men-rexine-semi-formal-sandals-mustard",
    "sku": "CCC-SND-MST",
    "short_description": "Step out in refined traditional poise with these men's mustard semi-formal sandals. Handcrafted from durable rexine with an ergonomic cushioned insole, they effortlessly elevate shalwar kameez and casual attire.",
    "full_description": "Complete your traditional and smart-casual wardrobe with our Men's Rexine Semi-Formal Sandals in a striking mustard tan hue. Designed for the modern Pakistani gentleman who demands both artisanal flair and ergonomic walking ease, these sandals are built from resilient, weather-resistant rexine leather.\n\nThe upper features a wide, protective cross-band profile with precision edge stitching that prevents rubbing against the skin. Beneath your feet, a multi-layer cushioned footbed absorbs floor shock, ensuring you remain comfortable during long Eid prayers, wedding celebrations, or daily office hours. The slip-resistant grooved sole provides steadfast footing on marble and tile floors. Available in sizes 39 through 44 with an accurate sizing chart, these sandals are an effortless choice for timeless ethnic style.\n\nKEY FEATURES & HIGHLIGHTS:\n• Supple and durable rexine upper with reinforced border stitching\n• Multi-density cushioned footbed engineered for all-day comfort\n• Rich mustard tan colorway complements eastern and casual pants\n• Grooved rubberized outsole ensures dependable slip-resistant traction\n• Slip-on open-back design allows quick and effortless wear\n• Available in standard men's sizes from 39 to 44\n\nSPECIFICATIONS & DETAILS:\n• Gender: Men's\n• Material: High-Grade Synthetic Rexine\n• Pattern: Plain Semi-Formal\n• Color: Mustard Tan\n• Available Sizes: 39, 40, 41, 42, 43, 44\n• Sole Type: Anti-Slip Textured Rubber Sole\n• Package Includes: 1 x Pair Men's Sandals\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2300,
    "sale_price": null,
    "cost_price": 1500,
    "stock_quantity": 45,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-men-footwear",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 169,
    "seo_title": "Men Rexine Semi-Formal Cushioned Sandals Mustard",
    "seo_description": "Buy men's mustard semi-formal rexine sandals in Pakistan. Ergonomic cushioned sole in sizes 39 to 44. Order online with cash on delivery.",
    "has_sizes": true,
    "available_sizes": [
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "size_chart": {
      "shoes": [
        {
          "size": "39",
          "lengthCm": "25.5"
        },
        {
          "size": "40",
          "lengthCm": "26.0"
        },
        {
          "size": "41",
          "lengthCm": "26.5"
        },
        {
          "size": "42",
          "lengthCm": "27.0"
        },
        {
          "size": "43",
          "lengthCm": "27.5"
        },
        {
          "size": "44",
          "lengthCm": "28.0"
        }
      ]
    },
    "images": [
      {
        "id": "img-18-1",
        "image_url": "/products/men-rexine-sandals-mustard-1.webp",
        "alt_text": "Men rexine semi-formal cushioned sandals in mustard front angle",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-18-2",
        "image_url": "/products/men-rexine-sandals-mustard-2.webp",
        "alt_text": "Men mustard rexine sandals sole and buckle detail 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-18-3",
        "image_url": "/products/men-rexine-sandals-mustard-3.webp",
        "alt_text": "Men mustard rexine sandals sole and buckle detail 3",
        "sort_order": 3,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-18-1",
        "product_id": "prod-18-men-rexine-sandals-mustard",
        "sku": "CCC-SND-MST-39",
        "variant_name": "Size 39",
        "price": 2300,
        "stock_quantity": 7,
        "attributes": {
          "size": "39"
        },
        "is_active": true
      },
      {
        "id": "var-18-2",
        "product_id": "prod-18-men-rexine-sandals-mustard",
        "sku": "CCC-SND-MST-40",
        "variant_name": "Size 40",
        "price": 2300,
        "stock_quantity": 8,
        "attributes": {
          "size": "40"
        },
        "is_active": true
      },
      {
        "id": "var-18-3",
        "product_id": "prod-18-men-rexine-sandals-mustard",
        "sku": "CCC-SND-MST-41",
        "variant_name": "Size 41",
        "price": 2300,
        "stock_quantity": 10,
        "attributes": {
          "size": "41"
        },
        "is_active": true
      },
      {
        "id": "var-18-4",
        "product_id": "prod-18-men-rexine-sandals-mustard",
        "sku": "CCC-SND-MST-42",
        "variant_name": "Size 42",
        "price": 2300,
        "stock_quantity": 10,
        "attributes": {
          "size": "42"
        },
        "is_active": true
      },
      {
        "id": "var-18-5",
        "product_id": "prod-18-men-rexine-sandals-mustard",
        "sku": "CCC-SND-MST-43",
        "variant_name": "Size 43",
        "price": 2300,
        "stock_quantity": 6,
        "attributes": {
          "size": "43"
        },
        "is_active": true
      },
      {
        "id": "var-18-6",
        "product_id": "prod-18-men-rexine-sandals-mustard",
        "sku": "CCC-SND-MST-44",
        "variant_name": "Size 44",
        "price": 2300,
        "stock_quantity": 4,
        "attributes": {
          "size": "44"
        },
        "is_active": true
      }
    ],
    "average_rating": 5,
    "review_count": 63
  },
  {
    "id": "prod-19-women-slim-classy-dial-watch",
    "name": "Women Slim Classy Dial Bracelet Watch with Date",
    "slug": "women-slim-classy-dial-bracelet-watch",
    "sku": "CCC-WCH-SLM",
    "short_description": "Adorn your wrist with timeless feminine sophistication with this Women's Slim Classy Dial Bracelet Watch. Featuring an integrated date calendar and textured stainless steel bracelet, it is available in radiant Golden and polished Silver.",
    "full_description": "Grace your wrist with understated luxury with our Women's Slim Classy Dial Bracelet Watch. Thoughtfully styled with a feminine silhouette, this analog timepiece blends a radiant sunburst dial with an integrated date window that updates smoothly throughout the month.\n\nThe watch is secured by a textured stainless steel link bracelet with a secure fold-over clasp, engineered to sit comfortably flush against the wrist. The precision quartz movement delivers reliable, maintenance-free timekeeping for all your daily commitments. Whether paired with formal eastern festive silk suits or modern western tailoring, this watch provides that effortless gleam of luxury at an affordable price. Available in radiant Golden and gleaming Silver finishes with nationwide cash on delivery.\n\nKEY FEATURES & HIGHLIGHTS:\n• Slim and classy dial designed for a graceful feminine aesthetic\n• Integrated date display calendar window positioned at 3 o'clock\n• Textured stainless steel bracelet link strap with secure clasp\n• Accurate analog quartz movement ensuring reliable timekeeping\n• Available in two lustrous finishes: Radiant Golden and Polished Silver\n• Water-resistant splashproof construction suited for daily wear\n\nSPECIFICATIONS & DETAILS:\n• Target Gender: Women's\n• Case Material: Stainless Steel\n• Strap Pattern: Textured Bracelet Link\n• Display Type: 12-Hour Analog with Date Window\n• Movement: Precision Quartz\n• Available Colors: Golden, Silver\n• Package Includes: 1 x Analogue Bracelet Watch\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 1200,
    "sale_price": null,
    "cost_price": 750,
    "stock_quantity": 50,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-watches",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 176,
    "seo_title": "Women Slim Classy Dial Bracelet Watch with Date",
    "seo_description": "Elevate your wristwear with our women's slim and classy dial bracelet watch. Features date function & stainless steel strap in Golden and Silver. COD.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-19-1",
        "image_url": "/products/women-slim-classy-dial-watch-1.webp",
        "alt_text": "Women slim classy dial bracelet watch in golden finish",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-19-2",
        "image_url": "/products/women-slim-classy-dial-watch-2.webp",
        "alt_text": "Women slim classy dial watch in polished silver finish",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-19-3",
        "image_url": "/products/women-slim-classy-dial-watch-3.webp",
        "alt_text": "Women classy watch dial and strap angle 3",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-19-4",
        "image_url": "/products/women-slim-classy-dial-watch-4.webp",
        "alt_text": "Women classy watch dial and strap angle 4",
        "sort_order": 4,
        "is_primary": false
      },
      {
        "id": "img-19-5",
        "image_url": "/products/women-slim-classy-dial-watch-5.webp",
        "alt_text": "Women classy watch dial and strap angle 5",
        "sort_order": 5,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-19-1",
        "product_id": "prod-19-women-slim-classy-dial-watch",
        "sku": "CCC-WCH-SLM-GLD",
        "variant_name": "Golden",
        "price": 1200,
        "stock_quantity": 25,
        "attributes": {
          "color": "Golden"
        },
        "is_active": true
      },
      {
        "id": "var-19-2",
        "product_id": "prod-19-women-slim-classy-dial-watch",
        "sku": "CCC-WCH-SLM-SLV",
        "variant_name": "Silver",
        "price": 1200,
        "stock_quantity": 25,
        "attributes": {
          "color": "Silver"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 66
  },
  {
    "id": "prod-20-flared-georgette-abaya-puff-sleeves",
    "name": "Flared Georgette Abaya with Puff Sleeves & Dori Belt",
    "slug": "flared-georgette-abaya-puff-sleeves-dori-belt",
    "sku": "CCC-ABY-FLR",
    "short_description": "Make a statement in modern modest grace with this flared georgette abaya featuring dramatic puff sleeves and an adjustable dori belt. Complete with a coordinated matching stoller, it is available in Brown, Black, Purple, and Green.",
    "full_description": "Celebrate modesty with contemporary haute elegance in our Flared Georgette Abaya with Puff Sleeves and Dori Belt. Cut from premium breathable georgette with an expansive flared umbrella sweep, this dress-style abaya flows effortlessly with every step while guaranteeing full opaque coverage.\n\nThe design features gathered elasticated puff sleeves that lend a youthful romantic aesthetic, alongside a smart tailored collar and a matching corded dori belt that lets you cinch or loosen the waist according to your preference. Each abaya comes with a matching georgette stoller (hijab) for a fully coordinated modest look. Available in four rich colors—Earth Brown, Classic Black, Royal Purple, and Forest Green—across standard sizes Small through X-Large. Perfect for festive celebrations, university wear, or special evening gatherings.\n\nKEY FEATURES & HIGHLIGHTS:\n• Breathable heavyweight georgette fabric ensuring total non-see-through coverage\n• Graceful expansive flared umbrella hemline with generous movement\n• Fashion-forward gathered puff sleeves with elasticated wrists\n• Adjustable dori cord belt allows customized waist cinching\n• Includes a matching coordinated georgette stoller / hijab scarf\n• Available in 4 curated colors: Earth Brown, Black, Purple, and Green\n\nSPECIFICATIONS & DETAILS:\n• Material: Premium Opaque Georgette\n• Pattern: Plain Flared with Puff Sleeves\n• Gender: Women's / Girls'\n• Available Colors: Brown, Black, Purple, Green\n• Length: 54 Inches\n• Neck Type: Tailored Collar with Front Placket\n• Belt: Adjustable Matching Dori Belt\n• Accessories: Matching Stoller / Hijab Included\n• Package Includes: 1 x Flared Maxi Abaya, 1 x Matching Stoller\n\nNote: There might be an error of 1-3 cm due to manual measurement, and slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 4000,
    "sale_price": null,
    "cost_price": 2600,
    "stock_quantity": 48,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-abayas",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": true,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 183,
    "seo_title": "Flared Georgette Abaya with Puff Sleeves & Dori Belt",
    "seo_description": "Shop elegant flared georgette abaya with puff sleeves & dori belt. Includes matching stoller. Available in Brown, Black, Purple, Green with COD.",
    "has_sizes": true,
    "available_sizes": [
      "Small",
      "Medium",
      "Large",
      "X-Large"
    ],
    "size_chart": {
      "shirt": [
        {
          "size": "S",
          "chest": "21",
          "length": "52"
        },
        {
          "size": "M",
          "chest": "23",
          "length": "54"
        },
        {
          "size": "L",
          "chest": "25",
          "length": "56"
        },
        {
          "size": "XL",
          "chest": "27",
          "length": "56"
        }
      ]
    },
    "images": [
      {
        "id": "img-20-1",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-1.webp",
        "alt_text": "Flared georgette abaya in earth brown with puff sleeves and dori belt",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-20-2",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-2.webp",
        "alt_text": "Flared georgette abaya angle and detail 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-20-3",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-3.webp",
        "alt_text": "Flared georgette abaya in classic black",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-20-4",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-4.webp",
        "alt_text": "Flared georgette abaya angle and detail 4",
        "sort_order": 4,
        "is_primary": false
      },
      {
        "id": "img-20-5",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-5.webp",
        "alt_text": "Flared georgette abaya in royal purple",
        "sort_order": 5,
        "is_primary": false
      },
      {
        "id": "img-20-6",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-6.webp",
        "alt_text": "Flared georgette abaya in forest green",
        "sort_order": 6,
        "is_primary": false
      },
      {
        "id": "img-20-7",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-7.webp",
        "alt_text": "Flared georgette abaya angle and detail 7",
        "sort_order": 7,
        "is_primary": false
      },
      {
        "id": "img-20-8",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-8.webp",
        "alt_text": "Flared georgette abaya angle and detail 8",
        "sort_order": 8,
        "is_primary": false
      },
      {
        "id": "img-20-9",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-9.webp",
        "alt_text": "Flared georgette abaya angle and detail 9",
        "sort_order": 9,
        "is_primary": false
      },
      {
        "id": "img-20-10",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-10.webp",
        "alt_text": "Flared georgette abaya angle and detail 10",
        "sort_order": 10,
        "is_primary": false
      },
      {
        "id": "img-20-11",
        "image_url": "/products/flared-georgette-abaya-puff-sleeves-11.webp",
        "alt_text": "Flared georgette abaya angle and detail 11",
        "sort_order": 11,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-20-1",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BRN-S",
        "variant_name": "Brown / S",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Brown",
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-20-2",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BRN-M",
        "variant_name": "Brown / M",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Brown",
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-20-3",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BRN-L",
        "variant_name": "Brown / L",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Brown",
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-20-4",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BRN-XL",
        "variant_name": "Brown / XL",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Brown",
          "size": "X-Large"
        },
        "is_active": true
      },
      {
        "id": "var-20-5",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BLK-S",
        "variant_name": "Black / S",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Black",
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-20-6",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BLK-M",
        "variant_name": "Black / M",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Black",
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-20-7",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BLK-L",
        "variant_name": "Black / L",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Black",
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-20-8",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-BLK-XL",
        "variant_name": "Black / XL",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Black",
          "size": "X-Large"
        },
        "is_active": true
      },
      {
        "id": "var-20-9",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-PRP-S",
        "variant_name": "Purple / S",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Purple",
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-20-10",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-PRP-M",
        "variant_name": "Purple / M",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Purple",
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-20-11",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-PRP-L",
        "variant_name": "Purple / L",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Purple",
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-20-12",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-PRP-XL",
        "variant_name": "Purple / XL",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Purple",
          "size": "X-Large"
        },
        "is_active": true
      },
      {
        "id": "var-20-13",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-GRN-S",
        "variant_name": "Green / S",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Green",
          "size": "Small"
        },
        "is_active": true
      },
      {
        "id": "var-20-14",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-GRN-M",
        "variant_name": "Green / M",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Green",
          "size": "Medium"
        },
        "is_active": true
      },
      {
        "id": "var-20-15",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-GRN-L",
        "variant_name": "Green / L",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Green",
          "size": "Large"
        },
        "is_active": true
      },
      {
        "id": "var-20-16",
        "product_id": "prod-20-flared-georgette-abaya-puff-sleeves",
        "sku": "CCC-ABY-FLR-GRN-XL",
        "variant_name": "Green / XL",
        "price": 4000,
        "stock_quantity": 3,
        "attributes": {
          "color": "Green",
          "size": "X-Large"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8999999999999995,
    "review_count": 69
  },
  {
    "id": "prod-21-women-black-fashion-handbag-pom-pom",
    "name": "Women Black Fashion Handbag with Pom Pom Charm",
    "slug": "women-black-fashion-handbag-pom-pom-charm",
    "sku": "CCC-BAG-BLK-POM",
    "short_description": "Make an eye-catching statement with this women's black fashion handbag accented with playful pom-pom charms. Fitted with dual top handles, gold-tone hardware, and a detachable shoulder strap, it transitions effortlessly from office to weddings.",
    "full_description": "Add playful sophistication to your ensemble with our Women's Black Fashion Handbag adorned with a decorative pom-pom charm. Crafted from high-grade synthetic leather designed to withstand daily wear without scuffing, this versatile purse features a sleek jet-black body highlighted by lustrous gold-tone metal hardware.\n\nThe spacious zippered main compartment holds your smartphone, makeup kit, wallet, and perfume with room to spare, while inner organizer pockets keep smaller essentials tidy. Carry it gracefully by its sturdy rounded top handles or attach the adjustable crossbody shoulder strap for hands-free commuting convenience. Ideal for office meetings, festive wedding receptions, or weekend dinners across Pakistan, this handbag delivers timeless utility with a cheerful splash of charm.\n\nKEY FEATURES & HIGHLIGHTS:\n• Durable, wear-resistant synthetic leather with smooth luxury texture\n• Playful colorful pom-pom tassel charm adds a trendy designer touch\n• Reinforced top handles and detachable, adjustable crossbody strap\n• Lustrous gold-tone zipper pulls, rivets, and metal strap loops\n• Roomy zippered main compartment with interior organization pockets\n• Versatile black aesthetic perfect for work, weddings, and casual outings\n\nSPECIFICATIONS & DETAILS:\n• Gender: Women's\n• Type: Fashion Handbag / Shoulder Bag\n• Material: Premium Synthetic Leather\n• Color: Classic Jet Black\n• Hardware: Gold-Tone Metal\n• Charm: Decorative Multicolor Pom-Pom Keychain Charm\n• Strap: Adjustable & Detachable Crossbody Strap\n• Condition: Brand New with Dust Bag\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 3000,
    "sale_price": null,
    "cost_price": 1900,
    "stock_quantity": 25,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-women-handbags",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": false,
    "is_best_deal": false,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 190,
    "seo_title": "Women Black Fashion Handbag with Pom Pom Charm",
    "seo_description": "Discover our chic women's black fashion handbag with colorful pom-pom charm and gold-tone hardware. Includes shoulder strap. Cash on delivery nationwide.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-21-1",
        "image_url": "/products/women-black-fashion-handbag-pom-pom-1.webp",
        "alt_text": "Women black fashion handbag with colorful pom-pom charm front",
        "sort_order": 1,
        "is_primary": true
      },
      {
        "id": "img-21-2",
        "image_url": "/products/women-black-fashion-handbag-pom-pom-2.webp",
        "alt_text": "Women black handbag strap and hardware detail 2",
        "sort_order": 2,
        "is_primary": false
      },
      {
        "id": "img-21-3",
        "image_url": "/products/women-black-fashion-handbag-pom-pom-3.webp",
        "alt_text": "Women black handbag strap and hardware detail 3",
        "sort_order": 3,
        "is_primary": false
      },
      {
        "id": "img-21-4",
        "image_url": "/products/women-black-fashion-handbag-pom-pom-4.webp",
        "alt_text": "Women black handbag strap and hardware detail 4",
        "sort_order": 4,
        "is_primary": false
      },
      {
        "id": "img-21-5",
        "image_url": "/products/women-black-fashion-handbag-pom-pom-5.webp",
        "alt_text": "Women black handbag strap and hardware detail 5",
        "sort_order": 5,
        "is_primary": false
      },
      {
        "id": "img-21-6",
        "image_url": "/products/women-black-fashion-handbag-pom-pom-6.webp",
        "alt_text": "Women black handbag strap and hardware detail 6",
        "sort_order": 6,
        "is_primary": false
      }
    ],
    "variants": [
      {
        "id": "var-21-1",
        "product_id": "prod-21-women-black-fashion-handbag-pom-pom",
        "sku": "CCC-BAG-BLK-POM",
        "variant_name": "Black with Pom Pom",
        "price": 3000,
        "stock_quantity": 25,
        "attributes": {
          "color": "Black"
        },
        "is_active": true
      }
    ],
    "average_rating": 5,
    "review_count": 72
  },
  {
    "id": "prod-22-9-in-1-makeup-deal-bundle",
    "name": "9 in 1 Complete Makeup Deal Beauty Cosmetics Bundle",
    "slug": "9-in-1-complete-makeup-deal-bundle",
    "sku": "CCC-MKP-9IN1",
    "short_description": "Achieve a flawless salon-like look at home with our 9-in-1 Complete Makeup Deal. This all-inclusive beauty collection bundles 9 daily vanity essentials including a TV paint stick, makeup fixer, smoothing primer, and foundations.",
    "full_description": "Transform your beauty vanity with the ultimate all-in-one 9-in-1 Makeup Deal, assembled to help you achieve seamless everyday and bridal party looks without purchasing separate products. Each item in this comprehensive cosmetic bundle has been carefully selected for smooth blendability, buildable coverage, and long-lasting wear.\n\nStart your routine by prepping the canvas with the smoothing facial primer, followed by full-coverage correction using the TV paint stick, liquid foundation, and creamy concealer. Set your base flawlessly with the translucent loose setting powder, and lock everything in place all day using the weightless makeup setting spray mist. Finish with gorgeous color on your lips using the velvety lipstick and lustrous lip gloss. Perfect for college students, working professionals, and festive wedding makeup. Order this complete 9-piece kit with nationwide cash on delivery.\n\nKEY FEATURES & HIGHLIGHTS:\n• All-inclusive 9-piece cosmetic beauty kit for complete facial makeup\n• Full-coverage TV paint stick and creamy concealer for flawless base\n• Smoothing face primer minimizes pores and creates a silky canvas\n• Translucent loose powder sets makeup for long-lasting oil control\n• Hydrating makeup setting fixer spray prevents melting and fading\n• Velvety lipstick and lustrous high-shine lip gloss for stunning lips\n\nSPECIFICATIONS & DETAILS:\n• Bundle Type: 9-in-1 Complete Vanity Cosmetic Deal\n• Formula Form: Cream, Liquid, Loose Powder\n• Skin Type: Suitable for All Skin Types\n• Finish: Semi-Matte / Natural Velvet\n• Pieces in Package: 9 Essential Cosmetic Items\n• Package Includes: 1 x Fixer, 1 x TV Stick, 1 x Concealer, 1 x Gloss, 1 x Primer, 1 x Foundation, 1 x Setting Powder, 1 x Lipstick, 1 x Liquid Foundation\n\nWHAT'S IN THE BOX:\n• 1 x Makeup Setting Fixer Spray\n• 1 x TV Paint Stick (Full Base Coverage)\n• 1 x Creamy Concealer Wand\n• 1 x Lustrous Lip Gloss\n• 1 x Pore-Smoothing Makeup Primer\n• 1 x Velvet Matte Foundation\n• 1 x Translucent Setting Loose Powder\n• 1 x Rich Pigment Matte Lipstick\n• 1 x Hydrating Liquid Foundation\n\nNote: Slight color differences may occur as a result of varying lighting and monitor effects.",
    "regular_price": 2000,
    "sale_price": null,
    "cost_price": 1250,
    "stock_quantity": 50,
    "stock_status": "in_stock",
    "low_stock_threshold": 5,
    "category_id": "cat-makeup",
    "brand_id": "brand-1",
    "weight": 0.5,
    "dimensions": null,
    "is_featured": true,
    "is_best_deal": true,
    "is_new_arrival": true,
    "is_popular": true,
    "is_published": true,
    "view_count": 197,
    "seo_title": "9 in 1 Complete Makeup Deal Beauty Bundle Set",
    "seo_description": "Get the all-in-one 9 in 1 makeup deal in Pakistan. Includes TV paint stick, primers, loose powder, lipstick & foundations. Buy with cash on delivery.",
    "has_sizes": false,
    "available_sizes": null,
    "size_chart": null,
    "images": [
      {
        "id": "img-22-1",
        "image_url": "/products/9-in-1-complete-makeup-deal-bundle-1.webp",
        "alt_text": "9 in 1 complete makeup deal vanity bundle set showcasing all 9 cosmetic items",
        "sort_order": 1,
        "is_primary": true
      }
    ],
    "variants": [
      {
        "id": "var-22-1",
        "product_id": "prod-22-9-in-1-makeup-deal-bundle",
        "sku": "CCC-MKP-9IN1",
        "variant_name": "9-in-1 Complete Set",
        "price": 2000,
        "stock_quantity": 50,
        "attributes": {
          "bundle": "9-in-1 Complete Deal"
        },
        "is_active": true
      }
    ],
    "average_rating": 4.8,
    "review_count": 75
  }
];
