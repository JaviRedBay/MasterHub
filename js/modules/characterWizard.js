/**
 * Módulo A: Asistente Guiado Paso a Paso (Character Wizard)
 * Creación de personajes para D&D 5.5 (PHB 2024 / Faerûn)
 * 7 Pasos interactivos con validación estricta y cálculo automático.
 */

import { store } from '../state.js';
import { 
  DND55_SPECIES, 
  DND55_BACKGROUNDS, 
  DND55_CLASSES, 
  DND55_CLASS_STARTING_EQUIPMENT,
  getClassStartingEquipment,
  DND55_FIGHTING_STYLES,
  DND55_ARMORS,
  DND55_WEAPONS,
  DND55_SKILLS,
  DND55_STANDARD_LANGUAGES,
  DND55_TOOL_PROFICIENCIES,
  getBackgroundToolGroups,
  DND55_MULTICLASS_RULES,
  STANDARD_ARRAY,
  calculateArmorClass,
  calculateHitPoints,
  calculateInitiative,
  calculateCarryingCapacity,
  calculateFinalAbilityScores,
  getAbilityModifier,
  getAbilityShortName,
  formatModifier,
  getProficiencyBonus,
  getFeatById,
  getFeatName,
  getCharacterAsiLevels,
  getCharacterClasses,
  getClassLevel,
  getCharacterFullClassTitle,
  getCharacterHitDicePool,
  checkMulticlassPrerequisites,
  getClassName,
  getSubclassName,
  calculateSkills,
  getClassFeatureChoices,
  getMaxAllowedExpertiseCount,
  characterQualifiesForFightingStyle,
  getInnateSpellsForCharacter
} from '../constants/dnd55Rules.js';
import { 
  DND55_ALL_48_SUBCLASSES, 
  DND55_ALL_ORIGIN_FEATS, 
  DND55_ALL_GENERAL_FEATS 
} from '../constants/spellsAndItems.js';
import { escapeHtml } from '../utils/formatters.js';
import { roll4d6DropLowest } from '../utils/dice.js';
import { showToast, showConfirmModal } from '../utils/uiFeedback.js';

export class CharacterWizardModule {
  constructor(containerId = 'wizard-container') {
    this.container = document.getElementById(containerId);
    this.currentStep = 1;
    this.totalSteps = 7;

    this.isEditing = false;
    this.editingCharacterId = null;

    // Estado borrador del personaje en creación
    this.wizardState = this.getDefaultWizardState();
    this.statGenMethod = 'standard'; // 'standard', 'pointbuy', '4d6', 'manual'
    this.rolledStats = [];

    // Escuchar evento para editar un personaje existente desde la Hoja Oficial
    store.on('wizard:edit-character', (char) => {
      this.loadCharacterForEdit(char);
    });

    // Escuchar evento para iniciar un nuevo personaje
    store.on('wizard:new-character', (opts) => {
      this.resetToNewCharacter(opts?.campaignId);
    });

    // Escuchar evento para fijar nombre desde el Generador de Nombres
    store.on('wizard:set-character-name', (data) => {
      if (data?.name) {
        if (!this.wizardState) {
          this.resetToNewCharacter();
        }
        this.wizardState.name = data.name;
        if (data.speciesId) {
          this.wizardState.speciesId = data.speciesId;
        }
        this.currentStep = 1;
        this.render();
      }
    });
  }

