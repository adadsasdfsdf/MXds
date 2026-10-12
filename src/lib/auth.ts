import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-cambialo",
);
const COOKIE_NAME = "sesion";
const EXPIRACION = "7d";

export interface SesionPayload {
  userId: string;
  email: string;
  nombre: string;
  rol: string;
  [key: string]: unknown;
}

/** Crea un JWT firmado con los datos de la sesión. */
export async function crearToken(payload: SesionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRACION)
    .sign(SECRET);
}

/** Verifica un JWT y devuelve el payload, o null si es inválido. */
export async function verificarToken(
  token: string,
): Promise<SesionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as SesionPayload;
  } catch {
    return null;
  }
}

/** Guarda la cookie de sesión (httpOnly). */
export function guardarCookieSesion(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });
}

/** Elimina la cookie de sesión (logout). */
export function borrarCookieSesion() {
  cookies().delete(COOKIE_NAME);
}

/** Obtiene la sesión actual desde la cookie (en Server Components / rutas). */
export async function getSesion(): Promise<SesionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verificarToken(token);
}

export { COOKIE_NAME };
