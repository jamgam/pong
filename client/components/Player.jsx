import React from 'react';
import * as sc from '../styled-components/sc.Player';


const Player = (props) => {
  const { player, pos } = props;

  return (
    <div>
      <sc.Paddle player={player} position={pos} />
    </div>
  );
};

export default Player;
