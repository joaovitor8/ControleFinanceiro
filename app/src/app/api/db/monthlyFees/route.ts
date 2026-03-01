import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server"; // Troque isso quando fizer seu auth customizado

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const fees = await prisma.accountsPayable.findMany({
      where: { userId },
      orderBy: { nextDate: 'asc' } // Ordena pelas contas mais próximas de vencer
    });

    // Como 'amount' é Decimal no Prisma, precisamos converter para número comum no front
    const formattedFees = fees.map(fee => ({
      id: fee.id,
      description: fee.name, // Mapeando 'name' do banco para 'description' do front
      amount: Number(fee.amount),
      category: fee.category,
      date: fee.nextDate.toISOString().split('T')[0],
      status: "pending", // Status fixo no front por enquanto
    }));

    return NextResponse.json(formattedFees);
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json({ error: "Erro ao buscar mensalidades" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await request.json();

    const newFee = await prisma.accountsPayable.create({
      data: {
        userId: userId,
        name: body.description, // Front manda description, banco salva name
        amount: body.amount,
        category: body.category,
        frequency: "Mensal", // Você definiu frequency no schema como String
        nextDate: new Date(body.date),
      }
    });

    return NextResponse.json({ success: true, fee: newFee });
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json({ error: "Erro ao criar mensalidade" }, { status: 400 });
  }
}
