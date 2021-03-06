import React from 'react';
import * as sc from '../styled-components/sc.Header';

const Header = (props) => {
  const { users, player } = props;
  let left = '\u00A0';
  let right = '\u00A0';
  let keys = [];
  if (users) {
    keys = Object.keys(users);
  }

  for (let i = 0; i < keys.length; i += 1) {
    if (users[keys[i]].player === 1) {
      left = users[keys[i]].user;
    }
    if (users[keys[i]].player === 2) {
      right = users[keys[i]].user;
    }
  }

  if (player === 1) {
    left += '(YOU)';
  }
  if (player === 2) {
    right = `(YOU)${right}`;
  }

  return (
    <sc.Header>
      <sc.Left>
        {left}
      </sc.Left>
      <sc.Center>
        VS
      </sc.Center>
      <sc.Right player="right">
        {right}
      </sc.Right>
    </sc.Header>
  );
};

export default Header;
