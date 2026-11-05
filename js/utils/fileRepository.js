/**
 * Gestor de Repositorio de Ficheros Físicos y Nube (Disco Local / Google Drive)
 * Soporta dos modos de persistencia directa:
 * 1. "local": File System Access API (Chrome, Edge, Brave, Opera) para carpetas en disco o Google Drive Desktop.
 * 2. "gdrive": Google Drive REST API v3 + GIS OAuth2 (Compatible con Firefox, Safari, Chrome y dispositivos móviles).
 */

const IDB_NAME = 'dnd55_repository_db';
const IDB_VERSION = 1;
const STORE_NAME = 'handles';
const KEY_DIR_HANDLE = 'active_dir_handle';
const KEY_CONFIG = 'repo_config';
const KEY_GDRIVE_CONFIG = 'gdrive_config';

/**
 * Abre o crea la base de datos IndexedDB para almacenar manejadores y tokens.
 * @returns {Promise<IDBDatabase>}
 */
function openRepoDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      return reject(new Error('IndexedDB no está disponible en este navegador.'));
    }
    const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key, value) {
  const db = await openRepoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbGet(key) {
  const db = await openRepoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbDel(key) {
  const db = await openRepoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Carga de forma asíncrona el cliente de Google Identity Services (GIS).
 */
function loadGsiClient() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      return resolve(window.google.accounts.oauth2);
    }
    const existing = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.accounts.oauth2));
      existing.addEventListener('error', (e) => reject(e));
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(window.google?.accounts?.oauth2);
    s.onerror = (e) => reject(new Error('No se pudo cargar la librería de Google Identity Services.'));
    document.head.appendChild(s);
  });
}

export class FileRepositoryManager {
  constructor() {
    this.repoType = null; // 'local' | 'gdrive' | null
    this.dirHandle = null;
    this.folderName = '';
    this.isConnected = false;
    this.statusListeners = new Set();
    this.debounceTimers = new Map();
    this.lastSyncTime = null;

    // Google Drive state
    this.gdrive = {
      clientId: localStorage.getItem('gdrive_client_id') || '',
      token: null,
      folderId: null,
      charactersFolderId: null,
      fileIdMap: new Map() // 'campaigns.json' -> fileId, etc.
    };
  }

  isLocalSupported() {
    return typeof window.showDirectoryPicker === 'function';
  }

  isSupported() {
    // Si no soporta showDirectoryPicker (Firefox/Safari), aún soporta Google Drive Web
    return true;
  }

  onStatusChange(listener) {
    this.statusListeners.add(listener);
    try {
      listener(this.getStatus());
    } catch (e) {
      console.error(e);
    }
    return () => this.statusListeners.delete(listener);
  }

  notifyStatus(extra = {}) {
    const status = { ...this.getStatus(), ...extra };
    for (const listener of this.statusListeners) {
      try {
        listener(status);
      } catch (err) {
        console.error('[FileRepository] Error en listener de estado:', err);
      }
    }
  }

  getStatus() {
    return {
      isSupported: this.isSupported(),
      isLocalSupported: this.isLocalSupported(),
      isConnected: this.isConnected,
      repoType: this.repoType,
      folderName: this.folderName,
      lastSyncTime: this.lastSyncTime,
      hasGdriveClientId: Boolean(this.gdrive.clientId)
    };
  }

  // ==========================================
  // INICIALIZACIÓN Y AUTO-CONEXIÓN
  // ==========================================

