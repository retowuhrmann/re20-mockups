// Shared sidebar/layout injected into each mockup page
document.addEventListener('DOMContentLoaded', () => {
  const active = document.body.dataset.page;
  const nav = [
    ['owner-dashboard', '🏢', 'Portfolio'],
    ['property-detail', '📊', 'Liegenschaft'],
    ['graph-explorer', '🕸️', 'Graph Explorer'],
    ['tickets', '🔧', 'Tickets'],
    ['lease-detail', '📝', 'Mietverhältnis'],
    ['nk-abrechnung', '📋', 'NK-Abrechnung'],
    ['supply-chain', '🤝', 'Supply Chain'],
    ['finance', '💳', 'Finanzen'],
    ['listings', '🔑', 'Vermietung'],
    ['predictive-maintenance', '🔮', 'Predictive Maint.'],
    ['esg', '🌱', 'ESG'],
    ['onboarding', '⚡', 'Onboarding'],
    ['tenant', '👤', 'Mieter-App'],
    ['agents', '🤖', 'KI-Agenten'],
    ['realestatecore-doku', '📖', 'REC Doku'],
  ];
  const sidebar = document.createElement('aside');
  sidebar.className = 'fixed left-0 top-0 h-screen w-60 bg-slate-900 text-slate-200 p-4 flex flex-col';
  sidebar.innerHTML = `
    <a href="index.html" class="flex items-center gap-2 mb-8 pb-4 border-b border-slate-700">
      <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">RE</div>
      <div><div class="font-bold text-white text-sm">Real Estate 2.0</div><div class="text-xs text-slate-400">vision&amp;</div></div>
    </a>
    <nav class="flex-1 space-y-1">
      ${nav.map(([p,i,n]) => `
        <a href="${p}.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${active===p?'bg-indigo-600 text-white':'hover:bg-slate-800'}">
          <span>${i}</span><span>${n}</span>
        </a>`).join('')}
    </nav>
    <div class="pt-4 border-t border-slate-700 text-xs text-slate-400">
      <div class="flex items-center gap-2 mb-1"><div class="w-2 h-2 bg-emerald-400 rounded-full"></div>Semantic Core online</div>
      <div class="text-slate-500 font-mono text-[10px]">REC v3.3 · 2.4M triples</div>
      <div>Build v0.1.0 · MVP</div>
    </div>`;
  document.body.insertBefore(sidebar, document.body.firstChild);
  const main = document.querySelector('main');
  if (main) main.classList.add('ml-60');
});
