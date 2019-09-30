import openSocket from 'socket.io-client';

const socket = openSocket(`${location.protocol}//${location.host}`);

const user = window.prompt('Choose a name') || 'anon';

console.log(user);
export const login = (cb) => {
  let roomNum = document.URL.split('/');
  roomNum = roomNum[roomNum.length - 2];
  console.log('JOINED: ', roomNum);
  socket.emit('join', { roomNum, user });
  socket.on('loggedIn', (player) => {
    cb(player);
    console.log('YOU ARE PLAYER: ', player);
  });
};

export const onPlayerPositionsUpdate = (cb) => {
  socket.on('playerPosition', cb);
};

export const movePlayer = (player, direction) => {
  socket.emit('movePlayer', { player, direction });
};

export const onBallUpdate = (cb) => {
  socket.on('ballPosition', cb);
};

export const restartGame = () => {
  socket.emit('restartGame', true);
};

export const onCounterDownUpdate = (cb) => {
  socket.on('gameText', cb);
};

export const onUsersUpdate = (cb) => {
  socket.on('usersList', cb);
};

export const postMessage = (msg) => {
  socket.emit('message', msg);
};

export const onChatUpdate = (cb) => {
  socket.on('chatMessage', cb);
};
