---
name: dnd-rules-engine
description: >-
  Guía y mapa de consulta rápida del motor matemático y reglas de D&D 5.5 (PHB 2024 / Faerûn) en js/constants/dnd55Rules.js, spellsAndItems.js, btrsData.js y storage.js.
  Activa esta habilidad cuando necesites consultar, calcular o modificar reglas de combate, CA, PG, salvaciones, habilidades, conjuros, maestrías de armas, dotes, subclases, sanitización o BTRS sin leer archivos masivos.
---

# Motor de Reglas D&D 5.5 (PHB 2024) y Datos Canónicos

Esta habilidad proporciona acceso directo por número de línea a todas las secciones, constantes y funciones matemáticas del sistema para evitar lecturas completas de archivos (~6050 líneas).

## 📍 1. Mapa Completo de `js/constants/dnd55Rules.js` (~6044 líneas)

### A. Listas Canónicas y Constantes Base (L1 - L1160)
- **L10 `getAbilityShortName(key)` / L36 `getAbilityFullName(key)`**: Nombres de características (`FUE`, `Fuerza`, etc.).
- **L50 `DND55_SKILLS`**: Las 18 habilidades oficiales y su característica asociada.
- **L70 `DND55_SPECIES`**: Especies oficiales (Humano, Aasimar, Elfo, Enano, Dracónido, Goliat, Gnomo, Mediano, Orco, Tiefling) y sus `sublineages`.
- **L222 `DND55_BACKGROUNDS`**: Trasfondos oficiales PHB 2024/Faerûn + entrada `"personalizado"` (L539, con `originFeat: ""`).
- **L548 `DND55_CLASSES`**: Las 12 clases oficiales, dado de golpe, salvaciones, competencias y `featuresByLevel`.
- **L1042-L1045**: `DND55_SUBCLASSES`, `DND55_ORIGIN_FEATS`, `DND55_GENERAL_FEATS`, `DND55_FIGHTING_STYLES`.
- **L1047 `DND55_MULTICLASS_RULES`**: Requisitos y competencias obtenidas al multiclasear.

### B. Clases, Niveles, Multiclase y Equipo Inicial (L1164 - L1650)
- **L1164 `getCharacterClasses(char)`**: Lista normalizada de clases `[{ classId, level, subclassId }]`.
- **L1195 `getClassLevel(char, classId)`** y **L1203 `getCharacterTotalLevel(char)`**.
- **L1209 `getCharacterFullClassTitle(char)`** y **L1220 `getCharacterLevelProgression(char)`**.
- **L1242 `getCharacterHitDicePool(char)`**: Pool de dados de golpe por tipo de dado (d6, d8, d10, d12).
- **L1294 `checkMulticlassPrerequisites(char, targetClassId)`**: Valida requisitos de característica ($\ge 13$).
- **L1327 `DND55_CLASS_STARTING_EQUIPMENT`** y **L1508 `getClassStartingEquipment(classId)`**.
- **L1513 `DND55_ARMORS`**, **L1533 `DND55_WEAPONS`**, **L1634 `findCanonicalWeapon(itemOrIdOrName)`**.

### C. Características, Modificadores, XP y Comprobación de Dotes (L1663 - L2099)
- **L1663 `getAbilityModifier(score)`** y **L1666 `formatModifier(mod)`**.
- **L1670 `DND55_XP_THRESHOLDS`**, **L1692 `getMinXpForLevel(level)`**, **L1696 `getNextLevelXp(level)`**.
- **L1701 `getProficiencyBonus(level)`**: Bono de competencia ($+2$ a $+6$).
- **L1712 `getCharacterAsiLevels(classId)`**: Niveles de ASI/Dote (estándar 4, 8, 12, 16, 19 + extras de Guerrero 6/14 y Pícaro 10).
- **L1734 `characterQualifiesForFightingStyle(char)`**: Verifica si clase o dote otorgan estilo de combate (exige `speciesId === 'humano'` para `speciesOriginFeat`).
- **L1774 `characterHasFeat(char, query)`**: Comprueba si el PJ posee una dote (excluye `bgDef.originFeat` cuando `backgroundId === 'personalizado'` y exige `speciesId === 'humano'` para `speciesOriginFeat`).
- **L1826 `calculateFinalAbilityScores(char)`**: Suma base + trasfondo + dotes + ASI + modificadores de objetos equipados.
- **L1920 `calculateAbilityScoresBreakdown(char)`**: Desglose detallado para tooltips.
- **L2055 `getActiveStatModifiers(char)`**: Extrae modificadores activos de objetos equipados/sintonizados y bendiciones.

### D. Combate: CA, Puntos de Golpe, Iniciativa y Velocidad (L2100 - L2585)
- **L2100 `calculateArmorClass(char)`**: CA con armadura, escudos, Defensa sin Armadura (Bárbaro, Monje, Bardo Colegio de la Danza L2257), Armadura de Mago y estilos de combate.
- **L2395 `calculateHitPoints(char)`**: PG máximos (fijo o tiradas por nivel + CON + Dureza + Enano).
- **L2492 `calculateInitiative(char)`**: Mod. DES + Alerta (`+BC`) / Vigilante de Helm + objetos (en D&D 2024 *Aprendiz de Mucho* no aplica a iniciativa al no ser prueba con habilidad).
- **L2533 `calculateSpeed(char)`**: Velocidad en metros (especie + Movimiento sin armadura Monje + Bárbaro + dotes).

