// ─────────────────────────────────────────────
//  Armors › Heavy Armor › Tiered
//  Equippable by: warrior, knight, paladin, samurai
// ─────────────────────────────────────────────

export const HEAVY_TIERED = [
  {
    id: 'heavy_t13',
    class: 'heavy',
    name: 'Dominion Armor',
    tier: 13,
    bonuses: { def: 20, att: 6, hp: 75 },
    canEquip: ['warrior', 'knight', 'paladin', 'samurai'],
  },
  {
    id: 'heavy_t14',
    class: 'heavy',
    name: 'Acropolis Armor',
    tier: 14,
    bonuses: { def: 22, att: 8, hp: 100 },
    canEquip: ['warrior', 'knight', 'paladin', 'samurai'],
  },
];
