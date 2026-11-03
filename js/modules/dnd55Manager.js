/**
 * Módulo: Hub de Campañas y Gestión de Personajes
 * Permite organizar mesas de juego, crear/editar/eliminar campañas y gestionar el roster.
 */

import { store } from '../state.js';
import { escapeHtml } from '../utils/formatters.js';
import { showToast, showConfirmModal, showCampaignFormModal } from '../utils/uiFeedback.js';

export class Dnd55ManagerModule {
  constructor(containerId = 'campaigns-container') {
    this.container = document.getElementById(containerId);
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
                        ${escapeHtml(char.speciesId)} &bull; ${escapeHtml(char.classId)} (${char.subclassId || 'Sin subclase'})
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
        </div>
      </div>
    `;

    this.attachEventListeners();
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
      store.emit('wizard:new-character', { campaignId: this.selectedCampaignId });
      const wizardTabBtn = document.getElementById('tab-wizard-btn');
      if (wizardTabBtn) wizardTabBtn.click();
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
