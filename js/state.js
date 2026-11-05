/**
 * Almacén de Estado Reactivo Central (Store)
 * Implementa el patrón EventEmitter / Pub-Sub para desacoplar los módulos del DOM.
 * Gestiona persistencia automática en localStorage y sincronización de personajes/campañas.
 */

import { STORAGE_KEYS, loadFromStorage, saveToStorage, sanitizeCharacter, sanitizeCampaign } from './utils/storage.js';
import { DEFAULT_CAMPAIGNS, DEFAULT_CHARACTERS } from './constants/seedData.js';
import { calculateHitPoints, getConsumableTraitsForCharacter } from './constants/dnd55Rules.js';
import { showToast, showConfirmModal } from './utils/uiFeedback.js';
import { fileRepo } from './utils/fileRepository.js';

export class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * Suscribe una función a un evento.
   * @param {string} event Nombre del evento
   * @param {Function} listener Función callback
   * @returns {Function} Función para cancelar la suscripción
   */
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
    return () => this.off(event, listener);
  }

  /**
   * Cancela la suscripción de un listener.
   * @param {string} event 
   * @param {Function} listener 
   */
  off(event, listener) {
    if (!this.events.has(event)) return;
    this.events.get(event).delete(listener);
  }

  /**
   * Emite un evento con datos para todos sus oyentes.
   * @param {string} event 
   * @param {*} data 
   */
  emit(event, data) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      try {
        listener(data);
      } catch (err) {
        console.error(`[EventEmitter] Error ejecutando listener para "${event}":`, err);
      }
    }
  }
}

class AppStore extends EventEmitter {
  constructor() {
    super();
    this.campaigns = [];
    this.characters = [];
    this.selectedCampaignId = '';
    this.selectedCharacterId = '';
    this.btrsHistory = [];
    this.activeTab = 'master-panel';

    this.init();
  }

  /**
   * Inicializa el estado desde localStorage o semillas por defecto.
   */
  init() {
    // 1. Cargar campañas
    const storedCampaigns = loadFromStorage(STORAGE_KEYS.CAMPAIGNS, null);
    if (Array.isArray(storedCampaigns) && storedCampaigns.length > 0) {
      this.campaigns = storedCampaigns.map(sanitizeCampaign);
    } else {
      this.campaigns = DEFAULT_CAMPAIGNS.map(sanitizeCampaign);
    }
    saveToStorage(STORAGE_KEYS.CAMPAIGNS, this.campaigns);

    // 2. Cargar personajes
    const storedCharacters = loadFromStorage(STORAGE_KEYS.CHARACTERS, null);
    if (Array.isArray(storedCharacters) && storedCharacters.length > 0) {
      this.characters = storedCharacters.map(sanitizeCharacter);
    } else {
      this.characters = DEFAULT_CHARACTERS.map(sanitizeCharacter);
    }
    saveToStorage(STORAGE_KEYS.CHARACTERS, this.characters);

    // 3. Campaña seleccionada
    const savedCampId = loadFromStorage(STORAGE_KEYS.SELECTED_CAMPAIGN, '');
    if (savedCampId && this.campaigns.some(c => c.id === savedCampId)) {
      this.selectedCampaignId = savedCampId;
    } else {
      this.selectedCampaignId = this.campaigns[0]?.id || '';
    }

    // 4. Personaje seleccionado
    const savedCharId = loadFromStorage(STORAGE_KEYS.SELECTED_CHARACTER, '');
    const partyChars = this.getCharactersByCampaign(this.selectedCampaignId);
    if (savedCharId && partyChars.some(c => c.id === savedCharId)) {
      this.selectedCharacterId = savedCharId;
    } else {
      this.selectedCharacterId = partyChars[0]?.id || this.characters[0]?.id || '';
    }

    // 5. Historial BTRS
    this.btrsHistory = loadFromStorage(STORAGE_KEYS.BTRS_HISTORY, []);
  }

  // ==========================================
  // GESTIÓN DE CAMPAÑAS
  // ==========================================

  getCampaigns() {
    return [...this.campaigns];
  }

  getCampaign(id) {
    return this.campaigns.find(c => c.id === id) || null;
  }

