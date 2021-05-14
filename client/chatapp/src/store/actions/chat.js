import {chatService} from '../../services/chatService';

export const GET_CHATS = 'GET_CHATS';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const FRIENDS_ONLINE = 'FRIENDS_ONLINE';
export const FRIEND_ONLINE = 'FRIEND_ONLINE';
export const FRIEND_OFFLINE = 'FRIEND_OFFLINE';
export const SET_SOCKET = 'SET_SOCKET';
export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';


// Action Creators
export const getChats = () => dispatch => {
    return chatService.getAllChats()
    .then( data => {
        dispatch({type: GET_CHATS, payload: data});
        return data
    }).catch(err => {
        throw err;
        
    })
}

export const setCurrentChat = (chat) => dispatch => {
    dispatch({type: SET_CURRENT_CHAT, payload: chat});
}

export const onlineFriends = (friends) => dispatch => {
    dispatch({type: FRIENDS_ONLINE, payload: friends});
}

export const onlineFriend = (friend) => dispatch => {
    dispatch({type: FRIEND_ONLINE, payload: friend});
}

export const offlineFriend = (friend) => dispatch => {
    dispatch({type: FRIEND_OFFLINE, payload: friend});
}

export const setSocket = (socket) => dispatch => {
    dispatch({type: SET_SOCKET, payload: socket});
}

export const receivedMessage = (message,userId) => dispatch => {
    dispatch({type: RECEIVED_MESSAGE, payload: {message,userId} });
}
