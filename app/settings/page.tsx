"use client";

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Key, Shield, UserPlus, CreditCard, Cloud, Database, Bell, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Platform Settings & Integrations"
          subtitle="Manage Stripe API keys, AWS Cost Explorer IAM roles, and team access control"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Settings" }]}
        />

        <main className="p-6 space-y-6 flex-1 overflow-y-auto max-w-4xl">
          {/* API Integrations Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-600" /> Connected Cloud & Payment Services
                </h3>
                <p className="text-xs text-slate-500">Live API connections for real-time FinOps reconciliation</p>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                All Connected
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Stripe Billing API Key</div>
                  <div className="font-mono text-slate-500 text-[11px] mt-0.5">rk_live_9482710398...••••••••</div>
                </div>
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-100">
                  Update Key
                </button>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">AWS Cost Explorer IAM Role ARN</div>
                  <div className="font-mono text-slate-500 text-[11px] mt-0.5">arn:aws:iam::227897712717:role/FinOpsCostExplorerReadOnly</div>
                </div>
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-100">
                  Verify IAM
                </button>
              </div>
            </div>
          </div>

          {/* Team Permissions */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" /> Team Permissions & RBAC
              </h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
                <UserPlus className="w-3.5 h-3.5" /> Invite Member
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Alex Dev", email: "alex@finops-crm.io", role: "Super Admin", status: "Active" },
                { name: "Sarah Jenkins", email: "sarah@finops-crm.io", role: "FinOps Director", status: "Active" },
                { name: "Marcus Vance", email: "marcus@finops-crm.io", role: "Engineering Lead", status: "Active" },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">{user.name}</div>
                    <div className="text-slate-500 text-[11px] font-mono">{user.email}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-slate-600 text-[11px] bg-slate-100 px-2 py-0.5 rounded">{user.role}</span>
                    <span className="text-emerald-600 font-semibold text-[11px]">{user.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
