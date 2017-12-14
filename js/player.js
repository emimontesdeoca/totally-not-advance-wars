function player(name, team) {
  this.name = name || "player";
  this.characters = [];

  const player1_letters = ["B", "C", "D", "E", "F"];
  const player1_numbers = [0, 1, 2, 3, 4, 5];
  const player2_letters = ["J", "K", "L", "M", "N"];
  const player2_numbers = [20, 21, 22, 23, 24, 25];

  let ids = [];
  switch (team) {
    case 1:
      for (let index = 0; index < 5; index++) {
        do {
          var id_letter =
            player1_letters[Math.floor(Math.random() * player1_letters.length)];
          var id_number =
            player1_numbers[Math.floor(Math.random() * player1_numbers.length)];
        } while (ids.indexOf(id_letter + id_number) != -1);

        ids.push(id_letter + id_number);
        this.characters.push(new character(id_letter + id_number, "team1"));
      }
      break;
    case 2:
      for (let index = 0; index < 5; index++) {
        do {
          var id_letter =
            player2_letters[Math.floor(Math.random() * player1_letters.length)];
          var id_number =
            player2_numbers[Math.floor(Math.random() * player1_numbers.length)];
        } while (ids.indexOf(id_letter + id_number) != -1);

        ids.push(id_letter + id_number);
        this.characters.push(new character(id_letter + id_number, "team2"));
      }
      break;
  }
}
