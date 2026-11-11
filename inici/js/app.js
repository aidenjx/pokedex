/* =====================================================================
   P07 · La Pokèdex
   Alumne/a: ......................................
   Data:     ......................................

   Escriu només on posa ESCRIU AQUÍ.

   Altres fitxers que fa servir la pàgina, i que no s'han de modificar:
     js/dades.js    POKEDEX_JSON: el text que retornaria la PokeAPI
     js/pagina.js   les eines per dibuixar la pàgina (llegeix-ne la capçalera)
     js/proves.js   el banc de proves

   Un Pokémon, tal com ve del JSON, té aquesta forma (abreujada):
     {
       id: 25, name: 'pikachu', height: 4, weight: 60,
       types:   [ { slot: 1, type: { name: 'electric' } } ],
       stats:   [ { base_stat: 35, stat: { name: 'hp' } },
                  { base_stat: 55, stat: { name: 'attack' } }, … ],
       sprites: { front_default: 'https://…/25.png' }
     }
   Obre la consola i escriu JSON.parse(POKEDEX_JSON)[3] per veure'n un de sencer.
   ===================================================================== */

// Les dades de la pàgina. inicia() les omple (R5).
let fitxes = [];
let equip = null;

/* ---------------------------------------------------------------------
   R1 · Llegir el JSON

   Les dues funcions ja estan declarades. Cada una es resol amb una línia.
   --------------------------------------------------------------------- */

/**
 * Converteix el text JSON de la Pokédex en un array de Pokémon.
 * @param {string} text - Text JSON amb les dades de la Pokédex.
 * @returns {Object[]} Els Pokémon llegits.
 * @example llegeixPokedex(POKEDEX_JSON) // un array de 12 objectes
 */
function llegeixPokedex(text) {
  return JSON.parse(text);
}

/**
 * Escriu en majúscula la primera lletra d'un nom.
 * @param {string} nom - Nom que es vol transformar.
 * @returns {string} El nom amb la inicial en majúscula.
 * @example majusculaInicial('pikachu') // 'Pikachu'
 */
function majusculaInicial(nom) {
  return nom[0].toUpperCase() + nom.slice(1);
}

/* ---------------------------------------------------------------------
   R2 · Dades niuades

   Escriu cada funció sencera a sota del seu bloc de documentació.
   --------------------------------------------------------------------- */

/**
 * Els noms dels tipus d'un Pokémon.
 * Mètode: map. Cada element de p.types és un objecte; el nom és a dins de type.
 * @param {Object} p - Un Pokémon tal com ve del JSON.
 * @returns {string[]}
 * @example tipus(bulbasaur) // ['grass', 'poison']
 */
function tipus(p) {
  return p.types.map((element) => element.type.name);
}

/**
 * El valor d'una estadística: 'hp', 'attack', 'defense', 'speed'…
 * Si el Pokémon no té aquesta estadística, retorna undefined, sense error.
 * Mètode: find, i després ?. per llegir base_stat (tema 4.4).
 * @param {Object} p
 * @param {string} nom
 * @returns {number|undefined}
 * @example stat(pikachu, 'speed') // 90
 */

function stat(p, nom) {
  return p.stats.find((s) => s.stat.name === nom)?.base_stat;
}

/**
 * Una fitxa senzilla, en català, amb les dades que fa servir la pàgina.
 * Retorna un objecte literal amb aquestes deu propietats:
 *   id, nom (amb majusculaInicial), tipus (amb tipus), imatge (sprites.front_default),
 *   hp, atac, defensa, velocitat (amb stat: 'hp', 'attack', 'defense', 'speed'),
 *   pes en kg i alcada en metres.
 * Atenció a les unitats: weight ve en hectograms i height en decímetres.
 * @param {Object} p
 * @returns {Object}
 * @example fitxa(pikachu).pes // 6
 */
function fitxa(p) {}

/* ---------------------------------------------------------------------
   R3 · La classe Equip

   El constructor ja està fet. Escriu els quatre mètodes a dins de la
   classe, a sota de cada comentari. Dins d'un mètode, l'equip és this.
   --------------------------------------------------------------------- */

