'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShieldCheck, Tag, Check } from 'lucide-react';
import { HeroSlide } from '@/types/database';
import { ExternalImage } from '@/components/media/ExternalImage';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = slides.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 5000); // 5 seconds auto-slide for comfortable reading

    return () => clearInterval(timer);
  }, [total, isPaused]);

  if (!slides || slides.length === 0) return null;

  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % total);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  const slide = slides[current];

  // Helper to dynamically tailor tags, badges, secondary links & assurances based on slide's actual product
  const getSlideMeta = (s: HeroSlide) => {
    const url = (s.button_url || '').toLowerCase();
    const heading = (s.heading || '').toLowerCase();

    if (heading.includes('cotton') || url.includes('men-unstitched')) {
      return {
        kicker: "Men's Unstitched • 4m Full Cut",
        priceBadge: "Best Deal: Rs. 2,000",
        secondaryText: "Explore Men's Wear",
        secondaryUrl: "/category/men",
        feature1: "4m Breathable Cotton Sotton",
        feature2: "Brand Tag & Bag Included",
        feature3: "Express COD Across Pakistan",
      };
    }

    if (heading.includes('silk') || url.includes('katan-silk') || url.includes('women-unstitched')) {
      return {
        kicker: "Festive Silk Edit • 3-Piece Ensemble",
        priceBadge: "Special Price: Rs. 1,420",
        secondaryText: "All Women's Suits",
        secondaryUrl: "/category/women-unstitched-suits",
        feature1: "2.5m Floral Net Dupatta",
        feature2: "Pure Katan Silk Fabric",
        feature3: "Nationwide Express Courier",
      };
    }

    if (heading.includes('abaya') || url.includes('abaya')) {
      return {
        kicker: "Modest Fashion • Georgette Edition",
        priceBadge: "Pure Georgette: Rs. 4,000",
        secondaryText: "Explore Modest Wear",
        secondaryUrl: "/category/women-abayas",
        feature1: "Flared Free Size (Length 54\")",
        feature2: "Puff Sleeves with Dori Belt",
        feature3: "Express TCS / Leopards Dispatch",
      };
    }

    if (heading.includes('winter') || heading.includes('jacket') || heading.includes('tracksuit')) {
      return {
        kicker: "Winter Collection 2026 • Outerwear",
        priceBadge: "Warm Fleece: Rs. 2,500",
        secondaryText: "All Winter Wear",
        secondaryUrl: "/category/men-winter-wear",
        feature1: "Double-Sided Windproof Fabric",
        feature2: "Insulated Thermal Fleece",
        feature3: "Easy 7-Day Size Exchange",
      };
    }

    if (heading.includes('fragrance') || heading.includes('perfume') || url.includes('fragrance')) {
      return {
        kicker: "Signature Perfume • 100ml EDP",
        priceBadge: "Long-Lasting: Rs. 1,470",
        secondaryText: "All Fragrances",
        secondaryUrl: "/category/fragrances",
        feature1: "24-Hr Sweat Resistance",
        feature2: "Alcohol-Free Musky Notes",
        feature3: "100% Original Box & Packaging",
      };
    }

    return {
      kicker: "Official CC Carvan Capsule 2026",
      priceBadge: "Nationwide COD Available",
      secondaryText: "Explore All Products",
      secondaryUrl: "/products",
      feature1: "100% Authentic Quality Guaranteed",
      feature2: "Express Dispatch Across Pakistan",
      feature3: "Cash on Delivery",
    };
  };

  const meta = getSlideMeta(slide);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 group select-none shadow-xl border border-[#eae7e2]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Image with Ken Burns Zoom Effect */}
      <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] xl:h-[740px]">
        <ExternalImage
          key={slide.image_url}
          src={slide.image_url}
          alt={slide.heading}
          fill
          priority
          className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Sophisticated Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/65 to-transparent flex items-center">
          <div className="max-w-3xl px-6 sm:px-14 lg:px-20 xl:px-28 space-y-6">
            
            {/* Dynamic Product Kicker Tag & Price Chip */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 backdrop-blur-md border border-[#d99026]/40 text-[#f6d089] text-[11px] font-sans font-bold uppercase tracking-[0.2em] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#d99026]" />
                <span>{meta.kicker}</span>
              </div>

              {meta.priceBadge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d99026]/20 border border-[#d99026]/40 text-amber-200 text-[11px] font-sans font-bold">
                  <Tag className="w-3 h-3 text-[#d99026]" />
                  <span>{meta.priceBadge}</span>
                </div>
              )}
            </div>

            {/* Editorial Heading with Playfair Display */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight drop-shadow-lg">
              {slide.heading}
            </h1>

            {/* Subtitle */}
            {slide.subtitle && (
              <p className="font-sans text-sm sm:text-base lg:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed drop-shadow">
                {slide.subtitle}
              </p>
            )}

            {/* Dual CTAs tailored to product and category */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={slide.button_url || '/products'}
                className="inline-flex items-center gap-2.5 bg-[#d99026] hover:bg-[#c67d18] active:bg-[#b06f15] text-[#141414] font-sans font-bold px-8 py-4 rounded-full shadow-lg shadow-[#d99026]/25 transition transform hover:-translate-y-0.5 text-xs uppercase tracking-[0.16em] cursor-pointer"
              >
                <span>{slide.button_text || 'Shop Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={meta.secondaryUrl}
                className="hidden sm:inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#141414]/90 hover:bg-[#141414] active:bg-neutral-900 text-white border border-white/25 backdrop-blur-md font-sans text-xs uppercase tracking-[0.16em] font-bold transition hover:border-[#d99026]/50 cursor-pointer"
              >
                <span>{meta.secondaryText}</span>
              </Link>
            </div>

            {/* Product Assurance Micro-Badges Tailored to the Product */}
            <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-neutral-300 font-sans">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{meta.feature1}</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{meta.feature2}</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d99026] shrink-0" />
                <span>{meta.feature3}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Arrows with Glassmorphic Style */}
      {total > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-950/60 hover:bg-neutral-950/90 text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-950/60 hover:bg-neutral-950/90 text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Minimalist Progress Pill Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  current === idx ? 'w-8 bg-[#d99026] shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
