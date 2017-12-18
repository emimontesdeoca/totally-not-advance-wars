var players = [];

class game {
  constructor(player, cpu) {
    /// cpu player
    this.cpu = cpu;
    this.player = player;
    this.turn = 0;

    /// push to players array
    players.push(this.player);
    players.push(this.cpu);
  }

  nextRound() {
    this.turn++;
  }

  load() {
    generateMap();
    renderCharacters(players);
  }
}
