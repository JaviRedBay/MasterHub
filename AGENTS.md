# Guidelines y Arquitectura para Agentes e IA - Roleplay Master Hub

Este documento es la **fuente de verdad y mapa de acceso rápido** para cualquier agente de IA que trabaje en este repositorio. Su objetivo es **maximizar la velocidad de respuesta, evitar la lectura innecesaria de archivos completos y garantizar la consistencia técnica de D&D 5.5 y BTRS**.

---

## ⚡ Regla de Oro: Acceso Directo por Líneas (¡NO leas archivos completos!)

Varios archivos de este proyecto superan las 3000-6000 líneas. **NUNCA utilices `read_file` sin especificar `StartLine` y `EndLine`** en estos archivos mastodónticos. Utiliza este índice para saltar directamente a la línea exacta:

### 1. `js/constants/dnd55Rules.js` (~5970 líneas)
Motor matemático y reglas oficiales canónicas D&D 5.5 (PHB 2024).

| Sección / Función | Línea aprox. | Descripción |
| :--- | :--- | :--- |
| **Listas Canónicas** | L1 - L1160 | `DND55_SPECIES` (L70), `DND55_BACKGROUNDS` (L222), `DND55_CLASSES` (L548), `DND55_MULTICLASS_RULES` (L1047) |
| **Clases & Multiclase** | L1164 - L1320 | `getCharacterClasses`, `getClassLevel`, `getCharacterTotalLevel`, `checkMulticlassPrerequisites` |
| **Equipo Inicial de Clase** | L1327 - L1512 | `DND55_CLASS_STARTING_EQUIPMENT`, `getClassStartingEquipment` |
| **Armas & Armaduras** | L1513 - L1650 | `DND55_ARMORS`, `DND55_WEAPONS`, `findCanonicalWeapon` |
| **Modificadores & ASI** | L1663 - L1790 | `getAbilityModifier`, `formatModifier`, `getProficiencyBonus`, `getCharacterAsiLevels` |
| **Cálculo de Puntuaciones** | L1795 - L2020 | `calculateFinalAbilityScores`, `calculateAbilityScoresBreakdown` |
| **Clase de Armadura (CA)** | L2069 - L2350 | `calculateArmorClass` (Desglose exacto, armaduras, escudos, defensa sin armadura) |
| **Puntos de Golpe (PG)** | L2364 - L2460 | `calculateHitPoints` (Fórmula fija o dados, bonos de dote y constitución) |
| **Iniciativa & Velocidad** | L2461 - L2550 | `calculateInitiative`, `calculateSpeed` |
| **Salvaciones & Habilidades** | L2555 - L2780 | `calculateSavingThrows`, `calculateSkills`, `getMaxAllowedExpertiseCount` |
| **Sentidos Pasivos & Visión** | L2790 - L2860 | `calculatePassivePerception/Details`, `calculatePassiveInvestigation/Details`, `calculatePassiveInsight/Details`, `getCharacterVisionSense` |
| **Conjuros Innatos** | L2864 - L3060 | `getInnateSpellsForCharacter` (Especie, trasfondo y linajes) |
| **Lanzamiento de Conjuros** | L3061 - L3290 | `calculateSpellcasting`, `getCharacterSpellSlots` |
| **CD Monje & Carga** | L3293 - L3369 | `calculateMonkSaveDc`, `calculateCarryingCapacity` (Capacidad en kg) |
| **Dotes & Resoluciones** | L3370 - L3830 | `getFeatById`, `getResolvedFeatsForCharacter`, `getBackgroundToolGroups` |
| **Rasgos Escalados & DC** | L3974 - L4200 | `getScaledFeatureInfo` (Ataque furtivo, ki/concentración monje, artes marciales, etc.) |
| **Competencias Consolidadas**| L4399 - L4479 | `getCharacterProficiencies` (Armas, armaduras, escudos y herramientas fijas/elegidas) |
| **Ataques de Conjuros** | L4515 - L5260 | `getSpellAttackInfo` (Ataque o salvación, daño, escala de ranura upcast) |
| **Consumibles & Descansos** | L5265 - L5820 | `getConsumableTraitsForCharacter` (Rasgos con usos activos para Master Panel) |
| **Resolutores de Nombres** | L5828 - L5881 | `getSpeciesName`, `getBackgroundName`, `getClassName`, `getSubclassName`, `getArmorName`, `getWeaponName` |

