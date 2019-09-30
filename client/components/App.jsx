import React, { useState, useEffect } from 'react';
import Board from './Board';
import UsersList from './UsersList';
import Header from './Header';
import Chat from './Chat';
import GameText from './GameText';
import * as sc from '../styled-components/sc.App';
import * as socket from '../socket';

const App = () => {
  const [pos, setPos] = useState([200, 200]);
  const [player, setPlayer] = useState(null);
  const [ballPos, setBallPos] = useState([347, 253]);
  const [gameText, setGameText] = useState(null);
  const [users, setUsers] = useState({});
  const [chat, setChat] = useState(['test']);

  useEffect(() => {
    socket.login(setPlayer);
    socket.onPlayerPositionsUpdate(setPos);
    socket.onBallUpdate(setBallPos);
    socket.onCounterDownUpdate(setGameText);
    socket.onUsersUpdate(setUsers);
    socket.onChatUpdate(setChat);
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
      socket.movePlayer(player - 1, 'down');
    }
    if (e.key === 'ArrowUp') {
      socket.movePlayer(player - 1, 'up');
    }
  };

  const reset = () => {
    socket.restartGame();
  };

  const playerName = () => {
    if (player === 1) {
      return 'THE LEFT PLAYER';
    }
    if (player === 2) {
      return 'THE RIGHT PLAYER';
    }
    return 'A SPECTATOR';
  };

  if (player === null) {
    return null;
  }
  if (player >= 0) {
    return (
      <sc.App>
        <div>
          <Header header={users} player={player} />
        </div>
        <sc.FlexDiv>
          <GameText gameText={gameText} />
          <Board
            leftPos={pos[0]}
            rightPos={pos[1]}
            ballPos={ballPos}
            gameText={gameText}
          />
          <Chat chat={chat} />
        </sc.FlexDiv>
        <div>
          <span>
            {`YOU ARE ${playerName()}`}
          </span>
        </div>
        <div>
          <button type="button" onClick={reset}>
            reset
          </button>
        </div>
        <UsersList users={users} />
      </sc.App>
    );
  }
};

export default App;
