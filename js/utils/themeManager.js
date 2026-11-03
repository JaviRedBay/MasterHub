/**
 * Gestor del estilo visual (tema).
 *
 *  - Aplica un tema escribiendo data-theme y data-bs-theme en <html>.
 *  - Recuerda la preferencia en localStorage (y la admite por URL: ?theme=ciberpunk).
 *  - Soporta la preferencia "auto", que sigue el modo claro/oscuro del sistema.
 *  - Carga bajo demanda las tipografías propias de cada tema.
 *  - Genera el menú selector de la barra superior a partir del registro de temas.
 *
 * Uso desde otros módulos o desde la consola del navegador:
 *   import { themeManager } from './utils/themeManager.js';
 *   themeManager.setTheme('medieval');
 *   window.RPGTheme.setTheme('futurista');
 */

import {
  THEMES,
  THEME_STORAGE_KEY,
  THEME_APPLIED_KEY,
  DEFAULT_THEME_ID,
  AUTO_THEME_ID,
  AUTO_THEME_MAP,
  getThemeById
} from '../constants/themes.js';

/** Evento disparado en document cada vez que cambia el tema efectivo. */
export const THEME_CHANGE_EVENT = 'rpg:themechange';

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (_) {
    // Almacenamiento no disponible (modo privado, cuota...): el tema sigue funcionando en la sesión.
  }
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

class ThemeManager {
  constructor() {
    /** Preferencia del usuario: 'auto' o el id de un tema. */
    this.preference = DEFAULT_THEME_ID;
    /** Tema realmente aplicado (resuelve 'auto'). */
    this.activeTheme = getThemeById(DEFAULT_THEME_ID);
    this._listeners = new Set();
    this._lightQuery = null;
    this._menu = null;
  }

  /**
   * Inicializa el gestor: lee la preferencia, la aplica y monta el selector.
   * Debe llamarse una sola vez al arrancar la aplicación.
   */
  init() {
    const fromUrl = new URLSearchParams(window.location.search).get('theme');
    const stored = readStorage(THEME_STORAGE_KEY);

    if (fromUrl && this.isValidPreference(fromUrl)) {
      this.preference = fromUrl;
      writeStorage(THEME_STORAGE_KEY, fromUrl);
    } else if (stored && this.isValidPreference(stored)) {
      this.preference = stored;
    }

    // Si el sistema cambia de modo claro/oscuro y estamos en "auto", reaccionamos en vivo.
    this._lightQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
    if (this._lightQuery) {
      const onSystemChange = () => {
        if (this.preference === AUTO_THEME_ID) this._apply();
      };
      if (this._lightQuery.addEventListener) {
        this._lightQuery.addEventListener('change', onSystemChange);
      } else if (this._lightQuery.addListener) {
        this._lightQuery.addListener(onSystemChange);
      }
    }

    this._apply();
    this.mountSelector();
  }

  /** @returns {import('../constants/themes.js').ThemeDefinition[]} */
  listThemes() {
    return THEMES.slice();
  }

  /** @returns {string} 'auto' o el id elegido. */
  getPreference() {
    return this.preference;
  }

  /** @returns {import('../constants/themes.js').ThemeDefinition} Tema efectivo (nunca 'auto'). */
  getActiveTheme() {
    return this.activeTheme;
  }

  isValidPreference(id) {
    return id === AUTO_THEME_ID || Boolean(getThemeById(id));
  }

  /**
   * Cambia el estilo visual y lo recuerda.
   * @param {string} id  'auto' o el id de un tema registrado.
   * @returns {boolean} false si el id no existe.
   */
  setTheme(id) {
    if (!this.isValidPreference(id)) {
      console.warn(`[Theme] Tema desconocido: "${id}". Disponibles: ${[AUTO_THEME_ID, ...THEMES.map(t => t.id)].join(', ')}`);
      return false;
    }
    this.preference = id;
    writeStorage(THEME_STORAGE_KEY, id);
    this._apply();
    return true;
  }

  /**
   * Suscribe un callback a los cambios de tema.
   * @param {(theme: import('../constants/themes.js').ThemeDefinition, preference: string) => void} callback
   * @returns {() => void} Función para cancelar la suscripción.
   */
  onChange(callback) {
    this._listeners.add(callback);
    return () => this._listeners.delete(callback);
  }

