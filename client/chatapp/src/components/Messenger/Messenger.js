import React from 'react'
import { useSelector } from 'react-redux'
import { ChatHeader } from '../ChatHeader/ChatHeader'
import { MessageInput } from '../MessageInput/MessageInput'
import { MessageList } from '../MessageList/MessageList'

import './Messenger.css'


export const Messenger = () => {

    const currentChatData = useSelector(state => state.chatReducer.currentChat);
 
    let isCurrentChat = false;
    let nameOfReceiver;

    if(Object.keys(currentChatData).length !== 0) {
        isCurrentChat = true
        nameOfReceiver = currentChatData.users[0].firstName;
    }

    return (
        <div id="messenger">
            {
                !isCurrentChat ? <p> No Active chats</p> : (
                    <>
                        <ChatHeader name={nameOfReceiver}/>
                        <MessageList chat={currentChatData}/>
                        <MessageInput chat={currentChatData}/>
                    </>
                )
            }

        </div>
    )
}
