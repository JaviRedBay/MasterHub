---
name: dnd-rules-engine
description: >-
  Guía y mapa de consulta rápida del motor matemático y reglas de D&D 5.5 (PHB 2024 / DMG 2024 / Faerûn) en js/constants/dnd55Rules.js, spellsAndItems.js, bastionsData.js, btrsData.js y storage.js.
  Activa esta habilidad cuando necesites consultar, calcular o modificar reglas de combate, Cansancio, Estados, CA, PG, salvaciones, habilidades, conjuros, maestrías de armas, dotes, subclases, Baluartes (Bastions), sanitización o BTRS sin leer archivos masivos.
---

# Motor de Reglas D&D 5.5 (PHB 2024 / DMG 2024) y Datos Canónicos

Esta habilidad proporciona acceso directo por número de línea a todas las secciones, constantes y funciones matemáticas del sistema para evitar lecturas completas de archivos (~6240 líneas).

## 📍 1. Mapa Completo de `js/constants/dnd55Rules.js` (~6242 líneas)

### A. Cansancio, Estados y Listas Canónicas (L1 - L1315)
- **L10 `getAbilityShortName(key)` / L36 `getAbilityFullName(key)`**: Nombres de características (`FUE`, `Fuerza`, etc.).
- **L50 `DND55_EXHAUSTION_LEVELS`**: Niveles 0 a 6 de Cansancio D&D 2024 (`-2 × nivel` a Pruebas d20 y `-1,5 m × nivel` a Velocidad; Nv 6 = Muerte; Descanso Largo reduce 1 nivel) y helper **L203 `getCharacterExhaustionLevel(char)`**.
- **L60 `DND55_CONDITIONS`**: Los 14 estados canónicos de D&D 2024 (*Agarrado, Apresado, Asustado, Aturdido, Cegado, Derribado, Hechizado, Ensordecido, Envenenado, Incapacitado, Inconsciente, Invisible, Paralizado, Petrificado*) con icono y efectos detallados.
- **L207 `DND55_SKILLS`**: Las 18 habilidades oficiales y su característica asociada.
- **L227 `DND55_SPECIES`**: Especies oficiales y sus `sublineages`.
- **L379 `DND55_BACKGROUNDS`**: Trasfondos oficiales PHB 2024/Faerûn + entrada `"personalizado"` (con `originFeat: ""`).
- **L705 `DND55_CLASSES`**: Las 12 clases oficiales, dado de golpe, salvaciones, competencias y `featuresByLevel`.
- **L1199-L1202**: `DND55_SUBCLASSES`, `DND55_ORIGIN_FEATS`, `DND55_GENERAL_FEATS`, `DND55_FIGHTING_STYLES`.
- **L1204 `DND55_MULTICLASS_RULES`**: Requisitos y competencias obtenidas al multiclasear.

### B. Clases, Niveles, Multiclase y Equipo Inicial (L1321 - L1815)
- **L1321 `getCharacterClasses(char)`**, **L1352 `getClassLevel`**, **L1360 `getCharacterTotalLevel`**, **L1366 `getCharacterFullClassTitle`**.
- **L1399 `getCharacterHitDicePool(char)`** y **L1451 `checkMulticlassPrerequisites(char, targetClassId)`**.
- **L1484 `DND55_CLASS_STARTING_EQUIPMENT`** y **L1665 `getClassStartingEquipment(classId)`**.
- **L1670 `DND55_ARMORS`**, **L1690 `DND55_WEAPONS`**, **L1791 `findCanonicalWeapon(itemOrIdOrName)`**.

### C. Características, Modificadores, XP y Comprobación de Dotes (L1820 - L2250)
- **L1820 `getAbilityModifier(score)`** y **L1823 `formatModifier(mod)`**.
- **L1827 `DND55_XP_THRESHOLDS`**, **L1849 `getMinXpForLevel(level)`**, **L1853 `getNextLevelXp(level)`**.
- **L1858 `getProficiencyBonus(level)`** y **L1869 `getCharacterAsiLevels(classId)`**.
- **L1891 `characterQualifiesForFightingStyle(char)`** y **L1931 `characterHasFeat(char, query)`**.
- **L1983 `calculateFinalAbilityScores(char)`**, **L2077 `calculateAbilityScoresBreakdown(char)`**, **L2212 `getActiveStatModifiers(char)`**.

### D. Combate: CA, Puntos de Golpe, Iniciativa y Velocidad (L2257 - L2760)
- **L2257 `calculateArmorClass(char)`**: CA con armadura, escudos, Defensa sin Armadura (Bárbaro, Monje, Bardo Danza), Armadura de Mago y estilos.
- **L2552 `calculateHitPoints(char)`**: PG máximos (fijo o tiradas por nivel + CON + Dureza + Enano).
- **L2649 `calculateInitiative(char)`**: Mod. DES + Alerta (`+BC`) / Vigilante de Helm + objetos - Cansancio (`-2 × nivel`; en D&D 2024 *Aprendiz de Mucho* no aplica).
- **L2697 `calculateSpeed(char)`**: Velocidad en metros (especie + Monje/Bárbaro/Explorador + dotes - `1,5 m × Cansancio`; `0 m` en Nv 6).

