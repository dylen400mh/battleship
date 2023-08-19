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

  // function used to display player ships
  const displayShips = (board) => {
    // eslint-disable-next-line no-restricted-syntax
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

  playButton.addEventListener("click", () => {
    // hide unneeded buttons
    playButton.style.display = "none";
    randomButton.style.display = "none";
    // add board event listener
    enemyBoardContainer.addEventListener("click", handleBoardClick);
    updateMessage("Make your move by clicking the opponent's board.");
  });

  resetButton.addEventListener("click", () => {
    // reset game variables and board state here
    resetBoardState();
    Game.initializeObjects();

    // remove event listener for board
    enemyBoardContainer.removeEventListener("click", handleBoardClick);
    // show required buttons again
    playButton.style.display = "block";
    randomButton.style.display = "block";
    updateMessage("Place Your Ships");
  });

  return {
    addBoardCells,
    displayShips,
    updateCellState,
    updateMessage,
  };
})();

export default DOM;
