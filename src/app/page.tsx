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
    </div>
  );
}