import React from 'react';
import * as sc from '../styled-components/sc.Message';

const Message = (props) => {
  const { msg } = props;
  return (
    <div>
      <sc.User>
        {msg.user}
      </sc.User>
      :
      <span>
        {msg.msg}
      </span>
    </div>
  );
};

export default Message;
