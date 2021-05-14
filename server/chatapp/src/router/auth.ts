import express from 'express';

import { userLogin, userRegister } from './../controllers/auth';
import { validate } from './../validators/index';
import { rules as registrationRules} from './../validators/auth/register';
import { rules as loginRules} from './../validators/auth/login';


const router = express.Router();

router.post('/login',[loginRules, validate], userLogin)

router.post('/register',[ registrationRules, validate ], userRegister);



export { router as authRoutes }