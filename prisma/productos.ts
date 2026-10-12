/**
 * Catálogo de productos de ejemplo para Mexlindo.
 * Precios en centavos (IVA incluido). Todos con precio anterior para mostrar
 * el descuento.
 *
 * Las imágenes usan LoremFlickr con palabras clave temáticas por producto
 * y categoría (https://loremflickr.com/800/800/{keywords}?lock={n}), de modo
 * que cada producto muestra una foto real relacionada con su tipo. El
 * parámetro `lock` fija una imagen concreta y estable por producto.
 *
 * Compartido por el seed de desarrollo (prisma/seed.ts) y el endpoint
 * /api/seed usado tras el despliegue.
 */

export interface SeedProducto {
  slug: string;
  nombre: string;
  descripcion: string;
  precioCentavos: number;
  precioAnteriorCentavos: number | null;
  categoria: string;
  imagen: string;
  stock: number;
  origen: string | null;
  destacado: boolean;
}

/**
 * Palabras clave de imagen por categoría (en inglés, que es lo que mejor
 * entienden los bancos de imágenes). Se usan para traer una foto temática.
 */
const KEYWORDS_CATEGORIA: Record<string, string> = {
  artesanias: "handicraft,pottery,mexican,craft",
  ropa: "clothing,textile,fashion,fabric",
  alimentos: "mexican,food,spices,ingredients",
  bebidas: "drink,beverage,bottle,coffee",
  hogar: "home,decor,ceramic,interior",
  belleza: "cosmetics,soap,skincare,beauty",
  joyeria: "jewelry,silver,necklace,ring",
  juguetes: "toy,wooden,colorful,kids",
  libros: "book,music,vintage,reading",
  deportes: "sport,outdoor,fitness,equipment",
  mascotas: "pet,dog,cat,animal",
  electronica: "gadget,electronics,device,technology",
};

/**
 * Palabras clave más específicas para ciertos productos, para que la imagen
 * se acerque más al contenido real del producto.
 */
const KEYWORDS_PRODUCTO: Record<string, string> = {
  "cafe-chiapas-500g": "coffee,beans",
  "cafe-veracruz-molido": "coffee,ground",
  "mezcal-espadin": "mezcal,agave,drink",
  "tequila-reposado": "tequila,bottle",
  "cerveza-artesanal-6pack": "beer,craft",
  "chocolate-mesa": "chocolate,cacao",
  "cacao-polvo": "cacao,powder",
  "miel-agave": "honey,syrup",
  "queso-cotija": "cheese",
  "frijol-negro-organico": "beans,legumes",
  "chiles-secos-mix": "chili,peppers,dried",
  "salsa-macha-artesanal": "salsa,sauce,chili",
  "jabon-de-nopal": "soap,handmade",
  "jabon-carbon": "soap,charcoal",
  "aceite-aguacate": "avocado,oil",
  "perfume-vainilla": "perfume,bottle",
  "collar-plata-taxco": "necklace,silver",
  "aretes-filigrana": "earrings,jewelry",
  "anillo-plata-turquesa": "ring,turquoise",
  "guitarra-paracho": "guitar,acoustic",
  "vinilo-musica-tradicional": "vinyl,record",
  "libro-cocina-mexicana": "cookbook,book",
  "balon-futbol": "soccer,ball",
  "jersey-seleccion": "jersey,soccer",
  "guantes-box": "boxing,gloves",
  "mochila-senderismo": "backpack,hiking",
  "audifonos-inalambricos": "headphones,earbuds",
  "powerbank-10000": "powerbank,battery",
  "bocina-bluetooth-artesanal": "speaker,bluetooth",
  "hamaca-yucateca": "hammock",
  "sombrero-charro": "hat,sombrero",
  "velas-cera-abeja": "candles",
  "cafe-chiapas": "coffee",
};

/**
 * Imagen temática del producto. Usa LoremFlickr, que devuelve una foto real
 * según palabras clave; el parámetro `lock` fija una imagen concreta por
 * producto (estable y distinta para cada uno).
 */
function imagenProducto(slug: string, categoria: string, idx: number): string {
  const keywords =
    KEYWORDS_PRODUCTO[slug] ?? KEYWORDS_CATEGORIA[categoria] ?? "mexican,craft";
  // lock determinista a partir del índice para que cada producto tenga su foto.
  const lock = 1000 + idx;
  return `https://loremflickr.com/800/800/${keywords}?lock=${lock}`;
}

interface Entrada {
  slug: string;
  nombre: string;
  descripcion: string;
  precioCentavos: number;
  precioAnteriorCentavos: number;
  categoria: string;
  stock: number;
  origen: string;
  destacado?: boolean;
}

/** Construye un SeedProducto a partir de una entrada compacta. */
function p(e: Entrada, idx: number): SeedProducto {
  return {
    slug: e.slug,
    nombre: e.nombre,
    descripcion: e.descripcion,
    precioCentavos: e.precioCentavos,
    precioAnteriorCentavos: e.precioAnteriorCentavos,
    categoria: e.categoria,
    imagen: imagenProducto(e.slug, e.categoria, idx),
    stock: e.stock,
    origen: e.origen,
    destacado: e.destacado ?? false,
  };
}

