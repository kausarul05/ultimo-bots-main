"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Textarea, CharCount } from "@/components/ui/textarea";
import { Section } from "@/components/ui/card";
import { SaveBar } from "./save-bar";
import { CONTEXT_MAX } from "./types";

export function BusinessContextTab({
    onSave,
    saved,
}: {
    onSave: () => void;
    saved: boolean;
}) {
    const [businessContext, setBusinessContext] = useState("");

    return (
        <div className="space-y-8 rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex gap-3 rounded-field border border-brand-200 bg-brand-50 p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <div className="space-y-2 text-sm leading-relaxed text-brand-900">
                    <p>
                        Business context gives your bot the essential facts about your company so
                        its answers stay accurate. It is generated from your knowledge base, and
                        you can refine it here.
                    </p>
                    <p>
                        <span className="font-medium">Include:</span> what your business does, who
                        you serve, and your key value propositions. Keep it concise and factual.
                    </p>
                </div>
            </div>

            <Section title="Business context">
                <div>
                    <Textarea
                        aria-label="Business context"
                        value={businessContext}
                        onChange={(e) => setBusinessContext(e.target.value)}
                        rows={10}
                        maxLength={CONTEXT_MAX}
                        placeholder="We build… We serve… What makes us different is…"
                    />
                    <CharCount value={businessContext.length} max={CONTEXT_MAX} />
                </div>
            </Section>

            <SaveBar onSave={onSave} saved={saved} label="Save" />
        </div>
    );
}
