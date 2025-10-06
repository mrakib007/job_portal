import bcrypt from 'bcrypt';
import { createUser,findUserByEmail } from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async({full_name,email,password,role})=>{
    const existingUser = await findUserByEmail(email);
    if(existingUser) throw new Error('Email already registered');

    const hash = await bcrypt.hash(password,10);
    const user = await createUser({full_name,email,password_hash:hash,role});
    const token = generateToken(user);
    return {user,token};
};

export const loginUser= async ({email,password}) =>{
    const user = await findUserByEmail(email);
    if(!user) throw new Error('Invalid email or password');
    if(!user.password_hash) throw new Error('Invalid email or password');

    const token = generateToken(user);
    return {user,token};
}