// ─────────────────────────────────────────────
//  Weapons › Sword › Tiered
// ─────────────────────────────────────────────

export const SWORD_TIERED = [
  {
    id: 'sword_t11',
    class: 'sword',
    name: 'Colossus Sword',
    tier: 11,
    projectiles: [
      { damage: 200, fireRate: 100, shots: 1, armorPiercing: false },
    ],
    canEquip: ['warrior', 'knight', 'paladin'],
  },
  {
    id: 'sword_t12',
    class: 'sword',
    name: 'Sword of Acclaim',
    tier: 12,
    projectiles: [
      { damage: 220, fireRate: 100, shots: 1, armorPiercing: false },
    ],
    canEquip: ['warrior', 'knight', 'paladin'],
  },
];
