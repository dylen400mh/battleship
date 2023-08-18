// eslint-disable-next-line import/no-cycle
import Game from "./Game";

const DOM = (() => {
  const boardContainers = document.querySelectorAll(".board");
  const playerBoardContainer = document.getElementById("player-board");
  const enemyBoardContainer = document.getElementById("enemy-board");

  const addBoardCells = () => {
    boardContainers.forEach((board) => {
      for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.setAttribute("data-row", i);
          cell.setAttribute("data-col", j);
          board.appendChild(cell);
        }
      }
    });
  };

  // function used to display player ships
  const displayShips = (board) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [row, col] of board.getTakenPositions()) {
      const targetCell = playerBoardContainer.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
      );

      targetCell.classList.add("ship");
    }
  };

  const updateCellState = (board, cell) => {
    console.log("updating cell state");
    // if the cell is taken create a variable for it
    const takenCell = board
      .getTakenPositions()
      .some(
        (position) =>
          position[0] === parseInt(cell.dataset.row, 10) &&
          position[1] === parseInt(cell.dataset.col, 10)
      );

    // add appropriate class to cell
    if (takenCell) cell.classList.add("hit");
    else cell.classList.add("miss");
  };

  enemyBoardContainer.addEventListener("click", (e) => {
    console.log(e.target);
    let cell = e.target.closest(".cell");

    // if no cell was clicked do nothing
    if (!cell) return;

    // don't execute event if game is over OR the box has already been clicked
    if (
      Game.isOver() ||
      cell.classList.contains("hit") ||
      cell.classList.contains("miss")
    )
      return;

    const player = Game.getPlayer();
    const enemy = Game.getEnemy();

    // get random position for enemy move
    const randomPosition = enemy.getRandomMove();

    // play a round with each player's move passed as an argument
    Game.playRound(cell, randomPosition);

    const playerBoard = player.getBoard();
    const enemyBoard = enemy.getBoard();

    updateCellState(enemyBoard, cell);

    // // enemy's move
    // // Calling Game.playRound with the player's move, but the return value is the enemy's move.
    // const [randomRow, randomCol] = Game.playRound(cell);

    // update playerBoard if enemy made a move and game is not over
    if (!Game.isOver()) {
      // update player board after enemy's turn
      cell = playerBoardContainer.querySelector(
        `.cell[data-row="${randomPosition[0]}"][data-col="${randomPosition[1]}"]`
      );
      updateCellState(playerBoard, cell);
    }
  });

  return { addBoardCells, displayShips };
})();

export default DOM;
