"use client";

import { useState, useEffect } from "react";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarNav } from "./sidebar-nav";
import { SidebarFooter } from "./sidebar-footer";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

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
        
        {/* Navigation - Public menu always visible */}
        <SidebarNav collapsed={collapsed} />
        
        {/* Auth Menu - Only shows when authenticated */}
        {/* {isAuthenticated && <SidebarAuthMenu collapsed={collapsed} />} */}
        
        {/* Footer */}
        <SidebarFooter collapsed={collapsed} />
      </div>
    </aside>
  );
}