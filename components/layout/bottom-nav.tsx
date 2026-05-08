"use client";

// components/layout/bottom-nav.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  RefreshCw,
  Bell,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Início", icon: LayoutDashboard },
  { href: "/dashboard/recorrentes", label: "Assinaturas", icon: RefreshCw },
  { href: "/dashboard/alertas", label: "Alertas", icon: Bell },
  { href: "/dashboard/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/dashboard/configuracoes", label: "Config.", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="bg-surface-900/95 backdrop-blur-md border-t border-white/5 flex items-stretch">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors min-h-[60px]",
                active ? "text-brand-400" : "text-surface-500 hover:text-surface-300"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]")} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-brand-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}