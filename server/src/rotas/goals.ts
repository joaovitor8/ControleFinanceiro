import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../middlewares/verify-token";

export async function GoalsRoutes(app: FastifyInstance) {
  
  // 1. LISTAR METAS DO USUÁRIO
  app.get("/db/goals", { preHandler: [verifyToken] }, async (request) => {
    const userId = (request as any).user_id;

    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return goals;
  });

  // 2. CRIAR NOVA META
  app.post("/db/goals", { preHandler: [verifyToken] }, async (request, reply) => {
    const createGoalSchema = z.object({
      name: z.string(),
      target: z.number(),
      current: z.number().optional().default(0),
      icon: z.string().optional(),
      color: z.string().optional(),
    });

    const body = createGoalSchema.parse(request.body);
    const userId = (request as any).user_id;

    const goal = await prisma.goal.create({
      data: {
        userId,
        name: body.name,
        target: body.target,
        current: body.current,
        icon: body.icon || "target",
        color: body.color || "emerald"
      }
    });

    return reply.status(201).send(goal);
  });

  // 3. ADICIONAR VALOR À META (Depositar)
  app.patch("/db/goals/:id/add", { preHandler: [verifyToken] }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string() });
    const bodySchema = z.object({ amount: z.number() });

    const { id } = paramsSchema.parse(request.params);
    const { amount } = bodySchema.parse(request.body);

    const goal = await prisma.goal.update({
      where: { id },
      data: {
        current: { increment: amount }
      }
    });

    return goal;
  });
}
