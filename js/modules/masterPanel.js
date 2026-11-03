/**
 * Módulo B: Master Panel (Panel de Seguimiento en Vivo del Dungeon Master)
 * Seguimiento de Puntos de Golpe, ranuras de conjuros, consumibles rápidos,
 * rasgos con usos activos de clase/especie, descansos automáticos 2024 y matriz pasiva.
 */

import { store } from '../state.js';
import { 
  calculateHitPoints, 
  calculateArmorClass, 
  calculatePassivePerception, 
  calculatePassiveInvestigation, 
  calculatePassiveInsight,
  calculatePassivePerceptionDetails,
  calculatePassiveInvestigationDetails,
  calculatePassiveInsightDetails,
  calculateInitiative,
  calculateSpellcasting,
  getConsumableTraitsForCharacter,
  getCharacterSpellSlots,
  DND55_CLASSES,
  getSpeciesName,
  getSublineageName,
  getClassName,
  getSubclassName,
  getCharacterFullClassTitle,
  getCharacterHitDicePool,
  getClassLevel,
  formatModifier,
  getAbilityShortName
} from '../constants/dnd55Rules.js';
import { escapeHtml } from '../utils/formatters.js';
import { rollDie, rollWithAdvantage, rollWithDisadvantage } from '../utils/dice.js';
import { showToast, showSecretRollModal } from '../utils/uiFeedback.js';

export class MasterPanelModule {
  constructor(containerId = 'master-panel-container') {
    this.container = document.getElementById(containerId);
    this.initListeners();
  }

  initListeners() {
    store.on('characters:updated', () => this.render());
    store.on('character:hp-changed', () => this.render());
    store.on('character:inspiration-toggled', () => this.render());
    store.on('character:spellslot-changed', () => this.render());
    store.on('character:trait-changed', () => this.render());
    store.on('character:consumable-changed', () => this.render());
    store.on('campaign:selected', () => this.render());
    store.on('rest:completed', (data) => {
      this.showRestToast(data);
      this.render();
    });
  }

