"use client";

import React, { useState } from "react";
import { X, Building2, ShieldAlert, CheckCircle2, Sparkles } from "lucide-react";

interface CreateCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newCust: any) => void;
}

export function CreateCustomerModal({ isOpen, onClose, onSuccess }: CreateCustomerModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    arr: "$150,000",
    cloudSpend: "$20,000/mo",
    cogsMargin: "78.0%",
    stripeStatus: "Active",
    contractRenewal: "2026-12-31",
    healthScore: 90,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const created = await res.json();
        onSuccess(created);
        onClose();
        setFormData({
          name: "",
          industry: "",
          arr: "$150,000",
          cloudSpend: "$20,000/mo",
          cogsMargin: "78.0%",
          stripeStatus: "Active",
          contractRenewal: "2026-12-31",
          healthScore: 90,
        });
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create customer");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating customer account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h2 className="font-bold text-sm">Add Customer Account</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-slate-500 mb-1">Company Name *</label>
              <input
                type="text"
                required
                placeholder="Acme Global Inc"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-500 mb-1">Industry *</label>
              <input
                type="text"
                required
                placeholder="SaaS / Enterprise"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-slate-500 mb-1">Contract ARR</label>
              <input
                type="text"
                placeholder="$200,000"
                value={formData.arr}
                onChange={(e) => setFormData({ ...formData, arr: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-500 mb-1">Cloud Spend (COGS)</label>
              <input
                type="text"
                placeholder="$25,000/mo"
                value={formData.cloudSpend}
                onChange={(e) => setFormData({ ...formData, cloudSpend: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-mono text-slate-500 mb-1">COGS Margin</label>
              <input
                type="text"
                placeholder="80.0%"
                value={formData.cogsMargin}
                onChange={(e) => setFormData({ ...formData, cogsMargin: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-500 mb-1">Stripe Status</label>
              <select
                value={formData.stripeStatus}
                onChange={(e) => setFormData({ ...formData, stripeStatus: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Past Due">Past Due</option>
                <option value="Trialing">Trialing</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-slate-500 mb-1">Health Score (1-100)</label>
              <input
                type="number"
                min={1}
                max={100}
                value={formData.healthScore}
                onChange={(e) => setFormData({ ...formData, healthScore: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? "Adding Customer..." : "Save Account to Aiven Database"}
          </button>
        </form>
      </div>
    </div>
  );
}
