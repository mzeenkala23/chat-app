import React from 'react';

import './MessageList.css';
import { MessageListItem } from './MessageListItem/MessageListItem';

export const MessageList = ({chat}) => {
    return (
        <div id='message-list'>
            {chat.messages.map(message => {
                return <MessageListItem messageData={message} key={message.id} />
            })}
        </div>
    )
}
