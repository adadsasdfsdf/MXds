import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verificarToken, COOKIE_NAME } from "@/lib/auth";

/**
 * Protege las rutas /admin y /api/admin: solo usuarios con rol "admin".
 * Se ejecuta en el edge antes de renderizar la ruta.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const sesion = token ? await verificarToken(token) : null;

  const esAdmin = sesion?.rol === "admin";
  const ruta = request.nextUrl.pathname;

  if (!esAdmin) {
    if (ruta.startsWith("/api/admin")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    // Redirigir a login con retorno a la ruta solicitada.
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", ruta);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
