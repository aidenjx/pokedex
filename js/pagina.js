/* =====================================================================
   P07 · Eines de la pàgina
   Aquest fitxer no s'ha de modificar. Les funcions d'aquí ja estan fetes:
   només s'han de cridar des d'app.js.

     mostraPokedex(fitxes)   -> dibuixa una targeta per cada fitxa
     mostraEquip(equip)      -> dibuixa l'equip: nom, membres i poder
     avisa(text)             -> mostra un avís durant uns segons

   La pàgina crida inicia() quan es carrega, tria(id) quan cliques una
   targeta i allibera(id) quan cliques la creu d'un membre de l'equip.
   Les tres funcions les has d'escriure tu, a app.js (R5).
   ===================================================================== */

const TIPUS = {
  normal: { nom: 'normal', color: '#a8a77a' },
  fire: { nom: 'foc', color: '#ee8130' },
  water: { nom: 'aigua', color: '#6390f0' },
  electric: { nom: 'elèctric', color: '#d8b400' },
  grass: { nom: 'planta', color: '#5fa83a' },
  poison: { nom: 'verí', color: '#a33ea1' },
  ground: { nom: 'terra', color: '#c9a64f' },
  rock: { nom: 'roca', color: '#b6a136' },
  ghost: { nom: 'fantasma', color: '#735797' },
  psychic: { nom: 'psíquic', color: '#f95587' },
  fairy: { nom: 'fada', color: '#d685ad' },
};

function etiquetaTipus(t) {
  const info = TIPUS[t] || { nom: t, color: '#888' };
  return '<span class="tipus" style="background:' + info.color + '">' + info.nom + '</span>';
}

function numero(id) {
  return '#' + String(id).padStart(3, '0');
}

// Si no hi ha internet, en lloc de la imatge es veu el número.
function imatge(f) {
  return '<div class="foto"><img src="' + f.imatge + '" alt="" ' +
    'onerror="this.nextElementSibling.hidden = false; this.remove()"><span hidden>' + numero(f.id) + '</span></div>';
}

function barra(nom, valor) {
  const ample = Math.min(100, Math.round(((valor || 0) / 160) * 100));
  return '<div class="barra"><span>' + nom + '</span><i style="width:' + ample + '%"></i><b>' +
    (valor ?? '—') + '</b></div>';
}

function mostraPokedex(llista) {
  const caixa = document.getElementById('pokedex');
  if (!Array.isArray(llista)) {
    caixa.innerHTML = '<p class="buit">mostraPokedex() necessita un array de fitxes.</p>';
    return;
  }
  let html = '';
  for (const f of llista) {
    if (!f) { continue; }
    html +=
      '<article class="targeta" data-id="' + f.id + '" title="Clica per afegir-lo a l\'equip">' +
      imatge(f) +
      '<p class="num">' + numero(f.id) + '</p>' +
      '<h3>' + (f.nom ?? '?') + '</h3>' +
      '<p>' + (Array.isArray(f.tipus) ? f.tipus.map(etiquetaTipus).join(' ') : '') + '</p>' +
      barra('HP', f.hp) + barra('Atac', f.atac) + barra('Def.', f.defensa) + barra('Vel.', f.velocitat) +
      '<p class="mides">' + (f.alcada ?? '?') + ' m · ' + (f.pes ?? '?') + ' kg</p>' +
      '</article>';
  }
  caixa.innerHTML = html;
  for (const t of caixa.querySelectorAll('.targeta')) {
    t.onclick = () => {
      if (typeof tria === 'function') { tria(Number(t.dataset.id)); }
    };
  }
}

function mostraEquip(eq) {
  const caixa = document.getElementById('llocs');
  if (!eq || !Array.isArray(eq.membres)) {
    caixa.innerHTML = '<p class="buit">mostraEquip() necessita un objecte de la classe Equip.</p>';
    return;
  }
  document.getElementById('nom-equip').textContent = eq.nom;
  let html = '';
  for (let i = 0; i < 6; i++) {
    const m = eq.membres[i];
    html += m
      ? '<div class="lloc ple">' + imatge(m) + '<b>' + m.nom + '</b>' +
        '<button type="button" data-id="' + m.id + '" title="Treu-lo de l\'equip">×</button></div>'
      : '<div class="lloc"></div>';
  }
  caixa.innerHTML = html;
  for (const b of caixa.querySelectorAll('button')) {
    b.onclick = () => {
      if (typeof allibera === 'function') { allibera(Number(b.dataset.id)); }
    };
  }
  const poder = typeof eq.poder === 'function' ? eq.poder() : '—';
  document.getElementById('info-equip').textContent = eq.membres.length + ' de 6 · poder ' + poder;
  document.getElementById('recompte').innerHTML = typeof eq.recompteTipus === 'function'
    ? Object.entries(eq.recompteTipus()).map(([t, n]) => etiquetaTipus(t) + ' ' + n).join('  ')
    : '';
  for (const t of document.querySelectorAll('.targeta')) {
    const id = Number(t.dataset.id);
    t.classList.toggle('triat', eq.membres.some(m => m.id === id));
  }
}

let temporitzador = null;
function avisa(text) {
  const caixa = document.getElementById('avis');
  caixa.textContent = text;
  caixa.classList.add('visible');
  clearTimeout(temporitzador);
  temporitzador = setTimeout(() => caixa.classList.remove('visible'), 2500);
}

window.onload = () => {
  if (typeof inicia !== 'function') {
    document.getElementById('pokedex').innerHTML =
      '<p class="buit">Quan escriguis inicia() (R5), aquí sortiran els dotze Pokémon.</p>';
    return;
  }
  inicia();
};
