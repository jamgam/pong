import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import Board from './Board';

const socket = openSocket('http://localhost:3000');

const init = (cb1, cb2) => {
  socket.emit('login', null);
  socket.on('loggedIn', (player) => {
    if (player === 0) {
      cb1(player);
      cb2(1);
    }
    if (player === 1) {
      cb1(player);
      cb2(0);
    }
    console.log('PLAYER: ', player);
  });
};

const opponent = (cb) => {
  socket.on('opponent', (id) => {
    cb(id);
  });
};

const positions = (cb) => {
  socket.on('update', (pos) => {
    cb(pos);
  });
};

const move = (player, direction) => {
  socket.emit('move', { player, direction });
};

const ball = (cb) => {
  socket.on('ball', (pos) => {
    cb(pos);
  });
};

const App = (props) => {
  console.log(':)');
  const [pos, setPos] = useState([200, 200]);
  const [player, setPlayer] = useState(null);
  const [opp, setOpp] = useState(null);
  const [ballPos, setBallPos] = useState([347, 253]);
  useEffect(() => {
    init(setPlayer, setOpp);
    positions(setPos);
    ball(setBallPos);
  }, []);

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      move(player, 'down');
    }
    if (e.key === 'ArrowUp') {
      move(player, 'up');
    }
  };

  if (player === null) {
    return null;
  }
  return (
    <div>
      <button onKeyDown={handleKey}>
        <Board leftPos={pos[0]} rightPos={pos[1]} ballPos={ballPos} />
      </button>
      <div>
        {player ? 'you are right' : 'you are left'}
      </div>
    </div>
  );
};

export default App;
