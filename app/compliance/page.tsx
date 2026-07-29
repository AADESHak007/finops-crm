"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ShieldCheck, Lock, FileText, CheckCircle, ExternalLink, Calendar, Key, AlertCircle } from "lucide-react";
import { LeadDetailDrawer, Lead } from "@/components/lead-drawer";

interface AuditAgreement {
  id: string;
  company: string;
  contractVal: string;
  signedDate: string;
  ipAddress: string;
  stripeSync: "Synced" | "Pending";
  auditHash: string;
  leadData: Lead;
}

const auditAgreements: AuditAgreement[] = [
  {
    id: "AGR-9901",
    company: "Acme Cloud Infrastructure",
    contractVal: "$240,000 / yr",
    signedDate: "2026-07-15 14:22 UTC",
    ipAddress: "192.168.1.104 (Verified DocuSign)",
    stripeSync: "Synced",
    auditHash: "0x8f9a2b1c4e7d...",
    leadData: { id: "1", company: "Acme Cloud Infrastructure", contact: "Sarah Jenkins (CFO)", phone: "+1 555-1234", email: "sarah@acme.io", arr: "$240,000", score: 95, stage: 5, cloudSpend: "$34.2k/mo", tags: ["Audit Complete"] }
  },
  {
    id: "AGR-9902",
    company: "FinTech Global Operations",
    contractVal: "$510,000 / yr",
    signedDate: "2026-07-10 09:15 UTC",
    ipAddress: "10.0.42.11 (Verified Enterprise Sign)",
    stripeSync: "Synced",
    auditHash: "0x3e4f5a6b7c8d...",
    leadData: { id: "2", company: "FinTech Global Operations", contact: "Marcus Vance", phone: "+1 555-9876", email: "marcus@fintech.io", arr: "$510,000", score: 98, stage: 5, cloudSpend: "$88.0k/mo", tags: ["Compliance Verified"] }
  },
];

export default function CompliancePage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Compliance & Audit Portal"
          subtitle="Read-only immutable contract logs, e-signature IP verifications & Stripe sync ledger"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Compliance & Audit" }]}
        />

        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <div>
                <h3 className="font-bold text-sm">SOC2 Type II & Auditor Mode Active</h3>
                <p className="text-xs text-slate-400 mt-0.5">All customer agreement hashes and payment records are cryptographically verified.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono text-slate-500 uppercase">
                  <th className="p-3.5">Agreement ID & Company</th>
                  <th className="p-3.5">Contract Value</th>
                  <th className="p-3.5">Timestamp & IP Address</th>
                  <th className="p-3.5">Stripe Ledger Status</th>
                  <th className="p-3.5">SHA-256 Audit Hash</th>
                  <th className="p-3.5 text-right">Audit Drawer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {auditAgreements.map((agr) => (
                  <tr key={agr.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-sans font-semibold text-slate-900">
                      <div className="text-blue-600 font-mono text-xs">{agr.id}</div>
                      <div className="text-slate-800 mt-0.5">{agr.company}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{agr.contractVal}</td>
                    <td className="p-3.5 text-slate-600">
                      <div>{agr.signedDate}</div>
                      <div className="text-[10px] text-slate-400">{agr.ipAddress}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px] font-sans inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> {agr.stripeSync}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{agr.auditHash}</td>
                    <td className="p-3.5 text-right font-sans">
                      <button
                        onClick={() => setSelectedLead(agr.leadData)}
                        className="text-blue-600 hover:underline font-medium text-xs flex items-center gap-1 justify-end ml-auto"
                      >
                        Read-Only Audit <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <LeadDetailDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onOpenCallModal={() => {}}
        onOpenProposalGen={() => {}}
        onMarkSignedAndPaid={() => {}}
        readOnly={true}
      />
    </div>
  );
}
