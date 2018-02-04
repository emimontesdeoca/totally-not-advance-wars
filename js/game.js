var players = [];

/**
 * Game object
 */
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

  /**
   * Next round funtion
   */
  nextRound() {
    logMaster("<b>GAME</b> - Finished day <b>" + this.turn + "</b>!");
    this.turn++;
    enableCharactersByTurn(this.turn);
    deleteCharactersOnMap();
    renderCharacters(players);
  }

  /**
   * Loads first time
   */
  load() {
    logMaster("<b>GAME</b> - Starting game!");
    generateMap(this.mapnumber);
    logMaster("<b>GAME</b> - Loaded map!");
    enableCharactersByTurn(this.turn);
    renderCharacters(players);
    players.forEach(element => {
      logMaster(
        "<b>GAME</b> - Loaded " +
          element.name +
          " with " +
          element.characters.length +
          " allies!"
      );
    });
  }
}
