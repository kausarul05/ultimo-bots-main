"use client";

import { Button } from "@/components/ui/button";
import { Plus, Bot, MessageSquare, Users, Shield, Zap, Brain, Settings, BarChart3, Puzzle } from "lucide-react";
import { useState } from "react";
import { CreateBotModal } from "@/components/dashboard/create-bot-modal";
import { cn } from "@/lib/utils";

interface Bot {
    id: string;
    name: string;
    successScore: string;
    successFraction: string;
    plan: "Free" | "Pro" | "Enterprise";
    messagesUsed: number;
    messagesLimit: number;
    activity: string;
    status: "active" | "inactive";
}

export default function MyBotsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bots, setBots] = useState<Bot[]>([]); // Start with empty array

    const highlights = [
        {
            icon: Brain,
            title: "Smart Conversations",
            description: "Deliver contextual answers trained on your website & knowledge base."
        },
        {
            icon: Zap,
            title: "Instant Setup",
            description: "Point the bot at a domain, let it ingest, then customize."
        },
        {
            icon: Users,
            title: "Lead Capture",
            description: "Warm lead workflows collect emails & intent for follow-up."
        },
        {
            icon: Shield,
            title: "Safe & Controlled",
            description: "Set tone, guardrails, fallback behavior & escalation paths."
        },
        {
            icon: Brain,
            title: "Continuous Learning",
            description: "Refine knowledge with documents & chat history improvements."
        }
    ];

    const handleCreateBot = (botData: any) => {
        const newBot: Bot = {
            id: Date.now().toString(),
            name: botData.name,
            successScore: "13%",
            successFraction: "1/8",
            plan: "Free",
            messagesUsed: 0,
            messagesLimit: 20,
            activity: "14d",
            status: "active"
        };
        setBots([...bots, newBot]);
        setIsModalOpen(false);
    };

    // If no bots, show the "Create Your First Bot" view
    if (bots.length === 0) {
        return (
            <div className="px-8 py-8">
                <div className="">
                    {/* Header Section */}
                    <div className="mb-8 bg-gradient-to-r from-[#4510b0] to-[#5e1bff] p-10 rounded-2xl">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Create Your First Bot
                        </h1>

                        {/* Description */}
                        <p className="text-sm text-white max-w-3xl mb-6">
                            Create an intelligent chatbot to automate support, capture qualified leads, and provide instant answers 24/7. Your first bot can be live in minutes.
                        </p>

                        {/* New Bot Button */}
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-black px-6 py-5 text-base font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            New Bot
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-10"></div>

                    {/* Platform Highlights Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Platform Highlights</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {highlights.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#5e1bff]/30"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10 flex items-center justify-center">
                                                    <Icon className="h-5 w-5 text-[#5e1bff]" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[#1d1d1f] mb-1">{item.title}</h3>
                                                <p className="text-sm text-[#666666] leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Create Bot Modal */}
                    <CreateBotModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCreateBot={handleCreateBot}
                    />
                </div>
            </div>
        );
    }

    // If bots exist, show the "Your Bots" view with cards
    return (
        <div className="px-8 py-8">
            <div className="">
                {/* Header with Your Bots title and New Bot button */}
                <div className="flex items-center gap-8 mb-8">
                    <h1 className="text-3xl font-bold text-[#1d1d1f]">Your Bots</h1>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white px-6 py-5 text-base font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        New Bot
                    </Button>
                </div>

                {/* Bots Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {bots.map((bot) => (
                        <div
                            key={bot.id}
                            className="bg-white rounded-xl border border-[#ddd] p-3 hover:shadow-lg transition-all duration-300 hover:border-[#5e1bff]/30 shadow"
                        >
                            {/* Bot Name */}
                            <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">{bot.name}</h2>

                            {/* Success Score */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-[#666666]">Success Score</span>
                                    <span className="text-sm font-medium text-[#1d1d1f] border border-[#ef9a9a] bg-[#ffcdd2] px-2 py-1 rounded-full">{bot.successScore} ({bot.successFraction})</span>
                                </div>
                                {/* <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#4510b0] to-[#5e1bff] rounded-full"
                                        style={{ width: bot.successScore }}
                                    />
                                </div> */}
                            </div>

                            {/* Plan */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-[#666666]">Plan</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[#1d1d1f]">{bot.plan}</span>
                                    <button className="text-xs text-[#5e1bff] hover:text-[#4510b0] flex items-center gap-1">
                                        ⏱ Upgrade
                                    </button>
                                </div>
                            </div>

                            {/* Messages used */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-[#666666]">Messages used</span>
                                    <span className="text-sm font-medium text-[#1d1d1f]">{bot.messagesUsed} / {bot.messagesLimit}</span>
                                </div>
                                {/* <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#4510b0] to-[#5e1bff] rounded-full"
                                        style={{ width: `${(bot.messagesUsed / bot.messagesLimit) * 100}%` }}
                                    />
                                </div> */}
                            </div>

                            {/* Activity */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-sm text-[#666666]">Activity {bot.activity}</span>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                        <div
                                            key={day}
                                            className={cn(
                                                "w-2 h-2 rounded-full",
                                                day <= 3 ? "bg-[#5e1bff]" : "bg-gray-200"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="outline"
                                    className="bg-white border-[#ddd] text-[#000]  text-sm"
                                >
                                    Test Bot
                                </Button>
                                <Button
                                    variant="outline"
                                    className="bg-white border-[#ddd] text-[#000]  text-sm"
                                >
                                    Settings
                                </Button>
                                <Button
                                    variant="outline"
                                    className="bg-white border-[#ddd] text-[#000]  text-sm"
                                >
                                    Analytics
                                </Button>
                                <Button
                                    variant="outline"
                                    className="bg-white border-[#ddd] text-[#000]  text-sm"
                                >
                                    Integration
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Add New Bot Card */}
                    {/* <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white/50 rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-[#5e1bff]/50 hover:bg-white/80 transition-all duration-300 flex flex-col items-center justify-center min-h-[400px]"
                    >
                        <Plus className="h-8 w-8 text-[#5e1bff] mb-2" />
                        <span className="font-medium text-[#1d1d1f]">Create New Bot</span>
                    </button> */}
                </div>

                {/* Create Bot Modal */}
                <CreateBotModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreateBot={handleCreateBot}
                />
            </div>
        </div>
    );
}