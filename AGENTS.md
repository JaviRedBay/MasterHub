# Guidelines y Arquitectura para Agentes e IA - Roleplay Master Hub

Este documento es la **fuente de verdad y mapa de acceso rápido** para cualquier agente de IA que trabaje en este repositorio. Su objetivo es **maximizar la velocidad de respuesta, evitar la lectura innecesaria de archivos completos y garantizar la consistencia técnica de D&D 5.5 y BTRS**.

---

## 🚫 Regla Crítica: Control de Versiones (Commit y Push)

- **NUNCA realices `git commit`, `git push` ni subas el número de versión (`js/constants/version.js` / `index.html`) de forma autodeterminada.**
- Aplica los cambios solicitados, verifica que compilen con `esbuild` y **espera siempre a que el usuario pida explícitamente** subir la versión o hacer commit y push.

---

## ⚡ Regla de Oro: Acceso Directo por Líneas (¡NO leas archivos completos!)

Varios archivos de este proyecto superan las 2700-6200 líneas. **NUNCA utilices `read_file` sin especificar `StartLine` y `EndLine`** en estos archivos. Utiliza este índice actualizado (y las skills en `.agents/skills/`) para saltar directamente a la línea exacta:

### 1. `js/constants/dnd55Rules.js` (~6044 líneas)
Motor matemático y reglas oficiales canónicas D&D 5.5 (PHB 2024).

| Sección / Función | Línea aprox. | Descripción |
| :--- | :--- | :--- |
| **Listas Canónicas** | L1 - L1160 | `DND55_SKILLS` (L50), `DND55_SPECIES` (L70), `DND55_BACKGROUNDS` (L222), `DND55_CLASSES` (L548), `DND55_MULTICLASS_RULES` (L1047) |
| **Clases & Multiclase** | L1164 - L1325 | `getCharacterClasses` (L1164), `getClassLevel` (L1195), `getCharacterTotalLevel` (L1203), `getCharacterHitDicePool` (L1242), `checkMulticlassPrerequisites` (L1294) |
| **Equipo Inicial de Clase** | L1327 - L1512 | `DND55_CLASS_STARTING_EQUIPMENT` (L1327), `getClassStartingEquipment` (L1508) |
| **Armas & Armaduras** | L1513 - L1660 | `DND55_ARMORS` (L1513), `DND55_WEAPONS` (L1533), `findCanonicalWeapon` (L1634) |
| **Modificadores, XP & Dotes** | L1663 - L1825 | `getAbilityModifier` (L1663), `getProficiencyBonus` (L1701), `getCharacterAsiLevels` (L1712), `characterQualifiesForFightingStyle` (L1734), `characterHasFeat` (L1774) |
| **Cálculo de Puntuaciones** | L1826 - L2099 | `calculateFinalAbilityScores` (L1826), `calculateAbilityScoresBreakdown` (L1920), `getActiveStatModifiers` (L2055) |
| **Clase de Armadura (CA)** | L2100 - L2394 | `calculateArmorClass` (L2100: armaduras, escudos, defensa sin armadura Bárbaro/Monje/Bardo Danza) |
| **Puntos de Golpe (PG)** | L2395 - L2491 | `calculateHitPoints` (L2395: fórmula fija o dados, bonos de dote y constitución) |
| **Iniciativa & Velocidad** | L2492 - L2585 | `calculateInitiative` (L2492), `calculateSpeed` (L2533) |
| **Salvaciones & Habilidades** | L2586 - L2860 | `calculateSavingThrows` (L2586), `getMaxAllowedExpertiseCount` (L2661), `getMaxAllowedSkillsCount` (L2682), `calculateSkills` (L2722) |
| **Sentidos Pasivos & Visión** | L2861 - L2934 | `calculatePassivePerception/Details` (L2861), `calculatePassiveInvestigation/Details` (L2881), `calculatePassiveInsight/Details` (L2901), `getCharacterVisionSense` (L2918) |
| **Conjuros Innatos** | L2935 - L3131 | `getInnateSpellsForCharacter` (L2935: especie, trasfondo y linajes) |
| **Lanzamiento de Conjuros** | L3132 - L3363 | `calculateSpellcasting` (L3132), `getCharacterSpellSlots` (L3232) |
| **CD Monje & Carga** | L3364 - L3440 | `calculateMonkSaveDc` (L3364), `calculateCarryingCapacity` (L3399, capacidad en kg) |
| **Dotes & Resoluciones** | L3441 - L3929 | `getFeatById` (L3441), `getResolvedFeatsForCharacter` (L3568), `getBackgroundToolGroups` (L3903) |
| **Rasgos Escalados & DC** | L4045 - L4469 | `getScaledFeatureInfo` (L4045), `getResolvedCharacterFeatures` (L4280) |
| **Competencias Consolidadas**| L4470 - L4550 | `getCharacterProficiencies` (L4470: armas, armaduras, escudos y herramientas) |
| **Ataques de Conjuros** | L4586 - L5335 | `getSpellAttackInfo` (L4586: ataque o salvación, daño, escala de ranura upcast) |
| **Consumibles & Descansos** | L5336 - L5898 | `getConsumableTraitsForCharacter` (L5336: rasgos con usos activos para Master Panel) |
| **Resolutores de Nombres** | L5899 - L5960 | `getSpeciesName`, `getSublineageName`, `getBackgroundName`, `getClassName`, `getSubclassName`, `getArmorName`, `getWeaponName` |

