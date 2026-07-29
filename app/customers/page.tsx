"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Search, Building2, ShieldAlert, CheckCircle2, MoreVertical, ExternalLink, Mail, Phone, ArrowUpRight } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  industry: string;
  arr: string;
  cogsMargin: string;
  stripeStatus: "Active" | "Past Due" | "Trialing";
  cloudSpend: string;
  contractRenewal: string;
  healthScore: number;
}

const customerData: Customer[] = [
  { id: "cust_1", name: "Acme Cloud Infrastructure", industry: "SaaS Platform", arr: "$240,000", cogsMargin: "78.4%", stripeStatus: "Active", cloudSpend: "$34,200/mo", contractRenewal: "2026-11-15", healthScore: 92 },
  { id: "cust_2", name: "FinTech Global Operations", industry: "Banking & Finance", arr: "$510,000", cogsMargin: "82.1%", stripeStatus: "Active", cloudSpend: "$88,000/mo", contractRenewal: "2026-09-01", healthScore: 98 },
  { id: "cust_3", name: "Quantum Analytics Lab", industry: "AI & Machine Learning", arr: "$125,000", cogsMargin: "61.2%", stripeStatus: "Past Due", cloudSpend: "$29,500/mo", contractRenewal: "2026-08-10", healthScore: 64 },
  { id: "cust_4", name: "BioGen Research", industry: "Healthcare & Life Sciences", arr: "$98,000", cogsMargin: "74.0%", stripeStatus: "Active", cloudSpend: "$12,800/mo", contractRenewal: "2027-01-20", healthScore: 88 },
  { id: "cust_5", name: "LogiStream Supply Chain", industry: "Logistics Enterprise", arr: "$180,000", cogsMargin: "71.5%", stripeStatus: "Active", cloudSpend: "$22,400/mo", contractRenewal: "2026-10-30", healthScore: 85 },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Customer Account Directory"
          subtitle="Contract ARR, Stripe payment health & cloud COGS efficiency tracking"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Customers" }]}
        />

        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Top Bar Filter */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="relative w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by company name, industry..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Total Active ARR: <strong className="text-slate-900">$1,153,000</strong>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Company & Industry</th>
                  <th className="py-3.5 px-4">Contract ARR</th>
                  <th className="py-3.5 px-4">Cloud Spend (COGS)</th>
                  <th className="py-3.5 px-4">Net Margin</th>
                  <th className="py-3.5 px-4">Stripe Billing</th>
                  <th className="py-3.5 px-4">Renewal Date</th>
                  <th className="py-3.5 px-4">Health Score</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {customerData.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-semibold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{c.name}</div>
                        <div className="text-[11px] text-slate-500 font-normal">{c.industry}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">{c.arr}/yr</td>
                    <td className="py-4 px-4 font-mono text-slate-600">{c.cloudSpend}</td>
                    <td className="py-4 px-4 font-mono font-semibold text-emerald-600">{c.cogsMargin}</td>
                    <td className="py-4 px-4">
                      {c.stripeStatus === "Active" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                          <ShieldAlert className="w-3 h-3" /> Past Due
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-600">{c.contractRenewal}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              c.healthScore > 85 ? "bg-emerald-500" : c.healthScore > 70 ? "bg-amber-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${c.healthScore}%` }}
                          />
                        </div>
                        <span className="font-mono text-slate-700 font-bold text-[11px]">{c.healthScore}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
