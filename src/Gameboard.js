/* eslint-disable no-restricted-syntax */
import Ship from "./Ship";

const Gameboard = () => {
  // keep track of where moves were made
  const moves = [];

  // keeps track of ships on the board
  let ships = [];

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

  // set surrounding positions of ship to equal 0 and add index to array
  const markSurroundingPositions = (ship) => {
    ship.getCells().forEach((cell) => {
      const [row, col] = cell;
      for (let i = row - 1; i <= row + 1; i += 1) {
        for (let j = col - 1; j <= col + 1; j += 1) {
          if (i >= 0 && i <= 9 && j >= 0 && j <= 9 && board[i][j] === null) {
            board[i][j] = 0;
          }
        }
      }
    });
  };

  // Places a ship at specified coordinates and on a specified axis
  const placeShip = (ship) => {
    for (const cell of ship.getCells()) {
      const [row, col] = cell;
      board[row][col] = ship;
    }

    markSurroundingPositions(ship);
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
  };

  const getAllMoves = () => moves;

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  const getSurroundingPositions = () => {
    const surroundingPositions = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (board[i][j] === 0) surroundingPositions.push([i, j]);
      }
    }
    return surroundingPositions;
  };

  // get positions that have a ship on them
  const getTakenPositions = () => {
    const takenPositions = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (board[i][j]) takenPositions.push([i, j]);
      }
    }
    return takenPositions;
  };

  const getShips = () => ships;

  /* Check:
  1. Ships don't overlap
  2. Ships stay on board
  3. At least one space between all ships
  */

  const isValidPlacement = (ship) => {
    const cells = ship.getCells();

    for (let i = 0; i < cells.length; i += 1) {
      if (
        getSurroundingPositions().some(
          (position) =>
            position[0] === cells[i][0] && position[1] === cells[i][1]
        ) ||
        getTakenPositions().some(
          (position) =>
            position[0] === cells[i][0] && position[1] === cells[i][1]
        ) ||
        cells[i][0] > 9 ||
        cells[i][1] > 9
      )
        return false;
    }

    return true;
  };

  // reset each board position to null and reset ships array
  const removeShips = () => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        board[i][j] = null;
      }
    }

    ships = [];
  };

  const randomizeShips = () => {
    // if there are ships on the board, remove them
    removeShips();

    const shipLengths = [2, 3, 3, 4, 5];

    // while there are ships left to place
    while (shipLengths.length) {
      const length = shipLengths.pop();

      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);

      // If 1: Vertical. If 0: Horizontal
      const axis = Math.round(Math.random()) ? "vertical" : "horizontal";

      let ship = Ship(length, row, col, axis);

      // while ship placement isn't valid change its position
      while (!isValidPlacement(ship)) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        ship = Ship(length, row, col, axis);
      }

      // place ship
      placeShip(ship);
    }
  };

  return {
    getCells,
    receiveAttack,
    allShipsSunk,
    getAllMoves,
    getTakenPositions,
    getShips,
    randomizeShips,
  };
};

export default Gameboard;