  syncWizardClassState() {
    if (!Array.isArray(this.wizardState.classes) || this.wizardState.classes.length === 0) {
      this.wizardState.classes = [
        { classId: this.wizardState.classId || 'guerrero', level: this.wizardState.level || 1, subclassId: this.wizardState.subclassId || '' }
      ];
    }
    this.wizardState.classId = this.wizardState.classes[0].classId;
    this.wizardState.subclassId = this.wizardState.classes[0].subclassId || '';
    this.wizardState.level = this.wizardState.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0) || 1;
    this.wizardState.multiclass = this.wizardState.classes.slice(1);
    if (!this.wizardState.classAsiChoices || typeof this.wizardState.classAsiChoices !== 'object') {
      this.wizardState.classAsiChoices = {};
    }
    if (!characterQualifiesForFightingStyle(this.wizardState)) {
      delete this.wizardState.fightingStyle;
      delete this.wizardState.fightingStyles;
      delete this.wizardState.fightingStylesBySlot;
    }
  }

  loadCharacterForEdit(char) {
    if (!char) return;
    this.isEditing = true;
    this.editingCharacterId = char.id;
    this.statGenMethod = 'manual';
    this.currentStep = 1;

    // Clon profundo para preservar id, inventario, conjuros, tiradas de vida y rasgos
    this.wizardState = JSON.parse(JSON.stringify(char));

    // Garantizar estructuras mínimas requeridas por el asistente
    if (!this.wizardState.baseAbilityScores) {
      this.wizardState.baseAbilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    }
    if (!this.wizardState.classFeatureChoices || typeof this.wizardState.classFeatureChoices !== 'object') {
      this.wizardState.classFeatureChoices = char.classFeatureChoices ? { ...char.classFeatureChoices } : {};
    }
    if (!Array.isArray(this.wizardState.expertiseSkills)) {
      this.wizardState.expertiseSkills = Array.isArray(char.expertiseSkills) ? [...char.expertiseSkills] : [];
    }
    if (!Array.isArray(this.wizardState.backgroundAbilityBoosts) || this.wizardState.backgroundAbilityBoosts.length < 2) {
      this.wizardState.backgroundAbilityBoosts = [
        { ability: 'str', bonus: 2 },
        { ability: 'con', bonus: 1 }
      ];
    }
    if (!Array.isArray(this.wizardState.classes) || this.wizardState.classes.length === 0) {
      this.wizardState.classes = [
        { classId: this.wizardState.classId || 'guerrero', level: this.wizardState.level || 1, subclassId: this.wizardState.subclassId || '' }
      ];
      if (Array.isArray(this.wizardState.multiclass)) {
        this.wizardState.multiclass.forEach(m => {
          if (m && m.classId) {
            this.wizardState.classes.push({
              classId: m.classId,
              level: Number(m.level) || 1,
              subclassId: m.subclassId || ''
            });
          }
        });
      }
    }
    this.syncWizardClassState();

    if (!Array.isArray(this.wizardState.chosenClassSkills)) {
      this.wizardState.chosenClassSkills = [];
    }
    if (!Array.isArray(this.wizardState.equippedWeapons)) {
      this.wizardState.equippedWeapons = [];
    }
    if (!Array.isArray(this.wizardState.languages) || this.wizardState.languages.length === 0) {
      this.wizardState.languages = ['Común', 'Élfico', 'Enano'];
    }
    if (Array.isArray(this.wizardState.inventory) && this.wizardState.inventory.length > 0) {
      this.wizardState.startingEquipmentMode = 'keep';
    } else {
      this.wizardState.startingEquipmentMode = 'package';
    }

    this.render();
  }

  resetToNewCharacter(campaignId = null) {
    this.isEditing = false;
    this.editingCharacterId = null;
    this.wizardState = this.getDefaultWizardState();
    if (campaignId) {
      this.wizardState.campaignId = campaignId;
    }
    this.currentStep = 1;
    this.statGenMethod = 'standard';
    this.render();
  }

  getDefaultWizardState() {
    return {
      campaignId: store.getSelectedCampaignId() || 'camp_strahd',
      playerName: '',
      name: '',
      alignment: 'Neutral Bueno',
      classes: [
        { classId: 'guerrero', level: 1, subclassId: '' }
      ],
      classId: 'guerrero',
      level: 1,
      subclassId: '',
      classAsiChoices: {},
      speciesId: 'humano',
      sublineageId: '',
      speciesSkillChoice: 'Percepción',
      speciesOriginFeat: 'Alerta',
      backgroundId: 'soldado',
      customBackground: null,
      backgroundAbilityBoosts: [
        { ability: 'str', bonus: 2 },
        { ability: 'con', bonus: 1 }
      ],
      originFeat: 'Atacante Salvaje',
      languages: ['Común', 'Enano', 'Trasgoide'],
      tools: [],
      classTools: [],
      startingEquipmentMode: 'package',
      baseAbilityScores: {
        str: 15,
        dex: 13,
        con: 14,
        int: 10,
        wis: 12,
        cha: 8
      },
      chosenClassSkills: ['Atletismo', 'Intimidación'],
      fightingStyle: 'estilo_defensa',
      classFeatureChoices: {},
      expertiseSkills: [],
      armorId: 'cota_malla',
      hasShield: true,
      equippedWeapons: ['espada_larga'],
      level4Choice: null,
      level6Choice: null,
      level8Choice: null,
      level10Choice: null,
      level12Choice: null,
      level14Choice: null,
      level16Choice: null,
      level19Choice: null
    };
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="rpg-card p-3 p-md-4 mb-4">
        ${this.isEditing ? `
          <div class="p-3 rounded border border-warning d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2" style="background: color-mix(in srgb, var(--rpg-warning) 14%, transparent);">
            <div class="text-light">
              <span class="fs-5 me-1">✏️</span> 
              <strong class="text-warning">Modo Edición:</strong> Modificando al personaje 
              <span class="badge bg-dark text-warning border border-warning fs-6 ms-1">${escapeHtml(this.wizardState.name || 'Sin Nombre')}</span> 
              <span class="text-light small ms-1">(${escapeHtml(getCharacterFullClassTitle(this.wizardState))} - Nivel Total ${this.wizardState.level || 1})</span>
              <div class="small text-secondary mt-1">El inventario completo, armas equipadas, conjuros y rasgos personalizados se conservarán íntegros al guardar.</div>
            </div>
            <button id="btn-wizard-exit-edit" class="btn btn-sm btn-warning text-dark fw-bold border border-dark shadow-sm">
              + Crear Nuevo Personaje desde Cero
            </button>
          </div>
        ` : ''}

        <!-- Indicador de Pasos Superiores -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3 gap-2">
          <div>
            <h2 class="h4 text-warning mb-1 d-flex align-items-center gap-2">
              <span>🧙‍♂️</span> ${this.isEditing ? `Modificar Personaje: ${escapeHtml(this.wizardState.name || 'Héroe')}` : 'Asistente de Creación D&amp;D 5.5'}
            </h2>
            <div class="text-secondary small">
              Paso ${this.currentStep} de ${this.totalSteps}: ${this.getStepTitle(this.currentStep)}
            </div>
          </div>
          <!-- Barra de Progreso de Pasos con Identificación Clara (Escritorio y Tablets) -->
          <div class="d-none d-md-flex flex-wrap gap-1">
            ${Array.from({ length: this.totalSteps }).map((_, i) => `
              <button tabindex="-1" class="btn btn-sm rpg-wizard-step-btn ${this.currentStep === i + 1 ? 'active' : i + 1 < this.currentStep ? 'completed' : ''} px-2 py-1 btn-step-nav d-inline-flex align-items-center gap-1" data-step="${i + 1}" title="Paso ${i + 1}: ${this.getStepTitle(i + 1)}">
                <span class="rpg-wizard-step-badge">${i + 1}</span>
                <span class="small">${this.getStepShortLabel(i + 1)}</span>
              </button>
            `).join('')}
          </div>

          <!-- Selector de Paso Compacto para Móviles y Pantallas Estrechas -->
          <div class="d-md-none w-100 mt-2">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-dark border-secondary text-warning fw-bold">Ir al Paso:</span>
              <select id="w-mobile-step-select" class="form-select form-select-sm bg-dark text-light border-secondary">
                ${Array.from({ length: this.totalSteps }).map((_, i) => `
                  <option value="${i + 1}" ${this.currentStep === i + 1 ? 'selected' : ''}>
                    ${i + 1}. ${this.getStepTitle(i + 1)}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Contenido del Paso Actual -->
        <div id="wizard-step-content" class="mb-4">
          ${this.renderCurrentStepContent()}
        </div>

        <!-- Botones de Navegación de Pasos -->
        <div class="d-flex justify-content-between align-items-center border-top border-secondary pt-3 flex-wrap gap-2">
          <button id="btn-wizard-prev" class="btn btn-outline-secondary ${this.currentStep === 1 ? 'invisible' : ''}" tabindex="0">
            &larr; Paso Anterior
          </button>
          <div class="d-flex align-items-center gap-2">
            <button id="btn-wizard-cancel" class="btn ${this.isEditing ? 'btn-outline-danger' : 'btn-outline-secondary'} btn-sm" tabindex="0">
              ${this.isEditing ? 'Cancelar Edición y Volver a la Hoja' : 'Reiniciar'}
            </button>
            ${(this.isEditing && this.currentStep < this.totalSteps && this.canQuickSaveInEditMode().canSave) ? `
              <button id="btn-wizard-quick-save" class="btn btn-success text-light fw-bold shadow-sm" tabindex="0" title="Guardar cambios realizados y volver a la Hoja Oficial">
                ✓ Guardar Cambios
              </button>
            ` : ''}
            ${this.currentStep < this.totalSteps ? `
              <button id="btn-wizard-next" class="btn btn-primary" tabindex="0">
                Siguiente Paso &rarr;
              </button>
            ` : `
              <button id="btn-wizard-finish" class="btn btn-success text-light px-4 fw-bold" tabindex="0">
                ${this.isEditing ? `✓ Guardar Cambios en ${escapeHtml(this.wizardState.name || 'Personaje')}` : '✓ Guardar Personaje'}
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    if (window.lucide) window.lucide.createIcons();

    // Auto-foco accesible al primer control interactivo del paso para permitir navegación inmediata por teclado
    setTimeout(() => {
      if (!this.container) return;
      const isVisible = !!(this.container.offsetWidth || this.container.offsetHeight || this.container.getClientRects().length);
      if (!isVisible) return;
      const focusables = this.getStepFocusableElements();
      const firstInput = focusables.find(el => el.matches('input, select, textarea')) || focusables[0];
      if (firstInput && typeof firstInput.focus === 'function' && document.activeElement !== firstInput) {
        firstInput.focus();
      }
    }, 40);
  }

  getStepTitle(step) {
    switch (step) {
      case 1: return 'Datos de la Partida';
      case 2: return 'Especie & Linaje';
      case 3: return 'Trasfondo & Dote de Origen';
      case 4: return 'Asignación de Características';
      case 5: return 'Clase & Equipo Inicial';
      case 6: return 'Subclase & Dotes de Nivel';
      case 7: return 'Resumen & Cálculos Finales';
      default: return '';
    }
  }

  getStepShortLabel(step) {
    switch (step) {
      case 1: return 'Partida';
      case 2: return 'Especie';
      case 3: return 'Trasfondo';
      case 4: return 'Características';
      case 5: return 'Clase y Equipo';
      case 6: return 'Subclase y Dotes';
      case 7: return 'Resumen';
      default: return `Paso ${step}`;
    }
  }

  canQuickSaveInEditMode() {
    if (!this.isEditing) return { canSave: false };
    if (!this.wizardState.name || !this.wizardState.name.trim()) {
      return { canSave: false, reason: 'Debes indicar un nombre para el personaje' };
    }
    const charClasses = getCharacterClasses(this.wizardState);
    for (const c of charClasses) {
      const cDef = DND55_CLASSES.find(cd => cd.id === c.classId);
      const subLvl = cDef?.subclassAvailableAtLevel || 3;
      if (c.level >= subLvl && (!c.subclassId || c.subclassId === '')) {
        return { 
          canSave: false, 
          reason: `Falta elegir la subclase de ${getClassName(c.classId)} (Nivel ${c.level}) en el Paso 6` 
        };
      }
    }
    if (this.wizardState.speciesId === 'humano' && (!this.wizardState.speciesSkillChoice || !this.wizardState.speciesOriginFeat)) {
      return { canSave: false, reason: 'Falta completar las elecciones de la especie Humano en el Paso 2' };
    }
    return { canSave: true };
  }

  renderCurrentStepContent() {
    switch (this.currentStep) {
      case 1: return this.renderStep1();
      case 2: return this.renderStep2();
      case 3: return this.renderStep3();
      case 4: return this.renderStep4();
      case 5: return this.renderStep5();
      case 6: return this.renderStep6();
      case 7: return this.renderStep7();
      default: return '';
    }
  }

  // ==========================================
  // PASO 1: DATOS DE LA PARTIDA
  // ==========================================
  renderStep1() {
    const campaigns = store.getCampaigns();
    const alignments = [
      'Legal Bueno', 'Neutral Bueno', 'Caótico Bueno',
      'Legal Neutral', 'Neutral', 'Neutral Puro', 'Caótico Neutral',
      'Legal Maligno', 'Neutral Maligno', 'Caótico Maligno'
    ];
    if (this.wizardState.alignment && !alignments.includes(this.wizardState.alignment)) {
      alignments.push(this.wizardState.alignment);
    }

    return `
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label text-warning fw-bold">Campaña de Destino</label>
          <select id="w-campaign" class="form-select bg-dark border-secondary text-light">
            ${campaigns.map(c => `
              <option value="${c.id}" ${this.wizardState.campaignId === c.id ? 'selected' : ''}>
                ${escapeHtml(c.name)} (${escapeHtml(c.gameMaster || 'DM')})
              </option>
            `).join('')}
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label text-warning fw-bold">Nombre del Jugador</label>
          <input type="text" id="w-player-name" class="form-control bg-dark border-secondary text-light" value="${escapeHtml(this.wizardState.playerName)}" placeholder="Tu nombre real o apodo">
        </div>

        <div class="col-md-6">
          <label class="form-label text-warning fw-bold">Nombre del Personaje</label>
          <input type="text" id="w-char-name" class="form-control bg-dark border-secondary text-light" value="${escapeHtml(this.wizardState.name)}" placeholder="Ej: Valeros, Selene, Ignis...">
        </div>

        <div class="col-md-6">
          <label class="form-label text-warning fw-bold">Alineamiento</label>
          <select id="w-char-alignment" class="form-select bg-dark border-secondary text-light">
            ${alignments.map(al => `
              <option value="${escapeHtml(al)}" ${this.wizardState.alignment === al ? 'selected' : ''}>${escapeHtml(al)}</option>
            `).join('')}
          </select>
        </div>

        <div class="col-12 mt-2">
          <div class="p-2 px-3 rounded bg-black bg-opacity-40 border border-secondary text-secondary small d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span>ℹ️ <strong>Nivel del Personaje:</strong> Se calcula y asigna por cada clase en el <strong>Paso 5 (Clases y Multiclase)</strong>.</span>
            <span class="badge bg-primary text-light fs-6">Nivel Total: ${this.wizardState.level || 1} &bull; BC +${getProficiencyBonus(this.wizardState.level || 1)}</span>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // PASO 2: ESPECIE Y LINAJE
  // ==========================================
  renderStep2() {
    const species = DND55_SPECIES;
    const currentSpecies = species.find(s => s.id === this.wizardState.speciesId) || species[0];
    const isHuman = currentSpecies.id === 'humano';

    return `
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label text-warning fw-bold">Especie D&amp;D 5.5</label>
          <select id="w-species-select" class="form-select bg-dark border-secondary text-light">
            ${species.map(s => `
              <option value="${s.id}" ${this.wizardState.speciesId === s.id ? 'selected' : ''}>${s.name} (${s.speed} m)</option>
            `).join('')}
          </select>
        </div>

        <!-- Sublinaje si tiene -->
        ${currentSpecies.sublineages && currentSpecies.sublineages.length > 0 ? `
          <div class="col-md-4">
            <label class="form-label text-warning fw-bold">Linaje / Herencia</label>
            <select id="w-sublineage-select" class="form-select bg-dark border-secondary text-light">
              ${currentSpecies.sublineages.map(sub => `
                <option value="${sub.id}" ${this.wizardState.sublineageId === sub.id ? 'selected' : ''}>${sub.name}</option>
              `).join('')}
            </select>
          </div>
        ` : ''}

        <!-- Alto Elfo: Truco de Mago a elección (D&D 5.5) -->
        ${(currentSpecies.id === 'elfo' && (!this.wizardState.sublineageId || this.wizardState.sublineageId === 'alto_elfo')) ? `
          <div class="col-md-4">
            <label class="form-label text-warning fw-bold">Alto Elfo: Truco de Mago</label>
            <select id="w-elf-cantrip" class="form-select bg-dark border-secondary text-light">
              ${['Prestidigitación', 'Descarga de Fuego', 'Luz', 'Mano de Mago', 'Salpicadura Ácida', 'Ilusión Menor', 'Rayo de Escarcha', 'Agarre Electrizante', 'Mensaje'].map(c => `
                <option value="${c}" ${(this.wizardState.speciesCantripChoice || 'Prestidigitación') === c ? 'selected' : ''}>${c}</option>
              `).join('')}
            </select>
          </div>
        ` : ''}

        <!-- Humano: Hábil y Versátil -->
        ${isHuman ? `
          <div class="col-md-4">
            <label class="form-label text-warning fw-bold">Humano: Habilidad Extra (Hábil)</label>
            <select id="w-human-skill" class="form-select bg-dark border-secondary text-light">
              ${DND55_SKILLS.map(sk => `
                <option value="${sk.name}" ${this.wizardState.speciesSkillChoice === sk.name ? 'selected' : ''}>${sk.name}</option>
              `).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label text-warning fw-bold">Humano: Dote de Origen Extra (Versátil)</label>
            <select id="w-human-origin-feat" class="form-select bg-dark border-secondary text-light">
              <optgroup label="Dotes de Origen (PHB 2024)">
                ${DND55_ALL_ORIGIN_FEATS.filter(of => of.featGroup !== 'faerun_origen').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(of => `
                  <option value="${of.name}" ${this.wizardState.speciesOriginFeat === of.name || this.wizardState.speciesOriginFeat === of.id ? 'selected' : ''}>${of.name}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Dotes de Origen (Faerûn)">
                ${DND55_ALL_ORIGIN_FEATS.filter(of => of.featGroup === 'faerun_origen').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(of => `
                  <option value="${of.name}" ${this.wizardState.speciesOriginFeat === of.name || this.wizardState.speciesOriginFeat === of.id ? 'selected' : ''}>${of.name}</option>
                `).join('')}
              </optgroup>
            </select>
          </div>
        ` : ''}

        <!-- Tarjeta Informativa de Rasgos de la Especie -->
        <div class="col-12 mt-3">
          <div class="p-3 rounded bg-dark border border-secondary">
            <h5 class="text-warning h6 mb-2">Rasgos de ${currentSpecies.name} (Velocidad: ${currentSpecies.speed} m, Tamaño: ${currentSpecies.size}):</h5>
            <ul class="mb-0 small text-light ps-3">
              ${currentSpecies.traits.map(t => `
                <li class="mb-1"><strong>${escapeHtml(t.name)}:</strong> ${escapeHtml(t.description)}</li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // PASO 3: TRASFONDO (OFICIAL O PERSONALIZADO) Y DOTE DE ORIGEN
  // ==========================================
  getEffectiveBackground() {
    if (this.wizardState.backgroundId === 'personalizado') {
      if (!this.wizardState.customBackground || typeof this.wizardState.customBackground !== 'object') {
        this.wizardState.customBackground = {
          id: 'personalizado',
          name: 'Aventurero Errante',
          description: 'Trasfondo personalizado creado a medida según las reglas de D&D 5.5 (PHB 2024).',
          allowedAbilities: ['str', 'dex', 'con'],
          skills: ['Atletismo', 'Percepción'],
          toolProficiencies: ['Herramientas de ladrón'],
          originFeat: this.wizardState.originFeat || 'Alerta'
        };
      }
      return this.wizardState.customBackground;
    }
    return DND55_BACKGROUNDS.find(b => b.id === this.wizardState.backgroundId) || DND55_BACKGROUNDS[0];
  }

  renderStep3() {
    const backgrounds = DND55_BACKGROUNDS;
    const isCustomBg = this.wizardState.backgroundId === 'personalizado';
    const currentBg = this.getEffectiveBackground();

    // Sincronizar las competencias con herramientas al cambiar de trasfondo:
    // se conservan solo las fijas; las "a elegir" quedan vacías hasta que se elijan.
    if (this.wizardState.toolsBgId !== this.wizardState.backgroundId) {
      const hadPrev = this.wizardState.toolsBgId !== undefined;
      if (!isCustomBg && (hadPrev || !(this.wizardState.tools || []).length)) {
        this.wizardState.tools = getBackgroundToolGroups(currentBg)
          .filter(g => g.options.length === 1)
          .map(g => g.options[0]);
      }
      this.wizardState.toolsBgId = this.wizardState.backgroundId;
    }

    const abilityNames = {
      str: 'Fuerza (FUE)',
      dex: 'Destreza (DES)',
      con: 'Constitución (CON)',
      int: 'Inteligencia (INT)',
      wis: 'Sabiduría (SAB)',
      cha: 'Carisma (CAR)'
    };

    const allowed = Array.isArray(currentBg.allowedAbilities) && currentBg.allowedAbilities.length >= 2
      ? [...currentBg.allowedAbilities]
      : ['str', 'dex', 'con'];

    const isThreePlusOne = this.wizardState.backgroundBoostMode === '1_1_1' || (
      !this.wizardState.backgroundBoostMode &&
      Array.isArray(this.wizardState.backgroundAbilityBoosts) &&
      this.wizardState.backgroundAbilityBoosts.length === 3 &&
      this.wizardState.backgroundAbilityBoosts.every(b => b && b.bonus === 1)
    );
    this.wizardState.backgroundBoostMode = isThreePlusOne ? '1_1_1' : '2_1';

    let boost2Ab = allowed[0];
    let boost1Ab = allowed[1] || allowed[0];

    if (isThreePlusOne) {
      this.wizardState.backgroundAbilityBoosts = allowed.map(ab => ({ ability: ab, bonus: 1 }));
    } else {
      const raw2 = this.wizardState.backgroundAbilityBoosts?.find(b => b?.bonus === 2)?.ability || this.wizardState.backgroundAbilityBoosts?.[0]?.ability;
      const raw1 = this.wizardState.backgroundAbilityBoosts?.find(b => b?.bonus === 1)?.ability || this.wizardState.backgroundAbilityBoosts?.[1]?.ability;
      boost2Ab = allowed.includes(raw2) ? raw2 : allowed[0];
      boost1Ab = (allowed.includes(raw1) && raw1 !== boost2Ab) ? raw1 : (allowed.find(a => a !== boost2Ab) || allowed[1] || allowed[0]);
      this.wizardState.backgroundAbilityBoosts = [
        { ability: boost2Ab, bonus: 2 },
        { ability: boost1Ab, bonus: 1 }
      ];
    }

    return `
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label text-warning fw-bold">Trasfondo (PHB 2024 / Faerûn o Personalizado)</label>
          <select id="w-bg-select" class="form-select bg-dark border-secondary text-light">
            <option value="personalizado" ${isCustomBg ? 'selected' : ''}>✨ Trasfondo Personalizado (Crear a medida D&amp;D 5.5)</option>
            <optgroup label="Trasfondos Oficiales (PHB 2024 / Faerûn)">
              ${backgrounds.map(b => `
                <option value="${b.id}" ${!isCustomBg && this.wizardState.backgroundId === b.id ? 'selected' : ''}>${b.name}</option>
              `).join('')}
            </optgroup>
          </select>
          <div class="text-secondary small mt-1">${escapeHtml(currentBg.description || '')}</div>
        </div>

        <div class="col-md-6">
          <label class="form-label text-warning fw-bold">Dote de Origen Otorgada</label>
          ${isCustomBg ? `
            <select id="w-custom-bg-feat" class="form-select bg-dark border-warning text-warning fw-bold">
              <optgroup label="Dotes de Origen (PHB 2024)">
                ${DND55_ALL_ORIGIN_FEATS.filter(of => of.featGroup !== 'faerun_origen').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(of => `
                  <option value="${of.name}" ${currentBg.originFeat === of.name || currentBg.originFeat === of.id ? 'selected' : ''}>${of.name}</option>
                `).join('')}
              </optgroup>
              <optgroup label="Dotes de Origen (Faerûn)">
                ${DND55_ALL_ORIGIN_FEATS.filter(of => of.featGroup === 'faerun_origen').slice().sort((a, b) => a.name.localeCompare(b.name, 'es')).map(of => `
                  <option value="${of.name}" ${currentBg.originFeat === of.name || currentBg.originFeat === of.id ? 'selected' : ''}>${of.name}</option>
                `).join('')}
              </optgroup>
            </select>
          ` : `
            <input type="text" class="form-control bg-dark border-secondary text-warning fw-bold" value="${currentBg.originFeat}" readonly>
          `}
          ${(() => {
            const ofDef = getFeatById(currentBg.originFeat);
            return ofDef ? `<div class="p-2 mt-2 rounded bg-black bg-opacity-40 border border-secondary text-light small"><strong class="text-warning">Efecto:</strong> ${escapeHtml(ofDef.description)}</div>` : '';
          })()}
          <div class="text-secondary small mt-2">Habilidades concedidas: <strong class="text-light">${(currentBg.skills || []).join(', ')}</strong></div>
          ${isCustomBg ? '' : (() => {
            const groups = getBackgroundToolGroups(currentBg);
            if (groups.length === 0) return '';
            const cur = this.wizardState.tools || [];
            return `<div class="mt-2 p-2 rounded bg-black bg-opacity-40 border border-secondary">
              <div class="small text-warning fw-bold mb-1">Competencia con Herramientas / Juegos</div>
              ${groups.map((g, gi) => g.options.length <= 1
                ? `<div class="small text-light">🔧 ${escapeHtml(g.options[0] || g.entry)} <span class="text-secondary">(fija)</span></div>`
                : `<select class="form-select form-select-sm bg-dark border-secondary text-light mb-1 w-bg-tool-group" data-group="${gi}">
                    <option value="">— Ninguna —</option>
                    ${g.options.map(o => `<option value="${escapeHtml(o)}" ${cur.includes(o) ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
                  </select>`).join('')}
            </div>`;
          })()}
        </div>

        <!-- Requisito 4.3: Editor de Trasfondo Personalizado -->
        ${isCustomBg ? `
          <div class="col-12 mt-2">
            <div class="p-3 rounded bg-dark border border-warning">
              <h6 class="text-warning mb-2 d-flex align-items-center gap-2">
                <span>✨</span> Configurar Trasfondo Personalizado (Reglas D&amp;D 5.5)
              </h6>
              <div class="row g-2">
                <div class="col-md-5">
                  <label class="form-label small text-secondary mb-1">Nombre del Trasfondo *</label>
                  <input type="text" id="w-custom-bg-name" class="form-control form-control-sm bg-black border-secondary text-light" value="${escapeHtml(currentBg.name || 'Aventurero Errante')}">
                </div>
                <div class="col-md-7">
                  <label class="form-label small text-secondary mb-1">Descripción Breve</label>
                  <input type="text" id="w-custom-bg-desc" class="form-control form-control-sm bg-black border-secondary text-light" value="${escapeHtml(currentBg.description || '')}">
                </div>
                <div class="col-md-4">
                  <label class="form-label small text-warning mb-1">3 Características Permitidas</label>
                  <div class="d-flex gap-1">
                    ${[0, 1, 2].map(idx => {
                      const val = allowed[idx] || ['str', 'dex', 'con'][idx];
                      return `
                        <select id="w-custom-bg-ab-${idx}" class="form-select form-select-sm bg-black border-secondary text-light w-custom-bg-ab">
                          ${Object.entries(abilityNames).map(([k, lbl]) => `
                            <option value="${k}" ${val === k ? 'selected' : ''}>${getAbilityShortName(k)}</option>
                          `).join('')}
                        </select>
                      `;
                    }).join('')}
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="form-label small text-warning mb-1">2 Habilidades Concedidas</label>
                  <div class="d-flex gap-1">
                    ${[0, 1].map(idx => {
                      const val = currentBg.skills?.[idx] || ['Atletismo', 'Percepción'][idx];
                      return `
                        <select id="w-custom-bg-sk-${idx}" class="form-select form-select-sm bg-black border-secondary text-light w-custom-bg-sk">
                          ${DND55_SKILLS.map(s => `
                            <option value="${s.name}" ${val === s.name ? 'selected' : ''}>${s.name}</option>
                          `).join('')}
                        </select>
                      `;
                    }).join('')}
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="form-label small text-warning mb-1">Competencia en Herramienta</label>
                  <select id="w-custom-bg-tool" class="form-select form-select-sm bg-black border-secondary text-light">
                    ${(DND55_TOOL_PROFICIENCIES || []).map(t => `
                      <option value="${escapeHtml(t)}" ${(currentBg.toolProficiencies?.[0] || '') === t ? 'selected' : ''}>${escapeHtml(t)}</option>
                    `).join('')}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Distribución de Bonificaciones (+2/+1 o +1/+1/+1) restringida a las características del trasfondo -->
        <div class="col-12 mt-3">
          <div class="p-3 rounded bg-dark border border-secondary">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
              <h6 class="text-warning mb-0">Bonificación de Características del Trasfondo:</h6>
              <span class="badge bg-black border border-warning text-warning">
                Permitidas por ${escapeHtml(currentBg.name)}: ${allowed.map(ab => getAbilityShortName(ab)).join(', ')}
              </span>
            </div>
            <p class="text-secondary small mb-3">
              En D&amp;D 5.5, tu trasfondo permite mejorar únicamente entre sus 3 características asociadas: puedes elegir <strong>+2 a una y +1 a otra</strong>, o bien <strong>+1 a las tres</strong>.
            </p>
            <div class="row g-3 align-items-end">
              <div class="col-md-4">
                <label class="form-label text-warning small fw-bold">Modo de Reparto:</label>
                <select id="w-bg-boost-mode" class="form-select bg-dark border-secondary text-light">
                  <option value="2_1" ${!isThreePlusOne ? 'selected' : ''}>+2 a una característica y +1 a otra</option>
                  <option value="1_1_1" ${isThreePlusOne ? 'selected' : ''}>+1 a las tres características (${allowed.map(ab => getAbilityShortName(ab)).join(' / ')})</option>
                </select>
              </div>
              ${!isThreePlusOne ? `
                <div class="col-md-4">
                  <label class="form-label text-light small fw-bold">+2 Bonificador a:</label>
                  <select id="w-boost-plus2" class="form-select bg-dark border-secondary text-warning fw-bold">
                    ${allowed.map(ab => `
                      <option value="${ab}" ${boost2Ab === ab ? 'selected' : ''}>+2 ${abilityNames[ab] || getAbilityShortName(ab)}</option>
                    `).join('')}
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label text-light small fw-bold">+1 Bonificador a:</label>
                  <select id="w-boost-plus1" class="form-select bg-dark border-secondary text-info fw-bold">
                    ${allowed.map(ab => `
                      <option value="${ab}" ${boost1Ab === ab ? 'selected' : ''} ${boost2Ab === ab ? 'disabled' : ''}>+1 ${abilityNames[ab] || getAbilityShortName(ab)}${boost2Ab === ab ? ' (Ya elegida en +2)' : ''}</option>
                    `).join('')}
                  </select>
                </div>
              ` : `
                <div class="col-md-8">
                  <div class="d-flex flex-wrap gap-2">
                    ${allowed.map(ab => `
                      <div class="flex-fill p-2 rounded bg-black bg-opacity-50 border border-warning text-center">
                        <div class="small text-secondary">${abilityNames[ab] || getAbilityShortName(ab)}</div>
                        <div class="fw-bold text-warning fs-6">+1</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // PASO 4: CARACTERÍSTICAS
  // ==========================================
  renderStep4() {
    const scores = this.wizardState.baseAbilityScores;
    const finalScores = calculateFinalAbilityScores(this.wizardState);

    return `
      <div class="mb-3">
        <!-- Selector de Método -->
        <div class="d-flex flex-wrap gap-2 mb-3">
          <button class="btn btn-sm ${this.statGenMethod === 'standard' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-stat-method" data-method="standard">
            Conjunto Estándar (15, 14, 13, 12, 10, 8)
          </button>
          <button class="btn btn-sm ${this.statGenMethod === 'pointbuy' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-stat-method" data-method="pointbuy">
            Compra por Puntos (27 pts)
          </button>
          <button class="btn btn-sm ${this.statGenMethod === '4d6' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-stat-method" data-method="4d6">
            🎲 Tirada 4d6 (Descarta Menor)
          </button>
          <button class="btn btn-sm ${this.statGenMethod === 'manual' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'} btn-stat-method" data-method="manual">
            Personalizado / Libre
          </button>
        </div>

        ${this.statGenMethod === '4d6' ? `
          <div class="mb-3 p-2 rounded bg-dark border border-secondary text-center">
            <button id="btn-roll-all-4d6" class="btn btn-sm btn-primary">Tirar las 6 Características</button>
            <div id="rolled-stats-display" class="small text-warning mt-2">
              ${this.rolledStats.length > 0 ? `Tiradas: [${this.rolledStats.join(', ')}]` : 'Pulsa el botón para generar las tiradas aleatorias.'}
            </div>
          </div>
        ` : ''}

        <!-- Tabla de Asignación de Estadísticas -->
        <div class="row g-2">
          ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(ab => {
            const label = getAbilityShortName(ab);
            const names = { str: 'Fuerza', dex: 'Destreza', con: 'Constitución', int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' };
            const base = scores[ab] || 10;
            const finalVal = finalScores[ab] || 10;
            const mod = getAbilityModifier(finalVal);

            return `
              <div class="col-6 col-md-2">
                <div class="p-2 rounded bg-dark border border-secondary text-center">
                  <div class="fw-bold text-warning small">${names[ab]} (${label})</div>
                  <div class="my-2">
                    <input type="number" class="form-control bg-dark border-secondary text-light text-center fw-bold fs-5 input-base-stat" data-ability="${ab}" value="${base}" min="3" max="20">
                  </div>
                  <div class="small text-secondary">Final: <strong class="text-light">${finalVal}</strong></div>
                  <div class="badge bg-primary fs-6 mt-1">${formatModifier(mod)}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ==========================================
  // PASO 5: CLASE, HABILIDADES (SOLAPAMIENTO 5.5), IDIOMAS Y EQUIPO
  // ==========================================
  getFixedSkillsAndOverlaps() {
    const fixedSkillsMap = new Map(); // skillName -> sourceLabel
    const overlaps = [];
    let featSkillBonusPoints = 0;
    let multiclassSkillBonusPoints = 0;

    const addFixedSkill = (skillName, sourceLabel) => {
      if (!skillName) return;
      if (fixedSkillsMap.has(skillName)) {
        const prevSource = fixedSkillsMap.get(skillName);
        overlaps.push({
          skill: skillName,
          sources: `${prevSource} + ${sourceLabel}`
        });
      } else {
        fixedSkillsMap.set(skillName, sourceLabel);
      }
    };

    // 1. Habilidades del Trasfondo
    const currentBg = this.getEffectiveBackground();
    (currentBg.skills || []).forEach(sk => addFixedSkill(sk, `Trasfondo: ${currentBg.name}`));

    // 2. Habilidades de Especie
    if (this.wizardState.speciesId === 'humano' && this.wizardState.speciesSkillChoice) {
      addFixedSkill(this.wizardState.speciesSkillChoice, 'Especie: Humano (Diestro)');
    }
    if (this.wizardState.speciesId === 'elfo') {
      addFixedSkill('Percepción', 'Especie: Elfo (Sentidos Agudos)');
    }

    // 3. Dotes que otorgan habilidades fijas o puntos de habilidad adicionales
    const checkFeatForSkillBonus = (featIdOrName) => {
      if (!featIdOrName) return;
      const fDef = getFeatById(featIdOrName);
      const idNorm = (fDef?.id || String(featIdOrName)).toLowerCase();
      if (idNorm === 'habil' || idNorm.includes('skilled')) {
        featSkillBonusPoints += 3;
      }
    };

    checkFeatForSkillBonus(this.wizardState.originFeat || currentBg.originFeat);
    if (this.wizardState.speciesId === 'humano') {
      checkFeatForSkillBonus(this.wizardState.speciesOriginFeat);
    }

    // Habilidades por ASIs de todas las clases (multiclase)
    const charClasses = getCharacterClasses(this.wizardState);
    charClasses.forEach((c, cIdx) => {
      getCharacterAsiLevels(c.classId)
        .filter(({ lvl }) => (c.level || 1) >= lvl)
        .forEach(({ key, lvl }) => {
          const ch = this.wizardState.classAsiChoices?.[c.classId]?.[key] ||
            this.wizardState[`${c.classId}_${key}`] ||
            (cIdx === 0 ? this.wizardState[key] : null);
          if (!ch) return;
          if (ch.skillExpertProficiency) {
            addFixedSkill(ch.skillExpertProficiency, `Dote Experto (${getClassName(c.classId)} Nv ${lvl})`);
          }
          if (ch.type === 'feat' && ch.featId) {
            const fDef = getFeatById(ch.featId);
            const fId = (fDef?.id || ch.featId).toLowerCase();
            if (fId === 'habil') {
              featSkillBonusPoints += 3;
            } else if (fId === 'experto_habilidades' && !ch.skillExpertProficiency) {
              featSkillBonusPoints += 1;
            }
          }
        });

      // Si es multiclase secundaria, comprobar si otorga puntos de habilidad adicionales según reglas D&D 5.5
      if (cIdx > 0 && DND55_MULTICLASS_RULES?.proficienciesGained?.[c.classId]) {
        const mcRules = DND55_MULTICLASS_RULES.proficienciesGained[c.classId];
        if (mcRules.skillsCount) {
          multiclassSkillBonusPoints += mcRules.skillsCount;
        }
      }
    });

    return {
      fixedSkillsMap,
      overlaps,
      overlapBonusPoints: overlaps.length,
      featSkillBonusPoints,
      multiclassSkillBonusPoints
    };
  }

  renderStep5() {
    this.syncWizardClassState();
    const classes = DND55_CLASSES;
    const charClasses = getCharacterClasses(this.wizardState);
    const primaryEntry = charClasses[0] || { classId: 'guerrero', level: 1, subclassId: '' };
    const currentClass = classes.find(c => c.id === primaryEntry.classId) || classes[0];
    const classEquip = getClassStartingEquipment(currentClass.id);

    const { fixedSkillsMap, overlaps, overlapBonusPoints, featSkillBonusPoints, multiclassSkillBonusPoints } = this.getFixedSkillsAndOverlaps();
    const baseClassPoints = currentClass.skillChoicesCount || 2;
    const totalSelectablePoints = baseClassPoints + overlapBonusPoints + featSkillBonusPoints + (multiclassSkillBonusPoints || 0);

    // Limpiar chosenClassSkills de cualquier habilidad que ya esté fija por trasfondo/especie/dote
    if (!Array.isArray(this.wizardState.chosenClassSkills)) {
      this.wizardState.chosenClassSkills = [];
    }
    this.wizardState.chosenClassSkills = this.wizardState.chosenClassSkills.filter(sk => !fixedSkillsMap.has(sk));

    const selectedClassSkillsCount = this.wizardState.chosenClassSkills.length;
    const remainingSkillPoints = Math.max(0, totalSelectablePoints - selectedClassSkillsCount);

    // Idiomas (Requisito 4.4): Común + 2 idiomas adicionales en D&D 5.5 (o más si Explorador/Pícaro/Dracónido)
    if (!Array.isArray(this.wizardState.languages) || this.wizardState.languages.length === 0) {
      this.wizardState.languages = ['Común', 'Élfico', 'Enano'];
    }
    if (Array.isArray(this.wizardState.inventory) && this.wizardState.inventory.length > 0) {
      this.wizardState.startingEquipmentMode = 'keep';
    } else {
      this.wizardState.startingEquipmentMode = 'package';
    }
    if (!this.wizardState.languages.includes('Común')) {
      this.wizardState.languages.unshift('Común');
    }

    const secondaryClasses = charClasses.slice(1);
    const availableSecondaryClasses = classes.filter(c => !charClasses.some(cc => cc.classId === c.id));

    const allFeatureChoices = [];
    charClasses.forEach(c => {
      const choices = getClassFeatureChoices(c.classId, c.level || 1);
      choices.forEach(ch => {
        allFeatureChoices.push({
          ...ch,
          className: getClassName(c.classId)
        });
      });
    });

    // Estilos de Combate disponibles según clases y niveles (PHB 2024: Guerrero Nv 1, Paladín Nv 2, Explorador Nv 2, Campeón Nv 7)
    const fightingStyleSlots = [];
    charClasses.forEach(c => {
      const lvl = c.level || 1;
      const cName = getClassName(c.classId);
      if (c.classId === 'guerrero' && lvl >= 1) {
        fightingStyleSlots.push({
          classId: c.classId,
          slotKey: `${c.classId}_1`,
          title: `Estilo de Combate: ${cName} (Nivel 1)`,
          description: `Dote de Estilo de Batalla oficial de Guerrero (PHB 2024).`
        });
        if (lvl >= 7 && (c.subclassId === 'campeon' || this.wizardState.subclassId === 'campeon')) {
          fightingStyleSlots.push({
            classId: c.classId,
            slotKey: `${c.classId}_campeon_7`,
            title: `Estilo de Combate Adicional: ${cName} Campeón (Nivel 7)`,
            description: `Dote de Estilo de Batalla adicional del arquetipo Campeón.`
          });
        }
      } else if (c.classId === 'paladin' && lvl >= 2) {
        fightingStyleSlots.push({
          classId: c.classId,
          slotKey: `${c.classId}_2`,
          title: `Estilo de Combate: ${cName} (Nivel 2)`,
          description: `Dote de Estilo de Batalla oficial de Paladín (PHB 2024).`
        });
      } else if (c.classId === 'explorador' && lvl >= 2) {
        fightingStyleSlots.push({
          classId: c.classId,
          slotKey: `${c.classId}_2`,
          title: `Estilo de Combate: ${cName} (Nivel 2)`,
          description: `Dote de Estilo de Batalla oficial de Explorador (PHB 2024).`
        });
      }
    });

    const proficientSkills = Array.from(new Set([
      ...Array.from(fixedSkillsMap.keys()),
      ...(this.wizardState.chosenClassSkills || [])
    ])).sort((a, b) => a.localeCompare(b, 'es'));

    const maxExpertise = getMaxAllowedExpertiseCount(this.wizardState);
    if (!Array.isArray(this.wizardState.expertiseSkills)) {
      this.wizardState.expertiseSkills = [];
    }
    this.wizardState.expertiseSkills = this.wizardState.expertiseSkills.filter(sk => proficientSkills.includes(sk));
    const selectedExpertiseCount = this.wizardState.expertiseSkills.length;
    const remainingExpertiseCount = Math.max(0, maxExpertise - selectedExpertiseCount);

    return `
      <div class="row g-3">
        <!-- Columna Izquierda: Clase Principal, Multiclases y Equipo -->
        <div class="col-lg-5 col-md-6">
          <!-- 1. Clase Principal (Nivel 1) -->
          <div class="p-3 rounded bg-dark border border-warning mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label class="form-label text-warning fw-bold m-0">Clase Principal (Nivel 1 Inicial)</label>
              <span class="badge bg-warning text-dark">🔒 Salvaciones de Origen</span>
            </div>
            <div class="row g-2 align-items-center">
              <div class="col-8">
                <select id="w-class-select" class="form-select bg-black border-secondary text-light">
                  ${classes.map(c => `
                    <option value="${c.id}" ${primaryEntry.classId === c.id ? 'selected' : ''}>${c.name} (d${c.hitDie})</option>
                  `).join('')}
                </select>
              </div>
              <div class="col-4">
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-dark border-secondary text-secondary">Nv</span>
                  <input type="number" id="w-primary-class-level" class="form-control bg-black border-secondary text-light text-center fw-bold" value="${primaryEntry.level || 1}" min="1" max="20">
                </div>
              </div>
            </div>
            <div class="text-secondary small mt-2">
              Dado de Golpe: <strong class="text-light">d${currentClass.hitDie}</strong> &bull; 
              Salvaciones con competencia: <strong class="text-warning">${currentClass.savingThrows.map(st => getAbilityShortName(st)).join(', ')}</strong>
            </div>
            <div class="alert alert-dark border-secondary py-1 px-2 small mt-2 mb-0 text-muted" style="font-size: 0.72rem;">
              ⚖️ <em>Regla Oficial D&amp;D 5.5:</em> Las competencias en tiradas de salvación se heredan <strong>únicamente</strong> de la clase inicial elegida en Nivel 1.
            </div>
          </div>

          <!-- 2. Multiclases Secundarias -->
          <div class="p-3 rounded bg-dark border border-secondary mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label class="form-label text-warning fw-bold m-0">Multiclase Secundaria (D&amp;D 5.5)</label>
              ${availableSecondaryClasses.length > 0 ? `
                <button type="button" id="btn-add-multiclass" class="btn btn-outline-warning btn-sm py-0 px-2">
                  + Añadir Clase
                </button>
              ` : ''}
            </div>

            ${secondaryClasses.length === 0 ? `
              <div class="text-secondary small">
                Sin multiclases secundarias. Puedes pulsar <em>"+ Añadir Clase"</em> para crear un personaje multiclase con progresión de niveles combinados y prerrequisitos D&amp;D 5.5.
              </div>
            ` : `
              <div class="d-flex flex-column gap-2">
                ${secondaryClasses.map((sc, scIdx) => {
                  const actualIdx = scIdx + 1;
                  const scDef = classes.find(c => c.id === sc.classId) || classes[0];
                  const prereq = checkMulticlassPrerequisites(this.wizardState, sc.classId);
                  const mcRules = DND55_MULTICLASS_RULES?.proficienciesGained?.[sc.classId] || {};

                  return `
                    <div class="p-2 rounded bg-black bg-opacity-50 border border-secondary multiclass-row" data-index="${actualIdx}">
                      <div class="d-flex justify-content-between align-items-center gap-2 mb-1">
                        <select class="form-select form-select-sm bg-dark border-secondary text-light w-multiclass-select" data-index="${actualIdx}">
                          <option value="${sc.classId}">${scDef.name} (d${scDef.hitDie})</option>
                          ${availableSecondaryClasses.map(ac => `
                            <option value="${ac.id}">${ac.name} (d${ac.hitDie})</option>
                          `).join('')}
                        </select>
                        <div class="input-group input-group-sm" style="width: 100px;">
                          <span class="input-group-text bg-dark border-secondary text-secondary">Nv</span>
                          <input type="number" class="form-control bg-dark border-secondary text-light text-center fw-bold w-multiclass-level" data-index="${actualIdx}" value="${sc.level || 1}" min="1" max="20">
                        </div>
                        <button type="button" class="btn btn-outline-danger btn-sm py-0 px-2 btn-remove-multiclass" data-index="${actualIdx}" title="Eliminar multiclase">
                          &times;
                        </button>
                      </div>
                      <div class="d-flex justify-content-between align-items-center gap-1 mt-1">
                        <span class="badge ${prereq.valid ? 'bg-success' : 'bg-danger'}" style="font-size: 0.65rem;" title="${escapeHtml(prereq.reason || '')}">
                          ${prereq.valid ? '✓ Requisito 13+ OK' : `⚠️ ${escapeHtml(prereq.reason || 'Requisito no cumplido')}`}
                        </span>
                        <span class="text-secondary" style="font-size: 0.68rem;">
                          ${escapeHtml(mcRules.summary || 'Competencias multiclase')}
                        </span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}

            <div class="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-secondary text-info small">
              <span><strong>Título Combinado:</strong> ${escapeHtml(getCharacterFullClassTitle(this.wizardState))}</span>
              <span class="badge bg-primary">Nivel Total: ${this.wizardState.level}</span>
            </div>
          </div>

          <!-- Estilo de combate si aplica (Clase principal o Multiclase: Guerrero 1, Paladín 2, Explorador 2, Campeón 7) -->
          ${fightingStyleSlots.length > 0 ? `
            <div class="p-3 rounded bg-dark border border-secondary mb-3">
              <label class="form-label text-warning fw-bold mb-2 d-block">
                ⚔️ Estilos de Combate (Dotes de Estilo de Batalla PHB 2024)
              </label>
              ${fightingStyleSlots.map((slot, sIdx) => {
                const curVal = this.wizardState.fightingStylesBySlot?.[slot.slotKey] ||
                               (sIdx === 0 ? (this.wizardState.fightingStyle || this.wizardState.fightingStyles?.[0]) : this.wizardState.fightingStyles?.[sIdx]) ||
                               DND55_FIGHTING_STYLES[sIdx % DND55_FIGHTING_STYLES.length]?.id;
                return `
                  <div class="mb-2">
                    <label class="form-label small text-info fw-bold mb-1">${escapeHtml(slot.title)}</label>
                    <div class="small text-muted mb-1">${escapeHtml(slot.description)}</div>
                    <select class="form-select bg-dark border-secondary text-light w-fighting-style-select" data-slot-key="${slot.slotKey}">
                      ${DND55_FIGHTING_STYLES.map(fs => `
                        <option value="${fs.id}" ${(curVal === fs.id || curVal === fs.legacyId) ? 'selected' : ''}>${fs.name} - ${fs.description}</option>
                      `).join('')}
                    </select>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}

          <!-- Decisiones de Rasgos de Clase (D&D 5.5: Orden Divina, Orden Primigenia, Invocación de Pacto, etc.) -->
          ${allFeatureChoices.length > 0 ? `
            <div class="p-3 rounded bg-dark border border-secondary mb-3">
              <label class="form-label text-warning fw-bold mb-2 d-block">
                ⚔️ Elección de Rasgos de Clase (D&amp;D 5.5)
              </label>
              ${allFeatureChoices.map(ch => {
                const curVal = this.wizardState.classFeatureChoices?.[ch.featureKey] || ch.options[0]?.id;
                return `
                  <div class="mb-2">
                    <label class="form-label small text-info fw-bold mb-1">
                      ${escapeHtml(ch.featureName)} (${escapeHtml(ch.className)}):
                    </label>
                    <select class="form-select form-select-sm bg-black border-secondary text-warning fw-bold w-class-feature-choice" data-feature-key="${escapeHtml(ch.featureKey)}">
                      ${ch.options.map(opt => `
                        <option value="${opt.id}" ${curVal === opt.id ? 'selected' : ''}>
                          ${escapeHtml(opt.name)} - ${escapeHtml(opt.description)}
                        </option>
                      `).join('')}
                    </select>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}

          <!-- Herramientas de Clase (D&D 5.5) -->
          ${(currentClass.toolProficiencies?.length > 0 || (currentClass.toolChoicesCount || 0) > 0) ? `
            <div class="p-3 rounded bg-dark border border-secondary mb-3">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="form-label text-warning fw-bold m-0">🛠️ Herramientas de Clase (${escapeHtml(currentClass.name)})</label>
                <span class="badge bg-warning text-dark">D&amp;D 5.5</span>
              </div>
              <div class="small text-secondary mb-2">
                ${currentClass.toolChoicesDescription || `Competencias otorgadas por ${escapeHtml(currentClass.name)}.`}
              </div>

              ${(currentClass.toolProficiencies || []).map(t => `
                <div class="d-flex align-items-center gap-2 mb-2 p-1 px-2 rounded bg-black bg-opacity-40 border border-secondary">
                  <span class="badge bg-warning text-dark fw-bold">🔒 Fija</span>
                  <span class="text-light small fw-bold">${escapeHtml(t)}</span>
                  <span class="text-secondary small ms-auto">Otorgada por la clase</span>
                </div>
              `).join('')}

              ${(currentClass.toolChoicesCount > 0) ? `
                <div class="d-flex flex-column gap-2 mt-2">
                  ${Array.from({ length: currentClass.toolChoicesCount }).map((_, tcIdx) => {
                    const pool = currentClass.toolChoicesType === 'instrument'
                      ? [
                          "Instrumento musical (Laúd)",
                          "Instrumento musical (Flauta)",
                          "Instrumento musical (Lira)",
                          "Instrumento musical (Tambor)",
                          "Instrumento musical (Violín)",
                          "Instrumento musical (Gaita)",
                          "Instrumento musical (Cuerno)",
                          "Instrumento musical (Flauta de pan)",
                          "Instrumento musical (Dulzaina)",
                          "Instrumento musical (Viola)"
                        ]
                      : DND55_TOOL_PROFICIENCIES.filter(t => t.startsWith('Herramientas de') || t.startsWith('Suministros de') || t.startsWith('Útiles de') || t.startsWith('Instrumento musical'));
                    const selectedVal = (this.wizardState.classTools || [])[tcIdx] || pool[tcIdx % pool.length];
                    return `
                      <div>
                        <label class="form-label small text-info fw-bold mb-1">
                          Herramienta / Instrumento ${tcIdx + 1}:
                        </label>
                        <select class="form-select form-select-sm bg-black border-secondary text-light w-class-tool-select" data-tool-index="${tcIdx}">
                          ${pool.map(opt => `
                            <option value="${escapeHtml(opt)}" ${selectedVal === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>
                          `).join('')}
                        </select>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Equipo Inicial de Clase (D&D 5.5) -->
          <div class="p-3 rounded bg-dark border border-secondary mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label class="form-label text-warning fw-bold m-0">📦 Equipo Inicial (${escapeHtml(currentClass.name)})</label>
              <span class="badge bg-warning text-dark">PHB 2024</span>
            </div>

            ${this.isEditing ? `
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="w-starting-equipment-mode" id="w-equip-mode-keep" value="keep" ${this.wizardState.startingEquipmentMode === 'keep' || !this.wizardState.startingEquipmentMode ? 'checked' : ''}>
                <label class="form-check-label text-light fw-bold small" for="w-equip-mode-keep">
                  🔒 Conservar inventario actual (${(this.wizardState.inventory || []).length} objetos en mochila)
                </label>
                <div class="text-secondary small ps-4">Conserva todas las armas, armaduras y equipo previamente conseguidos.</div>
              </div>
            ` : ''}

            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="w-starting-equipment-mode" id="w-equip-mode-package" value="package" ${(!this.isEditing && (this.wizardState.startingEquipmentMode === 'package' || !this.wizardState.startingEquipmentMode)) || (this.isEditing && this.wizardState.startingEquipmentMode === 'package') ? 'checked' : ''}>
              <label class="form-check-label text-warning fw-bold small" for="w-equip-mode-package">
                Opción A: Paquete de Equipo de ${escapeHtml(currentClass.name)} (+ ${classEquip?.goldRemaining ?? 10} PO)
              </label>
              <div class="text-secondary small ps-4">
                ${escapeHtml(classEquip?.packageDescription || 'Equipo reglamentario de la clase.')}
              </div>
            </div>

            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="w-starting-equipment-mode" id="w-equip-mode-gold" value="gold" ${this.wizardState.startingEquipmentMode === 'gold' ? 'checked' : ''}>
              <label class="form-check-label text-warning fw-bold small" for="w-equip-mode-gold">
                Opción B: Piezas de Oro Iniciales (${classEquip?.gold ?? 100} PO)
              </label>
              <div class="text-secondary small ps-4">
                Recibe <strong>${classEquip?.gold ?? 100} PO</strong> en lugar de objetos para adquirir tu propio equipo.
              </div>
            </div>

            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="w-starting-equipment-mode" id="w-equip-mode-custom" value="custom" ${this.wizardState.startingEquipmentMode === 'custom' ? 'checked' : ''}>
              <label class="form-check-label text-light fw-bold small" for="w-equip-mode-custom">
                Opción C: Selección Manual Libre
              </label>
              <div class="text-secondary small ps-4">
                Elige libremente tu armadura y arma en los selectores inferiores.
              </div>
            </div>

            <!-- Armadura Inicial -->
            <div class="mt-3 border-top border-secondary pt-2">
              <label class="form-label small text-info fw-bold mb-1">Armadura Equipada</label>
              <select id="w-armor-select" class="form-select form-select-sm bg-black border-secondary text-light">
                ${DND55_ARMORS.filter(a => a.category !== 'shield').map(a => `
                  <option value="${a.id}" ${this.wizardState.armorId === a.id ? 'selected' : ''}>${a.name} (CA ${a.baseAc})</option>
                `).join('')}
              </select>
              <div class="form-check mt-1">
                <input class="form-check-input" type="checkbox" id="w-shield-check" ${this.wizardState.hasShield ? 'checked' : ''}>
                <label class="form-check-label text-light small" for="w-shield-check">Empuñar Escudo (+2 CA)</label>
              </div>
            </div>

            <!-- Arma Principal -->
            <div class="mt-2">
              <label class="form-label small text-info fw-bold mb-1">Arma Principal Equipada</label>
              <select id="w-weapon-select" class="form-select form-select-sm bg-black border-secondary text-light">
                ${DND55_WEAPONS.map(w => `
                  <option value="${w.id}" ${(this.wizardState.equippedWeapons || [])[0] === w.id ? 'selected' : ''}>
                    ${w.name} (${w.damage} ${w.damageType} - Maestría: ${w.masteryProperty || 'Ninguna'})
                  </option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Habilidades (4.1 y 4.2: Fijas bloqueadas + Regla de Solapamiento D&D 5.5 mostrando las 18 habilidades) -->
        <div class="col-lg-7 col-md-6">
          <div class="p-3 rounded bg-dark border border-secondary mb-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
              <label class="form-label text-warning fw-bold m-0">
                Competencia en Habilidades (Elige ${totalSelectablePoints} adicionales):
              </label>
              <span class="badge ${remainingSkillPoints === 0 ? 'bg-success' : 'bg-warning text-dark'}">
                Elegidas: ${selectedClassSkillsCount} / ${totalSelectablePoints} ${remainingSkillPoints > 0 ? `(Te quedan ${remainingSkillPoints} por elegir)` : '✓ Completado'}
              </span>
            </div>

            <div class="small text-secondary mb-2">
              Puntos base de ${escapeHtml(currentClass.name)}: <strong>${baseClassPoints}</strong>
              ${overlapBonusPoints > 0 ? ` &bull; <span class="text-info fw-bold">+${overlapBonusPoints} punto(s) libre(s) por Regla de Solapamiento D&amp;D 5.5</span>` : ''}
              ${featSkillBonusPoints > 0 ? ` &bull; <span class="text-warning fw-bold">+${featSkillBonusPoints} punto(s) libre(s) por Dote (Hábil/Experto)</span>` : ''}
              ${multiclassSkillBonusPoints > 0 ? ` &bull; <span class="text-success fw-bold">+${multiclassSkillBonusPoints} punto(s) por Multiclase</span>` : ''}
            </div>

            ${overlaps.length > 0 ? `
              <div class="alert alert-info py-1 px-2 small mb-2 border-info bg-black bg-opacity-50 text-info">
                🔄 <strong>Regla de Solapamiento D&amp;D 5.5 (PHB 2024):</strong> Se ha detectado competencia duplicada en 
                ${overlaps.map(o => `<strong>${escapeHtml(o.skill)}</strong> (${escapeHtml(o.sources)})`).join(', ')}. 
                Se ha añadido <strong>+${overlapBonusPoints} punto(s) adicional(es)</strong> y puedes elegir entre <strong>todas las 18 habilidades</strong>.
              </div>
            ` : ''}

            <div class="row g-2">
              ${DND55_SKILLS.map(skObj => {
                const sk = skObj.name;
                const abShort = getAbilityShortName(skObj.ability);
                const isFixed = fixedSkillsMap.has(sk);
                const fixedSource = fixedSkillsMap.get(sk) || '';
                const isClassSkill = (currentClass.availableSkills || []).includes(sk);
                const isCheckedByPlayer = !isFixed && (this.wizardState.chosenClassSkills || []).includes(sk);
                const isChecked = isFixed || isCheckedByPlayer;

                // Permitir cualquier habilidad si hay solapamiento o puntos de dote, o si es de la lista de clase
                const canSelect = !isFixed && (isCheckedByPlayer || selectedClassSkillsCount < totalSelectablePoints);

                return `
                  <div class="col-sm-6 col-xl-4">
                    <div class="p-1 px-2 rounded border ${isFixed ? 'border-warning bg-black bg-opacity-75' : isCheckedByPlayer ? 'border-info bg-info bg-opacity-10' : isClassSkill ? 'border-secondary bg-black bg-opacity-25' : 'border-dark bg-black bg-opacity-10'} d-flex align-items-center justify-content-between">
                      <div class="form-check m-0 text-truncate">
                        <input class="form-check-input ${isFixed ? 'check-fixed-skill' : 'check-class-skill'}" 
                               type="checkbox" 
                               value="${escapeHtml(sk)}" 
                               id="sk-${escapeHtml(sk)}" 
                               ${isChecked ? 'checked' : ''} 
                               ${isFixed || !canSelect ? 'disabled' : ''}>
                        <label class="form-check-label small ${isFixed ? 'text-warning fw-bold' : isCheckedByPlayer ? 'text-info fw-bold' : isClassSkill ? 'text-light' : 'text-secondary'}" for="sk-${escapeHtml(sk)}" title="${escapeHtml(fixedSource || skObj.description)}">
                          ${escapeHtml(sk)} <span class="text-muted" style="font-size: 0.68rem;">(${abShort})</span>
                        </label>
                      </div>
                      ${isFixed ? `
                        <span class="badge bg-warning text-dark ms-1" style="font-size: 0.6rem;" title="${escapeHtml(fixedSource)}">🔒 Fija</span>
                      ` : isClassSkill ? `
                        <span class="badge bg-dark border border-secondary text-warning ms-1" style="font-size: 0.6rem;">Clase</span>
                      ` : `
                        <span class="badge bg-dark text-muted ms-1" style="font-size: 0.58rem;">Libre</span>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Pericia en Habilidades (D&D 5.5: Pícaro, Bardo, Explorador, Dote Experto) -->
          ${maxExpertise > 0 ? `
            <div class="p-3 rounded bg-dark border border-warning mb-3">
              <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                <label class="form-label text-warning fw-bold m-0">
                  ⭐ Pericia en Habilidades (D&amp;D 5.5):
                </label>
                <span class="badge ${remainingExpertiseCount === 0 ? 'bg-success' : 'bg-warning text-dark'}">
                  Pericias: ${selectedExpertiseCount} / ${maxExpertise} ${remainingExpertiseCount > 0 ? `(Te quedan ${remainingExpertiseCount} por elegir)` : '✓ Completado'}
                </span>
              </div>
              <div class="small text-secondary mb-2">
                Duplica el bonificador de competencia (+${getProficiencyBonus(this.wizardState.level) * 2} total) en las habilidades con competencia elegidas.
              </div>
              ${proficientSkills.length === 0 ? `
                <div class="text-muted small">Selecciona primero competencias en habilidades para poder aplicar pericias.</div>
              ` : `
                <div class="row g-2">
                  ${proficientSkills.map(sk => {
                    const isExp = this.wizardState.expertiseSkills.includes(sk);
                    const canSelectExp = isExp || selectedExpertiseCount < maxExpertise;
                    return `
                      <div class="col-sm-6 col-xl-4">
                        <div class="p-1 px-2 rounded border ${isExp ? 'border-warning bg-warning bg-opacity-10' : 'border-secondary bg-black bg-opacity-25'} d-flex align-items-center justify-content-between">
                          <div class="form-check m-0 text-truncate">
                            <input class="form-check-input check-wizard-expertise" 
                                   type="checkbox" 
                                   value="${escapeHtml(sk)}" 
                                   id="exp-${escapeHtml(sk)}" 
                                   ${isExp ? 'checked' : ''} 
                                   ${!canSelectExp ? 'disabled' : ''}>
                            <label class="form-check-label small ${isExp ? 'text-warning fw-bold' : 'text-light'}" for="exp-${escapeHtml(sk)}">
                              ${escapeHtml(sk)}
                            </label>
                          </div>
                          ${isExp ? `<span class="badge bg-warning text-dark ms-1" style="font-size: 0.6rem;">Pericia (2x)</span>` : ''}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              `}
            </div>
          ` : ''}

          <!-- Requisito 4.4: Elección de Idiomas en el Paso de Habilidades -->
          <div class="p-3 rounded bg-dark border border-secondary">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
              <label class="form-label text-warning fw-bold m-0">
                🗣️ Elección de Idiomas Conocidos (PHB 2024: Común + 2 adicionales):
              </label>
              <span class="badge bg-info text-dark">
                Idiomas seleccionados: ${(this.wizardState.languages || []).length}
              </span>
            </div>
            <div class="row g-2">
              ${(DND55_STANDARD_LANGUAGES || []).map(lang => {
                const isCommon = lang === 'Común';
                const isLangChecked = isCommon || (this.wizardState.languages || []).includes(lang);
                return `
                  <div class="col-6 col-sm-4 col-md-3">
                    <div class="p-1 px-2 rounded border ${isCommon ? 'border-warning bg-black bg-opacity-75' : isLangChecked ? 'border-info bg-info bg-opacity-10' : 'border-secondary bg-black bg-opacity-25'}">
                      <div class="form-check m-0">
                        <input class="form-check-input ${isCommon ? '' : 'check-wizard-language'}" 
                               type="checkbox" 
                               value="${escapeHtml(lang)}" 
                               id="lang-${escapeHtml(lang)}" 
                               ${isLangChecked ? 'checked' : ''} 
                               ${isCommon ? 'disabled' : ''}>
                        <label class="form-check-label small ${isCommon ? 'text-warning fw-bold' : isLangChecked ? 'text-info fw-semibold' : 'text-light'}" for="lang-${escapeHtml(lang)}">
                          ${escapeHtml(lang)} ${isCommon ? '🔒' : ''}
                        </label>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // PASO 6: SUBCLASE Y DOTES DE NIVEL 4+
  // ==========================================
  renderStep6() {
    this.syncWizardClassState();
    const charClasses = getCharacterClasses(this.wizardState);

    const sortByName = (arr) => arr.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
    const featGroups = [
      { label: 'Dotes Generales (PHB 2024)', items: sortByName(DND55_ALL_GENERAL_FEATS.filter(f => f.featGroup === 'general' || !f.featGroup)) },
      { label: 'Dotes de Estilo de Batalla / Combate (PHB 2024)', items: sortByName(DND55_ALL_GENERAL_FEATS.filter(f => f.featGroup === 'estilo_combate')) },
      { label: 'Dotes de Faerûn y Regionales', items: sortByName(DND55_ALL_GENERAL_FEATS.filter(f => f.featGroup === 'faerun')) },
      { label: 'Dotes Épicas / Dones Épicos (Nivel 19+)', items: sortByName(DND55_ALL_GENERAL_FEATS.filter(f => f.featGroup === 'epica')) },
      { label: 'Dotes de Origen (PHB 2024)', items: sortByName(DND55_ALL_ORIGIN_FEATS.filter(f => f.featGroup !== 'faerun_origen')) },
      { label: 'Dotes de Origen (Faerûn)', items: sortByName(DND55_ALL_ORIGIN_FEATS.filter(f => f.featGroup === 'faerun_origen')) }
    ].filter(g => g.items.length > 0);

    const abilityOptions = [
      { key: 'str', label: 'Fuerza (FUE)' },
      { key: 'dex', label: 'Destreza (DES)' },
      { key: 'con', label: 'Constitución (CON)' },
      { key: 'int', label: 'Inteligencia (INT)' },
      { key: 'wis', label: 'Sabiduría (SAB)' },
      { key: 'cha', label: 'Carisma (CAR)' }
    ];

    return `
      <div>
        <div class="alert alert-dark border-secondary small mb-4 text-secondary d-flex justify-content-between align-items-center">
          <div>
            📜 <strong>Especialización y Progresión:</strong> Subclases (Nivel 3 por clase) y Dotes/ASIs (Niveles por clase: 4, 8, 12, 16, 19 + adicionales de Guerrero y Pícaro).
          </div>
          <span class="badge bg-warning text-dark">${escapeHtml(getCharacterFullClassTitle(this.wizardState))}</span>
        </div>

        ${charClasses.map((c, cIdx) => {
          const classDef = DND55_CLASSES.find(cls => cls.id === c.classId) || { id: c.classId, name: c.classId, hitDie: 8 };
          const isLevel3Plus = (c.level || 1) >= 3;
          const subclasses = DND55_ALL_48_SUBCLASSES.filter(sc => sc.classId === c.classId);
          const currentSubclassId = c.subclassId || (cIdx === 0 ? this.wizardState.subclassId : '') || '';
          const allAsiLevels = getCharacterAsiLevels(c.classId);
          const unlockedAsiLevels = allAsiLevels.filter(asi => (c.level || 1) >= asi.lvl);

          return `
            <div class="p-3 rounded bg-dark border border-secondary mb-4">
              <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-2 border-bottom border-secondary">
                <h5 class="text-warning mb-0 d-flex align-items-center gap-2">
                  <span>${cIdx === 0 ? '👑' : '⚔️'}</span>
                  <span>${classDef.name}</span>
                  <span class="badge ${cIdx === 0 ? 'bg-warning text-dark' : 'bg-secondary'} fs-6">Nivel ${c.level || 1}</span>
                  ${cIdx === 0 ? '<span class="badge bg-black border border-warning text-warning small">Clase Inicial</span>' : ''}
                </h5>
                <span class="text-secondary small">Dado de Golpe: d${classDef.hitDie}</span>
              </div>

              <!-- Subclase de esta clase -->
              ${isLevel3Plus ? `
                <div class="mb-3 p-3 rounded bg-black bg-opacity-40 border border-secondary">
                  <label class="form-label text-warning fw-bold mb-1">Subclase de ${classDef.name} (Desbloqueada en Nivel 3)</label>
                  <select class="form-select bg-dark border-secondary text-light w-class-subclass-select" data-class-id="${c.classId}">
                    <option value="">-- Elige una subclase de ${classDef.name} --</option>
                    ${subclasses.map(sc => `
                      <option value="${sc.id}" ${currentSubclassId === sc.id ? 'selected' : ''}>${sc.name}</option>
                    `).join('')}
                  </select>
                  ${currentSubclassId ? `
                    <div class="mt-2 p-2 rounded bg-dark border border-secondary text-secondary small">
                      ${escapeHtml(subclasses.find(sc => sc.id === currentSubclassId)?.description || '')}
                    </div>
                  ` : ''}
                </div>
              ` : `
                <div class="alert alert-dark border-secondary text-secondary small mb-3">
                  ℹ️ La subclase de <strong>${classDef.name}</strong> se desbloquea al alcanzar <strong>Nivel 3</strong> en esta clase (Nivel actual en ${classDef.name}: ${c.level || 1}).
                </div>
              `}

              <!-- Progresión de Dotes / ASIs de esta clase -->
              <div class="p-2 px-3 rounded bg-black bg-opacity-50 border border-secondary text-secondary small mb-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span>
                  <strong class="text-warning">Dotes / ASI (${classDef.name}):</strong> 
                  Niveles ${allAsiLevels.map(a => a.isClassBonus ? `<span class="badge bg-warning text-dark">${a.lvl} ★ Extra</span>` : `<span class="badge bg-secondary">${a.lvl}</span>`).join(' ')}
                </span>
                <span class="text-info">${unlockedAsiLevels.length} desbloqueada(s) para esta clase</span>
              </div>

              ${unlockedAsiLevels.length === 0 ? `
                <div class="text-secondary small italic">
                  Las Mejoras de Característica (ASI) o Dotes para ${classDef.name} se obtienen a partir de Nivel 4 en esta clase.
                </div>
              ` : unlockedAsiLevels.map(asi => {
                const choiceKey = asi.key;
                const cardKey = `${c.classId}_${asi.key}`;
                const currentChoice = this.wizardState.classAsiChoices?.[c.classId]?.[choiceKey] ||
                  this.wizardState[cardKey] ||
                  (cIdx === 0 ? this.wizardState[choiceKey] : null);

                const isAsiMode = !currentChoice || currentChoice.type === 'asi';
                const currentFeatId = (!isAsiMode && currentChoice) ? (currentChoice.featId || currentChoice) : '';
                const featDef = currentFeatId ? getFeatById(currentFeatId) : null;

                const asiSubMode = currentChoice?.asiMode || 'plus2';
                const asiPlus2Ab = currentChoice?.asiPlusTwoAbility || 'str';
                const asiPlus1AbA = currentChoice?.asiPlusOneAbilities?.[0] || 'str';
                const asiPlus1AbB = currentChoice?.asiPlusOneAbilities?.[1] || 'con';

                const allowedFeatAbs = Array.isArray(featDef?.allowedAbilities) ? featDef.allowedAbilities : ['str', 'dex', 'con', 'int', 'wis', 'cha'];
                const allowedFeatAbilityOptions = abilityOptions.filter(ab => allowedFeatAbs.includes(ab.key));
                const rawFeatChosenAb = currentChoice?.chosenAbility || (currentChoice?.chosenAbilityBonus ? Object.keys(currentChoice.chosenAbilityBonus)[0] : '');
                const featChosenAb = allowedFeatAbs.includes(rawFeatChosenAb) ? rawFeatChosenAb : (allowedFeatAbs[0] || '');

                return `
                  <div class="p-3 rounded bg-black bg-opacity-40 border ${asi.isClassBonus ? 'border-warning' : 'border-secondary'} mb-3" data-asi-card="${cardKey}">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <h6 class="text-warning mb-0">
                        Mejora de Característica o Dote — ${asi.label} (${classDef.name})
                      </h6>
                      ${asi.isClassBonus ? `<span class="badge bg-warning text-dark">★ Extra de ${classDef.name}</span>` : ''}
                    </div>
                    <select class="form-select bg-dark border-secondary text-light feat-level-select mb-2" data-class-id="${c.classId}" data-choice-key="${asi.key}">
                      <option value="__asi__" ${isAsiMode ? 'selected' : ''}>+2 a una característica / +1 a dos características (Mejora de Característica - ASI)</option>
                      ${featGroups.map(group => `
                        <optgroup label="${escapeHtml(group.label)}">
                          ${group.items.map(gf => `
                            <option value="${gf.id}" ${currentFeatId === gf.id || currentFeatId === gf.name ? 'selected' : ''}>${gf.name}</option>
                          `).join('')}
                        </optgroup>
                      `).join('')}
                    </select>

                    ${isAsiMode ? `
                      <div class="row g-2 mt-1 p-2 rounded bg-black bg-opacity-40 border border-secondary align-items-end">
                        <div class="col-md-4">
                          <label class="form-label text-secondary small mb-1">Tipo de Mejora (ASI)</label>
                          <select class="form-select form-select-sm bg-dark border-secondary text-light asi-mode-select" data-class-id="${c.classId}" data-choice-key="${asi.key}">
                            <option value="plus2" ${asiSubMode === 'plus2' ? 'selected' : ''}>+2 a una característica</option>
                            <option value="plus1plus1" ${asiSubMode === 'plus1plus1' ? 'selected' : ''}>+1 a dos características</option>
                          </select>
                        </div>
                        ${asiSubMode === 'plus2' ? `
                          <div class="col-md-8">
                            <label class="form-label text-secondary small mb-1">Característica (+2)</label>
                            <select class="form-select form-select-sm bg-dark border-secondary text-warning fw-bold asi-plus2-select" data-class-id="${c.classId}" data-choice-key="${asi.key}">
                              ${abilityOptions.map(ab => `<option value="${ab.key}" ${asiPlus2Ab === ab.key ? 'selected' : ''}>+2 ${ab.label}</option>`).join('')}
                            </select>
                          </div>
                        ` : `
                          <div class="col-md-4">
                            <label class="form-label text-secondary small mb-1">1ª Característica (+1)</label>
                            <select class="form-select form-select-sm bg-dark border-secondary text-warning fw-bold asi-plus1a-select" data-class-id="${c.classId}" data-choice-key="${asi.key}">
                              ${abilityOptions.map(ab => `<option value="${ab.key}" ${asiPlus1AbA === ab.key ? 'selected' : ''}>+1 ${ab.label}</option>`).join('')}
                            </select>
                          </div>
                          <div class="col-md-4">
                            <label class="form-label text-secondary small mb-1">2ª Característica (+1)</label>
                            <select class="form-select form-select-sm bg-dark border-secondary text-warning fw-bold asi-plus1b-select" data-class-id="${c.classId}" data-choice-key="${asi.key}">
                              ${abilityOptions.map(ab => `<option value="${ab.key}" ${asiPlus1AbB === ab.key ? 'selected' : ''}>+1 ${ab.label}</option>`).join('')}
                            </select>
                          </div>
                        `}
                      </div>
                    ` : `
                      <div class="row g-2 mt-1 p-2 rounded bg-black bg-opacity-40 border border-secondary align-items-center">
                        <div class="col-md-5">
                          <label class="form-label text-secondary small mb-1">
                            Bono de Característica (${allowedFeatAbilityOptions.length > 0 ? `Permitidas: ${allowedFeatAbs.map(a => getAbilityShortName(a)).join(' / ')}` : 'Dote de Origen'})
                          </label>
                          ${allowedFeatAbilityOptions.length > 0 ? `
                            <select class="form-select form-select-sm bg-dark border-secondary text-warning fw-bold feat-ability-select" data-class-id="${c.classId}" data-choice-key="${asi.key}">
                              ${allowedFeatAbilityOptions.map(ab => `<option value="${ab.key}" ${featChosenAb === ab.key ? 'selected' : ''}>+1 ${ab.label}</option>`).join('')}
                            </select>
                          ` : `
                            <select class="form-select form-select-sm bg-dark border-secondary text-secondary feat-ability-select" data-class-id="${c.classId}" data-choice-key="${asi.key}" disabled>
                              <option value="" selected>Sin bono de característica (Dote de Origen)</option>
                            </select>
                          `}
                        </div>
                        <div class="col-md-7 small text-light">
                          <strong class="text-warning">Efecto de la dote:</strong> ${escapeHtml(featDef?.description || '')}
                        </div>
                      </div>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // ==========================================
  // PASO 7: RESUMEN Y CÁLCULOS
  // ==========================================
  renderStep7() {
    this.syncWizardClassState();
    const acInfo = calculateArmorClass(this.wizardState);
    const hpInfo = calculateHitPoints(this.wizardState);
    const initInfo = calculateInitiative(this.wizardState);
    const carryInfo = calculateCarryingCapacity(this.wizardState);
    const hdPool = getCharacterHitDicePool(this.wizardState);
    const fullClassTitle = getCharacterFullClassTitle(this.wizardState);
    const pb = getProficiencyBonus(this.wizardState.level);

    return `
      <div class="row g-3">
        <div class="col-md-3">
          <div class="p-3 rounded bg-dark border border-secondary text-center">
            <div class="text-secondary small">Clase de Armadura</div>
            <div class="display-5 fw-bold text-info">${acInfo.acDisplay || acInfo.ac}</div>
            <div class="text-secondary small text-truncate" title="${escapeHtml(acInfo.formula)}">${escapeHtml(acInfo.formula)}</div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="p-3 rounded bg-dark border border-secondary text-center">
            <div class="text-secondary small">Puntos de Golpe Máx.</div>
            <div class="display-5 fw-bold text-danger">${hpInfo.maxHp}</div>
            <div class="text-secondary small">Dados de Golpe: <strong class="text-light">${hdPool.summaryText}</strong></div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="p-3 rounded bg-dark border border-secondary text-center">
            <div class="text-secondary small">Iniciativa</div>
            <div class="display-5 fw-bold text-warning">${formatModifier(initInfo.bonus)}</div>
            <div class="text-secondary small">${initInfo.formula}</div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="p-3 rounded bg-dark border border-secondary text-center">
            <div class="text-secondary small">Capacidad de Carga</div>
            <div class="display-5 fw-bold text-success">${carryInfo.carryingCapacityKg} kg</div>
            <div class="text-secondary small">Empuje: ${carryInfo.pushDragLiftKg} kg</div>
          </div>
        </div>

        <div class="col-12 mt-4">
          <div class="p-3 rounded bg-dark border border-secondary">
            <h5 class="text-warning h6 mb-3">Resumen de Ficha Canónica:</h5>
            <div class="row g-2 small">
              <div class="col-sm-6"><strong>Nombre:</strong> ${escapeHtml(this.wizardState.name || 'Sin nombre')}</div>
              <div class="col-sm-6"><strong>Jugador:</strong> ${escapeHtml(this.wizardState.playerName || 'Anónimo')}</div>
              <div class="col-sm-6"><strong>Especie:</strong> ${escapeHtml(this.wizardState.speciesId)}</div>
              <div class="col-sm-6"><strong>Clase:</strong> <span class="text-warning fw-bold">${escapeHtml(fullClassTitle)}</span> (Nv Total ${this.wizardState.level})</div>
              <div class="col-sm-6"><strong>Trasfondo:</strong> ${escapeHtml(this.wizardState.backgroundId)}</div>
              <div class="col-sm-6"><strong>Dote de Origen:</strong> ${escapeHtml(this.wizardState.originFeat)}</div>
              <div class="col-sm-6"><strong>Bono Competencia (BC):</strong> +${pb}</div>
              <div class="col-sm-6"><strong>Armadura:</strong> ${escapeHtml(this.wizardState.armorId)} ${this.wizardState.hasShield ? '(con escudo)' : ''}</div>
              ${Array.isArray(this.wizardState.expertiseSkills) && this.wizardState.expertiseSkills.length > 0 ? `
                <div class="col-sm-6"><strong>Pericias (D&amp;D 5.5):</strong> <span class="text-warning fw-bold">${escapeHtml(this.wizardState.expertiseSkills.join(', '))}</span></div>
              ` : ''}
              ${this.isEditing && this.wizardState.inventory ? `
                <div class="col-12 mt-2 pt-2 border-top border-secondary text-secondary">
                  <strong>Inventario conservado:</strong> ${this.wizardState.inventory.length} objeto(s) &bull; 
                  <strong>Conjuros:</strong> ${(this.wizardState.spells || []).length} &bull; 
                  <strong>Rasgos especiales:</strong> ${(this.wizardState.specialAbilities || []).length}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getStepFocusableElements() {
    if (!this.container) return [];
    const content = this.container.querySelector('#wizard-step-content');
    if (!content) return [];
    const selector = 'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]):not([tabindex="-1"]), [tabindex="0"]';
    const all = Array.from(content.querySelectorAll(selector));
    return all.filter(el => {
      if (el.closest('.d-none')) return false;
      const style = window.getComputedStyle ? window.getComputedStyle(el) : null;
      if (style && (style.display === 'none' || style.visibility === 'hidden')) return false;
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    });
  }

  attachEventListeners() {
    if (!this.container) return;

    // Navegación por tabulación secuencial en el asistente: del último input pasa al botón avanzar
    const stepContent = this.container.querySelector('#wizard-step-content');
    if (stepContent) {
      stepContent.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
          const focusables = this.getStepFocusableElements();
          if (focusables.length > 0) {
            const lastFocusable = focusables[focusables.length - 1];
            if (e.target === lastFocusable || lastFocusable.contains(e.target)) {
              e.preventDefault();
              const nextBtn = this.container.querySelector('#btn-wizard-next') || this.container.querySelector('#btn-wizard-finish');
              if (nextBtn) {
                nextBtn.focus();
              }
            }
          }
        }
      });
    }

    const nextBtn = this.container.querySelector('#btn-wizard-next') || this.container.querySelector('#btn-wizard-finish');
    if (nextBtn) {
      nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && e.shiftKey) {
          const focusables = this.getStepFocusableElements();
          if (focusables.length > 0) {
            e.preventDefault();
            focusables[focusables.length - 1].focus();
          }
        }
      });
    }

    // Botón para salir del modo edición y crear nuevo personaje
    this.container.querySelector('#btn-wizard-exit-edit')?.addEventListener('click', async () => {
      const confirmed = await showConfirmModal({
        title: 'Crear Nuevo Personaje',
        message: '¿Deseas salir del modo de edición y comenzar a crear un personaje nuevo desde cero? Se descartarán los cambios no guardados.',
        confirmText: 'Crear Nuevo',
        cancelText: 'Seguir Editando',
        danger: true,
        icon: 'user-plus'
      });
      if (confirmed) {
        this.resetToNewCharacter();
      }
    });

    // Navegación por números de paso (escritorio y selector móvil)
    this.container.querySelectorAll('.btn-step-nav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.saveStepInputs();
        this.currentStep = parseInt(e.currentTarget.dataset.step, 10);
        this.render();
      });
    });

    this.container.querySelector('#w-mobile-step-select')?.addEventListener('change', (e) => {
      this.saveStepInputs();
      this.currentStep = parseInt(e.target.value, 10) || 1;
      this.render();
    });

    // Anterior / Siguiente
    this.container.querySelector('#btn-wizard-prev')?.addEventListener('click', () => {
      this.saveStepInputs();
      if (this.currentStep > 1) {
        this.currentStep--;
        this.render();
      }
    });

    this.container.querySelector('#btn-wizard-next')?.addEventListener('click', () => {
      this.saveStepInputs();
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.render();
      }
    });

    // Reiniciar o Cancelar Edición
    this.container.querySelector('#btn-wizard-cancel')?.addEventListener('click', async () => {
      if (this.isEditing) {
        const confirmed = await showConfirmModal({
          title: 'Cancelar Edición',
          message: `¿Deseas cancelar la edición de "${this.wizardState.name}" y volver a la Hoja de Personaje? Se descartarán los cambios no guardados.`,
          confirmText: 'Descartar Cambios',
          cancelText: 'Continuar Editando',
          danger: true,
          icon: 'alert-triangle'
        });
        if (confirmed) {
          this.isEditing = false;
          this.editingCharacterId = null;
          this.wizardState = this.getDefaultWizardState();
          this.currentStep = 1;
          const sheetTabBtn = document.getElementById('tab-sheet-btn');
          if (sheetTabBtn) sheetTabBtn.click();
        }
      } else {
        const confirmed = await showConfirmModal({
          title: 'Reiniciar Asistente',
          message: '¿Deseas reiniciar el asistente y borrar los datos no guardados del personaje?',
          confirmText: 'Reiniciar',
          cancelText: 'Cancelar',
          danger: true,
          icon: 'rotate-ccw'
        });
        if (confirmed) {
          this.wizardState = this.getDefaultWizardState();
          this.currentStep = 1;
          this.statGenMethod = 'standard';
          this.render();
        }
      }
    });

    // Finalizar y Guardar (tanto en paso final como mediante guardado rápido en edición)
    this.container.querySelector('#btn-wizard-finish')?.addEventListener('click', () => {
      this.finishAndSaveCharacter();
    });
    this.container.querySelector('#btn-wizard-quick-save')?.addEventListener('click', () => {
      this.finishAndSaveCharacter();
    });

    // Cambios dinámicos en Paso 2 (Especie)
    this.container.querySelector('#w-species-select')?.addEventListener('change', (e) => {
      this.wizardState.speciesId = e.target.value;
      this.wizardState.sublineageId = '';
      this.render();
    });

    this.container.querySelector('#w-sublineage-select')?.addEventListener('change', (e) => {
      this.wizardState.sublineageId = e.target.value;
    });

    this.container.querySelector('#w-human-skill')?.addEventListener('change', (e) => {
      this.wizardState.speciesSkillChoice = e.target.value;
    });

    this.container.querySelector('#w-human-origin-feat')?.addEventListener('change', (e) => {
      this.wizardState.speciesOriginFeat = e.target.value;
    });

    // Cambios dinámicos en Paso 3 (Trasfondo)
    this.container.querySelectorAll('.w-bg-tool-group').forEach(sel => {
      sel.addEventListener('change', () => {
        const groups = getBackgroundToolGroups(this.getEffectiveBackground());
        const g = groups[parseInt(sel.dataset.group, 10)];
        if (!g) return;
        let tools = (this.wizardState.tools || []).filter(t => !g.options.includes(t));
        if (sel.value) tools.push(sel.value);
        this.wizardState.tools = tools;
      });
    });
    this.container.querySelector('#w-bg-select')?.addEventListener('change', (e) => {
      this.wizardState.backgroundId = e.target.value;
      const bg = this.getEffectiveBackground();
      if (bg) {
        this.wizardState.originFeat = bg.originFeat;
        const allowed = Array.isArray(bg.allowedAbilities) && bg.allowedAbilities.length > 0 ? bg.allowedAbilities : ['str', 'dex', 'con'];
        if (this.wizardState.backgroundBoostMode === '1_1_1') {
          this.wizardState.backgroundAbilityBoosts = allowed.map(ab => ({ ability: ab, bonus: 1 }));
        } else {
          this.wizardState.backgroundAbilityBoosts = [
            { ability: allowed[0] || 'str', bonus: 2 },
            { ability: allowed[1] || 'con', bonus: 1 }
          ];
        }
      }
      this.render();
    });

    // Inputs de Trasfondo Personalizado (4.3)
    this.container.querySelector('#w-custom-bg-name')?.addEventListener('input', (e) => {
      if (!this.wizardState.customBackground) this.wizardState.customBackground = {};
      this.wizardState.customBackground.name = e.target.value;
    });
    this.container.querySelector('#w-custom-bg-desc')?.addEventListener('input', (e) => {
      if (!this.wizardState.customBackground) this.wizardState.customBackground = {};
      this.wizardState.customBackground.description = e.target.value;
    });
    this.container.querySelector('#w-custom-bg-feat')?.addEventListener('change', (e) => {
      if (!this.wizardState.customBackground) this.wizardState.customBackground = {};
      this.wizardState.customBackground.originFeat = e.target.value;
      this.wizardState.originFeat = e.target.value;
      this.render();
    });
    this.container.querySelector('#w-custom-bg-tool')?.addEventListener('change', (e) => {
      if (!this.wizardState.customBackground) this.wizardState.customBackground = {};
      this.wizardState.customBackground.tool = e.target.value;
      this.wizardState.tools = e.target.value ? [e.target.value] : [];
    });
    this.container.querySelectorAll('.w-custom-bg-ab').forEach(sel => {
      sel.addEventListener('change', () => {
        if (!this.wizardState.customBackground) this.wizardState.customBackground = {};
        const abSels = Array.from(this.container.querySelectorAll('.w-custom-bg-ab')).map(s => s.value);
        // Evitar duplicados si es posible
        const allAbs = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const uniqueAbs = [];
        abSels.forEach(a => {
          if (!uniqueAbs.includes(a)) uniqueAbs.push(a);
          else {
            const fallback = allAbs.find(x => !uniqueAbs.includes(x));
            if (fallback) uniqueAbs.push(fallback);
          }
        });
        this.wizardState.customBackground.allowedAbilities = uniqueAbs;
        if (this.wizardState.backgroundBoostMode === '1_1_1') {
          this.wizardState.backgroundAbilityBoosts = uniqueAbs.map(ab => ({ ability: ab, bonus: 1 }));
        } else {
          this.wizardState.backgroundAbilityBoosts = [
            { ability: uniqueAbs[0] || 'str', bonus: 2 },
            { ability: uniqueAbs[1] || 'con', bonus: 1 }
          ];
        }
        this.render();
      });
    });
    this.container.querySelectorAll('.w-custom-bg-sk').forEach(sel => {
      sel.addEventListener('change', () => {
        if (!this.wizardState.customBackground) this.wizardState.customBackground = {};
        const skSels = Array.from(this.container.querySelectorAll('.w-custom-bg-sk')).map(s => s.value);
        this.wizardState.customBackground.skills = skSels;
        this.render();
      });
    });

    this.container.querySelector('#w-bg-boost-mode')?.addEventListener('change', (e) => {
      const mode = e.target.value;
      this.wizardState.backgroundBoostMode = mode;
      const bg = this.getEffectiveBackground();
      const allowed = Array.isArray(bg?.allowedAbilities) && bg.allowedAbilities.length > 0 ? bg.allowedAbilities : ['str', 'dex', 'con'];
      if (mode === '1_1_1') {
        this.wizardState.backgroundAbilityBoosts = allowed.map(ab => ({ ability: ab, bonus: 1 }));
      } else {
        this.wizardState.backgroundAbilityBoosts = [
          { ability: allowed[0] || 'str', bonus: 2 },
          { ability: allowed[1] || 'con', bonus: 1 }
        ];
      }
      this.render();
    });

    this.container.querySelector('#w-boost-plus2')?.addEventListener('change', (e) => {
      const bg = this.getEffectiveBackground();
      const allowed = Array.isArray(bg?.allowedAbilities) && bg.allowedAbilities.length > 0 ? bg.allowedAbilities : ['str', 'dex', 'con'];
      const newAb2 = e.target.value;
      let curAb1 = this.wizardState.backgroundAbilityBoosts?.[1]?.ability;
      if (!allowed.includes(curAb1) || curAb1 === newAb2) {
        curAb1 = allowed.find(a => a !== newAb2) || allowed[1] || allowed[0];
      }
      this.wizardState.backgroundAbilityBoosts = [
        { ability: newAb2, bonus: 2 },
        { ability: curAb1, bonus: 1 }
      ];
      this.render();
    });

    this.container.querySelector('#w-boost-plus1')?.addEventListener('change', (e) => {
      const bg = this.getEffectiveBackground();
      const allowed = Array.isArray(bg?.allowedAbilities) && bg.allowedAbilities.length > 0 ? bg.allowedAbilities : ['str', 'dex', 'con'];
      const newAb1 = e.target.value;
      let curAb2 = this.wizardState.backgroundAbilityBoosts?.[0]?.ability || allowed[0];
      if (!allowed.includes(curAb2) || curAb2 === newAb1) {
        curAb2 = allowed.find(a => a !== newAb1) || allowed[0];
      }
      this.wizardState.backgroundAbilityBoosts = [
        { ability: curAb2, bonus: 2 },
        { ability: newAb1, bonus: 1 }
      ];
      this.render();
    });

    // Cambios de método de características en Paso 4
    this.container.querySelectorAll('.btn-stat-method').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.statGenMethod = e.currentTarget.dataset.method;
        if (this.statGenMethod === 'standard') {
          this.wizardState.baseAbilityScores = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
        }
        this.render();
      });
    });

    // Tirada 4d6
    this.container.querySelector('#btn-roll-all-4d6')?.addEventListener('click', () => {
      const rolls = [];
      for (let i = 0; i < 6; i++) {
        rolls.push(roll4d6DropLowest().total);
      }
      rolls.sort((a, b) => b - a);
      this.rolledStats = rolls;
      const keys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
      keys.forEach((k, idx) => {
        this.wizardState.baseAbilityScores[k] = rolls[idx] || 10;
      });
      this.render();
    });

    // Inputs de estadísticas base
    this.container.querySelectorAll('.input-base-stat').forEach(input => {
      input.addEventListener('change', (e) => {
        const ab = e.currentTarget.dataset.ability;
        const val = parseInt(e.currentTarget.value, 10) || 10;
        this.wizardState.baseAbilityScores[ab] = val;
        this.render();
      });
    });

    // Cambios dinámicos en Paso 5 (Clase, Multiclases, Habilidades e Idiomas)
    this.container.querySelector('#w-class-select')?.addEventListener('change', (e) => {
      this.saveStepInputs();
      this.wizardState.classId = e.target.value;
      if (this.wizardState.classes && this.wizardState.classes[0]) {
        this.wizardState.classes[0].classId = e.target.value;
        this.wizardState.classes[0].subclassId = '';
      }
      this.wizardState.subclassId = '';
      this.wizardState.chosenClassSkills = [];
      this.wizardState.classTools = [];
      if (!this.isEditing || this.wizardState.startingEquipmentMode === 'package') {
        const ce = getClassStartingEquipment(e.target.value);
        if (ce) {
          if (ce.armorId) this.wizardState.armorId = ce.armorId;
          if (ce.hasShield !== undefined) this.wizardState.hasShield = ce.hasShield;
          if (ce.weaponId) this.wizardState.equippedWeapons = [ce.weaponId];
        }
      }
      this.syncWizardClassState();
      this.render();
    });

    this.container.querySelectorAll('input[name="w-starting-equipment-mode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.wizardState.startingEquipmentMode = e.target.value;
        if (e.target.value === 'package') {
          const ce = getClassStartingEquipment(this.wizardState.classId);
          if (ce) {
            if (ce.armorId) this.wizardState.armorId = ce.armorId;
            if (ce.hasShield !== undefined) this.wizardState.hasShield = ce.hasShield;
            if (ce.weaponId) this.wizardState.equippedWeapons = [ce.weaponId];
          }
        }
        this.render();
      });
    });

    this.container.querySelectorAll('.w-class-tool-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const idx = parseInt(sel.dataset.toolIndex, 10);
        if (!Array.isArray(this.wizardState.classTools)) this.wizardState.classTools = [];
        this.wizardState.classTools[idx] = sel.value;
      });
    });

    this.container.querySelector('#w-primary-class-level')?.addEventListener('change', (e) => {
      this.saveStepInputs();
      const val = Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1));
      if (this.wizardState.classes && this.wizardState.classes[0]) {
        this.wizardState.classes[0].level = val;
      }
      this.syncWizardClassState();
      this.render();
    });

    this.container.querySelector('#btn-add-multiclass')?.addEventListener('click', () => {
      this.saveStepInputs();
      const currentClasses = this.wizardState.classes || [];
      const available = DND55_CLASSES.filter(c => !currentClasses.some(cc => cc.classId === c.id));
      if (available.length > 0) {
        if (!Array.isArray(this.wizardState.classes)) {
          this.wizardState.classes = [{ classId: this.wizardState.classId || 'guerrero', level: this.wizardState.level || 1, subclassId: this.wizardState.subclassId || '' }];
        }
        this.wizardState.classes.push({ classId: available[0].id, level: 1, subclassId: '' });
        this.syncWizardClassState();
        this.render();
      }
    });

    this.container.querySelectorAll('.btn-remove-multiclass').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.saveStepInputs();
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        if (idx > 0 && Array.isArray(this.wizardState.classes) && this.wizardState.classes.length > idx) {
          this.wizardState.classes.splice(idx, 1);
          this.syncWizardClassState();
          this.render();
        }
      });
    });

    this.container.querySelectorAll('.w-multiclass-select, .w-multiclass-level').forEach(el => {
      el.addEventListener('change', () => {
        this.saveStepInputs();
        this.render();
      });
    });

    this.container.querySelectorAll('.check-class-skill').forEach(chk => {
      chk.addEventListener('change', () => {
        this.saveStepInputs();
        this.render();
      });
    });

    this.container.querySelectorAll('.check-wizard-expertise').forEach(chk => {
      chk.addEventListener('change', () => {
        this.saveStepInputs();
        this.render();
      });
    });

    this.container.querySelectorAll('.w-class-feature-choice').forEach(sel => {
      sel.addEventListener('change', () => {
        this.saveStepInputs();
        this.render();
      });
    });

    this.container.querySelectorAll('.check-wizard-language').forEach(chk => {
      chk.addEventListener('change', () => {
        this.saveStepInputs();
      });
    });

    // Cambios dinámicos en Paso 6 (Subclases por clase)
    this.container.querySelectorAll('.w-class-subclass-select').forEach(sel => {
      sel.addEventListener('change', () => {
        this.saveStepInputs();
        this.render();
      });
    });

    this.container.querySelector('#w-subclass-select')?.addEventListener('change', (e) => {
      this.wizardState.subclassId = e.target.value;
      if (this.wizardState.classes && this.wizardState.classes[0]) {
        this.wizardState.classes[0].subclassId = e.target.value;
      }
      this.render();
    });

    // Cambios dinámicos en Paso 6 (Dotes y ASI por clase)
    this.container.querySelectorAll('.feat-level-select, .asi-mode-select, .asi-plus2-select, .asi-plus1a-select, .asi-plus1b-select, .feat-ability-select').forEach(sel => {
      sel.addEventListener('change', () => {
        this.saveStepInputs();
        this.render();
      });
    });
  }

  saveStepInputs() {
    if (!this.container) return;

    // Paso 1
    const campInput = this.container.querySelector('#w-campaign');
    if (campInput) this.wizardState.campaignId = campInput.value;

    const pNameInput = this.container.querySelector('#w-player-name');
    if (pNameInput) this.wizardState.playerName = pNameInput.value;

    const cNameInput = this.container.querySelector('#w-char-name');
    if (cNameInput) this.wizardState.name = cNameInput.value || 'Héroe';

    const alignInput = this.container.querySelector('#w-char-alignment');
    if (alignInput) this.wizardState.alignment = alignInput.value;

    // Paso 2
    const subSelect = this.container.querySelector('#w-sublineage-select');
    if (subSelect) this.wizardState.sublineageId = subSelect.value;

    const elfCantrip = this.container.querySelector('#w-elf-cantrip');
    if (elfCantrip) this.wizardState.speciesCantripChoice = elfCantrip.value;

    const humSkill = this.container.querySelector('#w-human-skill');
    if (humSkill) this.wizardState.speciesSkillChoice = humSkill.value;

    const humFeat = this.container.querySelector('#w-human-origin-feat');
    if (humFeat) this.wizardState.speciesOriginFeat = humFeat.value;

    // Paso 3
    if (this.wizardState.backgroundId === 'personalizado') {
      if (!this.wizardState.customBackground) this.wizardState.customBackground = {};
      const cbgName = this.container.querySelector('#w-custom-bg-name');
      if (cbgName) this.wizardState.customBackground.name = cbgName.value || 'Trasfondo Personalizado';
      const cbgDesc = this.container.querySelector('#w-custom-bg-desc');
      if (cbgDesc) this.wizardState.customBackground.description = cbgDesc.value;
      const cbgFeat = this.container.querySelector('#w-custom-bg-feat');
      if (cbgFeat) {
        this.wizardState.customBackground.originFeat = cbgFeat.value;
        this.wizardState.originFeat = cbgFeat.value;
      }
      const cbgTool = this.container.querySelector('#w-custom-bg-tool');
      if (cbgTool) {
        this.wizardState.customBackground.tool = cbgTool.value;
        this.wizardState.tools = cbgTool.value ? [cbgTool.value] : [];
      }
      const abSels = Array.from(this.container.querySelectorAll('.w-custom-bg-ab')).map(s => s.value);
      if (abSels.length === 3) this.wizardState.customBackground.allowedAbilities = abSels;
      const skSels = Array.from(this.container.querySelectorAll('.w-custom-bg-sk')).map(s => s.value);
      if (skSels.length === 2) this.wizardState.customBackground.skills = skSels;
    }

    const bgModeSel = this.container.querySelector('#w-bg-boost-mode');
    if (bgModeSel) {
      this.wizardState.backgroundBoostMode = bgModeSel.value;
      const bg = this.getEffectiveBackground();
      const allowed = Array.isArray(bg?.allowedAbilities) && bg.allowedAbilities.length > 0 ? bg.allowedAbilities : ['str', 'dex', 'con'];
      if (bgModeSel.value === '1_1_1') {
        this.wizardState.backgroundAbilityBoosts = allowed.map(ab => ({ ability: ab, bonus: 1 }));
      } else {
        const boost2 = this.container.querySelector('#w-boost-plus2');
        const boost1 = this.container.querySelector('#w-boost-plus1');
        if (boost2 && boost1) {
          const ab2 = allowed.includes(boost2.value) ? boost2.value : allowed[0];
          const ab1 = (allowed.includes(boost1.value) && boost1.value !== ab2) ? boost1.value : (allowed.find(a => a !== ab2) || allowed[1] || allowed[0]);
          this.wizardState.backgroundAbilityBoosts = [
            { ability: ab2, bonus: 2 },
            { ability: ab1, bonus: 1 }
          ];
        }
      }
    }

    // Paso 4: Guardar estadísticas base
    this.container.querySelectorAll('.input-base-stat').forEach(inp => {
      const ab = inp.dataset.ability;
      if (ab) {
        if (!this.wizardState.baseAbilityScores) this.wizardState.baseAbilityScores = {};
        this.wizardState.baseAbilityScores[ab] = Math.max(1, Math.min(30, parseInt(inp.value, 10) || 10));
      }
    });

    // Paso 5: Clases y Multiclase
    const classSelect = this.container.querySelector('#w-class-select');
    const pLvlInput = this.container.querySelector('#w-primary-class-level');
    if (classSelect) {
      const primaryClassId = classSelect.value;
      const primaryLvl = pLvlInput ? Math.max(1, Math.min(20, parseInt(pLvlInput.value, 10) || 1)) : 1;
      const primarySubclass = this.wizardState.classes?.[0]?.subclassId || this.wizardState.subclassId || '';

      const secondaryClasses = [];
      this.container.querySelectorAll('.multiclass-row').forEach(row => {
        const sel = row.querySelector('.w-multiclass-select');
        const lvlInp = row.querySelector('.w-multiclass-level');
        if (sel && sel.value) {
          const existing = (this.wizardState.classes || []).find(c => c.classId === sel.value);
          secondaryClasses.push({
            classId: sel.value,
            level: lvlInp ? Math.max(1, Math.min(20, parseInt(lvlInp.value, 10) || 1)) : 1,
            subclassId: existing?.subclassId || ''
          });
        }
      });

      this.wizardState.classes = [
        { classId: primaryClassId, level: primaryLvl, subclassId: primarySubclass },
        ...secondaryClasses
      ];
      this.syncWizardClassState();
    }

    if (this.container.querySelector('.check-class-skill')) {
      const checkedSkills = [];
      this.container.querySelectorAll('.check-class-skill:checked').forEach(chk => {
        checkedSkills.push(chk.value);
      });
      this.wizardState.chosenClassSkills = checkedSkills;
    }

    if (this.container.querySelectorAll('.w-class-feature-choice').length > 0) {
      if (!this.wizardState.classFeatureChoices) this.wizardState.classFeatureChoices = {};
      this.container.querySelectorAll('.w-class-feature-choice').forEach(sel => {
        const key = sel.dataset.featureKey;
        if (key) {
          this.wizardState.classFeatureChoices[key] = sel.value;
        }
      });
    }

    if (this.container.querySelectorAll('.check-wizard-expertise').length > 0) {
      const checkedExp = [];
      this.container.querySelectorAll('.check-wizard-expertise:checked').forEach(chk => {
        checkedExp.push(chk.value);
      });
      this.wizardState.expertiseSkills = checkedExp;
    }

    if (this.container.querySelector('.check-wizard-language')) {
      const checkedLangs = ['Común'];
      this.container.querySelectorAll('.check-wizard-language:checked').forEach(chk => {
        if (chk.value && !checkedLangs.includes(chk.value)) {
          checkedLangs.push(chk.value);
        }
      });
      this.wizardState.languages = checkedLangs;
    }

    const fsSelects = this.container.querySelectorAll('.w-fighting-style-select');
    if (fsSelects.length > 0) {
      if (!this.wizardState.fightingStylesBySlot) this.wizardState.fightingStylesBySlot = {};
      const styles = [];
      fsSelects.forEach((sel, sIdx) => {
        const slotKey = sel.dataset.slotKey || `slot_${sIdx}`;
        this.wizardState.fightingStylesBySlot[slotKey] = sel.value;
        if (!styles.includes(sel.value)) styles.push(sel.value);
      });
      this.wizardState.fightingStyles = styles;
      this.wizardState.fightingStyle = styles[0] || 'estilo_defensa';
    } else {
      const fsSelect = this.container.querySelector('#w-fighting-style');
      if (fsSelect) {
        this.wizardState.fightingStyle = fsSelect.value;
        this.wizardState.fightingStyles = [fsSelect.value];
      } else {
        delete this.wizardState.fightingStyle;
        delete this.wizardState.fightingStyles;
        delete this.wizardState.fightingStylesBySlot;
      }
    }

    const armorSelect = this.container.querySelector('#w-armor-select');
    if (armorSelect) this.wizardState.armorId = armorSelect.value;

    const shieldCheck = this.container.querySelector('#w-shield-check');
    if (shieldCheck) this.wizardState.hasShield = shieldCheck.checked;

    const weaponSelect = this.container.querySelector('#w-weapon-select');
    if (weaponSelect) {
      const val = weaponSelect.value;
      const existing = Array.isArray(this.wizardState.equippedWeapons) ? this.wizardState.equippedWeapons : [];
      this.wizardState.equippedWeapons = [val, ...existing.filter(w => w !== val)];
    }

    // Modo de equipo inicial
    const equipModeRadio = this.container.querySelector('input[name="w-starting-equipment-mode"]:checked');
    if (equipModeRadio) {
      this.wizardState.startingEquipmentMode = equipModeRadio.value;
    }

    // Elección de herramientas de clase
    const classToolSelects = this.container.querySelectorAll('.w-class-tool-select');
    if (classToolSelects.length > 0) {
      const cTools = [];
      classToolSelects.forEach(sel => {
        if (sel.value) cTools.push(sel.value);
      });
      this.wizardState.classTools = cTools;
    }

    // Paso 6: Subclases por clase
    this.container.querySelectorAll('.w-class-subclass-select').forEach(sel => {
      const clsId = sel.dataset.classId;
      const val = sel.value;
      if (this.wizardState.classes) {
        const c = this.wizardState.classes.find(x => x.classId === clsId);
        if (c) c.subclassId = val;
      }
      if (this.wizardState.classId === clsId) {
        this.wizardState.subclassId = val;
      }
    });

    const singleSubclassSelect = this.container.querySelector('#w-subclass-select');
    if (singleSubclassSelect) {
      this.wizardState.subclassId = singleSubclassSelect.value;
      if (this.wizardState.classes && this.wizardState.classes[0]) {
        this.wizardState.classes[0].subclassId = singleSubclassSelect.value;
      }
    }

    // Paso 6: Dotes y Mejoras de Característica (ASI) por clase
    if (!this.wizardState.classAsiChoices) {
      this.wizardState.classAsiChoices = {};
    }

    this.container.querySelectorAll('.feat-level-select').forEach(sel => {
      const clsId = sel.dataset.classId || this.wizardState.classId;
      const key = sel.dataset.choiceKey;
      if (!key) return;

      if (!this.wizardState.classAsiChoices[clsId]) {
        this.wizardState.classAsiChoices[clsId] = {};
      }

      const card = this.container.querySelector(`[data-asi-card="${clsId}_${key}"]`) || this.container.querySelector(`[data-asi-card="${key}"]`);
      const prev = this.wizardState.classAsiChoices[clsId][key] || (clsId === this.wizardState.classId ? this.wizardState[key] : {}) || {};

      let choiceObj;
      if (sel.value && sel.value !== '__asi__') {
        const featDef = getFeatById(sel.value);
        const allowedAbs = Array.isArray(featDef?.allowedAbilities) ? featDef.allowedAbilities : ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const featAbSelect = card?.querySelector('.feat-ability-select');
        let chosenAb = featAbSelect && !featAbSelect.disabled ? featAbSelect.value : (prev.chosenAbility || '');
        if (allowedAbs.length === 0) {
          chosenAb = '';
        } else if (!allowedAbs.includes(chosenAb)) {
          chosenAb = allowedAbs[0];
        }
        choiceObj = {
          ...prev,
          type: 'feat',
          featId: sel.value
        };
        // Limpiar campos residuales de ASI
        delete choiceObj.asiMode;
        delete choiceObj.asiPlusTwoAbility;
        delete choiceObj.asiPlusOneAbilities;
        delete choiceObj.asiBoosts;
        delete choiceObj.chosenAbilityScores;

        if (chosenAb) {
          choiceObj.chosenAbility = chosenAb;
          choiceObj.chosenAbilityBonus = { [chosenAb]: 1 };
        } else {
          delete choiceObj.chosenAbility;
          delete choiceObj.chosenAbilityBonus;
        }
      } else {
        const modeSel = card?.querySelector('.asi-mode-select');
        const asiMode = modeSel ? modeSel.value : (prev.asiMode || 'plus2');
        if (asiMode === 'plus1plus1') {
          const abASel = card?.querySelector('.asi-plus1a-select');
          const abBSel = card?.querySelector('.asi-plus1b-select');
          const abA = abASel ? abASel.value : (prev.asiPlusOneAbilities?.[0] || 'str');
          const abB = abBSel ? abBSel.value : (prev.asiPlusOneAbilities?.[1] || 'con');
          choiceObj = {
            type: 'asi',
            asiMode: 'plus1plus1',
            asiPlusOneAbilities: [abA, abB]
          };
        } else {
          const ab2Sel = card?.querySelector('.asi-plus2-select');
          const ab2 = ab2Sel ? ab2Sel.value : (prev.asiPlusTwoAbility || 'str');
          choiceObj = {
            type: 'asi',
            asiMode: 'plus2',
            asiPlusTwoAbility: ab2
          };
        }
      }

      this.wizardState.classAsiChoices[clsId][key] = choiceObj;
      this.wizardState[`${clsId}_${key}`] = choiceObj;
      if (clsId === this.wizardState.classId || (this.wizardState.classes && this.wizardState.classes[0]?.classId === clsId)) {
        this.wizardState[key] = choiceObj;
      }
    });

    this.syncWizardClassState();
  }

  finishAndSaveCharacter() {
    this.saveStepInputs();
    const wasEditing = this.isEditing;

    // Equipamiento inicial de clase según la opción seleccionada
    const mode = this.wizardState.startingEquipmentMode || (!wasEditing ? 'package' : 'keep');
    const classEquip = getClassStartingEquipment(this.wizardState.classId);

    if (mode === 'package' && classEquip) {
      if (!wasEditing || !Array.isArray(this.wizardState.inventory) || this.wizardState.inventory.length === 0 || this.wizardState.startingEquipmentMode === 'package') {
        this.wizardState.inventory = classEquip.items.map((it, idx) => ({
          ...it,
          id: it.id || `item_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`
        }));
        this.wizardState.gp = classEquip.goldRemaining;
        if (!this.wizardState.currency) {
          this.wizardState.currency = { cp: 0, sp: 0, ep: 0, gp: classEquip.goldRemaining, pp: 0 };
        } else {
          this.wizardState.currency.gp = classEquip.goldRemaining;
        }
        if (classEquip.armorId) this.wizardState.armorId = classEquip.armorId;
        if (classEquip.hasShield !== undefined) this.wizardState.hasShield = classEquip.hasShield;
        if (classEquip.weaponId && (!this.wizardState.equippedWeapons || this.wizardState.equippedWeapons.length === 0)) {
          this.wizardState.equippedWeapons = [classEquip.weaponId];
        }
      }
    } else if (mode === 'gold' && classEquip) {
      if (!wasEditing || !Array.isArray(this.wizardState.inventory) || this.wizardState.inventory.length === 0 || this.wizardState.startingEquipmentMode === 'gold') {
        this.wizardState.gp = classEquip.gold;
        if (!this.wizardState.currency) {
          this.wizardState.currency = { cp: 0, sp: 0, ep: 0, gp: classEquip.gold, pp: 0 };
        } else {
          this.wizardState.currency.gp = classEquip.gold;
        }
        if (!wasEditing) {
          this.wizardState.inventory = [];
        }
      }
    }

    // Auto-poblar herramientas de clase en tools
    const combinedTools = new Set(this.wizardState.tools || []);
    (this.wizardState.classTools || []).forEach(t => combinedTools.add(t));
    const curCls = DND55_CLASSES.find(c => c.id === this.wizardState.classId);
    if (curCls?.toolProficiencies) {
      curCls.toolProficiencies.forEach(t => combinedTools.add(t));
    }
    this.wizardState.tools = Array.from(combinedTools);

    // Auto-poblar conjuros innatos (especie y trasfondo) si no están en la lista
    if (!Array.isArray(this.wizardState.spells)) this.wizardState.spells = [];
    const innateSpells = getInnateSpellsForCharacter(this.wizardState);
    innateSpells.forEach(innate => {
      const alreadyHas = this.wizardState.spells.some(sp => {
        const sName = typeof sp === 'string' ? sp : (sp.name || sp.id || '');
        const sId = typeof sp === 'object' && sp !== null ? sp.id : '';
        return sName.toLowerCase().trim() === innate.name.toLowerCase().trim() ||
               (innate.id && sId && sId.toLowerCase().trim() === innate.id.toLowerCase().trim());
      });
      if (!alreadyHas) {
        this.wizardState.spells.push({ ...innate, isPrepared: true, isInnate: true });
      }
    });

    const saved = store.saveCharacter(this.wizardState);
    store.setSelectedCharacterId(saved.id);

    if (wasEditing) {
      showToast.success(`¡Personaje "${saved.name}" actualizado con éxito en la mesa!`, 'Personaje Guardado');
    } else {
      showToast.success(`¡Personaje "${saved.name}" creado con éxito y guardado en la mesa!`, 'Héroe Creado');
    }

    this.isEditing = false;
    this.editingCharacterId = null;

    // Redirigir a la Hoja Oficial
    const sheetTabBtn = document.getElementById('tab-sheet-btn');
    if (sheetTabBtn) sheetTabBtn.click();
  }
}
