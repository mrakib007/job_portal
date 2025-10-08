import jwt from 'jsonwebtoken';
import { findUserById } from '../models/user.model.js';

export const authenticateToken = async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message: 'Access token required'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findUserById(decoded.id);
        if(!user) return res.status(401).json({message: 'Invalid token'});
        req.user = user;
        next();
    }catch(error){
        return res.status(403).json({message: 'Invalid token'});
    }
};

export const requireAdmin = (req,res,next) =>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: 'Admin access required'});
    }
    next();
}