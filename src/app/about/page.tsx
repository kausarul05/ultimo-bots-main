import { AboutSection } from '@/components/marketing/about-section'
import { CTASection } from '@/components/marketing/cta-section'
import React from 'react'

export default function About() {
    return (
        <div>
            <AboutSection />

            {/* CTASection  */}
            <CTASection
                title="Build your AI agent in minutes"
                description="Launch your first AI agent with Ultimo Bots and let it book appointments, guide upgrades and answer complex questions while staying fully on-brand."
                buttonText="Start Free Trial"
                buttonHref="/signup"
            />
        </div>
    )
}
