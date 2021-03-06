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

/**
 * Character object
 */
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
  /**
   * Move some character to next pos
   * @param {*} pos
   */
  move(pos) {
    // var a = checkIfFinishedGame();
    // console.log(a);

    var msg =
      "Moved " +
      this.name +
      " from <b>" +
      this.position +
      "</b> to " +
      pos +
      "!";
    log(this.player.name, advancewars.turn, msg);

    this.position = pos;
    this.turnfinished = true;
    this.player.checkIfTurnFinished() == true ? advancewars.nextRound() : null;
  }
  /**
   * Attack some character
   * @param {*} character
   */
  attackCharacter(character) {
    var msg =
      "Atacked " +
      character.name +
      " with " +
      this.name +
      " and dealt <b>" +
      this.attack +
      "</b> damage!";
    log(this.player.name, advancewars.turn, msg);
    character.hp -= this.attack;

    var a = checkIfFinishedGame();
    console.log(a);

    if (a == null || a == undefined) {
      this.turnfinished = true;
      this.player.checkIfTurnFinished() == true
        ? advancewars.nextRound()
        : null;
    } else {
      logMaster("<b>GAME</b> - " + a.name + " has lost!");

      clearInterval(globalTimer);

      var armyleft = 0;
      players.forEach(element => {
        if (element.name != a.name) {
          element.characters.forEach(c => {
            if (c.hp > 0) {
              armyleft++;
            }
          });
        }
      });

      showFinishMenu(advancewars.turn, armyleft, difficulty, timer);
    }
  }
  /**
   * Finish turn of this character
   */
  finishTurn() {
    var msg = "Finished " + this.name + " turn on " + this.position + ".";
    log(this.player.name, advancewars.turn, msg);
    this.turnfinished = true;
    this.player.checkIfTurnFinished() == true ? advancewars.nextRound() : null;
  }
}

/**
 * Returns character's hp
 * @param {*} name
 */
function getHpCharacter(name) {
  return characters.filter(x => x.name === name)[0].hp;
}

/**
 * Check if game is finished
 */
function checkIfFinishedGame() {
  var player = null;

  players.filter(element => {
    var l = element.characters.length;
    var contador = 0;

    element.characters.forEach(c => {
      if (c.hp <= 0) {
        contador++;
      }
    });

    if (l == contador) {
      player = element;
    }
  });

  return player;
}
