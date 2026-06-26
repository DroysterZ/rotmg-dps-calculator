// ─────────────────────────────────────────────
//  Weapons › Longbow › Tiered
//
//  Longbows fire in bursts of 3 shots.
//  The engine applies LONGBOW_RATE_FACTOR to shotsPerSec
//  (see calc.js) so shots:3 here correctly represents one burst.
// ─────────────────────────────────────────────

export const LONGBOW_TIERED = [
	{
		id: 'longbow_t7',
		class: 'longbow',
		name: 'Hunter’s Longbow',
		tier: 7,
		projectiles: [
			{
				damage: 67.5,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	},
	{
		id: 'longbow_t8',
		class: 'longbow',
		name: 'Gilded Longbow',
		tier: 8,
		projectiles: [
			{
				damage: 77.5,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	},
	{
		id: 'longbow_t9',
		class: 'longbow',
		name: 'Emerald Longbow',
		tier: 9,
		projectiles: [
			{
				damage: 87.5,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	},
	{
		id: 'longbow_t10',
		class: 'longbow',
		name: 'Mystic Longbow',
		tier: 10,
		projectiles: [
			{
				damage: 97.5,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	},
	{
		id: 'longbow_t11',
		class: 'longbow',
		name: 'Crimson Longbow',
		tier: 11,
		projectiles: [
			{
				damage: 105,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	},
	{
		id: 'longbow_t12',
		class: 'longbow',
		name: 'Longbow of the Endless Sky',
		tier: 12,
		projectiles: [
			{
				damage: 112.5,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	},
	{
		id: 'longbow_t13',
		class: 'longbow',
		name: 'Longbow of the Morning Spirit',
		tier: 13,
		projectiles: [
			{
				damage: 117.5,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	},
	{
		id: 'longbow_t14',
		class: 'longbow',
		name: 'Longbow of the Midnight Diamond',
		tier: 14,
		projectiles: [
			{
				damage: 127.5,
				fireRate: 100,
				shots: 3,
				armorPiercing: false
			},
		],
		canEquip: ['archer', 'huntress', 'bard'],
	}
];
