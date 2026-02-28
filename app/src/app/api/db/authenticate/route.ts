// Arquivo responsável por autenticar o usuário usando o Clerk e sincronizar os dados com o banco de dados Prisma.

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth(); // O Clerk gerencia a segurança aqui

    if (!userId) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userRoles: { include: { role: true } } }
    });

    if (!user) {
      const freeRole = await prisma.roles.findUnique({ where: { name: 'FREE' } });

      if (!freeRole) {
        return NextResponse.json({ error: "ERRO CRÍTICO: Cargo FREE não encontrado." }, { status: 500 });
      }

      // No Next.js, o clerkClient também é importado do @clerk/nextjs/server
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);
      const email = clerkUser.emailAddresses[0]?.emailAddress;

      if (!email) {
        return NextResponse.json({ error: "Email é obrigatório." }, { status: 400 });
      }

      user = await prisma.user.create({
        data: {
          id: userId,
          email: email,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          userRoles: { create: { roleId: freeRole.id } }
        },
        include: { userRoles: { include: { role: true } } }
      });
    }

    return NextResponse.json({ message: "Sincronizado", user }, { status: 200 });

  } catch (error) {
    console.error("Erro na autenticação:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
