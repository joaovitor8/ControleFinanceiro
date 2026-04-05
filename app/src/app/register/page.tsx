"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";



export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/register", { name, email, password });
      toast.success("Conta criada! Faça login para continuar.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erro ao criar conta");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Criar Conta</h2>
          <p className="text-sm text-muted-foreground mt-2">Junte-se ao Universe hoje</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 mt-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Nome</label>
              <Input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Como quer ser chamado?"
                className="bg-secondary/50"
              />
            </div>
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
                placeholder="No mínimo 6 caracteres"
                className="bg-secondary/50"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-emerald-500 text-background hover:bg-emerald-600 font-semibold h-11" 
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
            Cadastrar
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-medium">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}