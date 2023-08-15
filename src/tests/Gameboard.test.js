/* eslint-disable no-undef */
import Gameboard from "../Gameboard";

test("Place horizontal ship at specified coordinates", () => {
  const board = Gameboard();

  board.placeShip(5, 0, 0, "horizontal");
  // spots taken by ship
  expect(board.getBoard()[0][0]).toBeTruthy();
  expect(board.getBoard()[0][1]).toBeTruthy();
  expect(board.getBoard()[0][2]).toBeTruthy();
  expect(board.getBoard()[0][3]).toBeTruthy();
  expect(board.getBoard()[0][4]).toBeTruthy();
});

test("Positions are initially false", () => {
  expect(Gameboard().getBoard()[0][0]).toBeFalsy();
});

test("Place vertical ship", () => {
  const board = Gameboard();

  board.placeShip(5, 0, 0, "vertical");
  // spots taken by ship
  expect(board.getBoard()[0][0]).toBeTruthy();
  expect(board.getBoard()[1][0]).toBeTruthy();
  expect(board.getBoard()[2][0]).toBeTruthy();
  expect(board.getBoard()[3][0]).toBeTruthy();
  expect(board.getBoard()[4][0]).toBeTruthy();
});

test("Hit is processed", () => {
  const board = Gameboard();

  board.placeShip(2, 0, 0, "horizontal");

  board.receiveAttack(0, 0);

  expect(board.getBoard()[0][0].getHits()).toBe(1);
});

test("Missed attack recorded", () => {
  const board = Gameboard();

  board.receiveAttack(0, 0);

  expect(board.getMissedAttacks()).toEqual([[0, 0]]);
});



