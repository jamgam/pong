import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import Board from './Board';
import * as sc from '../styled-components/sc.App';

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

const resetGame = () => {
  socket.emit('reset', true);
};

const countDown = (cb) => {
  socket.on('counter', (count) => {
    cb(count);
  });
};

const App = (props) => {
  const [pos, setPos] = useState([200, 200]);
  const [player, setPlayer] = useState(null);
  const [opp, setOpp] = useState(null);
  const [ballPos, setBallPos] = useState([347, 253]);
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    init(setPlayer, setOpp);
    positions(setPos);
    ball(setBallPos);
    countDown(setCounter);
  }, []);

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      move(player, 'down');
    }
    if (e.key === 'ArrowUp') {
      move(player, 'up');
    }
  };

  const reset = () => {
    resetGame();
  };

  if (player === null) {
    return null;
  }
  if (player < 2) {
    return (
      <div>
        <sc.BoardWrapper type="button" onKeyDown={handleKey}>
          <Board
            leftPos={pos[0]}
            rightPos={pos[1]}
            ballPos={ballPos}
            counter={counter}
          />
        </sc.BoardWrapper>
        <div>
          {player ? 'you are right' : 'you are left'}
        </div>
        <div>
          <button type="button" onClick={reset}>
            reset
          </button>
        </div>
      </div>
    );
  }
};

export default App;