  saveCampaign(campData) {
    const sanitized = sanitizeCampaign(campData);
    const index = this.campaigns.findIndex(c => c.id === sanitized.id);
    if (index >= 0) {
      this.campaigns[index] = sanitized;
    } else {
      this.campaigns.push(sanitized);
    }
    saveToStorage(STORAGE_KEYS.CAMPAIGNS, this.campaigns);
    fileRepo.saveCampaignsDebounced(this.campaigns);
    this.emit('campaigns:updated', this.campaigns);
    return sanitized;
  }

  deleteCampaign(id) {
    this.campaigns = this.campaigns.filter(c => c.id !== id);
    saveToStorage(STORAGE_KEYS.CAMPAIGNS, this.campaigns);
    fileRepo.saveCampaignsDebounced(this.campaigns);
    if (this.selectedCampaignId === id) {
      this.setSelectedCampaignId(this.campaigns[0]?.id || '');
    }
    this.emit('campaigns:updated', this.campaigns);
  }

  getSelectedCampaignId() {
    return this.selectedCampaignId;
  }

  setSelectedCampaignId(id) {
    if (this.selectedCampaignId === id) return;
    this.selectedCampaignId = id;
    saveToStorage(STORAGE_KEYS.SELECTED_CAMPAIGN, id);

    // Ajustar personaje seleccionado si no pertenece a la nueva campaña
    const partyChars = this.getCharactersByCampaign(id);
    if (!partyChars.some(c => c.id === this.selectedCharacterId)) {
      this.setSelectedCharacterId(partyChars[0]?.id || '');
    }

    this.emit('campaign:selected', id);
  }

  // ==========================================
  // GESTIÓN DE PERSONAJES
  // ==========================================

  getCharacters() {
    return [...this.characters];
  }

  getCharactersByCampaign(campaignId) {
    if (!campaignId) return [...this.characters];
    return this.characters.filter(c => c.campaignId === campaignId);
  }

  getCharacter(id) {
    return this.characters.find(c => c.id === id) || null;
  }

  getSelectedCharacter() {
    return this.getCharacter(this.selectedCharacterId);
  }

  setSelectedCharacterId(id) {
    if (this.selectedCharacterId === id) return;
    this.selectedCharacterId = id;
    saveToStorage(STORAGE_KEYS.SELECTED_CHARACTER, id);
    this.emit('character:selected', this.getCharacter(id));
  }

  saveCharacter(charData) {
    const sanitized = sanitizeCharacter(charData);

    // Calcular PG iniciales si no los tiene
    if (sanitized.currentHp === null || sanitized.currentHp === undefined) {
      const hpInfo = calculateHitPoints(sanitized);
      sanitized.currentHp = hpInfo.maxHp;
    }

    const index = this.characters.findIndex(c => c.id === sanitized.id);
    if (index >= 0) {
      this.characters[index] = sanitized;
    } else {
      this.characters.push(sanitized);
    }

    saveToStorage(STORAGE_KEYS.CHARACTERS, this.characters);
    fileRepo.saveCharacterDebounced(sanitized);
    this.emit('characters:updated', this.characters);

    if (sanitized.id === this.selectedCharacterId) {
      this.emit('character:selected', sanitized);
    }

    return sanitized;
  }

  deleteCharacter(id) {
    this.characters = this.characters.filter(c => c.id !== id);
    saveToStorage(STORAGE_KEYS.CHARACTERS, this.characters);
    fileRepo.deleteCharacter(id);

    if (this.selectedCharacterId === id) {
      const party = this.getCharactersByCampaign(this.selectedCampaignId);
      this.setSelectedCharacterId(party[0]?.id || this.characters[0]?.id || '');
    }

    this.emit('characters:updated', this.characters);
  }

  // ==========================================
  // ACCIONES EN VIVO DEL MASTER PANEL
  // ==========================================

