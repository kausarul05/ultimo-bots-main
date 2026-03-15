"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Gift, Users, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

interface ReferralSectionProps {
    className?: string;
}

export function ReferralSection({
    className
}: ReferralSectionProps) {

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    const features = [
        {
            icon: Gift,
            title: "20% monthly commission",
            description: "Earn 20% every month for the full lifetime of each customer you bring."
        },
        {
            icon: Users,
            title: "Simple tracking",
            description: "Get a personal link for sign-ups and payouts."
        },
        {
            icon: TrendingUp,
            title: "Monthly payouts",
            description: "Build passive income with monthly payouts. No limits or caps."
        },
        {
            icon: Clock,
            title: "Quick signup",
            description: "Share your first name and email to start instantly."
        }
    ];

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


                {/* header  */}
                <div className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white p-4 py-8 rounded-2xl mb-8">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                        Join our Referral Program
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-white mb-8 leading-relaxed text-center">
                        Earn <span className="font-bold text-white">20% commission</span> every month for every new customer you refer – for the entire time they stay with us.
                        <br />
                        Enter your first name and email to get your personal link and simple next steps.
                    </p>
                </div>
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-16">
                    {/* Left Column - Form */}
                    <div>
                        {/* Form */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg mb-8">
                            <div className="flex gap-4">
                                {/* First Name Field */}
                                <div className="mb-6 w-full">
                                    <label className="block text-sm font-bold text-[#5e1bff] mb-2">
                                        First name
                                    </label>
                                    <Input
                                        type="text"
                                        value={firstName}
                                        placeholder="Enter your name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] focus:border-transparent text-[#1d1d1f]"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="mb-6 w-full">
                                    <label className="block text-sm font-bold text-[#5e1bff] mb-2">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        value={email}
                                        placeholder="Enter your email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] focus:border-transparent text-[#1d1d1f]"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                className="w-full bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all group"
                            >
                                Get my referral link
                                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            {/* Privacy Note */}
                            <p className="text-xs text-[#999999] mt-4 text-center">
                                We'll only use your details to send program information and your link.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Features */}
                    <div className="space-y-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className=" bg-white grid grid-cols-2 rounded-xl border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-[#5e1bff]/20"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10 flex items-center justify-center">
                                                <Icon className="h-6 w-6 text-[#5e1bff]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#1d1d1f] mb-1">{feature.title}</h3>
                                            <p className="text-sm text-[#666666]">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}