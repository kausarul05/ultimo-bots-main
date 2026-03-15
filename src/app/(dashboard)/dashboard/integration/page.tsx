"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Copy, Check, Calendar, Globe, Code, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PlatformTab = "Snippet" | "WIX" | "Webflow" | "WordPress" | "Chat Link";

export default function IntegrationPage() {
    const [activePlatform, setActivePlatform] = useState<PlatformTab>("Snippet");
    const [selectedBot, setSelectedBot] = useState("Test");
    const [copied, setCopied] = useState(false);

    const platforms: PlatformTab[] = ["Snippet", "WIX", "Webflow", "WordPress", "Chat Link"];

    const snippetCode = `<div id="chat-widget-container" data-user-id="177359144926639271464fZAff"></div>
<script src="https://robert-kloepsch.github.io/ultimo-bots-widget/dist/bundle.js" defer></script>
<a href="https://www.ultimo-bots.com" target="_blank" rel="noopener" style="display: none;">Our website</a>`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(snippetCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="px-8 py-8">
            <div className="">
                {/* Header */}
                {/* <h1 className="text-3xl font-bold text-[#1d1d1f] mb-8">Snippet</h1> */}

                {/* Platform Tabs */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 border-b border-gray-200">
                        {platforms.map((platform) => (
                            <button
                                key={platform}
                                onClick={() => setActivePlatform(platform)}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium transition-all relative -mb-px",
                                    activePlatform === platform
                                        ? "text-[#5e1bff] border-b-2 border-[#5e1bff]"
                                        : "text-[#666666] hover:text-[#1d1d1f]"
                                )}
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Select Bot Row */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-[#666666] mb-2">
                        Select Bot
                    </label>
                    <button className="w-64 flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white hover:border-[#5e1bff] transition-colors">
                        <span className="text-[#1d1d1f]">{selectedBot}</span>
                        <ChevronDown className="h-4 w-4 text-[#666666]" />
                    </button>
                </div>

                {/* Widget Integration Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-[#1d1d1f] mb-4">Widget</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4510b0] to-[#5e1bff] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                •
                            </div>
                            <p className="text-[#4a4a4a] leading-relaxed">
                                <span className="font-semibold text-[#1d1d1f]">Widget Integration:</span> Adds a chat bubble to the bottom-right corner of your website. Copy the snippet and paste it before the closing <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&lt;/body&gt;</code> tag.
                            </p>
                        </div>
                        
                        <div className="ml-9 space-y-2">
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#5e1bff] mt-2"></div>
                                <p className="text-sm text-[#666666]">Floating chat bubble – doesn't affect your page layout</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#5e1bff] mt-2"></div>
                                <p className="text-sm text-[#666666]">Works with any website platform (HTML, React, Shopify, etc.)</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#5e1bff] mt-2"></div>
                                <p className="text-sm text-[#666666]">No plugin installation required</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code Snippet Section */}
                <div className="bg-[#1e1e2f] rounded-xl border border-gray-800 p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Code className="h-5 w-5 text-[#5e1bff]" />
                            <span className="text-sm font-medium text-white">Integration Code</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 text-green-400" />
                                    <span className="text-xs text-white">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 text-white" />
                                    <span className="text-xs text-white">Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                    
                    <pre className="bg-[#0a0a1a] rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                            {snippetCode}
                        </code>
                    </pre>

                    <div className="mt-4 text-xs text-gray-500">
                        <a 
                            href="https://www.ultimo-bots.com" 
                            target="_blank" 
                            rel="noopener"
                            className="flex items-center gap-1 hover:text-gray-400 transition-colors"
                        >
                            Our website
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>

                {/* Need Help Section */}
                <div className="bg-gradient-to-r from-[#f3efff] to-white rounded-xl border border-[#5e1bff]/20 p-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4510b0] to-[#5e1bff] flex items-center justify-center text-white flex-shrink-0">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">Need help with integration?</h3>
                                <p className="text-[#666666] max-w-2xl">
                                    Book a free 15-minute integration call where we guide you step by step to integrate your chatbot.
                                </p>
                            </div>
                        </div>
                        <Button
                            className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white px-6 py-5 text-base font-medium shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                        >
                            Book integration call
                        </Button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}