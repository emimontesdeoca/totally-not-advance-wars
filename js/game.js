var players = [];

class game {
  constructor(player, cpu, mapnumber) {
    /// cpu player
    this.cpu = cpu;
    this.player = player;
    this.turn = 0;
    this.mapnumber = mapnumber;

    /// push to players array
    players.push(this.player);
    players.push(this.cpu);
  }

  nextRound() {
    this.turn++;
    enableCharactersByTurn(this.turn);
    deleteCharactersOnMap();
    renderCharacters(players);
  }

  load() {
    generateMap(this.mapnumber);
    enableCharactersByTurn(this.turn);
    renderCharacters(players);
  }
}
