"use client";

import { cn } from "@/lib/utils";
import { Star, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
    quote: string;
    author: string;
    company: string;
    avatar?: string;
}

interface TestimonialsSectionProps {
    title?: string;
    subtitle?: string;
    stats?: {
        number: string;
        label: string;
    };
    testimonials?: Testimonial[];
    countriesStat?: string;
    className?: string;
}

const defaultTestimonials: Testimonial[] = [
    {
        quote: "The quality of the chat's answers is incredible. You can \"train\" it however you like and have a trusted assistant. No mistakes in the answers. Congratulations!",
        author: "Benoit",
        company: "NEXOO"
    },
    {
        quote: "Absolutely fantastic. Immediate success with clients. Fast help, professional team, and they keep improving based on our needs.",
        author: "Jan",
        company: "SKYDATA"
    },
    {
        quote: "This is one of the smartest add ons out there, offering top-quality performance and amazing features. Thanks to it, my website has become twice as good. Highly recommended!",
        author: "Orakai",
        company: "SAJUGOTGAN"
    },
    {
        quote: "We see questions of user that we would never have thought of and our agent books appointments and generates leads while serving our customers 24/7. So cool!",
        author: "Rebecca",
        company: "VILLAR"
    }
];

export function TestimonialsSection({
    title = "What people say",
    subtitle = "Testimonials",
    stats = { number: "2'000+", label: "paying customers" },
    testimonials = defaultTestimonials,
    countriesStat = "80+ countries served",
    className
}: TestimonialsSectionProps) {

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
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
                    <div>
                        {/* Small label with dot */}
                        <div className="mb-4">
                            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#5e1bff] bg-[#f3efff] border border-[#eee8ff] px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 bg-[#5e1bff] rounded-full"></span>
                                {title}
                            </span>
                        </div>
                        
                        {/* Main title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f]">
                            {subtitle}
                        </h2>
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-4 md:mt-0 text-right">
                        <div className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">{stats.number}</div>
                        <div className="text-sm text-[#5a5a5a]">{stats.label}</div>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-[#5e1bff]/20 shadow"
                        >
                            {/* Quote */}
                            <p className="text-[#4a4a4a] text-base leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </p>
                            
                            {/* Author and CTA */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-[#1d1d1f]">{testimonial.author}</div>
                                    <div className="text-sm text-[#5a5a5a]">{testimonial.company}</div>
                                </div>
                                
                                {/* See agent in action link */}
                                <button className="flex items-center gap-1 text-sm font-medium text-[#5e1bff] hover:text-[#4510b0] transition-colors group/btn">
                                    See agent in action
                                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats - 80+ countries served */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4510b0]/20 to-[#5e1bff]/20 border-2 border-white"
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-[#1d1d1f]">{countriesStat}</span>
                        </div>
                        
                        {/* See agent in action button for countries */}
                        <button className="flex items-center gap-1 text-sm font-medium text-[#5e1bff] hover:text-[#4510b0] transition-colors group/btn">
                            See agent in action
                            <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}