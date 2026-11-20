/**
 * Módulo C: Calculadora BTRS y Generador Procedural de Tiendas
 * Sistema canónico de cálculo de disponibilidad, condición, precios BTRS y regateo.
 */

import { 
  SHOP_MODIFIERS, 
  POPULATION_MODIFIERS, 
  RARITY_MODIFIERS, 
  CONDITION_FACTORS, 
  AVAILABILITY_THRESHOLDS, 
  PRICE_TABLES, 
  BARGAIN_RULES 
} from '../constants/btrsData.js';
import { DND55_PRESET_ITEMS } from '../constants/spellsAndItems.js';
import { DND55_WEAPONS, DND55_ARMORS } from '../constants/dnd55Rules.js';
import { rollDie } from '../utils/dice.js';
import { formatGold, escapeHtml } from '../utils/formatters.js';
import { showToast } from '../utils/uiFeedback.js';
import { store } from '../state.js';

export const SHOP_CATEGORY_CONFIG = {
  armeria: {
    id: 'armeria',
    name: 'Armería',
    description: 'Armas marciales, simples, armas a distancia, armaduras y escudos.',
    names: [
      'El Acero Vigilante', 'Armas y Blasón de Faerûn', 'La Flecha Silenciosa',
      'La Espada Hendiente', 'El Bastión de la Puerta', 'Armería de los Siete Reyes'
    ],
    merchants: [
      { name: 'Capitán Roderick', personality: 'Veterano de la guardia que inspecciona cada filo con orgullo marcial.' },
      { name: 'Valeria Filoduro', personality: 'Maestra armera pragmática y directa, no tolera regateos absurdos.' },
      { name: 'Bromir Pico de Hierro', personality: 'Enano rudo y honorable que valora el buen acero y el oro contante.' }
    ],
    filter: (item) => item.category === 'arma' || item.category === 'armadura' || item.weaponType || item.armorType || item.name.toLowerCase().includes('espada') || item.name.toLowerCase().includes('arco')
  },
  herreria: {
    id: 'herreria',
    name: 'Herrería',
    description: 'Aceros forjados, armaduras pesadas metálicas, escudos y herramientas.',
    names: [
      'La Forja de Moradin', 'Acero & Carbón', 'Yunques del Valle',
      'El Martillo Candente', 'Hierro & Fuego', 'La Fragua Profunda'
    ],
    merchants: [
      { name: 'Thrain Barbagrís', personality: 'Herrero enano de pocas palabras y martillo incansable.' },
      { name: 'Dagnir Martillofirme', personality: 'Orgulloso de sus aleaciones maestras, da garantía de por vida.' },
      { name: 'Olga Quijada de Cobre', personality: 'Robusta y enérgica, habla a voces sobre el fuelle del taller.' }
    ],
    filter: (item) => {
      const n = item.name.toLowerCase();
      return item.category === 'arma' || item.category === 'armadura' || item.category === 'herramientas' ||
        n.includes('malla') || n.includes('placa') || n.includes('coraza') || n.includes('escudo') || n.includes('hacha') || n.includes('martillo') || n.includes('espada') || n.includes('herrero');
    }
  },
  rarezas: {
    id: 'rarezas',
    name: 'Vendedor de Rarezas y Arcano',
    description: 'Objetos mágicos, pergaminos arcanos, anillos, varitas y reliquias.',
    names: [
      'El Gabinete de Curiosidades', 'Arcanos de Netheril', 'Reliquias de Selûne',
      'Bazar de los Milagros', 'El Rincón Místico', 'Ecos de la Urdimbre'
    ],
    merchants: [
      { name: 'Xanaphia Luzdeluna', personality: 'Elfa erudita que conoce la leyenda oculta de cada artefacto.' },
      { name: 'Archivista Oakhaven', personality: 'Mago anciano y despistado rodeado de tomos flotantes.' },
      { name: 'Kaelen el Ocultista', personality: 'Misterioso mercader de ojos brillantes que murmura conjuros de tasación.' }
    ],
    filter: (item) => item.category === 'magico' || item.category === 'objeto_magico' || item.category === 'artefacto' || item.category === 'consumible' || (item.statModifiers && item.statModifiers.length > 0)
  },
  boticario: {
    id: 'boticario',
    name: 'Boticario y Alquimista',
    description: 'Pociones de curación, elixires, antitoxinas, aceites y útiles de herboristería.',
    names: [
      'El Matraz de Mercurio', 'Elixir & Raíz', 'El Mortero Esmeralda',
      'Brebajes del Claro Sagrado', 'La Redoma de Alabastro', 'Gotas del Bosque'
    ],
    merchants: [
      { name: 'Altea Verdant', personality: 'Herborista dulce pero intransigente con la pureza de sus raíces.' },
      { name: 'Maese Aldous', personality: 'Alquimista con las cejas chamuscadas y una sonrisa entusiasta.' },
      { name: 'Selena Nieblafría', personality: 'Boticaria cautelosa que guarda las mejores recetas bajo llave.' }
    ],
    filter: (item) => {
      const n = item.name.toLowerCase();
      return item.category === 'pocion' || item.category === 'consumible' || item.category === 'herramientas' ||
        n.includes('poc') || n.includes('elixir') || n.includes('fuego de alquimista') || n.includes('antitoxina') || n.includes('herborister') || n.includes('curandero') || n.includes('veneno');
    }
  },
  provisiones: {
    id: 'provisiones',
    name: 'Provisiones y Pertrechos',
    description: 'Equipo de viaje, mochilas, cuerdas, antorchas, raciones y herramientas de aventurero.',
    names: [
      'Pertrechos del Caminante', 'La Mochila del Pionero', 'Provisiones Faerûn',
      'El Refugio del Explorador', 'Suministros de la Caravana', 'El Bazar del Viajero'
    ],
    merchants: [
      { name: 'Barlen Pieveloz', personality: 'Mediano dicharachero que ha recorrido toda la Costa de la Espada.' },
      { name: 'Garrick el Proveedor', personality: 'Hombre práctico que sabe exactamente qué cuerda te salvará la vida.' },
      { name: 'Marenna la Guía', personality: 'Antigua exploradora que vende sólo equipo probado en la intemperie.' }
    ],
    filter: (item) => {
      const n = item.name.toLowerCase();
      return item.category === 'equipo' || item.category === 'herramientas' || item.category === 'aventurero' ||
        n.includes('mochila') || n.includes('cuerda') || n.includes('antorcha') || n.includes('raci') || n.includes('linterna') || n.includes('saco') || n.includes('odre') || n.includes('yesca') || n.includes('ladr') || n.includes('escalad');
    }
  },
  joyeria: {
    id: 'joyeria',
    name: 'Joyería y Reliquias',
    description: 'Gemas preciosas talladas, amuletos, anillos finos y reliquias sagradas.',
    names: [
      'El Rubí Resplandeciente', 'Orfebrería de las Estrellas', 'Gemas y Filigrana',
      'El Broche Dorado', 'Tesoros de la Corona', 'La Cámara Brillante'
    ],
    merchants: [
      { name: 'Lord Cassian Vance', personality: 'Noble venido a mercader con modales impecables y lupa de joyero.' },
      { name: 'Giselle Auriol', personality: 'Orfebre refinada que sólo acepta gemas de corte perfecto.' },
      { name: 'Brant Diamantino', personality: 'Experto en tasar el valor arcano de piedras y reliquias sagradas.' }
    ],
    filter: (item) => {
      const n = item.name.toLowerCase();
      return item.category === 'joya' || item.category === 'magico' || n.includes('anillo') || n.includes('amuleto') || n.includes('diadema') || n.includes('perla') || n.includes('gema') || n.includes('broche') || n.includes('diamante');
    }
  },
  general: {
    id: 'general',
    name: 'Bazar General',
    description: 'Comercio mixto con un poco de todo para cualquier necesidad de campaña.',
    names: [
      'El Emporio de las Mil Maravillas', 'Bazar de la Encrucijada', 'Comercio Central',
      'La Tienda del Rincón', 'Almacén de Faerûn', 'La Balanza Dorada'
    ],
    merchants: [
      { name: 'Barnaby Bigotes', personality: 'Comerciante simpático dispuesto a negociar por cualquier objeto.' },
      { name: 'Kira la Astuta', personality: 'Joven comerciante con un ojo clínico para las gangas.' },
      { name: 'Merek el Justo', personality: 'Comerciante de confianza que mantiene precios transparentes.' }
    ],
    filter: () => true
  }
};

