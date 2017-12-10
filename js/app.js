generateMap();
// generateCharacters();

var player1 = new player("emi", 1);
console.log(player1);

var player2 = new player("brian", 2);
console.log(player2);

var players = [];
players.push(player1);
players.push(player2);

renderCharacters(players);

function mover() {
  var a = prompt("dime a quien quieres mover");
  var b = prompt("dime a donde lo quieres mover");

  var char = getCharacterByPosition(players, a);
  console.log(char);
  deleteCharactersOnMap();

  char.move(b);
  console.log(char);
  renderCharacters(players);
}

function atacar() {
  var a = prompt("dime con quien quieres atacar");
  var b = prompt("dime a aquien quieres atacar");

  var attacker = getCharacterByPosition(players, a);
  var attacked = getCharacterByPosition(players, b);
  console.log(attacked.hp);

  attacker.attack(attacked);
  console.log(attacked.hp);
}
