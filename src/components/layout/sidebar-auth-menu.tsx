"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bot, 
  Settings, 
  BarChart3, 
  Puzzle,
  Link as LinkIcon,
  User,
  CreditCard,
  LogOut,
  HelpCircle,
  FileText,
  Shield,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarAuthMenuProps {
  collapsed: boolean;
}

export function SidebarAuthMenu({ collapsed }: SidebarAuthMenuProps) {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const authNavItems = [
    { title: "Bots", href: "/dashboard/bots", icon: Bot },
    { title: "My Bots", href: "/dashboard/my-bots", icon: Bot },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
    { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { title: "Integration", href: "/dashboard/integration", icon: Puzzle },
    { title: "Connect", href: "/dashboard/connect", icon: LinkIcon },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <div className="px-3 py-2">
      {/* Auth Navigation Items */}
      <ul className="space-y-1 mb-4">
        {authNavItems.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive(item.href)
                  ? "bg-white/20 text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isActive(item.href) ? "text-white" : "text-white"
              )} />
              {!collapsed && <span className="text-lg">{item.title}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Resources & Help */}
      <div className="mb-4">
        <Link
          href="/resources"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
            "text-white/80 hover:text-white hover:bg-white/10",
            collapsed && "justify-center px-2"
          )}
        >
          <HelpCircle className="h-5 w-5 text-white" />
          {!collapsed && (
            <>
              <span className="text-lg flex-1">Resources</span>
              <span className="text-white/40 text-lg">?</span>
            </>
          )}
        </Link>
      </div>

      {/* User Menu Section */}
      <div className="border-t border-white/10 pt-4">
        {/* User Button */}
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all w-full",
            "text-white/80 hover:text-white hover:bg-white/10",
            collapsed && "justify-center px-2"
          )}
        >
          <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
            K
          </div>
          {!collapsed && (
            <>
              <span className="flex-1 text-left text-lg">kausarul</span>
              <ChevronUp className={cn(
                "h-4 w-4 text-white transition-transform",
                showUserMenu ? "rotate-180" : ""
              )} />
            </>
          )}
        </button>

        {/* User Dropdown Menu */}
        {showUserMenu && !collapsed && (
          <div className="mt-1 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 px-3 py-2 text-base text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-base text-white/80 hover:text-white hover:bg-white/10 w-full transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Terms & Privacy - Only visible when expanded */}
        {!collapsed && (
          <div className="mt-4 space-y-1">
            <Link
              href="/terms"
              className="block px-3 py-1 text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="block px-3 py-1 text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}