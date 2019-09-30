import React, { useState, useEffect } from 'react';
import Board from './Board';
import UsersList from './UsersList';
import Header from './Header';
import * as sc from '../styled-components/sc.App';
import * as socket from '../socket';

const App = (props) => {
  const [pos, setPos] = useState([200, 200]);
  const [player, setPlayer] = useState(null);
  const [ballPos, setBallPos] = useState([347, 253]);
  const [gameText, setGameText] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.login(setPlayer);
    socket.onPlayerPositionsUpdate(setPos);
    socket.onBallUpdate(setBallPos);
    socket.onCounterDownUpdate(setGameText);
    socket.onUsersUpdate(setUsers);
  }, []);

  useEffect(() => {
    if (player !== null) {
      document.addEventListener('keydown', (e) => {
        handleKey(e);
      });
    }
  }, [player]);

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      // const newPos = [...pos];
      // if (newPos[player] < 420) {
      //   newPos[player] += 25;
      // }
      // setPos(newPos);
      socket.movePlayer(player - 1, 'down');
    }
    if (e.key === 'ArrowUp') {
      // const newPos = [...pos];
      // if (newPos[player] > 0) {
      //   newPos[player] -= 25;
      // }
      // setPos(newPos);
      socket.movePlayer(player - 1, 'up');
    }
  };

  const reset = () => {
    socket.restartGame();
  };

  const playerName = () => {
    if (player === 1) {
      return 'left';
    }
    if (player === 2) {
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
        <Header header={users} player={player} />
        <div>
          <sc.BoardWrapper type="button">
            <Board
              leftPos={pos[0]}
              rightPos={pos[1]}
              ballPos={ballPos}
              gameText={gameText}
            />
          </sc.BoardWrapper>
        </div>
        <div>
          {`you are ${playerName()}`}
        </div>
        <div>
          <button type="button" onClick={reset}>
            reset
          </button>
        </div>
        <UsersList users={users} />
      </div>
    );
  }
};

export default App;
