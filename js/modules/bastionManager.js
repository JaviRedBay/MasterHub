/**
 * Módulo: Gestor Integral de Baluartes (Bastions - DMG 2024)
 * Soporta baluartes individuales y combinados entre varios PJs, instalaciones básicas y especiales,
 * cálculo automático de espacios por nivel, órdenes por instalación y generales, asalariados y defensores,
 * balance de costes y beneficios por turno, generador de sucesos 1d100 (automático y manual)
 * y galería de planos verificados con lightbox.
 */

import { store } from '../state.js';
import { escapeHtml } from '../utils/formatters.js';
import { generateMasterPanelAvatarFromUrl, isSafeAvatarDataUrl, isSafeExternalImageUrl } from '../utils/imageValidator.js';
import { showToast, showConfirmModal } from '../utils/uiFeedback.js';
import { getCharacterFullClassTitle } from '../constants/dnd55Rules.js';
import {
  BASTION_SPACE_SIZES,
  BASTION_ORDERS,
  BASTION_BASIC_FACILITIES,
  BASTION_SPECIAL_FACILITIES,
  BASTION_STAFF_ROLES,
  getSpecialFacilitySlotsForLevel,
  resolveBastionEvent
} from '../constants/bastionsData.js';

export class BastionManagerModule {
  constructor(containerId = 'bastions-container') {
    this.container = document.getElementById(containerId);
    this.selectedBastionId = null;
    this.editingFacilityId = null;
    this.editingStaffId = null;
    this.initListeners();
  }

  initListeners() {
    store.on('bastions:updated', () => this.render());
    store.on('characters:updated', () => this.render());
    store.on('campaign:selected', () => {
      this.selectedBastionId = null;
      this.render();
    });
  }

  getActiveBastion(campBastions) {
    if (!campBastions || campBastions.length === 0) {
      this.selectedBastionId = null;
      return null;
    }
    const found = campBastions.find(b => b.id === this.selectedBastionId);
    if (found) return found;
    this.selectedBastionId = campBastions[0].id;
    return campBastions[0];
  }

  calculateSpaceMetrics(bastion, campaignChars) {
    const owners = (bastion.ownerCharacterIds || [])
      .map(id => campaignChars.find(c => c.id === id))
      .filter(Boolean);

    const ownerBreakdowns = owners.map(ch => ({
      id: ch.id,
      name: ch.name,
      level: ch.level || 1,
      slots: getSpecialFacilitySlotsForLevel(ch.level || 1)
    }));

    const baseSpecialSlots = ownerBreakdowns.reduce((sum, o) => sum + o.slots, 0);
    const manualAdjust = Math.round(Number(bastion.manualSpecialSlotsAdjust) || 0);
    const maxSpecialSlots = Math.max(0, baseSpecialSlots + manualAdjust);

    const specialFacilities = (bastion.facilities || []).filter(f => f.type === 'special');
    const basicFacilities = (bastion.facilities || []).filter(f => f.type === 'basic');
    const usedSpecialSlots = specialFacilities.length;

    let totalSquares = 0;
    (bastion.facilities || []).forEach(f => {
      const sz = BASTION_SPACE_SIZES.find(s => s.id === f.space) || BASTION_SPACE_SIZES[1];
      totalSquares += sz.maxSquares;
    });
    // Cada cuadro de 1,5 m × 1,5 m equivale a 2,25 m²
    const totalAreaSqMeters = (totalSquares * 2.25).toFixed(1).replace('.0', '');

    return {
      owners,
      isCombined: owners.length > 1,
      ownerBreakdowns,
      baseSpecialSlots,
      manualAdjust,
      maxSpecialSlots,
      usedSpecialSlots,
      availableSpecialSlots: maxSpecialSlots - usedSpecialSlots,
      basicCount: basicFacilities.length,
      totalSquares,
      totalAreaSqMeters
    };
  }

  calculateTurnEconomy(bastion) {
    const isMaintainAll = bastion.generalOrder === 'maintain';
    const facilities = bastion.facilities || [];
    const staff = bastion.staff || [];

    let facilitiesCostGp = 0;
    let facilitiesIncomeGp = 0;
    const activeTurnBenefits = [];
    const passiveBenefits = [];

    facilities.forEach(fac => {
      if (fac.isDamaged) return;
      if (fac.passiveBenefit) {
        passiveBenefits.push({ facility: fac.name, text: fac.passiveBenefit });
      }
      if (!isMaintainAll && fac.type === 'special' && fac.currentOrder && fac.currentOrder !== 'none') {
        facilitiesCostGp += Math.max(0, Number(fac.turnCostGp) || 0);
        facilitiesIncomeGp += Math.max(0, Number(fac.turnIncomeGp) || 0);
        if (fac.turnBenefit || fac.notes) {
          const ordObj = BASTION_ORDERS.find(o => o.id === fac.currentOrder);
          activeTurnBenefits.push({
            facility: fac.name,
            orderName: ordObj ? ordObj.name.split(' (')[0] : fac.currentOrder,
            benefit: fac.turnBenefit || 'Orden ejecutada',
            notes: fac.notes || ''
          });
        }
      }
    });

    const staffWagesGp = staff.reduce((sum, s) => sum + (Math.max(0, Number(s.wageGpPerTurn) || 0)), 0);
    const totalCostGp = facilitiesCostGp + staffWagesGp;
    const totalIncomeGp = facilitiesIncomeGp;
    const netBalanceGp = totalIncomeGp - totalCostGp;

    const defendersCount = staff.filter(s => s.role === 'defender').length;
    const lieutenantsCount = staff.filter(s => s.role === 'lieutenant').length;
    const facilityHirelingsTotal = facilities.reduce((sum, f) => sum + (Math.max(0, Number(f.hirelingsCount) || 0)), 0);
    const namedHirelingsCount = staff.filter(s => s.role === 'hireling').length;

    // Órdenes disponibles según las instalaciones especiales actuales
    const unlockedOrderIds = new Set(['maintain']);
    facilities.forEach(f => {
      if (f.type === 'special' && !f.isDamaged && f.allowedOrder) {
        unlockedOrderIds.add(f.allowedOrder);
      }
    });

    return {
      isMaintainAll,
      facilitiesCostGp,
      staffWagesGp,
      totalCostGp,
      totalIncomeGp,
      netBalanceGp,
      activeTurnBenefits,
      passiveBenefits,
      defendersCount,
      lieutenantsCount,
      facilityHirelingsTotal,
      namedHirelingsCount,
      unlockedOrderIds
    };
  }

