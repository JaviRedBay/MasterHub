/**
 * Módulo de Feedback Visual Temático D&D: Toasts y Modales RPG
 * Proporciona un sistema unificado y estilizado para reemplazar completamente
 * los alert(), confirm() y prompt() nativos del navegador.
 */

import { escapeHtml } from './formatters.js';

// ==========================================
// 1. SISTEMA DE TOASTS FLOTANTES RPG
// ==========================================

function getToastContainer() {
  let container = document.getElementById('rpg-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'rpg-toast-container';
    container.className = 'rpg-toast-container';
    document.body.appendChild(container);
  }
  return container;
}

const TOAST_ICONS = {
  success: '<i data-lucide="check-circle-2" class="text-success" style="width: 20px; height: 20px;"></i>',
  error: '<i data-lucide="alert-octagon" class="text-danger" style="width: 20px; height: 20px;"></i>',
  warning: '<i data-lucide="alert-triangle" class="text-warning" style="width: 20px; height: 20px;"></i>',
  info: '<i data-lucide="info" class="text-info" style="width: 20px; height: 20px;"></i>'
};

/**
 * Muestra una notificación flotante estilo Toast.
 */
export function showToast(message, type = 'info', title = '', duration = 4000) {
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = `rpg-toast rpg-toast-${type} d-flex align-items-start gap-2`;
  
  const iconHtml = TOAST_ICONS[type] || TOAST_ICONS.info;
  const headerHtml = title ? `<strong class="d-block mb-1 text-warning">${escapeHtml(title)}</strong>` : '';

  toast.innerHTML = `
    <div class="mt-0.5 flex-shrink-0">${iconHtml}</div>
    <div class="flex-grow-1">
      ${headerHtml}
      <div class="small text-light" style="line-height: 1.4;">${escapeHtml(message)}</div>
    </div>
    <button type="button" class="btn-close btn-close-white p-0 ms-2 flex-shrink-0" style="font-size: 0.65rem;" aria-label="Cerrar"></button>
  `;

  const dismiss = () => {
    if (toast.classList.contains('fade-out')) return;
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 280);
  };

  toast.querySelector('.btn-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    dismiss();
  });

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }

  return toast;
}

showToast.success = (msg, title = '¡Éxito!', duration = 4000) => showToast(msg, 'success', title, duration);
showToast.error = (msg, title = 'Error', duration = 5000) => showToast(msg, 'error', title, duration);
showToast.warning = (msg, title = 'Aviso', duration = 4500) => showToast(msg, 'warning', title, duration);
showToast.info = (msg, title = 'Información', duration = 3800) => showToast(msg, 'info', title, duration);

// ==========================================
// 2. MODAL DE CONFIRMACIÓN ASÍNCRONO RPG (Reemplaza confirm())
// ==========================================

/**
 * Diálogo modal de confirmación asíncrono con estética TTRPG.
 * @returns {Promise<boolean>} Resuelve true si el usuario confirma, false si cancela o cierra.
 */
