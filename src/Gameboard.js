import Ship from "./Ship";

const Gameboard = () => {
  // missed attacks array
  const missedAttacks = [];

  // Creates board. Spots that haven't been checked are null.
  const createBoard = () => {
    const brd = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let col = 0; col < 10; col += 1) {
        row[col] = null;
      }
      brd.push(row);
    }

    return brd;
  };

  // creates a new board
  const board = createBoard();

  // get current board
  const getBoard = () => board;

  // Places a ship at specified coordinates and on a specified axis (for now we won't verify the position here)
  const placeShip = (length, row, col, axis) => {
    const ship = Ship(length);

    // if on horizontal axis
    if (axis === "horizontal") {
      for (let i = col, j = 0; j < length; i += 1, j += 1) {
        board[row][i] = ship;
      }
    }

    // if on vertical axis
    if (axis === "vertical") {
      for (let i = row, j = 0; j < length; i += 1, j += 1) {
        board[i][col] = ship;
      }
    }
  };

  const receiveAttack = (row, col) => {
    const position = board[row][col];

    // if a ship exists at the position, hit it
    if (position) position.hit();
    // if there is no ship at the position, add the coordinates to missed attacks array
    else missedAttacks.push([row, col]);
  };

  const getMissedAttacks = () => missedAttacks;

  return { getBoard, placeShip, receiveAttack, getMissedAttacks };
};

export default Gameboard;
