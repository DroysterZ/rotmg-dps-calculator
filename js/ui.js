// ─────────────────────────────────────────────
//  UI — Build Cards & DOM Handlers
// ─────────────────────────────────────────────
import { CLASSES, WEAPONS, SPECIALS, ARMORS, RINGS } from './data/index.js';
import { getEquipBonuses } from './calc.js';
import { state } from './state.js';      // ← was './main.js' (caused circular dep)
import { updateChart } from './chart.js';

const STAT_KEYS = ['hp', 'mp', 'att', 'def', 'spd', 'dex', 'vit', 'wis'];

// ── Build card lifecycle ──────────────────────

export function renderBuild(build) {
  const container = document.getElementById('builds-container');
  const card = document.createElement('div');
  card.className = 'build-card';
  card.id = `build-${build.id}`;
  card.innerHTML = buildCardHTML(build);
  container.appendChild(card);
  refreshStatsDisplay(build.id);
  syncBuildBuffOverrides();
}

function buildCardHTML(b) {
  const charOptions = Object.keys(CLASSES)
    .map(c => `<option value="${c}" ${c === b.charClass ? 'selected' : ''}>${capitalize(c)}</option>`)
    .join('');

  const weaponOptions  = filteredEquipOptions(WEAPONS,  b.charClass, b.weaponId);
  const specialOptions = filteredEquipOptions(SPECIALS, b.charClass, b.specialId);
  const armorOptions   = filteredEquipOptions(ARMORS,   b.charClass, b.armorId);
  const ringOptions    = filteredEquipOptions(RINGS,    b.charClass, b.ringId);

  const statsHTML = STAT_KEYS.map(k => `
    <div class="stat-row">
      <span class="stat-label">${k.toUpperCase()}</span>
      <input type="number" class="stat-base-input" id="stat-${b.id}-${k}" value="${b.stats[k] || 0}"
        oninput="onStatChange(${b.id},'${k}',this.value)">
      <span class="stat-total" id="stattotal-${b.id}-${k}">0</span>
      <span class="stat-bonus"  id="statbonus-${b.id}-${k}">+0</span>
    </div>`).join('');

  const buffsHTML = Object.keys(b.buffs).map(buff => `
    <button class="buff-toggle ${b.buffs[buff] ? 'on' : ''}" data-buff="${buff}" data-build="${b.id}"
      onclick="toggleBuff(${b.id},'${buff}',this)">
      ${buffLabel(buff)}
    </button>`).join('');

  return `
    <div class="build-header" onclick="toggleCollapse(${b.id})">
      <div class="build-color-dot" id="colordot-${b.id}" style="background:${b.color};color:${b.color}"></div>
      <input type="text" class="build-name-input" value="${b.name}"
        onclick="event.stopPropagation()"
        oninput="onNameChange(${b.id},this.value)">
      <input type="color" class="build-color-input" value="${b.color}"
        onclick="event.stopPropagation()"
        oninput="onColorChange(${b.id},this.value)">
      <button class="build-remove-btn" onclick="event.stopPropagation();removeBuild(${b.id})">✕</button>
      <button class="build-toggle-btn open" id="build-toggle-${b.id}">▼</button>
    </div>
    <div class="build-body" id="build-body-${b.id}">

      <div class="field-group">
        <label class="field-label">Class</label>
        <select id="charclass-${b.id}" onchange="onClassChange(${b.id},this.value)">
          ${charOptions}
        </select>
      </div>

      <div class="section-title">Equipment</div>
      <div class="field-group">
        <label class="field-label">Weapon</label>
        <select id="weapon-${b.id}" onchange="onEquipChange(${b.id},'weaponId',this.value)">
          ${weaponOptions}
        </select>
      </div>
      <div class="two-col">
        <div class="field-group">
          <label class="field-label">Special</label>
          <select id="special-${b.id}" onchange="onEquipChange(${b.id},'specialId',this.value)">
            ${specialOptions}
          </select>
        </div>
        <div class="field-group">
          <label class="field-label">Armor</label>
          <select id="armor-${b.id}" onchange="onEquipChange(${b.id},'armorId',this.value)">
            ${armorOptions}
          </select>
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">Ring</label>
        <select id="ring-${b.id}" onchange="onEquipChange(${b.id},'ringId',this.value)">
          ${ringOptions}
        </select>
      </div>

      <div class="section-title">Base Stats</div>
      <div class="stats-grid">${statsHTML}</div>

      <div class="section-title">Buffs / Debuffs</div>
      <div class="buffs-row">${buffsHTML}</div>
    </div>`;
}

function filteredEquipOptions(list, charClass, selectedId) {
  return list
    .filter(e => !e.canEquip || e.canEquip.includes(charClass))
    .map(e => `<option value="${e.id}" ${e.id === selectedId ? 'selected' : ''}>${e.name}${e.tier != null ? ' (T' + e.tier + ')' : ''}</option>`)
    .join('');
}

// ── Stats display ─────────────────────────────

export function refreshStatsDisplay(id) {
  const b = state.builds.find(b => b.id === id);
  if (!b) return;
  const bonuses = getEquipBonuses(b);
  for (const k of STAT_KEYS) {
    const baseVal = b.stats[k] || 0;
    const bon     = bonuses[k] || 0;
    const total   = baseVal + bon;

    const inputEl = document.getElementById(`stat-${id}-${k}`);
    const totalEl = document.getElementById(`stattotal-${id}-${k}`);
    const bonusEl = document.getElementById(`statbonus-${id}-${k}`);

    if (inputEl) inputEl.value = baseVal;
    if (totalEl) totalEl.textContent = total;
    if (bonusEl) {
      bonusEl.textContent = (bon >= 0 ? '+' : '') + bon;
      bonusEl.className = 'stat-bonus ' + (bon > 0 ? 'pos' : bon < 0 ? 'neg' : 'zero');
    }
  }
}

