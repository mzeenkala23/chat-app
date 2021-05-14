import { body } from 'express-validator';
import { Users } from '../entities/Users';

export const UpdateUser = async(req,res) => {

    try {
        
        const user = await Users.update(req.user.id,{...req.body});
        return res.send(user);

    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}