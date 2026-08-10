"use client";

import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED, useSidebar } from "./sidebar-context";

/**
 * Sidebar + offset content. The offset is driven by the same width constants
 * the sidebar uses, so the two can no longer drift apart (the old layout
 * hardcoded ml-64 against a w-72 sidebar, and ignored the collapsed state
 * entirely).
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed, setMobileOpen } = useSidebar();

  return (
    <div className="min-h-dvh">
      <Sidebar />

      <div
        className="transition-[padding-left] duration-300 ease-out lg:[padding-left:var(--rail)]"
        style={
          {
            "--rail": collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
          } as React.CSSProperties
        }
      >
        {/* Mobile top bar — the only way to reach the drawer below lg. */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/85 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="-ml-2 rounded-field p-2 text-ink-600 transition-colors hover:bg-ink-100 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-gradient text-xs font-bold text-white">
              U
            </span>
            Ultimo Bots
          </span>
        </header>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
