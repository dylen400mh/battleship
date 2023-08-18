import DOM from "./DOM";
import Game from "./Game";
import "./styles/style.css";

// create gameboard cells
DOM.addBoardCells();

// access player objects
const player = Game.getPlayer();
const enemy = Game.getEnemy();

// access player boards and set to their own variables
const playerBoard = player.getBoard();
const enemyBoard = enemy.getBoard();

// add ships to each board (for now using predefined locations to make sure everything works)
playerBoard.placeShip(5, 0, 0, "horizontal");
playerBoard.placeShip(4, 2, 0, "horizontal");
playerBoard.placeShip(3, 4, 0, "horizontal");
playerBoard.placeShip(3, 6, 0, "horizontal");
playerBoard.placeShip(2, 8, 0, "horizontal");

enemyBoard.placeShip(5, 0, 0, "horizontal");
enemyBoard.placeShip(4, 2, 0, "horizontal");
enemyBoard.placeShip(3, 4, 0, "horizontal");
enemyBoard.placeShip(3, 6, 0, "horizontal");
enemyBoard.placeShip(2, 8, 0, "horizontal");

DOM.displayShips(playerBoard);

// player makes first move
player.startTurn();


