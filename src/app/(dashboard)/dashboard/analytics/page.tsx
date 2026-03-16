"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Calendar, TrendingUp, MessageSquare, Clock, BarChart3, Globe, Plus, Minus, MapPin, MessageCircle, Users, Mail, Plus as PlusIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AnalyticsTab = "Insights" | "Chats" | "Leads" | "Reporting";

interface PlatformData {
    name: string;
    icon: string;
    hasData: boolean;
}

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState<AnalyticsTab>("Insights");
    const [selectedBot, setSelectedBot] = useState("Test");
    const [startDate, setStartDate] = useState("2026-03-02");
    const [endDate, setEndDate] = useState("2026-03-16");
    const [mapZoom, setMapZoom] = useState(2);
    const [selectedPlatform, setSelectedPlatform] = useState("Website");

    // Reporting Tab State
    const [reportingEnabled, setReportingEnabled] = useState(true);
    const [notificationEmail, setNotificationEmail] = useState("kauserulislam0055@gmail.com");
    const [selectedDays, setSelectedDays] = useState({
        monday: true,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });
    const [includeChatHistory, setIncludeChatHistory] = useState(false);

    const tabs: AnalyticsTab[] = ["Insights", "Chats", "Leads", "Reporting"];

    const stats = [
        { label: "Number of Chats", value: "0.0", icon: MessageSquare },
        { label: "Messages / Chat", value: "0.0", icon: TrendingUp },
        { label: "Total Messages", value: "0.0", icon: BarChart3 },
        { label: "Bot Response Time (secs)", value: "0.0", icon: Clock },
    ];

    const platforms = [
        { name: "Website", icon: "🌐" },
        { name: "Chat Link", icon: "🔗" },
        { name: "Facebook", icon: "f" },
        { name: "Instagram", icon: "📷" },
    ];

    // Sample location data
    const locationData = [
        { country: "United States", sessions: 0, lat: 37.0902, lng: -95.7129 },
        { country: "United Kingdom", sessions: 0, lat: 51.5074, lng: -0.1278 },
        { country: "Germany", sessions: 0, lat: 51.1657, lng: 10.4515 },
    ];

    // Sample chat data for the table
    const chatData = [
        { date: "2026-03-02", chats: 0, messages: 1 },
        { date: "2026-03-03", chats: 0, messages: 1 },
        { date: "2026-03-04", chats: 0, messages: 1 },
        { date: "2026-03-05", chats: 0, messages: 1 },
        { date: "2026-03-06", chats: 0, messages: 1 },
        { date: "2026-03-07", chats: 0, messages: 1 },
        { date: "2026-03-08", chats: 0, messages: 1 },
        { date: "2026-03-09", chats: 0, messages: 1 },
        { date: "2026-03-10", chats: 0, messages: 1 },
        { date: "2026-03-11", chats: 0, messages: 1 },
        { date: "2026-03-12", chats: 0, messages: 1 },
        { date: "2026-03-13", chats: 0, messages: 1 },
        { date: "2026-03-14", chats: 0, messages: 1 },
        { date: "2026-03-15", chats: 0, messages: 1 },
        { date: "2026-03-16", chats: 0, messages: 1 },
    ];

    const toggleDay = (day: keyof typeof selectedDays) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    return (
        <div className="px-8">
            <div className="">
                {/* Header with Tabs */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-lg transition-all relative",
                                    activeTab === tab
                                        ? "text-[#5e1bff] bg-[#f3efff]"
                                        : "text-[#666666] hover:text-[#1d1d1f] hover:bg-gray-100"
                                )}
                            >
                                {tab}
                                {tab === "Insights" && (
                                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-[#5e1bff] text-white rounded-full">
                                        NEW
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Select Bot Row */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[#666666] mb-2">
                        Select Bot
                    </label>
                    <button className="w-64 flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white hover:border-[#5e1bff] transition-colors">
                        <span className="text-[#1d1d1f]">{selectedBot}</span>
                        <ChevronDown className="h-4 w-4 text-[#666666]" />
                    </button>
                </div>

                {/* Date Range - Only show for non-Reporting tabs */}
                {activeTab !== "Reporting" && (
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#666666]">Start</span>
                            <div className="relative">
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666] pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#666666]">End</span>
                            <div className="relative">
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Bot Selection Info - Only show for non-Reporting tabs */}
                {activeTab !== "Reporting" && (
                    <div className="mb-8 text-sm text-[#666666]">
                        1 bot selected (Max. 5)
                    </div>
                )}

                {/* Stats Grid - Only show for Insights tab */}
                {activeTab === "Insights" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#5e1bff]/30"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4510b0]/10 to-[#5e1bff]/10 flex items-center justify-center">
                                            <Icon className="h-5 w-5 text-[#5e1bff]" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-[#1d1d1f] mb-1">{stat.value}</h3>
                                        <p className="text-sm text-[#666666]">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Tab Content */}
                {activeTab === "Insights" && (
                    <>
                        {/* User Locations Section with Map */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">User Locations</h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Map Container */}
                                <div className="lg:col-span-2">
                                    <div className="bg-[#f8f9fc] rounded-lg border border-gray-200 p-4 h-[400px] relative">
                                        {/* World Map - Using a simple SVG representation */}
                                        <svg className="w-full h-full" viewBox="0 0 1000 500">
                                            {/* World map outline - simplified */}
                                            <path 
                                                d="M200,150 L250,130 L300,140 L350,120 L400,130 L450,110 L500,120 L550,100 L600,110 L650,90 L700,100 L750,80 L800,90 L820,120 L800,150 L780,180 L750,170 L720,190 L690,180 L660,200 L630,190 L600,210 L570,200 L540,220 L510,210 L480,230 L450,220 L420,240 L390,230 L360,250 L330,240 L300,260 L270,250 L240,270 L210,260 L180,280 L150,270 L120,250 L150,220 L180,200 L200,150" 
                                                fill="none" 
                                                stroke="#5e1bff" 
                                                strokeWidth="1.5"
                                                strokeOpacity="0.3"
                                            />
                                            <path 
                                                d="M400,180 L420,175 L440,180 L430,200 L410,200 L400,180" 
                                                fill="#5e1bff" 
                                                fillOpacity="0.3" 
                                                stroke="#5e1bff" 
                                                strokeWidth="1"
                                            />
                                            {/* Location markers */}
                                            <circle cx="420" cy="190" r="4" fill="#5e1bff" />
                                            <circle cx="550" cy="150" r="4" fill="#5e1bff" />
                                            <circle cx="300" cy="220" r="4" fill="#5e1bff" />
                                        </svg>
                                        
                                        {/* Map Controls */}
                                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                                            <button 
                                                onClick={() => setMapZoom(mapZoom + 0.5)}
                                                className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                <Plus className="h-4 w-4 text-[#666666]" />
                                            </button>
                                            <button 
                                                onClick={() => setMapZoom(Math.max(1, mapZoom - 0.5))}
                                                className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                <Minus className="h-4 w-4 text-[#666666]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Stats */}
                                <div className="lg:col-span-1">
                                    <div className="mb-4">
                                        <h3 className="text-sm font-medium text-[#666666] mb-2">Countries</h3>
                                        <div className="bg-gray-50 rounded-lg p-8 text-center border border-dashed border-gray-300">
                                            <MapPin className="h-8 w-8 text-[#999999] mx-auto mb-2" />
                                            <p className="text-sm text-[#999999]">No location data available</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm">
                                        <Globe className="h-4 w-4 text-[#666666]" />
                                        <span className="text-[#999999]">0 of 0 sessions located</span>
                                    </div>

                                    {/* Location List */}
                                    <div className="mt-4 space-y-2">
                                        {locationData.map((location, index) => (
                                            <div key={index} className="flex items-center justify-between text-sm">
                                                <span className="text-[#666666]">{location.country}</span>
                                                <span className="text-[#999999]">{location.sessions} sessions</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Chat Activity</h3>
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    <p className="text-sm text-[#999999]">Chart will be displayed here</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Lead Generation</h3>
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    <p className="text-sm text-[#999999]">Chart will be displayed here</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "Chats" && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        {/* Platform Tabs */}
                        <div className="flex items-center gap-4 mb-6">
                            {platforms.map((platform) => (
                                <button
                                    key={platform.name}
                                    onClick={() => setSelectedPlatform(platform.name)}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2",
                                        selectedPlatform === platform.name
                                            ? "bg-[#5e1bff] text-white"
                                            : "bg-gray-100 text-[#666666] hover:bg-gray-200"
                                    )}
                                >
                                    <span>{platform.icon}</span>
                                    <span>{platform.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* No Data Message */}
                        <div className="text-center py-16">
                            <MessageCircle className="h-12 w-12 text-[#999999] mx-auto mb-4" />
                            <p className="text-[#666666] mb-2">No chat history available for the selected bot and platform.</p>
                            <p className="text-sm text-[#999999]">Try selecting a different bot or date range</p>
                        </div>
                    </div>
                )}

                {activeTab === "Leads" && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="text-center py-16">
                            <Users className="h-12 w-12 text-[#999999] mx-auto mb-4" />
                            <p className="text-[#666666] mb-2">No leads yet.</p>
                            <p className="text-sm text-[#999999]">Leads will appear here once your bot starts capturing them</p>
                        </div>
                    </div>
                )}

                {activeTab === "Reporting" && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        {/* Description */}
                        <p className="text-sm text-[#666666] mb-6 leading-relaxed">
                            Enable automated activity reports for your chatbot. Select the weekdays to receive email summaries and optionally include full chat history as an Excel attachment.
                        </p>

                        {/* Activate Reporting Toggle */}
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-sm font-medium text-[#1d1d1f]">Activate reporting</span>
                            <button
                                onClick={() => setReportingEnabled(!reportingEnabled)}
                                className={cn(
                                    "relative w-12 h-6 rounded-full transition-colors",
                                    reportingEnabled ? "bg-[#5e1bff]" : "bg-gray-300"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                    reportingEnabled ? "right-1" : "left-1"
                                )} />
                            </button>
                        </div>

                        {reportingEnabled && (
                            <>
                                {/* Notification Receiver */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-[#666666] mb-2">
                                        Notification Receiver
                                    </label>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-[#5e1bff]" />
                                            <span className="text-sm font-medium text-[#666666]">Email 1</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                type="email"
                                                value={notificationEmail}
                                                onChange={(e) => setNotificationEmail(e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                                placeholder="Enter email"
                                            />
                                            <Button
                                                variant="outline"
                                                className="bg-white border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white"
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Schedule */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-[#666666] mb-3">
                                        Schedule
                                    </label>
                                    <div className="grid grid-cols-4 gap-3">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.monday}
                                                onChange={() => toggleDay('monday')}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Monday</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.tuesday}
                                                onChange={() => toggleDay('tuesday')}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Tuesday</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.wednesday}
                                                onChange={() => toggleDay('wednesday')}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Wednesday</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.thursday}
                                                onChange={() => toggleDay('thursday')}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Thursday</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.friday}
                                                onChange={() => toggleDay('friday')}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Friday</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.saturday}
                                                onChange={() => toggleDay('saturday')}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Saturday</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.sunday}
                                                onChange={() => toggleDay('sunday')}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Sunday</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Include Chat History */}
                                <div className="flex items-center gap-2 mb-6">
                                    <input
                                        type="checkbox"
                                        id="includeChatHistory"
                                        checked={includeChatHistory}
                                        onChange={(e) => setIncludeChatHistory(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                    />
                                    <label htmlFor="includeChatHistory" className="text-sm text-[#666666]">
                                        Include chat history (Excel)
                                    </label>
                                </div>
                            </>
                        )}

                        {/* Save Button */}
                        <div className="pt-4 border-t border-gray-200">
                            <Button
                                className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-6 py-2"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}