"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Star, Download, ChevronRight } from "lucide-react";
import Image from "next/image";

interface WordPressPluginSectionProps {
    className?: string;
}

export function WordPressPluginSection({
    className
}: WordPressPluginSectionProps) {

    return (
        <section
            className={cn(
                "w-full md:py-8 lg:py-12 md:px-40",
                className
            )}
            style={{
                background: "linear-gradient(180deg, #fbfaff, #ffffff 60%)"
            }}
        >
            <div className="container px-4 md:px-6">
                {/* Header with dot */}
                <div className="mb-4 flex justify-start">
                    <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#5e1bff] bg-[#f3efff] border border-[#eee8ff] px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-[#5e1bff] rounded-full"></span>
                        WordPress Plugin
                    </span>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column - Rating and Description */}
                    <div>
                        {/* Top Rated Badge */}
                        <div className="mb-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4">
                                Top-rated AI chatbot plugin for WordPress
                            </h2>
                            <p className="text-lg text-[#5a5a5a]">
                                Among all chatbot plugins on WordPress, Ultimo Bots is rated at the top, with users praising its accuracy, ease of use, and support.
                            </p>
                        </div>

                        {/* Bullet Points */}
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <span className="text-[#5e1bff] font-bold text-xl leading-5">•</span>
                                <span className="text-[#4a4a4a]">Best-rated AI chatbot plugin across popular WordPress options</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#5e1bff] font-bold text-xl leading-5">•</span>
                                <span className="text-[#4a4a4a]">Loved by agencies, e-commerce stores, and service businesses on WordPress</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#5e1bff] font-bold text-xl leading-5">•</span>
                                <span className="text-[#4a4a4a]">Continuously improved with real feedback from WordPress users</span>
                            </li>
                        </ul>

                        {/* View in WordPress Directory Link */}
                        <Button
                            variant="outline"
                            className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            View in WordPress Plugin Directory
                            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Right Column - Plugin Details */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                        <Image
                            src=""
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}