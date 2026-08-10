"use client";

import { GripVertical, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea, CharCount } from "@/components/ui/textarea";
import { Field } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Section, SettingRow } from "@/components/ui/card";
import { SaveBar } from "./save-bar";
import { QUESTION_MAX, WELCOME_MAX, type DesignState } from "./types";

interface DesignTabProps {
    state: DesignState;
    update: <K extends keyof DesignState>(key: K, value: DesignState[K]) => void;
    onSave: () => void;
    saved: boolean;
}

/** Colour swatch + hex input, kept in sync. */
function ColorField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    const id = `color-${label.replace(/\s+/g, "-").toLowerCase()}`;
    return (
        <div className="flex items-center justify-between gap-4">
            <label htmlFor={id} className="text-sm text-ink-600">
                {label}
            </label>
            <div className="flex items-center gap-2">
                <input
                    id={id}
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-9 w-9 cursor-pointer rounded-field border border-input bg-card p-1"
                />
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-label={`${label} hex value`}
                    className="h-9 w-28 font-mono text-xs uppercase"
                />
            </div>
        </div>
    );
}

export function DesignTab({ state, update, onSave, saved }: DesignTabProps) {
    const addQuestion = () =>
        update("questions", [
            ...state.questions,
            { id: Date.now(), text: "" },
        ]);

    const updateQuestion = (id: number, text: string) =>
        update(
            "questions",
            state.questions.map((q) => (q.id === id ? { ...q, text } : q))
        );

    const deleteQuestion = (id: number) =>
        update(
            "questions",
            state.questions.filter((q) => q.id !== id)
        );

    return (
        <div className="space-y-8 rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
            <Section title="Header">
                <Field label="Header text" htmlFor="header-text">
                    <Input
                        id="header-text"
                        value={state.headerText}
                        onChange={(e) => update("headerText", e.target.value)}
                        placeholder="Chat with us"
                    />
                </Field>
            </Section>

            <Section title="Welcome message">
                <div>
                    <Textarea
                        aria-label="Welcome message"
                        value={state.welcomeMessage}
                        onChange={(e) => update("welcomeMessage", e.target.value)}
                        rows={3}
                        maxLength={WELCOME_MAX}
                        placeholder="Hi! How can I help you today?"
                    />
                    <CharCount value={state.welcomeMessage.length} max={WELCOME_MAX} />
                </div>
            </Section>

            <Section title="Attention pop-ups">
                <SettingRow
                    label="Show attention pop-ups"
                    description="Nudges the visitor after a delay."
                >
                    <Switch
                        checked={state.showPopups}
                        onCheckedChange={(v) => update("showPopups", v)}
                        label="Show attention pop-ups"
                    />
                </SettingRow>

                {state.showPopups && (
                    <Field
                        label="Delay"
                        htmlFor="popup-delay"
                        hint="Seconds before the pop-up appears."
                        className="animate-slide-up"
                    >
                        <Input
                            id="popup-delay"
                            type="number"
                            min={1}
                            max={60}
                            value={state.delaySeconds}
                            onChange={(e) => update("delaySeconds", e.target.value)}
                            className="w-28"
                        />
                    </Field>
                )}
            </Section>

            <Section
                title="Predefined questions"
                description="Suggested prompts shown when the chat opens."
                action={
                    <Button variant="outline" size="sm" onClick={addQuestion} type="button">
                        <Plus className="h-3.5 w-3.5" />
                        Add
                    </Button>
                }
            >
                {state.questions.length === 0 ? (
                    <p className="rounded-field border border-dashed border-ink-300 px-4 py-6 text-center text-sm text-ink-500">
                        No suggested questions yet.
                    </p>
                ) : (
                    <ul className="space-y-3">
                        {state.questions.map((question, index) => (
                            <li key={question.id} className="flex items-start gap-2">
                                <span
                                    className="mt-2.5 cursor-grab text-ink-300"
                                    aria-hidden="true"
                                >
                                    <GripVertical className="h-5 w-5" />
                                </span>
                                <div className="flex-1">
                                    <Input
                                        value={question.text}
                                        onChange={(e) =>
                                            updateQuestion(question.id, e.target.value)
                                        }
                                        maxLength={QUESTION_MAX}
                                        placeholder={`Question ${index + 1}`}
                                        aria-label={`Predefined question ${index + 1}`}
                                    />
                                    <CharCount
                                        value={question.text.length}
                                        max={QUESTION_MAX}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => deleteQuestion(question.id)}
                                    aria-label={`Delete question ${index + 1}`}
                                    className="mt-1.5 rounded-md p-2 text-ink-400 transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </Section>

            <Section title="Input placeholder">
                <Field label="Placeholder text" htmlFor="input-placeholder">
                    <Input
                        id="input-placeholder"
                        value={state.inputPlaceholder}
                        onChange={(e) => update("inputPlaceholder", e.target.value)}
                        placeholder="Type your message..."
                    />
                </Field>
            </Section>

            <Section title="Colors">
                <div className="space-y-3 rounded-field border border-border bg-ink-50/60 p-4">
                    <ColorField
                        label="Theme color"
                        value={state.themeColor}
                        onChange={(v) => update("themeColor", v)}
                    />
                    <ColorField
                        label="Header font color"
                        value={state.headerFontColor}
                        onChange={(v) => update("headerFontColor", v)}
                    />
                    <ColorField
                        label="Button hover color"
                        value={state.buttonHoverColor}
                        onChange={(v) => update("buttonHoverColor", v)}
                    />
                </div>
            </Section>

            <Section title="Widget">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Position" htmlFor="widget-position">
                        <Select
                            id="widget-position"
                            value={state.widgetPosition}
                            onChange={(e) => update("widgetPosition", e.target.value)}
                        >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </Select>
                    </Field>

                    <Field label="Size" htmlFor="widget-size">
                        <Select
                            id="widget-size"
                            value={state.widgetSize}
                            onChange={(e) => update("widgetSize", e.target.value)}
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </Select>
                    </Field>

                    <Field label="Corner radius" htmlFor="widget-radius" hint="In pixels.">
                        <Input
                            id="widget-radius"
                            type="number"
                            min={0}
                            max={50}
                            value={state.widgetBorderRadius}
                            onChange={(e) => update("widgetBorderRadius", e.target.value)}
                        />
                    </Field>
                </div>

                <SettingRow
                    label="Enable pulsing"
                    description="Animates the bubble to draw attention."
                >
                    <Switch
                        checked={state.enablePulsing}
                        onCheckedChange={(v) => update("enablePulsing", v)}
                        label="Enable pulsing"
                    />
                </SettingRow>
            </Section>

            <Section title="Widget icon">
                <div className="rounded-card border-2 border-dashed border-ink-300 bg-ink-50/50 p-6 text-center transition-colors hover:border-brand-400">
                    <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <Upload className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-medium text-foreground">Upload a custom icon</p>
                    <p className="mt-1 text-xs text-ink-500">PNG, JPG or SVG up to 2 MB</p>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => document.getElementById("widget-icon-upload")?.click()}
                    >
                        Select icon
                    </Button>
                    <input
                        id="widget-icon-upload"
                        type="file"
                        className="sr-only"
                        accept="image/png,image/jpeg,image/svg+xml"
                    />
                </div>
            </Section>

            <Section title="Branding">
                <SettingRow
                    label='Remove "Powered by Ultimo Bots"'
                    description="Available on paid plans."
                >
                    <Switch
                        checked={state.removeBranding}
                        onCheckedChange={(v) => update("removeBranding", v)}
                        label="Remove Ultimo Bots branding"
                    />
                </SettingRow>
            </Section>

            <SaveBar onSave={onSave} saved={saved} />
        </div>
    );
}
