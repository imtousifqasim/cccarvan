# ==============================================================================
# CC CARVAN — COMPLETE PROJECT MEMORY & MASTER SYSTEM CONTEXT
# ==============================================================================
# Document Version: 2.0.0
# Purpose: Master context for AI agents & developers when migrating across machines.
# Project: CC Carvan (cccarvan.com - High-Performance Luxury E-Commerce Platform)
# Target Market: Pakistan (Currency: PKR)
# ==============================================================================

## 1. PROJECT OVERVIEW & CORE IDENTITY
- **Brand Name:** CC Carvan (`cccarvan` workspace)
- **Primary Domain:** `cccarvan.com`
- **Application Type:** Production-grade full-stack luxury E-Commerce platform with an integrated custom Admin Dashboard, Hostinger MySQL & dual-shard database infrastructure, automated order management, email notification system, and zero-storage media routing.
- **Primary Locale:** Pakistan (Cash on Delivery, Bank Transfer, EasyPaisa, JazzCash, Nayapay, SadaPay).
- **Core Currency:** PKR (`₨`).
- **Support Email:** `support@cccarvan.com` / `concierge@cccarvan.com`

---

## 2. TECHNOLOGY STACK & CORE DEPENDENCIES
- **Framework:** Next.js 16.3.4 (App Router, Server Components, Route Handlers, Server Actions)
- **Runtime & React:** React 19.2.8 & React DOM 19.2.8
- **Language:** TypeScript 5 (Strict Mode)
- **Styling & Design System:** Tailwind CSS v4 (`@tailwindcss/postcss`), modern dark/light luxury brand aesthetics, glassmorphism, responsive mobile-first layouts.
- **Icons:** `lucide-react` (v1.44.0)
- **Database & Backend:** Dual-Supabase PostgreSQL Instances (Sharded & Auto-failover)
- **Database Drivers:** `@supabase/supabase-js` (v2.109.0), `@supabase/ssr` (v0.12.7), `ws` (v8.21.3)
- **Validation:** `zod` (v4.6.2)
- **Security & Cryptography:** `bcryptjs` (v3.0.3), custom JWT session signatures with SHA-256 HMAC, TOTP 2FA (`lib/auth/totp.ts`)
- **Email Engine:** `nodemailer` (v10.0.9) with custom HTML luxury branded responsive templates

---

## 3. ARCHITECTURE & REPOSITORY DIRECTORY LAYOUT

```
faizan/
├── app/
│   ├── (storefront)/         # Customer-facing storefront routes
│   │   ├── page.tsx          # Homepage (Hero slider, featured, categories, best deals)
│   │   ├── products/         # Product catalog, filters, pagination
│   │   ├── product/[slug]/   # High-converting product detail page
│   │   ├── category/[slug]/  # Category-specific product listings
│   │   ├── cart/             # Interactive shopping cart
│   │   ├── checkout/         # Streamlined checkout with COD & Bank options
│   │   ├── order-success/    # Post-order confirmation & receipt
│   │   ├── tracking/         # Live order tracking lookup
│   │   └── account/          # Customer portal (profile, orders, addresses)
│   ├── admin/                # Full custom Admin Portal
│   │   ├── login/            # Secure admin login (rate limited, 2FA enabled)
│   │   ├── layout.tsx        # Admin sidebar navigation & status metrics
│   │   ├── page.tsx          # Dashboard overview & analytics
│   │   ├── orders/           # Order management, fulfillment, status history
│   │   ├── products/         # Catalog CRUD, multi-image manager, variants
│   │   ├── coupons/          # Coupon generator, limits, usage metrics
│   │   ├── customers/        # Customer directory & order history
│   │   ├── subscribers/      # Newsletter subscriber management
│   │   ├── settings/         # Global store settings & shipping rates
│   │   └── shard/            # Dual-Supabase health monitor & manual switch
│   ├── api/                  # RESTful API route handlers
│   │   ├── admin/            # Protected admin endpoints (JWT verified)
│   │   ├── auth/             # Customer authentication endpoints
│   │   ├── checkout/         # Order creation & coupon validation
│   │   ├── coupons/          # Coupon validation & listing
│   │   ├── orders/           # Order lookup & submission
│   │   ├── products/         # Product catalog & search
│   │   ├── reviews/          # Customer product reviews
│   │   ├── shipping/         # Shipping rates & calculations
│   │   └── tracking/         # Public order tracking
│   ├── layout.tsx            # Root application layout
│   └── globals.css           # Global Tailwind v4 styles & design tokens
├── components/               # Reusable UI component library
│   ├── storefront/           # Navbar, Footer, ProductCard, CartDrawer, etc.
│   ├── admin/                # AdminTable, MetricCard, ShardMonitor, etc.
│   └── ui/                   # Buttons, Inputs, Modals, Badges, Loaders
├── lib/                      # Core business logic & infrastructural utilities
│   ├── auth/                 # Admin & customer auth, tokens, TOTP 2FA
│   │   ├── admin.ts          # Admin session verification & brute-force protection
│   │   ├── customer.ts       # Customer auth helper
│   │   ├── token.ts          # HMAC-SHA256 session token generation & verification
│   │   └── totp.ts           # Time-based One-Time Password 2FA logic
│   ├── supabase/             # Multi-shard Supabase orchestration
│   │   ├── sharding.ts       # DUAL-SHARD MANAGER (Primary vs Secondary routing)
│   │   ├── admin.ts          # Service-role admin client
│   │   ├── client.ts         # Browser-side Supabase client
│   │   └── server.ts         # Server-side Supabase SSR client
│   ├── image-resolver.ts     # External high-res image proxy & CDN resolver
│   └── utils.ts              # Formatting, currency helpers (PKR), classnames
├── repositories/             # Data access layer (Decoupled from UI & routing)
│   ├── product.repository.ts # Products, variants, images, categories
│   ├── order.repository.ts   # Orders, snapshots, order status history
│   ├── coupon.repository.ts  # Coupon validation, decrement, limits
│   ├── newsletter.repository.ts # Newsletter subscription repository
│   ├── settings.repository.ts # Site settings, shipping rates, announcements
│   └── database.repository.ts # Direct cross-shard queries & health diagnostics
├── services/                 # Complex business workflows
│   ├── checkout.service.ts   # Checkout transaction, stock locks, order generation
│   └── email.service.ts      # Branded transactional emails via Nodemailer
├── supabase/
│   └── migrations/           # PostgreSQL DDL migrations & schemas
├── types/
│   └── database.ts           # Strict TypeScript interfaces matching all tables
└── scripts/                  # 35+ maintenance, seeding, migration & audit scripts
```

