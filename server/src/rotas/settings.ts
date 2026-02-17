import { FastifyInstance } from "fastify";


// Rota da pagina de congigurações

export async function Settings(app: FastifyInstance) {

  // Criar
  app.post('/db/settings', (request: any, reply: any) => {});


  // Pegar
  app.get('/db/settings', (request: any, reply: any) => {});

  app.get('/db/settings/:id', (request: any, reply: any) => {});


  // Atualizar
  app.put('/db/settings', (request: any, reply: any) => {});


  // Deletar
  app.delete('/db/settings', (request: any, reply: any) => {});
}
