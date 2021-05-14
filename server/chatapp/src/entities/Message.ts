

import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, BaseEntity, JoinTable, RelationId} from "typeorm";
import { Chat } from "./Chat";
import { Users } from "./Users";


@Entity()
export class Message extends BaseEntity {
    

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {default: 'text'})
    type: string;

    @Column('text')
    message: string;

    @ManyToOne(() => Users, user => user.messages, { onDelete: 'CASCADE' })
    fromUser: number;

    @ManyToOne(() => Chat, chat => chat.messages, { onDelete: 'CASCADE' })
    chat: Chat;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @RelationId((message: Message) => message.chat)
    chatId: Number[]


}
