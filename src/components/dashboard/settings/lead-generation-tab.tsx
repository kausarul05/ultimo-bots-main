"use client";

import { useState } from "react";
import { Mail, Phone, Shield, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Section, SettingRow } from "@/components/ui/card";
import { SaveBar } from "./save-bar";

const leadParameters = [
    { icon: Mail, key: "email", label: "Email", description: "The email address of the user." },
    {
        icon: Phone,
        key: "phone_number",
        label: "Phone number",
        description: "The phone number of the user.",
    },
    { icon: User, key: "name", label: "Name", description: "The full name of the user." },
];

export function LeadGenerationTab({
    onSave,
    saved,
}: {
    onSave: () => void;
    saved: boolean;
}) {
    const [autoLeadCapture, setAutoLeadCapture] = useState(true);
    const [collect, setCollect] = useState({ email: true, phone: false, name: true });
    const [notificationEmail, setNotificationEmail] = useState("");
    const [enforceUserDetails, setEnforceUserDetails] = useState(false);

    return (
        <div className="space-y-8 rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
            <Section
                title="Lead parameters"
                description="The fields your bot knows how to collect."
            >
                <ul className="divide-y divide-border rounded-field border border-border">
                    {leadParameters.map((param) => (
                        <li key={param.key} className="flex items-start gap-3 px-4 py-3">
                            <param.icon
                                className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                                aria-hidden="true"
                            />
                            <div className="min-w-0">
                                <p className="font-mono text-sm text-foreground">{param.key}</p>
                                <p className="text-xs text-ink-500">
                                    {param.label} — {param.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section title="Automatic lead capture">
                <SettingRow
                    label="Capture leads automatically"
                    description="The bot asks for details when the conversation suggests intent."
                >
                    <Switch
                        checked={autoLeadCapture}
                        onCheckedChange={setAutoLeadCapture}
                        label="Automatic lead capture"
                    />
                </SettingRow>

                {autoLeadCapture && (
                    <fieldset className="animate-slide-up">
                        <legend className="mb-2 text-sm text-ink-600">
                            Which details should the bot collect?
                        </legend>
                        <div className="space-y-0.5">
                            <Checkbox
                                checked={collect.email}
                                onCheckedChange={(v) => setCollect((p) => ({ ...p, email: v }))}
                                label="Email"
                            />
                            <Checkbox
                                checked={collect.phone}
                                onCheckedChange={(v) => setCollect((p) => ({ ...p, phone: v }))}
                                label="Phone number"
                            />
                            <Checkbox
                                checked={collect.name}
                                onCheckedChange={(v) => setCollect((p) => ({ ...p, name: v }))}
                                label="Name"
                            />
                        </div>
                    </fieldset>
                )}
            </Section>

            <Section title="Notification receiver">
                <Field
                    label="Email"
                    htmlFor="lead-email"
                    hint="Where new leads are sent as they arrive."
                >
                    <Input
                        id="lead-email"
                        type="email"
                        value={notificationEmail}
                        onChange={(e) => setNotificationEmail(e.target.value)}
                        placeholder="you@company.com"
                        leadingIcon={<Mail />}
                    />
                </Field>
            </Section>

            <Section title="Access control">
                <SettingRow
                    label="Enforce user details"
                    description="Requires visitors to identify themselves before chatting."
                >
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-brand-600" aria-hidden="true" />
                        <Switch
                            checked={enforceUserDetails}
                            onCheckedChange={setEnforceUserDetails}
                            label="Enforce user details"
                        />
                    </div>
                </SettingRow>
            </Section>

            <SaveBar onSave={onSave} saved={saved} />
        </div>
    );
}
