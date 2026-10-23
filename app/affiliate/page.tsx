'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, TrendingUp, Link as LinkIcon, ShoppingBag, 
  CreditCard, User, Copy, Check, Share2, Search, Filter, 
  ExternalLink, ArrowUpRight, ShieldCheck, Clock, CheckCircle2, 
  XCircle, AlertCircle, Plus, LogOut, ChevronRight, Layers, Sparkles,
  BarChart3, Wallet, ArrowDownRight, Eye, Info, RefreshCw
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
  const [isImpersonated, setIsImpersonated] = useState(false);
  const [impersonatedBy, setImpersonatedBy] = useState<string | null>(null);

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

  const [refreshingLinks, setRefreshingLinks] = useState(false);

  // Load Tracking Links
  const fetchLinks = async () => {
    try {
      setRefreshingLinks(true);
      const res = await fetch('/api/affiliate/links');
      const d = await res.json();
      if (d.links) setLinks(d.links);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshingLinks(false);
    }
  };

  // Initial Load
  const fetchDashboardData = async () => {
    try {
      const [res, linksRes] = await Promise.all([
        fetch('/api/affiliate/me'),
        fetch('/api/affiliate/links'),
      ]);

      if (res.status === 401) {
        router.push('/affiliate/login');
        return;
      }
      const data = await res.json();
      if (data.affiliate) {
        if (data.isImpersonated) {
          setIsImpersonated(true);
          setImpersonatedBy(data.impersonatedBy || 'Admin');
        } else if (data.affiliate.status !== 'approved') {
          router.push('/affiliate/pending');
          return;
        }
        setAffiliate(data.affiliate);
        setProfileName(data.affiliate.full_name);
        setProfilePhone(data.affiliate.phone || '');
        setSummary(data.financialSummary);
        setSettings(data.settings);
      }

      const linksData = await linksRes.json();
      if (linksData.links) {
        setLinks(linksData.links);
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
      fetchLinks();
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
        fetchLinks();
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
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="CC Carvan" className="h-10 w-auto object-contain animate-pulse" />
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  const storefrontRefUrl = typeof window !== 'undefined' && affiliate?.referral_code
    ? `${window.location.origin}/r/${affiliate.referral_code.toLowerCase()}`
    : '';

  const masterLink = links.find((l) => !l.product_id && !l.category_id);
  const masterClicks = masterLink ? (masterLink.click_count || 0) : 0;
  const totalAllClicks = links.length > 0
    ? links.reduce((acc, l) => acc + (l.click_count || 0), 0)
    : (summary?.totalClicks || 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Admin Impersonation Top Alert Banner */}
      {isImpersonated && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-2.5 text-xs font-bold flex flex-col sm:flex-row items-center justify-between gap-2 shadow-sm sticky top-0 z-50 border-b border-amber-600/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-black">
              Admin Direct View
            </span>
            <span>
              Logged in as: <strong className="underline decoration-slate-900">{affiliate?.full_name}</strong> ({affiliate?.email}) &bull; Status: <strong className="uppercase">{affiliate?.status}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/affiliates"
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-[11px] font-bold tracking-wider flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Return to Admin Panel</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="CC Carvan"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-900">
                  Affiliate Portal
                </span>
                <span className="text-[10px] text-amber-600 font-medium tracking-wider">
                  Partner Network
                </span>
              </div>
            </Link>

            <span className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
              affiliate?.status === 'approved' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' 
                : affiliate?.status === 'pending'
                ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                : 'bg-rose-50 text-rose-700 border-rose-200/80'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                affiliate?.status === 'approved' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`} />
              <span className="capitalize">{affiliate?.status || 'Active'} Partner</span>
            </span>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-900">{affiliate?.full_name}</span>
              <span className="text-[11px] text-slate-500">{affiliate?.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="View Storefront"
              >
                <span>Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-nav Modern Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-slate-100 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'products', label: 'Browse & Generate Links', icon: ShoppingBag },
            { id: 'links', label: 'My Links', icon: LinkIcon },
            { id: 'sales', label: 'Sales & Commissions', icon: DollarSign },
            { id: 'payouts', label: 'Payouts & Withdrawals', icon: Wallet },
            { id: 'profile', label: 'Profile & Security', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3.5 px-4 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-amber-600 text-amber-700 font-semibold bg-amber-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
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
            {/* Master Referral Link Modern Light Banner */}
            <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/60 border border-amber-200/80 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xs relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Referral Code: <span className="font-mono font-bold tracking-wider">{affiliate?.referral_code}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-2xs">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{masterClicks} {masterClicks === 1 ? 'Person' : 'People'} Opened Your Link</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-slate-900 font-medium">Your Master Storefront Link</h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Share this master link across WhatsApp, Instagram, TikTok, or blogs. Jab bhi koi is link ko open karay ga to <strong>30 full days</strong> tak us ki har purchase par aap ko commission milay ga.
                </p>
              </div>

              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 relative z-10">
                <input
                  type="text"
                  readOnly
                  value={storefrontRefUrl}
                  className="w-full lg:w-72 bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-800 font-mono select-all focus:outline-none shadow-xs"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(storefrontRefUrl, 'master')}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 shrink-0"
                  >
                    {copiedSlug === 'master' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                    {copiedSlug === 'master' ? 'Copied' : 'Copy'}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out CC Carvan Luxury Jewelry & Collections: ${storefrontRefUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 shrink-0"
                    title="Share directly on WhatsApp"
                  >
                    <Share2 className="w-4 h-4 text-white" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      fetchLinks();
                      fetchDashboardData();
                    }}
                    disabled={refreshingLinks}
                    className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs transition-colors shadow-xs"
                    title="Refresh click count"
                  >
                    <RefreshCw className={`w-4 h-4 text-slate-600 ${refreshingLinks ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Financial Metrics 4-Card Modern Light Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Total Earned */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Earned</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900">
                  PKR {(summary?.totalEarned || 0).toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-500 mt-1 block">Lifetime gross commission</span>
              </div>

              {/* Available Balance */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white to-white border border-amber-300/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Available Balance</span>
                  <button
                    onClick={() => {
                      setActiveTab('payouts');
                      setShowWithdrawModal(true);
                    }}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-0.5"
                  >
                    Withdraw &rarr;
                  </button>
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-700">
                  PKR {(summary?.availableBalance || 0).toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-500 mt-1 block">Cleared & withdrawable now</span>
              </div>

              {/* Pending Clearance */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pending Hold</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900">
                  PKR {(summary?.pendingBalance || 0).toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-500 mt-1 block">Under 7-day hold window</span>
              </div>

              {/* Total Withdrawn */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Paid Out</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-serif font-semibold text-slate-900">
                  PKR {(summary?.withdrawnAmount || 0).toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-500 mt-1 block">Received to your accounts</span>
              </div>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Total Visitors / Link Opens</span>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalAllClicks.toLocaleString()}</p>
                  <span className="text-[11px] text-slate-400">Total people who opened your links</span>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Attributed Orders</span>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{summary?.totalOrders || 0}</p>
                  <span className="text-[11px] text-slate-400">Purchases made via your links</span>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Conversion Rate</span>
                  <p className="text-2xl font-bold text-amber-700 mt-0.5">{summary?.conversionRate || 0}%</p>
                  <span className="text-[11px] text-slate-400">Orders per 100 link opens</span>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Program Terms & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Your Active Commission Terms</h3>
                </div>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Your Commission Rate:</span>
                    <span className="font-semibold text-amber-700">
                      {affiliate?.commission_rate != null ? `${affiliate.commission_rate}% (Custom Tier)` : `${settings?.default_commission_rate || 10}% (Global Standard)`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Attribution Cookie Duration:</span>
                    <span className="font-semibold text-slate-800">{settings?.cookie_days || 30} Days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Clearance Hold Window:</span>
                    <span className="font-semibold text-slate-800">{settings?.hold_days || 7} Days post-delivery</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Minimum Withdrawal:</span>
                    <span className="font-semibold text-slate-800">PKR {(settings?.min_withdrawal || 1000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-[10px] font-semibold tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Product Link Generator
                  </div>
                  <h3 className="text-lg font-serif font-medium text-white mb-2">Promote Specific Dresses & Formals</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Generate deep tracking links for specific luxury suits, embroidered shawls, or entire collections. One-click WhatsApp and social sharing.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="mt-5 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold tracking-wider flex items-center justify-between transition-colors shadow-md"
                >
                  Browse Catalog & Create Links
                  <ChevronRight className="w-4 h-4" />
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by name or SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadCatalog()}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-amber-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>

                <button
                  onClick={loadCatalog}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wider transition-colors"
                >
                  Filter
                </button>
              </div>
            </div>

            {catalogLoading ? (
              <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading catalog...</div>
            ) : products.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs bg-white rounded-2xl border border-slate-200">
                No products found matching your search.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p) => {
                  const img = p.images?.[0]?.image_url || '/placeholder.jpg';
                  const price = p.sale_price || p.regular_price;
                  const estimatedComm = Math.round((price * ((affiliate?.commission_rate || settings?.default_commission_rate || 10) / 100)));

                  return (
                    <div key={p.id} className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-slate-300 transition-all">
                      <div>
                        <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-amber-800 shadow-sm border border-amber-200/60">
                            Earn ~PKR {estimatedComm.toLocaleString()}
                          </span>
                        </div>
                        <div className="p-4">
                          <span className="text-[10px] text-slate-400 font-mono uppercase">{p.sku}</span>
                          <h4 className="text-xs font-medium text-slate-900 line-clamp-1 mt-0.5">{p.name}</h4>
                          <p className="text-xs font-bold text-slate-900 mt-1">
                            PKR {price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <button
                          onClick={() => {
                            setSelectedProductForLink(p);
                            handleGenerateLink(p.id, undefined);
                          }}
                          className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <LinkIcon className="w-3.5 h-3.5 text-amber-600" />
                          Get Tracking Link
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-serif text-slate-900 font-medium">Tracking Links & Visitor Counts</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  See real-time visitors and link opens for every link you have created and shared.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 shadow-xs">
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span>Total {totalAllClicks} Opens / Visitors</span>
                </span>
                <button
                  onClick={() => {
                    fetchLinks();
                    fetchDashboardData();
                  }}
                  disabled={refreshingLinks}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs transition-colors"
                  title="Refresh visitor counts"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${refreshingLinks ? 'animate-spin' : ''}`} />
                  <span>{refreshingLinks ? 'Updating...' : 'Refresh Clicks'}</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="py-4 px-5">Target Destination</th>
                      <th className="py-4 px-5">Tracking Link</th>
                      <th className="py-4 px-5">Visitors / Opens</th>
                      <th className="py-4 px-5">Created Date</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {links.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          No tracking links created yet. Browse products or copy your Master link to start tracking visitors.
                        </td>
                      </tr>
                    ) : (
                      links.map((link) => {
                        const isMaster = !link.product_id && !link.category_id;
                        const targetName = link.product?.name || link.category?.name || 'Master Storefront Link';
                        const linkUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${link.slug}`;
                        const shareText = isMaster
                          ? `Check out CC Carvan luxury collections: ${linkUrl}`
                          : `Check out ${targetName} on CC Carvan: ${linkUrl}`;

                        return (
                          <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-5 font-medium text-slate-900 max-w-xs">
                              {isMaster ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                                  <span className="font-semibold text-slate-900">Master Storefront Link</span>
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">Default</span>
                                </div>
                              ) : (
                                <span className="truncate block font-medium">{targetName}</span>
                              )}
                            </td>
                            <td className="py-4 px-5 font-mono text-amber-700 font-medium">
                              <span className="bg-slate-100 px-2.5 py-1 rounded-md text-[11px] border border-slate-200">
                                /r/{link.slug}
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-2xs">
                                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{link.click_count || 0} {link.click_count === 1 ? 'Person Opened' : 'People Opened'}</span>
                              </span>
                            </td>
                            <td className="py-4 px-5 text-slate-500">
                              {new Date(link.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleCopy(linkUrl, link.slug)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                                  title="Copy tracking link"
                                >
                                  {copiedSlug === link.slug ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                                <a
                                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors"
                                  title="Share directly to WhatsApp"
                                >
                                  <Share2 className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
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
              <h2 className="text-lg font-serif text-slate-900 font-medium">Attributed Sales & Commissions</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Filter Status:</span>
                <select
                  value={salesStatusFilter}
                  onChange={(e) => setSalesStatusFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-amber-500 shadow-xs"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending Hold</option>
                  <option value="approved">Approved & Cleared</option>
                  <option value="reversed">Reversed / Cancelled</option>
                </select>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="py-4 px-5">Order #</th>
                      <th className="py-4 px-5">Date & Time</th>
                      <th className="py-4 px-5">Item Sold</th>
                      <th className="py-4 px-5">Qty</th>
                      <th className="py-4 px-5">Sale Amount</th>
                      <th className="py-4 px-5">Rate</th>
                      <th className="py-4 px-5">Commission</th>
                      <th className="py-4 px-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {commissions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No sales recorded yet. Share your links to earn commissions.
                        </td>
                      </tr>
                    ) : (
                      commissions.map((comm) => {
                        const statusColors: Record<string, string> = {
                          approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                          pending: 'bg-amber-50 text-amber-700 border-amber-200',
                          reversed: 'bg-rose-50 text-rose-700 border-rose-200',
                        };

                        return (
                          <tr key={comm.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-5 font-mono font-medium text-slate-900">
                              {comm.order?.order_number || 'CCC-ORDER'}
                            </td>
                            <td className="py-4 px-5 text-slate-500">
                              {new Date(comm.created_at).toLocaleDateString()} {new Date(comm.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-4 px-5 font-medium text-slate-900 max-w-xs truncate">
                              {comm.product?.name || 'Luxury Item'}
                            </td>
                            <td className="py-4 px-5">{comm.quantity}</td>
                            <td className="py-4 px-5 font-semibold">PKR {Number(comm.sale_amount).toLocaleString()}</td>
                            <td className="py-4 px-5 text-slate-500">{comm.commission_rate}%</td>
                            <td className="py-4 px-5 font-bold text-amber-700">
                              PKR {Number(comm.commission_amount).toLocaleString()}
                            </td>
                            <td className="py-4 px-5 text-right">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[comm.status] || 'bg-slate-100'}`}>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif text-slate-900 font-medium">Payout Accounts & Withdrawals</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Available for withdrawal: <strong className="text-amber-700 font-bold">PKR {(summary?.availableBalance || 0).toLocaleString()}</strong>
                  {' '}&bull; Minimum threshold: PKR {(settings?.min_withdrawal || 1000).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddMethodModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4 text-slate-500" />
                  Add Payout Method
                </button>

                <button
                  onClick={() => setShowWithdrawModal(true)}
                  disabled={(summary?.availableBalance || 0) < (settings?.min_withdrawal || 1000)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold tracking-wider shadow-md shadow-amber-500/20 transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  Request Withdrawal
                </button>
              </div>
            </div>

            {/* Saved Payout Methods Cards */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Saved Payout Accounts</h3>
              {payoutMethods.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-300 text-center">
                  <p className="text-xs text-slate-500 mb-3">No payout methods added yet.</p>
                  <button
                    onClick={() => setShowAddMethodModal(true)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                  >
                    Add Easypaisa, JazzCash, or Bank Account
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {payoutMethods.map((m) => (
                    <div key={m.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                            {m.method.replace('_', ' ')}
                          </span>
                          {m.is_default && (
                            <span className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900">{m.account_title}</h4>
                        <p className="text-xs font-mono text-slate-600 mt-1">{m.account_number}</p>
                        {m.bank_name && <p className="text-[11px] text-slate-400 mt-0.5">{m.bank_name}</p>}
                      </div>

                      <div className="pt-3 border-t border-slate-100 mt-4 flex justify-end">
                        <button
                          onClick={() => handleDeletePayoutMethod(m.id)}
                          className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
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
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Withdrawal History</h3>
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="py-4 px-5">Requested Date</th>
                        <th className="py-4 px-5">Amount</th>
                        <th className="py-4 px-5">Method & Account</th>
                        <th className="py-4 px-5">Processed Date</th>
                        <th className="py-4 px-5">Reference #</th>
                        <th className="py-4 px-5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {withdrawals.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-slate-400">
                            No withdrawal history yet.
                          </td>
                        </tr>
                      ) : (
                        withdrawals.map((w) => {
                          const statusBadges: Record<string, string> = {
                            paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                            pending: 'bg-amber-50 text-amber-700 border-amber-200',
                            approved: 'bg-blue-50 text-blue-700 border-blue-200',
                            rejected: 'bg-rose-50 text-rose-700 border-rose-200',
                          };

                          return (
                            <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-4 px-5 text-slate-600">
                                {new Date(w.requested_at).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-5 font-bold text-slate-900">
                                PKR {Number(w.amount).toLocaleString()}
                              </td>
                              <td className="py-4 px-5">
                                <span className="capitalize font-semibold text-slate-900">{w.method.replace('_', ' ')}</span> &bull; {w.account_title} ({w.account_number})
                              </td>
                              <td className="py-4 px-5 text-slate-500">
                                {w.processed_at ? new Date(w.processed_at).toLocaleDateString() : '—'}
                              </td>
                              <td className="py-4 px-5 font-mono text-xs text-slate-800">
                                {w.transaction_reference || '—'}
                              </td>
                              <td className="py-4 px-5 text-right">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadges[w.status] || 'bg-slate-100'}`}>
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
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-serif text-slate-900 font-medium mb-1">Affiliate Profile</h2>
              <p className="text-xs text-slate-500 mb-6">Manage your creator credentials and security settings.</p>

              {profileMessage && (
                <div className={`p-4 rounded-xl text-xs mb-6 ${profileMessage.startsWith('Error') ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'}`}>
                  {profileMessage}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5">Registered Email</label>
                  <input
                    type="email"
                    disabled
                    value={affiliate?.email || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-600 select-all"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Email is locked to your partner contract.</span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-slate-800 mb-3">Change Password</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider transition-colors disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <h3 className="text-lg font-serif font-semibold text-slate-900 mb-1">Affiliate Link Generated</h3>
            <p className="text-xs text-slate-500 mb-4">{selectedProductForLink.name}</p>

            {generatingLink ? (
              <div className="py-8 text-center text-xs text-slate-400 animate-pulse">Generating unique tracking link...</div>
            ) : generatedLinkUrl ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Your Tracking Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLinkUrl}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-amber-800 select-all"
                    />
                    <button
                      onClick={() => handleCopy(generatedLinkUrl, 'modal')}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold tracking-wider shrink-0"
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
                    className="flex-1 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center transition-colors"
                  >
                    Share on WhatsApp
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLinkUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold text-center transition-colors"
                  >
                    Share on Facebook
                  </a>
                </div>
              </div>
            ) : null}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  setSelectedProductForLink(null);
                  setGeneratedLinkUrl(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <h3 className="text-lg font-serif font-semibold text-slate-900 mb-1">Add Payout Method</h3>
            <p className="text-xs text-slate-500 mb-4">Select Easypaisa, JazzCash, or any Pakistani Bank</p>

            <form onSubmit={handleSavePayoutMethod} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Channel</label>
                <select
                  value={newMethodData.method}
                  onChange={(e) => setNewMethodData({ ...newMethodData, method: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium"
                >
                  <option value="easypaisa">Easypaisa Mobile Account</option>
                  <option value="jazzcash">JazzCash Mobile Account</option>
                  <option value="bank_transfer">Bank Account (1Link / Raast)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Account Title (Exact Name)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={newMethodData.account_title}
                  onChange={(e) => setNewMethodData({ ...newMethodData, account_title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                  Account Number / Mobile # / IBAN
                </label>
                <input
                  type="text"
                  required
                  placeholder="03001234567 or PK00BANK..."
                  value={newMethodData.account_number}
                  onChange={(e) => setNewMethodData({ ...newMethodData, account_number: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono"
                />
              </div>

              {newMethodData.method === 'bank_transfer' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Bank Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meezan Bank, HBL, Bank Alfalah"
                    value={newMethodData.bank_name}
                    onChange={(e) => setNewMethodData({ ...newMethodData, bank_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="method_default"
                  checked={newMethodData.is_default}
                  onChange={(e) => setNewMethodData({ ...newMethodData, is_default: e.target.checked })}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="method_default" className="text-xs text-slate-600">Set as default payout destination</label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMethodModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingMethod}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider"
                >
                  {savingMethod ? 'Saving...' : 'Save Method'}
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <h3 className="text-lg font-serif font-semibold text-slate-900 mb-1">Request Withdrawal</h3>
            <p className="text-xs text-slate-500 mb-4">
              Available: <strong className="text-amber-700 font-bold">PKR {(summary?.availableBalance || 0).toLocaleString()}</strong>
            </p>

            {withdrawError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs mb-4">
                {withdrawError}
              </div>
            )}

            {withdrawSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs mb-4">
                {withdrawSuccess}
              </div>
            )}

            <form onSubmit={handleRequestWithdrawal} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">Payout Destination</label>
                {payoutMethods.length === 0 ? (
                  <p className="text-xs text-rose-600">Please add a payout method first.</p>
                ) : (
                  <select
                    value={selectedMethodId}
                    onChange={(e) => setSelectedMethodId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium"
                  >
                    {payoutMethods.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.method.toUpperCase()} — {m.account_title} ({m.account_number})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 leading-relaxed border border-slate-200/80">
                &bull; Requested amount is immediately locked from your available balance.<br />
                &bull; CC Carvan finance team manually audits and transfers funds via Raast/1Link with an official payment reference.
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={withdrawing || payoutMethods.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs tracking-wider disabled:opacity-50 shadow-md shadow-amber-500/20"
                >
                  {withdrawing ? 'Submitting...' : 'Confirm Withdrawal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500 mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CC Carvan" className="h-6 w-auto object-contain" />
            <span>&copy; {new Date().getFullYear()} CC Carvan. Official Partner Network.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <Link href="/affiliate/terms" className="hover:text-amber-700">Program Terms</Link>
            <a href="mailto:support@cccarvan.com" className="hover:text-amber-700">Creator Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
