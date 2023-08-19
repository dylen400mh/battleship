import Ship from "./Ship";

const Gameboard = () => {
  // missed attacks array
  const missedAttacks = [];

  // keep track of where moves were made
  const moves = [];

  // keeps track of ships on the board
  const ships = [];

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

  // get current board cells
  const getCells = () => board;

  // Places a ship at specified coordinates and on a specified axis (for now we won't verify the position here)
  const placeShip = (length, row, col, axis) => {
    const ship = Ship(length, row, col, axis);

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

    // add ship to array
    ships.push(ship);
  };

  const receiveAttack = (row, col) => {
    // add move to moves array
    moves.push([row, col]);

    const position = board[row][col];

    // if a ship exists at the position, hit it
    if (position) {
      position.hit();
    }
    // if there is no ship at the position, add the coordinates to missed attacks array
    else missedAttacks.push([row, col]);
  };

  const getMissedAttacks = () => missedAttacks;

  const getAllMoves = () => moves;

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  const getTakenPositions = () => {
    const takenPositions = [];
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (board[i][j] !== null) takenPositions.push([i, j]);
      }
    }
    return takenPositions;
  };

  const getEmptyPositions = () => {
    const emptyPositions = [];
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (board[i][j] === null) emptyPositions.push([i, j]);
      }
    }
    return emptyPositions;
  };

  const getShips = () => ships;

  /* Check:
  1. Ships don't overlap
  2. Ships stay on board
  3. At least one space between all ships
  */

  const isValidPlacement = (ship) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const cell of ship.getCells()) {
      if (
        getTakenPositions().some(
          (position) => position[0] === cell[0] && position[1] === cell[1]
        ) ||
        cell[0] > 10 - ship.length ||
        cell[1] > 10 - ship.length
      )
        return false;
    }

    return true;
  };

  

  return {
    getCells,
    placeShip,
    receiveAttack,
    getMissedAttacks,
    allShipsSunk,
    getAllMoves,
    getEmptyPositions,
    getTakenPositions,
    getShips,
  };
};

export default Gameboard;
