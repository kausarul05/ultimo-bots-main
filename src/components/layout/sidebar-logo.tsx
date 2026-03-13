"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLogoProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export function SidebarLogo({ collapsed, setCollapsed }: SidebarLogoProps) {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/* Logo Square */}
          <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center shadow-lg">
            <span className="text-[#4510b0] font-bold text-lg">U</span>
          </div>
          
          {/* Text Logo */}
          {!collapsed && (
            <div className="flex items-center">
              <span className="text-white font-semibold text-xl tracking-tight">Ultimo</span>
              <span className="text-white/70 font-semibold text-xl tracking-tight ml-1">Bots</span>
            </div>
          )}
        </Link>
        
        {/* Collapse/Expand Button - Always visible */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-all",
            collapsed && "ml-0"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}