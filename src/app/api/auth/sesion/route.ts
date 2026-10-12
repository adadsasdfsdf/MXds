import { NextResponse } from "next/server";
import { getSesion } from "@/lib/auth";

export async function GET() {
  const sesion = await getSesion();
  if (!sesion) {
    return NextResponse.json({ usuario: null });
  }
  return NextResponse.json({
    usuario: {
      id: sesion.userId,
      nombre: sesion.nombre,
      email: sesion.email,
      rol: sesion.rol,
    },
  });
}
