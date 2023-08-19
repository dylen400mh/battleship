import Player from "./Player";
// eslint-disable-next-line import/no-cycle
import DOM from "./DOM";

const Game = (() => {
  // create objects
  let player = Player();
  let enemy = Player();

  let playerBoard = player.getBoard();
  let enemyBoard = enemy.getBoard();

  const getPlayer = () => player;

  const getEnemy = () => enemy;

  const switchTurn = () => {
    if (player.isTurn()) {
      player.endTurn();
      enemy.startTurn();
    } else {
      enemy.endTurn();
      player.startTurn();
    }
  };

  const isOver = () => playerBoard.allShipsSunk() || enemyBoard.allShipsSunk();

  const getWinner = () => (playerBoard.allShipsSunk() ? enemy : player);

  const playRound = (cell, playerBoardContainer) => {
    let row = parseInt(cell.dataset.row, 10);
    let col = parseInt(cell.dataset.col, 10);

    // player makes move
    player.sendAttack(enemyBoard, [row, col]);

    DOM.updateCellState(enemyBoard, cell);

    // if the attack missed and the game is not over, switch turns
    if (!enemyBoard.getCells()[row][col] && !isOver()) {
      // enemy takes shots until they miss or the game ends
      do {
        // while there is not a new move generated, generate a new move
        let randomPosition;
        do {
          // get random position for enemy move
          randomPosition = enemy.getRandomMove();
        } while (
          playerBoard.getAllMoves().some(
            // eslint-disable-next-line no-loop-func
            (position) =>
              position[0] === randomPosition[0] &&
              position[1] === randomPosition[1]
          )
        );

        enemy.sendAttack(playerBoard, randomPosition);

        [row, col] = randomPosition;

        // update player board after enemy's turn
        // eslint-disable-next-line no-param-reassign
        cell = playerBoardContainer.querySelector(
          `.cell[data-row="${row}"][data-col="${col}"]`
        );
        DOM.updateCellState(playerBoard, cell);
      } while (playerBoard.getCells()[row][col] && !isOver());
    }

    const winner = getWinner();

    // If the game is over, update the message accordingly.
    if (isOver()) DOM.updateMessage(`Game Over! Winner: ${winner.name}`);
  };

  // initialize objects for new game
  const initializeObjects = () => {
    player = Player("You");
    enemy = Player("Opponent");
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
  };

  return {
    getPlayer,
    getEnemy,
    isOver,
    playRound,
    switchTurn,
    initializeObjects,
  };
})();

export default Game;

// factory function that has state and functions.
// DOM needs to call from your game object to start the game, what game object would do when a cell is clicked in the UI.
// make action and retrieve states
// Update board states
