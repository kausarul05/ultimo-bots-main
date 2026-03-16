"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Eye, Camera, Plus, Trash2, GripVertical, Upload, Mail, Phone, User, Bell, Shield, Globe, FileText, HelpCircle, Database, Link as LinkIcon, Search, RefreshCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TabType = "Design" | "Lead Generation" | "Knowledge Base" | "Behavior" | "Business Context";

interface Question {
    id: number;
    text: string;
    charCount: number;
}

interface WebsiteLink {
    id: number;
    url: string;
    selected: boolean;
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>("Design");
    const [selectedBot, setSelectedBot] = useState("Test");
    const [headerText, setHeaderText] = useState("Chat with us");
    const [inputPlaceholder, setInputPlaceholder] = useState("Type your message...");
    const [themeColor, setThemeColor] = useState("#5e1bff");
    const [headerFontColor, setHeaderFontColor] = useState("#1d1d1f");
    const [buttonHoverColor, setButtonHoverColor] = useState("#4510b0");
    const [removeBranding, setRemoveBranding] = useState(false);
    const [widgetPosition, setWidgetPosition] = useState("right");
    const [enablePulsing, setEnablePulsing] = useState(true);
    const [widgetSize, setWidgetSize] = useState("medium");
    const [widgetBorderRadius, setWidgetBorderRadius] = useState("12");
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Web Arts Factory—how can I help you with frontend development or React/Next.js today?");
    const [showPopups, setShowPopups] = useState(true);
    const [delaySeconds, setDelaySeconds] = useState("5");
    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, text: "What is your career objective?", charCount: 30 },
        { id: 2, text: "What frontend skills do you have?", charCount: 33 }
    ]);

    // Lead Generation State
    const [autoLeadCapture, setAutoLeadCapture] = useState(true);
    const [collectEmail, setCollectEmail] = useState(true);
    const [collectPhone, setCollectPhone] = useState(false);
    const [collectName, setCollectName] = useState(true);
    const [notificationEmail, setNotificationEmail] = useState("kauserulislam0055@gmail.com");
    const [enforceUserDetails, setEnforceUserDetails] = useState(false);

    // Knowledge Base State
    const [autoRescraping, setAutoRescraping] = useState(false);
    const [websiteLinks, setWebsiteLinks] = useState<WebsiteLink[]>([
        { id: 1, url: "https://example.com", selected: false },
        { id: 2, url: "https://test.com", selected: true },
        { id: 3, url: "https://demo.com", selected: false },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSource, setSelectedSource] = useState("Website Links");
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    // Business Context State - MOVED TO TOP LEVEL
    const [businessContext, setBusinessContext] = useState(
        "MD. Kausarul Islam is a freelance/frontend React developer offering web application development using React, Next.js, TypeScript, and Tailwind CSS. He serves businesses or teams needing responsive, SEO-optimized, and high-performance frontends. His differentiators include 3 years of hands-on React experience, MERN stack training, and focus on clean, maintainable code and seamless UX."
    );
    const maxChars = 1000;

    // Behavior State - MOVED TO TOP LEVEL
    const [behaviors, setBehaviors] = useState([
        { id: 1, text: "bfd", selected: false }
    ]);

    const tabs: TabType[] = ["Design", "Lead Generation", "Knowledge Base", "Behavior", "Business Context"];
    const sources = ["Website Links", "Documents", "Q&A", "Google Drive", "OneDrive"];

    const addNewQuestion = () => {
        const newId = questions.length + 1;
        setQuestions([...questions, { id: newId, text: "", charCount: 0 }]);
    };

    const updateQuestion = (id: number, newText: string) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, text: newText, charCount: newText.length } : q
        ));
    };

    const deleteQuestion = (id: number) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const addNewBehavior = () => {
        const newId = behaviors.length + 1;
        setBehaviors([...behaviors, { id: newId, text: "", selected: false }]);
    };

    const handleSave = () => {
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Design":
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
                        {/* Header Text Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Header Text</h2>
                            <div>
                                <label className="block text-sm font-medium text-[#666666] mb-2">
                                    Edit Header Text
                                </label>
                                <Input
                                    type="text"
                                    value={headerText}
                                    onChange={(e) => setHeaderText(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                    placeholder="Chat with us"
                                />
                            </div>
                        </div>

                        {/* Welcome Messages Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Welcome Messages</h2>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-[#666666]">
                                    Welcome Message 1
                                </label>
                                <textarea
                                    value={welcomeMessage}
                                    onChange={(e) => setWelcomeMessage(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] resize-none"
                                    placeholder="Welcome message..."
                                    maxLength={300}
                                />
                                <div className="text-right text-sm text-[#999999]">
                                    {welcomeMessage.length}/300
                                </div>
                            </div>
                        </div>

                        {/* Show attention pop-ups Section */}
                        <div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-lg font-semibold text-[#5616ea]">
                                        Show attention pop-ups
                                    </label>
                                    <button
                                        onClick={() => setShowPopups(!showPopups)}
                                        className={cn(
                                            "relative w-12 h-6 rounded-full transition-colors",
                                            showPopups ? "bg-[#5e1bff]" : "bg-gray-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                            showPopups ? "right-1" : "left-1"
                                        )} />
                                    </button>
                                </div>

                                {showPopups && (
                                    <div>
                                        <label className="block text-sm font-medium text-[#666666] mb-2">
                                            Delay in seconds
                                        </label>
                                        <Input
                                            type="number"
                                            value={delaySeconds}
                                            onChange={(e) => setDelaySeconds(e.target.value)}
                                            className="w-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                            min="1"
                                            max="60"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Predefined Questions Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Predefined Questions</h2>
                            <div className="space-y-6">
                                {questions.map((question) => (
                                    <div key={question.id}>
                                        <label className="block text-sm font-medium text-[#666666] mb-2">
                                            Question {question.id}
                                        </label>
                                        <div className="flex items-start gap-2">
                                            <GripVertical className="h-5 w-5 text-[#999999] cursor-move mt-3 flex-shrink-0" />
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    value={question.text}
                                                    onChange={(e) => updateQuestion(question.id, e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] mb-1"
                                                    placeholder={`Question ${question.id}`}
                                                    maxLength={40}
                                                />
                                                <div className="text-right text-sm text-[#999999]">
                                                    {question.charCount}/40
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteQuestion(question.id)}
                                                className="text-[#999999] hover:text-red-500 transition-colors mt-3 flex-shrink-0"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addNewQuestion}
                                    className="flex items-center gap-2 text-[#5e1bff] hover:text-[#4510b0] transition-colors mt-4"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm font-medium">Add Question</span>
                                </button>
                            </div>
                        </div>

                        {/* Input Placeholder Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Input Placeholder</h2>
                            <div>
                                <label className="block text-sm font-medium text-[#666666] mb-2">
                                    Edit Input Placeholder
                                </label>
                                <Input
                                    type="text"
                                    value={inputPlaceholder}
                                    onChange={(e) => setInputPlaceholder(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                    placeholder="Type your message..."
                                />
                            </div>
                        </div>

                        {/* Colors Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Colors</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm text-[#666666]">Theme Color:</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm text-[#666666]">Header Font Color:</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={headerFontColor}
                                            onChange={(e) => setHeaderFontColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={headerFontColor}
                                            onChange={(e) => setHeaderFontColor(e.target.value)}
                                            className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm text-[#666666]">Button Hover Color:</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={buttonHoverColor}
                                            onChange={(e) => setButtonHoverColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={buttonHoverColor}
                                            onChange={(e) => setButtonHoverColor(e.target.value)}
                                            className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Branding Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Branding</h2>
                            <div className="flex items-center justify-between">
                                <label className="text-sm text-[#666666]">
                                    Remove "Powered by Ultimo Bots"
                                </label>
                                <button
                                    onClick={() => setRemoveBranding(!removeBranding)}
                                    className={cn(
                                        "relative w-12 h-6 rounded-full transition-colors",
                                        removeBranding ? "bg-[#5e1bff]" : "bg-gray-300"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                        removeBranding ? "right-1" : "left-1"
                                    )} />
                                </button>
                            </div>
                        </div>

                        {/* Widget Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Widget</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm text-[#666666]">Widget Position</span>
                                    <select
                                        value={widgetPosition}
                                        onChange={(e) => setWidgetPosition(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] bg-white"
                                    >
                                        <option value="left">Left</option>
                                        <option value="right">Right</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#666666]">Enable Pulsing</span>
                                    <button
                                        onClick={() => setEnablePulsing(!enablePulsing)}
                                        className={cn(
                                            "relative w-12 h-6 rounded-full transition-colors",
                                            enablePulsing ? "bg-[#5e1bff]" : "bg-gray-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                            enablePulsing ? "right-1" : "left-1"
                                        )} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm text-[#666666]">Widget Size</span>
                                    <select
                                        value={widgetSize}
                                        onChange={(e) => setWidgetSize(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] bg-white"
                                    >
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="w-32 text-sm text-[#666666]">Widget Border Radius</span>
                                    <Input
                                        type="number"
                                        value={widgetBorderRadius}
                                        onChange={(e) => setWidgetBorderRadius(e.target.value)}
                                        className="w-24 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                        min="0"
                                        max="50"
                                    />
                                    <span className="text-sm text-[#666666]">px</span>
                                </div>
                            </div>
                        </div>

                        {/* Upload Widget Icon */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Upload Widget Icon</h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#5e1bff] transition-colors">
                                <Upload className="h-8 w-8 text-[#666666] mx-auto mb-3" />
                                <p className="text-sm text-[#666666] mb-2">Drag & drop or click to upload</p>
                                <p className="text-xs text-[#999999] mb-4">PNG, JPG, SVG up to 2MB</p>
                                <Button
                                    variant="outline"
                                    className="bg-white border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white"
                                    onClick={() => document.getElementById('widget-icon-upload')?.click()}
                                >
                                    Select Icon
                                </Button>
                                <input
                                    id="widget-icon-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/png,image/jpeg,image/svg+xml"
                                />
                            </div>
                        </div>

                        {/* Save Button for Design Tab */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-6 py-2"
                                >
                                    Save Changes
                                </Button>
                                {showSaveSuccess && (
                                    <span className="text-sm text-green-600">Settings saved successfully!</span>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case "Lead Generation":
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
                        {/* Lead Parameters Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Lead Parameters</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                                    <Mail className="h-5 w-5 text-[#5e1bff] mt-0.5" />
                                    <div>
                                        <p className="font-medium text-[#1d1d1f]">email</p>
                                        <p className="text-sm text-[#666666]">Email - The email address of the user.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                                    <Phone className="h-5 w-5 text-[#5e1bff] mt-0.5" />
                                    <div>
                                        <p className="font-medium text-[#1d1d1f]">phone_number</p>
                                        <p className="text-sm text-[#666666]">Phone Number - The phone_number of the user.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                                    <User className="h-5 w-5 text-[#5e1bff] mt-0.5" />
                                    <div>
                                        <p className="font-medium text-[#1d1d1f]">name</p>
                                        <p className="text-sm text-[#666666]">Name - The full name of the user.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Automatic Lead Capture Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-[#5616ea]">Automatic Lead Capture</h2>
                                <button
                                    onClick={() => setAutoLeadCapture(!autoLeadCapture)}
                                    className={cn(
                                        "relative w-12 h-6 rounded-full transition-colors",
                                        autoLeadCapture ? "bg-[#5e1bff]" : "bg-gray-300"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                        autoLeadCapture ? "right-1" : "left-1"
                                    )} />
                                </button>
                            </div>

                            {autoLeadCapture && (
                                <div className="mt-4 space-y-3">
                                    <p className="text-sm font-medium text-[#666666] mb-2">Select which parameters your chatbot should collect:</p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={collectEmail}
                                                onChange={(e) => setCollectEmail(e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Email</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={collectPhone}
                                                onChange={(e) => setCollectPhone(e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Phone Number</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={collectName}
                                                onChange={(e) => setCollectName(e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                            />
                                            <span className="text-sm text-[#1d1d1f]">Name</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Notification Receiver Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Notification Receiver</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Bell className="h-4 w-4 text-[#5e1bff]" />
                                    <span className="text-sm font-medium text-[#666666]">Email 1</span>
                                </div>
                                <Input
                                    type="email"
                                    value={notificationEmail}
                                    onChange={(e) => setNotificationEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                    placeholder="Enter notification email"
                                />
                            </div>
                        </div>

                        {/* Enforce User Details Section */}
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-[#5e1bff]" />
                                    <h2 className="text-lg font-semibold text-[#5616ea]">Enforce User Details</h2>
                                </div>
                                <button
                                    onClick={() => setEnforceUserDetails(!enforceUserDetails)}
                                    className={cn(
                                        "relative w-12 h-6 rounded-full transition-colors",
                                        enforceUserDetails ? "bg-[#5e1bff]" : "bg-gray-300"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                        enforceUserDetails ? "right-1" : "left-1"
                                    )} />
                                </button>
                            </div>
                            {enforceUserDetails && (
                                <p className="text-sm text-[#666666] mt-2">
                                    Require user details to enable chat
                                </p>
                            )}
                        </div>

                        {/* Save Button for Lead Generation Tab */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-6 py-2"
                                >
                                    Save Changes
                                </Button>
                                {showSaveSuccess && (
                                    <span className="text-sm text-green-600">Settings saved successfully!</span>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case "Knowledge Base":
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
                        {/* Knowledge Base Description */}
                        <div className="bg-[#f3efff] rounded-lg p-4 border border-[#5e1bff]/20">
                            <p className="text-sm text-[#666666] leading-relaxed">
                                Your AI Chatbot is using this Knowledge Base. Here you can:
                            </p>
                            <ul className="mt-2 space-y-1 text-sm text-[#666666] list-disc list-inside">
                                <li>Activate automatic rescraping to refresh content from website links automatically</li>
                                <li>Add and remove <span className="font-medium">website links, documents, Q&As, and Google Drive files</span></li>
                                <li>Press the <span className="font-medium text-[#5e1bff]">C</span> rescue button manually if your content has changed</li>
                                <li>View <span className="font-medium text-[#5e1bff]">O</span> the raw data your bot actually received</li>
                            </ul>
                        </div>

                        {/* Source Tabs */}
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                {sources.map((source) => (
                                    <button
                                        key={source}
                                        onClick={() => setSelectedSource(source)}
                                        className={cn(
                                            "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                                            selectedSource === source
                                                ? "bg-[#5e1bff] text-white"
                                                : "text-[#666666] hover:text-[#1d1d1f] hover:bg-gray-100"
                                        )}
                                    >
                                        {source}
                                    </button>
                                ))}
                            </div>

                            {/* Add Links Button */}
                            <div className="flex items-center justify-between mb-4">
                                <Button
                                    variant="outline"
                                    className="bg-white border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Links
                                </Button>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#666666]">Activate automatic rescraping</span>
                                    <button
                                        onClick={() => setAutoRescraping(!autoRescraping)}
                                        className={cn(
                                            "relative w-12 h-6 rounded-full transition-colors",
                                            autoRescraping ? "bg-[#5e1bff]" : "bg-gray-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                            autoRescraping ? "right-1" : "left-1"
                                        )} />
                                    </button>
                                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#5e1bff] text-white rounded-full ml-1">
                                        NEW
                                    </span>
                                </div>
                            </div>

                            {/* Website Links Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#5616ea] mb-4">Website Links</h3>

                                {/* Search Bar */}
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                                    <Input
                                        type="text"
                                        placeholder="search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                    />
                                </div>

                                {/* Links List */}
                                <div className="space-y-2">
                                    {websiteLinks.map((link) => (
                                        <div
                                            key={link.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={link.selected}
                                                    onChange={() => {
                                                        setWebsiteLinks(links =>
                                                            links.map(l =>
                                                                l.id === link.id ? { ...l, selected: !l.selected } : l
                                                            )
                                                        );
                                                    }}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                                />
                                                <Globe className="h-4 w-4 text-[#5e1bff]" />
                                                <span className="text-sm text-[#1d1d1f]">{link.url}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-[#999999]">O</span>
                                                <button className="text-[#5e1bff] hover:text-[#4510b0] text-sm font-medium">
                                                    C
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Selected Info */}
                                <div className="mt-4 flex items-center justify-between text-sm text-[#666666]">
                                    <span>O Selected</span>
                                    <span>{websiteLinks.filter(l => l.selected).length} selected</span>
                                </div>
                            </div>
                        </div>

                        {/* Save Button for Knowledge Base Tab */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-6 py-2"
                                >
                                    Save Changes
                                </Button>
                                {showSaveSuccess && (
                                    <span className="text-sm text-green-600">Settings saved successfully!</span>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case "Behavior":
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
                        {/* Description */}
                        <div className="bg-[#f3efff] rounded-lg p-4 border border-[#5e1bff]/20">
                            <p className="text-sm text-[#666666] leading-relaxed">
                                Use this section to adjust your AI Chatbot's tone and behavior by providing it with natural language instructions. Here are some examples:
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-[#666666]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#5e1bff] mt-1">•</span>
                                    <span>End every conversation by asking if there's anything else you can help with.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#5e1bff] mt-1">•</span>
                                    <span>When a customer asks about pricing, always suggest booking a free consultation call.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#5e1bff] mt-1">•</span>
                                    <span>Never mention competitor products or services, even if the customer asks about them.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Note */}
                        <div className="text-sm text-[#666666] bg-gray-50 p-3 rounded-lg">
                            <span className="font-medium">Note:</span> Each behavior is limited to 250 characters. For anything longer, break your guidance into multiple, focused behaviors.
                        </div>

                        {/* Add Behaviors Button and Counter */}
                        <div className="flex items-center justify-between">
                            <Button
                                onClick={addNewBehavior}
                                className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-4 py-2"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Behaviors
                            </Button>
                            <span className="text-sm text-[#666666]">{behaviors.length} / 10 used</span>
                        </div>

                        {/* Select All */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="selectAll"
                                checked={behaviors.every(b => b.selected)}
                                onChange={(e) => {
                                    setBehaviors(behaviors.map(b => ({ ...b, selected: e.target.checked })));
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                            />
                            <label htmlFor="selectAll" className="text-sm text-[#666666]">
                                Select All
                            </label>
                        </div>

                        {/* Behavior List */}
                        <div className="space-y-3">
                            {behaviors.map((behavior) => (
                                <div key={behavior.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={behavior.selected}
                                        onChange={(e) => {
                                            setBehaviors(behaviors.map(b =>
                                                b.id === behavior.id ? { ...b, selected: e.target.checked } : b
                                            ));
                                        }}
                                        className="w-4 h-4 rounded border-gray-300 text-[#5e1bff] focus:ring-[#5e1bff]"
                                    />
                                    <span className="text-sm text-[#1d1d1f]">Behavior: {behavior.text || "new behavior"}</span>
                                </div>
                            ))}

                            {/* Placeholder for more behaviors */}
                            {behaviors.length === 0 && (
                                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                                    <p className="text-sm text-[#999999]">No behaviors added yet</p>
                                    <Button
                                        variant="ghost"
                                        onClick={addNewBehavior}
                                        className="mt-2 text-[#5e1bff] hover:text-[#4510b0]"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add New Behavior
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-6 py-2"
                                >
                                    Save Changes
                                </Button>
                                {showSaveSuccess && (
                                    <span className="text-sm text-green-600">Settings saved successfully!</span>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case "Business Context":
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
                        {/* Description */}
                        <div className="bg-[#f3efff] rounded-lg p-4 border border-[#5e1bff]/20">
                            <p className="text-sm text-[#666666] leading-relaxed">
                                The business context provides your AI Chatbot with essential information about your company to improve response accuracy. This summary is automatically generated from your knowledge base but can be customized here.
                            </p>
                            <p className="text-sm text-[#666666] mt-3">
                                <span className="font-medium">Include:</span> What your business does, who you serve, and key value propositions. Keep it concise and factual (max 1000 characters).
                            </p>
                        </div>

                        {/* Business Context Textarea */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#5616ea] mb-4">Business Context</h2>
                            <textarea
                                value={businessContext}
                                onChange={(e) => setBusinessContext(e.target.value)}
                                rows={8}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] resize-none"
                                placeholder="Enter your business context..."
                                maxLength={maxChars}
                            />
                            <div className="text-right text-sm text-[#999999] mt-2">
                                {businessContext.length}/{maxChars}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-6 py-2"
                                >
                                    Save
                                </Button>
                                {showSaveSuccess && (
                                    <span className="text-sm text-green-600">Settings saved successfully!</span>
                                )}
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <p className="text-[#666666]">Coming soon...</p>
                        {/* Save Button for other tabs */}
                        <div className="pt-4 border-t border-gray-200 mt-4">
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={handleSave}
                                    className="bg-[#5e1bff] hover:bg-[#4510b0] text-white px-6 py-2"
                                >
                                    Save Changes
                                </Button>
                                {showSaveSuccess && (
                                    <span className="text-sm text-green-600">Settings saved successfully!</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="px-8 py-8">
            <div className="">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-4 px-1 text-sm font-medium transition-colors relative",
                                    activeTab === tab
                                        ? "text-[#5e1bff] border-b-2 border-[#5e1bff]"
                                        : "text-[#666666] hover:text-[#1d1d1f]"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
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

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Settings Form */}
                    <div>
                        {renderTabContent()}
                    </div>

                    {/* Right Column - Preview - Only show for Design tab */}
                    {activeTab === "Design" && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-8">
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Preview</h2>

                            {/* Screenshot Section */}
                            <div className="mb-6">
                                <Button
                                    variant="outline"
                                    className="w-full bg-white border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white mb-4"
                                >
                                    <Camera className="h-4 w-4 mr-2" />
                                    TAKE NEW SCREENSHOT
                                </Button>

                                <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-8 text-center">
                                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <Camera className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-sm text-[#999999] mb-2">No screenshot yet</p>
                                    <Button
                                        variant="ghost"
                                        className="text-[#5e1bff] hover:text-[#4510b0] hover:bg-transparent"
                                    >
                                        TAKE SCREENSHOT
                                    </Button>
                                </div>
                            </div>

                            {/* Chat Preview */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: themeColor }} />
                                    <div>
                                        <h3 className="font-semibold text-[#1d1d1f]" style={{ color: headerFontColor }}>Ultimo Bots</h3>
                                        <p className="text-xs text-[#666666]">{headerText}</p>
                                    </div>
                                </div>

                                {/* Welcome Message Bubble */}
                                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 mb-3 max-w-[80%]">
                                    <p className="text-sm text-[#1d1d1f]">{welcomeMessage}</p>
                                </div>

                                {/* Input Placeholder Preview */}
                                <div className="border border-gray-200 rounded-lg p-3 mb-3 text-[#999999] text-sm">
                                    {inputPlaceholder}
                                </div>

                                {/* Predefined Questions */}
                                {questions.map((question) => (
                                    question.text && (
                                        <div key={question.id} className="border border-gray-200 rounded-lg p-3 mb-2 hover:border-[#5e1bff] cursor-pointer transition-colors">
                                            <p className="text-sm text-[#1d1d1f]">{question.text}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}