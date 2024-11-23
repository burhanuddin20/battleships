import "./styles.css";
import { initGame } from "./domController.js";
import MatrixRain from "./matrixRain.js";

document.addEventListener("DOMContentLoaded", () => {
  const matrix = new MatrixRain();
  matrix.animate();
  initGame();
});
