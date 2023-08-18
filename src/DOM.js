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
    const cell = e.target.closest(".cell");

    // if no cell was clicked do nothing
    if (!cell) return;

    // don't execute event if game is over OR the box has already been clicked
    if (
      Game.isOver() ||
      cell.classList.contains("hit") ||
      cell.classList.contains("miss")
    )
      return;

    // call playRound and pass DOM items as arguments
    Game.playRound(cell, playerBoardContainer);
  });

  return { addBoardCells, displayShips, updateCellState };
})();

export default DOM;
