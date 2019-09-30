import React from 'react';
import Player from './Player';
import Ball from './Ball';
import GameText from './GameText';
import * as sc from '../styled-components/sc.Board';

const Board = (props) => {
  const {
    leftPos, rightPos, ballPos, gameText,
  } = props;
  return (
    <sc.Board>
      <Player player="left" pos={leftPos} />
      <Player player="right" pos={rightPos} />
      <Ball pos={ballPos} />
    </sc.Board>
  );
};

export default Board;
