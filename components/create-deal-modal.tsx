"use client";

import React, { useState, useEffect } from "react";
import { X, Building2, User, Phone, Mail, DollarSign, Cloud, Tag, Sparkles } from "lucide-react";
import { Lead } from "@/components/lead-drawer";

interface DealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newLead: Lead) => void;
}

export function CreateDealModal({ isOpen, onClose, onSuccess }: DealModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    arr: "$50,000",
    cloudSpend: "$5.0k/mo AWS",
    source: "website_form",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const createdLead = await res.json();
        onSuccess(createdLead);
        onClose();
        setFormData({
          company: "",
          contact: "",
          email: "",
          phone: "",
          arr: "$50,000",
          cloudSpend: "$5.0k/mo AWS",
          source: "website_form",
        });
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create deal");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating deal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="font-bold text-sm">Create New FinOps Deal</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-mono text-slate-500 mb-1">Company Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Acme Cloud Corp"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-slate-500 mb-1">Contact Name & Title *</label>
              <input
                type="text"
                required
                placeholder="John Doe (VP Infra)"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-500 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="john@acme.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-slate-500 mb-1">Phone Number *</label>
              <input
                type="text"
                required
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-500 mb-1">Target Deal ARR</label>
              <input
                type="text"
                placeholder="$75,000"
                value={formData.arr}
                onChange={(e) => setFormData({ ...formData, arr: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-slate-500 mb-1">Cloud Infrastructure Spend</label>
              <input
                type="text"
                placeholder="$10.0k/mo AWS"
                value={formData.cloudSpend}
                onChange={(e) => setFormData({ ...formData, cloudSpend: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-500 mb-1">Lead Channel Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="website_form">Website Form (Inbound)</option>
                <option value="meta_ads">Meta Lead Ad</option>
                <option value="cold_outreach">Cold Outreach</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? "Calculating Lead Score & Creating..." : "Save Deal to MySQL & Start SOP"}
          </button>
        </form>
      </div>
    </div>
  );
}