  /**
   * Modifica los PG actuales y/o temporales de un personaje.
   * Si se reduce la vida (daño) sin especificar tempHp, primero se consumen
   * los puntos temporales y cualquier daño sobrante se descuenta de los normales.
   * @param {string} charId 
   * @param {number} currentHp 
   * @param {number|null} tempHp 
   */
  updateCharacterHp(charId, currentHp, tempHp = null) {
    const char = this.getCharacter(charId);
    if (!char) return;

    const hpInfo = calculateHitPoints(char);
    const maxHp = hpInfo.maxHp;
    const prevHp = char.currentHp !== null && char.currentHp !== undefined ? char.currentHp : maxHp;
    const prevTemp = Number(char.temporaryHp) || 0;
    const targetHp = Math.round(Number(currentHp) || 0);

    if (tempHp !== null) {
      char.currentHp = Math.max(0, Math.min(maxHp, targetHp));
      char.temporaryHp = Math.max(0, Math.round(Number(tempHp) || 0));
    } else {
      if (targetHp < prevHp) {
        // Daño: primero se absorbe por los puntos temporales
        const damage = prevHp - targetHp;
        if (prevTemp > 0) {
          if (prevTemp >= damage) {
            char.temporaryHp = prevTemp - damage;
            char.currentHp = prevHp;
          } else {
            const excess = damage - prevTemp;
            char.temporaryHp = 0;
            char.currentHp = Math.max(0, prevHp - excess);
          }
        } else {
          char.currentHp = Math.max(0, targetHp);
        }
      } else {
        char.currentHp = Math.min(maxHp, targetHp);
      }
    }

    this.saveCharacter(char);
    this.emit('character:hp-changed', { charId, currentHp: char.currentHp, tempHp: char.temporaryHp });
  }

  /**
   * Aplica una variación de PG (daño si delta < 0, curación si delta > 0).
   * Cuando se reciben puntos de daño (delta < 0), primero se absorben por los
   * puntos de golpe temporales y después se continúa con los normales.
   * @param {string} charId 
   * @param {number} delta 
   */
  applyHpDelta(charId, delta) {
    const char = this.getCharacter(charId);
    if (!char) return;

    const hpInfo = calculateHitPoints(char);
    const maxHp = hpInfo.maxHp;
    const prevHp = char.currentHp !== null && char.currentHp !== undefined ? char.currentHp : maxHp;
    const prevTemp = Number(char.temporaryHp) || 0;
    const numDelta = Math.round(Number(delta) || 0);

    if (numDelta < 0) {
      // Daño: primero absorben los temporales, luego los normales
      const damage = Math.abs(numDelta);
      if (prevTemp > 0) {
        if (prevTemp >= damage) {
          char.temporaryHp = prevTemp - damage;
          char.currentHp = prevHp;
        } else {
          const excess = damage - prevTemp;
          char.temporaryHp = 0;
          char.currentHp = Math.max(0, prevHp - excess);
        }
      } else {
        char.currentHp = Math.max(0, prevHp - damage);
      }
    } else if (numDelta > 0) {
      // Curación: incrementa la vida normal hasta maxHp (no altera tempHp)
      char.currentHp = Math.min(maxHp, prevHp + numDelta);
    }

    this.saveCharacter(char);
    this.emit('character:hp-changed', { charId, currentHp: char.currentHp, tempHp: char.temporaryHp });
  }

  /**
   * Añade o resta puntos de golpe temporales (añadidos de la misma forma que los PG normales).
   * @param {string} charId 
   * @param {number} delta 
   */
  applyTempHpDelta(charId, delta) {
    const char = this.getCharacter(charId);
    if (!char) return;

    const prevTemp = Number(char.temporaryHp) || 0;
    const numDelta = Math.round(Number(delta) || 0);
    char.temporaryHp = Math.max(0, prevTemp + numDelta);

    this.saveCharacter(char);
    this.emit('character:hp-changed', { charId, currentHp: char.currentHp, tempHp: char.temporaryHp });
  }

  /**
   * Alterna la Inspiración Heroica para un personaje (D&D 5.5).
   * @param {string} charId 
   */
  toggleHeroicInspiration(charId) {
    const char = this.getCharacter(charId);
    if (!char) return;

    char.heroicInspiration = !char.heroicInspiration;
    this.saveCharacter(char);
    this.emit('character:inspiration-toggled', { charId, heroicInspiration: char.heroicInspiration });
  }

  /**
   * Actualiza los puntos de experiencia (PX) de un personaje.
   * @param {string} charId 
   * @param {number} xp 
   */
  updateCharacterXp(charId, xp) {
    const char = this.getCharacter(charId);
    if (!char) return;

    char.xp = Math.max(0, Math.round(Number(xp) || 0));
    this.saveCharacter(char);
    this.emit('character:xp-changed', { charId, xp: char.xp });
  }

  /**
   * Añade o resta puntos de experiencia (PX) a un personaje.
   * @param {string} charId 
   * @param {number} delta 
   */
  applyXpDelta(charId, delta) {
    const char = this.getCharacter(charId);
    if (!char) return;

    const prevXp = Math.max(0, Math.round(Number(char.xp) || 0));
    const numDelta = Math.round(Number(delta) || 0);
    char.xp = Math.max(0, prevXp + numDelta);
    this.saveCharacter(char);
    this.emit('character:xp-changed', { charId, xp: char.xp });
  }

