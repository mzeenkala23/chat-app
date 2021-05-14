import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import './MessageInput.css'

export const MessageInput = ({chat}) => {
    const user = useSelector(state => state.authReducer.user);
    const socket = useSelector(state => state.chatReducer.socket);

    const [message, setMessage] = useState('')

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        const isMessageEmpty = !!trimmedMessage;
        if(!isMessageEmpty) {
           return;
        }
        const messageData = {
            fromUser: user,
            chatId: chat.id,
            toUserId: chat.users.map(user => user.id),
            message: trimmedMessage,
        }
        setMessage('');

        socket.emit('message',messageData);
    }

    return (
        <div id="message-input">
            <form className="form" onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => handleMessage(e)}
                />         
            </form>
        </div>
    )
}
