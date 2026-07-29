"use client";

import React, { useState, useEffect } from "react";
import { Phone, PhoneOff, Mic, MicOff, Check, X, Sparkles, FileText } from "lucide-react";

interface CallModalProps {
  isOpen: boolean;
  companyName: string;
  contactName: string;
  onClose: () => void;
  onSubmitOutcome: (outcome: string, notes: string) => void;
}

export function CallOutcomeModal({
  isOpen,
  companyName,
  contactName,
  onClose,
  onSubmitOutcome,
}: CallModalProps) {
  const [callState, setCallState] = useState<"dialing" | "connected" | "ended">("dialing");
  const [timer, setTimer] = useState(0);
  const [outcome, setOutcome] = useState("Connected - Interested");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setCallState("dialing");
      setTimer(0);
      return;
    }

    const connectTimeout = setTimeout(() => {
      setCallState("connected");
    }, 2000);

    return () => clearTimeout(connectTimeout);
  }, [isOpen]);

  useEffect(() => {
    let interval: any;
    if (callState === "connected") {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!isOpen) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Softphone Bar */}
        <div className="bg-slate-900 text-white p-6 text-center space-y-3 relative">
          <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center mx-auto text-blue-400">
            <Phone className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-base font-bold">{companyName}</div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">{contactName}</div>
          </div>

          <div className="font-mono text-xs text-emerald-400 font-semibold">
            {callState === "dialing" && "Dialing softphone line..."}
            {callState === "connected" && `Connected • ${formatTime(timer)}`}
            {callState === "ended" && "Call Finished • Log Outcome"}
          </div>

          {callState !== "ended" && (
            <button
              onClick={() => setCallState("ended")}
              className="mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <PhoneOff className="w-4 h-4" /> End Call
            </button>
          )}
        </div>

        {/* Post-Call Outcome Form */}
        {callState === "ended" ? (
          <div className="p-6 space-y-4 text-xs">
            <div className="font-bold text-slate-900 text-sm">Post-Call Outcome Logging</div>

            <div>
              <label className="block text-slate-500 font-mono mb-1">Call Outcome</label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Connected - Interested (Advance to Proposal)</option>
                <option>Connected - Follow up needed</option>
                <option>Left Voicemail</option>
                <option>Not Interested</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-mono mb-1">Call Notes & Action Items</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Key takeaways from conversation..."
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => onSubmitOutcome(outcome, notes)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Outcome & Advance SOP
            </button>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400">
            Active softphone call in progress... Click "End Call" to log transcript notes.
          </div>
        )}
      </div>
    </div>
  );
}
