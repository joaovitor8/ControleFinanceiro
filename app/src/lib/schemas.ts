// Schemas Zod compartilhados entre client (RHF) e server (validação de actions).
import { z } from "zod";

// --- Auth ---
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto"),
  email: z.string().trim().toLowerCase().email("Email inválido"),
  password: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});
export type LoginInput = z.infer<typeof loginSchema>;

// --- Goals ---
export const goalIconEnum = z.enum(["target", "plane", "car", "home", "shield"]);
export const goalColorEnum = z.enum(["emerald", "blue", "amber", "purple"]);

export const goalCreateSchema = z.object({
  name: z.string().trim().min(1, "Nome obrigatório"),
  target: z.coerce.number().positive("Valor precisa ser positivo"),
  icon: goalIconEnum.default("target"),
  color: goalColorEnum.default("emerald"),
});
export type GoalCreateInput = z.infer<typeof goalCreateSchema>;

export const goalUpdateSchema = goalCreateSchema;
export type GoalUpdateInput = z.infer<typeof goalUpdateSchema>;

export const goalProgressSchema = z.object({
  amount: z.coerce.number().positive("Valor precisa ser positivo"),
});

// --- Categorias ---
export const categoryTypeEnum = z.enum(["INCOME", "EXPENSE", "BOTH"]);
export type CategoryTypeEnum = z.infer<typeof categoryTypeEnum>;

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Nome obrigatório").max(30, "Nome muito longo"),
  icon: z.string().min(1, "Ícone obrigatório"),
  color: z.string().min(1, "Cor obrigatória"),
  type: categoryTypeEnum.default("EXPENSE"),
});
export type CategoryInput = z.infer<typeof categorySchema>;

// --- Orçamento (Budget) ---
export const budgetSchema = z.object({
  categoryId: z.string().uuid("Categoria inválida"),
  amount: z.coerce.number().positive("Valor precisa ser positivo"),
});
export type BudgetInput = z.infer<typeof budgetSchema>;

// --- Mensalidades ---
export const monthlyFeeFrequencyEnum = z.enum(["Mensal", "Anual"]);

export const monthlyFeeSchema = z.object({
  name: z.string().trim().min(1, "Nome obrigatório"),
  amount: z.coerce.number().positive("Valor precisa ser positivo"),
  categoryId: z.string().uuid("Categoria inválida"),
  frequency: monthlyFeeFrequencyEnum,
  date: z.string().min(1, "Data obrigatória"),
});
export type MonthlyFeeInput = z.infer<typeof monthlyFeeSchema>;

// --- Transações ---
export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE"]);

export const transactionSchema = z.object({
  type: transactionTypeEnum,
  amount: z.coerce.number().positive("Valor precisa ser positivo"),
  description: z.string().trim().min(1, "Descrição obrigatória"),
  categoryId: z.string().uuid("Categoria inválida"),
  date: z.string().min(1, "Data obrigatória"),
});
export type TransactionInput = z.infer<typeof transactionSchema>;
