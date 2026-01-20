import { FastifyInstance } from "fastify";


export async function Route(app: FastifyInstance) {

  // Criar
  app.post('/db/', (request: any, reply: any) => {});


  // Pegar
  app.get('/db/', (request: any, reply: any) => {});


  // Atualizar
  app.put('/db/', (request: any, reply: any) => {});


  // Deletar
  app.delete('/db/', (request: any, reply: any) => {});
}
