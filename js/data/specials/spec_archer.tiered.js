// ─────────────────────────────────────────────
//  Specials › Archer / Huntress › Tiered
//  Archer uses Quiver; Huntress uses Trap.
//  Both are grouped here since they share the same slot and tier range.
// ─────────────────────────────────────────────

export const SPEC_ARCHER_TIERED = [
  {
    id: 'quiver_t6',
    class: 'quiver',
    name: 'Quiver of Thunder',
    tier: 6,
    bonuses: { dex: 5, att: 5 },
    canEquip: ['archer', 'huntress'],
  },
  {
    id: 'trap_t6',
    class: 'trap',
    name: 'Comet of Inversion',
    tier: 6,
    bonuses: { dex: 5, att: 5 },
    canEquip: ['huntress'],
  },
];