---

### 2. `js/constants/spellsAndItems.js` (~5950 líneas)
Base de datos canónica de contenido expandido y catálogo de objetos/conjuros.

| Constante | Línea | Contenido |
| :--- | :--- | :--- |
| `DND55_ALL_48_SUBCLASSES` | L1 | Todas las 48 subclases oficiales (PHB 2024 y clásicas Faerûn) |
| `DND55_ALL_ORIGIN_FEATS` | L1266 | Dotes de origen |
| `DND55_ALL_GENERAL_FEATS` | L1281 | Dotes generales (nivel 4+) |
| `DND55_CANONICAL_SPELLS` | L1369 | Catálogo de más de 205 conjuros oficiales con escuela, nivel, daño y efectos |
| `DND55_TCE_XGE_ITEMS` | L4307 | Objetos mágicos y especiales de Tasha (TCoE) y Xanathar (XGtE) |
| `DND55_PRESET_ITEMS` | L4444 | Catálogo de equipo, paquetes iniciales, armas, armaduras, herramientas y consumibles |
| `DND55_SCROLL_LEVEL_STATS`| L5859 | Estadísticas de pergaminos mágicos por nivel |
| `DND55_ARTIFACT_PROPERTIES`| L5872 | Propiedades benéficas y perjudiciales de artefactos |

---

### 3. `js/modules/characterSheet.js` (~6070 líneas)
Hoja Interactiva de personaje y vista oficial imprimible.

| Método / Lógica | Línea aprox. | Descripción |
| :--- | :--- | :--- |
| `isProtectedTool` | L88 | Comprueba si una herramienta proviene de clase o trasfondo para impedir borrarla |
| `renderInteractiveSheet` | L384 | Maquetación de la Hoja Interactiva principal (Parchment Box, Combate, Atributos) |
| **Breakpoints Top Row** | L566 - L860 | Distribución responsiva: 1 col (<768px), 2 cols (768px-1280px tablet), 3 cols (>1280px desktop) |
| `getEquippedWeapons` | L2576 | Obtención de armas equipadas en inventario |
| `calculateWeaponAttack` | L2627 | Cálculo dinámico de ataque, modificador (FUE/DES/CAR), daño, propiedades y maestría |
| `renderPrintableSheet` | L2965 | Generador de Hoja Oficial Imprimible/exportable A4 |
| `applyLowerSectionFilter`| L3381 | Filtros de pestañas inferiores (`all`, `features`, `inventory`, `spells`, `bio`) |
| `attachEventListeners` | L3476 | Eventos de combate, descanso, gestión de inventario, equipar armas/armaduras |

---

### 4. `js/modules/characterWizard.js` (~2580 líneas)
Asistente guiado de creación y edición (7 Pasos).

| Paso / Método | Línea aprox. | Descripción |
| :--- | :--- | :--- |
| `loadCharacterForEdit` | L117 | Carga un personaje existente en el asistente protegiendo inventario y opciones |
| `renderStep1` | L413 | Paso 1: Campaña, nombre del PJ, jugador, alineamiento |
| `renderStep2` | L469 | Paso 2: Especie, linaje, dote y habilidad de humano |
| `renderStep3` | L572 | Paso 3: Trasfondo (oficiales o personalizado), dote de origen, bonificadores (+2/+1 o +1/+1/+1) |
| `renderStep4` | L798 | Paso 4: Puntuaciones de características (Estándar, Compra 27 pts, 4d6, Manual) |
| `renderStep5` | L947 | Paso 5: Clase, herramientas de clase, equipo inicial oficial (Paquete, Oro, Manual) |
| `renderStep6` | L1475 | Paso 6: Subclases por clase, dotes de nivel y mejoras de características (ASI) |
| `renderStep7` | L1667 | Paso 7: Resumen final y validaciones |
| `finishAndSaveCharacter` | L2509 | Guarda el personaje en el Store y redirige a la Hoja Interactiva |

