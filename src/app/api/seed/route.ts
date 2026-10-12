import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * Endpoint para sembrar datos de ejemplo UNA sola vez tras el despliegue.
 * Protegido con un token: visita /api/seed?token=TU_SEED_TOKEN
 * (configura SEED_TOKEN en las variables de entorno de Vercel).
 *
 * Es idempotente: si ya hay productos, no vuelve a sembrar.
 */

const productos = [
  {
    slug: "alebrije-oaxaqueno",
    nombre: "Alebrije Oaxaqueño",
    descripcion:
      "Figura de madera tallada y pintada a mano por artesanos de Oaxaca. Cada pieza es única.",
    precioCentavos: 129900,
    precioAnteriorCentavos: 159900,
    categoria: "artesanias",
    imagen:
      "https://images.unsplash.com/photo-1596463059283-da257325bab8?w=800&q=80",
    stock: 12,
    origen: "Oaxaca",
    destacado: true,
  },
  {
    slug: "huipil-bordado",
    nombre: "Huipil Bordado a Mano",
    descripcion:
      "Blusa tradicional con bordados florales multicolor, técnica heredada por generaciones.",
    precioCentavos: 89000,
    precioAnteriorCentavos: null,
    categoria: "ropa",
    imagen:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    stock: 8,
    origen: "Chiapas",
    destacado: true,
  },
  {
    slug: "salsa-macha-artesanal",
    nombre: "Salsa Macha Artesanal (250g)",
    descripcion:
      "Salsa macha con chile de árbol, cacahuate y ajonjolí. Picor medio, sabor intenso.",
    precioCentavos: 14900,
    precioAnteriorCentavos: null,
    categoria: "alimentos",
    imagen:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&q=80",
    stock: 50,
    origen: "Veracruz",
    destacado: true,
  },
  {
    slug: "talavera-poblana-set",
    nombre: "Set de Talavera Poblana",
    descripcion:
      "Juego de 4 tazas de cerámica Talavera auténtica de Puebla, pintadas a mano.",
    precioCentavos: 74900,
    precioAnteriorCentavos: null,
    categoria: "hogar",
    imagen:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    stock: 20,
    origen: "Puebla",
    destacado: false,
  },
  {
    slug: "jabon-de-nopal",
    nombre: "Jabón Artesanal de Nopal",
    descripcion:
      "Jabón natural de nopal y aloe vera, ideal para pieles sensibles. Sin parabenos.",
    precioCentavos: 7900,
    precioAnteriorCentavos: null,
    categoria: "belleza",
    imagen:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80",
    stock: 100,
    origen: "Jalisco",
    destacado: false,
  },
  {
    slug: "sarape-saltillo",
    nombre: "Sarape de Saltillo",
    descripcion:
      "Sarape tejido en telar con los colores vibrantes característicos de Saltillo.",
    precioCentavos: 115000,
    precioAnteriorCentavos: null,
    categoria: "ropa",
    imagen:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    stock: 15,
    origen: "Coahuila",
    destacado: false,
  },
  {
    slug: "cafe-chiapas-500g",
    nombre: "Café de Chiapas en Grano (500g)",
    descripcion:
      "Café de altura orgánico, tostado medio, notas de chocolate y frutos rojos.",
    precioCentavos: 21900,
    precioAnteriorCentavos: 25900,
    categoria: "alimentos",
    imagen:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    stock: 40,
    origen: "Chiapas",
    destacado: true,
  },
  {
    slug: "canasta-tejida",
    nombre: "Canasta Tejida de Palma",
    descripcion:
      "Canasta multiusos tejida a mano con palma natural. Resistente y ecológica.",
    precioCentavos: 32900,
    precioAnteriorCentavos: null,
    categoria: "hogar",
    imagen:
      "https://images.unsplash.com/photo-1595408076683-5d0c643e4f78?w=800&q=80",
    stock: 25,
    origen: "Guerrero",
    destacado: false,
  },
];

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const yaHay = await prisma.producto.count();
  if (yaHay > 0) {
    return NextResponse.json({
      ok: true,
      mensaje: `La base de datos ya tiene ${yaHay} productos. No se sembró de nuevo.`,
    });
  }

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

  for (const p of productos) {
    await prisma.producto.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  return NextResponse.json({
    ok: true,
    mensaje: `Sembrados ${productos.length} productos y 2 usuarios.`,
    admin: "admin@tiendamexicana.mx / admin123",
  });
}
