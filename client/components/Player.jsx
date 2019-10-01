import React, { useState, useEffect } from 'react';
import * as sc from '../styled-components/sc.Player';


const Player = (props) => {
  const { player, pos, loser } = props;

  let visible = true;
  if (loser === player) {
    visible = false;
  }

  return (
    <div>
      <sc.Paddle player={player} position={pos} visible={visible} />
    </div>
  );
};

export default Player;
