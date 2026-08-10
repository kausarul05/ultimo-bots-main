"use client";

import { useState } from "react";
import {
    BarChart3,
    Clock,
    Globe,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    Plus,
    TrendingUp,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, type TabItem } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

type AnalyticsTab = "insights" | "chats" | "leads" | "reporting";

const tabs: TabItem<AnalyticsTab>[] = [
    { value: "insights", label: "Insights", badge: "New" },
    { value: "chats", label: "Chats" },
    { value: "leads", label: "Leads" },
    { value: "reporting", label: "Reporting" },
];

const stats = [
    { label: "Number of chats", value: "0", icon: MessageSquare },
    { label: "Messages / chat", value: "0.0", icon: TrendingUp },
    { label: "Total messages", value: "0", icon: BarChart3 },
    { label: "Bot response time", value: "0.0s", icon: Clock },
];

const platforms = ["Website", "Chat link", "Facebook", "Instagram"];

const locationData = [
    { country: "United States", sessions: 0 },
    { country: "United Kingdom", sessions: 0 },
    { country: "Germany", sessions: 0 },
];

const WEEKDAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
] as const;

type Weekday = (typeof WEEKDAYS)[number];

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState<AnalyticsTab>("insights");
    const [selectedBot, setSelectedBot] = useState("Test");
    const [startDate, setStartDate] = useState("2026-03-02");
    const [endDate, setEndDate] = useState("2026-03-16");
    const [selectedPlatform, setSelectedPlatform] = useState("Website");

    const [reportingEnabled, setReportingEnabled] = useState(true);
    const [notificationEmail, setNotificationEmail] = useState("");
    const [selectedDays, setSelectedDays] = useState<Record<Weekday, boolean>>({
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });
    const [includeChatHistory, setIncludeChatHistory] = useState(false);

    const toggleDay = (day: Weekday) =>
        setSelectedDays((prev) => ({ ...prev, [day]: !prev[day] }));

    return (
        <div className="space-y-6">
            <PageHeader
                title="Analytics"
                description="Chat volume, captured leads and where your visitors are coming from."
            />

            <Tabs
                tabs={tabs}
                value={activeTab}
                onChange={setActiveTab}
                aria-label="Analytics sections"
            />

            {/* Filters — shared by every tab except reporting. */}
            {activeTab !== "reporting" && (
                <Card>
                    <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:flex-wrap sm:items-end">
                        <Field label="Bot" htmlFor="bot-select" className="w-full sm:w-56">
                            <Select
                                id="bot-select"
                                value={selectedBot}
                                onChange={(e) => setSelectedBot(e.target.value)}
                            >
                                <option value="Test">Test</option>
                            </Select>
                        </Field>

                        <Field label="Start date" htmlFor="start-date" className="w-full sm:w-44">
                            <Input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Field>

                        <Field label="End date" htmlFor="end-date" className="w-full sm:w-44">
                            <Input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Field>

                        <p className="pb-3 text-xs text-ink-500 sm:ml-auto">
                            1 bot selected (max. 5)
                        </p>
                    </CardContent>
                </Card>
            )}

            {activeTab === "insights" && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>User locations</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <EmptyState
                                    variant="panel"
                                    icon={MapPin}
                                    title="No location data yet"
                                    description="Once visitors start chatting, the map will show where they are connecting from."
                                    className="h-full min-h-[18rem]"
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-ink-600">
                                        Countries
                                    </h3>
                                    <ul className="divide-y divide-border rounded-field border border-border">
                                        {locationData.map((location) => (
                                            <li
                                                key={location.country}
                                                className="flex items-center justify-between px-3 py-2.5 text-sm"
                                            >
                                                <span className="text-ink-600">
                                                    {location.country}
                                                </span>
                                                <span className="tabular-nums text-ink-400">
                                                    {location.sessions}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <p className="flex items-center gap-2 text-xs text-ink-500">
                                    <Globe className="h-3.5 w-3.5" />0 of 0 sessions located
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Chat activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <EmptyState
                                    variant="panel"
                                    icon={BarChart3}
                                    title="Nothing to chart yet"
                                    description="Chat volume over time appears here once your bot receives its first conversation."
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Lead generation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <EmptyState
                                    variant="panel"
                                    icon={Users}
                                    title="No leads captured yet"
                                    description="Turn on lead capture in settings to start collecting contact details."
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === "chats" && (
                <Card>
                    <CardContent className="p-5 sm:p-6">
                        <div className="mb-6 flex flex-wrap items-center gap-2">
                            {platforms.map((platform) => (
                                <button
                                    key={platform}
                                    type="button"
                                    onClick={() => setSelectedPlatform(platform)}
                                    aria-pressed={selectedPlatform === platform}
                                    className={cn(
                                        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                                        selectedPlatform === platform
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-foreground"
                                    )}
                                >
                                    {platform}
                                </button>
                            ))}
                        </div>

                        <EmptyState
                            icon={MessageCircle}
                            title="No chat history available"
                            description={`Nothing recorded for ${selectedBot} on ${selectedPlatform} in this date range. Try a different bot or widen the dates.`}
                        />
                    </CardContent>
                </Card>
            )}

            {activeTab === "leads" && (
                <Card>
                    <CardContent className="p-5 sm:p-6">
                        <EmptyState
                            icon={Users}
                            title="No leads yet"
                            description="Leads appear here once your bot starts capturing names, emails or phone numbers."
                        />
                    </CardContent>
                </Card>
            )}

            {activeTab === "reporting" && (
                <Card>
                    <CardContent className="space-y-6 p-5 sm:p-6">
                        <p className="text-sm leading-relaxed text-ink-500">
                            Enable automated activity reports for your chatbot. Pick the weekdays
                            to receive email summaries, and optionally attach the full chat history
                            as a spreadsheet.
                        </p>

                        <div className="flex items-center justify-between gap-6 rounded-field border border-border bg-ink-50/60 px-4 py-3">
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium text-foreground">
                                    Activate reporting
                                </p>
                                <p className="text-xs text-ink-500">
                                    Send a recurring summary to your inbox.
                                </p>
                            </div>
                            <Switch
                                checked={reportingEnabled}
                                onCheckedChange={setReportingEnabled}
                                label="Activate reporting"
                            />
                        </div>

                        {reportingEnabled && (
                            <div className="animate-slide-up space-y-6">
                                <Field
                                    label="Notification receiver"
                                    htmlFor="report-email"
                                    hint="Where the summary is delivered."
                                >
                                    <div className="flex gap-2">
                                        <Input
                                            id="report-email"
                                            type="email"
                                            value={notificationEmail}
                                            onChange={(e) => setNotificationEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            leadingIcon={<Mail />}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            aria-label="Add another recipient"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </Field>

                                <fieldset>
                                    <legend className="mb-3 text-sm font-medium text-ink-700">
                                        Schedule
                                    </legend>
                                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                                        {WEEKDAYS.map((day) => (
                                            <Checkbox
                                                key={day}
                                                checked={selectedDays[day]}
                                                onCheckedChange={() => toggleDay(day)}
                                                label={
                                                    <span className="capitalize">{day}</span>
                                                }
                                            />
                                        ))}
                                    </div>
                                </fieldset>

                                <Checkbox
                                    checked={includeChatHistory}
                                    onCheckedChange={setIncludeChatHistory}
                                    label="Include chat history"
                                    description="Attaches the full transcript as an Excel file."
                                />
                            </div>
                        )}

                        <div className="border-t border-border pt-5">
                            <Button variant="primary">Save reporting settings</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
