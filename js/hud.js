function showInformationInMenu(e) {
  let charinformation = getCharacterByPosition(players, e.srcElement.id);

  let currentHP = e.srcElement.getAttribute("hp");

  let charid = document.getElementById("info-char");
  let charimage = document.getElementById("character-face");
  let charname = document.getElementById("character-name");
  let charhp = document.getElementById("character-hp");
  let charattack = document.getElementById("character-attack");
  let chararmor = document.getElementById("character-armor");
  let charcrit = document.getElementById("character-crit");

  charid.setAttribute("char", e.srcElement.id);
  charimage.src = charinformation.face;
  charname.innerHTML = charinformation.name;
  charhp.innerHTML =
    "Health: " +
    charinformation.hp +
    "/" +
    getHpCharacter(charinformation.name);
  charattack.innerHTML = "Attack: " + charinformation.attack;
  chararmor.innerHTML = "Armor: " + charinformation.armor;
  charcrit.innerHTML = "Critical: " + charinformation.crit + "%";

  let charelement = document.getElementById(charid.getAttribute("char"));

  if (charelement.getAttribute("finished") == "false") {
    let btnmover = document.getElementById("btn-mover");
    let btnatacar = document.getElementById("btn-atacar");

    btnmover.disabled = false;
    btnatacar.disabled = false;
  }
}

function clearInformationMenu() {
  let charid = document.getElementById("info-char");

  let charimage = document.getElementById("character-face");
  let charname = document.getElementById("character-name");
  let charhp = document.getElementById("character-hp");
  let charattack = document.getElementById("character-attack");
  let chararmor = document.getElementById("character-armor");
  let charcrit = document.getElementById("character-crit");

  // charid.removeAttribute("char");
  charimage.src = "";
  charname.innerHTML = "";
  charhp.innerHTML = "";
  charattack.innerHTML = "";
  chararmor.innerHTML = "";
  charcrit.innerHTML = "";
}

function showCurrentGameInformation(e) {
  let turn = document.getElementById("info-turn");
  let player1pj = document.getElementById("player1-char");
  let player2pj = document.getElementById("player2-char");
  let currposition = document.getElementById("current-pos");

  player1pj.innerText = players[0].characters.length;
  player2pj.innerText = players[1].characters.length;
  currposition.innerText = e.srcElement.id;
}

function showMovableTilesOfLoadedCharacter() {
  let charid = document.getElementById("info-char");

  let id = charid.getAttribute("char");
  let elementChar = document.getElementById(id);
  showMovableTiles(elementChar);
}

function disableButtons() {
  let btnmover = document.getElementById("btn-mover");
  let btnatacar = document.getElementById("btn-atacar");
  let btnatacar = document.getElementById("btn-atacar");

  btnmover.disabled = true;
  btnatacar.disabled = true;
}

function finishTurno() {
  let charid = document.getElementById("info-char");

  let id = charid.getAttribute("char");
  let elementChar = document.getElementById(id);

  let charinformation = getCharacterByPosition(players, elementChar.id);

  charinformation.finishTurno = true;
  deleteCharactersOnMap();
  renderCharacters(players);
}
