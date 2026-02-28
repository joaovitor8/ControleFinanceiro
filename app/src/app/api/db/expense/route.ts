import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@clerk/nextjs/server";


// Pegar todas as despesas do usuário logado
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const expenses = await prisma.accountsPayable.findMany({
    where: { userId: userId } // Puxa as despesas de quem está logado automaticamente!
  });

  return NextResponse.json(expenses);
}


// Criar nova despesa
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { name, amount, type, frequency } = await request.json();

    if (!name || !amount || !type || !frequency) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const newExpense = await prisma.accountsPayable.create({
      data: {
        name,
        amount: parseFloat(amount),
        category: type,
        frequency,
        nextDate: new Date(),
        userId: userId, // Injeta o ID seguro aqui
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    return NextResponse.json({ error: "Erro ao criar conta" }, { status: 500 });
  }
}
