"use client";

// app/dashboard/page.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  Bell,
  Calendar,
  AlertTriangle,
  ChevronRight,
  CreditCard,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";

// ─── Dados mock (substituir por dados reais via TanStack Query) ──

const chartData = [
  { mes: "Jul", receita: 6200, despesas: 4100, recorrentes: 1820 },
  { mes: "Ago", receita: 6200, despesas: 4800, recorrentes: 2100 },
  { mes: "Set", receita: 7100, despesas: 4200, recorrentes: 1950 },
  { mes: "Out", receita: 6200, despesas: 5100, recorrentes: 2300 },
  { mes: "Nov", receita: 6800, despesas: 4600, recorrentes: 1870 },
  { mes: "Dez", receita: 6200, despesas: 3900, recorrentes: 1820 },
];

const upcomingRecurrences = [
  { id: "1", name: "Netflix", amount: 55.90, daysUntil: 2, category: "Streaming", color: "#ef4444" },
  { id: "2", name: "Spotify", amount: 21.90, daysUntil: 4, category: "Música", color: "#10b981" },
  { id: "3", name: "Adobe CC", amount: 256.00, daysUntil: 7, category: "Software", color: "#f97316" },
  { id: "4", name: "iCloud+", amount: 9.90, daysUntil: 9, category: "Armazenamento", color: "#3b82f6" },
];

const recentAlerts = [
  {
    id: "1",
    type: "upcoming_charge" as const,
    title: "Netflix vence em 2 dias",
    message: "Cobrança de R$55,90 prevista para dia 15",
    time: "Agora",
    urgent: true,
  },
  {
    id: "2",
    type: "new_subscription_detected" as const,
    title: "Nova assinatura detectada",
    message: "ChatGPT Plus — R$103,55/mês identificado",
    time: "2h atrás",
    urgent: false,
  },
  {
    id: "3",
    type: "savings_tip" as const,
    title: "Dica de economia",
    message: "Você não usa o Duolingo há 47 dias. Cancele e economize R$35,90/mês",
    time: "1d atrás",
    urgent: false,
  },
];

// ─── Custom Tooltip ────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-800 border border-white/10 rounded-xl p-3 shadow-glass">
      <p className="text-xs text-surface-400 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-surface-300">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Componentes de card ──────────────────────────────────────

