"use client";

import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
    date?: string;
    title: string;
    description: string;
    slug?: string;
    className?: string;
}

export function BlogCard({
    date = "13 March, 2026",
    title = "Best AI Chatbot for Wix in 2026 - Compared & Reviewed",
    description = "Compare the best AI chatbots for Wix in 2026. See why Ultimo Bots leads with instant setup, GPT-5 AI, lead capture, and Swiss hosting.",
    slug = "/blog/wix-chatbot-2026",
    className
}: BlogCardProps) {

    return (
        <div
            className={cn(
                "bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#5e1bff]/30 max-w-md shadow",
                className
            )}
        >
            {/* Blog Label */}
            <div className="mb-3">
                <span className="text-sm font-bold text-[#5e1bff] uppercase tracking-wider">
                    Blog
                </span>
            </div>

            {/* Date with Calendar Icon */}
            <div className="flex items-center gap-2 text-sm text-[#666666] mb-4">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 leading-tight">
                <Link href={slug} className="hover:text-[#5e1bff] transition-colors">
                    {title}
                </Link>
            </h3>

            {/* Description */}
            <p className="text-[#4a4a4a] text-sm leading-relaxed mb-4 whitespace-pre-line">
                {description}
            </p>

            {/* Read More Link */}
            <Link
                href={slug}
                className="inline-flex items-center text-sm font-medium text-[#5e1bff] hover:text-[#4510b0] transition-colors group"
            >
                Read more
                <svg 
                    className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}