"use client";

// components/landing/ProductDemo.tsx
// Seção "Do Caos ao Controle" — animação scroll-triggered premium

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  AlertTriangle,
  Wifi,
  Music,
  Tv,
  Dumbbell,
  BookOpen,
  Cloud,
  Gamepad2,
  TrendingUp,
  TrendingDown,
  Check,
  Zap,
  Brain,
  Sparkles,
  DollarSign,
  X,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
// ─── Tipos ───────────────────────────────────────────────────

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

// ─── Dados das etapas ─────────────────────────────────────────

const stages: Stage[] = [
  {
    id: 0,
    title: "Seu dinheiro, no caos",
    subtitle: "Você nem sabe o que está pagando",
    description:
      "Boletos atrasados, assinaturas esquecidas, saldo negativo. Essa é a realidade financeira da maioria dos brasileiros.",
  },
  {
    id: 1,
    title: "Conecte em segundos",
    subtitle: "Importe ou conecte seu banco",
    description:
      "Basta fazer upload do seu extrato em CSV ou conectar seu banco diretamente. Leva menos de 2 minutos.",
  },
  {
    id: 2,
    title: "IA analisando tudo",
    subtitle: "Tecnologia trabalhando por você",
    description:
      "Nossa IA varre cada transação identificando padrões, assinaturas ocultas e cobranças recorrentes invisíveis.",
  },
  {
    id: 3,
    title: "Caça-fantasmas ativado",
    subtitle: "Eliminando o que você não usa",
    description:
      "Assinaturas esquecidas detectadas e eliminadas. Cada cancelamento devolve dinheiro direto no seu bolso.",
  },
  {
    id: 4,
    title: "Tudo se organiza",
    subtitle: "Visibilidade financeira total",
    description:
      "Seu dashboard se transforma. Gráficos sobem, gastos caem, e você finalmente vê para onde seu dinheiro vai.",
  },
  {
    id: 5,
    title: "Você no controle",
    subtitle: "R$ 238,40 economizados este mês",
    description:
      "Saldo positivo, gastos organizados, alertas configurados. Bem-vindo à vida financeira que você merecia.",
  },
];

// ─── Componentes internos ─────────────────────────────────────

