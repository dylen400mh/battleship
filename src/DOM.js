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

  enemyBoardContainer.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell");

    // if no cell was clicked do nothing
    if (!cell) return;

    const { row, col } = cell.dataset;

    const player = Game.getPlayer();
    const enemyBoard = Game.getEnemy().getBoard();

    player.sendAttack(enemyBoard, [row, col]);
  });

  return { addBoardCells, displayShips };
})();

export default DOM;
