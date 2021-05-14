import { ChatUser } from './../entities/ChatUser';
import { Message } from './../entities/Message';
import { Chat } from './../entities/Chat';
import { Users } from '../entities/Users';
import 'dotenv/config';
import "reflect-metadata";
import {Connection, createConnection} from "typeorm";

export const databaseConnection = (): Promise<Connection> => {
    return createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            entities: [Users,Chat,Message, ChatUser],
        });
}
