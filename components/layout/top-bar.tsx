"use client";

// components/layout/top-bar.tsx
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/recorrentes": "Recorrentes",
  "/dashboard/alertas": "Alertas",
  "/dashboard/relatorios": "Relatórios",
  "/dashboard/importar": "Importar Extrato",
  "/dashboard/configuracoes": "Configurações",
};

export function TopBar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Bolix";

  return (
    <header className="h-16 border-b border-white/5 bg-surface-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-6 gap-4">
      {/* Título da página (mobile mostra logo, desktop mostra título) */}
      <h1 className="font-display font-semibold text-lg flex-1">{title}</h1>

      {/* Ações */}
      <div className="flex items-center gap-2">
        {/* Search — apenas desktop */}
        <button className="hidden md:flex items-center gap-2 text-surface-500 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition-all">
          <Search className="w-3.5 h-3.5" />
          <span>Buscar...</span>
          <kbd className="text-[10px] bg-surface-800 px-1.5 py-0.5 rounded text-surface-600">⌘K</kbd>
        </button>

        {/* Alertas */}
        <Link
          href="/dashboard/alertas"
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-surface-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Bell className="w-4 h-4" />
          {/* Badge de não lidos */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full" />
        </Link>

        {/* Avatar Clerk */}
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonTrigger: "rounded-xl",
            },
          }}
        />
      </div>
    </header>
  );
}