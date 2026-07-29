"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Plus, Search, Sparkles, Loader2 } from "lucide-react";
import { LeadDetailDrawer, Lead } from "@/components/lead-drawer";
import { CallOutcomeModal } from "@/components/call-modal";
import { CreateDealModal } from "@/components/create-deal-modal";

const columns = [
  { stage: 1, title: "1. Outreach", color: "border-blue-500" },
  { stage: 2, title: "2. Discovery Audit", color: "border-indigo-500" },
  { stage: 3, title: "3. Proposal Sent", color: "border-amber-500" },
  { stage: 4, title: "4. Agreement & Stripe", color: "border-purple-500" },
  { stage: 5, title: "5. Closed Won", color: "border-emerald-500" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showConfettiToast, setShowConfettiToast] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Failed to load leads from database:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(
    (l) =>
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenLead = (lead: Lead) => {
    setActiveLead(lead);
  };

  const handleCreateDealSuccess = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleDeleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        setActiveLead(null);
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const handleCallSubmitOutcome = async (outcome: string, notes: string) => {
    setIsCallModalOpen(false);
    if (!activeLead) return;

    try {
      const res = await fetch("/api/calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: activeLead.id,
          outcome,
          notes,
          durationSeconds: 120,
        }),
      });

      if (res.ok) {
        const { lead: updatedLead } = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
        setActiveLead(updatedLead);
      }
    } catch (err) {
      console.error("Failed to submit call outcome:", err);
    }
  };

  const handleGenerateProposal = async () => {
    if (!activeLead) return;
    try {
      const res = await fetch(`/api/leads/${activeLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: 4 }),
      });

      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        setActiveLead(updated);
      }
    } catch (err) {
      console.error("Failed to advance stage to Proposal:", err);
    }
  };

  const handleMarkSignedAndPaid = async () => {
    if (!activeLead) return;
    try {
      const res = await fetch(`/api/leads/${activeLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: 5 }),
      });

      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        setActiveLead(updated);
        setShowConfettiToast(true);
        setTimeout(() => setShowConfettiToast(false), 4000);
      }
    } catch (err) {
      console.error("Failed to mark lead signed and paid:", err);
    }
  };

  const calculateTotalPipeline = () => {
    const total = leads.reduce((acc, lead) => {
      const val = parseInt(lead.arr.replace(/[^0-9]/g, ""), 10) || 0;
      return acc + val;
    }, 0);
    return total.toLocaleString();
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

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="text-xs font-mono text-slate-500">
                Pipeline Value: <strong className="text-slate-900 font-bold">${calculateTotalPipeline()} ARR</strong>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3.5 py-2 rounded-md shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>New Deal</span>
              </button>
            </div>
          </div>

          {/* Kanban Columns */}
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-slate-500 gap-2 text-xs font-mono">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> Loading CRM Pipeline from Aiven MySQL...
            </div>
          ) : (
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
          )}
        </main>
      </div>

      <LeadDetailDrawer
        lead={activeLead}
        onClose={() => setActiveLead(null)}
        onOpenCallModal={() => setIsCallModalOpen(true)}
        onOpenProposalGen={handleGenerateProposal}
        onMarkSignedAndPaid={handleMarkSignedAndPaid}
        onDeleteLead={handleDeleteLead}
      />

      <CallOutcomeModal
        isOpen={isCallModalOpen}
        companyName={activeLead?.company || ""}
        contactName={activeLead?.contact || ""}
        onClose={() => setIsCallModalOpen(false)}
        onSubmitOutcome={handleCallSubmitOutcome}
      />

      <CreateDealModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateDealSuccess}
      />
    </div>
  );
}
