/**
 * Base de Datos Canónica de Baluartes (Bastions) - D&D 5.5 (DMG 2024)
 * Incluye tamaños de espacios, cupos por nivel, órdenes de baluarte,
 * instalaciones básicas y especiales (Nv 5, 9, 13 y 17), roles de PNJs y tabla 1d100 de sucesos.
 */

export const BASTION_SPACE_SIZES = [
  {
    id: 'estrecha',
    name: 'Estrecha (Cramped)',
    maxSquares: 4,
    dimensionsMetric: 'Máx. 4 cuadros (3 × 3 m)',
    buildCostGp: 500,
    buildDays: 20
  },
  {
    id: 'espaciosa',
    name: 'Espaciosa (Roomy)',
    maxSquares: 16,
    dimensionsMetric: 'Máx. 16 cuadros (6 × 6 m)',
    buildCostGp: 1000,
    buildDays: 45,
    upgradeFromId: 'estrecha',
    upgradeCostGp: 500,
    upgradeDays: 25
  },
  {
    id: 'vasta',
    name: 'Vasta (Vast)',
    maxSquares: 36,
    dimensionsMetric: 'Máx. 36 cuadros (9 × 9 m)',
    buildCostGp: 3000,
    buildDays: 125,
    upgradeFromId: 'espaciosa',
    upgradeCostGp: 2000,
    upgradeDays: 80
  }
];

/**
 * Cupo oficial de Instalaciones Especiales según el nivel de un PJ (DMG 2024).
 * En baluartes combinados, se suman los cupos individuales de todos los PJs propietarios.
 * @param {number} level
 * @returns {number}
 */
export function getSpecialFacilitySlotsForLevel(level) {
  const lvl = Number(level) || 1;
  if (lvl < 5) return 0;
  if (lvl <= 8) return 2;
  if (lvl <= 12) return 4;
  if (lvl <= 16) return 5;
  return 6;
}

export const BASTION_ORDERS = [
  {
    id: 'maintain',
    name: 'Mantener (Orden General)',
    scope: 'general',
    icon: 'shield-check',
    description: 'Orden general para todo el Baluarte (se emite si el PJ está ausente o decide no dar órdenes individuales). Todos los asalariados mantienen las instalaciones sin coste y se realiza una tirada en la tabla de Sucesos de Baluarte.'
  },
  {
    id: 'craft',
    name: 'Fabricar (Craft)',
    scope: 'facility',
    icon: 'hammer',
    description: 'Los asalariados de la instalación fabrican objetos mundanos, equipo, pergaminos o reliquias mágicas permitidas por la instalación.'
  },
  {
    id: 'empower',
    name: 'Potenciar (Empower)',
    scope: 'facility',
    icon: 'zap',
    description: 'La instalación confiere una bendición temporal, entrenamiento marcial, rito mágico o bonificación a los personajes o defensores durante los próximos 7 días.'
  },
  {
    id: 'harvest',
    name: 'Cosechar (Harvest)',
    scope: 'facility',
    icon: 'sprout',
    description: 'Los asalariados recolectan recursos naturales, hierbas, pociones, venenos o productos cultivados en la instalación.'
  },
  {
    id: 'recruit',
    name: 'Reclutar (Recruit)',
    scope: 'facility',
    icon: 'users',
    description: 'La instalación recluta nuevos Defensores del Baluarte, monturas, criaturas, mercenarios o seguidores para proteger la fortaleza.'
  },
  {
    id: 'research',
    name: 'Investigar (Research)',
    scope: 'facility',
    icon: 'book-open',
    description: 'Los eruditos o espías de la instalación recopilan información, leyendas, ubicación de objetos o secretos relevantes para la campaña.'
  },
  {
    id: 'trade',
    name: 'Comerciar (Trade)',
    scope: 'facility',
    icon: 'coins',
    description: 'Los asalariados compran y venden mercancías, generando beneficios en piezas de oro (PO) o adquiriendo suministros para el Baluarte.'
  }
];

export const BASTION_BASIC_FACILITIES = [
  { id: 'dormitorio', name: 'Dormitorio (Bedroom)', defaultSpace: 'estrecha', description: 'Alojamiento privado para los propietarios o invitados distinguidos del Baluarte.' },
  { id: 'comedor', name: 'Comedor (Dining Room)', defaultSpace: 'espaciosa', description: 'Sala de banquetes y reuniones alrededor de la mesa del Baluarte.' },
  { id: 'patio', name: 'Patio (Courtyard)', defaultSpace: 'vasta', description: 'Espacio exterior abierto o amurallado para maniobras, desfiles o descanso.' },
  { id: 'cocina', name: 'Cocina (Kitchen)', defaultSpace: 'estrecha', description: 'Estancia equipada con fogones y hornos para alimentar a residentes y defensores.' },
  { id: 'despensa', name: 'Despensa / Bodega (Parlor / Pantry)', defaultSpace: 'estrecha', description: 'Conservación de víveres, barricas y raciones del Baluarte.' },
  { id: 'salon', name: 'Salón de Recepción (Parlor)', defaultSpace: 'espaciosa', description: 'Sala confortable para recibir emisarios, aliados y huéspedes.' },
  { id: 'almacen_basico', name: 'Almacén Básico (Storage)', defaultSpace: 'estrecha', description: 'Bodega para guardar equipo, herramientas, cofres y botín.' },
  { id: 'sala_trofeos_basica', name: 'Sala de Trofeos Básica (Trophy Room)', defaultSpace: 'estrecha', description: 'Exposición de recuerdos de aventuras, estandartes y reliquias mundanas.' },
  { id: 'tocador', name: 'Aseos / Baños (Washroom)', defaultSpace: 'estrecha', description: 'Termas, tinas o lavabos acondicionados dentro del Baluarte.' }
];

