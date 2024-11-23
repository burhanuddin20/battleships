import GameController from "../src/gameController";

test("GameController init", () => {
  const game = new GameController();
  const players = game.init();
  expect(players.player1.name).toBe("player-1");
  expect(players.player2.name).toBe("player-2");
});

test("GameController gameInitialized", () => {
  const game = new GameController();
  const players = game.init();
  expect(game.gameInitialized(players.player1)).toBe(false);
  
  // Add 3 ships
  players.player1.gameboard.placeShip(0, 0);
  players.player1.gameboard.placeShip(0, 1);
  players.player1.gameboard.placeShip(0, 2);
  
  expect(game.gameInitialized(players.player1)).toBe(true);
});

test("GameController addShipsToBoard", () => {
  const game = new GameController();
  const players = game.init();
  game.addShipsToBoard(players.player1, 0, 0);
  expect(players.player1.gameboard.ships.length).toBe(1);
});
