/**
 * Utilidades de Persistencia y Almacenamiento Local (localStorage)
 * Sanitización de datos, copias de seguridad, exportación e importación en formato JSON.
 */

import { repairMojibake } from './formatters.js';
import { DND55_PRESET_ITEMS } from '../constants/spellsAndItems.js';
import { getMinXpForLevel } from '../constants/dnd55Rules.js';
import { isSafeExternalImageUrl, isSafeAvatarDataUrl } from './imageValidator.js';

export const STORAGE_KEYS = {
  CHARACTERS: 'dnd55_characters',
  CAMPAIGNS: 'dnd55_campaigns',
  BASTIONS: 'dnd55_bastions',
  SELECTED_CAMPAIGN: 'dnd55_selected_campaign',
  SELECTED_CHARACTER: 'dnd55_selected_character',
  BTRS_HISTORY: 'btrs_history',
  APP_THEME: 'roleplay_hub_theme'
};

/**
 * Repara recursivamente cualquier cadena de texto dentro de un objeto o array
 * que presente caracteres corruptos (mojibake).
 * @param {*} val 
 * @returns {*}
 */
export function deepRepairMojibake(val) {
  if (typeof val === 'string') {
    if (val.startsWith('data:image/')) return val;
    return repairMojibake(val);
  }
  if (Array.isArray(val)) {
    return val.map(deepRepairMojibake);
  }
  if (val && typeof val === 'object') {
    const repaired = {};
    for (const [k, v] of Object.entries(val)) {
      repaired[k] = deepRepairMojibake(v);
    }
    return repaired;
  }
  return val;
}

/**
 * Carga un valor desde localStorage con manejo de errores y valor por defecto.
 * @param {string} key Clave en localStorage
 * @param {*} defaultValue Valor por defecto
 * @returns {*}
 */
export function loadFromStorage(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return defaultValue;
    }
    const parsed = JSON.parse(raw);
    return deepRepairMojibake(parsed);
  } catch (err) {
    console.warn(`[Storage] Error al leer la clave "${key}":`, err);
    return defaultValue;
  }
}

/**
 * Guarda un valor en localStorage serializado en JSON.
 * @param {string} key Clave en localStorage
 * @param {*} value Valor a guardar
 * @returns {boolean} true si se guardó con éxito
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[Storage] Error al escribir la clave "${key}":`, err);
    return false;
  }
}

/**
 * Elimina una clave de localStorage.
 * @param {string} key 
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`[Storage] Error al borrar "${key}":`, err);
  }
}

/**
 * Sanitiza un objeto de personaje asegurando que contenga todos los campos mínimos requeridos.
 * @param {Object} char Objeto personaje potencialmente incompleto
 * @returns {Object} Personaje sanitizado
 */
