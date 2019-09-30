import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

export const login = (cb) => {
  socket.emit('login', null);
  socket.on('loggedIn', (player) => {
    cb(player);
    console.log('YOU ARE PLAYER: ', player);
  });
};

export const onPlayerPositionsUpdate = (cb) => {
  socket.on('update', (pos) => {
    cb(pos);
  });
};

export const movePlayer = (player, direction) => {
  socket.emit('move', { player, direction });
};

export const onBallUpdate = (cb) => {
  socket.on('ball', (pos) => {
    cb(pos);
  });
};

export const resetGame = () => {
  socket.emit('reset', true);
};

export const onCounterDownUpdate = (cb) => {
  socket.on('counter', (count) => {
    cb(count);
  });
};