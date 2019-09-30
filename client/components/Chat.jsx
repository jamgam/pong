import React, { useState } from 'react';
import Message from './Message';
import * as sc from '../styled-components/sc.Chat';
import { postMessage } from '../socket';

const Chat = (props) => {
  const [value, setValue] = useState('');
  const { chat } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      postMessage(value);
      setValue('');
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 255) {
      setValue(e.target.value);
    }
  };

  return (
    <sc.Chat>
      <sc.Heading>
        CHAT MESSAGES:
      </sc.Heading>
      <sc.Messages>
        {chat.map((msg) => <Message key={msg.timeStamp} msg={msg} />)}
      </sc.Messages>
      <form onSubmit={handleSubmit}>
        <sc.Input onChange={handleChange} value={value} type="text" />
      </form>
    </sc.Chat>
  );
};

export default Chat;