---

### 2. `js/constants/spellsAndItems.js` (~6055 líneas)
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
| `DND55_SAMPLE_SPECIAL_ABILITIES`| L5914 | Dones, bendiciones y rasgos sobrenaturales de ejemplo |

---

### 3. `js/modules/characterSheet.js` (~6210 líneas)
Hoja Interactiva de personaje, modales de edición y vista oficial imprimible A4.

| Método / Sección | Línea aprox. | Descripción |
| :--- | :--- | :--- |
| `isProtectedTool` | L92 | Comprueba si una herramienta proviene de clase o trasfondo para impedir borrarla |
| `renderInteractiveSheet` | L402 | Maquetación de la Hoja Interactiva principal (Cabecera, Combate, Atributos) |
| **Breakpoints Top Row** | L610 - L925 | `#sheet-top-col-1` (L612), `#sheet-top-col-2` (L723, ataques L782), `#sheet-top-col-3` (L894) |
| **Secciones Inferiores** | L926 - L1555 | Filtros (L926), Rasgos clase (L955), Dotes (L1056), Especie (L1142), Inventario (L1219), Conjuros (L1412), Bio (L1165/L1494) |
| **Modales `<dialog>`** | L1561 - L2645 | Objeto (L1561), Rasgo (L1917), Monedas (L2002), Idioma (L2040), Herramienta (L2067), Conjuro (L2094), PG Niveles (L2209), Apariencia (L2319), Personalidad (L2369), Habilidades (L2411), Identidad (L2461), Características (L2538), Elección Dote (L2604), Lightbox (L2630) |
| `getEquippedWeapons` | L2653 | Obtención de armas equipadas en inventario |
| `calculateWeaponAttack` | L2706 | Cálculo dinámico de ataque, modificador (FUE/DES/CAR), daño, propiedades y maestría |
| `renderPrintableSheet` | L3044 | Generador de Hoja Oficial Imprimible/exportable A4 en HTML |
| `applyLowerSectionFilter`| L3460 | Filtros de pestañas inferiores (`all`, `features`, `inventory`, `spells`, `bio`) |
| `attachEventListeners` | L3555 | Eventos de combate, descanso, modales, inventario y equipamiento (L3555 - L4912) |
| **Helpers Modales/Equipo**| L4915 - L6210 | `openAbilitiesModal` (L4915), `openEditFeatChoiceModal` (L5081), `toggleEquipArmor/Shield/Weapon` (L5440-L5506), `saveNewInventoryItem` (L5859), `saveOrUpdateTrait` (L6159) |

---

### 4. `js/modules/characterWizard.js` (~2778 líneas)
Asistente guiado de creación y edición (7 Pasos).

| Paso / Método | Línea aprox. | Descripción |
| :--- | :--- | :--- |
| `loadCharacterForEdit` | L130 | Carga un personaje existente en el paso indicado (`targetStep`) limpiando residuos de especie |
| `renderStep1` | L442 | Paso 1: Campaña, nombre del PJ, jugador, alineamiento y retrato |
| `renderStep2` | L529 | Paso 2: Especie, linaje, truco elfo, dote y habilidad de humano |
| `renderStep3` | L632 | Paso 3: Trasfondo (oficiales o personalizado), dote de origen, bonificadores (+2/+1 o +1/+1/+1) |
| `renderStep4` | L858 | Paso 4: Puntuaciones de características (Estándar, Compra 27 pts, 4d6, Manual) |
| `renderStep5` | L1007 | Paso 5: Clase, nivel, multiclase, herramientas de clase, equipo inicial (Paquete, Oro, Manual, Conservar) |
| `renderStep6` | L1535 | Paso 6: Subclases por clase, dotes de nivel y mejoras de características (ASI) |
| `renderStep7` | L1727 | Paso 7: Resumen final y validaciones |
| `attachEventListeners` | L1814 | Eventos interactivos de todos los pasos (cambio de especie en L1971) |
| `saveStepInputs` | L2310 | Sincroniza inputs del DOM con `wizardState` |
| `finishAndSaveCharacter` | L2683 | Guarda el personaje en el Store y redirige a la Hoja Interactiva |

---

### 5. Otros Módulos Frecuentes
- **`js/modules/masterPanel.js` (~834 líneas)**: `render` (L60), `renderCharacterCard` (L186), `attachEventListeners` (L582), `handleSecretPerceptionCheck` (L801).
- **`js/modules/btrsCalculator.js` (~981 líneas)**: `render` (L163), `renderCalculationResult` (L343), `renderShopResult` (L507), `attachEventListeners` (L586), `calculateBtrs` (L744), `generateShopInventory` (L880).
- **`js/utils/pdfExport.js` (~745 líneas)**: `applyTextFieldValue` (L178, parchea `/DA` en campo y widgets), `generateFilledDndPdfBytes` (L288).
- **`js/utils/storage.js` (~290 líneas)**: `sanitizeCharacter` (L97), `sanitizeCampaign` (L214), `parseAndValidateBackup` (L252).
- **`js/state.js` (~907 líneas)**: `init` (L76), `saveCharacter` (L198), `importAllData` (L658), `initRepository` (L703).
- **`js/main.js` (~596 líneas)**: `init` (L32), `closeResponsiveMenu` (L175).

---

## 🛠️ Herramientas de Verificación Rápida

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
