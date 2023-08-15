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

test("Place ship in spot that doesn't fit does nothing", () => {
  const board = Gameboard();
  board.placeShip(5, 9, 6, "horizontal");
  expect(board.getBoard()[9][6]).toBeFalsy();
});
