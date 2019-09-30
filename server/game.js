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
  this.player0 = null;
  this.player1 = null;

  // game speed
  this.speed = 25;
  this.step = 3;
  this.increment = 1;

  // board walls
  this.leftBound = 10;
  this.rightBound = 690;
  this.upperBound = 1;
  this.lowerBound = 498;

  // emitters
  this.emitBall = emitBall;
  this.emitPlayer = emitPlayer;
  this.emitCounter = emitCounter;
};

Game.prototype.startGame = function startGame() {
  this.ballPosition[0] = 346;
  this.ballPosition[1] = Math.floor(Math.random() * 495);
  this.ballDirection = 'upright';
  this.counter = 3;
  this.step = 3;
  this.gameover = false;

  this.emitBall(this.ballPosition);
  this.countDown();
};

Game.prototype.countDown = function countDown() {
  const i = setInterval(() => {
    this.emitCounter(this.counter);
    if (this.counter === 0) {
      clearInterval(i);
      setTimeout(() => {
        this.emitCounter(null);
      }, 400);
      this.playBall();
    } else {
      this.counter -= 1;
    }
  }, 1000);
};

Game.prototype.playBall = function playBall() {
  this.endGame();
  this.gameInterval = setInterval(() => {
    // update ball position
    switch (this.ballDirection) {
      case 'upright':
        this.ballPosition[0] += this.step;
        this.ballPosition[1] -= this.step;
        if (this.ballPosition[1] <= this.upperBound) {
          this.ballDirection = 'downright';
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
        }
        if (this.ballPosition[0] <= this.leftBound) {
          if (this.ballPosition[1] >= this.playerPositions[0]
            && this.ballPosition[1] <= (this.playerPositions[0] + this.playerLength)) {
            this.ballDirection = 'upright';
            this.step += this.increment;
          } else {
            this.gameover = true;
          }
        }
        break;
      case 'downleft':
        this.ballPosition[0] -= this.step;
        this.ballPosition[1] += this.step;
        if (this.ballPosition[1] >= this.lowerBound) {
          this.ballDirection = 'upleft';
        }
        if (this.ballPosition[0] <= this.leftBound) {
          if (this.ballPosition[1] >= this.playerPositions[0]
            && this.ballPosition[1] <= (this.playerPositions[0] + this.playerLength)) {
            this.ballDirection = 'downright';
            this.step += this.increment;
          } else {
            this.gameover = true;
          }
        }
        break;
      case 'downright':
        this.ballPosition[0] += this.step;
        this.ballPosition[1] += this.step;
        if (this.ballPosition[1] >= this.lowerBound) {
          this.ballDirection = 'upright';
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
  if (player < 2) {
    switch (direction) {
      case 'up':
        if (this.playerPositions[player] > 0) {
          this.playerPositions[player] -= 25;
        }
        break;
      case 'down':
        if (this.playerPositions[player] < 420) {
          this.playerPositions[player] += 25;
        }
        break;
      default:
    }
    this.updatePlayerPositons();
  }
};

Game.prototype.endGame = function endGame() {
  clearInterval(this.gameInterval);
};

Game.prototype.updatePlayerPositons = function updatePlayerPositons() {
  this.emitPlayer(this.playerPositions);
};

Game.prototype.restartGame = function restartGame() {
  this.endGame();
  setTimeout(() => {
    this.startGame();
  }, this.speed);
};

Game.prototype.addPlayer = function addPlayer(id) {
  let playerNum = 2;
  if (this.player0 === null) {
    this.player0 = id;
    playerNum = 0;
  } else if (this.player1 === null) {
    this.player1 = id;
    playerNum = 1;
  }

  if (this.player0 && this.player1) {
    this.startGame();
  }
  return playerNum;
};

Game.prototype.leaveGame = function leaveGame(playerNum) {
  if (playerNum < 2) {
    const player = `player${playerNum}`;
    this[player] = null;
    this.endGame();
  }
};

module.exports = Game;
