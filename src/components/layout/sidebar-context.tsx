"use client";

import * as React from "react";

interface SidebarContextValue {
  /** Desktop rail state. */
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggleCollapsed: () => void;
  /** Off-canvas drawer state, used below the lg breakpoint. */
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  /** False until the persisted value has been read, to avoid a hydration flash. */
  ready: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

const STORAGE_KEY = "ub:sidebar-collapsed";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  // Restore the user's preference. Reading in an effect keeps the server and
  // first client render identical.
  React.useEffect(() => {
    try {
      setCollapsedState(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // Private browsing or blocked storage — fall back to expanded.
    }
    setReady(true);
  }, []);

  const setCollapsed = React.useCallback((value: boolean) => {
    setCollapsedState(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Persistence is a nicety; ignore failures.
    }
  }, []);

  const toggleCollapsed = React.useCallback(
    () => setCollapsed(!collapsed),
    [collapsed, setCollapsed]
  );

  const value = React.useMemo(
    () => ({ collapsed, setCollapsed, toggleCollapsed, mobileOpen, setMobileOpen, ready }),
    [collapsed, setCollapsed, toggleCollapsed, mobileOpen, ready]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

/** Rail widths, shared by the sidebar and the content offset so they can't drift. */
export const SIDEBAR_WIDTH = "17rem";
export const SIDEBAR_WIDTH_COLLAPSED = "4.75rem";
