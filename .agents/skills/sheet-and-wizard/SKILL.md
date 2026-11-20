---
name: sheet-and-wizard
description: >-
  Guía técnica y mapa de líneas para modificar la Hoja Interactiva (characterSheet.js), el Asistente de Creación (characterWizard.js), el Master Panel (masterPanel.js), la Calculadora BTRS (btrsCalculator.js) y el Exportador PDF (pdfExport.js).
  Activa esta habilidad cuando vayas a implementar cambios de interfaz, modales, responsividad de columnas, controles táctiles compactos para móvil/tablet, visualización de ataques, flujos de pasos o exportación PDF.
---

# Guía de Interfaz y Mapa de Módulos UI

Esta habilidad contiene las convenciones de maquetación, breakpoints responsivos y el mapa exacto de líneas de cada módulo visual para evitar búsquedas a ciegas.

## 📱 Diseño Multi-dispositivo (PC, Tablet y Móvil) y Breakpoints Canónicos

> **Regla de Compacidad para Móvil y Tablet**: La web se utiliza en PCs, tablets y móviles. Cualquier elemento nuevo (botones, inputs, píldoras o barras de herramientas) debe diseñarse compacto (`py-0 px-1`, `btn-sm`, `form-control-sm`, `font-size: 0.68rem - 0.78rem`, `flex-wrap`, `gap-1`) para no ocupar espacio excesivo ni desbordar en móvil/tablet.
> - **Cabecera compacta (`< 992px`, `css/style.css` L159)**: En móvil y tablet la barra `.rpg-navbar` reduce su altura, oculta el subtítulo y cierra automáticamente el menú desplegable (`closeResponsiveMenu()` en `js/main.js` L175) al seleccionar cualquier opción.

Política de 3 fases responsivas en `#sheet-top-row` (`css/style.css` L1359-L1430):
1. **Móvil (`< 768px`)**: 1 columna secuencial (`col-12`).
2. **Tablet (`768px a 1280px inclusive`)**: 2 columnas en la fila superior:
   - `.sheet-top-col-1` (`33.33%`): Atributos, salvaciones, sentidos, idiomas y herramientas.
   - `.sheet-top-col-2` (`66.67%`): Combate, CA, PG y tabla de **Ataques y Armas Equipadas**.
   - `.sheet-top-col-3` (`100%`): 18 Habilidades oficiales en la fila siguiente a ancho completo.
3. **Escritorio (`> 1280px`, desde 1281px)**: 3 columnas lado a lado (`25%`, `41.67%`, `33.33%`) con `.sheet-balanced-top`.

---

## 📜 1. Hoja Interactiva (`js/modules/characterSheet.js` ~6210 líneas)

### A. Estructura y Renderizado Principal
- **L92 `isProtectedTool(toolName, char)`**: Verifica si una herramienta proviene de clase o trasfondo para mostrar candado `🔒` e impedir borrarla.
- **L152 `render()`** y **L212 `ensureInventoryIntegrity(char)`**.
- **L402 `renderInteractiveSheet(char, campaignChars)`**:
  - **L505-L605**: Barra superior de selección de PJ, avatar con lightbox, botón Subir Nivel (`#btn-sheet-level-up` y `#btn-sheet-badge-level-up` -> llevan al Paso 5 del Wizard), botones de descanso y exportación.
  - **L610 `#sheet-top-row`**:
    - **L612 `#sheet-top-col-1`**: Puntuaciones de característica, salvaciones, sentidos pasivos e `#sheet-box-languages-tools` (L667).
    - **L723 `#sheet-top-col-2`**: CA, PG, Dados de Golpe, Tiradas de Muerte y `#sheet-box-attacks` (L782).
    - **L894 `#sheet-top-col-3`**: Tabla de 18 Habilidades oficiales.
  - **L926 `#sheet-lower-nav`**: Filtros de pestañas inferiores (`all`, `features`, `inventory`, `spells`, `bio`).
  - **L951 `#sheet-lower-row`**:
    - **L955**: Rasgos de Clase y Subclase (`#sheet-box-class-features`).
    - **L1056**: Dotes, Dones y Bendiciones (`#sheet-box-feats`).
    - **L1142**: Rasgos de Especie (`#sheet-box-species-traits`).
    - **L1165 / L1494**: Biografía, Apariencia y Personalidad.
    - **L1219**: Inventario, Carga y Monedas (`#sheet-box-inventory`).
    - **L1412**: Libro de Conjuros y Espacios de Magia (`#sheet-box-spells`).

