import React, {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';

import useSocket from '../hooks/socketConnection';
import { Messenger } from '../components/Messenger/Messenger';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { TopBar } from '../components/TopBar/TopBar'; 
import { getChats } from '../store/actions/chat';

import './Chat.css';

export const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
   
    useSocket(user,dispatch);

    return (
        <div className="container">
            <Sidebar/>
            <div className="chat-container">
                <TopBar user={user}/>
                <div className="chat-panel">
                    <Messenger/>
                </div>
            </div>
        </div>
    )
}
