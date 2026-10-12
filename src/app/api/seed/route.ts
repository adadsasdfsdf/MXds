import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { CATALOGO_COMPLETO } from "../../../../prisma/productos";
import { generarResenas } from "../../../../prisma/resenas";

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

  // Catálogo completo (upsert por slug) + reseñas
  let creados = 0;
  let actualizados = 0;
  let totalResenas = 0;
  for (const prod of CATALOGO_COMPLETO) {
    const existente = await prisma.producto.findUnique({
      where: { slug: prod.slug },
    });
    const guardado = await prisma.producto.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
    if (existente) actualizados++;
    else creados++;

    // Generar reseñas solo si el producto aún no tiene.
    const tieneResenas = await prisma.resena.count({
      where: { productoId: guardado.id },
    });
    if (tieneResenas === 0) {
      const resenas = generarResenas(prod.slug);
      await prisma.resena.createMany({
        data: resenas.map((r) => ({
          productoId: guardado.id,
          autor: r.autor,
          calificacion: r.calificacion,
          comentario: r.comentario,
          verificada: r.verificada,
          creadoEn: new Date(Date.now() - r.diasAtras * 86400000),
        })),
      });
      totalResenas += resenas.length;
    }
  }

  return NextResponse.json({
    ok: true,
    mensaje: `Catálogo sincronizado: ${creados} creados, ${actualizados} actualizados (total ${CATALOGO_COMPLETO.length}). Reseñas generadas: ${totalResenas}.`,
    admin: "admin@tiendamexicana.mx / admin123",
  });
}