---

## 4. DUAL-SUPABASE SHARDING ARCHITECTURE (`lib/supabase/sharding.ts`)

### Why Multi-Sharding?
Supabase free tier provides 500 MB database limits per project. To achieve zero-cost indefinite scalability and high availability, this project implements a proprietary **Dual-Shard failover & overflow architecture**:

1. **Shard 1 (Primary):**
   - URL: `https://xniwqtjzngpxnmktnxvi.supabase.co`
   - Role: Default write target for orders, products, customers, and coupons.
2. **Shard 2 (Standby / Auto-Failover):**
   - URL: `https://aimrsvjfaeccfxskiqrt.supabase.co`
   - Role: Automatically takes over writes when Shard 1 hits **490 MB** (`NEXT_PUBLIC_SHARD_MAX_MB=490`).
3. **Resilient Parallel Reads:**
   - Functions like `queryDualShards()` execute queries on both Shards simultaneously.
   - If one Shard is slow, unavailable, or empty, the application transparently serves data from the surviving Shard without 500 crashes.
4. **Zero-Storage Policy for Media:**
   - **CRITICAL RULE:** Neither Shard uses Supabase Storage buckets (which consume database storage limits).
   - All product images, category banners, and slides use external CDN URLs (e.g., PostImages, Cloudinary, AWS S3 external links).

---

## 5. COMPLETE DATABASE SCHEMA & TABLES

All tables are defined in PostgreSQL with Row Level Security (RLS) enabled.

### 1. `public.profiles`
- Customer and admin user profiles linked to Supabase Auth or internal auth.
- Columns: `id` (UUID PK), `email` (TEXT UNIQUE), `full_name` (TEXT), `phone` (TEXT), `role` (`'customer' | 'manager' | 'admin' | 'super_admin'`), `created_at`, `updated_at`.

### 2. `public.addresses`
- Shipping and billing addresses for customers.
- Columns: `id` (UUID PK), `customer_id` (FK profiles), `first_name`, `last_name`, `company`, `phone`, `email`, `address_line1`, `address_line2`, `city`, `province`, `postal_code`, `country` (default `'Pakistan'`), `address_type` (`'shipping' | 'billing' | 'both'`), `is_default_shipping`, `is_default_billing`.

### 3. `public.categories` & `public.brands`
- Category and brand taxonomy.
- Columns: `id` (UUID PK), `name`, `slug` (UNIQUE), `description`, `image_url` (External URL only), `parent_id` (Self FK), `sort_order`, `is_active`, `seo_title`, `seo_description`.

### 4. `public.products`
- Master catalog table.
- Columns: `id` (UUID PK), `name`, `slug` (UNIQUE), `sku` (UNIQUE), `short_description`, `full_description`, `regular_price` (NUMERIC), `sale_price` (NUMERIC), `cost_price` (NUMERIC), `stock_quantity` (INT), `stock_status` (`'in_stock' | 'low_stock' | 'out_of_stock'`), `low_stock_threshold` (INT default 5), `category_id` (FK), `brand_id` (FK), `weight`, `dimensions`, `is_featured`, `is_best_deal`, `is_new_arrival`, `is_popular`, `is_published` (BOOLEAN), `view_count`, `seo_title`, `seo_description`.