export const BASTION_SPECIAL_FACILITIES = [
  // ================= NIVEL 5 =================
  {
    id: 'estudio_arcano',
    name: 'Estudio Arcano (Arcane Study)',
    minLevel: 5,
    prerequisite: 'Aptitud para usar foco arcano o herramienta como foco de conjuros',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'craft',
    passiveBenefit: 'Tras un Descanso Largo en el Baluarte obtienes el Sortilegio del Estudio Arcano (permite lanzar Identificar una vez sin espacio de conjuro).',
    orderSummary: 'Fabricar foco arcano, libro de conjuros o (Nv 9+) objeto mágico Común/Poco Común (Arcana).',
    turnCostGp: 0,
    turnBenefit: 'Foco arcano / Libro (gratis, 7 días) u Objeto Mágico (coste según rareza)',
    description: 'Despacho tranquilo con atriles, grimorios y matrices rúnicas para investigación y artesanía arcana.'
  },
  {
    id: 'armeria',
    name: 'Armería (Armory)',
    minLevel: 5,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'trade',
    passiveBenefit: 'Mientras esté abastecida, tus Defensores del Baluarte tiran 1d8 en lugar de 1d6 en sucesos de Ataque (mueren solo con 1).',
    orderSummary: 'Abastecer Armería (Comerciar): equipa a todos tus defensores (cuesta 100 PO + 100 PO por cada defensor; mitad si tienes Herrería).',
    turnCostGp: 100,
    turnBenefit: 'Defensores mejorados (1d8 en defensa contra ataques)',
    description: 'Bastidores de lanzas, escudos, cotas y munición listos para equipar a la guarnición.'
  },
  {
    id: 'barracon',
    name: 'Barracón (Barrack)',
    minLevel: 5,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'recruit',
    passiveBenefit: 'Aloja hasta 12 Defensores del Baluarte (ampliable a Vasta por 2.000 PO para alojar hasta 25 defensores).',
    orderSummary: 'Reclutar Defensores: incorpora hasta 4 nuevos Defensores del Baluarte sin coste de oro.',
    turnCostGp: 0,
    turnBenefit: '+1d4 / hasta 4 Defensores del Baluarte',
    description: 'Cuartel militar con literas y armeros donde descansa y entrena la guarnición.'
  },
  {
    id: 'jardin',
    name: 'Jardín (Garden)',
    minLevel: 5,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'harvest',
    passiveBenefit: 'Elige tipo (Decorativo, Alimentario, Herbáceo o Venenoso). Ampliable a Vasta (2.000 PO) para producir el doble o combinar dos tipos.',
    orderSummary: 'Cosechar: produce 10 ramos/perfumes (50 PO), 100 días de raciones, Pócima de Curación / Kit herborista o 1 dosis de veneno/antitoxina.',
    turnCostGp: 0,
    turnBenefit: 'Pócima de curación, veneno, 100 raciones o bienes por valor de 50 PO',
    description: 'Huerto o jardín cuidado por un jardinero experto que cultiva plantas raras y medicinales.'
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca (Library)',
    minLevel: 5,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'research',
    passiveBenefit: 'Contiene colecciones de tomos, mapas y crónicas de consulta general.',
    orderSummary: 'Investigar un tema concreto (leyenda, PNJ, lugar, criatura u objeto): al final del turno obtienes hasta 3 datos verídicos desconocidos.',
    turnCostGp: 0,
    turnBenefit: '3 piezas de información precisa sobre el tema investigado',
    description: 'Estanterías repletas de pergaminos y códices custodiados por un bibliotecario erudito.'
  },
  {
    id: 'santuario',
    name: 'Santuario (Sanctuary)',
    minLevel: 5,
    prerequisite: 'Aptitud para usar símbolo sagrado o foco druídico',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'craft',
    passiveBenefit: 'Tras un Descanso Largo en el Baluarte ganas el Sortilegio del Santuario (permite lanzar Palabra de Curación una vez gratis).',
    orderSummary: 'Fabricar Símbolo Sagrado o Foco Druídico sin coste (queda cargado con 1 uso gratuito de Auxilio / Aid o Protección menor).',
    turnCostGp: 0,
    turnBenefit: 'Foco sagrado/druídico bendecido sin coste',
    description: 'Capilla o arboleda consagrada atendida por un acólito devoto.'
  },
  {
    id: 'herreria',
    name: 'Herrería (Smithy)',
    minLevel: 5,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 2,
    order: 'craft',
    passiveBenefit: 'Reduce a la mitad el coste de abastecer una Armería en el mismo Baluarte.',
    orderSummary: 'Fabricar cualquier arma/armadura mundana o munición, o (Nv 9+) forjar un Armamento Mágico Común/Poco Común.',
    turnCostGp: 0,
    turnBenefit: 'Armas/armaduras a mitad de coste de materiales u objeto mágico (Nv 9+)',
    description: 'Fragua ardiente, yunques y fuelles operados por dos herreros maestros.'
  },
  {
    id: 'almacen_comercial',
    name: 'Almacén Comercial (Storehouse)',
    minLevel: 5,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'trade',
    passiveBenefit: 'Almacena mercancías comerciales por valor de hasta 500 PO (Nv 9+: 2.500 PO, Nv 13+: 5.000 PO).',
    orderSummary: 'Comerciar: compra bienes no mágicos o vende mercancías almacenadas con un margen de beneficio del +10% (Nv 5), +20% (Nv 9), +50% (Nv 13) o +100% (Nv 17).',
    turnCostGp: 0,
    turnBenefit: 'Beneficio comercial (+10% a +100% sobre mercancía vendida)',
    description: 'Lonja y depósito fresco gestionado por un factor mercantil con contactos comerciales.'
  },
  {
    id: 'taller',
    name: 'Taller (Workshop)',
    minLevel: 5,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 3,
    order: 'craft',
    passiveBenefit: 'Equipada con 6 tipos de herramientas de artesano diferentes; otorga Inspiración Heroica tras pasar un Descanso Corto en ella (1/Descanso Largo).',
    orderSummary: 'Fabricar cualquier objeto no mágico fabricable con las herramientas del taller o (Nv 9+) Implemento Mágico Común/Poco Común.',
    turnCostGp: 0,
    turnBenefit: 'Equipo artesanal u objeto mágico de implemento (Nv 9+)',
    description: 'Amplia nave de carpintería, cuero, alquimia menor y mecánica fina con tres artesanos.'
  },

  // ================= NIVEL 9 =================
  {
    id: 'salon_juegos',
    name: 'Salón de Juegos (Gaming Hall)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'vasta',
    hirelingsCount: 4,
    order: 'trade',
    passiveBenefit: 'Atrae apostadores y viajeros adinerados a la comarca.',
    orderSummary: 'Comerciar (Dirigir Casa de Apuestas): tira 1d100 para determinar las ganancias semanales del salón (de 1d6×10 PO hasta 10d6×10 PO o 1 Defensor reclutado).',
    turnCostGp: 0,
    turnBenefit: 'Ganancias variables en oro (1d6×10 a 10d6×10 PO)',
    description: 'Sala de dados, naipes de Tres Dragones y tableros regentada por cuatro crupieres.'
  },
  {
    id: 'invernadero',
    name: 'Invernadero (Greenhouse)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'harvest',
    passiveBenefit: 'Contiene un Árbol de Frutos Curativos que produce 3 frutos mágicos diarios (cada uno cura como Pócima de Curación).',
    orderSummary: 'Cosechar: elabora una Poción de Curación Mayor o extrae un veneno raro (Asesino, Verdad, Pale Tincture o Malice) sin coste.',
    turnCostGp: 0,
    turnBenefit: '1 Poción de Curación Mayor o 1 Veneno raro gratis',
    description: 'Estructura acristalada de clima controlado con flora exótica y feérica.'
  },
  {
    id: 'laboratorio',
    name: 'Laboratorio (Laboratory)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'craft',
    passiveBenefit: 'Suministros alquímicos completos y alambiques destiladores.',
    orderSummary: 'Fabricar Suministros Alquímicos (cualquier poción Común o Poco Común a mitad de coste/tiempo) o destilar 1 dosis de veneno (Quemado de Othur, Torpor, etc.).',
    turnCostGp: 50,
    turnBenefit: 'Poción mágica o veneno alquímico avanzado',
    description: 'Cámara ventilada con retortas, hornillos y reactivos custodiada por un alquimista.'
  },
  {
    id: 'sacristia',
    name: 'Sacristía (Sacristy)',
    minLevel: 9,
    prerequisite: 'Aptitud para usar símbolo sagrado o foco druídico',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'craft',
    passiveBenefit: 'Permite recuperar un espacio de conjuro de hasta nivel 5 al gastar 1 minuto rezando durante un Descanso Corto en el Baluarte (1/Descanso Largo).',
    orderSummary: 'Fabricar Agua Bendita mejorada (hasta 500 PO para aumentar daño radiante en +1d6 por cada 100 PO) o Reliquia Mágica Común/Poco Común.',
    turnCostGp: 0,
    turnBenefit: 'Agua Bendita potenciada o Reliquia Mágica',
    description: 'Cámara interior sagrada donde se custodian vestiduras rituales y cálices consagrados.'
  },
  {
    id: 'scriptorium',
    name: 'Scriptorium',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'craft',
    passiveBenefit: 'Prensas, pergaminos vírgenes y tintas raras listas para copistas.',
    orderSummary: 'Fabricar réplica de libro, panfletos (hasta 50 copias, 100 PO) o escribir un Pergamino de Conjuro de hasta nivel 3.',
    turnCostGp: 50,
    turnBenefit: 'Pergamino de Conjuro (Nv 0–3), réplica de libro o panfletos',
    description: 'Sala luminosa de pupitres inclinados donde un escriba maestro transcribe textos y pergaminos.'
  },
  {
    id: 'establo',
    name: 'Establo (Stable)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'trade',
    passiveBenefit: 'Incluye 1 caballo de monta/camello y 2 ponis/mulas; aloja hasta 3 bestias Grandes (Vasta: 6). Tras 14 días allí, las pruebas de Trato con Animales con ellas tienen Ventaja.',
    orderSummary: 'Comerciar Animales: compra o vende monturas y bestias (con un +20% de ganancia sobre precio estándar; +50% a Nv 13, +100% a Nv 17).',
    turnCostGp: 0,
    turnBenefit: 'Compraventa de monturas con +20% a +100% de beneficio',
    description: 'Cuadras limpias y cercado de doma atendidos por un caballerizo veterano.'
  },
  {
    id: 'circulo_teletransporte',
    name: 'Círculo de Teletransporte (Teleportation Circle)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'recruit',
    passiveBenefit: 'Contiene un círculo permanente inscrito con su secuencia de sellos única para viaje instantáneo.',
    orderSummary: 'Reclutar Mago Visitante: tira d20; si es par, un lanzador PNJ amistoso llega y puede lanzar para el grupo un conjuro de Mago de hasta nivel 4 (Nv 17+: nivel 8) a cambio de sus componentes costosos.',
    turnCostGp: 0,
    turnBenefit: 'Servicio gratuito de lanzamiento de conjuro de Mago invitado',
    description: 'Cámara circular pavimentada con glifos de plata y custodiada por un ujier arcano.'
  },
  {
    id: 'teatro',
    name: 'Teatro (Theater)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'vasta',
    hirelingsCount: 4,
    order: 'empower',
    passiveBenefit: 'Escenario, bambalinas y vestuario para producciones artísticas.',
    orderSummary: 'Potenciar (Producción Teatral, 14 días + 7 días representación): los contribuyentes que pasen prueba de Interpretación CD 15 ganan un Dado de Teatro (1d6, Nv 13: 1d8, Nv 17: 1d10) sumable a una Prueba d20.',
    turnCostGp: 50,
    turnBenefit: 'Dado de Teatro (1d6–1d10) para los personajes participantes',
    description: 'Auditorio con foso, tramoya y compañía estable de cuatro artistas y tramoyistas.'
  },
  {
    id: 'zona_entrenamiento',
    name: 'Zona de Entrenamiento (Training Area)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'vasta',
    hirelingsCount: 4,
    order: 'empower',
    passiveBenefit: 'Cuenta con un instructor experto elegible (Combate, Acrobacias, Sigilo, Instrumento o Armas).',
    orderSummary: 'Potenciar (Entrenamiento de 7 días): otorga durante 7 días un beneficio según el entrenador (reducir daño 1d4, +3 m velocidad al Destrabarse, competencia temporal en habilidad/herramienta o Maestría de Arma).',
    turnCostGp: 0,
    turnBenefit: 'Bonificador marcial/técnico activo durante 7 días',
    description: 'Patio de armas, dianas, maniquíes y circuito de obstáculos dirigido por un maestro instructor.'
  },
  {
    id: 'sala_trofeos',
    name: 'Sala de Trofeos (Trophy Room)',
    minLevel: 9,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'research',
    passiveBenefit: 'Exhibición de cabezas de monstruos, armas vencidas y reliquias históricas.',
    orderSummary: 'Investigar Conocimiento (Lore) o Buscar Baratija/Trofeo: obtienes 3 datos secretos sobre una criatura/linaje o tiras d20 (par = hallas un objeto mágico Común como trofeo olvidado).',
    turnCostGp: 0,
    turnBenefit: '3 datos de lore o probabilidad (50%) de Objeto Mágico Común',
    description: 'Galería solemne mantenida por un conservador que investiga la historia de cada trofeo.'
  },

  // ================= NIVEL 13 =================
  {
    id: 'archivo',
    name: 'Archivo (Archive)',
    minLevel: 13,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'research',
    passiveBenefit: 'Contiene un Libro de Referencia valioso a elección (+Ventaja en Arcanos, Historia, Naturaleza, Investigación o Religión mientras se consulta en el Baluarte). Ampliable a Vasta (2.000 PO) para 2 libros extra.',
    orderSummary: 'Investigar Información Útil: lanza el equivalente al conjuro Conocimiento de las Leyendas (Legend Lore) sobre una persona, lugar u objeto célebre.',
    turnCostGp: 0,
    turnBenefit: 'Efecto completo de Conocimiento de las Leyendas (Legend Lore)',
    description: 'Bóveda climatizada de incunables, tratados únicos y mapas antiguos.'
  },
  {
    id: 'camara_meditacion',
    name: 'Cámara de Meditación (Meditation Chamber)',
    minLevel: 13,
    prerequisite: 'Ninguno',
    defaultSpace: 'estrecha',
    hirelingsCount: 1,
    order: 'empower',
    passiveBenefit: 'Puedes meditar 7 días seguidos en ella para ganar Ventaja en dos tipos de tiradas de salvación elegidas al azar durante los siguientes 7 días.',
    orderSummary: 'Potenciar Paz Interior: la próxima vez que se tire un Suceso de Baluarte puedes tirar dos veces en la tabla 1d100 y elegir cualquiera de los dos resultados.',
    turnCostGp: 0,
    turnBenefit: 'Doble tirada a elegir en el próximo Suceso de Baluarte',
    description: 'Santuario silencioso de incienso y geometría armónica para fortalecer la mente.'
  },
  {
    id: 'casa_fieras',
    name: 'Casa de Fieras (Menagerie)',
    minLevel: 13,
    prerequisite: 'Ninguno',
    defaultSpace: 'vasta',
    hirelingsCount: 2,
    order: 'recruit',
    passiveBenefit: 'Aloja hasta 4 criaturas Grandes (o 8 Medianas/Pequeñas). Las criaturas alojadas pueden contar como Defensores del Baluarte si lo deseas.',
    orderSummary: 'Reclutar Criatura: los cuidadores capturan y domestican una bestia o monstruosidad (VD 1/4 a VD 3 según coste de 50 a 3.500 PO) para el recinto.',
    turnCostGp: 500,
    turnBenefit: '1 criatura guardiana/defensora añadida al Baluarte',
    description: 'Recinto biodinámico con jaulas amplias y hábitats cuidados por dos domadores.'
  },
  {
    id: 'observatorio',
    name: 'Observatorio (Observatory)',
    minLevel: 13,
    prerequisite: 'Aptitud para usar foco de lanzamiento de conjuros',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'empower',
    passiveBenefit: 'Tras pasar un Descanso Largo en el Observatorio ganas el Sortilegio del Observatorio (1 uso gratuito de Contactar con Otro Plano).',
    orderSummary: 'Potenciar Exploración Estelar (7 noches): tira d20; si es impar, tú o un aliado ganáis un Sortilegio Sobrenatural (Visión en la Oscuridad, Heroísmo o Vitalidad) por 7 días.',
    turnCostGp: 0,
    turnBenefit: 'Probabilidad (50%) de Sortilegio Sobrenatural (Charm)',
    description: 'Torre elevada coronada por una cúpula giratoria y un gran telescopio planar.'
  },
  {
    id: 'taberna',
    name: 'Taberna (Pub)',
    minLevel: 13,
    prerequisite: 'Ninguno',
    defaultSpace: 'espaciosa',
    hirelingsCount: 1,
    order: 'research',
    passiveBenefit: 'Dispone de 1 brebaje especial mágico de grifo (Agrandar, Visión en la oscuridad, Nigromancia, etc. por 24 h; Vasta: 4 camareros y 2 brebajes).',
    orderSummary: 'Investigar (Red de Espías): los parroquianos e informantes rastrean sucesos importantes a 15 km del Baluarte durante 7 días y revelan ubicaciones ocultas.',
    turnCostGp: 0,
    turnBenefit: 'Inteligencia de red de informantes + brebaje mágico permanente',
    description: 'Animada posada con barra de roble donde viajeros y espías intercambian rumores.'
  },
  {
    id: 'relicario',
    name: 'Relicario (Reliquary)',
    minLevel: 13,
    prerequisite: 'Aptitud para usar símbolo sagrado o foco druídico',
    defaultSpace: 'estrecha',
    hirelingsCount: 1,
    order: 'harvest',
    passiveBenefit: 'Tras un Descanso Largo en el Baluarte ganas el Sortilegio del Relicario (permite lanzar Restablecimiento Mayor una vez sin espacio ni componentes).',
    orderSummary: 'Cosechar Talismán: produce un Talismán consagrado que puede sustituir componentes materiales de hasta 1.000 PO no consumidos (o consumidos una vez).',
    turnCostGp: 0,
    turnBenefit: '1 Talismán Sagrado (sustituye componente de hasta 1.000 PO)',
    description: 'Cripta blindada de vitrinas bendecidas que custodia reliquias divinas y primordiales.'
  },

  // ================= NIVEL 17 =================
  {
    id: 'semiplano',
    name: 'Semiplano (Demiplane)',
    minLevel: 17,
    prerequisite: 'Aptitud para usar foco arcano o herramienta como foco de conjuros',
    defaultSpace: 'vasta',
    hirelingsCount: 1,
    order: 'empower',
    passiveBenefit: 'Una puerta rúnica invisible conecta el Baluarte con una estancia extradimensional segura; ni objetos ni criaturas pueden entrar sin tu permiso.',
    orderSummary: 'Potenciar Runas Arcanas: inscribe runas que te otorgan PG Temporales iguales a 5 × tu nivel tras pasar un Descanso Largo en el Semiplano.',
    turnCostGp: 0,
    turnBenefit: 'PG Temporales = 5 × Nivel del PJ tras Descanso Largo',
    description: 'Salón de piedra o cristal suspendido fuera del Plano Material y ligado al Baluarte.'
  },
  {
    id: 'sede_gremial',
    name: 'Sede Gremial (Guildhall)',
    minLevel: 17,
    prerequisite: 'Pericia (Expertise) en al menos una habilidad',
    defaultSpace: 'vasta',
    hirelingsCount: 1,
    order: 'recruit',
    passiveBenefit: 'Incluye un Gremio de unos 50 miembros especializados (Aventureros, Panaderos, Albañiles, Ladrones, Navegantes, Tejedores, etc.).',
    orderSummary: 'Reclutar Misión Gremial: asigna al gremio una tarea acorde a su especialidad (rastrear bestia, construir fortificación, tejer estandartes, fletar barco o infiltrarse).',
    turnCostGp: 0,
    turnBenefit: 'Operación completa ejecutada por los 50 maestros del gremio',
    description: 'Gran lonja corporativa presidida por tu emblema donde se reúne toda una cofradía.'
  },
  {
    id: 'sanctasanctorum',
    name: 'Sanctasanctórum (Sanctum)',
    minLevel: 17,
    prerequisite: 'Aptitud para usar símbolo sagrado o foco druídico',
    defaultSpace: 'espaciosa',
    hirelingsCount: 4,
    order: 'empower',
    passiveBenefit: 'Otorga el Sortilegio del Sanctasanctórum (Curar / Heal una vez gratis). Además, si mueres, tu cuerpo o alma puede reformarse vivo aquí tras 7 días.',
    orderSummary: 'Potenciar Ritos Fortificantes: bendice a un personaje (incluso a distancia) para que gane PG Temporales iguales a tu nivel cada vez que termine un Descanso Largo durante 7 días.',
    turnCostGp: 0,
    turnBenefit: 'Bendición de PG Temporales diarios durante 7 días',
    description: 'Templo interior supremo atendido por cuatro sumos sacerdotes consagrados.'
  },
  {
    id: 'sala_guerra',
    name: 'Sala de Guerra (War Room)',
    minLevel: 17,
    prerequisite: 'Competencia con Armas Marciales o Rasgo Lucha con Estilo',
    defaultSpace: 'vasta',
    hirelingsCount: 2,
    order: 'recruit',
    passiveBenefit: 'Empieza con 2 Lugartenientes veteranos (hasta 10 máximo; cada uno reduce en 1 el número de dados perdidos en un ataque al Baluarte).',
    orderSummary: 'Reclutar Lugarteniente o Soldados: incorpora 1 nuevo Lugarteniente veterano o reúne un regimiento de 100 guardias leales (acampan alrededor; 1 PO/día de mantenimiento si salen de campaña).',
    turnCostGp: 0,
    turnBenefit: '+1 Lugarteniente de élite o +100 Soldados de guarnición',
    description: 'Cámara estratégica con mapas en relieve de campaña y estado mayor militar.'
  }
];

