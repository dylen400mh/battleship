const DOM = (() => {
  const boards = document.querySelectorAll(".board");

  const addBoardCells = () => {
    boards.forEach((board) => {
      for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.setAttribute("row", i);
          cell.setAttribute("col", j);
          board.appendChild(cell);
        }
      }
    });
  };

  // function used to display player ships
  const displayShips = (board) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [row, col] of board.getTakenPositions()) {
      const targetCell = document.querySelector(
        `.cell[row="${row}"][col="${col}"]`
      );

      targetCell.classList.add("ship");
    }
  };

  return { addBoardCells, displayShips };
})();

export default DOM;
