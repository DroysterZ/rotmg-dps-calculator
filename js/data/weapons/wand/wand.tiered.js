// ─────────────────────────────────────────────
//  Weapons › Wand › Tiered
// ─────────────────────────────────────────────

export const WAND_TIERED = [
  {
    id: 'wand_t12',
    class: 'wand',
    name: 'Wand of Recompense',
    tier: 12,
    projectiles: [
      { damage: 135, fireRate: 100, shots: 1, armorPiercing: false },
      { damage: 135, fireRate: 100, shots: 1, armorPiercing: false },
    ],
    canEquip: ['priest', 'sorcerer', 'bard'],
  },
];
