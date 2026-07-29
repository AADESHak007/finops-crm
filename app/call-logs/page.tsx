"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Play, Pause, Search, Loader2 } from "lucide-react";
import { LeadDetailDrawer, Lead } from "@/components/lead-drawer";

interface CallLogItem {
  id: string;
  leadId: string;
  outcome: string;
  durationSeconds: number;
  notes: string;
  createdAt: string;
  lead: Lead;
}

export default function CallLogsPage() {
  const [logs, setLogs] = useState<CallLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCallLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/call-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error("Failed to load call logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs();
  }, []);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.lead?.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.outcome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search call transcripts, company..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Total Logged Dials: <strong className="text-slate-900 font-bold">{logs.length} Calls</strong>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 flex items-center justify-center text-slate-500 gap-2 text-xs font-mono">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> Loading Call Logs from Aiven MySQL...
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs font-mono">
                No call logs found. Start a softphone call from the Leads Pipeline to record outreach logs!
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono text-slate-500 uppercase">
                    <th className="p-3.5">Company & Contact</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Logged Outcome</th>
                    <th className="p-3.5">Call Notes / Summary</th>
                    <th className="p-3.5">Audio Recording Player</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-sans font-semibold text-slate-900 cursor-pointer" onClick={() => setSelectedLead(log.lead)}>
                        <div className="hover:text-blue-600 transition-colors">{log.lead?.company || "Unknown"}</div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {log.lead?.contact} • {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600">{formatDuration(log.durationSeconds)}</td>
                      <td className="p-3.5 font-sans font-medium text-slate-800">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                          {log.outcome}
                        </span>
                      </td>
                      <td className="p-3.5 font-sans text-slate-600 max-w-xs truncate" title={log.notes}>
                        {log.notes || "No notes entered."}
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
                              <span>{formatDuration(log.durationSeconds)}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-right font-sans">
                        <button
                          onClick={() => setSelectedLead(log.lead)}
                          className="text-blue-600 hover:underline font-medium text-xs"
                        >
                          View Timeline & Drawer
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
