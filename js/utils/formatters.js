/**
 * Formateadores para D&D 5.5 y Sistema BTRS
 * Cumplimiento estricto del sistema métrico internacional:
 * Distancias en metros (m) y pesos en kilogramos (kg). Moneda en piezas de oro (p.o.).
 */

/**
 * Calcula el modificador de una puntuación de característica.
 * @param {number} score Puntuación (1-30)
 * @returns {number} Modificador (-5 a +10)
 */
export function getAbilityModifier(score) {
  const s = Number(score) || 10;
  return Math.floor((s - 10) / 2);
}

/**
 * Formatea un número con signo explícito (+3, -1, +0).
 * @param {number} mod Modificador
 * @returns {string} "+X" o "-X"
 */
export function formatModifier(mod) {
  if (mod === undefined || mod === null || isNaN(mod)) return '+0';
  const m = Number(mod) || 0;
  return m >= 0 ? `+${m}` : `${m}`;
}

/**
 * Obtiene el Bono de Competencia (BC) canónico de D&D 5.5 según el nivel.
 * @param {number} level Nivel del personaje (1 a 20)
 * @returns {number} BC (+2, +3, +4, +5, +6)
 */
export function getProficiencyBonus(level) {
  const lvl = Math.max(1, Math.min(20, Math.floor(Number(level) || 1)));
  return Math.floor((lvl - 1) / 4) + 2;
}

/**
 * Formatea una distancia en metros (m).
 * @param {number} meters Distancia en metros
 * @returns {string} Ej: "1,5 m", "9 m"
 */
export function formatDistance(meters) {
  const m = Number(meters) || 0;
  const formatted = m % 1 === 0 ? m.toString() : m.toFixed(1).replace('.', ',');
  return `${formatted} m`;
}

/**
 * Formatea un peso en kilogramos (kg).
 * @param {number} kg Peso en kg
 * @returns {string} Ej: "2,5 kg", "15 kg"
 */
export function formatWeight(kg) {
  const w = Number(kg) || 0;
  const formatted = w % 1 === 0 ? w.toString() : w.toFixed(2).replace('.', ',');
  return `${formatted} kg`;
}

/**
 * Formatea una cantidad de piezas de oro (p.o.) con separador de miles.
 * @param {number} amount Cantidad de oro
 * @returns {string} Ej: "1.500 p.o."
 */
export function formatGold(amount) {
  const num = Math.round(Number(amount) || 0);
  return `${num.toLocaleString('es-ES')} p.o.`;
}

/**
 * Repara cadenas de texto que sufren de doble codificación o interpretación errónea
 * de UTF-8 como ISO-8859-1 / Windows-1252 (mojibake).
 * Por ejemplo: "DaÃ±o" -> "Daño", "SÃ­mbolo" -> "Símbolo", "MÃ¡x" -> "Máx", "GuÃ­a" -> "Guía".
 * @param {string} str Texto potencialmente con mojibake
 * @returns {string} Texto reparado con tildes y caracteres correctos
 */
export function repairMojibake(str) {
  if (typeof str !== 'string' || !str) return str;
  if (!/[\u00C2\u00C3\u00E2]/.test(str)) return str;

  let res = str;

  // 1. Reparar secuencias de 3 bytes (comillas tipográficas, guiones largos, etc.)
  res = res.replace(/[\u00E0-\u00EF][\u0080-\u00BF]{2}/g, (match) => {
    try {
      return decodeURIComponent(escape(match));
    } catch {
      return match;
    }
  });

  // 2. Reparar secuencias de 2 bytes (á, é, í, ó, ú, ñ, Á, É, Í, Ó, Ú, Ñ, ¿, ¡, º, ª)
  res = res.replace(/[\u00C2\u00C3][\u0080-\u00BF]/g, (match) => {
    try {
      return decodeURIComponent(escape(match));
    } catch {
      return match;
    }
  });

  // 3. Fallback de seguridad para variantes específicas residuales
  return res
    .replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã±/g, 'ñ')
    .replace(/Ã\u0081/g, 'Á')
    .replace(/Ã\u0089/g, 'É')
    .replace(/Ã\u008D/g, 'Í')
    .replace(/Ã\u0093/g, 'Ó')
    .replace(/Ã\u009A/g, 'Ú')
    .replace(/Ã\u0091/g, 'Ñ')
    .replace(/Â¿/g, '¿')
    .replace(/Â¡/g, '¡')
    .replace(/Âº/g, 'º')
    .replace(/Âª/g, 'ª')
    .replace(/Ã¼/g, 'ü')
    .replace(/Ãœ/g, 'Ü');
}

/**
 * Sanitiza texto para evitar inyecciones HTML en plantillas dinámicas, reparando además mojibake.
 * @param {string} text Texto de entrada
 * @returns {string} Texto seguro y limpio
 */
export function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const clean = repairMojibake(String(text));
  return clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Trunca un texto a una longitud máxima con puntos suspensivos.
 * @param {string} str Texto
 * @param {number} maxLen Longitud máxima
 * @returns {string}
 */
export function truncateText(str, maxLen = 60) {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + '…';
}
