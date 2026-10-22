'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Loader2,
  Tag,
  ChevronRight,
  MessageCircle,
  Flame,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useCustomer } from '@/components/providers/CustomerProvider';
import { ExternalImage } from '@/components/media/ExternalImage';

interface NavCategory {
  name: string;
  slug: string;
  href: string;
  badge?: string;
  badgeType?: 'winter' | 'new' | 'hot';
  spotlight?: {
    title: string;
    description: string;
    image: string;
    href: string;
    tag: string;
  };
  children?: {
    name: string;
    slug: string;
    href: string;
    subtitle: string;
    image: string;
    tag: string;
  }[];
}

const NAVIGATION_ITEMS: NavCategory[] = [
  {
    name: 'Men',
    slug: 'men',
    href: '/category/men',
    spotlight: {
      title: "Men's Winter Edition 2026",
      description: "Breathable 4m cotton sotton cuts, thermal fleece tracksuits & cushioned sandals.",
      image: '/products/men-wash-and-wear-suit-brown-1.webp',
      href: '/category/men',
      tag: "Editor's Pick",
    },
    children: [
      {
        name: 'Unstitched Suits',
        slug: 'men-unstitched-suits',
        href: '/category/men-unstitched-suits',
        subtitle: 'Cotton Sotton & Wash & Wear 4m fabric cuts',
        image: '/products/men-grey-cotton-sotton-suit-1.webp',
        tag: 'Suits',
      },
      {
        name: 'Winter Wear',
        slug: 'men-winter-wear',
        href: '/category/men-winter-wear',
        subtitle: 'Thermal fleece tracksuits, colorblock hoodies & jackets',
        image: '/products/men-fleece-printed-track-suit-grey-1.webp',
        tag: 'Warm',
      },
      {
        name: 'Footwear',
        slug: 'men-footwear',
        href: '/category/men-footwear',
        subtitle: 'Rexine semi-formal cushioned sandals (Sizes 39-44)',
        image: '/products/men-rexine-sandals-mustard-1.webp',
        tag: 'Shoes',
      },
    ],
  },
  {
    name: 'Women',
    slug: 'women',
    href: '/category/women',
    spotlight: {
      title: "Women's Festive & Pret Edit",
      description: "Premium katan silk 3-piece suits, flared abayas with dori belts & cozy nightwear.",
      image: '/products/beige-katan-silk-3piece-suit-1.webp',
      href: '/category/women',
      tag: 'Trending Drops',
    },
    children: [
      {
        name: 'Unstitched Suits',
        slug: 'women-unstitched-suits',
        href: '/category/women-unstitched-suits',
        subtitle: 'Beige katan silk 3-piece suites with net dupatta',
        image: '/products/beige-katan-silk-3piece-suit-1.webp',
        tag: 'Silk',
      },
      {
        name: 'Night Suits & Pajamas',
        slug: 'women-night-suits-pajamas',
        href: '/category/women-night-suits-pajamas',
        subtitle: 'Printed soft jersey loungewear & Kulomi fleece sets',
        image: '/products/grey-printed-women-night-suit-1.webp',
        tag: 'Sleep',
      },
      {
        name: 'Abayas',
        slug: 'women-abayas',
        href: '/category/women-abayas',
        subtitle: 'Flared georgette maxi abayas with fancy buckle & stoller',
        image: '/products/flared-georgette-abaya-puff-sleeves-1.webp',
        tag: 'Modest',
      },
      {
        name: 'Handbags',
        slug: 'women-handbags',
        href: '/category/women-handbags',
        subtitle: 'Brown leather top handle & black pom pom charm bags',
        image: '/products/women-brown-leather-handbag-8x10-1.webp',
        tag: 'Bags',
      },
      {
        name: 'Footwear',
        slug: 'women-footwear',
        href: '/category/women-footwear',
        subtitle: 'Rexine slip-on sneakers & pumps (Sizes 36-40)',
        image: '/products/women-black-slipon-sneakers-1.webp',
        tag: 'Shoes',
      },
    ],
  },
  {
    name: 'Fragrances',
    slug: 'fragrances',
    href: '/category/fragrances',
    spotlight: {
      title: 'Signature Long-Lasting Fragrances',
      description: 'Rich oriental musks, citrus top notes, and woody amber bases for distinguished presence.',
      image: '/products/j-janan-musk-edp-perfume-men-1.webp',
      href: '/category/fragrances',
      tag: 'Eau De Parfum',
    },
    children: [
      {
        name: "Men's Perfumes",
        slug: 'mens-perfumes',
        href: '/category/mens-perfumes',
        subtitle: 'J. Janan Musk EDP & Citrus Floral Musk EDT 100ml',
        image: '/products/men-citrus-floral-musk-edt-100ml-1.webp',
        tag: '100ml EDP',
      },
    ],
  },
  {
    name: 'Beauty & Makeup',
    slug: 'beauty-makeup',
    href: '/category/beauty-makeup',
    spotlight: {
      title: '9-in-1 Complete Glam Vanity Deal',
      description: 'All-in-one beauty bundle with TV paint stick, foundation, primer, fixer & lipsticks.',
      image: '/products/9-in-1-complete-makeup-deal-bundle-1.webp',
      href: '/products/9-in-1-complete-makeup-deal-bundle',
      tag: 'Special Deal',
    },
    children: [
      {
        name: 'Skincare',
        slug: 'skincare',
        href: '/category/skincare',
        subtitle: 'ZK 3-in-1 glow soap, pure rose water & aloe vera gel',
        image: '/products/zk-skincare-glow-bundle-1.webp',
        tag: 'Glow Care',
      },
      {
        name: 'Makeup',
        slug: 'makeup',
        href: '/category/makeup',
        subtitle: '9-in-1 complete vanity cosmetics deal & essentials',
        image: '/products/9-in-1-complete-makeup-deal-bundle-1.webp',
        tag: '9-in-1 Deal',
      },
    ],
  },
  {
    name: 'Watches & Gadgets',
    slug: 'watches-gadgets',
    href: '/category/watches-gadgets',
    spotlight: {
      title: 'Precision Timepieces & Wireless TWS',
      description: 'Slim date function bracelet watches and M04 noise-isolating Bluetooth earbuds.',
      image: '/products/airpods-m04-wireless-earbuds-2.webp',
      href: '/category/watches-gadgets',
      tag: 'Smart Life',
    },
    children: [
      {
        name: 'Watches',
        slug: 'watches',
        href: '/category/watches',
        subtitle: 'Slim classy dial bracelet watches with date function',
        image: '/products/women-slim-classy-dial-watch-1.webp',
        tag: 'Watches',
      },
      {
        name: 'Earbuds & Airpods',
        slug: 'earbuds-airpods',
        href: '/category/earbuds-airpods',
        subtitle: 'Airpods M04 Bluetooth earbuds in black and white',
        image: '/products/airpods-m04-wireless-earbuds-1.webp',
        tag: 'Audio',
      },
    ],
  },
  {
    name: 'Winter Collection',
    slug: 'winter-collection',
    href: '/category/winter-collection',
    badge: '❄ Winter Edit',
    badgeType: 'winter',
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    href: '/category/new-arrivals',
    badge: '✦ New Drops',
    badgeType: 'new',
  },
  {
    name: 'Collections',
    slug: 'all-products',
    href: '/products',
  },
];

