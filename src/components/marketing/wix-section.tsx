"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Image from "next/image";

interface WixSectionProps {
    className?: string;
}

export function WixSection({
    className
}: WixSectionProps) {

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div>
                        {/* Main Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-6 leading-tight tracking-wide">
                            The highest-rated AI chatbot for Wix websites
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-[#5a5a5a] mb-8 leading-relaxed">
                            Install the Ultimo Bots app from the Wix App Market and get a fully trained chatbot live on your site in 2 minutes.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Button
                                className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all group"
                            >
                                Install on Wix
                                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Button>
                            
                            <div className="flex items-center gap-2 text-[#666666]">
                                <Clock className="h-5 w-5" />
                                <span className="text-base">2-minute setup</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Wix Badge/Card */}
                    <div className="flex justify-center lg:justify-end">
                        <Image
                            src={"/images/ultimo_bots_wix_collaboration.png"}
                            alt="bots"
                            width={1200}
                            height={800}
                            className="rounded-2xl border border-[#fffff]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}