const ENTRADAS: Entrada[] = [
  // ===================== ARTESANÍAS =====================
  {
    slug: "alebrije-oaxaqueno",
    nombre: "Alebrije Oaxaqueño",
    descripcion:
      "Figura de madera tallada y pintada a mano por artesanos de Oaxaca. Cada pieza es única.",
    precioCentavos: 129900,
    precioAnteriorCentavos: 159900,
    categoria: "artesanias",
    stock: 12,
    origen: "Oaxaca",
    destacado: true,
  },
  {
    slug: "talavera-poblana-set",
    nombre: "Set de Talavera Poblana",
    descripcion:
      "Juego de 4 tazas de cerámica Talavera auténtica de Puebla, pintadas a mano.",
    precioCentavos: 74900,
    precioAnteriorCentavos: 89900,
    categoria: "artesanias",
    stock: 20,
    origen: "Puebla",
    destacado: true,
  },
  {
    slug: "arbol-de-la-vida",
    nombre: "Árbol de la Vida",
    descripcion:
      "Escultura de barro policromado de Metepec, símbolo de la tradición alfarera mexicana.",
    precioCentavos: 189900,
    precioAnteriorCentavos: 229900,
    categoria: "artesanias",
    stock: 6,
    origen: "Estado de México",
  },
  {
    slug: "catrina-ceramica",
    nombre: "Catrina de Cerámica",
    descripcion:
      "Figura decorativa de la icónica Catrina, pintada a mano. Ideal para Día de Muertos.",
    precioCentavos: 64900,
    precioAnteriorCentavos: 79900,
    categoria: "artesanias",
    stock: 18,
    origen: "Michoacán",
    destacado: true,
  },
  {
    slug: "mascara-madera",
    nombre: "Máscara de Madera Tallada",
    descripcion:
      "Máscara ceremonial tallada en madera de copal, tradición de los pueblos originarios.",
    precioCentavos: 99900,
    precioAnteriorCentavos: 119900,
    categoria: "artesanias",
    stock: 10,
    origen: "Guerrero",
  },
  {
    slug: "ojo-de-dios",
    nombre: "Ojo de Dios Huichol",
    descripcion:
      "Tejido ritual huichol en estambre de colores, símbolo de protección.",
    precioCentavos: 34900,
    precioAnteriorCentavos: 44900,
    categoria: "artesanias",
    stock: 30,
    origen: "Nayarit",
  },
  {
    slug: "barro-negro",
    nombre: "Jarrón de Barro Negro",
    descripcion:
      "Pieza de barro negro bruñido de San Bartolo Coyotepec, Oaxaca.",
    precioCentavos: 84900,
    precioAnteriorCentavos: 99900,
    categoria: "artesanias",
    stock: 15,
    origen: "Oaxaca",
  },
  {
    slug: "cuadro-estambre-huichol",
    nombre: "Cuadro de Estambre Huichol",
    descripcion:
      "Arte huichol hecho con estambre sobre tabla encerada, lleno de simbolismo.",
    precioCentavos: 149900,
    precioAnteriorCentavos: 179900,
    categoria: "artesanias",
    stock: 8,
    origen: "Jalisco",
    destacado: true,
  },
  {
    slug: "pinata-tradicional",
    nombre: "Piñata Tradicional de Picos",
    descripcion:
      "Piñata de siete picos hecha con papel de china, la clásica de las posadas.",
    precioCentavos: 29900,
    precioAnteriorCentavos: 39900,
    categoria: "artesanias",
    stock: 40,
    origen: "Ciudad de México",
  },
  {
    slug: "molcajete-piedra",
    nombre: "Molcajete de Piedra Volcánica",
    descripcion:
      "Molcajete tradicional tallado en piedra volcánica. Para las mejores salsas.",
    precioCentavos: 54900,
    precioAnteriorCentavos: 69900,
    categoria: "artesanias",
    stock: 25,
    origen: "Jalisco",
  },
  {
    slug: "cruz-ocotlan",
    nombre: "Cruz de Ocotlán Pintada",
    descripcion:
      "Cruz de hojalata pintada a mano con motivos florales tradicionales.",
    precioCentavos: 44900,
    precioAnteriorCentavos: 54900,
    categoria: "artesanias",
    stock: 22,
    origen: "Oaxaca",
  },
  {
    slug: "nacimiento-barro",
    nombre: "Nacimiento de Barro (9 piezas)",
    descripcion:
      "Set de nacimiento navideño en barro pintado a mano por artesanos poblanos.",
    precioCentavos: 119900,
    precioAnteriorCentavos: 149900,
    categoria: "artesanias",
    stock: 14,
    origen: "Puebla",
  },

  // ===================== ROPA =====================
  {
    slug: "huipil-bordado",
    nombre: "Huipil Bordado a Mano",
    descripcion:
      "Blusa tradicional con bordados florales multicolor, técnica heredada por generaciones.",
    precioCentavos: 89000,
    precioAnteriorCentavos: 109000,
    categoria: "ropa",
    stock: 8,
    origen: "Chiapas",
    destacado: true,
  },
  {
    slug: "sarape-saltillo",
    nombre: "Sarape de Saltillo",
    descripcion:
      "Sarape tejido en telar con los colores vibrantes característicos de Saltillo.",
    precioCentavos: 115000,
    precioAnteriorCentavos: 139000,
    categoria: "ropa",
    stock: 15,
    origen: "Coahuila",
    destacado: true,
  },
  {
    slug: "rebozo-seda",
    nombre: "Rebozo de Seda de Santa María",
    descripcion:
      "Rebozo fino de seda con el característico rapacejo anudado a mano.",
    precioCentavos: 179900,
    precioAnteriorCentavos: 219900,
    categoria: "ropa",
    stock: 10,
    origen: "Estado de México",
  },
  {
    slug: "guayabera-lino",
    nombre: "Guayabera de Lino",
    descripcion:
      "Clásica guayabera de lino con alforzas, fresca y elegante para climas cálidos.",
    precioCentavos: 69900,
    precioAnteriorCentavos: 89900,
    categoria: "ropa",
    stock: 30,
    origen: "Yucatán",
  },
  {
    slug: "vestido-bordado-oaxaca",
    nombre: "Vestido Bordado Oaxaqueño",
    descripcion:
      "Vestido de manta con bordado floral a mano, ligero y colorido.",
    precioCentavos: 129900,
    precioAnteriorCentavos: 159900,
    categoria: "ropa",
    stock: 12,
    origen: "Oaxaca",
    destacado: true,
  },
  {
    slug: "jorongo-lana",
    nombre: "Jorongo de Lana",
    descripcion:
      "Poncho de lana tejido a mano, abrigador y con diseños tradicionales.",
    precioCentavos: 99900,
    precioAnteriorCentavos: 124900,
    categoria: "ropa",
    stock: 18,
    origen: "Michoacán",
  },
  {
    slug: "huaraches-piel",
    nombre: "Huaraches de Piel Tejida",
    descripcion:
      "Huaraches artesanales de piel tejida a mano, cómodos y resistentes.",
    precioCentavos: 59900,
    precioAnteriorCentavos: 74900,
    categoria: "ropa",
    stock: 25,
    origen: "Jalisco",
  },
  {
    slug: "falda-folklorica",
    nombre: "Falda Folklórica de Baile",
    descripcion:
      "Falda amplia multicolor para danza folklórica, con olanes y listones.",
    precioCentavos: 84900,
    precioAnteriorCentavos: 104900,
    categoria: "ropa",
    stock: 14,
    origen: "Jalisco",
  },
  {
    slug: "camisa-manta",
    nombre: "Camisa de Manta",
    descripcion: "Camisa de manta de algodón natural, fresca y tradicional.",
    precioCentavos: 44900,
    precioAnteriorCentavos: 54900,
    categoria: "ropa",
    stock: 35,
    origen: "Veracruz",
  },
  {
    slug: "bolsa-tejida-palma-ropa",
    nombre: "Bolsa Tejida de Palma",
    descripcion:
      "Bolsa de mano tejida en palma natural, perfecta para la playa.",
    precioCentavos: 39900,
    precioAnteriorCentavos: 49900,
    categoria: "ropa",
    stock: 40,
    origen: "Guerrero",
  },

  // ===================== ALIMENTOS =====================
  {
    slug: "salsa-macha-artesanal",
    nombre: "Salsa Macha Artesanal (250g)",
    descripcion:
      "Salsa macha con chile de árbol, cacahuate y ajonjolí. Picor medio, sabor intenso.",
    precioCentavos: 14900,
    precioAnteriorCentavos: 18900,
    categoria: "alimentos",
    stock: 50,
    origen: "Veracruz",
    destacado: true,
  },
  {
    slug: "mole-poblano-pasta",
    nombre: "Pasta de Mole Poblano (500g)",
    descripcion:
      "Auténtica pasta de mole poblano con más de 20 ingredientes. Solo agrega caldo.",
    precioCentavos: 19900,
    precioAnteriorCentavos: 24900,
    categoria: "alimentos",
    stock: 45,
    origen: "Puebla",
    destacado: true,
  },
  {
    slug: "chiles-secos-mix",
    nombre: "Mix de Chiles Secos (500g)",
    descripcion:
      "Selección de chiles secos: guajillo, ancho, pasilla y de árbol.",
    precioCentavos: 12900,
    precioAnteriorCentavos: 16900,
    categoria: "alimentos",
    stock: 60,
    origen: "Zacatecas",
  },
  {
    slug: "miel-agave",
    nombre: "Miel de Agave Orgánica (500ml)",
    descripcion:
      "Endulzante natural de agave, bajo índice glucémico. 100% orgánica.",
    precioCentavos: 13900,
    precioAnteriorCentavos: 17900,
    categoria: "alimentos",
    stock: 70,
    origen: "Jalisco",
  },
  {
    slug: "vainilla-papantla",
    nombre: "Vainilla de Papantla (vaina x5)",
    descripcion:
      "Vainas de vainilla gourmet de Papantla, aroma intenso y natural.",
    precioCentavos: 24900,
    precioAnteriorCentavos: 29900,
    categoria: "alimentos",
    stock: 30,
    origen: "Veracruz",
    destacado: true,
  },
  {
    slug: "chapulines-sal-limon",
    nombre: "Chapulines con Sal y Limón (100g)",
    descripcion: "Botana tradicional oaxaqueña, crujiente y llena de proteína.",
    precioCentavos: 9900,
    precioAnteriorCentavos: 12900,
    categoria: "alimentos",
    stock: 40,
    origen: "Oaxaca",
  },
  {
    slug: "tamarindo-enchilado",
    nombre: "Dulce de Tamarindo Enchilado",
    descripcion:
      "Clásico dulce mexicano de tamarindo con chile. Agridulce y picosito.",
    precioCentavos: 7900,
    precioAnteriorCentavos: 9900,
    categoria: "alimentos",
    stock: 80,
    origen: "Guerrero",
  },
  {
    slug: "frijol-negro-organico",
    nombre: "Frijol Negro Orgánico (1kg)",
    descripcion: "Frijol negro de grano entero cultivado sin pesticidas.",
    precioCentavos: 8900,
    precioAnteriorCentavos: 11900,
    categoria: "alimentos",
    stock: 55,
    origen: "Chiapas",
  },
  {
    slug: "queso-cotija",
    nombre: "Queso Cotija Añejo (400g)",
    descripcion:
      "Queso cotija madurado, salado y desmoronable. El toque de tus antojitos.",
    precioCentavos: 15900,
    precioAnteriorCentavos: 19900,
    categoria: "alimentos",
    stock: 35,
    origen: "Michoacán",
  },
  {
    slug: "cajeta-celaya",
    nombre: "Cajeta de Celaya (500g)",
    descripcion:
      "Cajeta quemada de leche de cabra, cremosa y tradicional de Guanajuato.",
    precioCentavos: 11900,
    precioAnteriorCentavos: 14900,
    categoria: "alimentos",
    stock: 50,
    origen: "Guanajuato",
  },
  {
    slug: "amaranto-barras",
    nombre: "Barras de Amaranto (12 pzas)",
    descripcion:
      "Alegrías de amaranto con miel, el superalimento prehispánico.",
    precioCentavos: 8900,
    precioAnteriorCentavos: 10900,
    categoria: "alimentos",
    stock: 65,
    origen: "Morelos",
  },
  {
    slug: "sal-gusano",
    nombre: "Sal de Gusano (80g)",
    descripcion:
      "Sal de gusano de maguey con chile, el acompañante perfecto del mezcal.",
    precioCentavos: 10900,
    precioAnteriorCentavos: 13900,
    categoria: "alimentos",
    stock: 40,
    origen: "Oaxaca",
  },
];

