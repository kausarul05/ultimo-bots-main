"use client";

import Link from "next/link";
import { Gift, Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const pathname = usePathname();

  return (
    <div className="px-3 py-4 border-t border-white/10">
      <ul className="space-y-1">
        {/* Referral Programm */}
        <li>
          <Link
            href="/referral"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === '/referral'
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/80 hover:text-white hover:bg-white/10",
              collapsed && "justify-center px-2"
            )}
          >
            <Gift className={cn(
              "h-5 w-5",
              pathname === '/referral' ? "text-white" : "text-white/60"
            )} />
            {!collapsed && <span>Referral Programm</span>}
          </Link>
        </li>

        {/* Agent Builder - Special button */}
        <li>
          <Link
            href="/login"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mt-2",
              pathname === '/login'
                ? "bg-white text-[#4510b0] shadow-lg" 
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm",
              collapsed && "justify-center px-2"
            )}
          >
            <Bot className={cn(
              "h-5 w-5",
              pathname === '/login' ? "text-[#4510b0]" : "text-white"
            )} />
            {!collapsed && <span>Agent Builder</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}