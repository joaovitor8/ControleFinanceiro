import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/src/components/ui/sonner'
import { ClerkProvider } from '@clerk/nextjs'
import { AuthSync } from '@/src/components/authenticate'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'FinSmart - Controle Financeiro Inteligente',
  description: 'Gerencie suas finanças pessoais com inteligencia. Dashboard premium para controle total do seu dinheiro.',
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <body className="font-sans antialiased">
          <AuthSync />
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
