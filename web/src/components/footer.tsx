import Link from "next/link";

export const Footer = () => {
  return (
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
  )
}
