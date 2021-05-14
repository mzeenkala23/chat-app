import API from './api';

export const chatService = {
    getAllChats: () => {
        return API.get('/chats')
            .then(({data}) => {
                return data
            })
            .catch(err => {
                console.log('Chat Service err',err);
                throw err
            })
    }
}