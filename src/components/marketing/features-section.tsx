"use client";

import { cn } from "@/lib/utils";
import { Brain, Gauge, Lock } from "lucide-react";
import Image from "next/image";

interface Feature {
    imageSrc: string;
    title: string;
    description: string;
    imageAlt?: string;
}

interface FeaturesSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    features?: Feature[];
    variant?: "default" | "centered" | "grid";
    columns?: 2 | 3 | 4;
    className?: string;
}

const defaultFeatures: Feature[] = [
    {
        imageSrc: "/images/features/smart-accuracy.svg",
        title: "Smart & Accurate",
        description: "AI that understands context and gives clear answers, not just keywords.",
        imageAlt: "Smart AI illustration"
    },
    {
        imageSrc: "/images/features/no-code.svg",
        title: "No-Code Integration",
        description: "Connect to your website data and go live without writing a single line of code.",
        imageAlt: "No code integration illustration"
    },
    {
        imageSrc: "/images/features/swiss-security.svg",
        title: "Swiss Precision & Security",
        description: "Hosted in Switzerland with full GDPR compliance and enterprise-grade privacy.",
        imageAlt: "Swiss security illustration"
    }
];

export function FeaturesSection({
    title = "Highlights",
    subtitle = "Why businesses choose Ultimo Bots",
    description = "Built to solve hard problems while staying simple and secure.",
    features = defaultFeatures,
    variant = "default",
    columns = 3,
    className
}: FeaturesSectionProps) {

    const getGridCols = () => {
        switch (columns) {
            case 2: return "md:grid-cols-2";
            case 3: return "md:grid-cols-2 lg:grid-cols-3";
            case 4: return "md:grid-cols-2 lg:grid-cols-4";
            default: return "md:grid-cols-2 lg:grid-cols-3";
        }
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
                {/* Header */}
                <div className={cn(
                    "mb-6 md:mb-6",
                    variant === "centered" ? "text-center mx-auto" : ""
                )}>
                    {/* Small label */}
                    <div className="mb-5">
                        <span className="text-sm font-medium tracking-wider uppercase text-[#5e1bff] bg-[#f3efff] border border-[#eee8ff] px-2 py-1 rounded-full">
                            <span className="w-[15px] h-[5px] bg-[#5e1bff] border rounded-full p-1"></span>
                            {title}
                        </span>
                    </div>

                    {/* Main title */}
                    <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#1d1d1f] mb-4 tracking-wide">
                        {subtitle}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-[#5a5a5a] max-w-2xl">
                        {description}
                    </p>
                </div>

                {/* Features Grid */}
                <div className={cn(
                    "grid grid-cols-1 gap-8 md:gap-10",
                    getGridCols()
                )}>
                    {features.map((feature, index) => {
                        return (
                            <div
                                key={index}
                                className="group relative"
                            >
                                {/* Card with Image */}
                                <div className="relative h-full bg-white rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-[#4510b0]/5 shadow">

                                    {/* Image Container - Replacing the icon */}
                                    <div className="mb-6 h-40 w-full relative">
                                        <div className="relative w-full h-full">
                                            {/* You can use either Next.js Image component or img tag */}
                                            <Image
                                                src={feature.imageSrc}
                                                alt={feature.imageAlt || feature.title}
                                                fill
                                                className="object-contain"
                                                sizes=""
                                            />

                                            {/* Fallback if image doesn't exist - shows colored background with title initial */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10">
                                                <span className="text-4xl font-bold text-[#4510b0] opacity-50">
                                                    {feature.title.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3">
                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 group-hover:text-[#4510b0] transition-colors">
                                            {feature.title}
                                        </h3>

                                        <p className="text-[#5a5a5a] leading-relaxed">
                                            {feature.description}
                                        </p>

                                        {/* Decorative gradient line on hover */}
                                        <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-[#4510b0] to-[#5e1bff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}