// ─────────────────────────────────────────────
//  Data Index
//
//  This file is the single import point for all game data.
//  To add new items: create or edit the relevant leaf file,
//  then add its export to the spread below — no other file needs changing.
//
//  Load order within each array doesn't affect correctness,
//  but keep tiers ascending (tiered → UT → ST) for readability.
// ─────────────────────────────────────────────

export { CLASSES } from './classes.js';

// ── Weapons ──────────────────────────────────
import { STAFF_TIERED }   from './weapons/staff/staff.tiered.js';
import { STAFF_UT }       from './weapons/staff/staff.ut.js';
import { BOW_TIERED }     from './weapons/bow/bow.tiered.js';
import { LONGBOW_TIERED } from './weapons/longbow/longbow.tiered.js';
import { SWORD_TIERED }   from './weapons/sword/sword.tiered.js';
import { DAGGER_TIERED }  from './weapons/dagger/dagger.tiered.js';
import { WAND_TIERED }    from './weapons/wand/wand.tiered.js';
import { KATANA_TIERED }  from './weapons/katana/katana.tiered.js';

export const WEAPONS = [
  { id: 'none', class: 'weapon', name: 'None', projectiles: [], canEquip: null },
  ...STAFF_TIERED,
  ...STAFF_UT,
  ...BOW_TIERED,
  ...LONGBOW_TIERED,
  ...SWORD_TIERED,
  ...DAGGER_TIERED,
  ...WAND_TIERED,
  ...KATANA_TIERED,
];

// ── Armors ───────────────────────────────────
import { ROBE_TIERED }    from './armors/robe/robe.tiered.js';
import { LEATHER_TIERED } from './armors/leather/leather.tiered.js';
import { HEAVY_TIERED }   from './armors/heavy/heavy.tiered.js';

export const ARMORS = [
  { id: 'none', class: 'armor', name: 'None', bonuses: {}, canEquip: null },
  ...ROBE_TIERED,
  ...LEATHER_TIERED,
  ...HEAVY_TIERED,
];

// ── Specials ─────────────────────────────────
import { SPEC_WIZARD_TIERED }      from './specials/spec_wizard.tiered.js';
import { SPEC_WIZARD_UT }          from './specials/spec_wizard.ut.js';
import { SPEC_ARCHER_TIERED }      from './specials/spec_archer.tiered.js';
import { SPEC_WARRIOR_TIERED }     from './specials/spec_warrior.tiered.js';
import { SPEC_KNIGHT_TIERED }      from './specials/spec_knight.tiered.js';
import { SPEC_PALADIN_TIERED }     from './specials/spec_paladin.tiered.js';
import { SPEC_PRIEST_TIERED }      from './specials/spec_priest.tiered.js';
import { SPEC_NECROMANCER_TIERED } from './specials/spec_necromancer.tiered.js';
import { SPEC_MYSTIC_TIERED }      from './specials/spec_mystic.tiered.js';
import { SPEC_ROGUE_TIERED }       from './specials/spec_rogue.tiered.js';
import { SPEC_TRICKSTER_TIERED }   from './specials/spec_trickster.tiered.js';
import { SPEC_SORCERER_TIERED }    from './specials/spec_sorcerer.tiered.js';
import { SPEC_NINJA_TIERED }       from './specials/spec_ninja.tiered.js';
import { SPEC_SAMURAI_TIERED }     from './specials/spec_samurai.tiered.js';
import { SPEC_BARD_TIERED }        from './specials/spec_bard.tiered.js';

export const SPECIALS = [
  { id: 'none', class: 'spell', name: 'None', bonuses: {}, canEquip: null },
  ...SPEC_WIZARD_TIERED,
  ...SPEC_WIZARD_UT,
  ...SPEC_ARCHER_TIERED,
  ...SPEC_WARRIOR_TIERED,
  ...SPEC_KNIGHT_TIERED,
  ...SPEC_PALADIN_TIERED,
  ...SPEC_PRIEST_TIERED,
  ...SPEC_NECROMANCER_TIERED,
  ...SPEC_MYSTIC_TIERED,
  ...SPEC_ROGUE_TIERED,
  ...SPEC_TRICKSTER_TIERED,
  ...SPEC_SORCERER_TIERED,
  ...SPEC_NINJA_TIERED,
  ...SPEC_SAMURAI_TIERED,
  ...SPEC_BARD_TIERED,
];

// ── Rings ────────────────────────────────────
import { RINGS_TIERED } from './rings/rings.tiered.js';

export const RINGS = [
  { id: 'none', class: 'ring', name: 'None', bonuses: {}, canEquip: null },
  ...RINGS_TIERED,
];
