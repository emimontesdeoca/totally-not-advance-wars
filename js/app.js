/// player, TODO load from profile
var player1 = new player("emi", 1);
/// cpu
var cpu = new player("cpu", 2);

var advancewars = new game(player1, cpu, 2);

advancewars.load();
