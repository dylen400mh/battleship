import DOM from "./DOM";
import Game from "./Game";
import "./styles/style.css";

// create gameboard cells
DOM.addBoardCells();

Game.initializeObjects();

const playerBoard = Game.getPlayer().getBoard();

DOM.displayShips(playerBoard);
