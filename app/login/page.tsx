"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Building2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@finops-crm.io");
  const [password, setPassword] = useState("••••••••••••");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-100">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-2xl shadow-lg shadow-blue-500/30">
          F
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-white">
          FinOps CRM Platform
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Enterprise Cloud Revenue & Margin Operations
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 shadow-2xl border border-slate-800 rounded-2xl space-y-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-slate-400">
                <input type="checkbox" defaultChecked className="rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500 mr-2" />
                Remember this device
              </label>
              <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
            </div>

            <Link
              href="/dashboard"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 group"
            >
              Sign In to Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-center">
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified & End-to-End Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
