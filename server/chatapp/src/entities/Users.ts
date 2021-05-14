import { ChatUser } from './ChatUser';
import { Message } from './Message';
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, BaseEntity, JoinTable, RelationId} from "typeorm";
import { Chat } from "./Chat";


@Entity()
export class Users extends BaseEntity {
    

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    firstName: string;

    @Column('varchar')
    lastName: string;

    @Column('varchar',{unique: true,})
    email: string;

    @Column('varchar',{nullable: true}) 
    avatar: string;

    @Column()
    password: string;

    @Column('boolean',{default: false})
    isOnline: boolean

    @OneToMany(() => Message, message => message.fromUser)
    messages: Message;

    @OneToMany(() => ChatUser, chatUser => chatUser.user)
    chatUsers: ChatUser[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @RelationId((users: Users) => users.chatUsers)
    chatIds: number[];


}
