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

    // const player = Game.getPlayer();
    // const enemy = Game.getEnemy();

    // const playerBoard = player.getBoard();
    // const enemyBoard = enemy.getBoard();

    // from here, call playRound and pass DOM items as arguments
    Game.playRound(cell, playerBoardContainer)

    // let row = parseInt(cell.dataset.row, 10);
    // let col = parseInt(cell.dataset.col, 10);

    // // player makes move
    // player.sendAttack(enemyBoard, [row, col]);

    // updateCellState(enemyBoard, cell);

    // // if the attack missed and the game is not over, switch turns
    // if (!enemyBoard.getCells()[row][col] && !Game.isOver()) {
    //   // enemy takes shots until they miss or the game ends
    //   do {
    //     // while there is not a new move generated, generate a new move
    //     let randomPosition;
    //     do {
    //       // get random position for enemy move
    //       randomPosition = enemy.getRandomMove();
    //     } while (
    //       playerBoard.getAllMoves().some(
    //         // eslint-disable-next-line no-loop-func
    //         (position) =>
    //           position[0] === randomPosition[0] &&
    //           position[1] === randomPosition[1]
    //       )
    //     );

    //     enemy.sendAttack(playerBoard, randomPosition);

    //     [row, col] = randomPosition;

    //     // update player board after enemy's turn
    //     cell = playerBoardContainer.querySelector(
    //       `.cell[data-row="${row}"][data-col="${col}"]`
    //     );
    //     updateCellState(playerBoard, cell);
    //   } while (playerBoard.getCells()[row][col] && !Game.isOver());
    // }
  });

  return { addBoardCells, displayShips, updateCellState };
})();

export default DOM;
