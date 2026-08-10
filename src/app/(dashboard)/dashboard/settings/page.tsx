"use client";

import { useCallback, useRef, useState } from "react";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { DesignTab } from "@/components/dashboard/settings/design-tab";
import { LeadGenerationTab } from "@/components/dashboard/settings/lead-generation-tab";
import { KnowledgeBaseTab } from "@/components/dashboard/settings/knowledge-base-tab";
import { BehaviorTab } from "@/components/dashboard/settings/behavior-tab";
import { BusinessContextTab } from "@/components/dashboard/settings/business-context-tab";
import { WidgetPreview } from "@/components/dashboard/settings/widget-preview";
import type { DesignState } from "@/components/dashboard/settings/types";
import { cn } from "@/lib/utils";

type SettingsTab = "design" | "leads" | "knowledge" | "behavior" | "context";

const tabs: TabItem<SettingsTab>[] = [
    { value: "design", label: "Design" },
    { value: "leads", label: "Lead generation" },
    { value: "knowledge", label: "Knowledge base" },
    { value: "behavior", label: "Behavior" },
    { value: "context", label: "Business context" },
];

const initialDesign: DesignState = {
    headerText: "Chat with us",
    inputPlaceholder: "Type your message...",
    welcomeMessage: "Hi! How can I help you today?",
    themeColor: "#5e1bff",
    headerFontColor: "#ffffff",
    buttonHoverColor: "#4510b0",
    removeBranding: false,
    widgetPosition: "right",
    enablePulsing: true,
    widgetSize: "medium",
    widgetBorderRadius: "12",
    showPopups: true,
    delaySeconds: "5",
    questions: [
        { id: 1, text: "What do you offer?" },
        { id: 2, text: "How much does it cost?" },
    ],
};

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("design");
    const [selectedBot, setSelectedBot] = useState("Test");
    const [design, setDesign] = useState<DesignState>(initialDesign);
    const [saved, setSaved] = useState(false);
    const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const updateDesign = useCallback(
        <K extends keyof DesignState>(key: K, value: DesignState[K]) =>
            setDesign((prev) => ({ ...prev, [key]: value })),
        []
    );

    const handleSave = useCallback(() => {
        setSaved(true);
        // Reset any in-flight timer so rapid saves don't clear the badge early.
        if (savedTimer.current) clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSaved(false), 3000);
    }, []);

    const showPreview = activeTab === "design";

    return (
        <div className="space-y-6">
            <PageHeader
                title="Bot settings"
                description="Customize how your bot looks, what it knows and how it behaves."
            />

            <Tabs
                tabs={tabs}
                value={activeTab}
                onChange={setActiveTab}
                aria-label="Bot settings sections"
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

            <div
                className={cn(
                    "grid grid-cols-1 gap-6",
                    // Only the Design tab has a preview to sit beside.
                    showPreview && "lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
                )}
            >
                <div className="min-w-0">
                    {activeTab === "design" && (
                        <DesignTab
                            state={design}
                            update={updateDesign}
                            onSave={handleSave}
                            saved={saved}
                        />
                    )}
                    {activeTab === "leads" && (
                        <LeadGenerationTab onSave={handleSave} saved={saved} />
                    )}
                    {activeTab === "knowledge" && (
                        <KnowledgeBaseTab onSave={handleSave} saved={saved} />
                    )}
                    {activeTab === "behavior" && (
                        <BehaviorTab onSave={handleSave} saved={saved} />
                    )}
                    {activeTab === "context" && (
                        <BusinessContextTab onSave={handleSave} saved={saved} />
                    )}
                </div>

                {showPreview && (
                    <div className="min-w-0">
                        <WidgetPreview design={design} />
                    </div>
                )}
            </div>
        </div>
    );
}
