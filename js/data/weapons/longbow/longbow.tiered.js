// ─────────────────────────────────────────────
//  Weapons › Longbow › Tiered
//
//  Longbows fire in bursts of 3 shots.
//  The engine applies LONGBOW_RATE_FACTOR to shotsPerSec
//  (see calc.js) so shots:3 here correctly represents one burst.
// ─────────────────────────────────────────────

export const LONGBOW_TIERED = [
  {
    id: 'longbow_t11',
    class: 'longbow',
    name: 'Longbow of Resolute Pursuit',
    tier: 11,
    projectiles: [
      { damage: 170, fireRate: 100, shots: 3, armorPiercing: false },
    ],
    canEquip: ['archer', 'huntress'],
  },
  {
    id: 'longbow_t12',
    class: 'longbow',
    name: 'Longbow of Sustained Force',
    tier: 12,
    projectiles: [
      { damage: 185, fireRate: 100, shots: 3, armorPiercing: false },
    ],
    canEquip: ['archer', 'huntress'],
  },
];
