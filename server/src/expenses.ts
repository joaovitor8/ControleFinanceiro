import { clerkClient } from "@clerk/clerk-sdk-node";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


export async function Expenses(app: FastifyInstance) {

  // Criar
  app.post('/db/', (request: any, reply: any) => {});


  // Pegar
  app.get('/db/', (request: any, reply: any) => {});


  // Atualizar
  app.put('/db/expenses', (request: any, reply: any) => {});


  // Deletar
  app.delete('/db/', (request: any, reply: any) => {});
}
