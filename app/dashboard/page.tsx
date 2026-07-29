"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  Building2,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  BarChart2,
  Calendar,
  Cloud,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="FinOps Executive Overview"
          subtitle="Real-time Financial KPI tracking, ARR metrics & Revenue Leakage Detection"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Overview" }]}
        />

        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wider">
                <span>Annual Recurring Revenue</span>
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-mono text-slate-900">$4,850,200</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  +14.8% <TrendingUp className="w-3 h-3 ml-0.5" />
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">+$124.5k added this month</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wider">
                <span>Net Revenue Retention (NRR)</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-mono text-slate-900">118.4%</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  +2.1% <TrendingUp className="w-3 h-3 ml-0.5" />
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Target benchmark &gt; 115%</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wider">
                <span>Cloud Margin Efficiency</span>
                <Cloud className="w-4 h-4 text-purple-600" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-mono text-slate-900">76.2%</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  +3.4% <TrendingUp className="w-3 h-3 ml-0.5" />
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">COGS reduced by $18.2k</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase tracking-wider">
                <span>Active Enterprise Accounts</span>
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-mono text-slate-900">142</span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  8 Pipeline
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Avg Deal Size: $34.1k/yr</p>
            </div>
          </div>

          {/* FinOps AI Alerts & Leakage Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-white">FinOps AI Leakage Detection Alert</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    Action Required
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Detected 3 enterprise accounts with unbilled AWS usage spikes exceeding contracted API tier caps. Potential unrealized ARR leakage: <strong className="text-emerald-400 font-mono">$14,200/mo</strong>.
                </p>
              </div>
            </div>
            <Link
              href="/billing"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              Reconcile Invoices <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Charts & Deals Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue & Margin Growth Chart Box */}
            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">ARR Growth & Net Margins (Q1-Q3 2026)</h3>
                  <p className="text-xs text-slate-500">Monthly breakdown of gross retention vs infra costs</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center text-xs text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1" /> ARR
                  </span>
                  <span className="flex items-center text-xs text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1" /> Gross Profit
                  </span>
                </div>
              </div>

              {/* Visual Simulated Bar Chart */}
              <div className="py-6 space-y-4">
                {[
                  { month: "Jan", arr: "$3.8M", arrWidth: "70%", profit: "$2.9M", profitWidth: "55%" },
                  { month: "Feb", arr: "$4.1M", arrWidth: "75%", profit: "$3.1M", profitWidth: "60%" },
                  { month: "Mar", arr: "$4.3M", arrWidth: "80%", profit: "$3.3M", profitWidth: "64%" },
                  { month: "Apr", arr: "$4.5M", arrWidth: "85%", profit: "$3.5M", profitWidth: "68%" },
                  { month: "May", arr: "$4.8M", arrWidth: "92%", profit: "$3.7M", profitWidth: "74%" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-slate-600">
                      <span>{item.month}</span>
                      <span>{item.arr}</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="bg-blue-600 h-full transition-all" style={{ width: item.arrWidth }} />
                      <div className="bg-emerald-500 h-full transition-all opacity-80" style={{ width: item.profitWidth }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Updated 5 mins ago via Stripe & AWS Cost Explorer API</span>
                <Link href="/analytics" className="text-blue-600 hover:underline font-semibold flex items-center">
                  Full Analytics <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </div>
            </div>

            {/* High Priority Pipeline Deals */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Top Pipeline Opportunities</h3>
                <Link href="/leads" className="text-xs text-blue-600 hover:underline font-medium">
                  View Kanban
                </Link>
              </div>

              <div className="mt-4 space-y-3 flex-1">
                {[
                  { company: "Apex Financial Systems", val: "$120,000/yr", stage: "Negotiation", score: "94 Lead Score", color: "bg-blue-100 text-blue-700" },
                  { company: "CloudScale Logic", val: "$85,000/yr", stage: "Contract Review", score: "88 Lead Score", color: "bg-purple-100 text-purple-700" },
                  { company: "Nova Pay Tech", val: "$64,000/yr", stage: "Proposal Sent", score: "82 Lead Score", color: "bg-amber-100 text-amber-700" },
                  { company: "Vanguard Quant Labs", val: "$210,000/yr", stage: "Discovery", score: "96 Lead Score", color: "bg-emerald-100 text-emerald-700" },
                ].map((deal, i) => (
                  <div key={i} className="p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-slate-50/50 transition-all flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{deal.company}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-slate-500">{deal.stage}</span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${deal.color}`}>
                          {deal.score}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-bold font-mono text-slate-900">{deal.val}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/leads"
                  className="w-full block text-center py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors"
                >
                  Manage All 24 Active Deals
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