const TRENDING_SEARCHES = [
  'Cotton Sotton',
  'Katan Silk',
  'Fleece Tracksuit',
  'Janan Musk',
  'Georgette Abaya',
  'Airpods M04',
  '9 in 1 Makeup',
  'Winter Jacket',
];

interface SearchProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  regular_price: number;
  sale_price?: number | null;
  image: string | null;
  category: string | null;
  category_slug?: string | null;
  stock_status: string;
  is_best_deal: boolean;
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, openCartDrawer } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { customer } = useCustomer();

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({
    men: true,
    women: false,
    fragrances: false,
    'beauty-makeup': false,
    'watches-gadgets': false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDropdown]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchFocused(false);
    setSearchQuery('');
  }, [pathname]);

  // Handle escape key and clicks outside search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setSearchFocused(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Real-time live product search with debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/products/search?q=${encodeURIComponent(searchQuery.trim())}&limit=6`
        );
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.products || []);
          setTotalResults(data.total || 0);
        } else {
          setSearchResults([]);
          setTotalResults(0);
        }
      } catch (err) {
        console.error('Failed to search products:', err);
        setSearchResults([]);
        setTotalResults(0);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setMobileMenuOpen(false);
    }
  };

  const handleMouseEnterItem = (slug: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(slug);
  };

  const handleMouseLeaveItem = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 280);
  };

  const closeDropdownImmediately = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(null);
  };

  const toggleMobileCategory = (slug: string) => {
    setExpandedMobileCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 font-sans ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border-b border-[#e8e4df]' 
        : 'bg-white border-b border-[#eae7e2]'
    }`}>
      {/* ============================================================== */}
      {/* TIER 1: BRAND LOGO + EXPANDED SEARCH BAR + USER ACTION UTILITIES */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4 sm:gap-8">
          
          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-xl bg-[#f7f5f2] hover:bg-[#eae7e2] active:bg-[#e4e0d8] border border-[#eae7e2] flex items-center justify-center text-[#141414] cursor-pointer touch-manipulation transition-colors shadow-2xs"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 text-[#141414]" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link 
              href="/" 
              onMouseEnter={closeDropdownImmediately}
              className="flex items-center group py-1"
            >
              <img
                src="/logo.png"
                alt="CC Carvan"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-102 drop-shadow-xs"
              />
            </Link>
          </div>

          {/* Central Modern Search Pill Input */}
          <div 
            ref={searchContainerRef} 
            onMouseEnter={closeDropdownImmediately}
            className="relative flex-1 max-w-lg hidden md:block"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search cotton suits, winter jackets, fragrances, abayas..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                className={`w-full h-11 pl-11 pr-10 text-xs font-medium rounded-full bg-[#f8f7f5] border transition-all duration-200 outline-none text-[#141414] placeholder-[#8c827a] ${
                  searchFocused 
                    ? 'border-[#b87414] bg-white ring-3 ring-[#b87414]/15 shadow-sm' 
                    : 'border-[#eae7e2] hover:border-[#d4cfc7]'
                }`}
              />
              <Search className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                searchFocused ? 'text-[#b87414]' : 'text-[#8c827a]'
              }`} />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 text-[#8c827a] hover:text-[#141414] absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* LIVE AUTOCOMPLETE SEARCH RESULTS POPUP */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white/98 backdrop-blur-xl rounded-2xl border border-[#eae7e2] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[380px] overflow-y-auto overscroll-contain">
                  
                  {isSearching && (
                    <div className="p-8 text-center space-y-2">
                      <Loader2 className="w-5 h-5 text-[#b87414] animate-spin mx-auto" />
                      <p className="text-xs text-[#6b6b6b] font-medium">Searching catalog...</p>
                    </div>
                  )}

                  {!isSearching && searchQuery.trim() && searchResults.length > 0 && (
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-1.5 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#8c827a] border-b border-[#eae7e2]/60">
                        <span>Matching Creations ({searchResults.length})</span>
                        <span>Instant Results</span>
                      </div>

                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug}`}
                          onClick={() => setSearchFocused(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f7f5f2] transition group border border-transparent hover:border-[#eae7e2]"
                        >
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-[#eae7e2]">
                            <ExternalImage
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="56px"
                              quality={95}
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs text-[#141414] group-hover:text-[#b87414] transition-colors truncate">
                              {product.name}
                            </p>
                            
                            <div className="flex items-center gap-2 mt-0.5">
                              {product.category && (
                                <span className="text-[10px] text-[#8c827a] uppercase tracking-wider font-medium truncate">
                                  {product.category}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-xs text-[#141414]">
                                Rs. {(product.sale_price || product.regular_price).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#b87414] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {!isSearching && searchQuery.trim() && searchResults.length === 0 && (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 text-[#b87414] flex items-center justify-center mx-auto">
                        <Search className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-xs text-[#141414]">
                        No items found for &ldquo;{searchQuery}&rdquo;
                      </h4>
                      <p className="text-[11px] text-[#6b6b6b] max-w-xs mx-auto">
                        Try searching for cotton suits, abaya, perfume, or explore all collections.
                      </p>
                    </div>
                  )}

                  {!isSearching && !searchQuery.trim() && (
                    <div className="p-4 space-y-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c827a] mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#b87414]" />
                          <span>Trending Searches</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {TRENDING_SEARCHES.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                setSearchQuery(tag);
                                searchInputRef.current?.focus();
                              }}
                              className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#f7f5f2] hover:bg-[#eae7e2] text-[#141414] border border-[#eae7e2] transition cursor-pointer"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#eae7e2]">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c827a] mb-2 flex items-center gap-1.5">
                          <Tag className="w-3 h-3 text-[#b87414]" />
                          <span>Quick Categories</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {NAVIGATION_ITEMS.filter((i) => i.slug !== 'home').slice(0, 6).map((cat) => (
                            <Link
                              key={cat.slug}
                              href={cat.href}
                              onClick={() => setSearchFocused(false)}
                              className="p-2 rounded-xl bg-[#faf8f5] hover:bg-[#eae7e2] text-[#141414] font-medium flex items-center justify-between transition"
                            >
                              <span className="truncate">{cat.name}</span>
                              <ArrowRight className="w-3 h-3 text-neutral-400" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {searchQuery.trim() && searchResults.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 px-4 bg-[#faf8f5] hover:bg-[#f2efe9] text-[#b87414] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-t border-[#eae7e2] transition cursor-pointer"
                  >
                    <span>View all {totalResults > searchResults.length ? totalResults : searchResults.length} pieces</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons: WhatsApp VIP + Wishlist + Cart + Account */}
          <div 
            onMouseEnter={closeDropdownImmediately}
            className="flex items-center gap-2 sm:gap-3 shrink-0"
          >
            {/* WhatsApp VIP Concierge Pill Button */}
            <a
              href="https://wa.me/923267727318"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-[11px] font-bold transition-all shadow-2xs group"
              title="Direct Live VIP WhatsApp Concierge Support"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>WhatsApp <span className="font-mono text-emerald-700 font-extrabold">+92 326 7727318</span></span>
            </a>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#141414] hover:bg-[#f7f5f2] border border-[#eae7e2] transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#141414]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#141414] hover:text-[#b87414] hover:bg-[#f7f5f2] border border-[#eae7e2] transition-colors touch-manipulation group"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center px-1 shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button with Counter */}
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative h-10 px-3 sm:px-4 rounded-xl bg-[#141414] hover:bg-[#b87414] text-white flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-sm active:scale-95 touch-manipulation group"
              aria-label="Shopping Bag"
              title="Open Shopping Bag"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-amber-300 group-hover:text-white transition-colors" />
              <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase">Bag</span>
              <span className="min-w-[18px] h-[18px] rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center px-1 shrink-0">
                {mounted ? itemCount : 0}
              </span>
            </button>

            {/* Customer Account Icon */}
            <Link
              href="/account"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-[#141414] hover:bg-[#f7f5f2] border border-[#eae7e2] transition-colors"
              aria-label="My Account"
              title="Customer Account"
            >
              <User className="w-4.5 h-4.5" />
            </Link>

          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* TIER 2: DEDICATED LUXURY CATEGORY NAVIGATION BAR               */}
      {/* ============================================================== */}
      <div 
        className="hidden lg:block border-t border-[#eae7e2] bg-white relative"
        onMouseLeave={handleMouseLeaveItem}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-2 xl:gap-3 h-12 text-[12px] font-bold tracking-[0.1em] uppercase font-sans text-[#141414]">
            {NAVIGATION_ITEMS.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isActive = pathname === item.href || (item.slug !== 'home' && pathname.includes(item.slug));
              const isDropdownOpen = activeDropdown === item.slug;

              // Regular standalone links (Winter Collection, New Arrivals, All Collections)
              if (!hasChildren) {
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    onMouseEnter={closeDropdownImmediately}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap group ${
                      isActive 
                        ? 'bg-[#f6f4f0] text-[#b87414] font-extrabold shadow-2xs' 
                        : 'hover:text-[#b87414] hover:bg-[#faf8f5]'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-extrabold tracking-normal px-2 py-0.5 rounded-full transition-transform group-hover:scale-105 shadow-2xs ${
                        item.badgeType === 'winter'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              // Dropdown Alignment based on menu position across header
              const dropdownAlignmentClass = 
                item.slug === 'men' 
                  ? 'left-0 origin-top-left w-[500px]'
                  : item.slug === 'women'
                  ? 'left-0 origin-top-left w-[560px]'
                  : item.slug === 'fragrances'
                  ? 'left-1/2 -translate-x-1/2 origin-top w-[440px]'
                  : item.slug === 'beauty-makeup'
                  ? 'right-0 xl:left-1/2 xl:-translate-x-1/2 origin-top-right xl:origin-top w-[480px]'
                  : 'right-0 origin-top-right w-[480px]';

              // Parent Categories with Modern Luxury Dropdown Menu
              return (
                <div
                  key={item.slug}
                  className="relative py-2"
                  onMouseEnter={() => handleMouseEnterItem(item.slug)}
                  onMouseLeave={handleMouseLeaveItem}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap group ${
                      isDropdownOpen || isActive 
                        ? 'bg-[#f6f4f0] text-[#b87414] font-extrabold shadow-2xs' 
                        : 'hover:text-[#b87414] hover:bg-[#faf8f5]'
                    }`}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${
                      isDropdownOpen ? 'rotate-180 text-[#b87414]' : 'text-neutral-400 group-hover:text-[#b87414]'
                    }`} />
                  </Link>

                  {/* ======================================================= */}
                  {/* SLEEK, BALANCED LUXURY DROPDOWN CARD                    */}
                  {/* ======================================================= */}
                  {isDropdownOpen && (
                    <div
                      className={`absolute top-full mt-1.5 ${dropdownAlignmentClass} max-w-[calc(100vw-2rem)] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-[#eae7e2] p-4 sm:p-5 z-50 animate-in fade-in zoom-in-98 duration-200`}
                      onMouseEnter={() => handleMouseEnterItem(item.slug)}
                      onMouseLeave={handleMouseLeaveItem}
                    >
                      {/* Invisible Hover Bridge to ensure zero cursor disconnect */}
                      <div className="absolute -top-3.5 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                      <div className="flex gap-4 sm:gap-5">
                        
                        {/* Left / Main Section: Subcategories List */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#eae7e2]">
                              <span className="text-[10.5px] font-black uppercase tracking-[0.16em] text-[#141414]">
                                {item.name} Categories
                              </span>
                              <Link
                                href={item.href}
                                onClick={closeDropdownImmediately}
                                className="text-[11px] font-bold text-[#b87414] hover:text-[#965b0b] flex items-center gap-1 transition-colors normal-case tracking-normal"
                              >
                                <span>Explore All</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>

                            <div className="space-y-1">
                              {item.children?.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={child.href}
                                  onClick={closeDropdownImmediately}
                                  className="group flex items-center gap-3 p-2 rounded-xl hover:bg-[#faf8f5] border border-transparent hover:border-[#eae7e2] transition-all duration-200"
                                >
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-[#eae7e2]">
                                    <ExternalImage
                                      src={child.image}
                                      alt={child.name}
                                      fill
                                      sizes="40px"
                                      className="object-cover group-hover:scale-108 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <h4 className="font-bold text-xs text-[#141414] group-hover:text-[#b87414] transition-colors truncate">
                                        {child.name}
                                      </h4>
                                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-[#f6f4f0] group-hover:bg-amber-100/60 text-[#8c827a] group-hover:text-[#b87414] font-bold shrink-0 transition-colors">
                                        {child.tag}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-[#8c827a] truncate mt-0.5">
                                      {child.subtitle}
                                    </p>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#b87414] group-hover:translate-x-0.5 transition-all shrink-0" />
                                </Link>
                              ))}

                              {/* Special fragrance scent notes callout to balance the card */}
                              {item.slug === 'fragrances' && (
                                <div className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-transparent border border-amber-500/20 text-[10px] text-[#8c827a] space-y-1">
                                  <span className="font-bold text-[#b87414] uppercase tracking-wider block">
                                    ✦ Scent Profiles
                                  </span>
                                  <p className="line-clamp-2">
                                    Rich Oriental Musks, Citrus Bergamot Top Notes &amp; Long-Lasting Warm Woody Amber.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Reassurance strip at bottom */}
                          <div className="mt-3 pt-2.5 border-t border-[#eae7e2]/70 flex items-center justify-between text-[10px] text-[#8c827a] font-medium">
                            <span className="flex items-center gap-1">
                              <Truck className="w-3 h-3 text-[#b87414]" />
                              <span>Flat Rs. 100 Express Delivery</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>Cash on Delivery</span>
                            </span>
                          </div>
                        </div>

                        {/* Right: Editorial Spotlight Feature Card */}
                        {item.spotlight && (
                          <div className="w-[170px] sm:w-[190px] shrink-0">
                            <Link
                              href={item.spotlight.href}
                              onClick={closeDropdownImmediately}
                              className="group/spotlight relative flex flex-col justify-end w-full h-full min-h-[220px] rounded-xl overflow-hidden border border-[#eae7e2] shadow-2xs hover:shadow-md transition-all p-3 text-white"
                            >
                              <ExternalImage
                                src={item.spotlight.image}
                                alt={item.spotlight.title}
                                fill
                                sizes="190px"
                                className="object-cover group-hover/spotlight:scale-106 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                              
                              <div className="relative z-10 space-y-1">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-2xs">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {item.spotlight.tag}
                                </span>
                                <h5 className="font-bold text-[11.5px] tracking-tight line-clamp-2 leading-tight group-hover/spotlight:text-amber-300 transition-colors">
                                  {item.spotlight.title}
                                </h5>
                                <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-amber-300 group-hover/spotlight:underline">
                                  <span>Shop Now</span>
                                  <ArrowRight className="w-3 h-3 group-hover/spotlight:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </Link>
                          </div>
                        )}

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODERN LUXURY MOBILE DRAWER WITH ACCORDION SUB-MENUS           */}
      {/* ============================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative ml-auto w-full max-w-sm bg-[#faf8f5] h-full shadow-2xl border-l border-[#eae7e2] flex flex-col justify-between z-10 overflow-y-auto overscroll-contain animate-in slide-in-from-right duration-300"
          >
            <div className="p-5 sm:p-6 space-y-5">
              
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-[#eae7e2]">
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center group"
                >
                  <img
                    src="/logo.png"
                    alt="CC Carvan"
                    className="h-12 w-auto object-contain drop-shadow-xs"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#eae7e2] active:bg-[#e4e0d8] text-[#6b6b6b] hover:text-[#141414] flex items-center justify-center cursor-pointer shadow-sm border border-[#eae7e2] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Real-Time Live Search */}
              <div className="space-y-2">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search suits, abayas, perfumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 text-xs bg-white border border-[#eae7e2] focus:border-[#b87414] focus:ring-1 focus:ring-[#b87414] rounded-xl text-[#141414] placeholder-[#8c827a] shadow-sm outline-none"
                  />
                  <Search className="w-4 h-4 text-[#b87414] absolute left-3 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-[#8c827a] hover:text-[#141414] absolute right-2.5 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </form>

                {/* Mobile Search Results Preview */}
                {searchQuery.trim() && (
                  <div className="bg-white rounded-xl border border-[#eae7e2] shadow-md max-h-60 overflow-y-auto p-2 divide-y divide-[#eae7e2]/60">
                    {isSearching ? (
                      <div className="p-4 text-center">
                        <Loader2 className="w-5 h-5 text-[#b87414] animate-spin mx-auto" />
                        <span className="text-[11px] text-[#6b6b6b] mt-1 block">Searching...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.slice(0, 4).map((item) => (
                          <Link
                            key={item.id}
                            href={`/products/${item.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-1 hover:bg-[#faf8f5] transition"
                          >
                            <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-[#eae7e2]">
                              <ExternalImage src={item.image} alt={item.name} fill sizes="48px" quality={95} className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[#141414] truncate">{item.name}</p>
                              <span className="text-[11px] font-bold text-[#b87414]">
                                Rs. {(item.sale_price || item.regular_price).toLocaleString()}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          className="w-full pt-2 text-center text-[11px] font-bold uppercase text-[#b87414] flex items-center justify-center gap-1"
                        >
                          <span>View all results</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="p-3 text-center text-xs text-[#6b6b6b]">
                        No matching pieces found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Accordion Navigation List */}
              <nav className="space-y-4 font-sans">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c827a] mb-2 px-1">
                    Store Categories
                  </div>
                  
                  <div className="space-y-2">
                    {/* Home Link */}
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#eae7e2] text-[#141414] hover:border-[#b87414]/40 hover:shadow-xs text-xs font-bold transition-all"
                    >
                      <span>Home</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#b87414]" />
                    </Link>

                    {/* Accordion Categories */}
                    {NAVIGATION_ITEMS.map((cat) => {
                      const hasChildren = Boolean(cat.children && cat.children.length > 0);
                      const isExpanded = expandedMobileCategories[cat.slug];

                      if (!hasChildren) {
                        return (
                          <Link
                            key={cat.slug}
                            href={cat.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#eae7e2] text-[#141414] hover:text-[#b87414] text-xs font-bold transition-all"
                          >
                            <span className="flex items-center gap-2">
                              {cat.name}
                              {cat.badge && (
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-black ${
                                  cat.badgeType === 'winter'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-amber-400 text-black'
                                }`}>
                                  {cat.badge}
                                </span>
                              )}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#b87414]" />
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={cat.slug}
                          className="rounded-2xl bg-white border border-[#eae7e2] overflow-hidden transition-all"
                        >
                          <div className="flex items-center justify-between p-3">
                            <Link
                              href={cat.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-bold text-[#141414] hover:text-[#b87414] flex-1"
                            >
                              {cat.name}
                            </Link>

                            <button
                              type="button"
                              onClick={() => toggleMobileCategory(cat.slug)}
                              className="p-1 rounded-lg hover:bg-[#f7f5f2] text-[#6b6b6b] transition cursor-pointer"
                              aria-label={`Toggle ${cat.name}`}
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-[#b87414]' : ''
                              }`} />
                            </button>
                          </div>

                          {/* Subcategory list */}
                          {isExpanded && (
                            <div className="px-3 pb-3 pt-1 border-t border-[#eae7e2]/60 bg-[#faf8f5]/50 space-y-1.5 animate-in fade-in duration-200">
                              {cat.children?.map((sub) => (
                                <Link
                                  key={sub.slug}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#eae7e2]/70 hover:border-[#b87414]/30 hover:bg-[#f7f5f2] transition group"
                                >
                                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-[#eae7e2]">
                                    <ExternalImage src={sub.image} alt={sub.name} fill sizes="36px" className="object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs font-semibold text-[#141414] group-hover:text-[#b87414] transition truncate block">
                                      {sub.name}
                                    </span>
                                    <span className="text-[10px] text-[#8c827a] truncate block">
                                      {sub.subtitle}
                                    </span>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#b87414] shrink-0" />
                                </Link>
                              ))}

                              <Link
                                href={cat.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-center py-2 text-[11px] font-bold text-[#b87414] hover:underline"
                              >
                                View all {cat.name} collections →
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Collections Highlight */}
                <div className="pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c827a] mb-2 px-1">
                    Seasonal Highlights
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/category/winter-collection"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white font-bold text-xs flex flex-col justify-between h-20 shadow-xs border border-blue-800/40"
                    >
                      <span className="text-[9px] uppercase font-mono tracking-wider text-blue-300">Curated</span>
                      <span className="flex items-center justify-between">
                        <span>Winter Collection</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
                      </span>
                    </Link>

                    <Link
                      href="/category/new-arrivals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white font-bold text-xs flex flex-col justify-between h-20 shadow-xs border border-amber-600/40"
                    >
                      <span className="text-[9px] uppercase font-mono tracking-wider text-amber-200">Fresh Drops</span>
                      <span className="flex items-center justify-between">
                        <span>New Arrivals</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-200" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="pt-2 space-y-1.5 border-t border-[#eae7e2]">
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#141414] hover:bg-white transition"
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Wishlist ({mounted ? wishlistCount : 0})</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>

                  <Link
                    href="/track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#141414] hover:bg-white transition"
                  >
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#b87414]" />
                      <span>Track Consignment</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>

                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#141414] hover:bg-white transition"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-700" />
                      <span>Customer Account</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                </div>
              </nav>

            </div>

            {/* Bottom Drawer Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#eae7e2] space-y-3">
              <a
                href="https://wa.me/923267727318"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Live WhatsApp Concierge (+92 326 7727318)</span>
              </a>

              <div className="text-center text-[10px] text-[#8c827a]">
                <span>CC Carvan Luxury Atelier • Nationwide COD</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
