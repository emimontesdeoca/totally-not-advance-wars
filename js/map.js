function generateMap() {
  let container = document.getElementById("map");

  let table = document.createElement("table");
  table.className = "theme-table";
  var numbertd = 0;
  for (let index = 0; index < 17; index++) {
    let tr = document.createElement("tr");

    for (let i = 0; i < 17; i++) {
      let td = document.createElement("td");
      let id = getLetterByIndex(index) + i;
      td.id = id;
      td.setAttribute("pos", numbertd);
      td.setAttribute("title", id);
      td.addEventListener("click", clearInformationMenu, false);
      td.addEventListener("click", deleteClassesTd, false);
      td.addEventListener("mouseover", showCurrentGameInformation, false);
      td.addEventListener("click", disableButtons, false);

      numbertd++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  container.appendChild(table);
}

function getLetterByIndex(index) {
  var letters = "abcdefghijklmnopq";
  return letters.charAt(index).toUpperCase();
}

function renderCharacters(players) {
  players.forEach(player => {
    player.characters.forEach(element => {
      let td = document.getElementById(element.position);
      // let source_img = (td.innerHTML = "<img src='" + element.source + "'/>");

      let img = document.createElement("img");
      img.src = element.source;
      img.id = element.position;

      img.setAttribute("player", player.name);
      img.setAttribute("name", element.name);
      img.setAttribute("hp", element.hp);
      img.setAttribute("attack", element.armor);
      img.setAttribute("armor", element.armor);
      img.setAttribute("crit", element.crit);
      img.setAttribute("finished", element.turnfinished);

      img.addEventListener("click", showInformationInMenu, false);
      // img.addEventListener("click", showMovableTiles, false);

      td.appendChild(img);

      td.setAttribute("player", player.name);
      td.setAttribute("name", element.name);
      td.setAttribute("hp", element.hp);
      td.setAttribute("attack", element.armor);
      td.setAttribute("armor", element.armor);
      td.setAttribute("crit", element.crit);
      td.setAttribute("finished", element.turnfinished);

      td.addEventListener("click", showInformationInMenu, false);
      // td.addEventListener("click", showMovableTiles, false);

      if (element.turnfinished) {
        img.className = "disabled";
        td.className = "disabled";
      }
    });
  });
}

function deleteCharactersOnMap() {
  var tds = document.getElementsByTagName("td");

  for (let index = 0; index < tds.length; index++) {
    const td = tds[index];
    td.source = "";
    td.removeAttribute("name");
    td.removeAttribute("hp");
    td.removeAttribute("attack");
    td.removeAttribute("armor");
    td.removeAttribute("crit");
    td.removeAttribute("player");

    var myNode = document.getElementById(td.id);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }
}

function deleteClassesTd() {
  var tds = document.getElementsByTagName("td");

  for (let index = 0; index < tds.length; index++) {
    const element = tds[index];
    if (element.getAttribute("finished") == "true") {
      element.className = "disabled";
    } else {
      element.className = "";
    }
  }
}

function getCharacterByPosition(players, pos) {
  var a = players.filter(
    e => e.name == document.getElementById(pos).getAttribute("player")
  );

  var char = null;

  a[0].characters.forEach(element => {
    if (element.position == pos) {
      char = element;
    }
  });

  return char;
}

function showMovableTiles(e) {
  var char = getCharacterByPosition(players, e.id);
  var tds = document.querySelectorAll("td");
  var moverange = char.moverange;
  var currpos = parseInt(e.getAttribute("pos"));

  SetNotMovableTd();

  /// arriba
  for (let index = 0; index <= moverange; index++) {
    // let itemid = tds[currpos - index].id.substr(1);
    // var cp = tds[currpos - index * 17].id.charAt(0);
    // var mp = tds[currpos].id.charAt(0);
    // if (cp == mp) {
    try {
      let toppos = currpos - index * 17;
      try {
        tds[toppos].className = "move";
        tds[toppos].setAttribute("movable", "false");

        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos + i].className = "move";
            tds[toppos + i].setAttribute("movable", "true");
            tds[toppos + i].addEventListener("click", moveCharacter, false);
          } catch (error) {}
        }
      } catch (error) {}

      try {
        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos - i].className = "move";
            tds[toppos - i].setAttribute("movable", "true");
            tds[toppos - i].addEventListener("click", moveCharacter, false);
          } catch (error) {}
        }
      } catch (error) {}
    } catch (error) {}
    // }
  }

  /// abajo

  for (let index = 0; index <= moverange; index++) {
    try {
      let toppos = currpos + index * 17;
      try {
        tds[toppos].className = "move";
        tds[toppos].setAttribute("movable", "true");

        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos + i].className = "move";
            tds[toppos + i].setAttribute("movable", "true");
            tds[toppos + i].addEventListener("click", moveCharacter, false);
          } catch (error) {}
        }
      } catch (error) {}

      try {
        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos - i].className = "move";
            tds[toppos - i].setAttribute("movable", "true");
            tds[toppos - i].addEventListener("click", moveCharacter, false);
          } catch (error) {}
        }
      } catch (error) {}
    } catch (error) {}

    // }
  }

  /// derecha

  for (let index = 0; index <= moverange; index++) {
    // let itemid = tds[currpos - index].id.substr(1);
    try {
      var cp = tds[currpos + index].id.charAt(0);
      var mp = tds[currpos].id.charAt(0);
      if (cp == mp) {
        tds[currpos + index].className = "move";
        tds[currpos + index].setAttribute("movable", "true");
        tds[currpos + index].addEventListener("click", moveCharacter, false);
      }
    } catch (error) {}
  }

  /// izquierda

  for (let index = moverange; index >= 0; index--) {
    try {
      var cp = tds[currpos - index].id.charAt(0);
      var mp = tds[currpos].id.charAt(0);
      if (cp == mp) {
        tds[currpos - index].className = "move";
        tds[currpos - index].setAttribute("movable", "true");
        tds[currpos - index].addEventListener("click", moveCharacter, false);
      }
    } catch (error) {}
  }

  tds[currpos].setAttribute("movable", "false");
  tds[currpos].removeEventListener("click", moveCharacter, false);
}

function SetNotMovableTd() {
  var tds = document.getElementsByTagName("td");

  for (let index = 0; index < tds.length; index++) {
    const element = tds[index];
    if (element.getAttribute("movable") == "true") {
      element.removeEventListener("click", moveCharacter, false);
      element.setAttribute("movable", "false");
    } else {
      element.setAttribute("movable", "false");
    }
  }
}

function moveCharacter(td) {
  let charid = document.getElementById("info-char");
  var char = getCharacterByPosition(players, charid.getAttribute("char"));

  var nextMove = td.srcElement.id;
  char.move(nextMove);

  SetNotMovableTd();

  disableCharacterAfterMoverOrAttack(nextMove);
  deleteCharactersOnMap();
  renderCharacters(players);
}

function disableCharacterAfterMoverOrAttack(pos) {
  let charid = document.getElementById("info-char");

  let charelement = document.getElementById(pos);
  charelement.className = "disabled";
}
