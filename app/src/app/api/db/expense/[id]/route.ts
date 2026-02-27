import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { name, amount, type, frequency } = await request.json();
    
    // O where com userId garante que um usuário não pode editar a conta de outro
    const updatedExpense = await prisma.accountsPayable.update({
      where: { id: params.id, userId: userId },
      data: {
        name, amount: parseFloat(amount), category: type, frequency,
      },
    });
    return NextResponse.json(updatedExpense);
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error);
    return NextResponse.json({ error: "Erro ao atualizar." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    await prisma.accountsPayable.delete({
      where: { id: params.id, userId: userId },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Erro ao deletar despesa:", error);
    return NextResponse.json({ error: "Erro ao deletar." }, { status: 500 });
  }
}
