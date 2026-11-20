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
| `index.html` | ~385 | Cabecera `.rpg-navbar` (L60), badge `#app-version-badge` (L67), menú colapsable `#rpg-responsive-menu` (L116), pestañas `#main-nav-tabs` (L119: Campañas primero), banner `#repo-busy-loader` (L205). |
| `js/main.js` | ~596 | `init()` (L32), sincronización de versión, navegación de pestañas, `closeResponsiveMenu()` (L175), tirador rápido de dados, selector global de campaña y conexión Google Drive/carpeta local. |
| `js/state.js` | ~907 | Store Pub/Sub: `init()` (L76), `saveCharacter()` (L198), gestión de campañas/personajes, descansos, `importAllData()` (L658), `initRepository()` (L703). |
| `js/constants/version.js` | ~7 | `APP_VERSION` (L5) y `APP_VERSION_LABEL` (L6). |
| `js/constants/dnd55Rules.js` | ~6044 | Motor de reglas D&D 5.5 (ver mapa detallado en skill `dnd-rules-engine`). |
| `js/constants/spellsAndItems.js` | ~6055 | 48 subclases (L1), dotes de origen (L1266), dotes generales (L1281), >205 conjuros (L1369), objetos Tasha/Xanathar (L4307), equipo preset (L4444). |
| `js/constants/btrsData.js` | ~128 | Tablas BTRS y `BARGAIN_RULES` (L121). |
| `js/modules/characterSheet.js` | ~6210 | Hoja Interactiva (L402), Modales (L1561-L2645), Armas (L2653), Hoja A4 (L3044), Eventos (L3555) (ver mapa en skill `sheet-and-wizard`). |
| `js/modules/characterWizard.js` | ~2778 | Asistente 7 pasos: `loadCharacterForEdit` (L130), Pasos 1-7 (L442-L1727), Eventos (L1814), `saveStepInputs` (L2310), `finishAndSaveCharacter` (L2683). |
| `js/modules/masterPanel.js` | ~834 | Master Panel: `render` (L60), `renderCharacterCard` (L186), `attachEventListeners` (L582), percepción secreta (L801). |
| `js/modules/btrsCalculator.js` | ~981 | Calculadora BTRS: `render` (L163), `renderCalculationResult` (L343), `renderShopResult` (L507), `attachEventListeners` (L586), `calculateBtrs` (L744). |
| `js/utils/pdfExport.js` | ~745 | Exportador AcroForm PDF: `applyTextFieldValue` (L178), `generateFilledDndPdfBytes` (L288). |
| `js/utils/storage.js` | ~290 | `deepRepairMojibake` (L26), `sanitizeCharacter` (L97), `sanitizeCampaign` (L214), exportación/importación JSON (L234-L252). |
| `css/style.css` | ~1584 | Variables y layout base, `.rpg-navbar` (L137), cabecera compacta móvil/tablet `<992px` (L159), overlay `#repo-busy-loader` (L210), breakpoints Hoja Interactiva (L1359-L1430), `@media print` (L1533). |
| `css/themes/*.css` | ~150 c/u | 7 temas (`fantasia-oscura`, `oscuro`, `claro`, `alto-contraste`, `medieval`, `futurista`, `ciberpunk`) + `theme-base.css`. |

---

## ⚡ Comandos de Búsqueda Quirúrgica (PowerShell)

### 1. Localizar cualquier función y su número de línea
```powershell
Select-String -Path 'js/**/*.js' -Pattern 'function calculateArmorClass' | Select-Object Filename, LineNumber, Line
```

### 2. Buscar una constante u objeto en `spellsAndItems.js`
```powershell
Select-String -Path 'js/constants/spellsAndItems.js' -Pattern 'item_paquete_explorador' -Context 0,4
```

### 3. Ver los métodos de un módulo
```powershell
Select-String -Path 'js/modules/characterSheet.js' -Pattern '^\s{2}[a-zA-Z0-9_]+\s*\(' | Select-Object LineNumber, Line
```

### 4. Buscar reglas o media queries en CSS
```powershell
Select-String -Path 'css/style.css' -Pattern '\.sheet-balanced-top|@media' -Context 0,5
```

---

## 🚀 Verificación Inmediata con `esbuild` (< 50 ms)

Tras realizar cualquier edición en archivos JS, valida siempre la sintaxis e importaciones:

```powershell
& "C:\Users\Wargo\source\repos\roleplay-master-utility-hub\package\esbuild.exe" js/main.js --bundle --outfile=nul --format=esm 2>&1 | Select-String "error|Done"
```

Si muestra `Done in XXms` sin errores, el código empaqueta limpiamente.

---

## 🧪 Pruebas Unitarias Rápidas con Node.js + esbuild

Para verificar lógica de módulos ES6 sin abrir navegador:

```powershell
@'
import { calculateInitiative } from './js/constants/dnd55Rules.js';
console.log(calculateInitiative({ classId: 'bardo', level: 6, baseAbilityScores: { dex: 18 } }));
'@ | Out-File -FilePath 'scratch_test.mjs' -Encoding utf8;
& "C:\Users\Wargo\source\repos\roleplay-master-utility-hub\package\esbuild.exe" scratch_test.mjs --bundle --outfile=scratch_test.cjs --platform=node;
& "C:\Program Files\dotnet\packs\Microsoft.NET.Runtime.Emscripten.2.0.23.Node.win-x64\6.0.36\tools\bin\node.exe" scratch_test.cjs;
Remove-Item 'scratch_test.mjs','scratch_test.cjs' -Force -ErrorAction SilentlyContinue
```

---

## 🚫 Política Estricta de Versionado, Commit y Push

- **PROHIBIDO hacer `git commit`, `git push` o incrementar la versión de forma automática o autodeterminada.**
- Solo debes subir la versión (`js/constants/version.js` e `index.html`), crear un commit o hacer push **cuando el usuario lo pida explícitamente en su mensaje**.
