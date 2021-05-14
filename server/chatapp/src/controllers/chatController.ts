import { Chat } from './../entities/Chat';
import { getManager } from 'typeorm';


// This method is kinda hacky 
export const getAllChats = async(req,res) => {
    const id = req.user.id;
    let data = {}
    const entityManager = getManager();
    const usersChats = await entityManager.query(`
        select * from chat_user
        join chat ON chat.id = chat_user."chatId"
        where chat_user."userId" = ${id};
    
    `);
    
    let arr = []
    for(let i = 0; i < usersChats.length;i ++) {
        let chat = usersChats[i];
        let chatId = chat["chatId"];
        const res = await entityManager.query(
            `select array_to_json(array_agg(row_to_json(users.*))) as users from chat_user
            join users on users.id = chat_user."userId"
            where chat_user."chatId" = ${chatId} and users.id != ${id};`
        );
        
        const resMessages = await entityManager.query(
            `select u."firstName", u."lastName", u."avatar", m.* from message m
            join users u on m."fromUserId" = u.id
            where m."chatId" = ${chatId}
            ORDER by m."createdAt" ASC
            limit 20
            `
        )
        chat["users"] = res[0]["users"];
        chat["messages"] = resMessages;
        arr.push(chat);
    }
    data['chats'] = arr;
    res.json(data);
} 


export const createChat = async(req,res) => {
    const entityManager = getManager();
    const userId = req.user.id;
    const {friendId} = req.body;

    try {
        // Check if we already have a conversation with this user
        const user = await entityManager.query(`
            select * from chat_user
            join chat ON chat.id = chat_user."chatId" and chat."type" ='dual' and chat.id in (
                select "chatId" from chat_user
                where "userId" = ${userId}
            )
            join users ON users.id = chat_user."userId" and users.id = ${friendId};
        `);

        if(user.length > 0) {
            return res.status(403).json({status: 'Error', message: 'Chat with this user already exists'});
        }

        const chat = await Chat.create({type: 'dual'});

        const savedChat = await chat.save();

        await entityManager.query(`
            insert into chat_user ("chatId", "userId")
            values (${savedChat.id}, ${userId}), (${savedChat.id}, ${friendId})
        `);

        const createdChat = await entityManager.query(`
            SELECT "id",
            "type",
            aggregated_users.users,
            aggregated_messages.messages 
            FROM chat
            INNER JOIN (
            SELECT
                "chatId",
                json_agg ( json_build_object ( 'name', users."firstName", 'id', users."id" ) ) AS "users" 
            FROM
                chat_user
                INNER JOIN users ON users.ID = chat_user."userId" 
            GROUP BY
                "chatId" 
            ) AS aggregated_users ON chat."id" = aggregated_users."chatId"
            left JOIN (
            SELECT
                "chatId",
                json_agg ( json_build_object ( 'message', message."message", 'id', message."id", 'fromUser', message."fromUserId", 'type', message."type" ) ) AS "messages" 
            FROM
                chat
                INNER JOIN message ON chat."id" = message."chatId" 
            GROUP BY
            "chatId" 
            ) AS aggregated_messages ON chat.ID = aggregated_messages."chatId"
            where chat.id = ${savedChat.id};
        
        `);
        
        res.json(createdChat)
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }

}

export const getMessages = async (req,res) => {
    const entityManager = getManager();
    const limit = 10;
    const page = req.query.page || 1;
    const offset = page > 1 ? page * limit : 0;

    const messages = await entityManager.query(`
        select * from message
        join users on message."fromUserId" = users.id
        where message."chatId" = ${req.query.id}
        limit ${limit}
        offset ${offset}
    `);

    const numberOfMessages = messages.length;
    const totalPages = Math.ceil(numberOfMessages / limit);

    if(page > totalPages) {
        return res.json({data: {messages: []}})
    }

    const result = {
        messages: messages,
        pagination: {
            page,
            totalPages
        }
    }

    return res.json(result)
}

export const deleteChat = async (req,res) => {
    const entityManager = getManager();
    try {
        await entityManager.query(`
            delete from chat where chat."id" = ${req.params.id}
        `)

        return res.json({status: 'Sucess', message: 'Chat deleted successfully'});
    } catch (error) {
        return res.status(500).json({status: 'Error', message: error.message})
    }
}