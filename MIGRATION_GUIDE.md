# 🚀 CC Carvan — Project Setup & Migration Guide

This repository contains the complete frontend, backend APIs, and storefront logic for **CC Carvan** ([cccarvan.com](https://cccarvan.com)).

## 📦 Quick Setup On A New Machine

### 1. Install Dependencies
```bash
npm install
```

### 2. Automated Configuration (Zero Manual Input)
Paste your private `MIGRATE_SETUP_AUTOMATIC.mjs` script into the project root folder and run:
```bash
npm run setup
```
This automatically:
- Generates the complete `.env.local` configuration.
- Verifies database connections (Hostinger MySQL & Dual Supabase Sharding).
- Verifies Admin credentials.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

### 4. Deploying to Vercel
```bash
# Push environment variables to Vercel
npm run setup:vercel

# Deploy live production
npx vercel --prod --yes
```
