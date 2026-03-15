"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  CreditCard, 
  LayoutGrid, 
  FolderKanban, 
  FileText,
  Bot,
  Settings,
  BarChart3,
  Puzzle,
  Link as LinkIcon,
  MessageSquare,
  Database,
  HelpCircle,
  ChevronDown 
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  collapsed: boolean;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  hasDropdown?: boolean;
  dropdownItems?: { title: string; href: string; icon?: React.ElementType }[];
}

export function SidebarNav({ collapsed }: SidebarNavProps) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(['Bots']);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

  // Public navigation items (shown when NOT authenticated)
  const publicNavItems: NavItem[] = [
    { title: "Home", href: "/", icon: Home },
    { title: "Pricing", href: "/pricing", icon: CreditCard },
    { 
      title: "Apps", 
      href: "/apps", 
      icon: LayoutGrid, 
      hasDropdown: true,
      dropdownItems: [
        { title: "Wordpress", href: "/apps/wordpress" },
        { title: "Wix", href: "/apps/wix" }
      ]
    },
    { 
      title: "Resources", 
      href: "/resources", 
      icon: FolderKanban, 
      hasDropdown: true,
      dropdownItems: [
        { title: "Documentation", href: "/resources/docs" },
        { title: "Blog", href: "/resources/blog" }
      ]
    },
    { title: "About", href: "/about", icon: FileText },
  ];

  // Auth navigation items (shown when authenticated) - WITH BOTS DROPDOWN
  const authNavItems: NavItem[] = [
    { 
      title: "Bots", 
      href: "/dashboard/bots", 
      icon: Bot, 
      hasDropdown: true,
      dropdownItems: [
        { title: "My Bots", href: "/dashboard/my-bots", icon: Bot },
        { title: "Settings", href: "/dashboard/settings", icon: Settings },
        { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        { title: "Integration", href: "/dashboard/integration", icon: Puzzle },
        { title: "Connect", href: "/dashboard/connect", icon: LinkIcon },
        { title: "Messaging", href: "/dashboard/messaging", icon: MessageSquare },
        { title: "Data Sources", href: "/dashboard/data-sources", icon: Database },
      ]
    },
    { 
      title: "Resources", 
      href: "/resources", 
      icon: HelpCircle,
      hasDropdown: true,
      dropdownItems: [
        { title: "Help", href: "/help" },
        { title: "Documentation", href: "/docs" }
      ]
    },
  ];

  // Choose which menu to show based on auth status
  const navItems = isAuthenticated ? authNavItems : publicNavItems;

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

  const isDropdownItemActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="flex-1 px-4">
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
                      isActive(item.href) ? "text-white" : "text-white"
                    )} />
                    {!collapsed && <span className="text-lg">{item.title}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown className={cn(
                      "h-4 w-4 text-white transition-transform",
                      openDropdowns.includes(item.title) && "rotate-180"
                    )} />
                  )}
                </button>
                
                {/* Dropdown Items */}
                {!collapsed && openDropdowns.includes(item.title) && item.dropdownItems && (
                  <ul className="mt-1 ml-9 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <li key={dropdownItem.title}>
                        <Link
                          href={dropdownItem.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors",
                            isDropdownItemActive(dropdownItem.href)
                              ? "bg-white/20 text-white shadow-lg"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          )}
                        >
                          {dropdownItem.icon && (
                            <dropdownItem.icon className="h-4 w-4" />
                          )}
                          <span>{dropdownItem.title}</span>
                        </Link>
                      </li>
                    ))}
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
                  isActive(item.href) ? "text-white" : "text-white"
                )} />
                {!collapsed && <span className="text-lg">{item.title}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}