### 5. `public.product_images`
- Product photo gallery (Strictly External URLs).
- Columns: `id` (UUID PK), `product_id` (FK products ON DELETE CASCADE), `image_url` (TEXT NOT NULL), `alt_text`, `sort_order`, `is_primary` (BOOLEAN), `caption`.

### 6. `public.product_variants` & `public.product_attributes`
- SKU-level variants (e.g. Size, Color, Edition).
- Columns: `id` (UUID PK), `product_id` (FK), `sku` (UNIQUE), `variant_name`, `price`, `stock_quantity`, `attributes` (JSONB), `is_active`.

### 7. `public.orders`
- Master transactional orders table.
- Columns:
  - `id` (UUID PK)
  - `order_number` (TEXT UNIQUE) — Generated via sequence (e.g. `MFE-20260911-0001`)
  - `customer_id` (FK profiles NULLABLE for guests)
  - `customer_email`, `customer_phone`, `customer_name`
  - `subtotal`, `discount_amount`, `shipping_amount`, `grand_total`
  - `coupon_code` (TEXT)
  - `status` (`'pending' | 'processing' | 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'completed' | 'cancelled' | 'failed' | 'refunded'`)
  - `payment_method` (`'cod' | 'bank_transfer' | 'jazzcash' | 'easypaisa' | 'nayapay' | 'sadapay'`)
  - `payment_status` (`'unpaid' | 'paid' | 'partially_paid' | 'refunded'`)
  - `courier_id` (FK couriers), `tracking_id`, `tracking_url`, `notes`
  - `created_at`, `updated_at`

### 8. `public.order_items` (Historical Snapshots)
- Immutable product purchase record at the exact moment of order placement.
- Columns: `id` (UUID PK), `order_id` (FK orders ON DELETE CASCADE), `product_id` (FK), `variant_id` (FK), `product_name`, `sku`, `unit_price`, `quantity`, `subtotal`, `image_url`.

### 9. `public.order_addresses`
- Snapshot of shipping and billing addresses for each order.
- Columns: `id`, `order_id`, `address_type`, `first_name`, `last_name`, `phone`, `email`, `address_line1`, `address_line2`, `city`, `province`, `postal_code`, `country`.

### 10. `public.order_status_history` & `public.order_notes`
- Comprehensive audit trail for tracking status changes and internal administrative comments.

### 11. `public.coupons` & `public.coupon_usage`
- Discount management system.
- Columns: `id`, `code` (UNIQUE), `description`, `discount_type` (`'percentage' | 'fixed_amount'`), `discount_value`, `minimum_spend`, `maximum_discount`, `start_date`, `end_date`, `usage_limit`, `usage_limit_per_customer`, `is_active`.

### 12. `public.reviews`
- Customer product feedback and rating (1 to 5 stars) with admin moderation workflow (`'pending' | 'approved' | 'rejected' | 'hidden'`).

### 13. `public.hero_slides`, `public.advantages`, `public.announcements`
- CMS tables controlling the dynamic homepage hero carousel, value propositions, and top notification bar.

### 14. `public.payment_methods` & `public.couriers`
- Configurable payment instructions (Bank account IBANs, mobile wallet accounts) and courier dispatch tracking templates (TCS, Leopards, M&P, Post).

### 15. `public.site_settings`, `public.notification_settings`, `public.audit_logs`
- Global key-value settings (`JSONB`), email notification toggle flags, and administrative activity auditing.

---

## 6. COMPLETE API ENDPOINT REFERENCE

