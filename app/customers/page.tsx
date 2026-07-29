"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Search, Building2, ShieldAlert, CheckCircle2, MoreVertical, Plus, Trash2, Loader2 } from "lucide-react";
import { CreateCustomerModal } from "@/components/create-customer-modal";

interface Customer {
  id: string;
  name: string;
  industry: string;
  arr: string;
  cogsMargin: string;
  stripeStatus: string;
  cloudSpend: string;
  contractRenewal: string;
  healthScore: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/customers");
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreateSuccess = (newCust: Customer) => {
    setCustomers((prev) => [newCust, ...prev]);
  };

  const handleDeleteCustomer = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
  };

  const handleToggleStripeStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Past Due" : "Active";
    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeStatus: nextStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
      }
    } catch (err) {
      console.error("Failed to toggle Stripe status:", err);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalARR = () => {
    const total = customers.reduce((acc, c) => {
      const val = parseInt(c.arr.replace(/[^0-9]/g, ""), 10) || 0;
      return acc + val;
    }, 0);
    return total.toLocaleString();
  };

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
          {/* Top Bar Filter & Actions */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by company name, industry..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="text-xs text-slate-500 font-mono">
                Total Active ARR: <strong className="text-slate-900 font-bold">${calculateTotalARR()}</strong>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3.5 py-2 rounded-md shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Customer</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 flex items-center justify-center text-slate-500 gap-2 text-xs font-mono">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> Loading Customers from Aiven MySQL...
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs font-mono">
                No customer accounts found. Click "Add Customer" to create an account!
              </div>
            ) : (
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
                  {filteredCustomers.map((c) => (
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
                        <button
                          onClick={() => handleToggleStripeStatus(c.id, c.stripeStatus)}
                          title="Click to toggle status"
                          className="focus:outline-none"
                        >
                          {c.stripeStatus === "Active" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors">
                              <CheckCircle2 className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 hover:bg-rose-100 transition-colors">
                              <ShieldAlert className="w-3 h-3" /> Past Due
                            </span>
                          )}
                        </button>
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
                        <button
                          onClick={() => handleDeleteCustomer(c.id, c.name)}
                          className="text-rose-500 hover:text-rose-700 p-1.5 rounded-md hover:bg-rose-50 transition-colors"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      <CreateCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
