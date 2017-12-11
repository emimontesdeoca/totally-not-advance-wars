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
  let charid = document.getElementById("info-char");
  if (charid.getAttribute("char") == null) {
    alert("Seleccione un personaje!");
  } else {
    var b = prompt("dime a donde lo quieres mover");

    var char = getCharacterByPosition(players, charid.getAttribute("char"));
    console.log(char);
    deleteCharactersOnMap();

    char.move(b);
    console.log(char);
    renderCharacters(players);
  }
}

function atacar() {
  let charid = document.getElementById("info-char");
  if (charid.getAttribute("char") == null) {
    alert("Seleccione un personaje!");
  } else {
    var b = prompt("dime a aquien quieres atacar");

    var attacker = getCharacterByPosition(players, charid.getAttribute("char"));
    var attacked = getCharacterByPosition(players, b);
    console.log(attacked.hp);

    attacker.attack(attacked);
    console.log(attacked.hp);
  }
}
