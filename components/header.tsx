"use client";

import { Search, Bell, Plus, Download, SlidersHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Header({ title, subtitle, breadcrumbs }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center text-xs font-mono text-slate-500 mb-1 space-x-1">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center">
                {idx > 0 && <ChevronRight className="w-3 h-3 mx-1 text-slate-400" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-slate-900 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ARR, deals, invoices..."
            className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Quick Filters */}
        <button className="p-2 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filter</span>
        </button>

        {/* Export */}
        <button className="p-2 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors">
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-md transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        {/* Primary CTA */}
        <Link
          href="/leads"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3.5 py-2 rounded-md shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Deal</span>
        </Link>
      </div>
    </header>
  );
}
