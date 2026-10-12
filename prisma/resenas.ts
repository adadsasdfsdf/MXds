/**
 * Generador de reseñas simuladas para los productos.
 * Produce entre 10 y 30 reseñas por producto, con autores y comentarios
 * en español mexicano, de forma determinista (misma salida por slug).
 */

const NOMBRES = [
  "María G.",
  "José L.",
  "Guadalupe R.",
  "Juan C.",
  "Alejandra M.",
  "Luis F.",
  "Fernanda S.",
  "Carlos H.",
  "Ana P.",
  "Miguel Á.",
  "Sofía V.",
  "Ricardo T.",
  "Daniela O.",
  "Jorge E.",
  "Paola N.",
  "Roberto D.",
  "Gabriela C.",
  "Francisco J.",
  "Mariana L.",
  "Eduardo R.",
  "Patricia M.",
  "Andrés G.",
  "Verónica S.",
  "Héctor P.",
  "Lucía F.",
  "Raúl M.",
  "Claudia B.",
  "Óscar V.",
  "Diana R.",
  "Sergio A.",
  "Rosa E.",
  "Manuel T.",
  "Karla D.",
  "Alberto N.",
  "Brenda C.",
];

// Comentarios positivos (5 y 4 estrellas) — la mayoría.
const COMENTARIOS_POS = [
  "Excelente calidad, superó mis expectativas. ¡Totalmente recomendado!",
  "Llegó bien empacado y antes de lo esperado. Muy contenta con mi compra.",
  "Hermoso producto, se nota el trabajo artesanal. Lo volvería a comprar.",
  "La calidad es increíble para el precio. Muy buen producto mexicano.",
  "Me encantó, tal cual como en la foto. El envío fue rapidísimo.",
  "Producto auténtico y bien hecho. Apoyando a los artesanos mexicanos. 🇲🇽",
  "Súper bonito, lo compré de regalo y le fascinó. Gran detalle.",
  "Buena atención y el producto llegó en perfecto estado. Recomendadísimo.",
  "La verdad quedé sorprendido con la calidad. Vale cada peso.",
  "Justo lo que buscaba. Materiales de primera y acabado impecable.",
  "Precioso y muy bien elaborado. Se ve que es hecho a mano con cariño.",
  "Compra 100% confiable. Volveré a pedir más cosas de esta tienda.",
  "Me llegó rápido y con descuento. Excelente relación calidad-precio.",
  "Un producto que representa muy bien lo mejor de México. Encantada.",
  "Mejor de lo que esperaba. Los colores son vivos y el acabado perfecto.",
];

// Comentarios neutros/mixtos (3 estrellas) — pocos.
const COMENTARIOS_NEU = [
  "Buen producto en general, aunque el envío tardó un poco más de lo esperado.",
  "Está bonito, pero esperaba que fuera un poco más grande. Aun así, cumple.",
  "Calidad aceptable para el precio. Nada extraordinario pero funciona bien.",
  "El producto está bien, solo que el empaque llegó algo maltratado.",
];

// Comentario ocasional de baja calificación (2 estrellas) — muy pocos.
const COMENTARIOS_BAJO = [
  "El color no es exactamente como en la foto, pero la calidad es decente.",
  "Tardó bastante en llegar. El producto está bien pero el envío mejorable.",
];

export interface ResenaSeed {
  autor: string;
  calificacion: number;
  comentario: string;
  verificada: boolean;
  diasAtras: number;
}

/** PRNG determinista (mulberry32) a partir de una semilla. */
function prng(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Convierte un string en un número semilla. */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Genera entre 10 y 30 reseñas deterministas para un producto (por su slug).
 * ~75% de 5★, ~15% de 4★, ~7% de 3★, ~3% de 2★ (distribución realista).
 */
export function generarResenas(slug: string): ResenaSeed[] {
  const rnd = prng(hash(slug));
  const total = 10 + Math.floor(rnd() * 21); // 10..30
  const resenas: ResenaSeed[] = [];
  const nombresUsados = new Set<string>();

  for (let i = 0; i < total; i++) {
    const r = rnd();
    let calificacion: number;
    let comentario: string;

    if (r < 0.75) {
      calificacion = 5;
      comentario = COMENTARIOS_POS[Math.floor(rnd() * COMENTARIOS_POS.length)];
    } else if (r < 0.9) {
      calificacion = 4;
      comentario = COMENTARIOS_POS[Math.floor(rnd() * COMENTARIOS_POS.length)];
    } else if (r < 0.97) {
      calificacion = 3;
      comentario = COMENTARIOS_NEU[Math.floor(rnd() * COMENTARIOS_NEU.length)];
    } else {
      calificacion = 2;
      comentario =
        COMENTARIOS_BAJO[Math.floor(rnd() * COMENTARIOS_BAJO.length)];
    }

    // Autor único por producto
    let autor = NOMBRES[Math.floor(rnd() * NOMBRES.length)];
    let intentos = 0;
    while (nombresUsados.has(autor) && intentos < NOMBRES.length) {
      autor = NOMBRES[Math.floor(rnd() * NOMBRES.length)];
      intentos++;
    }
    nombresUsados.add(autor);

    resenas.push({
      autor,
      calificacion,
      comentario,
      verificada: rnd() > 0.1, // 90% compras verificadas
      diasAtras: Math.floor(rnd() * 180), // en los últimos 6 meses
    });
  }

  return resenas;
}
