"use client";

// components/layout/sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  RefreshCw,
  Bell,
  BarChart3,
  Settings,
  Zap,
  TrendingDown,
  Upload,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/recorrentes", label: "Recorrentes", icon: RefreshCw },
  { href: "/dashboard/alertas", label: "Alertas", icon: Bell, badge: 3 },
  { href: "/dashboard/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/dashboard/importar", label: "Importar", icon: Upload },
  { href: "/dashboard/configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 flex-col bg-surface-900 border-r border-white/5 min-h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-lg">Bolix</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-brand-500/10 text-brand-400 border border-brand-500/10"
                  : "text-surface-400 hover:text-white hover:bg-white/4"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[10px] bg-accent-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade banner */}
      <div className="p-3">
        <div className="bg-gradient-to-br from-brand-500/15 to-brand-500/5 border border-brand-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-semibold">Upgrade Pro</span>
          </div>
          <p className="text-xs text-surface-400 mb-3">
            Desbloqueie detecção IA ilimitada e conexão automática com seu banco.
          </p>
          <Link
            href="/dashboard/upgrade"
            className="block text-center text-xs font-semibold py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-white transition-colors"
          >
            Ver planos
          </Link>
        </div>
      </div>
    </aside>
  );
}