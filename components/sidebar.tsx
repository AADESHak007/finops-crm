"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Kanban,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  ArrowUpRight,
  ChevronDown,
  Building2,
  LogOut,
  Phone,
  Shield,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads & Pipeline", href: "/leads", icon: Kanban, badge: "12 New" },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Billing & Invoices", href: "/billing", icon: CreditCard, badge: "2 Due" },
  { name: "Call Logs", href: "/call-logs", icon: Phone },
  { name: "Analytics & Costs", href: "/analytics", icon: BarChart3 },
  { name: "Compliance & Audit", href: "/compliance", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800 select-none flex-shrink-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-500/30">
            F
          </div>
          <div>
            <span className="font-semibold text-white tracking-tight text-base block leading-none">
              FinOps CRM
            </span>
            <span className="text-[10px] font-mono text-slate-400 mt-1 block">
              Enterprise v2.4
            </span>
          </div>
        </Link>
      </div>

      {/* Org Selector */}
      <div className="px-3 py-3">
        <button className="w-full flex items-center justify-between p-2 rounded-md bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-colors text-xs font-medium text-slate-200">
          <div className="flex items-center gap-2 truncate">
            <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="truncate">Acme Corp Global</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="px-3 py-2 flex-1 space-y-1">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 px-3 pb-2 pt-1">
          Core Platform
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600/15 text-blue-400 border-l-4 border-blue-500 pl-2"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-semibold ${
                  isActive ? "bg-blue-500/20 text-blue-300" : "bg-slate-800 text-slate-400"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Cloud Cost Widget */}
      <div className="p-3 m-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
          <span>AWS / GCP Usage</span>
          <span className="text-emerald-400 flex items-center font-bold">
            -4.2% <ArrowUpRight className="w-3 h-3 ml-0.5 rotate-45" />
          </span>
        </div>
        <div className="text-lg font-bold font-mono text-white">$42,850.00</div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-blue-500 h-full w-[68%]" />
        </div>
        <span className="text-[10px] text-slate-400 mt-1 block">68% of monthly budget</span>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-slate-800 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
            AD
          </div>
          <div className="truncate">
            <div className="text-xs font-semibold text-white truncate">Alex Dev</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">FinOps Director</div>
          </div>
        </div>
        <Link href="/login" title="Logout" className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 hover:bg-slate-800 rounded">
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
}
