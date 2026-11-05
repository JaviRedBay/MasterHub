/**
 * Utilidad de exportación y auto-rellenado de PDF Oficial D&D 5.5 (PHB 2024)
 * Utiliza la plantilla AcroForm 'Hoja_personaje.pdf'
 * con la biblioteca pdf-lib en el cliente.
 */

import {
  calculateFinalAbilityScores,
  calculateArmorClass,
  calculateHitPoints,
  calculateInitiative,
  calculateSpeed,
  calculateSavingThrows,
  calculateSkills,
  calculateSpellcasting,
  calculatePassivePerception,
  getCharacterSpellSlots,
  getProficiencyBonus,
  getAbilityModifier,
  getAbilityShortName,
  getSpeciesName,
  getSublineageName,
  getBackgroundName,
  getClassName,
  getSubclassName,
  getCharacterFullClassTitle,
  getCharacterHitDicePool,
  getClassLevel,
  getResolvedFeatsForCharacter,
  getResolvedCharacterFeatures,
  getCharacterProficiencies,
  getActiveStatModifiers,
  findCanonicalWeapon,
  characterHasFeat,
  formatModifier,
  DND55_CLASSES,
  DND55_SPECIES,
  DND55_WEAPONS,
  DND55_CANONICAL_SPELLS
} from '../constants/dnd55Rules.js';

/**
 * Acorta tiempos de lanzamiento para la plantilla oficial imprimible (A4/PDF):
 * "1 acción" -> "Acc", "1 acción adicional" -> "Ac Ad", "1 reacción" -> "Reac", "1 minuto" -> "1 min", etc.
 */
export function formatPdfCastingTime(str) {
  if (!str) return '';
  let s = String(str).trim();

  // Acción adicional / bonus action
  s = s.replace(/1\s*acci[oó]n\s+adicional/gi, 'Ac Ad');
  s = s.replace(/acci[oó]n\s+adicional/gi, 'Ac Ad');
  s = s.replace(/1\s*bonus\s*action/gi, 'Ac Ad');
  s = s.replace(/bonus\s*action/gi, 'Ac Ad');

  // Reacción / reaction
  s = s.replace(/1\s*reacci[oó]n/gi, 'Reac');
  s = s.replace(/reacci[oó]n/gi, 'Reac');
  s = s.replace(/1\s*reaction/gi, 'Reac');
  s = s.replace(/reaction/gi, 'Reac');

  // Acción / action
  s = s.replace(/1\s*acci[oó]n/gi, 'Acc');
  s = s.replace(/acci[oó]n/gi, 'Acc');
  s = s.replace(/1\s*action/gi, 'Acc');
  s = s.replace(/action/gi, 'Acc');

  // Unidades de tiempo
  s = s.replace(/(\d+)\s*minutos?/gi, '$1 min');
  s = s.replace(/(\d+)\s*horas?/gi, '$1 h');
  s = s.replace(/(\d+)\s*segundos?/gi, '$1 s');
  s = s.replace(/(\d+)\s*d[ií]as?/gi, '$1 d');

  return s.trim();
}

/**
 * Acorta distancias estándar (metros -> m, kilómetros -> km, etc.)
 */
export function shortenDistance(rangeStr) {
  if (!rangeStr) return '';
  let s = String(rangeStr).trim();

  s = s.replace(/kil[oó]metros?/gi, 'km');
  s = s.replace(/metros?/gi, 'm');
  s = s.replace(/Alcance del arma/gi, 'Arma');
  s = s.replace(/Recorrido visible/gi, 'Visual');
  s = s.replace(/Vista/gi, 'Visual');
  s = s.replace(/esferas?/gi, 'esf.');
  s = s.replace(/l[ií]neas?/gi, 'lín.');
  s = s.replace(/cilindros?/gi, 'cil.');
  s = s.replace(/cuadrados?/gi, 'cuad.');

  return s.trim();
}

/**
 * Procesa un conjuro para la hoja oficial imprimible:
 * - Tiempos de lanzamiento acortados ("Acc", "Ac Ad", "1 min", etc.)
 * - Distancias acortadas (metros -> m, etc.)
 * - Si es una emanación sobre uno mismo: distancia = "Personal", y la distancia de la emanación se indica en la descripción.
 */
