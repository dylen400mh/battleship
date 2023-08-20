/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import Game from "./Game";

const DOM = (() => {
  const boardContainers = document.querySelectorAll(".board");
  const playerBoardContainer = document.getElementById("player-board");
  const enemyBoardContainer = document.getElementById("enemy-board");
  const playButton = document.getElementById("play-button");
  const resetButton = document.getElementById("reset-button");
  const randomButton = document.getElementById("random-button");
  const messageContainer = document.getElementById("message");

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

  // clear existing ships from player board display
  const clearShips = () => {
    const cells = playerBoardContainer.querySelectorAll(".ship");
    cells.forEach((cell) => cell.classList.remove("ship"));
  };

  // function used to display player ships
  const displayShips = (board) => {
    // clear existing ships
    clearShips();

    for (const ship of board.getShips()) {
      if (ship.axis === "horizontal") {
        for (let i = ship.col, j = 0; j < ship.length; i += 1, j += 1) {
          const targetCell = playerBoardContainer.querySelector(
            `.cell[data-row="${ship.row}"][data-col="${i}"]`
          );

          targetCell.classList.add("ship");
          targetCell.setAttribute("data-size", ship.length);
        }
      }

      if (ship.axis === "vertical") {
        for (let i = ship.row, j = 0; j < ship.length; i += 1, j += 1) {
          const targetCell = playerBoardContainer.querySelector(
            `.cell[data-row="${i}"][data-col="${ship.col}"]`
          );

          targetCell.classList.add("ship");
          targetCell.setAttribute("data-size", ship.length);
        }
      }
    }
  };

  // removes hit and miss markers from board
  const resetBoardState = () => {
    const cellContainers = document.querySelectorAll(".cell");

    cellContainers.forEach((cell) => {
      if (cell.classList.contains("hit")) cell.classList.remove("hit");
      if (cell.classList.contains("miss")) cell.classList.remove("miss");
    });
  };

  const revealSurroundingCells = (board, cell) => {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);

    const parent = cell.parentElement;

    // get surrounding corner cells
    const surroundingCorners = [...parent.children].filter(
      (sibling) =>
        Math.abs(row - sibling.dataset.row) === 1 &&
        Math.abs(col - sibling.dataset.col) === 1
    );

    // Reveal each corner
    surroundingCorners.forEach((corner) => {
      corner.classList.add("miss");
    });

    // If ship is sunk, reveal remaining sides
    const sunkShips = board.getShips().filter((ship) => ship.isSunk());

    sunkShips.forEach((ship) => {
      ship.getCells().forEach((cell) => {
        const [row, col] = cell;
        for (let i = row - 1; i <= row + 1; i += 1) {
          for (let j = col - 1; j <= col + 1; j += 1) {
            if (
              i >= 0 &&
              i <= 9 &&
              j >= 0 &&
              j <= 9 &&
              board.getCells()[i][j] === 0
            ) {
              const cellElement = parent.querySelector(
                `.cell[data-row="${i}"][data-col="${j}"]`
              );

              cellElement.classList.add("miss");
            }
          }
        }
      });
    });
  };

  const updateCellState = (board, cell) => {
    // if the cell is taken and its not a surrounding position, create a variable for it
    const takenCell = board
      .getTakenPositions()
      .some(
        (position) =>
          position[0] === parseInt(cell.dataset.row, 10) &&
          position[1] === parseInt(cell.dataset.col, 10)
      );

    // add appropriate class to cell
    if (takenCell) {
      cell.classList.add("hit");
      revealSurroundingCells(board, cell);
    } else cell.classList.add("miss");
  };

  const handleBoardClick = (e) => {
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
  };

  const updateMessage = (message) => {
    messageContainer.textContent = message;
  };

  const handlePlayButtonClick = () => {
    // hide unneeded buttons
    playButton.style.display = "none";
    randomButton.style.display = "none";
    // add board event listener
    enemyBoardContainer.addEventListener("click", handleBoardClick);
    updateMessage("Make your move by clicking the opponent's board.");
  };

  const handleRandomButtonClick = () => {
    Game.initializeObjects();
    displayShips(Game.getPlayer().getBoard());
  };

  const handleResetButtonClick = () => {
    // reset game variables and board state here
    resetBoardState();
    Game.initializeObjects();
    displayShips(Game.getPlayer().getBoard());

    // remove event listener for board
    enemyBoardContainer.removeEventListener("click", handleBoardClick);
    // show required buttons again
    playButton.style.display = "block";
    randomButton.style.display = "block";
    updateMessage("Place Your Ships");
  };

  playButton.addEventListener("click", handlePlayButtonClick);

  resetButton.addEventListener("click", handleResetButtonClick);

  randomButton.addEventListener("click", handleRandomButtonClick);

  return {
    addBoardCells,
    displayShips,
    updateCellState,
    updateMessage,
    revealSurroundingCells,
  };
})();

export default DOM;
