"use client";

import { Button } from "@/components/ui/button";
import {
    Facebook,
    Instagram,
    MessageSquare,
    Slack,
    Globe,
    ChevronRight,
    ExternalLink,
    AlertCircle
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Platform {
    name: string;
    icon: any;
    description: string;
    connectText: string;
    connections: number;
    isComingSoon?: boolean;
    color: string;
}

export default function MessagingPage() {
    const [selectedBot, setSelectedBot] = useState("Test");

    const platforms: Platform[] = [
        {
            name: "Facebook",
            icon: Facebook,
            description: "Connect your Facebook Messenger to enable bot interactions",
            connectText: "CONNECT FACEBOOK",
            connections: 0,
            color: "#1877F2"
        },
        {
            name: "Instagram",
            icon: Instagram,
            description: "Connect your Instagram to enable bot interactions",
            connectText: "CONNECT INSTAGRAM",
            connections: 0,
            color: "#E4405F"
        },
        {
            name: "WhatsApp",
            icon: MessageSquare,
            description: "Connect your WhatsApp Business to enable bot interactions",
            connectText: "COMING SOON",
            connections: 0,
            isComingSoon: true,
            color: "#25D366"
        },
        {
            name: "Slack",
            icon: Slack,
            description: "Connect your Slack workspace to enable bot interactions",
            connectText: "COMING SOON",
            connections: 0,
            isComingSoon: true,
            color: "#4A154B"
        }
    ];

    return (
        <div className="px-8 py-8">
            <div className="">
                {/* Header */}
                <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">Connect Messaging Platforms</h1>

                {/* Description */}
                <div className="bg-[#f3efff] rounded-xl border border-[#5e1bff]/20 p-6 mt-6 w-5xl">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4510b0] to-[#5e1bff] flex items-center justify-center text-white flex-shrink-0">
                            <AlertCircle className="h-5 w-5" />
                        </div>
                        <div>
                            {/* <h3 className="text-base font-semibold text-[#1d1d1f] mb-1">Need help with integration?</h3> */}
                            <p className="text-sm text-[#666666]">
                                Connect your messaging platforms - after connecting, assign a bot to each page so it automatically responds to incoming messages. Use “Connect” to authorize and “Manage connections” to map pages to bots.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Platforms Grid */}
                <div className="space-y-4 grid grid-cols-4 gap-8 mt-6">
                    {platforms.map((platform) => {
                        const Icon = platform.icon;
                        return (
                            <div
                                key={platform.name}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#5e1bff]/30"
                            >
                                <div className="flex items-start gap-4">


                                    {/* Platform Content */}
                                    <div className="flex-1">
                                        {/* Platform Icon */}
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 m-auto mb-4"
                                            style={{ backgroundColor: `${platform.color}15` }}
                                        >
                                            <Icon
                                                className="h-6 w-6"
                                                style={{ color: platform.color }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <h3 className="text-lg font-semibold text-[#1d1d1f]">
                                                {platform.name}
                                            </h3>
                                            {/* {platform.isComingSoon && (
                                                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                                    Coming Soon
                                                </span>
                                            )} */}
                                        </div>

                                        <p className="text-sm text-[#666666] mb-4 text-center mb-4">
                                            {platform.description}
                                        </p>

                                        <div className="flex flex-col items-center gap-3">
                                            <Button
                                                className={cn(
                                                    "px-4 py-2 text-sm font-medium transition-all w-full",
                                                    platform.isComingSoon
                                                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                        : "bg-[#5e1bff] hover:bg-[#4510b0] text-white"
                                                )}
                                                disabled={platform.isComingSoon}
                                            >
                                                {platform.connectText}
                                            </Button>

                                            <Button
                                                variant="outline"
                                                className="bg-white border-gray-200 text-[#666666] hover:border-[#5e1bff] hover:text-[#5e1bff] w-full"
                                                disabled
                                            >
                                                MANAGE CONNECTIONS ({platform.connections})
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}