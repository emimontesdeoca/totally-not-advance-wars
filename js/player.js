const player1_letters = ["B", "C", "D", "E", "F"];
const player1_numbers = [0, 1, 2, 3, 4, 5];
const player2_letters = ["J", "K", "L", "M", "N"];
const player2_numbers = [18, 19, 20, 21, 22, 23];
const player1_size = 2;
const player2_size = 2;

class player {
  constructor(name, team, playersize) {
    this.name = name || "player";
    this.characters = [];

    let ids = [];
    switch (team) {
      case 1:
        for (let index = 0; index < playersize; index++) {
          do {
            var id_letter =
              player1_letters[
                Math.floor(Math.random() * player1_letters.length)
              ];
            var id_number =
              player1_numbers[
                Math.floor(Math.random() * player1_numbers.length)
              ];
          } while (ids.indexOf(id_letter + id_number) != -1);
          ids.push(id_letter + id_number);
          this.characters.push(
            new character(this, id_letter + id_number, "team1")
          );
        }
        break;
      case 2:
        for (let index = 0; index < playersize; index++) {
          do {
            var id_letter =
              player2_letters[
                Math.floor(Math.random() * player2_letters.length)
              ];
            var id_number =
              player2_numbers[
                Math.floor(Math.random() * player2_numbers.length)
              ];
          } while (ids.indexOf(id_letter + id_number) != -1);
          ids.push(id_letter + id_number);
          this.characters.push(
            new character(this, id_letter + id_number, "team2")
          );
        }
        break;
    }
  }

  checkIfTurnFinished() {
    let cont = 0;
    let res = false;
    this.characters.forEach(element => {
      if (element.turnfinished) {
        cont++;
      }
    });
    cont === this.characters.length ? (res = true) : (res = false);
    // console.log(cont);
    return res;
  }

  deleteCharacter(index) {
    this.characters.splice(index, 1);
  }
}
