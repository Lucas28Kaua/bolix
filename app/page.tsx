"use client";

// app/page.tsx — Landing Page Bolix
// Design: Dark futurista, inspiração Linear/Stripe/Nubank

import { useState, useRef } from "react";
import Navbar from "@/components/layout/landing-navbar";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ProductDemo } from "@/components/landing/ProductDemo";
import { HowItWorks } from "@/components/landing/HowItWorks";
import {
  Bell,
  Zap,
  Shield,
  TrendingDown,
  ChevronDown,
  ArrowRight,
  Check,
  X,
  Star,
  Smartphone,
  Brain,
  BarChart3,
  CreditCard,
  AlertTriangle,
  RefreshCw,
  Download,
  Menu,
  Lock,
  Sparkles,
  DollarSign,
} from "lucide-react";

// ─── Dados ────────────────────────────────────────────────────

const features = [
  {
    icon: Brain,
    title: "IA que pensa por você",
    desc: "Nossa IA analisa seus extratos e detecta automaticamente assinaturas e cobranças recorrentes que você esqueceu.",
    color: "from-brand-500 to-brand-400",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: Bell,
    title: "Alertas antes da cobrança",
    desc: "Receba notificações 3 dias antes de cada vencimento. Nunca mais pague multa por boleto esquecido.",
    color: "from-accent-500 to-accent-400",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    icon: BarChart3,
    title: "Visão financeira clara",
    desc: "Dashboard visual com previsão de saldo, gráficos de gastos e comparativos mensais em tempo real.",
    color: "from-blue-500 to-blue-400",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: TrendingDown,
    title: "Identifique o que cortar",
    desc: "Veja quais assinaturas você não usa e quanto economizaria cancelando cada uma delas.",
    color: "from-purple-500 to-purple-400",
    glow: "rgba(168,85,247,0.15)",
  },
  {
    icon: Shield,
    title: "100% seguro",
    desc: "Seus dados são criptografados com AES-256. Nunca vendemos ou compartilhamos suas informações.",
    color: "from-brand-500 to-teal-400",
    glow: "rgba(16,185,129,0.12)",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    desc: "App instalável no celular (PWA). Funciona offline e tem a mesma velocidade de um app nativo.",
    color: "from-pink-500 to-rose-400",
    glow: "rgba(236,72,153,0.12)",
  },
];

const steps = [
  {
    num: "01",
    title: "Conecte ou importe",
    desc: "Importe seu extrato em CSV ou conecte seu banco em segundos.",
    icon: Download,
  },
  {
    num: "02",
    title: "IA analisa tudo",
    desc: "Em segundos, detectamos todos os seus gastos recorrentes automaticamente.",
    icon: Brain,
  },
  {
    num: "03",
    title: "Você controla",
    desc: "Veja, edite, cancele e configure alertas para cada recorrência.",
    icon: Zap,
  },
  {
    num: "04",
    title: "Economize todo mês",
    desc: "Com visibilidade total, você corta o que não usa e para de pagar juros.",
    icon: DollarSign,
  },
];

const testimonials = [
  {
    name: "Mariana Santos",
    role: "Designer, São Paulo",
    avatar: "MS",
    text: "Descobri que estava pagando 3 serviços de streaming que nem usava mais. Cancelei tudo e economizo R$127 por mês. Em 6 meses, paguei uma viagem!",
    rating: 5,
    saved: "R$127/mês",
  },
  {
    name: "Carlos Mendes",
    role: "Engenheiro, Belo Horizonte",
    avatar: "CM",
    text: "O alerta de vencimento me salvou de pagar multa no boleto do carro duas vezes. Simplesmente funciona. Melhor app financeiro que usei.",
    rating: 5,
    saved: "R$340/mês",
  },
  {
    name: "Juliana Lima",
    role: "Professora, Recife",
    avatar: "JL",
    text: "Nunca imaginei que gastava tanto em assinaturas. A IA identificou 11 cobranças recorrentes que eu nem lembrava que tinha.",
    rating: 5,
    saved: "R$89/mês",
  },
];

