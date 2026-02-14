import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";


export async function AccountsPayable(app: FastifyInstance) {

  // Criar
  app.post('/db/expense', async (request, reply) => {
    // Recebemos os dados (incluindo o userId obrigatório)
    const { userId, name, amount, type, frequency } = request.body as any;

    // Validação básica
    if (!userId || !name || !amount || !type || !frequency) {
      return reply.status(400).send({ error: "Todos os campos (incluindo userId) são obrigatórios" });
    }

    // Salvamos no banco
    try {
      const newExpense = await prisma.accountsPayable.create({
        data: {
          name,
          amount: parseFloat(amount),
          category: type,
          frequency,
          nextDate: new Date(),
          userId: userId,
        },
      });

      return reply.status(201).send(newExpense);

    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Erro ao criar conta a pagar" });
    }
  });


  // Pegar
  app.get('/db/expense/:userId', async (request, reply) => {
    const { userId } = request.params as any;

    const expenses = await prisma.accountsPayable.findMany({
      where: { userId: userId }
    });

    return reply.send(expenses);
  });


  // Atualizar
  app.put('/db/expense/:id', async (request, reply) => {
    const { id } = request.params as any;
    const { name, amount, type, frequency } = request.body as any;

    try {
      const updatedExpense = await prisma.accountsPayable.update({
        where: { id: id },
        data: {
          name,
          amount: parseFloat(amount), // Caso venha string, garante número
          category: type,
          frequency,
        },
      });

      return reply.send(updatedExpense);
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao atualizar." });
    }
  });


  // Deletar
  app.delete('/db/expense/:id', async (request, reply) => {
    const { id } = request.params as any;

    try {
      await prisma.accountsPayable.delete({
        where: { id: id },
      });

      return reply.status(204).send(); // 204 significa "Sucesso, sem conteúdo para retornar"
    } catch (error) {
      return reply.status(500).send({ error: "Erro ao deletar." });
    }
  });
}
