import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth";


async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId as string | null;
}


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { id } = await params;

    const result = await prisma.monthlyFees.deleteMany({
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
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await request.json();
    const { id } = await params;

    const result = await prisma.monthlyFees.updateMany({
      where: { id: id, userId: userId },
      data: {
        name: body.name, // Mudamos para name acompanhando o frontend
        amount: body.amount,
        category: body.category,
        frequency: body.frequency,
        date: new Date(body.date),
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