---

## 🛠️ Herramientas de Verificación Rápida

Para verificar cambios en segundos sin levantar navegadores ni procesos lentos:

### 1. Comprobación de Compilación y Sintaxis (Instantáneo)
Ejecuta el binario local de `esbuild` para validar el empaquetado y sintaxis en < 50ms:
```powershell
& "C:\Users\Wargo\source\repos\roleplay-master-utility-hub\package\esbuild.exe" js/main.js --bundle --outfile=nul --format=esm
```

### 2. Ejecución de Scripts de Prueba con Node.js
Usa el binario de Node disponible en el sistema para ejecutar pruebas unitarias o de integración:
```powershell
& "C:\Program Files\dotnet\packs\Microsoft.NET.Runtime.Emscripten.2.0.23.Node.win-x64\6.0.36\tools\bin\node.exe" -e "..."
```

---

## 📐 Convenciones Arquitectónicas Fundamentales

1. **Persistencia y Reactividad (`js/state.js`)**:
   - Todo cambio a un personaje DEBE persistirse mediante `store.saveCharacter(character)`.
   - El store emite eventos Pub/Sub (`character:saved`, `character:updated`, `campaign:selected`, `wizard:edit-character`).
   - Los módulos se suscriben en sus métodos `initListeners()` para auto-actualizarse.

2. **Estilo Visual y Variables CSS (`css/style.css` y `css/themes/`)**:
   - NUNCA uses colores fijos `#fff`, `#000` o clases estáticas de Bootstrap como `btn-dark` sin variables RPG en componentes del juego.
   - Usa siempre las variables semánticas:
     - Fondos: `var(--rpg-navbar-bg)`, `var(--rpg-dark-surface)`, `var(--rpg-dark-card)`
     - Texto: `var(--rpg-text)`, `var(--rpg-text-soft)`, `var(--rpg-navbar-fg)`
     - Acentos: `var(--rpg-gold)`, `var(--rpg-gold-light)`, `var(--rpg-crimson)`
     - Bordes: `var(--rpg-line)`, `var(--rpg-line-mid)`

3. **Sistema Métrico y Reglas D&D 5.5**:
   - Distancias en **metros** ($1,5\text{ m} = 5\text{ pies}$, $9\text{ m} = 30\text{ pies}$).
   - Pesos en **kilogramos** ($1\text{ lb} \approx 0,45\text{ kg}$).
   - Las herramientas fijas o elegidas por clase/trasfondo están protegidas de borrado accidental en la hoja.

4. **Diseño Multi-dispositivo (PC, Tablet y Móvil) y Compacidad de UI**:
   - La aplicación web está diseñada para utilizarse activamente tanto en **PCs como en tablets y teléfonos móviles**.
   - **Regla obligatoria al generar nuevos elementos de interfaz**: Cualquier botón, control, input, badge o bloque nuevo debe ser **compacto y contenido** (`py-0 px-1`, `btn-sm`, `form-control-sm`, `flex-wrap`, fuentes y márgenes ajustados) para **no ocupar demasiado espacio vertical ni horizontal en la vista móvil o tablet**. Evita botoneras grandes, paddings excesivos o anchos fijos que desborden en pantallas pequeñas.
   - Breakpoints de la Hoja Interactiva:
     - **Móvil (< 768px)**: 1 columna.
     - **Tablet (768px a 1280px inclusive)**: 2 columnas (Combate/Ataques ocupa el 66.7%).
     - **Escritorio (> 1280px)**: 3 columnas lado a lado.

