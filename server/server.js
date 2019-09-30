const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Game = require('./game');

app.use('/:id', express.static('public'));

const connected = {};
let players = 0;

const testGame = new Game(
  (ball) => {
    io.emit('ball', ball);
  },
  (playerPos) => {
    io.emit('update', playerPos);
  },
  (counter) => {
    io.emit('counter', counter);
  },
);

io.on('connection', (socket) => {
  console.log('a user connected');
  // login
  socket.on('login', () => {
    const player = testGame.addPlayer(socket.id);
    connected[socket.id] = player;
    socket.emit('loggedIn', player);
    testGame.updatePlayerPositons();
    players += 1;
    console.log(`USER: ${socket.id} logged in`);
    console.log('CONNECTED: ', connected);
  });

  // move
  socket.on('move', ({ player, direction }) => {
    testGame.movePlayer(player, direction);
  });

  // reset
  socket.on('reset', () => {
    testGame.restartGame();
  });

  socket.on('disconnect', () => {
    if (connected[socket.id] !== undefined) {
      console.log(`USER: ${socket.id} logged out`);
      testGame.leaveGame(connected[socket.id]);
      delete connected[socket.id];
      players -= 1;
      console.log('PLAYERS: ', players);
    }
    console.log('CONNECTED: ', connected);
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