  /**
   * Gasta o recupera un espacio de conjuro de nivel N.
   * @param {string} charId 
   * @param {number} level Nivel del espacio (1-9)
   * @param {number} delta +1 para gastar, -1 para recuperar
   */
  updateSpellSlot(charId, level, delta) {
    const char = this.getCharacter(charId);
    if (!char) return;

    if (!char.spellSlotsState) char.spellSlotsState = {};
    const current = char.spellSlotsState[level] || { max: 0, used: 0 };
    const newUsed = Math.max(0, Math.min(current.max || 99, (current.used || 0) + delta));

    char.spellSlotsState[level] = { ...current, used: newUsed };
    this.saveCharacter(char);
    this.emit('character:spellslot-changed', { charId, level, used: newUsed });
  }

  /**
   * Modifica la cantidad de un consumible rápido (pociones, antorchas, etc.).
   * @param {string} charId 
   * @param {number} index Índice del consumible
   * @param {number} delta Cantidad a sumar o restar
   */
  updateConsumable(charId, index, delta) {
    const char = this.getCharacter(charId);
    if (!char || !char.customConsumables || !char.customConsumables[index]) return;

    const cons = char.customConsumables[index];
    cons.quantity = Math.max(0, (cons.quantity || 0) + delta);
    this.saveCharacter(char);
    this.emit('character:consumable-changed', { charId, index, quantity: cons.quantity });
  }

  /**
   * Modifica los usos de un rasgo de descanso (Furia, Canalizar Divinidad, etc.).
   * @param {string} charId 
   * @param {string} traitName Nombre del rasgo
   * @param {number} delta +1 para gastar uso, -1 para recuperar
   * @param {number} maxUses Máximo de usos disponibles
   */
  updateRestTrait(charId, traitName, delta, maxUses = 1) {
    const char = this.getCharacter(charId);
    if (!char) return;

    if (!char.restTraitsState) char.restTraitsState = {};
    const currentUsed = char.restTraitsState[traitName] || 0;
    const newUsed = Math.max(0, Math.min(maxUses, currentUsed + delta));

    char.restTraitsState[traitName] = newUsed;
    this.saveCharacter(char);
    this.emit('character:trait-changed', { charId, traitName, used: newUsed });
  }

  /**
   * Modifica los Dados de Golpe gastados de un personaje.
   * @param {string} charId 
   * @param {number} delta +1 para gastar 1 dado, -1 para recuperar 1 dado
   */
  updateHitDice(charId, delta) {
    const char = this.getCharacter(charId);
    if (!char) return;

    const currentSpent = Number(char.spentHitDice) || 0;
    const totalHd = Math.max(1, Number(char.level) || 1);
    char.spentHitDice = Math.max(0, Math.min(totalHd, currentSpent + delta));
    this.saveCharacter(char);
    this.emit('character:hp-changed', { charId, spentHitDice: char.spentHitDice });
  }

  /**
   * Marca o desmarca una tirada de salvación contra la muerte (éxito o fallo).
   * @param {string} charId 
   * @param {'success'|'failure'} type 
   * @param {number} idx 1, 2 o 3
   */
  toggleDeathSave(charId, type, idx) {
    const char = this.getCharacter(charId);
    if (!char) return;

    if (!char.deathSaves || typeof char.deathSaves !== 'object') {
      char.deathSaves = { successes: 0, failures: 0 };
    }
    if (type === 'success') {
      char.deathSaves.successes = (char.deathSaves.successes === idx) ? idx - 1 : idx;
    } else {
      char.deathSaves.failures = (char.deathSaves.failures === idx) ? idx - 1 : idx;
    }
    this.saveCharacter(char);
    this.emit('character:hp-changed', { charId, deathSaves: char.deathSaves });
  }

  /**
   * Reinicia a 0 las tiradas de salvación contra la muerte de un personaje.
   * @param {string} charId 
   */
  resetDeathSaves(charId) {
    const char = this.getCharacter(charId);
    if (!char) return;

    char.deathSaves = { successes: 0, failures: 0 };
    this.saveCharacter(char);
    this.emit('character:hp-changed', { charId, deathSaves: char.deathSaves });
  }

