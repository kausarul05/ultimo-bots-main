"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gift, LogIn, LogOut, Sparkles } from "lucide-react";
import Cookies from "js-cookie";
import { useSidebar } from "./sidebar-context";
import { clearLocalAuth, useIsAuthenticated, useStoredEmail } from "@/hooks/use-local-auth";
import { cn } from "@/lib/utils";

export function SidebarFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const { collapsed, setMobileOpen } = useSidebar();
  const isAuthenticated = useIsAuthenticated();
  const email = useStoredEmail();

  const handleLogout = () => {
    clearLocalAuth();
    // The middleware gates /dashboard on this cookie, so it has to go too.
    Cookies.remove("isAuthenticated", { path: "/" });
    setMobileOpen(false);
    router.push("/login");
  };

  const referralActive = pathname === "/referral";

  return (
    <div className="shrink-0 border-t border-white/10 p-3">
      <Link
        href="/referral"
        onClick={() => setMobileOpen(false)}
        aria-current={referralActive ? "page" : undefined}
        className={cn(
          "group relative flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          referralActive
            ? "bg-white text-brand-800 shadow-sm"
            : "text-white/75 hover:bg-white/10 hover:text-white",
          collapsed && "justify-center px-2"
        )}
      >
        <Gift className="h-[18px] w-[18px] shrink-0" />
        {!collapsed && <span className="truncate">Referral Program</span>}
        {collapsed && (
          <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-panel transition-opacity group-hover:opacity-100">
            Referral Program
          </span>
        )}
      </Link>

      {isAuthenticated === false && (
        <Link
          href="/login"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "mt-2 flex items-center gap-3 rounded-field bg-white px-3 py-2.5 text-sm font-semibold text-brand-800 shadow-sm transition-colors hover:bg-white/90",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <LogIn className="h-[18px] w-[18px] shrink-0" />
          ) : (
            <>
              <Sparkles className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">Agent Builder</span>
            </>
          )}
        </Link>
      )}

      {isAuthenticated && (
        <div className="mt-2 border-t border-white/10 pt-2">
          {!collapsed && email && (
            <div className="flex items-center gap-2.5 px-3 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold uppercase text-white">
                {email.slice(0, 2)}
              </span>
              <span className="min-w-0 flex-1 truncate text-xs text-white/70" title={email}>
                {email}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-field px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>Log out</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-panel transition-opacity group-hover:opacity-100">
                Log out
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
