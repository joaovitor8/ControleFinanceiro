import { Inter, JetBrains_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

import { Toaster } from '@/src/components/ui/sonner'
import { AuthProvider } from '@/src/contexts/AuthContext'


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
  description: 'Gerencie suas finanças pessoais com inteligencia',
}

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <AuthProvider>
        <body className="font-sans antialiased">
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </AuthProvider>
    </html>
  )
}