export function sanitizeCharacter(char) {
  if (!char || typeof char !== 'object') {
    char = {};
  }
  char = deepRepairMojibake(char);

  const defaultScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  const baseScores = { ...defaultScores, ...(char.baseAbilityScores || {}) };
  const sanitizedLevel = Math.max(1, Math.min(20, Number(char.level) || 1));
  const minXp = getMinXpForLevel(sanitizedLevel);
  const currentXp = Math.max(0, Math.round(Number(char.xp) || 0));
  const sanitizedXp = currentXp < minXp ? minXp : currentXp;

  return {
    ...char,
    id: char.id || `char_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    campaignId: char.campaignId || 'camp_strahd',
    name: char.name || 'Héroe Desconocido',
    imageUrl: isSafeExternalImageUrl(char.imageUrl) ? char.imageUrl.trim() : '',
    avatarThumb: isSafeAvatarDataUrl(char.avatarThumb) ? char.avatarThumb : '',
    level: sanitizedLevel,
    alignment: char.alignment || 'Neutral',
    playerName: char.playerName || 'Jugador',
    speciesId: char.speciesId || 'humano',
    sublineageId: char.sublineageId || '',
    speciesSkillChoice: (char.speciesId === 'humano' || !char.speciesId) ? (char.speciesSkillChoice || '') : '',
    speciesOriginFeat: (char.speciesId === 'humano' || !char.speciesId) ? (char.speciesOriginFeat || '') : '',
    speciesOriginFeatChoices: (char.speciesId === 'humano' || !char.speciesId) ? (char.speciesOriginFeatChoices || null) : null,
    speciesCantripChoice: char.speciesId === 'elfo' ? (char.speciesCantripChoice || '') : '',
    dragonAncestry: char.speciesId === 'draconido' ? (char.dragonAncestry || '') : '',
    backgroundId: char.backgroundId || 'soldado',
    customBackground: (char.customBackground && typeof char.customBackground === 'object') ? char.customBackground : null,
    backgroundAbilityBoosts: Array.isArray(char.backgroundAbilityBoosts) ? char.backgroundAbilityBoosts : [{ ability: 'str', bonus: 2 }, { ability: 'con', bonus: 1 }],
    originFeat: char.originFeat || 'Alerta',
    baseAbilityScores: baseScores,
    classId: char.classId || 'guerrero',
    subclassId: char.subclassId || '',
    chosenClassSkills: Array.isArray(char.chosenClassSkills) ? char.chosenClassSkills : ['Atletismo', 'Percepción'],
    fightingStyle: char.fightingStyle || '',
    classFeatureChoices: typeof char.classFeatureChoices === 'object' && char.classFeatureChoices !== null ? char.classFeatureChoices : {},
    level4Choice: char.level4Choice || null,
    level6Choice: char.level6Choice || null,
    level8Choice: char.level8Choice || null,
    level10Choice: char.level10Choice || null,
    level12Choice: char.level12Choice || null,
    level14Choice: char.level14Choice || null,
    level16Choice: char.level16Choice || null,
    level19Choice: char.level19Choice || null,
    languages: Array.isArray(char.languages) ? char.languages : ['Común'],
    tools: Array.isArray(char.tools) ? char.tools : undefined,
    armorId: char.armorId !== undefined ? char.armorId : 'cota_malla',
    hasShield: Boolean(char.hasShield),
    equippedWeapons: Array.isArray(char.equippedWeapons) ? char.equippedWeapons : ['espada_larga'],
    inventory: Array.isArray(char.inventory) ? char.inventory.map(it => {
      if (!it || typeof it !== 'object') return it;
      const preset = (DND55_PRESET_ITEMS || []).find(p => p.id === it.id || (p.name && it.name && p.name.toLowerCase() === it.name.toLowerCase()));
      let maxCharges = it.maxCharges !== undefined ? Number(it.maxCharges) || 0 : (preset?.maxCharges || 0);
      let currentCharges = it.currentCharges !== undefined ? Number(it.currentCharges) : (maxCharges > 0 ? maxCharges : 0);
      currentCharges = Math.max(0, Math.min(maxCharges, currentCharges));
      const chargeRecovery = it.chargeRecovery || preset?.chargeRecovery || (maxCharges > 0 ? 'Todas en Descanso Largo' : '');
      let category = it.category || preset?.category || 'equipo';
      const lowerItName = (it.name || '').toLowerCase();
      if (lowerItName.startsWith('pergamino')) {
        if (category === 'consumible' || category === 'sortilegio' || !it.category) category = 'pergamino';
      } else if (lowerItName.startsWith('sortilegio')) {
        if (category === 'consumible' || !it.category) category = 'sortilegio';
      }
      return {
        ...it,
        category,
        maxCharges,
        currentCharges,
        chargeRecovery,
        customFunctions: Array.isArray(it.customFunctions) ? it.customFunctions : [],
        artifactProperties: Array.isArray(it.artifactProperties) ? it.artifactProperties : []
      };
    }) : [],
    spells: Array.isArray(char.spells) ? char.spells : [],
    spellSlotsState: typeof char.spellSlotsState === 'object' && char.spellSlotsState !== null ? char.spellSlotsState : {},
    specialAbilities: Array.isArray(char.specialAbilities) ? char.specialAbilities : [],
    hpRollsByLevel: typeof char.hpRollsByLevel === 'object' && char.hpRollsByLevel !== null ? char.hpRollsByLevel : {},
    currentHp: typeof char.currentHp === 'number' ? char.currentHp : null,
    temporaryHp: Number(char.temporaryHp) || 0,
    spentHitDice: Math.max(0, Number(char.spentHitDice) || 0),
    deathSaves: (char.deathSaves && typeof char.deathSaves === 'object')
      ? {
          successes: Math.max(0, Math.min(3, Number(char.deathSaves.successes) || 0)),
          failures: Math.max(0, Math.min(3, Number(char.deathSaves.failures) || 0))
        }
      : { successes: 0, failures: 0 },
    currency: (char.currency && typeof char.currency === 'object')
      ? {
          cp: Number(char.currency.cp) || 0,
          sp: Number(char.currency.sp) || 0,
          ep: Number(char.currency.ep) || 0,
          gp: char.currency.gp !== undefined ? Number(char.currency.gp) : (char.gp !== undefined ? Number(char.gp) : 50),
          pp: Number(char.currency.pp) || 0
        }
      : { cp: 0, sp: 0, ep: 0, gp: char.gp !== undefined ? Number(char.gp) : 50, pp: 0 },
    gp: char.gp !== undefined ? Number(char.gp) : (char.currency?.gp ?? 50),
    xp: sanitizedXp,
    appearance: char.appearance || '',
    backstory: char.backstory || '',
    notes: char.notes || '',
    heroicInspiration: Boolean(char.heroicInspiration),
    exhaustion: Math.max(0, Math.min(6, Math.round(Number(char.exhaustion) || 0))),
    conditions: Array.isArray(char.conditions)
      ? Array.from(new Set(char.conditions.filter(c => typeof c === 'string' && c.trim()).map(c => c.trim())))
      : [],
    isActiveInMasterPanel: char.isActiveInMasterPanel !== false,
    customConsumables: Array.isArray(char.customConsumables) ? char.customConsumables : [],
    restTraitsState: typeof char.restTraitsState === 'object' && char.restTraitsState !== null ? char.restTraitsState : {},
    createdAt: char.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Sanitiza un objeto de campaña.
 * @param {Object} camp 
 * @returns {Object} Campaña válida
 */
export function sanitizeCampaign(camp) {
  if (!camp || typeof camp !== 'object') {
    camp = {};
  }
  camp = deepRepairMojibake(camp);
  const sanitizedMilestones = Array.isArray(camp.milestones)
    ? camp.milestones
        .filter(m => m && typeof m === 'object')
        .map(m => ({
          id: m.id || `ms_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          title: String(m.title || '').trim() || 'Hito de campaña',
          description: String(m.description || '').trim(),
          sessionOrDate: String(m.sessionOrDate || '').trim(),
          createdAt: m.createdAt || new Date().toISOString()
        }))
    : [];

  return {
    id: camp.id || `camp_${Date.now()}`,
    name: camp.name || 'Nueva Campaña',
    description: camp.description || '',
    gameMaster: camp.gameMaster || 'Dungeon Master',
    milestones: sanitizedMilestones,
    nextSessionNotes: typeof camp.nextSessionNotes === 'string' ? camp.nextSessionNotes : '',
    createdAt: camp.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Sanitiza un objeto de Baluarte (Bastion DMG 2024).
 * @param {Object} bastion
 * @returns {Object} Baluarte válido
 */
export function sanitizeBastion(bastion) {
  if (!bastion || typeof bastion !== 'object') {
    bastion = {};
  }
  bastion = deepRepairMojibake(bastion);

  const ownerCharacterIds = Array.isArray(bastion.ownerCharacterIds)
    ? Array.from(new Set(bastion.ownerCharacterIds.filter(id => typeof id === 'string' && id.trim())))
    : [];

  const facilities = Array.isArray(bastion.facilities)
    ? bastion.facilities
        .filter(f => f && typeof f === 'object')
        .map((f, idx) => ({
          id: f.id || `fac_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
          type: f.type === 'basic' ? 'basic' : 'special',
          templateId: String(f.templateId || 'custom'),
          name: String(f.name || 'Instalación').trim(),
          space: ['estrecha', 'espaciosa', 'vasta'].includes(f.space) ? f.space : 'espaciosa',
          assignedOwnerId: typeof f.assignedOwnerId === 'string' ? f.assignedOwnerId : '',
          allowedOrder: String(f.allowedOrder || ''),
          currentOrder: String(f.currentOrder || ''),
          orderSummary: String(f.orderSummary || ''),
          passiveBenefit: String(f.passiveBenefit || ''),
          turnCostGp: Math.max(0, Number(f.turnCostGp) || 0),
          turnIncomeGp: Math.max(0, Number(f.turnIncomeGp) || 0),
          turnBenefit: String(f.turnBenefit || ''),
          hirelingsCount: Math.max(0, Math.round(Number(f.hirelingsCount) || 0)),
          description: String(f.description || ''),
          notes: String(f.notes || ''),
          isDamaged: Boolean(f.isDamaged)
        }))
    : [];

  const staff = Array.isArray(bastion.staff)
    ? bastion.staff
        .filter(s => s && typeof s === 'object')
        .map((s, idx) => ({
          id: s.id || `npc_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
          name: String(s.name || 'Asalariado').trim(),
          role: ['hireling', 'defender', 'lieutenant', 'steward', 'guest', 'specialist'].includes(s.role) ? s.role : 'hireling',
          facilityId: typeof s.facilityId === 'string' ? s.facilityId : '',
          wageGpPerTurn: Math.max(0, Number(s.wageGpPerTurn) || 0),
          notes: String(s.notes || '')
        }))
    : [];

  const blueprints = Array.isArray(bastion.blueprints)
    ? bastion.blueprints
        .filter(bp => bp && typeof bp === 'object' && (isSafeExternalImageUrl(bp.imageUrl) || isSafeAvatarDataUrl(bp.thumbDataUrl)))
        .map((bp, idx) => ({
          id: bp.id || `bp_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 6)}`,
          title: String(bp.title || `Plano ${idx + 1}`).trim(),
          imageUrl: isSafeExternalImageUrl(bp.imageUrl) ? bp.imageUrl.trim() : '',
          thumbDataUrl: isSafeAvatarDataUrl(bp.thumbDataUrl) ? bp.thumbDataUrl : ''
        }))
    : [];

  const eventsLog = Array.isArray(bastion.eventsLog)
    ? bastion.eventsLog.slice(0, 40)
    : [];

  return {
    id: bastion.id || `bastion_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    campaignId: bastion.campaignId || 'camp_strahd',
    name: String(bastion.name || 'Nuevo Baluarte').trim(),
    location: String(bastion.location || '').trim(),
    description: String(bastion.description || '').trim(),
    ownerCharacterIds,
    manualSpecialSlotsAdjust: Math.round(Number(bastion.manualSpecialSlotsAdjust) || 0),
    generalOrder: bastion.generalOrder === 'maintain' ? 'maintain' : 'individual',
    treasuryGp: Math.max(0, Number(bastion.treasuryGp) || 0),
    armoryStocked: Boolean(bastion.armoryStocked),
    turnNumber: Math.max(1, Math.round(Number(bastion.turnNumber) || 1)),
    facilities,
    staff,
    blueprints,
    eventsLog,
    createdAt: bastion.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * Exporta el estado completo de la aplicación como archivo JSON descargable.
 * @param {Object} fullState 
 * @param {string} filename 
 */
export function exportStateToJsonFile(fullState, filename = `rpg_master_hub_backup_${new Date().toISOString().slice(0, 10)}.json`) {
  const jsonStr = JSON.stringify(fullState, null, 2);
  const blob = new Blob(['\uFEFF' + jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Importa y valida datos desde un texto JSON.
 * @param {string} jsonText 
 * @returns {{ success: boolean, campaigns?: Array, characters?: Array, error?: string }}
 */
export function parseAndValidateBackup(jsonText) {
  try {
    let cleanText = typeof jsonText === 'string' ? jsonText : String(jsonText || '');
    if (cleanText.charCodeAt(0) === 0xFEFF) {
      cleanText = cleanText.slice(1);
    }
    cleanText = repairMojibake(cleanText);
    const data = JSON.parse(cleanText.trim());
    let campaigns = [];
    let characters = [];
    let bastions = [];

    if (Array.isArray(data)) {
      // Podría ser un array de personajes o campañas directamente
      if (data.length > 0 && data[0].classId) {
        characters = data.map(sanitizeCharacter);
      } else if (data.length > 0 && data[0].gameMaster !== undefined) {
        campaigns = data.map(sanitizeCampaign);
      }
    } else if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data.campaigns)) {
        campaigns = data.campaigns.map(sanitizeCampaign);
      }
      if (Array.isArray(data.characters)) {
        characters = data.characters.map(sanitizeCharacter);
      }
      if (Array.isArray(data.bastions)) {
        bastions = data.bastions.map(sanitizeBastion);
      }
    }

    return {
      success: true,
      campaigns,
      characters,
      bastions
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'JSON inválido'
    };
  }
}
