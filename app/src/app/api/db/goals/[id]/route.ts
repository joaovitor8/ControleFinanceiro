import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth";


// Função ajudante para pegar o ID logado
async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId as string | null;
}

// Atualiza os detalhes de uma meta específica
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const bodySchema = z.object({
    name: z.string(), target: z.number(), icon: z.string(), color: z.string(),
  });

  try {
    const data = bodySchema.parse(await request.json());
    const { id } = await params;

    const goal = await prisma.goal.updateMany({
      where: { id: id, userId: userId },
      data
    });
    return NextResponse.json(goal);
  } catch (error) {
    console.error("Erro ao atualizar meta:", error);
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}

// Deleta uma meta específica
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;

  await prisma.goal.deleteMany({
    where: { id: id, userId: userId }
  });

  return new Response(null, { status: 204 }); 
}
