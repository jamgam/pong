const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Game = require('./game');
const db = require('./db/index');
const hashUtils = require('./lib/hashUtils');
const auth = require('./lib/auth');

const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(auth);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/rooms/:id', express.static('public'));
app.get('/cookieTest', (req, res) => {
  res.send(req.cookies);
});

app.post('/signup', (req, res) => {
  const { user, pass } = req.body;
  const salt = hashUtils.createRandom32String();
  const hashedPass = hashUtils.createHash(pass, salt);
  db.signUp(user, hashedPass, salt)
    .then((result) => {
      res.send(result);
    });
});

app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  db.getUser(user)
    .then((result) => {
      const a = hashUtils.compareHash(pass, result.password, result.salt);
      if (a) {
        return db.login(req.session, result.id);
      }
      res.send(false);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/logout', (req, res) => {
  db.logout(req.session)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/sessionStatus', (req, res) => {

});


const rooms = {};

// socket functions
const emitBall = (room, ballPosition) => {
  io.to(room).emit('ballPosition', ballPosition);
};

const emitPlayerPosition = (room, playerPosition) => {
  io.to(room).emit('playerPosition', playerPosition);
};

const emitGameText = (room, gameText) => {
  io.to(room).emit('gameText', gameText);
};

const emitResult = (room, result) => {
  io.to(room).emit('result', result);
};

io.on('connection', (socket) => {
  console.log('a user connected');
  let game;
  let clientRoom;

  socket.on('join', ({ room, user }) => {
    socket.join(room);
    clientRoom = room;
    if (rooms[room] === undefined) {
      game = new Game(emitBall,
        emitPlayerPosition,
        emitGameText,
        emitResult,
        room);
      rooms[room] = {
        game,
        numClients: 1,
        connected: {},
        messages: [],
        // users: {},
      };
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

  socket.on('resetBall', () => {
    if (game) {
      game.endGame();
    }
  });

  socket.on('startGame', () => {
    if (game) {
      game.startGame();
    }
  });

  socket.on('message', (msg) => {
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
      } else {
        // console.log('IN ROOM: ', clientRoom, 'PLAYER NUM: ', rooms[clientRoom].connected[socket.id], ' LEFT');
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
