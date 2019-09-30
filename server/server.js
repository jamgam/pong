const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Game = require('./gamelogic');


app.use('/:id', express.static('public'));

const connected = {};
let players = 0;

let testGame = null;
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('login', () => {
    socket.emit('loggedIn', players);
    connected[socket.id] = 200;
    players += 1;
    console.log(`USER: ${socket.id} logged in`);
    if (players === 2) {
      testGame = new Game(
        (ball) => {
          io.sockets.emit('ball', ball);
        },
        (playerPos) => {
          io.sockets.emit('update', playerPos);
        },
        (counter) => {
          io.sockets.emit('counter', counter);
        },
      );
      testGame.startGame((ball) => {
        io.sockets.emit('ball', ball);
      });
    }
  });

  socket.on('move', ({ player, direction }) => {
    testGame.movePlayer(player, direction);
  });

  socket.on('reset', () => {
    startGame();
  });

  socket.on('disconnect', () => {
    if (connected[socket.id]) {
      console.log(`USER: ${socket.id} logged out`);
      delete connected[socket.io];
      players -= 1;
    }

    console.log('CONNECTED USERS: ', connected);
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
