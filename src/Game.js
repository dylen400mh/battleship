import Player from "./Player";
import DOM from "./DOM";

const Game = () => {
  // create player objects
  const player = Player();
  const enemy = Player();

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

  // somewhere in here deal with when a cell is clicked
  const handleMove = (board, coords) => {
    player.sendAttack(enemyBoard, coords);
  };
};

export default Game;
