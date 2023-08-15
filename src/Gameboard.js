const Gameboard = () => {
  // Creates board. Spots that haven't been checked are false.
  const createBoard = () => {
    const brd = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let col = 0; col < 10; col += 1) {
        row[col] = false;
      }
      brd.push(row);
    }

    return brd;
  };

  // creates a new board
  const board = createBoard();

  // get current board
  const getBoard = () => board;

  // Places a ship at specified coordinates and on a specified axis
  const placeShip = (length, row, col, axis) => {
    // if on horizontal axis and fits on board
    if (axis === "horizontal" && col <= 10 - length) {
      for (let i = col, j = 0; j < length; i += 1, j += 1) {
        board[row][i] = true;
      }
    }

    // if on vertical axis and fits on board
    if (axis === "vertical" && row <= 10 - length) {
      for (let i = row, j = 0; j < length; i += 1, j += 1) {
        board[i][col] = true;
      }
    }
  };

  return { getBoard, placeShip };
};

export default Gameboard;
