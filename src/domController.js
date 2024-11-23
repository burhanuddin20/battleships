import GameController from "./gameController";

class DOMController {
  constructor(gameController) {
    this.gameController = gameController;
    this.player1Container = document.querySelector(".player-1");
    this.player2Container = document.querySelector(".player-2");
  }

  initializeBoards() {
    const player1Board = this.createGameBoard("player-1");
    const player2Board = this.createGameBoard("player-2");
    this.player1Container.appendChild(player1Board);
    this.player2Container.appendChild(player2Board);
  }

  createGameBoard(player) {
    const gameBoard = document.createElement("div");
    gameBoard.id = `gameboard-${player}`;
    gameBoard.classList.add("gameboard");

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.dataset.row = Math.floor(i / 3);
      cell.dataset.col = i % 3;
      gameBoard.appendChild(cell);
    }

    return gameBoard;
  }

  setupShipPlacement(player) {
    return new Promise((resolve) => {
      let shipsPlaced = 0;
      const requiredShips = 3;
      const cells = document.querySelectorAll(`.${player.name} .grid-cell`);

      const shipPlacementHandler = (event) => {
        const x = parseInt(event.target.dataset.row);
        const y = parseInt(event.target.dataset.col);

        this.gameController.addShipsToBoard(player, x, y);
        this.markShip(event.target);
        shipsPlaced++;

        if (shipsPlaced === requiredShips) {
          cells.forEach((cell) => {
            cell.removeEventListener("click", shipPlacementHandler);
          });
          resolve();
        }
      };

      cells.forEach((cell) => {
        cell.addEventListener("click", shipPlacementHandler);
      });
    });
  }

  displayComputerShips(coordinates, playerName) {
    coordinates.forEach(([x, y]) => {
      const cell = document.querySelector(
        `.${playerName} .grid-cell[data-row="${x}"][data-col="${y}"]`
      );
      this.markShip(cell);
    });
  }

  markHit(cell, hitCount, isSunk) {
    if (isSunk) {
      cell.textContent = "💥";
      cell.style.backgroundColor = "black";
      cell.style.background = "black";
    } else {
      cell.textContent = "🛳️";
      // Calculate gradient based on hit count (1-3)
      const hitPercentage = (hitCount / 3) * 100;
      cell.style.background = `linear-gradient(90deg, red ${hitPercentage}%, black ${hitPercentage}%)`;
    }
  }

  markMiss(cell) {
    cell.textContent = "❌";
    cell.style.backgroundColor = "gray";
  }

  markShip(cell) {
    cell.textContent = "🛳️";
  }

  updateCell(x, y, result, playerName) {
    const cell = document.querySelector(
      `.${playerName} .grid-cell[data-row="${x}"][data-col="${y}"]`
    );

    if (result === "hit") {
      const targetShip = this.gameController.getShipAt(playerName, x, y);
      this.markHit(cell, targetShip.hitCount, targetShip.isSunk());
    } else {
      this.markMiss(cell);
    }
  }

  showWinner(player) {
    const message = document.createElement("div");
    message.textContent = `${player.name} wins!`;
    message.classList.add("winner-message");
    document.body.appendChild(message);
  }
}

function initGame() {
  const gameController = new GameController();
  const domController = new DOMController(gameController);

  domController.initializeBoards();
  const players = gameController.init();

  // Setup game phases
  domController
    .setupShipPlacement(players.player1)
    .then(() => {
      const computerShips = players.player2.addRandomShips();
      domController.displayComputerShips(computerShips, players.player2.name);
    })
    .then(() => {
      gameController.startGame(domController);
    });
}

export { initGame };
