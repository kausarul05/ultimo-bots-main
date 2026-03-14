"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface PricingFeature {
    name: string;
    included: boolean;
    value?: string;
}

interface PricingPlan {
    name: string;
    monthlyPrice: string;
    yearlyPrice: string;
    period: string;
    features: PricingFeature[];
    buttonText: string;
    highlighted?: boolean;
}

interface PricingSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    plans?: PricingPlan[];
    className?: string;
}

const defaultPlans: PricingPlan[] = [
    {
        name: "Smart",
        monthlyPrice: "$29",
        yearlyPrice: "$290",
        period: "per month",
        features: [
            { name: "500 Messages/month", included: true },
            { name: "∞ Documents (5 MB)", included: true },
            { name: "3 Custom Behavior", included: true },
            { name: "Auto-Lead Capture", included: true },
            { name: "Connect 🟢🟡🟠🟡", included: true },
            { name: "No Automatic rescaping", included: false },
            { name: "No Remove Ultimo Bots Branding", included: false }
        ],
        buttonText: "Start Free Trial"
    },
    {
        name: "Boost",
        monthlyPrice: "$59",
        yearlyPrice: "$590",
        period: "per month",
        features: [
            { name: "2'000 Messages/month", included: true },
            { name: "∞ Documents (15 MB)", included: true },
            { name: "10 Custom Behaviors", included: true },
            { name: "Auto-Lead Capture", included: true },
            { name: "Connect 🟢🟡🟠🟡", included: true },
            { name: "Automatic rescaping (monthly)", included: true },
            { name: "Remove Ultimo Bots Branding", included: true }
        ],
        buttonText: "Start Free Trial",
        highlighted: true
    },
    {
        name: "Ultimo",
        monthlyPrice: "$149",
        yearlyPrice: "$1,490",
        period: "per month",
        features: [
            { name: "10'000 Messages/month", included: true },
            { name: "∞ Documents (50 MB)", included: true },
            { name: "30 Custom Behaviors", included: true },
            { name: "Auto-Lead Capture", included: true },
            { name: "Connect 🟢🟡🟠🟡", included: true },
            { name: "Automatic rescaping (daily)", included: true },
            { name: "Remove Ultimo Bots Branding", included: true }
        ],
        buttonText: "Start Free Trial"
    }
];

export function PricingSection({
    title = "Pricing",
    subtitle = "Transparent pricing. No surprises.",
    description = "Choose the plan that fits your growth stage. Cancel anytime.",
    plans = defaultPlans,
    className
}: PricingSectionProps) {

    const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");

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
                <div className="mb-12 md:mb-16">
                    {/* Small label with dot */}
                    <div className="mb-4 flex">
                        <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#5e1bff] bg-[#f3efff] border border-[#eee8ff] px-3 py-1.5 rounded-full">
                            <span className="w-2 h-2 bg-[#5e1bff] rounded-full"></span>
                            {title}
                        </span>
                    </div>
                    
                    {/* Main title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4">
                        {subtitle}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-lg text-[#5a5a5a] max-w-2xl">
                        {description}
                    </p>

                    {/* Month/Year Toggle - Exactly as in image */}
                    <div className="flex items-center justify-center gap-0 mt-8 bg-[#f3f4f6] p-1 rounded-full w-fit mx-auto border border-gray-200">
                        <button
                            onClick={() => setBillingCycle("month")}
                            className={cn(
                                "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                billingCycle === "month"
                                    ? "bg-white text-[#1d1d1f] shadow-sm" 
                                    : "text-[#666666] hover:text-[#1d1d1f]"
                            )}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => setBillingCycle("year")}
                            className={cn(
                                "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                billingCycle === "year"
                                    ? "bg-white text-[#1d1d1f] shadow-sm" 
                                    : "text-[#666666] hover:text-[#1d1d1f]"
                            )}
                        >
                            Year
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative rounded-2xl border p-8 transition-all duration-300 border-[#e8e3ff]",
                                plan.highlighted 
                                    ? "border-[#5e1bff] border-3 bg-white shadow-xl scale-105 z-10" 
                                    : "border-gray-200 bg-white hover:border-[#5e1bff]/30 hover:shadow-lg"
                            )}
                        >
                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold text-[#5e1bff] mb-4">
                                {plan.name}
                            </h3>

                            {/* Price - Dynamic based on billing cycle */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-[#1d1d1f]">
                                    {billingCycle === "month" ? plan.monthlyPrice : plan.yearlyPrice}
                                </span>
                                <span className="text-sm text-[#666666] ml-2">
                                    {billingCycle === "month" ? "per month" : "per year"}
                                </span>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        {feature.included ? (
                                            <span className="text-[#5e1bff] font-bold text-lg leading-5">•</span>
                                        ) : (
                                            <X className="h-4 w-4 text-[#999999] mt-0.5 flex-shrink-0" />
                                        )}
                                        <span className={cn(
                                            "text-sm",
                                            feature.included ? "text-[#4a4a4a]" : "text-[#999999]"
                                        )}>
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Button
                                className={cn(
                                    "w-full py-6 text-base font-medium transition-all",
                                    plan.highlighted
                                        ? "bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white shadow-lg"
                                        : "bg-white border-2 border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white"
                                )}
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}