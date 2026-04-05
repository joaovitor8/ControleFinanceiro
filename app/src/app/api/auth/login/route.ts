import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/src/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    // 1. Busca o usuário no banco
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    // 2. Compara a senha digitada com o hash do banco
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    // 3. Gera o Token JWT usando o id do banco
    const token = await signToken(user.id);

    // 4. Salva o token nos Cookies de forma segura (Next.js 15 exige await no cookies())
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true, // Impede que o JS do navegador leia o cookie (proteção XSS)
      secure: process.env.NODE_ENV === "production", // Só trafega em HTTPS na produção
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // Dura 7 dias
      path: "/", // Válido em todo o site
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
