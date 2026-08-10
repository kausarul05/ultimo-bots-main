"use client";

import { useState } from "react";
import { Info, MessageSquareText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea, CharCount } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { SaveBar } from "./save-bar";
import { BEHAVIOR_MAX } from "./types";

interface Behavior {
    id: number;
    text: string;
    selected: boolean;
}

const examples = [
    "End every conversation by asking if there's anything else you can help with.",
    "When a customer asks about pricing, always suggest booking a free consultation call.",
    "Never mention competitor products or services, even if the customer asks about them.",
];

const MAX_BEHAVIORS = 10;

export function BehaviorTab({ onSave, saved }: { onSave: () => void; saved: boolean }) {
    const [behaviors, setBehaviors] = useState<Behavior[]>([]);

    const addBehavior = () => {
        if (behaviors.length >= MAX_BEHAVIORS) return;
        setBehaviors((prev) => [...prev, { id: Date.now(), text: "", selected: false }]);
    };

    const updateBehavior = (id: number, text: string) =>
        setBehaviors((prev) => prev.map((b) => (b.id === id ? { ...b, text } : b)));

    const removeBehavior = (id: number) =>
        setBehaviors((prev) => prev.filter((b) => b.id !== id));

    const allSelected = behaviors.length > 0 && behaviors.every((b) => b.selected);
    const someSelected = behaviors.some((b) => b.selected) && !allSelected;

    return (
        <div className="space-y-6 rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex gap-3 rounded-field border border-brand-200 bg-brand-50 p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <div className="space-y-2 text-sm leading-relaxed text-brand-900">
                    <p>
                        Steer your bot&rsquo;s tone and behavior with plain-language instructions.
                        For example:
                    </p>
                    <ul className="space-y-1.5">
                        {examples.map((example) => (
                            <li key={example} className="flex gap-2">
                                <span aria-hidden="true">•</span>
                                <span className="text-brand-800">{example}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="rounded-field bg-ink-100 px-4 py-3 text-sm text-ink-600">
                <span className="font-medium text-foreground">Note:</span> each behavior is limited
                to {BEHAVIOR_MAX} characters. For anything longer, split your guidance into
                multiple focused behaviors.
            </p>

            <div className="flex items-center justify-between gap-4">
                <Button
                    onClick={addBehavior}
                    disabled={behaviors.length >= MAX_BEHAVIORS}
                    type="button"
                >
                    <Plus className="h-4 w-4" />
                    Add behavior
                </Button>
                <span className="text-sm tabular-nums text-ink-500">
                    {behaviors.length} / {MAX_BEHAVIORS} used
                </span>
            </div>

            {behaviors.length === 0 ? (
                <EmptyState
                    variant="panel"
                    icon={MessageSquareText}
                    title="No behaviors yet"
                    description="Add your first instruction to shape how the bot responds."
                    action={
                        <Button variant="outline" size="sm" onClick={addBehavior} type="button">
                            <Plus className="h-3.5 w-3.5" />
                            Add behavior
                        </Button>
                    }
                />
            ) : (
                <div className="space-y-3">
                    <Checkbox
                        checked={allSelected}
                        indeterminate={someSelected}
                        onCheckedChange={(checked) =>
                            setBehaviors((prev) =>
                                prev.map((b) => ({ ...b, selected: checked }))
                            )
                        }
                        label="Select all"
                    />

                    <ul className="space-y-3">
                        {behaviors.map((behavior, index) => (
                            <li
                                key={behavior.id}
                                className="flex items-start gap-3 rounded-field border border-border bg-ink-50/60 p-3"
                            >
                                <span className="mt-2.5">
                                    <Checkbox
                                        checked={behavior.selected}
                                        onCheckedChange={(checked) =>
                                            setBehaviors((prev) =>
                                                prev.map((b) =>
                                                    b.id === behavior.id
                                                        ? { ...b, selected: checked }
                                                        : b
                                                )
                                            )
                                        }
                                    />
                                </span>

                                <div className="min-w-0 flex-1">
                                    <Textarea
                                        value={behavior.text}
                                        onChange={(e) =>
                                            updateBehavior(behavior.id, e.target.value)
                                        }
                                        rows={2}
                                        maxLength={BEHAVIOR_MAX}
                                        aria-label={`Behavior ${index + 1}`}
                                        placeholder="Describe how the bot should behave…"
                                        className="min-h-0"
                                    />
                                    <CharCount
                                        value={behavior.text.length}
                                        max={BEHAVIOR_MAX}
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeBehavior(behavior.id)}
                                    aria-label={`Delete behavior ${index + 1}`}
                                    className="mt-1.5 rounded-md p-2 text-ink-400 transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <SaveBar onSave={onSave} saved={saved} />
        </div>
    );
}
