import { FastifyInstance } from "fastify";


export async function Route(app: FastifyInstance) {

  // Criar
  app.post('/db/transactions', (request: any, reply: any) => {
    // 1. O Backend recebe o "Crachá"
    const authHeader = request.headers.authorization; 
    // (Aqui você usaria o Clerk SDK para validar se o token é real,
    // se for falso, você bloqueia o acesso).

    if (!authHeader) {
      return reply.status(401).send({ error: 'Quem é você? (Sem token)' })
    }

    // 2. Recebe os dados do corpo
    const dados = request.body;
    
    // 3. Salva no Banco (simulação)
    console.log("Recebi os dados:", dados)
    
    // 4. Responde para o Frontend
    return reply.status(201).send({ message: "Recebido e salvo!" })
  });

  app.post('/db/ai-advice', (request: any, reply: any) => {});


  // Pegar
  app.get('/db/transactions', (request: any, reply: any) => {});

  app.get('/db/dashboard', (request: any, reply: any) => {});


  // Atualizar
  app.put('/db/', (request: any, reply: any) => {});


  // Deletar
  app.delete('/db/', (request: any, reply: any) => {});
}
