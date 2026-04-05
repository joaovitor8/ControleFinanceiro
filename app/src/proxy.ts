import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/src/lib/auth';


// Defina quais páginas são públicas (não precisam de login)
const publicRoutes = ['/login', '/register', '/'];
// Defina rotas exclusivas para quem NÃO está logado ( Se o usuário já está logado, ele não deve conseguir acessar a tela de login de novo )
const authRoutes = ['/login', '/register'];


export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Pega o token de dentro dos cookies
  const token = request.cookies.get('auth_token')?.value;

  // Verifica se o token é verdadeiro e válido usando a nossa função da "jose"
  const payload = token ? await verifyToken(token) : null;
  const isAuthenticated = !!payload;


  // Se for uma requisição para a sua API (ex: /api/db/goals) e não estiver logado, retorna erro 401
  if (path.startsWith('/api/') && !path.startsWith('/api/auth')) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Lógica para as páginas do Frontend
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  // Se a rota for privada e ele não tiver logado, manda para o Login
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se a rota for de Login/Registro e ele JÁ estiver logado, o redireciona para ou outra página privada que eu queira
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url)); 
  }

  return NextResponse.next();
}

// Configuração de quais rotas o Next.js deve ignorar e não passar por este arquivo
export const config = {
  matcher: [
    /*
     * Ignora arquivos estáticos, imagens e rotas internas do Next para não pesar o sistema:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - Arquivos com extensão (ex: .png, .css)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
