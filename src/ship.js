function Ship(length, hits) {
  this.length = length;
  this.hitCount = hits;
  this.sunk = false;
  this.hit = function () {
    this.hitCount++;
  };
  this.isSunk = function () {
    return this.hitCount === this.length;
  };
}

export default Ship;
