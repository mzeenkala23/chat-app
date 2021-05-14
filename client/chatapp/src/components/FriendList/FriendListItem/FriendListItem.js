import React from 'react'
import { useSelector } from 'react-redux';

import './FriendListItem.css';

const AVATARURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgNVLeR4T4DCVvjwOndi-8v_ER99MUZR8qJQ&usqp=CAUZ";

export const FriendListItem = ({chat,click}) => {
    const message = chat.messages;
    const user = chat.users[0].firstName;
    const isOnline = chat.users[0].status;
    
    const lastMessage = () => {
        if(message.length === 0) return '';

        return message[0].type === 'image' ? 'Image uploaded' : message[0].message;
    }

    const currentChat = useSelector(state => state.chatReducer.currentChat);
    const isChatOpened = () => {
        return currentChat.id === chat.id ? 'opened' : '';
    }

    return (
        <div onClick={click} className={`friend__list-item ${isChatOpened()}`} >
            <img src={AVATARURL} alt="avatar" className="topbar__user-profile__avatar"/>
            <div className="friend__list-item-info">
                <div className="friend__info">
                    <span className="message__receiver">{user}</span>
                    <p className="last-message-sent">{lastMessage()}</p>
                </div>
                <div className={`user-status  ${isOnline ? "user-status--online" : "user-status--offline"}`}></div>
            </div>
        </div>
    )
}
