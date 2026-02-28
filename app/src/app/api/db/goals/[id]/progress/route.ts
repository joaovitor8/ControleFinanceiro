import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";


// Atualiza o valor de uma meta específica
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const bodySchema = z.object({ current: z.number() });

  try {
    const data = bodySchema.parse(await request.json());

    const { id } = await params;

    const goal = await prisma.goal.update({
      where: { id: id, userId: userId },
      data: { current: data.current }
    });
    return NextResponse.json(goal);
  } catch (error) {
    console.error("Erro ao atualizar progresso da meta:", error);
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}
