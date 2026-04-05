import { SignJWT, jwtVerify } from "jose";

// Pega a chave secreta do arquivo .env
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("A variável de ambiente JWT_SECRET não está definida.");
  }
  return new TextEncoder().encode(secret);
};

// Função para CRIAR o token quando o usuário faz login
export async function signToken(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" }) // Algoritmo de criptografia
    .setIssuedAt() // Data de criação
    .setExpirationTime("7d") // O token vai durar 7 dias até o usuário precisar logar de novo
    .sign(getJwtSecretKey());
  
  return token;
}

// Função para LER o token e ver se é válido (vamos usar isso nas rotas e middleware)
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as { userId: string }; 
  } catch (error) {
    // Se o token for falso, alterado ou estiver expirado, ele cai aqui
    return null; 
  }
}
