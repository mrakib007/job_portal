import { findUserByEmail, findUserById, updateUserById } from "../models/user.model.js";

export const getUserProfile = async(userId) =>{
    const user = await findUserById(userId);
    if(!user) throw new Error('User not found');
    return {user};
}

export const updateUserProfile = async (userId,userData) =>{
    const {email} = userData;
    if(email){
        const existingUser = await findUserByEmail(email);
        if(existingUser && existingUser.id !== userId){
            throw new Error('Email already in use');
        }
    }
    const updatedUser = await updateUserById(userId,userData);
    if(!updatedUser) throw new Error('User not found');
    return {user: updatedUser};
}