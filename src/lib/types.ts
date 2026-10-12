/** Tipos de dominio del catálogo y el carrito. */

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  /** Precio en pesos mexicanos, IVA incluido. */
  precio: number;
  /** Precio anterior para mostrar descuento (opcional). */
  precioAnterior?: number;
  categoria: Categoria;
  imagen: string;
  /** Existencias disponibles. */
  stock: number;
  /** Origen/estado de México del producto artesanal. */
  origen?: string;
  destacado?: boolean;
}

export type Categoria =
  | "artesanias"
  | "ropa"
  | "alimentos"
  | "hogar"
  | "belleza"
  | "joyeria"
  | "juguetes"
  | "bebidas"
  | "libros"
  | "mascotas"
  | "electronica"
  | "deportes";

export interface CategoriaInfo {
  id: Categoria;
  nombre: string;
  descripcion: string;
  emoji: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