const faqs = [
  {
    q: "O Bolix precisa de acesso à minha conta bancária?",
    a: "Não obrigatoriamente. Você pode importar seu extrato via arquivo CSV (disponível em todos os bancos brasileiros). A conexão direta com bancos é um recurso opcional do plano Pro via Open Finance.",
  },
  {
    q: "Meus dados financeiros são seguros?",
    a: "Sim. Usamos criptografia AES-256, infraestrutura em nuvem brasileira, nunca vendemos dados e seguimos a LGPD. Você pode deletar todos os seus dados a qualquer momento.",
  },
  {
    q: "Como a IA detecta gastos recorrentes?",
    a: "Nosso modelo analisa padrões de valor, frequência e descrição das transações. Identifica assinaturas mesmo quando o nome muda ligeiramente entre cobranças.",
  },
  {
    q: "O plano gratuito é realmente gratuito?",
    a: "Sim, para sempre. O Free tem limite de 10 recorrências monitoradas e importação de 1 extrato por mês. Para sem limitações, temos o Pro.",
  },
  {
    q: "Funciona em qualquer banco brasileiro?",
    a: "Sim. A importação via CSV funciona com todos os bancos (Nubank, Itaú, Bradesco, BB, Caixa, Inter, C6, Santander e mais). A conexão automática funciona com os bancos cadastrados no Open Finance.",
  },
  {
    q: "Posso usar no celular?",
    a: "Sim! O Bolix é PWA — você instala direto pelo navegador (sem precisar de App Store) e ele funciona como um app nativo, inclusive offline.",
  },
];

// ─── Componentes auxiliares ──────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlowDot({ color = "#10b981" }: { color?: string }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full mr-2 animate-pulse-glow"
      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
    />
  );
}

