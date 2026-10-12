import type { CategoriaInfo, Producto } from "./types";

/**
 * Datos de ejemplo del catálogo. En producción esto vendría de una base de
 * datos (PostgreSQL, etc.) o de un CMS/headless commerce (Medusa, Shopify).
 */

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

export const PRODUCTOS: Producto[] = [
  {
    id: "1",
    slug: "alebrije-oaxaqueno",
    nombre: "Alebrije Oaxaqueño",
    descripcion:
      "Figura de madera tallada y pintada a mano por artesanos de Oaxaca. Cada pieza es única.",
    precio: 1299.0,
    precioAnterior: 1599.0,
    categoria: "artesanias",
    imagen:
      "https://images.unsplash.com/photo-1596463059283-da257325bab8?w=800&q=80",
    stock: 12,
    origen: "Oaxaca",
    destacado: true,
  },
  {
    id: "2",
    slug: "huipil-bordado",
    nombre: "Huipil Bordado a Mano",
    descripcion:
      "Blusa tradicional con bordados florales multicolor, técnica heredada por generaciones.",
    precio: 890.0,
    categoria: "ropa",
    imagen:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    stock: 8,
    origen: "Chiapas",
    destacado: true,
  },
  {
    id: "3",
    slug: "salsa-macha-artesanal",
    nombre: "Salsa Macha Artesanal (250g)",
    descripcion:
      "Salsa macha con chile de árbol, cacahuate y ajonjolí. Picor medio, sabor intenso.",
    precio: 149.0,
    categoria: "alimentos",
    imagen:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&q=80",
    stock: 50,
    origen: "Veracruz",
    destacado: true,
  },
  {
    id: "4",
    slug: "talavera-poblana-set",
    nombre: "Set de Talavera Poblana",
    descripcion:
      "Juego de 4 tazas de cerámica Talavera auténtica de Puebla, pintadas a mano.",
    precio: 749.0,
    categoria: "hogar",
    imagen:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    stock: 20,
    origen: "Puebla",
  },
  {
    id: "5",
    slug: "jabon-de-nopal",
    nombre: "Jabón Artesanal de Nopal",
    descripcion:
      "Jabón natural de nopal y aloe vera, ideal para pieles sensibles. Sin parabenos.",
    precio: 79.0,
    categoria: "belleza",
    imagen:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80",
    stock: 100,
    origen: "Jalisco",
  },
  {
    id: "6",
    slug: "sarape-saltillo",
    nombre: "Sarape de Saltillo",
    descripcion:
      "Sarape tejido en telar con los colores vibrantes característicos de Saltillo.",
    precio: 1150.0,
    categoria: "ropa",
    imagen:
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    stock: 15,
    origen: "Coahuila",
  },
  {
    id: "7",
    slug: "cafe-chiapas-500g",
    nombre: "Café de Chiapas en Grano (500g)",
    descripcion:
      "Café de altura orgánico, tostado medio, notas de chocolate y frutos rojos.",
    precio: 219.0,
    precioAnterior: 259.0,
    categoria: "alimentos",
    imagen:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
    stock: 40,
    origen: "Chiapas",
    destacado: true,
  },
  {
    id: "8",
    slug: "canasta-tejida",
    nombre: "Canasta Tejida de Palma",
    descripcion:
      "Canasta multiusos tejida a mano con palma natural. Resistente y ecológica.",
    precio: 329.0,
    categoria: "hogar",
    imagen:
      "https://images.unsplash.com/photo-1595408076683-5d0c643e4f78?w=800&q=80",
    stock: 25,
    origen: "Guerrero",
  },
];

/** Busca un producto por su slug. */
export function getProductoPorSlug(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug);
}

/** Devuelve los productos de una categoría. */
export function getProductosPorCategoria(categoria: string): Producto[] {
  return PRODUCTOS.filter((p) => p.categoria === categoria);
}

/** Devuelve los productos destacados para la página de inicio. */
export function getProductosDestacados(): Producto[] {
  return PRODUCTOS.filter((p) => p.destacado);
}
