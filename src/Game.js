/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
/* eslint-disable import/no-cycle */
import Player from "./Player";
import DOM from "./DOM";

const Game = (() => {
  // create objects
  let player = Player();
  let enemy = Player();

  // create references to gameboards
  let playerBoard = player.getBoard();
  let enemyBoard = enemy.getBoard();

  // returns player object
  const getPlayer = () => player;

  // returns enemy object
  const getEnemy = () => enemy;

  // determines if game is over
  const isOver = () => playerBoard.allShipsSunk() || enemyBoard.allShipsSunk();

  // returns winner
  const getWinner = () => (playerBoard.allShipsSunk() ? enemy : player);

  // Plays a round: A round consists of both players taking at least one turn.
  const playRound = (cell, playerBoardContainer) => {
    let row = parseInt(cell.dataset.row, 10);
    let col = parseInt(cell.dataset.col, 10);

    // player makes move
    player.sendAttack(enemyBoard, [row, col]);

    // visually update cell that was clicked
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
          playerBoard
            .getAllMoves()
            .some(
              (position) =>
                position[0] === randomPosition[0] &&
                position[1] === randomPosition[1]
            )
        );

        // enemy sends attack to player board
        enemy.sendAttack(playerBoard, randomPosition);

        [row, col] = randomPosition;

        // update player board after enemy's turn if they hit a shot and the game is not over
        cell = playerBoardContainer.querySelector(
          `.cell[data-row="${row}"][data-col="${col}"]`
        );
        DOM.updateCellState(playerBoard, cell);
      } while (playerBoard.getCells()[row][col] && !isOver());
    }

    // If the game is over, update the message accordingly.
    if (isOver()) {
      const winner = getWinner();
      DOM.updateMessage(`Game Over! Winner: ${winner.name}`);
    }
  };

  // initialize objects for new game
  const initializeObjects = () => {
    // create new objects
    player = Player("You");
    enemy = Player("Opponent");
    playerBoard = player.getBoard();
    enemyBoard = enemy.getBoard();

    // randomly add ships to each board
    playerBoard.randomizeShips();
    enemyBoard.randomizeShips();
  };

  return {
    getPlayer,
    getEnemy,
    isOver,
    playRound,
    initializeObjects,
  };
})();

export default Game;
