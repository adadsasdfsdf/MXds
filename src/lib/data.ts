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
    id: "bebidas",
    nombre: "Bebidas",
    descripcion: "Mezcal, café, cacao y más",
    emoji: "🍹",
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
  {
    id: "joyeria",
    nombre: "Joyería",
    descripcion: "Plata de Taxco y piezas artesanales",
    emoji: "💍",
  },
  {
    id: "juguetes",
    nombre: "Juguetes",
    descripcion: "Juguetes tradicionales y para niños",
    emoji: "🪅",
  },
  {
    id: "libros",
    nombre: "Libros y Música",
    descripcion: "Literatura y música mexicana",
    emoji: "📚",
  },
  {
    id: "deportes",
    nombre: "Deportes",
    descripcion: "Artículos deportivos y aire libre",
    emoji: "⚽",
  },
  {
    id: "mascotas",
    nombre: "Mascotas",
    descripcion: "Todo para tus compañeros",
    emoji: "🐾",
  },
  {
    id: "electronica",
    nombre: "Electrónica",
    descripcion: "Gadgets y accesorios",
    emoji: "📱",
  },
];

/** Devuelve los metadatos de una categoría por su id. */
export function getCategoria(id: string): CategoriaInfo | undefined {
  return CATEGORIAS.find((c) => c.id === id);
}

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
    take: 10,
  });
  return productos.map(mapProducto);
}

/** Busca productos por texto en nombre o descripción. */
export async function buscarProductos(query: string): Promise<Producto[]> {
  const q = query.trim();
  if (!q) return [];
  const productos = await prisma.producto.findMany({
    where: {
      activo: true,
      OR: [
        { nombre: { contains: q, mode: "insensitive" } },
        { descripcion: { contains: q, mode: "insensitive" } },
        { origen: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { nombre: "asc" },
  });
  return productos.map(mapProducto);
}