  render() {
    if (!this.container) return;

    const campaignId = store.getSelectedCampaignId();
    const campaign = store.getCampaign(campaignId) || { name: 'Campaña General', description: '' };
    const characters = store.getCharactersByCampaign(campaignId);

    this.container.innerHTML = `
      <!-- Encabezado del Panel del DM -->
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 p-3 rounded rpg-card">
        <div>
          <h2 class="h4 text-warning mb-1 d-flex align-items-center gap-2">
            <span>🛡️</span> Master Panel: ${escapeHtml(campaign.name)}
          </h2>
          <div class="text-secondary small">
            ${characters.length} héroe${characters.length === 1 ? '' : 's'} en la mesa &bull; ${escapeHtml(campaign.description || 'Gestión en tiempo real')}
          </div>
        </div>

        <!-- Botones de Descanso Global para Toda la Mesa -->
        <div class="d-flex flex-wrap gap-2">
          <button id="btn-party-short-rest" class="btn btn-rpg-secondary d-flex align-items-center gap-2" title="Descanso Corto para Toda la Mesa">
            <span>☕</span> Descanso Corto (Mesa)
          </button>
          <button id="btn-party-long-rest" class="btn btn-rpg-primary d-flex align-items-center gap-2" title="Descanso Largo para Toda la Mesa">
            <span>⛺</span> Descanso Largo (Mesa)
          </button>
        </div>
      </div>

      <!-- 1. Matriz de Estadísticas Pasivas de la Mesa -->
      <div class="card rpg-card mb-4">
        <div class="rpg-card-header d-flex justify-content-between align-items-center">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <span>👁️</span> Matriz de Habilidades Pasivas y Salvaciones
          </h5>
          <button id="btn-secret-check" class="btn btn-sm btn-outline-warning">
            🎲 Tirada Secreta de Percepción
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-dark table-hover align-middle mb-0 text-center">
            <thead>
              <tr class="text-secondary small">
                <th class="text-start ps-3">Personaje</th>
                <th>Clase</th>
                <th>Nivel</th>
                <th>CA</th>
                <th>Percepción Pasiva</th>
                <th>Investigación Pasiva</th>
                <th>Perspicacia Pasiva</th>
                <th>Iniciativa</th>
                <th>CD Conjuros</th>
                <th>Hoja Oficial</th>
              </tr>
            </thead>
            <tbody>
              ${characters.length === 0 ? `
                <tr>
                  <td colspan="10" class="text-muted py-4">No hay personajes asignados a esta campaña. Ve al Asistente de Creación o Campañas para añadir aventureros.</td>
                </tr>
              ` : characters.map(char => {
                const acInfo = calculateArmorClass(char);
                const passPerc = calculatePassivePerceptionDetails(char);
                const passInv = calculatePassiveInvestigationDetails(char);
                const passIns = calculatePassiveInsightDetails(char);
                const initInfo = calculateInitiative(char);
                const spellInfo = calculateSpellcasting(char);
                const className = getClassName(char.classId);
                const subclassName = getSubclassName(char.subclassId);
                const fullClass = getCharacterFullClassTitle(char);

                return `
                  <tr>
                    <td class="text-start ps-3 fw-bold text-light">
                      <div class="d-flex align-items-center gap-2">
                        <button class="table-inspiration-badge ${char.heroicInspiration ? 'active' : 'inactive'} btn-toggle-inspiration" data-char-id="${char.id}" title="${char.heroicInspiration ? 'Tiene Inspiración Heroica (haz clic para gastar)' : 'Sin inspiración (haz clic para otorgar)'}">
                          ${char.heroicInspiration ? '★' : '☆'}
                        </button>
                        <button class="btn btn-link text-warning p-0 text-decoration-none fw-bold text-start btn-scroll-to-card" data-char-id="${char.id}" title="Ver tarjeta de ${escapeHtml(char.name)} en este panel">
                          ${escapeHtml(char.name)}
                        </button>
                      </div>
                    </td>
                    <td><span class="badge bg-dark border border-secondary text-warning">${escapeHtml(fullClass)}</span></td>
                    <td><span class="badge bg-warning text-dark fw-bold">Nv ${char.level}</span></td>
                    <td class="fw-bold text-info" title="${escapeHtml(acInfo.formula)}" style="cursor: help;">${escapeHtml(acInfo.acDisplay || String(acInfo.ac))}</td>
                    <td class="fw-bold text-warning" title="${escapeHtml(passPerc.formula)}" style="cursor: help;">${passPerc.value}</td>
                    <td title="${escapeHtml(passInv.formula)}" style="cursor: help;">${passInv.value}</td>
                    <td title="${escapeHtml(passIns.formula)}" style="cursor: help;">${passIns.value}</td>
                    <td class="text-secondary" title="${escapeHtml(initInfo.formula)}" style="cursor: help;">${formatModifier(initInfo.bonus)}</td>
                    <td title="${escapeHtml(spellInfo?.dcFormula || '')}" style="cursor: help;">${spellInfo?.spellSaveDc ? `<span class="badge bg-primary">CD ${spellInfo.spellSaveDc}</span>` : '<span class="text-muted">-</span>'}</td>
                    <td>
                      <button class="btn btn-xs btn-outline-warning btn-open-sheet d-inline-flex align-items-center gap-1" data-char-id="${char.id}" title="Abrir Hoja Oficial de ${escapeHtml(char.name)}">
                        <i data-lucide="scroll" style="width: 12px; height: 12px;"></i> Hoja Oficial
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 2. Tarjetas de Seguimiento Individual de los Personajes -->
      <div class="row g-3">
        ${characters.map(char => this.renderCharacterCard(char)).join('')}
      </div>
    `;

    this.attachEventListeners();
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Renderiza la tarjeta individual táctil para un personaje.
   * @param {Object} char 
   * @returns {string} HTML
   */
  renderCharacterCard(char) {
    const hpInfo = calculateHitPoints(char);
    const maxHp = hpInfo.maxHp;
    const currentHp = char.currentHp !== undefined && char.currentHp !== null ? char.currentHp : maxHp;
    const tempHp = Number(char.temporaryHp) || 0;
    const hpPercent = Math.max(0, Math.min(100, Math.round((currentHp / maxHp) * 100)));
    const speciesName = getSpeciesName(char.speciesId);
    const sublineageName = getSublineageName(char.speciesId, char.sublineageId);
    const fullSpecies = sublineageName ? `${speciesName} (${sublineageName})` : speciesName;
    const className = getClassName(char.classId);
    const subclassName = getSubclassName(char.subclassId);
    const fullClass = getCharacterFullClassTitle(char);

    const acInfo = calculateArmorClass(char);
    const initInfo = calculateInitiative(char);
    const passPerc = calculatePassivePerceptionDetails(char);

    // Dados de Golpe y Tiradas de Muerte
    const classDef = DND55_CLASSES.find(c => c.id === char.classId);
    const hitDie = classDef?.hitDie || 8;
    const hdPool = getCharacterHitDicePool(char);
    const totalHd = hdPool.totalHd || char.level;
    const spentHd = hdPool.spentHd;
    const availableHd = hdPool.availableHd;
    const deathSaves = (char.deathSaves && typeof char.deathSaves === 'object')
      ? char.deathSaves
      : { successes: 0, failures: 0 };

    // Color de la barra de vida
    let hpColorClass = 'hp-bar-healthy';
    if (hpPercent <= 25) {
      hpColorClass = 'hp-bar-critical';
    } else if (hpPercent <= 50) {
      hpColorClass = 'hp-bar-wounded';
    }

    // Ranuras de conjuro
    const spellSlots = getCharacterSpellSlots(char, char.spellSlotsState);

    // Rasgos con usos activos filtrados (Exclusión estricta de rasgos pasivos)
    const activeTraits = getConsumableTraitsForCharacter(char).filter(t => {
      // Excluir pasivas que no tienen coste
      const name = t.name.toLowerCase();
      if (name.includes('bendición de la salud') || name.includes('ingenio') || t.recovery === 'pasiva' || t.maxUses === 0) {
        return false;
      }
      return true;
    });

    const paladinLvl = getClassLevel(char, 'paladin');
    const isPaladin = paladinLvl >= 1;
    const layOnHandsPool = paladinLvl * 5;
    const layOnHandsUsed = char.restTraitsState ? (char.restTraitsState['Imposición de Manos'] || 0) : 0;
    const layOnHandsRemaining = Math.max(0, layOnHandsPool - layOnHandsUsed);

    return `
      <div class="col-12 col-lg-6" id="master-card-${char.id}">
        <div class="rpg-card h-100 p-3">
          <!-- Header de Personaje -->
          <div class="d-flex justify-content-between align-items-start mb-2 border-bottom border-secondary pb-2">
            <div>
              <div class="d-flex align-items-center gap-2">
                <h4 class="h5 m-0 text-light fw-bold">${escapeHtml(char.name)}</h4>
                <button class="btn btn-xs btn-outline-warning btn-open-sheet d-inline-flex align-items-center gap-1 py-0 px-2" data-char-id="${char.id}" title="Abrir Hoja Oficial de ${escapeHtml(char.name)}">
                  <i data-lucide="scroll" style="width: 11px; height: 11px;"></i> Hoja Oficial
                </button>
              </div>
              <div class="text-secondary small mt-1">
                ${escapeHtml(fullSpecies)} &bull; ${escapeHtml(fullClass)} Nivel ${char.level}
              </div>
              <div class="d-flex gap-2 mt-1">
                <span class="badge bg-dark border border-secondary text-info" title="${escapeHtml(acInfo.formula)}" style="cursor: help;">CA ${escapeHtml(acInfo.acDisplay || String(acInfo.ac))}</span>
                <span class="badge bg-dark border border-secondary text-light" title="${escapeHtml(initInfo.formula)}" style="cursor: help;">Inic ${formatModifier(initInfo.bonus)}</span>
                <span class="badge bg-dark border border-secondary text-warning" title="${escapeHtml(passPerc.formula)}" style="cursor: help;">Per. Pasiva ${passPerc.value}</span>
              </div>
            </div>
            <!-- Botón de Inspiración Heroica -->
            <button class="heroic-inspiration-badge ${char.heroicInspiration ? 'active' : ''} btn-toggle-inspiration" data-char-id="${char.id}" title="${char.heroicInspiration ? 'Tiene Inspiración Heroica (haz clic para gastar)' : 'Sin inspiración (haz clic para otorgar)'}">
              <span>★</span> Inspiración Heroica
            </button>
          </div>

          <!-- Barra y Controles de Puntos de Golpe -->
          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="small text-secondary fw-bold">Puntos de Golpe</span>
              <span class="small fw-bold" title="${escapeHtml(hpInfo.formula)}" style="cursor: help;">
                <span class="${currentHp === 0 ? 'text-danger fw-bolder' : 'text-light'}">${currentHp}</span> / ${maxHp}
                ${tempHp > 0 ? `<span class="badge bg-info text-dark ms-1 fw-bold">+${tempHp} Temp</span>` : ''}
              </span>
            </div>
            <div class="hp-bar-container mb-2" title="${escapeHtml(hpInfo.formula)}" style="cursor: help;">
              <div class="hp-bar-fill ${hpColorClass}" style="width: ${hpPercent}%"></div>
              <div class="hp-bar-text">${hpPercent}%</div>
            </div>

            <!-- Fila 1: Daño / Curación (El daño consume Temp primero) -->
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-2">
              <div class="d-flex align-items-center gap-1">
                <span class="small text-secondary me-1" style="font-size: 0.75rem;">Vida:</span>
                <button type="button" class="btn btn-sm btn-outline-danger btn-hp-adjust" data-char-id="${char.id}" data-delta="-10" title="Recibir 10 de daño">-10</button>
                <button type="button" class="btn btn-sm btn-outline-danger btn-hp-adjust" data-char-id="${char.id}" data-delta="-5" title="Recibir 5 de daño">-5</button>
                <button type="button" class="btn btn-sm btn-outline-danger btn-hp-adjust" data-char-id="${char.id}" data-delta="-1" title="Recibir 1 de daño">-1</button>
                <button type="button" class="btn btn-sm btn-outline-success btn-hp-adjust" data-char-id="${char.id}" data-delta="1" title="Curar 1 PG">+1</button>
                <button type="button" class="btn btn-sm btn-outline-success btn-hp-adjust" data-char-id="${char.id}" data-delta="5" title="Curar 5 PG">+5</button>
                <button type="button" class="btn btn-sm btn-outline-success btn-hp-adjust" data-char-id="${char.id}" data-delta="10" title="Curar 10 PG">+10</button>
              </div>
              <span class="text-secondary small" style="font-size: 0.7rem;">(Daño absorbe Temp 1º)</span>
            </div>

            <!-- Fila 2: PG Temporales (Añadir o Quitar como los normales) -->
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 p-1 rounded bg-dark border border-secondary mb-2">
              <div class="d-flex align-items-center gap-1">
                <span class="small text-info me-1" style="font-size: 0.75rem;">Temp:</span>
                <button type="button" class="btn btn-sm btn-outline-secondary btn-temp-hp-adjust" data-char-id="${char.id}" data-delta="-10" title="Quitar 10 PG Temp">-10</button>
                <button type="button" class="btn btn-sm btn-outline-secondary btn-temp-hp-adjust" data-char-id="${char.id}" data-delta="-5" title="Quitar 5 PG Temp">-5</button>
                <button type="button" class="btn btn-sm btn-outline-secondary btn-temp-hp-adjust" data-char-id="${char.id}" data-delta="-1" title="Quitar 1 PG Temp">-1</button>
                <button type="button" class="btn btn-sm btn-outline-info btn-temp-hp-adjust" data-char-id="${char.id}" data-delta="1" title="Añadir 1 PG Temp">+1</button>
                <button type="button" class="btn btn-sm btn-outline-info btn-temp-hp-adjust" data-char-id="${char.id}" data-delta="5" title="Añadir 5 PG Temp">+5</button>
                <button type="button" class="btn btn-sm btn-outline-info btn-temp-hp-adjust" data-char-id="${char.id}" data-delta="10" title="Añadir 10 PG Temp">+10</button>
              </div>
              <div class="input-group input-group-sm ms-auto" style="width: 105px;">
                <span class="input-group-text bg-secondary border-secondary text-light py-0 px-1" style="font-size: 0.7rem;">Total</span>
                <input type="number" class="form-control bg-dark border-secondary text-info text-center py-0 px-1 input-temp-hp" data-char-id="${char.id}" value="${tempHp}" min="0">
              </div>
            </div>

            <!-- Fila 3: Dados de Golpe y Tiradas de Muerte -->
            <div class="row g-2 p-1 rounded bg-dark border border-secondary m-0 align-items-center">
              <div class="col-6 border-end border-secondary pe-2">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small text-light fw-bold" style="font-size: 0.75rem;">Dados (${hdPool.summaryText}):</span>
                  <span class="badge bg-danger">${availableHd} / ${totalHd}</span>
                </div>
                <div class="d-flex gap-1">
                  <button type="button" class="btn btn-xs btn-outline-danger flex-fill btn-mp-hd" data-char-id="${char.id}" data-delta="1" title="Gastar 1 Dado de Golpe" ${availableHd <= 0 ? 'disabled' : ''}>-1 Dado</button>
                  <button type="button" class="btn btn-xs btn-outline-success flex-fill btn-mp-hd" data-char-id="${char.id}" data-delta="-1" title="Recuperar 1 Dado de Golpe" ${spentHd <= 0 ? 'disabled' : ''}>+1 Dado</button>
                </div>
              </div>
              <div class="col-6 ps-2">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="small text-light fw-bold" style="font-size: 0.75rem;">Tiradas Muerte:</span>
                  <button type="button" class="btn btn-xs btn-outline-secondary btn-mp-reset-death" data-char-id="${char.id}" title="Restablecer a 0">Reiniciar</button>
                </div>
                <div class="d-flex justify-content-between align-items-center small">
                  <div class="d-flex align-items-center gap-1">
                    <span class="text-success fw-bold" style="font-size: 0.75rem;">Éx:</span>
                    <button type="button" class="btn btn-xs ${deathSaves.successes >= 1 ? 'btn-success text-dark fw-bold' : 'btn-outline-success'} btn-mp-death-save" data-char-id="${char.id}" data-type="success" data-idx="1" title="1er éxito" style="min-width: 22px; padding: 0 4px;">${deathSaves.successes >= 1 ? '●' : '○'}</button>
                    <button type="button" class="btn btn-xs ${deathSaves.successes >= 2 ? 'btn-success text-dark fw-bold' : 'btn-outline-success'} btn-mp-death-save" data-char-id="${char.id}" data-type="success" data-idx="2" title="2º éxito" style="min-width: 22px; padding: 0 4px;">${deathSaves.successes >= 2 ? '●' : '○'}</button>
                    <button type="button" class="btn btn-xs ${deathSaves.successes >= 3 ? 'btn-success text-dark fw-bold' : 'btn-outline-success'} btn-mp-death-save" data-char-id="${char.id}" data-type="success" data-idx="3" title="3er éxito (Estabilizado)" style="min-width: 22px; padding: 0 4px;">${deathSaves.successes >= 3 ? '●' : '○'}</button>
                  </div>
                  <div class="d-flex align-items-center gap-1">
                    <span class="text-danger fw-bold" style="font-size: 0.75rem;">Fr:</span>
                    <button type="button" class="btn btn-xs ${deathSaves.failures >= 1 ? 'btn-danger text-light fw-bold' : 'btn-outline-danger'} btn-mp-death-save" data-char-id="${char.id}" data-type="failure" data-idx="1" title="1er fallo" style="min-width: 22px; padding: 0 4px;">${deathSaves.failures >= 1 ? '✖' : '○'}</button>
                    <button type="button" class="btn btn-xs ${deathSaves.failures >= 2 ? 'btn-danger text-light fw-bold' : 'btn-outline-danger'} btn-mp-death-save" data-char-id="${char.id}" data-type="failure" data-idx="2" title="2º fallo" style="min-width: 22px; padding: 0 4px;">${deathSaves.failures >= 2 ? '✖' : '○'}</button>
                    <button type="button" class="btn btn-xs ${deathSaves.failures >= 3 ? 'btn-danger text-light fw-bold' : 'btn-outline-danger'} btn-mp-death-save" data-char-id="${char.id}" data-type="failure" data-idx="3" title="3er fallo (Muerte)" style="min-width: 22px; padding: 0 4px;">${deathSaves.failures >= 3 ? '✖' : '○'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ranuras de Conjuro (si es lanzador) -->
          ${spellSlots.length > 0 ? `
            <div class="mb-3 p-2 rounded bg-dark border border-secondary">
              <div class="small text-secondary fw-bold mb-2">Espacios de Conjuro</div>
              <div class="d-flex flex-wrap gap-3">
                ${spellSlots.map(slot => {
                  const available = slot.max - slot.used;
                  return `
                    <div class="d-flex flex-column align-items-center">
                      <span class="small text-secondary mb-1">Nv ${slot.level}</span>
                      <div class="d-flex gap-1">
                        ${Array.from({ length: slot.max }).map((_, i) => {
                          const isUsed = i < slot.used;
                          return `
                            <span class="spell-slot-chip ${isUsed ? 'used' : 'available'} btn-spell-slot-toggle" 
                                  data-char-id="${char.id}" 
                                  data-level="${slot.level}" 
                                  data-action="${isUsed ? 'recover' : 'spend'}"
                                  title="Nivel ${slot.level}: ${isUsed ? 'Gastado (clic para recuperar)' : 'Disponible (clic para gastar)'}">
                            </span>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Rasgos de Clase / Especie con Usos Limitados -->
          ${activeTraits.length > 0 || isPaladin ? `
            <div class="mb-3">
              <div class="small text-secondary fw-bold mb-1">Rasgos y Usos entre Descansos</div>
              <div class="d-flex flex-column gap-2">
                <!-- Imposición de Manos para Paladín -->
                ${isPaladin ? `
                  <div class="d-flex justify-content-between align-items-center p-2 rounded bg-dark border border-secondary">
                    <div>
                      <span class="text-warning fw-bold small">Imposición de Manos</span>
                      <div class="text-secondary small">${layOnHandsRemaining} / ${layOnHandsPool} PG curativos</div>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                      <button class="btn btn-sm btn-outline-danger btn-loh-adjust" data-char-id="${char.id}" data-delta="5">-5</button>
                      <button class="btn btn-sm btn-outline-danger btn-loh-adjust" data-char-id="${char.id}" data-delta="1">-1</button>
                      <button class="btn btn-sm btn-outline-success btn-loh-adjust" data-char-id="${char.id}" data-delta="-5">+5</button>
                    </div>
                  </div>
                ` : ''}

                <!-- Otros rasgos consumibles -->
                ${activeTraits.map(trait => {
                  const used = char.restTraitsState ? (char.restTraitsState[trait.name] || 0) : 0;
                  const available = Math.max(0, trait.maxUses - used);
                  return `
                    <div class="d-flex justify-content-between align-items-center p-2 rounded bg-dark border border-secondary">
                      <div>
                        <span class="text-light fw-bold small">${escapeHtml(trait.name)}</span>
                        <div class="text-secondary small">${trait.description || ''} (${trait.recovery === 'corto' ? 'Recupera en D. Corto' : 'D. Largo'})</div>
                      </div>
                      <div class="d-flex align-items-center gap-1">
                        ${Array.from({ length: trait.maxUses }).map((_, i) => {
                          const isUsed = i < used;
                          return `
                            <button class="btn btn-sm ${isUsed ? 'btn-outline-secondary' : 'btn-warning text-dark fw-bold'} btn-counter btn-trait-toggle" 
                                    data-char-id="${char.id}" 
                                    data-trait="${escapeHtml(trait.name)}" 
                                    data-max="${trait.maxUses}"
                                    data-delta="${isUsed ? -1 : 1}" 
                                    title="${isUsed ? 'Recuperar uso' : 'Gastar uso'}">
                              ${isUsed ? '✕' : '✓'}
                            </button>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Objetos Mágicos con Cargas (Varitas, Bastones, Reliquias) -->
          ${(() => {
            const chargedItems = (char.inventory || []).filter(it => Number(it.maxCharges) > 0 && (it.category || '').toLowerCase() !== 'sortilegio');
            if (chargedItems.length === 0) return '';
            return `
              <div class="mb-3">
                <div class="small text-secondary fw-bold mb-1">⚡ Objetos con Cargas (Varitas / Bastones)</div>
                <div class="d-flex flex-column gap-1">
                  ${chargedItems.map(it => {
                    const maxC = Number(it.maxCharges) || 0;
                    const curC = it.currentCharges !== undefined ? Number(it.currentCharges) : maxC;
                    const recText = it.chargeRecovery || 'Todas en Descanso Largo';
                    return `
                      <div class="d-flex justify-content-between align-items-center p-1 px-2 rounded bg-dark border border-secondary">
                        <div class="me-2 text-truncate">
                          <div class="small fw-semibold text-warning text-truncate" title="${escapeHtml(it.name)}">${escapeHtml(it.name)}</div>
                          <div class="text-muted" style="font-size: 0.68rem;">🔄 Recarga: ${escapeHtml(recText)}</div>
                        </div>
                        <div class="d-flex align-items-center gap-1 flex-shrink-0">
                          <button class="btn btn-sm btn-outline-danger btn-counter btn-mp-item-charge" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="-1" title="Gastar 1 carga" ${curC <= 0 ? 'disabled' : ''}>-1</button>
                          <span class="badge ${curC > 0 ? 'bg-info text-dark' : 'bg-secondary'} fw-bold px-2">⚡ ${curC}/${maxC}</span>
                          <button class="btn btn-sm btn-outline-success btn-counter btn-mp-item-charge" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="1" title="Recuperar 1 carga" ${curC >= maxC ? 'disabled' : ''}>+1</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          })()}

          <!-- Sortilegios (Dones Sobrenaturales / Bastiones DMG) -->
          ${(() => {
            const charmItems = (char.inventory || []).filter(it => (it.category || '').toLowerCase() === 'sortilegio' || (it.name || '').toLowerCase().startsWith('sortilegio'));
            if (charmItems.length === 0) return '';
            return `
              <div class="mb-3">
                <div class="small text-secondary fw-bold mb-1">✨ Sortilegios (Dones Sobrenaturales y Bastión)</div>
                <div class="d-flex flex-column gap-1">
                  ${charmItems.map(it => {
                    const hasCharges = Number(it.maxCharges) > 0;
                    const maxC = Number(it.maxCharges) || 0;
                    const curC = it.currentCharges !== undefined ? Number(it.currentCharges) : maxC;
                    const qty = Math.max(0, Number(it.quantity) || 0);
                    return `
                      <div class="d-flex justify-content-between align-items-center p-1 px-2 rounded bg-dark border border-warning">
                        <div class="me-2 text-truncate">
                          <div class="small fw-semibold text-warning text-truncate" title="${escapeHtml(it.description || it.name)}">✨ ${escapeHtml(it.name)}</div>
                          <div class="text-muted" style="font-size: 0.68rem;">${escapeHtml(it.chargeRecovery || 'Consumible sobrenatural')}</div>
                        </div>
                        ${hasCharges ? `
                          <div class="d-flex align-items-center gap-1 flex-shrink-0">
                            <button class="btn btn-sm btn-outline-danger btn-counter btn-mp-item-charge" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="-1" title="Gastar 1 uso del sortilegio" ${curC <= 0 ? 'disabled' : ''}>-1</button>
                            <span class="badge ${curC > 0 ? 'bg-warning text-dark' : 'bg-secondary'} fw-bold px-2">✨ ${curC}/${maxC}</span>
                            <button class="btn btn-sm btn-outline-success btn-counter btn-mp-item-charge" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="1" title="Recuperar 1 uso" ${curC >= maxC ? 'disabled' : ''}>+1</button>
                          </div>
                        ` : `
                          <div class="d-flex align-items-center gap-1 flex-shrink-0">
                            <button class="btn btn-sm btn-outline-danger btn-counter btn-mp-inv-consumable" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="-1" title="Consumir" ${qty <= 0 ? 'disabled' : ''}>-1</button>
                            <span class="badge ${qty > 0 ? 'bg-warning text-dark' : 'bg-secondary'} fw-bold px-2">${qty}</span>
                            <button class="btn btn-sm btn-outline-success btn-counter btn-mp-inv-consumable" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="1" title="Añadir">+1</button>
                          </div>
                        `}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          })()}

          <!-- Pergaminos de Conjuro y Consumibles del Inventario -->
          ${(() => {
            const invConsumables = (char.inventory || []).filter(it => {
              const cat = (it.category || '').toLowerCase();
              const nm = (it.name || '').toLowerCase();
              if (cat === 'sortilegio' || nm.startsWith('sortilegio')) return false;
              if (Number(it.maxCharges) > 0) return false;
              return cat === 'pergamino' || cat === 'consumible' || nm.startsWith('pergamino') || nm.startsWith('poción') || nm.startsWith('pocion');
            });
            if (invConsumables.length === 0) return '';
            return `
              <div class="mb-3">
                <div class="small text-secondary fw-bold mb-1">📜 Pergaminos y Consumibles de Mochila</div>
                <div class="row g-2">
                  ${invConsumables.map(it => {
                    const isScroll = (it.category || '').toLowerCase() === 'pergamino' || (it.name || '').toLowerCase().startsWith('pergamino');
                    const qty = Math.max(0, Number(it.quantity) || 0);
                    return `
                      <div class="col-6">
                        <div class="d-flex justify-content-between align-items-center p-1 px-2 rounded bg-dark border ${isScroll ? 'border-info' : 'border-secondary'}">
                          <span class="small text-truncate me-1 ${qty === 0 ? 'text-muted text-decoration-line-through' : (isScroll ? 'text-info fw-semibold' : 'text-light')}" title="${escapeHtml(it.description || it.name)}">
                            ${isScroll ? '📜' : '🧪'} ${escapeHtml(it.name)}
                          </span>
                          <div class="d-flex align-items-center gap-1 flex-shrink-0">
                            <button class="btn btn-sm btn-outline-danger btn-counter btn-mp-inv-consumable" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="-1" ${qty <= 0 ? 'disabled' : ''}>-</button>
                            <span class="fw-bold small px-1 ${qty === 0 ? 'text-danger' : ''}">${qty}</span>
                            <button class="btn btn-sm btn-outline-success btn-counter btn-mp-inv-consumable" data-char-id="${char.id}" data-item-id="${escapeHtml(it.id)}" data-delta="1">+</button>
                          </div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          })()}

          <!-- Consumibles Rápidos -->
          <div class="mb-3">
            <div class="small text-secondary fw-bold mb-1">Consumibles Rápidos</div>
            <div class="row g-2">
              ${(char.customConsumables || []).map((cons, index) => `
                <div class="col-6">
                  <div class="d-flex justify-content-between align-items-center p-1 px-2 rounded bg-dark border border-secondary">
                    <span class="small text-truncate me-1" title="${escapeHtml(cons.name)}">${escapeHtml(cons.name)}</span>
                    <div class="d-flex align-items-center gap-1">
                      <button class="btn btn-sm btn-outline-danger btn-counter btn-consumable-adjust" data-char-id="${char.id}" data-index="${index}" data-delta="-1">-</button>
                      <span class="fw-bold small px-1">${cons.quantity}</span>
                      <button class="btn btn-sm btn-outline-success btn-counter btn-consumable-adjust" data-char-id="${char.id}" data-index="${index}" data-delta="1">+</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Acciones de Descanso Individual y Enlaces -->
          <div class="d-flex justify-content-between align-items-center border-top border-secondary pt-2 mt-auto">
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-secondary btn-individual-short-rest" data-char-id="${char.id}">
                ☕ D. Corto
              </button>
              <button class="btn btn-sm btn-outline-warning btn-individual-long-rest" data-char-id="${char.id}">
                ⛺ D. Largo
              </button>
            </div>
            <button class="btn btn-sm btn-rpg-secondary btn-open-sheet" data-char-id="${char.id}">
              Ver Hoja Completa &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    if (!this.container) return;

    // Descanso en grupo
    this.container.querySelector('#btn-party-short-rest')?.addEventListener('click', () => {
      store.applyShortRest(null);
    });

    this.container.querySelector('#btn-party-long-rest')?.addEventListener('click', () => {
      store.applyLongRest(null);
    });

    // Tirada secreta de percepción
    this.container.querySelector('#btn-secret-check')?.addEventListener('click', () => {
      this.handleSecretPerceptionCheck();
    });

    // Ajuste de vida (Daño consume temporales primero, Cura recupera normales)
    this.container.querySelectorAll('.btn-hp-adjust').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        store.applyHpDelta(charId, delta);
      });
    });

    // Ajuste de PG temporales con botones (añadidos y restados como los normales)
    this.container.querySelectorAll('.btn-temp-hp-adjust').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        store.applyTempHpDelta(charId, delta);
      });
    });

    // Temp HP directo desde input numérico
    this.container.querySelectorAll('.input-temp-hp').forEach(input => {
      input.addEventListener('change', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const val = parseInt(e.currentTarget.value, 10) || 0;
        const char = store.getCharacter(charId);
        if (char) {
          store.updateCharacterHp(charId, char.currentHp, val);
        }
      });
    });

    // Alternar Inspiración Heroica
    this.container.querySelectorAll('.btn-toggle-inspiration').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        store.toggleHeroicInspiration(charId);
      });
    });

    // Dados de Golpe en Master Panel
    this.container.querySelectorAll('.btn-mp-hd').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        store.updateHitDice(charId, delta);
      });
    });

    // Tiradas de Muerte en Master Panel
    this.container.querySelectorAll('.btn-mp-death-save').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const type = e.currentTarget.dataset.type;
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        store.toggleDeathSave(charId, type, idx);
      });
    });

    this.container.querySelectorAll('.btn-mp-reset-death').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        store.resetDeathSaves(charId);
      });
    });

    // Ranuras de conjuro
    this.container.querySelectorAll('.btn-spell-slot-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const level = parseInt(e.currentTarget.dataset.level, 10);
        const action = e.currentTarget.dataset.action;
        store.updateSpellSlot(charId, level, action === 'spend' ? 1 : -1);
      });
    });

    // Rasgos con usos
    this.container.querySelectorAll('.btn-trait-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const traitName = e.currentTarget.dataset.trait;
        const maxUses = parseInt(e.currentTarget.dataset.max, 10);
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        store.updateRestTrait(charId, traitName, delta, maxUses);
      });
    });

    // Imposición de Manos
    this.container.querySelectorAll('.btn-loh-adjust').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        const char = store.getCharacter(charId);
        if (char) {
          const pool = char.level * 5;
          store.updateRestTrait(charId, 'Imposición de Manos', delta, pool);
        }
      });
    });

    // Consumibles Rápidos
    this.container.querySelectorAll('.btn-consumable-adjust').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const index = parseInt(e.currentTarget.dataset.index, 10);
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        store.updateConsumable(charId, index, delta);
      });
    });

    // Objetos con cargas en Master Panel
    this.container.querySelectorAll('.btn-mp-item-charge').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const itemId = e.currentTarget.dataset.itemId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        store.updateItemCharges(charId, itemId, delta);
      });
    });

    // Sortilegios y consumibles de inventario en Master Panel
    this.container.querySelectorAll('.btn-mp-inv-consumable').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        const itemId = e.currentTarget.dataset.itemId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        store.updateInventoryItemQuantity(charId, itemId, delta);
      });
    });

    // Descanso individual
    this.container.querySelectorAll('.btn-individual-short-rest').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        store.applyShortRest(charId);
      });
    });

    this.container.querySelectorAll('.btn-individual-long-rest').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        store.applyLongRest(charId);
      });
    });

    // Abrir Hoja de Personaje
    this.container.querySelectorAll('.btn-open-sheet').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.dataset.charId;
        store.setSelectedCharacterId(charId);
        // Cambiar a la pestaña de hoja y subir el scroll al comienzo
        const sheetTabBtn = document.getElementById('tab-sheet-btn');
        if (sheetTabBtn) sheetTabBtn.click();
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
    });

    // Desplazarse suavemente a la tarjeta de personaje en este mismo panel
    this.container.querySelectorAll('.btn-scroll-to-card').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const charId = e.currentTarget.dataset.charId;
        if (charId) {
          const cardEl = document.getElementById(`master-card-${charId}`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const innerCard = cardEl.querySelector('.rpg-card') || cardEl;
            innerCard.classList.remove('card-highlight-pulse');
            void innerCard.offsetWidth; // forzar reflow
            innerCard.classList.add('card-highlight-pulse');
            setTimeout(() => {
              innerCard.classList.remove('card-highlight-pulse');
            }, 1500);
          }
        }
      });
    });
  }

  handleSecretPerceptionCheck() {
    const campaignId = store.getSelectedCampaignId();
    const characters = store.getCharactersByCampaign(campaignId);
    if (characters.length === 0) {
      showToast.warning('No hay personajes registrados en la campaña actual.', 'Mesa Vacía');
      return;
    }

    const rolls = characters.map(char => {
      const passPerc = calculatePassivePerception(char);
      const roll = rollDie(20);
      const mod = passPerc - 10;
      const total = roll + mod;
      return {
        charName: char.name,
        roll,
        mod,
        passPerc,
        total
      };
    });

    showSecretRollModal({
      title: 'Tirada Secreta de Percepción (Mesa del DM)',
      rolls
    });
  }

  showRestToast(data) {
    const typeLabel = data.type === 'short' ? 'Descanso Corto' : 'Descanso Largo';
    const target = data.targetCharId ? 'un personaje' : 'toda la mesa';
    showToast.success(`Se han restaurado los recursos y estadísticas para ${target}.`, `${typeLabel} completado`);
  }
}
