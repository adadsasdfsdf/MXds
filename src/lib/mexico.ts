/**
 * Utilidades de localización para el mercado mexicano 🇲🇽
 * - Moneda: Peso mexicano (MXN)
 * - Impuesto: IVA 16%
 * - Formatos de fecha y teléfono locales
 */

/** Tasa del IVA (Impuesto al Valor Agregado) en México. */
export const IVA_RATE = 0.16;

/** Umbral de envío gratis en pesos mexicanos. */
export const FREE_SHIPPING_THRESHOLD = 999;

/** Costo de envío estándar en pesos mexicanos. */
export const STANDARD_SHIPPING_COST = 99;

/**
 * Formatea un número como precio en pesos mexicanos.
 * Ejemplo: 1234.5 -> "$1,234.50 MXN"
 */
export function formatMXN(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Calcula el IVA (16%) a partir de un precio que YA incluye impuesto. */
export function ivaIncluido(precioConIva: number): number {
  // precioConIva = base * (1 + IVA) => base = precioConIva / (1 + IVA)
  const base = precioConIva / (1 + IVA_RATE);
  return precioConIva - base;
}

/** Calcula el IVA (16%) a sumar sobre una base sin impuesto. */
export function calcularIva(base: number): number {
  return base * IVA_RATE;
}

/** Determina el costo de envío según el subtotal. */
export function costoEnvio(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
}

/** Formatea una fecha al estilo mexicano (es-MX). */
export function formatFecha(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Valida un código postal mexicano (5 dígitos). */
export function esCodigoPostalValido(cp: string): boolean {
  return /^\d{5}$/.test(cp.trim());
}

/** Métodos de pago comunes en México. */
export const METODOS_PAGO = [
  {
    id: "tarjeta",
    nombre: "Tarjeta de crédito/débito",
    descripcion: "Visa, Mastercard, American Express",
  },
  {
    id: "oxxo",
    nombre: "Pago en efectivo (OXXO)",
    descripcion: "Paga en tu tienda OXXO más cercana",
  },
  {
    id: "spei",
    nombre: "Transferencia SPEI",
    descripcion: "Transferencia bancaria interbancaria",
  },
  {
    id: "mercadopago",
    nombre: "Mercado Pago",
    descripcion: "Paga con tu saldo o meses sin intereses",
  },
] as const;

/** Lista de los 32 estados de la República Mexicana. */
export const ESTADOS_MEXICO = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
] as const;
