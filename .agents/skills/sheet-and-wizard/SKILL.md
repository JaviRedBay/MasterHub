---
name: sheet-and-wizard
description: >-
  Guía técnica y mapa de líneas para modificar la Hoja Interactiva (characterSheet.js), el Asistente de Creación (characterWizard.js), el Master Panel (masterPanel.js), Campañas & Roster (dnd55Manager.js), Baluartes (bastionManager.js), Calculadora BTRS (btrsCalculator.js) y Exportador PDF (pdfExport.js).
  Activa esta habilidad cuando vayas a implementar cambios de interfaz, modales, tooltips flotantes, responsividad de columnas, controles táctiles compactos para móvil/tablet, visualización de ataques, baluartes o exportación PDF.
---

# Guía de Interfaz y Mapa de Módulos UI

Esta habilidad contiene las convenciones de maquetación, breakpoints responsivos y el mapa exacto de líneas de cada módulo visual para evitar búsquedas a ciegas.

## 📱 Diseño Multi-dispositivo (PC, Tablet y Móvil) y Breakpoints Canónicos

> **Regla de Compacidad para Móvil y Tablet**: La web se utiliza en PCs, tablets y móviles. Cualquier elemento nuevo (botones, inputs, píldoras o barras de herramientas) debe diseñarse compacto (`py-0 px-1`, `btn-sm`, `form-control-sm`, `font-size: 0.68rem - 0.78rem`, `flex-wrap`, `gap-1`) para no ocupar espacio excesivo ni desbordar en móvil/tablet.
> - **Cabecera y menú colapsable vertical (`<= 1280px`, `css/style.css` L158)**: En móvil y tablet el menú `#rpg-responsive-menu` se despliega en **vertical**, incluye selector de tema (`#mobile-theme-switcher`) y cierra automáticamente (`closeResponsiveMenu()` en `js/main.js` L260).
> - **Tooltips Flotantes Globales (`#rpg-floating-tooltip`, `js/main.js` L187, `css/style.css` L959)**: Cualquier píldora `.rpg-condition-pill` con un `<span class="rpg-condition-tooltip">` interno proyecta su contenido en `document.body` con `position: fixed` (sin usar atributo `title` nativo para no duplicar y sin recortarse nunca por `overflow` de tablas o tarjetas).

Política de 3 fases responsivas en la Hoja Interactiva (`css/style.css` L1370-L1500):
1. **Móvil (`< 768px`)**: 1 columna secuencial; encabezado `.sheet-identity-grid` en cuadrícula `2×4`.
2. **Tablet (`768px a 1280px inclusive`)**: 2 columnas arriba (`33.33%` / `66.67%`) y Habilidades `100%` abajo; `.sheet-identity-grid` en cuadrícula `4×2`.
3. **Escritorio (`> 1280px`, desde 1281px)**: 3 columnas lado a lado (`25%`, `41.67%`, `33.33%`); `.sheet-identity-grid` en 1 sola fila horizontal.

---

## 📜 1. Hoja Interactiva (`js/modules/characterSheet.js` ~6303 líneas)

- **L95 `isProtectedTool(toolName, char)`** y **L155 `render()`**.
- **L405 `renderInteractiveSheet(char, campaignChars)`**:
  - **L538 `#sheet-identity-header`**: Retrato con lightbox, nombre, clase, nivel + botón `▲`, PX, especie, trasfondo, tamaño, alineamiento e inspiración.
  - **L610 `#sheet-top-row`**:
    - **L612 `#sheet-top-col-1`**: Características, salvaciones, sentidos pasivos e `#sheet-box-languages-tools`.
    - **L720 `#sheet-top-col-2`**: CA, Iniciativa, Velocidad, Puntos de Golpe + **Cansancio (0–6) y Estados D&D 2024 sincronizados** (L780), y `#sheet-box-attacks` (L838).
    - **L950 `#sheet-top-col-3`**: 18 Habilidades oficiales.
  - **L980-L1610**: Pestañas inferiores (`all`, `features`, `inventory`, `spells`, `bio`).
  - **L1615-L2700**: Los 14 modales `<dialog>` de edición.
