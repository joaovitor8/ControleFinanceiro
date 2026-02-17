"use client"

import { AppSidebar } from "@/src/components/app-sidebar"
import { MobileNav } from "@/src/components/mobile-nav"
import { MobileHeader } from "@/src/components/mobile-header"


export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <MobileHeader />
      <main className="lg:ml-64 pb-20 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
