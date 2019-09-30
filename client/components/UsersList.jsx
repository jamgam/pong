import React, { useState, useEffect } from 'react';
// import { onUsersUpdate } from '../socket';


const UsersList = (props) => {
  const { users } = props;

  return (
    <div>
      {JSON.stringify(users)}
    </div>
  );
};
export default UsersList;
