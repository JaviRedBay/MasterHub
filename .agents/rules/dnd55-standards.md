# Estándares de Arquitectura D&D 5.5 y BTRS

Reglas normativas para mantener la coherencia matemática, visual y de datos en la aplicación.

## 1. Sistema Canónico D&D 5.5 (PHB 2024 / Faerûn)
- **Maestría en Armas (Weapon Mastery)**: Todo ataque con arma debe computar su propiedad de maestría oficial (Empellón, Rasguño, Vex, Tajo, Derribo, etc.).
- **Dotes de Origen**: Se obtienen obligatoriamente por el trasfondo (o humano versátil) a nivel 1. No otorgan mejora de característica (+1/+2).
- **Dotes Generales (Nivel 4+)**: Otorgan un bonificador (+1) a una característica elegida de entre las permitidas por la dote.
- **Concentración del Monje**: Usa siempre la terminología oficial "Concentración" o "Puntos de Concentración" (no "Ki" o "Foco").
- **Herramientas de Clase y Trasfondo**: Las competencias en herramientas otorgadas por clase o trasfondo (`char.classTools`, herramientas fijas) están protegidas con candado `🔒` en la hoja interactiva y no se pueden eliminar manualmente.

## 2. Sistema Métrico Estricto
- Distancias de movimiento, alcance de armas y conjuros: Siempre en **metros** (formateado con coma decimal: `1,5 m`, `9 m`, `18 m`, `36 m`).
- Pesos de inventario, objetos y capacidad de carga: Siempre en **kilogramos** (`kg`).

## 3. Responsividad y Breakpoints
- **Móvil (< 768px)**: 1 columna secuencial (`col-12`). Barra superior recogida en botón de menú `[ ☰ ]`.
- **Tablet (768px a 1280px inclusive)**:
  - Fila superior de la hoja interactiva en **2 columnas**:
    - Columna 1 (Atributos y salvaciones): `33.33%`
    - Columna 2 (Combate y Ataques): `66.67%` (holgura amplia para la tabla de ataques)
    - Columna 3 (Habilidades): `100%` en la fila inferior.
- **Escritorio (> 1280px)**: 3 columnas lado a lado (`25%`, `41.67%`, `33.33%`).

## 4. Gestión de Estado y Temas Visuales
- Todo cambio que deba guardarse en disco/localStorage debe ejecutarse a través de `store.saveCharacter(char)` o métodos reactivos de `store.js`.
- Utiliza siempre las variables temáticas `--rpg-*` para que la interfaz se adapte perfectamente a los 7 temas disponibles.

