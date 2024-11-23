import Gameboard from "./Gameboard";
import Ship from "./ship";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(enemy, x, y) {
    return enemy.gameboard.receiveAttack(x, y);
  }
}

class HumanPlayer extends Player {
  constructor(name) {
    super(name);
    this.currentHandler = null;
    this.isMyTurn = true;
  }

  async takeTurn(enemy) {
    return new Promise((resolve) => {
      const opponentClass = enemy.name;
      const gameBoard = document.querySelector(`.${opponentClass}`);

      if (this.currentHandler) {
        gameBoard.removeEventListener("click", this.currentHandler);
      }

      const handleClick = (event) => {
        if (!this.isMyTurn || !event.target.classList.contains("grid-cell")) return;

        const cell = event.target;
        const x = parseInt(cell.dataset.row);
        const y = parseInt(cell.dataset.col);
        const targetShip = enemy.gameboard.board[x][y];

        if (
          !cell.hasAttribute("data-attacked") ||
          (targetShip instanceof Ship && !targetShip.isSunk())
        ) {
          this.isMyTurn = false;
          cell.setAttribute("data-attacked", "true");
          const result = this.attack(enemy, x, y);

          if (
            result === "miss" ||
            (targetShip instanceof Ship && targetShip.isSunk())
          ) {
            gameBoard.removeEventListener("click", handleClick);
          }

          resolve([x, y, result]);
        }
      };

      this.currentHandler = handleClick;
      gameBoard.addEventListener("click", handleClick);
    });
  }
}

class ComputerPlayer extends Player {
  async takeTurn(enemy) {
    return new Promise((resolve) => {
      const coordinates = this.makeRandomAttack(enemy);
      resolve(coordinates);
    });
  }

  makeRandomAttack(enemy) {
    const x = Math.floor(Math.random() * 3);
    const y = Math.floor(Math.random() * 3);
    const result = this.attack(enemy, x, y);
    return [x, y, result];
  }

  addRandomShips() {
    const shipCoordinates = [];
    for (let i = 0; i < 3; i++) {
      const x = Math.floor(Math.random() * 3);
      const y = Math.floor(Math.random() * 3);
      shipCoordinates.push([x, y]);
      this.gameboard.placeShip(x, y);
    }
    return shipCoordinates;
  }
}

export { Player, HumanPlayer, ComputerPlayer };
