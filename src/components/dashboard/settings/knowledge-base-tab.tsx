"use client";

import { useMemo, useState } from "react";
import { Eye, Globe, Info, Link2Off, Plus, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { SaveBar } from "./save-bar";

interface WebsiteLink {
    id: number;
    url: string;
    selected: boolean;
}

type SourceTab = "links" | "documents" | "qa" | "google-drive" | "onedrive";

const sourceTabs: TabItem<SourceTab>[] = [
    { value: "links", label: "Website links" },
    { value: "documents", label: "Documents" },
    { value: "qa", label: "Q&A" },
    { value: "google-drive", label: "Google Drive" },
    { value: "onedrive", label: "OneDrive" },
];

export function KnowledgeBaseTab({
    onSave,
    saved,
}: {
    onSave: () => void;
    saved: boolean;
}) {
    const [autoRescraping, setAutoRescraping] = useState(false);
    const [selectedSource, setSelectedSource] = useState<SourceTab>("links");
    const [searchTerm, setSearchTerm] = useState("");
    const [websiteLinks, setWebsiteLinks] = useState<WebsiteLink[]>([
        { id: 1, url: "https://example.com", selected: false },
        { id: 2, url: "https://test.com", selected: true },
        { id: 3, url: "https://demo.com", selected: false },
    ]);

    // The search box previously filtered nothing — it does now.
    const visibleLinks = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return websiteLinks;
        return websiteLinks.filter((link) => link.url.toLowerCase().includes(term));
    }, [websiteLinks, searchTerm]);

    const selectedCount = websiteLinks.filter((l) => l.selected).length;
    const allVisibleSelected =
        visibleLinks.length > 0 && visibleLinks.every((l) => l.selected);
    const someVisibleSelected = visibleLinks.some((l) => l.selected) && !allVisibleSelected;

    const toggleLink = (id: number, checked: boolean) =>
        setWebsiteLinks((prev) =>
            prev.map((l) => (l.id === id ? { ...l, selected: checked } : l))
        );

    const toggleAllVisible = (checked: boolean) => {
        const visibleIds = new Set(visibleLinks.map((l) => l.id));
        setWebsiteLinks((prev) =>
            prev.map((l) => (visibleIds.has(l.id) ? { ...l, selected: checked } : l))
        );
    };

    return (
        <div className="space-y-6 rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex gap-3 rounded-field border border-brand-200 bg-brand-50 p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <div className="space-y-2 text-sm leading-relaxed text-brand-900">
                    <p>Your bot answers from this knowledge base. Here you can:</p>
                    <ul className="space-y-1.5 text-brand-800">
                        <li className="flex gap-2">
                            <span aria-hidden="true">•</span>
                            Turn on automatic rescraping to refresh website content on a schedule
                        </li>
                        <li className="flex gap-2">
                            <span aria-hidden="true">•</span>
                            Add or remove website links, documents, Q&amp;As and cloud files
                        </li>
                        <li className="flex gap-2">
                            <span aria-hidden="true">•</span>
                            Re-scrape a source manually, or inspect the raw data your bot received
                        </li>
                    </ul>
                </div>
            </div>

            <Tabs
                tabs={sourceTabs}
                value={selectedSource}
                onChange={setSelectedSource}
                variant="pill"
                aria-label="Knowledge base sources"
            />

            {selectedSource === "links" ? (
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Button variant="outline" size="sm" type="button">
                            <Plus className="h-3.5 w-3.5" />
                            Add links
                        </Button>

                        <div className="flex items-center gap-2.5">
                            <span className="text-sm text-ink-600">Automatic rescraping</span>
                            <Badge variant="solid" size="sm">
                                New
                            </Badge>
                            <Switch
                                checked={autoRescraping}
                                onCheckedChange={setAutoRescraping}
                                label="Activate automatic rescraping"
                            />
                        </div>
                    </div>

                    <Input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search links"
                        aria-label="Search website links"
                        leadingIcon={<Search />}
                    />

                    {visibleLinks.length === 0 ? (
                        <EmptyState
                            variant="panel"
                            icon={Link2Off}
                            title="No matching links"
                            description={
                                searchTerm
                                    ? `Nothing matches “${searchTerm}”.`
                                    : "Add a website link to start building the knowledge base."
                            }
                        />
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                                <Checkbox
                                    checked={allVisibleSelected}
                                    indeterminate={someVisibleSelected}
                                    onCheckedChange={toggleAllVisible}
                                    label="Select all"
                                />
                                <span className="text-sm tabular-nums text-ink-500">
                                    {selectedCount} selected
                                </span>
                            </div>

                            <ul className="space-y-2">
                                {visibleLinks.map((link) => (
                                    <li
                                        key={link.id}
                                        className="flex items-center justify-between gap-3 rounded-field border border-border bg-ink-50/60 px-3 py-2.5 transition-colors hover:bg-ink-100/70"
                                    >
                                        <span className="flex min-w-0 items-center gap-3">
                                            <Checkbox
                                                checked={link.selected}
                                                onCheckedChange={(checked) =>
                                                    toggleLink(link.id, checked)
                                                }
                                            />
                                            <Globe
                                                className="h-4 w-4 shrink-0 text-brand-600"
                                                aria-hidden="true"
                                            />
                                            <span className="truncate text-sm text-foreground">
                                                {link.url}
                                            </span>
                                        </span>

                                        <span className="flex shrink-0 items-center gap-1">
                                            <button
                                                type="button"
                                                aria-label={`View raw data for ${link.url}`}
                                                className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-ink-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label={`Re-scrape ${link.url}`}
                                                className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-brand-100 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                            >
                                                <RefreshCw className="h-4 w-4" />
                                            </button>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ) : (
                <EmptyState
                    variant="panel"
                    icon={Info}
                    title={`${sourceTabs.find((t) => t.value === selectedSource)?.label} coming soon`}
                    description="This source type isn't wired up yet. Website links are available today."
                />
            )}

            <SaveBar onSave={onSave} saved={saved} />
        </div>
    );
}
