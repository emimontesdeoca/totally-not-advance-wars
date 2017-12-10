function player(name, team) {
  this.name = name || "player";
  this.characters = [];

  const player1_letters = ["B", "C", "D"];
  const player1_numbers = [0, 1, 2, 3];
  const player2_letters = ["N", "O", "P"];
  const player2_numbers = [12, 13, 14, 15];

  let ids = [];
  switch (team) {
    case 1:
      for (let index = 0; index < 3; index++) {
        do {
          var id_letter =
            player1_letters[Math.floor(Math.random() * player1_letters.length)];
          var id_number =
            player1_numbers[Math.floor(Math.random() * player1_numbers.length)];
        } while (ids.indexOf(id_letter + id_number) != -1);

        ids.push(id_letter + id_number);
        this.characters.push(new character(id_letter + id_number));
      }
      break;
    case 2:
      for (let index = 0; index < 3; index++) {
        do {
          var id_letter =
            player2_letters[Math.floor(Math.random() * player1_letters.length)];
          var id_number =
            player2_numbers[Math.floor(Math.random() * player1_numbers.length)];
        } while (ids.indexOf(id_letter + id_number) != -1);

        ids.push(id_letter + id_number);
        this.characters.push(new character(id_letter + id_number));
      }
      break;
  }
}
