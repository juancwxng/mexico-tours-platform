export interface PriceItem {
  label: string;
  labelEn?: string;
  price: number;
  /** Renders a "Más popular" badge on this tier */
  isPopular?: boolean;
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
  imageAlts?: string[];
  imageAltsEn?: string[];
  showInTours?: boolean;
  /** Optional step-by-step itinerary. When present, renders a numbered timeline alongside the includes list. */
  itinerary?: string[];
  itineraryEn?: string[];
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "isla-piedra",
    title: "Paseo Isla de la Piedra",
    titleEn: "Stone Island Tour",
    category: "paseo",
    isFeatured: true,
    price: 550,
    description:
      "¡Descubre el encanto y la diversión de Isla de la Piedra a tu propio ritmo! Navega por la impresionante bahía en un catamarán, descubriendo cuevas misteriosas y juguetones lobos marinos. Disfruta de tres maravillosas horas de relajación en la playa con barra libre tropical y un festín frente al mar. Elige el **Paquete Regular** para una desconexión total, o sube de nivel con nuestro **Paquete Todo Incluido** para añadir emoción a tu día cabalgando por la arena y riendo a carcajadas en el paseo en banana. (Niños de 0-4 años entran gratis, sin alimentos; agrega almuerzo por $120 MXN).",
    descriptionEn:
      "Discover the charm and fun of Stone Island at your own pace! Sail across the breathtaking bay on a catamaran, discovering mystical caves and playful sea lions. Enjoy three blissful hours relaxing on the beach with a tropical open bar and a delicious oceanfront feast. Choose the **Regular Package** for ultimate relaxation, or upgrade to the **All-Inclusive Package** to add a splash of thrill to your day with horseback riding along the beach and a hilarious banana boat ride! (Children 0-4 are free, no meal included; add lunch for $120 MXN).",
    imageCount: 12,
    imageAlts: [
      "Catamarán Isla de la Piedra abordando turistas en el puerto de Mazatlán", // 1.webp
      "Turistas abordando transporte turístico para la excursión a Isla de la Piedra en Mazatlán", // 2.webp
      "Playa de Isla de la Piedra con turistas, palapas y el Faro de Mazatlán al fondo", // 3.webp
      "Turistas disfrutando de un paseo en banana roja en las playas de Isla de la Piedra", // 4.webp
      "Turistas en barco con chalecos salvavidas navegando hacia Isla de la Piedra", // 5.webp
      "Paseo acuático en banana amarilla en Isla de la Piedra, Mazatlán", // 6.webp
      "Restaurante de playa con palapas y palmeras en Isla de la Piedra, Mazatlán", // 7.webp
      "Lobos marinos sobre las rocas vistos desde el tour a Isla de la Piedra", // 8.webp
      "Vista elevada de la zona de playa, palmeras y restaurantes en Isla de la Piedra, Mazatlán", // 9.webp
      "Recorrido de turistas en carreta tradicional por la playa de Isla de la Piedra", // 10.webp
      "Vista del Faro de Mazatlán y yates desde una embarcación en el tour a Isla de la Piedra", // 11.webp
      "Formación rocosa Piedras Blancas en el océano vista durante el recorrido turístico en Mazatlán", // 12.webp
    ],
    imageAltsEn: [
      "Stone Island catamaran boarding tourists at the port of Mazatlán", // 1.webp
      "Tourists boarding tour transportation for the Stone Island excursion in Mazatlán", // 2.webp
      "Stone Island beach with tourists, palapas, and the Mazatlán Lighthouse in the background", // 3.webp
      "Tourists enjoying a red banana boat ride on the beaches of Stone Island", // 4.webp
      "Tourists on a boat wearing life jackets sailing toward Stone Island", // 5.webp
      "Yellow banana boat water ride at Stone Island, Mazatlán", // 6.webp
      "Beachfront restaurant with palapas and palm trees at Stone Island, Mazatlán", // 7.webp
      "Sea lions resting on rocks seen from the Stone Island tour", // 8.webp
      "Elevated view of the beach, palm trees, and restaurants at Stone Island, Mazatlán", // 9.webp
      "Tourists riding a traditional wagon along the beach at Stone Island", // 10.webp
      "View of the Mazatlán Lighthouse and yachts from a boat on the Stone Island tour", // 11.webp
      "White Rocks formation in the ocean seen during the sightseeing boat tour in Mazatlán", // 12.webp
    ],
    includes: [
      "Transporte ida y vuelta a cualquier hotel de Zona Dorada, Malecón o Cerritos",
      "Crucero de 1 hora en catamarán por la Cueva del Diablo, Cueva de la Garganta, Cueva del Pirata, Rocas Blancas y (en invierno) lobos marinos en su hábitat natural",
      "Estancia de 3 horas en la Isla de la Piedra",
      "Barra libre por 3 horas en la isla: refrescos, jugos y bebidas nacionales preparadas (tequila, vodka y ron)",
      "Comida a elegir: pescado, pollo, combinado o hamburguesa",
      "**Solo Paquete Todo Incluido:** 2 actividades (paseo en banana y paseo a caballos). Niños de 5-10 años con este paquete incluyen 1 actividad.",
    ],
    includesEn: [
      "Round-trip transport to any hotel in the Golden Zone, Malecón, or Cerritos",
      "1-hour catamaran cruise past the Devil's Cave, Throat Cave, Pirate's Cave, White Rocks, and (in winter) sea lions in their natural habitat",
      "3-hour stay on Stone Island",
      "3-hour open bar on the island: soda, juice, and national drinks (tequila, vodka, and rum)",
      "Lunch choice: fish, chicken, mixed grill, or hamburger",
      "**All-Inclusive Package Only:** 2 activities (banana boat ride and horseback riding). Children 5-10 on this package include 1 activity.",
    ],
    duration: "~5 Horas",
    durationEn: "~5 Hours",
    schedule:
      "Lun–Dom: 10:00 AM - 3:00 PM, 12:00 PM - 5:00 PM, 2:00 PM - 6:30 PM",
    scheduleEn:
      "Mon–Sun: 10:00 AM - 3:00 PM, 12:00 PM - 5:00 PM, 2:00 PM - 6:30 PM",
    priceList: [
      {
        label: "Adulto - Paquete Regular (11+)",
        labelEn: "Adult - Regular Package (11+)",
        price: 550,
        isPopular: true,
      },
      {
        label: "Adulto - Todo Incluido (11+)",
        labelEn: "Adult - All-Inclusive (11+)",
        price: 680,
      },
      {
        label: "Niño - Paquete Regular (5-10)",
        labelEn: "Child - Regular Package (5-10)",
        price: 300,
      },
      {
        label: "Niño - Todo Incluido (5-10)",
        labelEn: "Child - All-Inclusive (5-10)",
        price: 350,
      },
      { label: "Infante (0-4)", labelEn: "Infant (0-4)", price: 0 },
    ],
  },

  {
    id: "2",
    slug: "isla-venados",
    title: "Paseo Isla de Venados en Trimarán",
    titleEn: "Deer Island Trimaran Tour",
    category: "paseo",
    isFeatured: true,
    price: 1520,
    description:
      "¡Embárcate en la aventura definitiva en Mazatlán con nuestro exclusivo paseo a la Isla de Venados! Sube a bordo de un espectacular trimarán para un relajante crucero de hora y media por la bahía, disfrutando de vistas panorámicas inigualables. Al llegar a esta hermosa reserva natural, sumérgete en 3.5 horas de sol, arena y mar con tres emocionantes actividades incluidas: snorkel, kayak y un divertidísimo paseo en banana. Deléitate con un rico almuerzo con fruta fresca y mantente refrescado con nuestra barra libre de 5 horas. ¡El escape tropical perfecto te espera! *(Nota: Menores de 2 años no permitidos. Niños de 2-3 años entran gratis sin alimentos y requieren firmar carta responsiva).* ",
    descriptionEn:
      "Embark on the ultimate Mazatlán adventure with our exclusive Deer Island Tour! Step aboard a spectacular trimaran for a 1.5-hour scenic bay cruise, soaking in breathtaking panoramic views of the Pacific coast. Upon arriving at this pristine nature reserve, dive into 3.5 hours of sun, sand, and sea with three thrilling beach activities included: snorkeling, kayaking, and a hilarious banana boat ride. Savor a delicious lunch served with fresh fruit, and keep the vacation vibes flowing with our 5-hour open bar. The perfect tropical escape awaits! *(Note: Children under 2 are not permitted. Ages 2-3 are free without food and require a signed liability waiver).* ",
    imageCount: 8,
    imageAlts: [
      "Vista aérea de catamarán llegando a la playa en el paseo a Isla Venados, Mazatlán", // 1.webp
      "Turistas en embarcación observando las cuevas rocosas durante el tour a Isla Venados en Mazatlán", // 2.webp
      "Paisaje de costa rocosa y vegetación en la reserva natural de Isla Venados, Mazatlán", // 3.webp
      "Moto acuática en la playa de Isla Venados con vista a la zona hotelera de Mazatlán al fondo", // 4.webp
      "Turistas divirtiéndose en el paseo en banana en las aguas tranquilas de Isla Venados, Mazatlán", // 5.webp
      "Grupo de coatíes o tejones en su hábitat natural durante la excursión a Isla Venados, Mazatlán", // 6.webp
      "Turista relajándose en la proa de un catamarán navegando en el tour Isla Venados, Mazatlán", // 7.webp
      "Formación rocosa en el océano vista durante el recorrido marítimo del paseo Isla Venados, Mazatlán", // 8.webp
    ],
    imageAltsEn: [
      "Aerial view of a catamaran arriving at the beach on the Deer Island tour, Mazatlán", // 1.webp
      "Tourists on a boat observing the rocky caves during the Deer Island tour in Mazatlán", // 2.webp
      "Rocky coastline landscape and vegetation in the Deer Island nature reserve, Mazatlán", // 3.webp
      "Jet ski on Deer Island beach with a view of the Mazatlán hotel zone skyline in the background", // 4.webp
      "Tourists having fun on a banana boat ride in the calm waters of Deer Island, Mazatlán", // 5.webp
      "Group of coatis in their natural habitat during the Deer Island excursion, Mazatlán", // 6.webp
      "Tourist relaxing on the bow of a catamaran sailing on the Deer Island tour, Mazatlán", // 7.webp
      "Rocky formation in the ocean seen during the maritime route of the Deer Island tour, Mazatlán", // 8.webp
    ],
    includes: [
      "Transporte ida y vuelta desde cualquier lugar en Zona Dorada o Cerritos",
      "Paseo escénico de 1.5 horas por la bahía a bordo de un Trimarán",
      "Estancia de 3.5 horas explorando y relajándose en la Isla de Venados",
      "Barra libre por 5 horas: cerveza, tequila, vodka, ron y refrescos",
      "Almuerzo delicioso acompañado de fruta fresca",
      "3 actividades de playa incluidas: paseo en banana, kayak y equipo de snorkel",
    ],
    includesEn: [
      "Round-trip transport from anywhere in the Golden Zone or Cerritos",
      "1.5-hour scenic bay cruise aboard a spectacular Trimaran",
      "3.5-hour stay exploring and relaxing on Deer Island (Isla de Venados)",
      "5-hour open bar: beer, tequila, vodka, rum, and soda",
      "Delicious lunch accompanied by fresh fruit",
      "3 beach activities included: banana boat ride, kayaking, and snorkeling gear",
    ],
    duration: "5 Horas",
    durationEn: "5 Hours",
    schedule: "Lun–Dom: 9:30 AM - 2:30 PM",
    scheduleEn: "Mon–Sun: 9:30 AM - 2:30 PM",
    priceList: [
      { label: "Adulto (11+)", labelEn: "Adult (11+)", price: 1520, isPopular: true },
      { label: "Niño (4-10)", labelEn: "Child (4-10)", price: 800 },
      {
        label: "Infante (2-3) - Sin comida",
        labelEn: "Infant (2-3) - No meal",
        price: 0,
      },
    ],
  },

  {
    id: "3",
    slug: "cuatrimotos-veranos",
    title: "Aventura en Cuatrimotos por Veranos",
    titleEn: "Veranos ATV Adventure",
    category: "aventura",
    isFeatured: true,
    price: 2400,
    description:
      "¡Siente la adrenalina y descubre la auténtica belleza rural de Sinaloa con nuestra emocionante Aventura en Cuatrimotos por Veranos! Prepárate para conquistar senderos de terracería, atravesar un espectacular puente colgante y maravillarte con paisajes increíbles mientras visitas pueblos pintorescos en un recorrido de 2 horas. Después de la acción, recarga energías con un exquisito banquete tradicional de rancho: burritos de machaca, queso fundido flameado, guacamole fresco, frijoles y tortillas hechas a mano. Para cerrar con broche de oro, sumérgete en la cultura local con un recorrido por una tequilera artesanal, donde aprenderás sobre el fascinante proceso de destilación del agave y disfrutarás de una cata guiada. ¡Una combinación perfecta de acción, gastronomía y tradición!",
    descriptionEn:
      "Feel the adrenaline and discover the rustic beauty of Sinaloa with our thrilling Veranos ATV Adventure! Gear up to conquer off-road dirt trails, cross a spectacular suspension bridge, and take in breathtaking landscapes as you visit charming local villages during a 2-hour ride. After the action, refuel with an authentic, mouth-watering ranch feast featuring machaca burritos, flambéed melted cheese, fresh guacamole, beans, and warm handmade tortillas. Top it all off by immersing yourself in local culture with a guided tour of an artisanal tequila distillery, where you'll learn about the fascinating agave distillation process and enjoy a premium tasting session. The ultimate blend of action, flavor, and tradition!",
    imageCount: 11,
    imageAlts: [
      "Grupo de turistas con cuatrimotos listos para el tour en Veranos, Mazatlán, Sinaloa", // 1.webp
      "Turista conduciendo cuatrimoto en camino de terracería durante el tour extremo en Veranos, Mazatlán", // 2.webp
      "Turistas en el mirador del tour de cuatrimotos con vista a la selva de Veranos, Sinaloa", // 3.webp
      "Vista en primera persona de la ruta en cuatrimoto por la naturaleza de Veranos, Mazatlán", // 4.webp
      "Caravana del tour de cuatrimotos recorriendo caminos rurales en Veranos, Mazatlán, Sinaloa", // 5.webp
      "Inicio del recorrido turístico en cuatrimoto en el pueblo tradicional de Veranos, Mazatlán", // 6.webp
      "Comida regional sinaloense con guacamole y salsa incluida en el tour a Veranos, Mazatlán", // 7.webp
      "Turistas degustando comida tradicional mexicana tras la excursión de cuatrimotos en Veranos, Sinaloa", // 8.webp
      "Aventura todoterreno en cuatrimotos por paisajes rurales de Veranos, Mazatlán", // 9.webp
      "Transporte turístico y restaurante Verano Ranch para excursiones en Mazatlán, Sinaloa", // 10.webp
      "Turistas divirtiéndose mientras degustan queso fundido en molcajete al finalizar el tour de cuatrimotos en Veranos, Sinaloa", // 11.webp
    ],
    imageAltsEn: [
      "Group of tourists with ATVs ready for the tour in Veranos, Mazatlán, Sinaloa", // 1.webp
      "Tourist driving an ATV on a dirt road during the extreme tour in Veranos, Mazatlán", // 2.webp
      "Tourists at the ATV tour viewpoint overlooking the jungle in Veranos, Sinaloa", // 3.webp
      "First-person view of the ATV route through the nature of Veranos, Mazatlán", // 4.webp
      "ATV tour caravan riding along rural dirt roads in Veranos, Mazatlán, Sinaloa", // 5.webp
      "Start of the sightseeing ATV ride in the traditional village of Veranos, Mazatlán", // 6.webp
      "Regional Sinaloan food with guacamole and salsa included in the Veranos tour, Mazatlán", // 7.webp
      "Tourists tasting traditional Mexican food after the ATV excursion in Veranos, Sinaloa", // 8.webp
      "Off-road ATV adventure through rural landscapes of Veranos, Mazatlán", // 9.webp
      "Tourist transportation and Verano Ranch restaurant for excursions in Mazatlán, Sinaloa", // 10.webp
      "Tourists having fun while tasting melted cheese from a molcajete after the ATV tour in Veranos, Sinaloa", // 11.webp
    ],
    includes: [
      "Transporte ida y vuelta desde tu hotel en Zona Dorada, Malecón o Cerritos",
      "Recorrido guiado en cuatrimoto de aproximadamente 2 horas por emocionantes rutas de terracería",
      "Aventura escénica cruzando un puente colgante y visitando pueblos tradicionales",
      "Auténtico almuerzo típico de rancho: burritos con machaca, queso fundido flameado, guacamole, frijoles y tortillas a mano",
      "Recorrido por tequilera con explicación del proceso de destilado de agave y degustación",
    ],
    includesEn: [
      "Round-trip transport from your hotel in the Golden Zone, Malecón, or Cerritos",
      "Guided ATV ride of approximately 2 hours through thrilling off-road dirt trails",
      "Scenic adventure crossing a suspension bridge and visiting traditional villages",
      "Authentic ranch lunch: machaca burritos, flambéed melted cheese, guacamole, beans, and handmade tortillas",
      "Tequila distillery tour with an explanation of the agave distillation process and a tasting session",
    ],
    itinerary: [
      "Recogida en tu hotel y traslado a Veranos (aprox. 45 min)",
      "Bienvenida, equipamiento y seguridad en cuatrimoto",
      "Recorrido de 2 horas por senderos de terracería y puente colgante",
      "Almuerzo tradicional de rancho sinaloense",
      "Tour por tequilera artesanal y cata guiada",
      "Regreso a Mazatlán",
    ],
    itineraryEn: [
      "Hotel pickup and transfer to Veranos (~45 min)",
      "Welcome briefing, ATV gear up & safety talk",
      "2-hour off-road ride through trails and suspension bridge",
      "Traditional Sinaloan ranch lunch",
      "Artisanal tequila distillery tour & guided tasting",
      "Return transfer to Mazatlán",
    ],
    duration: "~4 Horas",
    durationEn: "~4 Hours",
    schedule: "Lun–Dom: 9:00 AM - 1:00 PM",
    scheduleEn: "Mon–Sun: 9:00 AM - 1:00 PM",
    priceList: [
      { label: "Adulto (11+)", labelEn: "Adult (11+)", price: 2400, isPopular: true },
      { label: "Niño (4-10)", labelEn: "Child (4-10)", price: 1600 },
      { label: "Infante (0-3)", labelEn: "Infant (0-3)", price: 0 },
    ],
  },

  {
    id: "4",
    slug: "catamaran-sensation",
    title: "Sensation Catamaran: Fiesta con Banda Sinaloense",
    titleEn: "Sensation Catamaran: Sinaloense Band Party",
    category: "paseo",
    isFeatured: true,
    price: 1000,
    description:
      "¡Vive la fiesta definitiva en alta mar con el Sensation Catamaran! Embárcate en un lujoso catamarán de dos pisos y disfruta de un atardecer espectacular en Mazatlán mientras bailas al ritmo de una auténtica banda sinaloense en vivo. Relájate en la primera planta con cómodas mesas, o sube a la pista de baile en el segundo piso para disfrutar del ambiente y capturar las mejores fotos del atardecer. Brinda con la mejor barra libre internacional de la bahía y deléitate con una exquisita taquiza tradicional. Con un servicio de primer nivel, diversión garantizada y vistas inigualables, ¡esta es una experiencia inolvidable que no te puedes perder! *(Nota importante: Los días sábado el acceso es exclusivo para mayores de 12 años).* ",
    descriptionEn:
      "Experience the ultimate party at sea aboard the Sensation Catamaran! Set sail on a luxury two-story catamaran and take in a spectacular Mazatlán sunset while dancing to the contagious rhythm of a live Sinaloense brass band. Relax on the first deck at comfortable tables, or head up to the second-floor dance floor to soak in the vibrant atmosphere and capture stunning sunset photos. Sip from the best premium international open bar on the bay and treat yourself to a mouth-watering traditional taco bar. With top-tier service, guaranteed fun, and unbeatable views, this is an unforgettable sunset cruise you won't want to miss! *(Important note: Saturdays are strictly for guests 12 and older).* ",
    imageCount: 7,
    imageAlts: [
      "Turistas abordando el paseo Sensation Catamarán en la marina de Mazatlán, Sinaloa", // 1.webp
      "Vista aérea del Sensation Catamarán navegando por el océano durante el tour en Mazatlán", // 2.webp
      "Actividades acuáticas, kayaks y tapetes flotantes en el paseo Sensation Catamarán en Mazatlán, Sinaloa", // 3.webp
      "Sensation Catamarán con banda en vivo esperando a los turistas en el puerto de Mazatlán", // 4.webp
      "Banda sinaloense tocando en vivo durante el recorrido de fiesta del Sensation Catamarán en Mazatlán, Sinaloa", // 5.webp
      "DJ animando el ambiente de fiesta a bordo del tour Sensation Catamarán en Mazatlán", // 6.webp
      "Turistas bailando con banda en vivo en la cubierta superior del Sensation Catamarán, Mazatlán", // 7.webp
    ],
    imageAltsEn: [
      "Tourists boarding the Sensation Catamaran tour at the marina in Mazatlán, Sinaloa", // 1.webp
      "Aerial view of the Sensation Catamaran sailing through the ocean during the Mazatlán tour", // 2.webp
      "Water activities, kayaks, and floating mats on the Sensation Catamaran tour in Mazatlán, Sinaloa", // 3.webp
      "Sensation Catamaran with a live band waiting for tourists at the port of Mazatlán", // 4.webp
      "Sinaloan band playing live during the Sensation Catamaran party boat tour in Mazatlán, Sinaloa", // 5.webp
      "DJ keeping the party atmosphere alive aboard the Sensation Catamaran tour in Mazatlán", // 6.webp
      "Tourists dancing to a live band on the top deck of the Sensation Catamaran, Mazatlán", // 7.webp
    ],
    includes: [
      "Paseo inolvidable de 3 horas por la bahía en catamarán de lujo de 2 pisos (planta baja con mesas, planta alta con pista de baile)",
      "Música de banda sinaloense en vivo y divertidas rondas de shots",
      "Barra libre internacional premium: tequila, vodka, ron, whisky, cerveza en lata, refrescos, jugo, agua, piñadas, fresadas y naranjadas",
      "Exquisita taquiza a bordo: cochinita pibil, camarón ranchero y pescado",
      "Vistas espectaculares del famoso atardecer (sunset) de Mazatlán",
      "Atención de primer nivel con servicio de meseros y bartender",
    ],
    includesEn: [
      "Unforgettable 3-hour bay cruise on a luxury 2-story catamaran (lower deck with tables, upper deck with dance floor)",
      "Live Sinaloense brass band music and fun rounds of party shots",
      "Premium international open bar: tequila, vodka, rum, whiskey, canned beer, soda, juice, water, piñadas, fresadas, and naranjadas",
      "Delicious taco bar on board: cochinita pibil, ranchero shrimp, and fish",
      "Spectacular views of the famous Mazatlán sunset",
      "Top-tier attention with dedicated waiter and bartender service",
    ],
    duration: "3 Horas",
    durationEn: "3 Hours",
    schedule: "Mié, Vie, Sáb, Dom: 4:00 PM - 7:00 PM",
    scheduleEn: "Wed, Fri, Sat, Sun: 4:00 PM - 7:00 PM",
    priceList: [
      { label: "Adulto (12+)", labelEn: "Adult (12+)", price: 1000, isPopular: true },
      {
        label: "Menor (6-11) - Excepto Sábados",
        labelEn: "Child (6-11) - Except Saturdays",
        price: 500,
      },
    ],
  },

  {
    id: "5",
    slug: "speed-boats",
    title: "Aventura en Speed Boat",
    titleEn: "Speed Boat Adventure",
    category: "paseo",
    isFeatured: true,
    price: 2800,
    description:
      "¡Siente la brisa del océano y toma el control de tu propia aventura con nuestro emocionante tour en Speed Boat! Conviértete en el capitán y maneja tú mismo una lancha rápida cruzando a máxima velocidad por la espectacular bahía de Mazatlán. Durante este electrizante recorrido de 2 horas, navegarás cerca de las icónicas Tres Islas mientras un guía experto te comparte la fascinante historia de cada una. Además, en temporada de invierno, disfrutarás de un increíble avistamiento de juguetones lobos marinos en su hábitat natural. ¡Una dosis perfecta de adrenalina, naturaleza y libertad en el mar! *(Nota: La edad mínima para participar es de 8 años).* ",
    descriptionEn:
      "Feel the ocean breeze and take control of your own adventure with our thrilling Speed Boat tour! Be the captain and drive your very own speedboat, racing at top speeds across the spectacular Mazatlán bay. During this electrifying 2-hour ride, you'll cruise past the iconic Three Islands while an expert guide shares the fascinating history of each. Plus, during the winter season, you'll be treated to an incredible sighting of playful sea lions in their natural habitat. The perfect dose of adrenaline, nature, and freedom out on the open water! *(Note: Minimum age to participate is 8 years).* ",
    imageCount: 4,
    imageAlts: [
      "Vista en primera persona de turista conduciendo en el tour de Speed Boats hacia las formaciones rocosas en Mazatlán", // 1.webp
      "Grupo de turistas navegando en el paseo de Speed Boats frente a la zona costera y rompeolas de Mazatlán", // 2.webp
      "Pareja de turistas divirtiéndose en su lancha rápida durante el recorrido en Speed Boats por Mazatlán", // 3.webp
      "Turista sonriendo mientras maneja una lancha rápida en la marina durante el tour Speed Boats en Mazatlán", // 4.webp
    ],
    imageAltsEn: [
      "First-person view of a tourist driving on the Speed Boats tour towards the rock formations in Mazatlán", // 1.webp
      "Group of tourists navigating on the Speed Boats ride in front of the coastal zone and breakwater of Mazatlán", // 2.webp
      "Tourist couple having fun in their speedboat during the Speed Boats tour in Mazatlán", // 3.webp
      "Smiling tourist driving a speed boat in the marina during the Speed Boats tour in Mazatlán", // 4.webp
    ],
    includes: [
      "Experiencia única de manejar tú mismo una lancha rápida (Speed Boat)",
      "Emocionante paseo a máxima velocidad por la bahía de Mazatlán",
      "Recorrido panorámico por las Tres Islas con explicaciones detalladas a cargo de un guía experto",
      "Avistamiento de lobos marinos en su hábitat natural (exclusivo en temporada de invierno)",
    ],
    includesEn: [
      "Unique experience of driving your very own speed boat",
      "Thrilling high-speed ride across the beautiful Mazatlán bay",
      "Panoramic cruise past the Three Islands with detailed explanations from an expert guide",
      "Sea lion sightings in their natural habitat (exclusive to the winter season)",
    ],
    duration: "2 Horas",
    durationEn: "2 Hours",
    schedule: "Lun–Dom: 9:00 AM - 11:00 AM, 11:00 AM - 1:00 PM",
    scheduleEn: "Mon–Sun: 9:00 AM - 11:00 AM, 11:00 AM - 1:00 PM",
    priceList: [
      {
        label: "Individual (1 persona)",
        labelEn: "Single (1 person)",
        price: 2800,
      },
      {
        label: "Doble (2 personas en el mismo Speed Boat)",
        labelEn: "Double (2 people in the same Speed Boat)",
        price: 3800,
        isPopular: true,
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
  let result = tours.filter((t) => t.showInTours !== false);

  if (category && category !== "all") {
    result = result.filter((t) => t.category === category);
  }

  if (query) {
    const q = query
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .trim()
      .toLowerCase()
      .slice(0, 100);
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
  return Array.from(
    new Set(
      tours.filter((t) => t.showInTours !== false).map((t) => t.category),
    ),
  );
}
