"use client";

import { cn } from "@/lib/utils";
import { Play, ChevronDown, ChevronRight, UserPlus, Users, BarChart3, Repeat, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

interface FaqItem {
    id: string;
    title: string;
    description: string;
    items?: string[];
    videoSrc: string;
    videoPoster?: string;
}

interface FaqVideoSectionProps {
    title?: string;
    subtitle?: string;
    faqItems?: FaqItem[];
    aiActions?: string[];
    mediaPosition?: "left" | "right";
    className?: string;
}

const defaultFaqItems: FaqItem[] = [
    {
        id: "01",
        title: "Build & deploy your agent",
        description: "Simply enter your URL and add documents. We automatically crawl your content to train your agent.",
        videoSrc: "/videos/build-deploy.mp4"
    },
    {
        id: "02",
        title: "Agent solves your customers' problems",
        description: "Your AI agent handles customer queries with precision, learning from each interaction to provide better answers.",
        items: ["Invite user", "Refine & optimize", "Route complex issues to a human", "Review analytics & insights"],
        videoSrc: "/videos/agent-solves.mp4"
    },
    {
        id: "03",
        title: "Refine & optimize",
        description: "Fine-tune your agent's responses based on real conversations and feedback.",
        videoSrc: "/videos/refine.mp4"
    },
    {
        id: "04",
        title: "Route complex issues to a human",
        description: "Smart escalation triggers when queries need human expertise or personal touch.",
        videoSrc: "/videos/route-human.mp4"
    },
    {
        id: "05",
        title: "Review analytics & insights",
        description: "Track performance metrics, identify trends, and continuously improve your customer support.",
        videoSrc: "/videos/analytics.mp4"
    }
];

const defaultAiActions = ["Invite user", "Escalate to human"];

export function FaqVideoSection({
    title = "From URL to Live Chatbot in minutes",
    subtitle = "With Ultimo Bots, you go from setup to automation instantly.",
    faqItems = defaultFaqItems,
    aiActions = defaultAiActions,
    mediaPosition = "right",
    className
}: FaqVideoSectionProps) {

    const [expandedId, setExpandedId] = useState<string>("01");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleFaq = (id: string) => {
        setExpandedId(id);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const getCurrentVideo = () => {
        const currentItem = faqItems.find(item => item.id === expandedId);
        return currentItem?.videoSrc || faqItems[0].videoSrc;
    };

    const getStepIcon = (item: string) => {
        if (item.includes("Invite")) return <UserPlus className="h-4 w-4 text-[#5e1bff]" />;
        if (item.includes("Refine")) return <Repeat className="h-4 w-4 text-[#5e1bff]" />;
        if (item.includes("Route")) return <Users className="h-4 w-4 text-[#5e1bff]" />;
        if (item.includes("Review")) return <BarChart3 className="h-4 w-4 text-[#5e1bff]" />;
        return <ChevronRight className="h-4 w-4 text-[#5e1bff]" />;
    };

    const renderMedia = () => {
        const mediaClasses = "relative rounded-2xl overflow-hidden shadow-2xl bg-white w-full";

        return (
            <div className={cn("relative group", mediaClasses)}>
                <div className="absolute -inset-[2px] bg-gradient-to-r from-[#4510b0] to-[#5e1bff] rounded-2xl"></div>

                <div className="relative rounded-2xl overflow-hidden">
                    <video
                        key={expandedId}
                        ref={videoRef}
                        src={getCurrentVideo()}
                        className="w-full h-auto relative z-10"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />

                    <button
                        onClick={togglePlay}
                        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white rounded-lg px-4 py-2 backdrop-blur-sm transition-all"
                    >
                        {isPlaying ? (
                            <>
                                <div className="w-4 h-4 bg-white"></div>
                                <span className="text-sm font-medium">Pause</span>
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4 fill-white" />
                                <span className="text-sm font-medium">Play</span>
                            </>
                        )}
                    </button>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
                </div>
            </div>
        );
    };

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
                {/* Header with Purple Dot - ALWAYS STAYS THE SAME - NO POSITION CHANGE */}
                <div className="mb-12 md:mb-16 max-w-3xl">
                    <div className="mb-5">
                        <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#5e1bff] bg-[#f3efff] border border-[#eee8ff] px-3 py-1.5 rounded-full">
                            <span className="w-2 h-2 bg-[#5e1bff] rounded-full"></span>
                            How it works
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4">
                        {title}
                    </h2>
                    
                    {subtitle && (
                        <p className="text-lg text-[#5a5a5a]">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Main Content - ONLY FAQ AND VIDEO SWAP POSITIONS */}
                <div className={cn(
                    "grid gap-12 lg:gap-16 grid-cols-2 items-start",
                    // When mediaPosition is "right": FAQ first (col 1), Video second (col 2)
                    // When mediaPosition is "left": Video first (col 1), FAQ second (col 2)
                    mediaPosition === "right" 
                        ? "lg:grid-cols-[1fr,1.2fr]" 
                        : "lg:grid-cols-[1.2fr,1fr]"
                )}>
                    {/* First Column - Either FAQ or Video based on mediaPosition */}
                    {mediaPosition === "right" ? (
                        /* FAQ Column (First when mediaPosition="right") */
                        <div className="space-y-4">
                            {faqItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "group border rounded-2xl transition-all duration-300 cursor-pointer",
                                        expandedId === item.id
                                            ? "border-[#5e1bff] bg-white shadow-lg" 
                                            : "border-[#dbd8ff] bg-white/50 hover:bg-white hover:border-[#5e1bff]/30"
                                    )}
                                    onClick={() => toggleFaq(item.id)}
                                >
                                    {/* FAQ Header */}
                                    <div className="flex items-start gap-4 p-5">
                                        <div className="flex-shrink-0 w-8">
                                            <span className={cn(
                                                "text-sm font-medium transition-colors",
                                                expandedId === item.id ? "text-[#5e1bff]" : "text-[#5a5a5a]"
                                            )}>
                                                {item.id}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className={cn(
                                                    "text-base font-semibold transition-colors",
                                                    expandedId === item.id ? "text-[#5e1bff]" : "text-[#1d1d1f] group-hover:text-[#5e1bff]/70"
                                                )}>
                                                    {item.title}
                                                </h3>
                                                <ChevronDown className={cn(
                                                    "h-4 w-4 transition-all duration-300",
                                                    expandedId === item.id 
                                                        ? "rotate-180 text-[#5e1bff]" 
                                                        : "text-[#5a5a5a] group-hover:text-[#5e1bff]"
                                                )} />
                                            </div>
                                            
                                            {/* Expanded Content */}
                                            {expandedId === item.id && (
                                                <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <p className="text-sm text-[#5a5a5a] leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                    
                                                    {item.items && item.items.length > 0 && (
                                                        <div className="space-y-2 mt-3">
                                                            {item.items.map((subItem, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                                                                    {getStepIcon(subItem)}
                                                                    <span>{subItem}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* AI Actions Section - Commented as in your code */}
                            {/* <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare className="h-4 w-4 text-[#5e1bff]" />
                                    <h4 className="text-sm font-medium text-[#1d1d1f]">AI Actions</h4>
                                </div>
                                <div className="space-y-2">
                                    {aiActions.map((action, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                                            <ChevronRight className="h-4 w-4 text-[#5e1bff]" />
                                            <span>{action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    ) : (
                        /* Video Column (First when mediaPosition="left") */
                        <div className="flex items-center justify-center lg:justify-start">
                            {renderMedia()}
                        </div>
                    )}

                    {/* Second Column - Opposite of first */}
                    {mediaPosition === "right" ? (
                        /* Video Column (Second when mediaPosition="right") */
                        <div className="flex items-center justify-center lg:justify-end">
                            {renderMedia()}
                        </div>
                    ) : (
                        /* FAQ Column (Second when mediaPosition="left") */
                        <div className="space-y-4">
                            {faqItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "group border rounded-2xl transition-all duration-300 cursor-pointer",
                                        expandedId === item.id
                                            ? "border-[#5e1bff] bg-white shadow-lg" 
                                            : "border-[#dbd8ff] bg-white/50 hover:bg-white hover:border-[#5e1bff]/30"
                                    )}
                                    onClick={() => toggleFaq(item.id)}
                                >
                                    {/* FAQ Header */}
                                    <div className="flex items-start gap-4 p-5">
                                        <div className="flex-shrink-0 w-8">
                                            <span className={cn(
                                                "text-sm font-medium transition-colors",
                                                expandedId === item.id ? "text-[#5e1bff]" : "text-[#5a5a5a]"
                                            )}>
                                                {item.id}
                                            </span>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className={cn(
                                                    "text-base font-semibold transition-colors",
                                                    expandedId === item.id ? "text-[#5e1bff]" : "text-[#1d1d1f] group-hover:text-[#5e1bff]/70"
                                                )}>
                                                    {item.title}
                                                </h3>
                                                <ChevronDown className={cn(
                                                    "h-4 w-4 transition-all duration-300",
                                                    expandedId === item.id 
                                                        ? "rotate-180 text-[#5e1bff]" 
                                                        : "text-[#5a5a5a] group-hover:text-[#5e1bff]"
                                                )} />
                                            </div>
                                            
                                            {/* Expanded Content */}
                                            {expandedId === item.id && (
                                                <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <p className="text-sm text-[#5a5a5a] leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                    
                                                    {item.items && item.items.length > 0 && (
                                                        <div className="space-y-2 mt-3">
                                                            {item.items.map((subItem, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                                                                    {getStepIcon(subItem)}
                                                                    <span>{subItem}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* AI Actions Section - Commented as in your code */}
                            {/* <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare className="h-4 w-4 text-[#5e1bff]" />
                                    <h4 className="text-sm font-medium text-[#1d1d1f]">AI Actions</h4>
                                </div>
                                <div className="space-y-2">
                                    {aiActions.map((action, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                                            <ChevronRight className="h-4 w-4 text-[#5e1bff]" />
                                            <span>{action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}