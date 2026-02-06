import { clerkClient } from "@clerk/clerk-sdk-node";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export async function Expenses(app: FastifyInstance) {

  // Criar
  app.post('/db/expense', (request: any, reply: any) => {
    const { name, amount, type, frequency } = request.body;

    // Aqui você pode adicionar validação dos dados antes de salvar no banco
    if (!name || !amount || !type || !frequency) {
      return reply.status(400).send({ error: "Todos os campos são obrigatórios" });
    }

    prisma.expense.create({
      data: {
        name,
        amount: parseFloat(amount),
        type,
        frequency, 
      },
    })
    .then((expense) => {
      reply.status(201).send(expense);
    })
    .catch((error) => {
      reply.status(500).send({ error: "Erro ao criar despesa" });
    });
  });


  // Pegar
  app.get('/db/', (request: any, reply: any) => {});


  // Atualizar
  app.put('/db/expenses', (request: any, reply: any) => {});


  // Deletar
  app.delete('/db/', (request: any, reply: any) => {});
}
