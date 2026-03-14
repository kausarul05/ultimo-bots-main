"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Linkedin } from "lucide-react";

interface FooterProps {
    className?: string;
}

export function Footer({
    className
}: FooterProps) {

    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "ml-8 border-t border-[#eee8ff] md:py-8 lg:py-12 md:px-40",
                className
            )}
            style={{
                background: "linear-gradient(180deg, #fbfaff, #ffffff 60%)"
            }}
        >
            <div className="container">
                {/* Main Footer Content */}
                <div className="grid grid-cols-4 gap-8">
                    {/* Logo and Copyright Column */}
                    <div className="">
                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-[#0A0A0A] rounded-md flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">U</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-[#5e1bff] font-semibold text-xl tracking-tight">Ultimo</span>
                                    <span className="text-[#5e1bff] font-semibold text-xl tracking-tight ml-1">Bots</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-[#666666]">
                            © {currentYear} Ultimo Bots
                        </div>
                    </div>

                    {/* Contact Column with LinkedIn */}
                    {/* <div className="">
                        <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://linkedin.com"
                                    className="flex items-center gap-2 text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    <span>in</span>
                                </Link>
                            </li>
                        </ul>
                    </div> */}

                    {/* COMPANY Column */}
                    <div className="">
                        <h3 className="text-sm font-semibold text-[#5e1bff] mb-4">COMPANY</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/imprint"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Imprint
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Terms
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* PRODUCT Column */}
                    <div className="">
                        <h3 className="text-sm font-semibold text-[#5e1bff] mb-4">PRODUCT</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/wix"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Wix
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/wordpress"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Wordpress
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* RESOURCES Column */}
                    <div className="">
                        <h3 className="text-sm font-semibold text-[#5e1bff] mb-4">RESOURCES</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/guide"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Guide
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/referral"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Referral Programm
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-[#666666] hover:text-[#0A0A0A] transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}