"use client";

import { Button } from "@/components/ui/button";
import { Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  badge?: string;
  videoSrc?: string;
  videoPoster?: string;
  chatMessage?: {
    user: string;
    bot: string;
  };
  variant?: "default" | "centered" | "split";
  className?: string;
}

export function HeroSection({
  title,
  titleHighlight,
  description,
  primaryCta = { text: "Start Free Trial", href: "/signup" },
  secondaryCta,
  badge,
  videoSrc,
  videoPoster,
  chatMessage,
  variant = "split",
  className
}: HeroSectionProps) {
  
  const renderTitle = () => {
    if (!titleHighlight) {
      return <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f]">{title}</h1>;
    }
    
    const parts = title.split(titleHighlight);
    return (
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-18">
        {parts[0]}
        <span className="bg-clip-text bg-gradient-to-r from-[#4510b0] to-[#5e1bff]">
          {titleHighlight}
        </span>
        {parts[1]}
      </h1>
    );
  };

  return (
    <section className={cn(
      "w-full py-12 md:py-20 lg:py-24 md:px-40",
      variant === "centered" && "text-center",
      className
    )}>
      <div className="container px-4 md:px-6">
        <div className={cn(
          "grid gap-12 lg:gap-16",
          variant === "split" && "lg:grid-cols-2",
          variant === "centered" && "max-w-3xl mx-auto"
        )}>
          {/* Left Column - Content */}
          <div className={cn(
            "flex flex-col justify-center space-y-6",
            variant === "centered" && "items-center"
          )}>
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#4510b0]/10 to-[#5e1bff]/10 px-4 py-1.5 text-sm font-medium text-[#4510b0] border border-[#4510b0]/20">
                {badge}
              </div>
            )}

            {/* Title */}
            <div className="space-y-4">
              {renderTitle()}
              <p className="text-sm text-[#5a5a5a] md:text-lg max-w-[600px]">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <a href={primaryCta.href}>
                  {primaryCta.text}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              
              {secondaryCta && (
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-2 hover:bg-gray-50"
                >
                  <a href={secondaryCta.href}>
                    {secondaryCta.text}
                  </a>
                </Button>
              )}
            </div>

            {/* Trial Badge */}
            {badge && badge.includes("Free Trial") && (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                7 Day Free Trial • Cancel anytime
              </p>
            )}

            {/* Chat Message Example */}
            {chatMessage && (
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 max-w-md">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#4510b0] to-[#5e1bff] rounded-full flex items-center justify-center text-white text-sm font-bold">
                      U
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">User</p>
                      <p className="text-gray-800">{chatMessage.user}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">
                      AI
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assistant</p>
                      <p className="text-gray-800">{chatMessage.bot}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Video/Media with Gradient Border */}
          {variant === "split" && (
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[600px] group">
                {/* Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4510b0] to-[#5e1bff] rounded-3xl opacity-75 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200"></div>
                
                {/* Video Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
                  {videoSrc ? (
                    <video
                      src={videoSrc}
                      poster={videoPoster}
                      className="w-full h-auto relative z-10"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative z-10">
                      <div className="w-20 h-20 bg-gradient-to-r from-[#4510b0] to-[#5e1bff] rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
                </div>

                {/* Stats overlays (only show when no video src) */}
                {!videoSrc && (
                  <>
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 z-30">
                      <p className="text-sm text-gray-600">2,000+</p>
                      <p className="font-bold">Active Users</p>
                    </div>
                    
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#4510b0] to-[#5e1bff] text-white rounded-xl shadow-xl p-4 z-30">
                      <p className="text-sm opacity-90">5 min setup</p>
                      <p className="font-bold">No code</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}