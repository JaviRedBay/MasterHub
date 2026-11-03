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
                <select id="btrs-population" class="form-select bg-dark border-secondary text-light">
                  ${POPULATION_MODIFIERS.map(p => `
                    <option value="${p.id}" ${p.id === 'ciudad_peq' ? 'selected' : ''}>
                      ${p.name} (Mod Precio: ${p.priceMod >= 0 ? '+' : ''}${p.priceMod})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">2. Tipo de Establecimiento</label>
                <select id="btrs-shop" class="form-select bg-dark border-secondary text-light">
                  ${SHOP_MODIFIERS.map(s => `
                    <option value="${s.id}" ${s.id === 'vecindario' ? 'selected' : ''}>
                      ${s.name} (Mod Tirada: ${s.rollMod >= 0 ? '+' : ''}${s.rollMod})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">3. Rareza del Objeto</label>
                <select id="btrs-rarity" class="form-select bg-dark border-secondary text-light">
                  ${RARITY_MODIFIERS.map(r => `
                    <option value="${r.id}" ${r.id === 'uncomun' ? 'selected' : ''}>
                      ${r.name} (Mod: ${r.priceMod >= 0 ? '+' : ''}${r.priceMod})
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Precio Base Fijo (Modo B) -->
              ${this.calcMode === 'fixed' ? `
                <div class="col-md-6">
                  <label class="form-label text-warning small fw-bold">Precio Base Oficial (p.o.)</label>
                  <input type="number" id="btrs-base-price" class="form-control bg-dark border-secondary text-light" value="500" min="1">
                </div>
              ` : `
                <div class="col-md-6">
                  <label class="form-label text-warning small fw-bold">Condición del Objeto</label>
                  <select id="btrs-condition" class="form-select bg-dark border-secondary text-light">
                    <option value="auto">🎲 Tirada Automática (1d6)</option>
                    ${CONDITION_FACTORS.map(c => `
                      <option value="${c.dieRoll}">d6 [${c.dieRoll}] ${c.name} (${c.rollMod >= 0 ? '+' : ''}${c.rollMod})</option>
                    `).join('')}
                  </select>
                </div>
              `}

              <!-- Modificador de Carisma para Regateo -->
              <div class="col-md-6">
                <label class="form-label text-warning small fw-bold">Modificador CAR del Comprador</label>
                <input type="number" id="btrs-cha-mod" class="form-control bg-dark border-secondary text-light" value="2" min="-5" max="10">
              </div>

              <div class="col-md-6 d-flex align-items-end">
                <button type="button" id="btn-calc-btrs" class="btn btn-warning text-dark w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <span>⚡</span> Calcular Disponibilidad y Precio
                </button>
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

    return `
      <div class="p-3 rounded bg-dark border ${res.isAvailable ? 'border-warning' : 'border-danger'}">
        <!-- Disponibilidad -->
        <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
          <div>
            <span class="small text-secondary">Paso 1: Disponibilidad en Asentamiento</span>
            <div class="fw-bold ${res.isAvailable ? 'text-success' : 'text-danger'} fs-5">
              ${res.isAvailable ? '✓ Objeto Encontrado y Disponible' : '✗ Objeto NO Disponible en la Región'}
            </div>
          </div>
          <span class="badge ${res.isAvailable ? 'bg-success' : 'bg-danger'} fs-6">
            Tirada ${res.availRoll} vs CD ${res.availThreshold}
          </span>
        </div>

        ${res.isAvailable ? `
          <!-- Condición -->
          <div class="mb-3 small">
            <span class="text-secondary">Paso 2: Condición del Objeto (d6: ${res.conditionRoll}):</span>
            <div class="fw-bold text-light">${res.condition.name} &bull; <span class="text-warning">${res.condition.description}</span></div>
          </div>

          <!-- Precio Base BTRS -->
          <div class="row g-2 mb-3 text-center">
            <div class="col-6">
              <div class="p-2 rounded bg-black border border-secondary">
                <span class="text-secondary small d-block">Tirada BTRS Modificada</span>
                <span class="fs-4 fw-bold text-light">${res.finalRollTotal}</span>
                <div class="text-muted" style="font-size: 0.7rem;">(1d20: ${res.baseD20} + Mod: ${res.totalMod >= 0 ? '+' : ''}${res.totalMod})</div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-2 rounded bg-black border border-secondary">
                <span class="text-secondary small d-block">Precio Base de Lista</span>
                <span class="fs-4 fw-bold text-warning">${formatGold(res.basePrice)}</span>
              </div>
            </div>
          </div>

          <!-- Regateo -->
          <div class="p-2 rounded bg-black border border-secondary mb-3">
            <div class="d-flex justify-content-between align-items-center small">
              <span class="text-secondary">Paso 4: Prueba de Regateo (CAR):</span>
              <span class="badge bg-primary">Tirada ${res.bargainRoll} (d20: ${res.bargainD20} + CAR: ${res.chaMod >= 0 ? '+' : ''}${res.chaMod})</span>
            </div>
            <div class="small text-light mt-1">${res.bargainRule.label}</div>
          </div>

          <!-- PRECIO FINAL -->
          <div class="text-center p-3 rounded" style="background: linear-gradient(135deg, var(--rpg-crimson-glow), var(--rpg-tint-soft)); border: 2px solid var(--rpg-gold);">
            <div class="small text-warning fw-bold">PRECIO FINAL ACORDADO</div>
            <div class="display-5 fw-bold text-warning">${formatGold(res.finalPrice)}</div>
          </div>
        ` : `
          <div class="alert alert-danger m-0 small">
            El mercader no posee este objeto en existencias ni conoce a nadie en este asentamiento que lo comercie. Se debe buscar en una población mayor o pagar sobornos en el Mercado Negro.
          </div>
        `}
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

    // Calcular BTRS
    this.container.querySelector('#btn-calc-btrs')?.addEventListener('click', () => {
      this.calculateBtrs();
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
        const popSelect = this.container.querySelector('#btrs-population');
        const shopSelect = this.container.querySelector('#btrs-shop');
        const raritySelect = this.container.querySelector('#btrs-rarity');
        const condSelect = this.container.querySelector('#btrs-condition');

        if (popSelect) popSelect.value = this.shopPopulation;
        if (shopSelect) shopSelect.value = this.shopEstablishment;
        if (raritySelect) raritySelect.value = item.rarity;
        if (condSelect && item.conditionRoll) condSelect.value = String(item.conditionRoll);

        this.calculateBtrs();
        store.showToast(`Objeto "${item.name}" cargado en el Motor BTRS para regateo.`, 'info');
      });
    });
  }

  calculateBtrs() {
    const popId = this.container.querySelector('#btrs-population').value;
    const shopId = this.container.querySelector('#btrs-shop').value;
    const rarityId = this.container.querySelector('#btrs-rarity').value;
    const chaMod = parseInt(this.container.querySelector('#btrs-cha-mod').value, 10) || 0;

    const pop = POPULATION_MODIFIERS.find(p => p.id === popId);
    const shop = SHOP_MODIFIERS.find(s => s.id === shopId);
    const rarity = RARITY_MODIFIERS.find(r => r.id === rarityId);

    // 1. Disponibilidad
    const key = `${popId}_${rarityId}`;
    const availThreshold = AVAILABILITY_THRESHOLDS[key] || 10;
    const d20Avail = rollDie(20);
    const availRoll = d20Avail + (shop.rollMod || 0);
    const isAvailable = availRoll >= availThreshold;

    if (!isAvailable) {
      this.lastCalculation = {
        isAvailable: false,
        availRoll,
        availThreshold
      };
      this.render();
      return;
    }

    // 2. Condición
    let conditionRoll = 1;
    const condSelect = this.container.querySelector('#btrs-condition');
    if (condSelect && condSelect.value !== 'auto') {
      conditionRoll = parseInt(condSelect.value, 10);
    } else {
      conditionRoll = rollDie(6);
    }
    const condition = CONDITION_FACTORS.find(c => c.dieRoll === conditionRoll) || CONDITION_FACTORS[0];

    // 3. Precio Base
    let basePrice = 100;
    let finalRollTotal = 10;
    let baseD20 = 10;
    let totalMod = 0;

    if (this.calcMode === 'fixed') {
      const fixedBase = parseInt(this.container.querySelector('#btrs-base-price').value, 10) || 500;
      const multiplier = 1 + (shop.pricePercentFixed || 0) + (condition.pricePercentFixed || 0);
      basePrice = Math.max(1, Math.round(fixedBase * multiplier));
    } else {
      totalMod = (shop.rollMod || 0) + (pop.priceMod || 0) + (rarity.priceMod || 0) + (condition.rollMod || 0);
      baseD20 = rollDie(20);
      finalRollTotal = baseD20 + totalMod;

      const table = PRICE_TABLES[rarityId] || PRICE_TABLES['comun'];
      const bracket = table.find(b => finalRollTotal <= b.maxRoll) || table[table.length - 1];
      const unadjustedPrice = bracket.price;

      const conditionMultiplier = 1 + (condition.pricePercentFixed || 0);
      const shopMultiplier = 1 + (shop.pricePercentFixed || 0);
      basePrice = Math.max(1, Math.round(unadjustedPrice * conditionMultiplier * shopMultiplier));
    }

    // 4. Regateo
    const bargainD20 = rollDie(20);
    const bargainRoll = bargainD20 + chaMod;
    const bargainRule = BARGAIN_RULES.find(r => bargainRoll <= r.maxRoll) || BARGAIN_RULES[BARGAIN_RULES.length - 1];
    const finalPrice = Math.max(1, Math.round(basePrice * bargainRule.priceMultiplier));

    this.lastCalculation = {
      isAvailable: true,
      availRoll,
      availThreshold,
      conditionRoll,
      condition,
      baseD20,
      totalMod,
      finalRollTotal,
      basePrice,
      bargainD20,
      chaMod,
      bargainRoll,
      bargainRule,
      finalPrice
    };

    this.render();
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

      // Cálculo Canónico BTRS
      const d20 = rollDie(20);
      const rollTotal = d20 + (shopEst.rollMod || 0) + (pop.priceMod || 0) + (cond.rollMod || 0);
      const table = PRICE_TABLES[rarity] || PRICE_TABLES['comun'];
      const bracket = table.find(b => rollTotal <= b.maxRoll) || table[table.length - 1];
      const unadjustedPrice = bracket.price;

      const finalPrice = Math.max(1, Math.round(unadjustedPrice * (1 + (cond.pricePercentFixed || 0) + (shopEst.pricePercentFixed || 0))));
      const rarityDef = RARITY_MODIFIERS.find(r => r.id === rarity);

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
        btrsFormula: `Tirada ${d20} + Tienda (${shopEst.rollMod >= 0 ? '+' : ''}${shopEst.rollMod}) + Población (${pop.priceMod >= 0 ? '+' : ''}${pop.priceMod}) = ${rollTotal} -> Base: ${unadjustedPrice} po`
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