export function formatPdfSpell(sp) {
  if (!sp) {
    return {
      name: '',
      level: '',
      castingTime: '',
      range: '',
      description: ''
    };
  }

  let spObj = sp;
  if (typeof sp === 'string') {
    const raw = sp.toLowerCase();
    const found = DND55_CANONICAL_SPELLS.find(cs => 
      cs.name.toLowerCase() === raw || 
      cs.id === raw || 
      (cs.aliases && cs.aliases.some(a => a.toLowerCase() === raw))
    );
    spObj = found ? { ...found } : { name: sp, level: '', castingTime: '', range: '', description: '' };
  } else if (typeof sp === 'object') {
    const spId = sp.id ? sp.id.toLowerCase() : '';
    const spName = sp.name ? sp.name.toLowerCase() : '';
    const found = DND55_CANONICAL_SPELLS.find(cs => 
      (spId && cs.id === spId) || 
      (spName && cs.name.toLowerCase() === spName) || 
      (spName && cs.aliases && cs.aliases.some(a => a.toLowerCase() === spName))
    );
    if (found) {
      spObj = { ...found, ...sp };
    }
  }

  const name = spObj.name || '';
  const level = spObj.level !== undefined && spObj.level !== null ? (spObj.level === 0 ? '0' : String(spObj.level)) : '';
  const castingTime = formatPdfCastingTime(spObj.castingTime || '');
  let range = String(spObj.range || '').trim();
  let desc = String(spObj.description || '').trim();

  // Detección de emanación (en rango o en descripción)
  let isEmanation = false;
  let emanationDist = '';

  const emanationRangeMatch = range.match(/(?:aura|radio|emanaci[oó]n)\s+(?:de\s+)?(\d+(?:[.,]\d+)?)\s*(?:metros?|m)/i);
  if (emanationRangeMatch) {
    isEmanation = true;
    emanationDist = `${emanationRangeMatch[1].replace('.', ',')} m`;
  } else {
    const emanationDescMatch = desc.match(/emanaci[oó]n\s+(?:de\s+)?(\d+(?:[.,]\d+)?)\s*(?:metros?|m)/i);
    if (emanationDescMatch) {
      isEmanation = true;
      emanationDist = `${emanationDescMatch[1].replace('.', ',')} m`;
    }
  }

  if (isEmanation) {
    // Si es emanación sobre uno mismo, la distancia es "Personal"
    range = 'Personal';
    const tag = `[Emanación: ${emanationDist}]`;
    if (!desc.includes(tag) && !desc.includes('[Emanación')) {
      desc = desc ? `${tag} ${desc}` : tag;
    }
  } else {
    range = shortenDistance(range);
  }

  return {
    name,
    level,
    castingTime,
    range,
    description: desc
  };
}

function applyTextFieldValue(field, value, lib = null, fontSize = null) {
  if (!field || value === undefined || value === null) return;
  const strVal = String(value);

  if (typeof field.disableScrolling === 'function') {
    try {
      field.disableScrolling();
    } catch (_) {}
  }
  if (fontSize !== null && typeof field.setFontSize === 'function') {
    try {
      field.setFontSize(fontSize);
    } catch (_) {}
  }

  // En algunos campos de la plantilla (como Temp HP), el widget hijo tiene un /V propio ("123456")
  // distinto del diccionario del campo padre. Solo debemos borrar /V en el widget si es un objeto
  // separado del campo (w.dict !== field.acroField.dict), ANTES de asignar el nuevo valor.
  const widgets = field.acroField?.getWidgets ? field.acroField.getWidgets() : [];
  if (lib && lib.PDFName) {
    for (const w of widgets) {
      if (w.dict !== field.acroField.dict) {
        w.dict.delete(lib.PDFName.of('V'));
      }
    }
  }

  field.setText(strVal);

  // Si el valor a escribir es vacío, asegurarnos de limpiar cualquier /V residual
  if (strVal === '' && lib && lib.PDFName) {
    for (const w of widgets) {
      w.dict.delete(lib.PDFName.of('V'));
    }
    field.acroField.dict.delete(lib.PDFName.of('V'));
  }
}

function safeSetTextField(form, name, value, lib = null, fontSize = null) {
  try {
    const field = form.getTextField(name);
    applyTextFieldValue(field, value, lib, fontSize);
  } catch (e) {
    // Campo no existe o es de otro tipo en el PDF
  }
}

