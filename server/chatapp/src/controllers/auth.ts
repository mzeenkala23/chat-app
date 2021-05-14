import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import { Users } from '../entities/Users';


export const userLogin = async(req,res) => {
    const {email, password} = req.body;

    try {

        const user = await Users.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(401).json({error:"Incorrect password"});
        }
        
        const userWithToken = generateToken(user);
        await user.save()
        res.send(userWithToken)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const userRegister = async(req,res) => {
    const {lastName,firstName, password, email} = req.body;
    
    try {
        
        const UserExist = await Users.findOne({email});
        if(UserExist){
            return res.status(403).json({ error: "Username already exists" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            email,
            lastName,
            firstName,
            password: hashPassword
        });
        const savedUser = await user.save();
        const userWithToken = generateToken(savedUser);
        res.send(userWithToken)
    } catch (error) {
        res.status(500).json({ error });
    }
}

const generateToken = (user) => {
    delete user.password;
    const updateUser = {...user};

    const token = jwt.sign(updateUser,process.env.JWT_SECRET,{expiresIn: '24h'});
    return {...updateUser,token};
}