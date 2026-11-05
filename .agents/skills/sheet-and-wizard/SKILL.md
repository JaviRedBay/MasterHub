---
name: sheet-and-wizard
description: >-
  Guía técnica para modificar la Hoja Interactiva (characterSheet.js), el Asistente de Creación (characterWizard.js) y el Master Panel (masterPanel.js).
  Activa esta habilidad cuando vayas a implementar cambios de interfaz, responsividad de columnas, controles táctiles compactos para móvil/tablet, visualización de ataques o flujos de pasos.
---

# Guía de Interfaz: Hoja Interactiva, Asistente y Master Panel

Esta habilidad contiene las convenciones de maquetación, breakpoints responsivos y estructura de componentes para evitar búsquedas a ciegas.

## 📱 Diseño Multi-dispositivo (PC, Tablet y Móvil) y Breakpoints Canónicos

> **Regla de Compacidad para Móvil y Tablet**: La web está diseñada para verse tanto en **PCs como en tablets y móviles**. Cualquier elemento nuevo (botones como los de añadir PX/PG, inputs numéricos, píldoras de estado o barras de herramientas) debe diseñarse con dimensiones reducidas (`py-0 px-1`, `font-size: 0.68rem - 0.78rem`, `flex-wrap`, `gap-1`) para **no ocupar demasiado espacio en vistas móvil/tablet** ni provocar desbordamientos horizontales.

El proyecto sigue una política estricta de 3 fases responsivas en `#sheet-top-row`:

1. **Móvil (`< 768px`)**:
   - 1 columna secuencial (`col-12`).
   - El menú de navegación superior colapsa en un botón de cabecera `[ ☰ ]`.
   - El asistente de creación muestra un desplegable `Ir al Paso: [Paso 1...]`.

2. **Tablet (`768px a 1280px inclusive`)**:
   - **2 columnas en la fila superior**:
     - `.sheet-top-col-1` (`33.33%`): Atributos, salvaciones, sentidos y herramientas.
     - `.sheet-top-col-2` (`66.67%`): Combate, CA, PG y tabla de **Ataques y Armas Equipadas** con ~850px de espacio holgado.
     - `.sheet-top-col-3` (`100%`): 18 Habilidades oficiales en la fila siguiente a ancho completo.
   - *Nota crucial*: Las tablets de 1280px entran explícitamente en este rango.

3. **Escritorio (`> 1280px`, desde 1281px)**:
   - **3 columnas lado a lado**:
     - `.sheet-top-col-1` (`25%`)
     - `.sheet-top-col-2` (`41.67%`)
     - `.sheet-top-col-3` (`33.33%`)
   - Las tres columnas igualan su altura con flex stretch (`.sheet-balanced-top`).

---

## 📜 Hoja Interactiva (`js/modules/characterSheet.js`)

- **L88 `isProtectedTool(toolName, char)`**:
  - Verifica si una herramienta fue concedida por clase o trasfondo (`char.classTools`, herramientas fijas).
  - Si es protegida: renderiza candado `🔒` y **no** genera el botón de borrado `&times;`.
  - Solo las herramientas añadidas manualmente con `+ Añadir` pueden eliminarse.
- **L2576 `getEquippedWeapons(char)`**:
  - Extrae armas con `isEquipped === true` de `char.inventory`. Si no hay ninguna, retorna `['desarmado']`.
- **L2627 `calculateWeaponAttack(itemOrId, char, scores, pb)`**:
  - Calcula bonificador de ataque (FUE, DES o CAR para brujo filo/pacto de la hoja), fórmula de daño, versatilidad y maestría en armas.
- **L3381 `applyLowerSectionFilter(filter)`**:
  - Alterna entre pestañas inferiores: `all`, `features`, `inventory`, `spells`, `bio`.

---

## 🧙‍♂️ Asistente de Creación (`js/modules/characterWizard.js`)

- **L375 `canQuickSaveInEditMode()`**:
  - Valida si un personaje en edición puede guardarse inmediatamente sin pasar por todos los pasos.
  - Verifica que tenga nombre y que si tiene nivel $\ge 3$ tenga subclase elegida.
- **L947 `renderStep5()`**:
  - Selector de equipo inicial D&D 5.5:
    - *Opción A*: Paquete de clase oficial + oro restante.
    - *Opción B*: Riqueza en piezas de oro.
    - *Opción C*: Selección manual.
    - *Conservar*: Mantiene inventario íntegro en edición.
  - Selección de herramientas de clase (desplegables para Bardo, Monje, etc.).
- **L2509 `finishAndSaveCharacter()`**:
  - Guarda en `store.saveCharacter(wizardState)`, sincroniza herramientas y conjuros innatos y redirige a `#sheet`.

---

## 🛡️ Master Panel (`js/modules/masterPanel.js`)

- **L56 `render()`**:
  - Tabla resumen con inspiración, salvaciones y enlaces directos a hojas oficiales.
  - Matriz de sentidos pasivos (Percepción, Investigación, Perspicacia).
- **L176 `renderCharacterCard(char)`**:
  - Tarjeta de combate en vivo: barras de PG dinámicas, ranuras de nivel 1 a 9, y rasgos consumibles de descanso corto/largo.

