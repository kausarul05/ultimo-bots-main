import { FeaturesSection } from "@/components/marketing/features-section";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FaqVideoSection } from "@/components/marketing/FaqVideoSection";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { SecuritySection } from "@/components/marketing/security-section";
import { CTASection } from "@/components/marketing/cta-section";


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

            {/* FaqVideoSection section  */}
            <FaqVideoSection
                title="From URL to Live Chatbot in minutes"
                subtitle="With Ultimo Bots, you go from setup to automation instantly."
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

            {/* Benefits section  */}
            <FaqVideoSection
                title="Works like your best service agent"
                subtitle="Built to fit your tools and workflows while staying simple for customers."
                faqItems={[
                    {
                        id: "01",
                        title: "Build & deploy your agent",
                        description: "Simply enter your URL and add documents. We automatically crawl your content to train your agent.",
                        videoSrc: "/videos/benefits-1.webm"
                    },
                    {
                        id: "02",
                        title: "Agent solves your customers' problems",
                        description: "Your AI agent handles customer queries with precision, learning from each interaction.",
                        items: ["Invite user", "Refine & optimize", "Route complex issues", "Review analytics"],
                        videoSrc: "/videos/benefits-1.webm"
                    },
                    {
                        id: "03",
                        title: "Refine & optimize",
                        description: "Fine-tune your agent's responses based on real conversations and feedback.",
                        videoSrc: "/videos/benefits-1.webm"
                    },
                    {
                        id: "04",
                        title: "Route complex issues to a human",
                        description: "Smart escalation when queries need human expertise.",
                        videoSrc: "/videos/benefits-1.webm"
                    },
                    {
                        id: "05",
                        title: "Review analytics & insights",
                        description: "Track performance metrics and improve continuously.",
                        videoSrc: "/videos/benefits-1.webm"
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
    );
}