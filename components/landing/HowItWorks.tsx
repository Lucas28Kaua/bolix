"use client";

// components/landing/HowItWorks.tsx
// Seção "Como funciona" com animação sequencial scroll-triggered

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Upload,
  Brain,
  Bell,
  TrendingUp,
  Check,
  FileText,
  Wifi,
  Zap,
  Sparkles,
  ArrowRight,
  DollarSign,
  Shield,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// ─── Dados dos steps ──────────────────────────────────────────

const steps = [
  {
    num: "01",
    icon: Upload,
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    tag: "Importação",
    title: "Conecte em 2 minutos",
    subtitle: "Sem complicação, sem burocracia",
    description:
      "Faça upload do extrato CSV do seu banco ou conecte diretamente via Open Finance. Suportamos todos os bancos brasileiros.",
    bullets: [
      "Nubank, Itaú, Bradesco, BB, Caixa e mais",
      "CSV exportado direto do app do banco",
      "Conexão automática via Open Finance (Pro)",
    ],
    visual: <UploadVisual />,
  },
  {
    num: "02",
    icon: Brain,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
    tag: "Inteligência Artificial",
    title: "IA detecta tudo automaticamente",
    subtitle: "Tecnologia que trabalha enquanto você dorme",
    description:
      "Nosso modelo de IA analisa cada transação identificando padrões, nomes de merchants e frequências de cobrança.",
    bullets: [
      "Detecta mesmo quando o nome muda entre cobranças",
      "Classifica por categoria automaticamente",
      "Confiança de 94% na detecção",
    ],
    visual: <AIVisual />,
  },
  {
    num: "03",
    icon: Bell,
    color: "#f97316",
    glow: "rgba(249,115,22,0.3)",
    tag: "Alertas Inteligentes",
    title: "Alertas antes que seja tarde",
    subtitle: "Nunca mais pague multa por esquecimento",
    description:
      "Configure alertas personalizados por e-mail, push ou WhatsApp. Receba avisos dias antes de cada vencimento.",
    bullets: [
      "Notificação 1, 3 ou 7 dias antes",
      "Push, e-mail e WhatsApp (Pro)",
      "Resumo semanal dos seus gastos",
    ],
    visual: <AlertVisual />,
  },
  {
    num: "04",
    icon: TrendingUp,
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    tag: "Economia Real",
    title: "Veja e corte o que não usa",
    subtitle: "Dinheiro de volta no seu bolso todo mês",
    description:
      "Com visibilidade total, você identifica assinaturas esquecidas e cancela com um clique. Em média, R$187/mês economizados.",
    bullets: [
      "Link direto para cancelamento de cada serviço",
      "Histórico de economia acumulada",
      "Previsão de saldo com e sem os cortes",
    ],
    visual: <SavingsVisual />,
  },
];

// ─── Visuais de cada step ─────────────────────────────────────

