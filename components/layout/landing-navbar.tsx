"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Zap } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 glass">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>

          <span className="font-display font-bold text-xl">
            Bolix
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-surface-400">
          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            Funcionalidades
          </a>

          <a
            href="#how"
            className="hover:text-white transition-colors"
          >
            Como funciona
          </a>

          <a
            href="#pricing"
            className="hover:text-white transition-colors"
          >
            Preços
          </a>

          <a
            href="#faq"
            className="hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-surface-400 hover:text-white transition-colors px-4 py-2"
          >
            Entrar
          </Link>

          <Link
            href="/sign-up"
            className="text-sm bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded-lg font-medium transition-all btn-shimmer"
          >
            Começar grátis
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-surface-950/95 backdrop-blur-md"
          >
            <div className="container px-4 py-4 flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-surface-300 py-2"
              >
                Funcionalidades
              </a>

              <a
                href="#how"
                onClick={() => setMobileMenuOpen(false)}
                className="text-surface-300 py-2"
              >
                Como funciona
              </a>

              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-surface-300 py-2"
              >
                Preços
              </a>

              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-surface-300 py-2"
              >
                FAQ
              </a>

              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/sign-in"
                  className="text-center border border-white/10 rounded-lg py-2 text-surface-300"
                >
                  Entrar
                </Link>

                <Link
                  href="/sign-up"
                  className="text-center bg-brand-500 hover:bg-brand-400 rounded-lg py-2 font-medium text-white transition-colors"
                >
                  Começar grátis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

