/**
 * Módulo: Generador de Nombres por Especie para D&D 5.5 y Reinos Olvidados (Faerûn)
 * Genera nombres masculinos, femeninos, clanes, apellidos y títulos para las 10 especies oficiales.
 */

import { store } from '../state.js';
import { escapeHtml } from '../utils/formatters.js';

export const NAME_DATABASE = {
  humano: {
    name: 'Humano',
    icon: 'user',
    description: 'Nombres variados de las culturas humanas principales de Faerûn y la Costa de la Espada.',
    cultures: {
      chondathano: {
        name: 'Chondathano / Costa de la Espada',
        male: ['Aladar', 'Bram', 'Cassian', 'Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Keth', 'Lucian', 'Malar', 'Morn', 'Randal', 'Roderick', 'Stedd', 'Valen'],
        female: ['Adeline', 'Arveene', 'Brenda', 'Esvele', 'Jhessail', 'Kerri', 'Lureen', 'Miri', 'Rowan', 'Shandri', 'Tess', 'Vivienne', 'Yvelda'],
        surnames: ['Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Halcónbrumoso', 'Robledal', 'Castelar', 'Vientofrío', 'Cuervonegro', 'Monteclaro', 'Tallstag']
      },
      calishita: {
        name: 'Calishita (Sur de Faerûn)',
        male: ['Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir', 'Kareem', 'Tariq', 'Malik', 'Farid'],
        female: ['Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida', 'Soraya', 'Layla', 'Nabila'],
        surnames: ['Basha', 'Dumein', 'Jassan', 'Khalid', 'Mostana', 'Pashar', 'Al-Mansur', 'El-Zul', 'Qadir', 'Suleiman']
      },
      damarano: {
        name: 'Damarano (Norte y Tierras Frías)',
        male: ['Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef', 'Mival', 'Orel', 'Pavel', 'Sergor', 'Vasily', 'Yaroslav'],
        female: ['Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma', 'Tana', 'Zora', 'Svetlana', 'Mila', 'Katrina'],
        surnames: ['Bersk', 'Chernin', 'Dotsk', 'Kulenov', 'Marsk', 'Nemetsk', 'Shemov', 'Starag', 'Trofimov', 'Volkov']
      },
      general: {
        name: 'Común / General',
        male: ['Aladar', 'Arturo', 'Bram', 'Cassian', 'Donald', 'Edric', 'Gideon', 'Hector', 'Julian', 'Lucian', 'Marcus', 'Roderick', 'Roland', 'Tristán', 'Valen'],
        female: ['Adeline', 'Beatriz', 'Clara', 'Elena', 'Giselle', 'Isolda', 'Lyra', 'Miranda', 'Rowena', 'Selene', 'Valeria', 'Vivienne', 'Ysabel'],
        surnames: ['Halcónbrumoso', 'Robledal', 'Castelar', 'Vientofrío', 'Cuervonegro', 'Monteclaro', 'Bravocero', 'Rocafuerte', 'Puñohierro', 'Valverde']
      }
    }
  },
  elfo: {
    name: 'Elfo',
    icon: 'sparkles',
    description: 'Nombres líricos de Altos Elfos, Elfos de los Bosques y Drow de Faerûn.',
    male: [
      'Adran', 'Aelar', 'Aramil', 'Aranis', 'Aust', 'Beiro', 'Berrian', 'Carric', 'Elidor', 'Enialis',
      'Erdan', 'Faelar', 'Galan', 'Galean', 'Heian', 'Himo', 'Ivellios', 'Laucian', 'Mindartis', 'Paelias',
      'Peren', 'Quarion', 'Riardon', 'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Varis'
    ],
    female: [
      'Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna', 'Birel', 'Caelynn', 'Drusilia', 'Enna',
      'Felosial', 'Ielenia', 'Jelenneth', 'Keyleth', 'Leshanna', 'Lia', 'Meriele', 'Mialee', 'Naivara', 'Quelenna',
      'Quillathe', 'Sariel', 'Shanairra', 'Shava', 'Tia', 'Vadania', 'Valanthe', 'Xanaphia'
    ],
    surnames: [
      'Amakiir (Flor de Gema)', 'Amastacia (Flor de Estrella)', 'Galanodel (Susurro de Luna)', 'Holimion (Rocío de Diamante)',
      'Ilphelkiir (Brote de Flor)', 'Liadon (Hoja de Plata)', 'Meliamne (Talón de Roble)', 'Naïlo (Brisa de la Noche)',
      'Siannodel (Arroyo de Luna)', 'Xiloscient (Pétalo de Oro)', 'Caerdryl (Escudo Solar)', 'Moonwhisper', 'Starfall', 'Silverbow'
    ]
  },
  enano: {
    name: 'Enano',
    icon: 'hammer',
    description: 'Nombres ancestrales y clanes tradicionales de las ciudadelas y fortalezas enanas.',
    male: [
      'Adrik', 'Alberich', 'Baern', 'Barendd', 'Brottor', 'Bruenor', 'Dain', 'Darrak', 'Delg', 'Eberk',
      'Einkil', 'Fargrim', 'Flint', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Oskar', 'Rangrim',
      'Rurik', 'Taklinn', 'Thorin', 'Torgga', 'Traubon', 'Travok', 'Ulfgar', 'Veit', 'Vondal'
    ],
    female: [
      'Amber', 'Artin', 'Audhild', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth', 'Falkrunn', 'Finellen', 'Gunnloda',
      'Gurdis', 'Helja', 'Hlin', 'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn', 'Sannl',
      'Torbera', 'Torgga', 'Vistra'
    ],
    surnames: [
      'Balderk', 'Battlehammer', 'Dankil', 'Fireforge (Forjafuego)', 'Frostbeard (Barbapelar)', 'Gorunn',
      'Ironfist (Puñohierro)', 'Loderr', 'Lutgehr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart',
      'Martillofirme', 'Yunquedorado', 'Pico de Acero', 'Barbagrís'
    ]
  },
  mediano: {
    name: 'Mediano',
    icon: 'smile',
    description: 'Nombres alegres, hogareños y apellidos de clan campestre.',
    male: [
      'Alton', 'Ander', 'Cade', 'Corrin', 'Danniel', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal',
      'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby', 'Barlen', 'Tobías'
    ],
    female: [
      'Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda', 'Merla',
      'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna', 'Rosita', 'Bella'
    ],
    surnames: [
      'Buenbarril', 'Cazatejón', 'Colinaverde', 'Corretetazas', 'Hojatabaco', 'Piepincel', 'Ramaveloz',
      'Sotobosque', 'Zarzamora', 'Espinardiente', 'Manzanalta', 'Técaliente', 'Sopera'
    ]
  },
  gnomo: {
    name: 'Gnomo',
    icon: 'cog',
    description: 'Nombres ingeniosos de gnomos de las rocas y de los bosques, con sobrenombres y linajes de inventor.',
    male: [
      'Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon', 'Erky', 'Fonkin', 'Frug',
      'Gerbo', 'Gimble', 'Glim', 'Jebeddo', 'Kellen', 'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri',
      'Warryn', 'Wrenn', 'Zook'
    ],
    female: [
      'Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Ella', 'Ellyjobell', 'Ellywick', 'Lilli', 'Loopmottin',
      'Mardnab', 'Nissa', 'Nyx', 'Oda', 'Orla', 'Panana', 'Pyxiewick', 'Roywyn', 'Shamil', 'Tana',
      'Waywocket', 'Zanna'
    ],
    surnames: [
      'Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig', 'Ningel', 'Raulnor', 'Scheppen', 'Timbers', 'Turen',
      'Saltachispas', 'Destornillador', 'Engranaje', 'Botónflojo', 'Cazadientes', 'Manitas', 'Campanilla'
    ]
  },
  tiefling: {
    name: 'Tiefling',
    icon: 'flame',
    description: 'Nombres infernales tradicionales y nombres de Virtud o Idea adoptados por elección.',
    male: [
      'Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon', 'Leucis', 'Melech', 'Mordai',
      'Morthos', 'Pelaios', 'Skamos', 'Therai', 'Azael', 'Balthazar', 'Malakor', 'Sargath'
    ],
    female: [
      'Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea', 'Kallista', 'Lerissa', 'Makaria', 'Nemeia',
      'Orianna', 'Phelaia', 'Rieta', 'Lilith', 'Morrigan', 'Sarielle', 'Vespera'
    ],
    surnames: [
      'Arte', 'Audacia', 'Canto', 'Ceniza', 'Credo', 'Desespero', 'Destino', 'Devoción', 'Esperanza',
      'Éxtasis', 'Gloria', 'Humildad', 'Ideal', 'Música', 'Misterio', 'Odio', 'Penumbra', 'Razón',
      'Reverencia', 'Tormento', 'Verdad', 'Victoria'
    ]
  },
  draconido: {
    name: 'Dracónido',
    icon: 'shield',
    description: 'Nombres dracónicos con sonidos guturales y antiguos clanes de honor.',
    male: [
      'Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Iuzan', 'Kriv', 'Medrash', 'Mehen',
      'Nadarr', 'Pandjed', 'Patrin', 'Rhogar', 'Shamash', 'Shedinn', 'Tarhun', 'Torinn', 'Vaxildan', 'Zarkor'
    ],
    female: [
      'Akra', 'Biri', 'Daar', 'Farideh', 'Harann', 'Havilar', 'Jheri', 'Kava', 'Korinn', 'Mishann',
      'Nala', 'Perra', 'Raiann', 'Sora', 'Surina', 'Thava', 'Uadjit', 'Kallista', 'Pyria'
    ],
    surnames: [
      'Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion', 'Fenkenkabradon', 'Kepeshkmolik',
      'Kerrhylon', 'Kimbatuul', 'Linxakasendalor', 'Myastan', 'Nemmonis', 'Norixius', 'Ophinshtalajiir',
      'Prexijandilin', 'Shestendeliath', 'Turnuroth', 'Verthisathurgiesh', 'Yarjerit'
    ]
  },
  orco: {
    name: 'Orco',
    icon: 'swords',
    description: 'Nombres orcos de fuerza, orgullo guerrero y epítetos de batalla.',
    male: [
      'Brak', 'Dench', 'Durg', 'Feng', 'Gell', 'Grumm', 'Henk', 'Holg', 'Imsh', 'Keth',
      'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk', 'Ugarth', 'Varg', 'Gorbag', 'Krag'
    ],
    female: [
      'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Rasha', 'Shautha',
      'Sutha', 'Vola', 'Volen', 'Yevelda', 'Zora', 'Brena', 'Morka'
    ],
    surnames: [
      'Rompehuesos', 'Faucepálida', 'Cráneohendido', 'Furiaférrea', 'Ojotuerto', 'Colmillosangriento',
      'Garra del Trueno', 'Escudo Roto', 'Partelanzas', 'Aullasangre', 'Matagigantes'
    ]
  },
  goliat: {
    name: 'Goliat',
    icon: 'mountain',
    description: 'Nombres de nacimiento, apodos de proeza física y clanes de las altas cumbres.',
    male: [
      'Aukan', 'Eglath', 'Gae-Al', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori', 'Lo-Kag', 'Manneo', 'Maveith',
      'Nalko', 'Pethani', 'Thalai', 'Thotham', 'Uthemar', 'Vaunea', 'Vibol', 'Gorn', 'Torvak'
    ],
    female: [
      'Innil', 'Keo', 'Kuori', 'Lori', 'Manneo', 'Nalla', 'Orilo', 'Paavu', 'Pethani', 'Thalai',
      'Uthemar', 'Vaunea', 'Kethra', 'Valka', 'Surna'
    ],
    surnames: [
      'Cazador de Osos', 'Rompeglaciares', 'Portatormentas', 'Escalarrocas', 'Ojo de Águila',
      'Cazallobos', 'Diente de Trueno', 'Aliento de Escarcha', 'Pisarrocas',
      'Clan Anakalave', 'Clan Ogolakanu', 'Clan Kalagiano', 'Clan Thuliaga', 'Clan Vukanu'
    ]
  },
  aasimar: {
    name: 'Aasimar',
    icon: 'sun',
    description: 'Nombres celestiales imbuidos de gracia divina, luz y virtudes angélicas.',
    male: [
      'Auriel', 'Celéstian', 'Daniel', 'Gabriel', 'Hesperos', 'Ilion', 'Lucien', 'Malakh', 'Myriel',
      'Raphael', 'Seraph', 'Valiel', 'Zachariel', 'Uriel', 'Caelum', 'Lucian'
    ],
    female: [
      'Ariel', 'Callista', 'Divina', 'Elysia', 'Helia', 'Israfil', 'Leona', 'Mirela', 'Radiant',
      'Seraphina', 'Talia', 'Veritas', 'Zariel', 'Astraea', 'Lumina', 'Solaria'
    ],
    surnames: [
      'Portador de Luz', 'Canto del Alba', 'Miradadorada', 'Escudo Solar', 'Fulgor Celeste',
      'Ala de Plata', 'Voz del Céfiro', 'Aura Sagrada', 'Ojos de Estrella', 'Corona de Fuego'
    ]
  }
};

