/* Real Estate 2.0 – Shared Layout & Demo Data */

/* ── Demo data ── */
const RE2 = {
  objects: [
    { id: 'rosengasse14', label: 'Rosengasse 14, Zürich', einheiten: 48, eigentumer: 'Family Office Müller' },
    { id: 'seestrasse88',  label: 'Seestrasse 88, Horgen',   einheiten: 32, eigentumer: 'Family Office Müller' },
    { id: 'bahnhofstr5',  label: 'Bahnhofstr. 5, St. Gallen', einheiten: 64, eigentumer: 'Pensionskasse XY' },
    { id: 'laenggasse22', label: 'Länggasse 22, Bern',        einheiten: 28, eigentumer: 'Stiftung Bau' },
  ],
  mieter: {
    rosengasse14: [
      { id: 'keller-a',  name: 'Anna Keller',     whg: '3.02', score: 'A', miete: 2650, seit: '2022-04-01' },
      { id: 'weber-m',   name: 'Marco Weber',     whg: '3.01', score: 'A', miete: 2180, seit: '2020-11-01' },
      { id: 'rossi-m',   name: 'Marco Rossi',     whg: '3.03', score: 'B', miete: 3120, seit: '2019-10-01' },
      { id: 'schmid-f',  name: 'Fam. Schmid',     whg: '2.08', score: 'B', miete: 2340, seit: '2024-01-15' },
      { id: 'bianchi-l', name: 'Luca Bianchi',    whg: '3.04', score: 'A', miete: 2050, seit: '2021-06-01' },
    ],
  },
  nav: [
    { group: 'Portfolio' },
    { page: 'owner-dashboard',    label: 'Übersicht' },
    { group: 'Liegenschaft' },
    { page: 'property-detail',    label: 'Objekt-Detail' },
    { page: 'graph-explorer',     label: 'Knowledge Graph' },
    { group: 'Bewirtschaftung' },
    { page: 'tickets',            label: 'Tickets & Schäden' },
    { page: 'lease-detail',       label: 'Mietverhältnis' },
    { page: 'nk-abrechnung',      label: 'NK-Abrechnung' },
    { page: 'listings',           label: 'Vermietung' },
    { group: 'Finanzen & Technik' },
    { page: 'finance',            label: 'Finanzen & Clearing' },
    { page: 'predictive-maintenance', label: 'Predictive Maintenance' },
    { page: 'esg',                label: 'ESG-Reporting' },
    { group: 'Betrieb', more: true },
    { page: 'onboarding',         label: 'Onboarding Factory', more: true },
    { page: 'tenant',             label: 'Mieter-App', more: true },
    { page: 'agents',             label: 'KI-Agenten', more: true },
    { page: 'realestatecore-doku',label: 'REC Datenmodell', more: true },
  ]
};

/* persist selected object across pages */
function getActiveObject() {
  return sessionStorage.getItem('re2_object') || 're2:estate/rosengasse14';
}
function setActiveObject(val) {
  sessionStorage.setItem('re2_object', val);
}
function getActiveObjectId() {
  const v = getActiveObject();
  return v.replace('re2:estate/', '');
}

document.addEventListener('DOMContentLoaded', function () {
  const active = document.body.dataset.page || '';

  /* ── inject CSS ── */
  const link = document.createElement('link');
  link.rel = 'stylesheet'; link.href = '_sidebar.css';
  document.head.appendChild(link);

  /* ── build sidebar ── */
  const objId = getActiveObjectId();
  const objLabel = (RE2.objects.find(o => o.id === objId) || RE2.objects[0]).label;

  let navHtml = '';
  let inMoreGroup = false;
  RE2.nav.forEach(item => {
    if (item.group) {
      if (item.more && !inMoreGroup) {
        inMoreGroup = true;
        navHtml += `<button class="sb-more-toggle" onclick="toggleMore(this)">▸ Mehr</button><div class="sb-more">`;
      }
      if (!item.more) {
        navHtml += `<div class="sb-group-label">${item.group}</div>`;
      } else {
        navHtml += `<div class="sb-group-label">${item.group}</div>`;
      }
    } else if (item.page) {
      const cls = 'sb-link' + (active === item.page ? ' active' : '');
      navHtml += `<a href="${item.page}.html" class="${cls}">${item.label}</a>`;
    }
  });
  if (inMoreGroup) navHtml += '</div>';

  const sidebar = document.createElement('aside');
  sidebar.id = 're2-sidebar';
  sidebar.innerHTML = `
    <a href="index.html" class="sb-logo">
      <div class="sb-logo-mark">RE</div>
      <div class="sb-logo-text">
        <div class="sb-logo-title">Real Estate 2.0</div>
        <div class="sb-logo-sub">vision& · BOS</div>
      </div>
    </a>
    <div class="sb-context">
      <label>Aktives Objekt</label>
      <select id="re2-obj-select" onchange="switchObject(this.value)">
        ${RE2.objects.map(o =>
          `<option value="${o.id}" ${o.id === objId ? 'selected' : ''}>${o.label}</option>`
        ).join('')}
      </select>
    </div>
    <nav class="sb-nav">${navHtml}</nav>
    <div class="sb-footer">
      <div class="sb-footer-status"><div class="sb-dot"></div>Semantic Core online</div>
      <div>REC v3.3 · 2.4M triples</div>
    </div>`;
  document.body.insertBefore(sidebar, document.body.firstChild);

  /* ── topbar ── */
  const obj = RE2.objects.find(o => o.id === objId) || RE2.objects[0];
  const topbar = document.createElement('div');
  topbar.id = 're2-topbar';
  const pageTitle = RE2.nav.find(n => n.page === active)?.label || '';
  topbar.innerHTML = `
    <span class="topbar-crumb"><a href="index.html">Real Estate 2.0</a></span>
    <span class="topbar-sep">›</span>
    <span class="topbar-crumb">${obj.label}</span>
    ${pageTitle ? `<span class="topbar-sep">›</span><span>${pageTitle}</span>` : ''}
    <span class="topbar-badge">re2:estate/${obj.id}</span>
    <span style="margin-left:auto;color:#94a3b8;font-size:11px">${obj.einheiten} Einheiten · ${obj.eigentumer}</span>`;
  const main = document.querySelector('main');
  if (main) document.body.insertBefore(topbar, main);
});

function toggleMore(btn) {
  const box = btn.nextElementSibling;
  const open = box.classList.toggle('open');
  btn.textContent = (open ? '▾ ' : '▸ ') + 'Mehr';
}

function switchObject(id) {
  setActiveObject('re2:estate/' + id);
  location.reload();
}
