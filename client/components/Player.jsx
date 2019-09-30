import React, { useState, useContext } from 'react';
import * as sc from '../styled-components/sc.Player';


const Player = (props) => (
  <div>
    <sc.Paddle player={props.player} position={props.pos} />
  </div>
);

export default Player;
