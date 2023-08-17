import Player from "./Player";
import DOM from "./DOM";

const Game = (() => {
  // create player objects
  let player;
  let enemy;

  // player boards
  let playerBoard;
  let enemyBoard;

  const startGame = () => {
    player = Player();
    enemy = Player();

    // access player boards and set to their own variables
    playerBoard = player.getBoard();
    enemyBoard = enemy.getBoard();

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
  };

  const getPlayer = () => player;

  const getEnemy = () => enemy;

  return { startGame, getPlayer, getEnemy };
})();

export default Game;

// factory function that has state and functions. 
// DOM needs to call from your game object to start the game, what game object would do when a cell is clicked in the UI.
// make action and retrieve states
// Update board states
