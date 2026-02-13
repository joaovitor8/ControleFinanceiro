import { clerkClient } from "@clerk/clerk-sdk-node";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

// Rota de Autenticação

export async function Authenticate(app: FastifyInstance) {
  app.post("/db/authenticate", async (request: any, reply: any) => {
    console.log("--- 🏁 RECEBENDO REQUISIÇÃO DE AUTENTICAÇÃO ---");

    const authHeader = request.headers.authorization

    // Validação Básica do Header
    if (!authHeader) {
      console.error("❌ Erro: Header Authorization não encontrado.");
      return reply.status(401).send({ error: "Token não fornecido" });
    }

    try {
      // Extrair o Token (Remove o prefixo 'Bearer ')
      const token = authHeader.split(" ")[1];
      
      if (!token) {
        console.error("❌ Erro: Token veio vazio ou mal formatado.");
        return reply.status(400).send({ error: "Formato de token inválido. Use: Bearer <token>" });
      }

      // Validar Token no Clerk
      const decodedToken = await clerkClient.verifyToken(token);
      const userId = decodedToken.sub; // Esse é o ID do usuário (ex: user_2b...)

      console.log(`👤 Usuário Validado no Clerk: ${userId}`);

      // Verificar se existe no Banco Local (Prisma)
      let user = await prisma.user.findUnique({
        where: { id: userId },
      });

      // Se não existir, CRIA O USUÁRIO (Sincronização)
      if (!user) {
        console.log("🆕 Usuário novo detectado. Buscando dados no Clerk...");

        // Busca o email e nome lá no Clerk para salvar no nosso banco
        const clerkUser = await clerkClient.users.getUser(userId);
        const email = clerkUser.emailAddresses[0]?.emailAddress;

        if (!email) {
            console.error("❌ Erro: Email não encontrado no cadastro do Clerk.");
            return reply.status(400).send({ error: "Email é obrigatório." });
        }

        // Cria no banco
        user = await prisma.user.create({
          data: {
            id: userId,
            email: email,
            name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          },
        });
        
        console.log("✅ Usuário criado no banco com sucesso!");
      } else {
        console.log("✅ Usuário já existia no banco.");
      }

      console.log("--- 🏁 FIM DO PROCESSO ---\n");

      // Retorna o usuário para o Front
      return reply.status(200).send({ 
        message: "Sincronizado",
        user: user 
      });

    } catch (error) {
      console.error("🔥 ERRO FATAL NO SERVIDOR:", error);
      return reply.status(500).send({ 
        error: "Erro interno no servidor", 
        details: String(error) 
      });
    }
  });
}
