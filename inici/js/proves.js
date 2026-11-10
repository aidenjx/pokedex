/* =====================================================================
   P07 · Banc de proves
   =====================================================================

   Aquest fitxer no s'ha de modificar, excepte per afegir casos al final
   de CASOS si ho demana el R7.

   Els casos fan servir MOSTRA_JSON, només tres Pokémon (Pikachu,
   Bulbasaur i Snorlax), perquè el resultat es pugui comprovar a mà.
   Quan l'enunciat i el banc de proves no coincideixen, preval el banc.
   ===================================================================== */

const MOSTRA_JSON = '[' +
  '{"id":25,"name":"pikachu","height":4,"weight":60,"types":[{"slot":1,"type":{"name":"electric"}}],"stats":[{"base_stat":35,"stat":{"name":"hp"}},{"base_stat":55,"stat":{"name":"attack"}},{"base_stat":40,"stat":{"name":"defense"}},{"base_stat":50,"stat":{"name":"special-attack"}},{"base_stat":50,"stat":{"name":"special-defense"}},{"base_stat":90,"stat":{"name":"speed"}}],"sprites":{"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}},' +
  '{"id":1,"name":"bulbasaur","height":7,"weight":69,"types":[{"slot":1,"type":{"name":"grass"}},{"slot":2,"type":{"name":"poison"}}],"stats":[{"base_stat":45,"stat":{"name":"hp"}},{"base_stat":49,"stat":{"name":"attack"}},{"base_stat":49,"stat":{"name":"defense"}},{"base_stat":65,"stat":{"name":"special-attack"}},{"base_stat":65,"stat":{"name":"special-defense"}},{"base_stat":45,"stat":{"name":"speed"}}],"sprites":{"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}},' +
  '{"id":143,"name":"snorlax","height":21,"weight":4600,"types":[{"slot":1,"type":{"name":"normal"}}],"stats":[{"base_stat":160,"stat":{"name":"hp"}},{"base_stat":110,"stat":{"name":"attack"}},{"base_stat":65,"stat":{"name":"defense"}},{"base_stat":65,"stat":{"name":"special-attack"}},{"base_stat":110,"stat":{"name":"special-defense"}},{"base_stat":30,"stat":{"name":"speed"}}],"sprites":{"front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"}}' +
  ']';

const MOSTRA = JSON.parse(MOSTRA_JSON);           // [pikachu, bulbasaur, snorlax]
const ids = llista => llista.map(x => x.id);

// Tres fitxes ja fetes, per provar la classe sense dependre de fitxa().
const F_PIKACHU   = { id: 25,  nom: 'Pikachu',   hp: 35,  atac: 55,  defensa: 40, velocitat: 90 };
const F_BULBASAUR = { id: 1,   nom: 'Bulbasaur', hp: 45,  atac: 49,  defensa: 49, velocitat: 45 };
const F_SNORLAX   = { id: 143, nom: 'Snorlax',   hp: 160, atac: 110, defensa: 65, velocitat: 30 };

