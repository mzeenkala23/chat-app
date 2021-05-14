import { ChatUser } from './ChatUser';
import { Message } from './Message';
import { Users } from './Users';
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany} from "typeorm";


@Entity()
export class Chat extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {default: 'dual'})
    type: string

    @OneToMany(type => ChatUser, chatUser => chatUser.chat, { onDelete: 'CASCADE' } )
    chatUsers: ChatUser[];

    @OneToMany(() => Message, message => message.chat,  { onDelete: 'CASCADE' })
    messages: Message;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