// ─── Landing Page ────────────────────────────────────────────

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-surface-950 text-white">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent-500/5 blur-[100px] pointer-events-none" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-medium mb-8"
          >
            <GlowDot />
            <span>✨ Detecte assinaturas esquecidas com IA</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-balance mb-6"
          >
            Pare de jogar dinheiro{" "}
            <span className="text-gradient">fora todo mês</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-surface-400 max-w-2xl mx-auto mb-10 text-balance"
          >
            O Bolix detecta automaticamente seus gastos recorrentes invisíveis,
            alerta antes dos vencimentos e mostra exatamente o que você pode cortar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/sign-up"
              className="group flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl text-lg transition-all btn-shimmer shadow-glow hover:shadow-glow-lg w-full sm:w-auto justify-center"
            >
              Começar grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how"
              className="flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-white/20 text-surface-300 hover:text-white rounded-xl text-lg transition-all w-full sm:w-auto justify-center"
            >
              Ver como funciona
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-surface-500"
          >
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-500" /> Grátis para sempre no plano Free
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-surface-700" />
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-500" /> Sem cartão de crédito
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-surface-700" />
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-brand-500" /> Configurado em 2 minutos
            </span>
          </motion.div>

          {/* App mockup preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] glass">
              {/* Mock dashboard */}
              <div className="bg-surface-900 p-4 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-surface-800 rounded-md h-6 flex items-center px-3 text-xs text-surface-500">
                    app.bolix.app/dashboard
                  </div>
                </div>
              </div>
              <div className="bg-surface-900/80 p-6 grid grid-cols-3 gap-4">
                {/* Saldo */}
                <div className="col-span-3 md:col-span-1 bg-surface-800 rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-surface-500 mb-1">Recorrentes este mês</p>
                  <p className="text-2xl font-display font-bold text-accent-400">R$ 847,90</p>
                  <p className="text-xs text-brand-400 mt-1">↓ 12% vs mês anterior</p>
                </div>
                <div className="col-span-3 md:col-span-1 bg-surface-800 rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-surface-500 mb-1">Assinaturas ativas</p>
                  <p className="text-2xl font-display font-bold">14</p>
                  <p className="text-xs text-accent-400 mt-1">⚠ 3 raramente usadas</p>
                </div>
                <div className="col-span-3 md:col-span-1 bg-surface-800 rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-surface-500 mb-1">Próximo vencimento</p>
                  <p className="text-2xl font-display font-bold text-brand-400">3 dias</p>
                  <p className="text-xs text-surface-400 mt-1">Netflix — R$55,90</p>
                </div>
                {/* Alert cards */}
                <div className="col-span-3 flex flex-col gap-2">
                  {[
                    { name: "Spotify", amount: "R$21,90", due: "Amanhã", color: "brand" },
                    { name: "Adobe CC", amount: "R$256,00", due: "3 dias", color: "accent" },
                    { name: "iCloud+", amount: "R$9,90", due: "5 dias", color: "brand" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-surface-800/50 rounded-lg px-4 py-3 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/20 flex items-center justify-center`}>
                          <CreditCard className={`w-4 h-4 text-${item.color}-400`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-surface-500">Vence em {item.due}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Problema ───────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <span className="text-accent-500 font-medium text-sm uppercase tracking-widest">O problema</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
              Você sabe exatamente <br />
              <span className="text-surface-500">onde seu dinheiro vai?</span>
            </h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">
              A maioria dos brasileiros não sabe. E não é culpa deles — os gastos invisíveis se acumulam silenciosamente.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "😱",
                stat: "R$187",
                label: "desperdiçados por mês",
                desc: "É o quanto o brasileiro médio gasta em assinaturas que não usa ou esqueceu.",
              },
              {
                emoji: "📱",
                stat: "6,4",
                label: "assinaturas ativas",
                desc: "Média por pessoa. A maioria não lembra de mais da metade delas.",
              },
              {
                emoji: "😤",
                stat: "73%",
                label: "pagam boleto com juros",
                desc: "Por esquecer a data de vencimento — algo completamente evitável.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-surface-900 border border-white/5 rounded-2xl p-6 text-center card-hover">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <div className="font-display text-4xl font-bold text-accent-400 mb-1">
                    {item.stat}
                  </div>
                  <div className="text-sm font-medium text-surface-300 mb-3">{item.label}</div>
                  <p className="text-surface-500 text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      
      {/* ── Product Demo ──────────────────────────────────── */}
      <ProductDemo />

      {/* ── Features ──────────────────────────────────────── */}
      <section id="features" className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Funcionalidades</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-surface-400 text-lg max-w-xl mx-auto">
              Ferramentas inteligentes para quem quer parar de perder dinheiro.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="group bg-surface-900 border border-white/5 rounded-2xl p-6 card-hover cursor-default"
                  style={{ "--glow": f.glow } as React.CSSProperties}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resultados (social proof numbers) ─────────────── */}
      <section className="py-20 bg-gradient-to-r from-brand-500/10 via-brand-500/5 to-transparent border-y border-brand-500/10">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "R$187", label: "economizados/mês em média" },
              { val: "+12k", label: "usuários ativos" },
              { val: "98%", label: "de satisfação" },
              { val: "2 min", label: "para configurar" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="flex flex-col items-center">
                <div className="font-display text-4xl font-bold text-brand-400 mb-1">{item.val}</div>
                <p className="text-surface-400 text-sm">{item.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Depoimentos ───────────────────────────────────── */}
      <section className="py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Depoimentos</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
              Quem já usa, não volta atrás
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-surface-900 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 card-hover">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-surface-300 text-sm leading-relaxed flex-1">"{t.text}"</p>

                  {/* Economia badge */}
                  <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
                    <TrendingDown className="w-3 h-3" />
                    Economiza {t.saved}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <div className="w-9 h-9 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-surface-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Preços ────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-surface-900/30">
        <div className="container max-w-4xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <span className="text-brand-400 font-medium text-sm uppercase tracking-widest">Preços</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
              Simples e transparente
            </h2>

            {/* Toggle anual/mensal */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className={`text-sm ${!annual ? "text-white" : "text-surface-500"}`}>Mensal</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-brand-500" : "bg-surface-700"}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : ""}`} />
              </button>
              <span className={`text-sm ${annual ? "text-white" : "text-surface-500"}`}>
                Anual <span className="text-brand-400 font-semibold">−30%</span>
              </span>
            </div>
          </FadeIn>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={annual ? "anual" : "mensal"}
              initial={{ x: annual ? 60 : -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: annual ? -60 : 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Free */}
              <FadeIn delay={0.1}>
                <div className="bg-surface-900 border border-white/5 rounded-2xl p-8">
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold mb-1">Free</h3>
                    <p className="text-surface-400 text-sm">Para começar a organizar suas finanças</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-display text-5xl font-bold">R$0</span>
                    <span className="text-surface-500">/mês</span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8">
                    {[
                      "Até 10 recorrências monitoradas",
                      "1 importação CSV/mês",
                      "Alertas por e-mail",
                      "Dashboard básico",
                      "Histórico de 3 meses",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-surface-300">
                        <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                    {[
                      "Detecção por IA ilimitada",
                      "Conexão automática com banco",
                      "Relatório IR",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-surface-600 line-through">
                        <X className="w-4 h-4 text-surface-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sign-up"
                    className="block text-center py-3 px-6 rounded-xl border border-white/10 hover:border-white/20 text-sm font-medium transition-all"
                  >
                    Criar conta grátis
                  </Link>
                </div>
              </FadeIn>

              {/* Pro */}
              <FadeIn delay={0.2}>
                <div className="relative bg-surface-900 border border-brand-500/40 rounded-2xl p-8 shadow-glow">
                  {/* Badge popular */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Mais popular
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold mb-1">Pro</h3>
                    <p className="text-surface-400 text-sm">Para quem quer controle financeiro de verdade</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-8 overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={annual ? "anual" : "mensal"}
                        initial={{ x: annual ? 40 : -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: annual ? -40 : 40, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="font-display text-5xl font-bold text-brand-400"
                      >
                        R${annual ? "20" : "29"}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-surface-500">/mês</span>
                    <AnimatePresence>
                      {annual && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 text-sm text-surface-500 line-through"
                        >
                          R$29
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8">
                    {[
                      "Recorrências ilimitadas",
                      "Importações CSV ilimitadas",
                      "Detecção por IA ilimitada",
                      "Alertas push + WhatsApp",
                      "Conexão automática com banco",
                      "Previsão de saldo com IA",
                      "Relatório completo para IR",
                      "Histórico completo",
                      "Suporte prioritário",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-surface-200">
                        <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sign-up?plan=pro"
                    className="block text-center py-3 px-6 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold transition-all btn-shimmer shadow-glow"
                  >
                    Começar Pro {annual ? "anual" : "mensal"}
                  </Link>
                  <p className="text-center text-xs text-surface-500 mt-3">
                    7 dias grátis • Cancele quando quiser
                  </p>
                </div>
              </FadeIn>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section id="faq" className="py-24">
        <div className="container max-w-2xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold">Perguntas frequentes</h2>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-surface-900 border border-white/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
                  >
                    <span className="font-medium text-sm pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-surface-500 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-surface-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-[80px]" />

        <div className="container max-w-3xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-8 shadow-glow animate-float">
              <Zap className="w-8 h-8 text-white" fill="white" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Pronto para parar de <br />
              <span className="text-gradient">perder dinheiro?</span>
            </h2>
            <p className="text-surface-400 text-lg mb-10 max-w-lg mx-auto">
              Junte-se a mais de 12.000 brasileiros que já estão no controle financeiro. Comece grátis agora.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-10 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl text-lg transition-all btn-shimmer shadow-glow hover:shadow-glow-lg"
            >
              Criar minha conta grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-surface-600">
              <Lock className="w-3 h-3" />
              <span>Seus dados estão 100% seguros e protegidos pela LGPD</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span className="font-display font-bold">Bolix</span>
              </div>
              <p className="text-surface-500 text-sm max-w-xs">
                Assistente financeiro inteligente para brasileiros. Detecte, organize e economize.
              </p>
            </div>
            {[
              {
                title: "Produto",
                links: ["Funcionalidades", "Preços", "Changelog", "Roadmap"],
              },
              {
                title: "Empresa",
                links: ["Sobre", "Blog", "Carreiras", "Imprensa"],
              },
              {
                title: "Legal",
                links: ["Privacidade", "Termos", "LGPD", "Cookies"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-medium text-sm mb-4">{col.title}</h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-surface-500 hover:text-surface-300 text-sm transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-600">
            <p>© 2026 Bolix. Todos os direitos reservados.</p>
            <p>Feito com 💚 no Brasil</p>
          </div>
        </div>
      </footer>

      {/* ── Mobile FAB ────────────────────────────────────── */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 md:hidden px-4">
        <Link
          href="/sign-up"
          className="flex items-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-semibold rounded-full shadow-glow btn-shimmer text-sm"
        >
          <Zap className="w-4 h-4" fill="white" />
          Começar grátis
        </Link>
      </div>
    </div>
  );
}