const CASOS = [
  { crida: 'llegeixPokedex(MOSTRA_JSON) · noms', fer: () => llegeixPokedex(MOSTRA_JSON).map(p => p.name),
    esperat: ['pikachu', 'bulbasaur', 'snorlax'] },
  { crida: "majusculaInicial('bulbasaur')",    fer: () => majusculaInicial('bulbasaur'), esperat: 'Bulbasaur' },
  { crida: 'tipus(MOSTRA[1])',                 fer: () => tipus(MOSTRA[1]),             esperat: ['grass', 'poison'] },
  { crida: "stat(MOSTRA[0], 'speed')",         fer: () => stat(MOSTRA[0], 'speed'),     esperat: 90 },
  { crida: "stat(MOSTRA[0], 'luck')",          fer: () => stat(MOSTRA[0], 'luck'),      esperat: undefined },
  { crida: 'fitxa(MOSTRA[2])',                 fer: () => fitxa(MOSTRA[2]),
    esperat: { id: 143, nom: 'Snorlax', tipus: ['normal'],
               imatge: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
               hp: 160, atac: 110, defensa: 65, velocitat: 30, pes: 460, alcada: 2.1 } },
  { crida: 'afegeix dues vegades el mateix',
    fer: () => { const e = new Equip('Prova'); return [e.afegeix(F_PIKACHU), e.afegeix(F_PIKACHU)]; },
    esperat: [true, false] },
  { crida: 'te(25) i te(1) amb Pikachu a l\'equip',
    fer: () => { const e = new Equip('Prova'); e.afegeix(F_PIKACHU); return [e.te(25), e.te(1)]; },
    esperat: [true, false] },
  { crida: 'un setè membre no hi cap',
    fer: () => {
      const e = new Equip('Prova');
      for (let i = 1; i <= 6; i++) { e.afegeix({ id: i, hp: 1, atac: 1, defensa: 1, velocitat: 1 }); }
      return [e.afegeix({ id: 7 }), e.membres.length];
    },
    esperat: [false, 6] },
  { crida: 'treu(1) · ids',
    fer: () => {
      const e = new Equip('Prova');
      e.afegeix(F_PIKACHU); e.afegeix(F_BULBASAUR); e.afegeix(F_SNORLAX);
      e.treu(1);
      return ids(e.membres);
    },
    esperat: [25, 143] },
  { crida: 'poder() de Pikachu i Bulbasaur',
    fer: () => { const e = new Equip('Prova'); e.afegeix(F_PIKACHU); e.afegeix(F_BULBASAUR); return e.poder(); },
    esperat: 408 },
  { crida: 'desaEquip i recuperaEquip',
    fer: () => {
      const e = new Equip('Prova');
      e.afegeix(F_PIKACHU); e.afegeix(F_SNORLAX);
      desaEquip(e, 'p07-proves');
      const desat = JSON.parse(localStorage.getItem('p07-proves'));
      const r = recuperaEquip([F_BULBASAUR, F_PIKACHU, F_SNORLAX], 'p07-proves');
      localStorage.removeItem('p07-proves');
      return [desat, r instanceof Equip, r.nom, ids(r.membres)];
    },
    esperat: [{ nom: 'Prova', ids: [25, 143] }, true, 'Prova', [25, 143]] },

  // R7 · Només dual general: afegiu aquí els vostres dos casos, amb la mateixa forma.

];

// Compara dos valors. En els objectes, l'ordre de les propietats no importa.
function ordenat(valor) {
  if (Array.isArray(valor)) { return valor.map(ordenat); }
  if (valor && typeof valor === 'object') {
    const nou = {};
    for (const clau of Object.keys(valor).sort()) { nou[clau] = ordenat(valor[clau]); }
    return nou;
  }
  return valor;
}

function sonIguals(obtingut, esperat) {
  return JSON.stringify(ordenat(obtingut)) === JSON.stringify(ordenat(esperat));
}

function text(valor) {
  if (valor === undefined) { return 'undefined'; }
  return JSON.stringify(valor).replace(/"/g, "'");
}

function passarLesProves() {
  const llista = document.getElementById('proves');
  let encertats = 0;

  for (const cas of CASOS) {
    let obtingut;
    let detall = null;
    try {
      obtingut = cas.fer();
    } catch (error) {
      if (error instanceof ReferenceError) {
        detall = 'la funció encara no existeix';
      } else if (error instanceof TypeError && error.message.includes('is not a function')) {
        detall = 'el mètode encara no existeix';
      } else {
        detall = 'error: ' + error.message;
      }
    }
    const passa = detall === null && sonIguals(obtingut, cas.esperat);
    if (passa) { encertats++; }
    if (!passa && detall === null) {
      detall = 'esperat ' + text(cas.esperat) + ', obtingut ' + text(obtingut);
    }
    const li = document.createElement('li');
    li.className = passa ? 'passa' : 'falla';
    li.innerHTML =
      '<span class="marca">' + (passa ? '✓' : '✗') + '</span>' +
      '<span class="cas">' + cas.crida + '</span>' +
      '<span class="detall">' + (passa ? 'correcte' : detall) + '</span>';
    llista.appendChild(li);
    console.log((passa ? '✓' : '✗') + '  ' + cas.crida + '  →  ' + (passa ? 'correcte' : detall));
  }

  const resum = document.getElementById('resum');
  resum.textContent = encertats + ' de ' + CASOS.length + ' casos passen.';
  resum.className = 'resum ' + (encertats === CASOS.length ? 'tot' : 'falten');
}

passarLesProves();
