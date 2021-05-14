import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentChat } from '../../store/actions/chat';

import './FriendList.css';
import { FriendListItem } from './FriendListItem/FriendListItem';

export const FriendList = () => {
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chatReducer.chats);
    
    const openChat = (chat) => {
       dispatch(setCurrentChat(chat));
    }

    return (
    <div className="friend-list">
        <h3 className="friend-list__title">Direct Messages</h3>
        {chats.map((chat,index) => {
            return <FriendListItem key={chat.id} click={() => openChat(chat)} chat={chat} />
        })}

    </div>
    )
}