// ── Global buff overlay ───────────────────────

export function syncBuildBuffOverrides() {
  for (const build of state.builds) {
    const card = document.getElementById(`build-${build.id}`);
    if (!card) continue;
    card.querySelectorAll('.buff-toggle[data-build]').forEach(btn => {
      btn.classList.toggle('overridden', state.globalBuffs[btn.dataset.buff] !== null);
    });
  }
}

// ── Handlers (called from inline HTML onclick) ─

export function addBuild() {
  const COLORS = ['#7c5cfc', '#fc5c7c', '#40e0a0', '#f0c040', '#40c8e0', '#fc905c', '#c080ff', '#80e0ff'];
  const id = ++state.buildCounter;
  const charClass = 'wizard';
  const build = {
    id,
    color: COLORS[(id - 1) % COLORS.length],
    name: `Build ${id}`,
    charClass,
    stats: { ...CLASSES[charClass] },
    weaponId: 'none', specialId: 'none', armorId: 'none', ringId: 'none',
    buffs: { armored: false, armorBroken: false, cursed: false, exposed: false, berserk: false, damaging: false },
    visible: true,
    collapsed: false,
  };
  state.builds.push(build);
  renderBuild(build);
  updateChart();
}

export function removeBuild(id) {
  state.builds = state.builds.filter(b => b.id !== id);
  document.getElementById(`build-${id}`)?.remove();
  updateChart();
}

export function toggleCollapse(id) {
  const build = state.builds.find(b => b.id === id);
  if (!build) return;
  build.collapsed = !build.collapsed;
  document.getElementById(`build-body-${id}`).style.display = build.collapsed ? 'none' : 'flex';
  document.getElementById(`build-toggle-${id}`).classList.toggle('open', !build.collapsed);
}

export function onNameChange(id, val) {
  const b = state.builds.find(b => b.id === id);
  if (b) { b.name = val; updateChart(); }
}

export function onColorChange(id, val) {
  const b = state.builds.find(b => b.id === id);
  if (!b) return;
  b.color = val;
  const dot = document.getElementById(`colordot-${id}`);
  if (dot) { dot.style.background = val; dot.style.color = val; }
  updateChart();
}

export function onClassChange(id, val) {
  const b = state.builds.find(b => b.id === id);
  if (!b) return;
  b.charClass = val;
  b.stats = { ...CLASSES[val] };

  // Reset equipment that is incompatible with the new class
  const slots = [
    { key: 'weaponId',  list: WEAPONS  },
    { key: 'specialId', list: SPECIALS },
    { key: 'armorId',   list: ARMORS   },
    { key: 'ringId',    list: RINGS    },
  ];
  for (const s of slots) {
    const cur = s.list.find(e => e.id === b[s.key]);
    if (cur?.canEquip && !cur.canEquip.includes(val)) b[s.key] = 'none';
  }

  const card = document.getElementById(`build-${id}`);
  if (card) {
    card.innerHTML = buildCardHTML(b);
    refreshStatsDisplay(id);
    syncBuildBuffOverrides();
  }
  updateChart();
}

export function onEquipChange(id, slot, val) {
  const b = state.builds.find(b => b.id === id);
  if (!b) return;
  b[slot] = val;
  refreshStatsDisplay(id);
  updateChart();
}

export function onStatChange(id, stat, val) {
  const b = state.builds.find(b => b.id === id);
  if (!b) return;
  b.stats[stat] = parseInt(val) || 0;
  refreshStatsDisplay(id);
  updateChart();
}

export function toggleBuff(id, buff) {
  const b = state.builds.find(b => b.id === id);
  if (!b) return;

  if (buff === 'armored'     && !b.buffs.armored)     b.buffs.armorBroken = false;
  if (buff === 'armorBroken' && !b.buffs.armorBroken) b.buffs.armored     = false;
  b.buffs[buff] = !b.buffs[buff];

  const card = document.getElementById(`build-${id}`);
  card?.querySelectorAll('.buff-toggle').forEach(btn => {
    btn.classList.toggle('on', b.buffs[btn.dataset.buff]);
  });

  updateChart();
}

export function toggleGlobalBuff(buff) {
  const next = state.globalBuffs[buff] === null ? true : null;

  if (next === true) {
    if (buff === 'armored')     state.globalBuffs.armorBroken = null;
    if (buff === 'armorBroken') state.globalBuffs.armored     = null;
  }
  state.globalBuffs[buff] = next;

  document.getElementById('global-buffs-bar').querySelectorAll('.buff-toggle').forEach(btn => {
    const active = state.globalBuffs[btn.dataset.buff] === true;
    btn.classList.toggle('on', active);
    btn.classList.toggle('global-active', active);
  });

  syncBuildBuffOverrides();
  updateChart();
}

// ── Helpers ───────────────────────────────────

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function buffLabel(buff) {
  return {
    armored: 'Armored', armorBroken: 'Armor Broken',
    cursed: 'Cursed', exposed: 'Exposed',
    berserk: 'Berserk', damaging: 'Damaging',
  }[buff] || buff;
}
