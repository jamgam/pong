import React from 'react';
import * as sc from '../styled-components/sc.Ball';

const Ball = (props) => {
  const { pos } = props;
  return (
    <sc.Ball pos={pos} />
  );
};

export default Ball;
