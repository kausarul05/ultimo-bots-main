"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "./app-shell";

const AUTH_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password"];

/**
 * Decides which chrome wraps a route.
 *
 * Auth pages render bare, and /dashboard renders bare here because the
 * dashboard segment layout supplies its own shell — previously BOTH this
 * layout and the dashboard layout mounted a <Sidebar />, so dashboard routes
 * rendered two of them stacked on top of each other.
 */
export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));
  const isDashboard = pathname.startsWith("/dashboard");

  if (isAuthPage || isDashboard) return <>{children}</>;

  return <AppShell>{children}</AppShell>;
}