  // ==========================================
  // DESCANSO AUTOMATIZADO (REGLAS D&D 5.5)
  // ==========================================

  /**
   * Aplica un Descanso Corto a un personaje o a todos los personajes de la campaña activa.
   * - Restaura recursos de descanso corto (Oleada de Acción, Dados de Superioridad, etc.)
   * - Recupera 1 uso de rasgos clave de D&D 2024: Canalizar Divinidad, Furia, Forma Salvaje, Segundo Aliento.
   * @param {string|null} targetCharId ID del personaje o null para toda la mesa
   */
  applyShortRest(targetCharId = null) {
    const targets = targetCharId
      ? [this.getCharacter(targetCharId)].filter(Boolean)
      : this.getCharactersByCampaign(this.selectedCampaignId);

    targets.forEach(char => {
      if (!char.restTraitsState) char.restTraitsState = {};

      const traits = getConsumableTraitsForCharacter(char);
      traits.forEach(trait => {
        const name = trait.name.toLowerCase();

        // 1. Rasgos que se restablecen por completo en descanso corto
        if (trait.recovery === 'corto' || trait.recovery === 'ambos') {
          char.restTraitsState[trait.name] = 0;
        }

        // 2. Regla D&D 5.5 (2024): Recupera 1 uso gastado en descanso corto
        const recoversOne = 
          name.includes('canalizar') ||
          name.includes('furia') ||
          name.includes('forma salvaje') ||
          name.includes('segundo aliento') ||
          name.includes('aliento');

        if (recoversOne) {
          const currentUsed = char.restTraitsState[trait.name] || 0;
          if (currentUsed > 0) {
            char.restTraitsState[trait.name] = Math.max(0, currentUsed - 1);
          }
        }
      });

      this.saveCharacter(char);
    });

    this.emit('rest:completed', { type: 'short', targetCharId });
  }

  /**
   * Aplica un Descanso Largo a un personaje o a toda la mesa:
   * - Restaura todos los PG al máximo.
   * - Retira PG temporales (tempHp = 0).
   * - Resetea todos los espacios de conjuros a 0 usados.
   * - Restaura todos los rasgos de descanso a 0 usados (Afortunado, Imposición de Manos, etc.).
   * - Otorga automáticamente Inspiración Heroica a los personajes humanos (Rasgo Ingenio 2024).
   * @param {string|null} targetCharId ID del personaje o null para toda la mesa
   */
  applyLongRest(targetCharId = null) {
    const targets = targetCharId
      ? [this.getCharacter(targetCharId)].filter(Boolean)
      : this.getCharactersByCampaign(this.selectedCampaignId);

    targets.forEach(char => {
      // 1. PG al máximo
      const hpInfo = calculateHitPoints(char);
      char.currentHp = hpInfo.maxHp;
      char.temporaryHp = 0;

      // 2. Reiniciar ranuras de conjuro
      if (char.spellSlotsState) {
        Object.keys(char.spellSlotsState).forEach(lvl => {
          if (char.spellSlotsState[lvl]) {
            char.spellSlotsState[lvl].used = 0;
          }
        });
      }

      // 3. Reiniciar todos los rasgos consumibles con usos, dados de golpe y tiradas de muerte
      char.restTraitsState = {};
      char.spentHitDice = 0;
      char.deathSaves = { successes: 0, failures: 0 };

      // 4. Recargar cargas de objetos mágicos (Varitas, Bastones, Artefactos, etc.) según su regla de recuperación
      if (Array.isArray(char.inventory)) {
        char.inventory = char.inventory.map(item => {
          const maxCharges = Number(item.maxCharges) || 0;
          if (maxCharges <= 0) return item;
          const recoveryStr = String(item.chargeRecovery || 'Todas en Descanso Largo').toLowerCase();
          if (recoveryStr.includes('sin recarga') || recoveryStr.includes('consumible')) {
            return item;
          }
          let cur = item.currentCharges !== undefined ? Number(item.currentCharges) : maxCharges;
          const diceMatch = recoveryStr.match(/(\d+)\s*d\s*(\d+)(?:\s*\+\s*(\d+))?/i);
          if (diceMatch) {
            const numDice = parseInt(diceMatch[1], 10) || 1;
            const sides = parseInt(diceMatch[2], 10) || 6;
            const flat = parseInt(diceMatch[3] || '0', 10) || 0;
            let rolled = flat;
            for (let i = 0; i < numDice; i++) {
              rolled += Math.floor(Math.random() * sides) + 1;
            }
            cur = Math.min(maxCharges, cur + rolled);
          } else {
            cur = maxCharges;
          }
          return { ...item, currentCharges: cur };
        });
      }

      // 5. Rasgo de Humano "Ingenio" (D&D 5.5): Recibe Inspiración Heroica tras descanso largo
      if ((char.speciesId || '').toLowerCase() === 'humano') {
        char.heroicInspiration = true;
      }

      this.saveCharacter(char);
    });

    this.emit('rest:completed', { type: 'long', targetCharId });
  }

