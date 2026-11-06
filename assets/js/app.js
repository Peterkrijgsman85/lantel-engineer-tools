(() => {
  const tools = Array.isArray(window.ENGINEER_TOOLS) ? window.ENGINEER_TOOLS : [];
  const grid = document.querySelector('#toolGrid');
  const search = document.querySelector('#search');
  const categories = document.querySelector('#categories');
  const empty = document.querySelector('#empty');
  let active = 'Alles';

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cats = ['Alles', ...new Set(tools.map(t => t.category).filter(Boolean))];
  categories.innerHTML = cats.map((c,i) => `<button type="button" class="filter${i===0?' active':''}" data-category="${esc(c)}">${esc(c)}</button>`).join('');

  function render() {
    const q = search.value.trim().toLowerCase();
    const visible = tools.filter(t => (active === 'Alles' || t.category === active) && [t.name,t.description,t.category,...(t.tags||[])].join(' ').toLowerCase().includes(q));
    grid.innerHTML = visible.map(t => `<a class="card" href="${esc(t.path)}"><div class="icon">${esc(t.icon || '🛠️')}</div><div><span class="category">${esc(t.category || 'Overig')}</span><h2>${esc(t.name)}</h2><p>${esc(t.description || '')}</p></div><span class="open">Open →</span></a>`).join('');
    empty.hidden = visible.length !== 0;
  }

  search.addEventListener('input', render);
  categories.addEventListener('click', e => {
    const b = e.target.closest('button[data-category]'); if (!b) return;
    active = b.dataset.category;
    categories.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
    render();
  });
  render();
})();
