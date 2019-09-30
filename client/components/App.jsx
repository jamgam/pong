import React, { useState, useEffect } from 'react';
import Board from './Board';
import * as sc from '../styled-components/sc.App';
import * as socket from '../socket';

const App = (props) => {
  const [pos, setPos] = useState([200, 200]);
  const [player, setPlayer] = useState(null);
  const [ballPos, setBallPos] = useState([347, 253]);
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    socket.login(setPlayer);
    socket.onPlayerPositionsUpdate(setPos);
    socket.onBallUpdate(setBallPos);
    socket.onCounterDownUpdate(setCounter);
  }, []);

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      const newPos = [...pos];
      if (newPos[player] < 420) {
        newPos[player] += 25;
      }
      setPos(newPos);
      socket.movePlayer(player, 'down');
    }
    if (e.key === 'ArrowUp') {
      const newPos = [...pos];
      if (newPos[player] > 0) {
        newPos[player] -= 25;
      }
      setPos(newPos);
      socket.movePlayer(player, 'up');
    }
  };

  const reset = () => {
    socket.resetGame();
  };

  const playerName = () => {
    if (player === 0) {
      return 'left';
    }
    if (player === 1) {
      return 'right';
    }
    return 'a spectator';
  };

  if (player === null) {
    return null;
  }
  if (player >= 0) {
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
          {`you are ${playerName()}`}
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
