"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { requireUserId } from "@/src/lib/auth-server";
import { transactionSchema } from "@/src/lib/schemas";
import { dateInputToUTC } from "@/src/lib/format";
import type { TransactionDTO } from "@/src/lib/types";

type DbTransaction = {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: { toString(): string };
  description: string;
  date: Date;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    type: "INCOME" | "EXPENSE" | "BOTH";
  };
};

function toDTO(t: DbTransaction): TransactionDTO {
  return {
    id: t.id,
    type: t.type,
    amount: Number(t.amount.toString()),
    description: t.description,
    category: {
      id: t.category.id,
      name: t.category.name,
      icon: t.category.icon,
      color: t.category.color,
      type: t.category.type,
    },
    date: t.date.toISOString(),
  };
}

// Lista as transações do usuário (mais recente primeiro).
export async function listTransactions(): Promise<TransactionDTO[]> {
  const userId = await requireUserId();
  const items = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    include: { category: true },
  });
  return items.map(toDTO);
}

// Cria uma transação.
export async function createTransaction(input: unknown) {
  const userId = await requireUserId();
  const data = transactionSchema.parse(input);

  // Garante que a categoria pertence ao usuário
  const category = await prisma.category.findFirst({
    where: { id: data.categoryId, userId },
  });
  if (!category) throw new Error("Categoria inválida");

  await prisma.transaction.create({
    data: {
      userId,
      type: data.type,
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      date: dateInputToUTC(data.date),
    },
  });

  revalidatePath("/main/transactions");
  revalidatePath("/main/dashboard");
  revalidatePath("/main/budget");
}

// Atualiza uma transação.
export async function updateTransaction(id: string, input: unknown) {
  const userId = await requireUserId();
  const data = transactionSchema.parse(input);

  const category = await prisma.category.findFirst({
    where: { id: data.categoryId, userId },
  });
  if (!category) throw new Error("Categoria inválida");

  const result = await prisma.transaction.updateMany({
    where: { id, userId },
    data: {
      type: data.type,
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      date: dateInputToUTC(data.date),
    },
  });
  if (result.count === 0) throw new Error("Transação não encontrada");

  revalidatePath("/main/transactions");
  revalidatePath("/main/dashboard");
  revalidatePath("/main/budget");
}

// Remove uma transação.
export async function deleteTransaction(id: string) {
  const userId = await requireUserId();

  const result = await prisma.transaction.deleteMany({ where: { id, userId } });
  if (result.count === 0) throw new Error("Transação não encontrada");

  revalidatePath("/main/transactions");
  revalidatePath("/main/dashboard");
  revalidatePath("/main/budget");
}
