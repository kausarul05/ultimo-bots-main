"use client";

import { useState, useEffect } from "react";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarNav } from "./sidebar-nav";
import { SidebarFooter } from "./sidebar-footer";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start with null

    useEffect(() => {
        // Check if user is authenticated
        const auth = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(auth === "true");
    }, []);

    // Show nothing while loading auth state (or show a loading skeleton)
    if (isAuthenticated === null) {
        return (
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen transition-all duration-300",
                    "bg-gradient-to-br from-[#4510b0] via-[#4e15d5] to-[#5e1bff]",
                    collapsed ? "w-20" : "w-72"
                )}
                style={{
                    background: "linear-gradient(135deg, #4510b0 65%, #5e1bff)"
                }}
            >
                <div className="flex h-full flex-col">
                    {/* Logo Section */}
                    <SidebarLogo collapsed={collapsed} setCollapsed={setCollapsed} />
                    
                    {/* Loading Skeleton */}
                    <div className="flex-1 px-4 py-4">
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-10 bg-white/10 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen transition-all duration-300",
                "bg-gradient-to-br from-[#4510b0] via-[#4e15d5] to-[#5e1bff]",
                collapsed ? "w-20" : "w-72"
            )}
            style={{
                background: "linear-gradient(135deg, #4510b0 65%, #5e1bff)"
            }}
        >
            <div className="flex h-full flex-col">
                {/* Logo Section */}
                <SidebarLogo collapsed={collapsed} setCollapsed={setCollapsed} />

                {/* Navigation - Pass auth state as prop */}
                <SidebarNav collapsed={collapsed} isAuthenticated={isAuthenticated} />

                {/* Footer */}
                <SidebarFooter collapsed={collapsed} />
            </div>
        </aside>
    );
}