export class NameGeneratorModule {
  constructor(containerId = 'names-container') {
    this.container = typeof document !== 'undefined' ? document.getElementById(containerId) : null;
    this.selectedSpecies = 'humano';
    this.selectedGender = 'any'; // 'any' | 'male' | 'female' | 'surname_only'
    this.includeSurname = true;
    this.count = 10;
    this.generatedNames = [];
    this.favoriteNames = [];
    this.loadFavorites();
  }

  loadFavorites() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('rpg_favorite_names');
        if (saved) this.favoriteNames = JSON.parse(saved);
      }
    } catch (e) {}
  }

  saveFavorites() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('rpg_favorite_names', JSON.stringify(this.favoriteNames));
      }
    } catch (e) {}
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="row g-4">
        <!-- Columna Izquierda: Configuración del Generador -->
        <div class="col-12 col-lg-4">
          <div class="rpg-card p-3 p-md-4">
            <div class="border-bottom border-secondary pb-2 mb-3">
              <h3 class="h5 text-warning m-0 d-flex align-items-center gap-2">
                <i data-lucide="book-open"></i> Generador de Nombres
              </h3>
              <div class="text-secondary small mt-1">Nombres de D&amp;D 5.5 y Reinos Olvidados por Especie</div>
            </div>

            <form id="name-gen-form" class="d-flex flex-column gap-3">
              <!-- Selector de Especie -->
              <div>
                <label class="form-label text-warning small fw-bold">1. Especie (D&amp;D 5.5)</label>
                <select id="gen-species" class="form-select bg-dark border-secondary text-light">
                  ${Object.entries(NAME_DATABASE).map(([spKey, spData]) => `
                    <option value="${spKey}" ${spKey === this.selectedSpecies ? 'selected' : ''}>
                      ${spData.name}
                    </option>
                  `).join('')}
                </select>
                <div class="text-muted small mt-1" id="species-desc">
                  ${NAME_DATABASE[this.selectedSpecies]?.description || ''}
                </div>
              </div>

              <!-- Selector de Género / Categoría -->
              <div>
                <label class="form-label text-warning small fw-bold">2. Género / Categoría</label>
                <select id="gen-gender" class="form-select bg-dark border-secondary text-light">
                  <option value="any" ${this.selectedGender === 'any' ? 'selected' : ''}>🎲 Cualquier género (Masculino y Femenino)</option>
                  <option value="male" ${this.selectedGender === 'male' ? 'selected' : ''}>♂ Masculino</option>
                  <option value="female" ${this.selectedGender === 'female' ? 'selected' : ''}>♀ Femenino</option>
                  <option value="surname_only" ${this.selectedGender === 'surname_only' ? 'selected' : ''}>🛡️ Solo Clanes / Apellidos / Epítetos</option>
                </select>
              </div>

              <!-- Incluir Clan / Apellido -->
              <div class="form-check form-switch" id="wrap-include-surname">
                <input class="form-check-input" type="checkbox" id="gen-include-surname" ${this.includeSurname ? 'checked' : ''}>
                <label class="form-check-label text-light small" for="gen-include-surname">
                  Incluir Apellido / Clan / Epíteto
                </label>
              </div>

              <!-- Cantidad a Generar -->
              <div>
                <label class="form-label text-warning small fw-bold">3. Cantidad de Nombres</label>
                <div class="btn-group w-100" role="group">
                  ${[1, 5, 10, 20].map(n => `
                    <button type="button" class="btn btn-sm ${this.count === n ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-set-count" data-count="${n}">
                      ${n}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Botón Principal -->
              <button type="button" id="btn-generate-names" class="btn btn-warning text-dark fw-bold py-2 mt-2 d-flex align-items-center justify-content-center gap-2">
                <i data-lucide="sparkles"></i> Generar Nombres
              </button>
            </form>

            <!-- Sección de Favoritos -->
            ${this.favoriteNames.length > 0 ? `
              <div class="border-top border-secondary pt-3 mt-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="text-warning small fw-bold d-flex align-items-center gap-1">
                    <i data-lucide="star" class="text-warning" style="width: 14px; height: 14px;"></i> Favoritos (${this.favoriteNames.length})
                  </span>
                  <button id="btn-clear-favorites" class="btn btn-xs btn-outline-danger">Limpiar</button>
                </div>
                <div class="d-flex flex-wrap gap-1" style="max-height: 180px; overflow-y: auto;">
                  ${this.favoriteNames.map((fav, i) => `
                    <span class="badge bg-dark border border-secondary text-light p-1 d-flex align-items-center gap-1">
                      <span>${escapeHtml(fav)}</span>
                      <button class="btn btn-xs text-danger p-0 ms-1 btn-del-fav" data-fav-idx="${i}">&times;</button>
                    </span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Columna Derecha: Resultados Generados -->
        <div class="col-12 col-lg-8">
          <div class="rpg-card p-3 p-md-4">
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
              <h3 class="h5 text-warning m-0 d-flex align-items-center gap-2">
                <i data-lucide="list"></i> Nombres Generados (${this.generatedNames.length})
              </h3>
              ${this.generatedNames.length > 0 ? `
                <button id="btn-copy-all-names" class="btn btn-sm btn-outline-warning d-flex align-items-center gap-1">
                  <i data-lucide="copy"></i> Copiar Todos
                </button>
              ` : ''}
            </div>

            ${this.generatedNames.length === 0 ? `
              <div class="text-center py-5 text-secondary">
                <i data-lucide="book-open" style="width: 56px; height: 56px; opacity: 0.3;"></i>
                <h5 class="mt-3 text-secondary">Generador Listo</h5>
                <p class="small text-muted mb-0">Selecciona una especie y haz clic en "Generar Nombres" para inspirar a tus héroes o PNJs.</p>
              </div>
            ` : `
              <div class="row g-2">
                ${this.generatedNames.map((item, index) => `
                  <div class="col-12 col-md-6">
                    <div class="p-3 rounded bg-dark border border-secondary d-flex flex-column justify-content-between h-100">
                      <div>
                        <div class="d-flex justify-content-between align-items-start gap-1">
                          <span class="fs-5 fw-bold text-light">${escapeHtml(item.fullName)}</span>
                          <span class="badge ${item.gender === 'female' ? 'bg-danger text-light' : item.gender === 'male' ? 'bg-primary text-light' : 'bg-secondary'} small">
                            ${item.genderLabel}
                          </span>
                        </div>
                        <div class="text-secondary small mt-1">
                          <span class="badge bg-black border border-secondary text-warning">${escapeHtml(item.speciesName)}</span>
                          ${item.surname ? `<span class="ms-1 text-muted">(${escapeHtml(item.surname)})</span>` : ''}
                        </div>
                      </div>

                      <div class="d-flex gap-1 mt-3 pt-2 border-top border-secondary border-opacity-50">
                        <button class="btn btn-xs btn-outline-warning flex-fill btn-copy-name" data-name="${escapeHtml(item.fullName)}" title="Copiar nombre">
                          <i data-lucide="copy"></i> Copiar
                        </button>
                        <button class="btn btn-xs btn-outline-success flex-fill btn-use-wizard" data-name="${escapeHtml(item.fullName)}" title="Usar en Asistente de Creación">
                          <i data-lucide="user-check"></i> Al Asistente
                        </button>
                        <button class="btn btn-xs btn-outline-info btn-fav-name" data-name="${escapeHtml(item.fullName)}" title="Guardar en favoritos">
                          <i data-lucide="star"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    if (window.lucide) window.lucide.createIcons();
  }

  attachEventListeners() {
    if (!this.container) return;

    // Selector de especie
    this.container.querySelector('#gen-species')?.addEventListener('change', (e) => {
      this.selectedSpecies = e.target.value;
      const descEl = this.container.querySelector('#species-desc');
      if (descEl) descEl.textContent = NAME_DATABASE[this.selectedSpecies]?.description || '';
    });

    // Selector de género
    this.container.querySelector('#gen-gender')?.addEventListener('change', (e) => {
      this.selectedGender = e.target.value;
      const wrapSurname = this.container.querySelector('#wrap-include-surname');
      if (wrapSurname) {
        if (this.selectedGender === 'surname_only') {
          wrapSurname.classList.add('d-none');
        } else {
          wrapSurname.classList.remove('d-none');
        }
      }
    });

    // Checkbox de incluir apellido
    this.container.querySelector('#gen-include-surname')?.addEventListener('change', (e) => {
      this.includeSurname = e.target.checked;
    });

    // Botones de cantidad
    this.container.querySelectorAll('.btn-set-count').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.count = parseInt(e.currentTarget.dataset.count, 10) || 10;
        this.container.querySelectorAll('.btn-set-count').forEach(b => {
          b.classList.remove('btn-warning', 'text-dark', 'fw-bold');
          b.classList.add('btn-outline-secondary');
        });
        e.currentTarget.classList.remove('btn-outline-secondary');
        e.currentTarget.classList.add('btn-warning', 'text-dark', 'fw-bold');
      });
    });

    // Botón generar
    this.container.querySelector('#btn-generate-names')?.addEventListener('click', () => {
      this.generateNames();
    });

    // Copiar nombre individual
    this.container.querySelectorAll('.btn-copy-name').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.dataset.name;
        navigator.clipboard.writeText(name);
        store.showToast(`"${name}" copiado al portapapeles.`, 'success');
      });
    });

    // Usar en el Asistente de Creación
    this.container.querySelectorAll('.btn-use-wizard').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.dataset.name;
        // Cambiar nombre en el wizard y redirigir
        store.emit('wizard:set-character-name', { name, speciesId: this.selectedSpecies });
        store.showToast(`Nombre "${name}" cargado en el Asistente de Creación.`, 'info');
        const wizardTabBtn = document.getElementById('tab-wizard-btn');
        if (wizardTabBtn) wizardTabBtn.click();
      });
    });

    // Favoritos
    this.container.querySelectorAll('.btn-fav-name').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.dataset.name;
        if (!this.favoriteNames.includes(name)) {
          this.favoriteNames.push(name);
          this.saveFavorites();
          this.render();
          store.showToast(`"${name}" guardado en Favoritos.`, 'success');
        }
      });
    });

    this.container.querySelectorAll('.btn-del-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.favIdx, 10);
        this.favoriteNames.splice(idx, 1);
        this.saveFavorites();
        this.render();
      });
    });

    this.container.querySelector('#btn-clear-favorites')?.addEventListener('click', () => {
      this.favoriteNames = [];
      this.saveFavorites();
      this.render();
    });

    // Copiar todos
    this.container.querySelector('#btn-copy-all-names')?.addEventListener('click', () => {
      if (this.generatedNames.length === 0) return;
      const text = this.generatedNames.map(n => n.fullName).join('\n');
      navigator.clipboard.writeText(text);
      store.showToast('¡Todos los nombres copiados al portapapeles!', 'success');
    });
  }

  generateNames() {
    const spKey = this.selectedSpecies;
    const spData = NAME_DATABASE[spKey] || NAME_DATABASE.humano;
    const results = [];

    let malePool = [];
    let femalePool = [];
    let surnamePool = [];

    if (spKey === 'humano') {
      // Mezclar culturas humanas
      Object.values(spData.cultures).forEach(c => {
        malePool.push(...c.male);
        femalePool.push(...c.female);
        surnamePool.push(...c.surnames);
      });
    } else {
      malePool = spData.male || [];
      femalePool = spData.female || [];
      surnamePool = spData.surnames || [];
    }

    for (let i = 0; i < this.count; i++) {
      if (this.selectedGender === 'surname_only') {
        const sn = surnamePool[Math.floor(Math.random() * surnamePool.length)] || 'Desconocido';
        results.push({
          fullName: sn,
          speciesName: spData.name,
          gender: 'clan',
          genderLabel: 'Clan / Linaje',
          surname: null
        });
        continue;
      }

      // Determinar género para esta fila
      let g = this.selectedGender;
      if (g === 'any') {
        g = Math.random() < 0.5 ? 'male' : 'female';
      }

      const pool = g === 'male' ? malePool : femalePool;
      const firstName = pool[Math.floor(Math.random() * pool.length)] || 'Héroe';
      let fullName = firstName;
      let surname = null;

      if (this.includeSurname && surnamePool.length > 0) {
        surname = surnamePool[Math.floor(Math.random() * surnamePool.length)];
        fullName = `${firstName} ${surname}`;
      }

      results.push({
        fullName,
        firstName,
        surname,
        speciesName: spData.name,
        gender: g,
        genderLabel: g === 'male' ? 'Masculino' : 'Femenino'
      });
    }

    this.generatedNames = results;
    this.render();
  }
}
