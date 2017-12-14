function showInformationInMenu(e) {
  let charinformation = getCharacterByPosition(players, e.srcElement.id);

  let currentHP = e.srcElement.getAttribute("hp");

  let charhp = document.getElementById("char-information-id");
  let charattack = document.getElementById("char-information-ad");
  let chararmor = document.getElementById("char-information-ar");

  charhp.innerHTML = charinformation.hp + " HEALTH";
  charattack.innerHTML = charinformation.attack + " DAMAGE";
  chararmor.innerHTML = charinformation.armor + " ARMOR";

  document.getElementById("info-char").setAttribute("char", e.srcElement.id);

  // let charelement = document.getElementById(charid.getAttribute("char"));

  let hudcontainer = document.getElementById("char-infomartion");
  hudcontainer.style.display = "inline";

  // var offsetelement = document.getElementById("B20");
  // console.log(offsetelement);
  // var eleX = offsetelement.offsetLeft + offsetelement.scrollLeft;
  // var eleY = offsetelement.offsetTop + offsetelement.scrollTop;
  // console.log(eleX + "," + eleY);

  // hudcontainer.style.left = eleX + 150 + "px";
  // hudcontainer.style.top = eleY + 50 + "px";

  // console.log(hudcontainer.style.left + "," + hudcontainer.style.top);

  let charmenu = document.getElementById("char-menu");

  var left = e.clientX + 5 + "px";
  var top = e.clientY + 6 + "px";

  charmenu.style.display = "inline";
  charmenu.style.left = left;
  charmenu.style.top = top;

  let btnmover = document.getElementById("btn-mover");
  let btnatacar = document.getElementById("btn-atacar");
  let btnterminar = document.getElementById("btn-terminar");

  if (
    document.getElementById(e.srcElement.id).getAttribute("finished") == "false"
  ) {
    btnmover.disabled = false;
    btnatacar.disabled = false;
    btnterminar.disabled = false;
  } else {
    btnmover.disabled = true;
    btnatacar.disabled = true;
    btnterminar.disabled = true;
  }
}

function clearInformationMenu() {
  if (document.querySelectorAll("td.move").length == 0) {
    SetNotMovableTd();
  }
  let charid = document.getElementById("info-char");

  let charhp = document.getElementById("char-information-id");
  let charattack = document.getElementById("char-information-ad");
  let chararmor = document.getElementById("char-information-ar");
  // let charcrit = document.getElementById("character-crit");

  // charid.removeAttribute("char");
  // charimage.src = "";
  // charname.innerHTML = "";
  charhp.innerHTML = "";
  charattack.innerHTML = "";
  chararmor.innerHTML = "";
  // charcrit.innerHTML = "";

  let hudcontainer = document.getElementById("char-infomartion");
  hudcontainer.style.display = "none";

  let charmenu = document.getElementById("char-menu");
  charmenu.style.display = "none";
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
  // let btnmover = document.getElementById("btn-mover");
  // let btnatacar = document.getElementById("btn-atacar");
  // let btnatacar = document.getElementById("btn-atacar");
  // btnmover.disabled = true;
  // btnatacar.disabled = true;
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