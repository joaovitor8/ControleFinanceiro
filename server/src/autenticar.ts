import { FastifyInstance } from "fastify";
import { clerkClient } from "@clerk/clerk-sdk-node"; // Importe o cliente


export async function Autenticar(app: FastifyInstance) {

  // Criar
app.post('/db/autenticar', async (request: any, reply: any) => {
    const authHeader = request.headers.authorization; 

    if (!authHeader) {
      return reply.status(401).send({ error: 'Token não fornecido' });
    }

    try {
      // 1. Limpar o prefixo "Bearer " para pegar só o código
      const token = authHeader.split(' ')[1]; 

      // 2. Pedir para o Clerk verificar se esse token é real
      // Isso vai lançar um erro se o token for falso ou expirado
      const decodedToken = await clerkClient.verifyToken(token);
      
      const userId = decodedToken.sub; // Esse é o ID do usuário (user_2b3...)

      // 3. AQUI entra a lógica do Banco de Dados (Prisma)
      // Exemplo: Verificar se o usuário já existe no seu banco, se não, criar.
      console.log("Usuário autenticado:", userId);

      return reply.status(200).send({ 
        message: "Usuário validado e sincronizado!",
        userId: userId 
      });

    } catch (error) {
      console.error(error);
      return reply.status(401).send({ error: 'Token inválido ou expirado' });
    }
  });


  // Pegar
  app.get('/db/', (request: any, reply: any) => {});


  // Atualizar
  app.put('/db/', (request: any, reply: any) => {});


  // Deletar
  app.delete('/db/', (request: any, reply: any) => {});
}
