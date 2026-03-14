import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ultimo Bots - AI Chatbot for Your Website',
  description: 'Add a custom AI chatbot to your website in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-white">
          <Sidebar />
          <main className={cn(
            "flex-1 transition-all duration-300",
            "ml-64" // This will be dynamic if you want
          )}>
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}