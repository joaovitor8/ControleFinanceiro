// Arquivo para verificar o token do usuário usando o Clerk.
// Ele é uma API route que pode ser chamada para testar se o token é válido e obter o userId.

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // Puxa direto do Clerk!

export async function GET() {
  const { userId } = await auth(); // O Clerk já descobre o ID na hora

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Se chegou aqui, o usuário está logado e temos o userId!
  return NextResponse.json({ message: "Acesso liberado!", userId });
}
