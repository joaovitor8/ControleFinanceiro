import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/src/components/ui/button";
import { Bot, Wallet, TrendingUp } from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* --- HEADER / NAVBAR --- */}
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

      {/* --- HERO SECTION (A Capa) --- */}
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center gap-8 py-20 px-4 text-center md:py-32">
          
          {/* Badge de Novidade */}
          <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Nova IA Financeira 2.0 disponível
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            Domine suas finanças com <br className="hidden md:block" />
            <span className="bg-linear-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
              Inteligência Artificial
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="max-w-2xl leading-normal text-zinc-400 sm:text-xl sm:leading-8">
            Pare de perder dinheiro com assinaturas esquecidas. Deixe nossa IA analisar seus gastos, 
            sugerir cortes e organizar sua vida financeira automaticamente.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-lg h-12 px-8 neon-shadow">
                  Criar Conta Grátis
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/main/dashboard">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-lg h-12 px-8 neon-shadow">
                  Ir para Dashboard
                </Button>
              </Link>
            </SignedIn>
            
            <Button variant="outline" size="lg" className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 h-12 px-8">
              Como funciona?
            </Button>
          </div>

          {/* Imagem/Mockup Abstrato (Efeito Visual) */}
          <div className="mt-10 w-full max-w-5xl rounded-xl border border-zinc-800 bg-zinc-950/50 p-2 shadow-2xl shadow-emerald-900/20 backdrop-blur-sm lg:mt-16">
            <div className="rounded-lg bg-zinc-900/50 p-8 min-h-75 flex items-center justify-center border border-dashed border-zinc-800">
               <div className="text-center space-y-4">
                  <Bot className="w-16 h-16 text-zinc-700 mx-auto" />
                  <p className="text-zinc-500">Preview do Dashboard (Colocar print real depois)</p>
               </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES GRID (Vantagens) --- */}
        <section className="container mx-auto py-20 px-4" id="features">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-emerald-500/50 transition-colors duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <Wallet className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Controle Total</h3>
              <p className="text-zinc-400">
                Registre receitas e despesas em segundos. Categorização automática e visualização clara do seu saldo.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-emerald-500/50 transition-colors duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Assinaturas</h3>
              <p className="text-zinc-400">
                Nunca mais pague por esquecimento. O sistema alerta antes da renovação da Netflix, Spotify e outros.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-emerald-500/50 transition-colors duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <Bot className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Mentor IA</h3>
              <p className="text-zinc-400">
                Receba conselhos personalizados: &quot;Corte 20% em delivery e invista a diferença para comprar seu PC.&quot;
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            © 2026 FinSmart AI. Desenvolvido para Portfólio.
          </p>
          <div className="flex gap-4">
             <Link href="#" className="text-sm text-zinc-500 hover:text-emerald-500">GitHub</Link>
             <Link href="#" className="text-sm text-zinc-500 hover:text-emerald-500">LinkedIn</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
