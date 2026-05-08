// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://bolix.app"
  ),
  title: {
    default: "Bolix — Seu Assistente Financeiro Inteligente",
    template: "%s | Bolix",
  },
  description:
    "Acabe com assinaturas esquecidas e gastos invisíveis. O Bolix detecta, organiza e alerta sobre seus gastos recorrentes automaticamente.",
  keywords: [
    "finanças pessoais",
    "controle financeiro",
    "assinaturas",
    "gastos recorrentes",
    "alertas financeiros",
    "organizar finanças",
    "brasil",
  ],
  authors: [{ name: "Bolix" }],
  creator: "Bolix",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bolix.app",
    siteName: "Bolix",
    title: "Bolix — Seu Assistente Financeiro Inteligente",
    description:
      "Detecte assinaturas esquecidas, organize gastos recorrentes e economize R$187/mês em média.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bolix — Assistente Financeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolix — Assistente Financeiro Inteligente",
    description:
      "Detecte assinaturas esquecidas e economize todo mês com IA.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bolix",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" className="dark" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          {/* iOS PWA status bar */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </head>
        <body className="min-h-screen bg-surface-950 font-sans antialiased">
          <QueryProvider>
            {children}
            <Toaster
              theme="dark"
              position="top-center"
              toastOptions={{
                style: {
                  background: "hsl(222 47% 8%)",
                  border: "1px solid hsl(217 33% 16%)",
                  color: "hsl(210 40% 98%)",
                },
              }}
            />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}