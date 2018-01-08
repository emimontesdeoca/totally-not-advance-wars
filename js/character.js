const mappath = "resources/characters/map/";
const facepath = "resources/hud/faces/";
const characters = [
  {
    name: "army",
    hp: 150,
    armor: 10,
    attack: 20,
    crit: 5,
    moverange: 1,
    attackrange: 3,
    source: "army.png",
    face: facepath + "archer.png"
  },
  {
    name: "artillery",
    hp: 200,
    armor: 50,
    attack: 150,
    crit: 10,
    moverange: 2,
    attackrange: 1,
    source: "artillery.png",
    face: facepath + "assasin.png"
  },
  {
    name: "machine",
    hp: 200,
    armor: 60,
    attack: 100,
    crit: 10,
    moverange: 2,
    attackrange: 1,
    source: "machine.png",
    face: facepath + "cavalier.png"
  },
  {
    name: "missile",
    hp: 100,
    armor: 40,
    attack: 125,
    crit: 15,
    moverange: 2,
    attackrange: 1,
    source: "missile.png",
    face: facepath + "knight.png"
  },
  {
    name: "plane",
    hp: 150,
    armor: 10,
    attack: 80,
    crit: 0,
    moverange: 3,
    attackrange: 1,
    source: "plane.png",
    face: facepath + "mercenary.png"
  },
  {
    name: "tank",
    hp: 300,
    armor: 100,
    attack: 10,
    crit: 80,
    moverange: 2,
    attackrange: 1,
    source: "tank.png",
    face: facepath + "pirate.png"
  }
];

class character {
  constructor(player, pos, team) {
    let sourcepath = mappath;
    let item = characters[Math.floor(Math.random() * characters.length)];
    this.name = item.name;
    this.hp = item.hp;
    this.armor = item.armor;
    this.attack = item.attack;
    this.crit = item.crit;
    this.moverange = item.moverange;
    this.attackrange = item.attackrange;
    team == "team1"
      ? (sourcepath = sourcepath + "team1/")
      : (sourcepath = sourcepath + "team2/");
    this.source = sourcepath += item.source;
    this.face = item.face;
    this.position = pos;
    this.turnfinished = false;
    this.player = player;
  }
  move(pos) {
    this.position = pos;
    this.turnfinished = true;
    this.player.checkIfTurnFinished() == true ? advancewars.nextRound() : null;
  }
  attackCharacter(character) {
    character.hp -= this.attack;
    
    this.turnfinished = true;
    this.player.checkIfTurnFinished() == true ? advancewars.nextRound() : null;
  }
  finishTurn() {
    this.turnfinished = true;
    this.player.checkIfTurnFinished() == true ? advancewars.nextRound() : null;
  }
}

function getHpCharacter(name) {
  return characters.filter(x => x.name === name)[0].hp;
}