export const BASTION_STAFF_ROLES = [
  { id: 'hireling', name: 'Asalariado de Instalación (Hireling)', badgeClass: 'bg-info text-dark' },
  { id: 'defender', name: 'Defensor del Baluarte (Defender)', badgeClass: 'bg-danger text-light' },
  { id: 'lieutenant', name: 'Lugarteniente / Capitán', badgeClass: 'bg-warning text-dark' },
  { id: 'steward', name: 'Mayordomo / Senescal', badgeClass: 'bg-primary text-light' },
  { id: 'guest', name: 'Huésped / Aliado PNJ', badgeClass: 'bg-success text-dark' },
  { id: 'specialist', name: 'Especialista / Erudito', badgeClass: 'bg-secondary text-light' }
];

export const BASTION_EVENTS_TABLE = [
  {
    min: 1,
    max: 50,
    id: 'all_is_well',
    title: 'Todo en Calma (All Is Well)',
    summary: 'Nada relevante perturba la paz del Baluarte durante este turno.',
    details: 'La vida cotidiana transcurre con tranquilidad: los asalariados informan de pequeñas anécdotas domésticas, reparaciones rutinarias y buen ánimo en la fortaleza.'
  },
  {
    min: 51,
    max: 55,
    id: 'attack',
    title: '¡Ataque contra el Baluarte! (Attack)',
    summary: 'Una fuerza hostil asalta el Baluarte, pero es rechazada.',
    details: 'Tira 6d6 por los Defensores del Baluarte (o 6d8 si dispone de una Armería abastecida; resta 1 dado por cada Lugarteniente de Sala de Guerra). Por cada "1" obtenido en esos dados, muere 1 Defensor del Baluarte. Si el Baluarte tiene 0 defensores, una Instalación Especial al azar queda dañada e inutilizada durante el próximo turno (se repara gratis dando la orden Mantener o sin orden).',
    rollDefendersAttack: true
  },
  {
    min: 56,
    max: 58,
    id: 'criminal_hireling',
    title: 'Asalariado con Pasado Criminal (Criminal Hireling)',
    summary: 'Guardias o cazarrecompensas llegan con orden de arresto contra uno de tus asalariados.',
    details: 'Un asalariado de una de tus instalaciones tiene un delito en su pasado. Puedes pagar un soborno/fianza de 1d6 × 100 PO para conservarlo en su puesto, o permitir que se lo lleven (la instalación pierde ese asalariado hasta el siguiente turno, en que se reemplaza sin coste).'
  },
  {
    min: 59,
    max: 63,
    id: 'extraordinary_opportunity',
    title: 'Oportunidad Extraordinaria (Extraordinary Opportunity)',
    summary: 'El Baluarte recibe la oferta de celebrar un gran festival, cumbre o patrocinio de prestigio.',
    details: 'Puedes invertir 500 PO inmediatamente para financiar el acontecimiento. Si lo haces, el Baluarte gana renombre local y vuelves a tirar de inmediato en la tabla de Sucesos de Baluarte (repitiendo si sale "Todo en Calma"). Si declinas, no ocurre nada negativo.'
  },
  {
    min: 64,
    max: 72,
    id: 'friendly_visitors',
    title: 'Visitantes Amistosos (Friendly Visitors)',
    summary: 'Una caravana, comitiva o grupo de viajeros busca hospitalidad temporal.',
    details: 'Los visitantes piden usar una de tus instalaciones brevemente sin interrumpir tus órdenes actuales y ofrecen como agradecimiento 1d6 × 100 PO en oro o mercancías equivalentes.'
  },
  {
    min: 73,
    max: 76,
    id: 'guest',
    title: 'Huésped Destacado (Guest)',
    summary: 'Un personaje notable solicita alojarse en tu Baluarte.',
    details: 'Subtabla 1d4: (1) Buscador de renombre que te entregará una carta de recomendación para un noble/líder (+1d6×100 PO si lo alojas); (2) Suplicante perseguido que pide santuario y ofrece 1d6×100 PO; (3) Mercenario veterano que se une gratis como +2 Defensores del Baluarte permanentes; (4) Espía/Traidor encubierto que intenta recabar secretos si no es descubierto.'
  },
  {
    min: 77,
    max: 79,
    id: 'lost_hirelings',
    title: 'Asalariados Desaparecidos (Lost Hirelings)',
    summary: 'Los asalariados de una instalación al azar han desaparecido misteriosamente.',
    details: 'Una Instalación Especial al azar se queda sin personal durante el próximo turno de Baluarte y no podrá recibir órdenes hasta que nuevos asalariados ocupen su puesto gratuitamente tras finalizar el siguiente turno (o hasta que los PJs investiguen qué les ocurrió).'
  },
  {
    min: 80,
    max: 83,
    id: 'magical_discovery',
    title: 'Descubrimiento Mágico (Magical Discovery)',
    summary: 'Tus asalariados descubren o destilan accidentalmente una maravilla mágica.',
    details: 'Obtienes sin coste un Objeto Mágico Poco Común a tu elección que sea una Poción o un Pergamino de Conjuro (por ejemplo, Poción de Curación Mayor, Poción de Resistencia o Pergamino de Conjuro de nivel 2-3).'
  },
  {
    min: 84,
    max: 91,
    id: 'refugees',
    title: 'Refugiados (Refugees)',
    summary: 'Un grupo de 2d4 refugiados huye de un monstruo o desastre y pide cobijo en tu Baluarte.',
    details: 'Si dispones de espacio básico para acogerlos, los refugiados te ofrecen 1d6 × 100 PO por protegerlos hasta que pase el peligro (o pueden quedarse colaborando como trabajadores leales).'
  },
  {
    min: 92,
    max: 98,
    id: 'request_for_aid',
    title: 'Solicitud de Auxilio (Request for Aid)',
    summary: 'Un líder local pide que el Baluarte envíe refuerzos para socorrer a la comunidad.',
    details: 'Puedes enviar 1 o más Defensores del Baluarte. Tira 1d6 por cada defensor enviado: si la suma total es 10 o más, resuelven la crisis sin bajas y recibes una recompensa de 1d6 × 100 PO; si la suma es menor de 10, la resuelven pero recibes la mitad de la recompensa y pierdes 1 defensor.'
  },
  {
    min: 99,
    max: 100,
    id: 'treasure',
    title: '¡Hallazgo de Tesoro o Presente! (Treasure)',
    summary: 'Tu Baluarte adquiere de forma inesperada un objeto de arte o reliquia valiosa.',
    details: 'Un mecenas agradecido, una cámara secreta descubierta en los cimientos o una subasta fortuita aporta un tesoro: tira 1d100 -> (01–40) Objeto de arte de 25 PO; (41–75) Objeto de arte de 250 PO; (76–95) Obra maestra de 750 PO; (96–100) Obra real de 2.500 PO o un Objeto Mágico Común/Poco Común.'
  }
];

function rollSimpleDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Resuelve un Suceso de Baluarte oficial DMG 2024 a partir de una tirada manual (1..100) o automática.
 * @param {number|null} manualRoll Valor 1-100 o null para tirar 1d100 automáticamente
 * @param {Object} options { defendersCount, hasStockedArmory, lieutenantsCount }
 * @returns {Object} Resultado enriquecido del suceso
 */
export function resolveBastionEvent(manualRoll = null, options = {}) {
  const d100 = (manualRoll !== null && manualRoll !== undefined && !Number.isNaN(Number(manualRoll)))
    ? Math.max(1, Math.min(100, Math.round(Number(manualRoll))))
    : rollSimpleDie(100);

  const entry = BASTION_EVENTS_TABLE.find(e => d100 >= e.min && d100 <= e.max) || BASTION_EVENTS_TABLE[0];
  const extraNotes = [];

  if (entry.id === 'attack') {
    const defenders = Math.max(0, Number(options.defendersCount) || 0);
    const hasArmory = Boolean(options.hasStockedArmory);
    const lieutenants = Math.max(0, Number(options.lieutenantsCount) || 0);
    const diceCount = Math.max(0, 6 - lieutenants);
    const dieSides = hasArmory ? 8 : 6;
    if (defenders === 0) {
      extraNotes.push('⚠️ El Baluarte tiene 0 defensores: ninguna baja personal, pero 1 Instalación Especial queda dañada e inoperativa el próximo turno.');
    } else if (diceCount === 0) {
      extraNotes.push(`🛡️ Tus ${lieutenants} Lugartenientes repelen el ataque tácticamente (0 dados de bajas tirados).`);
    } else {
      const rolls = Array.from({ length: diceCount }, () => rollSimpleDie(dieSides));
      const casualties = rolls.filter(r => r === 1).length;
      extraNotes.push(`🎲 Tirada de defensa (${diceCount}d${dieSides}${hasArmory ? ' con Armería' : ''}): [${rolls.join(', ')}] → ${casualties === 0 ? '¡0 bajas entre los defensores!' : `${casualties} defensor(es) caído(s).`}`);
    }
  } else if (entry.id === 'criminal_hireling' || entry.id === 'friendly_visitors' || entry.id === 'request_for_aid') {
    const gp = rollSimpleDie(6) * 100;
    extraNotes.push(`💰 Tirada sugerida (1d6 × 100 PO): ${gp} PO.`);
  } else if (entry.id === 'refugees') {
    const count = rollSimpleDie(4) + rollSimpleDie(4);
    const gp = rollSimpleDie(6) * 100;
    extraNotes.push(`👥 Llegan ${count} refugiados (2d4) ofreciendo ${gp} PO (1d6 × 100 PO).`);
  } else if (entry.id === 'guest') {
    const guestSub = rollSimpleDie(4);
    const guestTypes = {
      1: `1 - Personaje Célebre (ofrece carta de recomendación y ${rollSimpleDie(6) * 100} PO)`,
      2: `2 - Suplicante Perseguido (pide asilo y ofrece ${rollSimpleDie(6) * 100} PO)`,
      3: '3 - Mercenario Leal (+2 Defensores del Baluarte permanentes gratis)',
      4: '4 - Traidor / Espía infiltrado entre los huéspedes'
    };
    extraNotes.push(`🎭 Subtabla de Huésped (1d4 = ${guestSub}): ${guestTypes[guestSub]}`);
  } else if (entry.id === 'treasure') {
    const sub = rollSimpleDie(100);
    const prize = sub <= 40 ? 'Objeto de arte de 25 PO' : sub <= 75 ? 'Objeto de arte de 250 PO' : sub <= 95 ? 'Obra de arte de 750 PO' : 'Tesoro de 2.500 PO u Objeto Mágico Poco Común';
    extraNotes.push(`💎 Subtabla de Tesoro (1d100 = ${sub}): ${prize}.`);
  }

  return {
    roll: d100,
    isManual: manualRoll !== null && manualRoll !== undefined && !Number.isNaN(Number(manualRoll)),
    eventId: entry.id,
    title: entry.title,
    summary: entry.summary,
    details: entry.details,
    extraNotes,
    timestamp: new Date().toISOString()
  };
}
