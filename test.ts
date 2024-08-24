import Game from "./src/models/Game";
import Player from "./src/models/Player";

const game = new Game();

const morgan = new Player("Morgan");
const gio = new Player("Gio");

game.addPlayer(morgan);
game.addPlayer(gio);

game.startGame();