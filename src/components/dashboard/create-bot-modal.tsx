"use client";

import { useRef, useState } from "react";
import { FileText, Trash2, Upload } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CreateBotModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateBot: (botData: { name: string; website: string; files: File[] }) => void;
}

const ACCEPTED = ".pdf,.txt,.doc,.docx,.rtf";

function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CreateBotModal({ isOpen, onClose, onCreateBot }: CreateBotModalProps) {
    const [botName, setBotName] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const reset = () => {
        setBotName("");
        setWebsiteUrl("");
        setFiles([]);
        setError("");
        setDragging(false);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const addFiles = (incoming: FileList | null) => {
        if (!incoming) return;
        setFiles((prev) => [...prev, ...Array.from(incoming)]);
    };

    const removeFile = (index: number) =>
        setFiles((prev) => prev.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const name = botName.trim();
        if (!name) {
            setError("Give your bot a name so you can tell it apart later.");
            return;
        }
        onCreateBot({ name, website: websiteUrl.trim(), files });
        reset();
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            title="Create a new bot"
            description="Name it, point it at your content, and we'll do the rest."
            footer={
                <>
                    <Button variant="ghost" onClick={handleClose} type="button">
                        Cancel
                    </Button>
                    <Button variant="gradient" type="submit" form="create-bot-form">
                        Create bot
                    </Button>
                </>
            }
        >
            <form id="create-bot-form" onSubmit={handleSubmit} className="space-y-6">
                <Field
                    label="Bot name"
                    htmlFor="bot-name"
                    required
                    error={error}
                    hint="Shown to you only — customers never see it."
                >
                    <Input
                        id="bot-name"
                        value={botName}
                        onChange={(e) => {
                            setBotName(e.target.value);
                            if (error) setError("");
                        }}
                        invalid={Boolean(error)}
                        placeholder="Support assistant"
                        autoComplete="off"
                    />
                </Field>

                <Field
                    label="Website URL"
                    htmlFor="bot-website"
                    hint="Optional — we'll crawl this site to build the knowledge base."
                >
                    <Input
                        id="bot-website"
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://example.com"
                    />
                </Field>

                <Field
                    label="Documents"
                    hint="Optional — PDF, TXT, DOC, DOCX or RTF."
                >
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            addFiles(e.dataTransfer.files);
                        }}
                        className={cn(
                            "rounded-card border-2 border-dashed p-6 text-center transition-colors",
                            dragging
                                ? "border-brand-500 bg-brand-50"
                                : "border-ink-300 bg-ink-50/50 hover:border-brand-400"
                        )}
                    >
                        <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            <Upload className="h-5 w-5" />
                        </span>
                        <p className="text-sm font-medium text-foreground">
                            Drag &amp; drop files here
                        </p>
                        <p className="mt-1 text-xs text-ink-500">or</p>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={() => inputRef.current?.click()}
                        >
                            Select files
                        </Button>
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            className="sr-only"
                            accept={ACCEPTED}
                            onChange={(e) => {
                                addFiles(e.target.files);
                                // Allow re-picking the same file after a removal.
                                e.target.value = "";
                            }}
                        />
                    </div>

                    {files.length > 0 && (
                        <ul className="mt-3 space-y-2">
                            {files.map((file, index) => (
                                <li
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between gap-3 rounded-field border border-border bg-card px-3 py-2.5"
                                >
                                    <span className="flex min-w-0 items-center gap-2.5">
                                        <FileText className="h-4 w-4 shrink-0 text-brand-600" />
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm text-foreground">
                                                {file.name}
                                            </span>
                                            <span className="block text-xs text-ink-500">
                                                {formatSize(file.size)}
                                            </span>
                                        </span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        aria-label={`Remove ${file.name}`}
                                        className="shrink-0 rounded-md p-1.5 text-ink-400 transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Field>
            </form>
        </Modal>
    );
}
