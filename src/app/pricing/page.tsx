import { CTASection } from '@/components/marketing/cta-section'
import { PricingSection } from '@/components/marketing/pricing-section'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import React from 'react'

export default function Pricing() {
    return (
        <div>
            <PricingSection
                title="Pricing"
                subtitle="Transparent pricing. No surprises."
                description="Choose the plan that fits your growth stage. Cancel anytime."
            />

            {/* TestimonialsSection */}
            <TestimonialsSection
                title="Testimonials"
                subtitle="What people say"
                stats={{ number: "2'000+", label: "paying customers" }}
                countriesStat="80+ countries served"
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
