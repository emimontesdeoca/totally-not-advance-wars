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
      let source_img = (td.innerHTML = "<img src='" + element.source + "'/>");

      td.setAttribute("player", player.name);
      td.setAttribute("name", element.name);
      td.setAttribute("hp", element.hp);
      td.setAttribute("attack", element.armor);
      td.setAttribute("armor", element.armor);
      td.setAttribute("crit", element.crit);
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
  var char = getCharacterByPosition;

  /// arriba
  for (var index = 1; index <= moverange; index++) {
    var i = currpos - 17 * index;
    try {
      tds[i].className = "move";
    } catch (error) {}

    for (let a = 1; a <= moverange - index; a++) {
      let itemid = tds[i + a].id.substr(1);
      if (itemid <= 16) {
        try {
          tds[i + a].className = "move";
        } catch (error) {}
      }

      // tds[i + a  + index].className = "notmove";
    }
    for (let a = moverange - index; a >= 1; a--) {
      let itemid = tds[i - a].id.substr(1);

      try {
        tds[i - a].className = "move";
      } catch (error) {}
      //   tds[i + a + 1].className = "notmove";
    }
  }

  try {
    tds[currpos - 17 * index].className = "notmove";
  } catch (error) {}
  // abajo
  for (var index = 1; index <= moverange; index++) {
    var i = currpos + 17 * index;
    try {
      tds[i].className = "move";
    } catch (error) {}

    for (let a = 1; a <= moverange - index; a++) {
      try {
        tds[i + a].className = "move";
      } catch (error) {}
      //   tds[i + a + 1].className = "notmove";
    }
    for (let a = moverange - index; a >= 1; a--) {
      try {
        tds[i - a].className = "move";
      } catch (error) {}
    }
  }

  try {
    tds[currpos + 17 * index].className = "notmove";
  } catch (error) {}
  /// derecha

  for (let index = 0; index <= moverange; index++) {
    let itemid = tds[currpos - index].id.substr(1);

    if (itemid <= 16) {
      tds[currpos + index].className = "move";
    }
  }
  try {
    tds[currpos + moverange + 1].className = "notmove";
  } catch (error) {}

  /// izquierda

  for (let index = moverange; index >= 0; index--) {
    let itemid = tds[currpos - index].id.substr(1);
    if (itemid >= 0) {
      tds[currpos - index].className = "move";
    }
  }
  try {
    tds[currpos - moverange - 1].className = "notmove";
  } catch (error) {}
}
