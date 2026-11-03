---
name: dnd-rules-engine
description: >-
  Guía y mapa de consulta rápida del motor matemático y reglas de D&D 5.5 (PHB 2024 / Faerûn) en js/constants/dnd55Rules.js y spellsAndItems.js.
  Activa esta habilidad cuando necesites consultar, calcular o modificar reglas de combate, CA, PG, salvaciones, conjuros, maestrías de armas, dotes o subclases sin leer archivos masivos.
---

# Motor de Reglas D&D 5.5 (PHB 2024)

Esta habilidad proporciona a los agentes acceso directo a las fórmulas matemáticas y funciones clave del sistema sin requerir la lectura de los archivos completos de reglas (~6000 líneas).

## 📍 Mapa de Funciones en `js/constants/dnd55Rules.js`

### 1. Puntuaciones y Modificadores
- **L1663 `getAbilityModifier(score)`**: Retorna $\lfloor(\text{score} - 10) / 2\rfloor$.
- **L1670 `getProficiencyBonus(level)`**: Retorna $+2$ (niveles 1-4), $+3$ (5-8), $+4$ (9-12), $+5$ (13-16), $+6$ (17-20).
- **L1795 `calculateFinalAbilityScores(char)`**: Calcula puntuaciones finales sumando base + trasfondo (+2/+1 o +1/+1/+1) + dotes + ASI + objetos mágicos.
- **L1889 `calculateAbilityScoresBreakdown(char)`**: Retorna el desglose detallado con fórmulas legibles para tooltips.

### 2. Combate y Defensa
- **L2069 `calculateArmorClass(char)`**:
  - Resuelve armadura equipada (`category`: light, medium, heavy, none).
  - Escudos (+2 CA base o bonificadores mágicos).
  - Defensa sin armadura (Bárbaro: $10 + \text{DES} + \text{CON}$; Monje: $10 + \text{DES} + \text{SAB}$).
  - Armadura de Mago ($13 + \text{DES}$) y estilos de combate (Defensa: $+1$).
- **L2364 `calculateHitPoints(char)`**:
  - Vida base nivel 1 (máximo del dado de golpe + CON).
  - Niveles 2+ (promedio fijo o tiradas personalizadas + CON por nivel).
  - Dotes como Dureza ($+2\text{ PG}$ por nivel).
- **L2461 `calculateInitiative(char)`**: Modificador de DES + bono de dote Alerta (suma bono de competencia si la posee).
- **L2502 `calculateSpeed(char)`**: Velocidad base de especie + Movimiento sin armadura del Monje (+3 m a +9 m) + dotes (Atleta, etc.).

### 3. Habilidades, Salvaciones y Sentidos
- **L2555 `calculateSavingThrows(char)`**: Salvaciones competentes de la clase inicial + dotes (Resistente).
- **L2651 `calculateSkills(char)`**: 18 habilidades oficiales con soporte para competencia ($\text{BC}$) y pericia ($2 \times \text{BC}$).
- **L2790-L2845**: Percepción Pasiva ($10 + \text{Percepción}$), Investigación Pasiva y Perspicacia Pasiva. Bonificador de $+5$ si existe ventaja pasiva.

### 4. Magia y Conjuros
- **L2864 `getInnateSpellsForCharacter(char)`**: Conjuros innatos por especie (Elfo, Gnomo, Tiefling, etc.) y trasfondo.
- **L3061 `calculateSpellcasting(char)`**: CD de salvación de conjuros ($8 + \text{BC} + \text{Mod. Característica Mágica}$) y bonificador de ataque de conjuro ($\text{BC} + \text{Mod}$).
- **L3161 `getCharacterSpellSlots(char)`**: Espacios de conjuro según tabla de lanzador completo, medio lanzador o pacto del brujo.
- **L4515 `getSpellAttackInfo(...)`**: Determina tipo de ataque, CD, daño y escalado por ranura superior (upcast).

### 5. Dotes y Subclases
- **`js/constants/spellsAndItems.js` L1**: Lista `DND55_ALL_48_SUBCLASSES` con identificador, clase y descripción.
- **`js/constants/spellsAndItems.js` L1266**: `DND55_ALL_ORIGIN_FEATS`.
- **`js/constants/spellsAndItems.js` L1281**: `DND55_ALL_GENERAL_FEATS`.
- **`dnd55Rules.js` L3497 `getResolvedFeatsForCharacter(char)`**: Resuelve dotes activas y opciones elegidas.

---

## ⚡ Comprobación Rápida
Para probar cualquier cálculo de reglas en milisegundos:
```powershell
& "C:\Program Files\dotnet\packs\Microsoft.NET.Runtime.Emscripten.2.0.23.Node.win-x64\6.0.36\tools\bin\node.exe" -e "import('./js/constants/dnd55Rules.js').then(r => console.log(r.getProficiencyBonus(5)))"
```