### B. Modales HTML en `characterSheet.js` (L1561 - L2645)
- **L1561 `#modal-sheet-add-item`**: Añadir/editar objeto de inventario, catálogo y modificadores.
- **L1917 `#modal-sheet-add-trait`**: Añadir/editar rasgo especial, don o bendición.
- **L2002 `#modal-sheet-edit-currency`**: Editar monedas (PC, PP, PE, PO, PPT).
- **L2040 `#modal-sheet-add-language`** y **L2067 `#modal-sheet-add-tool`**.
- **L2094 `#modal-sheet-add-spell`**: Añadir/editar conjuro del personaje.
- **L2209 `#modal-sheet-hp-levels`**: Desglose y tiradas de PG por nivel.
- **L2319 `#modal-sheet-edit-appearance`** y **L2369 `#modal-sheet-edit-personality`**.
- **L2411 `#modal-sheet-edit-skills`**: Editor de competencias (`getMaxAllowedSkillsCount`) y pericias (`getMaxAllowedExpertiseCount`).
- **L2461 `#modal-sheet-edit-identity`**: Editar nombre, jugador, especie, trasfondo, alineamiento y XP.
- **L2538 `#modal-sheet-edit-abilities`**: Editar puntuaciones base y bonos de trasfondo.
- **L2604 `#modal-sheet-edit-feat-choice`**: Configurar elecciones de una dote.
- **L2630 `#modal-sheet-image-lightbox`**: Visor ampliado del retrato del PJ.

### C. Cálculos de Armas, Vista Imprimible A4 y Eventos (L2653 - L6210)
- **L2653 `getEquippedWeapons(char)`** y **L2706 `calculateWeaponAttack(itemOrId, char, scores, pb)`**.
- **L3044 `renderPrintableSheet(char, campaignChars)`**: Vista HTML formato A4 imprimible.
- **L3460 `applyLowerSectionFilter(filter)`**: Filtrado dinámico de pestañas inferiores.
- **L3555 `attachEventListeners(char)`**:
  - **L3733**: Eventos de inventario y `#modal-sheet-add-item`.
  - **L4054**: Eventos de rasgos (`#modal-sheet-add-trait`).
  - **L4133**: Eventos de habilidades y pericias (`#modal-sheet-edit-skills`).
  - **L4282-L4535**: Eventos de monedas, idiomas, herramientas y conjuros.
  - **L4540-L4912**: Eventos de PG por nivel, apariencia, personalidad, lightbox, identidad, características y elecciones de dote.
- **L4915 `openAbilitiesModal`**, **L5081 `openEditFeatChoiceModal`**, **L5408 `updateCharacterHpRolls`**.
- **L5440-L6060**: Helpers de inventario (`toggleEquipArmor`, `toggleEquipShield`, `toggleEquipWeapon`, `toggleAttunement`, `deleteInventoryItem`, `populateItemModalFromCatalog`, `saveNewInventoryItem`).
- **L6065-L6210**: Helpers de rasgos personalizados (`toggleTraitActive`, `deleteTrait`, `populateTraitModalFromPreset`, `saveOrUpdateTrait`).

---

## 🧙‍♂️ 2. Asistente de Creación (`js/modules/characterWizard.js` ~2778 líneas)

- **L130 `loadCharacterForEdit(char, targetStep = 1)`**: Carga PJ existente en el paso indicado (`step: 5` para subir nivel) y limpia residuos de otra especie.
- **L380 `canQuickSaveInEditMode()`**: Valida guardado rápido en modo edición.
- **L442 `renderStep1()`**: Campaña, nombre del PJ, jugador, alineamiento y retrato verificado.
- **L529 `renderStep2()`**: Especie, sublinaje, truco de Alto Elfo, habilidad y dote de origen extra de Humano.
- **L632 `renderStep3()`**: Trasfondo (oficial o personalizado), dote de origen, herramientas y bonos (+2/+1 o +1/+1/+1).
- **L858 `renderStep4()`**: Puntuaciones de característica (Matriz Estándar, Compra 27 pts, 4d6, Manual).
- **L1007 `renderStep5()`**: Clase, nivel, multiclase, habilidades de clase, herramientas y equipo inicial (Paquete, Oro, Manual, Conservar).
- **L1535 `renderStep6()`**: Subclases por clase, dotes generales de nivel y mejoras de característica (ASI).
- **L1727 `renderStep7()`**: Resumen final canónico y validaciones.
- **L1814 `attachEventListeners()`**: Listeners de todos los pasos (L1971 limpia rasgos exclusivos al cambiar de especie en `#w-species-select`).
- **L2310 `saveStepInputs()`**: Captura inputs del DOM al cambiar de paso o guardar.
- **L2683 `finishAndSaveCharacter()`**: Limpia residuos de especie, puebla herramientas/equipo/conjuros innatos y guarda con `store.saveCharacter()`.