### E. Salvaciones, Habilidades y Sentidos Pasivos (L2763 - L3120)
- **L2763 `calculateSavingThrows(char)`**: Salvaciones de clase inicial + Resiliente + objetos - Cansancio (`-2 × nivel`).
- **L2843 `getMaxAllowedExpertiseCount(char)`** y **L2864 `getMaxAllowedSkillsCount(char)`**.
- **L2904 `calculateSkills(char)`**: Cálculo de las 18 habilidades (incluye penalizador automático de Cansancio `-2 × nivel`).
- **L3051-L3107**: Percepción Pasiva (`calculatePassivePerception` / `Details`), Investigación Pasiva y Perspicacia Pasiva.
- **L3108 `getCharacterVisionSense(char)`**.

### F. Magia, Conjuros, Carga, Dotes y Rasgos (L3125 - L6242)
- **L3125 `getInnateSpellsForCharacter(character)`**.
- **L3322 `calculateSpellcasting(char)`**: CD de salvación (no alterada por cansancio) y ataque de conjuro (`-2 × Cansancio`).
- **L3427 `getCharacterSpellSlots(character, spellSlotsState)`**.
- **L3559 `calculateMonkSaveDc(char)`** y **L3594 `calculateCarryingCapacity(char)`** (en kg).
- **L3636 `getFeatById`**, **L3697 `getFeatName`**, **L3763 `getResolvedFeatsForCharacter`**.
- **L4098 `getBackgroundToolGroups`**, **L4200 `getClassFeatureChoices`**, **L4240 `getScaledFeatureInfo`**, **L4475 `getResolvedCharacterFeatures`**.
- **L4665 `getCharacterProficiencies`**, **L4746 `sanitizeCharacter`**, **L4781 `getSpellAttackInfo`**.
- **L5531 `getConsumableTraitsForCharacter(character)`**.
- **L6094-L6150**: Resolutores de nombres (`getSpeciesName`, `getSublineageName`, `getBackgroundName`, `getClassName`, `getSubclassName`, `getArmorName`, `getWeaponName`).

---

## 📍 2. Mapa de `js/constants/bastionsData.js` (~701 líneas) - Baluartes DMG 2024
- **L7 `BASTION_SPACE_SIZES`**: *Estrecha* (4 cuadros), *Espaciosa* (16 cuadros) y *Vasta* (36 cuadros).
- **L46 `getSpecialFacilitySlotsForLevel(level)`**: Cupo oficial de instalaciones especiales por nivel (Nv 5–8: 2, 9–12: 4, 13–16: 5, 17–20: 6).
- **L55 `BASTION_ORDERS`**: Orden general *Mantener* + 6 órdenes de instalación (*Fabricar, Potenciar, Cosechar, Reclutar, Investigar, Comerciar*).
- **L107 `BASTION_BASIC_FACILITIES`** (9 básicas) y **L119 `BASTION_SPECIAL_FACILITIES`** (29 especiales oficiales de Nv 5, 9, 13 y 17).
- **L535 `BASTION_STAFF_ROLES`**: Roles de asalariados, defensores, lugartenientes, senescales y PNJs.
- **L544 `BASTION_EVENTS_TABLE`** y **L646 `resolveBastionEvent(manualRoll, options)`**: Tabla `1d100` oficial de sucesos con subtablas y tiradas de defensa (`6d6` / `6d8` con Armería, `-1d` por Lugarteniente).

---

## 📍 3. Mapa de `js/constants/spellsAndItems.js` (~6055 líneas), `btrsData.js` (~128 líneas) y `storage.js` (~403 líneas)
- **`spellsAndItems.js`**: `DND55_ALL_48_SUBCLASSES` (L1), `DND55_ALL_ORIGIN_FEATS` (L1266), `DND55_ALL_GENERAL_FEATS` (L1281), `DND55_CANONICAL_SPELLS` (L1369), `DND55_TCE_XGE_ITEMS` (L4307), `DND55_PRESET_ITEMS` (L4444).
- **`btrsData.js`**: Tablas BTRS y `BARGAIN_RULES` (L121).
- **`storage.js`**: `sanitizeCharacter` (L98: incluye `exhaustion`, `conditions`, `isActiveInMasterPanel`), `sanitizeCampaign` (L220: incluye `milestones` y `nextSessionNotes`), `sanitizeBastion` (L254), `parseAndValidateBackup` (L360).

---

## 🚫 Regla de Control de Versiones (Commit y Push)
- **NUNCA realices `git commit`, `git push` ni subas el número de versión (`js/constants/version.js` / `index.html`) de forma autodeterminada.**
- Limítate a aplicar y validar los cambios con `esbuild`, y espera siempre a que el usuario indique explícitamente cuándo subir versión, hacer commit o hacer push.
