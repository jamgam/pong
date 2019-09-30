import openSocket from 'socket.io-client';

const socket = openSocket(`${location.protocol}//${location.host}`);

export const login = (cb) => {
  let roomNum = document.URL.split('/');
  roomNum = roomNum[roomNum.length - 2];
  console.log('JOINED: ', roomNum);
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

export const onUsersUpdate = (cb) => {
  socket.on('usersList', (users) => {
    cb(users);
  });
};