### STOREFRONT & PUBLIC APIS
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/checkout` | Process order checkout, validates stock & coupons, sends order confirmation email |
| `POST` | `/api/orders` | Create an order directly |
| `GET` | `/api/orders` | Retrieve order history for logged-in customer |
| `GET` | `/api/products/search` | Search products by keyword, category, price, stock |
| `GET` | `/api/coupons/active` | Fetch active promo codes currently applicable |
| `POST` | `/api/coupons/validate` | Check if a coupon is valid for a specific cart total |
| `POST` | `/api/newsletter/subscribe`| Add email to newsletter subscribers list |
| `GET, POST`| `/api/reviews` | Fetch approved product reviews / submit new review |
| `GET, POST`| `/api/shipping` | Fetch or calculate shipping rates by city/province |
| `GET, POST`| `/api/tracking/lookup` | Live tracking status for a specific Order ID / Tracking ID |
| `GET` | `/api/payment-methods` | List active payment instructions (Bank details, COD) |
| `POST` | `/api/auth/customer/login` | Authenticate customer session |
| `POST` | `/api/auth/customer/register`| Register new customer account |
| `POST` | `/api/auth/customer/logout`| Clear customer session cookie |
| `GET` | `/api/auth/customer/me` | Current authenticated customer profile |
| `GET` | `/api/auth/customer/orders` | Customer's past orders |
| `GET, POST`| `/api/auth/customer/addresses`| Customer address book CRUD |
| `POST` | `/api/auth/customer/update-profile`| Update customer name/phone |
| `POST` | `/api/auth/customer/security`| Update customer password |

### ADMIN APIS (Requires Admin JWT Session Cookie)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/auth/login` | Admin login with brute-force rate limiter & TOTP check |
| `POST` | `/api/admin/auth/logout` | Destroy admin session cookie |
| `GET` | `/api/admin/auth/profile` | Retrieve admin user info |
| `POST` | `/api/admin/auth/password` | Change admin password |
| `POST` | `/api/admin/auth/2fa` | Setup / verify / toggle TOTP two-factor authentication |
| `POST` | `/api/admin/auth/forgot-password`| Send admin password reset token |
| `POST` | `/api/admin/auth/reset-password`| Reset password using token |
| `GET, POST`| `/api/admin/products` | Paginated product list / create new product |
| `GET, PUT, DELETE`| `/api/admin/products/[id]`| View, update, or soft-delete a product |
| `GET, PUT` | `/api/admin/orders` | Order management list |
| `GET, PUT` | `/api/admin/orders/[id]` | View order details, update status, add tracking info |
| `GET, POST, DELETE`| `/api/admin/coupons` | Coupon management |
| `GET` | `/api/admin/customers` | Customer listing & lifetime value metrics |
| `GET, DELETE`| `/api/admin/subscribers`| Newsletter subscriber management |
| `GET, POST`| `/api/admin/announcement`| Update top announcement banner message |
| `GET, POST`| `/api/admin/payment-methods`| Enable/disable payment methods, edit IBANs |
| `GET, PUT` | `/api/admin/reviews` | Review moderation (Approve, reject, feature) |
| `GET, POST`| `/api/admin/settings/shipping`| Shipping tier rates configuration |
| `GET, POST`| `/api/admin/shard` | Inspect Dual-Shard health, table counts, switch active write target |
| `POST` | `/api/admin/email-preview`| Preview HTML email templates in real-time |

---

## 7. AUTHENTICATION & SECURITY SYSTEM

### 1. Admin Authentication:
- Session Cookie: `mfe_admin_session` (HTTP-only, Secure, SameSite=Lax).
- Token Protocol: Custom tamper-proof HMAC-SHA256 token signed with `ADMIN_JWT_SECRET`.
- Admin Username: `mfe_admin` (Defined in `.env.local`).
- Password Hashing: `bcrypt` (10 rounds).
- Rate Limiting: Max 5 failed attempts per IP within 15 minutes, triggering an automatic 15-minute lockout (`lib/auth/admin.ts`).
- Middleware Gatekeeper: `middleware.ts` intercepts all `/admin/*` routes, redirecting unauthenticated requests to `/admin/login`.

### 2. Customer Authentication:
- Independent customer sessions stored via cookie, allowing guest checkouts or account management.

---

## 8. SENSITIVE CREDENTIALS & GITHUB POLICY

### WHAT MUST NEVER BE PUSHED TO GITHUB:
1. `.env.local` / `.env` (Contains production database service keys, admin credentials, JWT secrets).
2. `.vercel` (Deployment session tokens).
3. `node_modules/` & `.next/` (Build artifacts).
4. Any private backup files matching `*.private.*` or `SECRETS_TRANSFER_PACKAGE*`.

### WHAT IS PUSHED TO GITHUB:
- Full application source code (`app/`, `components/`, `lib/`, `repositories/`, `services/`, `types/`, `public/`).
- `supabase/migrations/` (SQL schemas and initial structures).
- `.env.example` (Safe environment variable template with dummy values).
- `PROJECT_MEMORY.md` (This master architectural context).
- `package.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`.

---

## 9. HOW TO RUN ON A NEW PC (QUICK SETUP)

1. **Clone or Copy Repository:**
   ```bash
   git clone <repo_url> faizan
   cd faizan
   ```
2. **Restore Private Secrets:**
   - Copy `SECRETS_TRANSFER_PACKAGE.private.txt` (from secure USB or drive) and save it as `.env.local` in the project root.
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Or use the provided batch/powershell runners:
   ```bash
   .\run-dev.bat
   ```
5. **Access Application:**
   - Storefront: `http://localhost:3000`
   - Admin Portal: `http://localhost:3000/admin`
   - Default Admin Username: `mfe_admin`
