import express from 'express';
import { authRoutes } from './auth';
import { chatRoutes } from './chat';
import { userRoutes } from './user';


const router = express.Router();

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/chats', chatRoutes);


export default router;