import { Users } from '../entities/Users';
import jwt from 'jsonwebtoken';


// Middleware to validate token
export const AuthenticateUser = async (req,res,next) => {
    const token = getTokenFromRequest(req);
   
    if(!token) return res.status(401).json({error: "Access denied"});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const userId = verified.id;
        const user = await Users.findOne(userId);
        if(!user) {
            res.status(400).json({error: "Token is not valid: User not found."});
        }
        delete user['password'];
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({error: "Token is not valid."});
    }
}

export const getTokenFromRequest = (req) => {
    const header = req.get("Authorization") || '';
    const [bearer, token] = header.split(' ');
    // We need to make sure the header starts with Bearer for security reasons
    return bearer === 'Bearer' && token ? token : null;
}