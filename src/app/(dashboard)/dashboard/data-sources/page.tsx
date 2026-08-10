"use client";

import { Cloud, HardDrive, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ConnectionCard, type Connection } from "@/components/dashboard/connection-card";

const sources: Connection[] = [
    {
        name: "Google Drive",
        icon: HardDrive,
        description: "Import documents, PDFs and text files straight from your Drive.",
        connectLabel: "Connect Google Drive",
        connections: 0,
        color: "#1A73E8",
    },
    {
        name: "OneDrive",
        icon: Cloud,
        description: "Import documents and files from your Microsoft OneDrive.",
        connectLabel: "Connect OneDrive",
        connections: 0,
        color: "#0078D4",
    },
];

export default function DataSourcesPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Data sources"
                description="Import documents into your bot's knowledge base from cloud storage."
            />

            <div className="flex gap-3 rounded-card border border-brand-200 bg-brand-50 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-brand-900">
                    Once a source is connected you can pick specific files or folders to sync, and
                    they will stay up to date as the originals change.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {sources.map((source) => (
                    <ConnectionCard key={source.name} connection={source} />
                ))}
            </div>
        </div>
    );
}
