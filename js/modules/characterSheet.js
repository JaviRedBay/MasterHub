/**
 * Módulo: Hoja de Personaje Oficial D&D 5.5 e Imprimible (A4 / PDF)
 * Gestión integral de combate, características dinámicas, habilidades, 
 * inventario interactivo con equipamiento exclusivo de armadura, cálculo
 * de CA dinámico, ataques automáticos, dotes, dones y bendiciones divinas con modificadores activos.
 */

import { store } from '../state.js';
import { 
  calculateArmorClass, 
  calculateHitPoints, 
  calculateInitiative, 
  calculateSpeed,
  calculateSavingThrows, 
  calculateSkills,
  calculateCarryingCapacity,
  calculateSpellcasting,
  getCharacterSpellSlots,
  calculateFinalAbilityScores,
  calculateAbilityScoresBreakdown,
  getAbilityModifier,
  getAbilityShortName,
  getAbilityFullName,
  getActiveStatModifiers,
  DND55_CLASSES,
  DND55_SPECIES,
  DND55_BACKGROUNDS,
  DND55_SKILLS,
  DND55_ARMORS,
  DND55_WEAPONS,
  DND55_PRESET_ITEMS,
  DND55_SAMPLE_SPECIAL_ABILITIES,
  findCanonicalWeapon,
  getProficiencyBonus,
  getMaxAllowedExpertiseCount,
  formatModifier,
  getSpeciesName,
  getSublineageName,
  getBackgroundName,
  getClassName,
  getSubclassName,
  getCharacterFullClassTitle,
  getCharacterHitDicePool,
  getCharacterClasses,
  getClassLevel,
  getArmorName,
  getWeaponName,
  getFeatName,
  getFeatById,
  getResolvedFeatsForCharacter,
  getResolvedCharacterFeatures,
  getCharacterProficiencies,
  calculatePassivePerception,
  calculatePassivePerceptionDetails,
  calculatePassiveInvestigationDetails,
  calculatePassiveInsightDetails,
  getCharacterVisionSense,
  DND55_STANDARD_LANGUAGES,
  DND55_TOOL_PROFICIENCIES,
  getBackgroundToolGroups,
  DND55_CANONICAL_SPELLS,
  DND55_SCROLL_LEVEL_STATS,
  DND55_ARTIFACT_PROPERTIES,
  characterHasFeat,
  characterQualifiesForFightingStyle,
  getInnateSpellsForCharacter,
  getSpellAttackInfo
} from '../constants/dnd55Rules.js';
import { escapeHtml, formatWeight, repairMojibake } from '../utils/formatters.js';
import { downloadFilledDndPdf, createFilledDndPdfBlobUrl } from '../utils/pdfExport.js';
import { showToast, showConfirmModal } from '../utils/uiFeedback.js';
import { rollDie } from '../utils/dice.js';

export class CharacterSheetModule {
  constructor(containerId = 'sheet-container') {
    this.container = document.getElementById(containerId);
    this.viewMode = 'interactive'; // 'interactive' | 'printable'
    this.printSubMode = 'pdf'; // 'pdf' | 'html'
    this.activeLowerFilter = 'all'; // 'all' | 'features' | 'inventory' | 'spells' | 'languages-tools'
    this.pdfBlobUrl = null;
    this.currentCatalogItemModifiers = [];
    this.currentCatalogBaseName = '';
    this.hasUserEditedItemName = false;
    this.keepHpModalOpen = false;
    this.initListeners();
  }

  isProtectedTool(toolName, char) {
    if (!toolName || !char) return false;
    const norm = (s) => String(s || '').toLowerCase().trim();
    const tNorm = norm(toolName);

    // 1. Herramientas de clase fijas y elegidas
    const charClasses = getCharacterClasses(char);
    for (const c of charClasses) {
      const cDef = DND55_CLASSES.find(cd => cd.id === c.classId);
      if (cDef?.toolProficiencies?.some(p => norm(p) === tNorm)) return true;
    }
    if (Array.isArray(char.classTools) && char.classTools.some(p => norm(p) === tNorm)) {
      return true;
    }
    // Casos específicos canónicos de clase
    if (getClassLevel(char, 'picaro') >= 1 && tNorm.includes('ladr')) return true;
    if (getClassLevel(char, 'druida') >= 1 && tNorm.includes('herbol')) return true;

    // 2. Herramientas de trasfondo (fijas o elegidas)
    const bgDef = char.customBackground || DND55_BACKGROUNDS.find(b => b.id === char.backgroundId);
    if (char.customBackground?.tool && norm(char.customBackground.tool) === tNorm) return true;
    if (Array.isArray(char.customBackground?.toolProficiencies) && char.customBackground.toolProficiencies.some(p => norm(p) === tNorm)) {
      return true;
    }
    if (bgDef) {
      if (typeof getBackgroundToolGroups === 'function') {
        const groups = getBackgroundToolGroups(bgDef);
        for (const g of groups) {
          if (norm(g.entry) === tNorm) return true;
          if (Array.isArray(g.options) && g.options.some(o => norm(o) === tNorm)) return true;
        }
      }
      if (Array.isArray(bgDef.toolProficiencies) && bgDef.toolProficiencies.some(p => norm(p) === tNorm)) {
        return true;
      }
    }

    return false;
  }

  renderFeatureDesc(desc, dc, dcFormula) {
    if (!desc) return '';
    let text = escapeHtml(desc);
    if (dc && dcFormula) {
      const escFormula = escapeHtml(dcFormula);
      const regex = new RegExp(`\\bCD\\s*${dc}\\b`, 'g');
      text = text.replace(regex, `<strong class="text-warning" style="text-decoration: underline dotted var(--rpg-gold); cursor: help;" title="${escFormula}">CD ${dc}</strong>`);
    }
    return text;
  }

  initListeners() {
    store.on('character:selected', () => this.render());
    store.on('characters:updated', () => this.render());
    store.on('campaign:selected', () => this.render());
    store.on('character:hp-changed', () => this.render());
    store.on('character:spellslot-changed', () => this.render());
  }

