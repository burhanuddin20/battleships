import Ship from "../src/ship.js";

test("Ship constructor", () => {
  const ship = new Ship(3, 0);
  expect(ship.length).toBe(3);
  expect(ship.hitCount).toBe(0);
});

test("Ship hits", () => {
  const ship = new Ship(3, 0);
  ship.hit();
  expect(ship.hitCount).toBe(1);
});

test("Ship is sunk", () => {
  const ship = new Ship(3, 0);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