  /**
   * Modifica las cargas actuales de un objeto del inventario (+1, -1, etc.).
   */
  updateItemCharges(charId, itemId, delta) {
    const char = this.getCharacter(charId);
    if (!char || !Array.isArray(char.inventory)) return;
    const item = char.inventory.find(i => i.id === itemId);
    if (!item) return;
    const maxCharges = Math.max(0, Number(item.maxCharges) || 0);
    const cur = item.currentCharges !== undefined ? Number(item.currentCharges) : maxCharges;
    item.currentCharges = Math.max(0, Math.min(maxCharges, cur + delta));
    this.saveCharacter(char);
  }

  /**
   * Modifica la cantidad de un objeto consumible o sortilegio en el inventario (+1, -1).
   */
  updateInventoryItemQuantity(charId, itemId, delta) {
    const char = this.getCharacter(charId);
    if (!char || !Array.isArray(char.inventory)) return;
    const item = char.inventory.find(i => i.id === itemId);
    if (!item) return;
    const curQty = Math.max(0, Number(item.quantity) || 0);
    item.quantity = Math.max(0, curQty + delta);
    this.saveCharacter(char);
  }

  // ==========================================
  // UTILIDADES DE RESPALDO Y RESETEO
  // ==========================================

  exportState() {
    return {
      campaigns: this.campaigns,
      characters: this.characters,
      selectedCampaignId: this.selectedCampaignId,
      btrsHistory: this.btrsHistory,
      exportedAt: new Date().toISOString(),
      version: '2.0.0-dnd55-btrs'
    };
  }

  importState(parsedData) {
    if (Array.isArray(parsedData.campaigns) && parsedData.campaigns.length > 0) {
      this.campaigns = parsedData.campaigns.map(sanitizeCampaign);
      saveToStorage(STORAGE_KEYS.CAMPAIGNS, this.campaigns);
    }
    if (Array.isArray(parsedData.characters) && parsedData.characters.length > 0) {
      this.characters = parsedData.characters.map(sanitizeCharacter);
      saveToStorage(STORAGE_KEYS.CHARACTERS, this.characters);
    }
    this.selectedCampaignId = this.campaigns[0]?.id || '';
    this.selectedCharacterId = this.characters[0]?.id || '';

    saveToStorage(STORAGE_KEYS.SELECTED_CAMPAIGN, this.selectedCampaignId);
    saveToStorage(STORAGE_KEYS.SELECTED_CHARACTER, this.selectedCharacterId);

    this.emit('campaigns:updated', this.campaigns);
    this.emit('characters:updated', this.characters);
    this.emit('campaign:selected', this.selectedCampaignId);
    this.emit('character:selected', this.getSelectedCharacter());
  }

  resetToDefaults() {
    this.campaigns = DEFAULT_CAMPAIGNS.map(sanitizeCampaign);
    this.characters = DEFAULT_CHARACTERS.map(sanitizeCharacter);
    this.selectedCampaignId = this.campaigns[0]?.id || '';
    this.selectedCharacterId = this.characters[0]?.id || '';

    saveToStorage(STORAGE_KEYS.CAMPAIGNS, this.campaigns);
    saveToStorage(STORAGE_KEYS.CHARACTERS, this.characters);
    saveToStorage(STORAGE_KEYS.SELECTED_CAMPAIGN, this.selectedCampaignId);
    saveToStorage(STORAGE_KEYS.SELECTED_CHARACTER, this.selectedCharacterId);

    this.emit('campaigns:updated', this.campaigns);
    this.emit('characters:updated', this.characters);
    this.emit('campaign:selected', this.selectedCampaignId);
    this.emit('character:selected', this.getSelectedCharacter());
  }

  // ==========================================
  // REPOSITORIO DE FICHEROS (DISCO / DRIVE)
  // ==========================================