export function showConfirmModal(options = {}) {
  const {
    title = 'Confirmación requerida',
    message = '¿Deseas continuar con esta acción?',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    danger = false,
    icon = danger ? 'alert-triangle' : 'help-circle'
  } = typeof options === 'string' ? { message: options } : options;

  return new Promise((resolve) => {
    let dialog = document.getElementById('rpg-dynamic-confirm-dialog');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'rpg-dynamic-confirm-dialog';
      dialog.className = 'rpg-dialog p-0';
      document.body.appendChild(dialog);
    }

    const confirmBtnClass = danger ? 'btn-danger' : 'btn-warning text-dark fw-bold';
    const headerBorderClass = danger ? 'border-danger' : 'border-warning';
    const headerTextClass = danger ? 'text-danger' : 'text-warning';

    dialog.innerHTML = `
      <div class="rpg-card border-0">
        <div class="rpg-card-header d-flex justify-content-between align-items-center border-bottom ${headerBorderClass}">
          <h5 class="m-0 ${headerTextClass} d-flex align-items-center gap-2">
            <i data-lucide="${escapeHtml(icon)}"></i>
            <span>${escapeHtml(title)}</span>
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary btn-dialog-cancel">&times;</button>
        </div>
        <div class="p-4 text-light">
          <p class="m-0 fs-6" style="line-height: 1.5;">${escapeHtml(message)}</p>
        </div>
        <div class="p-3 bg-dark d-flex justify-content-end gap-2 border-top border-secondary rounded-bottom">
          <button type="button" class="btn btn-sm btn-outline-secondary btn-dialog-cancel px-3">${escapeHtml(cancelText)}</button>
          <button type="button" class="btn btn-sm ${confirmBtnClass} btn-dialog-confirm px-3">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    let resolved = false;
    const cleanup = (result) => {
      if (resolved) return;
      resolved = true;
      try { dialog.close(); } catch {}
      resolve(result);
    };

    dialog.querySelectorAll('.btn-dialog-cancel').forEach(btn => {
      btn.addEventListener('click', () => cleanup(false), { once: true });
    });

    dialog.querySelector('.btn-dialog-confirm')?.addEventListener('click', () => cleanup(true), { once: true });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      cleanup(false);
    }, { once: true });

    dialog.showModal();
    dialog.querySelector('.btn-dialog-confirm')?.focus();
  });
}

// ==========================================
// 3. MODAL DE ALERTA ASÍNCRONO RPG (Reemplaza alert())
// ==========================================

/**
 * Diálogo modal de alerta para avisos importantes que requieren confirmación explícita.
 * @returns {Promise<void>}
 */
export function showAlertModal(options = {}) {
  const {
    title = 'Atención',
    message = '',
    buttonText = 'Entendido',
    type = 'info',
    icon = type === 'error' ? 'alert-octagon' : type === 'warning' ? 'alert-triangle' : 'info'
  } = typeof options === 'string' ? { message: options } : options;

  return new Promise((resolve) => {
    let dialog = document.getElementById('rpg-dynamic-alert-dialog');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'rpg-dynamic-alert-dialog';
      dialog.className = 'rpg-dialog p-0';
      document.body.appendChild(dialog);
    }

    const headerTextClass = type === 'error' ? 'text-danger' : type === 'warning' ? 'text-warning' : 'text-info';

    dialog.innerHTML = `
      <div class="rpg-card border-0">
        <div class="rpg-card-header d-flex justify-content-between align-items-center">
          <h5 class="m-0 ${headerTextClass} d-flex align-items-center gap-2">
            <i data-lucide="${escapeHtml(icon)}"></i>
            <span>${escapeHtml(title)}</span>
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary btn-dialog-close">&times;</button>
        </div>
        <div class="p-4 text-light">
          <p class="m-0 fs-6" style="line-height: 1.5;">${escapeHtml(message)}</p>
        </div>
        <div class="p-3 bg-dark d-flex justify-content-end border-top border-secondary rounded-bottom">
          <button type="button" class="btn btn-sm btn-warning text-dark fw-bold btn-dialog-close px-4">${escapeHtml(buttonText)}</button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    let resolved = false;
    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      try { dialog.close(); } catch {}
      resolve();
    };

    dialog.querySelectorAll('.btn-dialog-close').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      cleanup();
    }, { once: true });

    dialog.showModal();
  });
}

// ==========================================
// 4. MODAL TEMÁTICO DE TIRADA SECRETA DEL DM
// ==========================================

/**
 * Muestra el resultado de la tirada secreta de percepción del DM en una tabla visual temática.
 */
