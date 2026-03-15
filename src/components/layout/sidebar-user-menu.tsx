"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User,
  CreditCard,
  LogOut,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

interface SidebarUserMenuProps {
  collapsed: boolean;
}

export function SidebarUserMenu({ collapsed }: SidebarUserMenuProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const userMenuItems = [
    { title: "kausarul", href: "/dashboard/profile", icon: User },
    { title: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

  const isActive = (href: string) => pathname === href;

  if (!user) return null;

  return (
    <div className="px-3 py-2 border-t border-[#1A1A1A]">
      {/* User Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all w-full",
          "text-white/80 hover:text-white hover:bg-white/10",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#4510b0] to-[#5e1bff] flex items-center justify-center text-white text-xs">
          {user?.name?.[0] || 'U'}
        </div>
        
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{user?.name || 'kausarul'}</span>
            <ChevronUp className={cn(
              "h-4 w-4 transition-transform",
              showMenu ? "rotate-180" : ""
            )} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showMenu && !collapsed && (
        <div className="mt-1 py-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg shadow-xl">
          {userMenuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm transition-all",
                isActive(item.href)
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
              onClick={() => setShowMenu(false)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
          
          <button
            onClick={() => {
              logout();
              setShowMenu(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 w-full transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}