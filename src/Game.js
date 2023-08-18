import Player from "./Player";

const Game = (() => {
  // create player objects
  const player = Player();
  const enemy = Player();

  const playerBoard = player.getBoard();
  const enemyBoard = enemy.getBoard();

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

  const playRound = (cell, randomPosition) => {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);

    // player's turn
    player.sendAttack(enemyBoard, [row, col]);

    // enemy takes turn if game is not over
    if (!isOver()) {
      // while there is not a new move generated, generate a new move
      while (
        playerBoard.getAllMoves().some(
          // eslint-disable-next-line no-loop-func
          (position) =>
            position[0] === randomPosition[0] &&
            position[1] === randomPosition[1]
        )
      ) {
        // eslint-disable-next-line no-param-reassign
        randomPosition = enemy.getRandomMove();
      }

      // send enemy's attack to player board
      enemy.sendAttack(playerBoard, randomPosition);
    }
  };

  return { getPlayer, getEnemy, isOver, playRound, switchTurn };
})();

export default Game;

// factory function that has state and functions.
// DOM needs to call from your game object to start the game, what game object would do when a cell is clicked in the UI.
// make action and retrieve states
// Update board states
