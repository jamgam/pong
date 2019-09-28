import React, { useEffect, useContext } from 'react';
import Player from './Player';
import Ball from './Ball';
import * as sc from '../styled-components/sc.Board';
import { usePlayerPositionsContext, PlayerPositionsContext } from '../context/PlayerPositions';

const Board = (props) => {
  const { leftPos, rightPos, ballPos } = props;
  return (
    <sc.Board>
      <Player player="left" pos={leftPos} />
      <Player player="right" pos={rightPos} />
      <Ball pos={ballPos} />
    </sc.Board>
  );
};

export default Board;