  render() {
    if (!this.container) return;

    const campaignId = store.getSelectedCampaignId();
    const campaign = store.getCampaign(campaignId) || { name: 'Campaña Actual' };
    const campaignChars = store.getCharactersByCampaign(campaignId);
    const campBastions = store.getBastionsByCampaign(campaignId);
    const activeBastion = this.getActiveBastion(campBastions);

    if (campBastions.length === 0 || !activeBastion) {
      this.container.innerHTML = `
        <div class="rpg-card p-4 text-center">
          <div class="display-5 mb-2">🏰</div>
          <h2 class="h4 text-warning mb-2">Baluartes de Campaña: ${escapeHtml(campaign.name)}</h2>
          <p class="text-secondary small mx-auto mb-3" style="max-width: 640px;">
            Esta campaña aún no tiene ningún Baluarte registrado. Según la Guía del Dungeon Master 2024, los personajes de <strong>nivel 5 o superior</strong> pueden adquirir fortalezas individuales o <strong>combinar sus Baluartes</strong> en un gran complejo compartido con instalaciones, asalariados, defensores y turnos de órdenes.
          </p>
          <button type="button" id="btn-create-first-bastion" class="btn btn-rpg-primary d-inline-flex align-items-center gap-2">
            <i data-lucide="castle" style="width: 16px; height: 16px;"></i> + Crear Primer Baluarte
          </button>
        </div>
        ${this.renderBastionModals(null, campaignChars)}
      `;
      this.attachEventListeners(null, campaignChars);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const spaceMetrics = this.calculateSpaceMetrics(activeBastion, campaignChars);
    const economy = this.calculateTurnEconomy(activeBastion);
    const hasArmoryFacility = (activeBastion.facilities || []).some(f => f.templateId === 'armeria' && !f.isDamaged);

    this.container.innerHTML = `
      <!-- Barra Superior de Selección y Gestión de Baluartes -->
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 p-3 rounded rpg-card">
        <div class="d-flex flex-wrap align-items-center gap-2">
          <span class="fs-4">🏰</span>
          <div>
            <div class="d-flex align-items-center flex-wrap gap-2">
              <select id="select-active-bastion" class="form-select form-select-sm bg-dark border-warning text-warning fw-bold" style="width: auto; min-width: 210px;">
                ${campBastions.map(b => `
                  <option value="${b.id}" ${b.id === activeBastion.id ? 'selected' : ''}>
                    ${escapeHtml(b.name)} ${(b.ownerCharacterIds || []).length > 1 ? '(Combinado)' : ''}
                  </option>
                `).join('')}
              </select>
              <span class="badge ${spaceMetrics.isCombined ? 'bg-info text-dark' : 'bg-secondary text-light'}">
                ${spaceMetrics.isCombined ? `Baluarte Combinado (${spaceMetrics.owners.length} PJs)` : (spaceMetrics.owners.length === 1 ? `Propietario: ${escapeHtml(spaceMetrics.owners[0].name)}` : 'Sin PJ vinculado')}
              </span>
              <span class="badge bg-warning text-dark fw-bold">Turno #${activeBastion.turnNumber || 1}</span>
            </div>
            <div class="text-secondary small mt-1">
              ${activeBastion.location ? `📍 ${escapeHtml(activeBastion.location)} &bull; ` : ''}
              ${escapeHtml(activeBastion.description || 'Fortaleza de operaciones del grupo (DMG 2024)')}
            </div>
          </div>
        </div>

        <div class="d-flex flex-wrap align-items-center gap-1">
          <button type="button" id="btn-advance-bastion-turn" class="btn btn-sm btn-warning text-dark fw-bold d-inline-flex align-items-center gap-1" title="Cerrar este turno de 7 días, aplicar balance a tesorería y avanzar al siguiente turno">
            ⏭️ Avanzar Turno
          </button>
          <button type="button" id="btn-edit-bastion-meta" class="btn btn-sm btn-outline-warning d-inline-flex align-items-center gap-1">
            <i data-lucide="settings" style="width: 14px; height: 14px;"></i> Configurar
          </button>
          <button type="button" id="btn-new-bastion" class="btn btn-sm btn-rpg-secondary d-inline-flex align-items-center gap-1">
            + Nuevo Baluarte
          </button>
          <button type="button" id="btn-delete-bastion" class="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1" title="Eliminar este Baluarte">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      </div>

      <!-- Fila 1: Espacios (3.5), Balance Económico (3.6) y Órdenes Generales (3.4) -->
      <div class="row g-3 mb-3">
        <!-- 3.5 Espacios Disponibles y Usados -->
        <div class="col-12 col-md-6 col-xl-4">
          <div class="rpg-card p-3 h-100 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2">
                <h6 class="m-0 text-warning fw-bold d-flex align-items-center gap-1">
                  <span>📐</span> Espacios y Capacidad
                </h6>
                <span class="badge ${spaceMetrics.availableSpecialSlots < 0 ? 'bg-danger' : 'bg-success'}">
                  ${spaceMetrics.availableSpecialSlots >= 0 ? `${spaceMetrics.availableSpecialSlots} Esp. Libres` : `Exceso: ${Math.abs(spaceMetrics.availableSpecialSlots)}`}
                </span>
              </div>

              <div class="d-flex justify-content-between align-items-center mb-1 small">
                <span class="text-light fw-semibold">Instalaciones Especiales:</span>
                <strong class="${spaceMetrics.usedSpecialSlots > spaceMetrics.maxSpecialSlots ? 'text-danger' : 'text-warning'} fs-6">
                  ${spaceMetrics.usedSpecialSlots} / ${spaceMetrics.maxSpecialSlots} usadas
                </strong>
              </div>

              <div class="text-secondary mb-2" style="font-size: 0.74rem;">
                ${spaceMetrics.ownerBreakdowns.length > 0
                  ? `Cupo por nivel: ${spaceMetrics.ownerBreakdowns.map(o => `${escapeHtml(o.name)} (Nv ${o.level}: ${o.slots})`).join(' + ')}${spaceMetrics.manualAdjust !== 0 ? ` ${spaceMetrics.manualAdjust > 0 ? '+' : ''}${spaceMetrics.manualAdjust} DM` : ''}`
                  : `Sin PJs asignados (asigna PJs en Configurar para calcular el cupo automático${spaceMetrics.manualAdjust !== 0 ? `; Ajuste DM: ${spaceMetrics.manualAdjust}` : ''}).`}
              </div>

              <div class="row g-2 text-center mt-1">
                <div class="col-4">
                  <div class="p-1 rounded bg-dark border border-secondary">
                    <div class="text-secondary" style="font-size: 0.66rem;">Inst. Básicas</div>
                    <strong class="text-light small">${spaceMetrics.basicCount}</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-1 rounded bg-dark border border-secondary" title="Suma máxima de cuadros de 1,5 m de todas las instalaciones">
                    <div class="text-secondary" style="font-size: 0.66rem;">Cuadros 1,5m</div>
                    <strong class="text-info small">${spaceMetrics.totalSquares}</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-1 rounded bg-dark border border-secondary">
                    <div class="text-secondary" style="font-size: 0.66rem;">Superficie</div>
                    <strong class="text-light small">~${spaceMetrics.totalAreaSqMeters} m²</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-2 pt-2 border-top border-secondary small">
              <span class="text-secondary" style="font-size: 0.72rem;">Ajuste manual de cupo especial (DM):</span>
              <div class="d-flex align-items-center gap-1">
                <button type="button" class="btn btn-xs btn-outline-secondary py-0 px-1 btn-adjust-special-slots" data-delta="-1">-</button>
                <span class="badge bg-dark border border-secondary text-warning">${spaceMetrics.manualAdjust >= 0 ? `+${spaceMetrics.manualAdjust}` : spaceMetrics.manualAdjust}</span>
                <button type="button" class="btn btn-xs btn-outline-secondary py-0 px-1 btn-adjust-special-slots" data-delta="1">+</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3.6 Costes, Tesorería y Beneficios por Turno -->
        <div class="col-12 col-md-6 col-xl-4">
          <div class="rpg-card p-3 h-100 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2">
                <h6 class="m-0 text-warning fw-bold d-flex align-items-center gap-1">
                  <span>💰</span> Economía por Turno (7 días)
                </h6>
                <div class="d-flex align-items-center gap-1">
                  <span class="text-secondary" style="font-size: 0.7rem;">Tesorería:</span>
                  <input type="number" id="input-bastion-treasury" class="form-control form-control-sm bg-dark border-secondary text-warning fw-bold text-center py-0 px-1" value="${activeBastion.treasuryGp || 0}" min="0" step="1" style="width: 82px; height: 22px; font-size: 0.76rem;" title="Oro almacenado en el arca del Baluarte (PO)">
                  <span class="text-warning small fw-bold">PO</span>
                </div>
              </div>

              <div class="row g-2 text-center mb-2">
                <div class="col-4">
                  <div class="p-1 rounded bg-dark border border-secondary">
                    <div class="text-secondary" style="font-size: 0.66rem;">Coste Turno</div>
                    <strong class="text-danger small">-${economy.totalCostGp} PO</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-1 rounded bg-dark border border-secondary">
                    <div class="text-secondary" style="font-size: 0.66rem;">Ingreso Turno</div>
                    <strong class="text-success small">+${economy.totalIncomeGp} PO</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-1 rounded bg-dark border border-secondary">
                    <div class="text-secondary" style="font-size: 0.66rem;">Balance Neto</div>
                    <strong class="${economy.netBalanceGp >= 0 ? 'text-info' : 'text-warning'} small">${economy.netBalanceGp >= 0 ? `+${economy.netBalanceGp}` : economy.netBalanceGp} PO</strong>
                  </div>
                </div>
              </div>

              <div class="small text-secondary mb-1" style="font-size: 0.72rem;">
                Desglose: Instalaciones (-${economy.facilitiesCostGp} PO) &bull; Salarios PNJs (-${economy.staffWagesGp} PO)
              </div>

              <div class="overflow-y-auto pe-1" style="max-height: 95px;">
                ${economy.isMaintainAll ? `
                  <div class="text-info small" style="font-size: 0.74rem;">🛡️ Orden <strong>Mantener</strong> activa: coste de órdenes 0 PO y se tira 1 Suceso de Baluarte al cerrar el turno.</div>
                ` : economy.activeTurnBenefits.length === 0 ? `
                  <div class="text-muted small" style="font-size: 0.74rem;">Asigna órdenes en tus Instalaciones Especiales abajo para ver los productos y beneficios de este turno.</div>
                ` : economy.activeTurnBenefits.map(b => `
                  <div class="text-light" style="font-size: 0.73rem;">
                    • <strong class="text-warning">${escapeHtml(b.facility)}</strong> [${escapeHtml(b.orderName)}]: ${escapeHtml(b.benefit)}${b.notes ? ` <em>(${escapeHtml(b.notes)})</em>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- 3.4 Panel General de Órdenes de Baluarte -->
        <div class="col-12 col-xl-4">
          <div class="rpg-card p-3 h-100 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2">
                <h6 class="m-0 text-warning fw-bold d-flex align-items-center gap-1">
                  <span>📜</span> Órdenes del Baluarte
                </h6>
                <select id="select-bastion-general-order" class="form-select form-select-sm bg-dark border-warning text-warning fw-bold py-0 px-2 pe-4" style="width: auto; height: 24px; font-size: 0.73rem;">
                  <option value="individual" ${activeBastion.generalOrder !== 'maintain' ? 'selected' : ''}>Órdenes por Instalación</option>
                  <option value="maintain" ${activeBastion.generalOrder === 'maintain' ? 'selected' : ''}>Mantener Todo (General)</option>
                </select>
              </div>

              <div class="text-secondary mb-2" style="font-size: 0.73rem;">
                Órdenes habilitadas actualmente según las instalaciones construidas en este Baluarte (pasa el ratón para ver su regla DMG 2024):
              </div>

              <div class="d-flex flex-wrap gap-1 mb-2">
                ${BASTION_ORDERS.map(ord => {
                  const isUnlocked = economy.unlockedOrderIds.has(ord.id);
                  const activeCount = (activeBastion.facilities || []).filter(f => !f.isDamaged && f.type === 'special' && f.currentOrder === ord.id).length;
                  return `
                    <span class="rpg-condition-pill badge ${isUnlocked ? 'bg-dark border border-warning text-warning' : 'bg-dark border border-secondary text-muted opacity-50'} py-1 px-2" style="font-size: 0.68rem;">
                      ${escapeHtml(ord.name.split(' (')[0])}${activeCount > 0 && !economy.isMaintainAll ? ` (${activeCount})` : ''}
                      <span class="rpg-condition-tooltip">
                        <strong>${escapeHtml(ord.name)}</strong>
                        <div>${escapeHtml(ord.description)}</div>
                      </span>
                    </span>
                  `;
                }).join('')}
              </div>
            </div>

            ${hasArmoryFacility ? `
              <div class="form-check form-switch mt-1 pt-2 border-top border-secondary small">
                <input class="form-check-input" type="checkbox" id="chk-bastion-armory-stocked" ${activeBastion.armoryStocked ? 'checked' : ''}>
                <label class="form-check-label text-info small" for="chk-bastion-armory-stocked" style="font-size: 0.73rem;">
                  🛡️ Armería Abastecida (Defensores tiran <strong>1d8</strong> en ataques)
                </label>
              </div>
            ` : `
              <div class="text-muted pt-2 border-top border-secondary" style="font-size: 0.7rem;">
                💡 Construye una <em>Armería</em> para mejorar el dado de tus Defensores de 1d6 a 1d8.
              </div>
            `}
          </div>
        </div>
      </div>

      <!-- Fila 2: Instalaciones del Baluarte (3.2 y 3.4) -->
      <div class="rpg-card p-3 mb-3">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 border-bottom border-secondary pb-2 mb-3">
          <div>
            <h5 class="h6 m-0 text-warning fw-bold d-flex align-items-center gap-2">
              <span>🏛️</span> Instalaciones del Baluarte (${(activeBastion.facilities || []).length})
            </h5>
            <div class="text-secondary" style="font-size: 0.73rem;">
              Gestiona instalaciones especiales y básicas, sus descripciones, beneficios pasivos y la orden activa de cada una.
            </div>
          </div>
          <div class="d-flex gap-1">
            <button type="button" id="btn-add-special-facility" class="btn btn-sm btn-rpg-primary py-1 px-2">
              + Añadir Instalación Especial
            </button>
            <button type="button" id="btn-add-basic-facility" class="btn btn-sm btn-outline-warning py-1 px-2">
              + Añadir Básica
            </button>
          </div>
        </div>

        ${(activeBastion.facilities || []).length === 0 ? `
          <div class="p-3 text-center text-secondary small border border-secondary border-opacity-50 rounded">
            Este Baluarte aún no tiene instalaciones añadidas. Un Baluarte inicial suele comenzar con 2 instalaciones básicas (1 Estrecha + 1 Espaciosa) y 2 instalaciones especiales por cada PJ de nivel 5+.
          </div>
        ` : `
          <div class="row g-2">
            ${(activeBastion.facilities || []).map(fac => {
              const spaceObj = BASTION_SPACE_SIZES.find(s => s.id === fac.space) || BASTION_SPACE_SIZES[1];
              const ownerChar = fac.assignedOwnerId ? campaignChars.find(c => c.id === fac.assignedOwnerId) : null;
              const facStaff = (activeBastion.staff || []).filter(s => s.facilityId === fac.id);
              return `
                <div class="col-12 col-lg-6">
                  <div class="p-2 px-3 rounded bg-dark border ${fac.isDamaged ? 'border-danger' : (fac.type === 'special' ? 'border-warning border-opacity-75' : 'border-secondary')} h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div class="d-flex justify-content-between align-items-start gap-2 mb-1">
                        <div class="d-flex align-items-center flex-wrap gap-1">
                          <span class="badge ${fac.type === 'special' ? 'bg-warning text-dark' : 'bg-secondary text-light'} py-0 px-1" style="font-size: 0.65rem;">
                            ${fac.type === 'special' ? 'Especial' : 'Básica'}
                          </span>
                          <strong class="text-light small">${escapeHtml(fac.name)}</strong>
                          <span class="badge bg-dark border border-secondary text-info py-0 px-1" style="font-size: 0.65rem;" title="${escapeHtml(spaceObj.dimensionsMetric)}">
                            ${escapeHtml(spaceObj.name.split(' (')[0])} (${spaceObj.maxSquares} c.)
                          </span>
                          ${ownerChar ? `<span class="badge bg-dark border border-warning text-warning py-0 px-1" style="font-size: 0.64rem;">👤 ${escapeHtml(ownerChar.name)}</span>` : ''}
                          ${fac.isDamaged ? `<span class="badge bg-danger text-light py-0 px-1" style="font-size: 0.65rem;">⚠️ Dañada</span>` : ''}
                        </div>
                        <div class="d-flex align-items-center gap-1 flex-shrink-0">
                          ${fac.type === 'special' ? `
                            <button type="button" class="btn btn-xs ${fac.isDamaged ? 'btn-danger' : 'btn-outline-secondary'} py-0 px-1 btn-toggle-fac-damaged" data-fac-id="${fac.id}" title="${fac.isDamaged ? 'Marcar como reparada' : 'Marcar como dañada por ataque'}">🔧</button>
                          ` : ''}
                          <button type="button" class="btn btn-xs btn-outline-warning py-0 px-1 btn-edit-facility" data-fac-id="${fac.id}" title="Editar instalación">✏️</button>
                          <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-delete-facility" data-fac-id="${fac.id}" title="Demoler / eliminar instalación">🗑️</button>
                        </div>
                      </div>

                      ${fac.description ? `<div class="text-secondary mb-1" style="font-size: 0.75rem;">${escapeHtml(fac.description)}</div>` : ''}
                      ${fac.passiveBenefit ? `<div class="text-info mb-1" style="font-size: 0.73rem;">✨ <strong>Efecto pasivo:</strong> ${escapeHtml(fac.passiveBenefit)}</div>` : ''}
                      ${fac.orderSummary ? `<div class="text-muted mb-1" style="font-size: 0.72rem;">📋 <strong>Orden posible:</strong> ${escapeHtml(fac.orderSummary)}</div>` : ''}

                      <div class="d-flex flex-wrap align-items-center gap-2 text-secondary mt-1" style="font-size: 0.7rem;">
                        <span>👷 Asalariados base: <strong class="text-light">${fac.hirelingsCount || 0}</strong>${facStaff.length > 0 ? ` (${facStaff.map(s => escapeHtml(s.name)).join(', ')})` : ''}</span>
                        ${(fac.turnCostGp > 0 || fac.turnIncomeGp > 0) ? `
                          <span>&bull; Turno: ${fac.turnCostGp > 0 ? `<span class="text-danger">-${fac.turnCostGp} PO</span>` : ''} ${fac.turnIncomeGp > 0 ? `<span class="text-success">+${fac.turnIncomeGp} PO</span>` : ''}</span>
                        ` : ''}
                      </div>
                    </div>

                    ${fac.type === 'special' ? `
                      <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mt-2 pt-2 border-top border-secondary border-opacity-50">
                        <div class="d-flex align-items-center gap-1">
                          <span class="text-warning fw-semibold" style="font-size: 0.7rem;">Orden Turno:</span>
                          <select class="form-select form-select-sm bg-dark border-secondary text-light py-0 px-2 pe-4 select-facility-order" data-fac-id="${fac.id}" style="width: auto; height: 22px; font-size: 0.71rem;" ${(economy.isMaintainAll || fac.isDamaged) ? 'disabled' : ''}>
                            <option value="none" ${(!fac.currentOrder || fac.currentOrder === 'none') ? 'selected' : ''}>Mantener / Reposo</option>
                            ${BASTION_ORDERS.filter(o => o.scope === 'facility').map(o => `
                              <option value="${o.id}" ${fac.currentOrder === o.id ? 'selected' : ''}>
                                ${escapeHtml(o.name.split(' (')[0])}${fac.allowedOrder === o.id ? ' ★' : ''}
                              </option>
                            `).join('')}
                          </select>
                        </div>
                        <input type="text" class="form-control form-control-sm bg-dark border-secondary text-light py-0 px-2 input-facility-order-note" data-fac-id="${fac.id}" placeholder="Detalle de orden (ej. Poción curación)..." value="${escapeHtml(fac.notes || '')}" style="max-width: 210px; height: 22px; font-size: 0.71rem;" ${fac.isDamaged ? 'disabled' : ''}>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Fila 3: Asalariados, Defensores y PNJs (3.3) + Generador de Sucesos (3.7) -->
      <div class="row g-3 mb-3">
        <!-- 3.3 Personal, Asalariados y Defensores -->
        <div class="col-12 col-xl-6">
          <div class="rpg-card p-3 h-100 d-flex flex-column">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 border-bottom border-secondary pb-2 mb-2">
              <div>
                <h5 class="h6 m-0 text-warning fw-bold d-flex align-items-center gap-2">
                  <span>🛡️</span> Asalariados, Defensores y PNJs (${(activeBastion.staff || []).length})
                </h5>
                <div class="text-secondary" style="font-size: 0.72rem;">
                  Defensores: <strong class="text-danger">${economy.defendersCount}</strong> (${activeBastion.armoryStocked && hasArmoryFacility ? '1d8' : '1d6'}) &bull; Lugartenientes: <strong class="text-warning">${economy.lieutenantsCount}</strong> &bull; Puestos en inst.: <strong class="text-info">${economy.facilityHirelingsTotal}</strong>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-1">
                <button type="button" id="btn-quick-add-defender" class="btn btn-xs btn-outline-danger py-0 px-2" title="Reclutar 1 Defensor del Baluarte rápido">+1 Defensor</button>
                <button type="button" id="btn-add-bastion-staff" class="btn btn-xs btn-outline-warning py-0 px-2">+ Añadir PNJ / Asalariado</button>
              </div>
            </div>

            <div class="d-flex flex-column gap-1 overflow-y-auto" style="max-height: 310px;">
              ${(activeBastion.staff || []).length === 0 ? `
                <div class="p-3 text-center text-secondary small border border-secondary border-opacity-50 rounded">
                  No hay PNJs nominales o defensores registrados aún. Añade a los trabajadores de tus instalaciones, defensores de la guarnición, senescales o invitados.
                </div>
              ` : (activeBastion.staff || []).map(npc => {
                const roleDef = BASTION_STAFF_ROLES.find(r => r.id === npc.role) || BASTION_STAFF_ROLES[0];
                const linkedFac = npc.facilityId ? (activeBastion.facilities || []).find(f => f.id === npc.facilityId) : null;
                return `
                  <div class="p-1 px-2 rounded bg-dark border border-secondary d-flex justify-content-between align-items-center gap-2">
                    <div class="min-w-0">
                      <div class="d-flex align-items-center flex-wrap gap-1">
                        <span class="badge ${roleDef.badgeClass} py-0 px-1" style="font-size: 0.63rem;">${escapeHtml(roleDef.name.split(' (')[0])}</span>
                        <strong class="text-light small">${escapeHtml(npc.name)}</strong>
                        ${linkedFac ? `<span class="badge bg-dark border border-secondary text-info py-0 px-1" style="font-size: 0.63rem;">🏛️ ${escapeHtml(linkedFac.name)}</span>` : ''}
                        ${npc.wageGpPerTurn > 0 ? `<span class="text-danger" style="font-size: 0.68rem;">(-${npc.wageGpPerTurn} PO/turno)</span>` : ''}
                      </div>
                      ${npc.notes ? `<div class="text-secondary text-truncate" style="font-size: 0.72rem;" title="${escapeHtml(npc.notes)}">${escapeHtml(npc.notes)}</div>` : ''}
                    </div>
                    <div class="d-flex align-items-center gap-1 flex-shrink-0">
                      <button type="button" class="btn btn-xs btn-outline-warning py-0 px-1 btn-edit-staff" data-staff-id="${npc.id}" title="Editar PNJ">✏️</button>
                      <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-delete-staff" data-staff-id="${npc.id}" title="Dar de baja">🗑️</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- 3.7 Generador de Sucesos de Baluarte (Automático y Manual) -->
        <div class="col-12 col-xl-6">
          <div class="rpg-card p-3 h-100 d-flex flex-column">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 border-bottom border-secondary pb-2 mb-2">
              <h5 class="h6 m-0 text-warning fw-bold d-flex align-items-center gap-2">
                <span>🎲</span> Sucesos de Baluarte (DMG 2024)
              </h5>
              <div class="d-flex flex-wrap align-items-center gap-1">
                <button type="button" id="btn-roll-auto-bastion-event" class="btn btn-xs btn-warning text-dark fw-bold py-0 px-2" title="Tirar 1d100 automáticamente en la tabla oficial de sucesos">
                  🎲 Suceso Automático (1d100)
                </button>
                <div class="input-group input-group-sm" style="width: 145px;">
                  <input type="number" id="input-manual-bastion-roll" class="form-control bg-dark border-secondary text-warning text-center py-0 px-1" min="1" max="100" placeholder="1-100" style="height: 23px; font-size: 0.73rem;" title="Introduce el resultado del d100 tirado en mesa">
                  <button type="button" id="btn-roll-manual-bastion-event" class="btn btn-outline-warning py-0 px-2" style="height: 23px; font-size: 0.7rem;">Usar Dado</button>
                </div>
              </div>
            </div>

            <div class="d-flex flex-column gap-2 overflow-y-auto" style="max-height: 310px;">
              ${(activeBastion.eventsLog || []).length === 0 ? `
                <div class="p-3 text-center text-secondary small border border-secondary border-opacity-50 rounded">
                  No se han registrado sucesos todavía. Genera una tirada automática de 1d100 o escribe el resultado de tu dado cuando se emita la orden <strong>Mantener</strong>.
                </div>
              ` : (activeBastion.eventsLog || []).map((ev, idx) => `
                <div class="p-2 rounded bg-dark border ${ev.eventId === 'attack' ? 'border-danger' : 'border-secondary'}">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <div class="d-flex align-items-center gap-1 flex-wrap">
                      <span class="badge bg-warning text-dark py-0 px-1" style="font-size: 0.66rem;">d100 = ${ev.roll} ${ev.isManual ? '(Manual)' : '(Auto)'}</span>
                      <strong class="text-light small">${escapeHtml(ev.title)}</strong>
                    </div>
                    <button type="button" class="btn btn-xs btn-outline-secondary py-0 px-1 btn-delete-bastion-event" data-idx="${idx}" title="Borrar entrada" style="font-size: 0.65rem;">&times;</button>
                  </div>
                  <div class="text-warning small mb-1" style="font-size: 0.75rem;">${escapeHtml(ev.summary)}</div>
                  <div class="text-secondary" style="font-size: 0.72rem;">${escapeHtml(ev.details)}</div>
                  ${Array.isArray(ev.extraNotes) && ev.extraNotes.length > 0 ? `
                    <div class="mt-1 pt-1 border-top border-secondary border-opacity-50 text-info" style="font-size: 0.73rem;">
                      ${ev.extraNotes.map(n => `<div>${escapeHtml(n)}</div>`).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Fila 4: Planos e Imágenes del Baluarte (3.8) -->
      <div class="rpg-card p-3">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 border-bottom border-secondary pb-2 mb-3">
          <div>
            <h5 class="h6 m-0 text-warning fw-bold d-flex align-items-center gap-2">
              <span>🗺️</span> Planos y Mapas del Baluarte (${(activeBastion.blueprints || []).length})
            </h5>
            <div class="text-secondary" style="font-size: 0.72rem;">
              Añade enlaces a imágenes de planos o mapas con la misma verificación criptográfica (Magic Bytes) que los retratos de PJ. Haz clic en un plano para ampliarlo.
            </div>
          </div>
        </div>

        <form id="form-add-bastion-blueprint" class="row g-2 align-items-end mb-3 p-2 rounded bg-dark border border-secondary">
          <div class="col-12 col-md-3">
            <label class="form-label small text-warning mb-1" style="font-size: 0.72rem;">Título de Planta / Mapa</label>
            <input type="text" id="input-bp-title" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Planta Principal / Murallas">
          </div>
          <div class="col-12 col-md-7">
            <label class="form-label small text-warning mb-1" style="font-size: 0.72rem;">URL de la Imagen (HTTPS: PNG, JPG, WEBP, GIF)</label>
            <input type="url" id="input-bp-url" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="https://ejemplo.com/plano-baluarte.webp" required>
          </div>
          <div class="col-12 col-md-2 d-grid">
            <button type="submit" id="btn-submit-blueprint" class="btn btn-sm btn-outline-warning">
              🔍 Verificar y Subir
            </button>
          </div>
          <div class="col-12">
            <div id="bastion-bp-status" class="small text-secondary" style="font-size: 0.72rem;"></div>
          </div>
        </form>

        ${(activeBastion.blueprints || []).length === 0 ? `
          <div class="p-3 text-center text-secondary small border border-secondary border-opacity-50 rounded">
            Aún no hay planos subidos para este Baluarte.
          </div>
        ` : `
          <div class="row g-3">
            ${(activeBastion.blueprints || []).map(bp => {
              const imgSrc = isSafeExternalImageUrl(bp.imageUrl) ? bp.imageUrl : bp.thumbDataUrl;
              return `
                <div class="col-12 col-sm-6 col-md-4 col-xl-3">
                  <div class="p-2 rounded bg-dark border border-secondary h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div class="ratio ratio-4x3 rounded overflow-hidden border border-secondary mb-2" style="cursor: zoom-in;">
                        <img
                          src="${escapeHtml(imgSrc)}"
                          ${isSafeAvatarDataUrl(bp.thumbDataUrl) ? `data-fallback-thumb="${escapeHtml(bp.thumbDataUrl)}" onerror="if(this.dataset.fallbackThumb && this.src !== this.dataset.fallbackThumb){this.src=this.dataset.fallbackThumb;}"` : ''}
                          referrerpolicy="no-referrer"
                          alt="${escapeHtml(bp.title)}"
                          class="w-100 h-100 object-fit-cover btn-open-bp-lightbox"
                          data-img-src="${escapeHtml(imgSrc)}"
                          data-img-title="${escapeHtml(bp.title)}"
                        >
                      </div>
                      <div class="d-flex justify-content-between align-items-center gap-1">
                        <strong class="text-warning small text-truncate" title="${escapeHtml(bp.title)}">${escapeHtml(bp.title)}</strong>
                        <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-delete-blueprint" data-bp-id="${bp.id}" title="Eliminar plano">🗑️</button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      ${this.renderBastionModals(activeBastion, campaignChars)}
    `;

    this.attachEventListeners(activeBastion, campaignChars);
    if (window.lucide) window.lucide.createIcons();
  }

  renderBastionModals(activeBastion, campaignChars) {
    return `
      <!-- Modal Crear / Configurar Baluarte (Individual o Combinado) -->
      <dialog id="modal-bastion-meta" class="rpg-dialog p-3" style="max-width: 600px; width: 95%;">
        <form id="form-bastion-meta">
          <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
            <h5 class="m-0 text-warning" id="modal-bastion-meta-title">🏰 Configurar Baluarte</h5>
            <button type="button" class="btn-close btn-close-white" id="btn-close-bastion-meta"></button>
          </div>
          <input type="hidden" id="input-bastion-id" value="">
          <div class="row g-2">
            <div class="col-12 col-sm-7">
              <label class="form-label small text-warning mb-1">Nombre del Baluarte *</label>
              <input type="text" id="input-bastion-name" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Torreón del Alba" required>
            </div>
            <div class="col-12 col-sm-5">
              <label class="form-label small text-secondary mb-1">Ubicación / Región</label>
              <input type="text" id="input-bastion-location" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Costa de la Espada">
            </div>
            <div class="col-12">
              <label class="form-label small text-secondary mb-1">Descripción general</label>
              <textarea id="input-bastion-desc" class="form-control form-control-sm bg-dark text-light border-secondary" rows="2" placeholder="Historia, arquitectura o notas generales de la fortaleza..."></textarea>
            </div>
            <div class="col-12 mt-2">
              <label class="form-label small text-warning mb-1">PJs Propietarios (marca varios para combinar Baluartes DMG 2024)</label>
              <div class="p-2 rounded bg-dark border border-secondary" style="max-height: 170px; overflow-y: auto;">
                ${campaignChars.length === 0 ? `
                  <div class="text-muted small">No hay personajes en esta campaña todavía.</div>
                ` : campaignChars.map(ch => {
                  const slots = getSpecialFacilitySlotsForLevel(ch.level || 1);
                  return `
                    <div class="form-check small mb-1">
                      <input class="form-check-input chk-bastion-owner" type="checkbox" value="${ch.id}" id="chk-owner-${ch.id}">
                      <label class="form-check-label text-light" for="chk-owner-${ch.id}">
                        <strong>${escapeHtml(ch.name)}</strong> (${escapeHtml(getCharacterFullClassTitle(ch))} Nv ${ch.level}) — <span class="text-warning">${slots} esp. especiales</span>
                      </label>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-3 pt-2 border-top border-secondary">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-bastion-meta">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Baluarte</button>
          </div>
        </form>
      </dialog>

      <!-- Modal Añadir / Editar Instalación -->
      <dialog id="modal-bastion-facility" class="rpg-dialog p-3" style="max-width: 680px; width: 95%;">
        <form id="form-bastion-facility">
          <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
            <h5 class="m-0 text-warning" id="modal-facility-title">🏛️ Instalación de Baluarte</h5>
            <button type="button" class="btn-close btn-close-white" id="btn-close-facility-modal"></button>
          </div>
          <input type="hidden" id="input-fac-id" value="">
          <div class="row g-2">
            <div class="col-12 col-sm-4">
              <label class="form-label small text-warning mb-1">Categoría</label>
              <select id="select-fac-type" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="special">Instalación Especial</option>
                <option value="basic">Instalación Básica</option>
              </select>
            </div>
            <div class="col-12 col-sm-8">
              <label class="form-label small text-warning mb-1">Plantilla Oficial DMG 2024 (o Personalizada)</label>
              <select id="select-fac-template" class="form-select form-select-sm bg-dark text-warning border-secondary"></select>
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label small text-warning mb-1">Nombre de la Instalación *</label>
              <input type="text" id="input-fac-name" class="form-control form-control-sm bg-dark text-light border-secondary" required>
            </div>
            <div class="col-6 col-sm-3">
              <label class="form-label small text-secondary mb-1">Espacio</label>
              <select id="select-fac-space" class="form-select form-select-sm bg-dark text-light border-secondary">
                ${BASTION_SPACE_SIZES.map(s => `<option value="${s.id}">${escapeHtml(s.name)} [${s.maxSquares} c.]</option>`).join('')}
              </select>
            </div>
            <div class="col-6 col-sm-3">
              <label class="form-label small text-secondary mb-1">PJ Asignado</label>
              <select id="select-fac-owner" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="">Compartida / General</option>
                ${campaignChars.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('')}
              </select>
            </div>
            <div class="col-12">
              <label class="form-label small text-secondary mb-1">Descripción de la Instalación</label>
              <textarea id="input-fac-desc" class="form-control form-control-sm bg-dark text-light border-secondary" rows="2"></textarea>
            </div>
            <div class="col-12">
              <label class="form-label small text-info mb-1">Beneficio Pasivo / Permanente</label>
              <input type="text" id="input-fac-passive" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Sortilegio tras Descanso Largo...">
            </div>
            <div class="col-12 col-sm-4">
              <label class="form-label small text-warning mb-1">Orden Principal</label>
              <select id="select-fac-allowed-order" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="">Ninguna (Básica)</option>
                ${BASTION_ORDERS.filter(o => o.scope === 'facility').map(o => `<option value="${o.id}">${escapeHtml(o.name)}</option>`).join('')}
              </select>
            </div>
            <div class="col-4 col-sm-2">
              <label class="form-label small text-secondary mb-1">Asalariados</label>
              <input type="number" id="input-fac-hirelings" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="1">
            </div>
            <div class="col-4 col-sm-3">
              <label class="form-label small text-danger mb-1">Coste/Turno (PO)</label>
              <input type="number" id="input-fac-cost" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="0">
            </div>
            <div class="col-4 col-sm-3">
              <label class="form-label small text-success mb-1">Ingreso/Turno (PO)</label>
              <input type="number" id="input-fac-income" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="0">
            </div>
            <div class="col-12">
              <label class="form-label small text-secondary mb-1">Descripción de Orden Posible</label>
              <input type="text" id="input-fac-order-summary" class="form-control form-control-sm bg-dark text-light border-secondary">
            </div>
            <div class="col-12">
              <label class="form-label small text-success mb-1">Beneficio Obtenido por Turno al Ejecutar su Orden</label>
              <input type="text" id="input-fac-turn-benefit" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: 1 Poción de Curación Mayor o +4 Defensores">
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-3 pt-2 border-top border-secondary">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-facility-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Instalación</button>
          </div>
        </form>
      </dialog>

      <!-- Modal Añadir / Editar Asalariado, Defensor o PNJ -->
      <dialog id="modal-bastion-staff" class="rpg-dialog p-3" style="max-width: 520px; width: 95%;">
        <form id="form-bastion-staff">
          <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
            <h5 class="m-0 text-warning">🛡️ Personal / PNJ del Baluarte</h5>
            <button type="button" class="btn-close btn-close-white" id="btn-close-staff-modal"></button>
          </div>
          <input type="hidden" id="input-staff-id" value="">
          <div class="row g-2">
            <div class="col-12 col-sm-7">
              <label class="form-label small text-warning mb-1">Nombre del PNJ / Unidad *</label>
              <input type="text" id="input-staff-name" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Maestro Herrero Thorek / Guardia Veterano" required>
            </div>
            <div class="col-12 col-sm-5">
              <label class="form-label small text-warning mb-1">Rol</label>
              <select id="select-staff-role" class="form-select form-select-sm bg-dark text-light border-secondary">
                ${BASTION_STAFF_ROLES.map(r => `<option value="${r.id}">${escapeHtml(r.name)}</option>`).join('')}
              </select>
            </div>
            <div class="col-12 col-sm-8">
              <label class="form-label small text-secondary mb-1">Instalación Asignada (opcional)</label>
              <select id="select-staff-facility" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="">General / Guarnición del Baluarte</option>
                ${(activeBastion?.facilities || []).map(f => `<option value="${f.id}">${escapeHtml(f.name)}</option>`).join('')}
              </select>
            </div>
            <div class="col-12 col-sm-4">
              <label class="form-label small text-danger mb-1">Salario/Turno (PO)</label>
              <input type="number" id="input-staff-wage" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="0">
            </div>
            <div class="col-12">
              <label class="form-label small text-secondary mb-1">Notas / Rasgos / Equipo</label>
              <textarea id="input-staff-notes" class="form-control form-control-sm bg-dark text-light border-secondary" rows="2" placeholder="Personalidad, especie, armas o detalles del PNJ..."></textarea>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 mt-3 pt-2 border-top border-secondary">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-staff-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar PNJ</button>
          </div>
        </form>
      </dialog>

      <!-- Lightbox de Planos del Baluarte -->
      <dialog id="modal-bastion-bp-lightbox" class="rpg-image-lightbox">
        <div class="position-relative text-center p-2">
          <div class="d-flex justify-content-between align-items-center mb-2 px-2">
            <strong id="bp-lightbox-title" class="text-warning">Plano del Baluarte</strong>
            <button type="button" id="btn-close-bp-lightbox" class="btn btn-sm btn-outline-light">&times; Cerrar</button>
          </div>
          <img id="bp-lightbox-img" src="" alt="Plano" referrerpolicy="no-referrer" style="max-width: 92vw; max-height: 82vh; object-fit: contain;" class="rounded border border-warning">
        </div>
      </dialog>
    `;
  }

  openBastionMetaModal(bastionOrNull) {
    const dialog = this.container.querySelector('#modal-bastion-meta');
    if (!dialog) return;
    const titleEl = dialog.querySelector('#modal-bastion-meta-title');
    dialog.querySelector('#input-bastion-id').value = bastionOrNull?.id || '';
    dialog.querySelector('#input-bastion-name').value = bastionOrNull?.name || '';
    dialog.querySelector('#input-bastion-location').value = bastionOrNull?.location || '';
    dialog.querySelector('#input-bastion-desc').value = bastionOrNull?.description || '';
    if (titleEl) titleEl.textContent = bastionOrNull ? '🏰 Configurar Baluarte' : '🏰 Crear Nuevo Baluarte';

    const ownerSet = new Set(bastionOrNull?.ownerCharacterIds || []);
    dialog.querySelectorAll('.chk-bastion-owner').forEach(chk => {
      chk.checked = ownerSet.has(chk.value);
    });
    dialog.showModal();
  }

  populateFacilityTemplatesSelect(type, selectedTemplateId = '') {
    const sel = this.container.querySelector('#select-fac-template');
    if (!sel) return;
    if (type === 'basic') {
      sel.innerHTML = `
        <option value="custom">✨ Instalación Básica Personalizada</option>
        <optgroup label="Instalaciones Básicas Oficiales (DMG 2024)">
          ${BASTION_BASIC_FACILITIES.map(b => `<option value="${b.id}" ${selectedTemplateId === b.id ? 'selected' : ''}>${escapeHtml(b.name)}</option>`).join('')}
        </optgroup>
      `;
    } else {
      const tiers = [5, 9, 13, 17];
      sel.innerHTML = `
        <option value="custom">✨ Instalación Especial Personalizada</option>
        ${tiers.map(lvl => `
          <optgroup label="Nivel ${lvl}+ (DMG 2024)">
            ${BASTION_SPECIAL_FACILITIES.filter(f => f.minLevel === lvl).map(f => `
              <option value="${f.id}" ${selectedTemplateId === f.id ? 'selected' : ''}>
                ${escapeHtml(f.name)} [Nv ${f.minLevel}+]
              </option>
            `).join('')}
          </optgroup>
        `).join('')}
      `;
    }
  }

  applyFacilityTemplateToForm(type, templateId) {
    const dialog = this.container.querySelector('#modal-bastion-facility');
    if (!dialog || templateId === 'custom') return;
    if (type === 'basic') {
      const tpl = BASTION_BASIC_FACILITIES.find(b => b.id === templateId);
      if (!tpl) return;
      dialog.querySelector('#input-fac-name').value = tpl.name.split(' (')[0];
      dialog.querySelector('#select-fac-space').value = tpl.defaultSpace || 'espaciosa';
      dialog.querySelector('#input-fac-desc').value = tpl.description || '';
      dialog.querySelector('#input-fac-passive').value = '';
      dialog.querySelector('#select-fac-allowed-order').value = '';
      dialog.querySelector('#input-fac-hirelings').value = 0;
      dialog.querySelector('#input-fac-cost').value = 0;
      dialog.querySelector('#input-fac-income').value = 0;
      dialog.querySelector('#input-fac-order-summary').value = '';
      dialog.querySelector('#input-fac-turn-benefit').value = '';
    } else {
      const tpl = BASTION_SPECIAL_FACILITIES.find(f => f.id === templateId);
      if (!tpl) return;
      dialog.querySelector('#input-fac-name').value = tpl.name.split(' (')[0];
      dialog.querySelector('#select-fac-space').value = tpl.defaultSpace || 'espaciosa';
      dialog.querySelector('#input-fac-desc').value = `${tpl.description}${tpl.prerequisite && tpl.prerequisite !== 'Ninguno' ? ` (Requisito: ${tpl.prerequisite})` : ''}`;
      dialog.querySelector('#input-fac-passive').value = tpl.passiveBenefit || '';
      dialog.querySelector('#select-fac-allowed-order').value = tpl.order || '';
      dialog.querySelector('#input-fac-hirelings').value = tpl.hirelingsCount ?? 1;
      dialog.querySelector('#input-fac-cost').value = tpl.turnCostGp || 0;
      dialog.querySelector('#input-fac-income').value = 0;
      dialog.querySelector('#input-fac-order-summary').value = tpl.orderSummary || '';
      dialog.querySelector('#input-fac-turn-benefit').value = tpl.turnBenefit || '';
    }
  }

  openFacilityModal(type = 'special', existingFac = null) {
    const dialog = this.container.querySelector('#modal-bastion-facility');
    if (!dialog) return;

    const effType = existingFac ? existingFac.type : type;
    dialog.querySelector('#input-fac-id').value = existingFac?.id || '';
    dialog.querySelector('#select-fac-type').value = effType;

    const defaultTpl = existingFac
      ? (existingFac.templateId || 'custom')
      : (effType === 'basic' ? BASTION_BASIC_FACILITIES[0].id : BASTION_SPECIAL_FACILITIES[0].id);

    this.populateFacilityTemplatesSelect(effType, defaultTpl);

    if (existingFac) {
      dialog.querySelector('#input-fac-name').value = existingFac.name || '';
      dialog.querySelector('#select-fac-space').value = existingFac.space || 'espaciosa';
      dialog.querySelector('#select-fac-owner').value = existingFac.assignedOwnerId || '';
      dialog.querySelector('#input-fac-desc').value = existingFac.description || '';
      dialog.querySelector('#input-fac-passive').value = existingFac.passiveBenefit || '';
      dialog.querySelector('#select-fac-allowed-order').value = existingFac.allowedOrder || '';
      dialog.querySelector('#input-fac-hirelings').value = existingFac.hirelingsCount || 0;
      dialog.querySelector('#input-fac-cost').value = existingFac.turnCostGp || 0;
      dialog.querySelector('#input-fac-income').value = existingFac.turnIncomeGp || 0;
      dialog.querySelector('#input-fac-order-summary').value = existingFac.orderSummary || '';
      dialog.querySelector('#input-fac-turn-benefit').value = existingFac.turnBenefit || '';
    } else {
      dialog.querySelector('#select-fac-owner').value = '';
      this.applyFacilityTemplateToForm(effType, defaultTpl);
    }

    dialog.showModal();
  }

  attachEventListeners(activeBastion, campaignChars) {
    if (!this.container) return;

    // Crear primer baluarte o nuevo baluarte
    this.container.querySelector('#btn-create-first-bastion')?.addEventListener('click', () => {
      this.openBastionMetaModal(null);
    });
    this.container.querySelector('#btn-new-bastion')?.addEventListener('click', () => {
      this.openBastionMetaModal(null);
    });
    this.container.querySelector('#btn-edit-bastion-meta')?.addEventListener('click', () => {
      if (activeBastion) this.openBastionMetaModal(activeBastion);
    });

    // Cerrar modal meta
    const metaDialog = this.container.querySelector('#modal-bastion-meta');
    this.container.querySelector('#btn-close-bastion-meta')?.addEventListener('click', () => metaDialog?.close());
    this.container.querySelector('#btn-cancel-bastion-meta')?.addEventListener('click', () => metaDialog?.close());

    this.container.querySelector('#form-bastion-meta')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = metaDialog.querySelector('#input-bastion-id').value;
      const name = metaDialog.querySelector('#input-bastion-name').value.trim();
      const location = metaDialog.querySelector('#input-bastion-location').value.trim();
      const description = metaDialog.querySelector('#input-bastion-desc').value.trim();
      const ownerCharacterIds = Array.from(metaDialog.querySelectorAll('.chk-bastion-owner:checked')).map(c => c.value);
      if (!name) return;

      const existing = id ? store.getBastion(id) : null;
      const saved = store.saveBastion({
        ...(existing || {}),
        id: existing?.id || undefined,
        campaignId: store.getSelectedCampaignId(),
        name,
        location,
        description,
        ownerCharacterIds
      });
      this.selectedBastionId = saved.id;
      metaDialog?.close();
      showToast.success(existing ? 'Baluarte actualizado.' : `Baluarte "${saved.name}" creado.`);
    });

    if (!activeBastion) return;

    // Cambiar baluarte activo
    this.container.querySelector('#select-active-bastion')?.addEventListener('change', (e) => {
      this.selectedBastionId = e.target.value;
      this.render();
    });

    // Eliminar baluarte
    this.container.querySelector('#btn-delete-bastion')?.addEventListener('click', async () => {
      const confirmed = await showConfirmModal({
        title: 'Eliminar Baluarte',
        message: `¿Seguro que deseas eliminar permanentemente el Baluarte "${activeBastion.name}" y todas sus instalaciones y planos?`,
        confirmText: 'Eliminar Baluarte',
        cancelText: 'Cancelar',
        danger: true,
        icon: 'trash-2'
      });
      if (confirmed) {
        store.deleteBastion(activeBastion.id);
        this.selectedBastionId = null;
        showToast.info('Baluarte eliminado.');
      }
    });

    // Ajuste manual cupo especial
    this.container.querySelectorAll('.btn-adjust-special-slots').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const delta = parseInt(e.currentTarget.dataset.delta, 10) || 0;
        activeBastion.manualSpecialSlotsAdjust = (Number(activeBastion.manualSpecialSlotsAdjust) || 0) + delta;
        store.saveBastion(activeBastion);
      });
    });

    // Tesorería, orden general y armería abastecida
    this.container.querySelector('#input-bastion-treasury')?.addEventListener('change', (e) => {
      activeBastion.treasuryGp = Math.max(0, Math.round(Number(e.target.value) || 0));
      store.saveBastion(activeBastion);
    });

    this.container.querySelector('#select-bastion-general-order')?.addEventListener('change', (e) => {
      activeBastion.generalOrder = e.target.value === 'maintain' ? 'maintain' : 'individual';
      store.saveBastion(activeBastion);
    });

    this.container.querySelector('#chk-bastion-armory-stocked')?.addEventListener('change', (e) => {
      activeBastion.armoryStocked = Boolean(e.target.checked);
      store.saveBastion(activeBastion);
    });

    // Avanzar turno de Baluarte
    this.container.querySelector('#btn-advance-bastion-turn')?.addEventListener('click', async () => {
      const economy = this.calculateTurnEconomy(activeBastion);
      const hasArmoryFacility = (activeBastion.facilities || []).some(f => f.templateId === 'armeria' && !f.isDamaged);
      const msgParts = [
        `¿Cerrar el Turno #${activeBastion.turnNumber || 1} y pasar al Turno #${(activeBastion.turnNumber || 1) + 1}?`,
        `Balance económico del turno: ${economy.netBalanceGp >= 0 ? `+${economy.netBalanceGp}` : economy.netBalanceGp} PO (se aplicará a la Tesorería).`
      ];
      if (economy.isMaintainAll) {
        msgParts.push('Como la orden general es Mantener, también se generará automáticamente 1 Suceso de Baluarte (1d100).');
      }
      const confirmed = await showConfirmModal({
        title: `Avanzar Turno de Baluarte`,
        message: msgParts.join(' '),
        confirmText: 'Avanzar Turno',
        cancelText: 'Cancelar',
        danger: false,
        icon: 'fast-forward'
      });
      if (!confirmed) return;

      activeBastion.turnNumber = (Number(activeBastion.turnNumber) || 1) + 1;
      activeBastion.treasuryGp = Math.max(0, (Number(activeBastion.treasuryGp) || 0) + economy.netBalanceGp);
      if (economy.isMaintainAll) {
        const ev = resolveBastionEvent(null, {
          defendersCount: economy.defendersCount,
          hasStockedArmory: activeBastion.armoryStocked && hasArmoryFacility,
          lieutenantsCount: economy.lieutenantsCount
        });
        activeBastion.eventsLog = [ev, ...(activeBastion.eventsLog || [])];
      }
      store.saveBastion(activeBastion);
      showToast.success(`¡Turno de Baluarte avanzado al Turno #${activeBastion.turnNumber}!`);
    });

    // Instalaciones: abrir modal y eventos
    const facDialog = this.container.querySelector('#modal-bastion-facility');
    this.container.querySelector('#btn-add-special-facility')?.addEventListener('click', () => this.openFacilityModal('special', null));
    this.container.querySelector('#btn-add-basic-facility')?.addEventListener('click', () => this.openFacilityModal('basic', null));
    this.container.querySelector('#btn-close-facility-modal')?.addEventListener('click', () => facDialog?.close());
    this.container.querySelector('#btn-cancel-facility-modal')?.addEventListener('click', () => facDialog?.close());

    this.container.querySelector('#select-fac-type')?.addEventListener('change', (e) => {
      const t = e.target.value;
      const defId = t === 'basic' ? BASTION_BASIC_FACILITIES[0].id : BASTION_SPECIAL_FACILITIES[0].id;
      this.populateFacilityTemplatesSelect(t, defId);
      this.applyFacilityTemplateToForm(t, defId);
    });

    this.container.querySelector('#select-fac-template')?.addEventListener('change', (e) => {
      const t = facDialog.querySelector('#select-fac-type').value;
      this.applyFacilityTemplateToForm(t, e.target.value);
    });

    this.container.querySelector('#form-bastion-facility')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = facDialog.querySelector('#input-fac-id').value;
      const type = facDialog.querySelector('#select-fac-type').value;
      const templateId = facDialog.querySelector('#select-fac-template').value;
      const name = facDialog.querySelector('#input-fac-name').value.trim();
      if (!name) return;

      const allowedOrder = facDialog.querySelector('#select-fac-allowed-order').value;
      const newObj = {
        id: id || `fac_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        type,
        templateId,
        name,
        space: facDialog.querySelector('#select-fac-space').value,
        assignedOwnerId: facDialog.querySelector('#select-fac-owner').value,
        description: facDialog.querySelector('#input-fac-desc').value.trim(),
        passiveBenefit: facDialog.querySelector('#input-fac-passive').value.trim(),
        allowedOrder,
        currentOrder: allowedOrder || 'none',
        hirelingsCount: Math.max(0, parseInt(facDialog.querySelector('#input-fac-hirelings').value, 10) || 0),
        turnCostGp: Math.max(0, Number(facDialog.querySelector('#input-fac-cost').value) || 0),
        turnIncomeGp: Math.max(0, Number(facDialog.querySelector('#input-fac-income').value) || 0),
        orderSummary: facDialog.querySelector('#input-fac-order-summary').value.trim(),
        turnBenefit: facDialog.querySelector('#input-fac-turn-benefit').value.trim(),
        notes: '',
        isDamaged: false
      };

      const list = Array.isArray(activeBastion.facilities) ? [...activeBastion.facilities] : [];
      const existingIdx = list.findIndex(f => f.id === id);
      if (existingIdx >= 0) {
        newObj.currentOrder = list[existingIdx].currentOrder || allowedOrder || 'none';
        newObj.notes = list[existingIdx].notes || '';
        newObj.isDamaged = Boolean(list[existingIdx].isDamaged);
        list[existingIdx] = newObj;
      } else {
        list.push(newObj);
      }
      activeBastion.facilities = list;
      store.saveBastion(activeBastion);
      facDialog?.close();
      showToast.success('Instalación guardada en el Baluarte.');
    });

    this.container.querySelectorAll('.btn-edit-facility').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const facId = e.currentTarget.dataset.facId;
        const fac = (activeBastion.facilities || []).find(f => f.id === facId);
        if (fac) this.openFacilityModal(fac.type, fac);
      });
    });

    this.container.querySelectorAll('.btn-delete-facility').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const facId = e.currentTarget.dataset.facId;
        const fac = (activeBastion.facilities || []).find(f => f.id === facId);
        const confirmed = await showConfirmModal({
          title: 'Eliminar Instalación',
          message: `¿Eliminar la instalación "${fac?.name || ''}" del Baluarte?`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          danger: true,
          icon: 'trash-2'
        });
        if (confirmed) {
          activeBastion.facilities = (activeBastion.facilities || []).filter(f => f.id !== facId);
          store.saveBastion(activeBastion);
        }
      });
    });

    this.container.querySelectorAll('.btn-toggle-fac-damaged').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const facId = e.currentTarget.dataset.facId;
        const fac = (activeBastion.facilities || []).find(f => f.id === facId);
        if (fac) {
          fac.isDamaged = !fac.isDamaged;
          store.saveBastion(activeBastion);
        }
      });
    });

    this.container.querySelectorAll('.select-facility-order').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const facId = e.currentTarget.dataset.facId;
        const fac = (activeBastion.facilities || []).find(f => f.id === facId);
        if (fac) {
          fac.currentOrder = e.currentTarget.value;
          store.saveBastion(activeBastion);
        }
      });
    });

    this.container.querySelectorAll('.input-facility-order-note').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const facId = e.currentTarget.dataset.facId;
        const fac = (activeBastion.facilities || []).find(f => f.id === facId);
        if (fac) {
          fac.notes = e.currentTarget.value.trim();
          store.saveBastion(activeBastion);
        }
      });
    });

    // Personal / Asalariados / Defensores (3.3)
    const staffDialog = this.container.querySelector('#modal-bastion-staff');
    this.container.querySelector('#btn-close-staff-modal')?.addEventListener('click', () => staffDialog?.close());
    this.container.querySelector('#btn-cancel-staff-modal')?.addEventListener('click', () => staffDialog?.close());

    this.container.querySelector('#btn-quick-add-defender')?.addEventListener('click', () => {
      const defNumber = (activeBastion.staff || []).filter(s => s.role === 'defender').length + 1;
      activeBastion.staff = [
        ...(activeBastion.staff || []),
        {
          id: `npc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          name: `Defensor de la Guarnición #${defNumber}`,
          role: 'defender',
          facilityId: '',
          wageGpPerTurn: 0,
          notes: 'Defensor del Baluarte'
        }
      ];
      store.saveBastion(activeBastion);
      showToast.success('Defensor incorporado al Baluarte.');
    });

    this.container.querySelector('#btn-add-bastion-staff')?.addEventListener('click', () => {
      staffDialog.querySelector('#input-staff-id').value = '';
      staffDialog.querySelector('#input-staff-name').value = '';
      staffDialog.querySelector('#select-staff-role').value = 'hireling';
      staffDialog.querySelector('#select-staff-facility').value = '';
      staffDialog.querySelector('#input-staff-wage').value = 0;
      staffDialog.querySelector('#input-staff-notes').value = '';
      staffDialog.showModal();
    });

    this.container.querySelectorAll('.btn-edit-staff').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sid = e.currentTarget.dataset.staffId;
        const npc = (activeBastion.staff || []).find(s => s.id === sid);
        if (!npc) return;
        staffDialog.querySelector('#input-staff-id').value = npc.id;
        staffDialog.querySelector('#input-staff-name').value = npc.name || '';
        staffDialog.querySelector('#select-staff-role').value = npc.role || 'hireling';
        staffDialog.querySelector('#select-staff-facility').value = npc.facilityId || '';
        staffDialog.querySelector('#input-staff-wage').value = npc.wageGpPerTurn || 0;
        staffDialog.querySelector('#input-staff-notes').value = npc.notes || '';
        staffDialog.showModal();
      });
    });

    this.container.querySelectorAll('.btn-delete-staff').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sid = e.currentTarget.dataset.staffId;
        activeBastion.staff = (activeBastion.staff || []).filter(s => s.id !== sid);
        store.saveBastion(activeBastion);
      });
    });

    this.container.querySelector('#form-bastion-staff')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = staffDialog.querySelector('#input-staff-id').value;
      const name = staffDialog.querySelector('#input-staff-name').value.trim();
      if (!name) return;
      const entry = {
        id: id || `npc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name,
        role: staffDialog.querySelector('#select-staff-role').value,
        facilityId: staffDialog.querySelector('#select-staff-facility').value,
        wageGpPerTurn: Math.max(0, Number(staffDialog.querySelector('#input-staff-wage').value) || 0),
        notes: staffDialog.querySelector('#input-staff-notes').value.trim()
      };
      const list = Array.isArray(activeBastion.staff) ? [...activeBastion.staff] : [];
      const idx = list.findIndex(s => s.id === id);
      if (idx >= 0) list[idx] = entry;
      else list.push(entry);
      activeBastion.staff = list;
      store.saveBastion(activeBastion);
      staffDialog?.close();
      showToast.success('Personal del Baluarte guardado.');
    });

    // Sucesos de Baluarte (3.7)
    const triggerEventRoll = (manualVal = null) => {
      const economy = this.calculateTurnEconomy(activeBastion);
      const hasArmoryFacility = (activeBastion.facilities || []).some(f => f.templateId === 'armeria' && !f.isDamaged);
      const ev = resolveBastionEvent(manualVal, {
        defendersCount: economy.defendersCount,
        hasStockedArmory: activeBastion.armoryStocked && hasArmoryFacility,
        lieutenantsCount: economy.lieutenantsCount
      });
      activeBastion.eventsLog = [ev, ...(activeBastion.eventsLog || [])];
      store.saveBastion(activeBastion);
      showToast.info(`${ev.title} (d100 = ${ev.roll})`, 'Suceso de Baluarte');
    };

    this.container.querySelector('#btn-roll-auto-bastion-event')?.addEventListener('click', () => triggerEventRoll(null));
    this.container.querySelector('#btn-roll-manual-bastion-event')?.addEventListener('click', () => {
      const raw = this.container.querySelector('#input-manual-bastion-roll')?.value;
      const num = parseInt(raw, 10);
      if (Number.isNaN(num) || num < 1 || num > 100) {
        showToast.warning('Introduce un resultado de dado entre 1 y 100.', 'Dado Manual');
        return;
      }
      triggerEventRoll(num);
    });

    this.container.querySelectorAll('.btn-delete-bastion-event').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        activeBastion.eventsLog = (activeBastion.eventsLog || []).filter((_, i) => i !== idx);
        store.saveBastion(activeBastion);
      });
    });

    // Planos e Imágenes del Baluarte (3.8 - Misma verificación Magic Bytes que los PJs)
    this.container.querySelector('#form-add-bastion-blueprint')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const titleInp = this.container.querySelector('#input-bp-title');
      const urlInp = this.container.querySelector('#input-bp-url');
      const statusEl = this.container.querySelector('#bastion-bp-status');
      const submitBtn = this.container.querySelector('#btn-submit-blueprint');
      const rawUrl = urlInp?.value?.trim() || '';
      if (!rawUrl) return;

      if (statusEl) {
        statusEl.className = 'small text-info fw-semibold';
        statusEl.textContent = '⏳ Verificando firma binaria de imagen (Magic Bytes) y generando miniatura...';
      }
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await generateMasterPanelAvatarFromUrl(rawUrl, 24 * 1024);
        const bpTitle = titleInp?.value?.trim() || `Plano ${(activeBastion.blueprints || []).length + 1}`;
        activeBastion.blueprints = [
          ...(activeBastion.blueprints || []),
          {
            id: `bp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            title: bpTitle,
            imageUrl: res.validUrl,
            thumbDataUrl: res.avatarThumb
          }
        ];
        store.saveBastion(activeBastion);
        showToast.success(`Plano "${bpTitle}" verificado (${res.detectedMime}) y añadido al Baluarte.`);
      } catch (err) {
        if (statusEl) {
          statusEl.className = 'small text-danger fw-bold';
          statusEl.textContent = `❌ Imagen rechazada: ${err.message}`;
        }
        showToast.error(err.message || 'URL de imagen inválida o no permitida.', 'Seguridad de Imagen');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    this.container.querySelectorAll('.btn-delete-blueprint').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const bpId = e.currentTarget.dataset.bpId;
        const bp = (activeBastion.blueprints || []).find(b => b.id === bpId);
        const confirmed = await showConfirmModal({
          title: 'Eliminar Plano',
          message: `¿Eliminar el plano "${bp?.title || ''}" del Baluarte?`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          danger: true,
          icon: 'trash-2'
        });
        if (confirmed) {
          activeBastion.blueprints = (activeBastion.blueprints || []).filter(b => b.id !== bpId);
          store.saveBastion(activeBastion);
        }
      });
    });

    const bpLightbox = this.container.querySelector('#modal-bastion-bp-lightbox');
    this.container.querySelectorAll('.btn-open-bp-lightbox').forEach(img => {
      img.addEventListener('click', (e) => {
        const src = e.currentTarget.dataset.imgSrc;
        const title = e.currentTarget.dataset.imgTitle;
        if (!bpLightbox || !src) return;
        bpLightbox.querySelector('#bp-lightbox-img').src = src;
        bpLightbox.querySelector('#bp-lightbox-title').textContent = title || 'Plano del Baluarte';
        bpLightbox.showModal();
      });
    });
    this.container.querySelector('#btn-close-bp-lightbox')?.addEventListener('click', () => bpLightbox?.close());
    bpLightbox?.addEventListener('click', (e) => {
      if (e.target === bpLightbox) bpLightbox.close();
    });
  }
}
