import React, { useState } from 'react';
import Message from './Message';
import * as sc from '../styled-components/sc.Chat';
import { postMessage } from '../socket';

const Chat = (props) => {
  const [value, setValue] = useState('');
  const { chat } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (value) {
    postMessage(value);
    setValue('');
    // }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <sc.Chat>
      <sc.Messages>
        {chat.map((msg) => <Message msg={msg} />)}
      </sc.Messages>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={value} type="text" />
      </form>
    </sc.Chat>
  );
};

export default Chat;
