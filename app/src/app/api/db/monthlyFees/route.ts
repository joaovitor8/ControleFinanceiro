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

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const fees = await prisma.monthlyFees.findMany({
      where: { userId },
    });

    const formattedFees = fees.map(fee => ({
      id: fee.id,
      name: fee.name, // Ajustado para name, acompanhando o frontend
      amount: Number(fee.amount),
      category: fee.category,
      frequency: fee.frequency,
      date: fee.date.toISOString(),
    }));

    return NextResponse.json(formattedFees);
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json({ error: "Erro ao buscar mensalidades" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await request.json();

    const newFee = await prisma.monthlyFees.create({
      data: {
        userId: userId,
        name: body.name, // Ajustado para name
        amount: body.amount,
        category: body.category,
        frequency: body.frequency,
        date: new Date(body.date),
      }
    });

    return NextResponse.json({ success: true, fee: newFee });
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json({ error: "Erro ao criar mensalidade" }, { status: 400 });
  }
}
