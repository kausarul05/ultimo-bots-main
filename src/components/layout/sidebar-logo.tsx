"use client";

import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

export function SidebarLogo() {
  const { collapsed, toggleCollapsed, setMobileOpen } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-16 shrink-0 items-center border-b border-white/10",
        collapsed ? "justify-center px-2" : "justify-between px-4"
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 rounded-field focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-lg font-bold text-brand-800 shadow-sm">
          U
        </span>
        {!collapsed && (
          <span className="text-[1.0625rem] font-semibold tracking-tight text-white">
            Ultimo<span className="text-white/60">Bots</span>
          </span>
        )}
      </Link>

      {!collapsed && (
        <div className="flex items-center">
          {/* Desktop: collapse to rail */}
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label="Collapse sidebar"
            className="hidden rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:block"
          >
            <PanelLeftClose className="h-[18px] w-[18px]" />
          </button>

          {/* Mobile: dismiss the drawer */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>
      )}

      {collapsed && (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label="Expand sidebar"
          className="absolute -right-3 top-[1.375rem] hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-ink-500 shadow-card transition-colors hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:flex"
        >
          <PanelLeftOpen className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
