import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
    categoria: "hogar",
    imagen:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    stock: 20,
    origen: "Puebla",
  },
  {
    slug: "jabon-de-nopal",
    nombre: "Jabón Artesanal de Nopal",
    descripcion:
      "Jabón natural de nopal y aloe vera, ideal para pieles sensibles. Sin parabenos.",
    precioCentavos: 7900,
    categoria: "belleza",
    imagen:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80",
    stock: 100,
    origen: "Jalisco",
  },
  {
    slug: "sarape-saltillo",
    nombre: "Sarape de Saltillo",
    descripcion:
      "Sarape tejido en telar con los colores vibrantes característicos de Saltillo.",
    precioCentavos: 115000,
    categoria: "ropa",
    imagen:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    stock: 15,
    origen: "Coahuila",
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
    categoria: "hogar",
    imagen:
      "https://images.unsplash.com/photo-1595408076683-5d0c643e4f78?w=800&q=80",
    stock: 25,
    origen: "Guerrero",
  },
];

async function main() {
  console.log("🌱 Sembrando la base de datos...");

  // Usuario administrador por defecto
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
  console.log("👤 Admin: admin@tiendamexicana.mx / admin123");

  // Cliente de ejemplo
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
  console.log("👤 Cliente: cliente@ejemplo.mx / cliente123");

  // Productos
  for (const p of productos) {
    await prisma.producto.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`📦 ${productos.length} productos sembrados`);

  console.log("✅ Listo!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
