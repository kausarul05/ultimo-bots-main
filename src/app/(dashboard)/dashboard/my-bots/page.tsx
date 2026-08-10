"use client";

import { useState } from "react";
import Link from "next/link";
import {
    BarChart3,
    Bot as BotIcon,
    Brain,
    MessageSquare,
    Plus,
    Puzzle,
    Settings,
    Shield,
    Sparkles,
    Users,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/ui/page-header";
import { CreateBotModal } from "@/components/dashboard/create-bot-modal";

interface Bot {
    id: string;
    name: string;
    successScore: number;
    successFraction: string;
    plan: "Free" | "Pro" | "Enterprise";
    messagesUsed: number;
    messagesLimit: number;
    activity: boolean[];
    status: "active" | "inactive";
}

const highlights = [
    {
        icon: Brain,
        title: "Smart conversations",
        description: "Contextual answers trained on your website and knowledge base.",
    },
    {
        icon: Zap,
        title: "Instant setup",
        description: "Point the bot at a domain, let it ingest, then customize.",
    },
    {
        icon: Users,
        title: "Lead capture",
        description: "Warm lead workflows collect emails and intent for follow-up.",
    },
    {
        icon: Shield,
        title: "Safe and controlled",
        description: "Set tone, guardrails, fallback behavior and escalation paths.",
    },
    {
        icon: MessageSquare,
        title: "Continuous learning",
        description: "Refine knowledge with documents and chat-history improvements.",
    },
];

const botActions = [
    { label: "Test bot", href: "/dashboard/my-bots", icon: MessageSquare },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Integration", href: "/dashboard/integration", icon: Puzzle },
];

/** Success score drives the badge colour so a weak bot is visible at a glance. */
function scoreTone(score: number) {
    if (score >= 70) return "success" as const;
    if (score >= 35) return "warning" as const;
    return "danger" as const;
}

export default function MyBotsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bots, setBots] = useState<Bot[]>([]);

    const handleCreateBot = (botData: { name: string; website: string; files: File[] }) => {
        setBots((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                name: botData.name,
                successScore: 13,
                successFraction: "1/8",
                plan: "Free",
                messagesUsed: 0,
                messagesLimit: 20,
                activity: [true, true, true, false, false, false, false],
                status: "active",
            },
        ]);
        setIsModalOpen(false);
    };

    const newBotButton = (
        <Button variant="gradient" size="lg" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            New bot
        </Button>
    );

    if (bots.length === 0) {
        return (
            <div className="space-y-10">
                {/* Onboarding hero */}
                <section className="relative overflow-hidden rounded-panel bg-brand-gradient px-6 py-10 shadow-panel sm:px-10 sm:py-12">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(255,255,255,0.18),transparent_60%)]"
                    />
                    <div className="relative max-w-2xl">
                        <Badge
                            variant="outline"
                            className="border-white/25 bg-white/10 text-white backdrop-blur"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Get started
                        </Badge>
                        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                            Create your first bot
                        </h1>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/80">
                            Build an intelligent chatbot to automate support, capture qualified
                            leads and answer questions 24/7. Your first bot can be live in minutes.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => setIsModalOpen(true)}
                            className="mt-7 bg-white text-brand-800 shadow-lg hover:bg-white/90"
                        >
                            <Plus className="h-4 w-4" />
                            New bot
                        </Button>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-foreground">
                            Platform highlights
                        </h2>
                        <p className="text-sm text-ink-500">
                            What your bot can do once it is up and running.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {highlights.map((item) => (
                            <Card key={item.title} interactive>
                                <CardContent className="flex gap-4 p-5">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-field bg-brand-50 text-brand-600">
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <div className="min-w-0 space-y-1">
                                        <h3 className="font-semibold text-foreground">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-ink-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <CreateBotModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreateBot={handleCreateBot}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Your bots"
                description={`${bots.length} bot${bots.length === 1 ? "" : "s"} configured.`}
                actions={newBotButton}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {bots.map((bot) => (
                    <Card key={bot.id} interactive className="flex flex-col">
                        <CardContent className="flex flex-1 flex-col p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-field bg-brand-gradient text-white">
                                        <BotIcon className="h-5 w-5" />
                                    </span>
                                    <div className="min-w-0">
                                        <h2 className="truncate font-semibold text-foreground">
                                            {bot.name}
                                        </h2>
                                        <StatusDot
                                            status={bot.status}
                                            label={bot.status === "active" ? "Live" : "Paused"}
                                        />
                                    </div>
                                </div>
                                <Badge variant={bot.plan === "Free" ? "neutral" : "brand"}>
                                    {bot.plan}
                                </Badge>
                            </div>

                            <dl className="mt-6 space-y-4">
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <dt className="text-sm text-ink-500">Success score</dt>
                                        <dd>
                                            <Badge variant={scoreTone(bot.successScore)} size="sm">
                                                {bot.successScore}% ({bot.successFraction})
                                            </Badge>
                                        </dd>
                                    </div>
                                    <Progress
                                        value={bot.successScore}
                                        tone="auto"
                                        label="Success score"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <dt className="text-sm text-ink-500">Messages used</dt>
                                        <dd className="text-sm font-medium tabular-nums text-foreground">
                                            {bot.messagesUsed} / {bot.messagesLimit}
                                        </dd>
                                    </div>
                                    <Progress
                                        value={bot.messagesUsed}
                                        max={bot.messagesLimit}
                                        tone="auto"
                                        label="Messages used"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <dt className="text-sm text-ink-500">Activity (7d)</dt>
                                    <dd className="flex items-center gap-1" aria-label="Activity over the last 7 days">
                                        {bot.activity.map((active, i) => (
                                            <span
                                                key={i}
                                                className={
                                                    active
                                                        ? "h-4 w-1.5 rounded-full bg-brand-500"
                                                        : "h-4 w-1.5 rounded-full bg-ink-200"
                                                }
                                            />
                                        ))}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-6 grid flex-1 grid-cols-2 items-end gap-2">
                                {botActions.map((action) => (
                                    <Button
                                        key={action.label}
                                        asChild
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Link href={action.href}>
                                            <action.icon className="h-3.5 w-3.5" />
                                            {action.label}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Affordance to add another bot, sized to match the cards. */}
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex min-h-[19rem] flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed border-ink-300 bg-ink-50/40 p-6 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <Plus className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-foreground">Create another bot</span>
                    <span className="max-w-[15rem] text-sm text-ink-500">
                        Spin up a second assistant for a different site or audience.
                    </span>
                </button>
            </div>

            <CreateBotModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateBot={handleCreateBot}
            />
        </div>
    );
}
