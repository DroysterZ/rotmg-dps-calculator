// ─────────────────────────────────────────────
//  DPS Calculation
// ─────────────────────────────────────────────
import { WEAPONS } from './data/index.js';

// Longbow approximation: 4 bursts (of 3 shots each) ≈ 6 normal shots in time.
// Effective burst rate = normal shotsPerSec × (4/6).
// Since each burst already has shots:3 in the projectile, the net projectiles/sec
// equals 3 × (4/6) × shotsPerSec = 2 × shotsPerSec — same as a 2-shot normal weapon.
// This constant will be replaced once concrete DEX-scaling data is available.
const LONGBOW_RATE_FACTOR = 4 / 6;

/**
 * Returns the effective merged buffs object for a build,
 * with globalBuffs taking priority over per-build buffs where set (non-null).
 */
export function mergeBuffs(buildBuffs, globalBuffs) {
  const result = {};
  for (const k of Object.keys(buildBuffs)) {
    result[k] = globalBuffs[k] !== null ? globalBuffs[k] : buildBuffs[k];
  }
  return result;
}

/**
 * Calculates DPS for a build against a target with the given DEF value.
 */
export function calcDPS(build, targetDef, globalBuffs) {
  const weapon = WEAPONS.find(w => w.id === build.weaponId);
  if (!weapon || weapon.projectiles.length === 0) return 0;

  const stats = getEffectiveStats(build);
  const ATT = stats.att;
  const DEX = stats.dex;

  const buffs = mergeBuffs(build.buffs, globalBuffs);

  // Effective DEF of target
  let eDef = targetDef;
  if (buffs.exposed) eDef -= 20;
  if (buffs.armorBroken) {
    if (eDef > 0) eDef = 0;
    // if already negative (from exposed), keep the negative value
  } else if (buffs.armored) {
    eDef = Math.floor(eDef * 1.5);
  }

  // ATT multiplier
  let attMult = 0.5 + ATT / 50;
  if (buffs.damaging) attMult *= 1.25;

  // Base shots per second (standard formula, all weapon types share this)
  let shotsPerSec = 1.5 + 6.5 * (DEX / 75);
  if (buffs.berserk) shotsPerSec *= 1.25;

  // Longbow fires in burst cycles: 4 bursts ≈ 6 normal shots (preliminary approximation).
  // The per-burst rate is scaled down; the extra shots:3 per projectile compensates,
  // yielding the correct total projectiles/sec.
  if (weapon.class === 'longbow') {
    shotsPerSec *= LONGBOW_RATE_FACTOR;
  }

  // Damage per shot event (summed over all projectile entries)
  let damagePerShot = 0;
  for (const proj of weapon.projectiles) {
    const rate = (proj.fireRate || 100) / 100;
    let rawDmg = proj.damage * attMult;
    if (buffs.cursed) rawDmg *= 1.25;

    const reduction = (proj.armorPiercing && eDef > 0) ? 0 : eDef;
    const actualDef = Math.min(reduction, rawDmg * 0.9);
    const projDmg = Math.max(0, rawDmg - actualDef);

    damagePerShot += projDmg * (proj.shots || 1) * rate;
  }

  return Math.round(damagePerShot * shotsPerSec);
}

/**
 * Returns the effective (base + equipment bonuses) stats for a build.
 */
export function getEffectiveStats(build) {
  const base = build.stats || {};
  const bonuses = getEquipBonuses(build);
  const result = {};
  for (const k of ['hp', 'mp', 'att', 'def', 'spd', 'dex', 'vit', 'wis']) {
    result[k] = (base[k] || 0) + (bonuses[k] || 0);
  }
  return result;
}

/**
 * Sums all stat bonuses granted by the build's equipped items.
 */
export function getEquipBonuses(build) {
  // Import here to avoid a circular dependency with data/index.js
  // (data/index exports WEAPONS which calc.js also imports at the top).
  // We use a dynamic approach: pass all equip lists in via the registry below.
  const totals = { hp: 0, mp: 0, att: 0, def: 0, spd: 0, dex: 0, vit: 0, wis: 0 };
  const ids = [build.weaponId, build.specialId, build.armorId, build.ringId];
  for (const id of ids) {
    const item = _allItems().find(e => e.id === id);
    if (item?.bonuses) {
      for (const [k, v] of Object.entries(item.bonuses)) {
        if (k in totals) totals[k] += v;
      }
    }
  }
  return totals;
}

// Lazily-resolved flat list of all equippable items.
// Populated by main.js after data is loaded, to avoid circular imports.
let _itemRegistry = null;

export function registerItems(allItems) {
  _itemRegistry = allItems;
}

function _allItems() {
  if (!_itemRegistry) throw new Error('Item registry not initialised — call registerItems() in main.js first.');
  return _itemRegistry;
}
