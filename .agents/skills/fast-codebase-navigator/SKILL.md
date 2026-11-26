---
name: fast-codebase-navigator
description: >-
  Herramientas de navegación ultrarrápida, mapa de archivos del proyecto y comandos de PowerShell para inspeccionar el repositorio en milisegundos sin consumir contexto ni leer archivos completos.
  Activa esta habilidad cuando necesites localizar código, buscar constantes, validar sintaxis con esbuild, ejecutar tests rápidos con Node o gestionar versiones/git cuando el usuario lo solicite.
---

# Navegación Ultrarrápida, Mapa del Proyecto y Verificación

Esta habilidad permite localizar cualquier sección del repositorio en milisegundos sin lecturas masivas.

## 🗺️ Índice Rápido de Archivos del Proyecto

| Archivo | Líneas aprox. | Contenido y Secciones Clave |
| :--- | :--- | :--- |
| `index.html` | ~496 | Cabecera `.rpg-navbar` (L60), badge `#app-version-badge` (L67), menú colapsable vertical `<=1280px` `#rpg-responsive-menu` (L111), pestañas `#app-tabs` (`Campañas -> Master Panel -> Asistente -> Hoja -> Baluartes -> BTRS -> Nombres`), secciones de vistas y `#repo-busy-loader`. |
| `js/main.js` | ~699 | `init()` (L33), router de pestañas (`switchTab` L94), tooltips flotantes globales `setupFloatingTooltips()` (L187), `closeResponsiveMenu()` (L260), dados rápidos, respaldo y sincronización UI (`updateRepoUI` L540). |
| `js/state.js` | ~1001 | Store Pub/Sub: `init()` (L76), campañas (`saveCampaign` L130), personajes (`saveCharacter` L204), baluartes (`saveBastion` L261), Cansancio/Estados (`updateCharacterExhaustion` L288, `toggleCharacterCondition` L296), descansos (`applyLongRest` L635 reduce 1 cansancio), `exportState`/`importState` (L732) y repositorio (`initRepository` L797). |
| `js/constants/version.js` | ~7 | `APP_VERSION` (L5) y `APP_VERSION_LABEL` (L6). |
| `js/constants/dnd55Rules.js` | ~6242 | Motor D&D 5.5: Cansancio (L50), 14 Estados (L60), listas canónicas, combate, habilidades, conjuros y consumibles (ver mapa en `dnd-rules-engine`). |
| `js/constants/bastionsData.js` | ~701 | Catálogo DMG 2024 de Baluartes: espacios (L7), cupos por nivel (L46), órdenes (L55), 9 básicas (L107), 29 especiales (L119), roles PNJ (L535) y sucesos `1d100` (`resolveBastionEvent` L646). |
| `js/constants/spellsAndItems.js` | ~6055 | 48 subclases (L1), dotes de origen (L1266), dotes generales (L1281), >205 conjuros (L1369), objetos Tasha/Xanathar (L4307), equipo preset (L4444). |
| `js/constants/btrsData.js` | ~128 | Tablas BTRS y `BARGAIN_RULES` (L121). |
| `js/modules/characterSheet.js` | ~6303 | Hoja Interactiva (L405), Cansancio/Estados (L780), Modales (L1615-L2700), Armas (L2763), Hoja A4 (L3104), Eventos (L3615). |
| `js/modules/characterWizard.js` | ~2778 | Asistente 7 pasos: `loadCharacterForEdit` (L130), Pasos 1–7 (L442–L1727), Eventos (L1814), `saveStepInputs` (L2310), `finishAndSaveCharacter` (L2683). |
| `js/modules/masterPanel.js` | ~950 | Master Panel: `render` tabla resumen compacta (L65), `renderCharacterCard` (L222, Cansancio/Estados en L384), `attachEventListeners` (L649). |
| `js/modules/dnd55Manager.js` | ~415 | Campañas & Roster: campañas, roster, Hitos de campaña (L133) y Notas para siguiente sesión (L195). |
| `js/modules/bastionManager.js` | ~1398 | Módulo de Baluartes DMG 2024: espacios (`calculateSpaceMetrics` L53), economía (`calculateTurnEconomy` L96), `render` (L161), modales (L665) y eventos/planos (L959). |
| `js/modules/btrsCalculator.js` | ~981 | Calculadora BTRS: `render` (L163), `renderCalculationResult` (L343), `renderShopResult` (L507), `calculateBtrs` (L744). |
| `js/utils/pdfExport.js` | ~745 | Exportador AcroForm PDF: `applyTextFieldValue` (L178), `generateFilledDndPdfBytes` (L288). |
| `js/utils/storage.js` | ~403 | `sanitizeCharacter` (L98), `sanitizeCampaign` (L220), `sanitizeBastion` (L254), `parseAndValidateBackup` (L360). |
| `js/utils/fileRepository.js` | ~844 | Sincronización Carpeta Local y Google Drive (`campaigns.json`, `bastions.json`, `characters/*.json`, `master_backup_full.json`). |
| `css/style.css` | ~1757 | Variables base, `.rpg-navbar` y menú vertical `<=1280px` (L158), `#rpg-floating-tooltip` (L959), `.sheet-identity-grid` y breakpoints Hoja (L1370). |

---

## ⚡ Comandos de Búsqueda Quirúrgica (PowerShell)

```powershell
# Localizar cualquier función y su número de línea:
Select-String -Path 'js/**/*.js' -Pattern 'function calculateArmorClass' | Select-Object Filename, LineNumber, Line

# Ver métodos principales de un módulo:
Select-String -Path 'js/modules/bastionManager.js' -Pattern '^\s{2}[a-zA-Z0-9_]+\s*\(' | Select-Object LineNumber, Line
```

---

## 🚀 Verificación Inmediata con `esbuild` (< 80 ms)

```powershell
& "C:\Users\Wargo\source\repos\roleplay-master-utility-hub\package\esbuild.exe" js/main.js --bundle --outfile=nul --format=esm 2>&1 | Select-String "error|Done"
```

---

## 🚫 Política Estricta de Versionado, Commit y Push

- **PROHIBIDO hacer `git commit`, `git push` o incrementar la versión de forma automática o autodeterminada.**
- Solo debes subir la versión (`js/constants/version.js` e `index.html`), crear un commit o hacer push **cuando el usuario lo pida explícitamente en su mensaje**.
