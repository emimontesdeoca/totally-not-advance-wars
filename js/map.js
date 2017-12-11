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

      img.addEventListener("click", showInformationInMenu, false);
      img.addEventListener("click", showMovableTiles, false);

      td.appendChild(img);

      td.setAttribute("player", player.name);
      td.setAttribute("name", element.name);
      td.setAttribute("hp", element.hp);
      td.setAttribute("attack", element.armor);
      td.setAttribute("armor", element.armor);
      td.setAttribute("crit", element.crit);
      td.addEventListener("click", showInformationInMenu, false);
      td.addEventListener("click", showMovableTiles, false);
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
    element.className = "";
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
  var char = getCharacterByPosition(players, e.srcElement.id);
  var tds = document.querySelectorAll("td");
  var moverange = char.moverange;
  var currpos = parseInt(e.srcElement.parentElement.getAttribute("pos"));

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
        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos + i].className = "move";
          } catch (error) {}
        }
      } catch (error) {}

      try {
        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos - i].className = "move";
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
        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos + i].className = "move";
          } catch (error) {}
        }
      } catch (error) {}

      try {
        for (let i = 0; i <= moverange - index; i++) {
          try {
            tds[toppos - i].className = "move";
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
      }
    } catch (error) {}
  }
}
