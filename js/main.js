/**
 * Archivo Principal de Inicialización y Router de Pestañas
 * Roleplay Master Utility Hub (D&D 5.5 + BTRS Engine)
 */

import { store } from './state.js';
import { MasterPanelModule } from './modules/masterPanel.js';
import { CharacterWizardModule } from './modules/characterWizard.js';
import { CharacterSheetModule } from './modules/characterSheet.js';
import { BtrsCalculatorModule } from './modules/btrsCalculator.js';
import { Dnd55ManagerModule } from './modules/dnd55Manager.js';
import { NameGeneratorModule } from './modules/nameGenerator.js';
import { 
  rollDie, 
  rollWithAdvantage, 
  rollWithDisadvantage, 
  roll4d6DropLowest, 
  rollDiceExpression 
} from './utils/dice.js';
import { exportStateToJsonFile, parseAndValidateBackup } from './utils/storage.js';
import { themeManager } from './utils/themeManager.js';
import { fileRepo } from './utils/fileRepository.js';
import { showConfirmModal, showAlertModal, showToast } from './utils/uiFeedback.js';

class App {
  constructor() {
    this.modules = {};
    this.activeTab = 'master-panel';
  }

  init() {
    console.log('[App] Inicializando Roleplay Master Utility Hub...');

    // 0. Estilo visual (tema): lee la preferencia, la aplica y monta el selector de la barra superior
    themeManager.init();

    // 1. Instanciar módulos
    this.modules.masterPanel = new MasterPanelModule('master-panel-container');
    this.modules.wizard = new CharacterWizardModule('wizard-container');
    this.modules.sheet = new CharacterSheetModule('sheet-container');
    this.modules.btrs = new BtrsCalculatorModule('btrs-container');
    this.modules.campaigns = new Dnd55ManagerModule('campaigns-container');
    this.modules.names = new NameGeneratorModule('names-container');

    // 2. Configurar Router de Pestañas
    this.setupTabs();

    // 3. Configurar Selector Global de Campaña
    this.setupGlobalCampaignSelect();

    // 4. Configurar Modal de Dados Rápido
    this.setupDiceModal();

    // 5. Configurar Modal de Respaldo de Datos y Repositorio de Ficheros
    this.setupBackupModal();

    // 5.1 Conectar listener de estado de repositorio de ficheros
    fileRepo.onStatusChange((status) => this.updateRepoUI(status));

    // 5.2 Intentar reconexión automática si había carpeta vinculada previa
    store.initRepository();

    // 6. Renderizar vista activa inicial
    this.switchTab('master-panel');

    // 7. Iconos vectoriales
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setupTabs() {
    const tabButtons = document.querySelectorAll('#app-tabs .nav-link');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.dataset.tab;
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;

    // Actualizar botones de pestaña
    document.querySelectorAll('#app-tabs .nav-link').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Actualizar título en el botón de navegación responsivo
    const tabTitles = {
      'master-panel': 'Master Panel',
      'wizard': 'Asistente Creación',
      'sheet': 'Hoja Interactiva',
      'btrs': 'Calculadora BTRS',
      'campaigns': 'Campañas & Roster',
      'names': 'Generador de Nombres'
    };
    const respTitleEl = document.getElementById('responsive-active-tab-title');
    if (respTitleEl && tabTitles[tabId]) {
      respTitleEl.textContent = tabTitles[tabId];
    }

    // Cerrar menú responsivo automáticamente al seleccionar una pestaña
    const respMenu = document.getElementById('rpg-responsive-menu');
    if (respMenu && respMenu.classList.contains('show') && window.innerWidth < 992) {
      if (window.bootstrap?.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(respMenu) || new window.bootstrap.Collapse(respMenu, { toggle: false });
        bsCollapse.hide();
      } else {
        respMenu.classList.remove('show');
      }
    }

    // Actualizar visibilidad de secciones
    const views = {
      'master-panel': document.getElementById('view-master-panel'),
      'wizard': document.getElementById('view-wizard'),
      'sheet': document.getElementById('view-sheet'),
      'btrs': document.getElementById('view-btrs'),
      'campaigns': document.getElementById('view-campaigns'),
      'names': document.getElementById('view-names')
    };

    Object.entries(views).forEach(([id, element]) => {
      if (!element) return;
      if (id === tabId) {
        element.classList.remove('d-none');
        element.classList.add('active');
      } else {
        element.classList.add('d-none');
        element.classList.remove('active');
      }
    });

    // Al entrar a la hoja oficial, restablecer scroll al comienzo
    if (tabId === 'sheet') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Invocar render del módulo seleccionado
    switch (tabId) {
      case 'master-panel':
        this.modules.masterPanel.render();
        break;
      case 'wizard':
        this.modules.wizard.render();
        break;
      case 'sheet':
        this.modules.sheet.render();
        break;
      case 'btrs':
        this.modules.btrs.render();
        break;
      case 'campaigns':
        this.modules.campaigns.render();
        break;
      case 'names':
        this.modules.names.render();
        break;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setupGlobalCampaignSelect() {
    const select = document.getElementById('global-campaign-select');
    const mobileSelect = document.getElementById('mobile-campaign-select');
    if (!select && !mobileSelect) return;

    const populate = () => {
      const campaigns = store.getCampaigns();
      const currentId = store.getSelectedCampaignId();

      const optionsHtml = campaigns.map(c => `
        <option value="${c.id}" ${c.id === currentId ? 'selected' : ''}>
          ${c.name}
        </option>
      `).join('');

      if (select) select.innerHTML = optionsHtml;
      if (mobileSelect) mobileSelect.innerHTML = optionsHtml;
    };

    populate();

    select?.addEventListener('change', (e) => {
      store.setSelectedCampaignId(e.target.value);
    });

    mobileSelect?.addEventListener('change', (e) => {
      store.setSelectedCampaignId(e.target.value);
    });

    store.on('campaigns:updated', () => populate());
    store.on('campaign:selected', () => populate());
  }

  setupDiceModal() {
    const dialog = document.getElementById('dice-modal');
    const openBtn = document.getElementById('btn-quick-dice');
    const mobileOpenBtn = document.getElementById('btn-mobile-quick-dice');
    const closeBtn = document.getElementById('close-dice-modal');

    if (!dialog) return;

    openBtn?.addEventListener('click', () => dialog.showModal());
    mobileOpenBtn?.addEventListener('click', () => dialog.showModal());
    closeBtn?.addEventListener('click', () => dialog.close());

    // Cierre al pulsar fuera
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    const resultVal = document.getElementById('dice-result-val');
    const resultBreakdown = document.getElementById('dice-result-breakdown');

    // Botones de dados individuales (d20, d12, d10, etc.)
    document.querySelectorAll('.btn-roll-die').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sides = parseInt(e.currentTarget.dataset.sides, 10);
        const roll = rollDie(sides);
        if (resultVal) resultVal.textContent = roll;
        if (resultBreakdown) resultBreakdown.textContent = `Tirada de 1d${sides}: [${roll}]`;
      });
    });

