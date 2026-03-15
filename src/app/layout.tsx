"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/sidebar';
import { AuthProvider } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    // Check if current path is an auth page
    const authPaths = ['/login', '/signup', '/forgot-password', '/reset-password'];
    setIsAuthPage(authPaths.some(path => pathname?.includes(path)));
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex">
            {/* Only show sidebar on non-auth pages */}
            {!isAuthPage && <Sidebar />}
            <main className={cn(
              "flex-1 min-h-screen transition-all duration-300",
              !isAuthPage ? "lg:ml-64" : "ml-0"
            )}>
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}