function UploadVisual() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setProgress(0);
    setDone(false);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setDone(true);
            return 100;
          }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const banks = ["Nubank", "Itaú", "Bradesco", "Inter", "C6 Bank", "BB"];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Upload box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-2 border-dashed border-brand-500/30 rounded-2xl p-5 text-center bg-brand-500/5 relative overflow-hidden"
      >
        <motion.div
          animate={{ y: done ? -4 : [0, -6, 0] }}
          transition={{ duration: 1.5, repeat: done ? 0 : Infinity }}
          className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center mx-auto mb-3"
        >
          <FileText className="w-5 h-5 text-brand-400" />
        </motion.div>
        <p className="text-sm font-medium text-white mb-1">
          {done ? "extrato_jan2026.csv" : "Arraste seu extrato aqui"}
        </p>
        <p className="text-xs text-surface-500">
          {done ? "✓ Arquivo carregado" : "ou clique para selecionar"}
        </p>

        {/* Barra de progresso */}
        <div className="mt-3 bg-surface-800 rounded-full h-1 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
          />
        </div>
        {progress > 0 && progress < 100 && (
          <p className="text-[10px] text-brand-400 mt-1">{progress}% carregado...</p>
        )}
      </motion.div>

      {/* Bancos suportados */}
      <div>
        <p className="text-[10px] text-surface-500 mb-2 flex items-center gap-1">
          <Wifi className="w-3 h-3" /> Bancos suportados
        </p>
        <div className="flex flex-wrap gap-1.5">
          {banks.map((bank, i) => (
            <motion.span
              key={bank}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="text-[10px] px-2 py-1 rounded-lg bg-surface-800 border border-white/5 text-surface-400"
            >
              {bank}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Resultado */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-brand-500/10 border border-brand-500/20 rounded-xl p-3"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-brand-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-300">342 transações importadas</p>
              <p className="text-[10px] text-brand-400/60">Prontas para análise da IA</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AIVisual() {
  const transactions = [
    { desc: "NETFLIX.COM *BR", val: "-55,90", detected: true },
    { desc: "PIX RECEBIDO EMPRESA", val: "+4.500,00", detected: false },
    { desc: "SPOTIFY AB 123", val: "-21,90", detected: true },
    { desc: "AMAZON PRIME*BR", val: "-14,90", detected: true },
    { desc: "SUPERMERCADO X", val: "-187,30", detected: false },
    { desc: "ADOBE SYSTEMS", val: "-256,00", detected: true },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Header IA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-4 h-4 text-purple-400" />
        </motion.div>
        <span className="text-xs text-purple-300 font-medium">IA processando transações...</span>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="ml-auto flex gap-0.5"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-purple-400"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Transações sendo analisadas */}
      <div className="flex flex-col gap-1.5">
        {transactions.map((tx, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-800/60 border border-white/5"
          >
            <span className="text-[11px] text-surface-400 truncate max-w-[55%]">{tx.desc}</span>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono font-bold ${tx.val.startsWith("+") ? "text-brand-400" : "text-red-400"}`}>
                {tx.val}
              </span>
              {tx.detected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.12 + 0.3, type: "spring" }}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30"
                >
                  <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                  <span className="text-[8px] text-purple-300 font-medium">recorrente</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resultado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-3 gap-2 mt-1"
      >
        {[
          { val: "4", label: "detectadas", color: "#8b5cf6" },
          { val: "94%", label: "confiança", color: "#10b981" },
          { val: "R$348", label: "recorrente/mês", color: "#f97316" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center py-2 rounded-xl border"
            style={{ background: `${stat.color}11`, borderColor: `${stat.color}33` }}
          >
            <p className="text-sm font-bold" style={{ color: stat.color }}>{stat.val}</p>
            <p className="text-[9px] text-surface-500">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AlertVisual() {
  const notifications = [
    {
      icon: Bell,
      color: "#f97316",
      title: "Netflix vence amanhã",
      desc: "R$55,90 será cobrado dia 15/01",
      time: "Agora",
      urgent: true,
    },
    {
      icon: Zap,
      color: "#10b981",
      title: "Spotify vence em 3 dias",
      desc: "R$21,90 previsto para dia 17/01",
      time: "2h",
      urgent: false,
    },
    {
      icon: Shield,
      color: "#3b82f6",
      title: "Resumo semanal",
      desc: "Você gastou R$847 em recorrentes",
      time: "1d",
      urgent: false,
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Config de alertas */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] text-surface-500 font-medium uppercase tracking-wider">
          Configurar alertas
        </p>
        {[
          { label: "Avisar 3 dias antes", active: true },
          { label: "Push no celular", active: true },
          { label: "WhatsApp", active: false },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-surface-800/60 border border-white/5"
          >
            <span className="text-xs text-surface-300">{item.label}</span>
            <motion.div
              className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors ${item.active ? "bg-brand-500" : "bg-surface-700"}`}
            >
              <motion.div
                animate={{ x: item.active ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-3 h-3 rounded-full bg-white shadow-sm"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Notificações */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] text-surface-500 font-medium uppercase tracking-wider">
          Próximos alertas
        </p>
        {notifications.map((notif, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-start gap-3 p-3 rounded-xl border"
            style={{
              background: `${notif.color}09`,
              borderColor: `${notif.color}25`,
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${notif.color}20` }}
            >
              <notif.icon className="w-3.5 h-3.5" style={{ color: notif.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white/90">{notif.title}</p>
              <p className="text-[10px] text-surface-500 mt-0.5">{notif.desc}</p>
            </div>
            <span className="text-[10px] text-surface-600 flex-shrink-0">{notif.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SavingsVisual() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 187;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current += increment;
        setCount(Math.round(current));
        if (step >= steps) { setCount(target); clearInterval(interval); }
      }, duration / steps);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Economia principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-5 rounded-2xl bg-brand-500/10 border border-brand-500/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent" />
        <p className="text-[11px] text-brand-400/70 mb-1 relative z-10">Economia média por mês</p>
        <p className="font-display text-4xl font-bold text-brand-400 relative z-10">
          R$ {count.toLocaleString("pt-BR")},00
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2 relative z-10">
          <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-[11px] text-brand-300">por usuário Bolix</span>
        </div>
      </motion.div>

      {/* Assinaturas para cancelar */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] text-surface-500 font-medium uppercase tracking-wider">
          Identificadas para cancelar
        </p>
        {[
          { name: "Academia Smart Fit", price: "R$89,90", lastUse: "47 dias sem uso", color: "#f97316" },
          { name: "Xbox Game Pass", price: "R$44,90", lastUse: "2 meses sem uso", color: "#22d3ee" },
          { name: "Duolingo Plus", price: "R$35,90", lastUse: "3 meses sem uso", color: "#10b981" },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface-800/50 border border-white/5"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/80 truncate">{item.name}</p>
              <p className="text-[10px]" style={{ color: item.color }}>{item.lastUse}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-bold text-white/70">{item.price}</p>
              <button className="text-[9px] text-brand-400 flex items-center gap-0.5 ml-auto">
                Cancelar <ChevronRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20"
      >
        <DollarSign className="w-4 h-4 text-brand-400 flex-shrink-0" />
        <span className="text-xs text-brand-300">
          Cancele os 3 e economize <strong>R$170,70/mês</strong>
        </span>
      </motion.div>
    </div>
  );
}

// ─── Componente principal ──────────────────────────────────────

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const step = Math.min(steps.length - 1, Math.floor(v * steps.length));
      setCurrentStep(step);
    });
  }, [scrollYProgress]);

  const phoneY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -20]),
    { stiffness: 80, damping: 25 }
  );

  const step = steps[currentStep];

  return (
    <section
      ref={containerRef}
      id="how"
      style={{ height: `${steps.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-surface-900/40">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          {/* Glow colorido que muda por step */}
          <motion.div
            animate={{ background: `radial-gradient(ellipse at 60% 50%, ${step.glow} 0%, transparent 60%)` }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          />
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10 w-full">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <span className="text-brand-400 font-medium text-xs uppercase tracking-widest">
              Como funciona
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">
              Simples como deveria ser
            </h2>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <motion.div
                  animate={{
                    background: i <= currentStep ? s.color : "rgba(255,255,255,0.08)",
                    scale: i === currentStep ? 1.15 : 1,
                    boxShadow: i === currentStep ? `0 0 16px ${s.glow}` : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                >
                  {i < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  )}
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    animate={{
                      background: i < currentStep
                        ? `linear-gradient(90deg, ${steps[i].color}, ${steps[i + 1].color})`
                        : "rgba(255,255,255,0.08)",
                    }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:block w-16 h-0.5 rounded-full"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Layout principal */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Lado esquerdo — texto */}
            <div className="flex-1 order-2 md:order-1 text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5"
                >
                  {/* Tag */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold md:mx-0 mx-auto"
                    style={{
                      background: `${step.color}15`,
                      borderColor: `${step.color}40`,
                      color: step.color,
                    }}
                  >
                    <step.icon className="w-3.5 h-3.5" />
                    {step.tag}
                  </motion.div>

                  {/* Número grande */}
                  <div>
                    <p
                      className="font-display text-8xl font-bold leading-none opacity-10 select-none"
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold -mt-6 relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium mt-1" style={{ color: step.color }}>
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-surface-400 leading-relaxed max-w-sm md:mx-0 mx-auto">
                    {step.description}
                  </p>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2.5 md:items-start items-center">
                    {step.bullets.map((bullet, i) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2.5 text-sm text-surface-300"
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${step.color}25` }}
                        >
                          <Check className="w-2.5 h-2.5" style={{ color: step.color }} />
                        </div>
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA no último step */}
                  {currentStep === steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        href="/sign-up"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl text-sm transition-all shadow-glow"
                      >
                        Começar grátis agora
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Lado direito — visual interativo */}
            <motion.div
              style={{ y: phoneY }}
              className="flex-1 order-1 md:order-2 w-full max-w-sm mx-auto md:mx-0"
            >
              <div className="relative">
                {/* Glow de fundo */}
                <motion.div
                  animate={{ background: `radial-gradient(ellipse, ${step.glow} 0%, transparent 70%)` }}
                  transition={{ duration: 0.8 }}
                  className="absolute -inset-8 blur-2xl pointer-events-none"
                />

                {/* Card visual */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-surface-900 border rounded-3xl p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                  style={{ borderColor: `${step.color}30` }}
                >
                  {/* Header do card */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-500/50" />
                    </div>
                    <div className="flex-1 bg-surface-800 rounded-md h-5 flex items-center px-2">
                      <span className="text-[9px] text-surface-600">app.bolix.app</span>
                    </div>
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center"
                      style={{ background: `${step.color}20` }}
                    >
                      <step.icon className="w-3 h-3" style={{ color: step.color }} />
                    </div>
                  </div>

                  {/* Visual animado do step */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.visual}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hint de scroll */}
          <AnimatePresence>
            {currentStep < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-6 left-0 right-0 flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center gap-1.5 text-surface-600 text-xs"
                >
                  <span>Continue rolando</span>
                  <div className="w-4 h-7 rounded-full border border-surface-700 flex items-start justify-center pt-1">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1 h-1.5 rounded-full bg-surface-600"
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