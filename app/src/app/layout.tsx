import { Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import { AuthProvider } from "@/src/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "FinSmart - Controle Financeiro Inteligente",
  description: "Gerencie suas finanças pessoais com inteligência",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* Tema default dark; toggle entra depois */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
