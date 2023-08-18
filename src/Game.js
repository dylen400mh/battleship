import Player from "./Player";
// eslint-disable-next-line import/no-cycle
import DOM from "./DOM";

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

  const playRound = (cell, playerBoardContainer) => {
    let row = parseInt(cell.dataset.row, 10);
    let col = parseInt(cell.dataset.col, 10);

    // player makes move
    player.sendAttack(enemyBoard, [row, col]);

    DOM.updateCellState(enemyBoard, cell);

    // if the attack missed and the game is not over, switch turns
    if (!enemyBoard.getCells()[row][col] && !Game.isOver()) {
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
      } while (playerBoard.getCells()[row][col] && !Game.isOver());
    }
  };

  return { getPlayer, getEnemy, isOver, playRound, switchTurn };
})();

export default Game;

// factory function that has state and functions.
// DOM needs to call from your game object to start the game, what game object would do when a cell is clicked in the UI.
// make action and retrieve states
// Update board states
