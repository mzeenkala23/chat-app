import {GET_CHATS, SET_CURRENT_CHAT,FRIEND_OFFLINE,FRIENDS_ONLINE,FRIEND_ONLINE, SET_SOCKET,RECEIVED_MESSAGE} from '../actions/chat';

const initialState = {
   chats: [],
   currentChat: {},
   socket: {},
   newMessage: {chatId: null, seen: null},
   scrollBottom: 0
}


export const chatReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_CHATS:
            return {
                ...state,
                chats: payload.chats
            }
        case SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: payload
            }
        case FRIENDS_ONLINE: {
            const chatCopy = state.chats.map(chat => {
                return {
                    ...chat,
                    users: chat.users.map(user => {
                        if(payload.includes(user.id)) {
                            return {
                                ...user,
                                status: 'online'
                            }
                        }
                        return user;
                    })
                }
            })

            return {
                ...state,
                chats: chatCopy
            }
        }

        case FRIEND_ONLINE: {
            let currentChatCopy = {...state.currentChat};
            const chatCopy = state.chats.map((chat) => {
                const users = chat.users.map(user => {
                    if(user.id === payload.id) {
                        return {
                            ...user,
                            status: 'online'
                        }
                    }
                    return user;
                })

                if(chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        users
                    }
                }

                return {
                    ...chat,
                    users: users
                }
            });

            return {
                ...state,
                chats: chatCopy,
                currentChat: currentChatCopy
            }
        }

        case FRIEND_OFFLINE: {
            let currentChatCopy = {...state.currentChat};
            const chatCopy = state.chats.map((chat) => {
                const users = chat.users.map(user => {
                    if(user.id === parseInt(payload.id)) {
                        console.log('make me offline')
                        return {
                            ...user,
                            status: 'offline'
                        }
                    }
                    return user;
                })

                if(chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        users: users
                    }
                }

                return {
                    ...chat,
                    users: users
                }
            });

            return {
                ...state,
                chats: chatCopy,
                currentChat: currentChatCopy
            }
        }

        case SET_SOCKET: {
            return {
                ...state,
                socket: payload
            }
        }

        case RECEIVED_MESSAGE: {
            const {userId, message} = payload;
            console.log(payload)
            let currentChatCopy = {...state.currentChat};
            let newMessageCopy = {...state.newMessage};
            let scrollBottom = state.scrollBottom;

            const chatsCopy = state.chats.map(chat => {
                if(message.chatId === chat.id) {
                    if(message.fromUserId === userId) {
                        scrollBottom++;
                    } else {
                        newMessageCopy = {
                            chatId: chat.id,
                            seen: false
                        }
                    }

                    if(message.chatId === currentChatCopy.id) {
                        currentChatCopy = {
                            ...currentChatCopy,
                            messages: [...currentChatCopy.messages, ...[message]]
                        }
                    }

                    return {
                        ...chat,
                        messages: [...chat.messages, ...[message]]
                    }

                }

                return chat
            })

            if(scrollBottom === state.scrollBottom) {
                return {
                    ...state,
                    chats: chatsCopy,
                    currentChat: currentChatCopy,
                    newMessage: newMessageCopy
                }
            }

            return {
                ...state,
                chats: chatsCopy,
                currentChat: currentChatCopy,
                newMessage: newMessageCopy,
                scrollBottom
            }
        }
         
            
        default:
            return state
    }
}