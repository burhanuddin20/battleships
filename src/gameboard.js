import Ship from "./ship";

class Gameboard {
  constructor() {
    // 2D array to represent the gameboard of 3x3
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    this.ships = [];
  }

  placeShip(x, y) {
    this.board[x][y] = new Ship(3, 0);
    this.ships.push(this.board[x][y]);
  }

  receiveAttack(x, y) {
    const targetCell = this.board[x][y];
    if (targetCell instanceof Ship) {
      targetCell.hit();
      return "hit";
    } else {
      this.board[x][y] = "miss";
      return "miss";
    }
  }

  allShipsSunk() {
    return this.board.every((row) =>
      row.every(
        (cell) => cell === null || (cell instanceof Ship && cell.isSunk())
      )
    );
  }
}

export default Gameboard;
