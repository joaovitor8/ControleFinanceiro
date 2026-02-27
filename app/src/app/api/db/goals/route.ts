import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// ---

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(goals);
}

// --- 

export async function POST(request: Request) {
  const { userId } = await auth();
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