class Equip {
  constructor(nom) {
    this.nom = nom;
    this.membres = []; // fitxes, com les que retorna fitxa()
  }

  /**
   * Diu si a l'equip hi ha un membre amb aquest id.
   * Mètode: some.
   * @param {number} id
   * @returns {boolean}
   */
  // ESCRIU AQUÍ el mètode te

  /**
   * Afegeix una fitxa a l'equip, si es pot.
   * No es pot si l'equip ja té sis membres o si la fitxa ja hi és (fes servir te).
   * @param {Object} f - Una fitxa.
   * @returns {boolean} true si l'ha afegida; false si no.
   */
  // ESCRIU AQUÍ el mètode afegeix

  /**
   * Treu de l'equip el membre amb aquest id.
   * Mètode: filter. Recorda desar el resultat a this.membres.
   * @param {number} id
   */
  // ESCRIU AQUÍ el mètode treu

  /**
   * El poder de l'equip: la suma de hp, atac, defensa i velocitat de tots els membres.
   * Mètode: reduce.
   * @returns {number}
   */
  // ESCRIU AQUÍ el mètode poder

  // R7 · Només dual general: el mètode recompteTipus va aquí.
}

/* ---------------------------------------------------------------------
   R4 · Desar i recuperar
   --------------------------------------------------------------------- */

/**
 * Desa l'equip a localStorage, amb aquesta clau.
 * Només es desen el nom i els ids dels membres, en un objecte com aquest:
 *   { nom: 'El meu equip', ids: [25, 143] }
 * convertit en text amb JSON.stringify.
 * @param {Equip} eq
 * @param {string} [clau='p07-equip']
 */
// ESCRIU AQUÍ la funció desaEquip

/**
 * Reconstrueix l'equip que hi ha desat a localStorage amb aquesta clau.
 *   1. Llegeix el text de localStorage.
 *   2. Si no n'hi ha (és null), retorna new Equip('El meu equip').
 *   3. Converteix el text en objecte amb JSON.parse.
 *   4. Crea un Equip nou amb el nom desat.
 *   5. Per cada id desat, busca la fitxa a totes i afegeix-la a l'equip.
 *   6. Retorna l'equip.
 * @param {Object[]} totes - Les fitxes de tots els Pokémon.
 * @param {string} [clau='p07-equip']
 * @returns {Equip}
 */
// ESCRIU AQUÍ la funció recuperaEquip

/* ---------------------------------------------------------------------
   R5 · La pàgina

   Tres funcions sense valor de retorn. La pàgina les crida soles: no les
   has de cridar tu. Les eines de pagina.js fan la part de la pàgina.

   inicia(), quan es carrega la pàgina:
     1. Llegeix POKEDEX_JSON i converteix cada Pokémon en una fitxa.
        Desa el resultat a la variable fitxes.
     2. Recupera l'equip desat i desa'l a la variable equip.
     3. Mostra les fitxes amb mostraPokedex().
     4. Mostra l'equip amb mostraEquip().

   tria(id), quan es clica la targeta d'un Pokémon:
     1. Busca a fitxes la que té aquest id.
     2. Intenta afegir-la a l'equip. Si no es pot, mostra un avís amb avisa():
        «Pikachu ja és a l'equip.» o «L'equip ja té sis membres.»
     3. Desa l'equip i mostra'l.

   allibera(id), quan es clica la creu d'un membre de l'equip:
     treu-lo de l'equip, desa l'equip i mostra'l.
   --------------------------------------------------------------------- */

// ESCRIU AQUÍ les funcions inicia, tria i allibera

/* ---------------------------------------------------------------------
   R7 · NOMÉS DUAL GENERAL

   Mètode recompteTipus() de la classe Equip (escriu-lo a dins de la classe):
   quants membres hi ha de cada tipus. Mètode: reduce amb {} com a valor
   inicial. Un Pokémon amb dos tipus compta a tots dos.
     Per exemple: { electric: 1, normal: 2, grass: 1, poison: 1 }
   Quan existeixi, la pàgina el mostra sola sota l'equip.
   --------------------------------------------------------------------- */
