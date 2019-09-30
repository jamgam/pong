const express = require('express');

const morgan = require('morgan');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Game = require('./game');

const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use('/:id', express.static('public'));

const rooms = {};

const emitBall = (room, ballPosition) => {
  io.to(room).emit('ballPosition', ballPosition);
};

const emitPlayerPosition = (room, playerPosition) => {
  io.to(room).emit('playerPosition', playerPosition);
};

const emitGameText = (room, gameText) => {
  io.to(room).emit('gameText', gameText);
};


io.on('connection', (socket) => {
  console.log('a user connected');
  let game;
  let clientRoom;

  socket.on('join', ({ room, user }) => {
    socket.join(room);
    clientRoom = room;
    if (rooms[room] === undefined) {
      game = new Game(emitBall, emitPlayerPosition, emitGameText, room);
      rooms[room] = {
        game, numClients: 1, connected: {}, messages: [],
      };
      console.log('ROOM CREATED: ', room);
    } else {
      game = rooms[room].game;
      rooms[room].numClients += 1;
    }
    const player = game.addPlayer(socket.id);
    rooms[room].connected[socket.id] = { player, user };
    io.to(room).emit('usersList', rooms[room].connected);
    io.to(room).emit('chatMessage', rooms[clientRoom].messages);
    socket.emit('loggedIn', player);
  });

  socket.on('movePlayer', ({ player, direction }) => {
    if (game) {
      game.movePlayer(player, direction);
    }
  });

  socket.on('restartGame', () => {
    if (game) {
      game.restartGame();
    }
  });

  socket.on('message', (msg) => {
    console.log(msg);
    rooms[clientRoom].messages.push({
      timeStamp: Date.now(),
      user: rooms[clientRoom].connected[socket.id].user,
      msg,
    });
    io.to(clientRoom).emit('chatMessage', rooms[clientRoom].messages);
  });

  socket.on('disconnect', () => {
    if (rooms[clientRoom]) {
      rooms[clientRoom].numClients -= 1;
      if (rooms[clientRoom].numClients === 0) {
        delete rooms[clientRoom];
        console.log('ROOM DELETED: ', clientRoom);
      } else {
        console.log('IN ROOM: ', clientRoom, 'PLAYER NUM: ', rooms[clientRoom].connected[socket.id], ' LEFT');
        if (game) {
          game.leaveGame(rooms[clientRoom].connected[socket.id]);
        }
        delete rooms[clientRoom].connected[socket.id];
        io.to(clientRoom).emit('usersList', rooms[clientRoom].connected);
      }
    }
    console.log('user disconnected');
  });
});


http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
