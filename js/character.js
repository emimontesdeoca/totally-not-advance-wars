const resourcespath = "../resources/characters/map/";
const characters = [
  {
    name: "archer",
    hp: 90,
    armor: 10,
    attack: 20,
    crit: 5,
    moverange: 2,
    attackrange: 3,
    source: resourcespath + "archer.png"
  },
  {
    name: "assasin",
    hp: 75,
    armor: 5,
    attack: 40,
    crit: 40,
    moverange: 2,
    attackrange: 1,
    source: resourcespath + "assasin.png"
  },
  {
    name: "cavalier",
    hp: 120,
    armor: 20,
    attack: 25,
    crit: 10,
    moverange: 4,
    attackrange: 1,
    source: resourcespath + "cavalier.png"
  },
  {
    name: "knight",
    hp: 110,
    armor: 20,
    attack: 25,
    crit: 15,
    moverange: 2,
    attackrange: 1,
    source: resourcespath + "knight.png"
  },
  {
    name: "mercenary",
    hp: 100,
    armor: 10,
    attack: 30,
    crit: 0,
    moverange: 2,
    attackrange: 1,
    source: resourcespath + "mercenary.png"
  },
  {
    name: "pirate",
    hp: 50,
    armor: 0,
    attack: 20,
    crit: 80,
    moverange: 2,
    attackrange: 1,
    source: resourcespath + "pirate.png"
  },
  {
    name: "sniper",
    hp: 50,
    armor: 0,
    attack: 20,
    crit: 10,
    moverange: 2,
    attackrange: 4,
    source: resourcespath + "sniper.png"
  }
];

function getInfoCharacter(name) {
  return characters.filter(e => e.name == name);
}
