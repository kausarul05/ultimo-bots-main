"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "./blog-card";

interface BlogPost {
    category: string;
    date: string;
    title: string;
    description: string;
    slug: string;
}

interface BlogSectionProps {
    title?: string;
    subtitle?: string;
    posts?: BlogPost[];
    className?: string;
}

const defaultPosts: BlogPost[] = [
    {
        category: "Blog",
        date: "13 March, 2026",
        title: "Best AI Chatbot for Wix in 2026 – Compared & Reviewed",
        description: "Compare the best AI chatbots for Wix in 2026. See why Ultimo Bots leads with instant setup, GPT-5 AI, lead capture, and Swiss hosting.",
        slug: "/blog/best-ai-chatbot-wix-2026"
    },
    {
        category: "Blog",
        date: "22 January, 2026",
        title: "Best AI Chatbot for Webflow in 2026 – Full Guide",
        description: "Find the best AI chatbot for Webflow in 2026. Compare top options and see why Ultimo Bots leads with native integration, GPT-5 AI, and design control.",
        slug: "/blog/best-ai-chatbot-webflow-2026"
    },
    {
        category: "Blog",
        date: "22 January, 2028",
        title: "Native Instagram Integration: Automate Your Instagram Support",
        description: "Ultimo Bots launches native Facebook Messenger integration as a verified Meta Tech Provider. Automate social media support with no-code setup in 2 minutes.",
        slug: "/blog/instagram-integration"
    },
    {
        category: "Blog",
        date: "11 December, 2025",
        title: "Google Drive Integration: Train Your AI Chatbot from Cloud Documents",
        description: "Import documents directly from Google Drive to train your AI chatbot. Support for Google Docs, Sheets, PDFs, and more. Includes step-by-step guide.",
        slug: "/blog/google-drive-integration"
    },
    {
        category: "Blog",
        date: "18 November, 2025",
        title: "Native Microsoft OneDrive Integration",
        description: "Import documents directly from Microsoft OneDrive to train your AI chatbot. Support for Word, Excel, PowerPoint, PDFs, and more. Includes step-by-step guide.",
        slug: "/blog/onedrive-integration"
    }
];

export function BlogSection({
    title = "Insights from the AI World",
    subtitle = "Helpful reads to super-charge your AI Agent journey.",
    posts = defaultPosts,
    className
}: BlogSectionProps) {

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
                {/* Header */}
                <div className="mb-12 md:mb-16 text-center">

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Blog Posts Grid - Using BlogCard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <BlogCard
                            key={index}
                            date={post.date}
                            title={post.title}
                            description={post.description}
                            slug={post.slug}
                        />
                    ))}
                </div>

                {/* View All Posts Button */}
                <div className="mt-12 text-center">
                    <Button
                        variant="outline"
                        className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        View all posts
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
}