  /**
   * Inicializa la conexión automática con el repositorio de archivos guardado previamente en IndexedDB.
   */
  async initRepository() {
    if (fileRepo.isBusy) return;
    try {
      const connected = await fileRepo.initAutoConnect(false);
      if (connected) {
        fileRepo.setBusy(true, `Sincronizando y descargando datos desde "${fileRepo.folderName}"...`);
        const repoData = await fileRepo.loadAllFromFolder();
        if (repoData.success && ((repoData.characters && repoData.characters.length > 0) || (repoData.campaigns && repoData.campaigns.length > 0))) {
          this.importState(repoData);
          showToast(`Sincronizado con la carpeta "${fileRepo.folderName}".`, 'success', 'Repositorio');
        }
      }
    } catch (err) {
      console.warn('[Store] No se pudo inicializar el repositorio de archivos:', err);
    } finally {
      fileRepo.setBusy(false);
    }
  }

  /**
   * Conecta una carpeta local o de Google Drive Desktop mediante File System Access API.
   */
  async connectFileRepository() {
    if (fileRepo.isBusy) {
      showToast('Ya hay una sincronización en curso. Espera a que termine.', 'warning', 'Repositorio Ocupado');
      return { success: false, busy: true };
    }

    if (!fileRepo.isLocalSupported()) {
      const res = await fileRepo.connectFolder();
      if (res.error) showToast(res.error, 'error', 'Error de Carpeta');
      return res;
    }

    const confirmed = await showConfirmModal({
      title: 'Vincular y Sincronizar Carpeta Local',
      message: 'Al sincronizar con la carpeta local, si ésta ya contiene archivos guardados se sobrescribirán las campañas y personajes actuales que tienes en la aplicación. Si la carpeta está vacía, se guardarán en ella tus datos actuales. ¿Deseas continuar?',
      confirmText: 'Seleccionar Carpeta y Sincronizar',
      cancelText: 'Cancelar',
      danger: false,
      icon: 'folder-sync'
    });
    if (!confirmed) {
      return { success: false, cancelled: true };
    }

    fileRepo.setBusy(true, 'Seleccionando y vinculando carpeta local...');
    try {
      const res = await fileRepo.connectFolder();
      if (!res.success) {
        if (!res.cancelled && res.error) {
          showToast(res.error, 'error', 'Error de Carpeta');
        }
        return res;
      }

      // Comprobar si la carpeta ya contiene datos
      fileRepo.setBusy(true, `Descargando y comprobando archivos de "${res.folderName}"...`);
      const existing = await fileRepo.loadAllFromFolder();
      if (existing.success && ((existing.characters && existing.characters.length > 0) || (existing.campaigns && existing.campaigns.length > 0))) {
        this.importState(existing);
        showToast(`Carpeta "${res.folderName}" vinculada. Se han cargado ${existing.characters?.length || 0} personajes.`, 'success', 'Repositorio Conectado');
      } else {
        // Carpeta nueva/vacía: volcar el estado actual completo
        fileRepo.setBusy(true, `Guardando tus personajes y campañas en "${res.folderName}"...`);
        await fileRepo.exportAllToFolder(this.exportState());
        showToast(`Carpeta "${res.folderName}" vinculada. Todos los datos se han guardado en sus ficheros.`, 'success', 'Repositorio Conectado');
      }

      return res;
    } finally {
      fileRepo.setBusy(false);
    }
  }

