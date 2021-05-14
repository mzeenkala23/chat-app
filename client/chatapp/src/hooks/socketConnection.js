import { useEffect } from "react";
import socketIOClient from 'socket.io-client';
import {onlineFriends, onlineFriend, offlineFriend, getChats, setSocket, receivedMessage} from '../store/actions/chat'


export default function useSocket(user, dispatch) {

    useEffect(() => {
        dispatch(getChats())
        .then(res => {
            const socket = socketIOClient.connect('http://localhost:3002');

            dispatch(setSocket(socket));

            socket.emit('join', user);
    
            socket.on('typing', (user) => {
                console.log('event ', user);
            });
    
            socket.on('friends', (friends) => {
                console.log('friends ', friends); 
                dispatch(onlineFriends(friends));
            });
    
            socket.on('online', (user) => {
                console.log('online ', user);
                dispatch(onlineFriend(user));
            });
            
            socket.on('offline', (user) => {
                console.log('offline ', user);
                dispatch(offlineFriend(user));
            });
            
            socket.on('received', message => {
                console.log(message)
                dispatch(receivedMessage(message, user.id))
            })
        })
        .catch(err => console.log(err))
    },[])
}