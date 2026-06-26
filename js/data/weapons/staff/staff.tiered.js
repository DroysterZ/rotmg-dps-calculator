// ─────────────────────────────────────────────
//  Weapons › Staff › Tiered
// ─────────────────────────────────────────────

export const STAFF_TIERED = [
  {
    id: 'staff_t11',
    class: 'staff',
    name: 'Staff of Astral Knowledge',
    tier: 11,
    projectiles: [
      { damage: 92.5, fireRate: 100, shots: 2, armorPiercing: false },
    ],
    canEquip: ['wizard', 'necromancer', 'mystic'],
  },
  {
    id: 'staff_t12',
    class: 'staff',
    name: 'Staff of the Vital Unity',
    tier: 12,
    projectiles: [
      { damage: 120, fireRate: 100, shots: 2, armorPiercing: false },
    ],
    canEquip: ['wizard', 'necromancer', 'mystic'],
  },
];
