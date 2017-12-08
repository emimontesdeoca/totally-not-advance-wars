function generateMap() {
  let container = document.getElementById("map");

  let table = document.createElement("table");
  table.className = "theme-table";
  var numbertd = 0;
  for (let index = 0; index < 17; index++) {
    let tr = document.createElement("tr");

    for (let i = 0; i < 17; i++) {
      let td = document.createElement("td");

      td.id = getLetterByIndex(index) + i;
      td.setAttribute("pos", numbertd);
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

function generateCharacters() {
  const player1_letters = ["B", "C", "D"];
  const player1_numbers = [0, 1, 2, 3];
  const player2_letters = ["N", "O", "P"];
  const player2_numbers = [12, 13, 14, 15];

  let ids = [];
  /// player 1
  for (let index = 0; index < 3; index++) {
    do {
      var id_letter =
        player1_letters[Math.floor(Math.random() * player1_letters.length)];
      var id_number =
        player1_numbers[Math.floor(Math.random() * player1_numbers.length)];
    } while (ids.indexOf(id_letter + id_number) != -1);

    ids.push(id_letter + id_number);
    let item = characters[Math.floor(Math.random() * characters.length)];
    let td = document.getElementById(id_letter + id_number);
    let source_img = (td.innerHTML = "<img src='" + item.source + "'/>");

    td.setAttribute("name", item.name);
    td.setAttribute("hp", item.hp);
    td.setAttribute("attack", item.armor);
    td.setAttribute("armor", item.armor);
    td.setAttribute("crit", item.crit);
    td.setAttribute("moverange", item.moverange);
    td.setAttribute("attackrange", item.attackrange);

    td.addEventListener("mouseover", setStatusPanel, false);
    td.addEventListener("mouseout", deleteClassesTd, false);
  }

  /// player 2
  for (let index = 0; index < 3; index++) {
    do {
      var id_letter =
        player2_letters[Math.floor(Math.random() * player2_letters.length)];
      var id_number =
        player2_numbers[Math.floor(Math.random() * player2_numbers.length)];
    } while (ids.indexOf(id_letter + id_number) != -1);

    ids.push(id_letter + id_number);
    let item = characters[Math.floor(Math.random() * characters.length)];

    let td = document.getElementById(id_letter + id_number);
    let source_img = item.source;
    td.innerHTML = "<img src='" + source_img + "'/>";

    td.setAttribute("name", item.name);
    td.setAttribute("hp", item.hp);
    td.setAttribute("attack", item.attack);
    td.setAttribute("armor", item.armor);
    td.setAttribute("crit", item.crit);
    td.setAttribute("moverange", item.moverange);
    td.setAttribute("attackrange", item.attackrange);

    td.addEventListener("mouseover", setStatusPanel, false);
    td.addEventListener("mouseout", deleteClassesTd, false);
  }
  //   console.log(ids);
}

function setStatusPanel(input) {
  var input = input.srcElement;

  try {
    var moverange = getInfoCharacter(input.getAttribute("name"))[0].moverange;
  } catch (error) {}

  var tds = document.getElementsByTagName("td");

  let currpos = parseInt(input.getAttribute("pos"));
  //   console.log(tds[currpos - 17]);

  input.addEventListener(
    "mouseover",
    function() {
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
    },
    false
  );
  //   console.log(input.id.substr(1));
}

function deleteClassesTd() {
  var tds = document.getElementsByTagName("td");

  for (let index = 0; index < tds.length; index++) {
    const element = tds[index];
    element.className = "";
  }
}
