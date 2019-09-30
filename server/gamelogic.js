const Game = function Game(emitBall, emitPlayer, emitCounter) {
  // game state
  this.counter = 3;
  this.gameover = false;
  this.playerPositions = [200, 200];
  this.ballPosition = [346, 247];
  this.connected = {};
  this.numConnected = 0;
  this.ballDirection = null;
  this.playerLength = 80;
  this.gameInterval = null;

  // game speed
  this.speed = 25;
  this.step = 3;
  this.increment = 0.25;

  // board walls
  this.leftBound = 10;
  this.rightBound = 690;
  this.upperBound = 1;
  this.lowerBound = 493;

  // emitters
  this.emitBall = emitBall;
  this.emitPlayer = emitPlayer;
  this.emitCounter = emitCounter;
};

Game.prototype.startGame = function startGame() {
  this.ballPosition[1] = Math.floor(Math.random() * 495);
  this.ballDirection = 'upright';
  this.emitBall(this.ballPosition);
  this.countDown();
};

Game.prototype.countDown = function countDown() {
  const i = setInterval(() => {
    this.emitCounter(this.counter);
    console.log(this.counter);
    if (this.counter === 0) {
      clearInterval(i);
      setTimeout(() => {
        this.emitCounter(null);
      }, 200);
      this.playBall();
    } else {
      this.counter -= 1;
    }
  }, 1000);
};

Game.prototype.playBall = function playBall() {
  this.gameInterval = setInterval(() => {
    // update ball position
    switch (this.ballDirection) {
      case 'upright':
        this.ballPosition[0] += this.step;
        this.ballPosition[1] -= this.step;
        if (this.ballPosition[1] <= this.upperBound) {
          this.ballDirection = 'downright';
          this.step += this.increment;
        }
        if (this.ballPosition[0] >= this.rightBound) {
          if (this.ballPosition[1] >= this.playerPositions[1]
             && this.ballPosition[1] <= (this.playerPositions[1] + this.playerLength)) {
            this.ballDirection = 'upleft';
            this.step += this.increment;
          } else {
            this.gameover = true;
          }
        }
        break;
      case 'upleft':
        this.ballPosition[0] -= this.step;
        this.ballPosition[1] -= this.step;
        if (this.ballPosition[1] <= this.upperBound) {
          this.ballDirection = 'downleft';
          this.step += this.increment;
        }
        if (this.ballPosition[0] <= this.leftBound) {
          this.ballDirection = 'upright';
          this.step += this.increment;
        }
        break;
      case 'downleft':
        this.ballPosition[0] -= this.step;
        this.ballPosition[1] += this.step;
        if (this.ballPosition[1] >= this.lowerBound) {
          this.ballDirection = 'upleft';
          this.step += this.increment;
        }
        if (this.ballPosition[0] <= this.leftBound) {
          this.ballDirection = 'downright';
          this.step += this.increment;
        }
        break;
      case 'downright':
        this.ballPosition[0] += this.step;
        this.ballPosition[1] += this.step;
        if (this.ballPosition[1] >= this.lowerBound) {
          this.ballDirection = 'upright';
          this.step += this.increment;
        }
        if (this.ballPosition[0] >= this.rightBound) {
          if (this.ballPosition[1] >= this.playerPositions[1]
             && this.ballPosition[1] <= (this.playerPositions[1] + this.playerLength)) {
            this.ballDirection = 'downleft';
            this.step += this.increment;
          } else {
            this.gameover = true;
          }
        }
        break;
      default:
    }

    // update ball
    this.emitBall(this.ballPosition);

    // check conditions
    if (this.gameover) {
      this.endGame();
    }
  }, this.speed);
};

Game.prototype.movePlayer = function movePlayer(player, direction) {
  switch (direction) {
    case 'up':
      this.playerPositions[player] -= 25;
      break;
    case 'down':
      this.playerPositions[player] += 25;
      break;
    default:
  }
  this.emitPlayer(this.playerPositions);
};

Game.prototype.endGame = function endGame() {
  clearInterval(this.gameInterval);
};

Game.prototype.restartGame = function restartGame() {

};

module.exports = Game;
