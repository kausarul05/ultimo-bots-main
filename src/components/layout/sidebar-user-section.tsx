"use client";

import Link from "next/link";
import { LogIn, UserPlus, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarUserSectionProps {
  collapsed: boolean;
}

export function SidebarUserSection({ collapsed }: SidebarUserSectionProps) {
  return (
    <div className="px-3 py-4 border-t border-white/10">
      <div className="space-y-1">
        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            "text-white/80 hover:text-white hover:bg-white/10",
            collapsed && "justify-center px-2"
          )}
        >
          <LogIn className="h-5 w-5 text-white/60" />
          {!collapsed && <span>Login</span>}
        </Link>
        <Link
          href="/register"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mt-1",
            "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm",
            collapsed && "justify-center px-2"
          )}
        >
          <UserPlus className="h-5 w-5 text-white" />
          {!collapsed && <span>Sign Up Free</span>}
        </Link>
      </div>
    </div>
  );
}