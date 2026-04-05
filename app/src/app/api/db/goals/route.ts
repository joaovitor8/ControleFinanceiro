// src/app/api/db/goals/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth"; // Nossa função!


// Função ajudante para pegar o ID logado
async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  
  const payload = await verifyToken(token);
  return payload?.userId as string | null;
}

export async function GET() {
  const userId = await getUserId();
  
  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const goals = await prisma.goal.findMany({
      where: { userId: userId } // Usa o ID do nosso banco!
    });
    return NextResponse.json(goals);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar metas" }, { status: 500 });
  }
}


// Rota para lidar com operações relacionadas a uma meta específica
export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const createGoalSchema = z.object({
    name: z.string(),
    target: z.number(),
    current: z.number().optional().default(0),
    icon: z.string().optional(),
    color: z.string().optional(),
  });

  try {
    const body = await request.json();
    const data = createGoalSchema.parse(body);

    const goal = await prisma.goal.create({
      data: { userId, ...data, icon: data.icon || "target", color: data.color || "emerald" }
    });

    return NextResponse.json(goal, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}
