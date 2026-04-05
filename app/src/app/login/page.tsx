// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/login", { email, password });
      toast.success("Login realizado com sucesso!");
      
      // Força um recarregamento para o AuthContext e o Middleware pegarem o novo cookie
      window.location.href = "/"; // Ou mude para "/dashboard" se essa for sua rota principal
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Bem-vindo de volta</h2>
          <p className="text-sm text-muted-foreground mt-2">Faça login para acessar o Universe</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="seu@email.com"
                className="bg-secondary/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Senha</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                className="bg-secondary/50"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11" 
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Ainda não tem uma conta?{" "}
          <Link href="/register" className="text-emerald-500 hover:text-emerald-400 font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
