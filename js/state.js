// ─────────────────────────────────────────────
//  Shared Application State
//
//  Extracted from main.js into its own module so that ui.js and chart.js
//  can import `state` without creating a circular dependency:
//
//    BEFORE (circular):  main.js ← ui.js ← main.js
//    AFTER  (clean):     state.js ← ui.js
//                        state.js ← chart.js
//                        state.js ← main.js
// ─────────────────────────────────────────────

export const state = {
  builds:       [],
  buildCounter: 0,
  globalBuffs: {
    armored:     null,
    armorBroken: null,
    cursed:      null,
    exposed:     null,
    berserk:     null,
    damaging:    null,
  },
};
