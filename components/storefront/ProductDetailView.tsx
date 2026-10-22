'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/database';
import { ExternalImage } from '@/components/media/ExternalImage';
import { ProductCard } from '@/components/storefront/ProductCard';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import { 
  Star, ShoppingBag, Heart, Layers, ShieldCheck, 
  Truck, RefreshCw, CheckCircle2, ChevronRight, ChevronLeft,
  Sparkles, Check, Ruler, X, AlertTriangle, Camera,
  ArrowLeft, Scissors, Loader2
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

interface VariantColor {
  name: string;
  hex: string;
}

interface SizeOption {
  id: string;
  name: string;
  badge: string;
  detail: string;
  priceDelta: number;
}

interface RealProductOption {
  sizeLabel?: string;
  sizes?: { name: string; detail?: string }[];
  colors?: { name: string; hex?: string; imageIndex?: number }[];
  colorName?: string;
  badge?: string;
  hasSizeGuide?: boolean;
  isClothing?: boolean;
  boxItems?: string[];
}

function getProductRealOptions(product: Product): RealProductOption {
  const slug = (product.slug || '').toLowerCase();
  const sku = (product.sku || '').toUpperCase();

  // Product 1: Men Grey Cotton Sotton Suit
  if (sku.includes('MEN-SOT-GRY') || slug.includes('men-grey-cotton-sotton')) {
    return {
      badge: 'Unstitched – 4 m (Shirt 2 m + Trouser 2 m)',
      colorName: 'Grey',
      isClothing: true,
      hasSizeGuide: false,
    };
  }

  // Product 2: ZK Skincare Bundle
  if (sku.includes('SKN-ZK3IN1') || slug.includes('zk-3in1-glow-bundle')) {
    return {
      isClothing: false,
      hasSizeGuide: false,
    };
  }

  // Product 3: Beige Katan Silk 3-Piece
  if (sku.includes('KTN-BGE-3PC') || slug.includes('beige-katan-silk')) {
    return {
      badge: 'Unstitched – 2.5 yd each',
      colorName: 'Beige',
      isClothing: true,
      hasSizeGuide: false,
    };
  }

  // Product 4: Airpods M04
  if (sku.includes('AIR-M04') || slug.includes('airpods-m04')) {
    return {
      colors: [
        { name: 'Black', hex: '#1C1C1C', imageIndex: 0 },
        { name: 'White', hex: '#F8F9FA', imageIndex: 1 },
      ],
      isClothing: false,
      hasSizeGuide: false,
    };
  }

  // Product 5: Men Fleece Tracksuit
  if (sku.includes('TRK-GRY') || slug.includes('men-fleece-printed-track-suit')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Small', detail: 'Chest 19" • L 25"' },
        { name: 'Medium', detail: 'Chest 20" • L 26"' },
        { name: 'Large', detail: 'Chest 21" • L 27"' },
        { name: 'X-Large', detail: 'Chest 22" • L 28"' },
      ],
      colorName: 'Grey',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 6: J. Janan Musk 100ml
  if (sku.includes('JAN-MSK-100') || slug.includes('j-janan-musk')) {
    return {
      isClothing: false,
      hasSizeGuide: false,
    };
  }

  // Product 7: Women Slip-On Sneakers
  if (sku.includes('SNK-W-BLK') || slug.includes('black-slip-on-sneakers')) {
    return {
      sizeLabel: 'Select Shoe Size (UK/EU):',
      sizes: [
        { name: '6/36', detail: 'Foot 23.0 cm' },
        { name: '7/37', detail: 'Foot 23.5 cm' },
        { name: '8/38', detail: 'Foot 24.0 cm' },
        { name: '9/39', detail: 'Foot 24.5 cm' },
        { name: '10/40', detail: 'Foot 25.0 cm' },
      ],
      colorName: 'Black',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 8: Men Wash & Wear Suit
  if (sku.includes('WNW-BRN') || slug.includes('men-unstitched-wash-and-wear')) {
    return {
      badge: 'Unstitched – 4 m',
      colorName: 'Brown',
      isClothing: true,
      hasSizeGuide: false,
    };
  }

  // Product 9: Grey Night Suit
  if (sku.includes('NGH-GRY-2PC') || slug.includes('grey-printed-women-night-suit')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Medium', detail: 'Chest 19" • L 26"' },
        { name: 'Large', detail: 'Chest 21" • L 27"' },
        { name: 'X-Large', detail: 'Chest 23" • L 27"' },
      ],
      colorName: 'Grey',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 10: Men Citrus Floral Musk EDT
  if (sku.includes('EDT-CTM-100') || slug.includes('men-citrus-floral-musk')) {
    return {
      isClothing: false,
      hasSizeGuide: false,
    };
  }

  // Product 11: Purple Night Suit
  if (sku.includes('NGH-PRP-2PC') || slug.includes('purple-printed-2piece-night-suit')) {
    return {
      sizeLabel: 'Size:',
      sizes: [
        { name: 'Free Size', detail: 'Chest 20/21" • L 28"' },
      ],
      colorName: 'Purple',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 12: Pink Night Suit
  if (sku.includes('NGH-PNK-2PC') || slug.includes('women-stitched-jersey-printed-night-suit-pink')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Medium', detail: 'Chest 20" • L 28"' },
        { name: 'Large', detail: 'Chest 22" • L 29"' },
        { name: 'X-Large', detail: 'Chest 24" • L 30"' },
      ],
      colorName: 'Pink',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 13: Men Black Jacket
  if (sku.includes('JCK-BLK-DBS') || slug.includes('men-black-double-sided-stand-collar-jacket')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Small', detail: 'Chest 38"' },
        { name: 'Medium', detail: 'Chest 40"' },
        { name: 'Large', detail: 'Chest 42"' },
        { name: 'X-Large', detail: 'Chest 44"' },
      ],
      colorName: 'Black',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 14: Men Fleece Hoodie
  if (sku.includes('HD-OLV') || sku.includes('HD-') || slug.includes('men-fleece-pullover-hoodie-colorblock')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Small' },
        { name: 'Medium' },
        { name: 'Large' },
        { name: 'X-Large' },
      ],
      colors: [
        { name: 'Olive', hex: '#556B2F', imageIndex: 0 },
        { name: 'Tan', hex: '#D2B48C', imageIndex: 1 },
        { name: 'Black', hex: '#1C1C1C', imageIndex: 2 },
      ],
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 15: Brown Leather Handbag
  if (sku.includes('BAG-BRN-810') || slug.includes('women-brown-leather-top-handle-handbag')) {
    return {
      badge: 'Dimensions: 8 x 10"',
      colorName: 'Brown',
      isClothing: false,
      hasSizeGuide: false,
    };
  }

  // Product 16: Women Kulomi Fleece Pajamas
  if (sku.includes('PJM-KLM-W') || slug.includes('women-cute-kulomi-fleece-pajamas-set')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Small', detail: 'Chest 38"' },
        { name: 'Medium', detail: 'Chest 40"' },
        { name: 'Large', detail: 'Chest 42"' },
      ],
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 17: Georgette Maxi Abaya
  if (sku.includes('ABY-MAX-BGE') || slug.includes('georgette-plain-maxi-abaya')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Small', detail: 'L 52" • Chest 22"' },
        { name: 'Medium', detail: 'L 54" • Chest 24"' },
        { name: 'Large', detail: 'L 56" • Chest 25"' },
        { name: 'X-Large', detail: 'L 56" • Chest 26"' },
      ],
      colorName: 'Beige',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 18: Men Mustard Sandals
  if (sku.includes('SND-MST') || slug.includes('men-rexine-sandals-mustard')) {
    return {
      sizeLabel: 'Select Footwear Size (EU):',
      sizes: [
        { name: '39' },
        { name: '40' },
        { name: '41' },
        { name: '42' },
        { name: '43' },
        { name: '44' },
      ],
      colorName: 'Mustard',
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 19: Slim Classy Watch
  if (sku.includes('WCH-SLM') || slug.includes('women-slim-classy-dial-bracelet-watch')) {
    return {
      colors: [
        { name: 'Golden', hex: '#D4AF37', imageIndex: 0 },
        { name: 'Silver', hex: '#C0C0C0', imageIndex: 1 },
      ],
      isClothing: false,
      hasSizeGuide: false,
    };
  }

  // Product 20: Flared Georgette Abaya
  if (sku.includes('ABY-FLR-GR') || slug.includes('flared-georgette-abaya-puff-sleeves')) {
    return {
      sizeLabel: 'Select Size:',
      sizes: [
        { name: 'Small', detail: 'L 52" • Chest 21"' },
        { name: 'Medium', detail: 'L 54" • Chest 23"' },
        { name: 'Large', detail: 'L 56" • Chest 25"' },
        { name: 'X-Large', detail: 'L 56" • Chest 27"' },
      ],
      colors: [
        { name: 'Brown', hex: '#5c4033', imageIndex: 0 },
        { name: 'Black', hex: '#1C1C1C', imageIndex: 2 },
        { name: 'Purple', hex: '#5b2c6f', imageIndex: 4 },
        { name: 'Green', hex: '#1e5631', imageIndex: 5 },
      ],
      hasSizeGuide: true,
      isClothing: true,
    };
  }

  // Product 21: Black Handbag with Pom Pom
  if (sku.includes('BAG-BLK-POM') || slug.includes('women-black-fashion-handbag-pom-pom-charm')) {
    return {
      colorName: 'Black',
      isClothing: false,
      hasSizeGuide: false,
    };
  }

  // Product 22: 9-in-1 Makeup Deal
  if (sku.includes('MKP-9IN1') || slug.includes('9-in-1-complete-makeup-deal-bundle')) {
    return {
      isClothing: false,
      hasSizeGuide: false,
      boxItems: [
        '1 x Makeup Setting Fixer Spray',
        '1 x TV Paint Stick (Full Base Coverage)',
        '1 x Creamy Concealer Wand',
        '1 x Lustrous Lip Gloss',
        '1 x Pore-Smoothing Makeup Primer',
        '1 x Velvet Matte Foundation',
        '1 x Translucent Setting Loose Powder',
        '1 x Rich Pigment Matte Lipstick',
        '1 x Hydrating Liquid Foundation',
      ],
    };
  }

  // Generic fallback:
  if (product.has_sizes && Array.isArray(product.available_sizes) && product.available_sizes.length > 0) {
    return {
      sizeLabel: 'Select Size:',
      sizes: product.available_sizes.map((s: string) => ({ name: s })),
      hasSizeGuide: Boolean(product.size_chart),
      isClothing: true,
    };
  }

  return { isClothing: false, hasSizeGuide: false };
}

function renderSizeChartTables(product: Product) {
  const chart = product.size_chart;
  const sku = (product.sku || '').toUpperCase();
  const slug = (product.slug || '').toLowerCase();

  // Footwear Size Chart (Products 7 & 18)
  if (sku.includes('SNK-W-BLK') || sku.includes('SND-MST') || slug.includes('sandals') || slug.includes('sneakers')) {
    const isWomen = sku.includes('SNK-W-BLK') || slug.includes('women');
    const footwearRows = isWomen
      ? [
          { uk: '6', eu: '36', cm: '23.0', in: '9.06' },
          { uk: '7', eu: '37', cm: '23.5', in: '9.25' },
          { uk: '8', eu: '38', cm: '24.0', in: '9.45' },
          { uk: '9', eu: '39', cm: '24.5', in: '9.65' },
          { uk: '10', eu: '40', cm: '25.0', in: '9.84' },
        ]
      : [
          { eu: '39', uk: '5.5', cm: '24.5', in: '9.65' },
          { eu: '40', uk: '6.5', cm: '25.0', in: '9.84' },
          { eu: '41', uk: '7.5', cm: '25.5', in: '10.04' },
          { eu: '42', uk: '8.5', cm: '26.0', in: '10.24' },
          { eu: '43', uk: '9.5', cm: '26.5', in: '10.43' },
          { eu: '44', uk: '10.5', cm: '27.0', in: '10.63' },
        ];

    return (
      <div className="space-y-4">
        <h4 className="font-bold text-xs text-[#141414] uppercase tracking-wider flex items-center gap-1.5">
          <Scissors className="w-3.5 h-3.5 text-[#b87414]" />
          <span>Footwear Insole & Size Sizing Guide</span>
        </h4>
        <div className="overflow-x-auto rounded-xl border border-[#eae7e2]">
          <table className="w-full text-xs text-left text-[#141414]">
            <thead className="bg-[#f7f5f2] text-[10px] uppercase tracking-wider text-[#6b6b6b]">
              <tr>
                <th className="py-2.5 px-3">EU Size</th>
                <th className="py-2.5 px-3">UK Size</th>
                <th className="py-2.5 px-3">Foot Length (CM)</th>
                <th className="py-2.5 px-3">Length (Inches)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eae7e2] bg-white">
              {footwearRows.map((r, i) => (
                <tr key={i} className="hover:bg-[#faf9f7]">
                  <td className="py-2.5 px-3 font-bold text-[#b87414]">{r.eu}</td>
                  <td className="py-2.5 px-3 font-medium">{r.uk}</td>
                  <td className="py-2.5 px-3 font-mono">{r.cm} cm</td>
                  <td className="py-2.5 px-3 font-mono">{r.in}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Abayas Size Chart (Product 17 & 20)
  if (sku.includes('ABY') || slug.includes('abaya')) {
    const abayaRows = [
      { size: 'Small', length: '52', chest: '21 - 22', sleeve: '22' },
      { size: 'Medium', length: '54', chest: '23 - 24', sleeve: '22.5' },
      { size: 'Large', length: '56', chest: '25', sleeve: '23' },
      { size: 'X-Large', length: '56', chest: '26 - 27', sleeve: '23.5' },
    ];
    return (
      <div className="space-y-4">
        <h4 className="font-bold text-xs text-[#141414] uppercase tracking-wider flex items-center gap-1.5">
          <Scissors className="w-3.5 h-3.5 text-[#b87414]" />
          <span>Abaya Garment Measurements (Inches)</span>
        </h4>
        <div className="overflow-x-auto rounded-xl border border-[#eae7e2]">
          <table className="w-full text-xs text-left text-[#141414]">
            <thead className="bg-[#f7f5f2] text-[10px] uppercase tracking-wider text-[#6b6b6b]">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Abaya Length</th>
                <th className="py-2.5 px-3">Chest (Width)</th>
                <th className="py-2.5 px-3">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eae7e2] bg-white">
              {abayaRows.map((r, i) => (
                <tr key={i} className="hover:bg-[#faf9f7]">
                  <td className="py-2.5 px-3 font-bold text-[#b87414]">{r.size}</td>
                  <td className="py-2.5 px-3 font-mono">{r.length}&quot;</td>
                  <td className="py-2.5 px-3 font-mono">{r.chest}&quot;</td>
                  <td className="py-2.5 px-3 font-mono">{r.sleeve}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Night Suits (Products 9, 11, 12, 16)
  if (sku.includes('NGH') || sku.includes('PJM') || slug.includes('night-suit') || slug.includes('pajama')) {
    const nightSuitRows = [
      { size: 'Medium', chest: '19 - 20', topLen: '26 - 28', waist: '32 - 40', trLen: '37 - 38' },
      { size: 'Large', chest: '21 - 22', topLen: '27 - 29', waist: '34 - 42', trLen: '38 - 39' },
      { size: 'X-Large', chest: '23 - 24', topLen: '27 - 30', waist: '34 - 44', trLen: '38 - 39' },
    ];
    return (
      <div className="space-y-4">
        <h4 className="font-bold text-xs text-[#141414] uppercase tracking-wider flex items-center gap-1.5">
          <Scissors className="w-3.5 h-3.5 text-[#b87414]" />
          <span>Women&apos;s Night Suit Measurements (Inches)</span>
        </h4>
        <div className="overflow-x-auto rounded-xl border border-[#eae7e2]">
          <table className="w-full text-xs text-left text-[#141414]">
            <thead className="bg-[#f7f5f2] text-[10px] uppercase tracking-wider text-[#6b6b6b]">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Top Chest</th>
                <th className="py-2.5 px-3">Top Length</th>
                <th className="py-2.5 px-3">Trouser Waist</th>
                <th className="py-2.5 px-3">Trouser Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eae7e2] bg-white">
              {nightSuitRows.map((r, i) => (
                <tr key={i} className="hover:bg-[#faf9f7]">
                  <td className="py-2.5 px-3 font-bold text-[#b87414]">{r.size}</td>
                  <td className="py-2.5 px-3 font-mono">{r.chest}&quot;</td>
                  <td className="py-2.5 px-3 font-mono">{r.topLen}&quot;</td>
                  <td className="py-2.5 px-3 font-mono">{r.waist}&quot;</td>
                  <td className="py-2.5 px-3 font-mono">{r.trLen}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Men Tracksuits & Jackets (Product 5, 13, 14)
  const shirtRows = chart?.shirt || [
    { size: 'S', chest: '19', length: '25', arm: '23' },
    { size: 'M', chest: '20', length: '26', arm: '23.5' },
    { size: 'L', chest: '21', length: '27', arm: '24' },
    { size: 'XL', chest: '22', length: '28', arm: '24.5' },
  ];

  const trouserRows = chart?.trouser || [
    { size: 'S', waist: '30-34', length: '40', hip: '34' },
    { size: 'M', waist: '32-36', length: '41', hip: '36' },
    { size: 'L', waist: '34-38', length: '42', hip: '38' },
    { size: 'XL', waist: '36-40', length: '43', hip: '40' },
  ];

  return (
    <div className="space-y-6">
      {shirtRows.length > 0 && (
        <div>
          <h4 className="font-bold text-xs text-[#141414] mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#b87414]" />
            <span>Shirt / Upper Measurements (Inches)</span>
          </h4>
          <div className="overflow-x-auto rounded-xl border border-[#eae7e2]">
            <table className="w-full text-xs text-left text-[#141414]">
              <thead className="bg-[#f7f5f2] text-[10px] uppercase tracking-wider text-[#6b6b6b] border-b border-[#eae7e2]">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Size</th>
                  <th className="py-2.5 px-3">Chest</th>
                  <th className="py-2.5 px-3">Length</th>
                  <th className="py-2.5 px-3">Arm / Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae7e2] bg-white">
                {shirtRows.map((r: any) => (
                  <tr key={r.size} className="hover:bg-[#faf9f7] transition-colors">
                    <td className="py-2.5 px-3 font-black text-[#b87414]">{r.size}</td>
                    <td className="py-2.5 px-3 font-mono">{r.chest}&quot;</td>
                    <td className="py-2.5 px-3 font-mono">{r.length}&quot;</td>
                    <td className="py-2.5 px-3 font-mono">{r.arm || r.sleeves || '23'}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {trouserRows.length > 0 && (
        <div>
          <h4 className="font-bold text-xs text-[#141414] mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-[#b87414]" />
            <span>Trouser Measurements (Inches)</span>
          </h4>
          <div className="overflow-x-auto rounded-xl border border-[#eae7e2]">
            <table className="w-full text-xs text-left text-[#141414]">
              <thead className="bg-[#f7f5f2] text-[10px] uppercase tracking-wider text-[#6b6b6b] border-b border-[#eae7e2]">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Size</th>
                  <th className="py-2.5 px-3">Waist</th>
                  <th className="py-2.5 px-3">Length</th>
                  <th className="py-2.5 px-3">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae7e2] bg-white">
                {trouserRows.map((r: any) => (
                  <tr key={r.size} className="hover:bg-[#faf9f7] transition-colors">
                    <td className="py-2.5 px-3 font-black text-[#b87414]">{r.size}</td>
                    <td className="py-2.5 px-3 font-mono">{r.waist}&quot;</td>
                    <td className="py-2.5 px-3 font-mono">{r.length}&quot;</td>
                    <td className="py-2.5 px-3 font-mono">{r.hip || '34'}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare } = useCompare();

  const realOptions = getProductRealOptions(product);

  const requiresSizeSelection = Boolean(
    product.has_sizes || 
    (product.available_sizes && product.available_sizes.length > 0) ||
    (realOptions.sizes && realOptions.sizes.length > 0)
  );

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Customization state: Must NOT pre-select when size selection is required!
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState<string | null>(null);
  const sizeSelectorRef = useRef<HTMLDivElement | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>(
    realOptions.colors && realOptions.colors.length > 0
      ? realOptions.colors[0].name
      : (realOptions.colorName || '')
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping' | 'reviews' | 'sizechart'>('details');
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sticky mobile bottom bar state
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mainCtaRef = useRef<HTMLDivElement | null>(null);

  // Real pricing calculation (exact price, NO fake delta markup!)
  const currentRegularPrice = product.regular_price;
  const currentSalePrice = product.sale_price !== null && product.sale_price !== undefined
    ? product.sale_price
    : null;
  const currentPrice = currentSalePrice ?? currentRegularPrice;
  const hasDiscount = currentSalePrice !== null && currentSalePrice < currentRegularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((currentRegularPrice - currentSalePrice!) / currentRegularPrice) * 100)
    : 0;

  // Review state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [productReviews, setProductReviews] = useState<any[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadReviews() {
      if (!product?.id) return;
      try {
        setIsLoadingReviews(true);
        const res = await fetch(`/api/reviews?productId=${encodeURIComponent(product.id)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.reviews)) {
            setProductReviews(data.reviews);
          }
        }
      } catch (err) {
        console.error('Failed to load approved reviews:', err);
      } finally {
        if (isMounted) setIsLoadingReviews(false);
      }
    }
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, [product?.id]);

  // Use only actual product images
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [{ id: 'fallback-0', image_url: 'https://i.postimg.cc/8Tj1P085/Whats-App-Image-2026-09-19-at-10-02-48-PM.jpg', alt_text: product.name, sort_order: 1, is_primary: true }];
  const currentImage = images[selectedImageIndex] || images[0];

  const isFavorited = isInWishlist(product.id);

  // Calculate dynamic delivery estimate (3 business days ahead)
  const [deliveryDateString, setDeliveryDateString] = useState('3-4 business days');
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    setDeliveryDateString(d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
  }, []);

  // Trigger sticky mobile bar as soon as user scrolls down 240px
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 240);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile gallery carousel ref and synchronization
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);

  const handleSelectImage = (idx: number) => {
    setSelectedImageIndex(idx);
    if (mobileCarouselRef.current) {
      const container = mobileCarouselRef.current;
      const targetScroll = idx * container.clientWidth;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const handleMobileScroll = () => {
    if (!mobileCarouselRef.current) return;
    const container = mobileCarouselRef.current;
    const width = container.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(container.scrollLeft / width);
      if (newIndex >= 0 && newIndex < images.length && newIndex !== selectedImageIndex) {
        setSelectedImageIndex(newIndex);
      }
    }
  };

  const handleMouseMoveZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (requiresSizeSelection && !selectedSize) {
      setSizeError('Please select a size before adding to bag.');
      if (sizeSelectorRef.current) {
        sizeSelectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setSizeError(null);
    if (isAdding) return;
    setIsAdding(true);
    // Circular loader effect on button before smoothly sliding out cart drawer
    setTimeout(() => {
      addToCart(product, quantity, {
        size: selectedSize || undefined,
        color: selectedColor || undefined,
        price: currentPrice,
      }, true);
      setIsAdding(false);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2200);
    }, 450);
  };

  const handleBuyNow = () => {
    if (requiresSizeSelection && !selectedSize) {
      setSizeError('Please select a size before proceeding to checkout.');
      if (sizeSelectorRef.current) {
        sizeSelectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setSizeError(null);
    // Navigate directly to checkout without opening the side cart drawer
    addToCart(product, quantity, {
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      price: currentPrice,
    }, false);
    router.push('/checkout');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewContent.trim() || !reviewName.trim()) {
      alert('Please complete all review fields.');
      return;
    }
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          customerName: reviewName.trim(),
          customerEmail: reviewEmail.trim() || undefined,
          rating: reviewRating,
          title: reviewTitle.trim(),
          content: reviewContent.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReviewSubmitted(true);
        setReviewTitle('');
        setReviewContent('');
        setReviewName('');
        setReviewEmail('');
      } else {
        alert(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Unable to submit review. Please check your connection and try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Stock status logic
  const stockCount = product.stock_quantity ?? 12;
  const isLowStock = stockCount <= 5;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 sm:space-y-12 font-sans bg-white text-[#141414] pb-32 lg:pb-12">
      
      {/* Modern Breadcrumbs: Sleek Mobile Capsule + Desktop Editorial */}
      <div className="flex sm:hidden items-center justify-between gap-2 pt-1">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f7f5f2] border border-[#eae7e2] text-xs font-bold text-[#141414] active:scale-95 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#b87414]" />
          <span>Collections</span>
        </Link>
        {product.category && (
          <Link
            href={`/category/${product.category.slug}`}
            className="text-[11px] font-bold text-[#b87414] bg-[#d99026]/10 px-3 py-1 rounded-full border border-[#d99026]/20 truncate max-w-[170px]"
          >
            {product.category.name}
          </Link>
        )}
      </div>

      <nav className="hidden sm:flex text-xs font-sans font-medium text-[#6b6b6b] items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <Link href="/" className="hover:text-[#b87414] transition shrink-0">Atelier Home</Link>
        <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
        <Link href="/products" className="hover:text-[#b87414] transition shrink-0">Collections</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
            <Link href={`/category/${product.category.slug}`} className="hover:text-[#b87414] transition shrink-0">
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
        <span className="text-[#141414] truncate font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14">
        
        {/* LEFT: Multi-Image Gallery with Hover-Zoom & Mobile Smooth Swipe (6 Columns) */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          
          {/* Vertical Thumbnail Strip on Desktop / Horizontal on Mobile */}
          <div className="flex sm:flex-col gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-y-auto max-h-[600px] shrink-0 pb-1 sm:pb-0 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => handleSelectImage(idx)}
                className={`group relative shrink-0 rounded-xl sm:rounded-2xl p-0.5 border-2 transition-all cursor-pointer touch-manipulation active:scale-95 ${
                  idx === selectedImageIndex
                    ? 'border-[#d99026] ring-2 ring-[#d99026]/30 opacity-100 shadow-sm'
                    : 'border-[#eae7e2] hover:border-neutral-400 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View Image ${idx + 1}`}
              >
                <div className="relative w-14 h-20 sm:w-20 sm:h-28 rounded-[10px] sm:rounded-[14px] overflow-hidden bg-[#f7f5f2]">
                  <ExternalImage
                    src={img.image_url}
                    alt={img.alt_text || product.name}
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Featured Active Image / Carousel Area */}
          <div className="flex-1 flex flex-col gap-2.5 min-w-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#f7f5f2] border border-[#eae7e2] shadow-md group">
              
              {/* MOBILE VIEW: Native horizontal swipe-and-snap carousel */}
              <div
                ref={mobileCarouselRef}
                onScroll={handleMobileScroll}
                className="sm:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full"
                style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
              >
                {images.map((img, idx) => (
                  <div
                    key={img.id || idx}
                    className="min-w-full w-full shrink-0 snap-center relative aspect-[4/5] bg-[#f7f5f2]"
                  >
                    <ExternalImage
                      src={img.image_url}
                      alt={img.alt_text || product.name}
                      fill
                      priority={idx === 0}
                      className="object-cover object-center pointer-events-none"
                    />
                  </div>
                ))}
              </div>

              {/* DESKTOP VIEW: High-res Editorial Zoom Image */}
              <div
                className="hidden sm:block relative aspect-[3/4] overflow-hidden cursor-crosshair select-none"
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth >= 1024) setIsZooming(true);
                }}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMoveZoom}
              >
                <div
                  className="w-full h-full relative transition-transform duration-150 ease-out pointer-events-none"
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZooming ? 'scale(2.2)' : 'scale(1)',
                  }}
                >
                  <ExternalImage
                    src={currentImage.image_url}
                    alt={currentImage.alt_text || product.name}
                    fill
                    priority
                    className="object-cover object-center pointer-events-none"
                  />
                </div>
              </div>

              {/* Top-Left Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 z-20 pointer-events-none">
                {hasDiscount && (
                  <span className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {discountPercent}% Off
                  </span>
                )}
                {product.is_best_deal && !hasDiscount && (
                  <span className="bg-[#d99026] text-[#141414] text-[9px] font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>Special</span>
                  </span>
                )}
              </div>

              {/* Action Buttons top right */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-2 z-20">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#eae7e2] flex items-center justify-center shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer touch-manipulation ${
                    isFavorited ? 'text-rose-500' : 'text-[#141414] hover:text-rose-500'
                  }`}
                  title="Add to Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const res = addToCompare(product);
                    alert(res.message);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#eae7e2] flex items-center justify-center text-[#141414] hover:text-[#d99026] shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
                  title="Compare Ensemble"
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>

              {/* Prev / Next Floating Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIdx = (selectedImageIndex - 1 + images.length) % images.length;
                      handleSelectImage(prevIdx);
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white active:bg-[#eae7e2] text-[#141414] shadow-md border border-[#eae7e2] flex items-center justify-center transition active:scale-90 z-20 cursor-pointer touch-manipulation sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#141414]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIdx = (selectedImageIndex + 1) % images.length;
                      handleSelectImage(nextIdx);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white active:bg-[#eae7e2] text-[#141414] shadow-md border border-[#eae7e2] flex items-center justify-center transition active:scale-90 z-20 cursor-pointer touch-manipulation sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-[#141414]" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-3 z-20 pointer-events-none bg-black/65 backdrop-blur-sm text-white text-[10px] font-mono font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <span>{selectedImageIndex + 1}</span>
                  <span className="opacity-40">/</span>
                  <span>{images.length}</span>
                </div>
              )}

              {/* Hover Zoom Helper Pill (desktop only) */}
              <div className="hidden sm:block absolute bottom-3 right-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-black/70 text-white px-3 py-1 rounded-full backdrop-blur-sm z-20">
                Hover to magnify
              </div>
            </div>

            {/* Mobile Image Dot Indicators */}
            {images.length > 1 && (
              <div className="flex sm:hidden justify-center items-center gap-2 pt-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectImage(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer touch-manipulation ${
                      idx === selectedImageIndex ? 'w-6 bg-[#d99026]' : 'w-2 bg-neutral-300'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Product Information, Selectors & Purchasing (6 Columns) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          
          {/* Brand & Category Kicker */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b6b6b]">
            <span className="text-[#b87414] truncate max-w-[200px]">{product.brand?.name || 'CC Carvan Signature'}</span>
            <span className="shrink-0 font-mono text-[10px]">SKU: {product.sku || 'CCC-2026'}</span>
          </div>

          {/* Title - Editorial H1 */}
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141414] leading-snug">
            {product.name}
          </h1>

          {/* Rating Snapshot */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center text-[#d99026]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.average_rating || 5)
                      ? 'fill-current text-[#d99026]'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#141414]">
              {product.average_rating ? product.average_rating.toFixed(1) : '5.0'}
            </span>
            <span className="text-xs text-[#6b6b6b]">
              ({product.review_count || 16} Patron Reviews)
            </span>
          </div>

          {/* Dynamic Pricing & Stock Banner (Changes Live on Cut Selection) */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-[#f7f5f2] border border-[#eae7e2] shadow-2xs flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">
                  Retail Price
                </span>
              </div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="font-sans text-2xl sm:text-3xl font-black text-[#141414] transition-all">
                  {formatPrice(currentPrice)}
                </span>
                {hasDiscount && (
                  <span className="font-sans text-xs sm:text-sm text-[#6b6b6b] line-through font-normal">
                    {formatPrice(currentRegularPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              {isLowStock ? (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 sm:px-3.5 py-1 rounded-full uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 text-amber-700" /> Only {stockCount} left
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 sm:px-3.5 py-1 rounded-full uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" /> In Stock
                </span>
              )}
            </div>
          </div>

          {/* Compact Delivery Date Line */}
          <div className="flex items-center gap-2 text-xs text-[#141414] bg-white p-2.5 sm:p-3 rounded-xl border border-[#eae7e2]">
            <Truck className="w-4 h-4 text-[#d99026] shrink-0" />
            <span className="text-[11px] sm:text-xs leading-tight">
              <strong>Arrives by {deliveryDateString}</strong> with Express Courier Dispatch.
            </span>
          </div>

          {/* Short Excerpt */}
          {product.short_description && (
            <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed font-sans">
              {product.short_description}
            </p>
          )}

          {/* Real Color / Shade Display or Variant Selection with Instant Gallery Switching */}
          {realOptions.colors && realOptions.colors.length > 1 ? (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#141414]">
                <span>Available Color: <span className="text-[#b87414] font-bold tracking-normal normal-case ml-1">{selectedColor}</span></span>
                <span className="text-[10px] text-[#8c827a] font-medium normal-case">Select to view shade</span>
              </div>
              <div className="flex items-center gap-2">
                {realOptions.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (typeof c.imageIndex === 'number' && images[c.imageIndex]) {
                          handleSelectImage(c.imageIndex);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer touch-manipulation ${
                        isSelected
                          ? 'bg-[#141414] text-white border-[#141414] shadow-xs ring-2 ring-[#d99026]/40 scale-105'
                          : 'bg-[#f7f5f2] text-[#141414] border-[#eae7e2] hover:border-neutral-400'
                      }`}
                    >
                      {c.hex && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                      )}
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : realOptions.colorName ? (
            <div className="flex items-center gap-2 text-xs text-[#141414] pt-1">
              <span className="text-[#6b6b6b] font-medium">Color:</span>
              <span className="font-bold bg-[#f7f5f2] px-2.5 py-0.5 rounded-full border border-[#eae7e2] text-[#141414]">
                {realOptions.colorName}
              </span>
            </div>
          ) : null}

          {/* Product Fabric / Dimensions Badge (Product 1, 3, 8, 15) */}
          {realOptions.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#b87414] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#b87414]" />
              <span>{realOptions.badge}</span>
            </div>
          )}

          {/* Product 22: What's in the box breakdown */}
          {realOptions.boxItems && realOptions.boxItems.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf9f7] border border-[#eae7e2] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#141414] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#b87414]" />
                <span>What&apos;s in the box (9 Essential Cosmetic Deal)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {realOptions.boxItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#eae7e2]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium text-[#141414]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Measurement & Lighting Notices (Data Note C) */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#faf9f7] border border-[#eae7e2] text-[11px] text-[#6b6b6b] space-y-1">
            {realOptions.isClothing && (
              <p>
                • <strong>Measurement Notice:</strong> There might be an error of 1-3 cm due to manual measurement.
              </p>
            )}
            <p>
              • <strong>Color Variance:</strong> Slight color differences may occur as a result of varying lighting and monitor effects.
            </p>
          </div>

          {/* Real Sizes / Dimensions / Capacity Selector (ONLY if product has sizes!) */}
          {realOptions.sizes && realOptions.sizes.length > 0 && (
            <div 
              ref={sizeSelectorRef}
              className={`space-y-2.5 p-3 rounded-2xl transition-all ${
                sizeError 
                  ? 'bg-rose-50/70 border-2 border-rose-400 ring-2 ring-rose-400/20' 
                  : 'bg-transparent border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#141414]">
                <span className="flex items-center gap-1.5">
                  <span>{realOptions.sizeLabel || 'Select Size:'}</span>
                  {requiresSizeSelection && <span className="text-rose-600 font-bold">*</span>}
                </span>
                {realOptions.hasSizeGuide && (
                  <button 
                    type="button"
                    onClick={() => setSizeModalOpen(true)}
                    className="text-[#b87414] hover:text-[#d99026] hover:underline inline-flex items-center gap-1.5 cursor-pointer font-bold normal-case tracking-normal text-xs"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Chart</span>
                  </button>
                )}
              </div>

              {/* Validation Warning Alert */}
              {sizeError && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-100/90 text-rose-800 text-xs font-bold border border-rose-200 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{sizeError}</span>
                </div>
              )}

              {/* Real Size buttons */}
              <div className="flex flex-wrap gap-2.5">
                {realOptions.sizes.map((s) => {
                  const isSelected = selectedSize === s.name;
                  const isOutOfStock = Boolean(product.size_stock && typeof product.size_stock[s.name] === 'number' && product.size_stock[s.name] <= 0);
                  return (
                    <button
                      key={s.name}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => {
                        if (isOutOfStock) return;
                        setSelectedSize(s.name);
                        setSizeError(null);
                      }}
                      className={`py-2 px-4 rounded-xl text-center border transition-all cursor-pointer touch-manipulation flex flex-col items-center justify-center min-w-[54px] min-h-[44px] ${
                        isOutOfStock
                          ? 'opacity-40 cursor-not-allowed bg-slate-100 line-through border-slate-200 text-slate-400'
                          : isSelected
                            ? 'bg-[#141414] text-white border-[#141414] shadow-md ring-2 ring-[#d99026]/50'
                            : 'bg-[#f7f5f2] text-[#141414] border-[#eae7e2] hover:border-neutral-400 hover:bg-white active:bg-[#e4e0d8]'
                      }`}
                    >
                      <span className="font-bold text-xs leading-tight block">
                        {s.name}
                      </span>
                      {s.detail && (
                        <span className={`text-[10px] mt-0.5 block font-medium ${
                          isSelected ? 'text-[#d99026]' : 'text-[#7a7a7a]'
                        }`}>
                          {s.detail}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected size summary */}
              {selectedSize ? (
                <div className="text-[11px] text-[#6b6b6b] bg-[#f7f5f2] px-3 py-1.5 rounded-lg border border-[#eae7e2] flex items-center justify-between">
                  <span>
                    Selected Size: <strong className="text-[#141414] font-bold">{selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSizeModalOpen(true)}
                    className="text-[11px] text-[#b87414] hover:underline font-bold"
                  >
                    View Dimensions
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {/* Quantity Stepper & Dual Action Buttons */}
          <div ref={mainCtaRef} className="space-y-3 pt-3 border-t border-[#eae7e2]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#eae7e2] rounded-xl p-1 bg-[#f7f5f2] shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-[#141414] hover:bg-white text-base font-bold transition cursor-pointer touch-manipulation"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setQuantity(isNaN(val) || val < 1 ? 1 : val);
                  }}
                  className="w-9 sm:w-11 text-center font-bold text-xs text-[#141414] bg-transparent outline-hidden [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-[#141414] hover:bg-white text-base font-bold transition cursor-pointer touch-manipulation"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary CTA: Add to Bag */}
              <button
                type="button"
                disabled={isAdding}
                onClick={handleAddToCart}
                className="flex-1 bg-[#d99026] hover:bg-[#c67d18] active:bg-[#b87414] text-[#141414] font-bold text-xs uppercase tracking-[0.14em] py-3.5 px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer touch-manipulation disabled:opacity-85"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#141414]" />
                    <span>Adding to Bag...</span>
                  </>
                ) : addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#141414]" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary CTA: Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full bg-[#141414] hover:bg-[#262626] active:bg-[#333333] text-white font-bold text-xs uppercase tracking-[0.14em] py-3.5 px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer touch-manipulation"
            >
              <span>Buy Now — Instant Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Badges Row (Compact, No text crushing) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-[#eae7e2] text-center font-sans">
            <div className="p-2 sm:p-3 rounded-xl bg-[#f7f5f2] border border-[#eae7e2] flex flex-col items-center justify-center">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#b87414] mb-1" />
              <span className="font-bold text-[10px] sm:text-xs text-[#141414] block leading-tight">100% Authentic</span>
              <span className="text-[9px] text-[#7a7a7a] mt-0.5 block leading-tight">Pure Silks</span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-[#f7f5f2] border border-[#eae7e2] flex flex-col items-center justify-center">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-[#b87414] mb-1" />
              <span className="font-bold text-[10px] sm:text-xs text-[#141414] block leading-tight">7-Day Returns</span>
              <span className="text-[9px] text-[#7a7a7a] mt-0.5 block leading-tight">Easy Exchange</span>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-[#f7f5f2] border border-[#eae7e2] flex flex-col items-center justify-center">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#b87414] mb-1" />
              <span className="font-bold text-[10px] sm:text-xs text-[#141414] block leading-tight">Cash on Delivery</span>
              <span className="text-[9px] text-[#7a7a7a] mt-0.5 block leading-tight">Nationwide</span>
            </div>
          </div>

        </div>

      </div>

      {/* Description Tabs Section */}
      <div className="bg-white border border-[#eae7e2] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xs space-y-6 sm:space-y-8">
        {/* Modern Segmented Navigation Tabs */}
        <div className="p-1 sm:p-1.5 bg-[#f7f5f2] border border-[#eae7e2] rounded-2xl flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
              activeTab === 'details'
                ? 'bg-[#141414] text-white shadow-sm'
                : 'text-[#6b6b6b] hover:text-[#141414] active:bg-[#e4e0d8]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d99026]" />
            <span>Design & Fabric</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fabric')}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
              activeTab === 'fabric'
                ? 'bg-[#141414] text-white shadow-sm'
                : 'text-[#6b6b6b] hover:text-[#141414] active:bg-[#e4e0d8]'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-[#d99026]" />
            <span>Artisan Craft</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shipping')}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
              activeTab === 'shipping'
                ? 'bg-[#141414] text-white shadow-sm'
                : 'text-[#6b6b6b] hover:text-[#141414] active:bg-[#e4e0d8]'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-[#d99026]" />
            <span>Shipping</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
              activeTab === 'reviews'
                ? 'bg-[#141414] text-white shadow-sm'
                : 'text-[#6b6b6b] hover:text-[#141414] active:bg-[#e4e0d8]'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-[#d99026]" />
            <span>Reviews ({productReviews.length > 0 ? productReviews.length : (product.review_count || 16)})</span>
          </button>
          {(product.has_sizes || realOptions.hasSizeGuide) && (
            <button
              type="button"
              onClick={() => setActiveTab('sizechart')}
              className={`flex-1 min-w-[130px] sm:min-w-0 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
                activeTab === 'sizechart'
                  ? 'bg-[#141414] text-white shadow-sm'
                  : 'text-[#6b6b6b] hover:text-[#141414] active:bg-[#e4e0d8]'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-[#d99026]" />
              <span>Size Chart</span>
            </button>
          )}
        </div>

        {/* Tab Content 1: Design Details */}
        {activeTab === 'details' && (
          <div className="space-y-6 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed font-sans max-w-4xl">
            <div className="text-[#141414] whitespace-pre-line leading-relaxed font-sans text-xs sm:text-sm bg-[#faf9f7] p-4 sm:p-6 rounded-2xl border border-[#eae7e2]">
              {product.full_description || product.short_description || 'This ensemble represents the pinnacle of contemporary Pakistani high fashion. Designed by master artisans, every cut is sculpted to provide an effortless drape and royal silhouette.'}
            </div>

            {/* Embedded YouTube Short Showcase if available */}
            {product.full_description?.includes('youtube.com/shorts/') && (() => {
              const match = product.full_description.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
              const videoId = match ? match[1] : null;
              if (!videoId) return null;
              return (
                <div className="p-5 rounded-2xl bg-neutral-950 text-white border border-neutral-800 shadow-xl">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-[#d99026]">
                    <Sparkles className="w-4 h-4 text-[#d99026]" />
                    <span>Official Product Video Showcase</span>
                  </div>
                  <div className="aspect-[9/16] max-w-[280px] sm:max-w-[320px] mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={product.name}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Tab Content 2: Fabric & Care */}
        {activeTab === 'fabric' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed max-w-4xl font-sans">
            <p className="text-[#141414]">
              Every motif is drawn by hand by master calligraphy artisans in Lahore. Using traditional karchob embroidery frames, pure metallic tilla, zardozi wires, and glass cut-dana beads are individually stitched by generational craftsmen.
            </p>
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f7f5f2] border border-[#eae7e2] space-y-2">
              <strong className="text-[#141414] block font-bold">Preservation Guidelines:</strong>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#6b6b6b]">
                <li>Professional dry clean only with hydrocarbon solvent.</li>
                <li>Store wrapped in natural unbleached muslin cloth away from direct sunlight.</li>
                <li>Iron on low heat over a protective cotton press cloth; avoid steam directly on zardozi threads.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content 3: Shipping & Returns */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#6b6b6b] leading-relaxed max-w-4xl font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f7f5f2] border border-[#eae7e2]">
                <strong className="text-[#141414] block mb-1 font-bold">Nationwide Courier Express:</strong>
                Dispatched via TCS / Leopards Express. Standard delivery takes 2 to 3 business days across Karachi, Lahore, Islamabad, and all major cities.
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f7f5f2] border border-[#eae7e2]">
                <strong className="text-[#141414] block mb-1 font-bold">7-Day Easy Return Policy:</strong>
                If the silhouette or fabric does not meet your discerning expectations, initiate an exchange or return within 7 days of parcel receipt.
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Reviews & Rating Breakdown */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 sm:space-y-8 max-w-4xl font-sans">
            
            {/* Rating Breakdown Bar */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#f7f5f2] border border-[#eae7e2] flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="text-center sm:text-left shrink-0">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#141414] block">
                  {product.average_rating ? product.average_rating.toFixed(1) : '4.9'}
                </span>
                <div className="flex items-center text-[#d99026] my-1 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#d99026]" />
                  ))}
                </div>
                <span className="text-xs text-[#6b6b6b]">Based on 16 patron reviews</span>
              </div>

              <div className="flex-1 w-full space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[#6b6b6b]">5 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                    <div className="h-full bg-[#d99026] w-[88%]" />
                  </div>
                  <span className="w-8 text-right font-medium text-[#141414]">88%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[#6b6b6b]">4 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                    <div className="h-full bg-[#d99026] w-[12%]" />
                  </div>
                  <span className="w-8 text-right font-medium text-[#141414]">12%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[#6b6b6b]">3 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                    <div className="h-full bg-[#d99026] w-[0%]" />
                  </div>
                  <span className="w-8 text-right font-medium text-[#141414]">0%</span>
                </div>
              </div>
            </div>

            {/* Verified Patron Reviews List */}
            <div className="space-y-4 pt-2 border-t border-[#eae7e2]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#141414]">Patron Testimonials & Reviews</h4>
                  <p className="text-xs text-[#6b6b6b]">Genuine feedback from verified collectors across Pakistan</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-[#f7f5f2] border border-[#eae7e2] rounded-full text-[#b87414]">
                  {productReviews.length} Verified {productReviews.length === 1 ? 'Review' : 'Reviews'}
                </span>
              </div>

              {isLoadingReviews ? (
                <div className="p-8 text-center bg-[#f7f5f2] rounded-2xl border border-[#eae7e2] flex items-center justify-center gap-2 text-xs text-[#6b6b6b]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#d99026]" />
                  <span>Loading atelier reviews...</span>
                </div>
              ) : productReviews.length === 0 ? (
                <div className="p-6 text-center bg-[#f7f5f2] rounded-2xl border border-[#eae7e2] space-y-1">
                  <p className="text-xs font-bold text-[#141414]">No published reviews yet</p>
                  <p className="text-xs text-[#6b6b6b]">Be the first patron to share your styling experience with this piece.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 sm:p-5 rounded-2xl bg-[#f7f5f2] border border-[#eae7e2] space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#141414]">{rev.customer_name || 'Anonymous Patron'}</span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Verified Patron
                            </span>
                          </div>
                          <div className="flex items-center text-[#d99026] my-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < (rev.rating || 5) ? 'fill-current text-[#d99026]' : 'text-neutral-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-[11px] text-[#6b6b6b]">
                          {rev.created_at ? new Date(rev.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                        </span>
                      </div>
                      {rev.title && (
                        <h5 className="text-xs font-bold text-[#141414]">{rev.title}</h5>
                      )}
                      <p className="text-xs text-[#4a4a4a] leading-relaxed whitespace-pre-line">{rev.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Form */}
            {reviewSubmitted ? (
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Review Submitted for Moderation</span>
                </div>
                <p className="text-emerald-700">
                  Thank you for your review. Your verified patron feedback has been recorded and will appear on this page once approved by our atelier team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="p-4 sm:p-6 rounded-2xl bg-white border border-[#eae7e2] space-y-3 sm:space-y-4 shadow-xs">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#141414]">Write a Patron Review</h4>
                  <p className="text-xs text-[#6b6b6b]">Share your impressions on craftsmanship, fit, fabric texture, and courier delivery</p>
                </div>
                
                {/* Rating selection */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-[#141414] mr-2">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating ? 'fill-current text-[#d99026]' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="text-xs p-3 rounded-xl bg-[#f7f5f2] border border-[#eae7e2] text-[#141414] placeholder-[#6b6b6b] outline-hidden focus:border-[#d99026]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={reviewEmail}
                    onChange={(e) => setReviewEmail(e.target.value)}
                    className="text-xs p-3 rounded-xl bg-[#f7f5f2] border border-[#eae7e2] text-[#141414] placeholder-[#6b6b6b] outline-hidden focus:border-[#d99026]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Review Headline (e.g. Pure Luxury) *"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="text-xs p-3 rounded-xl bg-[#f7f5f2] border border-[#eae7e2] text-[#141414] placeholder-[#6b6b6b] outline-hidden focus:border-[#d99026]"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your experience regarding fabric feel, embroidery finesse, and delivery speed..."
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-[#f7f5f2] border border-[#eae7e2] text-[#141414] placeholder-[#6b6b6b] outline-hidden focus:border-[#d99026]"
                />
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="inline-flex items-center justify-center gap-2 bg-[#d99026] hover:bg-[#c67d18] disabled:opacity-50 text-[#141414] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-sm cursor-pointer transition active:scale-98"
                >
                  {isSubmittingReview ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Patron Review</span>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab Content 5: Size Chart & Dimensions Table */}
        {activeTab === 'sizechart' && (
          <div className="space-y-6 max-w-4xl font-sans">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#141414]">Standard Size Chart & Garment Dimensions</h3>
              <p className="text-xs text-[#6b6b6b] mt-0.5">
                All measurements are tailored in inches. Standard Pakistani tailoring tolerances apply (±0.5 inch).
              </p>
            </div>
            {renderSizeChartTables(product)}
          </div>
        )}
      </div>

      {/* "You May Also Like" Related Creations (Responsive 2 cols on mobile) */}
      {relatedProducts.length > 0 && (
        <section className="space-y-5 sm:space-y-8 pt-4 sm:pt-8 border-t border-[#eae7e2]">
          <div className="flex items-center justify-between pb-3 border-b border-[#eae7e2]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b87414]">
                Coordinated Capsule
              </span>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#141414] mt-0.5">
                You May Also Like
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] hover:text-[#b87414] transition"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {sizeModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="fixed inset-0 cursor-pointer"
            onClick={() => setSizeModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-[#eae7e2] space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between pb-3 border-b border-[#eae7e2]">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#d99026]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#141414]">CC Carvan Atelier Sizing Guide</h3>
              </div>
              <button
                type="button"
                onClick={() => setSizeModalOpen(false)}
                className="p-1.5 rounded-full text-[#6b6b6b] hover:text-[#141414] hover:bg-[#f7f5f2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6b6b6b]">
              All measurements are in inches. Standard Pakistani tailoring tolerances apply (±0.5 inch).
            </p>

            {renderSizeChartTables(product)}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSizeModalOpen(false)}
                className="bg-[#141414] hover:bg-[#262626] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Sticky Mobile Buy Bar (Triggered on scroll) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#eae7e2] px-3.5 py-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.1)] transition-all duration-300 ${
        showStickyBar ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-10 h-12 rounded-xl overflow-hidden bg-[#f7f5f2] shrink-0 border border-[#eae7e2] shadow-xs">
              <ExternalImage src={currentImage.image_url} alt={product.name} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#141414] truncate leading-tight">{product.name}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-black text-[#141414]">
                  {formatPrice(currentPrice)}
                </span>
                {selectedSize && (
                  <span className="text-[10px] text-[#b87414] bg-[#d99026]/15 font-bold px-1.5 py-0.5 rounded-md truncate max-w-[90px]">
                    {selectedSize}
                  </span>
                )}
                {selectedColor && (
                  <span className="text-[10px] text-neutral-600 bg-neutral-100 font-medium px-1.5 py-0.5 rounded-md truncate max-w-[90px]">
                    {selectedColor}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={isAdding}
              onClick={handleAddToCart}
              className="bg-[#f7f5f2] hover:bg-[#eae7e2] active:bg-[#e4e0d8] text-[#141414] font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl border border-[#eae7e2] flex items-center gap-1.5 shadow-2xs cursor-pointer touch-manipulation transition-colors disabled:opacity-85"
            >
              {isAdding ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#b87414]" />
              ) : (
                <ShoppingBag className="w-3.5 h-3.5 text-[#b87414]" />
              )}
              <span>{isAdding ? 'Adding...' : 'Bag'}</span>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="bg-[#141414] hover:bg-[#262626] active:bg-[#333333] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-3.5 rounded-xl shadow-sm cursor-pointer touch-manipulation flex items-center gap-1 transition-colors"
            >
              <span>Buy</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
