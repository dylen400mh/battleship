/* eslint-disable no-undef */
import Ship from "../Ship";

test("Ship has length", () => {
  expect(Ship(5).length).toBe(5);
});

test("Ship takes a single hit", () => {
  expect(Ship(5).hit()).toBe(1);
});

test("Ship takes multiple hits", () => {
  const ship = Ship(5);
  ship.hit(); // hits = 1
  ship.hit(); // hits = 2
  // hits = 3
  expect(ship.hit()).toBe(3);
});

test("Ship is not originally sunk", () => {
  expect(Ship(5).isSunk()).toBeFalsy();
});

test("Ship can be sunk", () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
