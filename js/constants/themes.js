/**
 * Registro de estilos visuales (temas) de la aplicación.
 *
 * Para AÑADIR un tema nuevo:
 *   1. Crea css/themes/<id>.css  (copia css/themes/_plantilla.css)
 *   2. Enlázalo en index.html después de fantasia-oscura.css
 *   3. Añade aquí una entrada con el mismo <id>
 * El menú "Estilo" de la barra superior se genera a partir de esta lista.
 *
 * Los colores NO se declaran aquí: viven solo en el CSS del tema. Las muestras
 * del menú se pintan con data-theme, así que siempre reflejan la paleta real.
 */

/** Clave de localStorage con la preferencia elegida por el usuario ('auto' o un id). */
export const THEME_STORAGE_KEY = 'rpg-hub-theme';

/**
 * Clave de localStorage con el último tema ya resuelto ("id|modo").
 * La lee el script inline de index.html para pintar el tema antes de que cargue
 * el CSS y evitar el parpadeo del tema por defecto.
 */
export const THEME_APPLIED_KEY = 'rpg-hub-theme-applied';

export const DEFAULT_THEME_ID = 'fantasia-oscura';

/** Preferencia especial: sigue el modo claro/oscuro del sistema operativo. */
export const AUTO_THEME_ID = 'auto';

/** Temas que usa la preferencia "auto" según el modo del sistema. */
export const AUTO_THEME_MAP = Object.freeze({ light: 'claro', dark: 'oscuro' });

/**
 * @typedef {Object} ThemeDefinition
 * @property {string} id           Identificador; coincide con data-theme y el nombre del .css
 * @property {string} name         Nombre visible
 * @property {string} description  Descripción corta para el menú
 * @property {'light'|'dark'} mode Modo base: controla data-bs-theme de Bootstrap y color-scheme
 * @property {string} [fontsUrl]   Hoja de Google Fonts a cargar bajo demanda (si usa tipografías propias)
 */

/** @type {ThemeDefinition[]} */
export const THEMES = [
  {
    id: 'fantasia-oscura',
    name: 'Fantasía Oscura',
    description: 'Carmesí dragón y oro bruñido sobre obsidiana (por defecto)',
    mode: 'dark'
  },
  {
    id: 'oscuro',
    name: 'Oscuro',
    description: 'Pizarra neutra y sobria, acento azul',
    mode: 'dark'
  },
  {
    id: 'claro',
    name: 'Claro',
    description: 'Interfaz limpia sobre blanco, acento índigo',
    mode: 'light'
  },
  {
    id: 'alto-contraste',
    name: 'Alto Contraste',
    description: 'Negro, blanco y amarillo; bordes gruesos y texto mayor',
    mode: 'dark'
  },
  {
    id: 'medieval',
    name: 'Fantasía Medieval',
    description: 'Pergamino envejecido, tinta y rojo heráldico',
    mode: 'light',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=MedievalSharp&display=swap'
  },
  {
    id: 'futurista',
    name: 'Futurista',
    description: 'Azul espacial, cian glacial y rejilla holográfica',
    mode: 'dark',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&family=Orbitron:wght@500;700;900&display=swap'
  },
  {
    id: 'ciberpunk',
    name: 'Ciberpunk',
    description: 'Neón magenta y cian sobre negro, líneas de barrido',
    mode: 'dark',
    fontsUrl: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap'
  }
];

/**
 * @param {string} id
 * @returns {ThemeDefinition|undefined}
 */
export function getThemeById(id) {
  return THEMES.find(theme => theme.id === id);
}

