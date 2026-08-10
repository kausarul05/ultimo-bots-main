"use client";

import { useEffect } from "react";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarNav } from "./sidebar-nav";
import { SidebarFooter } from "./sidebar-footer";
import {
    SIDEBAR_WIDTH,
    SIDEBAR_WIDTH_COLLAPSED,
    useSidebar,
} from "./sidebar-context";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsAuthenticated } from "@/hooks/use-local-auth";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
    const isAuthenticated = useIsAuthenticated();

    // Close the drawer whenever the viewport grows past the breakpoint, so the
    // page can't be left with a stale backdrop.
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const handle = () => mq.matches && setMobileOpen(false);
        mq.addEventListener("change", handle);
        return () => mq.removeEventListener("change", handle);
    }, [setMobileOpen]);

    // Escape closes the drawer.
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mobileOpen, setMobileOpen]);

    return (
        <>
            {/* Drawer backdrop — mobile only */}
            <div
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
                className={cn(
                    "fixed inset-0 z-40 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
                    mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
                )}
            />

            <aside
                aria-label="Main navigation"
                style={{ width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH }}
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-dvh flex-col bg-brand-gradient",
                    "transition-[width,transform] duration-300 ease-out",
                    // Off-canvas below lg, always docked from lg up.
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Soft highlight so the flat gradient reads as a surface with depth. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_0%,rgba(255,255,255,0.16),transparent_60%)]"
                />

                <div className="relative flex h-full flex-col">
                    <SidebarLogo />

                    {isAuthenticated === null ? (
                        <div className="flex-1 space-y-2 px-3 py-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full bg-white/15" />
                            ))}
                        </div>
                    ) : (
                        <SidebarNav isAuthenticated={isAuthenticated} />
                    )}

                    <SidebarFooter />
                </div>
            </aside>
        </>
    );
}
