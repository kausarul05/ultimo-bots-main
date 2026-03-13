import { FeaturesSection } from "@/components/marketing/features-section";
import { HeroSection } from "@/components/marketing/HeroSection";


export default function Home() {
  return (
    <div className="p-8">
      {/* Here section  */}
      <HeroSection
        title="Add a Custom AI Chatbot to Your "
        titleHighlight="Website"
        description="Your AI agent answers instantly, captures leads, and integrates in 5 minutes. No coding required."
        variant="split"
        videoSrc="../videos/hero.webm"
      />

      {/* Features Section */}
      <FeaturesSection
        title="Highlights"
        subtitle="Why businesses choose Ultimo Bots"
        description="Built to solve hard problems while staying simple and secure."
        variant="default"
        columns={3}
      />
    </div>
  );
}