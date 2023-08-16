/* eslint-disable no-undef */
import Player from "../Player";

test("Player can properly take a turn", () => {
  const player1 = Player();

  // haven't started turn yet
  expect(player1.isTurn()).toBeFalsy();
  // start player1 turn
  player1.startTurn();
  expect(player1.isTurn()).toBeTruthy();

  // end turn
  player1.endTurn();
  expect(player1.isTurn()).toBeFalsy();
});

test("Players can properly send attacks", () => {
  const player1 = Player();
  const player2 = Player();

  player1.sendAttack(player2.getBoard(), [0, 0]);

  expect(player2.getBoard().getAllMoves()).toEqual([[0, 0]]);
});

test("Players can get a random attack", () => {
  const attacking = Player();
  const defending = Player();

  const mockMoves = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      mockMoves.push([i, j]);
    }
  }

  mockMoves.shift(); // remove [0,0] from mockMoves array

  // reassign getAllMoves function to return mockMoves array
  defending.getBoard().getAllMoves = () => mockMoves;

  expect(attacking.getRandomAttack(defending.getBoard())).toEqual([0, 0]);
});
