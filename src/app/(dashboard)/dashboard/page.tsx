"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        const isAuth = localStorage.getItem("isAuthenticated");
        if (!isAuth) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fbfaff] to-[#ffffff]">
            {/* Dashboard Header */}
            <header className="bg-white border-b border-gray-200 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-[#0A0A0A] rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-lg">U</span>
                        </div>
                        <span className="font-semibold text-[#1d1d1f]">Ultimo Bots Dashboard</span>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-[#5e1bff] text-[#5e1bff] hover:bg-[#5e1bff] hover:text-white"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-[#1d1d1f] mb-4">Welcome to your Dashboard</h1>
                <p className="text-[#666666] mb-8">You have successfully logged in!</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats Cards */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-semibold text-[#1d1d1f] mb-2">Active Bots</h3>
                        <p className="text-3xl font-bold text-[#5e1bff]">3</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-semibold text-[#1d1d1f] mb-2">Total Conversations</h3>
                        <p className="text-3xl font-bold text-[#5e1bff]">1,234</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-semibold text-[#1d1d1f] mb-2">Leads Generated</h3>
                        <p className="text-3xl font-bold text-[#5e1bff]">567</p>
                    </div>
                </div>
            </main>
        </div>
    );
}