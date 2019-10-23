import React, { useState, useEffect } from 'react';
import Board from './Board';
import UsersList from './UsersList';
import Header from './Header';
import Chat from './Chat';
import Auth from './Auth';
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
  const [loggedUser, setLoggedUser] = useState('anon');
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    socket.login(setPlayer);
    socket.onPlayerPositionsUpdate(setPos);
    socket.onBallUpdate(setBallPos);
    socket.onCounterDownUpdate(setGameText);
    socket.onUsersUpdate(setUsers);
    socket.onChatUpdate(setChat);
    socket.onChatUpdate(handleChatUpdate);
  }, []);

  useEffect(() => {
    if (player !== null) {
      document.addEventListener('keydown', (e) => {
        handleKey(e);
      });
    }
  }, [player]);

  const handleChatUpdate = (value) => {
    setChat(value);
    const chatDiv = document.getElementById('msgs');
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      socket.movePlayer(player - 1, 'down');
    }
    if (e.key === 'ArrowUp') {
      socket.movePlayer(player - 1, 'up');
    }
  };

  const reset = () => {
    socket.resetBall();
  };

  const start = () => {
    socket.startGame();
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
        <sc.HeaderWrapper>
          <Header users={users} player={player} />
          <Auth loggedin={loggedin} loggedUser={loggedUser} setLoggedin={setLoggedin} setLoggedUser={setLoggedUser} />
        </sc.HeaderWrapper>
        <sc.FlexDiv>
          <GameText gameText={gameText} />
          <Board
            leftPos={pos[0]}
            rightPos={pos[1]}
            ballPos={ballPos}
            gameText={gameText}
          />
          <UsersList users={users} />
          <Chat chat={chat} />
        </sc.FlexDiv>
        <sc.Footer>
          <b>
            {`YOU ARE ${playerName()}`}
          </b>
          {player < 3 ? (
            <span>
              <sc.Button type="button" onClick={reset}>
                Reset
              </sc.Button>
              <sc.Button type="button" onClick={start}>
                Start
              </sc.Button>
            </span>
          ) : null}
        </sc.Footer>
      </sc.App>
    );
  }
};

export default App;
