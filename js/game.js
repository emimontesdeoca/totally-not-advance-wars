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
    this.load();
  }

  load() {
    generateMap(this.mapnumber);
    renderCharacters(players);
  }
}
