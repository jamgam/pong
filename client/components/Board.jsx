import React, { useEffect, useState } from 'react';
import Player from './Player';
import Ball from './Ball';
import * as sc from '../styled-components/sc.Board';
import { onResult } from '../socket';

const Board = (props) => {
  const [loser, setLoser] = useState(null);
  const {
    leftPos, rightPos, ballPos, gameText,
  } = props;

  useEffect(() => {
    onResult(setLoser);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoser(null);
    }, 500);
  }, [loser]);

  return (
    <sc.Board>
      <Player player="left" pos={leftPos} loser={loser} />
      <Player player="right" pos={rightPos} loser={loser} />
      <Ball pos={ballPos} />
    </sc.Board>
  );
};

export default Board;
