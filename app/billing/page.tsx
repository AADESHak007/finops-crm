"use client";

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CreditCard, FileText, Download, CheckCircle, Clock, AlertTriangle, RefreshCw, DollarSign, ArrowUpRight } from "lucide-react";

export default function BillingPage() {
  const invoices = [
    { id: "INV-2026-0891", customer: "Acme Cloud Infrastructure", amount: "$20,000.00", date: "2026-07-01", status: "Paid", method: "Stripe ACH", usageOverage: "+$2,400 AWS" },
    { id: "INV-2026-0892", customer: "Quantum Analytics Lab", amount: "$10,416.66", date: "2026-07-01", status: "Past Due", method: "Credit Card", usageOverage: "$0.00" },
    { id: "INV-2026-0893", customer: "FinTech Global Operations", amount: "$42,500.00", date: "2026-07-15", status: "Paid", method: "Wire Transfer", usageOverage: "+$6,800 AWS" },
    { id: "INV-2026-0894", customer: "LogiStream Supply Chain", amount: "$15,000.00", date: "2026-07-20", status: "Pending", method: "Stripe ACH", usageOverage: "+$1,200 GCP" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Billing & Invoice Reconciliation"
          subtitle="Stripe automated subscription sync & cloud usage overage reconciliation"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Billing & Invoices" }]}
        />

        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-mono text-slate-500 uppercase">Total Billed (July 2026)</div>
              <div className="text-2xl font-extrabold font-mono text-slate-900 mt-2">$87,916.66</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">92.4% collected via Stripe</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-mono text-slate-500 uppercase">Unbilled Cloud Overages</div>
              <div className="text-2xl font-extrabold font-mono text-amber-600 mt-2">$10,400.00</div>
              <div className="text-xs text-slate-500 mt-1">4 pending invoice additions</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-mono text-slate-500 uppercase">Past Due Receivables</div>
              <div className="text-2xl font-extrabold font-mono text-rose-600 mt-2">$10,416.66</div>
              <div className="text-xs text-rose-600 font-semibold mt-1">1 overdue account (Action needed)</div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Recent Stripe Invoices & Usage Adjustments</h3>
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Sync Stripe API
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-500">
                    <th className="p-3">Invoice ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Base Contract</th>
                    <th className="p-3">Cloud Overage</th>
                    <th className="p-3">Issue Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-600 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        {inv.id}
                      </td>
                      <td className="p-3 font-sans font-semibold text-slate-900">{inv.customer}</td>
                      <td className="p-3 font-bold text-slate-900">{inv.amount}</td>
                      <td className="p-3 text-amber-600 font-bold">{inv.usageOverage}</td>
                      <td className="p-3 text-slate-500">{inv.date}</td>
                      <td className="p-3 font-sans">
                        {inv.status === "Paid" && (
                          <span className="bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Paid
                          </span>
                        )}
                        {inv.status === "Past Due" && (
                          <span className="bg-rose-50 text-rose-700 font-semibold px-2.5 py-0.5 rounded-full border border-rose-200">
                            Past Due
                          </span>
                        )}
                        {inv.status === "Pending" && (
                          <span className="bg-amber-50 text-amber-700 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right font-sans">
                        <button className="text-blue-600 hover:underline font-medium text-xs">
                          Download PDF
                        </button>
                      </td>
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
