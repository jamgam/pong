import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

export const login = (cb) => {
  const roomNum = document.URL.split('/')[3];
  socket.emit('join', roomNum);
  socket.on('loggedIn', (player) => {
    cb(player);
    console.log('YOU ARE PLAYER: ', player);
  });
};

export const onPlayerPositionsUpdate = (cb) => {
  socket.on('playerPosition', (pos) => {
    cb(pos);
  });
};

export const movePlayer = (player, direction) => {
  socket.emit('movePlayer', { player, direction });
};

export const onBallUpdate = (cb) => {
  socket.on('ballPosition', (pos) => {
    cb(pos);
  });
};

export const restartGame = () => {
  socket.emit('restartGame', true);
};

export const onCounterDownUpdate = (cb) => {
  socket.on('gameText', (count) => {
    cb(count);
  });
};
