/* eslint-disable no-shadow */
import Gameboard from "./Gameboard";

const Player = () => {
  const board = Gameboard();
  let turn = false;

  const sendAttack = (board, coords) => {
    const [row, col] = coords;

    board.receiveAttack(row, col);
  };

  const getRandomAttack = (board) => {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (
      // eslint-disable-next-line no-loop-func
      board.getAllMoves().some((move) => move[0] === row && move[1] === col)
    ) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    return [row, col];
  };

  const isTurn = () => turn;

  const startTurn = () => {
    turn = true;
  };

  const endTurn = () => {
    turn = false;
  };

  const getBoard = () => board;

  return { sendAttack, getRandomAttack, isTurn, startTurn, endTurn, getBoard };
};

export default Player;
