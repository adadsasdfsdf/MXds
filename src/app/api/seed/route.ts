import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { CATALOGO_COMPLETO } from "../../../../prisma/productos";

/**
 * Endpoint para sembrar/actualizar el catálogo tras el despliegue.
 * Protegido con un token: visita /api/seed?token=TU_SEED_TOKEN
 * (configura SEED_TOKEN en las variables de entorno de Vercel).
 *
 * Usa upsert por slug, así que es seguro ejecutarlo varias veces:
 * agrega los productos nuevos y actualiza los existentes.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Usuarios de prueba
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.usuario.upsert({
    where: { email: "admin@tiendamexicana.mx" },
    update: {},
    create: {
      nombre: "Administrador",
      email: "admin@tiendamexicana.mx",
      password: adminPassword,
      rol: "admin",
    },
  });

  const clientePassword = await bcrypt.hash("cliente123", 10);
  await prisma.usuario.upsert({
    where: { email: "cliente@ejemplo.mx" },
    update: {},
    create: {
      nombre: "María García",
      email: "cliente@ejemplo.mx",
      password: clientePassword,
      rol: "cliente",
    },
  });

  // Catálogo completo (upsert por slug)
  let creados = 0;
  let actualizados = 0;
  for (const p of CATALOGO_COMPLETO) {
    const existente = await prisma.producto.findUnique({
      where: { slug: p.slug },
    });
    await prisma.producto.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    if (existente) actualizados++;
    else creados++;
  }

  return NextResponse.json({
    ok: true,
    mensaje: `Catálogo sincronizado: ${creados} creados, ${actualizados} actualizados (total ${CATALOGO_COMPLETO.length}).`,
    admin: "admin@tiendamexicana.mx / admin123",
  });
}
