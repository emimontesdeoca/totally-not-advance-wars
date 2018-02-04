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

  let charmenu = document.getElementById("char-menu");

  var left = e.clientX + 5 + "px";
  var top = e.clientY + 6 + "px";

  charmenu.style.display = "inline";
  charmenu.style.left = left;
  charmenu.style.top = top;

  try {
    e.srcElement.src.indexOf("team1") == -1
      ? (hudcontainer.className = "charinfo-team2")
      : (hudcontainer.className = "charinfo-team1");
  } catch (error) {}

  let btnmover = document.getElementById("btn-mover");
  let btnatacar = document.getElementById("btn-atacar");
  let btnterminar = document.getElementById("btn-terminar");

  // console.log(document.getElementById(e.srcElement.id));
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
  if (
    document.querySelectorAll("td.move").length == 0 &&
    document.querySelectorAll("td.attack").length == 0
  ) {
    document.querySelectorAll("td.move").length == 0 ? SetNotMovableTd() : null;
    document.querySelectorAll("td.attack").length == 0
      ? SetNotMovableTd()
      : null;
  }

  // document.querySelectorAll("td.move").length == 0 ? SetNotMovableTd() : null;
  // document.querySelectorAll("td.attack").length == 0 ? SetNotMovableTd() : null;

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

function showAttackableTilesOfLoadedCharacter() {
  let charid = document.getElementById("info-char");

  let id = charid.getAttribute("char");
  let elementChar = document.getElementById(id);
  showAttackableTiles(elementChar);
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

function log(player, turn, message) {
  var cont = document.getElementById("log");

  let p = document.createElement("p");
  p.setAttribute("class", "log");

  let spanPlayer = document.createElement("span");
  spanPlayer.innerHTML = "<b>" + player + "</b> - ";
  p.appendChild(spanPlayer);

  let spanTurn = document.createElement("span");
  spanTurn.innerHTML = "day " + turn + " - ";
  p.appendChild(spanTurn);

  let spanMessage = document.createElement("span");
  spanMessage.innerHTML = message;
  p.appendChild(spanMessage);

  cont.appendChild(p);

  cont.scrollTop = cont.scrollHeight;
}

function logMaster(message) {
  var cont = document.getElementById("log");

  let p = document.createElement("p");
  p.setAttribute("class", "log");

  p.innerHTML = message;

  cont.appendChild(p);
  cont.scrollTop = cont.scrollHeight;
}

function showFinishMenu(turn, armyleft, difficulty, time) {
  var r = document.getElementById("rounds");
  var a = document.getElementById("armyleft");
  var d = document.getElementById("diff");
  var t = document.getElementById("time");

  r.innerText = turn;
  a.innerText = armyleft;
  d.innerText = difficulty;
  t.innerText = time;

  var s = document.getElementById("score");

  var finalscore = Math.floor(
    parseInt(turn) * parseInt(armyleft) * parseInt(time) / parseInt(difficulty)
  );

  s.innerText = finalscore;

  var f = document.getElementById("finishmenu");
  f.setAttribute("style", "display:initial");

  deleteCharactersOnMap();
  clearInformationMenu();

  /// Set score
  let scores = JSON.parse(localStorage.getItem("scores"));

  if (scores == null) {
    scores = [];
  }
  var currentGame = JSON.parse(localStorage.getItem("currentGame"));
  let obj = {
    gameId: currentGame.gameId,
    user: currentGame.user,
    score: finalscore
  };
  scores.push(obj);

  localStorage.setItem("scores", JSON.stringify(scores));
}
