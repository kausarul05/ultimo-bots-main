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
    ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
    isAuthenticated: boolean;
}

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    dropdownItems?: { title: string; href: string; icon?: React.ElementType }[];
}

const publicNavItems: NavItem[] = [
    { title: "Home", href: "/", icon: Home },
    { title: "Pricing", href: "/pricing", icon: CreditCard },
    {
        title: "Apps",
        href: "/apps",
        icon: LayoutGrid,
        dropdownItems: [
            { title: "Wordpress", href: "/apps/wordpress" },
            { title: "Wix", href: "/apps/wix" },
        ],
    },
    {
        title: "Resources",
        href: "/resources",
        icon: FolderKanban,
        dropdownItems: [
            { title: "Documentation", href: "/" },
            { title: "Blog", href: "/resources/blog" },
        ],
    },
    { title: "About", href: "/about", icon: FileText },
];

const authNavItems: NavItem[] = [
    {
        title: "Bots",
        href: "/dashboard/bots",
        icon: Bot,
        dropdownItems: [
            { title: "My Bots", href: "/dashboard/my-bots", icon: Bot },
            { title: "Settings", href: "/dashboard/settings", icon: Settings },
            { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
            { title: "Integration", href: "/dashboard/integration", icon: Puzzle },
        ],
    },
    {
        title: "Connect",
        href: "/dashboard/connect",
        icon: LinkIcon,
        dropdownItems: [
            { title: "Messaging", href: "/dashboard/messaging", icon: MessageSquare },
            { title: "Data Sources", href: "/dashboard/data-sources", icon: Database },
        ],
    },
    {
        title: "Resources",
        href: "/resources",
        icon: HelpCircle,
        dropdownItems: [
            { title: "Guide", href: "/dashboard/my-bots" },
            { title: "Pricing", href: "/pricing" },
            { title: "Referral Program", href: "/referral" },
        ],
    },
];

/** Label shown on hover when the rail is collapsed to icons only. */
function RailTooltip({ label }: { label: string }) {
    return (
        <span
            role="tooltip"
            className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-ink-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-panel transition-opacity duration-150 group-hover:opacity-100"
        >
            {label}
        </span>
    );
}

export function SidebarNav({ isAuthenticated }: SidebarNavProps) {
    const pathname = usePathname();
    const { collapsed, setMobileOpen } = useSidebar();
    const navItems = isAuthenticated ? authNavItems : publicNavItems;

    // Only explicit user toggles are stored. Whether a group is open is derived
    // during render from that override falling back to "is the current route
    // inside this group" — so a deep link never lands on a page whose section is
    // folded shut, without needing an effect to patch state after the fact.
    const [overrides, setOverrides] = useState<Record<string, boolean>>({});

    const isGroupActive = (item: NavItem) =>
        item.dropdownItems?.some((d) => pathname === d.href) ?? false;

    const isGroupOpen = (item: NavItem) =>
        overrides[item.title] ?? isGroupActive(item);

    const toggleDropdown = (item: NavItem) =>
        setOverrides((prev) => ({ ...prev, [item.title]: !isGroupOpen(item) }));

    const isActive = (href: string) =>
        href === "/" ? pathname === href : pathname.startsWith(href);

    return (
        <nav className="flex-1 overflow-y-auto scrollbar-slim px-3 py-4">
            <ul className="space-y-1">
                {navItems.map((item) => {
                    const hasChildren = Boolean(item.dropdownItems?.length);
                    const groupActive = hasChildren ? isGroupActive(item) : isActive(item.href);
                    const isOpen = hasChildren && isGroupOpen(item);

                    if (!hasChildren) {
                        return (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    aria-current={groupActive ? "page" : undefined}
                                    className={cn(
                                        "group relative flex items-center gap-3 rounded-field px-3 py-2.5 text-sm font-medium transition-colors",
                                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                                        groupActive
                                            ? "bg-white text-brand-800 shadow-sm"
                                            : "text-white/75 hover:bg-white/10 hover:text-white",
                                        collapsed && "justify-center px-2"
                                    )}
                                >
                                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                                    {!collapsed && <span className="truncate">{item.title}</span>}
                                    {collapsed && <RailTooltip label={item.title} />}
                                </Link>
                            </li>
                        );
                    }

                    // Collapsed rail: the group header links straight to its first
                    // child, since there is no room to expand a submenu.
                    if (collapsed) {
                        const firstChild = item.dropdownItems![0];
                        return (
                            <li key={item.title}>
                                <Link
                                    href={firstChild.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "group relative flex items-center justify-center rounded-field px-2 py-2.5 transition-colors",
                                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                                        groupActive
                                            ? "bg-white text-brand-800 shadow-sm"
                                            : "text-white/75 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                                    <RailTooltip label={item.title} />
                                </Link>
                            </li>
                        );
                    }

                    return (
                        <li key={item.title}>
                            <button
                                type="button"
                                onClick={() => toggleDropdown(item)}
                                aria-expanded={isOpen}
                                className={cn(
                                    "flex w-full items-center justify-between rounded-field px-3 py-2.5 text-sm font-medium transition-colors",
                                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                                    groupActive && !isOpen
                                        ? "bg-white/15 text-white"
                                        : "text-white/75 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <span className="flex items-center gap-3">
                                    <item.icon className="h-[18px] w-[18px] shrink-0" />
                                    <span className="truncate">{item.title}</span>
                                </span>
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 shrink-0 transition-transform duration-200",
                                        isOpen && "rotate-180"
                                    )}
                                />
                            </button>

                            {isOpen && (
                                <ul className="relative mt-1 space-y-0.5 pl-[1.6875rem]">
                                    {/* Guide rail tying children to their parent. */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute bottom-1 left-[1.375rem] top-1 w-px bg-white/20"
                                    />
                                    {item.dropdownItems!.map((child) => {
                                        const active = pathname === child.href;
                                        return (
                                            <li key={child.title}>
                                                <Link
                                                    href={child.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    aria-current={active ? "page" : undefined}
                                                    className={cn(
                                                        "flex items-center gap-2.5 rounded-field px-3 py-2 text-sm transition-colors",
                                                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                                                        active
                                                            ? "bg-white font-medium text-brand-800 shadow-sm"
                                                            : "text-white/65 hover:bg-white/10 hover:text-white"
                                                    )}
                                                >
                                                    {child.icon && (
                                                        <child.icon className="h-4 w-4 shrink-0" />
                                                    )}
                                                    <span className="truncate">{child.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