export function showSecretRollModal({ title = 'Tirada Secreta de Percepción', rolls = [] }) {
  return new Promise((resolve) => {
    let dialog = document.getElementById('rpg-dynamic-secret-roll-dialog');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'rpg-dynamic-secret-roll-dialog';
      dialog.className = 'rpg-dialog p-0';
      document.body.appendChild(dialog);
    }

    dialog.innerHTML = `
      <div class="rpg-card border-0">
        <div class="rpg-card-header d-flex justify-content-between align-items-center">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="eye-off"></i>
            <span>${escapeHtml(title)}</span>
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary btn-dialog-close">&times;</button>
        </div>
        <div class="p-3 text-light">
          <div class="table-responsive">
            <table class="table table-dark table-hover table-sm mb-0 align-middle">
              <thead>
                <tr class="text-secondary small">
                  <th>Personaje</th>
                  <th class="text-center">Dado (d20)</th>
                  <th class="text-center">Modificador</th>
                  <th class="text-center">Pasiva</th>
                  <th class="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                ${rolls.map(r => `
                  <tr>
                    <td><strong class="text-warning">${escapeHtml(r.charName)}</strong></td>
                    <td class="text-center">
                      <span class="badge ${r.roll === 20 ? 'bg-success text-white' : r.roll === 1 ? 'bg-danger text-white' : 'bg-secondary text-light'}">
                        ${r.roll}
                      </span>
                    </td>
                    <td class="text-center text-muted">${r.mod >= 0 ? `+${r.mod}` : r.mod}</td>
                    <td class="text-center text-secondary">${r.passPerc}</td>
                    <td class="text-end">
                      <strong class="fs-5 ${r.roll === 20 ? 'text-success' : r.roll === 1 ? 'text-danger' : 'text-light'}">
                        ${r.total}
                      </strong>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="text-secondary small mt-2 fst-italic">
            * Tirada automática efectuada a puerta cerrada por el DM utilizando la Percepción Pasiva de los personajes.
          </div>
        </div>
        <div class="p-3 bg-dark d-flex justify-content-end border-top border-secondary rounded-bottom">
          <button type="button" class="btn btn-sm btn-warning text-dark fw-bold btn-dialog-close px-4">Cerrar</button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    let resolved = false;
    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      try { dialog.close(); } catch {}
      resolve();
    };

    dialog.querySelectorAll('.btn-dialog-close').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      cleanup();
    }, { once: true });

    dialog.showModal();
  });
}

// ==========================================
// 5. MODAL FORMULARIO DE CAMPAÑA (Reemplaza prompt())
// ==========================================

/**
 * Diálogo modal para crear o editar una campaña, sustituyendo los prompts secuenciales.
 * @returns {Promise<{ name: string, gameMaster: string, description: string } | null>}
 */
export function showCampaignFormModal(options = {}) {
  const {
    title = 'Nueva Campaña',
    campaign = { name: '', gameMaster: 'Dungeon Master', description: '' }
  } = options;

  return new Promise((resolve) => {
    let dialog = document.getElementById('rpg-dynamic-campaign-dialog');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'rpg-dynamic-campaign-dialog';
      dialog.className = 'rpg-dialog p-0';
      document.body.appendChild(dialog);
    }

    dialog.innerHTML = `
      <div class="rpg-card border-0">
        <div class="rpg-card-header d-flex justify-content-between align-items-center">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="compass"></i>
            <span>${escapeHtml(title)}</span>
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary btn-dialog-cancel">&times;</button>
        </div>
        <form id="form-campaign-dialog" class="p-3">
          <div class="mb-3">
            <label class="form-label small text-secondary">Nombre de la Campaña *</label>
            <input type="text" id="input-camp-name" class="form-control form-control-sm bg-dark text-light border-secondary" required value="${escapeHtml(campaign.name || '')}" placeholder="Ej: La Maldición de Strahd">
          </div>
          <div class="mb-3">
            <label class="form-label small text-secondary">Dungeon Master *</label>
            <input type="text" id="input-camp-gm" class="form-control form-control-sm bg-dark text-light border-secondary" required value="${escapeHtml(campaign.gameMaster || 'Dungeon Master')}" placeholder="Ej: Marcos">
          </div>
          <div class="mb-3">
            <label class="form-label small text-secondary">Descripción / Ambientación</label>
            <textarea id="input-camp-desc" class="form-control form-control-sm bg-dark text-light border-secondary" rows="3" placeholder="Notas sobre el mundo, tono de la aventura...">${escapeHtml(campaign.description || '')}</textarea>
          </div>
          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary btn-dialog-cancel">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Campaña</button>
          </div>
        </form>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    let resolved = false;
    const cleanup = (val) => {
      if (resolved) return;
      resolved = true;
      try { dialog.close(); } catch {}
      resolve(val);
    };

    dialog.querySelectorAll('.btn-dialog-cancel').forEach(btn => {
      btn.addEventListener('click', () => cleanup(null), { once: true });
    });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      cleanup(null);
    }, { once: true });

    dialog.querySelector('#form-campaign-dialog')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = dialog.querySelector('#input-camp-name')?.value?.trim();
      const gameMaster = dialog.querySelector('#input-camp-gm')?.value?.trim();
      const description = dialog.querySelector('#input-camp-desc')?.value?.trim();
      if (!name) return;
      cleanup({ name, gameMaster: gameMaster || 'Dungeon Master', description: description || '' });
    }, { once: true });

    dialog.showModal();
    dialog.querySelector('#input-camp-name')?.focus();
  });
}