  /**
   * Conecta con Google Drive mediante OAuth2 (compatible con Firefox, Safari y móviles).
   */
  async connectGoogleDrive(clientId = null) {
    if (fileRepo.isBusy) {
      showToast('Ya hay una conexión o sincronización en curso. Espera a que termine.', 'warning', 'Google Drive');
      return { success: false, busy: true };
    }

    const effectiveClientId = (clientId || fileRepo.gdrive.clientId || '').trim();
    if (!effectiveClientId) {
      const error = 'Introduce tu Client ID de Google Cloud OAuth para conectar directamente con Google Drive.';
      showToast(error, 'error', 'Google Drive');
      return { success: false, requiresClientId: true, error };
    }

    try {
      fileRepo.setBusy(true, 'Preparando conexión con Google Drive...');
      await fileRepo.preloadGoogleIdentity();
    } catch (err) {
      fileRepo.setBusy(false);
      const error = err.message || 'No se pudo cargar el cliente de Google Identity.';
      showToast(error, 'error', 'Google Drive');
      return { success: false, error };
    } finally {
      fileRepo.setBusy(false);
    }

    const confirmed = await showConfirmModal({
      title: 'Conectar y Sincronizar con Google Drive',
      message: 'Al sincronizar con Google Drive, si el repositorio en la nube ("DnD Master Hub") ya contiene datos se sobrescribirán las campañas y personajes actuales que tienes en la aplicación. Si está vacío, se subirán tus datos actuales. ¿Deseas continuar?',
      confirmText: 'Conectar y Sincronizar',
      cancelText: 'Cancelar',
      danger: false,
      icon: 'cloud'
    });
    if (!confirmed) {
      return { success: false, cancelled: true };
    }

    fileRepo.setBusy(true, 'Conectando con Google Drive...');
    try {
      const res = await fileRepo.connectGoogleDrive(effectiveClientId);
      if (!res.success) {
        if (!res.cancelled && res.error) showToast(res.error, 'error', 'Google Drive');
        return res;
      }

      fileRepo.setBusy(true, 'Descargando campañas y personajes desde Google Drive...');
      const existing = await fileRepo.loadAllFromFolder();
      if (existing.success && ((existing.characters && existing.characters.length > 0) || (existing.campaigns && existing.campaigns.length > 0))) {
        this.importState(existing);
        showToast(`Google Drive vinculado. Se han cargado ${existing.characters?.length || 0} personajes.`, 'success', 'Google Drive');
      } else {
        fileRepo.setBusy(true, 'Subiendo campañas y personajes a Google Drive...');
        await fileRepo.exportAllToFolder(this.exportState());
        showToast('Google Drive vinculado. Tus personajes se han subido a la carpeta "DnD Master Hub".', 'success', 'Google Drive');
      }
      return res;
    } finally {
      fileRepo.setBusy(false);
    }
  }

  /**
   * Desvincula la carpeta del repositorio.
   */
  async disconnectFileRepository() {
    if (fileRepo.isBusy) return;
    await fileRepo.disconnectFolder();
    showToast('Carpeta desconectada. Los cambios continuarán guardándose en la caché del navegador.', 'info', 'Repositorio Desconectado');
  }

  /**
   * Fuerza el volcado de todos los datos en memoria hacia los ficheros físicos.
   */
  async syncAllToFileRepository() {
    if (fileRepo.isBusy) return false;
    if (!fileRepo.isConnected) {
      showToast('No hay ninguna carpeta vinculada.', 'warning', 'Repositorio');
      return false;
    }
    const repoLabel = fileRepo.repoType === 'gdrive' ? 'Google Drive' : `la carpeta "${fileRepo.folderName}"`;
    fileRepo.setBusy(true, `Guardando y sobrescribiendo todos los datos en ${repoLabel}...`);
    try {
      const success = await fileRepo.exportAllToFolder(this.exportState());
      if (success) {
        showToast('Todos los personajes y campañas se han guardado en los ficheros del repositorio.', 'success', 'Repositorio Actualizado');
      } else {
        showToast('Error al escribir en el repositorio.', 'error', 'Error');
      }
      return success;
    } finally {
      fileRepo.setBusy(false);
    }
  }

  /**
   * Recarga todos los datos desde los ficheros de la carpeta vinculada.
   */
  async loadAllFromFileRepository() {
    if (fileRepo.isBusy) return false;
    if (!fileRepo.isConnected) {
      showToast('No hay ninguna carpeta vinculada.', 'warning', 'Repositorio');
      return false;
    }
    const repoLabel = fileRepo.repoType === 'gdrive' ? 'Google Drive' : `la carpeta "${fileRepo.folderName}"`;
    fileRepo.setBusy(true, `Descargando datos desde ${repoLabel}...`);
    try {
      const res = await fileRepo.loadAllFromFolder();
      if (res.success) {
        this.importState(res);
        showToast(`Datos recargados desde el repositorio (${res.characters?.length || 0} PJs).`, 'success', 'Repositorio');
        return true;
      } else {
        showToast(res.error || 'Error leyendo los ficheros.', 'error', 'Error');
        return false;
      }
    } finally {
      fileRepo.setBusy(false);
    }
  }

  showToast(message, type = 'info', title = '') {
    showToast(message, type, title);
  }
}

// Instancia singleton compartida entre todos los módulos
export const store = new AppStore();
