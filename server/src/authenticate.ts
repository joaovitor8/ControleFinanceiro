import { clerkClient } from "@clerk/clerk-sdk-node";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";


// Rota de Autenticação

export async function Authenticate(app: FastifyInstance) {
  app.post("/db/authenticate", async (request: any, reply: any) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ error: "Token não fornecido" });
    }

    const freeRole = await prisma.roles.findUnique({
    where: { name: 'FREE' }
    })

    if (!freeRole) throw new Error("Rode o seed primeiro!")

    try {
      // 1. Validar Token no Clerk
      const token = authHeader.split(" ")[1];
      const decodedToken = await clerkClient.verifyToken(token);
      const userId = decodedToken.sub; // ID único do Clerk (ex: user_2b3...)

      // 2. Verificar se o usuário já existe no PostgreSQL
      let user = await prisma.user.findUnique({
        where: { id: userId }, // O ID do Clerk será o mesmo ID do seu banco
      });

      // 3. Se não existir, criar (Sincronização)
      if (!user) {
        console.log("Usuário novo detectado. Sincronizando...");

        // Buscamos os detalhes completos no Clerk para pegar o email
        const clerkUser = await clerkClient.users.getUser(userId);
        const email = clerkUser.emailAddresses[0]?.emailAddress;

        if (!email) {
          return reply
            .status(400)
            .send({ error: "Email é obrigatório no Clerk." });
        }

        // Criamos no Banco Local
        user = await prisma.user.create({
          data: {
            id: userId, // Usamos o ID do Clerk como chave primária
            email: email,
            name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),

            userRoles: {
              create: {
                roleId: freeRole.id // Conecta ao ID do cargo FREE
              }
            }
          },
        });
      }

      console.log("Usuário autenticado e sincronizado:", user.id);

      // 4. Retornar os dados do seu banco para o frontend
      return reply.status(200).send({
        message: "Autenticado com sucesso",
        user: user, // Retorna o objeto do banco (com roles, etc, se tiver)
      });
    } catch (error) {
      console.error(error);
      return reply
        .status(401)
        .send({ error: "Token inválido ou erro na sincronização" });
    }
  });
}
