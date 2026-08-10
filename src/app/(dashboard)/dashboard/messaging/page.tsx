"use client";

import { Facebook, Info, Instagram, MessageSquare, Slack } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ConnectionCard, type Connection } from "@/components/dashboard/connection-card";

const platforms: Connection[] = [
    {
        name: "Facebook",
        icon: Facebook,
        description: "Connect Facebook Messenger so your bot can reply to page messages.",
        connectLabel: "Connect Facebook",
        connections: 0,
        color: "#1877F2",
    },
    {
        name: "Instagram",
        icon: Instagram,
        description: "Let your bot handle Instagram direct messages and story replies.",
        connectLabel: "Connect Instagram",
        connections: 0,
        color: "#E4405F",
    },
    {
        name: "WhatsApp",
        icon: MessageSquare,
        description: "Connect WhatsApp Business to answer customers on their phones.",
        connectLabel: "Coming soon",
        connections: 0,
        comingSoon: true,
        color: "#25D366",
    },
    {
        name: "Slack",
        icon: Slack,
        description: "Bring your bot into a Slack workspace for internal questions.",
        connectLabel: "Coming soon",
        connections: 0,
        comingSoon: true,
        color: "#4A154B",
    },
];

export default function MessagingPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Messaging platforms"
                description="Connect a channel, then assign a bot to each page so it replies automatically."
            />

            <div className="flex gap-3 rounded-card border border-brand-200 bg-brand-50 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-brand-900">
                    Use <span className="font-medium">Connect</span> to authorize a platform, then{" "}
                    <span className="font-medium">Manage connections</span> to map individual pages
                    or accounts to a specific bot.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {platforms.map((platform) => (
                    <ConnectionCard key={platform.name} connection={platform} />
                ))}
            </div>
        </div>
    );
}
