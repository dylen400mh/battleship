/* eslint-disable no-shadow */
import Gameboard from "./Gameboard";

const Player = () => {
  const board = Gameboard();

  const sendAttack = (board, coords) => {
    const [row, col] = coords;

    board.receiveAttack(row, col);
  };

  const getRandomMove = () => {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    return [row, col];
  };

  const getBoard = () => board;

  return { sendAttack, getRandomMove, getBoard };
};

export default Player;
