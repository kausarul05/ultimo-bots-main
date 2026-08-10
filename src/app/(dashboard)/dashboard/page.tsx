"use client";

import Link from "next/link";
import { ArrowRight, Bot, MessageSquare, Plug, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const stats = [
    { label: "Active bots", value: 3, icon: Bot, delta: 0, hint: "Across all plans" },
    { label: "Conversations", value: "1,234", icon: MessageSquare, delta: 12, hint: "Last 30 days" },
    { label: "Leads captured", value: 567, icon: Users, delta: 8, hint: "Last 30 days" },
    { label: "Avg. response", value: "1.2s", icon: TrendingUp, delta: -4, hint: "Bot reply time" },
];

const shortcuts = [
    {
        title: "Manage your bots",
        description: "Create a bot, tune its knowledge base or check how it is performing.",
        href: "/dashboard/my-bots",
        icon: Bot,
    },
    {
        title: "Review analytics",
        description: "See chat volume, captured leads and where your visitors come from.",
        href: "/dashboard/analytics",
        icon: TrendingUp,
    },
    {
        title: "Install the widget",
        description: "Copy the snippet or use the WordPress, Wix and Webflow integrations.",
        href: "/dashboard/integration",
        icon: Plug,
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="A quick read on how your bots are performing, and where to go next."
                actions={
                    <Button asChild variant="gradient" size="lg">
                        <Link href="/dashboard/my-bots">
                            Go to my bots
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                }
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Jump back in</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {shortcuts.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <Card interactive className="h-full">
                                <CardContent className="p-5 sm:p-6">
                                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-field bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <CardTitle className="flex items-center gap-1.5">
                                        {item.title}
                                        <ArrowRight className="h-4 w-4 text-ink-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600" />
                                    </CardTitle>
                                    <CardDescription className="mt-1.5">
                                        {item.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
