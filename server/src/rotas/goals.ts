import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { verifyToken } from "../middlewares/verify-token";

export async function GoalsRoutes(app: FastifyInstance) {


  // Pegar todas as metas do usuário logado
  app.get("/db/goals", { preHandler: [verifyToken] }, async (request) => {
    const userId = (request as any).user_id;

    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return goals;
  });


  // Criar nova meta
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


  // Atualizar progresso da meta
  app.put("/db/goals/:id/progress", { preHandler: [verifyToken] }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string() });
    const bodySchema = z.object({
      current: z.number()
    });

    const { id } = paramsSchema.parse(request.params);
    const data = bodySchema.parse(request.body);
    const userId = (request as any).user_id;

    const goal = await prisma.goal.update({
      where: { id: id, userId: userId },
      data: {
        current: data.current
      }
    });

    return goal;
  });


  // Atualizar meta existente
  app.put("/db/goals/:id", { preHandler: [verifyToken] }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string() });
    const bodySchema = z.object({
      name: z.string(),
      target: z.number(),
      icon: z.string(),
      color: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);
    const data = bodySchema.parse(request.body);
    const userId = (request as any).user_id;

    const goal = await prisma.goal.update({
      where: { id: id, userId: userId },
      data: {
        name: data.name,
        target: data.target,
        icon: data.icon,
        color: data.color
      }
    });

    return goal;
  });


  // Deletar meta
  app.delete("/db/goals/:id", { preHandler: [verifyToken] }, async (request, reply) => {
    const paramsSchema = z.object({ id: z.string() });
    const { id } = paramsSchema.parse(request.params);
    const userId = (request as any).user_id;

    await prisma.goal.delete({
      where: { id: id, userId: userId }
    });

    return reply.status(204).send();
  });

}
