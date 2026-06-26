// ─────────────────────────────────────────────
//  Main — Application Entry Point
// ─────────────────────────────────────────────
import { WEAPONS, SPECIALS, ARMORS, RINGS } from './data/index.js';
import { registerItems } from './calc.js';
import { updateChart } from './chart.js';
import {
  addBuild, removeBuild, toggleCollapse,
  onNameChange, onColorChange, onClassChange,
  onEquipChange, onStatChange,
  toggleBuff, toggleGlobalBuff,
} from './ui.js';

// Re-export state for any module that still needs it via main.js
// (kept for backwards compatibility, but prefer importing from ./state.js directly).
export { state } from './state.js';

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
  updateChart,
});

// Start with one empty build.
addBuild();