ENTRADAS.push(
  // ===================== BEBIDAS =====================
  {
    slug: "mezcal-espadin",
    nombre: "Mezcal Espadín Artesanal (750ml)",
    descripcion:
      "Mezcal joven 100% agave espadín, destilado en olla de barro. Ahumado y suave.",
    precioCentavos: 59900,
    precioAnteriorCentavos: 74900,
    categoria: "bebidas",
    stock: 24,
    origen: "Oaxaca",
    destacado: true,
  },
  {
    slug: "cafe-chiapas-500g",
    nombre: "Café de Chiapas en Grano (500g)",
    descripcion:
      "Café de altura orgánico, tostado medio, notas de chocolate y frutos rojos.",
    precioCentavos: 21900,
    precioAnteriorCentavos: 25900,
    categoria: "bebidas",
    stock: 40,
    origen: "Chiapas",
    destacado: true,
  },
  {
    slug: "tequila-reposado",
    nombre: "Tequila Reposado 100% Agave (750ml)",
    descripcion:
      "Tequila reposado añejado en barrica de roble. Suave con notas de vainilla.",
    precioCentavos: 74900,
    precioAnteriorCentavos: 94900,
    categoria: "bebidas",
    stock: 20,
    origen: "Jalisco",
    destacado: true,
  },
  {
    slug: "chocolate-mesa",
    nombre: "Chocolate de Mesa (500g)",
    descripcion:
      "Chocolate de mesa con canela y almendra para preparar chocolate caliente.",
    precioCentavos: 12900,
    precioAnteriorCentavos: 15900,
    categoria: "bebidas",
    stock: 50,
    origen: "Oaxaca",
  },
  {
    slug: "agua-jamaica-concentrado",
    nombre: "Concentrado de Jamaica (1L)",
    descripcion: "Concentrado natural de flor de jamaica, sin azúcar añadida.",
    precioCentavos: 8900,
    precioAnteriorCentavos: 11900,
    categoria: "bebidas",
    stock: 45,
    origen: "Guerrero",
  },
  {
    slug: "pulque-curado",
    nombre: "Pulque Curado de Avena (1L)",
    descripcion: "Bebida prehispánica fermentada de maguey, curada con avena.",
    precioCentavos: 9900,
    precioAnteriorCentavos: 12900,
    categoria: "bebidas",
    stock: 18,
    origen: "Hidalgo",
  },
  {
    slug: "cacao-polvo",
    nombre: "Cacao en Polvo Puro (300g)",
    descripcion: "Cacao criollo molido, sin azúcar. Para bebidas y repostería.",
    precioCentavos: 13900,
    precioAnteriorCentavos: 16900,
    categoria: "bebidas",
    stock: 38,
    origen: "Tabasco",
  },
  {
    slug: "cerveza-artesanal-6pack",
    nombre: "Cerveza Artesanal Mexicana (6 pack)",
    descripcion:
      "Variedad de cervezas artesanales mexicanas estilo ale y lager.",
    precioCentavos: 24900,
    precioAnteriorCentavos: 29900,
    categoria: "bebidas",
    stock: 30,
    origen: "Baja California",
  },
  {
    slug: "horchata-concentrado",
    nombre: "Concentrado de Horchata (1L)",
    descripcion:
      "Horchata de arroz con canela, lista para diluir. Refrescante.",
    precioCentavos: 7900,
    precioAnteriorCentavos: 9900,
    categoria: "bebidas",
    stock: 42,
    origen: "Jalisco",
  },
  {
    slug: "cafe-veracruz-molido",
    nombre: "Café de Veracruz Molido (250g)",
    descripcion: "Café de origen Coatepec, tostado oscuro, cuerpo intenso.",
    precioCentavos: 11900,
    precioAnteriorCentavos: 14900,
    categoria: "bebidas",
    stock: 48,
    origen: "Veracruz",
  },

  // ===================== HOGAR =====================
  {
    slug: "canasta-tejida",
    nombre: "Canasta Tejida de Palma",
    descripcion:
      "Canasta multiusos tejida a mano con palma natural. Resistente y ecológica.",
    precioCentavos: 32900,
    precioAnteriorCentavos: 39900,
    categoria: "hogar",
    stock: 25,
    origen: "Guerrero",
  },
  {
    slug: "sarape-cojin",
    nombre: "Cojín de Sarape (par)",
    descripcion:
      "Par de fundas de cojín tejidas con motivos de sarape multicolor.",
    precioCentavos: 44900,
    precioAnteriorCentavos: 54900,
    categoria: "hogar",
    stock: 30,
    origen: "Coahuila",
  },
  {
    slug: "vajilla-talavera",
    nombre: "Vajilla de Talavera (16 pzas)",
    descripcion:
      "Vajilla completa de cerámica Talavera pintada a mano para 4 personas.",
    precioCentavos: 229900,
    precioAnteriorCentavos: 279900,
    categoria: "hogar",
    stock: 8,
    origen: "Puebla",
    destacado: true,
  },
  {
    slug: "tapete-lana-teotitlan",
    nombre: "Tapete de Lana de Teotitlán",
    descripcion:
      "Tapete tejido en telar de pedal con lana teñida con tintes naturales.",
    precioCentavos: 189900,
    precioAnteriorCentavos: 229900,
    categoria: "hogar",
    stock: 10,
    origen: "Oaxaca",
    destacado: true,
  },
  {
    slug: "espejo-hojalata",
    nombre: "Espejo de Hojalata Pintado",
    descripcion: "Espejo con marco de hojalata repujada y pintada a mano.",
    precioCentavos: 79900,
    precioAnteriorCentavos: 99900,
    categoria: "hogar",
    stock: 15,
    origen: "Oaxaca",
  },
  {
    slug: "velas-cera-abeja",
    nombre: "Velas de Cera de Abeja (set 3)",
    descripcion: "Set de velas artesanales de cera de abeja con aroma natural.",
    precioCentavos: 29900,
    precioAnteriorCentavos: 36900,
    categoria: "hogar",
    stock: 40,
    origen: "Michoacán",
  },
  {
    slug: "mantel-bordado",
    nombre: "Mantel Bordado a Mano",
    descripcion:
      "Mantel de algodón con bordado floral tradicional, para 6 personas.",
    precioCentavos: 89900,
    precioAnteriorCentavos: 109900,
    categoria: "hogar",
    stock: 18,
    origen: "Oaxaca",
  },
  {
    slug: "cazuela-barro",
    nombre: "Cazuela de Barro (grande)",
    descripcion: "Cazuela de barro vidriado para cocinar guisos tradicionales.",
    precioCentavos: 49900,
    precioAnteriorCentavos: 59900,
    categoria: "hogar",
    stock: 22,
    origen: "Michoacán",
  },
  {
    slug: "lampara-papel-picado",
    nombre: "Lámpara de Papel Picado",
    descripcion:
      "Lámpara decorativa con diseños de papel picado tradicional iluminada.",
    precioCentavos: 54900,
    precioAnteriorCentavos: 69900,
    categoria: "hogar",
    stock: 20,
    origen: "Puebla",
  },
  {
    slug: "hamaca-yucateca",
    nombre: "Hamaca Yucateca Matrimonial",
    descripcion:
      "Hamaca tejida a mano en hilo de algodón, cómoda y resistente.",
    precioCentavos: 119900,
    precioAnteriorCentavos: 149900,
    categoria: "hogar",
    stock: 14,
    origen: "Yucatán",
    destacado: true,
  },
  {
    slug: "portavelas-barro",
    nombre: "Portavelas de Barro (set 2)",
    descripcion: "Par de portavelas de barro negro con diseños geométricos.",
    precioCentavos: 34900,
    precioAnteriorCentavos: 42900,
    categoria: "hogar",
    stock: 28,
    origen: "Oaxaca",
  },
  {
    slug: "servilletero-madera",
    nombre: "Servilletero de Madera Tallada",
    descripcion: "Servilletero de madera con tallado tradicional michoacano.",
    precioCentavos: 24900,
    precioAnteriorCentavos: 29900,
    categoria: "hogar",
    stock: 32,
    origen: "Michoacán",
  },

  // ===================== BELLEZA =====================
  {
    slug: "jabon-de-nopal",
    nombre: "Jabón Artesanal de Nopal",
    descripcion:
      "Jabón natural de nopal y aloe vera, ideal para pieles sensibles. Sin parabenos.",
    precioCentavos: 7900,
    precioAnteriorCentavos: 9900,
    categoria: "belleza",
    stock: 100,
    origen: "Jalisco",
  },
  {
    slug: "aceite-aguacate",
    nombre: "Aceite de Aguacate (100ml)",
    descripcion:
      "Aceite puro de aguacate prensado en frío para piel y cabello.",
    precioCentavos: 15900,
    precioAnteriorCentavos: 19900,
    categoria: "belleza",
    stock: 60,
    origen: "Michoacán",
    destacado: true,
  },
  {
    slug: "crema-rosa-mexicano",
    nombre: "Crema de Rosa Mexicano",
    descripcion:
      "Crema hidratante con extracto de rosa, aroma delicado y textura ligera.",
    precioCentavos: 18900,
    precioAnteriorCentavos: 23900,
    categoria: "belleza",
    stock: 45,
    origen: "Puebla",
  },
  {
    slug: "exfoliante-cafe",
    nombre: "Exfoliante Corporal de Café",
    descripcion: "Exfoliante natural de café chiapaneco con aceite de coco.",
    precioCentavos: 13900,
    precioAnteriorCentavos: 17900,
    categoria: "belleza",
    stock: 55,
    origen: "Chiapas",
  },
  {
    slug: "shampoo-solido-sabila",
    nombre: "Shampoo Sólido de Sábila",
    descripcion: "Shampoo sólido ecológico de sábila, libre de sulfatos.",
    precioCentavos: 11900,
    precioAnteriorCentavos: 14900,
    categoria: "belleza",
    stock: 70,
    origen: "Jalisco",
  },
  {
    slug: "mascarilla-barro",
    nombre: "Mascarilla de Barro y Miel",
    descripcion: "Mascarilla facial purificante de barro con miel de abeja.",
    precioCentavos: 12900,
    precioAnteriorCentavos: 15900,
    categoria: "belleza",
    stock: 50,
    origen: "Morelos",
  },
  {
    slug: "perfume-vainilla",
    nombre: "Perfume de Vainilla de Papantla",
    descripcion: "Agua de perfume artesanal con esencia natural de vainilla.",
    precioCentavos: 29900,
    precioAnteriorCentavos: 37900,
    categoria: "belleza",
    stock: 35,
    origen: "Veracruz",
    destacado: true,
  },
  {
    slug: "balsamo-labial-cacao",
    nombre: "Bálsamo Labial de Cacao",
    descripcion: "Bálsamo labial nutritivo de manteca de cacao puro.",
    precioCentavos: 6900,
    precioAnteriorCentavos: 8900,
    categoria: "belleza",
    stock: 90,
    origen: "Tabasco",
  },
  {
    slug: "sales-bano-maguey",
    nombre: "Sales de Baño de Maguey",
    descripcion: "Sales de baño relajantes con extracto de maguey y lavanda.",
    precioCentavos: 14900,
    precioAnteriorCentavos: 18900,
    categoria: "belleza",
    stock: 48,
    origen: "Oaxaca",
  },
  {
    slug: "jabon-carbon",
    nombre: "Jabón de Carbón Activado",
    descripcion: "Jabón facial de carbón activado para pieles grasas.",
    precioCentavos: 8900,
    precioAnteriorCentavos: 10900,
    categoria: "belleza",
    stock: 65,
    origen: "Jalisco",
  },

  // ===================== JOYERÍA =====================
  {
    slug: "collar-plata-taxco",
    nombre: "Collar de Plata de Taxco",
    descripcion:
      "Collar de plata .925 con diseño artesanal de Taxco, Guerrero.",
    precioCentavos: 149900,
    precioAnteriorCentavos: 189900,
    categoria: "joyeria",
    stock: 20,
    origen: "Guerrero",
    destacado: true,
  },
  {
    slug: "aretes-filigrana",
    nombre: "Aretes de Filigrana de Oaxaca",
    descripcion: "Aretes de filigrana en plata, técnica tradicional oaxaqueña.",
    precioCentavos: 89900,
    precioAnteriorCentavos: 109900,
    categoria: "joyeria",
    stock: 25,
    origen: "Oaxaca",
    destacado: true,
  },
  {
    slug: "pulsera-ambar-chiapas",
    nombre: "Pulsera de Ámbar de Chiapas",
    descripcion:
      "Pulsera con ámbar auténtico de Simojovel, piedra fósil mexicana.",
    precioCentavos: 99900,
    precioAnteriorCentavos: 124900,
    categoria: "joyeria",
    stock: 18,
    origen: "Chiapas",
  },
  {
    slug: "anillo-plata-turquesa",
    nombre: "Anillo de Plata con Turquesa",
    descripcion: "Anillo de plata .925 engastado con turquesa natural.",
    precioCentavos: 119900,
    precioAnteriorCentavos: 149900,
    categoria: "joyeria",
    stock: 15,
    origen: "Guerrero",
  },
  {
    slug: "collar-chaquira-huichol",
    nombre: "Collar de Chaquira Huichol",
    descripcion: "Collar tejido con chaquira en diseños simbólicos huicholes.",
    precioCentavos: 59900,
    precioAnteriorCentavos: 74900,
    categoria: "joyeria",
    stock: 30,
    origen: "Nayarit",
  },
  {
    slug: "aretes-chaquira",
    nombre: "Aretes de Chaquira",
    descripcion:
      "Aretes de chaquira multicolor hechos a mano, ligeros y vistosos.",
    precioCentavos: 34900,
    precioAnteriorCentavos: 44900,
    categoria: "joyeria",
    stock: 40,
    origen: "Jalisco",
  },
  {
    slug: "dije-ojo-venado",
    nombre: "Dije de Ojo de Venado",
    descripcion: "Amuleto tradicional de ojo de venado montado en plata.",
    precioCentavos: 44900,
    precioAnteriorCentavos: 54900,
    categoria: "joyeria",
    stock: 35,
    origen: "Oaxaca",
  },
  {
    slug: "brazalete-plata-martillado",
    nombre: "Brazalete de Plata Martillado",
    descripcion: "Brazalete de plata .925 con acabado martillado a mano.",
    precioCentavos: 129900,
    precioAnteriorCentavos: 159900,
    categoria: "joyeria",
    stock: 12,
    origen: "Guerrero",
  },

  // ===================== JUGUETES =====================
  {
    slug: "loteria-mexicana",
    nombre: "Lotería Mexicana Clásica",
    descripcion: "Juego de lotería tradicional con tablas y cartas ilustradas.",
    precioCentavos: 14900,
    precioAnteriorCentavos: 18900,
    categoria: "juguetes",
    stock: 60,
    origen: "Jalisco",
    destacado: true,
  },
  {
    slug: "trompo-madera",
    nombre: "Trompo de Madera",
    descripcion: "Trompo clásico de madera con cuerda, el juguete de siempre.",
    precioCentavos: 5900,
    precioAnteriorCentavos: 7900,
    categoria: "juguetes",
    stock: 80,
    origen: "Michoacán",
  },
  {
    slug: "balero-tradicional",
    nombre: "Balero de Madera",
    descripcion:
      "Balero tradicional de madera torneada, pon a prueba tu puntería.",
    precioCentavos: 6900,
    precioAnteriorCentavos: 8900,
    categoria: "juguetes",
    stock: 75,
    origen: "Guanajuato",
  },
  {
    slug: "muneca-lele",
    nombre: "Muñeca Lele Artesanal",
    descripcion: "Muñeca de trapo otomí bordada a mano, símbolo de Querétaro.",
    precioCentavos: 24900,
    precioAnteriorCentavos: 29900,
    categoria: "juguetes",
    stock: 45,
    origen: "Querétaro",
    destacado: true,
  },
  {
    slug: "caballito-madera",
    nombre: "Caballito de Madera Pintado",
    descripcion: "Caballito de madera pintado a mano con colores vivos.",
    precioCentavos: 19900,
    precioAnteriorCentavos: 24900,
    categoria: "juguetes",
    stock: 40,
    origen: "Michoacán",
  },
  {
    slug: "memorama-mexicano",
    nombre: "Memorama de Animales Mexicanos",
    descripcion: "Juego de memoria ilustrado con fauna mexicana, educativo.",
    precioCentavos: 11900,
    precioAnteriorCentavos: 14900,
    categoria: "juguetes",
    stock: 55,
    origen: "Ciudad de México",
  },
  {
    slug: "yoyo-madera",
    nombre: "Yoyo de Madera Artesanal",
    descripcion: "Yoyo de madera torneada, clásico juego de destreza.",
    precioCentavos: 7900,
    precioAnteriorCentavos: 9900,
    categoria: "juguetes",
    stock: 70,
    origen: "Jalisco",
  },
  {
    slug: "rompecabezas-mapa-mexico",
    nombre: "Rompecabezas Mapa de México",
    descripcion: "Rompecabezas de madera con los estados de la República.",
    precioCentavos: 16900,
    precioAnteriorCentavos: 20900,
    categoria: "juguetes",
    stock: 50,
    origen: "Ciudad de México",
  },

  // ===================== LIBROS Y MÚSICA =====================
  {
    slug: "libro-cocina-mexicana",
    nombre: "Gran Libro de Cocina Mexicana",
    descripcion:
      "Recetario con más de 200 recetas tradicionales de todo México.",
    precioCentavos: 44900,
    precioAnteriorCentavos: 54900,
    categoria: "libros",
    stock: 30,
    origen: "Ciudad de México",
    destacado: true,
  },
  {
    slug: "vinilo-musica-tradicional",
    nombre: "Vinilo de Música Tradicional",
    descripcion:
      "Disco de vinilo con lo mejor del son jarocho y la música regional.",
    precioCentavos: 39900,
    precioAnteriorCentavos: 49900,
    categoria: "libros",
    stock: 20,
    origen: "Veracruz",
  },
  {
    slug: "libro-arte-popular",
    nombre: "Arte Popular Mexicano (ilustrado)",
    descripcion:
      "Libro ilustrado sobre las artesanías y el arte popular de México.",
    precioCentavos: 54900,
    precioAnteriorCentavos: 69900,
    categoria: "libros",
    stock: 25,
    origen: "Ciudad de México",
  },
  {
    slug: "poesia-mexicana",
    nombre: "Antología de Poesía Mexicana",
    descripcion:
      "Colección de los grandes poetas mexicanos, de Sor Juana a Paz.",
    precioCentavos: 29900,
    precioAnteriorCentavos: 36900,
    categoria: "libros",
    stock: 35,
    origen: "Ciudad de México",
  },
  {
    slug: "guitarra-paracho",
    nombre: "Guitarra de Paracho",
    descripcion:
      "Guitarra acústica artesanal de Paracho, la capital de la guitarra.",
    precioCentavos: 189900,
    precioAnteriorCentavos: 229900,
    categoria: "libros",
    stock: 10,
    origen: "Michoacán",
    destacado: true,
  },
  {
    slug: "cancionero-mexicano",
    nombre: "Cancionero Mexicano",
    descripcion:
      "Libro con letras y acordes de las canciones mexicanas más queridas.",
    precioCentavos: 19900,
    precioAnteriorCentavos: 24900,
    categoria: "libros",
    stock: 40,
    origen: "Jalisco",
  },

  // ===================== DEPORTES =====================
  {
    slug: "jersey-seleccion",
    nombre: "Jersey de la Selección Mexicana",
    descripcion:
      "Playera deportiva verde oficial del Tri, tejido transpirable.",
    precioCentavos: 89900,
    precioAnteriorCentavos: 109900,
    categoria: "deportes",
    stock: 50,
    origen: "Ciudad de México",
    destacado: true,
  },
  {
    slug: "balon-futbol",
    nombre: "Balón de Fútbol Profesional",
    descripcion: "Balón tamaño 5 cosido a máquina, apto para cancha.",
    precioCentavos: 44900,
    precioAnteriorCentavos: 54900,
    categoria: "deportes",
    stock: 60,
    origen: "Nuevo León",
  },
  {
    slug: "guantes-box",
    nombre: "Guantes de Box 12oz",
    descripcion:
      "Guantes de box de piel sintética, acolchados, para entrenamiento.",
    precioCentavos: 59900,
    precioAnteriorCentavos: 74900,
    categoria: "deportes",
    stock: 30,
    origen: "Ciudad de México",
  },
  {
    slug: "mochila-senderismo",
    nombre: "Mochila de Senderismo 40L",
    descripcion: "Mochila resistente al agua para excursiones y campismo.",
    precioCentavos: 99900,
    precioAnteriorCentavos: 124900,
    categoria: "deportes",
    stock: 25,
    origen: "Nuevo León",
  },
  {
    slug: "termo-acero",
    nombre: "Termo de Acero Inoxidable 1L",
    descripcion:
      "Termo que mantiene la temperatura 12 horas, ideal para el campo.",
    precioCentavos: 34900,
    precioAnteriorCentavos: 42900,
    categoria: "deportes",
    stock: 70,
    origen: "Jalisco",
  },
  {
    slug: "lazo-charro",
    nombre: "Lazo Charro de Ixtle",
    descripcion: "Reata de ixtle trenzada para charrería y práctica de lazo.",
    precioCentavos: 49900,
    precioAnteriorCentavos: 59900,
    categoria: "deportes",
    stock: 20,
    origen: "Jalisco",
  },

  // ===================== MASCOTAS =====================
  {
    slug: "collar-perro-bordado",
    nombre: "Collar para Perro Bordado",
    descripcion: "Collar ajustable con bordado artesanal de chaquira.",
    precioCentavos: 24900,
    precioAnteriorCentavos: 29900,
    categoria: "mascotas",
    stock: 45,
    origen: "Jalisco",
    destacado: true,
  },
  {
    slug: "cama-mascota-palma",
    nombre: "Cama para Mascota de Palma",
    descripcion: "Cama tejida en palma con cojín de algodón, fresca y natural.",
    precioCentavos: 54900,
    precioAnteriorCentavos: 69900,
    categoria: "mascotas",
    stock: 20,
    origen: "Guerrero",
  },
  {
    slug: "juguete-mascota-fibra",
    nombre: "Juguete de Fibra Natural para Gato",
    descripcion: "Juguete tejido en fibra de agave, resistente a mordidas.",
    precioCentavos: 12900,
    precioAnteriorCentavos: 15900,
    categoria: "mascotas",
    stock: 55,
    origen: "Oaxaca",
  },
  {
    slug: "plato-barro-mascota",
    nombre: "Plato de Barro para Mascota",
    descripcion: "Plato de barro vidriado antiderrapante, elegante y práctico.",
    precioCentavos: 18900,
    precioAnteriorCentavos: 23900,
    categoria: "mascotas",
    stock: 40,
    origen: "Michoacán",
  },
  {
    slug: "correa-piel-trenzada",
    nombre: "Correa de Piel Trenzada",
    descripcion: "Correa para perro de piel genuina trenzada a mano.",
    precioCentavos: 34900,
    precioAnteriorCentavos: 42900,
    categoria: "mascotas",
    stock: 30,
    origen: "Guanajuato",
  },

  // ===================== ELECTRÓNICA =====================
  {
    slug: "bocina-bluetooth-artesanal",
    nombre: "Bocina Bluetooth con Funda Artesanal",
    descripcion:
      "Bocina portátil Bluetooth con funda tejida de diseño mexicano.",
    precioCentavos: 79900,
    precioAnteriorCentavos: 99900,
    categoria: "electronica",
    stock: 35,
    origen: "Jalisco",
    destacado: true,
  },
  {
    slug: "audifonos-inalambricos",
    nombre: "Audífonos Inalámbricos",
    descripcion:
      "Audífonos in-ear Bluetooth con estuche de carga y 20h de batería.",
    precioCentavos: 59900,
    precioAnteriorCentavos: 74900,
    categoria: "electronica",
    stock: 50,
    origen: "Nuevo León",
  },
  {
    slug: "funda-celular-bordada",
    nombre: "Funda para Celular Bordada",
    descripcion:
      "Funda protectora con bordado floral mexicano, para varios modelos.",
    precioCentavos: 19900,
    precioAnteriorCentavos: 24900,
    categoria: "electronica",
    stock: 60,
    origen: "Chiapas",
  },
  {
    slug: "powerbank-10000",
    nombre: "Power Bank 10,000 mAh",
    descripcion: "Batería portátil de carga rápida con doble puerto USB.",
    precioCentavos: 39900,
    precioAnteriorCentavos: 49900,
    categoria: "electronica",
    stock: 45,
    origen: "Nuevo León",
  },
  {
    slug: "lampara-led-talavera",
    nombre: "Lámpara LED con Base de Talavera",
    descripcion: "Lámpara de escritorio LED con base de cerámica Talavera.",
    precioCentavos: 64900,
    precioAnteriorCentavos: 79900,
    categoria: "electronica",
    stock: 25,
    origen: "Puebla",
  },
);

/** Catálogo completo listo para sembrar. */
export const CATALOGO_COMPLETO: SeedProducto[] = ENTRADAS.map((e, i) =>
  p(e, i),
);
