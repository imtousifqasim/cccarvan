'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, DollarSign, Clock, CheckCircle, XCircle, AlertTriangle, 
  Search, Filter, Download, ArrowUpRight, Check, X, Shield, Settings, 
  CreditCard, Eye, RefreshCw, ExternalLink, Sliders, ChevronRight, Share2, LogIn
} from 'lucide-react';
import { Affiliate, AffiliateSettings, Withdrawal, Commission, AffiliateStatus } from '@/types/database';

export default function AdminAffiliatesPage() {
  const [activeTab, setActiveTab] = useState<'directory' | 'withdrawals' | 'sales' | 'settings'>('directory');

  // Directory Data
  const [loading, setLoading] = useState(true);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [counters, setCounters] = useState({ all: 0, pending: 0, approved: 0, rejected: 0, suspended: 0 });
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Withdrawals Queue Data
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [withdrawalFilter, setWithdrawalFilter] = useState<string>('');

  // All Sales Data
  const [sales, setSales] = useState<any[]>([]);
  const [salesLoading, setSalesLoading] = useState(false);
  const [salesStatusFilter, setSalesStatusFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Settings
  const [settings, setSettings] = useState<AffiliateSettings>({
    id: 1,
    default_commission_rate: 10,
    cookie_days: 30,
    hold_days: 7,
    min_withdrawal: 1000,
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);

  // Modals & Action States
  const [actionAffiliate, setActionAffiliate] = useState<Affiliate | null>(null);
  const [actionType, setActionType] = useState<'reject' | 'rate' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [customRate, setCustomRate] = useState<number | ''>('');

  // Affiliate Detail Drill-Down (Read-Only Mirror View)
  const [detailAffiliateId, setDetailAffiliateId] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Mark Paid Modal
  const [markPaidWithdrawal, setMarkPaidWithdrawal] = useState<Withdrawal | null>(null);
  const [transactionRef, setTransactionRef] = useState('');
  const [processingWithdrawal, setProcessingWithdrawal] = useState(false);

  // Direct Login / Impersonate State
  const [impersonatingId, setImpersonatingId] = useState<string | null>(null);

  // Fetch Affiliates List
  const fetchAffiliates = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/affiliates';
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.affiliates) setAffiliates(data.affiliates);
      if (data.counters) setCounters(data.counters);
      if (data.settings) setSettings(data.settings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffiliates();
  }, [statusFilter]);

  // Fetch Withdrawals
  const fetchWithdrawals = async () => {
    try {
      const res = await fetch('/api/admin/affiliates/withdrawals');
      const data = await res.json();
      if (data.withdrawals) setWithdrawals(data.withdrawals);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Sales
  const fetchSales = async () => {
    setSalesLoading(true);
    try {
      let url = '/api/admin/affiliates/sales';
      const params = new URLSearchParams();
      if (salesStatusFilter) params.append('status', salesStatusFilter);
      if (dateFrom) params.append('date_from', dateFrom);
      if (dateTo) params.append('date_to', dateTo);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.sales) setSales(data.sales);
    } catch (err) {
      console.error(err);
    } finally {
      setSalesLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'withdrawals') fetchWithdrawals();
    if (activeTab === 'sales') fetchSales();
  }, [activeTab]);

  // Handle Status Update (Approve, Reject, Suspend, Reactivate)
  const handleUpdateStatus = async (
    affiliateId: string, 
    newStatus: AffiliateStatus, 
    reason?: string,
    rate?: number | null
  ) => {
    try {
      const res = await fetch(`/api/admin/affiliates/${affiliateId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          rejectionReason: reason,
          commissionRate: rate,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAffiliates();
        setActionAffiliate(null);
        setActionType(null);
        setRejectionReason('');
      } else {
        alert(data.error || 'Failed to update affiliate');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // View Drill-down Detail
  const handleViewDetail = async (id: string) => {
    setDetailAffiliateId(id);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/affiliates/${id}`);
      const data = await res.json();
      if (data.success) {
        setDetailData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Direct Login as Affiliate (Impersonate)
  const handleImpersonate = async (id: string) => {
    setImpersonatingId(id);
    try {
      const res = await fetch(`/api/admin/affiliates/${id}/impersonate`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        window.open('/affiliate', '_blank');
      } else {
        alert(data.error || 'Failed to login as affiliate');
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in as affiliate');
    } finally {
      setImpersonatingId(null);
    }
  };

  // Process Withdrawal (Mark Paid or Reject)
  const handleProcessWithdrawal = async (
    id: string,
    status: 'approved' | 'paid' | 'rejected',
    reference?: string,
    note?: string
  ) => {
    setProcessingWithdrawal(true);
    try {
      const res = await fetch(`/api/admin/affiliates/withdrawals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          transactionReference: reference,
          adminNote: note,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchWithdrawals();
        setMarkPaidWithdrawal(null);
        setTransactionRef('');
      } else {
        alert(data.error || 'Action failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingWithdrawal(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMessage(null);
    try {
      const res = await fetch('/api/admin/affiliates/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsMessage('Settings saved successfully!');
      } else {
        setSettingsMessage(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setSettingsMessage(`Error: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  // Export Sales to CSV
  const exportSalesToCSV = () => {
    if (sales.length === 0) {
      alert('No sales data available to export');
      return;
    }

    const headers = [
      'Order Number',
      'Date & Time',
      'Affiliate Name',
      'Affiliate Email',
      'Referral Code',
      'Product Name',
      'Quantity',
      'Sale Amount (PKR)',
      'Commission Rate (%)',
      'Commission Amount (PKR)',
      'Status'
    ];

    const rows = sales.map(s => [
      `"${s.order?.order_number || s.order_number || ''}"`,
      `"${new Date(s.created_at).toLocaleString()}"`,
      `"${s.affiliate?.full_name || s.affiliate_name || ''}"`,
      `"${s.affiliate?.email || s.affiliate_email || ''}"`,
      `"${s.affiliate?.referral_code || s.referral_code || ''}"`,
      `"${s.product?.name || s.product_name || ''}"`,
      s.quantity,
      s.sale_amount,
      s.commission_rate,
      s.commission_amount,
      s.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cc_carvan_affiliate_sales_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
              Growth &amp; Partners
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5 mt-1.5">
            <Share2 className="w-6 h-6 text-amber-600" />
            <span>Affiliate Marketing Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage creator partners, review registrations, track attributed sales, and process withdrawal payouts.
          </p>
        </div>

        {/* Storefront & Public Registration Links */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/affiliate/register"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Public Registration</span>
          </Link>
          <Link
            href="/affiliate/login"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white flex items-center gap-1.5 transition shadow-xs"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            <span>Affiliate Portal</span>
          </Link>
        </div>
      </div>

      {/* Modern High-Contrast Tabs Bar */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'directory', label: `Affiliates Directory (${counters.all})`, icon: Users },
          { id: 'withdrawals', label: `Withdrawals Queue (${withdrawals.filter(w => w.status === 'pending').length} pending)`, icon: CreditCard },
          { id: 'sales', label: 'All Attributed Sales', icon: DollarSign },
          { id: 'settings', label: 'Program Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2.5 px-4 text-xs font-bold whitespace-nowrap rounded-xl transition ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: AFFILIATES DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* 4 Overview Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Total Affiliates</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{counters.all}</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold">Pending Approvals</span>
              <p className="text-2xl font-black text-amber-700 mt-1">{counters.pending}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Active &amp; Approved</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">{counters.approved}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Default Commission</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{settings.default_commission_rate}%</p>
            </div>
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: 'All', value: '' },
                { label: `Pending (${counters.pending})`, value: 'pending' },
                { label: `Approved (${counters.approved})`, value: 'approved' },
                { label: `Rejected (${counters.rejected})`, value: 'rejected' },
                { label: `Suspended (${counters.suspended})`, value: 'suspended' },
              ].map(st => (
                <button
                  key={st.value}
                  onClick={() => setStatusFilter(st.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    statusFilter === st.value
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, code..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchAffiliates()}
                className="w-full sm:w-72 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Affiliates Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Affiliate Contact</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Promo Channels</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Status</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Referral Code</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Commission Rate</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Performance</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 animate-pulse font-medium">
                        Loading affiliates directory...
                      </td>
                    </tr>
                  ) : affiliates.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                        No affiliate accounts found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    affiliates.map(aff => {
                      const statusBadges: Record<string, string> = {
                        approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                        pending: 'bg-amber-50 text-amber-700 border-amber-200',
                        rejected: 'bg-rose-50 text-rose-700 border-rose-200',
                        suspended: 'bg-slate-100 text-slate-700 border-slate-200',
                      };

                      return (
                        <tr key={aff.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{aff.full_name}</span>
                            <span className="text-[11px] text-slate-500">{aff.email}</span>
                            {aff.phone && <span className="text-[10px] text-slate-400 font-mono block">{aff.phone}</span>}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            {aff.website_or_social && (
                              <span className="text-[11px] font-semibold text-amber-700 truncate block">
                                {aff.website_or_social}
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500 line-clamp-1">
                              {aff.promo_details || '—'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadges[aff.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                              {aff.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {aff.referral_code ? (
                              <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                                {aff.referral_code}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900">
                              {aff.commission_rate != null ? `${aff.commission_rate}% (Custom)` : `${settings.default_commission_rate}% (Default)`}
                            </span>
                            <button
                              onClick={() => {
                                setActionAffiliate(aff);
                                setActionType('rate');
                                setCustomRate(aff.commission_rate != null ? aff.commission_rate : settings.default_commission_rate);
                              }}
                              className="text-[10px] text-amber-700 hover:text-amber-800 font-semibold block underline mt-0.5 cursor-pointer"
                            >
                              Edit rate
                            </button>
                          </td>
                          <td className="py-3.5 px-4">
                            {aff.stats ? (
                              <div className="text-[11px]">
                                <span className="text-slate-900 font-bold block">PKR {Number(aff.stats.totalEarned).toLocaleString()}</span>
                                <span className="text-slate-500 text-[10px]">{aff.stats.totalClicks} clicks &bull; {aff.stats.totalOrders} sales</span>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-[10px]">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Direct Login as Affiliate */}
                              <button
                                onClick={() => handleImpersonate(aff.id)}
                                disabled={impersonatingId === aff.id}
                                className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/90 text-amber-900 text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                                title="Direct Login to this Affiliate's Dashboard"
                              >
                                {impersonatingId === aff.id ? (
                                  <RefreshCw className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                                ) : (
                                  <LogIn className="w-3.5 h-3.5 text-amber-700" />
                                )}
                                <span>Direct Login</span>
                              </button>

                              {/* Drill-down inspect */}
                              <button
                                onClick={() => handleViewDetail(aff.id)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
                                title="Quick Drill-Down View"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {aff.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleUpdateStatus(aff.id, 'approved')}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors shadow-xs cursor-pointer"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActionAffiliate(aff);
                                      setActionType('reject');
                                      setRejectionReason('');
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold transition-colors shadow-2xs cursor-pointer"
                                  >
                                    Decline
                                  </button>
                                </>
                              )}

                              {aff.status === 'approved' && (
                                <button
                                  onClick={() => handleUpdateStatus(aff.id, 'suspended')}
                                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-[10px] font-semibold transition-colors cursor-pointer"
                                >
                                  Suspend
                                </button>
                              )}

                              {aff.status === 'suspended' && (
                                <button
                                  onClick={() => handleUpdateStatus(aff.id, 'approved')}
                                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold transition-colors cursor-pointer"
                                >
                                  Reactivate
                                </button>
                              )}
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
      {/* TAB 2: WITHDRAWALS QUEUE */}
      {/* ========================================================================= */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Withdrawals Processing Queue</h2>
            <button
              onClick={fetchWithdrawals}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition shadow-2xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Refresh Queue</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Affiliate</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Amount</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Payout Destination</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Requested Date</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Status</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Reference</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {withdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                        No withdrawal requests in queue.
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map(w => (
                      <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{w.affiliate?.full_name || 'Affiliate'}</span>
                          <span className="text-[11px] text-slate-500">{w.affiliate?.email}</span>
                          {w.affiliate?.phone && <span className="text-[10px] text-slate-400 font-mono block">{w.affiliate.phone}</span>}
                        </td>
                        <td className="py-3.5 px-4 font-black text-amber-700 text-sm">
                          PKR {Number(w.amount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 border border-slate-200 text-slate-700">
                            {w.method}
                          </span>
                          <p className="text-xs font-bold text-slate-900 mt-1">{w.account_title}</p>
                          <p className="text-[11px] font-mono text-slate-600">{w.account_number}</p>
                          {w.bank_name && <p className="text-[10px] text-slate-400">{w.bank_name}</p>}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-medium">
                          {new Date(w.requested_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            w.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            w.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {w.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700 font-semibold">
                          {w.transaction_reference || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {w.status === 'pending' || w.status === 'approved' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setMarkPaidWithdrawal(w);
                                  setTransactionRef('');
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-xs cursor-pointer"
                              >
                                Mark as Paid
                              </button>
                              <button
                                onClick={() => {
                                  const note = prompt('Enter rejection note (funds will be released back to affiliate balance):');
                                  if (note !== null) {
                                    handleProcessWithdrawal(w.id, 'rejected', undefined, note);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-semibold transition cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium capitalize">Processed ({w.status})</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ALL AFFILIATE SALES */}
      {/* ========================================================================= */}
      {activeTab === 'sales' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">All Attributed Sales &amp; Commissions</h2>

            <div className="flex items-center gap-3">
              <button
                onClick={exportSalesToCSV}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export CSV Report</span>
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-xs">
            <select
              value={salesStatusFilter}
              onChange={e => setSalesStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-amber-500 shadow-2xs"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending Hold</option>
              <option value="approved">Approved &amp; Cleared</option>
              <option value="reversed">Reversed / Cancelled</option>
            </select>

            <button
              onClick={fetchSales}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition shadow-xs cursor-pointer"
            >
              Apply Filter
            </button>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/90 text-slate-600 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Order #</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Date</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Affiliate</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Product</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Qty</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Sale (PKR)</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Rate</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700">Commission</th>
                    <th className="py-3.5 px-4 font-bold text-slate-700 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {salesLoading ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400 font-medium animate-pulse">Loading sales data...</td>
                    </tr>
                  ) : sales.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400 font-medium">No sales attributed yet.</td>
                    </tr>
                  ) : (
                    sales.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {s.order?.order_number || s.order_number || 'CCC-ORDER'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-medium">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{s.affiliate?.full_name || s.affiliate_name}</span>
                          <span className="text-[10px] text-amber-700 font-mono font-bold">{s.affiliate?.referral_code || s.referral_code}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-800 font-medium max-w-xs truncate">
                          {s.product?.name || s.product_name || 'Product'}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">{s.quantity}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">PKR {Number(s.sale_amount).toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-slate-500 font-semibold">{s.commission_rate}%</td>
                        <td className="py-3.5 px-4 font-black text-emerald-600">
                          PKR {Number(s.commission_amount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            s.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            s.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PROGRAM SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">Global Affiliate Settings</h2>
            <p className="text-xs text-slate-500 mb-6">
              Configure baseline commission percentages, attribution cookie life, holding window, and payout rules.
            </p>

            {settingsMessage && (
              <div className={`p-4 rounded-xl text-xs mb-6 font-semibold border ${settingsMessage.startsWith('Error') ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                {settingsMessage}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                  Default Commission Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  required
                  value={settings.default_commission_rate}
                  onChange={e => setSettings({ ...settings, default_commission_rate: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Applied to affiliates who do not have a custom commission tier assigned.
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                  Attribution Cookie Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  required
                  value={settings.cookie_days}
                  onChange={e => setSettings({ ...settings, cookie_days: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Duration the first-party `ccc_ref` cookie remains active on the visitor&#39;s browser (Default: 30 days).
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                  Clearance Hold Period (Days)
                </label>
                <input
                  type="number"
                  min="0"
                  max="90"
                  required
                  value={settings.hold_days}
                  onChange={e => setSettings({ ...settings, hold_days: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Days after delivery before commission becomes withdrawable (safeguards against returns/cancellations).
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                  Minimum Withdrawal Amount (PKR)
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  required
                  value={settings.min_withdrawal}
                  onChange={e => setSettings({ ...settings, min_withdrawal: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Minimum cleared balance required before an affiliate can submit a withdrawal request.
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {savingSettings ? 'Saving Settings...' : 'Save Global Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REJECT APPLICATION */}
      {/* ========================================================================= */}
      {actionType === 'reject' && actionAffiliate && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Decline Affiliate Application</h3>
              <p className="text-xs text-slate-500 mt-0.5">Applicant: {actionAffiliate.full_name} ({actionAffiliate.email})</p>
            </div>

            <textarea
              rows={3}
              placeholder="Provide a constructive reason (visible to the affiliate)..."
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActionType(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(actionAffiliate.id, 'rejected', rejectionReason)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CUSTOM COMMISSION RATE */}
      {/* ========================================================================= */}
      {actionType === 'rate' && actionAffiliate && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Set Custom Commission Rate</h3>
              <p className="text-xs text-slate-500 mt-0.5">Affiliate: {actionAffiliate.full_name}</p>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1.5">Custom Rate (%)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={customRate}
                onChange={e => setCustomRate(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder={`Default is ${settings.default_commission_rate}%`}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActionType(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(actionAffiliate.id, actionAffiliate.status, undefined, customRate === '' ? null : Number(customRate))}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                Save Rate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MARK WITHDRAWAL AS PAID */}
      {/* ========================================================================= */}
      {markPaidWithdrawal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Mark Withdrawal as Paid</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Amount: <strong className="text-emerald-700 font-black">PKR {Number(markPaidWithdrawal.amount).toLocaleString()}</strong> &bull; {markPaidWithdrawal.method.toUpperCase()}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-800 space-y-1.5 border border-slate-200">
              <p><strong>Title:</strong> {markPaidWithdrawal.account_title}</p>
              <p><strong>Number / IBAN:</strong> <span className="font-mono font-bold">{markPaidWithdrawal.account_number}</span></p>
              {markPaidWithdrawal.bank_name && <p><strong>Bank:</strong> {markPaidWithdrawal.bank_name}</p>}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                Transaction Reference / Bank Receipt ID <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EP-89218291 or TXN-49102"
                value={transactionRef}
                onChange={e => setTransactionRef(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setMarkPaidWithdrawal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={!transactionRef.trim() || processingWithdrawal}
                onClick={() => handleProcessWithdrawal(markPaidWithdrawal.id, 'paid', transactionRef)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {processingWithdrawal ? 'Processing...' : 'Confirm Paid'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER / MODAL: DRILL-DOWN AFFILIATE DETAIL (MIRROR DASHBOARD) */}
      {/* ========================================================================= */}
      {detailAffiliateId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-end">
          <div className="w-full max-w-2xl h-full bg-white border-l border-slate-200 p-6 overflow-y-auto space-y-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                  Affiliate Drill-Down
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1">{detailData?.affiliate?.full_name || 'Loading...'}</h3>
                <span className="text-xs text-slate-500">{detailData?.affiliate?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                {detailData?.affiliate && (
                  <button
                    onClick={() => handleImpersonate(detailData.affiliate.id)}
                    disabled={impersonatingId === detailData.affiliate.id}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-50"
                    title="Open live dashboard as this affiliate in a new tab"
                  >
                    {impersonatingId === detailData.affiliate.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <LogIn className="w-3.5 h-3.5" />
                    )}
                    <span>Direct Login to Dashboard</span>
                    <ExternalLink className="w-3 h-3 text-slate-950" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setDetailAffiliateId(null);
                    setDetailData(null);
                  }}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {detailLoading || !detailData ? (
              <div className="py-20 text-center text-xs text-slate-400 font-medium animate-pulse">Loading affiliate profile...</div>
            ) : (
              <div className="space-y-6">
                {/* Financial Overview Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Total Earned</span>
                    <p className="text-lg font-black text-slate-900 mt-0.5">PKR {Number(detailData.stats?.totalEarned || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                    <span className="text-[10px] text-amber-800 font-bold uppercase">Available Balance</span>
                    <p className="text-lg font-black text-amber-700 mt-0.5">PKR {Number(detailData.stats?.availableBalance || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Total Withdrawn</span>
                    <p className="text-lg font-black text-slate-900 mt-0.5">PKR {Number(detailData.stats?.withdrawnAmount || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Total Clicks</span>
                    <p className="text-lg font-black text-slate-900 mt-0.5">{detailData.stats?.totalClicks || 0}</p>
                  </div>
                </div>

                {/* Generated Links */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2">Tracking Links ({detailData.links?.length || 0})</h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-40 overflow-y-auto space-y-1.5 text-xs">
                    {detailData.links?.map((l: any) => (
                      <div key={l.id} className="flex justify-between items-center text-slate-800 py-1 border-b border-slate-200/60 last:border-0">
                        <span className="truncate max-w-xs font-medium">{l.product?.name || l.category?.name || 'Storefront'}</span>
                        <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">/r/{l.slug} ({l.click_count} clicks)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Attributed Commissions */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2">Attributed Sales ({detailData.commissions?.length || 0})</h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 text-xs">
                    {detailData.commissions?.map((c: any) => (
                      <div key={c.id} className="flex justify-between items-center text-slate-800 py-1.5 border-b border-slate-200/60 last:border-0">
                        <div>
                          <span className="text-slate-900 font-bold block">{c.product?.name || 'Item'}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-700 font-black block">PKR {Number(c.commission_amount).toLocaleString()}</span>
                          <span className="text-[10px] uppercase font-bold text-slate-500">{c.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Payout Methods */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-2">Payout Accounts ({detailData.payoutMethods?.length || 0})</h4>
                  <div className="space-y-2">
                    {detailData.payoutMethods?.map((pm: any) => (
                      <div key={pm.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <span className="uppercase text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">{pm.method}</span>
                        <p className="font-bold text-slate-900 mt-1">{pm.account_title} &bull; <span className="font-mono">{pm.account_number}</span></p>
                        {pm.bank_name && <p className="text-[10px] text-slate-500">{pm.bank_name}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