### E. Salvaciones, Habilidades y Sentidos Pasivos (L2586 - L2934)
- **L2586 `calculateSavingThrows(char)`**: Salvaciones de clase inicial + dote Resistente + objetos.
- **L2661 `getMaxAllowedExpertiseCount(char)`**: Número máximo de pericias permitidas (Bardo, Pícaro, Explorador, dotes).
- **L2682 `getMaxAllowedSkillsCount(char)`**: Número máximo de competencias en habilidades (trasfondo + especie + clase + dotes).
- **L2722 `calculateSkills(char)`**: Cálculo de las 18 habilidades (solo aplica `speciesSkillChoice` si `speciesId === 'humano'`).
- **L2861-L2917**: Percepción Pasiva (`calculatePassivePerception` / `Details`), Investigación Pasiva (`calculatePassiveInvestigation` / `Details`), Perspicacia Pasiva (`calculatePassiveInsight` / `Details`).
- **L2918 `getCharacterVisionSense(char)`**: Visión en la oscuridad en metros según especie/sublinaje.

### F. Magia, Conjuros, Carga, Dotes y Rasgos (L2935 - L5960)
- **L2935 `getInnateSpellsForCharacter(character)`**: Conjuros innatos por especie/linaje y dotes de origen (Iniciado en Magia).
- **L3132 `calculateSpellcasting(char)`**: CD de salvación y ataque de conjuro.
- **L3232 `getCharacterSpellSlots(character, spellSlotsState)`**: Ranuras de conjuro (multiclase, medio lanzador, magia de pacto).
- **L3364 `calculateMonkSaveDc(char)`** y **L3399 `calculateCarryingCapacity(char)`** (en kg).
- **L3441 `getFeatById(featId)`**, **L3502 `getFeatName(featId)`**, **L3568 `getResolvedFeatsForCharacter(character)`**.
- **L3845 `DND55_STANDARD_LANGUAGES`**, **L3864 `DND55_TOOL_PROFICIENCIES`**, **L3903 `getBackgroundToolGroups(bgDef)`**.
- **L3930 `DND55_CLASS_FEATURE_CHOICES`** y **L4005-L4044**: Resoluciones de opciones de rasgos de clase y subclase.
- **L4045 `getScaledFeatureInfo(...)`**: Escalado de rasgos por nivel (Ataque Furtivo, Concentración Monje, Inspiración Bárdica, etc.).
- **L4280 `getResolvedCharacterFeatures(character)`**: Consolida rasgos de clase, subclase, especie, estilos de combate y dotes.
- **L4470 `getCharacterProficiencies(character)`**: Competencias consolidadas en armaduras, armas y herramientas.
- **L4551 `sanitizeCharacter(character)`**, **L4569 `sanitizeSpellName`**, **L4574 `formatMetricDistance`**, **L4581 `formatMetricDescription`**.
- **L4586 `getSpellAttackInfo(spell, spellStats, characterLevel, castAtLevel)`**: Ataque/CD de conjuro y escalado de daño (upcast/trucos).
- **L5336 `getConsumableTraitsForCharacter(character)`**: Rasgos con usos por descanso corto/largo para Hoja y Master Panel.
- **L5899-L5960**: Resolutores de nombres (`getSpeciesName`, `getSublineageName`, `getBackgroundName`, `getClassName`, `getSubclassName`, `getArmorName`, `getWeaponName`).

---

## 📍 2. Mapa de `js/constants/spellsAndItems.js` (~6055 líneas)
- **L1 `DND55_ALL_48_SUBCLASSES`**: Las 48 subclases oficiales con rasgos por nivel.
- **L1266 `DND55_ALL_ORIGIN_FEATS`**: Dotes de origen (PHB 2024 y Faerûn).
- **L1281 `DND55_ALL_GENERAL_FEATS`**: Dotes generales (nivel 4+) y estilos de combate.
- **L1369 `DND55_CANONICAL_SPELLS`**: Catálogo de >205 conjuros oficiales.
- **L4307 `DND55_TCE_XGE_ITEMS`**: Objetos mágicos de Tasha y Xanathar.
- **L4444 `DND55_PRESET_ITEMS`**: Catálogo de equipo, armas, armaduras, herramientas y consumibles.
- **L5859 `DND55_SCROLL_LEVEL_STATS`**, **L5872 `DND55_ARTIFACT_PROPERTIES`**, **L5914 `DND55_SAMPLE_SPECIAL_ABILITIES`**.

---

## 📍 3. Mapa de `js/constants/btrsData.js` (~128 líneas) y `js/utils/storage.js` (~290 líneas)
- **`btrsData.js` L1-L120**: Tablas de poblaciones, tiendas, rarezas y condiciones del sistema BTRS.
- **`btrsData.js` L121 `BARGAIN_RULES`**: Reglas de regateo con `discountPercent` y `priceMultiplier`.
- **`storage.js` L97 `sanitizeCharacter(char)`**: Sanitiza fichas al cargar/guardar/importar (limpia `speciesSkillChoice`, `speciesOriginFeat` y `speciesOriginFeatChoices` si `speciesId !== 'humano'`, `speciesCantripChoice` si `!== 'elfo'`, `dragonAncestry` si `!== 'draconido'`).
- **`storage.js` L214 `sanitizeCampaign(camp)`**, **L234 `exportStateToJsonFile`**, **L252 `parseAndValidateBackup`**.

---

## 🚫 Regla de Control de Versiones (Commit y Push)
- **NUNCA realices `git commit`, `git push` ni subas el número de versión (`js/constants/version.js` / `index.html`) de forma autodeterminada.**
- Limítate a aplicar y validar los cambios con `esbuild`, y espera siempre a que el usuario indique explícitamente cuándo subir versión, hacer commit o hacer push.
