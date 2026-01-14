import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/src/components/ui/button";
import { Bot } from "lucide-react";


export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Bot className="h-5 w-5 text-zinc-950" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            FinSmart <span className="text-emerald-500">AI</span>
          </span>
        </div>

        {/* Navegação / Auth */}
        <nav className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                Entrar
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Começar Grátis
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
