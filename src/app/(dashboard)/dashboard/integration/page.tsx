"use client";

import { useState } from "react";
import { Calendar, Check, Code2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";

type PlatformTab = "snippet" | "wix" | "webflow" | "wordpress" | "chat-link";

const tabs: TabItem<PlatformTab>[] = [
    { value: "snippet", label: "Snippet" },
    { value: "wix", label: "Wix" },
    { value: "webflow", label: "Webflow" },
    { value: "wordpress", label: "WordPress" },
    { value: "chat-link", label: "Chat link" },
];

const snippetCode = `<div id="chat-widget-container" data-user-id="177359144926639271464fZAff"></div>
<script src="https://robert-kloepsch.github.io/ultimo-bots-widget/dist/bundle.js" defer></script>`;

const widgetFacts = [
    "Floating chat bubble — it doesn't affect your page layout",
    "Works with any platform (HTML, React, Shopify and more)",
    "No plugin installation required",
];

export default function IntegrationPage() {
    const [activePlatform, setActivePlatform] = useState<PlatformTab>("snippet");
    const [selectedBot, setSelectedBot] = useState("Test");
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(snippetCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard can be blocked by permissions; the code stays selectable.
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Integration"
                description="Put your bot on your site. Copy the snippet, or use a platform-specific install."
            />

            <Tabs
                tabs={tabs}
                value={activePlatform}
                onChange={setActivePlatform}
                aria-label="Integration methods"
            />

            <Field label="Bot" htmlFor="bot-select" className="w-full sm:w-64">
                <Select
                    id="bot-select"
                    value={selectedBot}
                    onChange={(e) => setSelectedBot(e.target.value)}
                >
                    <option value="Test">Test</option>
                </Select>
            </Field>

            <Card>
                <CardHeader>
                    <CardTitle>Widget integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-ink-600">
                        Adds a chat bubble to the bottom-right corner of your website. Paste the
                        snippet just before the closing{" "}
                        <code className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[0.8125rem] text-ink-800">
                            &lt;/body&gt;
                        </code>{" "}
                        tag.
                    </p>

                    <ul className="space-y-2">
                        {widgetFacts.map((fact) => (
                            <li key={fact} className="flex items-start gap-2.5 text-sm text-ink-600">
                                <Check
                                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                                    aria-hidden="true"
                                />
                                {fact}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Code block: dark on purpose — code reads better against a dark ground. */}
            <div className="overflow-hidden rounded-card border border-ink-800 bg-ink-950 shadow-card">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                        <Code2 className="h-4 w-4 text-brand-400" aria-hidden="true" />
                        Integration code
                    </span>
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-1.5 rounded-field bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
                <pre className="scrollbar-slim overflow-x-auto px-4 py-4">
                    <code className="font-mono text-[0.8125rem] leading-relaxed text-ink-200">
                        {snippetCode}
                    </code>
                </pre>
            </div>

            {/* Help CTA */}
            <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-card">
                <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                            <Calendar className="h-5 w-5" />
                        </span>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">
                                Need help with integration?
                            </h3>
                            <p className="max-w-xl text-sm leading-relaxed text-ink-600">
                                Book a free 15-minute call and we&rsquo;ll walk you through
                                installing your chatbot step by step.
                            </p>
                        </div>
                    </div>
                    <Button variant="gradient" size="lg" className="shrink-0">
                        Book integration call
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
