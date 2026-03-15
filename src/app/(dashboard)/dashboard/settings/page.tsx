"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Eye, Camera, Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [selectedBot, setSelectedBot] = useState("Test");
    const [headerText, setHeaderText] = useState("Chat with us");
    const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Web Arts Factory—how can I help you with frontend development or React/Next.js today?");
    const [showPopups, setShowPopups] = useState(true);
    const [questions, setQuestions] = useState([
        { id: 1, text: "What is your career objective?" }
    ]);

    return (
        <div className="px-8 py-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-[#1d1d1f] mb-8">Settings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Settings Form */}
                    <div className="space-y-6">
                        {/* Select Bot */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Design</h2>
                            <div>
                                <label className="block text-sm font-medium text-[#666666] mb-2">
                                    Select Bot
                                </label>
                                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white hover:border-[#5e1bff] transition-colors">
                                    <span className="text-[#1d1d1f]">{selectedBot}</span>
                                    <ChevronDown className="h-4 w-4 text-[#666666]" />
                                </button>
                            </div>
                        </div>

                        {/* Header Text */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Header Text</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#666666] mb-2">
                                        Edit Header Text
                                    </label>
                                    <Input
                                        type="text"
                                        value={headerText}
                                        onChange={(e) => setHeaderText(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Welcome Messages */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Welcome Messages</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#666666] mb-2">
                                        Welcome Message 1
                                    </label>
                                    <textarea
                                        value={welcomeMessage}
                                        onChange={(e) => setWelcomeMessage(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff] resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Show attention pop-ups */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-[#666666]">
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
                        </div>

                        {/* Predefined Questions */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Predefined Questions</h2>
                            <div className="space-y-4">
                                {questions.map((question) => (
                                    <div key={question.id}>
                                        <label className="block text-sm font-medium text-[#666666] mb-2">
                                            Question {question.id}
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <GripVertical className="h-5 w-5 text-[#999999] cursor-move" />
                                            <Input
                                                type="text"
                                                value={question.text}
                                                onChange={(e) => {
                                                    const updated = questions.map(q =>
                                                        q.id === question.id ? { ...q, text: e.target.value } : q
                                                    );
                                                    setQuestions(updated);
                                                }}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                            />
                                            <button className="text-[#999999] hover:text-red-500 transition-colors">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button className="flex items-center gap-2 text-[#5e1bff] hover:text-[#4510b0] transition-colors mt-2">
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm font-medium">Add Question</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Preview */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-8">
                        <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Preview</h2>
                        
                        {/* Screenshot Section */}
                        <div className="mb-6">
                            <Button
                                variant="outline"
                                className="w-full border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white mb-4"
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
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4510b0] to-[#5e1bff] flex items-center justify-center text-white text-sm font-bold">
                                    UB
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1d1d1f]">Ultimo Bots</h3>
                                    <p className="text-xs text-[#666666]">{headerText}</p>
                                </div>
                            </div>

                            {/* Welcome Message Bubble */}
                            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 mb-3 max-w-[80%]">
                                <p className="text-sm text-[#1d1d1f]">{welcomeMessage}</p>
                            </div>

                            {/* Predefined Questions */}
                            {questions.map((question) => (
                                <div key={question.id} className="border border-gray-200 rounded-lg p-3 mb-2 hover:border-[#5e1bff] cursor-pointer transition-colors">
                                    <p className="text-sm text-[#1d1d1f]">{question.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}