  /** Resuelve la preferencia ('auto' → claro/oscuro según el sistema). */
  _resolveTheme() {
    if (this.preference === AUTO_THEME_ID) {
      const systemIsLight = Boolean(this._lightQuery && this._lightQuery.matches);
      return getThemeById(AUTO_THEME_MAP[systemIsLight ? 'light' : 'dark']) || getThemeById(DEFAULT_THEME_ID);
    }
    return getThemeById(this.preference) || getThemeById(DEFAULT_THEME_ID);
  }

  _apply() {
    const theme = this._resolveTheme();
    const root = document.documentElement;

    this.activeTheme = theme;
    this._ensureFonts(theme);
    root.setAttribute('data-theme', theme.id);
    root.setAttribute('data-bs-theme', theme.mode);
    writeStorage(THEME_APPLIED_KEY, `${theme.id}|${theme.mode}`);

    this._syncBrowserChrome();
    this._refreshSelector();

    document.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme, preference: this.preference } }));
    this._listeners.forEach(callback => {
      try {
        callback(theme, this.preference);
      } catch (error) {
        console.error('[Theme] Error en un suscriptor de cambio de tema:', error);
      }
    });
  }

  /** Inserta (una sola vez) la hoja de Google Fonts propia del tema. */
  _ensureFonts(theme) {
    if (!theme.fontsUrl) return;
    const linkId = `theme-fonts-${theme.id}`;
    if (document.getElementById(linkId)) return;
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = theme.fontsUrl;
    document.head.appendChild(link);
  }

  /** Alinea el color de la barra del navegador móvil con el fondo del tema (leído del CSS real). */
  _syncBrowserChrome() {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    const background = getComputedStyle(document.documentElement).getPropertyValue('--rpg-dark-bg').trim();
    if (background) meta.content = background;
  }

  /** Genera el contenido del menú desplegable de estilos (#theme-menu). */
  mountSelector() {
    const menu = document.getElementById('theme-menu');
    if (!menu) return;
    this._menu = menu;

    const autoLight = AUTO_THEME_MAP.light;
    const autoDark = AUTO_THEME_MAP.dark;

    const autoItem = `
      <li>
        <button type="button" class="dropdown-item rpg-theme-item" data-theme-choice="${AUTO_THEME_ID}">
          <span class="rpg-theme-swatch rpg-theme-swatch--auto" aria-hidden="true">
            <i data-theme="${escapeAttr(autoLight)}"></i><i data-theme="${escapeAttr(autoDark)}"></i>
          </span>
          <span>
            <span class="rpg-theme-item-name">Automático</span>
            <span class="rpg-theme-item-desc">Sigue el modo claro u oscuro de tu sistema</span>
          </span>
          <span class="rpg-theme-check" aria-hidden="true">✓</span>
        </button>
      </li>`;

    const themeItems = THEMES.map(theme => `
      <li>
        <button type="button" class="dropdown-item rpg-theme-item" data-theme-choice="${escapeAttr(theme.id)}">
          <span class="rpg-theme-swatch" data-theme="${escapeAttr(theme.id)}" aria-hidden="true"></span>
          <span>
            <span class="rpg-theme-item-name">${escapeAttr(theme.name)}</span>
            <span class="rpg-theme-item-desc">${escapeAttr(theme.description)}</span>
          </span>
          <span class="rpg-theme-check" aria-hidden="true">✓</span>
        </button>
      </li>`).join('');

    menu.innerHTML = `<li><h6 class="rpg-theme-menu-title">Estilo visual</h6></li>${autoItem}${themeItems}`;

    menu.addEventListener('click', event => {
      const item = event.target.closest('[data-theme-choice]');
      if (!item) return;
      this.setTheme(item.dataset.themeChoice);
    });

    this._refreshSelector();
  }

  /** Marca la opción activa y actualiza la etiqueta del botón. */
  _refreshSelector() {
    if (!this._menu) return;

    this._menu.querySelectorAll('[data-theme-choice]').forEach(item => {
      const isCurrent = item.dataset.themeChoice === this.preference;
      item.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });

    const label = document.getElementById('theme-current-name');
    if (label) {
      label.textContent = this.preference === AUTO_THEME_ID
        ? `Automático · ${this.activeTheme.name}`
        : this.activeTheme.name;
    }
  }
}

export const themeManager = new ThemeManager();

// Acceso cómodo desde la consola: RPGTheme.setTheme('ciberpunk')
if (typeof window !== 'undefined') {
  window.RPGTheme = themeManager;
}

