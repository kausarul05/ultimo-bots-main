import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/use-auth";
import { SidebarProvider } from "@/components/layout/sidebar-context";
import { RootShell } from "@/components/layout/root-shell";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
});

// The layout is a server component again now that the pathname-dependent chrome
// lives in <RootShell />, which means the app can ship real metadata.
export const metadata: Metadata = {
    title: {
        default: "Ultimo Bots — AI chatbots for your website",
        template: "%s · Ultimo Bots",
    },
    description:
        "Build AI chatbots that automate support, capture qualified leads and answer your customers 24/7.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className={`${inter.className} antialiased`}>
                <AuthProvider>
                    <SidebarProvider>
                        <RootShell>{children}</RootShell>
                    </SidebarProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
