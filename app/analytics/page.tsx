"use client";

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { BarChart3, Cloud, Server, DollarSign, TrendingDown, Cpu, Database, Zap } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Cloud Cost & Profitability Analytics"
          subtitle="AWS, GCP & Azure unit economics breakdown per customer contract"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Analytics & Costs" }]}
        />

        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Top Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Total Monthly Infrastructure</span>
                <Cloud className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold font-mono text-slate-900 mt-2">$142,850.00</div>
              <div className="text-xs text-emerald-600 mt-1 font-semibold">-5.4% vs last month</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>AWS Cost Share</span>
                <Server className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-extrabold font-mono text-slate-900 mt-2">$98,400.00</div>
              <div className="text-xs text-slate-500 mt-1">68.8% of total infra</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Google Cloud (GCP)</span>
                <Cpu className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-extrabold font-mono text-slate-900 mt-2">$32,150.00</div>
              <div className="text-xs text-slate-500 mt-1">BigQuery & Vertex AI</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Gross COGS Margin</span>
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold font-mono text-emerald-600 mt-2">76.2%</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">+3.2% optimization target</div>
            </div>
          </div>

          {/* Detailed Cost Attribution Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Per-Customer Cloud Unit Economics</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono text-slate-500 uppercase">
                    <th className="p-3">Customer Account</th>
                    <th className="p-3">Monthly Contract</th>
                    <th className="p-3">Compute (EKS/EC2)</th>
                    <th className="p-3">Storage (S3/DB)</th>
                    <th className="p-3">Total Cost</th>
                    <th className="p-3">Gross Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {[
                    { name: "FinTech Global Operations", contract: "$42,500", compute: "$12,400", storage: "$4,200", total: "$16,600", margin: "60.9%" },
                    { name: "Acme Cloud Infrastructure", contract: "$20,000", compute: "$3,100", storage: "$1,200", total: "$4,300", margin: "78.5%" },
                    { name: "Quantum Analytics Lab", contract: "$10,416", compute: "$4,800", storage: "$2,100", total: "$6,900", margin: "33.7%" },
                    { name: "BioGen Research", contract: "$8,166", compute: "$1,200", storage: "$450", total: "$1,650", margin: "79.7%" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-sans font-semibold text-slate-900">{row.name}</td>
                      <td className="p-3 font-bold text-slate-900">{row.contract}</td>
                      <td className="p-3 text-slate-600">{row.compute}</td>
                      <td className="p-3 text-slate-600">{row.storage}</td>
                      <td className="p-3 font-bold text-rose-600">{row.total}</td>
                      <td className="p-3 font-bold text-emerald-600">{row.margin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
