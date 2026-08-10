import { AppShell } from "@/components/layout/app-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Page padding lives here so every dashboard route shares one content gutter
  // instead of each page repeating px-8 py-8 with its own variations.
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </div>
    </AppShell>
  );
}
