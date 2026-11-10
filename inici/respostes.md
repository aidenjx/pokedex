# P07 · Respostes

Alumne/a:
Data:
Modalitat (dual general o dual intensiva):

---

## R6 · Entendre els objectes

Respostes curtes, de dues a quatre línies cadascuna. Comprova-ho a la consola abans de respondre.

**1. Què es desa en JSON.** Amb dos o tres Pokémon a l'equip, escriu a la consola `JSON.stringify(equip)`.
Hi surt el mètode `afegeix`? Després escriu `const copia = JSON.parse(JSON.stringify(equip));` i
`copia.afegeix`. Què surt, i per què? Explica per què `desaEquip()` desa només els ids i
`recuperaEquip()` fa `new Equip`.


**2. Dues variables, un equip.** Escriu `const altre = equip;` i després `altre.treu(25);` (o l'id
d'un Pokémon que tinguis a l'equip). Què ha passat amb `equip.membres`? Per què?


**3. Sense `?.`.** Treu temporalment el `?.` de `stat()`. Quin cas del banc falla ara, i quin missatge
d'error surt? Per què passa? Torna-ho a deixar com estava.


---

## R7 · El recompte de tipus

> Aquest apartat és **només per a la modalitat dual general**. Si ets de dual intensiva,
> l'entrega s'acaba al R6 i aquesta secció la pots esborrar.

**1.** Escriu el mètode `recompteTipus()` a la classe `Equip`. Quan existeixi, sota l'equip sortirà el
recompte.

**2.** Fes un equip amb Bulbasaur i Gengar. Per què la suma del recompte no coincideix amb el nombre de
membres? Pot passar el contrari, que la suma sigui més petita?


**3. Dos casos nous al banc de proves**, al final de `CASOS` a `js/proves.js`:

- Un de `recompteTipus()`.
- Un altre d'un mètode o una funció que els casos inicials no comprovin prou, triat per tu. Per exemple:
  `recuperaEquip()` quan no hi ha res desat, o `poder()` d'un equip buit.

Explica per què has triat cadascun.

Cas nou 1:

Cas nou 2:
