const DND55_ALL_48_SUBCLASSES = [
  // ==========================================
  // --- GUERRERO (FIGHTER - Niveles 3, 7, 10, 15, 18) ---
  // ==========================================
  {
    id: "campeon",
    classId: "guerrero",
    name: "Campe\xF3n",
    description: "Poder\xEDo f\xEDsico implacable. Cr\xEDtico mejorado en 19-20, Atleta Extraordinario, Inspiraci\xF3n Heroica en combate y regeneraci\xF3n.",
    features: [
      { level: 3, name: "Cr\xEDtico Mejorado (19-20)", description: "Tus tiradas de ataque con armas logran un golpe cr\xEDtico con un resultado de 19 o 20 en el d20." },
      { level: 3, name: "Atleta Extraordinario", description: "Ganas ventaja en tiradas de iniciativa y pruebas de Fuerza (Atletismo). Adem\xE1s, tu distancia de salto con carrerilla aumenta en metros igual a tu modificador de Fuerza." },
      { level: 7, name: "Inspiraci\xF3n Heroica Notable", description: "Al inicio de cada uno de tus turnos durante un combate, si no posees Inspiraci\xF3n Heroica, la obtienes de forma autom\xE1tica." },
      { level: 7, name: "Estilo de Combate Adicional", description: "Eliges un Estilo de Combate adicional de la lista de opciones de guerrero." },
      { level: 10, name: "Cr\xEDtico Heroico", description: "Cada vez que asestas un golpe cr\xEDtico, puedes moverte hasta la mitad de tu velocidad de movimiento sin provocar ataques de oportunidad." },
      { level: 15, name: "Cr\xEDtico Superior (18-20)", description: "Tus tiradas de ataque con armas logran un golpe cr\xEDtico con un resultado de 18, 19 o 20 en el d20." },
      { level: 18, name: "Superviviente", description: "Al inicio de cada uno de tus turnos, si tienes menos de la mitad de tus PG m\xE1ximos y no tienes 0 PG, recuperas una cantidad de PG igual a 5 + tu modificador de Constituci\xF3n." }
    ]
  },
  {
    id: "maestro_batalla",
    classId: "guerrero",
    name: "Maestro de Batalla",
    description: "Estratega marcial supremo. Utiliza dados de superioridad (d8->d10->d12) y maniobras t\xE1cticas (Derribar, Finta, Parada, Desarmar).",
    features: [
      { level: 3, name: "Superioridad en Combate (4 dados d8)", description: "Obtienes 4 dados de superioridad d8 para ejecutar maniobras marciales (como Derribar, Ataque Desarmante, Finta, Parada y Maniobra de Empuje). Recuperas los dados tras un descanso corto o largo." },
      { level: 3, name: "Estudiante de la Guerra", description: "Ganas competencia con un tipo de herramientas de artesano a tu elecci\xF3n y en una habilidad entre Historia, Perspicacia o Medicina." },
      { level: 7, name: "Conoce a tu Enemigo", description: "Si observas o interact\xFAas con una criatura fuera del combate durante 1 minuto, el DM te informa si es igual, superior o inferior a ti en CA, PG actuales, Fuerza, Destreza o Constituci\xF3n." },
      { level: 7, name: "Dados de Superioridad Adicionales (5 dados)", description: "Tu reserva de dados de superioridad aumenta a 5 dados d8." },
      { level: 10, name: "Superioridad Mejorada (d10)", description: "Tus dados de superioridad se convierten en d10 (en lugar de d8)." },
      { level: 15, name: "Incansable", description: "Al tirar iniciativa al inicio de un combate, si no te queda ning\xFAn dado de superioridad en tu reserva, recuperas 1 dado de inmediato." },
      { level: 15, name: "Maestr\xEDa T\xE1ctica (6 dados)", description: "Tu reserva de dados de superioridad aumenta a 6 dados d10." },
      { level: 18, name: "Superioridad Definitiva (d12)", description: "Tus dados de superioridad se convierten en d12 (en lugar de d10)." }
    ]
  },
  {
    id: "caballero_sobrenatural",
    classId: "guerrero",
    name: "Caballero Sobrenatural",
    description: "Fusi\xF3n de acero y magia de Mago. Vincula tus armas, lanza conjuros arcanos defensivos/ofensivos y combina ataques con magia.",
    features: [
      { level: 3, name: "Lanzamiento de Conjuros Arcanos", description: "Conoces trucos y conjuros de la lista de mago usando Inteligencia como caracter\xEDstica para el lanzamiento. Preparas y lanzas conjuros con espacios de conjuro." },
      { level: 3, name: "V\xEDnculo con el Arma", description: "Realizas un ritual de 1 hora para vincularte a hasta 2 armas. No puedes ser desarmado y puedes convocar el arma vinculada a tu mano como acci\xF3n adicional." },
      { level: 7, name: "Magia de Guerra", description: "Cuando realizas la acci\xF3n de Atacar en tu turno, puedes renunciar a uno de tus ataques para lanzar un truco de mago que tenga un tiempo de lanzamiento de 1 acci\xF3n." },
      { level: 10, name: "Golpe Sobrenatural", description: "Cuando impactas a una criatura con un ataque con arma, esa criatura tiene desventaja en la pr\xF3xima tirada de salvaci\xF3n que haga contra un conjuro lanzado por ti antes del final de tu siguiente turno." },
      { level: 15, name: "Carga Arcana", description: "Cuando utilizas tu rasgo de Acci\xF3n S\xFAbita, puedes teletransportarte m\xE1gicamente hasta 9 metros a un espacio libre que puedas ver, inmediatamente antes o despu\xE9s de la acci\xF3n adicional." },
      { level: 18, name: "Magia de Guerra Mejorada", description: "Cuando realizas la acci\xF3n de Atacar en tu turno, puedes renunciar a dos de tus ataques para lanzar un conjuro de mago de nivel 1 o nivel 2 con tiempo de lanzamiento de 1 acci\xF3n." }
    ]
  },
  {
    id: "guerrero_psionico",
    classId: "guerrero",
    name: "Guerrero Ps\xEDquico",
    description: "Canaliza energ\xEDa telequin\xE9tica y psi\xF3nica para potenciar golpes, levantar campos protectores y volar en combate.",
    features: [
      { level: 3, name: "Poder Psi\xF3nico (Dados d6)", description: "Albergas una reserva de dados de energ\xEDa psi\xF3nica (igual a 2 x tu bonificador de competencia, d6). Puedes usarlos para: Golpe Telequin\xE9tico (da\xF1o de fuerza extra), Campo Protector (reducir da\xF1o a ti o aliados adyacentes) y Movimiento Psi\xF3nico (mover objetos o aliados a 9 m)." },
      { level: 7, name: "Adepto Telequin\xE9tico", description: "Tus dados psi\xF3nicos pasan a ser d8. Ganas Salto Psi\xF3nico (volar el doble de tu velocidad como acci\xF3n adicional 1 vez por descanso corto o con un dado) e Impulso Telequin\xE9tico (derribar o empujar 3 m a un objetivo impactado por Golpe Telequin\xE9tico)." },
      { level: 10, name: "Guardia Protegida", description: "Cuando utilizas tu Campo Protector para proteger a otra criatura, tanto esa criatura como t\xFA obten\xE9is cobertura media (+2 a la CA y salvaciones de Destreza) hasta el inicio de tu siguiente turno." },
      { level: 15, name: "Baluarte Mental", description: "Tus dados psi\xF3nicos pasan a ser d10. Obtienes resistencia permanente al da\xF1o ps\xEDquico y eres inmune a las condiciones de Hechizado y Asustado." },
      { level: 18, name: "Telequinesis Maestra", description: "Tus dados psi\xF3nicos pasan a ser d12. Puedes lanzar el conjuro Telequinesis sin componentes verbales ni som\xE1ticos 1 vez por descanso largo (o gastando un dado de energ\xEDa psi\xF3nica)." }
    ]
  },
  {
    id: "arquero_arcano",
    classId: "guerrero",
    name: "Arquero Arcano",
    description: "Tradici\xF3n \xE9lfica de Faer\xFBn que imbuye flechas con magia arcana devastadora (flechas de sombra, r\xE1faga explosiva o teletransporte).",
    features: [
      { level: 3, name: "Disparo Arcano (2/descanso)", description: "Imbuyes tus flechas con magia arcana \xFAnica eligiendo 2 opciones de disparo arcano (como Flecha Explosiva, Flecha Penetrante, Flecha de Sombra o Flecha Buscadora)." },
      { level: 3, name: "Arquer\xEDa M\xE1gica", description: "Ganas competencia en Arcanos o Naturaleza y aprendes el truco Prestidigitaci\xF3n o Druidismo." },
      { level: 7, name: "Flecha M\xE1gica y Tiro Curvo", description: "Tus flechas no m\xE1gicas cuentan como m\xE1gicas para superar resistencias. Con Tiro Curvo, si fallas un ataque con flecha, puedes usar tu acci\xF3n adicional para redirigir la flecha a otro objetivo a 18 m." },
      { level: 10, name: "Opciones Arcanas Adicionales", description: "Aprendes dos opciones adicionales de Disparo Arcano de tu elecci\xF3n." },
      { level: 15, name: "Flecha Siempre Lista", description: "Al tirar iniciativa al inicio del combate, si no te quedan usos de Disparo Arcano, recuperas un uso de inmediato." },
      { level: 18, name: "Disparos Arcanos Mejorados", description: "El da\xF1o adicional y los efectos m\xE1gicos de todas tus opciones de Disparo Arcano aumentan dr\xE1sticamente (el da\xF1o extra pasa a 4d6)." }
    ]
  },
  {
    id: "caballero_dragon_purpura",
    classId: "guerrero",
    name: "Caballero del Drag\xF3n P\xFArpura (Banneret)",
    description: "H\xE9roe honorable y l\xEDder marcial de Cormyr. Inspira y cura a aliados cuando usa sus dotes marciales.",
    features: [
      { level: 3, name: "Caballero Conmovedor", description: "Al usar Tomar Aliento, hasta 3 aliados a 18 metros recuperan PG iguales a tu nivel de guerrero." },
      { level: 3, name: "Emisario Real", description: "Ganas competencia en Persuasi\xF3n (o Trato con Animales, Historia o Perspicacia) y duplicas tu bonificador de competencia en pruebas de Persuasi\xF3n." },
      { level: 7, name: "Ataque Coordinado", description: "Cuando utilizas tu rasgo de Acci\xF3n S\xFAbita, puedes elegir a un aliado a 18 m; ese aliado puede usar su reacci\xF3n para realizar un ataque cuerpo a cuerpo o a distancia con arma." },
      { level: 10, name: "Baluarte Inspirador", description: "Cuando utilizas tu rasgo Indomable para repetir una tirada de salvaci\xF3n fallida, un aliado a 18 m que haya fallado la misma salvaci\xF3n puede repetir su tirada con ventaja." },
      { level: 15, name: "Presencia Heroica", description: "T\xFA y todos los aliados a 9 metros sois inmunes a la condici\xF3n de Asustado mientras permanezcas consciente." },
      { level: 18, name: "L\xEDder Legendario", description: "Tu Ataque Coordinado permite que hasta dos aliados usen su reacci\xF3n para atacar, y el alcance de tu Baluarte Inspirador aumenta a 18 metros." }
    ]
  },
  {
    id: "samurai",
    classId: "guerrero",
    name: "Samur\xE1i",
    description: "Guerrero de disciplina f\xE9rrea. Esp\xEDritu combativo que otorga ventaja en todos los ataques y puntos de golpe temporales inmediatos.",
    features: [
      { level: 3, name: "Esp\xEDritu de Combate (3/descanso largo)", description: "Como acci\xF3n adicional, ganas ventaja en todas tus tiradas de ataque con arma hasta el final del turno actual y obtienes 5 PG temporales (que aumentan a 10 a nivel 10 y 15 a nivel 15)." },
      { level: 3, name: "Cortesano Elegante", description: "Ganas competencia en Historia, Perspicacia o Persuasi\xF3n y sumas tu modificador de Sabidur\xEDa a todas tus pruebas de Carisma (Persuasi\xF3n)." },
      { level: 7, name: "Mente Inquebrantable", description: "Ganas competencia en tiradas de salvaci\xF3n de Sabidur\xEDa. Si ya ten\xEDas esta competencia, ganas competencia en salvaciones de Inteligencia o Carisma." },
      { level: 10, name: "Esp\xEDritu Incansable", description: "Al tirar iniciativa al inicio de un combate, si no te queda ning\xFAn uso de Esp\xEDritu de Combate, recuperas un uso de inmediato." },
      { level: 15, name: "Golpe R\xE1pido", description: "Si tienes ventaja en una tirada de ataque con arma en tu turno, puedes renunciar a la ventaja para realizar un ataque con arma adicional como parte de la misma acci\xF3n." },
      { level: 18, name: "Fuerza ante la Muerte", description: "Si tus PG se reducen a 0, puedes usar tu reacci\xF3n para interrumpir el turno actual y realizar un turno completo de inmediato antes de caer inconsciente o morir." }
    ]
  },
  {
    id: "caballero_runico",
    classId: "guerrero",
    name: "Caballero R\xFAnico",
    description: "Inscribe runas ancestrales de gigantes en sus armas y armadura para crecer a tama\xF1o Grande y desatar poder elemental.",
    features: [
      { level: 3, name: "Talla de Runas (Gigantes)", description: "Inscribes runas de gigantes (Nube, Fuego, Escarcha, Colina o Piedra) en tu equipo para obtener beneficios pasivos y activaciones de combate tras descansos cortos o largos." },
      { level: 3, name: "Estatura de Gigante", description: "Como acci\xF3n adicional, durante 1 minuto tu tama\xF1o pasa a ser Grande, tienes ventaja en pruebas y salvaciones de Fuerza, y sumas 1d6 de da\xF1o a uno de tus ataques con arma en cada turno." },
      { level: 7, name: "Escudo R\xFAnico", description: "Cuando una criatura a 18 m recibe un impacto de ataque, puedes usar tu reacci\xF3n para forzar al atacante a repetir la tirada de d20 (usos por descanso largo igual a tu BC)." },
      { level: 10, name: "Gran Estatura", description: "El da\xF1o adicional de Estatura de Gigante aumenta a 1d8, y tu estatura aumenta de forma permanente entre 10 y 30 cm adicionales." },
      { level: 15, name: "Maestro R\xFAnico", description: "Puedes invocar el poder activo de cada una de tus runas grabadas dos veces por cada descanso corto o largo (en lugar de una sola vez)." },
      { level: 18, name: "Gigante Colosal", description: "Tu tama\xF1o en Estatura de Gigante puede ser Enorme, el da\xF1o adicional pasa a 1d10 y tu alcance cuerpo a cuerpo aumenta en 1,5 metros adicionales." }
    ]
  },
  // ==========================================
  // --- BÁRBARO (BARBARIAN - Niveles 3, 6, 10, 14) ---
  // ==========================================
  {
    id: "berserker",
    classId: "barbaro",
    name: "Bers\xE9rker",
    description: "Furia desatada y violencia pura. Inflige 2d6 extra con Frenes\xED, inmunidad mental y desata represalias brutales.",
    features: [
      { level: 3, name: "Frenes\xED Desatado", description: "Una vez por turno al impactar con un ataque con arma mientras usas Ataque Temerario en Furia, infliges un da\xF1o adicional igual a 2d6 del tipo de da\xF1o del arma." },
      { level: 3, name: "Furia Inmune", description: "Eres inmune a las condiciones de Hechizado y Asustado mientras permanezcas en Furia; si entras en furia estando bajo estos efectos, se suspenden de inmediato." },
      { level: 6, name: "Furia Inquebrantable", description: "Tu Furia protege completamente tu mente: no puedes ser pose\xEDdo ni dominado mentalmente mientras est\xE9s enfurecido." },
      { level: 10, name: "Presencia Intimidante", description: "Como acci\xF3n adicional, desatas un rugido aterrador: una criatura a 9 metros debe superar una salvaci\xF3n de Sabidur\xEDa (CD 8 + CON + BC) o quedar Asustada de ti hasta el final de tu siguiente turno." },
      { level: 14, name: "Represalia", description: "Cuando recibes da\xF1o de una criatura que se encuentre a 1,5 metros de ti, puedes usar tu reacci\xF3n para realizar un ataque cuerpo a cuerpo con arma contra esa criatura." }
    ]
  },
  {
    id: "corazon_salvaje",
    classId: "barbaro",
    name: "Coraz\xF3n Salvaje",
    description: "Sinton\xEDa con los esp\xEDritus tot\xE9micos primigenios: Oso (resistencia total), \xC1guila (correr/volar) o Lobo (ventaja aliados).",
    features: [
      { level: 3, name: "Esp\xEDritu Animal", description: "Al entrar en Furia eliges un t\xF3tem: Oso (resistencia a todo da\xF1o excepto ps\xEDquico), \xC1guila (Correr y Destrabarse como acci\xF3n adicional) o Lobo (tus aliados tienen ventaja en ataques cuerpo a cuerpo contra enemigos a 1,5 m de ti)." },
      { level: 6, name: "Aspecto de la Bestia", description: "Eliges una bendici\xF3n m\xEDstica: Oso (duplicas tu capacidad de carga y ventaja en pruebas de Fuerza para empujar), \xC1guila (visi\xF3n a 1,5 km y no sufres desventaja en Percepci\xF3n con luz tenue) o Lobo (rastreo a velocidad r\xE1pida y sigilo en viaje)." },
      { level: 10, name: "Sinton\xEDa de la Naturaleza", description: "Puedes lanzar el conjuro Comuni\xF3n con la Naturaleza como ritual sin gastar espacios de conjuro." },
      { level: 14, name: "Sinton\xEDa Tot\xE9mica Suprema", description: "En Furia obtienes: Oso (los enemigos adyacentes tienen desventaja en ataques contra cualquiera que no seas t\xFA), \xC1guila (velocidad de vuelo igual a tu velocidad al caminar mientras te muevas) o Lobo (puedes derribar a un objetivo como acci\xF3n adicional al impactarle con un ataque con arma)." }
    ]
  },
  {
    id: "arbol_del_mundo",
    classId: "barbaro",
    name: "Senda del \xC1rbol del Mundo",
    description: "Canaliza la fuerza c\xF3smica de Yggdrasil para dar vitalidad a aliados y atrapar enemigos con ra\xEDces astrales.",
    features: [
      { level: 3, name: "Vitalidad del \xC1rbol", description: "Al entrar en Furia y al inicio de cada uno de tus turnos en Furia, otorgas una cantidad de PG temporales igual a tu bonificador de competencia a ti o a un aliado visible a 3 metros." },
      { level: 6, name: "Ramas del \xC1rbol del Mundo", description: "Cuando una criatura visible a 9 metros inicia o termina su turno, puedes usar tu reacci\xF3n para manifestar ramas astrales que la obligan a superar una salvaci\xF3n de Fuerza o ser teletransportada o empujada hasta 6 metros hacia ti." },
      { level: 10, name: "Ra\xEDces Protectoras", description: "El alcance de tus ataques cuerpo a cuerpo con armas pesadas o vers\xE1tiles aumenta en 3 metros con enredaderas c\xF3smicas, y el suelo en 3 metros alrededor de tus enemigos golpeados se convierte en terreno dif\xEDcil." },
      { level: 14, name: "Viaje por las Ra\xEDces del Mundo", description: "Como acci\xF3n adicional mientras est\xE9s en Furia, puedes teletransportarte hasta 18 metros a un espacio libre, llevando contigo a hasta 4 aliados voluntarios que toques." }
    ]
  },
  {
    id: "fanatico",
    classId: "barbaro",
    name: "Fan\xE1tico Divino",
    description: "Guerrero sagrado pose\xEDdo por el fervor de una deidad, inflige da\xF1o radiante o necr\xF3tico con cada golpe y burla a la muerte.",
    features: [
      { level: 3, name: "Furia Sagrada", description: "El primer objetivo al que impactes con un ataque con arma en cada uno de tus turnos mientras est\xE9s en Furia sufre 1d6 + la mitad de tu nivel de b\xE1rbaro en da\xF1o radiante o necr\xF3tico (a tu elecci\xF3n)." },
      { level: 3, name: "Guerrero de los Dioses", description: "Los conjuros para devolverte a la vida (como Revivir o Resurrecci\xF3n) no requieren componentes materiales cuando se lanzan sobre ti." },
      { level: 6, name: "Enfoque Fan\xE1tico", description: "Si fallas una tirada de salvaci\xF3n mientras est\xE1s enfurecido, puedes volver a tirar la tirada con tu bonificador (1 vez por cada Furia)." },
      { level: 10, name: "Presencia Fan\xE1tica", description: "Como acci\xF3n adicional, desatas un grito de guerra sagrado: hasta 10 aliados a 18 metros ganan ventaja en tiradas de ataque y tiradas de salvaci\xF3n hasta el inicio de tu siguiente turno (1 vez por descanso largo)." },
      { level: 14, name: "Furia M\xE1s All\xE1 de la Muerte", description: "Tener 0 puntos de golpe no te deja inconsciente mientras dure tu Furia. Realizas tiradas de salvaci\xF3n contra la muerte normalmente, pero solo mueres si tienes 3 fallos y tu Furia concluye." }
    ]
  },
  {
    id: "bestia",
    classId: "barbaro",
    name: "Senda de la Bestia",
    description: "Esp\xEDritu salvaje que transforma su cuerpo al enfurecerse en fauces mordedoras que curan, garras tajantes dobles o cola defensiva.",
    features: [
      { level: 3, name: "Forma de la Bestia", description: "Al entrar en Furia manifiestas un arma natural: Mordisco (1d8 perforante, recuperas PG iguales a tu BC 1/turno si est\xE1s a menos de la mitad de PG), Garras (1d6 cortante, ataque adicional gratis 1/turno) o Cola (1d8 perforante, alcance 3 m y reacci\xF3n para sumar 1d8 a tu CA)." },
      { level: 6, name: "Alma Bestial", description: "Tus armas naturales cuentan como m\xE1gicas para superar resistencias. Adem\xE1s, tras cada descanso eliges una adaptaci\xF3n: trepar a tu velocidad, nadar y respirar bajo el agua, o sumar metros a tus saltos con prueba de Atletismo." },
      { level: 10, name: "Presagio Infeccioso", description: "Al impactar a una criatura con un arma natural en Furia, puedes forzarla a hacer salvaci\xF3n de Sabidur\xEDa: si falla, sufre 2d12 de da\xF1o ps\xEDquico o realiza un ataque cuerpo a cuerpo contra una criatura de tu elecci\xF3n." },
      { level: 14, name: "Llamada de la Cacer\xEDa", description: "Al entrar en Furia, otorgas 5 PG temporales a un n\xFAmero de aliados voluntarios a 9 m igual a tu modificador de Constituci\xF3n; mientras tengan esos PG, suman 1d6 de da\xF1o a un ataque por turno." }
    ]
  },
  {
    id: "magia_salvaje_barbaro",
    classId: "barbaro",
    name: "Senda de la Magia Salvaje",
    description: "B\xE1rbaros tocados por el caos del Feywild y la magia salvaje de Faer\xFBn. Desatan r\xE1fagas de luz, teletransporte o halos protectores.",
    features: [
      { level: 3, name: "Sobretensi\xF3n M\xE1gica Salvaje", description: "Al entrar en Furia, tiras 1d8 en la tabla de Magia Salvaje para desatar efectos m\xE1gicos continuos (rayos radiantes, teletransporte como acci\xF3n adicional, halos protectores de espinas o flores curativas)." },
      { level: 3, name: "Consciencia M\xE1gica", description: "Como acci\xF3n, detectas la presencia y escuela de cualquier conjuro u objeto m\xE1gico a 18 metros que no tenga cobertura total (usos por descanso largo igual a tu BC)." },
      { level: 6, name: "Infusi\xF3n Rebosante", description: "Tocas a una criatura para otorgarle un bonificador de +1d3 a tiradas de ataque y pruebas durante 10 minutos, o le permites recuperar un espacio de conjuro de nivel 1 a nivel 3 (usos por descanso largo igual a tu BC)." },
      { level: 10, name: "Reacci\xF3n Inestable", description: "Cuando recibes da\xF1o o fallas una tirada de salvaci\xF3n mientras est\xE1s en Furia, puedes usar tu reacci\xF3n para volver a tirar en la tabla de Magia Salvaje sustituyendo de inmediato el efecto anterior." },
      { level: 14, name: "Caos Desatado", description: "Cada vez que tires en la tabla de Magia Salvaje al enfurecerte, tiras dos dados y puedes elegir cualquiera de los dos efectos. Si sacas n\xFAmeros iguales, puedes elegir libremente cualquier efecto de la tabla." }
    ]
  },
  {
    id: "guardian_ancestral",
    classId: "barbaro",
    name: "Guardi\xE1n Ancestral",
    description: "Guerrero protegido por los esp\xEDritus de sus antepasados que hostigan al primer enemigo golpeado e imponen desventaja contra sus aliados.",
    features: [
      { level: 3, name: "Protectores Ancestrales", description: "El primer enemigo al que impactes con un ataque con arma en tu turno queda marcado por esp\xEDritus: tiene desventaja en tiradas de ataque contra cualquiera que no seas t\xFA, y tus aliados tienen resistencia a todo el da\xF1o que inflija esa criatura." },
      { level: 6, name: "Escudo de los Esp\xEDritus", description: "Como reacci\xF3n cuando una criatura aliada visible a 9 metros recibe da\xF1o, invocas a tus ancestros para reducir ese da\xF1o en 2d6 (aumenta a 3d6 a nivel 10 y 4d6 a nivel 14)." },
      { level: 10, name: "Consulta a los Esp\xEDritus", description: "Puedes lanzar los conjuros Augurio o Clarividencia como rituales sin gastar espacios de conjuro ni requerir componentes materiales." },
      { level: 14, name: "Esp\xEDritus Vengativos", description: "Cuando utilizas tu Escudo de los Esp\xEDritus para reducir el da\xF1o infligido a un aliado, el atacante sufre una cantidad de da\xF1o de Fuerza igual a la cantidad de da\xF1o reducida por tus esp\xEDritus." }
    ]
  },
  // ==========================================
  // --- PÍCARO (ROGUE - Niveles 3, 9, 13, 17) ---
  // ==========================================
  {
    id: "ladron",
    classId: "picaro",
    name: "Ladr\xF3n",
    description: "Maestro de la velocidad y los objetos: acci\xF3n adicional para usar objetos o abrir cerraduras, trepar sin coste y sinton\xEDa m\xE1gica ampliada.",
    features: [
      { level: 3, name: "Manos R\xE1pidas", description: "Puedes usar la acci\xF3n adicional de tu Acci\xF3n Astuta para realizar una prueba de Destreza (Juego de Manos), utilizar tus herramientas de ladr\xF3n para abrir cerraduras o desactivar trampas, o realizar la acci\xF3n de Usar un Objeto." },
      { level: 3, name: "Trabajo de Segundo Piso", description: "Escalar no te cuesta movimiento adicional y tu distancia de salto con carrerilla se calcula sumando tu modificador de Destreza en lugar de Fuerza." },
      { level: 9, name: "Sigilo Supremo", description: "Ganas ventaja en todas tus pruebas de Destreza (Sigilo) en cualquier turno en el que no te muevas m\xE1s de la mitad de tu velocidad de movimiento." },
      { level: 13, name: "Usar Dispositivo M\xE1gico", description: "Ignoras todos los requisitos de clase, especie, alineamiento y nivel al utilizar cualquier objeto o pergamino m\xE1gico. Adem\xE1s, puedes sintonizarte con hasta 4 objetos m\xE1gicos a la vez." },
      { level: 17, name: "Reflejos de Ladr\xF3n", description: "Puedes realizar dos turnos completos durante el primer asalto de cualquier combate (el primero en tu iniciativa normal y el segundo en tu iniciativa menos 10)." }
    ]
  },
  {
    id: "asesino",
    classId: "picaro",
    name: "Asesino",
    description: "Letalidad desde las sombras: ventaja en iniciativa, da\xF1o devastador contra enemigos que no hayan actuado y disfraz maestro.",
    features: [
      { level: 3, name: "Asesinato", description: "Tienes ventaja en tiradas de ataque contra cualquier criatura que a\xFAn no haya actuado en el combate actual. Adem\xE1s, cualquier impacto de ataque que asestes contra una criatura sorprendida se convierte autom\xE1ticamente en un golpe cr\xEDtico." },
      { level: 3, name: "Herramientas de Asesino", description: "Ganas competencia con el kit de envenenador y el kit de disfraz." },
      { level: 9, name: "Infiltraci\xF3n Experta", description: "Puedes crear identidades falsas impecables con trasfondo, historia y documentaci\xF3n tras 7 d\xEDas de trabajo y 25 po de gastos." },
      { level: 13, name: "Impostor Magistral", description: "Puedes imitar infaliblemente el habla, caligraf\xEDa, tono de voz y conducta de otra persona tras estudiarla durante al menos 3 horas." },
      { level: 17, name: "Golpe Mortal", description: "Cuando impactas a una criatura sorprendida con un ataque, la criatura debe superar una salvaci\xF3n de Constituci\xF3n (CD 8 + DES + BC) o duplicar todo el da\xF1o infligido por el ataque." }
    ]
  },
  {
    id: "embaucador_arcano",
    classId: "picaro",
    name: "Embaucador Arcano",
    description: "Combina sigilo con conjuros arcanos de Ilusi\xF3n y Encantamiento, y una Mano de Mago invisible para robar a distancia.",
    features: [
      { level: 3, name: "Lanzamiento de Conjuros de Embaucador", description: "Conoces trucos y conjuros de la lista de mago (enfocados en Ilusi\xF3n y Encantamiento) usando Inteligencia como caracter\xEDstica de conjuro." },
      { level: 3, name: "Mano de Mago Furtiva", description: "Aprendes el truco Mano de Mago: puedes hacerla invisible y usar tu Acci\xF3n Astuta para abrir cerraduras, desactivar trampas o robar objetos a una distancia de hasta 9 metros." },
      { level: 9, name: "Emboscada M\xE1gica", description: "Si est\xE1s oculto de una criatura cuando lanzas un conjuro sobre ella, esa criatura tiene desventaja en cualquier tirada de salvaci\xF3n que haga contra el conjuro en ese turno." },
      { level: 13, name: "Distracci\xF3n Vers\xE1til", description: "Puedes usar tu acci\xF3n adicional para distraer a un enemigo con tu Mano de Mago a 1,5 m de \xE9l, otorg\xE1ndote ventaja en tiradas de ataque contra esa criatura hasta el final de tu turno." },
      { level: 17, name: "Ladr\xF3n de Conjuros", description: "Como reacci\xF3n cuando una criatura lanza un conjuro que te apunte o te incluya en su \xE1rea, puedes forzarla a hacer una salvaci\xF3n con su caracter\xEDstica m\xE1gica: si falla, niegas el conjuro sobre ti y puedes lanzarlo t\xFA durante las siguientes 8 horas." }
    ]
  },
  {
    id: "rebanaalmas",
    legacyId: "cuchilla_del_alma",
    classId: "picaro",
    name: "Rebanaalmas",
    aliases: ["Cuchilla del Alma", "Soulknife"],
    description: "Materializa cuchillas de pura energ\xEDa ps\xEDquica para apu\xF1alar a distancia o en combate cuerpo a cuerpo y telepat\xEDa de grupo.",
    features: [
      { level: 3, name: "Cuchillas Ps\xEDquicas (1d6 ps\xEDquico)", description: "Manifiestas dagas de energ\xEDa ps\xEDquica pura al atacar (1d6 ps\xEDquico, sutil, arrojadiza 18 m). Puedes realizar un segundo ataque con acci\xF3n adicional infligiendo 1d4 ps\xEDquico." },
      { level: 3, name: "Poder Psi\xF3nico", description: "Reserva de dados psi\xF3nicos d6 (igual a 2 x BC) para potenciar tiradas de habilidad fallidas (Habilidad Psi\xF3nica) y establecer un enlace mental telep\xE1tico con tus aliados (Enlace Ps\xEDquico)." },
      { level: 9, name: "Cuchillas del Alma Mejoradas", description: "Tus dados psi\xF3nicos pasan a d8. Ganas Teletransporte Ps\xEDquico (arrojas tu cuchilla hasta 18 m y te teletransportas a su impacto) y Golpe Guiado Psi\xF3nico (sumas tu dado psi\xF3nico a un ataque fallido para convertirlo en impacto)." },
      { level: 13, name: "Velo Ps\xEDquico", description: "Como acci\xF3n, te vuelves invisible durante 1 hora o hasta que inflijas da\xF1o o fuerces una tirada de salvaci\xF3n (1 uso gratis por descanso largo o gastando 1 dado psi\xF3nico)." },
      { level: 17, name: "Desgarrar la Mente", description: "Tus dados psi\xF3nicos pasan a d10. Al asestar Ataque Furtivo con tus cuchillas ps\xEDquicas, fuerzas al objetivo a superar una salvaci\xF3n de Sabidur\xEDa o quedar Aturdido durante 1 minuto." }
    ]
  },
  {
    id: "espadachin",
    classId: "picaro",
    name: "Espadach\xEDn (Swashbuckler)",
    description: "Duelista carism\xE1tico y veloz de la Costa de la Espada. Suma Carisma a la iniciativa y usa Ataque Furtivo en duelos uno contra uno.",
    features: [
      { level: 3, name: "Paso Elegante (Fancy Footwork)", description: "Durante tu turno, si realizas un ataque cuerpo a cuerpo contra una criatura, esa criatura no puede realizar ataques de oportunidad contra ti durante el resto del turno." },
      { level: 3, name: "Audacia Temeraria (Rakish Audacity)", description: "Sumas tu modificador de Carisma a tus tiradas de iniciativa y puedes usar Ataque Furtivo contra un enemigo si est\xE1s a 1,5 metros de \xE9l y no tienes m\xE1s criaturas adyacentes a ti, sin necesidad de ventaja." },
      { level: 9, name: "Garbo Cautivador", description: "Como acci\xF3n realizas una prueba de Carisma (Persuasi\xF3n) contra la Perspicacia de un objetivo: si es pac\xEDfico queda Hechizado durante 1 minuto; si es hostil, sufre desventaja en ataques contra cualquiera que no seas t\xFA." },
      { level: 13, name: "Maniobra Elegante", description: "Como acci\xF3n adicional, obtienes ventaja en tu pr\xF3xima prueba de Destreza (Acrobacias) o Fuerza (Atletismo) que realices durante este turno." },
      { level: 17, name: "Maestro Duelista", description: "Si fallas una tirada de ataque con arma en tu turno, puedes volver a realizar la tirada de ataque con ventaja (1 vez por descanso corto o largo)." }
    ]
  },
  {
    id: "vastago_tres_muertos",
    classId: "picaro",
    name: "V\xE1stago de la Tr\xEDada de los Tres Muertos (H\xE9roes de Faer\xFBn)",
    description: "Asesino consagrado a la temible Tr\xEDada Oscura de Faer\xFBn: Bane, Bhaal y Myrkul. Teletransporte contra enemigos ensangrentados y letalidad brutal.",
    features: [
      { level: 3, name: "Sed de Sangre de Bhaal", description: "Como reacci\xF3n cuando una criatura a 9 metros queda ensangrentada (con la mitad de sus PG m\xE1ximos o menos), te teletransportas m\xE1gicamente a un espacio adyacente a ella y realizas un ataque cuerpo a cuerpo de inmediato." },
      { level: 3, name: "Lealtad Pavorosa", description: "Eliges devoci\xF3n: Bane (competencia en Intimidaci\xF3n y ventaja en pruebas de Fuerza para derribar o agarrar), Bhaal (+1d6 al Ataque Furtivo contra objetivos heridos) o Myrkul (truco Toque Helado y resistencia a da\xF1o necr\xF3tico)." },
      { level: 9, name: "Sentencia del Tirano (Bane)", description: "Al asestar Ataque Furtivo, el objetivo debe superar salvaci\xF3n de Carisma o quedar Asustado de ti e incapaz de acercarse voluntariamente durante 1 minuto." },
      { level: 13, name: "Mortaja de Myrkul", description: "Como reacci\xF3n al recibir da\xF1o, te vuelves incorp\xF3reo reduciendo el da\xF1o a la mitad e infliges 3d6 de da\xF1o necr\xF3tico al atacante si est\xE1 a 9 metros." },
      { level: 17, name: "Avatar del Heraldo Oscuro", description: "Canalizas la forma de los Tres Muertos: tus ataques logran golpe cr\xEDtico con 18-20, eres inmune al da\xF1o necr\xF3tico y miedo, y al abatir un humanoide puedes alzarlo como sirviente zombi permanente bajo tu mando." }
    ]
  },
  {
    id: "fantasma",
    classId: "picaro",
    name: "Fantasma (Phantom)",
    description: "Vinculado a los esp\xEDritus de Faer\xFBn y el Reino de los Muertos de Kelemvor. Recolecta almas en baratijas y desata da\xF1o necr\xF3tico.",
    features: [
      { level: 3, name: "Susurros de Ultratumba", description: "Al terminar un descanso corto o largo, eliges una habilidad o herramienta para ganar competencia m\xE1gica temporal gracias a los esp\xEDritus hasta tu pr\xF3ximo descanso." },
      { level: 3, name: "Lamentos de la Tumba", description: "Al infligir Ataque Furtivo a un objetivo, desatas lamentos espectrales que causan la mitad de tus dados de Ataque Furtivo en da\xF1o necr\xF3tico a una segunda criatura que veas a 9 metros." },
      { level: 9, name: "Fichas de Almas", description: "Como reacci\xF3n cuando una criatura muere a 9 m, capturas su alma en una baratija de alma (m\xE1ximo igual a tu BC): te otorgan ventaja en salvaciones de Muerte y Constituci\xF3n y permiten interrogar al esp\xEDritu." },
      { level: 13, name: "Marcha Fantasmal", description: "Como acci\xF3n adicional gastas una ficha de alma para volverte incorp\xF3reo: obtienes velocidad de vuelo de 3 m, puedes atravesar criaturas y objetos s\xF3lidos y los ataques contra ti tienen desventaja." },
      { level: 17, name: "Amigo de la Muerte", description: "Al inicio de tu turno en combate, si no posees ninguna ficha de alma, obtienes una de forma autom\xE1tica. Adem\xE1s, tus Lamentos de la Tumba da\xF1an tanto al primer como al segundo objetivo." }
    ]
  },
  {
    id: "inquisitivo",
    classId: "picaro",
    name: "Inquisitivo",
    description: "Detective agudo e investigador de misterios en Aguasprofundas y Puerta de Baldur. Descifra t\xE1cticas enemigas con Perspicacia.",
    features: [
      { level: 3, name: "Ojo para el Detalle", description: "Como acci\xF3n adicional puedes hacer una prueba de Sabidur\xEDa (Percepci\xF3n) para detectar criaturas ocultas o Inteligencia (Investigaci\xF3n) para descifrar pistas." },
      { level: 3, name: "Perspicacia Luchadora", description: "Como acci\xF3n adicional enfrentas tu Sabidur\xEDa (Perspicacia) contra el Carisma (Enga\xF1o) de un objetivo; si ganas, puedes usar Ataque Furtivo contra \xE9l durante 1 minuto sin necesidad de ventaja." },
      { level: 9, name: "Ojo Cl\xEDnico", description: "Tienes ventaja en todas las pruebas de Sabidur\xEDa (Percepci\xF3n) e Inteligencia (Investigaci\xF3n) si no te mueves m\xE1s de la mitad de tu velocidad de movimiento en ese turno." },
      { level: 13, name: "Sentidos Infalibles", description: "Detectas la presencia de ilusiones m\xE1gicas, metamorfos no transformados y criaturas bajo efectos de encantamiento en un radio de 9 metros sin necesidad de realizar tiradas." },
      { level: 17, name: "Ojo para la Debilidad", description: "Mientras tu Perspicacia Luchadora est\xE9 activa sobre un objetivo, tu da\xF1o de Ataque Furtivo contra esa criatura aumenta en 3d6 dados adicionales." }
    ]
  },
  // ==========================================
  // --- MAGO (WIZARD - Niveles 3, 6, 10, 14) ---
  // ==========================================
  {
    id: "evocador",
    classId: "mago",
    name: "Escuela de Evocaci\xF3n",
    description: "Devastaci\xF3n elemental. Esculpe conjuros para proteger a tus aliados de tus propias bolas de fuego y rel\xE1mpagos.",
    features: [
      { level: 3, name: "Esculpir Conjuros", description: "Cuando lanzas un conjuro de evocaci\xF3n de \xE1rea, puedes elegir un n\xFAmero de criaturas igual a 1 + nivel del conjuro: superan autom\xE1ticamente la tirada de salvaci\xF3n y no sufren ning\xFAn da\xF1o si normalmente sufrir\xEDan la mitad." },
      { level: 6, name: "Truco Potente", description: "Tus trucos de da\xF1o son implacables: cuando una criatura supera la tirada de salvaci\xF3n contra uno de tus trucos, sufre la mitad del da\xF1o en lugar de no recibir da\xF1o alguno." },
      { level: 10, name: "Evocaci\xF3n Potenciada", description: "Sumas tu modificador de Inteligencia (m\xEDnimo +1) a una tirada de da\xF1o de cualquier conjuro de evocaci\xF3n de mago que lances." },
      { level: 14, name: "Sobrecarga M\xE1gica", description: "Puedes maximizar todo el da\xF1o de un conjuro de mago de nivel 1 a 5. El primer uso no tiene penalizaci\xF3n; cada uso adicional antes de un descanso largo te causa 2d12 de da\xF1o necr\xF3tico por nivel del conjuro." }
    ]
  },
  {
    id: "abjurador",
    classId: "mago",
    name: "Escuela de Abjuraci\xF3n",
    description: "Especialista en protecci\xF3n y baluartes m\xE1gicos. Guarda Arcana protectora que absorbe da\xF1o recibido por ti o aliados.",
    features: [
      { level: 3, name: "Guarda Arcana", description: "Al lanzar un conjuro de abjuraci\xF3n de nivel 1+, creas una barrera m\xE1gica con PG iguales a (2 x tu nivel de mago) + tu Inteligencia. La guarda absorbe el da\xF1o que vayas a recibir." },
      { level: 6, name: "Guarda Proyectada", description: "Cuando una criatura visible a 9 metros recibe da\xF1o, puedes usar tu reacci\xF3n para que tu Guarda Arcana absorba ese da\xF1o en lugar de la criatura objetivo." },
      { level: 10, name: "Abjuraci\xF3n Mejorada", description: "Cuando lanzas un conjuro de abjuraci\xF3n que requiera una prueba de caracter\xEDstica (como Contramagia o Disipar Magia), sumas tu bonificador de competencia a la tirada." },
      { level: 14, name: "Resistencia a Conjuros", description: "Tienes ventaja en todas las tiradas de salvaci\xF3n contra conjuros y resistencia permanente contra el da\xF1o infligido por conjuros." }
    ]
  },
  {
    id: "adivino",
    classId: "mago",
    name: "Escuela de Adivinaci\xF3n",
    description: "Maestro del destino y el tiempo. Portento te permite predecir tiradas de d20 tras cada descanso largo y asignarlas a aliados o rivales.",
    features: [
      { level: 3, name: "Portento Divino (2 dados d20)", description: "Al terminar un descanso largo, tiras 2d20 y anotas los resultados. Puedes sustituir cualquier tirada de ataque, salvaci\xF3n o prueba de caracter\xEDstica tuya o de una criatura visible por uno de esos valores." },
      { level: 6, name: "Mente Experta", description: "Lanzar conjuros de adivinaci\xF3n es tan natural que te devuelve energ\xEDa: cuando lanzas un conjuro de adivinaci\xF3n de nivel 2 o superior, recuperas un espacio de conjuro gastado de nivel inferior al lanzado (hasta nivel 5)." },
      { level: 10, name: "El Tercer Ojo", description: "Como acci\xF3n puedes agudizar tu percepci\xF3n para obtener uno de los siguientes beneficios hasta tu pr\xF3ximo descanso: Visi\xF3n en la Oscuridad (18 m), Visi\xF3n Et\xE9rea (18 m), Comprensi\xF3n de cualquier idioma escrito o Ver Invisibilidad (3 m)." },
      { level: 14, name: "Portento Superior (3 dados d20)", description: "Tiras 3d20 (en lugar de 2) para tu rasgo Portento Divino tras cada descanso largo." }
    ]
  },
  {
    id: "ilusionista",
    classId: "mago",
    name: "Escuela de Ilusi\xF3n",
    description: "Teje enga\xF1os sensoriales inigualables. Ilusiones mejoradas, trucos como acci\xF3n adicional y volver reales sus creaciones.",
    features: [
      { level: 3, name: "Ilusi\xF3n Mejorada", description: "Aprendes el truco Ilusi\xF3n Menor. Al lanzarlo, puedes crear simult\xE1neamente una imagen visual y un sonido en el mismo lanzamiento." },
      { level: 6, name: "Ilusiones Maleables", description: "Cuando lanzas un conjuro de ilusi\xF3n con duraci\xF3n de 1 minuto o m\xE1s, puedes usar tu acci\xF3n para modificar completamente la naturaleza del enga\xF1o ilusorio si est\xE1 en tu alcance." },
      { level: 10, name: "Doble Ilusorio", description: "Como reacci\xF3n cuando una criatura realiza un ataque contra ti, puedes interponer un doble ilusorio que hace que el ataque falle autom\xE1ticamente (1 vez por descanso corto o largo)." },
      { level: 14, name: "Realidad Ilusoria", description: "Como acci\xF3n adicional, puedes elegir un objeto inanimado no m\xE1gico creado por una de tus ilusiones y convertirlo en un objeto f\xEDsico y tangible real durante 1 minuto." }
    ]
  },
  {
    id: "canto_hoja",
    classId: "mago",
    name: "Canto de la Hoja (Bladesinging)",
    description: "Antigua tradici\xF3n m\xE1gica y esgrimista de los elfos de Faer\xFBn. Entra en Canto de la Hoja para sumar Inteligencia a la CA y concentraci\xF3n.",
    features: [
      { level: 3, name: "Entrenamiento en Guerra y Canci\xF3n", description: "Ganas competencia con armaduras ligeras, un arma cuerpo a cuerpo de una mano a tu elecci\xF3n y en la habilidad de Interpretaci\xF3n." },
      { level: 3, name: "Canto de la Hoja (Bladesong)", description: "Como acci\xF3n adicional activas el Canto durante 1 minuto (usos por descanso largo igual a BC): sumas tu Inteligencia a tu CA, ganas +3 m de velocidad, ventaja en Acrobacias y sumas Inteligencia a salvaciones de concentraci\xF3n." },
      { level: 6, name: "Ataque Adicional de Esgrima M\xE1gica", description: "Puedes atacar dos veces al realizar la acci\xF3n de Atacar en tu turno, y puedes sustituir uno de esos ataques por lanzar uno de tus trucos de mago." },
      { level: 10, name: "Canci\xF3n de Defensa", description: "Como reacci\xF3n cuando recibes da\xF1o mientras tu Canto de la Hoja est\xE9 activo, puedes gastar un espacio de conjuro para reducir el da\xF1o recibido en 5 veces el nivel del espacio gastado." },
      { level: 14, name: "Canci\xF3n de Victoria", description: "Mientras tu Canto de la Hoja est\xE9 activo, sumas tu modificador de Inteligencia al da\xF1o de todos tus ataques cuerpo a cuerpo con arma." }
    ]
  },
  {
    id: "orden_escribas",
    classId: "mago",
    name: "Orden de los Escribas",
    description: "Devotos eruditos de la Trama de Mystra y Azuth. Grimorio consciente que cambia tipos de da\xF1o elemental y lanza conjuros a distancia.",
    features: [
      { level: 3, name: "Grimorio M\xE1gico Consciente", description: "Tu libro despierta conciencia: act\xFAa como foco arcano, copias conjuros en 2 minutos por nivel y puedes sustituir el tipo de da\xF1o de un conjuro por otro da\xF1o que figure en tu grimorio." },
      { level: 6, name: "Pluma del Escriba Magistral", description: "Durante un descanso corto puedes crear un pergamino m\xE1gico de un conjuro de nivel 1 o 2 de tu libro que se puede lanzar como acci\xF3n adicional sin consumir espacio de conjuro." },
      { level: 10, name: "Manifestaci\xF3n Espectral del Grimorio", description: "Como acci\xF3n adicional proyectas la mente de tu grimorio como un avatar flotante a 18 m que ve, oye y desde el cual puedes lanzar tus conjuros PB veces por descanso largo." },
      { level: 14, name: "Uno con la Sabidur\xEDa", description: "Si sufres da\xF1o letal mientras tu avatar est\xE9 activo, tu libro absorbe todo el da\xF1o sacrificando temporalmente conjuros de tu lista en lugar de que caigas a 0 PG." }
    ]
  },
  {
    id: "cronurgia",
    classId: "mago",
    name: "Mago Cronurgo (Magia Temporal)",
    description: "Manipulador de las l\xEDneas temporales. Fuerza tiradas de d20 a repetirse e inmoviliza a enemigos en \xE9xtasis temporal.",
    features: [
      { level: 3, name: "Alteraci\xF3n Temporal", description: "Sumas tu modificador de Inteligencia a tus tiradas de iniciativa." },
      { level: 3, name: "Punto de Inflexi\xF3n (2/descanso largo)", description: "Como reacci\xF3n cuando una criatura a 9 metros realiza una tirada de ataque, prueba o salvaci\xF3n, la obligas a volver a tirar el d20 y usar el nuevo resultado." },
      { level: 6, name: "\xC9xtasis Temporal", description: "Como acci\xF3n atrapas a una criatura Grande o menor a 1,5 m en un campo de estasis hasta el final de tu siguiente turno si falla una salvaci\xF3n de Constituci\xF3n (inmune a da\xF1o e incapacitada)." },
      { level: 10, name: "Gr\xE1nulo Arcano del Destino", description: "Imprimes un conjuro de nivel 4 o menor en una perla de tiempo congelado durante 1 hora; cualquier criatura que la sostenga puede activar el conjuro usando su acci\xF3n." },
      { level: 14, name: "Destino Convergente", description: "Cuando t\xFA o una criatura a 9 m hac\xE9is una tirada de d20, puedes forzar que sea un \xE9xito o fallo exacto por intervenci\xF3n directa temporal a cambio de sufrir 1 nivel de agotamiento." }
    ]
  },
  // ==========================================
  // --- CLÉRIGO (CLERIC - Niveles 3, 6, 17) ---
  // ==========================================
  {
    id: "dominio_vida",
    classId: "clerigo",
    name: "Dominio de la Vida",
    description: "El sanador por excelencia. A\xF1ade curaci\xF3n extra a cada conjuro curativo y canaliza divinidad para restaurar salud masiva.",
    features: [
      { level: 3, name: "Disc\xEDpulo de la Vida", description: "Tus conjuros curativos son m\xE1s potentes: cuando lanzas un conjuro de curaci\xF3n usando un espacio de conjuro, la criatura recupera 2 + el nivel del espacio puntos de golpe adicionales." },
      { level: 3, name: "Preservar la Vida (Canalizar Divinidad)", description: "Como acci\xF3n m\xE1gica, restauras una cantidad de PG igual a 5 veces tu nivel de cl\xE9rigo repartidos entre criaturas a 9 m que se encuentren por debajo de la mitad de sus PG m\xE1ximos." },
      { level: 3, name: "Conjuros de Dominio de la Vida", description: "Siempre tienes preparados los conjuros: Bendecir, Curar Heridas, Restablecimiento Menor y Arma Espiritual." },
      { level: 6, name: "Sanador Bendito", description: "Cuando lanzas un conjuro de curaci\xF3n de nivel 1+ sobre otra criatura, t\xFA tambi\xE9n recuperas puntos de golpe iguales a 2 + el nivel del espacio de conjuro empleado." },
      { level: 17, name: "Curaci\xF3n Suprema", description: "Cuando tiras dados para restaurar puntos de golpe con un conjuro o rasgo de cl\xE9rigo, utilizas el valor m\xE1ximo posible de cada dado en lugar de tirarlo." }
    ]
  },
  {
    id: "dominio_luz",
    classId: "clerigo",
    name: "Dominio de la Luz",
    description: "Resplandor divino y fuego abrasador. Destellos protectores que ciegan atacantes y acceso a Bola de Fuego.",
    features: [
      { level: 3, name: "Fulgor Cegador", description: "Usa tu reacci\xF3n para interponer luz cegadora e imponer desventaja en la tirada de ataque de un enemigo a 9 m antes de que golpee (usos por descanso largo igual a Sabidur\xEDa)." },
      { level: 3, name: "Radiancia del Alba (Canalizar Divinidad)", description: "Como acci\xF3n m\xE1gica, disipas cualquier oscuridad m\xE1gica a 9 m e infliges 2d10 + nivel de cl\xE9rigo de da\xF1o radiante a enemigos en el \xE1rea (salvaci\xF3n de CON mitad)." },
      { level: 3, name: "Conjuros de Dominio de la Luz", description: "Siempre tienes preparados los conjuros: Manos Ardientes, Fuego Fe\xE9rico, Esfera Flam\xEDgera y Rayo Abrasador." },
      { level: 6, name: "Destello Mejorado", description: "Puedes usar tu Fulgor Cegador como reacci\xF3n cuando un atacante visible a 9 metros realice un ataque contra cualquier aliado tuyo." },
      { level: 17, name: "Corona de Luz", description: "Como acci\xF3n emanas un aura de luz solar de 18 metros durante 1 minuto: emites luz brillante y los enemigos dentro del aura sufren desventaja en salvaciones contra tus conjuros de fuego y radiantes." }
    ]
  },
  {
    id: "dominio_guerra",
    classId: "clerigo",
    name: "Dominio de la Guerra",
    description: "Campe\xF3n marcial bendecido por deidades b\xE9licas. Ataques adicionales como acci\xF3n adicional y gu\xEDa divina de +10.",
    features: [
      { level: 3, name: "Sacerdote Guerrero", description: "Cuando realizas la acci\xF3n de Atacar, puedes realizar un ataque adicional con arma como acci\xF3n adicional (usos por descanso largo igual a tu modificador de Sabidur\xEDa, m\xEDnimo 1)." },
      { level: 3, name: "Golpe Dirigido (Canalizar Divinidad)", description: "Cuando t\xFA o una criatura a 9 m fall\xE1is una tirada de ataque, usas tu reacci\xF3n para conceder un bonificador de +10 a esa tirada." },
      { level: 3, name: "Conjuros de Dominio de la Guerra", description: "Siempre tienes preparados los conjuros: Escudo de la Fe, Favor Divino, Arma Espiritual y Arma M\xE1gica." },
      { level: 6, name: "Bendici\xF3n del Dios de la Guerra", description: "Cuando una criatura a 9 metros realiza una tirada de ataque, puedes usar tu reacci\xF3n y un uso de Canalizar Divinidad para otorgarle un bonificador de +10 a la tirada." },
      { level: 17, name: "Avatar de la Batalla", description: "Obtienes resistencia permanente al da\xF1o contundente, perforante y cortante de ataques con armas no m\xE1gicas." }
    ]
  },
  {
    id: "dominio_engano",
    classId: "clerigo",
    name: "Dominio del Enga\xF1o",
    description: "Astucia divina, sigilo e ilusiones. Duplicados ilusorios para lanzar conjuros y ventaja en sigilo para aliados.",
    features: [
      { level: 3, name: "Bendici\xF3n del Embaucador", description: "Como acci\xF3n, tocas a una criatura voluntaria para concederle ventaja en pruebas de Destreza (Sigilo) durante 1 hora o hasta que vuelvas a usar el rasgo." },
      { level: 3, name: "Invocar Duplicado (Canalizar Divinidad)", description: "Como acci\xF3n adicional, creas una ilusi\xF3n perfecta de ti mismo a 9 m que dura 1 minuto. Puedes proyectar conjuros desde su posici\xF3n y tienes ventaja en tiradas de ataque contra enemigos a 1,5 m de ella." },
      { level: 3, name: "Conjuros de Dominio del Enga\xF1o", description: "Siempre tienes preparados los conjuros: Disfrazarse, Hechizar Persona, Invisibilidad y Paso Invisible." },
      { level: 6, name: "Manto de Sombras (Canalizar Divinidad)", description: "Como acci\xF3n adicional, te vuelves invisible hasta el final de tu siguiente turno o hasta que realices un ataque o lances un conjuro." },
      { level: 17, name: "Duplicado Mejorado", description: "Puedes crear hasta 4 duplicados ilusorios a la vez con Invocar Duplicado y puedes teletransportarte intercambiando posici\xF3n con cualquiera de ellos como acci\xF3n adicional." }
    ]
  },
  {
    id: "dominio_muerte",
    classId: "clerigo",
    name: "Dominio de la Muerte",
    description: "Cl\xE9rigos de Myrkul, Kelemvor o Bhaal. Dominan la necromancia, golpean a dos objetivos con trucos necr\xF3ticos y perforan resistencias.",
    features: [
      { level: 3, name: "Segador de Almas", description: "Tus trucos de nigromancia que apunten a 1 criatura pueden apuntar a 2 criaturas a 1,5 metros entre s\xED." },
      { level: 3, name: "Canalizar Divinidad: Toque de Muerte", description: "Al impactar con un ataque cuerpo a cuerpo, infliges da\xF1o necr\xF3tico adicional igual a 5 + (2 x tu nivel de cl\xE9rigo)." },
      { level: 6, name: "Destrucci\xF3n Inevitable", description: "El da\xF1o necr\xF3tico infligido por tus conjuros y rasgos de cl\xE9rigo ignora la resistencia al da\xF1o necr\xF3tico de cualquier criatura." },
      { level: 17, name: "Segador Mejorado", description: "Cuando lanzas un conjuro de nigromancia de nivel 1 a 5 que apunte a una sola criatura, puedes apuntar a dos criaturas que se encuentren a 1,5 metros entre s\xED." }
    ]
  },
  {
    id: "dominio_paz",
    classId: "clerigo",
    name: "Dominio de la Paz",
    description: "Servidores de Eldath e Ilm\xE1ter. Forjan v\xEDnculos emp\xE1ticos que suman 1d4 a ataques y salvaciones y permiten teleportarse para protegerse.",
    features: [
      { level: 3, name: "V\xEDnculo Emancipador", description: "Vinculas a un n\xFAmero de aliados igual a tu BC durante 1 hora: una vez por turno pueden sumar 1d4 a una tirada de ataque, prueba o salvaci\xF3n si est\xE1n a 9 m entre s\xED." },
      { level: 3, name: "Canalizar Divinidad: B\xE1lsamo de Paz", description: "Como acci\xF3n te mueves hasta tu velocidad sin provocar ataques de oportunidad y restauras 2d6 + Sabidur\xEDa en PG a cada criatura voluntaria a 1,5 m por la que pases." },
      { level: 6, name: "V\xEDnculo Protector", description: "Cuando una criatura vinculada por tu V\xEDnculo Emancipador a 9 m va a recibir da\xF1o, otra criatura vinculada a 9 m puede usar su reacci\xF3n para teletransportarse a su lado y recibir todo el da\xF1o en su lugar." },
      { level: 17, name: "V\xEDnculo Expansivo", description: "El alcance del V\xEDnculo Protector aumenta a 18 metros, y la criatura que absorbe el da\xF1o en sustituci\xF3n obtiene resistencia a todo ese da\xF1o." }
    ]
  },
  {
    id: "dominio_crepusculo",
    classId: "clerigo",
    name: "Dominio del Crep\xFAsculo",
    description: "Sacerdotes de Sel\xFBne y Yondalla. Visi\xF3n en la oscuridad de 90 metros compartible y Santuario del Crep\xFAsculo que otorga PG temporales continuos.",
    features: [
      { level: 3, name: "Ojos de Medianoche (90 m)", description: "Visi\xF3n en la oscuridad de 90 metros que puedes compartir con hasta tu bonificador de competencia de aliados durante 1 hora." },
      { level: 3, name: "Canalizar Divinidad: Santuario del Crep\xFAsculo", description: "Aura esf\xE9rica de 9 metros de penumbra m\xE1gica durante 1 minuto: en cada turno otorga 1d6 + nivel de cl\xE9rigo en PG temporales o termina Hechizado/Asustado a los aliados en el \xE1rea." },
      { level: 6, name: "Pasos de la Noche", description: "En penumbra u oscuridad, puedes otorgarte una velocidad de vuelo igual a tu velocidad al caminar durante 1 minuto como acci\xF3n adicional (usos por descanso largo igual a BC)." },
      { level: 17, name: "Sudario del Crep\xFAsculo", description: "Mientras tu Santuario del Crep\xFAsculo est\xE9 activo, t\xFA y todos tus aliados dentro del \xE1rea ten\xE9is cobertura media (+2 a la CA y tiradas de salvaci\xF3n de Destreza)." }
    ]
  },
  {
    id: "dominio_arcano",
    classId: "clerigo",
    name: "Dominio Arcano",
    description: "Cl\xE9rigos devotos de Mystra, Azuth y Savras. Aprenden trucos de mago y disipan magia enemiga con facilidad milagrosa.",
    features: [
      { level: 3, name: "Iniciado Arcano", description: "Ganas competencia en Arcanos y aprendes dos trucos de la lista de mago que cuentan como conjuros de cl\xE9rigo para ti." },
      { level: 3, name: "Canalizar Divinidad: Expulsar Extraplanares", description: "Tu rasgo de Expulsi\xF3n afecta tambi\xE9n a celestiales, elementales, fatas o infernales adem\xE1s de no-muertos." },
      { level: 6, name: "Sanaci\xF3n de Hechizos", description: "Cuando lanzas un conjuro de curaci\xF3n sobre un aliado usando un espacio de conjuro, puedes disipar simult\xE1neamente un conjuro de nivel igual o inferior sobre ese aliado." },
      { level: 17, name: "Maestr\xEDa Arcana", description: "Eliges cuatro conjuros de la lista de mago (uno de nivel 6, uno de nivel 7, uno de nivel 8 y uno de nivel 9); se convierten en conjuros de dominio de cl\xE9rigo siempre preparados para ti." }
    ]
  },
  {
    id: "dominio_fragua",
    classId: "clerigo",
    name: "Dominio de la Fragua",
    description: "Sacerdotes de Gond y Moradin. Forjan armas y armaduras bendecidas con +1 m\xE1gico permanente y ganan resistencia e inmunidad al fuego.",
    features: [
      { level: 3, name: "Bendici\xF3n de la Fragua", description: "Al terminar un descanso largo, imbuyes una armadura o arma mundana otorg\xE1ndole un bonificador de +1 m\xE1gico a la CA o al ataque/da\xF1o hasta el siguiente descanso largo." },
      { level: 3, name: "Canalizar Divinidad: Artesano del Metal", description: "Realizas un ritual de 1 hora para fabricar cualquier objeto no m\xE1gico met\xE1lico de valor de hasta 100 po a partir de chatarra." },
      { level: 6, name: "Alma de la Fragua", description: "Obtienes resistencia al da\xF1o por fuego y un bonificador de +1 adicional a tu Clase de Armadura mientras vistas armadura pesada." },
      { level: 17, name: "Santo de la Forja y el Fuego", description: "Obtienes inmunidad total al da\xF1o por fuego y resistencia permanente al da\xF1o contundente, perforante y cortante de ataques no m\xE1gicos mientras vistas armadura pesada." }
    ]
  },
  {
    id: "dominio_conocimiento",
    classId: "clerigo",
    name: "Dominio del Conocimiento (H\xE9roes de Faer\xFBn)",
    description: "Sacerdotes eruditos consagrados a Oghma, Deneir, Milil y Gond en Faer\xFBn. Dominan todos los idiomas, leen mentes y desentra\xF1an secretos arcanos.",
    features: [
      { level: 3, name: "Bendiciones del Saber", description: "Aprendes dos idiomas a tu elecci\xF3n y obtienes competencia y Pericia (doble de bonificador de competencia) en dos habilidades entre Arcanos, Historia, Naturaleza o Religi\xF3n." },
      { level: 3, name: "Canalizar Divinidad: Conocimiento de las Eras", description: "Como acci\xF3n m\xE1gica, obtienes competencia instant\xE1nea con cualquier habilidad o herramienta a tu elecci\xF3n durante 10 minutos." },
      { level: 6, name: "Canalizar Divinidad: Leer Mentes", description: "Como acci\xF3n lees los pensamientos superficiales de una criatura y puedes lanzar Sugesti\xF3n sobre ella sin gastar espacio de conjuro si falla salvaci\xF3n de Sabidur\xEDa." },
      { level: 17, name: "Visiones del Pasado", description: "Puedes meditar durante varios minutos para percibir visiones n\xEDtidas de eventos pasados ocurridos en un objeto que sostengas o en el \xE1rea circundante hasta siglos atr\xE1s." }
    ]
  },
  // ==========================================
  // --- PALADÍN (PALADIN - Niveles 3, 7, 15, 20) ---
  // ==========================================
  {
    id: "juramento_devocion",
    classId: "paladin",
    name: "Juramento de Devoci\xF3n",
    description: "El arquetipo del caballero radiante. Arma sagrada imbuida con luz solar, carisma a los ataques y aura de valor inquebrantable.",
    features: [
      { level: 3, name: "Arma Sagrada (Canalizar Divinidad)", description: "Como acci\xF3n imbuyes tu arma con energ\xEDa positiva durante 1 minuto: sumas tu Carisma a tiradas de ataque, emites luz brillante y el arma inflige da\xF1o radiante." },
      { level: 3, name: "Expulsar a los Imp\xEDos (Canalizar Divinidad)", description: "Como acci\xF3n muestras tu s\xEDmbolo sagrado: todos los infernales y no-muertos a 9 m deben superar salvaci\xF3n de Sabidur\xEDa o quedar expulsados durante 1 minuto." },
      { level: 7, name: "Aura de Devoci\xF3n", description: "T\xFA y todos los aliados a 3 metros sois completamente inmunes a la condici\xF3n de Hechizado mientras permanezcas consciente (el radio aumenta a 9 metros a nivel 18)." },
      { level: 15, name: "Pureza de Esp\xEDritu", description: "Te encuentras permanentemente bajo los efectos ben\xE9ficos del conjuro Protecci\xF3n contra el Mal y el Bien." },
      { level: 20, name: "Halo Sagrado", description: "Como acci\xF3n emanas un halo de luz solar en 9 m durante 1 minuto: infliges 10 de da\xF1o radiante al inicio del turno a infernales/no-muertos y tienes ventaja en salvaciones contra conjuros enemigos." }
    ]
  },
  {
    id: "juramento_venganza",
    classId: "paladin",
    name: "Juramento de Venganza",
    description: "Castigo implacable a los malvados. Voto de enemistad para obtener ventaja absoluta en cada ataque contra el culpable.",
    features: [
      { level: 3, name: "Voto de Enemistad (Canalizar Divinidad)", description: "Como acci\xF3n adicional marcas a un objetivo a 9 metros durante 1 minuto: obtienes ventaja en todas tus tiradas de ataque contra esa criatura." },
      { level: 3, name: "Abjurar al Enemigo (Canalizar Divinidad)", description: "Como acci\xF3n obligas a un objetivo a 18 m a superar salvaci\xF3n de Sabidur\xEDa o quedar Asustado con velocidad 0 durante 1 minuto." },
      { level: 7, name: "Vengador Implacable", description: "Cuando golpeas a una criatura con un ataque de oportunidad, tu velocidad no se reduce y puedes moverte hasta la mitad de tu velocidad como parte de la misma reacci\xF3n sin provocar ataques." },
      { level: 15, name: "Alma de la Venganza", description: "Cuando la criatura marcada por tu Voto de Enemistad realiza un ataque, puedes usar tu reacci\xF3n para realizar un ataque cuerpo a cuerpo con arma contra ella de inmediato." },
      { level: 20, name: "\xC1ngel Vengador", description: "Como acci\xF3n te transformas durante 1 hora: obtienes alas de vuelo con velocidad de 18 metros y un aura de terror de 9 metros que asusta a los enemigos que fallen salvaci\xF3n de Sabidur\xEDa." }
    ]
  },
  {
    id: "juramento_antiguos",
    classId: "paladin",
    name: "Juramento de los Antiguos",
    description: "Guardi\xE1n de la luz, el bosque y la alegr\xEDa. Aura protectora contra el da\xF1o de conjuros m\xE1gicos y ra\xEDces apresadoras.",
    features: [
      { level: 3, name: "Ira de la Naturaleza (Canalizar Divinidad)", description: "Como acci\xF3n provocas que broten enredaderas espectrales que apresan a una criatura a 3 metros (salvaci\xF3n de FUE o DES para evitar la condici\xF3n de Apresado)." },
      { level: 3, name: "Expulsar a los Infieles (Canalizar Divinidad)", description: "Como acci\xF3n expulsas a fatas e infernales a 9 metros que fallen una tirada de salvaci\xF3n de Sabidur\xEDa." },
      { level: 7, name: "Aura de Protecci\xF3n M\xE1gica", description: "T\xFA y todos los aliados a 3 metros ten\xE9is resistencia contra todo el da\xF1o infligido por conjuros m\xE1gicos (el radio aumenta a 9 metros a nivel 18)." },
      { level: 15, name: "Centinela Imperturbable", description: "Cuando tus PG se reducen a 0, puedes quedar a 1 PG en su lugar (1 vez por descanso largo). Adem\xE1s, no puedes envejecer m\xE1gicamente ni sufrir fragilidad por vejez." },
      { level: 20, name: "Campe\xF3n Anciano", description: "Como acci\xF3n te transformas en avatar primigenio durante 1 minuto: recuperas 10 PG al inicio de cada turno, lanzas conjuros de palad\xEDn como acci\xF3n adicional y los enemigos sufren desventaja contra tus conjuros." }
    ]
  },
  {
    id: "juramento_gloria",
    classId: "paladin",
    name: "Juramento de la Gloria",
    description: "H\xE9roe de epopeyas legendarias. Aza\xF1a de atletismo sobrehumano, velocidad aura inspiradora y vigor heroico.",
    features: [
      { level: 3, name: "Atleta Sobrenatural (Canalizar Divinidad)", description: "Como acci\xF3n adicional obtienes ventaja en pruebas de Fuerza (Atletismo) y Destreza (Acrobacias), y tu distancia de salto se duplica durante 10 minutos." },
      { level: 3, name: "Golpe Guiador (Canalizar Divinidad)", description: "Al impactar con Castigo Divino, otorgas PG temporales iguales a 2d8 + nivel de palad\xEDn repartidos entre tus aliados a 9 metros." },
      { level: 7, name: "Aura de Alacridad", description: "La velocidad tuya y de todos los aliados que inicien su turno a 3 metros de ti aumenta en 3 metros adicionales (el radio aumenta a 9 metros a nivel 18)." },
      { level: 15, name: "Defensa Gloriosa", description: "Como reacci\xF3n cuando t\xFA o un aliado a 3 m recib\xEDs un ataque, sumas tu Carisma a la CA del objetivo; si el ataque falla, realizas un contraataque con arma contra el atacante." },
      { level: 20, name: "Leyenda Viviente", description: "Como acci\xF3n te conviertes en una leyenda durante 1 minuto: ventaja en pruebas de Carisma, puedes repetir un ataque fallido cada turno y cambias salvaciones fallidas por \xE9xitos garantizados." }
    ]
  },
  {
    id: "juramento_conquista",
    classId: "paladin",
    name: "Juramento de la Conquista",
    description: "Paladines de Bane o el orden f\xE9rreo. Doblegan la voluntad de sus enemigos con presencia aterradora e inmovilizan con su Aura de Conquista.",
    features: [
      { level: 3, name: "Canalizar Divinidad: Presencia Temible", description: "Como acci\xF3n obligas a cada criatura enemiga a 9 metros a superar una salvaci\xF3n de Sabidur\xEDa o quedar Asustada de ti durante 1 minuto." },
      { level: 3, name: "Canalizar Divinidad: Golpe Guiado", description: "Cuando realizas una tirada de ataque, obtienes un bonificador de +10 a la tirada tras ver el resultado del d20." },
      { level: 7, name: "Aura de Conquista", description: "Los enemigos Asustados dentro de tu aura de 3 m ven su velocidad reducida a 0 y sufren da\xF1o ps\xEDquico igual a la mitad de tu nivel de palad\xEDn al iniciar su turno (9 m a nivel 18)." },
      { level: 15, name: "Reprimenda Despectiva", description: "Cuando una criatura te impacta con un ataque, sufre da\xF1o ps\xEDquico igual a tu modificador de Carisma (m\xEDnimo 1) si est\xE1s consciente." },
      { level: 20, name: "Campe\xF3n Invencible", description: "Como acci\xF3n te transformas en tirano supremo durante 1 minuto: obtienes resistencia a todo el da\xF1o, puedes realizar un ataque adicional por turno y logras golpes cr\xEDticos con 19-20 en el d20." }
    ]
  },
  {
    id: "juramento_redencion",
    classId: "paladin",
    name: "Juramento de la Redenci\xF3n",
    description: "Protectores de la paz y devotos de Ilm\xE1ter. Redirigen ataques hacia s\xED mismos y desv\xEDan la violencia de los villanos.",
    features: [
      { level: 3, name: "Canalizar Divinidad: Emisario de Paz", description: "Como acci\xF3n adicional ganas un bonificador de +5 a todas tus pruebas de Carisma (Persuasi\xF3n) durante los pr\xF3ximos 10 minutos." },
      { level: 3, name: "Canalizar Divinidad: Reprimenda del Violento", description: "Como reacci\xF3n cuando un atacante da\xF1a a un aliado a 18 m, le infliges da\xF1o radiante igual al da\xF1o que caus\xF3 si falla una salvaci\xF3n de Sabidur\xEDa (o la mitad en \xE9xito)." },
      { level: 7, name: "Aura del Guardi\xE1n", description: "Cuando un aliado a 3 metros de ti recibe da\xF1o, puedes usar tu reacci\xF3n para recibir m\xE1gicamente todo ese da\xF1o en tu lugar sin que pueda reducirse (el radio aumenta a 9 m a nivel 18)." },
      { level: 15, name: "Esp\xEDritu Protector", description: "Recuperas 1d6 + la mitad de tu nivel de palad\xEDn en puntos de golpe al final de cada uno de tus turnos en combate si te encuentras por debajo de la mitad de tus PG m\xE1ximos." },
      { level: 20, name: "Emisario de la Redenci\xF3n", description: "Obtienes resistencia permanente al da\xF1o de todas las criaturas que no te hayan atacado en el combate y reflejas en da\xF1o radiante la mitad del da\xF1o que te inflijan." }
    ]
  },
  {
    id: "rompejuramentos",
    classId: "paladin",
    name: "Rompejuramentos (Oathbreaker)",
    description: "Palad\xEDn ca\xEDdo que ha roto sus votos sagrados por la ambici\xF3n o la oscuridad. Comanda muertos vivientes y canaliza odio infernal.",
    features: [
      { level: 3, name: "Canalizar Divinidad: Controlar No-Muerto", description: "Como acci\xF3n tomas el control de una criatura no-muerta cuyo Valor de Desaf\xEDo sea inferior a tu nivel de palad\xEDn durante 24 horas si falla una salvaci\xF3n de Sabidur\xEDa." },
      { level: 3, name: "Canalizar Divinidad: Aspecto Pavoroso", description: "Como acci\xF3n invocas sombras aterradoras que imponen la condici\xF3n de Asustado a todos los enemigos a 9 metros durante 1 minuto." },
      { level: 7, name: "Aura de Odio", description: "T\xFA, los infernales y los no-muertos a 3 metros sum\xE1is tu modificador de Carisma al da\xF1o de todos los ataques cuerpo a cuerpo con arma (el radio aumenta a 9 metros a nivel 18)." },
      { level: 15, name: "Resistencia Sobrenatural", description: "Obtienes resistencia permanente al da\xF1o contundente, perforante y cortante de armas no m\xE1gicas." },
      { level: 20, name: "Se\xF1or de la Oscuridad", description: "Como acci\xF3n te envuelves en un aura de tinieblas de 9 m durante 1 minuto: ciega a enemigos, inflige 4d10 de da\xF1o ps\xEDquico por turno y permite un ataque de sombra como acci\xF3n adicional." }
    ]
  },
  {
    id: "juramento_vigilantes",
    classId: "paladin",
    name: "Juramento de los Vigilantes",
    description: "Centinelas de Faer\xFBn y servidores de Helm contra amenazas extraplanares. Bonifican la iniciativa grupal y expulsan aberraciones.",
    features: [
      { level: 3, name: "Canalizar Divinidad: Voluntad del Vigilante", description: "Como acci\xF3n otorgas ventaja en tiradas de salvaci\xF3n de Inteligencia, Sabidur\xEDa y Carisma a ti y a hasta tu BC de aliados a 9 m durante 1 minuto." },
      { level: 3, name: "Canalizar Divinidad: Abjurar Extraplanares", description: "Como acci\xF3n obligas a aberraciones, celestiales, elementales, fatas e infernales a 9 m a superar salvaci\xF3n de Sabidur\xEDa o ser expulsados durante 1 minuto." },
      { level: 7, name: "Aura del Centinela", description: "T\xFA y todos los aliados dentro de tu aura de 3 metros sum\xE1is vuestro bonificador de competencia a las tiradas de iniciativa (el radio aumenta a 9 metros a nivel 18)." },
      { level: 15, name: "Reprimenda Vigilante", description: "Cuando t\xFA o una criatura bajo tu Voluntad del Vigilante super\xE1is una salvaci\xF3n contra un conjuro, el lanzador sufre 2d8 + Carisma de da\xF1o de Fuerza de inmediato." },
      { level: 20, name: "Baluarte Mortal", description: "Como acci\xF3n te transformas durante 1 minuto: obtienes visi\xF3n verdadera en 36 m, ventaja en ataques contra extraplanares y al golpearlos puedes desterrarlos a su plano de origen." }
    ]
  },
  {
    id: "juramento_genios_nobles",
    classId: "paladin",
    name: "Juramento de los Genios Nobles (H\xE9roes de Faer\xFBn)",
    description: "Paladines de Calimshan vinculados al esplendor elemental de los cuatro linajes de genios (Dao, Djinn, Efreet y Marid). Castigos elementales y defensa carism\xE1tica.",
    features: [
      { level: 3, name: "Esplendor del Genio", description: "Mientras no vistas armadura, tu Clase de Armadura base es igual a 10 + tu modificador de Destreza + tu modificador de Carisma (puedes beneficiarte de un escudo)." },
      { level: 3, name: "Canalizar Divinidad: Castigo Elemental", description: "Al usar Castigo Divino infundes poder de un genio: Dao (petrifica/restringe con tierra), Djinn (torbellino que empuja 4,5 m y te teletransporta), Efreet (1d8 de fuego continuo) o Marid (derriba en masa)." },
      { level: 7, name: "Aura de los Cuatro Vientos y Mares", description: "T\xFA y todos los aliados a 3 metros ten\xE9is resistencia al da\xF1o elemental (fuego, fr\xEDo, trueno y \xE1cido) y ventaja en salvaciones contra efectos de movimiento forzado (9 m a nivel 18)." },
      { level: 15, name: "Desplazamiento de los Califas", description: "Como reacci\xF3n al recibir da\xF1o de un ataque o conjuro, te disuelves en una brisa o llamarada y te teletransportas hasta 9 metros a un espacio libre que puedas ver." },
      { level: 20, name: "Avatar del Sult\xE1n Elemental", description: "Como acci\xF3n te transformas durante 1 minuto en la encarnaci\xF3n viva de los cuatro planos elementales: velocidad de vuelo de 18 m, inmunidad a dos elementos y tus Castigos desatan dos efectos simult\xE1neos." }
    ]
  },
  // ==========================================
  // --- BARDO (BARD - Niveles 3, 6, 14) ---
  // ==========================================
  {
    id: "colegio_saber",
    classId: "bardo",
    name: "Colegio del Saber",
    description: "Erudito pol\xEDmata. Palabras Cortantes para restar dados de inspiraci\xF3n a tiradas enemigas y Secretos M\xE1gicos adicionales anticipados.",
    features: [
      { level: 3, name: "Palabras Cortantes", description: "Como reacci\xF3n cuando una criatura a 18 m realiza una tirada de ataque, prueba de caracter\xEDstica o tirada de da\xF1o, gastas 1 Inspiraci\xF3n B\xE1rdica y restas el resultado del dado a la tirada enemiga." },
      { level: 3, name: "Competencias Adicionales", description: "Ganas competencia en tres habilidades cualesquiera a tu elecci\xF3n." },
      { level: 6, name: "Secretos M\xE1gicos Adicionales", description: "Aprendes 2 conjuros de cualquier clase de nivel que puedas lanzar; cuentan como conjuros de bardo para ti y no cuentan para tu l\xEDmite de conjuros preparados." },
      { level: 14, name: "Habilidad Parang\xF3n", description: "Cuando realizas una prueba de caracter\xEDstica, puedes gastar un uso de Inspiraci\xF3n B\xE1rdica para sumar el resultado de tu dado al total tras ver el resultado del d20." }
    ]
  },
  {
    id: "colegio_valor",
    classId: "bardo",
    name: "Colegio del Valor",
    description: "Bardo guerrero que inspira en la primera l\xEDnea. Competencia con armaduras medias, escudos, armas marciales e inspiraci\xF3n al da\xF1o/CA.",
    features: [
      { level: 3, name: "Inspiraci\xF3n de Combate", description: "Las criaturas que tengan tu Inspiraci\xF3n B\xE1rdica pueden sumar el dado al da\xF1o de un arma o usar su reacci\xF3n para sumarlo a su CA contra un ataque." },
      { level: 3, name: "Competencias Marciales", description: "Ganas competencia con armaduras medias, escudos y armas marciales." },
      { level: 6, name: "Ataque Adicional de Valor", description: "Puedes atacar dos veces al realizar la acci\xF3n de Atacar en tu turno, y puedes sustituir uno de esos ataques por lanzar uno de tus trucos de bardo." },
      { level: 14, name: "Magia de Batalla", description: "Cuando utilizas tu acci\xF3n para lanzar un conjuro de bardo, puedes realizar un ataque con arma como acci\xF3n adicional." }
    ]
  },
  {
    id: "colegio_glamour",
    classId: "bardo",
    name: "Colegio del Glamour",
    description: "Fascinaci\xF3n fe\xE9rica y majestad embriagadora. Manto de inspiraci\xF3n que da PG temporales y movimiento veloz al grupo entero.",
    features: [
      { level: 3, name: "Manto de Inspiraci\xF3n", description: "Como acci\xF3n adicional gastas 1 Inspiraci\xF3n B\xE1rdica: hasta un n\xFAmero de aliados igual a tu Carisma ganan 5 PG temporales (14 a nivel 15) y pueden moverse hasta su velocidad sin provocar ataques de oportunidad." },
      { level: 3, name: "Actuaci\xF3n Envolvente", description: "Si act\xFAas durante 1 minuto, puedes hechizar a un n\xFAmero de humanoides igual a tu Carisma durante 1 hora si fallan una salvaci\xF3n de Sabidur\xEDa." },
      { level: 6, name: "Manto de Majestad", description: "Como acci\xF3n adicional puedes lanzar Orden Imperiosa en cada uno de tus turnos durante 1 minuto sin gastar espacios de conjuro (1 vez por descanso largo o gastando espacio)." },
      { level: 14, name: "Majestad Inolvidable", description: "Adquieres un aura fe\xE9rica deslumbrante: cuando una criatura intenta atacarte por primera vez en su turno, debe superar una salvaci\xF3n de Carisma o no podr\xE1 atacarte y debe elegir otro objetivo." }
    ]
  },
  {
    id: "colegio_danza",
    classId: "bardo",
    name: "Colegio de la Danza",
    description: "Danza acrob\xE1tica y fluida. Defensa sin armadura (10 + DES + CAR), ataques desarmados r\xEDtmicos y compartir iniciativa.",
    features: [
      { level: 3, name: "Danzar\xEDn Deslumbrante", description: "Mientras no vistas armadura ni lleves escudo, tu CA es 10 + Destreza + Carisma. Tus golpes desarmados usan Destreza e infligen da\xF1o contundente igual a tu dado de Inspiraci\xF3n B\xE1rdica." },
      { level: 6, name: "Danza Inspiradora y Compartida", description: "Cuando un aliado gasta tu dado de inspiraci\xF3n, t\xFA y \xE9l pod\xE9is moveros la mitad de vuestra velocidad sin ataques de oportunidad. Adem\xE1s, sumas tu Carisma a las tiradas de iniciativa de tus aliados." },
      { level: 14, name: "Evasi\xF3n Acrob\xE1tica de la Danza", description: "Obtienes Evasi\xF3n contra efectos de \xE1rea de Destreza (cero da\xF1o en \xE9xito, mitad en fallo) y como reacci\xF3n puedes extender este beneficio a un aliado a 1,5 metros de ti." }
    ]
  },
  {
    id: "colegio_luna",
    classId: "bardo",
    name: "Colegio de la Luna (H\xE9roes de Faer\xFBn)",
    description: "Bardos de las Islas Moonshae que canalizan los misterios de los pozos de luna y la magia f\xE9erica. Teletransporte, invisibilidad y conjuros lunares primigenios.",
    features: [
      { level: 3, name: "Inspiraci\xF3n de la Luna", description: "Al otorgar Inspiraci\xF3n B\xE1rdica a un aliado, puedes teletransportarte m\xE1gicamente hasta 9 metros a un espacio libre o volverte invisible hasta el final de tu turno." },
      { level: 3, name: "Magia de los Pozos Lunares", description: "Aprendes el truco Luces Danzantes o Druidismo y tienes siempre preparado el conjuro Rayo de Luna (cuenta como conjuro de bardo para ti)." },
      { level: 6, name: "Velo de Sel\xFBne", description: "Como acci\xF3n adicional gastas 1 dado de inspiraci\xF3n para envolver a tus aliados a 9 m en penumbra lunar que otorga invisibilidad y 2d8 PG temporales." },
      { level: 14, name: "V\xF3rtice del Pozo Lunar", description: "Como acci\xF3n invocas un pozo de agua lunar resplandeciente de 6 m de radio: restaura masivamente PG a aliados y ciega y teletransporta a enemigos que entren al v\xF3rtice." }
    ]
  },
  {
    id: "colegio_espadas",
    classId: "bardo",
    name: "Colegio de las Espadas",
    description: "Esgrimistas elegantes y artistas de las armas en las cortes de Faer\xFBn. Gastan Inspiraci\xF3n B\xE1rdica en floreos de espada defensivos y m\xF3viles.",
    features: [
      { level: 3, name: "Floreos de Combate", description: "Al realizar la acci\xF3n de Atacar, tu velocidad aumenta en 3 metros y puedes gastar 1 dado de inspiraci\xF3n para ejecutar Floreo Defensivo (+CA), Floreo M\xF3vil (empujar y avanzar) o Floreo Tajante (da\xF1ar a un segundo objetivo)." },
      { level: 3, name: "Estilo de Combate y Competencias", description: "Ganas competencia con armaduras medias y cimitarras, y eliges el Estilo de Combate Duelista o Combate con Dos Armas." },
      { level: 6, name: "Ataque Adicional de Espadas", description: "Puedes atacar dos veces al realizar la acci\xF3n de Atacar en tu turno." },
      { level: 14, name: "Floreo Magistral", description: "Cada vez que utilices una opci\xF3n de Floreo de Combate, puedes tirar un dado d6 en lugar de gastar un dado de Inspiraci\xF3n B\xE1rdica de tu reserva." }
    ]
  },
  {
    id: "colegio_elocuencia",
    classId: "bardo",
    name: "Colegio de la Elocuencia",
    description: "Maestros de la oratoria diplom\xE1tica de Silverymoon y Aguasprofundas. Persuasi\xF3n y Enga\xF1o infalibles con tiradas m\xEDnimas de 10.",
    features: [
      { level: 3, name: "Lengua de Plata", description: "Cuando realizas una prueba de Carisma (Persuasi\xF3n o Enga\xF1o), cualquier resultado de 9 o menor en el d20 se convierte autom\xE1ticamente en un 10." },
      { level: 3, name: "Palabras Desconcertantes", description: "Como acci\xF3n adicional gastas 1 Inspiraci\xF3n B\xE1rdica para restar el resultado del dado a la pr\xF3xima tirada de salvaci\xF3n que haga el objetivo antes del inicio de tu siguiente turno." },
      { level: 6, name: "Inspiraci\xF3n Inagotable", description: "Cuando una criatura suma tu dado de Inspiraci\xF3n B\xE1rdica a una tirada de d20 y fracasa en la tirada, no pierde el dado de inspiraci\xF3n y puede volver a utilizarlo." },
      { level: 14, name: "Mon\xF3logo Infeccioso", description: "Cuando una criatura supera con \xE9xito una tirada gracias a tu dado de inspiraci\xF3n, puedes otorgar de inmediato un nuevo dado de inspiraci\xF3n a otro aliado a 18 m sin consumir usos de tu reserva." }
    ]
  },
  {
    id: "colegio_espiritus",
    classId: "bardo",
    name: "Colegio de los Esp\xEDritus",
    description: "Bardo m\xE9dium que canaliza las historias y esp\xEDritus de h\xE9roes ancestrales de Faer\xFBn mediante barajas de tarokka o runas.",
    features: [
      { level: 3, name: "Cuentos del M\xE1s All\xE1", description: "Como acci\xF3n adicional gastas 1 dado de inspiraci\xF3n para consultar a los esp\xEDritus (tabla de 12 cuentos legendarios: sanaci\xF3n, da\xF1o de fuerza, teletransporte o visiones)." },
      { level: 3, name: "Foco Gu\xEDa Espiritual", description: "Utilizas una baraja de tarokka, calavera o tablero de esp\xEDritus como foco de conjuros y sumas 1d6 al da\xF1o o curaci\xF3n de tus conjuros de bardo." },
      { level: 6, name: "Sesi\xF3n Espiritual", description: "Realizas un ritual de espiritismo de 1 hora durante un descanso corto con aliados para aprender temporalmente cualquier conjuro de adivinaci\xF3n o nigromancia de cualquier clase." },
      { level: 14, name: "Conexi\xF3n M\xEDstica", description: "Cuando tires en la tabla de Cuentos del M\xE1s All\xE1, tiras dos veces en el dado y eliges el relato y efecto resultante que prefieras." }
    ]
  },
  // ==========================================
  // --- DRUIDA (DRUID - Niveles 3, 6, 10, 14) ---
  // ==========================================
  {
    id: "circulo_luna",
    classId: "druida",
    name: "C\xEDrculo de la Luna",
    description: "Forma Salvaje de combate primigenia. Te transformas como acci\xF3n adicional en bestias temibles con CA aumentada y ataques radiantes.",
    features: [
      { level: 3, name: "Forma de Combate", description: "Adoptas Forma Salvaje como acci\xF3n adicional con Valor de Desaf\xEDo incrementado (nivel de druida / 3). Tu CA en forma de bestia es 13 + Sabidur\xEDa y ganas PG temporales iguales a 3 x nivel de druida." },
      { level: 6, name: "Golpes Lunares Refulgentes", description: "Tus ataques en Forma Salvaje cuentan como m\xE1gicos e infligen da\xF1o radiante adicional igual a tu modificador de Sabidur\xEDa." },
      { level: 10, name: "Formas Elementales Lunares", description: "Puedes gastar dos usos de Forma Salvaje simult\xE1neos para transformarte en un Elemental de Fuego, Agua, Tierra o Aire." },
      { level: 14, name: "Resplandor Lunar Supremo", description: "Mientras est\xE9s en Forma Salvaje, emites una luz lunar de 9 m que otorga ventaja en tiradas de salvaci\xF3n a tus aliados y quema con 2d10 de da\xF1o radiante a los enemigos que entren en el \xE1rea." }
    ]
  },
  {
    id: "circulo_tierra",
    classId: "druida",
    name: "C\xEDrculo de la Tierra",
    description: "Conexi\xF3n con los biomas del mundo (Bosque, Monta\xF1a, Costa, Pantano). Recuperaci\xF3n natural de conjuros y magia ambiental.",
    features: [
      { level: 3, name: "Recuperaci\xF3n Natural", description: "Durante un descanso corto, puedes recuperar espacios de conjuro gastados con un nivel combinado de hasta la mitad de tu nivel de druida (redondeando hacia arriba)." },
      { level: 3, name: "Sinton\xEDa con la Tierra", description: "Eliges un bioma m\xEDstico (Bosque, Costa, Desierto, Monta\xF1a, Pantano o Tundra) para ganar una lista de conjuros de c\xEDrculo siempre preparados." },
      { level: 6, name: "Zancada de la Tierra", description: "Moverte a trav\xE9s de terreno dif\xEDcil no m\xE1gico no te cuesta movimiento adicional y tienes ventaja en salvaciones contra plantas m\xE1gicas que impidan el movimiento." },
      { level: 10, name: "Santuario de la Naturaleza", description: "Las criaturas del tipo bestia o planta deben superar una tirada de salvaci\xF3n de Sabidur\xEDa contra tu CD de conjuros para poder realizar un ataque contra ti." },
      { level: 14, name: "Defensas de la Naturaleza", description: "Eres inmune al da\xF1o por veneno, a la condici\xF3n de Envenenado y no puedes ser Hechizado ni Asustado por criaturas del tipo elemental o fata." }
    ]
  },
  {
    id: "circulo_estrellas",
    classId: "druida",
    name: "C\xEDrculo de las Estrellas",
    description: "Mapas celestes y constelaciones. Forma Estelar del Arquero (ataques radiantes), C\xE1liz (sanaci\xF3n extra) o Drag\xF3n (concentraci\xF3n infalible).",
    features: [
      { level: 3, name: "Forma Estelar", description: "Gastas 1 uso de Forma Salvaje para asumir forma de constelaci\xF3n: Arquero (disparo radiante 1d8+SAB como acci\xF3n adicional), C\xE1liz (curaci\xF3n extra de 1d8+SAB al lanzar conjuros de curaci\xF3n) o Drag\xF3n (cualquier tirada de concentraci\xF3n menor a 10 se convierte en 10)." },
      { level: 3, name: "Mapa Celeste", description: "Aprendes el truco Gu\xEDa y tienes preparado Proyectil M\xE1gico, pudiendo lanzarlo gratis PB veces por descanso largo." },
      { level: 6, name: "Rayos C\xF3smicos (Presagio)", description: "Tras un descanso largo tiras un dado: Si es par ganas Presagio del \xC9xito (+1d6 a tiradas de aliados) o impar Presagio del Fracaso (-1d6 a tiradas enemigas)." },
      { level: 10, name: "Constelaciones Centelleantes", description: "Las constelaciones de tu Forma Estelar mejoran: el Arquero y el C\xE1liz aumentan su dado a 2d8, y la forma del Drag\xF3n te concede una velocidad de vuelo de 6 metros." },
      { level: 14, name: "Lleno de Estrellas", description: "Mientras est\xE9s en tu Forma Estelar, te vuelves parcialmente incorp\xF3reo y adquieres resistencia permanente al da\xF1o contundente, perforante y cortante." }
    ]
  },
  {
    id: "circulo_mar",
    classId: "druida",
    name: "C\xEDrculo del Mar",
    description: "Ira oce\xE1nica de mareas y tormentas. Manto tempestuoso que derriba y electrocuta a enemigos que osen acercarse.",
    features: [
      { level: 3, name: "Ira del Oc\xE9ano", description: "Gastas 1 uso de Forma Salvaje para rodearte de un aura marina de 3 metros durante 10 minutos: como acci\xF3n adicional desatas r\xE1fagas de agua que infligen da\xF1o de fr\xEDo o rayo y empujan a enemigos." },
      { level: 3, name: "Adaptaci\xF3n Marina", description: "Obtienes una velocidad de nado igual a tu velocidad al caminar y puedes respirar libremente bajo el agua." },
      { level: 6, name: "Corriente de Marea", description: "Como acci\xF3n adicional mientras tu Ira del Oc\xE9ano est\xE9 activa, puedes volar o nadar hasta 6 metros y derribar a cualquier enemigo en tu trayectoria si falla salvaci\xF3n de Fuerza." },
      { level: 10, name: "Niebla de Tormenta", description: "Tu aura de Ira del Oc\xE9ano concede resistencia al da\xF1o de fr\xEDo, rayo y fuego a ti y a todos los aliados que se encuentren dentro de su radio." },
      { level: 14, name: "Se\xF1or de las Tormentas Oce\xE1nicas", description: "Obtienes una velocidad de vuelo m\xE1gica de 18 metros mientras tu Ira del Oc\xE9ano est\xE9 activa y puedes desatar un rayo marino que inflige 4d10 de rayo y aturde al objetivo." }
    ]
  },
  {
    id: "circulo_esporas",
    classId: "druida",
    name: "C\xEDrculo de las Esporas",
    description: "Druidas de la descomposici\xF3n y el ciclo f\xFAngico del Underdark y bosques ancestrales. Halo de esporas y forma f\xFAngica simbi\xF3tica.",
    features: [
      { level: 3, name: "Halo de Esporas", description: "Como reacci\xF3n cuando una criatura entra a 3 metros de ti, liberas esporas f\xFAngicas que causan 1d4 de da\xF1o necr\xF3tico (salvaci\xF3n de Constituci\xF3n niega; escala a 1d6 a nivel 6, 1d8 a nivel 10 y 1d10 a nivel 14)." },
      { level: 3, name: "Entidad Simbi\xF3tica", description: "Gastas 1 uso de Forma Salvaje para ganar 4 x nivel de druida en PG temporales, duplicar el da\xF1o de tu Halo de Esporas e infligir 1d6 de da\xF1o necr\xF3tico extra con tus ataques con armas." },
      { level: 6, name: "Infestaci\xF3n F\xFAngica", description: "Como reacci\xF3n cuando una criatura Peque\xF1a o Mediana muere a 6 metros de ti, la animas instant\xE1neamente como un zombi f\xFAngico bajo tu control con 1 PG durante 1 hora." },
      { level: 10, name: "Esporas Propagadas", description: "Como acci\xF3n adicional mientras tu Entidad Simbi\xF3tica est\xE9 activa, lanzas una nube de esporas a 9 metros que cubre un \xE1rea de 3 metros infligiendo el da\xF1o de tu Halo de Esporas a quien entre." },
      { level: 14, name: "Cuerpo F\xFAngico", description: "Eres completamente inmune a estar Cegado, Ensordecido, Asustado o Envenenado, y cualquier golpe cr\xEDtico que recibas se convierte en un impacto normal." }
    ]
  },
  {
    id: "circulo_fuego_salvaje",
    classId: "druida",
    name: "C\xEDrculo del Fuego Salvaje",
    description: "Entienden que la destrucci\xF3n \xEDgnea precede al florecimiento de nueva vida. Invocan un Esp\xEDritu del Fuego Salvaje que ataca y teletransporta.",
    features: [
      { level: 3, name: "Esp\xEDritu de Fuego Salvaje", description: "Gastas 1 uso de Forma Salvaje para invocar un esp\xEDritu de fuego llameante a 9 m durante 1 hora: inflige 2d6 de fuego al aparecer, ataca a distancia y teletransporta aliados a 4,5 m." },
      { level: 3, name: "Conjuros del Fuego Salvaje", description: "Siempre tienes preparados conjuros de fuego y renovaci\xF3n como Manos Ardientes, Curar Heridas, Esfera Flam\xEDgera y Revivir." },
      { level: 6, name: "V\xEDnculo \xCDgneo Mejorado", description: "Cuando lanzas un conjuro que inflija da\xF1o por fuego o restaure puntos de golpe mientras tu esp\xEDritu est\xE9 presente, sumas 1d8 al da\xF1o o la curaci\xF3n del conjuro." },
      { level: 10, name: "Cauterizar Heridas", description: "Cuando una criatura muere a 9 m, deja una peque\xF1a llama espectral: cualquier criatura que entre en su espacio puede ser curada o da\xF1ada en 2d10 + Sabidur\xEDa de fuego." },
      { level: 14, name: "Resurgimiento Ardiente", description: "Si caes a 0 PG mientras tu esp\xEDritu de fuego est\xE9 activo a 36 m, el esp\xEDritu explota sacrific\xE1ndose y t\xFA recuperas el 50% de tus PG m\xE1ximos y te pones en pie de inmediato." }
    ]
  },
  {
    id: "circulo_pastores",
    classId: "druida",
    name: "C\xEDrculo de los Pastores",
    description: "Protectores de las bestias y esp\xEDritus de la naturaleza. Invocan t\xF3tems de Oso, Gavil\xE1n o Unicornio que potencian curaciones y vitalidad.",
    features: [
      { level: 3, name: "Discurso de los Bosques", description: "Puedes comunicarte fluidamente con bestias y comprendes y hablas el idioma silvano." },
      { level: 3, name: "T\xF3tem Espiritual (1/descanso)", description: "Como acci\xF3n adicional invocas un aura tot\xE9mica de 9 m: Oso (otorga 5 + nivel de druida en PG temporales), Gavil\xE1n (ventaja en tiradas de ataque) o Unicornio (tus conjuros curan a todos en el \xE1rea a la vez)." },
      { level: 6, name: "Invocador Poderoso", description: "Cualquier bestia o fata invocada por ti obtiene +2 PG por dado de golpe y sus ataques con armas naturales cuentan como m\xE1gicos para superar resistencias." },
      { level: 10, name: "Esp\xEDritu Guardi\xE1n", description: "Cuando una criatura invocada por ti termina su turno dentro del \xE1rea de tu T\xF3tem Espiritual, recupera una cantidad de PG igual a la mitad de tu nivel de druida." },
      { level: 14, name: "Fieles Pastores", description: "Si quedas incapacitado o caes a 0 PG, se convoca autom\xE1ticamente un conjuro de Conjurar Animales de nivel 9 con 4 bestias leales para protegerte durante 1 hora." }
    ]
  },
  // ==========================================
  // --- HECHICERO (SORCERER - Niveles 3, 6, 14, 18) ---
  // ==========================================
  {
    id: "linaje_draconico",
    classId: "hechicero",
    name: "Linaje Drac\xF3nico",
    description: "Poder ancestral de dragones. Armadura natural de escamas (CA 13 + DES), +1 PG por nivel, afinidad elemental y alas m\xE1gicas.",
    features: [
      { level: 3, name: "Resiliencia Drac\xF3nica", description: "Tu CA sin armadura es 13 + tu modificador de Destreza, y tus puntos de golpe m\xE1ximos aumentan en 1 por cada nivel de hechicero que tengas." },
      { level: 6, name: "Afinidad Elemental", description: "Sumas tu modificador de Carisma a una tirada de da\xF1o de tus conjuros que inflijan el tipo de da\xF1o asociado a tu ancestro drac\xF3nico (Fuego, Fr\xEDo, \xC1cido, Rayo o Veneno) y puedes gastar 1 punto de hechicer\xEDa para ganar resistencia a ese da\xF1o durante 1 hora." },
      { level: 14, name: "Alas de Drag\xF3n", description: "Como acci\xF3n adicional manifiestas alas de drag\xF3n en tu espalda, obteniendo una velocidad de vuelo igual a tu velocidad actual al caminar mientras no vistas armadura pesada." },
      { level: 18, name: "Presencia Drac\xF3nica", description: "Como acci\xF3n gastas 5 puntos de hechicer\xEDa para emanar un aura temible de 18 metros durante 1 minuto: todos los enemigos deben superar una salvaci\xF3n de Sabidur\xEDa o quedar Hechizados o Asustados por ti." }
    ]
  },
  {
    id: "magia_salvaje",
    classId: "hechicero",
    name: "Magia Salvaje",
    description: "Manipulaci\xF3n del caos primordial. Mareas de caos para ganar ventaja a voluntad y tabla de sobretensiones m\xE1gicas impredecibles.",
    features: [
      { level: 3, name: "Mareas de Caos", description: "Obtienes ventaja en una tirada de ataque, prueba de caracter\xEDstica o salvaci\xF3n de d20 a voluntad. Tras usarlo, el DM puede activar una Oleada de Magia Salvaje en cualquier momento tras lanzar un conjuro de nivel 1+ para recargar el rasgo." },
      { level: 3, name: "Oleada de Magia Salvaje", description: "Al lanzar un conjuro de nivel 1+, tiras 1d20: con un resultado de 1 desatas un efecto impredecible de la tabla de Magia Salvaje." },
      { level: 6, name: "Doblar la Suerte", description: "Como reacci\xF3n cuando otra criatura hace un ataque, prueba o salvaci\xF3n, gastas 2 puntos de hechicer\xEDa para sumar o restar 1d4 al resultado de su tirada de d20." },
      { level: 14, name: "Caos Controlado", description: "Cada vez que tires en la tabla de Oleadas de Magia Salvaje, tiras 2 veces en la tabla y eliges cu\xE1l de los dos resultados prefieres que tenga efecto." },
      { level: 18, name: "Bombardeo M\xE1gico", description: "Cuando tires el da\xF1o de un conjuro y saques el resultado m\xE1ximo en cualquiera de los dados de da\xF1o, tiras ese dado una vez m\xE1s y sumas su valor al total del da\xF1o." }
    ]
  },
  {
    id: "hechiceria_aberrante",
    classId: "hechicero",
    name: "Hechicer\xEDa Aberrante",
    description: "Poder psi\xF3nico del Reino Lejano. Habla mental telep\xE1tica, defensas ps\xEDquicas y lanzamiento de conjuros sin componentes.",
    features: [
      { level: 3, name: "Habla Telep\xE1tica", description: "Como acci\xF3n adicional estableces un enlace mental telep\xE1tico con una criatura visible a 9 metros durante un n\xFAmero de minutos igual a tu nivel de hechicero." },
      { level: 3, name: "Conjuros Psi\xF3nicos", description: "Aprendes una lista de conjuros psi\xF3nicos adicionales (como Susurros Discordantes, Brazos de Hadar, Detecci\xF3n de Pensamientos y Tent\xE1culos Negros)." },
      { level: 6, name: "Hechicer\xEDa Psi\xF3nica y Defensas", description: "Puedes lanzar tus conjuros psi\xF3nicos gastando puntos de hechicer\xEDa iguales al nivel del conjuro sin componentes verbales, som\xE1ticos ni materiales no costosos. Adem\xE1s, tienes resistencia al da\xF1o ps\xEDquico y ventaja contra Hechizado y Asustado." },
      { level: 14, name: "Forma Aberrante", description: "Gastas 1 o m\xE1s puntos de hechicer\xEDa para transformar tu cuerpo durante 10 minutos: volar, nadar y respirar agua, comprimirte por grietas de 2,5 cm o ver criaturas invisibles a 18 metros." },
      { level: 18, name: "Implosi\xF3n del Reino Lejano", description: "Como acci\xF3n gastas 5 puntos de hechicer\xEDa para teletransportarte hasta 36 m dejando una singularidad gravitatoria: las criaturas a 6 m sufren 3d10 de da\xF1o de Fuerza y son atra\xEDdas hacia el centro si fallan salvaci\xF3n de Fuerza." }
    ]
  },
  {
    id: "hechiceria_mecanica",
    classId: "hechicero",
    name: "Mecanismo Relojero",
    description: "Orden c\xF3smico de Mechanus. Neutraliza ventajas y desventajas ca\xF3ticas y levanta barreras protectoras de engranajes m\xE1gicos.",
    features: [
      { level: 3, name: "Restaurar el Equilibrio", description: "Como reacci\xF3n cuando una criatura a 18 m va a tirar con ventaja o desventaja, puedes anularla de inmediato (usos por descanso largo igual a BC)." },
      { level: 3, name: "Magia de Mecanismo", description: "Aprendes conjuros del orden de Mechanus (como Alarma, Armadura de Agathys, Restablecimiento Menor y Muro de Fuerza)." },
      { level: 6, name: "Baluarte de la Ley", description: "Gastas de 1 a 5 puntos de hechicer\xEDa para rodearte a ti o a un aliado de un escudo de engranajes: absorbe da\xF1o igual a una cantidad de dados d8 gastados hasta el pr\xF3ximo descanso largo." },
      { level: 14, name: "Esp\xEDritus del Engranaje", description: "Invocas esp\xEDritus mec\xE1nicos que reparan el orden: durante 1 minuto cualquier tirada de d20 inferior a 10 en ataques, pruebas y salvaciones se convierte autom\xE1ticamente en un 10." },
      { level: 18, name: "Trance de Mechanus", description: "Como acci\xF3n adicional entras en sinton\xEDa con Mechanus durante 1 minuto: restauras hasta 100 PG entre criaturas a 9 m, reparas objetos da\xF1ados y disipas conjuros de nivel 6 o menor en el \xE1rea." }
    ]
  },
  {
    id: "alma_divina",
    classId: "hechicero",
    name: "Alma Divina (Divine Soul)",
    description: "Descendiente o bendecido por los dioses de Faer\xFBn. Accede libremente a toda la lista de conjuros sagrados de Cl\xE9rigo con Metamagia.",
    features: [
      { level: 3, name: "Magia Divina", description: "Puedes elegir tus conjuros aprendidos tanto de la lista de hechicero como de la lista de cl\xE9rigo libremente." },
      { level: 3, name: "Favorecido por los Dioses", description: "Si fallas una tirada de ataque o una tirada de salvaci\xF3n, sumas 2d4 al total de tu tirada (1 vez por descanso corto o largo)." },
      { level: 6, name: "Curaci\xF3n Potenciada", description: "Cuando t\xFA o un aliado a 1,5 metros tir\xE9is dados para restaurar PG con un conjuro, puedes gastar 1 punto de hechicer\xEDa para volver a tirar cualquier n\xFAmero de esos dados de curaci\xF3n." },
      { level: 14, name: "Alas Celestiales", description: "Como acci\xF3n adicional manifiestas alas emplumadas divinas o de murci\xE9lago espectral que te otorgan una velocidad de vuelo de 9 metros permanentemente." },
      { level: 18, name: "Recuperaci\xF3n Sobrenatural", description: "Como acci\xF3n adicional cuando tengas menos de la mitad de tus PG m\xE1ximos, recuperas instant\xE1neamente una cantidad de PG igual a la mitad de tus PG m\xE1ximos (1 vez por descanso largo)." }
    ]
  },
  {
    id: "magia_fuego_hechizado",
    classId: "hechicero",
    name: "Magia de Fuego M\xE1gico (Spellfire - H\xE9roes de Faer\xFBn)",
    description: "Portador legendario del Fuego M\xE1gico (Spellfire), la energ\xEDa pura primordial de la Trama de Mystra en Faer\xFBn. Absorbe magia enemiga y canaliza r\xE1fagas de luz sanadora y destructiva.",
    features: [
      { level: 3, name: "Absorci\xF3n de la Trama (Spellfire Wielder)", description: "Como reacci\xF3n cuando eres objetivo de un conjuro o est\xE1s en su \xE1rea, puedes absorber parte de la energ\xEDa m\xE1gica ganando Puntos de Fuego M\xE1gico." },
      { level: 3, name: "Descarga de Fuego M\xE1gico", description: "Disparas energ\xEDa m\xEDstica pura: infliges da\xF1o radiante que ignora resistencias o sanas a un aliado visible a 18 metros gastando tus puntos de Spellfire." },
      { level: 6, name: "Corona de Fuego M\xE1gico", description: "Como acci\xF3n adicional te coronas de fuego m\xEDstico: emites luz brillante de 9 m, ganas resistencia al da\xF1o radiante y de fuerza, y tus descargas aumentan en +1d8 de da\xF1o o curaci\xF3n." },
      { level: 14, name: "Vuelo de la Trama", description: "Como acci\xF3n adicional te disuelves en pura energ\xEDa de Spellfire ganando velocidad de vuelo de 18 m y la capacidad de atravesar barreras m\xE1gicas s\xF3lidas como Muro de Fuerza o Campos Antimagia." },
      { level: 18, name: "Avatar del Fuego M\xE1gico de Mystra", description: "Desatas el poder supremo de la Trama durante 1 minuto: absorbes autom\xE1ticamente cualquier conjuro de nivel 5 o menor que te apunte y tus descargas infligen 10d10 de da\xF1o radiante que desintegra a los enemigos." }
    ]
  },
  {
    id: "magia_sombras",
    classId: "hechicero",
    name: "Magia de las Sombras",
    description: "Imbuido por la esencia oscura del P\xE1ramo Sombr\xEDo (Shadowfell). Visi\xF3n en la oscuridad de 36 m, evitar la muerte y Sabueso del Infortunio.",
    features: [
      { level: 3, name: "Ojos de la Oscuridad (36 m)", description: "Visi\xF3n en la oscuridad de 36 metros y puedes lanzar el conjuro Oscuridad gastando 2 puntos de hechicer\xEDa viendo a trav\xE9s de \xE9l perfectamente." },
      { level: 3, name: "Fuerza de la Tumba", description: "Al caer a 0 PG, haces una salvaci\xF3n de Carisma (CD 5 + da\xF1o sufrido) para quedar a 1 PG en su lugar (salvo da\xF1o radiante o golpe cr\xEDtico)." },
      { level: 6, name: "Sabueso del Infortunio", description: "Como acci\xF3n adicional gastas 3 puntos de hechicer\xEDa para invocar un sabueso de sombras que hostiga a un objetivo d\xE1ndole desventaja en salvaciones contra todos tus conjuros." },
      { level: 14, name: "Paso de las Sombras", description: "Mientras est\xE9s en penumbra u oscuridad, puedes teletransportarte hasta 36 metros como acci\xF3n adicional a otro espacio desocupado en penumbra u oscuridad." },
      { level: 18, name: "Forma Sombr\xEDa", description: "Gastas 6 puntos de hechicer\xEDa para transformarte en sombra durante 1 minuto: resistencia a todo da\xF1o excepto radiante y de fuerza, y atraviesas criaturas y paredes s\xF3lidas." }
    ]
  },
  {
    id: "tormenta_hechizada",
    classId: "hechicero",
    name: "Hechicer\xEDa de la Tormenta",
    description: "Poder elemental del viento y el rel\xE1mpago de la Costa de la Espada. Vuela distancias cortas al lanzar conjuros y desata tormentas.",
    features: [
      { level: 3, name: "Magia Tempestuosa", description: "Como acci\xF3n adicional inmediatamente antes o despu\xE9s de lanzar un conjuro de nivel 1+, vuelas hasta 3 metros sin provocar ataques de oportunidad." },
      { level: 3, name: "Habla del Viento", description: "Comprendes, hablas y escribes el idioma primordial (y sus dialectos acuano, \xE1urico, \xEDgneo y t\xE9rreo)." },
      { level: 6, name: "Coraz\xF3n de la Tormenta", description: "Obtienes resistencia al da\xF1o por rayo y trueno. Al lanzar un conjuro de nivel 1+, infliges la mitad de tu nivel de hechicero en da\xF1o de rayo o trueno a criaturas a 3 metros." },
      { level: 14, name: "Furia de la Tempestad", description: "Como reacci\xF3n al recibir un golpe cuerpo a cuerpo, infliges da\xF1o de rayo igual a tu nivel de hechicero al atacante y lo empujas 6 metros si falla salvaci\xF3n de Fuerza." },
      { level: 18, name: "Alma del Hurac\xE1n", description: "Obtienes inmunidad total al da\xF1o de rayo y trueno, velocidad de vuelo m\xE1gica de 18 metros y puedes otorgar 9 metros de vuelo a hasta 8 aliados cercanos durante 1 hora." }
    ]
  },
  // ==========================================
  // --- MONJE (MONK - Niveles 3, 6, 11, 17) ---
  // ==========================================
  {
    id: "mano_abierta",
    classId: "monje",
    name: "Guerrero de la Mano Abierta",
    description: "Maestro indiscutible del combate sin armas: derriba, empuja 4,5 metros o anula reacciones rivales, culminando en la Palma Temblorosa.",
    features: [
      { level: 3, name: "Técnica de la Mano Abierta", description: "Al impactar con un ataque de tu Ráfaga de Golpes, puedes imponer uno de los siguientes efectos a la criatura: • Derribar (salvación de Destreza o cae derribada), • Empujar (salvación de Fuerza o es empujada hasta 4,5 m de ti), o • Desestabilizar (no puede realizar reacciones hasta el final de tu siguiente turno)." },
      { level: 6, name: "Plenitud del Cuerpo", description: "Como acción adicional, puedes recuperar una cantidad de puntos de golpe igual a 3 veces tu nivel de monje (1 vez por descanso largo)." },
      { level: 11, name: "Santuario Tranquilo", description: "Al finalizar un descanso largo, quedas bajo los efectos del conjuro Santuario hasta el inicio de tu próximo descanso largo o hasta que realices un ataque o conjuro." },
      { level: 17, name: "Palma Temblorosa (Quivering Palm)", description: "Gastas 3 puntos de concentración al impactar con golpe desarmado para introducir vibraciones letales; como acción puedes detonarlas forzando una tirada de salvación de Constitución o reducir al objetivo a 0 PG (o 10d10 daño necrótico en éxito)." }
    ]
  },
  {
    id: "guerrero_sombras",
    classId: "monje",
    name: "Guerrero de las Sombras",
    description: "Ninja sigiloso. Conjuros de oscuridad y silencio, y el legendario Salto de las Sombras para teletransportarte de penumbra a penumbra.",
    features: [
      { level: 3, name: "Artes de las Sombras", description: "Obtienes visión en la oscuridad mágica de 18 metros y puedes gastar 1 punto de concentración para lanzar el conjuro Oscuridad pudiendo ver a través de ella perfectamente." },
      { level: 6, name: "Paso de las Sombras", description: "Mientras estés en penumbra u oscuridad, puedes teletransportarte hasta 18 metros a otro punto en penumbra u oscuridad como acción adicional y tienes ventaja en tu próximo ataque cuerpo a cuerpo este turno." },
      { level: 11, name: "Manto de Sombras", description: "Mientras estés en penumbra u oscuridad, puedes usar tu acción para volverte completamente invisible hasta que realices un ataque, lances un conjuro o entres en luz brillante." },
      { level: 17, name: "Oportunista de las Sombras", description: "Como reacción cuando una criatura a 1,5 metros de ti recibe un impacto de ataque de otra persona, puedes realizar un ataque cuerpo a cuerpo contra esa criatura de inmediato." }
    ]
  },
  {
    id: "guerrero_elementos",
    classId: "monje",
    name: "Guerrero de los Elementos",
    description: "Imbuye tus golpes con energía elemental (fuego, rayo, hielo, ácido) con alcance de 4,5 metros y explosiones de ki devastadoras.",
    features: [
      { level: 3, name: "Manipular los Elementos", description: "Conoces el truco Elementalismo. Tu característica para lanzar este truco es la Sabiduría." },
      { level: 3, name: "Sintonía Elemental", description: "Gastas 1 punto de concentración durante 10 minutos: el alcance de tus golpes desarmados aumenta en 3 metros (a 4,5 m) e infligen daño por Fuego, Frío, Ácido, Rayo o Trueno." },
      { level: 6, name: "Explosión Elemental", description: "Como acción gastas 2 puntos de concentración para desatar una esfera elemental de 6 m de radio a 36 m que causa daño igual a 3 dados de artes marciales (salvación de Destreza mitad de daño)." },
      { level: 11, name: "Zancada Elemental", description: "Mientras tu Sintonía Elemental esté activa, obtienes una velocidad de vuelo y una velocidad de nado iguales a tu velocidad al caminar." },
      { level: 17, name: "Cataclismo Primordial", description: "Al usar Explosión Elemental o impactar con ataques elementales, puedes gastar 1 punto de concentración adicional para forzar una salvación de Fuerza o atrapar/empujar 9 metros a todos los enemigos afectados." }
    ]
  },
  {
    id: "guerrero_piedad",
    classId: "monje",
    name: "Guerrero de la Piedad",
    description: "Monje médico y ejecutor. Toque de Curación para sanar aliados y Toque de Daño para envenenar e infligir daño necrótico letal.",
    features: [
      { level: 3, name: "Manos de Sanación y Daño", description: "Gastas 1 punto de concentración para usar Mano de Curación (sana un dado de artes marciales + Sabiduría) o Mano de Daño (inflige un dado de artes marciales + Sabiduría en daño necrótico al golpear)." },
      { level: 6, name: "Toque del Médico", description: "Tu Mano de Curación elimina las condiciones de Cegado, Ensordecido, Paralizado, Envenenado o Aturdido. Tu Mano de Daño impone la condición de Envenenado al objetivo hasta el final de tu siguiente turno sin tirada de salvación." },
      { level: 11, name: "Ráfaga Sanadora", description: "Puedes sustituir cualquiera de los golpes desarmados de tu Ráfaga de Golpes por Manos de Curación sin gastar puntos de concentración adicionales." },
      { level: 17, name: "Mano de la Muerte Suprema", description: "Como acción tocas a una criatura que haya muerto en las últimas 24 horas y gastas 5 puntos de concentración para devolverla a la vida con PG iguales a 4d10 + Sabiduría (1 vez por descanso largo)." }
    ]
  },
  {
    id: "kensei",
    classId: "monje",
    name: "Senda del Kensei",
    description: "Maestros del acero que convierten armas marciales en extensiones de su espíritu. Disparos certeros, parada ágil y filo mágico.",
    features: [
      { level: 3, name: "Armas Kensei", description: "Eliges dos armas (una cuerpo a cuerpo y una a distancia) como armas Kensei que cuentan como armas de monje con las que aplicas tus artes marciales." },
      { level: 3, name: "Parada Ágil (+2 CA)", description: "Si realizas un golpe desarmado mientras empuñas un arma Kensei cuerpo a cuerpo, obtienes un bonificador de +2 a tu CA hasta el inicio de tu siguiente turno." },
      { level: 3, name: "Disparo Kensei", description: "Como acción adicional sumas 1d4 de daño a todos tus ataques a distancia con armas Kensei durante este turno." },
      { level: 6, name: "Uno con la Espada", description: "Tus ataques con armas Kensei cuentan como mágicos. Con Golpe Hábil, gastas 1 punto de concentración para sumar tu dado de artes marciales al daño del arma al impactar." },
      { level: 11, name: "Afilar la Hoja", description: "Como acción adicional gastas hasta 3 puntos de concentración para otorgar a tu arma Kensei un bonificador mágico de hasta +3 a tiradas de ataque y daño durante 1 minuto." },
      { level: 17, name: "Precisión Infalible", description: "Si fallas una tirada de ataque con un arma Kensei o golpe desarmado en tu turno, puedes volver a realizar la tirada de ataque." }
    ]
  },
  {
    id: "maestro_borracho",
    classId: "monje",
    name: "Senda del Maestro Borracho",
    description: "Técnica de balanceos impredecibles y giros evasivos. Desengancharse automático con Ráfaga de Golpes y levantarse al instante.",
    features: [
      { level: 3, name: "Técnica del Borracho", description: "Ganas competencia en Interpretación. Al usar Ráfaga de Golpes obtienes los beneficios de la acción de Desengancharse automáticamente y tu velocidad aumenta 3 m este turno." },
      { level: 6, name: "Balanceo Temerario y Redirección", description: "Levantarte del suelo cuesta solo 1,5 metros de movimiento. Con Redirigir Ataque, cuando un enemigo falle un ataque contra ti, usas tu reacción y 1 punto de concentración para hacer que golpee a otra criatura a 1,5 m." },
      { level: 11, name: "Suerte del Borracho", description: "Cuando realizas una tirada de salvación o prueba con desventaja, puedes gastar 1 punto de concentración para cancelar la desventaja." },
      { level: 17, name: "Frenesí Ebrio", description: "Al usar Ráfaga de Golpes puedes realizar hasta 5 ataques de ráfaga (en lugar de 2), siempre que cada uno de ellos apunte a una criatura diferente." }
    ]
  },
  {
    id: "muerte_larga",
    classId: "monje",
    name: "Senda de la Muerte Larga",
    description: "Monjes devotos de los secretos de la muerte de Kelemvor. Drenan la energía vital de enemigos caídos para ganar puntos de golpe temporales.",
    features: [
      { level: 3, name: "Toque de Muerte", description: "Cuando reduces a una criatura a 0 PG a 1,5 metros de ti, ganas puntos de golpe temporales iguales a tu modificador de Sabiduría + tu nivel de monje." },
      { level: 6, name: "Rostro Aterrador", description: "Como acción muestras tu vínculo con la muerte obligando a todas las criaturas a 9 metros que puedan verte a superar una tirada de salvación de Sabiduría o quedar Asustadas de ti hasta el final de tu siguiente turno." },
      { level: 11, name: "Maestría de la Muerte", description: "Cuando tus PG se reducen a 0, puedes gastar 1 punto de concentración para quedar a 1 PG en su lugar sin caer inconsciente." },
      { level: 17, name: "Toque del Fin Absoluto", description: "Como acción tocas a una criatura y gastas de 1 a 10 puntos de concentración: el objetivo debe superar una tirada de salvación de Constitución o sufrir 2d10 de daño necrótico por cada punto de concentración gastado (o mitad en éxito)." }
    ]
  },
  {
    id: "yo_astral",
    classId: "monje",
    name: "Senda del Yo Astral",
    description: "Manifiesta brazos espectrales de energía cósmica que atacan con Sabiduría a 3 metros de distancia.",
    features: [
      { level: 3, name: "Brazos del Yo Astral", description: "Gastas 1 punto de concentración para manifestar brazos astrales durante 10 minutos: atacas usando Sabiduría en lugar de Fuerza/Destreza, infliges daño de Fuerza y tu alcance cuerpo a cuerpo es de 3 metros." },
      { level: 6, name: "Visaje del Yo Astral", description: "Manifiestas el rostro astral: visión perfecta en oscuridad mágica y mundana de 36 m, voz magnificada audible a 180 m y ventaja en pruebas de Sabiduría (Perspicacia) y Carisma (Intimidación)." },
      { level: 11, name: "Cuerpo del Yo Astral", description: "Manifiestas la armadura astral: reduces el daño elemental recibido (ácido, frío, fuego, rayo o trueno) como reacción y sumas tu dado de artes marciales al daño de un ataque por turno." },
      { level: 17, name: "Despertar Astral Completo", description: "Gastas 5 puntos de concentración para manifestar tu forma astral suprema durante 10 minutos: obtienes un bonificador de +2 a tu CA y realizas 3 ataques por acción de Atacar más un ataque adicional en Ráfaga de Golpes." }
    ]
  },
  // ==========================================
  // --- EXPLORADOR (RANGER - Niveles 3, 7, 11, 15) ---
  // ==========================================
  {
    id: "cazador",
    classId: "explorador",
    name: "Cazador",
    description: "Especialista en abatir amenazas: Asolador de colosos (1d8 extra), defensas t\xE1cticas y andanadas de flechas.",
    features: [
      { level: 3, name: "Presa del Cazador", description: "Eliges una especialidad: Asolador de Colosos (1d8 extra por turno contra criaturas da\xF1adas), Matahordas (un ataque con arma adicional gratis contra un segundo objetivo a 1,5 m) o Rompegigantes (reacci\xF3n para contraatacar a criaturas Grandes que te fallen)." },
      { level: 7, name: "T\xE1cticas Defensivas", description: "Eliges una defensa: Escapar de la Horda (desventaja en ataques de oportunidad contra ti), Defensa Multiatacante (+4 a la CA contra ataques subsiguientes del mismo rival) o Voluntad de Acero (ventaja en salvaciones contra Asustado)." },
      { level: 11, name: "Ataque M\xFAltiple", description: "Eliges: Andanada (ataque a distancia contra cualquier n\xFAmero de criaturas en un radio de 3 m) o Ataque en Torbellino (ataque cuerpo a cuerpo contra todas las criaturas a tu alcance)." },
      { level: 15, name: "Defensa de Cazador Superior", description: "Eliges: Evasi\xF3n (cero da\xF1o en salvaciones exitosas de Destreza, mitad en fallo), Parada Sobrenatural (reacci\xF3n para reducir el da\xF1o a la mitad) o Desviar Ataque (redirigir un ataque fallido a otro rival)." }
    ]
  },
  {
    id: "acechador_penumbroso",
    classId: "explorador",
    name: "Acechador Penumbroso",
    description: "Se\xF1or de la infraoscuridad. Invisible a la visi\xF3n en la oscuridad y emboscada devastadora en el primer asalto de combate.",
    features: [
      { level: 3, name: "Emboscador Temible", description: "Sumas tu modificador de Sabidur\xEDa a tus tiradas de iniciativa. En el primer turno de combate tu velocidad aumenta 3 m y realizas un ataque extra con arma que inflige 1d8 de da\xF1o adicional." },
      { level: 3, name: "Vista en la Penumbra", description: "Ganas visi\xF3n en la oscuridad de 18 metros (o ampl\xEDas la tuya en 9 m). Mientras est\xE9s en la oscuridad, eres completamente invisible para cualquier criatura que dependa de visi\xF3n en la oscuridad para verte." },
      { level: 7, name: "Mente de Hierro", description: "Ganas competencia en tiradas de salvaci\xF3n de Sabidur\xEDa. Si ya la ten\xEDas, ganas competencia en tiradas de salvaci\xF3n de Inteligencia o Carisma." },
      { level: 11, name: "R\xE1faga del Acechador", description: "Una vez en cada uno de tus turnos, si fallas una tirada de ataque con arma, puedes realizar otro ataque con arma adicional como parte de la misma acci\xF3n." },
      { level: 15, name: "Esquiva de Sombras", description: "Cuando una criatura realiza una tirada de ataque contra ti sin tener ventaja, puedes usar tu reacci\xF3n para imponerle desventaja en esa tirada de ataque." }
    ]
  },
  {
    id: "maestro_bestias",
    classId: "explorador",
    name: "Maestro de Bestias",
    description: "V\xEDnculo emp\xE1tico con una bestia primal de tierra, mar o aire que lucha coordinadamente en cada combate.",
    features: [
      { level: 3, name: "Compa\xF1ero Primal", description: "Invocas un esp\xEDritu bestial de la Tierra, Mar o Cielo que act\xFAa en tu turno. Puedes ordenarle atacar usando uno de tus ataques o tu acci\xF3n adicional." },
      { level: 7, name: "Entrenamiento Excepcional", description: "En los turnos en que no ordenes atacar a tu bestia, esta puede usar su acci\xF3n adicional para Correr, Destrabarse o Esquivar. Adem\xE1s, sus ataques cuentan como m\xE1gicos." },
      { level: 11, name: "Furia Bestial", description: "Tu compa\xF1ero primal puede realizar dos ataques (en lugar de uno) cuando le ordenas realizar la acci\xF3n de Atacar en su turno." },
      { level: 15, name: "Compartir Conjuros", description: "Cuando lanzas un conjuro que te apunte a ti mismo, el conjuro tambi\xE9n afecta autom\xE1ticamente a tu compa\xF1ero primal si este se encuentra a 9 metros de ti." }
    ]
  },
  {
    id: "nomada_feerico",
    classId: "explorador",
    name: "N\xF3mada Fe\xE9rico",
    description: "Bendecido por la corte de las hadas: a\xF1ade Sabidur\xEDa a las pruebas de Carisma y ataques imbuidos con da\xF1o ps\xEDquico.",
    features: [
      { level: 3, name: "Presencia de Otro Mundo", description: "Sumas tu modificador de Sabidur\xEDa a todas tus pruebas de Carisma y ganas competencia en Enga\xF1o, Interpretaci\xF3n o Persuasi\xF3n." },
      { level: 3, name: "Golpes Pavorosos", description: "Tus ataques con arma infligen 1d4 de da\xF1o ps\xEDquico adicional a cada criatura diferente a la que impactes en tu turno (aumenta a 1d6 a nivel 11)." },
      { level: 7, name: "Giro Embaucador", description: "Ventaja en salvaciones contra Hechizado y Asustado. Cuando t\xFA o un aliado super\xE1is una salvaci\xF3n contra esos efectos, usas tu reacci\xF3n para forzar a un enemigo a 36 m a superar salvaci\xF3n de Sabidur\xEDa o sufrir ese mismo efecto." },
      { level: 11, name: "Refuerzos Fe\xE9ricos", description: "Puedes lanzar el conjuro Invocar Fata sin gastar espacios de conjuro ni requerir componentes materiales una vez por descanso largo (o gastando un espacio de conjuro)." },
      { level: 15, name: "Niebla Crepuscular", description: "Puedes lanzar Paso Brumoso sin gastar espacios de conjuro un n\xFAmero de veces igual a tu modificador de Sabidur\xEDa por descanso largo, y puedes llevarte a un aliado voluntario adyacente contigo al teletransportarte." }
    ]
  },
  {
    id: "caminante_invernal",
    classId: "explorador",
    name: "Caminante Invernal (H\xE9roes de Faer\xFBn)",
    description: "Cazador endurecido de las tundras del Valle del Viento Helado (Icewind Dale). Resistencia al fr\xEDo, ignora resistencias heladas y traba a sus presas con escarcha.",
    features: [
      { level: 3, name: "Adaptaci\xF3n Glacial", description: "Obtienes resistencia al da\xF1o por fr\xEDo, tus ataques y conjuros ignoran la resistencia al fr\xEDo de otras criaturas y te mueves por terreno nevado o helado sin penalizaci\xF3n de velocidad." },
      { level: 3, name: "Marca Escarchada (Marca del Cazador G\xE9lida)", description: "Tu Marca del Cazador se impregna de escarcha: la criatura marcada no puede realizar la acci\xF3n de Destrabarse, su velocidad se reduce en 3 m y ganas PG temporales iguales a tu Sabidur\xEDa al da\xF1arla." },
      { level: 7, name: "Manto de la Ventisca", description: "Como reacci\xF3n cuando eres golpeado por un ataque, desatas una ventisca que reduce el da\xF1o a la mitad y congela el suelo a 4,5 m a tu alrededor convirti\xE9ndolo en terreno dif\xEDcil con escarcha." },
      { level: 11, name: "Presa Congelada", description: "Los ataques contra criaturas afectadas por tu Marca Escarchada infligen 1d8 de da\xF1o por fr\xEDo adicional y si el objetivo sufre da\xF1o de fr\xEDo su velocidad se reduce a 0 hasta su siguiente turno." },
      { level: 15, name: "Tormenta Glacial Viviente", description: "Como acci\xF3n puedes invocar una ventisca legendaria de 9 m de radio durante 1 minuto: ganas resistencia a todo da\xF1o salvo fuego, tus ataques tienen ventaja y los enemigos en el \xE1rea sufren 4d8 de fr\xEDo al inicio de su turno." }
    ]
  },
  {
    id: "caminante_horizonte",
    classId: "explorador",
    name: "Caminante del Horizonte",
    description: "Guardianes de las fronteras planares de Faer\xFBn. Detectan portales m\xE1gicos, se teletransportan en combate y convierten el da\xF1o a Fuerza.",
    features: [
      { level: 3, name: "Golpe Planar", description: "Como acci\xF3n adicional, el pr\xF3ximo impacto con arma que asestes en este turno convierte todo el da\xF1o del arma a da\xF1o de Fuerza e inflige 1d8 de da\xF1o de Fuerza adicional (2d8 a nivel 11)." },
      { level: 3, name: "Sentido de Portales", description: "Como acci\xF3n detectas la distancia y direcci\xF3n exacta del portal planar m\xE1s cercano ubicado en un radio de 1,5 kil\xF3metros." },
      { level: 7, name: "Paso Et\xE9reo", description: "Como acci\xF3n adicional lanzas el conjuro Paseo Et\xE9reo sin gastar espacio de conjuro, durando hasta el final de tu turno actual (1 vez por descanso corto o largo)." },
      { level: 11, name: "Golpe Distante", description: "Cuando realizas la acci\xF3n de Atacar, puedes teletransportarte hasta 3 metros antes de cada uno de tus ataques; si atacas a dos criaturas diferentes, realizas un tercer ataque gratis." },
      { level: 15, name: "Defensa Espectral", description: "Como reacci\xF3n cuando recibes da\xF1o de un ataque, te desvaneces parcialmente en el plano et\xE9reo obteniendo resistencia contra todo el da\xF1o de ese ataque." }
    ]
  },
  {
    id: "matador_monstruos",
    classId: "explorador",
    name: "Cazador de Monstruos",
    description: "Especialista en cazar lic\xE1ntropos, dragones, no-muertos y aberraciones de Faer\xFBn mediante sentidos sobrenaturales y presas marcadas.",
    features: [
      { level: 3, name: "Presa del Cazador", description: "Como acci\xF3n adicional marcas a un objetivo a 18 m: la primera vez que le impactes cada turno infliges 1d6 de da\xF1o adicional del tipo del arma." },
      { level: 3, name: "Sentidos del Cazador", description: "Como acci\xF3n aprendes al instante las inmunidades, resistencias y vulnerabilidades al da\xF1o de una criatura visible a 18 metros." },
      { level: 7, name: "Defensa Sobrenatural", description: "Sumas 1d6 a todas tus tiradas de salvaci\xF3n contra conjuros y habilidades de tu presa marcada y a pruebas para escapar de sus presas." },
      { level: 11, name: "N\xE9mesis de Conjuradores", description: "Como reacci\xF3n cuando una criatura a 18 m lanza un conjuro o se teletransporta, puedes forzarla a hacer salvaci\xF3n de Sabidur\xEDa contra tu CD o fallar el conjuro/teletransporte." },
      { level: 15, name: "Contraataque del Asesino", description: "Cuando tu presa marcada te obligue a realizar una tirada de salvaci\xF3n, puedes usar tu reacci\xF3n para hacer un ataque con arma contra ella; si impactas, superas la salvaci\xF3n autom\xE1ticamente." }
    ]
  },
  {
    id: "guardian_draconico",
    classId: "explorador",
    name: "Guardi\xE1n Drac\xF3nico (Drakewarden)",
    description: "V\xEDnculo sagrado con un compa\xF1ero draco elemental que lucha a tu lado, vuela como montura y exhala aliento de drag\xF3n.",
    features: [
      { level: 3, name: "Compa\xF1ero Draco", description: "Como acci\xF3n adicional convocas a tu draco elemental (Fuego, Fr\xEDo, \xC1cido, Veneno o Rayo) que combate lealmente a tu lado actuando tras tu turno." },
      { level: 3, name: "Don del Drag\xF3n", description: "Aprendes el truco Taumaturgia y aprendes a hablar, leer y escribir en idioma drac\xF3nico." },
      { level: 7, name: "V\xEDnculo Drac\xF3nico", description: "El draco gana alas y una velocidad de vuelo de 12 metros, puedes usarlo como montura y sumas 1d6 de da\xF1o elemental al atacar mientras est\xE9s montado en \xE9l." },
      { level: 11, name: "Aliento del Draco", description: "Como acci\xF3n t\xFA o tu draco exhal\xE1is un cono de 9 m o l\xEDnea de 18 m de energ\xEDa elemental que inflige 8d6 de da\xF1o (salvaci\xF3n de DES mitad; 1 vez gratis por descanso largo o gastando espacio de nivel 3+)." },
      { level: 15, name: "Draco Perfeccionado", description: "El tama\xF1o de tu draco pasa a ser Grande, su mordisco inflige 1d6 de da\xF1o elemental adicional y t\xFA obtienes resistencia permanente al tipo de da\xF1o elemental de tu draco." }
    ]
  },
  // ==========================================
  // --- BRUJO (WARLOCK - Niveles 3, 6, 10, 14) ---
  // ==========================================
  {
    id: "patron_infernal",
    classId: "brujo",
    name: "El Infernal",
    description: "Pacto con los Nueve Infiernos. Ganas PG temporales al abatir enemigos, manipulas la suerte con la Gracia del Oscuro y arrojas rivales al infierno.",
    features: [
      { level: 3, name: "Bendici\xF3n del Oscuro", description: "Al reducir una criatura enemiga a 0 PG, ganas puntos de golpe temporales iguales a tu modificador de Carisma + tu nivel de brujo." },
      { level: 3, name: "Conjuros de Patr\xF3n Infernal", description: "Conjuros adicionales preparados como Manos Ardientes, Rayo Abrasador, Bola de Fuego y Muro de Fuego." },
      { level: 6, name: "Gracia del Propio Oscuro", description: "Cuando haces una prueba de caracter\xEDstica o tirada de salvaci\xF3n, sumas 1d10 al resultado de tu tirada (1 vez por descanso corto o largo)." },
      { level: 10, name: "Resiliencia Infernal", description: "Al terminar un descanso corto o largo, eliges un tipo de da\xF1o para obtener resistencia a \xE9l hasta tu pr\xF3ximo descanso (excepto da\xF1o de Fuerza)." },
      { level: 14, name: "Arrojar al Infierno", description: "Al impactar a una criatura con un ataque, la transportas instant\xE1neamente a trav\xE9s de los Nueve Infiernos durante 1 turno; al regresar al inicio de tu siguiente turno sufre 10d10 de da\xF1o ps\xEDquico si no es un infernal (1 vez por descanso largo)." }
    ]
  },
  {
    id: "patron_archihada",
    classId: "brujo",
    name: "La Archihada",
    description: "Pacto con los se\xF1ores del Feywild. Niebla brumosa con teletransportaci\xF3n como acci\xF3n adicional que hechiza o asusta y delirio fe\xE9rico.",
    features: [
      { level: 3, name: "Paso Fe\xE9rico", description: "Te teletransportas hasta 9 metros como acci\xF3n adicional un n\xFAmero de veces igual a tu Carisma por descanso largo, desatando efectos de niebla fe\xE9rica (como Taumaturgia, Hechizar o Asustar)." },
      { level: 3, name: "Conjuros de Patr\xF3n Archihada", description: "Conjuros preparados como Fuego Fe\xE9rico, Dormir, Invisibilidad, Crecimiento Vegetal y Dominar Bestia." },
      { level: 6, name: "Escape Brumoso", description: "Como reacci\xF3n al recibir da\xF1o, te vuelves invisible y te teletransportas hasta 18 metros a un espacio libre que puedas ver (1 vez por descanso corto o largo)." },
      { level: 10, name: "Disposici\xF3n Seductora", description: "Eres inmune a la condici\xF3n de Hechizado. Cuando una criatura intenta hechizarte, puedes usar tu reacci\xF3n para intentar hechizarla a ella si falla una salvaci\xF3n de Sabidur\xEDa." },
      { level: 14, name: "Delirio Oscuro", description: "Como acci\xF3n sumerges a una criatura a 18 m en un reino ilusorio fe\xE9rico: queda Cegada, Ensordecida y Asustada o Hechizada por ti durante 1 minuto si falla una salvaci\xF3n de Sabidur\xEDa (1 vez por descanso corto o largo)." }
    ]
  },
  {
    id: "gran_primigenio",
    classId: "brujo",
    name: "El Gran Primigenio",
    description: "Pacto con entidades incomprensibles del vac\xEDo estelar. Telepat\xEDa despierta, escudo mental que refleja da\xF1o y esclavitud psi\xF3nica c\xF3smica.",
    features: [
      { level: 3, name: "Mente Despierta", description: "Te comunicas telep\xE1ticamente con cualquier criatura que veas a 9 metros sin necesidad de compartir un idioma com\xFAn." },
      { level: 3, name: "Conjuros del Gran Primigenio", description: "Conjuros preparados como Susurros Discordantes, Risa Incontrolable de Tasha, Detecci\xF3n de Pensamientos y Tent\xE1culos Negros." },
      { level: 6, name: "Escudo Entr\xF3pico", description: "Como reacci\xF3n cuando una criatura realiza una tirada de ataque contra ti, le impones desventaja en la tirada; si el ataque falla, obtienes ventaja en tu siguiente ataque contra ella antes del final de tu pr\xF3ximo turno." },
      { level: 10, name: "Escudo Mental", description: "Tus pensamientos no pueden ser le\xEDdos por telepat\xEDa. Obtienes resistencia al da\xF1o ps\xEDquico y cuando una criatura te inflige da\xF1o ps\xEDquico, sufre esa misma cantidad de da\xF1o." },
      { level: 14, name: "Crear Siervo C\xF3smico", description: "Como acci\xF3n tocas a un humanoide incapacitado: queda permanentemente bajo tu control telep\xE1tico como sirviente devoto mientras t\xFA o \xE9l no mur\xE1is o se use Restablecimiento Mayor." }
    ]
  },
  {
    id: "el_celestial",
    classId: "brujo",
    name: "El Celestial",
    description: "Pacto con un se\xF1or solar o emp\xEDreo. Sanaci\xF3n con Luz de Curaci\xF3n radiante, resistencia al fuego y venganza abrasadora.",
    features: [
      { level: 3, name: "Luz Curativa", description: "Albergas una reserva de dados d6 (1 + nivel de brujo) para curar a criaturas aliadas visibles a 18 m como acci\xF3n adicional (gastando hasta tu Carisma en dados a la vez)." },
      { level: 3, name: "Conjuros Celestiales", description: "Conjuros preparados como Curar Heridas, Gu\xEDa Sagrada, Restablecimiento Menor, Revivir y Columna de Llama." },
      { level: 6, name: "Alma Radiante", description: "Obtienes resistencia al da\xF1o radiante. Cuando lanzas un conjuro que inflija da\xF1o radiante o de fuego, sumas tu modificador de Carisma a una tirada de da\xF1o del conjuro." },
      { level: 10, name: "Resiliencia Celestial", description: "Al terminar un descanso corto o largo, ganas PG temporales iguales a tu nivel de brujo + Carisma, y hasta 5 aliados a 9 m ganan la mitad de tu nivel + Carisma." },
      { level: 14, name: "Venganza Abrasadora", description: "Cuando debas hacer una salvaci\xF3n contra la muerte al inicio de tu turno, puedes levantarte de golpe con la mitad de tus PG m\xE1ximos y desatar 2d8 + Carisma de da\xF1o radiante y ceguera a los enemigos a 9 m." }
    ]
  },
  {
    id: "el_no_muerto",
    classId: "brujo",
    name: "El No-Muerto (The Undead)",
    description: "Pacto con liches legendarios de Faer\xFBn como Szass Tam o Larloch. Adopta la Forma del Terror para asustar e infligir da\xF1o necr\xF3tico.",
    features: [
      { level: 3, name: "Forma del Terror (Proficiency/descanso)", description: "Como acci\xF3n adicional te transformas durante 1 minuto: ganas 1d10 + nivel de brujo de PG temporales, inmunidad a Asustado y al impactar con un ataque puedes obligar al objetivo a superar salvaci\xF3n de SAB o quedar Asustado." },
      { level: 3, name: "Conjuros del No-Muerto", description: "Conjuros preparados como Toque Vamp\xEDrico, Falsa Vida, Ceguera/Sordera, Muerte Fingida y Dardo de las Sombras." },
      { level: 6, name: "Toque Grave", description: "No necesitas respirar, comer ni beber. Una vez por turno al infligir da\xF1o con un ataque, puedes convertir todo el da\xF1o a da\xF1o necr\xF3tico y sumar 1 dado de da\xF1o necr\xF3tico adicional." },
      { level: 10, name: "Proyecci\xF3n Necr\xF3tica", description: "Como acci\xF3n proyectas tu esp\xEDritu fuera de tu cuerpo f\xEDsico durante 1 hora: vuelas, atraviesas paredes s\xF3lidas y tus conjuros de nigromancia gastan menos concentraci\xF3n." },
      { level: 14, name: "Explosi\xF3n Necr\xF3tica", description: "Si tu cuerpo cae a 0 PG, puedes detonar tu Forma del Terror causando 2d10 + nivel de brujo de da\xF1o necr\xF3tico a los enemigos en 9 m y resurgir de inmediato con 1 PG en su lugar." }
    ]
  },
  {
    id: "el_insondable",
    classId: "brujo",
    name: "El Insondable (The Fathomless)",
    description: "Pacto con los horrores de las profundidades del Mar de las Espadas y leviatanes. Invoca tent\xE1culos espectrales de agua y fr\xEDo.",
    features: [
      { level: 3, name: "Tent\xE1culo de las Profundidades", description: "Como acci\xF3n adicional invocas un tent\xE1culo espectral a 18 m que ataca infligiendo 1d8 de da\xF1o por fr\xEDo y reduce la velocidad del enemigo en 3 metros." },
      { level: 3, name: "Regalo del Mar", description: "Obtienes una velocidad de nado de 12 metros y la capacidad de respirar bajo el agua indefinidamente." },
      { level: 6, name: "Agarre Oce\xE1nico", description: "Puedes usar tu tent\xE1culo como reacci\xF3n para reducir en 1d8 el da\xF1o que reciba un aliado a 9 m. Adem\xE1s, puedes comunicarte telep\xE1ticamente bajo el agua con cualquier criatura que nade." },
      { level: 10, name: "Agarre Evocador", description: "Cuando lanzas un conjuro que requiera concentraci\xF3n, tu tent\xE1culo te otorga un escudo de PG temporales y tu concentraci\xF3n no puede ser interrumpida por da\xF1o mientras los tengas." },
      { level: 14, name: "Transporte Abisal", description: "Como acci\xF3n t\xFA y hasta 5 criaturas voluntarias a 9 m os teletransport\xE1is a trav\xE9s de un estanque de agua hasta cualquier cuerpo de agua conocido a 150 km de distancia (1 vez por descanso corto o largo)." }
    ]
  },
  {
    id: "genio_elemental",
    classId: "brujo",
    name: "El Genio Noble",
    description: "Pacto con nobles genios de Calimshan (Djinni, Efreeti, Dao o Marid). Recept\xE1culo m\xEDstico del genio y da\xF1o elemental en tus ataques.",
    features: [
      { level: 3, name: "Recept\xE1culo del Genio", description: "Llevas un objeto m\xE1gico como l\xE1mpara o anillo que te permite entrar en su interior para descansar y sumas tu bonificador de competencia en da\xF1o elemental (fuego, fr\xEDo, trueno o contundente) a tus ataques." },
      { level: 3, name: "Conjuros del Genio", description: "Conjuros preparados seg\xFAn tu elemento (Manos Ardientes, R\xE1faga de Viento, Muro de Piedra o Santuario)." },
      { level: 6, name: "Regalo Elemental", description: "Ganas resistencia permanente al tipo de da\xF1o elemental de tu genio patr\xF3n y como acci\xF3n adicional obtienes una velocidad de vuelo de 9 metros durante 10 minutos (usos por descanso largo igual a BC)." },
      { level: 10, name: "Refugio del Recept\xE1culo", description: "Puedes llevar hasta 5 criaturas voluntarias contigo dentro de tu recept\xE1culo m\xE1gico; descansar dentro otorga los beneficios de un descanso corto completo en solo 10 minutos." },
      { level: 14, name: "Deseo Limitado", description: "Como acci\xF3n le pides un favor a tu genio patr\xF3n para duplicar el efecto de cualquier conjuro de nivel 6 o inferior de cualquier clase que tenga un tiempo de lanzamiento de 1 acci\xF3n (1 vez cada 1d4 descansos largos)." }
    ]
  },
  {
    id: "hoja_maldita",
    classId: "brujo",
    name: "El Filo Maldito (Hexblade)",
    description: "Pacto con armas conscientes forjadas en las sombras del P\xE1ramo Sombr\xEDo. Atacas con Carisma, maldices y comandas espectros.",
    features: [
      { level: 3, name: "Guerrero del Maleficio", description: "Ganas competencia con armaduras medias, escudos y armas marciales. Puedes usar tu modificador de Carisma para tiradas de ataque y da\xF1o con tus armas vinculadas." },
      { level: 3, name: "Maldici\xF3n del Filo", description: "Como acci\xF3n adicional maldices a un objetivo a 9 m durante 1 minuto: logras golpes cr\xEDticos con 19-20 en el d20, sumas tu BC al da\xF1o del arma y recuperas PG al abatir al objetivo." },
      { level: 6, name: "Espectro Maldito", description: "Cuando abates a un humanoide bajo tu maldici\xF3n, atrapas su alma alz\xE1ndola como un espectro leal que combate a tu lado hasta tu siguiente descanso largo." },
      { level: 10, name: "Armadura de Maleficio", description: "Cuando la criatura afectada por tu Maldici\xF3n del Filo te impacta con una tirada de ataque, tiras 1d6: con un resultado de 4 o m\xE1s, el ataque falla autom\xE1ticamente." },
      { level: 14, name: "Maestro del Maleficio", description: "Cuando la criatura bajo tu Maldici\xF3n del Filo muere, puedes transferir inmediatamente la maldici\xF3n a otra criatura visible a 9 metros sin gastar un nuevo uso de tu reserva." }
    ]
  }
];
const DND55_ALL_ORIGIN_FEATS = [
  { id: "alerta", name: "Alerta", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Sumas tu bonificador de competencia a la iniciativa. Adem\xE1s, tras tirar iniciativa al comenzar el combate, puedes intercambiar tu resultado de iniciativa con un aliado voluntario." },
  { id: "artesano", name: "Artesano", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Competencia en tres herramientas de artesano a tu elección. Obtienes un 20% de descuento al comprar equipo mundano no mágico y creas objetos en tiempo récord." },
  { id: "duro", name: "Duro", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Tus puntos de golpe m\xE1ximos aumentan en 2 por cada nivel de personaje que tengas actualmente y en todos los niveles futuros (+2 PG por nivel)." },
  { id: "iniciado_magia_clerigo", name: "Iniciado en Magia (Cl\xE9rigo)", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Aprendes 2 trucos y 1 conjuro de nivel 1 de la lista de cl\xE9rigo. Puedes lanzarlo gratis 1 vez por descanso largo y tambi\xE9n usando cualquiera de tus espacios de conjuro." },
  { id: "iniciado_magia_druida", name: "Iniciado en Magia (Druida)", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Aprendes 2 trucos y 1 conjuro de nivel 1 de la lista de druida. Puedes lanzarlo gratis 1 vez por descanso largo y tambi\xE9n usando cualquiera de tus espacios de conjuro." },
  { id: "iniciado_magia_mago", name: "Iniciado en Magia (Mago)", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Aprendes 2 trucos y 1 conjuro de nivel 1 de la lista de mago. Puedes lanzarlo gratis 1 vez por descanso largo y tambi\xE9n usando cualquiera de tus espacios de conjuro." },
  { id: "musico", name: "M\xFAsico", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Competencia en tres instrumentos musicales. Tras finalizar un descanso corto o largo, tocas para tus compa\xF1eros y otorgas Inspiraci\xF3n Heroica a un n\xFAmero de aliados igual a tu bonificador de competencia." },
  { id: "maton_taberna", name: "Mat\xF3n de Taberna", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Competencia con armas improvisadas, tu da\xF1o desarmado es 1d4 + FUE, puedes empujar al objetivo 1,5 metros una vez por turno al impactar y repites cualquier resultado de 1 en el da\xF1o de golpes desarmados." },
  { id: "atacante_salvaje", name: "Atacante Salvaje", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Una vez por turno al impactar con un arma, tiras los dados de da\xF1o del arma dos veces y te quedas con el resultado m\xE1s alto." },
  { id: "sanador", name: "Sanador", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Vuelves a tirar cualquier 1 en dados de curaci\xF3n. Como acci\xF3n, gastas un uso de botiqu\xEDn para sanar a una criatura 1d6 + 4 + su n\xFAmero de Dados de Golpe gastados." },
  { id: "habil", name: "Habilidoso", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Ganas competencia en tres habilidades o herramientas cualesquiera de tu elecci\xF3n." },
  { id: "afortunado", name: "Afortunado", category: "origin", featGroup: "origen", allowedAbilities: [], description: "Ganas puntos de suerte iguales a tu bonificador de competencia tras cada descanso largo para tener ventaja en pruebas de d20 o dar desventaja a atacantes contra ti." },
  { id: "chispa_fuego_hechizado", name: "Chispa de Fuego M\xE1gico (Spellfire Spark)", category: "origin", featGroup: "faerun_origen", allowedAbilities: [], description: "Portador innato de la Trama de Mystra en Faer\xFBn. Una vez por turno reduces en 1d4 el da\xF1o recibido por conjuros o efectos m\xE1gicos. Aprendes el truco Llama Sagrada y puedes lanzarlo como acci\xF3n adicional PB veces por descanso largo." }
];
const DND55_ALL_GENERAL_FEATS = [
  { id: "asi", name: "Mejora de Puntuaci\xF3n de Caracter\xEDstica", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "Aumenta una caracter\xEDstica en +2, o dos caracter\xEDsticas diferentes en +1 (m\xE1ximo 20)." },
  { id: "experto_habilidades", name: "Experto en Habilidades", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica a tu elecci\xF3n. Ganas competencia en una habilidad de tu elecci\xF3n y Pericia (duplica tu bonificador de competencia) en una habilidad en la que ya seas competente." },
  { id: "grappler", name: "Apresador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Ventaja en tiradas de ataque contra una criatura que estés agarrando. Moverte con una criatura agarrada no cuesta velocidad extra y puedes agarrar/derribar con golpe desarmado.", abilityBonus: { str: 1 } },
  { id: "charger", name: "Cargador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Al realizar la acci\xF3n de Correr ganas +3 metros a tu velocidad. Si te mueves 3 metros en l\xEDnea recta antes de atacar, tu ataque causa 1d8 extra o empuja 3 metros.", abilityBonus: { str: 1 } },
  { id: "athlete", name: "Atleta", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Levantarte del suelo cuesta solo 1,5 metros de movimiento, trepar no cuesta movimiento extra y saltar en longitud requiere solo 1,5 metros de carrerilla.", abilityBonus: { dex: 1 } },
  { id: "actor", name: "Actor", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["cha"], description: "+1 a Carisma. Ventaja en pruebas de Enga\xF1o e Interpretaci\xF3n al hacerte pasar por otra persona. Puedes imitar la voz de otra persona o los sonidos de criaturas.", abilityBonus: { cha: 1 } },
  { id: "observant", name: "Observador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis"], description: "+1 a Inteligencia o Sabidur\xEDa. Bonificador de +5 a tu Percepci\xF3n pasiva e Investigaci\xF3n pasiva. Puedes leer los labios de cualquier criatura que hable un idioma que comprendas.", abilityBonus: { wis: 1 } },
  { id: "mounted_combatant", name: "Combatiente Montado", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Ventaja en ataques cuerpo a cuerpo contra criaturas no montadas m\xE1s peque\xF1as que tu montura. Puedes redirigir ataques de tu montura hacia ti.", abilityBonus: { str: 1 } },
  { id: "poisoner", name: "Envenenador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["dex", "int"], description: "+1 a Inteligencia o Destreza. Tus daños por veneno ignoran resistencia al veneno. Puedes aplicar veneno a armas como acción adicional y fabricar dosis de veneno potente.", abilityBonus: { dex: 1 } },
  { id: "gwm", name: "Maestro en armas pesadas", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str"], description: "+1 a Fuerza. Al asestar un crítico o abatir un enemigo, realizas un ataque extra con arma pesada como acción adicional. Sumas tu BC al daño de armas pesadas.", abilityBonus: { str: 1 } },
  { id: "sharpshooter", name: "Tirador Certero", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["dex"], description: "+1 a Destreza. Tus disparos ignoran cobertura media y tres cuartos, disparar a 1,5 metros de un enemigo no tiene desventaja y disparar al alcance largo no tiene penalización.", abilityBonus: { dex: 1 } },
  { id: "sentinel", name: "Centinela", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Al impactar con un ataque de oportunidad la velocidad del objetivo pasa a ser 0. Puedes atacar como reacci\xF3n a enemigos que golpeen a un compa\xF1ero adyacente.", abilityBonus: { str: 1 } },
  { id: "war_caster", name: "Lanzador de Guerra", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Ventaja en salvaciones de Constituci\xF3n para mantener concentraci\xF3n, realizas componentes som\xE1ticos con escudo/armas y lanzas conjuros como ataques de oportunidad.", abilityBonus: { int: 1 } },
  { id: "crossbow_expert", name: "Experto en Ballestas", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["dex"], description: "+1 a Destreza. Ignoras la propiedad de recarga de ballestas, disparar a bocajarro no impone desventaja y puedes atacar con ballesta de mano como acci\xF3n adicional.", abilityBonus: { dex: 1 } },
  { id: "dual_wielder", name: "Combatiente con Dos Armas", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Puedes usar armas de una mano que no sean ligeras para combatir con dos armas y ganas +1 a la CA mientras empu\xF1es dos armas cuerpo a cuerpo.", abilityBonus: { dex: 1 } },
  { id: "polearm_master", name: "Maestro en Armas de Asta", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Ataque con el regat\xF3n del arma (1d4 + FUE) como acci\xF3n adicional. Adem\xE1s, los enemigos provocan ataques de oportunidad cuando entran en tu alcance.", abilityBonus: { str: 1 } },
  { id: "mage_slayer", name: "Asesino de Magos", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Tienes ventaja en salvaciones contra conjuros lanzados por enemigos a 1,5 metros de ti. Cuando impactas a una criatura concentrada tiene desventaja para mantener el conjuro.", abilityBonus: { str: 1 } },
  { id: "heavy_armor_master", name: "Maestro en Armaduras Pesadas", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "con"], description: "+1 a Fuerza o Constituci\xF3n. Mientras vistas armadura pesada, reduces el da\xF1o contundente, perforante y cortante de ataques en una cantidad igual a tu BC.", abilityBonus: { str: 1 } },
  { id: "shield_master", name: "Maestro en Escudos", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str"], description: "+1 a Fuerza. Puedes empujar o derribar con el escudo como parte de la acci\xF3n de Atacar, y sumas la CA del escudo a tus salvaciones de Destreza contra conjuros.", abilityBonus: { str: 1 } },
  { id: "defensive_duelist", name: "Duelista Defensivo", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["dex"], description: "+1 a Destreza. Como reacci\xF3n al ser impactado por un ataque cuerpo a cuerpo mientras empu\xF1es un arma sutil, sumas tu BC a tu CA para ese ataque.", abilityBonus: { dex: 1 } },
  { id: "resilient_con", name: "Resiliente (Constituci\xF3n)", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["con"], description: "+1 a Constituci\xF3n y ganas competencia en tiradas de salvaci\xF3n de Constituci\xF3n.", abilityBonus: { con: 1 } },
  { id: "resilient_wis", name: "Resiliente (Sabidur\xEDa)", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["wis"], description: "+1 a Sabidur\xEDa y ganas competencia en tiradas de salvaci\xF3n de Sabidur\xEDa.", abilityBonus: { wis: 1 } },
  { id: "resilient_dex", name: "Resiliente (Destreza)", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["dex"], description: "+1 a Destreza y ganas competencia en tiradas de salvaci\xF3n de Destreza.", abilityBonus: { dex: 1 } },
  { id: "resilient_str", name: "Resiliente (Fuerza)", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str"], description: "+1 a Fuerza y ganas competencia en tiradas de salvaci\xF3n de Fuerza.", abilityBonus: { str: 1 } },
  { id: "resilient_int", name: "Resiliente (Inteligencia)", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int"], description: "+1 a Inteligencia y ganas competencia en tiradas de salvaci\xF3n de Inteligencia.", abilityBonus: { int: 1 } },
  { id: "resilient_cha", name: "Resiliente (Carisma)", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["cha"], description: "+1 a Carisma y ganas competencia en tiradas de salvaci\xF3n de Carisma.", abilityBonus: { cha: 1 } },
  { id: "fey_touched", name: "Tocado por las Hadas", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Aprendes Paso Brumoso y un conjuro de nivel 1 de adivinaci\xF3n o encantamiento, lanzables gratis 1 vez al d\xEDa.", abilityBonus: { cha: 1 } },
  { id: "shadow_touched", name: "Tocado por las Sombras", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Aprendes Invisibilidad y un conjuro de nivel 1 de ilusi\xF3n o nigromancia, lanzables gratis 1 vez al d\xEDa.", abilityBonus: { int: 1 } },
  { id: "telekinetic", name: "Telequin\xE9tico", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Aprendes Mano de Mago invisible con alcance duplicado y puedes empujar o atraer criaturas 1,5 metros como acci\xF3n adicional.", abilityBonus: { int: 1 } },
  { id: "telepathic", name: "Telep\xE1tico", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Puedes comunicarte telep\xE1ticamente a 18 metros y lanzar Detectar Pensamientos sin gastar espacios de conjuro 1 vez al d\xEDa.", abilityBonus: { wis: 1 } },
  { id: "inspiring_leader", name: "L\xEDder Inspirador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["wis", "cha"], description: "+1 a Sabidur\xEDa o Carisma. Tras un descanso, pronuncias un discurso motivacional que otorga puntos de golpe temporales iguales a tu nivel + BC a hasta 6 aliados.", abilityBonus: { cha: 1 } },
  { id: "speedster", name: "Corredor Veloz", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["dex", "con"], description: "+1 a Destreza o Constituci\xF3n. Tu velocidad aumenta en 3 metros. Cuando realizas un ataque cuerpo a cuerpo contra una criatura, no provocas ataques de oportunidad de ella.", abilityBonus: { dex: 1 } },
  { id: "crusher", name: "Triturador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "con"], description: "+1 a Fuerza o Constituci\xF3n. Al infligir da\xF1o contundente puedes mover al objetivo 1,5 metros. En golpe cr\xEDtico, todas las tiradas de ataque contra ese objetivo tienen ventaja hasta tu siguiente turno.", abilityBonus: { str: 1 } },
  { id: "piercer", name: "Perforador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Puedes volver a tirar uno de los dados de da\xF1o perforante una vez por turno. En golpe cr\xEDtico con da\xF1o perforante a\xF1ades un dado extra.", abilityBonus: { dex: 1 } },
  { id: "slasher", name: "Cortador", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Al infligir da\xF1o cortante reduces la velocidad del enemigo en 3 metros. En golpe cr\xEDtico el objetivo tiene desventaja en todos sus ataques.", abilityBonus: { str: 1 } },
  { id: "elemental_adept", name: "Adepto Elemental", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Tus conjuros ignoran la resistencia al da\xF1o del elemento elegido (Fuego, Fr\xEDo, \xC1cido, Rayo o Trueno), y los 1s en da\xF1o cuentan como 2s.", abilityBonus: { int: 1 } },
  { id: "ritual_caster", name: "Lanzador de Rituales", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Obtienes un libro de rituales con dos conjuros rituales de nivel 1 de cualquier lista de clase y puedes transcribir nuevos rituales.", abilityBonus: { int: 1 } },
  { id: "chef", name: "Chef de Campa\xF1a", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["con", "wis"], description: "+1 a Constituci\xF3n o Sabidur\xEDa. Cocinas manjares especiales durante descansos cortos que restauran 1d8 PG extras, y preparas golosinas que otorgan PG temporales.", abilityBonus: { con: 1 } },
  // --- DOTES GENERALES DE REINOS OLVIDADOS: HÉROES Y AVENTURAS EN FAERÛN (NIVEL 4+) ---
  { id: "tacticas_zhentarim", name: "T\xE1cticas Zhentarim (Zhentarim Tactics)", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["dex", "cha"], description: "+1 a Destreza o Carisma. Represalia: Si una criatura a 1,5 metros de ti te impacta con un ataque cuerpo a cuerpo, puedes realizar inmediatamente un ataque de oportunidad contra ella como reacci\xF3n. Adem\xE1s, tras cada descanso largo puedes cambiar tu Pericia a cualquier habilidad en la que seas competente.", abilityBonus: { dex: 1 } },
  { id: "pillo_feerico_moonshae", name: "Pillo F\xE9erico de las Moonshae (Fairy Trickster)", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["dex", "cha"], description: "+1 a Destreza o Carisma. Al realizar la acci\xF3n de Destrabarse ignoras el terreno dif\xEDcil durante el resto del turno. Tras impactar a una criatura con un ataque, debe superar una salvaci\xF3n de Sabidur\xEDa o sufrir desventaja en todas sus tiradas de salvaci\xF3n hasta el final de tu siguiente turno.", abilityBonus: { cha: 1 } },
  { id: "adepto_fuego_hechizado", name: "Adepto del Fuego M\xE1gico (Spellfire Adept)", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["con", "int", "cha"], description: "+1 a Constituci\xF3n, Inteligencia o Carisma. Tus ataques y conjuros que causen da\xF1o por fuego o radiante ignoran la resistencia a dichos da\xF1os. Como reacci\xF3n al recibir da\xF1o m\xE1gico, puedes absorber la mitad de ese da\xF1o y sumarlo como da\xF1o radiante adicional a tu siguiente impacto.", abilityBonus: { con: 1 } },
  { id: "lanzador_frio_artico", name: "Lanzador del Fr\xEDo \xC1rtico (Cold Caster)", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Cuando infliges da\xF1o por fr\xEDo con un conjuro a una criatura, su velocidad se reduce en 3 metros adicionales y tiene desventaja en su siguiente tirada de salvaci\xF3n de Destreza.", abilityBonus: { int: 1 } },
  { id: "tocado_por_mithral", name: "Tocado por el Mithral (Mythral Touched)", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Canalizas las corrientes de la Trama pura de Mystra: una vez por descanso corto, cuando lanzas un conjuro o usas una habilidad m\xE1gica, puedes maximizar uno de los dados de da\xF1o/curaci\xF3n o infligir 2d6 de da\xF1o de fuerza adicional.", abilityBonus: { int: 1 } },
  { id: "adepto_metamagico", name: "Adepto Metam\xE1gico", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma. Aprendes dos opciones de Metamagia de la clase hechicero y obtienes 2 Puntos de Hechicer\xEDa que se recargan tras descanso largo.", abilityBonus: { cha: 1 } },
  { id: "adepto_marcial", name: "Adepto Marcial", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Aprendes dos maniobras de la subclase Maestro de Batalla y obtienes un dado de superioridad d8 que se recarga con descanso corto o largo.", abilityBonus: { str: 1 } },
  { id: "spell_sniper", name: "Lanzador preciso", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabiduría o Carisma. Tus ataques con conjuros ignoran cobertura media y tres cuartos, duplicas el alcance de los conjuros con tirada de ataque y no tienes desventaja al lanzar conjuros a 1,5 metros de un enemigo.", abilityBonus: { int: 1 } },
  { id: "estilo_defensa", legacyId: "defensa", name: "Estilo de Batalla: Defensa", aliases: ["Defensa"], category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024 / SRD). Mientras lleves puesta una armadura Ligera, Media o Pesada, obtienes un bonificador de +1 a tu Clase de Armadura (CA)." },
  { id: "estilo_duelista", legacyId: "duelista", name: "Estilo de Batalla: Duelo", aliases: ["Duelista", "Duelo"], category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024 / SRD). Cuando empuñas un arma cuerpo a cuerpo en una sola mano y ninguna otra arma, obtienes un bonificador de +2 a las tiradas de daño con esa arma." },
  { id: "estilo_arqueria", legacyId: "arqueria", name: "Estilo de Batalla: Tiro con Arco", aliases: ["Tiro con arco", "Arquería", "Tiro con Arco"], category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024 / SRD). Obtienes un bonificador de +2 a todas las tiradas de ataque que realices con armas a distancia." },
  { id: "estilo_dos_armas", legacyId: "dos_armas", name: "Estilo de Batalla: Combate con Dos Armas", aliases: ["Combate con dos armas", "Combate con Dos Armas"], category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024 / SRD). Cuando realizas un ataque adicional como resultado de utilizar un arma que tenga la propiedad Ligera, puedes añadir tu modificador de característica al daño de ese ataque si aún no lo estás sumando." },
  { id: "estilo_armas_grandes", legacyId: "armas_grandes", name: "Estilo de Batalla: Combate con Armas a Dos Manos", aliases: ["Combate con armas a dos manos", "Combate con Armas Grandes", "Armas Grandes"], category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024 / SRD). Cuando tiras el daño de un ataque con un arma cuerpo a cuerpo que empuñes con las dos manos (propiedad A dos manos o Versátil), cualquier resultado de 1 o 2 en un dado de daño se trata automáticamente como un 3." },
  { id: "estilo_proteccion", legacyId: "proteccion", name: "Estilo de Batalla: Protección", aliases: ["Protección"], category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024 / SRD). Cuando una criatura que puedas ver ataca a un objetivo que no seas tú a 1,5 metros de ti mientras empuñas un escudo, puedes usar tu reacción para interponer tu escudo e imponer desventaja en todas las tiradas de ataque contra ese objetivo hasta el inicio de tu siguiente turno." },
  { id: "estilo_intercepcion", legacyId: "intercepcion", name: "Estilo de Batalla: Intercepción", category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024). Cuando una criatura que puedas ver impacta a un objetivo a 1,5 metros de ti con un ataque, puedes usar tu reacción (empuñando escudo o arma) para reducir el daño que sufre el objetivo en 1d10 + tu Bonificador de Competencia." },
  { id: "blind_fighting", legacyId: "lucha_ciegas", name: "Estilo de Batalla: Combate a Ciegas", category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024). Obtienes visión ciega permanente en un radio de 3 metros (10 pies), lo que te permite percibir a criaturas invisibles y luchar en oscuridad total o niebla sin penalización." },
  { id: "estilo_armas_arrojadizas", legacyId: "armas_arrojadizas", name: "Estilo de Batalla: Combate con Armas Arrojadizas", category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024). Cuando impactas con una tirada de ataque a distancia usando un arma que tenga la propiedad Arrojadiza, obtienes un bonificador de +2 a la tirada de daño." },
  { id: "estilo_desarmado", legacyId: "combate_desarmado", name: "Estilo de Batalla: Combate Desarmado", category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla (PHB 2024). Tus golpes desarmados infligen daño contundente igual a 1d6 + tu modificador de Fuerza (o 1d8 + Fuerza si no estás empuñando ningún arma ni un escudo). Al inicio de cada uno de tus turnos, puedes infligir 1d4 de daño contundente a una criatura que tengas agarrada." },
  { id: "estilo_tecnica_superior", legacyId: "tecnica_superior", name: "Estilo de Batalla: Técnica Superior (Maniobras)", category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla. Aprendes una maniobra a tu elección de la subclase Maestro de Batalla y obtienes 1 dado de superioridad (d6) que se recupera tras un descanso corto o largo." },
  { id: "estilo_guerrero_bendito", legacyId: "guerrero_bendito", name: "Estilo de Batalla: Guerrero Bendito (Paladín)", category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla. Aprendes dos trucos (nivel 0) a tu elección de la lista de conjuros de Clérigo. Cuentan como conjuros de paladín para ti y utilizas Carisma como característica de lanzamiento." },
  { id: "estilo_guerrero_druidico", legacyId: "guerrero_druidico", name: "Estilo de Batalla: Guerrero Druídico (Explorador)", category: "general", featGroup: "estilo_combate", prerequisiteLevel: 1, allowedAbilities: [], description: "Dote de Estilo de Batalla. Aprendes dos trucos (nivel 0) a tu elección de la lista de conjuros de Druida. Cuentan como conjuros de explorador para ti y utilizas Sabiduría como característica de lanzamiento." },
  { id: "medium_armor_master", name: "Maestro en Armaduras Medias", category: "general", featGroup: "general", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Mientras vistas armadura media, tu bonificador m\xE1ximo de Destreza aplicable a la CA aumenta de +2 a +3, y no sufres desventaja en pruebas de Sigilo por llevarla puesta.", abilityBonus: { dex: 1 } },
  { id: "mente_inquebrantable", name: "Mente Inquebrantable de Faer\xFBn", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["int", "wis"], description: "+1 a Inteligencia o Sabidur\xEDa. Tienes ventaja en todas las tiradas de salvaci\xF3n para evitar o finalizar las condiciones de Hechizado, Asustado o Aturdido.", abilityBonus: { wis: 1 } },
  { id: "cazador_dragones_faerun", name: "Cazador de Dragones de Faer\xFBn", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza. Obtienes ventaja en salvaciones contra el aliento de dragones y sumas +1d6 de da\xF1o a todos tus ataques contra criaturas de tipo Drag\xF3n.", abilityBonus: { str: 1 } },
  { id: "tempestad_de_talos", name: "Heraldo de la Tormenta de Talos", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["str", "wis"], description: "+1 a Fuerza o Sabidur\xEDa. Cuando infliges da\xF1o por rayo o trueno, puedes empujar al objetivo hasta 3 metros. Una vez por descanso corto infliges 2d8 de trueno en represalia como reacci\xF3n.", abilityBonus: { str: 1 } },
  { id: "gracia_de_sune", name: "Gracia Resplandeciente de Sune", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["cha"], description: "+1 a Carisma. Irradias una belleza m\xEDstica divina que otorga ventaja en la primera tirada de Persuasi\xF3n o Interpretaci\xF3n hacia cualquier criatura humanoide.", abilityBonus: { cha: 1 } },
  { id: "vigilante_de_helm", name: "Vigilante Eterno de Helm", category: "general", featGroup: "faerun", prerequisiteLevel: 4, allowedAbilities: ["wis"], description: "+1 a Sabidur\xEDa. Nunca puedes ser sorprendido mientras est\xE9s consciente y sumas tu bonificador de competencia a la tirada de iniciativa.", abilityBonus: { wis: 1 } },
  // --- DOTES ÉPICAS DE FAERÛN Y SUPLEMENTOS D&D 5.5 (EPIC BOONS - NIVEL 19+) ---
  { id: "dote_epica_sed_sangre_bhaal", name: "Dote \xC9pica: Don de la Sed de Sangre de Bhaal (Boon of Bloodshed)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica (m\xE1x 30). Tras abatir a una criatura o asestar un golpe cr\xEDtico, puedes usar tu reacci\xF3n para realizar inmediatamente un ataque con arma adicional o moverte hasta tu velocidad completa sin provocar ataques de oportunidad." },
  { id: "dote_epica_salud_chauntea", name: "Dote \xC9pica: Don de la Salud Abundante de Chauntea (Boon of Bountiful Health)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["con", "wis"], description: "+1 a Constituci\xF3n o Sabidur\xEDa (m\xE1x 30). Tus Puntos de Golpe m\xE1ximos aumentan en 50. Al inicio de cada uno de tus turnos, si tienes menos de la mitad de tus PG m\xE1ximos y no est\xE1s a 0 PG, recuperas 10 Puntos de Golpe autom\xE1ticamente." },
  { id: "dote_epica_comunicacion_oghma", name: "Dote \xC9pica: Don de la Comunicaci\xF3n Omnisciente de Oghma (Boon of Communication)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["int", "cha"], description: "+1 a Inteligencia o Carisma (m\xE1x 30). Puedes comunicarte telep\xE1ticamente a cualquier distancia con cualquier criatura conocida en el mismo plano y comprendes, lees y hablas todos los idiomas existentes." },
  { id: "dote_epica_resistencia_ilmater", name: "Dote \xC9pica: Don de la Resistencia Desesperada de Ilm\xE1ter (Boon of Desperate Resilience)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["con", "wis"], description: "+1 a Constituci\xF3n o Sabidur\xEDa (m\xE1x 30). Cuando caes a 0 puntos de golpe, no caes inconsciente de inmediato; puedes seguir actuando con normalidad hasta el final de tu siguiente turno antes de comenzar a realizar salvaciones contra la muerte." },
  { id: "dote_epica_resplandor_sune", name: "Dote \xC9pica: Don del Resplandor Exquisito de Sune (Boon of Exquisite Radiance)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["cha"], description: "+1 a Carisma (m\xE1x 30). Irradias un aura celestial de 6 metros: los enemigos que comiencen su turno en el aura sufren 3d10 de da\xF1o radiante y quedan Cegados si fallan una salvaci\xF3n de Constituci\xF3n." },
  { id: "dote_epica_formas_silvanus", name: "Dote \xC9pica: Don de las Formas Fluidas de Silvanus (Boon of Fluid Forms)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["dex", "wis"], description: "+1 a Destreza o Sabidur\xEDa (m\xE1x 30). Puedes cambiar tu forma corporal, tama\xF1o o aspecto a voluntad como acci\xF3n adicional y puedes pasar por cualquier abertura de al menos 2,5 cm de ancho sin esfuerzo." },
  { id: "dote_epica_favor_tymora", name: "Dote \xC9pica: Don del Favor de Tymora (Boon of Fortune's Favour)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica (m\xE1x 30). Obtienes 3 puntos de fortuna divina por descanso largo. Cuando t\xFA o un aliado hag\xE1is una tirada de d20, puedes gastar 1 punto para convertir autom\xE1ticamente el resultado en un 20 natural." },
  { id: "dote_epica_veneno_talona", name: "Dote \xC9pica: Don de la Maestr\xEDa del Veneno de Talona (Boon of Poison Mastery)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["dex", "con"], description: "+1 a Destreza o Constituci\xF3n (m\xE1x 30). Tu da\xF1o por veneno trata las inmunidades al veneno como meras resistencias, y la condici\xF3n de Envenenado que infliges no puede ser curada mediante conjuros de nivel 6 o menor." },
  { id: "dote_epica_terror_bane", name: "Dote \xC9pica: Don del Terror de Bane (Boon of Terror)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "cha"], description: "+1 a Fuerza o Carisma (m\xE1x 30). Cualquier criatura Asustada por ti queda adem\xE1s con la condici\xF3n de Paralizada por el pavor y sufre 4d6 de da\xF1o ps\xEDquico al inicio de cada uno de sus turnos." },
  { id: "dote_epica_sol_lathander", name: "Dote \xC9pica: Don del Sol Brillante de Lathander (Boon of the Bright Sun)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["wis", "cha"], description: "+1 a Sabidur\xEDa o Carisma (m\xE1x 30). Puedes emitir luz solar brillante en un radio de 18 metros a voluntad; las criaturas no-muertas e infernales dentro del radio tienen desventaja en todas sus tiradas y sufren 4d8 de da\xF1o radiante al inicio de su turno." },
  { id: "dote_epica_tormenta_talos", name: "Dote \xC9pica: Don de la Tormenta Furiosa de Talos (Boon of the Furious Storm)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "con"], description: "+1 a Fuerza o Constituci\xF3n (m\xE1x 30). Ganas velocidad de vuelo de 18 metros, inmunidad absoluta al da\xF1o por rel\xE1mpago y trueno, y tus ataques con arma desatan una onda s\xF3nica que inflige 3d8 de da\xF1o de trueno en un radio de 3 metros." },
  { id: "dote_epica_bebedor_almas_myrkul", name: "Dote \xC9pica: Don del Bebedor de Almas de Myrkul (Boon of the Soul Drinker)", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica (m\xE1x 30). Cuando reduces a una criatura a 0 puntos de golpe, devoras su fuerza vital: obtienes puntos de golpe temporales iguales al doble de su VD o nivel y tienes ventaja en todas tus tiradas durante el siguiente minuto." },
  { id: "dote_epica_recuperacion", name: "Dote \xC9pica: Don de la Recuperaci\xF3n", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica (m\xE1x 30). Cuando caes a 0 puntos de golpe y no mueres en el acto, puedes usar tu reacci\xF3n para recuperar la mitad de tus Puntos de Golpe m\xE1ximos (1 vez por descanso largo)." },
  { id: "dote_epica_viaje_dimensional", name: "Dote \xC9pica: Don del Viaje Dimensional", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica (m\xE1x 30). Inmediatamente despu\xE9s de realizar la acci\xF3n de Atacar o de Lanzar un Conjuro, te teletransportas m\xE1gicamente hasta 9 metros a un espacio libre que puedas ver." },
  { id: "dote_epica_resistencia_magica", name: "Dote \xC9pica: Don de la Resistencia M\xE1gica", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica (m\xE1x 30). Tienes ventaja en todas las tiradas de salvaci\xF3n contra conjuros y otros efectos m\xE1gicos. Si superas una salvaci\xF3n contra un conjuro que inflige la mitad de da\xF1o, no sufres da\xF1o alguno." },
  { id: "dote_epica_fortaleza_infinita", name: "Dote \xC9pica: Don de la Fortaleza Indomable", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["con"], description: "+1 a Constituci\xF3n (m\xE1x 30). Tus Puntos de Golpe m\xE1ximos aumentan permanentemente en 40. Adem\xE1s, cada vez que recuperes PG por cualquier medio, sumas tu modificador de Constituci\xF3n a la curaci\xF3n recibida." },
  { id: "dote_epica_sino_infalible", name: "Dote \xC9pica: Don del Destino Ineludible", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex", "con", "int", "wis", "cha"], description: "+1 a una caracter\xEDstica (m\xE1x 30). Cuando t\xFA o una criatura que puedas ver a 18 metros haga una tirada de d20, puedes usar tu reacci\xF3n para sumar o restar 2d4 al resultado (usos = bonificador de competencia por descanso corto)." },
  { id: "dote_epica_alta_magia", name: "Dote \xC9pica: Don de la Alta Magia de Faer\xFBn", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["int", "wis", "cha"], description: "+1 a Inteligencia, Sabidur\xEDa o Carisma (m\xE1x 30). Obtienes un espacio de conjuro adicional de nivel 9." },
  { id: "dote_epica_punteria_infalible", name: "Dote \xC9pica: Don de la Punter\xEDa Infalible", category: "general", featGroup: "epica", prerequisiteLevel: 19, allowedAbilities: ["str", "dex"], description: "+1 a Fuerza o Destreza (m\xE1x 30). Si fallas una tirada de ataque en tu turno, puedes convertir ese fallo en un impacto autom\xE1tico (1 vez por turno)." }
];
const DND55_CANONICAL_SPELLS = [
  // ==========================================
  // TRUCOS (CANTRIPS - Nivel 0)
  // ==========================================
  {
    id: "descarga_fuego",
    name: "Descarga de Fuego",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["mago", "hechicero"],
    description: "Lanzas una mota de fuego a una criatura u objeto. Ataque a distancia con conjuro: inflige 1d10 de da\xF1o por fuego (2d10 a nivel 5, 3d10 a nivel 11, 4d10 a nivel 17). Prende objetos inflamables que no se lleven puestos."
  },
  {
    id: "rayo_escarcha",
    name: "Rayo de Escarcha",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["mago", "hechicero"],
    description: "Un rayo blancoazulado g\xE9lido. Ataque a distancia con conjuro que causa 1d8 de da\xF1o por fr\xEDo (2d8 a nivel 5, 3d8 a nivel 11, 4d8 a nivel 17) y reduce la velocidad del objetivo en 3 metros hasta el final de su siguiente turno."
  },
  {
    id: "llama_sagrada",
    name: "Llama Sagrada",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["clerigo"],
    description: "Un resplandor celestial desciende sobre una criatura que veas. Salvaci\xF3n de Destreza: si falla sufre 1d8 de da\xF1o radiante (2d8 a nivel 5, 3d8 a nivel 11, 4d8 a nivel 17). El objetivo no obtiene beneficio de coberturas."
  },
  {
    id: "estallido_sobrenatural",
    name: "Descarga Sobrenatural",
    aliases: ["Estallido Sobrenatural", "Eldritch Blast"],
    level: 0,
    school: "Evocación",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["brujo"],
    description: "Un haz de energ\xEDa crepitante. Ataque a distancia que causa 1d10 de da\xF1o de fuerza. Evoluciona con tu nivel: 2 rayos a nivel 5, 3 rayos a nivel 11 y 4 rayos a nivel 17 (pudiendo apuntar al mismo objetivo o a varios)."
  },
  {
    id: "guia",
    name: "Gu\xEDa",
    level: 0,
    school: "Adivinaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo", "druida"],
    description: "Tocas a una criatura voluntaria. Una vez antes de que termine el conjuro, el objetivo puede sumar un dado de 1d4 a una prueba de caracter\xEDstica de su elecci\xF3n."
  },
  {
    id: "mano_mago",
    name: "Mano de Mago",
    level: 0,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S",
    duration: "1 minuto",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Aparece una mano espectral flotante. Puedes moverla hasta 9 metros y manipular objetos, abrir puertas o cerraduras no bloqueadas, guardar o sacar cosas de un contenedor."
  },
  {
    id: "ilusion_menor",
    name: "Ilusi\xF3n Menor",
    level: 0,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "S, M",
    duration: "1 minuto",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Creas un sonido o la imagen de un objeto (no mayor a un cubo de 1,5 metros). Las criaturas pueden investigar con prueba de Inteligencia CD de conjuro para ver a trav\xE9s de ella."
  },
  {
    id: "luz",
    name: "Luz",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, M",
    duration: "1 hora",
    classes: ["bardo", "clerigo", "hechicero", "mago"],
    description: "Tocas un objeto e irradias luz brillante en un radio de 6 metros y luz tenue en 6 metros adicionales. Puedes elegir el color de la luz a voluntad."
  },
  {
    id: "burla_cruel",
    name: "Burla Dañina",
    aliases: ["Burla Cruel", "Vicious Mockery"],
    level: 0,
    school: "Encantamiento",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V",
    duration: "Instantáneo",
    classes: ["bardo"],
    description: "Desatas una cadena de insultos imbuidos de magia. Salvación de Sabiduría: si falla, recibe 1d4 de daño psíquico (escala a 2d4, 3d4, 4d4) y tiene desventaja en el siguiente ataque que realice."
  },
  {
    id: "shillelagh",
    name: "Shillelagh",
    aliases: ["Garrote Mágico", "Garrote magico"],
    level: 0,
    school: "Transmutación",
    castingTime: "1 acción adicional",
    range: "Toque",
    components: "V, S, M",
    duration: "1 minuto",
    classes: ["druida"],
    description: "El bastón o garrote que empuñas se imbuye de magia natural. Puedes usar tu modificador de Sabiduría en lugar de Fuerza para el ataque y el daño, y su dado se convierte en 1d8 (1d10 a nivel 5, 1d12 a nivel 11, 2d6 a nivel 17)."
  },
  {
    id: "toque_helado",
    name: "Toque Helado",
    level: 0,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "1 asalto",
    classes: ["hechicero", "mago", "brujo"],
    description: "Canalizas el fr\xEDo de ultratumba. Ataque con conjuro: causa 1d10 de da\xF1o necr\xF3tico (escala a 2d10, 3d10, 4d10) y el objetivo no puede recuperar puntos de golpe hasta el inicio de tu pr\xF3ximo turno."
  },
  {
    id: "impacto_certero",
    name: "Impacto Certero",
    level: 0,
    school: "Adivinaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Alcance del arma",
    components: "S, M (un arma)",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Realizas un ataque con arma utilizando tu caracter\xEDstica m\xE1gica para la tirada de ataque y de da\xF1o, infligiendo da\xF1o radiante. A nivel 5 inflige +1d6 radiante (+2d6 a nivel 11, +3d6 a nivel 17)."
  },
  {
    id: "prestidigitacion",
    name: "Prestidigitaci\xF3n",
    level: 0,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "3 metros",
    components: "V, S",
    duration: "Hasta 1 hora",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Efectos m\xE1gicos menores: crear chispas, limpiar o ensuciar un objeto, calentar o enfriar comida, encender o apagar velas, o crear un s\xEDmbolo sensorial ef\xEDmero."
  },
  {
    id: "agarre_electrizante",
    name: "Agarre Electrizante",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Un rel\xE1mpago brota de tu mano. Ataque de conjuro cuerpo a cuerpo (con ventaja si el blanco lleva armadura met\xE1lica): inflige 1d8 de da\xF1o por rel\xE1mpago (2d8 a nivel 5, 3d8 a nivel 11, 4d8 a nivel 17) y el objetivo no puede realizar reacciones hasta su siguiente turno."
  },
  {
    id: "mensaje",
    name: "Mensaje",
    level: 0,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S, M",
    duration: "1 asalto",
    classes: ["bardo", "druida", "hechicero", "mago", "brujo"],
    description: "Susurras un mensaje hacia una criatura dentro del alcance que solo ella puede escuchar, y puede responderte con un susurro en su mente que solo t\xFA oyes."
  },
  {
    id: "reparar",
    name: "Reparar",
    level: 0,
    school: "Transmutaci\xF3n",
    castingTime: "1 minuto",
    range: "Toque",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "druida", "hechicero", "mago"],
    description: "Repara una sola rotura o desgarro en un objeto que toques, como un eslab\xF3n de cadena roto, dos mitades de una llave rota o una capa rasgada."
  },
  {
    id: "druidismo",
    name: "Saber Druídico",
    aliases: ["Druidismo", "Druidcraft"],
    level: 0,
    school: "Transmutación",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["druida"],
    description: "Canalizas los esp\xEDritus de la naturaleza para predecir el clima las pr\xF3ximas 24 horas, hacer florecer una planta al instante, encender una fogata o emitir sonidos de animales tenues."
  },
  {
    id: "taumaturgia",
    name: "Taumaturgia",
    level: 0,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V",
    duration: "Hasta 1 minuto",
    classes: ["clerigo"],
    description: "Manifestaci\xF3n de poder divino menor: amplifica tu voz 3 veces, hace temblar el suelo, parpadear las llamas, abrir o cerrar puertas de golpe o cambiar el color de tus ojos."
  },
  {
    id: "luces_danzantes",
    name: "Luces Danzantes",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago"],
    description: "Creas hasta cuatro luces tenues que flotan en el aire y que puedes mover hasta 18 metros como acci\xF3n adicional."
  },
  {
    id: "salpicadura_acida",
    name: "Salpicadura \xC1cida",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (esfera de 1,5 m)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Lanzas una burbuja de \xE1cido a una esfera de 1,5 m. Las criaturas en el \xE1rea deben superar una salvaci\xF3n de Destreza o sufrir 1d6 de da\xF1o por \xE1cido (2d6 a nivel 5, 3d6 a nivel 11, 4d6 a nivel 17)."
  },
  {
    id: "espita_mental",
    name: "Fragmento mental",
    aliases: ["Clavo mental", "Espita mental", "Mind Sliver"],
    level: 0,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V",
    duration: "1 asalto",
    classes: ["hechicero", "mago", "brujo"],
    description: "Clavas una p\xFAa ps\xEDquica en la mente del objetivo. Salvaci\xF3n de Inteligencia: si falla, sufre 1d6 de da\xF1o ps\xEDquico (escala a 2d6, 3d6, 4d6) y resta 1d4 a su siguiente tirada de salvaci\xF3n."
  },
  {
    id: "resistencia",
    name: "Resistencia",
    level: 0,
    school: "Abjuraci\xF3n",
    castingTime: "1 reacci\xF3n",
    range: "Toque",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["clerigo", "druida"],
    description: "Como reacci\xF3n cuando una criatura voluntaria a tu alcance sufre da\xF1o, le otorgas 1d4 de reducci\xF3n de da\xF1o contra ese ataque o efecto."
  },
  {
    id: "latigo_espinas",
    name: "L\xE1tigo de Espinas",
    level: 0,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["druida"],
    description: "Creas un l\xE1tigo de zarzas que golpea a un enemigo. Ataque de conjuro cuerpo a cuerpo: inflige 1d6 de da\xF1o perforante (escala a 2d6, 3d6, 4d6) y arrastra al objetivo hasta 3 metros hacia ti si es de tama\xF1o Grande o menor."
  },
  {
    id: "guardia_cuchillas",
    name: "Protección contra Filos",
    aliases: ["Guardia contra Cuchillas", "Guardia de Cuchillas", "Blade Ward"],
    level: 0,
    school: "Abjuración",
    castingTime: "1 acci\xF3n adicional",
    range: "Personal",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Una barrera defensiva te envuelve. Los atacantes restan 1d4 a todas las tiradas de ataque cuerpo a cuerpo dirigidas contra ti durante la duraci\xF3n."
  },
  {
    id: "hoja_del_trueno",
    name: "Hoja del Trueno",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (alcance de 1,5 m)",
    components: "S, M (un arma que valga al menos 1 sp)",
    duration: "1 asalto",
    classes: ["hechicero", "brujo", "mago"],
    description: "Blandes tu arma imbuida de energ\xEDa atronadora y realizas un ataque cuerpo a cuerpo. Si impacta, el objetivo sufre el da\xF1o normal del arma y queda envuelto en energ\xEDa s\xF3nica; si se mueve voluntariamente 1,5 m o m\xE1s antes de tu siguiente turno, sufre 1d8 de da\xF1o por trueno (el ataque y el movimiento aumentan en +1d8 a niveles 5, 11 y 17)."
  },
  {
    id: "hoja_llama_verde",
    name: "Hoja de la Llama Verde",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (alcance de 1,5 m)",
    components: "S, M (un arma que valga al menos 1 sp)",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "brujo", "mago"],
    description: "Blandes un arma envuelta en llamas esmeralda y atacas a una criatura. Si impactas, una llamarada salta a un segundo objetivo visible a 1,5 m infligi\xE9ndole da\xF1o de fuego igual a tu modificador de caracter\xEDstica m\xE1gica (a nivel 5+ ambos objetivos sufren da\xF1o por fuego adicional)."
  },
  {
    id: "frio_polar",
    name: "Fr\xEDo Polar",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["druida", "hechicero", "brujo", "mago"],
    description: "Cubres a una criatura de escarcha y fr\xEDo entumecedor. Debe superar una salvaci\xF3n de Constituci\xF3n o sufrir 1d6 de da\xF1o por fr\xEDo (2d6 a nivel 5, 3d6 a nivel 11, 4d6 a nivel 17) y tener desventaja en su siguiente tirada de ataque con arma antes del final de su siguiente turno."
  },
  {
    id: "estallido_de_espadas",
    name: "Estallido de Espadas",
    level: 0,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 1,5 m)",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "brujo", "mago"],
    description: "Creas un c\xEDrculo instant\xE1neo de hojas espectrales que giran a tu alrededor. Cada criatura a 1,5 metros de ti debe superar una tirada de salvaci\xF3n de Destreza o sufrir 1d6 de da\xF1o de fuerza (2d6 a nivel 5, 3d6 a nivel 11, 4d6 a nivel 17)."
  },
  {
    id: "latigo_de_rayos",
    name: "L\xE1tigo de Rayos",
    level: 0,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "4,5 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "brujo", "mago"],
    description: "Creas un l\xE1tigo de energ\xEDa el\xE9ctrica crepitante que azota a una criatura. El objetivo debe superar una tirada de salvaci\xF3n de Fuerza o ser arrastrado hasta 3 metros hacia ti en l\xEDnea recta y sufrir 1d8 de da\xF1o por rel\xE1mpago si termina a 1,5 metros de ti (escala a 2d8, 3d8, 4d8)."
  },
  {
    id: "infestacion",
    name: "Infestaci\xF3n",
    level: 0,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["druida", "hechicero", "brujo", "mago"],
    description: "Haces que una nube de \xE1caros, pulgas y par\xE1sitos m\xE1gicos pulule sobre una criatura. Debe superar una tirada de salvaci\xF3n de Constituci\xF3n o sufrir 1d6 de da\xF1o por veneno (escala a 2d6, 3d6, 4d6) y moverse 1,5 metros en una direcci\xF3n aleatoria."
  },
  {
    id: "estallido_hechicero",
    name: "Estallido Mágico",
    aliases: ["Estallido Hechicero", "Sorcerous Burst"],
    level: 0,
    school: "Evocación",
    castingTime: "1 acción",
    range: "36 metros",
    components: "V, S",
    duration: "Instantáneo",
    classes: ["hechicero"],
    description: "Lanzas una descarga de energía mágica fluctuante (D&D 5.5). Realiza un ataque de conjuro a distancia contra un objetivo. Al impactar, infliges 1d6 de daño del tipo que elijas: Ácido, Frío, Fuego, Fuerza, Relámpago, Veneno, Psíquico o Trueno. Si obtienes un 6 en cualquier dado de daño de este conjuro, puedes tirar un d6 adicional del mismo tipo. El daño aumenta en 1d6 a nivel 5 (2d6), nivel 11 (3d6) y nivel 17 (4d6)."
  },
  {
    id: "elementalismo",
    name: "Elementalismo",
    level: 0,
    school: "Transmutación",
    castingTime: "1 acción",
    range: "9 metros",
    components: "V, S",
    duration: "Instantáneo",
    classes: ["druida", "hechicero", "mago"],
    description: "Ejerces control primordial sobre los elementos para realizar efectos menores (D&D 5.5): esculpir tierra, crear una corriente de aire de 1,5 m, avivar o extinguir una pequeña llama, encender o apagar velas, o generar niebla, lluvia ligera o agua limpia."
  },
  {
    id: "fulgor_estelar",
    name: "Voluta Estelar",
    aliases: ["Fulgor Estelar", "Starry Wisp"],
    level: 0,
    school: "Evocación",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V, S",
    duration: "Instantáneo",
    classes: ["bardo", "druida"],
    description: "Lanzas una chispa de luz astral hacia una criatura visible (D&D 5.5). Realiza un ataque de conjuro a distancia. Si impactas, el objetivo sufre 1d8 de daño radiante y emite luz tenue en un radio de 3 metros hasta el final de tu siguiente turno, impidiendo que sea invisible. El daño aumenta en 1d8 a nivel 5 (2d8), nivel 11 (3d8) y nivel 17 (4d8)."
  },
  {
    id: "piedad_moribundos",
    name: "Piedad con los Moribundos",
    aliases: ["Piedad con los moribundos", "Estabilizar", "Spare the Dying"],
    level: 0,
    school: "Nigromancia",
    castingTime: "1 acción",
    range: "Toque",
    components: "V, S",
    duration: "Instantáneo",
    classes: ["clerigo"],
    description: "Tocas a una criatura viviente a tu alcance que tenga 0 puntos de golpe. La criatura se vuelve estable de inmediato, deteniendo sus tiradas de salvación contra la muerte."
  },
  {
    id: "rociada_venenosa",
    name: "Rociada Venenosa",
    aliases: ["Rociada venenosa", "Poison Spray"],
    level: 0,
    school: "Nigromancia",
    castingTime: "1 acción",
    range: "9 metros",
    components: "V, S",
    duration: "Instantáneo",
    classes: ["druida", "hechicero", "brujo", "mago"],
    isAttackSpell: true,
    attackType: "save",
    saveAbility: "con",
    damageFormula: "1d12",
    damageType: "veneno",
    description: "Proyectas una nube de gas tóxico hacia una criatura a tu alcance. El objetivo debe superar una salvación de Constitución o sufrir 1d12 puntos de daño por veneno (2d12 a nivel 5, 3d12 a nivel 11, 4d12 a nivel 17)."
  },
  // ==========================================
  // NIVEL 1
  // ==========================================
  {
    id: "proyectil_magico",
    name: "Proyectil M\xE1gico",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Creas 3 dardos m\xE1gicos brillantes. Cada dardo impacta autom\xE1ticamente sin necesidad de tirada de ataque a criaturas que veas, causando 1d4 + 1 de da\xF1o de fuerza cada uno (+1 dardo por nivel superior)."
  },
  {
    id: "rayo_de_hechiceria",
    name: "Rayo de Hechicería",
    level: 1,
    school: "Evocación",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V, S, M (una rama de un árbol alcanzado por un rayo)",
    duration: "Concentración, hasta 1 min",
    concentration: true,
    classes: ["hechicero", "brujo", "mago"],
    description: "Un haz crepitante de energía azul azota a una criatura dentro del alcance (D&D 5.5). Realiza un ataque de conjuro a distancia. Si impactas, el objetivo sufre 2d12 de daño de relámpago. En cada uno de tus turnos posteriores mientras mantengas la concentración, puedes usar una acción adicional para infligir automáticamente 1d12 de daño de relámpago al objetivo si permanece dentro del alcance y línea de visión. A niveles superiores: El daño inicial aumenta en 1d12 por cada nivel de espacio superior a 1."
  },
  {
    id: "salto",
    name: "Salto",
    level: 1,
    school: "Transmutación",
    castingTime: "1 acción adicional",
    range: "Toque",
    components: "V, S, M (la pata trasera de un saltamontes)",
    duration: "1 minuto",
    classes: ["druida", "explorador", "hechicero", "mago"],
    description: "Tocas a una criatura voluntaria (D&D 5.5). Una vez en cada uno de sus turnos hasta que el conjuro termine, la criatura puede gastar 3 metros (10 pies) de su velocidad para saltar hasta 9 metros (30 pies) en cualquier dirección sin necesidad de realizar una prueba de Fuerza. A niveles superiores: Puedes elegir una criatura voluntaria adicional por cada nivel de espacio superior a nivel 1."
  },
  {
    id: "identificar",
    name: "Identificar",
    level: 1,
    school: "Adivinación",
    castingTime: "1 minuto (o ritual)",
    range: "Toque",
    components: "V, S, M (una perla de al menos 100 po y una pluma de búho)",
    duration: "Instantáneo",
    ritual: true,
    classes: ["bardo", "mago"],
    description: "Eliges un objeto que debes tocar a lo largo del lanzamiento. Conoces todas sus propiedades mágicas, cómo activarlas, si requiere sintonización y cuántas cargas tiene. Si tocas una criatura, averiguas qué conjuros le afectan actualmente."
  },
  {
    id: "comprender_idiomas",
    name: "Entender Idiomas",
    aliases: ["Comprender Idiomas", "Comprehend Languages"],
    level: 1,
    school: "Adivinación",
    castingTime: "1 acción (o ritual)",
    range: "Personal",
    components: "V, S, M (una pizca de hollín y sal)",
    duration: "1 hora",
    ritual: true,
    classes: ["bardo", "hechicero", "brujo", "mago"],
    description: "Durante la duración comprendes el significado literal de cualquier idioma hablado que escuches. También comprendes cualquier idioma escrito que toques, leyendo aproximadamente 1 página de texto por minuto."
  },
  {
    id: "alarma",
    name: "Alarma",
    level: 1,
    school: "Abjuración",
    castingTime: "1 minuto (o ritual)",
    range: "9 metros",
    components: "V, S, M (una campanilla diminuta y un trozo de alambre de plata)",
    duration: "8 horas",
    ritual: true,
    classes: ["explorador", "mago"],
    description: "Proteges una puerta, ventana o área de hasta 6 metros cúbicos. Hasta que el conjuro termine, una alarma te advierte cuando una criatura Diminuta o mayor toca o entra en el área protegida (alarma mental audible en tu cabeza a 1,5 km, o audible a 18 m)."
  },
  {
    id: "hablar_con_animales",
    name: "Hablar con los Animales",
    level: 1,
    school: "Adivinación",
    castingTime: "1 acción (o ritual)",
    range: "Personal",
    components: "V, S",
    duration: "10 minutos",
    ritual: true,
    classes: ["bardo", "druida", "explorador"],
    description: "Obtienes la capacidad de comunicarte verbalmente con bestias mientras dure el conjuro. Puedes comprenderlas y hacerte entender por ellas, obteniendo información sobre peligros cercanos, criaturas en la zona o rumores."
  },
  {
    id: "escudo",
    name: "Escudo",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 reacci\xF3n (al ser impactado)",
    range: "Personal",
    components: "V, S",
    duration: "1 asalto",
    classes: ["hechicero", "mago"],
    description: "Una barrera invisible de fuerza m\xE1gica surge. Obtienes +5 a tu Clase de Armadura hasta el comienzo de tu siguiente turno, incluyendo contra el ataque activador, e inmunidad total a Proyectil M\xE1gico."
  },
  {
    id: "armadura_mago",
    name: "Armadura de Mago",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M",
    duration: "8 horas",
    classes: ["hechicero", "mago"],
    description: "Tocas a una criatura voluntaria que no lleve armadura. Su CA base se convierte en 13 + su modificador de Destreza hasta que termine el conjuro o se ponga armadura."
  },
  {
    id: "curar_heridas",
    name: "Curar Heridas",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "druida", "paladin", "explorador"],
    description: "En D&D 5.5, una criatura que tocas recupera 2d8 + tu modificador de caracter\xEDstica m\xE1gica (+2d8 por cada nivel de conjuro superior a 1)."
  },
  {
    id: "palabra_curacion",
    name: "Palabra de Curaci\xF3n",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "18 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "druida"],
    description: "Una palabra reconfortante a distancia. Una criatura visible a 18 metros recupera 2d4 + tu modificador de caracter\xEDstica m\xE1gica como acci\xF3n adicional (+2d4 por nivel superior)."
  },
  {
    id: "bendicion",
    name: "Bendici\xF3n",
    level: 1,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo", "paladin"],
    description: "Bendices hasta 3 criaturas a tu elecci\xF3n dentro del alcance. Cada vez que realicen una tirada de ataque o de salvaci\xF3n, suman 1d4 al resultado (+1 criatura por nivel superior)."
  },
  {
    id: "saeta_guia",
    name: "Saeta Gu\xEDa",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "1 asalto",
    classes: ["clerigo"],
    description: "Un destello de luz sagrada. Ataque a distancia con conjuro que causa 4d6 de da\xF1o radiante (+1d6 por nivel superior). La siguiente tirada de ataque contra el objetivo antes del final de tu pr\xF3ximo turno tiene ventaja."
  },
  {
    id: "santuario",
    name: "Santuario",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "9 metros",
    components: "V, S, M",
    duration: "1 minuto",
    classes: ["clerigo"],
    description: "Proteges a una criatura contra ataques. Cualquier enemigo que intente atacarla o lanzarle un conjuro da\xF1ino debe superar salvaci\xF3n de Sabidur\xEDa o verse obligado a elegir otro objetivo o perder el ataque."
  },
  {
    id: "castigo_divino",
    name: "Castigo Divino",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["paladin"],
    description: "Al golpear a una criatura con un ataque con arma, canalizas energ\xEDa divina: infliges 2d8 de da\xF1o radiante adicional (+1d8 si el objetivo es un infernal o no-muerto, y +1d8 por nivel superior)."
  },
  {
    id: "castigo_atronador",
    name: "Castigo Atronador",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["paladin"],
    description: "Tu arma retumba con la fuerza del trueno: infliges 2d6 de da\xF1o de trueno extra y la criatura debe superar una salvaci\xF3n de Fuerza o ser empujada 3 metros y quedar Derribada."
  },
  {
    id: "castigo_colerico",
    name: "Castigo Col\xE9rico",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["paladin"],
    description: "Tu golpe infunde terror sobrenatural: causa 1d6 de da\xF1o ps\xEDquico extra y el objetivo debe superar salvaci\xF3n de Sabidur\xEDa o queda con la condici\xF3n de Asustado."
  },
  {
    id: "castigo_abrasador",
    name: "Castigo Abrasador",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Tu arma arde en llamas blancas: causa 1d6 de da\xF1o por fuego extra y prende al objetivo, sufriendo 1d6 de fuego al inicio de cada uno de sus turnos hasta superar salvaci\xF3n de CON."
  },
  {
    id: "manos_ardientes",
    name: "Manos Ardientes",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (cono de 4,5 metros)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Una s\xE1bana de llamas surge de las puntas de tus dedos. Cada criatura en un cono de 4,5 metros debe superar salvaci\xF3n de Destreza o sufrir 3d6 de fuego (la mitad con \xE9xito)."
  },
  {
    id: "onda_atronadora",
    name: "Ola Atronadora",
    aliases: ["Onda Atronadora", "Thunderwave"],
    level: 1,
    school: "Evocación",
    castingTime: "1 acci\xF3n",
    range: "Personal (cubo de 4,5 metros)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "druida", "hechicero", "mago"],
    description: "Una detonaci\xF3n de energ\xEDa de trueno. Criaturas en un cubo de 4,5 metros sufren 2d8 de da\xF1o trueno y son empujadas 3 metros si fallan salvaci\xF3n de Constituci\xF3n."
  },
  {
    id: "marca_del_cazador",
    name: "Marca del Cazador",
    level: 1,
    school: "Adivinaci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "27 metros",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["explorador"],
    description: "Marcas a una criatura como tu presa. Infliges 1d6 extra de da\xF1o cada vez que la golpees con un ataque, y tienes ventaja en pruebas de Sabidur\xEDa (Percepci\xF3n/Supervivencia) para rastrearla."
  },
  {
    id: "fuego_feerico",
    name: "Fuego Fe\xE9rico",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (cubo de 6 m)",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "druida"],
    description: "Una luz de colores resplandece sobre todos los objetos y criaturas en un cubo de 6 m que fallen salvaci\xF3n de Destreza. No pueden beneficiarse de invisibilidad y los ataques contra ellos tienen ventaja."
  },
  {
    id: "enredo",
    name: "Enredo",
    level: 1,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros (cubo de 6 m)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida"],
    description: "Plantas y enredaderas brotan del suelo en un cubo de 6 metros. El \xE1rea es terreno dif\xEDcil y las criaturas que fallen salvaci\xF3n de Fuerza quedan Apresadas por la vegetaci\xF3n."
  },
  {
    id: "orden_imperiosa",
    name: "Orden Imperiosa",
    level: 1,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V",
    duration: "1 asalto",
    classes: ["clerigo", "paladin"],
    description: "Pronuncias una orden de una sola palabra (como Ac\xE9rcate, Suelta, Huye, T\xEDrate o Detente). Si la criatura falla una salvaci\xF3n de Sabidur\xEDa, debe obedecerla en su siguiente turno."
  },
  {
    id: "escudo_de_la_fe",
    name: "Escudo de la Fe",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "18 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["clerigo", "paladin"],
    description: "Un campo resplandeciente rodea a una criatura de tu elecci\xF3n dentro del alcance, otorg\xE1ndole un bonificador de +2 a la Clase de Armadura durante la duraci\xF3n."
  },
  {
    id: "dormir",
    name: "Dormir",
    level: 1,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "27 metros (esfera de 6 m)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago"],
    description: "En D&D 5.5, cada criatura en una esfera de 6 metros debe superar una tirada de salvaci\xF3n de Sabidur\xEDa o queda Incapacitada y cae Inconsciente en estado de sue\xF1o m\xE1gico hasta recibir da\xF1o o ser despertada."
  },
  {
    id: "hechizar_persona",
    name: "Hechizar Persona",
    aliases: ["Encantar Persona", "Charm Person", "hechizar persona", "encantar persona"],
    level: 1,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S",
    duration: "1 hora",
    classes: ["bardo", "druida", "hechicero", "mago", "brujo"],
    description: "Intentas hechizar a un humanoide. Debe superar salvaci\xF3n de Sabidur\xEDa (con ventaja si est\xE1is en combate). Si falla, queda Hechizado por ti y te considera un conocido amistoso."
  },
  {
    id: "disfrazarse",
    name: "Disfrazarse",
    level: 1,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V, S",
    duration: "1 hora",
    classes: ["bardo", "hechicero", "mago"],
    description: "Haces que tu aspecto cambie de forma ilusoria: ropa, armadura, altura (hasta 30 cm m\xE1s alto o bajo), peso y rasgos faciales a tu voluntad."
  },
  {
    id: "deteccion_magia",
    name: "Detecci\xF3n de la Magia",
    level: 1,
    school: "Adivinaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 9 metros)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    ritual: true,
    classes: ["bardo", "clerigo", "druida", "paladin", "explorador", "hechicero", "mago", "brujo"],
    description: "Percibes la presencia de magia a 9 metros. Puedes usar tu acci\xF3n para ver un aura tenue alrededor de cualquier criatura u objeto visible que porte magia y conocer su escuela."
  },
  {
    id: "caida_pluma",
    name: "Ca\xEDda de Pluma",
    level: 1,
    school: "Transmutaci\xF3n",
    castingTime: "1 reacci\xF3n (al caer t\xFA o aliados)",
    range: "18 metros",
    components: "V, M",
    duration: "1 minuto",
    classes: ["bardo", "hechicero", "mago"],
    description: "Eliges hasta 5 criaturas que est\xE9n cayendo. Su velocidad de ca\xEDda se reduce a 18 metros por asalto y no sufren ning\xFAn da\xF1o al aterrizar."
  },
  {
    id: "grasa",
    name: "Grasa",
    level: 1,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (cuadrado de 3 m)",
    components: "V, S, M",
    duration: "1 minuto",
    classes: ["hechicero", "mago"],
    description: "Cubre el suelo con grasa resbaladiza en un cuadrado de 3 metros. Terreno dif\xEDcil: criaturas que entren o comiencen su turno deben superar salvaci\xF3n de DES o caer Derribadas."
  },
  {
    id: "buenas_bayas",
    name: "Buenas Bayas",
    aliases: ["Bayas Mágicas (Buenas Bayas)", "Bayas Mágicas", "Goodberry"],
    level: 1,
    school: "Transmutación",
    castingTime: "1 acción",
    range: "Toque",
    components: "V, S, M",
    duration: "24 horas",
    classes: ["druida", "explorador"],
    description: "Creas hasta 10 bayas mágicas. Una criatura puede comer una baya como acción adicional para recuperar 1 punto de golpe y obtener sustento nutritivo para todo el día."
  },
  {
    id: "susurros_discordantes",
    name: "Susurros Discordantes",
    aliases: ["Susurros Disonantes", "Dissonant Whispers", "susurros disonantes", "susurros discordantes"],
    level: 1,
    school: "Encantamiento",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V",
    duration: "Instantáneo",
    classes: ["bardo"],
    description: "Susurras una melodía discordante. Salvación de Sabiduría: si falla sufre 3d6 de daño psíquico y debe huir inmediatamente usando su reacción tan lejos de ti como pueda."
  },
  {
    id: "risa_tasha",
    name: "Risa Horrible",
    aliases: ["Risa Horrible de Tasha", "Tasha's Hideous Laughter"],
    level: 1,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "mago"],
    description: "Una criatura percibe todo como c\xF3micamente hilarante. Salvaci\xF3n de Sabidur\xEDa: si falla, cae Derribada e Incapacitada por la risa incontrolable."
  },
  {
    id: "armadura_agathys",
    name: "Armadura de Agathys",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "Personal",
    components: "V, S, M",
    duration: "1 hora",
    classes: ["brujo"],
    description: "Una escarcha espectral te cubre, otorg\xE1ndote 5 puntos de golpe temporales. Mientras los mantengas, cualquier criatura que te golpee con un ataque cuerpo a cuerpo sufre 5 de da\xF1o por fr\xEDo (+5 PG y +5 da\xF1o por nivel superior)."
  },
  {
    id: "reprension_infernal",
    name: "Reprensi\xF3n Infernal",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 reacci\xF3n (al recibir da\xF1o)",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["brujo"],
    description: "Se\xF1alas a la criatura que te acaba de herir y la envuelves en llamas del averno. Salvaci\xF3n de Destreza: sufre 2d10 de da\xF1o por fuego (la mitad con \xE9xito; +1d10 por nivel superior)."
  },
  {
    id: "rayo_enfermedad",
    name: "Rayo de Enfermedad",
    aliases: ["Rayo de enfermedad", "Ray of Sickness"],
    level: 1,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    isAttackSpell: true,
    attackType: "ranged",
    damageFormula: "2d8",
    damageType: "veneno",
    description: "Un rayo de energ\xEDa verdosa enfermiza sale disparado hacia una criatura a tu alcance. Realiza un ataque de conjuro a distancia. Si impactas, el objetivo sufre 2d8 de da\xF1o por veneno y debe superar una salvaci\xF3n de Constituci\xF3n o quedar Envenenado hasta el final de tu siguiente turno."
  },
  {
    id: "vida_falsa",
    name: "Vida Falsa",
    aliases: ["Falsa Vida", "Vida falsa", "False Life"],
    level: 1,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V, S, M (un poco de alcohol)",
    duration: "1 hora",
    classes: ["hechicero", "mago"],
    description: "Te infundes una imitaci\xF3n nigrom\xE1ntica de vitalidad. Obtienes 2d4 + 4 puntos de golpe temporales durante 1 hora (aumenta en +5 PG temporales por cada nivel de espacio superior)."
  },
  {
    id: "zancada_prodigiosa",
    name: "Zancada Prodigiosa",
    aliases: ["Zancada prodigiosa", "Longstrider"],
    level: 1,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M (una pizca de tierra)",
    duration: "1 hora",
    classes: ["bardo", "druida", "explorador", "mago"],
    description: "Tocas a una criatura. La velocidad de la criatura aumenta en 3 metros hasta que termine el conjuro (afecta a 1 criatura adicional por nivel de espacio superior)."
  },
  {
    id: "orbe_cromatico",
    name: "Orbe Crom\xE1tico",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (diamante de 50 po)",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Lanzas un orbe de energ\xEDa elemental a tu elecci\xF3n (\xC1cido, Fr\xEDo, Fuego, Rayo, Veneno o Trueno). Ataque de conjuro a distancia: causa 3d8 de da\xF1o del tipo elegido (+1d8 por nivel superior)."
  },
  {
    id: "absorber_elementos",
    name: "Absorber Elementos",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 reacci\xF3n (al recibir da\xF1o elemental)",
    range: "Personal",
    components: "S",
    duration: "1 asalto",
    classes: ["druida", "explorador", "hechicero", "mago"],
    description: "Capturas parte de la energ\xEDa entrante (\xC1cido, Fr\xEDo, Fuego, Rayo o Trueno), ganando resistencia a ese da\xF1o para el ataque activador y sumando 1d6 de ese elemento a tu siguiente ataque con arma."
  },
  {
    id: "hero\xEDsmo",
    name: "Hero\xEDsmo",
    level: 1,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "paladin"],
    description: "Una criatura voluntaria que toques se vuelve inmune a la condici\xF3n de Asustado y gana puntos de golpe temporales iguales a tu modificador de caracter\xEDstica m\xE1gica al inicio de cada uno de sus turnos."
  },
  {
    id: "cuchillo_de_hielo",
    name: "Cuchillo de Hielo",
    level: 1,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "S, M (una gota de agua o pedazo de hielo)",
    duration: "Instant\xE1neo",
    classes: ["druida", "hechicero", "mago"],
    description: "Creas un fragmento de hielo y lo lanzas a una criatura. Ataque de conjuro a distancia: causa 1d10 de da\xF1o perforante si impacta. Luego, el cuchillo explota en esquirlas de hielo: el objetivo y todas las criaturas a 1,5 metros deben superar una salvaci\xF3n de Destreza o sufrir 2d6 de da\xF1o por fr\xEDo (+1d6 fr\xEDo por nivel superior)."
  },
  {
    id: "saeta_caotica",
    name: "Saeta Ca\xF3tica",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero"],
    description: "Lanzas una masa ondulante de energ\xEDa ca\xF3tica. Ataque de conjuro a distancia: causa 2d8 + 1d6 de da\xF1o. El tipo de da\xF1o depende de uno de los d8 (\xC1cido, Fr\xEDo, Fuego, Fuerza, Rayo, Veneno, Ps\xEDquico o Trueno). Si ambos d8 muestran el mismo n\xFAmero, la energ\xEDa salta autom\xE1ticamente a un nuevo objetivo a 9 metros."
  },
  {
    id: "catapulta",
    name: "Catapulta",
    level: 1,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "45 metros",
    components: "S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Eliges un objeto libre de hasta 2,5 kg a 45 metros y lo lanzas en l\xEDnea recta hasta 27 metros. Si impacta contra una criatura, esta debe superar una salvaci\xF3n de Destreza o sufrir 3d8 de da\xF1o contundente (tanto la criatura como el objeto sufren el da\xF1o)."
  },
  {
    id: "temblor_de_tierra",
    name: "Temblor de Tierra",
    level: 1,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 3 metros)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "druida", "hechicero", "mago"],
    description: "Creas una sacudida s\xEDsmica en el suelo en un radio de 3 metros a tu alrededor. Cada criatura en el \xE1rea debe superar una salvaci\xF3n de Destreza o sufrir 1d6 de da\xF1o contundente y caer Derribada."
  },
  {
    id: "santuario_lunar",
    name: "Santuario Lunar de Sel\xFBne",
    level: 1,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M (un fragmento de piedra lunar)",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["clerigo", "druida"],
    description: "Invocas la bendici\xF3n protectora de la luna sobre un aliado. Gana +2 a la CA mientras no lleve armadura pesada y resistencia al da\xF1o radiante y necr\xF3tico."
  },
  // ==========================================
  // NIVEL 2
  // ==========================================
  {
    id: "castigo_brillante",
    name: "Castigo Brillante",
    level: 2,
    school: "Transmutación",
    castingTime: "1 acción adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Concentración, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Canalizas resplandor celestial en tu golpe (D&D 5.5). Al golpear con un arma o golpe desarmado, infliges 2d6 de daño radiante adicional. El objetivo emite luz brillante a 1,5 m, no puede beneficiarse de invisibilidad y las tiradas de ataque contra él tienen ventaja mientras dure la concentración. A niveles superiores: +1d6 de daño radiante por nivel superior."
  },
  {
    id: "paso_sin_rastro",
    name: "Paso sin Rastro",
    level: 2,
    school: "Abjuración",
    castingTime: "1 acción",
    range: "Personal (emanación de 9 m)",
    components: "V, S, M (cenizas de una hoja de muérdago)",
    duration: "Concentración, hasta 1 hora",
    concentration: true,
    classes: ["druida", "explorador"],
    description: "Un velo de sombras y silencio emana de ti en un radio de 9 metros (D&D 5.5). Tú y cualquier criatura que elijas en el área obtenéis un bonificador de +10 a las pruebas de Destreza (Sigilo) y no podéis ser rastreados salvo por medios mágicos."
  },
  {
    id: "ver_invisibilidad",
    name: "Ver Invisibilidad",
    level: 2,
    school: "Adivinación",
    castingTime: "1 acción",
    range: "Personal",
    components: "V, S, M (una pizca de talco y polvo de plata)",
    duration: "1 hora",
    classes: ["bardo", "hechicero", "mago"],
    description: "Durante la duración puedes ver criaturas y objetos invisibles como si fueran visibles, y puedes percibir el Plano Etéreo hasta una distancia de 18 metros."
  },
  {
    id: "flecha_acida_melf",
    name: "Flecha Ácida",
    aliases: ["Flecha Ácida de Melf", "Melf's Acid Arrow"],
    level: 2,
    school: "Evocación",
    castingTime: "1 acción",
    range: "27 metros",
    components: "V, S, M (polvo de hoja de ruibarbo y un estómago de víbora)",
    duration: "Instantáneo",
    classes: ["mago"],
    description: "Una flecha verde reluciente sale disparada hacia un objetivo a tu alcance. Realiza un ataque de conjuro a distancia. Si impactas, sufre 4d4 de daño por ácido de inmediato y 2d4 de daño por ácido al final de su siguiente turno. Si fallas, la flecha salpica al objetivo infligiendo la mitad del daño inicial (2d4) y nada al siguiente turno. A niveles superiores: +1d4 daño inicial y +1d4 daño posterior por cada nivel superior a 2."
  },
  {
    id: "fuerza_fantasmal",
    name: "Fuerza Fantasmal",
    level: 2,
    school: "Ilusión",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V, S, M (un mechón de lana)",
    duration: "Concentración, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago"],
    description: "Creas una ilusión que arraiga en la mente de una criatura visible. Debe superar una salvación de Inteligencia o creer que la ilusión es completamente real. La criatura puede sufrir 1d6 de daño psíquico cada asalto si la ilusión parece dañina (fuego, garras, etc.)."
  },
  {
    id: "rayo_debilitador",
    name: "Rayo Debilitador",
    level: 2,
    school: "Nigromancia",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V, S",
    duration: "Concentración, hasta 1 min",
    concentration: true,
    classes: ["brujo", "mago"],
    description: "Un rayo negro de energía debilitante surge de tus dedos hacia una criatura a tu alcance. Realiza un ataque de conjuro a distancia. Si impactas, el objetivo causa solo la mitad de daño con ataques basados en Fuerza y tiene desventaja en salvaciones de Fuerza mientras dure la concentración (salvación de CON al final de cada uno de sus turnos para terminar)."
  },
  {
    id: "rayo_abrasador",
    name: "Rayo Abrasador",
    level: 2,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Creas 3 rayos de fuego ardientes. Realizas una tirada de ataque de conjuro a distancia por cada rayo. Con cada impacto infliges 2d6 de da\xF1o por fuego (+1 rayo por cada nivel superior)."
  },
  {
    id: "paso_brumoso",
    name: "Paso Brumoso",
    level: 2,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "Personal",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago", "brujo"],
    description: "Rodeado brevemente por una niebla plateada, te teletransportas hasta 9 metros a un espacio desocupado que puedas ver como acci\xF3n adicional."
  },
  {
    id: "rayo_debilitamiento",
    name: "Rayo de Debilitamiento",
    aliases: ["Rayo de debilitamiento", "Ray of Enfeeblement"],
    level: 2,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 minuto",
    concentration: true,
    classes: ["brujo", "mago"],
    isAttackSpell: true,
    attackType: "ranged",
    description: "Un rayo negro de energ\xEDa debilitante brota hacia una criatura. Ataque de conjuro a distancia: si impactas, el objetivo inflige solo la mitad de da\xF1o con ataques basados en Fuerza hasta que termine el conjuro (salvaci\xF3n de Constituci\xF3n al final de cada turno para liberarse)."
  },
  {
    id: "pasar_sin_rastro",
    name: "Pasar sin Rastro",
    aliases: ["Pasar sin rastro", "Pass without Trace"],
    level: 2,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (esfera de 9 metros)",
    components: "V, S, M (cenizas de mu\xE9rdago)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["druida", "explorador"],
    description: "Un velo de sombras y silencio emana de ti. Durante la duraci\xF3n, cada criatura de tu elecci\xF3n a 9 metros obtiene un bonificador de +10 a las pruebas de Destreza (Sigilo) y no puede ser rastreada salvo por medios m\xE1gicos."
  },
  {
    id: "imagen_espejo",
    name: "Imagen Espejo",
    level: 2,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V, S",
    duration: "1 minuto",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Tres duplicados ilusorios se mueven contigo. Cada imagen incrementa tu CA en tu mod de caracter\xEDstica m\xE1gica, y los ataques fallidos destruyen una imagen sucesivamente."
  },
  {
    id: "calentar_metal",
    name: "Calentar Metal",
    aliases: ["Calentar metal", "Heat Metal", "heat metal", "calentar_metal"],
    level: 2,
    school: "Transmutación",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V, S, M (un trozo de hierro y una llama)",
    duration: "Concentración, hasta 1 minuto",
    concentration: true,
    classes: ["bardo", "druida"],
    isAttackSpell: true,
    description: "Eliges un objeto metálico manufacturado (como un arma o armadura) visible dentro del alcance. Haces que se vuelva incandescente al rojo vivo. Cualquier criatura en contacto físico con él sufre 2d8 de daño por fuego cuando lanzas el conjuro. En tus turnos posteriores puedes usar una acción adicional para causarle 2d8 de daño por fuego nuevamente. Si la criatura viste o sostiene el objeto, debe superar una salvación de Constitución o soltarlo si es posible; si no lo suelta (o lleva armadura metálica), sufre desventaja en tiradas de ataque y pruebas de característica hasta el inicio de tu siguiente turno (+1d8 de daño por fuego por nivel superior)."
  },
  {
    id: "arma_espiritual",
    name: "Arma Espiritual",
    level: 2,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, 1 minuto",
    concentration: true,
    classes: ["clerigo"],
    description: "Creas un arma espectral flotante. Realizas un ataque de conjuro cuerpo a cuerpo que inflige 1d8 + tu mod de caracter\xEDstica de da\xF1o de fuerza, y puedes moverla hasta 6 m y atacar cada asalto como acci\xF3n adicional."
  },
  {
    id: "invisibilidad",
    name: "Invisibilidad",
    level: 2,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Tocas a una criatura voluntaria. Se vuelve invisible junto con todo lo que vista o lleve hasta que el conjuro termine, o hasta que ataque o lance un conjuro (+1 criatura por nivel superior)."
  },
  {
    id: "inmovilizar_persona",
    name: "Inmovilizar Persona",
    level: 2,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "clerigo", "druida", "hechicero", "mago", "brujo"],
    description: "Elige un humanoide que veas dentro del alcance. Debe superar una tirada de salvaci\xF3n de Sabidur\xEDa o queda Paralizado por la duraci\xF3n (los ataques a 1,5 metros son impactos cr\xEDticos autom\xE1ticos)."
  },
  {
    id: "telarana",
    name: "Telara\xF1a",
    level: 2,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Conjuras una masa de telara\xF1as pegajosas en un cubo de 6 metros. El \xE1rea es terreno dif\xEDcil y las criaturas que entren o comiencen su turno en ella quedan Apresadas si fallan salvaci\xF3n de Destreza."
  },
  {
    id: "oscuridad",
    name: "Oscuridad",
    level: 2,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (esfera de 4,5 m)",
    components: "V, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["hechicero", "mago", "brujo"],
    description: "Una oscuridad m\xE1gica impenetrable llena una esfera de 4,5 metros de radio. La visi\xF3n en la oscuridad no puede ver a trav\xE9s de ella y la luz no m\xE1gica no puede iluminarla."
  },
  {
    id: "rayo_de_luna",
    name: "Rayo de Luna",
    level: 2,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros (cilindro de 1,5 m de radio x 12 m de alto)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida", "paladin"],
    description: "Un haz de luz plateada p\xE1lida. Criaturas que entren o comiencen su turno en el haz sufren 2d10 de da\xF1o radiante si fallan salvaci\xF3n de CON (los cambiaformas hacen la tirada con desventaja)."
  },
  {
    id: "crecimiento_espinas",
    name: "Crecimiento de Espinas",
    level: 2,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "45 metros (radio de 6 m)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["druida", "explorador"],
    description: "El suelo en un radio de 6 metros se transforma en una mara\xF1a de espinas y abrojos. Es terreno dif\xEDcil y una criatura sufre 2d4 de da\xF1o perforante por cada 1,5 metros que se mueva por el \xE1rea."
  },
  {
    id: "esfera_flamigera",
    name: "Esfera Flam\xEDgera",
    level: 2,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (esfera de 1,5 m)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida", "hechicero", "mago"],
    description: "Una esfera de fuego de 1,5 m que puedes mover hasta 9 metros con tu acci\xF3n adicional. Las criaturas a 1,5 m sufren 2d6 de fuego si fallan salvaci\xF3n de Destreza."
  },
  {
    id: "anicos",
    name: "Hacer Añicos",
    aliases: ["Añicos", "Shatter"],
    level: 2,
    school: "Evocación",
    castingTime: "1 acci\xF3n",
    range: "18 metros (esfera de 3 m)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Un sonido estridente y ensordecedor resuena en una esfera de 3 metros. Todas las criaturas sufren 3d8 de da\xF1o por trueno (salvaci\xF3n de CON para mitad; criaturas de piedra/metal con desventaja)."
  },
  {
    id: "levitar",
    name: "Levitar",
    level: 2,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Una criatura u objeto de hasta 250 kg se eleva verticalmente hasta 6 metros en el aire y permanece flotando. Puedes modificar su altitud hasta 6 metros en cada turno."
  },
  {
    id: "sugestion",
    name: "Sugesti\xF3n",
    level: 2,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, M",
    duration: "Concentraci\xF3n, hasta 8 horas",
    concentration: true,
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Sugieres un curso de acci\xF3n a una criatura. Si falla una salvaci\xF3n de Sabidur\xEDa, sigue la actividad indicada siempre que suene razonable y no sea directamente autodestructiva."
  },
  {
    id: "ceguera_sordera",
    name: "Ceguera / Sordera",
    level: 2,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V",
    duration: "1 minuto",
    classes: ["bardo", "clerigo", "hechicero", "mago", "brujo"],
    description: "Elige una criatura: debe superar una salvaci\xF3n de Constituci\xF3n o queda Cegada o Ensordecida a tu elecci\xF3n. Puede repetir la salvaci\xF3n al final de cada uno de sus turnos."
  },
  {
    id: "silencio",
    name: "Silencio",
    level: 2,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros (esfera de 6 m)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    ritual: true,
    classes: ["bardo", "clerigo", "explorador"],
    description: "Ning\xFAn sonido puede ser creado dentro ni pasar a trav\xE9s de una esfera de 6 metros. Las criaturas son inmunes al da\xF1o de trueno y no se pueden lanzar conjuros con componente verbal."
  },
  {
    id: "auxilio_divino",
    name: "Auxilio Divino",
    level: 2,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "8 horas",
    classes: ["clerigo", "paladin", "bardo", "druida"],
    description: "Tu conjuro infunde vigor divino a hasta 3 criaturas a tu elecci\xF3n. Los puntos de golpe m\xE1ximos y actuales de cada objetivo aumentan en 5 durante la duraci\xF3n (+5 PG por nivel superior)."
  },
  {
    id: "restablecimiento_menor",
    name: "Restablecimiento Menor",
    level: 2,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "Toque",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "druida", "paladin", "explorador"],
    description: "Tocas a una criatura y eliminas una enfermedad o una de las siguientes condiciones: Cegado, Ensordecido, Paralizado o Envenenado."
  },
  {
    id: "mejorar_caracteristica",
    name: "Mejorar Caracter\xEDstica",
    level: 2,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["bardo", "clerigo", "druida", "hechicero", "mago"],
    description: "Tocas a una criatura y mejoras una caracter\xEDstica a tu elecci\xF3n (Fuerza del Toro, Gracia Felina, Astucia del Zorro, Esplendor del \xC1guila, Sabidur\xEDa del B\xFAho o Resistencia del Oso: ventaja en pruebas y beneficios extra)."
  },
  {
    id: "vinculo_protector",
    name: "V\xEDnculo Protector",
    level: 2,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M (anillos de platino)",
    duration: "1 hora",
    classes: ["clerigo", "paladin"],
    description: "Vinculas a un aliado voluntario. Mientras est\xE9 a 18 metros de ti, obtiene +1 a la CA, +1 a todas las tiradas de salvaci\xF3n y resistencia a todo el da\xF1o; pero cada vez que sufra da\xF1o, t\xFA sufres la misma cantidad."
  },
  {
    id: "espada_sombras",
    name: "Espada Sombr\xEDa",
    level: 2,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "Personal",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["hechicero", "brujo", "mago"],
    description: "Tejes filamentos de sombra en una espada de penumbra s\xF3lida. Es un arma cuerpo a cuerpo simple con las propiedades sutil, ligera y arrojadiza (6/18 m) que causa 2d8 de da\xF1o ps\xEDquico (+1d8 por cada 2 niveles de espacio superior) y ataca con ventaja en luz tenue u oscuridad."
  },
  {
    id: "lanza_mental",
    name: "Lanza Mental",
    level: 2,
    school: "Adivinaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "S",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["hechicero", "brujo", "mago"],
    description: "Clavas una p\xFAa ps\xEDquica en la mente de una criatura visible. Salvaci\xF3n de Sabidur\xEDa: si falla sufre 3d8 de da\xF1o ps\xEDquico (mitad con \xE9xito). Mientras mantengas la concentraci\xF3n conoces su ubicaci\xF3n exacta en todo momento."
  },
  {
    id: "espiritu_curativo",
    name: "Esp\xEDritu Curativo",
    level: 2,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida", "explorador"],
    description: "Invocas un esp\xEDritu de la naturaleza en un espacio de 1,5 metros. Cuando t\xFA o un aliado entra en el espacio por primera vez en un turno o comienza su turno all\xED, el esp\xEDritu restaura 1d6 puntos de golpe (se puede usar un n\xFAmero de veces igual a 1 + modificador de caracter\xEDstica m\xE1gica)."
  },
  {
    id: "castigo_marcador",
    name: "Castigo Marcador",
    level: 2,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Tu arma emite un destello astral. Al impactar con un ataque con arma, causas 2d6 de da\xF1o radiante adicional y el objetivo queda envuelto en una luz tenue que le impide volverse invisible y anula los beneficios de la invisibilidad."
  },
  {
    id: "pirotecnia",
    name: "Pirotecnia",
    level: 2,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "mago"],
    description: "Transformas una llama no m\xE1gica a 18 metros en fuegos artificiales cegadores (todas las criaturas a 3 metros quedan Cegadas si fallan salvaci\xF3n de CON) o en una densa cortina de humo de 6 metros de radio que bloquea totalmente la visi\xF3n durante 1 minuto."
  },
  {
    id: "aliento_de_dragon",
    name: "Aliento de Drag\xF3n",
    level: 2,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "Toque",
    components: "V, S, M (un pimiento picante)",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Tocas a una criatura voluntaria y le otorgas la capacidad de exhalar energ\xEDa elemental (\xC1cido, Fr\xEDo, Fuego, Rayo o Veneno). Como acci\xF3n en cada turno puede exhalar un cono de 4,5 metros que causa 3d6 de da\xF1o (salvaci\xF3n de DES para mitad)."
  },
  {
    id: "torbellino_polvo",
    name: "Torbellino de Polvo",
    level: 2,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida", "hechicero", "mago"],
    description: "Eliges un cubo de 1,5 metros en el suelo y creas un remolino de polvo y escombros. Criaturas que terminen su turno a 1,5 m deben superar salvaci\xF3n de Fuerza o sufrir 1d8 de da\xF1o contundente y ser empujadas 3 metros."
  },
  {
    id: "agarre_de_tierra",
    name: "Agarre de Tierra de Maximiliano",
    level: 2,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Una mano colosal de tierra y piedra compacta brota del suelo en un espacio de 1,5 m. Puedes ordenar a la mano que agarre a una criatura: salvaci\xF3n de Fuerza o queda Apresada y sufre 2d6 de da\xF1o contundente (puedes estrujarla en turnos posteriores)."
  },
  {
    id: "agilidad_del_viento",
    name: "Viento Racheado",
    level: 2,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["bardo", "druida", "hechicero"],
    description: "Un vendaval huracanado gira a tu alrededor en un radio de 3 metros: ensordece a quienes est\xE9n dentro, extingue llamas peque\xF1as, dispersa gases o nieblas e impone desventaja en tiradas de ataque con armas a distancia que crucen el viento."
  },
  {
    id: "furia_de_tempus",
    name: "Furia B\xE9lica de Tempus",
    level: 2,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "Personal",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo", "paladin"],
    description: "Canalizas la bendici\xF3n marcial del dios de las batallas de Faer\xFBn. Tus ataques con arma infligen 1d6 de da\xF1o de fuerza adicional y tienes ventaja en pruebas de Fuerza (Atletismo) para empujar o derribar oponentes."
  },
  // ==========================================
  // NIVEL 3
  // ==========================================
  {
    id: "toque_vampirico",
    name: "Toque Vampírico",
    level: 3,
    school: "Nigromancia",
    castingTime: "1 acción",
    range: "Personal",
    components: "V, S",
    duration: "Concentración, hasta 1 min",
    concentration: true,
    classes: ["brujo", "mago"],
    description: "El toque de tu mano envuelta en sombras drena la fuerza vital de otros para alimentar la tuya. Realiza un ataque de conjuro cuerpo a cuerpo contra una criatura dentro de tu alcance. Si impactas, el objetivo sufre 3d6 de daño necrótico y tú recuperas puntos de golpe iguales a la mitad del daño infligido. Puedes volver a atacar en cada uno de tus turnos mientras dure la concentración. A niveles superiores: +1d6 de daño por nivel de espacio superior a 3."
  },
  {
    id: "luz_del_dia",
    name: "Luz del Día",
    level: 3,
    school: "Evocación",
    castingTime: "1 acción",
    range: "18 metros",
    components: "V, S",
    duration: "1 hora",
    classes: ["clerigo", "druida", "explorador", "paladin", "hechicero"],
    description: "Haces que una esfera de 18 metros de radio centrada en un punto que elijas emita luz brillante, y luz tenue por otros 18 metros adicionales. Si el área se solapa con una zona de oscuridad creada por un conjuro de nivel 3 o inferior, el conjuro de oscuridad queda disipado automáticamente."
  },
  {
    id: "respiracion_acuatica",
    name: "Respiración Acuática",
    level: 3,
    school: "Transmutación",
    castingTime: "1 acción (o ritual)",
    range: "9 metros",
    components: "V, S, M (una caña corta o una brizna de paja)",
    duration: "24 horas",
    ritual: true,
    classes: ["druida", "explorador", "hechicero", "mago"],
    description: "Este conjuro otorga hasta a 10 criaturas voluntarias a tu alcance la capacidad de respirar bajo el agua mientras dure el conjuro. Las criaturas afectadas retienen también su modo normal de respirar."
  },
  {
    id: "caminar_sobre_las_aguas",
    name: "Caminar sobre las Aguas",
    level: 3,
    school: "Transmutación",
    castingTime: "1 acción (o ritual)",
    range: "9 metros",
    components: "V, S, M (un trozo de corcho)",
    duration: "1 hora",
    ritual: true,
    classes: ["clerigo", "druida", "explorador", "hechicero"],
    description: "Otorga la capacidad de moverse a través de cualquier superficie líquida (como agua, ácido, barro, nieve o lava) como si fuera tierra firme a hasta 10 criaturas voluntarias a tu alcance durante 1 hora."
  },
  {
    id: "bola_de_fuego",
    name: "Bola de Fuego",
    level: 3,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "45 metros (esfera de 6 m)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Un rayo brillante estalla en una esfera de 6 metros de radio de fuego atronador. Todas las criaturas en el \xE1rea sufren 8d6 de da\xF1o por fuego (salvaci\xF3n de Destreza para mitad de da\xF1o; +1d6 por nivel superior)."
  },
  {
    id: "relampago",
    name: "Rel\xE1mpago",
    level: 3,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (l\xEDnea de 30 metros x 1,5 m)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Un haz chispeante de electricidad de 30 metros de largo y 1,5 metros de ancho. Todas las criaturas en la l\xEDnea sufren 8d6 de da\xF1o por rel\xE1mpago si fallan salvaci\xF3n de Destreza (+1d6 por nivel superior)."
  },
  {
    id: "contrahechizo",
    name: "Contrahechizo",
    level: 3,
    school: "Abjuraci\xF3n",
    castingTime: "1 reacci\xF3n",
    range: "18 metros",
    components: "S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago", "brujo"],
    description: "En D&D 5.5, interrumpe a una criatura lanzando un conjuro. El lanzador debe superar una tirada de salvaci\xF3n de Constituci\xF3n con tu CD de conjuros o su conjuro falla y se malgasta."
  },
  {
    id: "disipar_magia",
    name: "Disipar Magia",
    level: 3,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "druida", "hechicero", "mago", "brujo", "paladin"],
    description: "Elige una criatura, objeto o efecto m\xE1gico dentro del alcance. Cualquier conjuro de nivel 3 o menor termina inmediatamente. Para conjuros superiores realizas prueba de caracter\xEDstica CD 10 + nivel."
  },
  {
    id: "espiritus_guardianes",
    name: "Esp\xEDritus Guardianes",
    level: 3,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 4,5 metros)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["clerigo"],
    description: "Invocas esp\xEDritus protectores en un radio de 4,5 metros. La velocidad de los enemigos se reduce a la mitad y sufren 3d8 de da\xF1o radiante o necr\xF3tico si fallan salvaci\xF3n de Sabidur\xEDa (+1d8 por nivel superior)."
  },
  {
    id: "volar",
    name: "Volar",
    level: 3,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["hechicero", "mago", "brujo"],
    description: "Tocas a una criatura voluntaria. Gana una velocidad de vuelo de 18 metros mientras dure el conjuro (+1 criatura por nivel de conjuro superior)."
  },
  {
    id: "velocidad",
    name: "Velocidad",
    level: 3,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Elige una criatura voluntaria. Su velocidad se duplica, gana +2 a la CA, ventaja en salvaciones de Destreza y una acci\xF3n adicional cada turno para Atacar (1 solo ataque), Correr, Destrabarse o Usar objeto."
  },
  {
    id: "revivir",
    name: "Revivir",
    level: 3,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M (diamante de 300 po)",
    duration: "Instant\xE1neo",
    classes: ["clerigo", "druida", "paladin", "explorador"],
    description: "Tocas a una criatura que haya muerto en el \xFAltimo minuto. Esa criatura vuelve a la vida de inmediato con 1 punto de golpe."
  },
  {
    id: "hambre_de_hadar",
    name: "Hambre de Hadar",
    level: 3,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "45 metros (esfera de 6 m)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["brujo"],
    description: "Abres una puerta al vac\xEDo en una esfera de 6 metros. Oscuridad m\xE1gica y terreno dif\xEDcil; causa 2d6 de fr\xEDo al iniciar el turno y 2d6 de \xE1cido al terminarlo si falla salvaci\xF3n de Destreza."
  },
  {
    id: "patron_hipnotico",
    name: "Patr\xF3n Hipn\xF3tico",
    level: 3,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros (cubo de 9 m)",
    components: "S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Creas un patr\xF3n entrelazado de luces caleidosc\xF3picas. Criaturas en el \xE1rea que fallen salvaci\xF3n de Sabidur\xEDa quedan Hechizadas e Incapacitadas con velocidad 0."
  },
  {
    id: "miedo",
    name: "Miedo",
    level: 3,
    school: "Ilusi\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (cono de 9 metros)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Proyectas una imagen espectral de pesadilla. Cada criatura en un cono de 9 metros que falle salvaci\xF3n de Sabidur\xEDa suelta lo que lleve y queda Asustada, huyendo de ti en cada turno."
  },
  {
    id: "lentitud",
    name: "Lentitud",
    level: 3,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros (cubo de 12 m)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago"],
    description: "Alteras el flujo del tiempo para hasta 6 criaturas. Si fallan salvaci\xF3n de Sabidur\xEDa, su velocidad se reduce a la mitad, sufren -2 a la CA y salvaciones de DES, y no pueden realizar reacciones."
  },
  {
    id: "llamar_al_relampago",
    name: "Llamar al Rel\xE1mpago",
    level: 3,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros (nube de 18 m)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["druida"],
    description: "Creas una nube de tormenta. Como acci\xF3n en cada turno puedes hacer caer un rayo en un radio de 1,5 metros que inflige 3d10 de da\xF1o de rel\xE1mpago (salvaci\xF3n de DES para mitad)."
  },
  {
    id: "palabra_curacion_masiva",
    name: "Palabra de Curaci\xF3n Masiva",
    level: 3,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional",
    range: "18 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo"],
    description: "Pronuncias una palabra de bendici\xF3n: hasta 6 criaturas visibles a 18 metros recuperan 2d4 + tu mod de caracter\xEDstica m\xE1gica (+1d4 por nivel superior)."
  },
  {
    id: "castigo_cegador",
    name: "Castigo Cegador",
    level: 3,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Tu arma emite una llamarada cegadora: infliges 3d8 de da\xF1o radiante adicional y la criatura queda con la condici\xF3n de Cegada si falla una salvaci\xF3n de Constituci\xF3n."
  },
  {
    id: "invocar_animales",
    name: "Invocar Esp\xEDritus de la Naturaleza",
    level: 3,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["druida", "explorador"],
    description: "Invocas una manada espectral de esp\xEDritus bestiales que protegen un \xE1rea de 3 metros, infligiendo 3d10 de da\xF1o a los enemigos que entren o comiencen su turno en ella."
  },
  {
    id: "meteoros_minutos_melf",
    name: "Meteoros Minutos de Melf",
    level: 3,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V, S, M (salitre y azufre)",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Creas 6 meteoritos ardientes min\xFAsculos que orbitan a tu alrededor. Al lanzarlo y como acci\xF3n adicional en turnos posteriores, puedes arrojar 1 o 2 meteoritos a puntos a 36 m: cada uno causa 2d6 de fuego a criaturas en 1,5 m que fallen salvaci\xF3n de DES."
  },
  {
    id: "paso_del_trueno",
    name: "Paso del Trueno",
    level: 3,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "brujo", "mago"],
    description: "Te teletransportas hasta 27 metros a un espacio libre visible y puedes llevar contigo a una criatura voluntaria a 1,5 m. Inmediatamente tras desaparecer, un estallido s\xF3nico audible a 90 metros causa 3d10 de da\xF1o de trueno a criaturas a 3 metros de tu posici\xF3n original (salvaci\xF3n de CON para mitad)."
  },
  {
    id: "enemigos_abundantes",
    name: "Enemigos Abundantes",
    level: 3,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "brujo", "mago"],
    description: "Nublas la mente de una criatura para que perciba a todos como enemigos mortales. Salvaci\xF3n de Inteligencia: si falla, no puede distinguir amigos de enemigos, debe elegir objetivos de ataque y conjuros al azar y pierde la capacidad de realizar ataques de oportunidad selectivos."
  },
  {
    id: "manto_del_cruzado",
    name: "Manto del Cruzado",
    level: 3,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (aura de 9 metros)",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Un aura de poder sagrado de 9 metros te rodea. Mientras est\xE9n en el aura, los ataques con arma que realices t\xFA y tus aliados causan 1d4 de da\xF1o radiante adicional al impactar."
  },
  {
    id: "espiritu_feerico",
    name: "Convocar Esp\xEDritu F\xE9erico",
    level: 3,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (una flor dorada de 300 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["druida", "explorador", "brujo", "mago"],
    description: "Invocas un esp\xEDritu f\xE9erico de los bosques de Faer\xFBn con forma F\xFAnebre, Furiosa o Jovial. El esp\xEDritu ataca en tu turno con da\xF1o de fuerza y cuenta con habilidades de teleportaci\xF3n y trucos fe\xE9ricos."
  },
  {
    id: "invocar_muertos_vivientes",
    name: "Convocar Muertos Vivientes",
    level: 3,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (una calavera dorada de 300 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["brujo", "mago"],
    description: "Invocas un esp\xEDritu no-muerto con forma Espectral, Esquel\xE9tica o P\xFAtrida. Ataca con da\xF1o necr\xF3tico, impone estados de Envenenado o Asustado y vuela o atraviesa criaturas seg\xFAn la forma elegida."
  },
  {
    id: "invocar_sombras",
    name: "Convocar Esp\xEDritu Sombr\xEDo",
    level: 3,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (l\xE1grimas en un frasco de 300 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["brujo", "mago"],
    description: "Invocas un engendro sombr\xEDo del P\xE1ramo Sombr\xEDo con forma Furiosa, Desesperada o Aterradora. Otorga ventajas en penumbra/oscuridad y drena la velocidad y moral de los enemigos."
  },
  {
    id: "erupcion_de_tierra",
    name: "Erupci\xF3n de Tierra",
    level: 3,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros (cubo de 6 metros)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["druida", "hechicero", "mago"],
    description: "Una fuente de tierra compacta y rocas afiladas brota en un cubo de 6 metros. Cada criatura sufre 3d12 de da\xF1o contundente (salvaci\xF3n de DES para mitad) y el terreno se convierte en terreno dif\xEDcil."
  },
  {
    id: "muro_de_agua",
    name: "Muro de Agua",
    level: 3,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (muro de 9 m de largo x 3 m de alto x 30 cm de grosor)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["druida", "hechicero", "mago"],
    description: "Creas un muro transparente de agua. Criaturas en su interior nadan a media velocidad, los ataques a distancia con arma que crucen sufren desventaja y reduce el da\xF1o de fuego a la mitad."
  },
  // ==========================================
  // NIVEL 4
  // ==========================================
  {
    id: "puerta_dimensional",
    name: "Puerta Dimensional",
    level: 4,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "150 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Te teletransportas hasta 150 metros a cualquier lugar que puedas visualizar o especificar por distancia y direcci\xF3n. Puedes llevar contigo a una criatura voluntaria de tu tama\xF1o o menor."
  },
  {
    id: "polimorfar",
    name: "Polimorfar",
    level: 4,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["bardo", "druida", "hechicero", "mago"],
    description: "Transformas una criatura en una bestia con VD igual o menor a su nivel o VD (salvaci\xF3n de Sabidur\xEDa si no es voluntaria). Asume los PG y estad\xEDsticas f\xEDsicas de la nueva forma (como un T-Rex o Mamut)."
  },
  {
    id: "muro_de_fuego",
    name: "Muro de Fuego",
    level: 4,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida", "hechicero", "mago"],
    description: "Creas un muro de llamas opacas de hasta 18 metros de largo, 6 de alto y 30 cm de grosor (o anillo de 6 m). Inflige 5d8 de da\xF1o por fuego a quien est\xE9 en su \xE1rea o a 3 metros del lado caliente."
  },
  {
    id: "destierro",
    name: "Destierro",
    level: 4,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo", "paladin", "hechicero", "mago", "brujo"],
    description: "Intentas desterrar a una criatura a otro plano. Si falla una salvaci\xF3n de Carisma, es enviada a un semiplano inofensivo (o a su plano natal de forma permanente si el conjuro dura el minuto completo)."
  },
  {
    id: "custodia_contra_la_muerte",
    name: "Custodia contra la Muerte",
    level: 4,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "8 horas",
    classes: ["clerigo", "paladin"],
    description: "Tocas a una criatura. La primera vez que fuese a caer a 0 puntos de golpe antes de que termine el conjuro, sus PG caen a 1 en su lugar y el conjuro termina."
  },
  {
    id: "piel_de_piedra",
    name: "Piel de Piedra",
    level: 4,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M (polvo de diamante 100 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["druida", "explorador", "hechicero", "mago"],
    description: "La piel del objetivo se vuelve tan dura como el granito, otorg\xE1ndole resistencia al da\xF1o contundente, perforante y cortante no m\xE1gico."
  },
  {
    id: "tentaculos_evard",
    name: "Tentáculos Negros",
    aliases: ["Tentáculos Negros de Evard", "Evard's Black Tentacles"],
    level: 4,
    school: "Conjuración",
    castingTime: "1 acci\xF3n",
    range: "27 metros (cuadrado de 6 m)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["mago"],
    description: "Tent\xE1culos de \xE9bano brotan del suelo en un cuadrado de 6 metros. El \xE1rea es terreno dif\xEDcil: inflige 3d6 de da\xF1o contundente y Apresa a las criaturas que fallen salvaci\xF3n de Destreza."
  },
  {
    id: "esfera_otiluke",
    name: "Esfera Resistente de Otiluke",
    level: 4,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["mago"],
    description: "Una esfera brillante e impenetrable de fuerza m\xE1gica encierra a una criatura de tama\xF1o Grande o menor (salvaci\xF3n de DES si no es voluntaria). Nada puede cruzar la barrera en ninguna direcci\xF3n."
  },
  {
    id: "tormenta_de_hielo",
    name: "Tormenta de Hielo",
    level: 4,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "90 metros (cilindro de 6 m de radio)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["druida", "hechicero", "mago"],
    description: "Granizo masivo cae del cielo. Criaturas en el \xE1rea sufren 2d8 de da\xF1o contundente y 4d6 de da\xF1o por fr\xEDo (salvaci\xF3n de DES para mitad) y el \xE1rea queda cubierta de hielo como terreno dif\xEDcil."
  },
  {
    id: "libertad_de_movimiento",
    name: "Libertad de Movimiento",
    level: 4,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M",
    duration: "1 hora",
    classes: ["bardo", "clerigo", "druida", "explorador"],
    description: "Tocas a una criatura. Su velocidad no puede ser reducida por magia ni terreno dif\xEDcil, es inmune a las condiciones de Paralizado y Apresado, y puede escapar de presas con solo 1,5 m de movimiento."
  },
  {
    id: "guardian_de_la_fe",
    name: "Guardi\xE1n de la Fe",
    level: 4,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V",
    duration: "8 horas",
    classes: ["clerigo"],
    description: "Un guardi\xE1n espectral armado con espada y escudo aparece en un espacio libre. Inflige 20 puntos de da\xF1o radiante autom\xE1tico a cualquier enemigo que entre a 3 metros hasta infligir 60 puntos de da\xF1o total."
  },
  {
    id: "asolamiento",
    name: "Asolamiento",
    level: 4,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["druida", "hechicero", "mago", "brujo"],
    description: "Canalizas energ\xEDa necrom\xE1ntica corruptora. El objetivo sufre 8d8 de da\xF1o necr\xF3tico si falla una salvaci\xF3n de Constituci\xF3n (la mitad si tiene \xE9xito; plantas sufren da\xF1o m\xE1ximo autom\xE1ticamente)."
  },
  {
    id: "sombra_de_moil",
    name: "Sombra de Moil",
    level: 4,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V, S, M (un ojo de no-muerto en una gema de 150 po)",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["brujo"],
    description: "Filamentos de oscuridad helada te envuelven totalmente: te vuelves Fuertemente Oculto (efecto de invisibilidad / ceguera total para quienes te miren), la luz a 3 m se reduce un nivel, tienes resistencia al da\xF1o radiante y cualquier atacante a 3 m que te golpee sufre 2d8 de da\xF1o necr\xF3tico en represalia."
  },
  {
    id: "castigo_estupefaciente",
    name: "Castigo Estupefaciente",
    level: 4,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Tu golpe sacude la mente del adversario. Causas 4d6 de da\xF1o ps\xEDquico adicional y el objetivo debe superar una salvaci\xF3n de Sabidur\xEDa o sufrir desventaja en todas sus tiradas de ataque y pruebas de caracter\xEDstica y quedar incapaz de realizar reacciones hasta el final de su siguiente turno."
  },
  {
    id: "invocar_aberracion",
    name: "Convocar Aberraci\xF3n",
    level: 4,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (tent\xE1culo en frasco de platino de 400 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["brujo", "mago"],
    description: "Invocas un ser aberrante del Reino Lejano con forma de Beholderkin, Slaad u Horror Estelar. Ataca con rayos oculares ps\xEDquicos o garras regenerativas y emite un aura de susurros demenciales."
  },
  {
    id: "invocar_constructo",
    name: "Convocar Constructo",
    level: 4,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (engranaje de oricalco de 400 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["mago"],
    description: "Invocas un g\xF3lem o constructo animado de arcilla, metal o piedra. Dispone de armadura pesada natural, inmunidad a veneno y estados alterados y ataques demoledores contundentes."
  },
  {
    id: "invocar_elemental_mayor",
    name: "Convocar Esp\xEDritu Elemental",
    level: 4,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (f\xF3sil enjoyado de 400 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["druida", "explorador", "mago"],
    description: "Invocas un esp\xEDritu elemental primigenio de Aire, Tierra, Fuego o Agua. Realiza m\xFAltiples ataques elementales por turno y cuenta con resistencias y modos de movimiento planar."
  },
  {
    id: "sombra_abrasadora_shar",
    name: "Sombra Abrasadora de Shar",
    level: 4,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["brujo", "clerigo", "mago"],
    description: "Desatas una llamarada de fuego sombr\xEDo del P\xE1ramo de las Sombras. Inflige 4d8 de da\xF1o necr\xF3tico y 4d8 de da\xF1o por fr\xEDo a una criatura y reduce a 0 su capacidad curativa durante 1 asalto si falla salvaci\xF3n de Sabidur\xEDa."
  },
  // ==========================================
  // NIVEL 5
  // ==========================================
  {
    id: "plaga_de_insectos",
    name: "Plaga de Insectos",
    level: 5,
    school: "Conjuración",
    castingTime: "1 acción",
    range: "90 metros",
    components: "V, S, M (unos pocos granos de azúcar, unos granos de grasa y un insecto muerto)",
    duration: "Concentración, hasta 10 min",
    concentration: true,
    classes: ["clerigo", "druida", "hechicero"],
    description: "Una nube de langostas devoradoras llena una esfera de 6 metros de radio centrada en un punto. El área es terreno difícil y está fuertemente oscurecida. Toda criatura que empiece su turno en el área o entre en ella debe superar una salvación de CON o sufrir 4d10 de daño perforante (la mitad si supera). A niveles superiores: +1d10 por nivel superior a 5."
  },
  {
    id: "cono_frio",
    name: "Cono de Fr\xEDo",
    level: 5,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (cono de 18 metros)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Una r\xE1faga polar g\xE9lida en un cono de 18 metros. Todas las criaturas sufren 8d8 de da\xF1o por fr\xEDo si fallan una tirada de salvaci\xF3n de Constituci\xF3n (mitad si tienen \xE9xito)."
  },
  {
    id: "muro_de_fuerza",
    name: "Muro de Fuerza",
    level: 5,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["mago"],
    description: "Creas un muro invisible e indestructible de fuerza m\xE1gica (hasta 10 paneles de 3x3 metros, o una c\xFApula). Nada puede atravesarlo f\xEDsicamente ni ning\xFAn conjuro puede cruzarlo."
  },
  {
    id: "curar_heridas_masivo",
    name: "Curar Heridas Masivo",
    level: 5,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (esfera de 9 m)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "druida"],
    description: "Una ola de energ\xEDa sanadora restaura 3d8 + tu modificador de caracter\xEDstica m\xE1gica a hasta 6 criaturas dentro de una esfera de 9 metros (+1d8 por nivel superior)."
  },
  {
    id: "restablecimiento_mayor",
    name: "Restablecimiento Mayor",
    level: 5,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M (polvo de diamante 100 po)",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "druida"],
    description: "Invocas energ\xEDa positiva para eliminar: 1 nivel de agotamiento, Hechizado o Petrificado, cualquier maldici\xF3n, o reducciones a puntuaciones de caracter\xEDstica y puntos de golpe m\xE1ximos."
  },
  {
    id: "telequinesis",
    name: "Telequinesis",
    level: 5,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Mueves o manipulas criaturas u objetos de hasta 500 kg a distancia. Puedes mover a una criatura hasta 9 metros en cualquier direcci\xF3n si falla una tirada de salvaci\xF3n de Fuerza."
  },
  {
    id: "dominar_persona",
    name: "Dominar Persona",
    level: 5,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["bardo", "hechicero", "mago"],
    description: "Tomas el control telep\xE1tico absoluto de un humanoide que falle salvaci\xF3n de Sabidur\xEDa. Puedes ordenarle acciones completas directamente en su turno de combate."
  },
  {
    id: "muro_de_piedra",
    name: "Muro de Piedra",
    level: 5,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["druida", "hechicero", "mago"],
    description: "Creas un muro s\xF3lido de piedra formado por hasta diez paneles de 3x3 metros y 15 cm de grosor. Si mantienes la concentraci\xF3n los 10 minutos completos, el muro se vuelve permanente."
  },
  {
    id: "nube_aniquiladora",
    name: "Nube Aniquiladora",
    level: 5,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros (esfera de 6 m)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Generas una esfera de 6 metros de radio de gas venenoso denso y amarillento que se mueve 3 metros alej\xE1ndose de ti cada asalto. Inflige 5d8 de da\xF1o por veneno (salvaci\xF3n de CON para mitad)."
  },
  {
    id: "golpe_flamigero",
    name: "Golpe Flam\xEDgero",
    level: 5,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros (cilindro de 3 m de radio x 12 m de alto)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["clerigo"],
    description: "Una columna vertical de fuego sagrado desciende rugiendo. Criaturas en el \xE1rea sufren 4d6 de da\xF1o por fuego y 4d6 de da\xF1o radiante si fallan salvaci\xF3n de Destreza (mitad con \xE9xito)."
  },
  {
    id: "comunion",
    name: "Comuni\xF3n",
    level: 5,
    school: "Adivinaci\xF3n",
    castingTime: "1 minuto",
    range: "Personal",
    components: "V, S, M",
    duration: "1 minuto",
    ritual: true,
    classes: ["clerigo"],
    description: "Entras en contacto con tu deidad o patr\xF3n divino y formulas hasta 3 preguntas que puedan responderse con un S\xED, No o Incierto."
  },
  {
    id: "revivir_a_los_muertos",
    name: "Revivir a los Muertos",
    level: 5,
    school: "Nigromancia",
    castingTime: "1 hora",
    range: "Toque",
    components: "V, S, M (diamante de 500 po)",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo", "paladin"],
    description: "Devuelves la vida a una criatura muerta hace no m\xE1s de 10 d\xEDas. Vuelve a la vida con 1 PG y se neutralizan venenos y enfermedades que tuviera al morir."
  },
  {
    id: "circulo_de_poder",
    name: "C\xEDrculo de Poder",
    level: 5,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 9 metros)",
    components: "V",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["paladin"],
    description: "Una c\xFApula de energ\xEDa protectora de 9 metros te rodea. T\xFA y tus aliados ten\xE9is ventaja en todas las salvaciones contra conjuros y no sufr\xEDs da\xF1o al tener \xE9xito en salvaciones que aplican mitad de da\xF1o."
  },
  {
    id: "castigo_destructor",
    name: "Castigo Destructor",
    level: 5,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Tu arma chisporrotea con energ\xEDa sagrada: infliges 5d10 de da\xF1o de fuerza adicional. Si el golpe reduce al objetivo a 50 puntos de golpe o menos, es desterrado a un semiplano durante la concentraci\xF3n."
  },
  {
    id: "castigo_desterrador",
    name: "Castigo Desterrador",
    level: 5,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n adicional (al impactar)",
    range: "Personal",
    components: "V",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["paladin"],
    description: "Tu arma resplandece con poder planar. Infliges 5d10 de da\xF1o de fuerza adicional y si el objetivo queda con 50 PG o menos, es desterrado de inmediato a un semiplano inofensivo hasta que termine el conjuro."
  },
  {
    id: "mano_de_bigby",
    name: "Mano de Bigby",
    level: 5,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["mago"],
    description: "Creas una mano resplandeciente de fuerza de tama\xF1o Grande que flota en el aire. Como acci\xF3n adicional en cada turno puedes ordenarle: Pu\xF1o Apremiante (4d8 de fuerza), Empuj\xF3n de Fuerza (empujar 1,5 m + Fuerza), Mano Defensora (proporciona cobertura media) o Agarre Aplastante (2d6 + mod cada turno)."
  },
  {
    id: "ola_destructiva",
    name: "Ola Destructiva",
    level: 5,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 9 metros)",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["paladin"],
    description: "Golpeas el suelo desatando una onda s\xEDsmica y divina en un radio de 9 metros. Cada criatura a tu elecci\xF3n en el \xE1rea sufre 5d6 de da\xF1o de trueno m\xE1s 5d6 de da\xF1o radiante o necr\xF3tico y cae Derribada si falla una salvaci\xF3n de Constituci\xF3n."
  },
  {
    id: "invocar_dragon",
    name: "Convocar Esp\xEDritu Drac\xF3nico",
    level: 5,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M (un objeto de oro del tesoro de un drag\xF3n de 500 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["druida", "hechicero", "mago"],
    description: "Invocas un esp\xEDritu drac\xF3nico de tama\xF1o Grande (Crom\xE1tico, Met\xE1lico o Gema). El drag\xF3n vuela, realiza m\xFAltiples ataques con mordisco y garras, y desata un aliento destructivo de su elemento afin."
  },
  {
    id: "invocar_celestial",
    name: "Convocar Celestial",
    level: 5,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (relicario consagrado de 500 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["clerigo", "paladin"],
    description: "Invocas a un esp\xEDritu celestial con forma de Vengador o Defensor. Porta arco radiante o maza sagrada, vuela a gran velocidad e irradia luz sagrada curativa para tus aliados."
  },
  {
    id: "invocar_infernal",
    name: "Convocar Infernal",
    level: 5,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "V, S, M (sangre de humanoide en frasco de rub\xEDes de 500 po)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["brujo", "clerigo", "mago"],
    description: "Invocas un esp\xEDritu infernal con forma de Demonio, Diablo o Yugoloth. Ataca con fuego infernal o zarpas necr\xF3ticas y dispone de teleportaci\xF3n o auras de putrefacci\xF3n."
  },
  {
    id: "sinapsis_psiquica",
    name: "Sinapsis Sin\xE1ptica",
    level: 5,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "36 metros (esfera de 6 metros)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "brujo", "mago"],
    description: "Desatas una sobrecarga de energ\xEDa ps\xEDquica en una esfera de 6 metros. Cada criatura sufre 8d6 de da\xF1o ps\xEDquico y resta 1d6 a todas sus tiradas de ataque y pruebas de caracter\xEDstica durante 1 minuto si falla una salvaci\xF3n de Inteligencia."
  },
  {
    id: "colera_sagrada_faerun",
    name: "C\xF3lera Sagrada de Faer\xFBn",
    level: 5,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 9 metros)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo", "paladin"],
    description: "Canalizas el poder c\xF3smico del pante\xF3n faer\xFBniano. Los enemigos que comiencen su turno a 9 m sufren 4d8 de da\xF1o radiante y tienen su velocidad reducida a la mitad si fallan salvaci\xF3n de Sabidur\xEDa."
  },
  // ==========================================
  // NIVEL 6
  // ==========================================
  {
    id: "desintegrar",
    name: "Desintegrar",
    level: 6,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Un rayo verde esmeralda brota de tu dedo hacia una criatura u objeto. Salvaci\xF3n de Destreza: si falla, sufre 10d6 + 40 de da\xF1o de fuerza (+3d6 por nivel superior). Si este da\xF1o reduce al objetivo a 0 PG, es desintegrado en polvo fino."
  },
  {
    id: "cadena_relampagos",
    name: "Relámpago en Cadena",
    aliases: ["Cadena de Relámpagos", "Cadena de Relampagos", "Chain Lightning"],
    level: 6,
    school: "Evocación",
    castingTime: "1 acci\xF3n",
    range: "45 metros",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Disparas un rayo que impacta a un objetivo principal y luego salta a hasta 3 objetivos adicionales a 9 metros del primero. Cada criatura sufre 10d8 de da\xF1o por rel\xE1mpago si falla salvaci\xF3n de DES (mitad con \xE9xito)."
  },
  {
    id: "globo_invulnerabilidad",
    name: "Globo de Invulnerabilidad",
    level: 6,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 3 metros)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["hechicero", "mago"],
    description: "Una barrera esf\xE9rica brillante de 3 metros de radio te envuelve. Cualquier conjuro de nivel 5 o menor lanzado desde fuera no tiene ning\xFAn efecto dentro de la barrera."
  },
  {
    id: "sanar",
    name: "Sanar",
    level: 6,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["clerigo", "druida"],
    description: "Invocas un torrente de energ\xEDa divina curativa. La criatura objetivo recupera 70 puntos de golpe y se curan de inmediato las condiciones de Cegado, Ensordecido y cualquier enfermedad (+10 PG por nivel superior)."
  },
  {
    id: "dano",
    name: "Da\xF1o",
    level: 6,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["clerigo"],
    description: "Desatas una plaga necrom\xE1ntica virulenta. Salvaci\xF3n de Constituci\xF3n: si falla sufre 14d6 de da\xF1o necr\xF3tico (mitad con \xE9xito) y sus puntos de golpe m\xE1ximos se reducen en la misma cantidad."
  },
  {
    id: "festin_heroes",
    name: "Fest\xEDn de los H\xE9roes",
    level: 6,
    school: "Conjuraci\xF3n",
    castingTime: "10 minutos",
    range: "9 metros",
    components: "V, S, M (c\xE1liz enjoyado de 1000 po)",
    duration: "24 horas",
    classes: ["bardo", "clerigo", "druida"],
    description: "Materializas un banquete suntuoso para hasta 12 criaturas. Quienes participan obtienen curaci\xF3n de enfermedades/venenos, inmunidad a veneno y miedo, ventaja en salvaciones de Sabidur\xEDa y +2d10 a sus PG m\xE1ximos durante 24 horas."
  },
  {
    id: "rayo_solar",
    name: "Rayo Solar",
    level: 6,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (l\xEDnea de 18 metros x 1,5 m)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida", "hechicero", "mago", "clerigo"],
    description: "Un haz de luz solar brillante sale de tu mano. Cada criatura en la l\xEDnea sufre 6d8 de da\xF1o radiante y queda Cegada si falla salvaci\xF3n de Constituci\xF3n. Puedes repetir el haz como acci\xF3n en cada turno."
  },
  {
    id: "muro_de_hielo",
    name: "Muro de Hielo",
    level: 6,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "36 metros",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["mago"],
    description: "Creas un muro de hielo de hasta diez paneles de 3x3 metros y 30 cm de grosor. Inflige 10d6 de fr\xEDo al crearse (salvaci\xF3n de DES para mitad). Si se rompe un panel, deja una franja de aire g\xE9lido que causa 5d6 de fr\xEDo."
  },
  {
    id: "sugestion_masiva",
    name: "Sugesti\xF3n Masiva",
    level: 6,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, M",
    duration: "24 horas",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Sugieres un curso de acci\xF3n a hasta 12 criaturas a la vez. Si fallan salvaci\xF3n de Sabidur\xEDa, siguen la orden durante 24 horas sin requerir concentraci\xF3n."
  },
  {
    id: "contingencia",
    name: "Contingencia",
    level: 6,
    school: "Abjuraci\xF3n",
    castingTime: "10 minutos",
    range: "Personal",
    components: "V, S, M (estatuilla de marfil enjoyada de 1500 po)",
    duration: "10 d\xEDas",
    classes: ["mago"],
    description: "Eliges un conjuro de nivel 5 o menor que te afecte a ti y describes una condici\xF3n desencadenante. Cuando la circunstancia ocurre, el conjuro almacenado se activa instant\xE1neamente sobre ti sin gastar acci\xF3n ni requerir componentes."
  },
  {
    id: "transformacion_tenser",
    name: "Transformaci\xF3n de Tenser",
    level: 6,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V, S, M (pluma de combatiente)",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["mago"],
    description: "Te imbuyes de destreza marcial sobrehumana: obtienes 50 puntos de golpe temporales, ventaja en tiradas de ataque con armas, tus ataques causan 2d12 de da\xF1o de fuerza adicional, ganas competencia en todas las armaduras, escudos y armas marciales, y puedes realizar un ataque adicional al usar la acci\xF3n de Atacar."
  },
  // ==========================================
  // NIVEL 7
  // ==========================================
  {
    id: "teletransporte",
    name: "Teletransporte",
    level: 7,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "3 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "mago"],
    description: "Te teletransportas a ti mismo y hasta a 8 criaturas voluntarias a cualquier destino en el mismo plano de existencia seg\xFAn tu grado de familiaridad con el lugar."
  },
  {
    id: "dedo_de_la_muerte",
    name: "Dedo de la Muerte",
    level: 7,
    school: "Nigromancia",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago", "brujo"],
    description: "Disparas energ\xEDa negativa a una criatura. Salvaci\xF3n de Constituci\xF3n: sufre 7d8 + 30 de da\xF1o necr\xF3tico (mitad con \xE9xito). Si mata a un humanoide, este se alza al inicio de tu siguiente turno como un zombi bajo tu control permanente."
  },
  {
    id: "desplazamiento_entre_planos",
    name: "Desplazamiento Entre Planos",
    level: 7,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S, M (diapas\xF3n afinado de 250 po)",
    duration: "Instant\xE1neo",
    classes: ["clerigo", "druida", "hechicero", "mago", "brujo"],
    description: "Transportas a ti y hasta 8 criaturas voluntarias a otro plano de existencia, o realizas un ataque de conjuro cuerpo a cuerpo para desterrar a una criatura enemiga a otro plano si falla salvaci\xF3n de Carisma."
  },
  {
    id: "tormenta_de_fuego",
    name: "Tormenta de Fuego",
    level: 7,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "45 metros (hasta diez cubos de 3 m)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["clerigo", "druida", "hechicero"],
    description: "Una tormenta de fuego ruge en el \xE1rea elegida formada por hasta 10 cubos contiguos de 3 metros. Criaturas en el \xE1rea sufren 7d10 de da\xF1o por fuego si fallan salvaci\xF3n de Destreza (mitad con \xE9xito)."
  },
  {
    id: "jaula_de_fuerza",
    name: "Jaula de Fuerza",
    level: 7,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "30 metros",
    components: "V, S, M (polvo de rub\xED de 1000 po)",
    duration: "1 hora",
    classes: ["bardo", "mago", "brujo"],
    description: "Creas una prisi\xF3n m\xE1gica c\xFAbica invisible e indestructible de fuerza (jaula de barrotes de 6 m o caja s\xF3lida de 3 m). Quien est\xE9 dentro no puede escapar f\xEDsicamente y la teletransportaci\xF3n requiere salvaci\xF3n de Carisma."
  },
  {
    id: "corona_de_estrellas",
    name: "Corona de Estrellas",
    level: 7,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V, S",
    duration: "1 hora",
    classes: ["hechicero", "mago", "brujo"],
    description: "Siete motas estelares brillantes orbitan tu cabeza iluminando 9 metros. Como acci\xF3n adicional, puedes disparar una mota a 36 metros infligiendo 4d12 de da\xF1o radiante con ataque de conjuro."
  },
  {
    id: "regenerar",
    name: "Regenerar",
    level: 7,
    school: "Transmutaci\xF3n",
    castingTime: "1 minuto",
    range: "Toque",
    components: "V, S, M",
    duration: "1 hora",
    classes: ["bardo", "clerigo", "druida"],
    description: "Tocas a una criatura: recupera 4d8 + 15 puntos de golpe y 1 PG al inicio de cada uno de sus turnos durante 1 hora. Adem\xE1s, regenera miembros amputados en 2 minutos."
  },
  {
    id: "resurreccion",
    name: "Resurrecci\xF3n",
    level: 7,
    school: "Nigromancia",
    castingTime: "1 hora",
    range: "Toque",
    components: "V, S, M (diamante de 1000 po)",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo"],
    description: "Devuelves a la vida a una criatura que lleve muerta no m\xE1s de un siglo y que no haya muerto por vejez, cerrando todas las heridas mortales y restaurando partes del cuerpo perdidas."
  },
  // ==========================================
  // NIVEL 8
  // ==========================================
  {
    id: "aura_sagrada",
    name: "Aura Sagrada",
    level: 8,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (radio de 9 metros)",
    components: "V, S, M (relicario de 1000 po)",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo"],
    description: "Una luz divina te envuelve a ti y a tus aliados a 9 metros: ten\xE9is ventaja en todas las salvaciones y los atacantes tienen desventaja en ataques contra vosotros. Si un infernal o no-muerto os golpea, queda Cegado si falla salvaci\xF3n de CON."
  },
  {
    id: "laberinto",
    name: "Laberinto",
    level: 8,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 10 min",
    concentration: true,
    classes: ["mago"],
    description: "Destierras a una criatura a un semiplano laber\xEDntico extradimensional de forma autom\xE1tica (sin tirada de salvaci\xF3n inicial). Para escapar, la criatura debe superar una prueba de Inteligencia CD 20 en su turno."
  },
  {
    id: "terremoto",
    name: "Terremoto",
    level: 8,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "150 metros (radio de 30 metros)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo", "druida", "hechicero"],
    description: "Creas una convulsi\xF3n s\xEDsmica en un c\xEDrculo de 30 metros. El suelo se vuelve terreno dif\xEDcil, las estructuras sufren 50 de da\xF1o contundente por asalto, y se abren fisuras de hasta 9 metros de profundidad."
  },
  {
    id: "estallido_solar",
    name: "Estallido Solar",
    level: 8,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "45 metros (esfera de 18 metros)",
    components: "V, S, M",
    duration: "Instant\xE1neo",
    classes: ["druida", "hechicero", "mago", "clerigo"],
    description: "Una detonaci\xF3n deslumbrante de luz solar brillante en una esfera de 18 metros. Criaturas en el \xE1rea sufren 12d6 de da\xF1o radiante y quedan Cegadas durante 1 minuto si fallan salvaci\xF3n de Constituci\xF3n."
  },
  {
    id: "dominar_monstruo",
    name: "Dominar Monstruo",
    level: 8,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Tomas el control telep\xE1tico absoluto de cualquier criatura (monstruo o humanoide) que falle una tirada de salvaci\xF3n de Sabidur\xEDa."
  },
  {
    id: "mente_en_blanco",
    name: "Mente en Blanco",
    level: 8,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "24 horas",
    classes: ["bardo", "mago"],
    description: "Tocas a una criatura voluntaria: se vuelve totalmente inmune al da\xF1o ps\xEDquico, a cualquier intento de leer sus pensamientos, a conjuros de adivinaci\xF3n y a la condici\xF3n de Hechizado."
  },
  {
    id: "campo_antimagia",
    name: "Campo Antimagia",
    level: 8,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal (esfera de 3 metros)",
    components: "V, S, M",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["clerigo", "mago"],
    description: "Una esfera invisible de 3 metros te rodea en la cual ning\xFAn conjuro puede ser lanzado, los efectos m\xE1gicos quedan suprimidos y los objetos m\xE1gicos funcionan como mundanos mientras permanezcan dentro."
  },
  {
    id: "tsunami",
    name: "Tsunami",
    level: 8,
    school: "Conjuraci\xF3n",
    castingTime: "1 minuto",
    range: "Recorrido visible (muro de 90 m de largo x 90 m de alto x 15 m de grosor)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 6 asaltos",
    concentration: true,
    classes: ["druida"],
    description: "Conjuras un muro colosal de agua que avanza arrollando todo a su paso. Criaturas atrapadas sufren 6d10 de da\xF1o contundente (salvaci\xF3n de FUE) y son arrastradas con la ola."
  },
  {
    id: "palabra_de_poder_aturdir",
    name: "Palabra de Poder: Aturdir",
    level: 8,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "brujo", "mago"],
    description: "Pronuncias una palabra de abrumador poder arcano dirigida a una criatura visible a 18 metros. Si tiene 150 puntos de golpe o menos, queda Aturdida de inmediato sin tirada de salvaci\xF3n inicial (puede realizar salvaci\xF3n de CON al final de cada turno para recuperarse)."
  },
  // ==========================================
  // NIVEL 9
  // ==========================================
  {
    id: "deseo",
    name: "Deseo",
    level: 9,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "El conjuro supremo de la magia mortal. Puede duplicar el efecto de cualquier otro conjuro de nivel 8 o menor sin requerir componentes ni tiempo de lanzamiento, o alterar la realidad seg\xFAn la petici\xF3n del lanzador."
  },
  {
    id: "palabra_de_poder_matar",
    name: "Palabra de Poder: Matar",
    level: 9,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "mago", "brujo"],
    description: "Pronuncias una palabra de autoridad mortal que resuena en el alma de una criatura visible a 18 metros. Si tiene 100 puntos de golpe o menos, muere en el acto sin tirada de salvaci\xF3n."
  },
  {
    id: "palabra_de_poder_sanar",
    name: "Palabra de Poder: Sanar",
    level: 9,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Toque",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "clerigo"],
    description: "Una oleada infinita de vitalidad curativa inunda a una criatura que toques: recupera todos sus puntos de golpe m\xE1ximos de golpe y termina cualquier condici\xF3n de Hechizado, Asustado, Paralizado o Aturdido."
  },
  {
    id: "lluvia_de_meteoros",
    name: "Lluvia de Meteoros",
    level: 9,
    school: "Evocaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "1,5 kil\xF3metros (cuatro esferas de 12 m)",
    components: "V, S",
    duration: "Instant\xE1neo",
    classes: ["hechicero", "mago"],
    description: "Haces llover cuatro esferas de fuego y roca ardiente de 12 metros de radio en cuatro puntos elegidos. Todas las criaturas en cada \xE1rea sufren 20d6 de da\xF1o por fuego y 20d6 de da\xF1o contundente (salvaci\xF3n de DES para mitad)."
  },
  {
    id: "detener_el_tiempo",
    name: "Detener el Tiempo",
    level: 9,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Personal",
    components: "V",
    duration: "Instant\xE1neo (1d4 + 1 asaltos en tu tiempo)",
    classes: ["hechicero", "mago"],
    description: "Detienes el flujo del tiempo para todos salvo para ti. Dispones de 1d4 + 1 turnos consecutivos de forma inmediata para moverte, prepararte y lanzar conjuros antes de que el tiempo se reanude."
  },
  {
    id: "metamorfosis_verdadera",
    name: "Metamorfosis Verdadera",
    level: 9,
    school: "Transmutaci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "9 metros",
    components: "V, S, M (gota de mercurio)",
    duration: "Concentraci\xF3n, hasta 1 hora",
    concentration: true,
    classes: ["bardo", "brujo", "mago"],
    description: "Transformas una criatura en otra criatura o en un objeto, o un objeto en una criatura (salvaci\xF3n de SAB si no es voluntaria). Si mantienes la concentraci\xF3n durante toda la hora, la transformaci\xF3n se vuelve permanente."
  },
  {
    id: "portal",
    name: "Portal",
    level: 9,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S, M (diamante de 5000 po)",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["clerigo", "hechicero", "mago"],
    description: "Abres un portal circular interdimensional de 6 metros a un plano de existencia espec\xEDfico o invocas el nombre de un ser legendario para arrastrarlo a trav\xE9s del portal hasta tu presencia."
  },
  {
    id: "verdadera_resurreccion",
    name: "Verdadera Resurrecci\xF3n",
    level: 9,
    school: "Nigromancia",
    castingTime: "1 hora",
    range: "Toque",
    components: "V, S, M (diamantes de 25000 po)",
    duration: "Instant\xE1neo",
    classes: ["clerigo", "druida"],
    description: "Tocas a una criatura que lleve muerta no m\xE1s de 200 a\xF1os (incluso si su cuerpo fue completamente destruido). Vuelve a la vida con todos sus puntos de golpe, sin enfermedades ni maldiciones."
  },
  {
    id: "prevision",
    name: "Previsi\xF3n",
    level: 9,
    school: "Adivinaci\xF3n",
    castingTime: "1 minuto",
    range: "Toque",
    components: "V, S, M",
    duration: "8 horas",
    classes: ["bardo", "druida", "brujo", "mago"],
    description: "Tocas a una criatura voluntaria y le otorgas la capacidad de ver el futuro inmediato: no puede ser sorprendida y tiene ventaja en todas las tiradas de ataque, pruebas de caracter\xEDstica y salvaciones, y los atacantes tienen desventaja contra ella durante 8 horas."
  },
  {
    id: "muro_prismatico",
    name: "Muro Prism\xE1tico",
    level: 9,
    school: "Abjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "18 metros",
    components: "V, S",
    duration: "10 minutos",
    classes: ["mago"],
    description: "Creas un plano resplandeciente o esfera de 9 metros de 7 capas de colores prism\xE1ticos. Cada capa inflige 10d6 de un tipo de da\xF1o elemental o impone estados como Cegado, Petrificado o Desterrado al intentar cruzarla."
  },
  {
    id: "cuchilla_mental",
    name: "Grito Ps\xEDquico",
    level: 9,
    school: "Encantamiento",
    castingTime: "1 acci\xF3n",
    range: "27 metros",
    components: "S",
    duration: "Instant\xE1neo",
    classes: ["bardo", "hechicero", "brujo", "mago"],
    description: "Desatas una explosi\xF3n de energ\xEDa ps\xEDquica en la mente de hasta 10 criaturas elegidas. Cada una sufre 14d6 de da\xF1o ps\xEDquico y queda Aturdida si falla una salvaci\xF3n de Inteligencia."
  },
  {
    id: "tormenta_de_venganza",
    name: "Tormenta de Venganza",
    level: 9,
    school: "Conjuraci\xF3n",
    castingTime: "1 acci\xF3n",
    range: "Vista (nube de 100 metros de radio)",
    components: "V, S",
    duration: "Concentraci\xF3n, hasta 1 min",
    concentration: true,
    classes: ["druida"],
    description: "Creas una nube tormentosa catacl\xEDsmica que desata trueno y lluvia \xE1cida (1d10 trueno + 1d10 \xE1cido), rayos (5d6 de rel\xE1mpago a 6 objetivos), granizo masivo (2d6 contundente + 2d6 fr\xEDo) y lluvia g\xE9lida."
  }
];
const DND55_TCE_XGE_ITEMS = (() => {
  const list = [];
  const mk = (id, name, src, rarity, attune, weight, desc, extra = {}) => {
    list.push({
      id: `magic_${id}`,
      name: `${name} (${src})`,
      quantity: 1,
      weight,
      category: extra.category || "maravilloso",
      requiresAttunement: attune,
      isAttuned: false,
      isEquipped: false,
      rarity,
      description: `${rarity}${attune ? " (requiere sintonización)" : ""}. ${desc}`,
      ...extra.rest
    });
  };
  const focusBonus = (n) => ({
    magicBonus: n,
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: n, description: `+${n} Ataque de Conjuro` },
      { target: "spellDc", mode: "bonus", value: n, description: `+${n} CD de Conjuros` }
    ]
  });
  const tiers = [[1, "Poco común"], [2, "Raro"], [3, "Muy raro"]];

  // ===== EL CALDERO DE TASHA PARA TODO: objetos con bonificador +1/+2/+3 =====
  tiers.forEach(([n, rar]) => {
    mk(`herramienta_multiusos_${n}`, `Herramienta Multiusos +${n}`, "Tasha", rar, true, 1,
      `Herramienta de artífice que funciona como foco arcano y puede adoptar la forma de cualquier juego de herramientas de artesano. Otorga +${n} a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de artífice.`, { rest: focusBonus(n) });
    mk(`amuleto_devoto_${n}`, `Amuleto del Devoto +${n}`, "Tasha", rar, true, 0.5,
      `Foco sagrado para clérigos y paladines. Otorga +${n} a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de clérigo o paladín.`, { rest: focusBonus(n) });
    mk(`grimorio_arcano_${n}`, `Grimorio Arcano +${n}`, "Tasha", rar, true, 1.5,
      `Libro de conjuros de mago que funciona como foco arcano. Otorga +${n} a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de mago.`, { rest: focusBonus(n) });
    mk(`vial_sangre_${n}`, `Vial de Sangre +${n}`, "Tasha", rar, true, 0.2,
      `Foco arcano para hechiceros. Otorga +${n} a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de hechicero.`, { rest: focusBonus(n) });
    mk(`tambor_ritmo_${n}`, `Tambor del Ritmo +${n}`, "Tasha", rar, true, 1.5,
      `Instrumento musical que sirve de foco para bardos. Otorga +${n} a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de bardo.`, { rest: focusBonus(n) });
  });

  // ===== EL CALDERO DE TASHA PARA TODO: otros =====
  mk("tatuaje_absorbente", "Tatuaje Absorbente", "Tasha", "Muy raro", true, 0,
    "Tatuaje mágico asociado a un tipo de daño (ácido, frío, fuego, fuerza, relámpago, necrótico, veneno, psíquico, radiante o trueno), elegido al crearlo. Otorga resistencia a ese tipo de daño.");
  mk("tatuaje_garras_sobrenaturales", "Tatuaje de Garras Sobrenaturales", "Tasha", "Poco común", true, 0,
    "Tatuaje mágico que confiere un bonificador de +1 a las tiradas de ataque y daño de tus ataques desarmados, y tus golpes cuentan como ataques mágicos. Como acción adicional, puedes empoderar tus golpes durante 1 minuto: tus ataques alcanzan hasta 9 metros e infligen 1d6 de daño por fuerza adicional (1 vez al día al amanecer).", {
      rest: {
        statModifiers: [
          { target: "unarmedAttack", mode: "bonus", value: 1, description: "+1 Ataque Desarmado (Tatuaje)" },
          { target: "unarmedDamage", mode: "bonus", value: 1, description: "+1 Daño Desarmado (Tatuaje)" }
        ]
      }
    });
  mk("tatuaje_barrera_poco_comun", "Tatuaje de Barrera (Poco Común)", "Tasha", "Poco común", true, 0,
    "Mientras no lleves armadura, este tatuaje te otorga una CA de 12 + tu modificador de Destreza. Puedes usar escudo y seguir beneficiándote.");
  mk("tatuaje_barrera_raro", "Tatuaje de Barrera (Raro)", "Tasha", "Raro", true, 0,
    "Mientras no lleves armadura, este tatuaje te otorga una CA de 15 + tu modificador de Destreza (máximo +2). Puedes usar escudo y seguir beneficiándote.");
  mk("tatuaje_barrera_muy_raro", "Tatuaje de Barrera (Muy Raro)", "Tasha", "Muy raro", true, 0,
    "Mientras no lleves armadura, este tatuaje te otorga una CA de 18 fija. Puedes usar escudo y seguir beneficiándote.");
  mk("tatuaje_espiral", "Tatuaje de Zarcillos de Tinta", "Tasha", "Poco común", true, 0,
    "Como acción, puedes hacer brotar zarcillos oscuros contra una criatura a 4,5 m: debe superar una salvación de Fuerza CD 14 o sufrir 3d6 de daño de fuerza y quedar apresada.");
  mk("tatuaje_paso_fantasmal", "Tatuaje de Paso Fantasmal", "Tasha", "Muy raro", true, 0,
    "Tiene 3 cargas (se recuperan al amanecer). Como acción adicional, gastas 1 carga para volverte incorpóreo hasta el final de tu siguiente turno: atraviesas objetos y criaturas, y tienes resistencia a daño contundente, perforante y cortante de ataques no mágicos.");
  mk("manto_naturaleza", "Manto de la Naturaleza", "Tasha", "Poco común", true, 0.5,
    "Manto que sirve de foco de lanzamiento de conjuros para druidas y exploradores. Puedes esconderte como acción adicional incluso estando observado, si te encuentras en un área de luz tenue o follaje.");
  mk("incensario_devoto", "Incensario del Devoto", "Tasha", "Raro", true, 2,
    "Mayal sagrado para clérigos o paladines. Otorga +1 a las tiradas de ataque y daño, e inflige 1d8 de daño radiante adicional al impactar. Como acción adicional, libera humo aromático curativo que sana 1d4 PG a ti y a tus aliados a 9 m durante 1 minuto.", {
      category: "arma",
      rest: {
        magicBonus: 1,
        weaponDamage: "1d8",
        damageType: "Contundente",
        weaponAbility: "str",
        properties: ["Mágica"],
        weaponMastery: "debilitar"
      }
    });
  mk("caldero_renacer", "Caldero del Renacer", "Tasha", "Muy raro", true, 15,
    "Caldero de hierro para druidas. Sirve como foco druídico, permite crear una Poción de Clarividencia tras un descanso largo, y colocar dentro el cadáver de un humanoide con 10 lb de sal para devolverlo a la vida como si se usara Revivir (1 vez cada 10 días).");
  mk("esquirla_astral", "Esquirla Astral", "Tasha", "Raro", true, 0.2,
    "Foco arcano para hechiceros. Al usar una opción de Metamagia en un conjuro, puedes teletransportarte inmediatamente hasta 9 metros a un espacio desocupado que puedas ver.");
  mk("esquirla_hadas", "Esquirla de las Hadas", "Tasha", "Raro", true, 0.2,
    "Foco arcano para hechiceros. Al usar Metamagia en un conjuro, puedes elegir desencadenar una tirada en la tabla de Oleada de Magia Salvaje.");
  mk("esquirla_paramo_sombrio", "Esquirla del Páramo Sombrío", "Tasha", "Raro", true, 0.2,
    "Foco arcano para hechiceros. Al usar Metamagia en un conjuro, puedes maldecir a una criatura a 9 m imponiendo desventaja en las pruebas de una característica durante 1 minuto.");
  mk("esquirla_reino_lejano", "Esquirla del Reino Lejano", "Tasha", "Raro", true, 0.2,
    "Foco arcano para hechiceros. Al usar Metamagia en un conjuro, azotas a una criatura a 9 m: salvación de Carisma contra tu CD de conjuros o sufre 3d8 daño psíquico y queda asustada.");
  mk("demonomicon_iggwilv", "Demonomicón de Iggwilv", "Tasha", "Artefacto", true, 3,
    "Tomo legendario de conjuración abisal. Contiene todos los conjuros de invocación y confinamiento planar, otorga resistencia a daño necrótico y frío, y permite atrapar demonios dentro de sus páginas.");

  // ===== GUÍA DE XANATHAR PARA TODO: objetos comunes =====
  const X = (id, name, weight, desc, attune = false, extra = {}) => mk(id, name, "Xanathar", "Común", attune, weight, desc, extra);
  X("armadura_reluciente", "Armadura Reluciente", 0, "Armadura media o pesada que siempre está limpia y reluciente; no se ensucia ni se mancha.");
  X("cuenta_alimento", "Cuenta de Alimento", 0, "Al comerla te sustenta como un día de comida. Objeto de un solo uso.", false, { category: "consumible" });
  X("cuenta_refresco", "Cuenta de Refresco", 0, "Al disolverla en un recipiente vacío lo llena de agua potable fresca (unos 4 litros). Objeto de un solo uso.", false, { category: "consumible" });
  X("botas_huellas_falsas", "Botas de Huellas Falsas", 0.5, "Mientras las llevas puestas, puedes hacer que dejen huellas de otro tipo de criatura Pequeña o Mediana a tu elección.");
  X("vela_profundidades", "Vela de las Profundidades", 0.2, "Vela que arde incluso bajo el agua sin apagarse y no se consume mientras está sumergida.");
  X("armadura_desechable", "Armadura Desechable", 0, "Armadura que puedes quitarte como acción en lugar del tiempo habitual.");
  X("dado_charlatan", "Dado del Charlatán", 0, "Dado de seis caras trucado: siempre sale el número que desea su portador.");
  X("capa_ondulante", "Capa Ondulante", 0.5, "Como acción adicional puedes hacer que la capa ondee dramáticamente movida por un viento imaginario.");
  X("capa_mil_estilos", "Capa de Mil Estilos", 0.5, "Mientras la llevas puesta, puedes usar una acción para cambiar el estilo, color y aspecto de la capa.");
  X("amuleto_relojeria", "Amuleto de Relojería", 0.5, "Una vez al amanecer, al hacer una tirada de ataque puedes tratar el resultado del d20 como un 10 en lugar de tirar.");
  X("ropa_remendadora", "Ropa Remendadora", 0.5, "Prenda que se repara sola: los rasgones y agujeros se cierran en poco tiempo.");
  X("yelmo_pavoroso", "Yelmo Pavoroso", 1, "Casco con aspecto amenazador; tus ojos adquieren un brillo rojizo mientras lo llevas puesto.");
  X("libro_conjuros_duradero", "Libro de Conjuros Duradero", 1.5, "Libro de conjuros que no puede dañarse por agua, fuego ni el paso del tiempo.");
  X("sombrero_alimanas", "Sombrero de Alimañas", 0.5, "Sombrero con pequeñas cargas que permite invocar una criatura inofensiva (rata, rana o murciélago).", true);
  X("bolsa_especias_heward", "Bolsa de Especias de Heward", 0.2, "Bolsa de la que puedes sacar pizcas de cualquier condimento no mágico.");
  X("cuerno_alarma_silenciosa", "Cuerno de Alarma Silenciosa", 0.5, "Su sonido solo lo oyen las criaturas que tú elijas dentro del alcance; sirve como alarma discreta.");
  X("instrumento_ilusiones", "Instrumento de Ilusiones", 1, "Mientras lo tocas, puedes crear ilusiones visuales inofensivas.", true);
  X("instrumento_escritura", "Instrumento de Escritura", 1, "Mientras lo tocas, puedes escribir en el aire lo que tú decidas, de forma visible.", true);
  X("espada_tocada_luna", "Espada Tocada por la Luna", 1.5, "Espada que emite luz brillante en un radio de 4,5 metros y luz tenue otros 4,5 metros adicionales cuando se desenvaina.", false, {
    category: "arma",
    rest: { weaponDamage: "1d8", damageType: "Cortante", weaponAbility: "str", properties: ["Versátil (1d10)"], weaponMastery: "debilitar" }
  });
  X("llave_misteriosa", "Llave Misteriosa", 0, "Llave con la que puedes intentar abrir una cerradura; si lo consigue, la llave se desvanece.");
  X("orbe_direccion", "Orbe de Dirección", 0.5, "Como acción, el orbe te indica en qué dirección está el norte.");
  X("orbe_tiempo", "Orbe del Tiempo", 0.5, "Como acción, el orbe te indica si es mañana, tarde, noche o madrugada.");
  X("perfume_hechizante", "Perfume de Hechizar", 0, "Aplicado sobre ti, otorga ventaja en pruebas de Carisma (Persuasión y Engaño) contra una criatura durante una hora. Un solo uso.", false, { category: "consumible" });
  X("pipa_monstruos_humo", "Pipa de Monstruos de Humo", 0.1, "Mientras la fumas, puedes formar anillos de humo con forma de criaturas pequeñas e inofensivas.");
  X("vara_pesca", "Vara de Pesca", 2, "Vara de 3 metros que puede transformarse en caña de pescar con sedal y anzuelo.");
  X("vara_plegable", "Vara Plegable", 3, "Vara de 3 metros que se pliega hasta convertirse en un pequeño cilindro y viceversa.");
  X("maceta_despertar", "Maceta del Despertar", 5, "Si plantas una semilla y la riegas durante 30 días, se despertará una planta pequeña, sensible y amistosa.");
  X("cuerda_remendadora", "Cuerda Reparadora", 5, "Cuerda de 15 metros cuyos extremos cortados pueden volver a unirse.");
  X("rubi_mago_guerra", "Rubí del Mago de Guerra", 0.1, "Rubí que puede incrustarse en un arma de empuñadura para convertirla en foco de conjuración.", true);
  X("escudo_expresion", "Escudo de Expresión", 3, "Escudo en cuya cara aparecen expresiones faciales que reflejan el estado de ánimo de su portador.");
  X("armadura_humeante", "Armadura Humeante", 0, "Armadura que emite una inofensiva voluta de humo desde sus juntas.");
  X("baston_adorno", "Bastón de Adorno", 2, "Bastón con un pequeño orbe en la punta que sostiene un objeto ligero en suspensión.");
  X("baston_trinos", "Bastón de Trinos", 2, "Bastón que, como acción, emite trinos y cantos de aves hasta a 18 metros.", false, { category: "baston", rest: { weaponDamage: "1d6", damageType: "Contundente", weaponAbility: "str", properties: ["Versátil (1d8)"], weaponMastery: "derribar" } });
  X("baston_flores", "Bastón de Flores", 2, "Bastón que, como acción, hace brotar flores en su extremo (hasta 3 cargas diarias).", false, { category: "baston", rest: { weaponDamage: "1d6", damageType: "Contundente", weaponAbility: "str", properties: ["Versátil (1d8)"], weaponMastery: "derribar" } });
  X("muneco_parlante", "Muñeco Parlante", 0.5, "Juguete que pronuncia frases grabadas cuando se le aprieta.");
  X("jarra_sobriedad", "Jarra de la Sobriedad", 1, "Elimina el alcohol y el veneno de cualquier líquido que se vierta en ella.");
  X("flecha_irrompible", "Flecha Irrompible", 0.05, "Munición que no puede romperse.");
  X("varita_pirotecnia", "Varita de Pirotecnia", 0.5, "Varita que, como acción, lanza una explosión de colores y fuegos artificiales inofensivos.", false, { category: "varita" });
  X("varita_ceño", "Varita de Ceños", 0.5, "Varita que obliga a un objetivo a fruncir el ceño.", false, { category: "varita" });
  X("varita_sonrisas", "Varita de Sonrisas", 0.5, "Varita que obliga a un objetivo a sonreír ampliamente.", false, { category: "varita" });

  return list;
})();
const DND55_PRESET_ITEMS = [
  // ==========================================
  // ARMAS (WEAPONS - SIMPLES Y MARCIALES)
  // ==========================================
  // Simples Cuerpo a Cuerpo
  { id: "item_daga", name: "Daga", quantity: 1, weight: 0.5, category: "arma", weaponType: "daga", description: "Da\xF1o: 1d4 Perforante | Propiedades: Sutil, Ligera, Arrojadiza (6/18 m) | Maestr\xEDa: Mellar" },
  { id: "item_garrote", name: "Garrote", quantity: 1, weight: 1, category: "arma", weaponType: "garrote", description: "Da\xF1o: 1d4 Contundente | Propiedades: Ligera | Maestr\xEDa: Ralentizar" },
  { id: "item_gran_garrote", name: "Gran Garrote", quantity: 1, weight: 5, category: "arma", weaponType: "gran_garrote", description: "Da\xF1o: 1d8 Contundente | Propiedades: Dos Manos | Maestr\xEDa: Empujar" },
  { id: "item_hacha_mano", name: "Hacha de Mano", quantity: 1, weight: 1, category: "arma", weaponType: "hacha_mano", description: "Da\xF1o: 1d6 Cortante | Propiedades: Ligera, Arrojadiza (6/18 m) | Maestr\xEDa: Molestar" },
  { id: "item_jabalina", name: "Jabalina", quantity: 1, weight: 1, category: "arma", weaponType: "jabalina", description: "Da\xF1o: 1d6 Perforante | Propiedades: Arrojadiza (9/36 m) | Maestr\xEDa: Ralentizar" },
  { id: "item_martillo_ligero", name: "Martillo Ligero", quantity: 1, weight: 1, category: "arma", weaponType: "martillo_ligero", description: "Da\xF1o: 1d4 Contundente | Propiedades: Ligera, Arrojadiza (6/18 m) | Maestr\xEDa: Mellar" },
  { id: "item_maza", name: "Maza", quantity: 1, weight: 2, category: "arma", weaponType: "maza", description: "Da\xF1o: 1d6 Contundente | Propiedades: Ninguna | Maestr\xEDa: Debilitar" },
  { id: "item_baston", name: "Bast\xF3n", quantity: 1, weight: 2, category: "arma", weaponType: "baston", description: "Da\xF1o: 1d6/1d8 Contundente | Propiedades: Vers\xE1til | Maestr\xEDa: Derribar" },
  { id: "item_hoz", name: "Hoz", quantity: 1, weight: 1, category: "arma", weaponType: "hoz", description: "Da\xF1o: 1d4 Cortante | Propiedades: Ligera | Maestr\xEDa: Mellar" },
  { id: "item_lanza", name: "Lanza", quantity: 1, weight: 1.5, category: "arma", weaponType: "lanza", description: "Da\xF1o: 1d6/1d8 Perforante | Propiedades: Arrojadiza (6/18 m), Vers\xE1til | Maestr\xEDa: Debilitar" },
  // Simples a Distancia
  { id: "item_ballesta_ligera", name: "Ballesta Ligera", quantity: 1, weight: 2.5, category: "arma", weaponType: "ballesta_ligera", description: "Da\xF1o: 1d8 Perforante | Propiedades: Munici\xF3n (24/96 m), Carga, Dos Manos | Maestr\xEDa: Ralentizar" },
  { id: "item_dardo", name: "Dardo", quantity: 10, weight: 0.25, category: "arma", weaponType: "dardo", description: "Da\xF1o: 1d4 Perforante | Propiedades: Sutil, Arrojadiza (6/18 m) | Maestr\xEDa: Molestar" },
  { id: "item_arco_corto", name: "Arco Corto", quantity: 1, weight: 1, category: "arma", weaponType: "arco_corto", description: "Da\xF1o: 1d6 Perforante | Propiedades: Munici\xF3n (24/96 m), Dos Manos | Maestr\xEDa: Molestar" },
  { id: "item_honda", name: "Honda", quantity: 1, weight: 0.1, category: "arma", weaponType: "honda", description: "Da\xF1o: 1d4 Contundente | Propiedades: Munici\xF3n (9/36 m) | Maestr\xEDa: Ralentizar" },
  // Marciales Cuerpo a Cuerpo
  { id: "item_hacha_batalla", name: "Hacha de Guerra", quantity: 1, weight: 2, category: "arma", weaponType: "hacha_batalla", description: "Da\xF1o: 1d8/1d10 Cortante | Propiedades: Vers\xE1til | Maestr\xEDa: Derribar" },
  { id: "item_mangual", name: "Mangual", quantity: 1, weight: 1, category: "arma", weaponType: "mangual", description: "Da\xF1o: 1d8 Contundente | Propiedades: Ninguna | Maestr\xEDa: Debilitar" },
  { id: "item_guja", name: "Guja", quantity: 1, weight: 3, category: "arma", weaponType: "guja", description: "Da\xF1o: 1d10 Cortante | Propiedades: Pesada, Alcance, Dos Manos | Maestr\xEDa: Rozar" },
  { id: "item_gran_hacha", name: "Gran Hacha", quantity: 1, weight: 3.5, category: "arma", weaponType: "gran_hacha", description: "Da\xF1o: 1d12 Cortante | Propiedades: Pesada, Dos Manos | Maestr\xEDa: Hender" },
  { id: "item_gran_martillo", name: "Gran Martillo", quantity: 1, weight: 5, category: "arma", weaponType: "gran_martillo", description: "Da\xF1o: 2d6 Contundente | Propiedades: Pesada, Dos Manos | Maestr\xEDa: Derribar" },
  { id: "item_espadon", name: "Espad\xF3n", quantity: 1, weight: 3, category: "arma", weaponType: "espadon", description: "Da\xF1o: 2d6 Cortante | Propiedades: Pesada, Dos Manos | Maestr\xEDa: Rozar" },
  { id: "item_alabarda", name: "Alabarda", quantity: 1, weight: 3, category: "arma", weaponType: "alabarda", description: "Da\xF1o: 1d10 Cortante | Propiedades: Pesada, Alcance, Dos Manos | Maestr\xEDa: Hender" },
  { id: "item_lanza_caballeria", name: "Lanza de Caballer\xEDa", quantity: 1, weight: 3, category: "arma", weaponType: "lanza_caballeria", description: "Da\xF1o: 1d10 Perforante | Propiedades: Alcance, Pesada, Dos Manos | Maestr\xEDa: Derribar" },
  { id: "item_espada_larga", name: "Espada Larga", quantity: 1, weight: 1.5, category: "arma", weaponType: "espada_larga", description: "Da\xF1o: 1d8/1d10 Cortante | Propiedades: Vers\xE1til | Maestr\xEDa: Debilitar" },
  { id: "item_lucero_alba", name: "Lucero del Alba", quantity: 1, weight: 2, category: "arma", weaponType: "lucero_alba", description: "Da\xF1o: 1d8 Perforante | Propiedades: Ninguna | Maestr\xEDa: Debilitar" },
  { id: "item_pica", name: "Pica", quantity: 1, weight: 9, category: "arma", weaponType: "pica", description: "Da\xF1o: 1d10 Perforante | Propiedades: Pesada, Alcance, Dos Manos | Maestr\xEDa: Empujar" },
  { id: "item_estoque", name: "Estoque", quantity: 1, weight: 1, category: "arma", weaponType: "estoque", description: "Da\xF1o: 1d8 Perforante | Propiedades: Sutil | Maestr\xEDa: Molestar" },
  { id: "item_cimitarra", name: "Cimitarra", quantity: 1, weight: 1.5, category: "arma", weaponType: "cimitarra", description: "Da\xF1o: 1d6 Cortante | Propiedades: Sutil, Ligera | Maestr\xEDa: Mellar" },
  { id: "item_espada_corta", name: "Espada Corta", quantity: 1, weight: 1, category: "arma", weaponType: "espada_corta", description: "Da\xF1o: 1d6 Perforante | Propiedades: Sutil, Ligera | Maestr\xEDa: Molestar" },
  { id: "item_tridente", name: "Tridente", quantity: 1, weight: 2, category: "arma", weaponType: "tridente", description: "Da\xF1o: 1d8/1d10 Perforante | Propiedades: Arrojadiza (6/18 m), Vers\xE1til | Maestr\xEDa: Derribar" },
  { id: "item_martillo_guerra", name: "Martillo de Guerra", quantity: 1, weight: 2.5, category: "arma", weaponType: "martillo_guerra", description: "Da\xF1o: 1d8/1d10 Contundente | Propiedades: Vers\xE1til | Maestr\xEDa: Empujar" },
  { id: "item_pico_guerra", name: "Pico de Guerra", quantity: 1, weight: 1, category: "arma", weaponType: "pico_guerra", description: "Da\xF1o: 1d8/1d10 Perforante | Propiedades: Vers\xE1til | Maestr\xEDa: Debilitar" },
  { id: "item_latigo", name: "L\xE1tigo", quantity: 1, weight: 1.5, category: "arma", weaponType: "latigo", description: "Da\xF1o: 1d4 Cortante | Propiedades: Sutil, Alcance | Maestr\xEDa: Ralentizar" },
  // Marciales a Distancia
  { id: "item_ballesta_mano", name: "Ballesta de Mano", quantity: 1, weight: 1.5, category: "arma", weaponType: "ballesta_mano", description: "Da\xF1o: 1d6 Perforante | Propiedades: Munici\xF3n (9/36 m), Ligera, Carga | Maestr\xEDa: Molestar" },
  { id: "item_ballesta_pesada", name: "Ballesta Pesada", quantity: 1, weight: 9, category: "arma", weaponType: "ballesta_pesada", description: "Da\xF1o: 1d10 Perforante | Propiedades: Munici\xF3n (30/120 m), Pesada, Carga, Dos Manos | Maestr\xEDa: Empujar" },
  { id: "item_arco_largo", name: "Arco Largo", quantity: 1, weight: 1, category: "arma", weaponType: "arco_largo", description: "Da\xF1o: 1d8 Perforante | Propiedades: Munici\xF3n (45/180 m), Pesada, Dos Manos | Maestr\xEDa: Ralentizar" },
  { id: "item_mosquete", name: "Mosquete", quantity: 1, weight: 5, category: "arma", weaponType: "mosquete", description: "Da\xF1o: 1d12 Perforante | Propiedades: Munici\xF3n (12/36 m), Carga, Dos Manos | Maestr\xEDa: Ralentizar" },
  { id: "item_pistola", name: "Pistola", quantity: 1, weight: 1.5, category: "arma", weaponType: "pistola", description: "Da\xF1o: 1d10 Perforante | Propiedades: Munici\xF3n (9/27 m), Carga | Maestr\xEDa: Molestar" },
  // ==========================================
  // ARMADURAS Y ESCUDOS (ARMORS & SHIELDS)
  // ==========================================
  { id: "item_armadura_cuero", name: "Armadura de Cuero", quantity: 1, weight: 5, category: "armadura", armorType: "cuero", description: "Armadura Ligera | CA: 11 + modificador de Destreza" },
  { id: "item_cuero_tachonado", name: "Cuero Tachonado", quantity: 1, weight: 6.5, category: "armadura", armorType: "cuero_tachonado", description: "Armadura Ligera | CA: 12 + modificador de Destreza" },
  { id: "item_armadura_acolchada", name: "Armadura Acolchada", quantity: 1, weight: 4, category: "armadura", armorType: "acolchada", description: "Armadura Ligera | CA: 11 + DES | Desventaja en Sigilo" },
  { id: "item_armadura_pieles", name: "Armadura de Pieles", quantity: 1, weight: 6, category: "armadura", armorType: "pieles", description: "Armadura Media | CA: 12 + DES (m\xE1x +2)" },
  { id: "item_camisote_malla", name: "Camisote de Malla", quantity: 1, weight: 10, category: "armadura", armorType: "camisote_malla", description: "Armadura Media | CA: 13 + DES (m\xE1x +2)" },
  { id: "item_cota_escamas", name: "Cota de Escamas", quantity: 1, weight: 22.5, category: "armadura", armorType: "cota_escamas", description: "Armadura Media | CA: 14 + DES (m\xE1x +2) | Desventaja en Sigilo" },
  { id: "item_coraza", name: "Coraza", quantity: 1, weight: 10, category: "armadura", armorType: "coraza", description: "Armadura Media | CA: 14 + DES (m\xE1x +2)" },
  { id: "item_media_placa", name: "Media Armadura", quantity: 1, weight: 20, category: "armadura", armorType: "media_placa", description: "Armadura Media | CA: 15 + DES (m\xE1x +2) | Desventaja en Sigilo" },
  { id: "item_cota_anillas", name: "Cota de Anillas", quantity: 1, weight: 20, category: "armadura", armorType: "cota_anillas", description: "Armadura Pesada | CA: 14 fija | Desventaja en Sigilo" },
  { id: "item_cota_malla", name: "Cota de Malla", quantity: 1, weight: 27.5, category: "armadura", armorType: "cota_malla", description: "Armadura Pesada | CA: 16 fija | FUE m\xEDnima 13 | Desventaja en Sigilo" },
  { id: "item_armadura_bandas", name: "Armadura de Bandas", quantity: 1, weight: 30, category: "armadura", armorType: "bandas", description: "Armadura Pesada | CA: 17 fija | FUE m\xEDnima 15 | Desventaja en Sigilo" },
  { id: "item_placas_completas", name: "Armadura de Placas", quantity: 1, weight: 32.5, category: "armadura", armorType: "placas_completas", description: "Armadura Pesada | CA: 18 fija | FUE m\xEDnima 15 | Desventaja en Sigilo" },
  { id: "item_escudo", name: "Escudo (+2 CA)", quantity: 1, weight: 3, category: "armadura", armorType: "escudo", description: "Escudo protector de madera o metal | Otorga +2 a la CA mientras se empu\xF1e" },
  // ==========================================
  // EQUIPO DE AVENTURERO (ADVENTURING GEAR)
  // ==========================================
  { id: "item_mochila", name: "Mochila de Aventurero", quantity: 1, weight: 2.5, category: "equipo", description: "Mochila reforzada con compartimentos de cuero para llevar equipo y provisiones." },
  { id: "item_rations", name: "Raciones de Viaje (1 d\xEDa)", quantity: 5, weight: 1, category: "equipo", description: "Alimento seco nutritivo para mantener a un aventurero durante un d\xEDa de viaje." },
  { id: "item_torches", name: "Antorchas", quantity: 3, weight: 0.5, category: "equipo", description: "Arde durante 1 hora proporcionando luz brillante en 6 metros y luz tenue en otros 6 metros." },
  { id: "item_linterna_sorda", name: "Linterna Sorda", quantity: 1, weight: 1, category: "equipo", description: "Proyecta un cono de luz brillante de 18 metros y luz tenue en otros 18 metros. Se puede tapar la rendija como acci\xF3n." },
  { id: "item_rope", name: "Cuerda de C\xE1\xF1amo (15 m)", quantity: 1, weight: 5, category: "equipo", description: "Cuerda resistente para escaladas y atar prisioneros o equipo." },
  { id: "item_cuerda_seda", name: "Cuerda de Seda (15 m)", quantity: 1, weight: 2.5, category: "equipo", description: "Cuerda ligera de seda trenzada con gran resistencia a la tracci\xF3n." },
  { id: "item_bedroll", name: "Saco de Dormir", quantity: 1, weight: 3.5, category: "equipo", description: "Aislamiento esencial para descansar en campamentos a la intemperie." },
  { id: "item_waterskin", name: "Odre de Agua", quantity: 1, weight: 2.5, category: "equipo", description: "Contiene 2 litros de agua fresca para la traves\xEDa." },
  { id: "item_thieves_tools", name: "Herramientas de Ladr\xF3n", quantity: 1, weight: 0.5, category: "equipo", description: "Ganz\xFAas, alicates y lima para forzar cerraduras y desactivar trampas." },
  { id: "item_healers_kit", name: "Botiqu\xEDn de Curandero (10 usos)", quantity: 1, weight: 1.5, category: "equipo", maxCharges: 10, currentCharges: 10, chargeRecovery: "Sin recarga (Consumible)", description: "Permite estabilizar a una criatura agonizante sin prueba de Medicina o aplicar curaci\xF3n con la dote Sanador." },
  { id: "item_caltrops", name: "Abrojos (Bolsa de 20)", quantity: 1, weight: 1, category: "equipo", description: "Se esparcen en un \xE1rea de 1,5 metros para ralentizar y herir a perseguidores." },
  { id: "item_espejo_acero", name: "Espejo Peque\xF1o de Acero", quantity: 1, weight: 0.25, category: "equipo", description: "\xDAtil para mirar esquinas y reflejar rayos de luz en mazmorras." },
  { id: "item_palanca", name: "Palanca de Hierro", quantity: 1, weight: 2.5, category: "equipo", description: "Otorga ventaja en pruebas de Fuerza para abrir puertas o cofres atascados." },
  { id: "item_holy_symbol", name: "S\xEDmbolo Sagrado", quantity: 1, weight: 0.5, category: "equipo", description: "Foco de canalizaci\xF3n divina para cl\xE9rigos y paladines." },
  { id: "item_arcane_focus", name: "Foco Arcano", quantity: 1, weight: 0.5, category: "equipo", description: "Foco canalizador de energ\xEDa m\xE1gica para magos, hechiceros y brujos." },
  { id: "item_druidic_focus", name: "Foco Dru\xEDdico", quantity: 1, weight: 0.25, category: "equipo", description: "Foco de magia primigenia natural para druidas y exploradores." },
  { id: "item_kit_disfraces", name: "Kit de Disfraces", quantity: 1, weight: 1.5, category: "herramientas", description: "Maquillaje, pelucas y accesorios para crear identidades falsas (ventaja en pruebas de Enga\xF1o)." },
  { id: "item_kit_falsificacion", name: "Kit de Falsificaci\xF3n", quantity: 1, weight: 2.5, category: "herramientas", description: "Papel, cera, sellos y plumas para replicar documentos y firmas oficiales." },
  { id: "item_laud", name: "La\xFAd", quantity: 1, weight: 1, category: "herramientas", description: "Instrumento musical de cuerda melodioso; foco de interpretaci\xF3n para bardos." },
  { id: "item_grimorio_blanco", name: "Grimorio de Mago", quantity: 1, weight: 1.5, category: "equipo", description: "Tomo encuadernado en cuero de 100 p\xE1ginas para transcribir conjuros arcanos." },
  { id: "item_oil_flask", name: "Frasco de Aceite (500 ml)", quantity: 1, weight: 0.5, category: "equipo", description: "Combustible para linternas (6 horas de luz) o arrojadizo (6 m) para prender fuego en el suelo causando 5 de da\xF1o de fuego durante 2 turnos." },
  { id: "item_yesquero", name: "Yesquero (Pedernal y Eslab\xF3n)", quantity: 1, weight: 0.5, category: "equipo", description: "Permite encender antorchas, l\xE1mparas y fuegos de campamento." },
  { id: "item_artisan_smith", name: "\xDAtiles de Artesano (Herrero)", quantity: 1, weight: 4, category: "herramientas", description: "Martillos, tenazas, cinceles y carb\xF3n para forjar y reparar armas y armaduras met\xE1licas." },
  { id: "item_artisan_alchemist", name: "\xDAtiles de Artesano (Alquimista)", quantity: 1, weight: 4, category: "herramientas", description: "Alambiques, probetas y mortero para sintetizar \xE1cidos, fuegos de alquimista y reactivos." },
  { id: "item_artisan_carpenter", name: "\xDAtiles de Artesano (Carpintero)", quantity: 1, weight: 3, category: "herramientas", description: "Sierras, gubias y cepillos para trabajar madera y fortificar estructuras." },
  { id: "item_artisan_cook", name: "\xDAtiles de Artesano (Utensilios de Cocinero)", quantity: 1, weight: 4, category: "herramientas", description: "Ollas, sartenes y especias para preparar comidas nutritivas que conceden PG temporales tras un descanso." },
  { id: "item_artisan_leather", name: "\xDAtiles de Artesano (Curtidor)", quantity: 1, weight: 2.5, category: "herramientas", description: "Cuchillas de despellejar y leznas para confeccionar y reparar armaduras de cuero y sillas de montar." },
  { id: "item_artisan_jeweler", name: "\xDAtiles de Artesano (Joyero)", quantity: 1, weight: 1, category: "herramientas", description: "Lupas, pinzas y limas para tallar gemas y engarzar focos m\xE1gicos." },
  { id: "item_artisan_cartographer", name: "\xDAtiles de Artesano (Cart\xF3grafo)", quantity: 1, weight: 3, category: "herramientas", description: "Comp\xE1s, tinta especial, vitela y pergamino para trazar mapas precisos de mazmorras y regiones." },
  { id: "item_herbalism_kit", name: "Kit de Herbolario / Boticario", quantity: 1, weight: 1.5, category: "herramientas", description: "Bolsas de recolecci\xF3n y tijeras para identificar plantas curativas y elaborar Pociones de Curaci\xF3n y antitoxinas." },
  { id: "item_poisoner_kit", name: "Kit de Envenenador", quantity: 1, weight: 1, category: "herramientas", description: "Frascos de cristal y pipetas para extraer y procesar toxinas y venenos letales." },
  { id: "item_grappling_hook", name: "Gancho de Escalada", quantity: 1, weight: 2, category: "equipo", description: "Gancho de tres puntas de hierro para amarrar a cuerdas y escalar muros o precipicios." },
  { id: "item_pitons", name: "Pitones de Escalada (x10)", quantity: 10, weight: 1.25, category: "equipo", description: "Clavos metálicos con anilla para fijar líneas de ascenso seguras en paredes de roca." },
  // Paquetes de Equipo Inicial (Class Starting Equipment Packs)
  {
    id: "item_paquete_explorador_mazmorras",
    name: "Paquete de Explorador de Mazmorras",
    aliases: ["Paquete de explorador de mazmorras", "Dungeoneer's Pack", "Pack de explorador de mazmorras"],
    quantity: 1,
    weight: 27,
    category: "equipo",
    description: "Incluye una mochila, una palanca de hierro, un martillo, 10 clavos de hierro, 10 antorchas, yesca y pedernal, 10 raciones de viaje, una cantimplora y 15 metros de cuerda de cáñamo atada a un lado."
  },
  {
    id: "item_paquete_explorador",
    name: "Paquete de Explorador",
    aliases: ["Paquete de explorador", "Explorer's Pack", "Pack de explorador"],
    quantity: 1,
    weight: 27,
    category: "equipo",
    description: "Incluye una mochila, un saco de dormir, un juego de cocina, yesca y pedernal, 10 antorchas, 10 raciones de viaje, una cantimplora y 15 metros de cuerda de cáñamo atada a un lado."
  },
  {
    id: "item_paquete_sacerdote",
    name: "Paquete de Sacerdote",
    aliases: ["Paquete de sacerdote", "Priest's Pack", "Pack de sacerdote"],
    quantity: 1,
    weight: 11,
    category: "equipo",
    description: "Incluye una mochila, una manta, 10 velas, yesca y pedernal, una caja de limosnas, 2 bloques de incienso, un incensario, vestiduras sacerdotales, 2 raciones de viaje y una cantimplora."
  },
  {
    id: "item_paquete_erudito",
    name: "Paquete de Erudito",
    aliases: ["Paquete de erudito", "Scholar's Pack", "Pack de erudito"],
    quantity: 1,
    weight: 5,
    category: "equipo",
    description: "Incluye una mochila, un libro de estudio, un frasco de tinta, una pluma de escribir, 10 hojas de pergamino, un saquito de arena y una navaja pequeña."
  },
  {
    id: "item_paquete_ladron",
    name: "Paquete de Ladrón",
    aliases: ["Paquete de ladrón", "Paquete de ladron", "Burglar's Pack", "Pack de ladrón"],
    quantity: 1,
    weight: 21,
    category: "equipo",
    description: "Incluye una mochila, 1000 canicas de metal, 3 metros de cuerda con campana, yesca y pedernal, linterna con capucha, 2 frascos de aceite, 5 raciones de viaje, palanca, martillo, 10 clavos y cantimplora."
  },
  {
    id: "item_paquete_artista",
    name: "Paquete de Artista",
    aliases: ["Paquete de artista", "Entertainer's Pack", "Pack de artista", "Paquete de animador"],
    quantity: 1,
    weight: 17,
    category: "equipo",
    description: "Incluye una mochila, un saco de dormir, 2 disfraces teatrales, 5 velas, 5 raciones de viaje, una cantimplora y útiles de maquillaje."
  },
  {
    id: "item_paquete_diplomatico",
    name: "Paquete de Diplomático",
    aliases: ["Paquete de diplomático", "Diplomat's Pack", "Pack de diplomático"],
    quantity: 1,
    weight: 16,
    category: "equipo",
    description: "Incluye un cofre, 2 estuches de mapas/pergaminos, vestimentas elegantes de gala, un frasco de tinta, una pluma, una lámpara, 2 frascos de aceite, 5 hojas de papel, frasco de perfume, lacre y jabón."
  },
  {
    id: "item_libro_conjuros",
    name: "Libro de Conjuros",
    aliases: ["Libro de conjuros", "Spellbook", "Grimorio de conjuros"],
    quantity: 1,
    weight: 1.5,
    category: "equipo",
    description: "Tomo encuadernado en cuero con 100 páginas de pergamino adecuado para transcribir e investigar conjuros arcanos."
  },
  {
    id: "item_carcaj_flechas_20",
    name: "Carcaj con 20 Flechas",
    aliases: ["Carcaj con 20 flechas", "20 flechas", "Flechas (20)", "Carcaj de flechas"],
    quantity: 1,
    weight: 1,
    category: "municion",
    description: "Carcaj rígido de cuero que contiene 20 flechas de madera con punta de acero templado para arcos."
  },
  {
    id: "item_virotes_20",
    name: "Estuche con 20 Virotes",
    aliases: ["Estuche con 20 virotes", "20 virotes", "Virotes (20)", "Estuche de virotes"],
    quantity: 1,
    weight: 0.7,
    category: "municion",
    description: "Estuche cilíndrico de cuero que contiene 20 virotes metálicos para ballesta ligera o pesada."
  },
  {
    id: "item_tunica",
    name: "Túnica de Erudito",
    aliases: ["Túnica", "Tunica", "Ropaje de mago"],
    quantity: 1,
    weight: 1.8,
    category: "equipo",
    description: "Ropaje amplio de tela resistente con bolsillos ocultos para componentes mágicos y pergaminos."
  },
  {
    id: "item_instrumento_flauta",
    name: "Instrumento Musical (Flauta)",
    aliases: ["Flauta", "Flute"],
    quantity: 1,
    weight: 0.5,
    category: "herramientas",
    description: "Instrumento musical de viento de madera tallada; foco de interpretación para bardos."
  },
  {
    id: "item_instrumento_lira",
    name: "Instrumento Musical (Lira)",
    aliases: ["Lira", "Lyre"],
    quantity: 1,
    weight: 1,
    category: "herramientas",
    description: "Instrumento musical de cuerda antiguo con arco resonante; foco de interpretación para bardos."
  },
  {
    id: "item_instrumento_tambor",
    name: "Instrumento Musical (Tambor)",
    aliases: ["Tambor", "Drum"],
    quantity: 1,
    weight: 1.5,
    category: "herramientas",
    description: "Instrumento de percusión con parche de piel tensada; foco de interpretación y ritmo de marcha."
  },
  {
    id: "item_instrumento_violin",
    name: "Instrumento Musical (Violín)",
    aliases: ["Violín", "Violin", "Rabel"],
    quantity: 1,
    weight: 1,
    category: "herramientas",
    description: "Instrumento musical de cuerda frotada con arco; foco melódico para bardos."
  },
  // ==========================================
  // CONSUMIBLES Y POCIONES (CONSUMABLES)
  // ==========================================
  { id: "item_potion_heal", name: "Poci\xF3n de Curaci\xF3n", quantity: 2, weight: 0.25, category: "consumible", description: "Beberla restaura 2d4 + 2 puntos de golpe como acci\xF3n adicional." },
  { id: "item_potion_heal_greater", name: "Poci\xF3n de Curaci\xF3n Mayor", quantity: 1, weight: 0.25, category: "consumible", description: "Beberla restaura 4d4 + 4 puntos de golpe como acci\xF3n adicional." },
  { id: "item_potion_heal_superior", name: "Poci\xF3n de Curaci\xF3n Superior", quantity: 1, weight: 0.25, category: "consumible", description: "Beberla restaura 8d4 + 8 puntos de golpe como acci\xF3n adicional." },
  { id: "item_potion_heal_supreme", name: "Poci\xF3n de Curaci\xF3n Suprema", quantity: 1, weight: 0.25, category: "consumible", description: "Beberla restaura 10d4 + 20 puntos de golpe como acci\xF3n adicional." },
  { id: "item_potion_invis", name: "Poci\xF3n de Invisibilidad", quantity: 1, weight: 0.25, category: "consumible", description: "Beberla te vuelve invisible durante 1 hora o hasta que ataques o lances un conjuro." },
  { id: "item_potion_speed", name: "Poci\xF3n de Velocidad", quantity: 1, weight: 0.25, category: "consumible", description: "Otorga el efecto del conjuro Velocidad durante 1 minuto sin requerir concentraci\xF3n." },
  { id: "item_potion_giant_str", name: "Poci\xF3n de Fuerza de Gigante de las Colinas", quantity: 1, weight: 0.25, category: "consumible", description: "Tu Fuerza se convierte en 21 durante 1 hora." },
  { id: "item_antidote", name: "Ant\xEDdoto", quantity: 1, weight: 0.1, category: "consumible", description: "Otorga ventaja en tiradas de salvaci\xF3n contra venenos durante 1 hora." },
  { id: "item_alchemist_fire", name: "Fuego de Alquimista", quantity: 1, weight: 0.5, category: "consumible", description: "Arrojarlo prende a un objetivo causando 1d4 de fuego al inicio de cada uno de sus turnos." },
  { id: "item_holy_water", name: "Agua Bendita", quantity: 1, weight: 0.5, category: "consumible", description: "Inflige 2d6 de da\xF1o radiante al arrojarla contra un infernal o muerto viviente." },
  // ==========================================
  // PERGAMINOS DE CONJURO POR NIVEL (SPELL SCROLLS - DMG 2024)
  // ==========================================
  { id: "scroll_nivel_0", name: "Pergamino de Conjuro (Truco - Nivel 0)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 0, scrollDc: 13, scrollAttackBonus: 5, description: "Pergamino de Conjuro (Truco - Nivel 0, Común | CD Salvación 13, Ataque +5): Elige un truco oficial para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_1", name: "Pergamino de Conjuro (Nivel 1)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 1, scrollDc: 13, scrollAttackBonus: 5, description: "Pergamino de Conjuro (Nivel 1, Común | CD Salvación 13, Ataque +5): Elige un conjuro de Nivel 1 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_2", name: "Pergamino de Conjuro (Nivel 2)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 2, scrollDc: 13, scrollAttackBonus: 5, description: "Pergamino de Conjuro (Nivel 2, Poco común | CD Salvación 13, Ataque +5): Elige un conjuro de Nivel 2 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_3", name: "Pergamino de Conjuro (Nivel 3)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 3, scrollDc: 15, scrollAttackBonus: 7, description: "Pergamino de Conjuro (Nivel 3, Poco común | CD Salvación 15, Ataque +7): Elige un conjuro de Nivel 3 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_4", name: "Pergamino de Conjuro (Nivel 4)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 4, scrollDc: 15, scrollAttackBonus: 7, description: "Pergamino de Conjuro (Nivel 4, Raro | CD Salvación 15, Ataque +7): Elige un conjuro de Nivel 4 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_5", name: "Pergamino de Conjuro (Nivel 5)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 5, scrollDc: 17, scrollAttackBonus: 9, description: "Pergamino de Conjuro (Nivel 5, Raro | CD Salvación 17, Ataque +9): Elige un conjuro de Nivel 5 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_6", name: "Pergamino de Conjuro (Nivel 6)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 6, scrollDc: 17, scrollAttackBonus: 9, description: "Pergamino de Conjuro (Nivel 6, Muy raro | CD Salvación 17, Ataque +9): Elige un conjuro de Nivel 6 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_7", name: "Pergamino de Conjuro (Nivel 7)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 7, scrollDc: 18, scrollAttackBonus: 10, description: "Pergamino de Conjuro (Nivel 7, Muy raro | CD Salvación 18, Ataque +10): Elige un conjuro de Nivel 7 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_8", name: "Pergamino de Conjuro (Nivel 8)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 8, scrollDc: 18, scrollAttackBonus: 10, description: "Pergamino de Conjuro (Nivel 8, Muy raro | CD Salvación 18, Ataque +10): Elige un conjuro de Nivel 8 para inscribirlo en este pergamino consumible." },
  { id: "scroll_nivel_9", name: "Pergamino de Conjuro (Nivel 9)", quantity: 1, weight: 0.05, category: "pergamino", scrollLevel: 9, scrollDc: 19, scrollAttackBonus: 11, description: "Pergamino de Conjuro (Nivel 9, Legendario | CD Salvación 19, Ataque +11): Elige un conjuro de Nivel 9 para inscribirlo en este pergamino consumible." },
  // ==========================================
  // SORTILEGIOS SOBRENATURALES Y DE BASTIÓN (DMG - DONES SOBRENATURALES / CHARMS)
  // ==========================================
  { id: "charm_vitalidad", name: "Sortilegio de Vitalidad (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 1, currentCharges: 1, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Como acción, recibes el beneficio de una Poción de Curación Suprema (recuperas 10d4 + 20 PG) y eliminas 1 nivel de Agotamiento. Una vez usado, el sortilegio se desvanece." },
  { id: "charm_restauracion", name: "Sortilegio de Restauración (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 6, currentCharges: 6, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Contiene 6 cargas. Puedes usar una acción para gastar cargas y lanzar Restablecimiento Mayor (4 cargas) o Restablecimiento Menor (2 cargas) sin componentes. Se desvanece al agotar sus cargas." },
  { id: "charm_heroismo", name: "Sortilegio de Heroísmo (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 1, currentCharges: 1, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Como acción, ganas 10 Puntos de Golpe temporales y quedas bajo el efecto del conjuro Bendición (+1d4 a ataques y salvaciones, sin requerir concentración) durante 1 hora. Se desvanece tras usarse." },
  { id: "charm_caida_pluma", name: "Sortilegio de Caída de Pluma (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 3, currentCharges: 3, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Contiene 3 usos. Cuando caes, desciendes automáticamente a 18 metros por asalto y no sufres daño por caída (como el conjuro Caída de Pluma). Tras 3 activaciones, el sortilegio desaparece." },
  { id: "charm_vision_oscuridad", name: "Sortilegio de Visión en la Oscuridad (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 3, currentCharges: 3, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Contiene 3 cargas. Como acción, gastas 1 carga para lanzar el conjuro Visión en la Oscuridad (18 m durante 8 horas) sin componentes ni espacios de conjuro." },
  { id: "charm_matadragones", name: "Sortilegio del Matadragones (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 1, currentCharges: 1, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Cuando lo activas sobre un arma cuerpo a cuerpo, esta se transforma durante 9 días en un Arma Matadragones (+1 al ataque y daño, e inflige +3d6 de daño adicional contra dragones)." },
  { id: "charm_conjuracion_animal", name: "Sortilegio de Conjuración Animal (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 3, currentCharges: 3, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Contiene 3 cargas. Como acción, gastas 1 carga para lanzar el conjuro Conjurar Animales (nivel 3) sin gastar espacios de conjuro." },
  { id: "charm_nueve_vidas", name: "Sortilegio de las Nueve Vidas (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 9, currentCharges: 9, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Contiene 9 cargas. Cuando caes a 0 PG como resultado de recibir daño pero no mueres en el acto, puedes gastar 1 carga para quedar con 1 PG en su lugar." },
  { id: "charm_tormenta", name: "Sortilegio de la Tormenta (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 3, currentCharges: 3, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Contiene 3 cargas. Como acción, gastas 1 carga para lanzar Relámpago o Llamar al Relámpago (nivel 3, CD 15) sin componentes." },
  { id: "charm_viajero_planar", name: "Sortilegio del Viajero Planar (Don Sobrenatural DMG)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 1, currentCharges: 1, chargeRecovery: "Sin recarga (Consumible)", description: "Don Sobrenatural (Guía del Dungeon Master): Te permite lanzar Cambio de Plano o Portal 1 vez sin gastar espacios de conjuro ni componentes materiales. Se desvanece tras usarse." },
  { id: "charm_bastion_palabra_curacion", name: "Sortilegio de Santuario / Bastión: Palabra Curativa (DMG 2024)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 1, currentCharges: 1, chargeRecovery: "Sin recarga (Consumible)", description: "Sortilegio de Bastión (Santuario / Relicario - DMG 2024): Obtenido tras un turno de Bastión. Te permite lanzar Palabra de Curación o Curar Heridas una vez sin gastar espacio de conjuro. Dura 7 días o hasta ser consumido." },
  { id: "charm_bastion_barracones", name: "Sortilegio de Barracón / Bastión: Defensa Férrea (DMG 2024)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 1, currentCharges: 1, chargeRecovery: "Sin recarga (Consumible)", description: "Sortilegio de Bastión (Barracón / Sala de Guerra - DMG 2024): Como reacción cuando recibes un golpe crítico, conviertes el crítico en un impacto normal y ganas 2d10 + Nivel en PG temporales. Se consume al usarse." },
  { id: "charm_bastion_sagrario", name: "Sortilegio de Sagrario / Bastión: Resurgimiento Divino (DMG 2024)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 1, currentCharges: 1, chargeRecovery: "Sin recarga (Consumible)", description: "Sortilegio de Bastión (Sagrario / Sacristía - DMG 2024): Te permite lanzar Revivir o Restablecimiento Mayor una vez sin gastar espacio de conjuro ni componentes materiales (diamantes). Se consume al usarse." },
  { id: "charm_bastion_arcano", name: "Sortilegio de Estudio Arcano / Bastión: Identificación y Saber (DMG 2024)", quantity: 1, weight: 0, category: "sortilegio", maxCharges: 3, currentCharges: 3, chargeRecovery: "Sin recarga (Consumible)", description: "Sortilegio de Bastión (Estudio Arcano / Biblioteca - DMG 2024): Contiene 3 cargas. Gasta 1 carga para lanzar Identificar o Detectar Magia sin componentes, u obtener ventaja automática en una prueba de Inteligencia." },
  // ==========================================
  // OBJETOS MÁGICOS (MAGIC ITEMS)
  // ==========================================
  {
    id: "item_guantes_fuerza_ogro",
    name: "Guantes de Fuerza de Ogro",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Tu puntuaci\xF3n de Fuerza se convierte en 19 mientras lleves puestos estos guantes.",
    statModifiers: [
      { target: "str", mode: "override_if_lower", value: 19, description: "Fuerza fijada en 19 si es inferior" }
    ]
  },
  {
    id: "item_diadema_intelecto",
    name: "Diadema del Intelecto",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Tu Inteligencia se convierte en 19 mientras lleves puesta esta diadema.",
    statModifiers: [
      { target: "int", mode: "override_if_lower", value: 19, description: "Inteligencia fijada en 19 si es inferior" }
    ]
  },
  {
    id: "item_amuleto_salud",
    name: "Amuleto de Salud",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Tu Constituci\xF3n se convierte en 19 mientras lleves puesto este amuleto.",
    statModifiers: [
      { target: "con", mode: "override_if_lower", value: 19, description: "Constituci\xF3n fijada en 19 si es inferior" }
    ]
  },
  {
    id: "item_cinturon_gigante_colinas",
    name: "Cintur\xF3n de Fuerza de Gigante de las Colinas",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Tu puntuaci\xF3n de Fuerza se convierte en 21 mientras lleves ce\xF1ido este cintur\xF3n de cuero tit\xE1nico.",
    statModifiers: [
      { target: "str", mode: "override_if_lower", value: 21, description: "Fuerza fijada en 21 si es inferior" }
    ]
  },
  {
    id: "item_cinturon_gigante_fuego",
    name: "Cintur\xF3n de Fuerza de Gigante de Fuego",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Tu puntuaci\xF3n de Fuerza se convierte en 25 mientras lleves este cintur\xF3n forjado en magma.",
    statModifiers: [
      { target: "str", mode: "override_if_lower", value: 25, description: "Fuerza fijada en 25 si es inferior" }
    ]
  },
  {
    id: "item_cinturon_gigante_tormenta",
    name: "Cintur\xF3n de Fuerza de Gigante de la Tormenta",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Tu puntuaci\xF3n de Fuerza se convierte en 29 (fuerza m\xE1xima absoluta) mientras lleves este cintur\xF3n relampagueante.",
    statModifiers: [
      { target: "str", mode: "override_if_lower", value: 29, description: "Fuerza fijada en 29 si es inferior" }
    ]
  },
  {
    id: "item_cinturon_cuero_dragon_1",
    name: "Cinturón de Cuero de Dragón +1",
    aliases: ["Cinturón de Piel de Dragón", "Cinturón de Cuero de Dragón", "Dragonhide Belt", "item_cinturon_piel_dragon", "Cinturón de Piel de Dragón +1"],
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "Al Amanecer tras Descanso Largo",
    description: "Requiere sintonización por un monje. Aumenta la CD de salvación de tus habilidades y rasgos de monje en +1. Además, puedes usar una acción para tirar tu dado de Artes Marciales y recuperar una cantidad de puntos de concentración igual al resultado (1 vez al día, recuperable al amanecer tras un descanso largo).",
    statModifiers: [
      { target: "monkDc", mode: "bonus", value: 1, description: "+1 a la CD de salvación de rasgos de monje (Cinturón de Cuero de Dragón +1)" }
    ]
  },
  {
    id: "item_cinturon_cuero_dragon_2",
    name: "Cinturón de Cuero de Dragón +2",
    aliases: ["Cinturón de Cuero de Dragón +2", "Cinturón de Piel de Dragón +2", "Dragonhide Belt +2"],
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "Al Amanecer tras Descanso Largo",
    description: "Requiere sintonización por un monje. Aumenta la CD de salvación de tus habilidades y rasgos de monje en +2. Además, puedes usar una acción para tirar tu dado de Artes Marciales y recuperar una cantidad de puntos de concentración igual al resultado (1 vez al día, recuperable al amanecer tras un descanso largo).",
    statModifiers: [
      { target: "monkDc", mode: "bonus", value: 2, description: "+2 a la CD de salvación de rasgos de monje (Cinturón de Cuero de Dragón +2)" }
    ]
  },
  {
    id: "item_cinturon_cuero_dragon_3",
    name: "Cinturón de Cuero de Dragón +3",
    aliases: ["Cinturón de Cuero de Dragón +3", "Cinturón de Piel de Dragón +3", "Dragonhide Belt +3"],
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "Al Amanecer tras Descanso Largo",
    description: "Requiere sintonización por un monje. Aumenta la CD de salvación de tus habilidades y rasgos de monje en +3. Además, puedes usar una acción para tirar tu dado de Artes Marciales y recuperar una cantidad de puntos de concentración igual al resultado (1 vez al día, recuperable al amanecer tras un descanso largo).",
    statModifiers: [
      { target: "monkDc", mode: "bonus", value: 3, description: "+3 a la CD de salvación de rasgos de monje (Cinturón de Cuero de Dragón +3)" }
    ]
  },
  {
    id: "item_capa_proteccion",
    name: "Capa de Protecci\xF3n",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Ganas un bonificador de +1 a la Clase de Armadura y a las tiradas de salvaci\xF3n mientras lleves puesta esta capa.",
    statModifiers: [
      { target: "ac", mode: "bonus", value: 1, description: "+1 a la Clase de Armadura" },
      { target: "savingThrows", mode: "bonus", value: 1, description: "+1 a todas las Tiradas de Salvaci\xF3n" }
    ]
  },
  {
    id: "item_anillo_proteccion",
    name: "Anillo de Protecci\xF3n",
    quantity: 1,
    weight: 0.1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Ganas un bonificador de +1 a la CA y a todas las tiradas de salvaci\xF3n mientras lleves puesto este anillo.",
    statModifiers: [
      { target: "ac", mode: "bonus", value: 1, description: "+1 a la CA" },
      { target: "savingThrows", mode: "bonus", value: 1, description: "+1 a Tiradas de Salvaci\xF3n" }
    ]
  },
  {
    id: "item_botas_aladas",
    name: "Botas Aladas",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Mientras lleves puestas estas botas, tienes una velocidad de vuelo igual a tu velocidad de movimiento caminando hasta 4 horas al d\xEDa."
  },
  {
    id: "item_botas_velocidad",
    name: "Botas de Velocidad",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "Todas en Descanso Largo",
    description: "Como acci\xF3n adicional, juntas los talones para duplicar tu velocidad de movimiento y dar desventaja a los ataques de oportunidad contra ti durante 10 minutos."
  },
  {
    id: "item_bag_of_holding",
    name: "Bolsa de Contenci\xF3n",
    quantity: 1,
    weight: 7,
    category: "magico",
    requiresAttunement: false,
    description: "Espacio extradimensional que puede albergar hasta 250 kg de peso o 2 m\xB3 de volumen sin alterar su masa externa."
  },
  {
    id: "item_varita_mago_guerra_1",
    name: "Varita del Mago de Guerra +1",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Ganas +1 a las tiradas de ataque de conjuro y tus ataques m\xE1gicos ignoran cobertura media.",
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 a Tiradas de Ataque M\xE1gico" }
    ]
  },
  {
    id: "item_varita_mago_guerra_2",
    name: "Varita del Mago de Guerra +2",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Ganas +2 a las tiradas de ataque de conjuro y tus ataques m\xE1gicos ignoran cobertura media.",
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: 2, description: "+2 a Tiradas de Ataque M\xE1gico" }
    ]
  },
  {
    id: "item_varita_proyectiles_magicos",
    name: "Varita de Proyectiles M\xE1gicos",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: false,
    isEquipped: true,
    maxCharges: 7,
    currentCharges: 7,
    chargeRecovery: "1d6+1 en Descanso Largo",
    description: "Contiene 7 cargas. Como acci\xF3n, gastas de 1 a 3 cargas para lanzar Proyectil M\xE1gico (nivel 1 con 1 carga, +1 nivel por carga adicional). Recupera 1d6+1 cargas al amanecer."
  },
  {
    id: "item_varita_bolas_fuego",
    name: "Varita de Bolas de Fuego",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 7,
    currentCharges: 7,
    chargeRecovery: "1d6+1 en Descanso Largo",
    description: "Contiene 7 cargas. Como acci\xF3n, gastas 1 o m\xE1s cargas para lanzar Bola de Fuego (CD 15, nivel 3 con 1 carga, +1 nivel por carga extra). Recupera 1d6+1 cargas en cada descanso largo."
  },
  {
    id: "item_varita_relampagos",
    name: "Varita de Rel\xE1mpagos",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 7,
    currentCharges: 7,
    chargeRecovery: "1d6+1 en Descanso Largo",
    description: "Contiene 7 cargas. Como acci\xF3n, gastas 1 o m\xE1s cargas para lanzar Rel\xE1mpago (CD 15, 8d6 de da\xF1o por rayo con 1 carga). Recupera 1d6+1 cargas en descanso largo."
  },
  {
    id: "item_varita_paralisis",
    name: "Varita de Par\xE1lisis",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 7,
    currentCharges: 7,
    chargeRecovery: "1d6+1 en Descanso Largo",
    description: "Contiene 7 cargas. Como acci\xF3n, gastas 1 carga para disparar un rayo azulado a una criatura a 18 m: debe superar salvaci\xF3n de CON CD 15 o quedar Paralizada 1 minuto."
  },
  {
    id: "item_varita_telarana",
    name: "Varita de Telara\xF1a",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 7,
    currentCharges: 7,
    chargeRecovery: "1d6+1 en Descanso Largo",
    description: "Contiene 7 cargas. Como acci\xF3n, gastas 1 carga para lanzar el conjuro Telara\xF1a (CD 15). Recupera 1d6+1 cargas en descanso largo."
  },
  {
    id: "item_baston_curacion",
    name: "Bast\xF3n de Curaci\xF3n",
    quantity: 1,
    weight: 2,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 10,
    currentCharges: 10,
    chargeRecovery: "1d6+4 en Descanso Largo",
    description: "Contiene 10 cargas. Permite lanzar Curar Heridas (1 carga por nivel, hasta 4), Restablecimiento Menor (2 cargas) o Curar Heridas en Masa (5 cargas) usando tu modificador m\xE1gico. Recupera 1d6+4 cargas en descanso largo."
  },
  {
    id: "item_baston_poder",
    name: "Bast\xF3n de Poder",
    quantity: 1,
    weight: 2,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    magicBonus: 2,
    maxCharges: 20,
    currentCharges: 20,
    chargeRecovery: "2d8+4 en Descanso Largo",
    description: "Bast\xF3n m\xE1gico +2 que otorga +2 a la CA, +2 a salvaciones y +2 al ataque de conjuros. Contiene 20 cargas para lanzar Bola de Fuego (5c), Cono de Fr\xEDo (5c), Rel\xE1mpago (5c), Muro de Fuerza (5c), Escudo (1c) o Proyectil M\xE1gico (1c).",
    statModifiers: [
      { target: "ac", mode: "bonus", value: 2, description: "+2 a la CA" },
      { target: "savingThrows", mode: "bonus", value: 2, description: "+2 a Tiradas de Salvaci\xF3n" },
      { target: "spellAttack", mode: "bonus", value: 2, description: "+2 a Tiradas de Ataque M\xE1gico" }
    ]
  },
  {
    id: "item_baston_bosques",
    name: "Bast\xF3n de los Bosques",
    quantity: 1,
    weight: 2,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    magicBonus: 2,
    maxCharges: 10,
    currentCharges: 10,
    chargeRecovery: "1d6+4 en Descanso Largo",
    description: "Bast\xF3n dru\xEDdico +2 (+2 al ataque m\xE1gico). Contiene 10 cargas para lanzar Curar Heridas (1c), Piel Robrigada (2c), Hablar con las Plantas (3c), Muro de Espinas (6c) y Pasar sin Rastro sin gastar cargas.",
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: 2, description: "+2 a Tiradas de Ataque M\xE1gico" }
    ]
  },
  {
    id: "item_baston_fuego",
    name: "Bast\xF3n de Fuego",
    quantity: 1,
    weight: 2,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 10,
    currentCharges: 10,
    chargeRecovery: "1d6+4 en Descanso Largo",
    description: "Otorga resistencia al da\xF1o por fuego. Contiene 10 cargas para lanzar Manos Ardientes (1 carga), Bola de Fuego (3 cargas) o Muro de Fuego (4 cargas). Recupera 1d6+4 cargas en descanso largo."
  },
  {
    id: "item_baston_escarcha",
    name: "Bast\xF3n de Escarcha",
    quantity: 1,
    weight: 2,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 10,
    currentCharges: 10,
    chargeRecovery: "1d6+4 en Descanso Largo",
    description: "Otorga resistencia al da\xF1o por fr\xEDo. Contiene 10 cargas para lanzar Nube Oscurecedora (1c), Tormenta de Hielo (4c), Muro de Hielo (4c) o Cono de Fr\xEDo (5c). Recupera 1d6+4 cargas en descanso largo."
  },
  {
    id: "item_collar_bolas_fuego",
    name: "Collar de Bolas de Fuego",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: false,
    isEquipped: true,
    maxCharges: 6,
    currentCharges: 6,
    chargeRecovery: "Sin recarga (Consumible)",
    description: "Collar con 6 cuentas rojizas desprendibles. Como acci\xF3n, arrojas una o m\xE1s cuentas hasta 18 metros que detonan como una Bola de Fuego (CD 15, 8d6 de fuego + 1d6 por cada cuenta extra)."
  },
  {
    id: "item_gema_vision",
    name: "Gema de Visi\xF3n",
    quantity: 1,
    weight: 0.1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 3,
    currentCharges: 3,
    chargeRecovery: "1d3 en Descanso Largo",
    description: "Contiene 3 cargas. Como acci\xF3n, gastas 1 carga para obtener Visi\xF3n Verdadera hasta 36 metros durante 10 minutos al mirar a trav\xE9s de la gema. Recupera 1d3 cargas al amanecer."
  },
  {
    id: "item_yelmo_teletransportacion",
    name: "Yelmo de Teletransportaci\xF3n",
    quantity: 1,
    weight: 1.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 3,
    currentCharges: 3,
    chargeRecovery: "1d3 en Descanso Largo",
    description: "Contiene 3 cargas. Mientras lo lleves puesto, puedes usar una acci\xF3n y gastar 1 carga para lanzar el conjuro Teletransportar. Recupera 1d3 cargas en descanso largo."
  },
  {
    id: "item_amuleto_devoto_1",
    name: "Amuleto del Devoto +1",
    quantity: 1,
    weight: 0.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "Todas en Descanso Largo",
    description: "Ganas +1 a la CD de salvaci\xF3n de conjuros y al ataque m\xE1gico divino. Permite usar Canalizar Divinidad 1 vez extra al d\xEDa.",
    statModifiers: [
      { target: "spellDc", mode: "bonus", value: 1, description: "+1 a la CD de Salvaci\xF3n de Conjuros" },
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 a Ataque de Conjuros" }
    ]
  },
  {
    id: "item_piedra_buena_suerte",
    name: "Piedra de la Buena Suerte",
    quantity: 1,
    weight: 0.25,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Ganas un bonificador de +1 a todas las pruebas de caracter\xEDstica y tiradas de salvaci\xF3n.",
    statModifiers: [
      { target: "savingThrows", mode: "bonus", value: 1, description: "+1 a todas las Tiradas de Salvaci\xF3n" }
    ]
  },
  {
    id: "item_espada_sol",
    name: "Espada Solar",
    quantity: 1,
    weight: 1,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Empu\xF1adura m\xE1gica de la que brota una hoja de pura luz solar radiante (+2 al ataque/da\xF1o). Inflige 1d8/1d10 radiante (+1d8 extra vs no-muertos). Cuenta como arma sutil.",
    magicBonus: 2,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 2, description: "+2 al Ataque con la Espada Solar" },
      { target: "damageBonus", mode: "bonus", value: 2, description: "+2 al Da\xF1o Radiante" }
    ]
  },
  {
    id: "item_espada_flamigera",
    name: "Espada Flam\xEDgera",
    quantity: 1,
    weight: 1.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Pronuncias una palabra de mando y la hoja estalla en llamas ardientes, infligiendo 2d6 de da\xF1o por fuego adicional en cada impacto e iluminando 12 metros."
  },
  {
    id: "item_capa_desplazador",
    name: "Capa del Desplazador",
    quantity: 1,
    weight: 1.5,
    category: "magico",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Proyecta una ilusi\xF3n que hace que parezcas estar ligeramente desplazado. Los ataques de los enemigos contra ti sufren desventaja permanente."
  },
  // ==========================================
  // ARTEFACTOS Y RELIQUIAS LEGENDARIAS (ARTIFACTS)
  // ==========================================
  {
    id: "artifact_espada_vengadora",
    name: "Espada Sagrada Vengadora",
    quantity: 1,
    weight: 2,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "La reliquia suprema de los Paladines. Bonificador de +3 al ataque y da\xF1o. Inflige 2d10 de da\xF1o radiante adicional contra infernales y no-muertos. Emite un aura de 9 metros que concede ventaja a ti y tus aliados en todas las tiradas de salvaci\xF3n contra conjuros y magia.",
    magicBonus: 3,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 al Ataque con Espada Sagrada Vengadora" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 al Da\xF1o Radiante Sagrado" },
      { target: "savingThrows", mode: "bonus", value: 2, description: "+2 de Gracia Sagrada a Salvaciones" }
    ],
    specialAction: "Aura Sagrada de 9 metros: ventaja en tiradas de salvaci\xF3n contra conjuros y efectos m\xE1gicos para ti y aliados."
  },
  {
    id: "artifact_baston_magos",
    name: "Bast\xF3n de los Magos",
    quantity: 1,
    weight: 2.5,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 50,
    currentCharges: 50,
    chargeRecovery: "4d6+2 en Descanso Largo",
    description: "El mayor artefacto arcano jam\xE1s concebido. Otorga +2 a la CA, +2 a las tiradas de ataque y CD de salvaci\xF3n de conjuros. Contiene 50 cargas para lanzar decenas de conjuros de niveles 1 a 7, absorbe conjuros enemigos como reacci\xF3n y permite Golpe Retributivo de devastaci\xF3n c\xF3smica.",
    statModifiers: [
      { target: "ac", mode: "bonus", value: 2, description: "+2 a la CA" },
      { target: "spellDc", mode: "bonus", value: 2, description: "+2 a la CD de Salvaci\xF3n de Conjuros" },
      { target: "spellAttack", mode: "bonus", value: 2, description: "+2 a Tiradas de Ataque M\xE1gico" },
      { target: "savingThrows", mode: "bonus", value: 2, description: "+2 a Salvaciones contra Magia" }
    ],
    specialAction: "Absorber conjuro enemigo que te tome como \xFAnico blanco como reacci\xF3n para recargar cargas del bast\xF3n."
  },
  {
    id: "artifact_ojo_vecna",
    name: "Ojo de Vecna",
    quantity: 1,
    weight: 0.1,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 8,
    currentCharges: 8,
    chargeRecovery: "1d4+4 en Descanso Largo",
    description: "El ojo conservado del archiliche y dios de los secretos Vecna. Otorga Visi\xF3n Verdadera de 36 m, visi\xF3n de rayos X a trav\xE9s de paredes y 8 cargas para lanzar Clarividencia, Corona de Locura, Desintegrar, Mirada Penetrante o Rayo Solar.",
    specialAction: "Visi\xF3n Verdadera 36 metros permanente y lanzar Desintegrar (CD 18) gastando cargas."
  },
  {
    id: "artifact_mano_vecna",
    name: "Mano de Vecna",
    quantity: 1,
    weight: 0.5,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 8,
    currentCharges: 8,
    chargeRecovery: "1d4+4 en Descanso Largo",
    description: "La mano momificada marchita de Vecna. Tu Fuerza pasa a ser 20 permanentemente. Tus golpes e impactos con conjuro infligen 2d8 de da\xF1o por fr\xEDo adicional. Permite lanzar Dedo de la Muerte, Telequinesis y Congelaci\xF3n.",
    statModifiers: [
      { target: "str", mode: "override_if_lower", value: 20, description: "Fuerza fijada en 20" }
    ],
    specialAction: "Inflige 2d8 de da\xF1o por fr\xEDo extra en ataques cuerpo a cuerpo y lanza Dedo de la Muerte (CD 18)."
  },
  {
    id: "artifact_libro_vil_oscuridad",
    name: "Libro de la Vil Oscuridad",
    quantity: 1,
    weight: 4,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "El tomo de pura maldad nigrom\xE1ntica. Tras sintonizarte y leerlo, tu caracter\xEDstica de lanzamiento de conjuros aumenta en +2 (pudiendo superar el l\xEDmite de 20 hasta 24), y obtienes acceso a oscuros ritos arcanos."
  },
  {
    id: "artifact_libro_hechos_exaltados",
    name: "Libro de los Hechos Exaltados",
    quantity: 1,
    weight: 4,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "El tratado sagrado definitivo de la bondad divina. Tras sintonizarte, tu Sabidur\xEDa o Carisma aumenta en +2 (pudiendo superar 20 hasta 24), ganas una aureola sagrada protectora e inmunidad total a maldiciones y enfermedades."
  },
  {
    id: "artifact_martillo_truenos",
    name: "Martillo de los Truenos",
    quantity: 1,
    weight: 6,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Un martillo de guerra colosal con +1 al ataque/da\xF1o. Si se empu\xF1a mientras llevas Guantes de Fuerza de Ogro y un Cintur\xF3n de Gigante, tu puntuaci\xF3n de Fuerza se convierte en 30 (+10) y puedes arrojarlo para desatar un trueno ensordecedor que aturde a enemigos a 9 metros.",
    magicBonus: 1,
    statModifiers: [
      { target: "str", mode: "override_if_lower", value: 30, description: "Fuerza fijada en 30 (con Cintur\xF3n y Guantes)" },
      { target: "attackBonus", mode: "bonus", value: 1, description: "+1 al Ataque" },
      { target: "damageBonus", mode: "bonus", value: 1, description: "+1 al Da\xF1o Contundente" }
    ],
    specialAction: "Arrojar martillo (alcance 18/54 m) desatando una explosi\xF3n de trueno que aturde (salvaci\xF3n CON CD 17)."
  },
  {
    id: "artifact_varita_orcus",
    name: "Varita de Orcus",
    quantity: 1,
    weight: 3.5,
    category: "artefacto",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 7,
    currentCharges: 7,
    chargeRecovery: "1d4+3 en Descanso Largo",
    description: "Cetro de obsidiana coronado por una calavera humana que sirve como maza m\xE1gica +3. Concede +3 a la CA, permite invocar hasta 500 PG acumulados de no-muertos y lanzar Palabra de Poder: Matar, Da\xF1o o C\xEDrculo de la Muerte.",
    magicBonus: 3,
    statModifiers: [
      { target: "ac", mode: "bonus", value: 3, description: "+3 a la CA" },
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 al Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 al Da\xF1o Necr\xF3tico" }
    ],
    specialAction: "Convocar hordas de no-muertos (hasta 500 PG acumulados) bajo tu control absoluto una vez al d\xEDa."
  },
  // === OBJETOS MÁGICOS EXPANDIDOS (DMG 2024, TASHA, XANATHAR, FAERÛN) ===
  {
    id: "magic_amuleto_devoto",
    name: "Amuleto del Devoto +1 (Tasha)",
    quantity: 1,
    weight: 0.5,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Foco sagrado que otorga +1 a las tiradas de ataque de conjuro y a la CD de salvación de tus conjuros de Clérigo o Paladín. Además, puedes usar Canalizar Divinidad una vez adicional sin gastar usos normales.",
    magicBonus: 1,
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 Ataque de Conjuro" },
      { target: "spellDc", mode: "bonus", value: 1, description: "+1 CD de Conjuros" }
    ]
  },
  {
    id: "magic_grimorio_arcano",
    name: "Grimorio Arcano +1 (Tasha)",
    quantity: 1,
    weight: 1.5,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Libro de conjuros para Mago que funciona como foco arcano, otorgando +1 al ataque de conjuro y +1 a la CD de salvación de conjuros de mago, y aumenta en 1 el nivel de espacios recuperados con Recuperación Arcana.",
    magicBonus: 1,
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 Ataque de Conjuro" },
      { target: "spellDc", mode: "bonus", value: 1, description: "+1 CD de Conjuros" }
    ]
  },
  {
    id: "magic_vial_sangre",
    name: "Vial de Sangre +1 (Tasha)",
    quantity: 1,
    weight: 0.2,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Foco arcano para Hechicero que otorga +1 al ataque y CD de conjuros. Además, al gastar Dados de Golpe para curarte puedes recuperar 5 Puntos de Hechicería una vez al día.",
    magicBonus: 1,
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 Ataque de Conjuro" },
      { target: "spellDc", mode: "bonus", value: 1, description: "+1 CD de Conjuros" }
    ]
  },
  {
    id: "magic_tambor_ritmo",
    name: "Tambor del Ritmo +1 (Tasha)",
    quantity: 1,
    weight: 1.5,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Instrumento de Bardo que otorga +1 al ataque de conjuro y +1 a la CD de salvación de tus conjuros de bardo, y permite recuperar un uso de Inspiración Bárdica como acción adicional una vez al día.",
    magicBonus: 1,
    statModifiers: [
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 Ataque de Conjuro" },
      { target: "spellDc", mode: "bonus", value: 1, description: "+1 CD de Conjuros" }
    ]
  },
  {
    id: "magic_hoz_lunar",
    name: "Hoz Lunar +1 (Tasha)",
    quantity: 1,
    weight: 1,
    category: "arma",
    weaponDamage: "1d4",
    damageType: "Cortante",
    weaponAbility: "str",
    properties: ["Ligera"],
    weaponMastery: "mellar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Hoz plateada para Druida o Explorador: +1 a ataque y daño con el arma, +1 al ataque y CD de tus conjuros, y suma +1d4 adicional a cualquier curación realizada con tus conjuros.",
    magicBonus: 1,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 1, description: "+1 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 1, description: "+1 Daño" },
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 Ataque de Conjuro" },
      { target: "spellDc", mode: "bonus", value: 1, description: "+1 CD de Conjuros" }
    ]
  },
  {
    id: "magic_tatuaje_ Heraldo_Eldritch",
    name: "Tatuaje de Garra Sobrenatural (Tasha)",
    quantity: 1,
    weight: 0,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Tus ataques desarmados se vuelven mágicos con un bonificador de +1 al ataque y daño. Como acción adicional (1/día), tus golpes tienen alcance de 4.5 m y suman +1d6 de daño de Fuerza durante 1 minuto.",
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 1, description: "+1 Ataque Desarmado" },
      { target: "damageBonus", mode: "bonus", value: 1, description: "+1 Daño Desarmado" }
    ]
  },
  {
    id: "magic_tatuaje_barrera",
    name: "Tatuaje de Barrera Protectora (Tasha)",
    quantity: 1,
    weight: 0,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Tatuaje protector arcano que endurece tu piel como una armadura mística. Mientras no lleves armadura, te otorga una CA base mejorada (+2 a la CA).",
    statModifiers: [
      { target: "ac", mode: "bonus", value: 2, description: "+2 a la CA (Tatuaje de Barrera)" }
    ]
  },
  {
    id: "magic_insignia_garras",
    name: "Insignia de las Garras (Faerûn)",
    aliases: ["Insignia de las Garras", "Insignia of Claws"],
    quantity: 1,
    weight: 0.1,
    category: "maravilloso",
    requiresAttunement: false,
    isEquipped: true,
    description: "Joya del Culto del Dragón que otorga +1 a las tiradas de ataque y daño con ataques sin armas y armas naturales, los cuales pasan a considerarse mágicos.",
    statModifiers: [
      { target: "unarmedAttack", mode: "bonus", value: 1, description: "+1 Ataque sin Armas (Insignia de las Garras)" },
      { target: "unarmedDamage", mode: "bonus", value: 1, description: "+1 Daño sin Armas (Insignia de las Garras)" }
    ]
  },
  {
    id: "magic_envolturas_ki",
    name: "Vendas de Poder Desarmado (DMG 2024)",
    aliases: ["Envolturas de Poder Desarmado", "Vendas de Poder Desarmado", "Envolturas de Poder Desarmado +1", "Wraps of Unarmed Prowess"],
    quantity: 1,
    weight: 0.2,
    category: "maravilloso",
    requiresAttunement: false,
    isEquipped: true,
    magicBonus: 1,
    description: "Vendas místicas para las manos (DMG 2024). Mientras las llevas equipadas, tus ataques sin armas se consideran mágicos y reciben un bonificador a las tiradas de ataque y daño igual a su mejora mágica (+1, +2 o +3).",
    statModifiers: [
      { target: "unarmedAttack", mode: "bonus", value: 1, description: "+1 Ataque sin Armas (Vendas de Poder)" },
      { target: "unarmedDamage", mode: "bonus", value: 1, description: "+1 Daño sin Armas (Vendas de Poder)" }
    ]
  },
  {
    id: "magic_cinturon_enano",
    name: "Cinturón de los Enanos (DMG)",
    quantity: 1,
    weight: 1.5,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Aumenta tu Constitución en +2 (máximo 20), te otorga Visión en la Oscuridad (18 m), resistencia al daño por Veneno y competencia con el idioma Enano.",
    statModifiers: [
      { target: "con", mode: "bonus", value: 2, description: "+2 Constitución" }
    ]
  },
  {
    id: "magic_capa_aracnida",
    name: "Capa Arácnida (DMG)",
    quantity: 1,
    weight: 1,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Otorga resistencia al daño por Veneno, velocidad de trepar igual a tu velocidad caminando, caminar por telarañas sin quedar atrapado y lanzar Telaraña (CD 13) una vez al día."
  },
  {
    id: "magic_capa_murcielago",
    name: "Capa del Murciélago (DMG)",
    quantity: 1,
    weight: 1,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Ventaja en pruebas de Destreza (Sigilo). En luz tenue u oscuridad puedes volar a 12 m sujetando los bordes de la capa o polimorfarte en un murciélago una vez al día."
  },
  {
    id: "magic_botas_velocidad",
    name: "Botas de Velocidad (DMG)",
    quantity: 1,
    weight: 1,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Como acción adicional puedes entrechocar los talones para duplicar tu velocidad caminando y hacer que los ataques de oportunidad contra ti tengan desventaja (hasta 10 minutos al día).",
    statModifiers: [
      { target: "speed", mode: "bonus", value: 9, description: "+9 m Velocidad con Botas activas" }
    ]
  },
  {
    id: "magic_anillo_evasion",
    name: "Anillo de Evasión (DMG)",
    quantity: 1,
    weight: 0.05,
    category: "anillo",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 3,
    currentCharges: 3,
    chargeRecovery: "1d3 en Descanso Largo",
    description: "Tiene 3 cargas. Cuando fallas una tirada de salvación de Destreza, puedes usar tu reacción y gastar 1 carga para tener éxito automáticamente en esa salvación."
  },
  {
    id: "magic_anillo_accion_libre",
    name: "Anillo de Acción Libre (DMG)",
    quantity: 1,
    weight: 0.05,
    category: "anillo",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "El terreno difícil no te cuesta movimiento extra y la magia no puede reducir tu velocidad ni causarte las condiciones de Paralizado o Apresado."
  },
  {
    id: "magic_anillo_regeneracion",
    name: "Anillo de Regeneración (DMG)",
    quantity: 1,
    weight: 0.05,
    category: "anillo",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Mientras lo llevas puesto, recuperas 1d6 Puntos de Golpe cada 10 minutos siempre que tengas al menos 1 PG. Si pierdes una parte del cuerpo, se regenera en 1d6+1 días."
  },
  {
    id: "magic_piedra_ioun_maestria",
    name: "Piedra Ioun de Maestría (Legendaria)",
    quantity: 1,
    weight: 0.05,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Prisma de diamante pálido que orbita alrededor de tu cabeza. Mientras orbita, tu Bonificador por Competencia aumenta en +1, mejorando ataques, salvaciones, habilidades y CD.",
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 1, description: "+1 Ataque (Piedra Ioun Maestría)" },
      { target: "spellAttack", mode: "bonus", value: 1, description: "+1 Ataque de Conjuro" },
      { target: "spellDc", mode: "bonus", value: 1, description: "+1 CD de Conjuros" },
      { target: "savingThrows", mode: "bonus", value: 1, description: "+1 Salvaciones Competentes" }
    ]
  },
  {
    id: "magic_piedra_ioun_reserva",
    name: "Piedra Ioun de Reserva (Rara)",
    quantity: 1,
    weight: 0.05,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 3,
    currentCharges: 3,
    chargeRecovery: "Recarga manual con conjuros",
    description: "Prisma púrpura vibrante que orbita tu cabeza y puede almacenar hasta 3 niveles de conjuros lanzados sobre ella para liberarlos posteriormente."
  },
  {
    id: "magic_yelmo_brillantez",
    name: "Yelmo de Brillantez (Muy Raro)",
    quantity: 1,
    weight: 1.5,
    category: "maravilloso",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 20,
    currentCharges: 20,
    chargeRecovery: "Joyas consumibles",
    description: "Yelmo engarzado con diamantes, rubíes, ópalos de fuego y ópalos que permite lanzar Luz Diurna, Bola de Fuego, Rociada Prismática y Muro de Fuego, además de otorgar resistencia al Fuego y envolver tus armas en llamas (+1d6 fuego)."
  },
  {
    id: "magic_baston_bosques",
    name: "Bastón de los Bosques (Raro)",
    quantity: 1,
    weight: 2,
    category: "baston",
    weaponDamage: "1d6",
    damageType: "Contundente",
    weaponAbility: "str",
    properties: ["Versátil (1d8)"],
    weaponMastery: "derribar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 10,
    currentCharges: 10,
    chargeRecovery: "1d6+4 en Descanso Largo",
    description: "Bastón druídico con +2 a las tiradas de ataque de arma y +2 a las tiradas de ataque de conjuro. Permite lanzar Pasar sin Rastro sin coste, Curar Heridas, Hablar con Animales/Plantas y transformarse en un árbol.",
    magicBonus: 2,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 2, description: "+2 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 2, description: "+2 Daño" },
      { target: "spellAttack", mode: "bonus", value: 2, description: "+2 Ataque de Conjuro" }
    ]
  },
  {
    id: "magic_espada_vorpal",
    name: "Espada Vorpalina +3 (Legendaria)",
    quantity: 1,
    weight: 1.5,
    category: "arma",
    weaponDamage: "1d8",
    damageType: "Cortante",
    weaponAbility: "str",
    properties: ["Versátil (1d10)"],
    weaponMastery: "debilitar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Hoja legendaria con +3 al ataque y daño que ignora la resistencia al daño cortante. Al sacar un 20 natural en el dado de ataque, decapita a la criatura o le inflige 6d8 de daño cortante adicional.",
    magicBonus: 3,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 Daño" }
    ]
  },
  {
    id: "magic_hoja_suerte",
    name: "Hoja de la Suerte +1 (Legendaria)",
    quantity: 1,
    weight: 1,
    category: "arma",
    weaponDamage: "1d6",
    damageType: "Perforante",
    weaponAbility: "dex",
    properties: ["Sutil", "Ligera"],
    weaponMastery: "molestar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Espada corta con +1 al ataque y daño y +1 a todas las tiradas de salvación. Permite repetir 1 tirada al día (Suerte) y contiene 1d4-1 cargas del conjuro Deseo.",
    magicBonus: 1,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 1, description: "+1 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 1, description: "+1 Daño" },
      { target: "savingThrows", mode: "bonus", value: 1, description: "+1 Tiradas de Salvación" }
    ]
  },
  {
    id: "magic_defensor",
    name: "Espada Defensora +3 (Legendaria)",
    quantity: 1,
    weight: 1.5,
    category: "arma",
    weaponDamage: "1d8",
    damageType: "Cortante",
    weaponAbility: "str",
    properties: ["Versátil (1d10)"],
    weaponMastery: "debilitar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Arma legendaria +3. En el primer ataque de cada turno puedes transferir parte o todo el bonificador (+1 a +3) del arma a tu Clase de Armadura hasta el inicio de tu siguiente turno.",
    magicBonus: 3,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 Daño" }
    ]
  },
  {
    id: "artifact_hacha_senores_enanos",
    name: "Hacha de los Señores Enanos",
    quantity: 1,
    weight: 2.5,
    category: "artefacto",
    weaponDamage: "1d8+1d8",
    damageType: "Cortante",
    weaponAbility: "str",
    properties: ["Versátil (1d10)", "Arrojadiza (6/18 m)"],
    weaponMastery: "derribar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Artefacto forjado por Moradin que combina los poderes de un Lanzador Enano (+3), un Cinturón de los Enanos (+2 CON) y una Espada de Filo Agudo, además de permitir conjurar un elemental de tierra y teletransportarse por túneles subterráneos.",
    magicBonus: 3,
    statModifiers: [
      { target: "con", mode: "bonus", value: 2, description: "+2 Constitución" },
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 Daño" }
    ]
  },
  {
    id: "artifact_espada_kas",
    name: "Espada de Kas",
    quantity: 1,
    weight: 1.5,
    category: "artefacto",
    weaponDamage: "1d8+2d10",
    damageType: "Cortante / Necrótico",
    weaponAbility: "str",
    properties: ["Versátil (1d10)"],
    weaponMastery: "debilitar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Espada larga vampírica +3 que logra golpes críticos con 19-20, suma +1d10 a la Iniciativa, inflige 2d10 extra a no-muertos y puede transferir su bonificador a la CA como una Espada Defensora.",
    magicBonus: 3,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 Daño" },
      { target: "initiative", mode: "bonus", value: 5, description: "+1d10 (~5) a la Iniciativa" }
    ]
  },
  {
    id: "artifact_luna_negra_filonegro",
    name: "Filonegro (Blackrazor)",
    quantity: 1,
    weight: 3,
    category: "artefacto",
    weaponDamage: "2d6",
    damageType: "Cortante",
    weaponAbility: "str",
    properties: ["Pesada", "A dos manos"],
    weaponMastery: "rozar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    description: "Mandoble consciente +3 que devora las almas de quienes mata, otorgándote Puntos de Golpe Temporales iguales a los PG máximos de la víctima y ventaja en ataques, salvaciones y pruebas de característica mientras duren esos PG temporales.",
    magicBonus: 3,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 Daño" }
    ]
  },
  {
    id: "artifact_ola_whelm",
    name: "Whelm (Martillo de Guerra Consciente)",
    quantity: 1,
    weight: 2,
    category: "artefacto",
    weaponDamage: "1d8",
    damageType: "Contundente",
    weaponAbility: "str",
    properties: ["Versátil (1d10)", "Arrojadiza (6/18 m)"],
    weaponMastery: "empujar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 1,
    currentCharges: 1,
    chargeRecovery: "1 en Descanso Largo",
    description: "Martillo de guerra consciente +3 forjado por enanos para exterminar gigantes y trasgos. Regresa a tu mano tras arrojarlo y permite desatar una onda de choque aturdidora.",
    magicBonus: 3,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 Daño" }
    ]
  },
  {
    id: "artifact_ola_wave",
    name: "Ola (Tridente Consciente)",
    quantity: 1,
    weight: 2,
    category: "artefacto",
    weaponDamage: "1d8",
    damageType: "Perforante",
    weaponAbility: "str",
    properties: ["Versátil (1d10)", "Arrojadiza (6/18 m)"],
    weaponMastery: "derribar",
    requiresAttunement: true,
    isAttuned: true,
    isEquipped: true,
    maxCharges: 3,
    currentCharges: 3,
    chargeRecovery: "1d3 en Descanso Largo",
    description: "Tridente consciente +3 consagrado a los dioses del mar. Concede los beneficios de un Tridente de Mando sobre Peces, un Arma de Advertencia y un Cubo de Fuerza, e inflige daño necrótico masivo en impactos críticos.",
    magicBonus: 3,
    statModifiers: [
      { target: "attackBonus", mode: "bonus", value: 3, description: "+3 Ataque" },
      { target: "damageBonus", mode: "bonus", value: 3, description: "+3 Daño" }
    ]
  }
].concat(DND55_TCE_XGE_ITEMS);

const DND55_SCROLL_LEVEL_STATS = [
  { level: 0, label: "Truco (Nivel 0)", rarity: "Común", dc: 13, attackBonus: 5 },
  { level: 1, label: "Nivel 1", rarity: "Común", dc: 13, attackBonus: 5 },
  { level: 2, label: "Nivel 2", rarity: "Poco común", dc: 13, attackBonus: 5 },
  { level: 3, label: "Nivel 3", rarity: "Poco común", dc: 15, attackBonus: 7 },
  { level: 4, label: "Nivel 4", rarity: "Raro", dc: 15, attackBonus: 7 },
  { level: 5, label: "Nivel 5", rarity: "Raro", dc: 17, attackBonus: 9 },
  { level: 6, label: "Nivel 6", rarity: "Muy raro", dc: 17, attackBonus: 9 },
  { level: 7, label: "Nivel 7", rarity: "Muy raro", dc: 18, attackBonus: 10 },
  { level: 8, label: "Nivel 8", rarity: "Muy raro", dc: 18, attackBonus: 10 },
  { level: 9, label: "Nivel 9", rarity: "Legendario", dc: 19, attackBonus: 11 }
];

const DND55_ARTIFACT_PROPERTIES = {
  minorBeneficial: [
    { id: "min_ben_skill", name: "Competencia en Habilidad (Beneficio Menor)", description: "Mientras estás sintonizado con el artefacto, obtienes competencia en una habilidad a elección del DM." },
    { id: "min_ben_disease", name: "Inmunidad a Enfermedades (Beneficio Menor)", description: "Mientras estás sintonizado con el artefacto, eres inmune a todas las enfermedades y contagios." },
    { id: "min_ben_charm_fright", name: "Mente Inquebrantable (Beneficio Menor)", description: "Mientras estás sintonizado con el artefacto, no puedes ser Hechizado ni Asustado." },
    { id: "min_ben_resistance", name: "Resistencia Elemental (Beneficio Menor)", description: "Mientras estás sintonizado con el artefacto, tienes resistencia a un tipo de daño (Ácido, Frío, Fuego, Relámpago o Trueno)." },
    { id: "min_ben_cantrip", name: "Truco Innato (Beneficio Menor)", description: "Mientras estás sintonizado con el artefacto, puedes lanzar un truco a voluntad (CD 15)." },
    { id: "min_ben_spell_1", name: "Conjuro de Nivel 1 (Beneficio Menor)", description: "Puedes usar una acción para lanzar un conjuro de nivel 1 desde el artefacto (1/Descanso Largo, CD 15)." },
    { id: "min_ben_spell_2", name: "Conjuro de Nivel 2 (Beneficio Menor)", description: "Puedes usar una acción para lanzar un conjuro de nivel 2 desde el artefacto (1/Descanso Largo, CD 15)." },
    { id: "min_ben_spell_3", name: "Conjuro de Nivel 3 (Beneficio Menor)", description: "Puedes usar una acción para lanzar un conjuro de nivel 3 desde el artefacto (1/Descanso Largo, CD 15)." },
    { id: "min_ben_ac", name: "Égida Menor (+1 CA) (Beneficio Menor)", description: "Mientras estás sintonizado con el artefacto, obtienes un bonificador de +1 a la Clase de Armadura.", statModifier: { target: "ac", mode: "bonus", value: 1 } },
    { id: "min_ben_temp_hp", name: "Vigor Arcano (Beneficio Menor)", description: "Cuando terminas un descanso corto o largo mientras estás sintonizado, ganas 10 Puntos de Golpe Temporales." }
  ],
  majorBeneficial: [
    { id: "maj_ben_ability", name: "Ascensión de Característica (+2) (Beneficio Mayor)", description: "Mientras estás sintonizado con el artefacto, una de tus puntuaciones de característica aumenta en +2, hasta un máximo de 24." },
    { id: "maj_ben_regen", name: "Regeneración Vital (1d6 PG) (Beneficio Mayor)", description: "Mientras estás sintonizado con el artefacto, recuperas 1d6 Puntos de Golpe al inicio de tu turno si tienes al menos 1 PG." },
    { id: "maj_ben_damage_dice", name: "Furia del Artefacto (+1d6 Daño) (Beneficio Mayor)", description: "Cuando impactas con un ataque con arma mientras estás sintonizado, el objetivo sufre 1d6 de daño adicional del tipo del arma.", statModifier: { target: "damageBonus", mode: "bonus", value: 3 } },
    { id: "maj_ben_speed", name: "Paso del Relámpago (+3 m Velocidad) (Beneficio Mayor)", description: "Mientras estás sintonizado con el artefacto, tu velocidad caminando aumenta en 3 metros (+10 pies).", statModifier: { target: "speed", mode: "bonus", value: 3 } },
    { id: "maj_ben_spell_4_7", name: "Conjuro Mayor (Nv 4 a 7) (Beneficio Mayor)", description: "Puedes usar una acción para lanzar un conjuro poderoso (nivel 4 a 7) desde el artefacto (1/Descanso Largo, CD 18)." },
    { id: "maj_ben_immunity", name: "Inmunidad a Condiciones Mayores (Beneficio Mayor)", description: "Mientras estás sintonizado con el artefacto, no puedes ser Cegado, Ensordecido, Petrificado ni Aturdido." },
    { id: "maj_ben_ac_2", name: "Baluarte Mayor (+2 CA) (Beneficio Mayor)", description: "Mientras estás sintonizado con el artefacto, obtienes un bonificador de +2 a la Clase de Armadura.", statModifier: { target: "ac", mode: "bonus", value: 2 } },
    { id: "maj_ben_saves", name: "Fortaleza Destinada (+2 Salvaciones) (Beneficio Mayor)", description: "Mientras estás sintonizado con el artefacto, obtienes +2 a todas las Tiradas de Salvación.", statModifier: { target: "savingThrows", mode: "bonus", value: 2 } }
  ],
  minorDetrimental: [
    { id: "min_det_saves", name: "Fragilidad Mental (Perjuicio Menor)", description: "Mientras estás sintonizado con el artefacto, tienes desventaja en las tiradas de salvación contra conjuros." },
    { id: "min_det_poison", name: "Vulnerabilidad a Toxinas (Perjuicio Menor)", description: "Mientras estás sintonizado con el artefacto, tienes desventaja en las tiradas de salvación contra el veneno." },
    { id: "min_det_senses", name: "Sentidos Nublados (Perjuicio Menor)", description: "Estás Cegado y Ensordecido cuando te encuentras a más de 3 metros (10 pies) del artefacto." },
    { id: "min_det_smell", name: "Hedor Sobrenatural (Perjuicio Menor)", description: "Mientras estás sintonizado, emites un olor agrio u aura antinatural perceptible hasta a 3 metros de distancia." },
    { id: "min_det_holy_water", name: "Corrupción de Agua Bendita (Perjuicio Menor)", description: "Mientras estás sintonizado, el agua bendita a 3 metros de ti queda destruida o corrompida." },
    { id: "min_det_weight", name: "Carga Pesada (Perjuicio Menor)", description: "Mientras estás sintonizado, tu peso corporal aumenta en 25 kg y tu velocidad se reduce en 1.5 m si lo sueltas." },
    { id: "min_det_appearance", name: "Marca Física Antinatural (Perjuicio Menor)", description: "Tu apariencia física cambia como decide el DM (ojos incandescentes, piel cenicienta, voz cavernosa) mientras estés sintonizado." }
  ],
  majorDetrimental: [
    { id: "maj_det_rot", name: "Putrefacción Corporal (Perjuicio Mayor)", description: "Mientras estás sintonizado con el artefacto, tu cuerpo se deteriora lentamente y sufres penalización en pruebas de Carisma (Persuasión)." },
    { id: "maj_det_vulnerability", name: "Vulnerabilidad al Daño (Perjuicio Mayor)", description: "Mientras estás sintonizado con el artefacto, tienes vulnerabilidad a un tipo de daño elegido por el DM." },
    { id: "maj_det_madness", name: "Locura Inducida (Perjuicio Mayor)", description: "Al sintonizarte con el artefacto, debes superar una salvación de Sabiduría CD 18 o sufrir una locura indefinida." },
    { id: "maj_det_psychic", name: "Agonía de Sintonización (Perjuicio Mayor)", description: "Cuando te sintonizas con el artefacto por primera vez, sufres 4d10 (o 8d10) de daño psíquico directo." },
    { id: "maj_det_hostile_monsters", name: "Faro de Hostilidad (Perjuicio Mayor)", description: "Las criaturas de un tipo específico (infernal, aberración, no-muerto o celestial) siempre te son hostiles mientras portes el artefacto." },
    { id: "maj_det_ability_drain", name: "Drenaje de Característica (-2) (Perjuicio Mayor)", description: "Mientras estás sintonizado con el artefacto, una de tus puntuaciones de característica elegida al azar se reduce en 2." },
    { id: "maj_det_potion_null", name: "Rechazo Alquímico (Perjuicio Mayor)", description: "Mientras estás sintonizado, las pociones mágicas pierden todo su efecto si las bebes o las llevas encima." }
  ]
};
const DND55_SAMPLE_SPECIAL_ABILITIES = [
  {
    id: "blessing_health",
    name: "Bendici\xF3n de la Salud (Ilm\xE1ter)",
    source: "Bendici\xF3n de Deidad de la Compasi\xF3n",
    description: "Tus puntos de golpe m\xE1ximos aumentan de forma permanente en 10 puntos gracias a la gracia divina.",
    maxUses: 0,
    used: 0,
    recharge: "Pasiva",
    isActive: true,
    statModifiers: [
      { target: "hpMax", mode: "bonus", value: 10 }
    ]
  },
  {
    id: "blessing_protection",
    name: "Bendici\xF3n de Protecci\xF3n (Helm el Vigilante)",
    source: "Bendici\xF3n Divina de Protecci\xF3n",
    description: "Un escudo sagrado invisible te envuelve, otorgando un bonificador de +1 a la Clase de Armadura y +1 a todas las Tiradas de Salvaci\xF3n.",
    maxUses: 0,
    used: 0,
    recharge: "Pasiva",
    isActive: true,
    statModifiers: [
      { target: "ac", mode: "bonus", value: 1 },
      { target: "savingThrows", mode: "bonus", value: 1 }
    ]
  },
  {
    id: "blessing_strength",
    name: "Bendici\xF3n de Fuerza Tit\xE1nica (Kord)",
    source: "Don Sobrenatural de Guerra y Tormentas",
    description: "El poder\xEDo de los gigantes recorre tus m\xFAsculos. Tu puntuaci\xF3n de Fuerza pasa a ser 21 si fuese inferior.",
    maxUses: 0,
    used: 0,
    recharge: "Pasiva",
    isActive: true,
    statModifiers: [
      { target: "str", mode: "override_if_lower", value: 21 }
    ]
  },
  {
    id: "blessing_understanding",
    name: "Bendici\xF3n de la Sabidur\xEDa Trascendental (Oghma)",
    source: "Bendici\xF3n de Deidad del Conocimiento",
    description: "Tu mente se expande para contemplar los secretos de los planos. Tu Sabidur\xEDa aumenta en +2.",
    maxUses: 0,
    used: 0,
    recharge: "Pasiva",
    isActive: true,
    statModifiers: [
      { target: "wis", mode: "bonus", value: 2 }
    ]
  },
  {
    id: "blessing_dragon_focus",
    name: "Bendici\xF3n del Drag\xF3n Interior (Concentraci\xF3n)",
    source: "Don M\xEDstico de la V\xEDa del Drag\xF3n",
    description: "Canaliza el ki ancestral del drag\xF3n. Aumenta la CD de las habilidades de monje en 1.",
    maxUses: 1,
    used: 0,
    recharge: "Descanso Largo",
    isActive: true,
    statModifiers: [
      { target: "monkDc", mode: "bonus", value: 1 }
    ]
  },
  {
    id: "blessing_celerity",
    name: "Bendici\xF3n de Celeridad y Viento (Akadi)",
    source: "Favor de Deidad Elemental",
    description: "Tus pasos se vuelven ligeros como la brisa: obtienes +3 metros a tu velocidad de movimiento y +2 a la Iniciativa.",
    maxUses: 0,
    used: 0,
    recharge: "Pasiva",
    isActive: true,
    statModifiers: [
      { target: "speed", mode: "bonus", value: 3 },
      { target: "initiative", mode: "bonus", value: 2 }
    ]
  },
  {
    id: "blessing_selune",
    name: "Bendici\xF3n de Sel\xFBne (Luz de la Luna Plateada)",
    source: "Bendici\xF3n otorgada por un Dios (Sel\xFBne)",
    description: "Como acci\xF3n adicional, invocas una caricia de luz de luna que ba\xF1a a ti o a un aliado a 9 metros, curando 2d8 + nivel de PG y terminando las condiciones de Cegado o Ensordecido.",
    maxUses: 1,
    used: 0,
    recharge: "Descanso Largo",
    isActive: true
  },
  {
    id: "blessing_tempus",
    name: "Fervor B\xE9lico de Tempus",
    source: "Bendici\xF3n de una Deidad de la Guerra",
    description: "Cuando fallas una tirada de ataque con arma, puedes invocar la bendici\xF3n de Tempus para sumar +1d10 al ataque, convirtiendo potencialmente un fallo en un impacto glorioso.",
    maxUses: 1,
    used: 0,
    recharge: "Descanso Corto",
    isActive: true
  },
  {
    id: "boon_phoenix",
    name: "Don Sobrenatural: F\xE9nix de Fuego",
    source: "Don Sobrenatural",
    description: "Cuando caes a 0 puntos de golpe y no mueres en el acto, una llamarada resurge de tu pecho dej\xE1ndote con 1 PG en su lugar y causando 2d10 de fuego a enemigos adyacentes.",
    maxUses: 1,
    used: 0,
    recharge: "Descanso Largo",
    isActive: true
  },
  {
    id: "boon_wind_lord",
    name: "Favor de Akadi (Alas Celestiales)",
    source: "Favor de Deidad Elemental",
    description: "Como acci\xF3n adicional, obtienes una velocidad de vuelo de 18 metros y no provocas ataques de oportunidad durante 1 minuto.",
    maxUses: 1,
    used: 0,
    recharge: "Descanso Largo",
    isActive: true
  },
  {
    id: "boon_shadow_veil",
    name: "Bendici\xF3n de la Dama del Invierno",
    source: "Pacto Sobrenatural Fe\xE9rico",
    description: "Resistencia permanente al da\xF1o por Fr\xEDo. Una vez por descanso largo puedes crear una niebla g\xE9lida de 6 metros que impone ceguera m\xE1gica a los enemigos.",
    maxUses: 1,
    used: 0,
    recharge: "Descanso Largo",
    isActive: true
  }
];
export {
  DND55_ALL_48_SUBCLASSES,
  DND55_ALL_GENERAL_FEATS,
  DND55_ALL_ORIGIN_FEATS,
  DND55_ARTIFACT_PROPERTIES,
  DND55_CANONICAL_SPELLS,
  DND55_PRESET_ITEMS,
  DND55_SAMPLE_SPECIAL_ABILITIES,
  DND55_SCROLL_LEVEL_STATS
};
