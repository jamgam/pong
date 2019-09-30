import React from 'react';
import * as sc from '../styled-components/sc.GameText';

const GameText = (props) => {
  const { gameText } = props;
  return (
    <sc.Counter>
      <span>
        {props.gameText}
      </span>
    </sc.Counter>
  );
};

export default GameText;
