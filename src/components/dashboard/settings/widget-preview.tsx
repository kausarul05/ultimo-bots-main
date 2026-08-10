"use client";

import { Camera, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DesignState } from "./types";

/**
 * Live preview of the chat widget. Reflects the Design tab as you type, so the
 * colour and copy fields have visible consequences.
 */
export function WidgetPreview({ design }: { design: DesignState }) {
    const radius = `${design.widgetBorderRadius || 12}px`;

    return (
        <Card className="lg:sticky lg:top-8">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Preview</CardTitle>
                <Button variant="outline" size="sm">
                    <Camera className="h-3.5 w-3.5" />
                    Screenshot
                </Button>
            </CardHeader>

            <CardContent>
                <div
                    className="overflow-hidden border border-border bg-card shadow-card"
                    style={{ borderRadius: radius }}
                >
                    {/* Widget header */}
                    <div
                        className="flex items-center gap-2.5 px-4 py-3"
                        style={{ backgroundColor: design.themeColor }}
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-sm font-bold text-white">
                            U
                        </span>
                        <div className="min-w-0">
                            <p
                                className="truncate text-sm font-semibold"
                                style={{ color: design.headerFontColor }}
                            >
                                Ultimo Bots
                            </p>
                            <p className="truncate text-xs text-white/80">
                                {design.headerText || "Chat with us"}
                            </p>
                        </div>
                    </div>

                    {/* Conversation */}
                    <div className="space-y-3 bg-ink-50/70 px-4 py-4">
                        {design.welcomeMessage && (
                            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 shadow-xs">
                                <p className="text-sm leading-relaxed text-foreground">
                                    {design.welcomeMessage}
                                </p>
                            </div>
                        )}

                        {design.questions
                            .filter((q) => q.text.trim())
                            .map((question) => (
                                <button
                                    key={question.id}
                                    type="button"
                                    className="block w-full rounded-full border px-3.5 py-2 text-left text-sm transition-colors"
                                    style={{
                                        borderColor: design.themeColor,
                                        color: design.themeColor,
                                    }}
                                >
                                    {question.text}
                                </button>
                            ))}
                    </div>

                    {/* Composer */}
                    <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-3">
                        <span className="flex-1 truncate text-sm text-ink-400">
                            {design.inputPlaceholder || "Type your message..."}
                        </span>
                        <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: design.themeColor }}
                        >
                            <Send className="h-4 w-4" />
                        </span>
                    </div>

                    {!design.removeBranding && (
                        <p className="border-t border-border bg-card py-2 text-center text-[0.6875rem] text-ink-400">
                            Powered by Ultimo Bots
                        </p>
                    )}
                </div>

                {/* Bubble preview */}
                <div className="mt-5 flex items-center justify-between rounded-field border border-border bg-ink-50/60 px-4 py-3">
                    <span className="text-xs text-ink-500">
                        Bubble ({design.widgetPosition}, {design.widgetSize})
                    </span>
                    <span className="relative flex h-10 w-10">
                        {design.enablePulsing && (
                            <span
                                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
                                style={{ backgroundColor: design.themeColor }}
                            />
                        )}
                        <span
                            className="relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                            style={{ backgroundColor: design.themeColor }}
                        >
                            U
                        </span>
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
