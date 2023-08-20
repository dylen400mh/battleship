/* eslint-disable no-shadow */
import Gameboard from "./Gameboard";

const Player = (name) => {
  const board = Gameboard();

  // sends an attack to a board/position
  const sendAttack = (board, coords) => {
    const [row, col] = coords;

    board.receiveAttack(row, col);
  };

  // generates a random move for the player
  const getRandomMove = () => {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    return [row, col];
  };

  // returns the board object of the player
  const getBoard = () => board;

  return {
    sendAttack,
    getRandomMove,
    getBoard,
    name,
  };
};

export default Player;
