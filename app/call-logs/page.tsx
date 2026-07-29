"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Play, Pause, PhoneCall, CheckCircle, Clock, Volume2, Search, Filter } from "lucide-react";
import { LeadDetailDrawer, Lead } from "@/components/lead-drawer";

interface CallLog {
  id: string;
  company: string;
  rep: string;
  duration: string;
  outcome: string;
  timestamp: string;
  sentiment: "Positive" | "Neutral" | "Needs Review";
  audioUrl: string;
  leadData: Lead;
}

const mockLogs: CallLog[] = [
  {
    id: "log-1",
    company: "Apex Financial",
    rep: "Alex Dev",
    duration: "4m 12s",
    outcome: "Proposal Requested",
    timestamp: "Today, 09:12 AM",
    sentiment: "Positive",
    audioUrl: "#",
    leadData: { id: "1", company: "Apex Financial", contact: "Sarah Jenkins (CFO)", phone: "+1 (555) 234-5678", email: "sarah@apex.io", arr: "$120,000", score: 94, stage: 2, cloudSpend: "$12.4k/mo AWS", tags: ["Enterprise"] }
  },
  {
    id: "log-2",
    company: "CloudScale Logic",
    rep: "Sarah Jenkins",
    duration: "8m 45s",
    outcome: "Follow-up Scheduled",
    timestamp: "Yesterday, 03:40 PM",
    sentiment: "Positive",
    audioUrl: "#",
    leadData: { id: "3", company: "CloudScale Logic", contact: "David Wu (FinOps Lead)", phone: "+1 (555) 876-5432", email: "david@cloudscale.io", arr: "$85,000", score: 88, stage: 3, cloudSpend: "$18.9k/mo Multi-cloud", tags: ["FinOps Optimization"] }
  },
];

export default function CallLogsPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Outbound Call Logs & Transcripts"
          subtitle="AI Sentiment analysis, call audio recordings, and audit trail logs"
          breadcrumbs={[{ label: "FinOps CRM", href: "/dashboard" }, { label: "Call Logs" }]}
        />

        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="relative w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search call transcripts, company..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Recorded Calls This Week: <strong className="text-slate-900">42 Calls</strong>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono text-slate-500 uppercase">
                  <th className="p-3.5">Company & Rep</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Logged Outcome</th>
                  <th className="p-3.5">AI Sentiment</th>
                  <th className="p-3.5">Audio Recording Player</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {mockLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-sans font-semibold text-slate-900 cursor-pointer" onClick={() => setSelectedLead(log.leadData)}>
                      <div className="hover:text-blue-600 transition-colors">{log.company}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{log.rep} • {log.timestamp}</div>
                    </td>
                    <td className="p-3.5 text-slate-600">{log.duration}</td>
                    <td className="p-3.5 font-sans font-medium text-slate-800">{log.outcome}</td>
                    <td className="p-3.5">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                        {log.sentiment}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-lg border border-slate-200 max-w-xs">
                        <button
                          onClick={() => togglePlay(log.id)}
                          className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0"
                        >
                          {playingId === log.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                        </button>
                        <div className="flex-1 space-y-1">
                          <div className="h-1.5 bg-slate-300 rounded-full overflow-hidden">
                            <div className={`bg-blue-600 h-full transition-all ${playingId === log.id ? "w-[45%]" : "w-[0%]"}`} />
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-500">
                            <span>0:14</span>
                            <span>{log.duration}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-right font-sans">
                      <button
                        onClick={() => setSelectedLead(log.leadData)}
                        className="text-blue-600 hover:underline font-medium text-xs"
                      >
                        View Timeline & Drawer
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
      />
    </div>
  );
}
