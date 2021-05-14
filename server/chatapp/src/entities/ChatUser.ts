import { Message } from './Message';
import { Users } from './Users';
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne} from "typeorm";
import { Chat } from './Chat';


@Entity()
export class ChatUser extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(type => Users, user => user.chatUsers, { primary: true, onDelete: 'CASCADE'  })
    user: Users;

    @ManyToOne(type => Chat, chat => chat.chatUsers, { primary: true, onDelete: 'CASCADE' })
    chat: Chat;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
