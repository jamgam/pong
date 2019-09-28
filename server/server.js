const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/:id', express.static('public'));


const positions = [200, 200];
const ballPosition = [347, Math.floor(Math.random() * 502)];
const connected = {};

let players = 0;


const startGame = () => {
  const speed = 45;
  const step = 7;
  let direction = 'upright';
  io.sockets.emit('ball', ballPosition);

  const continueGame = () => {
    setTimeout(() => {
      switch (direction) {
        case 'upright':
          ballPosition[0] += step;
          ballPosition[1] -= step;
          if (ballPosition[1] <= 0) {
            direction = 'downright';
          }
          if (ballPosition[0] >= 700) {
            direction = 'upleft';
          }
          break;
        case 'upleft':
          ballPosition[0] -= step;
          ballPosition[1] -= step;
          if (ballPosition[1] <= 0) {
            direction = 'downleft';
          }
          if (ballPosition[0] <= 0) {
            direction = 'upright';
          }
          break;
        case 'downleft':
          ballPosition[0] -= step;
          ballPosition[1] += step;
          if (ballPosition[1] >= 502) {
            direction = 'upleft';
          }
          if (ballPosition[0] <= 0) {
            direction = 'downright';
          }
          break;
        case 'downright':
          ballPosition[0] += step;
          ballPosition[1] += step;
          if (ballPosition[1] >= 502) {
            direction = 'upright';
          }
          if (ballPosition[0] >= 700) {
            direction = 'downleft';
          }
          break;
        default:
      }
      io.sockets.emit('ball', ballPosition);
      continueGame();
      // speed -= 1;
    }, speed);
  };
  continueGame();
};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('login', () => {
    socket.emit('loggedIn', players);
    connected[socket.id] = 200;
    players += 1;
    console.log(connected);
    if (players === 2) {
      startGame();
    }
  });

  socket.on('move', ({ player, direction }) => {
    console.log(player, direction);
    switch (direction) {
      case 'up':
        if (positions[player] > 0) {
          positions[player] -= 25;
          io.sockets.emit('update', positions);
        }
        break;
      case 'down':
        if (positions[player] < 400) {
          positions[player] += 25;
          io.sockets.emit('update', positions);
        }
        break;
      default:
    }
  });

  socket.on('disconnect', () => {
    if (connected[socket.id]) {
      delete connected[socket.io];
      players -= 1;
    }
    console.log(connected);
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
