"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Shared footer for every settings tab, so the save affordance never moves. */
export function SaveBar({
    onSave,
    saved,
    label = "Save changes",
}: {
    onSave: () => void;
    saved: boolean;
    label?: string;
}) {
    return (
        <div className="flex items-center gap-3 border-t border-border pt-5">
            <Button onClick={onSave}>{label}</Button>
            {/* aria-live so the confirmation is announced, not just shown. */}
            <span aria-live="polite" className="text-sm">
                {saved && (
                    <span className="inline-flex animate-fade-in items-center gap-1.5 font-medium text-success">
                        <Check className="h-4 w-4" />
                        Saved
                    </span>
                )}
            </span>
        </div>
    );
}
