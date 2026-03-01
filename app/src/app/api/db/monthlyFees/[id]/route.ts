import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { id } = await params;

    // Usamos deleteMany para garantir que a conta pertence ao usuário logado
    const result = await prisma.accountsPayable.deleteMany({
      where: { id: id, userId: userId }
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Mensalidade não encontrada" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Erro no DELETE:", error);
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await request.json();
    const { id } = await params;

    const result = await prisma.accountsPayable.updateMany({
      where: { id: id, userId: userId },
      data: {
        name: body.description,
        amount: body.amount,
        category: body.category,
        nextDate: new Date(body.date),
      }
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Mensalidade não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no PUT:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 400 });
  }
}
