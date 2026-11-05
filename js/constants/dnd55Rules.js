const ABILITY_LABELS = {
  str: { name: "Fuerza", short: "FUE", desc: "Poderío físico, atletismo y daño cuerpo a cuerpo." },
  dex: { name: "Destreza", short: "DES", desc: "Agilidad, reflejos, iniciativa y clase de armadura." },
  con: { name: "Constitución", short: "CON", desc: "Salud, resistencia física y puntos de golpe." },
  int: { name: "Inteligencia", short: "INT", desc: "Agudeza mental, razonamiento, memoria y arcanos." },
  wis: { name: "Sabiduría", short: "SAB", desc: "Consciencia, intuición, percepción y perspicacia." },
  cha: { name: "Carisma", short: "CAR", desc: "Fuerza de personalidad, elocuencia y liderazgo." }
};

function getAbilityShortName(key) {
  if (!key) return '';
  const lower = String(key).toLowerCase().trim();
  const map = {
    str: 'FUE',
    fuerza: 'FUE',
    fue: 'FUE',
    dex: 'DES',
    destreza: 'DES',
    des: 'DES',
    con: 'CON',
    constitucion: 'CON',
    constitución: 'CON',
    int: 'INT',
    inteligencia: 'INT',
    wis: 'SAB',
    sabiduria: 'SAB',
    sabiduría: 'SAB',
    sab: 'SAB',
    cha: 'CAR',
    carisma: 'CAR',
    car: 'CAR'
  };
  return map[lower] || (ABILITY_LABELS[lower]?.short || lower.toUpperCase());
}

function getAbilityFullName(key) {
  if (!key) return '';
  const lower = String(key).toLowerCase().trim();
  const map = {
    str: 'Fuerza',
    dex: 'Destreza',
    con: 'Constitución',
    int: 'Inteligencia',
    wis: 'Sabiduría',
    cha: 'Carisma'
  };
  return map[lower] || (ABILITY_LABELS[lower]?.name || key);
}
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const DND55_SKILLS = [
  { name: "Acrobacias", ability: "dex", description: "Mantenerse en pie, piruetas y equilibrios." },
  { name: "Arcanos", ability: "int", description: "Conocimiento sobre magia, conjuros y planos." },
  { name: "Atletismo", ability: "str", description: "Escalar, saltar, nadar y forcejear en combate." },
  { name: "Enga\xF1o", ability: "cha", description: "Ocultar la verdad mediante mentiras o enga\xF1os." },
  { name: "Historia", ability: "int", description: "Eventos pasados, guerras, leyendas y linajes." },
  { name: "Interpretaci\xF3n", ability: "cha", description: "Deleitar con m\xFAsica, teatro, baile o narraci\xF3n." },
  { name: "Intimidaci\xF3n", ability: "cha", description: "Influir mediante amenazas u hostilidad." },
  { name: "Investigaci\xF3n", ability: "int", description: "Deducir pistas, buscar mecanismos y detalles." },
  { name: "Juego de manos", ability: "dex", description: "Robar carteras, ocultar objetos y trucos manuales." },
  { name: "Medicina", ability: "wis", description: "Estabilizar heridos o diagnosticar enfermedades." },
  { name: "Naturaleza", ability: "int", description: "Terrenos, flora, fauna y clima salvaje." },
  { name: "Percepci\xF3n", ability: "wis", description: "Detectar ruidos, ver emboscadas o notar peligros." },
  { name: "Perspicacia", ability: "wis", description: "Descifrar verdaderas intenciones o mentiras." },
  { name: "Persuasi\xF3n", ability: "cha", description: "Convencer diplom\xE1ticamente con tacto y gracia." },
  { name: "Religi\xF3n", ability: "int", description: "Deidades, ritos, cultos y mitolog\xEDas sagradas." },
  { name: "Sigilo", ability: "dex", description: "Ocultarse en sombras y moverse sin hacer ruido." },
  { name: "Supervivencia", ability: "wis", description: "Rastrear presas, orientarse y buscar sustento." },
  { name: "Trato con animales", ability: "wis", description: "Calmar bestias, montar monturas y adiestrar." }
];
const DND55_SPECIES = [
  {
    id: "humano",
    name: "Humano",
    speed: 9,
    size: "Mediano",
    traits: [
      { name: "Ingenio", description: "Tras cada descanso largo, obtienes autom\xE1ticamente Inspiraci\xF3n Heroica para repetir cualquier tirada de d20." },
      { name: "Diestro", description: "Ganas competencia en una habilidad adicional de tu elecci\xF3n y en un conjunto de herramientas." },
      { name: "Vers\xE1til", description: "Obtienes una dote de origen adicional de tu elecci\xF3n a nivel 1." }
    ]
  },
  {
    id: "elfo",
    name: "Elfo",
    speed: 9,
    size: "Mediano",
    traits: [
      { name: "Visi\xF3n en la Oscuridad (18 m)", description: "Ves con luz tenue como si fuera luz brillante, y en la oscuridad como si fuera luz tenue en un radio de 18 metros." },
      { name: "Sentidos Agudos", description: "Tienes competencia en la habilidad de Percepci\xF3n." },
      { name: "Linaje Fe\xE9rico", description: "Tienes ventaja en tiradas de salvaci\xF3n para evitar o terminar la condici\xF3n de Hechizado." },
      { name: "Trance", description: "No necesitas dormir. Meditas durante 4 horas para obtener el beneficio completo de un descanso largo." }
    ],
    sublineages: [
      { id: "alto_elfo", name: "Alto Elfo", description: "Aprendes un truco de la lista de mago (intercambiable tras descanso largo). A nivel 3 lanzas Detecci\xF3n M\xE1gica y a nivel 5 Paso Brumoso sin gastar espacios." },
      { id: "elfo_bosques", name: "Elfo de los Bosques", description: "Tu velocidad base aumenta a 10,5 metros y aprendes el truco Artilugio de Druida. A nivel 3 lanzas Zancada Prodigiosa y a nivel 5 Pasar sin Rastro." },
      { id: "drow", name: "Drow (Elfo Oscuro)", description: "Visi\xF3n en la oscuridad ampliada a 36 metros y aprendes Luces Danzantes. A nivel 3 lanzas Fuego Fe\xE9rico y a nivel 5 Oscuridad." }
    ]
  },
  {
    id: "enano",
    name: "Enano",
    speed: 9,
    size: "Mediano",
    traits: [
      { name: "Visi\xF3n en la Oscuridad (36 m)", description: "Ves en la oscuridad con gran precisi\xF3n hasta 36 metros (120 pies)." },
      { name: "Resistencia Enana", description: "Resistencia al da\xF1o por veneno y ventaja en tiradas de salvaci\xF3n contra la condici\xF3n de Envenenado." },
      { name: "Dureza de la Piedra", description: "Tus Puntos de Golpe m\xE1ximos aumentan en 1 por cada nivel de personaje." },
      { name: "Sentido de la Piedra", description: "Como acci\xF3n adicional mientras toques una superficie de piedra, ganas sentido de la vibraci\xF3n de 18 metros durante 10 minutos (usos = bonificador de competencia por descanso largo)." }
    ]
  },
  {
    id: "mediano",
    name: "Mediano",
    speed: 9,
    size: "Peque\xF1o",
    traits: [
      { name: "Afortunado", description: "Cuando saques un 1 en un d20 (ataque, salvaci\xF3n o prueba), puedes volver a tirar el dado y usar el nuevo resultado." },
      { name: "Valiente", description: "Tienes ventaja en tiradas de salvaci\xF3n para evitar o terminar la condici\xF3n de Asustado." },
      { name: "Agilidad de Mediano", description: "Puedes moverte a trav\xE9s del espacio de cualquier criatura que sea de un tama\xF1o mayor que el tuyo." },
      { name: "Sigilo Innato", description: "Puedes intentar esconderte incluso cuando solo est\xE9s cubierto por una criatura m\xE1s grande." }
    ]
  },
  {
    id: "goliat",
    name: "Goliat",
    speed: 10.5,
    size: "Mediano",
    traits: [
      { name: "Linaje de Gigantes", description: "Desciendes de gigantes legendarios y obtienes un rasgo sobrenatural de gigante que puedes usar tantas veces como tu bonificador de competencia por descanso largo." },
      { name: "Constituci\xF3n Poderosa", description: "Cuentas como un tama\xF1o mayor al determinar tu capacidad de carga, empuje y arrastre, y tienes ventaja en salvaciones para escapar de presas." },
      { name: "Forma Grande (Nivel 5)", description: "Como acci\xF3n adicional, puedes cambiar tu tama\xF1o a Grande durante 10 minutos: ganas ventaja en pruebas de Fuerza y +3 metros a tu velocidad (1 vez por descanso largo)." }
    ],
    sublineages: [
      { id: "goliat_nube", name: "Gigante de las Nubes", description: "Salto de las Nubes: Como acci\xF3n adicional, te teletransportas m\xE1gicamente hasta 9 metros a un espacio libre que puedas ver." },
      { id: "goliat_fuego", name: "Gigante de Fuego", description: "Golpe \xCDgneo: Al impactar a un objetivo con un ataque, infliges 1d10 puntos de da\xF1o por fuego adicionales." },
      { id: "goliat_escarcha", name: "Gigante de Escarcha", description: "Toque Escarchado: Al impactar a un objetivo con un ataque, infliges 1d6 de da\xF1o por fr\xEDo y reduces su velocidad en 3 metros hasta tu siguiente turno." },
      { id: "goliat_colina", name: "Gigante de la Colina", description: "Derribo de la Colina: Al impactar a una criatura Grande o menor con un ataque, la derribas autom\xE1ticamente dej\xE1ndola tumbada." },
      { id: "goliat_piedra", name: "Gigante de Piedra", description: "Fortaleza de Piedra: Como reacci\xF3n al recibir da\xF1o, reduces el da\xF1o sufrido en 1d12 + modificador de Constituci\xF3n." },
      { id: "goliat_tormenta", name: "Gigante de la Tormenta", description: "Venganza de la Tormenta: Como reacci\xF3n al recibir da\xF1o de un atacante a 18 m, le infliges 1d8 de da\xF1o por trueno y desventaja en su siguiente ataque." }
    ]
  },
  {
    id: "draconido",
    name: "Drac\xF3nido",
    speed: 9,
    size: "Mediano",
    traits: [
      { name: "Arma de Aliento", description: "Exhalas energ\xEDa destructiva (cono de 4,5 m o l\xEDnea de 9 m). Criaturas en el \xE1rea sufren 1d10 de da\xF1o elemental (2d10 a nivel 5, 3d10 a nivel 11, 4d10 a nivel 17). Reemplaza 1 ataque de la acci\xF3n de Atacar (usos = bonificador de competencia por descanso largo)." },
      { name: "Resistencia Drac\xF3nica", description: "Resistencia permanente al tipo de da\xF1o asociado a tu linaje de drag\xF3n." },
      { name: "Visi\xF3n en la Oscuridad (18 m)", description: "Ojos agudos de reptil que penetran las penumbras hasta 18 metros." },
      { name: "Vuelo Drac\xF3nico (Nivel 5)", description: "Como acci\xF3n adicional, manifiestas alas espectrales que te otorgan velocidad de vuelo igual a tu velocidad durante 10 minutos (1 vez por descanso largo)." }
    ],
    sublineages: [
      { id: "dragon_negro", name: "Drag\xF3n Negro (\xC1cido)", description: "Da\xF1o: \xC1cido | \xC1rea: L\xEDnea de 9 m (1,5 m de ancho) | Salvaci\xF3n: Destreza." },
      { id: "dragon_azul", name: "Drag\xF3n Azul (Rayo)", description: "Da\xF1o: Rayo | \xC1rea: L\xEDnea de 9 m (1,5 m de ancho) | Salvaci\xF3n: Destreza." },
      { id: "dragon_laton", name: "Drag\xF3n de Lat\xF3n (Fuego)", description: "Da\xF1o: Fuego | \xC1rea: L\xEDnea de 9 m (1,5 m de ancho) | Salvaci\xF3n: Destreza." },
      { id: "dragon_bronce", name: "Drag\xF3n de Bronce (Rayo)", description: "Da\xF1o: Rayo | \xC1rea: L\xEDnea de 9 m (1,5 m de ancho) | Salvaci\xF3n: Destreza." },
      { id: "dragon_cobre", name: "Drag\xF3n de Cobre (\xC1cido)", description: "Da\xF1o: \xC1cido | \xC1rea: L\xEDnea de 9 m (1,5 m de ancho) | Salvaci\xF3n: Destreza." },
      { id: "dragon_oro", name: "Drag\xF3n de Oro (Fuego)", description: "Da\xF1o: Fuego | \xC1rea: Cono de 4,5 m | Salvaci\xF3n: Destreza." },
      { id: "dragon_verde", name: "Drag\xF3n Verde (Veneno)", description: "Da\xF1o: Veneno | \xC1rea: Cono de 4,5 m | Salvaci\xF3n: Constituci\xF3n." },
      { id: "dragon_rojo", name: "Drag\xF3n Rojo (Fuego)", description: "Da\xF1o: Fuego | \xC1rea: Cono de 4,5 m | Salvaci\xF3n: Destreza." },
      { id: "dragon_plata", name: "Drag\xF3n de Plata (Fr\xEDo)", description: "Da\xF1o: Fr\xEDo | \xC1rea: Cono de 4,5 m | Salvaci\xF3n: Constituci\xF3n." },
      { id: "dragon_blanco", name: "Drag\xF3n Blanco (Fr\xEDo)", description: "Da\xF1o: Fr\xEDo | \xC1rea: Cono de 4,5 m | Salvaci\xF3n: Constituci\xF3n." }
    ]
  },
  {
    id: "gnomo",
    name: "Gnomo",
    speed: 9,
    size: "Peque\xF1o",
    traits: [
      { name: "Astucia Gn\xF3mica", description: "Tienes ventaja en todas las tiradas de salvaci\xF3n de Inteligencia, Sabidur\xEDa y Carisma." },
      { name: "Visi\xF3n en la Oscuridad (18 m)", description: "Adaptaci\xF3n a talleres subterr\xE1neos y cavernas hasta 18 metros." }
    ],
    sublineages: [
      { id: "gnomo_bosque", name: "Gnomo del Bosque", description: "Conoces el truco Ilusi\xF3n Menor y puedes lanzar Hablar con Animales tantas veces como tu bonificador de competencia por descanso largo." },
      { id: "gnomo_roca", name: "Gnomo de la Roca", description: "Conoces los trucos Remendar y Prestidigitaci\xF3n, y puedes fabricar ingenios mec\xE1nicos de relojer\xEDa miniatura." }
    ]
  },
  {
    id: "tiefling",
    name: "Tiflin",
    speed: 9,
    size: "Mediano",
    traits: [
      { name: "Legado Infernal Planar", description: "Desciendes de un plano inferior (Abisal, Ct\xF3nico o Infernal), lo que te otorga resistencia a un elemento y conjuros innatos a niveles 1, 3 y 5." },
      { name: "Visi\xF3n en la Oscuridad (18 m)", description: "Percepci\xF3n ocular infundida por los planos exteriores hasta 18 metros." },
      { name: "Presencia del Otro Mundo", description: "Conoces el truco Taumaturgia que puedes lanzar a voluntad." }
    ],
    sublineages: [
      { id: "tiflin_abisal", name: "Legado Abisal", description: "Resistencia al da\xF1o por Veneno. Conoces Rociada Venenosa (nv 1), Rayo de Enfermedad (nv 3) e Inmovilizar Persona (nv 5)." },
      { id: "tiflin_ctonico", name: "Legado Ct\xF3nico", description: "Resistencia al da\xF1o Necr\xF3tico. Conoces Toque Helado (nv 1), Vida Falsa (nv 3) y Rayo de Debilitamiento (nv 5)." },
      { id: "tiflin_infernal", name: "Legado Infernal", description: "Resistencia al da\xF1o por Fuego. Conoces Descarga de Fuego (nv 1), Reprensi\xF3n Infernal (nv 3) y Oscuridad (nv 5)." }
    ]
  },
  {
    id: "orco",
    name: "Orco",
    speed: 9,
    size: "Mediano",
    traits: [
      { name: "Adrenalina", description: "Como acci\xF3n adicional, realizas la acci\xF3n de Correr y ganas puntos de golpe temporales iguales a tu bonificador de competencia (usos = bonificador de competencia por descanso largo)." },
      { name: "Resistencia Incansable", description: "Cuando tus PG se reducen a 0 sin morir, caes a 1 PG en su lugar (1 vez por descanso largo)." },
      { name: "Visi\xF3n en la Oscuridad (36 m)", description: "Capacidad visual subterr\xE1nea excepcional hasta 36 metros (120 pies)." },
      { name: "Constituci\xF3n Poderosa", description: "Cuentas como un tama\xF1o mayor al determinar tu capacidad de carga, empuje y arrastre." }
    ]
  },
  {
    id: "aasimar",
    name: "Aasimar",
    speed: 9,
    size: "Mediano",
    traits: [
      { name: "Visi\xF3n en la Oscuridad (18 m)", description: "Puedes ver en luz tenue a 18 metros como si fuera luz brillante, y en la oscuridad como si fuera luz tenue." },
      { name: "Resistencia Celestial", description: "Resistencia al da\xF1o Necr\xF3tico y al da\xF1o Radiante." },
      { name: "Manos Curativas", description: "Como acci\xF3n m\xE1gica, tocas a una criatura para sanarle tantos dados d4 como tu bonificador de competencia (1 vez por descanso largo)." },
      { name: "Portador de Luz", description: "Conoces el truco Luz que puedes lanzar a voluntad." },
      { name: "Revelaci\xF3n Celestial (Nivel 3)", description: "Como acci\xF3n adicional durante 1 minuto, despiertas Alas Radiantes (vuelo 9 m), Resplandor Interior (da\xF1o radiante en \xE1rea) o Sudario Necr\xF3tico (asusta y da\xF1a) (1 vez por descanso largo)." }
    ]
  }
];
const DND55_BACKGROUNDS = [
  // ==========================================
  // --- TRASFONDOS DEL MANUAL DEL JUGADOR 2024 ---
  // ==========================================
  {
    id: "acolito",
    name: "Ac\xF3lito",
    allowedAbilities: ["int", "wis", "cha"],
    originFeat: "Iniciado en Magia (Cl\xE9rigo)",
    skills: ["Perspicacia", "Religi\xF3n"],
    toolProficiencies: ["Suministros de cal\xEDgrafo"],
    description: "Dedicaste tu juventud a los servicios de un templo, aprendiendo ritos sagrados, oraciones y dogmas divinos."
  },
  {
    id: "artesano",
    name: "Artesano",
    allowedAbilities: ["str", "dex", "int"],
    originFeat: "Artesano",
    skills: ["Investigaci\xF3n", "Persuasi\xF3n"],
    toolProficiencies: ["Herramientas de artesano a elegir"],
    description: "Maestro de un oficio manual que conoce los secretos de la forja, madera, alquimia o construcci\xF3n."
  },
  {
    id: "charlatan",
    name: "Charlat\xE1n",
    allowedAbilities: ["dex", "con", "cha"],
    originFeat: "Habilidoso",
    skills: ["Enga\xF1o", "Juego de manos"],
    toolProficiencies: ["Kit de falsificaci\xF3n"],
    description: "Vendedor de elixires dudosos o identidades prestadas con gran elocuencia, don de gentes y picard\xEDa."
  },
  {
    id: "comerciante",
    name: "Comerciante",
    allowedAbilities: ["con", "int", "cha"],
    originFeat: "Afortunado",
    skills: ["Trato con animales", "Persuasi\xF3n"],
    toolProficiencies: ["Herramientas de navegante"],
    description: "Comprador y negociador de caravanas y bazares que conoce el valor exacto de las mercanc\xEDas y el arte del regateo."
  },
  {
    id: "criminal",
    name: "Criminal",
    allowedAbilities: ["dex", "con", "int"],
    originFeat: "Alerta",
    skills: ["Juego de manos", "Sigilo"],
    toolProficiencies: ["Herramientas de ladr\xF3n"],
    description: "Te criaste en los bajos fondos, aprendiendo a vigilar las esquinas, burlar patrullas y forzar cerraduras."
  },
  {
    id: "animador",
    name: "Artista",
    allowedAbilities: ["str", "dex", "cha"],
    originFeat: "M\xFAsico",
    skills: ["Acrobacias", "Interpretaci\xF3n"],
    toolProficiencies: ["Instrumento musical a elegir"],
    description: "Cautivas audiencias con canciones \xE9picas, acrobacias deslumbrantes o poes\xEDas dram\xE1ticas."
  },
  {
    id: "escriba",
    name: "Escriba",
    allowedAbilities: ["dex", "int", "wis"],
    originFeat: "Habilidoso",
    skills: ["Investigaci\xF3n", "Percepci\xF3n"],
    toolProficiencies: ["Suministros de cal\xEDgrafo"],
    description: "Registrador de leyes, cr\xF3nicas y tratados en cortes nobiliarias, bibliotecas o despachos oficiales."
  },
  {
    id: "granjero",
    name: "Granjero",
    allowedAbilities: ["str", "con", "wis"],
    originFeat: "Duro",
    skills: ["Trato con animales", "Naturaleza"],
    toolProficiencies: ["Herramientas de carpintero"],
    description: "Curtido por el trabajo del campo de sol a sol, con una resistencia f\xEDsica formidable y gran sentido pr\xE1ctico."
  },
  {
    id: "guardia",
    name: "Guardia",
    allowedAbilities: ["str", "int", "wis"],
    originFeat: "Alerta",
    skills: ["Atletismo", "Percepci\xF3n"],
    toolProficiencies: ["Juego de dados o cartas"],
    description: "Vigilaste murallas, puertas de ciudades y mazmorras contra ladrones, contrabandistas e incursiones."
  },
  {
    id: "guia",
    name: "Gu\xEDa",
    allowedAbilities: ["dex", "con", "wis"],
    originFeat: "Iniciado en Magia (Druida)",
    skills: ["Sigilo", "Supervivencia"],
    toolProficiencies: ["Suministros de cart\xF3grafo"],
    description: "Experto en caminos agrestes, pasos de monta\xF1a y senderos olvidados en las tierras salvajes."
  },
  {
    id: "ermitano",
    name: "Ermita\xF1o",
    allowedAbilities: ["con", "wis", "cha"],
    originFeat: "Sanador",
    skills: ["Medicina", "Religi\xF3n"],
    toolProficiencies: ["Kit de herborister\xEDa"],
    description: "Viviste en retiro espiritual, estudio m\xEDstico o contemplaci\xF3n en los confines del mundo civilizado."
  },
  {
    id: "noble",
    name: "Noble",
    allowedAbilities: ["str", "int", "cha"],
    originFeat: "Habilidoso",
    skills: ["Historia", "Persuasi\xF3n"],
    toolProficiencies: ["Juego de ajedrez drag\xF3n"],
    description: "Nacido en cuna de seda, educado en etiqueta cortesana, diplomacia se\xF1orial y linajes hist\xF3ricos."
  },
  {
    id: "sabio",
    name: "Erudito",
    allowedAbilities: ["con", "int", "wis"],
    originFeat: "Iniciado en Magia (Mago)",
    skills: ["Arcanos", "Historia"],
    toolProficiencies: ["Suministros de cal\xEDgrafo"],
    description: "Pasaste a\xF1os devorando tomos polvorientos y pergaminos antiguos en academias, bibliotecas y abad\xEDas."
  },
  {
    id: "marinero",
    name: "Marinero",
    allowedAbilities: ["str", "dex", "wis"],
    originFeat: "Mat\xF3n de Taberna",
    skills: ["Atletismo", "Percepci\xF3n"],
    toolProficiencies: ["Herramientas de navegante"],
    description: "Curtido por el agua salada, tempestades y peleas portuarias con jarra en mano."
  },
  {
    id: "soldado",
    name: "Soldado",
    allowedAbilities: ["str", "dex", "con"],
    originFeat: "Atacante Salvaje",
    skills: ["Atletismo", "Intimidaci\xF3n"],
    toolProficiencies: ["Veh\xEDculos terrestres o Juego de cartas"],
    description: "Militaste en un ej\xE9rcito profesional, entrenado en formaci\xF3n t\xE1ctica, disciplina militar y asaltos."
  },
  {
    id: "callejero",
    name: "Vagabundo",
    allowedAbilities: ["dex", "con", "wis"],
    originFeat: "Afortunado",
    skills: ["Perspicacia", "Sigilo"],
    toolProficiencies: ["Herramientas de ladr\xF3n"],
    description: "Creciste sobreviviendo por tu propia cuenta e ingenio en las calles y callejones de grandes metr\xF3polis."
  },
  // ==========================================
  // --- TRASFONDOS DE REINOS OLVIDADOS (HÉROES Y AVENTURAS EN FAERÛN) ---
  // ==========================================
  {
    id: "arpista",
    name: "Agente de los Arpistas (Faer\xFBn)",
    allowedAbilities: ["dex", "int", "cha"],
    originFeat: "Alerta",
    skills: ["Historia", "Perspicacia"],
    toolProficiencies: ["Instrumento musical a elegir o Kit de disfraz"],
    description: "Miembro de la red clandestina de los Arpistas que defiende la libertad, la igualdad y la preservaci\xF3n del saber frente a la tiran\xEDa en Faer\xFBn."
  },
  {
    id: "zhentarim",
    name: "Mercenario Zhentarim (Red Negra)",
    allowedAbilities: ["str", "dex", "cha"],
    originFeat: "Mat\xF3n de Taberna",
    skills: ["Intimidaci\xF3n", "Juego de manos"],
    toolProficiencies: ["Herramientas de ladr\xF3n o Juego de cartas"],
    description: "Agente o escolta curtido de la Red Negra en las rutas comerciales, fortalezas y bajos fondos de la Costa de la Espada."
  },
  {
    id: "orden_guantelete",
    name: "Caballero de la Orden del Guantelete (Faer\xFBn)",
    allowedAbilities: ["str", "con", "wis"],
    originFeat: "Atacante Salvaje",
    skills: ["Atletismo", "Religi\xF3n"],
    toolProficiencies: ["Herramientas de herrero o Juego de ajedrez drag\xF3n"],
    description: "Guerrero devoto consagrado a Torm, Helm o Tyr, dedicado a erradicar el mal y proteger a los indefensos en Faer\xFBn."
  },
  {
    id: "enclave_esmeralda",
    name: "Guardi\xE1n del Enclave Esmeralda (Faer\xFBn)",
    allowedAbilities: ["con", "wis", "cha"],
    originFeat: "Iniciado en Magia (Druida)",
    skills: ["Naturaleza", "Supervivencia"],
    toolProficiencies: ["Kit de herborister\xEDa"],
    description: "Protector del equilibrio de la naturaleza en Faer\xFBn que combate aberraciones, excesos destructivos y plagas m\xE1gicas."
  },
  {
    id: "alianza_senores",
    name: "Emisario de la Alianza de los Se\xF1ores (Faer\xFBn)",
    allowedAbilities: ["int", "wis", "cha"],
    originFeat: "Habilidoso",
    skills: ["Historia", "Persuasi\xF3n"],
    toolProficiencies: ["Suministros de cal\xEDgrafo"],
    description: "Diplom\xE1tico y consejero pol\xEDtico al servicio de la confederaci\xF3n de ciudades libres de la Costa de la Espada (Aguasprofundas, Noyvern y Puerta de Baldur)."
  },
  {
    id: "iniciado_mystra",
    name: "Iniciado de la Trama de Mystra (Faer\xFBn)",
    allowedAbilities: ["con", "int", "wis"],
    originFeat: "Iniciado en Magia (Mago)",
    skills: ["Arcanos", "Religi\xF3n"],
    toolProficiencies: ["Suministros de cal\xEDgrafo"],
    description: "Erudito o devoto consagrado a Mystra y Azuth que experimenta una conexi\xF3n pura y directa con las corrientes de la Trama m\xE1gica."
  },
  {
    id: "heredero_fuego_hechizado",
    name: "Portador del Fuego M\xE1gico (Faer\xFBn)",
    allowedAbilities: ["con", "int", "cha"],
    originFeat: "Duro",
    skills: ["Arcanos", "Supervivencia"],
    toolProficiencies: ["Kit de herborister\xEDa"],
    description: "Nacido con el don milagroso y peligroso del Fuego M\xE1gico (Spellfire), la energ\xEDa pura primordial de la Trama en Faer\xFBn."
  },
  {
    id: "valle_viento_helado",
    name: "Superviviente del Valle del Viento Helado (Faer\xFBn)",
    allowedAbilities: ["str", "con", "wis"],
    originFeat: "Duro",
    skills: ["Percepci\xF3n", "Supervivencia"],
    toolProficiencies: ["Herramientas de curtidor o Veh\xEDculos terrestres"],
    description: "Habitante de las Diez Ciudades o n\xF3mada de la tundra helada de Icewind Dale acostumbrado a climas polares extremos y peligros de la nieve."
  },
  {
    id: "erudito_candelero",
    name: "Erudito de Candelero (Faer\xFBn)",
    allowedAbilities: ["int", "wis", "cha"],
    originFeat: "Habilidoso",
    skills: ["Arcanos", "Historia"],
    toolProficiencies: ["Suministros de cal\xEDgrafo"],
    description: "Investigador que ha vivido entre las infinitas torres de pergaminos y tomos arcanos de la mayor biblioteca fortaleza de Toril."
  },
  {
    id: "corsario_costa_espada",
    name: "Corsario del Mar de las Espadas (Faer\xFBn)",
    allowedAbilities: ["str", "dex", "cha"],
    originFeat: "Mat\xF3n de Taberna",
    skills: ["Atletismo", "Intimidaci\xF3n"],
    toolProficiencies: ["Herramientas de navegante o Veh\xEDculos acu\xE1ticos"],
    description: "Lobo de mar al servicio de una ciudad libre o bucanero curtido en las tempestades, monstruos marinos y abordajes del Mar de las Espadas."
  },
  {
    id: "caballero_cormyr",
    name: "Caballero del Drag\xF3n P\xFArpura de Cormyr (Faer\xFBn)",
    allowedAbilities: ["str", "wis", "cha"],
    originFeat: "Atacante Salvaje",
    skills: ["Atletismo", "Historia"],
    toolProficiencies: ["Juego de ajedrez drag\xF3n"],
    description: "Guerrero leal a la Corona de Cormyr y el Drag\xF3n P\xFArpura, entrenado en la caballer\xEDa marcial y el honor inquebrantable en batalla."
  },
  {
    id: "custodio_moonshae",
    name: "Custodio de las Islas Moonshae (Faer\xFBn)",
    allowedAbilities: ["dex", "con", "wis"],
    originFeat: "Iniciado en Magia (Druida)",
    skills: ["Naturaleza", "Percepci\xF3n"],
    toolProficiencies: ["Instrumento musical a elegir"],
    description: "Guardi\xE1n de los pozos de luna y los bosques brumosos de las Islas Moonshae, en armon\xEDa con la Madre Tierra y los esp\xEDritus fe\xE9ricos."
  },
  {
    id: "exiliado_thay",
    name: "Exiliado de Thay (Faer\xFBn)",
    allowedAbilities: ["con", "int", "wis"],
    originFeat: "Iniciado en Magia (Mago)",
    skills: ["Arcanos", "Enga\xF1o"],
    toolProficiencies: ["Suministros de alquimista"],
    description: "Fugitivo o aprendiz renegado de la magocracia de los Magos Rojos de Thay que escap\xF3 hacia las tierras occidentales de Faer\xFBn."
  },
  {
    id: "gladiador_calimshan",
    name: "Gladiador de las Arenas de Calimshan (Faer\xFBn)",
    allowedAbilities: ["str", "dex", "con"],
    originFeat: "Mat\xF3n de Taberna",
    skills: ["Acrobacias", "Atletismo"],
    toolProficiencies: ["Juego de dados o Kit de disfraz"],
    description: "Campe\xF3n veterano de las arenas calishitas que aprendi\xF3 a combatir fieras monstruosas y sobrevivir al calor del desierto."
  },
  {
    id: "guia_infraoscuridad",
    name: "Explorador de la Infraoscuridad (Faer\xFBn)",
    allowedAbilities: ["dex", "con", "wis"],
    originFeat: "Alerta",
    skills: ["Percepci\xF3n", "Sigilo"],
    toolProficiencies: ["Suministros de cart\xF3grafo"],
    description: "Gu\xEDa y rastreador de las profundidades de Toril que conoce los peligros de Menzoberranzan, los du\xE9rgar y los laberintos subterr\xE1neos sin luz."
  },
  {
    id: "cazador_ruinas_netheril",
    name: "Cazador de Ruinas de Netheril (Faer\xFBn)",
    allowedAbilities: ["dex", "int", "wis"],
    originFeat: "Habilidoso",
    skills: ["Arcanos", "Investigaci\xF3n"],
    toolProficiencies: ["Herramientas de ladr\xF3n o Suministros de cal\xEDgrafo"],
    description: "Explorador audaz de las ciudades flotantes ca\xEDdas y enclaves arcanos sepultados del antiguo imperio de Netheril."
  },
  {
    id: "veterano_puerta_baldur",
    name: "Guardia de la Puerta de Baldur (Faer\xFBn)",
    allowedAbilities: ["str", "con", "wis"],
    originFeat: "Alerta",
    skills: ["Atletismo", "Perspicacia"],
    toolProficiencies: ["Juego de dados o Herramientas de herrero"],
    description: "Veterano de los Pu\xF1os Llameantes o la Guardia de la Ciudad de Puerta de Baldur, curtido en tensiones urbanas y conspiraciones."
  },
  {
    id: "agente_aguasprofundas",
    name: "Agente Secreto de Aguasprofundas (Faer\xFBn)",
    allowedAbilities: ["dex", "int", "cha"],
    originFeat: "Habilidoso",
    skills: ["Enga\xF1o", "Investigaci\xF3n"],
    toolProficiencies: ["Kit de falsificaci\xF3n o Herramientas de ladr\xF3n"],
    description: "Informante al servicio de los Se\xF1ores Enmascarados de Aguasprofundas, versado en los secretos de la Ciudad del Esplendor."
  },
  // ==========================================
  // --- TRASFONDO PERSONALIZADO ---
  // ==========================================
  {
    id: "personalizado",
    name: "Trasfondo Personalizado",
    allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"],
    originFeat: "Alerta",
    skills: ["Atletismo", "Perspicacia"],
    toolProficiencies: ["Herramientas a elecci\xF3n"],
    description: "Permite seleccionar 3 caracter\xEDsticas a medida y una dote de origen autorizada por el DM."
  }
];
const DND55_CLASSES = [
  {
    id: "guerrero",
    name: "Guerrero",
    hitDie: 10,
    primaryAbilities: ["str", "dex"],
    savingThrows: ["str", "con"],
    skillChoicesCount: 2,
    availableSkills: ["Acrobacias", "Atletismo", "Historia", "Intimidaci\xF3n", "Percepci\xF3n", "Perspicacia", "Supervivencia"],
    subclassAvailableAtLevel: 3,
    hasFightingStyle: true,
    armorProficiencies: ["Armaduras ligeras", "Armaduras medias", "Armaduras pesadas", "Escudos"],
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    featuresByLevel: [
      { level: 1, name: "Estilo de Combate", description: "Especializaci\xF3n marcial como Defensa, Duelista, Arquer\xEDa o Combate con Dos Armas." },
      { level: 1, name: "Segundo Aliento", description: "Como acci\xF3n adicional recuperas 1d10 + nivel de guerrero en PG (usos escalan con nivel, recuperas 1 en descanso corto y todos en descanso largo)." },
      { level: 1, name: "Dominio de Armas", description: "Desbloqueas las propiedades maestras de hasta 3 armas a tu elecci\xF3n (Derribar, Empujar, Rozar, Hender, Mellar, etc.)." },
      { level: 2, name: "Oleada de Acci\xF3n", description: "Realiza una acci\xF3n adicional en tu turno (1 uso por descanso corto o largo)." },
      { level: 2, name: "Mente T\xE1ctica", description: "Cuando fallas una prueba de caracter\xEDstica de d20, puedes gastar un uso de Segundo Aliento para sumar 1d10 al resultado; si a\xFAn fallas, no se gasta el uso." },
      { level: 3, name: "Subclase de Guerrero", description: "Elige un arquetipo marcial (Campe\xF3n, Maestro de Batalla, Caballero Sobrenatural o Guerrero Ps\xEDquico)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Ataque Adicional", description: "Puedes atacar dos veces en lugar de una cuando realizas la acci\xF3n de Atacar en tu turno." },
      { level: 5, name: "Desplazamiento T\xE1ctico", description: "Al usar Segundo Aliento, puedes moverte hasta la mitad de tu velocidad sin provocar ataques de oportunidad." },
      { level: 6, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o dote adicional concedida por el entrenamiento de guerrero." },
      { level: 7, name: "Rasgo de Subclase", description: "Habilidad avanzada otorgada por tu arquetipo marcial." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Ind\xF3mito", description: "Si fallas una tirada de salvaci\xF3n, puedes repetirla sumando tu nivel de guerrero al nuevo resultado (1 uso por descanso largo)." },
      { level: 9, name: "Maestro T\xE1ctico", description: "Al atacar con un arma que domines, puedes sustituir su propiedad de maestr\xEDa por Empujar, Ralentizar o Mellar." },
      { level: 10, name: "Rasgo de Subclase", description: "Poder superior de tu arquetipo marcial." },
      { level: 11, name: "Dos Ataques Adicionales", description: "Puedes atacar tres veces en lugar de una cuando realizas la acci\xF3n de Atacar." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Ataques Estudiados", description: "Si fallas una tirada de ataque contra una criatura, obtienes ventaja en tu siguiente ataque contra ella antes del final de tu siguiente turno." },
      { level: 13, name: "Ind\xF3mito Mejorado", description: "Ganas un segundo uso de Ind\xF3mito entre descansos largos." },
      { level: 14, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o dote adicional de guerrero." },
      { level: 15, name: "Rasgo de Subclase", description: "Capacidad magistral de tu arquetipo de guerrero." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Oleada de Acci\xF3n Mejorada", description: "Ganas un segundo uso de Oleada de Acci\xF3n entre descansos (1 por turno)." },
      { level: 17, name: "Ind\xF3mito Supremo", description: "Ganas un tercer uso de Ind\xF3mito entre descansos largos." },
      { level: 18, name: "Rasgo de Subclase", description: "Rasgo culminante de tu subclase marcial." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas (Epic Boons) de nivel 19 o mejora de caracter\xEDsticas hasta 20." },
      { level: 20, name: "Tres Ataques Adicionales", description: "El guerrero definitivo: realizas cuatro ataques por cada acci\xF3n de Atacar en tu turno." }
    ]
  },
  {
    id: "barbaro",
    name: "B\xE1rbaro",
    hitDie: 12,
    primaryAbilities: ["str", "con"],
    savingThrows: ["str", "con"],
    skillChoicesCount: 2,
    availableSkills: ["Atletismo", "Intimidaci\xF3n", "Naturaleza", "Percepci\xF3n", "Supervivencia", "Trato con animales"],
    subclassAvailableAtLevel: 3,
    armorProficiencies: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    featuresByLevel: [
      { level: 1, name: "Furia", description: "Ventaja en pruebas y salvaciones de Fuerza, bonificador de furia al da\xF1o con Fuerza (+2) y resistencia a da\xF1o contundente, perforante y cortante." },
      { level: 1, name: "Defensa sin Armadura", description: "Tu CA es 10 + Modificador de Destreza + Modificador de Constituci\xF3n mientras no vistas armadura. Puedes empu\xF1ar escudo." },
      { level: 1, name: "Dominio de Armas", description: "Desbloqueas las propiedades maestras de 2 armas a tu elecci\xF3n." },
      { level: 2, name: "Ataque Temerario", description: "Ganas ventaja en tus tiradas de ataque con Fuerza durante tu turno, pero los ataques contra ti tambi\xE9n tienen ventaja hasta tu siguiente turno." },
      { level: 2, name: "Sentido del Peligro", description: "Ventaja en tiradas de salvaci\xF3n de Destreza contra efectos que puedas ver mientras no est\xE9s incapacitado." },
      { level: 3, name: "Subclase de B\xE1rbaro", description: "Elige una senda primaria (Bers\xE9rker, Coraz\xF3n Salvaje, \xC1rbol del Mundo o Fan\xE1tico Divino)." },
      { level: 3, name: "Conocimiento Primigenio", description: "Ganas competencia en 1 habilidad de b\xE1rbaro adicional. Mientras est\xE9s en Furia, puedes usar Fuerza para pruebas de Acrobacias, Sigilo, Percepci\xF3n, Supervivencia e Intimidaci\xF3n." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Ataque Adicional", description: "Puedes atacar dos veces en lugar de una al realizar la acci\xF3n de Atacar." },
      { level: 5, name: "Movimiento R\xE1pido", description: "Tu velocidad terrestre aumenta en 3 metros mientras no lleves armadura pesada." },
      { level: 6, name: "Rasgo de Subclase", description: "Habilidad intermedia de tu senda primaria salvaje." },
      { level: 7, name: "Instinto Salvaje", description: "Obtienes ventaja en todas las tiradas de iniciativa." },
      { level: 7, name: "Salto Instintivo", description: "Como parte de la acci\xF3n adicional con la que entras en Furia, puedes moverte hasta la mitad de tu velocidad." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Golpe Brutal", description: "Al usar Ataque Temerario, puedes renunciar a la ventaja para infligir 1d10 extra y aplicar un efecto t\xE1ctico (Derribo Contundente o Retroceso de 4,5 m)." },
      { level: 10, name: "Rasgo de Subclase", description: "Poder superior de tu senda primaria." },
      { level: 11, name: "Furia Implacable", description: "Si caes a 0 PG sin morir mientras est\xE1s en Furia, superas salvaci\xF3n de CON CD 10 para quedar con PG = nivel de b\xE1rbaro x 2." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Golpe Brutal Mejorado", description: "El da\xF1o extra de Golpe Brutal aumenta a 2d10 y desbloqueas nuevos efectos t\xE1cticos." },
      { level: 14, name: "Rasgo de Subclase", description: "Poder culminante de tu senda primaria." },
      { level: 15, name: "Furia Persistente", description: "Tu Furia dura 10 minutos completos sin interrumpirse y recuperas todos los usos de Furia al tirar iniciativa (1 vez por descanso largo)." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Golpe Brutal Supremo", description: "El da\xF1o extra aumenta a 3d10 y puedes aplicar 2 efectos t\xE1cticos a la vez en un mismo impacto." },
      { level: 18, name: "Poder\xEDo Ind\xF3mito", description: "Si el total de una prueba de Fuerza es menor que tu puntuaci\xF3n de Fuerza, puedes usar tu puntuaci\xF3n de Fuerza en su lugar." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Campe\xF3n Primigenio", description: "Tus puntuaciones de Fuerza y Constituci\xF3n aumentan de forma permanente en +4, con un l\xEDmite m\xE1ximo incrementado a 25." }
    ]
  },
  {
    id: "picaro",
    name: "P\xEDcaro",
    hitDie: 8,
    primaryAbilities: ["dex"],
    savingThrows: ["dex", "int"],
    skillChoicesCount: 4,
    availableSkills: ["Acrobacias", "Atletismo", "Enga\xF1o", "Intimidaci\xF3n", "Investigaci\xF3n", "Juego de manos", "Percepci\xF3n", "Perspicacia", "Persuasi\xF3n", "Sigilo"],
    subclassAvailableAtLevel: 3,
    armorProficiencies: ["Armaduras ligeras"],
    weaponProficiencies: ["Armas simples", "Armas marciales sutiles o ligeras (Espada corta, Estoque, Cimitarra, Ballesta de mano)"],
    toolProficiencies: ["Herramientas de ladrón"],
    toolChoicesCount: 0,
    featuresByLevel: [
      { level: 1, name: "Pericia", description: "Tu bonificador de competencia se duplica en 2 de tus habilidades con competencia o en 1 habilidad y herramientas de ladr\xF3n." },
      { level: 1, name: "Ataque Furtivo (1d6)", description: "Infliges 1d6 extra (escala con nivel) a una criatura si tienes ventaja o un aliado est\xE1 adyacente a ella usando arma sutil o a distancia." },
      { level: 1, name: "Jerga de Ladrones", description: "Conoces el dialecto secreto del hampa y un idioma adicional a tu elecci\xF3n." },
      { level: 1, name: "Dominio de Armas", description: "Desbloqueas las propiedades maestras de 2 armas sutiles o a distancia." },
      { level: 2, name: "Acci\xF3n Astuta", description: "Puedes realizar Correr, Destrabarse o Esconderse como acci\xF3n adicional en cada uno de tus turnos." },
      { level: 3, name: "Subclase de P\xEDcaro", description: "Elige un arquetipo (Ladr\xF3n, Asesino, Embaucador Arcano o Rebanaalmas)." },
      { level: 3, name: "Punter\xEDa Fija", description: "Como acci\xF3n adicional sin haberte movido en tu turno, obtienes ventaja en tu siguiente tirada de ataque y tu velocidad se reduce a 0 hasta el final del turno." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Esquiva Asombrosa", description: "Como reacci\xF3n al recibir da\xF1o de un atacante visible, reduces el da\xF1o sufrido a la mitad." },
      { level: 5, name: "Golpe Astuto", description: "Puedes renunciar a 1d6 de tu Ataque Furtivo para aplicar efectos t\xE1cticos especiales (Veneno, Derribar o Retirarse sin provocar ataques)." },
      { level: 6, name: "Pericia Adicional", description: "Ganas pericia en otras 2 habilidades con competencia o herramientas." },
      { level: 7, name: "Evasi\xF3n", description: "Al sufrir un efecto con salvaci\xF3n de Destreza de \xE1rea, no recibes da\xF1o con \xE9xito y solo la mitad si fallas." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Rasgo de Subclase", description: "Habilidad avanzada de tu arquetipo p\xEDcaro." },
      { level: 10, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o dote adicional de p\xEDcaro." },
      { level: 11, name: "Talento Fiable", description: "Cualquier tirada de 9 o menos en el d20 en una prueba con competencia se trata autom\xE1ticamente como un 10." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Rasgo de Subclase", description: "Poder superior de tu arquetipo." },
      { level: 14, name: "Golpes Retorcidos", description: "Nuevas opciones de Golpe Astuto: Desarmar, Noquear o Aturdir a cambio de dados de Ataque Furtivo." },
      { level: 15, name: "Mente Escurridiza", description: "Ganas competencia en tiradas de salvaci\xF3n de Sabidur\xEDa y Carisma." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Rasgo de Subclase", description: "Poder culminante de tu subclase." },
      { level: 18, name: "Elusivo", description: "Ninguna tirada de ataque contra ti puede beneficiarse de ventaja mientras no est\xE9s incapacitado." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Golpe de Suerte", description: "Si fallas una tirada de ataque o prueba de d20, conviertes el fallo en un impacto cr\xEDtico o en un 20 en la prueba (1 vez por descanso corto/largo)." }
    ]
  },
  {
    id: "mago",
    name: "Mago",
    hitDie: 6,
    primaryAbilities: ["int"],
    savingThrows: ["int", "wis"],
    skillChoicesCount: 2,
    availableSkills: ["Arcanos", "Historia", "Investigaci\xF3n", "Medicina", "Naturaleza", "Religi\xF3n"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "full",
    spellcastingAbility: "int",
    armorProficiencies: [],
    weaponProficiencies: ["Armas simples"],
    featuresByLevel: [
      { level: 1, name: "Lanzamiento de Conjuros Arcanos", description: "Libro de conjuros, preparaci\xF3n diaria y lanzamiento de rituales sin necesidad de tenerlos preparados." },
      { level: 1, name: "Recuperaci\xF3n Arcana", description: "Tras un descanso corto, recuperas espacios de conjuro gastados con un nivel combinado de hasta la mitad de tu nivel de mago." },
      { level: 2, name: "Erudito Arcano", description: "Ganas pericia en una de tus habilidades basadas en Inteligencia (Arcanos, Historia, Investigaci\xF3n, Naturaleza o Religi\xF3n)." },
      { level: 3, name: "Subclase de Mago", description: "Elige una escuela de especializaci\xF3n (Abjuraci\xF3n, Adivinaci\xF3n, Evocaci\xF3n o Ilusi\xF3n)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Memorizar Conjuro", description: "Tras terminar un descanso corto, puedes cambiar 1 de tus conjuros preparados por otro de tu libro de conjuros." },
      { level: 6, name: "Rasgo de Subclase", description: "Poder de especializaci\xF3n de tu escuela arcana." },
      { level: 7, name: "Conjuros de Nivel 4", description: "Acceso a conjuros de nivel 4 como Puerta Dimensional, Polimorfar y Ojo Arcano." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Conjuros de Nivel 5", description: "Acceso a conjuros de nivel 5 como Muro de Fuerza, Cono de Fr\xEDo y Telequinesis." },
      { level: 10, name: "Rasgo de Subclase", description: "T\xE9cnica avanzada de tu escuela m\xE1gica." },
      { level: 11, name: "Conjuros de Nivel 6", description: "Acceso a conjuros de nivel 6 como Desintegrar y Cadena de Rel\xE1mpagos." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Conjuros de Nivel 7", description: "Acceso a conjuros de nivel 7 como Teletransporte y Cambio de Plano." },
      { level: 14, name: "Rasgo de Subclase", description: "Maestr\xEDa culminante de tu escuela de magia." },
      { level: 15, name: "Conjuros de Nivel 8", description: "Acceso a conjuros de nivel 8 como Laberinto y Dominar Monstruo." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Conjuros de Nivel 9", description: "Acceso a conjuros de nivel 9 como Deseo, Parar el Tiempo y Tromba de Meteoros." },
      { level: 18, name: "Maestr\xEDa en Conjuros", description: "Eliges un conjuro de nivel 1 y uno de nivel 2 de tu libro para lanzarlos a voluntad sin gastar espacios de conjuro." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Conjuros Caracter\xEDsticos", description: "Eliges dos conjuros de nivel 3; siempre los tienes preparados y puedes lanzar cada uno gratis 1 vez por descanso corto o largo." }
    ]
  },
  {
    id: "clerigo",
    name: "Cl\xE9rigo",
    hitDie: 8,
    primaryAbilities: ["wis"],
    savingThrows: ["wis", "cha"],
    skillChoicesCount: 2,
    availableSkills: ["Historia", "Medicina", "Perspicacia", "Persuasi\xF3n", "Religi\xF3n"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "full",
    spellcastingAbility: "wis",
    armorProficiencies: ["Armaduras ligeras", "Armaduras medias", "Escudos (Pesadas con Protector)"],
    weaponProficiencies: ["Armas simples (Marciales con Protector)"],
    featuresByLevel: [
      { level: 1, name: "Lanzamiento de Conjuros Divinos", description: "Canalizas el poder sagrado de tu deidad y preparas conjuros divinos tras cada descanso largo." },
      { level: 1, name: "Orden Divina", description: "Elige Protector (competencia en armaduras pesadas y armas marciales) o Taumaturgo (un truco sagrado adicional y bonificador de Sabidur\xEDa a Religi\xF3n/Arcanos)." },
      { level: 2, name: "Canalizar Divinidad", description: "Canalizas energ\xEDa divina para Expulsar Muertos Vivientes o usar Chispa Divina (curar o da\xF1ar 1d8 + SAB). Usos restaurados en descansos cortos y largos." },
      { level: 3, name: "Subclase de Cl\xE9rigo", description: "Elige un dominio sagrado (Vida, Luz, Guerra o Enga\xF1o)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Abrasar Muertos Vivientes", description: "Al usar Expulsar Muertos Vivientes, las criaturas no-muertas que fallen su tirada de salvaci\xF3n sufren da\xF1o radiante igual a tantos d8s como tu modificador de Sabidur\xEDa." },
      { level: 6, name: "Rasgo de Subclase", description: "Habilidad intermedia de tu dominio divino." },
      { level: 7, name: "Golpes Benditos", description: "Elige Ataque Divino (+1d8 de da\xF1o radiante o necr\xF3tico con ataques de arma una vez por turno) o Lanzamiento Potente (+Sabidur\xEDa al da\xF1o de trucos de cl\xE9rigo)." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Conjuros de Nivel 5", description: "Acceso a conjuros de nivel 5 como Revivir a los Muertos y Columna de Fuego." },
      { level: 10, name: "Intervenci\xF3n Divina", description: "Pides ayuda a tu deidad: lanzas autom\xE1ticamente cualquier conjuro de cl\xE9rigo de nivel 5 o menor sin gastar espacios ni componentes (1 vez por descanso largo)." },
      { level: 11, name: "Conjuros de Nivel 6", description: "Acceso a conjuros divinos de nivel 6 como Curar en Masa y Fest\xEDn de los H\xE9roes." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Conjuros de Nivel 7", description: "Acceso a conjuros divinos de nivel 7 como Resurrecci\xF3n y Forma Et\xE9rea." },
      { level: 14, name: "Golpes Benditos Mejorados", description: "El da\xF1o adicional de Ataque Divino aumenta a 2d8, o el Lanzamiento Potente otorga puntos de golpe temporales iguales al doble de tu modificador de Sabidur\xEDa a ti o un aliado a 18 m." },
      { level: 15, name: "Conjuros de Nivel 8", description: "Acceso a conjuros de nivel 8 como Aura Sagrada y Terremoto." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Rasgo de Subclase y Conjuros de Nivel 9", description: "Poder supremo de dominio y conjuros de nivel 9 como Verdadera Resurrecci\xF3n y Portal." },
      { level: 18, name: "Canalizar Divinidad Mayor", description: "Ganas un cuarto uso de Canalizar Divinidad entre descansos." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Intervenci\xF3n Divina Mayor", description: "Tu Intervenci\xF3n Divina puede invocar el efecto del conjuro Deseo a trav\xE9s de tu deidad." }
    ]
  },
  {
    id: "paladin",
    name: "Palad\xEDn",
    hitDie: 10,
    primaryAbilities: ["str", "cha"],
    savingThrows: ["wis", "cha"],
    skillChoicesCount: 2,
    availableSkills: ["Atletismo", "Intimidaci\xF3n", "Medicina", "Perspicacia", "Persuasi\xF3n", "Religi\xF3n"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "half",
    spellcastingAbility: "cha",
    hasFightingStyle: true,
    armorProficiencies: ["Armaduras ligeras", "Armaduras medias", "Armaduras pesadas", "Escudos"],
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    featuresByLevel: [
      { level: 1, name: "Lanzamiento de Conjuros Divinos", description: "Lanzamiento medio de conjuros de palad\xEDn disponible desde el nivel 1." },
      { level: 1, name: "Imposici\xF3n de Manos", description: "Reserva curativa de 5 x nivel de palad\xEDn que aplicas como acci\xF3n adicional." },
      { level: 1, name: "Dominio de Armas", description: "Desbloqueas las propiedades maestras de 2 armas a tu elecci\xF3n." },
      { level: 2, name: "Estilo de Combate", description: "Elige un estilo marcial como Defensa, Duelista o Combate con Armas Grandes." },
      { level: 2, name: "Castigo del Palad\xEDn", description: "Siempre tienes preparado Castigo Divino y puedes lanzarlo una vez por descanso largo sin gastar espacio de conjuro." },
      { level: 3, name: "Subclase de Palad\xEDn", description: "Prestas un juramento sagrado (Devoci\xF3n, Venganza, Antiguos o Gloria)." },
      { level: 3, name: "Canalizar Divinidad", description: "Canalizas el fervor de tu juramento para activar poderes sagrados \xFAnicos." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Ataque Adicional", description: "Puedes atacar dos veces en lugar de una al realizar la acci\xF3n de Atacar." },
      { level: 5, name: "Corcel Fiel", description: "Siempre tienes preparado el conjuro Encontrar Corcel y puedes lanzarlo una vez por descanso largo sin gastar espacio de conjuro." },
      { level: 6, name: "Aura de Protecci\xF3n", description: "T\xFA y los aliados a 3 metros sum\xE1is tu modificador de Carisma a todas las tiradas de salvaci\xF3n." },
      { level: 7, name: "Rasgo de Subclase (Aura de Juramento)", description: "Poder de aura otorgado por tu juramento sagrado." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Conjuros de Nivel 3 y Abjurar Enemigos", description: "Acceso a conjuros sagrados de nivel 3 y puedes asustar a m\xFAltiples enemigos con Canalizar Divinidad." },
      { level: 10, name: "Aura de Coraje", description: "T\xFA y los aliados a 3 metros sois inmunes a la condici\xF3n de Asustado." },
      { level: 11, name: "Golpes Radiantes", description: "Todos tus ataques con arma infligen pasivamente 1d8 de da\xF1o radiante adicional." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Conjuros de Nivel 4", description: "Acceso a conjuros como Castigo Asolador y Protecci\xF3n contra la Muerte." },
      { level: 14, name: "Toque Restaurador", description: "Al usar Imposici\xF3n de Manos, puedes gastar 5 puntos de reserva para eliminar Hechizado, Asustado o Envenenado." },
      { level: 15, name: "Rasgo de Subclase", description: "Poder defensivo o marcial avanzado de tu juramento." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Conjuros de Nivel 5", description: "Acceso a Castigo Destructor, Revivir a los Muertos y C\xEDrculo de Poder." },
      { level: 18, name: "Expansi\xF3n de Auras", description: "El alcance de todas tus auras se ampl\xEDa de 3 metros a 9 metros de radio." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Avatar Sagrado del Juramento", description: "Te transformas en el avatar definitivo de tu juramento con poderes supremos durante 1 minuto." }
    ]
  },
  {
    id: "explorador",
    name: "Explorador",
    hitDie: 10,
    primaryAbilities: ["dex", "wis"],
    savingThrows: ["str", "dex"],
    skillChoicesCount: 3,
    availableSkills: ["Acrobacias", "Atletismo", "Investigaci\xF3n", "Naturaleza", "Percepci\xF3n", "Perspicacia", "Sigilo", "Supervivencia", "Trato con animales"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "half",
    spellcastingAbility: "wis",
    hasFightingStyle: true,
    armorProficiencies: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
    weaponProficiencies: ["Armas simples", "Armas marciales"],
    featuresByLevel: [
      { level: 1, name: "Lanzamiento de Conjuros Primigenios", description: "Lanzamiento medio de conjuros de la naturaleza disponible desde el nivel 1." },
      { level: 1, name: "Enemigo Predilecto", description: "Siempre tienes preparado Marca del Cazador y puedes lanzarlo sin gastar espacios tantas veces como tu bonificador de competencia por descanso largo." },
      { level: 1, name: "Dominio de Armas", description: "Desbloqueas las propiedades maestras de 2 armas a tu elecci\xF3n." },
      { level: 2, name: "Estilo de Combate", description: "Elige un estilo como Arquer\xEDa, Defensa, Duelista o Combate con Dos Armas." },
      { level: 2, name: "Explorador H\xE1bil", description: "Ganas pericia en 1 habilidad y obtienes velocidades de escalada y nataci\xF3n iguales a tu velocidad terrestre." },
      { level: 3, name: "Subclase de Explorador", description: "Elige un arquetipo (Cazador, Se\xF1or de las Bestias, Acechador Umbr\xEDo o Caminante Fe\xE9rico)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Ataque Adicional", description: "Puedes atacar dos veces en lugar de una al realizar la acci\xF3n de Atacar." },
      { level: 6, name: "N\xF3mada Incansable", description: "Tu velocidad terrestre aumenta en +3 metros y tus velocidades de escalada y nataci\xF3n se igualan a ella." },
      { level: 7, name: "Rasgo de Subclase", description: "Habilidad intermedia de tu arquetipo agreste." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Conjuros de Nivel 3", description: "Acceso a conjuros como Conjurar Andanada, Flecha Relampagueante y Caminar sobre el Agua." },
      { level: 10, name: "Incansable y Velo de la Naturaleza", description: "Ganas PG temporales (1d8 + SAB) como acci\xF3n adicional y puedes volverte invisible hasta tu siguiente turno." },
      { level: 11, name: "Rasgo de Subclase", description: "Poder superior de tu arquetipo de explorador." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Cazador Implacable", description: "Recibir da\xF1o no puede interrumpir tu concentraci\xF3n en Marca del Cazador." },
      { level: 14, name: "Desvanecerse", description: "Puedes realizar la acci\xF3n de Esconderse como acci\xF3n adicional y no puedes ser rastreado por medios m\xE1gicos o mundanos." },
      { level: 15, name: "Rasgo de Subclase", description: "Capacidad culminante de tu arquetipo agreste." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Cazador Preciso", description: "Obtienes ventaja en todas tus tiradas de ataque contra la criatura marcada con Marca del Cazador." },
      { level: 18, name: "Sentidos Salvajes", description: "Obtienes visi\xF3n ciega con un alcance de 9 metros." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Asesino de Enemigos", description: "El da\xF1o de tu Marca del Cazador aumenta a 1d10 y sumas tu modificador de Sabidur\xEDa a todas las tiradas de da\xF1o contra ese objetivo." }
    ]
  },
  {
    id: "hechicero",
    name: "Hechicero",
    hitDie: 6,
    primaryAbilities: ["cha"],
    savingThrows: ["con", "cha"],
    skillChoicesCount: 2,
    availableSkills: ["Arcanos", "Enga\xF1o", "Intimidaci\xF3n", "Perspicacia", "Persuasi\xF3n", "Religi\xF3n"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "full",
    spellcastingAbility: "cha",
    armorProficiencies: [],
    weaponProficiencies: ["Armas simples"],
    featuresByLevel: [
      { level: 1, name: "Lanzamiento de Conjuros Innatos", description: "Lanzas conjuros arcanos modelados por tu linaje mediante Carisma." },
      { level: 1, name: "Hechicer\xEDa Innata", description: "Como acci\xF3n adicional durante 1 minuto, desatas tu chispa m\xE1gica: ganas ventaja en tiradas de ataque de conjuro y tu CD de salvaci\xF3n de conjuros aumenta en +1 (2 usos por descanso largo)." },
      { level: 2, name: "Fuente de Magia", description: "Obtienes puntos de hechicer\xEDa iguales a tu nivel para crear espacios de conjuro adicionales." },
      { level: 2, name: "Metamagia", description: "Elige 2 opciones de Metamagia (Acelerado, Gemelo, Distante, Sutil, Potenciado, etc.) para moldear tus conjuros." },
      { level: 3, name: "Subclase de Hechicero", description: "Elige tu origen (Magia Salvaje, Hechicer\xEDa Drac\xF3nica, Aberrante o Relojer\xEDa)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Restauraci\xF3n de Hechicer\xEDa", description: "Al terminar un descanso corto, puedes recuperar puntos de hechicer\xEDa gastados hasta la mitad de tu nivel." },
      { level: 6, name: "Rasgo de Subclase", description: "Poder elemental o ps\xEDquico de tu origen de hechicer\xEDa." },
      { level: 7, name: "Esp\xEDritu de Hechicer\xEDa", description: "Mientras Hechicer\xEDa Innata est\xE9 activa, puedes aplicar hasta dos opciones de Metamagia diferentes a un mismo conjuro." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Conjuros de Nivel 5 y Metamagia Extra", description: "Acceso a conjuros de nivel 5 y 2 opciones adicionales de Metamagia." },
      { level: 10, name: "Rasgo de Subclase", description: "Habilidad superior de tu linaje arcano." },
      { level: 11, name: "Conjuros de Nivel 6", description: "Acceso a conjuros como Desintegrar y Cadena de Rel\xE1mpagos." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Conjuros de Nivel 7", description: "Acceso a conjuros como Teletransporte y Dedo de la Muerte." },
      { level: 14, name: "Rasgo de Subclase", description: "Poder magistral de tu origen." },
      { level: 15, name: "Conjuros de Nivel 8", description: "Acceso a conjuros como Dominar Monstruo y Terremoto." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Conjuros de Nivel 9 y Metamagia Final", description: "Acceso a Deseo, Tromba de Meteoros y 2 opciones adicionales de Metamagia." },
      { level: 18, name: "Rasgo de Subclase", description: "Poder culminante de tu subclase de hechicero." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Apoteosis Arcana", description: "Mientras Hechicer\xEDa Innata est\xE9 activa, puedes aplicar 1 opci\xF3n de Metamagia gratis en cada uno de tus turnos sin gastar puntos de hechicer\xEDa." }
    ]
  },
  {
    id: "brujo",
    name: "Brujo",
    hitDie: 8,
    primaryAbilities: ["cha"],
    savingThrows: ["wis", "cha"],
    skillChoicesCount: 2,
    availableSkills: ["Arcanos", "Enga\xF1o", "Historia", "Intimidaci\xF3n", "Investigaci\xF3n", "Naturaleza", "Religi\xF3n"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "pact",
    spellcastingAbility: "cha",
    armorProficiencies: ["Armaduras ligeras"],
    weaponProficiencies: ["Armas simples (Armas marciales con Pacto de la Espada)"],
    featuresByLevel: [
      { level: 1, name: "Magia del Pacto", description: "Espacios de conjuro de nivel m\xE1ximo de pacto que se restauran completamente tras un descanso corto o largo." },
      { level: 1, name: "Invocaciones Sobrenaturales", description: "Obtienes 1 Invocaci\xF3n Secreta a nivel 1 (Pacto de la Espada, Pacto del Tomo, Pacto de la Cadena o Visi\xF3n Diab\xF3lica)." },
      { level: 2, name: "Astucia M\xE1gica", description: "Una vez por descanso largo, puedes pasar 1 minuto en comuni\xF3n para recuperar la mitad de tus espacios de magia del pacto gastados." },
      { level: 3, name: "Subclase de Brujo", description: "Formalizas tu pacto con un patr\xF3n (Archihada, Infernal, Primigenio o Celestial)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Invocaciones Avanzadas", description: "Desbloqueas invocaciones de nivel 5 y espacios de pacto de nivel 3." },
      { level: 6, name: "Rasgo de Subclase", description: "Don protector o evasivo de tu patr\xF3n sobrenatural." },
      { level: 7, name: "Invocaciones de Nivel 7", description: "Desbloqueas invocaciones de nivel 7 y tus espacios de pacto pasan a ser de nivel 4." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Contacto con el Patr\xF3n", description: "Siempre tienes preparado Contactar con Otros Planos y puedes lanzarlo sin peligro una vez por descanso largo." },
      { level: 10, name: "Rasgo de Subclase", description: "Defensa mental o inmunidad concedida por tu patr\xF3n." },
      { level: 11, name: "Arcano M\xEDstico (Nivel 6)", description: "Eliges 1 conjuro de nivel 6 de brujo que puedes lanzar 1 vez por descanso largo sin gastar espacios de pacto." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Arcano M\xEDstico (Nivel 7)", description: "Eliges 1 conjuro de nivel 7 de brujo que puedes lanzar 1 vez por descanso largo." },
      { level: 14, name: "Rasgo de Subclase", description: "Poder magistral de tu pacto (ej. Lanzar a trav\xE9s del Infierno)." },
      { level: 15, name: "Arcano M\xEDstico (Nivel 8)", description: "Eliges 1 conjuro de nivel 8 de brujo que puedes lanzar 1 vez por descanso largo." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Arcano M\xEDstico (Nivel 9)", description: "Eliges 1 conjuro de nivel 9 de brujo como Deseo, Palabra de Poder: Matar o Forma de Presagio." },
      { level: 18, name: "Invocaci\xF3n Suprema", description: "Desbloqueas tu \xFAltima y m\xE1s poderosa invocaci\xF3n sobrenatural." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Maestro del Pacto", description: "Como acci\xF3n de 1 minuto orando a tu patr\xF3n, recuperas instant\xE1neamente todos tus espacios de magia del pacto gastados (1 vez por descanso largo)." }
    ]
  },
  {
    id: "bardo",
    name: "Bardo",
    hitDie: 8,
    primaryAbilities: ["cha"],
    savingThrows: ["dex", "cha"],
    skillChoicesCount: 3,
    availableSkills: ["Acrobacias", "Arcanos", "Atletismo", "Enga\xF1o", "Historia", "Interpretaci\xF3n", "Intimidaci\xF3n", "Investigaci\xF3n", "Juego de manos", "Medicina", "Naturaleza", "Percepci\xF3n", "Perspicacia", "Persuasi\xF3n", "Religi\xF3n", "Sigilo", "Supervivencia", "Trato con animales"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "full",
    spellcastingAbility: "cha",
    armorProficiencies: ["Armaduras ligeras"],
    weaponProficiencies: ["Armas simples"],
    toolProficiencies: [],
    toolChoicesCount: 3,
    toolChoicesType: "instrument",
    toolChoicesDescription: "3 instrumentos musicales a tu elección",
    featuresByLevel: [
      { level: 1, name: "Lanzamiento de Conjuros", description: "Magia art\xEDstica de ilusi\xF3n, encantamiento, adivinaci\xF3n y sanaci\xF3n con Carisma." },
      { level: 1, name: "Inspiraci\xF3n B\xE1rdica (d6)", description: "Como acci\xF3n adicional, otorgas un dado de inspiraci\xF3n (d6) a un aliado a 18 m para sumar a una prueba de d20 o curarse como reacci\xF3n si recibe da\xF1o." },
      { level: 2, name: "Aprendiz de Mucho", description: "A\xF1ades la mitad de tu bonificador de competencia (redondeado hacia abajo) a cualquier prueba de caracter\xEDstica en la que no seas competente." },
      { level: 2, name: "Pericia", description: "Tu bonificador de competencia se duplica en 2 habilidades de tu elecci\xF3n." },
      { level: 3, name: "Subclase de Bardo", description: "Elige un colegio b\xE1rdico (Valor, Saber, Danza o Glamour)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Fuente de Inspiraci\xF3n (d8)", description: "Tus dados de Inspiraci\xF3n B\xE1rdica aumentan a d8 y se restauran en descansos cortos y largos." },
      { level: 6, name: "Rasgo de Subclase", description: "Habilidad intermedia otorgada por tu colegio b\xE1rdico." },
      { level: 7, name: "Contracanto", description: "Como reacci\xF3n al ver a un aliado a 9 m fallar una salvaci\xF3n contra Hechizado o Asustado, le otorgas una repetici\xF3n inmediata con ventaja." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Pericia Adicional", description: "Ganas pericia en otras 2 habilidades con competencia a tu elecci\xF3n." },
      { level: 10, name: "Secretos M\xE1gicos", description: "Puedes elegir conjuros de las listas de Cl\xE9rigo, Druida y Mago cada vez que prepares conjuros, lanz\xE1ndolos como conjuros de bardo." },
      { level: 10, name: "Dado de Inspiraci\xF3n (d10)", description: "Tus dados de Inspiraci\xF3n B\xE1rdica aumentan a d10." },
      { level: 11, name: "Conjuros de Nivel 6", description: "Acceso a conjuros de nivel 6 como Danza Irresistible de Otto." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Conjuros de Nivel 7", description: "Acceso a conjuros de nivel 7 como Forma Et\xE9rea y Espada de Mordenkainen." },
      { level: 14, name: "Rasgo de Subclase", description: "Capacidad magistral de tu colegio b\xE1rdico." },
      { level: 15, name: "Dado de Inspiraci\xF3n (d12)", description: "Tus dados de Inspiraci\xF3n B\xE1rdica alcanzan su m\xE1ximo poder convirti\xE9ndose en d12." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Conjuros de Nivel 9", description: "Acceso a conjuros de nivel 9 como Palabra de Poder: Matar y Deseo (con Secretos M\xE1gicos)." },
      { level: 18, name: "Inspiraci\xF3n Superior", description: "Si no te quedan dados de Inspiraci\xF3n B\xE1rdica al tirar iniciativa, recuperas inmediatamente 1 dado de inspiraci\xF3n." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Palabras de la Creaci\xF3n", description: "Siempre tienes preparados Palabra de Poder: Sanar y Palabra de Poder: Matar, y puedes apuntar a dos criaturas a la vez con ellos." }
    ]
  },
  {
    id: "druida",
    name: "Druida",
    hitDie: 8,
    primaryAbilities: ["wis"],
    savingThrows: ["int", "wis"],
    skillChoicesCount: 2,
    availableSkills: ["Arcanos", "Medicina", "Naturaleza", "Percepci\xF3n", "Perspicacia", "Religi\xF3n", "Supervivencia", "Trato con animales"],
    subclassAvailableAtLevel: 3,
    spellcasterType: "full",
    spellcastingAbility: "wis",
    armorProficiencies: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
    weaponProficiencies: ["Armas simples (Armas marciales con Guardi\xE1n)"],
    toolProficiencies: ["Útiles de herbolista"],
    toolChoicesCount: 0,
    featuresByLevel: [
      { level: 1, name: "Lanzamiento de Conjuros Primigenios", description: "Canalizas la magia salvaje del cosmos y la naturaleza con Sabidur\xEDa." },
      { level: 1, name: "Orden Primigenia", description: "Elige Guardi\xE1n (competencia en armaduras medias y armas marciales) o Naturalista (un truco extra de druida y bonificador de Sabidur\xEDa a Naturaleza/Arcanos)." },
      { level: 2, name: "Forma Salvaje", description: "Como acci\xF3n adicional, te transformas en una bestia o invocas un Compa\xF1ero Salvaje espiritual (2 usos restaurados en descansos)." },
      { level: 3, name: "Subclase de Druida", description: "Elige un c\xEDrculo sagrado (Luna, Tierra, Estrellas o Mar)." },
      { level: 4, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 5, name: "Resurgimiento Salvaje", description: "Puedes gastar un espacio de conjuro para recuperar un uso de Forma Salvaje, o gastar un uso de Forma Salvaje para ganar un espacio de nivel 1." },
      { level: 6, name: "Rasgo de Subclase", description: "Habilidad elemental o bestial de tu c\xEDrculo dru\xEDdico." },
      { level: 7, name: "Golpe Primigenio Elemental", description: "Tus ataques en Forma Salvaje o con armas de druida infligen 1d8 de da\xF1o por fr\xEDo, fuego, rayo o trueno a tu elecci\xF3n." },
      { level: 8, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 9, name: "Conjuros de Nivel 5", description: "Acceso a conjuros como Crecimiento Arb\xF3reo, Reencarnar y Comuni\xF3n con la Naturaleza." },
      { level: 10, name: "Rasgo de Subclase", description: "Poder superior de tu c\xEDrculo." },
      { level: 11, name: "Forma Salvaje A\xE9rea", description: "Desbloqueas formas salvajes con velocidad de vuelo completa y conjuros de nivel 6 como Rayo Solar." },
      { level: 12, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 13, name: "Conjuros de Nivel 7", description: "Acceso a conjuros como Tormenta de Fuego y Desplazamiento Entre Planos." },
      { level: 14, name: "Rasgo de Subclase", description: "Maestr\xEDa culminante de tu c\xEDrculo de druida." },
      { level: 15, name: "Golpe Primigenio Mejorado", description: "El da\xF1o elemental adicional de Golpe Primigenio aumenta a 2d8." },
      { level: 16, name: "Mejora de Caracter\xEDstica o Dote", description: "Aumento de puntuaci\xF3n o nueva dote general." },
      { level: 17, name: "Conjuros de Nivel 9", description: "Acceso a conjuros de nivel 9 como Tormenta de Venganza y Cambiaformas." },
      { level: 18, name: "Conjuros Bestiales", description: "Puedes lanzar casi todos tus conjuros primigenios mientras est\xE9s transformado en Forma Salvaje." },
      { level: 19, name: "Dote \xC9pica o Mejora de Caracter\xEDstica", description: "Acceso a Dotes \xC9picas de nivel 19 o mejora de caracter\xEDsticas." },
      { level: 20, name: "Archidruida", description: "Usos ilimitados de Forma Salvaje y recuperas un espacio de conjuro al tirar iniciativa si no tienes espacios disponibles." }
    ]
  },
  {
    id: "monje",
    name: "Monje",
    hitDie: 8,
    primaryAbilities: ["dex", "wis"],
    savingThrows: ["str", "dex"],
    skillChoicesCount: 2,
    availableSkills: ["Acrobacias", "Atletismo", "Historia", "Perspicacia", "Religi\xF3n", "Sigilo"],
    subclassAvailableAtLevel: 3,
    armorProficiencies: [],
    weaponProficiencies: ["Armas simples", "Armas marciales ligeras"],
    toolProficiencies: [],
    toolChoicesCount: 1,
    toolChoicesType: "artisan_or_instrument",
    toolChoicesDescription: "1 tipo de herramientas de artesano o 1 instrumento musical a tu elección",
    featuresByLevel: [
      { level: 1, name: "Artes Marciales (d6)", description: "Puedes usar Destreza para ataques sin armas y armas de monje, tu daño sin armas es 1d6 y puedes realizar un ataque sin armas como acción adicional tras la acción de Atacar." },
      { level: 1, name: "Defensa sin Armadura", description: "Tu CA es 10 + Modificador de Destreza + Modificador de Sabiduría mientras no vistas armadura ni lleves escudo." },
      { level: 2, name: "Concentración del Monje", description: "Obtienes puntos de concentración (ki) iguales a tu nivel para alimentar Ráfaga de Golpes (2 ataques sin armas como acción adicional), Defensa Paciente (acción de Esquivar sin coste, o Esquivar + Desengancharse por 1 punto) y Paso del Viento (Desengancharse o Carrera sin coste, o ambas por 1 punto duplicando salto)." },
      { level: 2, name: "Movimiento sin Armadura", description: "Tu velocidad aumenta en +3 metros mientras no lleves armadura ni escudo." },
      { level: 2, name: "Metabolismo Asombroso", description: "Al tirar iniciativa, puedes recuperar todos tus puntos de concentración gastados y sanarte 1d8 + nivel de monje PG (1 vez por descanso largo)." },
      { level: 3, name: "Subclase de Monje", description: "Elige una tradición monástica (Mano Abierta, Sombras, Elementos o Piedad)." },
      { level: 3, name: "Desviar Ataques", description: "Como reacción al recibir daño físico cuerpo a cuerpo o a distancia, reduces el daño en 1d10 + Destreza + nivel de monje. Si lo reduces a 0, puedes gastar 1 punto de concentración para redirigir el ataque." },
      { level: 4, name: "Mejora de Característica o Dote", description: "Aumento de puntuación (+2 / +1+1) o una dote general de nivel 4+." },
      { level: 4, name: "Caída Lenta", description: "Como reacción al caer, reduces el daño por caída en 5 veces tu nivel de monje." },
      { level: 5, name: "Ataque Adicional", description: "Puedes atacar dos veces en lugar de una al realizar la acción de Atacar." },
      { level: 5, name: "Golpe Aturdidor", description: "Una vez por turno al impactar a una criatura con un ataque sin armas o arma de monje, gastas 1 punto de concentración para forzar una salvación de Constitución contra tu CD de concentración del monje para aturdirla hasta el inicio de tu próximo turno." },
      { level: 6, name: "Golpes Potenciados", description: "Tus ataques sin armas pueden infligir daño de Fuerza en lugar de daño Contundente y cuentan como mágicos." },
      { level: 6, name: "Rasgo de Subclase", description: "Habilidad intermedia de tu tradición monástica." },
      { level: 7, name: "Evasión", description: "No recibes daño al superar salvaciones de Destreza de área y solo sufres la mitad de daño si fallas." },
      { level: 7, name: "Mente Lúcida", description: "Puedes terminar las condiciones de Hechizado o Asustado en ti mismo como acción adicional o reacción al inicio de tu turno." },
      { level: 8, name: "Mejora de Característica o Dote", description: "Aumento de puntuación o nueva dote general." },
      { level: 9, name: "Acróbata sin Límites", description: "Tu Movimiento sin Armadura te permite correr a lo largo de superficies verticales y sobre líquidos sin caer." },
      { level: 10, name: "Concentración Elevada y Autocuración", description: "Ráfaga de Golpes permite 3 ataques sin armas, Defensa Paciente da PG temporales, Paso del Viento transporta aliados y puedes curar estados perjudiciales." },
      { level: 11, name: "Rasgo de Subclase", description: "Poder superior de tu orden monástica." },
      { level: 12, name: "Mejora de Característica o Dote", description: "Aumento de puntuación o nueva dote general." },
      { level: 13, name: "Desviar Ataques Supremo", description: "Puedes usar Desviar Ataques contra cualquier tipo de daño, incluidos conjuros mágicos y daño elemental." },
      { level: 14, name: "Superviviente Disciplinado", description: "Ganas competencia en todas las tiradas de salvación y puedes gastar 1 punto de concentración para repetir cualquier salvación que falles." },
      { level: 15, name: "Disciplina Perfecta", description: "Al tirar iniciativa, si tienes 3 o menos puntos de concentración, tu total se restablece automáticamente a 4 puntos de concentración." },
      { level: 16, name: "Mejora de Característica o Dote", description: "Aumento de puntuación o nueva dote general." },
      { level: 17, name: "Rasgo de Subclase", description: "Técnica culminante de tu tradición monástica." },
      { level: 18, name: "Cuerpo Vacío", description: "Como acción adicional, gastas 3 puntos de concentración para volverte invisible y resistente a casi todo daño durante 1 minuto." },
      { level: 19, name: "Dote Épica o Mejora de Característica", description: "Acceso a Dotes Épicas de nivel 19 o mejora de características." },
      { level: 20, name: "Cuerpo y Mente Perfectos", description: "Tus puntuaciones de Destreza y Sabiduría aumentan permanentemente en +4, con un límite máximo incrementado a 25." }
    ]
  }
];
import {
  DND55_ALL_48_SUBCLASSES,
  DND55_ALL_ORIGIN_FEATS,
  DND55_ALL_GENERAL_FEATS,
  DND55_ARTIFACT_PROPERTIES,
  DND55_CANONICAL_SPELLS,
  DND55_PRESET_ITEMS,
  DND55_SAMPLE_SPECIAL_ABILITIES,
  DND55_SCROLL_LEVEL_STATS
} from "./spellsAndItems.js";
const DND55_SUBCLASSES = DND55_ALL_48_SUBCLASSES;
const DND55_ORIGIN_FEATS = DND55_ALL_ORIGIN_FEATS;
const DND55_GENERAL_FEATS = DND55_ALL_GENERAL_FEATS;
const DND55_FIGHTING_STYLES = DND55_GENERAL_FEATS.filter((f) => f.featGroup === "estilo_combate");

const DND55_MULTICLASS_RULES = {
  prerequisites: {
    barbaro: { desc: "Fuerza 13+", check: (s) => (s?.str || 10) >= 13 },
    bardo: { desc: "Carisma 13+", check: (s) => (s?.cha || 10) >= 13 },
    clerigo: { desc: "Sabiduría 13+", check: (s) => (s?.wis || 10) >= 13 },
    druida: { desc: "Sabiduría 13+", check: (s) => (s?.wis || 10) >= 13 },
    guerrero: { desc: "Fuerza 13+ o Destreza 13+", check: (s) => (s?.str || 10) >= 13 || (s?.dex || 10) >= 13 },
    monje: { desc: "Destreza 13+ y Sabiduría 13+", check: (s) => (s?.dex || 10) >= 13 && (s?.wis || 10) >= 13 },
    paladin: { desc: "Fuerza 13+ y Carisma 13+", check: (s) => (s?.str || 10) >= 13 && (s?.cha || 10) >= 13 },
    explorador: { desc: "Destreza 13+ y Sabiduría 13+", check: (s) => (s?.dex || 10) >= 13 && (s?.wis || 10) >= 13 },
    picaro: { desc: "Destreza 13+", check: (s) => (s?.dex || 10) >= 13 },
    hechicero: { desc: "Carisma 13+", check: (s) => (s?.cha || 10) >= 13 },
    brujo: { desc: "Carisma 13+", check: (s) => (s?.cha || 10) >= 13 },
    mago: { desc: "Inteligencia 13+", check: (s) => (s?.int || 10) >= 13 }
  },
  proficienciesGained: {
    barbaro: {
      armor: ["Escudos"],
      weapons: ["Armas simples", "Armas marciales"],
      skillsCount: 0,
      skillsDesc: "Ninguna habilidad adicional",
      tools: [],
      summary: "Escudos, armas simples y armas marciales"
    },
    bardo: {
      armor: ["Armaduras ligeras"],
      weapons: [],
      skillsCount: 1,
      skillsDesc: "1 habilidad a tu elección",
      tools: ["1 instrumento musical a tu elección"],
      summary: "Armaduras ligeras, 1 habilidad libre y 1 instrumento musical"
    },
    clerigo: {
      armor: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
      weapons: [],
      skillsCount: 0,
      skillsDesc: "Ninguna habilidad adicional",
      tools: [],
      summary: "Armaduras ligeras, medias y escudos"
    },
    druida: {
      armor: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
      weapons: [],
      skillsCount: 0,
      skillsDesc: "Ninguna habilidad adicional",
      tools: ["Herramientas de herboristería"],
      summary: "Armaduras ligeras, medias, escudos y herramientas de herboristería"
    },
    guerrero: {
      armor: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
      weapons: ["Armas simples", "Armas marciales"],
      skillsCount: 0,
      skillsDesc: "Ninguna habilidad adicional",
      tools: [],
      summary: "Armaduras ligeras, medias, escudos, armas simples y marciales"
    },
    monje: {
      armor: [],
      weapons: ["Armas simples", "Espadas cortas"],
      skillsCount: 0,
      skillsDesc: "Ninguna habilidad adicional",
      tools: [],
      summary: "Armas simples y espadas cortas"
    },
    paladin: {
      armor: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
      weapons: ["Armas simples", "Armas marciales"],
      skillsCount: 0,
      skillsDesc: "Ninguna habilidad adicional",
      tools: [],
      summary: "Armaduras ligeras, medias, escudos, armas simples y marciales"
    },
    picaro: {
      armor: ["Armaduras ligeras"],
      weapons: [],
      skillsCount: 1,
      skillsDesc: "1 habilidad de la lista de pícaro",
      skillsPool: ["Acrobacias", "Atletismo", "Engaño", "Intimidación", "Investigación", "Juego de manos", "Percepción", "Perspicacia", "Persuasión", "Sigilo"],
      tools: ["Herramientas de ladrón"],
      summary: "Armadura ligera, 1 habilidad de pícaro y herramientas de ladrón"
    },
    explorador: {
      armor: ["Armaduras ligeras", "Armaduras medias", "Escudos"],
      weapons: ["Armas simples", "Armas marciales"],
      skillsCount: 1,
      skillsDesc: "1 habilidad de la lista de explorador",
      skillsPool: ["Trato con animales", "Atletismo", "Perspicacia", "Investigación", "Naturaleza", "Percepción", "Sigilo", "Supervivencia"],
      tools: [],
      summary: "Armaduras ligeras, medias, escudos, armas marciales y 1 habilidad de explorador"
    },
    hechicero: {
      armor: [],
      weapons: [],
      skillsCount: 0,
      skillsDesc: "Ninguna armadura ni arma adicional",
      tools: [],
      summary: "Sin competencias adicionales de armas o armaduras"
    },
    brujo: {
      armor: ["Armaduras ligeras"],
      weapons: ["Armas simples"],
      skillsCount: 0,
      skillsDesc: "Ninguna habilidad adicional",
      tools: [],
      summary: "Armaduras ligeras y armas simples"
    },
    mago: {
      armor: [],
      weapons: [],
      skillsCount: 0,
      skillsDesc: "Ninguna armadura ni arma adicional",
      tools: [],
      summary: "Sin competencias adicionales de armas o armaduras"
    }
  }
};

function getCharacterClasses(char) {
  if (!char) return [{ classId: 'guerrero', level: 1, subclassId: '' }];
  if (Array.isArray(char.classes) && char.classes.length > 0) {
    return char.classes.map(c => ({
      classId: c.classId,
      level: Math.max(1, Number(c.level) || 1),
      subclassId: c.subclassId || ''
    }));
  }
  const list = [];
  if (char.classId) {
    list.push({
      classId: char.classId,
      level: Math.max(1, Number(char.level) || 1),
      subclassId: char.subclassId || ''
    });
  }
  if (Array.isArray(char.multiclass)) {
    char.multiclass.forEach(m => {
      if (m && m.classId) {
        list.push({
          classId: m.classId,
          level: Math.max(1, Number(m.level) || 1),
          subclassId: m.subclassId || ''
        });
      }
    });
  }
  return list.length > 0 ? list : [{ classId: 'guerrero', level: 1, subclassId: '' }];
}

function getClassLevel(char, classId) {
  if (!char || !classId) return 0;
  const target = String(classId).toLowerCase().trim();
  const classes = getCharacterClasses(char);
  const found = classes.find(c => c && String(c.classId).toLowerCase().trim() === target);
  return found ? found.level : 0;
}

function getCharacterTotalLevel(char) {
  if (!char) return 1;
  const classes = getCharacterClasses(char);
  return classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0) || (Number(char.level) || 1);
}

function getCharacterFullClassTitle(char) {
  const classes = getCharacterClasses(char);
  if (!classes || classes.length === 0) return 'Aventurero 1';
  return classes.map(c => {
    const clsName = getClassName(c.classId);
    const subName = getSubclassName(c.subclassId);
    const subPart = subName ? ` (${subName})` : '';
    return `${clsName}${subPart} ${c.level}`;
  }).join(' / ');
}

function getCharacterLevelProgression(char) {
  const classes = getCharacterClasses(char);
  const progression = [];
  let currentLevel = 1;
  classes.forEach(c => {
    const classDef = DND55_CLASSES.find(cd => cd.id === c.classId);
    const hitDie = classDef?.hitDie || 8;
    const count = Math.max(1, Number(c.level) || 1);
    for (let i = 0; i < count; i++) {
      progression.push({
        overallLevel: currentLevel,
        classLevel: i + 1,
        classId: c.classId,
        className: classDef?.name || c.classId,
        hitDie
      });
      currentLevel++;
    }
  });
  return progression;
}

function getCharacterHitDicePool(char) {
  const classes = getCharacterClasses(char);
  const totalHd = classes.reduce((sum, c) => sum + c.level, 0) || (char.level || 1);
  const spentOverall = Math.max(0, Math.min(totalHd, Number(char.spentHitDice) || 0));

  const poolByDie = {};
  classes.forEach(c => {
    const classDef = DND55_CLASSES.find(cd => cd.id === c.classId);
    const hitDie = classDef?.hitDie || 8;
    if (!poolByDie[hitDie]) {
      poolByDie[hitDie] = { hitDie, total: 0, classes: [] };
    }
    poolByDie[hitDie].total += c.level;
    poolByDie[hitDie].classes.push(classDef?.name || c.classId);
  });

  const sortedDice = Object.values(poolByDie).sort((a, b) => b.hitDie - a.hitDie);
  let remainingSpent = spentOverall;
  const spentByDie = (char.spentHitDiceByDie && typeof char.spentHitDiceByDie === 'object') ? char.spentHitDiceByDie : {};
  const hasSpecificSpent = Object.keys(spentByDie).length > 0;

  const dice = sortedDice.map(d => {
    let spent = 0;
    if (hasSpecificSpent && typeof spentByDie[d.hitDie] === 'number') {
      spent = Math.max(0, Math.min(d.total, spentByDie[d.hitDie]));
    } else {
      spent = Math.min(d.total, remainingSpent);
      remainingSpent -= spent;
    }
    return {
      hitDie: d.hitDie,
      total: d.total,
      spent,
      available: Math.max(0, d.total - spent),
      classes: d.classes
    };
  });

  const availableHd = dice.reduce((sum, d) => sum + d.available, 0);
  const summaryText = dice.map(d => `${d.total}d${d.hitDie}`).join(' + ');
  const availableSummaryText = dice.map(d => `${d.available}d${d.hitDie}`).join(' + ');

  return {
    totalHd,
    availableHd,
    spentHd: totalHd - availableHd,
    dice,
    summaryText,
    availableSummaryText
  };
}

function checkMulticlassPrerequisites(char, targetClassId) {
  if (!char || !targetClassId) return { met: true, primaryOk: true, targetOk: true, reason: '' };
  const classes = getCharacterClasses(char);
  const primaryClassId = classes[0]?.classId || char.classId;
  const scores = calculateFinalAbilityScores(char);

  const primaryRule = DND55_MULTICLASS_RULES.prerequisites[primaryClassId];
  const targetRule = DND55_MULTICLASS_RULES.prerequisites[targetClassId];

  const primaryOk = primaryRule ? primaryRule.check(scores) : true;
  const targetOk = targetRule ? targetRule.check(scores) : true;
  const met = primaryOk && targetOk;

  const reasons = [];
  if (!primaryOk && primaryRule) {
    reasons.push(`Clase inicial (${getClassName(primaryClassId)}): requiere ${primaryRule.desc}`);
  }
  if (!targetOk && targetRule) {
    reasons.push(`Nueva clase (${getClassName(targetClassId)}): requiere ${targetRule.desc}`);
  }

  return {
    met,
    valid: met,
    primaryOk,
    targetOk,
    primaryDesc: primaryRule?.desc || '',
    targetDesc: targetRule?.desc || '',
    reason: reasons.join('; '),
    scores
  };
}

const DND55_CLASS_STARTING_EQUIPMENT = {
  barbaro: {
    gold: 50,
    packageDescription: "Gran hacha, 2 hachas de mano, 4 jabalinas, Paquete de explorador y 15 PO",
    armorId: 'sin_armadura',
    hasShield: false,
    weaponId: 'gran_hacha',
    goldRemaining: 15,
    items: [
      { name: "Gran hacha", quantity: 1, weight: 3.5, category: "arma" },
      { name: "Hacha de mano", quantity: 2, weight: 1, category: "arma" },
      { name: "Jabalina", quantity: 4, weight: 1, category: "arma" },
      { id: "item_paquete_explorador", name: "Paquete de Explorador", quantity: 1, weight: 27, category: "equipo" }
    ]
  },
  bardo: {
    gold: 90,
    packageDescription: "Armadura de cuero, 2 dagas, instrumento musical, Paquete de artista y 19 PO",
    armorId: 'cuero',
    hasShield: false,
    weaponId: 'daga',
    goldRemaining: 19,
    items: [
      { name: "Armadura de cuero", quantity: 1, weight: 5, category: "armadura", isEquipped: true },
      { name: "Daga", quantity: 2, weight: 0.5, category: "arma", isEquipped: true },
      { id: "item_laud", name: "Laúd", quantity: 1, weight: 1, category: "herramientas" },
      { id: "item_paquete_artista", name: "Paquete de Artista", quantity: 1, weight: 17, category: "equipo" }
    ]
  },
  clerigo: {
    gold: 110,
    packageDescription: "Cota de malla, escudo, maza, símbolo sagrado, Paquete de sacerdote y 7 PO",
    armorId: 'cota_malla',
    hasShield: true,
    weaponId: 'maza',
    goldRemaining: 7,
    items: [
      { name: "Cota de malla", quantity: 1, weight: 25, category: "armadura", isEquipped: true },
      { name: "Escudo", quantity: 1, weight: 3, category: "armadura", isEquipped: true },
      { name: "Maza", quantity: 1, weight: 2, category: "arma", isEquipped: true },
      { id: "item_holy_symbol", name: "Símbolo Sagrado", quantity: 1, weight: 0.5, category: "equipo" },
      { id: "item_paquete_sacerdote", name: "Paquete de Sacerdote", quantity: 1, weight: 11, category: "equipo" }
    ]
  },
  druida: {
    gold: 50,
    packageDescription: "Armadura de cuero, escudo, hoz, foco druídico, útiles de herbolista, Paquete de explorador y 9 PO",
    armorId: 'cuero',
    hasShield: true,
    weaponId: 'hoz',
    goldRemaining: 9,
    items: [
      { name: "Armadura de cuero", quantity: 1, weight: 5, category: "armadura", isEquipped: true },
      { name: "Escudo", quantity: 1, weight: 3, category: "armadura", isEquipped: true },
      { name: "Hoz", quantity: 1, weight: 1, category: "arma", isEquipped: true },
      { id: "item_druidic_focus", name: "Foco Druídico", quantity: 1, weight: 0.25, category: "equipo" },
      { id: "item_herbalism_kit", name: "Kit de Herbolario / Boticario", quantity: 1, weight: 1.5, category: "herramientas" },
      { id: "item_paquete_explorador", name: "Paquete de Explorador", quantity: 1, weight: 27, category: "equipo" }
    ]
  },
  guerrero: {
    gold: 155,
    packageDescription: "Cota de malla, espada larga, escudo, ballesta ligera con 20 virotes, Paquete de explorador de mazmorras y 11 PO",
    armorId: 'cota_malla',
    hasShield: true,
    weaponId: 'espada_larga',
    goldRemaining: 11,
    items: [
      { name: "Cota de malla", quantity: 1, weight: 25, category: "armadura", isEquipped: true },
      { name: "Escudo", quantity: 1, weight: 3, category: "armadura", isEquipped: true },
      { name: "Espada larga", quantity: 1, weight: 1.5, category: "arma", isEquipped: true },
      { name: "Ballesta ligera", quantity: 1, weight: 2.5, category: "arma" },
      { id: "item_virotes_20", name: "Estuche con 20 Virotes", quantity: 1, weight: 0.7, category: "municion" },
      { id: "item_paquete_explorador_mazmorras", name: "Paquete de Explorador de Mazmorras", quantity: 1, weight: 27, category: "equipo" }
    ]
  },
  monje: {
    gold: 65,
    packageDescription: "Lanza, 5 dagas, útiles de artesano/instrumento, Paquete de explorador de mazmorras y 11 PO",
    armorId: 'sin_armadura',
    hasShield: false,
    weaponId: 'lanza',
    goldRemaining: 11,
    items: [
      { name: "Lanza", quantity: 1, weight: 1.5, category: "arma", isEquipped: true },
      { name: "Daga", quantity: 5, weight: 0.5, category: "arma" },
      { id: "item_paquete_explorador_mazmorras", name: "Paquete de Explorador de Mazmorras", quantity: 1, weight: 27, category: "equipo" }
    ]
  },
  paladin: {
    gold: 150,
    packageDescription: "Cota de malla, escudo, espada larga, 6 jabalinas, símbolo sagrado, Paquete de sacerdote y 9 PO",
    armorId: 'cota_malla',
    hasShield: true,
    weaponId: 'espada_larga',
    goldRemaining: 9,
    items: [
      { name: "Cota de malla", quantity: 1, weight: 25, category: "armadura", isEquipped: true },
      { name: "Escudo", quantity: 1, weight: 3, category: "armadura", isEquipped: true },
      { name: "Espada larga", quantity: 1, weight: 1.5, category: "arma", isEquipped: true },
      { name: "Jabalina", quantity: 6, weight: 1, category: "arma" },
      { id: "item_holy_symbol", name: "Símbolo Sagrado", quantity: 1, weight: 0.5, category: "equipo" },
      { id: "item_paquete_sacerdote", name: "Paquete de Sacerdote", quantity: 1, weight: 11, category: "equipo" }
    ]
  },
  explorador: {
    gold: 150,
    packageDescription: "Armadura de cuero tachonado, 2 espadas cortas, arco largo con 20 flechas, Paquete de explorador y 7 PO",
    armorId: 'cuero_tachonado',
    hasShield: false,
    weaponId: 'arco_largo',
    goldRemaining: 7,
    items: [
      { name: "Armadura de cuero tachonado", quantity: 1, weight: 6, category: "armadura", isEquipped: true },
      { name: "Espada corta", quantity: 2, weight: 1, category: "arma", isEquipped: true },
      { name: "Arco largo", quantity: 1, weight: 1, category: "arma", isEquipped: true },
      { id: "item_carcaj_flechas_20", name: "Carcaj con 20 Flechas", quantity: 1, weight: 1, category: "municion" },
      { id: "item_paquete_explorador", name: "Paquete de Explorador", quantity: 1, weight: 27, category: "equipo" }
    ]
  },
  picaro: {
    gold: 110,
    packageDescription: "Armadura de cuero, 2 dagas, espada corta, arco corto con 20 flechas, herramientas de ladrón, Paquete de ladrón y 8 PO",
    armorId: 'cuero',
    hasShield: false,
    weaponId: 'espada_corta',
    goldRemaining: 8,
    items: [
      { name: "Armadura de cuero", quantity: 1, weight: 5, category: "armadura", isEquipped: true },
      { name: "Espada corta", quantity: 1, weight: 1, category: "arma", isEquipped: true },
      { name: "Daga", quantity: 2, weight: 0.5, category: "arma" },
      { name: "Arco corto", quantity: 1, weight: 1, category: "arma" },
      { id: "item_carcaj_flechas_20", name: "Carcaj con 20 Flechas", quantity: 1, weight: 1, category: "municion" },
      { id: "item_thieves_tools", name: "Herramientas de Ladrón", quantity: 1, weight: 0.5, category: "herramientas" },
      { id: "item_paquete_ladron", name: "Paquete de Ladrón", quantity: 1, weight: 21, category: "equipo" }
    ]
  },
  hechicero: {
    gold: 50,
    packageDescription: "2 dagas, foco arcano, Paquete de explorador de mazmorras y 28 PO",
    armorId: 'sin_armadura',
    hasShield: false,
    weaponId: 'daga',
    goldRemaining: 28,
    items: [
      { name: "Daga", quantity: 2, weight: 0.5, category: "arma", isEquipped: true },
      { id: "item_arcane_focus", name: "Foco Arcano", quantity: 1, weight: 0.5, category: "equipo" },
      { id: "item_paquete_explorador_mazmorras", name: "Paquete de Explorador de Mazmorras", quantity: 1, weight: 27, category: "equipo" }
    ]
  },
  brujo: {
    gold: 100,
    packageDescription: "Armadura de cuero, 2 dagas, foco arcano, Paquete de erudito y 15 PO",
    armorId: 'cuero',
    hasShield: false,
    weaponId: 'daga',
    goldRemaining: 15,
    items: [
      { name: "Armadura de cuero", quantity: 1, weight: 5, category: "armadura", isEquipped: true },
      { name: "Daga", quantity: 2, weight: 0.5, category: "arma", isEquipped: true },
      { id: "item_arcane_focus", name: "Foco Arcano", quantity: 1, weight: 0.5, category: "equipo" },
      { id: "item_paquete_erudito", name: "Paquete de Erudito", quantity: 1, weight: 5, category: "equipo" }
    ]
  },
  mago: {
    gold: 55,
    packageDescription: "2 dagas, foco arcano, libro de conjuros, túnica, Paquete de erudito y 5 PO",
    armorId: 'sin_armadura',
    hasShield: false,
    weaponId: 'daga',
    goldRemaining: 5,
    items: [
      { name: "Daga", quantity: 2, weight: 0.5, category: "arma", isEquipped: true },
      { id: "item_arcane_focus", name: "Foco Arcano", quantity: 1, weight: 0.5, category: "equipo" },
      { id: "item_libro_conjuros", name: "Libro de Conjuros", quantity: 1, weight: 1.5, category: "equipo" },
      { id: "item_tunica", name: "Túnica de Erudito", quantity: 1, weight: 1.8, category: "equipo" },
      { id: "item_paquete_erudito", name: "Paquete de Erudito", quantity: 1, weight: 5, category: "equipo" }
    ]
  }
};

function getClassStartingEquipment(classId) {
  if (!classId) return null;
  const cid = String(classId).toLowerCase().trim();
  return DND55_CLASS_STARTING_EQUIPMENT[cid] || null;
}
const DND55_ARMORS = [
  { id: "sin_armadura", name: "Sin Armadura (Ropas normales)", category: "none", baseAc: 10, maxDexBonus: null, weight: 0 },
  // Armaduras Ligeras
  { id: "acolchada", name: "Armadura Acolchada", category: "light", baseAc: 11, maxDexBonus: null, stealthDisadvantage: true, weight: 4 },
  { id: "cuero", name: "Armadura de Cuero", category: "light", baseAc: 11, maxDexBonus: null, weight: 5 },
  { id: "cuero_tachonado", name: "Cuero Tachonado", category: "light", baseAc: 12, maxDexBonus: null, weight: 6.5 },
  // Armaduras Medias
  { id: "pieles", name: "Armadura de Pieles", category: "medium", baseAc: 12, maxDexBonus: 2, weight: 6 },
  { id: "camisote_malla", name: "Camisote de Malla", category: "medium", baseAc: 13, maxDexBonus: 2, weight: 10 },
  { id: "cota_escamas", name: "Cota de Escamas", category: "medium", baseAc: 14, maxDexBonus: 2, stealthDisadvantage: true, weight: 22.5 },
  { id: "coraza", name: "Coraza", category: "medium", baseAc: 14, maxDexBonus: 2, weight: 10 },
  { id: "media_placa", name: "Media Armadura", category: "medium", baseAc: 15, maxDexBonus: 2, stealthDisadvantage: true, weight: 20 },
  // Armaduras Pesadas
  { id: "cota_anillas", name: "Cota de Anillas", category: "heavy", baseAc: 14, maxDexBonus: 0, stealthDisadvantage: true, weight: 20 },
  { id: "cota_malla", name: "Cota de Malla", category: "heavy", baseAc: 16, maxDexBonus: 0, minStrength: 13, stealthDisadvantage: true, weight: 27.5 },
  { id: "bandas", name: "Armadura de Bandas", category: "heavy", baseAc: 17, maxDexBonus: 0, minStrength: 15, stealthDisadvantage: true, weight: 30 },
  { id: "placas_completas", name: "Armadura de Placas", category: "heavy", baseAc: 18, maxDexBonus: 0, minStrength: 15, stealthDisadvantage: true, weight: 32.5 },
  // Escudo
  { id: "escudo", name: "Escudo (+2 CA)", category: "shield", baseAc: 2, maxDexBonus: null, weight: 3 }
];
const DND55_WEAPONS = [
  // Armas Simples Cuerpo a Cuerpo
  { id: "daga", name: "Daga", damage: "1d4", damageType: "Perforante", properties: ["Sutil", "Ligera", "Arrojadiza (alcance 6/18 m)"], category: "simple", rangeType: "melee", weight: 0.5, masteryProperty: "Mellar" },
  { id: "garrote", name: "Garrote", damage: "1d4", damageType: "Contundente", properties: ["Ligera"], category: "simple", rangeType: "melee", weight: 1, masteryProperty: "Ralentizar" },
  { id: "gran_garrote", name: "Garrote Grande", aliases: ["Gran Garrote", "garrote grande"], damage: "1d8", damageType: "Contundente", properties: ["Dos Manos"], category: "simple", rangeType: "melee", weight: 5, masteryProperty: "Empujar" },
  { id: "hacha_mano", name: "Hacha de Mano", aliases: ["Hachuela"], damage: "1d6", damageType: "Cortante", properties: ["Ligera", "Arrojadiza (alcance 6/18 m)"], category: "simple", rangeType: "melee", weight: 1, masteryProperty: "Molestar" },
  { id: "jabalina", name: "Jabalina", damage: "1d6", damageType: "Perforante", properties: ["Arrojadiza (alcance 9/36 m)"], category: "simple", rangeType: "melee", weight: 1, masteryProperty: "Ralentizar" },
  { id: "martillo_ligero", name: "Martillo Ligero", damage: "1d4", damageType: "Contundente", properties: ["Ligera", "Arrojadiza (alcance 6/18 m)"], category: "simple", rangeType: "melee", weight: 1, masteryProperty: "Mellar" },
  { id: "maza", name: "Maza", damage: "1d6", damageType: "Contundente", properties: [], category: "simple", rangeType: "melee", weight: 2, masteryProperty: "Debilitar" },
  { id: "baston", name: "Bastón", damage: "1d6/1d8", damageType: "Contundente", properties: ["Versátil"], category: "simple", rangeType: "melee", weight: 2, masteryProperty: "Derribar" },
  { id: "hoz", name: "Hoz", damage: "1d4", damageType: "Cortante", properties: ["Ligera"], category: "simple", rangeType: "melee", weight: 1, masteryProperty: "Mellar" },
  { id: "lanza", name: "Lanza", damage: "1d6/1d8", damageType: "Perforante", properties: ["Arrojadiza (alcance 6/18 m)", "Versátil"], category: "simple", rangeType: "melee", weight: 1.5, masteryProperty: "Debilitar" },
  // Armas Simples a Distancia
  { id: "ballesta_ligera", name: "Ballesta Ligera", damage: "1d8", damageType: "Perforante", properties: ["Munición (alcance 24/96 m)", "Carga", "Dos Manos"], category: "simple", rangeType: "ranged", weight: 2.5, masteryProperty: "Ralentizar" },
  { id: "dardo", name: "Dardo", damage: "1d4", damageType: "Perforante", properties: ["Sutil", "Arrojadiza (alcance 6/18 m)"], category: "simple", rangeType: "ranged", weight: 0.125, masteryProperty: "Molestar" },
  { id: "arco_corto", name: "Arco Corto", damage: "1d6", damageType: "Perforante", properties: ["Munición (alcance 24/96 m)", "Dos Manos"], category: "simple", rangeType: "ranged", weight: 1, masteryProperty: "Molestar" },
  { id: "honda", name: "Honda", damage: "1d4", damageType: "Contundente", properties: ["Munición (alcance 9/36 m)"], category: "simple", rangeType: "ranged", weight: 0, masteryProperty: "Ralentizar" },
  // Armas Marciales Cuerpo a Cuerpo
  { id: "hacha_batalla", name: "Hacha de Batalla", aliases: ["Hacha de Guerra"], damage: "1d8/1d10", damageType: "Cortante", properties: ["Versátil"], category: "marcial", rangeType: "melee", weight: 2, masteryProperty: "Derribar" },
  { id: "mangual", name: "Mangual", damage: "1d8", damageType: "Contundente", properties: [], category: "marcial", rangeType: "melee", weight: 1, masteryProperty: "Debilitar" },
  { id: "guja", name: "Guja", damage: "1d10", damageType: "Cortante", properties: ["Pesada", "Gran alcance", "Alcance", "Dos Manos"], category: "marcial", rangeType: "melee", weight: 3, masteryProperty: "Rozar" },
  { id: "gran_hacha", name: "Hacha a Dos Manos", aliases: ["Gran Hacha"], damage: "1d12", damageType: "Cortante", properties: ["Pesada", "Dos Manos"], category: "marcial", rangeType: "melee", weight: 3.5, masteryProperty: "Hender" },
  { id: "gran_martillo", name: "Maza a Dos Manos", aliases: ["Gran Martillo"], damage: "2d6", damageType: "Contundente", properties: ["Pesada", "Dos Manos"], category: "marcial", rangeType: "melee", weight: 5, masteryProperty: "Derribar" },
  { id: "espadon", name: "Espadón", damage: "2d6", damageType: "Cortante", properties: ["Pesada", "Dos Manos"], category: "marcial", rangeType: "melee", weight: 3, masteryProperty: "Rozar" },
  { id: "alabarda", name: "Alabarda", damage: "1d10", damageType: "Cortante", properties: ["Pesada", "Gran alcance", "Alcance", "Dos Manos"], category: "marcial", rangeType: "melee", weight: 3, masteryProperty: "Hender" },
  { id: "lanza_caballeria", name: "Lanza de Caballería", damage: "1d10", damageType: "Perforante", properties: ["Gran alcance", "Alcance", "Pesada", "Dos Manos"], category: "marcial", rangeType: "melee", weight: 3, masteryProperty: "Derribar" },
  { id: "espada_larga", name: "Espada Larga", damage: "1d8/1d10", damageType: "Cortante", properties: ["Versátil"], category: "marcial", rangeType: "melee", weight: 1.5, masteryProperty: "Debilitar" },
  { id: "lucero_alba", name: "Lucero del Alba", damage: "1d8", damageType: "Perforante", properties: [], category: "marcial", rangeType: "melee", weight: 2, masteryProperty: "Debilitar" },
  { id: "pica", name: "Pica", damage: "1d10", damageType: "Perforante", properties: ["Pesada", "Gran alcance", "Alcance", "Dos Manos"], category: "marcial", rangeType: "melee", weight: 9, masteryProperty: "Empujar" },
  { id: "estoque", name: "Estoque", damage: "1d8", damageType: "Perforante", properties: ["Sutil"], category: "marcial", rangeType: "melee", weight: 1, masteryProperty: "Molestar" },
  { id: "cimitarra", name: "Cimitarra", damage: "1d6", damageType: "Cortante", properties: ["Sutil", "Ligera"], category: "marcial", rangeType: "melee", weight: 1.5, masteryProperty: "Mellar" },
  { id: "espada_corta", name: "Espada Corta", damage: "1d6", damageType: "Perforante", properties: ["Sutil", "Ligera"], category: "marcial", rangeType: "melee", weight: 1, masteryProperty: "Molestar" },
  { id: "tridente", name: "Tridente", damage: "1d8/1d10", damageType: "Perforante", properties: ["Arrojadiza (alcance 6/18 m)", "Versátil"], category: "marcial", rangeType: "melee", weight: 2, masteryProperty: "Derribar" },
  { id: "martillo_guerra", name: "Martillo de Guerra", damage: "1d8/1d10", damageType: "Contundente", properties: ["Versátil"], category: "marcial", rangeType: "melee", weight: 2.5, masteryProperty: "Empujar" },
  { id: "pico_guerra", name: "Pico de Guerra", damage: "1d8/1d10", damageType: "Perforante", properties: ["Versátil"], category: "marcial", rangeType: "melee", weight: 1, masteryProperty: "Debilitar" },
  { id: "latigo", name: "Látigo", damage: "1d4", damageType: "Cortante", properties: ["Sutil", "Gran alcance", "Alcance"], category: "marcial", rangeType: "melee", weight: 1.5, masteryProperty: "Ralentizar" },
  // Armas Marciales a Distancia
  { id: "cerbatana", name: "Cerbatana", damage: "1", damageType: "Perforante", properties: ["Munici\xF3n (alcance 7,5/30 m)", "Carga"], category: "marcial", rangeType: "ranged", weight: 0.5, masteryProperty: "Molestar" },
  { id: "ballesta_mano", name: "Ballesta de Mano", damage: "1d6", damageType: "Perforante", properties: ["Munici\xF3n (alcance 9/36 m)", "Ligera", "Carga"], category: "marcial", rangeType: "ranged", weight: 1.5, masteryProperty: "Molestar" },
  { id: "ballesta_pesada", name: "Ballesta Pesada", damage: "1d10", damageType: "Perforante", properties: ["Munici\xF3n (alcance 30/120 m)", "Pesada", "Carga", "Dos Manos"], category: "marcial", rangeType: "ranged", weight: 9, masteryProperty: "Empujar" },
  { id: "arco_largo", name: "Arco Largo", damage: "1d8", damageType: "Perforante", properties: ["Munici\xF3n (alcance 45/180 m)", "Pesada", "Dos Manos"], category: "marcial", rangeType: "ranged", weight: 1, masteryProperty: "Ralentizar" },
  { id: "mosquete", name: "Mosquete", damage: "1d12", damageType: "Perforante", properties: ["Munici\xF3n (alcance 12/36 m)", "Carga", "Dos Manos"], category: "marcial", rangeType: "ranged", weight: 5, masteryProperty: "Ralentizar" },
  { id: "pistola", name: "Pistola", damage: "1d10", damageType: "Perforante", properties: ["Munici\xF3n (alcance 9/27 m)", "Carga"], category: "marcial", rangeType: "ranged", weight: 1.5, masteryProperty: "Molestar" },
  // Golpe Desarmado / Ataque sin armas
  { id: "desarmado", name: "Ataque sin armas", aliases: ["Golpe Desarmado", "Ataque Desarmado", "desarmado", "ataque sin armas", "sin armas"], damage: "1 + Mod", damageType: "Contundente", properties: [], category: "simple", rangeType: "melee", weight: 0 }
];
const WEAPON_MASTERY_DESCRIPTIONS = {
  "Mellar": {
    name: "Mellar",
    summary: "Ataque adicional sin gastar acci\xF3n adicional",
    full: "Cuando realizas el ataque adicional proporcionado por la propiedad Ligera de un arma, puedes realizarlo como parte de la acci\xF3n de Atacar en lugar de utilizar una acci\xF3n adicional. Puedes hacer este ataque adicional solo una vez por turno."
  },
  "Molestar": {
    name: "Molestar",
    summary: "Ventaja en tu siguiente ataque contra el objetivo",
    full: "Si impactas a una criatura con esta arma e infliges da\xF1o, obtienes ventaja en tu siguiente tirada de ataque contra esa misma criatura antes del final de tu siguiente turno."
  },
  "Ralentizar": {
    name: "Ralentizar",
    summary: "Reduce la velocidad del objetivo en 3 m",
    full: "Si impactas a una criatura e infliges da\xF1o, puedes reducir su velocidad en 3 metros hasta el inicio de tu siguiente turno. Si impactas a la misma criatura varias veces, esta reducci\xF3n de velocidad no se acumula."
  },
  "Derribar": {
    name: "Derribar",
    summary: "Obliga al objetivo a caer Derribado",
    full: "Si impactas a una criatura con esta arma, puedes obligarla a realizar una tirada de salvaci\xF3n de Constituci\xF3n con una CD igual a 8 + tu bonificador de competencia + el modificador de la caracter\xEDstica usada para el ataque. Si falla, el objetivo queda en estado Derribado."
  },
  "Empujar": {
    name: "Empujar",
    summary: "Empuja al objetivo hasta 3 m lejos de ti",
    full: "Si impactas a una criatura con esta arma, puedes empujarla hasta 3 metros en l\xEDnea recta alej\xE1ndola de ti, siempre que la criatura sea de tama\xF1o Grande o menor."
  },
  "Debilitar": {
    name: "Debilitar",
    summary: "Desventaja en el siguiente ataque del objetivo",
    full: "Si impactas a una criatura con esta arma, dicha criatura sufre desventaja en su siguiente tirada de ataque antes del inicio de tu siguiente turno."
  },
  "Rozar": {
    name: "Rozar",
    summary: "Inflige da\xF1o con la caracter\xEDstica aunque falles el ataque",
    full: "Si fallas una tirada de ataque contra una criatura con esta arma, aun as\xED le infliges da\xF1o igual al modificador de la caracter\xEDstica que usaste para la tirada de ataque (m\xEDnimo 0 puntos de da\xF1o del tipo de da\xF1o del arma). Este da\xF1o no se incrementa con otros bonificadores."
  },
  "Hender": {
    name: "Hender",
    summary: "Segundo ataque a otra criatura adyacente",
    full: "Si impactas a una criatura con un ataque cuerpo a cuerpo usando esta arma, puedes realizar una tirada de ataque adicional con la misma arma contra una criatura diferente que se encuentre a menos de 1,5 metros del objetivo original y a tu alcance. En caso de impactar, el da\xF1o infligido es el dado de da\xF1o del arma (sin sumar tu modificador de caracter\xEDstica, salvo que sea negativo)."
  }
};
// Aliases de maestría de armas
WEAPON_MASTERY_DESCRIPTIONS["Vejar"] = WEAPON_MASTERY_DESCRIPTIONS["Molestar"];
WEAPON_MASTERY_DESCRIPTIONS["Hostigar"] = WEAPON_MASTERY_DESCRIPTIONS["Molestar"];
WEAPON_MASTERY_DESCRIPTIONS["Embotar"] = WEAPON_MASTERY_DESCRIPTIONS["Debilitar"];
WEAPON_MASTERY_DESCRIPTIONS["Tajo"] = WEAPON_MASTERY_DESCRIPTIONS["Mellar"];
WEAPON_MASTERY_DESCRIPTIONS["molestar"] = WEAPON_MASTERY_DESCRIPTIONS["Molestar"];
WEAPON_MASTERY_DESCRIPTIONS["debilitar"] = WEAPON_MASTERY_DESCRIPTIONS["Debilitar"];
WEAPON_MASTERY_DESCRIPTIONS["mellar"] = WEAPON_MASTERY_DESCRIPTIONS["Mellar"];
WEAPON_MASTERY_DESCRIPTIONS["ralentizar"] = WEAPON_MASTERY_DESCRIPTIONS["Ralentizar"];
WEAPON_MASTERY_DESCRIPTIONS["derribar"] = WEAPON_MASTERY_DESCRIPTIONS["Derribar"];
WEAPON_MASTERY_DESCRIPTIONS["empujar"] = WEAPON_MASTERY_DESCRIPTIONS["Empujar"];
WEAPON_MASTERY_DESCRIPTIONS["rozar"] = WEAPON_MASTERY_DESCRIPTIONS["Rozar"];
WEAPON_MASTERY_DESCRIPTIONS["hender"] = WEAPON_MASTERY_DESCRIPTIONS["Hender"];
function findCanonicalWeapon(itemOrIdOrName) {
  if (!itemOrIdOrName)
    return void 0;
  if (typeof itemOrIdOrName === "string") {
    const raw = itemOrIdOrName.trim().toLowerCase();
    const exactId = DND55_WEAPONS.find((w) => w.id === raw);
    if (exactId)
      return exactId;
    const exactName = DND55_WEAPONS.find((w) => w.name.toLowerCase() === raw);
    if (exactName)
      return exactName;
    const byAlias = DND55_WEAPONS.find((w) => w.aliases && w.aliases.some(a => a.toLowerCase() === raw));
    if (byAlias)
      return byAlias;
    return DND55_WEAPONS.find((w) => raw.includes(w.name.toLowerCase()) || w.name.toLowerCase().includes(raw) || (w.aliases && w.aliases.some(a => raw.includes(a.toLowerCase()))));
  }
  if (itemOrIdOrName.weaponType) {
    const byId = DND55_WEAPONS.find((w) => w.id === itemOrIdOrName.weaponType);
    if (byId)
      return byId;
  }
  const rawName = (itemOrIdOrName.name || "").trim().toLowerCase();
  if (!rawName)
    return void 0;
  const exact = DND55_WEAPONS.find((w) => w.name.toLowerCase() === rawName || w.id.toLowerCase() === rawName || (w.aliases && w.aliases.some(a => a.toLowerCase() === rawName)));
  if (exact)
    return exact;
  return DND55_WEAPONS.find((w) => rawName.includes(w.name.toLowerCase()) || w.name.toLowerCase().includes(rawName) || (w.aliases && w.aliases.some(a => rawName.includes(a.toLowerCase()))));
}
function getAbilityModifier(score) {
  return Math.floor((score - 10) / 2);
}
function formatModifier(mod) {
  if (mod === undefined || mod === null || isNaN(mod)) return '+0';
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
const DND55_XP_THRESHOLDS = {
  1: 0,
  2: 300,
  3: 900,
  4: 2700,
  5: 6500,
  6: 14000,
  7: 23000,
  8: 34000,
  9: 48000,
  10: 64000,
  11: 85000,
  12: 100000,
  13: 120000,
  14: 140000,
  15: 165000,
  16: 195000,
  17: 225000,
  18: 265000,
  19: 305000,
  20: 355000
};
function getMinXpForLevel(level) {
  const lvl = Math.max(1, Math.min(20, Number(level) || 1));
  return DND55_XP_THRESHOLDS[lvl] || 0;
}
function getNextLevelXp(level) {
  const lvl = Math.max(1, Math.min(20, Number(level) || 1));
  if (lvl >= 20) return null;
  return DND55_XP_THRESHOLDS[lvl + 1] || null;
}
function getProficiencyBonus(level) {
  if (level >= 17)
    return 6;
  if (level >= 13)
    return 5;
  if (level >= 9)
    return 4;
  if (level >= 5)
    return 3;
  return 2;
}
function getCharacterAsiLevels(classId) {
  const cls = (classId || "").toLowerCase();
  const levels = [
    { lvl: 4, key: "level4Choice", label: "Nivel 4", isClassBonus: false }
  ];
  if (cls === "guerrero") {
    levels.push({ lvl: 6, key: "level6Choice", label: "Nivel 6 (Adicional de Guerrero)", isClassBonus: true });
  }
  levels.push({ lvl: 8, key: "level8Choice", label: "Nivel 8", isClassBonus: false });
  if (cls === "picaro") {
    levels.push({ lvl: 10, key: "level10Choice", label: "Nivel 10 (Adicional de Pícaro)", isClassBonus: true });
  }
  levels.push({ lvl: 12, key: "level12Choice", label: "Nivel 12", isClassBonus: false });
  if (cls === "guerrero") {
    levels.push({ lvl: 14, key: "level14Choice", label: "Nivel 14 (Adicional de Guerrero)", isClassBonus: true });
  }
  levels.push(
    { lvl: 16, key: "level16Choice", label: "Nivel 16", isClassBonus: false },
    { lvl: 19, key: "level19Choice", label: "Nivel 19 (Don Épico / Dote)", isClassBonus: false }
  );
  return levels;
}
function characterQualifiesForFightingStyle(char) {
  if (!char) return false;
  const charClasses = getCharacterClasses(char);
  const hasClassGrant = charClasses.some((c) => {
    const cd = DND55_CLASSES.find((x) => x.id === c.classId);
    if (!cd?.hasFightingStyle) return false;
    const minLvl = c.classId === 'guerrero' ? 1 : (c.classId === 'paladin' || c.classId === 'explorador') ? 2 : 1;
    return (c.level || 1) >= minLvl;
  });
  if (hasClassGrant) return true;

  const explicitFeatIds = [
    char.originFeat,
    char.speciesOriginFeat,
    char.customBackground?.originFeat,
    char.level4Choice?.featId,
    char.level6Choice?.featId,
    char.level8Choice?.featId,
    char.level10Choice?.featId,
    char.level12Choice?.featId,
    char.level14Choice?.featId,
    char.level16Choice?.featId,
    char.level19Choice?.featId
  ].filter(Boolean);

  if (char.classAsiChoices && typeof char.classAsiChoices === 'object') {
    Object.values(char.classAsiChoices).forEach(clsChoices => {
      if (clsChoices && typeof clsChoices === 'object') {
        Object.values(clsChoices).forEach(choice => {
          if (choice?.type === 'feat' && choice.featId) {
            explicitFeatIds.push(choice.featId);
          }
        });
      }
    });
  }

  return explicitFeatIds.some(fId => DND55_FIGHTING_STYLES.some(fs => fs.id === fId || fs.legacyId === fId));
}

function characterHasFeat(char, query) {
  if (!char || !query) return false;
  const q = query.toLowerCase().trim();
  const featKeys = [];
  if (char.originFeat) featKeys.push(char.originFeat);
  if (char.speciesId === "humano" && char.speciesOriginFeat) featKeys.push(char.speciesOriginFeat);
  if (char.customBackground?.originFeat) featKeys.push(char.customBackground.originFeat);
  if (characterQualifiesForFightingStyle(char)) {
    const allFightingStyles = [
      ...(char.fightingStyle ? [char.fightingStyle] : []),
      ...(Array.isArray(char.fightingStyles) ? char.fightingStyles : [])
    ];
    allFightingStyles.forEach(styleId => {
      featKeys.push(styleId);
      const fsDef = DND55_FIGHTING_STYLES.find((fs) => fs.id === styleId || fs.legacyId === styleId);
      if (fsDef) {
        featKeys.push(fsDef.id);
        if (fsDef.legacyId) featKeys.push(fsDef.legacyId);
        if (fsDef.name) featKeys.push(fsDef.name);
      }
    });
  }
  const bgDef = DND55_BACKGROUNDS.find((b) => b.id === char.backgroundId);
  if (bgDef?.originFeat) featKeys.push(bgDef.originFeat);
  const charClasses = getCharacterClasses(char);
  charClasses.forEach((c, cIdx) => {
    getCharacterAsiLevels(c.classId).forEach(({ lvl, key }) => {
      if ((c.level || 1) >= lvl) {
        const choice = char.classAsiChoices?.[c.classId]?.[key] ||
          char[`${c.classId}_${key}`] ||
          (cIdx === 0 ? char[key] : null);
        if (choice?.featId) {
          featKeys.push(choice.featId);
          const fDef = getFeatById(choice.featId);
          if (fDef?.name) featKeys.push(fDef.name);
        }
        if (choice?.featName) featKeys.push(choice.featName);
      }
    });
  });
  const extraFeats = Array.isArray(char.feats) ? char.feats : Array.isArray(char.additionalFeats) ? char.additionalFeats : [];
  extraFeats.forEach((f) => {
    if (typeof f === "string") featKeys.push(f);
    else if (f?.id) featKeys.push(f.id);
    if (f?.name) featKeys.push(f.name);
  });
  return featKeys.some((f) => {
    if (!f) return false;
    const s = String(f).toLowerCase().trim();
    return s === q || s.includes(q);
  });
}
function calculateFinalAbilityScores(char) {
  const finalScores = { ...char.baseAbilityScores };
  if (char.backgroundAbilityBoosts && Array.isArray(char.backgroundAbilityBoosts)) {
    char.backgroundAbilityBoosts.forEach((boost) => {
      if (boost && boost.ability) {
        finalScores[boost.ability] = (finalScores[boost.ability] || 10) + (boost.bonus || 0);
      }
    });
  }
  const applyChoice = (choice) => {
    if (!choice)
      return;
    if (choice.type === "asi") {
      if (choice.asiMode === "plus2" && choice.asiPlusTwoAbility) {
        finalScores[choice.asiPlusTwoAbility] = (finalScores[choice.asiPlusTwoAbility] || 10) + 2;
      } else if (choice.asiMode === "plus1plus1" && choice.asiPlusOneAbilities && choice.asiPlusOneAbilities.length === 2) {
        finalScores[choice.asiPlusOneAbilities[0]] = (finalScores[choice.asiPlusOneAbilities[0]] || 10) + 1;
        finalScores[choice.asiPlusOneAbilities[1]] = (finalScores[choice.asiPlusOneAbilities[1]] || 10) + 1;
      } else if (choice.asiBoosts) {
        Object.entries(choice.asiBoosts).forEach(([key, val]) => {
          if (typeof val === "number")
            finalScores[key] = (finalScores[key] || 10) + val;
        });
      }
    } else if (choice.type === "feat") {
      if (choice.chosenAbility) {
        finalScores[choice.chosenAbility] = (finalScores[choice.chosenAbility] || 10) + 1;
      } else if (choice.chosenAbilityBonus && Object.keys(choice.chosenAbilityBonus).length > 0) {
        const featDef = getFeatById(choice.featId);
        const entries = Object.entries(choice.chosenAbilityBonus);
        if (featDef && Array.isArray(featDef.allowedAbilities) && featDef.allowedAbilities.length > 0) {
          const validEntry = entries.find(([k, v]) => featDef.allowedAbilities.includes(k) && v > 0) || entries[0];
          if (validEntry) {
            finalScores[validEntry[0]] = (finalScores[validEntry[0]] || 10) + (validEntry[1] || 1);
          }
        } else {
          entries.forEach(([key, val]) => {
            if (typeof val === "number")
              finalScores[key] = (finalScores[key] || 10) + val;
          });
        }
      } else if (choice.featId) {
        const featDef = getFeatById(choice.featId);
        if (featDef?.abilityBonus) {
          if (Array.isArray(featDef.allowedAbilities) && featDef.allowedAbilities.length > 1) {
            const defaultAb = featDef.allowedAbilities[0];
            finalScores[defaultAb] = (finalScores[defaultAb] || 10) + 1;
          } else {
            Object.entries(featDef.abilityBonus).forEach(([key, val]) => {
              if (val)
                finalScores[key] = (finalScores[key] || 10) + val;
            });
          }
        }
      }
    }
  };
  const activeCharClasses = getCharacterClasses(char);
  activeCharClasses.forEach((c, cIdx) => {
    getCharacterAsiLevels(c.classId).forEach(({ lvl, key }) => {
      if ((c.level || 1) >= lvl) {
        const choice = char.classAsiChoices?.[c.classId]?.[key] ||
          char[`${c.classId}_${key}`] ||
          (cIdx === 0 ? char[key] : null);
        if (choice) applyChoice(choice);
      }
    });
  });
  if (getClassLevel(char, "barbaro") >= 20) {
    finalScores.str = (finalScores.str || 10) + 4;
    finalScores.con = (finalScores.con || 10) + 4;
  }
  if (getClassLevel(char, "monje") >= 20) {
    finalScores.dex = (finalScores.dex || 10) + 4;
    finalScores.wis = (finalScores.wis || 10) + 4;
  }
  const activeMods = getActiveStatModifiers(char);
  const abilityKeys = ["str", "dex", "con", "int", "wis", "cha"];
  activeMods.forEach((mod) => {
    if (mod.mode === "bonus" && abilityKeys.includes(mod.target)) {
      finalScores[mod.target] = (finalScores[mod.target] || 10) + mod.value;
    }
  });
  activeMods.forEach((mod) => {
    if (mod.mode === "override_if_lower" && abilityKeys.includes(mod.target)) {
      const current = finalScores[mod.target] || 10;
      if (current < mod.value) {
        finalScores[mod.target] = mod.value;
      }
    }
  });
  return finalScores;
}

function calculateAbilityScoresBreakdown(char) {
  const breakdown = {};
  const abilityKeys = ["str", "dex", "con", "int", "wis", "cha"];
  const abilityNames = {
    str: 'Fuerza',
    dex: 'Destreza',
    con: 'Constitución',
    int: 'Inteligencia',
    wis: 'Sabiduría',
    cha: 'Carisma'
  };

  const bgDef = char.customBackground || DND55_BACKGROUNDS.find(b => b.id === char.backgroundId);
  const bgName = bgDef?.name || 'Trasfondo';

  const activeMods = getActiveStatModifiers(char);

  abilityKeys.forEach(ab => {
    const base = char.baseAbilityScores?.[ab] !== undefined ? char.baseAbilityScores[ab] : 10;
    const parts = [`${base} inicial`];
    let total = base;

    // 1. Trasfondo
    if (char.backgroundAbilityBoosts && Array.isArray(char.backgroundAbilityBoosts)) {
      char.backgroundAbilityBoosts.forEach(boost => {
        if (boost && boost.ability === ab && boost.bonus) {
          total += boost.bonus;
          parts.push(`+${boost.bonus} por el trasfondo (${bgName})`);
        }
      });
    }

    // 2. Dotes y mejoras de nivel (ASI / Feats)
    const checkChoice = (choice, lvl) => {
      if (!choice) return;
      if (choice.type === 'asi') {
        if (choice.asiMode === 'plus2' && choice.asiPlusTwoAbility === ab) {
          total += 2;
          parts.push(`+2 por Mejora de Característica (Nv ${lvl})`);
        } else if (choice.asiMode === 'plus1plus1' && Array.isArray(choice.asiPlusOneAbilities) && choice.asiPlusOneAbilities.includes(ab)) {
          total += 1;
          parts.push(`+1 por Mejora de Característica (Nv ${lvl})`);
        } else if (choice.asiBoosts && choice.asiBoosts[ab]) {
          total += choice.asiBoosts[ab];
          parts.push(`+${choice.asiBoosts[ab]} por Mejora de Característica (Nv ${lvl})`);
        }
      } else if (choice.type === 'feat') {
        const featDef = getFeatById(choice.featId);
        const featName = featDef?.name || choice.featName || 'Dote';
        const chosenAb = choice.chosenAbility || (choice.chosenAbilityBonus ? Object.keys(choice.chosenAbilityBonus)[0] : null);
        if (chosenAb) {
          if (chosenAb === ab) {
            const val = (choice.chosenAbilityBonus && choice.chosenAbilityBonus[ab]) || 1;
            total += val;
            parts.push(`+${val} por la Dote ${featName} (Nv ${lvl})`);
          }
        } else if (featDef?.abilityBonus) {
          const defaultAb = (Array.isArray(featDef.allowedAbilities) && featDef.allowedAbilities.length > 0)
            ? featDef.allowedAbilities[0]
            : Object.keys(featDef.abilityBonus)[0];
          if (defaultAb === ab && featDef.abilityBonus[ab]) {
            total += featDef.abilityBonus[ab];
            parts.push(`+${featDef.abilityBonus[ab]} por la Dote ${featName} (Nv ${lvl})`);
          }
        }
      }
    };

    const charClassesBreakdown = getCharacterClasses(char);
    charClassesBreakdown.forEach((c, cIdx) => {
      getCharacterAsiLevels(c.classId).forEach(({ lvl, key }) => {
        if ((c.level || 1) >= lvl) {
          const choice = char.classAsiChoices?.[c.classId]?.[key] ||
            char[`${c.classId}_${key}`] ||
            (cIdx === 0 ? char[key] : null);
          checkChoice(choice, lvl);
        }
      });
    });

    if (getClassLevel(char, 'barbaro') >= 20 && (ab === 'str' || ab === 'con')) {
      total += 4;
      parts.push('+4 por Campeón Primigenio (Nv 20)');
    }
    if (getClassLevel(char, 'monje') >= 20 && (ab === 'dex' || ab === 'wis')) {
      total += 4;
      parts.push('+4 por Cuerpo y Mente (Nv 20)');
    }

    // 3. Modificadores activos (bonus)
    activeMods.forEach(mod => {
      if (mod.mode === 'bonus' && mod.target === ab) {
        total += mod.value;
        parts.push(`+${mod.value} por ${mod.sourceName || 'Rasgo Especial'}`);
      }
    });

    // 4. Modificadores de fijación (override_if_lower)
    let overridden = false;
    activeMods.forEach(mod => {
      if (mod.mode === 'override_if_lower' && mod.target === ab) {
        if (total < mod.value) {
          total = mod.value;
          parts.push(`fijado en ${mod.value} por ${mod.sourceName || 'Objeto Mágico'}`);
          overridden = true;
        }
      }
    });

    const finalMod = getAbilityModifier(total);
    const modStr = formatModifier(finalMod);

    let formula = '';
    if (overridden) {
      formula = `${parts.join(' ')} = ${total} (Modificador: ${modStr})`;
    } else if (parts.length > 1) {
      formula = `${parts.join(' ')} = ${total} (Modificador: ${modStr})`;
    } else {
      formula = `${total} inicial (sin modificadores) = ${total} (Modificador: ${modStr})`;
    }

    breakdown[ab] = {
      base,
      total,
      modifier: finalMod,
      modStr,
      formula,
      abilityName: abilityNames[ab],
      shortName: getAbilityShortName(ab)
    };
  });

  return breakdown;
}

function getActiveStatModifiers(char) {
  const mods = [];
  if (char.inventory && Array.isArray(char.inventory)) {
    char.inventory.forEach((item) => {
      const isItemActive = item.isEquipped && (!item.requiresAttunement || item.isAttuned);
      if (isItemActive && item.statModifiers && Array.isArray(item.statModifiers)) {
        item.statModifiers.forEach((m) => {
          mods.push({
            ...m,
            sourceName: item.name || "Objeto Mágico",
            sourceType: "item"
          });
        });
      }
      if (isItemActive && item.artifactProperties && Array.isArray(item.artifactProperties)) {
        item.artifactProperties.forEach((ap) => {
          if (ap && ap.statModifier) {
            mods.push({
              ...ap.statModifier,
              sourceName: `${item.name || "Artefacto"} (${ap.name})`,
              sourceType: "item"
            });
          }
        });
      }
    });
  }
  if (char.specialAbilities && Array.isArray(char.specialAbilities)) {
    char.specialAbilities.forEach((ability) => {
      const isAbilityActive = ability.isActive !== false;
      if (isAbilityActive && ability.statModifiers && Array.isArray(ability.statModifiers)) {
        ability.statModifiers.forEach((m) => {
          const src = ability.source ? `${ability.name} (${ability.source})` : ability.name;
          mods.push({
            ...m,
            sourceName: src || "Rasgo Especial",
            sourceType: "ability"
          });
        });
      }
    });
  }
  return mods;
}

function calculateArmorClass(char) {
  const scores = calculateFinalAbilityScores(char);
  const dexMod = getAbilityModifier(scores.dex);
  const conMod = getAbilityModifier(scores.con);
  const wisMod = getAbilityModifier(scores.wis);
  const chaMod = getAbilityModifier(scores.cha);
  const equippedInventoryArmor = char.inventory?.find(
    (item) => item.isEquipped && (item.category === "armadura" || item.armorType && item.armorType !== "sin_armadura" && item.armorType !== "escudo") && item.armorType !== "escudo" && !item.name.toLowerCase().includes("escudo")
  );
  let equippedArmorDef = null;
  let armorMagicBonus = 0;
  let equippedArmorItemName = "";
  const hasInventory = Array.isArray(char.inventory) && char.inventory.length > 0;
  if (equippedInventoryArmor) {
    const found = DND55_ARMORS.find(
      (a) => a.id === equippedInventoryArmor.armorType || a.id === equippedInventoryArmor.id || a.name.toLowerCase() === equippedInventoryArmor.name.toLowerCase()
    );
    equippedArmorDef = found || {
      id: equippedInventoryArmor.id,
      name: equippedInventoryArmor.name,
      category: "medium",
      baseAc: 13,
      maxDexBonus: 2,
      weight: equippedInventoryArmor.weight || 10
    };
    armorMagicBonus = equippedInventoryArmor.magicBonus || 0;
    equippedArmorItemName = equippedInventoryArmor.name;
  } else if (!hasInventory && char.armorId && char.armorId !== "sin_armadura") {
    const found = DND55_ARMORS.find((a) => a.id === char.armorId);
    if (found && found.category !== "none") {
      equippedArmorDef = found;
      equippedArmorItemName = found.name;
    }
  }
  const allShieldItems = (char.inventory || []).filter(
    (item) => item.armorType === "escudo" || item.id === "escudo" || (item.name && item.name.toLowerCase().includes("escudo")) || item.category === "escudo" || item.category === "shield"
  );
  const equippedInventoryShield = allShieldItems.find((item) => item.isEquipped);
  const unequippedShieldInInventory = allShieldItems.some((item) => !item.isEquipped);
  const hasShield = Boolean(equippedInventoryShield || (char.hasShield && !unequippedShieldInInventory));
  const hasAnyShield = Boolean(hasShield || allShieldItems.length > 0 || char.hasShield);

  const bestShield = equippedInventoryShield || allShieldItems[0] || (char.hasShield ? { name: "Escudo", magicBonus: 0 } : null);
  const shieldMagicBonus = equippedInventoryShield?.magicBonus || bestShield?.magicBonus || 0;
  const totalShieldBonus = 2 + shieldMagicBonus;

  const hasMageArmorSpell = (char.spells || []).some((sp) => {
    if (!sp) return false;
    if (typeof sp === "string") {
      const s = sp.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return s === "armadura_mago" || s.includes("armadura de mago") || s === "mage_armor" || s.includes("armadura mago");
    }
    const id = String(sp.id || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const name = String(sp.name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return id === "armadura_mago" || id.includes("armadura_mago") || id === "mage_armor" ||
           name.includes("armadura de mago") || name.includes("armadura mago") || name.includes("mage armor");
  });
  
  let itemAcBonus = 0;
  const itemAcDetails = [];
  const activeAcMods = getActiveStatModifiers(char);
  activeAcMods.forEach((mod) => {
    if (mod.target === "ac" && mod.mode === "bonus") {
      itemAcBonus += mod.value;
      itemAcDetails.push(`${mod.sourceName || "Objeto Mágico"} (+${mod.value})`);
    }
  });

  const hasMediumArmorMaster = characterHasFeat(char, "medium_armor_master") || characterHasFeat(char, "maestro en armaduras medias");
  const hasDualWielder = characterHasFeat(char, "dual_wielder") || characterHasFeat(char, "combatiente con dos armas");
  const equippedMeleeWeaponsCount = ((char.inventory || []).filter((i) => i.isEquipped && i.category === "arma").length || (char.equippedWeapons || []).length);
  if (hasDualWielder && !hasShield && equippedMeleeWeaponsCount >= 2) {
    itemAcBonus += 1;
    itemAcDetails.push("Dote Combatiente con Dos Armas (+1)");
  }

  if (equippedArmorDef && equippedArmorDef.category !== "none") {
    const base = equippedArmorDef.baseAc;
    let dexApplied = 0;
    const effectiveMaxDex = (equippedArmorDef.category === "medium" && hasMediumArmorMaster && equippedArmorDef.maxDexBonus === 2)
      ? 3
      : equippedArmorDef.maxDexBonus;
    if (effectiveMaxDex === null) {
      dexApplied = dexMod;
    } else if (effectiveMaxDex > 0) {
      dexApplied = Math.min(dexMod, effectiveMaxDex);
    } else {
      dexApplied = 0;
    }
    const defenseStyleBonus = (characterQualifiesForFightingStyle(char) && (char.fightingStyle === "defensa" || characterHasFeat(char, "estilo_defensa"))) ? 1 : 0;
    const acWithoutShield = base + dexApplied + defenseStyleBonus + armorMagicBonus + itemAcBonus;
    const acWithShield = acWithoutShield + totalShieldBonus;
    const totalAc = hasShield ? acWithShield : acWithoutShield;

    const details = [
      `${equippedArmorItemName || equippedArmorDef.name} (Base ${base})`,
      armorMagicBonus ? `Mejora Mágica (+${armorMagicBonus})` : null,
      dexApplied !== 0 ? `Mod. Destreza (${formatModifier(dexApplied)}${effectiveMaxDex !== null ? ` máx +${effectiveMaxDex}${hasMediumArmorMaster && equippedArmorDef.category === "medium" ? ' [Maestro Arm. Medias]' : ''}` : ''})` : null,
      hasShield ? (shieldMagicBonus ? `Escudo (+2 y +${shieldMagicBonus} mágico)` : "Escudo (+2)") : (hasAnyShield ? `[Escudo en inventario: +${totalShieldBonus}]` : null),
      defenseStyleBonus ? "Estilo Combate Defensa (+1)" : null,
      ...itemAcDetails
    ].filter(Boolean).join(" + ");

    let acDisplay = String(totalAc);
    let acDisplayNote = equippedArmorItemName || equippedArmorDef.name;
    if (hasAnyShield) {
      acDisplay = `${acWithoutShield}/${acWithShield}`;
      acDisplayNote = hasShield ? `Escudo equipado (+${totalShieldBonus})` : `Escudo en inventario (+${totalShieldBonus})`;
    }

    return {
      ac: totalAc,
      acDisplay,
      acDisplayNote,
      acWithoutShield,
      acWithShield,
      formula: `${details} = ${totalAc} CA (Visual: ${acDisplay})`,
      isUnarmored: false,
      equippedArmorName: equippedArmorItemName || equippedArmorDef.name,
      hasShield,
      hasAnyShield,
      shieldBonus: totalShieldBonus,
      shieldBadgeText: hasShield ? `Escudo (+${totalShieldBonus})` : `Escudo en inv (+${totalShieldBonus})`,
      hasMageArmorSpell: Boolean(hasMageArmorSpell),
      acWithMageArmor: null,
      acWithoutMageArmor: totalAc
    };
  }
  const allClasses = /* @__PURE__ */ new Set();
  const allSubclasses = /* @__PURE__ */ new Set();
  const charClasses = getCharacterClasses(char);
  charClasses.forEach((c) => {
    if (c.classId) allClasses.add(String(c.classId).toLowerCase());
    if (c.subclassId) allSubclasses.add(String(c.subclassId).toLowerCase());
  });
  if (char.classId)
    allClasses.add(char.classId.toLowerCase());
  if (char.secondaryClassId)
    allClasses.add(char.secondaryClassId.toLowerCase());
  if (char.multiclass && Array.isArray(char.multiclass)) {
    char.multiclass.forEach((m) => {
      if (m.classId)
        allClasses.add(m.classId.toLowerCase());
    });
  }
  if (char.subclassId)
    allSubclasses.add(char.subclassId.toLowerCase());
  if (char.multiclass && Array.isArray(char.multiclass)) {
    char.multiclass.forEach((m) => {
      if (m.subclassId)
        allSubclasses.add(m.subclassId.toLowerCase());
    });
  }
  const abilitiesText = (char.specialAbilities || []).map((a) => `${a.name} ${a.description}`).join(" ").toLowerCase();
  const hasBarbarian = allClasses.has("barbaro") || abilitiesText.includes("bárbaro") || abilitiesText.includes("barbaro");
  const hasMonk = allClasses.has("monje") || abilitiesText.includes("monje");
  const hasDraconicSorcerer = allClasses.has("hechicero") && allSubclasses.has("linaje_draconico") || abilitiesText.includes("dracónica") || abilitiesText.includes("draconica");
  const hasDanceBard = allClasses.has("bardo") && allSubclasses.has("colegio_danza") || abilitiesText.includes("danza") || abilitiesText.includes("danzarín") || abilitiesText.includes("danzarin");

  const buildCandidates = (withShield) => {
    const list = [];
    const shVal = withShield ? totalShieldBonus : 0;
    const stdParts = [
      `10 Base sin armadura`,
      `Mod. Destreza (${formatModifier(dexMod)})`,
      shVal ? (shieldMagicBonus ? `Escudo (+2 y +${shieldMagicBonus} mágico)` : `Escudo (+2)`) : null,
      ...itemAcDetails
    ].filter(Boolean);
    list.push({
      name: "Sin Armadura Estándar",
      ac: 10 + dexMod + shVal + itemAcBonus,
      formula: `${stdParts.join(" + ")} = ${10 + dexMod + shVal + itemAcBonus} CA`
    });

    if (hasBarbarian) {
      const barbParts = [
        `10 Base`,
        `Mod. Destreza (${formatModifier(dexMod)})`,
        `Mod. Constitución (${formatModifier(conMod)})`,
        shVal ? `Escudo (+${shVal})` : null,
        ...itemAcDetails
      ].filter(Boolean);
      list.push({
        name: "Defensa sin Armadura (Bárbaro)",
        ac: 10 + dexMod + conMod + shVal + itemAcBonus,
        formula: `${barbParts.join(" + ")} = ${10 + dexMod + conMod + shVal + itemAcBonus} CA`
      });
    }

    if (hasMonk && !withShield) {
      const monkParts = [
        `10 Base`,
        `Mod. Destreza (${formatModifier(dexMod)})`,
        `Mod. Sabiduría (${formatModifier(wisMod)})`,
        ...itemAcDetails
      ].filter(Boolean);
      list.push({
        name: "Defensa sin Armadura (Monje)",
        ac: 10 + dexMod + wisMod + itemAcBonus,
        formula: `${monkParts.join(" + ")} = ${10 + dexMod + wisMod + itemAcBonus} CA`
      });
    }

    if (hasDraconicSorcerer) {
      const dracParts = [
        `13 Base (Escamas Dracónicas)`,
        `Mod. Destreza (${formatModifier(dexMod)})`,
        shVal ? `Escudo (+${shVal})` : null,
        ...itemAcDetails
      ].filter(Boolean);
      list.push({
        name: "Resiliencia Dracónica (Hechicero)",
        ac: 13 + dexMod + shVal + itemAcBonus,
        formula: `${dracParts.join(" + ")} = ${13 + dexMod + shVal + itemAcBonus} CA`
      });
    }

    if (hasDanceBard && !withShield) {
      const bardParts = [
        `10 Base`,
        `Mod. Destreza (${formatModifier(dexMod)})`,
        `Mod. Carisma (${formatModifier(chaMod)})`,
        ...itemAcDetails
      ].filter(Boolean);
      list.push({
        name: "Danzarín Deslumbrante (Bardo de la Danza)",
        ac: 10 + dexMod + chaMod + itemAcBonus,
        formula: `${bardParts.join(" + ")} = ${10 + dexMod + chaMod + itemAcBonus} CA`
      });
    }

    list.sort((a, b) => b.ac - a.ac);
    return list;
  };

  const candidatesWithoutShield = buildCandidates(false);
  const candidatesWithShield = buildCandidates(true);
  const bestWithoutShield = candidatesWithoutShield[0];
  const bestWithShield = candidatesWithShield[0];

  const acWithoutShield = bestWithoutShield.ac;
  const acWithShield = bestWithShield.ac;
  const currentAc = hasShield ? acWithShield : acWithoutShield;
  const currentBest = hasShield ? bestWithShield : bestWithoutShield;

  // Armadura de Mago (Conjuro no permanente: 13 + Mod. Destreza)
  const mageArmorBase = 13 + dexMod + itemAcBonus;
  const acWithMageArmor = hasShield ? (mageArmorBase + totalShieldBonus) : mageArmorBase;
  const acWithoutMageArmor = currentAc;

  let acDisplay = String(currentAc);
  let acDisplayNote = currentBest.name;

  if (hasMageArmorSpell && acWithMageArmor > currentAc) {
    if (hasAnyShield) {
      if (hasShield) {
        acDisplay = `${currentAc}/${acWithMageArmor}`;
        acDisplayNote = `Normal con Escudo (${currentAc}) / Con Armadura de Mago (${acWithMageArmor})`;
      } else {
        acDisplay = `${acWithoutShield}/${acWithMageArmor}`;
        acDisplayNote = `Normal (${acWithoutShield}) / Con Armadura de Mago (${acWithMageArmor}) [Escudo en inv: +${totalShieldBonus}]`;
      }
    } else {
      acDisplay = `${currentAc}/${acWithMageArmor}`;
      acDisplayNote = `Normal (${currentAc}) / Con Armadura de Mago (${acWithMageArmor})`;
    }
  } else if (hasAnyShield) {
    acDisplay = `${acWithoutShield}/${acWithShield}`;
    acDisplayNote = hasShield ? `Escudo equipado (+${totalShieldBonus})` : `Escudo en inventario (+${totalShieldBonus})`;
  }

  const comparisonNote = (hasShield ? candidatesWithShield : candidatesWithoutShield).length > 1
    ? ` [Mayor entre: ${(hasShield ? candidatesWithShield : candidatesWithoutShield).map((c) => `${c.name}: ${c.ac}`).join(" vs ")}]`
    : "";

  return {
    ac: currentAc,
    acDisplay,
    acDisplayNote,
    acWithoutShield,
    acWithShield,
    formula: `${currentBest.formula}${comparisonNote}${hasMageArmorSpell && acWithMageArmor > currentAc ? ` | Con Armadura de Mago (13 + Mod. DES${hasShield ? ' + Escudo' : ''}): ${acWithMageArmor} CA` : ''} (Visual: ${acDisplay})`,
    isUnarmored: true,
    chosenUnarmoredOption: currentBest.name,
    allUnarmoredOptions: (hasShield ? candidatesWithShield : candidatesWithoutShield).map((c) => ({ name: c.name, ac: c.ac, formula: c.formula })),
    hasShield,
    hasAnyShield,
    shieldBonus: totalShieldBonus,
    shieldBadgeText: hasShield ? `Escudo (+${totalShieldBonus})` : `Escudo en inv (+${totalShieldBonus})`,
    hasMageArmorSpell: Boolean(hasMageArmorSpell),
    acWithMageArmor,
    acWithoutMageArmor
  };
}

function calculateHitPoints(char) {
  const scores = calculateFinalAbilityScores(char);
  const conMod = getAbilityModifier(scores.con);
  const progression = getCharacterLevelProgression(char);
  const level = progression.length > 0 ? progression.length : Math.max(1, char.level || 1);
  const breakdown = [];

  const lvl1Info = progression[0] || { hitDie: 8, className: 'Aventurero', classId: 'guerrero' };
  const lvl1Die = lvl1Info.hitDie || 8;
  const lvl1Hp = Math.max(1, lvl1Die + conMod);
  breakdown.push({
    level: 1,
    roll: lvl1Die,
    hitDie: lvl1Die,
    classId: lvl1Info.classId,
    className: lvl1Info.className,
    conMod,
    total: lvl1Hp,
    mode: "fixed_lvl1"
  });
  let hp = lvl1Hp;
  let higherLevelsTotal = 0;
  for (let l = 2; l <= level; l++) {
    const lvlInfo = progression[l - 1] || lvl1Info;
    const die = lvlInfo.hitDie || 8;
    const defaultAvg = Math.floor(die / 2) + 1;
    const config = char.hpRollsByLevel?.[l];
    const dieRoll = config && typeof config.dieValue === "number" && config.dieValue >= 1 ? config.dieValue : defaultAvg;
    const mode = config?.mode || "average";
    const levelGain = Math.max(1, dieRoll + conMod);
    hp += levelGain;
    higherLevelsTotal += levelGain;
    breakdown.push({
      level: l,
      roll: dieRoll,
      hitDie: die,
      classId: lvlInfo.classId,
      className: lvlInfo.className,
      conMod,
      total: levelGain,
      mode
    });
  }

  const parts = [];
  parts.push(`Nivel 1 [${lvl1Info.className}] (d${lvl1Die} máx ${lvl1Die} + ${conMod} CON = ${lvl1Hp})`);
  if (level > 1) {
    const lvlDetails = breakdown.slice(1).map((b) => `Nv${b.level}[${b.className} d${b.hitDie}]: ${b.roll}[${b.mode === "roll" ? "Dado" : "Media"}]${conMod >= 0 ? `+${conMod}` : conMod}=${b.total}`).join(", ");
    parts.push(`Niveles 2 al ${level} (${lvlDetails} = ${higherLevelsTotal})`);
  }

  const hasTough = characterHasFeat(char, "duro") || characterHasFeat(char, "tough") || char.backgroundId === "granjero";
  if (hasTough) {
    const toughBonus = level * 2;
    hp += toughBonus;
    parts.push(`+${toughBonus} por Dote Duro (2 PG × nv ${level})`);
  }
  if (char.speciesId === "enano") {
    const dwarfBonus = level * 1;
    hp += dwarfBonus;
    parts.push(`+${dwarfBonus} por Dureza Enana (1 PG × nv ${level})`);
  }
  const sorcererLvl = getClassLevel(char, "hechicero");
  const isDraconicSorcerer = (sorcererLvl > 0 && char.subclassId === "linaje_draconico") || getCharacterClasses(char).some(c => c.classId === 'hechicero' && c.subclassId === 'linaje_draconico');
  if (isDraconicSorcerer) {
    const draconicBonus = sorcererLvl * 1;
    hp += draconicBonus;
    parts.push(`+${draconicBonus} por Resiliencia Dracónica (1 PG × nv ${sorcererLvl} Hechicero)`);
  }
  if (characterHasFeat(char, "dote_epica_salud_chauntea")) {
    hp += 50;
    parts.push("+50 por Bendición de la Salud de Chauntea");
  }
  const activeHpMods = getActiveStatModifiers(char);
  activeHpMods.forEach((mod) => {
    if (mod.target === "hpMax" && mod.mode === "bonus") {
      hp += mod.value;
      parts.push(`+${mod.value} por ${mod.sourceName || 'Objeto/Rasgo'}`);
    }
  });

  const formula = `${parts.join(' + ')} = ${hp} PG Máximos`;
  const hitDicePool = getCharacterHitDicePool(char);

  return {
    maxHp: hp,
    hitDice: hitDicePool.summaryText,
    hitDicePool,
    level1Hp: lvl1Hp,
    higherLevelsTotal,
    breakdown,
    formula,
    conMod,
    baseHp: lvl1Hp + higherLevelsTotal
  };
}

function calculateInitiative(char) {
  const scores = calculateFinalAbilityScores(char);
  const dexMod = getAbilityModifier(scores.dex);
  const classes = getCharacterClasses(char);
  const totalLevel = classes.reduce((sum, c) => sum + c.level, 0) || (char.level || 1);
  const pb = getProficiencyBonus(totalLevel);
  const hasAlert = characterHasFeat(char, "alerta") || char.backgroundId === "criminal" || char.backgroundId === "guardia";
  const hasHelm = characterHasFeat(char, "vigilante_de_helm");
  let bonusModifiers = 0;
  const bonusDetails = [];
  if (hasHelm && !hasAlert) {
    bonusModifiers += pb;
    bonusDetails.push(`Dote Vigilante de Helm (+${pb} BC)`);
  }
  const bardLvl = getClassLevel(char, "bardo");
  if (bardLvl >= 2 && !hasAlert && !hasHelm) {
    const jackBonus = Math.floor(pb / 2);
    if (jackBonus > 0) {
      bonusModifiers += jackBonus;
      bonusDetails.push(`Aprendiz de Mucho (+${jackBonus} ½ BC)`);
    }
  }
  const activeMods = getActiveStatModifiers(char);
  activeMods.forEach((mod) => {
    if (mod.target === "initiative" && mod.mode === "bonus") {
      bonusModifiers += mod.value;
      bonusDetails.push(`${mod.sourceName || 'Objeto'} (+${mod.value})`);
    }
  });
  const total = dexMod + (hasAlert ? pb : 0) + bonusModifiers;
  const parts = [`Mod. Destreza (${formatModifier(dexMod)})`];
  if (hasAlert)
    parts.push(`Dote Alerta (+${pb} BC)`);
  if (bonusDetails.length > 0)
    parts.push(...bonusDetails);
  return { 
    bonus: total, 
    formula: parts.length > 1 ? `${parts.join(" + ")} = ${formatModifier(total)}` : `${parts[0]} = ${formatModifier(total)}` 
  };
}

function calculateSpeed(char) {
  const spDef = DND55_SPECIES.find((s) => s.id === char.speciesId);
  let baseSpeed = spDef?.speed || 9;
  const parts = [`${baseSpeed} m (Base de especie: ${spDef?.name || "Humano"})`];
  
  if (char.sublineageId === "elfo_bosques") {
    baseSpeed = 10.5;
    parts[0] = "10,5 m (Base: Elfo de los Bosques)";
  }

  let bonusSpeed = 0;
  const monkLvl = getClassLevel(char, "monje");
  const barbLvl = getClassLevel(char, "barbaro");
  const rangerLvl = getClassLevel(char, "explorador");

  if (monkLvl >= 2) {
    const monkBonus = monkLvl >= 18 ? 9 : monkLvl >= 14 ? 7.5 : monkLvl >= 10 ? 6 : monkLvl >= 6 ? 4.5 : 3;
    bonusSpeed += monkBonus;
    parts.push(`+${monkBonus} m (Movimiento sin Armadura de Monje Nv ${monkLvl})`);
  }
  if (barbLvl >= 5) {
    bonusSpeed += 3;
    parts.push(`+3 m (Movimiento Rápido de Bárbaro Nv ${barbLvl})`);
  }
  if (rangerLvl >= 6) {
    bonusSpeed += 3;
    parts.push(`+3 m (Nómada Incansable de Explorador Nv ${rangerLvl})`);
  }

  if (characterHasFeat(char, "speedster") || characterHasFeat(char, "corredor veloz") || characterHasFeat(char, "movil")) {
    bonusSpeed += 3;
    parts.push(`+3 m (Dote Corredor Veloz / Móvil)`);
  }
  if (characterHasFeat(char, "dote_epica_velocidad_shaundakul")) {
    bonusSpeed += 9;
    parts.push(`+9 m (Bendición de la Velocidad de Shaundakul)`);
  }

  const activeMods = getActiveStatModifiers(char);
  activeMods.forEach((m) => {
    if ((m.target === "speed" || m.target === "velocidad") && m.mode === "bonus") {
      bonusSpeed += m.value;
      parts.push(`+${m.value} m (${m.sourceName || "Especial"})`);
    }
  });

  const totalSpeed = baseSpeed + bonusSpeed;
  return {
    speed: totalSpeed,
    formula: parts.length > 1 ? `${parts.join(" + ")} = ${totalSpeed} m` : parts[0]
  };
}

function calculateSavingThrows(char) {
  const scores = calculateFinalAbilityScores(char);
  const classes = getCharacterClasses(char);
  const totalLevel = classes.reduce((sum, c) => sum + c.level, 0) || (char.level || 1);
  const pb = getProficiencyBonus(totalLevel);
  // Regla D&D 5.5: Las competencias en tiradas de salvación provienen EXCLUSIVAMENTE de la clase inicial (nivel 1).
  // Ninguna clase secundaria de multiclase otorga competencias en tiradas de salvación.
  const primaryClass = classes[0];
  const primaryClassId = primaryClass?.classId || char.classId;
  const classDef = DND55_CLASSES.find((c) => c.id === primaryClassId);
  const classSaves = classDef?.savingThrows || [];
  const result = {};
  let saveBonus = 0;
  const saveBonusDetails = [];

  const paladinLvl = getClassLevel(char, "paladin");
  if (paladinLvl >= 6) {
    const auraBonus = Math.max(1, getAbilityModifier(scores.cha));
    saveBonus += auraBonus;
    saveBonusDetails.push(`+${auraBonus} por Aura de Protección (Paladín Nv ${paladinLvl})`);
  }
  const activeMods = getActiveStatModifiers(char);
  activeMods.forEach((m) => {
    if (m.target === "savingThrows" && m.mode === "bonus") {
      saveBonus += m.value;
      saveBonusDetails.push(`+${m.value} por ${m.sourceName || 'Objeto Mágico'}`);
    }
  });

  const monkLvl = getClassLevel(char, "monje");
  const rogueLvl = getClassLevel(char, "picaro");
  const fighterLvl = getClassLevel(char, "guerrero");

  Object.keys(scores).forEach((ability) => {
    let isProf = classSaves.includes(ability);
    let profSource = `Clase Inicial (${classDef?.name || 'Clase'})`;
    if (characterHasFeat(char, `resilient_${ability}`) || characterHasFeat(char, `resiliente_${ability}`)) {
      isProf = true;
      profSource = 'Dote Resiliente';
    }
    if (monkLvl >= 14) {
      isProf = true;
      profSource = 'Disciplina Superior (Monje 14)';
    }
    if (rogueLvl >= 15 && (ability === "wis" || ability === "cha")) {
      isProf = true;
      profSource = 'Mente Escurridiza (Pícaro 15)';
    }
    if (fighterLvl >= 7 && (primaryClass?.subclassId === "samurai" || char.subclassId === "samurai") && ability === "wis") {
      isProf = true;
      profSource = 'Cortesano Elegante (Samurái 7)';
    }
    const mod = getAbilityModifier(scores[ability]);
    const totalSave = mod + (isProf ? pb : 0) + saveBonus;
    
    const parts = [`Mod. ${getAbilityFullName(ability)} (${formatModifier(mod)})`];
    if (isProf) {
      parts.push(`+${pb} por Competencia (${profSource})`);
    }
    if (saveBonusDetails.length > 0) {
      parts.push(...saveBonusDetails);
    }
    const formula = `${parts.join(' ')} = ${formatModifier(totalSave)}`;

    result[ability] = {
      value: totalSave,
      bonus: totalSave,
      isProficient: isProf,
      source: isProf ? profSource : null,
      formula
    };
  });
  return result;
}

function getMaxAllowedExpertiseCount(char) {
  if (!char) return 0;
  let count = 0;
  const rogueLvl = getClassLevel(char, "picaro");
  if (rogueLvl >= 1) count += 2;
  if (rogueLvl >= 6) count += 2;

  const bardLvl = getClassLevel(char, "bardo");
  if (bardLvl >= 2) count += 2;
  if (bardLvl >= 9) count += 2;

  const rangerLvl = getClassLevel(char, "explorador");
  if (rangerLvl >= 2) count += 1;
  if (rangerLvl >= 9) count += 2;

  if (characterHasFeat(char, "experto_habilidades") || characterHasFeat(char, "skill_expert")) {
    count += 1;
  }
  return count;
}

function calculateSkills(char) {
  const scores = calculateFinalAbilityScores(char);
  const classes = getCharacterClasses(char);
  const totalLevel = classes.reduce((sum, c) => sum + c.level, 0) || (char.level || 1);
  const pb = getProficiencyBonus(totalLevel);
  const bgDef = char.customBackground || DND55_BACKGROUNDS.find((b) => b.id === char.backgroundId);
  const bgSkills = bgDef?.skills || [];
  const classSkills = char.chosenClassSkills || [];
  const speciesSkill = char.speciesSkillChoice;
  const isElf = char.speciesId === "elfo";
  const rogueLvl = getClassLevel(char, "picaro");
  const isRogue = rogueLvl >= 1;
  const activeAsiChoices = [];
  classes.forEach((c, cIdx) => {
    getCharacterAsiLevels(c.classId).forEach(({ lvl, key }) => {
      if ((c.level || 1) >= lvl) {
        const choice = char.classAsiChoices?.[c.classId]?.[key] ||
          char[`${c.classId}_${key}`] ||
          (cIdx === 0 ? char[key] : null);
        if (choice) activeAsiChoices.push(choice);
      }
    });
  });
  const result = {};

  DND55_SKILLS.forEach((skillDef) => {
    const mod = getAbilityModifier(scores[skillDef.ability]);
    let isTrained = false;
    let sourceLabel = '';

    if (bgSkills.includes(skillDef.name)) {
      isTrained = true;
      sourceLabel = `Trasfondo (${bgDef?.name || 'Trasfondo'})`;
    } else if (classSkills.includes(skillDef.name)) {
      const clsDef = DND55_CLASSES.find(c => c.id === char.classId);
      isTrained = true;
      sourceLabel = `Clase (${clsDef?.name || 'Clase'})`;
    } else if (speciesSkill === skillDef.name) {
      const spDef = DND55_SPECIES.find(s => s.id === char.speciesId);
      isTrained = true;
      sourceLabel = `Especie (${spDef?.name || 'Especie'})`;
    } else if (isElf && skillDef.name === 'Percepción') {
      isTrained = true;
      sourceLabel = 'Linaje Feérico (Elfo)';
    }

    if (activeAsiChoices.some((c) => c.skillExpertProficiency === skillDef.name)) {
      isTrained = true;
      sourceLabel = 'Dote Experto en Habilidades';
    }

    let profLevel = isTrained ? "proficient" : "none";

    const charExpertiseList = Array.isArray(char.expertiseSkills) ? char.expertiseSkills : null;
    let hasExpertise = false;
    if (charExpertiseList !== null) {
      hasExpertise = charExpertiseList.includes(skillDef.name) && isTrained;
    } else {
      if (isRogue && isTrained && (skillDef.name === "Sigilo" || skillDef.name === "Juego de manos")) {
        hasExpertise = true;
      }
    }

    if (activeAsiChoices.some((c) => c.skillExpertExpertise === skillDef.name)) {
      hasExpertise = true;
      sourceLabel = 'Dote Experto en Habilidades';
    }

    if (hasExpertise) {
      profLevel = "expertise";
      if (!sourceLabel || !sourceLabel.includes('Dote')) {
        sourceLabel = isRogue ? 'Pericia de Pícaro' : (getClassLevel(char, 'bardo') >= 2 ? 'Pericia de Bardo' : (getClassLevel(char, 'explorador') >= 2 ? 'Explorador Hábil' : 'Pericia'));
      }
    }

    let bonus = mod;
    const parts = [`Mod. ${getAbilityFullName(skillDef.ability)} (${formatModifier(mod)})`];

    if (profLevel === "proficient") {
      bonus += pb;
      parts.push(`+${pb} por Competencia [${sourceLabel}]`);
    } else if (profLevel === "expertise") {
      bonus += pb * 2;
      parts.push(`+${pb * 2} por Pericia [2x BC +${pb}] [${sourceLabel}]`);
    } else {
      parts.push('(Sin entrenamiento)');
    }

    // Rasgos de clase que modifican habilidades
    // 1) Clérigo - Orden Divina: Taumaturgo (suma mod. SAB, mín +1, a Religión y Arcanos)
    const clericLvl = getClassLevel(char, "clerigo");
    const isThaumaturge = clericLvl >= 1 && (
      char.classFeatureChoices?.orden_divina === "taumaturgo" ||
      char.clericDivineOrder === "taumaturgo" ||
      char.clericOrder === "taumaturgo"
    );
    if (isThaumaturge && (skillDef.name === "Religión" || skillDef.name === "Arcanos")) {
      const wisMod = Math.max(1, getAbilityModifier(scores.wis));
      bonus += wisMod;
      parts.push(`+${wisMod} por Orden Divina (Taumaturgo)`);
    }

    // 2) Druida - Orden Primigenia: Naturalista (suma mod. SAB, mín +1, a Naturaleza y Arcanos)
    const druidLvl = getClassLevel(char, "druida");
    const isNaturalist = druidLvl >= 1 && (
      char.classFeatureChoices?.orden_primigenia === "naturalista" ||
      char.druidOrder === "naturalista"
    );
    if (isNaturalist && (skillDef.name === "Naturaleza" || skillDef.name === "Arcanos")) {
      const wisMod = Math.max(1, getAbilityModifier(scores.wis));
      bonus += wisMod;
      parts.push(`+${wisMod} por Orden Primigenia (Naturalista)`);
    }

    // 3) Bardo - Aprendiz de Mucho (Jack of all Trades, nivel 2+) a habilidades sin entrenamiento
    const bardLvl = getClassLevel(char, "bardo");
    if (bardLvl >= 2 && profLevel === "none") {
      const jackBonus = Math.floor(pb / 2);
      if (jackBonus > 0) {
        bonus += jackBonus;
        parts.push(`+${jackBonus} por Aprendiz de Mucho (½ BC)`);
      }
    }

    const formula = `${parts.join(' ')} = ${formatModifier(bonus)}`;

    result[skillDef.name] = {
      value: bonus,
      bonus: bonus,
      level: profLevel,
      proficiency: profLevel,
      ability: skillDef.ability,
      abilityKey: skillDef.ability,
      formula
    };
  });
  return result;
}

function calculatePassivePerception(char) {
  const skills = calculateSkills(char);
  const perceptionBonus = skills["Percepción"]?.value || 0;
  const obsBonus = (characterHasFeat(char, "observant") || characterHasFeat(char, "observador")) ? 5 : 0;
  return 10 + perceptionBonus + obsBonus;
}

function calculatePassivePerceptionDetails(char) {
  const skills = calculateSkills(char);
  const sk = skills["Percepción"];
  const bonus = sk?.value || 0;
  const hasObs = characterHasFeat(char, "observant") || characterHasFeat(char, "observador");
  const obsBonus = hasObs ? 5 : 0;
  const val = 10 + bonus + obsBonus;
  return {
    value: val,
    formula: `10 base fija + ${sk?.formula || formatModifier(bonus)}${hasObs ? ' + 5 por Dote Observador' : ''} = ${val} Percepción Pasiva`
  };
}

function calculatePassiveInvestigation(char) {
  const skills = calculateSkills(char);
  const bonus = skills["Investigación"]?.value || 0;
  const obsBonus = (characterHasFeat(char, "observant") || characterHasFeat(char, "observador")) ? 5 : 0;
  return 10 + bonus + obsBonus;
}

function calculatePassiveInvestigationDetails(char) {
  const skills = calculateSkills(char);
  const sk = skills["Investigación"];
  const bonus = sk?.value || 0;
  const hasObs = characterHasFeat(char, "observant") || characterHasFeat(char, "observador");
  const obsBonus = hasObs ? 5 : 0;
  const val = 10 + bonus + obsBonus;
  return {
    value: val,
    formula: `10 base fija + ${sk?.formula || formatModifier(bonus)}${hasObs ? ' + 5 por Dote Observador' : ''} = ${val} Investigación Pasiva`
  };
}

function calculatePassiveInsight(char) {
  const skills = calculateSkills(char);
  const bonus = skills["Perspicacia"]?.value || 0;
  return 10 + bonus;
}

function calculatePassiveInsightDetails(char) {
  const skills = calculateSkills(char);
  const sk = skills["Perspicacia"];
  const bonus = sk?.value || 0;
  const val = 10 + bonus;
  return {
    value: val,
    formula: `10 base fija + ${sk?.formula || formatModifier(bonus)} = ${val} Perspicacia Pasiva`
  };
}

function getCharacterVisionSense(char) {
  if (!char) return 'Visión Normal';
  if (char.sublineageId === 'drow') {
    return 'Visión en la Oscuridad (36 m)';
  }
  const speciesDef = DND55_SPECIES.find(s => s.id === char.speciesId);
  if (speciesDef && Array.isArray(speciesDef.traits)) {
    const dv = speciesDef.traits.find(t => t.name.toLowerCase().includes('oscuridad'));
    if (dv) return dv.name;
  }
  if (Array.isArray(char.specialAbilities)) {
    const senseTrait = char.specialAbilities.find(sa => sa.isActive !== false && /oscuridad|ciega|verdadera|vibraci/i.test(sa.name));
    if (senseTrait) return senseTrait.name;
  }
  return 'Visión Normal';
}

function getInnateSpellsForCharacter(character) {
  if (!character) return [];
  const charLevel = Number(character.level) || 1;
  const list = [];

  const addSpell = (spellIdOrName, source, defaultProps = {}) => {
    const raw = String(spellIdOrName).toLowerCase().trim();
    const canon = DND55_CANONICAL_SPELLS.find(c =>
      c.id === raw ||
      c.name.toLowerCase() === raw ||
      (c.aliases && c.aliases.some(a => a.toLowerCase() === raw))
    );
    const spObj = canon ? { ...canon, ...defaultProps, source, isInnate: true, isPrepared: true } : {
      id: raw.replace(/\s+/g, '_'),
      name: spellIdOrName,
      level: 0,
      school: 'Transmutación',
      castingTime: '1 acción',
      range: 'Toque',
      components: 'V, S',
      duration: 'Instantáneo',
      description: `Conjuro concedido por ${source}.`,
      ...defaultProps,
      source,
      isInnate: true,
      isPrepared: true
    };
    if (!list.some(s => s.name.toLowerCase() === spObj.name.toLowerCase())) {
      list.push(spObj);
    }
  };

  // --- 1. CONJUROS POR ESPECIE (D&D 5.5 PHB 2024) ---
  const spId = character.speciesId;
  const sublineage = character.sublineageId;

  // Aasimar: Nv 1 Truco Luz
  if (spId === 'aasimar') {
    addSpell('luz', 'Especie: Aasimar (Portador de Luz)');
  }

  // Tiflin: Taumaturgia + Legado Planar
  if (spId === 'tiefling') {
    addSpell('taumaturgia', 'Especie: Tiflin (Presencia del Otro Mundo)');
    if (sublineage === 'tiflin_abisal') {
      addSpell('rociada_venenosa', 'Especie: Tiflin (Legado Abisal)');
      if (charLevel >= 3) addSpell('rayo_enfermedad', 'Especie: Tiflin (Legado Abisal)');
      if (charLevel >= 5) addSpell('inmovilizar_persona', 'Especie: Tiflin (Legado Abisal)');
    } else if (sublineage === 'tiflin_ctonico') {
      addSpell('toque_helado', 'Especie: Tiflin (Legado Ctónico)');
      if (charLevel >= 3) addSpell('vida_falsa', 'Especie: Tiflin (Legado Ctónico)');
      if (charLevel >= 5) addSpell('rayo_debilitamiento', 'Especie: Tiflin (Legado Ctónico)');
    } else {
      // tiflin_infernal por defecto o explícito
      addSpell('descarga_fuego', 'Especie: Tiflin (Legado Infernal)');
      if (charLevel >= 3) addSpell('reprension_infernal', 'Especie: Tiflin (Legado Infernal)');
      if (charLevel >= 5) addSpell('oscuridad', 'Especie: Tiflin (Legado Infernal)');
    }
  }

  // Elfo: Linaje Élfico
  if (spId === 'elfo') {
    if (sublineage === 'alto_elfo' || (!sublineage && !['elfo_bosques', 'drow'].includes(sublineage))) {
      const cantrip = character.speciesCantripChoice || 'prestidigitacion';
      addSpell(cantrip, 'Especie: Alto Elfo (Linaje Élfico)');
      if (charLevel >= 3) addSpell('deteccion_magia', 'Especie: Alto Elfo (Linaje Élfico)');
      if (charLevel >= 5) addSpell('paso_brumoso', 'Especie: Alto Elfo (Linaje Élfico)');
    } else if (sublineage === 'elfo_bosques') {
      addSpell('druidismo', 'Especie: Elfo de los Bosques (Linaje Élfico)');
      if (charLevel >= 3) addSpell('zancada_prodigiosa', 'Especie: Elfo de los Bosques (Linaje Élfico)');
      if (charLevel >= 5) addSpell('pasar_sin_rastro', 'Especie: Elfo de los Bosques (Linaje Élfico)');
    } else if (sublineage === 'drow') {
      addSpell('luces_danzantes', 'Especie: Drow (Linaje Élfico)');
      if (charLevel >= 3) addSpell('fuego_feerico', 'Especie: Drow (Linaje Élfico)');
      if (charLevel >= 5) addSpell('oscuridad', 'Especie: Drow (Linaje Élfico)');
    }
  }

  // Gnomo
  if (spId === 'gnomo') {
    if (sublineage === 'gnomo_bosque' || (!sublineage && sublineage !== 'gnomo_roca')) {
      addSpell('ilusion_menor', 'Especie: Gnomo del Bosque');
      addSpell('hablar_con_animales', 'Especie: Gnomo del Bosque');
    } else if (sublineage === 'gnomo_roca') {
      addSpell('reparar', 'Especie: Gnomo de la Roca');
      addSpell('prestidigitacion', 'Especie: Gnomo de la Roca');
    }
  }

  // --- 2. CONJUROS POR TRASFONDO Y DOTES DE ORIGEN (D&D 5.5 PHB 2024) ---
  const bgDef = DND55_BACKGROUNDS.find(b => b.id === character.backgroundId);
  const bgFeat = character.originFeat || character.customBackground?.originFeat || bgDef?.originFeat || '';
  const humFeat = character.speciesId === 'humano' ? (character.speciesOriginFeat || '') : '';
  const allFeatQueries = [bgFeat, humFeat].filter(Boolean).map(f => f.toLowerCase());

  if (allFeatQueries.some(f => f.includes('iniciado en magia (clérigo)') || f.includes('iniciado en magia (clerigo)') || f.includes('iniciado_magia_clerigo'))) {
    addSpell('llama_sagrada', 'Trasfondo: Iniciado en Magia (Clérigo)');
    addSpell('piedad_moribundos', 'Trasfondo: Iniciado en Magia (Clérigo)');
    addSpell('curar_heridas', 'Trasfondo: Iniciado en Magia (Clérigo)');
  }
  if (allFeatQueries.some(f => f.includes('iniciado en magia (druida)') || f.includes('iniciado_magia_druida'))) {
    addSpell('guia', 'Trasfondo: Iniciado en Magia (Druida)');
    addSpell('druidismo', 'Trasfondo: Iniciado en Magia (Druida)');
    addSpell('enredo', 'Trasfondo: Iniciado en Magia (Druida)');
  }
  if (allFeatQueries.some(f => f.includes('iniciado en magia (mago)') || f.includes('iniciado_magia_mago'))) {
    addSpell('descarga_fuego', 'Trasfondo: Iniciado en Magia (Mago)');
    addSpell('mano_mago', 'Trasfondo: Iniciado en Magia (Mago)');
    addSpell('escudo', 'Trasfondo: Iniciado en Magia (Mago)');
  }

  // Dotes generales de conjuros (PHB 2024)
  if (characterHasFeat(character, 'tocado_hadas') || characterHasFeat(character, 'fey_touched') || characterHasFeat(character, 'tocado por las hadas')) {
    addSpell('paso_brumoso', 'Dote: Tocado por las Hadas');
    addSpell('hechizar_persona', 'Dote: Tocado por las Hadas');
  }
  if (characterHasFeat(character, 'tocado_sombras') || characterHasFeat(character, 'shadow_touched') || characterHasFeat(character, 'tocado por las sombras')) {
    addSpell('invisibilidad', 'Dote: Tocado por las Sombras');
    addSpell('vida_falsa', 'Dote: Tocado por las Sombras');
  }

  // --- 3. CONJUROS POR SUBCLASE Y RASGOS DE CLASE (D&D 5.5 / 5e) ---
  const charClasses = getCharacterClasses(character);
  charClasses.forEach(c => {
    const lvl = c.level || 1;
    const sub = (c.subclassId || '').toLowerCase().trim();

    // MONJE
    if (c.classId === 'monje') {
      if (lvl >= 3 && (sub === 'guerrero_elementos' || sub === 'elementos')) {
        addSpell('elementalismo', 'Monje: Guerrero de los Elementos (Manipular los Elementos)', { ability: 'wis' });
      }
      if (lvl >= 3 && sub === 'dragon_ascendente') {
        addSpell('taumaturgia', 'Monje: Dragón Ascendente', { ability: 'wis' });
      }
      if (lvl >= 3 && sub === 'sombra') {
        addSpell('oscuridad', 'Monje: Camino de la Sombra', { ability: 'wis' });
      }
    }

    // GUERRERO
    if (c.classId === 'guerrero') {
      if (lvl >= 3 && sub === 'arquero_arcano') {
        addSpell('prestidigitacion', 'Guerrero: Arquero Arcano', { ability: 'int' });
      }
    }

    // PÍCARO
    if (c.classId === 'picaro') {
      if (lvl >= 3 && sub === 'embaucador_arcano') {
        addSpell('mano_mago', 'Pícaro: Embaucador Arcano (Mano de Mago del Embaucador)', { ability: 'int' });
      }
    }

    // CLÉRIGO
    if (c.classId === 'clerigo') {
      if (lvl >= 1 && (sub === 'luz' || sub === 'dominio_luz')) {
        addSpell('luz', 'Clérigo: Dominio de la Luz', { ability: 'wis' });
      }
    }

    // DRUIDA
    if (c.classId === 'druida') {
      if (lvl >= 2 && sub === 'estrellas') {
        addSpell('guia', 'Druida: Círculo de las Estrellas', { ability: 'wis' });
        addSpell('proyectil_magico', 'Druida: Círculo de las Estrellas (Mapa Estelar)', { ability: 'wis' });
      }
      if (lvl >= 2 && sub === 'esporas') {
        addSpell('toque_helado', 'Druida: Círculo de las Esporas', { ability: 'wis' });
      }
      if (lvl >= 2 && sub === 'fuego_salvaje') {
        addSpell('producir_llama', 'Druida: Círculo del Fuego Salvaje', { ability: 'wis' });
      }
    }

    // EXPLORADOR
    if (c.classId === 'explorador') {
      if (lvl >= 3 && sub === 'rondador_enjambre') {
        addSpell('mano_mago', 'Explorador: Rondador del Enjambre', { ability: 'wis' });
      }
      if (lvl >= 3 && sub === 'guardian_feerico') {
        addSpell('druidismo', 'Explorador: Guardián Feérico', { ability: 'wis' });
      }
    }

    // BARDO
    if (c.classId === 'bardo') {
      if (lvl >= 3 && (sub === 'bardo_luna' || sub === 'colegio_luna')) {
        addSpell('luces_danzantes', 'Bardo: Colegio de la Luna', { ability: 'cha' });
        addSpell('rayo_luna', 'Bardo: Colegio de la Luna', { ability: 'cha' });
      }
    }
  });

  return list;
}

function calculateSpellcasting(char) {
  const charClasses = getCharacterClasses(char);
  const spellcasterClasses = [];
  const scores = calculateFinalAbilityScores(char);
  const totalLevel = charClasses.reduce((sum, c) => sum + c.level, 0) || (char.level || 1);
  const pb = getProficiencyBonus(totalLevel);
  let dcBonus = 0;
  let attackBonus = 0;
  const activeMods = getActiveStatModifiers(char);
  activeMods.forEach((m) => {
    if (m.target === "spellDc" && m.mode === "bonus") dcBonus += m.value;
    if (m.target === "spellAttack" && m.mode === "bonus") attackBonus += m.value;
  });

  charClasses.forEach(c => {
    const classDef = DND55_CLASSES.find((cd) => cd.id === c.classId);
    let abilityKey = classDef?.spellcastingAbility;
    if (!abilityKey) {
      if (c.classId === 'guerrero' && (c.subclassId === 'caballero_sobrenatural' || c.subclassId === 'caballero_arcano' || c.subclassId === 'arquero_arcano')) {
        abilityKey = 'int';
      } else if (c.classId === 'picaro' && c.subclassId === 'embaucador_arcano') {
        abilityKey = 'int';
      } else if (c.classId === 'monje' && (c.subclassId === 'guerrero_elementos' || c.subclassId === 'elementos' || c.subclassId === 'dragon_ascendente' || c.subclassId === 'sombra')) {
        abilityKey = 'wis';
      }
    }
    if (abilityKey) {
      const mod = getAbilityModifier(scores[abilityKey]);
      const abName = ABILITY_LABELS[abilityKey]?.name || 'Inteligencia';
      const abShort = getAbilityShortName(abilityKey);
      const dcFormula = `8 base fija + ${pb} (BC) + ${mod} (Mod. ${abName} [${abShort}])${dcBonus ? ` + ${dcBonus} (Magia/Rasgos)` : ''} = CD ${8 + pb + mod + dcBonus}`;
      const attackBonusFormula = `+${pb} (BC) + ${mod} (Mod. ${abName} [${abShort}])${attackBonus ? ` + ${attackBonus} (Magia/Rasgos)` : ''} = ${formatModifier(pb + mod + attackBonus)} al Ataque de Conjuros`;
      spellcasterClasses.push({
        classId: c.classId,
        className: classDef?.name || c.classId,
        level: c.level,
        abilityName: abName,
        abilityKey,
        abilityModifier: mod,
        shortName: abShort,
        spellSaveDc: 8 + pb + mod + dcBonus,
        spellAttackBonus: pb + mod + attackBonus,
        dcFormula,
        attackBonusFormula
      });
    }
  });

  if (spellcasterClasses.length === 0) {
    const innateSpells = getInnateSpellsForCharacter(char);
    const hasAnySpells = innateSpells.length > 0 || (Array.isArray(char.spells) && char.spells.length > 0);
    if (!hasAnySpells) return null;

    // D&D 5.5: Para conjuros innatos (especie / trasfondo / dotes de origen) sin clase mágica,
    // la característica es Int, Sab o Car (la más alta o char.spellcastingAbility)
    const mentalAbilities = ['int', 'wis', 'cha'];
    let chosenAbility = char.spellcastingAbility || char.innateSpellcastingAbility;
    if (!chosenAbility || !mentalAbilities.includes(chosenAbility)) {
      chosenAbility = mentalAbilities.reduce((best, ab) => {
        return (scores[ab] > scores[best]) ? ab : best;
      }, 'int');
    }
    const mod = getAbilityModifier(scores[chosenAbility]);
    const abName = ABILITY_LABELS[chosenAbility]?.name || 'Inteligencia';
    const abShort = getAbilityShortName(chosenAbility);
    const dcFormula = `8 base fija + ${pb} (BC) + ${mod} (Mod. ${abName} [${abShort}])${dcBonus ? ` + ${dcBonus} (Magia/Rasgos)` : ''} = CD ${8 + pb + mod + dcBonus}`;
    const attackBonusFormula = `+${pb} (BC) + ${mod} (Mod. ${abName} [${abShort}])${attackBonus ? ` + ${attackBonus} (Magia/Rasgos)` : ''} = ${formatModifier(pb + mod + attackBonus)} al Ataque de Conjuros`;

    const innateProfile = {
      classId: 'innata',
      className: 'Magia Innata (Especie / Trasfondo)',
      level: totalLevel,
      abilityName: abName,
      abilityKey: chosenAbility,
      abilityModifier: mod,
      shortName: abShort,
      spellSaveDc: 8 + pb + mod + dcBonus,
      spellAttackBonus: pb + mod + attackBonus,
      dcFormula,
      attackBonusFormula
    };

    return {
      ...innateProfile,
      classes: [innateProfile],
      isMulticlass: false,
      isInnate: true,
      summary: `Magia Innata (${abShort}): CD ${innateProfile.spellSaveDc} / ${formatModifier(innateProfile.spellAttackBonus)}`
    };
  }

  const primary = spellcasterClasses[0];
  return {
    ...primary,
    classes: spellcasterClasses,
    isMulticlass: spellcasterClasses.length > 1,
    summary: spellcasterClasses.map(sc => `${sc.className} (${sc.shortName}): CD ${sc.spellSaveDc} / ${formatModifier(sc.spellAttackBonus)}`).join(' | ')
  };
}

function getCharacterSpellSlots(character, spellSlotsState) {
  if (spellSlotsState && Object.keys(spellSlotsState).length > 0) {
    const res = [];
    for (let l = 1; l <= 9; l++) {
      if (spellSlotsState[l] && spellSlotsState[l].max > 0) {
        res.push({
          level: l,
          max: spellSlotsState[l].max,
          used: spellSlotsState[l].used || 0
        });
      }
    }
    if (res.length > 0) return res;
  }

  const charClasses = getCharacterClasses(character);
  const fullTable = {
    1: [2],
    2: [3],
    3: [4, 2],
    4: [4, 3],
    5: [4, 3, 2],
    6: [4, 3, 3],
    7: [4, 3, 3, 1],
    8: [4, 3, 3, 2],
    9: [4, 3, 3, 3, 1],
    10: [4, 3, 3, 3, 2],
    11: [4, 3, 3, 3, 2, 1],
    12: [4, 3, 3, 3, 2, 1],
    13: [4, 3, 3, 3, 2, 1, 1],
    14: [4, 3, 3, 3, 2, 1, 1],
    15: [4, 3, 3, 3, 2, 1, 1, 1],
    16: [4, 3, 3, 3, 2, 1, 1, 1],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
  };

  if (charClasses.length <= 1) {
    const primary = charClasses[0];
    const classDef = DND55_CLASSES.find((c) => c.id === primary?.classId || c.id === character.classId);
    const casterType = classDef?.spellcasterType;
    const level = primary?.level || character.level || 1;
    if (!casterType) return [];
    if (casterType === "pact") {
      const slotLevel = level >= 9 ? 5 : level >= 7 ? 4 : level >= 5 ? 3 : level >= 3 ? 2 : 1;
      const count = level >= 17 ? 4 : level >= 11 ? 3 : level >= 2 ? 2 : 1;
      return [{
        level: slotLevel,
        max: count,
        used: spellSlotsState?.[slotLevel]?.used || 0
      }];
    }
    if (casterType === "half") {
      const table = {
        1: [2], 2: [2], 3: [3], 4: [3], 5: [4, 2], 6: [4, 2], 7: [4, 3], 8: [4, 3],
        9: [4, 3, 2], 10: [4, 3, 2], 11: [4, 3, 3], 12: [4, 3, 3], 13: [4, 3, 3, 1],
        14: [4, 3, 3, 1], 15: [4, 3, 3, 2], 16: [4, 3, 3, 2], 17: [4, 3, 3, 3, 1],
        18: [4, 3, 3, 3, 1], 19: [4, 3, 3, 3, 2], 20: [4, 3, 3, 3, 2]
      };
      const row = table[level] || [];
      const slots = [];
      row.forEach((max, idx) => {
        if (max > 0) slots.push({ level: idx + 1, max, used: spellSlotsState?.[idx + 1]?.used || 0 });
      });
      return slots;
    }
    if (casterType === "full") {
      const row = fullTable[level] || [];
      const slots = [];
      row.forEach((max, idx) => {
        if (max > 0) slots.push({ level: idx + 1, max, used: spellSlotsState?.[idx + 1]?.used || 0 });
      });
      return slots;
    }
    return [];
  }

  let combinedLevel = 0;
  let hasPactMagic = false;
  let pactLevel = 0;

  charClasses.forEach(c => {
    const cid = c.classId;
    const lvl = c.level;
    const sc = c.subclassId;
    if (['mago', 'clerigo', 'druida', 'bardo', 'hechicero'].includes(cid)) {
      combinedLevel += lvl;
    } else if (['paladin', 'explorador'].includes(cid)) {
      combinedLevel += Math.ceil(lvl / 2);
    } else if (cid === 'guerrero' && (sc === 'caballero_sobrenatural' || sc === 'caballero_arcano')) {
      combinedLevel += Math.floor(lvl / 3);
    } else if (cid === 'picaro' && sc === 'embaucador_arcano') {
      combinedLevel += Math.floor(lvl / 3);
    } else if (cid === 'brujo') {
      hasPactMagic = true;
      pactLevel = lvl;
    }
  });

  const slotsMap = {};
  if (combinedLevel > 0) {
    const effLvl = Math.max(1, Math.min(20, combinedLevel));
    const row = fullTable[effLvl] || [];
    row.forEach((max, idx) => {
      if (max > 0) {
        const slotLvl = idx + 1;
        slotsMap[slotLvl] = (slotsMap[slotLvl] || 0) + max;
      }
    });
  }

  if (hasPactMagic && pactLevel > 0) {
    const pactSlotLvl = pactLevel >= 9 ? 5 : pactLevel >= 7 ? 4 : pactLevel >= 5 ? 3 : pactLevel >= 3 ? 2 : 1;
    const pactCount = pactLevel >= 17 ? 4 : pactLevel >= 11 ? 3 : pactLevel >= 2 ? 2 : 1;
    slotsMap[pactSlotLvl] = (slotsMap[pactSlotLvl] || 0) + pactCount;
  }

  const res = [];
  for (let l = 1; l <= 9; l++) {
    if (slotsMap[l] && slotsMap[l] > 0) {
      res.push({
        level: l,
        max: slotsMap[l],
        used: spellSlotsState?.[l]?.used || 0
      });
    }
  }
  return res;
}

function calculateMonkSaveDc(char) {
  if (!char) return null;
  const monkLvl = getClassLevel(char, "monje");
  if (monkLvl <= 0 && char.classId !== 'monje') {
    return null;
  }
  const scores = calculateFinalAbilityScores(char);
  const classes = getCharacterClasses(char);
  const totalLevel = classes.reduce((sum, c) => sum + c.level, 0) || (char.level || 1);
  const pb = getProficiencyBonus(totalLevel);
  const wisMod = getAbilityModifier(scores?.wis ?? 10);
  let dcBonus = 0;
  const bonusSources = [];
  const activeMods = getActiveStatModifiers(char);
  activeMods.forEach((m) => {
    if ((m.target === "monkDc" || m.target === "monkSaveDc") && (m.mode === "bonus" || m.mode === "add" || !m.mode)) {
      dcBonus += (Number(m.value) || 0);
      bonusSources.push(`${m.value} (${m.sourceName || "Cinturón/Objeto"})`);
    }
  });
  const dc = 8 + pb + wisMod + dcBonus;
  const formulaParts = [`8 base fija`, `${pb} (BC)`, `${wisMod} (Mod. Sabiduría [SAB])`];
  if (bonusSources.length > 0) {
    formulaParts.push(...bonusSources);
  }
  const formula = `${formulaParts.join(' + ')} = CD ${dc}`;
  return {
    dc,
    bonus: dcBonus,
    wisMod,
    pb,
    formula,
    summary: `CD ${dc} (Salvación de Concentración del Monje)`
  };
}
function calculateCarryingCapacity(char) {
  const scores = calculateFinalAbilityScores(char);
  const str = scores.str || 10;
  let multiplier = 1;
  if (char.speciesId === "goliat") {
    multiplier = 2;
  }
  const carryingCapacityKg = Math.round(str * 7.5 * multiplier * 10) / 10;
  const pushDragLiftKg = Math.round(str * 15 * multiplier * 10) / 10;
  let itemsWeightKg = 0;
  if (char.inventory && Array.isArray(char.inventory)) {
    char.inventory.forEach((item) => {
      const w = item.weight || 0;
      const q = item.quantity || 1;
      itemsWeightKg += w * q;
    });
  }
  itemsWeightKg = Math.round(itemsWeightKg * 10) / 10;

  // Peso de las monedas según reglas oficiales D&D 5.5: 50 monedas = 1 lb ≈ 0,5 kg (1 moneda = 0,01 kg / 10 gramos)
  const curr = char.currency || {};
  const cp = Number(curr.cp) || 0;
  const sp = Number(curr.sp) || 0;
  const ep = Number(curr.ep) || 0;
  const gp = Number(curr.gp) || 0;
  const pp = Number(curr.pp) || 0;
  const totalCoins = cp + sp + ep + gp + pp;
  const coinsWeightKg = Math.round(totalCoins * 0.01 * 100) / 100;
  const totalWeightKg = Math.round((itemsWeightKg + coinsWeightKg) * 10) / 10;

  const formula = `${str} (Fuerza) × 7,5 kg${multiplier > 1 ? ` × ${multiplier} (Constitución Poderosa Goliat)` : ''} = ${carryingCapacityKg} kg Máx. | Carga actual: ${itemsWeightKg} kg (equipo) + ${coinsWeightKg} kg (monedas: ${totalCoins} a 10 g c/u) = ${totalWeightKg} kg (Empuje/Arrastre: ${pushDragLiftKg} kg)`;
  return {
    carryingCapacityKg,
    pushDragLiftKg,
    itemsWeightKg,
    coinsWeightKg,
    totalCoins,
    totalWeightKg,
    isEncumbered: totalWeightKg > carryingCapacityKg,
    formula
  };
}
function getFeatById(featId) {
  if (!featId)
    return void 0;
  const raw = String(featId).trim();
  const normalized = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const slug = normalized.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

  const list = [...DND55_GENERAL_FEATS, ...DND55_ORIGIN_FEATS];
  
  // 1. Coincidencia directa por id o por nombre exacto (case-insensitive)
  let found = list.find(f => f.id === featId || f.id.toLowerCase() === raw.toLowerCase() || f.name.toLowerCase() === raw.toLowerCase());
  if (found) return found;

  // 2. Coincidencia sin tildes ni mayúsculas
  found = list.find(f => {
    const fNameNorm = f.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const fIdNorm = f.id.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return fNameNorm === normalized || fIdNorm === normalized || f.id === slug;
  });
  if (found) return found;

  // 3. Aliases habituales en hojas o semillas
  if (slug.includes('iniciado') && slug.includes('mago')) {
    return list.find(f => f.id === 'iniciado_magia_mago');
  }
  if (slug.includes('iniciado') && slug.includes('clerigo')) {
    return list.find(f => f.id === 'iniciado_magia_clerigo');
  }
  if (slug.includes('iniciado') && slug.includes('druida')) {
    return list.find(f => f.id === 'iniciado_magia_druida');
  }
  if (slug.includes('habil') || slug.includes('habilidoso')) {
    return list.find(f => f.id === 'habil');
  }
  if (slug.includes('artesano') || slug.includes('fabricante') || slug.includes('crafter')) {
    return list.find(f => f.id === 'artesano');
  }
  if (slug.includes('apresador') || slug.includes('grappler') || slug.includes('peleador_de_presas') || slug.includes('peleador')) {
    return list.find(f => f.id === 'grappler');
  }
  if (slug.includes('lanzador_preciso') || slug.includes('spell_sniper') || slug.includes('artillero_magico') || slug.includes('francotirador')) {
    return list.find(f => f.id === 'spell_sniper');
  }
  if (slug.includes('alerta') || slug.includes('alert')) {
    return list.find(f => f.id === 'alerta');
  }
  if (slug.includes('duro') || slug.includes('tough')) {
    return list.find(f => f.id === 'duro');
  }
  if (slug.includes('experto') && slug.includes('habilidad')) {
    return list.find(f => f.id === 'experto_habilidades');
  }
  if (slug.includes('atacante') && slug.includes('salvaje')) {
    return list.find(f => f.id === 'atacante_salvaje');
  }
  if (slug === 'gwm' || (slug.includes('maestro') && slug.includes('pesadas')) || (slug.includes('gran') && slug.includes('maestro') && slug.includes('armas'))) {
    return list.find(f => f.id === 'gwm');
  }

  return void 0;
}
function getFeatName(featId) {
  if (!featId)
    return "";
  const feat = getFeatById(featId);
  if (feat)
    return feat.name;
  const knownMap = {
    experto_habilidades: "Experto en Habilidades",
    gwm: "Maestro en armas pesadas",
    sharpshooter: "Tirador Certero",
    war_caster: "Lanzador de Guerra",
    sentinel: "Centinela",
    polearm_master: "Maestro en Armas de Asta",
    shield_master: "Maestro en Escudos",
    heavy_armor_master: "Maestro en Armaduras Pesadas",
    dual_wielder: "Combatiente con Dos Armas",
    crossbow_expert: "Experto en Ballestas",
    mage_slayer: "Asesino de Magos",
    defensive_duelist: "Duelista Defensivo",
    charger: "Cargador",
    grappler: "Apresador",
    spell_sniper: "Lanzador preciso",
    athlete: "Atleta",
    actor: "Actor",
    observant: "Observador",
    mounted_combatant: "Combatiente Montado",
    poisoner: "Envenenador",
    resilient_con: "Resiliente (Constituci\xF3n)",
    resilient_wis: "Resiliente (Sabidur\xEDa)",
    resilient_dex: "Resiliente (Destreza)",
    resilient_str: "Resiliente (Fuerza)",
    resilient_int: "Resiliente (Inteligencia)",
    resilient_cha: "Resiliente (Carisma)",
    fey_touched: "Tocado por las Hadas",
    shadow_touched: "Tocado por las Sombras",
    telekinetic: "Telequin\xE9tico",
    telepathic: "Telep\xE1tico",
    inspiring_leader: "L\xEDder Inspirador",
    speedster: "Corredor Veloz",
    crusher: "Triturador",
    piercer: "Perforador",
    slasher: "Acuchillador",
    elemental_adept: "Adepto Elemental",
    ritual_caster: "Lanzador de Rituales",
    chef: "Chef de Campa\xF1a",
    asi: "Mejora de Caracter\xEDstica",
    healer: "Sanador",
    lucky: "Afortunado",
    magic_initiate: "Iniciado en la Magia",
    musician: "M\xFAsico",
    alert: "Alerta",
    tough: "Duro de Pelar",
    skulker: "Acechador"
  };
  if (knownMap[featId]) {
    return knownMap[featId];
  }
  return featId.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Resuelve y formatea todas las dotes de un personaje con sus descripciones oficiales
 * y las elecciones específicas realizadas (características aumentadas, habilidades, pericias, conjuros, etc.).
 * @param {Object} character 
 * @returns {Array<Object>} Lista de dotes resueltas con id, name, category, categoryLabel, description, choices
 */
function getResolvedFeatsForCharacter(character) {
  if (!character) return [];
  const feats = [];

  // Helper para formatear elecciones de una dote o ASI
  const extractFeatChoices = (choiceObj, featDef) => {
    if (!choiceObj || typeof choiceObj !== 'object') return [];
    const choices = [];

    // 1. Característica aumentada (+1 en dotes generales o +2 / +1+1 en ASI)
    if (choiceObj.type === 'asi' && choiceObj.chosenAbilityScores) {
      Object.entries(choiceObj.chosenAbilityScores).forEach(([ab, val]) => {
        if (val) choices.push(`+${val} a ${getAbilityFullName(ab)} (${getAbilityShortName(ab)})`);
      });
    } else if (choiceObj.chosenAbility) {
      const val = (choiceObj.chosenAbilityBonus && choiceObj.chosenAbilityBonus[choiceObj.chosenAbility]) || 1;
      choices.push(`Característica aumentada: +${val} a ${getAbilityFullName(choiceObj.chosenAbility)} (${getAbilityShortName(choiceObj.chosenAbility)})`);
    } else if (choiceObj.chosenAbilityBonus && Object.keys(choiceObj.chosenAbilityBonus).length > 0) {
      Object.entries(choiceObj.chosenAbilityBonus).forEach(([ab, val]) => {
        if (val) choices.push(`Característica aumentada: +${val} a ${getAbilityFullName(ab)} (${getAbilityShortName(ab)})`);
      });
    } else if (featDef?.abilityBonus && Object.keys(featDef.abilityBonus).length > 0) {
      Object.entries(featDef.abilityBonus).forEach(([ab, val]) => {
        choices.push(`Característica aumentada: +${val} a ${getAbilityFullName(ab)} (${getAbilityShortName(ab)})`);
      });
    }

    // 2. Experto en Habilidades (D&D 5.5)
    if (choiceObj.skillExpertProficiency) {
      choices.push(`Competencia en habilidad: ${choiceObj.skillExpertProficiency}`);
    }
    if (choiceObj.skillExpertExpertise) {
      choices.push(`Pericia elegida (duplica BC): ${choiceObj.skillExpertExpertise}`);
    }

    // 3. Elección general de habilidades / pericias
    if (choiceObj.chosenSkill && choiceObj.chosenSkill !== choiceObj.skillExpertProficiency) {
      choices.push(`Competencia en habilidad: ${choiceObj.chosenSkill}`);
    }
    if (Array.isArray(choiceObj.chosenSkills) && choiceObj.chosenSkills.length > 0) {
      choices.push(`Competencias elegidas: ${choiceObj.chosenSkills.join(', ')}`);
    }
    if (choiceObj.chosenExpertise && choiceObj.chosenExpertise !== choiceObj.skillExpertExpertise) {
      choices.push(`Pericia elegida: ${choiceObj.chosenExpertise}`);
    }

    // 4. Salvación Resiliente (si el ID es resilient_xxx o tiene chosenSave)
    if (choiceObj.featId && choiceObj.featId.startsWith('resilient_')) {
      const saveAb = choiceObj.featId.replace('resilient_', '');
      choices.push(`Salvación entrenada: ${getAbilityFullName(saveAb)} (${getAbilityShortName(saveAb)})`);
    } else if (choiceObj.chosenSave) {
      choices.push(`Salvación entrenada: ${getAbilityFullName(choiceObj.chosenSave)} (${getAbilityShortName(choiceObj.chosenSave)})`);
    }

    // 5. Conjuros elegidos (Iniciado en magia, Tocado por las hadas, Tocado por las sombras, etc.)
    if (choiceObj.chosenSpell) {
      choices.push(`Conjuro elegido: ${choiceObj.chosenSpell}`);
    }
    if (Array.isArray(choiceObj.chosenSpells) && choiceObj.chosenSpells.length > 0) {
      choices.push(`Conjuros elegidos: ${choiceObj.chosenSpells.join(', ')}`);
    }

    // 6. Elemento elegido (Adepto Elemental)
    if (choiceObj.chosenElement) {
      choices.push(`Elemento seleccionado: ${choiceObj.chosenElement}`);
    }

    // 7. Herramientas, idiomas, armas
    if (choiceObj.chosenTool) {
      choices.push(`Herramienta elegida: ${choiceObj.chosenTool}`);
    }
    if (Array.isArray(choiceObj.chosenTools) && choiceObj.chosenTools.length > 0) {
      choices.push(`Herramientas elegidas: ${choiceObj.chosenTools.join(', ')}`);
    }
    if (choiceObj.chosenLanguage) {
      choices.push(`Idioma elegido: ${choiceObj.chosenLanguage}`);
    }
    if (choiceObj.chosenWeapon) {
      choices.push(`Arma elegida: ${choiceObj.chosenWeapon}`);
    }

    // 8. Notas o elecciones personalizadas
    if (choiceObj.customChoice) {
      choices.push(`Elección: ${choiceObj.customChoice}`);
    }

    return choices;
  };

  // 1. DOTE DE ORIGEN (Trasfondo)
  const effectiveOriginFeat = character.originFeat || character.customBackground?.originFeat;
  if (effectiveOriginFeat) {
    const featDef = getFeatById(effectiveOriginFeat);
    const originChoices = [];
    if (character.originFeatChoices) {
      if (typeof character.originFeatChoices === 'object') {
        originChoices.push(...extractFeatChoices(character.originFeatChoices, featDef));
      } else if (typeof character.originFeatChoices === 'string') {
        originChoices.push(character.originFeatChoices);
      }
    }
    if (featDef?.id === 'artesano' && character.artisanToolsChoice) {
      originChoices.push(`Herramientas: ${character.artisanToolsChoice}`);
    }
    if (featDef?.id?.startsWith('iniciado_magia') && character.magicInitiateSpells) {
      originChoices.push(`Conjuros: ${character.magicInitiateSpells.join(', ')}`);
    }

    feats.push({
      id: featDef?.id || effectiveOriginFeat,
      name: featDef?.name || getFeatName(effectiveOriginFeat) || effectiveOriginFeat,
      category: 'origin',
      categoryLabel: 'Dote de Origen (Trasfondo)',
      description: featDef?.description || 'Dote de origen otorgada por el trasfondo a nivel 1.',
      choices: originChoices,
      sourceType: 'origin',
      originKey: 'originFeatChoices',
      rawChoice: character.originFeatChoices,
      featDef: featDef,
      isEditable: Boolean(
        featDef && (
          (Array.isArray(featDef.allowedAbilities) && featDef.allowedAbilities.length > 0) ||
          featDef.id === 'artesano' ||
          featDef.id?.startsWith('iniciado_magia') ||
          featDef.id === 'experto_habilidades' ||
          featDef.id === 'habil'
        )
      )
    });
  }

  // 2. DOTE DE ESPECIE (Humano: Versátil)
  if (character.speciesId === 'humano' && character.speciesOriginFeat) {
    const featDef = getFeatById(character.speciesOriginFeat);
    const speciesChoices = [];
    if (character.speciesOriginFeatChoices) {
      if (typeof character.speciesOriginFeatChoices === 'object') {
        speciesChoices.push(...extractFeatChoices(character.speciesOriginFeatChoices, featDef));
      } else if (typeof character.speciesOriginFeatChoices === 'string') {
        speciesChoices.push(character.speciesOriginFeatChoices);
      }
    }

    feats.push({
      id: featDef?.id || character.speciesOriginFeat,
      name: featDef?.name || getFeatName(character.speciesOriginFeat) || character.speciesOriginFeat,
      category: 'origin',
      categoryLabel: 'Dote de Especie (Humano: Versátil)',
      description: featDef?.description || 'Dote de origen adicional obtenida gracias a la versatilidad de la especie humana.',
      choices: speciesChoices,
      sourceType: 'species',
      originKey: 'speciesOriginFeatChoices',
      rawChoice: character.speciesOriginFeatChoices,
      featDef: featDef,
      isEditable: Boolean(
        featDef && (
          (Array.isArray(featDef.allowedAbilities) && featDef.allowedAbilities.length > 0) ||
          featDef.id === 'artesano' ||
          featDef.id?.startsWith('iniciado_magia') ||
          featDef.id === 'experto_habilidades' ||
          featDef.id === 'habil'
        )
      )
    });
  }

  // 3. DOTES DE NIVEL / MEJORAS (Niveles estándar 4, 8, 12, 16, 19 + niveles adicionales de clase: Guerrero 6/14, Pícaro 10)
  const charClasses = getCharacterClasses(character);
  charClasses.forEach((c, cIdx) => {
    const cDef = DND55_CLASSES.find(cd => cd.id === c.classId);
    const cName = cDef?.name || c.classId;
    const levelKeys = getCharacterAsiLevels(c.classId);
    levelKeys.forEach(({ key, lvl, isClassBonus }) => {
      if ((c.level || 1) < lvl) return;
      const choice = character.classAsiChoices?.[c.classId]?.[key] ||
        character[`${c.classId}_${key}`] ||
        (cIdx === 0 ? character[key] : null);
      if (!choice) return;

      const classPrefix = charClasses.length > 1 ? `${cName} ` : '';

      if (choice.type === 'asi') {
        const asiChoices = extractFeatChoices(choice, null);
        feats.push({
          id: `asi_${c.classId}_${lvl}`,
          name: 'Mejora de Puntuación de Característica',
          category: 'asi',
          categoryLabel: `Mejora de Característica (${classPrefix}Nivel ${lvl}${isClassBonus ? ' - Adicional de Clase' : ''})`,
          description: 'Aumenta una característica en +2, o dos características diferentes en +1 (hasta un máximo de 20).',
          choices: asiChoices,
          sourceType: 'classAsi',
          classId: c.classId,
          choiceKey: key,
          lvl: lvl,
          rawChoice: choice,
          isEditable: true
        });
      } else if (choice.type === 'feat' || choice.featId) {
        const featId = choice.featId || choice.id;
        const featDef = getFeatById(featId);
        const featChoices = extractFeatChoices(choice, featDef);
        feats.push({
          id: featId,
          name: featDef?.name || getFeatName(featId) || featId,
          category: 'general',
          categoryLabel: `Dote General (${classPrefix}Nivel ${lvl}${isClassBonus ? ' - Adicional de Clase' : ''})`,
          description: featDef?.description || `Dote general obtenida a nivel ${lvl} de ${cName}.`,
          choices: featChoices,
          sourceType: 'classAsi',
          classId: c.classId,
          choiceKey: key,
          lvl: lvl,
          rawChoice: choice,
          featDef: featDef,
          isEditable: Boolean(
            (featDef && Array.isArray(featDef.allowedAbilities) && featDef.allowedAbilities.length > 0) ||
            featId === 'experto_habilidades' ||
            choice.chosenSkills ||
            choice.chosenSpell ||
            choice.chosenElement ||
            choice.chosenSave
          )
        });
      }
    });
  });

  // 4. Dotes adicionales si existen en un array (char.feats o char.additionalFeats)
  if (Array.isArray(character.feats)) {
    character.feats.forEach(f => {
      const fId = typeof f === 'string' ? f : (f.id || f.featId);
      if (!feats.some(existing => existing.id === fId)) {
        const featDef = getFeatById(fId);
        const fChoices = typeof f === 'object' ? extractFeatChoices(f, featDef) : [];
        feats.push({
          id: fId,
          name: featDef?.name || getFeatName(fId) || fId,
          category: featDef?.category || 'general',
          categoryLabel: featDef?.category === 'origin' ? 'Dote de Origen' : 'Dote General',
          description: featDef?.description || (typeof f === 'object' && f.description) || 'Dote activa del personaje.',
          choices: fChoices,
          sourceType: 'additionalFeat',
          rawChoice: typeof f === 'object' ? f : { featId: fId },
          featDef: featDef,
          isEditable: Boolean(featDef && Array.isArray(featDef.allowedAbilities) && featDef.allowedAbilities.length > 0)
        });
      }
    });
  }

  // Cálculos de CD para dotes con salvaciones
  const totalLvl = getCharacterTotalLevel(character);
  const pb = getProficiencyBonus(totalLvl);
  const scores = calculateFinalAbilityScores(character);
  const strMod = scores ? getAbilityModifier(scores.str || 10) : 0;
  const intMod = scores ? getAbilityModifier(scores.int || 10) : 0;
  const wisMod = scores ? getAbilityModifier(scores.wis || 10) : 0;
  const chaMod = scores ? getAbilityModifier(scores.cha || 10) : 0;
  const bestMental = Math.max(intMod, wisMod, chaMod);

  feats.forEach(f => {
    const fId = (f.id || '').toLowerCase();
    const fName = (f.name || '').toLowerCase();
    if (fId === 'maestro_escudos' || fName.includes('maestro de escudos') || fId.includes('shield_master')) {
      f.dc = 8 + pb + strMod;
      f.dcFormula = `8 base fija + ${pb} (BC) + ${strMod} (Mod. FUE) = CD ${f.dc}`;
    } else if (fId === 'telequinetico' || fName.includes('telequinético') || fName.includes('telequinetico')) {
      f.dc = 8 + pb + bestMental;
      f.dcFormula = `8 base fija + ${pb} (BC) + ${bestMental} (Mod. Mental) = CD ${f.dc}`;
    } else if (fId === 'envenenador' || fName.includes('envenenador')) {
      f.dc = 14;
      f.dcFormula = `CD fija de Veneno = 14`;
    }
  });

  return feats;
}
const DND55_STANDARD_LANGUAGES = [
  "Com\xFAn",
  "Lenguaje de Signos",
  "\xC9lfico",
  "Enano",
  "Gigante",
  "Gn\xF3mico",
  "Trasgoide",
  "Mediano",
  "Orco",
  "Abisal",
  "Celestial",
  "Drac\xF3nico",
  "Dialecto Subterr\xE1neo",
  "Infernal",
  "Primordial",
  "Silvano",
  "Infracom\xFAn"
];
const DND55_TOOL_PROFICIENCIES = [
  "Herramientas de albañil",
  "Herramientas de alfarero",
  "Herramientas de carpintero",
  "Herramientas de cartógrafo",
  "Herramientas de curtidor",
  "Herramientas de ebanista",
  "Herramientas de herrero",
  "Herramientas de joyero",
  "Herramientas de ladrón",
  "Herramientas de navegante",
  "Herramientas de soplador de vidrio",
  "Herramientas de tejedor",
  "Herramientas de zapatero",
  "Suministros de alquimista",
  "Suministros de calígrafo",
  "Suministros de cervecero",
  "Suministros de pintor",
  "Útiles de cocinero",
  "Útiles de envenenador",
  "Útiles de herbolista",
  "Útiles para disfrazarse",
  "Útiles para falsificar",
  "Ajedrez del dragón",
  "Juego de dados",
  "Juego de cartas (Tres dragones)",
  "Instrumento musical (Laúd)",
  "Instrumento musical (Flauta)",
  "Instrumento musical (Lira)",
  "Instrumento musical (Tambor)",
  "Instrumento musical (Violín)",
  "Vehículos terrestres",
  "Vehículos acuáticos"
];
/**
 * Descompone las competencias con herramientas de un trasfondo en grupos:
 * cada grupo es una entrada del trasfondo con sus opciones concretas.
 * Si el grupo solo tiene una opción es fija; si tiene varias, el jugador elige una.
 */
function getBackgroundToolGroups(bgDef) {
  const entries = Array.isArray(bgDef?.toolProficiencies) ? bgDef.toolProficiencies.filter(Boolean) : [];
  return entries.map((entry) => {
    const options = [];
    const addOpt = (o) => { if (o && !options.includes(o)) options.push(o); };
    String(entry).split(/\s+o\s+/i).forEach((rawPart) => {
      const part = rawPart.trim();
      const lower = part.toLowerCase();
      if (/a elegir/.test(lower)) {
        if (lower.includes("instrumento")) {
          DND55_TOOL_PROFICIENCIES.filter((t) => t.startsWith("Instrumento musical")).forEach(addOpt);
        } else if (lower.includes("artesano")) {
          DND55_TOOL_PROFICIENCIES.filter((t) => /^(Herramientas de|Suministros de)/.test(t)).forEach(addOpt);
        } else if (lower.includes("juego")) {
          DND55_TOOL_PROFICIENCIES.filter((t) => /^(Juego|Ajedrez)/.test(t)).forEach(addOpt);
        } else {
          addOpt(part.replace(/\s*a elegir/i, ""));
        }
      } else if (lower === "cartas" || lower === "dados") {
        DND55_TOOL_PROFICIENCIES.filter((t) => t.toLowerCase().includes(lower)).forEach(addOpt);
      } else {
        addOpt(part);
      }
    });
    return { entry, options };
  });
}
const DND55_CLASS_FEATURE_CHOICES = [
  {
    id: "clerigo_orden_divina",
    classId: "clerigo",
    level: 1,
    featureName: "Orden Divina (Nivel 1)",
    featureKey: "orden_divina",
    description: "En D&D 2024, eliges tu vocaci\xF3n eclesi\xE1stica entre el combate en primera l\xEDnea o el misterio sagrado:",
    options: [
      {
        id: "protector",
        name: "Protector",
        description: "Entrenado para el frente de batalla. Obtienes competencia con Armas Marciales y Armaduras Pesadas.",
        grantedProficiencies: {
          weapons: ["Armas marciales"],
          armor: ["Armaduras pesadas"]
        }
      },
      {
        id: "taumaturgo",
        name: "Taumaturgo",
        description: "Dedicado al culto m\xEDstico. Conoces 1 truco sagrado adicional de cl\xE9rigo y sumas tu modificador de Sabidur\xEDa (m\xEDnimo +1) a tus pruebas de Religi\xF3n e Inteligencia (Arcanos)."
      }
    ]
  },
  {
    id: "druida_orden_primigenia",
    classId: "druida",
    level: 1,
    featureName: "Orden Primigenia (Nivel 1)",
    featureKey: "orden_primigenia",
    description: "En D&D 2024, sellas tu comuni\xF3n con la naturaleza a trav\xE9s de una orden primigenia:",
    options: [
      {
        id: "guardian",
        name: "Guardi\xE1n",
        description: "Custodio marcial de los santuarios salvajes. Obtienes competencia con Armas Marciales y Armaduras Intermedias.",
        grantedProficiencies: {
          weapons: ["Armas marciales"],
          armor: ["Armaduras intermedias"]
        }
      },
      {
        id: "naturalista",
        name: "Naturalista",
        description: "Erudito de las energ\xEDas de la creaci\xF3n. Conoces 1 truco primigenio adicional y sumas tu modificador de Sabidur\xEDa a pruebas de Inteligencia (Naturaleza y Arcanos)."
      }
    ]
  },
  {
    id: "brujo_pacto",
    classId: "brujo",
    level: 1,
    featureName: "Invocaci\xF3n de Pacto (Nivel 1)",
    featureKey: "pacto_brujo",
    description: "En D&D 2024, sellas tu pacto eldritch mediante un don sobrenatural de tu patr\xF3n:",
    options: [
      {
        id: "pacto_hoja",
        name: "Pacto de la Hoja",
        description: "Creas o vinculas un arma cuerpo a cuerpo m\xE1gica. Usas tu modificador de Carisma para tiradas de ataque y da\xF1o en vez de Fuerza o Destreza."
      },
      {
        id: "pacto_tomo",
        name: "Pacto del Tomo",
        description: "Tu patr\xF3n te entrega el Libro de las Sombras. Conoces 3 trucos adicionales de cualquier clase y 2 conjuros de nivel 1 con la etiqueta de Ritual."
      },
      {
        id: "pacto_cadena",
        name: "Pacto de la Cadena",
        description: "Aprendes el conjuro Encuentra Familiar mejorado. Tu familiar puede adoptar formas superiores como Qu\xE1sit, Duendecillo, Pseudodrag\xF3n o Esqueleto."
      }
    ]
  }
];
function getClassFeatureChoices(classId, level) {
  return DND55_CLASS_FEATURE_CHOICES.filter((f) => f.classId === classId && level >= f.level);
}
function getClassFeatureChoiceTitle(classId, featureKey, choiceId) {
  const def = DND55_CLASS_FEATURE_CHOICES.find((f) => f.classId === classId && f.featureKey === featureKey);
  if (!def)
    return choiceId;
  const opt = def.options.find((o) => o.id === choiceId);
  return opt ? `${def.featureName}: ${opt.name}` : `${def.featureName}: ${choiceId}`;
}
function getClassFeatureChoiceDescription(classId, featureKey, choiceId) {
  const def = DND55_CLASS_FEATURE_CHOICES.find((f) => f.classId === classId && f.featureKey === featureKey);
  if (!def)
    return "";
  const opt = def.options.find((o) => o.id === choiceId);
  return opt ? opt.description : "";
}
function sanitizeCharacterFeatureChoices(classId, level, rawChoices) {
  const allowedDefinitions = getClassFeatureChoices(classId, level);
  const sanitized = {};
  allowedDefinitions.forEach((def) => {
    const userVal = rawChoices?.[def.featureKey];
    const isValidOption = userVal && def.options.some((opt) => opt.id === userVal);
    sanitized[def.featureKey] = isValidOption ? userVal : def.options[0].id;
  });
  return sanitized;
}
function getValidSubclassDefinition(classId, subclassId, level = 1) {
  if (!subclassId)
    return null;
  const classDef = DND55_CLASSES.find((c) => c.id === classId);
  const minLevel = classDef?.subclassAvailableAtLevel || 3;
  if (level < minLevel)
    return null;
  const lowerSub = String(subclassId).toLowerCase();
  const found = DND55_SUBCLASSES.find((sc) => sc.id === subclassId || sc.legacyId === subclassId || sc.name.toLowerCase() === lowerSub);
  if (!found || found.classId !== classId)
    return null;
  return found;
}
function getScaledFeatureInfo(feature, classId, classLevel, character, scores) {
  const fName = feature.name;
  const fDesc = feature.description;
  const lower = fName.toLowerCase();
  const cls = (classId || '').toLowerCase();
  const lvl = Number(classLevel) || 1;

  let scaledName = fName;
  let scaledDesc = fDesc;
  let dc = null;
  let dcFormula = null;

  // 1. PÍCARO: Ataque Furtivo
  if (cls === 'picaro' && lower.includes('ataque furtivo')) {
    const diceCount = Math.ceil(lvl / 2);
    const diceStr = `${diceCount}d6`;
    scaledName = `Ataque Furtivo (${diceStr})`;
    scaledDesc = `Infliges ${diceStr} de daño adicional (valor actual a nivel ${lvl} de pícaro) a una criatura una vez por turno si tienes ventaja o un aliado consciente está a 1,5 m de ella, usando un arma sutil o a distancia.`;
  }

  // 2. MONJE: Artes Marciales, Concentración del Monje, Movimiento, Caída Lenta, Desviar Ataques, Golpe Aturdidor
  else if (cls === 'monje') {
    const monkDcInfo = calculateMonkSaveDc(character);
    const mDc = monkDcInfo ? monkDcInfo.dc : (scores ? (8 + getProficiencyBonus(lvl) + getAbilityModifier(scores.wis || 10)) : 10);
    const mDcFormula = monkDcInfo ? monkDcInfo.formula : `8 base fija + ${getProficiencyBonus(lvl)} (BC) + ${scores ? getAbilityModifier(scores.wis || 10) : 0} (Mod. SAB) = CD ${mDc}`;

    if (lower.includes('artes marciales')) {
      const die = lvl >= 17 ? '1d12' : lvl >= 11 ? '1d10' : lvl >= 5 ? '1d8' : '1d6';
      scaledName = `Artes Marciales (${die})`;
      scaledDesc = `Puedes usar Destreza en lugar de Fuerza para ataques sin armas y armas de monje. Tu daño sin armas actual es de ${die} y puedes realizar un ataque sin armas como acción adicional tras la acción de Atacar.`;
    } else if (lower.includes('concentración del monje') || lower.includes('foco del monje') || lower.includes('puntos de concentraci') || lower.includes('disciplina mon')) {
      dc = mDc;
      dcFormula = mDcFormula;
      scaledName = `Concentración del Monje (${lvl} Pts Concentración | CD ${mDc})`;
      scaledDesc = `Dispones de ${lvl} puntos de concentración (ki) recuperados tras un descanso corto o largo (10 min de meditación). Puedes utilizarlos para activar las siguientes opciones fundamentales:
• Ráfaga de Golpes: Inmediatamente tras realizar la acción de Atacar en tu turno, puedes gastar 1 punto de concentración para realizar 2 ataques sin armas como acción adicional${lvl >= 10 ? ' (3 ataques sin armas a partir de nivel 10)' : ''}.
• Defensa Paciente: Puedes realizar la acción de Esquivar como acción adicional sin coste. O bien gastas 1 punto de concentración para realizar tanto la acción de Esquivar como la de Desengancharse en esa misma acción adicional${lvl >= 10 ? ` y ganar PG temporales iguales a 1d${lvl >= 17 ? 12 : lvl >= 11 ? 10 : lvl >= 5 ? 8 : 6} + Sabiduría` : ''}.
• Paso del Viento: Puedes realizar la acción de Desengancharse o la de Carrera como acción adicional sin coste. O bien gastas 1 punto de concentración para realizar ambas acciones (Desengancharse y Carrera) en la misma acción adicional y duplicar tu distancia de salto durante ese turno${lvl >= 10 ? ' (puedes transportar a un aliado voluntario sin penalización)' : ''}.`;
    } else if (lower.includes('golpe aturdidor')) {
      dc = mDc;
      dcFormula = mDcFormula;
      scaledName = `Golpe Aturdidor (CD ${mDc})`;
      scaledDesc = `Una vez por turno al impactar a una criatura con un ataque sin armas o arma de monje, puedes gastar 1 punto de concentración para forzarla a realizar una tirada de salvación de Constitución (CD ${mDc}). Si falla, queda Aturdida hasta el inicio de tu siguiente turno. Si tiene éxito, su velocidad se reduce a la mitad hasta el inicio de tu siguiente turno y la próxima tirada de ataque contra ella antes de tu siguiente turno tiene ventaja.`;
    } else if (lower.includes('movimiento sin armadura')) {
      const spd = lvl >= 18 ? '+9 m' : lvl >= 14 ? '+7,5 m' : lvl >= 10 ? '+6 m' : lvl >= 6 ? '+4,5 m' : '+3 m';
      scaledName = `Movimiento sin Armadura (${spd})`;
      scaledDesc = `Tu velocidad al caminar aumenta en ${spd} mientras no vistas armadura ni lleves escudo.`;
    } else if (lower.includes('caída lenta') || lower.includes('caida lenta')) {
      const red = lvl * 5;
      scaledName = `Caída Lenta (reduce ${red} daño)`;
      scaledDesc = `Como reacción al caer, reduces el daño por caída en ${red} puntos (${lvl} × 5).`;
    } else if (lower.includes('desviar ataques')) {
      const dexMod = scores ? getAbilityModifier(scores.dex || 10) : 0;
      scaledName = `Desviar Ataques (1d10 + DES + ${lvl})`;
      scaledDesc = `Como reacción al recibir daño físico, reduces el daño en 1d10 + ${dexMod >= 0 ? `+${dexMod}` : dexMod} (DES) + ${lvl} (nivel de monje). Si lo reduces a 0, puedes gastar 1 punto de concentración para redirigirlo.`;
    } else if (lower.includes('metabolismo asombroso')) {
      scaledName = `Metabolismo Asombroso (1d8 + ${lvl} PG)`;
      scaledDesc = `Al tirar iniciativa, puedes recuperar todos tus puntos de concentración gastados y recuperar 1d8 + ${lvl} puntos de golpe (1 vez por descanso largo).`;
    } else if (lower.includes('concentración elevada') || lower.includes('foco elevado')) {
      scaledName = `Concentración Elevada y Autocuración`;
      scaledDesc = `Tus opciones de concentración mejoran con nuevas capacidades:
• Ráfaga de Golpes: Realizas 3 ataques sin armas (en lugar de 2) al gastar 1 punto de concentración.
• Defensa Paciente: Otorga PG temporales iguales a 1d${lvl >= 17 ? 12 : lvl >= 11 ? 10 : lvl >= 5 ? 8 : 6} + Sabiduría sin coste de concentración, o el doble si gastas 1 punto de concentración.
• Paso del Viento: Puedes transportar contigo a una criatura voluntaria Grande o menor sin consumir movimiento adicional al saltar o moverte.
• Autocuración: Como acción adicional, puedes gastar puntos de concentración para eliminar envenenado u otros estados perjudiciales.`;
    } else if (lower.includes('superviviente disciplinado')) {
      scaledName = `Superviviente Disciplinado`;
      scaledDesc = `Ganas competencia en todas las tiradas de salvación. Además, al fallar una tirada de salvación, puedes gastar 1 punto de concentración para repetirla y usar el nuevo resultado.`;
    } else if (lower.includes('disciplina perfecta')) {
      scaledName = `Disciplina Perfecta (mínimo 4 concentración)`;
      scaledDesc = `Al tirar iniciativa, si tienes 3 o menos puntos de concentración, tu total se restablece automáticamente a 4 puntos de concentración.`;
    } else if (lower.includes('cuerpo vacío') || lower.includes('cuerpo vacio')) {
      scaledName = `Cuerpo Vacío`;
      scaledDesc = `Como acción adicional, gastas 3 puntos de concentración para volverte invisible durante 1 minuto y ganar resistencia a todos los tipos de daño excepto daño por fuerza.`;
    }
  }

  // 3. BÁRBARO: Furia
  else if (cls === 'barbaro' || cls === 'bárbaro') {
    if (lower.includes('furia')) {
      const rageDmg = lvl >= 16 ? '+4' : lvl >= 9 ? '+3' : '+2';
      const rageUses = lvl >= 20 ? 'Ilimitados' : (lvl >= 17 ? 6 : lvl >= 12 ? 5 : lvl >= 6 ? 4 : lvl >= 3 ? 3 : 2);
      scaledName = `Furia (${rageDmg} daño | ${rageUses} usos)`;
      scaledDesc = `Como acción adicional entras en furia: ventaja en pruebas y salvaciones de Fuerza, ${rageDmg} de daño extra en ataques con Fuerza y resistencia a daño contundente, perforante y cortante (${rageUses} usos por descanso largo, recuperas 1 en descanso corto).`;
    }
  }

  // 4. GUERRERO: Segundo Aliento, Indómito, Ataque Adicional
  else if (cls === 'guerrero') {
    if (lower.includes('segundo aliento')) {
      const swUses = lvl >= 10 ? 4 : lvl >= 4 ? 3 : 2;
      scaledName = `Segundo Aliento (1d10+${lvl} PG | ${swUses} usos)`;
      scaledDesc = `Como acción adicional recuperas 1d10 + ${lvl} puntos de golpe (${swUses} usos por descanso largo, recuperas 1 en descanso corto).`;
    } else if (lower.includes('indómito') || lower.includes('indomito')) {
      const indomUses = lvl >= 17 ? 3 : lvl >= 13 ? 2 : 1;
      scaledName = `Indómito (+${lvl} a salvación | ${indomUses} uso${indomUses > 1 ? 's' : ''})`;
      scaledDesc = `Al fallar una tirada de salvación, puedes repetirla sumando un bonificador especial de +${lvl} (tu nivel de guerrero). Tienes ${indomUses} uso(s) por descanso largo.`;
    } else if (lower.includes('ataque adicional')) {
      const atks = lvl >= 20 ? 4 : lvl >= 11 ? 3 : 2;
      scaledName = `Ataque Adicional (${atks} ataques)`;
      scaledDesc = `Puedes atacar ${atks} veces en lugar de una al realizar la acción de Atacar en tu turno.`;
    }
  }

  // 5. BARDO: Inspiración Bárdica, Fuente de Inspiración
  else if (cls === 'bardo') {
    if (lower.includes('inspiración bárdica') || lower.includes('inspiracion bardica')) {
      const die = lvl >= 15 ? '1d12' : lvl >= 10 ? '1d10' : lvl >= 5 ? '1d8' : '1d6';
      const chaMod = scores ? Math.max(1, getAbilityModifier(scores.cha || 10)) : 1;
      scaledName = `Inspiración Bárdica (${die} | ${chaMod} usos)`;
      scaledDesc = `Como acción adicional otorgas un dado de inspiración (${die}) a un aliado a 18 m (${chaMod} usos por ${lvl >= 5 ? 'descanso corto o largo' : 'descanso largo'}).`;
    }
  }

  // 6. PALADÍN: Imposición de Manos, Canalizar Divinidad, Aura de Protección
  else if (cls === 'paladin' || cls === 'paladín') {
    if (lower.includes('imposición de manos') || lower.includes('imposicion de manos')) {
      const pool = lvl * 5;
      scaledName = `Imposición de Manos (${pool} PG de reserva)`;
      scaledDesc = `Como acción adicional, curas cualquier cantidad de PG de tu reserva total de ${pool} PG (o gastas 5 PG para eliminar Envenenado). Se restaura con descanso largo.`;
    } else if (lower.includes('canalizar divinidad')) {
      const uses = lvl >= 11 ? 3 : 2;
      scaledName = `Canalizar Divinidad (${uses} usos)`;
    } else if (lower.includes('aura de protección') || lower.includes('aura de proteccion')) {
      const chaMod = scores ? Math.max(1, getAbilityModifier(scores.cha || 10)) : 1;
      const range = lvl >= 18 ? '9 metros' : '3 metros';
      scaledName = `Aura de Protección (+${chaMod} salvaciones | ${range})`;
      scaledDesc = `Tú y tus aliados a ${range} sumáis +${chaMod} a todas vuestras tiradas de salvación mientras estés consciente.`;
    }
  }

  // 7. CLÉRIGO: Canalizar Divinidad
  else if (cls === 'clerigo' || cls === 'clérigo') {
    if (lower.includes('canalizar divinidad')) {
      const uses = lvl >= 18 ? 4 : lvl >= 6 ? 3 : 2;
      scaledName = `Canalizar Divinidad (${uses} usos)`;
    }
  }

  // 8. DRUIDA: Forma Salvaje
  else if (cls === 'druida') {
    if (lower.includes('forma salvaje')) {
      const uses = lvl >= 17 ? 4 : lvl >= 6 ? 3 : 2;
      const maxCr = lvl >= 8 ? 'VD 1 (vuelo)' : lvl >= 4 ? 'VD 1/2 (nado)' : 'VD 1/4';
      scaledName = `Forma Salvaje (${uses} usos | máx ${maxCr})`;
      scaledDesc = `Como acción adicional te transformas en una bestia de hasta ${maxCr} o invocas un Compañero Salvaje (${uses} usos restaurados en descansos cortos y largos).`;
    }
  }

  // 9. HECHICERO: Fuente de Magia
  else if (cls === 'hechicero') {
    if (lower.includes('fuente de magia')) {
      scaledName = `Fuente de Magia (${lvl} Puntos de Hechicería)`;
      scaledDesc = `Dispones de ${lvl} puntos de hechicería para alimentar metamagias o crear espacios de conjuro adicionales (se restauran en descanso largo; recuperas 1d4 en descanso corto).`;
    }
  }

  // 10. EXPLORADOR: Enemigo Predilecto
  else if (cls === 'explorador') {
    if (lower.includes('enemigo predilecto')) {
      const freeMarks = 2 + (lvl >= 17 ? 4 : lvl >= 13 ? 3 : lvl >= 9 ? 2 : lvl >= 5 ? 1 : 0);
      scaledName = `Enemigo Predilecto (${freeMarks} usos gratuitos)`;
      scaledDesc = `Tienes Marca del Cazador siempre preparada y puedes lanzarla ${freeMarks} veces por descanso largo sin gastar un espacio de conjuro.`;
    }
  }

  // SUBCLASES Y RASGOS CON CD
  if (lower.includes('cuchillas psíquicas') || lower.includes('dados de energía psiónica') || lower.includes('dados de energia psionica')) {
    const die = lvl >= 17 ? 'd12' : lvl >= 11 ? 'd10' : lvl >= 5 ? 'd8' : 'd6';
    const pb = getProficiencyBonus(lvl);
    const count = pb * 2;
    scaledName = `Cuchillas Psíquicas (${count} dados ${die})`;
  } else if (lower.includes('superioridad táctica') || lower.includes('superioridad tactica')) {
    const diceCount = lvl >= 15 ? 6 : lvl >= 7 ? 5 : 4;
    const die = lvl >= 18 ? 'd12' : lvl >= 10 ? 'd10' : 'd8';
    const pb = getProficiencyBonus(lvl);
    const strMod = scores ? getAbilityModifier(scores.str || 10) : 0;
    const dexMod = scores ? getAbilityModifier(scores.dex || 10) : 0;
    const bestMod = Math.max(strMod, dexMod);
    const bestName = dexMod > strMod ? 'DES' : 'FUE';
    dc = 8 + pb + bestMod;
    dcFormula = `8 base fija + ${pb} (BC) + ${bestMod} (Mod. ${bestName}) = CD ${dc}`;
    scaledName = `Superioridad Táctica (${diceCount}${die} | CD ${dc})`;
    scaledDesc = `Dispones de ${diceCount} dados de superioridad (${die}). Las maniobras que obligan a realizar tiradas de salvación utilizan tu CD de Maniobras (CD ${dc}).`;
  } else if (lower.includes('explosión elemental') || lower.includes('explosion elemental')) {
    const monkDcInfo = calculateMonkSaveDc(character);
    const mDc = monkDcInfo ? monkDcInfo.dc : 10;
    dc = mDc;
    dcFormula = monkDcInfo ? monkDcInfo.formula : null;
    const die = lvl >= 17 ? '3d12' : lvl >= 11 ? '3d10' : lvl >= 5 ? '3d8' : '3d6';
    scaledName = `Explosión Elemental (CD ${mDc} DES)`;
    scaledDesc = `Como acción gastas 2 puntos de concentración para desatar una esfera elemental de 6 m de radio a 36 m que causa ${die} de daño (salvación de Destreza CD ${mDc} para mitad de daño).`;
  } else if (lower.includes('cataclismo primordial')) {
    const monkDcInfo = calculateMonkSaveDc(character);
    const mDc = monkDcInfo ? monkDcInfo.dc : 10;
    dc = mDc;
    dcFormula = monkDcInfo ? monkDcInfo.formula : null;
    scaledName = `Cataclismo Primordial (CD ${mDc} FUE)`;
    scaledDesc = `Al usar Explosión Elemental o impactar con ataques elementales, puedes gastar 1 punto de concentración adicional para forzar a las criaturas afectadas a superar una salvación de Fuerza (CD ${mDc}) o ser arrastradas o empujadas 9 metros.`;
  } else if (lower.includes('técnica de la mano abierta') || lower.includes('tecnica de la mano abierta')) {
    const monkDcInfo = calculateMonkSaveDc(character);
    const mDc = monkDcInfo ? monkDcInfo.dc : 10;
    dc = mDc;
    dcFormula = monkDcInfo ? monkDcInfo.formula : null;
    scaledName = `Técnica de la Mano Abierta (CD ${mDc})`;
    scaledDesc = `Al impactar con un ataque de tu Ráfaga de Golpes, puedes imponer uno de los siguientes efectos a la criatura:
• Derribar: Debe superar una salvación de Destreza (CD ${mDc}) o caer derribada.
• Empujar: Debe superar una salvación de Fuerza (CD ${mDc}) o ser empujada hasta 4,5 metros lejos de ti.
• Desestabilizar: No puede realizar reacciones hasta el final de tu siguiente turno.`;
  } else if (lower.includes('palma temblorosa')) {
    const monkDcInfo = calculateMonkSaveDc(character);
    const mDc = monkDcInfo ? monkDcInfo.dc : 10;
    dc = mDc;
    dcFormula = monkDcInfo ? monkDcInfo.formula : null;
    scaledName = `Palma Temblorosa (CD ${mDc} CON)`;
    scaledDesc = `Gastas 3 puntos de concentración al impactar con golpe desarmado para introducir vibraciones letales; como acción puedes detonarlas forzando una salvación de Constitución (CD ${mDc}) o reducir al objetivo a 0 PG (o 10d10 daño necrótico en éxito).`;
  } else if (lower.includes('rostro aterrador')) {
    const monkDcInfo = calculateMonkSaveDc(character);
    const mDc = monkDcInfo ? monkDcInfo.dc : 10;
    dc = mDc;
    dcFormula = monkDcInfo ? monkDcInfo.formula : null;
    scaledName = `Rostro Aterrador (CD ${mDc} SAB)`;
    scaledDesc = `Como acción muestras tu vínculo con la muerte obligando a todas las criaturas a 9 metros que puedan verte a superar una salvación de Sabiduría (CD ${mDc}) o quedar Asustadas de ti hasta tu siguiente turno.`;
  } else if (lower.includes('toque del fin absoluto')) {
    const monkDcInfo = calculateMonkSaveDc(character);
    const mDc = monkDcInfo ? monkDcInfo.dc : 10;
    dc = mDc;
    dcFormula = monkDcInfo ? monkDcInfo.formula : null;
    scaledName = `Toque del Fin Absoluto (CD ${mDc} CON)`;
    scaledDesc = `Como acción tocas a una criatura y gastas de 1 a 10 puntos de concentración: el objetivo debe superar una salvación de Constitución (CD ${mDc}) o sufrir 2d10 de daño necrótico por cada punto gastado (o mitad en éxito).`;
  }

  return { name: scaledName, description: scaledDesc, dc, dcFormula };
}

function getResolvedCharacterFeatures(character) {
  const charClasses = getCharacterClasses(character);
  const scores = calculateFinalAbilityScores(character);
  const primaryClassDef = DND55_CLASSES.find((c) => c.id === (charClasses[0]?.classId || character.classId));
  const classDef = primaryClassDef;
  const speciesDef = DND55_SPECIES.find((s) => s.id === character.speciesId);
  const backgroundDef = DND55_BACKGROUNDS.find((b) => b.id === character.backgroundId);
  const coreClassFeatures = [];
  const subclassesResolved = [];
  const classChoices = [];

  charClasses.forEach(c => {
    const cDef = DND55_CLASSES.find((cd) => cd.id === c.classId);
    const validSc = getValidSubclassDefinition(c.classId, c.subclassId, c.level);
    const sanitizedChoices = sanitizeCharacterFeatureChoices(c.classId, c.level, character.classFeatureChoices);
    const allowedChoiceDefs = getClassFeatureChoices(c.classId, c.level);

    allowedChoiceDefs.forEach((def) => {
      const val = sanitizedChoices[def.featureKey] || def.options[0].id;
      const opt = def.options.find((o) => o.id === val) || def.options[0];
      classChoices.push({
        key: def.featureKey,
        choiceId: opt.id,
        choiceName: opt.name,
        featureName: charClasses.length > 1 ? `${def.featureName} (${cDef?.name || c.classId})` : def.featureName,
        title: `${def.featureName}: ${opt.name}`,
        description: opt.description,
        level: def.level,
        classId: c.classId
      });
    });

    if (cDef) {
      cDef.featuresByLevel.forEach((f) => {
        if (f.level > c.level) return;
        const lower = f.name.toLowerCase();
        if (lower.includes("subclase") || lower.includes("mejora de caracter\xEDstica") || lower.includes("dote")) return;
        if (allowedChoiceDefs.some((cd) => lower.includes(cd.featureName.toLowerCase().split("(")[0].trim()))) return;
        if (c.classId === 'bardo' && lower.includes('dado de inspiración') && c.level >= 5) return;

        const scaled = getScaledFeatureInfo(f, c.classId, c.level, character, scores);

        coreClassFeatures.push({
          name: charClasses.length > 1 ? `${scaled.name} (${cDef.name})` : scaled.name,
          rawName: scaled.name,
          className: cDef.name,
          classId: c.classId,
          level: f.level,
          description: scaled.description,
          dc: scaled.dc || null,
          dcFormula: scaled.dcFormula || null
        });
      });
    }

    if (validSc) {
      subclassesResolved.push({
        id: validSc.id,
        name: validSc.name,
        classId: validSc.classId,
        className: cDef?.name || c.classId,
        description: validSc.description,
        availableLevel: cDef?.subclassAvailableAtLevel || 3,
        features: (validSc.features || []).filter((sf) => sf.level <= c.level).map((sf) => {
          const scaledSf = getScaledFeatureInfo(sf, c.classId, c.level, character, scores);
          return {
            name: charClasses.length > 1 ? `${scaledSf.name} (${validSc.name})` : scaledSf.name,
            rawName: scaledSf.name,
            subclassName: validSc.name,
            level: sf.level,
            description: scaledSf.description,
            dc: scaledSf.dc || null,
            dcFormula: scaledSf.dcFormula || null
          };
        })
      });
    }
  });

  const subclassResolved = subclassesResolved[0] || null;
  const originFeats = [];
  if (character.originFeat) {
    originFeats.push({
      name: character.originFeat,
      source: `Trasfondo: ${character.customBackground?.name || backgroundDef?.name || "Personalizado"}`,
      description: `Concedida a nivel 1 por tu trasfondo.`
    });
  }
  if (character.speciesId === "humano" && character.speciesOriginFeat) {
    originFeats.push({
      name: character.speciesOriginFeat,
      source: "Rasgo Humano: Vers\xE1til",
      description: "Dote de origen adicional concedida por la versatilidad de la especie humana (PHB 2024)."
    });
  }
  let generalFeat = null;
  if (character.level >= 4 && character.level4Choice) {
    if (character.level4Choice.type === "asi") {
      generalFeat = {
        title: "Mejora de Caracter\xEDstica (+2 / +1+1)",
        description: "Incremento de puntuaciones de caracter\xEDstica obtenido a nivel 4.",
        type: "asi"
      };
    } else if (character.level4Choice.type === "feat" && character.level4Choice.featId) {
      const featDef = DND55_GENERAL_FEATS.find((f) => f.id === character.level4Choice?.featId);
      generalFeat = {
        title: `Dote General: ${getFeatName(character.level4Choice.featId)}`,
        description: featDef?.description || "Dote general obtenida a nivel 4.",
        type: "feat"
      };
    }
  }
  const qualifiesForFs = characterQualifiesForFightingStyle(character);
  const fightingStylesList = [];
  if (qualifiesForFs) {
    const rawFightingStyles = [
      ...(character.fightingStyle ? [character.fightingStyle] : []),
      ...(Array.isArray(character.fightingStyles) ? character.fightingStyles : [])
    ];
    const uniqueFightingStyles = Array.from(new Set(rawFightingStyles));
    uniqueFightingStyles.forEach(styleId => {
      const fsDef = DND55_FIGHTING_STYLES.find((fs) => fs.id === styleId || fs.legacyId === styleId);
      fightingStylesList.push({
        id: fsDef ? fsDef.id : styleId,
        name: fsDef ? fsDef.name : styleId,
        description: fsDef ? fsDef.description : "Estilo de combate entrenado."
      });
    });
  }
  const fightingStyle = fightingStylesList[0] || null;
  const speciesTraits = [];
  if (speciesDef) {
    speciesDef.traits.forEach((t) => {
      let tName = t.name;
      let tDesc = t.description;
      if (character.speciesId === "draconido" && t.name.toLowerCase().includes("arma de aliento")) {
        const totalLvl = character.level || 1;
        const breathDice = totalLvl >= 17 ? '4d10' : totalLvl >= 11 ? '3d10' : totalLvl >= 5 ? '2d10' : '1d10';
        tName = `Arma de Aliento (${breathDice})`;
        tDesc = t.description.replace(/1d10/g, breathDice);
      }
      if (character.speciesId === "goliat" && t.name === "Linaje de Gigantes") {
        const sub = (speciesDef.sublineages || []).find((s) => s.id === character.sublineageId);
        if (sub) {
          const pbLin = getProficiencyBonus(character.level || 1);
          tName = `Linaje de Gigantes (${sub.name})`;
          tDesc = `${sub.description} Puedes usar este rasgo ${pbLin} ${pbLin === 1 ? "vez" : "veces"} por descanso largo (bonificador de competencia).`;
        }
      }
      speciesTraits.push({
        name: tName,
        description: tDesc,
        source: speciesDef.name
      });
    });
  }
  if (character.speciesId === "humano" && character.speciesSkillChoice) {
    speciesTraits.push({
      name: `Habilidad Adicional: ${character.speciesSkillChoice}`,
      description: `Competencia adquirida gracias al rasgo Diestro de la especie humana.`,
      source: "Humano (Diestro)"
    });
  }
  if (character.speciesId === "draconido" && character.dragonAncestry) {
    speciesTraits.push({
      name: `Linaje Drac\xF3nico (Drag\xF3n ${character.dragonAncestry})`,
      description: `Determina el tipo de da\xF1o y \xE1rea de tu Arma de Aliento y tu Resistencia a da\xF1o elemental.`,
      source: "Drac\xF3nido"
    });
  }
  if (character.speciesId === "elfo" && character.speciesCantripChoice) {
    speciesTraits.push({
      name: `Truco de Linaje: ${character.speciesCantripChoice}`,
      description: `Conocimiento innato de un truco adicional concedido por tu linaje \xE9lfico.`,
      source: "Elfo"
    });
  }
  return {
    classChoices,
    coreClassFeatures,
    subclass: subclassResolved,
    subclasses: subclassesResolved,
    originFeats,
    generalFeat,
    fightingStyle,
    fightingStyles: fightingStylesList,
    speciesTraits
  };
}

function getCharacterProficiencies(character) {
  const charClasses = getCharacterClasses(character);
  const primaryClass = charClasses[0];
  const primaryClassDef = DND55_CLASSES.find((c) => c.id === primaryClass?.classId) || DND55_CLASSES.find((c) => c.id === character.classId);
  const backgroundDef = character.customBackground || DND55_BACKGROUNDS.find((b) => b.id === character.backgroundId);
  const armorProf = [...(primaryClassDef?.armorProficiencies || [])];
  const weaponProf = [...(primaryClassDef?.weaponProficiencies || [])];
  const toolSet = new Set();

  if (charClasses.length > 1) {
    charClasses.slice(1).forEach(sc => {
      const mcRules = DND55_MULTICLASS_RULES.proficienciesGained[sc.classId];
      if (mcRules) {
        if (Array.isArray(mcRules.armor)) {
          mcRules.armor.forEach(a => { if (!armorProf.includes(a)) armorProf.push(a); });
        }
        if (Array.isArray(mcRules.weapons)) {
          mcRules.weapons.forEach(w => { if (!weaponProf.includes(w)) weaponProf.push(w); });
        }
        if (Array.isArray(mcRules.tools)) {
          mcRules.tools.forEach(t => toolSet.add(t));
        }
      }
    });
  }

  if (Array.isArray(character.tools)) {
    // La lista del personaje es la fuente de verdad (puede estar vacía)
    character.tools.filter(Boolean).forEach((t) => toolSet.add(t));
  } else {
    if (Array.isArray(character.toolProficiencies) && character.toolProficiencies.length > 0) {
      character.toolProficiencies.filter(Boolean).forEach((t) => toolSet.add(t));
    }
    if (Array.isArray(character.customBackground?.toolProficiencies) && character.customBackground.toolProficiencies.length > 0) {
      character.customBackground.toolProficiencies.filter(Boolean).forEach((t) => toolSet.add(t));
    }
    if (toolSet.size === 0 && Array.isArray(backgroundDef?.toolProficiencies)) {
      backgroundDef.toolProficiencies.filter(Boolean).forEach((t) => toolSet.add(t));
    }
  }
  if (Array.isArray(character.classTools)) {
    character.classTools.filter(Boolean).forEach((t) => toolSet.add(t));
  }
  if (primaryClassDef?.toolProficiencies && Array.isArray(primaryClassDef.toolProficiencies)) {
    primaryClassDef.toolProficiencies.forEach((t) => toolSet.add(t));
  }
  if (getClassLevel(character, "picaro") >= 1 && !Array.from(toolSet).some((t) => t.toLowerCase().includes("ladr"))) {
    toolSet.add("Herramientas de ladr\xF3n");
  }
  if (getClassLevel(character, "druida") >= 1 && !Array.from(toolSet).some((t) => t.toLowerCase().includes("herbol"))) {
    toolSet.add("Útiles de herbolista");
  }

  let hasLightArmor = armorProf.some((a) => a.toLowerCase().includes("liger"));
  let hasMediumArmor = armorProf.some((a) => a.toLowerCase().includes("media"));
  let hasHeavyArmor = armorProf.some((a) => a.toLowerCase().includes("pesada") && !a.toLowerCase().includes("con protector"));
  let hasShield = armorProf.some((a) => a.toLowerCase().includes("escudo"));

  // Rasgo de Clérigo - Orden Divina: Protector (competencia con armas marciales y armaduras pesadas)
  if (getClassLevel(character, "clerigo") >= 1 && character.classFeatureChoices?.orden_divina === "protector") {
    hasHeavyArmor = true;
    if (!armorProf.includes("Armaduras pesadas")) armorProf.push("Armaduras pesadas");
    if (!weaponProf.includes("Armas marciales")) weaponProf.push("Armas marciales");
  }

  // Rasgo de Druida - Orden Primigenia: Guardián
  if (getClassLevel(character, "druida") >= 1 && character.classFeatureChoices?.orden_primigenia === "guardian") {
    hasMediumArmor = true;
    if (!weaponProf.includes("Armas marciales")) weaponProf.push("Armas marciales");
  }

  return {
    armorProficiencies: armorProf,
    weaponProficiencies: weaponProf,
    toolProficiencies: Array.from(toolSet),
    hasLightArmor,
    hasMediumArmor,
    hasHeavyArmor,
    hasShield
  };
}
function sanitizeCharacter(character) {
  const sanitizedChoices = sanitizeCharacterFeatureChoices(character.classId, character.level, character.classFeatureChoices);
  const validSubclass = getValidSubclassDefinition(character.classId, character.subclassId, character.level);
  const qualifiesForFs = characterQualifiesForFightingStyle(character);
  return {
    ...character,
    classFeatureChoices: sanitizedChoices,
    subclassId: validSubclass ? validSubclass.id : void 0,
    fightingStyle: qualifiesForFs ? character.fightingStyle : void 0,
    fightingStyles: qualifiesForFs
      ? (Array.isArray(character.fightingStyles) && character.fightingStyles.length > 0 ? character.fightingStyles : (character.fightingStyle ? [character.fightingStyle] : void 0))
      : void 0,
    speciesOriginFeat: character.speciesId === "humano" ? character.speciesOriginFeat : void 0,
    speciesSkillChoice: character.speciesId === "humano" ? character.speciesSkillChoice : void 0,
    dragonAncestry: character.speciesId === "draconido" ? character.dragonAncestry : void 0,
    speciesCantripChoice: character.speciesId === "elfo" ? character.speciesCantripChoice : void 0
  };
}
function sanitizeSpellName(rawName) {
  if (!rawName)
    return "";
  return rawName.replace(/\s*\([A-Za-z\s']+\)$/, "").trim();
}
function formatMetricDistance(rawRange) {
  if (!rawRange)
    return "18 m";
  let r = rawRange.trim();
  r = r.replace(/120\s*(?:pies|ft|feet)/gi, "36 m").replace(/60\s*(?:pies|ft|feet)/gi, "18 m").replace(/30\s*(?:pies|ft|feet)/gi, "9 m").replace(/15\s*(?:pies|ft|feet)/gi, "4,5 m").replace(/10\s*(?:pies|ft|feet)/gi, "3 m").replace(/5\s*(?:pies|ft|feet)/gi, "1,5 m").replace(/150\s*(?:pies|ft|feet)/gi, "45 m").replace(/300\s*(?:pies|ft|feet)/gi, "90 m").replace(/(\d+)\s*(?:pies|ft|feet)/gi, (_, ft) => `${Math.round(parseInt(ft) * 0.3)} m`).replace(/\bmetros\b/gi, "m").replace(/\bmetro\b/gi, "m");
  return r;
}
function formatMetricDescription(rawDesc) {
  if (!rawDesc)
    return "";
  return rawDesc.replace(/120\s*(?:pies|ft|feet)/gi, "36 metros").replace(/60\s*(?:pies|ft|feet)/gi, "18 metros").replace(/30\s*(?:pies|ft|feet)/gi, "9 metros").replace(/15\s*(?:pies|ft|feet)/gi, "4,5 metros").replace(/10\s*(?:pies|ft|feet)/gi, "3 metros").replace(/5\s*(?:pies|ft|feet)/gi, "1,5 metros").replace(/150\s*(?:pies|ft|feet)/gi, "45 metros").replace(/300\s*(?:pies|ft|feet)/gi, "90 metros").replace(/(\d+)\s*(?:pies|ft|feet)/gi, (_, ft) => `${Math.round(parseInt(ft) * 0.3)} metros`);
}
function getSpellAttackInfo(spell, spellStats, characterLevel = 1, castAtLevel = null) {
  const desc = (spell?.description || "").toLowerCase();
  const rawName = spell?.name || "";
  const cleanName = sanitizeSpellName(rawName);
  const name = cleanName.toLowerCase();
  const spellId = (spell?.id || "").toLowerCase();
  let type = "utility";
  let attackOrDc = "\u2014";
  let damageOrEffect = "Efecto especial";
  let canUpcast = false;
  let upcastNote = "";

  const baseLevel = Number(spell?.level) || 0;
  const isCantrip = baseLevel === 0 || desc.includes("truco");
  const cantripMultiplier = characterLevel >= 17 ? 4 : characterLevel >= 11 ? 3 : characterLevel >= 5 ? 2 : 1;
  const requestedSlot = castAtLevel !== null && castAtLevel !== undefined ? Number(castAtLevel) : (spell?.castAtLevel !== undefined ? Number(spell.castAtLevel) : baseLevel);
  const effectiveSlotLevel = isCantrip ? 0 : Math.max(baseLevel, Math.min(9, isNaN(requestedSlot) ? baseLevel : requestedSlot));
  const upcastDiff = Math.max(0, effectiveSlotLevel - baseLevel);

  const hasAttack = desc.includes("ataque de conjuro") || desc.includes("ataque a distancia con conjuro") || desc.includes("ataque cuerpo a cuerpo con conjuro") || desc.includes("tirada de ataque") || name.includes("descarga") || name.includes("rayo") || name.includes("saeta") || name.includes("estallido sobrenatural");
  const hasSave = desc.includes("salvaci\xF3n") || desc.includes("salvacion") || desc.includes("tirada de salvaci\xF3n");
  const atkBonus = spellStats ? spellStats.spellAttackBonus : 0;
  const saveDc = spellStats ? spellStats.spellSaveDc : 13;
  const modVal = spellStats && typeof spellStats.abilityModifier === "number" ? spellStats.abilityModifier : 3;
  const modText = modVal >= 0 ? `+ ${modVal}` : `- ${Math.abs(modVal)}`;

  if (hasAttack) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
  } else if (hasSave) {
    type = "save";
    if (desc.includes("destreza"))
      attackOrDc = `CD ${saveDc} DES`;
    else if (desc.includes("constituci\xF3n") || desc.includes("constitucion"))
      attackOrDc = `CD ${saveDc} CON`;
    else if (desc.includes("sabidur\xEDa") || desc.includes("sabiduria"))
      attackOrDc = `CD ${saveDc} SAB`;
    else if (desc.includes("fuerza"))
      attackOrDc = `CD ${saveDc} FUE`;
    else if (desc.includes("inteligencia"))
      attackOrDc = `CD ${saveDc} INT`;
    else if (desc.includes("carisma"))
      attackOrDc = `CD ${saveDc} CAR`;
    else
      attackOrDc = `CD ${saveDc}`;
  } else if (spellStats) {
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
  }

  // === TRUCOS (NIVEL 0 - ESCALAN CON NIVEL DEL PERSONAJE: Nv 1, 5, 11, 17) ===
  if (spellId === "estallido_sobrenatural" || name.includes("estallido sobrenatural") || name.includes("descarga sobrenatural")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = cantripMultiplier > 1 ? `${cantripMultiplier} \xD7 1d10 Fuerza (${cantripMultiplier} rayos)` : "1d10 Fuerza (1 rayo)";
  } else if (spellId === "descarga_fuego" || name.includes("descarga de fuego") || name.includes("rayo de fuego") || name.includes("saeta de fuego")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${cantripMultiplier}d10 Fuego`;
  } else if (spellId === "rayo_escarcha" || name.includes("rayo de escarcha")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${cantripMultiplier}d8 Fr\xEDo (-3 m vel)`;
  } else if (spellId === "llama_sagrada" || name.includes("llama sagrada") || name.includes("impacto sagrado")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${cantripMultiplier}d8 Radiante`;
  } else if (spellId === "toque_helado" || name.includes("toque helado")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${cantripMultiplier}d10 Necr\xF3tico`;
  } else if (spellId === "burla_cruel" || name.includes("burla cruel") || name.includes("burla dañina") || name.includes("burla danina")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${cantripMultiplier}d4 Psíquico + Desv.`;
  } else if (spellId === "impacto_certero" || name.includes("impacto certero")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = cantripMultiplier > 1 ? `Arma + ${cantripMultiplier - 1}d6 Radiante` : "Da\xF1o de Arma (Radiante)";
  } else if (spellId === "shillelagh" || name.includes("garrote m\xE1gico") || name.includes("shillelagh")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const shillelaghDie = characterLevel >= 17 ? "2d6" : characterLevel >= 11 ? "1d12" : characterLevel >= 5 ? "1d10" : "1d8";
    damageOrEffect = `${shillelaghDie} ${modText} Fuerza/Contund.`;
  } else if (spellId === "agarre_electrizante" || name.includes("agarre electrizante")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${cantripMultiplier}d8 Rel\xE1mpago (Sin reacci\xF3n)`;
  } else if (spellId === "salpicadura_acida" || name.includes("salpicadura \xE1cida") || name.includes("salpicadura acida")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${cantripMultiplier}d6 \xC1cido (Esfera 1,5 m)`;
  } else if (spellId === "espita_mental" || spellId === "fragmento_mental" || name.includes("espita mental") || name.includes("fragmento mental")) {
    type = "save";
    attackOrDc = `CD ${saveDc} INT`;
    damageOrEffect = `${cantripMultiplier}d6 Ps\xEDquico (-1d4 Salv.)`;
  } else if (spellId === "latigo_espinas" || name.includes("l\xE1tigo de espinas") || name.includes("latigo de espinas")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${cantripMultiplier}d6 Perforante (Atrae 3 m)`;
  } else if (spellId === "hoja_del_trueno" || name.includes("hoja del trueno")) {
    type = "attack";
    attackOrDc = "Ataque con Arma";
    damageOrEffect = cantripMultiplier > 1 ? `Arma + ${cantripMultiplier - 1}d8 Trueno (+${cantripMultiplier}d8 si mueve)` : `Arma (+1d8 Trueno si mueve)`;
  } else if (spellId === "hoja_llama_verde" || name.includes("hoja de la llama verde")) {
    type = "attack";
    attackOrDc = "Ataque con Arma";
    damageOrEffect = cantripMultiplier > 1 ? `Arma + ${cantripMultiplier - 1}d8 Fuego (Salta ${cantripMultiplier - 1}d8 ${modText})` : `Arma (Salta ${modVal} Fuego)`;
  } else if (spellId === "frio_polar" || name.includes("fr\xEDo polar") || name.includes("frio polar")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${cantripMultiplier}d6 Fr\xEDo (+ Desv. ataque)`;
  } else if (spellId === "estallido_de_espadas" || name.includes("estallido de espadas")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${cantripMultiplier}d6 Fuerza (Radio 1,5 m)`;
  } else if (spellId === "latigo_de_rayos" || name.includes("l\xE1tigo de rayos") || name.includes("latigo de rayos")) {
    type = "save";
    attackOrDc = `CD ${saveDc} FUE`;
    damageOrEffect = `${cantripMultiplier}d8 Rel\xE1mpago (Atrae 3 m)`;
  } else if (spellId === "infestacion" || name.includes("infestaci\xF3n") || name.includes("infestacion")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${cantripMultiplier}d6 Veneno`;
  } else if (spellId === "estallido_hechicero" || name.includes("estallido hechicero")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${cantripMultiplier}d6 Elemental (Explota con 6)`;
  } else if (spellId === "fulgor_estelar" || name.includes("fulgor estelar")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${cantripMultiplier}d8 Radiante (Luz 3 m)`;
  }
  // === NIVEL 1 (CON ESCALADO POR ESPACIO DE CONJURO SUPERIOR) ===
  else if (spellId === "proyectil_magico" || name.includes("proyectil m\xE1gico") || name.includes("proyectil magico")) {
    type = "attack";
    attackOrDc = "Autom\xE1tico";
    const darts = 3 + upcastDiff;
    damageOrEffect = `${darts} \xD7 (1d4 + 1) Fuerza (${darts} dardos)`;
    canUpcast = true;
    upcastNote = "+1 dardo (1d4+1) por nivel superior";
  } else if (spellId === "saeta_guia" || name.includes("saeta gu\xEDa") || name.includes("saeta guiada")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${4 + upcastDiff}d6 Radiante (+Ventaja)`;
    canUpcast = true;
    upcastNote = "+1d6 Radiante por nivel superior";
  } else if (spellId === "curar_heridas" || (name.includes("curar heridas") && !name.includes("masivo"))) {
    type = "utility";
    attackOrDc = "Toque";
    damageOrEffect = `${2 + 2 * upcastDiff}d8 ${modText} PG Curaci\xF3n`;
    canUpcast = true;
    upcastNote = "+2d8 PG por nivel superior (D&D 5.5)";
  } else if (spellId === "palabra_curacion" || ((name.includes("palabra de curaci\xF3n") || name.includes("palabra sanadora")) && !name.includes("masiva"))) {
    type = "utility";
    attackOrDc = "18 m";
    damageOrEffect = `${2 + 2 * upcastDiff}d4 ${modText} PG Curaci\xF3n`;
    canUpcast = true;
    upcastNote = "+2d4 PG por nivel superior (D&D 5.5)";
  } else if (spellId === "castigo_divino" || name.includes("castigo divino")) {
    type = "attack";
    attackOrDc = "Al impactar";
    damageOrEffect = `${2 + upcastDiff}d8 Radiante (+1d8 vs Infernal/No-muerto)`;
    canUpcast = true;
    upcastNote = "+1d8 Radiante por nivel superior";
  } else if (spellId === "castigo_atronador" || name.includes("castigo atronador")) {
    type = "save";
    attackOrDc = `CD ${saveDc} FUE`;
    damageOrEffect = `${2 + upcastDiff}d6 Trueno (+Empuje 3 m / Derribo)`;
    canUpcast = true;
    upcastNote = "+1d6 Trueno por nivel superior";
  } else if (spellId === "castigo_colerico" || name.includes("castigo col\xE9rico") || name.includes("castigo colerico")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${1 + upcastDiff}d6 Necr\xF3tico/Ps\xEDquico (+Asustado)`;
    canUpcast = true;
    upcastNote = "+1d6 por nivel superior";
  } else if (spellId === "castigo_abrasador" || name.includes("castigo abrasador")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${1 + upcastDiff}d6 Fuego (+${1 + upcastDiff}d6/turno)`;
    canUpcast = true;
    upcastNote = "+1d6 Fuego por nivel superior";
  } else if (spellId === "manos_ardientes" || name.includes("manos ardientes")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${3 + upcastDiff}d6 Fuego`;
    canUpcast = true;
    upcastNote = "+1d6 Fuego por nivel superior";
  } else if (spellId === "onda_atronadora" || name.includes("onda atronadora") || name.includes("ola atronadora")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${2 + upcastDiff}d8 Trueno (+Empuje 3 m)`;
    canUpcast = true;
    upcastNote = "+1d8 Trueno por nivel superior";
  } else if (spellId === "marca_del_cazador" || name.includes("marca del cazador")) {
    type = "utility";
    attackOrDc = "Al impactar";
    damageOrEffect = "+1d6 Fuerza/Arma por impacto";
    canUpcast = true;
    upcastNote = "Duraci\xF3n 8 h (Nv 3-4) o 24 h (Nv 5+)";
  } else if (spellId === "susurros_discordantes" || spellId === "susurros_disonantes" || name.includes("susurros discordantes") || name.includes("susurros disonantes")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${3 + upcastDiff}d6 Ps\xEDquico (+Huida)`;
    canUpcast = true;
    upcastNote = "+1d6 Ps\xEDquico por nivel superior";
  } else if (spellId === "armadura_agathys" || name.includes("armadura de agathys")) {
    type = "utility";
    attackOrDc = "Represalia";
    const agVal = 5 * effectiveSlotLevel;
    damageOrEffect = `${agVal} Fr\xEDo represalia (+${agVal} PG temp)`;
    canUpcast = true;
    upcastNote = "+5 Fr\xEDo y +5 PG temp por nivel superior";
  } else if (spellId === "reprension_infernal" || name.includes("reprensi\xF3n infernal") || name.includes("reprension infernal")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${2 + upcastDiff}d10 Fuego`;
    canUpcast = true;
    upcastNote = "+1d10 Fuego por nivel superior";
  } else if (spellId === "orbe_cromatico" || name.includes("orbe crom\xE1tico") || name.includes("orbe cromatico")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${3 + upcastDiff}d8 Elemental (\xC1cido/Fr\xEDo/Fuego/Rayo/Trueno/Veneno)`;
    canUpcast = true;
    upcastNote = "+1d8 Elemental por nivel superior";
  } else if (spellId === "absorber_elementos" || name.includes("absorber elementos")) {
    type = "utility";
    attackOrDc = "Reacci\xF3n";
    damageOrEffect = `+${1 + upcastDiff}d6 Elemental (pr\xF3x. ataque)`;
    canUpcast = true;
    upcastNote = "+1d6 Elemental por nivel superior";
  } else if (spellId === "cuchillo_de_hielo" || name.includes("cuchillo de hielo")) {
    type = "attack";
    attackOrDc = `${atkBonus >= 0 ? `+${atkBonus}` : atkBonus} / CD ${saveDc} DES`;
    damageOrEffect = `1d10 Perf. + ${2 + upcastDiff}d6 Fr\xEDo (\xE1rea)`;
    canUpcast = true;
    upcastNote = "+1d6 Fr\xEDo explosivo por nivel superior";
  } else if (spellId === "saeta_caotica" || name.includes("saeta ca\xF3tica") || name.includes("saeta caotica")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `2d8 + ${1 + upcastDiff}d6 Elemental`;
    canUpcast = true;
    upcastNote = "+1d6 Elemental por nivel superior";
  } else if (spellId === "catapulta" || name.includes("catapulta")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${3 + upcastDiff}d8 Contundente`;
    canUpcast = true;
    upcastNote = "+1d8 Contundente por nivel superior";
  } else if (spellId === "temblor_de_tierra" || name.includes("temblor de tierra")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${1 + upcastDiff}d6 Contundente (+Derribo)`;
    canUpcast = true;
    upcastNote = "+1d6 Contundente por nivel superior";
  } else if (spellId === "rayo_de_hechiceria" || name.includes("rayo de hechicer\xEDa") || name.includes("rayo de hechiceria")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${1 + effectiveSlotLevel}d12 Rel\xE1mpago (1d12 auto con Ac. Ad.)`;
    canUpcast = true;
    upcastNote = "+1d12 Rel\xE1mpago inicial por nivel superior (D&D 5.5)";
  } else if (spellId === "salto" || name === "salto") {
    type = "utility";
    attackOrDc = "Toque (Ac. Ad.)";
    damageOrEffect = "Salto hasta 9 m sin prueba FUE";
    canUpcast = true;
    upcastNote = "+1 criatura voluntaria por nivel superior (D&D 5.5)";
  }
  // === NIVEL 2 ===
  else if (spellId === "rayo_abrasador" || name.includes("rayo abrasador")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const rays = 3 + upcastDiff;
    damageOrEffect = `${rays} \xD7 2d6 Fuego (${rays} rayos)`;
    canUpcast = true;
    upcastNote = "+1 rayo (2d6 Fuego) por nivel superior";
  } else if (spellId === "arma_espiritual" || name.includes("arma espiritual")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${1 + upcastDiff}d8 ${modText} Fuerza`;
    canUpcast = true;
    upcastNote = "+1d8 Fuerza por nivel superior (D&D 5.5)";
  } else if (spellId === "rayo_de_luna" || name.includes("rayo de luna")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${2 + upcastDiff}d10 Radiante`;
    canUpcast = true;
    upcastNote = "+1d10 Radiante por nivel superior";
  } else if (spellId === "calentar_metal" || name.includes("calentar metal") || name.includes("heat metal")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${2 + upcastDiff}d8 Fuego (+Desventaja)`;
    canUpcast = true;
    upcastNote = "+1d8 Fuego por nivel superior";
  } else if (spellId === "crecimiento_espinas" || name.includes("crecimiento de espinas")) {
    type = "utility";
    attackOrDc = "Autom\xE1tico (mov.)";
    damageOrEffect = "2d4 Perforante por cada 1,5 m";
  } else if (spellId === "esfera_flamigera" || name.includes("esfera flam\xEDgera") || name.includes("esfera flamigera")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${2 + upcastDiff}d6 Fuego`;
    canUpcast = true;
    upcastNote = "+1d6 Fuego por nivel superior";
  } else if (spellId === "anicos" || name.includes("añicos") || name.includes("anicos") || name.includes("hacer añicos") || name.includes("hacer anicos")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${3 + upcastDiff}d8 Trueno`;
    canUpcast = true;
    upcastNote = "+1d8 Trueno por nivel superior";
  } else if (spellId === "espada_sombras" || name.includes("espada sombr\xEDa") || name.includes("espada sombria")) {
    type = "attack";
    attackOrDc = "Ataque Arma (Sutil/Arroj.)";
    const shadowDice = effectiveSlotLevel >= 7 ? 5 : effectiveSlotLevel >= 5 ? 4 : effectiveSlotLevel >= 3 ? 3 : 2;
    damageOrEffect = `${shadowDice}d8 + Mod Ps\xEDquico`;
    canUpcast = true;
    upcastNote = "3d8 (Nv 3-4), 4d8 (Nv 5-6), 5d8 (Nv 7+)";
  } else if (spellId === "lanza_mental" || name.includes("lanza mental")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${3 + upcastDiff}d8 Ps\xEDquico`;
    canUpcast = true;
    upcastNote = "+1d8 Ps\xEDquico por nivel superior";
  } else if (spellId === "espiritu_curativo" || name.includes("esp\xEDritu curativo") || name.includes("espiritu curativo")) {
    type = "utility";
    attackOrDc = "Autom\xE1tico";
    damageOrEffect = `${1 + upcastDiff}d6 PG Curaci\xF3n`;
    canUpcast = true;
    upcastNote = "+1d6 PG por nivel superior";
  } else if (spellId === "castigo_marcador" || name.includes("castigo marcador")) {
    type = "attack";
    attackOrDc = "Al impactar";
    damageOrEffect = `${2 + upcastDiff}d6 Radiante (Anti-invisibilidad)`;
    canUpcast = true;
    upcastNote = "+1d6 Radiante por nivel superior";
  } else if (spellId === "castigo_brillante" || name.includes("castigo brillante")) {
    type = "attack";
    attackOrDc = "Al impactar (Ac. Ad.)";
    damageOrEffect = `${2 + upcastDiff}d6 Radiante (+Ventaja vs obj)`;
    canUpcast = true;
    upcastNote = "+1d6 Radiante por nivel superior (D&D 5.5)";
  } else if (spellId === "flecha_acida_melf" || name.includes("flecha ácida") || name.includes("flecha acida")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${4 + upcastDiff}d4 \xC1cido (+${2 + upcastDiff}d4 sig. turno)`;
    canUpcast = true;
    upcastNote = "+1d4 inicial y +1d4 posterior por nivel superior";
  } else if (spellId === "aliento_de_dragon" || name.includes("aliento de drag\xF3n") || name.includes("aliento de dragon")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${3 + upcastDiff}d6 Elemental (Cono 4,5 m)`;
    canUpcast = true;
    upcastNote = "+1d6 Elemental por nivel superior";
  } else if (spellId === "torbellino_polvo" || name.includes("torbellino de polvo")) {
    type = "save";
    attackOrDc = `CD ${saveDc} FUE`;
    damageOrEffect = `${1 + upcastDiff}d8 Contundente (+Empuje 3 m)`;
    canUpcast = true;
    upcastNote = "+1d8 Contundente por nivel superior";
  } else if (spellId === "agarre_de_tierra" || name.includes("agarre de tierra")) {
    type = "save";
    attackOrDc = `CD ${saveDc} FUE`;
    damageOrEffect = "2d6 Contundente (+Apresado)";
  } else if (spellId === "furia_de_tempus" || name.includes("furia b\xE9lica de tempus")) {
    type = "attack";
    attackOrDc = "Al impactar";
    damageOrEffect = `+${1 + Math.floor(upcastDiff / 2)}d6 Fuerza por ataque`;
    canUpcast = true;
    upcastNote = "+1d6 Fuerza cada 2 niveles superiores";
  }
  // === NIVEL 3 ===
  else if (spellId === "bola_de_fuego" || name.includes("bola de fuego")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${8 + upcastDiff}d6 Fuego`;
    canUpcast = true;
    upcastNote = "+1d6 Fuego por nivel superior";
  } else if (spellId === "relampago" || name === "rel\xE1mpago" || name === "relampago") {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${8 + upcastDiff}d6 Rel\xE1mpago`;
    canUpcast = true;
    upcastNote = "+1d6 Rel\xE1mpago por nivel superior";
  } else if (spellId === "espiritus_guardianes" || name.includes("esp\xEDritus guardianes") || name.includes("espiritus guardianes")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${3 + upcastDiff}d8 Radiante / Necr\xF3tico`;
    canUpcast = true;
    upcastNote = "+1d8 por nivel superior";
  } else if (spellId === "hambre_de_hadar" || name.includes("hambre de hadar")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    const extraHadar = Math.floor(upcastDiff / 2);
    damageOrEffect = `${2 + extraHadar}d6 Fr\xEDo + ${2 + extraHadar}d6 \xC1cido`;
    canUpcast = true;
    upcastNote = "+1d6 Fr\xEDo/Ácido cada 2 niveles superiores";
  } else if (spellId === "llamar_al_relampago" || name.includes("llamar al rel\xE1mpago") || name.includes("llamar al relampago")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${3 + upcastDiff}d10 Rel\xE1mpago`;
    canUpcast = true;
    upcastNote = "+1d10 Rel\xE1mpago por nivel superior";
  } else if (spellId === "palabra_curacion_masiva" || name.includes("palabra de curaci\xF3n masiva")) {
    type = "utility";
    attackOrDc = "18 m (6 aliados)";
    damageOrEffect = `${2 + upcastDiff}d4 ${modText} PG Curaci\xF3n`;
    canUpcast = true;
    upcastNote = "+1d4 PG por nivel superior";
  } else if (spellId === "castigo_cegador" || name.includes("castigo cegador")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${3 + upcastDiff}d8 Radiante (+Cegado)`;
    canUpcast = true;
    upcastNote = "+1d8 Radiante por nivel superior";
  } else if (spellId === "invocar_animales" || name.includes("invocar esp\xEDritus de la naturaleza")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${3 + upcastDiff}d10 Cortante/Perforante`;
    canUpcast = true;
    upcastNote = "+1d10 por nivel superior";
  } else if (spellId === "meteoros_minutos_melf" || name.includes("meteoros minutos de melf")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `2d6 Fuego por meteoro (${6 + 2 * upcastDiff} meteoros)`;
    canUpcast = true;
    upcastNote = "+2 meteoros por nivel superior";
  } else if (spellId === "paso_del_trueno" || name.includes("paso del trueno")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${3 + upcastDiff}d10 Trueno`;
    canUpcast = true;
    upcastNote = "+1d10 Trueno por nivel superior";
  } else if (spellId === "manto_del_cruzado" || name.includes("manto del cruzado")) {
    type = "utility";
    attackOrDc = "Aura 9 m";
    damageOrEffect = "+1d4 Radiante por impacto";
  } else if (spellId === "espiritu_feerico" || name.includes("convocar esp\xEDritu f\xE9erico")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (2d6 + ${3 + effectiveSlotLevel}) Fuerza`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y n.\xBA de ataques con el nivel del espacio";
  } else if (spellId === "invocar_muertos_vivientes" || name.includes("convocar muertos vivientes")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (1d8 + ${3 + effectiveSlotLevel}) Necr\xF3tico`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y n.\xBA de ataques con el nivel del espacio";
  } else if (spellId === "invocar_sombras" || name.includes("convocar esp\xEDritu sombr\xEDo")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (1d12 + ${3 + effectiveSlotLevel}) Fr\xEDo`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y n.\xBA de ataques con el nivel del espacio";
  } else if (spellId === "erupcion_de_tierra" || name.includes("erupci\xF3n de tierra") || name.includes("erupcion de tierra")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${3 + upcastDiff}d12 Contundente`;
    canUpcast = true;
    upcastNote = "+1d12 Contundente por nivel superior";
  } else if (spellId === "toque_vampirico" || name.includes("toque vamp\xEDrico") || name.includes("toque vampirico")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `${3 + upcastDiff}d6 Necr\xF3tico (Cura 50% da\xF1o)`;
    canUpcast = true;
    upcastNote = "+1d6 Necr\xF3tico por nivel superior";
  }
  // === NIVEL 4 ===
  else if (spellId === "muro_de_fuego" || name.includes("muro de fuego")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${5 + upcastDiff}d8 Fuego`;
    canUpcast = true;
    upcastNote = "+1d8 Fuego por nivel superior";
  } else if (spellId === "tentaculos_evard" || name.includes("tent\xE1culos negros de evard")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = "3d6 Contundente (+Apresado)";
  } else if (spellId === "tormenta_de_hielo" || name.includes("tormenta de hielo")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${2 + upcastDiff}d8 Contund. + 4d6 Fr\xEDo`;
    canUpcast = true;
    upcastNote = "+1d8 Contundente por nivel superior";
  } else if (spellId === "guardian_de_la_fe" || name.includes("guardi\xE1n de la fe") || name.includes("guardian de la fe")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = "20 Radiante (hasta 60 total)";
  } else if (spellId === "asolamiento" || name.includes("asolamiento")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${8 + upcastDiff}d8 Necr\xF3tico`;
    canUpcast = true;
    upcastNote = "+1d8 Necr\xF3tico por nivel superior";
  } else if (spellId === "sombra_de_moil" || name.includes("sombra de moil")) {
    type = "utility";
    attackOrDc = "Represalia";
    damageOrEffect = "2d8 Necr\xF3tico (represalia)";
  } else if (spellId === "castigo_estupefaciente" || name.includes("castigo estupefaciente")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${4 + upcastDiff}d6 Ps\xEDquico (+Desv.)`;
    canUpcast = true;
    upcastNote = "+1d6 Ps\xEDquico por nivel superior";
  } else if (spellId === "invocar_aberracion" || name.includes("convocar aberraci\xF3n")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (1d8 + ${3 + effectiveSlotLevel}) Ps\xEDquico`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y n.\xBA de ataques con el nivel del espacio";
  } else if (spellId === "invocar_constructo" || name.includes("convocar constructo")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (1d10 + ${4 + effectiveSlotLevel}) Contundente`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y n.\xBA de ataques con el nivel del espacio";
  } else if (spellId === "invocar_elemental_mayor" || name.includes("convocar esp\xEDritu elemental")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (1d10 + ${4 + effectiveSlotLevel}) Elemental`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y n.\xBA de ataques con el nivel del espacio";
  } else if (spellId === "sombra_abrasadora_shar" || name.includes("sombra abrasadora de shar")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${4 + upcastDiff}d8 Necr\xF3tico + 4d8 Fr\xEDo`;
    canUpcast = true;
    upcastNote = "+1d8 Necr\xF3tico por nivel superior";
  }
  // === NIVEL 5 ===
  else if (spellId === "plaga_de_insectos" || name.includes("plaga de insectos")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${4 + upcastDiff}d10 Perforante (Esfera 6 m)`;
    canUpcast = true;
    upcastNote = "+1d10 Perforante por nivel superior";
  } else if (spellId === "cono_frio" || name.includes("cono de fr\xEDo") || name.includes("cono de frio")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${8 + upcastDiff}d8 Fr\xEDo`;
    canUpcast = true;
    upcastNote = "+1d8 Fr\xEDo por nivel superior";
  } else if (spellId === "curar_heridas_masivo" || name.includes("curar heridas masivo")) {
    type = "utility";
    attackOrDc = "18 m (6 aliados)";
    damageOrEffect = `${3 + upcastDiff}d8 ${modText} PG Curaci\xF3n`;
    canUpcast = true;
    upcastNote = "+1d8 PG por nivel superior";
  } else if (spellId === "nube_aniquiladora" || name.includes("nube aniquiladora")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = `${5 + upcastDiff}d8 Veneno`;
    canUpcast = true;
    upcastNote = "+1d8 Veneno por nivel superior";
  } else if (spellId === "golpe_flamigero" || name.includes("golpe flam\xEDgero") || name.includes("golpe flamigero")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${4 + upcastDiff}d6 Fuego + 4d6 Radiante`;
    canUpcast = true;
    upcastNote = "+1d6 Fuego o Radiante por nivel superior";
  } else if (spellId === "ola_destructiva" || name.includes("ola destructiva")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = "5d6 Trueno + 5d6 Radiante/Necr. (+Derribo)";
  } else if (spellId === "invocar_dragon" || name.includes("convocar esp\xEDritu drac\xF3nico")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (1d6 + ${4 + effectiveSlotLevel}) + Aliento 2d6`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y ataques con el nivel del espacio";
  } else if (spellId === "invocar_celestial" || name.includes("convocar celestial")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (2d6 + ${2 + effectiveSlotLevel}) Radiante`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y ataques con el nivel del espacio";
  } else if (spellId === "invocar_infernal" || name.includes("convocar infernal")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    const atks = Math.floor(effectiveSlotLevel / 2);
    damageOrEffect = `${atks} \xD7 (2d6 + ${3 + effectiveSlotLevel}) Fuego/Necr.`;
    canUpcast = true;
    upcastNote = "Escala da\xF1o y ataques con el nivel del espacio";
  } else if (spellId === "sinapsis_psiquica" || name.includes("sinapsis sin\xE1ptica")) {
    type = "save";
    attackOrDc = `CD ${saveDc} INT`;
    damageOrEffect = "8d6 Ps\xEDquico (-1d6 a tiradas)";
  } else if (spellId === "colera_sagrada_faerun" || name.includes("c\xF3lera sagrada de faer\xFBn")) {
    type = "save";
    attackOrDc = `CD ${saveDc} SAB`;
    damageOrEffect = `${4 + upcastDiff}d8 Radiante`;
    canUpcast = true;
    upcastNote = "+1d8 Radiante por nivel superior";
  }
  // === NIVEL 6 ===
  else if (spellId === "desintegrar" || name.includes("desintegrar")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${10 + 3 * upcastDiff}d6 + 40 Fuerza`;
    canUpcast = true;
    upcastNote = "+3d6 Fuerza por nivel superior";
  } else if (spellId === "cadena_relampagos" || name.includes("cadena de relámpagos") || name.includes("cadena de relampagos") || name.includes("relámpago en cadena") || name.includes("relampago en cadena")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `10d8 Rel\xE1mpago (${4 + upcastDiff} objetivos)`;
    canUpcast = true;
    upcastNote = "+1 objetivo por nivel superior";
  } else if (spellId === "sanar" || (name.includes("sanar") && !name.includes("palabra"))) {
    type = "utility";
    attackOrDc = "18 m";
    damageOrEffect = `${70 + 10 * upcastDiff} PG Curaci\xF3n`;
    canUpcast = true;
    upcastNote = "+10 PG por nivel superior";
  } else if (spellId === "dano" || name === "da\xF1o" || name === "dano") {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = "14d6 Necr\xF3tico";
  } else if (spellId === "rayo_solar" || name.includes("rayo solar")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = "6d8 Radiante (+Cegado)";
  } else if (spellId === "muro_de_hielo" || name.includes("muro de hielo")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = `${10 + 2 * upcastDiff}d6 Fr\xEDo (${5 + upcastDiff}d6 brecha)`;
    canUpcast = true;
    upcastNote = "+2d6 Fr\xEDo por nivel superior";
  } else if (spellId === "transformacion_tenser" || name.includes("transformaci\xF3n de tenser")) {
    type = "attack";
    attackOrDc = "Ventaja Ataques Arma";
    damageOrEffect = "+2d12 Fuerza por impacto (+50 PG temp)";
  }
  // === NIVEL 7 ===
  else if (spellId === "dedo_de_la_muerte" || name.includes("dedo de la muerte")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = "7d8 + 30 Necr\xF3tico";
  } else if (spellId === "tormenta_de_fuego" || name.includes("tormenta de fuego")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = "7d10 Fuego";
  } else if (spellId === "corona_de_estrellas" || name.includes("corona de estrellas")) {
    type = "attack";
    attackOrDc = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
    damageOrEffect = `4d12 Radiante (${7 + 2 * upcastDiff} motas)`;
    canUpcast = true;
    upcastNote = "+2 motas por nivel superior";
  } else if (spellId === "regenerar" || name.includes("regenerar")) {
    type = "utility";
    attackOrDc = "Toque";
    damageOrEffect = "4d8 + 15 PG (+1 PG/turno)";
  }
  // === NIVEL 8 ===
  else if (spellId === "terremoto" || name.includes("terremoto")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = "50 Contundente (estructuras) + Fisuras";
  } else if (spellId === "estallido_solar" || name.includes("estallido solar")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON`;
    damageOrEffect = "12d6 Radiante (+Cegado)";
  } else if (spellId === "tsunami" || name.includes("tsunami")) {
    type = "save";
    attackOrDc = `CD ${saveDc} FUE`;
    damageOrEffect = "6d10 Contundente";
  } else if (spellId === "palabra_de_poder_aturdir" || name.includes("palabra de poder: aturdir")) {
    type = "utility";
    attackOrDc = "Autom\xE1tico";
    damageOrEffect = "Aturdido si \u2264150 PG";
  }
  // === NIVEL 9 ===
  else if (spellId === "palabra_de_poder_matar" || name.includes("palabra de poder: matar") || name.includes("palabra de poder matar")) {
    type = "utility";
    attackOrDc = "Autom\xE1tico";
    damageOrEffect = "Muerte si \u2264100 PG";
  } else if (spellId === "palabra_de_poder_sanar" || name.includes("palabra de poder: sanar")) {
    type = "utility";
    attackOrDc = "Toque";
    damageOrEffect = "Restaura todos los PG m\xE1x.";
  } else if (spellId === "lluvia_de_meteoros" || name.includes("lluvia de meteoros")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = "20d6 Fuego + 20d6 Contund.";
  } else if (spellId === "muro_prismatico" || name.includes("muro prism\xE1tico")) {
    type = "save";
    attackOrDc = `CD ${saveDc} DES`;
    damageOrEffect = "7 capas \xD7 10d6 Elemental";
  } else if (spellId === "cuchilla_mental" || name.includes("grito ps\xEDquico")) {
    type = "save";
    attackOrDc = `CD ${saveDc} INT`;
    damageOrEffect = "14d6 Ps\xEDquico (+Aturdido)";
  } else if (spellId === "tormenta_de_venganza" || name.includes("tormenta de venganza")) {
    type = "save";
    attackOrDc = `CD ${saveDc} CON/DES`;
    damageOrEffect = "2d6 Trueno/\xC1cido + 10d6 Rayo + 4d6 Fr\xEDo";
  } else if (name.includes("luz")) {
    damageOrEffect = "Ilumina 6 m";
  } else if (name.includes("ilusion menor") || name.includes("ilusi\xF3n menor")) {
    damageOrEffect = "Sonido o imagen 1,5 m";
  } else {
    // Extractor genérico inteligente para cualquier conjuro personalizado o adicional
    const dmgRegex = /(\d+)d(\d+)(?:\s*\+\s*(\d+))?\s*(?:puntos de da\xF1o|de da\xF1o|da\xF1o)?\s*(?:por\s+|de\s+)?(fuego|radiante|fr\xEDo|frio|necr\xF3tico|necrotico|fuerza|rel\xE1mpago|relampago|trueno|\xE1cido|acido|ps\xEDquico|psiquico|veneno|perforante|cortante|contundente)?/i;
    const match = spell?.description ? spell.description.match(dmgRegex) : null;
    if (match) {
      let numDice = parseInt(match[1], 10) || 1;
      const dieFaces = match[2];
      const flatBonus = match[3] ? ` + ${match[3]}` : "";
      if (isCantrip && numDice === 1) {
        numDice = cantripMultiplier;
      } else if (!isCantrip) {
        const upcastMatch = spell.description.match(/\+(\d+)d(\d+)\s*(?:[a-z\xE1-\xFA]+\s*)?por\s*(?:cada\s*)?nivel/i);
        if (upcastMatch) {
          const addPerLevel = parseInt(upcastMatch[1], 10) || 1;
          canUpcast = true;
          upcastNote = `+${addPerLevel}d${upcastMatch[2]} por nivel superior`;
          if (upcastDiff > 0 && upcastMatch[2] === dieFaces) {
            numDice += addPerLevel * upcastDiff;
          }
        }
      }
      const dmgType = match[4] ? ` ${match[4].charAt(0).toUpperCase() + match[4].slice(1).toLowerCase()}` : "";
      damageOrEffect = `${numDice}d${dieFaces}${flatBonus}${dmgType}`;
    } else if (spell?.description && spell.description.length > 0) {
      damageOrEffect = spell.description.slice(0, 42) + (spell.description.length > 42 ? "..." : "");
    }
  }

  return {
    type,
    attackOrDc,
    attackBonusText: attackOrDc,
    damageOrEffect,
    damageText: damageOrEffect,
    canUpcast,
    upcastNote,
    baseLevel,
    effectiveSlotLevel,
    cantripMultiplier: isCantrip ? cantripMultiplier : 1,
    hasAttackOrSave: type === "attack" || type === "save" || canUpcast,
    range: formatMetricDistance(spell?.range)
  };
}
function getConsumableTraitsForCharacter(character) {
  const traits = [];
  const level = character.level || 1;
  const pb = getProficiencyBonus(level);
  const finalScores = calculateFinalAbilityScores(character);
  const chaMod = Math.max(1, getAbilityModifier(finalScores.cha || 10));
  const classId = (character.classId || "").toLowerCase();
  const subId = (character.subclassId || "").toLowerCase();
  if (classId.includes("barbaro") || classId.includes("b\xE1rbaro")) {
    const rageUses = level >= 20 ? 99 : level >= 17 ? 6 : level >= 12 ? 5 : level >= 6 ? 4 : level >= 3 ? 3 : 2;
    traits.push({
      name: "Furia",
      origin: "clase",
      maxUses: rageUses,
      used: 0,
      recovery: "largo",
      description: "Acci\xF3n adicional: ventaja en pruebas/salvaciones de FUE, +da\xF1o f\xEDsico y resistencia a da\xF1o contundente/cortante/perforante. Descanso largo (recupera 1 en corto)."
    });
    if (subId.includes("fanatico") && level >= 10) {
      traits.push({
        name: "Presencia Ferviente",
        origin: "clase",
        maxUses: 1,
        used: 0,
        recovery: "largo",
        description: "Acci\xF3n adicional: otorgas ventaja en tiradas de ataque y salvaciones a hasta 10 aliados a 18 m hasta el inicio de tu siguiente turno. Descanso largo."
      });
    }
  }
  if (classId.includes("bardo")) {
    traits.push({
      name: "Inspiraci\xF3n B\xE1rdica",
      origin: "clase",
      maxUses: chaMod,
      used: 0,
      recovery: level >= 5 ? "ambos" : "largo",
      description: `Acci\xF3n adicional: otorga un dado d${level >= 15 ? "12" : level >= 10 ? "10" : level >= 5 ? "8" : "6"} a un aliado a 18 m. ${level >= 5 ? "Descanso corto o largo." : "Descanso largo."}`
    });
  }
  if (classId.includes("clerigo") || classId.includes("cl\xE9rigo")) {
    const cdUses = level >= 18 ? 4 : level >= 6 ? 3 : 2;
    traits.push({
      name: "Canalizar Divinidad",
      origin: "clase",
      maxUses: cdUses,
      used: 0,
      recovery: "largo",
      description: "Expulsar Muertos Vivientes, Chispa Divina o efectos de dominio sagrado. Descanso largo (recupera 1 en corto)."
    });
    if (level >= 10) {
      traits.push({
        name: "Intervenci\xF3n Divina",
        origin: "clase",
        maxUses: 1,
        used: 0,
        recovery: "largo",
        description: "Lanzas autom\xE1ticamente un conjuro de cl\xE9rigo de nivel 5 o menor sin gastar espacio de conjuro ni componentes. Descanso largo."
      });
    }
  }
  if (classId.includes("druida")) {
    if (level >= 2) {
      const wsUses = level >= 17 ? 4 : level >= 6 ? 3 : 2;
      traits.push({
        name: "Forma Salvaje",
        origin: "clase",
        maxUses: wsUses,
        used: 0,
        recovery: "largo",
        description: "Acci\xF3n adicional: transformaci\xF3n en forma de bestia salvaje o compa\xF1ero familiar. Descanso largo (recupera 1 en corto)."
      });
    }
  }
  if (classId.includes("guerrero")) {
    const swUses = level >= 10 ? 4 : level >= 4 ? 3 : 2;
    traits.push({
      name: "Tomar Aliento",
      origin: "clase",
      maxUses: swUses,
      used: 0,
      recovery: "largo",
      description: `Acci\xF3n adicional: recuperas 1d10 + ${level} puntos de golpe. Descanso largo (recupera 1 en corto).`
    });
    if (level >= 2) {
      traits.push({
        name: "Oleada de Acci\xF3n",
        origin: "clase",
        maxUses: level >= 17 ? 2 : 1,
        used: 0,
        recovery: "ambos",
        description: "Realizas una acci\xF3n adicional completa en tu turno. Descanso corto o largo."
      });
    }
    if (level >= 9) {
      traits.push({
        name: "Ind\xF3mito",
        origin: "clase",
        maxUses: level >= 17 ? 3 : level >= 13 ? 2 : 1,
        used: 0,
        recovery: "largo",
        description: `Repite una tirada de salvaci\xF3n fallida sumando un bonificador de +${level}. Descanso largo.`
      });
    }
    if (subId.includes("maestro") || subId.includes("batalla")) {
      const numDice = level >= 15 ? 6 : level >= 7 ? 5 : 4;
      const dieType = level >= 15 ? "d12" : level >= 10 ? "d10" : "d8";
      traits.push({
        name: `Dados de Superioridad (${dieType})`,
        origin: "clase",
        maxUses: numDice,
        used: 0,
        recovery: "ambos",
        description: `Reserva de maniobras t\xE1cticas (${dieType}). Descanso corto o largo.`
      });
    }
    if (subId.includes("psionico") || subId.includes("ps\xEDquico")) {
      traits.push({
        name: "Dados de Energ\xEDa Psi\xF3nica",
        origin: "clase",
        maxUses: pb * 2,
        used: 0,
        recovery: "largo",
        description: "Potencia golpes, levanta campo protector o salto psi\xF3nico. Descanso largo (recupera 1 en corto)."
      });
    }
  }
  if (classId.includes("monje")) {
    if (level >= 2) {
      traits.push({
        name: "Puntos de Concentración (Ki)",
        origin: "clase",
        maxUses: level,
        used: 0,
        recovery: "ambos",
        description: "Alimenta Ráfaga de Golpes, Defensa Paciente, Paso del Viento y Golpe Aturdidor. Descanso corto o largo (10 min de meditación)."
      });
      traits.push({
        name: "Metabolismo Asombroso",
        origin: "clase",
        maxUses: 1,
        used: 0,
        recovery: "largo",
        description: `Al tirar iniciativa, recuperas todos tus puntos de concentración gastados y recuperas 1d8 + ${level} PG. Descanso largo.`
      });
    }
  }
  if (classId.includes("paladin") || classId.includes("palad\xEDn")) {
    traits.push({
      name: "Imposici\xF3n de Manos",
      origin: "clase",
      maxUses: level * 5,
      used: 0,
      recovery: "largo",
      description: `Reserva curativa total de ${level * 5} PG (o gasta 5 puntos para curar veneno). Acci\xF3n. Descanso largo.`
    });
    if (level >= 2) {
      traits.push({
        name: "Castigo del Palad\xEDn (Gratuito)",
        origin: "clase",
        maxUses: 1,
        used: 0,
        recovery: "largo",
        description: "Lanzas Castigo Divino una vez al d\xEDa sin gastar espacio de conjuro. Descanso largo."
      });
    }
    if (level >= 3) {
      traits.push({
        name: "Canalizar Divinidad",
        origin: "clase",
        maxUses: level >= 11 ? 3 : 2,
        used: 0,
        recovery: "largo",
        description: "Imbuir arma sagrada, Castigo Divino o rasgos de juramento. Descanso largo (recupera 1 en corto)."
      });
    }
    if (level >= 5) {
      traits.push({
        name: "Corcel Fiel (Gratuito)",
        origin: "clase",
        maxUses: 1,
        used: 0,
        recovery: "largo",
        description: "Lanzas Encontrar Corcel una vez al d\xEDa sin gastar espacio de conjuro. Descanso largo."
      });
    }
  }
  if (classId.includes("explorador") || classId.includes("ranger")) {
    traits.push({
      name: "Marca del Cazador Gratuita",
      origin: "clase",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: "Lanzas Marca del Cazador sin gastar espacios de conjuro. Descanso largo."
    });
  }
  if (classId.includes("picaro") || classId.includes("p\xEDcaro")) {
    if (subId.includes("alma") || subId.includes("cuchilla") || subId.includes("rebanaalmas")) {
      traits.push({
        name: "Dados de Energ\xEDa Psi\xF3nica",
        origin: "clase",
        maxUses: pb * 2,
        used: 0,
        recovery: "largo",
        description: "Dados d6/d8 psi\xF3nicos para Rebanaalmas, Telepat\xEDa y Talento Ps\xEDquico. Descanso largo (recupera 1 en corto)."
      });
    }
    if (level >= 20) {
      traits.push({
        name: "Golpe con Suerte",
        origin: "clase",
        maxUses: 1,
        used: 0,
        recovery: "ambos",
        description: "Si fallas un ataque, convi\xE9rtelo en impacto; o si fallas una prueba, tr\xE1tala como 20 en el d20. Descanso corto o largo."
      });
    }
  }
  if (classId.includes("hechicero")) {
    traits.push({
      name: "Hechicer\xEDa Innata",
      origin: "clase",
      maxUses: 2,
      used: 0,
      recovery: "largo",
      description: "Acci\xF3n adicional: ventaja en tiradas de ataque de conjuro y +1 a la CD de salvaci\xF3n durante 1 minuto. Descanso largo."
    });
    if (level >= 2) {
      traits.push({
        name: "Puntos de Hechicer\xEDa",
        origin: "clase",
        maxUses: level,
        used: 0,
        recovery: "largo",
        description: "Combustible de Metamagia y conversi\xF3n a espacios de conjuro. Descanso largo (recupera hasta PB en descanso corto)."
      });
    }
  }
  if (classId.includes("mago")) {
    traits.push({
      name: "Recuperaci\xF3n Arcana",
      origin: "clase",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: `Durante un descanso corto una vez al d\xEDa, recuperas espacios de conjuro con nivel combinado de hasta ${Math.ceil(level / 2)}.`
    });
    if (level >= 20) {
      traits.push({
        name: "Conjuros Caracter\xEDsticos",
        origin: "clase",
        maxUses: 2,
        used: 0,
        recovery: "ambos",
        description: "Lanza cada uno de tus 2 conjuros caracter\xEDsticos de nivel 3 una vez gratis. Descanso corto o largo."
      });
    }
  }
  if (classId.includes("brujo")) {
    if (subId.includes("celestial") && level >= 3) {
      traits.push({
        name: "Dados de Luz Curativa (d6)",
        origin: "clase",
        maxUses: 1 + level,
        used: 0,
        recovery: "largo",
        description: `Reserva de ${1 + level}d6 para sanar a criaturas aliadas como acci\xF3n adicional a 18 m (m\xE1x ${chaMod}d6 por uso). Descanso largo.`
      });
    }
    if (level >= 11) {
      const arcanumCount = level >= 17 ? 4 : level >= 15 ? 3 : level >= 13 ? 2 : 1;
      traits.push({
        name: "Arcano M\xEDstico (Conjuros 6-9)",
        origin: "clase",
        maxUses: arcanumCount,
        used: 0,
        recovery: "largo",
        description: "Lanza cada uno de tus conjuros de Arcano M\xEDstico una vez sin gastar espacio de conjuro. Descanso largo."
      });
    }
  }
  const speciesId = (character.speciesId || "").toLowerCase();
  const sublineageId = (character.sublineageId || "").toLowerCase();
  if (speciesId.includes("aasimar")) {
    traits.push({
      name: "Manos Curativas",
      origin: "especie",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: `Acci\xF3n m\xE1gica: tocas a una criatura para sanarle ${pb}d4 puntos de golpe. Descanso largo.`
    });
    if (level >= 3) {
      traits.push({
        name: "Revelaci\xF3n Celestial",
        origin: "especie",
        maxUses: 1,
        used: 0,
        recovery: "largo",
        description: "Acci\xF3n adicional: Alas Radiantes (vuelo 9 m), Resplandor Interior (da\xF1o radiante en \xE1rea) o Sudario Necr\xF3tico durante 1 min. Descanso largo."
      });
    }
  }
  if (speciesId.includes("orco")) {
    traits.push({
      name: "Adrenalina",
      origin: "especie",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: `Acci\xF3n adicional: realizas la acci\xF3n de Correr y ganas ${pb} PG temporales. Descanso largo.`
    });
    traits.push({
      name: "Resistencia Incansable",
      origin: "especie",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: "Al caer a 0 PG sin morir, caes a 1 PG en su lugar. Descanso largo."
    });
  }
  if (speciesId.includes("goliat") || speciesId.includes("goliath")) {
    traits.push({
      name: "Herencia de Gigante (Fortaleza de piedra)",
      origin: "especie",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: "Reacci\xF3n al recibir da\xF1o: reduces el da\xF1o en 1d12 + mod Constituci\xF3n. Descanso largo."
    });
  }
  if (speciesId.includes("draconido") || speciesId.includes("drac\xF3nido") || speciesId.includes("dragonborn")) {
    traits.push({
      name: "Arma de Aliento",
      origin: "especie",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: "Exhalaci\xF3n destructiva elemental en cono de 4,5 m o l\xEDnea de 9 m (sustituye un ataque). Descanso largo."
    });
    if (level >= 5) {
      traits.push({
        name: "Vuelo Drac\xF3nico",
        origin: "especie",
        maxUses: 1,
        used: 0,
        recovery: "largo",
        description: "Acci\xF3n adicional: despliegas alas espectrales ganando velocidad de vuelo de 18 m durante 10 minutos. Descanso largo."
      });
    }
  }
  if (speciesId.includes("gnomo") && (sublineageId.includes("bosque") || speciesId.includes("bosque"))) {
    traits.push({
      name: "Hablar con Animales (Innato)",
      origin: "especie",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: "Lanzas Hablar con Animales sin consumir espacio de conjuro. Descanso largo."
    });
  }
  if (speciesId.includes("tiflin") || speciesId.includes("tiefling")) {
    const uses = level >= 5 ? 3 : level >= 3 ? 2 : 1;
    traits.push({
      name: "Magia de Legado Planar",
      origin: "especie",
      maxUses: uses,
      used: 0,
      recovery: "largo",
      description: "Lanzas gratis los conjuros de tu legado infernal (nv 1, nv 3 y nv 5) una vez al d\xEDa. Descanso largo."
    });
  }
  if (speciesId.includes("elfo") && (sublineageId.includes("drow") || sublineageId.includes("bosque") || sublineageId.includes("alto"))) {
    if (level >= 3) {
      traits.push({
        name: "Magia \xC9lfica Innata",
        origin: "especie",
        maxUses: level >= 5 ? 2 : 1,
        used: 0,
        recovery: "largo",
        description: "Lanzamiento gratuito de conjuros de tu linaje \xE9lfico. Descanso largo."
      });
    }
  }
  const featKeys = [];
  if (character.originFeat)
    featKeys.push(character.originFeat);
  if (character.speciesOriginFeat)
    featKeys.push(character.speciesOriginFeat);
  if (character.customBackground?.originFeat)
    featKeys.push(character.customBackground.originFeat);
  const bgDef = DND55_BACKGROUNDS.find((b) => b.id === character.backgroundId);
  if (bgDef?.originFeat)
    featKeys.push(bgDef.originFeat);
  getCharacterAsiLevels(character.classId).forEach(({ lvl, key }) => {
    if ((character.level || 1) >= lvl) {
      const choice = character[key];
      if (choice?.featId)
        featKeys.push(choice.featId);
    }
  });
  const hasFeat = (query) => {
    const q = query.toLowerCase().trim();
    return featKeys.some((f) => {
      if (!f)
        return false;
      const s = f.toLowerCase().trim();
      return s === q || s.includes(q) || q.includes(s);
    });
  };
  if (hasFeat("afortunado") || hasFeat("lucky")) {
    traits.push({
      name: "Puntos de Suerte (Afortunado)",
      origin: "dotes",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: `Tienes ${pb} puntos de suerte. Gasta 1 punto para obtener ventaja en una tirada de d20 o imponer desventaja a una tirada de ataque contra ti. Descanso largo.`
    });
  }
  if (hasFeat("musico") || hasFeat("m\xFAsico") || hasFeat("musician")) {
    traits.push({
      name: "M\xFAsico (Inspiraci\xF3n a Aliados)",
      origin: "dotes",
      maxUses: pb,
      used: 0,
      recovery: "ambos",
      description: `Al finalizar un descanso corto o largo, tocas m\xFAsica para otorgar Inspiraci\xF3n Heroica a hasta ${pb} aliados. Descanso corto o largo.`
    });
  }
  if (hasFeat("iniciado_magia") || hasFeat("iniciado en magia") || hasFeat("magic initiate") || hasFeat("iniciado")) {
    traits.push({
      name: "Iniciado en Magia (Conjuro Nv 1 Gratuito)",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: "Lanzas el conjuro de nivel 1 aprendido de Iniciado en Magia una vez al d\xEDa sin gastar espacio de conjuro. Descanso largo."
    });
  }
  if (hasFeat("inspiring_leader") || hasFeat("lider inspirador") || hasFeat("l\xEDder inspirador")) {
    traits.push({
      name: "L\xEDder Inspirador",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "ambos",
      description: `Tras un descanso corto o largo, pronuncias un discurso que otorga ${level + pb} PG temporales a hasta 6 aliados. Descanso corto o largo.`
    });
  }
  if (hasFeat("chef")) {
    traits.push({
      name: "Golosinas de Chef",
      origin: "dotes",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: `Preparas ${pb} golosinas especiales tras un descanso largo. Comer una como acci\xF3n adicional otorga ${pb} PG temporales. Descanso largo.`
    });
  }
  if (hasFeat("fey_touched") || hasFeat("tocado por las hadas") || hasFeat("hadas")) {
    traits.push({
      name: "Paso Brumoso Gratuito (Tocado por las Hadas)",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: "Lanzas Paso Brumoso una vez al d\xEDa sin gastar espacio de conjuro. Descanso largo."
    });
    traits.push({
      name: "Conjuro Nv 1 Gratuito (Tocado por las Hadas)",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: "Lanzas el conjuro de adivinaci\xF3n o encantamiento de nivel 1 elegido una vez sin gastar espacio de conjuro. Descanso largo."
    });
  }
  if (hasFeat("shadow_touched") || hasFeat("tocado por las sombras") || hasFeat("sombras")) {
    traits.push({
      name: "Invisibilidad Gratuita (Tocado por las Sombras)",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: "Lanzas Invisibilidad una vez al d\xEDa sin gastar espacio de conjuro. Descanso largo."
    });
    traits.push({
      name: "Conjuro Nv 1 Gratuito (Tocado por las Sombras)",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: "Lanzas el conjuro de ilusi\xF3n o nigromancia de nivel 1 elegido una vez sin gastar espacio de conjuro. Descanso largo."
    });
  }
  if (hasFeat("telepathic") || hasFeat("telep\xE1tico") || hasFeat("telepatico")) {
    traits.push({
      name: "Detectar Pensamientos (Telep\xE1tico)",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "largo",
      description: "Lanzas Detectar Pensamientos una vez al d\xEDa sin gastar espacio de conjuro ni componentes. Descanso largo."
    });
  }
  if (hasFeat("chispa_fuego_hechizado") || hasFeat("chispa_fuego_magico") || hasFeat("spellfire")) {
    traits.push({
      name: "Llama Sagrada Adicional (Fuego M\xE1gico)",
      origin: "dotes",
      maxUses: pb,
      used: 0,
      recovery: "largo",
      description: `Lanzas el truco Llama Sagrada como acci\xF3n adicional hasta ${pb} veces al d\xEDa. Descanso largo.`
    });
  }
  if (hasFeat("adepto_metamagico") || hasFeat("metamagic")) {
    traits.push({
      name: "Puntos de Hechicer\xEDa (Adepto Metam\xE1gico)",
      origin: "dotes",
      maxUses: 2,
      used: 0,
      recovery: "largo",
      description: "Dispones de 2 Puntos de Hechicer\xEDa para aplicar tus opciones de Metamagia. Descanso largo."
    });
  }
  if (hasFeat("tocado_por_mithral") || hasFeat("mythral")) {
    traits.push({
      name: "Surgimiento de la Trama (Tocado por Mithral)",
      origin: "dotes",
      maxUses: 1,
      used: 0,
      recovery: "ambos",
      description: "Canalizas la Trama pura para maximizar un dado de curaci\xF3n o infligir 2d6 extra de da\xF1o de fuerza. Descanso corto o largo."
    });
  }
  if (hasFeat("dote_epica_favor_tymora") || hasFeat("tymora")) {
    traits.push({
      name: "Fortuna Divina de Tymora",
      origin: "dotes",
      maxUses: 3,
      used: 0,
      recovery: "largo",
      description: "Gasta 1 uso para convertir autom\xE1ticamente una tirada de d20 tuya o de un aliado en un 20 natural. Descanso largo."
    });
  }
  if (character.specialAbilities && character.specialAbilities.length > 0) {
    character.specialAbilities.forEach((ab) => {
      if (ab.maxUses && ab.maxUses > 0) {
        traits.push({
          name: ab.name,
          origin: "dones",
          maxUses: ab.maxUses,
          used: ab.used || 0,
          recovery: ab.recharge === "Descanso Corto" ? "ambos" : "largo",
          description: `[${ab.source || "Don"}] ${ab.description}`
        });
      }
    });
  }
  return traits;
}

function getSpeciesName(id) {
  if (!id) return "Humano";
  const found = DND55_SPECIES.find((s) => s.id === id || s.name.toLowerCase() === id.toLowerCase());
  return found ? found.name : id.charAt(0).toUpperCase() + id.slice(1);
}

function getSublineageName(speciesId, sublineageId) {
  if (!sublineageId) return "";
  const species = DND55_SPECIES.find((s) => s.id === speciesId || s.name.toLowerCase() === (speciesId || "").toLowerCase());
  const found = species?.sublineages?.find((sub) => sub.id === sublineageId || sub.name.toLowerCase() === sublineageId.toLowerCase());
  return found ? found.name : sublineageId;
}

function getBackgroundName(idOrChar, customBackground) {
  if (idOrChar && typeof idOrChar === 'object') {
    const cBg = idOrChar.customBackground;
    if (cBg?.name) return cBg.name;
    if (idOrChar.customBackgroundName) return idOrChar.customBackgroundName;
    if (idOrChar.backgroundName) return idOrChar.backgroundName;
    return getBackgroundName(idOrChar.backgroundId, cBg);
  }
  const id = idOrChar;
  if (customBackground?.name) return customBackground.name;
  if (typeof customBackground === 'string' && customBackground.trim()) return customBackground.trim();
  if (!id || id === "personalizado") return (customBackground?.name || "Trasfondo Personalizado");
  const found = DND55_BACKGROUNDS.find((b) => b.id === id || b.name.toLowerCase() === id.toLowerCase());
  return found ? found.name : id.charAt(0).toUpperCase() + id.slice(1);
}

function getClassName(id) {
  if (!id) return "Aventurero";
  const found = DND55_CLASSES.find((c) => c.id === id || c.name.toLowerCase() === id.toLowerCase());
  return found ? found.name : id.charAt(0).toUpperCase() + id.slice(1);
}

function getSubclassName(id) {
  if (!id) return "";
  const lowerId = String(id).toLowerCase();
  const found = DND55_ALL_48_SUBCLASSES.find((sc) => sc.id === id || sc.legacyId === id || sc.name.toLowerCase() === lowerId);
  return found ? found.name : id.charAt(0).toUpperCase() + id.slice(1);
}

function getArmorName(id) {
  if (!id || id === "none" || id === "sin_armadura") return "Sin Armadura";
  const found = DND55_ARMORS.find((a) => a.id === id || a.name.toLowerCase() === id.toLowerCase());
  return found ? found.name : id;
}

function getWeaponName(id) {
  if (!id) return "Desarmado";
  const found = DND55_WEAPONS.find((w) => w.id === id || w.name.toLowerCase() === id.toLowerCase());
  return found ? found.name : id;
}

export {
  ABILITY_LABELS,
  DND55_ARMORS,
  DND55_ARTIFACT_PROPERTIES,
  DND55_BACKGROUNDS,
  DND55_CANONICAL_SPELLS,
  DND55_CLASSES,
  DND55_CLASS_FEATURE_CHOICES,
  DND55_FIGHTING_STYLES,
  DND55_GENERAL_FEATS,
  DND55_MULTICLASS_RULES,
  DND55_ORIGIN_FEATS,
  DND55_PRESET_ITEMS,
  DND55_SAMPLE_SPECIAL_ABILITIES,
  DND55_SCROLL_LEVEL_STATS,
  DND55_SKILLS,
  DND55_SPECIES,
  DND55_STANDARD_LANGUAGES,
  DND55_SUBCLASSES,
  DND55_TOOL_PROFICIENCIES,
  getBackgroundToolGroups,
  DND55_WEAPONS,
  STANDARD_ARRAY,
  WEAPON_MASTERY_DESCRIPTIONS,
  calculateArmorClass,
  calculateCarryingCapacity,
  calculateFinalAbilityScores,
  calculateAbilityScoresBreakdown,
  calculateHitPoints,
  calculateInitiative,
  calculateSpeed,
  calculateMonkSaveDc,
  calculatePassiveInsight,
  calculatePassiveInsightDetails,
  calculatePassiveInvestigation,
  calculatePassiveInvestigationDetails,
  calculatePassivePerception,
  calculatePassivePerceptionDetails,
  calculateSavingThrows,
  calculateSkills,
  calculateSpellcasting,
  characterHasFeat,
  characterQualifiesForFightingStyle,
  findCanonicalWeapon,
  formatMetricDescription,
  formatMetricDistance,
  formatModifier,
  getAbilityModifier,
  getAbilityShortName,
  getAbilityFullName,
  getActiveStatModifiers,
  getCharacterAsiLevels,
  getCharacterSpellSlots,
  getClassFeatureChoiceDescription,
  getClassFeatureChoiceTitle,
  getClassFeatureChoices,
  getConsumableTraitsForCharacter,
  getInnateSpellsForCharacter,
  getFeatById,
  getFeatName,
  getResolvedFeatsForCharacter,
  getProficiencyBonus,
  getCharacterProficiencies,
  getResolvedCharacterFeatures,
  getSpellAttackInfo,
  getValidSubclassDefinition,
  sanitizeCharacter,
  sanitizeCharacterFeatureChoices,
  sanitizeSpellName,
  getSpeciesName,
  getSublineageName,
  getBackgroundName,
  getClassName,
  getSubclassName,
  getArmorName,
  getWeaponName,
  getCharacterClasses,
  getClassLevel,
  getCharacterTotalLevel,
  getCharacterFullClassTitle,
  getCharacterLevelProgression,
  getCharacterHitDicePool,
  checkMulticlassPrerequisites,
  DND55_CLASS_STARTING_EQUIPMENT,
  getClassStartingEquipment,
  getCharacterVisionSense,
  getMaxAllowedExpertiseCount,
  DND55_XP_THRESHOLDS,
  getMinXpForLevel,
  getNextLevelXp
};
