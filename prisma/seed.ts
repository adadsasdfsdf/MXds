import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { CATALOGO_COMPLETO } from "./productos";
import { generarResenas } from "./resenas";

const prisma = new PrismaClient();

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

  // Productos + reseñas
  let totalResenas = 0;
  for (const prod of CATALOGO_COMPLETO) {
    const creado = await prisma.producto.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });

    // Regenerar reseñas solo si el producto no tiene.
    const existentes = await prisma.resena.count({
      where: { productoId: creado.id },
    });
    if (existentes === 0) {
      const resenas = generarResenas(prod.slug);
      await prisma.resena.createMany({
        data: resenas.map((r) => ({
          productoId: creado.id,
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
  console.log(`📦 ${CATALOGO_COMPLETO.length} productos sembrados`);
  console.log(`💬 ${totalResenas} reseñas generadas`);

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
