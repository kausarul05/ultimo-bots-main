"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";

interface CTASectionProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    className?: string;
}

export function CTASection({
    title = "Ready to automate your website?",
    description = "Launch your world-class AI Agent in minutes.",
    buttonText = "Start Free Trial",
    buttonHref = "/signup",
    className
}: CTASectionProps) {

    return (
        <section
            className={cn(
                "w-full md:py-8 lg:py-12 md:px-40 ",
                className
            )}
        >
            <div className="container px-4 md:px-6 bg-[#5e1bff] p-8 rounded-2xl">
                <div className="text-center">

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-[#5e1bff] font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all group"
                        >
                            <a href={buttonHref}>
                                {buttonText}
                                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}