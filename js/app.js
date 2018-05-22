/// get current user and difficulty
var username = prompt("Insert username");
var difficulty = "3";
var difficultyText = "";
var player1Size = 0;
var player2Size = 0;

if (difficulty == "1") {
  difficultyText = "EASY";
  player1Size = 3;
  player2Size = 3;
} else if (difficulty == "2") {
  difficultyText = "MEDIUM";

  player1Size = 3;
  player2Size = 4;
} else {
  difficultyText = "HARD";

  player1Size = 3;
  player2Size = 6;
}
var timer = 0;
var globalTimer = setInterval(() => {
  timer++;
}, 1000);

/// player
var player1 = new player(username, 1, player1Size);
/// cpu
var cpu = new player("Gary", 2, player2Size);

var advancewars = new game(player1, cpu, 2);

var myAudio = new Audio("resources/music/bgm/1.m4a");
myAudio.addEventListener(
  "ended",
  function () {
    var rnd = Math.floor(Math.random() * 3) + 0;

    this.currentTime = 0;
    this.src = "resources/music/bgm/" + rnd + ".m4a";
    this.play();
  },
  false
);

var isPlaying = false;
// myAudio.play();

/**
 * Toggles music
 */
function togglePlay() {
  if (isPlaying) {
    myAudio.pause();
    logMaster("<b>GAME</b> - Music paused!");
  } else {
    myAudio.play();
    logMaster("<b>GAME</b> - Music playing!");
  }
}

myAudio.onplaying = function () {
  isPlaying = true;
};
myAudio.onpause = function () {
  isPlaying = false;
};

document.getElementById("currentUser").innerText = username;

document.getElementById("currentDifficulty").innerHTML = difficultyText;

advancewars.load();

/**
 * Function that exits game
 */
function exitGame() {
  window.location.href = "../../dashboard.html";
}