// Subscription ghost card
function GhostCard({
  icon: Icon,
  name,
  price,
  color,
  delay,
  isEliminating,
}: {
  icon: React.ElementType;
  name: string;
  price: string;
  color: string;
  delay: number;
  isEliminating: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -10 }}
      animate={
        isEliminating
          ? { opacity: 0, scale: 0, x: 40, filter: "blur(8px)" }
          : { opacity: 1, scale: 1, x: 0 }
      }
      transition={
        isEliminating
          ? { duration: 0.5, delay: delay * 0.15 }
          : { duration: 0.4, delay }
      }
      className="flex items-center gap-2 px-3 py-2 rounded-xl border"
      style={{
        background: `${color}11`,
        borderColor: `${color}33`,
      }}
    >
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}22` }}
      >
        <Icon className="w-3 h-3" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-white/80 truncate">{name}</p>
        <p className="text-[9px]" style={{ color }}>{price}</p>
      </div>
      {isEliminating && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0"
        >
          <X className="w-2.5 h-2.5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Partícula de dinheiro voando
function MoneyParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: x + 60, y: y - 20, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], x: 0, y: 0, scale: [0, 1, 1, 0] }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className="absolute pointer-events-none z-20 text-brand-400 font-bold text-xs"
      style={{ right: "10%", top: "40%" }}
    >
      +R$
    </motion.div>
  );
}

// Partículas verdes de fundo
function GreenParticles({ active }: { active: boolean }) {
  const particles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <AnimatePresence>
      {active &&
        particles.map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
            className="absolute w-1.5 h-1.5 rounded-full bg-brand-400 pointer-events-none"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
          />
        ))}
    </AnimatePresence>
  );
}

// Contador animado de valor
function AnimatedCounter({
  from,
  to,
  active,
  prefix = "R$ ",
}: {
  from: number;
  to: number;
  active: boolean;
  prefix?: string;
}) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!active) { setValue(from); return; }
    const duration = 2000;
    const steps = 60;
    const increment = (to - from) / steps;
    let current = from;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      setValue(Math.round(current * 100) / 100);
      if (step >= steps) { setValue(to); clearInterval(timer); }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [active, from, to]);

  const isNegative = value < 0;

  return (
    <span className={isNegative ? "text-red-400" : "text-brand-400"}>
      {isNegative ? "-" : "+"}{prefix}
      {Math.abs(value).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}

// Efeito de scan IA
function AIScan({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-10"
        >
          {/* Linha de scan */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: 3, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 z-20"
            style={{
              background: "linear-gradient(90deg, transparent, #10b981, transparent)",
              boxShadow: "0 0 20px rgba(16,185,129,0.8)",
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Tela do celular por stage ─────────────────────────────────

function PhoneScreen({ stage }: { stage: number }) {
  const subscriptions = [
    { icon: Tv, name: "Netflix", price: "R$55,90/mês", color: "#ef4444" },
    { icon: Music, name: "Spotify", price: "R$21,90/mês", color: "#10b981" },
    { icon: Dumbbell, name: "Academia", price: "R$89,90/mês", color: "#f97316" },
    { icon: BookOpen, name: "Kindle", price: "R$19,90/mês", color: "#3b82f6" },
    { icon: Cloud, name: "iCloud+", price: "R$9,90/mês", color: "#8b5cf6" },
    { icon: Gamepad2, name: "Xbox GP", price: "R$44,90/mês", color: "#22d3ee" },
  ];

  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-surface-950 flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
        <span className="text-[10px] text-white/50 font-medium">9:41</span>
        <div className="flex gap-1">
          <Wifi className="w-3 h-3 text-white/50" />
          <div className="w-4 h-2 rounded-sm border border-white/30 flex items-center px-0.5">
            <div className="h-full w-3/4 bg-brand-400 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Conteúdo scrollável */}
      <div className="flex-1 overflow-hidden px-3 pb-3 flex flex-col gap-2">

        {/* ── Stage 0: Caos ── */}
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="chaos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 h-full"
            >
              {/* Saldo negativo */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
                <p className="text-[9px] text-red-400/70 mb-0.5">Saldo atual</p>
                <p className="text-2xl font-bold text-red-400 font-mono">-R$1.247,33</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-red-400" />
                  <p className="text-[9px] text-red-400">↓ 34% esse mês</p>
                </div>
              </div>

              {/* Boletos atrasados */}
              {["Fatura Cartão — ATRASADO", "Conta de Luz — VENCE HOJE", "Boleto Gym — 3 dias"].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    animate={{ x: [0, -2, 2, 0] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 + i * 0.5 }}
                    className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-2.5 py-2"
                  >
                    <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span className="text-[9px] text-red-300 truncate">{item}</span>
                  </motion.div>
                )
              )}

              {/* Assinaturas fantasma */}
              <p className="text-[9px] text-white/30 mt-1">Assinaturas ativas</p>
              <div className="grid grid-cols-2 gap-1.5">
                {subscriptions.map((sub, i) => (
                  <GhostCard
                    key={sub.name}
                    {...sub}
                    delay={i * 0.08}
                    isEliminating={false}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Stage 1: Upload ── */}
          {stage === 1 && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 h-full justify-center items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                <Zap className="w-7 h-7 text-brand-400" />
              </div>
              <p className="text-xs font-semibold text-white">Importando extrato...</p>

              {/* Barra de progresso */}
              <div className="w-full bg-surface-800 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
                />
              </div>

              {/* Arquivos sendo lidos */}
              {["jan_2026.csv", "fev_2026.csv", "mar_2026.csv"].map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.4 }}
                  className="flex items-center gap-2 w-full bg-surface-800/50 rounded-lg px-3 py-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                    className="w-3 h-3 border border-brand-500 border-t-transparent rounded-full"
                  />
                  <span className="text-[9px] text-surface-400">{f}</span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.4 + 0.8 }}
                    className="ml-auto"
                  >
                    <Check className="w-3 h-3 text-brand-400" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── Stage 2: IA Scan ── */}
          {stage === 2 && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 h-full relative"
            >
              <AIScan active={true} />

              <div className="text-center py-2 relative z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20">
                  <Brain className="w-3 h-3 text-brand-400" />
                  <span className="text-[9px] text-brand-300 font-medium">IA analisando transações...</span>
                </div>
              </div>

              {/* Transações sendo analisadas */}
              <div className="flex flex-col gap-1 relative z-20">
                {[
                  { desc: "NETFLIX.COM *1234", val: "-55,90", flag: true },
                  { desc: "PIX RECEBIDO", val: "+1.200,00", flag: false },
                  { desc: "SPOTIFY AB", val: "-21,90", flag: true },
                  { desc: "SUPERMERCADO X", val: "-234,50", flag: false },
                  { desc: "AMAZON PRIME", val: "-14,90", flag: true },
                  { desc: "SALÁRIO", val: "+4.500,00", flag: false },
                ].map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-surface-800/60 border border-white/5"
                  >
                    <span className="text-[8px] text-surface-400 truncate max-w-[55%]">{tx.desc}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-mono font-bold ${tx.val.startsWith("+") ? "text-brand-400" : "text-red-400"}`}>
                        {tx.val}
                      </span>
                      {tx.flag && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.15 + 0.3 }}
                          className="w-3.5 h-3.5 rounded-full bg-brand-500/20 flex items-center justify-center"
                        >
                          <Sparkles className="w-2 h-2 text-brand-400" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contador de detectados */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="mt-auto text-center py-2 bg-brand-500/10 rounded-xl border border-brand-500/20 relative z-20"
              >
                <p className="text-[9px] text-brand-300">
                  <span className="text-base font-bold text-brand-400">11</span> recorrentes detectadas
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* ── Stage 3: Eliminando fantasmas ── */}
          {stage === 3 && (
            <motion.div
              key="eliminating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 h-full"
            >
              <div className="text-center py-1">
                <p className="text-[9px] text-accent-400 font-semibold">⚡ Cancelando não utilizadas...</p>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {subscriptions.map((sub, i) => (
                  <GhostCard
                    key={sub.name}
                    {...sub}
                    delay={i}
                    isEliminating={i >= 3}
                  />
                ))}
              </div>

              {/* Dinheiro voltando */}
              <div className="flex flex-col gap-1 mt-auto">
                {["Academia cancelada", "Xbox GP cancelado", "Kindle cancelado"].map(
                  (item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.3 }}
                      className="flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-lg px-2.5 py-1.5"
                    >
                      <Check className="w-3 h-3 text-brand-400" />
                      <span className="text-[9px] text-brand-300 flex-1">{item}</span>
                      <span className="text-[9px] font-bold text-brand-400">
                        +R${[89.90, 44.90, 19.90][i].toFixed(2).replace(".", ",")}
                      </span>
                    </motion.div>
                  )
                )}
              </div>

              {/* Partículas de dinheiro */}
              {[0, 0.3, 0.6].map((d, i) => (
                <MoneyParticle key={i} delay={d + 0.8} x={-20 + i * 10} y={-10 + i * 5} />
              ))}
            </motion.div>
          )}

          {/* ── Stage 4: Dashboard melhorando ── */}
          {stage === 4 && (
            <motion.div
              key="improving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 h-full"
            >
              {/* Cards se alinhando */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Recorrentes", val: "R$242,60", color: "#10b981", trend: "↓ 65%" },
                  { label: "Assinaturas", val: "3 ativas", color: "#3b82f6", trend: "↓ 8 canceladas" },
                ].map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="rounded-xl p-2.5 border"
                    style={{ background: `${card.color}11`, borderColor: `${card.color}33` }}
                  >
                    <p className="text-[8px] text-white/50 mb-0.5">{card.label}</p>
                    <p className="text-xs font-bold" style={{ color: card.color }}>{card.val}</p>
                    <p className="text-[8px]" style={{ color: card.color }}>{card.trend}</p>
                  </motion.div>
                ))}
              </div>

              {/* Gráfico subindo */}
              <div className="flex-1 bg-surface-800/50 rounded-xl p-2 border border-white/5">
                <p className="text-[8px] text-white/40 mb-2">Gastos mensais</p>
                <div className="flex items-end gap-1 h-14">
                  {[85, 90, 78, 95, 72, 45].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      className="flex-1 rounded-t-sm"
                      style={{
                        background: i === 5
                          ? "linear-gradient(to top, #10b981, #34d399)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {["A", "S", "O", "N", "D", "Jan"].map((m) => (
                    <span key={m} className="text-[7px] text-white/30">{m}</span>
                  ))}
                </div>
              </div>

              {/* Próximos alertas configurados */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-brand-500/10 rounded-xl p-2.5 border border-brand-500/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-brand-500/30 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold text-brand-300">3 alertas configurados</p>
                    <p className="text-[8px] text-brand-400/60">Netflix vence em 5 dias</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── Stage 5: Tela limpa ── */}
          {stage === 5 && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 h-full items-center justify-center"
            >
              <GreenParticles active={true} />

              {/* Saldo positivo com contador */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full bg-brand-500/10 border border-brand-500/30 rounded-2xl p-4 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent" />
                <p className="text-[9px] text-brand-400/70 mb-1 relative z-10">Saldo atual</p>
                <p className="text-3xl font-bold font-mono relative z-10">
                  <AnimatedCounter from={-1247.33} to={238.40} active={true} />
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 relative z-10">
                  <TrendingUp className="w-3 h-3 text-brand-400" />
                  <p className="text-[9px] text-brand-400">↑ Economia de R$238,40</p>
                </div>
              </motion.div>

              {/* Mensagem de sucesso */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center px-2"
              >
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-brand-400 text-sm"
                    >
                      ✦
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-bold text-white">Você economizou</p>
                <p className="text-lg font-bold text-brand-400">R$ 238,40 esse mês</p>
                <p className="text-[9px] text-surface-400 mt-1">
                  8 assinaturas canceladas · 3 alertas ativos
                </p>
              </motion.div>

              {/* Assinaturas restantes (só as úteis) */}
              <div className="w-full flex flex-col gap-1">
                {[
                  { icon: Tv, name: "Netflix", price: "R$55,90", color: "#ef4444" },
                  { icon: Music, name: "Spotify", price: "R$21,90", color: "#10b981" },
                  { icon: Cloud, name: "iCloud+", price: "R$9,90", color: "#8b5cf6" },
                ].map((sub, i) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-800/50"
                  >
                    <sub.icon className="w-3 h-3 flex-shrink-0" style={{ color: sub.color }} />
                    <span className="text-[9px] text-white/70 flex-1">{sub.name}</span>
                    <span className="text-[9px] font-bold text-white/60">{sub.price}</span>
                    <Check className="w-3 h-3 text-brand-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Mockup do celular ─────────────────────────────────────────

function PhoneMockup({ stage }: { stage: number }) {
  return (
    <div className="relative w-[220px] md:w-[260px] mx-auto select-none">
      {/* Glow de fundo */}
      <motion.div
        animate={{
          opacity: stage === 5 ? 0.6 : 0.2,
          scale: stage === 5 ? 1.1 : 1,
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 rounded-[3rem] blur-2xl pointer-events-none"
        style={{ background: stage === 5 ? "#10b981" : stage === 0 ? "#ef4444" : "#10b981" }}
      />

      {/* Frame do iPhone */}
      <div
        className="relative rounded-[2.8rem] border-[7px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]"
        style={{
          borderColor: "#1a1a2e",
          background: "#0a0a1a",
          aspectRatio: "9/19.5",
        }}
      >
        {/* Reflexo lateral */}
        <div
          className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-full opacity-20 pointer-events-none z-30"
          style={{ background: "linear-gradient(to bottom, transparent, white, transparent)" }}
        />

        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-surface-800 border border-white/10" />
          <div className="w-8 h-1 rounded-full bg-surface-800" />
        </div>

        {/* Tela */}
        <div className="absolute inset-0 pt-10">
          <PhoneScreen stage={stage} />
        </div>

        {/* Reflexo tela */}
        <div
          className="absolute inset-0 rounded-[2.2rem] pointer-events-none z-20 opacity-[0.04]"
          style={{
            background: "linear-gradient(135deg, white 0%, transparent 40%, transparent 60%, white 100%)",
          }}
        />
      </div>

      {/* Botões laterais */}
      <div className="absolute -right-[9px] top-[22%] w-[5px] h-12 bg-[#1a1a2e] rounded-r-sm" />
      <div className="absolute -left-[9px] top-[18%] w-[5px] h-8 bg-[#1a1a2e] rounded-l-sm" />
      <div className="absolute -left-[9px] top-[30%] w-[5px] h-8 bg-[#1a1a2e] rounded-l-sm" />
      <div className="absolute -left-[9px] top-[42%] w-[5px] h-8 bg-[#1a1a2e] rounded-l-sm" />
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────

export function ProductDemo() {
  const isMobile = useMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Deriva o stage (0–5) do progresso do scroll
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const stage = Math.min(5, Math.floor(v * 6));
      setCurrentStage(stage);
    });
  }, [scrollYProgress]);

  // Parallax leve no mockup
  const phoneY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -30]),
    { stiffness: 100, damping: 30 }
  );

  if (isMobile) return (
    <section className="py-16 px-4">
      <div className="text-center mb-10">
        <span className="text-brand-400 font-medium text-xs uppercase tracking-widest">
          Veja o Bolix em ação
        </span>
        <h2 className="font-display text-3xl font-bold mt-2">
          Do <span className="text-red-400">caos</span> ao{" "}
          <span className="text-gradient">controle</span>
        </h2>
      </div>
      <div className="flex flex-col gap-5 max-w-sm mx-auto">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="bg-surface-900 border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-400 text-xs font-bold">
                  0{stage.id + 1}
                </span>
              </div>
              <div>
                <p className="text-xs text-brand-400 font-medium">{stage.subtitle}</p>
                <h3 className="font-display font-bold text-sm">{stage.title}</h3>
              </div>
            </div>
            <p className="text-surface-400 text-sm leading-relaxed">{stage.description}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${stages.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-surface-950">
          <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          {/* Header da seção */}
          <div className="text-center mb-10 md:mb-0 md:absolute md:top-8 md:left-0 md:right-0">
            <span className="text-brand-400 font-medium text-xs uppercase tracking-widest">
              Veja o Bolix em ação
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-1">
              Do <span className="text-red-400">caos</span> ao{" "}
              <span className="text-gradient">controle</span>
            </h2>
          </div>

          {/* Layout principal: texto + phone */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 pt-0 md:pt-12">
            {/* Texto — muda por stage */}
            <div className="flex-1 md:text-left text-center order-2 md:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 md:justify-start justify-center">
                    {stages.map((s, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          width: i === currentStage ? 24 : 6,
                          background: i <= currentStage ? "#10b981" : "rgba(255,255,255,0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 rounded-full"
                      />
                    ))}
                  </div>

                  <div>
                    <p className="text-brand-400 text-sm font-medium mb-1">
                      {stages[currentStage].subtitle}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                      {stages[currentStage].title}
                    </h3>
                  </div>

                  <p className="text-surface-400 text-base leading-relaxed max-w-sm md:mx-0 mx-auto">
                    {stages[currentStage].description}
                  </p>

                  {currentStage === 0 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      R$1.247,33 negativos
                    </div>
                  )}
                  {currentStage === 2 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm">
                      <Brain className="w-4 h-4" />
                      11 recorrentes detectadas
                    </div>
                  )}
                  {currentStage === 3 && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm">
                      <DollarSign className="w-4 h-4" />
                      +R$154,70 recuperados
                    </div>
                  )}
                  {currentStage === 5 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-semibold shadow-glow"
                    >
                      <Sparkles className="w-4 h-4" />
                      R$238,40 economizados 🎉
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Phone mockup */}
            <motion.div
              style={{ y: phoneY }}
              className="order-1 md:order-2 flex-shrink-0"
            >
              <PhoneMockup stage={currentStage} />
            </motion.div>
          </div>

          {/* Instrução de scroll */}
          <AnimatePresence>
            {currentStage === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-8 left-0 right-0 flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center gap-1 text-surface-600 text-xs"
                >
                  <span>Role para ver a transformação</span>
                  <div className="w-5 h-8 rounded-full border border-surface-700 flex items-start justify-center pt-1.5">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1 h-2 rounded-full bg-surface-600"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}