const trsize = 15;
const tdsize = 24;

function generateMap(mapnumber) {
  let container = document.getElementById("map");

  let string = "resources/maps/aw" + mapnumber + ".png";
  console.log(string);
  container.setAttribute("style", "background-image: url(" + string + ");");

  let table = document.createElement("table");
  table.id = "main-table";
  table.className = "theme-table";
  let numbertd = 0;
  for (let index = 0; index < trsize; index++) {
    let tr = document.createElement("tr");

    for (let i = 0; i < tdsize; i++) {
      let td = document.createElement("td");
      let id = getLetterByIndex(index) + i;
      td.id = id;
      td.setAttribute("pos", numbertd);
      td.setAttribute("title", id);
      td.addEventListener("click", clearInformationMenu, false);
      td.addEventListener("click", deleteClassesTd, false);
      // td.addEventListener("mouseover", showCurrentGameInformation, false);
      td.addEventListener("click", disableButtons, false);

      numbertd++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  container.appendChild(table);

 
}

function getLetterByIndex(index) {
  let letters = "abcdefghijklmnopq";
  return letters.charAt(index).toUpperCase();
}

function enableCharactersByTurn(turn) {
  if (turn % 2 == 0) {
    players[0].characters.forEach(element => {
      element.turnfinished = false;
    });
    players[1].characters.forEach(element => {
      element.turnfinished = true;
    });
  } else {
    players[0].characters.forEach(element => {
      element.turnfinished = true;
    });
    players[1].characters.forEach(element => {
      element.turnfinished = false;
    });
  }
}

function renderCharacters(players) {
  players.forEach(player => {
    player.characters.forEach(element => {
      if (element.hp <= 0) {
        var index = player.characters.indexOf(element);
        console.log("index: " + index);
        player.deleteCharacter(index);
      } else {
        let td = document.getElementById(element.position);
        // let source_img = (td.innerHTML = "<img src='" + element.source + "'/>");

        let img = document.createElement("img");
        img.src = element.source;
        img.id = element.position;

        img.setAttribute("player", player.name);
        img.setAttribute("finished", element.turnfinished);
        img.addEventListener("click", showInformationInMenu, false);

        td.appendChild(img);

        td.setAttribute("player", player.name);
        td.setAttribute("finished", element.turnfinished);
        td.addEventListener("click", showInformationInMenu, false);

        if (element.turnfinished) {
          img.className = "disabled";
          td.className = "disabled";
        }
      }
    });
  });
}

function deleteCharactersOnMap() {
  var tds = document.getElementsByTagName("td");

  for (let index = 0; index < tds.length; index++) {
    const td = tds[index];
    td.source = "";
    td.removeAttribute("player");
    td.removeAttribute("finished");
    td.removeAttribute("class");

    var myNode = document.getElementById(td.id);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }
}

function deleteClassesTd() {
  let tds = document.getElementsByTagName("td");

  for (let index = 0; index < tds.length; index++) {
    const element = tds[index];
    element.getAttribute("finished") == "true"
      ? (element.className = "disabled")
      : (element.className = "");
  }
}

function getCharacterByPosition(players, pos) {
  let a = players.filter(
    e => e.name == document.getElementById(pos).getAttribute("player")
  );

  let char = null;

  a[0].characters.forEach(element => {
    element.position == pos ? (char = element) : null;
  });

  return char;
}

function showMovableTiles(e) {
  let a = document.getElementById("info-char").getAttribute("char");
  let char = getCharacterByPosition(players, a);
  let tds = document.querySelectorAll("td");
  let moverange = char.moverange;
  let currpos = parseInt(e.getAttribute("pos"));

  SetNotMovableTd();

  // arriba

  for (let index = 0; index <= moverange; index++) {
    let itemid = tds[currpos - index].id.substr(1);
    try {
      let toppos = currpos - index * tdsize;
      try {
        tds[toppos].className = "notmove";
        tds[toppos].setAttribute("movable", "false");
        try {
          tds[toppos - tdsize].className = "notmove";
        } catch (error) {}

        // derecha

        for (let i = 0; i <= moverange - index; i++) {
          try {
            let limit = parseInt(tds[toppos + i].id.substring(1));
            let current = parseInt(tds[toppos].id.substring(1));

            if (limit <= tdsize - 1 && limit >= current) {
              tds[toppos + i].className = "move";
              tds[toppos + i].setAttribute("movable", "true");
              tds[toppos + i].addEventListener("click", moveCharacter, false);

              tds[toppos + i].getAttribute("player") != null
                ? (tds[toppos + i].className = "notmove")
                : null;

              parseInt(tds[toppos + 1 + i].id.substring(1)) >= current
                ? (tds[toppos + 1 + i].className = "notmove")
                : null;
            }
          } catch (error) {}
        }
      } catch (error) {}

      // izquierda

      try {
        for (let i = 0; i <= moverange - index; i++) {
          try {
            let limit = parseInt(tds[toppos - i].id.substring(1));
            let current = parseInt(tds[toppos].id.substring(1));

            if (limit >= 0 && limit <= current) {
              tds[toppos - i].className = "move";
              tds[toppos - i].setAttribute("movable", "true");
              tds[toppos - i].addEventListener("click", moveCharacter, false);

              tds[toppos - i].getAttribute("player") != null
                ? (tds[toppos - i].className = "notmove")
                : null;

              parseInt(tds[toppos - 1 - i].id.substring(1)) <= current
                ? (tds[toppos - 1 - i].className = "notmove")
                : null;
            }
          } catch (error) {}
        }
      } catch (error) {}
    } catch (error) {}
  }

  /// abajo

  for (let index = 0; index <= moverange; index++) {
    try {
      let toppos = currpos + index * tdsize;
      try {
        tds[toppos + tdsize].className = "notmove";
      } catch (error) {}
      try {
        tds[toppos].className = "notmove";
        tds[toppos].setAttribute("movable", "true");

        // derecha

        for (let i = 0; i <= moverange - index; i++) {
          let limit = parseInt(tds[toppos + i].id.substring(1));
          let current = parseInt(tds[toppos].id.substring(1));

          if (limit <= tdsize - 1 && limit >= current) {
            tds[toppos + i].className = "move";
            tds[toppos + i].setAttribute("movable", "true");
            tds[toppos + i].addEventListener("click", moveCharacter, false);

            tds[toppos + i].getAttribute("player") != null
              ? (tds[toppos + i].className = "notmove")
              : null;

            parseInt(tds[toppos + 1 + i].id.substring(1)) >= current
              ? (tds[toppos + 1 + i].className = "notmove")
              : null;
          }
        }
      } catch (error) {}

      // izquierda

      try {
        for (let i = 0; i <= moverange - index; i++) {
          let limit = parseInt(tds[toppos - i].id.substring(1));
          let current = parseInt(tds[toppos].id.substring(1));

          if (limit >= 0 && limit <= current) {
            tds[toppos - i].className = "move";
            tds[toppos - i].setAttribute("movable", "true");
            tds[toppos - i].addEventListener("click", moveCharacter, false);

            tds[toppos - i].getAttribute("player") != null
              ? (tds[toppos - i].className = "notmove")
              : null;

            parseInt(tds[toppos - 1 - i].id.substring(1)) <= current
              ? (tds[toppos - 1 - i].className = "notmove")
              : null;
          }
        }
      } catch (error) {}
    } catch (error) {}
  }

  tds[currpos].setAttribute("movable", "false");
  tds[currpos].removeEventListener("click", moveCharacter, false);

  let charmenu = document.getElementById("char-menu");
  charmenu.style.display = "none";
}

function showAttackableTiles(e) {
  let a = document.getElementById("info-char").getAttribute("char");
  let char = getCharacterByPosition(players, a);
  let tds = document.querySelectorAll("td");
  let moverange = char.attackrange;
  let currpos = parseInt(e.getAttribute("pos"));

  SetNotMovableTd();

  // arriba

  for (let index = 0; index <= moverange; index++) {
    let itemid = tds[currpos - index].id.substr(1);
    try {
      let toppos = currpos - index * tdsize;
      try {
        tds[toppos].className = "notmove";
        tds[toppos].setAttribute("movable", "false");
        try {
          tds[toppos - tdsize].className = "notmove";
        } catch (error) {}

        // derecha

        for (let i = 0; i <= moverange - index; i++) {
          try {
            let limit = parseInt(tds[toppos + i].id.substring(1));
            let current = parseInt(tds[toppos].id.substring(1));

            if (limit <= tdsize - 1 && limit >= current) {
              tds[toppos + i].getAttribute("player") != null
                ? (tds[toppos + i].className = "notmove")
                : null;

              if (
                tds[toppos + i].getAttribute("player") ==
                tds[currpos].getAttribute("player")
              ) {
                tds[toppos + i].className = "notmove";
              } else if (
                tds[toppos + i].getAttribute("player") !=
                  tds[currpos].getAttribute("player") &&
                tds[toppos + i].getAttribute("player") != null
              ) {
                tds[toppos + i].setAttribute("attackable", "true");
                tds[toppos + i].className = "attack";
                tds[toppos + i].addEventListener(
                  "click",
                  attackCharacter,
                  false
                );
              }

              parseInt(tds[toppos + 1 + i].id.substring(1)) >= current
                ? (tds[toppos + 1 + i].className = "notmove")
                : null;
            }
          } catch (error) {}
        }
      } catch (error) {}

      // izquierda

      try {
        for (let i = 0; i <= moverange - index; i++) {
          try {
            let limit = parseInt(tds[toppos - i].id.substring(1));
            let current = parseInt(tds[toppos].id.substring(1));

            if (limit >= 0 && limit <= current) {
              if (
                tds[toppos - i].getAttribute("player") ==
                tds[currpos].getAttribute("player")
              ) {
                tds[toppos - i].className = "notmove";
              } else if (
                tds[toppos - i].getAttribute("player") !=
                  tds[currpos].getAttribute("player") &&
                tds[toppos - i].getAttribute("player") != null
              ) {
                tds[toppos - i].setAttribute("attackable", "true");
                tds[toppos - i].className = "attack";
                tds[toppos - i].addEventListener(
                  "click",
                  attackCharacter,
                  false
                );
              }

              parseInt(tds[toppos - 1 - i].id.substring(1)) <= current
                ? (tds[toppos - 1 - i].className = "notmove")
                : null;
            }
          } catch (error) {}
        }
      } catch (error) {}
    } catch (error) {}
  }

  /// abajo

  for (let index = 0; index <= moverange; index++) {
    try {
      let toppos = currpos + index * tdsize;
      try {
        tds[toppos + tdsize].className = "notmove";
      } catch (error) {}
      try {
        tds[toppos].className = "notmove";
        tds[toppos].setAttribute("movable", "true");

        // derecha

        for (let i = 0; i <= moverange - index; i++) {
          let limit = parseInt(tds[toppos + i].id.substring(1));
          let current = parseInt(tds[toppos].id.substring(1));

          if (limit <= tdsize - 1 && limit >= current) {
            if (
              tds[toppos + i].getAttribute("player") ==
              tds[currpos].getAttribute("player")
            ) {
              tds[toppos + i].className = "notmove";
            } else if (
              tds[toppos + i].getAttribute("player") !=
                tds[currpos].getAttribute("player") &&
              tds[toppos + i].getAttribute("player") != null
            ) {
              tds[toppos + i].className = "attack";
              tds[toppos + i].setAttribute("attackable", "true");
              tds[toppos + i].addEventListener("click", attackCharacter, false);
            }

            parseInt(tds[toppos + 1 + i].id.substring(1)) >= current
              ? (tds[toppos + 1 + i].className = "notmove")
              : null;
          }
        }
      } catch (error) {}

      // izquierda

      try {
        for (let i = 0; i <= moverange - index; i++) {
          let limit = parseInt(tds[toppos - i].id.substring(1));
          let current = parseInt(tds[toppos].id.substring(1));

          if (limit >= 0 && limit <= current) {
            if (
              tds[toppos - i].getAttribute("player") ==
              tds[currpos].getAttribute("player")
            ) {
              tds[toppos - i].className = "notmove";
            } else if (
              tds[toppos - i].getAttribute("player") !=
                tds[currpos].getAttribute("player") &&
              tds[toppos - i].getAttribute("player") != null
            ) {
              tds[toppos - i].className = "attack";
              tds[toppos - i].setAttribute("attackable", "true");
              tds[toppos - i].addEventListener("click", attackCharacter, false);
            }

            parseInt(tds[toppos - 1 - i].id.substring(1)) <= current
              ? (tds[toppos - 1 - i].className = "notmove")
              : null;
          }
        }
      } catch (error) {}
    } catch (error) {}
  }

  tds[currpos].setAttribute("movable", "false");
  tds[currpos].setAttribute("attackable", "attacker");
  tds[currpos].removeEventListener("click", moveCharacter, false);

  let charmenu = document.getElementById("char-menu");
  charmenu.style.display = "none";
}

function SetNotMovableTd() {
  let tds = document.getElementsByTagName("td");

  for (let index = 0; index < tds.length; index++) {
    const element = tds[index];
    if (element.getAttribute("movable") == "true") {
      element.removeEventListener("click", moveCharacter, false);
      element.setAttribute("movable", "false");
    } else {
      element.setAttribute("movable", "false");
    }

    if (
      element.getAttribute("attackable") == "true" ||
      element.getAttribute("attackable") == "attacker"
    ) {
      element.removeEventListener("click", attackCharacter, false);
      element.setAttribute("attackable", "false");
    } else {
      element.setAttribute("attackable", "false");
    }
  }
}

/// pending work

function moveCharacter(td) {
  let charid = document.getElementById("info-char");
  let char = getCharacterByPosition(players, charid.getAttribute("char"));

  if (td.srcElement.getAttribute("player") == null) {
    var nextMove = td.srcElement.id;
    char.move(nextMove);

    SetNotMovableTd();

    disableCharacterAfterMoverOrAttack(nextMove);
    deleteCharactersOnMap();
    renderCharacters(players);
  }
}

function attackCharacter(td) {
  var attacker = document.querySelectorAll('td[attackable="attacker"');
  // let charid = document.getElementById("info-char");
  let char = getCharacterByPosition(players, attacker[0].getAttribute("id"));

  if (td.srcElement.getAttribute("player") != null) {
    var nextMove = td.srcElement.id;
    char.attackCharacter(getCharacterByPosition(players, nextMove));

    SetNotMovableTd();

    disableCharacterAfterMoverOrAttack(nextMove);
    deleteCharactersOnMap();
    renderCharacters(players);
  }
}

function finishTurn(td) {
  let charid = document.getElementById("info-char");
  var char = getCharacterByPosition(players, charid.getAttribute("char"));

  char.finishTurn();

  let charmenu = document.getElementById("char-menu");
  charmenu.style.display = "none";

  SetNotMovableTd();

  disableCharacterAfterMoverOrAttack(charid.getAttribute("char"));
  deleteCharactersOnMap();
  renderCharacters(players);
}

function disableCharacterAfterMoverOrAttack(pos) {
  let charid = document.getElementById("info-char");

  let charelement = document.getElementById(pos);
  charelement.className = "disabled";
}
