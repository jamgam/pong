import React from 'react';
import Player from './Player';
import Ball from './Ball';
import Counter from './Counter';
import * as sc from '../styled-components/sc.Board';

const Board = (props) => {
  const {
    leftPos, rightPos, ballPos, counter,
  } = props;
  return (
    <sc.Board>
      <Counter counter={counter} />
      <Player player="left" pos={leftPos} />
      <Player player="right" pos={rightPos} />
      <Ball pos={ballPos} />
    </sc.Board>
  );
};

export default Board;
