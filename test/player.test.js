import { Player, HumanPlayer, ComputerPlayer } from "../src/player";
import Gameboard from "../src/Gameboard";

describe("Player", () => {
  let player;
  let enemy;

  beforeEach(() => {
    player = new Player("Player 1");
    enemy = new Player("Enemy");
  });

  test("Player should be created with name", () => {
    expect(player.name).toBe("Player 1");
  });

  test("Player should have a gameboard", () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("Player can attack enemy gameboard", () => {
    enemy.gameboard.placeShip(0, 0);
    player.attack(enemy, 0, 0);
    expect(enemy.gameboard.board[0][0].hitCount).toBe(1);
  });

  test("Player attack should register as miss when no ship", () => {
    player.attack(enemy, 0, 0);
    expect(enemy.gameboard.board[0][0]).toBe("miss");
  });
});

describe("HumanPlayer", () => {
  let human;

  beforeEach(() => {
    human = new HumanPlayer("Human Player");
  });

  test("HumanPlayer should inherit from Player", () => {
    expect(human).toBeInstanceOf(Player);
  });

  test("HumanPlayer should be created with correct name", () => {
    expect(human.name).toBe("Human Player");
  });
});

describe("ComputerPlayer", () => {
  let computer;

  beforeEach(() => {
    computer = new ComputerPlayer("Computer");
  });

  test("ComputerPlayer should inherit from Player", () => {
    expect(computer).toBeInstanceOf(Player);
  });

  test("ComputerPlayer should be created with correct name", () => {
    expect(computer.name).toBe("Computer");
  });

  test("ComputerPlayer should add random ships", () => {
    const coordinates = computer.addRandomShips();
    expect(coordinates.length).toBe(3);
    expect(computer.gameboard.ships.length).toBe(3);
  });

  test("Random ship coordinates should be within board bounds", () => {
    const coordinates = computer.addRandomShips();
    coordinates.forEach((coord) => {
      expect(coord[0]).toBeLessThan(3);
      expect(coord[1]).toBeLessThan(3);
      expect(coord[0]).toBeGreaterThanOrEqual(0);
      expect(coord[1]).toBeGreaterThanOrEqual(0);
    });
  });
});