  render() {
    if (!this.container) return;

    const campId = store.getSelectedCampaignId();
    const campaignCharacters = store.getCharactersByCampaign(campId);
    let char = store.getSelectedCharacter();

    // Requisito 3: Los personajes disponibles deben ser únicamente los correspondientes a la campaña seleccionada
    if (char && char.campaignId !== campId) {
      char = campaignCharacters[0] || null;
      if (char) {
        store.setSelectedCharacterId(char.id);
      }
    } else if (!char && campaignCharacters.length > 0) {
      char = campaignCharacters[0];
      store.setSelectedCharacterId(char.id);
    }

    if (!char) {
      this.container.innerHTML = `
        <div class="alert alert-dark border-secondary text-center p-5 my-4">
          <h4 class="text-warning">No hay ningún personaje en esta campaña</h4>
          <p class="text-secondary">Crea un héroe en el Asistente guiado o selecciona una campaña que contenga personajes.</p>
          <button id="btn-empty-sheet-create" class="btn btn-outline-warning mt-2">
            <i data-lucide="user-plus"></i> Ir al Asistente de Creación
          </button>
        </div>
      `;
      this.container.querySelector('#btn-empty-sheet-create')?.addEventListener('click', () => {
        store.emit('wizard:new-character', { campaignId: store.getSelectedCampaignId() });
        const wizardTabBtn = document.getElementById('tab-wizard-btn');
        if (wizardTabBtn) wizardTabBtn.click();
      });
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Asegurar sincronización inicial entre char.armorId, char.hasShield, char.equippedWeapons y char.inventory
    this.ensureInventoryIntegrity(char);

    if (this.viewMode === 'printable') {
      this.renderPrintableSheet(char, campaignCharacters);
      return;
    }

    this.renderInteractiveSheet(char, campaignCharacters);
    this.attachEventListeners(char);
    this.applyLowerSectionFilter(this.activeLowerFilter || 'all');
    if (window.lucide) window.lucide.createIcons();
    if (this.keepHpModalOpen) {
      const hpDialog = this.container.querySelector('#modal-sheet-hp-levels');
      if (hpDialog && !hpDialog.open) {
        hpDialog.showModal();
      }
    }
  }

  /**
   * Garantiza que el inventario contenga objetos consistentes para armadura, escudo y armas equipadas.
   */
  ensureInventoryIntegrity(char) {
    let modified = false;
    if (!Array.isArray(char.inventory)) {
      char.inventory = [];
      modified = true;
    }
    if (!Array.isArray(char.specialAbilities)) {
      char.specialAbilities = [];
      modified = true;
    }
    if (!Array.isArray(char.equippedWeapons)) {
      char.equippedWeapons = [];
      modified = true;
    }

    // Limpieza de Estilos de Combate si la clase o dotes no le dan derecho
    if ((char.fightingStyle || (Array.isArray(char.fightingStyles) && char.fightingStyles.length > 0)) && !characterQualifiesForFightingStyle(char)) {
      delete char.fightingStyle;
      delete char.fightingStyles;
      delete char.fightingStylesBySlot;
      modified = true;
    }

    // Si tiene armorId pero no está en inventario, añadirla
    if (char.armorId && char.armorId !== 'sin_armadura' && char.armorId !== 'none') {
      const hasArmorInInv = char.inventory.some(i => i.id === char.armorId || i.armorType === char.armorId);
      if (!hasArmorInInv) {
        const armorDef = DND55_ARMORS.find(a => a.id === char.armorId);
        if (armorDef) {
          char.inventory.push({
            id: armorDef.id,
            name: armorDef.name,
            quantity: 1,
            weight: armorDef.weight,
            category: 'armadura',
            armorType: armorDef.id,
            baseAc: armorDef.baseAc,
            maxDexBonus: armorDef.maxDexBonus,
            isEquipped: true,
            requiresAttunement: false,
            isAttuned: false
          });
          modified = true;
        }
      }
    }

    // Si tiene escudo pero no está en inventario
    if (char.hasShield) {
      const hasShieldInInv = char.inventory.some(i => i.id === 'escudo' || i.armorType === 'escudo' || i.name.toLowerCase().includes('escudo'));
      if (!hasShieldInInv) {
        char.inventory.push({
          id: 'escudo',
          name: 'Escudo (+2 CA)',
          quantity: 1,
          weight: 3,
          category: 'escudo',
          armorType: 'escudo',
          baseAc: 2,
          isEquipped: true,
          requiresAttunement: false,
          isAttuned: false
        });
        modified = true;
      }
    }

    // Armas equipadas aseguradas en inventario
    if (char.equippedWeapons && char.equippedWeapons.length > 0) {
      char.equippedWeapons.forEach(wId => {
        const hasWeaponInInv = char.inventory.some(i => i.id === wId || i.weaponType === wId);
        if (!hasWeaponInInv) {
          const wDef = DND55_WEAPONS.find(w => w.id === wId);
          if (wDef) {
            char.inventory.push({
              id: wDef.id,
              name: wDef.name,
              quantity: 1,
              weight: wDef.weight,
              category: 'arma',
              weaponType: wDef.id,
              damage: wDef.damage,
              damageType: wDef.damageType,
              masteryProperty: wDef.masteryProperty,
              isEquipped: true,
              requiresAttunement: false,
              isAttuned: false
            });
            modified = true;
          }
        }
      });
    }

    // Auto-reparar mojibake residual en inventario
    char.inventory.forEach(item => {
      if (item.name) {
        const fixed = repairMojibake(item.name);
        if (fixed !== item.name) { item.name = fixed; modified = true; }
      }
      if (item.description) {
        const fixed = repairMojibake(item.description);
        if (fixed !== item.description) { item.description = fixed; modified = true; }
      }
      if (item.specialAction) {
        const fixed = repairMojibake(item.specialAction);
        if (fixed !== item.specialAction) { item.specialAction = fixed; modified = true; }
      }
    });

    // Auto-reparar mojibake residual en conjuros
    if (Array.isArray(char.spells)) {
      char.spells.forEach(sp => {
        if (typeof sp === 'object' && sp !== null) {
          if (sp.name) {
            const fixed = repairMojibake(sp.name);
            if (fixed !== sp.name) { sp.name = fixed; modified = true; }
          }
          if (sp.description) {
            const fixed = repairMojibake(sp.description);
            if (fixed !== sp.description) { sp.description = fixed; modified = true; }
          }
          if (sp.school) {
            const fixed = repairMojibake(sp.school);
            if (fixed !== sp.school) { sp.school = fixed; modified = true; }
          }
        }
      });
    } else {
      char.spells = [];
      modified = true;
    }

    // Auto-poblar conjuros innatos concedidos por especie o trasfondo (D&D 5.5)
    const innateSpells = getInnateSpellsForCharacter(char);
    if (innateSpells.length > 0) {
      innateSpells.forEach(innate => {
        const alreadyHas = char.spells.some(sp => {
          const sName = typeof sp === 'string' ? sp : (sp.name || sp.id || '');
          const sId = typeof sp === 'object' && sp !== null ? sp.id : '';
          return sName.toLowerCase().trim() === innate.name.toLowerCase().trim() ||
                 (innate.id && sId && sId.toLowerCase().trim() === innate.id.toLowerCase().trim());
        });
        if (!alreadyHas) {
          char.spells.push({
            ...innate,
            isPrepared: true,
            isInnate: true
          });
          modified = true;
        }
      });
    }

    // Auto-reparar mojibake residual en rasgos y bendiciones
    if (Array.isArray(char.specialAbilities)) {
      char.specialAbilities.forEach(ab => {
        if (ab.name) {
          const fixed = repairMojibake(ab.name);
          if (fixed !== ab.name) { ab.name = fixed; modified = true; }
        }
        if (ab.description) {
          const fixed = repairMojibake(ab.description);
          if (fixed !== ab.description) { ab.description = fixed; modified = true; }
        }
        if (ab.source) {
          const fixed = repairMojibake(ab.source);
          if (fixed !== ab.source) { ab.source = fixed; modified = true; }
        }
      });
    }

    if (modified) {
      store.saveCharacter(char);
    }
  }

  renderInteractiveSheet(char, campaignChars) {
    const acInfo = calculateArmorClass(char);
    const hpInfo = calculateHitPoints(char);
    const initInfo = calculateInitiative(char);
    const speedInfo = calculateSpeed(char);
    const scores = calculateFinalAbilityScores(char);
    const abilityBreakdown = calculateAbilityScoresBreakdown(char);
    const saves = calculateSavingThrows(char);
    const skills = calculateSkills(char);
    const carry = calculateCarryingCapacity(char);
    const spellInfo = calculateSpellcasting(char);
    const spellSlots = getCharacterSpellSlots(char, char.spellSlotsState);
    const pb = getProficiencyBonus(char.level);
    const resolvedFeats = getResolvedFeatsForCharacter(char);
    const resolvedFeatures = getResolvedCharacterFeatures(char);
    const proficiencies = getCharacterProficiencies(char);
    const passPerc = calculatePassivePerceptionDetails(char);
    const passInv = calculatePassiveInvestigationDetails(char);
    const passIns = calculatePassiveInsightDetails(char);

    // Especie, Linaje y Tamaño
    const speciesDef = DND55_SPECIES.find(s => s.id === char.speciesId);
    const charSize = speciesDef?.size || 'Mediano';
    const visionSense = getCharacterVisionSense(char);

    // Clase y Dados de Golpe
    const classDef = DND55_CLASSES.find(c => c.id === char.classId);
    const hitDie = classDef?.hitDie || 8;
    const hdPool = getCharacterHitDicePool(char);
    const totalHd = hdPool.totalHd || char.level;
    const spentHd = hdPool.spentHd;
    const availableHd = hdPool.availableHd;

    // Salvaciones de Muerte
    if (!char.deathSaves) char.deathSaves = { successes: 0, failures: 0 };
    const deathSaves = char.deathSaves;

    // Monedas y Riqueza
    if (!char.currency) {
      char.currency = { cp: 0, sp: 0, ep: 0, gp: char.gp !== undefined ? Number(char.gp) : 50, pp: 0 };
    }
    const currency = char.currency;

    // Idiomas y herramientas
    const languages = Array.isArray(char.languages) && char.languages.length > 0 ? char.languages : ['Común'];
    const tools = Array.isArray(char.tools) ? char.tools : (proficiencies.toolProficiencies || []);

    // Aspecto Físico
    const app = char.appearance || {
      age: char.age || '',
      height: char.height || '',
      weight: char.weight || '',
      eyes: char.eyes || '',
      skin: char.skin || '',
      hair: char.hair || '',
      gender: char.gender || '',
      description: char.description || char.appearanceNotes || ''
    };

    // Historia y Personalidad
    const pers = char.personality || {
      traits: char.personalityTraits || '',
      ideals: char.ideals || '',
      bonds: char.bonds || '',
      flaws: char.flaws || ''
    };
    const backstory = char.backstory || '';
    const allies = char.allies || '';

    // Nombres legibles oficiales
    const speciesName = getSpeciesName(char.speciesId);
    const sublineageName = getSublineageName(char.speciesId, char.sublineageId);
    const fullSpecies = sublineageName ? `${speciesName} (${sublineageName})` : speciesName;
    const backgroundName = getBackgroundName(char);
    const className = getClassName(char.classId);
    const subclassName = getSubclassName(char.subclassId);
    const fullClass = getCharacterFullClassTitle(char);
    const charClasses = getCharacterClasses(char);
    const isMulticlass = charClasses && charClasses.length > 1;
    const classDisplayTitle = isMulticlass
      ? fullClass
      : (subclassName ? `${className} (${subclassName})` : className);

    // Sintonización mágica
    const attunedItems = (char.inventory || []).filter(i => i.requiresAttunement && i.isAttuned);

    // Lista consolidada de armas equipadas para la tabla de ataques
    const equippedWeaponsList = this.getEquippedWeapons(char);

    // ¿Tiene aptitud mágica / conjuros?
    const isSpellcastingClass = Boolean(classDef?.spellcasterType || classDef?.spellcastingAbility);
    const innateSpells = getInnateSpellsForCharacter(char);
    const hasSpells = !!(spellInfo || isSpellcastingClass || spellSlots.length > 0 || (char.spells && char.spells.length > 0) || innateSpells.length > 0);
    if (this.activeLowerFilter === 'spells' && !hasSpells) {
      this.activeLowerFilter = 'all';
    }

    const isAll = !this.activeLowerFilter || this.activeLowerFilter === 'all';
    const isBio = this.activeLowerFilter === 'bio';
    const isFeatures = this.activeLowerFilter === 'features';
    const isInventory = this.activeLowerFilter === 'inventory';
    const isSpells = this.activeLowerFilter === 'spells';
    const isBalancedTwoCols = isAll || isBio;

    this.container.innerHTML = `
      <!-- Barra Superior de Control de la Hoja -->
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 p-3 rounded rpg-card">
        <div class="d-flex align-items-center gap-2">
          <span class="text-secondary small fw-bold">Personaje de Campaña:</span>
          <select id="sheet-char-select" class="form-select form-select-sm bg-dark border-secondary text-warning fw-bold" style="max-width: 280px;">
            ${campaignChars.map(c => `
              <option value="${c.id}" ${c.id === char.id ? 'selected' : ''}>
                ${escapeHtml(c.name)} (${getCharacterFullClassTitle(c)} nv${c.level})
              </option>
            `).join('')}
          </select>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <button id="btn-toggle-print-mode" class="btn btn-sm btn-outline-light d-flex align-items-center gap-1">
            <i data-lucide="printer"></i> Vista Imprimible A4
          </button>
          <button id="btn-edit-in-wizard" class="btn btn-sm btn-outline-warning d-flex align-items-center gap-1">
            <i data-lucide="edit"></i> Editar en Asistente
          </button>
          <button id="btn-repair-char-encoding" class="btn btn-sm btn-outline-info d-flex align-items-center gap-1" title="Reparar caracteres, tildes y eñes en este personaje">
            <i data-lucide="sparkles"></i> Reparar Tildes/Ñ
          </button>
        </div>
      </div>

      <!-- Ficha Interactiva Principal (Estilo Pergamino TTRPG) -->
      <div class="rpg-card-parchment p-3 p-md-4 mb-3">
        <!-- Encabezado de Identidad -->
        <div class="row g-2 mb-3 border-bottom pb-3 align-items-center" style="border-color: var(--rpg-line) !important;">
          <div class="col-md-3">
            <h1 class="h3 m-0 fw-bold" style="color: var(--rpg-gold-light); font-family: var(--font-title); text-shadow: var(--rpg-heading-shadow);">${escapeHtml(char.name)}</h1>
            <div class="rpg-subdesc mt-1">Jugador: <strong>${escapeHtml(char.playerName || 'Anónimo')}</strong></div>
            <button id="btn-sheet-edit-identity" class="btn btn-xs btn-outline-warning d-inline-flex align-items-center gap-1 mt-2" title="Editar Nombre, Jugador, Especie, Trasfondo y Alineamiento">
              <i data-lucide="user-cog" style="width: 12px; height: 12px;"></i> Editar Identidad
            </button>
          </div>
          <div class="col-md-9">
            <div class="row g-2 text-center text-md-start">
              <div class="col-6 col-md-3">
                <span class="rpg-label d-block">Clase</span>
                <strong class="fs-6 text-light text-truncate d-block" title="${escapeHtml(classDisplayTitle)}">${escapeHtml(classDisplayTitle)}</strong>
              </div>
              <div class="col-6 col-md-1" title="Nivel Total del Personaje: ${char.level}">
                <span class="rpg-label d-block">Nivel</span>
                <span class="badge bg-warning text-dark fw-bold fs-6">Nv. ${char.level}</span>
              </div>
              <div class="col-6 col-md-2">
                <span class="rpg-label d-block">Especie</span>
                <strong class="fs-6 text-light">${escapeHtml(fullSpecies)}</strong>
              </div>
              <div class="col-6 col-md-2">
                <span class="rpg-label d-block">Trasfondo</span>
                <strong class="fs-6 text-light">${escapeHtml(backgroundName)}</strong>
              </div>
              <div class="col-4 col-md-1">
                <span class="rpg-label d-block">Tamaño</span>
                <strong class="fs-6 text-light">${escapeHtml(charSize)}</strong>
              </div>
              <div class="col-4 col-md-1">
                <span class="rpg-label d-block">Alineamiento</span>
                <strong class="fs-6 text-light">${escapeHtml(char.alignment || 'Neutral')}</strong>
              </div>
              <div class="col-4 col-md-1" title="Bono de Competencia: +${pb} para nivel ${char.level} (nv 1-4 = +2, nv 5-8 = +3, nv 9-12 = +4, nv 13-16 = +5, nv 17-20 = +6)" style="cursor: help;">
                <span class="rpg-label d-block">BC</span>
                <strong class="text-danger fs-5">+${pb}</strong>
              </div>
              <div class="col-6 col-md-1">
                <span class="rpg-label d-block">Inspiración</span>
                <button id="btn-sheet-toggle-inspiration" class="badge border-0 ${char.heroicInspiration ? 'bg-warning text-dark fw-bold' : 'bg-secondary text-light'}" title="Hacer clic para activar o consumir la Inspiración Heroica" style="cursor: pointer;">
                  ${char.heroicInspiration ? '★ Activa' : '☆ No'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Fila de Estadísticas de Combate y Atributos (Responsive: 3 columnas en desktop >1280px, 2 en tablet <=1280px, 1 en móvil <768px) -->
        <div class="row g-3 mb-3 ${(!this.activeLowerFilter || this.activeLowerFilter === 'all') ? 'sheet-balanced-top' : ''}" id="sheet-top-row">
          <!-- Columna 1: Atributos, Salvaciones, Sentidos Pasivos y Competencias Básicas -->
          <div class="col-12 col-md-4 sheet-top-col-1 d-flex flex-column gap-2" id="sheet-top-col-1">
            <div class="d-flex justify-content-between align-items-center px-1">
              <span class="rpg-label fw-bold m-0" style="color: var(--rpg-gold); font-size: 0.72rem;">PUNTUACIONES</span>
              <button id="btn-sheet-edit-abilities" class="btn btn-xs btn-outline-warning d-flex align-items-center gap-1 py-0 px-2" title="Modificar Puntuaciones Base y Mejoras de Trasfondo">
                <i data-lucide="sliders" style="width: 11px; height: 11px;"></i> Editar
              </button>
            </div>
            <!-- 6 Atributos Oficiales -->
            <div class="d-flex flex-column gap-1">
              ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(ab => {
                const b = abilityBreakdown[ab];
                const score = b.total;
                const mod = b.modifier;
                const save = saves[ab] || { bonus: mod, isProficient: false, formula: `Mod. ${b.abilityName} (${b.modStr})` };
                const saveVal = save.bonus !== undefined ? save.bonus : (save.value !== undefined ? save.value : mod);

                return `
                  <div class="p-2 rounded rpg-parchment-box d-flex justify-content-between align-items-center" title="${escapeHtml(b.formula)}" style="cursor: help;">
                    <div>
                      <div class="fw-bold small text-light">${b.abilityName} (${b.shortName}) <span class="rpg-subdesc">(${score})</span></div>
                      <div class="rpg-subdesc" title="${escapeHtml(save.formula)}" style="cursor: help;">
                        Salv: <strong class="text-light">${formatModifier(saveVal)}</strong> ${save.isProficient ? '<span class="text-danger">●</span>' : '<span class="text-muted">○</span>'}
                      </div>
                    </div>
                    <div class="text-end">
                      <span class="badge bg-danger fs-6" title="${escapeHtml(b.formula)}">${formatModifier(mod)}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Sentidos Pasivos y Visión (Directamente bajo los atributos para llenar la columna) -->
            <div class="p-2 rounded rpg-parchment-box">
              <div class="rpg-label fw-bold mb-1 border-bottom pb-1" style="border-color: var(--rpg-line) !important;">SENTIDOS PASIVOS Y VISIÓN</div>
              <div class="row g-1 text-center small mb-1">
                <div class="col-4" title="${escapeHtml(passPerc.formula)}" style="cursor: help;">
                  <span class="rpg-subdesc d-block text-truncate">Percepción</span>
                  <strong class="fs-6 text-light">${passPerc.value}</strong>
                </div>
                <div class="col-4" title="${escapeHtml(passInv.formula)}" style="cursor: help;">
                  <span class="rpg-subdesc d-block text-truncate">Investigación</span>
                  <strong class="fs-6 text-light">${passInv.value}</strong>
                </div>
                <div class="col-4" title="${escapeHtml(passIns.formula)}" style="cursor: help;">
                  <span class="rpg-subdesc d-block text-truncate">Perspicacia</span>
                  <strong class="fs-6 text-light">${passIns.value}</strong>
                </div>
              </div>
              <div class="rpg-subdesc text-center border-top pt-1 text-light" style="border-color: var(--rpg-line) !important;">
                <i data-lucide="eye" style="width: 12px; height: 12px; display: inline-block;"></i> <strong>${escapeHtml(visionSense)}</strong>
              </div>
            </div>

            <!-- Competencias de Combate, Herramientas e Idiomas -->
            <div class="p-2 rounded rpg-parchment-box" id="sheet-box-languages-tools">
              <div class="rpg-label fw-bold mb-1 border-bottom pb-1" style="border-color: var(--rpg-line) !important;">COMPETENCIAS E IDIOMAS</div>
              <div class="mb-2">
                <span class="rpg-subdesc d-block fw-bold text-light mb-1">Armaduras y Escudos:</span>
                <div class="d-flex flex-wrap gap-1">
                  <span class="badge ${proficiencies.hasLightArmor ? 'bg-success text-white fw-semibold' : 'border border-secondary'}" style="font-size: 0.68rem; ${proficiencies.hasLightArmor ? '' : 'background-color: var(--rpg-dark-surface); color: var(--rpg-text-soft);'}">${proficiencies.hasLightArmor ? '✓' : '✕'} Ligera</span>
                  <span class="badge ${proficiencies.hasMediumArmor ? 'bg-success text-white fw-semibold' : 'border border-secondary'}" style="font-size: 0.68rem; ${proficiencies.hasMediumArmor ? '' : 'background-color: var(--rpg-dark-surface); color: var(--rpg-text-soft);'}">${proficiencies.hasMediumArmor ? '✓' : '✕'} Media</span>
                  <span class="badge ${proficiencies.hasHeavyArmor ? 'bg-success text-white fw-semibold' : 'border border-secondary'}" style="font-size: 0.68rem; ${proficiencies.hasHeavyArmor ? '' : 'background-color: var(--rpg-dark-surface); color: var(--rpg-text-soft);'}">${proficiencies.hasHeavyArmor ? '✓' : '✕'} Pesada</span>
                  <span class="badge ${proficiencies.hasShield ? 'bg-success text-white fw-semibold' : 'border border-secondary'}" style="font-size: 0.68rem; ${proficiencies.hasShield ? '' : 'background-color: var(--rpg-dark-surface); color: var(--rpg-text-soft);'}">${proficiencies.hasShield ? '✓' : '✕'} Escudo</span>
                </div>
              </div>
              <div class="mb-2">
                <span class="rpg-subdesc d-block fw-bold text-light mb-1">Armas:</span>
                <div class="d-flex flex-wrap gap-1">
                  ${proficiencies.weaponProficiencies.map(wp => `
                    <span class="badge bg-primary text-white fw-semibold" style="font-size: 0.68rem;">${escapeHtml(wp)}</span>
                  `).join('')}
                </div>
              </div>
              <div class="mb-2 pt-1 border-top" style="border-color: var(--rpg-line-faint) !important;">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="rpg-subdesc fw-bold text-light">Herramientas y Juegos:</span>
                  <button type="button" id="btn-sheet-open-add-tool" class="btn btn-xs btn-outline-warning py-0 px-1" style="font-size: 0.65rem;" title="Añadir competencia en herramientas o juegos">+ Añadir</button>
                </div>
                <div class="d-flex flex-wrap gap-1">
                  ${tools.length > 0 ? tools.map((tool, idx) => {
                    const isProtected = this.isProtectedTool(tool, char);
                    return `
                      <span class="badge ${isProtected ? 'bg-dark text-warning border border-warning border-opacity-50' : 'bg-dark text-light border border-secondary'} d-flex align-items-center gap-1" style="font-size: 0.68rem;" title="${isProtected ? 'Competencia concedida por tu clase o trasfondo (no eliminable)' : 'Competencia en herramienta añadida'}">
                        ${isProtected ? '🔒' : '🔧'} ${escapeHtml(tool)}
                        ${isProtected ? '' : `
                          <button type="button" class="btn btn-link p-0 text-danger text-decoration-none btn-remove-tool" data-index="${idx}" data-tool="${escapeHtml(tool)}" title="Eliminar herramienta" style="font-size: 11px; line-height: 1;">&times;</button>
                        `}
                      </span>
                    `;
                  }).join('') : '<span class="text-muted small" style="font-size: 0.7rem;"><em>Ninguna registrada</em></span>'}
                </div>
              </div>
              <div class="pt-1 border-top" style="border-color: var(--rpg-line-faint) !important;">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="rpg-subdesc fw-bold text-light">Idiomas Conocidos:</span>
                  <button type="button" id="btn-sheet-open-add-language" class="btn btn-xs btn-outline-warning py-0 px-1" style="font-size: 0.65rem;" title="Añadir nuevo idioma conocido">+ Añadir</button>
                </div>
                <div class="d-flex flex-wrap gap-1">
                  ${languages.map((lang, idx) => `
                    <span class="badge bg-dark text-warning border border-secondary d-flex align-items-center gap-1" style="font-size: 0.68rem;">
                      ${escapeHtml(lang)}
                      <button type="button" class="btn btn-link p-0 text-danger text-decoration-none btn-remove-language" data-index="${idx}" title="Eliminar idioma" style="font-size: 11px; line-height: 1;">&times;</button>
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Columna 2: Combate (CA, Iniciativa, Velocidad, Vida, Dados de Golpe, Salvaciones y Ataques) -->
          <div class="col-12 col-md-8 sheet-top-col-2 d-flex flex-column gap-2" id="sheet-top-col-2">
            <!-- CA, Iniciativa y Velocidad -->
            <div class="row g-2 text-center">
              <div class="col-4">
                <div class="p-2 rounded rpg-parchment-box h-100" title="${escapeHtml(acInfo.formula)}" style="cursor: help;">
                  <span class="rpg-label d-block">Clase Armadura</span>
                  <span class="display-6 fw-bold text-light">${escapeHtml(acInfo.acDisplay || String(acInfo.ac))}</span>
                  <div class="rpg-subdesc text-truncate" title="${escapeHtml(acInfo.formula)}">
                    ${acInfo.isUnarmored ? '<span class="badge bg-secondary p-1">Sin Armadura</span>' : `<span class="badge bg-success p-1">${escapeHtml(acInfo.equippedArmorName || 'Con Armadura')}</span>`}
                    ${acInfo.hasAnyShield ? `<span class="badge ${acInfo.hasShield ? 'bg-info text-dark' : 'bg-dark text-warning border border-secondary'} p-1 ms-1">${escapeHtml(acInfo.shieldBadgeText || acInfo.acDisplayNote || 'Escudo')}</span>` : ''}
                    ${(acInfo.hasMageArmorSpell && acInfo.isUnarmored) ? `<span class="badge bg-warning text-dark p-1 ms-1" title="Armadura de Mago disponible (+3 CA)">✨ Arm. Mago: ${acInfo.acWithMageArmor} CA</span>` : ''}
                  </div>
                  <div class="rpg-subdesc small text-muted text-truncate mt-1" title="${escapeHtml(acInfo.formula)}">${escapeHtml(acInfo.formula)}</div>
                </div>
              </div>
              <div class="col-4">
                <div class="p-2 rounded rpg-parchment-box h-100" title="${escapeHtml(initInfo.formula)}" style="cursor: help;">
                  <span class="rpg-label d-block">Iniciativa</span>
                  <span class="display-6 fw-bold text-light">${formatModifier(initInfo.bonus)}</span>
                  <div class="rpg-subdesc text-truncate" title="${escapeHtml(initInfo.formula)}">${initInfo.formula}</div>
                </div>
              </div>
              <div class="col-4">
                <div class="p-2 rounded rpg-parchment-box h-100" title="${escapeHtml(speedInfo.formula)}" style="cursor: help;">
                  <span class="rpg-label d-block">Velocidad</span>
                  <span class="display-6 fw-bold text-light">${speedInfo.speed}</span>
                  <div class="rpg-subdesc text-truncate" title="${escapeHtml(speedInfo.formula)}">metros</div>
                </div>
              </div>
            </div>

            <!-- Puntos de Golpe Compactos y Cantidad de Dados de Golpe (Gestión en Master Panel) -->
            <div class="p-2 px-3 rounded rpg-parchment-box" title="${escapeHtml(hpInfo.formula)}">
              <div class="d-flex justify-content-between align-items-center mb-1 flex-wrap gap-1">
                <div class="d-flex align-items-center gap-2">
                  <span class="rpg-label m-0">PUNTOS DE GOLPE</span>
                  <button type="button" id="btn-sheet-open-hp-levels" class="btn btn-xs btn-outline-warning py-0 px-2 d-flex align-items-center gap-1" title="Elegir mejora de vida por cada nivel (Media fija o Tirada de dado)">
                    <i data-lucide="dice-5" style="width: 11px; height: 11px;"></i> PG por Nivel
                  </button>
                </div>
                <div class="d-flex align-items-center gap-2" title="${escapeHtml(hpInfo.formula)}">
                  <span class="fs-6 fw-bold text-light">${char.currentHp !== null && char.currentHp !== undefined ? char.currentHp : hpInfo.maxHp} <span class="text-secondary fw-normal">/ ${hpInfo.maxHp}</span></span>
                  <span class="badge ${(Number(char.temporaryHp) || 0) > 0 ? 'bg-info text-dark fw-bold' : 'bg-dark text-secondary border border-secondary'}" style="font-size: 0.7rem;" title="Puntos de Golpe Temporales (modificables en el Master Panel)">+${Number(char.temporaryHp) || 0} Temp</span>
                  <span class="badge bg-danger text-light fw-bold" style="font-size: 0.7rem;" title="Dados de Golpe disponibles / totales (se gastan o recuperan en el Master Panel)">🎲 DG: ${availableHd}/${totalHd} (${hdPool.summaryText})</span>
                </div>
              </div>
              <div class="hp-bar-container mb-1" title="${escapeHtml(hpInfo.formula)}" style="cursor: help; height: 8px;">
                <div class="hp-bar-fill ${Math.round(((char.currentHp !== null && char.currentHp !== undefined ? char.currentHp : hpInfo.maxHp) / hpInfo.maxHp) * 100) <= 25 ? 'hp-bar-critical' : Math.round(((char.currentHp !== null && char.currentHp !== undefined ? char.currentHp : hpInfo.maxHp) / hpInfo.maxHp) * 100) <= 50 ? 'hp-bar-wounded' : 'hp-bar-healthy'}" style="width: ${Math.min(100, Math.round(((char.currentHp !== null && char.currentHp !== undefined ? char.currentHp : hpInfo.maxHp) / hpInfo.maxHp) * 100))}%;"></div>
              </div>
              <div class="d-flex flex-wrap align-items-center gap-1 btn-open-hp-levels-strip" style="cursor: pointer;" title="Haz clic para cambiar entre Media fija o Tirada de dado por nivel">
                ${(hpInfo.breakdown || []).map(b => `
                  <span class="badge ${b.level === 1 ? 'bg-secondary text-light' : (b.mode === 'roll' ? 'bg-info text-dark' : 'bg-dark text-warning border border-secondary')}" style="font-size: 0.63rem;">
                    Nv${b.level}: +${b.total} (${b.level === 1 ? `Máx ${b.roll}` : (b.mode === 'roll' ? `🎲${b.roll}` : `Media ${b.roll}`)})
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Armas y Ataques Equipados Dinámicos (incluye Conjuros marcados como Ataque) -->
            <div class="p-3 rounded rpg-parchment-box" id="sheet-box-attacks">
              <div class="rpg-parchment-box-header d-flex justify-content-between align-items-center">
                <span>ATAQUES Y ARMAS EQUIPADAS</span>
                <span class="rpg-subdesc small">Armas, dotes y conjuros de ataque</span>
              </div>
              <div class="table-responsive">
                <table class="table table-dark table-sm table-bordered mb-0 small align-middle">
                  <thead>
                    <tr>
                      <th>Arma / Conjuro</th>
                      <th class="text-center">Ataque</th>
                      <th>Daño / Tipo</th>
                      <th>Alcance y Propiedades</th>
                      <th class="text-center">Maestría</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(equippedWeaponsList.length > 0 ? equippedWeaponsList : ['desarmado']).map(item => {
                      const atk = this.calculateWeaponAttack(item, char, scores, pb);
                      const propBadges = (atk.properties || []).map(p => {
                        const pLow = p.toLowerCase();
                        const badgeCls = pLow.includes('pesada') ? 'bg-danger bg-opacity-75 text-light'
                          : pLow.includes('sutil') ? 'bg-info text-dark'
                          : pLow.includes('dos manos') || pLow.includes('versátil') ? 'bg-secondary text-light'
                          : 'bg-dark text-secondary border border-secondary';
                        return `<span class="badge ${badgeCls}" style="font-size: 0.68rem;">${escapeHtml(p)}</span>`;
                      }).join(' ');
                      const traitBadges = (atk.activeTraitsBadges || []).map(b => 
                        `<span class="badge ${b.cls || 'bg-warning text-dark'}" style="font-size: 0.66rem;" title="${escapeHtml(b.tooltip || b.text)}">${escapeHtml(b.text)}</span>`
                      ).join(' ');
                      return `
                        <tr>
                          <td>
                            <div class="fw-bold text-light">${escapeHtml(atk.name)}</div>
                            ${traitBadges ? `<div class="d-flex flex-wrap gap-1 mt-1">${traitBadges}</div>` : ''}
                          </td>
                          <td class="text-danger fw-bold text-center fs-6" title="${escapeHtml(atk.atkFormula || '')}" style="cursor: help;">${atk.attackBonus}</td>
                          <td title="${escapeHtml(atk.dmgFormula || '')}" style="cursor: help;">
                            <span class="fw-semibold text-warning">${escapeHtml(atk.damage)}</span>
                            ${atk.versatileDamage ? `<div class="text-secondary" style="font-size: 0.72rem;">2M: ${escapeHtml(atk.versatileDamage)}</div>` : ''}
                          </td>
                          <td>
                            <div class="d-flex flex-wrap align-items-center gap-1">
                              <span class="badge bg-black border border-warning text-warning" style="font-size: 0.68rem;" title="Distancia / Alcance efectivo">📏 ${escapeHtml(atk.rangeLabel || '1,5 m')}</span>
                              ${propBadges || '<span class="text-muted" style="font-size: 0.7rem;">Cuerpo a cuerpo</span>'}
                            </div>
                          </td>
                          <td class="text-center"><span class="badge bg-warning text-dark">${escapeHtml(atk.mastery)}</span></td>
                        </tr>
                      `;
                    }).join('')}
                    ${(char.spells || []).map((sp, spIdx) => {
                      const spRaw = typeof sp === 'string' ? sp.toLowerCase() : '';
                      const spObj = typeof sp === 'string'
                        ? (DND55_CANONICAL_SPELLS.find(c => c.name.toLowerCase() === spRaw || c.id === spRaw || (c.aliases && c.aliases.some(a => a.toLowerCase() === spRaw))) || { name: sp, level: 0 })
                        : sp;
                      if (!spObj || !spObj.isAttackSpell) return '';
                      const objName = (spObj.name || '').toLowerCase();
                      const canonicalSp = DND55_CANONICAL_SPELLS.find(c => c.id === spObj.id || (c.name && objName && c.name.toLowerCase() === objName) || (c.aliases && objName && c.aliases.some(a => a.toLowerCase() === objName))) || spObj;
                      const mergedSp = { ...canonicalSp, ...spObj };
                      const baseLvl = Math.max(0, Number(mergedSp.level) || 0);
                      const castSlotLvl = baseLvl === 0 ? 0 : Math.max(baseLvl, Number(spObj.castAtLevel) || baseLvl);
                      const spAtkInfo = getSpellAttackInfo(mergedSp, spellInfo, char.level || 1, castSlotLvl);
                      const atkLabel = spAtkInfo.attackBonusText || spAtkInfo.attackOrDc || (spellInfo ? `+${spellInfo.spellAttackBonus}` : '+0');
                      const dmgLabel = spObj.customDamage || spAtkInfo.damageText || spAtkInfo.damageOrEffect || (mergedSp.description ? mergedSp.description.slice(0, 42) + '...' : 'Efecto mágico');
                      const lvlLabel = baseLvl === 0 ? `Truco (Nv.PJ ${char.level || 1})` : `Nv ${baseLvl}`;
                      const maxSlotAvailable = Math.max(baseLvl, ...Object.entries(spellInfo?.maxSlots || {}).filter(([, count]) => count > 0).map(([k]) => parseInt(k.replace('level', ''), 10) || 1), 9);
                      const slotSelectorHtml = baseLvl >= 1 && baseLvl <= 8 ? `
                        <div class="d-flex align-items-center gap-1 mt-1">
                          <span class="text-secondary" style="font-size: 0.65rem;">Espacio:</span>
                          <select class="form-select form-select-sm bg-dark text-warning border-secondary py-0 px-1 select-spell-cast-level" data-spell-index="${spIdx}" style="width: auto; font-size: 0.68rem; height: 20px;" title="Elegir nivel de espacio de conjuro para escalar el daño">
                            ${Array.from({ length: 9 - baseLvl + 1 }, (_, i) => baseLvl + i).map(slotLvl => `
                              <option value="${slotLvl}" ${castSlotLvl === slotLvl ? 'selected' : ''}>Nv ${slotLvl}${slotLvl > baseLvl ? ` (+${slotLvl - baseLvl})` : ' (Base)'}</option>
                            `).join('')}
                          </select>
                        </div>
                      ` : '';
                      return `
                        <tr style="background: rgba(88, 28, 135, 0.14);">
                          <td>
                            <div class="fw-bold text-info">✨ ${escapeHtml(mergedSp.name)}</div>
                            <div class="d-flex flex-wrap gap-1 mt-1">
                              <span class="badge bg-primary text-light" style="font-size: 0.64rem;">Conjuro (${lvlLabel})</span>
                              ${mergedSp.school ? `<span class="badge bg-dark text-secondary border border-secondary" style="font-size: 0.64rem;">${escapeHtml(mergedSp.school)}</span>` : ''}
                            </div>
                          </td>
                          <td class="text-info fw-bold text-center" style="font-size: 0.85rem;" title="Bonificador de Ataque de Conjuro o CD de Salvación">${escapeHtml(atkLabel)}</td>
                          <td title="${escapeHtml(mergedSp.description || '')}" style="cursor: help;">
                            <div class="fw-semibold text-warning">${escapeHtml(dmgLabel)}</div>
                            ${baseLvl === 0 && spAtkInfo.cantripMultiplier > 1 ? `<div class="text-info" style="font-size: 0.66rem;">⚡ Escala de Truco Nv ${char.level || 1} (×${spAtkInfo.cantripMultiplier} dados)</div>` : ''}
                            ${spAtkInfo.upcastNote && baseLvl >= 1 ? `<div class="text-secondary" style="font-size: 0.65rem;">📈 ${escapeHtml(spAtkInfo.upcastNote)}</div>` : ''}
                            ${slotSelectorHtml}
                          </td>
                          <td>
                            <div class="d-flex flex-wrap align-items-center gap-1">
                              <span class="badge bg-black border border-info text-info" style="font-size: 0.68rem;">📏 ${escapeHtml(mergedSp.range || '18 m')}</span>
                              <span class="badge bg-dark text-light border border-secondary" style="font-size: 0.66rem;">⏱️ ${escapeHtml(mergedSp.castingTime || '1 acción')}</span>
                            </div>
                          </td>
                          <td class="text-center">
                            <button type="button" class="btn btn-xs btn-outline-info py-0 px-1 btn-toggle-spell-attack" data-spell-index="${spIdx}" title="Quitar conjuro de la tabla de ataques" style="font-size: 0.65rem;">⚔️ Quitar</button>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Columna 3: Habilidades de D&D 5.5 (En tablet <=1280px pasa a ancho completo bajo columnas 1 y 2; en desktop >1280px se alinea al lado) -->
          <div class="col-12 sheet-top-col-3" id="sheet-top-col-3">
            <div class="p-3 rounded rpg-parchment-box h-100">
              <div class="rpg-parchment-box-header d-flex flex-wrap justify-content-between align-items-center gap-1">
                <span>18 HABILIDADES OFICIALES</span>
                <button type="button" id="btn-sheet-edit-skills" class="btn btn-xs btn-outline-warning d-flex align-items-center gap-1 py-0 px-2" title="Configurar qué habilidades tienen competencia o pericia">
                  <i data-lucide="award" style="width: 12px; height: 12px;"></i> Pericias y Habilidades
                </button>
              </div>
              <ul class="list-unstyled mb-0 small">
                ${Object.entries(skills).map(([skName, skData]) => {
                  const prof = skData?.proficiency || skData?.level || 'none';
                  const abKey = getAbilityShortName(skData?.abilityKey || skData?.ability || 'str');
                  const bonusVal = skData?.bonus !== undefined ? skData.bonus : (skData?.value !== undefined ? skData.value : 0);
                  const formula = skData?.formula || `Mod. ${abKey} (${formatModifier(bonusVal)})`;
                  return `
                    <li class="d-flex justify-content-between align-items-center py-1 border-bottom" style="border-color: var(--rpg-row-line) !important; cursor: help;" title="${escapeHtml(formula)}">
                      <span>
                        ${prof === 'expertise' ? '<span class="rpg-skill-dot-expertise me-1">★</span>' : prof === 'proficient' ? '<span class="rpg-skill-dot-proficient me-1">●</span>' : '<span class="rpg-skill-dot-untrained me-1">○</span>'}
                        <span class="text-light fw-medium">${skName}</span> 
                        <span class="rpg-skill-badge ms-1">${abKey}</span>
                      </span>
                      <strong class="${prof !== 'none' ? 'text-danger fw-bold' : 'text-light'}">${formatModifier(bonusVal)}</strong>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- Barra de Pestañas / Filtros del Panel Inferior -->
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-2 border-bottom border-secondary border-opacity-25">
          <div class="d-flex flex-wrap align-items-center gap-1" id="sheet-lower-nav">
            <button class="rpg-filter-pill ${(!this.activeLowerFilter || this.activeLowerFilter === 'all') ? 'active' : ''}" data-filter="all">
              <i data-lucide="layout-grid" style="width: 13px; height: 13px;"></i> Todo Equilibrado
            </button>
            <button class="rpg-filter-pill ${this.activeLowerFilter === 'features' ? 'active' : ''}" data-filter="features">
              <i data-lucide="shield" style="width: 13px; height: 13px;"></i> Rasgos y Dotes
            </button>
            <button class="rpg-filter-pill ${this.activeLowerFilter === 'inventory' ? 'active' : ''}" data-filter="inventory">
              <i data-lucide="backpack" style="width: 13px; height: 13px;"></i> Inventario y Riqueza
            </button>
            ${hasSpells ? `
              <button class="rpg-filter-pill ${this.activeLowerFilter === 'spells' ? 'active' : ''}" data-filter="spells">
                <i data-lucide="sparkles" style="width: 13px; height: 13px;"></i> Magia y Conjuros
              </button>
            ` : ''}
            <button class="rpg-filter-pill ${this.activeLowerFilter === 'bio' ? 'active' : ''}" data-filter="bio">
              <i data-lucide="book-open" style="width: 13px; height: 13px;"></i> Aspecto e Historia
            </button>
          </div>
          <div class="rpg-subdesc text-muted d-none d-md-block">
            <i data-lucide="info" style="width: 12px; height: 12px; display: inline-block;"></i> Organización simétrica D&amp;D 5.5
          </div>
        </div>

        <!-- Fila de Detalles: Rasgos, Inventario, Magia y Competencias (2 Columnas Simétricas) -->
        <div class="row g-3 ${isBalancedTwoCols ? 'sheet-balanced-mode' : ''}" id="sheet-lower-row">
          <!-- Columna Izquierda: Rasgos de Clase, Dotes, Bendiciones y Especie -->
          <div class="col-12 ${isBalancedTwoCols ? 'col-lg-6' : ''} sheet-col-features ${(isInventory || isSpells) ? 'd-none' : 'd-flex flex-column gap-3'}" id="sheet-col-features">
            <!-- 1. Rasgos de Clase y Elecciones Oficiales -->
            <div class="p-3 rounded rpg-parchment-box ${(isInventory || isSpells || isBio) ? 'd-none' : ''}" id="sheet-box-class-features">
              <div class="rpg-parchment-box-header d-flex justify-content-between align-items-center">
                <span>RASGOS DE CLASE (${escapeHtml(fullClass)})</span>
                <span class="badge bg-danger text-light">Nv ${char.level}</span>
              </div>
              <ul class="list-unstyled mb-0 small" style="max-height: 420px; overflow-y: auto;">
                <!-- Elecciones de Clase Realizadas -->
                ${resolvedFeatures.classChoices && resolvedFeatures.classChoices.length > 0 ? `
                  <li class="pb-1 mb-1">
                    <span class="fw-bold text-uppercase" style="color: var(--rpg-gold); font-size: 0.8rem; letter-spacing: 0.5px; font-family: var(--font-title);">Elecciones de Vocación eclesiástica / Clase:</span>
                  </li>
                  ${resolvedFeatures.classChoices.map(c => `
                    <li class="rpg-feat-card d-flex flex-column gap-1 mb-2" style="border-left: 3px solid var(--rpg-gold-dark);">
                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <span class="rpg-feat-title">${escapeHtml(c.featureName)}</span>
                          <span class="badge bg-warning text-dark fw-bold ms-1">
                            <i data-lucide="check-circle" style="width: 12px; height: 12px; display: inline-block;"></i> Elección: ${escapeHtml(c.choiceName)}
                          </span>
                        </div>
                        <span class="badge bg-secondary text-light">Nv ${c.level}</span>
                      </div>
                      <div class="rpg-feat-desc">${escapeHtml(c.description)}</div>
                    </li>
                  `).join('')}
                ` : ''}

                <!-- Estilos de Combate -->
                ${(resolvedFeatures.fightingStyles?.length > 0 ? resolvedFeatures.fightingStyles : (resolvedFeatures.fightingStyle ? [resolvedFeatures.fightingStyle] : [])).map(fs => `
                  <li class="rpg-feat-card d-flex flex-column gap-1 mb-2" style="border-left: 3px solid var(--rpg-gold-dark);">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <span class="rpg-feat-title">Estilo de Combate</span>
                        <span class="badge bg-warning text-dark fw-bold ms-1">
                          <i data-lucide="shield" style="width: 12px; height: 12px; display: inline-block;"></i> ${escapeHtml(fs.name)}
                        </span>
                      </div>
                    </div>
                    <div class="rpg-feat-desc">${escapeHtml(fs.description)}</div>
                  </li>
                `).join('')}

                <!-- Rasgos de Subclase(s) -->
                ${(resolvedFeatures.subclasses && resolvedFeatures.subclasses.length > 0) ? resolvedFeatures.subclasses.map(sc => `
                  <li class="pt-2 pb-1 border-top border-secondary border-opacity-25 mt-2">
                    <span class="fw-bold text-uppercase" style="color: var(--rpg-gold); font-size: 0.8rem; letter-spacing: 0.5px; font-family: var(--font-title);">Subclase: ${escapeHtml(sc.name)} (${escapeHtml(sc.className)})</span>
                  </li>
                  ${(sc.features || []).map(sf => `
                    <li class="rpg-feat-card d-flex flex-column gap-1 mb-2">
                      <div class="d-flex justify-content-between align-items-start">
                        <span class="rpg-feat-title">${escapeHtml(sf.name)}</span>
                        <div class="d-flex align-items-center gap-1">
                          ${sf.dc ? `<span class="badge bg-warning text-dark fw-bold" style="cursor: help;" title="${escapeHtml(sf.dcFormula || `CD ${sf.dc}`)}">CD ${sf.dc}</span>` : ''}
                          <span class="badge bg-info text-dark">Nv ${sf.level}</span>
                        </div>
                      </div>
                      <div class="rpg-feat-desc">${this.renderFeatureDesc(sf.description, sf.dc, sf.dcFormula)}</div>
                    </li>
                  `).join('')}
                `).join('') : (resolvedFeatures.subclass ? `
                  <li class="pt-2 pb-1 border-top border-secondary border-opacity-25 mt-2">
                    <span class="fw-bold text-uppercase" style="color: var(--rpg-gold); font-size: 0.8rem; letter-spacing: 0.5px; font-family: var(--font-title);">Subclase: ${escapeHtml(resolvedFeatures.subclass.name)}</span>
                  </li>
                  ${(resolvedFeatures.subclass.features || []).map(sf => `
                    <li class="rpg-feat-card d-flex flex-column gap-1 mb-2">
                      <div class="d-flex justify-content-between align-items-start">
                        <span class="rpg-feat-title">${escapeHtml(sf.name)}</span>
                        <div class="d-flex align-items-center gap-1">
                          ${sf.dc ? `<span class="badge bg-warning text-dark fw-bold" style="cursor: help;" title="${escapeHtml(sf.dcFormula || `CD ${sf.dc}`)}">CD ${sf.dc}</span>` : ''}
                          <span class="badge bg-info text-dark">Nv ${sf.level}</span>
                        </div>
                      </div>
                      <div class="rpg-feat-desc">${this.renderFeatureDesc(sf.description, sf.dc, sf.dcFormula)}</div>
                    </li>
                  `).join('')}
                ` : '')}

                <!-- Rasgos Principales de la Clase Base -->
                <li class="pt-2 pb-1 border-top border-secondary border-opacity-25 mt-2">
                  <span class="fw-bold text-uppercase" style="color: var(--rpg-gold); font-size: 0.8rem; letter-spacing: 0.5px; font-family: var(--font-title);">Rasgos Principales (${escapeHtml(fullClass)}):</span>
                </li>
                ${resolvedFeatures.coreClassFeatures.length > 0 ? resolvedFeatures.coreClassFeatures.map(cf => `
                  <li class="rpg-feat-card d-flex flex-column gap-1 mb-2">
                    <div class="d-flex justify-content-between align-items-start">
                      <span class="rpg-feat-title">${escapeHtml(cf.name)}</span>
                      <div class="d-flex align-items-center gap-1">
                        ${cf.dc ? `<span class="badge bg-warning text-dark fw-bold" style="cursor: help;" title="${escapeHtml(cf.dcFormula || `CD ${cf.dc}`)}">CD ${cf.dc}</span>` : ''}
                        <span class="badge bg-secondary text-light">Nv ${cf.level}</span>
                      </div>
                    </div>
                    <div class="rpg-feat-desc">${this.renderFeatureDesc(cf.description, cf.dc, cf.dcFormula)}</div>
                  </li>
                `).join('') : `
                  <li class="text-center py-2" style="color: var(--rpg-text-muted);">
                    <em>Sin rasgos de clase adicionales registrados.</em>
                  </li>
                `}
              </ul>
            </div>

            <!-- 2. Dotes, Dones y Bendiciones Personalizadas con Modificadores Activos -->
            <div class="p-3 rounded rpg-parchment-box ${(isInventory || isSpells || isBio) ? 'd-none' : ''}" id="sheet-box-feats">
              <div class="rpg-parchment-box-header d-flex justify-content-between align-items-center">
                <span>DOTES Y BENDICIONES</span>
                <button id="btn-sheet-open-add-trait" class="btn btn-sm btn-outline-warning d-flex align-items-center gap-1">
                  <i data-lucide="plus-circle"></i> + Rasgo/Don
                </button>
              </div>
              <ul class="list-unstyled mb-0 small" style="max-height: 380px; overflow-y: auto;">
                <!-- Dotes Oficiales con Descripciones y Elecciones Realizadas -->
                ${resolvedFeats.length > 0 ? resolvedFeats.map((feat, fIdx) => `
                  <li class="rpg-feat-card d-flex flex-column gap-1">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <span class="rpg-feat-title">${escapeHtml(feat.name)}</span>
                        <span class="rpg-feat-badge ms-1">${escapeHtml(feat.categoryLabel)}</span>
                        ${feat.dc ? `<span class="badge bg-warning text-dark fw-bold ms-1" style="cursor: help;" title="${escapeHtml(feat.dcFormula || `CD ${feat.dc}`)}">CD ${feat.dc}</span>` : ''}
                      </div>
                      ${feat.isEditable ? `
                        <button class="btn btn-xs btn-outline-warning btn-edit-feat-choice d-flex align-items-center gap-1" data-feat-idx="${fIdx}" title="Editar elecciones de esta dote">
                          <i data-lucide="sliders" style="width: 11px; height: 11px;"></i> Editar
                        </button>
                      ` : ''}
                    </div>
                    ${feat.choices && feat.choices.length > 0 ? `
                      <div class="rpg-feat-choices">
                        <div class="rpg-feat-choices-title">
                          <i data-lucide="check-circle" class="text-danger me-1" style="width: 13px; height: 13px; display: inline-block;"></i>Elecciones realizadas:
                        </div>
                        <ul class="rpg-feat-choices-list">
                          ${feat.choices.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                    <div class="rpg-feat-desc">${this.renderFeatureDesc(feat.description, feat.dc, feat.dcFormula)}</div>
                  </li>
                `).join('') : `
                  <li class="text-center py-2" style="color: var(--rpg-text-muted);">
                    <em>No hay dotes registradas.</em>
                  </li>
                `}

                <!-- Rasgos y Bendiciones Personalizadas Dinámicas -->
                ${(char.specialAbilities && char.specialAbilities.length > 0) ? `
                  <li class="pt-2 pb-1 border-top border-secondary border-opacity-25 mt-2">
                    <span class="fw-bold text-uppercase" style="color: var(--rpg-gold); font-size: 0.8rem; letter-spacing: 0.5px; font-family: var(--font-title);">Dones y Bendiciones Divinas:</span>
                  </li>
                  ${char.specialAbilities.map(sa => {
                    const isActive = sa.isActive !== false;
                    const modBadges = (sa.statModifiers || []).map(m => {
                      const targetNames = { con: 'CON', str: 'FUE', dex: 'DES', int: 'INT', wis: 'SAB', cha: 'CAR', ac: 'CA', hpMax: 'PG', savingThrows: 'Salv.' };
                      return `<span class="badge bg-danger text-light me-1">${m.mode === 'override_if_lower' ? `Mín ${m.value}` : `+${m.value}`} ${targetNames[m.target] || m.target.toUpperCase()}</span>`;
                    }).join('');

                    return `
                      <li class="rpg-feat-card ${isActive ? '' : 'opacity-75'} d-flex flex-column gap-1">
                        <div class="d-flex justify-content-between align-items-start">
                          <div>
                            <span class="rpg-feat-title">${escapeHtml(sa.name)}</span>
                            <span class="rpg-blessing-badge ms-1">${escapeHtml(sa.source || 'Bendición Divina')}</span>
                            ${modBadges}
                          </div>
                          <div class="d-flex gap-1">
                            <button class="btn btn-xs ${isActive ? 'btn-success' : 'btn-secondary'} btn-toggle-trait-active" data-trait-id="${sa.id}" title="Activar/Desactivar efecto en la ficha">
                              ${isActive ? 'Activo' : 'Inactivo'}
                            </button>
                            <button class="btn btn-xs btn-outline-warning btn-edit-trait" data-trait-id="${sa.id}" title="Editar don o bendición">
                              <i data-lucide="edit-2" style="width: 11px; height: 11px;"></i>
                            </button>
                            <button class="btn btn-xs btn-outline-danger btn-delete-trait" data-trait-id="${sa.id}" title="Eliminar rasgo">
                              &times;
                            </button>
                          </div>
                        </div>
                        <div class="rpg-feat-desc">${escapeHtml(sa.description)}</div>
                      </li>
                    `;
                  }).join('')}
                ` : `
                  <li class="text-center py-2" style="color: var(--rpg-text-muted);">
                    <em>No hay dones o bendiciones activas. Añade una con "+ Rasgo/Don" (por ejemplo: Bendición de Salud +2 CON permanente).</em>
                  </li>
                `}
              </ul>
            </div>

            <!-- 3. Rasgos de Especie y Linaje Oficiales -->
            <div class="p-3 rounded rpg-parchment-box ${(isInventory || isSpells || isBio) ? 'd-none' : ''}" id="sheet-box-species">
              <div class="rpg-parchment-box-header d-flex justify-content-between align-items-center">
                <span>RASGOS DE ESPECIE (${escapeHtml(fullSpecies)})</span>
                <span class="badge bg-secondary text-light">${escapeHtml(charSize)}</span>
              </div>
              <ul class="list-unstyled mb-0 small" style="max-height: 280px; overflow-y: auto;">
                ${(resolvedFeatures.speciesTraits && resolvedFeatures.speciesTraits.length > 0) ? resolvedFeatures.speciesTraits.map(st => `
                  <li class="rpg-feat-card d-flex flex-column gap-1 mb-2" style="border-left: 3px solid var(--rpg-success);">
                    <div class="d-flex justify-content-between align-items-start">
                      <span class="rpg-feat-title">${escapeHtml(st.name)}</span>
                      <span class="badge bg-success bg-opacity-75 text-light">${escapeHtml(st.source || speciesName)}</span>
                    </div>
                    <div class="rpg-feat-desc">${escapeHtml(st.description)}</div>
                  </li>
                `).join('') : `
                  <li class="text-center py-2" style="color: var(--rpg-text-muted);">
                    <em>Sin rasgos de especie específicos registrados.</em>
                  </li>
                `}
              </ul>
            </div>

            <!-- 4. Historia y Personalidad -->
            <div class="p-3 rounded rpg-parchment-box ${(isFeatures || isInventory || isSpells) ? 'd-none' : ''}" id="sheet-box-personality">
              <div class="rpg-parchment-box-header d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span>HISTORIA Y PERSONALIDAD</span>
                <button id="btn-sheet-edit-personality" class="btn btn-xs btn-outline-warning d-flex align-items-center gap-1" title="Editar rasgos, ideales, vínculos, defectos e historia">
                  <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i> Editar Historia
                </button>
              </div>

              <div class="rpg-box-scroll" style="max-height: 400px; overflow-y: auto;">
                <div class="row g-2 mb-3">
                  <div class="col-sm-6">
                    <div class="p-2 rounded h-100" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="fw-bold mb-1" style="color: var(--rpg-gold); font-size: 0.78rem; text-transform: uppercase; font-family: var(--font-title);">Rasgos de Personalidad</div>
                      <div class="small" style="line-height: 1.4; color: var(--rpg-text-main); font-size: 0.82rem;">${escapeHtml(pers.traits || '—')}</div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="p-2 rounded h-100" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="fw-bold mb-1" style="color: var(--rpg-gold); font-size: 0.78rem; text-transform: uppercase; font-family: var(--font-title);">Ideales</div>
                      <div class="small" style="line-height: 1.4; color: var(--rpg-text-main); font-size: 0.82rem;">${escapeHtml(pers.ideals || '—')}</div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="p-2 rounded h-100" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="fw-bold mb-1" style="color: var(--rpg-gold); font-size: 0.78rem; text-transform: uppercase; font-family: var(--font-title);">Vínculos</div>
                      <div class="small" style="line-height: 1.4; color: var(--rpg-text-main); font-size: 0.82rem;">${escapeHtml(pers.bonds || '—')}</div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="p-2 rounded h-100" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="fw-bold mb-1" style="color: var(--rpg-gold); font-size: 0.78rem; text-transform: uppercase; font-family: var(--font-title);">Defectos</div>
                      <div class="small" style="line-height: 1.4; color: var(--rpg-text-main); font-size: 0.82rem;">${escapeHtml(pers.flaws || '—')}</div>
                    </div>
                  </div>
                </div>

                ${allies ? `
                  <div class="p-2 mb-3 rounded" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                    <div class="fw-bold mb-1" style="color: var(--rpg-gold); font-size: 0.78rem; text-transform: uppercase; font-family: var(--font-title);">Aliados y Organizaciones</div>
                    <div class="small" style="line-height: 1.4; color: var(--rpg-text-main); font-size: 0.82rem;">${escapeHtml(allies)}</div>
                  </div>
                ` : ''}

                <div class="p-2 rounded" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                  <div class="fw-bold mb-1" style="color: var(--rpg-gold); font-size: 0.78rem; text-transform: uppercase; font-family: var(--font-title);">Historia del Personaje (Biografía)</div>
                  <div class="small" style="line-height: 1.45; color: var(--rpg-text-main); font-size: 0.82rem; white-space: pre-wrap;">${escapeHtml(backstory || 'Sin historia registrada. Haz clic en "Editar Historia" para personalizar la biografía y antecedentes.')}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna Derecha: Inventario, Magia e Idiomas / Herramientas -->
          <div class="col-12 ${isBalancedTwoCols ? 'col-lg-6' : ''} sheet-col-gear ${isFeatures ? 'd-none' : 'd-flex flex-column gap-3'}" id="sheet-col-gear">
            <!-- 1. Inventario con Equipamiento Exclusivo de Armadura -->
            <div class="p-3 rounded rpg-parchment-box ${(isFeatures || isSpells || isBio) ? 'd-none' : ''}" id="sheet-box-inventory">
              <div class="rpg-parchment-box-header d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span>INVENTARIO Y EQUIPO</span>
                <span class="rpg-subdesc" title="${escapeHtml(carry.formula || '')}" style="cursor: help;">
                  Carga: <strong>${carry.totalWeightKg} kg</strong> / ${carry.carryingCapacityKg} kg 
                  (Arrastre: ${carry.pushDragLiftKg} kg)
                  | Sintonía: <strong>${attunedItems.length}/3</strong>
                </span>
              </div>

              <!-- Barra de Monedas y Riqueza -->
              <div class="d-flex flex-wrap align-items-center justify-content-between p-2 mb-2 rounded" style="background: var(--rpg-currency-bg); border: 1px solid var(--rpg-line-mid);">
                <div class="d-flex flex-wrap align-items-center gap-2">
                  <span class="rpg-label m-0 fw-bold" style="color: var(--rpg-gold);">RIQUEZA:</span>
                  <span class="badge bg-warning text-dark fw-bold" title="Piezas de Oro: ${currency.gp || 0} po (Peso: ${formatWeight((Number(currency.gp) || 0) * 0.01)})" style="cursor: help;">🪙 ${currency.gp || 0} po</span>
                  <span class="badge bg-secondary text-light border border-secondary" title="Piezas de Plata: ${currency.sp || 0} pp (Peso: ${formatWeight((Number(currency.sp) || 0) * 0.01)})" style="cursor: help;">🥈 ${currency.sp || 0} pp</span>
                  <span class="badge text-light" style="background-color: #b87333; cursor: help;" title="Piezas de Cobre: ${currency.cp || 0} pc (Peso: ${formatWeight((Number(currency.cp) || 0) * 0.01)})">🥉 ${currency.cp || 0} pc</span>
                  <span class="badge bg-secondary text-light" title="Piezas de Electro: ${currency.ep || 0} pe (Peso: ${formatWeight((Number(currency.ep) || 0) * 0.01)})" style="cursor: help;">⚡ ${currency.ep || 0} pe</span>
                  <span class="badge bg-info text-dark" title="Piezas de Platino: ${currency.pp || 0} ppt (Peso: ${formatWeight((Number(currency.pp) || 0) * 0.01)})" style="cursor: help;">💎 ${currency.pp || 0} ppt</span>
                  <span class="badge bg-dark text-warning border border-warning border-opacity-50" title="Peso total de todas las monedas transportadas (${carry.totalCoins || 0} monedas: 50 monedas = 0,5 kg)" style="cursor: help;">⚖️ ${formatWeight(carry.coinsWeightKg || 0)}</span>
                </div>
                <button id="btn-sheet-edit-currency" class="btn btn-xs btn-outline-warning d-flex align-items-center gap-1">
                  <i data-lucide="coins"></i> Modificar Monedas
                </button>
              </div>

              <!-- Botón de Añadir Objeto debajo de la Riqueza (Requisito 4) -->
              <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                <span class="small text-secondary">Objetos en inventario: <strong>${(char.inventory || []).length}</strong></span>
                <button id="btn-sheet-open-add-item" class="btn btn-sm btn-outline-success d-flex align-items-center gap-1 shadow-sm">
                  <i data-lucide="plus-circle" style="width: 14px; height: 14px;"></i> + Añadir Objeto
                </button>
              </div>

              <!-- Tabla de Inventario (Limpia y Sin Etiquetas Rotas) -->
              <div class="table-responsive" style="max-height: 340px; overflow-y: auto;">
                <table class="table table-dark table-sm table-hover mb-0 small">
                  <thead>
                    <tr>
                      <th>Objeto</th>
                      <th>Tipo</th>
                      <th class="text-center">Cant. / Cargas</th>
                      <th>Peso</th>
                      <th>Sintonía</th>
                      <th class="text-center">Equipamiento</th>
                      <th class="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${(char.inventory && char.inventory.length > 0) ? char.inventory.map(item => {
                      const isBodyArmor = (item.category === 'armadura' || (item.armorType && item.armorType !== 'escudo')) 
                        && item.armorType !== 'escudo' 
                        && !item.name.toLowerCase().includes('escudo');
                      const isShield = item.armorType === 'escudo' || item.category === 'shield' || item.name.toLowerCase().includes('escudo');
                      const isWeapon = item.category === 'arma' || item.weaponType || DND55_WEAPONS.some(w => w.id === item.id);
                      const isPergamino = item.category === 'pergamino' || (item.name || '').toLowerCase().startsWith('pergamino');
                      const isSortilegio = !isPergamino && (item.category === 'sortilegio' || (item.name || '').toLowerCase().startsWith('sortilegio'));
                      const isConsumable = isPergamino || isSortilegio || item.category === 'consumible' || item.category === 'pocion';
                      const maxCharges = Number(item.maxCharges) || 0;
                      const currentCharges = item.currentCharges !== undefined ? Number(item.currentCharges) : maxCharges;
                      const customFuncs = Array.isArray(item.customFunctions) ? item.customFunctions : [];
                      const artProps = Array.isArray(item.artifactProperties) ? item.artifactProperties : [];

                      let catLabel = 'Equipo';
                      let catBadgeClass = 'bg-secondary text-light';

                      if (isBodyArmor) {
                        catLabel = 'Armadura';
                        catBadgeClass = 'bg-primary text-light';
                      } else if (isShield) {
                        catLabel = 'Escudo';
                        catBadgeClass = 'bg-info text-dark';
                      } else if (isWeapon) {
                        catLabel = 'Arma';
                        catBadgeClass = 'bg-danger text-light';
                      } else if (isPergamino) {
                        catLabel = '📜 Pergamino';
                        catBadgeClass = 'bg-info text-dark fw-bold';
                      } else if (isSortilegio) {
                        catLabel = '✨ Sortilegio';
                        catBadgeClass = 'bg-warning text-dark fw-bold';
                      } else if (item.category === 'artefacto') {
                        catLabel = 'Artefacto';
                        catBadgeClass = 'bg-warning text-dark fw-bold';
                      } else if (item.category === 'magico' || item.category === 'objeto_magico' || item.category === 'maravilloso' || item.category === 'anillo' || item.category === 'baston' || item.category === 'varita') {
                        catLabel = 'Mágico';
                        catBadgeClass = 'bg-success text-light';
                      } else if (item.category === 'consumible' || item.category === 'pocion') {
                        catLabel = 'Consumible';
                        catBadgeClass = 'bg-info bg-opacity-75 text-dark';
                      } else if (item.category === 'herramientas') {
                        catLabel = 'Herramientas';
                        catBadgeClass = 'bg-dark border border-secondary text-light';
                      }

                      return `
                        <tr>
                          <td>
                            <strong class="${isPergamino ? 'text-info' : isSortilegio ? 'text-warning' : 'text-light'}">${escapeHtml(item.name)}</strong>
                            ${item.magicBonus ? `<span class="badge bg-info text-dark ms-1">+${item.magicBonus}</span>` : ''}
                            ${maxCharges > 0 ? `<div class="text-warning" style="font-size: 0.68rem;">🔄 Recarga: ${escapeHtml(item.chargeRecovery || 'Todas en Descanso Largo')}</div>` : ''}
                            ${item.description ? `<div class="rpg-subdesc text-truncate" style="max-width: 240px;" title="${escapeHtml(item.description)}">${escapeHtml(item.description)}</div>` : ''}
                            ${customFuncs.length > 0 ? `
                              <div class="d-flex flex-wrap gap-1 mt-1">
                                ${customFuncs.map(fn => `
                                  <span class="badge bg-dark border border-warning text-warning" style="font-size: 0.63rem;" title="${escapeHtml(`${fn.activation ? `[${fn.activation}] ` : ''}${fn.description || ''}`)}">
                                    ⚡ ${escapeHtml(fn.name)}${fn.activation ? ` (${escapeHtml(fn.activation)})` : ''}
                                  </span>
                                `).join('')}
                              </div>
                            ` : ''}
                            ${artProps.length > 0 ? `
                              <div class="d-flex flex-wrap gap-1 mt-1">
                                ${artProps.map(ap => {
                                  const isDet = (ap.type || '').includes('Detrimental');
                                  return `
                                    <span class="badge ${isDet ? 'bg-danger bg-opacity-75 text-light' : 'bg-info text-dark'}" style="font-size: 0.62rem;" title="${escapeHtml(ap.description || '')}">
                                      ${isDet ? '☠️' : '🌟'} ${escapeHtml(ap.name)}
                                    </span>
                                  `;
                                }).join('')}
                              </div>
                            ` : ''}
                          </td>
                          <td>
                            <span class="badge ${catBadgeClass}">${catLabel}</span>
                          </td>
                          <td class="text-center">
                            ${maxCharges > 0 ? `
                              <div class="d-inline-flex align-items-center gap-1" title="Cargas del objeto (${escapeHtml(item.chargeRecovery || 'Descanso Largo')})">
                                <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-sheet-item-charge" data-item-id="${escapeHtml(item.id)}" data-delta="-1" ${currentCharges <= 0 ? 'disabled' : ''}>-</button>
                                <span class="badge ${currentCharges > 0 ? 'bg-info text-dark' : 'bg-secondary'} fw-bold">⚡ ${currentCharges}/${maxCharges}</span>
                                <button type="button" class="btn btn-xs btn-outline-success py-0 px-1 btn-sheet-item-charge" data-item-id="${escapeHtml(item.id)}" data-delta="1" ${currentCharges >= maxCharges ? 'disabled' : ''}>+</button>
                              </div>
                            ` : isConsumable ? `
                              <div class="d-inline-flex align-items-center gap-1">
                                <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-sheet-item-qty" data-item-id="${escapeHtml(item.id)}" data-delta="-1" ${(Number(item.quantity) || 0) <= 0 ? 'disabled' : ''}>-</button>
                                <span class="fw-bold ${(Number(item.quantity) || 0) === 0 ? 'text-danger' : 'text-light'} px-1">${Number(item.quantity) ?? 1}</span>
                                <button type="button" class="btn btn-xs btn-outline-success py-0 px-1 btn-sheet-item-qty" data-item-id="${escapeHtml(item.id)}" data-delta="1">+</button>
                              </div>
                            ` : `<span class="text-light">${item.quantity || 1}</span>`}
                          </td>
                          <td class="text-light">${formatWeight(item.weight || 0)}</td>
                          <td>
                            ${item.requiresAttunement ? `
                              <button class="btn btn-xs ${item.isAttuned ? 'btn-success' : 'btn-outline-secondary'} btn-toggle-attune" data-item-id="${item.id}" title="Alternar Sintonización">
                                ${item.isAttuned ? 'Sintonizado ✓' : 'Sintonizar'}
                              </button>
                            ` : '-'}
                          </td>
                          <td class="text-center">
                            ${isBodyArmor ? `
                              <button class="btn btn-xs ${item.isEquipped ? 'btn-success text-white fw-bold' : 'btn-outline-primary'} btn-toggle-equip-armor" data-item-id="${item.id}">
                                ${item.isEquipped ? 'Equipada (1 máx) ✓' : 'Equipar'}
                              </button>
                            ` : isShield ? `
                              <button class="btn btn-xs ${item.isEquipped ? 'btn-success text-white fw-bold' : 'btn-outline-primary'} btn-toggle-equip-shield" data-item-id="${item.id}">
                                ${item.isEquipped ? 'Equipado ✓' : 'Equipar'}
                              </button>
                            ` : isWeapon ? `
                              <button class="btn btn-xs ${item.isEquipped ? 'btn-success text-white fw-bold' : 'btn-outline-primary'} btn-toggle-equip-weapon" data-item-id="${item.id}">
                                ${item.isEquipped ? 'Equipada ✓' : 'Equipar'}
                              </button>
                            ` : (item.statModifiers || item.category === 'magico' || item.category === 'objeto_magico' || item.category === 'artefacto') ? `
                              <button class="btn btn-xs ${item.isEquipped ? 'btn-success text-white fw-bold' : 'btn-outline-secondary'} btn-toggle-equip-generic" data-item-id="${item.id}">
                                ${item.isEquipped ? 'Equipado ✓' : 'Equipar'}
                              </button>
                            ` : '-'}
                          </td>
                          <td class="text-center text-nowrap">
                            <button class="btn btn-xs btn-outline-warning btn-edit-item me-1" data-item-id="${item.id}" title="Editar Objeto">
                              <i data-lucide="edit-2"></i>
                            </button>
                            <button class="btn btn-xs btn-outline-danger btn-delete-item" data-item-id="${item.id}" title="Eliminar del Inventario">
                              <i data-lucide="trash-2"></i>
                            </button>
                          </td>
                        </tr>
                      `;
                    }).join('') : `
                      <tr>
                        <td colspan="7" class="text-center text-muted py-3">
                          Inventario vacío. Pulsa en "+ Añadir Objeto" para agregar armaduras, armas, sortilegios u objetos mágicos.
                        </td>
                      </tr>
                    `}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- 2. Grimorio de Conjuros si aplica -->
            ${hasSpells ? `
              <div class="p-3 rounded rpg-parchment-box ${(isFeatures || isInventory || isBio) ? 'd-none' : ''}" id="sheet-box-magic">
                <div class="rpg-parchment-box-header d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div class="d-flex align-items-center gap-2">
                    <span>MAGIA Y LANZAMIENTO DE CONJUROS</span>
                    <button id="btn-sheet-open-add-spell" class="btn btn-xs btn-outline-warning d-flex align-items-center gap-1" title="Añadir nuevo conjuro o truco al grimorio">
                      <i data-lucide="plus-circle" style="width: 14px; height: 14px;"></i> + Conjuro
                    </button>
                  </div>
                  <span class="rpg-subdesc">
                    ${spellInfo ? `
                      Característica: <strong class="text-light" title="Característica de lanzamiento de conjuros">${getAbilityShortName(spellInfo?.abilityKey || spellInfo?.ability || 'int')} (${spellInfo?.abilityName || 'Inteligencia'})</strong> | 
                      Modificador: <strong class="text-info">${formatModifier(spellInfo?.abilityModifier)}</strong> | 
                      CD Salvación: <strong class="text-warning" title="${escapeHtml(spellInfo?.dcFormula || '')}" style="cursor: help;">CD ${spellInfo?.spellSaveDc || 10}</strong> | 
                      Ataque de Conjuro: <strong class="text-danger" title="${escapeHtml(spellInfo?.attackBonusFormula || '')}" style="cursor: help;">+${spellInfo?.spellAttackBonus || 2}</strong>
                    ` : '<span class="text-muted">Aptitud Mágica por Dotes/Objetos</span>'}
                  </span>
                </div>
                ${spellSlots.length > 0 ? `
                  <div class="d-flex flex-wrap align-items-center gap-2 mb-2 p-2 rounded" style="background: var(--rpg-currency-bg); border: 1px solid var(--rpg-line-mid);">
                    <span class="rpg-label m-0">Espacios de Conjuro:</span>
                    ${spellSlots.map(s => `
                      <span class="badge bg-danger">Nv ${s.level}: ${s.max - s.used}/${s.max}</span>
                    `).join('')}
                  </div>
                ` : ''}
                <div class="table-responsive mt-2" style="max-height: 280px; overflow-y: auto;">
                  ${(char.spells && char.spells.length > 0) ? `
                    <table class="table table-sm table-dark table-hover align-middle mb-0" style="font-size: 0.82rem;">
                      <thead>
                        <tr class="text-secondary small border-bottom border-secondary">
                          <th style="width: 55px;">Nivel</th>
                          <th>Nombre</th>
                          <th class="text-center" style="width: 75px;">En Ataques</th>
                          <th>Tiempo</th>
                          <th>Alcance</th>
                          <th>Duración</th>
                          <th>Notas / Efectos</th>
                          <th class="text-end" style="width: 30px;"></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${(char.spells || []).map((sp, idx) => {
                          const spRaw = typeof sp === 'string' ? sp.toLowerCase() : '';
                          const spObj = typeof sp === 'string' ? (DND55_CANONICAL_SPELLS.find(c => c.name.toLowerCase() === spRaw || c.id === spRaw || (c.aliases && c.aliases.some(a => a.toLowerCase() === spRaw))) || { name: sp, level: 0 }) : sp;
                          const isAtk = Boolean(spObj.isAttackSpell);
                          const lvlLabel = spObj.level === 0 ? 'Truco' : `Nv ${spObj.level}`;
                          const lvlBadge = spObj.level === 0 ? 'bg-secondary' : 'bg-primary';
                          return `
                            <tr>
                              <td><span class="badge ${lvlBadge}">${lvlLabel}</span></td>
                              <td>
                                <strong class="text-warning">${escapeHtml(spObj.name || '')}</strong>
                                ${spObj.school ? `<span class="badge bg-dark text-secondary border border-secondary ms-1" style="font-size: 0.65rem;">${escapeHtml(spObj.school)}</span>` : ''}
                                ${spObj.source ? `<span class="badge bg-dark text-warning border border-warning border-opacity-50 ms-1" style="font-size: 0.65rem;" title="${escapeHtml(spObj.source)}">${escapeHtml(spObj.source.startsWith('Especie') ? 'Especie' : (spObj.source.startsWith('Trasfondo') ? 'Trasfondo' : spObj.source))}</span>` : ''}
                              </td>
                              <td class="text-center">
                                <button type="button" class="btn btn-xs ${isAtk ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary'} py-0 px-2 btn-toggle-spell-attack" data-spell-index="${idx}" title="${isAtk ? 'Mostrándose en la tabla de Ataques y Armas Equipadas (clic para quitar)' : 'Marcar como conjuro de ataque para mostrarlo en la tabla de Ataques y Armas Equipadas'}" style="font-size: 0.68rem;">
                                  ⚔️ ${isAtk ? 'Sí ✓' : 'Ataque'}
                                </button>
                              </td>
                              <td><span class="text-light">${escapeHtml(spObj.castingTime || '-')}</span></td>
                              <td><span class="text-light">${escapeHtml(spObj.range || '-')}</span></td>
                              <td><span class="text-secondary small">${escapeHtml(spObj.duration || '-')}</span></td>
                              <td><span class="text-muted small text-truncate d-inline-block" style="max-width: 220px;" title="${escapeHtml(spObj.description || '')}">${escapeHtml(spObj.description || '-')}</span></td>
                              <td class="text-end">
                                <button class="btn btn-link text-danger p-0 btn-delete-spell" data-spell-index="${idx}" title="Eliminar conjuro de la ficha" style="font-size: 16px; line-height: 1; text-decoration: none;">&times;</button>
                              </td>
                            </tr>
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                  ` : `
                    <div class="text-center py-3 text-muted small">
                      <em>No hay conjuros o trucos registrados en el grimorio. Haz clic en <strong>+ Conjuro</strong> para añadir desde el catálogo oficial o crear uno propio.</em>
                    </div>
                  `}
                </div>
              </div>
            ` : ''}

            <!-- 3. Aspecto Físico -->
            <div class="p-3 rounded rpg-parchment-box ${(isFeatures || isInventory || isSpells) ? 'd-none' : ''}" id="sheet-box-appearance">
              <div class="rpg-parchment-box-header d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span>ASPECTO FÍSICO</span>
                <button id="btn-sheet-edit-appearance" class="btn btn-xs btn-outline-warning d-flex align-items-center gap-1" title="Editar características físicas y descripción visual">
                  <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i> Editar Aspecto
                </button>
              </div>

              <div class="rpg-box-scroll" style="max-height: 400px; overflow-y: auto;">
                <!-- Rejilla de Atributos Físicos -->
                <div class="row g-2 mb-3">
                  <div class="col-6 col-sm-4 col-md-3">
                    <div class="p-2 rounded text-center" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="text-secondary small" style="font-size: 0.72rem; text-transform: uppercase;">Edad</div>
                      <strong class="text-light small">${escapeHtml(app.age || '—')}</strong>
                    </div>
                  </div>
                  <div class="col-6 col-sm-4 col-md-3">
                    <div class="p-2 rounded text-center" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="text-secondary small" style="font-size: 0.72rem; text-transform: uppercase;">Género</div>
                      <strong class="text-light small">${escapeHtml(app.gender || '—')}</strong>
                    </div>
                  </div>
                  <div class="col-6 col-sm-4 col-md-3">
                    <div class="p-2 rounded text-center" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="text-secondary small" style="font-size: 0.72rem; text-transform: uppercase;">Altura</div>
                      <strong class="text-light small">${escapeHtml(app.height || '—')}</strong>
                    </div>
                  </div>
                  <div class="col-6 col-sm-4 col-md-3">
                    <div class="p-2 rounded text-center" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="text-secondary small" style="font-size: 0.72rem; text-transform: uppercase;">Peso</div>
                      <strong class="text-light small">${escapeHtml(app.weight || '—')}</strong>
                    </div>
                  </div>
                  <div class="col-6 col-sm-4 col-md-4">
                    <div class="p-2 rounded text-center" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="text-secondary small" style="font-size: 0.72rem; text-transform: uppercase;">Ojos</div>
                      <strong class="text-light small">${escapeHtml(app.eyes || '—')}</strong>
                    </div>
                  </div>
                  <div class="col-6 col-sm-4 col-md-4">
                    <div class="p-2 rounded text-center" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="text-secondary small" style="font-size: 0.72rem; text-transform: uppercase;">Piel</div>
                      <strong class="text-light small">${escapeHtml(app.skin || '—')}</strong>
                    </div>
                  </div>
                  <div class="col-12 col-sm-4 col-md-4">
                    <div class="p-2 rounded text-center" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                      <div class="text-secondary small" style="font-size: 0.72rem; text-transform: uppercase;">Cabello</div>
                      <strong class="text-light small">${escapeHtml(app.hair || '—')}</strong>
                    </div>
                  </div>
                </div>

                <!-- Descripción Visual y Rasgos Singulares -->
                <div class="p-2 rounded" style="background: var(--rpg-bg-subtle, rgba(0,0,0,0.25)); border: 1px solid var(--rpg-line-mid);">
                  <div class="fw-bold mb-1" style="color: var(--rpg-gold); font-size: 0.78rem; text-transform: uppercase; font-family: var(--font-title);">Descripción y Rasgos Distintivos</div>
                  <div class="small" style="line-height: 1.45; color: var(--rpg-text-main); font-size: 0.82rem; white-space: pre-wrap;">${escapeHtml(app.description || 'Sin descripción física registrada. Haz clic en "Editar Aspecto" para añadir detalles sobre vestimenta, tatuajes, cicatrices o porte.')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Diálogo Modal: Añadir Objeto al Inventario -->
      <dialog id="modal-sheet-add-item" class="rpg-dialog p-3" style="max-width: 720px; width: 96%; max-height: 92vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2" id="modal-item-title">
            <i data-lucide="package-plus"></i> <span id="modal-item-title-text">Añadir Objeto al Inventario</span>
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-item-modal">&times;</button>
        </div>

        <form id="form-sheet-add-item">
          <input type="hidden" id="input-edit-item-id" value="">
          <div class="mb-3">
            <label class="form-label small text-secondary mb-1">Cargar desde Catálogo Oficial:</label>
            <input type="text" id="input-filter-catalog-item" class="form-control form-control-sm bg-dark text-light border-secondary mb-1" placeholder="🔍 Escribe para buscar y filtrar objetos del catálogo...">
            <select id="select-preset-catalog-item" class="form-select form-select-sm bg-dark text-light border-secondary">
              <option value="">-- Seleccionar objeto predefinido (o escribir personalizado) --</option>
              <optgroup label="Armaduras y Escudos (PHB 2024)">
                ${DND55_ARMORS.filter(a => a.id !== 'sin_armadura').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(a => `
                  <option value="armor:${a.id}">${a.name} (CA ${a.baseAc}${a.maxDexBonus !== null ? ` + máx ${a.maxDexBonus} DES` : ''}) - ${a.weight} kg</option>
                `).join('')}
              </optgroup>
              <optgroup label="Armas Oficiales (PHB 2024)">
                ${DND55_WEAPONS.filter(w => w.id !== 'desarmado').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(w => `
                  <option value="weapon:${w.id}">${w.name} (${w.damage} ${w.damageType}) - Maestría: ${w.masteryProperty || 'Ninguna'}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Pergaminos de Conjuro por Nivel (D&D 5.5)">
                ${DND55_PRESET_ITEMS.filter(i => i.category === 'pergamino').slice().sort((a, b) => (a.scrollLevel ?? 0) - (b.scrollLevel ?? 0)).map(i => `
                  <option value="item:${i.id}">📜 ${i.name}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Sortilegios: Dones Sobrenaturales y Bastión (DMG 2024)">
                ${DND55_PRESET_ITEMS.filter(i => i.category === 'sortilegio').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(i => `
                  <option value="item:${i.id}">✨ ${i.name}${i.maxCharges ? ` (${i.maxCharges} usos)` : ''}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Pociones y Consumibles (PHB / DMG 2024)">
                ${DND55_PRESET_ITEMS.filter(i => i.category === 'consumible').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(i => `
                  <option value="item:${i.id}">🧪 ${i.name} - ${i.weight} kg</option>
                `).join('')}
              </optgroup>
              <optgroup label="Objetos Mágicos, Anillos, Varitas y Bastones (DMG / Tasha / Faerûn)">
                ${DND55_PRESET_ITEMS.filter(i => {
                  if (['artefacto', 'pergamino', 'sortilegio', 'consumible', 'equipo', 'herramientas'].includes(i.category)) return false;
                  const isMagic = ['magico', 'maravilloso', 'anillo', 'baston', 'varita'].includes(i.category) ||
                                  i.id.startsWith('magic_') ||
                                  (i.magicBonus !== undefined && i.magicBonus > 0) ||
                                  (Array.isArray(i.statModifiers) && i.statModifiers.length > 0) ||
                                  i.requiresAttunement;
                  const isBasicMundane = ['arma', 'armadura', 'escudo'].includes(i.category) && !i.id.startsWith('magic_') && !i.magicBonus && (!i.statModifiers || i.statModifiers.length === 0);
                  return isMagic && !isBasicMundane;
                }).slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(i => `
                  <option value="item:${i.id}">${i.name}${i.maxCharges ? ` (⚡ ${i.maxCharges} cargas)` : ''}${i.requiresAttunement ? ' [Sintonización]' : ''} - ${i.weight} kg</option>
                `).join('')}
              </optgroup>
              <optgroup label="Artefactos Legendarios (DMG 2024 / Faerûn)">
                ${DND55_PRESET_ITEMS.filter(i => i.category === 'artefacto').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(i => `
                  <option value="item:${i.id}">👑 ${i.name}${i.maxCharges ? ` (⚡ ${i.maxCharges} cargas)` : ''} (Artefacto) - ${i.weight} kg</option>
                `).join('')}
              </optgroup>
              <optgroup label="Equipo de Aventurero (PHB 2024)">
                ${DND55_PRESET_ITEMS.filter(i => i.category === 'equipo').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(i => `
                  <option value="item:${i.id}">${i.name}${i.maxCharges ? ` (${i.maxCharges} usos)` : ''} - ${i.weight} kg</option>
                `).join('')}
              </optgroup>
              <optgroup label="Herramientas y Útiles de Artesano (PHB 2024)">
                ${DND55_PRESET_ITEMS.filter(i => i.category === 'herramientas').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(i => `
                  <option value="item:${i.id}">${i.name} - ${i.weight} kg</option>
                `).join('')}
              </optgroup>
            </select>
          </div>

          <div class="row g-2 mb-3">
            <div class="col-md-7">
              <label class="form-label small text-secondary">Nombre del Objeto *</label>
              <input type="text" id="input-item-name" class="form-control form-control-sm bg-dark text-light border-secondary" required placeholder="Ej: Pergamino de Conjuro (Nv 1): Palabra de Curación">
            </div>
            <div class="col-md-5">
              <label class="form-label small text-secondary">Categoría</label>
              <select id="input-item-category" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="equipo">Equipo de Aventurero</option>
                <option value="herramientas">Herramientas / Útiles de Artesano</option>
                <option value="pergamino">📜 Pergamino de Conjuro (Nivel 0-9 + Conjuro)</option>
                <option value="sortilegio">✨ Sortilegio (Don Sobrenatural / Bastión DMG)</option>
                <option value="pocion">🧪 Poción / Consumible</option>
                <option value="armadura">Armadura Corporal</option>
                <option value="escudo">Escudo</option>
                <option value="arma">Arma</option>
                <option value="objeto_magico">Objeto Mágico / Maravilloso / Varita / Bastón</option>
                <option value="artefacto">👑 Artefacto Legendario</option>
              </select>
            </div>
          </div>

          <!-- Configurador de Pergaminos de Conjuro: 1º Nivel específico, 2º Conjuro de ese nivel (Requisito 2.2) -->
          <div id="section-scroll-fields" class="p-2 rounded bg-dark border border-info mb-3 d-none">
            <div class="small text-info fw-bold mb-2">📜 Configurar Pergamino de Conjuro (Elige Nivel y luego el Conjuro contenido):</div>
            <div class="row g-2 align-items-end">
              <div class="col-md-5">
                <label class="form-label small text-secondary mb-1">1. Nivel del Pergamino</label>
                <select id="select-scroll-level" class="form-select form-select-sm bg-secondary text-light border-dark">
                  ${(DND55_SCROLL_LEVEL_STATS || []).map(st => `
                    <option value="${st.level}">${st.label} (${st.rarity} • CD ${st.dc} • Atq +${st.attackBonus})</option>
                  `).join('')}
                </select>
              </div>
              <div class="col-md-7">
                <label class="form-label small text-secondary mb-1">2. Conjuro Contenido (Filtrado por Nivel)</label>
                <input type="text" id="input-filter-scroll-spell" class="form-control form-control-sm bg-secondary text-light border-dark mb-1" placeholder="🔍 Buscar conjuro de este nivel...">
                <select id="select-scroll-spell" class="form-select form-select-sm bg-secondary text-light border-dark">
                  <option value="">-- Seleccionar conjuro del nivel elegido --</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row g-2 mb-3">
            <div class="col-4">
              <label class="form-label small text-secondary">Cantidad</label>
              <input type="number" id="input-item-quantity" class="form-control form-control-sm bg-dark text-light border-secondary" value="1" min="1">
            </div>
            <div class="col-4">
              <label class="form-label small text-secondary">Peso Unitario (kg)</label>
              <input type="number" id="input-item-weight" class="form-control form-control-sm bg-dark text-light border-secondary" value="1" step="0.05" min="0">
            </div>
            <div class="col-4">
              <label class="form-label small text-secondary">Mejora Mágica (+)</label>
              <input type="number" id="input-item-magic-bonus" class="form-control form-control-sm bg-dark text-light border-secondary" value="0" min="0" max="5">
            </div>
          </div>

          <!-- Cargas del Objeto (Varitas, Bastones, Sortilegios, Objetos con Usos) -->
          <div class="p-2 rounded bg-dark border border-secondary mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="small fw-bold text-warning">⚡ Cargas / Usos del Objeto (Varitas, Bastones, Sortilegios, Reliquias)</span>
              <span class="text-muted" style="font-size: 0.7rem;">Si &gt; 0 aparece en el Master Panel</span>
            </div>
            <div class="row g-2">
              <div class="col-3">
                <label class="form-label small text-secondary mb-0">Cargas Máx.</label>
                <input type="number" id="input-item-max-charges" class="form-control form-control-sm bg-secondary text-light border-dark" value="0" min="0" max="100">
              </div>
              <div class="col-3">
                <label class="form-label small text-secondary mb-0">Cargas Act.</label>
                <input type="number" id="input-item-current-charges" class="form-control form-control-sm bg-secondary text-light border-dark" value="0" min="0" max="100">
              </div>
              <div class="col-6">
                <label class="form-label small text-secondary mb-0">Recuperación en Descanso Largo</label>
                <select id="input-item-charge-recovery" class="form-select form-select-sm bg-secondary text-light border-dark">
                  <option value="Todas en Descanso Largo">Todas en Descanso Largo</option>
                  <option value="1d6+4 en Descanso Largo">1d6+4 en Descanso Largo (Bastones)</option>
                  <option value="1d6+1 en Descanso Largo">1d6+1 en Descanso Largo (Varitas 7c)</option>
                  <option value="2d8+4 en Descanso Largo">2d8+4 en Descanso Largo (Bastón de Poder)</option>
                  <option value="4d6+2 en Descanso Largo">4d6+2 en Descanso Largo (Bastón Magos)</option>
                  <option value="1d4+4 en Descanso Largo">1d4+4 en Descanso Largo</option>
                  <option value="1d4+1 en Descanso Largo">1d4+1 en Descanso Largo</option>
                  <option value="1d3 en Descanso Largo">1d3 en Descanso Largo</option>
                  <option value="Sin recarga (Consumible)">Sin recarga / Consumible</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Campos condicionales para armas -->
          <div id="section-weapon-fields" class="row g-2 mb-3 p-2 rounded bg-dark border border-secondary d-none">
            <div class="col-4">
              <label class="form-label small text-secondary">Daño Base</label>
              <input type="text" id="input-item-damage" class="form-control form-control-sm bg-secondary text-light border-dark" placeholder="1d8">
            </div>
            <div class="col-4">
              <label class="form-label small text-secondary">Tipo de Daño</label>
              <select id="input-item-damage-type" class="form-select form-select-sm bg-secondary text-light border-dark">
                <option value="Cortante">Cortante</option>
                <option value="Perforante">Perforante</option>
                <option value="Contundente">Contundente</option>
                <option value="Fuego">Fuego</option>
                <option value="Frío">Frío</option>
                <option value="Relámpago">Relámpago</option>
                <option value="Radiante">Radiante</option>
                <option value="Necrótico">Necrótico</option>
                <option value="Psíquico">Psíquico</option>
                <option value="Fuerza">Fuerza</option>
              </select>
            </div>
            <div class="col-4">
              <label class="form-label small text-secondary">Maestría (5.5)</label>
              <input type="text" id="input-item-mastery" class="form-control form-control-sm bg-secondary text-light border-dark" placeholder="Ej: Derribar">
            </div>
          </div>

          <!-- Requisito 3.1: Múltiples Funciones / Cualidades y Múltiples Modificadores de Estadística -->
          <div class="p-2 rounded bg-dark border border-secondary mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="small fw-bold text-warning">🛠️ Funciones, Cualidades y Modificadores Múltiples (Legendarios / Artefactos)</span>
              <span class="text-muted" style="font-size: 0.7rem;">Añade tantas cualidades como necesites</span>
            </div>

            <!-- Sub-sección A: Modificadores numéricos a estadísticas -->
            <div class="mb-2 pb-2 border-bottom border-secondary">
              <div class="small text-light fw-semibold mb-1">A. Bonificadores a Estadísticas de la Hoja:</div>
              <div class="row g-1 align-items-center mb-1">
                <div class="col-5">
                  <select id="select-new-item-mod-target" class="form-select form-select-sm bg-secondary text-light border-dark">
                    <option value="ac">Clase de Armadura (CA)</option>
                    <option value="attackBonus">Ataque con Armas</option>
                    <option value="damageBonus">Daño con Armas</option>
                    <option value="unarmedAttack">Ataque sin Armas</option>
                    <option value="unarmedDamage">Daño sin Armas</option>
                    <option value="monkDc">CD de Rasgos de Monje</option>
                    <option value="spellAttack">Ataque de Conjuro</option>
                    <option value="spellDc">CD de Salvación de Conjuros</option>
                    <option value="savingThrows">Tiradas de Salvación (Global)</option>
                    <option value="initiative">Iniciativa</option>
                    <option value="speed">Velocidad (metros)</option>
                    <option value="hpMax">Puntos de Golpe Máximos</option>
                    <option value="str">Fuerza (FUE)</option>
                    <option value="dex">Destreza (DES)</option>
                    <option value="con">Constitución (CON)</option>
                    <option value="int">Inteligencia (INT)</option>
                    <option value="wis">Sabiduría (SAB)</option>
                    <option value="cha">Carisma (CAR)</option>
                  </select>
                </div>
                <div class="col-3">
                  <select id="select-new-item-mod-mode" class="form-select form-select-sm bg-secondary text-light border-dark">
                    <option value="bonus">+ Bonificador</option>
                    <option value="override_if_lower">Fijar Mínimo (ej. 19/21)</option>
                  </select>
                </div>
                <div class="col-2">
                  <input type="number" id="input-new-item-mod-val" class="form-control form-control-sm bg-secondary text-light border-dark text-center" value="1">
                </div>
                <div class="col-2">
                  <button type="button" id="btn-add-item-stat-mod" class="btn btn-xs btn-outline-info w-100 py-1">+ Bono</button>
                </div>
              </div>
              <div id="list-item-stat-modifiers" class="d-flex flex-wrap gap-1 mt-1"></div>
            </div>

            <!-- Sub-sección B: Múltiples Funciones / Poderes Activos o Pasivos -->
            <div>
              <div class="small text-light fw-semibold mb-1">B. Funciones, Poderes o Cualidades Especiales:</div>
              <div class="row g-1 align-items-center mb-1">
                <div class="col-4">
                  <input type="text" id="input-new-func-name" class="form-control form-control-sm bg-secondary text-light border-dark" placeholder="Nombre (ej. Aura Solar)">
                </div>
                <div class="col-3">
                  <select id="select-new-func-activation" class="form-select form-select-sm bg-secondary text-light border-dark">
                    <option value="Pasiva">Pasiva</option>
                    <option value="Acción">Acción</option>
                    <option value="Acción Adicional">Acción Adicional</option>
                    <option value="Reacción">Reacción</option>
                    <option value="1 Carga">Gasta 1 Carga</option>
                    <option value="2 Cargas">Gasta 2 Cargas</option>
                    <option value="3 Cargas">Gasta 3 Cargas</option>
                    <option value="1/Día">1 vez al Día</option>
                  </select>
                </div>
                <div class="col-3">
                  <input type="text" id="input-new-func-desc" class="form-control form-control-sm bg-secondary text-light border-dark" placeholder="Efecto o descripción...">
                </div>
                <div class="col-2">
                  <button type="button" id="btn-add-item-custom-func" class="btn btn-xs btn-outline-warning w-100 py-1">+ Función</button>
                </div>
              </div>
              <div id="list-item-custom-functions" class="d-flex flex-column gap-1 mt-1"></div>
            </div>
          </div>

          <!-- Requisito 3.2: Propiedades de Artefacto (Beneficios Menores/Mayores y Perjuicios Menores/Mayores DMG) -->
          <div id="section-artifact-properties" class="p-2 rounded bg-dark border border-warning mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="small fw-bold text-warning">👑 Propiedades de Artefacto (DMG: Beneficios y Perjuicios Menores / Mayores)</span>
              <span class="badge bg-warning text-dark" style="font-size: 0.65rem;">Creación de Artefactos</span>
            </div>
            <div class="row g-2 mb-2">
              <!-- Beneficio Menor -->
              <div class="col-md-6">
                <label class="form-label small text-info mb-0" style="font-size: 0.72rem;">🌟 Beneficio Menor</label>
                <div class="input-group input-group-sm">
                  <select id="select-art-minor-ben" class="form-select form-select-sm bg-secondary text-light border-dark">
                    <option value="">-- Elegir Beneficio Menor --</option>
                    ${(DND55_ARTIFACT_PROPERTIES?.minorBeneficial || []).map(p => `<option value="${p.id}">${p.name.replace(' (Beneficio Menor)', '')}</option>`).join('')}
                  </select>
                  <button type="button" class="btn btn-outline-info btn-add-art-prop" data-prop-group="minorBeneficial" data-select-id="select-art-minor-ben" title="Añadir seleccionado">+</button>
                  <button type="button" class="btn btn-outline-warning btn-rand-art-prop" data-prop-group="minorBeneficial" title="Añadir Beneficio Menor al azar">🎲</button>
                </div>
              </div>
              <!-- Beneficio Mayor -->
              <div class="col-md-6">
                <label class="form-label small text-success mb-0" style="font-size: 0.72rem;">✨ Beneficio Mayor</label>
                <div class="input-group input-group-sm">
                  <select id="select-art-major-ben" class="form-select form-select-sm bg-secondary text-light border-dark">
                    <option value="">-- Elegir Beneficio Mayor --</option>
                    ${(DND55_ARTIFACT_PROPERTIES?.majorBeneficial || []).map(p => `<option value="${p.id}">${p.name.replace(' (Beneficio Mayor)', '')}</option>`).join('')}
                  </select>
                  <button type="button" class="btn btn-outline-success btn-add-art-prop" data-prop-group="majorBeneficial" data-select-id="select-art-major-ben" title="Añadir seleccionado">+</button>
                  <button type="button" class="btn btn-outline-warning btn-rand-art-prop" data-prop-group="majorBeneficial" title="Añadir Beneficio Mayor al azar">🎲</button>
                </div>
              </div>
              <!-- Perjuicio Menor -->
              <div class="col-md-6">
                <label class="form-label small text-warning mb-0" style="font-size: 0.72rem;">⚠️ Perjuicio Menor</label>
                <div class="input-group input-group-sm">
                  <select id="select-art-minor-det" class="form-select form-select-sm bg-secondary text-light border-dark">
                    <option value="">-- Elegir Perjuicio Menor --</option>
                    ${(DND55_ARTIFACT_PROPERTIES?.minorDetrimental || []).map(p => `<option value="${p.id}">${p.name.replace(' (Perjuicio Menor)', '')}</option>`).join('')}
                  </select>
                  <button type="button" class="btn btn-outline-warning btn-add-art-prop" data-prop-group="minorDetrimental" data-select-id="select-art-minor-det" title="Añadir seleccionado">+</button>
                  <button type="button" class="btn btn-outline-secondary btn-rand-art-prop" data-prop-group="minorDetrimental" title="Añadir Perjuicio Menor al azar">🎲</button>
                </div>
              </div>
              <!-- Perjuicio Mayor -->
              <div class="col-md-6">
                <label class="form-label small text-danger mb-0" style="font-size: 0.72rem;">☠️ Perjuicio Mayor</label>
                <div class="input-group input-group-sm">
                  <select id="select-art-major-det" class="form-select form-select-sm bg-secondary text-light border-dark">
                    <option value="">-- Elegir Perjuicio Mayor --</option>
                    ${(DND55_ARTIFACT_PROPERTIES?.majorDetrimental || []).map(p => `<option value="${p.id}">${p.name.replace(' (Perjuicio Mayor)', '')}</option>`).join('')}
                  </select>
                  <button type="button" class="btn btn-outline-danger btn-add-art-prop" data-prop-group="majorDetrimental" data-select-id="select-art-major-det" title="Añadir seleccionado">+</button>
                  <button type="button" class="btn btn-outline-secondary btn-rand-art-prop" data-prop-group="majorDetrimental" title="Añadir Perjuicio Mayor al azar">🎲</button>
                </div>
              </div>
            </div>
            <div id="list-item-artifact-properties" class="d-flex flex-column gap-1"></div>
          </div>

          <div class="mb-3">
            <label class="form-label small text-secondary">Descripción / Efecto General</label>
            <textarea id="input-item-desc" class="form-control form-control-sm bg-dark text-light border-secondary" rows="2" placeholder="Notas sobre el objeto..."></textarea>
          </div>

          <div class="d-flex flex-wrap gap-4 mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="check-item-attunement">
              <label class="form-check-label small text-light" for="check-item-attunement">
                Requiere Sintonización (Attunement)
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="check-item-equip-now" checked>
              <label class="form-check-label small text-warning fw-bold" for="check-item-equip-now">
                Equipar de inmediato al guardar
              </label>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-item-modal">Cancelar</button>
            <button type="submit" id="btn-save-item-modal" class="btn btn-sm btn-warning text-dark fw-bold">Guardar en Inventario</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Añadir / Editar Dones y Bendiciones Personalizadas -->
      <dialog id="modal-sheet-add-trait" class="rpg-dialog p-3">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2" id="title-trait-modal">
            <i data-lucide="sparkles"></i> Añadir Don, Rasgo o Bendición Divina
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-trait-modal">&times;</button>
        </div>

        <form id="form-sheet-add-trait">
          <input type="hidden" id="input-trait-id" value="">
          <div class="mb-3">
            <label class="form-label small text-secondary">Plantilla de Bendición Predefinida:</label>
            <select id="select-preset-trait" class="form-select form-select-sm bg-dark text-light border-secondary">
              <option value="">-- Personalizado / Escribir manualmente --</option>
              <option value="blessing_health_con">Bendición de la Salud (Ilmáter) - [+2 CON Permanente]</option>
              <option value="blessing_health_hp">Bendición de la Salud (Vitalidad) - [+10 PG Máximos]</option>
              <option value="blessing_protection">Bendición de Protección (Helm) - [+1 CA, +1 Salvaciones]</option>
              <option value="blessing_strength">Bendición de Fuerza Titánica (Kord) - [Fuerza 21 Mínima]</option>
              <option value="blessing_understanding">Bendición de la Sabiduría Trascendental (Oghma) - [+2 SAB Permanente]</option>
              <option value="blessing_quickness">Bendición de la Rapidez de los Vientos (Akadi) - [+2 DES Permanente]</option>
              <option value="blessing_cosmic">Bendición de la Mente Cósmica (Mystra) - [+2 INT Permanente]</option>
            </select>
          </div>

          <div class="row g-2 mb-3">
            <div class="col-md-7">
              <label class="form-label small text-secondary">Nombre del Don / Rasgo *</label>
              <input type="text" id="input-trait-name" class="form-control form-control-sm bg-dark text-light border-secondary" required placeholder="Ej: Bendición de la Salud">
            </div>
            <div class="col-md-5">
              <label class="form-label small text-secondary">Fuente / Origen</label>
              <input type="text" id="input-trait-source" class="form-control form-control-sm bg-dark text-light border-secondary" value="Bendición Divina" placeholder="Ej: Don Sobrenatural">
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label small text-secondary">Descripción de los Efectos</label>
            <textarea id="input-trait-desc" class="form-control form-control-sm bg-dark text-light border-secondary" rows="2" placeholder="Otorga un aumento permanente de +2 a la Constitución..."></textarea>
          </div>

          <!-- Modificador Numérico a las Estadísticas de la Hoja -->
          <div class="p-3 rounded bg-dark border border-secondary mb-3">
            <div class="text-warning small fw-bold mb-2">Modificador de Estadísticas para la Ficha:</div>
            <div class="row g-2">
              <div class="col-md-5">
                <label class="form-label small text-secondary">Estadística Modificada</label>
                <select id="input-trait-target" class="form-select form-select-sm bg-secondary text-light border-dark">
                  <option value="none">Ninguna (Solo descriptivo)</option>
                  <option value="con" selected>Constitución (+CON)</option>
                  <option value="str">Fuerza (+FUE)</option>
                  <option value="dex">Destreza (+DES)</option>
                  <option value="int">Inteligencia (+INT)</option>
                  <option value="wis">Sabiduría (+SAB)</option>
                  <option value="cha">Carisma (+CAR)</option>
                  <option value="ac">Clase de Armadura (+CA)</option>
                  <option value="hpMax">Puntos de Golpe Máximos (+PG)</option>
                  <option value="savingThrows">Tiradas de Salvación (+Global)</option>
                  <option value="initiative">Iniciativa (+Bonus)</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label small text-secondary">Modo de Aplicación</label>
                <select id="input-trait-mode" class="form-select form-select-sm bg-secondary text-light border-dark">
                  <option value="bonus" selected>Bonificador Numérico (+X)</option>
                  <option value="override_if_lower">Fijar Puntuación Mínima (Ej: 21)</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label small text-secondary">Valor</label>
                <input type="number" id="input-trait-value" class="form-control form-control-sm bg-secondary text-light border-dark" value="2">
              </div>
            </div>
            <div class="rpg-subdesc text-muted mt-2">
              * El modificador se reflejará dinámicamente en las características, CA, PG, salvaciones y habilidades en tiempo real.
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-trait-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold" id="btn-submit-trait-modal">Guardar Rasgo / Don</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Modificar Monedas / Riqueza -->
      <dialog id="modal-sheet-edit-currency" class="rpg-dialog p-4" style="max-width: 480px; width: 90%;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="coins"></i> Riqueza y Monedas del Personaje
          </h5>
          <button type="button" class="btn-close btn-close-white" id="btn-close-currency-modal"></button>
        </div>
        <form id="form-sheet-edit-currency">
          <div class="row g-3 mb-3">
            <div class="col-6">
              <label class="form-label small text-warning fw-bold">🪙 Piezas de Oro (po)</label>
              <input type="number" id="input-cur-gp" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="${currency.gp || 0}">
            </div>
            <div class="col-6">
              <label class="form-label small text-light fw-bold">🥈 Piezas de Plata (pp)</label>
              <input type="number" id="input-cur-sp" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="${currency.sp || 0}">
            </div>
            <div class="col-4">
              <label class="form-label small text-warning-emphasis fw-bold">🥉 Piezas de Cobre (pc)</label>
              <input type="number" id="input-cur-cp" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="${currency.cp || 0}">
            </div>
            <div class="col-4">
              <label class="form-label small text-secondary fw-bold">⚡ Piezas de Electro (pe)</label>
              <input type="number" id="input-cur-ep" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="${currency.ep || 0}">
            </div>
            <div class="col-4">
              <label class="form-label small text-info fw-bold">💎 Piezas de Platino (ppt)</label>
              <input type="number" id="input-cur-pp" class="form-control form-control-sm bg-dark text-light border-secondary" min="0" value="${currency.pp || 0}">
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-currency-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Monedas</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Añadir Idioma -->
      <dialog id="modal-sheet-add-language" class="rpg-dialog p-4" style="max-width: 440px; width: 90%;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="languages"></i> Añadir Idioma Conocido
          </h5>
          <button type="button" class="btn-close btn-close-white" id="btn-close-language-modal"></button>
        </div>
        <form id="form-sheet-add-language">
          <div class="mb-3">
            <label class="form-label small text-secondary">Elegir de la lista estándar de D&amp;D 5.5</label>
            <select id="select-standard-language" class="form-select form-select-sm bg-secondary text-light border-dark mb-2">
              <option value="">-- Seleccionar idioma estándar --</option>
              ${DND55_STANDARD_LANGUAGES.map(l => `<option value="${escapeHtml(l)}">${escapeHtml(l)}</option>`).join('')}
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label small text-secondary">O escribir idioma personalizado</label>
            <input type="text" id="input-custom-language" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Dracónico Antiguo">
          </div>
          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-language-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Añadir Idioma</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Añadir Herramienta -->
      <dialog id="modal-sheet-add-tool" class="rpg-dialog p-4" style="max-width: 440px; width: 90%;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="wrench"></i> Añadir Competencia en Herramientas
          </h5>
          <button type="button" class="btn-close btn-close-white" id="btn-close-tool-modal"></button>
        </div>
        <form id="form-sheet-add-tool">
          <div class="mb-3">
            <label class="form-label small text-secondary">Elegir herramienta estándar</label>
            <select id="select-standard-tool" class="form-select form-select-sm bg-secondary text-light border-dark mb-2">
              <option value="">-- Seleccionar herramienta estándar --</option>
              ${DND55_TOOL_PROFICIENCIES.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('')}
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label small text-secondary">O escribir herramienta personalizada</label>
            <input type="text" id="input-custom-tool" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Kit de Venenos">
          </div>
          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-tool-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Añadir Herramienta</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Añadir Conjuro o Truco al Grimorio -->
      <dialog id="modal-sheet-add-spell" class="rpg-dialog p-3" style="max-width: 580px; width: 95%;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="sparkles"></i> Añadir Conjuro o Truco
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-spell-modal">&times;</button>
        </div>

        <form id="form-sheet-add-spell">
          <div class="mb-3">
            <label class="form-label small text-secondary mb-1">Cargar desde Catálogo Oficial (PHB 2024):</label>
            <input type="text" id="input-filter-catalog-spell" class="form-control form-control-sm bg-dark text-light border-secondary mb-1" placeholder="🔍 Escribe para buscar y filtrar conjuros del catálogo...">
            <select id="select-preset-catalog-spell" class="form-select form-select-sm bg-dark text-light border-secondary">
              <option value="">-- Seleccionar conjuro oficial (o rellenar manual) --</option>
              <optgroup label="Trucos (Nivel 0)">
                ${DND55_CANONICAL_SPELLS.filter(s => s.level === 0).slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(s => `
                  <option value="${s.id}">${s.name} (${s.school || 'Truco'}) - ${s.castingTime}, ${s.range}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Nivel 1">
                ${DND55_CANONICAL_SPELLS.filter(s => s.level === 1).slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(s => `
                  <option value="${s.id}">${s.name} (${s.school}) - ${s.castingTime}, ${s.range}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Nivel 2">
                ${DND55_CANONICAL_SPELLS.filter(s => s.level === 2).slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(s => `
                  <option value="${s.id}">${s.name} (${s.school}) - ${s.castingTime}, ${s.range}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Nivel 3">
                ${DND55_CANONICAL_SPELLS.filter(s => s.level === 3).slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(s => `
                  <option value="${s.id}">${s.name} (${s.school}) - ${s.castingTime}, ${s.range}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Nivel 4 o superior">
                ${DND55_CANONICAL_SPELLS.filter(s => s.level >= 4).slice().sort((a, b) => (a.level - b.level) || a.name.localeCompare(b.name, 'es')).map(s => `
                  <option value="${s.id}">${s.name} (Nv ${s.level} - ${s.school}) - ${s.castingTime}</option>
                `).join('')}
              </optgroup>
            </select>
          </div>

          <div class="row g-2 mb-2">
            <div class="col-md-8">
              <label class="form-label small text-secondary">Nombre del Conjuro *</label>
              <input type="text" id="input-spell-name" class="form-control form-control-sm bg-dark text-light border-secondary" required placeholder="Ej: Curar Heridas">
            </div>
            <div class="col-md-4">
              <label class="form-label small text-secondary">Nivel</label>
              <select id="input-spell-level" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="0">Truco (Nv 0)</option>
                <option value="1" selected>Nivel 1</option>
                <option value="2">Nivel 2</option>
                <option value="3">Nivel 3</option>
                <option value="4">Nivel 4</option>
                <option value="5">Nivel 5</option>
                <option value="6">Nivel 6</option>
                <option value="7">Nivel 7</option>
                <option value="8">Nivel 8</option>
                <option value="9">Nivel 9</option>
              </select>
            </div>
          </div>

          <div class="row g-2 mb-2">
            <div class="col-md-6">
              <label class="form-label small text-secondary">Escuela de Magia</label>
              <select id="input-spell-school" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="Evocación">Evocación</option>
                <option value="Abjuración">Abjuración</option>
                <option value="Conjuración">Conjuración</option>
                <option value="Adivinación">Adivinación</option>
                <option value="Encantamiento">Encantamiento</option>
                <option value="Ilusión">Ilusión</option>
                <option value="Nigromancia">Nigromancia</option>
                <option value="Transmutación">Transmutación</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-secondary">Tiempo de Lanzamiento</label>
              <input type="text" id="input-spell-time" class="form-control form-control-sm bg-dark text-light border-secondary" value="1 acción" placeholder="Ej: 1 acción, 1 acción adicional">
            </div>
          </div>

          <div class="row g-2 mb-2">
            <div class="col-md-6">
              <label class="form-label small text-secondary">Alcance / Distancia</label>
              <input type="text" id="input-spell-range" class="form-control form-control-sm bg-dark text-light border-secondary" value="18 m" placeholder="Ej: 18 m, Personal, Toque">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-secondary">Duración</label>
              <input type="text" id="input-spell-duration" class="form-control form-control-sm bg-dark text-light border-secondary" value="Instantáneo" placeholder="Ej: Instantáneo, Concentración hasta 1 min">
            </div>
          </div>

          <div class="mb-2">
            <label class="form-label small text-secondary">Descripción y Efectos</label>
            <textarea id="input-spell-desc" class="form-control form-control-sm bg-dark text-light border-secondary" rows="3" placeholder="Describe los efectos del conjuro..."></textarea>
          </div>

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="check-spell-is-attack">
            <label class="form-check-label small text-info fw-semibold" for="check-spell-is-attack">
              ⚔️ Seleccionar como Conjuro de Ataque (mostrar en la tabla de ATAQUES Y ARMAS EQUIPADAS)
            </label>
          </div>

          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-secondary" id="btn-cancel-spell-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Conjuro</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Mejora de Puntos de Golpe por Nivel (Media o Tirada de Dado) -->
      <dialog id="modal-sheet-hp-levels" class="rpg-dialog p-3" style="max-width: 650px; width: 95%;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="heart-pulse"></i> Mejora de Vida por Nivel (${escapeHtml(char.name)})
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-hp-levels-modal">&times;</button>
        </div>

        <div class="p-2 rounded bg-dark border border-secondary mb-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div class="small">
            <div>
              <span class="text-secondary">Clase:</span> <strong class="text-light">${escapeHtml(className)}</strong>
              &bull; <span class="text-secondary">Dado:</span> <strong class="text-warning">1d${hitDie}</strong>
              &bull; <span class="text-secondary">Media Fija (5.5):</span> <strong class="text-warning">${Math.floor(hitDie / 2) + 1}</strong>
              &bull; <span class="text-secondary">Mod. CON:</span> <strong class="text-info">${formatModifier(getAbilityModifier(scores.con))}</strong>
            </div>
            <div class="d-flex align-items-center gap-2 mt-1">
              <span class="text-secondary small">Nivel del Personaje:</span>
              <span class="badge bg-warning text-dark fw-bold">Nv. ${char.level}</span>
              <span class="badge bg-danger ms-1" style="font-size: 0.85rem;">Total Máx: ${hpInfo.maxHp} PG</span>
            </div>
          </div>

          ${char.level > 1 ? `
            <div class="d-flex gap-1">
              <button type="button" id="btn-hp-modal-all-avg" class="btn btn-xs btn-outline-warning" title="Aplicar la media fija (${Math.floor(hitDie / 2) + 1}) a todos los niveles del 2 al ${char.level}">
                📏 Media en Todos (${Math.floor(hitDie / 2) + 1})
              </button>
              <button type="button" id="btn-hp-modal-roll-all" class="btn btn-xs btn-outline-info" title="Tirar 1d${hitDie} en todos los niveles del 2 al ${char.level}">
                🎲 Tirar Todos (d${hitDie})
              </button>
            </div>
          ` : ''}
        </div>

        <div class="table-responsive mb-3" style="max-height: 340px; overflow-y: auto;">
          <table class="table table-dark table-sm table-bordered align-middle mb-0 small">
            <thead>
              <tr class="text-secondary text-center">
                <th style="width: 70px;">Nivel</th>
                <th>Método de Mejora</th>
                <th style="width: 195px;">Valor del Dado (1d${hitDie})</th>
                <th style="width: 75px;">Mod. CON</th>
                <th style="width: 90px;">PG Ganados</th>
              </tr>
            </thead>
            <tbody>
              ${(hpInfo.breakdown || []).map(b => {
                const defaultAvg = Math.floor(hitDie / 2) + 1;
                if (b.level === 1) {
                  return `
                    <tr>
                      <td class="text-center fw-bold text-warning">Nivel 1</td>
                      <td><span class="badge bg-secondary">Máximo Fijo Inicial (Regla D&amp;D 5.5)</span></td>
                      <td class="text-center text-light fw-bold">${b.roll} <span class="text-muted">(Máx d${hitDie})</span></td>
                      <td class="text-center text-info fw-bold">${formatModifier(b.conMod)}</td>
                      <td class="text-center"><span class="badge bg-success fs-6">+${b.total} PG</span></td>
                    </tr>
                  `;
                }
                const isRoll = b.mode === 'roll';
                return `
                  <tr>
                    <td class="text-center fw-bold text-light">Nivel ${b.level}</td>
                    <td>
                      <div class="btn-group btn-group-sm w-100" role="group">
                        <button type="button" class="btn btn-xs ${!isRoll ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-hp-level-mode" data-level="${b.level}" data-mode="average">
                          📏 Media (${defaultAvg})
                        </button>
                        <button type="button" class="btn btn-xs ${isRoll ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary'} btn-hp-level-mode" data-level="${b.level}" data-mode="roll">
                          🎲 Dado
                        </button>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center justify-content-center gap-1">
                        <select class="form-select form-select-sm bg-dark text-light border-secondary py-0 px-1 text-center fw-bold select-hp-level-die" data-level="${b.level}" style="width: 92px; height: 26px; font-size: 0.8rem;" title="Elegir valor obtenido en el d${hitDie}">
                          ${Array.from({ length: hitDie }, (_, i) => i + 1).map(val => `
                            <option value="${val}" ${b.roll === val ? 'selected' : ''}>${val}${val === defaultAvg ? ' (Media)' : ''}</option>
                          `).join('')}
                        </select>
                        <button type="button" class="btn btn-xs btn-outline-info btn-hp-level-roll" data-level="${b.level}" title="Lanzar 1d${hitDie} para Nivel ${b.level}">
                          🎲 Tirar d${hitDie}
                        </button>
                      </div>
                    </td>
                    <td class="text-center text-info fw-bold">${formatModifier(b.conMod)}</td>
                    <td class="text-center"><span class="badge bg-success" style="font-size: 0.82rem;">+${b.total} PG</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          ${char.level === 1 ? `
            <div class="p-2 mt-2 rounded bg-black border border-secondary text-secondary small text-center">
              ℹ️ A <strong>Nivel 1</strong> siempre recibes el máximo de tu Dado de Golpe (<strong>${hitDie}</strong>) + tu modificador de Constitución. A partir de Nivel 2 podrás elegir entre la <strong>Media (${Math.floor(hitDie / 2) + 1})</strong> o <strong>Tirar 1d${hitDie}</strong> por cada nivel que subas.
            </div>
          ` : ''}
        </div>

        <div class="p-2 rounded bg-black border border-secondary small text-secondary mb-3">
          <strong class="text-warning">Desglose Total:</strong> ${escapeHtml(hpInfo.formula)}
        </div>

        <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-2">
          <button type="button" class="btn btn-sm btn-warning text-dark fw-bold" id="btn-done-hp-levels-modal">Listo</button>
        </div>
      </dialog>

      <!-- Diálogo Modal: Editar Aspecto Físico -->
      <dialog id="modal-sheet-edit-appearance" class="rpg-dialog p-3" style="max-width: 650px; width: 95%; max-height: 90vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="user"></i> Editar Aspecto Físico
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-appearance-modal">&times;</button>
        </div>
        <form id="form-sheet-edit-appearance">
          <div class="row g-2 mb-3">
            <div class="col-sm-4">
              <label class="form-label small text-warning fw-bold mb-1">Edad</label>
              <input type="text" id="input-app-age" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: 28 años">
            </div>
            <div class="col-sm-4">
              <label class="form-label small text-warning fw-bold mb-1">Género / Sexo</label>
              <input type="text" id="input-app-gender" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Femenino, Masculino">
            </div>
            <div class="col-sm-4">
              <label class="form-label small text-warning fw-bold mb-1">Altura</label>
              <input type="text" id="input-app-height" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: 1,75 m">
            </div>
            <div class="col-sm-4">
              <label class="form-label small text-warning fw-bold mb-1">Peso</label>
              <input type="text" id="input-app-weight" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: 70 kg">
            </div>
            <div class="col-sm-4">
              <label class="form-label small text-warning fw-bold mb-1">Color de Ojos</label>
              <input type="text" id="input-app-eyes" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Azules, Ámbar">
            </div>
            <div class="col-sm-4">
              <label class="form-label small text-warning fw-bold mb-1">Tono de Piel</label>
              <input type="text" id="input-app-skin" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Bronceada, Pálida">
            </div>
            <div class="col-12">
              <label class="form-label small text-warning fw-bold mb-1">Cabello / Pelo</label>
              <input type="text" id="input-app-hair" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Ej: Castaño oscuro, largo y ondulado">
            </div>
            <div class="col-12">
              <label class="form-label small text-warning fw-bold mb-1">Descripción y Rasgos Distintivos</label>
              <textarea id="input-app-desc" rows="4" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Describe tatuajes, cicatrices, porte, estilo de vestimenta o rasgos singulares..."></textarea>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-appearance-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Aspecto</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Editar Historia y Personalidad -->
      <dialog id="modal-sheet-edit-personality" class="rpg-dialog p-3" style="max-width: 720px; width: 95%; max-height: 90vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="book-open"></i> Editar Historia y Personalidad
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-personality-modal">&times;</button>
        </div>
        <form id="form-sheet-edit-personality">
          <div class="row g-2 mb-3">
            <div class="col-md-6">
              <label class="form-label small text-warning fw-bold mb-1">Rasgos de Personalidad</label>
              <textarea id="input-pers-traits" rows="2" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Comportamiento, manías, modales o forma de hablar..."></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-warning fw-bold mb-1">Ideales</label>
              <textarea id="input-pers-ideals" rows="2" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Principios morales, creencias o metas supremas..."></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-warning fw-bold mb-1">Vínculos</label>
              <textarea id="input-pers-bonds" rows="2" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Lazos afectivos, lugares queridos, promesas o deudas..."></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-warning fw-bold mb-1">Defectos</label>
              <textarea id="input-pers-flaws" rows="2" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Debilidades, vicios, miedos o debilidades de carácter..."></textarea>
            </div>
            <div class="col-12">
              <label class="form-label small text-warning fw-bold mb-1">Aliados y Organizaciones</label>
              <textarea id="input-pers-allies" rows="2" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="Facciones, cofradías, templos, mentores o protectores..."></textarea>
            </div>
            <div class="col-12">
              <label class="form-label small text-warning fw-bold mb-1">Historia del Personaje (Biografía)</label>
              <textarea id="input-pers-backstory" rows="5" class="form-control form-control-sm bg-dark text-light border-secondary" placeholder="El origen del personaje, sus vivencias pasadas y lo que le impulsó a aventurarse..."></textarea>
            </div>
          </div>
          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-personality-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Historia</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Gestionar Pericias y Competencias de Habilidades -->
      <dialog id="modal-sheet-edit-skills" class="rpg-dialog p-3" style="max-width: 680px; width: 95%; max-height: 90vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="award"></i> Configurar Pericias y Competencias
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-skills-modal">&times;</button>
        </div>

        <form id="form-sheet-edit-skills">
          <div class="p-2 mb-3 rounded bg-dark border border-secondary text-secondary small d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              ⭐ <strong>Pericia (D&amp;D 5.5):</strong> Duplica tu Bonificador de Competencia (+${pb * 2} en vez de +${pb}) en las habilidades que elijas.
            </div>
            <div id="skills-modal-expertise-badge" class="badge bg-warning text-dark fs-6">
              Pericias máximas: <strong id="skills-modal-max-exp">${getMaxAllowedExpertiseCount(char)}</strong>
            </div>
          </div>

          <div class="table-responsive" style="max-height: 440px; overflow-y: auto;">
            <table class="table table-dark table-sm table-hover align-middle mb-0 small">
              <thead>
                <tr class="text-secondary border-bottom border-secondary">
                  <th>Habilidad</th>
                  <th class="text-center" style="width: 70px;">Atributo</th>
                  <th class="text-center" style="width: 140px;">Entrenamiento</th>
                  <th class="text-center" style="width: 130px;">Pericia (2x BC)</th>
                </tr>
              </thead>
              <tbody id="skills-modal-tbody">
                <!-- Se rellena dinámicamente -->
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-between align-items-center border-top border-secondary pt-3 mt-3">
            <span class="small text-secondary" id="skills-modal-summary"></span>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-skills-modal">Cancelar</button>
              <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Habilidades</button>
            </div>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Modificar Identidad y Origen (Nombre, Jugador, Especie, Trasfondo, Alineamiento) -->
      <dialog id="modal-sheet-edit-identity" class="rpg-dialog p-3" style="max-width: 650px; width: 95%; max-height: 90vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="user-cog"></i> Editar Datos de Identidad y Origen
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-identity-modal">&times;</button>
        </div>

        <form id="form-sheet-edit-identity">
          <div class="row g-2 mb-3">
            <div class="col-md-6">
              <label class="form-label small text-secondary mb-1">Nombre del Personaje *</label>
              <input type="text" id="input-edit-char-name" class="form-control form-control-sm bg-dark text-light border-secondary" required value="${escapeHtml(char.name || '')}">
            </div>
            <div class="col-md-6">
              <label class="form-label small text-secondary mb-1">Nombre del Jugador</label>
              <input type="text" id="input-edit-player-name" class="form-control form-control-sm bg-dark text-light border-secondary" value="${escapeHtml(char.playerName || '')}">
            </div>
          </div>

          <div class="row g-2 mb-3">
            <div class="col-md-6">
              <label class="form-label small text-secondary mb-1">Especie</label>
              <select id="select-edit-species" class="form-select form-select-sm bg-dark text-light border-secondary">
                ${DND55_SPECIES.map(sp => `
                  <option value="${sp.id}" ${char.speciesId === sp.id ? 'selected' : ''}>${sp.name} (${sp.size})</option>
                `).join('')}
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-secondary mb-1">Alineamiento</label>
              <select id="select-edit-alignment" class="form-select form-select-sm bg-dark text-light border-secondary">
                ${[
                  'Legal Bueno', 'Neutral Bueno', 'Caótico Bueno',
                  'Legal Neutral', 'Neutral', 'Neutral Puro', 'Caótico Neutral',
                  'Legal Maligno', 'Neutral Maligno', 'Caótico Maligno'
                ].map(al => `
                  <option value="${al}" ${char.alignment === al ? 'selected' : ''}>${al}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label small text-secondary mb-1">Trasfondo (D&amp;D 5.5)</label>
            <select id="select-edit-background" class="form-select form-select-sm bg-dark text-light border-secondary">
              <optgroup label="Trasfondos Oficiales (PHB 2024 / Faerûn)">
                ${DND55_BACKGROUNDS.map(bg => `
                  <option value="${bg.id}" ${char.backgroundId === bg.id ? 'selected' : ''}>${bg.name} (Dote: ${bg.originFeat})</option>
                `).join('')}
              </optgroup>
              <option value="personalizado" ${char.backgroundId === 'personalizado' ? 'selected' : ''}>✨ Trasfondo Personalizado</option>
            </select>
          </div>

          <div class="mb-3 ${char.backgroundId === 'personalizado' ? '' : 'd-none'}" id="container-custom-bg-name">
            <label class="form-label small text-secondary mb-1">Nombre del Trasfondo Personalizado</label>
            <input type="text" id="input-edit-custom-bg-name" class="form-control form-control-sm bg-dark text-light border-secondary" value="${escapeHtml(char.customBackground?.name || char.customBackgroundName || '')}" placeholder="Ej: Explorador de Mazmorras">
          </div>

          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3 mt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-identity-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Identidad</button>
          </div>
        </form>
      </dialog>

      <!-- Diálogo Modal: Modificar Características Base y Mejoras de Trasfondo -->
      <dialog id="modal-sheet-edit-abilities" class="rpg-dialog p-3" style="max-width: 720px; width: 95%; max-height: 92vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2">
            <i data-lucide="sliders"></i> Modificar Características y Mejoras de Trasfondo
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-abilities-modal">&times;</button>
        </div>

        <form id="form-sheet-edit-abilities">
          <div class="p-2 mb-3 rounded bg-dark border border-secondary text-secondary small">
            ⚖️ <strong>Reglas D&amp;D 5.5 (PHB 2024):</strong> Introduce tus puntuaciones base generadas (por tirada, compra por puntos o matriz estándar) y asigna las mejoras otorgadas por el trasfondo (+2 / +1 o +1 / +1 / +1).
          </div>

          <h6 class="text-warning small fw-bold mb-2 text-uppercase">1. Puntuaciones Base Iniciales:</h6>
          <div class="row g-2 mb-3 text-center">
            ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(ab => `
              <div class="col-4 col-sm-2">
                <label class="form-label small text-secondary mb-1 fw-bold">${getAbilityShortName(ab)}</label>
                <input type="number" id="input-base-${ab}" class="form-control form-control-sm bg-dark text-light border-secondary text-center fw-bold input-modal-base-stat" data-ability="${ab}" value="${char.baseAbilityScores?.[ab] ?? 10}" min="1" max="30" required>
              </div>
            `).join('')}
          </div>

          <h6 class="text-warning small fw-bold mb-2 text-uppercase">2. Mejoras de Característica por Trasfondo (D&amp;D 5.5):</h6>
          <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary mb-3">
            <div class="row g-2 align-items-center mb-2">
              <div class="col-sm-5">
                <label class="form-label small text-secondary mb-1">Modo de Aumento:</label>
                <select id="select-boost-mode" class="form-select form-select-sm bg-dark text-light border-secondary">
                  <option value="2_1" ${(char.backgroundBoostMode !== '1_1_1') ? 'selected' : ''}>+2 a una, +1 a otra (+2 / +1)</option>
                  <option value="1_1_1" ${(char.backgroundBoostMode === '1_1_1') ? 'selected' : ''}>+1 a tres distintas (+1 / +1 / +1)</option>
                </select>
              </div>
              <div class="col-sm-7" id="container-boost-selectors">
                <!-- Se llena dinámicamente -->
              </div>
            </div>
          </div>

          <h6 class="text-warning small fw-bold mb-2 text-uppercase">3. Vista Previa de Puntuaciones Finales Resultantes:</h6>
          <div class="table-responsive mb-3">
            <table class="table table-dark table-sm table-bordered text-center align-middle mb-0 small">
              <thead>
                <tr class="text-secondary">
                  <th>Característica</th>
                  <th>Base</th>
                  <th>Trasfondo</th>
                  <th>Dotes / Dones</th>
                  <th>Total Final</th>
                  <th>Modificador</th>
                </tr>
              </thead>
              <tbody id="preview-abilities-tbody">
                <!-- Se llena dinámicamente en tiempo real -->
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-abilities-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold">Guardar Características</button>
          </div>
        </form>
      </dialog>

      <!-- Modal Editar Elecciones de Dote -->
      <dialog id="modal-sheet-edit-feat-choice" class="rpg-dialog p-3" style="max-width: 650px; width: 95%; max-height: 90vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center border-bottom border-warning pb-2 mb-3">
          <h5 class="m-0 text-warning d-flex align-items-center gap-2" id="modal-feat-choice-title">
            <i data-lucide="sliders"></i> Editar Elecciones de Dote
          </h5>
          <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-close-feat-choice-modal">&times;</button>
        </div>

        <form id="form-sheet-edit-feat-choice">
          <div class="p-2 mb-3 rounded bg-dark border border-secondary" id="modal-feat-choice-info">
            <!-- Nombre de dote, categoría y descripción -->
          </div>

          <div id="container-feat-choice-fields" class="d-flex flex-column gap-3 mb-3">
            <!-- Campos dinámicos según el tipo de dote -->
          </div>

          <div class="d-flex justify-content-end gap-2 border-top border-secondary pt-3">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btn-cancel-feat-choice-modal">Cancelar</button>
            <button type="submit" class="btn btn-sm btn-warning text-dark fw-bold" id="btn-save-feat-choice">Guardar Elecciones</button>
          </div>
        </form>
      </dialog>
    `;
  }

  /**
   * Obtiene la lista de armas equipadas desde inventario y desde char.equippedWeapons.
   */
  getEquippedWeapons(char) {
    const list = [];
    const addedIds = new Set();

    // 1. Armas equipadas en el inventario
    (char.inventory || []).forEach(item => {
      const isWeapon = item.isEquipped && (item.category === 'arma' || item.weaponType || DND55_WEAPONS.some(w => w.id === item.id));
      if (isWeapon) {
        list.push(item);
        addedIds.add(item.id);
        if (item.weaponType) addedIds.add(item.weaponType);
      }
    });

    // 2. Armas en char.equippedWeapons que no estén cubiertas
    (char.equippedWeapons || []).forEach(wId => {
      if (!addedIds.has(wId)) {
        const wDef = DND55_WEAPONS.find(w => w.id === wId);
        if (wDef) {
          list.push(wDef);
          addedIds.add(wId);
        }
      }
    });

    // 3. Añadir de forma predeterminada siempre "Ataque sin armas" a la tabla de ataques
    const hasUnarmed = addedIds.has('desarmado') || list.some(w => {
      const nm = (w.name || '').toLowerCase();
      const id = (w.id || '').toLowerCase();
      return nm.includes('sin armas') || nm.includes('sin arma') || nm.includes('desarmado') || id === 'desarmado';
    });
    if (!hasUnarmed) {
      const unarmedDef = DND55_WEAPONS.find(w => w.id === 'desarmado') || {
        id: 'desarmado',
        name: 'Ataque sin armas',
        damage: '1 + Mod',
        damageType: 'Contundente',
        properties: [],
        category: 'simple',
        rangeType: 'melee',
        weight: 0
      };
      list.push(unarmedDef);
    }

    return list;
  }

  /**
   * Calcula el bono de ataque, daño, alcance, propiedades y beneficios de dotes/rasgos de un arma según reglas D&D 5.5.
   */
  calculateWeaponAttack(itemOrId, char, scores, pb) {
    let wDef = null;
    let customName = '';
    let customDamage = '';
    let customDamageType = '';
    let customMastery = '';
    let magicBonus = 0;
    let properties = [];
    let rangeType = 'melee';

    if (typeof itemOrId === 'string') {
      wDef = findCanonicalWeapon(itemOrId) || DND55_WEAPONS.find(w => w.id === itemOrId);
    } else if (itemOrId && typeof itemOrId === 'object') {
      magicBonus = Number(itemOrId.magicBonus) || 0;
      customName = itemOrId.name;
      customDamage = itemOrId.damage;
      customDamageType = itemOrId.damageType;
      customMastery = itemOrId.masteryProperty;
      if (itemOrId.weaponType) {
        wDef = findCanonicalWeapon(itemOrId.weaponType) || DND55_WEAPONS.find(w => w.id === itemOrId.weaponType);
      }
      if (!wDef) {
        wDef = findCanonicalWeapon(itemOrId.name) || findCanonicalWeapon(itemOrId.id);
      }
    }

    const name = customName || wDef?.name || (typeof itemOrId === 'string' ? getWeaponName(itemOrId) : 'Arma');
    let damageBase = customDamage || wDef?.damage || '1d6';
    const damageType = customDamageType || wDef?.damageType || 'Cortante';
    const mastery = customMastery || wDef?.masteryProperty || 'Ninguna';
    properties = Array.isArray(itemOrId?.properties) && itemOrId.properties.length > 0
      ? [...itemOrId.properties]
      : [...(wDef?.properties || [])];
    rangeType = itemOrId?.rangeType || wDef?.rangeType || 'melee';

    const propLower = properties.map(p => p.toLowerCase());
    const isHeavy = propLower.some(p => p.includes('pesada'));
    const isTwoHanded = propLower.some(p => p.includes('dos manos'));
    const isFinesse = propLower.some(p => p.includes('sutil'));
    const isReach = propLower.some(p => p === 'alcance' || p.includes('alcance'));
    const isVersatile = propLower.some(p => p.includes('versátil') || p.includes('versatil'));
    const isThrown = propLower.some(p => p.includes('arrojadiza'));
    const isUnarmed = (wDef?.id === 'desarmado') ||
      name.toLowerCase().includes('desarmado') ||
      name.toLowerCase().includes('sin armas') ||
      name.toLowerCase().includes('sin arma');

    let displayName = name;
    if (isUnarmed && (displayName === 'Golpe Desarmado' || displayName === 'desarmado' || displayName === 'Ataque Desarmado')) {
      displayName = 'Ataque sin armas';
    }

    // Calcular distancia / alcance efectivo del arma
    let rangeLabel = rangeType === 'ranged' ? '24/96 m' : (isReach ? '3 m' : '1,5 m');
    const ammoOrThrownProp = properties.find(p => /\(\d+\/\d+\s*m\)/i.test(p));
    if (ammoOrThrownProp) {
      const m = ammoOrThrownProp.match(/\((\d+\/\d+\s*m)\)/i);
      if (m) {
        const dist = m[1].replace(/\s*m$/i, ' m');
        rangeLabel = rangeType === 'ranged' ? dist : `${isReach ? '3 m' : '1,5 m'} (Arroj. ${dist})`;
      }
    }

    const strMod = getAbilityModifier(scores.str);
    const dexMod = getAbilityModifier(scores.dex);
    const chaMod = getAbilityModifier(scores.cha);

    // Bardo - Colegio de la Danza (D&D 5.5 PHB 2024: Danzarín Deslumbrante)
    const bardLvl = getClassLevel(char, 'bardo');
    const isDanceBard = bardLvl >= 3 && (
      char.subclassId === 'colegio_danza' ||
      char.subclassId === 'bardo_danza' ||
      char.subclassId === 'danza' ||
      getCharacterClasses(char).some(c => c.classId === 'bardo' && ['colegio_danza', 'bardo_danza', 'danza'].includes(c.subclassId) && (c.level || 1) >= 3)
    );

    let abilityKey = 'str';
    let abilityMod = strMod;
    if (isFinesse) {
      abilityKey = dexMod > strMod ? 'dex' : 'str';
      abilityMod = Math.max(strMod, dexMod);
    } else if (rangeType === 'ranged') {
      abilityKey = 'dex';
      abilityMod = dexMod;
    } else if (getClassLevel(char, 'monje') >= 1 && !isHeavy && !isTwoHanded) {
      abilityKey = dexMod > strMod ? 'dex' : 'str';
      abilityMod = Math.max(strMod, dexMod);
    } else if (isDanceBard && isUnarmed) {
      // El bardo de la danza puede usar Destreza en Ataques sin Armas
      abilityKey = dexMod > strMod ? 'dex' : 'str';
      abilityMod = Math.max(strMod, dexMod);
    }

    // Brujo - Filo Maldito / Pacto del Filo permite usar Carisma
    const warlockLvl = getClassLevel(char, 'brujo');
    if (warlockLvl >= 1 && (char.subclassId === 'hoja_maldita' || char.subclassId === 'filo_maldito') && chaMod > abilityMod) {
      abilityKey = 'cha';
      abilityMod = chaMod;
    }

    const activeTraitsBadges = [];

    // Escala de dado de Artes Marciales de Monje o Matón de Taberna
    const monkLvl = getClassLevel(char, 'monje');
    {
      // Se aplica siempre el dado más alto entre todas las fuentes aplicables
      const candidates = [];
      if (monkLvl >= 1 && !isHeavy && !isTwoHanded && (isUnarmed || rangeType === 'melee')) {
        const s = monkLvl >= 17 ? 12 : monkLvl >= 11 ? 10 : monkLvl >= 5 ? 8 : 6;
        candidates.push({ size: s, text: `Artes Marciales (1d${s})`, cls: 'bg-info text-dark' });
      }
      if (isUnarmed && (characterHasFeat(char, 'maton_taberna') || characterHasFeat(char, 'matón de taberna') || characterHasFeat(char, 'tavern brawler') || characterHasFeat(char, 'matón'))) {
        candidates.push({ size: 4, text: 'Matón de Taberna (1d4)', cls: 'bg-info text-dark' });
      }
      if (isDanceBard && isUnarmed) {
        const s = bardLvl >= 15 ? 12 : bardLvl >= 10 ? 10 : bardLvl >= 5 ? 8 : 6;
        candidates.push({ size: s, text: `Colegio Danza (1d${s})`, cls: 'bg-primary text-light' });
      }
      if (candidates.length > 0) {
        const best = candidates.reduce((a, b) => (b.size > a.size ? b : a));
        const dm = String(damageBase).match(/^1d(\d+)/i);
        const currentDieSize = dm ? parseInt(dm[1], 10) : 1;
        if (best.size > currentDieSize) {
          damageBase = `1d${best.size}`;
          activeTraitsBadges.push({ text: best.text, cls: best.cls });
        }
      }
    }

    let atkBonusMod = 0;
    let dmgBonusMod = 0;
    const atkBonusSources = [];
    const dmgBonusSources = [];

    // 1. Dote: Maestro en armas pesadas (GWM - D&D 5.5: suma Bono de Competencia al daño con armas Pesadas)
    const hasGwm = characterHasFeat(char, 'gwm') || characterHasFeat(char, 'gran maestro de las armas') || characterHasFeat(char, 'maestro en armas pesadas');
    if (hasGwm && isHeavy) {
      dmgBonusMod += pb;
      dmgBonusSources.push(`+${pb} por Maestro en armas pesadas`);
      activeTraitsBadges.push({
        text: `Maestro Armas Pesadas (+${pb} daño)`,
        cls: 'bg-danger text-light',
        tooltip: `Maestro en armas pesadas (D&D 5.5): Sumas tu Bono de Competencia (+${pb}) al daño con armas con la propiedad Pesada.`
      });
    }

    // 2. Estilos de Combate (de clase o por Dote de Estilo de Combate)
    if ((char.fightingStyle === 'arqueria' || characterHasFeat(char, 'estilo_arqueria')) && rangeType === 'ranged') {
      atkBonusMod += 2;
      atkBonusSources.push('+2 por Estilo Arquería');
      activeTraitsBadges.push({ text: 'Arquería (+2 ataque)', cls: 'bg-info text-dark' });
    }
    if ((char.fightingStyle === 'duelista' || char.fightingStyle === 'duelo' || characterHasFeat(char, 'estilo_duelista')) && rangeType === 'melee' && !isTwoHanded && !isUnarmed) {
      dmgBonusMod += 2;
      dmgBonusSources.push('+2 por Estilo Duelista');
      activeTraitsBadges.push({ text: 'Duelista (+2 daño)', cls: 'bg-info text-dark' });
    }
    if ((char.fightingStyle === 'armas_grandes' || characterHasFeat(char, 'estilo_armas_grandes')) && rangeType === 'melee' && (isTwoHanded || isVersatile)) {
      activeTraitsBadges.push({
        text: 'Armas Grandes (dados 1-2 → 3)',
        cls: 'bg-secondary text-light',
        tooltip: 'Combate con Armas Grandes (D&D 5.5): Cualquier 1 o 2 en un dado de daño del arma se trata como un 3.'
      });
    }
    if ((char.fightingStyle === 'armas_arrojadizas' || characterHasFeat(char, 'estilo_armas_arrojadizas')) && isThrown) {
      if (rangeType === 'ranged') {
        dmgBonusMod += 2;
        dmgBonusSources.push('+2 por Estilo Armas Arrojadizas');
      }
      activeTraitsBadges.push({ text: 'Armas Arrojadizas (+2 daño al lanzar)', cls: 'bg-info text-dark' });
    }
    if ((char.fightingStyle === 'combate_desarmado' || characterHasFeat(char, 'estilo_desarmado')) && isUnarmed) {
      if (damageBase === '1' || damageBase === '1d4' || damageBase === '1 + Mod') {
        damageBase = '1d6/1d8';
      }
      activeTraitsBadges.push({ text: 'Combate Desarmado (1d6/1d8)', cls: 'bg-info text-dark' });
    }

    // 3. Modificadores de Objetos Mágicos y Dones Activos
    const activeMods = getActiveStatModifiers(char);
    const appliedUnarmedSources = new Set();
    activeMods.forEach(m => {
      if (m.target === 'attackBonus' && m.mode === 'bonus') {
        atkBonusMod += m.value;
        atkBonusSources.push(`+${m.value} por ${m.sourceName || 'Objeto'}`);
      }
      if (m.target === 'damageBonus' && m.mode === 'bonus') {
        dmgBonusMod += m.value;
        dmgBonusSources.push(`+${m.value} por ${m.sourceName || 'Objeto'}`);
      }
      if (isUnarmed && (m.target === 'unarmedAttack' || m.target === 'unarmedBonus') && m.mode === 'bonus') {
        atkBonusMod += m.value;
        atkBonusSources.push(`+${m.value} por ${m.sourceName || 'Objeto'}`);
        appliedUnarmedSources.add(m.sourceName);
        activeTraitsBadges.push({ text: `${m.sourceName || 'Objeto'} (+${m.value} atk)`, cls: 'bg-primary text-light' });
      }
      if (isUnarmed && (m.target === 'unarmedDamage' || m.target === 'unarmedBonus') && m.mode === 'bonus') {
        dmgBonusMod += m.value;
        dmgBonusSources.push(`+${m.value} por ${m.sourceName || 'Objeto'}`);
        if (!appliedUnarmedSources.has(m.sourceName)) {
          appliedUnarmedSources.add(m.sourceName);
          activeTraitsBadges.push({ text: `${m.sourceName || 'Objeto'} (+${m.value} daño)`, cls: 'bg-primary text-light' });
        }
      }
    });

    // Bonificador específico de Vendas de Poder Desarmado (DMG 2024) para Ataque sin armas
    if (isUnarmed) {
      const unarmedItem = (char.inventory || []).find(it =>
        it.isEquipped &&
        (it.id === 'magic_envolturas_ki' ||
         it.name?.toLowerCase().includes('vendas de poder desarmado') ||
         it.name?.toLowerCase().includes('envolturas de poder desarmado'))
      );
      if (unarmedItem && !appliedUnarmedSources.has(unarmedItem.name)) {
        const vBonus = (unarmedItem.magicBonus !== undefined && unarmedItem.magicBonus !== null) ? Number(unarmedItem.magicBonus) : 1;
        if (vBonus > 0) {
          atkBonusMod += vBonus;
          dmgBonusMod += vBonus;
          atkBonusSources.push(`+${vBonus} por Vendas de Poder Desarmado`);
          dmgBonusSources.push(`+${vBonus} por Vendas de Poder Desarmado`);
          activeTraitsBadges.push({ text: `Vendas Poder Desarmado (+${vBonus})`, cls: 'bg-primary text-light' });
        }
      }

      // Ataques sin armas mágicos por objetos (Tatuaje de Garras, Vendas de Poder, Insignia) o Monje Nv 6+
      const isMagicalUnarmed = monkLvl >= 6 || (char.inventory || []).some(it =>
        it.isEquipped && (!it.requiresAttunement || it.isAttuned) && (
          it.id === 'magic_tatuaje_garras_sobrenaturales' ||
          it.id === 'magic_envolturas_ki' ||
          it.id === 'magic_insignia_garras' ||
          it.name?.toLowerCase().includes('garras sobrenaturales') ||
          it.name?.toLowerCase().includes('vendas de poder desarmado') ||
          it.name?.toLowerCase().includes('insignia de las garras')
        )
      );
      if (isMagicalUnarmed && !properties.some(p => p.toLowerCase().includes('mágica') || p.toLowerCase().includes('magica'))) {
        properties.push('Mágica');
        activeTraitsBadges.push({
          text: 'Golpes Mágicos',
          cls: 'bg-primary text-light',
          tooltip: 'Tus ataques sin armas cuentan como mágicos a efectos de superar resistencias.'
        });
      }
    }

    // 4. Rasgos de Clase y Dotes adicionales en ataques con arma
    let extraDamageDiceSuffix = '';
    const paladinLvl = getClassLevel(char, 'paladin');
    if (paladinLvl >= 11 && rangeType === 'melee') {
      extraDamageDiceSuffix += ' + 1d8 Radiante';
      dmgBonusSources.push('+1d8 Radiante (Golpes Radiantes Nv 11)');
      activeTraitsBadges.push({ text: 'Golpes Radiantes (+1d8)', cls: 'bg-warning text-dark' });
    }
    const clericLvl = getClassLevel(char, 'clerigo');
    if (clericLvl >= 7) {
      const dCount = clericLvl >= 14 ? '2d8' : '1d8';
      activeTraitsBadges.push({ text: `Golpes Benditos (+${dCount} Rad/Nec 1/turno)`, cls: 'bg-warning text-dark' });
    }
    const druidLvl = getClassLevel(char, 'druida');
    if (druidLvl >= 7 && (char.classFeatureChoices?.orden_primigenia === 'guardian' || char.druidOrder === 'guardian')) {
      const dCount = druidLvl >= 15 ? '2d8' : '1d8';
      activeTraitsBadges.push({ text: `Golpe Primigenio (+${dCount} Elem. 1/turno)`, cls: 'bg-success text-light' });
    }
    const rogueLvl = getClassLevel(char, 'picaro');
    if (rogueLvl >= 1 && (isFinesse || rangeType === 'ranged')) {
      const sneakDice = Math.ceil(rogueLvl / 2);
      activeTraitsBadges.push({ text: `Ataque Furtivo (+${sneakDice}d6)`, cls: 'bg-dark text-warning border border-warning' });
    }
    const barbLvl = getClassLevel(char, 'barbaro');
    if (barbLvl >= 1 && rangeType === 'melee' && abilityKey === 'str') {
      const rageDmg = barbLvl >= 16 ? 4 : barbLvl >= 9 ? 3 : 2;
      activeTraitsBadges.push({ text: `En Furia (+${rageDmg} daño)`, cls: 'bg-danger bg-opacity-75 text-light' });
    }
    if (characterHasFeat(char, 'atacante salvaje') || characterHasFeat(char, 'atacante_salvaje')) {
      activeTraitsBadges.push({
        text: 'Atacante Salvaje (2x dados 1/turno)',
        cls: 'bg-secondary text-light',
        tooltip: 'Atacante Salvaje: Una vez por turno al impactar con un arma, puedes tirar dos veces los dados de daño del arma y elegir cualquiera de los dos resultados.'
      });
    }
    const wIdLow = (wDef?.id || name).toLowerCase();
    if ((characterHasFeat(char, 'polearm_master') || characterHasFeat(char, 'maestro en armas de asta')) &&
        (wIdLow.includes('alabarda') || wIdLow.includes('guja') || wIdLow.includes('pica') || wIdLow.includes('baston') || wIdLow.includes('bastón') || wIdLow.includes('lanza'))) {
      activeTraitsBadges.push({ text: 'Maestro Asta (Atq Adic 1d4)', cls: 'bg-secondary text-light' });
    }
    if ((characterHasFeat(char, 'sharpshooter') || characterHasFeat(char, 'tirador certero')) && rangeType === 'ranged') {
      activeTraitsBadges.push({ text: 'Tirador Certero (Sin desventaja largo alcance)', cls: 'bg-secondary text-light' });
    }

    const totalAtk = abilityMod + pb + magicBonus + atkBonusMod;
    const totalDmgMod = abilityMod + magicBonus + dmgBonusMod;
    const dmgString = `${totalDmgMod !== 0 ? `${damageBase} ${formatModifier(totalDmgMod)}` : damageBase} ${damageType}${extraDamageDiceSuffix}`;

    // Calcular daño versátil a 2 manos si tiene propiedad Versátil (ej. 1d10)
    let versatileDamage = '';
    const versProp = properties.find(p => /vers[áa]til\s*\(([^)]+)\)/i.test(p));
    if (versProp) {
      const vm = versProp.match(/vers[áa]til\s*\(([^)]+)\)/i);
      if (vm) {
        const vDie = vm[1].trim();
        // Si tiene Estilo Duelista, a dos manos no aplica el +2 de Duelista
        const vMod = (char.fightingStyle === 'duelista' || char.fightingStyle === 'duelo') ? (totalDmgMod - 2) : totalDmgMod;
        versatileDamage = `${vMod !== 0 ? `${vDie} ${formatModifier(vMod)}` : vDie} ${damageType}`;
      }
    }

    const abShort = getAbilityShortName(abilityKey);
    const atkFormulaParts = [
      `Mod. ${abShort} (${formatModifier(abilityMod)})`,
      `Competencia (+${pb})`
    ];
    if (magicBonus > 0) atkFormulaParts.push(`Arma mágica (+${magicBonus})`);
    if (atkBonusSources.length > 0) atkFormulaParts.push(...atkBonusSources);
    const atkFormula = `${atkFormulaParts.join(' + ')} = ${formatModifier(totalAtk)} al ataque`;

    const dmgFormulaParts = [
      `Daño base (${damageBase})`,
      `Mod. ${abShort} (${formatModifier(abilityMod)})`
    ];
    if (magicBonus > 0) dmgFormulaParts.push(`Magia (+${magicBonus})`);
    if (dmgBonusSources.length > 0) dmgFormulaParts.push(...dmgBonusSources);
    const dmgFormula = `${dmgFormulaParts.join(' + ')} = ${dmgString}`;

    return {
      name: displayName || name,
      attackBonus: formatModifier(totalAtk),
      damage: dmgString,
      versatileDamage,
      mastery,
      rangeLabel,
      properties,
      activeTraitsBadges,
      atkFormula,
      dmgFormula
    };
  }

  renderPrintableSheet(char, campaignChars) {
    const acInfo = calculateArmorClass(char);
    const hpInfo = calculateHitPoints(char);
    const initInfo = calculateInitiative(char);
    const speedInfo = calculateSpeed(char);
    const scores = calculateFinalAbilityScores(char);
    const abilityBreakdowns = calculateAbilityScoresBreakdown(char);
    const saves = calculateSavingThrows(char);
    const skills = calculateSkills(char);
    const carry = calculateCarryingCapacity(char);
    const pb = getProficiencyBonus(char.level);
    const classDef = DND55_CLASSES.find(c => c.id === char.classId);
    const hitDie = classDef?.hitDie || 8;
    const resolvedFeats = getResolvedFeatsForCharacter(char);
    const resolvedFeatures = getResolvedCharacterFeatures(char);
    const profs = getCharacterProficiencies(char);
    const passPerc = calculatePassivePerception(char);
    const passPercVal = typeof passPerc === 'object' && passPerc !== null ? passPerc.value : passPerc;
    const currency = char.currency || { cp: 0, sp: 0, ep: 0, gp: char.gp !== undefined ? Number(char.gp) : 50, pp: 0 };
    const speciesDef = DND55_SPECIES.find(s => s.id === char.speciesId);
    
    const speciesName = getSpeciesName(char.speciesId);
    const sublineageName = getSublineageName(char.speciesId, char.sublineageId);
    const fullSpecies = sublineageName ? `${speciesName} (${sublineageName})` : speciesName;
    const backgroundName = getBackgroundName(char);
    const className = getClassName(char.classId);
    const subclassName = getSubclassName(char.subclassId);
    const fullClass = getCharacterFullClassTitle(char);
    const charClasses = getCharacterClasses(char);
    const isMulticlass = charClasses && charClasses.length > 1;
    const classDisplayTitle = isMulticlass
      ? fullClass
      : (subclassName ? `${className} (${subclassName})` : className);

    const app = char.appearance || {
      age: char.age || '',
      height: char.height || '',
      weight: char.weight || '',
      eyes: char.eyes || '',
      skin: char.skin || '',
      hair: char.hair || '',
      gender: char.gender || '',
      description: char.description || char.appearanceNotes || ''
    };
    const pers = char.personality || {
      traits: char.personalityTraits || '',
      ideals: char.ideals || '',
      bonds: char.bonds || '',
      flaws: char.flaws || ''
    };

    const equippedWeapons = this.getEquippedWeapons(char);

    this.container.innerHTML = `
      <div class="no-print d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 p-3 bg-dark rounded border border-secondary">
        <div>
          <h5 class="text-warning m-0 d-flex align-items-center gap-2">
            <i data-lucide="file-text"></i> Hoja Oficial Imprimible D&D 2024
          </h5>
          <div class="text-secondary small">Plantilla Oficial: <em>Hoja_personaje.pdf</em></div>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <button id="btn-download-pdf" class="btn btn-warning text-dark fw-bold d-flex align-items-center gap-1" title="Descargar PDF con todos los campos rellenados">
            <i data-lucide="download"></i> Descargar PDF Oficial
          </button>
          <button id="btn-open-pdf-tab" class="btn btn-outline-info btn-sm d-flex align-items-center gap-1" title="Abrir PDF en pestaña nueva">
            <i data-lucide="external-link"></i> Abrir PDF
          </button>
          <button id="btn-toggle-submode" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
            <i data-lucide="layout"></i> ${this.printSubMode === 'pdf' ? 'Vista HTML A4' : 'Plantilla PDF Oficial'}
          </button>
          <button id="btn-do-print" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
            <i data-lucide="printer"></i> Imprimir
          </button>
          <button id="btn-exit-print" class="btn btn-outline-secondary btn-sm">
            Volver a Interactiva
          </button>
        </div>
      </div>

      ${this.printSubMode === 'pdf' ? `
        <!-- Vista Previa de la Plantilla PDF Oficial 2024 Rellenable -->
        <div id="pdf-view-container" class="mb-4">
          <div id="pdf-loading-spinner" class="text-center p-5 rpg-card my-3">
            <div class="spinner-border text-warning mb-2" role="status"></div>
            <div class="text-warning fw-bold fs-5">Rellenando la Plantilla Oficial D&amp;D 2024 (AcroForm)...</div>
            <div class="text-secondary small mt-1">
              Cargando <em>Hoja_personaje.pdf</em> con los datos de <strong>${escapeHtml(char.name)}</strong>
            </div>
          </div>
          <div id="pdf-error-container" class="alert alert-danger d-none my-3 text-center"></div>
          <iframe id="pdf-preview-iframe" class="w-100 rounded border border-secondary d-none" style="height: 1050px; background: #2b2b2b;" src=""></iframe>
        </div>
      ` : `
        <!-- Hoja Imprimible Oficial A4 Alternativa (HTML) -->
        <div class="sheet-a4-paper p-4 bg-white text-dark border border-dark" data-bs-theme="light" style="max-width: 210mm; margin: 0 auto; min-height: 297mm; font-size: 9pt; color: #111111 !important;">
          <!-- Header A4 -->
          <div class="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-3" style="border-color: #212529 !important;">
            <div>
              <h2 class="h4 fw-bold m-0 text-uppercase" style="color: #000000 !important; font-family: var(--font-title);">${escapeHtml(char.name)}</h2>
              <div class="small fw-bold" style="color: #495057 !important;">DUNGEONS &amp; DRAGONS 5.5 &bull; HOJA DE PERSONAJE</div>
            </div>
            <div class="text-end small" style="color: #111111 !important;">
              <div><strong style="color: #000000 !important;">${escapeHtml(fullClass)} ${char.level}</strong> | <strong style="color: #000000 !important;">${escapeHtml(fullSpecies)}</strong></div>
              <div>Trasfondo: <strong style="color: #000000 !important;">${escapeHtml(backgroundName)}</strong> | BC: <strong style="color: #8b0000 !important;">+${pb}</strong></div>
            </div>
          </div>

          <!-- Combate A4 -->
          <div class="row g-2 text-center mb-3">
            <div class="col-3">
              <div class="border border-dark p-2 rounded" title="${escapeHtml(acInfo.formula)}" style="cursor: help; border-color: #212529 !important;">
                <div class="small fw-bold" style="color: #495057 !important;">CLASE ARMADURA</div>
                <div class="fs-4 fw-bold" style="color: #000000 !important;">${escapeHtml(acInfo.acDisplay || String(acInfo.ac))}</div>
                <div class="small fw-semibold" style="color: #212529 !important;">${escapeHtml(acInfo.acDisplayNote || (acInfo.isUnarmored ? 'Sin Armadura' : (acInfo.equippedArmorName || 'Armadura')))}</div>
              </div>
            </div>
            <div class="col-3">
              <div class="border border-dark p-2 rounded" title="${escapeHtml(initInfo.formula)}" style="cursor: help; border-color: #212529 !important;">
                <div class="small fw-bold" style="color: #495057 !important;">INICIATIVA</div>
                <div class="fs-4 fw-bold" style="color: #000000 !important;">${formatModifier(initInfo.bonus)}</div>
                <div class="small fw-semibold" style="color: #495057 !important;">DES ${formatModifier(scores.dex ? Math.floor((scores.dex - 10)/2) : 0)}</div>
              </div>
            </div>
            <div class="col-3">
              <div class="border border-dark p-2 rounded" title="${escapeHtml(speedInfo.formula)}" style="cursor: help; border-color: #212529 !important;">
                <div class="small fw-bold" style="color: #495057 !important;">VELOCIDAD</div>
                <div class="fs-4 fw-bold" style="color: #000000 !important;">${speedInfo.speed} m</div>
                <div class="small fw-semibold" style="color: #495057 !important;">Caminar</div>
              </div>
            </div>
            <div class="col-3">
              <div class="border border-dark p-2 rounded" title="${escapeHtml(hpInfo.formula)}" style="cursor: help; border-color: #212529 !important;">
                <div class="small fw-bold" style="color: #495057 !important;">PG MÁXIMOS</div>
                <div class="fs-4 fw-bold" style="color: #000000 !important;">${hpInfo.maxHp}</div>
                <div class="small fw-semibold" style="color: #495057 !important;">Dados: ${getCharacterHitDicePool(char).summaryText}</div>
              </div>
            </div>
          </div>

          <!-- Características y Salvaciones A4 -->
          <div class="row g-2 mb-3">
            <div class="col-4">
              <div class="border border-dark p-2 rounded" style="border-color: #212529 !important;">
                <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">CARACTERÍSTICAS</div>
                ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(ab => {
                  const b = abilityBreakdowns[ab];
                  const score = b?.finalScore || scores[ab] || 10;
                  const mod = b?.modifier !== undefined ? b.modifier : getAbilityModifier(score);
                  const save = saves[ab] || { bonus: mod, isProficient: false, formula: '' };
                  const saveVal = save.bonus !== undefined ? save.bonus : (save.value !== undefined ? save.value : mod);
                  const short = getAbilityShortName(ab);
                  return `
                    <div class="d-flex justify-content-between small py-1 border-bottom" title="${escapeHtml(b?.formula || '')}" style="cursor: help; border-color: #e0e0e0 !important; color: #111111 !important;">
                      <span><strong style="color: #000000 !important;">${short}</strong> (${score}):</span>
                      <span>Mod: <strong style="color: #000000 !important;">${formatModifier(mod)}</strong> | Salv: <span title="${escapeHtml(save.formula || '')}" style="cursor: help;"><strong style="color: #000000 !important;">${formatModifier(saveVal)}</strong> ${save.isProficient ? '●' : '○'}</span></span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            <div class="col-8">
              <div class="border border-dark p-2 rounded" style="border-color: #212529 !important;">
                <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">HABILIDADES OFICIALES</div>
                <div class="row g-1 small">
                  ${Object.entries(skills).map(([sName, sData]) => {
                    const prof = sData?.proficiency || sData?.level || 'none';
                    const bonusVal = sData?.bonus !== undefined ? sData.bonus : (sData?.value !== undefined ? sData.value : 0);
                    const abShort = getAbilityShortName(sData?.abilityKey || sData?.ability || 'str');
                    return `
                      <div class="col-6 d-flex justify-content-between py-1 border-bottom" title="${escapeHtml(sData?.formula || '')}" style="cursor: help; border-color: #e0e0e0 !important; color: #111111 !important;">
                        <span>${prof === 'expertise' ? '★' : prof !== 'none' ? '●' : '○'} <span style="color: #111111 !important;">${sName}</span> <small style="color: #495057 !important; font-weight: 600;">(${abShort})</small>:</span>
                        <strong style="color: #000000 !important;">${formatModifier(bonusVal)}</strong>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Armas y Ataques A4 -->
          <div class="border border-dark p-2 rounded mb-3" style="border-color: #212529 !important;">
            <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">ATAQUES Y ARMAS EQUIPADAS</div>
            <div class="small" style="color: #111111 !important;">
              ${(equippedWeapons.length > 0 ? equippedWeapons : ['desarmado']).map(w => {
                const atk = this.calculateWeaponAttack(w, char, scores, pb);
                const propsStr = (atk.properties && atk.properties.length > 0) ? ` | Propiedades: ${atk.properties.join(', ')}` : '';
                const traitsStr = (atk.activeTraitsBadges && atk.activeTraitsBadges.length > 0) ? ` [${atk.activeTraitsBadges.map(b => b.text).join(', ')}]` : '';
                return `<div class="py-1">• <strong style="color: #000000 !important;">${escapeHtml(atk.name)}:</strong> Ataque <strong style="color: #8b0000 !important;" title="${escapeHtml(atk.atkFormula || '')}">${atk.attackBonus}</strong> | Daño <strong style="color: #111111 !important;" title="${escapeHtml(atk.dmgFormula || '')}">${escapeHtml(atk.damage)}</strong> | Alcance: <strong>${escapeHtml(atk.rangeLabel || '1,5 m')}</strong>${escapeHtml(propsStr)} | Maestría: <em>${escapeHtml(atk.mastery)}</em><span style="color: #8b0000 !important; font-weight: 600;">${escapeHtml(traitsStr)}</span></div>`;
              }).join('')}
            </div>
          </div>

          <!-- Rasgos de Clase y Elecciones A4 -->
          <div class="border border-dark p-2 rounded mb-3" style="border-color: #212529 !important;">
            <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">RASGOS DE CLASE Y SUBCLASE</div>
            <div class="small" style="color: #111111 !important;">
              ${resolvedFeatures.classChoices && resolvedFeatures.classChoices.length > 0 ? `
                ${resolvedFeatures.classChoices.map(c => `
                  <div class="py-1" style="color: #111111 !important;">
                    • <strong style="color: #8b0000 !important;">${escapeHtml(c.featureName)}:</strong>
                    <span class="badge border border-dark ms-1" style="background-color: #e9ecef !important; color: #000000 !important;">Elección: ${escapeHtml(c.choiceName)}</span>
                    <div class="ps-3" style="font-size: 8pt; color: #212529 !important; line-height: 1.35;">${escapeHtml(c.description)}</div>
                  </div>
                `).join('')}
              ` : ''}
              ${(resolvedFeatures.fightingStyles?.length > 0 ? resolvedFeatures.fightingStyles : (resolvedFeatures.fightingStyle ? [resolvedFeatures.fightingStyle] : [])).map(fs => `
                <div class="py-1" style="color: #111111 !important;">
                  • <strong style="color: #8b0000 !important;">Estilo de Combate:</strong> <strong style="color: #000000 !important;">${escapeHtml(fs.name)}</strong> - <span style="font-size: 8pt; color: #212529 !important;">${escapeHtml(fs.description)}</span>
                </div>
              `).join('')}
              ${resolvedFeatures.subclass ? `
                <div class="mt-1 mb-1 fw-bold" style="font-size: 8.5pt; color: #000000 !important;">Subclase: ${escapeHtml(resolvedFeatures.subclass.name)}</div>
                ${(resolvedFeatures.subclass.features || []).map(sf => `
                  <div class="ps-2 py-0.5" style="font-size: 8pt; color: #212529 !important;">
                    • <strong style="color: #000000 !important;">${escapeHtml(sf.name)} (Nv ${sf.level}):</strong> ${escapeHtml(sf.description)}
                  </div>
                `).join('')}
              ` : ''}
              <div class="mt-1 mb-1 fw-bold" style="font-size: 8.5pt; color: #000000 !important;">Rasgos de ${escapeHtml(className)}:</div>
              ${resolvedFeatures.coreClassFeatures.map(cf => `
                <div class="ps-2 py-0.5" style="font-size: 8pt; color: #212529 !important;">
                  • <strong style="color: #000000 !important;">${escapeHtml(cf.name)} (Nv ${cf.level}):</strong> ${escapeHtml(cf.description)}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dotes y Bendiciones A4 -->
          <div class="border border-dark p-2 rounded mb-3" style="border-color: #212529 !important;">
            <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">DOTES, DONES Y BENDICIONES ACTIVAS</div>
            <div class="small" style="color: #111111 !important;">
              ${resolvedFeats.map(feat => `
                <div class="mb-2 pb-1 border-bottom" style="color: #111111 !important; border-color: #e0e0e0 !important;">
                  <div class="d-flex justify-content-between align-items-center">
                    <span>• <strong style="color: #000000 !important;">${escapeHtml(feat.name)}:</strong></span>
                    <span class="badge border border-dark" style="font-size: 7.5pt; color: #000000 !important; background-color: #e9ecef !important;">${escapeHtml(feat.categoryLabel)}</span>
                  </div>
                  ${feat.choices && feat.choices.length > 0 ? `
                    <div class="ps-3 fst-italic" style="font-size: 8pt; color: #8b0000 !important;">
                      <strong>Elecciones:</strong> ${escapeHtml(feat.choices.join(' | '))}
                    </div>
                  ` : ''}
                  <div class="ps-3" style="font-size: 8pt; color: #212529 !important; line-height: 1.35;">${escapeHtml(feat.description)}</div>
                </div>
              `).join('') || '<div style="color: #212529 !important;">• Sin dotes registradas</div>'}

              ${(char.specialAbilities || []).filter(sa => sa.isActive !== false).map(sa => `
                <div class="mb-1" style="font-size: 8pt; color: #212529 !important;">
                  • <strong style="color: #000000 !important;">${escapeHtml(sa.name)} (${escapeHtml(sa.source || 'Don')}):</strong> ${escapeHtml(sa.description)}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Rasgos de Especie A4 -->
          <div class="border border-dark p-2 rounded mb-3" style="border-color: #212529 !important;">
            <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">RASGOS DE ESPECIE (${escapeHtml(fullSpecies)})</div>
            <div class="small" style="color: #111111 !important;">
              ${(resolvedFeatures.speciesTraits || []).map(st => `
                <div class="ps-2 py-0.5" style="font-size: 8pt; color: #212529 !important;">
                  • <strong style="color: #000000 !important;">${escapeHtml(st.name)}:</strong> ${escapeHtml(st.description)}
                </div>
              `).join('') || '<div style="color: #212529 !important;">• Sin rasgos de especie específicos registrados</div>'}
            </div>
          </div>

          <!-- Competencias, Idiomas y Herramientas A4 -->
          <div class="border border-dark p-2 rounded mb-3" style="border-color: #212529 !important;">
            <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">COMPETENCIAS, IDIOMAS Y SENTIDOS</div>
            <div class="small" style="font-size: 8pt; color: #212529 !important; line-height: 1.45;">
              <div>• <strong style="color: #000000 !important;">Idiomas:</strong> ${(char.languages || ['Común']).join(', ')}</div>
              <div>• <strong style="color: #000000 !important;">Herramientas:</strong> ${(char.tools || []).join(', ') || 'Ninguna'}</div>
              <div>• <strong style="color: #000000 !important;">Armaduras:</strong> ${profs.armorProficiencies.join(', ') || 'Ninguna'}</div>
              <div>• <strong style="color: #000000 !important;">Armas:</strong> ${profs.weaponProficiencies.join(', ') || 'Ninguna'}</div>
              <div>• <strong style="color: #000000 !important;">Percepción Pasiva:</strong> ${passPercVal} | <strong style="color: #000000 !important;">Sentidos:</strong> ${getCharacterVisionSense(char)}</div>
            </div>
          </div>

          <!-- Inventario y Riqueza A4 -->
          <div class="border border-dark p-2 rounded mb-3" style="border-color: #212529 !important;">
            <div class="fw-bold small border-bottom mb-1 pb-1 d-flex justify-content-between" title="${escapeHtml(carry.formula || '')}" style="cursor: help; color: #000000 !important; border-color: #212529 !important;">
              <span>INVENTARIO Y CARGA (${carry.totalWeightKg} kg / ${carry.carryingCapacityKg} kg)</span>
              <span><strong style="color: #000000 !important;">Riqueza:</strong> ${currency.gp || 0} po | ${currency.sp || 0} pp | ${currency.cp || 0} pc | ${currency.ep || 0} pe | ${currency.pp || 0} ppt</span>
            </div>
            <div class="small" style="color: #212529 !important; line-height: 1.4;">
              ${(char.inventory || []).map(i => `${i.name}${i.isEquipped ? ' (Equipado)' : ''} (x${i.quantity || 1})`).join(', ') || '<em>Inventario vacío</em>'}
            </div>
          </div>

          <!-- Aspecto Físico e Historia y Personalidad A4 -->
          <div class="row g-2 mb-2">
            <div class="col-5">
              <div class="border border-dark p-2 rounded h-100" style="border-color: #212529 !important;">
                <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">ASPECTO FÍSICO</div>
                <div class="small" style="font-size: 8pt; color: #212529 !important; line-height: 1.45;">
                  <div>• <strong style="color: #000000 !important;">Edad:</strong> ${escapeHtml(app.age || char.age || '—')} | <strong style="color: #000000 !important;">Género:</strong> ${escapeHtml(app.gender || char.gender || '—')}</div>
                  <div>• <strong style="color: #000000 !important;">Altura:</strong> ${escapeHtml(app.height || char.height || '—')} | <strong style="color: #000000 !important;">Peso:</strong> ${escapeHtml(app.weight || char.weight || '—')}</div>
                  <div>• <strong style="color: #000000 !important;">Ojos:</strong> ${escapeHtml(app.eyes || char.eyes || '—')} | <strong style="color: #000000 !important;">Piel:</strong> ${escapeHtml(app.skin || char.skin || '—')}</div>
                  <div>• <strong style="color: #000000 !important;">Cabello:</strong> ${escapeHtml(app.hair || char.hair || '—')}</div>
                  ${(app.description || char.description || char.appearanceNotes) ? `
                    <div class="mt-2 pt-1 border-top" style="border-color: #e0e0e0 !important; font-size: 8pt; line-height: 1.35;">
                      <strong style="color: #000000 !important;">Descripción / Rasgos:</strong><br>
                      ${escapeHtml(app.description || char.description || char.appearanceNotes)}
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="border border-dark p-2 rounded h-100" style="border-color: #212529 !important;">
                <div class="fw-bold small border-bottom mb-1 pb-1" style="color: #000000 !important; border-color: #212529 !important;">HISTORIA Y PERSONALIDAD</div>
                <div class="small" style="font-size: 8pt; color: #212529 !important; line-height: 1.4;">
                  <div>• <strong style="color: #000000 !important;">Rasgos:</strong> ${escapeHtml(pers.traits || char.personalityTraits || '—')}</div>
                  <div>• <strong style="color: #000000 !important;">Ideales:</strong> ${escapeHtml(pers.ideals || char.ideals || '—')}</div>
                  <div>• <strong style="color: #000000 !important;">Vínculos:</strong> ${escapeHtml(pers.bonds || char.bonds || '—')}</div>
                  <div>• <strong style="color: #000000 !important;">Defectos:</strong> ${escapeHtml(pers.flaws || char.flaws || '—')}</div>
                  ${char.allies ? `<div>• <strong style="color: #000000 !important;">Aliados y Org.:</strong> ${escapeHtml(char.allies)}</div>` : ''}
                  ${char.backstory ? `
                    <div class="mt-2 pt-1 border-top" style="border-color: #e0e0e0 !important; font-size: 8pt; line-height: 1.35;">
                      <strong style="color: #000000 !important;">Historia del Personaje:</strong><br>
                      ${escapeHtml(char.backstory)}
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      `}
    `;

    // Listeners de la barra de impresión
    document.getElementById('btn-download-pdf')?.addEventListener('click', async () => {
      try {
        await downloadFilledDndPdf(char);
      } catch (err) {
        showToast.error('Error al descargar el PDF: ' + err.message);
      }
    });

    document.getElementById('btn-open-pdf-tab')?.addEventListener('click', async () => {
      try {
        if (!this.pdfBlobUrl) {
          this.pdfBlobUrl = await createFilledDndPdfBlobUrl(char);
        }
        window.open(this.pdfBlobUrl, '_blank');
      } catch (err) {
        showToast.error('Error al abrir el PDF: ' + err.message);
      }
    });

    document.getElementById('btn-toggle-submode')?.addEventListener('click', () => {
      this.printSubMode = this.printSubMode === 'pdf' ? 'html' : 'pdf';
      this.render();
    });

    document.getElementById('btn-do-print')?.addEventListener('click', () => {
      if (this.printSubMode === 'pdf') {
        const iframe = document.getElementById('pdf-preview-iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.print();
        } else {
          window.print();
        }
      } else {
        window.print();
      }
    });

    document.getElementById('btn-exit-print')?.addEventListener('click', () => {
      this.viewMode = 'interactive';
      this.render();
    });

    // Cargar iframe de PDF si estamos en modo pdf
    if (this.printSubMode === 'pdf') {
      (async () => {
        try {
          const url = await createFilledDndPdfBlobUrl(char);
          this.pdfBlobUrl = url;
          const spinner = document.getElementById('pdf-loading-spinner');
          const iframe = document.getElementById('pdf-preview-iframe');
          if (spinner) spinner.classList.add('d-none');
          if (iframe) {
            iframe.src = `${url}#view=FitH`;
            iframe.classList.remove('d-none');
          }
        } catch (err) {
          console.error('Error generando PDF oficial:', err);
          const spinner = document.getElementById('pdf-loading-spinner');
          const errBox = document.getElementById('pdf-error-container');
          if (spinner) spinner.classList.add('d-none');
          if (errBox) {
            errBox.classList.remove('d-none');
            errBox.innerHTML = `
              <strong>No se pudo cargar la plantilla PDF:</strong> ${escapeHtml(err.message)}<br>
              <button class="btn btn-sm btn-outline-light mt-2" id="btn-fallback-html">Ver Versión HTML A4</button>
            `;
            document.getElementById('btn-fallback-html')?.addEventListener('click', () => {
              this.printSubMode = 'html';
              this.render();
            });
          }
        }
      })();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Conmuta la visibilidad y anchura de las secciones del panel inferior según el filtro seleccionado.
   * La Columna 1 (Habilidades, Competencias e Idiomas) permanece siempre independiente y visible.
   */
  applyLowerSectionFilter(filter) {
    if (!this.container) return;
    this.activeLowerFilter = filter;

    // Actualizar botones de filtro
    this.container.querySelectorAll('.rpg-filter-pill').forEach(btn => {
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const lowerRow = this.container.querySelector('#sheet-lower-row');
    const colFeatures = this.container.querySelector('#sheet-col-features');
    const colGear = this.container.querySelector('#sheet-col-gear');
    const boxClass = this.container.querySelector('#sheet-box-class-features');
    const boxFeats = this.container.querySelector('#sheet-box-feats');
    const boxSpecies = this.container.querySelector('#sheet-box-species');
    const boxPersonality = this.container.querySelector('#sheet-box-personality');
    const boxInventory = this.container.querySelector('#sheet-box-inventory');
    const boxMagic = this.container.querySelector('#sheet-box-magic');
    const boxAppearance = this.container.querySelector('#sheet-box-appearance');

    if (!colFeatures || !colGear) return;

    const setVisible = (el, show) => {
      if (!el) return;
      if (show) {
        el.classList.remove('d-none');
      } else {
        el.classList.add('d-none');
      }
    };

    if (filter === 'all') {
      lowerRow?.classList.add('sheet-balanced-mode');
      colFeatures.className = 'col-12 col-lg-6 sheet-col-features d-flex flex-column gap-3';
      colGear.className = 'col-12 col-lg-6 sheet-col-gear d-flex flex-column gap-3';
      setVisible(boxClass, true);
      setVisible(boxFeats, true);
      setVisible(boxSpecies, true);
      setVisible(boxPersonality, true);
      setVisible(boxInventory, true);
      setVisible(boxMagic, true);
      setVisible(boxAppearance, true);
    } else if (filter === 'features') {
      lowerRow?.classList.remove('sheet-balanced-mode');
      colFeatures.className = 'col-12 sheet-col-features d-flex flex-column gap-3';
      colGear.className = 'col-12 sheet-col-gear d-none';
      setVisible(boxClass, true);
      setVisible(boxFeats, true);
      setVisible(boxSpecies, true);
      setVisible(boxPersonality, false);
      setVisible(boxInventory, false);
      setVisible(boxMagic, false);
      setVisible(boxAppearance, false);
    } else if (filter === 'inventory') {
      lowerRow?.classList.remove('sheet-balanced-mode');
      colFeatures.className = 'col-12 sheet-col-features d-none';
      colGear.className = 'col-12 sheet-col-gear d-flex flex-column gap-3';
      setVisible(boxClass, false);
      setVisible(boxFeats, false);
      setVisible(boxSpecies, false);
      setVisible(boxPersonality, false);
      setVisible(boxInventory, true);
      setVisible(boxMagic, false);
      setVisible(boxAppearance, false);
    } else if (filter === 'spells') {
      lowerRow?.classList.remove('sheet-balanced-mode');
      colFeatures.className = 'col-12 sheet-col-features d-none';
      colGear.className = 'col-12 sheet-col-gear d-flex flex-column gap-3';
      setVisible(boxClass, false);
      setVisible(boxFeats, false);
      setVisible(boxSpecies, false);
      setVisible(boxPersonality, false);
      setVisible(boxInventory, false);
      setVisible(boxMagic, true);
      setVisible(boxAppearance, false);
    } else if (filter === 'bio') {
      lowerRow?.classList.add('sheet-balanced-mode');
      colFeatures.className = 'col-12 col-lg-6 sheet-col-features d-flex flex-column gap-3';
      colGear.className = 'col-12 col-lg-6 sheet-col-gear d-flex flex-column gap-3';
      setVisible(boxClass, false);
      setVisible(boxFeats, false);
      setVisible(boxSpecies, false);
      setVisible(boxPersonality, true);
      setVisible(boxInventory, false);
      setVisible(boxMagic, false);
      setVisible(boxAppearance, true);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  attachEventListeners(char) {
    if (!this.container) return;

    // Pestañas / Filtros del panel inferior
    this.container.querySelectorAll('.rpg-filter-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        this.applyLowerSectionFilter(filter);
      });
    });

    // Selector de personaje: solo los de esta campaña
    this.container.querySelector('#sheet-char-select')?.addEventListener('change', (e) => {
      store.setSelectedCharacterId(e.target.value);
    });

    // Alternar modo de impresión
    this.container.querySelector('#btn-toggle-print-mode')?.addEventListener('click', () => {
      this.viewMode = 'printable';
      this.render();
    });

    // Requisito 2: Editar en Asistente cargando correctamente los datos existentes
    this.container.querySelector('#btn-edit-in-wizard')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        store.emit('wizard:edit-character', activeChar);
        const wizardTabBtn = document.getElementById('tab-wizard-btn');
        if (wizardTabBtn) wizardTabBtn.click();
      }
    });

    // Reparar caracteres corruptos (tildes / eñes)
    this.container.querySelector('#btn-repair-char-encoding')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        this.ensureInventoryIntegrity(activeChar);
        store.saveCharacter(activeChar);
        this.render();
        showToast.success(`¡Textos y caracteres de "${activeChar.name}" reparados con éxito!`);
      }
    });

    // Modificar PG normales (Daño consume temporales primero, Cura recupera normales)
    this.container.querySelectorAll('.btn-sheet-hp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar) {
          store.applyHpDelta(activeChar.id, delta);
        }
      });
    });

    // Modificar PG temporales (Añadir o restar con botones al igual que los normales)
    this.container.querySelectorAll('.btn-sheet-temp-hp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar) {
          store.applyTempHpDelta(activeChar.id, delta);
        }
      });
    });

    // ==========================================
    // REQUISITO 4: EQUIPAMIENTO DE OBJETOS Y CA
    // ==========================================

    // Equipar/Desequipar Armadura (Regla estricta: ÚNICAMENTE 1 ARMADURA EQUIPADA A LA VEZ)
    this.container.querySelectorAll('.btn-toggle-equip-armor').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.toggleEquipArmor(char, itemId);
      });
    });

    // Equipar/Desequipar Escudo
    this.container.querySelectorAll('.btn-toggle-equip-shield').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.toggleEquipShield(char, itemId);
      });
    });

    // Equipar/Desequipar Arma
    this.container.querySelectorAll('.btn-toggle-equip-weapon').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.toggleEquipWeapon(char, itemId);
      });
    });

