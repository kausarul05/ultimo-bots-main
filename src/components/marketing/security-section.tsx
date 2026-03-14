"use client";

import { cn } from "@/lib/utils";
import { Shield, Lock, Link, CheckCircle } from "lucide-react";

interface SecurityFeature {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface SecuritySectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    features?: SecurityFeature[];
    footerText?: string;
    className?: string;
}

const defaultFeatures: SecurityFeature[] = [
    {
        icon: Shield,
        title: "Your data stays yours",
        description: "Data is only accessible to your Agent and is never used to train models."
    },
    {
        icon: Lock,
        title: "Data encryption",
        description: "Encryption in transit and at rest using industry-standard algorithms."
    },
    {
        icon: Link,
        title: "Secure integrations",
        description: "Verified variables ensure users access only their own data in your systems."
    }
];

export function SecuritySection({
    title = "Security",
    subtitle = "Enterprise-grade security & privacy",
    description = "We take security and compliance seriously. Ultimo Bots is GDPR aligned and built to keep your data private and safe.",
    badge = "AICPA SOC 2",
    features = defaultFeatures,
    footerText = "Ultimo Bots is committed to safeguarding your data.",
    className
}: SecuritySectionProps) {

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
            {/* Small label with dot */}
            <div className="mb-4  px-4 md:px-6">
                <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#5e1bff] bg-[#f3efff] border border-[#eee8ff] px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-[#5e1bff] rounded-full"></span>
                    {title}
                </span>
            </div>
            <div className="container px-4 md:px-6 grid grid-cols-2 gap-10">
                {/* Header */}
                <div className="mb-12 md:mb-16 max-w-3xl">


                    {/* Main title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4">
                        {subtitle}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-[#5a5a5a] max-w-2xl">
                        {description}
                    </p>

                    {/* SOC 2 Badge */}
                    <div className="mt-6">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                            <CheckCircle className="h-4 w-4 text-[#5e1bff]" />
                            {badge}
                        </span>
                    </div>
                </div>

                {/* Features Grid - Exactly 3 columns as in image */}
                <div className="grid grid-cols-1 md:grid-cols-1 bg-white border border-[#eee8ff] p-3 rounded-2xl shadow">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="group border-b border-[#eee8ff] mb-2">
                                <div className="flex gap-2 items-center">
                                    {/* Icon with gradient background */}
                                    <div className="">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10 text-[#5e1bff]">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div>
                                        {/* Feature title */}
                                        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 group-hover:text-[#5e1bff] transition-colors">
                                            {feature.title}
                                        </h3>
                                        {/* Feature description */}
                                        <p className="text-sm text-[#5a5a5a] leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer text with separator */}
                <div className="pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-[#5e1bff]" />
                        <p className="text-sm font-medium text-[#1d1d1f]">
                            {footerText}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}