    // Ventaja
    document.getElementById('btn-roll-adv')?.addEventListener('click', () => {
      const res = rollWithAdvantage(0);
      if (resultVal) resultVal.textContent = res.chosen;
      if (resultBreakdown) resultBreakdown.textContent = `Con Ventaja (d20): Dados [${res.rolls.join(', ')}] -> Se elige ${res.chosen}`;
    });

    // Desventaja
    document.getElementById('btn-roll-dis')?.addEventListener('click', () => {
      const res = rollWithDisadvantage(0);
      if (resultVal) resultVal.textContent = res.chosen;
      if (resultBreakdown) resultBreakdown.textContent = `Con Desventaja (d20): Dados [${res.rolls.join(', ')}] -> Se elige ${res.chosen}`;
    });

    // 4d6 Drop Lowest
    document.getElementById('btn-roll-4d6')?.addEventListener('click', () => {
      const res = roll4d6DropLowest();
      if (resultVal) resultVal.textContent = res.total;
      if (resultBreakdown) resultBreakdown.textContent = `4d6 descarta menor: Dados [${res.rolls.join(', ')}], descartado [${res.dropped}], conservados [${res.kept.join(', ')}] = Total ${res.total}`;
    });

    // Fórmula personalizada
    document.getElementById('btn-custom-roll')?.addEventListener('click', () => {
      const input = document.getElementById('dice-custom-input');
      const expr = input?.value || '1d20';
      const res = rollDiceExpression(expr);
      if (resultVal) resultVal.textContent = res.total;
      if (resultBreakdown) resultBreakdown.textContent = `Fórmula "${res.formula}": Dados [${res.rolls.join(', ')}] ${res.modifier >= 0 ? '+' : ''}${res.modifier} = Total ${res.total}`;
    });
  }

  setupBackupModal() {
    const dialog = document.getElementById('backup-modal');
    const openBtn = document.getElementById('btn-backup-modal');
    const mobileOpenBtn = document.getElementById('btn-mobile-backup');
    const closeBtn = document.getElementById('close-backup-modal');
    const repoPill = document.getElementById('btn-repo-status');
    const mobileRepoBtn = document.getElementById('btn-mobile-repo');

    if (!dialog) return;

    openBtn?.addEventListener('click', () => dialog.showModal());
    mobileOpenBtn?.addEventListener('click', () => dialog.showModal());
    repoPill?.addEventListener('click', () => dialog.showModal());
    mobileRepoBtn?.addEventListener('click', () => dialog.showModal());
    closeBtn?.addEventListener('click', () => {
      if (fileRepo.isBusy) return;
      dialog.close();
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog && !fileRepo.isBusy) dialog.close();
    });

    dialog.addEventListener('cancel', (e) => {
      if (fileRepo.isBusy) {
        e.preventDefault();
      }
    });

    // --- REPOSITORIO DE FICHEROS FÍSICOS (DISCO / GOOGLE DRIVE) ---
    document.getElementById('btn-connect-folder')?.addEventListener('click', async () => {
      if (fileRepo.isBusy) return;
      await store.connectFileRepository();
    });

    const gdriveInput = document.getElementById('gdrive-client-id-input');
    if (gdriveInput && fileRepo.gdrive.clientId) {
      gdriveInput.value = fileRepo.gdrive.clientId;
    }
    document.getElementById('btn-connect-gdrive')?.addEventListener('click', async () => {
      if (fileRepo.isBusy) return;
      const clientId = gdriveInput?.value;
      await store.connectGoogleDrive(clientId);
    });

    // Desplegable de ayuda para Client ID
    const helpCollapse = document.getElementById('gdrive-help-collapse');
    const toggleHelpBtn = document.getElementById('btn-toggle-gdrive-help');
    toggleHelpBtn?.addEventListener('click', () => {
      helpCollapse?.classList.toggle('show');
      window.lucide?.createIcons();
    });

    document.getElementById('btn-disconnect-folder')?.addEventListener('click', async () => {
      if (fileRepo.isBusy) return;
      const confirmed = await showConfirmModal({
        title: 'Desvincular Repositorio',
        message: '¿Desvincular el repositorio? Tus ficheros y datos actuales se conservarán, pero los cambios futuros dejarán de guardarse automáticamente en esa ubicación.',
        confirmText: 'Desvincular',
        cancelText: 'Cancelar',
        danger: true,
        icon: 'unlink'
      });
      if (confirmed) {
        await store.disconnectFileRepository();
      }
    });

    document.getElementById('btn-sync-all-folder')?.addEventListener('click', async () => {
      if (fileRepo.isBusy) return;
      const repoLabel = fileRepo.repoType === 'gdrive' ? 'Google Drive' : `la carpeta local "${fileRepo.folderName}"`;
      const confirmed = await showConfirmModal({
        title: 'Sobrescribir Repositorio con Datos Actuales',
        message: `¿Guardar todos tus datos actuales en ${repoLabel}? Se sobrescribirán los archivos guardados en el repositorio con las campañas y personajes que tienes ahora mismo en la aplicación.`,
        confirmText: 'Guardar y Sobrescribir',
        cancelText: 'Cancelar',
        danger: false,
        icon: 'refresh-cw'
      });
      if (confirmed) {
        await store.syncAllToFileRepository();
      }
    });

    document.getElementById('btn-load-all-folder')?.addEventListener('click', async () => {
      if (fileRepo.isBusy) return;
      const repoLabel = fileRepo.repoType === 'gdrive' ? 'Google Drive' : `la carpeta local "${fileRepo.folderName}"`;
      const confirmed = await showConfirmModal({
        title: 'Recargar y Sobrescribir desde Repositorio',
        message: `¿Recargar todos los datos desde ${repoLabel}? Se sobrescribirán las campañas y personajes actuales de la aplicación con el contenido guardado en el repositorio.`,
        confirmText: 'Recargar y Sobrescribir',
        cancelText: 'Cancelar',
        danger: true,
        icon: 'folder-down'
      });
      if (confirmed) {
        await store.loadAllFromFileRepository();
      }
    });

    // --- COPIAS DE SEGURIDAD MANUALES EN JSON ---
    // Exportar JSON
    document.getElementById('btn-export-json')?.addEventListener('click', () => {
      if (fileRepo.isBusy) {
        showToast('Espera a que finalice la sincronización del repositorio antes de exportar.', 'warning', 'Sincronizando');
        return;
      }
      const state = store.exportState();
      exportStateToJsonFile(state);
    });

    // Importar JSON
    const fileInput = document.getElementById('import-json-file');
    fileInput?.addEventListener('change', (e) => {
      if (fileRepo.isBusy) {
        e.target.value = '';
        showToast('Espera a que finalice la sincronización del repositorio antes de cargar un archivo.', 'warning', 'Sincronizando');
        return;
      }
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result;
        const parsed = parseAndValidateBackup(content);
        e.target.value = '';
        if (parsed.success) {
          const confirmed = await showConfirmModal({
            title: 'Sobrescribir con Copia de Respaldo (JSON)',
            message: 'Al cargar este archivo JSON se sobrescribirán las campañas y personajes actuales que tienes en la aplicación. ¿Deseas continuar?',
            confirmText: 'Cargar y Sobrescribir',
            cancelText: 'Cancelar',
            danger: true,
            icon: 'upload'
          });
          if (!confirmed) return;
          store.importState(parsed);
          showToast('¡Copia de respaldo importada con éxito!', 'success', 'Respaldo Cargado');
          dialog.close();
        } else {
          await showAlertModal({
            title: 'Error de Archivo JSON',
            message: 'Error al leer el archivo JSON: ' + (parsed.error || 'Formato desconocido'),
            type: 'error'
          });
        }
      };
      reader.readAsText(file);
    });

    // Restablecer a valores por defecto
    document.getElementById('btn-reset-data')?.addEventListener('click', async () => {
      if (fileRepo.isBusy) return;
      const confirmed = await showConfirmModal({
        title: 'Restablecer a Datos Iniciales',
        message: '¿Restablecer todas las campañas y personajes a los datos canónicos iniciales? Se sobrescribirán todos los datos actuales.',
        confirmText: 'Restablecer Datos',
        cancelText: 'Cancelar',
        danger: true,
        icon: 'rotate-ccw'
      });
      if (confirmed) {
        store.resetToDefaults();
        showToast('Se han restaurado los datos canónicos iniciales.', 'info', 'Datos Restablecidos');
        dialog.close();
      }
    });
  }

  updateRepoUI(status) {
    const pill = document.getElementById('btn-repo-status');
    const pillLabel = document.getElementById('repo-status-label');
    const badge = document.getElementById('repo-badge-status');
    const details = document.getElementById('repo-connected-details');
    const folderNameEl = document.getElementById('repo-folder-name');
    const lastSyncEl = document.getElementById('repo-last-sync');
    const btnConnectText = document.getElementById('btn-connect-folder-text');
    const btnConnectFolder = document.getElementById('btn-connect-folder');
    const btnConnectGdrive = document.getElementById('btn-connect-gdrive');
    const gdriveClientIdInput = document.getElementById('gdrive-client-id-input');
    const firefoxNotice = document.getElementById('firefox-repo-notice');
    const btnSync = document.getElementById('btn-sync-all-folder');
    const btnLoad = document.getElementById('btn-load-all-folder');
    const btnDisconnect = document.getElementById('btn-disconnect-folder');
    const btnExportJson = document.getElementById('btn-export-json');
    const importJsonInput = document.getElementById('import-json-file');
    const labelImportJson = document.getElementById('label-import-json');
    const btnResetData = document.getElementById('btn-reset-data');
    const closeBackupBtn = document.getElementById('close-backup-modal');
    const busyLoader = document.getElementById('repo-busy-loader');
    const busyText = document.getElementById('repo-busy-text');
    const isBusy = Boolean(status.isBusy);

    if (busyLoader) {
      busyLoader.classList.toggle('d-none', !isBusy);
    }
    if (busyText && isBusy) {
      busyText.textContent = status.busyMessage || 'Conectando y descargando el repositorio...';
    }

    // Bloquear/desbloquear controles de carga y guardado mientras conecta o descarga
    [btnConnectGdrive, gdriveClientIdInput, btnSync, btnLoad, btnDisconnect, btnExportJson, importJsonInput, btnResetData, closeBackupBtn].forEach(el => {
      if (el) el.disabled = isBusy;
    });
    if (labelImportJson) {
      labelImportJson.classList.toggle('disabled', isBusy);
      labelImportJson.style.pointerEvents = isBusy ? 'none' : '';
      labelImportJson.style.opacity = isBusy ? '0.6' : '';
    }

    // Comprobar soporte de carpetas locales (Firefox/Safari vs Chrome/Edge/Brave)
    if (!status.isLocalSupported) {
      firefoxNotice?.classList.remove('d-none');
      if (btnConnectFolder) {
        btnConnectFolder.disabled = true;
        btnConnectFolder.title = 'Firefox bloquea el acceso a carpetas locales. Usa Google Drive en la Nube abajo, o abre la app en Chrome/Edge.';
      }
      if (btnConnectText) {
        btnConnectText.textContent = 'Disco Local (No disponible en Firefox)';
      }
    } else {
      firefoxNotice?.classList.add('d-none');
      if (btnConnectFolder) {
        btnConnectFolder.disabled = isBusy;
        btnConnectFolder.title = 'Vincular carpeta en disco o Google Drive Desktop';
      }
      if (btnConnectText) {
        btnConnectText.textContent = status.isConnected && status.repoType === 'local' ? 'Cambiar Carpeta en Disco' : 'Vincular Carpeta en Disco (Chrome/Edge/Brave)';
      }
    }

    if (status.isConnected) {
      const isDrive = status.repoType === 'gdrive';
      if (pill) {
        pill.className = isBusy
          ? 'btn btn-sm btn-outline-warning d-flex align-items-center gap-1'
          : 'btn btn-sm btn-outline-success d-flex align-items-center gap-1';
        pill.title = isDrive ? 'Sincronizado con Google Drive (Carpeta DnD Master Hub)' : `Carpeta: ${status.folderName} (Guardado automático activo)`;
      }
      if (pillLabel) {
        pillLabel.textContent = isBusy
          ? 'Sincronizando...'
          : (isDrive ? 'Google Drive' : (status.folderName.length > 14 ? `${status.folderName.slice(0, 14)}…` : status.folderName));
      }
      if (badge) {
        if (status.syncing || isBusy) {
          badge.className = 'badge bg-info text-dark';
          badge.textContent = status.busyMessage || (isDrive ? 'Sincronizando Drive...' : 'Sincronizando disco...');
        } else {
          badge.className = 'badge bg-success';
          badge.textContent = isDrive ? 'Conectado a Google Drive' : 'Conectado a Disco';
        }
      }
      if (details) details.classList.remove('d-none');
      if (folderNameEl) folderNameEl.textContent = status.folderName;
      if (lastSyncEl) lastSyncEl.textContent = status.lastSyncTime || 'Conectado recientemente';

      btnSync?.classList.remove('d-none');
      btnSync?.classList.add('d-flex');
      btnLoad?.classList.remove('d-none');
      btnLoad?.classList.add('d-flex');
      btnDisconnect?.classList.remove('d-none');
      btnDisconnect?.classList.add('d-flex');
    } else {
      if (pill) {
        pill.className = isBusy
          ? 'btn btn-sm btn-outline-warning d-flex align-items-center gap-1'
          : 'btn btn-sm btn-outline-secondary d-flex align-items-center gap-1';
        pill.title = 'Almacenamiento en memoria del navegador (Sin carpeta vinculada)';
      }
      if (pillLabel) pillLabel.textContent = isBusy ? 'Conectando...' : 'Modo Navegador';
      if (badge) {
        if (isBusy) {
          badge.className = 'badge bg-warning text-dark';
          badge.textContent = 'Conectando...';
        } else {
          badge.className = 'badge bg-secondary';
          badge.textContent = 'Sin vincular';
        }
      }
      if (details) details.classList.add('d-none');

      btnSync?.classList.add('d-none');
      btnSync?.classList.remove('d-flex');
      btnLoad?.classList.add('d-none');
      btnLoad?.classList.remove('d-flex');
      btnDisconnect?.classList.add('d-none');
      btnDisconnect?.classList.remove('d-flex');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Iniciar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
