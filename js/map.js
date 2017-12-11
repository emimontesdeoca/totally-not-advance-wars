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
  console.log(currpos);
  /// arriba
  // for (var index = 1; index <= moverange; index++) {
  //   var i = currpos - 17 * index;
  //   try {
  //     tds[i].className = "move";
  //   } catch (error) {}

  //   for (let a = 1; a <= moverange - index; a++) {
  //     let itemid = tds[i + a].id.substr(1);
  //     if (itemid <= 16) {
  //       try {
  //         tds[i + a].className = "move";
  //       } catch (error) {}
  //     }

  //     // tds[i + a  + index].className = "notmove";
  //   }
  //   for (let a = moverange - index; a >= 1; a--) {
  //     let itemid = tds[i - a].id.substr(1);

  //     try {
  //       tds[i - a].className = "move";
  //     } catch (error) {}
  //     //   tds[i + a + 1].className = "notmove";
  //   }
  // }

  // try {
  //   tds[currpos - 17 * index].className = "notmove";
  // } catch (error) {}
  // abajo
  // for (var index = 1; index <= moverange; index++) {
  //   var i = currpos + 17 * index;
  //   try {
  //     tds[i].className = "move";
  //   } catch (error) {}

  //   for (let a = 1; a <= moverange - index; a++) {
  //     try {
  //       tds[i + a].className = "move";
  //     } catch (error) {}
  //     //   tds[i + a + 1].className = "notmove";
  //   }
  //   for (let a = moverange - index; a >= 1; a--) {
  //     try {
  //       tds[i - a].className = "move";
  //     } catch (error) {}
  //   }
  // }

  /// derecha

  for (let index = 0; index <= moverange; index++) {
    // let itemid = tds[currpos - index].id.substr(1);
    var cp = tds[currpos + index].id.charAt(0);
    var mp = tds[currpos].id.charAt(0);
    if (cp == mp) {
      tds[currpos + index].className = "move";
    }
  }

  // /// izquierda

  for (let index = moverange; index >= 0; index--) {
    var cp = tds[currpos - index].id.charAt(0);
    var mp = tds[currpos].id.charAt(0);
    if (cp == mp) {
      tds[currpos - index].className = "move";
    }
  }
}
