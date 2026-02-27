import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // Puxa direto do Clerk!

export async function GET() {
  const { userId } = await auth(); // O Clerk já descobre o ID na hora

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Se chegou aqui, o usuário está logado e você tem o userId!
  return NextResponse.json({ message: "Acesso liberado!", userId });
}
