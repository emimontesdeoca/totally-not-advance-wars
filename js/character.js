const mappath = "../resources/characters/map/";
const facepath = "../resources/hud/faces/";
const characters = [
  {
    name: "archer",
    hp: 90,
    armor: 10,
    attack: 20,
    crit: 5,
    moverange: 2,
    attackrange: 3,
    source: mappath + "archer.png",
    face: facepath + "archer.png"
  },
  {
    name: "assasin",
    hp: 75,
    armor: 5,
    attack: 40,
    crit: 40,
    moverange: 2,
    attackrange: 1,
    source: mappath + "assasin.png",
    face: facepath + "assasin.png"
  },
  {
    name: "cavalier",
    hp: 120,
    armor: 20,
    attack: 25,
    crit: 10,
    moverange: 4,
    attackrange: 1,
    source: mappath + "cavalier.png",
    face: facepath + "cavalier.png"
  },
  {
    name: "knight",
    hp: 110,
    armor: 20,
    attack: 25,
    crit: 15,
    moverange: 2,
    attackrange: 1,
    source: mappath + "knight.png",
    face: facepath + "knight.png"
  },
  {
    name: "mercenary",
    hp: 100,
    armor: 10,
    attack: 30,
    crit: 0,
    moverange: 2,
    attackrange: 1,
    source: mappath + "mercenary.png",
    face: facepath + "mercenary.png"
  },
  {
    name: "pirate",
    hp: 50,
    armor: 0,
    attack: 20,
    crit: 80,
    moverange: 2,
    attackrange: 1,
    source: mappath + "pirate.png",
    face: facepath + "pirate.png"
  },
  {
    name: "sniper",
    hp: 50,
    armor: 0,
    attack: 20,
    crit: 10,
    moverange: 2,
    attackrange: 4,
    source: mappath + "sniper.png",
    face: facepath + "sniper.png"
  }
];

class character {
  constructor(pos) {
    let item = characters[Math.floor(Math.random() * characters.length)];
    this.name = item.name;
    this.hp = item.hp;
    this.armor = item.armor;
    this.attack = item.attack;
    this.crit = item.crit;
    this.moverange = item.moverange;
    this.attackrange = item.attackrange;
    this.source = item.source;
    this.face = item.face;
    this.position = pos;
  }
  move(pos) {
    this.position = pos;
  }
  attackCharacter(character) {
    character.hp -= this.attack;
  }
}

function getHpCharacter(name) {
  return characters.filter(x => x.name === name)[0].hp;
}
