import { FastifyInstance } from "fastify";


export async function Route(app: FastifyInstance) {

  // Criar
  app.post('/db/transactions', (request: any, reply: any) => {});

  app.post('/db/ai-advice', (request: any, reply: any) => {});


  // Pegar
  app.get('/db/transactions', (request: any, reply: any) => {});

  app.get('/db/dashboard', (request: any, reply: any) => {});


  // Atualizar
  app.put('/db/', (request: any, reply: any) => {});


  // Deletar
  app.delete('/db/', (request: any, reply: any) => {});
}
