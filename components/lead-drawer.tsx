"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X, Phone, Mail, Building2, Calendar, FileText, CheckCircle2,
  Clock, Shield, ArrowRight, Play, Award, DollarSign, Sparkles, Send
} from "lucide-react";

export interface Lead {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  arr: string;
  score: number;
  stage: number; // 1: Contact, 2: Discovery, 3: Proposal, 4: Agreement, 5: Closed Won
  cloudSpend: string;
  tags: string[];
}

interface LeadDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onOpenCallModal: () => void;
  onOpenProposalGen: () => void;
  onMarkSignedAndPaid: () => void;
  onDeleteLead?: (id: string) => void;
  readOnly?: boolean;
}

const SOP_STAGES = [
  "1. Initial Outreach",
  "2. FinOps Discovery",
  "3. Proposal & Audit",
  "4. Agreement & Stripe",
  "5. Closed Won",
];

export function LeadDetailDrawer({
  lead,
  onClose,
  onOpenCallModal,
  onOpenProposalGen,
  onMarkSignedAndPaid,
  onDeleteLead,
  readOnly = false,
}: LeadDrawerProps) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
              {lead.company.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900 text-base">{lead.company}</h2>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                  {lead.score} Lead Score
                </span>
              </div>
              <p className="text-xs text-slate-500">{lead.contact} • {lead.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!readOnly && onDeleteLead && (
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${lead.company}?`)) {
                    onDeleteLead(lead.id);
                  }
                }}
                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors text-xs font-mono font-bold"
                title="Delete Lead"
              >
                Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive SOP Stepper */}
        <div className="px-5 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>FinOps Standard Operating Procedure (SOP)</span>
            <span className="text-blue-400 font-bold">Stage {lead.stage} of 5</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {SOP_STAGES.map((stageName, idx) => {
              const stageNum = idx + 1;
              const isDone = stageNum < lead.stage;
              const isCurrent = stageNum === lead.stage;

              return (
                <div
                  key={idx}
                  className={`p-2 rounded text-center transition-all ${
                    isDone
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                      : isCurrent
                      ? "bg-blue-600 text-white font-bold ring-2 ring-blue-400 shadow-md"
                      : "bg-slate-800/80 text-slate-500"
                  }`}
                >
                  <div className="text-[10px] truncate">{stageName}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Body - Scrollable */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Action Hub / Softphone Widget */}
          {!readOnly && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-blue-900">Next Best Action (FinOps SOP)</div>
                <div className="text-xs text-blue-700 mt-0.5">
                  {lead.stage === 1 && "Perform initial phone outreach & verify AWS COGS data"}
                  {lead.stage === 2 && "Run cloud infrastructure audit with CFO"}
                  {lead.stage === 3 && "Send formal FinOps savings agreement"}
                  {lead.stage === 4 && "Awaiting e-signature & Stripe initial deposit"}
                  {lead.stage === 5 && "Account won! Initiate customer onboarding"}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {lead.stage <= 2 && (
                  <button
                    onClick={onOpenCallModal}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 fill-white" /> Start Softphone Call
                  </button>
                )}

                {lead.stage === 3 && (
                  <button
                    onClick={onOpenProposalGen}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" /> Generate Agreement Link
                  </button>
                )}

                {lead.stage === 4 && (
                  <button
                    onClick={onMarkSignedAndPaid}
                    className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" /> Mark Signed & Paid
                  </button>
                )}

                {lead.stage === 5 && (
                  <div className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Account Active
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deal Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Target ARR</span>
              <strong className="text-slate-900 text-sm font-extrabold">{lead.arr}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Cloud Infra Spend</span>
              <strong className="text-slate-900 text-sm">{lead.cloudSpend}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Lead Contact</span>
              <strong className="text-slate-900 text-xs font-sans">{lead.contact}</strong>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
              Activity & Call Audit Timeline
            </h3>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              <div className="flex gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-400 flex items-center justify-center text-blue-600 z-10">
                  <Phone className="w-3 h-3" />
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex-1 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Outbound Call Logged</span>
                    <span className="text-[10px] font-mono text-slate-400">Today, 09:12 AM</span>
                  </div>
                  <p className="text-slate-600">Spoke with CFO regarding AWS optimization. Agreed to review proposal.</p>
                </div>
              </div>

              <div className="flex gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-500 z-10">
                  <Mail className="w-3 h-3" />
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex-1 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Initial Audit Sent</span>
                    <span className="text-[10px] font-mono text-slate-400">Yesterday</span>
                  </div>
                  <p className="text-slate-600">Automated FinOps report generated and emailed to lead contact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
