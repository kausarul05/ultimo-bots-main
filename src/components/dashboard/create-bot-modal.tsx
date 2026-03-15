"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload, File, Trash2 } from "lucide-react";
import { useState } from "react";

interface CreateBotModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateBot: (botData: any) => void;
}

export function CreateBotModal({ isOpen, onClose, onCreateBot }: CreateBotModalProps) {
    const [botName, setBotName] = useState("Test");
    const [websiteUrl, setWebsiteUrl] = useState("Test.com");
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFile, setUploadedFile] = useState("CV-Kausarul Islam.pdf (0.17 MB)");

    if (!isOpen) return null;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const handleSubmit = () => {
        onCreateBot({
            name: botName,
            website: websiteUrl,
            files: files
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#1d1d1f]">Create New Bot</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-[#666666]" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Bot Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                            Name your Bot <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            <div className="text-xs text-[#666666]">Name <span className="text-red-500">*</span></div>
                            <Input
                                type="text"
                                value={botName}
                                onChange={(e) => setBotName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                placeholder="Enter bot name"
                            />
                        </div>
                    </div>

                    {/* Website URL */}
                    <div>
                        <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                            Website URL <span className="text-[#666666] font-normal">(optional)</span>
                        </label>
                        <div className="space-y-2">
                            <div className="text-xs text-[#666666]">Website</div>
                            <Input
                                type="url"
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e1bff]"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
                            Upload documents <span className="text-[#666666] font-normal">(optional)</span>
                        </label>
                        
                        {/* Drop Zone */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#5e1bff] transition-colors">
                            <Upload className="h-8 w-8 text-[#666666] mx-auto mb-3" />
                            <p className="text-sm text-[#666666] mb-2">Drag & Drop Files here</p>
                            <p className="text-xs text-[#999999] mb-4">.pdf .txt .doc .docx .rtf</p>
                            <Button
                                variant="outline"
                                className="border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white"
                                onClick={() => document.getElementById('file-upload')?.click()}
                            >
                                Select Files
                            </Button>
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileUpload}
                                accept=".pdf,.txt,.doc,.docx,.rtf"
                            />
                        </div>

                        {/* Uploaded File */}
                        <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                                <File className="h-4 w-4 text-[#5e1bff]" />
                                <span className="text-sm text-[#1d1d1f]">{uploadedFile}</span>
                            </div>
                            <button className="text-[#666666] hover:text-red-500 transition-colors">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-6 py-2 border-gray-300 text-[#666666] hover:bg-gray-50"
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-[#4510b0] to-[#5e1bff] hover:from-[#5e1bff] hover:to-[#4510b0] text-white px-6 py-2"
                    >
                        CREATE BOT
                    </Button>
                </div>
            </div>
        </div>
    );
}