/**
 * Obtiene todos los campos de texto de una columna de la tabla de conjuros
 * (p. ej. "SPELL LEVEL", "SPELL NAME", "CASTING TIME", "RANGE", "SPELL NOTES")
 * ordenados visualmente de arriba hacia abajo según su coordenada Y en el PDF.
 * Esto corrige el desorden de sufijos numéricos de la plantilla original.
 */
function getSortedSpellColumnFields(form, prefix) {
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^${escaped}\\d*$`);
  const matching = form.getFields().filter(f => regex.test(f.getName()) && typeof f.setText === 'function');
  return matching.sort((a, b) => {
    const wa = a.acroField?.getWidgets ? a.acroField.getWidgets()[0] : null;
    const wb = b.acroField?.getWidgets ? b.acroField.getWidgets()[0] : null;
    const ya = (wa && typeof wa.getRectangle === 'function') ? wa.getRectangle().y : 0;
    const yb = (wb && typeof wb.getRectangle === 'function') ? wb.getRectangle().y : 0;
    return yb - ya; // Mayor Y = más arriba en la página PDF
  });
}

function safeCheck(form, name, shouldCheck) {
  try {
    const field = form.getCheckBox(name);
    if (field) {
      if (shouldCheck) {
        field.check();
      } else {
        field.uncheck();
      }
    }
  } catch (e) {
    // Checkbox no existe
  }
}

/**
 * Carga la plantilla PDF oficial y rellena todos sus campos AcroForm con los datos del personaje.
 * @param {Object} char - Datos del personaje de D&D 5.5
 * @returns {Promise<Uint8Array>} Bytes del PDF rellenado
 */
export async function generateFilledDndPdfBytes(char) {
  const lib = (typeof window !== 'undefined' && window.PDFLib) || (typeof PDFLib !== 'undefined' ? PDFLib : null) || (typeof globalThis !== 'undefined' ? globalThis.PDFLib : null);
  if (!lib) {
    throw new Error('La biblioteca PDFLib no está cargada. Asegúrate de tener el archivo js/vendor/pdf-lib.min.js o conexión a Internet.');
  }

  const { PDFDocument } = lib;
  const pdfTemplateUrl = encodeURI('Hoja_personaje.pdf');
  
  const response = await fetch(pdfTemplateUrl);
  if (!response.ok) {
    throw new Error(`No se pudo cargar la plantilla PDF: ${response.status} ${response.statusText}`);
  }
  const templateBytes = await response.arrayBuffer();

  const pdfDoc = await PDFDocument.load(new Uint8Array(templateBytes), { ignoreEncryption: true });
  const form = pdfDoc.getForm();

  // Desactivar scroll en todos los campos para formato de impresión y limpiar residuos (/V)
  try {
    const allFields = form.getFields();
    for (const f of allFields) {
      if (typeof f.disableScrolling === 'function') {
        try {
          f.disableScrolling();
        } catch (_) {}
      }
      if (typeof f.getText === 'function') {
        const widgets = f.acroField.getWidgets ? f.acroField.getWidgets() : [];
        for (const w of widgets) {
          if (w.dict !== f.acroField.dict) {
            w.dict.delete(lib.PDFName.of('V'));
          }
        }
      }
    }
  } catch (e) {
    console.warn('Advertencia configurando campos de la plantilla PDF:', e);
  }

  // 1. Cálculos de Reglas D&D 5.5
  const scores = calculateFinalAbilityScores(char);
  const acInfo = calculateArmorClass(char);
  const hpInfo = calculateHitPoints(char);
  const initInfo = calculateInitiative(char);
  const speedInfo = calculateSpeed(char);
  const saves = calculateSavingThrows(char);
  const skills = calculateSkills(char);
  const spellInfo = calculateSpellcasting(char);
  const spellSlots = getCharacterSpellSlots(char, char.spellSlotsState);
  const pb = getProficiencyBonus(char.level);
  const resolvedFeats = getResolvedFeatsForCharacter(char);
  const resolvedFeatures = getResolvedCharacterFeatures(char);
  const profs = getCharacterProficiencies(char);
  const passPerc = calculatePassivePerception(char);

  const speciesName = getSpeciesName(char.speciesId);
  const sublineageName = getSublineageName(char.speciesId, char.sublineageId);
  const fullSpecies = sublineageName ? `${speciesName} (${sublineageName})` : speciesName;
  const backgroundName = getBackgroundName(char);
  const className = getClassName(char.classId);
  const subclassName = getSubclassName(char.subclassId);
  const fullClass = getCharacterFullClassTitle(char);
  const classDef = DND55_CLASSES.find(c => c.id === char.classId);

  // 2. Encabezado e Identidad
  safeSetTextField(form, 'Name', char.name || '');
  safeSetTextField(form, 'Class', fullClass);
  safeSetTextField(form, 'Subclass', subclassName || '');
  safeSetTextField(form, 'Level', String(char.level || 1));
  safeSetTextField(form, 'Species', fullSpecies);
  safeSetTextField(form, 'Background', backgroundName);
  safeSetTextField(form, 'Alignment', char.alignment || 'Neutral');
  const speciesDef = DND55_SPECIES.find(s => s.id === char.speciesId);
  const charSize = speciesDef?.size || 'Mediano';
  safeSetTextField(form, 'SIZE', charSize);
  safeSetTextField(form, 'XP Points', '');
  safeSetTextField(form, 'PROF BONUS', `+${pb}`);
  safeCheck(form, 'Check Heroic Insp', Boolean(char.heroicInspiration));

  // 3. Características y Modificadores
  const abMap = {
    str: { score: 'STR SCORE', mod: 'STR MOD', save: 'STR SAVE', chk: 'Check TR Str' },
    dex: { score: 'DEX SCORE', mod: 'DEX MOD', save: 'DEX SAVE', chk: 'Check TR DEX' },
    con: { score: 'CON SCORE', mod: 'CON MOD', save: 'CON SAVE', chk: 'Check TR CON' },
    int: { score: 'INT SCORE', mod: 'INT MOD', save: 'INT SAVE', chk: 'Check TR INT' },
    wis: { score: 'WIS SCORE', mod: 'WIS MOD', save: 'WIS SAVE', chk: 'Check TR WIS' },
    cha: { score: 'CHA SCORE', mod: 'CHA MOD', save: 'CHA SAVE', chk: 'Check TR CAR' }
  };

  Object.entries(abMap).forEach(([key, fields]) => {
    const sc = scores[key] || 10;
    const md = getAbilityModifier(sc);
    const sv = saves[key] || { bonus: md, isProficient: false };
    const svVal = sv.bonus !== undefined ? sv.bonus : (sv.value !== undefined ? sv.value : md);

    safeSetTextField(form, fields.score, String(sc));
    safeSetTextField(form, fields.mod, formatModifier(md));
    safeSetTextField(form, fields.save, formatModifier(svVal));
    safeCheck(form, fields.chk, Boolean(sv.isProficient));
  });

  // 4. Combate Principal
  safeSetTextField(form, 'Armor Class', String(acInfo.acDisplay || acInfo.ac));
  safeCheck(form, 'shield chk', Boolean(acInfo.hasShield));
  safeSetTextField(form, 'init', formatModifier(initInfo.bonus));
  safeSetTextField(form, 'SPEED', `${speedInfo.speed} m`);
  safeSetTextField(form, 'Max HP', String(hpInfo.maxHp));
  safeSetTextField(form, 'Current HP', String(char.currentHp !== null && char.currentHp !== undefined ? char.currentHp : hpInfo.maxHp));
  safeSetTextField(form, 'Temp HP', (char.temporaryHp && Number(char.temporaryHp) > 0) ? String(char.temporaryHp) : '', lib);
  const hdPool = getCharacterHitDicePool(char);
  safeSetTextField(form, 'Max HD', hdPool.summaryText);
  safeSetTextField(form, 'Spent HD', String(hdPool.spentHd || 0));
  safeSetTextField(form, 'PASSIVE PERCEPTION', String(passPerc));

  // 5. Competencias de Armadura
  safeCheck(form, 'Check Light Armor', Boolean(profs.hasLightArmor));
  safeCheck(form, 'Check Medium Armor', Boolean(profs.hasMediumArmor));
  safeCheck(form, 'Check Heavy Armor', Boolean(profs.hasHeavyArmor));
  safeCheck(form, 'Check Shield', Boolean(profs.hasShield));

  // 6. 18 Habilidades Oficiales
  const skillFieldMap = {
    'Acrobacias': { text: 'ACROBATICS', chk: 'Check Acrobatics' },
    'Arcanos': { text: 'ARCANE', chk: 'Check Arcane' },
    'Atletismo': { text: 'ATHLETICS', chk: 'Check Athletics' },
    'Engaño': { text: 'DECEPTION', chk: 'Check Deception' },
    'Historia': { text: 'HISTORY', chk: 'Check History' },
    'Interpretación': { text: 'PERFORMANCE', chk: 'Check Performance' },
    'Intimidación': { text: 'INTIMIDATE', chk: 'Check Intimidate' },
    'Investigación': { text: 'INVESTIGATION', chk: 'Check Investigation' },
    'Juego de manos': { text: 'SLEIGHT OF HAND', chk: 'Check Sleight of Hand' },
    'Medicina': { text: 'MEDICINE', chk: 'Check Medicine' },
    'Naturaleza': { text: 'NATURE', chk: 'Check Nature' },
    'Percepción': { text: 'PERCEPTION', chk: 'Check Perception' },
    'Perspicacia': { text: 'INSIGHT', chk: 'Check Insight' },
    'Persuasión': { text: 'PERSUASION', chk: 'Check Persuasion' },
    'Religión': { text: 'RELIGION', chk: 'Check Religion' },
    'Sigilo': { text: 'STEALTH', chk: 'Check Stealth' },
    'Supervivencia': { text: 'SURVIVAL', chk: 'Check Survival' },
    'Trato con animales': { text: 'ANIMAL HANDLING', chk: 'Check Animals' }
  };

  Object.entries(skillFieldMap).forEach(([skName, f]) => {
    const sData = skills[skName] || {};
    const bonus = sData.bonus !== undefined ? sData.bonus : (sData.value !== undefined ? sData.value : 0);
    const isTrained = sData.proficiency && sData.proficiency !== 'none';

    safeSetTextField(form, f.text, formatModifier(bonus));
    safeCheck(form, f.chk, Boolean(isTrained));
  });

  // 7. Armas Equipadas (Hasta 6 armas)
  const equippedWeapons = [];
  if (Array.isArray(char.inventory)) {
    char.inventory.forEach(item => {
      const isWpn = item.isEquipped && (item.category === 'arma' || item.weaponType || DND55_WEAPONS.some(w => w.id === item.id));
      if (isWpn) equippedWeapons.push(item);
    });
  }
  if (equippedWeapons.length === 0 && char.equippedWeapons && char.equippedWeapons.length > 0) {
    char.equippedWeapons.forEach(wId => {
      const found = DND55_WEAPONS.find(w => w.id === wId);
      if (found) equippedWeapons.push(found);
    });
  }

  const activeModsForWpns = getActiveStatModifiers(char);
  const hasGwmFeat = characterHasFeat(char, 'gwm') || characterHasFeat(char, 'gran maestro de las armas') || characterHasFeat(char, 'maestro en armas pesadas');

  for (let i = 0; i < 6; i++) {
    const num = i + 1;
    const w = equippedWeapons[i];
    if (w) {
      const baseW = findCanonicalWeapon(w.weaponType || w.id || w.name) || DND55_WEAPONS.find(dw => dw.id === (w.weaponType || w.id)) || w;
      const props = Array.isArray(w.properties) && w.properties.length > 0 ? w.properties : (baseW.properties || []);
      const propLow = props.map(p => p.toLowerCase());
      const isFinesse = propLow.some(p => p.includes('sutil'));
      const isHeavy = propLow.some(p => p.includes('pesada'));
      const isTwoHanded = propLow.some(p => p.includes('dos manos'));
      const isReach = propLow.some(p => p === 'alcance' || p.includes('alcance'));
      const isRanged = baseW.rangeType === 'ranged' || propLow.some(p => p.includes('munición') || p.includes('municion'));
      const strMod = getAbilityModifier(scores.str);
      const dexMod = getAbilityModifier(scores.dex);
      const chosenMod = (isRanged || ((isFinesse || (getClassLevel(char, 'monje') >= 1 && !isHeavy && !isTwoHanded)) && dexMod > strMod)) ? dexMod : strMod;

      let extraAtk = 0;
      let extraDmg = 0;
      if (hasGwmFeat && isHeavy) extraDmg += pb;
      if (char.fightingStyle === 'arqueria' && isRanged) extraAtk += 2;
      if ((char.fightingStyle === 'duelista' || char.fightingStyle === 'duelo') && !isRanged && !isTwoHanded) extraDmg += 2;
      activeModsForWpns.forEach(m => {
        if (m.target === 'attackBonus' && m.mode === 'bonus') extraAtk += m.value;
        if (m.target === 'damageBonus' && m.mode === 'bonus') extraDmg += m.value;
      });

      const atkBonus = chosenMod + pb + (Number(w.magicBonus) || 0) + extraAtk;
      const dmgBonus = chosenMod + (Number(w.magicBonus) || 0) + extraDmg;
      const dmgDie = w.damage || baseW.damage || '1d6';
      const dmgType = w.damageType || baseW.damageType || '';
      const dmgStr = `${dmgDie} ${dmgBonus >= 0 ? `+${dmgBonus}` : dmgBonus} ${dmgType}`.trim();

      let rangeStr = isRanged ? '24/96 m' : (isReach ? '3 m' : '1,5 m');
      const ammoProp = props.find(p => /\(\d+\/\d+\s*m\)/i.test(p));
      if (ammoProp) {
        const m = ammoProp.match(/\((\d+\/\d+\s*m)\)/i);
        if (m) rangeStr = isRanged ? m[1] : `${isReach ? '3 m' : '1,5 m'} (${m[1]})`;
      }
      const masteryStr = w.masteryProperty || baseW.masteryProperty || baseW.mastery || '';
      const notes = [
        masteryStr && masteryStr !== 'Ninguna' ? `Maestría: ${masteryStr}` : null,
        `Alc: ${rangeStr}`,
        props.join(', '),
        hasGwmFeat && isHeavy ? `GWM (+${pb})` : null
      ].filter(Boolean).join(' | ');

      safeSetTextField(form, `NAME - WEAPON ${num}`, w.name || baseW.name || '');
      safeSetTextField(form, `BONUS/DC - WEAPON ${num}`, formatModifier(atkBonus));
      safeSetTextField(form, `DAMAGE/TYPE - WEAPON ${num}`, dmgStr);
      safeSetTextField(form, `NOTES - WEAPON ${num}`, notes);
    } else {
      safeSetTextField(form, `NAME - WEAPON ${num}`, '');
      safeSetTextField(form, `BONUS/DC - WEAPON ${num}`, '');
      safeSetTextField(form, `DAMAGE/TYPE - WEAPON ${num}`, '');
      safeSetTextField(form, `NOTES - WEAPON ${num}`, '');
    }
  }

  // 8. Rasgos de Clase y Elecciones (con descripciones completas, sin separadores de bloque)
  const classFeatureLines = [];
  if (resolvedFeatures.classChoices && resolvedFeatures.classChoices.length > 0) {
    resolvedFeatures.classChoices.forEach(c => {
      const desc = c.description ? `: ${c.description}` : '';
      classFeatureLines.push(`• ${c.featureName} (${c.choiceName})${desc}`);
    });
  }
  if (resolvedFeatures.fightingStyle) {
    const fsDesc = resolvedFeatures.fightingStyle.description ? `: ${resolvedFeatures.fightingStyle.description}` : '';
    classFeatureLines.push(`• Estilo de Combate: ${resolvedFeatures.fightingStyle.name}${fsDesc}`);
  }
  if (resolvedFeatures.subclass) {
    (resolvedFeatures.subclass.features || []).forEach(sf => {
      const sfDesc = sf.description ? `: ${sf.description}` : '';
      classFeatureLines.push(`• (Nv ${sf.level}) ${sf.name}${sfDesc}`);
    });
  }
  if (resolvedFeatures.coreClassFeatures && resolvedFeatures.coreClassFeatures.length > 0) {
    resolvedFeatures.coreClassFeatures.forEach(cf => {
      const cfDesc = cf.description ? `: ${cf.description}` : '';
      classFeatureLines.push(`• (Nv ${cf.level}) ${cf.name}${cfDesc}`);
    });
  }

  // Dividir entre CLASS FEATURES 1 y 2
  const half = Math.ceil(classFeatureLines.length / 2);
  const featCol1 = classFeatureLines.slice(0, half).join('\n\n');
  const featCol2 = classFeatureLines.slice(half).join('\n\n');
  safeSetTextField(form, 'CLASS FEATURES 1', featCol1, lib, 7.5);
  safeSetTextField(form, 'CLASS FEATURES 2', featCol2, lib, 7.5);

  // 9. Rasgos de Especie
  const speciesLines = [];
  (resolvedFeatures.speciesTraits || []).forEach(t => {
    speciesLines.push(`• ${t.name}: ${t.description}`);
  });
  safeSetTextField(form, 'SPECIES TRAITS', speciesLines.join('\n'), lib, 8);

  // 10. Dotes, Dones y Bendiciones (sin descripciones para optimizar espacio y legibilidad en impresión)
  const featLines = [];
  resolvedFeats.forEach(f => {
    let line = `• ${f.name} (${f.categoryLabel || 'Dote'})`;
    if (f.choices && f.choices.length > 0) {
      line += `: ${f.choices.join(', ')}`;
    }
    featLines.push(line);
  });
  if (Array.isArray(char.specialAbilities)) {
    char.specialAbilities.filter(sa => sa.isActive !== false).forEach(sa => {
      let line = `• [${sa.source || 'Bendición/Don'}] ${sa.name}`;
      if (sa.statModifiers && sa.statModifiers.length > 0) {
        const mods = sa.statModifiers.map(m => `${m.value > 0 ? `+${m.value}` : m.value} ${m.target || ''}`).join(', ');
        line += ` (${mods})`;
      }
      featLines.push(line);
    });
  }
  safeSetTextField(form, 'FEATS', featLines.join('\n'), lib, 8.5);

  // 11. Equipo, Monedas y Sintonía
  const equipLines = [];
  const attuned = [];
  if (Array.isArray(char.inventory)) {
    char.inventory.forEach(item => {
      const eqTag = item.isEquipped ? ' [Equipado]' : '';
      const qtyTag = item.quantity && item.quantity > 1 ? ` (x${item.quantity})` : '';
      equipLines.push(`• ${item.name}${qtyTag}${eqTag}${item.weight ? ` - ${item.weight} kg` : ''}`);
      if (item.requiresAttunement && item.isAttuned) {
        attuned.push(item.name);
      }
    });
  }
  safeSetTextField(form, 'EQUIPMENT', equipLines.join('\n'), lib, 8);
  safeSetTextField(form, 'GP', String(char.currency?.gp ?? '0'));
  safeSetTextField(form, 'SP', String(char.currency?.sp ?? '0'));
  safeSetTextField(form, 'CP', String(char.currency?.cp ?? '0'));
  safeSetTextField(form, 'EP', String(char.currency?.ep ?? '0'));
  safeSetTextField(form, 'PP', String(char.currency?.pp ?? '0'));
  safeSetTextField(form, 'ATTUNMENT 1', attuned[0] || '');
  safeSetTextField(form, 'ATTUNMENT 2', attuned[1] || '');
  safeSetTextField(form, 'ATTUNMENT 3', attuned[2] || '');

  // 12. Idiomas y Otras Competencias
  const toolProfList = Array.isArray(char.tools)
    ? char.tools
    : (profs.toolProficiencies || []);
  safeSetTextField(form, 'LANGUAGES', (char.languages || []).join(', '), lib, 8);
  safeSetTextField(form, 'WEAPON PROF', profs.weaponProficiencies.join(', '), lib, 8);
  safeSetTextField(form, 'TOOL PROF', toolProfList.join(', '), lib, 8);

  // 13. Aspecto Físico
  const app = char.appearance || {};
  const appearanceLines = [];
  const physicalStats = [];
  const ageVal = app.age || char.age;
  const genderVal = app.gender || char.gender;
  const heightVal = app.height || char.height;
  const weightVal = app.weight || char.weight;
  const eyesVal = app.eyes || char.eyes;
  const skinVal = app.skin || char.skin;
  const hairVal = app.hair || char.hair;

  if (ageVal) physicalStats.push(`Edad: ${ageVal}`);
  if (genderVal) physicalStats.push(`Género: ${genderVal}`);
  if (heightVal) physicalStats.push(`Altura: ${heightVal}`);
  if (weightVal) physicalStats.push(`Peso: ${weightVal}`);
  if (eyesVal) physicalStats.push(`Ojos: ${eyesVal}`);
  if (skinVal) physicalStats.push(`Piel: ${skinVal}`);
  if (hairVal) physicalStats.push(`Cabello: ${hairVal}`);

  if (physicalStats.length > 0) {
    appearanceLines.push(physicalStats.join(' | '));
  }
  const descVal = app.description || char.description || char.appearanceNotes;
  if (descVal) {
    if (appearanceLines.length > 0) appearanceLines.push('');
    appearanceLines.push(descVal);
  }
  safeSetTextField(form, 'APPEARANCE', appearanceLines.join('\n').trim(), lib, 8);

  // 14. Historia y Personalidad
  const pers = char.personality || {};
  const backstoryLines = [];
  const traitsVal = pers.traits || char.personalityTraits;
  const idealsVal = pers.ideals || char.ideals;
  const bondsVal = pers.bonds || char.bonds;
  const flawsVal = pers.flaws || char.flaws;

  if (traitsVal) backstoryLines.push(`• RASGOS: ${traitsVal}`);
  if (idealsVal) backstoryLines.push(`• IDEALES: ${idealsVal}`);
  if (bondsVal) backstoryLines.push(`• VÍNCULOS: ${bondsVal}`);
  if (flawsVal) backstoryLines.push(`• DEFECTOS: ${flawsVal}`);
  if (char.allies) backstoryLines.push(`• ALIADOS: ${char.allies}`);
  if (char.backstory) {
    if (backstoryLines.length > 0) backstoryLines.push('');
    backstoryLines.push(`HISTORIA:\n${char.backstory}`);
  }
  safeSetTextField(form, 'BACKSTORY / PERSONALITY', backstoryLines.join('\n').trim(), lib, 7.5);

  // 13. Magia y Lanzamiento de Conjuros
  if (spellInfo) {
    safeSetTextField(form, 'SPELLCASTING ABILITY', spellInfo.abilityName || getAbilityFullName(spellInfo.abilityKey), lib, 9);
    safeSetTextField(form, 'SPELL SAVE DC', String(spellInfo.spellSaveDc), lib, 12);
    safeSetTextField(form, 'SPELL ATTACK BONUS', formatModifier(spellInfo.spellAttackBonus), lib, 12);
    const spellModStr = formatModifier(spellInfo.abilityModifier);
    safeSetTextField(form, 'SPELLCASTING MOD', spellModStr, lib, 11);
    safeSetTextField(form, 'SPELLCASTING MODIFIER', spellModStr, lib, 11);
    safeSetTextField(form, 'SPELL MOD', spellModStr, lib, 11);
  }

  // Espacios de conjuro
  spellSlots.forEach(s => {
    safeSetTextField(form, `LVL${s.level} TOTAL`, String(s.max), lib, 10);
  });

  // Lista de Conjuros preparados (30 filas ordenadas visualmente por coordenada Y en el PDF)
  const colLevel = getSortedSpellColumnFields(form, 'SPELL LEVEL');
  const colName = getSortedSpellColumnFields(form, 'SPELL NAME');
  const colTime = getSortedSpellColumnFields(form, 'CASTING TIME');
  const colRange = getSortedSpellColumnFields(form, 'RANGE');
  const colNotes = getSortedSpellColumnFields(form, 'SPELL NOTES');

  const rawSpells = Array.isArray(char.spells) ? char.spells : [];
  const formattedSpells = rawSpells.map(sp => formatPdfSpell(sp)).sort((a, b) => {
    const la = a.level === '' ? 99 : Number(a.level);
    const lb = b.level === '' ? 99 : Number(b.level);
    return la - lb;
  });

  const maxRows = Math.max(colLevel.length, colName.length, colTime.length, colRange.length, colNotes.length, 30);
  for (let i = 0; i < maxRows; i++) {
    const formatted = i < formattedSpells.length ? formattedSpells[i] : null;
    if (colLevel[i]) applyTextFieldValue(colLevel[i], formatted ? formatted.level : '', lib, 8.5);
    if (colName[i]) applyTextFieldValue(colName[i], formatted ? formatted.name : '', lib, 8.5);
    if (colTime[i]) applyTextFieldValue(colTime[i], formatted ? formatted.castingTime : '', lib, 8);
    if (colRange[i]) applyTextFieldValue(colRange[i], formatted ? formatted.range : '', lib, 8);
    if (colNotes[i]) applyTextFieldValue(colNotes[i], formatted ? formatted.description : '', lib, 7.5);
  }

  return await pdfDoc.save();
}

/**
 * Genera un Blob URL del PDF rellenado para ser previsualizado directamente en iframe.
 */
export async function createFilledDndPdfBlobUrl(char) {
  const bytes = await generateFilledDndPdfBytes(char);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

/**
 * Dispara la descarga del PDF oficial de D&D 5.5 rellenado en el navegador.
 */
export async function downloadFilledDndPdf(char) {
  const bytes = await generateFilledDndPdfBytes(char);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = (char.name || 'personaje').replace(/[^a-zA-Z0-9_\-áéíóúÁÉÍÓÚñÑ]/g, '_');
  a.href = url;
  a.download = `${safeName}_DND55_Oficial_2024.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

