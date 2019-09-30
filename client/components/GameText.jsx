import React from 'react';
import * as sc from '../styled-components/sc.GameText';

const GameText = (props) => (
  <sc.Counter>
    <span>
      {props.gameText}
    </span>
  </sc.Counter>
);

export default GameText;
