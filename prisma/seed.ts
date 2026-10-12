import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { CATALOGO_COMPLETO } from "./productos";

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

  // Productos (catálogo completo)
  for (const p of CATALOGO_COMPLETO) {
    await prisma.producto.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`📦 ${CATALOGO_COMPLETO.length} productos sembrados`);

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