    // Activar/Desactivar accesorio genérico
    this.container.querySelectorAll('.btn-toggle-equip-generic').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        const item = (char.inventory || []).find(i => String(i.id) === String(itemId));
        if (item) {
          item.isEquipped = !item.isEquipped;
          store.saveCharacter(char);
        }
      });
    });

    // Alternar Sintonización (Attunement máx 3)
    this.container.querySelectorAll('.btn-toggle-attune').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        this.toggleAttunement(char, itemId);
      });
    });

    // Gastar / Recuperar cargas de objeto en la Hoja de Personaje
    this.container.querySelectorAll('.btn-sheet-item-charge').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar) {
          store.updateItemCharges(activeChar.id, itemId, delta);
        }
      });
    });

    // Gastar / Añadir cantidad de consumible o sortilegio en la Hoja de Personaje
    this.container.querySelectorAll('.btn-sheet-item-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar) {
          store.updateInventoryItemQuantity(activeChar.id, itemId, delta);
        }
      });
    });

    // Eliminar objeto del inventario con confirmación modal
    this.container.querySelectorAll('.btn-delete-item').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        const item = (char.inventory || []).find(i => String(i.id) === String(itemId));
        const confirmed = await showConfirmModal({
          title: 'Eliminar Objeto',
          message: `¿Deseas eliminar "${item?.name || 'este objeto'}" del inventario de ${char.name}?`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          danger: true,
          icon: 'trash-2'
        });
        if (confirmed) {
          this.deleteInventoryItem(char, itemId);
          showToast.info(`"${item?.name || 'Objeto'}" eliminado del inventario.`);
        }
      });
    });

    // Modal Añadir / Editar Objeto
    const itemDialog = this.container.querySelector('#modal-sheet-add-item');

    // Botón Editar Objeto del Inventario (Requisito: permitir editar objetos en la hoja interactiva)
    this.container.querySelectorAll('.btn-edit-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.itemId;
        const item = (char.inventory || []).find(it => String(it.id) === String(itemId));
        if (!item) return;

        const editIdInput = this.container.querySelector('#input-edit-item-id');
        if (editIdInput) editIdInput.value = item.id;

        const titleText = this.container.querySelector('#modal-item-title-text');
        if (titleText) titleText.textContent = `Editar Objeto: ${item.name}`;

        const saveBtn = this.container.querySelector('#btn-save-item-modal');
        if (saveBtn) saveBtn.textContent = 'Guardar Cambios';

        const nameInput = this.container.querySelector('#input-item-name');
        if (nameInput) nameInput.value = item.name || '';

        const catSelect = this.container.querySelector('#input-item-category');
        if (catSelect) {
          catSelect.value = item.category || 'equipo';
          this.handleItemCategoryChange(catSelect.value);
        }

        const qtyInput = this.container.querySelector('#input-item-quantity');
        if (qtyInput) qtyInput.value = item.quantity || 1;

        const weightInput = this.container.querySelector('#input-item-weight');
        if (weightInput) weightInput.value = item.weight ?? 0;

        const magicInput = this.container.querySelector('#input-item-magic-bonus');
        if (magicInput) magicInput.value = item.magicBonus || 0;

        const descInput = this.container.querySelector('#input-item-desc');
        if (descInput) descInput.value = item.description || '';

        const attuneCheck = this.container.querySelector('#check-item-attunement');
        if (attuneCheck) attuneCheck.checked = !!item.requiresAttunement;

        const equipCheck = this.container.querySelector('#check-item-equip-now');
        if (equipCheck) equipCheck.checked = !!item.isEquipped;

        const maxChargesInput = this.container.querySelector('#input-item-max-charges');
        if (maxChargesInput) maxChargesInput.value = item.maxCharges || 0;

        const curChargesInput = this.container.querySelector('#input-item-current-charges');
        if (curChargesInput) curChargesInput.value = item.currentCharges ?? (item.maxCharges || 0);

        const recInput = this.container.querySelector('#input-item-charge-recovery');
        if (recInput) recInput.value = item.chargeRecovery || '';

        if (item.category === 'arma') {
          const dmgInp = this.container.querySelector('#input-item-damage');
          if (dmgInp) dmgInp.value = item.damage || '1d6';
          const dmgTypeSel = this.container.querySelector('#input-item-damage-type');
          if (dmgTypeSel) dmgTypeSel.value = item.damageType || 'Cortante';
          const mastInp = this.container.querySelector('#input-item-mastery');
          if (mastInp) mastInp.value = item.masteryProperty || 'Ninguna';
        }

        this.currentCatalogItemModifiers = item.statModifiers ? JSON.parse(JSON.stringify(item.statModifiers)) : [];
        this.currentCustomFunctions = item.customFunctions ? JSON.parse(JSON.stringify(item.customFunctions)) : [];
        this.currentArtifactProperties = item.artifactProperties ? JSON.parse(JSON.stringify(item.artifactProperties)) : [];
        this.currentCatalogBaseName = item.name || '';
        this.hasUserEditedItemName = true;

        this.renderItemModalDynamicLists();
        itemDialog?.showModal();
      });
    });

    this.container.querySelector('#btn-sheet-open-add-item')?.addEventListener('click', () => {
      const editIdInput = this.container.querySelector('#input-edit-item-id');
      if (editIdInput) editIdInput.value = '';

      const titleText = this.container.querySelector('#modal-item-title-text');
      if (titleText) titleText.textContent = 'Añadir Objeto al Inventario';

      const saveBtn = this.container.querySelector('#btn-save-item-modal');
      if (saveBtn) saveBtn.textContent = 'Guardar en Inventario';

      const catSel = this.container.querySelector('#select-preset-catalog-item');
      if (catSel) catSel.value = '';
      const nameInput = this.container.querySelector('#input-item-name');
      if (nameInput) nameInput.value = '';
      const catSelect = this.container.querySelector('#input-item-category');
      if (catSelect) {
        catSelect.value = 'equipo';
        this.handleItemCategoryChange('equipo');
      }
      const qtyInput = this.container.querySelector('#input-item-quantity');
      if (qtyInput) qtyInput.value = '1';
      const weightInput = this.container.querySelector('#input-item-weight');
      if (weightInput) weightInput.value = '1';
      const magicInput = this.container.querySelector('#input-item-magic-bonus');
      if (magicInput) magicInput.value = '0';
      const descInput = this.container.querySelector('#input-item-desc');
      if (descInput) descInput.value = '';
      const maxChInput = this.container.querySelector('#input-item-max-charges');
      if (maxChInput) maxChInput.value = '0';
      const curChInput = this.container.querySelector('#input-item-current-charges');
      if (curChInput) curChInput.value = '0';
      const recInput = this.container.querySelector('#input-item-charge-recovery');
      if (recInput) recInput.value = '';

      this.currentCatalogBaseName = '';
      this.hasUserEditedItemName = false;
      this.currentCatalogItemModifiers = [];
      this.currentCustomFunctions = [];
      this.currentArtifactProperties = [];

      this.populateScrollSpellsByLevel(parseInt(this.container.querySelector('#select-scroll-level')?.value || '1', 10));
      this.renderItemModalDynamicLists();
      itemDialog?.showModal();
    });
    this.container.querySelector('#btn-close-item-modal')?.addEventListener('click', () => itemDialog?.close());
    this.container.querySelector('#btn-cancel-item-modal')?.addEventListener('click', () => itemDialog?.close());

    // Filtro por texto en el selector de objetos del catálogo (Requisito 1.5)
    const filterCatalogSelectByQuery = (selectEl, rawQuery) => {
      if (!selectEl) return;
      const q = (rawQuery || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      selectEl.querySelectorAll('optgroup').forEach(group => {
        let visibleInGroup = 0;
        group.querySelectorAll('option').forEach(opt => {
          const text = (opt.textContent || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const match = !q || text.includes(q);
          opt.hidden = !match;
          opt.style.display = match ? '' : 'none';
          if (match) visibleInGroup++;
        });
        group.hidden = visibleInGroup === 0;
        group.style.display = visibleInGroup > 0 ? '' : 'none';
      });
      // Opciones directas fuera de optgroup (salvo la primera vacía)
      selectEl.querySelectorAll(':scope > option').forEach((opt, idx) => {
        if (idx === 0) return;
        const text = (opt.textContent || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const match = !q || text.includes(q);
        opt.hidden = !match;
        opt.style.display = match ? '' : 'none';
      });
    };

    const filterItemInput = this.container.querySelector('#input-filter-catalog-item');
    const catalogSelect = this.container.querySelector('#select-preset-catalog-item');
    filterItemInput?.addEventListener('input', (e) => {
      filterCatalogSelectByQuery(catalogSelect, e.target.value);
    });

    // Selector de catálogo de objetos predefinidos
    catalogSelect?.addEventListener('change', (e) => {
      this.populateItemModalFromCatalog(e.target.value);
    });

    // Sincronizar cargas máximas con cargas actuales cuando se edita Cargas Máx.
    const maxChargesInput = this.container.querySelector('#input-item-max-charges');
    const curChargesInput = this.container.querySelector('#input-item-current-charges');
    maxChargesInput?.addEventListener('input', () => {
      const maxVal = Math.max(0, parseInt(maxChargesInput.value, 10) || 0);
      if (curChargesInput) {
        curChargesInput.value = maxVal;
      }
    });

    // Control de edición manual del nombre y sincronización automática con Mejora Mágica (+1, +2, +3)
    const itemNameInput = this.container.querySelector('#input-item-name');
    const itemMagicInput = this.container.querySelector('#input-item-magic-bonus');
    itemNameInput?.addEventListener('input', () => {
      if (!this.currentCatalogBaseName) return;
      const currentVal = itemNameInput.value.trim();
      const bonus = parseInt(itemMagicInput?.value, 10) || 0;
      const expectedWithBonus = bonus > 0 ? `${this.currentCatalogBaseName} +${bonus}` : this.currentCatalogBaseName;
      if (currentVal === this.currentCatalogBaseName || currentVal === expectedWithBonus) {
        this.hasUserEditedItemName = false;
      } else {
        this.hasUserEditedItemName = true;
      }
    });
    const onMagicBonusChange = () => {
      this.syncCatalogItemNameWithMagicBonus();
    };
    itemMagicInput?.addEventListener('input', onMagicBonusChange);
    itemMagicInput?.addEventListener('change', onMagicBonusChange);

    // Alternar campos de armas, pergaminos o sortilegios según categoría
    const categorySelect = this.container.querySelector('#input-item-category');
    categorySelect?.addEventListener('change', (e) => {
      this.handleItemCategoryChange(e.target.value);
    });

    // Requisito 2.2: Selector de Nivel de Pergamino (0 a 9) -> filtra los conjuros de ese nivel
    const scrollLevelSelect = this.container.querySelector('#select-scroll-level');
    const scrollSpellSelect = this.container.querySelector('#select-scroll-spell');
    const filterScrollSpellInput = this.container.querySelector('#input-filter-scroll-spell');

    scrollLevelSelect?.addEventListener('change', (e) => {
      const lvl = parseInt(e.target.value, 10) || 0;
      this.populateScrollSpellsByLevel(lvl);
      this.applyScrollSelectionToModal(lvl, '');
    });

    filterScrollSpellInput?.addEventListener('input', (e) => {
      filterCatalogSelectByQuery(scrollSpellSelect, e.target.value);
    });

    scrollSpellSelect?.addEventListener('change', (e) => {
      const lvl = parseInt(scrollLevelSelect?.value || '0', 10);
      this.applyScrollSelectionToModal(lvl, e.target.value);
    });

    // Requisito 3.1: Añadir Modificador de Estadística al Objeto
    this.container.querySelector('#btn-add-item-stat-mod')?.addEventListener('click', () => {
      const target = this.container.querySelector('#select-new-item-mod-target')?.value || 'ac';
      const mode = this.container.querySelector('#select-new-item-mod-mode')?.value || 'bonus';
      const value = parseInt(this.container.querySelector('#input-new-item-mod-val')?.value, 10) || 1;
      if (!Array.isArray(this.currentCatalogItemModifiers)) this.currentCatalogItemModifiers = [];
      this.currentCatalogItemModifiers.push({
        target,
        mode,
        value,
        description: `${mode === 'override_if_lower' ? `Mín ${value}` : `+${value}`} ${target.toUpperCase()}`
      });
      this.renderItemModalDynamicLists();
    });

    // Requisito 3.1: Añadir Función / Cualidad Especial al Objeto
    this.container.querySelector('#btn-add-item-custom-func')?.addEventListener('click', () => {
      const fnNameEl = this.container.querySelector('#input-new-func-name');
      const fnActEl = this.container.querySelector('#select-new-func-activation');
      const fnDescEl = this.container.querySelector('#input-new-func-desc');
      const fnName = fnNameEl?.value?.trim();
      const fnDesc = fnDescEl?.value?.trim();
      if (!fnName && !fnDesc) return;
      if (!Array.isArray(this.currentCustomFunctions)) this.currentCustomFunctions = [];
      this.currentCustomFunctions.push({
        name: fnName || 'Cualidad Especial',
        activation: fnActEl?.value || 'Pasiva',
        description: fnDesc || ''
      });
      if (fnNameEl) fnNameEl.value = '';
      if (fnDescEl) fnDescEl.value = '';
      this.renderItemModalDynamicLists();
    });

    // Requisito 3.2: Añadir o tirar al azar Propiedades de Artefacto (Beneficios y Perjuicios Menores/Mayores)
    this.container.querySelectorAll('.btn-add-art-prop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const group = e.currentTarget.dataset.propGroup;
        const selId = e.currentTarget.dataset.selectId;
        const sel = this.container.querySelector(`#${selId}`);
        const propId = sel?.value;
        if (!group || !propId) return;
        const list = DND55_ARTIFACT_PROPERTIES?.[group] || [];
        const found = list.find(p => p.id === propId);
        if (found) {
          if (!Array.isArray(this.currentArtifactProperties)) this.currentArtifactProperties = [];
          this.currentArtifactProperties.push({ ...found, type: group });
          this.renderItemModalDynamicLists();
        }
      });
    });

    this.container.querySelectorAll('.btn-rand-art-prop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const group = e.currentTarget.dataset.propGroup;
        const list = DND55_ARTIFACT_PROPERTIES?.[group] || [];
        if (list.length === 0) return;
        const pick = list[Math.floor(Math.random() * list.length)];
        if (pick) {
          if (!Array.isArray(this.currentArtifactProperties)) this.currentArtifactProperties = [];
          this.currentArtifactProperties.push({ ...pick, type: group });
          this.renderItemModalDynamicLists();
          showToast(`🎲 Propiedad añadida: ${pick.name}`, 'info');
        }
      });
    });

    // Formulario Añadir Objeto
    this.container.querySelector('#form-sheet-add-item')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.syncCatalogItemNameWithMagicBonus();
      this.saveNewInventoryItem(char, itemDialog);
    });

    // ==========================================
    // REQUISITO 5: RASGOS Y BENDICIONES DIVINAS
    // ==========================================

    // Alternar estado activo/inactivo de un rasgo o bendición
    this.container.querySelectorAll('.btn-toggle-trait-active').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const traitId = e.currentTarget.dataset.traitId;
        this.toggleTraitActive(char, traitId);
      });
    });

    // Eliminar rasgo o bendición con confirmación modal
    this.container.querySelectorAll('.btn-delete-trait').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const traitId = e.currentTarget.dataset.traitId;
        const trait = (char.specialAbilities || []).find(t => String(t.id) === String(traitId));
        const confirmed = await showConfirmModal({
          title: 'Eliminar Rasgo / Don',
          message: `¿Deseas eliminar "${trait?.name || 'este rasgo'}" de la ficha de ${char.name}?`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          danger: true,
          icon: 'trash-2'
        });
        if (confirmed) {
          this.deleteTrait(char, traitId);
          showToast.info(`"${trait?.name || 'Rasgo'}" eliminado.`);
        }
      });
    });

    // Modal Añadir / Editar Rasgo o Don
    const traitDialog = this.container.querySelector('#modal-sheet-add-trait');
    this.container.querySelector('#btn-sheet-open-add-trait')?.addEventListener('click', () => {
      const idInput = this.container.querySelector('#input-trait-id');
      if (idInput) idInput.value = '';
      const nameInput = this.container.querySelector('#input-trait-name');
      if (nameInput) nameInput.value = '';
      const srcInput = this.container.querySelector('#input-trait-source');
      if (srcInput) srcInput.value = 'Bendición Divina';
      const descInput = this.container.querySelector('#input-trait-desc');
      if (descInput) descInput.value = '';
      const targetSel = this.container.querySelector('#input-trait-target');
      if (targetSel) targetSel.value = 'con';
      const modeSel = this.container.querySelector('#input-trait-mode');
      if (modeSel) modeSel.value = 'bonus';
      const valInput = this.container.querySelector('#input-trait-value');
      if (valInput) valInput.value = '2';
      const titleEl = this.container.querySelector('#title-trait-modal');
      if (titleEl) titleEl.innerHTML = '<i data-lucide="sparkles"></i> Añadir Don, Rasgo o Bendición Divina';
      const submitBtn = this.container.querySelector('#btn-submit-trait-modal');
      if (submitBtn) submitBtn.textContent = 'Guardar Rasgo / Don';
      const presetSel = this.container.querySelector('#select-preset-trait');
      if (presetSel) presetSel.value = '';
      if (window.lucide) window.lucide.createIcons();
      traitDialog?.showModal();
    });

    // Botones Editar Don o Bendición
    this.container.querySelectorAll('.btn-edit-trait').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const traitId = e.currentTarget.dataset.traitId;
        const activeChar = store.getSelectedCharacter() || char;
        const trait = (activeChar?.specialAbilities || []).find(t => String(t.id) === String(traitId));
        if (!trait) return;

        const idInput = this.container.querySelector('#input-trait-id');
        if (idInput) idInput.value = trait.id;
        const nameInput = this.container.querySelector('#input-trait-name');
        if (nameInput) nameInput.value = trait.name || '';
        const srcInput = this.container.querySelector('#input-trait-source');
        if (srcInput) srcInput.value = trait.source || 'Bendición Divina';
        const descInput = this.container.querySelector('#input-trait-desc');
        if (descInput) descInput.value = trait.description || '';

        const mod = trait.statModifiers?.[0];
        const targetSel = this.container.querySelector('#input-trait-target');
        if (targetSel) targetSel.value = mod?.target || 'none';
        const modeSel = this.container.querySelector('#input-trait-mode');
        if (modeSel) modeSel.value = mod?.mode || 'bonus';
        const valInput = this.container.querySelector('#input-trait-value');
        if (valInput) valInput.value = mod?.value !== undefined ? mod.value : 0;

        const titleEl = this.container.querySelector('#title-trait-modal');
        if (titleEl) titleEl.innerHTML = '<i data-lucide="edit-3"></i> Editar Don o Bendición';
        const submitBtn = this.container.querySelector('#btn-submit-trait-modal');
        if (submitBtn) submitBtn.textContent = 'Guardar Cambios';
        const presetSel = this.container.querySelector('#select-preset-trait');
        if (presetSel) presetSel.value = '';
        if (window.lucide) window.lucide.createIcons();

        traitDialog?.showModal();
      });
    });

    this.container.querySelector('#btn-close-trait-modal')?.addEventListener('click', () => traitDialog?.close());
    this.container.querySelector('#btn-cancel-trait-modal')?.addEventListener('click', () => traitDialog?.close());

    // Selector de plantillas de bendición
    const traitPresetSelect = this.container.querySelector('#select-preset-trait');
    traitPresetSelect?.addEventListener('change', (e) => {
      this.populateTraitModalFromPreset(e.target.value);
    });

    // Formulario Guardar Rasgo / Don
    this.container.querySelector('#form-sheet-add-trait')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveOrUpdateTrait(char, traitDialog);
    });

    // Modal Gestionar Pericias y Habilidades
    const skillsDialog = this.container.querySelector('#modal-sheet-edit-skills');
    this.container.querySelector('#btn-sheet-edit-skills')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;

      const skillsMap = calculateSkills(activeChar);
      const maxExp = getMaxAllowedExpertiseCount(activeChar);
      const curExp = Array.isArray(activeChar.expertiseSkills)
        ? [...activeChar.expertiseSkills]
        : Object.entries(skillsMap).filter(([_, data]) => data.proficiency === 'expertise').map(([name]) => name);

      const maxExpEl = skillsDialog?.querySelector('#skills-modal-max-exp');
      if (maxExpEl) maxExpEl.textContent = String(maxExp);

      const tbody = skillsDialog?.querySelector('#skills-modal-tbody');
      if (tbody) {
        tbody.innerHTML = DND55_SKILLS.map(sk => {
          const skData = skillsMap[sk.name];
          const isProf = skData && skData.proficiency !== 'none';
          const isExp = curExp.includes(sk.name);
          const abShort = getAbilityShortName(sk.ability);

          return `
            <tr>
              <td>
                <strong class="text-light">${escapeHtml(sk.name)}</strong>
              </td>
              <td class="text-center">
                <span class="badge bg-secondary" style="font-size: 0.7rem;">${abShort}</span>
              </td>
              <td class="text-center">
                <div class="form-check form-check-inline m-0">
                  <input class="form-check-input chk-modal-skill-prof" type="checkbox" id="modal-prof-${escapeHtml(sk.name)}" data-skill="${escapeHtml(sk.name)}" ${isProf ? 'checked' : ''}>
                  <label class="form-check-label text-light small" for="modal-prof-${escapeHtml(sk.name)}">● Competente</label>
                </div>
              </td>
              <td class="text-center">
                <div class="form-check form-check-inline m-0">
                  <input class="form-check-input chk-modal-skill-exp" type="checkbox" id="modal-exp-${escapeHtml(sk.name)}" data-skill="${escapeHtml(sk.name)}" ${isExp ? 'checked' : ''} ${!isProf ? 'disabled' : ''}>
                  <label class="form-check-label text-warning small" for="modal-exp-${escapeHtml(sk.name)}">★ Pericia</label>
                </div>
              </td>
            </tr>
          `;
        }).join('');

        // Listeners interactivos dentro del modal
        const updateSummary = () => {
          const checkedExp = tbody.querySelectorAll('.chk-modal-skill-exp:checked').length;
          const summaryEl = skillsDialog?.querySelector('#skills-modal-summary');
          if (summaryEl) {
            summaryEl.innerHTML = `Pericias seleccionadas: <strong>${checkedExp}</strong> de <strong>${maxExp}</strong>`;
            if (checkedExp > maxExp) {
              summaryEl.classList.add('text-danger');
              summaryEl.classList.remove('text-secondary');
            } else {
              summaryEl.classList.remove('text-danger');
              summaryEl.classList.add('text-secondary');
            }
          }
        };

        tbody.querySelectorAll('.chk-modal-skill-prof').forEach(chk => {
          chk.addEventListener('change', (e) => {
            const skName = e.target.dataset.skill;
            const expChk = tbody.querySelector(`.chk-modal-skill-exp[data-skill="${skName}"]`);
            if (expChk) {
              expChk.disabled = !e.target.checked;
              if (!e.target.checked) expChk.checked = false;
            }
            updateSummary();
          });
        });

        tbody.querySelectorAll('.chk-modal-skill-exp').forEach(chk => {
          chk.addEventListener('change', () => {
            updateSummary();
          });
        });

        updateSummary();
      }

      skillsDialog?.showModal();
    });

    this.container.querySelector('#btn-close-skills-modal')?.addEventListener('click', () => skillsDialog?.close());
    this.container.querySelector('#btn-cancel-skills-modal')?.addEventListener('click', () => skillsDialog?.close());

    // Submit Guardar Habilidades y Pericias
    this.container.querySelector('#form-sheet-edit-skills')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;

      const checkedExp = Array.from(skillsDialog.querySelectorAll('.chk-modal-skill-exp:checked')).map(el => el.dataset.skill);
      const checkedProf = Array.from(skillsDialog.querySelectorAll('.chk-modal-skill-prof:checked')).map(el => el.dataset.skill);

      activeChar.expertiseSkills = checkedExp;
      activeChar.chosenClassSkills = checkedProf;

      store.saveCharacter(activeChar);
      skillsDialog?.close();
      showToast.success('Pericias y competencias de habilidades guardadas.');
    });

    // Alternar Inspiración Heroica (D&D 5.5)
    this.container.querySelector('#btn-sheet-toggle-inspiration')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        store.toggleHeroicInspiration(activeChar.id);
      }
    });

    // Modificar Dados de Golpe Gastados/Disponibles
    this.container.querySelectorAll('.btn-sheet-hd').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const delta = parseInt(e.currentTarget.dataset.delta, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar) {
          store.updateHitDice(activeChar.id, delta);
        }
      });
    });

    // Salvaciones contra la Muerte (Éxitos / Fracasos)
    this.container.querySelectorAll('.btn-sheet-death-save').forEach(el => {
      el.addEventListener('click', (e) => {
        const type = e.currentTarget.dataset.type;
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar) {
          store.toggleDeathSave(activeChar.id, type, idx);
        }
      });
    });

    this.container.querySelector('.btn-sheet-reset-death')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        store.resetDeathSaves(activeChar.id);
      }
    });

    // Modal Modificar Monedas / Riqueza
    const curDialog = this.container.querySelector('#modal-sheet-edit-currency');
    this.container.querySelector('#btn-sheet-edit-currency')?.addEventListener('click', () => {
      curDialog?.showModal();
    });
    this.container.querySelector('#btn-close-currency-modal')?.addEventListener('click', () => curDialog?.close());
    this.container.querySelector('#btn-cancel-currency-modal')?.addEventListener('click', () => curDialog?.close());

    this.container.querySelector('#form-sheet-edit-currency')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        const gp = parseInt(document.getElementById('input-cur-gp')?.value, 10) || 0;
        const sp = parseInt(document.getElementById('input-cur-sp')?.value, 10) || 0;
        const cp = parseInt(document.getElementById('input-cur-cp')?.value, 10) || 0;
        const ep = parseInt(document.getElementById('input-cur-ep')?.value, 10) || 0;
        const pp = parseInt(document.getElementById('input-cur-pp')?.value, 10) || 0;
        activeChar.currency = { gp, sp, cp, ep, pp };
        activeChar.gp = gp;
        store.saveCharacter(activeChar);
        curDialog?.close();
      }
    });

    // Modal Añadir Idioma
    const langDialog = this.container.querySelector('#modal-sheet-add-language');
    this.container.querySelector('#btn-sheet-open-add-language')?.addEventListener('click', () => {
      langDialog?.showModal();
    });
    this.container.querySelector('#btn-close-language-modal')?.addEventListener('click', () => langDialog?.close());
    this.container.querySelector('#btn-cancel-language-modal')?.addEventListener('click', () => langDialog?.close());

    this.container.querySelector('#form-sheet-add-language')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        const standard = document.getElementById('select-standard-language')?.value;
        const custom = document.getElementById('input-custom-language')?.value?.trim();
        const chosen = custom || standard;
        if (chosen) {
          if (!Array.isArray(activeChar.languages)) activeChar.languages = [];
          if (!activeChar.languages.includes(chosen)) {
            activeChar.languages.push(chosen);
            store.saveCharacter(activeChar);
          }
        }
        langDialog?.close();
      }
    });

    // Eliminar Idioma
    this.container.querySelectorAll('.btn-remove-language').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar && Array.isArray(activeChar.languages)) {
          activeChar.languages.splice(idx, 1);
          store.saveCharacter(activeChar);
        }
      });
    });

    // Modal Añadir Herramienta
    const toolDialog = this.container.querySelector('#modal-sheet-add-tool');
    this.container.querySelector('#btn-sheet-open-add-tool')?.addEventListener('click', () => {
      toolDialog?.showModal();
    });
    this.container.querySelector('#btn-close-tool-modal')?.addEventListener('click', () => toolDialog?.close());
    this.container.querySelector('#btn-cancel-tool-modal')?.addEventListener('click', () => toolDialog?.close());

    this.container.querySelector('#form-sheet-add-tool')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        const standard = document.getElementById('select-standard-tool')?.value;
        const custom = document.getElementById('input-custom-tool')?.value?.trim();
        const chosen = custom || standard;
        if (chosen) {
          if (!Array.isArray(activeChar.tools)) activeChar.tools = [];
          if (!activeChar.tools.includes(chosen)) {
            activeChar.tools.push(chosen);
            store.saveCharacter(activeChar);
          }
        }
        toolDialog?.close();
      }
    });

    // Eliminar Herramienta (solo herramientas adicionales no concedidas por clase o trasfondo)
    this.container.querySelectorAll('.btn-remove-tool').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        const toolName = e.currentTarget.dataset.tool;
        const activeChar = store.getSelectedCharacter();
        if (activeChar && Array.isArray(activeChar.tools)) {
          const actualTool = toolName || activeChar.tools[idx];
          if (actualTool && this.isProtectedTool(actualTool, activeChar)) {
            showToast.warning(`"${actualTool}" es una competencia fija de tu clase o trasfondo y no se puede eliminar.`, 'Competencia Fija');
            return;
          }
          activeChar.tools.splice(idx, 1);
          store.saveCharacter(activeChar);
        }
      });
    });

    // Modal Añadir Conjuro al Grimorio
    const spellDialog = this.container.querySelector('#modal-sheet-add-spell');
    this.container.querySelector('#btn-sheet-open-add-spell')?.addEventListener('click', () => {
      spellDialog?.showModal();
    });
    this.container.querySelector('#btn-close-spell-modal')?.addEventListener('click', () => spellDialog?.close());
    this.container.querySelector('#btn-cancel-spell-modal')?.addEventListener('click', () => spellDialog?.close());

    // Filtro por texto en el selector de conjuros del catálogo
    const filterSpellInput = this.container.querySelector('#input-filter-catalog-spell');
    const catalogSpellSelect = this.container.querySelector('#select-preset-catalog-spell');
    filterSpellInput?.addEventListener('input', (e) => {
      filterCatalogSelectByQuery(catalogSpellSelect, e.target.value);
    });

    // Cargar automáticamente datos al seleccionar del catálogo oficial
    catalogSpellSelect?.addEventListener('change', (e) => {
      const spellId = e.target.value;
      if (!spellId) return;
      const found = DND55_CANONICAL_SPELLS.find(s => s.id === spellId);
      if (found) {
        const nameInput = this.container.querySelector('#input-spell-name');
        const levelSelect = this.container.querySelector('#input-spell-level');
        const schoolSelect = this.container.querySelector('#input-spell-school');
        const timeInput = this.container.querySelector('#input-spell-time');
        const rangeInput = this.container.querySelector('#input-spell-range');
        const durationInput = this.container.querySelector('#input-spell-duration');
        const descTextarea = this.container.querySelector('#input-spell-desc');
        const atkCheck = this.container.querySelector('#check-spell-is-attack');

        if (nameInput) nameInput.value = found.name || '';
        if (levelSelect) levelSelect.value = String(found.level !== undefined ? found.level : 0);
        if (schoolSelect && found.school) schoolSelect.value = found.school;
        if (timeInput) timeInput.value = found.castingTime || '1 acción';
        if (rangeInput) rangeInput.value = found.range || '18 m';
        if (durationInput) durationInput.value = found.duration || 'Instantáneo';
        if (descTextarea) descTextarea.value = found.description || '';
        if (atkCheck) {
          const activeChar = store.getSelectedCharacter();
          const spInfo = activeChar ? calculateSpellcasting(activeChar) : null;
          const atkInfo = getSpellAttackInfo(found, spInfo, activeChar?.level || 1);
          atkCheck.checked = Boolean(atkInfo?.hasAttackOrSave);
        }
      }
    });

    // Guardar nuevo conjuro
    this.container.querySelector('#form-sheet-add-spell')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter();
      if (activeChar) {
        const name = this.container.querySelector('#input-spell-name')?.value?.trim();
        const level = parseInt(this.container.querySelector('#input-spell-level')?.value, 10) || 0;
        const school = this.container.querySelector('#input-spell-school')?.value?.trim() || 'Evocación';
        const castingTime = this.container.querySelector('#input-spell-time')?.value?.trim() || '1 acción';
        const range = this.container.querySelector('#input-spell-range')?.value?.trim() || 'Personal';
        const duration = this.container.querySelector('#input-spell-duration')?.value?.trim() || 'Instantáneo';
        const description = this.container.querySelector('#input-spell-desc')?.value?.trim() || '';
        const isAttackSpell = Boolean(this.container.querySelector('#check-spell-is-attack')?.checked);

        if (name) {
          if (!Array.isArray(activeChar.spells)) activeChar.spells = [];
          const newSpell = {
            id: `spell_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            name,
            level,
            school,
            castingTime,
            range,
            duration,
            description,
            isAttackSpell
          };
          activeChar.spells.push(newSpell);
          store.saveCharacter(activeChar);
          showToast(`Conjuro "${name}" añadido al grimorio`, 'success');
        }
        spellDialog?.close();
      }
    });

    // Alternar conjuro como Ataque en la tabla de ATAQUES Y ARMAS EQUIPADAS (Requisito 1.6)
    this.container.querySelectorAll('.btn-toggle-spell-attack').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.spellIndex, 10);
        const activeChar = store.getSelectedCharacter();
        if (!activeChar || !Array.isArray(activeChar.spells) || isNaN(idx)) return;
        const entry = activeChar.spells[idx];
        if (!entry) return;
        let spObj;
        if (typeof entry === 'string') {
          const rawEntry = entry.toLowerCase();
          const canonical = DND55_CANONICAL_SPELLS.find(c => c.name.toLowerCase() === rawEntry || c.id === rawEntry || (c.aliases && c.aliases.some(a => a.toLowerCase() === rawEntry)));
          spObj = canonical ? { ...canonical } : { id: `spell_${idx}`, name: entry, level: 0 };
        } else {
          spObj = { ...entry };
        }
        spObj.isAttackSpell = !spObj.isAttackSpell;
        activeChar.spells[idx] = spObj;
        store.saveCharacter(activeChar);
      });
    });

    // Cambiar nivel de lanzamiento (upcast) de un conjuro en la tabla de Ataques y Armas Equipadas
    this.container.querySelectorAll('.select-spell-cast-level').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = parseInt(e.currentTarget.dataset.spellIndex, 10);
        const castLvl = parseInt(e.currentTarget.value, 10);
        const activeChar = store.getSelectedCharacter();
        if (!activeChar || !Array.isArray(activeChar.spells) || isNaN(idx) || isNaN(castLvl)) return;
        const entry = activeChar.spells[idx];
        if (!entry) return;
        let spObj;
        if (typeof entry === 'string') {
          const rawEntry = entry.toLowerCase();
          const canonical = DND55_CANONICAL_SPELLS.find(c => c.name.toLowerCase() === rawEntry || c.id === rawEntry || (c.aliases && c.aliases.some(a => a.toLowerCase() === rawEntry)));
          spObj = canonical ? { ...canonical, isAttackSpell: true } : { id: `spell_${idx}`, name: entry, level: 1, isAttackSpell: true };
        } else {
          spObj = { ...entry };
        }
        spObj.castAtLevel = castLvl;
        activeChar.spells[idx] = spObj;
        store.saveCharacter(activeChar);
      });
    });

    // Eliminar Conjuro del Grimorio
    this.container.querySelectorAll('.btn-delete-spell').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const idx = parseInt(e.currentTarget.dataset.spellIndex, 10);
        const activeChar = store.getSelectedCharacter();
        if (activeChar && Array.isArray(activeChar.spells)) {
          const spName = activeChar.spells[idx]?.name || (typeof activeChar.spells[idx] === 'string' ? activeChar.spells[idx] : 'este conjuro');
          const confirmed = await showConfirmModal({
            title: 'Eliminar Conjuro',
            message: `¿Deseas eliminar "${spName}" del grimorio de ${activeChar.name}?`,
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
            danger: true,
            icon: 'trash-2'
          });
          if (confirmed) {
            activeChar.spells.splice(idx, 1);
            store.saveCharacter(activeChar);
            showToast(`Conjuro "${spName}" eliminado`, 'info');
          }
        }
      });
    });

    // ==========================================
    // MODAL: MEJORA DE VIDA POR NIVEL (MEDIA O DADO)
    // ==========================================
    const hpLevelsDialog = this.container.querySelector('#modal-sheet-hp-levels');
    const openHpLevelsModal = () => {
      this.keepHpModalOpen = true;
      hpLevelsDialog?.showModal();
    };
    const closeHpLevelsModal = () => {
      this.keepHpModalOpen = false;
      hpLevelsDialog?.close();
    };

    this.container.querySelector('#btn-sheet-open-hp-levels')?.addEventListener('click', openHpLevelsModal);
    this.container.querySelector('.btn-open-hp-levels-strip')?.addEventListener('click', openHpLevelsModal);
    this.container.querySelector('#btn-close-hp-levels-modal')?.addEventListener('click', closeHpLevelsModal);
    this.container.querySelector('#btn-done-hp-levels-modal')?.addEventListener('click', closeHpLevelsModal);
    hpLevelsDialog?.addEventListener('cancel', () => {
      this.keepHpModalOpen = false;
    });

    // Cambiar modo (Media vs Dado) en un nivel concreto
    this.container.querySelectorAll('.btn-hp-level-mode').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lvl = parseInt(e.currentTarget.dataset.level, 10);
        const mode = e.currentTarget.dataset.mode;
        const activeChar = store.getSelectedCharacter();
        if (!activeChar || !lvl) return;

        const clsDef = DND55_CLASSES.find(c => c.id === activeChar.classId);
        const die = clsDef?.hitDie || 8;
        const defaultAvg = Math.floor(die / 2) + 1;

        this.updateCharacterHpRolls(activeChar, (rolls) => {
          if (mode === 'average') {
            rolls[lvl] = { mode: 'average', dieValue: defaultAvg };
          } else {
            const currentVal = rolls[lvl]?.dieValue || defaultAvg;
            rolls[lvl] = { mode: 'roll', dieValue: currentVal };
          }
        });
      });
    });

    // Cambiar valor numérico manual del dado en un nivel concreto
    this.container.querySelectorAll('.select-hp-level-die').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const lvl = parseInt(e.currentTarget.dataset.level, 10);
        const val = parseInt(e.currentTarget.value, 10);
        const activeChar = store.getSelectedCharacter();
        if (!activeChar || !lvl || isNaN(val)) return;

        const clsDef = DND55_CLASSES.find(c => c.id === activeChar.classId);
        const die = clsDef?.hitDie || 8;
        const defaultAvg = Math.floor(die / 2) + 1;

        this.updateCharacterHpRolls(activeChar, (rolls) => {
          rolls[lvl] = {
            mode: val === defaultAvg && rolls[lvl]?.mode !== 'roll' ? 'average' : 'roll',
            dieValue: Math.max(1, Math.min(die, val))
          };
        });
      });
    });

    // Botón Tirar 1dX en un nivel concreto
    this.container.querySelectorAll('.btn-hp-level-roll').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lvl = parseInt(e.currentTarget.dataset.level, 10);
        const activeChar = store.getSelectedCharacter();
        if (!activeChar || !lvl) return;

        const clsDef = DND55_CLASSES.find(c => c.id === activeChar.classId);
        const die = clsDef?.hitDie || 8;
        const rolled = rollDie(die);

        this.updateCharacterHpRolls(activeChar, (rolls) => {
          rolls[lvl] = { mode: 'roll', dieValue: rolled };
        }, `🎲 Nivel ${lvl}: Has sacado un ${rolled} en 1d${die}`);
      });
    });

    // Botón Aplicar Media a Todos los Niveles (2..N)
    this.container.querySelector('#btn-hp-modal-all-avg')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter();
      if (!activeChar) return;
      const clsDef = DND55_CLASSES.find(c => c.id === activeChar.classId);
      const die = clsDef?.hitDie || 8;
      const defaultAvg = Math.floor(die / 2) + 1;

      this.updateCharacterHpRolls(activeChar, (rolls) => {
        for (let l = 2; l <= activeChar.level; l++) {
          rolls[l] = { mode: 'average', dieValue: defaultAvg };
        }
      }, `📏 Aplicada la media fija (${defaultAvg}) a todos los niveles`);
    });

    // Botón Tirar Dados en Todos los Niveles (2..N)
    this.container.querySelector('#btn-hp-modal-roll-all')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter();
      if (!activeChar) return;
      const clsDef = DND55_CLASSES.find(c => c.id === activeChar.classId);
      const die = clsDef?.hitDie || 8;
      const results = [];

      this.updateCharacterHpRolls(activeChar, (rolls) => {
        for (let l = 2; l <= activeChar.level; l++) {
          const r = rollDie(die);
          rolls[l] = { mode: 'roll', dieValue: r };
          results.push(`Nv${l}: ${r}`);
        }
      }, `🎲 Tiradas (1d${die}): ${results.join(', ')}`);
    });

    // Modal Editar Aspecto Físico
    const appDialog = this.container.querySelector('#modal-sheet-edit-appearance');
    this.container.querySelector('#btn-sheet-edit-appearance')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;
      const curApp = activeChar.appearance || {};
      const ageInput = appDialog?.querySelector('#input-app-age');
      const genderInput = appDialog?.querySelector('#input-app-gender');
      const heightInput = appDialog?.querySelector('#input-app-height');
      const weightInput = appDialog?.querySelector('#input-app-weight');
      const eyesInput = appDialog?.querySelector('#input-app-eyes');
      const skinInput = appDialog?.querySelector('#input-app-skin');
      const hairInput = appDialog?.querySelector('#input-app-hair');
      const descInput = appDialog?.querySelector('#input-app-desc');

      if (ageInput) ageInput.value = curApp.age || activeChar.age || '';
      if (genderInput) genderInput.value = curApp.gender || activeChar.gender || '';
      if (heightInput) heightInput.value = curApp.height || activeChar.height || '';
      if (weightInput) weightInput.value = curApp.weight || activeChar.weight || '';
      if (eyesInput) eyesInput.value = curApp.eyes || activeChar.eyes || '';
      if (skinInput) skinInput.value = curApp.skin || activeChar.skin || '';
      if (hairInput) hairInput.value = curApp.hair || activeChar.hair || '';
      if (descInput) descInput.value = curApp.description || activeChar.description || activeChar.appearanceNotes || '';

      appDialog?.showModal();
    });
    this.container.querySelector('#btn-close-appearance-modal')?.addEventListener('click', () => appDialog?.close());
    this.container.querySelector('#btn-cancel-appearance-modal')?.addEventListener('click', () => appDialog?.close());

    this.container.querySelector('#form-sheet-edit-appearance')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;

      const age = appDialog?.querySelector('#input-app-age')?.value?.trim() || '';
      const gender = appDialog?.querySelector('#input-app-gender')?.value?.trim() || '';
      const height = appDialog?.querySelector('#input-app-height')?.value?.trim() || '';
      const weight = appDialog?.querySelector('#input-app-weight')?.value?.trim() || '';
      const eyes = appDialog?.querySelector('#input-app-eyes')?.value?.trim() || '';
      const skin = appDialog?.querySelector('#input-app-skin')?.value?.trim() || '';
      const hair = appDialog?.querySelector('#input-app-hair')?.value?.trim() || '';
      const description = appDialog?.querySelector('#input-app-desc')?.value?.trim() || '';

      activeChar.appearance = {
        age,
        gender,
        height,
        weight,
        eyes,
        skin,
        hair,
        description
      };
      activeChar.age = age;
      activeChar.gender = gender;
      activeChar.height = height;
      activeChar.weight = weight;
      activeChar.eyes = eyes;
      activeChar.skin = skin;
      activeChar.hair = hair;
      activeChar.description = description;

      appDialog?.close();
      store.saveCharacter(activeChar);
      showToast.success('Aspecto físico actualizado');
    });

    // Modal Editar Historia y Personalidad
    const persDialog = this.container.querySelector('#modal-sheet-edit-personality');
    this.container.querySelector('#btn-sheet-edit-personality')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;
      const curPers = activeChar.personality || {};
      const traitsInput = persDialog?.querySelector('#input-pers-traits');
      const idealsInput = persDialog?.querySelector('#input-pers-ideals');
      const bondsInput = persDialog?.querySelector('#input-pers-bonds');
      const flawsInput = persDialog?.querySelector('#input-pers-flaws');
      const alliesInput = persDialog?.querySelector('#input-pers-allies');
      const backstoryInput = persDialog?.querySelector('#input-pers-backstory');

      if (traitsInput) traitsInput.value = curPers.traits || activeChar.personalityTraits || '';
      if (idealsInput) idealsInput.value = curPers.ideals || activeChar.ideals || '';
      if (bondsInput) bondsInput.value = curPers.bonds || activeChar.bonds || '';
      if (flawsInput) flawsInput.value = curPers.flaws || activeChar.flaws || '';
      if (alliesInput) alliesInput.value = activeChar.allies || '';
      if (backstoryInput) backstoryInput.value = activeChar.backstory || '';

      persDialog?.showModal();
    });
    this.container.querySelector('#btn-close-personality-modal')?.addEventListener('click', () => persDialog?.close());
    this.container.querySelector('#btn-cancel-personality-modal')?.addEventListener('click', () => persDialog?.close());

    this.container.querySelector('#form-sheet-edit-personality')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;

      const traits = persDialog?.querySelector('#input-pers-traits')?.value?.trim() || '';
      const ideals = persDialog?.querySelector('#input-pers-ideals')?.value?.trim() || '';
      const bonds = persDialog?.querySelector('#input-pers-bonds')?.value?.trim() || '';
      const flaws = persDialog?.querySelector('#input-pers-flaws')?.value?.trim() || '';
      const allies = persDialog?.querySelector('#input-pers-allies')?.value?.trim() || '';
      const backstory = persDialog?.querySelector('#input-pers-backstory')?.value?.trim() || '';

      activeChar.personality = {
        traits,
        ideals,
        bonds,
        flaws
      };
      activeChar.personalityTraits = traits;
      activeChar.ideals = ideals;
      activeChar.bonds = bonds;
      activeChar.flaws = flaws;
      activeChar.allies = allies;
      activeChar.backstory = backstory;

      persDialog?.close();
      store.saveCharacter(activeChar);
      showToast.success('Historia y personalidad actualizadas');
    });

    // Modal Editar Identidad y Origen
    const idDialog = this.container.querySelector('#modal-sheet-edit-identity');
    this.container.querySelector('#btn-sheet-edit-identity')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;
      const nameInp = idDialog?.querySelector('#input-edit-char-name');
      const playerInp = idDialog?.querySelector('#input-edit-player-name');
      const speciesSel = idDialog?.querySelector('#select-edit-species');
      const alignSel = idDialog?.querySelector('#select-edit-alignment');
      const bgSel = idDialog?.querySelector('#select-edit-background');

      if (nameInp) nameInp.value = activeChar.name || '';
      if (playerInp) playerInp.value = activeChar.playerName || '';
      if (speciesSel) speciesSel.value = activeChar.speciesId || 'humano';
      if (alignSel) alignSel.value = activeChar.alignment || 'Neutral Bueno';
      if (bgSel) {
        bgSel.value = activeChar.backgroundId || 'soldado';
        const customBgContainer = idDialog?.querySelector('#container-custom-bg-name');
        if (customBgContainer) {
          customBgContainer.classList.toggle('d-none', bgSel.value !== 'personalizado');
        }
        const customBgInput = idDialog?.querySelector('#input-edit-custom-bg-name');
        if (customBgInput) {
          customBgInput.value = activeChar.customBackground?.name || activeChar.customBackgroundName || '';
        }
      }

      idDialog?.showModal();
    });
    const bgSelEl = idDialog?.querySelector('#select-edit-background');
    if (bgSelEl) {
      bgSelEl.addEventListener('change', () => {
        const customBgContainer = idDialog?.querySelector('#container-custom-bg-name');
        if (customBgContainer) {
          customBgContainer.classList.toggle('d-none', bgSelEl.value !== 'personalizado');
        }
      });
    }
    this.container.querySelector('#btn-close-identity-modal')?.addEventListener('click', () => idDialog?.close());
    this.container.querySelector('#btn-cancel-identity-modal')?.addEventListener('click', () => idDialog?.close());

    this.container.querySelector('#form-sheet-edit-identity')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;

      const name = idDialog?.querySelector('#input-edit-char-name')?.value?.trim() || 'Héroe';
      const playerName = idDialog?.querySelector('#input-edit-player-name')?.value?.trim() || '';
      const speciesId = idDialog?.querySelector('#select-edit-species')?.value || 'humano';
      const alignment = idDialog?.querySelector('#select-edit-alignment')?.value || 'Neutral';
      const backgroundId = idDialog?.querySelector('#select-edit-background')?.value || 'soldado';

      activeChar.name = name;
      activeChar.playerName = playerName;
      activeChar.speciesId = speciesId;
      activeChar.alignment = alignment;
      if (activeChar.backgroundId !== backgroundId) {
        activeChar.backgroundId = backgroundId;
        const bgDef = DND55_BACKGROUNDS.find(b => b.id === backgroundId);
        if (bgDef) {
          activeChar.originFeat = bgDef.originFeat;
        }
      }
      if (backgroundId === 'personalizado') {
        const customName = idDialog?.querySelector('#input-edit-custom-bg-name')?.value?.trim();
        if (!activeChar.customBackground) activeChar.customBackground = {};
        if (customName) {
          activeChar.customBackground.name = customName;
        }
      }

      idDialog?.close();
      store.saveCharacter(activeChar);
      showToast.success('¡Identidad y origen actualizados con éxito!');
    });

    // Modal Editar Puntuaciones Base y Mejoras de Trasfondo
    const abDialog = this.container.querySelector('#modal-sheet-edit-abilities');
    this.container.querySelector('#btn-sheet-edit-abilities')?.addEventListener('click', () => {
      const activeChar = store.getSelectedCharacter() || char;
      if (!activeChar) return;
      this.openAbilitiesModal(activeChar, abDialog);
    });
    this.container.querySelector('#btn-close-abilities-modal')?.addEventListener('click', () => abDialog?.close());
    this.container.querySelector('#btn-cancel-abilities-modal')?.addEventListener('click', () => abDialog?.close());

    // Modal Editar Elecciones de Dote
    const featChoiceDialog = this.container.querySelector('#modal-sheet-edit-feat-choice');
    this.container.querySelectorAll('.btn-edit-feat-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const featIdx = parseInt(btn.dataset.featIdx, 10);
        const activeChar = store.getSelectedCharacter() || char;
        if (!activeChar) return;
        const resolvedFeats = getResolvedFeatsForCharacter(activeChar);
        const targetFeat = resolvedFeats[featIdx];
        if (targetFeat) {
          this.openEditFeatChoiceModal(targetFeat, activeChar, featChoiceDialog);
        }
      });
    });
    this.container.querySelector('#btn-close-feat-choice-modal')?.addEventListener('click', () => featChoiceDialog?.close());
    this.container.querySelector('#btn-cancel-feat-choice-modal')?.addEventListener('click', () => featChoiceDialog?.close());
  }

  openAbilitiesModal(activeChar, abDialog) {
    if (!abDialog) return;
    const baseScores = activeChar.baseAbilityScores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ab => {
      const inp = abDialog.querySelector(`#input-base-${ab}`);
      if (inp) inp.value = baseScores[ab] ?? 10;
    });

    const modeSelect = abDialog.querySelector('#select-boost-mode');
    const containerBoost = abDialog.querySelector('#container-boost-selectors');
    const previewTbody = abDialog.querySelector('#preview-abilities-tbody');
    const form = abDialog.querySelector('#form-sheet-edit-abilities');

    const bgDef = DND55_BACKGROUNDS.find(b => b.id === activeChar.backgroundId);
    const allowed = Array.isArray(bgDef?.allowedAbilities) && bgDef.allowedAbilities.length > 0
      ? bgDef.allowedAbilities
      : ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    const renderBoostSelectors = () => {
      const mode = modeSelect?.value || '2_1';
      if (mode === '2_1') {
        const curPlus2 = activeChar.backgroundAbilityBoosts?.find(b => b.bonus === 2)?.ability || allowed[0] || 'str';
        const curPlus1 = activeChar.backgroundAbilityBoosts?.find(b => b.bonus === 1)?.ability || allowed.find(a => a !== curPlus2) || 'con';

        containerBoost.innerHTML = `
          <div class="d-flex gap-2">
            <div class="flex-grow-1">
              <label class="form-label small text-warning mb-0 fw-bold">+2 a:</label>
              <select id="select-boost-plus2" class="form-select form-select-sm bg-black text-warning fw-bold border-secondary select-bg-boost">
                ${allowed.map(ab => `<option value="${ab}" ${curPlus2 === ab ? 'selected' : ''}>${getAbilityFullName(ab)} (+2)</option>`).join('')}
              </select>
            </div>
            <div class="flex-grow-1">
              <label class="form-label small text-info mb-0 fw-bold">+1 a:</label>
              <select id="select-boost-plus1" class="form-select form-select-sm bg-black text-info fw-bold border-secondary select-bg-boost">
                ${allowed.map(ab => `<option value="${ab}" ${curPlus1 === ab ? 'selected' : ''}>${getAbilityFullName(ab)} (+1)</option>`).join('')}
              </select>
            </div>
          </div>
        `;
      } else {
        const curBoosts = (activeChar.backgroundAbilityBoosts || []).filter(b => b.bonus === 1).map(b => b.ability);
        const b0 = curBoosts[0] || allowed[0] || 'str';
        const b1 = curBoosts[1] || allowed[1] || 'dex';
        const b2 = curBoosts[2] || allowed[2] || 'con';

        containerBoost.innerHTML = `
          <div class="d-flex gap-1">
            ${[0, 1, 2].map(idx => {
              const val = [b0, b1, b2][idx];
              return `
                <div class="flex-grow-1">
                  <label class="form-label small text-info mb-0 fw-bold">+1 #${idx + 1}:</label>
                  <select id="select-boost-111-${idx}" class="form-select form-select-sm bg-black text-info fw-bold border-secondary select-bg-boost">
                    ${allowed.map(ab => `<option value="${ab}" ${val === ab ? 'selected' : ''}>${getAbilityShortName(ab)} (+1)</option>`).join('')}
                  </select>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      abDialog.querySelectorAll('.select-bg-boost').forEach(sel => {
        sel.addEventListener('change', updatePreview);
      });
    };

    const getSelectedBoosts = () => {
      const mode = modeSelect?.value || '2_1';
      if (mode === '2_1') {
        const p2 = abDialog.querySelector('#select-boost-plus2')?.value || allowed[0] || 'str';
        let p1 = abDialog.querySelector('#select-boost-plus1')?.value || allowed[1] || 'dex';
        if (p1 === p2) {
          p1 = allowed.find(a => a !== p2) || (p2 === 'str' ? 'con' : 'str');
          const p1Sel = abDialog.querySelector('#select-boost-plus1');
          if (p1Sel) p1Sel.value = p1;
        }
        return [
          { ability: p2, bonus: 2 },
          { ability: p1, bonus: 1 }
        ];
      } else {
        const sel0 = abDialog.querySelector('#select-boost-111-0')?.value || allowed[0] || 'str';
        const sel1 = abDialog.querySelector('#select-boost-111-1')?.value || allowed[1] || 'dex';
        const sel2 = abDialog.querySelector('#select-boost-111-2')?.value || allowed[2] || 'con';
        return [
          { ability: sel0, bonus: 1 },
          { ability: sel1, bonus: 1 },
          { ability: sel2, bonus: 1 }
        ];
      }
    };

    const updatePreview = () => {
      const boosts = getSelectedBoosts();
      const boostMap = {};
      boosts.forEach(b => {
        boostMap[b.ability] = (boostMap[b.ability] || 0) + b.bonus;
      });

      const currentFullBreakdown = calculateAbilityScoresBreakdown(activeChar);

      previewTbody.innerHTML = ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(ab => {
        const baseInput = abDialog.querySelector(`#input-base-${ab}`);
        const baseVal = Math.max(1, Math.min(30, parseInt(baseInput?.value, 10) || 10));
        const bgBonus = boostMap[ab] || 0;
        const otherBonus = (currentFullBreakdown[ab]?.asiBonus || 0) + (currentFullBreakdown[ab]?.traitBonus || 0);
        const finalScore = baseVal + bgBonus + otherBonus;
        const mod = getAbilityModifier(finalScore);

        return `
          <tr>
            <td class="text-start">
              <strong class="text-light">${getAbilityFullName(ab)}</strong> 
              <span class="badge bg-secondary ms-1">${getAbilityShortName(ab)}</span>
            </td>
            <td>${baseVal}</td>
            <td class="${bgBonus > 0 ? 'text-warning fw-bold' : 'text-muted'}">${bgBonus > 0 ? `+${bgBonus}` : '—'}</td>
            <td class="${otherBonus > 0 ? 'text-info fw-bold' : 'text-muted'}">${otherBonus > 0 ? `+${otherBonus}` : '—'}</td>
            <td><strong class="fs-6 text-light">${finalScore}</strong></td>
            <td><span class="badge bg-danger fs-6">${formatModifier(mod)}</span></td>
          </tr>
        `;
      }).join('');
    };

    modeSelect?.addEventListener('change', () => {
      renderBoostSelectors();
      updatePreview();
    });

    abDialog.querySelectorAll('.input-modal-base-stat').forEach(inp => {
      inp.addEventListener('input', updatePreview);
    });

    renderBoostSelectors();
    updatePreview();

    // Guardar
    form.onsubmit = (e) => {
      e.preventDefault();
      const baseScores = {};
      ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ab => {
        const inp = abDialog.querySelector(`#input-base-${ab}`);
        baseScores[ab] = Math.max(1, Math.min(30, parseInt(inp?.value, 10) || 10));
      });

      const mode = modeSelect?.value || '2_1';
      const boosts = getSelectedBoosts();

      activeChar.baseAbilityScores = baseScores;
      activeChar.backgroundBoostMode = mode;
      activeChar.backgroundAbilityBoosts = boosts;

      abDialog.close();
      store.saveCharacter(activeChar);
      showToast.success('¡Puntuaciones de característica y mejoras de trasfondo actualizadas!');
    };

    abDialog.showModal();
  }

  /**
   * Abre el modal para editar las elecciones de una dote directamente desde la hoja interactiva.
   */
  openEditFeatChoiceModal(feat, activeChar, featDialog) {
    if (!featDialog || !feat) return;

    const infoContainer = featDialog.querySelector('#modal-feat-choice-info');
    const fieldsContainer = featDialog.querySelector('#container-feat-choice-fields');
    const form = featDialog.querySelector('#form-sheet-edit-feat-choice');

    infoContainer.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-1">
        <strong class="text-warning fs-6">${escapeHtml(feat.name)}</strong>
        <span class="badge bg-secondary">${escapeHtml(feat.categoryLabel || '')}</span>
      </div>
      <p class="small text-secondary mb-0">${escapeHtml(feat.description || '')}</p>
    `;

    fieldsContainer.innerHTML = '';

    const isAsi = feat.category === 'asi' || feat.rawChoice?.type === 'asi';
    const featDef = feat.featDef || getFeatById(feat.id);
    const rawChoice = feat.rawChoice || {};

    const abilityOptions = [
      { key: 'str', label: 'Fuerza (FUE)' },
      { key: 'dex', label: 'Destreza (DES)' },
      { key: 'con', label: 'Constitución (CON)' },
      { key: 'int', label: 'Inteligencia (INT)' },
      { key: 'wis', label: 'Sabiduría (SAB)' },
      { key: 'cha', label: 'Carisma (CAR)' }
    ];

    if (isAsi) {
      const asiMode = rawChoice.asiMode || 'plus2';
      const plus2Ab = rawChoice.asiPlusTwoAbility || 'str';
      const plus1AbA = rawChoice.asiPlusOneAbilities?.[0] || 'str';
      const plus1AbB = rawChoice.asiPlusOneAbilities?.[1] || 'con';

      fieldsContainer.innerHTML = `
        <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary">
          <label class="form-label small text-warning fw-bold mb-1">Modo de Mejora:</label>
          <select id="feat-asi-mode" class="form-select form-select-sm bg-dark text-light border-secondary mb-3">
            <option value="plus2" ${asiMode === 'plus2' ? 'selected' : ''}>+2 a una característica</option>
            <option value="plus1plus1" ${asiMode === 'plus1plus1' ? 'selected' : ''}>+1 a dos características distintas</option>
          </select>

          <div id="feat-asi-plus2-container" class="${asiMode === 'plus2' ? '' : 'd-none'}">
            <label class="form-label small text-secondary mb-1">Característica (+2):</label>
            <select id="feat-asi-plus2-select" class="form-select form-select-sm bg-dark text-warning fw-bold border-secondary">
              ${abilityOptions.map(ab => `<option value="${ab.key}" ${plus2Ab === ab.key ? 'selected' : ''}>+2 a ${ab.label}</option>`).join('')}
            </select>
          </div>

          <div id="feat-asi-plus1-container" class="row g-2 ${asiMode === 'plus1plus1' ? '' : 'd-none'}">
            <div class="col-6">
              <label class="form-label small text-secondary mb-1">1ª Característica (+1):</label>
              <select id="feat-asi-plus1a-select" class="form-select form-select-sm bg-dark text-warning fw-bold border-secondary">
                ${abilityOptions.map(ab => `<option value="${ab.key}" ${plus1AbA === ab.key ? 'selected' : ''}>+1 a ${ab.label}</option>`).join('')}
              </select>
            </div>
            <div class="col-6">
              <label class="form-label small text-secondary mb-1">2ª Característica (+1):</label>
              <select id="feat-asi-plus1b-select" class="form-select form-select-sm bg-dark text-warning fw-bold border-secondary">
                ${abilityOptions.map(ab => `<option value="${ab.key}" ${plus1AbB === ab.key ? 'selected' : ''}>+1 a ${ab.label}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      `;

      const modeSelect = fieldsContainer.querySelector('#feat-asi-mode');
      const p2Container = fieldsContainer.querySelector('#feat-asi-plus2-container');
      const p1Container = fieldsContainer.querySelector('#feat-asi-plus1-container');

      modeSelect?.addEventListener('change', () => {
        if (modeSelect.value === 'plus2') {
          p2Container.classList.remove('d-none');
          p1Container.classList.add('d-none');
        } else {
          p2Container.classList.add('d-none');
          p1Container.classList.remove('d-none');
        }
      });
    } else {
      let fieldsHtml = '';

      // 1. Elección de Característica Aumentada (+1)
      const allowedAbs = Array.isArray(featDef?.allowedAbilities) && featDef.allowedAbilities.length > 0
        ? featDef.allowedAbilities
        : [];

      if (allowedAbs.length > 0) {
        const curChosenAb = rawChoice.chosenAbility || (rawChoice.chosenAbilityBonus ? Object.keys(rawChoice.chosenAbilityBonus)[0] : '') || allowedAbs[0];
        fieldsHtml += `
          <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary">
            <label class="form-label small text-warning fw-bold mb-1">
              ★ Característica Aumentada (+1):
            </label>
            <select id="feat-choice-ability" class="form-select form-select-sm bg-dark text-warning fw-bold border-secondary">
              ${allowedAbs.map(ab => {
                const opt = abilityOptions.find(o => o.key === ab) || { key: ab, label: ab.toUpperCase() };
                return `<option value="${ab}" ${curChosenAb === ab ? 'selected' : ''}>+1 a ${opt.label}</option>`;
              }).join('')}
            </select>
            <div class="form-text text-secondary small">
              Permitidas por la dote: ${allowedAbs.map(a => getAbilityShortName(a)).join(', ')}.
            </div>
          </div>
        `;
      }

      // 2. Experto en Habilidades (D&D 5.5)
      if (feat.id === 'experto_habilidades') {
        const curProf = rawChoice.skillExpertProficiency || '';
        const curExp = rawChoice.skillExpertExpertise || '';

        fieldsHtml += `
          <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary">
            <div class="mb-2">
              <label class="form-label small text-warning fw-bold mb-1">
                ● Competencia en Habilidad Otorgada:
              </label>
              <select id="feat-choice-skill-prof" class="form-select form-select-sm bg-dark text-light border-secondary">
                ${DND55_SKILLS.map(sk => `<option value="${escapeHtml(sk.name)}" ${curProf === sk.name ? 'selected' : ''}>${escapeHtml(sk.name)} (${getAbilityShortName(sk.ability)})</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="form-label small text-warning fw-bold mb-1">
                ★ Pericia Elegida (duplica bonificador de competencia):
              </label>
              <select id="feat-choice-skill-exp" class="form-select form-select-sm bg-dark text-light border-secondary">
                ${DND55_SKILLS.map(sk => `<option value="${escapeHtml(sk.name)}" ${curExp === sk.name ? 'selected' : ''}>${escapeHtml(sk.name)} (${getAbilityShortName(sk.ability)})</option>`).join('')}
              </select>
            </div>
          </div>
        `;
      }

      // 3. Artesano (Herramientas de artesano)
      if (feat.id === 'artesano') {
        const curTool = rawChoice.chosenTool || activeChar.artisanToolsChoice || '';
        const artisanTools = DND55_TOOL_PROFICIENCIES.filter(t => t.category === 'artesano');
        fieldsHtml += `
          <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary">
            <label class="form-label small text-warning fw-bold mb-1">
              Herramienta de Artesano Elegida:
            </label>
            <select id="feat-choice-tool" class="form-select form-select-sm bg-dark text-light border-secondary">
              ${artisanTools.map(t => `<option value="${escapeHtml(t.name)}" ${curTool === t.name ? 'selected' : ''}>${escapeHtml(t.name)}</option>`).join('')}
            </select>
          </div>
        `;
      }

      // 4. Elemento (Adepto Elemental)
      if (feat.id === 'elemental_adept') {
        const curElement = rawChoice.chosenElement || 'Fuego';
        const elements = ['Ácido', 'Frío', 'Fuego', 'Electricidad', 'Trueno'];
        fieldsHtml += `
          <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary">
            <label class="form-label small text-warning fw-bold mb-1">
              Elemento Seleccionado:
            </label>
            <select id="feat-choice-element" class="form-select form-select-sm bg-dark text-light border-secondary">
              ${elements.map(el => `<option value="${el}" ${curElement === el ? 'selected' : ''}>${el}</option>`).join('')}
            </select>
          </div>
        `;
      }

      // 5. Salvación entrenada (Resiliente)
      if (feat.id?.startsWith('resilient') || rawChoice.chosenSave) {
        const curSave = rawChoice.chosenSave || (feat.id?.startsWith('resilient_') ? feat.id.replace('resilient_', '') : 'con');
        fieldsHtml += `
          <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary">
            <label class="form-label small text-warning fw-bold mb-1">
              Salvación Entrenada:
            </label>
            <select id="feat-choice-save" class="form-select form-select-sm bg-dark text-light border-secondary">
              ${abilityOptions.map(ab => `<option value="${ab.key}" ${curSave === ab.key ? 'selected' : ''}>Salvación de ${ab.label}</option>`).join('')}
            </select>
          </div>
        `;
      }

      // 6. Conjuros elegidos (Iniciado en magia, Fey Touched, Shadow Touched, etc.)
      if (feat.id?.startsWith('iniciado_magia') || feat.id === 'fey_touched' || feat.id === 'shadow_touched') {
        const curSpell = rawChoice.chosenSpell || (Array.isArray(rawChoice.chosenSpells) ? rawChoice.chosenSpells.join(', ') : '') || '';
        fieldsHtml += `
          <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary">
            <label class="form-label small text-warning fw-bold mb-1">
              Conjuro(s) Elegido(s):
            </label>
            <input type="text" id="feat-choice-spell" class="form-control form-control-sm bg-dark text-light border-secondary" value="${escapeHtml(curSpell)}" placeholder="Ej: Paso brumoso, Escudo, etc.">
          </div>
        `;
      }

      fieldsContainer.innerHTML = fieldsHtml || `
        <div class="p-3 text-center text-secondary">
          Esta dote no requiere configuraciones adicionales.
        </div>
      `;
    }

    form.onsubmit = (e) => {
      e.preventDefault();

      if (isAsi) {
        const modeSelect = fieldsContainer.querySelector('#feat-asi-mode');
        const mode = modeSelect?.value || 'plus2';
        let newChoice;
        if (mode === 'plus2') {
          const ab = fieldsContainer.querySelector('#feat-asi-plus2-select')?.value || 'str';
          newChoice = {
            type: 'asi',
            asiMode: 'plus2',
            asiPlusTwoAbility: ab
          };
        } else {
          const abA = fieldsContainer.querySelector('#feat-asi-plus1a-select')?.value || 'str';
          let abB = fieldsContainer.querySelector('#feat-asi-plus1b-select')?.value || 'con';
          if (abA === abB) {
            abB = abA === 'str' ? 'con' : 'str';
          }
          newChoice = {
            type: 'asi',
            asiMode: 'plus1plus1',
            asiPlusOneAbilities: [abA, abB]
          };
        }

        if (feat.sourceType === 'classAsi' && feat.classId && feat.choiceKey) {
          if (!activeChar.classAsiChoices) activeChar.classAsiChoices = {};
          if (!activeChar.classAsiChoices[feat.classId]) activeChar.classAsiChoices[feat.classId] = {};
          activeChar.classAsiChoices[feat.classId][feat.choiceKey] = newChoice;
          activeChar[`${feat.classId}_${feat.choiceKey}`] = newChoice;
          activeChar[feat.choiceKey] = newChoice;
        }
      } else {
        const choiceAbSelect = fieldsContainer.querySelector('#feat-choice-ability');
        const chosenAb = choiceAbSelect ? choiceAbSelect.value : null;

        const skillProfSelect = fieldsContainer.querySelector('#feat-choice-skill-prof');
        const skillExpSelect = fieldsContainer.querySelector('#feat-choice-skill-exp');
        const toolSelect = fieldsContainer.querySelector('#feat-choice-tool');
        const elementSelect = fieldsContainer.querySelector('#feat-choice-element');
        const saveSelect = fieldsContainer.querySelector('#feat-choice-save');
        const spellInput = fieldsContainer.querySelector('#feat-choice-spell');

        if (feat.sourceType === 'classAsi' && feat.classId && feat.choiceKey) {
          if (!activeChar.classAsiChoices) activeChar.classAsiChoices = {};
          if (!activeChar.classAsiChoices[feat.classId]) activeChar.classAsiChoices[feat.classId] = {};

          const existing = activeChar.classAsiChoices[feat.classId][feat.choiceKey] || rawChoice;
          const updated = {
            ...existing,
            type: 'feat',
            featId: feat.id
          };
          delete updated.asiMode;
          delete updated.asiPlusTwoAbility;
          delete updated.asiPlusOneAbilities;
          delete updated.asiBoosts;
          delete updated.chosenAbilityScores;

          if (chosenAb) {
            updated.chosenAbility = chosenAb;
            updated.chosenAbilityBonus = { [chosenAb]: 1 };
          }
          if (skillProfSelect) updated.skillExpertProficiency = skillProfSelect.value;
          if (skillExpSelect) updated.skillExpertExpertise = skillExpSelect.value;
          if (elementSelect) updated.chosenElement = elementSelect.value;
          if (saveSelect) updated.chosenSave = saveSelect.value;
          if (spellInput) updated.chosenSpell = spellInput.value;

          activeChar.classAsiChoices[feat.classId][feat.choiceKey] = updated;
          activeChar[`${feat.classId}_${feat.choiceKey}`] = updated;
          activeChar[feat.choiceKey] = updated;
        } else if (feat.sourceType === 'origin') {
          if (!activeChar.originFeatChoices || typeof activeChar.originFeatChoices !== 'object') {
            activeChar.originFeatChoices = {};
          }
          if (chosenAb) {
            activeChar.originFeatChoices.chosenAbility = chosenAb;
            activeChar.originFeatChoices.chosenAbilityBonus = { [chosenAb]: 1 };
          }
          if (toolSelect) {
            activeChar.originFeatChoices.chosenTool = toolSelect.value;
            activeChar.artisanToolsChoice = toolSelect.value;
          }
          if (spellInput) {
            activeChar.originFeatChoices.chosenSpell = spellInput.value;
          }
        } else if (feat.sourceType === 'species') {
          if (!activeChar.speciesOriginFeatChoices || typeof activeChar.speciesOriginFeatChoices !== 'object') {
            activeChar.speciesOriginFeatChoices = {};
          }
          if (chosenAb) {
            activeChar.speciesOriginFeatChoices.chosenAbility = chosenAb;
            activeChar.speciesOriginFeatChoices.chosenAbilityBonus = { [chosenAb]: 1 };
          }
          if (toolSelect) activeChar.speciesOriginFeatChoices.chosenTool = toolSelect.value;
          if (spellInput) activeChar.speciesOriginFeatChoices.chosenSpell = spellInput.value;
        } else if (feat.sourceType === 'additionalFeat') {
          if (Array.isArray(activeChar.feats)) {
            const fItem = activeChar.feats.find(f => (typeof f === 'string' ? f : (f.id || f.featId)) === feat.id);
            if (fItem && typeof fItem === 'object') {
              if (chosenAb) {
                fItem.chosenAbility = chosenAb;
                fItem.chosenAbilityBonus = { [chosenAb]: 1 };
              }
            }
          }
        }
      }

      featDialog.close();
      store.saveCharacter(activeChar);
      showToast.success(`¡Elecciones de "${feat.name}" actualizadas con éxito!`);
    };

    featDialog.showModal();
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Actualiza la configuración de PG por nivel y ajusta proporcionalmente los PG actuales.
   */
  updateCharacterHpRolls(char, updaterFn, toastMsg = null) {
    const oldHpInfo = calculateHitPoints(char);
    const oldMax = oldHpInfo.maxHp;
    const oldCurrent = (char.currentHp !== null && char.currentHp !== undefined) ? char.currentHp : oldMax;

    if (!char.hpRollsByLevel || typeof char.hpRollsByLevel !== 'object') {
      char.hpRollsByLevel = {};
    }

    updaterFn(char.hpRollsByLevel);

    const newHpInfo = calculateHitPoints(char);
    const newMax = newHpInfo.maxHp;
    const diff = newMax - oldMax;

    if (oldCurrent >= oldMax) {
      char.currentHp = newMax;
    } else {
      char.currentHp = Math.max(1, Math.min(newMax, oldCurrent + diff));
    }

    this.keepHpModalOpen = true;
    store.saveCharacter(char);
    if (toastMsg) {
      showToast(toastMsg, 'info');
    }
  }

  // ==========================================
  // LÓGICA DE GESTIÓN DE EQUIPO (EXCLUSIVIDAD DE ARMADURA)
  // ==========================================

  toggleEquipArmor(char, itemId) {
    if (!Array.isArray(char.inventory)) char.inventory = [];
    const item = char.inventory.find(i => String(i.id) === String(itemId));
    if (!item) return;

    if (item.isEquipped) {
      item.isEquipped = false;
      char.armorId = 'sin_armadura';
    } else {
      // Regla: Solo UNA armadura corporal equipada
      char.inventory.forEach(other => {
        const isOtherArmor = (other.category === 'armadura' || (other.armorType && other.armorType !== 'escudo')) 
          && other.armorType !== 'escudo' 
          && !other.name.toLowerCase().includes('escudo');
        if (isOtherArmor) {
          other.isEquipped = false;
        }
      });
      item.isEquipped = true;
      char.armorId = item.armorType || item.id;
    }

    store.saveCharacter(char);
  }

  toggleEquipShield(char, itemId) {
    if (!Array.isArray(char.inventory)) char.inventory = [];
    const item = char.inventory.find(i => String(i.id) === String(itemId));
    if (!item) return;

    if (item.isEquipped) {
      item.isEquipped = false;
      char.hasShield = false;
    } else {
      // Desequipar cualquier otro escudo
      char.inventory.forEach(other => {
        if (other.armorType === 'escudo' || other.category === 'shield' || other.name.toLowerCase().includes('escudo')) {
          other.isEquipped = false;
        }
      });
      item.isEquipped = true;
      char.hasShield = true;
    }

    store.saveCharacter(char);
  }

  toggleEquipWeapon(char, itemId) {
    if (!Array.isArray(char.inventory)) char.inventory = [];
    if (!Array.isArray(char.equippedWeapons)) char.equippedWeapons = [];
    const item = char.inventory.find(i => String(i.id) === String(itemId));
    if (!item) return;

    item.isEquipped = !item.isEquipped;
    const wKey = item.weaponType || item.id;

    if (item.isEquipped) {
      if (!char.equippedWeapons.includes(wKey)) {
        char.equippedWeapons.push(wKey);
      }
    } else {
      char.equippedWeapons = char.equippedWeapons.filter(id => id !== wKey && id !== item.id);
    }

    store.saveCharacter(char);
  }

  toggleAttunement(char, itemId) {
    if (!Array.isArray(char.inventory)) char.inventory = [];
    const item = char.inventory.find(i => String(i.id) === String(itemId));
    if (!item || !item.requiresAttunement) return;

    if (item.isAttuned) {
      item.isAttuned = false;
    } else {
      const currentAttunedCount = char.inventory.filter(i => i.requiresAttunement && i.isAttuned).length;
      if (currentAttunedCount >= 3) {
        showToast.warning('Límite de sintonización alcanzado: Máximo 3 objetos mágicos sintonizados simultáneamente según las reglas oficiales de D&D 5.5.', 'Sintonización Máxima');
        return;
      }
      item.isAttuned = true;
    }

    store.saveCharacter(char);
  }

  deleteInventoryItem(char, itemId) {
    if (!Array.isArray(char.inventory)) return;
    const item = char.inventory.find(i => String(i.id) === String(itemId));
    if (!item) return;

    if (item.isEquipped) {
      if (item.category === 'armadura' || (item.armorType && item.armorType !== 'escudo')) {
        char.armorId = 'sin_armadura';
      }
      if (item.armorType === 'escudo' || item.category === 'shield' || item.name.toLowerCase().includes('escudo')) {
        char.hasShield = false;
      }
      if (Array.isArray(char.equippedWeapons)) {
        char.equippedWeapons = char.equippedWeapons.filter(w => w !== item.id && w !== item.weaponType);
      }
    }

    char.inventory = char.inventory.filter(i => String(i.id) !== String(itemId));
    store.saveCharacter(char);
  }

  syncCatalogItemNameWithMagicBonus() {
    if (this.hasUserEditedItemName || !this.currentCatalogBaseName) return;
    const nameInput = this.container?.querySelector('#input-item-name');
    const magicInput = this.container?.querySelector('#input-item-magic-bonus');
    if (!nameInput || !magicInput) return;
    const bonus = parseInt(magicInput.value, 10) || 0;
    nameInput.value = bonus > 0 ? `${this.currentCatalogBaseName} +${bonus}` : this.currentCatalogBaseName;
  }

  handleItemCategoryChange(category) {
    if (!this.container) return;
    const weaponFields = this.container.querySelector('#section-weapon-fields');
    const scrollFields = this.container.querySelector('#section-scroll-fields');
    const equipCheck = this.container.querySelector('#check-item-equip-now');
    const chargeRecoveryInput = this.container.querySelector('#input-item-charge-recovery');

    weaponFields?.classList.toggle('d-none', category !== 'arma');
    scrollFields?.classList.toggle('d-none', category !== 'pergamino');

    if (category === 'pergamino') {
      const lvl = parseInt(this.container.querySelector('#select-scroll-level')?.value || '1', 10);
      this.populateScrollSpellsByLevel(lvl);
      if (equipCheck) equipCheck.checked = false;
    } else if (category === 'sortilegio') {
      if (equipCheck) equipCheck.checked = false;
      if (chargeRecoveryInput && !chargeRecoveryInput.value) {
        chargeRecoveryInput.value = 'Sin recarga (Consumible)';
      }
    } else if (category === 'pocion') {
      if (equipCheck) equipCheck.checked = false;
    }
  }

  populateScrollSpellsByLevel(level = 0) {
    const scrollSpellSelect = this.container?.querySelector('#select-scroll-spell');
    if (!scrollSpellSelect) return;
    const spellsOfLevel = (DND55_CANONICAL_SPELLS || [])
      .filter(s => (Number(s.level) || 0) === Number(level))
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, 'es'));

    const lvlLabel = Number(level) === 0 ? 'Truco (Nivel 0)' : `Nivel ${level}`;
    scrollSpellSelect.innerHTML = `
      <option value="">-- Seleccionar conjuro de ${lvlLabel} (${spellsOfLevel.length} disponibles) --</option>
      ${spellsOfLevel.map(s => `
        <option value="${s.id}">${escapeHtml(s.name)} (${escapeHtml(s.school || 'Magia')} • ${escapeHtml(s.castingTime || '1 acción')})</option>
      `).join('')}
    `;
  }

  applyScrollSelectionToModal(level, spellId) {
    const nameInput = this.container?.querySelector('#input-item-name');
    const descInput = this.container?.querySelector('#input-item-desc');
    const weightInput = this.container?.querySelector('#input-item-weight');
    const stats = (DND55_SCROLL_LEVEL_STATS || []).find(st => st.level === Number(level)) || { level: Number(level), label: `Nivel ${level}`, rarity: 'Común', dc: 13, attackBonus: 5 };
    const spell = spellId ? DND55_CANONICAL_SPELLS.find(s => s.id === spellId) : null;
    const shortLvl = Number(level) === 0 ? 'Truco' : `Nv ${level}`;

    if (spell) {
      const baseName = `Pergamino de Conjuro (${shortLvl}): ${spell.name}`;
      this.currentCatalogBaseName = baseName;
      this.hasUserEditedItemName = false;
      if (nameInput) nameInput.value = baseName;
      if (weightInput) weightInput.value = 0.05;
      if (descInput) {
        descInput.value = `Pergamino de Conjuro ${stats.label} (${stats.rarity} • CD Salvación ${stats.dc} • Ataque de Conjuro +${stats.attackBonus}). Conjuro: ${spell.name} (${spell.castingTime || '1 acción'}, ${spell.range || '18 m'}): ${spell.description || ''}`;
      }
    } else {
      const baseName = `Pergamino de Conjuro (${shortLvl})`;
      this.currentCatalogBaseName = baseName;
      this.hasUserEditedItemName = false;
      if (nameInput) nameInput.value = baseName;
      if (weightInput) weightInput.value = 0.05;
      if (descInput) {
        descInput.value = `Pergamino mágico de un solo uso (${stats.rarity}). Permite lanzar un conjuro de ${stats.label} con CD de Salvación ${stats.dc} y Ataque de Conjuro +${stats.attackBonus}.`;
      }
    }
  }

  renderItemModalDynamicLists() {
    if (!this.container) return;
    if (!Array.isArray(this.currentCatalogItemModifiers)) this.currentCatalogItemModifiers = [];
    if (!Array.isArray(this.currentCustomFunctions)) this.currentCustomFunctions = [];
    if (!Array.isArray(this.currentArtifactProperties)) this.currentArtifactProperties = [];

    const modListEl = this.container.querySelector('#list-item-stat-modifiers');
    if (modListEl) {
      const targetLabels = {
        ac: 'CA', attackBonus: 'Ataque', damageBonus: 'Daño',
        unarmedAttack: 'Ataque sin Armas', unarmedDamage: 'Daño sin Armas', monkDc: 'CD Monje',
        spellAttack: 'Atq. Conjuro', spellDc: 'CD Conjuros', savingThrows: 'Salvaciones', initiative: 'Iniciativa',
        speed: 'Velocidad (m)', hpMax: 'PG Máx', str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR'
      };
      modListEl.innerHTML = this.currentCatalogItemModifiers.map((m, idx) => `
        <span class="badge bg-info text-dark d-inline-flex align-items-center gap-1 py-1 px-2">
          <span>${m.mode === 'override_if_lower' ? `Fijar ${m.value}` : (m.value >= 0 ? `+${m.value}` : m.value)} ${escapeHtml(targetLabels[m.target] || m.target)}</span>
          <button type="button" class="btn-close btn-close-dark p-0 ms-1 btn-remove-item-mod" data-idx="${idx}" style="font-size: 0.55rem;"></button>
        </span>
      `).join('');
      modListEl.querySelectorAll('.btn-remove-item-mod').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const i = parseInt(e.currentTarget.dataset.idx, 10);
          this.currentCatalogItemModifiers.splice(i, 1);
          this.renderItemModalDynamicLists();
        });
      });
    }

    const funcListEl = this.container.querySelector('#list-item-custom-functions');
    if (funcListEl) {
      funcListEl.innerHTML = this.currentCustomFunctions.map((fn, idx) => `
        <div class="d-flex justify-content-between align-items-center p-1 px-2 rounded bg-secondary bg-opacity-25 border border-secondary small">
          <div class="text-truncate me-2">
            <strong class="text-warning">⚡ ${escapeHtml(fn.name)}</strong>
            <span class="badge bg-dark border border-secondary text-info ms-1">${escapeHtml(fn.activation || 'Pasiva')}</span>
            ${fn.description ? `<span class="text-light ms-1">- ${escapeHtml(fn.description)}</span>` : ''}
          </div>
          <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-remove-item-func" data-idx="${idx}">&times;</button>
        </div>
      `).join('');
      funcListEl.querySelectorAll('.btn-remove-item-func').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const i = parseInt(e.currentTarget.dataset.idx, 10);
          this.currentCustomFunctions.splice(i, 1);
          this.renderItemModalDynamicLists();
        });
      });
    }

    const artListEl = this.container.querySelector('#list-item-artifact-properties');
    if (artListEl) {
      artListEl.innerHTML = this.currentArtifactProperties.map((ap, idx) => {
        const isDet = (ap.type || '').includes('Detrimental');
        return `
          <div class="d-flex justify-content-between align-items-center p-1 px-2 rounded bg-secondary bg-opacity-25 border ${isDet ? 'border-danger' : 'border-info'} small">
            <div class="me-2">
              <strong class="${isDet ? 'text-danger' : 'text-info'}">${isDet ? '☠️' : '🌟'} ${escapeHtml(ap.name)}:</strong>
              <span class="text-light">${escapeHtml(ap.description || '')}</span>
            </div>
            <button type="button" class="btn btn-xs btn-outline-danger py-0 px-1 btn-remove-art-prop" data-idx="${idx}">&times;</button>
          </div>
        `;
      }).join('');
      artListEl.querySelectorAll('.btn-remove-art-prop').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const i = parseInt(e.currentTarget.dataset.idx, 10);
          this.currentArtifactProperties.splice(i, 1);
          this.renderItemModalDynamicLists();
        });
      });
    }
  }

  populateItemModalFromCatalog(val) {
    if (!val) {
      this.currentCatalogBaseName = '';
      this.hasUserEditedItemName = false;
      return;
    }
    const [type, id] = val.split(':');
    const nameInput = this.container.querySelector('#input-item-name');
    const catSelect = this.container.querySelector('#input-item-category');
    const weightInput = this.container.querySelector('#input-item-weight');
    const magicInput = this.container.querySelector('#input-item-magic-bonus');
    const descInput = this.container.querySelector('#input-item-desc');
    const attuneCheck = this.container.querySelector('#check-item-attunement');
    const equipCheck = this.container.querySelector('#check-item-equip-now');
    const dmgInput = this.container.querySelector('#input-item-damage');
    const dmgTypeSelect = this.container.querySelector('#input-item-damage-type');
    const masteryInput = this.container.querySelector('#input-item-mastery');
    const weaponSection = this.container.querySelector('#section-weapon-fields');
    const scrollSection = this.container.querySelector('#section-scroll-fields');
    const maxChargesInput = this.container.querySelector('#input-item-max-charges');
    const currentChargesInput = this.container.querySelector('#input-item-current-charges');
    const chargeRecoveryInput = this.container.querySelector('#input-item-charge-recovery');

    this.currentCatalogItemModifiers = [];
    this.currentCustomFunctions = [];
    this.currentArtifactProperties = [];
    this.currentCatalogBaseName = '';
    this.hasUserEditedItemName = false;

    if (type === 'armor') {
      const a = DND55_ARMORS.find(item => item.id === id);
      if (a) {
        this.currentCatalogBaseName = a.name.replace(/\s*\+\d+$/, '').trim();
        if (a.id === 'escudo') {
          nameInput.value = a.name;
          catSelect.value = 'escudo';
          weightInput.value = a.weight || 3;
          magicInput.value = 0;
          descInput.value = `Otorga un bonificador de +2 a la Clase de Armadura.`;
          weaponSection?.classList.add('d-none');
        } else {
          nameInput.value = a.name;
          catSelect.value = 'armadura';
          weightInput.value = a.weight || 10;
          magicInput.value = 0;
          descInput.value = `Armadura ${a.category}. CA Base: ${a.baseAc}${a.maxDexBonus !== null ? ` + DES (máx +${a.maxDexBonus})` : ' (Sin bonificador de DES)'}.`;
          weaponSection?.classList.add('d-none');
        }
        scrollSection?.classList.add('d-none');
        if (maxChargesInput) maxChargesInput.value = 0;
        if (currentChargesInput) currentChargesInput.value = 0;
        if (chargeRecoveryInput) chargeRecoveryInput.value = 'Todas en Descanso Largo';
        attuneCheck.checked = false;
        if (equipCheck) equipCheck.checked = true;
        this.syncCatalogItemNameWithMagicBonus();
        this.renderItemModalDynamicLists();
      }
    } else if (type === 'weapon') {
      const w = DND55_WEAPONS.find(item => item.id === id);
      if (w) {
        this.currentCatalogBaseName = w.name.replace(/\s*\+\d+$/, '').trim();
        nameInput.value = w.name;
        catSelect.value = 'arma';
        weightInput.value = w.weight || 1;
        magicInput.value = 0;
        descInput.value = `Arma ${w.category}. Propiedades: ${(w.properties || []).join(', ') || 'Ninguna'}.`;
        weaponSection?.classList.remove('d-none');
        scrollSection?.classList.add('d-none');
        dmgInput.value = w.damage || '1d6';
        dmgTypeSelect.value = w.damageType || 'Cortante';
        masteryInput.value = w.masteryProperty || 'Ninguna';
        if (maxChargesInput) maxChargesInput.value = 0;
        if (currentChargesInput) currentChargesInput.value = 0;
        if (chargeRecoveryInput) chargeRecoveryInput.value = 'Todas en Descanso Largo';
        attuneCheck.checked = false;
        if (equipCheck) equipCheck.checked = true;
        this.syncCatalogItemNameWithMagicBonus();
        this.renderItemModalDynamicLists();
      }
    } else if (type === 'item' || type === 'magic' || type === 'sortilegio') {
      const m = DND55_PRESET_ITEMS.find(item => item.id === id);
      if (m) {
        this.currentCatalogBaseName = m.name.replace(/\s*\+\d+$/, '').trim();
        nameInput.value = m.name;
        weightInput.value = typeof m.weight === 'number' ? m.weight : 0;
        magicInput.value = m.magicBonus || 0;
        descInput.value = m.description || '';
        attuneCheck.checked = Boolean(m.requiresAttunement);

        if (m.category === 'pergamino') {
          catSelect.value = 'pergamino';
          scrollSection?.classList.remove('d-none');
          const scrollLvl = typeof m.scrollLevel === 'number' ? m.scrollLevel : 1;
          const scrollLevelSelect = this.container.querySelector('#select-scroll-level');
          if (scrollLevelSelect) scrollLevelSelect.value = String(scrollLvl);
          this.populateScrollSpellsByLevel(scrollLvl);
          if (equipCheck) equipCheck.checked = false;
        } else if (m.category === 'sortilegio') {
          catSelect.value = 'sortilegio';
          scrollSection?.classList.add('d-none');
          if (equipCheck) equipCheck.checked = false;
        } else {
          scrollSection?.classList.add('d-none');
          if (m.category === 'herramientas') {
            catSelect.value = 'herramientas';
          } else if (m.category === 'consumible') {
            catSelect.value = 'pocion';
            if (equipCheck) equipCheck.checked = false;
          } else if (m.category === 'armadura') {
            catSelect.value = 'armadura';
          } else if (m.category === 'escudo') {
            catSelect.value = 'escudo';
          } else if (m.category === 'arma') {
            catSelect.value = 'arma';
          } else if (m.category === 'artefacto') {
            catSelect.value = 'artefacto';
          } else if (['magico', 'maravilloso', 'anillo', 'baston', 'varita'].includes(m.category)) {
            catSelect.value = 'objeto_magico';
          } else {
            catSelect.value = 'equipo';
          }
        }

        if (maxChargesInput) maxChargesInput.value = m.maxCharges || 0;
        if (currentChargesInput) currentChargesInput.value = typeof m.currentCharges === 'number' ? m.currentCharges : (m.maxCharges || 0);
        if (chargeRecoveryInput) {
          if (m.category === 'sortilegio' || (m.chargeRecovery && m.chargeRecovery.includes('Sin recarga'))) {
            chargeRecoveryInput.value = 'Sin recarga (Consumible)';
          } else {
            chargeRecoveryInput.value = m.chargeRecovery || 'Todas en Descanso Largo';
          }
        }

        if (Array.isArray(m.statModifiers) && m.statModifiers.length > 0) {
          this.currentCatalogItemModifiers = JSON.parse(JSON.stringify(m.statModifiers));
        }
        if (m.specialAction) {
          this.currentCustomFunctions.push({
            name: 'Propiedad Especial',
            activation: 'Acción',
            description: m.specialAction
          });
        }

        if (catSelect.value === 'arma' || m.category === 'arma' || m.damage || m.weaponDamage || m.weaponType) {
          weaponSection?.classList.remove('d-none');
          const baseW = m.weaponType ? DND55_WEAPONS.find(w => w.id === m.weaponType) : null;
          dmgInput.value = m.damage || m.weaponDamage || baseW?.damage || '1d8';
          dmgTypeSelect.value = m.damageType || baseW?.damageType || 'Cortante';
          masteryInput.value = m.masteryProperty || m.weaponMastery || baseW?.masteryProperty || 'Ninguna';
        } else {
          weaponSection?.classList.add('d-none');
        }
        this.syncCatalogItemNameWithMagicBonus();
        this.renderItemModalDynamicLists();
      }
    }
  }

  saveNewInventoryItem(char, dialog) {
    this.syncCatalogItemNameWithMagicBonus();
    const name = this.container.querySelector('#input-item-name').value.trim();
    if (!name) return;

    const category = this.container.querySelector('#input-item-category').value;
    const quantity = parseInt(this.container.querySelector('#input-item-quantity').value, 10) || 1;
    const weight = parseFloat(this.container.querySelector('#input-item-weight').value) || 0;
    const magicBonus = parseInt(this.container.querySelector('#input-item-magic-bonus').value, 10) || 0;
    const description = this.container.querySelector('#input-item-desc').value.trim();
    const requiresAttunement = this.container.querySelector('#check-item-attunement').checked;
    const equipNow = this.container.querySelector('#check-item-equip-now').checked;
    const maxCharges = Math.max(0, parseInt(this.container.querySelector('#input-item-max-charges')?.value, 10) || 0);
    const currentChargesRaw = parseInt(this.container.querySelector('#input-item-current-charges')?.value, 10);
    const chargeRecovery = (this.container.querySelector('#input-item-charge-recovery')?.value || '').trim();

    // Edición de objeto existente (Requisito: editar objetos en la hoja interactiva)
    const editItemId = (this.container.querySelector('#input-edit-item-id')?.value || '').trim();
    if (editItemId) {
      const existingItem = (char.inventory || []).find(it => String(it.id) === String(editItemId));
      if (existingItem) {
        existingItem.name = name;
        existingItem.category = category;
        existingItem.quantity = quantity;
        existingItem.weight = weight;
        existingItem.magicBonus = magicBonus;
        existingItem.description = description;
        existingItem.requiresAttunement = requiresAttunement;
        if (requiresAttunement) {
          existingItem.isAttuned = equipNow ? true : !!existingItem.isAttuned;
        } else {
          delete existingItem.isAttuned;
        }

        if (maxCharges > 0) {
          existingItem.maxCharges = maxCharges;
          existingItem.currentCharges = !isNaN(currentChargesRaw) ? Math.max(0, Math.min(maxCharges, currentChargesRaw)) : (existingItem.currentCharges ?? maxCharges);
          existingItem.chargeRecovery = chargeRecovery || 'Recupera todas las cargas tras un descanso largo';
        } else {
          delete existingItem.maxCharges;
          delete existingItem.currentCharges;
          delete existingItem.chargeRecovery;
        }

        if (Array.isArray(this.currentCatalogItemModifiers) && this.currentCatalogItemModifiers.length > 0) {
          existingItem.statModifiers = JSON.parse(JSON.stringify(this.currentCatalogItemModifiers));
        } else {
          delete existingItem.statModifiers;
        }

        if (Array.isArray(this.currentCustomFunctions) && this.currentCustomFunctions.length > 0) {
          existingItem.customFunctions = JSON.parse(JSON.stringify(this.currentCustomFunctions));
        } else {
          delete existingItem.customFunctions;
        }

        if (Array.isArray(this.currentArtifactProperties) && this.currentArtifactProperties.length > 0) {
          existingItem.artifactProperties = JSON.parse(JSON.stringify(this.currentArtifactProperties));
        } else {
          delete existingItem.artifactProperties;
        }

        if (category === 'arma') {
          existingItem.damage = this.container.querySelector('#input-item-damage')?.value.trim() || '1d6';
          existingItem.damageType = this.container.querySelector('#input-item-damage-type')?.value || 'Cortante';
          existingItem.masteryProperty = this.container.querySelector('#input-item-mastery')?.value.trim() || 'Ninguna';
          const canonicalW = findCanonicalWeapon(name);
          if (canonicalW) existingItem.weaponType = canonicalW.id;
        }

        if (category === 'armadura') {
          const matched = DND55_ARMORS.find(a => a.name.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(a.name.toLowerCase()));
          if (matched) {
            existingItem.armorType = matched.id;
            existingItem.baseAc = matched.baseAc;
            existingItem.maxDexBonus = matched.maxDexBonus;
          }
        }

        if (category === 'escudo') {
          existingItem.armorType = 'escudo';
          existingItem.baseAc = 2;
        }

        if (equipNow && !existingItem.isEquipped) {
          if (category === 'armadura') this.toggleEquipArmor(char, existingItem.id);
          else if (category === 'escudo') this.toggleEquipShield(char, existingItem.id);
          else if (category === 'arma') this.toggleEquipWeapon(char, existingItem.id);
          else { existingItem.isEquipped = true; store.saveCharacter(char); }
        } else if (!equipNow && existingItem.isEquipped) {
          existingItem.isEquipped = false;
          if (category === 'armadura' && char.armorId === existingItem.id) char.armorId = 'sin_armadura';
          if (category === 'escudo') char.hasShield = false;
          if (category === 'arma' && Array.isArray(char.equippedWeapons)) {
            char.equippedWeapons = char.equippedWeapons.filter(w => w !== existingItem.id && w !== existingItem.weaponType);
          }
          store.saveCharacter(char);
        } else {
          store.saveCharacter(char);
        }

        dialog?.close();
        showToast.success(`Objeto "${existingItem.name}" actualizado correctamente.`);
        this.render();
        return;
      }
    }

    const newItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name,
      category,
      quantity,
      weight,
      magicBonus,
      description,
      requiresAttunement,
      isAttuned: requiresAttunement && equipNow,
      isEquipped: false
    };

    if (category === 'pergamino') {
      const scrollLvl = parseInt(this.container.querySelector('#select-scroll-level')?.value || '0', 10);
      const scrollSpellId = this.container.querySelector('#select-scroll-spell')?.value || '';
      const st = (DND55_SCROLL_LEVEL_STATS || []).find(s => s.level === scrollLvl);
      newItem.scrollLevel = scrollLvl;
      newItem.scrollSpellId = scrollSpellId;
      newItem.scrollDc = st?.dc || 13;
      newItem.scrollAttackBonus = st?.attackBonus || 5;
    }

    if (maxCharges > 0) {
      newItem.maxCharges = maxCharges;
      newItem.currentCharges = !isNaN(currentChargesRaw) ? Math.max(0, Math.min(maxCharges, currentChargesRaw)) : maxCharges;
      newItem.chargeRecovery = chargeRecovery || 'Recupera todas las cargas tras un descanso largo';
    }

    if (Array.isArray(this.currentCatalogItemModifiers) && this.currentCatalogItemModifiers.length > 0) {
      newItem.statModifiers = JSON.parse(JSON.stringify(this.currentCatalogItemModifiers));
    }
    if (Array.isArray(this.currentCustomFunctions) && this.currentCustomFunctions.length > 0) {
      newItem.customFunctions = JSON.parse(JSON.stringify(this.currentCustomFunctions));
    }
    if (Array.isArray(this.currentArtifactProperties) && this.currentArtifactProperties.length > 0) {
      newItem.artifactProperties = JSON.parse(JSON.stringify(this.currentArtifactProperties));
    }

    this.currentCatalogItemModifiers = [];
    this.currentCustomFunctions = [];
    this.currentArtifactProperties = [];
    this.currentCatalogBaseName = '';
    this.hasUserEditedItemName = false;

    if (category === 'arma') {
      newItem.damage = this.container.querySelector('#input-item-damage').value.trim() || '1d6';
      newItem.damageType = this.container.querySelector('#input-item-damage-type').value;
      newItem.masteryProperty = this.container.querySelector('#input-item-mastery').value.trim() || 'Ninguna';
      const canonicalW = findCanonicalWeapon(name);
      if (canonicalW) {
        newItem.weaponType = canonicalW.id;
      }
    }

    if (category === 'armadura') {
      const matched = DND55_ARMORS.find(a => a.name.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(a.name.toLowerCase()));
      if (matched) {
        newItem.armorType = matched.id;
        newItem.baseAc = matched.baseAc;
        newItem.maxDexBonus = matched.maxDexBonus;
      } else {
        newItem.baseAc = 13;
        newItem.maxDexBonus = 2;
      }
    }

    if (category === 'escudo') {
      newItem.armorType = 'escudo';
      newItem.baseAc = 2;
    }

    if (!Array.isArray(char.inventory)) char.inventory = [];
    char.inventory.push(newItem);

    // Si se marcó equipar de inmediato (excepto consumibles, pergaminos y sortilegios)
    if (equipNow && category !== 'pergamino' && category !== 'sortilegio' && category !== 'pocion') {
      if (category === 'armadura') {
        this.toggleEquipArmor(char, newItem.id);
      } else if (category === 'escudo') {
        this.toggleEquipShield(char, newItem.id);
      } else if (category === 'arma') {
        this.toggleEquipWeapon(char, newItem.id);
      } else {
        newItem.isEquipped = true;
        store.saveCharacter(char);
      }
    } else {
      store.saveCharacter(char);
    }

    dialog?.close();
  }

  // ==========================================
  // LÓGICA DE RASGOS PERSONALIZADOS Y BENDICIONES
  // ==========================================

  toggleTraitActive(char, traitId) {
    if (!Array.isArray(char.specialAbilities)) return;
    const trait = char.specialAbilities.find(t => String(t.id) === String(traitId));
    if (!trait) return;

    trait.isActive = trait.isActive === false ? true : false;
    store.saveCharacter(char);
  }

  deleteTrait(char, traitId) {
    if (!Array.isArray(char.specialAbilities)) return;
    char.specialAbilities = char.specialAbilities.filter(t => String(t.id) !== String(traitId));
    store.saveCharacter(char);
  }

  populateTraitModalFromPreset(presetKey) {
    if (!presetKey) return;
    const nameInput = this.container.querySelector('#input-trait-name');
    const sourceInput = this.container.querySelector('#input-trait-source');
    const descInput = this.container.querySelector('#input-trait-desc');
    const targetSelect = this.container.querySelector('#input-trait-target');
    const modeSelect = this.container.querySelector('#input-trait-mode');
    const valueInput = this.container.querySelector('#input-trait-value');

    const presets = {
      blessing_health_con: {
        name: "Bendición de la Salud (Ilmáter)",
        source: "Bendición Divina de Compasión",
        desc: "El favor del dios de la resistencia fortalece tu cuerpo físico de forma inquebrantable. Aporta un +2 a la Constitución de forma permanente.",
        target: "con",
        mode: "bonus",
        value: 2
      },
      blessing_health_hp: {
        name: "Bendición de Vitalidad Inmortal",
        source: "Bendición de la Vida",
        desc: "Tu esencia vital se expande de forma milagrosa. Aumenta tus Puntos de Golpe Máximos en 10 puntos permanentemente.",
        target: "hpMax",
        mode: "bonus",
        value: 10
      },
      blessing_protection: {
        name: "Bendición de Protección (Helm)",
        source: "Bendición Divina del Vigilante",
        desc: "Un escudo de luz sagrada desvía los ataques enemigos, otorgando un bonificador de +1 a la Clase de Armadura.",
        target: "ac",
        mode: "bonus",
        value: 1
      },
      blessing_strength: {
        name: "Bendición de Fuerza Titánica (Kord)",
        source: "Don Sobrenatural de las Tormentas",
        desc: "La fuerza de los gigantes fluye por tus músculos marciales. Tu puntuación de Fuerza pasa a ser 21.",
        target: "str",
        mode: "override_if_lower",
        value: 21
      },
      blessing_understanding: {
        name: "Bendición de la Sabiduría Trascendental (Oghma)",
        source: "Bendición de Deidad del Saber",
        desc: "Tu espíritu se sintoniza con las leyes secretas del cosmos. Tu Sabiduría aumenta permanentemente en +2.",
        target: "wis",
        mode: "bonus",
        value: 2
      },
      blessing_quickness: {
        name: "Bendición de la Rapidez de los Vientos (Akadi)",
        source: "Favor de Deidad Elemental",
        desc: "Tus reflejos alcanzan la ligereza del vendaval. Aumenta tu puntuación de Destreza en +2.",
        target: "dex",
        mode: "bonus",
        value: 2
      },
      blessing_cosmic: {
        name: "Bendición de la Mente Cósmica (Mystra)",
        source: "Don Sagrado de la Urdimbre",
        desc: "Los hilos de la magia pura penetran tu mente. Tu Inteligencia aumenta en +2 permanentemente.",
        target: "int",
        mode: "bonus",
        value: 2
      }
    };

    const p = presets[presetKey];
    if (p) {
      nameInput.value = p.name;
      sourceInput.value = p.source;
      descInput.value = p.desc;
      targetSelect.value = p.target;
      modeSelect.value = p.mode;
      valueInput.value = p.value;
    }
  }

  saveOrUpdateTrait(char, dialog) {
    const activeChar = store.getSelectedCharacter() || char;
    if (!activeChar) return;

    const traitId = this.container.querySelector('#input-trait-id')?.value?.trim();
    const name = this.container.querySelector('#input-trait-name').value.trim();
    if (!name) return;

    const source = this.container.querySelector('#input-trait-source').value.trim() || 'Bendición Divina';
    const description = this.container.querySelector('#input-trait-desc').value.trim();
    const target = this.container.querySelector('#input-trait-target').value;
    const mode = this.container.querySelector('#input-trait-mode').value;
    const value = parseInt(this.container.querySelector('#input-trait-value').value, 10) || 0;

    const statModifiers = [];
    if (target !== 'none' && value !== 0) {
      statModifiers.push({
        target,
        mode,
        value,
        description: `${mode === 'override_if_lower' ? `Mínimo ${value}` : `+${value}`} a ${getAbilityFullName(target)}`
      });
    }

    if (!Array.isArray(activeChar.specialAbilities)) activeChar.specialAbilities = [];

    if (traitId) {
      const existing = activeChar.specialAbilities.find(t => String(t.id) === String(traitId));
      if (existing) {
        existing.name = name;
        existing.source = source;
        existing.description = description;
        existing.statModifiers = statModifiers;
        showToast.success(`"${name}" actualizado con éxito.`);
      }
    } else {
      const newTrait = {
        id: `trait_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name,
        source,
        description,
        isActive: true,
        statModifiers
      };
      activeChar.specialAbilities.push(newTrait);
      showToast.success(`"${name}" añadido.`);
    }

    store.saveCharacter(activeChar);
    dialog?.close();
  }
}