- **L2710 `getEquippedWeapons`** y **L2763 `calculateWeaponAttack`** (aplica `-2 × Cansancio` al ataque).
- **L3104 `renderPrintableSheet`** (vista A4 HTML) y **L3520 `applyLowerSectionFilter`**.
- **L3615 `attachEventListeners(char)`** y **L5008-L6303**: Helpers de modales, inventario y rasgos.

---

## 🛡️ 2. Master Panel (`js/modules/masterPanel.js` ~950 líneas)

- **L65 `render()`**:
  - **L92**: Tabla resumen compacta (`Personaje` con iconos compactos `.rpg-cond-icon-only` de estados/cansancio, `Vida (PG)` en vivo, `CA`, `Percepción Pasiva`, `Iniciativa`, `CD Conjuros`, switch `Activo` y botón icono `Hoja`).
- **L222 `renderCharacterCard(char)`**:
  - Botonera unificada de vida (`-PG`, `+PG`, `+Temp`), Dados de Golpe compactos, Tiradas de Muerte de tamaño fijo (`22×22px`), bloque de **Cansancio (0–6) y Estados D&D 2024** (L384) y recursos consumibles sin descripciones largas.
- **L649 `attachEventListeners()`** y **L895 `handleSecretPerceptionCheck()`** (solo PJs activos).

---

## 🗺️ 3. Campañas & Roster (`js/modules/dnd55Manager.js` ~415 líneas)

- **L25 `render()`**: Lista de campañas, roster de héroes de la campaña activa, **🏆 Hitos de la Campaña** (L133: crear/editar/borrar logros con sesión/fecha) y **📝 Notas para la Siguiente Sesión** (L195: autoguardado y vaciado).
- **L224 `attachEventListeners()`**.

---

## 🏰 4. Baluartes DMG 2024 (`js/modules/bastionManager.js` ~1398 líneas)

- **L53 `calculateSpaceMetrics(bastion, campaignChars)`**: Calcula espacios especiales disponibles/usados sumando los niveles de todos los PJs propietarios (baluartes individuales o combinados) + ajuste manual del DM, e instalaciones básicas/cuadros de `1,5 m` ($\text{m}^2$).
- **L96 `calculateTurnEconomy(bastion)`**: Calcula costes de instalaciones, salarios de PNJs, ingresos, balance neto, defensores, lugartenientes y órdenes desbloqueadas.
- **L161 `render()`**: Selector de baluarte, avance de turno, paneles de Espacios, Economía/Tesorería y Órdenes Generales (*Mantener* vs *Por Instalación*), tarjetas de Instalaciones (Especiales/Básicas con estado dañada), Personal/Defensores, Generador de Sucesos `1d100` (automático y manual) y Galería de Planos verificados (*Magic Bytes* + Lightbox).
- **L665 `renderBastionModals`** y **L959 `attachEventListeners`**.

---

## 🧙‍♂️ 5. Asistente (`characterWizard.js`), BTRS (`btrsCalculator.js`) y PDF (`pdfExport.js`)

- **`characterWizard.js` (~2778 líneas)**: `loadCharacterForEdit` (L130), Pasos 1–7 (L442–L1727), `attachEventListeners` (L1814), `saveStepInputs` (L2310), `finishAndSaveCharacter` (L2683).
- **`btrsCalculator.js` (~981 líneas)**: `render` (L163), `renderCalculationResult` (L343), `renderShopResult` (L507), `attachEventListeners` (L586), `calculateBtrs` (L744).
- **`pdfExport.js` (~745 líneas)**: `applyTextFieldValue` (L178), `generateFilledDndPdfBytes` (L288).

---

## 🚫 Regla de Control de Versiones (Commit y Push)
- **NUNCA realices `git commit`, `git push` ni subas la versión de la aplicación de forma autodeterminada.**
- Espera siempre a que el usuario lo pida expresamente.