export class BtrsCalculatorModule {
  constructor(containerId = 'btrs-container') {
    this.container = document.getElementById(containerId);
    this.calcMode = 'standard'; // 'standard' (3-roll) | 'fixed' (2-roll)
    this.lastCalculation = null;
    this.currentDice = null;
    this.selectedPopulation = 'ciudad_peq';
    this.selectedShop = 'vecindario';
    this.selectedRarity = 'uncomun';
    this.selectedCondition = 'auto';
    this.selectedChaMod = 2;
    this.selectedBasePrice = 500;
    this.shopCategory = 'armeria';
    this.shopPopulation = 'ciudad_peq';
    this.shopEstablishment = 'vecindario';
    this.generatedShop = null;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="row g-4">
        <!-- Columna Izquierda: Calculadora de Precio BTRS -->
        <div class="col-12 col-xl-7">
          <div class="rpg-card p-3 p-md-4">
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
              <h3 class="h5 text-warning m-0 d-flex align-items-center gap-2">
                <span>⚖️</span> Motor de Precios Breiel Three-Roll System
              </h3>
              <div class="btn-group btn-group-sm">
                <button class="btn ${this.calcMode === 'standard' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-mode-toggle" data-mode="standard">
                  Sistema A (Tablas 3-Roll)
                </button>
                <button class="btn ${this.calcMode === 'fixed' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-mode-toggle" data-mode="fixed">
                  Sistema B (Precio Fijo)
                </button>
              </div>
            </div>

            <form id="btrs-form" class="row g-3">
              <!-- Paso 1: Configuración de Mercado -->
              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">1. Asentamiento / Población</label>
                <select id="btrs-population" class="form-select form-select-sm bg-dark border-secondary text-light">
                  ${POPULATION_MODIFIERS.map(p => `
                    <option value="${p.id}" ${p.id === this.selectedPopulation ? 'selected' : ''}>
                      ${p.name} (Mod: ${p.rollMod >= 0 ? '+' : ''}${p.rollMod} tirada / ${p.pricePercentFixed >= 0 ? '+' : ''}${Math.round(p.pricePercentFixed * 100)}% precio)
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">2. Tipo de Establecimiento</label>
                <select id="btrs-shop" class="form-select form-select-sm bg-dark border-secondary text-light">
                  ${SHOP_MODIFIERS.map(s => `
                    <option value="${s.id}" ${s.id === this.selectedShop ? 'selected' : ''}>
                      ${s.name} (Mod: ${s.rollMod >= 0 ? '+' : ''}${s.rollMod} tirada / ${s.pricePercentFixed >= 0 ? '+' : ''}${Math.round(s.pricePercentFixed * 100)}% precio)
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">3. Rareza del Objeto</label>
                <select id="btrs-rarity" class="form-select form-select-sm bg-dark border-secondary text-light">
                  ${RARITY_MODIFIERS.map(r => `
                    <option value="${r.id}" ${r.id === this.selectedRarity ? 'selected' : ''}>
                      ${r.name} (Mod Tirada: ${r.rollMod >= 0 ? '+' : ''}${r.rollMod})
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Modos A y B -->
              ${this.calcMode === 'fixed' ? `
                <div class="col-md-6">
                  <label class="form-label text-warning small fw-bold">4. Precio Base Oficial (p.o.)</label>
                  <input type="number" id="btrs-base-price" class="form-control form-control-sm bg-dark border-secondary text-light" value="${this.selectedBasePrice}" min="1">
                </div>
                <div class="col-md-6">
                  <label class="form-label text-warning small fw-bold">5. Condición del Objeto</label>
                  <select id="btrs-condition" class="form-select form-select-sm bg-dark border-secondary text-light">
                    <option value="auto" ${this.selectedCondition === 'auto' ? 'selected' : ''}>🎲 Tirada Automática (1d6)</option>
                    ${CONDITION_FACTORS.map(c => `
                      <option value="${c.dieRoll}" ${String(this.selectedCondition) === String(c.dieRoll) ? 'selected' : ''}>
                        d6 [${c.dieRoll}] ${c.name} (${c.pricePercentFixed >= 0 ? '+' : ''}${Math.round(c.pricePercentFixed * 100)}% precio)
                      </option>
                    `).join('')}
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-warning small fw-bold">6. Modificador CAR del Comprador (Regateo)</label>
                  <input type="number" id="btrs-cha-mod" class="form-control form-control-sm bg-dark border-secondary text-light" value="${this.selectedChaMod}" min="-5" max="10">
                </div>
              ` : `
                <div class="col-md-6">
                  <label class="form-label text-warning small fw-bold">4. Condición del Objeto</label>
                  <select id="btrs-condition" class="form-select form-select-sm bg-dark border-secondary text-light">
                    <option value="auto" ${this.selectedCondition === 'auto' ? 'selected' : ''}>🎲 Tirada Automática (1d6)</option>
                    ${CONDITION_FACTORS.map(c => `
                      <option value="${c.dieRoll}" ${String(this.selectedCondition) === String(c.dieRoll) ? 'selected' : ''}>
                        d6 [${c.dieRoll}] ${c.name} (Mod: ${c.rollMod >= 0 ? '+' : ''}${c.rollMod} tirada / ${c.pricePercentFixed >= 0 ? '+' : ''}${Math.round(c.pricePercentFixed * 100)}% precio)
                      </option>
                    `).join('')}
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-warning small fw-bold">5. Modificador CAR del Comprador (Regateo)</label>
                  <input type="number" id="btrs-cha-mod" class="form-control form-control-sm bg-dark border-secondary text-light" value="${this.selectedChaMod}" min="-5" max="10">
                </div>
              `}

              <div class="col-md-6 d-flex align-items-end gap-2">
                <button type="button" id="btn-calc-btrs" class="btn btn-sm btn-warning text-dark flex-grow-1 py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <i data-lucide="sparkles"></i> <span>Tirar Dados y Calcular</span>
                </button>
                ${this.lastCalculation ? `
                  <button type="button" id="btn-reroll-btrs" class="btn btn-sm btn-outline-warning py-2 px-3 fw-bold d-flex align-items-center justify-content-center gap-1" title="Repetir tiradas de dados">
                    <i data-lucide="refresh-cw"></i> <span>Tirar</span>
                  </button>
                ` : ''}
              </div>
            </form>

            <!-- Panel de Resultados BTRS -->
            <div id="btrs-result-box" class="mt-4 ${this.lastCalculation ? '' : 'd-none'}">
              ${this.renderCalculationResult()}
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Generador Procedural de Tiendas Personalizable -->
        <div class="col-12 col-xl-5">
          <div class="rpg-card p-3 p-md-4">
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
              <h3 class="h5 text-warning m-0 d-flex align-items-center gap-2">
                <span>🏬</span> Generador de Tiendas
              </h3>
            </div>

            <!-- Controles de Personalización del Generador de Tiendas -->
            <form id="shop-gen-form" class="row g-2 mb-3">
              <div class="col-12">
                <label class="form-label text-warning small fw-bold">Tipo de Tienda</label>
                <select id="shop-gen-category" class="form-select form-select-sm bg-dark border-secondary text-light">
                  <option value="armeria" ${this.shopCategory === 'armeria' ? 'selected' : ''}>⚔️ Armería (Armas marciales, simples y armaduras)</option>
                  <option value="herreria" ${this.shopCategory === 'herreria' ? 'selected' : ''}>🔨 Herrería (Aceros, armaduras pesadas, escudos, útiles)</option>
                  <option value="rarezas" ${this.shopCategory === 'rarezas' ? 'selected' : ''}>✨ Vendedor de Rarezas y Arcano (Objetos mágicos, pergaminos)</option>
                  <option value="boticario" ${this.shopCategory === 'boticario' ? 'selected' : ''}>🧪 Boticario y Alquimista (Pociones, elixires, antitoxinas)</option>
                  <option value="provisiones" ${this.shopCategory === 'provisiones' ? 'selected' : ''}>🎒 Provisiones y Pertrechos (Equipo de aventurero, mochilas, cuerdas)</option>
                  <option value="joyeria" ${this.shopCategory === 'joyeria' ? 'selected' : ''}>💎 Joyería y Reliquias (Gemas, amuletos, anillos finos)</option>
                  <option value="general" ${this.shopCategory === 'general' ? 'selected' : ''}>🏪 Bazar General (Surtido variado de todo tipo)</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">Asentamiento / Población</label>
                <select id="shop-gen-population" class="form-select form-select-sm bg-dark border-secondary text-light">
                  ${POPULATION_MODIFIERS.map(p => `
                    <option value="${p.id}" ${p.id === this.shopPopulation ? 'selected' : ''}>
                      ${p.name}
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">Tipo de Establecimiento</label>
                <select id="shop-gen-establishment" class="form-select form-select-sm bg-dark border-secondary text-light">
                  ${SHOP_MODIFIERS.map(s => `
                    <option value="${s.id}" ${s.id === this.shopEstablishment ? 'selected' : ''}>
                      ${s.name} (${s.pricePercentFixed >= 0 ? `+${Math.round(s.pricePercentFixed * 100)}%` : `${Math.round(s.pricePercentFixed * 100)}%`})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="col-12 mt-2">
                <button type="button" id="btn-gen-shop" class="btn btn-warning text-dark fw-bold w-100 d-flex align-items-center justify-content-center gap-2">
                  <i data-lucide="sparkles"></i> Generar Tienda e Inventario BTRS
                </button>
              </div>
            </form>

            <div id="shop-result-box">
              ${this.renderShopResult()}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    if (window.lucide) window.lucide.createIcons();
  }

  renderCalculationResult() {
    if (!this.lastCalculation) return '';
    const res = this.lastCalculation;

    if (!res.isAvailable) {
      return `
        <div class="p-3 rounded bg-dark border border-danger">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="small text-secondary">Paso 1: Disponibilidad en Asentamiento</span>
              <div class="fw-bold text-danger fs-6">✗ Objeto NO Disponible en la Región</div>
              <div class="text-secondary small mt-1">
                Tirada: 1d20 [${res.availD20}] + Tienda (${res.shopMod >= 0 ? '+' : ''}${res.shopMod}) = <strong class="text-light">${res.availRoll}</strong> vs CD requerida <strong class="text-light">${res.availThreshold}</strong> (${escapeHtml(res.pop.name)} - ${escapeHtml(res.rarity.name)}).
              </div>
            </div>
            <span class="badge bg-danger fs-6">${res.availRoll} / CD ${res.availThreshold}</span>
          </div>
          <div class="alert alert-danger mb-0 mt-3 small">
            El mercader no posee este objeto en existencias ni conoce a nadie en este asentamiento que lo comercie. Se debe buscar en una población mayor o recurrir al Mercado Negro.
          </div>
        </div>
      `;
    }

    return `
      <div class="p-3 rounded bg-dark border border-warning">
        <!-- Paso 1: Disponibilidad Exitosa -->
        <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
          <div>
            <span class="small text-secondary">Paso 1: Disponibilidad</span>
            <div class="fw-bold text-success fs-6">✓ Objeto Encontrado y Disponible</div>
            <div class="text-muted" style="font-size: 0.75rem;">
              Tirada: 1d20 [${res.availD20}] + Tienda (${res.shopMod >= 0 ? '+' : ''}${res.shopMod}) = <strong class="text-light">${res.availRoll}</strong> vs CD <strong class="text-light">${res.availThreshold}</strong>
            </div>
          </div>
          <span class="badge bg-success">${res.availRoll} vs CD ${res.availThreshold}</span>
        </div>

        <!-- Paso 2: Condición del Objeto -->
        <div class="mb-3 small p-2 rounded bg-black border border-secondary d-flex justify-content-between align-items-center">
          <div>
            <span class="text-secondary d-block">Paso 2: Condición del Objeto (d6: [${res.conditionRoll}])</span>
            <strong class="text-warning">${escapeHtml(res.condition.name)}</strong>
            <span class="text-muted ms-1">&bull; ${escapeHtml(res.condition.description)}</span>
          </div>
          <span class="badge ${res.condPercent < 0 ? 'bg-danger' : res.condPercent > 0 ? 'bg-warning text-dark' : 'bg-secondary'}">
            ${res.condPercent >= 0 ? '+' : ''}${Math.round(res.condPercent * 100)}%
          </span>
        </div>

        <!-- Paso 3: Desglose de Modificadores al Precio de los Diferentes Apartados -->
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="text-warning small fw-bold">Paso 3: Modificadores al Precio por Apartado</span>
            ${res.calcMode === 'standard' ? `
              <span class="text-secondary" style="font-size: 0.75rem;">
                Tirada BTRS: 1d20 [${res.baseD20}] + Mod [${res.totalRollMod >= 0 ? '+' : ''}${res.totalRollMod}] = <strong class="text-light">${res.finalRollTotal}</strong>
              </span>
            ` : ''}
          </div>

          <div class="table-responsive">
            <table class="table table-dark table-sm table-bordered align-middle mb-0" style="font-size: 0.78rem;">
              <thead class="text-secondary">
                <tr>
                  <th>Apartado / Concepto</th>
                  <th class="text-center" style="width: 85px;">Mod. Tirada</th>
                  <th class="text-center" style="width: 85px;">Mod. Precio</th>
                  <th class="text-end" style="width: 105px;">Impacto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong class="text-light">${res.calcMode === 'standard' ? `Precio Base (Tabla ${escapeHtml(res.rarity.name)})` : 'Precio Base Oficial'}</strong>
                  </td>
                  <td class="text-center text-secondary">${res.calcMode === 'standard' ? `Tabla [${res.rarity.name}]` : '-'}</td>
                  <td class="text-center text-secondary">Base</td>
                  <td class="text-end text-warning fw-bold">${formatGold(res.initialPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <span class="text-secondary">1. Asentamiento / Población:</span> <strong class="text-light">${escapeHtml(res.pop.name)}</strong>
                  </td>
                  <td class="text-center text-info">${res.calcMode === 'standard' ? `${res.pop.rollMod >= 0 ? '+' : ''}${res.pop.rollMod}` : '-'}</td>
                  <td class="text-center ${res.popPercent < 0 ? 'text-success' : res.popPercent > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.popPercent >= 0 ? '+' : ''}${Math.round(res.popPercent * 100)}%
                  </td>
                  <td class="text-end ${res.popImpactGold < 0 ? 'text-success' : res.popImpactGold > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.popImpactGold >= 0 ? '+' : ''}${formatGold(res.popImpactGold)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="text-secondary">2. Tipo de Establecimiento:</span> <strong class="text-light">${escapeHtml(res.shop.name)}</strong>
                  </td>
                  <td class="text-center text-info">${res.calcMode === 'standard' ? `${res.shop.rollMod >= 0 ? '+' : ''}${res.shop.rollMod}` : '-'}</td>
                  <td class="text-center ${res.shopPercent < 0 ? 'text-success' : res.shopPercent > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.shopPercent >= 0 ? '+' : ''}${Math.round(res.shopPercent * 100)}%
                  </td>
                  <td class="text-end ${res.shopImpactGold < 0 ? 'text-success' : res.shopImpactGold > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.shopImpactGold >= 0 ? '+' : ''}${formatGold(res.shopImpactGold)}
                  </td>
                </tr>
                ${res.calcMode === 'standard' ? `
                  <tr>
                    <td>
                      <span class="text-secondary">3. Rareza del Objeto:</span> <strong class="text-light">${escapeHtml(res.rarity.name)}</strong>
                    </td>
                    <td class="text-center text-info">${res.rarity.rollMod >= 0 ? '+' : ''}${res.rarity.rollMod}</td>
                    <td class="text-center text-secondary">Escala</td>
                    <td class="text-end text-muted">-</td>
                  </tr>
                ` : ''}
                <tr>
                  <td>
                    <span class="text-secondary">${res.calcMode === 'standard' ? '4.' : '3.'} Condición del Objeto:</span> <strong class="text-light">${escapeHtml(res.condition.name)}</strong>
                  </td>
                  <td class="text-center text-info">${res.calcMode === 'standard' ? `${res.condition.rollMod >= 0 ? '+' : ''}${res.condition.rollMod}` : '-'}</td>
                  <td class="text-center ${res.condPercent < 0 ? 'text-success' : res.condPercent > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.condPercent >= 0 ? '+' : ''}${Math.round(res.condPercent * 100)}%
                  </td>
                  <td class="text-end ${res.condImpactGold < 0 ? 'text-success' : res.condImpactGold > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.condImpactGold >= 0 ? '+' : ''}${formatGold(res.condImpactGold)}
                  </td>
                </tr>
                <tr class="table-active">
                  <td><strong class="text-light">Subtotal Ajustado de Mercado</strong></td>
                  <td class="text-center text-info fw-bold">${res.calcMode === 'standard' ? `Total: ${res.totalRollMod >= 0 ? '+' : ''}${res.totalRollMod}` : '-'}</td>
                  <td class="text-center fw-bold ${res.totalPercentMod < 0 ? 'text-success' : res.totalPercentMod > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.totalPercentMod >= 0 ? '+' : ''}${Math.round(res.totalPercentMod * 100)}%
                  </td>
                  <td class="text-end text-warning fw-bold">${formatGold(res.adjustedPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <span class="text-secondary">${res.calcMode === 'standard' ? '5.' : '4.'} Regateo (Prueba CAR):</span> <strong class="text-light">1d20 [${res.bargainD20}] + CAR [${res.chaMod >= 0 ? '+' : ''}${res.chaMod}] = ${res.bargainRoll}</strong>
                    <div class="text-muted" style="font-size: 0.7rem;">${escapeHtml(res.bargainRule.label)}</div>
                  </td>
                  <td class="text-center text-secondary">-</td>
                  <td class="text-center ${res.bargainRule.priceMultiplier < 1 ? 'text-success' : res.bargainRule.priceMultiplier > 1 ? 'text-danger' : 'text-secondary'}">
                    ${res.bargainRule.priceMultiplier < 1 ? '-' : res.bargainRule.priceMultiplier > 1 ? '+' : ''}${Math.abs(Math.round((res.bargainRule.priceMultiplier - 1) * 100))}%
                  </td>
                  <td class="text-end ${res.bargainImpactGold < 0 ? 'text-success' : res.bargainImpactGold > 0 ? 'text-danger' : 'text-secondary'}">
                    ${res.bargainImpactGold >= 0 ? '+' : ''}${formatGold(res.bargainImpactGold)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- PRECIO FINAL -->
        <div class="text-center p-3 rounded" style="background: linear-gradient(135deg, var(--rpg-crimson-glow, rgba(160, 20, 20, 0.3)), var(--rpg-tint-soft, rgba(30, 30, 30, 0.8))); border: 2px solid var(--rpg-gold, #c89b3c);">
          <div class="small text-warning fw-bold text-uppercase tracking-wide">Precio Final Acordado</div>
          <div class="display-6 fw-bold text-warning">${formatGold(res.finalPrice)}</div>
          <div class="text-secondary small mt-1">
            Base ${formatGold(res.initialPrice)} &bull; Modificadores Apartados ${res.totalPercentMod >= 0 ? '+' : ''}${Math.round(res.totalPercentMod * 100)}% &bull; Regateo ${res.bargainRule.priceMultiplier < 1 ? '-' : res.bargainRule.priceMultiplier > 1 ? '+' : ''}${Math.abs(Math.round((res.bargainRule.priceMultiplier - 1) * 100))}%
          </div>
        </div>
      </div>
    `;
  }

  renderShopResult() {
    if (!this.generatedShop) {
      return `
        <div class="text-center py-5 text-secondary">
          <i data-lucide="store" style="width: 48px; height: 48px; opacity: 0.4;"></i>
          <p class="mt-2 mb-0">Selecciona el tipo de tienda, asentamiento y establecimiento arriba y pulsa "Generar Tienda e Inventario BTRS".</p>
        </div>
      `;
    }

    const shop = this.generatedShop;
    const activeChar = store.getSelectedCharacter();

    return `
      <div>
        <div class="border-bottom border-secondary pb-2 mb-3">
          <div class="d-flex justify-content-between align-items-start gap-2">
            <div>
              <h5 class="text-warning m-0">${escapeHtml(shop.name)}</h5>
              <div class="text-secondary small mt-1">
                Mercader: <strong>${escapeHtml(shop.merchant)}</strong> &bull; <em>${escapeHtml(shop.personality)}</em>
              </div>
            </div>
            <button id="btn-copy-shop-catalog" class="btn btn-xs btn-outline-warning d-flex align-items-center gap-1" title="Copiar catálogo completo al portapapeles">
              <i data-lucide="copy"></i> Copiar
            </button>
          </div>
          <div class="d-flex flex-wrap gap-1 mt-2">
            <span class="badge bg-secondary">${escapeHtml(shop.categoryName)}</span>
            <span class="badge bg-dark border border-secondary">${escapeHtml(shop.populationName)}</span>
            <span class="badge bg-warning text-dark">${escapeHtml(shop.establishmentName)}</span>
            <span class="badge bg-info text-dark">${shop.items.length} artículos</span>
          </div>
        </div>

        <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
          <table class="table table-dark table-sm table-hover align-middle mb-0 small">
            <thead>
              <tr class="text-secondary">
                <th>Artículo</th>
                <th>Rareza</th>
                <th>Condición</th>
                <th class="text-end">Precio BTRS</th>
                <th class="text-center" style="width: 80px;">Acción</th>
              </tr>
            </thead>
            <tbody>
              ${shop.items.map((item, idx) => `
                <tr>
                  <td>
                    <strong class="text-light" title="${escapeHtml(item.description || item.name)}">${escapeHtml(item.name)}</strong>
                    ${item.description ? `<div class="text-muted text-truncate" style="max-width: 140px; font-size: 0.75rem;" title="${escapeHtml(item.description)}">${escapeHtml(item.description)}</div>` : ''}
                  </td>
                  <td><span class="badge badge-rarity-${item.rarity}">${escapeHtml(item.rarityLabel || item.rarity)}</span></td>
                  <td>
                    <span class="text-secondary" title="${escapeHtml(item.conditionDesc || '')}">${escapeHtml(item.condition)}</span>
                  </td>
                  <td class="text-end text-warning fw-bold" title="${escapeHtml(item.btrsFormula || '')}">
                    ${formatGold(item.price)}
                  </td>
                  <td class="text-center">
                    <div class="btn-group btn-group-sm">
                      <button class="btn btn-xs btn-outline-success btn-shop-buy" data-item-idx="${idx}" title="Añadir a inventario de ${escapeHtml(activeChar?.name || 'personaje')}">
                        <i data-lucide="shopping-cart"></i>
                      </button>
                      <button class="btn btn-xs btn-outline-warning btn-shop-bargain" data-item-idx="${idx}" title="Cargar en la Calculadora para regatear">
                        <i data-lucide="scale"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    if (!this.container) return;

    // Actualización reactiva de modificadores en tiempo real si ya hay cálculo
    const liveRecalc = () => {
      if (this.lastCalculation) {
        this.calculateBtrs(false);
      }
    };

    // Sincronizar selectores de la Calculadora BTRS
    this.container.querySelector('#btrs-population')?.addEventListener('change', (e) => {
      this.selectedPopulation = e.target.value;
      liveRecalc();
    });
    this.container.querySelector('#btrs-shop')?.addEventListener('change', (e) => {
      this.selectedShop = e.target.value;
      liveRecalc();
    });
    this.container.querySelector('#btrs-rarity')?.addEventListener('change', (e) => {
      this.selectedRarity = e.target.value;
      liveRecalc();
    });
    this.container.querySelector('#btrs-condition')?.addEventListener('change', (e) => {
      this.selectedCondition = e.target.value;
      liveRecalc();
    });
    this.container.querySelector('#btrs-cha-mod')?.addEventListener('input', (e) => {
      this.selectedChaMod = parseInt(e.target.value, 10) || 0;
      liveRecalc();
    });
    this.container.querySelector('#btrs-base-price')?.addEventListener('input', (e) => {
      this.selectedBasePrice = parseInt(e.target.value, 10) || 1;
      liveRecalc();
    });

    // Sincronizar selectores del generador de tiendas
    this.container.querySelector('#shop-gen-category')?.addEventListener('change', (e) => {
      this.shopCategory = e.target.value;
    });
    this.container.querySelector('#shop-gen-population')?.addEventListener('change', (e) => {
      this.shopPopulation = e.target.value;
    });
    this.container.querySelector('#shop-gen-establishment')?.addEventListener('change', (e) => {
      this.shopEstablishment = e.target.value;
    });

    // Alternar modo estándar / fijo
    this.container.querySelectorAll('.btn-mode-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.calcMode = e.currentTarget.dataset.mode;
        this.render();
      });
    });

    // Calcular BTRS (tirada completa nueva)
    this.container.querySelector('#btn-calc-btrs')?.addEventListener('click', () => {
      this.calculateBtrs(true);
    });

    // Repetir tirada de dados
    this.container.querySelector('#btn-reroll-btrs')?.addEventListener('click', () => {
      this.calculateBtrs(true);
    });

    // Generar Tienda Procedural
    this.container.querySelector('#btn-gen-shop')?.addEventListener('click', () => {
      this.generateShopInventory();
    });

    // Copiar catálogo al portapapeles
    this.container.querySelector('#btn-copy-shop-catalog')?.addEventListener('click', () => {
      if (!this.generatedShop) return;
      const lines = [
        `=== ${this.generatedShop.name} ===`,
        `Mercader: ${this.generatedShop.merchant} (${this.generatedShop.personality})`,
        `Tipo: ${this.generatedShop.categoryName} | Población: ${this.generatedShop.populationName} | Establecimiento: ${this.generatedShop.establishmentName}`,
        '',
        '--- ARTÍCULOS Y PRECIOS BTRS ---'
      ];
      this.generatedShop.items.forEach(it => {
        lines.push(`• ${it.name} [${it.rarityLabel || it.rarity}] (${it.condition}): ${formatGold(it.price)}`);
      });
      navigator.clipboard.writeText(lines.join('\n'));
      store.showToast('¡Catálogo de tienda copiado al portapapeles!', 'success');
    });

    // Acciones por fila de la tienda
    this.container.querySelectorAll('.btn-shop-buy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.itemIdx, 10);
        const item = this.generatedShop?.items[idx];
        if (!item) return;

        const char = store.getSelectedCharacter();
        if (!char) {
          showToast.warning('No hay ningún personaje seleccionado en la campaña activa.', 'Sin Personaje');
          return;
        }

        const newItem = {
          id: `item_bought_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          name: item.name,
          category: item.category || 'equipo',
          weight: item.weight || 1,
          quantity: 1,
          description: `${item.description || ''} (Comprado en ${this.generatedShop.name} por ${formatGold(item.price)} - Condición: ${item.condition})`,
          isEquipped: false
        };

        const currentInv = Array.isArray(char.inventory) ? char.inventory : [];
        store.updateCharacter(char.id, { inventory: [...currentInv, newItem] });
        store.showToast(`"${item.name}" añadido al inventario de ${char.name}.`, 'success');
      });
    });

    this.container.querySelectorAll('.btn-shop-bargain').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.itemIdx, 10);
        const item = this.generatedShop?.items[idx];
        if (!item) return;

        // Cargar en el motor de precios BTRS
        this.selectedPopulation = this.shopPopulation;
        this.selectedShop = this.shopEstablishment;
        this.selectedRarity = item.rarity;
        if (item.conditionRoll) this.selectedCondition = String(item.conditionRoll);
        this.selectedBasePrice = item.price;

        const popSelect = this.container.querySelector('#btrs-population');
        const shopSelect = this.container.querySelector('#btrs-shop');
        const raritySelect = this.container.querySelector('#btrs-rarity');
        const condSelect = this.container.querySelector('#btrs-condition');
        const basePriceInput = this.container.querySelector('#btrs-base-price');

        if (popSelect) popSelect.value = this.selectedPopulation;
        if (shopSelect) shopSelect.value = this.selectedShop;
        if (raritySelect) raritySelect.value = this.selectedRarity;
        if (condSelect) condSelect.value = this.selectedCondition;
        if (basePriceInput) basePriceInput.value = this.selectedBasePrice;

        this.calculateBtrs(true);
        store.showToast(`Objeto "${item.name}" cargado en la Calculadora BTRS para regateo.`, 'info');
      });
    });
  }

  updateResultView() {
    const resultBox = this.container.querySelector('#btrs-result-box');
    if (resultBox) {
      resultBox.innerHTML = this.renderCalculationResult();
      resultBox.classList.remove('d-none');
    } else {
      this.render();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  calculateBtrs(rerollDice = true) {
    const popSelect = this.container.querySelector('#btrs-population');
    const shopSelect = this.container.querySelector('#btrs-shop');
    const raritySelect = this.container.querySelector('#btrs-rarity');
    const chaModInput = this.container.querySelector('#btrs-cha-mod');
    const basePriceInput = this.container.querySelector('#btrs-base-price');
    const condSelect = this.container.querySelector('#btrs-condition');

    if (popSelect) this.selectedPopulation = popSelect.value;
    if (shopSelect) this.selectedShop = shopSelect.value;
    if (raritySelect) this.selectedRarity = raritySelect.value;
    if (chaModInput) this.selectedChaMod = parseInt(chaModInput.value, 10) || 0;
    if (basePriceInput) this.selectedBasePrice = parseInt(basePriceInput.value, 10) || 500;
    if (condSelect) this.selectedCondition = condSelect.value;

    const popId = this.selectedPopulation;
    const shopId = this.selectedShop;
    const rarityId = this.selectedRarity;
    const chaMod = this.selectedChaMod;

    const pop = POPULATION_MODIFIERS.find(p => p.id === popId) || POPULATION_MODIFIERS[2];
    const shop = SHOP_MODIFIERS.find(s => s.id === shopId) || SHOP_MODIFIERS[0];
    const rarity = RARITY_MODIFIERS.find(r => r.id === rarityId) || RARITY_MODIFIERS[1];

    if (rerollDice || !this.currentDice) {
      this.currentDice = {
        avail: rollDie(20),
        cond: (this.selectedCondition !== 'auto') ? parseInt(this.selectedCondition, 10) : rollDie(6),
        price: rollDie(20),
        bargain: rollDie(20)
      };
    } else if (this.selectedCondition !== 'auto') {
      this.currentDice.cond = parseInt(this.selectedCondition, 10);
    }

    // 1. Disponibilidad en Asentamiento (1d20 + Modificador de Tienda vs CD)
    const key = `${popId}_${rarityId}`;
    const availThreshold = AVAILABILITY_THRESHOLDS[key] || 10;
    const availRoll = this.currentDice.avail + (shop.rollMod || 0);
    const isAvailable = availRoll >= availThreshold;

    if (!isAvailable) {
      this.lastCalculation = {
        calcMode: this.calcMode,
        isAvailable: false,
        availD20: this.currentDice.avail,
        shopMod: shop.rollMod || 0,
        availRoll,
        availThreshold,
        pop,
        shop,
        rarity
      };
      this.updateResultView();
      return;
    }

    // 2. Condición del Objeto (d6)
    const conditionRoll = (this.selectedCondition !== 'auto')
      ? parseInt(this.selectedCondition, 10)
      : this.currentDice.cond;
    const condition = CONDITION_FACTORS.find(c => c.dieRoll === conditionRoll) || CONDITION_FACTORS[0];

    // 3. Modificadores al Precio de los Diferentes Apartados
    const popPercent = pop.pricePercentFixed || 0;
    const shopPercent = shop.pricePercentFixed || 0;
    const condPercent = condition.pricePercentFixed || 0;
    const totalPercentMod = popPercent + shopPercent + condPercent;

    let initialPrice = 100;
    let baseD20 = this.currentDice.price;
    let totalRollMod = 0;
    let finalRollTotal = 10;
    let bracket = null;

    if (this.calcMode === 'fixed') {
      initialPrice = this.selectedBasePrice;
    } else {
      totalRollMod = (shop.rollMod || 0) + (pop.rollMod || 0) + (rarity.rollMod || 0) + (condition.rollMod || 0);
      finalRollTotal = baseD20 + totalRollMod;
      const table = PRICE_TABLES[rarityId] || PRICE_TABLES['comun'];
      bracket = table.find(b => finalRollTotal <= b.maxRoll) || table[table.length - 1];
      initialPrice = bracket.price;
    }

    // Impacto económico exacto en oro por cada apartado
    const popImpactGold = Math.round(initialPrice * popPercent);
    const shopImpactGold = Math.round(initialPrice * shopPercent);
    const condImpactGold = Math.round(initialPrice * condPercent);

    // Subtotal antes de regateo con todos los modificadores de apartados aplicados
    const adjustedPrice = Math.max(1, Math.round(initialPrice * (1 + totalPercentMod)));

    // 4. Regateo (Prueba de Carisma)
    const bargainD20 = this.currentDice.bargain;
    const bargainRoll = bargainD20 + chaMod;
    const bargainRule = BARGAIN_RULES.find(r => bargainRoll <= r.maxRoll) || BARGAIN_RULES[BARGAIN_RULES.length - 1];
    const finalPrice = Math.max(1, Math.round(adjustedPrice * bargainRule.priceMultiplier));
    const bargainImpactGold = finalPrice - adjustedPrice;

    this.lastCalculation = {
      calcMode: this.calcMode,
      isAvailable: true,
      availD20: this.currentDice.avail,
      shopMod: shop.rollMod || 0,
      availRoll,
      availThreshold,
      pop,
      shop,
      rarity,
      conditionRoll,
      condition,
      baseD20,
      totalRollMod,
      finalRollTotal,
      bracket,
      initialPrice,
      popPercent,
      shopPercent,
      condPercent,
      totalPercentMod,
      popImpactGold,
      shopImpactGold,
      condImpactGold,
      adjustedPrice,
      bargainD20,
      chaMod,
      bargainRoll,
      bargainRule,
      bargainImpactGold,
      finalPrice
    };

    this.updateResultView();
  }

  generateShopInventory() {
    this.shopCategory = this.container.querySelector('#shop-gen-category')?.value || this.shopCategory || 'armeria';
    this.shopPopulation = this.container.querySelector('#shop-gen-population')?.value || this.shopPopulation || 'ciudad_peq';
    this.shopEstablishment = this.container.querySelector('#shop-gen-establishment')?.value || this.shopEstablishment || 'vecindario';

    const catConfig = SHOP_CATEGORY_CONFIG[this.shopCategory] || SHOP_CATEGORY_CONFIG.general;
    const pop = POPULATION_MODIFIERS.find(p => p.id === this.shopPopulation) || POPULATION_MODIFIERS[2];
    const shopEst = SHOP_MODIFIERS.find(s => s.id === this.shopEstablishment) || SHOP_MODIFIERS[0];

    // Nombre y Mercader según categoría y establecimiento
    const chosenName = catConfig.names[Math.floor(Math.random() * catConfig.names.length)];
    const chosenMerchantObj = catConfig.merchants[Math.floor(Math.random() * catConfig.merchants.length)];

    // Rarezas permitidas y número de artículos según Asentamiento
    let allowedRarities = ['comun', 'uncomun'];
    let count = 6;
    if (this.shopPopulation === 'aldea') {
      allowedRarities = ['comun', 'uncomun'];
      count = 5;
    } else if (this.shopPopulation === 'pueblo') {
      allowedRarities = ['comun', 'uncomun', 'raro'];
      count = 7;
    } else if (this.shopPopulation === 'ciudad_peq') {
      allowedRarities = ['comun', 'uncomun', 'raro'];
      count = 9;
    } else if (this.shopPopulation === 'ciudad_gra') {
      allowedRarities = ['comun', 'uncomun', 'raro', 'muy_raro'];
      count = 12;
    } else if (this.shopPopulation === 'metropolis') {
      allowedRarities = ['comun', 'uncomun', 'raro', 'muy_raro', 'legendario'];
      count = 15;
    }

    // Filtrar objetos del catálogo global
    let pool = DND55_PRESET_ITEMS.filter(catConfig.filter);
    if (pool.length < count) {
      pool = [...pool, ...DND55_PRESET_ITEMS];
    }

    // Mezclar y seleccionar
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count);

    const items = shuffled.map(preset => {
      // Determinar rareza del objeto según asentamiento
      let rarity = 'comun';
      if (preset.rarity && allowedRarities.includes(preset.rarity)) {
        rarity = preset.rarity;
      } else {
        const rand = Math.random();
        if (allowedRarities.includes('legendario') && rand < 0.05) rarity = 'legendario';
        else if (allowedRarities.includes('muy_raro') && rand < 0.15) rarity = 'muy_raro';
        else if (allowedRarities.includes('raro') && rand < 0.35) rarity = 'raro';
        else if (rand < 0.70) rarity = 'uncomun';
        else rarity = 'comun';
      }

      // Condición (1d6)
      const conditionRoll = (shopEst.id === 'lujo') ? Math.min(6, 3 + rollDie(3)) : rollDie(6);
      const cond = CONDITION_FACTORS.find(c => c.dieRoll === conditionRoll) || CONDITION_FACTORS[0];

      // Rareza del objeto
      const rarityDef = RARITY_MODIFIERS.find(r => r.id === rarity) || RARITY_MODIFIERS[0];

      // Cálculo Canónico BTRS (Tirada modificada por todos los apartados)
      const d20 = rollDie(20);
      const rollTotal = d20 + (shopEst.rollMod || 0) + (pop.rollMod || 0) + (cond.rollMod || 0) + (rarityDef.rollMod || 0);
      const table = PRICE_TABLES[rarity] || PRICE_TABLES['comun'];
      const bracket = table.find(b => rollTotal <= b.maxRoll) || table[table.length - 1];
      const unadjustedPrice = bracket.price;

      // Modificadores de precio de los apartados (Población + Tienda + Condición)
      const totalPercentMod = (pop.pricePercentFixed || 0) + (shopEst.pricePercentFixed || 0) + (cond.pricePercentFixed || 0);
      const finalPrice = Math.max(1, Math.round(unadjustedPrice * (1 + totalPercentMod)));

      return {
        name: preset.name,
        category: preset.category || 'equipo',
        weight: preset.weight || 1,
        description: preset.description || '',
        rarity,
        rarityLabel: rarityDef?.name || rarity,
        conditionRoll,
        condition: cond.name,
        conditionDesc: cond.description,
        price: finalPrice,
        btrsFormula: `Tirada: 1d20 [${d20}] + Tienda (${shopEst.rollMod >= 0 ? '+' : ''}${shopEst.rollMod}) + Población (${pop.rollMod >= 0 ? '+' : ''}${pop.rollMod}) + Condición (${cond.rollMod >= 0 ? '+' : ''}${cond.rollMod}) + Rareza (${rarityDef.rollMod >= 0 ? '+' : ''}${rarityDef.rollMod}) = ${rollTotal} -> Base: ${unadjustedPrice} po | Mod. precio: ${totalPercentMod >= 0 ? '+' : ''}${Math.round(totalPercentMod * 100)}%`
      };
    });

    this.generatedShop = {
      name: chosenName,
      merchant: chosenMerchantObj.name,
      personality: chosenMerchantObj.personality,
      categoryName: catConfig.name,
      populationName: pop.name,
      establishmentName: shopEst.name,
      items
    };

    this.render();
  }
}