  async initAutoConnect(promptUser = false) {
    try {
      const config = await idbGet(KEY_CONFIG);
      if (!config) return false;

      if (config.repoType === 'local' && this.isLocalSupported()) {
        const storedHandle = await idbGet(KEY_DIR_HANDLE);
        if (storedHandle) {
          const hasPerm = await this.verifyPermission(storedHandle, promptUser);
          if (hasPerm) {
            if (await this.isProtectedAppDirectory(storedHandle)) {
              console.warn('[FileRepository] Se detectó la carpeta de código fuente de la aplicación. Desvinculando por seguridad.');
              await this.disconnectFolder();
              return false;
            }
            this.repoType = 'local';
            this.dirHandle = storedHandle;
            this.folderName = storedHandle.name || 'Carpeta Vinculada';
            this.isConnected = true;
            this.notifyStatus({ isConnected: true });
            return true;
          }
        }
      } else if (config.repoType === 'gdrive' && this.gdrive.clientId) {
        // En Google Drive, los tokens expiran tras 1 hora. Guardamos la configuración de carpeta
        if (config.folderId) {
          this.gdrive.folderId = config.folderId;
          this.gdrive.charactersFolderId = config.charactersFolderId;
          this.folderName = 'Google Drive: DnD Master Hub';
        }
      }
    } catch (err) {
      console.warn('[FileRepository] Error en auto-conexión:', err);
    }
    return false;
  }

  // ==========================================
  // MODO LOCAL: FILE SYSTEM ACCESS API
  // ==========================================

  async verifyPermission(handle, promptUser = false) {
    if (!handle) return false;
    const opts = { mode: 'readwrite' };
    try {
      if ((await handle.queryPermission(opts)) === 'granted') {
        return true;
      }
      if (promptUser && (await handle.requestPermission(opts)) === 'granted') {
        return true;
      }
    } catch (err) {
      console.warn('[FileRepository] Error verificando permisos de carpeta:', err);
    }
    return false;
  }

  /**
   * Verifica si la carpeta seleccionada es el propio directorio raíz de la aplicación web
   * (contiene index.html, server.ps1 o subcarpeta js/) para impedir modificar los ficheros de la web.
   * @param {FileSystemDirectoryHandle} handle
   * @returns {Promise<boolean>}
   */
  async isProtectedAppDirectory(handle) {
    if (!handle) return false;
    try {
      await handle.getFileHandle('index.html', { create: false });
      return true;
    } catch {}
    try {
      await handle.getFileHandle('server.ps1', { create: false });
      return true;
    } catch {}
    return false;
  }

