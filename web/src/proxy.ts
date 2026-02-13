// Arquivo de projeção de rotas com Clerk

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Defina quais rotas são PÚBLICAS (Login, Cadastro e Webhooks)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/db/authenticate' // Importante para o AuthSync funcionar
]);


export default clerkMiddleware(async (auth, request) => {
  
  // Se NÃO for pública, protege
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Padrão do Next.js para ignorar arquivos estáticos
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Sempre rodar para rotas de API
    "/(api|trpc)(.*)",
  ],
};
