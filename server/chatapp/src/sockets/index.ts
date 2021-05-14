import { Message } from './../entities/Message';
import { Server } from "socket.io";
import { getManager } from 'typeorm';

const users = new Map();
const userSockets = new Map();

export const SocketServer = (server) => {
    const io = new Server(server,{
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    io.on('connection', (socket) =>  {
        console.log('conncected')
        socket.on('join', async (user) => {

            let sockets = [];

            if(users.has(user.id)) {
                const existingUser = users.get(user.id);
                existingUser.sockets = [...existingUser.sockets,...[socket.id]];
                users.set(user.id,existingUser);
                sockets = [...existingUser.sockets,...[socket.id]];
                userSockets.set(socket.id, user.id);
            } else {
                users.set(user.id, {id: user.id, sockets: [socket.id]});
                sockets.push(socket.id);
                userSockets.set(socket.id, user.id);
            }

            const onlineFriends = [];

            // Gives user ids of the users you are talking too
            const talkingTo = await getMychats(user.id);
            
            // Notify my friends I am online
            talkingTo.forEach((userId) => {
                if(users.has(userId)) {
                    const chatter = users.get(userId);
                    chatter.sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('online',user);
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    onlineFriends.push(userId);
                }
            })
            
            // Notify me which of my friends are online
            sockets.forEach(socket => {
                try {
                    io.to(socket).emit('friends', onlineFriends);
                } catch (error) {
                    console.log(error);
                }
            })
        })

        socket.on('message', async(message) => {
            const entityManager = getManager();
            let sockets = [];
            
            // user who sends the message
            if(users.has(message.fromUser.id)) {
                socket = users.get(message.fromUser.id).sockets;
                console.log(socket)
            }

            // users who receive the message
            message.toUserId.forEach(id => {
                if(users.has(id)) {
                    sockets = [...sockets, ...users.get(id).sockets];
                }
            })

            try {
                const msg = {
                    fromUserId: message.fromUser.id,
                    chatId: message.chatId,
                    message: message.message
                }

                const Messagetx = await Message.create({
                    message: message.message,
                    chatId: message.chatId,
                    fromUser: message.fromUser.id
                });

                const savedMessage = await Messagetx.save();
    
                message.firstName = message.fromUser.firstName;
                message.lastName = message.fromUser.lastName;
                message.createdAt = Date.now();
                
                message.fromUserId = message.fromUser.id;
                delete message.fromUser;
                console.log(socket, 'sending too')
                sockets.forEach(socket => {
                    io.to(socket).emit('received',savedMessage);
                })
            } catch (error) {
                console.log(error)
            }
        })

        socket.on('disconnect', async () => {

            if(userSockets.has(socket.id)) {
                const user = users.get(userSockets.get(socket.id));
                if(user.sockets.length > 1) {
                    user.sockets = user.sockets.filter(sock => {
                        if(sock !== socket.id) return true

                        userSockets.delete(sock);
                        return false;
                    });

                    users.set(user.id,user);
                } else {
                    const talkingTo = await getMychats(user.id);

                    talkingTo.forEach((userId) => {
                        if(users.has(userId)) {
                            // const user = users.get(userId);
                            users.get(userId).sockets.forEach(socket => {
                                try {
                                    io.to(socket).emit('offline',user);
                                } catch (error) {
                                    console.log(error);
                                }
                            })
                        }
                    })

                    userSockets.delete(socket.id);
                    users.delete(user.id);
                }
            }
        })
    })
}

const getMychats = async (userId) =>{
    const entityManager = getManager();
    
    try {
        // Get all the users, users A is chatting to.
        const results = await entityManager.query(`
            select cu."userId" from chat_user as cu
            inner join (
                select c.id from chat as c 
                where EXISTS (
                    select u.id from users as u
                    join chat_user ON chat_user."userId" = u.id
                    where u.id = ${userId} and c.id = chat_user."chatId"
                )
            ) as cjoin on cjoin.id = cu."chatId"
            where cu."userId" != ${userId}
        `);
        
        return results.length > 0 ? results.map(el => el.userId) : [];

    } catch (error) {
        console.log(error);
        return [];
    }
}
