import React, { useState, useEffect } from 'react';
import User from './User';
import * as sc from '../styled-components/sc.UsersList';


const UsersList = (props) => {
  const { users } = props;

  return (
    <sc.Users>
      <sc.Heading>
          CONNECTED USERS:
      </sc.Heading>
      {Object.keys(users).map((user) => <User key={user} user={users[user]} />)}
    </sc.Users>
  );
};
export default UsersList;
