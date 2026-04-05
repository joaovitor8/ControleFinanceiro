import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth";


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Lendo o usuário do nosso Cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const payload = token ? await verifyToken(token) : null;
  const userId = payload?.userId as string | undefined;

  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const bodySchema = z.object({ current: z.number() });

  try {
    const data = bodySchema.parse(await request.json());
    const { id } = await params;

    // Usando updateMany para garantir que o usuário está editando a PRÓPRIA meta
    const result = await prisma.goal.updateMany({
      where: { id: id, userId: userId },
      data: { current: data.current }
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Meta não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar progresso da meta:", error);
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
}