---

## 🛡️ 3. Master Panel (`js/modules/masterPanel.js` ~834 líneas)

- **L60 `render()`**: Tabla resumen del grupo, matriz de sentidos pasivos y tarjetas de PJs.
- **L186 `renderCharacterCard(char)`**: Tarjeta de combate en vivo (`id="master-card-${char.id}"` con `scroll-margin-top: 85px`), control de PG, inspiración, ranuras de conjuro y consumibles.
- **L582 `attachEventListeners()`**: Eventos de daño/curación rápida, descansos corto/largo, scroll preciso a tarjeta (`btn-scroll-to-card` compensando altura del navbar sticky) y tirada secreta de percepción (**L801 `handleSecretPerceptionCheck()`**).

---

## ⚖️ 4. Calculadora BTRS (`js/modules/btrsCalculator.js` ~981 líneas)

- **L146 `constructor()`**: Mantiene estado persistente de inputs (`selectedPopulation`, `selectedShop`, `selectedRarity`, `selectedCondition`, `selectedChaMod`, `selectedBasePrice`).
- **L163 `render()`**: Formulario del motor Breiel Three-Roll System y generador de tiendas.
- **L343 `renderCalculationResult()`**: Muestra las 3 tiradas (Disponibilidad, Estado, Regateo) y precio final en PO.
- **L507 `renderShopResult()`**: Tabla de inventario generado para tienda.
- **L586 `attachEventListeners()`**, **L733 `updateResultView()`** (actualiza `#btrs-result-box` in-place sin reiniciar inputs), **L744 `calculateBtrs(rerollDice)`**, **L880 `generateShopInventory()`**.

---

## 🖨️ 5. Exportación PDF (`js/utils/pdfExport.js` ~745 líneas)

- **L178 `applyTextFieldValue(field, value, lib, fontSize)`**: Desactiva scroll, aplica tamaño máximo de fuente (`8.5pt` por defecto) y parchea `/DA` tanto en el `acroField` como en cada widget hijo para impedir auto-escalado gigante en el AcroForm.
- **L255 `getSortedSpellColumnFields(form, prefix)`**: Ordena filas de conjuros por coordenada Y real del PDF.
- **L288 `generateFilledDndPdfBytes(char)`**:
  - **L353-L408**: Identidad, características, salvaciones (reduce a `7pt` si tiene $\ge 3$ caracteres como `+10`), combate y armadura.
  - **L410-L441**: 18 Habilidades (reduce a `6.5pt` si el bonificador tiene dos dígitos como `+10`).
  - **L443-L517**: Hasta 6 armas equipadas con ataque, daño y notas/maestría.
  - **L519-L578**: Rasgos de clase (`CLASS FEATURES`), especie (`SPECIES TRAITS`) y dotes (`FEATS`).
  - **L579-L618**: Equipo (`EQUIPMENT` a `6.5pt`, equipados primero `[E]`, truncado dinámico según rectángulo del widget), monedas y sintonía.
  - **L619-L627**: Idiomas (`6.5pt`), competencias de armas (`WEAPON PROF` a `5.5pt`) y herramientas (`TOOL PROF` a `6pt`).
  - **L628-L720**: Aspecto físico, personalidad y tabla de 30 conjuros.

---

## 🚫 Regla de Control de Versiones (Commit y Push)
- **NUNCA realices `git commit`, `git push` ni subas la versión de la aplicación de forma autodeterminada.**
- Espera siempre a que el usuario lo pida expresamente.
