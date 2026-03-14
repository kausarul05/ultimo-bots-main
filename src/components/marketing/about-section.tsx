"use client";

import { cn } from "@/lib/utils";
import { Globe, Users, MessageSquare, TrendingUp, Shield, Zap, Sparkles, Target } from "lucide-react";

interface AboutSectionProps {
    className?: string;
}

export function AboutSection({
    className
}: AboutSectionProps) {

    const stats = [
        { icon: Globe, value: "80+", label: "Countries served" },
        { icon: Users, value: "2'000+", label: "Paying customers" },
        { icon: MessageSquare, value: "10M+", label: "Messages handled" },
        { icon: TrendingUp, value: "450K+", label: "Leads generated" }
    ];

    const values = [
        {
            icon: Zap,
            title: "Simplicity that empowers",
            description: "Making complex AI accessible to everyone"
        },
        {
            icon: Users,
            title: "Accessibility for every size",
            description: "From startups to enterprises, AI for all"
        },
        {
            icon: Shield,
            title: "Privacy-first and GDPR aligned",
            description: "Your data stays yours, always protected"
        },
        {
            icon: Sparkles,
            title: "Continuous improvement",
            description: "Always evolving with the latest AI models"
        }
    ];

    return (
        <section
            className={cn(
                "w-full md:py-8 lg:py-12 md:px-40",
                className
            )}
            style={{
                background: "linear-gradient(180deg, #ffffff, #fbfaff 100%)"
            }}
        >
            <div className="container px-4 md:px-6">
                {/* Header with dot */}
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#5e1bff] bg-[#f3efff] border border-[#eee8ff] px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-[#5e1bff] rounded-full"></span>
                        Company
                    </span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-6 max-w-4xl">
                    Agentic AI that completes real customer requests
                </h1>

                {/* Description */}
                <p className="text-xl text-[#5a5a5a] mb-16 max-w-3xl leading-relaxed">
                    Ultimo Bots is the agentic AI platform that lets any business build production-ready AI agents in minutes. They book appointments, handle payments and resolve complex customer requests with Swiss-grade reliability.
                </p>

                {/* Two Column Layout for Vision & Mission */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Vision */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 hover:border-[#5e1bff]/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10 rounded-lg">
                                <Target className="h-6 w-6 text-[#5e1bff]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1d1d1f]">Our Vision</h2>
                        </div>
                        <p className="text-[#4a4a4a] leading-relaxed">
                            Be the number one platform for agentic AI in customer service. Any company can launch AI agents in minutes that book appointments, manage subscriptions and resolve issues end-to-end with human-level clarity.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 hover:border-[#5e1bff]/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10 rounded-lg">
                                <Zap className="h-6 w-6 text-[#5e1bff]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1d1d1f]">Our Mission</h2>
                        </div>
                        <p className="text-[#4a4a4a] leading-relaxed">
                            Remove barriers to agentic AI with guided setup, content-aware training and secure tool connections. Put reliable AI agents for bookings, upgrades and payment tasks in your hands without needing an IT team or big budget. Turn every website into a 24/7 agent that can actually do things for your customers so you can focus on growth.
                        </p>
                    </div>
                </div>

                {/* Our Values Section */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">Our Values</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div 
                                    key={index}
                                    className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-[#5e1bff]/20"
                                >
                                    <div className="mb-4">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10">
                                            <Icon className="h-5 w-5 text-[#5e1bff]" />
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-[#1d1d1f] mb-2">{value.title}</h3>
                                    <p className="text-sm text-[#666666]">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-gray-200">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10 rounded-full">
                                        <Icon className="h-6 w-6 text-[#5e1bff]" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-[#1d1d1f] mb-1">{stat.value}</div>
                                <div className="text-sm text-[#666666]">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}