// ─────────────────────────────────────────────
//  Main — Application State & Entry Point
// ─────────────────────────────────────────────
import { WEAPONS, SPECIALS, ARMORS, RINGS } from './data/index.js';
import { registerItems } from './calc.js';
import {
  addBuild, removeBuild, toggleCollapse,
  onNameChange, onColorChange, onClassChange,
  onEquipChange, onStatChange,
  toggleBuff, toggleGlobalBuff,
} from './ui.js';

// ── Shared mutable state ─────────────────────
// Exported so calc.js and ui.js can read/write it without prop-drilling.
export const state = {
  builds:       [],
  buildCounter: 0,
  globalBuffs: {
    armored: null, armorBroken: null,
    cursed:  null, exposed:     null,
    berserk: null, damaging:    null,
  },
};

// ── Bootstrap ────────────────────────────────

// Register all items so calc.js can look them up without circular imports.
registerItems([...WEAPONS, ...SPECIALS, ...ARMORS, ...RINGS]);

// ES modules run in strict mode and are scoped — inline HTML onclick=""
// attributes need functions on `window` to call them.
Object.assign(window, {
  addBuild, removeBuild, toggleCollapse,
  onNameChange, onColorChange, onClassChange,
  onEquipChange, onStatChange,
  toggleBuff, toggleGlobalBuff,
  updateChart: (await import('./chart.js')).updateChart,
});

// Start with one empty build
addBuild();
