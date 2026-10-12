import type { Categoria, CategoriaInfo, Producto } from "./types";
import { prisma } from "./prisma";
import type { Producto as ProductoDB } from "@prisma/client";

/** Metadatos de las categorías (estáticos). */
export const CATEGORIAS: CategoriaInfo[] = [
  {
    id: "artesanias",
    nombre: "Artesanías",
    descripcion: "Hechas a mano por artesanos mexicanos",
    emoji: "🎨",
  },
  {
    id: "ropa",
    nombre: "Ropa",
    descripcion: "Textiles y moda tradicional",
    emoji: "👕",
  },
  {
    id: "alimentos",
    nombre: "Alimentos",
    descripcion: "Sabores auténticos de México",
    emoji: "🌶️",
  },
  {
    id: "hogar",
    nombre: "Hogar",
    descripcion: "Decoración y artículos para el hogar",
    emoji: "🏠",
  },
  {
    id: "belleza",
    nombre: "Belleza",
    descripcion: "Cuidado personal con ingredientes naturales",
    emoji: "💄",
  },
];

/** Convierte un producto de la base de datos (centavos) al tipo de dominio (pesos). */
export function mapProducto(p: ProductoDB): Producto {
  return {
    id: p.id,
    slug: p.slug,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precioCentavos / 100,
    precioAnterior: p.precioAnteriorCentavos
      ? p.precioAnteriorCentavos / 100
      : undefined,
    categoria: p.categoria as Categoria,
    imagen: p.imagen,
    stock: p.stock,
    origen: p.origen ?? undefined,
    destacado: p.destacado,
  };
}

/** Devuelve todos los productos activos. */
export async function getProductos(): Promise<Producto[]> {
  const productos = await prisma.producto.findMany({
    where: { activo: true },
    orderBy: { creadoEn: "desc" },
  });
  return productos.map(mapProducto);
}

/** Busca un producto por su slug. */
export async function getProductoPorSlug(
  slug: string,
): Promise<Producto | undefined> {
  const p = await prisma.producto.findUnique({ where: { slug } });
  return p && p.activo ? mapProducto(p) : undefined;
}

/** Devuelve los productos de una categoría. */
export async function getProductosPorCategoria(
  categoria: string,
): Promise<Producto[]> {
  const productos = await prisma.producto.findMany({
    where: { categoria, activo: true },
    orderBy: { creadoEn: "desc" },
  });
  return productos.map(mapProducto);
}

/** Devuelve los productos destacados para la página de inicio. */
export async function getProductosDestacados(): Promise<Producto[]> {
  const productos = await prisma.producto.findMany({
    where: { destacado: true, activo: true },
    take: 8,
  });
  return productos.map(mapProducto);
}
