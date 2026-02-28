import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";


// Atualiza os detalhes de uma meta específicar
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const bodySchema = z.object({
    name: z.string(), target: z.number(), icon: z.string(), color: z.string(),
  });

  try {
    const data = bodySchema.parse(await request.json());

    const { id } = await params;

    const goal = await prisma.goal.update({
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
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;

  await prisma.goal.delete({
    where: { id: id, userId: userId }
  });

  return new Response(null, { status: 204 }); 
}
