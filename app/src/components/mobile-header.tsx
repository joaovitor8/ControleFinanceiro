// Arquivo que define o componente de cabeçalho para dispositivos móveis.

"use client"

import {SignedIn, UserButton } from "@clerk/nextjs";
import { TrendingUp } from "lucide-react"


export function MobileHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-lg px-4 py-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
          <TrendingUp className="h-4 w-4 text-background" />
        </div>
        <h1 className="text-base font-semibold text-foreground">FinSmart</h1>
      </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </header>
  )
}
