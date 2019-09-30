import React from 'react';
import * as sc from '../styled-components/sc.Counter';

const Counter = (props) => (
  <sc.Counter>
    <span>
      {props.counter !== 0 ? props.counter : 'start!'}
    </span>
  </sc.Counter>
);

export default Counter;
