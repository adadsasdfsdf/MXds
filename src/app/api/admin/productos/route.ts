import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const productoSchema = z.object({
  nombre: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug inválido (usa minúsculas, números y guiones)"),
  descripcion: z.string().min(5),
  precio: z.number().positive(),
  precioAnterior: z.number().positive().optional().nullable(),
  categoria: z.enum([
    "artesanias",
    "ropa",
    "alimentos",
    "bebidas",
    "hogar",
    "belleza",
    "joyeria",
    "juguetes",
    "libros",
    "deportes",
    "mascotas",
    "electronica",
  ]),
  imagen: z.string().url(),
  stock: z.number().int().nonnegative(),
  origen: z.string().optional().nullable(),
  destacado: z.boolean().optional().default(false),
});

/** Lista todos los productos (incluye inactivos) para el admin. */
export async function GET() {
  const productos = await prisma.producto.findMany({
    orderBy: { creadoEn: "desc" },
  });
  return NextResponse.json({ productos });
}

/** Crea un producto. */
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = productoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 },
    );
  }
  const d = parsed.data;

  const existente = await prisma.producto.findUnique({
    where: { slug: d.slug },
  });
  if (existente) {
    return NextResponse.json(
      { error: "Ya existe un producto con ese slug" },
      { status: 409 },
    );
  }

  const producto = await prisma.producto.create({
    data: {
      nombre: d.nombre,
      slug: d.slug,
      descripcion: d.descripcion,
      precioCentavos: Math.round(d.precio * 100),
      precioAnteriorCentavos: d.precioAnterior
        ? Math.round(d.precioAnterior * 100)
        : null,
      categoria: d.categoria,
      imagen: d.imagen,
      stock: d.stock,
      origen: d.origen || null,
      destacado: d.destacado ?? false,
    },
  });
  return NextResponse.json({ producto });
}
