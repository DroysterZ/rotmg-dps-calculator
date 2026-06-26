// ─────────────────────────────────────────────
//  Chart Rendering
// ─────────────────────────────────────────────
import { calcDPS } from './calc.js';
import { state }   from './main.js';

let _chart = null;

export function updateChart() {
  const defStart = parseInt(document.getElementById('def-start').value) || 0;
  const defEnd   = parseInt(document.getElementById('def-end').value)   || 100;
  const defStep  = Math.max(1, parseInt(document.getElementById('def-step').value) || 1);

  const labels = [];
  for (let d = defStart; d <= defEnd; d += defStep) labels.push(d);

  const datasets = state.builds
    .filter(b => b.visible !== false)
    .map(b => ({
      label: b.name || 'Build',
      data: labels.map(d => calcDPS(b, d, state.globalBuffs)),
      borderColor: b.color,
      backgroundColor: b.color + '22',
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      tension: 0.1,
    }));

  const emptyState = document.getElementById('empty-state');
  const canvas     = document.getElementById('dps-chart');

  if (datasets.length === 0) {
    emptyState.style.display = 'flex';
    canvas.style.display = 'none';
    if (_chart) { _chart.destroy(); _chart = null; }
    return;
  }

  emptyState.style.display = 'none';
  canvas.style.display = 'block';

  if (_chart) {
    _chart.data.labels   = labels;
    _chart.data.datasets = datasets;
    _chart.update();
    return;
  }

  _chart = new Chart(canvas, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#7a8a9e',
            font: { family: "'Rajdhani', sans-serif", size: 12, weight: '600' },
            boxWidth: 12,
            boxHeight: 2,
          },
        },
        tooltip: {
          backgroundColor: '#141820',
          borderColor: '#2a3545',
          borderWidth: 1,
          titleColor: '#7a8a9e',
          bodyColor: '#d8e0ec',
          titleFont: { family: "'Share Tech Mono', monospace", size: 11 },
          bodyFont:  { family: "'Share Tech Mono', monospace", size: 12 },
          padding: 10,
          callbacks: {
            title: ctx => `DEF: ${ctx[0].label}`,
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} DPS`,
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Target DEF', color: '#3a4a5e', font: { family: "'Rajdhani'", size: 11, weight: '700' } },
          grid:  { color: '#1e2530' },
          ticks: { color: '#3a4a5e', font: { family: "'Share Tech Mono'", size: 10 }, maxTicksLimit: 20 },
        },
        y: {
          title: { display: true, text: 'DPS', color: '#3a4a5e', font: { family: "'Rajdhani'", size: 11, weight: '700' } },
          grid:  { color: '#1e2530' },
          ticks: { color: '#3a4a5e', font: { family: "'Share Tech Mono'", size: 10 } },
          beginAtZero: true,
        },
      },
    },
  });
}
