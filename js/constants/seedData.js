/**
 * Datos semilla iniciales para D&D 5.5 (Campañas y Personajes canónicos)
 */

export const DEFAULT_CAMPAIGNS = [
  {
    "id": "camp_strahd",
    "name": "La Maldición de Strahd",
    "description": "Expedición en las sombrías tierras de Barovia bajo la niebla eterna.",
    "gameMaster": "Máster de la Mesa",
    "createdAt": "2026-09-20T16:50:33.179Z",
    "updatedAt": "2026-09-20T16:50:33.179Z"
  },
  {
    "id": "camp_aguasprofundas",
    "name": "Golpe de Dragón en Aguasprofundas",
    "description": "Intriga urbana y búsqueda de tesoros en la Ciudad de los Esplendores.",
    "gameMaster": "DM Elena",
    "createdAt": "2026-09-20T16:50:33.179Z",
    "updatedAt": "2026-09-20T16:50:33.179Z"
  },
  {
    "id": "camp_1789923064960",
    "name": "La mina perdida de Phandelver",
    "description": "Campaña sin descripción.",
    "gameMaster": "Javi",
    "createdAt": "2026-09-20T16:51:04.960Z",
    "updatedAt": "2026-09-20T16:51:04.960Z"
  }
]
;

export const DEFAULT_CHARACTERS = [
  {
    "id": "char_55_1",
    "campaignId": "camp_strahd",
    "name": "Valeros Brazo de Hierro",
    "level": 4,
    "alignment": "Neutral Bueno",
    "playerName": "Marcos",
    "speciesId": "humano",
    "sublineageId": "",
    "speciesSkillChoice": "Percepción",
    "speciesOriginFeat": "Alerta",
    "backgroundId": "soldado",
    "backgroundAbilityBoosts": [
      {
        "ability": "str",
        "bonus": 2
      },
      {
        "ability": "con",
        "bonus": 1
      }
    ],
    "originFeat": "Atacante salvaje",
    "baseAbilityScores": {
      "str": 15,
      "dex": 13,
      "con": 14,
      "int": 10,
      "wis": 12,
      "cha": 8
    },
    "classId": "guerrero",
    "subclassId": "campeon",
    "chosenClassSkills": [
      "Atletismo",
      "Intimidación"
    ],
    "fightingStyle": "defensa",
    "level4Choice": {
      "type": "feat",
      "featId": "gwm",
      "chosenAbility": "str",
      "chosenAbilityBonus": {
        "str": 1
      }
    },
    "classFeatureChoices": {},
    "languages": [
      "Común",
      "Élfico"
    ],
    "tools": [
      "Herramientas de artesano (herrero)"
    ],
    "armorId": "cota_malla",
    "hasShield": true,
    "equippedWeapons": [
      "espada_larga"
    ],
    "inventory": [
      {
        "id": "item_guantes_fuerza_ogro",
        "name": "Guantes de Fuerza de Ogro",
        "quantity": 1,
        "weight": 1,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu puntuación de Fuerza se convierte en 19 mientras lleves puestos estos guantes. No tienen efecto si tu Fuerza ya es de 19 o superior.",
        "statModifiers": [
          {
            "target": "str",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Fuerza fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_cinturon_piel_dragon",
        "name": "Cinturón de Piel de Dragón",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Aumenta la CD de salvación de tus habilidades de monje en 1. Además, una vez por descanso largo, puedes usar una acción para recuperar un número de puntos de concentración (foco) igual a una tirada de tu dado de Artes Marciales.",
        "statModifiers": [
          {
            "target": "monkDc",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a la CD de salvación de habilidades de monje"
          }
        ]
      },
      {
        "id": "item_diadema_intelecto",
        "name": "Diadema del Intelecto",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu Inteligencia se convierte en 19 mientras lleves puesta esta diadema. No tiene efecto si tu Inteligencia ya es 19 o mayor.",
        "statModifiers": [
          {
            "target": "int",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Inteligencia fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_amuleto_salud",
        "name": "Amuleto de Salud",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu Constitución se convierte en 19 mientras lleves puesto este amuleto. No tiene efecto si tu Constitución ya es 19 o mayor.",
        "statModifiers": [
          {
            "target": "con",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Constitución fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_capa_proteccion",
        "name": "Capa de Protección",
        "quantity": 1,
        "weight": 1,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Ganas un bonificador de +1 a la Clase de Armadura y a las tiradas de salvación mientras lleves puesta esta capa.",
        "statModifiers": [
          {
            "target": "ac",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a la Clase de Armadura"
          }
        ]
      },
      {
        "id": "item_potion_heal",
        "name": "Poción de Curación",
        "quantity": 2,
        "weight": 0.25,
        "category": "consumible",
        "description": "Beberla recupera 2d4 + 2 puntos de golpe como acción adicional."
      },
      {
        "id": "item_potion_heal_greater",
        "name": "Poción de Curación Mayor",
        "quantity": 1,
        "weight": 0.25,
        "category": "consumible",
        "description": "Beberla recupera 4d4 + 4 puntos de golpe."
      }
    ],
    "spells": [],
    "spellSlotsState": {},
    "specialAbilities": [
      {
        "id": "blessing_health",
        "name": "Bendición de la Salud (Ilmáter)",
        "source": "Bendición de Deidad de la Compasión",
        "description": "Tus puntos de golpe máximos aumentan de forma permanente en 10 puntos gracias a la gracia divina.",
        "maxUses": 0,
        "used": 0,
        "recharge": "Pasiva",
        "isActive": true,
        "statModifiers": [
          {
            "target": "hpMax",
            "mode": "bonus",
            "value": 10
          }
        ]
      }
    ],
    "hpRollsByLevel": {},
    "createdAt": "2026-09-20T16:50:33.179Z",
    "updatedAt": "2026-09-21T11:19:31.224Z"
  },
  {
    "id": "char_55_2",
    "campaignId": "camp_strahd",
    "name": "Selene Hoja Lunar",
    "level": 3,
    "alignment": "Caótico Bueno",
    "playerName": "Laura",
    "speciesId": "elfo",
    "sublineageId": "elfo_bosques",
    "backgroundId": "criminal",
    "backgroundAbilityBoosts": [
      {
        "ability": "dex",
        "bonus": 2
      },
      {
        "ability": "int",
        "bonus": 1
      }
    ],
    "originFeat": "Alerta",
    "baseAbilityScores": {
      "str": 8,
      "dex": 15,
      "con": 14,
      "int": 13,
      "wis": 12,
      "cha": 10
    },
    "classId": "picaro",
    "subclassId": "ladron",
    "chosenClassSkills": [
      "Acrobacias",
      "Investigación",
      "Perspicacia",
      "Sigilo"
    ],
    "classFeatureChoices": {},
    "languages": [
      "Común",
      "Élfico"
    ],
    "tools": [
      "Herramientas de artesano"
    ],
    "armorId": "cuero_tachonado",
    "hasShield": false,
    "equippedWeapons": [
      "espada_corta",
      "arco_corto"
    ],
    "inventory": [
      {
        "id": "item_guantes_fuerza_ogro",
        "name": "Guantes de Fuerza de Ogro",
        "quantity": 1,
        "weight": 1,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu puntuación de Fuerza se convierte en 19 mientras lleves puestos estos guantes. No tienen efecto si tu Fuerza ya es de 19 o superior.",
        "statModifiers": [
          {
            "target": "str",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Fuerza fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_cinturon_piel_dragon",
        "name": "Cinturón de Piel de Dragón",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Aumenta la CD de salvación de tus habilidades de monje en 1. Además, una vez por descanso largo, puedes usar una acción para recuperar un número de puntos de concentración (foco) igual a una tirada de tu dado de Artes Marciales.",
        "statModifiers": [
          {
            "target": "monkDc",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a la CD de salvación de habilidades de monje"
          }
        ]
      },
      {
        "id": "item_diadema_intelecto",
        "name": "Diadema del Intelecto",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu Inteligencia se convierte en 19 mientras lleves puesta esta diadema. No tiene efecto si tu Inteligencia ya es 19 o mayor.",
        "statModifiers": [
          {
            "target": "int",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Inteligencia fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_amuleto_salud",
        "name": "Amuleto de Salud",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu Constitución se convierte en 19 mientras lleves puesto este amuleto. No tiene efecto si tu Constitución ya es 19 o mayor.",
        "statModifiers": [
          {
            "target": "con",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Constitución fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_capa_proteccion",
        "name": "Capa de Protección",
        "quantity": 1,
        "weight": 1,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Ganas un bonificador de +1 a la Clase de Armadura y a las tiradas de salvación mientras lleves puesta esta capa.",
        "statModifiers": [
          {
            "target": "ac",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a la Clase de Armadura"
          }
        ]
      },
      {
        "id": "item_potion_heal",
        "name": "Poción de Curación",
        "quantity": 2,
        "weight": 0.25,
        "category": "consumible",
        "description": "Beberla recupera 2d4 + 2 puntos de golpe como acción adicional."
      },
      {
        "id": "item_potion_heal_greater",
        "name": "Poción de Curación Mayor",
        "quantity": 1,
        "weight": 0.25,
        "category": "consumible",
        "description": "Beberla recupera 4d4 + 4 puntos de golpe."
      }
    ],
    "spells": [],
    "spellSlotsState": {},
    "specialAbilities": [
      {
        "id": "blessing_health",
        "name": "Bendición de la Salud (Ilmáter)",
        "source": "Bendición de Deidad de la Compasión",
        "description": "Tus puntos de golpe máximos aumentan de forma permanente en 10 puntos gracias a la gracia divina.",
        "maxUses": 0,
        "used": 0,
        "recharge": "Pasiva",
        "isActive": true,
        "statModifiers": [
          {
            "target": "hpMax",
            "mode": "bonus",
            "value": 10
          }
        ]
      }
    ],
    "hpRollsByLevel": {},
    "createdAt": "2026-09-20T16:50:33.179Z",
    "updatedAt": "2026-09-21T11:19:45.455Z"
  },
  {
    "id": "char_55_3",
    "campaignId": "camp_aguasprofundas",
    "name": "Ignis el Destellante",
    "level": 5,
    "alignment": "Caótico Neutral",
    "playerName": "Dani",
    "speciesId": "draconido",
    "sublineageId": "",
    "dragonAncestry": "rojo",
    "backgroundId": "sabio",
    "backgroundAbilityBoosts": [
      {
        "ability": "int",
        "bonus": 2
      },
      {
        "ability": "con",
        "bonus": 1
      }
    ],
    "originFeat": "Iniciado en la magia (mago)",
    "baseAbilityScores": {
      "str": 10,
      "dex": 14,
      "con": 13,
      "int": 15,
      "wis": 12,
      "cha": 8
    },
    "classId": "mago",
    "subclassId": "evocador",
    "chosenClassSkills": [
      "Arcanos",
      "Historia"
    ],
    "level4Choice": {
      "type": "feat",
      "featId": "war_caster",
      "chosenAbility": "str",
      "chosenAbilityBonus": {
        "str": 1
      }
    },
    "classFeatureChoices": {},
    "languages": [
      "Común",
      "Élfico"
    ],
    "tools": [
      "Herramientas de artesano"
    ],
    "armorId": "sin_armadura",
    "hasShield": false,
    "equippedWeapons": [
      "daga"
    ],
    "inventory": [
      {
        "id": "item_guantes_fuerza_ogro",
        "name": "Guantes de Fuerza de Ogro",
        "quantity": 1,
        "weight": 1,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu puntuación de Fuerza se convierte en 19 mientras lleves puestos estos guantes. No tienen efecto si tu Fuerza ya es de 19 o superior.",
        "statModifiers": [
          {
            "target": "str",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Fuerza fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_cinturon_piel_dragon",
        "name": "Cinturón de Piel de Dragón",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Aumenta la CD de salvación de tus habilidades de monje en 1. Además, una vez por descanso largo, puedes usar una acción para recuperar un número de puntos de concentración (foco) igual a una tirada de tu dado de Artes Marciales.",
        "statModifiers": [
          {
            "target": "monkDc",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a la CD de salvación de habilidades de monje"
          }
        ]
      },
      {
        "id": "item_diadema_intelecto",
        "name": "Diadema del Intelecto",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu Inteligencia se convierte en 19 mientras lleves puesta esta diadema. No tiene efecto si tu Inteligencia ya es 19 o mayor.",
        "statModifiers": [
          {
            "target": "int",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Inteligencia fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_amuleto_salud",
        "name": "Amuleto de Salud",
        "quantity": 1,
        "weight": 0.5,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu Constitución se convierte en 19 mientras lleves puesto este amuleto. No tiene efecto si tu Constitución ya es 19 o mayor.",
        "statModifiers": [
          {
            "target": "con",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Constitución fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "item_capa_proteccion",
        "name": "Capa de Protección",
        "quantity": 1,
        "weight": 1,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Ganas un bonificador de +1 a la Clase de Armadura y a las tiradas de salvación mientras lleves puesta esta capa.",
        "statModifiers": [
          {
            "target": "ac",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a la Clase de Armadura"
          }
        ]
      },
      {
        "id": "item_potion_heal",
        "name": "Poción de Curación",
        "quantity": 2,
        "weight": 0.25,
        "category": "consumible",
        "description": "Beberla recupera 2d4 + 2 puntos de golpe como acción adicional."
      },
      {
        "id": "item_potion_heal_greater",
        "name": "Poción de Curación Mayor",
        "quantity": 1,
        "weight": 0.25,
        "category": "consumible",
        "description": "Beberla recupera 4d4 + 4 puntos de golpe."
      }
    ],
    "spells": [
      {
        "id": "descarga_fuego",
        "name": "Descarga de Fuego",
        "level": 0,
        "school": "Evocación",
        "castingTime": "1 acción",
        "range": "36 metros",
        "components": "V, S",
        "duration": "Instantáneo",
        "classes": [
          "mago",
          "hechicero"
        ],
        "description": "Lanzas una mota de fuego a una criatura u objeto. Ataque a distancia con conjuro: inflige 1d10 de daño por fuego (2d10 a nivel 5, 3d10 a nivel 11, 4d10 a nivel 17). Prende objetos inflamables."
      },
      {
        "id": "rayo_escarcha",
        "name": "Rayo de Escarcha",
        "level": 0,
        "school": "Evocación",
        "castingTime": "1 acción",
        "range": "18 metros",
        "components": "V, S",
        "duration": "Instantáneo",
        "classes": [
          "mago",
          "hechicero"
        ],
        "description": "Un rayo blancoazulado gélido. Ataque a distancia con conjuro que causa 1d8 de daño por frío (2d8 a nivel 5, 3d8 a nivel 11, 4d8 a nivel 17) y reduce la velocidad del objetivo en 3 metros hasta el final de su siguiente turno."
      },
      {
        "id": "llama_sagrada",
        "name": "Llama Sagrada",
        "level": 0,
        "school": "Evocación",
        "castingTime": "1 acción",
        "range": "18 metros",
        "components": "V, S",
        "duration": "Instantáneo",
        "classes": [
          "clerigo"
        ],
        "description": "Un resplandor celestial desciende sobre una criatura que veas. Salvación de Destreza: si falla sufre 1d8 de daño radiante (2d8 a nivel 5, 3d8 a nivel 11, 4d8 a nivel 17). El objetivo no obtiene beneficio de coberturas."
      },
      {
        "id": "estallido_sobrenatural",
        "name": "Descarga Sobrenatural",
        "level": 0,
        "school": "Evocación",
        "castingTime": "1 acción",
        "range": "36 metros",
        "components": "V, S",
        "duration": "Instantáneo",
        "classes": [
          "brujo"
        ],
        "description": "Un haz de energía crepitante. Ataque a distancia que causa 1d10 de daño de fuerza. Evoluciona con tu nivel: 2 rayos a nivel 5, 3 rayos a nivel 11 y 4 rayos a nivel 17 (pudiendo apuntar al mismo objetivo o a varios)."
      }
    ],
    "spellSlotsState": {},
    "specialAbilities": [
      {
        "id": "blessing_health",
        "name": "Bendición de la Salud (Ilmáter)",
        "source": "Bendición de Deidad de la Compasión",
        "description": "Tus puntos de golpe máximos aumentan de forma permanente en 10 puntos gracias a la gracia divina.",
        "maxUses": 0,
        "used": 0,
        "recharge": "Pasiva",
        "isActive": true,
        "statModifiers": [
          {
            "target": "hpMax",
            "mode": "bonus",
            "value": 10
          }
        ]
      }
    ],
    "hpRollsByLevel": {},
    "createdAt": "2026-09-20T16:50:33.179Z",
    "updatedAt": "2026-09-21T11:19:54.811Z"
  },
  {
    "id": "dnd55_1789923492844",
    "campaignId": "camp_1789923064960",
    "name": "Sor Bete",
    "level": 5,
    "alignment": "Neutral Bueno",
    "playerName": "Moraxo",
    "speciesId": "humano",
    "sublineageId": "",
    "speciesSkillChoice": "Persuasión",
    "speciesOriginFeat": "Afortunado",
    "backgroundId": "ermitano",
    "backgroundAbilityBoosts": [
      {
        "ability": "wis",
        "bonus": 2
      },
      {
        "ability": "con",
        "bonus": 1
      }
    ],
    "originFeat": "Sanador",
    "baseAbilityScores": {
      "str": 8,
      "dex": 9,
      "con": 13,
      "int": 14,
      "wis": 18,
      "cha": 14
    },
    "classId": "clerigo",
    "subclassId": "dominio_vida",
    "chosenClassSkills": [
      "Historia",
      "Perspicacia"
    ],
    "level4Choice": {
      "type": "feat",
      "featId": "experto_habilidades",
      "chosenAbility": "dex",
      "chosenAbilityBonus": {
        "dex": 1
      },
      "skillExpertProficiency": "Investigación",
      "skillExpertExpertise": "Persuasión"
    },
    "classFeatureChoices": {
      "orden_divina": "taumaturgo"
    },
    "languages": [
      "Común",
      "Élfico",
      "Lenguaje de Signos"
    ],
    "tools": [
      "Útiles de herboristería"
    ],
    "armorId": "cota_malla",
    "hasShield": true,
    "equippedWeapons": [
      "maza"
    ],
    "inventory": [
      {
        "id": "item_potion_heal",
        "name": "Poción de Curación",
        "quantity": 2,
        "weight": 0.5,
        "category": "consumible",
        "description": "Beberla recupera 2d4 + 2 puntos de golpe como acción adicional."
      },
      {
        "id": "item_potion_heal_greater",
        "name": "Poción de Curación Mayor",
        "quantity": 1,
        "weight": 0.5,
        "category": "consumible",
        "description": "Beberla recupera 4d4 + 4 puntos de golpe."
      },
      {
        "id": "item_rations",
        "name": "Raciones de Viaje (1 día)",
        "quantity": 5,
        "weight": 2,
        "category": "consumible",
        "description": "Alimento seco nutritivo para mantener a un aventurero durante un día de viaje."
      },
      {
        "id": "item_torches",
        "name": "Antorchas",
        "quantity": 3,
        "weight": 1,
        "category": "equipo",
        "description": "Arde durante 1 hora proporcionando luz brillante en 20 pies y luz tenue en otros 20."
      },
      {
        "id": "item_rope",
        "name": "Cuerda de Cáñamo (15 m / 50 pies)",
        "quantity": 1,
        "weight": 10,
        "category": "equipo",
        "description": "Cuerda resistente para escaladas y atar prisioneros o equipo."
      },
      {
        "id": "item_bedroll",
        "name": "Saco de Dormir (Bedroll)",
        "quantity": 1,
        "weight": 7,
        "category": "equipo",
        "description": "Aislamiento esencial para descansar en campamentos a la intemperie."
      },
      {
        "id": "item_waterskin",
        "name": "Odre de Agua",
        "quantity": 1,
        "weight": 5,
        "category": "equipo",
        "description": "Contiene 2 litros de agua fresca para la travesía."
      },
      {
        "id": "custom_item_1789939735835",
        "name": "Coraza (Breastplate) +1",
        "quantity": 1,
        "weight": 50,
        "category": "armadura",
        "description": "CA Base: 14 (Máx DES +2)",
        "isAttuned": false,
        "armorType": "coraza",
        "magicBonus": 1,
        "isEquipped": true
      },
      {
        "id": "item_1789946363176_0fd0",
        "name": "Guantes de Fuerza de Ogro",
        "quantity": 1,
        "weight": 1,
        "category": "magico",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "description": "Tu puntuación de Fuerza se convierte en 19 mientras lleves puestos estos guantes. No tienen efecto si tu Fuerza ya es de 19 o superior.",
        "statModifiers": [
          {
            "target": "str",
            "mode": "override_if_lower",
            "value": 19,
            "description": "Fuerza fijada en 19 si es inferior"
          }
        ]
      },
      {
        "id": "custom_item_1789946461144",
        "name": "Anillo de Protección Netherés",
        "quantity": 1,
        "weight": 0.1,
        "category": "magico",
        "description": "Obtienes un bonificador de +1 a la CA y a todas las tiradas de salvación. +4 contra desarmado",
        "requiresAttunement": true,
        "isAttuned": true,
        "isEquipped": true,
        "statModifiers": [
          {
            "target": "ac",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a la CA"
          },
          {
            "target": "savingThrows",
            "mode": "bonus",
            "value": 1,
            "description": "+1 a todas las tiradas de salvación"
          }
        ]
      },
      {
        "id": "custom_item_1789979415229",
        "name": "Portadora de Luz",
        "quantity": 1,
        "weight": 2,
        "category": "arma",
        "description": "Daño: 1d6+1 Contundente | Maestría: Debilitar",
        "requiresAttunement": false,
        "isAttuned": false,
        "weaponType": "maza",
        "magicBonus": 1,
        "isEquipped": true,
        "specialAction": "Se ilumina a voluntad; si está iluminada hace 1d6 Radiante adicional contra no-muertos."
      },
      {
        "id": "item_1789979459668_bsw8",
        "name": "Símbolo Sagrado (Amuleto)",
        "quantity": 1,
        "weight": 0.5,
        "category": "equipo",
        "description": "Foco de canalización divina para clérigos y paladines.",
        "isEquipped": true,
        "isAttuned": false
      },
      {
        "id": "custom_item_1789979479950",
        "name": "Maza",
        "quantity": 1,
        "weight": 2,
        "category": "arma",
        "description": "Daño: 1d6 Contundente | Maestría: Debilitar",
        "requiresAttunement": false,
        "isAttuned": false,
        "weaponType": "maza",
        "isEquipped": false
      },
      {
        "id": "custom_item_1789986116298",
        "name": "Ballesta Ligera",
        "quantity": 1,
        "weight": 2.5,
        "category": "arma",
        "description": "Daño: 1d8 Perforante (Munición (alcance 24/96 m), Carga, Dos Manos) | Maestría: Ralentizar",
        "requiresAttunement": false,
        "isAttuned": false,
        "weaponType": "ballesta_ligera",
        "isEquipped": false
      },
      {
        "id": "custom_item_1789987133680",
        "name": "Escudo (+2 CA)",
        "quantity": 1,
        "weight": 3,
        "category": "armadura",
        "description": "CA Base: 2",
        "requiresAttunement": false,
        "isAttuned": false,
        "armorType": "escudo",
        "isEquipped": true
      }
    ],
    "spells": [
      {
        "id": "llama_sagrada",
        "name": "Llama Sagrada",
        "level": 0,
        "school": "Evocación",
        "castingTime": "1 acción",
        "range": "18 m",
        "components": "V, S",
        "duration": "Instantáneo",
        "description": "Un resplandor celestial desciende sobre una criatura que veas. Salvación de Destreza: si falla sufre 1d8 de daño radiante. El objetivo no obtiene beneficio de coberturas.",
        "showInAttacks": true
      },
      {
        "id": "spell_1789939884205_syag",
        "name": "Guía",
        "level": 0,
        "school": "Adivinación",
        "castingTime": "1 acción",
        "range": "Toque",
        "components": "V, S",
        "duration": "Concentración, hasta 1 min",
        "classes": [
          "clerigo",
          "druida"
        ],
        "description": "Tocas a una criatura voluntaria. Una vez antes de que termine el conjuro, el objetivo puede sumar un dado de 1d4 a una prueba de característica de su elección.",
        "prepared": true
      },
      {
        "id": "spell_1789939896525_lw9r",
        "name": "Espíritus Guardianes",
        "level": 3,
        "school": "Conjuración",
        "castingTime": "1 acción",
        "range": "Personal (radio 4,5 m)",
        "components": "V, S, M",
        "duration": "Concentración, hasta 10 min",
        "classes": [
          "clerigo"
        ],
        "description": "Invocas espíritus que te orbitan en un radio de 4,5 metros. La velocidad de los enemigos en el área se reduce a la mitad y sufren 3d8 de daño radiante o necrótico si fallan salvación de Sabiduría.",
        "prepared": true,
        "showInAttacks": false
      },
      {
        "id": "spell_1789939901289_4hte",
        "name": "Curar Heridas",
        "level": 1,
        "school": "Abjuración",
        "castingTime": "1 acción",
        "range": "Toque",
        "components": "V, S",
        "duration": "Instantáneo",
        "classes": [
          "bardo",
          "clerigo",
          "druida",
          "paladin",
          "explorador"
        ],
        "description": "En D&D 5.5, una criatura que tocas recupera 2d8 + tu modificador de característica de lanzamiento de conjuros (+2d8 por cada nivel superior).",
        "prepared": true
      },
      {
        "id": "spell_1789939905539_jcl9",
        "name": "Palabra de Curación",
        "level": 1,
        "school": "Abjuración",
        "castingTime": "1 acción adicional",
        "range": "18 m",
        "components": "V",
        "duration": "Instantáneo",
        "classes": [
          "bardo",
          "clerigo",
          "druida"
        ],
        "description": "Una palabra reconfortante a distancia. Una criatura visible a 18 metros recupera 2d4 + tu modificador de lanzamiento de conjuros como acción adicional.",
        "prepared": true
      },
      {
        "id": "spell_1789939908673_q8kf",
        "name": "Bendición",
        "level": 1,
        "school": "Encantamiento",
        "castingTime": "1 acción",
        "range": "9 m",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 min",
        "classes": [
          "clerigo",
          "paladin"
        ],
        "description": "Bendices hasta 3 criaturas a tu elección dentro del alcance. Cada vez que realicen una tirada de ataque o salvación, suman 1d4 al resultado de su tirada.",
        "prepared": true
      },
      {
        "id": "spell_1789939912848_6rt7",
        "name": "Saeta Guía",
        "level": 1,
        "school": "Evocación",
        "castingTime": "1 acción",
        "range": "36 m",
        "components": "V, S",
        "duration": "1 asalto",
        "classes": [
          "clerigo"
        ],
        "description": "Un destello de luz sagrada. Ataque a distancia con conjuro que causa 4d6 de daño radiante. La siguiente tirada de ataque contra el objetivo tiene ventaja.",
        "prepared": true,
        "showInAttacks": true
      },
      {
        "id": "spell_1789939917739_f6cp",
        "name": "Inmovilizar Persona",
        "level": 2,
        "school": "Encantamiento",
        "castingTime": "1 acción",
        "range": "18 m",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 min",
        "classes": [
          "bardo",
          "clerigo",
          "druida",
          "hechicero",
          "mago",
          "brujo"
        ],
        "description": "Elige un humanoide que veas dentro del alcance. Debe superar una tirada de salvación de Sabiduría o queda Paralizado por la duración (ataques a 1,5 metros son críticos automáticos).",
        "prepared": true,
        "showInAttacks": false
      }
    ],
    "spellSlotsState": {
      "1": {
        "max": 4,
        "used": 0
      },
      "2": {
        "max": 3,
        "used": 0
      },
      "3": {
        "max": 2,
        "used": 0
      }
    },
    "specialAbilities": [
      {
        "id": "custom_ability_1789978959631",
        "name": "Bendición de la Salud",
        "source": "Tyr",
        "recharge": "Pasiva",
        "maxUses": 0,
        "used": 0,
        "description": "Aumenta en +2 la Constitución y el máximo a 22",
        "isActive": true,
        "statModifiers": [
          {
            "target": "con",
            "mode": "bonus",
            "value": 2
          }
        ]
      }
    ],
    "hpRollsByLevel": {
      "2": {
        "level": 2,
        "mode": "average",
        "dieValue": 5
      },
      "3": {
        "level": 3,
        "mode": "average",
        "dieValue": 5
      },
      "4": {
        "level": 4,
        "mode": "average",
        "dieValue": 5
      },
      "5": {
        "level": 5,
        "mode": "average",
        "dieValue": 5
      }
    },
    "createdAt": "2026-09-20T16:58:12.844Z",
    "updatedAt": "2026-09-21T16:12:06.882Z",
    "currentHp": 43
  }
];
