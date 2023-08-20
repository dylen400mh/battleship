import DOM from "./DOM";
import Game from "./Game";
import "./styles/style.css";

// create gameboard cells
DOM.addBoardCells();

// initalize objects
Game.initializeObjects();

// display player ships
DOM.displayShips(Game.getPlayer().getBoard());
