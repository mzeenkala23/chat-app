import express from 'express';
import { AuthenticateUser } from '../middleware/auth';

import { getAllChats, createChat, getMessages, deleteChat } from './../controllers/chatController';



const router = express.Router();

router.get('/',[AuthenticateUser], getAllChats )
router.delete('/:id',[AuthenticateUser], deleteChat )
router.get('/messages',[AuthenticateUser], getMessages )
router.post('/create',[AuthenticateUser], createChat )

export { router as chatRoutes }