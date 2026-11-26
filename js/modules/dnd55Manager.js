/**
 * Módulo: Hub de Campañas y Gestión de Personajes
 * Permite organizar mesas de juego, crear/editar/eliminar campañas y gestionar el roster.
 */

import { store } from '../state.js';
import { escapeHtml } from '../utils/formatters.js';
import { getSpeciesName, getCharacterFullClassTitle } from '../constants/dnd55Rules.js';
import { showToast, showConfirmModal, showCampaignFormModal } from '../utils/uiFeedback.js';

export class Dnd55ManagerModule {
  constructor(containerId = 'campaigns-container') {
    this.container = document.getElementById(containerId);
    this.editingMilestoneId = null;
    this.showMilestoneForm = false;
    this.initListeners();
  }

  initListeners() {
    store.on('campaigns:updated', () => this.render());
    store.on('characters:updated', () => this.render());
    store.on('campaign:selected', () => this.render());
  }

  render() {
    if (!this.container) return;

    const campaigns = store.getCampaigns();
    const selectedCampId = store.getSelectedCampaignId();
    const selectedCamp = store.getCampaign(selectedCampId) || campaigns[0];
    const characters = store.getCharactersByCampaign(selectedCampId);

    this.container.innerHTML = `
      <div class="row g-4">
        <!-- Columna Izquierda: Lista de Campañas -->
        <div class="col-12 col-md-4">
          <div class="rpg-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
              <h4 class="h5 text-warning m-0 d-flex align-items-center gap-2">
                <span>🗺️</span> Campañas Activas
              </h4>
              <button id="btn-new-campaign" class="btn btn-sm btn-outline-warning">
                + Nueva
              </button>
            </div>

            <div class="list-group">
              ${campaigns.map(c => `
                <button type="button" class="list-group-item list-group-item-action ${c.id === selectedCampId ? 'active bg-dark border-warning' : 'bg-dark text-light border-secondary'} btn-select-camp" data-id="${c.id}">
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1 text-warning">${escapeHtml(c.name)}</h6>
                    <small class="text-secondary">${store.getCharactersByCampaign(c.id).length} PJs</small>
                  </div>
                  <p class="mb-1 small text-secondary text-truncate">${escapeHtml(c.description || 'Sin descripción')}</p>
                  <small class="text-muted">DM: ${escapeHtml(c.gameMaster || 'Dungeon Master')}</small>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Detalle de Campaña y Roster de Personajes -->
        <div class="col-12 col-md-8">
          <div class="rpg-card p-3 p-md-4 mb-4">
            <!-- Cabecera de Campaña Seleccionada -->
            ${selectedCamp ? `
              <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 border-bottom border-secondary pb-3 mb-3">
                <div>
                  <h3 class="h4 text-warning m-0">${escapeHtml(selectedCamp.name)}</h3>
                  <div class="text-secondary small mt-1">Dungeon Master: <strong>${escapeHtml(selectedCamp.gameMaster || 'Dungeon Master')}</strong></div>
                  <div class="text-light small mt-1">${escapeHtml(selectedCamp.description || '')}</div>
                </div>
                <div class="d-flex gap-2">
                  <button id="btn-edit-campaign" class="btn btn-sm btn-outline-warning" data-id="${selectedCamp.id}">
                    Editar
                  </button>
                  ${campaigns.length > 1 ? `
                    <button id="btn-delete-campaign" class="btn btn-sm btn-outline-danger" data-id="${selectedCamp.id}">
                      Eliminar
                    </button>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Roster de Personajes de esta Campaña -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="m-0 text-light small fw-bold">HÉROES Y PERSONAJES DE LA MESA (${characters.length})</h5>
              <button id="btn-create-character-for-camp" class="btn btn-sm btn-rpg-primary">
                + Crear Personaje
              </button>
            </div>

            <div class="row g-3">
              ${characters.length === 0 ? `
                <div class="col-12">
                  <div class="p-4 text-center text-secondary border border-secondary rounded">
                    No hay personajes en esta campaña. ¡Crea el primer héroe con el Asistente!
                  </div>
                </div>
              ` : characters.map(char => `
                <div class="col-12 col-sm-6">
                  <div class="p-3 rounded bg-dark border border-secondary d-flex flex-column justify-content-between h-100">
                    <div>
                      <div class="d-flex justify-content-between align-items-start mb-1">
                        <strong class="text-warning">${escapeHtml(char.name)}</strong>
                        <span class="badge bg-secondary">Nv ${char.level}</span>
                      </div>
                      <div class="text-secondary small">
                        ${escapeHtml(getSpeciesName(char.speciesId))} &bull; ${escapeHtml(getCharacterFullClassTitle(char))}
                      </div>
                      <div class="text-muted small">Jugador: ${escapeHtml(char.playerName || 'Anónimo')}</div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center border-top border-secondary pt-2 mt-3">
                      <button class="btn btn-sm btn-outline-light btn-open-char-sheet" data-id="${char.id}">
                        Ver Ficha
                      </button>
                      <button class="btn btn-sm btn-outline-danger btn-delete-char" data-id="${char.id}">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          ${selectedCamp ? (() => {
            const milestones = Array.isArray(selectedCamp.milestones) ? selectedCamp.milestones : [];
            const editingMs = this.editingMilestoneId ? milestones.find(m => m.id === this.editingMilestoneId) : null;
            const isFormVisible = this.showMilestoneForm || Boolean(editingMs);
            return `
              <div class="row g-3">
                <!-- 2.1 Hitos llevados a cabo por los PJs -->
                <div class="col-12 col-xl-6">
                  <div class="rpg-card p-3 h-100 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-2">
                      <h5 class="h6 text-warning m-0 d-flex align-items-center gap-2">
                        <span>🏆</span> Hitos de la Campaña (${milestones.length})
                      </h5>
                      <button type="button" id="btn-toggle-milestone-form" class="btn btn-xs btn-outline-warning py-0 px-2">
                        ${isFormVisible ? 'Cancelar' : '+ Añadir Hito'}
                      </button>
                    </div>

                    ${isFormVisible ? `
                      <form id="form-campaign-milestone" class="p-2 mb-2 rounded bg-dark border border-warning">
                        <div class="row g-2">
                          <div class="col-12 col-sm-8">
                            <label class="form-label small text-warning mb-1" style="font-size: 0.72rem;">Título del Hito *</label>
                            <input type="text" id="input-ms-title" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Derrotaron al Dragón de Aguja Helada" value="${escapeHtml(editingMs?.title || '')}" required>
                          </div>
                          <div class="col-12 col-sm-4">
                            <label class="form-label small text-secondary mb-1" style="font-size: 0.72rem;">Sesión / Fecha</label>
                            <input type="text" id="input-ms-session" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Sesión 8" value="${escapeHtml(editingMs?.sessionOrDate || '')}">
                          </div>
                          <div class="col-12">
                            <label class="form-label small text-secondary mb-1" style="font-size: 0.72rem;">Detalles o consecuencias</label>
                            <textarea id="input-ms-desc" class="form-control form-control-sm bg-dark text-light border-secondary" rows="2" placeholder="Resumen breve del logro alcanzado por el grupo...">${escapeHtml(editingMs?.description || '')}</textarea>
                          </div>
                          <div class="col-12 d-flex justify-content-end gap-1">
                            <button type="submit" class="btn btn-xs btn-warning text-dark fw-bold px-2">
                              ${editingMs ? 'Guardar Cambios' : 'Registrar Hito'}
                            </button>
                          </div>
                        </div>
                      </form>
                    ` : ''}

                    <div class="d-flex flex-column gap-2 overflow-y-auto" style="max-height: 320px;">
                      ${milestones.length === 0 ? `
                        <div class="p-3 text-center text-secondary small border border-secondary border-opacity-50 rounded">
                          Aún no hay hitos registrados en esta campaña. Registra las gestas y logros clave de los PJs.
                        </div>
                      ` : milestones.map((ms, idx) => `
                        <div class="p-2 rounded bg-dark border border-secondary d-flex justify-content-between align-items-start gap-2">
                          <div class="min-w-0">
                            <div class="d-flex align-items-center flex-wrap gap-1">
                              <span class="badge bg-warning text-dark py-0 px-1" style="font-size: 0.65rem;">#${idx + 1}</span>
                              <strong class="text-light small">${escapeHtml(ms.title)}</strong>
                              ${ms.sessionOrDate ? `<span class="badge bg-secondary py-0 px-1" style="font-size: 0.65rem;">${escapeHtml(ms.sessionOrDate)}</span>` : ''}
                            </div>
                            ${ms.description ? `<div class="text-secondary small mt-1" style="white-space: pre-line; font-size: 0.78rem;">${escapeHtml(ms.description)}</div>` : ''}
                          </div>
                          <div class="d-flex align-items-center gap-1 flex-shrink-0">
                            <button type="button" class="btn btn-xs btn-outline-warning py-0 px-1 btn-edit-milestone" data-ms-id="${ms.id}" title="Editar hito">✏️</button>
                            <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-delete-milestone" data-ms-id="${ms.id}" title="Eliminar hito">🗑️</button>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <!-- 2.2 Notas para la Siguiente Sesión -->
                <div class="col-12 col-xl-6">
                  <div class="rpg-card p-3 h-100 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2 border-bottom border-secondary pb-2">
                      <h5 class="h6 text-warning m-0 d-flex align-items-center gap-2">
                        <span>📝</span> Notas para la Siguiente Sesión
                      </h5>
                      <button type="button" id="btn-save-session-notes" class="btn btn-xs btn-outline-success py-0 px-2">
                        💾 Guardar Notas
                      </button>
                    </div>
                    <textarea id="textarea-next-session-notes" class="form-control form-control-sm bg-dark text-light border-secondary flex-grow-1" rows="7" style="min-height: 170px;" placeholder="Apunta ganchos pendientes, PNJs clave, botín por repartir, dónde quedó el grupo o recordatorios para la próxima sesión...">${escapeHtml(selectedCamp.nextSessionNotes || '')}</textarea>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                      <span class="text-muted" style="font-size: 0.7rem;">Se guarda automáticamente al salir del cuadro o pulsar Guardar.</span>
                      ${selectedCamp.nextSessionNotes ? `<button type="button" id="btn-clear-session-notes" class="btn btn-xs btn-outline-secondary py-0 px-1" style="font-size: 0.68rem;">Vaciar</button>` : ''}
                    </div>
                  </div>
                </div>
              </div>
            `;
          })() : ''}
        </div>
      </div>
    `;

    this.attachEventListeners();
    if (window.lucide) window.lucide.createIcons();
  }

  attachEventListeners() {
    if (!this.container) return;

    // Seleccionar campaña
    this.container.querySelectorAll('.btn-select-camp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        store.setSelectedCampaignId(id);
      });
    });

    // Nueva campaña
    this.container.querySelector('#btn-new-campaign')?.addEventListener('click', async () => {
      const data = await showCampaignFormModal({ title: 'Nueva Campaña' });
      if (!data) return;
      const newCamp = store.saveCampaign(data);
      store.setSelectedCampaignId(newCamp.id);
      showToast.success(`Campaña "${data.name}" creada con éxito.`);
    });

    // Editar campaña
    this.container.querySelector('#btn-edit-campaign')?.addEventListener('click', async (e) => {
      const id = e.currentTarget.dataset.id;
      const camp = store.getCampaign(id);
      if (!camp) return;
      const data = await showCampaignFormModal({ title: 'Editar Campaña', campaign: camp });
      if (!data) return;
      store.saveCampaign({ ...camp, ...data });
      showToast.success(`Campaña "${data.name}" actualizada con éxito.`);
    });

    // Eliminar campaña
    this.container.querySelector('#btn-delete-campaign')?.addEventListener('click', async (e) => {
      const id = e.currentTarget.dataset.id;
      const camp = store.getCampaign(id);
      const confirmed = await showConfirmModal({
        title: 'Eliminar Campaña',
        message: `¿Estás seguro de que deseas eliminar la campaña "${camp?.name || id}"? Todos sus personajes asociados serán eliminados permanentemente.`,
        confirmText: 'Eliminar Campaña',
        cancelText: 'Cancelar',
        danger: true,
        icon: 'trash-2'
      });
      if (confirmed) {
        store.deleteCampaign(id);
        showToast.info('Campaña eliminada correctamente.');
      }
    });

    // Crear personaje
    this.container.querySelector('#btn-create-character-for-camp')?.addEventListener('click', () => {
      store.emit('wizard:new-character', { campaignId: store.getSelectedCampaignId() });
      const wizardTabBtn = document.getElementById('tab-wizard-btn');
      if (wizardTabBtn) wizardTabBtn.click();
    });

    // Hitos de campaña (2.1)
    this.container.querySelector('#btn-toggle-milestone-form')?.addEventListener('click', () => {
      if (this.showMilestoneForm || this.editingMilestoneId) {
        this.showMilestoneForm = false;
        this.editingMilestoneId = null;
      } else {
        this.showMilestoneForm = true;
        this.editingMilestoneId = null;
      }
      this.render();
    });

    this.container.querySelector('#form-campaign-milestone')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const campId = store.getSelectedCampaignId();
      const camp = store.getCampaign(campId);
      if (!camp) return;
      const title = this.container.querySelector('#input-ms-title')?.value?.trim();
      const sessionOrDate = this.container.querySelector('#input-ms-session')?.value?.trim() || '';
      const description = this.container.querySelector('#input-ms-desc')?.value?.trim() || '';
      if (!title) return;

      const list = Array.isArray(camp.milestones) ? [...camp.milestones] : [];
      if (this.editingMilestoneId) {
        const idx = list.findIndex(m => m.id === this.editingMilestoneId);
        if (idx >= 0) {
          list[idx] = { ...list[idx], title, sessionOrDate, description };
        }
      } else {
        list.push({
          id: `ms_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          title,
          sessionOrDate,
          description,
          createdAt: new Date().toISOString()
        });
      }
      this.showMilestoneForm = false;
      this.editingMilestoneId = null;
      store.saveCampaign({ ...camp, milestones: list });
      showToast.success('Hito de campaña guardado.');
    });

    this.container.querySelectorAll('.btn-edit-milestone').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.editingMilestoneId = e.currentTarget.dataset.msId;
        this.showMilestoneForm = true;
        this.render();
      });
    });

    this.container.querySelectorAll('.btn-delete-milestone').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const msId = e.currentTarget.dataset.msId;
        const camp = store.getCampaign(store.getSelectedCampaignId());
        if (!camp) return;
        const ms = (camp.milestones || []).find(m => m.id === msId);
        const confirmed = await showConfirmModal({
          title: 'Eliminar Hito',
          message: `¿Eliminar el hito "${ms?.title || ''}" de la campaña?`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          danger: true,
          icon: 'trash-2'
        });
        if (confirmed) {
          const filtered = (camp.milestones || []).filter(m => m.id !== msId);
          if (this.editingMilestoneId === msId) this.editingMilestoneId = null;
          store.saveCampaign({ ...camp, milestones: filtered });
          showToast.info('Hito eliminado.');
        }
      });
    });

    // Notas para la siguiente sesión (2.2)
    const saveNotes = (showFeedback = false) => {
      const camp = store.getCampaign(store.getSelectedCampaignId());
      const notesEl = this.container.querySelector('#textarea-next-session-notes');
      if (!camp || !notesEl) return;
      if ((camp.nextSessionNotes || '') === notesEl.value && !showFeedback) return;
      store.saveCampaign({ ...camp, nextSessionNotes: notesEl.value });
      if (showFeedback) {
        showToast.success('Notas para la siguiente sesión guardadas.');
      }
    };

    this.container.querySelector('#textarea-next-session-notes')?.addEventListener('change', () => saveNotes(false));
    this.container.querySelector('#btn-save-session-notes')?.addEventListener('click', () => saveNotes(true));
    this.container.querySelector('#btn-clear-session-notes')?.addEventListener('click', async () => {
      const camp = store.getCampaign(store.getSelectedCampaignId());
      if (!camp) return;
      const confirmed = await showConfirmModal({
        title: 'Vaciar Notas de Sesión',
        message: '¿Deseas borrar el contenido de las notas para la siguiente sesión?',
        confirmText: 'Vaciar',
        cancelText: 'Cancelar',
        danger: true,
        icon: 'eraser'
      });
      if (confirmed) {
        store.saveCampaign({ ...camp, nextSessionNotes: '' });
        showToast.info('Notas vaciadas.');
      }
    });

    // Ver ficha
    this.container.querySelectorAll('.btn-open-char-sheet').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        store.setSelectedCharacterId(id);
        const sheetTabBtn = document.getElementById('tab-sheet-btn');
        if (sheetTabBtn) sheetTabBtn.click();
      });
    });

    // Eliminar personaje
    this.container.querySelectorAll('.btn-delete-char').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        const char = store.getCharacter(id);
        const confirmed = await showConfirmModal({
          title: 'Eliminar Personaje',
          message: `¿Estás seguro de que deseas eliminar a "${char?.name || id}" de la mesa? Esta acción no se puede deshacer.`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          danger: true,
          icon: 'trash-2'
        });
        if (confirmed) {
          store.deleteCharacter(id);
          showToast.info(`Personaje "${char?.name || id}" eliminado.`);
        }
      });
    });
  }
}
