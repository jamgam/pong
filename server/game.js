const Game = function Game(emitBall, emitPlayer, emitText, room) {
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
  this.counterInterval = null;
  this.player1 = null;
  this.player2 = null;
  this.room = room;
  this.countingDown = false;

  // game speed
  this.speed = 25;
  this.step = 3;
  this.increment = 1;

  // board walls
  this.leftBound = 10;
  this.rightBound = 690;
  this.upperBound = 1;
  this.lowerBound = 499;

  // emitters
  this.emitBall = emitBall;
  this.emitPlayer = emitPlayer;
  this.emitText = emitText;
};

Game.prototype.startGame = function startGame() {
  const rand = Math.random();
  this.ballPosition[0] = 346;
  this.ballPosition[1] = Math.floor(rand * 495);
  if (rand < 0.25) {
    this.ballDirection = 'upright';
  } else if (rand >= 0.25 && rand < 0.50) {
    this.ballDirection = 'upleft';
  } else if (rand >= 0.50 && rand < 0.75) {
    this.ballDirection = 'downleft';
  } else {
    this.ballDirection = 'downright';
  }
  this.counter = 3;
  this.step = 3;

  this.emitBall(this.room, this.ballPosition);
  this.countDown();
};

Game.prototype.countDown = function countDown() {
  this.countingDown = true;
  this.emitText(this.room, this.counter);
  this.counterInterval = setInterval(() => {
    if (this.counter > 0) {
      this.counter -= 1;
      this.emitText(this.room, this.counter);
      if (this.counter === 0) {
        this.emitText(this.room, 'start!');
        clearInterval(this.counterInterval);
        this.countingDown = false;
        setTimeout(() => {
          this.emitText(this.room, null);
        }, 400);
        this.endGame();
        this.playBall();
      }
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
        }
        if (this.ballPosition[0] >= this.rightBound) {
          if (this.ballPosition[1] >= this.playerPositions[1] - 8
             && this.ballPosition[1] <= (this.playerPositions[1] + this.playerLength)) {
            this.ballDirection = 'upleft';
            this.step += this.increment;
          } else {
            this.endGame();
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
          if (this.ballPosition[1] >= this.playerPositions[0] - 8
            && this.ballPosition[1] <= (this.playerPositions[0] + this.playerLength)) {
            this.ballDirection = 'upright';
            this.step += this.increment;
          } else {
            this.endGame();
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
          if (this.ballPosition[1] >= this.playerPositions[0] - 8
            && this.ballPosition[1] <= (this.playerPositions[0] + this.playerLength)) {
            this.ballDirection = 'downright';
            this.step += this.increment;
          } else {
            this.endGame();
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
          if (this.ballPosition[1] >= this.playerPositions[1] - 8
             && this.ballPosition[1] <= (this.playerPositions[1] + this.playerLength)) {
            this.ballDirection = 'downleft';
            this.step += this.increment;
          } else {
            this.endGame();
          }
        }
        break;
      default:
    }

    // update ball
    this.emitBall(this.room, this.ballPosition);
  }, this.speed);
};

Game.prototype.movePlayer = function movePlayer(player, direction) {
  if (player < 2) {
    switch (direction) {
      case 'up':
        if (this.playerPositions[player] > 0) {
          this.playerPositions[player] -= 25;
          this.updatePlayerPositons();
        }
        break;
      case 'down':
        if (this.playerPositions[player] < 420) {
          this.playerPositions[player] += 25;
          this.updatePlayerPositons();
        }
        break;
      default:
    }
    // this.updatePlayerPositons();
  }
};

Game.prototype.endGame = function endGame() {
  if (this.countingDown) {
    this.emitText(this.room, null);
  }
  clearInterval(this.gameInterval);
  clearInterval(this.counterInterval);
};

Game.prototype.updatePlayerPositons = function updatePlayerPositons() {
  this.emitPlayer(this.room, this.playerPositions);
};

Game.prototype.restartGame = function restartGame() {
  this.endGame();
  setTimeout(() => {
    this.startGame();
  }, this.speed);
};

Game.prototype.addPlayer = function addPlayer(id) {
  let playerNum = 3;
  if (this.player1 === null) {
    this.player1 = id;
    playerNum = 1;
  } else if (this.player2 === null) {
    this.player2 = id;
    playerNum = 2;
  }

  if (playerNum !== 3 && this.player1 && this.player2) {
    this.startGame();
  }
  return playerNum;
};

Game.prototype.leaveGame = function leaveGame(playerNum) {
  console.log(playerNum, ' LEFT');
  if (playerNum === 1 || playerNum === 2) {
    const player = `player${playerNum}`;
    this[player] = null;
    this.endGame();
  }
};

module.exports = Game;
