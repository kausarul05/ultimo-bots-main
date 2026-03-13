"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  CreditCard, 
  LayoutGrid, 
  FolderKanban, 
  FileText,
  ChevronDown 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  collapsed: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  hasDropdown?: boolean;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Pricing", href: "/pricing", icon: CreditCard },
  { title: "Apps", href: "/apps", icon: LayoutGrid, hasDropdown: true },
  { title: "Resources", href: "/resources", icon: FolderKanban, hasDropdown: true },
  { title: "About", href: "/about", icon: FileText },
];

export function SidebarNav({ collapsed }: SidebarNavProps) {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(['Apps', 'Resources']);

  const toggleDropdown = (title: string) => {
    setOpenDropdowns(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex-1 px-3">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.title}>
            {item.hasDropdown ? (
              <div>
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    "text-white/80 hover:text-white hover:bg-white/10",
                    collapsed ? "justify-center px-2" : "px-3"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive(item.href) ? "text-white" : "text-white/60"
                    )} />
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown className={cn(
                      "h-4 w-4 text-white/60 transition-transform",
                      openDropdowns.includes(item.title) && "rotate-180"
                    )} />
                  )}
                </button>
                
                {/* Dropdown Items */}
                {!collapsed && openDropdowns.includes(item.title) && (
                  <ul className="mt-1 ml-9 space-y-1">
                    {item.title === "Apps" ? (
                      <>
                        <li>
                          <Link
                            href="/apps/chat"
                            className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            Chat
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/apps/analytics"
                            className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            Analytics
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            href="/resources/docs"
                            className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            Documentation
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/resources/blog"
                            className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            Blog
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            ) : (
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
                  isActive(item.href) ? "text-white" : "text-white/60"
                )} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}