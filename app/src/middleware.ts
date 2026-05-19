import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/src/lib/auth";

// Rotas públicas (sem login)
const publicRoutes = ["/login", "/register", "/"];
// Rotas exclusivas de quem NÃO está logado
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token")?.value;
  const payload = token ? await verifyToken(token) : null;
  const isAuthenticated = !!payload;

  // API: bloqueia tudo fora de /api/auth quando não logado
  if (path.startsWith("/api/") && !path.startsWith("/api/auth")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  // Rota privada sem login → manda pro login
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Login/register estando logado → manda pro dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Ignora assets estáticos e arquivos com extensão
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
