"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Plus, Search, Filter, Flame, CheckCircle2, Phone, FileText, Sparkles, ArrowRight } from "lucide-react";
import { LeadDetailDrawer, Lead } from "@/components/lead-drawer";
import { CallOutcomeModal } from "@/components/call-modal";

const initialLeads: Lead[] = [
  { id: "1", company: "Apex Financial", contact: "Sarah Jenkins (CFO)", phone: "+1 (555) 234-5678", email: "sarah@apex.io", arr: "$120,000", score: 94, stage: 1, cloudSpend: "$12.4k/mo AWS", tags: ["High Margin", "Enterprise"] },
  { id: "2", company: "DataPulse AI", contact: "Marcus Vance (VP Eng)", phone: "+1 (555) 345-6789", email: "marcus@datapulse.ai", arr: "$48,000", score: 78, stage: 1, cloudSpend: "$4.1k/mo GCP", tags: ["Growth"] },
  { id: "3", company: "CloudScale Logic", contact: "David Wu (FinOps Lead)", phone: "+1 (555) 876-5432", email: "david@cloudscale.io", arr: "$85,000", score: 88, stage: 2, cloudSpend: "$18.9k/mo Multi-cloud", tags: ["FinOps Optimization"] },
  { id: "4", company: "Nova Pay Tech", contact: "Elena Rostova (CTO)", phone: "+1 (555) 901-2345", email: "elena@novapay.com", arr: "$64,000", score: 82, stage: 3, cloudSpend: "$8.2k/mo AWS", tags: ["Fintech"] },
  { id: "5", company: "Vanguard Quant Labs", contact: "Arthur Pendelton (MD)", phone: "+1 (555) 678-9012", email: "arthur@vanguard.io", arr: "$210,000", score: 96, stage: 4, cloudSpend: "$42.0k/mo AWS", tags: ["Enterprise VIP"] },
  { id: "6", company: "Hyperion Defense", contact: "Dr. Karen Lee", phone: "+1 (555) 432-1098", email: "karen@hyperion.def", arr: "$150,000", score: 91, stage: 5, cloudSpend: "$28.0k/mo GovCloud", tags: ["Security"] },
];

const columns = [
  { stage: 1, title: "1. Outreach", color: "border-blue-500" },
  { stage: 2, title: "2. Discovery Audit", color: "border-indigo-500" },
  { stage: 3, title: "3. Proposal Sent", color: "border-amber-500" },
  { stage: 4, title: "4. Agreement & Stripe", color: "border-purple-500" },
  { stage: 5, title: "5. Closed Won", color: "border-emerald-500" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [showConfettiToast, setShowConfettiToast] = useState(false);

  const filteredLeads = leads.filter(
    (l) =>
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenLead = (lead: Lead) => {
    setActiveLead(lead);
  };

  const handleCallSubmitOutcome = (outcome: string, notes: string) => {
    setIsCallModalOpen(false);
    if (!activeLead) return;

    const nextStage = Math.min(activeLead.stage + 1, 5);
    const updated = leads.map((l) => (l.id === activeLead.id ? { ...l, stage: nextStage } : l));
    setLeads(updated);
    setActiveLead({ ...activeLead, stage: nextStage });
  };

  const handleGenerateProposal = () => {
    if (!activeLead) return;
    const updated = leads.map((l) => (l.id === activeLead.id ? { ...l, stage: 4 } : l));
    setLeads(updated);
    setActiveLead({ ...activeLead, stage: 4 });
  };

  const handleMarkSignedAndPaid = () => {
    if (!activeLead) return;
    const updated = leads.map((l) => (l.id === activeLead.id ? { ...l, stage: 5 } : l));
    setLeads(updated);
    setActiveLead({ ...activeLead, stage: 5 });

    setShowConfettiToast(true);
    setTimeout(() => setShowConfettiToast(false), 4000);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Lead & Deal SOP Pipeline"
          subtitle="Click any row or card to open the Lead Detail Drawer & run softphone calls"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Leads & Pipeline" }]}
        />

        {showConfettiToast && (
          <div className="bg-emerald-600 text-white p-3 px-6 text-center font-bold text-xs shadow-lg animate-in slide-in-from-top flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin" /> 🎉 DEAL CLOSED & PAID! Stage auto-updated to Closed Won & Synced to Stripe!
          </div>
        )}

        <main className="p-6 space-y-6 flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search deals, company..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="text-xs font-mono text-slate-500">
                Pipeline Value: <strong className="text-slate-900 font-bold">$677,000 ARR</strong>
              </div>
            </div>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1 overflow-x-auto pb-4">
            {columns.map((col) => {
              const colLeads = filteredLeads.filter((l) => l.stage === col.stage);

              return (
                <div key={col.stage} className="flex flex-col rounded-xl border border-slate-200 bg-slate-100/60 p-3 h-full">
                  <div className={`flex items-center justify-between pb-2 mb-3 border-b-2 ${col.color}`}>
                    <h3 className="font-bold text-xs text-slate-900 truncate">{col.title}</h3>
                    <span className="text-[10px] font-mono font-bold bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                      {colLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                    {colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => handleOpenLead(lead)}
                        className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-400 cursor-pointer space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-xs text-slate-900">{lead.company}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{lead.contact}</div>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                            {lead.score}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-100">
                          <span className="font-extrabold text-slate-900">{lead.arr}</span>
                          <span className="text-slate-400 text-[10px]">{lead.cloudSpend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <LeadDetailDrawer
        lead={activeLead}
        onClose={() => setActiveLead(null)}
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenProposalGen={handleGenerateProposal}
        onMarkSignedAndPaid={handleMarkSignedAndPaid}
      />

      <CallOutcomeModal
        isOpen={isCallModalOpen}
        companyName={activeLead?.company || ""}
        contactName={activeLead?.contact || ""}
        onClose={() => setIsCallModalOpen(false)}
        onSubmitOutcome={handleCallSubmitOutcome}
      />
    </div>
  );
}
