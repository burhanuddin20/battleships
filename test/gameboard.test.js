import Gameboard from "../src/Gameboard";
import Ship from "../src/ship";
test("Gameboard constructor", () => {
  const gameboard = new Gameboard();
  expect(gameboard.board.length).toBe(3);
  expect(gameboard.board[0].length).toBe(3);
});

test("Place ship on gameboard", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0);
  expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
});

test("Receive attack on gameboard", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0);
  gameboard.receiveAttack(0, 0);
  expect(gameboard.board[0][0].hitCount).toBe(1);
});

test("All ships sunk", () => {
  const gameboard = new Gameboard();
  gameboard.placeShip(0, 0);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 0);
  expect(gameboard.allShipsSunk()).toBe(true);
});

test("Gameboard should track ships", () => {
  const gameboard = new Gameboard();
  expect(gameboard.ships.length).toBe(0);
  
  gameboard.placeShip(0, 0);
  expect(gameboard.ships.length).toBe(1);
  
  gameboard.placeShip(0, 1);
  expect(gameboard.ships.length).toBe(2);
});
