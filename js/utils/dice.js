/**
 * Simulador de Dados para D&D 5.5 y Sistema BTRS
 * Provee tiradas con desglose detallado, ventaja, desventaja y fórmulas.
 */

/**
 * Tira un único dado del número especificado de caras.
 * @param {number} sides Caras del dado (4, 6, 8, 10, 12, 20, 100)
 * @returns {number} Resultado entre 1 y sides
 */
export function rollDie(sides = 20) {
  const s = Math.max(1, Math.floor(sides));
  return Math.floor(Math.random() * s) + 1;
}

/**
 * Tira varios dados del mismo tipo y devuelve resultados individuales y total.
 * @param {number} count Cantidad de dados
 * @param {number} sides Caras del dado
 * @returns {{ rolls: number[], total: number }}
 */
export function rollMultiple(count = 1, sides = 6) {
  const rolls = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const val = rollDie(sides);
    rolls.push(val);
    total += val;
  }
  return { rolls, total };
}

/**
 * Tira 4d6 y descarta el menor (método canónico de D&D para características).
 * @returns {{ total: number, rolls: number[], dropped: number, kept: number[] }}
 */
export function roll4d6DropLowest() {
  const rolls = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];
  const sorted = [...rolls].sort((a, b) => a - b);
  const dropped = sorted[0];
  const kept = sorted.slice(1);
  const total = kept.reduce((acc, curr) => acc + curr, 0);
  return { total, rolls, dropped, kept };
}

/**
 * Tira con ventaja (dos d20, se elige el mayor).
 * @param {number} modifier Modificador numérico opcional
 * @returns {{ rolls: [number, number], chosen: number, total: number, modifier: number }}
 */
export function rollWithAdvantage(modifier = 0) {
  const r1 = rollDie(20);
  const r2 = rollDie(20);
  const chosen = Math.max(r1, r2);
  return {
    rolls: [r1, r2],
    chosen,
    modifier,
    total: chosen + modifier
  };
}

/**
 * Tira con desventaja (dos d20, se elige el menor).
 * @param {number} modifier Modificador numérico opcional
 * @returns {{ rolls: [number, number], chosen: number, total: number, modifier: number }}
 */
export function rollWithDisadvantage(modifier = 0) {
  const r1 = rollDie(20);
  const r2 = rollDie(20);
  const chosen = Math.min(r1, r2);
  return {
    rolls: [r1, r2],
    chosen,
    modifier,
    total: chosen + modifier
  };
}

/**
 * Parsea y evalúa una expresión de dados tipo "1d20+5", "2d6+3", "1d8", "1d10-1".
 * @param {string} expr Expresión textual
 * @returns {{ total: number, formula: string, rolls: number[], modifier: number }}
 */
export function rollDiceExpression(expr) {
  if (!expr || typeof expr !== 'string') {
    const d20 = rollDie(20);
    return { total: d20, formula: '1d20', rolls: [d20], modifier: 0 };
  }

  const clean = expr.trim().toLowerCase().replace(/\s+/g, '');
  const match = clean.match(/^(\d+)?d(\d+)([+-]\d+)?$/);

  if (!match) {
    // Si es solo un número fijo
    const num = parseInt(clean, 10);
    if (!isNaN(num)) {
      return { total: num, formula: `${num}`, rolls: [], modifier: num };
    }
    const d20 = rollDie(20);
    return { total: d20, formula: '1d20', rolls: [d20], modifier: 0 };
  }

  const count = match[1] ? parseInt(match[1], 10) : 1;
  const sides = parseInt(match[2], 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;

  const { rolls, total: sumRolls } = rollMultiple(count, sides);
  const total = sumRolls + modifier;

  return {
    total,
    formula: expr,
    rolls,
    modifier
  };
}
