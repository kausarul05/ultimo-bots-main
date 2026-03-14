import { CTASection } from '@/components/marketing/cta-section'
import { FaqVideoSection } from '@/components/marketing/FaqVideoSection'
import { FeaturesSection } from '@/components/marketing/features-section'
import { SecuritySection } from '@/components/marketing/security-section'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { WixSection } from '@/components/marketing/wix-section'
import { WordPressPluginSection } from '@/components/marketing/wordpress-plugin-section'
import React from 'react'

export default function Wix() {
    return (
        <div>
            <WixSection />

            {/* Features Section */}
            <FeaturesSection
                title="Why it stands out on Wix"
                subtitle="Built for Wix, not just embedded into it"
                description="Ultimo Bots is designed around the Wix ecosystem, so setup, training, and management feel native and effortless."
                variant="default"
                columns={3}
            />

            {/* WordPressPluginSection */}
            <WordPressPluginSection />

            {/* FaqVideoSection section  */}
            <FaqVideoSection
                title="From install to live chatbot in 2 minutes"
                subtitle="A simple, guided flow inside Wix takes care of everything for you. No code, no scripts, no technical setup."
                faqItems={[
                    {
                        id: "01",
                        title: "Build & deploy your agent",
                        description: "Simply enter your URL and add documents. We automatically crawl your content to train your agent.",
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "02",
                        title: "Agent solves your customers' problems",
                        description: "Your AI agent handles customer queries with precision, learning from each interaction.",
                        items: ["Invite user", "Refine & optimize", "Route complex issues", "Review analytics"],
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "03",
                        title: "Refine & optimize",
                        description: "Fine-tune your agent's responses based on real conversations and feedback.",
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "04",
                        title: "Route complex issues to a human",
                        description: "Smart escalation when queries need human expertise.",
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "05",
                        title: "Review analytics & insights",
                        description: "Track performance metrics and improve continuously.",
                        videoSrc: "/videos/hero.webm"
                    }
                ]}
                mediaPosition="right"
            />

            {/* FaqVideoSection section  */}
            <FaqVideoSection
                title="Your Wix chatbot that feels like a real team member"
                subtitle="Ultimo Bots helps Wix sites answer questions, qualify leads, and support customers around the clock."
                faqItems={[
                    {
                        id: "01",
                        title: "Build & deploy your agent",
                        description: "Simply enter your URL and add documents. We automatically crawl your content to train your agent.",
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "02",
                        title: "Agent solves your customers' problems",
                        description: "Your AI agent handles customer queries with precision, learning from each interaction.",
                        items: ["Invite user", "Refine & optimize", "Route complex issues", "Review analytics"],
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "03",
                        title: "Refine & optimize",
                        description: "Fine-tune your agent's responses based on real conversations and feedback.",
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "04",
                        title: "Route complex issues to a human",
                        description: "Smart escalation when queries need human expertise.",
                        videoSrc: "/videos/hero.webm"
                    },
                    {
                        id: "05",
                        title: "Review analytics & insights",
                        description: "Track performance metrics and improve continuously.",
                        videoSrc: "/videos/hero.webm"
                    }
                ]}
                mediaPosition="left"
            />

            {/* TestimonialsSection */}
            <TestimonialsSection
                title="Testimonials"
                subtitle="What people say"
                stats={{ number: "2'000+", label: "paying customers" }}
                countriesStat="80+ countries served"
            />


            {/* SecuritySection */}
            <SecuritySection
                title="Security"
                subtitle="Enterprise-grade security & privacy"
                description="We take security and compliance seriously. Ultimo Bots is GDPR aligned and built to keep your data private and safe."
                badge="AICPA SOC 2"
                footerText="Ultimo Bots is committed to safeguarding your data."
            />

            {/* CTASection  */}
            <CTASection
                title="Ready to automate your website?"
                description="Launch your world-class AI Agent in minutes."
                buttonText="Start Free Trial"
                buttonHref="/signup"
            />
        </div>
    )
}
