// Game controller
import { HumanPlayer, ComputerPlayer } from "./player";
import Gameboard from "./Gameboard";

class GameController {
  constructor() {
    this.player1 = new HumanPlayer("player-1");
    this.player2 = new ComputerPlayer("player-2");
  }

  init() {
    console.log("Game initialized");
    return {
      player1: this.player1,
      player2: this.player2,
    };
  }

  addShipsToBoard(player, x, y) {
    player.gameboard.placeShip(x, y);
  }

  async startGame(domController) {
    while (!this.isGameOver()) {
      this.player1.isMyTurn = true; // Reset turn flag
      const [x, y, result] = await this.player1.takeTurn(this.player2);
      domController.updateCell(x, y, result, this.player2.name);
      
      if (this.isGameOver()) {
        domController.showWinner(this.player1);
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      const [compX, compY, compResult] = await this.player2.takeTurn(this.player1);
      domController.updateCell(compX, compY, compResult, this.player1.name);
      
      if (this.isGameOver()) {
        domController.showWinner(this.player2);
        break;
      }
    }
  }

  isGameOver() {
    return (
      this.player1.gameboard.allShipsSunk() ||
      this.player2.gameboard.allShipsSunk()
    );
  }

  getShipAt(playerName, x, y) {
    const player = playerName === "player-1" ? this.player1 : this.player2;
    return player.gameboard.board[x][y];
  }

  gameInitialized(player) {
    // A game is initialized when a player has 3 ships on their board
    return player.gameboard.ships.length === 3;
  }
}

export default GameController;
