import React from 'react';
import * as sc from '../styled-components/sc.Header';

const Header = (props) => {
  const { header, player } = props;
  let left = '\u00A0';
  let right = '\u00A0';
  const keys = Object.keys(header);

  for (let i = 0; i < keys.length; i++) {
    if (header[keys[i]] === 1) {
      left = keys[i];
    }
    if (header[keys[i]] === 2) {
      right = keys[i];
    }
  }

  return (
    <sc.Header>
      <sc.Left>
        {left}
      </sc.Left>
      <sc.Center>
        <sc.Left>
          {player === 1 ? '(YOU)' : '\u00A0'}
        </sc.Left>
        <sc.Center>
          VS
        </sc.Center>
        <sc.Right>
          {player === 2 ? '(YOU)' : '\u00A0'}
        </sc.Right>
      </sc.Center>
      <sc.Right player="right">
        {right}
      </sc.Right>
    </sc.Header>
  );
};

export default Header;
