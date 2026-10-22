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
  Truck, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  LogOut,
  Loader2,
  Tag,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useCustomer } from '@/components/providers/CustomerProvider';
import { ExternalImage } from '@/components/media/ExternalImage';

interface NavCategory {
  name: string;
  slug: string;
  href: string;
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
    name: 'Home',
    slug: 'home',
    href: '/',
  },
  {
    name: 'Men',
    slug: 'men',
    href: '/category/men',
    children: [
      {
        name: 'Unstitched Suits',
        slug: 'men-unstitched-suits',
        href: '/category/men-unstitched-suits',
        subtitle: 'Cotton Sotton & Wash & Wear 4m cuts',
        image: '/products/men-grey-cotton-sotton-suit-1.webp',
        tag: 'Suits',
      },
      {
        name: 'Winter Wear',
        slug: 'men-winter-wear',
        href: '/category/men-winter-wear',
        subtitle: 'Thermal fleece tracksuits, hoodies & jackets',
        image: '/products/men-fleece-printed-track-suit-grey-1.webp',
        tag: 'Warm',
      },
      {
        name: 'Footwear',
        slug: 'men-footwear',
        href: '/category/men-footwear',
        subtitle: 'Rexine semi-formal cushioned sandals',
        image: '/products/men-rexine-sandals-mustard-1.webp',
        tag: 'Shoes',
      },
    ],
  },
  {
    name: 'Women',
    slug: 'women',
    href: '/category/women',
    children: [
      {
        name: 'Unstitched Suits',
        slug: 'women-unstitched-suits',
        href: '/category/women-unstitched-suits',
        subtitle: 'Beige katan silk 3-piece suites with net dupatta',
        image: '/products/beige-katan-silk-3piece-suit-1.webp',
        tag: 'Suits',
      },
      {
        name: 'Night Suits & Pajamas',
        slug: 'women-night-suits-pajamas',
        href: '/category/women-night-suits-pajamas',
        subtitle: 'Soft jersey loungewear & Kulomi fleece sets',
        image: '/products/grey-printed-women-night-suit-1.webp',
        tag: 'Lounge',
      },
      {
        name: 'Abayas',
        slug: 'women-abayas',
        href: '/category/women-abayas',
        subtitle: 'Flared georgette maxi abayas with stoller',
        image: '/products/flared-georgette-abaya-puff-sleeves-1.webp',
        tag: 'Modest',
      },
      {
        name: 'Handbags',
        slug: 'women-handbags',
        href: '/category/women-handbags',
        subtitle: 'Brown leather top handle & pom pom charm bags',
        image: '/products/women-brown-leather-top-handle-handbag-1.webp',
        tag: 'Bags',
      },
      {
        name: 'Footwear',
        slug: 'women-footwear',
        href: '/category/women-footwear',
        subtitle: 'Rexine slip-on sneakers & pumps',
        image: '/products/black-slip-on-sneakers-women-1.webp',
        tag: 'Shoes',
      },
    ],
  },
  {
    name: 'Fragrances',
    slug: 'fragrances',
    href: '/category/fragrances',
    children: [
      {
        name: "Men's Perfumes",
        slug: 'mens-perfumes',
        href: '/category/mens-perfumes',
        subtitle: 'J. Janan Musk EDP & Citrus Floral EDT 100ml',
        image: '/products/j-janan-musk-edp-perfume-men-1.webp',
        tag: 'Perfumes',
      },
    ],
  },
  {
    name: 'Beauty & Makeup',
    slug: 'beauty-makeup',
    href: '/category/beauty-makeup',
    children: [
      {
        name: 'Skincare',
        slug: 'beauty-skincare',
        href: '/category/beauty-skincare',
        subtitle: 'ZK 3-in-1 glow soap, rose water & aloe gel bundle',
        image: '/products/zk-3in1-glow-bundle-whitening-soap-1.webp',
        tag: 'Glow',
      },
      {
        name: 'Makeup',
        slug: 'beauty-makeup-items',
        href: '/category/beauty-makeup-items',
        subtitle: '9-in-1 complete vanity makeup cosmetics deal',
        image: '/products/9in1-complete-makeup-deal-bundle-1.webp',
        tag: 'Deal',
      },
    ],
  },
  {
    name: 'Watches & Gadgets',
    slug: 'watches-gadgets',
    href: '/category/watches-gadgets',
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
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    href: '/category/new-arrivals',
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
      setIsScrolled(window.scrollY > 20);
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle outside clicks for search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
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
    }, 150);
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
        ? 'bg-white/98 backdrop-blur-md shadow-md shadow-black/[0.03] border-b border-[#eae7e2]' 
        : 'bg-white border-b border-[#eae7e2]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-3 sm:gap-6">
          
          {/* Mobile Menu Trigger */}
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

          {/* Logo & Full Rebuilt Navigation Links */}
          <div className="flex items-center gap-5 xl:gap-8 min-w-0">
            <Link 
              href="/" 
              onMouseEnter={closeDropdownImmediately}
              className="flex items-center group py-1 shrink-0"
            >
              <img
                src="/logo.png"
                alt="CC Carvan"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
              />
            </Link>

            {/* Desktop Navigation: Home | Men ▾ | Women ▾ | Fragrances | Beauty & Makeup ▾ | Watches & Gadgets ▾ | Winter Collection | New Arrivals */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[12px] font-semibold tracking-[0.08em] uppercase font-sans text-[#141414]">
              {NAVIGATION_ITEMS.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isActive = pathname === item.href || (item.slug !== 'home' && pathname.includes(item.slug));
                const isDropdownOpen = activeDropdown === item.slug;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.slug}
                      href={item.href}
                      onMouseEnter={closeDropdownImmediately}
                      className={`relative py-7 transition-colors whitespace-nowrap hover:text-[#b87414] ${
                        isActive ? 'text-[#b87414] font-bold' : ''
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className={`absolute bottom-5 left-0 h-[2px] bg-[#b87414] transition-all duration-300 rounded-full ${
                        isActive ? 'w-full' : 'w-0'
                      }`} />
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.slug}
                    className="relative py-7"
                    onMouseEnter={() => handleMouseEnterItem(item.slug)}
                    onMouseLeave={handleMouseLeaveItem}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap hover:text-[#b87414] ${
                        isDropdownOpen || isActive ? 'text-[#b87414] font-bold' : ''
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180 text-[#b87414]' : 'text-[#6b6b6b]'
                      }`} />
                    </Link>

                    <span className={`absolute bottom-5 left-0 h-[2px] bg-[#b87414] transition-all duration-300 rounded-full ${
                      isDropdownOpen || isActive ? 'w-full' : 'w-0'
                    }`} />

                    {/* Mega Dropdown Panel */}
                    {isDropdownOpen && (
                      <div
                        className="absolute top-full left-0 min-w-[340px] max-w-[420px] bg-white rounded-2xl shadow-2xl border border-[#eae7e2] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                        onMouseEnter={() => handleMouseEnterItem(item.slug)}
                        onMouseLeave={handleMouseLeaveItem}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#eae7e2] px-2 text-[10px] uppercase font-bold tracking-wider text-[#8c827a]">
                          <span>{item.name} Collections</span>
                          <Link
                            href={item.href}
                            onClick={closeDropdownImmediately}
                            className="text-[#b87414] hover:underline flex items-center gap-0.5 normal-case tracking-normal"
                          >
                            <span>View All</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="space-y-1">
                          {item.children?.map((child) => (
                            <Link
                              key={child.slug}
                              href={child.href}
                              onClick={closeDropdownImmediately}
                              className="group flex items-center gap-3 p-2 rounded-xl hover:bg-[#faf8f5] border border-transparent hover:border-[#eae7e2] transition-all"
                            >
                              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-[#eae7e2]">
                                <ExternalImage
                                  src={child.image}
                                  alt={child.name}
                                  fill
                                  sizes="44px"
                                  className="object-cover group-hover:scale-108 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <h4 className="font-semibold text-xs text-[#141414] group-hover:text-[#b87414] transition-colors truncate">
                                    {child.name}
                                  </h4>
                                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-md bg-[#f7f5f2] text-[#b87414] font-bold border border-[#eae7e2] shrink-0">
                                    {child.tag}
                                  </span>
                                </div>
                                <p className="text-[10px] text-[#6b6b6b] truncate mt-0.5">
                                  {child.subtitle}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Prominent Search Bar Directly in Header */}
          <div 
            ref={searchContainerRef} 
            onMouseEnter={closeDropdownImmediately}
            className="relative flex-1 max-w-xs xl:max-w-sm hidden md:block"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search cotton suits, abayas, fragrances..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                className={`w-full h-11 pl-10 pr-9 text-xs rounded-full bg-[#f7f5f2] border transition-all duration-200 outline-none text-[#141414] placeholder-[#8c827a] ${
                  searchFocused 
                    ? 'border-[#b87414] bg-white ring-2 ring-[#b87414]/15 shadow-sm' 
                    : 'border-[#eae7e2] hover:border-[#d4cfc7]'
                }`}
              />
              <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
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

            {/* REAL-TIME INSTANT SEARCH RESULTS DROPDOWN */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#eae7e2] shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[380px] overflow-y-auto overscroll-contain">
                  
                  {/* Loading Spinner */}
                  {isSearching && (
                    <div className="p-8 text-center space-y-2">
                      <Loader2 className="w-5 h-5 text-[#b87414] animate-spin mx-auto" />
                      <p className="text-xs text-[#6b6b6b] font-medium">
                        Searching collections...
                      </p>
                    </div>
                  )}

                  {/* Matching Results */}
                  {!isSearching && searchQuery.trim() && searchResults.length > 0 && (
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-1.5 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#8c827a] border-b border-[#eae7e2]/60">
                        <span>Matching Pieces ({searchResults.length})</span>
                        <span>Instant Preview</span>
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

                  {/* No Results State */}
                  {!isSearching && searchQuery.trim() && searchResults.length === 0 && (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 text-[#b87414] flex items-center justify-center mx-auto">
                        <Search className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-xs text-[#141414]">
                        No items found for &ldquo;{searchQuery}&rdquo;
                      </h4>
                      <p className="text-[11px] text-[#6b6b6b] max-w-xs mx-auto">
                        Try searching for cotton, abaya, perfume, or explore all collections.
                      </p>
                    </div>
                  )}

                  {/* Default State: Popular Suggestions */}
                  {!isSearching && !searchQuery.trim() && (
                    <div className="p-4 space-y-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c827a] mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#b87414]" />
                          <span>Popular Searches</span>
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

                {/* Bottom View All */}
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

          {/* Right Action Icons */}
          <div 
            onMouseEnter={closeDropdownImmediately}
            className="flex items-center gap-1.5 sm:gap-3 shrink-0"
          >
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#141414] hover:bg-[#f7f5f2] transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#141414]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#141414] hover:text-[#b87414] hover:bg-[#f7f5f2] active:bg-[#eae7e2] transition-colors touch-manipulation group"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-108" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] rounded-full bg-[#141414] text-white text-[9px] font-bold flex items-center justify-center px-1 shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart Drawer Button */}
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#141414] hover:text-[#b87414] hover:bg-[#f7f5f2] active:bg-[#eae7e2] transition-colors touch-manipulation group cursor-pointer"
              aria-label="Shopping Bag"
              title="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-108" />
              {mounted && itemCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] rounded-full bg-[#b87414] text-white text-[9px] font-black flex items-center justify-center px-1 shadow-sm animate-in zoom-in-50 duration-200">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Customer Account Icon */}
            <Link
              href="/account"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-[#141414] hover:bg-[#f7f5f2] transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

          </div>

        </div>
      </div>

      {/* Luxury Mobile Slide-Over Drawer with Accordion Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300 cursor-pointer"
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
                    className="h-14 w-auto object-contain drop-shadow-xs"
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
                    placeholder="Search suits, abayas, fragrances..."
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
                  
                  <div className="space-y-1.5">
                    {/* Home Link */}
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#eae7e2] text-[#141414] hover:border-[#b87414]/40 hover:shadow-sm text-xs font-bold transition-all"
                    >
                      <span>Home</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#b87414]" />
                    </Link>

                    {/* Accordion parent categories */}
                    {NAVIGATION_ITEMS.filter((i) => i.slug !== 'home').map((cat) => {
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
                            <span>{cat.name}</span>
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
                            <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-[#eae7e2]/70 bg-[#faf8f5]/60">
                              <Link
                                href={cat.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 px-2 text-[11px] font-bold text-[#b87414] hover:underline"
                              >
                                View All {cat.name} →
                              </Link>

                              {cat.children?.map((sub) => (
                                <Link
                                  key={sub.slug}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center justify-between py-2 px-2.5 rounded-xl bg-white border border-[#eae7e2]/70 text-xs text-[#141414] hover:text-[#b87414] transition"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#b87414]" />
                                    <span className="font-medium">{sub.name}</span>
                                  </div>
                                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#f7f5f2] text-[#b87414] font-bold border border-[#eae7e2]">
                                    {sub.tag}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c827a] mb-2 px-1">
                    Store Services
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/category/winter-collection"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/25 text-[#141414] text-xs font-bold flex flex-col gap-1 hover:shadow-sm transition"
                    >
                      <Sparkles className="w-4 h-4 text-[#b87414]" />
                      <span>Winter Edit</span>
                      <span className="text-[10px] text-[#b87414] font-medium">Seasonal Warmth</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openCartDrawer();
                      }}
                      className="p-3 rounded-2xl bg-white border border-[#eae7e2] text-[#141414] text-xs font-bold flex flex-col gap-1 hover:shadow-sm transition text-left cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#b87414]" />
                      <span>View Bag</span>
                      <span className="text-[10px] text-neutral-500 font-medium">{itemCount} items</span>
                    </button>

                    <Link
                      href="/wishlist"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-white border border-[#eae7e2] text-[#141414] text-xs font-bold flex flex-col gap-1 hover:shadow-sm transition"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Wishlist</span>
                      <span className="text-[10px] text-neutral-500 font-medium">
                        {mounted ? `${wishlistCount} Saved` : '0 Saved'}
                      </span>
                    </Link>

                    <Link
                      href="/track-order"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-white border border-[#eae7e2] text-[#141414] text-xs font-bold flex flex-col gap-1 hover:shadow-sm transition"
                    >
                      <Truck className="w-4 h-4 text-[#b87414]" />
                      <span>Track Order</span>
                      <span className="text-[10px] text-neutral-500 font-medium">Live Dispatch</span>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            {/* Bottom Account Card */}
            <div className="p-6 bg-white border-t border-[#eae7e2] space-y-3">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 text-center font-bold text-xs uppercase tracking-wider rounded-2xl bg-[#141414] hover:bg-[#262626] text-white shadow-md flex items-center justify-center gap-2 transition"
              >
                <User className="w-4 h-4 text-[#b87414]" />
                <span>My Customer Account</span>
              </Link>
              <p className="text-[9.5px] text-[#8c827a] text-center tracking-[0.2em] uppercase font-sans">
                CC Carvan Pakistan • Nationwide Cash on Delivery
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
