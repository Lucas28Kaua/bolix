// app/dashboard/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Sidebar — visível apenas no desktop */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 overflow-auto pb-24 md:pb-6">
          <div className="container max-w-5xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation — visível apenas no mobile */}
      <BottomNav />
    </div>
  );
}