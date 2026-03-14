import { FeaturesSection } from '@/components/marketing/features-section'
import { HeroSection } from '@/components/marketing/HeroSection'
import React from 'react'

export default function Chat() {
  return (
    <div>
      {/* Here section  */}
      <HeroSection
        title="The highest-rated AI chatbot for WordPress websites"
        titleHighlight="Website"
        description="Install the Ultimo Bots plugin from the WordPress Plugin Directory and get a fully trained chatbot live on your site in 2 minutes."
        variant="split"
        videoSrc="../videos/benefits-1.webm"
        primaryCta={{ text: "Install on WordPress", href: "/signup" }}
      />

      {/* Features Section */}
      <FeaturesSection
        title="Why it stands out on WordPress"
        subtitle="Built for WordPress, not just embedded into it"
        description="Ultimo Bots is designed around the WordPress ecosystem, so setup, training, and management feel native and effortless inside your admin dashboard."
        variant="default"
        columns={3}
      />
    </div>
  )
}