  async connectFolder() {
    if (!this.isLocalSupported()) {
      return {
        success: false,
        error: 'Tu navegador (Firefox / Safari) no soporta el acceso directo a carpetas locales por políticas de Mozilla/Apple. Para usar carpetas locales de tu ordenador abre la app en Google Chrome, Microsoft Edge o Brave, o utiliza la opción "Google Drive en la Nube" disponible abajo.'
      };
    }

    try {
      const handle = await window.showDirectoryPicker({
        id: 'rpg_master_hub_folder',
        mode: 'readwrite',
        startIn: 'documents'
      });

      const hasPerm = await this.verifyPermission(handle, true);
      if (!hasPerm) {
        return { success: false, error: 'No se otorgaron permisos de lectura/escritura para la carpeta seleccionada.' };
      }

      if (await this.isProtectedAppDirectory(handle)) {
        return {
          success: false,
          error: 'Por seguridad, no se permite vincular ni modificar la carpeta de ficheros de la aplicación web. Selecciona o crea otra carpeta dedicada para tus partidas.'
        };
      }

      this.repoType = 'local';
      this.dirHandle = handle;
      this.folderName = handle.name || 'Carpeta Vinculada';
      this.isConnected = true;

      await idbSet(KEY_DIR_HANDLE, handle);
      await idbSet(KEY_CONFIG, { repoType: 'local', folderName: this.folderName, connectedAt: new Date().toISOString() });
      await this.ensureLocalStructure();

      this.notifyStatus({ isConnected: true, message: `Carpeta "${this.folderName}" conectada con éxito.` });
      return { success: true, folderName: this.folderName, repoType: 'local' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, cancelled: true };
      }
      return { success: false, error: err.message || 'Error al conectar carpeta' };
    }
  }

  async ensureLocalStructure() {
    if (!this.isConnected || !this.dirHandle) return;
    try {
      await this.dirHandle.getDirectoryHandle('characters', { create: true });
    } catch (err) {
      console.error('[FileRepository] Error asegurando estructura:', err);
    }
  }

  async getLocalSubdirectory(name, create = true) {
    if (!this.dirHandle) throw new Error('No hay carpeta conectada.');
    return await this.dirHandle.getDirectoryHandle(name, { create });
  }

  async writeLocalJson(fileName, data, subfolder = null) {
    if (!/^[a-zA-Z0-9_-]+\.json$/.test(fileName)) {
      throw new Error(`Nombre de archivo no permitido por seguridad: ${fileName}`);
    }
    if (subfolder !== null && subfolder !== 'characters') {
      throw new Error(`Subcarpeta no permitida por seguridad: ${subfolder}`);
    }
    if (await this.isProtectedAppDirectory(this.dirHandle)) {
      await this.disconnectFolder();
      throw new Error('Escritura bloqueada: no se permite modificar la carpeta de la aplicación web.');
    }
    let targetDir = this.dirHandle;
    if (subfolder) {
      targetDir = await this.getLocalSubdirectory(subfolder, true);
    }
    const fileHandle = await targetDir.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    const content = JSON.stringify(data, null, 2);
    await writable.write('\uFEFF' + content);
    await writable.close();
    return true;
  }

  async readLocalJson(fileName, subfolder = null) {
    try {
      let targetDir = this.dirHandle;
      if (subfolder) {
        targetDir = await this.getLocalSubdirectory(subfolder, false);
      }
      const fileHandle = await targetDir.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      let text = await file.text();
      if (text.charCodeAt(0) === 0xFEFF) {
        text = text.slice(1);
      }
      return JSON.parse(text);
    } catch (err) {
      if (err.name === 'NotFoundError') return null;
      console.warn(`[FileRepository] Error leyendo local ${fileName}:`, err);
      return null;
    }
  }

  // ==========================================
  // MODO NUBE: GOOGLE DRIVE REST API (FIREFOX / MÓVIL / TODOS)
  // ==========================================

  setGoogleClientId(clientId) {
    this.gdrive.clientId = (clientId || '').trim();
    if (this.gdrive.clientId) {
      localStorage.setItem('gdrive_client_id', this.gdrive.clientId);
    } else {
      localStorage.removeItem('gdrive_client_id');
    }
    this.notifyStatus({});
  }

  /**
   * Conecta con la cuenta de Google del usuario mediante popup OAuth2 de Google.
   * Compatible con Firefox, Safari, Chrome, Edge y móviles.
   * @param {string|null} customClientId 
   */
  async connectGoogleDrive(customClientId = null) {
    const clientId = (customClientId || this.gdrive.clientId || '').trim();
    if (!clientId) {
      return {
        success: false,
        requiresClientId: true,
        error: 'Introduce tu Client ID de Google Cloud OAuth para conectar directamente con Google Drive.'
      };
    }
    this.setGoogleClientId(clientId);

    try {
      const oauth2 = await loadGsiClient();
      return new Promise((resolve) => {
        const tokenClient = oauth2.initTokenClient({
          client_id: clientId,
          scope: 'https://www.googleapis.com/auth/drive.file',
          callback: async (resp) => {
            if (resp.error) {
              return resolve({ success: false, error: resp.error_description || resp.error });
            }
            this.gdrive.token = resp.access_token;
            try {
              await this.setupGoogleDriveFolders();
              this.repoType = 'gdrive';
              this.folderName = 'Google Drive: DnD Master Hub';
              this.isConnected = true;

              await idbSet(KEY_CONFIG, {
                repoType: 'gdrive',
                folderName: this.folderName,
                folderId: this.gdrive.folderId,
                charactersFolderId: this.gdrive.charactersFolderId,
                connectedAt: new Date().toISOString()
              });

              this.notifyStatus({ isConnected: true, message: 'Google Drive conectado con éxito.' });
              resolve({ success: true, folderName: this.folderName, repoType: 'gdrive' });
            } catch (setupErr) {
              resolve({ success: false, error: setupErr.message || 'Error preparando carpetas en Google Drive' });
            }
          }
        });
        tokenClient.requestAccessToken();
      });
    } catch (err) {
      return { success: false, error: err.message || 'Error inicializando Google Drive' };
    }
  }

  /**
   * Asegura la carpeta principal "DnD Master Hub" y la subcarpeta "characters" en Drive.
   */
  async setupGoogleDriveFolders() {
    if (!this.gdrive.token) throw new Error('No hay sesión de Google activa.');
    // Buscar carpeta raíz
    let rootFolder = await this.findDriveItem('DnD Master Hub', null, true);
    if (!rootFolder) {
      rootFolder = await this.createDriveFolder('DnD Master Hub');
    }
    this.gdrive.folderId = rootFolder.id;

    // Buscar subcarpeta characters
    let charsFolder = await this.findDriveItem('characters', this.gdrive.folderId, true);
    if (!charsFolder) {
      charsFolder = await this.createDriveFolder('characters', this.gdrive.folderId);
    }
    this.gdrive.charactersFolderId = charsFolder.id;
  }

  async findDriveItem(name, parentId = null, isFolder = false) {
    let q = `name = '${name}' and trashed = false`;
    if (parentId) {
      q += ` and '${parentId}' in parents`;
    }
    if (isFolder) {
      q += ` and mimeType = 'application/vnd.google-apps.folder'`;
    }
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType)`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${this.gdrive.token}` }
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const msg = errData.error?.message || res.statusText || 'Error';
      if (res.status === 403 && (msg.toLowerCase().includes('drive api') || msg.toLowerCase().includes('disabled') || msg.toLowerCase().includes('has not been used'))) {
        throw new Error('Falta habilitar "Google Drive API" en tu proyecto de Google Cloud Console. Ve a la Biblioteca de APIs y pulsa "Habilitar".');
      }
      throw new Error(`Error en Drive API (${res.status}): ${msg}`);
    }
    const data = await res.json();
    return data.files?.[0] || null;
  }

  async createDriveFolder(name, parentId = null) {
    const metadata = {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentId ? [parentId] : []
    };
    const res = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.gdrive.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metadata)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const msg = errData.error?.message || res.statusText || 'Error';
      if (res.status === 403 && (msg.toLowerCase().includes('drive api') || msg.toLowerCase().includes('disabled') || msg.toLowerCase().includes('has not been used'))) {
        throw new Error('Falta habilitar "Google Drive API" en tu proyecto de Google Cloud Console. Ve a la Biblioteca de APIs y pulsa "Habilitar".');
      }
      throw new Error(`Error creando carpeta en Drive (${res.status}): ${msg}`);
    }
    return await res.json();
  }

  async writeDriveJson(fileName, data, parentFolderId = null) {
    if (!this.gdrive.token) return false;
    const targetFolderId = parentFolderId || this.gdrive.folderId;
    const existing = await this.findDriveItem(fileName, targetFolderId, false);
    const content = JSON.stringify(data, null, 2);

    if (existing) {
      // Actualizar archivo existente
      const updateUrl = `https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=media`;
      const res = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.gdrive.token}`,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: '\uFEFF' + content
      });
      return res.ok;
    } else {
      // Crear nuevo archivo con multipart
      const metadata = {
        name: fileName,
        parents: [targetFolderId]
      };
      const boundary = 'foo_bar_baz';
      const multipartBody =
        `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        JSON.stringify(metadata) + '\r\n' +
        `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        '\uFEFF' + content + '\r\n' +
        `--${boundary}--`;

      const createUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
      const res = await fetch(createUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.gdrive.token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartBody
      });
      return res.ok;
    }
  }

  async readDriveJson(fileName, parentFolderId = null) {
    if (!this.gdrive.token) return null;
    const targetFolderId = parentFolderId || this.gdrive.folderId;
    const item = await this.findDriveItem(fileName, targetFolderId, false);
    if (!item) return null;

    const url = `https://www.googleapis.com/drive/v3/files/${item.id}?alt=media`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${this.gdrive.token}` }
    });
    if (!res.ok) return null;
    let text = await res.text();
    if (text.charCodeAt(0) === 0xFEFF) {
      text = text.slice(1);
    }
    return JSON.parse(text);
  }

  async deleteDriveFile(fileName, parentFolderId = null) {
    if (!this.gdrive.token) return false;
    const targetFolderId = parentFolderId || this.gdrive.folderId;
    const item = await this.findDriveItem(fileName, targetFolderId, false);
    if (!item) return false;

    const url = `https://www.googleapis.com/drive/v3/files/${item.id}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.gdrive.token}` }
    });
    return res.ok;
  }

  // ==========================================
  // OPERACIONES UNIFICADAS (LOCAL & GOOGLE DRIVE)
  // ==========================================

  getCharacterFileName(character) {
    const safeName = (character.name || 'Heroe')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/gi, '_')
      .slice(0, 30);
    return `${safeName}_${character.id}.json`;
  }

  async writeJsonFile(fileName, data, subfolder = null) {
    if (!this.isConnected) return false;
    try {
      let ok = false;
      if (this.repoType === 'local') {
        ok = await this.writeLocalJson(fileName, data, subfolder);
      } else if (this.repoType === 'gdrive') {
        const parentId = subfolder === 'characters' ? this.gdrive.charactersFolderId : this.gdrive.folderId;
        ok = await this.writeDriveJson(fileName, data, parentId);
      }
      if (ok) {
        this.lastSyncTime = new Date().toLocaleTimeString();
        this.notifyStatus({ syncing: false });
      }
      return ok;
    } catch (err) {
      console.error(`[FileRepository] Error escribiendo ${fileName}:`, err);
      this.notifyStatus({ syncing: false, error: `Error guardando ${fileName}` });
      return false;
    }
  }

  async readJsonFile(fileName, subfolder = null) {
    if (!this.isConnected) return null;
    if (this.repoType === 'local') {
      return await this.readLocalJson(fileName, subfolder);
    } else if (this.repoType === 'gdrive') {
      const parentId = subfolder === 'characters' ? this.gdrive.charactersFolderId : this.gdrive.folderId;
      return await this.readDriveJson(fileName, parentId);
    }
    return null;
  }

  saveCharacterDebounced(character, delayMs = 350) {
    if (!this.isConnected || !character || !character.id) return;
    const key = `char_${character.id}`;
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key));
    }
    this.notifyStatus({ syncing: true });
    this.debounceTimers.set(key, setTimeout(async () => {
      this.debounceTimers.delete(key);
      await this.saveCharacter(character);
    }, delayMs));
  }

  async saveCharacter(character) {
    if (!this.isConnected || !character || !character.id) return false;
    const fileName = this.getCharacterFileName(character);
    return await this.writeJsonFile(fileName, character, 'characters');
  }

  async deleteCharacter(characterId) {
    if (!this.isConnected) return false;
    if (this.repoType === 'local') {
      try {
        if (await this.isProtectedAppDirectory(this.dirHandle)) {
          await this.disconnectFolder();
          return false;
        }
        const charsDir = await this.getLocalSubdirectory('characters', false);
        for await (const [name, handle] of charsDir.entries()) {
          if (handle.kind === 'file' && name.endsWith('.json') && name.includes(characterId)) {
            await charsDir.removeEntry(name);
            return true;
          }
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (this.repoType === 'gdrive') {
      try {
        const q = `'${this.gdrive.charactersFolderId}' in parents and trashed = false`;
        const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`, {
          headers: { Authorization: `Bearer ${this.gdrive.token}` }
        });
        const data = await res.json();
        for (const file of data.files || []) {
          if (file.name.includes(characterId)) {
            await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${this.gdrive.token}` }
            });
            return true;
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
    return false;
  }

  saveCampaignsDebounced(campaigns, delayMs = 400) {
    if (!this.isConnected) return;
    const key = 'campaigns_save';
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key));
    }
    this.notifyStatus({ syncing: true });
    this.debounceTimers.set(key, setTimeout(async () => {
      this.debounceTimers.delete(key);
      await this.writeJsonFile('campaigns.json', campaigns);
    }, delayMs));
  }

  async exportAllToFolder(fullState) {
    if (!this.isConnected) return false;
    this.notifyStatus({ syncing: true, message: 'Guardando datos en el repositorio...' });
    try {
      if (Array.isArray(fullState.campaigns)) {
        await this.writeJsonFile('campaigns.json', fullState.campaigns);
      }
      if (Array.isArray(fullState.btrsHistory)) {
        await this.writeJsonFile('btrs_history.json', fullState.btrsHistory);
      }
      if (Array.isArray(fullState.characters)) {
        for (const char of fullState.characters) {
          await this.saveCharacter(char);
        }
      }
      await this.writeJsonFile('master_backup_full.json', fullState);
      this.lastSyncTime = new Date().toLocaleTimeString();
      this.notifyStatus({ syncing: false, message: 'Sincronizado al 100% en el repositorio.' });
      return true;
    } catch (err) {
      console.error('[FileRepository] Error en exportAllToFolder:', err);
      this.notifyStatus({ syncing: false, error: 'Error durante la sincronización.' });
      return false;
    }
  }

  async loadAllFromFolder() {
    if (!this.isConnected) {
      return { success: false, error: 'No hay ningún repositorio conectado.' };
    }

    try {
      let campaigns = [];
      let characters = [];
      let btrsHistory = [];

      const loadedCampaigns = await this.readJsonFile('campaigns.json');
      if (Array.isArray(loadedCampaigns) && loadedCampaigns.length > 0) {
        campaigns = loadedCampaigns;
      }

      const loadedBtrs = await this.readJsonFile('btrs_history.json');
      if (Array.isArray(loadedBtrs)) {
        btrsHistory = loadedBtrs;
      }

      if (this.repoType === 'local') {
        try {
          const charsDir = await this.getLocalSubdirectory('characters', false);
          for await (const [name, handle] of charsDir.entries()) {
            if (handle.kind === 'file' && name.endsWith('.json')) {
              const charData = await this.readJsonFile(name, 'characters');
              if (charData && charData.id) characters.push(charData);
            }
          }
        } catch (e) {
          console.warn(e);
        }
      } else if (this.repoType === 'gdrive') {
        try {
          const q = `'${this.gdrive.charactersFolderId}' in parents and trashed = false`;
          const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`, {
            headers: { Authorization: `Bearer ${this.gdrive.token}` }
          });
          const data = await res.json();
          for (const file of data.files || []) {
            if (file.name.endsWith('.json')) {
              const charData = await this.readDriveJson(file.name, this.gdrive.charactersFolderId);
              if (charData && charData.id) characters.push(charData);
            }
          }
        } catch (e) {
          console.warn(e);
        }
      }

      if (characters.length === 0) {
        const snapshot = await this.readJsonFile('master_backup_full.json');
        if (snapshot && Array.isArray(snapshot.characters)) {
          characters = snapshot.characters;
        }
        if (campaigns.length === 0 && snapshot && Array.isArray(snapshot.campaigns)) {
          campaigns = snapshot.campaigns;
        }
      }

      this.lastSyncTime = new Date().toLocaleTimeString();
      return { success: true, campaigns, characters, btrsHistory };
    } catch (err) {
      console.error('[FileRepository] Error cargando repositorio:', err);
      return { success: false, error: err.message || 'Error al leer archivos del repositorio' };
    }
  }

  async disconnectFolder() {
    this.repoType = null;
    this.dirHandle = null;
    this.folderName = '';
    this.isConnected = false;
    this.lastSyncTime = null;
    this.gdrive.token = null;
    try {
      await idbDel(KEY_DIR_HANDLE);
      await idbDel(KEY_CONFIG);
    } catch (e) {
      console.warn(e);
    }
    this.notifyStatus({ isConnected: false, message: 'Repositorio desconectado.' });
  }
}

export const fileRepo = new FileRepositoryManager();
