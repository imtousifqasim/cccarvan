'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, DollarSign, Clock, CheckCircle, XCircle, AlertTriangle, 
  Search, Filter, Download, ArrowUpRight, Check, X, Shield, Settings, 
  CreditCard, Eye, RefreshCw, ExternalLink, Sliders, ChevronRight
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Growth & Partners</span>
          <h1 className="text-2xl font-serif text-white tracking-tight mt-0.5">Affiliate Marketing Center</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage creator partners, approve registrations, verify sales attributions, and process withdrawals.
          </p>
        </div>

        {/* Global Settings / Live Storefront Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/affiliate/register"
            target="_blank"
            className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Public Registration Page
          </Link>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex overflow-x-auto gap-2 border-b border-neutral-800 no-scrollbar">
        {[
          { id: 'directory', label: `Affiliates Directory (${counters.all})`, icon: Users },
          { id: 'withdrawals', label: `Withdrawals Queue (${withdrawals.filter(w => w.status === 'pending').length} pending)`, icon: CreditCard },
          { id: 'sales', label: 'All Affiliate Sales', icon: DollarSign },
          { id: 'settings', label: 'Program Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
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
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Total Affiliates</span>
              <p className="text-2xl font-serif text-white mt-1">{counters.all}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-amber-500/30">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">Pending Approvals</span>
              <p className="text-2xl font-serif text-amber-400 mt-1">{counters.pending}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Active & Approved</span>
              <p className="text-2xl font-serif text-emerald-400 mt-1">{counters.approved}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Default Commission</span>
              <p className="text-2xl font-serif text-neutral-200 mt-1">{settings.default_commission_rate}%</p>
            </div>
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-neutral-900/30 p-4 rounded-xl border border-neutral-800">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === st.value
                      ? 'bg-amber-500 text-neutral-950 font-semibold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, code..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchAffiliates()}
                className="w-full sm:w-64 bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Affiliates Table */}
          <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/60 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Affiliate Name & Contact</th>
                    <th className="py-3.5 px-4 font-semibold">Promo Channels</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Referral Code</th>
                    <th className="py-3.5 px-4 font-semibold">Commission Rate</th>
                    <th className="py-3.5 px-4 font-semibold">Performance</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-500 animate-pulse">
                        Loading affiliates...
                      </td>
                    </tr>
                  ) : affiliates.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-500">
                        No affiliate accounts found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    affiliates.map(aff => {
                      const statusBadges: Record<string, string> = {
                        approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                        rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                        suspended: 'bg-neutral-800 text-neutral-400 border-neutral-700',
                      };

                      return (
                        <tr key={aff.id} className="hover:bg-neutral-900/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-white block">{aff.full_name}</span>
                            <span className="text-[11px] text-neutral-400">{aff.email}</span>
                            {aff.phone && <span className="text-[10px] text-neutral-500 block">{aff.phone}</span>}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            {aff.website_or_social && (
                              <span className="text-[11px] text-amber-400 truncate block">
                                {aff.website_or_social}
                              </span>
                            )}
                            <span className="text-[10px] text-neutral-400 line-clamp-1">
                              {aff.promo_details || '—'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${statusBadges[aff.status] || 'bg-neutral-800'}`}>
                              {aff.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-medium text-amber-400">
                            {aff.referral_code || '—'}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-white">
                              {aff.commission_rate != null ? `${aff.commission_rate}% (Custom)` : `${settings.default_commission_rate}% (Default)`}
                            </span>
                            <button
                              onClick={() => {
                                setActionAffiliate(aff);
                                setActionType('rate');
                                setCustomRate(aff.commission_rate != null ? aff.commission_rate : settings.default_commission_rate);
                              }}
                              className="text-[10px] text-neutral-400 hover:text-amber-400 block underline mt-0.5"
                            >
                              Edit rate
                            </button>
                          </td>
                          <td className="py-3.5 px-4">
                            {aff.stats ? (
                              <div className="text-[11px]">
                                <span className="text-white font-medium">PKR {Number(aff.stats.totalEarned).toLocaleString()}</span>
                                <span className="text-neutral-500 block text-[10px]">{aff.stats.totalClicks} clicks &bull; {aff.stats.totalOrders} sales</span>
                              </div>
                            ) : (
                              <span className="text-neutral-500 text-[10px]">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Drill-down inspect */}
                              <button
                                onClick={() => handleViewDetail(aff.id)}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                                title="View Account Dashboard"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {aff.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleUpdateStatus(aff.id, 'approved')}
                                    className="px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActionAffiliate(aff);
                                      setActionType('reject');
                                      setRejectionReason('');
                                    }}
                                    className="px-2.5 py-1 rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 text-[11px] font-medium transition-colors"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}

                              {aff.status === 'approved' && (
                                <button
                                  onClick={() => handleUpdateStatus(aff.id, 'suspended')}
                                  className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 text-[10px] transition-colors"
                                >
                                  Suspend
                                </button>
                              )}

                              {aff.status === 'suspended' && (
                                <button
                                  onClick={() => handleUpdateStatus(aff.id, 'approved')}
                                  className="px-2.5 py-1 rounded bg-emerald-600/20 text-emerald-400 text-[10px] font-medium"
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
            <h2 className="text-lg font-serif text-white">Withdrawals Processing Queue</h2>
            <button
              onClick={fetchWithdrawals}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs text-neutral-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/60 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Affiliate</th>
                    <th className="py-3.5 px-4 font-semibold">Amount</th>
                    <th className="py-3.5 px-4 font-semibold">Payout Destination</th>
                    <th className="py-3.5 px-4 font-semibold">Requested Date</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Reference</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {withdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-neutral-500">
                        No withdrawal requests in queue.
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map(w => (
                      <tr key={w.id} className="hover:bg-neutral-900/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-white block">{w.affiliate?.full_name || 'Affiliate'}</span>
                          <span className="text-[11px] text-neutral-400">{w.affiliate?.email}</span>
                          {w.affiliate?.phone && <span className="text-[10px] text-neutral-500 block">{w.affiliate.phone}</span>}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-amber-400">
                          PKR {Number(w.amount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-neutral-900 border border-neutral-800 text-neutral-200">
                            {w.method}
                          </span>
                          <p className="text-xs font-medium text-white mt-1">{w.account_title}</p>
                          <p className="text-[11px] font-mono text-neutral-400">{w.account_number}</p>
                          {w.bank_name && <p className="text-[10px] text-neutral-500">{w.bank_name}</p>}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-400">
                          {new Date(w.requested_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-neutral-900 border border-neutral-800">
                            {w.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-300">
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
                                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider transition-colors"
                              >
                                Mark as Paid
                              </button>
                              <button
                                onClick={() => {
                                  const note = prompt('Enter rejection note (released back to balance):');
                                  if (note !== null) {
                                    handleProcessWithdrawal(w.id, 'rejected', undefined, note);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-rose-400 text-xs transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-neutral-500 capitalize">Done ({w.status})</span>
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
            <h2 className="text-lg font-serif text-white">All Attributed Sales & Commissions</h2>

            <div className="flex items-center gap-3">
              <button
                onClick={exportSalesToCSV}
                className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-neutral-900/30 p-3 rounded-xl border border-neutral-800 text-xs">
            <select
              value={salesStatusFilter}
              onChange={e => setSalesStatusFilter(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-neutral-200"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending Hold</option>
              <option value="approved">Approved & Cleared</option>
              <option value="reversed">Reversed / Cancelled</option>
            </select>

            <button
              onClick={fetchSales}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 font-semibold"
            >
              Apply Filter
            </button>
          </div>

          <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/60 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Order #</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold">Affiliate</th>
                    <th className="py-3.5 px-4 font-semibold">Product</th>
                    <th className="py-3.5 px-4 font-semibold">Qty</th>
                    <th className="py-3.5 px-4 font-semibold">Sale (PKR)</th>
                    <th className="py-3.5 px-4 font-semibold">Rate</th>
                    <th className="py-3.5 px-4 font-semibold">Commission</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {salesLoading ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-neutral-500 animate-pulse">Loading sales...</td>
                    </tr>
                  ) : sales.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-neutral-500">No sales recorded yet.</td>
                    </tr>
                  ) : (
                    sales.map(s => (
                      <tr key={s.id} className="hover:bg-neutral-900/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-medium text-white">
                          {s.order?.order_number || s.order_number || 'CCC-ORDER'}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-400">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-neutral-200 block">{s.affiliate?.full_name || s.affiliate_name}</span>
                          <span className="text-[10px] text-amber-500/80 font-mono">{s.affiliate?.referral_code || s.referral_code}</span>
                        </td>
                        <td className="py-3.5 px-4 text-white max-w-xs truncate">
                          {s.product?.name || s.product_name || 'Product'}
                        </td>
                        <td className="py-3.5 px-4">{s.quantity}</td>
                        <td className="py-3.5 px-4 font-medium">PKR {Number(s.sale_amount).toLocaleString()}</td>
                        <td className="py-3.5 px-4 text-neutral-400">{s.commission_rate}%</td>
                        <td className="py-3.5 px-4 font-semibold text-amber-400">
                          PKR {Number(s.commission_amount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-neutral-900 border border-neutral-800">
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
          <div className="bg-neutral-950/70 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-serif text-white mb-1">Global Affiliate Settings</h2>
            <p className="text-xs text-neutral-400 mb-6">
              Configure baseline commission percentages, attribution cookie life, holding window, and payout rules.
            </p>

            {settingsMessage && (
              <div className={`p-4 rounded-xl text-xs mb-6 ${settingsMessage.startsWith('Error') ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
                {settingsMessage}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1">
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
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Applied to affiliates who do not have a custom commission tier assigned.
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  Attribution Cookie Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  required
                  value={settings.cookie_days}
                  onChange={e => setSettings({ ...settings, cookie_days: Number(e.target.value) })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Duration the first-party `ccc_ref` cookie remains active on the visitor&#39;s browser (Default: 30 days).
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  Clearance Hold Period (Days)
                </label>
                <input
                  type="number"
                  min="0"
                  max="90"
                  required
                  value={settings.hold_days}
                  onChange={e => setSettings({ ...settings, hold_days: Number(e.target.value) })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Days after delivery before commission becomes withdrawable (safeguards against returns/cancellations).
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  Minimum Withdrawal Amount (PKR)
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  required
                  value={settings.min_withdrawal}
                  onChange={e => setSettings({ ...settings, min_withdrawal: Number(e.target.value) })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Minimum cleared balance required before an affiliate can submit a withdrawal request.
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-900">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-serif text-white mb-1">Decline Affiliate Application</h3>
            <p className="text-xs text-neutral-400 mb-4">Applicant: {actionAffiliate.full_name} ({actionAffiliate.email})</p>

            <textarea
              rows={3}
              placeholder="Provide a constructive reason (visible to the affiliate)..."
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActionType(null)}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(actionAffiliate.id, 'rejected', rejectionReason)}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs uppercase tracking-wider"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-serif text-white mb-1">Set Custom Commission Rate</h3>
            <p className="text-xs text-neutral-400 mb-4">Affiliate: {actionAffiliate.full_name}</p>

            <div className="mb-4">
              <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">Custom Rate (%)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={customRate}
                onChange={e => setCustomRate(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder={`Default is ${settings.default_commission_rate}%`}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActionType(null)}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(actionAffiliate.id, actionAffiliate.status, undefined, customRate === '' ? null : Number(customRate))}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-serif text-white mb-1">Mark Withdrawal as Paid</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Amount: <strong className="text-emerald-400">PKR {Number(markPaidWithdrawal.amount).toLocaleString()}</strong> &bull; {markPaidWithdrawal.method.toUpperCase()}
            </p>

            <div className="p-3 rounded-lg bg-neutral-900 text-xs text-neutral-300 space-y-1 mb-4 border border-neutral-800">
              <p><strong>Title:</strong> {markPaidWithdrawal.account_title}</p>
              <p><strong>Number:</strong> {markPaidWithdrawal.account_number}</p>
              {markPaidWithdrawal.bank_name && <p><strong>Bank:</strong> {markPaidWithdrawal.bank_name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-[10px] uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                Transaction Reference / Bank Receipt ID <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EP-89218291 or TXN-49102"
                value={transactionRef}
                onChange={e => setTransactionRef(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setMarkPaidWithdrawal(null)}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                disabled={!transactionRef.trim() || processingWithdrawal}
                onClick={() => handleProcessWithdrawal(markPaidWithdrawal.id, 'paid', transactionRef)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-end">
          <div className="w-full max-w-2xl h-full bg-neutral-950 border-l border-neutral-800 p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">Affiliate Drill-Down</span>
                <h3 className="text-lg font-serif text-white">{detailData?.affiliate?.full_name || 'Loading...'}</h3>
                <span className="text-xs text-neutral-400">{detailData?.affiliate?.email}</span>
              </div>
              <button
                onClick={() => {
                  setDetailAffiliateId(null);
                  setDetailData(null);
                }}
                className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {detailLoading || !detailData ? (
              <div className="py-20 text-center text-xs text-neutral-500 animate-pulse">Loading affiliate profile...</div>
            ) : (
              <div className="space-y-6">
                {/* Financial Overview Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase">Total Earned</span>
                    <p className="text-lg font-serif text-white mt-0.5">PKR {Number(detailData.stats?.totalEarned || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-amber-500/30">
                    <span className="text-[10px] text-amber-400 uppercase">Available Balance</span>
                    <p className="text-lg font-serif text-amber-400 mt-0.5">PKR {Number(detailData.stats?.availableBalance || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase">Total Withdrawn</span>
                    <p className="text-lg font-serif text-white mt-0.5">PKR {Number(detailData.stats?.withdrawnAmount || 0).toLocaleString()}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] text-neutral-400 uppercase">Total Clicks</span>
                    <p className="text-lg font-serif text-white mt-0.5">{detailData.stats?.totalClicks || 0}</p>
                  </div>
                </div>

                {/* Generated Links */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-2">Tracking Links ({detailData.links?.length || 0})</h4>
                  <div className="bg-neutral-900 rounded-xl p-3 max-h-40 overflow-y-auto space-y-1.5 text-xs">
                    {detailData.links?.map((l: any) => (
                      <div key={l.id} className="flex justify-between items-center text-neutral-300 py-1 border-b border-neutral-800/50">
                        <span className="truncate max-w-xs">{l.product?.name || l.category?.name || 'Storefront'}</span>
                        <span className="font-mono text-amber-400">/r/{l.slug} ({l.click_count} clicks)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Attributed Commissions */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-2">Attributed Sales ({detailData.commissions?.length || 0})</h4>
                  <div className="bg-neutral-900 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 text-xs">
                    {detailData.commissions?.map((c: any) => (
                      <div key={c.id} className="flex justify-between items-center text-neutral-300 py-1 border-b border-neutral-800/50">
                        <div>
                          <span className="text-white font-medium block">{c.product?.name || 'Item'}</span>
                          <span className="text-[10px] text-neutral-400">{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-amber-400 font-semibold block">PKR {Number(c.commission_amount).toLocaleString()}</span>
                          <span className="text-[10px] uppercase text-neutral-500">{c.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Payout Methods */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-2">Payout Accounts ({detailData.payoutMethods?.length || 0})</h4>
                  <div className="space-y-2">
                    {detailData.payoutMethods?.map((pm: any) => (
                      <div key={pm.id} className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
                        <span className="uppercase text-[10px] text-amber-400 font-semibold">{pm.method}</span>
                        <p className="font-medium text-white">{pm.account_title} &bull; {pm.account_number}</p>
                        {pm.bank_name && <p className="text-[10px] text-neutral-400">{pm.bank_name}</p>}
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
