export interface PriceItem {
  label: string;
  labelEn?: string;
  price: number;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  category: "paseo" | "aventura" | "cultural" | "aereo";
  price: number;
  description: string;
  descriptionEn?: string;
  imageCount: number;
  includes: string[];
  includesEn?: string[];
  duration: string;
  durationEn?: string;
  schedule: string;
  scheduleEn?: string;
  priceList: PriceItem[];
  isFeatured?: boolean;
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "isla-piedra-all-inclusive",
    title: "Isla de la Piedra Todo Incluido",
    titleEn: "Stone Island All-Inclusive Tour",
    category: "paseo",
    isFeatured: true,
    price: 680,
    description:
      "Escápate al paraíso en un crucero panorámico en catamarán hacia Isla de la Piedra. Incluye barra libre en la isla, almuerzo a elegir y 2 actividades (paseo en banana o cabalgata). Para niños de 0–4 años, sin costo, sin alimentos ni actividades (agregar almuerzo: +$120 MXN). Avistamiento de lobos marinos en invierno. Chalecos salvavidas incluidos.",
    descriptionEn:
      "Escape to paradise on a scenic catamaran cruise to Stone Island. Includes an open bar on the island, choice of lunch, and 2 activities (banana boat ride or horseback riding). Children 0–4 are free (no meal or activities; add lunch for +$120 MXN). Sea lion sightings in winter. Life jackets provided.",
    imageCount: 0,
    includes: [
      "Transportación redonda desde Zona Dorada, Malecón o Cerritos",
      "Crucero de 1 hora en catamarán por Cueva del Diablo, Cueva del Pirata, Rocas Blancas y (en invierno) lobos marinos",
      "Estancia de 3 horas en Isla de la Piedra",
      "Barra libre por 3 horas en la isla: refresco, jugo, bebidas nacionales (tequila, vodka, ron)",
      "Almuerzo a elegir: pescado, pollo, grill mixto o hamburguesa",
      "2 actividades a elegir: paseo en banana o cabalgata (niños 5-10: 1 actividad)",
    ],
    includesEn: [
      "Round-trip transport from Golden Zone, Malecón, or Cerritos",
      "1-hour catamaran cruise past Devil’s Cave, Pirate’s Cave, White Rocks, and (in winter) sea lions in their natural habitat",
      "3-hour stay on Stone Island",
      "3-hour open bar on the island: soda, juice, national drinks (tequila, vodka, rum)",
      "Lunch choice: fish, chicken, mixed grill, or hamburger",
      "2 activities to choose from: banana boat ride or horseback riding (children 5-10: 1 activity)",
    ],
    duration: "~5 Horas",
    durationEn: "~5 Hours",
    schedule: "Lun–Dom: 10:00 AM, 12:00 PM, 2:00 PM",
    scheduleEn: "Mon–Sun: 10:00 AM, 12:00 PM, 2:00 PM",
    priceList: [
      { label: "Adulto (11+)", labelEn: "Adult (11+)", price: 680 },
      { label: "Niño (5-10)", labelEn: "Child (5-10)", price: 350 },
      { label: "Infante (0-4)", labelEn: "Infant (0-4)", price: 0 },
    ],
  },

  {
    id: "2",
    slug: "avistamiento-ballenas",
    title: "Avistamiento de Ballenas",
    titleEn: "Whale Watching Tour",
    category: "paseo",
    isFeatured: true,
    price: 1500,
    description:
      "Presencia las majestuosas ballenas de Mazatlán durante su temporada de migración invernal en un tour guiado en yate. Acompañado por un biólogo bilingüe, disfruta de barra libre no alcohólica, fruta de temporada y box lunch.",
    descriptionEn:
      "Witness the majestic whales of Mazatlán during their winter migration season on a guided yacht tour. Includes a bilingual biologist guide, unlimited non-alcoholic open bar, seasonal fruit, and box lunch.",
    imageCount: 0,
    includes: [
      "Guía biólogo bilingüe",
      "Tour en yate por la bahía en búsqueda de ballenas",
      "Barra libre no alcohólica ilimitada",
      "Fruta de temporada",
      "Box lunch (sándwich de jamón y queso, galleta, papitas)",
    ],
    includesEn: [
      "Bilingual biologist guide",
      "Yacht tour through the bay in search of whales",
      "Unlimited non-alcoholic open bar",
      "Seasonal fruit",
      "Box lunch (ham & cheese sandwich, cookie, chips)",
    ],
    duration: "~3 Horas",
    durationEn: "~3 Hours",
    schedule: "Dic–Mar: 9:00 AM",
    scheduleEn: "Dec-Mar: 9:00 AM",
    priceList: [
      { label: "Adulto (13+)", labelEn: "Adult (13+)", price: 1500 },
      { label: "Niño (4-12)", labelEn: "Child (4-12)", price: 1000 },
      { label: "Infante (0-3)", labelEn: "Infant (0-3)", price: 0 },
    ],
  },

  {
    id: "3",
    slug: "cuatrimotos-extreme",
    title: "Cuatrimotos Extreme",
    titleEn: "ATV Extreme Tour",
    category: "aventura",
    isFeatured: true,
    price: 2400,
    description:
      "Embárcate en una emocionante aventura de 2 horas en cuatrimoto por campos de agave, senderos de tierra y la playa, seguida de una experiencia tradicional de rancho. Los conductores deben tener 16+ años.",
    descriptionEn:
      "Embark on a thrilling 2-hour ATV adventure through agave fields, dirt trails, and the beach, followed by a traditional ranch experience. Drivers must be 16+ years old.",
    imageCount: 5,
    includes: [
      "Transportación redonda desde tu hotel",
      "Recorrido guiado en cuatrimoto de 2 horas (campos de agave, senderos de tierra, playa)",
      "Almuerzo tradicional de rancho",
      "Explicación y degustación de destilación de agave azul",
      "Tiempo para disfrutar del rancho",
    ],
    includesEn: [
      "Round-trip transportation from your hotel",
      "2-hour guided ATV ride (agave fields, dirt trails, beach)",
      "Traditional ranch lunch",
      "Blue agave distillation explanation and tasting",
      "Time to enjoy the ranch",
    ],
    duration: "~4 Horas",
    durationEn: "~4 Hours",
    schedule:
      "Lun–Dom: 9:00 AM, 10:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, 2:00 PM",
    scheduleEn:
      "Mon–Sun: 9:00 AM, 10:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, 2:00 PM",
    priceList: [
      { label: "Adulto (11+)", labelEn: "Adult (11+)", price: 2400 },
      { label: "Niño (4-10)", labelEn: "Child (4-10)", price: 1600 },
      { label: "Infante (0-3)", labelEn: "Infant (0-3)", price: 0 },
    ],
  },

  {
    id: "4",
    slug: "tour-centro-historico-mazatlan",
    title: "Tour Centro Histórico de Mazatlán",
    titleEn: "Mazatlán Historic Center Tour",
    category: "cultural",
    isFeatured: true,
    price: 800,
    description:
      "Descubre la historia y cultura de Mazatlán en un recorrido a pie por su centro histórico. Visita la Catedral, el Teatro Ángela Peralta, la Plazuela Machado y más, acompañado de un guía bilingüe. Incluye una bebida refrescante.",
    descriptionEn:
      "Discover the history and culture of Mazatlán on a walking tour through its historic center. Visit the Cathedral, Ángela Peralta Theater, Plazuela Machado, and more, accompanied by a bilingual guide. Includes a refreshing drink.",
    imageCount: 5,
    includes: [
      "Guía bilingüe",
      "Recorrido a pie por el centro histórico",
      "Visita a la Catedral, Teatro Ángela Peralta y Plazuela Machado",
      "Bebida refrescante (agua fresca o cerveza)",
    ],
    includesEn: [
      "Bilingual guide",
      "Walking tour of the historic center",
      "Visit to the Cathedral, Ángela Peralta Theater, and Plazuela Machado",
      "Refreshing drink (agua fresca or beer)",
    ],
    duration: "3 Horas",
    durationEn: "3 Hours",
    schedule: "Lun–Sáb: 9:00 AM, 11:00 AM, 1:00 PM",
    scheduleEn: "Mon–Sat: 9:00 AM, 11:00 AM, 1:00 PM",
    priceList: [
      { label: "Adulto (13+)", labelEn: "Adult (13+)", price: 800 },
      { label: "Niño (4-12)", labelEn: "Child (4-12)", price: 500 },
      { label: "Infante (0-3)", labelEn: "Infant (0-3)", price: 0 },
    ],
  },

  {
    id: "5",
    slug: "tour-helicoptero-mazatlan",
    title: "Tour en Helicóptero",
    titleEn: "Helicopter Tour",
    category: "aereo",
    isFeatured: true,
    price: 0,
    description:
      "Sobrevuela Mazatlán y disfruta de vistas aéreas impresionantes que pocos llegan a experimentar. Vuelo de 25 minutos sobre Isla de la Piedra, la Flota Pesquera, Centro Histórico, Olas Altas, el Malecón, Zona Dorada, Marina, Cerritos, Las Tres Islas y el Estadio de Mazatlán.\n\nPrecio: Varía mensualmente (confirme la tarifa actual).\nCapacidad máxima: 3 personas.\nRestricciones: No disponible para menores de 8 años. Peso máximo por pasajero: 120 kg (264 lbs).",
    descriptionEn:
      "Soar above Mazatlán for breathtaking aerial views few ever get to experience. A 25-minute flight over Stone Island, the Fishing Fleet, Historic Downtown, Olas Altas, the Malecón, Golden Zone, Marina, Cerritos, the Three Islands & the Mazatlán Stadium.\n\nPrice: Varies monthly (please confirm current rate).\nMaximum capacity: 3 people.\nRestrictions: Not available for children under 8 years old. Maximum weight per passenger: 120 kg (264 lbs).",
    imageCount: 0,
    includes: [
      "Vuelo de 25 minutos sobre los sitios más emblemáticos de Mazatlán: Isla de la Piedra, Flota Pesquera, Centro Histórico, Olas Altas, Malecón, Zona Dorada, Marina, Cerritos, Las Tres Islas y el Estadio",
    ],
    includesEn: [
      "25-minute flight over Mazatlán's most iconic sights: Stone Island, the Fishing Fleet, Historic Downtown, Olas Altas, the Malecón, Golden Zone, Marina, Cerritos, the Three Islands & the Mazatlán Stadium",
    ],
    duration: "~1 Hora",
    durationEn: "~2 Hour",
    schedule: "Lun–Dom: 9:00 AM – 5:00 PM",
    scheduleEn: "Mon–Sun: 9:00 AM, 11:00 AM, 1:00 PM",
    priceList: [
      {
        label: "Precio variable (consultar)",
        labelEn: "Variable (please inquire)",
        price: 0,
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getTourImages(slug: string, count: number): string[] {
  if (count === 0) return [];
  return Array.from(
    { length: count },
    (_, i) => `/images/tours/${slug}/${i + 1}.webp`,
  );
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function filterTours(
  category?: string | null,
  query?: string | null,
): Tour[] {
  let result = tours;

  if (category && category !== "all") {
    result = result.filter((t) => t.category === category);
  }

  if (query) {
    // Normalize and sanitize: strip control chars, collapse whitespace, lowercase
    const q = query
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .trim()
      .toLowerCase()
      .slice(0, 100); // cap length to prevent DoS on large inputs
    if (q.length > 0) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.titleEn ?? "").toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.descriptionEn ?? "").toLowerCase().includes(q),
      );
    }
  }

  return result;
}

/** All unique categories present in the tours array. */
export function getCategories(): Tour["category"][] {
  return Array.from(new Set(tours.map((t) => t.category)));
}
