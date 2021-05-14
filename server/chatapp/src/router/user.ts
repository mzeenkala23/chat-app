import express from 'express';
import { AuthenticateUser } from '../middleware/auth';

import { UpdateUser } from './../controllers/userController';
import { validate } from './../validators/index';
import { rules as updateRules} from './../validators/user/update';



const router = express.Router();

router.post('/update',[AuthenticateUser,updateRules,validate], UpdateUser)

export { router as userRoutes }