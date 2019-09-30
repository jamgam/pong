import React from 'react';

const User = (props) => {
  const { user } = props;
  let player;
  if (user.player === 1) {
    player = 'LEFT';
  }
  if (user.player === 2) {
    player = 'RIGHT';
  }
  if (user.player === 3) {
    player = 'SPECTATOR';
  }
  return (
    <div>
      {`${user.user}(${player})`}
    </div>
  );
};

export default User;
