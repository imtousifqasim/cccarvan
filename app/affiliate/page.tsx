'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, TrendingUp, Link as LinkIcon, ShoppingBag, 
  CreditCard, User, Copy, Check, Share2, Search, Filter, 
  ExternalLink, ArrowUpRight, ShieldCheck, Clock, CheckCircle2, 
  XCircle, AlertCircle, Plus, LogOut, ChevronRight, Layers, Sparkles
} from 'lucide-react';
import { 
  Affiliate, 
  AffiliateFinancialSummary, 
  AffiliateSettings, 
  AffiliateLink, 
  Commission, 
  PayoutMethod, 
  Withdrawal,
  Product,
  Category 
} from '@/types/database';

export default function AffiliateDashboard() {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'links' | 'sales' | 'payouts' | 'profile'>('overview');

  // Core Data States
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [summary, setSummary] = useState<AffiliateFinancialSummary | null>(null);
  const [settings, setSettings] = useState<AffiliateSettings | null>(null);

  // Tab specific data
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Search & Filters
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [salesStatusFilter, setSalesStatusFilter] = useState<string>('');

  // Modals & Feedback
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedProductForLink, setSelectedProductForLink] = useState<Product | null>(null);
  const [generatedLinkUrl, setGeneratedLinkUrl] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState(false);

  // Payout Method Modal
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [newMethodData, setNewMethodData] = useState({
    method: 'easypaisa' as 'easypaisa' | 'jazzcash' | 'bank_transfer',
    account_title: '',
    account_number: '',
    bank_name: '',
    is_default: true,
  });
  const [savingMethod, setSavingMethod] = useState(false);

  // Withdrawal Request Modal
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState<string | null>(null);

  // Profile Form
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  // Initial Load
  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/affiliate/me');
      if (res.status === 401) {
        router.push('/affiliate/login');
        return;
      }
      const data = await res.json();
      if (data.affiliate) {
        if (data.affiliate.status !== 'approved') {
          router.push('/affiliate/pending');
          return;
        }
        setAffiliate(data.affiliate);
        setProfileName(data.affiliate.full_name);
        setProfilePhone(data.affiliate.phone || '');
        setSummary(data.financialSummary);
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Lazy tab loaders
  useEffect(() => {
    if (activeTab === 'links') {
      fetch('/api/affiliate/links').then(r => r.json()).then(d => {
        if (d.links) setLinks(d.links);
      });
    } else if (activeTab === 'sales') {
      const url = salesStatusFilter ? `/api/affiliate/sales?status=${salesStatusFilter}` : '/api/affiliate/sales';
      fetch(url).then(r => r.json()).then(d => {
        if (d.commissions) setCommissions(d.commissions);
      });
    } else if (activeTab === 'payouts') {
      fetch('/api/affiliate/payout-methods').then(r => r.json()).then(d => {
        if (d.methods) {
          setPayoutMethods(d.methods);
          if (d.methods.length > 0 && !selectedMethodId) {
            setSelectedMethodId(d.methods[0].id);
          }
        }
      });
      fetch('/api/affiliate/withdrawals').then(r => r.json()).then(d => {
        if (d.withdrawals) setWithdrawals(d.withdrawals);
      });
    } else if (activeTab === 'products') {
      loadCatalog();
    }
  }, [activeTab, salesStatusFilter]);

  const loadCatalog = async () => {
    setCatalogLoading(true);
    try {
      let url = '/api/affiliate/catalog?limit=40';
      if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
      if (productSearch) url += `&search=${encodeURIComponent(productSearch)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.products) setProducts(data.products);
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setCatalogLoading(false);
    }
  };

  const handleCopy = (text: string, slugKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(slugKey);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleGenerateLink = async (productId?: string, categoryId?: string) => {
    setGeneratingLink(true);
    try {
      const res = await fetch('/api/affiliate/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, categoryId }),
      });
      const data = await res.json();
      if (data.link) {
        const fullUrl = `${window.location.origin}/r/${data.link.slug}`;
        setGeneratedLinkUrl(fullUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingLink(false);
    }
  };

  const handleSavePayoutMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMethod(true);
    try {
      const res = await fetch('/api/affiliate/payout-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMethodData),
      });
      const data = await res.json();
      if (data.method) {
        setPayoutMethods([data.method, ...payoutMethods]);
        setSelectedMethodId(data.method.id);
        setShowAddMethodModal(false);
        setNewMethodData({
          method: 'easypaisa',
          account_title: '',
          account_number: '',
          bank_name: '',
          is_default: true,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingMethod(false);
    }
  };

  const handleDeletePayoutMethod = async (id: string) => {
    if (!confirm('Remove this payout method?')) return;
    try {
      await fetch(`/api/affiliate/payout-methods/${id}`, { method: 'DELETE' });
      setPayoutMethods(payoutMethods.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);
    setWithdrawSuccess(null);
    setWithdrawing(true);

    try {
      const res = await fetch('/api/affiliate/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: withdrawAmount,
          payout_method_id: selectedMethodId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Withdrawal failed');
      }

      setWithdrawSuccess('Withdrawal request submitted successfully!');
      if (data.updatedSummary) setSummary(data.updatedSummary);
      if (data.withdrawal) setWithdrawals([data.withdrawal, ...withdrawals]);
      setTimeout(() => {
        setShowWithdrawModal(false);
        setWithdrawSuccess(null);
      }, 2000);
    } catch (err: any) {
      setWithdrawError(err.message || 'Failed to submit withdrawal');
    } finally {
      setWithdrawing(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage(null);

    try {
      const res = await fetch('/api/affiliate/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: profileName,
          phone: profilePhone,
          current_password: currentPassword || undefined,
          new_password: newPassword || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      setProfileMessage('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setProfileMessage(`Error: ${err.message}`);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/affiliate/logout', { method: 'POST' });
    router.push('/affiliate/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080b11] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500" />
      </div>
    );
  }

  const storefrontRefUrl = typeof window !== 'undefined' && affiliate?.referral_code
    ? `${window.location.origin}/?ref=${affiliate.referral_code}`
    : '';

  return (
    <div className="min-h-screen bg-[#080b11] text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <header className="border-b border-neutral-900 bg-neutral-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif text-2xl tracking-[0.2em] font-light text-white hover:text-amber-400 transition-colors">
              CC CARVAN
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Partner Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-medium text-white">{affiliate?.full_name}</span>
              <span className="text-[10px] text-neutral-400">{affiliate?.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-nav Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-neutral-900/60 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Browse Products & Generate Links', icon: ShoppingBag },
            { id: 'links', label: 'My Links', icon: LinkIcon },
            { id: 'sales', label: 'Sales & Commissions', icon: DollarSign },
            { id: 'payouts', label: 'Payouts & Withdrawals', icon: CreditCard },
            { id: 'profile', label: 'Profile & Security', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Share Banner */}
            <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold uppercase tracking-widest mb-2">
                  <Sparkles className="w-3 h-3" />
                  Your Global Referral Code: {affiliate?.referral_code}
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-white">Your Master Storefront Link</h2>
                <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                  Share this master link with your audience. Any customer who clicks and shops anywhere on CC Carvan within 30 days is credited to you.
                </p>
              </div>

              <div className="w-full md:w-auto flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  readOnly
                  value={storefrontRefUrl}
                  className="w-full md:w-80 bg-neutral-900/90 border border-neutral-700/80 rounded-lg px-3.5 py-2.5 text-xs text-neutral-200 font-mono select-all focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(storefrontRefUrl, 'master')}
                  className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedSlug === 'master' ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                  {copiedSlug === 'master' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Financial Metrics 4-Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 relative">
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">Total Earned</span>
                <p className="text-2xl sm:text-3xl font-serif text-white mt-1">
                  PKR {(summary?.totalEarned || 0).toLocaleString()}
                </p>
                <span className="text-[10px] text-neutral-500 mt-1 block">Lifetime gross commissions</span>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-amber-500/30 relative">
                <span className="text-[10px] font-medium uppercase tracking-widest text-amber-400 flex items-center justify-between">
                  Available Balance
                  <button
                    onClick={() => {
                      setActiveTab('payouts');
                      setShowWithdrawModal(true);
                    }}
                    className="text-[10px] underline hover:text-amber-300 capitalize"
                  >
                    Withdraw &rarr;
                  </button>
                </span>
                <p className="text-2xl sm:text-3xl font-serif text-amber-400 mt-1">
                  PKR {(summary?.availableBalance || 0).toLocaleString()}
                </p>
                <span className="text-[10px] text-neutral-500 mt-1 block">Cleared & withdrawable now</span>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 relative">
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">Pending Clearance</span>
                <p className="text-2xl sm:text-3xl font-serif text-neutral-200 mt-1">
                  PKR {(summary?.pendingBalance || 0).toLocaleString()}
                </p>
                <span className="text-[10px] text-neutral-500 mt-1 block">Under 7-day hold window</span>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 relative">
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">Total Withdrawn</span>
                <p className="text-2xl sm:text-3xl font-serif text-white mt-1">
                  PKR {(summary?.withdrawnAmount || 0).toLocaleString()}
                </p>
                <span className="text-[10px] text-neutral-500 mt-1 block">Transferred to your accounts</span>
              </div>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">Total Unique Clicks</span>
                  <p className="text-2xl font-semibold text-white mt-0.5">{summary?.totalClicks || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                  <LinkIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">Attributed Orders</span>
                  <p className="text-2xl font-semibold text-white mt-0.5">{summary?.totalOrders || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">Conversion Rate</span>
                  <p className="text-2xl font-semibold text-amber-400 mt-0.5">{summary?.conversionRate || 0}%</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Information & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Your Commission Terms</h3>
                <div className="space-y-3 text-xs text-neutral-400">
                  <div className="flex justify-between py-1.5 border-b border-neutral-900">
                    <span>Commission Rate:</span>
                    <span className="text-amber-400 font-semibold">
                      {affiliate?.commission_rate != null ? `${affiliate.commission_rate}% (Custom)` : `${settings?.default_commission_rate || 10}% (Global Standard)`}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-900">
                    <span>Attribution Cookie Duration:</span>
                    <span className="text-neutral-200">{settings?.cookie_days || 30} Days</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-900">
                    <span>Clearance Hold Period:</span>
                    <span className="text-neutral-200">{settings?.hold_days || 7} Days post-delivery</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Minimum Withdrawal:</span>
                    <span className="text-neutral-200">PKR {(settings?.min_withdrawal || 1000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Create Specific Product Links</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Direct your followers to specific dresses, luxury shawls, or unstitched suits. Create shortened links with one-click WhatsApp and social sharing.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="mt-4 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs uppercase tracking-wider font-semibold text-white flex items-center justify-between transition-colors"
                >
                  Browse Catalog & Generate Links
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BROWSE PRODUCTS & GENERATE LINKS */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-neutral-950/70 p-4 rounded-xl border border-neutral-800">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadCatalog()}
                  className="w-full bg-neutral-900/90 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-neutral-900/90 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>

                <button
                  onClick={loadCatalog}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider"
                >
                  Filter
                </button>
              </div>
            </div>

            {catalogLoading ? (
              <div className="py-20 text-center text-neutral-500 text-xs animate-pulse">Loading catalog...</div>
            ) : products.length === 0 ? (
              <div className="py-16 text-center text-neutral-500 text-xs">No products found matching your search.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => {
                  const img = p.images?.[0]?.image_url || '/placeholder.jpg';
                  const price = p.sale_price || p.regular_price;
                  const estimatedComm = Math.round((price * ((affiliate?.commission_rate || settings?.default_commission_rate || 10) / 100)));

                  return (
                    <div key={p.id} className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-colors">
                      <div>
                        <div className="aspect-[3/4] bg-neutral-900 relative overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-950/80 text-amber-400 border border-neutral-800">
                            Earn ~PKR {estimatedComm.toLocaleString()}
                          </span>
                        </div>
                        <div className="p-3.5">
                          <span className="text-[10px] text-neutral-500 font-mono uppercase">{p.sku}</span>
                          <h4 className="text-xs font-medium text-white line-clamp-1 mt-0.5">{p.name}</h4>
                          <p className="text-xs font-semibold text-neutral-200 mt-1">
                            PKR {price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 pt-0">
                        <button
                          onClick={() => {
                            setSelectedProductForLink(p);
                            handleGenerateLink(p.id, undefined);
                          }}
                          className="w-full py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-[11px] uppercase tracking-wider font-semibold text-amber-400 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                          Get Link
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MY LINKS */}
        {/* ========================================================================= */}
        {activeTab === 'links' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif text-white">Your Tracking Links</h2>
              <span className="text-xs text-neutral-400">{links.length} total generated</span>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/60 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Target Product / Category</th>
                      <th className="py-3.5 px-4 font-semibold">Tracking Slug</th>
                      <th className="py-3.5 px-4 font-semibold">Clicks</th>
                      <th className="py-3.5 px-4 font-semibold">Created Date</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {links.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-neutral-500">
                          No links generated yet. Visit the Browse Products tab to create your first link.
                        </td>
                      </tr>
                    ) : (
                      links.map((link) => {
                        const targetName = link.product?.name || link.category?.name || 'Storefront';
                        const linkUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${link.slug}`;

                        return (
                          <tr key={link.id} className="hover:bg-neutral-900/30 transition-colors">
                            <td className="py-3.5 px-4 font-medium text-white max-w-xs truncate">
                              {targetName}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-amber-400">
                              /r/{link.slug}
                            </td>
                            <td className="py-3.5 px-4 font-semibold">
                              {link.click_count || 0}
                            </td>
                            <td className="py-3.5 px-4 text-neutral-400">
                              {new Date(link.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleCopy(linkUrl, link.slug)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-200 transition-colors"
                              >
                                {copiedSlug === link.slug ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    Copy Link
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SALES & COMMISSIONS */}
        {/* ========================================================================= */}
        {activeTab === 'sales' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-serif text-white">Attributed Sales & Commissions</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Status Filter:</span>
                <select
                  value={salesStatusFilter}
                  onChange={(e) => setSalesStatusFilter(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending Hold</option>
                  <option value="approved">Approved & Cleared</option>
                  <option value="reversed">Reversed / Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/60 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Order</th>
                      <th className="py-3.5 px-4 font-semibold">Date & Time</th>
                      <th className="py-3.5 px-4 font-semibold">Item Sold</th>
                      <th className="py-3.5 px-4 font-semibold">Qty</th>
                      <th className="py-3.5 px-4 font-semibold">Sale Amount</th>
                      <th className="py-3.5 px-4 font-semibold">Rate</th>
                      <th className="py-3.5 px-4 font-semibold">Commission</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {commissions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-neutral-500">
                          No sales recorded yet. Share your tracking links to start earning.
                        </td>
                      </tr>
                    ) : (
                      commissions.map((comm) => {
                        const statusColors: Record<string, string> = {
                          approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                          pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                          reversed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                        };

                        return (
                          <tr key={comm.id} className="hover:bg-neutral-900/30 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-medium text-white">
                              {comm.order?.order_number || 'CCC-ORDER'}
                            </td>
                            <td className="py-3.5 px-4 text-neutral-400">
                              {new Date(comm.created_at).toLocaleDateString()} {new Date(comm.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3.5 px-4 text-white max-w-xs truncate">
                              {comm.product?.name || 'Luxury Apparel'}
                            </td>
                            <td className="py-3.5 px-4">{comm.quantity}</td>
                            <td className="py-3.5 px-4 font-medium">PKR {Number(comm.sale_amount).toLocaleString()}</td>
                            <td className="py-3.5 px-4 text-neutral-400">{comm.commission_rate}%</td>
                            <td className="py-3.5 px-4 font-semibold text-amber-400">
                              PKR {Number(comm.commission_amount).toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${statusColors[comm.status] || 'bg-neutral-800 text-neutral-400'}`}>
                                {comm.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PAYOUTS & WITHDRAWALS */}
        {/* ========================================================================= */}
        {activeTab === 'payouts' && (
          <div className="space-y-8">
            {/* Header + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif text-white">Payout Methods & Withdrawals</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Available for withdrawal: <strong className="text-amber-400">PKR {(summary?.availableBalance || 0).toLocaleString()}</strong>
                  {' '}&bull; Min payout: PKR {(settings?.min_withdrawal || 1000).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddMethodModal(true)}
                  className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Payout Method
                </button>

                <button
                  onClick={() => setShowWithdrawModal(true)}
                  disabled={(summary?.availableBalance || 0) < (settings?.min_withdrawal || 1000)}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs uppercase tracking-wider font-semibold shadow-lg shadow-amber-500/20 transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  Request Withdrawal
                </button>
              </div>
            </div>

            {/* Saved Payout Methods Cards */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">Saved Payout Accounts</h3>
              {payoutMethods.length === 0 ? (
                <div className="p-8 rounded-2xl bg-neutral-950/60 border border-dashed border-neutral-800 text-center">
                  <p className="text-xs text-neutral-400 mb-3">You haven&#39;t added any payout method yet.</p>
                  <button
                    onClick={() => setShowAddMethodModal(true)}
                    className="px-4 py-2 rounded-lg bg-amber-500 text-neutral-950 text-xs font-semibold uppercase tracking-wider"
                  >
                    Add Easypaisa, JazzCash, or Bank
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {payoutMethods.map((m) => (
                    <div key={m.id} className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-neutral-900 border border-neutral-700 text-amber-400">
                            {m.method.replace('_', ' ')}
                          </span>
                          {m.is_default && (
                            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-white">{m.account_title}</h4>
                        <p className="text-xs font-mono text-neutral-300 mt-1">{m.account_number}</p>
                        {m.bank_name && <p className="text-[11px] text-neutral-400 mt-0.5">{m.bank_name}</p>}
                      </div>

                      <div className="pt-4 border-t border-neutral-900 mt-4 flex justify-end">
                        <button
                          onClick={() => handleDeletePayoutMethod(m.id)}
                          className="text-[11px] text-neutral-500 hover:text-rose-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Withdrawal History Table */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">Withdrawal History</h3>
              <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-900/60 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                      <tr>
                        <th className="py-3.5 px-4 font-semibold">Requested Date</th>
                        <th className="py-3.5 px-4 font-semibold">Amount</th>
                        <th className="py-3.5 px-4 font-semibold">Method & Account</th>
                        <th className="py-3.5 px-4 font-semibold">Processed Date</th>
                        <th className="py-3.5 px-4 font-semibold">Transaction Reference</th>
                        <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-300">
                      {withdrawals.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-neutral-500">
                            No withdrawal requests yet.
                          </td>
                        </tr>
                      ) : (
                        withdrawals.map((w) => {
                          const statusBadges: Record<string, string> = {
                            paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                            pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                            approved: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                            rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                          };

                          return (
                            <tr key={w.id} className="hover:bg-neutral-900/30 transition-colors">
                              <td className="py-3.5 px-4 text-neutral-300">
                                {new Date(w.requested_at).toLocaleDateString()}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-white">
                                PKR {Number(w.amount).toLocaleString()}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="capitalize font-medium text-neutral-200">{w.method.replace('_', ' ')}</span> &bull; {w.account_title} ({w.account_number})
                              </td>
                              <td className="py-3.5 px-4 text-neutral-400">
                                {w.processed_at ? new Date(w.processed_at).toLocaleDateString() : '—'}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-xs text-neutral-300">
                                {w.transaction_reference || '—'}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${statusBadges[w.status] || 'bg-neutral-800 text-neutral-400'}`}>
                                  {w.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PROFILE & SECURITY */}
        {/* ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-serif text-white mb-1">Affiliate Profile</h2>
              <p className="text-xs text-neutral-400 mb-6">Manage your creator credentials and password.</p>

              {profileMessage && (
                <div className={`p-4 rounded-xl text-xs mb-6 ${profileMessage.startsWith('Error') ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
                  {profileMessage}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={affiliate?.email || ''}
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-neutral-400 select-all"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">Email is locked to your partner contract.</span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-900">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-3">Change Password</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {savingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: LINK GENERATOR DETAILS */}
      {/* ========================================================================= */}
      {selectedProductForLink && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-serif text-white mb-1">Affiliate Link Generated</h3>
            <p className="text-xs text-neutral-400 mb-4">{selectedProductForLink.name}</p>

            {generatingLink ? (
              <div className="py-8 text-center text-xs text-neutral-400 animate-pulse">Generating unique tracking slug...</div>
            ) : generatedLinkUrl ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Your Tracking URL</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLinkUrl}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-amber-400 select-all"
                    />
                    <button
                      onClick={() => handleCopy(generatedLinkUrl, 'modal')}
                      className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider shrink-0"
                    >
                      {copiedSlug === 'modal' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out ${selectedProductForLink.name} on CC Carvan: ${generatedLinkUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium text-center transition-colors"
                  >
                    Share on WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLinkUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-xs font-medium text-center transition-colors"
                  >
                    Share on Facebook
                  </a>
                </div>
              </div>
            ) : null}

            <div className="mt-6 pt-4 border-t border-neutral-900 flex justify-end">
              <button
                onClick={() => {
                  setSelectedProductForLink(null);
                  setGeneratedLinkUrl(null);
                }}
                className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD PAYOUT METHOD */}
      {/* ========================================================================= */}
      {showAddMethodModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-serif text-white mb-1">Add Payout Method</h3>
            <p className="text-xs text-neutral-400 mb-4">Supported: Easypaisa, JazzCash, or Pakistani Bank</p>

            <form onSubmit={handleSavePayoutMethod} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Payout Channel</label>
                <select
                  value={newMethodData.method}
                  onChange={(e) => setNewMethodData({ ...newMethodData, method: e.target.value as any })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="easypaisa">Easypaisa Mobile Account</option>
                  <option value="jazzcash">JazzCash Mobile Account</option>
                  <option value="bank_transfer">Bank Transfer (1Link / Raast)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Account Title (Full Name)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={newMethodData.account_title}
                  onChange={(e) => setNewMethodData({ ...newMethodData, account_title: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                  Account Number / IBAN / Mobile #
                </label>
                <input
                  type="text"
                  required
                  placeholder="03001234567 or PK00BANK..."
                  value={newMethodData.account_number}
                  onChange={(e) => setNewMethodData({ ...newMethodData, account_number: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              {newMethodData.method === 'bank_transfer' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meezan Bank, HBL, Bank Alfalah"
                    value={newMethodData.bank_name}
                    onChange={(e) => setNewMethodData({ ...newMethodData, bank_name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="method_default"
                  checked={newMethodData.is_default}
                  onChange={(e) => setNewMethodData({ ...newMethodData, is_default: e.target.checked })}
                  className="rounded border-neutral-800 bg-neutral-900 text-amber-500"
                />
                <label htmlFor="method_default" className="text-xs text-neutral-400">Set as default payout method</label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMethodModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingMethod}
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider"
                >
                  {savingMethod ? 'Saving...' : 'Save Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REQUEST WITHDRAWAL */}
      {/* ========================================================================= */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-serif text-white mb-1">Request Withdrawal</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Available: <strong className="text-amber-400">PKR {(summary?.availableBalance || 0).toLocaleString()}</strong>
            </p>

            {withdrawError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs mb-4">
                {withdrawError}
              </div>
            )}

            {withdrawSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs mb-4">
                {withdrawSuccess}
              </div>
            )}

            <form onSubmit={handleRequestWithdrawal} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                  Withdrawal Amount (PKR) &bull; Min: {(settings?.min_withdrawal || 1000).toLocaleString()}
                </label>
                <input
                  type="number"
                  min={settings?.min_withdrawal || 1000}
                  max={summary?.availableBalance || 0}
                  required
                  value={withdrawAmount || ''}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  placeholder="1000"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Payout Destination</label>
                {payoutMethods.length === 0 ? (
                  <p className="text-xs text-rose-400">Please add a payout method first.</p>
                ) : (
                  <select
                    value={selectedMethodId}
                    onChange={(e) => setSelectedMethodId(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    {payoutMethods.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.method.toUpperCase()} — {m.account_title} ({m.account_number})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/40 text-[11px] text-neutral-400 leading-relaxed border border-neutral-900">
                &bull; Requested amount is immediately deducted from available balance.<br />
                &bull; CC Carvan accounts processes payouts within 2-3 working days.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={withdrawing || payoutMethods.length === 0}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-semibold text-xs uppercase tracking-wider disabled:opacity-50"
                >
                  {withdrawing ? 'Submitting...' : 'Confirm Withdrawal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500 mt-12">
        <p>&copy; {new Date().getFullYear()} CC Carvan Affiliate Network &bull; Need help? Contact <a href="mailto:support@cccarvan.com" className="text-amber-400 underline">support@cccarvan.com</a></p>
      </footer>
    </div>
  );
}