function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  accent = false,
  delay = 0,
}: {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  accent?: boolean;
  delay?: number;
}) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl p-5 border",
        accent
          ? "bg-brand-500/10 border-brand-500/20"
          : "bg-surface-900 border-white/5"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-surface-400">{title}</p>
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", accent ? "bg-brand-500/20" : "bg-surface-800")}>
          <Icon className={cn("w-4 h-4", accent ? "text-brand-400" : "text-surface-400")} />
        </div>
      </div>
      <p className={cn("font-display text-3xl font-bold mb-2", accent && "text-brand-400")}>
        {value}
      </p>
      <div className="flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp className="w-3 h-3 text-brand-400" />
        ) : (
          <TrendingDown className="w-3 h-3 text-accent-400" />
        )}
        <span className={cn("text-xs font-medium", isPositive ? "text-brand-400" : "text-accent-400")}>
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-surface-500">{changeLabel}</span>
      </div>
    </motion.div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState<"3m" | "6m" | "1a">("6m");
  const today = new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">
            Bom dia 👋
          </h1>
          <p className="text-surface-400 text-sm mt-0.5">
            {format(today, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
        <button className="flex items-center gap-2 text-xs text-surface-400 hover:text-white px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-all">
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:block">Sincronizar</span>
        </button>
      </div>

      {/* ── Alerta de urgência ─── */}
      {recentAlerts.some(a => a.urgent) && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-accent-500/10 border border-accent-500/20"
        >
          <AlertTriangle className="w-5 h-5 text-accent-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-accent-300">Netflix vence em 2 dias</p>
            <p className="text-xs text-accent-400/70 truncate">Cobrança de R$55,90 prevista para dia 15/01</p>
          </div>
          <Link href="/dashboard/alertas" className="text-xs text-accent-400 font-medium flex-shrink-0">
            Ver →
          </Link>
        </motion.div>
      )}

      {/* ── Stats cards ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Recorrentes/mês"
          value="R$847,90"
          change={-12}
          changeLabel="vs mês passado"
          icon={RefreshCw}
          accent
          delay={0}
        />
        <StatCard
          title="Assinaturas ativas"
          value="14"
          change={0}
          changeLabel="este mês"
          icon={CreditCard}
          delay={0.06}
        />
        <StatCard
          title="Próximo venc."
          value="2 dias"
          change={0}
          changeLabel="Netflix"
          icon={Calendar}
          delay={0.12}
        />
        <StatCard
          title="Economia potencial"
          value="R$127"
          change={5}
          changeLabel="identificado"
          icon={Sparkles}
          delay={0.18}
        />
      </div>

      {/* ── Gráfico de gastos ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface-900 border border-white/5 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-semibold">Evolução de gastos</h2>
            <p className="text-xs text-surface-500 mt-0.5">Receitas vs despesas vs recorrentes</p>
          </div>
          <div className="flex gap-1">
            {(["3m", "6m", "1a"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={cn(
                  "text-xs px-2.5 py-1.5 rounded-lg transition-all",
                  timeframe === t
                    ? "bg-brand-500/20 text-brand-400"
                    : "text-surface-500 hover:text-surface-300"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDespesas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gRecorrentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={2} fill="url(#gReceita)" />
              <Area type="monotone" dataKey="despesas" stroke="#f97316" strokeWidth={2} fill="url(#gDespesas)" />
              <Area type="monotone" dataKey="recorrentes" stroke="#3b82f6" strokeWidth={2} fill="url(#gRecorrentes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda */}
        <div className="flex gap-5 mt-3">
          {[
            { color: "#10b981", label: "Receitas" },
            { color: "#f97316", label: "Despesas" },
            { color: "#3b82f6", label: "Recorrentes" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-xs text-surface-500">{l.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Grid: próximos vencimentos + alertas ─── */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Próximos vencimentos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="bg-surface-900 border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold">Próximos vencimentos</h2>
            <Link href="/dashboard/recorrentes" className="text-xs text-brand-400 flex items-center gap-1 hover:gap-2 transition-all">
              Ver todos <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {upcomingRecurrences.map((r) => {
              const dueDate = addDays(today, r.daysUntil);
              const isUrgent = r.daysUntil <= 3;

              return (
                <div
                  key={r.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl transition-colors",
                    isUrgent ? "bg-accent-500/5 border border-accent-500/10" : "bg-surface-800/50 hover:bg-surface-800"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: r.color + "33", color: r.color }}
                    >
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-surface-500">
                        {format(dueDate, "dd/MM")} •{" "}
                        <span className={isUrgent ? "text-accent-400" : "text-surface-500"}>
                          {r.daysUntil === 0 ? "Hoje" : r.daysUntil === 1 ? "Amanhã" : `${r.daysUntil} dias`}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className={cn("text-sm font-semibold", isUrgent && "text-accent-400")}>
                    {formatCurrency(r.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Alertas recentes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="bg-surface-900 border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold">Alertas</h2>
            <Link href="/dashboard/alertas" className="text-xs text-brand-400 flex items-center gap-1 hover:gap-2 transition-all">
              Ver todos <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface-800/50 hover:bg-surface-800 transition-colors cursor-pointer"
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                  alert.urgent ? "bg-accent-500/20" : "bg-brand-500/10"
                )}>
                  <Bell className={cn("w-4 h-4", alert.urgent ? "text-accent-400" : "text-brand-400")} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{alert.title}</p>
                  <p className="text-xs text-surface-500 mt-0.5 line-clamp-2">{alert.message}</p>
                </div>
                <span className="text-xs text-surface-600 flex-shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Banner IA ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-r from-brand-500/10 via-brand-500/5 to-transparent border border-brand-500/20 rounded-2xl p-5 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">Análise IA disponível</p>
            <p className="text-xs text-surface-400 mt-0.5">
              Detectamos 3 novas assinaturas em seu extrato. Clique para revisar.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/recorrentes?aba=detectadas"
          className="flex items-center gap-1.5 text-xs font-medium text-brand-400 bg-brand-500/10 px-4 py-2 rounded-lg flex-shrink-0 hover:bg-brand-500/20 transition-colors"
        >
          Revisar <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </div>
  );
}