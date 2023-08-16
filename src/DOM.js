const DOM = (() => {
  const boards = document.querySelectorAll(".board");

  const addBoardCells = () => {
    boards.forEach((board) => {
      for (let i = 0; i < 100; i += 1) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
      }
    });
  };

  return { addBoardCells };
})();

export default DOM;
