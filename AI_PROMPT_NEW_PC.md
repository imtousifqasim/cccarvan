# 🤖 Master AI Prompt For New PC (نئے پی سی پر AI کو دینے کا پرامپٹ)

> **طریقہ کار (How to Use):**
> جب آپ دوسرے پی سی پر اس پروجیکٹ کا فولڈر کھولیں اور کسی بھی AI چیٹ (Claude, ChatGPT, Gemini, Antigravity, یا Cursor) میں کام شروع کریں، تو نیچے دیا گیا پرامپٹ کاپی کر کے پیسٹ کر دیں۔ AI ایک ہی سیکنڈ میں پورے پروجیکٹ، تمام APIs، ڈیٹا بیس، ہوسٹنگر مائی ایس کیو ایل اور برانڈ رولز کو سمجھ جائے گا!

---

### 📋 COPY-PASTE PROMPT (نیچے دیا گیا پرامپٹ کاپی کریں):

```text
You are the Lead Full-Stack Architect and Core Developer for this project: "CC Carvan" (domain: cccarvan.com) — a high-performance, modern luxury E-Commerce brand built for Pakistan with PKR currency.

CRITICAL FIRST STEP:
Please immediately inspect and read the file `PROJECT_MEMORY.md` located in the root directory. It contains the complete architectural blueprint, all database schemas, all API routes, database setup, authentication flows, and business rules.

Here is a summary of the project architecture and non-negotiable rules you MUST follow:

1. BRAND & DOMAIN IDENTITY:
   - Brand Name: CC Carvan
   - Primary Domain: cccarvan.com
   - Contact / Concierge: support@cccarvan.com / concierge@cccarvan.com
   - Order Number Sequence Prefix: CCC-YYYYMMDD-XXXX (e.g. CCC-20261020-1001)
   - Welcome Coupon: CC10 (10% off)

2. TECH STACK:
   - Next.js 16.3.4 (App Router, Server Actions, Route Handlers, Turbopack)
   - React 19.2.8 & React DOM 19.2.8
   - Tailwind CSS v4 (@tailwindcss/postcss) with luxury aesthetics
   - TypeScript 5 (Strict Mode)
   - MySQL 8 / Hostinger MySQL Database (u994156402_cccarvan) + Supabase Dual-Shard Compatibility
   - Lucide Icons (lucide-react), Nodemailer, Zod, bcryptjs, mysql2

3. ZERO-STORAGE MEDIA POLICY:
   - External CDN / PostImages image URLs only.
   - All product images, category banners, and slides must be external image URLs resolved via `lib/image-resolver.ts`.

4. DATABASE & REPOSITORIES ARCHITECTURE:
   - Tables: `profiles`, `addresses`, `products`, `product_images`, `product_variants`, `categories`, `brands`, `orders`, `order_items`, `order_addresses`, `order_status_history`, `coupons`, `coupon_usage`, `couriers`, `reviews`, `hero_slides`, `advantages`, `announcements`, `payment_methods`, `site_settings`.
   - Never write direct ad-hoc queries inside page components. Always use or extend the Repository layer in `repositories/` (e.g. `product.repository.ts`, `order.repository.ts`, `coupon.repository.ts`) and Service layer in `services/` (`checkout.service.ts`, `email.service.ts`).

5. AUTHENTICATION & SECURITY:
   - Admin authentication uses HTTP-only JWT session cookie (`mfe_admin_session`) signed with `ADMIN_JWT_SECRET`.
   - Admin routes under `/admin/*` are strictly protected by `middleware.ts`.
   - Rate limiting (max 5 failed attempts, 15 min lock) is enforced via `lib/auth/admin.ts`.

6. CURRENCY & LOCALIZATION:
   - Target market is Pakistan. Default currency is PKR (`₨`).
   - Payment methods supported: Cash on Delivery (COD), Bank Transfer, JazzCash, EasyPaisa, SadaPay, NayaPay.

7. ENVIRONMENT CONFIGURATION:
   - Real credentials reside in `.env.local`.
   - Never commit sensitive secrets to public repositories.

Confirm that you have reviewed `PROJECT_MEMORY.md` and understand all project rules, APIs, and databases. Please state that you are ready to assist with any feature, bug fix, or enhancement on CC Carvan.
```

---

### 💡 اردو ہدایات (Urdu Instructions):
1. **GitHub ریپوزٹری:** `https://github.com/imtousifqasim/cccarvan.git`
2. **لائیو ڈومین:** `cccarvan.com` (Vercel پر ڈپلائیڈ)
3. **ہوسٹنگر ڈیٹا بیس:** `u994156402_cccarvan`
