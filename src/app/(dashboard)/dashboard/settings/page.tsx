"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Eye, Camera, Plus, Trash2, GripVertical, Upload } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TabType = "Design" | "Lead Generation" | "Knowledge Base" | "Behavior" | "Business Context";

interface Question {
    id: number;
    text: string;
    charCount: number;
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

    const tabs: TabType[] = ["Design", "Lead Generation", "Knowledge Base", "Behavior", "Business Context"];

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

    const renderTabContent = () => {
        switch (activeTab) {
            case "Design":
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8">
                        {/* Header Text Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Header Text</h2>
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
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Welcome Messages</h2>
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
                                    <label className="text-lg font-semibold text-[#1d1d1f]">
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
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Predefined Questions</h2>
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
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Input Placeholder</h2>
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
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Colors</h2>
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
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Branding</h2>
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
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Widget</h2>
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
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Upload Widget Icon</h2>
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
                    </div>
                );

            // ... other tabs remain the same
            default:
                return null;
        }
    };

    return (
        <div className="px-8 py-8">
            <div className="">
                {/* Header */}
                {/* <h1 className="text-3xl font-bold text-[#1d1d1f] mb-8">Settings</h1> */}

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

                    {/* Right Column - Preview */}
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
                </div>
            </div>
        </div>
    );
}